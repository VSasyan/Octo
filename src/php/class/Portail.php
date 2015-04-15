<?php

class Portail {

    private $id;
    private $nom;
    private $date_MAJ;
    private $lien;
    
    private $tabArticles;

    public function __construct($nom, $lien, $id=null, $date_MAJ=null) {
        $ctp = func_num_args();
        switch ($ctp) {
            case 4:
                $this->date_MAJ = $date_MAJ;
            case 3:
                $this->id = $id;
            case 2:
                $this->nom = $nom;
                $this->lien = $lien;
        }
        
    }

    public function getJSON($opt) {
        $tab = [];
        foreach ($opt as $key) {
            $tab[$key] = $this->$key;
        }
        return $tab;
    }
    
    public function add(Database $dbb){
        $sql = "INSERT INTO Portail(nom, date_MAJ, lien) VALUES ( '".$this->nom."', NOW(), '".$this->lien."' )";
        $this->id = $dbb->addQuery($sql);   
    }
    
    public function getRequeteListPages(){
        return "SELECT lien.titre, lien.url, page.id, page.lon, page.lat, page.type_infobox, page.nb_langue, page.nb_visite, "
            . "page.longueur, page.debut_annee, page.debut_mois, page.debut_jour, page.fin_annee, page.fin_mois, "
            . "page.fin_jour, page.distance_portail FROM status, lien, page WHERE status.idPortail=".$this->id." AND "
            . "status.accepte=1 AND status.idLien=lien.id AND lien.idPage=page.id";
    }
    
    public function setTabArticles($articles){
        $this->tabArticles = $articles;
    }
    
    public function getTabArticles(){
        return $this->tabArticles;
    }
    
    public function getMaxLengthQuery(){
        return "SELECT max(pagescompletes.longueur) "
            . "FROM pagescompletes "
            . "WHERE pagescompletes.idPortail=idPor AND "
            . "pagescompletes.lon<>0 AND "
            . "pagescompletes.lat<>0";
    }
    
    public function getMaxLangueQuery(){
        return "SELECT max(pagescompletes.nb_langue) "
            . "FROM pagescompletes "
            . "WHERE pagescompletes.idPortail=idPor AND "
            . "pagescompletes.lon<>0 AND "
            . "pagescompletes.lat<>0";
    }
    
}
