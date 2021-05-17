<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class TarifarioController extends CI_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('tarifario/TarifarioModel'); //Cargamos el modelo

        $this->output
                ->set_content_type('application/json')
                ->set_header("Access-Control-Allow-Origin: *")
                ->set_header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept")
                ->set_header("Content-Type: application/json; charset=UTF-8");
    }
    
    public function cargarTarifas()
    {
        $query = $this->TarifarioModel->cargarTarifas();
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function crearTarifa()
    {
        $p_nro_solicitud = $this->input->get('p_nro_solicitud'); 
        $p_rut = $this->input->get('p_rut');  
        $p_razon_social = $this->input->get('p_razon_social');  
        $p_id_ruta = $this->input->get('p_id_ruta');  
        $p_servicio = $this->input->get('p_servicio');   
        $p_bono_conductor = $this->input->get('p_bono_conductor');  
        $p_bono_conductor_sec = $this->input->get('p_bono_conductor_sec');   
        $p_viatico = $this->input->get('p_viatico');  
        $p_valor = $this->input->get('p_valor');  
        $p_ton_27_5 = $this->input->get('p_ton_27_5');   
        $p_peaje = $this->input->get('p_peaje');  
        $p_tiempo_espera = $this->input->get('p_tiempo_espera');  
        $p_factor_te = $this->input->get('p_factor_te');  
        $p_bono_sqm = $this->input->get('p_bono_sqm');  
        $p_mp_vacio = $this->input->get('p_mp_vacio');  
        $p_usuario = $this->input->get('p_usuario');  

        $query = $this->TarifarioModel->crearTarifa(
            $p_nro_solicitud, 
            $p_rut, 
            $p_razon_social, 
            $p_id_ruta, 
            $p_servicio, 
            $p_bono_conductor, 
            $p_bono_conductor_sec, 
            $p_viatico, 
            $p_valor, 
            $p_ton_27_5, 
            $p_peaje,
            $p_tiempo_espera, 
            $p_factor_te, 
            $p_bono_sqm, 
            $p_mp_vacio,
            $p_usuario);

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function copiarTarifa()
    {
        $p_anho = $this->input->get('p_anho'); 
        $p_mes = $this->input->get('p_mes');  
        $p_usuario = $this->input->get('p_usuario');  

        $query = $this->TarifarioModel->copiarTarifa(
            $p_anho, 
            $p_mes, 
            $p_usuario);
            
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }


    public function modificarTarifa()
    {
        $p_nro_solicitud = $this->input->get('p_nro_solicitud'); 
        $p_rut = $this->input->get('p_rut');  
        $p_razon_social = $this->input->get('p_razon_social');  
        $p_id_ruta = $this->input->get('p_id_ruta');  
        $p_servicio = $this->input->get('p_servicio');   
        $p_bono_conductor = $this->input->get('p_bono_conductor');  
        $p_bono_conductor_sec = $this->input->get('p_bono_conductor_sec');   
        $p_viatico = $this->input->get('p_viatico');  
        $p_valor = $this->input->get('p_valor');  
        $p_ton_27_5 = $this->input->get('p_ton_27_5');   
        $p_peaje = $this->input->get('p_peaje');  
        $p_tiempo_espera = $this->input->get('p_tiempo_espera');  
        $p_factor_te = $this->input->get('p_factor_te');  
        $p_bono_sqm = $this->input->get('p_bono_sqm');  
        $p_mp_vacio = $this->input->get('p_mp_vacio'); 
        $p_usuario = $this->input->get('p_usuario');  

        $query = $this->TarifarioModel->modificarTarifa(
            $p_nro_solicitud, 
            $p_rut, 
            $p_razon_social, 
            $p_id_ruta, 
            $p_servicio, 
            $p_bono_conductor, 
            $p_bono_conductor_sec, 
            $p_viatico, 
            $p_valor, 
            $p_ton_27_5, 
            $p_peaje,
            $p_tiempo_espera, 
            $p_factor_te, 
            $p_bono_sqm, 
            $p_mp_vacio,
            $p_usuario);
            
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }


    public function eliminarTarifa()
    {
        $p_nro_solicitud = $this->input->get('p_nro_solicitud'); 
        $p_usuario = $this->input->get('p_usuario');  

        $query = $this->TarifarioModel->eliminarTarifa(
            $p_nro_solicitud,
            $p_usuario);
            
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function agregarFactorTarifa()
    {
        $p_factor = $this->input->get('p_factor');  
        $p_bono_conductor = $this->input->get('p_bono_conductor');  
        $p_bono_conductor_sec = $this->input->get('p_bono_conductor_sec');   
        $p_viatico = $this->input->get('p_viatico');  
        $p_valor = $this->input->get('p_valor');  
        $p_ton_27_5 = $this->input->get('p_ton_27_5');   
        $p_peaje = $this->input->get('p_peaje');  
        $p_tiempo_espera = $this->input->get('p_tiempo_espera');  
        $p_bono_sqm = $this->input->get('p_bono_sqm');  
        $p_mp_vacio = $this->input->get('p_mp_vacio'); 
        $p_usuario = $this->input->get('p_usuario');  

        $query = $this->TarifarioModel->agregarFactorTarifa(
            $p_factor,
            $p_bono_conductor, 
            $p_bono_conductor_sec, 
            $p_viatico, 
            $p_valor, 
            $p_ton_27_5, 
            $p_peaje,
            $p_tiempo_espera,
            $p_bono_sqm, 
            $p_mp_vacio,
            $p_usuario);
            
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarSimulacionFactor()
    {
        $p_factor = $this->input->get('p_factor');  
        $p_bono_conductor = $this->input->get('p_bono_conductor');  
        $p_bono_conductor_sec = $this->input->get('p_bono_conductor_sec');   
        $p_viatico = $this->input->get('p_viatico');  
        $p_valor = $this->input->get('p_valor');  
        $p_ton_27_5 = $this->input->get('p_ton_27_5');   
        $p_peaje = $this->input->get('p_peaje');  
        $p_tiempo_espera = $this->input->get('p_tiempo_espera');  
        $p_bono_sqm = $this->input->get('p_bono_sqm');   
        $p_mp_vacio = $this->input->get('p_mp_vacio'); 

        $query = $this->TarifarioModel->cargarSimulacionFactor(
            $p_factor,
            $p_bono_conductor, 
            $p_bono_conductor_sec, 
            $p_viatico, 
            $p_valor, 
            $p_ton_27_5, 
            $p_peaje,
            $p_tiempo_espera,
            $p_bono_sqm,
            $p_mp_vacio);
            
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }


    public function cargarSolicitud()
    {
        $p_solicitud = $this->input->get('p_solicitud');  

        $query = $this->TarifarioModel->cargarSolicitud(
            $p_solicitud);
            
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }
    
}
