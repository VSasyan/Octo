<?php

class Database {

    public $mysqli = null;
    private $uses;

	//Constructeur de la classe database
    public function __construct($user = null, $pwd = null, $host = null, $bdd = null) {
        $ctp = func_num_args();
        switch ($ctp) {
            case 0:
                $path = $this->getConfPath();
                require $path;
                $this->uses = $uses;
                $this->mysqli = new mysqli($database[$uses]["host"], $database[$uses]["user"], $database[$uses]["password"], $database[$uses]["database"]);
                break;
            case 4: $this->mysqli = new mysqli($host, $user, $pwd, $bdd);
                break;
            default : throw new Exception();
        }

        if (!$this->mysqli)
            throw new Exception();
    }

	//Cette fonction permet de récupérer le chemin relatif au fichier de configuration de la base de données
	// Renvoie le chemin relatif
    private function getConfPath() {

        $path = "./";
        do {
            $folder = scandir($path);
            if (in_array("conf", $folder))
                break;
            else
                $path = $path . "../";
        } while (true);
        
        return $path.'conf/database.php';   
    }

	//Cette fonction effectue la requête
	// En entrée prend la requête
	// En sortie, renvoie un tableau associatif avec le résultat de la requête
    public function query($sql) {
        //print_r($sql."\n");
        $result = $this->mysqli->query($sql);
        $r = [];
        while ($obj = $result->fetch_array()) {
            $r[] = $obj;
        }
        
        $new_r = [];
        foreach ($r as $rr) {
            $tmp = [];
            foreach ($rr as $key => $value) {
                if (!is_int($key)) {
                    $tmp[$key] = $value;
                }
            }
            $new_r[] = $tmp;
        }
        
        return $new_r;
    }

	//Cette fonction exécute les requêtes d'insertion
	// En entrée prend la requête sql
	//Renvoie l'identifiant de l'élément ajouté
    public function addQuery($sql) {
        $this->mysqli->query($sql);
        return $this->mysqli->insert_id;
    }

	//Cette fonction effectue une requête multiple en utilisant le mode transactionnel
	// En entrée prend la requête
	// En sortie, renvoie le code d'erreur (0 si tout se passe bien, code d'erreur sinon)
    public function multipleQuery($sql) {
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
           print_r($this->mysqli->error."\n"); 
           $this->mysqli->rollback();
        } else {
            $this->mysqli->commit();
        }



        $this->mysqli->autocommit(true);

        return $r;
    }

	// Cette fonction renvoie le mode de travail dans la base de données
	//Renvoie test ou dev selon le mode de travail dans lequel on est
    public function getUses() {
        return $this->uses;
    }

	//Cette fonction permet de se déconnecter à la base de données
    public function close() {
        //print_r("Connection Close");

        $this->mysqli->close();
    }

}
