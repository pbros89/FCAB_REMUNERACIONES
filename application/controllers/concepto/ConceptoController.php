<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

    
class ConceptoController extends CI_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('concepto/ConceptoModel'); //Cargamos el modelo

        $this->output
                ->set_content_type('application/json')
                ->set_header("Access-Control-Allow-Origin: *")
                ->set_header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept")
                ->set_header("Content-Type: application/json; charset=UTF-8");
    }
    
    public function cargarConceptos()
    {
        $p_cod_concepto = $this->input->get('p_cod_concepto');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_nombre = $this->input->get('p_nombre');   
        $p_grupo = $this->input->get('p_grupo'); 
        $p_tipo = $this->input->get('p_tipo');   
        $p_tipo_mes = $this->input->get('p_tipo_mes');   
        $p_estado = $this->input->get('p_estado');     
        $query = $this->ConceptoModel->cargarConceptos($p_cod_concepto, $p_cod_emp, $p_nombre, $p_grupo, $p_tipo, $p_tipo_mes, $p_estado);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarGrupoConceptos() 
    {
        $query = $this->ConceptoModel->cargarGrupoConceptos();
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarTipoConceptos() 
    {
        $query = $this->ConceptoModel->cargarTipoConceptos();
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarTipoMesConceptos() 
    {
        $query = $this->ConceptoModel->cargarTipoMesConceptos();
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function crearConcepto() {

        $p_cod_concepto = $this->input->get('p_cod_concepto');  
        $p_cod_emp = $this->input->get('p_cod_emp'); 
        $p_tipo = $this->input->get('p_tipo'); 
        $p_tipo_mes = $this->input->get('p_tipo_mes'); 
        $p_grupo = $this->input->get('p_grupo'); 
        $p_nombre = $this->input->get('p_nombre'); 
        $p_observacion = $this->input->get('p_observacion'); 
        $p_usuario = $this->input->get('p_usuario'); 
        $p_meses = $this->input->get('p_meses'); 
        $p_rango_ini = $this->input->get('p_rango_ini'); 
        $p_rango_fin = $this->input->get('p_rango_fin'); 
        $p_estado = $this->input->get('p_estado'); 
        $p_inicial = $this->input->get('p_inicial'); 

        $query = $this->ConceptoModel->crearConcepto(
            $p_cod_concepto, 
            $p_cod_emp, 
            $p_tipo, 
            $p_tipo_mes, 
            $p_grupo, 
            $p_nombre,
            $p_observacion,
            $p_usuario,
            $p_meses,
            $p_rango_ini,
            $p_rango_fin,
            $p_estado,
            $p_inicial);

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function modificarConcepto() {

        $p_cod_concepto = $this->input->get('p_cod_concepto');  
        $p_cod_emp = $this->input->get('p_cod_emp'); 
        $p_tipo = $this->input->get('p_tipo'); 
        $p_tipo_mes = $this->input->get('p_tipo_mes'); 
        $p_grupo = $this->input->get('p_grupo'); 
        $p_nombre = $this->input->get('p_nombre'); 
        $p_observacion = $this->input->get('p_observacion'); 
        $p_usuario = $this->input->get('p_usuario'); 
        $p_meses = $this->input->get('p_meses'); 
        $p_rango_ini = $this->input->get('p_rango_ini'); 
        $p_rango_fin = $this->input->get('p_rango_fin'); 
        $p_estado = $this->input->get('p_estado'); 
        $p_inicial = $this->input->get('p_inicial'); 

        $query = $this->ConceptoModel->modificarConcepto(
            $p_cod_concepto, 
            $p_cod_emp, 
            $p_tipo, 
            $p_tipo_mes, 
            $p_grupo, 
            $p_nombre,
            $p_observacion,
            $p_usuario,
            $p_meses,
            $p_rango_ini,
            $p_rango_fin,
            $p_estado,
            $p_inicial);

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarCCConcepto() {
        $p_cod_concepto = $this->input->get('p_cod_concepto');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_cod_cc = $this->input->get('p_cod_cc');   
        $p_nom_cc = $this->input->get('p_nom_cc');    
        $query = $this->ConceptoModel->cargarCCConcepto($p_cod_concepto, $p_cod_emp, $p_cod_cc, $p_nom_cc);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarCCConceptoNo() {
        $p_cod_concepto = $this->input->get('p_cod_concepto');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_cod_cc = $this->input->get('p_cod_cc');   
        $p_nom_cc = $this->input->get('p_nom_cc');    
        $query = $this->ConceptoModel->cargarCCConceptoNo($p_cod_concepto, $p_cod_emp, $p_cod_cc, $p_nom_cc);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function crearConceptoCC() {
        $p_cod_concepto = $this->input->get('p_cod_concepto');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_cod_cc = $this->input->get('p_cod_cc');   
        $p_usuario = $this->input->get('p_usuario');    
        $query = $this->ConceptoModel->crearConceptoCC($p_cod_concepto, $p_cod_emp, $p_cod_cc, $p_usuario);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function eliminarConceptoCC() {
        $p_cod_concepto = $this->input->get('p_cod_concepto');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_cod_cc = $this->input->get('p_cod_cc');   
        $p_usuario = $this->input->get('p_usuario');    
        $query = $this->ConceptoModel->eliminarConceptoCC($p_cod_concepto, $p_cod_emp, $p_cod_cc, $p_usuario);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }


    public function crearConceptoVal() {
        $p_cod_concepto = $this->input->get('p_cod_concepto');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_valor = $this->input->get('p_valor');   
        $p_usuario = $this->input->get('p_usuario');    
        $query = $this->ConceptoModel->crearConceptoVal($p_cod_concepto, $p_cod_emp, $p_valor, $p_usuario);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function eliminarConceptoVal() {
        $p_cod_concepto = $this->input->get('p_cod_concepto');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_index = $this->input->get('p_index');   
        $p_usuario = $this->input->get('p_usuario');    
        $query = $this->ConceptoModel->eliminarConceptoVal($p_cod_concepto, $p_cod_emp, $p_index, $p_usuario);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarConceptoVal() {
        $p_cod_concepto = $this->input->get('p_cod_concepto');  
        $p_cod_emp = $this->input->get('p_cod_emp');   
        $query = $this->ConceptoModel->cargarConceptoVal($p_cod_concepto, $p_cod_emp);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }




}
