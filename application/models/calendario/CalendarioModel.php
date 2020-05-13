<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class CalendarioModel extends CI_Model {

    public function __construct() {
        parent::__construct();
        $this->load->database("BD_NOVEDADES");
    }

    public function cargarCalendarios($p_tipo, $p_anho, $p_mes, $p_dia, $p_estado) {
        $sql = "SELECT 
                    PK_TIPO,
                    PK_ANHO,
                    PK_MES,
                    PK_DIA,
                    OBSERVACION,
                    USR_MODIFICO,
                    USR_CREADOR,
                    ESTADO,
                    TO_CHAR(FECHA_CREACION, 'YYYY/MM/DD HH24:MI') FECHA_CREACION, 
                    TO_CHAR(FECHA_MODIFICO, 'YYYY/MM/DD HH24:MI') FECHA_MODIFICO
                FROM NOV_CALENDARIO
                WHERE 1 = 1 ";

                if(!empty($p_tipo))
                {
                    $sql .= "AND PK_TIPO = '$p_tipo' ";
                }

                if(!empty($p_anho))
                {
                    $sql .= "AND PK_ANHO = '$p_anho' ";
                }

                if(!empty($p_mes))
                {
                    $sql .= "AND PK_MES = '$p_mes' ";
                }

                if(!empty($p_dia))
                {
                    $sql .= "AND PK_DIA = '$p_dia' ";
                }

                if(!empty($p_estado))
                {
                    $sql .= "AND ESTADO = '$p_estado' ";
                }
                $sql .= "ORDER BY FECHA_CREACION DESC";
                

        $query = $this->db->query($sql);
        return $query->result();
    }


    public function crearCalendario($P_TIPO, $P_ANHO, $P_MES, $P_DIA, $P_OBS, $P_USUARIO, $P_ESTADO)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_INS_CALENDARIO(
                            :P_TIPO, 
                            :P_ANHO, 
                            :P_MES, 
                            :P_DIA, 
                            :P_OBS, 
                            :P_USUARIO, 
                            :P_ESTADO,
                            :r_est,
                            :r_msg);END;");
        
        oci_bind_by_name($proc,"P_TIPO", $P_TIPO, 20,SQLT_CHR);
        oci_bind_by_name($proc,"P_ANHO", $P_ANHO,20,SQLT_CHR);
        oci_bind_by_name($proc,"P_MES", $P_MES,20,SQLT_CHR);
        oci_bind_by_name($proc,"P_DIA", $P_DIA, 20, SQLT_CHR);
        oci_bind_by_name($proc,"P_OBS", $P_OBS, 1000, SQLT_CHR);
        oci_bind_by_name($proc,"P_USUARIO", $P_USUARIO, 100, SQLT_CHR);
        oci_bind_by_name($proc,"P_ESTADO", $P_ESTADO, 20, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }

    public function modificarCalendario($P_TIPO, $P_ANHO, $P_MES, $P_DIA, $P_OBS, $P_USUARIO, $P_ESTADO)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_UPD_CALENDARIO(
                            :P_TIPO, 
                            :P_ANHO, 
                            :P_MES, 
                            :P_DIA, 
                            :P_OBS, 
                            :P_USUARIO, 
                            :P_ESTADO,
                            :r_est,
                            :r_msg);END;");
        
        oci_bind_by_name($proc,"P_TIPO", $P_TIPO, 20,SQLT_CHR);
        oci_bind_by_name($proc,"P_ANHO", $P_ANHO,20,SQLT_CHR);
        oci_bind_by_name($proc,"P_MES", $P_MES,20,SQLT_CHR);
        oci_bind_by_name($proc,"P_DIA", $P_DIA, 20, SQLT_CHR);
        oci_bind_by_name($proc,"P_OBS", $P_OBS, 1000, SQLT_CHR);
        oci_bind_by_name($proc,"P_USUARIO", $P_USUARIO, 100, SQLT_CHR);
        oci_bind_by_name($proc,"P_ESTADO", $P_ESTADO, 20, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }
    
}
