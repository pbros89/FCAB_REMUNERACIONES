<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class TarifarioMensualController extends CI_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('tarifarioMensual/TarifarioMensualModel'); //Cargamos el modelo

        $this->output
                ->set_content_type('application/json')
                ->set_header("Access-Control-Allow-Origin: *")
                ->set_header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept")
                ->set_header("Content-Type: application/json; charset=UTF-8");
    }
    
    public function cargarTarifasMensuales()
    {
        $query = $this->TarifarioMensualModel->cargarTarifasMensuales();
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarValidacionErroresTarifario()
    {
        $p_anho = $this->input->get('p_anho');
        $p_mes = $this->input->get('p_mes');
        $p_desde = $this->input->get('p_desde');
        $p_hasta = $this->input->get('p_hasta');
        $query = $this->TarifarioMensualModel->cargarValidacionErroresTarifario(
            $p_anho,
            $p_mes,
            $p_desde,
            $p_hasta
        );
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function iniciarTarifarioMensual()
    {
        $p_anho = $this->input->get('p_anho');
        $p_mes = $this->input->get('p_mes');
        $p_desde = $this->input->get('p_desde');
        $p_hasta = $this->input->get('p_hasta');
        $p_observacion = $this->input->get('p_observacion');  
        $p_usuario = $this->input->get('p_usuario');  


        $query = $this->TarifarioMensualModel->iniciarTarifarioMensual(
            $p_anho, 
            $p_mes, 
            $p_desde, 
            $p_hasta, 
            $p_observacion, 
            $p_usuario);

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function traspasarTarifarioMensual()
    {
        $p_anho = $this->input->get('p_anho'); 
        $p_mes = $this->input->get('p_mes');  
        $p_usuario = $this->input->get('p_usuario');  

        $query = $this->TarifarioMensualModel->traspasarTarifarioMensual(
            $p_anho, 
            $p_mes, 
            $p_usuario);
            
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function eliminarTarifarioMensual()
    {
        $p_anho = $this->input->get('p_anho'); 
        $p_mes = $this->input->get('p_mes');  
        $p_usuario = $this->input->get('p_usuario');  

        $query = $this->TarifarioMensualModel->eliminarTarifarioMensual(
            $p_anho, 
            $p_mes, 
            $p_usuario);
            
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function terminarTarifarioMensual()
    {
        $p_anho = $this->input->get('p_anho'); 
        $p_mes = $this->input->get('p_mes');  
        $p_usuario = $this->input->get('p_usuario');  

        $query = $this->TarifarioMensualModel->terminarTarifarioMensual(
            $p_anho, 
            $p_mes, 
            $p_usuario);
            
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }
    

    public function anularTarifarioMensual()
    {
        $p_anho = $this->input->get('p_anho'); 
        $p_mes = $this->input->get('p_mes');  
        $p_usuario = $this->input->get('p_usuario');  

        $query = $this->TarifarioMensualModel->anularTarifarioMensual(
            $p_anho, 
            $p_mes, 
            $p_usuario);
            
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }


    public function cargarTarifaMensualGuias()
    {
        $p_anho = $this->input->get('p_anho'); 
        $p_mes = $this->input->get('p_mes');  
        $p_rut_1 = $this->input->get('p_rut_1');  
        $p_rut_2 = $this->input->get('p_rut_2');  

        $query = $this->TarifarioMensualModel->cargarTarifaMensualGuias(
            $p_anho, 
            $p_mes,
            $p_rut_1,
            $p_rut_2);
            
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarTarifaMensualDet()
    {
        $p_anho = $this->input->get('p_anho'); 
        $p_mes = $this->input->get('p_mes');  

        $query = $this->TarifarioMensualModel->cargarTarifaMensualDet(
            $p_anho, 
            $p_mes);
            
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarTarifarioMensualGuiasDet()
    {
        $p_anho = $this->input->get('p_anho'); 
        $p_mes = $this->input->get('p_mes');  
        $p_rut = $this->input->get('p_rut');  

        $query = $this->TarifarioMensualModel->cargarTarifarioMensualGuiasDet(
            $p_anho, 
            $p_mes,
            $p_rut);
            
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarTarifarioMensual()
    {
        $p_anho = $this->input->get('p_anho'); 
        $p_mes = $this->input->get('p_mes');  

        $query = $this->TarifarioMensualModel->cargarTarifarioMensual(
            $p_anho, 
            $p_mes);
            
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }
    
}
