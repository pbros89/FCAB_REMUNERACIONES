<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class ReajusteModel extends CI_Model {

    public function __construct() {
        parent::__construct();
        $this->load->database("BD_NOVEDADES");
    }

    public function cargarReajustes($p_cod_emp) {
        $sql = "SELECT 
                    PK_ID,
                    NOMBRE,
                    VALOR,
                    USR_CREADOR,
                    IN_SUELDO,
                    IN_BONO,
                    FK_COD_EMP,
                    TO_CHAR(FECHA_CREACION, 'YYYY/MM/DD HH24:MI') FECHA_CREACION
                FROM NOV_REAJUSTES 
                WHERE FK_COD_EMP = '$p_cod_emp' ";

        $sql .= "ORDER BY PK_ID DESC";
                

        $query = $this->db->query($sql);
        return $query->result();
    }


    public function cargarSimulacionReajuste($p_cod_emp, $p_valor, $p_usuario) {
        $sql = "SELECT 
                    PK_PERSONAL, 
                    RUT, 
                    NOMBRE, 
                    SALARIO_BASE SUELDO_ACTUAL, 
                    ROUND(SALARIO_BASE + (SALARIO_BASE * $p_valor)) SUELDO_REAJUSTADO
                FROM NOV_PERSONAL PER
                WHERE FECHA_BAJA IS NULL
                AND COD_EMP = '$p_cod_emp'
                AND PK_PERSONAL NOT IN (
                        SELECT PFK_PERSONAL
                        FROM NOV_REAJUSTES_IGNORADOS 
                        WHERE PK_USUARIO = '$p_usuario' )
                ORDER BY RUT ASC ";

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function crearReajuste($p_cod_emp, $p_nombre, $p_valor, $p_in_sueldo, $p_in_bono, $p_usuario)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_INS_REAJUSTE(
                            :p_cod_emp,
                            :p_nombre,
                            :p_valor,
                            :p_in_sueldo,
                            :p_in_bono,
                            :p_usuario,
                            :r_est,
                            :r_msg);END;");

        oci_bind_by_name($proc,"p_cod_emp", $p_cod_emp, 20,SQLT_CHR);
        oci_bind_by_name($proc,"p_nombre", $p_nombre,500,SQLT_CHR);
        oci_bind_by_name($proc,"p_valor", $p_valor);
        oci_bind_by_name($proc,"p_in_sueldo", $p_in_sueldo,  -1, OCI_B_INT);
        oci_bind_by_name($proc,"p_in_bono", $p_in_bono,  -1, OCI_B_INT);
        oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
        
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }


    public function eliminarReajuste($p_cod_emp, $p_usuario)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_DEL_REAJUSTE(
                            :p_cod_emp,
                            :p_usuario,
                            :r_est,
                            :r_msg);END;");

        oci_bind_by_name($proc,"p_cod_emp", $p_cod_emp, 20,SQLT_CHR);
        oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
        
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }

    public function crearReajusteIng($p_id_personal, $p_usuario)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_INS_REAJUSTE_ING(
                            :p_id_personal,
                            :p_usuario,
                            :r_est,
                            :r_msg);END;");

        oci_bind_by_name($proc,"p_id_personal", $p_id_personal, -1, OCI_B_INT);
        oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
        
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }

    public function eliminarReajusteIng($p_id_personal, $p_usuario)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_DEL_REAJUSTE_ING(
                            :p_id_personal,
                            :p_usuario,
                            :r_est,
                            :r_msg);END;");

        oci_bind_by_name($proc,"p_id_personal", $p_id_personal, -1, OCI_B_INT);
        oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
        
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }

    public function eliminarReajusteIngAll($p_usuario)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_DEL_REAJUSTE_ING_ALL(
                            :p_usuario,
                            :r_est,
                            :r_msg);END;");

        oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
        
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }


    public function cargarReajusteIgnorados($p_usuario) {
        $sql = "SELECT PK_PERSONAL, RUT, NOMBRE
                FROM NOV_PERSONAL PER, nov_reajustes_ignorados IGN
                WHERE PER.PK_PERSONAL = IGN.PFK_PERSONAL
                AND PK_USUARIO = '$p_usuario'";

        $query = $this->db->query($sql);
        return $query->result();
    }

}
