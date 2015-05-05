<?php


function testAjoutUtilisateur($jsonUser, $tab, $tabRetour){
    
    //Enregistrer Utilisateur
    $app = new App();
     
    $retour = $app->insertUser($jsonUser);   
      
    $app->close();
    
    
    
    //Recuperer infos pages, status, liens
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
      
      
      
      //Comparaison $r et $tab
      foreach ($r as $n => $p) {
        foreach ($p as $m =>$q) {
               
                if (!is_int($m) && $q!=$tab[$n][$m]){
                    return false;
                }
        }
      }
      
      //Comparaison $retour et $tabRetour
      foreach ($retour as $m =>$q) {
                
            if (!is_int($m) && $q!=$tabRetour[$m]){
                return false;
            }
      }
      
      return true;

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


$tabRetour = array(
    "idU"      => 1,
    "login"    => "login1",
    "role"     => 1,
    "roleType" => "Simple",
    "valide"   => true
    );

$tabRetourFalse = array(
    "valide"   => false
    );

$json1 = "{\"login\":\"login1\",\"mdp\":\"password1\"}";
$json2 = "{\"login\":\"login1\",\"mdp\":\"password2\"}";



 if(testAjoutUtilisateur($json1,$tabUsers,$tabRetour))
    echo "<p class='o'>Ajout d'un utilisateur</p>";
  else
    echo "<p class='e'>Erreur lors de l'ajout d'un utilisateur</p>";
  
 if(testAuthentification($tabRetour))
    echo "<p class='o'>Authentification de l'utilisateur</p>";
  else
    echo "<p class='e'>Erreur lors de l'authentification de l'utilisateur</p>";
  
  if(testAjoutUtilisateur($json2,$tabUsers,$tabRetourFalse))
    echo "<p class='o'>Un utilisateur n'est pas ajouté car le login est déjà attribué</p>";
  else
    echo "<p class='e'>Erreur lors de l'ajout d'un utilisateur avec un login déjà attribué</p>";
  
