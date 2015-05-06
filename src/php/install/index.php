<?php
    
require "../conf/database.php";
require "../core/util.php";    
    
    
    if(isset($_POST) && count($_POST)>0){
        
        if($_POST["hidden"]=="form1"){
            var_dump($_POST);
            changeCredential($_POST["hote"], $_POST["login"], $_POST["pass"]);
        } else {
            print_r("fail.");
        }
        
        
        
    }

?>

<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
    </head>
    <body>
        <h1>Test Configuration</h1>
        <?php
        require "../conf/database.php";

        $mysqli = @new mysqli($database[$uses]["host"], $database[$uses]["user"], $database[$uses]["password"], "");

        if ($mysqli->connect_error) {
            echo "<p class='e'>Connection refusée: " . $mysqli->connect_error . "</p>";
            ?>
            <h2>Connexion à la base de données</h2>
            <form action="#" method="POST">
                Host: <input type="text" name="hote" value="<?php echo $database[$uses]["host"] ?>">
                Login: <input type="text" name="login" value="<?php echo $database[$uses]["user"] ?>">
                Password: <input type="password" name ="pass">
                <input type="hidden" name="hidden" value="form1">
                <input type="submit" value="Valider">
            </form>
            <?php
            return;
        } else
            echo "<p class='o'>Connection réussie</p>";
/*
        $r = $mysqli->select_db($database[$uses]["database"]);

        if ($r) {
            echo "<p class='o'>Connection réussie à la base " . $database[$uses]["database"] . "</p>";
        } else {

            echo "<p class='w'>Connection ratée: la base " . $database[$uses]["database"] . " n'existe pas.</p>";
            echo "<p class='w'>Création de la base " . $database[$uses]["database"] . "</p>";
            $base = getNewBase($database[$uses]["database"]);

            $i = 0;

            foreach ($base as $sql) {
                if (strpos($sql, "ELIMITER") == 1)
                    continue;
                if (strpos($sql, "FUNCTION") > 0 || strpos($sql, "PROCEDURE"))
                    $sql = traiteProcedures($sql);
                if (strlen($sql) > 1)
                    if (!$mysqli->query($sql)) {
                        break;
                    }
                $i++;
            }

            if ($mysqli->errno) {
                echo "<p class=e>Problème lors de la création de la base: " . $mysqli->error . "</p>";
                $fin = false;
                return;
            } else {
                echo "<p class=o>Création de la base: succés ($i requetes)</p>";
                $fin = true;
            }
        }
     */   ?>
    </body>
</html>
