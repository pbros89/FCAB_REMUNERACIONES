<?php


if (!defined('BASEPATH')) exit('No se permite el acceso directo a este directorio');

class WFDesvinculacionController extends CI_Controller
{

    function __construct()
    {
        parent::__construct();
        $this->load->model('WFDesvinculacion/WFDesvinculacionModel'); //Cargamos el modelo

        $this->output
            ->set_content_type('application/json')
            ->set_header("Access-Control-Allow-Origin: *")
            ->set_header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept")
            ->set_header("Content-Type: application/json; charset=UTF-8");
    }

    public function listRutNombre()
    {
        $cod_emp = $this->input->get('cod_emp');

        $query = $this->WFDesvinculacionModel->listRutNombre($cod_emp);

        $result = "{'success':true, 'items':" . json_encode($query) . "}";

        $this->output->set_output($result);

    }

    public function datosPersonal()
    {
        $rut = $this->input->get('p_rut');

        $query = $this->WFDesvinculacionModel->datosPersonal($rut);

        $result = "{'success':true, 'items':" . json_encode($query) . "}";

        $this->output->set_output($result);

    }

    public function listCausalesDespido()
    {
        $cod_emp = $this->input->get('cod_emp');

        $query = $this->WFDesvinculacionModel->listCausalesDespido($cod_emp);

        $result = "{'success':true, 'items':" . json_encode($query) . "}";

        $this->output->set_output($result);

    }

}