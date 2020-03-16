<?php

/**
 * Created by IntelliJ IDEA.
 * User: MarioTi
 * Date: 03-01-16
 * Time: 11:26 PM
 */
if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

/**
 * @property  MaestraSGS_model Modelo de base de datos de la Grilla Maestra
 */
class MenuSistemaController extends CI_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('MenuSistemaModel'); //Cargamos el modelo

        $this->output
                ->set_content_type('application/json')
                ->set_header("Access-Control-Allow-Origin: *")
                ->set_header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept")
                ->set_header("Content-Type: application/json; charset=UTF-8");
    }

    public function cargarMenuUsuario() {
        
        $p_log = $this->input->get('p_log');
        $query = $this->MenuSistemaModel->cargarMenuUsuario($p_log);

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }
}
