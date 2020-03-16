<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class IngHaberRRLLController extends CI_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('ingHaberRRLL/IngHaberRRLLModel'); //Cargamos el modelo

        $this->output
                ->set_content_type('application/json')
                ->set_header("Access-Control-Allow-Origin: *")
                ->set_header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept")
                ->set_header("Content-Type: application/json; charset=UTF-8");
    }
    
    public function cargarIngHaberRRLL() 
    {
        $p_rut = $this->input->get('p_rut');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_fec1 = $this->input->get('p_fec1'); 
        $p_fec2 = $this->input->get('p_fec2');  
        $query = $this->IngHaberRRLLModel->cargarIngHaberRRLL($p_cod_emp, $p_rut, $p_fec1, $p_fec2);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }


    public function crearIngHaberRRLL() 
    {
        $P_RUT = $this->input->get('P_RUT');  
        $P_DV = $this->input->get('P_DV');  
        $P_USUARIO = $this->input->get('P_USUARIO');  
        $P_COD_EMP = $this->input->get('P_COD_EMP');  
        $P_COD_HABER = $this->input->get('P_COD_HABER');
        $P_TIPO = $this->input->get('P_TIPO');
        $P_NOM_HABER = $this->input->get('P_NOM_HABER');
        $P_MONTO = $this->input->get('P_MONTO');
        $P_INICIO = $this->input->get('P_INICIO');
        $P_TERMINO = $this->input->get('P_TERMINO');
        $P_USA_FECHA = $this->input->get('P_USA_FECHA');
        $P_FORMATO_VALOR = $this->input->get('P_FORMATO_VALOR');
        $P_OBSERVACION = $this->input->get('P_OBSERVACION');

        $query = $this->IngHaberRRLLModel->crearIngHaberRRLL(
              $P_RUT 
            , $P_DV 
            , $P_COD_EMP 
            , $P_USUARIO 
            , $P_COD_HABER
            , $P_TIPO
            , $P_NOM_HABER
            , $P_MONTO
            , $P_INICIO
            , $P_TERMINO
            , $P_USA_FECHA
            , $P_FORMATO_VALOR
            , $P_OBSERVACION);

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }
    

    public function modificarIngHaberRRLL()
    {
        $P_COD = $this->input->get('P_COD');  
        $P_USUARIO = $this->input->get('P_USUARIO');  
        $P_COD_EMP = $this->input->get('P_COD_EMP');  
        $P_COD_HABER = $this->input->get('P_COD_HABER');
        $P_TIPO = $this->input->get('P_TIPO');
        $P_NOM_HABER = $this->input->get('P_NOM_HABER');
        $P_MONTO = $this->input->get('P_MONTO');
        $P_INICIO = $this->input->get('P_INICIO');
        $P_TERMINO = $this->input->get('P_TERMINO');
        $P_USA_FECHA = $this->input->get('P_USA_FECHA');
        $P_FORMATO_VALOR = $this->input->get('P_FORMATO_VALOR');
        $P_OBSERVACION = $this->input->get('P_OBSERVACION');

        $query = $this->IngHaberRRLLModel->modificarIngHaberRRLL(
              $P_COD 
            , $P_COD_EMP 
            , $P_USUARIO 
            , $P_COD_HABER 
            , $P_TIPO 
            , $P_NOM_HABER 
            , $P_MONTO 
            , $P_INICIO 
            , $P_TERMINO 
            , $P_USA_FECHA 
            , $P_FORMATO_VALOR 
            , $P_OBSERVACION 
        );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }


    public function cambiarEstadoIngHaberRRLL()
    {
        $p_cod = $this->input->get('p_cod');  
        $p_usuario = $this->input->get('p_usuario');  
        $p_estado = $this->input->get('p_estado');  

        $query = $this->IngHaberRRLLModel->cambiarEstadoIngHaberRRLL($p_cod, $p_estado, $p_usuario);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function eliminarIngHaberRRLL()
    {
        $p_cod = $this->input->get('p_cod');  
        $p_usuario = $this->input->get('p_usuario');  

        $query = $this->IngHaberRRLLModel->eliminarIngHaberRRLL($p_cod, $p_usuario);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

}
