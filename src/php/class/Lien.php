<?php
/**
 * Description of Lien
 *
 * @author Simon
 */
class Lien {
    
    private $url;
    
    private $titre;
    
    private $accepte;
    
    private $force;
    
    private $idPage;
    
    private $idPortail;
    
    public function __construct($url, $titre, $accepte, $force, $idPage = 0, $idPortail = 0){
        $this->url       = addslashes($url);
        $this->titre     = addslashes($titre);
        $this->accepte   = $accepte;
        $this->force     = $force;
        $this->idPage    = $idPage;
        $this->idPortail = $idPortail;
    }
    
    public function getInsertQuery(){
        $sql1 = "INSERT INTO lien(url, titre, idPage) VALUES ('".$this->url."', '".$this->titre."',".$this->idPage." );\n";
        $sql2 = "INSERT INTO status(idPortail, idLien, accepte, contraint) VALUES (".$this->idPortail.", (SELECT MAX(id) FROM lien),".$this->accepte.", ".$this->force." );\n";
        return $sql1.$sql2;
    }
    
    public function getUpdateQuery(){
        $sql = "UPDATE lien SET "
                . "url = '".$this->url."',"
                . "titre = '".$this->titre."' "
                . "WHERE idPage = ".$this->getId().";\n";
        return $sql;
    }
    
    public function getId(){
        return $this->idPage;
    }
}
