<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class ConceptoModel extends CI_Model {

    public function __construct() {
        parent::__construct();
        $this->load->database("BD_NOVEDADES");
    }

    public function cargarConceptos($p_cod_concepto, $p_cod_emp, $p_nombre, $p_grupo, $p_tipo, $p_tipo_mes, $p_estado) {
        $sql = "SELECT 
                    CON.PK_COD_CONCEPTO,
                    CON.PFK_COD_EMP,
                    CON.FK_TIPO,
                    EMP.NOMBRE NOM_EMP,
                    CON.NOMBRE,
                    CON.OBSERVACION,
                    CON.USR_CREADOR,
                    TO_CHAR(CON.FECHA_CREACION, 'YYYY/MM/DD HH24:MI') FECHA_CREACION, 
                    CON.USR_MODIFICO,
                    TO_CHAR(CON.FECHA_MODIFICO, 'YYYY/MM/DD HH24:MI') FECHA_MODIFICO, 
                    CON.FK_TIPO_MES,
                    CON.MESES,
                    CON.RANGO_INI,
                    CON.RANGO_FIN,
                    CON.INICIAL,
                    CON.ESTADO,
                    CON.FK_GRUPO_CONCEPTO,
                    CON.COPIAR_ANTERIOR
                FROM NOV_CONCEPTOS CON, NOV_EMPRESAS EMP
                WHERE CON.PFK_COD_EMP = EMP.PK_COD_EMP ";
                if(!empty($p_cod_concepto))
                {
                    $sql .= "AND UPPER(CON.PK_COD_CONCEPTO) LIKE(UPPER('%$p_cod_concepto%')) ";
                }

                if(!empty($p_cod_emp))
                {
                    $sql .= "AND CON.PFK_COD_EMP = '$p_cod_emp' ";
                }

                if(!empty($p_nombre))
                {
                    $sql .= "AND UPPER(CON.NOMBRE) LIKE(UPPER('%$p_nombre%')) ";
                }

                if(!empty($p_grupo))
                {
                    $sql .= "AND CON.FK_GRUPO_CONCEPTO = '$p_grupo' ";
                }

                if(!empty($p_tipo))
                {
                    $sql .= "AND CON.FK_TIPO = '$p_tipo' ";
                }

                if(!empty($p_tipo_mes))
                {
                    $sql .= "AND CON.FK_TIPO_MES = '$p_tipo_mes' ";
                }

                if(!empty($p_estado))
                {
                    $sql .= "AND CON.ESTADO = '$p_estado' ";
                }
                $sql .= "ORDER BY CON.NOMBRE ";
                

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function cargarGrupoConceptos() {
        $sql = "SELECT PK_GRUPO_CONCEPTOS, NOMBRE, OBSERVACION
                FROM NOV_GRUPO_CONCEPTOS 
                ORDER BY PK_GRUPO_CONCEPTOS";
                

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function cargarTipoConceptos() {
        $sql = "SELECT PK_TIPO_CONCEPTO, NOMBRE, OBSERVACION
                FROM NOV_TIPO_CONCEPTOS 
                ORDER BY PK_TIPO_CONCEPTO";
                

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function cargarTipoMesConceptos() {
        $sql = "SELECT PK_TIPO_MES_CONCEPTO, NOMBRE, OBSERVACION
                FROM NOV_TIPO_MES_CONCEPTOS 
                ORDER BY PK_TIPO_MES_CONCEPTO";
                

        $query = $this->db->query($sql);
        return $query->result();
    }


    public function crearConcepto(
        $p_cod_concepto, 
        $p_cod_emp, 
        $p_tipo, 
        $p_tipo_mes, 
        $p_grupo, 
        $p_nombre,
        $p_observacion,
        $p_usuario,
        $p_meses,
        $p_rango_ini,
        $p_rango_fin,
        $p_estado,
        $p_inicial,
        $p_copiar)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_INS_CONCEPTO(
                            :p_cod_concepto,
                            :p_cod_emp,
                            :p_tipo,
                            :p_tipo_mes,
                            :p_grupo,
                            :p_nombre,
                            :p_observacion,
                            :p_usuario,
                            :p_meses,
                            :p_rango_ini,
                            :p_rango_fin,
                            :p_estado,
                            :p_inicial,
                            :p_copiar,
                            :r_est,
                            :r_msg);END;");
        
        oci_bind_by_name($proc,"p_cod_concepto", $p_cod_concepto, 20, SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_emp", $p_cod_emp,20,SQLT_CHR);
        oci_bind_by_name($proc,"p_tipo", $p_tipo, 20, SQLT_CHR);
        oci_bind_by_name($proc,"p_tipo_mes", $p_tipo_mes, 20, SQLT_CHR);
        oci_bind_by_name($proc,"p_grupo", $p_grupo, 20, SQLT_CHR);
        oci_bind_by_name($proc,"p_nombre", $p_nombre, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_observacion", $p_observacion, 1000, SQLT_CHR);
        oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_meses", $p_meses, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_rango_ini", $p_rango_ini);
        oci_bind_by_name($proc,"p_rango_fin", $p_rango_fin);
        oci_bind_by_name($proc,"p_inicial", $p_inicial);
        oci_bind_by_name($proc,"p_copiar", $p_copiar, 1, SQLT_CHR);
        oci_bind_by_name($proc,"p_estado", $p_estado, 1, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }

    public function modificarConcepto(
        $p_cod_concepto, 
        $p_cod_emp, 
        $p_tipo, 
        $p_tipo_mes, 
        $p_grupo, 
        $p_nombre,
        $p_observacion,
        $p_usuario,
        $p_meses,
        $p_rango_ini,
        $p_rango_fin,
        $p_estado,
        $p_inicial,
        $p_copiar)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_UPD_CONCEPTO(
                            :p_cod_concepto,
                            :p_cod_emp,
                            :p_tipo,
                            :p_tipo_mes,
                            :p_grupo,
                            :p_nombre,
                            :p_observacion,
                            :p_usuario,
                            :p_meses,
                            :p_rango_ini,
                            :p_rango_fin,
                            :p_estado,
                            :p_inicial,
                            :p_copiar,
                            :r_est,
                            :r_msg);END;");
        
        oci_bind_by_name($proc,"p_cod_concepto", $p_cod_concepto, 20, SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_emp", $p_cod_emp,20,SQLT_CHR);
        oci_bind_by_name($proc,"p_tipo", $p_tipo, 20, SQLT_CHR);
        oci_bind_by_name($proc,"p_tipo_mes", $p_tipo_mes, 20, SQLT_CHR);
        oci_bind_by_name($proc,"p_grupo", $p_grupo, 20, SQLT_CHR);
        oci_bind_by_name($proc,"p_nombre", $p_nombre, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_observacion", $p_observacion, 1000, SQLT_CHR);
        oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_meses", $p_meses, 100, SQLT_CHR);
        oci_bind_by_name($proc,"p_rango_ini", $p_rango_ini);
        oci_bind_by_name($proc,"p_rango_fin", $p_rango_fin);
        oci_bind_by_name($proc,"p_inicial", $p_inicial);
        oci_bind_by_name($proc,"p_copiar", $p_copiar, 1, SQLT_CHR);
        oci_bind_by_name($proc,"p_estado", $p_estado, 1, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }


    


    public function cargarCCConcepto($p_cod_concepto, $p_cod_emp, $p_cod_cc, $p_nom_cc) {
        $sql = "SELECT cc.pfk_cod_emp COD_EMP, cc.pk_cod_cc COD_CC, cc.nombre NOM_CC
                FROM nov_conceptos_cc concc, nov_centro_costos cc
                WHERE concc.pfk_cod_cc = cc.pk_cod_cc
                AND concc.pfk_cod_emp = cc.pfk_cod_emp ";

                if(!empty($p_cod_concepto))
                {
                    $sql .= "AND UPPER(concc.pfk_cod_concepto) = UPPER('$p_cod_concepto') ";
                }

                if(!empty($p_cod_emp))
                {
                    $sql .= "AND concc.pfk_cod_emp = '$p_cod_emp' ";
                }
                if(!empty($p_cod_cc))
                {
                    $sql .= "AND UPPER(cc.pk_cod_cc) LIKE(UPPER('%$p_cod_cc%')) ";
                }
                if(!empty($p_nom_cc))
                {
                    $sql .= "AND UPPER(cc.nombre) LIKE(UPPER('%$p_nom_cc%')) ";
                }

        $sql .= "ORDER BY concc.pfk_cod_emp ASC, concc.pfk_cod_cc ASC ";

        $query = $this->db->query($sql);
        return $query->result();
        
    }

    public function cargarCCConceptoNo($p_cod_concepto, $p_cod_emp, $p_cod_cc, $p_nom_cc) {
        $sql = "SELECT cc.pfk_cod_emp COD_EMP, cc.pk_cod_cc COD_CC, cc.nombre NOM_CC
                FROM (
                    SELECT *
                    FROM nov_conceptos_cc CC2
                    WHERE cc2.pfk_cod_emp = '$p_cod_emp' 
                    AND cc2.pfk_cod_concepto = '$p_cod_concepto'
                ) concc, nov_centro_costos cc
                WHERE cc.pk_cod_cc = concc.pfk_cod_cc(+)
                AND cc.pfk_cod_emp = concc.pfk_cod_emp(+) 
                AND cc.pfk_cod_emp = '$p_cod_emp'
                AND cc.estado = 'A'
                AND concc.PFK_COD_CC IS NULL
                 ";
                if(!empty($p_cod_cc))
                {
                    $sql .= "AND UPPER(cc.pk_cod_cc) LIKE(UPPER('%$p_cod_cc%')) ";
                }
                if(!empty($p_nom_cc))
                {
                    $sql .= "AND UPPER(cc.nombre) LIKE(UPPER('%$p_nom_cc%')) ";
                }

        $sql .= "ORDER BY CC.pk_cod_cc ";

        $query = $this->db->query($sql);
        return $query->result();
        
    }

    public function crearConceptoCC($p_cod_concepto, $p_cod_emp, $p_cod_cc, $p_usuario)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_INS_CONCEPTO_CC(
                            :p_cod_concepto,
                            :p_cod_emp,
                            :p_cod_cc,
                            :p_usuario,
                            :r_est,
                            :r_msg);END;");
        
        oci_bind_by_name($proc,"p_cod_concepto", $p_cod_concepto, 20, SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_emp", $p_cod_emp,20,SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_cc", $p_cod_cc, 20, SQLT_CHR);
        oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }

    public function eliminarConceptoCC($p_cod_concepto, $p_cod_emp, $p_cod_cc, $p_usuario)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_DEL_CONCEPTO_CC(
                            :p_cod_concepto,
                            :p_cod_emp,
                            :p_cod_cc,
                            :p_usuario,
                            :r_est,
                            :r_msg);END;");
        
        oci_bind_by_name($proc,"p_cod_concepto", $p_cod_concepto, 20, SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_emp", $p_cod_emp,20,SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_cc", $p_cod_cc, 20, SQLT_CHR);
        oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }

    public function crearConceptoVal($p_cod_concepto, $p_cod_emp, $p_valor, $p_usuario)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_INS_CONCEPTO_VAL(
                            :p_cod_concepto,
                            :p_cod_emp,
                            :p_valor,
                            :p_usuario,
                            :r_est,
                            :r_msg);END;");
        
        oci_bind_by_name($proc,"p_cod_concepto", $p_cod_concepto, 20, SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_emp", $p_cod_emp,20,SQLT_CHR);
        oci_bind_by_name($proc,"p_valor", $p_valor);
        oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }
    

    public function eliminarConceptoVal($p_cod_concepto, $p_cod_emp, $p_index, $p_usuario)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
                $this->db->conn_id,
                    "BEGIN NOV_DEL_CONCEPTO_VAL(
                            :p_cod_concepto,
                            :p_cod_emp,
                            :p_index,
                            :p_usuario,
                            :r_est,
                            :r_msg);END;");
        
        oci_bind_by_name($proc,"p_cod_concepto", $p_cod_concepto, 20, SQLT_CHR);
        oci_bind_by_name($proc,"p_cod_emp", $p_cod_emp,20,SQLT_CHR);
        oci_bind_by_name($proc,"p_index", $p_index, -1, OCI_B_INT);
        oci_bind_by_name($proc,"p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc,"r_est",$r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc,"r_msg",$r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }

    public function cargarConceptoVal($p_cod_concepto, $p_cod_emp){
        $sql = "SELECT PFK_COD_CONCEPTO, PFK_COD_EMP, PK_INDEX, VALOR
                FROM NOV_CONCEPTO_VAL
                WHERE 1 = 1 ";
                if(!empty($p_cod_concepto))
                {
                    $sql .= "AND PFK_COD_CONCEPTO = '$p_cod_concepto' ";
                }

                if(!empty($p_cod_emp))
                {
                    $sql .= "AND PFK_COD_EMP = '$p_cod_emp' ";
                }
                $sql .= "ORDER BY PK_INDEX ASC";

        $query = $this->db->query($sql);
        return $query->result();
    }
}
