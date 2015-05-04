<?php
     
  
  function testListePage(){
  
      //Liste des pages
      $app = new App();
      
      $idPortail = 1;
      $json = $app->jsonPagesPortail($idPortail);   
      
      $app->close();
      
      $jsonCompare = "{\"id\":\"1\",\"nom\":\"Portail\",\"lien\":\"lien\",\"tabArticles\":[{\"titre\":\"Bataille de Corbione\",\"url\":\"http:\/\/fr.wikipedia.org\/wiki\/Bataille_de_Corbione\",\"id\":\"8449414\",\"lon\":\"0\",\"lat\":\"0\",\"type_infobox\":\"Conflit militaire\",\"nb_langue\":\"8\",\"nb_visite\":\"0\",\"longueur\":\"8022\",\"debut_annee\":\"-446\",\"debut_mois\":\"0\",\"debut_jour\":\"0\",\"fin_annee\":\"-446\",\"fin_mois\":\"0\",\"fin_jour\":\"0\",\"distance_portail\":\"2\"},{\"titre\":\"Bataille de Ct\u00c3\u00a9siphon (363)\",\"url\":\"http:\/\/fr.wikipedia.org\/wiki\/Bataille_de_Ct%C3%A9siphon_(363)\",\"id\":\"3019915\",\"lon\":\"44.5833\",\"lat\":\"33.1\",\"type_infobox\":\"conflit militaire\",\"nb_langue\":\"10\",\"nb_visite\":\"0\",\"longueur\":\"5801\",\"debut_annee\":\"363\",\"debut_mois\":\"0\",\"debut_jour\":\"0\",\"fin_annee\":\"363\",\"fin_mois\":\"0\",\"fin_jour\":\"0\",\"distance_portail\":\"2\"},{\"titre\":\"Bataille de Dyrrachium (48 av. J.-C.)\",\"url\":\"http:\/\/fr.wikipedia.org\/wiki\/Bataille_de_Dyrrachium_(48_av._J.-C.)\",\"id\":\"732581\",\"lon\":\"0\",\"lat\":\"0\",\"type_infobox\":\"Conflit militaire\",\"nb_langue\":\"18\",\"nb_visite\":\"0\",\"longueur\":\"4208\",\"debut_annee\":\"-48\",\"debut_mois\":\"7\",\"debut_jour\":\"10\",\"fin_annee\":\"-48\",\"fin_mois\":\"7\",\"fin_jour\":\"10\",\"distance_portail\":\"2\"},{\"titre\":\"Bataille de Verdun (1916)\",\"url\":\"http:\/\/fr.wikipedia.org\/wiki\/Bataille_de_Verdun_(1916)\",\"id\":\"49111\",\"lon\":\"5.38842\",\"lat\":\"49.1608\",\"type_infobox\":\"Conflit militaire\",\"nb_langue\":\"53\",\"nb_visite\":\"0\",\"longueur\":\"65825\",\"debut_annee\":\"1916\",\"debut_mois\":\"2\",\"debut_jour\":\"21\",\"fin_annee\":\"1916\",\"fin_mois\":\"12\",\"fin_jour\":\"19\",\"distance_portail\":\"2\"},{\"titre\":\"Bataille de la Porte Colline\",\"url\":\"http:\/\/fr.wikipedia.org\/wiki\/Bataille_de_la_Porte_Colline\",\"id\":\"2895689\",\"lon\":\"0\",\"lat\":\"0\",\"type_infobox\":\"Conflit militaire\",\"nb_langue\":\"11\",\"nb_visite\":\"0\",\"longueur\":\"3098\",\"debut_annee\":\"-82\",\"debut_mois\":\"11\",\"debut_jour\":\"0\",\"fin_annee\":\"-82\",\"fin_mois\":\"11\",\"fin_jour\":\"0\",\"distance_portail\":\"2\"},{\"titre\":\"Si\u00c3\u00a8ge d'Al\u00c3\u00a9sia\",\"url\":\"http:\/\/fr.wikipedia.org\/wiki\/Si%C3%A8ge_d%27Al%C3%A9sia\",\"id\":\"56637\",\"lon\":\"4.50028\",\"lat\":\"47.5372\",\"type_infobox\":\"Conflit militaire\",\"nb_langue\":\"37\",\"nb_visite\":\"0\",\"longueur\":\"82550\",\"debut_annee\":\"-52\",\"debut_mois\":\"0\",\"debut_jour\":\"0\",\"fin_annee\":\"-52\",\"fin_mois\":\"0\",\"fin_jour\":\"0\",\"distance_portail\":\"2\"}]}";
      
      return $json==$jsonCompare;
     
  }
  

  function testAjoutPage($tab1, $tab2){
  
      //Enregistrer pages
      $app = new App();
      
      $app->savePages(json_encode($tab1)); 
      
      $app->close();
      
      
      
      //Recuperer infos pages, status, liens
      require "../conf/database.php";
      
      $mysqli = @new mysqli($database[$uses]["host"], $database[$uses]["user"], $database[$uses]["password"], $database[$uses]["database"]);
      
      $sql = "SELECT page.id, lien.titre, lien.url as lien, page.lon, page.lat, page.nb_langue, page.nb_visite, page.longueur, page.debut_annee, 
      page.debut_mois, page.debut_jour, page.fin_annee, page.fin_mois, page.fin_jour, 
      page.distance_portail as distance_Portail, page.type_infobox
       FROM page, status, lien WHERE lien.idPage=page.id AND lien.id=status.idLien ";
 
      $resultat = $mysqli->query($sql);
      $r = [];
      while ($obj = $resultat->fetch_array()) {
            $r[] = $obj;
      }
      $mysqli->close();   
      
      
      
      //Comparaison $r et $tab2
      foreach ($r as $n => $p) {
        foreach ($p as $m =>$q) {
                
                if (!is_int($m) && $q!=$tab2[$n][$m]){
                    return false;
                }
        }
      }
      return true;
     
  }
    
  
  function testListePortail(){
  
      //Liste des portails
      $app = new App();
      
      $json = $app->getPortailsJSON(['id', 'nom', 'lien']); 
      
      $app->close();
      
      $jsonCompare = "[{\"id\":\"1\",\"nom\":\"Portail\",\"lien\":\"lien\"},{\"id\":\"2\",\"nom\":\"Portail\",\"lien\":\"lien\"}]";
      
      return $json==$jsonCompare;
     
  }
  
          
  function testAjoutPortail($tab){
      
      //Ajout d'un portail
      $app = new App();
      
      $app->addPortail("Portail", "lien");
      
      $app->close();
      
      
       //Recuperer id, nom et lien du portail enregistre
      require "../conf/database.php";
      
      $mysqli = @new mysqli($database[$uses]["host"], $database[$uses]["user"], $database[$uses]["password"], $database[$uses]["database"]);
      
      $sql = "SELECT id, nom, lien
       FROM Portail";
 
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
      return true;
  }
  
  
  
  function videTables(){

    //Suppression des entrees de toutes les tables
    require "../conf/database.php";
      
    $mysqli = @new mysqli($database[$uses]["host"], $database[$uses]["user"], $database[$uses]["password"], $database[$uses]["database"]);
      
    $sql = "TRUNCATE carte "; 
    $resultat = $mysqli->query($sql);
    
    $sql = "TRUNCATE carteevenement "; 
    $resultat = $mysqli->query($sql);
    
    $sql = "TRUNCATE checkcount "; 
    $resultat = $mysqli->query($sql);
    
    $sql = "TRUNCATE evenement "; 
    $resultat = $mysqli->query($sql);
    
    $sql = "TRUNCATE lien "; 
    $resultat = $mysqli->query($sql);
    
    $sql = "TRUNCATE page "; 
    $resultat = $mysqli->query($sql);
    
    $sql = "TRUNCATE pageimportance "; 
    $resultat = $mysqli->query($sql);
    
    $sql = "TRUNCATE pagecompletes "; 
    $resultat = $mysqli->query($sql);
    
    $sql = "TRUNCATE portail "; 
    $resultat = $mysqli->query($sql);
    
    $sql = "TRUNCATE portailmax "; 
    $resultat = $mysqli->query($sql);
    
    $sql = "TRUNCATE role "; 
    $resultat = $mysqli->query($sql);
    
    $sql = "TRUNCATE status "; 
    $resultat = $mysqli->query($sql);
    
    $sql = "TRUNCATE test "; 
    $resultat = $mysqli->query($sql);
    
    $sql = "TRUNCATE usersrole "; 
    $resultat = $mysqli->query($sql);
    
    $sql = "TRUNCATE utilisateur "; 
    $resultat = $mysqli->query($sql);
    
    $mysqli->close(); 
}

  function ajoutRoles(){
    
    //Initialise la table role
    require "../conf/database.php";
      
    $mysqli = @new mysqli($database[$uses]["host"], $database[$uses]["user"], $database[$uses]["password"], $database[$uses]["database"]);
      
    $sql = "INSERT INTO role(id,type) VALUES(1,\"Simple\")"; 
    $resultat = $mysqli->query($sql);
    
    $sql = "INSERT INTO role(id,type) VALUES(2,\"Editeur\")"; 
    $resultat = $mysqli->query($sql);
    
    $sql = "INSERT INTO role(id,type) VALUES(3,\"Administrateur\")"; 
    $resultat = $mysqli->query($sql);
    
    $mysqli->close();
  }
  
  

  $tab = array(
  
    0 => array(
      "id" => 8449414,
      "titre" => "Bataille de Corbione",
      "lon" => 0,
      "lat" => 0,
      "nb_langue" => 6,
      "nb_visite" => 0,
      "longueur" => 8022,
      "lien" => "http://fr.wikipedia.org/wiki/Bataille_de_Corbione",
      "debut_annee" => -446,
      "debut_mois" => 0,
      "debut_jour" => 0,
      "fin_annee" => -446,
      "fin_mois" => 0,
      "fin_jour" => 0,
      "type_infobox" => "Conflit militaire",
      "distance_Portail" => 2,
      "portail_id" => 1),
    
    1 => array(
      "id" => 3019915,
      "titre" => "Bataille de CtÃ©siphon (363)",
      "lon" => 44.5833,
      "lat" => 33.1,
      "nb_langue" => 10,
      "nb_visite" => 0,
      "longueur" => 5801,
      "lien" => "http://fr.wikipedia.org/wiki/Bataille_de_Ct%C3%A9siphon_(363)",
      "debut_annee" => 363,
      "debut_mois" => 0,
      "debut_jour" => 0,
      "fin_annee" => 363,
      "fin_mois" => 0,
      "fin_jour" => 0,
      "type_infobox" => "conflit militaire",
      "distance_Portail" => 2,
      "portail_id" => 1),
    
    2 => array(
      "id" => 732581,
      "titre" => "Bataille de Dyrrachium (48 av. J.-C.)",
      "lon" => 0,
      "lat" => 0,
      "nb_langue" => 18,
      "nb_visite" => 0,
      "longueur" => 4208,
      "lien" => "http://fr.wikipedia.org/wiki/Bataille_de_Dyrrachium_(48_av._J.-C.)",
      "debut_annee" => -48,
      "debut_mois" => 7,
      "debut_jour" => 10,
      "fin_annee" => -48,
      "fin_mois" => 7,
      "fin_jour" => 10,
      "type_infobox" => "Conflit militaire",
      "distance_Portail" => 2,
      "portail_id" => 1), 
    
    3 => array(
      "id" => 49111,
      "titre" => "Bataille de Verdun (1916)",
      "lon" => 5.38842,
      "lat" => 49.1608,
      "nb_langue" => 53,
      "nb_visite" => 0,
      "longueur" => 65825,
      "lien" => "http://fr.wikipedia.org/wiki/Bataille_de_Verdun_(1916)",
      "debut_annee" => 1916,
      "debut_mois" => 2,
      "debut_jour" => 21,
      "fin_annee" => 1916,
      "fin_mois" => 12,
      "fin_jour" => 19,
      "type_infobox" => "Conflit militaire",
      "distance_Portail" => 2,
      "portail_id" => 1),
     
    4 => array(
      "id" => 2895689,
      "titre" => "Bataille de la Porte Colline",
      "lon" => 0,
      "lat" => 0,
      "nb_langue" => 11,
      "nb_visite" => 0,
      "longueur" => 3098,
      "lien" => "http://fr.wikipedia.org/wiki/Bataille_de_la_Porte_Colline",
      "debut_annee" => -82,
      "debut_mois" => 11,
      "debut_jour" => 0,
      "fin_annee" => -82,
      "fin_mois" => 11,
      "fin_jour" => 0,
      "type_infobox" => "Conflit militaire",
      "distance_Portail" => 2,
      "portail_id" => 1),
     
    5 => array(
      "id" => 56637,
      "titre" => "SiÃ¨ge d'AlÃ©sia",
      "lon" => 4.50028,
      "lat" => 47.5372,
      "nb_langue" => 37,
      "nb_visite" => 0,
      "longueur" => 82550,
      "lien" => "http://fr.wikipedia.org/wiki/Si%C3%A8ge_d%27Al%C3%A9sia",
      "debut_annee" => -52,
      "debut_mois" => 0,
      "debut_jour" => 0,
      "fin_annee" => -52,
      "fin_mois" => 0,
      "fin_jour" => 0,
      "type_infobox" => "Conflit militaire",
      "distance_Portail" => 2,
      "portail_id" => 1) 
  
  );

  
$tab2 = array(
  
    0 => array(
      "id" => 8449414,
      "titre" => "Bataille de Corbione",
      "lon" => 0,
      "lat" => 0,
      "nb_langue" => 6,
      "nb_visite" => 0,
      "longueur" => 8022,
      "lien" => "http://fr.wikipedia.org/wiki/Bataille_de_Corbione",
      "debut_annee" => -446,
      "debut_mois" => 0,
      "debut_jour" => 0,
      "fin_annee" => -446,
      "fin_mois" => 0,
      "fin_jour" => 0,
      "type_infobox" => "Conflit militaire",
      "distance_Portail" => 2,
      "portail_id" => 1),
      
    1 => array(
      "id" => 8449414,
      "titre" => "Bataille de Corbione",
      "lon" => 0,
      "lat" => 0,
      "nb_langue" => 6,
      "nb_visite" => 0,
      "longueur" => 8022,
      "lien" => "http://fr.wikipedia.org/wiki/Bataille_de_Corbione",
      "debut_annee" => -446,
      "debut_mois" => 0,
      "debut_jour" => 0,
      "fin_annee" => -446,
      "fin_mois" => 0,
      "fin_jour" => 0,
      "type_infobox" => "Conflit militaire",
      "distance_Portail" => 2,
      "portail_id" => 1),   
    );
    
    
  $tab3 = array(
  
    0 => array(
      "id" => 8449414,
      "titre" => "Bataille de Corbione",
      "lon" => 0,
      "lat" => 0,
      "nb_langue" => 2,
      "nb_visite" => 0,
      "longueur" => 8022,
      "lien" => "http://fr.wikipedia.org/wiki/Bataille_de_Corbione",
      "debut_annee" => -446,
      "debut_mois" => 0,
      "debut_jour" => 0,
      "fin_annee" => -446,
      "fin_mois" => 0,
      "fin_jour" => 0,
      "type_infobox" => "Conflit militaire",
      "distance_Portail" => 2,
      "portail_id" => 1),
      
    1 => array(
      "id" => 8449414,
      "titre" => "Bataille de Corbione",
      "lon" => 0,
      "lat" => 0,
      "nb_langue" => 8,
      "nb_visite" => 0,
      "longueur" => 8022,
      "lien" => "http://fr.wikipedia.org/wiki/Bataille_de_Corbione",
      "debut_annee" => -446,
      "debut_mois" => 0,
      "debut_jour" => 0,
      "fin_annee" => -446,
      "fin_mois" => 0,
      "fin_jour" => 0,
      "type_infobox" => "Conflit militaire",
      "distance_Portail" => 2,
      "portail_id" => 1),   
    );
    

 $tab33 = array(
  
    0 => array(
      "id" => 8449414,
      "titre" => "Bataille de Corbione",
      "lon" => 0,
      "lat" => 0,
      "nb_langue" => 8,
      "nb_visite" => 0,
      "longueur" => 8022,
      "lien" => "http://fr.wikipedia.org/wiki/Bataille_de_Corbione",
      "debut_annee" => -446,
      "debut_mois" => 0,
      "debut_jour" => 0,
      "fin_annee" => -446,
      "fin_mois" => 0,
      "fin_jour" => 0,
      "type_infobox" => "Conflit militaire",
      "distance_Portail" => 2,
      "portail_id" => 1),
    
    1 => array(
      "id" => 3019915,
      "titre" => "Bataille de CtÃ©siphon (363)",
      "lon" => 44.5833,
      "lat" => 33.1,
      "nb_langue" => 10,
      "nb_visite" => 0,
      "longueur" => 5801,
      "lien" => "http://fr.wikipedia.org/wiki/Bataille_de_Ct%C3%A9siphon_(363)",
      "date_maj" => "2015-03-12 18:41:43",
      "debut_annee" => 363,
      "debut_mois" => 0,
      "debut_jour" => 0,
      "fin_annee" => 363,
      "fin_mois" => 0,
      "fin_jour" => 0,
      "type_infobox" => "conflit militaire",
      "distance_Portail" => 2,
      "portail_id" => 1),
    
    2 => array(
      "id" => 732581,
      "titre" => "Bataille de Dyrrachium (48 av. J.-C.)",
      "lon" => 0,
      "lat" => 0,
      "nb_langue" => 18,
      "nb_visite" => 0,
      "longueur" => 4208,
      "lien" => "http://fr.wikipedia.org/wiki/Bataille_de_Dyrrachium_(48_av._J.-C.)",
      "debut_annee" => -48,
      "debut_mois" => 7,
      "debut_jour" => 10,
      "fin_annee" => -48,
      "fin_mois" => 7,
      "fin_jour" => 10,
      "type_infobox" => "Conflit militaire",
      "distance_Portail" => 2,
      "portail_id" => 1), 
    
    3 => array(
      "id" => 49111,
      "titre" => "Bataille de Verdun (1916)",
      "lon" => 5.38842,
      "lat" => 49.1608,
      "nb_langue" => 53,
      "nb_visite" => 0,
      "longueur" => 65825,
      "lien" => "http://fr.wikipedia.org/wiki/Bataille_de_Verdun_(1916)",
      "debut_annee" => 1916,
      "debut_mois" => 2,
      "debut_jour" => 21,
      "fin_annee" => 1916,
      "fin_mois" => 12,
      "fin_jour" => 19,
      "type_infobox" => "Conflit militaire",
      "distance_Portail" => 2,
      "portail_id" => 1),
     
    4 => array(
      "id" => 2895689,
      "titre" => "Bataille de la Porte Colline",
      "lon" => 0,
      "lat" => 0,
      "nb_langue" => 11,
      "nb_visite" => 0,
      "longueur" => 3098,
      "lien" => "http://fr.wikipedia.org/wiki/Bataille_de_la_Porte_Colline",
      "debut_annee" => -82,
      "debut_mois" => 11,
      "debut_jour" => 0,
      "fin_annee" => -82,
      "fin_mois" => 11,
      "fin_jour" => 0,
      "type_infobox" => "Conflit militaire",
      "distance_Portail" => 2,
      "portail_id" => 1),
     
    5 => array(
      "id" => 56637,
      "titre" => "SiÃ¨ge d'AlÃ©sia",
      "lon" => 4.50028,
      "lat" => 47.5372,
      "nb_langue" => 37,
      "nb_visite" => 0,
      "longueur" => 82550,
      "lien" => "http://fr.wikipedia.org/wiki/Si%C3%A8ge_d%27Al%C3%A9sia",
      "debut_annee" => -52,
      "debut_mois" => 0,
      "debut_jour" => 0,
      "fin_annee" => -52,
      "fin_mois" => 0,
      "fin_jour" => 0,
      "type_infobox" => "Conflit militaire",
      "distance_Portail" => 2,
      "portail_id" => 1) 
  
  );

$tabPortail = array(
  
    0 => array(
      "id" => 1,
      "nom" => "Portail",
      "lien" => "lien")
    );

$tabPortail2 = array(
    
    0 => array(
      "id" => 1,
      "nom" => "Portail",
      "lien" => "lien"),
  
    1 => array(
      "id" => 2,
      "nom" => "Portail",
      "lien" => "lien")
    );
    
    

 videTables();
 ajoutRoles();
  
 if(testAjoutPage($tab, $tab))
    echo "<p class='o'>Ajout de 6 pages</p>";
  else
    echo "<p class='e'>Erreur lors de l'ajout de pages</p>";
  
 if(testAjoutPage($tab2, $tab))
    echo "<p class='o'>Les pages identiques ne sont pas ajoutees.</p>";
  else
    echo "<p class='e'>Erreur lors de l'ajout de pages identiques</p>"; 
   
 if(testAjoutPage($tab3, $tab33))
    echo "<p class='o'>Modification d'une page avec succes</p>";
  else
    echo "<p class='e'>Erreur lors de la modification d'une page</p>";
    
 if(testAjoutPortail($tabPortail))
    echo "<p class='o'>Ajout d'un portail</p>";
  else
    echo "<p class='e'>Erreur lors de l'ajout d'un portail</p>";
 
 if(testAjoutPortail($tabPortail2))
    echo "<p class='o'>Ajout d'un second portail</p>";
  else
    echo "<p class='e'>Erreur lors de l'ajout du second portail</p>";
     
 if(testListePage())
    echo "<p class='o'>Recuperation des pages du portail d'identifiant 1 avec succès</p>";
  else
    echo "<p class='e'>Erreur lors de la recuperation des pages du portail d'identifiant 1</p>";
  
  if(testListePortail())
    echo "<p class='o'>Recuperation des portails avec succès</p>";
  else
    echo "<p class='e'>Erreur lors de la recuperation des portails</p>";
  
  
 //videTables();
   