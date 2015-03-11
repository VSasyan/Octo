<?php


class App {

    
    private $portails;
    private $connect;
    
    public function __construct(){
        
    }
    
    public function getConnect(){
        if(!isset($this->connect)){
            $this->connect = new Database();
        }
        return $this->connect;
    }
    
    public function addPortail($nom, $url){
        // TODO check exist?
        $portail = new Portail($nom, $url);
        $portail->add($this->getConnect());
    }
    
    public function getPortails(){
        if(!isset($this->portails)){
            $sql = "SELECT id, nom, date_MAJ, lien FROM portail";
            $resultat = $this->getConnect()->query($sql);
            $this->portails = [];
            foreach ($resultat as $p) {
                $this->portails[] = new Portail($p['nom'], $p['lien'], $p['date_MAJ'], $p['id'] );
            }
        }
        return $this->portails;
    }
    
    public function getPortailsJSON($opt){
        $json = [];
        foreach ($this->getPortails() as $n => $p) {
            $json[$n] = $p->getJSON($opt);
        }
        return json_encode($json);
    }
    
    public function savePages($json){
        $pages = json_decode($json);
        $sql = "";
        foreach( $pages as $key=>$page){
            $p = new Page($page, $this->getConnect());
            $sql = $sql.$p->getFullQuery();
        }
        print_r($sql);
        $this->getConnect()->multipleQuery($sql);
    }
    
    public function close(){
        if(isset($this->connect))
            $this->connect->close();
    }
}
