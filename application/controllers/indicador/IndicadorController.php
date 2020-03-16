<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class IndicadorController extends CI_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('indicador/IndicadorModel'); //Cargamos el modelo

        $this->output
                ->set_content_type('application/json')
                ->set_header("Access-Control-Allow-Origin: *")
                ->set_header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept")
                ->set_header("Content-Type: application/json; charset=UTF-8");
    }
    
    public function cargarConteoMensual()
    {
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $query = $this->IndicadorModel->cargarConteoMensual($p_cod_emp);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

}
