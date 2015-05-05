<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
    </head>
    <body>
        
        <script>
            var ajax = new XMLHttpRequest();
            ajax.open('POST', '../../script.php?c=add', true);
            ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            ajax.addEventListener('readystatechange', function (e) {
                if (ajax.readyState === 4 && ajax.status === 200) {
                    
                }
            });
            
            var json =  {"idU":1,"idP":"1","titre":"Ma belle carte","description":"Elle est trop belle t'as vu !","debut_annee":"1942","fin_annee":"2014","duree":"120","echelle_temps_haut":1, "echelle_temps_bas":2};
            var data = "json=" + JSON.stringify(json);
            ajax.send(data);
        </script>
        
    </body>
</html>