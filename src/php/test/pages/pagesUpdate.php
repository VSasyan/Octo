<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
    </head>
    <body>
        
        <script>
            var ajax = new XMLHttpRequest();
            ajax.open('POST', '../script.php?a=add', true);
            ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            ajax.addEventListener('readystatechange', function (e) {
                if (ajax.readyState === 4 && ajax.status === 200) {
                    
                }
            });
            
            var json =  [
                {"id":8449414,"titre":"Bataille de IKEA","lon":0,"lat":0,"nb_langue":6,"nb_visite":0,"longueur":8022,"lien":"http://fr.wikipedia.org/wiki/Bataille_de_Corbione","date_maj":"2015-03-17 22:26:27","debut_annee":-446,"debut_mois":0,"debut_jour":0,"fin_annee":-446,"fin_mois":0,"fin_jour":0,"type_infobox":"Conflit militaire","distance_Portail":2,"portail_id":1},
                {"id":3019915,"titre":"Bataille de CONFORAMA (363)","lon":44.5833,"lat":33.1,"nb_langue":10,"nb_visite":0,"longueur":5801,"lien":"http://fr.wikipedia.org/wiki/Bataille_de_Ct%C3%A9siphon_(363)","date_maj":"2015-03-12 18:41:43","debut_annee":363,"debut_mois":0,"debut_jour":0,"fin_annee":363,"fin_mois":0,"fin_jour":0,"type_infobox":"conflit militaire","distance_Portail":2,"portail_id":1}];
            var data = "json=" + JSON.stringify(json);
            ajax.send(data);
        </script>
        
    </body>
</html>