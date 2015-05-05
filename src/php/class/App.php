<?php

class App {

    private $portails;
    private $connect;

    public function __construct() {
        
    }

    public function getConnect() {
        if (!isset($this->connect)) {
            $this->connect = new Database();
        }
        return $this->connect;
    }

    public function addPortail($nom, $url) {
        // TODO check exist?
        $portail = new Portail($nom, $url);
        $portail->add($this->getConnect());
    }

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

    public function getPortailsJSON($opt) {
        $json = [];
        foreach ($this->getPortails() as $n => $p) {
            $json[$n] = $p->getJSON($opt);
        }
        return json_encode($json);
    }

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
        echo json_encode($json);
    }

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

    public function jsonPagesPortail($idPortail) {
        $p = $this->listPagesPortail($idPortail);
        $opt = ['id', 'nom', 'lien', 'tabArticles'];
        $json = json_encode($p->getJSON($opt));
        return $json;
    }

    public function createCarte($json) {
        $vals = json_decode($json);
        $carte = new Carte($vals->titre, $vals->idU, $vals->idP, $vals->description, $vals->debut_annee, $vals->fin_annee, $vals->duree);
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

    public function getCarte($idCarte){
        $sql1 = "SELECT id, titre, description, echelle_temps_haut, echelle_temps_bas, duree, debut_annee, fin_annee "
                . "FROM carte "
                . "WHERE id=".$idCarte;
        $res1 = $this->getConnect()->query($sql1);
        if(count($res1) !=1 ){
            throw new Exception;
        }
        $carte = $res1[0];
        
        $sql2 = "SELECT id, start, end, titre, theme FROM evenement WHERE idCarte=".$idCarte;
        $res2 = $this->getConnect()->query($sql2);
        
        $carte["evenements"] = $res2;
        
        return $carte;
    }
    
    public function getCartesFromUser($idUser){
        $sql = "SELECT id, titre, description FROM carte WHERE idUtilisateur=".$idUser;
        $res = $this->getConnect()->query($sql);
        return json_encode($res);
    }
    
    public function getUses() {
        return $this->getConnect()->getUses();
    }

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

    public function close() {
        if (isset($this->connect))
            $this->connect->close();
    }

}
