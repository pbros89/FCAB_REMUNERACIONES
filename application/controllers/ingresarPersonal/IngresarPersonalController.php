<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class IngresarPersonalController extends CI_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('ingresarPersonal/IngresarPersonalModel'); //Cargamos el modelo

        $this->output
                ->set_content_type('application/json')
                ->set_header("Access-Control-Allow-Origin: *")
                ->set_header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept")
                ->set_header("Content-Type: application/json; charset=UTF-8");
    }
    
    public function cargarIngresarPersonal() 
    {
        $p_rut = $this->input->get('p_rut');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_fec1 = $this->input->get('p_fec1'); 
        $p_fec2 = $this->input->get('p_fec2');  
        $query = $this->IngresarPersonalModel->cargarIngresarPersonal($p_cod_emp, $p_rut, $p_fec1, $p_fec2);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }


    public function crearIngresarPersonal() 
    {
        $P_RUT = $this->input->get('P_RUT');  
        $P_DV = $this->input->get('P_DV');  
        $P_NOMBRES = $this->input->get('P_NOMBRES'); 
        $P_APE_PAT = $this->input->get('P_APE_PAT');  
        $P_APE_MAT = $this->input->get('P_APE_MAT');  
        $P_FECHA_INGRESO = $this->input->get('P_FECHA_INGRESO');  
        $P_FECHA_NACIMIENTO = $this->input->get('P_FECHA_NACIMIENTO');  
        $P_SEXO = $this->input->get('P_SEXO');  
        $P_NACIONALIDAD = $this->input->get('P_NACIONALIDAD');  
        $P_ESTADO_CIVIL = $this->input->get('P_ESTADO_CIVIL');  
        $P_NIVEL_EDUCACION = $this->input->get('P_NIVEL_EDUCACION');  
        $P_CALLE = $this->input->get('P_CALLE'); 
        $P_NUMERO = $this->input->get('P_NUMERO');  
        $P_DEPARTAMENTO = $this->input->get('P_DEPARTAMENTO');  
        $P_COMUNA = $this->input->get('P_COMUNA');  
        $P_CIUDAD = $this->input->get('P_CIUDAD');  
        $P_TELEFONO = $this->input->get('P_TELEFONO');  
        $P_CELULAR = $this->input->get('P_CELULAR');  
        $P_CORREO = $this->input->get('P_CORREO');  
        $P_COD_CC = $this->input->get('P_COD_CC'); 
        $P_NOM_CC = $this->input->get('P_NOM_CC');  
        $P_FECHA_VENCIMIENTO = $this->input->get('P_FECHA_VENCIMIENTO');  
        $P_COD_CARGO = $this->input->get('P_COD_CARGO');  
        $P_NOM_CARGO = $this->input->get('P_NOM_CARGO');  
        $P_INE = $this->input->get('P_INE');   
        $P_TIPO_CONTRATO = $this->input->get('P_TIPO_CONTRATO'); 
        $P_ROL_CARGO = $this->input->get('P_ROL_CARGO');  
        $P_SUELDO_BASE = $this->input->get('P_SUELDO_BASE');  
        $P_RENTA_CONTRATO = $this->input->get('P_RENTA_CONTRATO');  
        $P_AFP = $this->input->get('P_AFP');  
        $P_SALUD = $this->input->get('P_SALUD');  
        $P_PLAN_SALUD = $this->input->get('P_PLAN_SALUD');  
        $P_FORMATO_PLAN_SALUD = $this->input->get('P_FORMATO_PLAN_SALUD');  
        $P_PLAN_COLECTIVO_SALUD = $this->input->get('P_PLAN_COLECTIVO_SALUD');  
        $P_FORMATO_PLAN_COLECTIVO_SALUD = $this->input->get('P_FORMATO_PLAN_COLECTIVO_SALUD');  
        $P_MONTO_APV = $this->input->get('P_MONTO_APV');  
        $P_INSTITUCION_APV = $this->input->get('P_INSTITUCION_APV');  
        $P_REGIMEN_APV = $this->input->get('P_REGIMEN_APV');  
        $P_FORMA_PAGO = $this->input->get('P_FORMA_PAGO');  
        $P_BANCO = $this->input->get('P_BANCO');  
        $P_CUENTA = $this->input->get('P_CUENTA');  
        $P_JORNADA = $this->input->get('P_JORNADA');  
        $P_COD_AFP = $this->input->get('P_COD_AFP');  
        $P_COD_SALUD = $this->input->get('P_COD_SALUD');  
        $P_COD_BANCO = $this->input->get('P_COD_BANCO');  
        $P_COD_ESTADO_CIVIL = $this->input->get('P_COD_ESTADO_CIVIL');  
        $P_COD_JORNADA = $this->input->get('P_COD_JORNADA');  
        $P_USUARIO = $this->input->get('P_USUARIO');  
        $P_COD_EMP = $this->input->get('P_COD_EMP');  
        $P_NOM_EMP = $this->input->get('P_NOM_EMP');  
        $P_ESTADO = $this->input->get('P_ESTADO');  
        $P_COD_INE = $this->input->get('P_COD_INE');  
        $P_COD_SEXO = $this->input->get('P_COD_SEXO');  
        $P_COD_INSTITUCION_APV = $this->input->get('P_COD_INSTITUCION_APV');  
        $P_COD_REGIMEN_APV = $this->input->get('P_COD_REGIMEN_APV');  
        $P_COD_FORMA_PAGO = $this->input->get('P_COD_FORMA_PAGO');  
        $P_COD_NIVEL_EDUCACION = $this->input->get('P_COD_NIVEL_EDUCACION');  

        $P_FORMATO_MONTO_APV = $this->input->get('P_FORMATO_MONTO_APV');  
        $P_MONTO_GES = $this->input->get('P_MONTO_GES');  
        $P_FORMATO_GES = $this->input->get('P_FORMATO_GES');  
        $P_MONTO_ADI_TRA = $this->input->get('P_MONTO_ADI_TRA');  
        $P_FORMATO_ADI_TRA = $this->input->get('P_FORMATO_ADI_TRA');  
        $P_MONTO_ADI_EMP = $this->input->get('P_MONTO_ADI_EMP');  
        $P_FORMATO_ADI_EMP = $this->input->get('P_FORMATO_ADI_EMP');  
        $P_COD_TIPO_CONTRATO = $this->input->get('P_COD_TIPO_CONTRATO');  
        $P_PERIODO = $this->input->get('P_PERIODO');  
        $P_CORREO_EMP = $this->input->get('P_CORREO_EMP');  
        $P_COD_LUGAR_TRABAJO = $this->input->get('P_COD_LUGAR_TRABAJO');  
        $P_NOM_LUGAR_TRABAJO = $this->input->get('P_NOM_LUGAR_TRABAJO');  

        $query = $this->IngresarPersonalModel->crearIngresarPersonal( 
              $P_RUT  
            , $P_DV  
            , $P_NOMBRES 
            , $P_APE_PAT  
            , $P_APE_MAT  
            , $P_FECHA_INGRESO  
            , $P_FECHA_NACIMIENTO  
            , $P_SEXO  
            , $P_NACIONALIDAD  
            , $P_ESTADO_CIVIL  
            , $P_NIVEL_EDUCACION  
            , $P_CALLE  
            , $P_NUMERO  
            , $P_DEPARTAMENTO  
            , $P_COMUNA  
            , $P_CIUDAD  
            , $P_TELEFONO  
            , $P_CELULAR  
            , $P_CORREO  
            , $P_COD_CC  
            , $P_NOM_CC  
            , $P_FECHA_VENCIMIENTO  
            , $P_COD_CARGO  
            , $P_NOM_CARGO  
            , $P_INE  
            , $P_TIPO_CONTRATO 
            , $P_ROL_CARGO 
            , $P_SUELDO_BASE 
            , $P_RENTA_CONTRATO 
            , $P_AFP 
            , $P_SALUD 
            , $P_PLAN_SALUD 
            , $P_FORMATO_PLAN_SALUD 
            , $P_PLAN_COLECTIVO_SALUD 
            , $P_FORMATO_PLAN_COLECTIVO_SALUD 
            , $P_MONTO_APV 
            , $P_INSTITUCION_APV 
            , $P_REGIMEN_APV 
            , $P_FORMA_PAGO 
            , $P_BANCO 
            , $P_CUENTA 
            , $P_JORNADA 
            , $P_COD_AFP 
            , $P_COD_SALUD 
            , $P_COD_BANCO 
            , $P_COD_ESTADO_CIVIL 
            , $P_COD_JORNADA 
            , $P_COD_EMP 
            , $P_NOM_EMP 
            , $P_USUARIO  
            , $P_ESTADO
            , $P_COD_INE
            , $P_COD_SEXO
            , $P_COD_INSTITUCION_APV
            , $P_COD_REGIMEN_APV
            , $P_COD_FORMA_PAGO
            , $P_COD_NIVEL_EDUCACION
            , $P_FORMATO_MONTO_APV
            , $P_MONTO_GES
            , $P_FORMATO_GES
            , $P_MONTO_ADI_TRA
            , $P_FORMATO_ADI_TRA
            , $P_MONTO_ADI_EMP
            , $P_FORMATO_ADI_EMP
            , $P_COD_TIPO_CONTRATO 
            , $P_PERIODO
            , $P_CORREO_EMP
            , $P_COD_LUGAR_TRABAJO
            , $P_NOM_LUGAR_TRABAJO
        );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }
    

    public function modificarIngresarPersonal() 
    {
        $P_RUT = $this->input->get('P_RUT');  
        $P_DV = $this->input->get('P_DV');  
        $P_NOMBRES = $this->input->get('P_NOMBRES'); 
        $P_APE_PAT = $this->input->get('P_APE_PAT');  
        $P_APE_MAT = $this->input->get('P_APE_MAT');  
        $P_FECHA_INGRESO = $this->input->get('P_FECHA_INGRESO');  
        $P_FECHA_NACIMIENTO = $this->input->get('P_FECHA_NACIMIENTO');  
        $P_SEXO = $this->input->get('P_SEXO');  
        $P_NACIONALIDAD = $this->input->get('P_NACIONALIDAD');  
        $P_ESTADO_CIVIL = $this->input->get('P_ESTADO_CIVIL');  
        $P_NIVEL_EDUCACION = $this->input->get('P_NIVEL_EDUCACION');  
        $P_CALLE = $this->input->get('P_CALLE'); 
        $P_NUMERO = $this->input->get('P_NUMERO');  
        $P_DEPARTAMENTO = $this->input->get('P_DEPARTAMENTO');  
        $P_COMUNA = $this->input->get('P_COMUNA');  
        $P_CIUDAD = $this->input->get('P_CIUDAD');  
        $P_TELEFONO = $this->input->get('P_TELEFONO');  
        $P_CELULAR = $this->input->get('P_CELULAR');  
        $P_CORREO = $this->input->get('P_CORREO');  
        $P_COD_CC = $this->input->get('P_COD_CC'); 
        $P_NOM_CC = $this->input->get('P_NOM_CC');  
        $P_FECHA_VENCIMIENTO = $this->input->get('P_FECHA_VENCIMIENTO');  
        $P_COD_CARGO = $this->input->get('P_COD_CARGO');  
        $P_NOM_CARGO = $this->input->get('P_NOM_CARGO');  
        $P_INE = $this->input->get('P_INE');  
        $P_TIPO_CONTRATO = $this->input->get('P_TIPO_CONTRATO'); 
        $P_ROL_CARGO = $this->input->get('P_ROL_CARGO');  
        $P_SUELDO_BASE = $this->input->get('P_SUELDO_BASE');  
        $P_RENTA_CONTRATO = $this->input->get('P_RENTA_CONTRATO');  
        $P_AFP = $this->input->get('P_AFP');  
        $P_SALUD = $this->input->get('P_SALUD');  
        $P_PLAN_SALUD = $this->input->get('P_PLAN_SALUD');  
        $P_FORMATO_PLAN_SALUD = $this->input->get('P_FORMATO_PLAN_SALUD');  
        $P_PLAN_COLECTIVO_SALUD = $this->input->get('P_PLAN_COLECTIVO_SALUD');  
        $P_FORMATO_PLAN_COLECTIVO_SALUD = $this->input->get('P_FORMATO_PLAN_COLECTIVO_SALUD');  
        $P_MONTO_APV = $this->input->get('P_MONTO_APV');  
        $P_INSTITUCION_APV = $this->input->get('P_INSTITUCION_APV');  
        $P_REGIMEN_APV = $this->input->get('P_REGIMEN_APV');  
        $P_FORMA_PAGO = $this->input->get('P_FORMA_PAGO');  
        $P_BANCO = $this->input->get('P_BANCO');  
        $P_CUENTA = $this->input->get('P_CUENTA');  
        $P_JORNADA = $this->input->get('P_JORNADA');  
        $P_COD_AFP = $this->input->get('P_COD_AFP');  
        $P_COD_SALUD = $this->input->get('P_COD_SALUD');  
        $P_COD_BANCO = $this->input->get('P_COD_BANCO');  
        $P_COD_ESTADO_CIVIL = $this->input->get('P_COD_ESTADO_CIVIL');  
        $P_COD_JORNADA = $this->input->get('P_COD_JORNADA');  
        $P_USUARIO = $this->input->get('P_USUARIO');  
        $P_COD_EMP = $this->input->get('P_COD_EMP');  
        $P_NOM_EMP = $this->input->get('P_NOM_EMP');  
        $P_ESTADO = $this->input->get('P_ESTADO');  
        $P_COD_INE = $this->input->get('P_COD_INE');  
        $P_COD_SEXO = $this->input->get('P_COD_SEXO');  
        $P_COD_INSTITUCION_APV = $this->input->get('P_COD_INSTITUCION_APV');  
        $P_COD_REGIMEN_APV = $this->input->get('P_COD_REGIMEN_APV');  
        $P_COD_FORMA_PAGO = $this->input->get('P_COD_FORMA_PAGO');  
        $P_COD_NIVEL_EDUCACION = $this->input->get('P_COD_NIVEL_EDUCACION');  

        $P_FORMATO_MONTO_APV = $this->input->get('P_FORMATO_MONTO_APV');  
        $P_MONTO_GES = $this->input->get('P_MONTO_GES');  
        $P_FORMATO_GES = $this->input->get('P_FORMATO_GES');  
        $P_MONTO_ADI_TRA = $this->input->get('P_MONTO_ADI_TRA');  
        $P_FORMATO_ADI_TRA = $this->input->get('P_FORMATO_ADI_TRA');  
        $P_MONTO_ADI_EMP = $this->input->get('P_MONTO_ADI_EMP');  
        $P_FORMATO_ADI_EMP = $this->input->get('P_FORMATO_ADI_EMP');  
        $P_COD_TIPO_CONTRATO = $this->input->get('P_COD_TIPO_CONTRATO');  
        $P_PK_ID = $this->input->get('P_PK_ID');  

        $P_PERIODO = $this->input->get('P_PERIODO');  

        $P_CORREO_EMP = $this->input->get('P_CORREO_EMP');  
        $P_COD_LUGAR_TRABAJO = $this->input->get('P_COD_LUGAR_TRABAJO');  
        $P_NOM_LUGAR_TRABAJO = $this->input->get('P_NOM_LUGAR_TRABAJO');  



        $query = $this->IngresarPersonalModel->modificarIngresarPersonal( 
              $P_RUT  
            , $P_DV  
            , $P_NOMBRES 
            , $P_APE_PAT  
            , $P_APE_MAT  
            , $P_FECHA_INGRESO  
            , $P_FECHA_NACIMIENTO  
            , $P_SEXO  
            , $P_NACIONALIDAD  
            , $P_ESTADO_CIVIL  
            , $P_NIVEL_EDUCACION  
            , $P_CALLE  
            , $P_NUMERO  
            , $P_DEPARTAMENTO  
            , $P_COMUNA  
            , $P_CIUDAD  
            , $P_TELEFONO  
            , $P_CELULAR  
            , $P_CORREO  
            , $P_COD_CC  
            , $P_NOM_CC  
            , $P_FECHA_VENCIMIENTO  
            , $P_COD_CARGO  
            , $P_NOM_CARGO  
            , $P_INE  
            , $P_TIPO_CONTRATO 
            , $P_ROL_CARGO 
            , $P_SUELDO_BASE 
            , $P_RENTA_CONTRATO 
            , $P_AFP 
            , $P_SALUD 
            , $P_PLAN_SALUD 
            , $P_FORMATO_PLAN_SALUD 
            , $P_PLAN_COLECTIVO_SALUD 
            , $P_FORMATO_PLAN_COLECTIVO_SALUD 
            , $P_MONTO_APV 
            , $P_INSTITUCION_APV 
            , $P_REGIMEN_APV 
            , $P_FORMA_PAGO 
            , $P_BANCO 
            , $P_CUENTA 
            , $P_JORNADA 
            , $P_COD_AFP 
            , $P_COD_SALUD 
            , $P_COD_BANCO 
            , $P_COD_ESTADO_CIVIL 
            , $P_COD_JORNADA 
            , $P_COD_EMP 
            , $P_NOM_EMP 
            , $P_USUARIO  
            , $P_ESTADO
            , $P_COD_INE
            , $P_COD_SEXO
            , $P_COD_INSTITUCION_APV
            , $P_COD_REGIMEN_APV
            , $P_COD_FORMA_PAGO
            , $P_COD_NIVEL_EDUCACION
            , $P_FORMATO_MONTO_APV
            , $P_MONTO_GES
            , $P_FORMATO_GES
            , $P_MONTO_ADI_TRA
            , $P_FORMATO_ADI_TRA
            , $P_MONTO_ADI_EMP
            , $P_FORMATO_ADI_EMP
            , $P_COD_TIPO_CONTRATO 
            , $P_PK_ID 
            , $P_PERIODO
            , $P_CORREO_EMP
            , $P_COD_LUGAR_TRABAJO
            , $P_NOM_LUGAR_TRABAJO
        );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarConceptosIngresoPersonal()
    {
        $p_ingreso = $this->input->get('p_ingreso');  

        $query = $this->IngresarPersonalModel->cargarConceptosIngresoPersonal($p_ingreso);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function modificarIngresoPersonalConcepto()
    {
        $p_ingreso = $this->input->get('p_ingreso');  
        $p_cod_concepto = $this->input->get('p_cod_concepto');  
        $p_usuario = $this->input->get('p_usuario');  
        $p_valor = $this->input->get('p_valor');  

        $query = $this->IngresarPersonalModel->modificarIngresoPersonalConcepto($p_ingreso, $p_cod_concepto, $p_usuario, $p_valor);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }


    public function cambiarEstadoIngresoPersonal()
    {
        $p_ingreso = $this->input->get('p_ingreso');  
        $p_usuario = $this->input->get('p_usuario');  
        $p_estado = $this->input->get('p_estado');  

        $query = $this->IngresarPersonalModel->cambiarEstadoIngresoPersonal($p_ingreso, $p_estado, $p_usuario);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function eliminarIngresoPersonal()
    {
        $p_ingreso = $this->input->get('p_ingreso');  
        $p_usuario = $this->input->get('p_usuario');  

        $query = $this->IngresarPersonalModel->eliminarIngresoPersonal($p_ingreso, $p_usuario);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function anularIngresoPersonal()
    {
        $p_cod = $this->input->get('p_cod');
        $p_usuario = $this->input->get('p_usuario');
        $p_obs = $this->input->get('p_obs');


        $query = $this->IngresarPersonalModel->anularIngresoPersonal(
            $p_cod,
            $p_usuario,
            $p_obs
        );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }
}
