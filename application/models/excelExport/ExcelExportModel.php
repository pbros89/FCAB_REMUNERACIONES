<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class ExcelExportModel extends CI_Model {

    public function __construct() {
        parent::__construct();
        $this->load->database("BD_NOVEDADES");
    }


    public function cargarConceptosProceso($p_cod_emp, $p_proceso, $p_tipo_proceso, $p_grupo_concepto, $p_tipo_concepto, $p_rol, $p_usuario)
    {
        $sql = "SELECT DISTINCT PFK_COD_CONCEPTO, NOM_CONCEPTO
                FROM NOV_PROC_MENSUAl_conceptos
                WHERE 1 = 1
                AND PFK_COD_EMP = '$p_cod_emp'
                AND PFK_PROCESO = '$p_proceso' ";

        if(!empty($p_tipo_proceso)){
            $sql .= "AND PFK_TIPO IN ($p_tipo_proceso) ";
        }

        if(!empty($p_grupo_concepto)){
            $sql .= "AND GRUPO_CONCEPTO IN ($p_grupo_concepto) ";
        }

        if(!empty($p_tipo_concepto)){
            $sql .= "AND TIPO_CONCEPTO IN ($p_tipo_concepto) ";
        }

        //CUANDO EL ROL DE USUARIO ES DISTINTO A SUPER_ADMIN O ADMIN OBTIENE 
        //SOLO LOS CONCEPTOS DE LOS CC DE USUARIO
        if(!empty($p_rol) && $p_rol != 'SUPER_ADMIN' && $p_rol != 'ADMIN') {
            $sql .= "AND PFK_COD_CC IN (
                SELECT PFK_COD_CC
                FROM NOV_USUARIOS_CC
                WHERE PFK_COD_EMP = '$p_cod_emp'
                AND PFK_USUARIO = '$p_usuario'
            ) ";
        }

        $sql .= "ORDER BY PFK_COD_CONCEPTO ASC";

        $query = $this->db->query($sql);
        return $query->result();
    }


    public function cargarProcesoConsolidadoHorizontal($p_cod_emp, $p_proceso, $p_tipo_proceso, $p_grupo_concepto, $p_tipo_concepto, $p_rol, $p_usuario) {
        $sql1 = "SELECT listagg('''' || pfk_cod_concepto || ''' as ' || pfk_cod_concepto, ',') within group (order by PFK_COD_CONCEPTO) as CONCEPTOS
        FROM   (
            SELECT DISTINCT pfk_cod_concepto 
            FROM NOV_PROC_MENSUAl_conceptos
            WHERE 1 = 1
            AND PFK_COD_EMP = '$p_cod_emp'
            AND PFK_PROCESO = '$p_proceso' ";
            
            //CUANDO EL ROL DE USUARIO ES DISTINTO A SUPER_ADMIN O ADMIN OBTIENE 
            //SOLO LOS CONCEPTOS DE LOS CC DE USUARIO
            if(!empty($p_rol) && $p_rol != 'SUPER_ADMIN' && $p_rol != 'ADMIN') {
                $sql1 .= "AND PFK_COD_CC IN (
                    SELECT PFK_COD_CC
                    FROM NOV_USUARIOS_CC
                    WHERE PFK_COD_EMP = '$p_cod_emp'
                    AND PFK_USUARIO = '$p_usuario'
                ) ";
            }


        if(!empty($p_tipo_proceso)){
            $sql1 .= "AND PFK_TIPO IN ($p_tipo_proceso) ";
        }

        if(!empty($p_grupo_concepto)){
            $sql1 .= "AND GRUPO_CONCEPTO IN ($p_grupo_concepto) ";
        }

        if(!empty($p_tipo_concepto)){
            $sql1 .= "AND TIPO_CONCEPTO IN ($p_tipo_concepto) ";
        }
        $sql1 .= "ORDER BY PFK_COD_CONCEPTO ASC";

        $sql1 .= ")";

        $query1 = $this->db->query($sql1);
        $result1 = $query1->result();

        $conceptos = $result1[0]->CONCEPTOS;

        $sql2 = "SELECT * 
        FROM (
            SELECT 
                CON.pfk_rut RUT, 
                PER.NOMBRE, 
                PER.NOM_GERENCIA GERENCIA,
                PER.NOM_DEPARTAMENTO DEPARTAMENTO,
                PER.PFK_COD_CC AS COD_CC, 
                PER.NOM_CC,
                PER.COD_CARGO,
                PER.NOM_CARGO,
                PER.FECHA_INGRESO,
                PER.TIPO_CONTRATO,
                PER.JORNADA,
                PER.COD_SINDICATO,
                PER.NOM_SINDICATO,
                PER.COD_ADHERIDO,
                PER.NOM_ADHERIDO,
                
                sum(CON.valor) valor, 
                CON.pfk_cod_concepto 
            FROM NOV_PROC_MENSUAl_conceptos con, NOV_PROC_MENSUAL_PERSONS PER
            WHERE CON.PFK_PROCESO = PER.PFK_PROCESO
            AND CON.PFK_TIPO = PER.PFK_TIPO
            AND CON.PFK_COD_EMP = PER.PFK_COD_EMP
            AND CON.PFK_COD_CC = PER.PFK_COD_CC
            AND CON.PFK_RUT = PER.PK_RUT
            AND CON.PFK_COD_EMP = '$p_cod_emp'
            AND CON.PFK_PROCESO = '$p_proceso' ";

            //CUANDO EL ROL DE USUARIO ES DISTINTO A SUPER_ADMIN O ADMIN OBTIENE 
            //SOLO LOS CONCEPTOS DE LOS CC DEL USUARIO
            if(!empty($p_rol) && $p_rol != 'SUPER_ADMIN' && $p_rol != 'ADMIN') {
                $sql2 .= "AND CON.PFK_COD_CC IN (
                    SELECT PFK_COD_CC
                    FROM NOV_USUARIOS_CC
                    WHERE PFK_COD_EMP = '$p_cod_emp'
                    AND PFK_USUARIO = '$p_usuario'
                ) ";
            }

        if(!empty($p_tipo_proceso)){
            $sql2 .= "AND CON.PFK_TIPO IN ($p_tipo_proceso) ";
        }

        if(!empty($p_grupo_concepto)){
            $sql2 .= "AND CON.GRUPO_CONCEPTO IN ($p_grupo_concepto) ";
        }

        if(!empty($p_tipo_concepto)){
            $sql2 .= "AND CON.TIPO_CONCEPTO IN ($p_tipo_concepto) ";
        }
        
        $sql2 .= "group by CON.pfk_rut, PER.NOM_GERENCIA ,
        PER.NOM_DEPARTAMENTO,
        PER.NOMBRE, PER.PFK_COD_CC, 
        PER.NOM_CC, PER.COD_CARGO, PER.NOM_CARGO, PER.FECHA_INGRESO, 
        PER.TIPO_CONTRATO, PER.JORNADA, PER.COD_SINDICATO, PER.NOM_SINDICATO, PER.COD_ADHERIDO, PER.NOM_ADHERIDO, 
        CON.pfk_cod_concepto 
        ORDER BY PER.PFK_COD_CC, CON.pfk_rut, CON.pfk_cod_concepto)
        pivot (sum(valor) for pfk_cod_concepto in ($conceptos))";

        $query2 = $this->db->query($sql2);
        $result2 = $query2->result();

        return $result2;
    }

    public function cargarProcesoConsolidadoVertical($p_cod_emp, $p_proceso, $p_tipo_proceso, $p_grupo_concepto, $p_tipo_concepto, $p_rol, $p_usuario){
        $sql = "SELECT 
                    CON.pfk_rut RUT, 
                    PER.NOMBRE, 
                    PER.NOM_GERENCIA GERENCIA,
                    PER.NOM_DEPARTAMENTO DEPARTAMENTO,
                    PER.PFK_COD_CC AS COD_CC, 
                    PER.NOM_CC,
                    PER.COD_CARGO,
                    PER.NOM_CARGO,
                    PER.FECHA_INGRESO,
                    PER.TIPO_CONTRATO,
                    PER.JORNADA,
                    PER.COD_SINDICATO,
                    PER.NOM_SINDICATO,
                    PER.COD_ADHERIDO,
                    PER.NOM_ADHERIDO,
                    CON.pfk_cod_concepto COD_CONCEPTO,   
                    CON.NOM_CONCEPTO NOM_CONCEPTO,  

                    sum(CON.valor) valor

            FROM NOV_PROC_MENSUAl_conceptos con, NOV_PROC_MENSUAL_PERSONS PER
            WHERE CON.PFK_PROCESO = PER.PFK_PROCESO
            AND CON.PFK_TIPO = PER.PFK_TIPO
            AND CON.PFK_COD_EMP = PER.PFK_COD_EMP
            AND CON.PFK_COD_CC = PER.PFK_COD_CC
            AND CON.PFK_RUT = PER.PK_RUT
            AND CON.PFK_COD_EMP = '$p_cod_emp'
            AND CON.PFK_PROCESO = '$p_proceso' ";

        //CUANDO EL ROL DE USUARIO ES DISTINTO A SUPER_ADMIN O ADMIN OBTIENE 
        //SOLO LOS CONCEPTOS DE LOS CC DEL USUARIO
        if(!empty($p_rol) && $p_rol != 'SUPER_ADMIN' && $p_rol != 'ADMIN') {
            $sql .= "AND CON.PFK_COD_CC IN (
                SELECT PFK_COD_CC
                FROM NOV_USUARIOS_CC
                WHERE PFK_COD_EMP = '$p_cod_emp'
                AND PFK_USUARIO = '$p_usuario'
            ) ";
        }

        if(!empty($p_tipo_proceso)){
            $sql .= "AND CON.PFK_TIPO IN ($p_tipo_proceso) ";
        }

        if(!empty($p_grupo_concepto)){
            $sql .= "AND CON.GRUPO_CONCEPTO IN ($p_grupo_concepto) ";
        }

        if(!empty($p_tipo_concepto)){
            $sql .= "AND CON.TIPO_CONCEPTO IN ($p_tipo_concepto) ";
        }
        $sql .= "group by CON.pfk_rut, 
        PER.NOMBRE, PER.NOM_GERENCIA ,
        PER.NOM_DEPARTAMENTO, PER.PFK_COD_CC, 
        PER.NOM_CC, PER.COD_CARGO, PER.NOM_CARGO, PER.FECHA_INGRESO, 
        PER.TIPO_CONTRATO, PER.JORNADA, PER.COD_SINDICATO, PER.NOM_SINDICATO, PER.COD_ADHERIDO, PER.NOM_ADHERIDO, 
        CON.pfk_cod_concepto, CON.NOM_CONCEPTO 
        ORDER BY PER.PFK_COD_CC, CON.pfk_rut, CON.pfk_cod_concepto";

        $query = $this->db->query($sql);
        return $query->result();
    }


    public function cargarConceptosFiniquito($p_cod_emp, $p_desde, $p_hasta,  $p_grupo_concepto, $p_tipo_concepto)
    {
        $sql = "SELECT DISTINCT pfk_cod_concepto,  NOM_CONCEPTO
            FROM NOV_FINIQUITO_CONCEPTOS con, NOV_FINIQUITOS FIN
            WHERE CON.PFK_FINIQUITO = FIN.PK_FINIQUITO
            AND FIN.FK_COD_EMP = '$p_cod_emp'
            AND FIN.FECHA_BAJA BETWEEN TO_DATE('$p_desde', 'YYYY/MM/DD') AND TO_DATE('$p_hasta 23:59', 'YYYY/MM/DD HH24:MI') 
            AND ESTADO = 'TERMINADO' ";

        if(!empty($p_grupo_concepto)){
            $sql .= "AND GRUPO_CONCEPTO IN ($p_grupo_concepto) ";
        }

        if(!empty($p_tipo_concepto)){
            $sql .= "AND TIPO_CONCEPTO IN ($p_tipo_concepto) ";
        }
        $sql .= "ORDER BY PFK_COD_CONCEPTO ASC";

        $query = $this->db->query($sql);
        return $query->result();
    }


    public function cargarFiniquitoConsolidadoHorizontal($p_cod_emp, $p_desde, $p_hasta, $p_grupo_concepto, $p_tipo_concepto) {
        $sql1 = "SELECT listagg('''' || pfk_cod_concepto || ''' as ' || pfk_cod_concepto, ',') within group (order by PFK_COD_CONCEPTO) as CONCEPTOS
        FROM   (
            SELECT DISTINCT pfk_cod_concepto 
            FROM NOV_FINIQUITO_CONCEPTOS con, NOV_FINIQUITOS FIN
            WHERE CON.PFK_FINIQUITO = FIN.PK_FINIQUITO
            AND FIN.FK_COD_EMP = '$p_cod_emp'
            AND FIN.FECHA_BAJA BETWEEN TO_DATE('$p_desde', 'YYYY/MM/DD') AND TO_DATE('$p_hasta 23:59', 'YYYY/MM/DD HH24:MI') 
            AND ESTADO = 'TERMINADO' ";

        if(!empty($p_grupo_concepto)){
            $sql1 .= "AND GRUPO_CONCEPTO IN ($p_grupo_concepto) ";
        }

        if(!empty($p_tipo_concepto)){
            $sql1 .= "AND TIPO_CONCEPTO IN ($p_tipo_concepto) ";
        }
        $sql1 .= "ORDER BY PFK_COD_CONCEPTO ASC";

        $sql1 .= ")";

        $query1 = $this->db->query($sql1);
        $result1 = $query1->result();

        $conceptos = $result1[0]->CONCEPTOS;

        $sql2 = "SELECT Q1.*,
            ( SELECT sum(CASE WHEN con1.grupo_concepto = 'FINIQUITO_DESC' THEN (CON1.valor*-1) ELSE CON1.VALOR END) FROM NOV_FINIQUITO_CONCEPTOS con1 WHERE CON1.PFK_FINIQUITO = Q1.CODIGO ) TOTAL 
        FROM (SELECT *
        FROM (
            SELECT 
                FIN.PERIODO,
                FIN.PK_FINIQUITO CODIGO,
                FIN.RUT,
                FIN.NOMBRE,
                FIN.COD_CAUSAL,
                FIN.NOM_CAUSAL,
                FIN.FECHA_BAJA,
                sum(CASE WHEN con.grupo_concepto = 'FINIQUITO_DESC' THEN (CON.valor*-1) ELSE CON.VALOR END) valor, 
                CON.pfk_cod_concepto
                
            FROM NOV_FINIQUITOS FIN, NOV_FINIQUITO_CONCEPTOS con
            WHERE FIN.PK_FINIQUITO = CON.PFK_FINIQUITO 
            AND FIN.FK_COD_EMP = '$p_cod_emp'
            AND FIN.FECHA_BAJA BETWEEN TO_DATE('$p_desde', 'YYYY/MM/DD') AND TO_DATE('$p_hasta 23:59', 'YYYY/MM/DD HH24:MI') 
            AND ESTADO = 'TERMINADO' ";


        if(!empty($p_grupo_concepto)){
            $sql2 .= "AND CON.GRUPO_CONCEPTO IN ($p_grupo_concepto) ";
        }

        if(!empty($p_tipo_concepto)){
            $sql2 .= "AND CON.TIPO_CONCEPTO IN ($p_tipo_concepto) ";
        }
        
        $sql2 .= "group by FIN.PERIODO,FIN.PK_FINIQUITO, FIN.RUT,
        FIN.NOMBRE,
        FIN.COD_CAUSAL,
        FIN.NOM_CAUSAL,
        FIN.FECHA_BAJA,
        CON.pfk_cod_concepto)
        pivot (sum(valor) for pfk_cod_concepto in ($conceptos))) Q1";

        $query2 = $this->db->query($sql2);
        $result2 = $query2->result();

        return $result2;
    }


    public function cargarFiniquitoConsolidadoVertical($p_cod_emp, $p_desde, $p_hasta, $p_grupo_concepto, $p_tipo_concepto){
        $sql = "SELECT 
                FIN.PERIODO,
                FIN.RUT,
                FIN.NOMBRE,
                FIN.COD_CAUSAL,
                FIN.NOM_CAUSAL,
                FIN.FECHA_BAJA,
                CON.pfk_cod_concepto COD_CONCEPTO,   
                CON.NOM_CONCEPTO NOM_CONCEPTO,   
                sum(CON.valor) valor
            FROM NOV_FINIQUITOS FIN, NOV_FINIQUITO_CONCEPTOS con
            WHERE FIN.PK_FINIQUITO = CON.PFK_FINIQUITO 
            AND FIN.FK_COD_EMP = '$p_cod_emp'
            AND FIN.FECHA_BAJA BETWEEN TO_DATE('$p_desde', 'YYYY/MM/DD') AND TO_DATE('$p_hasta 23:59', 'YYYY/MM/DD HH24:MI') 
            AND ESTADO = 'TERMINADO' ";


        if(!empty($p_grupo_concepto)){
            $sql .= "AND CON.GRUPO_CONCEPTO IN ($p_grupo_concepto) ";
        }

        if(!empty($p_tipo_concepto)){
            $sql .= "AND CON.TIPO_CONCEPTO IN ($p_tipo_concepto) ";
        }

        $sql .= "group by FIN.PERIODO,
        FIN.RUT,
        FIN.NOMBRE,
        FIN.COD_CAUSAL,
        FIN.NOM_CAUSAL,
        FIN.FECHA_BAJA,
        CON.pfk_cod_concepto, 
        CON.NOM_CONCEPTO";

        $query = $this->db->query($sql);
        return $query->result();
    }


    public function cargarConceptosIngresoPersonal($p_cod_emp, $p_desde, $p_hasta)
    {
        $sql = " SELECT DISTINCT pfk_cod_concepto , NOM_CONCEPTO
            FROM NOV_ING_PER_CONCEPTOS con, NOV_INGRESAR_PERSONAL ING
            WHERE CON.PFK_INGRESO = ING.PK_ID
            AND ING.COD_EMP = '$p_cod_emp'
            AND ING.FECHA_INGRESO BETWEEN TO_DATE('$p_desde', 'YYYY/MM/DD') AND TO_DATE('$p_hasta 23:59', 'YYYY/MM/DD HH24:MI') 
            AND ESTADO = 'TERMINADO' ";

        $sql .= "ORDER BY PFK_COD_CONCEPTO ASC";

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function cagarIngresosPersonalConsolidadoHorizontal($p_cod_emp, $p_desde, $p_hasta) {
        $sql1 = "SELECT listagg('''' || pfk_cod_concepto || ''' as ' || pfk_cod_concepto, ',') within group (order by PFK_COD_CONCEPTO) as CONCEPTOS
        FROM   (
            SELECT DISTINCT pfk_cod_concepto 
            FROM NOV_ING_PER_CONCEPTOS con, NOV_INGRESAR_PERSONAL ING
            WHERE CON.PFK_INGRESO = ING.PK_ID
            AND ING.COD_EMP = '$p_cod_emp'
            AND ING.FECHA_INGRESO BETWEEN TO_DATE('$p_desde', 'YYYY/MM/DD') AND TO_DATE('$p_hasta 23:59', 'YYYY/MM/DD HH24:MI') 
            AND ESTADO = 'TERMINADO' ";

        $sql1 .= "ORDER BY PFK_COD_CONCEPTO ASC";

        $sql1 .= ")";

        $query1 = $this->db->query($sql1);
        $result1 = $query1->result();

        $conceptos = $result1[0]->CONCEPTOS;

        $sql2 = "SELECT * 
        FROM (
            SELECT 
                ING.PERIODO,
                ING.RUT || '-' || ING.DV AS RUT,
                ING.NOMBRES,
                ING.APE_PAT,
                ING.APE_MAT,
                ING.FECHA_NACIMIENTO,
                ING.COD_SEXO,
                ING.SEXO,
                ING.NACIONALIDAD,
                ING.COD_ESTADO_CIVIL,
                ING.ESTADO_CIVIL,
                ING.COD_NIVEL_EDUCACION,
                ING.NIVEL_EDUCACION,
                ING.CALLE,
                ING.NUMERO,
                ING.DEPARTAMENTO,
                ING.COMUNA,
                ING.CIUDAD,
                ING.TELEFONO,
                ING.CELULAR,
                ING.CORREO,
                ING.NOM_GERENCIA GERENCIA,
                ING.NOM_DEPARTAMENTO DEPARTAMENTO,
                ING.COD_CC,
                ING.NOM_CC,
                ING.COD_CARGO,
                ING.NOM_CARGO,
                ING.COD_JORNADA,
                ING.JORNADA,
                ING.FECHA_INGRESO,
                ING.FECHA_VENCIMIENTO,
                ING.COD_INE,
                ING.INE,
                ING.RUT_JEFE,
                ING.DV_JEFE,
                ING.TIPO_CONTRATO,
                ING.ROL_CARGO,
                ING.SUELDO_BASE,
                ING.RENTA_CONTRATO,
                ING.COD_AFP,
                ING.AFP,
                ING.COD_SALUD,
                ING.SALUD,
                ING.PLAN_SALUD,
                ING.FORMATO_PLAN_SALUD,
                ING.PLAN_COLECTIVO_SALUD,
                ING.FORMATO_PLAN_COLECTIVO_SALUD,
                ING.MONTO_APV,
                ING.COD_INSTITUCION_APV,
                ING.INSTITUCION_APV,
                ING.COD_REGIMEN_APV,
                ING.REGIMEN_APV,
                ING.COD_FORMA_PAGO,
                ING.FORMA_PAGO,
                ING.COD_BANCO,
                ING.BANCO,
                ING.CUENTA,
                sum(CON.valor) valor, 
                CON.pfk_cod_concepto 
            FROM NOV_INGRESAR_PERSONAL ING, NOV_ING_PER_CONCEPTOS con
            WHERE ING.PK_ID = CON.PFK_INGRESO 
            AND ING.COD_EMP = '$p_cod_emp'
            AND ING.FECHA_INGRESO BETWEEN TO_DATE('$p_desde', 'YYYY/MM/DD') AND TO_DATE('$p_hasta 23:59', 'YYYY/MM/DD HH24:MI') 
            AND ESTADO = 'TERMINADO' ";

        
        $sql2 .= "group by ING.PERIODO, ING.RUT, ING.DV,
        ING.NOMBRES,
        ING.APE_PAT,
        ING.APE_MAT,
        ING.FECHA_NACIMIENTO,
        ING.COD_SEXO,
        ING.SEXO,
        ING.NACIONALIDAD,
        ING.COD_ESTADO_CIVIL,
        ING.ESTADO_CIVIL,
        ING.COD_NIVEL_EDUCACION,
        ING.NIVEL_EDUCACION,
        ING.CALLE,
        ING.NUMERO,
        ING.DEPARTAMENTO,
        ING.COMUNA,
        ING.CIUDAD,
        ING.TELEFONO,
        ING.CELULAR,
        ING.CORREO,
        ING.NOM_GERENCIA ,
        ING.NOM_DEPARTAMENTO,
        ING.COD_CC,
        ING.NOM_CC,
        ING.COD_CARGO,
        ING.NOM_CARGO,
        ING.COD_JORNADA,
        ING.JORNADA,
        ING.FECHA_INGRESO,
        ING.FECHA_VENCIMIENTO,
        ING.COD_INE,
        ING.INE,
        ING.RUT_JEFE,
        ING.DV_JEFE,
        ING.TIPO_CONTRATO,
        ING.ROL_CARGO,
        ING.SUELDO_BASE,
        ING.RENTA_CONTRATO,
        ING.COD_AFP,
        ING.AFP,
        ING.COD_SALUD,
        ING.SALUD,
        ING.PLAN_SALUD,
        ING.FORMATO_PLAN_SALUD,
        ING.PLAN_COLECTIVO_SALUD,
        ING.FORMATO_PLAN_COLECTIVO_SALUD,
        ING.MONTO_APV,
        ING.COD_INSTITUCION_APV,
        ING.INSTITUCION_APV,
        ING.COD_REGIMEN_APV,
        ING.REGIMEN_APV,
        ING.COD_FORMA_PAGO,
        ING.FORMA_PAGO,
        ING.COD_BANCO,
        ING.BANCO,
        ING.CUENTA,
        CON.pfk_cod_concepto )
        pivot (sum(valor) for pfk_cod_concepto in ($conceptos))";

        $query2 = $this->db->query($sql2);
        $result2 = $query2->result();

        return $result2;
    }


    public function cagarIngresosPersonalConsolidado($p_cod_emp, $p_desde, $p_hasta){
        $sql = "SELECT 
                    PERIODO,
                    RUT || '-' || DV AS RUT,
                    NOMBRES,
                    APE_PAT,
                    APE_MAT,
                    FECHA_NACIMIENTO,
                    COD_SEXO,
                    SEXO,
                    NACIONALIDAD,
                    COD_ESTADO_CIVIL,
                    ESTADO_CIVIL,
                    COD_NIVEL_EDUCACION,
                    NIVEL_EDUCACION,
                    CALLE,
                    NUMERO,
                    DEPARTAMENTO NUM_DEPARTAMENTO,
                    COMUNA,
                    CIUDAD,
                    TELEFONO,
                    CELULAR,
                    CORREO,
                    NOM_GERENCIA GERENCIA,
                    NOM_DEPARTAMENTO DEPARTAMENTO,
                    COD_CC,
                    NOM_CC,
                    COD_CARGO,
                    NOM_CARGO,
                    COD_JORNADA,
                    JORNADA,
                    FECHA_INGRESO,
                    FECHA_VENCIMIENTO,
                    COD_INE,
                    INE,
                    RUT_JEFE,
                    DV_JEFE,
                    TIPO_CONTRATO,
                    ROL_CARGO,
                    SUELDO_BASE,
                    RENTA_CONTRATO,
                    COD_AFP,
                    AFP,
                    COD_SALUD,
                    SALUD,
                    PLAN_SALUD,
                    FORMATO_PLAN_SALUD,
                    PLAN_COLECTIVO_SALUD,
                    FORMATO_PLAN_COLECTIVO_SALUD,
                    MONTO_APV,
                    COD_INSTITUCION_APV,
                    INSTITUCION_APV,
                    COD_REGIMEN_APV,
                    REGIMEN_APV,
                    COD_FORMA_PAGO,
                    FORMA_PAGO,
                    COD_BANCO,
                    BANCO,
                    CUENTA
            FROM NOV_INGRESAR_PERSONAL
            WHERE COD_EMP = '$p_cod_emp'
            AND FECHA_INGRESO BETWEEN TO_DATE('$p_desde', 'YYYY/MM/DD') AND TO_DATE('$p_hasta 23:59', 'YYYY/MM/DD HH24:MI') 
            AND ESTADO = 'TERMINADO' ";

        $query = $this->db->query($sql);
        return $query->result();
    }


    public function cargarCambiarAFPConsolidado($p_cod_emp, $p_desde, $p_hasta) {
        $sql = "SELECT 
                    PERIODO,
                    FECHA_CREACION,
                    RUT,
                    NOMBRE,
                    COD_TIPO_CAMBIO,
                    NOM_TIPO_CAMBIO,
                    COD_AFP,
                    NOM_AFP,
                    COD_APV,
                    NOM_APV,
                    MONTO,
                    TIPO_MONTO,
                    OBSERVACION
                FROM NOV_CAMBIO_AFP CAM 
                WHERE 1 = 1 
                AND FK_COD_EMP = '$p_cod_emp'
                AND FECHA_CREACION BETWEEN TO_DATE('$p_desde', 'YYYY/MM/DD') AND TO_DATE('$p_hasta 23:59', 'YYYY/MM/DD HH24:MI') 
                AND ESTADO = 'TERMINADO' ";
                $sql .= "ORDER BY FECHA_CREACION asc";
                

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function cargarCambiarSaludConsolidado($p_cod_emp, $p_desde, $p_hasta) {
        $sql = "SELECT 
                    PERIODO,
                    FECHA_CREACION,
                    RUT,
                    NOMBRE,
                    COD_TIPO_CAMBIO,
                    NOM_TIPO_CAMBIO,
                    COD_SALUD,
                    NOM_SALUD,
                    VALOR_PLAN,
                    TIPO_PLAN,
                    VALOR_GES,
                    TIPO_GES,
                    VALOR_ADI_TRA,
                    TIPO_ADI_TRA,
                    VALOR_ADI_EMP,
                    TIPO_ADI_EMP,
                    VALOR_CONVENIO,
                    TIPO_CONVENIO,
                    OBSERVACION
                FROM NOV_CAMBIO_SALUD CAM 
                WHERE 1 = 1 
                AND FK_COD_EMP = '$p_cod_emp'
                AND FECHA_CREACION BETWEEN TO_DATE('$p_desde', 'YYYY/MM/DD') AND TO_DATE('$p_hasta 23:59', 'YYYY/MM/DD HH24:MI') 
                AND ESTADO = 'TERMINADO' ";
                $sql .= "ORDER BY FECHA_CREACION asc";
                

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function cargarCambiarSindicatoConsolidado($p_cod_emp, $p_desde, $p_hasta) {
        $sql = "SELECT 
                    PERIODO,
                    FECHA_CREACION,
                    RUT,
                    NOMBRE,
                    COD_TIPO_CAMBIO,
                    NOM_TIPO_CAMBIO,
                    COD_SINDICATO,
                    NOM_SINDICATO,
                    COD_ADHERENCIA,
                    NOM_ADHERENCIA,
                    OBSERVACION
                FROM NOV_CAMBIO_SINDICATO CAM 
                WHERE 1 = 1 
                AND FK_COD_EMP = '$p_cod_emp'
                AND FECHA_CREACION BETWEEN TO_DATE('$p_desde', 'YYYY/MM/DD') AND TO_DATE('$p_hasta 23:59', 'YYYY/MM/DD HH24:MI') 
                AND ESTADO = 'TERMINADO' ";
                $sql .= "ORDER BY FECHA_CREACION asc";
                

        $query = $this->db->query($sql);
        return $query->result();
    }


    public function cargarCambiarDepositoConsolidado($p_cod_emp, $p_desde, $p_hasta) {
        $sql = "SELECT 
                    PERIODO,
                    FECHA_CREACION,
                    RUT,
                    NOMBRE,
                    COD_FORMA_PAGO,
                    NOM_FORMA_PAGO,
                    COD_BANCO,
                    NOM_BANCO,
                    NUM_CUENTA,
                    USR_CREADOR,
                    OBSERVACION
                FROM NOV_CAMBIO_DEPOSITO CAM 
                WHERE 1 = 1 
                AND FK_COD_EMP = '$p_cod_emp'
                AND FECHA_CREACION BETWEEN TO_DATE('$p_desde', 'YYYY/MM/DD') AND TO_DATE('$p_hasta 23:59', 'YYYY/MM/DD HH24:MI') 
                AND ESTADO = 'TERMINADO' ";
                $sql .= "ORDER BY FECHA_CREACION asc";
                

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function cargarCambiarCargoRentaConsolidado($p_cod_emp, $p_desde, $p_hasta) {
        $sql = "SELECT 
                    PERIODO,
                    FECHA_CREACION,
                    RUT,
                    NOMBRE,
                    COD_TIPO_CAMBIO,
                    NOM_TIPO_CAMBIO,
                    NOM_GERENCIA GERENCIA,
                    NOM_DEPARTAMENTO DEPARTAMENTO,
                    COD_CC,
                    NOM_CC,
                    COD_CARGO,
                    NOM_CARGO,
                    COD_JORNADA,
                    NOM_JORNADA,
                    COD_TIPO_CONTRATO,
                    NOM_TIPO_CONTRATO,
                    FECHA_FIN_CONTRATO,
                    SUELDO_BASE,
                    OBSERVACION
                FROM NOV_CAMBIO_CARGO_RENTA CAM 
                WHERE 1 = 1 
                AND FK_COD_EMP = '$p_cod_emp'
                AND FECHA_CREACION BETWEEN TO_DATE('$p_desde', 'YYYY/MM/DD') AND TO_DATE('$p_hasta 23:59', 'YYYY/MM/DD HH24:MI') 
                AND ESTADO = 'TERMINADO' ";
                $sql .= "ORDER BY FECHA_CREACION asc";
                

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function cargarCambiarOtrosConsolidado($p_cod_emp, $p_desde, $p_hasta) {
        $sql = "SELECT 
                    PERIODO,
                    FECHA_CREACION,
                    RUT,
                    NOMBRE,
                    COD_TIPO_CAMBIO,
                    NOM_TIPO_CAMBIO,
                    COD_EST_CIVIL,
                    NOM_EST_CIVIL,
                    COD_ESCOLARIDAD,
                    NOM_ESCOLARIDAD,
                    CALLE,
                    NUMERO,
                    DEPARTAMENTO,
                    COMUNA,
                    CIUDAD,
                    CORREO, 
                    TELEFONO,
                    OBSERVACION
                    
                FROM NOV_CAMBIO_OTROS CAM 
                WHERE 1 = 1 
                AND FK_COD_EMP = '$p_cod_emp'
                AND FECHA_CREACION BETWEEN TO_DATE('$p_desde', 'YYYY/MM/DD') AND TO_DATE('$p_hasta 23:59', 'YYYY/MM/DD HH24:MI') 
                AND ESTADO = 'TERMINADO' ";
                $sql .= "ORDER BY FECHA_CREACION asc";
                

        $query = $this->db->query($sql);
        return $query->result();
    }

    
    public function cargarCambiarBonosConsolidado($p_cod_emp, $p_desde, $p_hasta){
        $sql = "SELECT 
                BON.PERIODO,
                BON.FECHA_CREACION,
                BON.RUT,
                BON.NOMBRE,
                CON.pfk_cod_concepto COD_CONCEPTO,   
                CON.NOM_CONCEPTO NOM_CONCEPTO,   
                sum(CON.valor) valor
            FROM NOV_CAMBIO_BONO BON, NOV_CAMBIO_BONO_CONCEPTOS CON
            WHERE BON.PK_ID = CON.PFK_BONO
            AND BON.FK_COD_EMP = '$p_cod_emp'
            AND BON.FECHA_CREACION BETWEEN TO_DATE('$p_desde', 'YYYY/MM/DD') AND TO_DATE('$p_hasta 23:59', 'YYYY/MM/DD HH24:MI') 
            AND ESTADO = 'TERMINADO'";

        $sql .= "group by BON.PERIODO, 
                        BON.FECHA_CREACION,
                        BON.RUT,
                        BON.NOMBRE,
                        CON.pfk_cod_concepto,   
                        CON.NOM_CONCEPTO  ";

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function cargarIngDescuentoRRLLConsolidado($p_cod_emp, $p_desde, $p_hasta){
        $sql = "SELECT 
                ING.PERIODO,
                ING.FECHA_CREACION,
                ING.RUT,
                ING.NOMBRE,
                ING.NOM_GERENCIA GERENCIA,
                ING.NOM_DEPARTAMENTO DEPARTAMENTO,
                ING.COD_CC,
                ING.NOM_CC,
                ING.FK_TIPO TIPO,
                ING.FK_DESCUENTO COD_DESCUENTO,
                ING.NOM_DESCUENTO,
                ING.MONTO_TOTAL,
                ING.CUOTAS,
                ING.VALOR_CUOTA,
                ING.ANHO_DESCUENTO,
                ING.MES_DESCUENTO,
                ING.OBSERVACION
            FROM NOV_ING_DESCUENTOS_RRLL ING
            WHERE ING.FK_COD_EMP = '$p_cod_emp'
            AND ING.FECHA_CREACION BETWEEN TO_DATE('$p_desde', 'YYYY/MM/DD') AND TO_DATE('$p_hasta 23:59', 'YYYY/MM/DD HH24:MI') 
            AND ESTADO = 'TERMINADO' 
            ORDER BY ING.FECHA_CREACION ASC";

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function cargarIngHaberRRLLConsolidado($p_cod_emp, $p_desde, $p_hasta){

        $sql = "SELECT 
                ING.PERIODO,
                ING.FECHA_CREACION,
                ING.RUT,
                ING.NOMBRE,
                ING.NOM_GERENCIA GERENCIA,
                ING.NOM_DEPARTAMENTO DEPARTAMENTO,
                ING.COD_CC,
                ING.NOM_CC,
                ING.FK_TIPO TIPO,
                ING.FK_HABER COD_HABER,
                ING.NOM_HABER,
                ING.USA_FECHA,
                ING.INICIO,
                ING.TERMINO,
                ING.MONTO,
                ING.OBSERVACION
            FROM NOV_ING_HABERES_RRLL ING
            WHERE ING.FK_COD_EMP = '$p_cod_emp'
            AND ING.FECHA_CREACION BETWEEN TO_DATE('$p_desde', 'YYYY/MM/DD') AND TO_DATE('$p_hasta 23:59', 'YYYY/MM/DD HH24:MI')
            AND ESTADO = 'TERMINADO' 
            ORDER BY ING.FECHA_CREACION ASC";

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function cargarPersonal($p_cod_emp, $p_cod_cc, $p_cod_cargo, $p_no_vig, $p_fec_no_vig1, $p_fec_no_vig2, $p_rol){

        $sql = "SELECT 
                RUT,
                NOMBRE,
                ROL,
                NOM_GERENCIA GERENCIA,
                NOM_DEPARTAMENTO DEPARTAMENTO,
                COD_CC,
                NOM_CC,
                COD_CARGO,
                NOM_CARGO,
                TIPO_CONTRATO,
                FECHA_BAJA,
                COD_AFP,
                NOM_AFP,
                COD_SALUD,
                NOM_SALUD,
                VALOR_SALUD,
                COD_BANCO,
                NOM_BANCO,
                NUM_CUENTA,";
        if($p_rol == "ANALISTA_RRHH" ||
            $p_rol == "RRLL" ||
            $p_rol == "ADMIN"||
            $p_rol == "SUPER_ADMIN"||
            $p_rol == "GENERALISTA")
        {
            $sql .= "COD_SALARIO,
                    NOM_SALARIO,
                    SALARIO_BASE,";
        }
        $sql .= "CALLE,
                NUMERO,
                DEPTO,
                COMUNA,
                CIUDAD,
                COD_PAIS,
                COD_SEXO,
                NOM_SEXO,
                COD_EST_CIVIL,
                NOM_EST_CIVIL,
                CORREO,
                TELEFONO,
                ESCOLARIDAD,
                RUT_SUPERVISOR,
                NOM_SUPERVISOR,
                JORNADA,
                COD_SINDICATO,
                NOM_SINDICATO,
                COD_ADH_SINDICADOR,
                NOM_ADH_SINDICATO,
                PK_PERSONAL,
                COD_EMP,
                NOM_EMP,
                FECHA_INGRESO,
                FECHA_NAC,
                FECHA_FIN_CONTRATO,
                COD_CAUSAL,
                NOM_CAUSAL,
                COD_APV,
                NOM_APV,
                COD_REG_APV,
                NOM_REG_APV,
                MONTO_APV,
                TIPO_MONTO_APV,
                TIPO_VALOR_SALUD,
                VALOR_GES,
                TIPO_GES,
                VALOR_ADI_TRA,
                TIPO_ADI_TRA,
                VALOR_ADI_EMP,
                TIPO_ADI_EMP,
                VALOR_CONVENIO,
                TIPO_CONVENIO,
                COD_FORMA_PAGO,
                NOM_FORMA_PAGO,
                COD_JORNADA,
                COD_TIPO_CONTRATO
            FROM NOV_PERSONAL
            WHERE COD_EMP = '$p_cod_emp' ";

        if(!empty($p_no_vig) && $p_no_vig == 'SI')
        {
            $sql .= "AND FECHA_BAJA IS NOT NULL ";

            if(!empty($p_fec_no_vig1) && !empty($p_fec_no_vig2)) {
                $sql .= "AND FECHA_BAJA BETWEEN TO_DATE('$p_fec_no_vig1', 'YYYY/MM/DD') AND TO_DATE('$p_fec_no_vig2 23:59', 'YYYY/MM/DD HH24:MI') ";
            }
        }else {
            $sql .= "AND FECHA_BAJA IS NULL ";
        }

        if(!empty($p_cod_cc))
        {
            $sql .= "AND COD_CC = '$p_cod_cc' ";
        }

        if(!empty($p_cod_cargo))
        {
            $sql .= "AND COD_CARGO = '$p_cod_cargo' ";
        }
        
        $sql .= "ORDER BY COD_CC ASC, COD_CARGO ASC";

        $query = $this->db->query($sql);
        return $query->result();
    }


    public function cargarAusentismoConsolidado($p_cod_emp, $p_desde, $p_hasta) {
        $sql = "SELECT 
                    PERIODO,
                    FECHA_CREACION,
                    RUT,
                    NOMBRE,
                    TIPO,
                    COD_AUSENTISMO,
                    NOMBRE_AUSENTISMO,
                    FECHA_INI,
                    FECHA_FIN,
                    CANTIDAD_DIAS,
                    OBSERVACION
                FROM NOV_AUSENTISMO 
                WHERE 1 = 1 
                AND FK_COD_EMP = '$p_cod_emp'
                AND FECHA_CREACION BETWEEN TO_DATE('$p_desde', 'YYYY/MM/DD') AND TO_DATE('$p_hasta 23:59', 'YYYY/MM/DD HH24:MI') 
                AND ESTADO = 'TERMINADO' ";
                $sql .= "ORDER BY FECHA_CREACION asc";
                

        $query = $this->db->query($sql);
        return $query->result();
    }
}
