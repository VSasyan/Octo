<?php

class App {

    private $portails;
    private $connect;

    public function __construct() {
        
    }
// Cette fonction renvoie la connexion à la base de données
    public function getConnect() {
        if (!isset($this->connect)) {
            $this->connect = new Database();
        }
        return $this->connect;
    }

	// Cette fonction permet d'ajouter un portail
	// Elle prend en entrée un nom de portail et un url de portail
    public function addPortail($nom, $url) {
        // TODO check exist?
        $portail = new Portail($nom, $url);
        $portail->add($this->getConnect());
    }

	// Cette fonction permet d'obtenir les portails déjà existants
	// Elle renvoie les portails existants
    public function getPortails() {
        if (!isset($this->portails)) {
            $sql = "SELECT id, nom, date_MAJ, lien FROM portail";
            $resultat = $this->getConnect()->query($sql);
            $this->portails = [];
            foreach ($resultat as $p) {
                $this->portails[] = new Portail($p['nom'], $p['lien'], $p['id'], $p['date_MAJ']);
            }
        }
        return $this->portails;
    }

	// Cette fonction permet d'obtenir les portails déjà existants sous forme de données JSON
	// Elle prend entrée les données 
	// Elle renvoie les portails sous forme JSON
    public function getPortailsJSON($opt) {
        $json = [];
        foreach ($this->getPortails() as $n => $p) {
            $json[$n] = $p->getJSON($opt);
        }
        return json_encode($json);
    }

	// Cette fonction permet d'enregistrer une page
	// Elle prend en entrée les données d'une page en json
	//Renvoie valide=true si les pages ont pu être enregistrées, false sinon
    public function savePages($json) {
        $pages = json_decode($json);

        $tabPage = [];
        $sql = "SELECT id FROM page WHERE";

        foreach ($pages as $key => $page) {
            //print_r($page);
            $p = new Page($page);
            $sql .= " id=" . $page->id . " OR";
            $tabPage[] = $p;
        }
        $sql = substr($sql, 0, count($sql) - 4);
        $r = $this->getConnect()->query($sql);
        //print_r($sql);
        $tabId = [];
        foreach ($r as $id)
            $tabId[] = $id["id"];
        //print_r($r);
        //print_r($tabId);

        $sql = "";

        foreach ($pages as $key => $page) {
            $p = new Page($page);
            //print_r($p->getId()." ".  in_array($p->getId(), $tabId)."\n");
            if (in_array($p->getId(), $tabId))
                $sql = $sql . $p->getUpdateQuery();
            else
                $sql = $sql . $p->getInsertQuery();
        }
        $err = $this->getConnect()->multipleQuery($sql);
        $json = [];
        if ($err) {
            $json["valide"] = FALSE;
        } else {
            $json["valide"] = TRUE;
        }
        return json_encode($json);
    }
	
	// Cette fonction permet de lister les pages relatives à un portail
	// ELle prend en entrée l'identifiant du portail et un booléen qui 
	//permet de filtrer les pages qui ne sont pas géolocalisées et non datées
	// Elle renvoie sous forme de tableau les pages du portail
    public function listPagesPortail($idPortail, $filter=false) {
        $sql = "SELECT id, nom, lien FROM portail WHERE id=" . $idPortail;
        $portail = $this->getConnect()->query($sql);
        if (count($portail) != 0) {
            $portail = $portail[0];
            $p = new Portail($portail["nom"], $portail["lien"], $portail["id"]);
            $pages = $this->getConnect()->query($p->getRequeteListPages($filter));
            $p->setTabArticles($pages);
        } else
            $p = array();
        return $p;
    }
	
	// Cette fonction permet de tranformer les données des pages d'un portail en données json
	// Elle prend en entrée l'identifiant d'un portail
	// Elle renvoie les données des pages sous forme de json
    public function jsonPagesPortail($idPortail) {
        $p = $this->listPagesPortail($idPortail);
        $opt = ['id', 'nom', 'lien', 'tabArticles'];
        $json = json_encode($p->getJSON($opt));
        return $json;
    }
	
	//Cette fonction permet de créer une carte et les événements associés à cette carte
	//Elle prend en entrée un objet json contenant les données sur la cartes
	// En sortie, elle renvoie valide=true si la carte a pu être créée, false sinon, et 
	//les informations de la carte
    public function createCarte($json) {
        $vals = json_decode($json);
        $carte = new Carte($vals->titre, $vals->idU, $vals->idP, $vals->description, $vals->debut_annee, $vals->fin_annee, $vals->duree, $vals->echelle_temps_haut, $vals->echelle_temps_bas);
        $idCarte = $this->getConnect()->addQuery($carte->getCreateQuery());
        $p = $this->listPagesPortail($vals->idP, true); // true = je retire les elements non geolocalises et non dates
        $err = $this->getConnect()->multipleQuery($p->getAllEventsQuery($idCarte));

        $carte = [];
        if ($err) {
            $carte["valide"] = FALSE;
        } else {
            $carte = $this->getCarte($idCarte);
            $carte["valide"] = TRUE;
        }
        return json_encode($carte);
    }

	// Cette fonction permet de récupérer les informations d'une carte
	// Prend en entrée l'identifiant d'une carte
	// Renvoie les informations relatives à la carte
    public function getCarte($idCarte){
        
        $sql1 = "SELECT id, titre, description, echelle_temps_haut, echelle_temps_bas, duree, debut_annee, fin_annee, idPortail "
                . "FROM carte "
                . "WHERE id=".$idCarte;
        
        $res1 = $this->getConnect()->query($sql1);

        if(count($res1) !=1 ){
            throw new Exception;
        }
        $carte = $res1[0];
        
        $sql3 = "SELECT languesMax(".$carte["idPortail"].") AS lan, longueurMax(".$carte["idPortail"].") AS lon";
        $r = $this->getConnect()->query($sql3);
        $lan = $r[0]["lan"];
        $lon = $r[0]["lon"];
        
        $sql2 = "SELECT evenement.id AS ide, evenement.start, "
                . "evenement.end, evenement.titre AS title, "
                . "evenement.theme, page.id AS idp, page.lat, page.lon, lien.url, page.type_infobox AS infobox, "
                . "importance(page.longueur, page.nb_langue, page.distance_portail, ".$lon.", ".$lan.") AS importance "
                . "FROM evenement, page, lien "
                . "WHERE evenement.idPage=page.id AND page.id=lien.idPage AND evenement.idCarte=".$idCarte;
        $res2 = $this->getConnect()->query($sql2);
        
        $carte["tabEvenements"] = [];
        
        foreach ($res2 as $event) {
            $point["lat"]      = $event["lat"];
            $point["lon"]      = $event["lon"];
            $option["theme"]   = $event["theme"];
            $option["idp"]     = $event["idp"];
            $option["ide"]     = $event["ide"];
            $option["infobox"] = $event["infobox"];
            $option["url"]     = $event["url"];
            $option["importance"] = $event["importance"];
            $e["start"]        = $event["start"];
            $e["end"]          = $event["end"];
            $e["title"]        = $event["title"];
            $e["point"]        = $point;
            $e["options"]      = $option;
            $carte["tabEvenements"][] = $e;
        }
        
        //$carte["tabEvenements"] = $e;
        
        return $carte;
    }
    
	//Cette fonction renvoie les cartes d'un utilisateur dans un objet json
	// Elle prend en entrée l'identifiant d'un utilisateur
	//En sortie, renvoie l'identifiant, le titre et la description des cartes dans un objet json
    public function getCartesFromUser($idUser){
        $sql = "SELECT id, titre, description FROM carte WHERE idUtilisateur=".$idUser;
        $res = $this->getConnect()->query($sql);
        return json_encode($res);
    }
    
	//Cette fonction permet la mise à jour de la carte
	//Prend en entrée les données de la carte dans un objet json
	//Renvoie valide=true si la carte a pu être modifiée, false sinon 
    public function updateCarte($json){
        $vals = json_decode($json);
        $carte = $vals->carte;
        $sql = "";
        $c = new Carte($carte->titre, 0, 0, $carte->description, $carte->debut_annee, $carte->fin_annee,
                $carte->duree, $carte->echelle_temps_haut, $carte->echelle_temps_bas);
        $sql = $c->getUpdateQuery($carte->idCarte)."\n";

        
        foreach ($vals->majEve->tabEvenements as $event) {
            $st = explode("-", $event->start);
            $en = explode("-", $event->end);
            $e = new Evenement($st[0], $st[1], $st[2], $en[0], $en[1], $en[2],
                $event->title, $event->options->theme, $carte->idCarte, $event->options->idp);
            $sql .= $e->getUpdateQuery($event->options->ide)."\n";
        }
        
        if(count($vals->majEve->aSuppr)>0)
            $sql .= "DELETE FROM evenement WHERE ";
        foreach ($vals->majEve->aSuppr as $ide) {
            $sql .= "id=".$ide." OR ";
        }
        $sql = substr($sql, 0, -4).";";
        
        $err = $this->getConnect()->multipleQuery($sql);
        if ($err) {
            $r["valide"] = FALSE;
        } else {
            $r["valide"] = TRUE;
        }
        return $r;
    }
    
	// Cette fonction permet de supprimer une carte
	// Elle prend en entrée l'identifiant d'une carte
	// Elle renvoie en sortie valide=vrai si la carte a bien été supprimée, false sinon
    public function deleteCarte($idCarte){
        $sql = "DELETE FROM carte WHERE id = ".$idCarte."; DELETE FROM evenement WHERE idCarte=".$idCarte.";";
        $err = $this->getConnect()->multipleQuery($sql);
        if ($err) {
            $r["valide"] = FALSE;
        } else {
            $r["valide"] = TRUE;
        }
        return $r;
    }
    
	// Cette fonction renvoie le mode de travail dans la base de données
	//Renvoie test ou dev selon le mode de travail dans lequel on est
    public function getUses() {
        return $this->getConnect()->getUses();
    }

	//Cette fonction permet de s'authentifier
	// Elle prend en entrée un login est un mot de passe dans un objet json
	// Elle renvoie en sortie valide=vrai si l'authentification a fonctionné, false sinon
    public function authenticate($json) {
        $vals = json_decode($json);
        $user = new User($vals->login, $vals->mdp);
        $sql = $user->authQuery();
        $toto = $this->getConnect()->query($sql);
        if (count($toto) == 1) { // Auth rÃ©ussie
            $toto[0]["valide"] = true;
            return $toto[0];
        } else {
            return array("valide" => false);
        }
    }

	// Cette fonction permet d'ajouter u utilisateur
	//Elle prend en entrée un login est un mot de passe dans un objet json
	// Elle renvoie un tableau contenant les informations relatives au nouvel utilisateur
	// et valide=vrai si l'inscription a fonctionné, false sinon
    public function insertUser($json) {
        $vals = json_decode($json);
        $user = new User($vals->login, $vals->mdp);
        $r = $this->getConnect()->query($user->getLoginUniqueQuery());
        if (count($r) == 0) {
            $id = $this->getConnect()->addQuery($user->getCreateQuery());
            $tab = array(
                "idU" => $id,
                "login" => $vals->login,
                "role" => 1,
                "roleType" => "Simple",
                "valide" => true
            );
        } else {
            $tab = array(
                "valide" => false
            );
        }
        return $tab;
    }

	//Cette fonction permet de se déconnecter à la base de données
    public function close() {
        if (isset($this->connect))
            $this->connect->close();
    }

}
