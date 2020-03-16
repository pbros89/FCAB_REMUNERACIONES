<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class CambiarAFPModel extends CI_Model {

    public function __construct() {
        parent::__construct();
        $this->load->database("BD_NOVEDADES");
    }

    public function cargarCambiarAFP($p_cod_emp, $p_rut, $p_fec1, $p_fec2) {
        $sql = "SELECT 
                    PK_ID,
                    FK_COD_EMP,
                    RUT,
                    NOMBRE,
                    COD_TIPO_CAMBIO,
                    NOM_TIPO_CAMBIO,
                    COD_AFP,
                    NOM_AFP,
                    COD_APV,
                    NOM_APV,
                    MONTO,
                    OBSERVACION,
                    USR_CREADOR,
                    FK_PERSONAL,
                    TIPO_MONTO,
                    COD_AFP_OLD,
                    NOM_AFP_OLD,
                    COD_APV_OLD,
                    NOM_APV_OLD,
                    TO_CHAR(FECHA_CREACION, 'YYYY/MM/DD') FECHA_CREACION,
                    ESTADO
                FROM NOV_CAMBIO_AFP CAM 
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

    public function crearCambioAFP(
          $P_RUT  
        , $P_DV  
        , $P_COD_EMP
        , $P_USUARIO 
        , $P_COD_TIPO_CAMBIO  
        , $P_NOM_TIPO_CAMBIO  
        , $P_COD_AFP  
        , $P_NOM_AFP  
        , $P_COD_APV  
        , $P_NOM_APV  
        , $P_COD_REG_APV
        , $P_NOM_REG_APV
        , $P_MONTO
        , $P_TIPO_MONTO 
        , $P_OBSERVACION  )
    
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_INS_CAMBIO_AFP(
                          :P_RUT  
                        , :P_DV  
                        , :P_COD_EMP
                        , :P_USUARIO 
                        , :P_COD_TIPO_CAMBIO  
                        , :P_NOM_TIPO_CAMBIO  
                        , :P_COD_AFP  
                        , :P_NOM_AFP  
                        , :P_COD_APV  
                        , :P_NOM_APV
                        , :P_COD_REG_APV  
                        , :P_NOM_REG_APV
                        , :P_MONTO
                        , :P_TIPO_MONTO 
                        , :P_OBSERVACION
                        , :r_est
                        , :r_msg);END;");
        
        oci_bind_by_name($proc,"P_RUT", $P_RUT, 20,SQLT_CHR);
        oci_bind_by_name($proc,"P_DV", $P_DV, 1, SQLT_CHR);
        oci_bind_by_name($proc,"P_COD_EMP", $P_COD_EMP, 20, SQLT_CHR);
        oci_bind_by_name($proc,"P_USUARIO", $P_USUARIO, 100, SQLT_CHR);
        oci_bind_by_name($proc,"P_COD_TIPO_CAMBIO", $P_COD_TIPO_CAMBIO, 20, SQLT_CHR);
        oci_bind_by_name($proc,"P_NOM_TIPO_CAMBIO", $P_NOM_TIPO_CAMBIO, 100, SQLT_CHR);
        oci_bind_by_name($proc,"P_COD_AFP", $P_COD_AFP, 20, SQLT_CHR);
        oci_bind_by_name($proc,"P_NOM_AFP", $P_NOM_AFP, 100, SQLT_CHR);
        oci_bind_by_name($proc,"P_COD_APV", $P_COD_APV, 20, SQLT_CHR);
        oci_bind_by_name($proc,"P_NOM_APV", $P_NOM_APV, 100, SQLT_CHR);
        oci_bind_by_name($proc,"P_COD_REG_APV", $P_COD_REG_APV, 20, SQLT_CHR);
        oci_bind_by_name($proc,"P_NOM_REG_APV", $P_NOM_REG_APV, 100, SQLT_CHR);
        oci_bind_by_name($proc,"P_MONTO", $P_MONTO);
        oci_bind_by_name($proc,"P_TIPO_MONTO", $P_TIPO_MONTO, 20, SQLT_CHR);
        oci_bind_by_name($proc,"P_OBSERVACION", $P_OBSERVACION, 1000, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }

    public function terminarCambioAFP(
          $P_COD 
        , $P_COD_EMP
        , $P_USUARIO )
  
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_EST_CAMBIO_AFP(
                          :P_COD  
                        , :P_COD_EMP  
                        , :P_USUARIO
                        , :r_est
                        , :r_msg);END;");
        
        oci_bind_by_name($proc,"P_COD", $P_COD, -1, OCI_B_INT);
        oci_bind_by_name($proc,"P_COD_EMP", $P_COD_EMP, 20, SQLT_CHR);
        oci_bind_by_name($proc,"P_USUARIO", $P_USUARIO, 100, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }

    public function eliminarCambioAFP(
        $P_COD 
      , $P_USUARIO )

  {
      $r_est = 0;
      $r_msg = "";
      $proc = oci_parse(
              $this->db->conn_id,
                  "BEGIN NOV_DEL_CAMBIO_AFP(
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


    
}
