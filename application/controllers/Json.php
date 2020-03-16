<?php
/**
 * Created by Mario Hidalgo García
 */

if (!defined('BASEPATH')) exit('No se permite el acceso directo a este directorio');


class Json extends CI_Controller {

    function __construct() {
        parent::__construct();
    }

    public function index() {
        echo '{"success": true, "msg": "Envio Exitoso"}';
    }

    public function PasarArray() {
        //params:{store_data: JSON.stringify(form.getValues())}, (Agregar esto al form submit)
        $store_data = $_POST['store_data'];

        $data = array('success' => true, 'registro' => $store_data);
        echo json_encode($data);
    }
}
