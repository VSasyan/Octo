<?php
class Page extends Lien{
    
    
    private $database;
    
    /**
     * Object Php issu du parsing
     * @var Object stdClass
     */
    private $json;
    
    /**
     * Verifie l'existence de la page dans la base
     * @var boolean
     */
    private $exist;
    
    /**
     * @param type $json
     * @param type $database
     */
	 // Constructeur de la classe Page
    public function __construct($json) {
        parent::__construct($json->lien, $json->titre, 1, 0, $json->id, $json->portail_id);
        $this->json = $json;
    }
    
    
	//Cette fonction permet de créer la requête pour insérer dans la base de données les informations
	//relatives à la page
	// Elle renvoie en sortie la requête    
    public function getInsertQuery(){
        $sql = "INSERT INTO page(id, lon, lat, nb_langue, longueur, debut_annee, debut_mois, "
                . "debut_jour, fin_annee, fin_mois, fin_jour, date_MAJ, type_infobox, distance_portail, id_portail )"
                . "VALUES (".$this->json->id.", ".$this->json->lon.", ".$this->json->lat.", "
                . $this->json->nb_langue.", ".$this->json->longueur.", "
                . $this->json->debut_annee.", ".$this->json->debut_mois.", ".$this->json->debut_jour.", "
                . $this->json->fin_annee.", ".$this->json->fin_mois.", ".$this->json->fin_jour.", "
                . "NOW(), \"".$this->json->type_infobox."\", ".$this->json->distance_Portail.", "
                . $this->json->portail_id.");\n";
        
        $sql = $sql.parent::getInsertQuery();
        return $sql;
    }

	// Cette fonction permet de créer la requête pour insérer dans la base de données les modifications 
	//effectuées sur les informations relatives à une page
	// En sortie, elle renvoie la requête    
    public function getUpdateQuery(){
        $sql = "UPDATE page "
            . "SET lon = ".$this->json->lon.", "
            . "lat = ".$this->json->lat.", "
            . "nb_langue = ".$this->json->nb_langue.", "
            . "longueur = ".$this->json->longueur.", "
            . "debut_annee = ".$this->json->debut_annee.", "
            . "debut_mois = ".$this->json->debut_mois.", "
            . "debut_jour = ".$this->json->debut_jour.", "
            . "fin_annee = ".$this->json->fin_annee.", "
            . "fin_mois = ".$this->json->fin_mois.", "
            . "fin_jour = ".$this->json->fin_jour.", "
            . "date_MAJ = NOW(), "
            . "type_infobox = '".$this->json->type_infobox."', "
            . "distance_portail = ".$this->json->distance_Portail." " 
            . "WHERE id = ".$this->getId().";\n";
        $sql = $sql.parent::getUpdateQuery();
        return $sql;
    }
    
    
}
