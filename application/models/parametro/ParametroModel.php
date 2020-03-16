<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class ParametroModel extends CI_Model {

    public function __construct() {
        parent::__construct();
        $this->load->database("BD_NOVEDADES");
    }

    public function cargarParametros($p_param, $p_cod_emp, $p_nombre, $p_estado, $p_tipo) {
        $sql = "SELECT 
                    PAR.PK_PARAM, 
                    PAR.PFK_COD_EMP, 
                    EMP.NOMBRE NOM_EMP,
                    PAR.NOMBRE NOM_PARAM, 
                    PAR.ESTADO, 
                    TO_CHAR(PAR.FECHA_CREACION, 'YYYY/MM/DD HH24:MI') FECHA_CREACION, 
                    PAR.USR_CREADOR, 
                    TO_CHAR(PAR.FECHA_MODIFICO, 'YYYY/MM/DD HH24:MI') FECHA_MODIFICO, 
                    PAR.USR_MODIFICO,
                    PAR.PFK_TIPO_PARAM
                FROM NOV_PARAMETROS PAR, NOV_EMPRESAS EMP  
                WHERE PAR.PFK_COD_EMP = EMP.PK_COD_EMP ";

                if(!empty($p_param))
                {
                    $sql .= "AND PAR.PK_PARAM LIKE(UPPER('%$p_param%')) ";
                }

                if(!empty($p_cod_emp))
                {
                    $sql .= "AND PAR.PFK_COD_EMP = '$p_cod_emp' ";
                }

                if(!empty($p_nombre))
                {
                    $sql .= "AND UPPER(PAR.NOMBRE) LIKE(UPPER('%$p_nombre%')) ";
                }

                if(!empty($p_estado))
                {
                    $sql .= "AND PAR.ESTADO = '$p_estado' ";
                }

                if(!empty($p_tipo))
                {
                    $sql .= "AND PAR.PFK_TIPO_PARAM = '$p_tipo' ";
                }
                $sql .= "ORDER BY PAR.PK_PARAM ASC, PAR.NOMBRE ASC";
                

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function cargarParametrosFiltro($p_cod_emp, $p_tipo) {
        $sql = "SELECT 
                    PAR.PK_PARAM CODIGO,
                    PAR.PK_PARAM || ' - ' || PAR.NOMBRE NOMBRE, 
                    PAR.PFK_TIPO_PARAM TIPO_PARAM
                FROM NOV_PARAMETROS PAR 
                WHERE PAR.ESTADO = 'A' ";


                if(!empty($p_cod_emp))
                {
                    $sql .= "AND PAR.PFK_COD_EMP = '$p_cod_emp' ";
                }

                if(!empty($p_tipo))
                {
                    $sql .= "AND PAR.PFK_TIPO_PARAM = '$p_tipo' ";
                }
                $sql .= "ORDER BY PAR.PK_PARAM ASC";
                

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function cargarTiposParam() {
        $sql = "SELECT PK_TIPO_PARAM, NOMBRE, DESCRIPCION
                FROM NOV_TIPO_PARAM 
                ORDER BY NOMBRE";
                

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function crearParametro($p_param, $p_cod_emp, $p_nombre, $p_usuario, $p_estado, $p_tipo)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_INS_PARAM(
                            :p_param,
                            :p_cod_emp,
                            :p_nombre,
                            :p_usuario,
                            :p_estado,
                            :p_tipo,
                            :r_est,
                            :r_msg);END;");
        
        oci_bind_by_name($proc,"p_param", $p_param, 20, SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_emp", $p_cod_emp, 20,SQLT_CHR);
        oci_bind_by_name($proc,"p_nombre", $p_nombre, 200, SQLT_CHR);
        oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_estado", $p_estado, 1, SQLT_CHR);
        oci_bind_by_name($proc,"p_tipo", $p_tipo, 20, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }

    public function modificarParametro($p_param, $p_cod_emp, $p_nombre, $p_usuario, $p_estado, $p_tipo)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_UPD_PARAM(
                            :p_param,
                            :p_cod_emp,
                            :p_nombre,
                            :p_usuario,
                            :p_estado,
                            :p_tipo,
                            :r_est,
                            :r_msg);END;");
        
        oci_bind_by_name($proc,"p_param", $p_param, 20, SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_emp", $p_cod_emp, 20,SQLT_CHR);
        oci_bind_by_name($proc,"p_nombre", $p_nombre, 200, SQLT_CHR);
        oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_estado", $p_estado, 1, SQLT_CHR);
        oci_bind_by_name($proc,"p_tipo", $p_tipo, 20, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }
    
}
