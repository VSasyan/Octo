<?php

function compareCarte($tabCarte){
    
    //Carte
    require "../conf/database.php";
      
    $mysqli = @new mysqli($database[$uses]["host"], $database[$uses]["user"], $database[$uses]["password"], $database[$uses]["database"]);
      
    $sql = "SELECT id, titre, idPortail, description, echelle_temps_haut, echelle_temps_bas, duree, debut_annee, fin_annee
    FROM carte ";
 
    $resultat = $mysqli->query($sql);
    $mysqli->close(); 
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
    return true;
}

function compareEvenement($tabEvent){
    
    //Evenement
    require "../conf/database.php";
      
    $mysqli = @new mysqli($database[$uses]["host"], $database[$uses]["user"], $database[$uses]["password"], $database[$uses]["database"]);
      
    $sql = "SELECT id, start, end, titre, theme, importance, idCarte, idPage
    FROM evenement ";
 
    $resultat = $mysqli->query($sql);
    $mysqli->close(); 
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
    return true;
}


function testCreationCarte($jsonCreate, $tabCarte, $tabEvent, $jsonRetour){
    
    //Creation d'une carte
    $app = new App();
    
    $retour = $app->createCarte($jsonCreate);
    
    $app->close();
    
    
    //Carte
    $tabBool[0] = compareCarte($tabCarte);
     
    
    //Evenement
    $tabBool[1] = compareEvenement($tabEvent);
    
    
    //Retour
    $tabBool[2] = ($retour == $jsonRetour);
    
    return $tabBool;
}

function testListeCarte($id, $jsonCompare){
    
    //Liste des cartes de l'utilisateur d'identifiant id
    $app = new App();
     
    $retour = $app->getCartesFromUser($id);

    $app->close();
    
    return $jsonCompare==$retour;
}

function testChoixCarte($id, $tabCarte, $tabEvent){
    
    //Carte d'identifiant id
    $app = new App();
    
    $retour = $app->getCarte($id);
    
    $app->close();
    
    foreach ($retour as $n => $p) {
        if ($n=="tabEvenements"){
            foreach ($p as $cle => $event){
                foreach ($event as $m => $q){
                    if ($m=="point" || $m=="option"){
                        foreach($q as $o => $r){
                            if ($tabEvent[$cle][$m][$o]!=$r){
                                return false;
                            }
                        }
                    }
                    elseif ($tabEvent[$cle][$m]!=$q){
                        return false;
                    }
                }
            }
            
        }
        elseif ($tabCarte[0][$n]!=$p){
            return false;
        }
    }
    return true;
}

function testModifCarte($jsonModif, $tabCarte, $tabEvent){
    
    //Modification d'une carte
    $app = new App();
     
    $retour = $app->updateCarte($jsonModif);
    
    $app->close();
    
    
    
    //Carte
    $tabBool[0] = compareCarte($tabCarte);
     
    
    //Evenement
    $tabBool[1] = compareEvenement($tabEvent);
    
    
    //Retour
    $tabBool[2] = $retour["valide"];
    
    return $tabBool;
}

function testSuppressionCarte($id, $tabCarte, $tabEvent){
    
    //Suppression de la carte d'identifiant id
    $app = new App();
     
    $retour = $app->deleteCarte($id);
    
    $app->close();
    
    
    //Carte
    $tabBool[0] = compareCarte($tabCarte);
     
    
    //Evenement
    $tabBool[1] = compareEvenement($tabEvent);
    
    //Retour
    $tabBool[2] = $retour["valide"];
    
    return $tabBool;
}


 $tabCarte = array(
  
    0 => array(
      "id" => 1,
      "titre" => "titreCarte",
      "idPortail" => 1,
      "description" => "decrit",
      "echelle_temps_haut" => NULL,
      "echelle_temps_bas" => NULL,
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
      "echelle_temps_haut" => NULL,
      "echelle_temps_bas" => NULL,
      "duree" => 120,
      "debut_annee" => -55,
      "fin_annee" => 2014),
    
    1 => array(
      "id" => 2,
      "titre" => "titreCarte",
      "idPortail" => 1,
      "description" => "decrit",
      "echelle_temps_haut" => NULL,
      "echelle_temps_bas" => NULL,
      "duree" => 120,
      "debut_annee" => -55,
      "fin_annee" => 2014)
    );
 
 $tabCarte3 = array(
  
    0 => array(
      "id" => 1,
      "titre" => "Ma Vraie Rome",
      "idPortail" => 1,
      "description" => "petite description",
      "echelle_temps_haut" => 9,
      "echelle_temps_bas" => 7,
      "duree" => 120,
      "debut_annee" => -800,
      "fin_annee" => 410)
    );
 
 $tabEvent = array(
  
    0 => array(
      "id" => 1,
      "start" => "363-1-1",
      "end" => "363-1-1",
      "titre" => "Bataille de CtÃ©siphon (363)",
      "theme" => "defaut",
      "importance"  => 0.5,
      "idPage" => 3019915,
      "idCarte" => 1),
     
    1 => array(
      "id" => 2,
      "start" => "1916-2-21",
      "end" => "1916-12-19",
      "titre" => "Bataille de Verdun (1916)",
      "theme" => "defaut",
      "importance"  => 0.5,
      "idPage" => 49111,
      "idCarte" => 1),
     
    2 => array(
      "id" => 3,
      "start" => "-52-1-1",
      "end" => "-52-1-1",
      "titre" => "SiÃ¨ge d'AlÃ©sia",
      "theme" => "defaut",
      "importance"  => 0.5,
      "idPage" => 56637,
      "idCarte" => 1)
    );
 
  $tabEvent2 = array(
  
    0 => array(
      "id" => 1,
      "start" => "363-1-1",
      "end" => "363-1-1",
      "titre" => "Bataille de CtÃ©siphon (363)",
      "theme" => "defaut",
      "importance"  => 0.5,
      "idPage" => 3019915,
      "idCarte" => 1),
     
    1 => array(
      "id" => 2,
      "start" => "1916-2-21",
      "end" => "1916-12-19",
      "titre" => "Bataille de Verdun (1916)",
      "theme" => "defaut",
      "importance"  => 0.5,
      "idPage" => 49111,
      "idCarte" => 1),
     
    2 => array(
      "id" => 3,
      "start" => "-52-1-1",
      "end" => "-52-1-1",
      "titre" => "SiÃ¨ge d'AlÃ©sia",
      "theme" => "defaut",
      "importance"  => 0.5,
      "idPage" => 56637,
      "idCarte" => 1),
    
    3 => array(
      "id" => 4,
      "start" => "363-1-1",
      "end" => "363-1-1",
      "titre" => "Bataille de CtÃ©siphon (363)",
      "theme" => "defaut",
      "importance"  => 0.5,
      "idPage" => 3019915,
      "idCarte" => 2),
     
    4 => array(
      "id" => 5,
      "start" => "1916-2-21",
      "end" => "1916-12-19",
      "titre" => "Bataille de Verdun (1916)",
      "theme" => "defaut",
      "importance"  => 0.5,
      "idPage" => 49111,
      "idCarte" => 2),
     
    5 => array(
      "id" => 6,
      "start" => "-52-1-1",
      "end" => "-52-1-1",
      "titre" => "SiÃ¨ge d'AlÃ©sia",
      "theme" => "defaut",
      "importance"  => 0.5,
      "idPage" => 56637,
      "idCarte" => 2)
    );
  
  $tabEvent3 = array(
  
    0 => array(
      "id" => 1,
      "start" => "363-1-1",
      "end" => "363-1-1",
      "titre" => "Bataille de CtÃ©siphon (363)",
      "theme" => "batailleGrand",
      "importance"  => 0.5,
      "idPage" => 3019915,
      "idCarte" => 1),
     
    1 => array(
      "id" => 2,
      "start" => "1916-2-21",
      "end" => "1916-12-19",
      "titre" => "Bataille de Verdun (1916)",
      "theme" => "defaut",
      "importance"  => 0.5,
      "idPage" => 49111,
      "idCarte" => 1),
     
    2 => array(
      "id" => 3,
      "start" => "-52-1-1",
      "end" => "-52-1-1",
      "titre" => "SiÃ¨ge d'AlÃ©sia",
      "theme" => "defaut",
      "importance"  => 0.5,
      "idPage" => 56637,
      "idCarte" => 1), 
    );
 
 $tabEventjson = array(
  
    0 => array(
      "start" => "363-1-1",
      "end" => "363-1-1",
      "title" => "Bataille de CtÃ©siphon (363)",
      "point" => array(
          "lon" => 44.5833,
          "lat" => 33.1,
      ),
      "options" => array(
          "theme" => "defaut",
          "importance"  => 0.5,
          "ide" => 1,
          "idp" => 3019915,
          "infobox" => "conflit militaire",
          "url" => "http://fr.wikipedia.org/wiki/Bataille_de_Ct%C3%A9siphon_(363)"
      )),
     
    1 => array(
      "start" => "1916-2-21",
      "end" => "1916-12-19",
      "title" => "Bataille de Verdun (1916)",
      "point" => array(
          "lon" => 5.38842,
          "lat" => 49.1608,
      ),
      "options" => array(
          "theme" => "defaut",
          "importance"  => 0.5,
          "ide" => 2,
          "idp" => 49111,
          "infobox" => "Conflit militaire",
          "url" => "http://fr.wikipedia.org/wiki/Bataille_de_Verdun_(1916)"
      )),
     
    2 => array(
      "start" => "-52-1-1",
      "end" => "-52-1-1",
      "title" => "SiÃ¨ge d'AlÃ©sia",
      "point" => array(
          "lon" => 4.50028,
          "lat" => 47.5372,
      ),
      "options" => array(
          "theme" => "defaut",
          "importance"  => 0.5,
          "ide" => 3,
          "idp" => 56637,
          "infobox" => "Conflit militaire",
          "url" => "http://fr.wikipedia.org/wiki/Si%C3%A8ge_d%27Al%C3%A9sia"
      ))
    );
 
 
 
 $jsonCreate =  "{\"titre\":\"titreCarte\",\"idU\":\"1\",\"idP\":\"1\",\"description\":\"decrit\",\"echelle_temps_haut\":\"NULL\", \"echelle_temps_bas\":\"NULL\",\"debut_annee\":\"-55\",\"fin_annee\":\"2014\",\"duree\":\"120\"}";
 $jsonModif1 = "{\"carte\": {\"idCarte\":1, \"titre\": \"Ma Vraie Rome\", \"description\": \"petite description\", \"debut_annee\": \"-800\", \"echelle_temps_haut\": \"9\", \"echelle_temps_bas\": \"7\", \"fin_annee\": \"410\", \"duree\": \"120\"}, \"majEve\": {\"tabEvenements\": [{\"start\":\"363-1-1\",\"end\":\"363-1-1\",\"title\":\"Bataille de Ct\u00c3\u00a9siphon (363)\",\"point\":{\"lat\":\"33.1\",\"lon\":\"44.5833\"},\"options\":{\"theme\":\"defaut\",\"importance\":\"0.5\",\"idp\":\"3019915\",\"ide\":\"1\",\"infobox\":\"conflit militaire\",\"url\":\"http:\/\/fr.wikipedia.org\/wiki\/Bataille_de_Ct%C3%A9siphon_(363)\"}},{\"start\":\"1916-2-21\",\"end\":\"1916-12-19\",\"title\":\"Bataille de Verdun (1916)\",\"point\":{\"lat\":\"49.1608\",\"lon\":\"5.38842\"},\"options\":{\"theme\":\"defaut\",\"importance\":\"0.5\",\"idp\":\"49111\",\"ide\":\"2\",\"infobox\":\"Conflit militaire\",\"url\":\"http:\/\/fr.wikipedia.org\/wiki\/Bataille_de_Verdun_(1916)\"}},{\"start\":\"-52-1-1\",\"end\":\"-52-1-1\",\"title\":\"Si\u00c3\u00a8ge d'Al\u00c3\u00a9sia\",\"point\":{\"lat\":\"47.5372\",\"lon\":\"4.50028\"},\"options\":{\"theme\":\"defaut\",\"importance\":\"0.5\",\"idp\":\"56637\",\"ide\":\"3\",\"infobox\":\"Conflit militaire\",\"url\":\"http:\/\/fr.wikipedia.org\/wiki\/Si%C3%A8ge_d%27Al%C3%A9sia\"}}],\"aSuppr\": [\"1565\", \"1566\", \"1567\", \"1568\", \"1569\", \"1570\"]}}";
 $jsonModif2 = "{\"carte\": {\"idCarte\":1, \"titre\": \"Ma Vraie Rome\", \"description\": \"petite description\", \"debut_annee\": \"-800\", \"echelle_temps_haut\": \"9\", \"echelle_temps_bas\": \"7\", \"fin_annee\": \"410\", \"duree\": \"120\"}, \"majEve\": {\"tabEvenements\": [{\"start\":\"363-1-1\",\"end\":\"363-1-1\",\"title\":\"Bataille de Ct\u00c3\u00a9siphon (363)\",\"point\":{\"lat\":\"33.1\",\"lon\":\"44.5833\"},\"options\":{\"theme\":\"batailleGrand\",,\"importance\":\"0.5\"\"idp\":\"3019915\",\"ide\":\"1\",\"infobox\":\"conflit militaire\",\"url\":\"http:\/\/fr.wikipedia.org\/wiki\/Bataille_de_Ct%C3%A9siphon_(363)\"}},{\"start\":\"1916-2-21\",\"end\":\"1916-12-19\",\"title\":\"Bataille de Verdun (1916)\",\"point\":{\"lat\":\"49.1608\",\"lon\":\"5.38842\"},\"options\":{\"theme\":\"defaut\",\"importance\":\"0.5\",\"idp\":\"49111\",\"ide\":\"2\",\"infobox\":\"Conflit militaire\",\"url\":\"http:\/\/fr.wikipedia.org\/wiki\/Bataille_de_Verdun_(1916)\"}},{\"start\":\"-52-1-1\",\"end\":\"-52-1-1\",\"title\":\"Si\u00c3\u00a8ge d'Al\u00c3\u00a9sia\",\"point\":{\"lat\":\"47.5372\",\"lon\":\"4.50028\"},\"options\":{\"theme\":\"defaut\",\"importance\":\"0.5\",\"idp\":\"56637\",\"ide\":\"3\",\"infobox\":\"Conflit militaire\",\"url\":\"http:\/\/fr.wikipedia.org\/wiki\/Si%C3%A8ge_d%27Al%C3%A9sia\"}}],\"aSuppr\": [\"1565\", \"1566\", \"1567\", \"1568\", \"1569\", \"1570\"]}}";
 $jsonCompare ="[{\"id\":\"1\",\"titre\":\"titreCarte\",\"description\":\"decrit\"},{\"id\":\"2\",\"titre\":\"titreCarte\",\"description\":\"decrit\"}]";
 
 $jsonRetour1 = "{\"id\":\"1\",\"titre\":\"titreCarte\",\"description\":\"decrit\",\"echelle_temps_haut\":null,\"echelle_temps_bas\":null,\"duree\":\"120\",\"debut_annee\":\"-55\",\"fin_annee\":\"2014\",\"tabEvenements\":[{\"start\":\"363-1-1\",\"end\":\"363-1-1\",\"title\":\"Bataille de Ct\u00c3\u00a9siphon (363)\",\"point\":{\"lat\":\"33.1\",\"lon\":\"44.5833\"},\"options\":{\"theme\":\"defaut\",\"importance\":\"0.5\",\"idp\":\"3019915\",\"ide\":\"1\",\"infobox\":\"conflit militaire\",\"url\":\"http:\/\/fr.wikipedia.org\/wiki\/Bataille_de_Ct%C3%A9siphon_(363)\"}},{\"start\":\"1916-2-21\",\"end\":\"1916-12-19\",\"title\":\"Bataille de Verdun (1916)\",\"point\":{\"lat\":\"49.1608\",\"lon\":\"5.38842\"},\"options\":{\"theme\":\"defaut\",\"importance\":\"0.5\",\"idp\":\"49111\",\"ide\":\"2\",\"infobox\":\"Conflit militaire\",\"url\":\"http:\/\/fr.wikipedia.org\/wiki\/Bataille_de_Verdun_(1916)\"}},{\"start\":\"-52-1-1\",\"end\":\"-52-1-1\",\"title\":\"Si\u00c3\u00a8ge d'Al\u00c3\u00a9sia\",\"point\":{\"lat\":\"47.5372\",\"lon\":\"4.50028\"},\"options\":{\"theme\":\"defaut\",\"importance\":\"0.5\",\"idp\":\"56637\",\"ide\":\"3\",\"infobox\":\"Conflit militaire\",\"url\":\"http:\/\/fr.wikipedia.org\/wiki\/Si%C3%A8ge_d%27Al%C3%A9sia\"}}],\"valide\":true}";
 $jsonRetour2 = "{\"id\":\"2\",\"titre\":\"titreCarte\",\"description\":\"decrit\",\"echelle_temps_haut\":null,\"echelle_temps_bas\":null,\"duree\":\"120\",\"debut_annee\":\"-55\",\"fin_annee\":\"2014\",\"tabEvenements\":[{\"start\":\"363-1-1\",\"end\":\"363-1-1\",\"title\":\"Bataille de Ct\u00c3\u00a9siphon (363)\",\"point\":{\"lat\":\"33.1\",\"lon\":\"44.5833\"},\"options\":{\"theme\":\"defaut\",\"importance\":\"0.5\",\"idp\":\"3019915\",\"ide\":\"4\",\"infobox\":\"conflit militaire\",\"url\":\"http:\/\/fr.wikipedia.org\/wiki\/Bataille_de_Ct%C3%A9siphon_(363)\"}},{\"start\":\"1916-2-21\",\"end\":\"1916-12-19\",\"title\":\"Bataille de Verdun (1916)\",\"point\":{\"lat\":\"49.1608\",\"lon\":\"5.38842\"},\"options\":{\"theme\":\"defaut\",\"importance\":\"0.5\",\"idp\":\"49111\",\"ide\":\"5\",\"infobox\":\"Conflit militaire\",\"url\":\"http:\/\/fr.wikipedia.org\/wiki\/Bataille_de_Verdun_(1916)\"}},{\"start\":\"-52-1-1\",\"end\":\"-52-1-1\",\"title\":\"Si\u00c3\u00a8ge d'Al\u00c3\u00a9sia\",\"point\":{\"lat\":\"47.5372\",\"lon\":\"4.50028\"},\"options\":{\"theme\":\"defaut\",\"importance\":\"0.5\",\"idp\":\"56637\",\"ide\":\"6\",\"infobox\":\"Conflit militaire\",\"url\":\"http:\/\/fr.wikipedia.org\/wiki\/Si%C3%A8ge_d%27Al%C3%A9sia\"}}],\"valide\":true}";
 
 
 
  
 $tabBool = testCreationCarte($jsonCreate, $tabCarte, $tabEvent, $jsonRetour1);
 if($tabBool==array(0 => true, 1 => true, 2 => true))
    echo "<p class='o'>Creation d'une carte. Seuls les évenements possedant une geolocalisation sont créés.</p>";
  else {
    echo "<p class='e'>Erreur lors de la creation d'une carte</p>";
      if ($tabBool[0]==false)
          echo "<p class='e'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;L'enregistrement de la carte s'est mal déroulé.</p>";
      if ($tabBool[1]==false)
          echo "<p class='e'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;L'enregistrement des evenements s'est mal déroulé.</p>";
      if ($tabBool[2]==false)
          echo "<p class='e'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Le retour n'est pas celui attendu.</p>";
  }
     
    
 $tabBool = testCreationCarte($jsonCreate, $tabCarte2, $tabEvent2, $jsonRetour2);
 if($tabBool==array(0 => true, 1 => true, 2 => true))
    echo "<p class='o'>Creation d'une nouvelle carte identique à la première. Les evenements sont dupliqués.</p>";
  else {
    echo "<p class='e'>Erreur lors de la creation d'une carte identique à la première</p>";
      if ($tabBool[0]==false)
          echo "<p class='e'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;L'enregistrement de la carte s'est mal déroulé.</p>";
      if ($tabBool[1]==false)
          echo "<p class='e'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;L'enregistrement des evenements s'est mal déroulé.</p>";
      if ($tabBool[2]==false)
          echo "<p class='e'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Le retour n'est pas celui attendu.</p>";
  }
      
  
  if(testListeCarte(1, $jsonCompare))
    echo "<p class='o'>Recuperation des cartes de l'utilisateur d'identifiant 1 avec succès</p>";
  else
    echo "<p class='e'>Erreur lors de la recuperation des cartes de l'utilisateur d'identifiant 1</p>";
  
  
  if(testChoixCarte(1, $tabCarte, $tabEventjson))
    echo "<p class='o'>Recuperation de la carte d'identifiant 1 avec succès</p>";
  else
    echo "<p class='e'>Erreur lors de la recuperation de la carte d'identifiant 1</p>";
  
  
 $tabBool = testSuppressionCarte(2,$tabCarte,$tabEvent);
 if($tabBool==array(0 => true, 1 => true, 2 => true))
    echo "<p class='o'>Suppression de la carte d'identifiant 2 avec succès</p>";
  else {
    echo "<p class='e'>Erreur lors de la suppression de la carte d'identifiant 2</p>";
      if ($tabBool[0]==false)
          echo "<p class='e'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;La suppression de la carte s'est mal déroulé.</p>";
      if ($tabBool[1]==false)
          echo "<p class='e'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;La suppression des evenements s'est mal déroulé.</p>";
      if ($tabBool[2]==false)
          echo "<p class='e'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Le retour n'est pas celui attendu.</p>";
  }
  
  
 $tabBool = testModifCarte($jsonModif1,$tabCarte3,$tabEvent);
 if($tabBool==array(0 => true, 1 => true, 2 => true))
    echo "<p class='o'>Modification de la carte d'identifiant 1 avec succès</p>";
  else {
    echo "<p class='e'>Erreur lors de la modification de la carte d'identifiant 1</p>";
      if ($tabBool[0]==false)
          echo "<p class='e'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;L'enregistrement de la carte s'est mal déroulé.</p>";
      if ($tabBool[1]==false)
          echo "<p class='e'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;L'enregistrement des evenements s'est mal déroulé.</p>";
      if ($tabBool[2]==false)
          echo "<p class='e'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Le retour n'est pas celui attendu.</p>";
  }
  
 $tabBool = testModifCarte($jsonModif2,$tabCarte3,$tabEvent3);
 if($tabBool==array(0 => true, 1 => true, 2 => true))
    echo "<p class='o'>Modification du theme d'un evenement de la carte d'identifiant 1</p>";
  else {
    echo "<p class='e'>Erreur lors de la modification du theme d'un evenement de la carte d'identifiant 1</p>";
      if ($tabBool[0]==false)
          echo "<p class='e'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;L'enregistrement de la carte s'est mal déroulé.</p>";
      if ($tabBool[1]==false)
          echo "<p class='e'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;L'enregistrement des evenements s'est mal déroulé.</p>";
      if ($tabBool[2]==false)
          echo "<p class='e'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Le retour n'est pas celui attendu.</p>";
  }
  
  

