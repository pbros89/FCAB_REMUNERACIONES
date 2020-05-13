<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class CargoModel extends CI_Model {

    public function __construct() {
        parent::__construct();
        $this->load->database("BD_NOVEDADES");
    }

    public function cargarCargos($p_cod_cargo, $p_cod_emp, $p_nombre, $p_estado, $p_rol) {
        $sql = "SELECT 
                    CAR.PK_COD_CARGO, 
                    CAR.PFK_COD_EMP, 
                    EMP.NOMBRE NOM_EMP,
                    CAR.NOMBRE NOM_CARGO, 
                    CAR.ESTADO, 
                    TO_CHAR(CAR.FECHA_CREACION, 'YYYY/MM/DD HH24:MI') FECHA_CREACION, 
                    CAR.USR_CREADOR, 
                    TO_CHAR(CAR.FECHA_MODIFICO, 'YYYY/MM/DD HH24:MI') FECHA_MODIFICO, 
                    CAR.USR_MODIFICO,
                    CAR.FK_ROL
                FROM NOV_CARGOS CAR, NOV_EMPRESAS EMP  
                WHERE CAR.PFK_COD_EMP = EMP.PK_COD_EMP ";

                if(!empty($p_cod_cargo))
                {
                    $sql .= "AND CAR.PK_COD_CARGO LIKE(UPPER('%$p_cod_cargo%')) ";
                }

                if(!empty($p_cod_emp))
                {
                    $sql .= "AND CAR.PFK_COD_EMP = '$p_cod_emp' ";
                }

                if(!empty($p_nombre))
                {
                    $sql .= "AND UPPER(CAR.NOMBRE) LIKE(UPPER('%$p_nombre%')) ";
                }

                if(!empty($p_estado))
                {
                    $sql .= "AND CAR.ESTADO = '$p_estado' ";
                }

                if(!empty($p_rol))
                {
                    $sql .= "AND CAR.FK_ROL = '$p_rol' ";
                }
                $sql .= "ORDER BY CAR.PK_COD_CARGO ASC, CAR.NOMBRE ASC";
                

        $query = $this->db->query($sql);
        return $query->result();
    }


    public function cargarCargosFiltro($p_cod_emp) {
        $sql = "SELECT 
                    CAR.PK_COD_CARGO CODIGO, 
                    CAR.NOMBRE,
                    CAR.PK_COD_CARGO || ' - ' || CAR.NOMBRE NOMBRE_FULL, 
                    CAR.FK_ROL
                FROM NOV_CARGOS CAR  
                WHERE 1 = 1 ";
                if(!empty($p_cod_emp))
                {
                    $sql .= "AND CAR.PFK_COD_EMP = '$p_cod_emp' ";
                }

                $sql .= "ORDER BY CAR.NOMBRE ASC";
                

        $query = $this->db->query($sql);
        return $query->result();
    }


    public function cargarRolesCargo() {
        $sql = "SELECT PK_COD_ROL, NOMBRE, OBSERVACION
                FROM NOV_ROL_CARGO 
                ORDER BY NOMBRE";
                

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function crearCargo($p_cod_cargo, $p_cod_emp, $p_nombre, $p_usuario, $p_estado, $p_rol)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_INS_CARGO(
                            :p_cod_cargo,
                            :p_cod_emp,
                            :p_nombre,
                            :p_usuario,
                            :p_estado,
                            :p_rol,
                            :r_est,
                            :r_msg);END;");
        
        oci_bind_by_name($proc,"p_cod_cargo", $p_cod_cargo, 20,SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_emp", $p_cod_emp,20,SQLT_CHR);
        oci_bind_by_name($proc,"p_nombre", $p_nombre, 200, SQLT_CHR);
        oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_estado", $p_estado, 1, SQLT_CHR);
        oci_bind_by_name($proc,"p_rol", $p_rol, 20, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }

    public function modificarCargo($p_cod_cargo, $p_cod_emp, $p_nombre, $p_usuario, $p_estado, $p_rol)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_UPD_CARGO(
                            :p_cod_cargo,
                            :p_cod_emp,
                            :p_nombre,
                            :p_usuario,
                            :p_estado,
                            :p_rol,
                            :r_est,
                            :r_msg);END;");
        
        oci_bind_by_name($proc,"p_cod_cargo", $p_cod_cargo, 20,SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_emp", $p_cod_emp,20,SQLT_CHR);
        oci_bind_by_name($proc,"p_nombre", $p_nombre, 200, SQLT_CHR);
        oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_estado", $p_estado, 1, SQLT_CHR);
        oci_bind_by_name($proc,"p_rol", $p_rol, 20, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }
    
}
