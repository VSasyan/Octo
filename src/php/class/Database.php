<?php

class Database {
    
    public $mysqli = null;
    
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
    }
    
    public function query($sql){
        //print_r($sql."\n");
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
    
    public function multipleQuery($sql){
//        print_r($sql);
        $this->mysqli->autocommit(false);
        $this->mysqli->begin_transaction();

        $this->mysqli->multi_query($sql);
        
        do { 
           $this->mysqli->use_result(); 
//           print_r("Okay\n"); 
        } while ($this->mysqli->more_results() && $this->mysqli->next_result()); 
        
        $r = $this->mysqli->errno;
        if ($this->mysqli->errno) {
//           print_r($this->mysqli->error."\n"); 
           $this->mysqli->rollback ();
        }else{
            $this->mysqli->commit();
        }
        
        
        
        $this->mysqli->autocommit(true);

        return $r;
    }
    
    public function close(){
        //print_r("Connection Close");
        
        $this->mysqli->close();
    }
}
