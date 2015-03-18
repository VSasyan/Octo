<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
    </head>
    <body>

        <div id="content1"></div>

        <script>
            var ajax = new XMLHttpRequest();
            ajax.open('POST', '../php/script.php?p=add', true);
            ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            ajax.addEventListener('readystatechange', function (e) {
                if (ajax.readyState === 4 && ajax.status === 200) {

                    var ajax2 = new XMLHttpRequest();
                    ajax2.open('GET', '../php/script.php?p=list', true);
                    ajax2.setRequestHeader('Content-type', 'application/json');
                    ajax2.addEventListener('readystatechange', function (e) {
                        if (ajax2.readyState === 4 && ajax2.status === 200) {
                            var o = JSON.parse(ajax2.responseText);
                            var table = document.createElement("table");
                            o.forEach(function (element, index, array) {
                                var row = document.createElement("tr");
                                var id = document.createElement("td");
                                id.innerHTML = element.id;
                                row.appendChild(id);
                                var nom = document.createElement("td");
                                nom.innerHTML = element.nom;
                                row.appendChild(nom);
                                var url = document.createElement("td");
                                url.innerHTML = element.lien;
                                row.appendChild(url);
                                table.appendChild(row);
                            });
                            document.getElementById("content1").appendChild(table);
                        }
                    });
                    ajax2.send();
                }
            });
            var data = "nom=toto&url=" + encodeURIComponent("http://machin.truc");
            ajax.send(data);
        </script>
    </body>
</html>
