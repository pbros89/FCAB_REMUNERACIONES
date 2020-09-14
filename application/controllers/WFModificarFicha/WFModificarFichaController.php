<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class WFModificarFichaController extends CI_Controller
{

    function __construct()
    {
        parent::__construct();
        $this->load->model('WFModificarFicha/WFModificarFichaModel'); //Cargamos el modelo

        $this->output
            ->set_content_type('application/json')
            ->set_header("Access-Control-Allow-Origin: *")
            ->set_header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept")
            ->set_header("Content-Type: application/json; charset=UTF-8");
    }

    public function cagarSolicitudesCambioFicha()
    {
        $p_id = $this->input->get('p_id');
        $p_cod_emp = $this->input->get('p_cod_emp');
        $p_rut = $this->input->get('p_rut');
        $p_usuario = $this->input->get('p_usuario');
        $p_estado = $this->input->get('p_estado');
        $p_rol = $this->input->get('p_rol');
        $p_periodo = $this->input->get('p_periodo');

        $query = $this->WFModificarFichaModel->cagarSolicitudesCambioFicha($p_id, $p_cod_emp, $p_rut, $p_usuario, $p_estado, $p_rol, $p_periodo);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarPersonalVigentePorPrivilegioUsuario()
    {
        $p_cod_emp = $this->input->get('p_cod_emp');
        $p_usuario = $this->input->get('p_usuario');
        $p_rol = $this->input->get('p_rol');

        $query = $this->WFModificarFichaModel->cargarPersonalVigentePorPrivilegioUsuario($p_cod_emp, $p_usuario, $p_rol);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function crearSolicitudCambioFicha()
    {
        $P_COD_CARGO = $this->input->get('P_COD_CARGO');
        $P_NOM_CARGO = $this->input->get('P_NOM_CARGO');
        $P_COD_CC = $this->input->get('P_COD_CC');
        $P_NOM_CC = $this->input->get('P_NOM_CC');
        $P_COD_PLAZO = $this->input->get('P_COD_PLAZO');
        $P_NOM_PLAZO = $this->input->get('P_NOM_PLAZO');
        $P_COD_JORNADA = $this->input->get('P_COD_JORNADA');
        $P_NOM_JORNADA = $this->input->get('P_NOM_JORNADA');
        $P_COD_LUGAR = $this->input->get('P_COD_LUGAR');
        $P_NOM_LUGAR = $this->input->get('P_NOM_LUGAR');
        $P_DESC_BONOS = $this->input->get('P_DESC_BONOS');
        $P_SUELDO = $this->input->get('P_SUELDO');
        $P_OBS_CARGO = $this->input->get('P_OBS_CARGO');
        $P_OBS_CC = $this->input->get('P_OBS_CC');
        $P_OBS_PLAZO = $this->input->get('P_OBS_PLAZO');
        $P_OBS_JORNADA = $this->input->get('P_OBS_JORNADA');
        $P_OBS_LUGAR = $this->input->get('P_OBS_LUGAR');
        $P_OBS_SUELDO = $this->input->get('P_OBS_SUELDO');
        $P_TRAS_COD_CARGO = $this->input->get('P_TRAS_COD_CARGO');
        $P_TRAS_NOM_CARGO = $this->input->get('P_TRAS_NOM_CARGO');
        $P_OBS_TRAS_CARGO = $this->input->get('P_OBS_TRAS_CARGO');
        $P_TRAS_INI = $this->input->get('P_TRAS_INI');
        $P_TRAS_FIN = $this->input->get('P_TRAS_FIN');
        $P_TRAS_TIENE_BONO = $this->input->get('P_TRAS_TIENE_BONO');
        $P_TRAS_BONO = $this->input->get('P_TRAS_BONO');
        $P_MOTIVO_CAMBIO = $this->input->get('P_MOTIVO_CAMBIO');
        $P_USUARIO = $this->input->get('P_USUARIO');
        $P_COD_EMP = $this->input->get('P_COD_EMP');
        $P_NOM_EMP = $this->input->get('P_NOM_EMP');
        $P_FK_PERSONAL = $this->input->get('P_FK_PERSONAL');
        $P_ESTADO = $this->input->get('P_ESTADO');
        $P_ROL_WF = $this->input->get('P_ROL_WF');
        $P_COD_CC_SOL = $this->input->get('P_COD_CC_SOL');
        $P_PERIODO = $this->input->get('P_PERIODO');

        $query = $this->WFModificarFichaModel->crearSolicitudCambioFicha(
            $P_COD_CARGO,
            $P_NOM_CARGO,
            $P_COD_CC,
            $P_NOM_CC,
            $P_COD_PLAZO,
            $P_NOM_PLAZO,
            $P_COD_JORNADA,
            $P_NOM_JORNADA,
            $P_COD_LUGAR,
            $P_NOM_LUGAR,
            $P_DESC_BONOS,
            $P_SUELDO,
            $P_OBS_CARGO,
            $P_OBS_CC,
            $P_OBS_PLAZO,
            $P_OBS_JORNADA,
            $P_OBS_LUGAR,
            $P_OBS_SUELDO,
            $P_TRAS_COD_CARGO,
            $P_TRAS_NOM_CARGO,
            $P_OBS_TRAS_CARGO,
            $P_TRAS_INI,
            $P_TRAS_FIN,
            $P_TRAS_TIENE_BONO,
            $P_TRAS_BONO,
            $P_MOTIVO_CAMBIO,
            $P_USUARIO,
            $P_COD_EMP,
            $P_NOM_EMP,
            $P_FK_PERSONAL,
            $P_ESTADO,
            $P_ROL_WF,
            $P_COD_CC_SOL,
            $P_PERIODO
        );
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }


    public function cambiarEstadoEtapaSolCambioFicha()
    {
        $P_ID = $this->input->get('P_ID');
        $P_ROL_WF = $this->input->get('P_ROL_WF');
        $P_USUARIO = $this->input->get('P_USUARIO');
        $P_ESTADO = $this->input->get('P_ESTADO');

        $query = $this->WFModificarFichaModel->cambiarEstadoEtapaSolCambioFicha($P_ID, $P_ROL_WF, $P_USUARIO, $P_ESTADO);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarRolesWFUsuario() {
        $p_usuario = $this->input->get('p_usuario');
        $p_cod_emp = $this->input->get('p_cod_emp');

        $query = $this->WFModificarFichaModel->cargarRolesWFUsuario($p_usuario, $p_cod_emp);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function anularSolicitudCambioFicha() {
        $P_ID = $this->input->get('P_ID');
        $P_USUARIO = $this->input->get('P_USUARIO');

        $query = $this->WFModificarFichaModel->anularSolicitudCambioFicha($P_ID, $P_USUARIO);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarEtapasCambiarficha() {
        $p_id = $this->input->get('p_id');

        $query = $this->WFModificarFichaModel->cargarEtapasCambiarficha($p_id);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }
}
