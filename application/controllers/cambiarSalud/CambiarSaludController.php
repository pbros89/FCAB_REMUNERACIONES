<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class CambiarSaludController extends CI_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('cambiarSalud/CambiarSaludModel'); //Cargamos el modelo

        $this->output
                ->set_content_type('application/json')
                ->set_header("Access-Control-Allow-Origin: *")
                ->set_header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept")
                ->set_header("Content-Type: application/json; charset=UTF-8");
    }
    
    public function cargarCambiarSalud() 
    {
        $p_rut = $this->input->get('p_rut');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_fec1 = $this->input->get('p_fec1'); 
        $p_fec2 = $this->input->get('p_fec2');  
        $query = $this->CambiarSaludModel->cargarCambiarSalud($p_cod_emp, $p_rut, $p_fec1, $p_fec2);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }


    public function crearCambioSalud() 
    {
        $P_RUT = $this->input->get('P_RUT');  
        $P_DV = $this->input->get('P_DV');  
        $P_COD_EMP = $this->input->get('P_COD_EMP'); 
        $P_USUARIO = $this->input->get('P_USUARIO');  
        $P_COD_TIPO_CAMBIO = $this->input->get('P_COD_TIPO_CAMBIO');  
        $P_NOM_TIPO_CAMBIO = $this->input->get('P_NOM_TIPO_CAMBIO');  
        $P_COD_SALUD = $this->input->get('P_COD_SALUD');  
        $P_NOM_SALUD = $this->input->get('P_NOM_SALUD');  
        $P_VALOR_PLAN = $this->input->get('P_VALOR_PLAN');  
        $P_TIPO_PLAN = $this->input->get('P_TIPO_PLAN');  
        $P_VALOR_GES = $this->input->get('P_VALOR_GES');  
        $P_TIPO_GES = $this->input->get('P_TIPO_GES'); 
        $P_OBSERVACION = $this->input->get('P_OBSERVACION');  
        $P_VALOR_ADI_TRA = $this->input->get('P_VALOR_ADI_TRA');  
        $P_TIPO_ADI_TRA = $this->input->get('P_TIPO_ADI_TRA');  
        $P_VALOR_ADI_EMP = $this->input->get('P_VALOR_ADI_EMP');  
        $P_TIPO_ADI_EMP = $this->input->get('P_TIPO_ADI_EMP');  
        $P_VALOR_CONVENIO = $this->input->get('P_VALOR_CONVENIO');  
        $P_TIPO_CONVENIO = $this->input->get('P_TIPO_CONVENIO');  
        $P_PERIODO = $this->input->get('P_PERIODO');          

        $query = $this->CambiarSaludModel->crearCambioSalud(
            $P_RUT  
          , $P_DV  
          , $P_COD_EMP 
          , $P_USUARIO 
          , $P_COD_TIPO_CAMBIO  
          , $P_NOM_TIPO_CAMBIO  
          , $P_COD_SALUD  
          , $P_NOM_SALUD  
          , $P_VALOR_PLAN 
          , $P_TIPO_PLAN  
          , $P_VALOR_GES 
          , $P_TIPO_GES  
          , $P_VALOR_ADI_TRA 
          , $P_TIPO_ADI_TRA  
          , $P_VALOR_ADI_EMP 
          , $P_TIPO_ADI_EMP  
          , $P_VALOR_CONVENIO 
          , $P_TIPO_CONVENIO  
          , $P_OBSERVACION  
          , $P_PERIODO  
        );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function terminarCambioSalud() {

        $p_cod = $this->input->get('p_cod');  
        $p_usuario = $this->input->get('p_usuario'); 
        

        $query = $this->CambiarSaludModel->terminarCambioSalud(
            $p_cod 
          , $p_usuario );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);

    }

    public function eliminarCambioSalud() {

        $p_cod = $this->input->get('p_cod');  
        $p_usuario = $this->input->get('p_usuario');  

        $query = $this->CambiarSaludModel->eliminarCambioSalud(
            $p_cod
          , $p_usuario );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);

    }

    public function anularCambioSalud()
    {
        $p_cod = $this->input->get('p_cod');
        $p_usuario = $this->input->get('p_usuario');
        $p_obs = $this->input->get('p_obs');


        $query = $this->CambiarSaludModel->anularCambioSalud(
            $p_cod,
            $p_usuario,
            $p_obs
        );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }
    
}
