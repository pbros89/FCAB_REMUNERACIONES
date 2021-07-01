<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class ReajusteController extends CI_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('reajuste/ReajusteModel'); //Cargamos el modelo

        $this->output
                ->set_content_type('application/json')
                ->set_header("Access-Control-Allow-Origin: *")
                ->set_header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept")
                ->set_header("Content-Type: application/json; charset=UTF-8");
    }
    
    public function cargarReajustes()
    {
        $p_cod_emp = $this->input->get('p_cod_emp');
        $query = $this->ReajusteModel->cargarReajustes($p_cod_emp);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }


    public function cargarSimulacionReajuste()
    {
        $p_usuario = $this->input->get('p_usuario');
        $p_cod_emp = $this->input->get('p_cod_emp');
        $p_valor = $this->input->get('p_valor');  
        $query = $this->ReajusteModel->cargarSimulacionReajuste($p_cod_emp, $p_valor, $p_usuario);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function crearReajuste()
    {
        $p_cod_emp = $this->input->get('p_cod_emp'); 
        $p_nombre = $this->input->get('p_nombre');  
        $p_valor = $this->input->get('p_valor');  
        $p_in_bono = $this->input->get('p_in_bono');  
        $p_in_sueldo = $this->input->get('p_in_sueldo');  
        $p_usuario = $this->input->get('p_usuario');   
        $query = $this->ReajusteModel->crearReajuste($p_cod_emp, $p_nombre, $p_valor, $p_in_sueldo, $p_in_bono, $p_usuario);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function eliminarReajuste()
    {
        $p_cod_emp = $this->input->get('p_cod_emp'); 
        $p_usuario = $this->input->get('p_usuario');   
        $query = $this->ReajusteModel->eliminarReajuste($p_cod_emp, $p_usuario);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function crearReajusteIng()
    {
        $p_id_personal = $this->input->get('p_id_personal'); 
        $p_usuario = $this->input->get('p_usuario');   
        $query = $this->ReajusteModel->crearReajusteIng($p_id_personal, $p_usuario);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function eliminarReajusteIng()
    {
        $p_id_personal = $this->input->get('p_id_personal'); 
        $p_usuario = $this->input->get('p_usuario');   
        $query = $this->ReajusteModel->eliminarReajusteIng($p_id_personal, $p_usuario);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function eliminarReajusteIngAll()
    {
        $p_usuario = $this->input->get('p_usuario');   
        $query = $this->ReajusteModel->eliminarReajusteIngAll($p_usuario);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarReajusteIgnorados()
    {
        $p_usuario = $this->input->get('p_usuario');   
        $query = $this->ReajusteModel->cargarReajusteIgnorados($p_usuario);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }


}
