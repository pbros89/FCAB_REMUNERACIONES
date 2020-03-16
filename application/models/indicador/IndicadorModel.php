<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class IndicadorModel extends CI_Model {

    public function __construct() {
        parent::__construct();
        $this->load->database("BD_NOVEDADES");
    }

    public function cargarConteoMensual($p_cod_emp) {
        $sql = "SELECT 
                    EMP,
                    MES,
                    AFP,
                    CARGO,
                    DEPOSITO,
                    OTROS,
                    SALUD,
                    SINDICATO,
                    FINIQUITO,
                    INGRESO,
                    BONO,
                    DESCUENTO_RRLL,
                    HABER_RRLL,
                    AUSENTISMO
                FROM NOV_CONTEO_MENSUAL_VW  
                WHERE MES = TO_CHAR(SYSDATE, 'YYYY/MM') ";

                if(!empty($p_cod_emp))
                {
                    $sql .= "AND EMP = '$p_cod_emp' ";
                }

                $sql .= "ORDER BY MES ASC ";

        $query = $this->db->query($sql);
        return $query->result();
    }
}
