<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class HaberRRLLModel extends CI_Model {

    public function __construct() {
        parent::__construct();
        $this->load->database("BD_NOVEDADES");
    }

    public function cargarHaberesRRLL($p_cod, $p_cod_emp, $p_tipo, $p_nombre, $p_estado) {
        $sql = "SELECT 
                    HAB.PK_COD, 
                    HAB.PFK_COD_EMP, 
                    HAB.FK_TIPO, 
                    HAB.NOMBRE NOM_EMP,
                    HAB.NOMBRE NOM_DESCUENTO, 
                    HAB.OBSERVACION, 
                    HAB.USA_FECHA,
                    HAB.ESTADO, 
                    TO_CHAR(HAB.FECHA_CREACION, 'YYYY/MM/DD HH24:MI') FECHA_CREACION, 
                    HAB.USR_CREADOR, 
                    TO_CHAR(HAB.FECHA_MODIFICO, 'YYYY/MM/DD HH24:MI') FECHA_MODIFICO, 
                    HAB.USR_MODIFICO
                FROM NOV_HABERES_RRLL HAB, NOV_EMPRESAS EMP  
                WHERE HAB.PFK_COD_EMP = EMP.PK_COD_EMP ";

                if(!empty($p_cod))
                {
                    $sql .= "AND HAB.PK_COD LIKE(UPPER('%$p_cod%')) ";
                }

                if(!empty($p_cod_emp))
                {
                    $sql .= "AND HAB.PFK_COD_EMP = '$p_cod_emp' ";
                }

                if(!empty($p_tipo))
                {
                    $sql .= "AND HAB.FK_TIPO = '$p_tipo' ";
                }

                if(!empty($p_nombre))
                {
                    $sql .= "AND UPPER(HAB.NOMBRE) LIKE(UPPER('%$p_nombre%')) ";
                }

                if(!empty($p_estado))
                {
                    $sql .= "AND HAB.ESTADO = '$p_estado' ";
                }
                $sql .= "ORDER BY HAB.PK_COD ASC, HAB.NOMBRE ASC";
                
        
        $query = $this->db->query($sql);
        return $query->result();
    }

    public function cargarHaberesRRLLFiltro($p_cod_emp, $p_tipo) {
        $sql = "SELECT 
                    HAB.PK_COD CODIGO, 
                    HAB.NOMBRE,
                    HAB.USA_FECHA 
                FROM NOV_HABERES_RRLL HAB  
                WHERE HAB.ESTADO = 'A' ";


                if(!empty($p_cod_emp))
                {
                    $sql .= "AND HAB.PFK_COD_EMP = '$p_cod_emp' ";
                }

                if(!empty($p_tipo))
                {
                    $sql .= "AND HAB.FK_TIPO = '$p_tipo' ";
                }

                $sql .= "ORDER BY HAB.NOMBRE ASC";
                
        
        $query = $this->db->query($sql);
        return $query->result();
    }

    public function crearHaberRRLL($p_cod, $p_cod_emp, $p_tipo, $p_nombre, $p_observacion, $p_usa_fecha,  $p_usuario, $p_estado)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_INS_HABERES_RRLL(
                            :p_cod,
                            :p_cod_emp,
                            :p_tipo,
                            :p_nombre,
                            :p_observacion,
                            :p_usa_fecha,
                            :p_usuario,
                            :p_estado,
                            :r_est,
                            :r_msg);END;");
        
        oci_bind_by_name($proc,"p_cod", $p_cod, 20, SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_emp", $p_cod_emp,20,SQLT_CHR);
        oci_bind_by_name($proc,"p_tipo", $p_tipo, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_nombre", $p_nombre, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_observacion", $p_observacion, 1000, SQLT_CHR);
        oci_bind_by_name($proc,"p_usa_fecha", $p_usa_fecha,-1,OCI_B_INT);
        oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_estado", $p_estado, 1, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }

    public function modificarHaberRRLL($p_cod, $p_cod_emp, $p_tipo, $p_nombre, $p_observacion, $p_usa_fecha, $p_usuario, $p_estado)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_UPD_HABERES_RRLL(
                            :p_cod,
                            :p_cod_emp,
                            :p_tipo,
                            :p_nombre,
                            :p_observacion,
                            :p_usa_fecha,
                            :p_usuario,
                            :p_estado,
                            :r_est,
                            :r_msg);END;");
        
        oci_bind_by_name($proc,"p_cod", $p_cod, 20, SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_emp", $p_cod_emp,20,SQLT_CHR);
        oci_bind_by_name($proc,"p_tipo", $p_tipo, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_nombre", $p_nombre, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_observacion", $p_observacion, 1000, SQLT_CHR);
        oci_bind_by_name($proc,"p_usa_fecha", $p_usa_fecha,-1,OCI_B_INT);
        oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_estado", $p_estado, 1, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }
}
