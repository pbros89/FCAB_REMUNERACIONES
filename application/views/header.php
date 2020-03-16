<?php

echo 	'<html lang="es">',
 		'<head>',
 		'<meta charset="utf-8" />',
 		'<meta name="author" content="Mario Hidalgo García">',
 		'<meta name="contact" content="MarioHidalgoTi@outlook.com" />',
 		'<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">',
		'<meta http-equiv="X-UA-Compatible" content="IE=edge" />';
if ($titulo != "") {
    echo '<title>' . $titulo . '</title>';
} else {
    echo '<title></title>';
}
echo 	'	<link rel="apple-touch-icon" sizes="57x57" href="resources/images/favicon/apple-icon-57x57.png">',
		'	<link rel="apple-touch-icon" sizes="60x60" href="resources/images/favicon/apple-icon-60x60.png">',
		'	<link rel="apple-touch-icon" sizes="72x72" href="resources/images/favicon/apple-icon-72x72.png">',
		'	<link rel="apple-touch-icon" sizes="76x76" href="resources/images/favicon/apple-icon-76x76.png">',
		'	<link rel="apple-touch-icon" sizes="114x114" href="resources/images/favicon/apple-icon-114x114.png">',
		'	<link rel="apple-touch-icon" sizes="120x120" href="resources/images/favicon/apple-icon-120x120.png">',
		'	<link rel="apple-touch-icon" sizes="144x144" href="resources/images/favicon/apple-icon-144x144.png">',
		'	<link rel="apple-touch-icon" sizes="152x152" href="resources/images/favicon/apple-icon-152x152.png">',
		'	<link rel="apple-touch-icon" sizes="180x180" href="resources/images/favicon/apple-icon-180x180.png">',
		'	<link rel="icon" type="image/png" sizes="192x192"  href="resources/images/favicon/android-icon-192x192.png">',
		'	<link rel="icon" type="image/png" sizes="32x32" href="resources/images/favicon/favicon-32x32.png">',
		'	<link rel="icon" type="image/png" sizes="96x96" href="resources/images/favicon/favicon-96x96.png">',
		'	<link rel="icon" type="image/png" sizes="16x16" href="resources/images/favicon/favicon-16x16.png">',
		'	<link rel="manifest" href="resources/images/favicon/manifest.json">',
		'	<link rel="shortcut icon" href="resources/images/favicon/favicon-96x96.png">',
		'	<meta name="msapplication-TileColor" content="#ffffff">',
		'	<meta name="msapplication-TileImage" content="resources/images/favicon/ms-icon-144x144.png">',
		'	<meta name="theme-color" content="#ffffff">',
		'  	<link rel="stylesheet" type="text/css" href="resources/ExtJs/build/classic/theme-triton/resources/theme-triton-all.css">',
        '  	<link rel="stylesheet" type="text/css" href="resources/css/bootstrap-theme.min.css">',
        '	<script type="text/javascript" src="resources/js/jquery-3.1.1.min.js"></script>',
        '   <script type="text/javascript" src="resources/js/bootstrap.min.js"></script>',
		'	<script type="text/javascript" src="resources/ExtJs/build/ext-all.js" defer></script>',
		'	<script type="text/javascript" src="resources/ExtJs/build/exts.js" defer></script>';
