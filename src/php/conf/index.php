<?php
    include "database.php";
?>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
    </head>
    <body>
        <h1>Test Configuration</h1>
        
        
        <?php
        
            $mysqli = new mysqli($database[$uses]["host"], 
                    $database[$uses]["user"], 
                    $database[$uses]["password"], 
                    $database[$uses]["database"]);
            
            if (mysqli_connect_errno($mysqli)) {
                echo "<p>Echec lors de la connexion à MySQL : " . mysqli_connect_error()."</p>";
            } else {
                echo "<p>Connexion réussie au serveur: " . $mysqli->host_info . "</p>";
            }
        ?>
    </body>
</html>
