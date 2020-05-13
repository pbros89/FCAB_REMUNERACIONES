<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class IngHaberRRLLModel extends CI_Model {

    public function __construct() {
        parent::__construct();
        $this->load->database("BD_NOVEDADES");
    }

    public function cargarIngHaberRRLL($p_cod_emp, $p_rut, $p_fec1, $p_fec2) {
        $sql = "SELECT 
                    PK_COD,
                    FK_HABER,
                    FK_COD_EMP,
                    FK_TIPO,
                    NOM_HABER,
                    RUT,
                    NOMBRE,
                    TO_CHAR(INICIO, 'YYYY/MM/DD') INICIO,
                    TO_CHAR(TERMINO, 'YYYY/MM/DD') TERMINO,
                    USA_FECHA,
                    MONTO,
                    USR_CREADOR,
                    USR_MODIFICO,
                    ESTADO,
                    OBSERVACION,
                    COD_CC,
                    NOM_CC,
                    FORMATO_VALOR,
                    FK_PERSONAL,
                    TO_CHAR(FECHA_CREACION, 'YYYY/MM/DD') FECHA_CREACION,
                    TO_CHAR(FECHA_MODIFICO, 'YYYY/MM/DD') FECHA_MODIFICO,
                    PERIODO
                FROM NOV_ING_HABERES_RRLL ING 
                WHERE 1 = 1 ";

                if(!empty($p_cod_emp))
                {
                    $sql .= "AND ING.FK_COD_EMP = '$p_cod_emp' ";
                }

                if(!empty($p_rut))
                {
                    $sql .= "AND ING.RUT LIKE('%$p_rut%') ";
                }

                if(!empty($p_fec1) && !empty($p_fec2)){
                    $sql .= "AND FECHA_CREACION BETWEEN TO_DATE('$p_fec1', 'YYYY/MM/DD') ";
                    $sql .= "AND TO_DATE('$p_fec2', 'YYYY/MM/DD') ";
                }elseif (!empty($p_fec1)) {
                    $sql .= "AND TO_CHAR(FECHA_CREACION, 'YYYY/MM/DD') = '$p_fec1' ";
                }else{
                    $sql .= "AND TRUNC(FECHA_CREACION, 'MM') = TRUNC(SYSDATE, 'MM') ";
                }

                $sql .= "ORDER BY PK_COD DESC";
                

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function crearIngHaberRRLL(
          $P_RUT 
        , $P_DV 
        , $P_COD_EMP 
        , $P_USUARIO 
        , $P_COD_HABER
        , $P_TIPO
        , $P_NOM_HABER
        , $P_MONTO
        , $P_INICIO
        , $P_TERMINO
        , $P_USA_FECHA
        , $P_FORMATO_VALOR
        , $P_OBSERVACION  
        , $P_PERIODO
    )
    {

        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_INS_ING_HABER_RRLL(
                          :P_RUT 
                        , :P_DV 
                        , :P_COD_EMP 
                        , :P_USUARIO 
                        , :P_COD_HABER
                        , :P_TIPO
                        , :P_NOM_HABER
                        , :P_MONTO
                        , :P_INICIO
                        , :P_TERMINO
                        , :P_USA_FECHA
                        , :P_FORMATO_VALOR
                        , :P_OBSERVACION 
                        , :P_PERIODO
                        , :r_est
                        , :r_msg);END;");
        
        oci_bind_by_name($proc,"P_RUT", $P_RUT, 20,SQLT_CHR);
        oci_bind_by_name($proc,"P_DV", $P_DV, 1, SQLT_CHR);
        oci_bind_by_name($proc,"P_COD_EMP", $P_COD_EMP);
        oci_bind_by_name($proc,"P_USUARIO", $P_USUARIO, 100, SQLT_CHR);
        oci_bind_by_name($proc,"P_COD_HABER", $P_COD_HABER, 100, SQLT_CHR);
        oci_bind_by_name($proc,"P_TIPO", $P_TIPO, 20, SQLT_CHR);
        oci_bind_by_name($proc,"P_NOM_HABER", $P_NOM_HABER, 100, SQLT_CHR);
        oci_bind_by_name($proc,"P_MONTO", $P_MONTO);
        oci_bind_by_name($proc,"P_INICIO", $P_INICIO, 30, SQLT_CHR);
        oci_bind_by_name($proc,"P_TERMINO", $P_TERMINO, 30, SQLT_CHR);
        oci_bind_by_name($proc,"P_USA_FECHA", $P_USA_FECHA);
        oci_bind_by_name($proc,"P_FORMATO_VALOR", $P_FORMATO_VALOR, 20, SQLT_CHR);
        oci_bind_by_name($proc,"P_OBSERVACION", $P_OBSERVACION, 1000, SQLT_CHR);
        oci_bind_by_name($proc,"P_PERIODO", $P_PERIODO, 20, SQLT_CHR);

        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }

    
    public function modificarIngHaberRRLL(
          $P_COD 
        , $P_COD_EMP 
        , $P_USUARIO 
        , $P_COD_HABER 
        , $P_TIPO 
        , $P_NOM_HABER 
        , $P_MONTO 
        , $P_INICIO 
        , $P_TERMINO 
        , $P_USA_FECHA 
        , $P_FORMATO_VALOR 
        , $P_OBSERVACION 
        , $P_PERIODO
    )
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_UPD_ING_HABER_RRLL(
                          :P_COD 
                        , :P_COD_EMP 
                        , :P_USUARIO 
                        , :P_COD_HABER 
                        , :P_TIPO 
                        , :P_NOM_HABER 
                        , :P_MONTO 
                        , :P_INICIO 
                        , :P_TERMINO 
                        , :P_USA_FECHA 
                        , :P_FORMATO_VALOR 
                        , :P_OBSERVACION 
                        , :P_PERIODO
                        , :r_est
                        , :r_msg);END;");

        
        oci_bind_by_name($proc,"P_COD",$P_COD, -1, OCI_B_INT);
        oci_bind_by_name($proc,"P_COD_EMP", $P_COD_EMP, 100, SQLT_CHR);
        oci_bind_by_name($proc,"P_USUARIO", $P_USUARIO, 100, SQLT_CHR);
        oci_bind_by_name($proc,"P_COD_HABER", $P_COD_HABER, 100, SQLT_CHR);
        oci_bind_by_name($proc,"P_TIPO", $P_TIPO, 20, SQLT_CHR);
        oci_bind_by_name($proc,"P_NOM_HABER", $P_NOM_HABER, 100, SQLT_CHR);
        oci_bind_by_name($proc,"P_MONTO", $P_MONTO);
        oci_bind_by_name($proc,"P_INICIO", $P_INICIO);
        oci_bind_by_name($proc,"P_TERMINO", $P_TERMINO);
        oci_bind_by_name($proc,"P_USA_FECHA", $P_USA_FECHA, -1, OCI_B_INT);
        oci_bind_by_name($proc,"P_FORMATO_VALOR", $P_FORMATO_VALOR, 20, SQLT_CHR);
        oci_bind_by_name($proc,"P_OBSERVACION", $P_OBSERVACION, 1000, SQLT_CHR);
        oci_bind_by_name($proc,"P_PERIODO", $P_PERIODO, 20, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }

    public function cambiarEstadoIngHaberRRLL($p_cod, $p_estado, $p_usuario)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_EST_ING_HABER_RRLL(
                            :p_cod,
                            :p_estado,
                            :p_usuario,
                            :r_est,
                            :r_msg);END;");
        
        oci_bind_by_name($proc,"p_cod", $p_cod, -1, OCI_B_INT);
        oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_estado", $p_estado, 20, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }


    public function eliminarIngHaberRRLL($p_cod, $p_usuario)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_DEL_ING_HABER_RRLL(
                            :p_cod,
                            :p_usuario,
                            :r_est,
                            :r_msg);END;");
        
        oci_bind_by_name($proc,"p_cod", $p_cod, -1, OCI_B_INT);
        oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }

    
    public function anularIngHaberRRLL(
        $P_COD,
        $P_USUARIO,
        $P_OBS
    ) {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
            $this->db->conn_id,
            "BEGIN NOV_ANU_ING_HABER_RRLL(
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
