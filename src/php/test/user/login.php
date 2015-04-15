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
            ajax.open('POST', '../../../php/script.php?u=login', true);
            ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            ajax.addEventListener('readystatechange', function (e) {
                if (ajax.readyState === 4 && ajax.status === 200) {
                    
                }
            });
            var json = {"login":"ernest", "mdp":"totojoe"};
            var data = "json=" + JSON.stringify(json);
            ajax.send(data);
        </script>
    </body>
</html>
