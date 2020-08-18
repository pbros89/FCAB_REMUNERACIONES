<?php
if (!defined('BASEPATH')) exit('No se permite el acceso directo a este directorio');

class WFDesvinculacionModel extends CI_Model {
    public function __construct() {
        parent::__construct();
        $this->load->database("BD_NOVEDADES");
    }

    public function listRutNombre($cod_emp){

        $sql = "SELECT DISTINCT
                    ( rut
                    || ' | '
                    || nombre ) rutNom,
                    rut
                FROM
                    nov_personal
                WHERE
                    fecha_baja IS NULL
                    AND cod_emp = '$cod_emp'
                ORDER BY
                    rutNom";

        $query = $this->db->query($sql);
        return $query->result();

    }

    public function datosPersonal($rut){

        $sql = "SELECT
                    p.rut,
                    substr(p.nombre, instr(p.nombre, ',') + 1) nombres,
                    substr(p.nombre, 0, instr(p.nombre, ',') - 1) apellidos,
                    p.nom_emp empresa,
                    p.nom_departamento departamento,
                    p.nom_gerencia gerencia,
                    p.rol rol    
                FROM
                    nov_personal p
                WHERE
                    p.rut = '$rut'
                    AND p.fecha_baja IS NULL
                    AND ROWNUM = 1";

        $query = $this->db->query($sql);
        return $query->result();

    }

    public function listCausalesDespido($cod_emp){

        $sql = "SELECT 
                    nombre
                FROM 
                    nov_parametros
                WHERE 
                    pfk_tipo_param = 'CAUSAL_DESPIDO'
                    AND pfk_cod_emp = '$cod_emp'
                ORDER BY 
                    nombre";

        $query = $this->db->query($sql);
        return $query->result();

    }

}