<?php

class User {
    
    private $id;
    
    private $login;
    
    private $pass;
    
    public function __construct($login, $pass) {
        $this->login  = $login;
        $this->pass   = $pass;
    }
    
    function getCreateQuery(){
        return "INSERT INTO utilisateur(login, mdp, role) VALUES(\""
            . $this->login."\", \"".$this->pass."\", 1);";
    }
    
    function getLoginUniqueQuery(){
        return "SELECT utilisateur.id FROM utilisateur WHERE login LIKE \"". $this->login ."\"";
    }
    
    function authQuery(){
        return "SELECT utilisateur.id AS idU, utilisateur.login, utilisateur.role, role.type as roleType "
            . "FROM role, utilisateur "
            . "WHERE utilisateur.role = role.id AND "
            . "utilisateur.login LIKE \"".$this->login."\" AND "
            . "utilisateur.mdp LIKE \"".$this->pass."\"";
    }
}
