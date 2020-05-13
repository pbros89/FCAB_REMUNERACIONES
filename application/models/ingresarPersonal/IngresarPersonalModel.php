<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class IngresarPersonalModel extends CI_Model
{

    public function __construct()
    {
        parent::__construct();
        $this->load->database("BD_NOVEDADES");
    }

    public function cargarIngresarPersonal($p_cod_emp, $p_rut, $p_fec1, $p_fec2)
    {
        $sql = "SELECT 
                    PK_ID,
                    RUT,
                    DV,
                    NOMBRES,
                    APE_PAT,
                    APE_MAT,
                    TO_CHAR(FECHA_INGRESO, 'YYYY/MM/DD') FECHA_INGRESO,
                    TO_CHAR(FECHA_NACIMIENTO, 'YYYY/MM/DD') FECHA_NACIMIENTO,
                    SEXO,
                    NACIONALIDAD,
                    ESTADO_CIVIL,
                    NIVEL_EDUCACION,
                    CALLE,
                    NUMERO,
                    DEPARTAMENTO,
                    COMUNA,
                    CIUDAD,
                    TELEFONO,
                    CELULAR,
                    CORREO,
                    COD_CC,
                    NOM_CC,
                    TO_CHAR(FECHA_VENCIMIENTO, 'YYYY/MM/DD') FECHA_VENCIMIENTO,
                    COD_CARGO,
                    NOM_CARGO,
                    INE,
                    RUT_JEFE,
                    DV_JEFE,
                    TIPO_CONTRATO,
                    ROL_CARGO,
                    SUELDO_BASE,
                    RENTA_CONTRATO,
                    AFP,
                    SALUD,
                    PLAN_SALUD,
                    FORMATO_PLAN_SALUD,
                    PLAN_COLECTIVO_SALUD,
                    FORMATO_PLAN_COLECTIVO_SALUD,
                    MONTO_APV,
                    INSTITUCION_APV,
                    REGIMEN_APV,
                    FORMA_PAGO,
                    BANCO,
                    CUENTA,
                    JORNADA,
                    USR_CREADOR,
                    USR_MODIFICO,
                    ESTADO,
                    COD_EMP,
                    NOM_EMP,
                    COD_AFP,
                    COD_SALUD,
                    COD_BANCO,
                    COD_ESTADO_CIVIL,
                    COD_JORNADA,
                    COD_INE,
                    COD_SEXO,
                    COD_INSTITUCION_APV,
                    COD_REGIMEN_APV,
                    COD_FORMA_PAGO,
                    COD_NIVEL_EDUCACION,
                    TO_CHAR(FECHA_CREACION, 'YYYY/MM/DD') FECHA_CREACION,
                    TO_CHAR(FECHA_MODIFICO, 'YYYY/MM/DD') FECHA_MODIFICO,
                    FORMATO_MONTO_APV,
                    MONTO_GES,
                    FORMATO_GES,
                    MONTO_ADI_TRA,
                    FORMATO_ADI_TRA,
                    MONTO_ADI_EMP,
                    FORMATO_ADI_EMP,
                    COD_TIPO_CONTRATO,
                    PERIODO
                FROM NOV_INGRESAR_PERSONAL PER 
                WHERE 1 = 1 ";

        if (!empty($p_cod_emp)) {
            $sql .= "AND PER.COD_EMP = '$p_cod_emp' ";
        }

        if (!empty($p_rut)) {
            $sql .= "AND PER.RUT LIKE('%$p_rut%') ";
        }

        if (!empty($p_fec1) && !empty($p_fec2)) {
            $sql .= "AND FECHA_INGRESO BETWEEN TO_DATE('$p_fec1', 'YYYY/MM/DD') ";
            $sql .= "AND TO_DATE('$p_fec2', 'YYYY/MM/DD') ";
        } elseif (!empty($p_fec1)) {
            $sql .= "AND TO_CHAR(FECHA_INGRESO, 'YYYY/MM/DD') = '$p_fec1' ";
        }else{
            $sql .= "AND TRUNC(FECHA_CREACION, 'MM') = TRUNC(SYSDATE, 'MM') ";
        }

        $sql .= "ORDER BY PK_ID DESC";


        $query = $this->db->query($sql);
        return $query->result();
    }

    public function crearIngresarPersonal(
        $P_RUT,
        $P_DV,
        $P_NOMBRES,
        $P_APE_PAT,
        $P_APE_MAT,
        $P_FECHA_INGRESO,
        $P_FECHA_NACIMIENTO,
        $P_SEXO,
        $P_NACIONALIDAD,
        $P_ESTADO_CIVIL,
        $P_NIVEL_EDUCACION,
        $P_CALLE,
        $P_NUMERO,
        $P_DEPARTAMENTO,
        $P_COMUNA,
        $P_CIUDAD,
        $P_TELEFONO,
        $P_CELULAR,
        $P_CORREO,
        $P_COD_CC,
        $P_NOM_CC,
        $P_FECHA_VENCIMIENTO,
        $P_COD_CARGO,
        $P_NOM_CARGO,
        $P_INE,
        $P_RUT_JEFE,
        $P_DV_JEFE,
        $P_TIPO_CONTRATO,
        $P_ROL_CARGO,
        $P_SUELDO_BASE,
        $P_RENTA_CONTRATO,
        $P_AFP,
        $P_SALUD,
        $P_PLAN_SALUD,
        $P_FORMATO_PLAN_SALUD,
        $P_PLAN_COLECTIVO_SALUD,
        $P_FORMATO_PLAN_COLECTIVO_SALUD,
        $P_MONTO_APV,
        $P_INSTITUCION_APV,
        $P_REGIMEN_APV,
        $P_FORMA_PAGO,
        $P_BANCO,
        $P_CUENTA,
        $P_JORNADA,
        $P_COD_AFP,
        $P_COD_SALUD,
        $P_COD_BANCO,
        $P_COD_ESTADO_CIVIL,
        $P_COD_JORNADA,
        $P_COD_EMP,
        $P_NOM_EMP,
        $P_USUARIO,
        $P_ESTADO,
        $P_COD_INE,
        $P_COD_SEXO,
        $P_COD_INSTITUCION_APV,
        $P_COD_REGIMEN_APV,
        $P_COD_FORMA_PAGO,
        $P_COD_NIVEL_EDUCACION,
        $P_FORMATO_MONTO_APV,
        $P_MONTO_GES,
        $P_FORMATO_GES,
        $P_MONTO_ADI_TRA,
        $P_FORMATO_ADI_TRA,
        $P_MONTO_ADI_EMP,
        $P_FORMATO_ADI_EMP,
        $P_COD_TIPO_CONTRATO,
        $P_PERIODO
    ) {


        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
            $this->db->conn_id,
            "BEGIN NOV_INS_INGRESAR_PERSONAL(
                          :P_RUT  
                        , :P_DV  
                        , :P_NOMBRES 
                        , :P_APE_PAT  
                        , :P_APE_MAT  
                        , :P_FECHA_INGRESO  
                        , :P_FECHA_NACIMIENTO  
                        , :P_SEXO  
                        , :P_NACIONALIDAD  
                        , :P_ESTADO_CIVIL  
                        , :P_NIVEL_EDUCACION  
                        , :P_CALLE  
                        , :P_NUMERO  
                        , :P_DEPARTAMENTO  
                        , :P_COMUNA  
                        , :P_CIUDAD  
                        , :P_TELEFONO  
                        , :P_CELULAR  
                        , :P_CORREO  
                        , :P_COD_CC  
                        , :P_NOM_CC  
                        , :P_FECHA_VENCIMIENTO  
                        , :P_COD_CARGO  
                        , :P_NOM_CARGO  
                        , :P_INE  
                        , :P_RUT_JEFE 
                        , :P_DV_JEFE 
                        , :P_TIPO_CONTRATO 
                        , :P_ROL_CARGO 
                        , :P_SUELDO_BASE 
                        , :P_RENTA_CONTRATO 
                        , :P_AFP 
                        , :P_SALUD 
                        , :P_PLAN_SALUD 
                        , :P_FORMATO_PLAN_SALUD 
                        , :P_PLAN_COLECTIVO_SALUD 
                        , :P_FORMATO_PLAN_COLECTIVO_SALUD 
                        , :P_MONTO_APV 
                        , :P_INSTITUCION_APV 
                        , :P_REGIMEN_APV 
                        , :P_FORMA_PAGO 
                        , :P_BANCO 
                        , :P_CUENTA 
                        , :P_JORNADA 
                        , :P_COD_AFP 
                        , :P_COD_SALUD 
                        , :P_COD_BANCO 
                        , :P_COD_ESTADO_CIVIL 
                        , :P_COD_JORNADA 
                        , :P_COD_EMP 
                        , :P_NOM_EMP 
                        , :P_USUARIO  
                        , :P_ESTADO
                        , :P_COD_INE
                        , :P_COD_SEXO
                        , :P_COD_INSTITUCION_APV
                        , :P_COD_REGIMEN_APV
                        , :P_COD_FORMA_PAGO
                        , :P_COD_NIVEL_EDUCACION
                        , :P_FORMATO_MONTO_APV
                        , :P_MONTO_GES
                        , :P_FORMATO_GES
                        , :P_MONTO_ADI_TRA
                        , :P_FORMATO_ADI_TRA
                        , :P_MONTO_ADI_EMP
                        , :P_FORMATO_ADI_EMP
                        , :P_COD_TIPO_CONTRATO
                        , :P_PERIODO
                        , :r_est
                        , :r_msg);END;"
        );

        oci_bind_by_name($proc, "P_RUT", $P_RUT, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_DV", $P_DV, 1, SQLT_CHR);
        oci_bind_by_name($proc, "P_NOMBRES", $P_NOMBRES, 200, SQLT_CHR);
        oci_bind_by_name($proc, "P_APE_PAT", $P_APE_PAT, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_APE_MAT", $P_APE_MAT, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_FECHA_INGRESO", $P_FECHA_INGRESO, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_FECHA_NACIMIENTO", $P_FECHA_NACIMIENTO, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_SEXO", $P_SEXO, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_NACIONALIDAD", $P_NACIONALIDAD, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_ESTADO_CIVIL", $P_ESTADO_CIVIL, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_NIVEL_EDUCACION", $P_NIVEL_EDUCACION, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_CALLE", $P_CALLE, 200, SQLT_CHR);
        oci_bind_by_name($proc, "P_NUMERO", $P_NUMERO, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_DEPARTAMENTO", $P_DEPARTAMENTO, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_COMUNA", $P_COMUNA, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_CIUDAD", $P_CIUDAD, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_CELULAR", $P_CELULAR, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_TELEFONO", $P_TELEFONO, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_CORREO", $P_CORREO, 500, SQLT_CHR);
        oci_bind_by_name($proc, "P_COD_CC", $P_COD_CC, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_NOM_CC", $P_NOM_CC, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_FECHA_VENCIMIENTO", $P_FECHA_VENCIMIENTO, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_COD_CARGO", $P_COD_CARGO, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_NOM_CARGO", $P_NOM_CARGO, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_INE", $P_INE, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_RUT_JEFE", $P_RUT_JEFE, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_DV_JEFE", $P_DV_JEFE, 1, SQLT_CHR);
        oci_bind_by_name($proc, "P_TIPO_CONTRATO", $P_TIPO_CONTRATO, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_ROL_CARGO", $P_ROL_CARGO, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_SUELDO_BASE", $P_SUELDO_BASE);
        oci_bind_by_name($proc, "P_RENTA_CONTRATO", $P_RENTA_CONTRATO);
        oci_bind_by_name($proc, "P_AFP", $P_AFP, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_SALUD", $P_SALUD, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_PLAN_SALUD", $P_PLAN_SALUD);
        oci_bind_by_name($proc, "P_FORMATO_PLAN_SALUD", $P_FORMATO_PLAN_SALUD, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_PLAN_COLECTIVO_SALUD", $P_PLAN_COLECTIVO_SALUD);
        oci_bind_by_name($proc, "P_FORMATO_PLAN_COLECTIVO_SALUD", $P_FORMATO_PLAN_COLECTIVO_SALUD, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_MONTO_APV", $P_MONTO_APV);
        oci_bind_by_name($proc, "P_INSTITUCION_APV", $P_INSTITUCION_APV, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_REGIMEN_APV", $P_REGIMEN_APV, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_FORMA_PAGO", $P_FORMA_PAGO, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_BANCO", $P_BANCO, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_CUENTA", $P_CUENTA, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_JORNADA", $P_JORNADA, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_COD_AFP", $P_COD_AFP, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_COD_SALUD", $P_COD_SALUD, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_COD_BANCO", $P_COD_BANCO, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_COD_ESTADO_CIVIL", $P_COD_ESTADO_CIVIL, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_COD_JORNADA", $P_COD_JORNADA, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_COD_EMP", $P_COD_EMP, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_NOM_EMP", $P_NOM_EMP, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_USUARIO", $P_USUARIO, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_ESTADO", $P_ESTADO, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_COD_INE", $P_COD_INE, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_COD_SEXO", $P_COD_SEXO, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_COD_INSTITUCION_APV", $P_COD_INSTITUCION_APV, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_COD_REGIMEN_APV", $P_COD_REGIMEN_APV, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_COD_FORMA_PAGO", $P_COD_FORMA_PAGO, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_COD_NIVEL_EDUCACION", $P_COD_NIVEL_EDUCACION, 20, SQLT_CHR);

        oci_bind_by_name($proc, "P_FORMATO_MONTO_APV", $P_FORMATO_MONTO_APV, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_MONTO_GES", $P_MONTO_GES);
        oci_bind_by_name($proc, "P_FORMATO_GES", $P_FORMATO_GES, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_MONTO_ADI_TRA", $P_MONTO_ADI_TRA);
        oci_bind_by_name($proc, "P_FORMATO_ADI_TRA", $P_FORMATO_ADI_TRA, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_MONTO_ADI_EMP", $P_MONTO_ADI_EMP);
        oci_bind_by_name($proc, "P_FORMATO_ADI_EMP", $P_FORMATO_ADI_EMP, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_COD_TIPO_CONTRATO", $P_COD_TIPO_CONTRATO, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_PERIODO", $P_PERIODO, 20, SQLT_CHR);
        oci_bind_by_name($proc, "r_est", $r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc, "r_msg", $r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }

    public function modificarIngresarPersonal(
        $P_RUT,
        $P_DV,
        $P_NOMBRES,
        $P_APE_PAT,
        $P_APE_MAT,
        $P_FECHA_INGRESO,
        $P_FECHA_NACIMIENTO,
        $P_SEXO,
        $P_NACIONALIDAD,
        $P_ESTADO_CIVIL,
        $P_NIVEL_EDUCACION,
        $P_CALLE,
        $P_NUMERO,
        $P_DEPARTAMENTO,
        $P_COMUNA,
        $P_CIUDAD,
        $P_TELEFONO,
        $P_CELULAR,
        $P_CORREO,
        $P_COD_CC,
        $P_NOM_CC,
        $P_FECHA_VENCIMIENTO,
        $P_COD_CARGO,
        $P_NOM_CARGO,
        $P_INE,
        $P_RUT_JEFE,
        $P_DV_JEFE,
        $P_TIPO_CONTRATO,
        $P_ROL_CARGO,
        $P_SUELDO_BASE,
        $P_RENTA_CONTRATO,
        $P_AFP,
        $P_SALUD,
        $P_PLAN_SALUD,
        $P_FORMATO_PLAN_SALUD,
        $P_PLAN_COLECTIVO_SALUD,
        $P_FORMATO_PLAN_COLECTIVO_SALUD,
        $P_MONTO_APV,
        $P_INSTITUCION_APV,
        $P_REGIMEN_APV,
        $P_FORMA_PAGO,
        $P_BANCO,
        $P_CUENTA,
        $P_JORNADA,
        $P_COD_AFP,
        $P_COD_SALUD,
        $P_COD_BANCO,
        $P_COD_ESTADO_CIVIL,
        $P_COD_JORNADA,
        $P_COD_EMP,
        $P_NOM_EMP,
        $P_USUARIO,
        $P_ESTADO,
        $P_COD_INE,
        $P_COD_SEXO,
        $P_COD_INSTITUCION_APV,
        $P_COD_REGIMEN_APV,
        $P_COD_FORMA_PAGO,
        $P_COD_NIVEL_EDUCACION,
        $P_FORMATO_MONTO_APV,
        $P_MONTO_GES,
        $P_FORMATO_GES,
        $P_MONTO_ADI_TRA,
        $P_FORMATO_ADI_TRA,
        $P_MONTO_ADI_EMP,
        $P_FORMATO_ADI_EMP,
        $P_COD_TIPO_CONTRATO,
        $P_PK_ID,
        $P_PERIODO
    ) {


        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
            $this->db->conn_id,
            "BEGIN NOV_UPD_INGRESAR_PERSONAL(
                        :P_RUT  
                      , :P_DV  
                      , :P_NOMBRES 
                      , :P_APE_PAT  
                      , :P_APE_MAT  
                      , :P_FECHA_INGRESO  
                      , :P_FECHA_NACIMIENTO  
                      , :P_SEXO  
                      , :P_NACIONALIDAD  
                      , :P_ESTADO_CIVIL  
                      , :P_NIVEL_EDUCACION  
                      , :P_CALLE  
                      , :P_NUMERO  
                      , :P_DEPARTAMENTO  
                      , :P_COMUNA  
                      , :P_CIUDAD  
                      , :P_TELEFONO  
                      , :P_CELULAR  
                      , :P_CORREO  
                      , :P_COD_CC  
                      , :P_NOM_CC  
                      , :P_FECHA_VENCIMIENTO  
                      , :P_COD_CARGO  
                      , :P_NOM_CARGO  
                      , :P_INE  
                      , :P_RUT_JEFE 
                      , :P_DV_JEFE 
                      , :P_TIPO_CONTRATO 
                      , :P_ROL_CARGO 
                      , :P_SUELDO_BASE 
                      , :P_RENTA_CONTRATO 
                      , :P_AFP 
                      , :P_SALUD 
                      , :P_PLAN_SALUD 
                      , :P_FORMATO_PLAN_SALUD 
                      , :P_PLAN_COLECTIVO_SALUD 
                      , :P_FORMATO_PLAN_COLECTIVO_SALUD 
                      , :P_MONTO_APV 
                      , :P_INSTITUCION_APV 
                      , :P_REGIMEN_APV 
                      , :P_FORMA_PAGO 
                      , :P_BANCO 
                      , :P_CUENTA 
                      , :P_JORNADA 
                      , :P_COD_AFP 
                      , :P_COD_SALUD 
                      , :P_COD_BANCO 
                      , :P_COD_ESTADO_CIVIL 
                      , :P_COD_JORNADA 
                      , :P_COD_EMP 
                      , :P_NOM_EMP 
                      , :P_USUARIO  
                      , :P_ESTADO
                      , :P_COD_INE
                      , :P_COD_SEXO
                      , :P_COD_INSTITUCION_APV
                      , :P_COD_REGIMEN_APV
                      , :P_COD_FORMA_PAGO
                      , :P_COD_NIVEL_EDUCACION
                      , :P_FORMATO_MONTO_APV
                      , :P_MONTO_GES
                      , :P_FORMATO_GES
                      , :P_MONTO_ADI_TRA
                      , :P_FORMATO_ADI_TRA
                      , :P_MONTO_ADI_EMP
                      , :P_FORMATO_ADI_EMP
                      , :P_COD_TIPO_CONTRATO
                      , :P_PK_ID 
                      , :P_PERIODO
                      , :r_est
                      , :r_msg);END;"
        );

        oci_bind_by_name($proc, "P_RUT", $P_RUT, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_DV", $P_DV, 1, SQLT_CHR);
        oci_bind_by_name($proc, "P_NOMBRES", $P_NOMBRES, 200, SQLT_CHR);
        oci_bind_by_name($proc, "P_APE_PAT", $P_APE_PAT, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_APE_MAT", $P_APE_MAT, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_FECHA_INGRESO", $P_FECHA_INGRESO, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_FECHA_NACIMIENTO", $P_FECHA_NACIMIENTO, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_SEXO", $P_SEXO, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_NACIONALIDAD", $P_NACIONALIDAD, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_ESTADO_CIVIL", $P_ESTADO_CIVIL, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_NIVEL_EDUCACION", $P_NIVEL_EDUCACION, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_CALLE", $P_CALLE, 200, SQLT_CHR);
        oci_bind_by_name($proc, "P_NUMERO", $P_NUMERO, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_DEPARTAMENTO", $P_DEPARTAMENTO, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_COMUNA", $P_COMUNA, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_CIUDAD", $P_CIUDAD, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_CELULAR", $P_CELULAR, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_TELEFONO", $P_TELEFONO, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_CORREO", $P_CORREO, 500, SQLT_CHR);
        oci_bind_by_name($proc, "P_COD_CC", $P_COD_CC, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_NOM_CC", $P_NOM_CC, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_FECHA_VENCIMIENTO", $P_FECHA_VENCIMIENTO, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_COD_CARGO", $P_COD_CARGO, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_NOM_CARGO", $P_NOM_CARGO, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_INE", $P_INE, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_RUT_JEFE", $P_RUT_JEFE, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_DV_JEFE", $P_DV_JEFE, 1, SQLT_CHR);
        oci_bind_by_name($proc, "P_TIPO_CONTRATO", $P_TIPO_CONTRATO, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_ROL_CARGO", $P_ROL_CARGO, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_SUELDO_BASE", $P_SUELDO_BASE);
        oci_bind_by_name($proc, "P_RENTA_CONTRATO", $P_RENTA_CONTRATO);
        oci_bind_by_name($proc, "P_AFP", $P_AFP, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_SALUD", $P_SALUD, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_PLAN_SALUD", $P_PLAN_SALUD);
        oci_bind_by_name($proc, "P_FORMATO_PLAN_SALUD", $P_FORMATO_PLAN_SALUD, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_PLAN_COLECTIVO_SALUD", $P_PLAN_COLECTIVO_SALUD);
        oci_bind_by_name($proc, "P_FORMATO_PLAN_COLECTIVO_SALUD", $P_FORMATO_PLAN_COLECTIVO_SALUD, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_MONTO_APV", $P_MONTO_APV);
        oci_bind_by_name($proc, "P_INSTITUCION_APV", $P_INSTITUCION_APV, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_REGIMEN_APV", $P_REGIMEN_APV, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_FORMA_PAGO", $P_FORMA_PAGO, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_BANCO", $P_BANCO, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_CUENTA", $P_CUENTA, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_JORNADA", $P_JORNADA, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_COD_AFP", $P_COD_AFP, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_COD_SALUD", $P_COD_SALUD, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_COD_BANCO", $P_COD_BANCO, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_COD_ESTADO_CIVIL", $P_COD_ESTADO_CIVIL, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_COD_JORNADA", $P_COD_JORNADA, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_COD_EMP", $P_COD_EMP, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_NOM_EMP", $P_NOM_EMP, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_USUARIO", $P_USUARIO, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_ESTADO", $P_ESTADO, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_COD_INE", $P_COD_INE, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_COD_SEXO", $P_COD_SEXO, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_COD_INSTITUCION_APV", $P_COD_INSTITUCION_APV, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_COD_REGIMEN_APV", $P_COD_REGIMEN_APV, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_COD_FORMA_PAGO", $P_COD_FORMA_PAGO, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_COD_NIVEL_EDUCACION", $P_COD_NIVEL_EDUCACION, 20, SQLT_CHR);

        oci_bind_by_name($proc, "P_FORMATO_MONTO_APV", $P_FORMATO_MONTO_APV, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_MONTO_GES", $P_MONTO_GES);
        oci_bind_by_name($proc, "P_FORMATO_GES", $P_FORMATO_GES, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_MONTO_ADI_TRA", $P_MONTO_ADI_TRA);
        oci_bind_by_name($proc, "P_FORMATO_ADI_TRA", $P_FORMATO_ADI_TRA, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_MONTO_ADI_EMP", $P_MONTO_ADI_EMP);
        oci_bind_by_name($proc, "P_FORMATO_ADI_EMP", $P_FORMATO_ADI_EMP, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_COD_TIPO_CONTRATO", $P_COD_TIPO_CONTRATO, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_PK_ID", $P_PK_ID);
        oci_bind_by_name($proc, "P_PERIODO", $P_PERIODO, 20, SQLT_CHR);
        oci_bind_by_name($proc, "r_est", $r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc, "r_msg", $r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }


    public function cargarConceptosIngresoPersonal($p_ingreso)
    {

        $sql = "SELECT 
                PFK_INGRESO,
                PFK_COD_CONCEPTO,
                PFK_COD_EMP,
                NOM_CONCEPTO,
                TIPO_CONCEPTO,
                GRUPO_CONCEPTO,
                RANGO_INI,
                RANGO_FIN,
                MESES,
                TIPO_MES,
                OBS_TIPO_CONCEPTO,
                VALOR
            FROM NOV_ING_PER_CONCEPTOS
            WHERE PFK_INGRESO = $p_ingreso
            ORDER BY NOM_CONCEPTO ASC ";

        $query = $this->db->query($sql);
        return $query->result();
    }


    public function modificarIngresoPersonalConcepto($p_ingreso, $p_cod_concepto, $p_usuario, $p_valor)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
            $this->db->conn_id,
            "BEGIN NOV_UPD_ING_PER_CONCEPTO(
                        :p_ingreso,
                        :p_cod_concepto,
                        :p_usuario,
                        :p_valor,
                        :r_est,
                        :r_msg);END;"
        );

        oci_bind_by_name($proc, "p_ingreso", $p_ingreso, -1, OCI_B_INT);
        oci_bind_by_name($proc, "p_cod_concepto", $p_cod_concepto, 20, SQLT_CHR);
        oci_bind_by_name($proc, "p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc, "p_valor", $p_valor, 100, SQLT_CHR);
        oci_bind_by_name($proc, "r_est", $r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc, "r_msg", $r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }

    public function cambiarEstadoIngresoPersonal($p_ingreso, $p_estado, $p_usuario)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
            $this->db->conn_id,
            "BEGIN NOV_EST_INGRESAR_PERSONAL(
                        :p_ingreso,
                        :p_estado,
                        :p_usuario,
                        :r_est,
                        :r_msg);END;"
        );

        oci_bind_by_name($proc, "p_ingreso", $p_ingreso, -1, OCI_B_INT);
        oci_bind_by_name($proc, "p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc, "p_estado", $p_estado, 20, SQLT_CHR);
        oci_bind_by_name($proc, "r_est", $r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc, "r_msg", $r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }


    public function eliminarIngresoPersonal($p_ingreso, $p_usuario)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
            $this->db->conn_id,
            "BEGIN NOV_DEL_INGRESAR_PERSONAL(
                        :p_ingreso,
                        :p_usuario,
                        :r_est,
                        :r_msg);END;"
        );

        oci_bind_by_name($proc, "p_ingreso", $p_ingreso, -1, OCI_B_INT);
        oci_bind_by_name($proc, "p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc, "r_est", $r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc, "r_msg", $r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }
    public function anularIngresoPersonal(
        $P_COD,
        $P_USUARIO,
        $P_OBS
    ) {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
            $this->db->conn_id,
            "BEGIN NOV_ANU_INGRESAR_PERSONAL(
                  :P_COD  
                , :P_USUARIO
                , :P_OBS
                , :r_est
                , :r_msg);END;"
        );

        oci_bind_by_name($proc, "P_COD", $P_COD, -1, OCI_B_INT);
        oci_bind_by_name($proc, "P_USUARIO", $P_USUARIO, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_OBS", $P_OBS, 1000, SQLT_CHR);
        oci_bind_by_name($proc, "r_est", $r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc, "r_msg", $r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }
}
