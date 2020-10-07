<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class CambiarOtrosController extends CI_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('cambiarOtros/CambiarOtrosModel'); //Cargamos el modelo

        $this->output
                ->set_content_type('application/json')
                ->set_header("Access-Control-Allow-Origin: *")
                ->set_header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept")
                ->set_header("Content-Type: application/json; charset=UTF-8");
    }
    
    public function cargarCambiarOtros() 
    {
        $p_rut = $this->input->get('p_rut');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_fec1 = $this->input->get('p_fec1'); 
        $p_fec2 = $this->input->get('p_fec2');  
        $query = $this->CambiarOtrosModel->cargarCambiarOtros($p_cod_emp, $p_rut, $p_fec1, $p_fec2);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }


    public function crearCambioOtros() 
    {
        $P_RUT = $this->input->get('P_RUT');  
        $P_DV = $this->input->get('P_DV');  
        $P_COD_EMP = $this->input->get('P_COD_EMP'); 
        $P_USUARIO = $this->input->get('P_USUARIO');  
        $P_COD_TIPO_CAMBIO = $this->input->get('P_COD_TIPO_CAMBIO');  
        $P_NOM_TIPO_CAMBIO = $this->input->get('P_NOM_TIPO_CAMBIO');  
        $P_OBSERVACION = $this->input->get('P_OBSERVACION');  
        $P_CORREO = $this->input->get('P_CORREO');  
        $P_TELEFONO = $this->input->get('P_TELEFONO');  
        $P_COD_EST_CIVIL = $this->input->get('P_COD_EST_CIVIL');  
        $P_NOM_EST_CIVIL = $this->input->get('P_NOM_EST_CIVIL');  
        $P_COD_ESCOLARIDAD = $this->input->get('P_COD_ESCOLARIDAD');  
        $P_NOM_ESCOLARIDAD = $this->input->get('P_NOM_ESCOLARIDAD');  
        $P_CALLE = $this->input->get('P_CALLE');  
        $P_NUMERO = $this->input->get('P_NUMERO');  
        $P_DEPARTAMENTO = $this->input->get('P_DEPARTAMENTO');  
        $P_CIUDAD = $this->input->get('P_CIUDAD');  
        $P_COMUNA = $this->input->get('P_COMUNA');  
        $P_PERIODO = $this->input->get('P_PERIODO');  
        $P_COD_COMUNA = $this->input->get('P_COD_COMUNA'); 
        $P_COD_CIUDAD = $this->input->get('P_COD_CIUDAD'); 
        $P_TELEFONO2 = $this->input->get('P_TELEFONO2'); 
        

        $query = $this->CambiarOtrosModel->crearCambioOtros(
              $P_RUT  
            , $P_DV  
            , $P_COD_EMP 
            , $P_USUARIO 
            , $P_COD_TIPO_CAMBIO  
            , $P_NOM_TIPO_CAMBIO
            , $P_CORREO
            , $P_TELEFONO  
            , $P_OBSERVACION    
            ,$P_COD_EST_CIVIL 
            , $P_NOM_EST_CIVIL 
            , $P_COD_ESCOLARIDAD 
            , $P_NOM_ESCOLARIDAD 
            , $P_CALLE 
            , $P_NUMERO 
            , $P_DEPARTAMENTO 
            , $P_CIUDAD 
            , $P_COMUNA
            , $P_PERIODO 
            , $P_COD_COMUNA 
            , $P_COD_CIUDAD
            , $P_TELEFONO2 
        );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }


    public function terminarCambioOtros() {

        $p_cod = $this->input->get('p_cod');  
        $p_usuario = $this->input->get('p_usuario'); 
        

        $query = $this->CambiarOtrosModel->terminarCambioOtros(
            $p_cod 
          , $p_usuario );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);

    }

    public function eliminarCambioOtros() {

        $p_cod = $this->input->get('p_cod');  
        $p_usuario = $this->input->get('p_usuario');  

        $query = $this->CambiarOtrosModel->eliminarCambioOtros(
            $p_cod
          , $p_usuario );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);

    }

    public function anularCambioOtros()
    {
        $p_cod = $this->input->get('p_cod');
        $p_usuario = $this->input->get('p_usuario');
        $p_obs = $this->input->get('p_obs');


        $query = $this->CambiarOtrosModel->anularCambioOtros(
            $p_cod,
            $p_usuario,
            $p_obs
        );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }
    
}
