<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class CambiarOtrosModel extends CI_Model {

    public function __construct() {
        parent::__construct();
        $this->load->database("BD_NOVEDADES");
    }

    public function cargarCambiarOtros($p_cod_emp, $p_rut, $p_fec1, $p_fec2) {
        $sql = "SELECT 
                    PK_ID,
                    FK_COD_EMP,
                    FK_PERSONAL,
                    RUT,
                    NOMBRE,
                    COD_TIPO_CAMBIO,
                    NOM_TIPO_CAMBIO,
                    OBSERVACION,
                    USR_CREADOR,
                    CORREO, 
                    TELEFONO,
                    TELEFONO_OLD,
                    CORREO_OLD,
                    USR_ANULO,
                    FECHA_ANULO,
                    OBS_ANULO,
                    COD_EST_CIVIL,
                    NOM_EST_CIVIL,
                    COD_ESCOLARIDAD,
                    NOM_ESCOLARIDAD,
                    CALLE,
                    NUMERO,
                    DEPARTAMENTO,
                    COMUNA,
                    CIUDAD,
                    COD_EST_CIVIL_OLD,
                    NOM_EST_CIVIL_OLD,
                    COD_ESCOLARIDAD_OLD,
                    NOM_ESCOLARIDAD_OLD,
                    CALLE_OLD,
                    NUMERO_OLD,
                    DEPARTAMENTO_OLD,
                    COMUNA_OLD,
                    CIUDAD_OLD,
                    TO_CHAR(FECHA_CREACION, 'YYYY/MM/DD') FECHA_CREACION,
                    ESTADO,
                    PERIODO
                FROM NOV_CAMBIO_OTROS CAM 
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


    public function crearCambioOtros(
          $P_RUT  
        , $P_DV  
        , $P_COD_EMP 
        , $P_USUARIO 
        , $P_COD_TIPO_CAMBIO  
        , $P_NOM_TIPO_CAMBIO  
        , $P_CORREO
        , $P_TELEFONO
        , $P_OBSERVACION    
        , $P_COD_EST_CIVIL 
        , $P_NOM_EST_CIVIL 
        , $P_COD_ESCOLARIDAD 
        , $P_NOM_ESCOLARIDAD 
        , $P_CALLE 
        , $P_NUMERO 
        , $P_DEPARTAMENTO 
        , $P_CIUDAD 
        , $P_COMUNA 
        , $P_PERIODO
    )
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_INS_CAMBIO_OTROS(
                          :P_RUT  
                        , :P_DV  
                        , :P_COD_EMP
                        , :P_USUARIO 
                        , :P_COD_TIPO_CAMBIO  
                        , :P_NOM_TIPO_CAMBIO  
                        , :P_CORREO
                        , :P_TELEFONO
                        , :P_OBSERVACION
                        , :P_COD_EST_CIVIL 
                        , :P_NOM_EST_CIVIL 
                        , :P_COD_ESCOLARIDAD 
                        , :P_NOM_ESCOLARIDAD 
                        , :P_CALLE 
                        , :P_NUMERO 
                        , :P_DEPARTAMENTO 
                        , :P_CIUDAD 
                        , :P_COMUNA 
                        , :P_PERIODO
                        , :r_est
                        , :r_msg);END;");
        
        oci_bind_by_name($proc,"P_RUT", $P_RUT, 20,SQLT_CHR);
        oci_bind_by_name($proc,"P_DV", $P_DV, 1, SQLT_CHR);
        oci_bind_by_name($proc,"P_COD_EMP", $P_COD_EMP, 20,SQLT_CHR);
        oci_bind_by_name($proc,"P_USUARIO", $P_USUARIO, 100, SQLT_CHR);
        oci_bind_by_name($proc,"P_COD_TIPO_CAMBIO", $P_COD_TIPO_CAMBIO, 20, SQLT_CHR);
        oci_bind_by_name($proc,"P_NOM_TIPO_CAMBIO", $P_NOM_TIPO_CAMBIO, 100, SQLT_CHR);
        oci_bind_by_name($proc,"P_TELEFONO", $P_TELEFONO, 20, SQLT_CHR);
        oci_bind_by_name($proc,"P_CORREO", $P_CORREO, 500, SQLT_CHR);
        oci_bind_by_name($proc,"P_OBSERVACION", $P_OBSERVACION, 1000, SQLT_CHR);
        oci_bind_by_name($proc,"P_COD_EST_CIVIL", $P_COD_EST_CIVIL, 100, SQLT_CHR);
        oci_bind_by_name($proc,"P_NOM_EST_CIVIL", $P_NOM_EST_CIVIL, 100, SQLT_CHR);
        oci_bind_by_name($proc,"P_COD_ESCOLARIDAD", $P_COD_ESCOLARIDAD, 100, SQLT_CHR);
        oci_bind_by_name($proc,"P_NOM_ESCOLARIDAD", $P_NOM_ESCOLARIDAD, 100, SQLT_CHR);
        oci_bind_by_name($proc,"P_CALLE", $P_CALLE, 200, SQLT_CHR);
        oci_bind_by_name($proc,"P_NUMERO", $P_NUMERO, 100, SQLT_CHR);
        oci_bind_by_name($proc,"P_DEPARTAMENTO", $P_DEPARTAMENTO, 100, SQLT_CHR);
        oci_bind_by_name($proc,"P_CIUDAD", $P_CIUDAD, 100, SQLT_CHR);
        oci_bind_by_name($proc,"P_COMUNA", $P_COMUNA, 100, SQLT_CHR);
        oci_bind_by_name($proc,"P_PERIODO", $P_PERIODO, 20, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }


    public function terminarCambioOtros(
        $P_COD 
      , $P_USUARIO )

    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_EST_CAMBIOS_OTROS(
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

    public function eliminarCambioOtros(
        $P_COD 
        , $P_USUARIO )

    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_DEL_CAMBIO_OTROS(
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

    public function anularCambioOtros(
        $P_COD,
        $P_USUARIO,
        $P_OBS
    ) {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
            $this->db->conn_id,
            "BEGIN NOV_ANU_CAMBIOS_OTROS(
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
