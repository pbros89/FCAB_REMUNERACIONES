<?php
/**
 * Created by Mario Hidalgo García
 */

if (!defined('BASEPATH')) exit('No se permite el acceso directo a este directorio');

function vista_principal($view, $vars) {
    $CI = &get_instance();
    $CI->load->view("header", $vars);
    $CI->load->view($view, $vars);
    $CI->load->view("footer", $vars);
}

function vista_secundaria($view) {
    $CI = &get_instance();
    $CI->load->view($view);
}
