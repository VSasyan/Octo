<?php

class User {
    
    private $id;
    
    private $login;
    
    private $pass;
    
	// Constructeur de la classe User
    public function __construct($login, $pass) {
        $this->login  = $login;
        $this->pass   = $pass;
    }
    
	//Cette fonction permet de créer la requête pour insérer dans la base de données les informations
	//relatives à l'utilisateur
	// Elle renvoie en sortie la requête  
    function getCreateQuery(){
        return "INSERT INTO utilisateur(login, mdp, role) VALUES(\""
            . $this->login."\", \"".$this->pass."\", 1);";
    }
 
	//Cette fonction permet de créer la requête pour vérifier l'unicité du login dans la base
	// Elle renvoie en sortie la requête   
    function getLoginUniqueQuery(){
        return "SELECT utilisateur.id FROM utilisateur WHERE login LIKE \"". $this->login ."\"";
    }
 
	//Cette fonction permet de créer la requête pour se connecter
	// Elle renvoie en sortie la requête    
    function authQuery(){
        return "SELECT utilisateur.id AS idU, utilisateur.login, utilisateur.role, role.type as roleType "
            . "FROM role, utilisateur "
            . "WHERE utilisateur.role = role.id AND "
            . "utilisateur.login LIKE \"".$this->login."\" AND "
            . "utilisateur.mdp LIKE \"".$this->pass."\"";
    }
}
