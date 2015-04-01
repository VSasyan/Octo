<?php
    
    $path = "./";
    
    do {
        $folder = scandir($path);
        if(in_array("class", $folder))
            break;
        else
            $path = $path."../";
    } while (true);
    
    $dir = $path.'class';
    $classes = scandir($dir);
    
    foreach ($classes as $class) {
        if(!is_dir($path.$class)){
            require_once $dir.'/'.$class;
        }
    }
    
    include 'util.php';