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
            
            var json =  [{"id":8449414,"titre":"Bataille de Corbione","lon":0,"lat":0,"nb_langue":6,"nb_visite":0,"longueur":8022,"lien":"http://fr.wikipedia.org/wiki/Bataille_de_Corbione","date_maj":"2015-03-17 22:26:27","debut_annee":-446,"debut_mois":0,"debut_jour":0,"fin_annee":-446,"fin_mois":0,"fin_jour":0,"type_infobox":"Conflit militaire","distance_Portail":2,"portail_id":1},{"id":3019915,"titre":"Bataille de Ctésiphon (363)","lon":44.5833,"lat":33.1,"nb_langue":10,"nb_visite":0,"longueur":5801,"lien":"http://fr.wikipedia.org/wiki/Bataille_de_Ct%C3%A9siphon_(363)","date_maj":"2015-03-12 18:41:43","debut_annee":363,"debut_mois":0,"debut_jour":0,"fin_annee":363,"fin_mois":0,"fin_jour":0,"type_infobox":"conflit militaire","distance_Portail":2,"portail_id":1},{"id":732581,"titre":"Bataille de Dyrrachium (48 av. J.-C.)","lon":0,"lat":0,"nb_langue":18,"nb_visite":0,"longueur":4208,"lien":"http://fr.wikipedia.org/wiki/Bataille_de_Dyrrachium_(48_av._J.-C.)","date_maj":"2015-03-16 10:56:31","debut_annee":-48,"debut_mois":7,"debut_jour":10,"fin_annee":-48,"fin_mois":7,"fin_jour":10,"type_infobox":"Conflit militaire","distance_Portail":2,"portail_id":1},{"id":49111,"titre":"Bataille de Verdun (1916)","lon":5.38842,"lat":49.1608,"nb_langue":53,"nb_visite":0,"longueur":65825,"lien":"http://fr.wikipedia.org/wiki/Bataille_de_Verdun_(1916)","date_maj":"2015-03-12 18:41:43","debut_annee":1916,"debut_mois":2,"debut_jour":21,"fin_annee":1916,"fin_mois":12,"fin_jour":19,"type_infobox":"Conflit militaire","distance_Portail":2,"portail_id":1},{"id":2895689,"titre":"Bataille de la Porte Colline","lon":0,"lat":0,"nb_langue":11,"nb_visite":0,"longueur":3098,"lien":"http://fr.wikipedia.org/wiki/Bataille_de_la_Porte_Colline","date_maj":"2015-03-12 18:41:43","debut_annee":-82,"debut_mois":11,"debut_jour":0,"fin_annee":-82,"fin_mois":11,"fin_jour":0,"type_infobox":"Conflit militaire","distance_Portail":2,"portail_id":1},{"id":56637,"titre":"Siège d'Alésia","lon":4.50028,"lat":47.5372,"nb_langue":37,"nb_visite":0,"longueur":82550,"lien":"http://fr.wikipedia.org/wiki/Si%C3%A8ge_d%27Al%C3%A9sia","date_maj":"2015-03-12 21:18:11","debut_annee":-52,"debut_mois":0,"debut_jour":0,"fin_annee":-52,"fin_mois":0,"fin_jour":0,"type_infobox":"Conflit militaire","distance_Portail":2,"portail_id":1}];
            var data = "json=" + JSON.stringify(json);
            ajax.send(data);
        </script>
        
    </body>
</html>