<?php

class Database {
    
    private $mysqli = null;
    
    public function __construct($user=null, $pwd=null, $host=null, $bdd=null) {
        $ctp = func_num_args();
        switch($ctp){
            case 0:
                require 'conf/database.php';
                $this->mysqli = new mysqli($database[$uses]["host"], 
                    $database[$uses]["user"], 
                    $database[$uses]["password"], 
                    $database[$uses]["database"]);
                break;
            case 4: $this->mysqli = new mysqli($host, $user, $pwd, $bdd); break;
            default : throw new Exception();
        }
        if(!$this->mysqli)
            throw new Exception();
        //print_r("Connection Open");
    }
    
    public function query($sql){
        $result = $this->mysqli->query($sql);
        $r = [];
        while($obj = $result->fetch_array()){ 
            $r[] = $obj; 
        }
        return $r;
    }
    
    public function addQuery($sql){
        $this->mysqli->query($sql);
        return $this->mysqli->insert_id;
    }
    
    public function close(){
        //print_r("Connection Close");
        $this->mysqli->close();
    }
}
