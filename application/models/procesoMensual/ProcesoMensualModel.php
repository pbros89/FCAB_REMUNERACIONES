<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class ProcesoMensualModel extends CI_Model {

    public function __construct() {
        parent::__construct();
        $this->load->database("BD_NOVEDADES");
    }

    public function cargarProcesosMensual($p_anho, $p_mes, $p_cod_emp, $p_estado, $p_tipo, $p_no_tipo) {
        $sql = "SELECT 
                    PROC.PK_TIPO,
                    PROC.PK_PROCESO, 
                    PROC.PFK_COD_EMP, 
                    EMP.NOMBRE NOM_EMP,
                    PROC.ESTADO, 
                    TO_CHAR(PROC.INICIO, 'YYYY/MM/DD HH24:MI') INICIO, 
                    TO_CHAR(PROC.TERMINO, 'YYYY/MM/DD HH24:MI') TERMINO, 
                    TO_CHAR(PROC.INICIO, 'YYYY/MM/DD') INICIO_DATE, 
                    TO_CHAR(PROC.TERMINO, 'YYYY/MM/DD') TERMINO_DATE,
                    TO_CHAR(PROC.INICIO, 'HH24:MI') INICIO_HH, 
                    TO_CHAR(PROC.TERMINO, 'HH24:MI') TERMINO_HH,  
                    TO_CHAR(PROC.FECHA_CREACION, 'YYYY/MM/DD HH24:MI') FECHA_CREACION, 
                    PROC.USR_CREADOR, 
                    TO_CHAR(PROC.FECHA_MODIFICO, 'YYYY/MM/DD HH24:MI') FECHA_MODIFICO, 
                    PROC.USR_MODIFICO,
                    PROC.OBSERVACION,
                    PROC.ANHO,
                    PROC.MES
                FROM NOV_PROC_MENSUAL PROC, NOV_EMPRESAS EMP  
                WHERE PROC.PFK_COD_EMP = EMP.PK_COD_EMP ";

                if(!empty($p_cod_emp))
                {
                    $sql .= "AND PROC.PFK_COD_EMP = '$p_cod_emp' ";
                }

                if(!empty($p_anho))
                {
                    $sql .= "AND PROC.ANHO = '$p_anho' ";
                }

                if(!empty($p_mes))
                {
                    $sql .= "AND PROC.MES = '$p_mes' ";
                }

                if(!empty($p_tipo))
                {
                    $sql .= "AND PROC.PK_TIPO = '$p_tipo' ";
                }

                if(!empty($p_estado))
                {
                    $sql .= "AND PROC.ESTADO = '$p_estado' ";
                }

                if(!empty($p_no_tipo))
                {
                    $sql .= "AND PROC.PK_TIPO <> '$p_no_tipo' ";
                }

                $sql .= "ORDER BY PROC.PK_PROCESO DESC, PROC.PK_TIPO DESC";
                

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function crearProcesoMensual($p_anho, $p_mes, $p_tipo, $p_cod_emp, $p_inicio, $p_termino, $p_observacion, $p_usuario)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_INS_PROCESO_MENSUAL(
                            :p_anho,
                            :p_mes,
                            :p_tipo,
                            :p_cod_emp,
                            :p_inicio,
                            :p_termino,
                            :p_observacion,
                            :p_usuario,
                            :r_est,
                            :r_msg);END;");
        
        oci_bind_by_name($proc,"p_anho", $p_anho,-1,OCI_B_INT);
        oci_bind_by_name($proc,"p_mes", $p_mes, 2, SQLT_CHR);
        oci_bind_by_name($proc,"p_tipo", $p_tipo, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_emp", $p_cod_emp,20,SQLT_CHR);
        oci_bind_by_name($proc,"p_inicio", $p_inicio, 30, SQLT_CHR);
        oci_bind_by_name($proc,"p_termino", $p_termino, 30, SQLT_CHR);
        oci_bind_by_name($proc,"p_observacion", $p_observacion, 1000, SQLT_CHR);
        oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }


    public function modificarProcesoMensual($p_proceso, $p_tipo, $p_cod_emp, $p_inicio, $p_termino, $p_observacion, $p_usuario)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_UPD_PROCESO_MENSUAL(
                            :p_proceso,
                            :p_tipo,
                            :p_cod_emp,
                            :p_inicio,
                            :p_termino,
                            :p_observacion,
                            :p_usuario,
                            :r_est,
                            :r_msg);END;");
        
        oci_bind_by_name($proc,"p_proceso", $p_proceso, 20, SQLT_CHR);
        oci_bind_by_name($proc,"p_tipo", $p_tipo, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_emp", $p_cod_emp,20,SQLT_CHR);
        oci_bind_by_name($proc,"p_inicio", $p_inicio, 30, SQLT_CHR);
        oci_bind_by_name($proc,"p_termino", $p_termino, 30, SQLT_CHR);
        oci_bind_by_name($proc,"p_observacion", $p_observacion, 1000, SQLT_CHR);
        oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }

    public function cargarDetalleProcesoMensual($p_anho, $p_mes, $p_cod_emp, $p_estado, $p_tipo, $p_rol, $p_usuario) {
        
       
        $sql = "SELECT 
                    PROC.PK_TIPO,
                    PROC.PK_PROCESO, 
                    PROC.PFK_COD_EMP, 
                    EMP.NOMBRE NOM_EMP,
                    PROC.ESTADO, 
                    TO_CHAR(PROC.INICIO, 'YYYY/MM/DD HH24:MI') INICIO, 
                    TO_CHAR(PROC.TERMINO, 'YYYY/MM/DD HH24:MI') TERMINO, 
                    TO_CHAR(PROC.INICIO, 'YYYY/MM/DD') INICIO_DATE, 
                    TO_CHAR(PROC.TERMINO, 'YYYY/MM/DD') TERMINO_DATE,
                    TO_CHAR(PROC.INICIO, 'HH24:MI') INICIO_HH, 
                    TO_CHAR(PROC.TERMINO, 'HH24:MI') TERMINO_HH,  
                    TO_CHAR(PROC.FECHA_CREACION, 'YYYY/MM/DD HH24:MI') FECHA_CREACION, 
                    PROC.USR_CREADOR, 
                    TO_CHAR(PROC.FECHA_MODIFICO, 'YYYY/MM/DD HH24:MI') FECHA_MODIFICO, 
                    PROC.USR_MODIFICO,
                    PROC.OBSERVACION,
                    PROC.ANHO,
                    PROC.MES,
                    (
                        SELECT COUNT(*) 
                        FROM NOV_PROC_MENSUAL_CC CC
                        WHERE CC.ESTADO = 'EN ESPERA'
                        AND cc.pfk_cod_emp = proc.pfk_cod_emp
                        AND cc.pfk_proceso = proc.pk_proceso
                        AND cc.pfk_tipo = proc.pk_tipo ";
                        if(!empty($p_rol) && $p_rol != 'ADMIN' && $p_rol != 'SUPER_ADMIN' && $p_rol != 'ANALISTA_RRHH'){
                            $sql .= "AND CC.PK_COD_CC IN (
                                SELECT PFK_COD_CC 
                                FROM NOV_USUARIOS_CC 
                                WHERE PFK_USUARIO = '$p_usuario'
                                AND PFK_COD_EMP = '$p_cod_emp' )";
                        }
        $sql .= ") CC_ESPERA,
                    (
                        SELECT COUNT(*) 
                        FROM NOV_PROC_MENSUAL_CC CC
                        WHERE CC.ESTADO = 'TERMINADO'
                        AND cc.pfk_cod_emp = proc.pfk_cod_emp
                        AND cc.pfk_proceso = proc.pk_proceso
                        AND cc.pfk_tipo = proc.pk_tipo ";
                        if(!empty($p_rol) && $p_rol != 'ADMIN' && $p_rol != 'SUPER_ADMIN' && $p_rol != 'ANALISTA_RRHH'){
                            $sql .= "AND CC.PK_COD_CC IN (
                                SELECT PFK_COD_CC 
                                FROM NOV_USUARIOS_CC 
                                WHERE PFK_USUARIO = '$p_usuario'
                                AND PFK_COD_EMP = '$p_cod_emp' )";
                        }
        $sql .= ") CC_TERMINADO,
                    (
                        SELECT COUNT(*) 
                        FROM NOV_PROC_MENSUAL_PERSONS per
                        WHERE per.ESTADO = 'EN ESPERA'
                        AND per.pfk_cod_emp = proc.pfk_cod_emp
                        AND per.pfk_proceso = proc.pk_proceso
                        AND per.pfk_tipo = proc.pk_tipo ";
                        if(!empty($p_rol) && $p_rol != 'ADMIN' && $p_rol != 'SUPER_ADMIN' && $p_rol != 'ANALISTA_RRHH'){
                            $sql .= "AND per.PFK_COD_CC IN (
                                SELECT PFK_COD_CC 
                                FROM NOV_USUARIOS_CC 
                                WHERE PFK_USUARIO = '$p_usuario'
                                AND PFK_COD_EMP = '$p_cod_emp' )";
                        }
        $sql .= ") PERSONA_ESPERA,
                    (
                        SELECT COUNT(*) 
                        FROM NOV_PROC_MENSUAL_PERSONS per
                        WHERE per.ESTADO = 'TERMINADO'
                        AND per.pfk_cod_emp = proc.pfk_cod_emp
                        AND per.pfk_proceso = proc.pk_proceso
                        AND per.pfk_tipo = proc.pk_tipo ";
                        if(!empty($p_rol) && $p_rol != 'ADMIN' && $p_rol != 'SUPER_ADMIN' && $p_rol != 'ANALISTA_RRHH'){
                            $sql .= "AND per.PFK_COD_CC IN (
                                SELECT PFK_COD_CC 
                                FROM NOV_USUARIOS_CC 
                                WHERE PFK_USUARIO = '$p_usuario'
                                AND PFK_COD_EMP = '$p_cod_emp' )";
                        }
        $sql .= ") PERSONA_TERMINADO
                FROM NOV_PROC_MENSUAL PROC, NOV_EMPRESAS EMP  
                WHERE PROC.PFK_COD_EMP = EMP.PK_COD_EMP ";

                if(!empty($p_cod_emp))
                {
                    $sql .= "AND PROC.PFK_COD_EMP = '$p_cod_emp' ";
                }

                if(!empty($p_anho))
                {
                    $sql .= "AND PROC.ANHO = '$p_anho' ";
                }

                if(!empty($p_mes))
                {
                    $sql .= "AND PROC.MES = '$p_mes' ";
                }

                if(!empty($p_tipo))
                {
                    $sql .= "AND PROC.PK_TIPO = '$p_tipo' ";
                }

                if(!empty($p_estado))
                {
                    $sql .= "AND PROC.ESTADO = '$p_estado' ";
                }

                $sql .= "ORDER BY PROC.PK_PROCESO DESC, PROC.PK_TIPO DESC";
                

        $query = $this->db->query($sql);
        return $query->result();
    }


    public function cargarCCProcesoMensual($p_proceso, $p_cod_emp, $p_tipo, $p_cod_cc, $p_nom_cc){
        $sql = "SELECT 
                    PFK_PROCESO, 
                    PFK_COD_EMP, 
                    PK_COD_CC, 
                    PFK_TIPO, 
                    NOM_CC, 
                    ESTADO, 
                    TO_CHAR(FECHA_CREACION, 'YYYY/MM/DD HH24:MI') FECHA_CREACION, 
                    USR_CREADOR, 
                    TO_CHAR(FECHA_MODIFICO, 'YYYY/MM/DD HH24:MI') FECHA_MODIFICO, 
                    USR_MODIFICO,
                    cc.PK_COD_CC || '-' || CC.NOM_CC || ' (' || CC.ESTADO || ')' DESC_CC
                FROM NOV_PROC_MENSUAL_CC CC
                WHERE 1 = 1 ";

                if(!empty($p_cod_emp))
                {
                    $sql .= "AND PFK_COD_EMP = '$p_cod_emp' ";
                }

                if(!empty($p_proceso))
                {
                    $sql .= "AND PFK_PROCESO = '$p_proceso' ";
                }

                if(!empty($p_tipo))
                {
                    $sql .= "AND PFK_TIPO = '$p_tipo' ";
                }

                if(!empty($p_cod_cc))
                {
                    $sql .= "AND UPPER(PK_COD_CC) LIKE(UPPER('%$p_cod_cc%')) ";
                }

                if(!empty($p_nom_cc))
                {
                    $sql .= "AND UPPER(NOM_CC) LIKE(UPPER('%$p_nom_cc%')) ";
                }

                $sql .= "ORDER BY PK_COD_CC ASC ";

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function cargarPersonasProcesoMensual($p_proceso, $p_cod_emp, $p_tipo, $p_cod_cc, $p_rut){
        $sql = "SELECT 
                    PFK_PROCESO, 
                    PFK_COD_EMP, 
                    PFK_COD_CC, 
                    PK_RUT, 
                    NOM_CC, 
                    NOMBRE, 
                    COD_CARGO, 
                    NOM_CARGO, 
                    ESTADO, 
                    USR_CREADOR, 
                    FECHA_CREACION, 
                    USR_MODIFICO, 
                    FECHA_MODIFICO, 
                    PFK_TIPO
                FROM NOV_PROC_MENSUAL_PERSONS
                WHERE 1 = 1 ";

                if(!empty($p_cod_emp))
                {
                    $sql .= "AND PFK_COD_EMP = '$p_cod_emp' ";
                }

                if(!empty($p_proceso))
                {
                    $sql .= "AND PFK_PROCESO = '$p_proceso' ";
                }

                if(!empty($p_tipo))
                {
                    $sql .= "AND PFK_TIPO = '$p_tipo' ";
                }

                if(!empty($p_cod_cc))
                {
                    $sql .= "AND UPPER(PFK_COD_CC) LIKE(UPPER('%$p_cod_cc%')) ";
                }

                if(!empty($p_rut))
                {
                    $sql .= "AND PK_RUT = '$p_rut' ";
                }

                $sql .= "ORDER BY PFK_COD_CC ASC, NOMBRE ASC";

        $query = $this->db->query($sql);
        return $query->result();
        
    }

    public function cargarPersonasProcesoMensualPorUsuario($p_usuario, $p_rol, $p_cod_emp, $p_cod_cc, $p_desc, $p_estado){
        $sql = "SELECT 
                    procPER.PFK_PROCESO, 
                    procPER.PFK_COD_EMP, 
                    procPER.PFK_COD_CC, 
                    procPER.PK_RUT, 
                    procPER.NOM_CC, 
                    procPER.NOMBRE, 
                    procPER.COD_CARGO, 
                    procPER.NOM_CARGO, 
                    procPER.ESTADO, 
                    procPER.USR_CREADOR, 
                    procPER.FECHA_CREACION, 
                    procPER.USR_MODIFICO, 
                    procPER.FECHA_MODIFICO, 
                    procPER.PFK_TIPO
                FROM NOV_PROC_MENSUAL_PERSONS procPER, nov_proc_mensual PROC
                WHERE 1 = 1 
                AND procper.pfk_proceso = proc.pk_proceso
                AND procper.pfk_cod_emp = PROC.PFK_COD_EMP
                AND PROCPER.PFK_TIPO = PROC.PK_TIPO ";
                
                if(!empty($p_rol) && $p_rol != 'ADMIN' && $p_rol != 'SUPER_ADMIN' && $p_rol != 'ANALISTA_RRHH'){
                    $sql .= "AND PROCPER.PFK_COD_CC IN (
                        SELECT PFK_COD_CC 
                        FROM NOV_USUARIOS_CC 
                        WHERE PFK_USUARIO = '$p_usuario'
                        AND PFK_COD_EMP = '$p_cod_emp' 
                    )";
                }

                if(!empty($p_desc)){
                    $sql .= "AND (PROCPER.PK_RUT LIKE ('%$p_desc%') 
                                OR UPPER(PROCPER.NOMBRE) LIKE (UPPER('%$p_desc%'))) ";
                }

                if(!empty($p_cod_cc)){
                    $sql .= "AND PROCPER.PFK_COD_CC = '$p_cod_cc' ";
                }

                if(!empty($p_estado)){
                    $sql .= "AND PROCPER.ESTADO = '$p_estado' ";
                }
                $sql .= "AND PROC.ESTADO = 'EN ESPERA'
                AND PROC.PFK_COD_EMP = '$p_cod_emp' 
                ORDER BY PFK_COD_CC ASC, NOMBRE ASC ";

            
        $query = $this->db->query($sql);
        return $query->result();

    }
    

    public function cargarCCProcesoMensualPorUsuario($p_usuario, $p_rol, $p_cod_emp){

        $sql = "SELECT 
                    CC.PFK_PROCESO, 
                    CC.PFK_COD_EMP, 
                    cc.PK_COD_CC,
                    CC.NOM_CC, 
                    CC.ESTADO, 
                    CC.USR_CREADOR, 
                    CC.FECHA_CREACION, 
                    CC.USR_MODIFICO, 
                    CC.FECHA_MODIFICO, 
                    CC.PFK_TIPO,
                    cc.PK_COD_CC || '-' || CC.NOM_CC || ' (' || CC.ESTADO || ')' DESC_CC
                FROM NOV_PROC_MENSUAL_CC CC, nov_proc_mensual PROC
                WHERE 1 = 1 
                AND CC.pfk_proceso = proc.pk_proceso
                AND CC.pfk_cod_emp = PROC.PFK_COD_EMP
                AND CC.PFK_TIPO = PROC.PK_TIPO ";

                if(!empty($p_rol) && $p_rol != 'ADMIN' && $p_rol != 'SUPER_ADMIN' && $p_rol != 'ANALISTA_RRHH'){
                    $sql .= "AND CC.PK_COD_CC IN (
                        SELECT PFK_COD_CC 
                        FROM NOV_USUARIOS_CC 
                        WHERE PFK_USUARIO = '$p_usuario'
                        AND PFK_COD_EMP = '$p_cod_emp' 
                    )";
                }
                $sql .= "AND PROC.PFK_COD_EMP = '$p_cod_emp' 
                        AND PROC.ESTADO = 'EN ESPERA'
                ORDER BY PK_COD_CC ASC";

        $query = $this->db->query($sql);
        return $query->result();
    }


    public function cargarConceptosPersonaProcesoMensual($p_proceso, $p_cod_emp, $p_tipo, $p_cod_cc, $p_rut, $p_grupo){

        $sql = "SELECT 
                    PFK_PROCESO,
                    PFK_COD_EMP,
                    PFK_RUT,
                    PFK_COD_CC,
                    PFK_COD_CONCEPTO,
                    VALOR,
                    USR_CREADOR,
                    FECHA_CREACION,
                    USR_MODIFICO,
                    FECHA_MODIFICO,
                    PFK_TIPO,
                    NOM_CONCEPTO,
                    TIPO_CONCEPTO,
                    GRUPO_CONCEPTO,
                    RANGO_INI,
                    RANGO_FIN,
                    MESES,
                    TIPO_MES,
                    OBS_TIPO_CONCEPTO,
                    NVL(
                    --obtiene el valor del proceso del mes anterior
                    (
                        SELECT X2.VALOR
                        FROM nov_proc_mensual_conceptos X2
                        WHERE X2.PFK_PROCESO = TO_CHAR(ADD_MONTHS(TO_DATE('$p_proceso', 'YYYY/MM'), -1), 'YYYY/MM')
                        AND X2.PFK_COD_EMP = '$p_cod_emp'
                        AND X2.PFK_TIPO = '$p_tipo'
                        AND X2.PFK_COD_CC = '$p_cod_cc'
                        AND X2.PFK_RUT = '$p_rut'
                        AND X2.GRUPO_CONCEPTO = '$p_grupo'
                        AND X2.PFK_COD_CONCEPTO = X1.PFK_COD_CONCEPTO
                    ), 
                    -- si no existe proceso anterior se obtiene el valor inicial por defecto
                    (
                        SELECT x2.inicial
                        FROM nov_conceptos X2
                        WHERE x2.pfk_cod_emp = '$p_cod_emp'
                        AND x2.fk_grupo_concepto = '$p_grupo'
                        AND x2.pk_cod_concepto = X1.PFK_COD_CONCEPTO
                    )) valor_anterior    
                FROM nov_proc_mensual_conceptos x1
                WHERE PFK_PROCESO = '$p_proceso'
                AND PFK_COD_EMP = '$p_cod_emp'
                AND PFK_TIPO = '$p_tipo'
                AND PFK_COD_CC = '$p_cod_cc'
                AND PFK_RUT = '$p_rut'
                AND GRUPO_CONCEPTO = '$p_grupo' 
                ORDER BY NOM_CONCEPTO ASC ";

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function modificarValorConceptoPersonaProcesoMensual($p_proceso, $p_tipo, $p_cod_emp, $p_cod_cc, $p_rut, $p_cod_concepto, $p_usuario, $p_valor)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_UPD_PROC_MENSUAL_CONCEPTO(
                            :p_proceso,
                            :p_tipo,
                            :p_cod_emp,
                            :p_cod_cc,
                            :p_rut,
                            :p_cod_concepto,
                            :p_usuario,
                            :p_valor,
                            :r_est,
                            :r_msg);END;");
        
        oci_bind_by_name($proc,"p_proceso", $p_proceso, 20, SQLT_CHR);
        oci_bind_by_name($proc,"p_tipo", $p_tipo, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_emp", $p_cod_emp,20,SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_cc", $p_cod_cc, 20, SQLT_CHR);
        oci_bind_by_name($proc,"p_rut", $p_rut, 20, SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_concepto", $p_cod_concepto, 20, SQLT_CHR);
        oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_valor", $p_valor, 100, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }


    public function modificarEstadoProcMensual($p_proceso, $p_tipo, $p_cod_emp, $p_estado, $p_usuario)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_EST_PROC_MENSUAL(
                            :p_proceso,
                            :p_tipo,
                            :p_cod_emp,
                            :p_estado,
                            :p_usuario,
                            :r_est,
                            :r_msg);END;");
        
        oci_bind_by_name($proc,"p_proceso", $p_proceso, 20, SQLT_CHR);
        oci_bind_by_name($proc,"p_tipo", $p_tipo, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_emp", $p_cod_emp,20,SQLT_CHR);
        oci_bind_by_name($proc,"p_estado", $p_estado, 20, SQLT_CHR);
        oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }
    

    public function modificarEstadoProcMensualCC($p_proceso, $p_tipo, $p_cod_emp, $p_cod_cc, $p_estado, $p_usuario)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_EST_PROC_MENSUAL_CC(
                            :p_proceso,
                            :p_tipo,
                            :p_cod_emp,
                            :p_cod_cc,
                            :p_estado,
                            :p_usuario,
                            :r_est,
                            :r_msg);END;");
        
        oci_bind_by_name($proc,"p_proceso", $p_proceso, 20, SQLT_CHR);
        oci_bind_by_name($proc,"p_tipo", $p_tipo, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_emp", $p_cod_emp,20,SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_cc", $p_cod_cc, 20, SQLT_CHR);
        oci_bind_by_name($proc,"p_estado", $p_estado, 20, SQLT_CHR);
        oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }

    public function modificarEstadoProcMensualPerson($p_proceso, $p_tipo, $p_cod_emp, $p_cod_cc, $p_rut, $p_estado, $p_usuario)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_EST_PROC_MENSUAL_PERSON(
                            :p_proceso,
                            :p_tipo,
                            :p_cod_emp,
                            :p_cod_cc,
                            :p_rut,
                            :p_estado,
                            :p_usuario,
                            :r_est,
                            :r_msg);END;");
        
        oci_bind_by_name($proc,"p_proceso", $p_proceso, 20, SQLT_CHR);
        oci_bind_by_name($proc,"p_tipo", $p_tipo, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_emp", $p_cod_emp,20,SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_cc", $p_cod_cc, 20, SQLT_CHR);
        oci_bind_by_name($proc,"p_rut", $p_rut, 20, SQLT_CHR);
        oci_bind_by_name($proc,"p_estado", $p_estado, 20, SQLT_CHR);
        oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }

    public function exportarProcesoMensualRRHH($p_proceso, $p_tipo, $p_cod_emp, $p_cod_cc){
        $sql = "SELECT 
                cc.pk_cod_cc COD_CC, 
                cc.NOM_CC, 
                per.COD_CARGO, 
                per.NOM_CARGO, 
                per.pk_rut RUT, 
                per.NOMBRE, 
                per.TIPO_CONTRATO, 
                per.JORNADA, 
                per.COD_SINDICATO, 
                per.NOM_SINDICATO, 
                per.COD_ADHERIDO, 
                per.NOM_ADHERIDO, 
                con.GRUPO_CONCEPTO,
                con.TIPO_CONCEPTO,
                con.pfk_cod_concepto COD_CONCEPTO,
                con.NOM_CONCEPTO,
                con.OBS_TIPO_CONCEPTO,
                con.rango_ini VALOR_RANGO_INI,
                con.rango_fin VALOR_RANGO_FIN,
                
                decode(
                    con.tipo_concepto, 
                    'SELECCIONAR' , 
                    (
                            SELECT LISTAGG(val.VALOR, '; ') WITHIN GROUP (ORDER BY val.VALOR) AS valores
                            FROM nov_concepto_val val
                            WHERE val.pfk_cod_concepto = con.pfk_cod_concepto
                            AND val.pfk_cod_emp = '$p_cod_emp'
                            GROUP BY VAL.pfk_cod_concepto
                    ),
                    null) VALORES_SELECCIONAR,
                con.valor VALOR_A_CARGAR,

                '$p_cod_emp' COD_EMP,
                '$p_proceso' PROCESO,
                '$p_tipo' TIPO_PROCESO    

            FROM nov_proc_mensual_persons per, nov_proc_mensual_cc cc, nov_proc_mensual_conceptos con
            WHERE con.pfk_cod_cc = per.pfk_cod_cc
            and con.pfk_cod_emp = per.pfk_cod_emp
            and con.pfk_proceso = per.pfk_proceso
            and con.pfk_rut = per.pk_rut
            and con.pfk_tipo = per.pfk_tipo
            and con.pfk_cod_cc = cc.pk_cod_cc
            and con.pfk_cod_emp = cc.pfk_cod_emp
            and con.pfk_proceso = cc.pfk_proceso
            and con.pfk_tipo = cc.pfk_tipo
            and con.pfk_proceso = '$p_proceso' 
            and con.pfk_cod_emp = '$p_cod_emp'
            and con.pfk_tipo = '$p_tipo'
            and con.pfk_cod_cc = '$p_cod_cc'
            ORDER BY cc.pk_cod_cc,
                per.cod_cargo, 
                per.pk_rut, 
                con.grupo_concepto,
                con.tipo_concepto,
                con.pfk_cod_concepto";

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function importarProcesoMensualPersonalizado($p_proceso, $p_tipo, $p_cod_emp, $p_usuario, $data) {
 
        $this->db->query(
            "DELETE FROM NOV_IMPORT_PROC_MENSUAL_BASIC 
            WHERE USUARIO = '$p_usuario' ");

        $res = $this->db->insert_batch('NOV_IMPORT_PROC_MENSUAL_BASIC',$data);


        if($res){
            return TRUE;
        }else{
            return FALSE;
        }
 
    }

    public function importarProcesoMensual($p_proceso, $p_tipo, $p_cod_emp, $p_usuario, $data) {
 
        $this->db->query(
            "DELETE FROM NOV_IMPORT_PROCESO_MENSUAL 
            WHERE USUARIO = '$p_usuario' ");

        $res = $this->db->insert_batch('NOV_IMPORT_PROCESO_MENSUAL',$data);


        if($res){
            return TRUE;
        }else{
            return FALSE;
        }
 
    }

    public function validarImportarProcesoPersonalizado($p_proceso, $p_tipo, $p_cod_emp, $p_usuario){
        $sql ="SELECT 
                    RUT,
                    COD_CONCEPTO,
                    VALOR,
                    CASE WHEN VALOR IS NULL 
                        THEN 'SIN VALOR' ELSE 
                    (CASE WHEN VAL_EXISTENCIA_CONCEPTO(COD_CONCEPTO, RUT, COD_EMP, PROCESO, TIPO_PROCESO) = 0 
                        THEN 'NO EXISTE EN PROCESO' ELSE
                    (CASE WHEN is_numeric_positive(VALOR) <> 1 
                        THEN 'FORMATO INCORRECTO' ELSE 
                    (CASE WHEN VAL_VALOR_CONCEPTO(COD_CONCEPTO, COD_EMP, VALOR) = 0 
                        THEN 'VALOR INCORRECTO' ELSE 'OK' END) END) END) END as MENSAJE
                    
                FROM nov_import_proc_mensual_basic
                WHERE TIPO_PROCESO = '$p_tipo' 
                and PROCESO = '$p_proceso'
                and USUARIO = '$p_usuario' 
                and cod_emp = '$p_cod_emp'";

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function resumenValidarImportarProcesoPersonalizado($p_proceso, $p_tipo, $p_cod_emp, $p_usuario){
        $sql ="SELECT MENSAJE, COUNT(*) CONTAR
                FROM (SELECT 
                        RUT,
                        COD_CONCEPTO,
                        VALOR,
                        CASE WHEN VALOR IS NULL 
                            THEN 'SIN VALOR' ELSE 
                        (CASE WHEN VAL_EXISTENCIA_CONCEPTO(COD_CONCEPTO, RUT, COD_EMP, PROCESO, TIPO_PROCESO) = 0 
                            THEN 'NO EXISTE EN PROCESO' ELSE
                        (CASE WHEN is_numeric_positive(VALOR) <> 1 
                            THEN 'FORMATO INCORRECTO' ELSE 
                        (CASE WHEN VAL_VALOR_CONCEPTO(COD_CONCEPTO, COD_EMP, VALOR) = 0 
                            THEN 'VALOR INCORRECTO' ELSE 'OK' END) END) END) END as MENSAJE
                        
                    FROM nov_import_proc_mensual_basic
                    WHERE TIPO_PROCESO = '$p_tipo' 
                    and PROCESO = '$p_proceso'
                    and USUARIO = '$p_usuario' 
                    and cod_emp = '$p_cod_emp')
                GROUP BY MENSAJE ";

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function validarImportarProceso($p_proceso, $p_tipo, $p_cod_emp, $p_usuario, $p_cod_cc){
        $sql = "SELECT 
                    NVL(CON.PFK_COD_CC, IMP.COD_CC) COD_CC, 
                    IMP.NOM_CC, 
                    IMP.COD_CARGO,
                    IMP.NOM_CARGO,
                    NVL(CON.PFK_RUT, IMP.RUT) RUT,
                    IMP.NOMBRE,
                    IMP.TIPO_CONTRATO, 
                    IMP.JORNADA, 
                    IMP.COD_SINDICATO, 
                    IMP.NOM_SINDICATO, 
                    IMP.COD_ADHERIDO, 
                    IMP.NOM_ADHERIDO, 
                    IMP.GRUPO_CONCEPTO,
                    IMP.TIPO_CONCEPTO,
                    NVL(CON.PFK_COD_CONCEPTO, IMP.COD_CONCEPTO) COD_CONCEPTO,
                    IMP.NOM_CONCEPTO,
                    IMP.OBS_TIPO_CONCEPTO,
                    IMP.VALOR_RANGO_INI,
                    IMP.VALOR_RANGO_FIN,
                    IMP.VALORES_SELECCIONAR,
                    IMP.VALOR_A_CARGAR,
                    CASE WHEN IMP.COD_CC IS NULL THEN 'CONCEPTO FALTANTE' ELSE 
                    (CASE WHEN IMP.VALOR_A_CARGAR IS NULL THEN 'SIN VALOR' ELSE 
                    (CASE WHEN is_numeric_positive(IMP.VALOR_A_CARGAR) <> 1 THEN 'FORMATO INCORRECTO' ELSE 
                    (CASE WHEN VAL_VALOR_CONCEPTO(IMP.COD_CONCEPTO, '$p_cod_emp', IMP.VALOR_A_CARGAR) = 0 
                    THEN 'VALOR INCORRECTO' ELSE 'OK' END) END) END) END as MENSAJE
                    
                FROM nov_import_proceso_mensual IMP, NOV_PROC_MENSUAL_CONCEPTOs CON
                WHERE imp.cod_cc(+) = con.pfk_cod_cc
                AND imp.rut(+) = con.pfk_rut
                and imp.cod_concepto(+) = con.pfk_cod_concepto
                and con.pfk_tipo = '$p_tipo'
                and con.pfk_proceso = '$p_proceso'
                and con.pfk_cod_emp = '$p_cod_emp' 
                and con.pfk_cod_cc = '$p_cod_cc' 
                and (imp.TIPO_PROCESO = '$p_tipo' or imp.TIPO_PROCESO is null)
                and (imp.PROCESO = '$p_proceso' or imp.PROCESO is null)
                and (imp.USUARIO = '$p_usuario' or imp.USUARIO is null)
                and (imp.cod_emp = '$p_cod_emp' or imp.cod_emp is null)";

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function resumenValidarImportarProceso($p_proceso, $p_tipo, $p_cod_emp, $p_usuario, $p_cod_cc){

        $sql = "SELECT MENSAJE, COUNT(*) CONTAR
            FROM(
                SELECT 
                    CASE WHEN IMP.COD_CC IS NULL THEN 'CONCEPTO FALTANTE' ELSE 
                    (CASE WHEN IMP.VALOR_A_CARGAR IS NULL THEN 'SIN VALOR' ELSE 
                    (CASE WHEN is_numeric_positive(IMP.VALOR_A_CARGAR) <> 1 THEN 'FORMATO INCORRECTO' ELSE 
                    (CASE WHEN VAL_VALOR_CONCEPTO(IMP.COD_CONCEPTO, '$p_cod_emp', IMP.VALOR_A_CARGAR) = 0 
                    THEN 'VALOR INCORRECTO' ELSE 'OK' END) END) END) END AS MENSAJE
                    
                FROM nov_import_proceso_mensual IMP, NOV_PROC_MENSUAL_CONCEPTOs CON
                WHERE imp.cod_cc(+) = con.pfk_cod_cc
                AND imp.rut(+) = con.pfk_rut
                and imp.cod_concepto(+) = con.pfk_cod_concepto
                and con.pfk_tipo = '$p_tipo'
                and con.pfk_proceso = '$p_proceso'
                and con.pfk_cod_emp = '$p_cod_emp'
                and con.pfk_cod_cc = '$p_cod_cc'
                and (imp.TIPO_PROCESO = '$p_tipo' or imp.TIPO_PROCESO is null)
                and (imp.PROCESO = '$p_proceso' or imp.PROCESO is null)
                and (imp.USUARIO = '$p_usuario' or imp.USUARIO is null)
                and (imp.cod_emp = '$p_cod_emp' or imp.cod_emp is null))
                GROUP BY MENSAJE";
        $query = $this->db->query($sql);
        return $query->result();
    }

    public function guardarValoresImportacion($p_proceso, $p_tipo, $p_cod_emp, $p_usuario, $p_cod_cc)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_UPD_IMPORTAR_PROC_MENSUAL(
                            :p_proceso,
                            :p_tipo,
                            :p_cod_emp,
                            :p_usuario,
                            :p_cod_cc,
                            :r_est,
                            :r_msg);END;");
        
        oci_bind_by_name($proc,"p_proceso", $p_proceso, 20, SQLT_CHR);
        oci_bind_by_name($proc,"p_tipo", $p_tipo, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_emp", $p_cod_emp,20,SQLT_CHR);
        oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_cc", $p_cod_cc, 100, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }

    public function guardarValoresImportacionPersonalizada($p_proceso, $p_tipo, $p_cod_emp, $p_usuario)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_UPD_IMPORT_PROC_MEN_BASIC(
                            :p_proceso,
                            :p_tipo,
                            :p_cod_emp,
                            :p_usuario,
                            :r_est,
                            :r_msg);END;");
        
        oci_bind_by_name($proc,"p_proceso", $p_proceso, 20, SQLT_CHR);
        oci_bind_by_name($proc,"p_tipo", $p_tipo, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_emp", $p_cod_emp,20,SQLT_CHR);
        oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }

    public function borrarProcesoMensual($p_proceso, $p_tipo, $p_cod_emp, $p_usuario)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_DEL_PROC_MENSUAL(
                            :p_proceso,
                            :p_tipo,
                            :p_cod_emp,
                            :p_usuario,
                            :r_est,
                            :r_msg);END;");
        
        oci_bind_by_name($proc,"p_proceso", $p_proceso, 20, SQLT_CHR);
        oci_bind_by_name($proc,"p_tipo", $p_tipo, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_emp", $p_cod_emp,20,SQLT_CHR);
        oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }
    
    public function cargarValidacionCC($p_proceso, $p_cod_emp) {
        $sql = "SELECT PFK_PROCESO,
                    PFK_COD_EMP,
                    PK_INDEX,
                    COD_CC,
                    ESTADO,
                    NOM_CC,
                    CANTIDAD_CONCEPTOS,
                    CANTIDAD_PERSONAS
                FROM nov_proc_mensual_val_cc
                WHERE PFK_PROCESO = '$p_proceso'
                AND PFK_COD_EMP = '$p_cod_emp' 
                ORDER BY ESTADO DESC, COD_CC ASC";

        $query = $this->db->query($sql);
        return $query->result();
    }


    public function terminarAllCC($p_proceso, $p_tipo, $p_cod_emp, $p_usuario)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_TER_ALL_CC_PROC_MENSUAL(
                            :p_proceso,
                            :p_tipo,
                            :p_cod_emp,
                            :p_usuario,
                            :r_est,
                            :r_msg);END;");
        
        oci_bind_by_name($proc,"p_proceso", $p_proceso, 20, SQLT_CHR);
        oci_bind_by_name($proc,"p_tipo", $p_tipo, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_emp", $p_cod_emp,20,SQLT_CHR);
        oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }

    public function agregarFaltantesProcMensual($p_proceso, $p_tipo, $p_cod_emp, $p_usuario)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_INS_PROC_MENSUAL_FALTANTE(
                            :p_proceso,
                            :p_tipo,
                            :p_cod_emp,
                            :p_usuario,
                            :r_est,
                            :r_msg);END;");
        
        oci_bind_by_name($proc,"p_proceso", $p_proceso, 20, SQLT_CHR);
        oci_bind_by_name($proc,"p_tipo", $p_tipo, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_emp", $p_cod_emp,20,SQLT_CHR);
        oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }


    public function cargarTrabajadoresFaltantesProcMensual($p_proceso, $p_tipo, $p_cod_emp){
        $sql = "SELECT 
                    PER.COD_CC PFK_COD_CC, 
                    CC.NOMBRE NOM_CC,
                    PER.RUT PK_RUT,
                    PER.NOMBRE NOMBRE,
                    PER.COD_CARGO COD_CARGO,
                    PER.NOM_CARGO NOM_CARGO,
                    PER.TIPO_CONTRATO,
                    PER.JORNADA,
                    per.cod_sindicato,
                    per.nom_sindicato,
                    per.cod_adh_sindicador,
                    per.nom_adh_sindicato,
                    per.fecha_ingreso
                FROM 
                    NOV_PERSONAL PER, 
                    NOV_CENTRO_COSTOS CC,   
                    (
                        select pk_rut
                        from nov_proc_mensual_persons
                        where pfk_proceso = '$p_proceso'
                        AND pfk_cod_emp = '$p_cod_emp'
                        and pfk_tipo= '$p_tipo'
                    ) PROPER
                WHERE PER.COD_CC = CC.PK_COD_CC
                AND PER.COD_EMP = CC.PFK_COD_EMP
                AND PER.RUT = PROPER.PK_RUT(+)
                AND PER.COD_EMP = '$p_cod_emp'
                AND CC.ESTADO = 'A'
                AND (
                    PER.FECHA_BAJA IS NULL 
                    OR TO_CHAR(PER.FECHA_BAJA, 'YYYY/MM') = '$p_proceso'
                )
                AND upper(PER.ROL) NOT IN(upper('ROL PRIVADO'))
                AND PROPER.PK_RUT IS NULL 
                ORDER BY PER.COD_CC, PER.RUT";

        $query = $this->db->query($sql);
        return $query->result();
    } 

    public function cargarConceptosFaltantesProcMensual($p_proceso, $p_tipo, $p_cod_emp){

        $grupos = "";

        if($p_tipo == 'RRHH') {
            $grupos = "'HABER', 'BDI', 'DESCUENTO'";
        }else{
            $grupos = "'HABER', 'BDI'";
        }

        $sql = "SELECT 
                    PER.PFK_COD_CC PFK_COD_CC, 
                    PER.PK_RUT PFK_RUT, 
                    con.pk_cod_concepto PFK_COD_CONCEPTO, 
                    con.nombre NOM_CONCEPTO,  
                    con.inicial VALOR_INICIAL, 
                    con.FK_TIPO TIPO,
                    con.FK_GRUPO_CONCEPTO GRUPO,
                    con.RANGO_INI,
                    con.RANGO_FIN,
                    con.MESES,
                    con.FK_TIPO_MES TIPO_MES,
                    tip.observacion OBS_TIPO_CONCEPTO
                FROM 
                    nov_proc_mensual_persons PER, 
                    NOV_CONCEPTOS CON, 
                    nov_conceptos_cc CC, 
                    NOV_TIPO_CONCEPTOS TIP, 
                    nov_proc_mensual_conceptos PROCON
                WHERE PER.PFK_COD_EMP = CC.PFK_COD_EMP
                AND PER.PFK_COD_EMP = con.pfk_cod_emp
                AND PER.PFK_COD_CC = CC.PFK_COD_CC
                AND con.pk_cod_concepto = cc.pfk_cod_concepto
                AND con.fk_tipo = tip.pk_tipo_concepto
                AND PER.PFK_COD_EMP = PROCON.PFK_COD_EMP
                AND PER.pfk_proceso = PROCON.pfk_proceso
                AND PER.pfk_tipo = PROCON.pfk_tipo
                AND PER.PFK_COD_EMP = '$p_cod_emp'
                AND per.pfk_proceso = '$p_proceso'
                AND per.pfk_tipo = '$p_tipo'
                AND CON.ESTADO = 'A'
                AND CC.PFK_COD_CONCEPTO = procon.pfk_cod_concepto(+)
                AND CC.PFK_COD_CC = procon.PFK_COD_CC(+)
                AND con.fk_grupo_concepto IN (".$grupos.")
                AND procon.pfk_cod_concepto IS NULL
                AND VAL_TIPO_MES_CONCEPTO(CON.FK_TIPO_MES, CON.MESES) = 0
                ORDER BY PER.PFK_COD_CC, PER.PK_RUT, con.pk_cod_concepto ";

        $query = $this->db->query($sql);
        return $query->result();
    } 

    public function refrescarTrabajadorProcMensual($p_proceso, $p_tipo, $p_cod_emp, $p_usuario, $p_rut)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_REFRESCAR_PROC_MENSUAL(
                            :p_proceso,
                            :p_tipo,
                            :p_cod_emp,
                            :p_usuario,
                            :p_rut,
                            :r_est,
                            :r_msg);END;");
        
        oci_bind_by_name($proc,"p_proceso", $p_proceso, 20, SQLT_CHR);
        oci_bind_by_name($proc,"p_tipo", $p_tipo, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_emp", $p_cod_emp,20,SQLT_CHR);
        oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_rut", $p_rut,20,SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }

    public function cargarCCProcesoMensualPorUsuarioEstado($p_usuario, $p_rol, $p_cod_emp, $p_estado){

        $sql = "SELECT 
                    CC.PFK_PROCESO, 
                    CC.PFK_COD_EMP, 
                    cc.PK_COD_CC,
                    CC.NOM_CC, 
                    CC.ESTADO, 
                    CC.USR_CREADOR, 
                    CC.FECHA_CREACION, 
                    CC.USR_MODIFICO, 
                    CC.FECHA_MODIFICO, 
                    CC.PFK_TIPO,
                    cc.PK_COD_CC || '-' || CC.NOM_CC || ' (' || CC.ESTADO || ')' DESC_CC
                FROM NOV_PROC_MENSUAL_CC CC, nov_proc_mensual PROC
                WHERE 1 = 1 
                AND CC.pfk_proceso = proc.pk_proceso
                AND CC.pfk_cod_emp = PROC.PFK_COD_EMP
                AND CC.PFK_TIPO = PROC.PK_TIPO 
                AND CC.ESTADO = '$p_estado' ";
                
                if(!empty($p_rol) && $p_rol != 'ADMIN' && $p_rol != 'SUPER_ADMIN' && $p_rol != 'ANALISTA_RRHH'){
                    $sql .= "AND CC.PK_COD_CC IN (
                        SELECT PFK_COD_CC 
                        FROM NOV_USUARIOS_CC 
                        WHERE PFK_USUARIO = '$p_usuario'
                        AND PFK_COD_EMP = '$p_cod_emp' 
                    )";
                }
                $sql .= "AND PROC.PFK_COD_EMP = '$p_cod_emp' 
                        AND PROC.ESTADO = 'EN ESPERA'
                ORDER BY PK_COD_CC ASC";

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function cargarPersonasProcesoMensualPorUsuarioEstado($p_usuario, $p_rol, $p_cod_emp, $p_estado){
        $sql = "SELECT 
                    procPER.PFK_PROCESO, 
                    procPER.PFK_COD_EMP, 
                    procPER.PFK_COD_CC, 
                    procPER.PK_RUT, 
                    procPER.NOM_CC, 
                    procPER.NOMBRE, 
                    procPER.COD_CARGO, 
                    procPER.NOM_CARGO, 
                    procPER.ESTADO, 
                    procPER.USR_CREADOR, 
                    procPER.FECHA_CREACION, 
                    procPER.USR_MODIFICO, 
                    procPER.FECHA_MODIFICO, 
                    procPER.PFK_TIPO
                FROM NOV_PROC_MENSUAL_PERSONS procPER, nov_proc_mensual PROC
                WHERE 1 = 1 
                AND procper.pfk_proceso = proc.pk_proceso
                AND procper.pfk_cod_emp = PROC.PFK_COD_EMP
                AND PROCPER.PFK_TIPO = PROC.PK_TIPO ";
                
                if(!empty($p_rol) && $p_rol != 'ADMIN' && $p_rol != 'SUPER_ADMIN' && $p_rol != 'ANALISTA_RRHH'){
                    $sql .= "AND PROCPER.PFK_COD_CC IN (
                        SELECT PFK_COD_CC 
                        FROM NOV_USUARIOS_CC 
                        WHERE PFK_USUARIO = '$p_usuario'
                        AND PFK_COD_EMP = '$p_cod_emp' 
                    )";
                }

                if(!empty($p_estado)){
                    $sql .= "AND PROCPER.ESTADO = '$p_estado' ";
                }
                $sql .= "AND PROC.ESTADO = 'EN ESPERA'
                AND PROC.PFK_COD_EMP = '$p_cod_emp' 
                ORDER BY PFK_COD_CC ASC, NOMBRE ASC ";

            
        $query = $this->db->query($sql);
        return $query->result();

    }
}
