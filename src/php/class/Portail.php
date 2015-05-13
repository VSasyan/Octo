<?php

class Portail {

    private $id;
    private $nom;
    private $date_MAJ;
    private $lien;
    
    private $tabArticles;

	// Constructeur de la classe Portail
    public function __construct($nom, $lien, $id=null, $date_MAJ=null) {
        $ctp = func_num_args();
        switch ($ctp) {
            case 4:
                $this->date_MAJ = $date_MAJ;
            case 3:
                $this->id = $id;
            case 2:
                $this->nom = $nom;
                $this->lien = $lien;
        }
        
    }

	// Cette fonction permet de transformer un tableau en tableau associatif
	// Elle prend en entrée un tableau avec les champs nom et identifiant du portail
	// ELle renvoie un tableau associatif avec les champs nom et identifiant du portail
    public function getJSON($opt) {
        $tab = [];
        foreach ($opt as $key) {
            $tab[$key] = $this->$key;
        }
        return $tab;
    }
    
	//Cette fonction permet d'insérer dans la base de données un portail
	// Elle prend en entrée une base de données
    public function add(Database $dbb){
        $sql = "INSERT INTO Portail(nom, date_MAJ, lien) VALUES ( '".$this->nom."', NOW(), '".$this->lien."' )";
        $this->id = $dbb->addQuery($sql);   
    }

	//Cette fonction permet de créer la requête pour obtenir la liste des pages relatives à un portail
	// qui sont géoréférencées et datées
	// Elle prend en entrée un booléen qui indique si la page est géoréférencée et datée
	// Elle renvoie en sortie la requête
    public function getRequeteListPages($filter=false){
        $sql = "SELECT lien.titre, lien.url, page.id, page.lon, page.lat, page.type_infobox, page.nb_langue, "
                . "page.longueur, page.debut_annee, page.debut_mois, page.debut_jour, page.fin_annee, page.fin_mois, "
                . "page.fin_jour, page.distance_portail FROM status, lien, page WHERE status.idPortail=".$this->id." AND "
                . "status.accepte=1 AND status.idLien=lien.id AND lien.idPage=page.id";
        if($filter)
            $sql .= " AND debut_annee<10000 AND fin_annee<10000 AND lon<>0 AND lat<>0";
        return $sql;
    }
    
	//Cette fonction permet de mettre les pages dans un tableau
	// Elle prend en entrée les pages
    public function setTabArticles($articles){
        $this->tabArticles = $articles;
    }
 
	// Cette fonction permet de récupérer les pages d'un portail sous forme de tableau
	// Elle renvoie le tableau
    public function getTabArticles(){
        return $this->tabArticles;
    }
    
	//Cette fonction permet de créer la requête pour chercher la longueur maximum parmi toutes 
	//les pages appartenant à un portail
	// Elle renvoie en sortie la requête
    public function getMaxLengthQuery(){
        return "SELECT max(pagescompletes.longueur) "
            . "FROM pagescompletes "
            . "WHERE pagescompletes.idPortail=idPor AND "
            . "pagescompletes.lon<>0 AND "
            . "pagescompletes.lat<>0";
    }

	//Cette fonction permet de créer la requête pour chercher le nombre de langues maximum 
	//parmi toutes les pages appartenant à un portail
	// Elle renvoie en sortie la requête    
    public function getMaxLangueQuery(){
        return "SELECT max(pagescompletes.nb_langue) "
            . "FROM pagescompletes "
            . "WHERE pagescompletes.idPortail=idPor AND "
            . "pagescompletes.lon<>0 AND "
            . "pagescompletes.lat<>0";
    }
 
	//Cette fonction permet de créer la requête pour transformer les pages en événements
	// Elle renvoie en sortie la requête 
    public function getAllEventsQuery($idCarte){
        $sql = "";
        foreach ($this->tabArticles as $articles) {
            $e = new Evenement($articles["debut_annee"], $articles["debut_mois"], $articles["debut_jour"],
                    $articles["fin_annee"], $articles["fin_mois"], $articles["fin_jour"],
                    $articles["titre"], "defaut", $idCarte, $articles["id"]);
            $sql .= $e->getCreateQuery()."\n";
        }
        return $sql;
    }
    
}
