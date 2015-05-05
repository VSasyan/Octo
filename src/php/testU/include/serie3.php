<?php

function testCreationCarte($tabCarte, $tabEvent){
    
    //Creation d'une carte
    $app = new App();
     
    $retour = $app->createCarte("{\"titre\":\"titreCarte\",\"idU\":\"1\",\"idP\":\"1\",\"description\":\"decrit\",\"debut_annee\":\"-55\",\"fin_annee\":\"2014\",\"duree\":\"120\"}");   
      
    $app->close();
    
    
    //Carte
    require "../conf/database.php";
      
    $mysqli = @new mysqli($database[$uses]["host"], $database[$uses]["user"], $database[$uses]["password"], $database[$uses]["database"]);
      
    $sql = "SELECT id, titre, idPortail, description, duree, debut_annee, fin_annee
    FROM carte ";
 
    $resultat = $mysqli->query($sql);
    $r = [];
    while ($obj = $resultat->fetch_array()) {
        $r[] = $obj;
    } 
      
      
    //Comparaison $r et $tabCarte
    foreach ($r as $n => $p) {
        foreach ($p as $m =>$q) {
                
            if (!is_int($m) && $q!=$tabCarte[$n][$m]){
                return false;
            }
        }
    }
     
    
    //Evenement
    $sql = "SELECT id, start, end, titre, theme, idCarte, idPage
    FROM evenement ";
 
    $resultat = $mysqli->query($sql);
    $r = [];
    while ($obj = $resultat->fetch_array()) {
        $r[] = $obj;
    }
  
      
    //Comparaison $r et $tabEvent
    foreach ($r as $n => $p) {
      foreach ($p as $m =>$q) {

        if (!is_int($m) && $q!=$tabEvent[$n][$m]){
            return false;
        }
      }
    }
      
    $mysqli->close();  
    return true;
    

}

function testListeCarte(){
    //Liste des cartes de l'utilisateur d'identifiant 1
    $app = new App();
     
    $retour = $app->getCartesFromUser(1);

    $app->close();
    
    $jsonCompare ="[{\"id\":\"1\",\"titre\":\"titreCarte\",\"description\":\"decrit\"},{\"id\":\"2\",\"titre\":\"titreCarte\",\"description\":\"decrit\"}]";

    return $jsonCompare==$retour;
}


 $tabCarte = array(
  
    0 => array(
      "id" => 1,
      "titre" => "titreCarte",
      "idPortail" => 1,
      "description" => "decrit",
      "duree" => 120,
      "debut_annee" => -55,
      "fin_annee" => 2014)
    );
 
 $tabCarte2 = array(
  
    0 => array(
      "id" => 1,
      "titre" => "titreCarte",
      "idPortail" => 1,
      "description" => "decrit",
      "duree" => 120,
      "debut_annee" => -55,
      "fin_annee" => 2014),
    
    1 => array(
      "id" => 2,
      "titre" => "titreCarte",
      "idPortail" => 1,
      "description" => "decrit",
      "duree" => 120,
      "debut_annee" => -55,
      "fin_annee" => 2014)
    );
 
 $tabEvent = array(
  
    0 => array(
      "id" => 1,
      "start" => "363-1-1",
      "end" => "363-1-1",
      "titre" => "Bataille de CtÃ©siphon (363)",
      "theme" => "defaut",
      "idCarte" => 1,
      "idPage" => 3019915),
     
    1 => array(
      "id" => 2,
      "start" => "1916-2-21",
      "end" => "1916-12-19",
      "titre" => "Bataille de Verdun (1916)",
      "theme" => "defaut",
      "idCarte" => 1,
      "idPage" => 49111),
     
    2 => array(
      "id" => 3,
      "start" => "-52-1-1",
      "end" => "-52-1-1",
      "titre" => "SiÃ¨ge d'AlÃ©sia",
      "theme" => "defaut",
      "idCarte" => 1,
      "idPage" => 56637)
    );
 
  $tabEvent2 = array(
  
    0 => array(
      "id" => 1,
      "start" => "363-1-1",
      "end" => "363-1-1",
      "titre" => "Bataille de CtÃ©siphon (363)",
      "theme" => "defaut",
      "idCarte" => 1,
      "idPage" => 3019915),
     
    1 => array(
      "id" => 2,
      "start" => "1916-2-21",
      "end" => "1916-12-19",
      "titre" => "Bataille de Verdun (1916)",
      "theme" => "defaut",
      "idCarte" => 1,
      "idPage" => 49111),
     
    2 => array(
      "id" => 3,
      "start" => "-52-1-1",
      "end" => "-52-1-1",
      "titre" => "SiÃ¨ge d'AlÃ©sia",
      "theme" => "defaut",
      "idCarte" => 1,
      "idPage" => 56637),
    
    3 => array(
      "id" => 4,
      "start" => "363-1-1",
      "end" => "363-1-1",
      "titre" => "Bataille de CtÃ©siphon (363)",
      "theme" => "defaut",
      "idCarte" => 2,
      "idPage" => 3019915),
     
    4 => array(
      "id" => 5,
      "start" => "1916-2-21",
      "end" => "1916-12-19",
      "titre" => "Bataille de Verdun (1916)",
      "theme" => "defaut",
      "idCarte" => 2,
      "idPage" => 49111),
     
    5 => array(
      "id" => 6,
      "start" => "-52-1-1",
      "end" => "-52-1-1",
      "titre" => "SiÃ¨ge d'AlÃ©sia",
      "theme" => "defaut",
      "idCarte" => 2,
      "idPage" => 56637)
    );
 

 if(testCreationCarte($tabCarte,$tabEvent))
    echo "<p class='o'>Creation d'une carte. Seuls les évenements possedant une geolocalisation sont créés.</p>";
  else
    echo "<p class='e'>Erreur lors de la creation d'une carte</p>";
  
  
 if(testCreationCarte($tabCarte2,$tabEvent2))
    echo "<p class='o'>Creation d'une nouvelle carte identique à la première. Les evenements sont dupliqués.</p>";
  else
    echo "<p class='e'>Erreur lors de la creation d'une carte identique à la première</p>";
  
  
  if(testListeCarte())
    echo "<p class='o'>Recuperation des cartes de l'utilisateur d'identifiant 1 avec succès</p>";
  else
    echo "<p class='e'>Erreur lors de la recuperation des cartes de l'utilisateur d'identifiant 1</p>";
  