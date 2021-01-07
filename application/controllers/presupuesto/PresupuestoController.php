<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class PresupuestoController extends CI_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('presupuesto/PresupuestoModel'); //Cargamos el modelo
    }
    
    public function cargarPresupuestos()
    {
        $p_anho = $this->input->get('p_anho');  
        $p_tipo = $this->input->get('p_tipo'); 
        $p_cod_emp = $this->input->get('p_cod_emp'); 
        $p_estado = $this->input->get('p_estado');  
        $query = $this->PresupuestoModel->cargarPresupuestos($p_anho, $p_cod_emp, $p_estado, $p_tipo);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function crearPresupuesto()
    {
        $p_anho = $this->input->get('p_anho');  
        $p_tipo = $this->input->get('p_tipo');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_inicio = $this->input->get('p_inicio');  
        $p_termino = $this->input->get('p_termino');  
        $p_observacion = $this->input->get('p_observacion');  
        $p_usuario = $this->input->get('p_usuario');  
        $query = $this->PresupuestoModel->crearPresupuesto($p_anho, $p_tipo, $p_cod_emp, $p_inicio, $p_termino, $p_observacion, $p_usuario);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function modificarPresupuesto() 
    {
        $p_anho = $this->input->get('p_anho');  
        $p_tipo = $this->input->get('p_tipo');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_inicio = $this->input->get('p_inicio');  
        $p_termino = $this->input->get('p_termino');  
        $p_observacion = $this->input->get('p_observacion');  
        $p_usuario = $this->input->get('p_usuario');  
        $query = $this->PresupuestoModel->modificarPresupuesto($p_anho, $p_tipo, $p_cod_emp, $p_inicio, $p_termino, $p_observacion, $p_usuario);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarDetallePresup()
    {
        $p_anho = $this->input->get('p_anho');  
        $p_tipo = $this->input->get('p_tipo'); 
        $p_cod_emp = $this->input->get('p_cod_emp'); 
        $p_estado = $this->input->get('p_estado'); 
        $p_rol = $this->input->get('p_rol');   
        $p_usuario = $this->input->get('p_usuario'); 
        $query = $this->PresupuestoModel->cargarDetallePresup($p_anho, $p_cod_emp, $p_estado, $p_tipo, $p_rol, $p_usuario);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarCCPresup() 
    {
        $p_anho = $this->input->get('p_anho');  
        $p_tipo = $this->input->get('p_tipo');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_cod_cc = $this->input->get('p_cod_cc');  
        $p_nom_cc = $this->input->get('p_nom_cc');  
        $query = $this->PresupuestoModel->cargarCCPresup($p_anho, $p_cod_emp, $p_tipo, $p_cod_cc, $p_nom_cc);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarCCPresupNo() 
    {
        $p_anho = $this->input->get('p_anho');  
        $p_tipo = $this->input->get('p_tipo');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_cod_cc = $this->input->get('p_cod_cc');  
        $p_nom_cc = $this->input->get('p_nom_cc');  
        $query = $this->PresupuestoModel->cargarCCPresupNo($p_anho, $p_cod_emp, $p_tipo, $p_cod_cc, $p_nom_cc);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarCCPresupPorUsuario(){

        $p_usuario = $this->input->get('p_usuario');  
        $p_rol = $this->input->get('p_rol');  
        $p_cod_emp = $this->input->get('p_cod_emp');  

        $query = $this->PresupuestoModel->cargarCCPresupPorUsuario($p_usuario, $p_rol, $p_cod_emp);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarDotacionesPresup() 
    {
        $p_anho = $this->input->get('p_anho');  
        $p_tipo = $this->input->get('p_tipo');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_cod_cc = $this->input->get('p_cod_cc');  

        $query = $this->PresupuestoModel->cargarDotacionesPresup($p_anho, $p_cod_emp, $p_tipo, $p_cod_cc);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function crearPresupuestoCC()
    {
        $p_anho = $this->input->get('p_anho');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_tipo = $this->input->get('p_tipo');  
        $p_cod_cc = $this->input->get('p_cod_cc');  
        $p_usuario = $this->input->get('p_usuario');  
        $query = $this->PresupuestoModel->crearPresupuestoCC($p_anho, $p_tipo, $p_cod_emp, $p_cod_cc, $p_usuario);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }


    public function modificarEstadoPresupuestoCC()
    {
        $p_anho = $this->input->get('p_anho');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_tipo = $this->input->get('p_tipo');  
        $p_cod_cc = $this->input->get('p_cod_cc');  
        $p_estado = $this->input->get('p_estado');  
        $p_usuario = $this->input->get('p_usuario');  
        $query = $this->PresupuestoModel->modificarEstadoPresupuestoCC($p_anho, $p_tipo, $p_cod_emp, $p_cod_cc, $p_estado, $p_usuario);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);

    }


    public function modificarEstadoPresupuesto()
    {
        $p_anho = $this->input->get('p_anho');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_tipo = $this->input->get('p_tipo');  
        $p_estado = $this->input->get('p_estado');  
        $p_usuario = $this->input->get('p_usuario');  
        $query = $this->PresupuestoModel->modificarEstadoPresupuesto($p_anho, $p_tipo, $p_cod_emp, $p_estado, $p_usuario);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);

    }

    
    public function borrarPresupuesto(){
        $p_anho = $this->input->get('p_anho');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_tipo = $this->input->get('p_tipo');   
        $p_usuario = $this->input->get('p_usuario');   
        $query = $this->PresupuestoModel->borrarPresupuesto($p_anho, $p_tipo, $p_cod_emp, $p_usuario);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function terminarAllCC(){
        $p_anho = $this->input->get('p_anho');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_tipo = $this->input->get('p_tipo');   
        $p_usuario = $this->input->get('p_usuario');  
        $query = $this->PresupuestoModel->terminarAllCC($p_anho, $p_tipo, $p_cod_emp, $p_usuario);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    
    public function cargarCCProcesoMensualPorUsuarioEstado(){

        $p_usuario = $this->input->get('p_usuario');  
        $p_rol = $this->input->get('p_rol');  
        $p_cod_emp = $this->input->get('p_cod_emp'); 
        $p_estado = $this->input->get('p_estado');   
        $query = $this->ProcesoMensualModel->cargarCCProcesoMensualPorUsuarioEstado($p_usuario, $p_rol, $p_cod_emp, $p_estado);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarPersonasProcesoMensualPorUsuarioEstado(){

        $p_usuario = $this->input->get('p_usuario');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_rol = $this->input->get('p_rol');  
        $p_estado = $this->input->get('p_estado');  
        $query = $this->ProcesoMensualModel->cargarPersonasProcesoMensualPorUsuarioEstado($p_usuario, $p_rol, $p_cod_emp, $p_estado);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }


    public function crearPresupDotacion(){
        $p_anho = $this->input->get('p_anho');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_tipo = $this->input->get('p_tipo');   
        $p_cod_cc = $this->input->get('p_cod_cc');   
        $p_cod_cargo = $this->input->get('p_cod_cargo');   
        $p_nom_cargo = $this->input->get('p_nom_cargo'); 
        $p_rol = $this->input->get('p_rol');    
        $p_dotacion = $this->input->get('p_dotacion');   
        $p_observacion = $this->input->get('p_observacion');   
        $p_usuario = $this->input->get('p_usuario');   
        $p_ene = $this->input->get('p_ene'); 
        $p_feb = $this->input->get('p_feb'); 
        $p_mar = $this->input->get('p_mar'); 
        $p_abr = $this->input->get('p_abr'); 
        $p_may = $this->input->get('p_may'); 
        $p_jun = $this->input->get('p_jun'); 
        $p_jul = $this->input->get('p_jul'); 
        $p_ago = $this->input->get('p_ago'); 
        $p_sep = $this->input->get('p_sep'); 
        $p_oct = $this->input->get('p_oct'); 
        $p_nov = $this->input->get('p_nov'); 
        $p_dic = $this->input->get('p_dic'); 

        $query = $this->PresupuestoModel->crearPresupDotacion(
            $p_anho, 
            $p_tipo, 
            $p_cod_emp, 
            $p_cod_cc, 
            $p_cod_cargo, 
            $p_nom_cargo,
            $p_rol,
            $p_dotacion,
            $p_ene,
            $p_feb,
            $p_mar,
            $p_abr,
            $p_may,
            $p_jun,
            $p_jul,
            $p_ago,
            $p_sep,
            $p_oct,
            $p_nov,
            $p_dic,
            $p_observacion,
            $p_usuario
        );
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function modificarPresupDotacion(){
        $p_anho = $this->input->get('p_anho');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_tipo = $this->input->get('p_tipo');   
        $p_cod_cc = $this->input->get('p_cod_cc');   
        $p_cod_cargo = $this->input->get('p_cod_cargo');    
        $p_dotacion = $this->input->get('p_dotacion');   
        $p_observacion = $this->input->get('p_observacion');   
        $p_usuario = $this->input->get('p_usuario');  
        $p_ene = $this->input->get('p_ene'); 
        $p_feb = $this->input->get('p_feb'); 
        $p_mar = $this->input->get('p_mar'); 
        $p_abr = $this->input->get('p_abr'); 
        $p_may = $this->input->get('p_may'); 
        $p_jun = $this->input->get('p_jun'); 
        $p_jul = $this->input->get('p_jul'); 
        $p_ago = $this->input->get('p_ago'); 
        $p_sep = $this->input->get('p_sep'); 
        $p_oct = $this->input->get('p_oct'); 
        $p_nov = $this->input->get('p_nov'); 
        $p_dic = $this->input->get('p_dic');  

        $query = $this->PresupuestoModel->modificarPresupDotacion(
            $p_anho, 
            $p_tipo, 
            $p_cod_emp, 
            $p_cod_cc, 
            $p_cod_cargo, 
            $p_dotacion,
            $p_ene,
            $p_feb,
            $p_mar,
            $p_abr,
            $p_may,
            $p_jun,
            $p_jul,
            $p_ago,
            $p_sep,
            $p_oct,
            $p_nov,
            $p_dic,
            $p_observacion,
            $p_usuario
        );
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }


    public function eliminarPresupDotacion(){
        $p_anho = $this->input->get('p_anho');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_tipo = $this->input->get('p_tipo');   
        $p_cod_cc = $this->input->get('p_cod_cc');   
        $p_cod_cargo = $this->input->get('p_cod_cargo');   
        $p_usuario = $this->input->get('p_usuario');   

        $query = $this->PresupuestoModel->eliminarPresupDotacion(
            $p_anho, 
            $p_tipo, 
            $p_cod_emp, 
            $p_cod_cc, 
            $p_cod_cargo, 
            $p_usuario
        );
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }
}
