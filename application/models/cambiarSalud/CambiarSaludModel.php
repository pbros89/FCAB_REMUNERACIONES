<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class CambiarSaludModel extends CI_Model {

    public function __construct() {
        parent::__construct();
        $this->load->database("BD_NOVEDADES");
    }

    public function cargarCambiarSalud($p_cod_emp, $p_rut, $p_fec1, $p_fec2) {
        $sql = "SELECT 
                    PK_ID,
                    FK_COD_EMP,
                    FK_PERSONAL,
                    RUT,
                    NOMBRE,
                    COD_TIPO_CAMBIO,
                    NOM_TIPO_CAMBIO,
                    COD_SALUD,
                    NOM_SALUD,
                    VALOR_PLAN,
                    TIPO_PLAN,
                    VALOR_GES,
                    TIPO_GES,
                    VALOR_ADI_TRA,
                    TIPO_ADI_TRA,
                    VALOR_ADI_EMP,
                    TIPO_ADI_EMP,
                    VALOR_CONVENIO,
                    TIPO_CONVENIO,
                    USR_CREADOR,
                    OBSERVACION,
                    TO_CHAR(FECHA_CREACION, 'YYYY/MM/DD') FECHA_CREACION,
                    ESTADO
                FROM NOV_CAMBIO_SALUD CAM 
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


    public function crearCambioSalud(
          $P_RUT  
        , $P_DV  
        , $P_COD_EMP 
        , $P_USUARIO 
        , $P_COD_TIPO_CAMBIO  
        , $P_NOM_TIPO_CAMBIO  
        , $P_COD_SALUD  
        , $P_NOM_SALUD  
        , $P_VALOR_PLAN 
        , $P_TIPO_PLAN  
        , $P_VALOR_GES 
        , $P_TIPO_GES  
        , $P_VALOR_ADI_TRA 
        , $P_TIPO_ADI_TRA  
        , $P_VALOR_ADI_EMP 
        , $P_TIPO_ADI_EMP  
        , $P_VALOR_CONVENIO 
        , $P_TIPO_CONVENIO  
        , $P_OBSERVACION    )
    
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_INS_CAMBIO_SALUD(
                          :P_RUT  
                        , :P_DV  
                        , :P_COD_EMP
                        , :P_USUARIO 
                        , :P_COD_TIPO_CAMBIO  
                        , :P_NOM_TIPO_CAMBIO  
                        , :P_COD_SALUD  
                        , :P_NOM_SALUD  
                        , :P_VALOR_PLAN 
                        , :P_TIPO_PLAN  
                        , :P_VALOR_GES 
                        , :P_TIPO_GES  
                        , :P_VALOR_ADI_TRA 
                        , :P_TIPO_ADI_TRA  
                        , :P_VALOR_ADI_EMP 
                        , :P_TIPO_ADI_EMP  
                        , :P_VALOR_CONVENIO 
                        , :P_TIPO_CONVENIO  
                        , :P_OBSERVACION
                        , :r_est
                        , :r_msg);END;");
        
        oci_bind_by_name($proc,"P_RUT", $P_RUT, 20,SQLT_CHR);
        oci_bind_by_name($proc,"P_DV", $P_DV, 1, SQLT_CHR);
        oci_bind_by_name($proc,"P_COD_EMP", $P_COD_EMP, 20,SQLT_CHR);
        oci_bind_by_name($proc,"P_USUARIO", $P_USUARIO, 100, SQLT_CHR);
        oci_bind_by_name($proc,"P_COD_TIPO_CAMBIO", $P_COD_TIPO_CAMBIO, 20, SQLT_CHR);
        oci_bind_by_name($proc,"P_NOM_TIPO_CAMBIO", $P_NOM_TIPO_CAMBIO, 100, SQLT_CHR);
        oci_bind_by_name($proc,"P_OBSERVACION", $P_OBSERVACION, 1000, SQLT_CHR);
        oci_bind_by_name($proc,"P_COD_SALUD", $P_COD_SALUD, 20,SQLT_CHR);
        oci_bind_by_name($proc,"P_NOM_SALUD", $P_NOM_SALUD, 100,SQLT_CHR);
        oci_bind_by_name($proc,"P_VALOR_PLAN", $P_VALOR_PLAN);
        oci_bind_by_name($proc,"P_TIPO_PLAN", $P_TIPO_PLAN, 20,SQLT_CHR);
        oci_bind_by_name($proc,"P_VALOR_GES", $P_VALOR_GES);
        oci_bind_by_name($proc,"P_TIPO_GES", $P_TIPO_GES, 20,SQLT_CHR);
        oci_bind_by_name($proc,"P_VALOR_ADI_TRA", $P_VALOR_ADI_TRA);
        oci_bind_by_name($proc,"P_TIPO_ADI_TRA", $P_TIPO_ADI_TRA, 20,SQLT_CHR);
        oci_bind_by_name($proc,"P_VALOR_ADI_EMP", $P_VALOR_ADI_EMP);
        oci_bind_by_name($proc,"P_TIPO_ADI_EMP", $P_TIPO_ADI_EMP, 20,SQLT_CHR);
        oci_bind_by_name($proc,"P_VALOR_CONVENIO", $P_VALOR_CONVENIO);
        oci_bind_by_name($proc,"P_TIPO_CONVENIO", $P_TIPO_CONVENIO, 20,SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }


    public function terminarCambioSalud(
        $P_COD 
      , $P_USUARIO )

    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_EST_CAMBIO_SALUD(
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

    public function eliminarCambioSalud(
        $P_COD 
        , $P_USUARIO )

    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_DEL_CAMBIO_SALUD(
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
