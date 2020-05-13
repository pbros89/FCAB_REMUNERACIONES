<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class FiniquitoController extends CI_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('finiquito/FiniquitoModel'); //Cargamos el modelo

        $this->output
                ->set_content_type('application/json')
                ->set_header("Access-Control-Allow-Origin: *")
                ->set_header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept")
                ->set_header("Content-Type: application/json; charset=UTF-8");
    }
    
    public function cargarFiniquitos() 
    {
        $p_rut = $this->input->get('p_rut');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_fec1 = $this->input->get('p_fec1'); 
        $p_fec2 = $this->input->get('p_fec2');  
        $p_estado = $this->input->get('p_estado');  
        $query = $this->FiniquitoModel->cargarFiniquitos($p_cod_emp, $p_rut, $p_fec1, $p_fec2, $p_estado);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }    

    public function crearFiniquito()
    {
        $p_rut = $this->input->get('p_rut');  
        $p_dv = $this->input->get('p_dv');  
        $p_cod_causal = $this->input->get('p_cod_causal');  
        $p_nom_causal = $this->input->get('p_nom_causal');  
        $p_fecha_baja = $this->input->get('p_fecha_baja');  
        $p_usuario = $this->input->get('p_usuario');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_obs = $this->input->get('p_obs');  
        $P_PERIODO = $this->input->get('P_PERIODO');  

        $query = $this->FiniquitoModel->crearFiniquito(
            $p_rut, 
            $p_dv, 
            $p_cod_causal, 
            $p_nom_causal, 
            $p_fecha_baja,
            $p_cod_emp, 
            $p_usuario, 
            $p_obs,
            $P_PERIODO);

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function editarFiniquito()
    {
        $p_finiquito = $this->input->get('p_finiquito');  
        $p_cod_causal = $this->input->get('p_cod_causal');  
        $p_nom_causal = $this->input->get('p_nom_causal');  
        $p_fecha_baja = $this->input->get('p_fecha_baja');  
        $p_usuario = $this->input->get('p_usuario');  
        $p_obs = $this->input->get('p_obs');  
        $P_PERIODO = $this->input->get('P_PERIODO');

        $query = $this->FiniquitoModel->editarFiniquito(
            $p_finiquito, 
            $p_cod_causal, 
            $p_nom_causal, 
            $p_fecha_baja, 
            $p_usuario, 
            $p_obs,
            $P_PERIODO
        );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarPersonalFiniquito()
    {
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_rut = $this->input->get('p_rut');  
        $p_personal = $this->input->get('p_personal');  

        $query = $this->FiniquitoModel->cargarPersonalFiniquito($p_rut, $p_cod_emp, $p_personal);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }


    public function cambiarEstadoFiniquito()
    {
        $p_finiquito = $this->input->get('p_finiquito');  
        $p_usuario = $this->input->get('p_usuario');  
        $p_estado = $this->input->get('p_estado');  

        $query = $this->FiniquitoModel->cambiarEstadoFiniquito($p_finiquito, $p_estado, $p_usuario);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function eliminarFiniquito()
    {
        $p_finiquito = $this->input->get('p_finiquito');  
        $p_usuario = $this->input->get('p_usuario');  

        $query = $this->FiniquitoModel->eliminarFiniquito($p_finiquito, $p_usuario);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarConceptosFiniquito()
    {
        $p_finiquito = $this->input->get('p_finiquito');  
        $p_grupo = $this->input->get('p_grupo');  

        $query = $this->FiniquitoModel->cargarConceptosFiniquito($p_finiquito, $p_grupo);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function modificarFiniquitoConcepto()
    {
        $p_finiquito = $this->input->get('p_finiquito');  
        $p_cod_concepto = $this->input->get('p_cod_concepto');  
        $p_usuario = $this->input->get('p_usuario');  
        $p_valor = $this->input->get('p_valor');  

        $query = $this->FiniquitoModel->modificarFiniquitoConcepto($p_finiquito, $p_cod_concepto, $p_usuario, $p_valor);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function anularFiniquito()
    {
        $p_cod = $this->input->get('p_cod');
        $p_usuario = $this->input->get('p_usuario');
        $p_obs = $this->input->get('p_obs');


        $query = $this->FiniquitoModel->anularFiniquito(
            $p_cod,
            $p_usuario,
            $p_obs
        );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

}
