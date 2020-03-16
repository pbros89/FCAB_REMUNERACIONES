<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class EmpresaModel extends CI_Model {

    public function __construct() {
        parent::__construct();
        $this->load->database("BD_NOVEDADES");
    }

    public function cargarEmpresas($p_empresa, $p_estado) {
        $sql = "SELECT 
                    PK_COD_EMP, 
                    NOMBRE, 
                    ESTADO, 
                    TO_CHAR(FECHA_CREACION, 'YYYY/MM/DD HH24:MI') FECHA_CREACION, 
                    USR_CREADOR, 
                    TO_CHAR(FECHA_MODIFICO, 'YYYY/MM/DD HH24:MI') FECHA_MODIFICO, 
                    USR_MODIFICO
                FROM NOV_EMPRESAS 
                WHERE 1 = 1 ";

                if(!empty($p_empresa))
                {
                    $sql .= "AND PK_COD_EMP = '$p_empresa' ";
                }

                if(!empty($p_estado))
                {
                    $sql .= "AND ESTADO = '$p_estado' ";
                }
                $sql .= "ORDER BY NOMBRE ASC";
                

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function crearEmpresa($p_cod_emp, $p_nombre, $p_usuario, $p_estado)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_INS_EMPRESA(
                            :p_cod_emp,
                            :p_nombre,
                            :p_usuario,
                            :p_estado,
                            :r_est,
                            :r_msg);END;");
        
        oci_bind_by_name($proc,"p_cod_emp", $p_cod_emp,20,SQLT_CHR);
        oci_bind_by_name($proc,"p_nombre", $p_nombre, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_estado", $p_estado, 1, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }

    public function modificarEmpresa($p_cod_emp, $p_nombre, $p_usuario, $p_estado)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_UPD_EMPRESA(
                            :p_cod_emp,
                            :p_nombre,
                            :p_usuario,
                            :p_estado,
                            :r_est,
                            :r_msg);END;");
        
        oci_bind_by_name($proc,"p_cod_emp", $p_cod_emp,20,SQLT_CHR);
        oci_bind_by_name($proc,"p_nombre", $p_nombre, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_estado", $p_estado, 1, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }
    
}
