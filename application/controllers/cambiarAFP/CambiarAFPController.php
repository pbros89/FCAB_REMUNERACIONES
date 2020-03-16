<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class CambiarAFPController extends CI_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('cambiarAFP/CambiarAFPModel'); //Cargamos el modelo

        $this->output
                ->set_content_type('application/json')
                ->set_header("Access-Control-Allow-Origin: *")
                ->set_header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept")
                ->set_header("Content-Type: application/json; charset=UTF-8");
    }
    
    public function cargarCambiarAFP() 
    {
        $p_rut = $this->input->get('p_rut');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_fec1 = $this->input->get('p_fec1'); 
        $p_fec2 = $this->input->get('p_fec2');  
        $query = $this->CambiarAFPModel->cargarCambiarAFP($p_cod_emp, $p_rut, $p_fec1, $p_fec2);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }


    public function crearCambioAFP() 
    {
        $P_RUT = $this->input->get('P_RUT');  
        $P_DV = $this->input->get('P_DV');  
        $P_COD_EMP = $this->input->get('P_COD_EMP'); 
        $P_USUARIO = $this->input->get('P_USUARIO');  
        $P_COD_TIPO_CAMBIO = $this->input->get('P_COD_TIPO_CAMBIO');  
        $P_NOM_TIPO_CAMBIO = $this->input->get('P_NOM_TIPO_CAMBIO');  
        $P_COD_AFP = $this->input->get('P_COD_AFP');  
        $P_NOM_AFP = $this->input->get('P_NOM_AFP');  
        $P_COD_APV = $this->input->get('P_COD_APV');  
        $P_NOM_APV = $this->input->get('P_NOM_APV');  
        $P_MONTO = $this->input->get('P_MONTO');  
        $P_TIPO_MONTO = $this->input->get('P_TIPO_MONTO'); 
        $P_OBSERVACION = $this->input->get('P_OBSERVACION');  
        $P_COD_REG_APV = $this->input->get('P_COD_REG_APV');  
        $P_NOM_REG_APV = $this->input->get('P_NOM_REG_APV');  
        
        

        $query = $this->CambiarAFPModel->crearCambioAFP(
            $P_RUT  
          , $P_DV  
          , $P_COD_EMP
          , $P_USUARIO 
          , $P_COD_TIPO_CAMBIO  
          , $P_NOM_TIPO_CAMBIO  
          , $P_COD_AFP  
          , $P_NOM_AFP  
          , $P_COD_APV  
          , $P_NOM_APV  
          , $P_COD_REG_APV
          , $P_NOM_REG_APV
          , $P_MONTO
          , $P_TIPO_MONTO 
          , $P_OBSERVACION  );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function terminarCambioAFP() {

        $P_COD = $this->input->get('p_cod');  
        $P_COD_EMP = $this->input->get('p_cod_emp'); 
        $P_USUARIO = $this->input->get('p_usuario');  
        
        

        $query = $this->CambiarAFPModel->terminarCambioAFP(
            $P_COD  
          , $P_COD_EMP
          , $P_USUARIO );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);

    }

    public function eliminarCambioAFP() {

        $P_COD = $this->input->get('p_cod');  
        $P_USUARIO = $this->input->get('p_usuario');  

        $query = $this->CambiarAFPModel->eliminarCambioAFP(
            $P_COD
          , $P_USUARIO );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);

    }
    
}
