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
    
}
