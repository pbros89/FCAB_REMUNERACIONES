<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class UsuarioModel extends CI_Model {

    public function __construct() {
        parent::__construct();
        $this->load->database("BD_NOVEDADES");
    }

    public function cargarUsuarios($p_usuario, $p_cod_emp, $p_rol, $p_estado) {
        $sql = "SELECT 
                    USR.PK_USUARIO, 
                    USR.PFK_COD_EMP, 
                    EMP.NOMBRE NOM_EMP,
                    USR.ROL,
                    USR.CORREO, 
                    USR.ESTADO, 
                    TO_CHAR(USR.FECHA_CREACION, 'YYYY/MM/DD HH24:MI') FECHA_CREACION, 
                    USR.USR_CREADOR, 
                    TO_CHAR(USR.FECHA_MODIFICO, 'YYYY/MM/DD HH24:MI') FECHA_MODIFICO, 
                    USR.USR_MODIFICO
                FROM NOV_USUARIOS USR, NOV_EMPRESAS EMP
                WHERE 1 = 1 
                AND USR.PFK_COD_EMP = EMP.PK_COD_EMP ";
                if(!empty($p_usuario))
                {
                    $sql .= "AND UPPER(USR.PK_USUARIO) = UPPER('$p_usuario') ";
                }

                if(!empty($p_cod_emp))
                {
                    $sql .= "AND USR.PFK_COD_EMP = '$p_cod_emp' ";
                }

                if(!empty($p_rol))
                {
                    $sql .= "AND USR.ROL = '$p_rol' ";
                }

                if(!empty($p_estado))
                {
                    $sql .= "AND USR.ESTADO = '$p_estado' ";
                }
                $sql .= "ORDER BY USR.PK_USUARIO ASC, USR.PFK_COD_EMP ASC";
                

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function cargarRolesAcciones($p_rol, $p_pantalla, $p_accion) {
        $sql = "SELECT  
                    PFK_ROL,
                    PFK_PANTALLA,
                    PFK_ACCION,
                    ESTADO
                FROM NOV_ROLES_ACCIONES
                WHERE 1 = 1 ";
                if(!empty($p_rol))
                {
                    $sql .= "AND PFK_ROL = '$p_rol' ";
                }

                if(!empty($p_pantalla))
                {
                    $sql .= "AND PFK_PANTALLA = '$p_pantalla' ";
                }

                if(!empty($p_accion))
                {
                    $sql .= "AND PFK_ACCION = '$p_accion' ";
                }
                $sql .= "ORDER BY PFK_ROL ASC, PFK_PANTALLA ASC, PFK_ACCION ASC";
                

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function cargarRoles() {
        $sql = "SELECT PK_ROL, NOMBRE
                FROM NOV_ROLES 
                ORDER BY PK_ROL";
                

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function cargarUsuariosIntranet($p_usuario, $p_rut) {
        $sql = "SELECT 
                    rut_usuario, 
                    cod_emp, 
                    login_intranet
                FROM sg_as_usuario_vw 
                WHERE 1 = 1 ";

                if(!empty($p_usuario))
                {
                    $sql .= "AND UPPER(login_intranet) = UPPER('$p_usuario') ";
                }

                if(!empty($p_rut))
                {
                    $sql .= "AND rut_usuario = '$p_rut' ";
                }
        $sql .= "ORDER BY login_intranet ASC";

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function crearUsuario($p_login, $p_cod_emp, $p_rol, $p_correo, $p_usuario, $p_estado)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_INS_USUARIO(
                            :p_login,
                            :p_cod_emp,
                            :p_rol,
                            :p_correo,
                            :p_usuario,
                            :p_estado,
                            :r_est,
                            :r_msg);END;");
        
        oci_bind_by_name($proc,"p_login", $p_login, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_emp", $p_cod_emp,20,SQLT_CHR);
        oci_bind_by_name($proc,"p_rol", $p_rol, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_correo", $p_correo, 500, SQLT_CHR);
        oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_estado", $p_estado, 1, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }

    public function modificarUsuario($p_login, $p_cod_emp, $p_rol, $p_correo, $p_usuario, $p_estado)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_UPD_USUARIO(
                            :p_login,
                            :p_cod_emp,
                            :p_rol,
                            :p_correo,
                            :p_usuario,
                            :p_estado,
                            :r_est,
                            :r_msg);END;");
        
        oci_bind_by_name($proc,"p_login", $p_login, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_emp", $p_cod_emp,20,SQLT_CHR);
        oci_bind_by_name($proc,"p_rol", $p_rol, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_correo", $p_correo, 500, SQLT_CHR);
        oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_estado", $p_estado, 1, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }


    public function cargarCCUsuario($p_usuario, $p_cod_emp, $p_cod_cc, $p_nom_cc) {
        $sql = "SELECT cc.pfk_cod_emp COD_EMP, cc.pk_cod_cc COD_CC, cc.nombre NOM_CC
                FROM nov_usuarios_cc usrcc, nov_centro_costos cc
                WHERE usrcc.pfk_cod_cc = cc.pk_cod_cc
                AND usrcc.pfk_cod_emp = cc.pfk_cod_emp ";

                if(!empty($p_usuario))
                {
                    $sql .= "AND UPPER(usrcc.pfk_usuario) = UPPER('$p_usuario') ";
                }

                if(!empty($p_cod_emp))
                {
                    $sql .= "AND usrcc.pfk_cod_emp = '$p_cod_emp' ";
                }
                if(!empty($p_cod_cc))
                {
                    $sql .= "AND UPPER(cc.pk_cod_cc) LIKE(UPPER('%$p_cod_cc%')) ";
                }
                if(!empty($p_nom_cc))
                {
                    $sql .= "AND UPPER(cc.nombre) LIKE(UPPER('%$p_nom_cc%')) ";
                }

        $sql .= "ORDER BY usrcc.pfk_cod_emp ASC, usrcc.pfk_cod_cc ASC ";

        $query = $this->db->query($sql);
        return $query->result();
        
    }

    public function cargarCCUsuarioNo($p_usuario, $p_cod_emp, $p_cod_cc, $p_nom_cc) {
        $sql = "SELECT cc.pfk_cod_emp COD_EMP, cc.pk_cod_cc COD_CC, cc.nombre NOM_CC
                FROM (
                    SELECT * 
                    FROM nov_usuarios_cc cc2 
                    WHERE cc2.pfk_cod_emp = '$p_cod_emp' 
                    AND cc2.pfk_usuario = '$p_usuario'
                ) usrcc, 
                nov_centro_costos cc
                WHERE cc.pk_cod_cc = usrcc.pfk_cod_cc(+)
                AND cc.pfk_cod_emp = usrcc.pfk_cod_emp(+)
                AND cc.pfk_cod_emp = '$p_cod_emp'
                AND cc.estado = 'A'
                AND usrcc.PFK_COD_CC IS NULL ";
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

    public function crearUsuarioCC($p_login, $p_cod_emp, $p_cod_cc, $p_usuario)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_INS_USUARIO_CC(
                            :p_login,
                            :p_cod_emp,
                            :p_cod_cc,
                            :p_usuario,
                            :r_est,
                            :r_msg);END;");
        
        oci_bind_by_name($proc,"p_login", $p_login, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_emp", $p_cod_emp,20,SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_cc", $p_cod_cc, 20, SQLT_CHR);
        oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }

    public function eliminarUsuarioCC($p_login, $p_cod_emp, $p_cod_cc, $p_usuario)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_DEL_USUARIO_CC(
                            :p_login,
                            :p_cod_emp,
                            :p_cod_cc,
                            :p_usuario,
                            :r_est,
                            :r_msg);END;");
        
        oci_bind_by_name($proc,"p_login", $p_login, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_emp", $p_cod_emp,20,SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_cc", $p_cod_cc, 20, SQLT_CHR);
        oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }

    public function cargarRolesWf() {
        $sql = "SELECT  
                    PK_ROL_WF,
                    NOMBRE,
                    OBSERVACION
                FROM NOV_WF_ROLES 
                ORDER BY PK_ROL_WF ASC";
                

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function cargarRolesWfUsuario($p_usuario, $p_cod_emp, $p_rol_wf) {
        $sql = "SELECT  
                    rol.PK_ROL_WF,
                    rol.NOMBRE,
                    rol.OBSERVACION
                FROM NOV_WF_ROLES rol, NOV_WF_USUARIOS_ROLES usrrol
                WHERE rol.pk_rol_wf = usrrol.pfk_rol_wf ";
        if(!empty($p_usuario))
        {
            $sql .= "AND UPPER(usrrol.PFK_USUARIO) = UPPER('$p_usuario') ";
        }

        if(!empty($p_cod_emp))
        {
            $sql .= "AND usrrol.PFK_COD_EMP = '$p_cod_emp' ";
        }

        if(!empty($p_rol))
        {
            $sql .= "AND usrrol.PFK_ROL_WF = '$p_rol_wf' ";
        }

        $sql .= "ORDER BY PK_ROL_WF ASC";
                

        $query = $this->db->query($sql);
        return $query->result();
    }


    public function cargarRolesWfUsuarioNo($p_usuario, $p_cod_emp) {

        $sql = "SELECT  
                    rol.PK_ROL_WF,
                    rol.NOMBRE,
                    rol.OBSERVACION
                FROM NOV_WF_ROLES rol, 
                    (
                        SELECT *
                        FROM NOV_WF_USUARIOS_ROLES 
                        WHERE PFK_COD_EMP = '$p_cod_emp'
                        AND PFK_USUARIO = '$p_usuario'
                    ) usrrol
                WHERE rol.pk_rol_wf = usrrol.pfk_rol_wf(+) 
                AND usrrol.PFK_USUARIO IS NULL ";
        $sql .= "ORDER BY PK_ROL_WF ASC";
                

        $query = $this->db->query($sql);
        return $query->result();
    }

    
    public function crearUsuarioRolWF($p_login, $p_cod_emp, $p_rol_wf, $p_usuario)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_INS_USUARIO_ROL_WF(
                            :p_login,
                            :p_cod_emp,
                            :p_rol_wf,
                            :p_usuario,
                            :r_est,
                            :r_msg);END;");
        
        oci_bind_by_name($proc,"p_login", $p_login, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_emp", $p_cod_emp,20,SQLT_CHR);
        oci_bind_by_name($proc,"p_rol_wf", $p_rol_wf, 20, SQLT_CHR);
        oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }

    public function eliminarUsuarioRolWF($p_login, $p_cod_emp, $p_rol_wf, $p_usuario)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_DEL_USUARIO_ROL_WF(
                            :p_login,
                            :p_cod_emp,
                            :p_rol_wf,
                            :p_usuario,
                            :r_est,
                            :r_msg);END;");
        
        oci_bind_by_name($proc,"p_login", $p_login, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_emp", $p_cod_emp,20,SQLT_CHR);
        oci_bind_by_name($proc,"p_rol_wf", $p_rol_wf, 20, SQLT_CHR);
        oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }
    
}
