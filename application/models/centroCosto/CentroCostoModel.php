<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class CentroCostoModel extends CI_Model
{

    public function __construct()
    {
        parent::__construct();
        $this->load->database("BD_NOVEDADES");
    }

    public function cargarCentroCostos($p_cod_cc, $p_cod_emp, $p_nombre, $p_estado)
    {
        $sql = "SELECT 
                    CC.PK_COD_CC, 
                    CC.PFK_COD_EMP, 
                    EMP.NOMBRE NOM_EMP,
                    CC.NOMBRE NOM_CC, 
                    CC.ESTADO, 
                    TO_CHAR(CC.FECHA_CREACION, 'YYYY/MM/DD HH24:MI') FECHA_CREACION, 
                    CC.USR_CREADOR, 
                    TO_CHAR(CC.FECHA_MODIFICO, 'YYYY/MM/DD HH24:MI') FECHA_MODIFICO, 
                    CC.USR_MODIFICO,
                    COD_GERENCIA,
                    NOM_GERENCIA,
                    COD_DEPARTAMENTO,
                    NOM_DEPARTAMENTO,
                    RUT_JEFE,
                    NOM_JEFE
                FROM NOV_CENTRO_COSTOS CC, NOV_EMPRESAS EMP  
                WHERE CC.PFK_COD_EMP = EMP.PK_COD_EMP ";

        if (!empty($p_cod_cc)) {
            $sql .= "AND CC.PK_COD_CC LIKE(UPPER('%$p_cod_cc%')) ";
        }

        if (!empty($p_cod_emp)) {
            $sql .= "AND CC.PFK_COD_EMP = '$p_cod_emp' ";
        }

        if (!empty($p_nombre)) {
            $sql .= "AND UPPER(CC.NOMBRE) LIKE(UPPER('%$p_nombre%')) ";
        }

        if (!empty($p_estado)) {
            $sql .= "AND CC.ESTADO = '$p_estado' ";
        }
        $sql .= "ORDER BY CC.PK_COD_CC ASC, CC.NOMBRE ASC";


        $query = $this->db->query($sql);
        return $query->result();
    }

    public function cargarCentroCostosFiltro($p_cod_emp)
    {
        $sql = "SELECT 
                    CC.PK_COD_CC CODIGO, 
                    CC.NOMBRE,
                    CC.PK_COD_CC || ' - ' || CC.NOMBRE NOMBRE_FULL,
                    COD_GERENCIA,
                    NOM_GERENCIA,
                    COD_DEPARTAMENTO,
                    NOM_DEPARTAMENTO,
                    RUT_JEFE,
                    NOM_JEFE
                FROM NOV_CENTRO_COSTOS CC  
                WHERE CC.ESTADO = 'A' ";


        if (!empty($p_cod_emp)) {
            $sql .= "AND CC.PFK_COD_EMP = '$p_cod_emp' ";
        }

        $sql .= "ORDER BY CC.PK_COD_CC ASC";


        $query = $this->db->query($sql);
        return $query->result();
    }

    public function crearCentroCosto($p_cod_cc, $p_cod_emp, $p_nombre, $p_usuario, $p_estado, $p_cod_ger, $p_nom_ger, $p_cod_dep, $p_nom_dep, $p_rut_jefe, $p_nom_jefe)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
            $this->db->conn_id,
            "BEGIN NOV_INS_CENTRO_COSTO(
                            :p_cod_cc,
                            :p_cod_emp,
                            :p_nombre,
                            :p_usuario,
                            :p_estado,
                            :p_cod_ger,
                            :p_nom_ger,
                            :p_cod_dep,
                            :p_nom_dep,
                            :p_rut_jefe,
                            :p_nom_jefe,
                            :r_est,
                            :r_msg);END;"
        );

        oci_bind_by_name($proc, "p_cod_cc", $p_cod_cc, 20, SQLT_CHR);
        oci_bind_by_name($proc, "p_cod_emp", $p_cod_emp, 20, SQLT_CHR);
        oci_bind_by_name($proc, "p_nombre", $p_nombre, 200, SQLT_CHR);
        oci_bind_by_name($proc, "p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc, "p_cod_ger", $p_cod_ger, 20, SQLT_CHR);
        oci_bind_by_name($proc, "p_nom_ger", $p_nom_ger, 100, SQLT_CHR);
        oci_bind_by_name($proc, "p_cod_dep", $p_cod_dep, 20, SQLT_CHR);
        oci_bind_by_name($proc, "p_nom_dep", $p_nom_dep, 100, SQLT_CHR);
        oci_bind_by_name($proc, "p_rut_jefe", $p_rut_jefe, 20, SQLT_CHR);
        oci_bind_by_name($proc, "p_nom_jefe", $p_nom_jefe, 200, SQLT_CHR);
        oci_bind_by_name($proc, "p_estado", $p_estado, 1, SQLT_CHR);
        oci_bind_by_name($proc, "r_est", $r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc, "r_msg", $r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }

    public function modificarCentroCosto($p_cod_cc, $p_cod_emp, $p_nombre, $p_usuario, $p_estado, $p_cod_ger, $p_nom_ger, $p_cod_dep, $p_nom_dep, $p_rut_jefe, $p_nom_jefe)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
            $this->db->conn_id,
            "BEGIN NOV_UPD_CENTRO_COSTO(
                            :p_cod_cc,
                            :p_cod_emp,
                            :p_nombre,
                            :p_usuario,
                            :p_estado,
                            :p_cod_ger,
                            :p_nom_ger,
                            :p_cod_dep,
                            :p_nom_dep,
                            :p_rut_jefe,
                            :p_nom_jefe,
                            :r_est,
                            :r_msg);END;"
        );

        oci_bind_by_name($proc, "p_cod_cc", $p_cod_cc, 20, SQLT_CHR);
        oci_bind_by_name($proc, "p_cod_emp", $p_cod_emp, 20, SQLT_CHR);
        oci_bind_by_name($proc, "p_nombre", $p_nombre, 200, SQLT_CHR);
        oci_bind_by_name($proc, "p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc, "p_estado", $p_estado, 1, SQLT_CHR);
        oci_bind_by_name($proc, "p_cod_ger", $p_cod_ger, 20, SQLT_CHR);
        oci_bind_by_name($proc, "p_nom_ger", $p_nom_ger, 100, SQLT_CHR);
        oci_bind_by_name($proc, "p_cod_dep", $p_cod_dep, 20, SQLT_CHR);
        oci_bind_by_name($proc, "p_nom_dep", $p_nom_dep, 100, SQLT_CHR);
        oci_bind_by_name($proc, "p_rut_jefe", $p_rut_jefe, 20, SQLT_CHR);
        oci_bind_by_name($proc, "p_nom_jefe", $p_nom_jefe, 200, SQLT_CHR);
        oci_bind_by_name($proc, "r_est", $r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc, "r_msg", $r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }
}
