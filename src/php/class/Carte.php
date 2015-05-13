<?php

class Carte {
    
    
    private $titre;
    
    private $idUser;
    
    private $idPortail;
    
    private $description;
    
    private $debut_annee;
    
    private $fin_annee;
    
    private $duree;
    
    private $echelle_temps_haut;
    
    private $echelle_temps_bas;
    
	// Constructeur de l'objet carte
    public function __construct($titre, $idUser, $idPortail, $description, $debut_annee, $fin_annee, $duree, $echelleTempsHaut, $echelleTempsBas) {
        $this->titre              = $titre;
        $this->idPortail          = $idPortail;
        $this->idUser             = $idUser;
        $this->description        = $description;
        $this->debut_annee        = $debut_annee;
        $this->fin_annee          = $fin_annee;
        $this->duree              = $duree;
        $this->echelle_temps_haut = $echelleTempsHaut;
        $this->echelle_temps_bas  = $echelleTempsBas;
    }
    
	//Cette fonction permet de créer la requête pour insérer dans la base de données les informations 
	//relatives à la carte
	// Elle renvoie en sortie la requête
    function getCreateQuery(){
        return "INSERT INTO carte(titre, idUtilisateur, idPortail, description, "
        . "debut_annee, fin_annee, duree, echelle_temps_haut, echelle_temps_bas) VALUES(\"".$this->titre."\", ".$this->idUser.", "
        .$this->idPortail.", \"".$this->description."\", ".$this->debut_annee.", ".$this->fin_annee.", "
        .$this->duree.", $this->echelle_temps_haut, $this->echelle_temps_bas);";
    }
    
	// Cette fonction permet de créer la requête pour insérer dans la base de données les modifications
	// effectuées sur les informations relatives à la carte
	// Elle prend en entrée l'identifiant de la carte
	// Elle renvoie en sortie la requête
    function getUpdateQuery($idCarte){
        return "UPDATE carte SET "
            . "titre = \"".$this->titre."\", "
            . "description = \"".$this->description."\", "
            . "debut_annee = ".$this->debut_annee.", "
            . "fin_annee = ".$this->fin_annee.", "
            . "duree = ".$this->duree.", "
            . "echelle_temps_haut = ".$this->echelle_temps_haut.", "
            . "echelle_temps_bas = ".$this->echelle_temps_bas." "
            . "WHERE id=".$idCarte.";";
    }
    
}
