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
                echo "Carte erreur";
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
            echo "<p>".$q;
            echo $tabEvent[$n][$m]."</p>";
            echo "Evenement erreur";
            return false;
        }
      }
    }
      
    $mysqli->close();  
    return true;
    

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
 
 $tabEvent = array(
  
    0 => array(
      "id" => 1,
      "start" => "-446-1-1",
      "end" => "-446-1-1",
      "titre" => "Bataille de Corbione",
      "theme" => "defaut",
      "idCarte" => 1,
      "idPage" => 8449414),
    
    1 => array(
      "id" => 2,
      "start" => "363-1-1",
      "end" => "363-1-1",
      "titre" => "Bataille de CtÃ©siphon (363)",
      "theme" => "defaut",
      "idCarte" => 1,
      "idPage" => 3019915),
    
    2 => array(
      "id" => 3,
      "start" => "-48-7-10",
      "end" => "-48-7-10",
      "titre" => "Bataille de Dyrrachium (48 av. J.-C.)",
      "theme" => "defaut",
      "idCarte" => 1,
      "idPage" => 732581),
     
    3 => array(
      "id" => 4,
      "start" => "1916-2-21",
      "end" => "1916-12-19",
      "titre" => "Bataille de Verdun (1916)",
      "theme" => "defaut",
      "idCarte" => 1,
      "idPage" => 49111),
    
    4 => array(
      "id" => 5,
      "start" => "-82-11-1",
      "end" => "-82-11-1",
      "titre" => "Bataille de la Porte Colline",
      "theme" => "defaut",
      "idCarte" => 1,
      "idPage" => 2895689),
     
    5 => array(
      "id" => 6,
      "start" => "-52-1-1",
      "end" => "-52-1-1",
      "titre" => "SiÃ¨ge d'AlÃ©sia",
      "theme" => "defaut",
      "idCarte" => 1,
      "idPage" => 56637)
    );
 

 if(testCreationCarte($tabCarte,$tabEvent))
    echo "<p class='o'>Creation d'une carte et des évenements liés</p>";
  else
    echo "<p class='e'>Erreur lors de la creation d'une carte</p>";