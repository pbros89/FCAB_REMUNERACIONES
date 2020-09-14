<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class UsuarioController extends CI_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('usuario/UsuarioModel'); //Cargamos el modelo

        $this->output
                ->set_content_type('application/json')
                ->set_header("Access-Control-Allow-Origin: *")
                ->set_header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept")
                ->set_header("Content-Type: application/json; charset=UTF-8");
    }
    
    public function cargarUsuarios()
    {
        $p_usuario = $this->input->get('p_usuario');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_rol = $this->input->get('p_rol');   
        $p_estado = $this->input->get('p_estado');   
        $query = $this->UsuarioModel->cargarUsuarios($p_usuario, $p_cod_emp, $p_rol, $p_estado);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarRolesAcciones() 
    {
        $p_pantalla = $this->input->get('p_pantalla');  
        $p_accion = $this->input->get('p_accion');  
        $p_rol = $this->input->get('p_rol');   
        $query = $this->UsuarioModel->cargarRolesAcciones($p_rol, $p_pantalla, $p_accion);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarRoles() 
    {
        $query = $this->UsuarioModel->cargarRoles();
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarUsuariosIntranet() {
        $p_usuario = $this->input->get('p_usuario');  
        $p_rut = $this->input->get('p_rut');   
        $query = $this->UsuarioModel->cargarUsuariosIntranet($p_usuario, $p_rut);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function crearUsuario() {
        $p_login = $this->input->get('p_login');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_rol = $this->input->get('p_rol');   
        $p_correo = $this->input->get('p_correo');   
        $p_usuario = $this->input->get('p_usuario');   
        $p_estado = $this->input->get('p_estado');   
        $query = $this->UsuarioModel->crearUsuario($p_login, $p_cod_emp, $p_rol, $p_correo, $p_usuario, $p_estado);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function modificarUsuario() {
        $p_login = $this->input->get('p_login');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_rol = $this->input->get('p_rol');   
        $p_correo = $this->input->get('p_correo');   
        $p_usuario = $this->input->get('p_usuario');   
        $p_estado = $this->input->get('p_estado');   
        $query = $this->UsuarioModel->modificarUsuario($p_login, $p_cod_emp, $p_rol, $p_correo, $p_usuario, $p_estado);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarCCUsuario() {
        $p_usuario = $this->input->get('p_usuario');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_cod_cc = $this->input->get('p_cod_cc');   
        $p_nom_cc = $this->input->get('p_nom_cc');    
        $query = $this->UsuarioModel->cargarCCUsuario($p_usuario, $p_cod_emp, $p_cod_cc, $p_nom_cc);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarCCUsuarioNo() {
        $p_usuario = $this->input->get('p_usuario');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_cod_cc = $this->input->get('p_cod_cc');   
        $p_nom_cc = $this->input->get('p_nom_cc');    
        $query = $this->UsuarioModel->cargarCCUsuarioNo($p_usuario, $p_cod_emp, $p_cod_cc, $p_nom_cc);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function crearUsuarioCC() {
        $p_login = $this->input->get('p_login');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_cod_cc = $this->input->get('p_cod_cc');   
        $p_usuario = $this->input->get('p_usuario');    
        $query = $this->UsuarioModel->crearUsuarioCC($p_login, $p_cod_emp, $p_cod_cc, $p_usuario);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function eliminarUsuarioCC() {
        $p_login = $this->input->get('p_login');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_cod_cc = $this->input->get('p_cod_cc');   
        $p_usuario = $this->input->get('p_usuario');    
        $query = $this->UsuarioModel->eliminarUsuarioCC($p_login, $p_cod_emp, $p_cod_cc, $p_usuario);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarRolesWf() {
  
        $query = $this->UsuarioModel->cargarRolesWf();
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }


    public function cargarRolesWfUsuario() {
        $p_usuario = $this->input->get('p_usuario');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_rol_wf = $this->input->get('p_rol_wf');       
        $query = $this->UsuarioModel->cargarRolesWfUsuario($p_usuario, $p_cod_emp, $p_rol_wf);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarRolesWfUsuarioNo() {
        $p_usuario = $this->input->get('p_usuario');  
        $p_cod_emp = $this->input->get('p_cod_emp');     
        $query = $this->UsuarioModel->cargarRolesWfUsuarioNo($p_usuario, $p_cod_emp);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function crearUsuarioRolWF() {
        $p_login = $this->input->get('p_login');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_rol_wf = $this->input->get('p_rol_wf');   
        $p_usuario = $this->input->get('p_usuario');    
        $query = $this->UsuarioModel->crearUsuarioRolWF($p_login, $p_cod_emp, $p_rol_wf, $p_usuario);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function eliminarUsuarioRolWF() {
        $p_login = $this->input->get('p_login');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_rol_wf = $this->input->get('p_rol_wf');   
        $p_usuario = $this->input->get('p_usuario');    
        $query = $this->UsuarioModel->eliminarUsuarioRolWF($p_login, $p_cod_emp, $p_rol_wf, $p_usuario);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

}
