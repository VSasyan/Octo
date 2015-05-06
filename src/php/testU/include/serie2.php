<?php

function compareUser($tabUser){
    
    //Utilisateur
    require "../conf/database.php";
      
    $mysqli = @new mysqli($database[$uses]["host"], $database[$uses]["user"], $database[$uses]["password"], $database[$uses]["database"]);
      
    $sql = "SELECT id, login, mdp, role
       FROM utilisateur ";
 
    $resultat = $mysqli->query($sql);
    $r = [];
    while ($obj = $resultat->fetch_array()) {
        $r[] = $obj;
    }
    $mysqli->close();   
      
      
      
    //Comparaison $r et $tabUser
    foreach ($r as $n => $p) {
        foreach ($p as $m =>$q) {
               
                if (!is_int($m) && $q!=$tabUser[$n][$m]){
                    return false;
                }
        }
      }
    return true;
}

function compareRetour($retour, $tabRetour){
    foreach ($retour as $m =>$q) {
                
         if (!is_int($m) && $q!=$tabRetour[$m]){
            return false;
        }
    }
      
    return true;
}

function testAjoutUtilisateur($jsonUser, $tabUser, $tabRetour){
    
    //Enregistrer Utilisateur
    $app = new App();
     
    $retour = $app->insertUser($jsonUser);   
      
    $app->close();
     
    
    //Recuperer infos utilisateur
    $tabBool[0] = compareUser($tabUser);
    
      
    //Comparaison $retour et $tabRetour
    $tabBool[1] = compareRetour($retour, $tabRetour);
      
    return $tabBool;
}


function testAuthentification($tabRetour){

    //Authentification d'un utilisateur
    $app = new App();
     
    $retour = $app->authenticate("{\"login\":\"login1\",\"mdp\":\"password1\"}");   
      
    $app->close();
    
    
    //Comparaison $retour et $tabRetour
      foreach ($retour as $m =>$q) {
          
            if (!is_int($m) && $q!=$tabRetour[$m]){
                return false;
            }
      }
      
      return true;
}



$tabUsers = array(
  
    0 => array(
      "id" => 1,
      "login" => "login1",
      "mdp" => "password1",
      "role" => 1)
    );


$tabUsers2 = array(
  
    0 => array(
      "id" => 1,
      "login" => "login1",
      "mdp" => "password1",
      "role" => 1),
    
    1 => array(
      "id" => 2,
      "login" => "login2",
      "mdp" => "password1",
      "role" => 1)
    );


$tabRetour = array(
    "idU"      => 1,
    "login"    => "login1",
    "role"     => 1,
    "roleType" => "Simple",
    "valide"   => true
    );

$tabRetour2 = array(
    "idU"      => 2,
    "login"    => "login2",
    "role"     => 1,
    "roleType" => "Simple",
    "valide"   => true
    );

$tabRetourFalse = array(
    "valide"   => false
    );

$json1 = "{\"login\":\"login1\",\"mdp\":\"password1\"}";
$json2 = "{\"login\":\"login1\",\"mdp\":\"password2\"}";
$json3 = "{\"login\":\"login2\",\"mdp\":\"password1\"}";


 $tabBool = testAjoutUtilisateur($json1,$tabUsers,$tabRetour);
 if($tabBool==array(0 => true, 1 => true))
    echo "<p class='o'>Ajout d'un utilisateur</p>";
  else {
    echo "<p class='e'>Erreur lors de l'ajout d'un utilisateur</p>";
      if ($tabBool[0]==false)
          echo "<p class='e'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;L'enregistrement de l'utilisateur s'est mal déroulé.</p>";
      if ($tabBool[1]==false)
          echo "<p class='e'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;L'e retour n'est pas celui attendu.</p>";
  }
  

  
 if(testAuthentification($tabRetour))
    echo "<p class='o'>Authentification de l'utilisateur</p>";
  else
    echo "<p class='e'>Erreur lors de l'authentification de l'utilisateur</p>";
  
  
 $tabBool = testAjoutUtilisateur($json2,$tabUsers,$tabRetourFalse);
 if($tabBool==array(0 => true, 1 => true))
    echo "<p class='o'>Un utilisateur n'est pas ajouté car le login est déjà attribué</p>";
  else {
    echo "<p class='e'>Erreur lors de l'ajout d'un utilisateur avec un login déjà attribué</p>";
      if ($tabBool[0]==false)
          echo "<p class='e'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;L'enregistrement de l'utilisateur s'est mal déroulé.</p>";
      if ($tabBool[1]==false)
          echo "<p class='e'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;L'e retour n'est pas celui attendu.</p>";
  }
  
 $tabBool = testAjoutUtilisateur($json3,$tabUsers2,$tabRetour2);
 if($tabBool==array(0 => true, 1 => true))
    echo "<p class='o'>Ajout d'un utilisateur de login différent mais mot de passe identique</p>";
  else {
    echo "<p class='e'>Erreur lors de l'ajout d'un utilisateur avec mot de passe déjà attribué</p>";
      if ($tabBool[0]==false)
          echo "<p class='e'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;L'enregistrement de l'utilisateur s'est mal déroulé.</p>";
      if ($tabBool[1]==false)
          echo "<p class='e'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;L'e retour n'est pas celui attendu.</p>";
  }
