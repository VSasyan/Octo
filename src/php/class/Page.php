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
    public function __construct($json, $database) {
        parent::__construct($json->lien, $json->titre, 1, 0, $json->id, $json->portail_id);
        $this->database = $database;
        $this->json = $json;
        //print_r($json);
    }
    
    public function checkExist(){
        $query = "SELECT COUNT(id) FROM page WHERE id=".$this->json->id;
        $result = $this->database->query($query);
        $this->exist = $result[0]["COUNT(id)"] === 1;
    }
    
    public function getFullQuery(){
        $sql = "INSERT INTO page(id, lon, lat, nb_langue, nb_visite, longueur, debut_annee, debut_mois, "
                . "debut_jour, fin_annee, fin_mois, fin_jour, date_MAJ, type_infobox, distance_portail, id_portail )"
                . "VALUES (".$this->json->id.", ".$this->json->lon.", ".$this->json->lat.", "
                . $this->json->nb_langue.", ".$this->json->nb_visite.", ".$this->json->longueur.", "
                . $this->json->debut_annee.", ".$this->json->debut_mois.", ".$this->json->debut_jour.", "
                . $this->json->fin_annee.", ".$this->json->fin_mois.", ".$this->json->fin_jour.", "
                . "NOW(), ".$this->json->type_infobox.", ".$this->json->distance_Portail.", "
                . $this->json->portail_id.");\n";
        
        $sql = $sql.parent::getQueryAdd();
        return $sql;
    }
    
}
