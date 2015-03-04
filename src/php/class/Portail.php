<?php

class Portail {

    private $id;
    private $nom;
    private $date_MAJ;
    private $lien;

    public function __construct($nom, $lien, $date_MAJ=null, $id=null) {
        $ctp = func_num_args();
        switch ($ctp) {
            case 4:
                $this->id = $id;
                $this->date_MAJ = $date_MAJ;
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
        print_r($sql);
        $this->id = $dbb->addQuery($sql);   
    }
}
