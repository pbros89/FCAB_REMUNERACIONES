<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class PresupuestoModel extends CI_Model {

    public function __construct() {
        parent::__construct();
        $this->load->database("BD_NOVEDADES");
    }

    public function cargarPresupuestos($p_anho, $p_cod_emp, $p_estado, $p_tipo) {
        $sql = "SELECT 
                    PRE.PK_TIPO,
                    PRE.PK_ANHO, 
                    PRE.PFK_COD_EMP, 
                    EMP.NOMBRE NOM_EMP,
                    PRE.ESTADO, 
                    TO_CHAR(PRE.INICIO, 'YYYY/MM/DD HH24:MI') INICIO, 
                    TO_CHAR(PRE.TERMINO, 'YYYY/MM/DD HH24:MI') TERMINO, 
                    TO_CHAR(PRE.INICIO, 'YYYY/MM/DD') INICIO_DATE, 
                    TO_CHAR(PRE.TERMINO, 'YYYY/MM/DD') TERMINO_DATE,
                    TO_CHAR(PRE.INICIO, 'HH24:MI') INICIO_HH, 
                    TO_CHAR(PRE.TERMINO, 'HH24:MI') TERMINO_HH,  
                    TO_CHAR(PRE.FECHA_CREACION, 'YYYY/MM/DD HH24:MI') FECHA_CREACION, 
                    PRE.USR_CREADOR, 
                    TO_CHAR(PRE.FECHA_MODIFICO, 'YYYY/MM/DD HH24:MI') FECHA_MODIFICO, 
                    PRE.USR_MODIFICO,
                    PRE.OBSERVACION
                FROM NOV_PRESUP PRE, NOV_EMPRESAS EMP  
                WHERE PRE.PFK_COD_EMP = EMP.PK_COD_EMP ";

                if(!empty($p_cod_emp))
                {
                    $sql .= "AND PRE.PFK_COD_EMP = '$p_cod_emp' ";
                }

                if(!empty($p_anho))
                {
                    $sql .= "AND PRE.PK_ANHO = '$p_anho' ";
                }

                if(!empty($p_tipo))
                {
                    $sql .= "AND PRE.PK_TIPO = '$p_tipo' ";
                }

                if(!empty($p_estado))
                {
                    $sql .= "AND PRE.ESTADO = '$p_estado' ";
                }

                $sql .= "ORDER BY PRE.PK_ANHO DESC, PRE.PK_TIPO DESC";
                

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function crearPresupuesto($p_anho, $p_tipo, $p_cod_emp, $p_inicio, $p_termino, $p_observacion, $p_usuario)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_INS_PRESUP(
                            :p_anho,
                            :p_tipo,
                            :p_cod_emp,
                            :p_inicio,
                            :p_termino,
                            :p_observacion,
                            :p_usuario,
                            :r_est,
                            :r_msg);END;");
        
        oci_bind_by_name($proc,"p_anho", $p_anho,-1,OCI_B_INT);
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


    public function modificarPresupuesto($p_anho, $p_tipo, $p_cod_emp, $p_inicio, $p_termino, $p_observacion, $p_usuario)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_UPD_PRESUP(
                            :p_anho,
                            :p_tipo,
                            :p_cod_emp,
                            :p_inicio,
                            :p_termino,
                            :p_observacion,
                            :p_usuario,
                            :r_est,
                            :r_msg);END;");
        
        oci_bind_by_name($proc,"p_anho", $p_anho, -1, OCI_B_INT);
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

    public function cargarDetallePresup($p_anho, $p_cod_emp, $p_estado, $p_tipo, $p_rol, $p_usuario) {
        
       
        $sql = "SELECT 
                    PRE.PK_TIPO,
                    PRE.PK_ANHO, 
                    PRE.PFK_COD_EMP, 
                    EMP.NOMBRE NOM_EMP,
                    PRE.ESTADO, 
                    TO_CHAR(PRE.INICIO, 'YYYY/MM/DD HH24:MI') INICIO, 
                    TO_CHAR(PRE.TERMINO, 'YYYY/MM/DD HH24:MI') TERMINO, 
                    TO_CHAR(PRE.INICIO, 'YYYY/MM/DD') INICIO_DATE, 
                    TO_CHAR(PRE.TERMINO, 'YYYY/MM/DD') TERMINO_DATE,
                    TO_CHAR(PRE.INICIO, 'HH24:MI') INICIO_HH, 
                    TO_CHAR(PRE.TERMINO, 'HH24:MI') TERMINO_HH,  
                    TO_CHAR(PRE.FECHA_CREACION, 'YYYY/MM/DD HH24:MI') FECHA_CREACION, 
                    PRE.USR_CREADOR, 
                    TO_CHAR(PRE.FECHA_MODIFICO, 'YYYY/MM/DD HH24:MI') FECHA_MODIFICO, 
                    PRE.USR_MODIFICO,
                    PRE.OBSERVACION,
                    (
                        SELECT COUNT(*) 
                        FROM NOV_PRESUP_CC CC
                        WHERE CC.ESTADO = 'EN ESPERA'
                        AND cc.pfk_cod_emp = PRE.pfk_cod_emp
                        AND cc.pfk_anho = PRE.PK_ANHO
                        AND cc.pfk_tipo = PRE.pk_tipo ";
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
                        FROM NOV_PRESUP_CC CC
                        WHERE CC.ESTADO = 'TERMINADO'
                        AND cc.pfk_cod_emp = PRE.pfk_cod_emp
                        AND cc.pfk_ANHO = PRE.PK_ANHO
                        AND cc.pfk_tipo = PRE.pk_tipo ";
                        if(!empty($p_rol) && $p_rol != 'ADMIN' && $p_rol != 'SUPER_ADMIN' && $p_rol != 'ANALISTA_RRHH'){
                            $sql .= "AND CC.PK_COD_CC IN (
                                SELECT PFK_COD_CC 
                                FROM NOV_USUARIOS_CC 
                                WHERE PFK_USUARIO = '$p_usuario'
                                AND PFK_COD_EMP = '$p_cod_emp' )";
                        }
        $sql .= ") CC_TERMINADO
                FROM NOV_PRESUP PRE, NOV_EMPRESAS EMP  
                WHERE PRE.PFK_COD_EMP = EMP.PK_COD_EMP ";

                if(!empty($p_cod_emp))
                {
                    $sql .= "AND PRE.PFK_COD_EMP = '$p_cod_emp' ";
                }

                if(!empty($p_anho))
                {
                    $sql .= "AND PRE.PK_ANHO = '$p_anho' ";
                }

                if(!empty($p_tipo))
                {
                    $sql .= "AND PRE.PK_TIPO = '$p_tipo' ";
                }

                if(!empty($p_estado))
                {
                    $sql .= "AND PRE.ESTADO = '$p_estado' ";
                }

                $sql .= "ORDER BY PRE.PK_ANHO DESC, PRE.PK_TIPO DESC";
                

        $query = $this->db->query($sql);
        return $query->result();
    }


    public function cargarCCPresup($p_anho, $p_cod_emp, $p_tipo, $p_cod_cc, $p_nom_cc){
        $sql = "SELECT 
                    PFK_ANHO, 
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
                FROM NOV_PRESUP_CC CC
                WHERE 1 = 1 ";

                if(!empty($p_cod_emp))
                {
                    $sql .= "AND PFK_COD_EMP = '$p_cod_emp' ";
                }

                if(!empty($p_anho))
                {
                    $sql .= "AND PFK_ANHO = '$p_anho' ";
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

    public function cargarCCPresupNo($p_anho, $p_cod_emp, $p_tipo, $p_cod_cc, $p_nom_cc) {
        $sql = "SELECT cc.pfk_cod_emp COD_EMP, cc.pk_cod_cc COD_CC, cc.nombre NOM_CC
                FROM (
                    SELECT * 
                    FROM NOV_PRESUP_CC cc2 
                    WHERE cc2.pfk_cod_emp = '$p_cod_emp' 
                    AND cc2.pfk_anho = '$p_anho'
                    AND cc2.pfk_tipo = '$p_tipo'
                ) usrcc, 
                nov_centro_costos cc
                WHERE cc.pk_cod_cc = usrcc.pk_cod_cc(+)
                AND cc.pfk_cod_emp = usrcc.pfk_cod_emp(+)
                AND cc.pfk_cod_emp = '$p_cod_emp'
                AND cc.estado = 'A'
                AND usrcc.PK_COD_CC IS NULL ";
                if(!empty($p_cod_cc))
                {
                    $sql .= "AND UPPER(cc.pk_cod_cc) LIKE(UPPER('%$p_cod_cc%')) ";
                }
                if(!empty($p_nom_cc))
                {
                    $sql .= "AND UPPER(cc.nombre) LIKE(UPPER('%$p_nom_cc%')) ";
                }

                $sql .= "ORDER BY CC.pk_cod_cc ";


        $query = $this->db->query($sql);
        return $query->result();
        
    }

    public function cargarDotacionesPresup($p_anho, $p_cod_emp, $p_tipo, $p_cod_cc){
        $sql = "SELECT 
                    PFK_ANHO,
                    PFK_COD_EMP,
                    PFK_TIPO,
                    PFK_COD_CC,
                    PK_COD_CARGO,
                    NOM_CARGO,
                    ROL,
                    DOTACION,
                    ENE,
                    FEB,
                    MAR,
                    ABR,
                    MAY,
                    JUN,
                    JUL,
                    AGO,
                    SEP,
                    OCT,
                    NOV,
                    DIC,
                    OBSERVACION,
                    USR_CREADOR,
                    FECHA_CREACION,
                    USR_MODIFICO,
                    FECHA_MODIFICO
                FROM NOV_PRESUP_DOTACION 
                WHERE 1 = 1 ";

                if(!empty($p_cod_emp))
                {
                    $sql .= "AND PFK_COD_EMP = '$p_cod_emp' ";
                }

                if(!empty($p_anho))
                {
                    $sql .= "AND PFK_ANHO = '$p_anho' ";
                }

                if(!empty($p_tipo))
                {
                    $sql .= "AND PFK_TIPO = '$p_tipo' ";
                }

                if(!empty($p_cod_cc))
                {
                    $sql .= "AND UPPER(PFK_COD_CC) LIKE(UPPER('%$p_cod_cc%')) ";
                }

                $sql .= "ORDER BY PFK_COD_CC ASC, PK_COD_CARGO ASC";

        $query = $this->db->query($sql);
        return $query->result();
        
    }

    
    public function cargarCCPresupPorUsuario($p_usuario, $p_rol, $p_cod_emp){

        $sql = "SELECT 
                    CC.PFK_ANHO, 
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
                FROM NOV_PRESUP_CC CC, nov_PRESUP PRE
                WHERE 1 = 1 
                AND CC.pfk_anho = PRE.pk_anho
                AND CC.pfk_cod_emp = PRE.PFK_COD_EMP
                AND CC.PFK_TIPO = PRE.PK_TIPO ";

                if(!empty($p_rol) && $p_rol != 'ADMIN' && $p_rol != 'SUPER_ADMIN' && $p_rol != 'ANALISTA_RRHH'){
                    $sql .= "AND CC.PK_COD_CC IN (
                        SELECT PFK_COD_CC 
                        FROM NOV_USUARIOS_CC 
                        WHERE PFK_USUARIO = '$p_usuario'
                        AND PFK_COD_EMP = '$p_cod_emp' 
                    )";
                }
                $sql .= "AND PRE.PFK_COD_EMP = '$p_cod_emp' 
                        AND PRE.ESTADO = 'EN ESPERA'
                ORDER BY PK_COD_CC ASC";

        $query = $this->db->query($sql);
        return $query->result();
    }


    
    
    public function modificarEstadoPresupuesto($p_anho, $p_tipo, $p_cod_emp, $p_estado, $p_usuario)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_EST_PRESUP(
                            :p_anho,
                            :p_tipo,
                            :p_cod_emp,
                            :p_estado,
                            :p_usuario,
                            :r_est,
                            :r_msg);END;");
        
        oci_bind_by_name($proc,"p_anho", $p_anho, -1, OCI_B_INT);
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

    public function crearPresupuestoCC($p_anho, $p_tipo, $p_cod_emp, $p_cod_cc, $p_usuario)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_INS_PRESUP_CC(
                            :p_anho,
                            :p_tipo,
                            :p_cod_emp,
                            :p_cod_cc,
                            :p_usuario,
                            :r_est,
                            :r_msg);END;");
        
        oci_bind_by_name($proc,"p_anho", $p_anho, 20, SQLT_CHR);
        oci_bind_by_name($proc,"p_tipo", $p_tipo, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_emp", $p_cod_emp,20,SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_cc", $p_cod_cc, 20, SQLT_CHR);
        oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }
    

    public function modificarEstadoPresupuestoCC($p_anho, $p_tipo, $p_cod_emp, $p_cod_cc, $p_estado, $p_usuario)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_EST_PRESUP_CC(
                            :p_anho,
                            :p_tipo,
                            :p_cod_emp,
                            :p_cod_cc,
                            :p_estado,
                            :p_usuario,
                            :r_est,
                            :r_msg);END;");
        
        oci_bind_by_name($proc,"p_anho", $p_anho, 20, SQLT_CHR);
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

    

    public function borrarPresupuesto($p_anho, $p_tipo, $p_cod_emp, $p_usuario)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_DEL_PRESUP(
                            :p_anho,
                            :p_tipo,
                            :p_cod_emp,
                            :p_usuario,
                            :r_est,
                            :r_msg);END;");
        
        oci_bind_by_name($proc,"p_anho", $p_anho, -1, OCI_B_INT);
        oci_bind_by_name($proc,"p_tipo", $p_tipo, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_emp", $p_cod_emp,20,SQLT_CHR);
        oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }
    


    public function terminarAllCC($p_anho, $p_tipo, $p_cod_emp, $p_usuario)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_TER_ALL_CC_PRESUPUESTO(
                            :p_anho,
                            :p_tipo,
                            :p_cod_emp,
                            :p_usuario,
                            :r_est,
                            :r_msg);END;");
        
        oci_bind_by_name($proc,"p_anho", $p_anho, -1, OCI_B_INT);
        oci_bind_by_name($proc,"p_tipo", $p_tipo, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_emp", $p_cod_emp,20,SQLT_CHR);
        oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
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

    public function crearPresupDotacion(
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
        $p_usuario)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_INS_PRESUP_DOTACION(
                            :p_anho,
                            :p_tipo,
                            :p_cod_emp,
                            :p_cod_cc,
                            :p_cod_cargo,
                            :p_nom_cargo,
                            :p_rol,
                            :p_dotacion,
                            :p_ene,
                            :p_feb,
                            :p_mar,
                            :p_abr,
                            :p_may,
                            :p_jun,
                            :p_jul,
                            :p_ago,
                            :p_sep,
                            :p_oct,
                            :p_nov,
                            :p_dic,
                            :p_observacion,
                            :p_usuario,
                            :r_est,
                            :r_msg);END;");
        
        oci_bind_by_name($proc,"p_anho", $p_anho, -1, OCI_B_INT);
        oci_bind_by_name($proc,"p_tipo", $p_tipo, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_emp", $p_cod_emp,20,SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_cc", $p_cod_cc,20,SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_cargo", $p_cod_cargo,20,SQLT_CHR);
        oci_bind_by_name($proc,"p_nom_cargo", $p_nom_cargo,100,SQLT_CHR);
        oci_bind_by_name($proc,"p_rol", $p_rol,100,SQLT_CHR);
        oci_bind_by_name($proc,"p_dotacion", $p_dotacion,-1, OCI_B_INT);

        oci_bind_by_name($proc,"p_ene", $p_ene);
        oci_bind_by_name($proc,"p_feb", $p_feb);
        oci_bind_by_name($proc,"p_mar", $p_mar);
        oci_bind_by_name($proc,"p_abr", $p_abr);
        oci_bind_by_name($proc,"p_may", $p_may);
        oci_bind_by_name($proc,"p_jun", $p_jun);
        oci_bind_by_name($proc,"p_jul", $p_jul);
        oci_bind_by_name($proc,"p_ago", $p_ago);
        oci_bind_by_name($proc,"p_sep", $p_sep);
        oci_bind_by_name($proc,"p_oct", $p_oct);
        oci_bind_by_name($proc,"p_nov", $p_nov);
        oci_bind_by_name($proc,"p_dic", $p_dic);

        oci_bind_by_name($proc,"p_observacion", $p_observacion,1000,SQLT_CHR);
        oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }

    public function modificarPresupDotacion(
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
        $p_usuario)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_UPD_PRESUP_DOTACION(
                            :p_anho,
                            :p_tipo,
                            :p_cod_emp,
                            :p_cod_cc,
                            :p_cod_cargo,
                            :p_dotacion,
                            :p_ene,
                            :p_feb,
                            :p_mar,
                            :p_abr,
                            :p_may,
                            :p_jun,
                            :p_jul,
                            :p_ago,
                            :p_sep,
                            :p_oct,
                            :p_nov,
                            :p_dic,
                            :p_observacion,
                            :p_usuario,
                            :r_est,
                            :r_msg);END;");
        
        oci_bind_by_name($proc,"p_anho", $p_anho, -1, OCI_B_INT);
        oci_bind_by_name($proc,"p_tipo", $p_tipo, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_emp", $p_cod_emp,20,SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_cc", $p_cod_cc,20,SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_cargo", $p_cod_cargo,20,SQLT_CHR);
        oci_bind_by_name($proc,"p_dotacion", $p_dotacion,-1, OCI_B_INT);

        oci_bind_by_name($proc,"p_ene", $p_ene,-1, OCI_B_INT);
        oci_bind_by_name($proc,"p_feb", $p_feb,-1, OCI_B_INT);
        oci_bind_by_name($proc,"p_mar", $p_mar,-1, OCI_B_INT);
        oci_bind_by_name($proc,"p_abr", $p_abr,-1, OCI_B_INT);
        oci_bind_by_name($proc,"p_may", $p_may,-1, OCI_B_INT);
        oci_bind_by_name($proc,"p_jun", $p_jun,-1, OCI_B_INT);
        oci_bind_by_name($proc,"p_jul", $p_jul,-1, OCI_B_INT);
        oci_bind_by_name($proc,"p_ago", $p_ago,-1, OCI_B_INT);
        oci_bind_by_name($proc,"p_sep", $p_sep,-1, OCI_B_INT);
        oci_bind_by_name($proc,"p_oct", $p_oct,-1, OCI_B_INT);
        oci_bind_by_name($proc,"p_nov", $p_nov,-1, OCI_B_INT);
        oci_bind_by_name($proc,"p_dic", $p_dic,-1, OCI_B_INT);

        oci_bind_by_name($proc,"p_observacion", $p_observacion,1000,SQLT_CHR);
        oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }

    public function eliminarPresupDotacion(
        $p_anho, 
        $p_tipo, 
        $p_cod_emp, 
        $p_cod_cc, 
        $p_cod_cargo, 
        $p_usuario)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_DEL_PRESUP_DOTACION(
                            :p_anho,
                            :p_tipo,
                            :p_cod_emp,
                            :p_cod_cc,
                            :p_cod_cargo,
                            :p_usuario,
                            :r_est,
                            :r_msg);END;");
        
        oci_bind_by_name($proc,"p_anho", $p_anho, -1, OCI_B_INT);
        oci_bind_by_name($proc,"p_tipo", $p_tipo, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_emp", $p_cod_emp,20,SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_cc", $p_cod_cc,20,SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_cargo", $p_cod_cargo,20,SQLT_CHR);
        oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }
}
