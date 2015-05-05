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

    $newTab = [];

    $haystack = "";
    $delim = ";";
    
    foreach ($lines as $lineContent) {
        $newLine = str_replace("octo", $name, $lineContent);
        //$newLine = str_replace("`", "'", $newLine);
        //print_r($newLine." @@@@: ".strpos($newLine, ";")." ".strlen($newLine)." ".(strlen($newLine)-strpos($newLine, ";"))."\n");
        //$haystack .= rtrim($newLine);
        if(strcmp(substr($newLine, 0,2), "--")!=0 && strcmp(substr($newLine, 0,2), "/*")!=0)
            $haystack .= trim($newLine)." ";
        if(strpos($newLine, "ELIMITER ")==1)
            $delim = substr($newLine, 10, -1);
        
        $diff = (strlen($newLine)-strpos($newLine, $delim));
        if(($diff==4 || $diff==3)&&strpos($newLine, $delim)>0){
            $newTab[] = $haystack;
            $haystack = "";
        }
    }
    $newTab[] = "CALL create_roles()";
    return $newTab;
}


function traiteProcedures($sql){
    $sql = substr($sql, 0, -3).";";
    $sql = str_replace("`", "", $sql);
//    $e = explode("(", $sql);
//    $e[0] = str_replace("`", "", $e[0]);
//    var_dump($e);
    return $sql;
}