<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class DescuentoRRLLModel extends CI_Model {

    public function __construct() {
        parent::__construct();
        $this->load->database("BD_NOVEDADES");
    }

    public function cargarDescuentosRRLL($p_cod, $p_cod_emp, $p_tipo, $p_nombre, $p_estado) {
        $sql = "SELECT 
                    DES.PK_COD, 
                    DES.PFK_COD_EMP, 
                    DES.FK_TIPO, 
                    EMP.NOMBRE NOM_EMP,
                    DES.NOMBRE NOM_DESCUENTO, 
                    DES.OBSERVACION, 
                    DES.ESTADO, 
                    TO_CHAR(DES.FECHA_CREACION, 'YYYY/MM/DD HH24:MI') FECHA_CREACION, 
                    DES.USR_CREADOR, 
                    TO_CHAR(DES.FECHA_MODIFICO, 'YYYY/MM/DD HH24:MI') FECHA_MODIFICO, 
                    DES.USR_MODIFICO
                FROM NOV_DESCUENTOS_RRLL DES, NOV_EMPRESAS EMP  
                WHERE DES.PFK_COD_EMP = EMP.PK_COD_EMP ";

                if(!empty($p_cod))
                {
                    $sql .= "AND DES.PK_COD LIKE(UPPER('%$p_cod%')) ";
                }

                if(!empty($p_cod_emp))
                {
                    $sql .= "AND DES.PFK_COD_EMP = '$p_cod_emp' ";
                }

                if(!empty($p_tipo))
                {
                    $sql .= "AND DES.FK_TIPO = '$p_tipo' ";
                }

                if(!empty($p_nombre))
                {
                    $sql .= "AND UPPER(DES.NOMBRE) LIKE(UPPER('%$p_nombre%')) ";
                }

                if(!empty($p_estado))
                {
                    $sql .= "AND DES.ESTADO = '$p_estado' ";
                }
                $sql .= "ORDER BY DES.PK_COD ASC, DES.NOMBRE ASC";
                
        
        $query = $this->db->query($sql);
        return $query->result();
    }

    public function cargarDescuentosRRLLFiltro($p_cod_emp, $p_tipo) {
        $sql = "SELECT 
                    DES.PK_COD CODIGO, 
                    DES.NOMBRE 
                FROM NOV_DESCUENTOS_RRLL DES  
                WHERE DES.ESTADO = 'A' ";


                if(!empty($p_cod_emp))
                {
                    $sql .= "AND DES.PFK_COD_EMP = '$p_cod_emp' ";
                }

                if(!empty($p_tipo))
                {
                    $sql .= "AND DES.FK_TIPO = '$p_tipo' ";
                }

                $sql .= "ORDER BY DES.NOMBRE ASC";
                
        
        $query = $this->db->query($sql);
        return $query->result();
    }

    public function crearDescuentoRRLL($p_cod, $p_cod_emp, $p_tipo, $p_nombre, $p_observacion, $p_usuario, $p_estado)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_INS_DESCUENTOS_RRLL(
                            :p_cod,
                            :p_cod_emp,
                            :p_tipo,
                            :p_nombre,
                            :p_observacion,
                            :p_usuario,
                            :p_estado,
                            :r_est,
                            :r_msg);END;");
        
        oci_bind_by_name($proc,"p_cod", $p_cod, 20, SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_emp", $p_cod_emp,20,SQLT_CHR);
        oci_bind_by_name($proc,"p_tipo", $p_tipo, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_nombre", $p_nombre, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_observacion", $p_observacion, 1000, SQLT_CHR);
        oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_estado", $p_estado, 1, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }

    public function modificarDescuentoRRLL($p_cod, $p_cod_emp, $p_tipo, $p_nombre, $p_observacion, $p_usuario, $p_estado)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_UPD_DESCUENTOS_RRL(
                            :p_cod,
                            :p_cod_emp,
                            :p_tipo,
                            :p_nombre,
                            :p_observacion,
                            :p_usuario,
                            :p_estado,
                            :r_est,
                            :r_msg);END;");
        
        oci_bind_by_name($proc,"p_cod", $p_cod, 20, SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_emp", $p_cod_emp,20,SQLT_CHR);
        oci_bind_by_name($proc,"p_tipo", $p_tipo, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_nombre", $p_nombre, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_observacion", $p_observacion, 1000, SQLT_CHR);
        oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_estado", $p_estado, 1, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }
}
