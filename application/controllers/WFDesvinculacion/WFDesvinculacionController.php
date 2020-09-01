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

    public function misRoles()
    {
        $usaurio = $this->input->get('p_usuario');

        $query = $this->WFDesvinculacionModel->misRoles($usaurio);

        $result = "{'success':true, 'items':" . json_encode($query) . "}";

        $this->output->set_output($result);

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
        $p_id = $this->input->get('p_id');

        $query = $this->WFDesvinculacionModel->datosPersonal($p_id);

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

    public function guardarSolDesvinculacion()
    {
        $listado_lineas = $this->input->get('listado_lineas');

        $query = $this->WFDesvinculacionModel->guardarSolDesvinculacion($listado_lineas);

        $result = "{'success':true, 'items':" . json_encode($query) . "}";

        $this->output->set_output($result);

    }

    public function listaDesvinculaciones()
    {
        $cod_emp = $this->input->get('cod_emp');

        $query = $this->WFDesvinculacionModel->listaDesvinculaciones($cod_emp);

        $result = "{'success':true, 'items':" . json_encode($query) . "}";

        $this->output->set_output($result);

    }

    public function detalleDesvinculacion()
    {
        $numero = $this->input->get('p_numero');

        $query = $this->WFDesvinculacionModel->detalleDesvinculacion($numero);

        $result = "{'success':true, 'items':" . json_encode($query) . "}";

        $this->output->set_output($result);

    }

    public function detalleCasoWF()
    {
        $wf = $this->input->get('p_wf');
        $caso = $this->input->get('p_caso');

        $query = $this->WFDesvinculacionModel->detalleCasoWF($wf, $caso);

        $result = "{'success':true, 'items':" . json_encode($query) . "}";

        $this->output->set_output($result);

    }

    public function detalleAprobacionWF()
    {
        $numero = $this->input->get('p_numero');

        $query = $this->WFDesvinculacionModel->detalleAprobacionWF($numero);

        $result = "{'success':true, 'items':" . json_encode($query) . "}";

        $this->output->set_output($result);

    }

}