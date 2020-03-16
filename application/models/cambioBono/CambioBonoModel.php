<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class CambioBonoModel extends CI_Model {

    public function __construct() {
        parent::__construct();
        $this->load->database("BD_NOVEDADES");
    }

    public function cargarCambioBono($p_cod_emp, $p_rut, $p_fec1, $p_fec2) {
        $sql = "SELECT 
                    PK_ID,
                    FK_COD_EMP,
                    FK_PERSONAL,
                    RUT,
                    NOMBRE,
                    USR_CREADOR,
                    USR_MODIFICO,
                    OBSERVACION,
                    ESTADO,
                    TO_CHAR(FECHA_CREACION, 'YYYY/MM/DD') FECHA_CREACION,
                    TO_CHAR(FECHA_MODIFICO, 'YYYY/MM/DD') FECHA_MODIFICO
                FROM NOV_CAMBIO_BONO CAM 
                WHERE 1 = 1 ";

                if(!empty($p_cod_emp))
                {
                    $sql .= "AND CAM.FK_COD_EMP = '$p_cod_emp' ";
                }

                if(!empty($p_rut))
                {
                    $sql .= "AND CAM.RUT LIKE('%$p_rut%') ";
                }

                if(!empty($p_fec1) && !empty($p_fec2)){
                    $sql .= "AND FECHA_CREACION BETWEEN TO_DATE('$p_fec1', 'YYYY/MM/DD') ";
                    $sql .= "AND TO_DATE('$p_fec2', 'YYYY/MM/DD') ";
                }elseif (!empty($p_fec1)) {
                    $sql .= "AND TO_CHAR(FECHA_CREACION, 'YYYY/MM/DD') = '$p_fec1' ";
                }

                $sql .= "ORDER BY PK_ID DESC";
                

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function crearCambioBono(
          $P_RUT 
        , $P_DV 
        , $P_COD_EMP 
        , $P_USUARIO 
        , $P_OBSERVACION   )
    {

        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_INS_CAMBIO_BONOS(
                          :P_RUT 
                        , :P_DV 
                        , :P_COD_EMP 
                        , :P_USUARIO 
                        , :P_OBSERVACION 
                        , :r_est
                        , :r_msg);END;");
        
        oci_bind_by_name($proc,"P_RUT", $P_RUT, 20,SQLT_CHR);
        oci_bind_by_name($proc,"P_DV", $P_DV, 1, SQLT_CHR);
        oci_bind_by_name($proc,"P_COD_EMP", $P_COD_EMP, 100, SQLT_CHR);
        oci_bind_by_name($proc,"P_USUARIO", $P_USUARIO, 100, SQLT_CHR);
        oci_bind_by_name($proc,"P_OBSERVACION", $P_OBSERVACION, 1000, SQLT_CHR);
        
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }

    
  public function cargarConceptosCambioBono($p_bono){

    $sql = "SELECT 
                PFK_BONO,
                PFK_COD_CONCEPTO,
                PFK_COD_EMP,
                NOM_CONCEPTO,
                TIPO_CONCEPTO,
                GRUPO_CONCEPTO,
                RANGO_INI,
                RANGO_FIN,
                MESES,
                TIPO_MES,
                OBS_TIPO_CONCEPTO,
                VALOR
            FROM NOV_CAMBIO_BONO_CONCEPTOS
            WHERE PFK_BONO = $p_bono
            ORDER BY NOM_CONCEPTO ASC ";

    $query = $this->db->query($sql);
    return $query->result();
}


public function modificarCambioBonoConcepto($p_bono, $p_cod_concepto, $p_usuario, $p_valor)
{
    $r_est = 0;
    $r_msg = "";
    $proc = oci_parse(
            $this->db->conn_id,
                "BEGIN NOV_UPD_CAMBIO_BONO_CONCEPTOS(
                        :p_bono,
                        :p_cod_concepto,
                        :p_usuario,
                        :p_valor,
                        :r_est,
                        :r_msg);END;");
    
    oci_bind_by_name($proc,"p_bono", $p_bono, -1, OCI_B_INT);
    oci_bind_by_name($proc,"p_cod_concepto", $p_cod_concepto, 20, SQLT_CHR);
    oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
    oci_bind_by_name($proc,"p_valor", $p_valor, 100, SQLT_CHR);
    oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
    oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

    oci_execute($proc);

    $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
    return $result;
}

public function cambiarEstadoCambioBono($p_bono, $p_estado, $p_usuario)
{
    $r_est = 0;
    $r_msg = "";
    $proc = oci_parse(
            $this->db->conn_id,
                "BEGIN NOV_EST_CAMBIO_BONO(
                        :p_bono,
                        :p_estado,
                        :p_usuario,
                        :r_est,
                        :r_msg);END;");
    
    oci_bind_by_name($proc,"p_bono", $p_bono, -1, OCI_B_INT);
    oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
    oci_bind_by_name($proc,"p_estado", $p_estado, 20, SQLT_CHR);
    oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
    oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

    oci_execute($proc);

    $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
    return $result;
}


public function eliminarCambioBono($p_bono, $p_usuario)
{
    $r_est = 0;
    $r_msg = "";
    $proc = oci_parse(
            $this->db->conn_id,
                "BEGIN NOV_DEL_CAMBIO_BONO(
                        :p_bono,
                        :p_usuario,
                        :r_est,
                        :r_msg);END;");
    
    oci_bind_by_name($proc,"p_bono", $p_bono, -1, OCI_B_INT);
    oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
    oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
    oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

    oci_execute($proc);

    $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
    return $result;
}

public function cargarConceptosPersonal($p_personal){

    $sql = "SELECT 
                PFK_PERSONAL,
                PFK_COD_CONCEPTO,
                PFK_COD_EMP,
                NOM_CONCEPTO,
                TIPO_CONCEPTO,
                GRUPO_CONCEPTO,
                RANGO_INI,
                RANGO_FIN,
                MESES,
                TIPO_MES,
                OBS_TIPO_CONCEPTO,
                VALOR
            FROM NOV_PERSONAL_BONOS
            WHERE PFK_PERSONAL = $p_personal
            ORDER BY NOM_CONCEPTO ASC ";

    $query = $this->db->query($sql);
    return $query->result();
}
    
}
