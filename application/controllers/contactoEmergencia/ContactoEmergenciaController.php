<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class ContactoEmergenciaController extends CI_Controller
{

    function __construct()
    {
        parent::__construct();
        $this->load->model('contactoEmergencia/ContactoEmergenciaModel'); //Cargamos el modelo

        $this->output
            ->set_content_type('application/json')
            ->set_header("Access-Control-Allow-Origin: *")
            ->set_header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept")
            ->set_header("Content-Type: application/json; charset=UTF-8");
    }

    public function cargarContactosEmergencia()
    {
        $p_rut = $this->input->get('p_rut');
        $p_cod_emp = $this->input->get('p_cod_emp');
        $query = $this->ContactoEmergenciaModel->cargarContactosEmergencia($p_rut, $p_cod_emp);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function crearContactoEmergencia()
    {
        $p_rut = $this->input->get('p_rut');
        $p_nombre = $this->input->get('p_nombre');
        $p_correo = $this->input->get('p_correo');
        $p_telefono = $this->input->get('p_telefono');
        $p_celular = $this->input->get('p_celular');
        $p_usuario = $this->input->get('p_usuario');
        $p_cod_emp = $this->input->get('p_cod_emp');
        $query = $this->ContactoEmergenciaModel->crearContactoEmergencia($p_rut, $p_nombre, $p_correo, $p_telefono, $p_celular, $p_usuario, $p_cod_emp);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function eliminarContactoEmergencia()
    {
        $p_id = $this->input->get('p_id');
        $p_usuario = $this->input->get('p_usuario');
        $query = $this->ContactoEmergenciaModel->eliminarContactoEmergencia($p_id, $p_usuario);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }
}
