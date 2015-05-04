<?php include '../core/include.php'; $fin = true; ?>

<html>
    <head>
        <meta charset="UTF-8">
        <title>Test Unitaire API PHP</title>
        <script type="text/javascript" src="pretty/js.js"></script>
        <link rel="stylesheet" type="text/css" href="pretty/css.css" />
    </head>
    <body>
        <div id="content">
            <h1>Test Unitaire API PHP</h1>

            <div id="recap">
                <h2>Recapitulatif</h2>
            </div>

            <div id="part1">
                <h2>Configuration</h2>
                <?php include '/include/setUpBase.php'; ?>
            </div>
            
            <div id="part2">
                <h2>Test serie 1</h2>
                <?php include '/include/serie1.php'; ?>
            
                <h2>Test serie 2</h2>
                <?php include '/include/serie2.php'; ?>
            </div>

            <div id="lafin">
                <h2>Tests</h2>
                <?php if($fin)
                    echo ""; ?>
            </div>
            
        </div>
    </body>
</html>