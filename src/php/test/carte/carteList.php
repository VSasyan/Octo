<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
    </head>
    <body>
        
        <script>
            var ajax = new XMLHttpRequest();
            ajax.open('POST', '../../script.php?c=list', true);
            ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            ajax.addEventListener('readystatechange', function (e) {
                if (ajax.readyState === 4 && ajax.status === 200) {
                    
                }
            });
            
            var data = "idUser=1";
            ajax.send(data);
        </script>
        
    </body>
</html>