<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class AusentismoController extends CI_Controller
{

    function __construct()
    {
        parent::__construct();
        $this->load->model('ausentismo/AusentismoModel'); //Cargamos el modelo

        $this->output
            ->set_content_type('application/json')
            ->set_header("Access-Control-Allow-Origin: *")
            ->set_header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept")
            ->set_header("Content-Type: application/json; charset=UTF-8");
    }

    public function cargarAusentismo()
    {
        $p_rut = $this->input->get('p_rut');
        $p_cod_emp = $this->input->get('p_cod_emp');
        $p_fec1 = $this->input->get('p_fec1');
        $p_fec2 = $this->input->get('p_fec2');
        $p_tipo = $this->input->get('p_tipo');
        $query = $this->AusentismoModel->cargarAusentismo($p_cod_emp, $p_rut, $p_fec1, $p_fec2, $p_tipo);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }


    public function crearAusentismo()
    {
        $P_RUT = $this->input->get('P_RUT');
        $P_DV = $this->input->get('P_DV');
        $P_COD_EMP = $this->input->get('P_COD_EMP');
        $P_USUARIO = $this->input->get('P_USUARIO');
        $P_TIPO = $this->input->get('P_TIPO');
        $P_COD_AUSENTISMO = $this->input->get('P_COD_AUSENTISMO');
        $P_OBSERVACION = $this->input->get('P_OBSERVACION');
        $P_NOMBRE_AUSENTISMO = $this->input->get('P_NOMBRE_AUSENTISMO');
        $P_FECHA_INI = $this->input->get('P_FECHA_INI');
        $P_FECHA_FIN = $this->input->get('P_FECHA_FIN');
        $P_LUN = $this->input->get('P_LUN');
        $P_MAR = $this->input->get('P_MAR');
        $P_MIE = $this->input->get('P_MIE');
        $P_JUE = $this->input->get('P_JUE');
        $P_VIE = $this->input->get('P_VIE');
        $P_SAB = $this->input->get('P_SAB');
        $P_DOM = $this->input->get('P_DOM');
        $P_NO_FERIADO = $this->input->get('P_NO_FERIADO');
        $P_PERIODO = $this->input->get('P_PERIODO');


        $query = $this->AusentismoModel->crearAusentismo(
            $P_RUT,
            $P_DV,
            $P_COD_EMP,
            $P_USUARIO,
            $P_TIPO,
            $P_COD_AUSENTISMO,
            $P_NOMBRE_AUSENTISMO,
            $P_FECHA_INI,
            $P_FECHA_FIN,
            $P_OBSERVACION,
            $P_LUN,
            $P_MAR,
            $P_MIE,
            $P_JUE,
            $P_VIE,
            $P_SAB,
            $P_DOM,
            $P_NO_FERIADO,
            $P_PERIODO
        );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }


    public function terminarAusentismo()
    {

        $p_cod = $this->input->get('p_cod');
        $p_usuario = $this->input->get('p_usuario');


        $query = $this->AusentismoModel->terminarAusentismo(
            $p_cod,
            $p_usuario
        );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function eliminarAusentismo()
    {

        $p_cod = $this->input->get('p_cod');
        $p_usuario = $this->input->get('p_usuario');

        $query = $this->AusentismoModel->eliminarAusentismo(
            $p_cod,
            $p_usuario
        );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function anularAusentismo()
    {

        $p_cod = $this->input->get('p_cod');
        $p_usuario = $this->input->get('p_usuario');
        $p_obs = $this->input->get('p_obs');


        $query = $this->AusentismoModel->anularAusentismo(
            $p_cod,
            $p_usuario,
            $p_obs
        );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }
}
