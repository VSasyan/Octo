<?php

class Evenement {
    
    private $startTime;
    private $endTime;
    private $titre;
    private $theme;
    private $idCarte;
    private $idPage;
    
    public function __construct($debutAnnee, $debutMois, $debutJour, $endAnnee, $endMois, $endJour, $titre, $theme, $idCarte, $idPage) {
        $this->startTime = $debutAnnee."-".max($debutMois, 1)."-".max($debutJour, 1);
        $this->endTime   = $endAnnee."-".max($endMois, 1)."-".max($endJour, 1);
        $this->titre     = $titre;
        $this->theme     = $theme;
        $this->idCarte   = $idCarte;
        $this->idPage    = $idPage;
    }
    
    public function getCreateQuery(){
        return "INSERT INTO evenement(start, end, titre, theme, idCarte, idPage) VALUES("
                . "\"".$this->startTime."\", \"".$this->endTime."\", \"".$this->titre."\", "
                . "\"".$this->theme."\", ".$this->idCarte.", ".$this->idPage.");";
    }
    
    
    
    
}
