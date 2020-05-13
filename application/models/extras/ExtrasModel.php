<?php

if (!defined('BASEPATH')) exit('No se permite el acceso directo a este directorio');

class ExtrasModel extends CI_Model{
    public function __construct() {
        parent::__construct();
        $this->load->database('BD_NOVEDADES');
    }

    public function validarFechaHora($p_fec_ini, $p_fec_ter){
        $sql = "SELECT COUNT(*) VALOR
                FROM DUAL
                WHERE TO_DATE('$p_fec_ini', 'DD/MM/YYYY HH24:MI') < 
                TO_DATE('$p_fec_ter', 'DD/MM/YYYY HH24:MI')";

        
        $query = $this->db->query($sql);
        return $query->result();
    }
    
    public function validarFechaMayorActual($p_fec_ini){
        $sql = "SELECT COUNT(*) VALOR
                FROM DUAL
                WHERE TO_DATE('$p_fec_ini', 'DD/MM/YYYY HH24:MI') > SYSDATE";

        
        $query = $this->db->query($sql);
        return $query->result();
    }
    
    public function validarFechaMenorActual($p_fec_ini){
        $sql = "SELECT COUNT(*) VALOR
                FROM DUAL
                WHERE (SYSDATE - TO_DATE('$p_fec_ini', 'DD-MM-YYYY')) > 1";

        
        $query = $this->db->query($sql);
        return $query->result();
    }
    
    public function contarMesesDiferencia($fec1, $fec2)
    {
        $sql = "SELECT TRUNC(MONTHS_BETWEEN(TO_DATE('$fec2', 'dd/mm/yyyy'), TO_DATE('$fec1', 'dd/mm/yyyy'))) VALOR
                FROM DUAL";
                
        $query = $this->db->query($sql);
        return $query->result();
    }

    public function cargarPeriodos() 
    {
        $sql = "select to_char(sysdate, 'yyyy/mm') PERIODO
                from dual
                union
                select to_char(ADD_MONTHS(sysdate, 1), 'yyyy/mm') PERIODO
                from dual";

        $query = $this->db->query($sql);
        return $query->result();
    }
}