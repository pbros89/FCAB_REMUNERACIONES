<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class CambiarSindicatoModel extends CI_Model {

    public function __construct() {
        parent::__construct();
        $this->load->database("BD_NOVEDADES");
    }

    public function cargarCambiarSindicato($p_cod_emp, $p_rut, $p_fec1, $p_fec2) {
        $sql = "SELECT 
                    PK_ID,
                    FK_COD_EMP,
                    FK_PERSONAL,
                    RUT,
                    NOMBRE,
                    COD_TIPO_CAMBIO,
                    NOM_TIPO_CAMBIO,
                    COD_SINDICATO,
                    NOM_SINDICATO,
                    COD_ADHERENCIA,
                    NOM_ADHERENCIA,
                    USR_CREADOR,
                    OBSERVACION,
                    TO_CHAR(FECHA_CREACION, 'YYYY/MM/DD') FECHA_CREACION,
                    ESTADO,
                    PERIODO
                FROM NOV_CAMBIO_SINDICATO CAM 
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
                }else{
                    $sql .= "AND TRUNC(FECHA_CREACION, 'MM') = TRUNC(SYSDATE, 'MM') ";
                }

                $sql .= "ORDER BY PK_ID DESC";
                

        $query = $this->db->query($sql);
        return $query->result();
    }


    public function crearCambioSindicato(
          $P_RUT  
        , $P_DV  
        , $P_COD_EMP 
        , $P_USUARIO 
        , $P_COD_TIPO_CAMBIO  
        , $P_NOM_TIPO_CAMBIO  
        , $P_COD_SINDICATO
        , $P_NOM_SINDICATO 
        , $P_COD_ADHERENCIA 
        , $P_NOM_ADHERENCIA 
        , $P_OBSERVACION  
        , $P_PERIODO  
    )
    
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_INS_CAMBIO_SINDICATO(
                          :P_RUT  
                        , :P_DV  
                        , :P_COD_EMP
                        , :P_USUARIO 
                        , :P_COD_TIPO_CAMBIO  
                        , :P_NOM_TIPO_CAMBIO  
                        , :P_COD_SINDICATO
                        , :P_NOM_SINDICATO 
                        , :P_COD_ADHERENCIA 
                        , :P_NOM_ADHERENCIA  
                        , :P_OBSERVACION
                        , :P_PERIODO
                        , :r_est
                        , :r_msg);END;");
        
        oci_bind_by_name($proc,"P_RUT", $P_RUT, 20,SQLT_CHR);
        oci_bind_by_name($proc,"P_DV", $P_DV, 1, SQLT_CHR);
        oci_bind_by_name($proc,"P_COD_EMP", $P_COD_EMP, 20,SQLT_CHR);
        oci_bind_by_name($proc,"P_USUARIO", $P_USUARIO, 100, SQLT_CHR);
        oci_bind_by_name($proc,"P_COD_TIPO_CAMBIO", $P_COD_TIPO_CAMBIO, 20, SQLT_CHR);
        oci_bind_by_name($proc,"P_NOM_TIPO_CAMBIO", $P_NOM_TIPO_CAMBIO, 100, SQLT_CHR);
        oci_bind_by_name($proc,"P_OBSERVACION", $P_OBSERVACION, 1000, SQLT_CHR);
        oci_bind_by_name($proc,"P_COD_SINDICATO", $P_COD_SINDICATO, 20,SQLT_CHR);
        oci_bind_by_name($proc,"P_NOM_SINDICATO", $P_NOM_SINDICATO, 100,SQLT_CHR);
        oci_bind_by_name($proc,"P_COD_ADHERENCIA", $P_COD_ADHERENCIA, 20,SQLT_CHR);
        oci_bind_by_name($proc,"P_NOM_ADHERENCIA", $P_NOM_ADHERENCIA, 100,SQLT_CHR);
        oci_bind_by_name($proc,"P_PERIODO", $P_PERIODO, 20,SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }


    
    public function terminarCambioSindicato(
        $P_COD 
      , $P_USUARIO )

    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_EST_CAMBIO_SINDICATO(
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

    public function eliminarCambioSindicato(
        $P_COD 
        , $P_USUARIO )

    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_DEL_CAMBIO_SINDICATO(
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

    public function anularCambioSindicato(
        $P_COD,
        $P_USUARIO,
        $P_OBS
    ) {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
            $this->db->conn_id,
            "BEGIN NOV_ANU_CAMBIO_SINDICATO(
                      :P_COD  
                    , :P_USUARIO
                    , :P_OBS
                    , :r_est
                    , :r_msg);END;"
        );

        oci_bind_by_name($proc, "P_COD", $P_COD, -1, OCI_B_INT);
        oci_bind_by_name($proc, "P_USUARIO", $P_USUARIO, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_OBS", $P_OBS, 1000, SQLT_CHR);
        oci_bind_by_name($proc, "r_est", $r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc, "r_msg", $r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }
    
}
