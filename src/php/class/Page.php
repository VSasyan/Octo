<?php
class Page {
    
    /**
     * Lien à la base de donnees
     * @var Database
     */
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
        $this->database = $database;
        $this->json = $json;
        $this->checkExist();
    }
    
    public function checkExist(){
        $query = "SELECT COUNT(id) FROM page WHERE id=".$this->json->id;
        $result = $this->database->query($query);
        $this->exist = $result[0]["COUNT(id)"] === 1;
    }
    
}
