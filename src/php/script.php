<?php
    
    include "core/include.php";
    
    $app = new App();
    
    if(isset($_GET['p']) && $_GET['p']=='list'){
        $opt = ['id', 'nom', 'lien'];
        echo $app->getPortailsJSON($opt);
    }

    if(isset($_GET['p']) && $_GET['p']=='add'){
        if( isset($_POST["url"]) && isset($_POST["nom"]) ){
            $app->addPortail($_POST["nom"], $_POST["url"]);
        }else{
            throw new Exception;
        }
    }
    
    if(isset($_GET['a']) && $_GET['a']=='add'){
        if( isset($_POST["json"]) ){
            $app->savePages($_POST["json"]);
        }else{
            throw new Exception;
        }
    }
    
    $app->close();
   