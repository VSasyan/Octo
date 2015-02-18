<?php
    
    include "core/include.php";

    if(isset($_GET['p']) && $_GET['p']=='list'){
        $app = new App();
        
        $opt = ['nom', 'lien'];
        echo $app->getPortailsJSON($opt);
        $app->close();
    }
