<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class IngDescuentoRRLLController extends CI_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('ingDescuentoRRLL/IngDescuentoRRLLModel'); //Cargamos el modelo

        $this->output
                ->set_content_type('application/json')
                ->set_header("Access-Control-Allow-Origin: *")
                ->set_header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept")
                ->set_header("Content-Type: application/json; charset=UTF-8");
    }
    
    public function cargarIngDescuentoRRLL() 
    {
        $p_rut = $this->input->get('p_rut');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_fec1 = $this->input->get('p_fec1'); 
        $p_fec2 = $this->input->get('p_fec2');  
        $query = $this->IngDescuentoRRLLModel->cargarIngDescuentoRRLL($p_cod_emp, $p_rut, $p_fec1, $p_fec2);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }


    public function crearIngDescuentoRRLL() 
    {
        $P_RUT = $this->input->get('P_RUT');  
        $P_DV = $this->input->get('P_DV');  
        $P_USUARIO = $this->input->get('P_USUARIO');  
        $P_COD_EMP = $this->input->get('P_COD_EMP');  
        $P_COD_DESCUENTO = $this->input->get('P_COD_DESCUENTO');
        $P_TIPO = $this->input->get('P_TIPO');
        $P_NOM_DESCUENTO = $this->input->get('P_NOM_DESCUENTO');
        $P_MONTO_TOTAL = $this->input->get('P_MONTO_TOTAL');
        $P_CUOTAS = $this->input->get('P_CUOTAS');
        $P_VALOR_CUOTA = $this->input->get('P_VALOR_CUOTA');
        $P_MES_DESCUENTO = $this->input->get('P_MES_DESCUENTO');
        $P_FORMATO_VALOR = $this->input->get('P_FORMATO_VALOR');
        $P_ANHO_DESCUENTO = $this->input->get('P_ANHO_DESCUENTO');
        $P_OBSERVACION = $this->input->get('P_OBSERVACION');
        $P_PERIODO = $this->input->get('P_PERIODO');

        $query = $this->IngDescuentoRRLLModel->crearIngDescuentoRRLL(
              $P_RUT 
            , $P_DV 
            , $P_COD_EMP
            , $P_USUARIO 
            , $P_COD_DESCUENTO 
            , $P_TIPO 
            , $P_NOM_DESCUENTO 
            , $P_MONTO_TOTAL 
            , $P_CUOTAS 
            , $P_VALOR_CUOTA
            , $P_MES_DESCUENTO 
            , $P_FORMATO_VALOR
            , $P_OBSERVACION 
            , $P_ANHO_DESCUENTO
            , $P_PERIODO
        );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }
    

    public function modificarIngDescuentoRRLL()
    {
        $P_COD = $this->input->get('P_COD');  
        $P_USUARIO = $this->input->get('P_USUARIO');  
        $P_COD_EMP = $this->input->get('P_COD_EMP');  
        $P_COD_DESCUENTO = $this->input->get('P_COD_DESCUENTO');
        $P_TIPO = $this->input->get('P_TIPO');
        $P_NOM_DESCUENTO = $this->input->get('P_NOM_DESCUENTO');
        $P_MONTO_TOTAL = $this->input->get('P_MONTO_TOTAL');
        $P_CUOTAS = $this->input->get('P_CUOTAS');
        $P_VALOR_CUOTA = $this->input->get('P_VALOR_CUOTA');
        $P_MES_DESCUENTO = $this->input->get('P_MES_DESCUENTO');
        $P_FORMATO_VALOR = $this->input->get('P_FORMATO_VALOR');
        $P_ANHO_DESCUENTO = $this->input->get('P_ANHO_DESCUENTO');
        $P_OBSERVACION = $this->input->get('P_OBSERVACION');
        $P_PERIODO = $this->input->get('P_PERIODO');

        $query = $this->IngDescuentoRRLLModel->modificarIngDescuentoRRLL(
            $P_COD
          , $P_COD_EMP
          , $P_USUARIO
          , $P_COD_DESCUENTO
          , $P_TIPO
          , $P_NOM_DESCUENTO
          , $P_MONTO_TOTAL
          , $P_CUOTAS
          , $P_VALOR_CUOTA
          , $P_MES_DESCUENTO
          , $P_FORMATO_VALOR
          , $P_OBSERVACION
          , $P_ANHO_DESCUENTO
          , $P_PERIODO
        );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }


    public function cambiarEstadoIngDescuentoRRLL()
    {
        $p_cod = $this->input->get('p_cod');  
        $p_usuario = $this->input->get('p_usuario');  
        $p_estado = $this->input->get('p_estado');  

        $query = $this->IngDescuentoRRLLModel->cambiarEstadoIngDescuentoRRLL($p_cod, $p_estado, $p_usuario);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function eliminarIngDescuentoRRLL()
    {
        $p_cod = $this->input->get('p_cod');  
        $p_usuario = $this->input->get('p_usuario');  

        $query = $this->IngDescuentoRRLLModel->eliminarIngDescuentoRRLL($p_cod, $p_usuario);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function anularIngDescuentoRRLL()
    {
        $p_cod = $this->input->get('p_cod');
        $p_usuario = $this->input->get('p_usuario');
        $p_obs = $this->input->get('p_obs');


        $query = $this->IngDescuentoRRLLModel->anularIngDescuentoRRLL(
            $p_cod,
            $p_usuario,
            $p_obs
        );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

}
