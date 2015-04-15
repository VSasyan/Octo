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
//        print_r($sql);

        $err = $this->getConnect()->multipleQuery($sql);
//        print_r($err);
        $json = [];
        if ($err) {
            $json["valide"] = FALSE;
        } else {
            $json["valide"] = TRUE;
        }

        echo json_encode($json);
    }

    public function listPagesPortail($idPortail) {
        $sql = "SELECT id, nom, lien FROM portail WHERE id=" . $idPortail;
        $portail = $this->getConnect()->query($sql);
        $portail = $portail[0];
        $p = new Portail($portail["nom"], $portail["lien"], $portail["id"]);
        $pages = $this->getConnect()->query($p->getRequeteListPages());
        $new_pages = [];
        foreach ($pages as $page) {
            $tmp = [];
            foreach ($page as $key => $value) {
                if (!is_int($key)) {
                    $tmp[$key] = $value;
                }
            }
            $new_pages[] = $tmp;
        }
        $p->setTabArticles($new_pages);
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
        //print_r($vals);
        $carte = new Carte($vals->titre, $vals->idU, $vals->idP, $vals->description, $vals->debut_annee, 
                $vals->fin_annee, $vals->duree);
        $p = $this->listPagesPortail($vals->idP);
        
        print_r($p);
        
//        foreach ($p->getTabArticles() as $article){
//            $article->
//        }
        
        //$this->getConnect()->addQuery($carte->getCreateQuery());
    }

    public function getUses() {
        return $this->getConnect()->getUses();
    }
    
    public function authenticate($json){
        $vals = json_decode($json);
        print_r($vals);
    }
    
    public function insertUser($json){
        $vals = json_decode($json);
        $user = new User($vals->login, $vals->mdp);
        $this->getConnect()->addQuery($user->getCreateQuery());
    }

    public function close() {
        if (isset($this->connect))
            $this->connect->close();
    }

}
