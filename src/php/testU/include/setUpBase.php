<?php



if (getConnection() !== "test") {
    changeConnection("test");
    header('Location: index.php');
}

echo "<p class='o'>Mode Test Activé</p>";

require "../conf/database.php";

$mysqli = @new mysqli($database[$uses]["host"], $database[$uses]["user"], $database[$uses]["password"], "");

if ($mysqli->connect_error) {
    echo "<p class='e'>Connection refusée: " . $mysqli->connect_error . "</p>";
    $fin = false;
    return;
} else
    echo "<p class='o'>Connection réussie</p>";

$r = $mysqli->select_db($database[$uses]["database"]);

if ($r)
    echo "<p class='o'>Connection réussie à la base " . $database[$uses]["database"] . "</p>";
else {

    echo "<p class='w'>Connection ratée: la base " . $database[$uses]["database"] . " n'existe pas.</p>";
    echo "<p class='w'>Création de la base " . $database[$uses]["database"] . "</p>";
    $base = getNewBase($database[$uses]["database"]);

    $sql = $base[0];

    $mysqli->multi_query($sql);

    $i = 0;
    do {
        $i++;
        $mysqli->use_result();
    } while ($mysqli->more_results() && $mysqli->next_result());

    if ($mysqli->errno) {
        echo "<p class=e>Problème lors de la création de la base: " . $mysqli->error . "</p>";
        $fin = false;
        return;
    } else {
        echo "<p class=o>Création de la base: succés ($i requetes)</p>";
        $fin = true;
    }
}
        