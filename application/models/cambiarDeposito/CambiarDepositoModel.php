<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class CambiarDepositoModel extends CI_Model {

    public function __construct() {
        parent::__construct();
        $this->load->database("BD_NOVEDADES");
    }

    public function cargarCambiarDeposito($p_cod_emp, $p_rut, $p_fec1, $p_fec2) {
        $sql = "SELECT 
                    PK_ID,
                    FK_COD_EMP,
                    FK_PERSONAL,
                    RUT,
                    NOMBRE,
                    COD_FORMA_PAGO,
                    NOM_FORMA_PAGO,
                    COD_BANCO,
                    NOM_BANCO,
                    NUM_CUENTA,
                    USR_CREADOR,
                    OBSERVACION,
                    TO_CHAR(FECHA_CREACION, 'YYYY/MM/DD') FECHA_CREACION,
                    ESTADO
                FROM NOV_CAMBIO_DEPOSITO CAM 
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


    public function crearCambioDeposito(
          $P_RUT  
        , $P_DV  
        , $P_COD_EMP 
        , $P_USUARIO 
        , $P_COD_FORMA_PAGO  
        , $P_NOM_FORMA_PAGO  
        , $P_COD_BANCO   
        , $P_NOM_BANCO   
        , $P_NUM_CUENTA   
        , $P_OBSERVACION )
    
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_INS_CAMBIO_DEPOSITO(
                          :P_RUT  
                        , :P_DV  
                        , :P_COD_EMP 
                        , :P_USUARIO 
                        , :P_COD_FORMA_PAGO  
                        , :P_NOM_FORMA_PAGO  
                        , :P_COD_BANCO   
                        , :P_NOM_BANCO   
                        , :P_NUM_CUENTA   
                        , :P_OBSERVACION
                        , :r_est
                        , :r_msg);END;");
        
        oci_bind_by_name($proc,"P_RUT", $P_RUT, 20,SQLT_CHR);
        oci_bind_by_name($proc,"P_DV", $P_DV, 1, SQLT_CHR);
        oci_bind_by_name($proc,"P_COD_EMP", $P_COD_EMP, 20,SQLT_CHR);
        oci_bind_by_name($proc,"P_USUARIO", $P_USUARIO, 100, SQLT_CHR);
        oci_bind_by_name($proc,"P_COD_FORMA_PAGO", $P_COD_FORMA_PAGO, 20, SQLT_CHR);
        oci_bind_by_name($proc,"P_NOM_FORMA_PAGO", $P_NOM_FORMA_PAGO, 100, SQLT_CHR);
        oci_bind_by_name($proc,"P_OBSERVACION", $P_OBSERVACION, 1000, SQLT_CHR);
        oci_bind_by_name($proc,"P_COD_BANCO", $P_COD_BANCO, 20,SQLT_CHR);
        oci_bind_by_name($proc,"P_NOM_BANCO", $P_NOM_BANCO, 100,SQLT_CHR);
        oci_bind_by_name($proc,"P_NUM_CUENTA", $P_NUM_CUENTA, 100,SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }


    public function terminarCambioDeposito(
        $P_COD 
      , $P_USUARIO )

    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_EST_CAMBIO_DEPOSITO(
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

    public function eliminarCambioDeposito(
        $P_COD 
        , $P_USUARIO )

    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_DEL_CAMBIO_DEPOSITO(
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
