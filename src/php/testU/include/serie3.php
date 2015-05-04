<?php

function testCreationCarte(){
    
    //Creation d'une carte
    $app = new App();
     
    $retour = $app->createCarte("{\"titre\":\"titreCarte\",\"idU\":\"1\",\"idP\":\"1\",\"description\":\"decrit\",\"debut_annee\":\"-55\",\"fin_annee\":\"2014\",\"duree\":\"120\"}");   
      
    $app->close();
    
    //Carte
    echo "<p>".$retour."</p>";
    
    //Evenements
}

testCreationCarte();

