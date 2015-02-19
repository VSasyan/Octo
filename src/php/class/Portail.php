<?php

class Portail {
    
    private $id;
    private $nom;
    private $date_MAJ;
    private $lien;
    
    public function __construct($nom, $date_MAJ, $lien, $id) {
        $this->id = $id;
        $this->nom = $nom;
        $this->date_MAJ = $date_MAJ;
        $this->lien = $lien;
    }
    
    public function getJSON($opt){
        $tab = [];
        foreach ($opt as $key) {
            $tab[$key] = $this->$key;
        } 
        return $tab;
    }
}
