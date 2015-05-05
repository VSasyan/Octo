<?php
    
    include "core/include.php";
    
    $app = new App();
    
    if(isset($_GET['p']) && $_GET['p']=='list'){
        $opt = ['id', 'nom', 'lien'];
        echo $app->getPortailsJSON($opt);
    }
    
    // Add portail
    if(isset($_GET['p']) && $_GET['p']=='add'){
        if( isset($_POST["url"]) && isset($_POST["nom"]) ){
            $app->addPortail($_POST["nom"], $_POST["url"]);
        }else{
            throw new Exception;
        }
    }
    
    // Add article
    if(isset($_GET['a']) && $_GET['a']=='add'){
        if( isset($_POST["json"]) ){
            echo $app->savePages($_POST["json"]);
        }else{
            throw new Exception;
        }
    }
    
    if(isset($_GET['a']) && $_GET['a']=='list'){
        if( isset($_POST["idPortail"]) ){
            echo $app->jsonPagesPortail($_POST["idPortail"]);
        }else{
            throw new Exception;
        }
    }
    
    if(isset($_GET['c']) &&  $_GET['c']=='add'){
        if( isset($_POST["json"]) ){
            echo $app->createCarte($_POST["json"]);
        }else{
            throw new Exception;
        }
    }
    
    if(isset($_GET['c']) &&  $_GET['c']=='list'){
        if( isset($_POST["idUser"]) ){
            echo $app->getCartesFromUser($_POST["idUser"]);
        }else{
            throw new Exception;
        }
    }
    
    if(isset($_GET['c']) &&  $_GET['c']=='get'){
        if( isset($_POST["idCarte"]) ){
            echo json_encode($app->getCarte($_POST["idCarte"]));
        }else{
            throw new Exception;
        }
    }
    
    if(isset($_GET['u']) && $_GET['u']=='login'){
        if( isset($_POST["json"]) ){
            $tab = $app->authenticate($_POST["json"]);
            echo json_encode($tab);
        }else{
            throw new Exception;
        }
    }
    
    if(isset($_GET['u']) && $_GET['u']=='add'){
        if( isset($_POST["json"]) ){
            echo json_encode($app->insertUser($_POST["json"]));
        }else{
            throw new Exception;
        }
    }
    
    
    $app->close();