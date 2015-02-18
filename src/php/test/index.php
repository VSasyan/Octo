<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
    </head>
    <body>
        <?php
            
        
        
        ?>
        <script>
                // création de l'objet xhr
                var ajax = new XMLHttpRequest();

                // destination et type de la requête AJAX (asynchrone ou non)
                ajax.open('GET', 'http://localhost/octo/php/script.php?p=list', true);

                // métadonnées de la requête AJAX
                ajax.setRequestHeader('Content-type', 'application/json');

                // evenement de changement d'état de la requête
                ajax.addEventListener('readystatechange',  function(e) {
                    // si l'état est le numéro 4 et que la ressource est trouvée
                    if(ajax.readyState === 4 && ajax.status === 200) {
                        var o = JSON.parse(ajax.responseText);
                        console.log(o[1].nom);
                    }
                }); 

                // envoi de la requête
                ajax.send();
        </script>
    </body>
</html>
