<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class CalendarioController extends CI_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('calendario/CalendarioModel'); //Cargamos el modelo

        $this->output
                ->set_content_type('application/json')
                ->set_header("Access-Control-Allow-Origin: *")
                ->set_header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept")
                ->set_header("Content-Type: application/json; charset=UTF-8");
    }
    
    public function cargarCalendarios()
    {
        
        $p_tipo = $this->input->get('p_tipo');  
        $p_anho = $this->input->get('p_anho');  
        $p_mes = $this->input->get('p_mes'); 
        $p_dia = $this->input->get('p_dia');  
        $p_estado = $this->input->get('p_estado');  
        $query = $this->CalendarioModel->cargarCalendarios($p_tipo, $p_anho, $p_mes, $p_dia, $p_estado);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function crearCalendario()
    {
        $P_TIPO = $this->input->get('P_TIPO');  
        $P_ANHO = $this->input->get('P_ANHO');  
        $P_MES = $this->input->get('P_MES');  
        $P_DIA = $this->input->get('P_DIA');  
        $P_OBS = $this->input->get('P_OBS');  
        $P_USUARIO = $this->input->get('P_USUARIO');  
        $P_ESTADO = $this->input->get('P_ESTADO');  
        $query = $this->CalendarioModel->crearCalendario($P_TIPO, $P_ANHO, $P_MES, $P_DIA, $P_OBS, $P_USUARIO, $P_ESTADO);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function modificarCalendario()
    {
        $P_TIPO = $this->input->get('P_TIPO');  
        $P_ANHO = $this->input->get('P_ANHO');  
        $P_MES = $this->input->get('P_MES');  
        $P_DIA = $this->input->get('P_DIA');  
        $P_OBS = $this->input->get('P_OBS');  
        $P_USUARIO = $this->input->get('P_USUARIO');  
        $P_ESTADO = $this->input->get('P_ESTADO');  
        $query = $this->CalendarioModel->modificarCalendario($P_TIPO, $P_ANHO, $P_MES, $P_DIA, $P_OBS, $P_USUARIO, $P_ESTADO);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

}
