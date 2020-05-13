<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class CambiarDepositoController extends CI_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('cambiarDeposito/CambiarDepositoModel'); //Cargamos el modelo

        $this->output
                ->set_content_type('application/json')
                ->set_header("Access-Control-Allow-Origin: *")
                ->set_header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept")
                ->set_header("Content-Type: application/json; charset=UTF-8");
    }
    
    public function cargarCambiarDeposito() 
    {
        $p_rut = $this->input->get('p_rut');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_fec1 = $this->input->get('p_fec1'); 
        $p_fec2 = $this->input->get('p_fec2');  
        $query = $this->CambiarDepositoModel->cargarCambiarDeposito($p_cod_emp, $p_rut, $p_fec1, $p_fec2);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }


    public function crearCambioDeposito() 
    {
        $P_RUT = $this->input->get('P_RUT');  
        $P_DV = $this->input->get('P_DV');  
        $P_COD_EMP = $this->input->get('P_COD_EMP'); 
        $P_USUARIO = $this->input->get('P_USUARIO');  
        $P_COD_FORMA_PAGO = $this->input->get('P_COD_FORMA_PAGO');  
        $P_NOM_FORMA_PAGO = $this->input->get('P_NOM_FORMA_PAGO');  
        $P_COD_BANCO = $this->input->get('P_COD_BANCO');  
        $P_NOM_BANCO = $this->input->get('P_NOM_BANCO');  
        $P_NUM_CUENTA = $this->input->get('P_NUM_CUENTA');  
        $P_OBSERVACION = $this->input->get('P_OBSERVACION'); 
        $P_PERIODO = $this->input->get('P_PERIODO');        

        $query = $this->CambiarDepositoModel->crearCambioDeposito(
              $P_RUT  
            , $P_DV  
            , $P_COD_EMP 
            , $P_USUARIO 
            , $P_COD_FORMA_PAGO  
            , $P_NOM_FORMA_PAGO  
            , $P_COD_BANCO   
            , $P_NOM_BANCO   
            , $P_NUM_CUENTA   
            , $P_OBSERVACION 
            , $P_PERIODO 
        );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function terminarCambioDeposito() {

        $p_cod = $this->input->get('p_cod');  
        $p_usuario = $this->input->get('p_usuario'); 
        

        $query = $this->CambiarDepositoModel->terminarCambioDeposito(
            $p_cod 
          , $p_usuario );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);

    }

    public function eliminarCambioDeposito() {

        $p_cod = $this->input->get('p_cod');  
        $p_usuario = $this->input->get('p_usuario');  

        $query = $this->CambiarDepositoModel->eliminarCambioDeposito(
            $p_cod
          , $p_usuario );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);

    }

    public function anularCambioDeposito()
    {
        $p_cod = $this->input->get('p_cod');
        $p_usuario = $this->input->get('p_usuario');
        $p_obs = $this->input->get('p_obs');


        $query = $this->CambiarDepositoModel->anularCambioDeposito(
            $p_cod,
            $p_usuario,
            $p_obs
        );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }
    
}
