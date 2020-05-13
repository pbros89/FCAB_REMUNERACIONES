<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class CambioBonoController extends CI_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('cambioBono/CambioBonoModel'); //Cargamos el modelo

        $this->output
                ->set_content_type('application/json')
                ->set_header("Access-Control-Allow-Origin: *")
                ->set_header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept")
                ->set_header("Content-Type: application/json; charset=UTF-8");
    }
    
    public function cargarCambioBono() 
    {
        $p_rut = $this->input->get('p_rut');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_fec1 = $this->input->get('p_fec1'); 
        $p_fec2 = $this->input->get('p_fec2');  
        $query = $this->CambioBonoModel->cargarCambioBono($p_cod_emp, $p_rut, $p_fec1, $p_fec2);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }


    public function crearCambioBono() 
    {
        $P_RUT = $this->input->get('P_RUT');  
        $P_DV = $this->input->get('P_DV');  
        $P_USUARIO = $this->input->get('P_USUARIO');  
        $P_COD_EMP = $this->input->get('P_COD_EMP');  
        $P_OBSERVACION = $this->input->get('P_OBSERVACION');
        $P_PERIODO = $this->input->get('P_PERIODO');

        $query = $this->CambioBonoModel->crearCambioBono(
            $P_RUT 
          , $P_DV 
          , $P_COD_EMP 
          , $P_USUARIO 
          , $P_OBSERVACION  
          , $P_PERIODO 
        );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }
    

    public function cargarConceptosCambioBono()
    {
        $p_bono = $this->input->get('p_bono');  

        $query = $this->CambioBonoModel->cargarConceptosCambioBono($p_bono);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function modificarCambioBonoConcepto()
    {
        $p_bono = $this->input->get('p_bono');  
        $p_cod_concepto = $this->input->get('p_cod_concepto');  
        $p_usuario = $this->input->get('p_usuario');  
        $p_valor = $this->input->get('p_valor');  

        $query = $this->CambioBonoModel->modificarCambioBonoConcepto($p_bono, $p_cod_concepto, $p_usuario, $p_valor);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }


    public function cambiarEstadoCambioBono()
    {
        $p_bono = $this->input->get('p_bono');  
        $p_usuario = $this->input->get('p_usuario');  
        $p_estado = $this->input->get('p_estado');  

        $query = $this->CambioBonoModel->cambiarEstadoCambioBono($p_bono, $p_estado, $p_usuario);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function eliminarCambioBono()
    {
        $p_bono = $this->input->get('p_bono');  
        $p_usuario = $this->input->get('p_usuario');  

        $query = $this->CambioBonoModel->eliminarCambioBono($p_bono, $p_usuario);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }


    public function cargarConceptosPersonal()
    {
        $p_personal = $this->input->get('p_personal');  

        $query = $this->CambioBonoModel->cargarConceptosPersonal($p_personal);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function anularCambioBono()
    {
        $p_cod = $this->input->get('p_cod');
        $p_usuario = $this->input->get('p_usuario');
        $p_obs = $this->input->get('p_obs');


        $query = $this->CambioBonoModel->anularCambioBono(
            $p_cod,
            $p_usuario,
            $p_obs
        );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }
}
