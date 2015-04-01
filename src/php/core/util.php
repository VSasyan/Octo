<?php

function getConnection() {
    $lines = file('../conf/database.php');

    foreach ($lines as $lineContent)
        if (strpos($lineContent, "uses")) {
            $p1 = strpos($lineContent, "\"");
            $p2 = strpos($lineContent, "\"", $p1 + 1);

            return substr($lineContent, $p1 + 1, $p2 - $p1 - 1);
        }
}

function changeConnection($param) {
    $lines = file('../conf/database.php');

    $monfichier = fopen('../conf/database_new.php', 'a');

    foreach ($lines as $lineContent) {

        if (strpos($lineContent, "uses"))
            $lineContent = "    \$uses = \"" . $param . "\";\n";

        fputs($monfichier, $lineContent);
    }

    fclose($monfichier);

    unlink('../conf/database.php');
    rename('../conf/database_new.php', '../conf/database.php');
}

function getNewBase($name) {
    $dir = "./../../sql";

    $classes = scandir($dir, SCANDIR_SORT_DESCENDING);

    $path = $dir . "/" . $classes[0] . "/dump-withoutData.sql";

    $lines = file($path);

    $sql = "";

    $nProc = 0;
    $tabProc = [];
    $procFlag = false;


    foreach ($lines as $lineContent) {
        $newLine = str_replace("octo", $name, $lineContent) . "\n";

        if (strpos($newLine, "structure de procédure") || $procFlag) {
            if (!isset($tabProc[$nProc]))
                $tabProc[$nProc] = "";
            $tabProc[$nProc] .= $newLine."\n";
            $procFlag = true;
            if (strpos($newLine, "ELIMITER ;")){
                $procFlag = false;
                $nProc++;
            }
        } else {
            $sql = $sql . $newLine;
        }
    }

    return [$sql, $tabProc];
}
