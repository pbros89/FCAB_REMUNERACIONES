<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class AusentismoModel extends CI_Model {

    public function __construct() {
        parent::__construct();
        $this->load->database("BD_NOVEDADES");
    }

    public function cargarAusentismo($p_cod_emp, $p_rut, $p_fec1, $p_fec2, $p_tipo) {
        $sql = "SELECT 
                    PK_ID,
                    FK_COD_EMP,
                    FK_PERSONAL,
                    RUT,
                    NOMBRE,
                    TIPO,
                    COD_AUSENTISMO,
                    NOMBRE_AUSENTISMO,
                    TO_CHAR(FECHA_INI, 'YYYY/MM/DD') FECHA_INI,
                    TO_CHAR(FECHA_FIN, 'YYYY/MM/DD') FECHA_FIN,
                    CANTIDAD_DIAS,
                    OBSERVACION,
                    USR_CREADOR,
                    TO_CHAR(FECHA_CREACION, 'YYYY/MM/DD') FECHA_CREACION,
                    ESTADO,
                    PERIODO
                FROM NOV_AUSENTISMO AUS 
                WHERE 1 = 1 ";

                if(!empty($p_cod_emp))
                {
                    $sql .= "AND AUS.FK_COD_EMP = '$p_cod_emp' ";
                }

                if(!empty($p_rut))
                {
                    $sql .= "AND AUS.RUT LIKE('%$p_rut%') ";
                }

                if(!empty($p_tipo))
                {
                    $sql .= "AND AUS.TIPO = '$p_tipo' ";
                }

                if(!empty($p_fec1) && !empty($p_fec2)){
                    $sql .= "AND FECHA_CREACION BETWEEN TO_DATE('$p_fec1', 'YYYY/MM/DD') ";
                    $sql .= "AND TO_DATE('$p_fec2', 'YYYY/MM/DD') ";
                }elseif (!empty($p_fec1)) {
                    $sql .= "AND TO_CHAR(FECHA_CREACION, 'YYYY/MM/DD') = '$p_fec1' ";
                }else{
                    $sql .= "AND TRUNC(FECHA_CREACION, 'MM') = TRUNC(SYSDATE, 'MM') ";
                }

                $sql .= "ORDER BY PK_ID DESC";
                

        $query = $this->db->query($sql);
        return $query->result();
    }


    public function crearAusentismo(
          $P_RUT 
        , $P_DV 
        , $P_COD_EMP 
        , $P_USUARIO 
        , $P_TIPO 
        , $P_COD_AUSENTISMO 
        , $P_NOMBRE_AUSENTISMO 
        , $P_FECHA_INI 
        , $P_FECHA_FIN
        , $P_OBSERVACION  
        , $P_LUN 
        , $P_MAR 
        , $P_MIE 
        , $P_JUE 
        , $P_VIE 
        , $P_SAB 
        , $P_DOM 
        , $P_NO_FERIADO 
        , $P_PERIODO 
        )
    
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_INS_AUSENTISMO(
                          :P_RUT 
                        , :P_DV 
                        , :P_COD_EMP 
                        , :P_USUARIO 
                        , :P_TIPO 
                        , :P_COD_AUSENTISMO 
                        , :P_NOMBRE_AUSENTISMO 
                        , :P_FECHA_INI 
                        , :P_FECHA_FIN 
                        , :P_OBSERVACION
                        , :P_LUN 
                        , :P_MAR 
                        , :P_MIE 
                        , :P_JUE 
                        , :P_VIE 
                        , :P_SAB 
                        , :P_DOM 
                        , :P_NO_FERIADO 
                        , :P_PERIODO
                        , :r_est
                        , :r_msg);END;");
        
        oci_bind_by_name($proc,"P_RUT", $P_RUT, 20,SQLT_CHR);
        oci_bind_by_name($proc,"P_DV", $P_DV, 1, SQLT_CHR);
        oci_bind_by_name($proc,"P_COD_EMP", $P_COD_EMP, 20,SQLT_CHR);
        oci_bind_by_name($proc,"P_USUARIO", $P_USUARIO, 100, SQLT_CHR);
        oci_bind_by_name($proc,"P_TIPO", $P_TIPO, 20, SQLT_CHR);
        oci_bind_by_name($proc,"P_COD_AUSENTISMO", $P_COD_AUSENTISMO, 20, SQLT_CHR);
        oci_bind_by_name($proc,"P_NOMBRE_AUSENTISMO", $P_NOMBRE_AUSENTISMO, 100, SQLT_CHR);
        oci_bind_by_name($proc,"P_FECHA_INI", $P_FECHA_INI, 50, SQLT_CHR);
        oci_bind_by_name($proc,"P_FECHA_FIN", $P_FECHA_FIN, 50, SQLT_CHR);
        oci_bind_by_name($proc,"P_OBSERVACION", $P_OBSERVACION, 1000, SQLT_CHR);
        oci_bind_by_name($proc,"P_LUN", $P_LUN, 1, SQLT_CHR);
        oci_bind_by_name($proc,"P_MAR", $P_MAR, 1, SQLT_CHR);
        oci_bind_by_name($proc,"P_MIE", $P_MIE, 1, SQLT_CHR);
        oci_bind_by_name($proc,"P_JUE", $P_JUE, 1, SQLT_CHR);
        oci_bind_by_name($proc,"P_VIE", $P_VIE, 1, SQLT_CHR);
        oci_bind_by_name($proc,"P_SAB", $P_SAB, 1, SQLT_CHR);
        oci_bind_by_name($proc,"P_DOM", $P_DOM, 1, SQLT_CHR);
        oci_bind_by_name($proc,"P_NO_FERIADO", $P_NO_FERIADO, 1, SQLT_CHR);
        oci_bind_by_name($proc,"P_PERIODO", $P_PERIODO, 20, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }


    public function terminarAusentismo(
        $P_COD 
      , $P_USUARIO )

    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_EST_AUSENTISMO(
                          :P_COD  
                        , :P_USUARIO
                        , :r_est
                        , :r_msg);END;");
        
        oci_bind_by_name($proc,"P_COD", $P_COD, -1, OCI_B_INT);
        oci_bind_by_name($proc,"P_USUARIO", $P_USUARIO, 100, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }

    public function eliminarAusentismo(
        $P_COD 
        , $P_USUARIO )

    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_DEL_AUSENTISMO(
                        :P_COD  
                        , :P_USUARIO
                        , :r_est
                        , :r_msg);END;");
        
        oci_bind_by_name($proc,"P_COD", $P_COD, -1, OCI_B_INT);
        oci_bind_by_name($proc,"P_USUARIO", $P_USUARIO, 100, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }

    public function anularAusentismo(
        $P_COD 
      , $P_USUARIO 
      , $P_OBS)

    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_ANU_AUSENTISMO(
                          :P_COD  
                        , :P_USUARIO
                        , :P_OBS
                        , :r_est
                        , :r_msg);END;");
        
        oci_bind_by_name($proc,"P_COD", $P_COD, -1, OCI_B_INT);
        oci_bind_by_name($proc,"P_USUARIO", $P_USUARIO, 100, SQLT_CHR);
        oci_bind_by_name($proc,"P_OBS", $P_OBS, 1000, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }
    
}
