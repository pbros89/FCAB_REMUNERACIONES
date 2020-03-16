<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class CambiarCargoRentaController extends CI_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('cambiarCargoRenta/CambiarCargoRentaModel'); //Cargamos el modelo

        $this->output
                ->set_content_type('application/json')
                ->set_header("Access-Control-Allow-Origin: *")
                ->set_header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept")
                ->set_header("Content-Type: application/json; charset=UTF-8");
    }
    
    public function cargarCambiarCargoRenta() 
    {
        $p_rut = $this->input->get('p_rut');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_fec1 = $this->input->get('p_fec1'); 
        $p_fec2 = $this->input->get('p_fec2');  
        $query = $this->CambiarCargoRentaModel->cargarCambiarCargoRenta($p_cod_emp, $p_rut, $p_fec1, $p_fec2);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }


    public function crearCambioCargoRenta() 
    {
        $P_RUT = $this->input->get('P_RUT');  
        $P_DV = $this->input->get('P_DV');  
        $P_COD_EMP = $this->input->get('P_COD_EMP'); 
        $P_USUARIO = $this->input->get('P_USUARIO');  
        $P_COD_CC = $this->input->get('P_COD_CC');  
        $P_NOM_CC = $this->input->get('P_NOM_CC');  
        $P_COD_CARGO = $this->input->get('P_COD_CARGO');  
        $P_NOM_CARGO = $this->input->get('P_NOM_CARGO');  
        $P_COD_JORNADA = $this->input->get('P_COD_JORNADA');  
        $P_NOM_JORNADA = $this->input->get('P_NOM_JORNADA');  
        $P_COD_TIPO_CONTRATO = $this->input->get('P_COD_TIPO_CONTRATO');  
        $P_NOM_TIPO_CONTRATO = $this->input->get('P_NOM_TIPO_CONTRATO'); 
        $P_COD_TIPO_CAMBIO = $this->input->get('P_COD_TIPO_CAMBIO');  
        $P_NOM_TIPO_CAMBIO = $this->input->get('P_NOM_TIPO_CAMBIO'); 
        $P_OBSERVACION = $this->input->get('P_OBSERVACION');  
        $P_FECHA_FIN_CONTRATO = $this->input->get('P_FECHA_FIN_CONTRATO');  
        $P_SUELDO_BASE = $this->input->get('P_SUELDO_BASE');        

        $query = $this->CambiarCargoRentaModel->crearCambioCargoRenta(
              $P_RUT  
            , $P_DV  
            , $P_COD_EMP
            , $P_USUARIO 
            , $P_COD_CC  
            , $P_NOM_CC  
            , $P_COD_CARGO   
            , $P_NOM_CARGO   
            , $P_COD_JORNADA   
            , $P_NOM_JORNADA   
            , $P_COD_TIPO_CONTRATO   
            , $P_NOM_TIPO_CONTRATO   
            , $P_FECHA_FIN_CONTRATO   
            , $P_SUELDO_BASE
            , $P_OBSERVACION
            , $P_COD_TIPO_CAMBIO
            , $P_NOM_TIPO_CAMBIO   );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }


    public function terminarCambioCargoRenta() {

        $p_cod = $this->input->get('p_cod');  
        $p_usuario = $this->input->get('p_usuario'); 
        
        

        $query = $this->CambiarCargoRentaModel->terminarCambioCargoRenta(
            $p_cod 
          , $p_usuario );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);

    }

    public function eliminarCambioCargoRenta() {

        $p_cod = $this->input->get('p_cod');  
        $p_usuario = $this->input->get('p_usuario');  

        $query = $this->CambiarCargoRentaModel->eliminarCambioCargoRenta(
            $p_cod
          , $p_usuario );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);

    }
    
}
