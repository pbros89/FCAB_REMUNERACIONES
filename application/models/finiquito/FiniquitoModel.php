<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class FiniquitoModel extends CI_Model {

    public function __construct() {
        parent::__construct();
        $this->load->database("BD_NOVEDADES");
    }

    public function cargarFiniquitos($p_cod_emp, $p_rut, $p_fec1, $p_fec2, $p_estado) {
        $sql = "SELECT 
                    PK_FINIQUITO,
                    FK_PERSONAL,
                    RUT,
                    NOMBRE,
                    COD_CAUSAL,
                    NOM_CAUSAL,
                    to_char(FECHA_BAJA, 'yyyy/mm/dd') FECHA_BAJA,
                    USR_CREADOR,
                    to_char(FECHA_CREACION, 'yyyy/mm/dd') FECHA_CREACION,
                    USR_MODIFICO,
                    to_char(FECHA_MODIFICO, 'yyyy/mm/dd') FECHA_MODIFICO,
                    ESTADO,
                    FK_COD_EMP,
                    OBSERVACION
                FROM NOV_FINIQUITOS FIN 
                WHERE 1 = 1 ";

                if(!empty($p_cod_emp))
                {
                    $sql .= "AND FK_COD_EMP = '$p_cod_emp' ";
                }

                if(!empty($p_rut))
                {
                    $sql .= "AND RUT LIKE('%$p_rut%') ";
                }

                if(!empty($p_estado))
                {
                    $sql .= "AND ESTADO = '$p_estado' ";
                }

                if(!empty($p_fec1) && !empty($p_fec2)){
                    $sql .= "AND FECHA_BAJA BETWEEN TO_DATE('$p_fec1', 'YYYY/MM/DD') ";
                    $sql .= "AND TO_DATE('$p_fec2', 'YYYY/MM/DD') ";
                }elseif (!empty($p_fec1)) {
                    $sql .= "AND TO_CHAR(FECHA_BAJA, 'YYYY/MM/DD') = '$p_fec1' ";
                }

                $sql .= "ORDER BY PK_FINIQUITO DESC";
                

        $query = $this->db->query($sql);
        return $query->result();
    }


    public function crearFiniquito($p_rut, $p_dv, $p_cod_causal, $p_nom_causal, $p_fecha_baja, $p_cod_emp, $p_usuario, $p_obs)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_INS_FINIQUITO(
                            :p_rut,
                            :p_dv,
                            :p_cod_causal,
                            :p_nom_causal,
                            :p_fecha_baja,
                            :p_cod_emp,
                            :p_usuario,
                            :p_obs,
                            :r_est,
                            :r_msg);END;");
        
        oci_bind_by_name($proc,"p_rut", $p_rut, 20,SQLT_CHR);
        oci_bind_by_name($proc,"p_dv", $p_dv, 1, SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_causal", $p_cod_causal, 20, SQLT_CHR);
        oci_bind_by_name($proc,"p_nom_causal", $p_nom_causal, 200,SQLT_CHR);
        oci_bind_by_name($proc,"p_fecha_baja", $p_fecha_baja, 30, SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_emp", $p_cod_emp, 20,SQLT_CHR);
        oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_obs", $p_obs, 1000, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }


    public function editarFiniquito($p_finiquito,  $p_cod_causal, $p_nom_causal, $p_fecha_baja, $p_usuario, $p_obs)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_UPD_FINIQUITO(
                            :p_finiquito,
                            :p_cod_causal,
                            :p_nom_causal,
                            :p_fecha_baja,
                            :p_usuario,
                            :p_obs,
                            :r_est,
                            :r_msg);END;");
        
        oci_bind_by_name($proc,"p_finiquito", $p_finiquito, -1, OCI_B_INT);
        oci_bind_by_name($proc,"p_cod_causal", $p_cod_causal, 20, SQLT_CHR);
        oci_bind_by_name($proc,"p_nom_causal", $p_nom_causal, 200,SQLT_CHR);
        oci_bind_by_name($proc,"p_fecha_baja", $p_fecha_baja, 30, SQLT_CHR);
        oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_obs", $p_obs, 1000, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }


    public function cargarPersonalFiniquito($p_rut, $p_cod_emp, $p_personal)
    {
        $sql = "SELECT PER.*, 
                    TO_CHAR(PER.FECHA_INGRESO, 'YYYY/MM/DD') FECHA_INGRESO_FORMAT, 
                    TO_CHAR(PER.FECHA_BAJA, 'YYYY/MM/DD') FECHA_BAJA_FORMAT,
                    TO_CHAR(PER.FECHA_FIN_CONTRATO, 'YYYY/MM/DD') FECHA_FIN_CONTRATO_FORMAT
                FROM NOV_PERSONAL PER ";
        if(!empty($p_rut)) {
            $sql .= "WHERE (case substr(rut, 0, 1) when '0' then substr(rut, 2) else rut end) = upper('$p_rut')
                AND FECHA_BAJA IS NULL
                AND COD_EMP = '$p_cod_emp' ";
        }

        if(!empty($p_personal)) {
            $sql .= "WHERE PK_PERSONAL = $p_personal ";
        }

        $query = $this->db->query($sql);
        return $query->result();
    }


    public function cambiarEstadoFiniquito($p_finiquito, $p_estado, $p_usuario)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_EST_FINIQUITO(
                            :p_finiquito,
                            :p_estado,
                            :p_usuario,
                            :r_est,
                            :r_msg);END;");
        
        oci_bind_by_name($proc,"p_finiquito", $p_finiquito, -1, OCI_B_INT);
        oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_estado", $p_estado, 20, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }


    public function eliminarFiniquito($p_finiquito, $p_usuario)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_DEL_FINIQUITO(
                            :p_finiquito,
                            :p_usuario,
                            :r_est,
                            :r_msg);END;");
        
        oci_bind_by_name($proc,"p_finiquito", $p_finiquito, -1, OCI_B_INT);
        oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }


    public function cargarConceptosFiniquito($p_finiquito, $p_grupo){

        $sql = "SELECT 
                    PFK_FINIQUITO,
                    PFK_COD_CONCEPTO,
                    NOM_CONCEPTO,
                    TIPO_CONCEPTO,
                    GRUPO_CONCEPTO,
                    RANGO_INI,
                    RANGO_FIN,
                    MESES,
                    TIPO_MES,
                    OBS_TIPO_CONCEPTO,
                    VALOR
                FROM NOV_FINIQUITO_CONCEPTOS
                WHERE PFK_FINIQUITO = $p_finiquito
                AND GRUPO_CONCEPTO = '$p_grupo' 
                ORDER BY NOM_CONCEPTO ASC ";

        $query = $this->db->query($sql);
        return $query->result();
    }


    public function modificarFiniquitoConcepto($p_finiquito, $p_cod_concepto, $p_usuario, $p_valor)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_UPD_FINIQUITO_CONCEPTO(
                            :p_finiquito,
                            :p_cod_concepto,
                            :p_usuario,
                            :p_valor,
                            :r_est,
                            :r_msg);END;");
        
        oci_bind_by_name($proc,"p_finiquito", $p_finiquito, -1, OCI_B_INT);
        oci_bind_by_name($proc,"p_cod_concepto", $p_cod_concepto, 20, SQLT_CHR);
        oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_valor", $p_valor, 100, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }
    


    
}
