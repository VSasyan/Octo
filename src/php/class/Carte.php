<?php

class Carte {
    
    
    private $titre;
    
    private $idUser;
    
    private $idPortail;
    
    private $description;
    
    private $debut_annee;
    
    private $fin_annee;
    
    private $duree;
    
    public function __construct($titre, $idUser, $idPortail, $description, $debut_annee, $fin_annee, $duree) {
        $this->titre       = $titre;
        $this->idPortail   = $idPortail;
        $this->idUser      = $idUser;
        $this->description = $description;
        $this->debut_annee = $debut_annee;
        $this->fin_annee   = $fin_annee;
        $this->duree       = $duree;
    }
    
    function getCreateQuery(){
        return "INSERT INTO carte(titre, idUtilisateur, idPortail, description, "
        . "debut_annee, fin_annee, duree) VALUES(\"".$this->titre."\", ".$this->idUser.", "
        .$this->idPortail.", \"".$this->description."\", ".$this->debut_annee.", ".$this->fin_annee.", "
        .$this->duree.");";
    }
    
}
