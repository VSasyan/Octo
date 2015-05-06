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

function getPathToDB(){
    $path = "./";
    
    do {
        $folder = scandir($path);
        if(in_array("core", $folder))
            break;
        else
            $path = $path."../";
    } while (true);
    
    return $path;
}

function changeConnection($param) {
    
    $path = getPathToDB();
    
    $lines = file($path.'conf/database.php');

    $monfichier = fopen($path.'conf/database_new.php', 'a');

    foreach ($lines as $lineContent) {

        if (strpos($lineContent, "uses"))
            $lineContent = "    \$uses = \"" . $param . "\";\n";

        fputs($monfichier, $lineContent);
    }

    fclose($monfichier);

    unlink($path.'conf/database.php');
    rename($path.'conf/database_new.php', $path.'/conf/database.php');
}

function changeCredential($hote, $user, $password){
    $path = getPathToDB();
    
    $lines = file($path.'conf/database.php');

    $monfichier = fopen($path.'conf/database_new.php', 'a');

    foreach ($lines as $lineContent) {

        if (strpos($lineContent, "\"user\"     => \"")){
            $r = strpos($lineContent, " => \"");
            $lineContent  = substr($lineContent, 0, $r+5);
            $lineContent .= $user."\",\n";
        }
        
        if (strpos($lineContent, "\"password\" => \"")){
            $r = strpos($lineContent, " => \"");
            $lineContent  = substr($lineContent, 0, $r+5);
            $lineContent .= $password."\",\n";
        }
        
        if (strpos($lineContent, "\"host\"     => \"")){
            $r = strpos($lineContent, " => \"");
            $lineContent  = substr($lineContent, 0, $r+5);
            $lineContent .= $hote."\",\n";
        }
        
        
            //$lineContent = "    \$uses = \"" . $param . "\";\n";

        fputs($monfichier, $lineContent);
    }

    fclose($monfichier);

    unlink($path.'conf/database.php');
    rename($path.'conf/database_new.php', $path.'/conf/database.php');
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
        if(strcmp(substr($newLine, 0,2), "--")!=0 && strcmp(substr($newLine, 0,2), "/*")!=0 && strlen(trim($newLine," \n"))>1)
            $haystack .= trim($newLine,"\n")." ";
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
    $sql = substr($sql, 0, -4).";";
    $sql = str_replace("`", "", $sql);
    return $sql;
}