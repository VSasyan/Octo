<?php

class Evenement {
    
    private $startTime;
    private $endTime;
    private $titre;
    private $theme;
    private $idCarte;
    private $idPage;
    
	//Constructeur de la classe événement
    public function __construct($debutAnnee, $debutMois, $debutJour, $endAnnee, $endMois, $endJour, $titre, $theme, $idCarte, $idPage) {
        $this->startTime = $debutAnnee."-".max($debutMois, 1)."-".max($debutJour, 1);
        $this->endTime   = $endAnnee."-".max($endMois, 1)."-".max($endJour, 1);
        $this->titre     = $titre;
        $this->theme     = $theme;
        $this->idCarte   = $idCarte;
        $this->idPage    = $idPage;
    }
    
	//Cette fonction permet de créer la requête pour insérer dans la base de données les informations
	//relatives à l'événement
	// Elle renvoie en sortie la requête
    public function getCreateQuery(){
        return "INSERT INTO evenement(start, end, titre, theme, idCarte, idPage) VALUES("
                . "\"".$this->startTime."\", \"".$this->endTime."\", \"".$this->titre."\", "
                . "\"".$this->theme."\", ".$this->idCarte.", ".$this->idPage.");";
    }
  
	// Cette fonction permet de créer la requête pour insérer dans la base de données les modifications 
	//effectuées sur les informations relatives à un événement
	// Elle prend en entrée l'identifiant de l'événement 
	// En sortie, elle renvoie la requête
    public function getUpdateQuery($idE){
        return "UPDATE evenement SET "
            . "theme = \"".$this->theme."\" "
            . "WHERE evenement.id=".$idE.";";
    }
    
    
}
