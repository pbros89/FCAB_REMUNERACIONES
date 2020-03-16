<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class CambiarSindicatoController extends CI_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('cambiarSindicato/CambiarSindicatoModel'); //Cargamos el modelo

        $this->output
                ->set_content_type('application/json')
                ->set_header("Access-Control-Allow-Origin: *")
                ->set_header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept")
                ->set_header("Content-Type: application/json; charset=UTF-8");
    }
    
    public function cargarCambiarSindicato() 
    {
        $p_rut = $this->input->get('p_rut');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_fec1 = $this->input->get('p_fec1'); 
        $p_fec2 = $this->input->get('p_fec2');  
        $query = $this->CambiarSindicatoModel->cargarCambiarSindicato($p_cod_emp, $p_rut, $p_fec1, $p_fec2);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }


    public function crearCambioSindicato() 
    {
        $P_RUT = $this->input->get('P_RUT');  
        $P_DV = $this->input->get('P_DV');  
        $P_COD_EMP = $this->input->get('P_COD_EMP'); 
        $P_USUARIO = $this->input->get('P_USUARIO');  
        $P_COD_TIPO_CAMBIO = $this->input->get('P_COD_TIPO_CAMBIO');  
        $P_NOM_TIPO_CAMBIO = $this->input->get('P_NOM_TIPO_CAMBIO');  
        $P_COD_SINDICATO = $this->input->get('P_COD_SINDICATO');  
        $P_NOM_SINDICATO = $this->input->get('P_NOM_SINDICATO');  
        $P_COD_ADHERENCIA = $this->input->get('P_COD_ADHERENCIA');  
        $P_NOM_ADHERENCIA = $this->input->get('P_NOM_ADHERENCIA');  
        $P_OBSERVACION = $this->input->get('P_OBSERVACION');       

        $query = $this->CambiarSindicatoModel->crearCambioSindicato(
              $P_RUT  
            , $P_DV  
            , $P_COD_EMP 
            , $P_USUARIO 
            , $P_COD_TIPO_CAMBIO  
            , $P_NOM_TIPO_CAMBIO  
            , $P_COD_SINDICATO
            , $P_NOM_SINDICATO 
            , $P_COD_ADHERENCIA 
            , $P_NOM_ADHERENCIA 
            , $P_OBSERVACION   );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function terminarCambioSindicato() {

        $p_cod = $this->input->get('p_cod');  
        $p_usuario = $this->input->get('p_usuario'); 
        

        $query = $this->CambiarSindicatoModel->terminarCambioSindicato(
            $p_cod 
          , $p_usuario );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);

    }

    public function eliminarCambioSindicato() {

        $p_cod = $this->input->get('p_cod');  
        $p_usuario = $this->input->get('p_usuario');  

        $query = $this->CambiarSindicatoModel->eliminarCambioSindicato(
            $p_cod
          , $p_usuario );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);

    }
    
}
