<?php


    $path = "./";
    
    do {
        $folder = scandir($path);
        if(in_array("core", $folder))
            break;
        else
            $path = $path."../";
    } while (true);
    
    

//    var_dump($path."core/");

    include $path."core/include.php";
    changeConnection("dev");