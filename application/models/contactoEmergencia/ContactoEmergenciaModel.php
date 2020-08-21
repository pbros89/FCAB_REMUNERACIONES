<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class ContactoEmergenciaModel extends CI_Model {

    public function __construct() {
        parent::__construct();
        $this->load->database("BD_NOVEDADES");
    }

    public function cargarContactosEmergencia($p_rut, $p_cod_emp) {
        $sql = "SELECT 
                    PK_ID,
                    FK_COD_EMP,
                    RUT_TRABAJADOR,
                    NOMBRE_CONTACTO,
                    CORREO_CONTACTO,
                    TELEFONO_CONTACTO,
                    CELULAR_CONTACTO,
                    TO_CHAR(FECHA_CREACION, 'YYYY/MM/DD HH24:MI') FECHA_CREACION, 
                    USR_CREADOR
                FROM NOV_CONTACTOS_EMER 
                WHERE 1 = 1 ";

                if(!empty($p_rut))
                {
                    $sql .= "AND RUT_TRABAJADOR = '$p_rut' ";
                }

                if(!empty($p_cod_emp))
                {
                    $sql .= "AND FK_COD_EMP = '$p_cod_emp' ";
                }

                $sql .= "ORDER BY PK_ID ASC";
                

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function crearContactoEmergencia($p_rut, $p_nombre, $p_correo, $p_telefono, $p_celular, $p_usuario, $p_cod_emp)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_INS_CONTACTO_EMER(
                            :p_rut,
                            :p_nombre,
                            :p_correo,
                            :p_telefono,
                            :p_celular,
                            :p_usuario,
                            :p_cod_emp,
                            :r_est,
                            :r_msg);END;");
        
        oci_bind_by_name($proc,"p_rut", $p_rut,20,SQLT_CHR);
        oci_bind_by_name($proc,"p_nombre", $p_nombre, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_correo", $p_correo, 500, SQLT_CHR);
        oci_bind_by_name($proc,"p_telefono", $p_telefono, 20, SQLT_CHR);
        oci_bind_by_name($proc,"p_celular", $p_celular, 20, SQLT_CHR);
        oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_emp", $p_cod_emp, 20, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }

    public function eliminarContactoEmergencia($p_id, $p_usuario)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_DEL_CONTACTO_EMER(
                            :p_id,
                            :p_usuario,
                            :r_est,
                            :r_msg);END;");
        
        oci_bind_by_name($proc,"p_id", $p_id, -1, OCI_B_INT);
        oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }
    
}
