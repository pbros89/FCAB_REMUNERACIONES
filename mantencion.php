<!DOCTYPE html>

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>En Mantenimiento</title>

        <style>
            body {
                width:500px;
                margin:0 auto;
                text-align: center;
                color:blue;
            }
        </style>
    </head>

    <body>
        <p></p>
        <p></p><br />
        <img src="resources/images/logo.png" width="50%">

        <h3><p>DISCULPA LAS MOLESTIAS, ESTAMOS ACTUALIZANDO EL SISTEMA.<br> 
            REGRESA EN 2 MINUTOS</p>
        </h3>
        <div></div>

        <img src="resources/images/mantencion.png" width="50%">

    </body>
</html>
<?php
header('HTTP/1.1 503 Service Temporarily Unavailable');
header('Status: 503 Service Temporarily Unavailable');
header('Retry-After: 3600');
?>