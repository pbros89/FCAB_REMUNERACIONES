<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class ContratoModel extends CI_Model {

    public function __construct() {
        parent::__construct();
        $this->load->database("BD_NOVEDADES");
    }

    public function cargarContratos($p_cod_emp, $p_estado) {
        $sql = "SELECT 
                    PK_ID,
                    PFK_COD_EMP,
                    NOMBRE,
                    CLIENTE,
                    ESTADO,
                    TO_CHAR(FECHA_CREACION, 'YYYY/MM/DD HH24:MI') FECHA_CREACION, 
                    USR_CREADOR,
                    TO_CHAR(FECHA_MODIFICACION, 'YYYY/MM/DD HH24:MI') FECHA_MODIFICACION,
                    USR_MODIFICO,
                    PK_ID || ' - ' || CLIENTE || ' - ' || NOMBRE INFO
                FROM NOV_CONTRATOS 
                WHERE PFK_COD_EMP = '$p_cod_emp' ";
        if(!empty($p_estado))
        {
            $sql .= "AND ESTADO = '$p_estado' ";
        }

        $sql .= "ORDER BY FECHA_MODIFICACION DESC";
                

        $query = $this->db->query($sql);
        return $query->result();
    }


    public function crearContrato($p_id, $p_cod_emp, $p_nombre, $p_cliente, $p_usuario, $p_estado)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_INS_CONTRATO(
                            :p_id,
                            :p_cod_emp,
                            :p_nombre,
                            :p_cliente,
                            :p_usuario,
                            :p_estado,
                            :r_est,
                            :r_msg);END;");
        
        oci_bind_by_name($proc,"p_id", $p_id, 100,SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_emp", $p_cod_emp, 20,SQLT_CHR);
        oci_bind_by_name($proc,"p_nombre", $p_nombre,1000,SQLT_CHR);
        oci_bind_by_name($proc,"p_cliente", $p_cliente, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_estado", $p_estado, 1, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }

    public function modificarContrato($p_id, $p_cod_emp, $p_nombre, $p_cliente, $p_usuario, $p_estado)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_UPD_CONTRATO(
                            :p_id,
                            :p_cod_emp,
                            :p_nombre,
                            :p_cliente,
                            :p_usuario,
                            :p_estado,
                            :r_est,
                            :r_msg);END;");
        
        oci_bind_by_name($proc,"p_id", $p_id, 100,SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_emp", $p_cod_emp, 20,SQLT_CHR);
        oci_bind_by_name($proc,"p_nombre", $p_nombre,1000,SQLT_CHR);
        oci_bind_by_name($proc,"p_cliente", $p_cliente, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_estado", $p_estado, 1, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }
    
}
