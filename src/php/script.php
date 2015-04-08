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
            $app->savePages($_POST["json"]);
        }else{
            throw new Exception;
        }
    }
    
    if(isset($_GET['a']) && $_GET['a']=='list'){
        if( isset($_POST["idPortail"]) ){
            $app->listPagesPortail($_POST["idPortail"]);
        }else{
            throw new Exception;
        }
    }
    
    
    if(isset($_GET['c']) &&  $_GET['c']=='add'){
        if( isset($_POST["json"]) ){
            $app->createCarte($_POST["json"]);
        }else{
            throw new Exception;
        }
    }
    
    if(isset($_GET['u']) && $_GET['login']){
        if( isset($_POST["json"]) ){
            $tab = array(
                ["login"]    => "ernest",
                ["role"]     => 2,
                ["roleType"] => "Editeur"
            );
            echo json_encode($tab);
        }else{
            throw new Exception;
        }
    }
    
    
    $app->close();
   