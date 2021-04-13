<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class IndicadorModel extends CI_Model
{

    public function __construct()
    {
        parent::__construct();
        $this->load->database("BD_NOVEDADES");
    }

    public function cargarConteoMensual($p_cod_emp)
    {
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

        if (!empty($p_cod_emp)) {
            $sql .= "AND EMP = '$p_cod_emp' ";
        }

        $sql .= "ORDER BY MES ASC ";

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function cargarConteoDotacionEtariaMensual(
        $p_anho,
        $p_mes,
        $p_cod_emp,
        $p_cod_ger,
        $p_cod_dep,
        $p_cod_cc
    ) {


        $sql = "SELECT 
                    ANHO, 
                    MES, 
                    (CASE 
                        WHEN MES = 1 THEN 'ENE' 
                        WHEN MES = 2 THEN 'FEB'
                        WHEN MES = 3 THEN 'MAR' 
                        WHEN MES = 4 THEN 'ABR' 
                        WHEN MES = 5 THEN 'MAY' 
                        WHEN MES = 6 THEN 'JUN' 
                        WHEN MES = 7 THEN 'JUL' 
                        WHEN MES = 8 THEN 'AGO' 
                        WHEN MES = 9 THEN 'SEP' 
                        WHEN MES = 10 THEN 'OCT' 
                        WHEN MES = 11 THEN 'NOV' 
                        WHEN MES = 12 THEN 'DIC' END) MES_TEXT,
                    COUNT(*) TOTAL,
                    ROUND(SUM(EDAD) / COUNT(*), 0) PROMEDIO,
                    SUM(CASE WHEN EDAD < 30 THEN 1 ELSE 0 END) " . '"< 30",' . "
                    SUM(CASE WHEN EDAD >= 30 AND EDAD <= 45 THEN 1 ELSE 0 END) " . '">= 30 & <= 45",' . "
                    SUM(CASE WHEN EDAD > 45 AND EDAD <= 62 THEN 1 ELSE 0 END) " . '"> 45 & <= 62",' . "
                    SUM(CASE WHEN EDAD > 62 THEN 1 ELSE 0 END) " . '"> 62"' . "
                FROM (
                    SELECT 
                        PFK_ANHO ANHO, 
                        PFK_MES MES, 
                        f_contar_anhos(
                            p_fecini=>fecha_nac/*date*/,
                            p_fecfin=>TO_DATE(
                                PFK_ANHO ||
                                case when PFK_MES < 10 THEN '0'||PFK_MES ELSE TO_CHAR(PFK_MES) END ||
                                '01',
                                'YYYYMMDD'
                            )/*date*/) EDAD
                    FROM NOV_CIERRE_MENSUAL_PERSONAL 
                    WHERE 1 = 1 
                    AND FECHA_NAC IS NOT NULL ";
        if (!empty($p_anho)) {
            $sql .= "AND PFK_ANHO = $p_anho ";
        }
        if (!empty($p_mes)) {
            $sql .= "AND PFK_MES = $p_mes ";
        }
        if (!empty($p_cod_emp)) {
            $sql .= "AND COD_EMP = '$p_cod_emp' ";
        }
        if (!empty($p_cod_ger)) {
            $sql .= "AND COD_GERENCIA = '$p_cod_ger' ";
        }
        if (!empty($p_cod_dep)) {
            $sql .= "AND COD_DEPARTAMENTO = '$p_cod_dep' ";
        }
        if (!empty($p_cod_cc)) {
            $sql .= "AND COD_CC = '$p_cod_cc' ";
        }

        $sql .= ")
                GROUP BY ANHO, MES ";

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function cargarConteoDotacionEtariaMensualDet(
        $p_anho,
        $p_mes,
        $p_cod_emp,
        $p_cod_ger,
        $p_cod_dep,
        $p_cod_cc
    ) {


        $sql = "SELECT ANHO, MES, MES_TEXT, TIPO, IND, COUNT(*) CONTAR
                FROM (SELECT 
                    ANHO, 
                    MES, 
                    (CASE 
                        WHEN MES = 1 THEN 'ENE' 
                        WHEN MES = 2 THEN 'FEB'
                        WHEN MES = 3 THEN 'MAR' 
                        WHEN MES = 4 THEN 'ABR' 
                        WHEN MES = 5 THEN 'MAY' 
                        WHEN MES = 6 THEN 'JUN' 
                        WHEN MES = 7 THEN 'JUL' 
                        WHEN MES = 8 THEN 'AGO' 
                        WHEN MES = 9 THEN 'SEP' 
                        WHEN MES = 10 THEN 'OCT' 
                        WHEN MES = 11 THEN 'NOV' 
                        WHEN MES = 12 THEN 'DIC' END) MES_TEXT,
                    CASE WHEN EDAD < 30 THEN '< 30' 
                        ELSE (CASE WHEN EDAD >= 30 AND EDAD <= 45 THEN '>= 30 & <= 45' 
                        ELSE (CASE WHEN EDAD > 45 AND EDAD <= 62 THEN '> 45 & <= 62' 
                        ELSE (CASE WHEN EDAD > 62 THEN '> 62' ELSE 'SIN TIPO' END) END) END)  END TIPO,
                    CASE WHEN EDAD < 30 THEN 1 
                        ELSE (CASE WHEN EDAD >= 30 AND EDAD <= 45 THEN 2
                        ELSE (CASE WHEN EDAD > 45 AND EDAD <= 62 THEN 3
                        ELSE (CASE WHEN EDAD > 62 THEN 4 ELSE 5 END) END) END)  END IND
                FROM (
                    SELECT 
                        PFK_ANHO ANHO, 
                        PFK_MES MES, 
                        f_contar_anhos(
                            p_fecini=>fecha_nac/*date*/,
                            p_fecfin=>TO_DATE(
                                PFK_ANHO ||
                                case when PFK_MES < 10 THEN '0'||PFK_MES ELSE TO_CHAR(PFK_MES) END ||
                                '01',
                                'YYYYMMDD'
                            )/*date*/) EDAD
                        
                    FROM NOV_CIERRE_MENSUAL_PERSONAL 
                    WHERE 1 = 1 
                    AND FECHA_NAC IS NOT NULL ";
        if (!empty($p_anho)) {
            $sql .= "AND PFK_ANHO = $p_anho ";
        }
        if (!empty($p_mes)) {
            $sql .= "AND PFK_MES = $p_mes ";
        }
        if (!empty($p_cod_emp)) {
            $sql .= "AND COD_EMP = '$p_cod_emp' ";
        }
        if (!empty($p_cod_ger)) {
            $sql .= "AND COD_GERENCIA = '$p_cod_ger' ";
        }
        if (!empty($p_cod_dep)) {
            $sql .= "AND COD_DEPARTAMENTO = '$p_cod_dep' ";
        }
        if (!empty($p_cod_cc)) {
            $sql .= "AND COD_CC = '$p_cod_cc' ";
        }

        $sql .= "))
        GROUP BY ANHO, MES, MES_TEXT, TIPO, IND 
        ORDER BY ANHO ASC, MES ASC, IND ASC 
        ";

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function cargarConteoDotacionEtariaMensualDinamic(
        $p_anho,
        $p_mes,
        $p_cod_emp,
        $p_cod_ger,
        $p_cod_dep,
        $p_cod_cc,
        $p_is_emp,
        $p_is_ger,
        $p_is_rol
    ) {


        $sql = "SELECT 
                    ANHO, 
                    MES, 
                    (CASE 
                        WHEN MES = 1 THEN 'ENE' 
                        WHEN MES = 2 THEN 'FEB'
                        WHEN MES = 3 THEN 'MAR' 
                        WHEN MES = 4 THEN 'ABR' 
                        WHEN MES = 5 THEN 'MAY' 
                        WHEN MES = 6 THEN 'JUN' 
                        WHEN MES = 7 THEN 'JUL' 
                        WHEN MES = 8 THEN 'AGO' 
                        WHEN MES = 9 THEN 'SEP' 
                        WHEN MES = 10 THEN 'OCT' 
                        WHEN MES = 11 THEN 'NOV' 
                        WHEN MES = 12 THEN 'DIC' END) MES_TEXT,
                    %emp%
                    %ger%
                    %rol%
                    COUNT(*) TOTAL,
                    ROUND(SUM(EDAD) / COUNT(*), 0) PROMEDIO,
                    SUM(CASE WHEN EDAD < 30 THEN 1 ELSE 0 END) " . '"< 30",' . "
                    SUM(CASE WHEN EDAD >= 30 AND EDAD <= 45 THEN 1 ELSE 0 END) " . '">= 30 & <= 45",' . "
                    SUM(CASE WHEN EDAD > 45 AND EDAD <= 62 THEN 1 ELSE 0 END) " . '"> 45 & <= 62",' . "
                    SUM(CASE WHEN EDAD > 62 THEN 1 ELSE 0 END) " . '"> 62"' . "
                FROM (
                    SELECT 
                        PFK_ANHO ANHO, 
                        PFK_MES MES, 
                        COD_EMP,
                        EMP.NOMBRE NOM_EMP,
                        COD_GERENCIA,
                        TRIM(REPLACE(REPLACE(REPLACE(UPPER(ROL), 'EX SHIPPING' ), '('), ')')) ROL,
                        f_contar_anhos(
                            p_fecini=>fecha_nac/*date*/,
                            p_fecfin=>TO_DATE(
                                PFK_ANHO ||
                                case when PFK_MES < 10 THEN '0'||PFK_MES ELSE TO_CHAR(PFK_MES) END ||
                                '01',
                                'YYYYMMDD'
                            )/*date*/) EDAD
                    FROM NOV_CIERRE_MENSUAL_PERSONAL per, NOV_EMPRESAS emp
                    WHERE PER.COD_EMP = EMP.PK_COD_EMP
                    AND FECHA_NAC IS NOT NULL ";
        if (!empty($p_anho)) {
            $sql .= "AND PFK_ANHO = $p_anho ";
        }
        if (!empty($p_mes)) {
            $sql .= "AND PFK_MES = $p_mes ";
        }
        if (!empty($p_cod_emp)) {
            $sql .= "AND COD_EMP = '$p_cod_emp' ";
        }
        if (!empty($p_cod_ger)) {
            $sql .= "AND COD_GERENCIA = '$p_cod_ger' ";
        }
        if (!empty($p_cod_dep)) {
            $sql .= "AND COD_DEPARTAMENTO = '$p_cod_dep' ";
        }
        if (!empty($p_cod_cc)) {
            $sql .= "AND COD_CC = '$p_cod_cc' ";
        }

        $sql .= ")
                GROUP BY 
                    ANHO, 
                    %emp%
                    %ger%
                    %rol% 
                    MES 
                ORDER BY ANHO ASC, MES ASC";

        /*%emp%
                %ger%
                %rol%*/

        if ($p_is_emp == '1') {
            $sql = str_replace('%emp%', 'COD_EMP, NOM_EMP, ', $sql);
        } else {
            $sql = str_replace('%emp%', '', $sql);
        }

        if ($p_is_ger == '1') {
            $sql = str_replace('%ger%', 'COD_GERENCIA, ', $sql);
        } else {
            $sql = str_replace('%ger%', '', $sql);
        }

        if ($p_is_rol == '1') {
            $sql = str_replace('%rol%', 'ROL, ', $sql);
        } else {
            $sql = str_replace('%rol%', '', $sql);
        }

        $query = $this->db->query($sql);
        return $query->result();
    }


    public function cargarConteoDotacionAntiguedadMensualDet(
        $p_anho,
        $p_mes,
        $p_cod_emp,
        $p_cod_ger,
        $p_cod_dep,
        $p_cod_cc
    ) {


        $sql = "SELECT ANHO, MES, MES_TEXT, TIPO, IND, COUNT(*) CONTAR
                FROM (SELECT 
                    ANHO, 
                    MES, 
                    (CASE 
                        WHEN MES = 1 THEN 'ENE' 
                        WHEN MES = 2 THEN 'FEB'
                        WHEN MES = 3 THEN 'MAR' 
                        WHEN MES = 4 THEN 'ABR' 
                        WHEN MES = 5 THEN 'MAY' 
                        WHEN MES = 6 THEN 'JUN' 
                        WHEN MES = 7 THEN 'JUL' 
                        WHEN MES = 8 THEN 'AGO' 
                        WHEN MES = 9 THEN 'SEP' 
                        WHEN MES = 10 THEN 'OCT' 
                        WHEN MES = 11 THEN 'NOV' 
                        WHEN MES = 12 THEN 'DIC' END) MES_TEXT,
                    (CASE WHEN ANTIGUEDAD < 1 THEN '< 1' 
                        ELSE CASE WHEN ANTIGUEDAD >= 1 AND ANTIGUEDAD <= 5 THEN '>= 1 & <= 5' ELSE 
                        CASE WHEN ANTIGUEDAD > 5 AND ANTIGUEDAD <= 10 THEN '> 5 & <= 10' ELSE 
                        CASE WHEN ANTIGUEDAD > 10 AND ANTIGUEDAD <= 20 THEN '> 10 & <= 20' ELSE 
                        CASE WHEN ANTIGUEDAD > 20 THEN '> 20' ELSE 'SIN TIPO' END END END END END) TIPO,
                    (CASE WHEN ANTIGUEDAD < 1 THEN 1 
                        ELSE CASE WHEN ANTIGUEDAD >= 1 AND ANTIGUEDAD <= 5 THEN 2 ELSE 
                        CASE WHEN ANTIGUEDAD > 5 AND ANTIGUEDAD <= 10 THEN 3 ELSE 
                        CASE WHEN ANTIGUEDAD > 10 AND ANTIGUEDAD <= 20 THEN 4 ELSE 
                        CASE WHEN ANTIGUEDAD > 20 THEN 5 ELSE 6 END END END END END) IND

                FROM (
                    SELECT 
                        PFK_ANHO ANHO, 
                        PFK_MES MES, 
                        f_contar_anhos(
                            p_fecini=>FECHA_INGRESO/*date*/,
                            p_fecfin=>TO_DATE(
                                PFK_ANHO ||
                                case when PFK_MES < 10 THEN '0'||PFK_MES ELSE TO_CHAR(PFK_MES) END ||
                                '01',
                                'YYYYMMDD'
                            )/*date*/) ANTIGUEDAD
                    FROM NOV_CIERRE_MENSUAL_PERSONAL 
                    WHERE 1 = 1 ";
        if (!empty($p_anho)) {
            $sql .= "AND PFK_ANHO = $p_anho ";
        }
        if (!empty($p_mes)) {
            $sql .= "AND PFK_MES = $p_mes ";
        }
        if (!empty($p_cod_emp)) {
            $sql .= "AND COD_EMP = '$p_cod_emp' ";
        }
        if (!empty($p_cod_ger)) {
            $sql .= "AND COD_GERENCIA = '$p_cod_ger' ";
        }
        if (!empty($p_cod_dep)) {
            $sql .= "AND COD_DEPARTAMENTO = '$p_cod_dep' ";
        }
        if (!empty($p_cod_cc)) {
            $sql .= "AND COD_CC = '$p_cod_cc' ";
        }

        $sql .= "))
                GROUP BY ANHO, MES, MES_TEXT, TIPO, IND
                ORDER BY ANHO ASC, MES ASC, IND ASC ";

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function cargarConteoDotacionAntiguedadMensual(
        $p_anho,
        $p_mes,
        $p_cod_emp,
        $p_cod_ger,
        $p_cod_dep,
        $p_cod_cc
    ) {


        $sql = "SELECT 
                    ANHO, 
                    MES, 
                    (CASE 
                        WHEN MES = 1 THEN 'ENE' 
                        WHEN MES = 2 THEN 'FEB'
                        WHEN MES = 3 THEN 'MAR' 
                        WHEN MES = 4 THEN 'ABR' 
                        WHEN MES = 5 THEN 'MAY' 
                        WHEN MES = 6 THEN 'JUN' 
                        WHEN MES = 7 THEN 'JUL' 
                        WHEN MES = 8 THEN 'AGO' 
                        WHEN MES = 9 THEN 'SEP' 
                        WHEN MES = 10 THEN 'OCT' 
                        WHEN MES = 11 THEN 'NOV' 
                        WHEN MES = 12 THEN 'DIC' END) MES_TEXT,
                    COUNT(*) TOTAL,
                    ROUND(SUM(ANTIGUEDAD) / COUNT(*), 0) PROMEDIO,
                    SUM(CASE WHEN ANTIGUEDAD < 1 THEN 1 ELSE 0 END) " . '"< 1",' . "
                    SUM(CASE WHEN ANTIGUEDAD >= 1 AND ANTIGUEDAD <= 5 THEN 1 ELSE 0 END) " . '">= 1 & <= 5",' . "
                    SUM(CASE WHEN ANTIGUEDAD > 5 AND ANTIGUEDAD <= 10 THEN 1 ELSE 0 END) " . '"> 5 & <= 10",' . "
                    SUM(CASE WHEN ANTIGUEDAD > 10 AND ANTIGUEDAD <= 20 THEN 1 ELSE 0 END) " . '"> 10 & <= 20",' . "
                    SUM(CASE WHEN ANTIGUEDAD > 20 THEN 1 ELSE 0 END) " . '"> 20"' . "
                FROM (
                    SELECT 
                        PFK_ANHO ANHO, 
                        PFK_MES MES, 
                        f_contar_anhos(
                            p_fecini=>FECHA_INGRESO/*date*/,
                            p_fecfin=>TO_DATE(
                                PFK_ANHO ||
                                case when PFK_MES < 10 THEN '0'||PFK_MES ELSE TO_CHAR(PFK_MES) END ||
                                '01',
                                'YYYYMMDD'
                            )/*date*/) ANTIGUEDAD
                    FROM NOV_CIERRE_MENSUAL_PERSONAL 
                    WHERE 1 = 1 ";
        if (!empty($p_anho)) {
            $sql .= "AND PFK_ANHO = $p_anho ";
        }
        if (!empty($p_mes)) {
            $sql .= "AND PFK_MES = $p_mes ";
        }
        if (!empty($p_cod_emp)) {
            $sql .= "AND COD_EMP = '$p_cod_emp' ";
        }
        if (!empty($p_cod_ger)) {
            $sql .= "AND COD_GERENCIA = '$p_cod_ger' ";
        }
        if (!empty($p_cod_dep)) {
            $sql .= "AND COD_DEPARTAMENTO = '$p_cod_dep' ";
        }
        if (!empty($p_cod_cc)) {
            $sql .= "AND COD_CC = '$p_cod_cc' ";
        }

        $sql .= ")
                GROUP BY ANHO, MES 
                ORDER BY ANHO ASC, MES ASC ";

        $query = $this->db->query($sql);
        return $query->result();
    }


    public function cargarConteoDotacionAntiguedadMensualDinamic(
        $p_anho,
        $p_mes,
        $p_cod_emp,
        $p_cod_ger,
        $p_cod_dep,
        $p_cod_cc,
        $p_is_emp,
        $p_is_ger,
        $p_is_rol
    ) {


        $sql = "SELECT 
                    ANHO, 
                    MES, 
                    (CASE 
                        WHEN MES = 1 THEN 'ENE' 
                        WHEN MES = 2 THEN 'FEB'
                        WHEN MES = 3 THEN 'MAR' 
                        WHEN MES = 4 THEN 'ABR' 
                        WHEN MES = 5 THEN 'MAY' 
                        WHEN MES = 6 THEN 'JUN' 
                        WHEN MES = 7 THEN 'JUL' 
                        WHEN MES = 8 THEN 'AGO' 
                        WHEN MES = 9 THEN 'SEP' 
                        WHEN MES = 10 THEN 'OCT' 
                        WHEN MES = 11 THEN 'NOV' 
                        WHEN MES = 12 THEN 'DIC' END) MES_TEXT,
                    %emp%
                    %ger%
                    %rol%
                    COUNT(*) TOTAL,
                    ROUND(SUM(ANTIGUEDAD) / COUNT(*), 0) PROMEDIO,
                    SUM(CASE WHEN ANTIGUEDAD < 1 THEN 1 ELSE 0 END) " . '"< 1",' . "
                    SUM(CASE WHEN ANTIGUEDAD >= 1 AND ANTIGUEDAD <= 5 THEN 1 ELSE 0 END) " . '">= 1 & <= 5",' . "
                    SUM(CASE WHEN ANTIGUEDAD > 5 AND ANTIGUEDAD <= 10 THEN 1 ELSE 0 END) " . '"> 5 & <= 10",' . "
                    SUM(CASE WHEN ANTIGUEDAD > 10 AND ANTIGUEDAD <= 20 THEN 1 ELSE 0 END) " . '"> 10 & <= 20",' . "
                    SUM(CASE WHEN ANTIGUEDAD > 20 THEN 1 ELSE 0 END) " . '"> 20"' . "
                FROM (
                    SELECT 
                        PFK_ANHO ANHO, 
                        PFK_MES MES, 
                        COD_EMP,
                        emp.NOMBRE NOM_EMP,
                        COD_GERENCIA,
                        TRIM(REPLACE(REPLACE(REPLACE(UPPER(ROL), 'EX SHIPPING' ), '('), ')')) ROL,
                        f_contar_anhos(
                            p_fecini=>FECHA_INGRESO/*date*/,
                            p_fecfin=>TO_DATE(
                                PFK_ANHO ||
                                case when PFK_MES < 10 THEN '0'||PFK_MES ELSE TO_CHAR(PFK_MES) END ||
                                '01',
                                'YYYYMMDD'
                            )/*date*/) ANTIGUEDAD
                    FROM NOV_CIERRE_MENSUAL_PERSONAL per, NOV_EMPRESAS emp
                    WHERE PER.COD_EMP = EMP.PK_COD_EMP ";
        if (!empty($p_anho)) {
            $sql .= "AND PFK_ANHO = $p_anho ";
        }
        if (!empty($p_mes)) {
            $sql .= "AND PFK_MES = $p_mes ";
        }
        if (!empty($p_cod_emp)) {
            $sql .= "AND COD_EMP = '$p_cod_emp' ";
        }
        if (!empty($p_cod_ger)) {
            $sql .= "AND COD_GERENCIA = '$p_cod_ger' ";
        }
        if (!empty($p_cod_dep)) {
            $sql .= "AND COD_DEPARTAMENTO = '$p_cod_dep' ";
        }
        if (!empty($p_cod_cc)) {
            $sql .= "AND COD_CC = '$p_cod_cc' ";
        }

        $sql .= ")
                GROUP BY 
                    ANHO, 
                    %emp%
                    %ger%
                    %rol% 
                    MES 
                ORDER BY ANHO ASC, MES ASC";

        /*%emp%
                %ger%
                %rol%*/

        if ($p_is_emp == '1') {
            $sql = str_replace('%emp%', 'COD_EMP, NOM_EMP, ', $sql);
        } else {
            $sql = str_replace('%emp%', '', $sql);
        }

        if ($p_is_ger == '1') {
            $sql = str_replace('%ger%', 'COD_GERENCIA, ', $sql);
        } else {
            $sql = str_replace('%ger%', '', $sql);
        }

        if ($p_is_rol == '1') {
            $sql = str_replace('%rol%', 'ROL, ', $sql);
        } else {
            $sql = str_replace('%rol%', '', $sql);
        }



        $query = $this->db->query($sql);
        return $query->result();
    }


    public function cargarConteoDotacionRolPaisMensual(
        $p_anho,
        $p_mes,
        $p_cod_emp,
        $p_cod_ger,
        $p_cod_dep,
        $p_cod_cc,
        $p_rol_cargo
    ) {


        $sql = "SELECT 
                    ANHO, 
                    MES, 
                    (CASE 
                        WHEN MES = 1 THEN 'ENE' 
                        WHEN MES = 2 THEN 'FEB'
                        WHEN MES = 3 THEN 'MAR' 
                        WHEN MES = 4 THEN 'ABR' 
                        WHEN MES = 5 THEN 'MAY' 
                        WHEN MES = 6 THEN 'JUN' 
                        WHEN MES = 7 THEN 'JUL' 
                        WHEN MES = 8 THEN 'AGO' 
                        WHEN MES = 9 THEN 'SEP' 
                        WHEN MES = 10 THEN 'OCT' 
                        WHEN MES = 11 THEN 'NOV' 
                        WHEN MES = 12 THEN 'DIC' END) MES_TEXT,
                    
                    SUM(CASE WHEN 
                        UPPER(COD_PAIS) = 'CHL' OR 
                        UPPER(COD_PAIS)  = 'CHILENA' OR 
                        UPPER(COD_PAIS)  = 'CHILENO' OR 
                        UPPER(COD_PAIS) = 'CHILE' OR
                        UPPER(COD_PAIS) = 'CHI' OR
                        UPPER(COD_PAIS) = 'CL' THEN
                    1 ELSE 0 END) NACIONAL,
                    COUNT(*) - SUM(CASE WHEN 
                        UPPER(COD_PAIS) = 'CHL' OR 
                        UPPER(COD_PAIS)  = 'CHILENA' OR 
                        UPPER(COD_PAIS)  = 'CHILENO' OR 
                        UPPER(COD_PAIS) = 'CHILE' OR
                        UPPER(COD_PAIS) = 'CHI' OR
                        UPPER(COD_PAIS) = 'CL' THEN
                    1 ELSE 0 END) EXTRANJERO
                    
                FROM (
                    SELECT 
                        PFK_ANHO ANHO, 
                        PFK_MES MES, 
                        nvl(COD_PAIS, 'SIN PAIS') COD_PAIS
                    FROM NOV_CIERRE_MENSUAL_PERSONAL 
                    WHERE 1 = 1 ";
        if (!empty($p_anho)) {
            $sql .= "AND PFK_ANHO = $p_anho ";
        }
        if (!empty($p_mes)) {
            $sql .= "AND PFK_MES = $p_mes ";
        }
        if (!empty($p_cod_emp)) {
            $sql .= "AND COD_EMP = '$p_cod_emp' ";
        }
        if (!empty($p_cod_ger)) {
            $sql .= "AND COD_GERENCIA = '$p_cod_ger' ";
        }
        if (!empty($p_cod_dep)) {
            $sql .= "AND COD_DEPARTAMENTO = '$p_cod_dep' ";
        }
        if (!empty($p_cod_cc)) {
            $sql .= "AND COD_CC = '$p_cod_cc' ";
        }

        if (!empty($p_rol_cargo)) {
            $sql .= "AND TRIM(REPLACE(REPLACE(REPLACE(UPPER(ROL), 'EX SHIPPING' ), '('), ')')) = UPPER('$p_rol_cargo') ";
        }

        $sql .= ")
                GROUP BY ANHO, MES
                ORDER BY ANHO ASC, MES ASC";

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function cargarConteoDotacionRolPaisMensualDinamic(
        $p_anho,
        $p_mes,
        $p_cod_emp,
        $p_cod_ger,
        $p_cod_dep,
        $p_cod_cc,
        $p_rol_cargo,
        $p_is_emp,
        $p_is_ger,
        $p_is_rol
    ) {


        $sql = "SELECT 
                    ANHO, 
                    MES, 
                    (CASE 
                        WHEN MES = 1 THEN 'ENE' 
                        WHEN MES = 2 THEN 'FEB'
                        WHEN MES = 3 THEN 'MAR' 
                        WHEN MES = 4 THEN 'ABR' 
                        WHEN MES = 5 THEN 'MAY' 
                        WHEN MES = 6 THEN 'JUN' 
                        WHEN MES = 7 THEN 'JUL' 
                        WHEN MES = 8 THEN 'AGO' 
                        WHEN MES = 9 THEN 'SEP' 
                        WHEN MES = 10 THEN 'OCT' 
                        WHEN MES = 11 THEN 'NOV' 
                        WHEN MES = 12 THEN 'DIC' END) MES_TEXT,
                    %emp%
                    %ger%
                    %rol%
                    COUNT(*) TOTAL,
                    SUM(CASE WHEN 
                        UPPER(COD_PAIS) = 'CHL' OR 
                        UPPER(COD_PAIS)  = 'CHILENA' OR 
                        UPPER(COD_PAIS)  = 'CHILENO' OR 
                        UPPER(COD_PAIS) = 'CHILE' OR
                        UPPER(COD_PAIS) = 'CHI' OR
                        UPPER(COD_PAIS) = 'CL' THEN
                    1 ELSE 0 END) NACIONAL,
                    COUNT(*) - SUM(CASE WHEN 
                        UPPER(COD_PAIS) = 'CHL' OR 
                        UPPER(COD_PAIS)  = 'CHILENA' OR 
                        UPPER(COD_PAIS)  = 'CHILENO' OR 
                        UPPER(COD_PAIS) = 'CHILE' OR
                        UPPER(COD_PAIS) = 'CHI' OR
                        UPPER(COD_PAIS) = 'CL' THEN
                    1 ELSE 0 END) EXTRANJERO
                    
                FROM (
                    SELECT 
                        PFK_ANHO ANHO, 
                        PFK_MES MES, 
                        COD_EMP,
                        emp.NOMBRE NOM_EMP,
                        COD_GERENCIA,
                        TRIM(REPLACE(REPLACE(REPLACE(UPPER(ROL), 'EX SHIPPING' ), '('), ')')) ROL,
                        nvl(COD_PAIS, 'SIN PAIS') COD_PAIS
                    FROM NOV_CIERRE_MENSUAL_PERSONAL per, NOV_EMPRESAS emp
                    WHERE PER.COD_EMP = EMP.PK_COD_EMP ";
        if (!empty($p_anho)) {
            $sql .= "AND PFK_ANHO = $p_anho ";
        }
        if (!empty($p_mes)) {
            $sql .= "AND PFK_MES = $p_mes ";
        }
        if (!empty($p_cod_emp)) {
            $sql .= "AND COD_EMP = '$p_cod_emp' ";
        }
        if (!empty($p_cod_ger)) {
            $sql .= "AND COD_GERENCIA = '$p_cod_ger' ";
        }
        if (!empty($p_cod_dep)) {
            $sql .= "AND COD_DEPARTAMENTO = '$p_cod_dep' ";
        }
        if (!empty($p_cod_cc)) {
            $sql .= "AND COD_CC = '$p_cod_cc' ";
        }

        if (!empty($p_rol_cargo)) {
            $sql .= "AND TRIM(REPLACE(REPLACE(REPLACE(UPPER(ROL), 'EX SHIPPING' ), '('), ')')) = UPPER('$p_rol_cargo') ";
        }

        $sql .= ")
                GROUP BY 
                    ANHO, 
                    %emp%
                    %ger%
                    %rol% 
                    MES 
                ORDER BY ANHO ASC, MES ASC";

        /*%emp%
                %ger%
                %rol%*/

        if ($p_is_emp == '1') {
            $sql = str_replace('%emp%', 'COD_EMP, NOM_EMP, ', $sql);
        } else {
            $sql = str_replace('%emp%', '', $sql);
        }

        if ($p_is_ger == '1') {
            $sql = str_replace('%ger%', 'COD_GERENCIA, ', $sql);
        } else {
            $sql = str_replace('%ger%', '', $sql);
        }

        if ($p_is_rol == '1') {
            $sql = str_replace('%rol%', 'ROL, ', $sql);
        } else {
            $sql = str_replace('%rol%', '', $sql);
        }


        $query = $this->db->query($sql);
        return $query->result();
    }

    public function cargarConteoDotacionRolPaisMensualDet(
        $p_anho,
        $p_mes,
        $p_cod_emp,
        $p_cod_ger,
        $p_cod_dep,
        $p_cod_cc,
        $p_rol_cargo
    ) {


        $sql = "SELECT ANHO, MES, MES_TEXT, TIPO, COUNT(*) CONTAR
                FROM (SELECT 
                    ANHO, 
                    MES, 
                    (CASE 
                        WHEN MES = 1 THEN 'ENE' 
                        WHEN MES = 2 THEN 'FEB'
                        WHEN MES = 3 THEN 'MAR' 
                        WHEN MES = 4 THEN 'ABR' 
                        WHEN MES = 5 THEN 'MAY' 
                        WHEN MES = 6 THEN 'JUN' 
                        WHEN MES = 7 THEN 'JUL' 
                        WHEN MES = 8 THEN 'AGO' 
                        WHEN MES = 9 THEN 'SEP' 
                        WHEN MES = 10 THEN 'OCT' 
                        WHEN MES = 11 THEN 'NOV' 
                        WHEN MES = 12 THEN 'DIC' END) MES_TEXT,
                        (CASE WHEN 
                            UPPER(COD_PAIS) = 'CHL' OR 
                            UPPER(COD_PAIS)  = 'CHILENA' OR 
                            UPPER(COD_PAIS)  = 'CHILENO' OR 
                            UPPER(COD_PAIS) = 'CHILE' OR
                            UPPER(COD_PAIS) = 'CHI' OR
                            UPPER(COD_PAIS) = 'CL' THEN
                        'NACIONAL' ELSE 'EXTRANJERO' END) TIPO
                FROM (
                    SELECT 
                        PFK_ANHO ANHO, 
                        PFK_MES MES, 
                        nvl(COD_PAIS, 'SIN PAIS') COD_PAIS
                    FROM NOV_CIERRE_MENSUAL_PERSONAL 
                    WHERE 1 = 1 ";
        if (!empty($p_anho)) {
            $sql .= "AND PFK_ANHO = $p_anho ";
        }
        if (!empty($p_mes)) {
            $sql .= "AND PFK_MES = $p_mes ";
        }
        if (!empty($p_cod_emp)) {
            $sql .= "AND COD_EMP = '$p_cod_emp' ";
        }
        if (!empty($p_cod_ger)) {
            $sql .= "AND COD_GERENCIA = '$p_cod_ger' ";
        }
        if (!empty($p_cod_dep)) {
            $sql .= "AND COD_DEPARTAMENTO = '$p_cod_dep' ";
        }
        if (!empty($p_cod_cc)) {
            $sql .= "AND COD_CC = '$p_cod_cc' ";
        }

        if (!empty($p_rol_cargo)) {
            $sql .= "AND TRIM(REPLACE(REPLACE(REPLACE(UPPER(ROL), 'EX SHIPPING' ), '('), ')')) = UPPER('$p_rol_cargo') ";
        }

        $sql .= "))
                GROUP BY ANHO, MES, MES_TEXT, TIPO
                ORDER BY ANHO ASC, MES ASC, MES_TEXT ASC, TIPO DESC";

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function cargarConteoDotacionRolSexoMensual(
        $p_anho,
        $p_mes,
        $p_cod_emp,
        $p_cod_ger,
        $p_cod_dep,
        $p_cod_cc,
        $p_rol_cargo
    ) {

        $sql = "SELECT 
                    ANHO, 
                    MES, 
                    (CASE 
                        WHEN MES = 1 THEN 'ENE' 
                        WHEN MES = 2 THEN 'FEB'
                        WHEN MES = 3 THEN 'MAR' 
                        WHEN MES = 4 THEN 'ABR' 
                        WHEN MES = 5 THEN 'MAY' 
                        WHEN MES = 6 THEN 'JUN' 
                        WHEN MES = 7 THEN 'JUL' 
                        WHEN MES = 8 THEN 'AGO' 
                        WHEN MES = 9 THEN 'SEP' 
                        WHEN MES = 10 THEN 'OCT' 
                        WHEN MES = 11 THEN 'NOV' 
                        WHEN MES = 12 THEN 'DIC' END) MES_TEXT,
                    SUM(CASE WHEN COD_SEXO = 'F' THEN 1 ELSE 0 END) F,
                    SUM(CASE WHEN COD_SEXO <> 'F' THEN 1 ELSE 0 END) M
                FROM (
                    SELECT 
                        PFK_ANHO ANHO, 
                        PFK_MES MES, 
                        COD_SEXO
                    FROM NOV_CIERRE_MENSUAL_PERSONAL 
                    WHERE 1 = 1 ";
        if (!empty($p_anho)) {
            $sql .= "AND PFK_ANHO = $p_anho ";
        }
        if (!empty($p_mes)) {
            $sql .= "AND PFK_MES = $p_mes ";
        }
        if (!empty($p_cod_emp)) {
            $sql .= "AND COD_EMP = '$p_cod_emp' ";
        }
        if (!empty($p_cod_ger)) {
            $sql .= "AND COD_GERENCIA = '$p_cod_ger' ";
        }
        if (!empty($p_cod_dep)) {
            $sql .= "AND COD_DEPARTAMENTO = '$p_cod_dep' ";
        }
        if (!empty($p_cod_cc)) {
            $sql .= "AND COD_CC = '$p_cod_cc' ";
        }
        if (!empty($p_rol_cargo)) {
            $sql .= "AND TRIM(REPLACE(REPLACE(REPLACE(UPPER(ROL), 'EX SHIPPING' ), '('), ')')) = UPPER('$p_rol_cargo') ";
        }

        $sql .= ")
                GROUP BY ANHO, MES 
                ORDER BY ANHO ASC, MES ASC";
        $query = $this->db->query($sql);
        return $query->result();
    }


    public function cargarConteoDotacionRolSexoMensualDet(
        $p_anho,
        $p_mes,
        $p_cod_emp,
        $p_cod_ger,
        $p_cod_dep,
        $p_cod_cc,
        $p_rol_cargo
    ) {

        $sql = "SELECT ANHO, MES, MES_TEXT, TIPO, COUNT(*) CONTAR
                FROM (SELECT 
                    ANHO, 
                    MES, 
                    (CASE 
                        WHEN MES = 1 THEN 'ENE' 
                        WHEN MES = 2 THEN 'FEB'
                        WHEN MES = 3 THEN 'MAR' 
                        WHEN MES = 4 THEN 'ABR' 
                        WHEN MES = 5 THEN 'MAY' 
                        WHEN MES = 6 THEN 'JUN' 
                        WHEN MES = 7 THEN 'JUL' 
                        WHEN MES = 8 THEN 'AGO' 
                        WHEN MES = 9 THEN 'SEP' 
                        WHEN MES = 10 THEN 'OCT' 
                        WHEN MES = 11 THEN 'NOV' 
                        WHEN MES = 12 THEN 'DIC' END) MES_TEXT,
                        (CASE WHEN COD_SEXO = 'F' THEN 'F' ELSE 'M' END) TIPO
                FROM (
                    SELECT 
                        PFK_ANHO ANHO, 
                        PFK_MES MES, 
                        COD_SEXO
                    FROM NOV_CIERRE_MENSUAL_PERSONAL 
                    WHERE 1 = 1 ";
        if (!empty($p_anho)) {
            $sql .= "AND PFK_ANHO = $p_anho ";
        }
        if (!empty($p_mes)) {
            $sql .= "AND PFK_MES = $p_mes ";
        }
        if (!empty($p_cod_emp)) {
            $sql .= "AND COD_EMP = '$p_cod_emp' ";
        }
        if (!empty($p_cod_ger)) {
            $sql .= "AND COD_GERENCIA = '$p_cod_ger' ";
        }
        if (!empty($p_cod_dep)) {
            $sql .= "AND COD_DEPARTAMENTO = '$p_cod_dep' ";
        }
        if (!empty($p_cod_cc)) {
            $sql .= "AND COD_CC = '$p_cod_cc' ";
        }
        if (!empty($p_rol_cargo)) {
            $sql .= "AND TRIM(REPLACE(REPLACE(REPLACE(UPPER(ROL), 'EX SHIPPING' ), '('), ')')) = UPPER('$p_rol_cargo') ";
        }

        $sql .= "))
                GROUP BY ANHO, MES, MES_TEXT, TIPO 
                ORDER BY ANHO ASC, MES ASC, MES_TEXT ASC, TIPO DESC";
        $query = $this->db->query($sql);
        return $query->result();
    }

    public function cargarConteoDotacionSexoMensualDinamic(
        $p_anho,
        $p_mes,
        $p_cod_emp,
        $p_cod_ger,
        $p_cod_dep,
        $p_cod_cc,
        $p_rol_cargo,
        $p_is_emp,
        $p_is_ger,
        $p_is_rol
    ) {

        $sql = "SELECT 
                    ANHO, 
                    MES, 
                    (CASE 
                        WHEN MES = 1 THEN 'ENE' 
                        WHEN MES = 2 THEN 'FEB'
                        WHEN MES = 3 THEN 'MAR' 
                        WHEN MES = 4 THEN 'ABR' 
                        WHEN MES = 5 THEN 'MAY' 
                        WHEN MES = 6 THEN 'JUN' 
                        WHEN MES = 7 THEN 'JUL' 
                        WHEN MES = 8 THEN 'AGO' 
                        WHEN MES = 9 THEN 'SEP' 
                        WHEN MES = 10 THEN 'OCT' 
                        WHEN MES = 11 THEN 'NOV' 
                        WHEN MES = 12 THEN 'DIC' END) MES_TEXT,
                    %emp%
                    %ger%
                    %rol%
                    SUM(CASE WHEN COD_SEXO = 'F' THEN 1 ELSE 0 END) F,
                    SUM(CASE WHEN COD_SEXO <> 'F' THEN 1 ELSE 0 END) M,
                    COUNT(*) TOTAL
                FROM (
                    SELECT 
                        PFK_ANHO ANHO, 
                        PFK_MES MES, 
                        COD_SEXO,
                        COD_EMP,
                        emp.NOMBRE NOM_EMP,
                        COD_GERENCIA,
                        TRIM(REPLACE(REPLACE(REPLACE(UPPER(ROL), 'EX SHIPPING' ), '('), ')')) ROL
                    FROM NOV_CIERRE_MENSUAL_PERSONAL per, NOV_EMPRESAS emp
                    WHERE PER.COD_EMP = EMP.PK_COD_EMP ";
        if (!empty($p_anho)) {
            $sql .= "AND PFK_ANHO = $p_anho ";
        }
        if (!empty($p_mes)) {
            $sql .= "AND PFK_MES = $p_mes ";
        }
        if (!empty($p_cod_emp)) {
            $sql .= "AND COD_EMP = '$p_cod_emp' ";
        }
        if (!empty($p_cod_ger)) {
            $sql .= "AND COD_GERENCIA = '$p_cod_ger' ";
        }
        if (!empty($p_cod_dep)) {
            $sql .= "AND COD_DEPARTAMENTO = '$p_cod_dep' ";
        }
        if (!empty($p_cod_cc)) {
            $sql .= "AND COD_CC = '$p_cod_cc' ";
        }
        if (!empty($p_rol_cargo)) {
            $sql .= "AND TRIM(REPLACE(REPLACE(REPLACE(UPPER(ROL), 'EX SHIPPING' ), '('), ')')) = UPPER('$p_rol_cargo') ";
        }

        $sql .= ")
                GROUP BY %emp%%ger%%rol% ANHO, MES 
                ORDER BY ANHO ASC, MES ASC";


        /*%emp%
                %ger%
                %rol%*/

        if ($p_is_emp == '1') {
            $sql = str_replace('%emp%', 'COD_EMP, NOM_EMP, ', $sql);
        } else {
            $sql = str_replace('%emp%', '', $sql);
        }

        if ($p_is_ger == '1') {
            $sql = str_replace('%ger%', 'COD_GERENCIA, ', $sql);
        } else {
            $sql = str_replace('%ger%', '', $sql);
        }

        if ($p_is_rol == '1') {
            $sql = str_replace('%rol%', 'ROL, ', $sql);
        } else {
            $sql = str_replace('%rol%', '', $sql);
        }

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function cargarConteoRotacionMensual(
        $p_cod_emp,
        $p_cod_ger,
        $p_cod_dep,
        $p_cod_cc,
        $p_rol_cargo,
        $p_causal
    ) {

        $sql = "SELECT 
                    ANHO, 
                    MES, 
                    (CASE 
                        WHEN MES = 1 THEN 'ENE' 
                        WHEN MES = 2 THEN 'FEB'
                        WHEN MES = 3 THEN 'MAR' 
                        WHEN MES = 4 THEN 'ABR' 
                        WHEN MES = 5 THEN 'MAY' 
                        WHEN MES = 6 THEN 'JUN' 
                        WHEN MES = 7 THEN 'JUL' 
                        WHEN MES = 8 THEN 'AGO' 
                        WHEN MES = 9 THEN 'SEP' 
                        WHEN MES = 10 THEN 'OCT' 
                        WHEN MES = 11 THEN 'NOV' 
                        WHEN MES = 12 THEN 'DIC' END) MES_TEXT,
                    ROL,
                    COUNT(DISTINCT ANHO|| LPAD(MES, 2, '0')) MESES,
                    COUNT(*) DOTACION,
                    SUM(CASE WHEN COD_CAUSAL IS NOT NULL AND TO_CHAR(FECHA_BAJA, 'YYYYMM') = PFK_ANHO|| LPAD(PFK_MES, 2, '0') THEN 1 ELSE 0 END) ROTACION_TOTAL,
                    SUM(CASE WHEN COD_CAUSAL = '2' AND TO_CHAR(FECHA_BAJA, 'YYYYMM') = PFK_ANHO|| LPAD(PFK_MES, 2, '0') THEN 1 ELSE 0 END) ROTACION_VOLUNTARIA
                FROM (
                    SELECT 
                        PFK_ANHO ANHO, 
                        PFK_MES MES, 
                        COD_CAUSAL,
                        fecha_baja,
                        TRIM(REPLACE(REPLACE(REPLACE(UPPER(ROL), 'EX SHIPPING' ), '('), ')')) ROL
                    FROM NOV_CIERRE_MENSUAL_PERSONAL 
                    WHERE 1 = 1 
                    AND PFK_ANHO|| LPAD(PFK_MES, 2, '0') BETWEEN 
                        TO_CHAR(ADD_MONTHS((SELECT MAX(TO_DATE(PFK_ANHO|| LPAD(PFK_MES, 2, '0'), 'YYYYMM'))
                        FROM NOV_CIERRE_MENSUAL_PERSONAL), -11), 'YYYYMM')
                    AND TO_CHAR((SELECT MAX(TO_DATE(PFK_ANHO|| LPAD(PFK_MES, 2, '0'), 'YYYYMM'))
                        FROM NOV_CIERRE_MENSUAL_PERSONAL), 'YYYYMM') ";

        if (!empty($p_cod_emp)) {
            $sql .= "AND COD_EMP = '$p_cod_emp' ";
        }
        if (!empty($p_cod_ger)) {
            $sql .= "AND COD_GERENCIA = '$p_cod_ger' ";
        }
        if (!empty($p_cod_dep)) {
            $sql .= "AND COD_DEPARTAMENTO = '$p_cod_dep' ";
        }
        if (!empty($p_cod_cc)) {
            $sql .= "AND COD_CC = '$p_cod_cc' ";
        }
        if (!empty($p_rol_cargo)) {
            $sql .= "AND TRIM(REPLACE(REPLACE(REPLACE(UPPER(ROL), 'EX SHIPPING' ), '('), ')')) = UPPER('$p_rol_cargo') ";
        }
        if (!empty($p_causal)) {
            $sql .= "AND COD_CAUSAL = '$p_causal' ";
        }

        $sql .= ")
                GROUP BY ANHO, MES, ROL 
                
        UNION ALL 
        SELECT 
                    null ANHO, 
                    0 MES, 
                    'TOTAL' MES_TEXT,
                    ROL,
                    COUNT(DISTINCT ANHO || LPAD(MES, 2, '0')) MESES,
                    round(COUNT(*) / 12, 2) DOTACION,
                    SUM(CASE WHEN COD_CAUSAL IS NOT NULL AND TO_CHAR(FECHA_BAJA, 'YYYYMM') = PFK_ANHO|| LPAD(PFK_MES, 2, '0') THEN 1 ELSE 0 END) ROTACION_TOTAL,
                    SUM(CASE WHEN COD_CAUSAL = '2' AND TO_CHAR(FECHA_BAJA, 'YYYYMM') = PFK_ANHO|| LPAD(PFK_MES, 2, '0') THEN 1 ELSE 0 END) ROTACION_VOLUNTARIA
                FROM (
                    SELECT 
                        PFK_ANHO ANHO, 
                        PFK_MES MES, 
                        COD_CAUSAL,
                        fecha_baja,
                        TRIM(REPLACE(REPLACE(REPLACE(UPPER(ROL), 'EX SHIPPING' ), '('), ')')) ROL
                    FROM NOV_CIERRE_MENSUAL_PERSONAL 
                    WHERE 1 = 1 
                    AND PFK_ANHO|| LPAD(PFK_MES, 2, '0') BETWEEN 
                    TO_CHAR(ADD_MONTHS((SELECT MAX(TO_DATE(PFK_ANHO|| LPAD(PFK_MES, 2, '0'), 'YYYYMM'))
                    FROM NOV_CIERRE_MENSUAL_PERSONAL), -11), 'YYYYMM')
                AND TO_CHAR((SELECT MAX(TO_DATE(PFK_ANHO|| LPAD(PFK_MES, 2, '0'), 'YYYYMM'))
                    FROM NOV_CIERRE_MENSUAL_PERSONAL), 'YYYYMM') ";

        if (!empty($p_cod_emp)) {
            $sql .= "AND COD_EMP = '$p_cod_emp' ";
        }
        if (!empty($p_cod_ger)) {
            $sql .= "AND COD_GERENCIA = '$p_cod_ger' ";
        }
        if (!empty($p_cod_dep)) {
            $sql .= "AND COD_DEPARTAMENTO = '$p_cod_dep' ";
        }
        if (!empty($p_cod_cc)) {
            $sql .= "AND COD_CC = '$p_cod_cc' ";
        }
        if (!empty($p_rol_cargo)) {
            $sql .= "AND TRIM(REPLACE(REPLACE(REPLACE(UPPER(ROL), 'EX SHIPPING' ), '('), ')')) = UPPER('$p_rol_cargo') ";
        }
        if (!empty($p_causal)) {
            $sql .= "AND COD_CAUSAL = '$p_causal' ";
        }

        $sql .= ")
                GROUP BY ROL ";
        $query = $this->db->query($sql);
        return $query->result();
    }

    public function cargarConteoRotacionMensualDinamic(
        $p_cod_emp,
        $p_cod_ger,
        $p_cod_dep,
        $p_cod_cc,
        $p_rol_cargo,
        $p_causal,
        $p_is_emp,
        $p_is_ger,
        $p_is_rol
    ) {

        $sql = "SELECT 
                    ANHO, 
                    MES, 
                    (CASE 
                        WHEN MES = 1 THEN 'ENE' 
                        WHEN MES = 2 THEN 'FEB'
                        WHEN MES = 3 THEN 'MAR' 
                        WHEN MES = 4 THEN 'ABR' 
                        WHEN MES = 5 THEN 'MAY' 
                        WHEN MES = 6 THEN 'JUN' 
                        WHEN MES = 7 THEN 'JUL' 
                        WHEN MES = 8 THEN 'AGO' 
                        WHEN MES = 9 THEN 'SEP' 
                        WHEN MES = 10 THEN 'OCT' 
                        WHEN MES = 11 THEN 'NOV' 
                        WHEN MES = 12 THEN 'DIC' END) MES_TEXT,
                    %emp%
                    %ger%
                    %rol%
                    COUNT(DISTINCT ANHO|| LPAD(MES, 2, '0')) MESES,
                    COUNT(*) DOTACION,
                    SUM(CASE WHEN COD_CAUSAL IS NOT NULL 
                        AND TO_CHAR(FECHA_BAJA, 'YYYYMM') = ANHO|| LPAD(MES, 2, '0')
                        THEN 1 ELSE 0 END) ROTACION_TOTAL,
                    SUM(CASE WHEN COD_CAUSAL = '2' 
                        AND TO_CHAR(FECHA_BAJA, 'YYYYMM') = ANHO|| LPAD(MES, 2, '0') 
                        THEN 1 ELSE 0 END) ROTACION_VOLUNTARIA
                FROM (
                    SELECT 
                        PFK_ANHO ANHO, 
                        PFK_MES MES, 
                        COD_CAUSAL,
                        COD_EMP,
                        fecha_baja,
                        emp.NOMBRE NOM_EMP,
                        COD_GERENCIA,
                        TRIM(REPLACE(REPLACE(REPLACE(UPPER(ROL), 'EX SHIPPING' ), '('), ')')) ROL
                    FROM NOV_CIERRE_MENSUAL_PERSONAL per, NOV_EMPRESAS emp
                    WHERE PER.COD_EMP = EMP.PK_COD_EMP 
                    AND PFK_ANHO|| LPAD(PFK_MES, 2, '0') BETWEEN 
                        TO_CHAR(ADD_MONTHS((SELECT MAX(TO_DATE(PFK_ANHO|| LPAD(PFK_MES, 2, '0'), 'YYYYMM'))
                        FROM NOV_CIERRE_MENSUAL_PERSONAL), -11), 'YYYYMM')
                    AND TO_CHAR((SELECT MAX(TO_DATE(PFK_ANHO|| LPAD(PFK_MES, 2, '0'), 'YYYYMM'))
                        FROM NOV_CIERRE_MENSUAL_PERSONAL), 'YYYYMM') ";

        if (!empty($p_cod_emp)) {
            $sql .= "AND COD_EMP = '$p_cod_emp' ";
        }
        if (!empty($p_cod_ger)) {
            $sql .= "AND COD_GERENCIA = '$p_cod_ger' ";
        }
        if (!empty($p_cod_dep)) {
            $sql .= "AND COD_DEPARTAMENTO = '$p_cod_dep' ";
        }
        if (!empty($p_cod_cc)) {
            $sql .= "AND COD_CC = '$p_cod_cc' ";
        }
        if (!empty($p_rol_cargo)) {
            $sql .= "AND TRIM(REPLACE(REPLACE(REPLACE(UPPER(ROL), 'EX SHIPPING' ), '('), ')')) = UPPER('$p_rol_cargo') ";
        }
        if (!empty($p_causal)) {
            $sql .= "AND COD_CAUSAL = '$p_causal' ";
        }

        $sql .= ")
                GROUP BY 
                    ANHO, 
                    %emp%
                    %ger%
                    %rol% 
                    MES 
        UNION ALL 
        SELECT 
                    null ANHO, 
                    0 MES, 
                    'TOTAL' MES_TEXT,
                    %emp%
                    %ger%
                    %rol%
                    COUNT(DISTINCT ANHO || LPAD(MES, 2, '0')) MESES,
                    round(COUNT(*) / 12, 2) DOTACION,
                    SUM(CASE WHEN COD_CAUSAL IS NOT NULL 
                        AND TO_CHAR(FECHA_BAJA, 'YYYYMM') = ANHO|| LPAD(MES, 2, '0') 
                            THEN 1 ELSE 0 END) ROTACION_TOTAL,
                    SUM(CASE WHEN COD_CAUSAL = '2' 
                        AND TO_CHAR(FECHA_BAJA, 'YYYYMM') = ANHO|| LPAD(MES, 2, '0') 
                        THEN 1 ELSE 0 END) ROTACION_VOLUNTARIA
                FROM (
                    SELECT 
                        PFK_ANHO ANHO, 
                        PFK_MES MES, 
                        COD_CAUSAL,
                        COD_EMP,
                        emp.NOMBRE NOM_EMP,
                        fecha_baja,
                        COD_GERENCIA,
                        TRIM(REPLACE(REPLACE(REPLACE(UPPER(ROL), 'EX SHIPPING' ), '('), ')')) ROL
                    FROM NOV_CIERRE_MENSUAL_PERSONAL per, NOV_EMPRESAS emp
                    WHERE PER.COD_EMP = EMP.PK_COD_EMP 
                    AND PFK_ANHO|| LPAD(PFK_MES, 2, '0') BETWEEN 
                    TO_CHAR(ADD_MONTHS((SELECT MAX(TO_DATE(PFK_ANHO|| LPAD(PFK_MES, 2, '0'), 'YYYYMM'))
                    FROM NOV_CIERRE_MENSUAL_PERSONAL), -11), 'YYYYMM')
                    AND TO_CHAR((SELECT MAX(TO_DATE(PFK_ANHO|| LPAD(PFK_MES, 2, '0'), 'YYYYMM'))
                    FROM NOV_CIERRE_MENSUAL_PERSONAL), 'YYYYMM') ";
                    
                    //AND TO_CHAR(FECHA_BAJA, 'YYYYMM') = PFK_ANHO|| LPAD(PFK_MES, 2, '0')
        if (!empty($p_cod_emp)) {
            $sql .= "AND COD_EMP = '$p_cod_emp' ";
        }
        if (!empty($p_cod_ger)) {
            $sql .= "AND COD_GERENCIA = '$p_cod_ger' ";
        }
        if (!empty($p_cod_dep)) {
            $sql .= "AND COD_DEPARTAMENTO = '$p_cod_dep' ";
        }
        if (!empty($p_cod_cc)) {
            $sql .= "AND COD_CC = '$p_cod_cc' ";
        }
        if (!empty($p_rol_cargo)) {
            $sql .= "AND TRIM(REPLACE(REPLACE(REPLACE(UPPER(ROL), 'EX SHIPPING' ), '('), ')')) = UPPER('$p_rol_cargo') ";
        }
        if (!empty($p_causal)) {
            $sql .= "AND COD_CAUSAL = '$p_causal' ";
        }

        $sql .= ")
                GROUP BY %emp%
                %ger%
                %rol% 1 
            ORDER BY ANHO ASC, MES ASC";

        /*%emp%
                %ger%
                %rol%*/

        if ($p_is_emp == '1') {
            $sql = str_replace('%emp%', 'COD_EMP, NOM_EMP, ', $sql);
        } else {
            $sql = str_replace('%emp%', '', $sql);
        }

        if ($p_is_ger == '1') {
            $sql = str_replace('%ger%', 'COD_GERENCIA, ', $sql);
        } else {
            $sql = str_replace('%ger%', '', $sql);
        }

        if ($p_is_rol == '1') {
            $sql = str_replace('%rol%', 'ROL, ', $sql);
        } else {
            $sql = str_replace('%rol%', '', $sql);
        }
        $query = $this->db->query($sql);
        return $query->result();
    }


    public function cargarConteoRotacionConsolidado(
        $p_cod_emp,
        $p_cod_ger,
        $p_cod_dep,
        $p_cod_cc,
        $p_rol_cargo,
        $p_causal
    ) {

        $sql = "SELECT 
                    ROL, 
                    ROUND(SUM(DOTACION / 12), 2) DOTACION_PROM, 
                    SUM(ROTACION_TOTAL) ROTACION_TOTAL, 
                    SUM(ROTACION_VOLUNTARIA) ROTACION_VOLUNTARIA,
                    ROUND((SUM(ROTACION_TOTAL) * 100) / SUM(DOTACION / 12), 2) PORCEN_ROTACION_TOTAL,
                    ROUND((SUM(ROTACION_VOLUNTARIA) * 100) / SUM(DOTACION / 12),2) PORCEN_ROTACION_VOLUNTARIA
                FROM (SELECT 
                        ANHO, 
                        MES, 
                        ROL,
                        COUNT(*) DOTACION,
                        SUM(CASE WHEN COD_CAUSAL IS NOT NULL 
                            AND TO_CHAR(FECHA_BAJA, 'YYYYMM') = ANHO|| LPAD(MES, 2, '0') 
                            THEN 1 ELSE 0 END) ROTACION_TOTAL,
                        SUM(CASE WHEN COD_CAUSAL = '2' 
                            AND TO_CHAR(FECHA_BAJA, 'YYYYMM') = ANHO|| LPAD(MES, 2, '0') 
                            THEN 1 ELSE 0 END) ROTACION_VOLUNTARIA
                    FROM (
                        SELECT 
                            PFK_ANHO ANHO, 
                            PFK_MES MES, 
                            COD_CAUSAL,
                            FECHA_BAJA,
                            TRIM(REPLACE(REPLACE(REPLACE(UPPER(ROL), 'EX SHIPPING' ), '('), ')')) ROL
                        FROM NOV_CIERRE_MENSUAL_PERSONAL PER
                        WHERE 1 = 1
                        AND PFK_ANHO|| LPAD(PFK_MES, 2, '0') BETWEEN 
                            TO_CHAR(ADD_MONTHS((SELECT MAX(TO_DATE(PFK_ANHO|| LPAD(PFK_MES, 2, '0'), 'YYYYMM'))
                            FROM NOV_CIERRE_MENSUAL_PERSONAL), -11), 'YYYYMM')
                        AND TO_CHAR((SELECT MAX(TO_DATE(PFK_ANHO|| LPAD(PFK_MES, 2, '0'), 'YYYYMM'))
                            FROM NOV_CIERRE_MENSUAL_PERSONAL), 'YYYYMM') ";
                        //AND TO_CHAR(FECHA_BAJA, 'YYYYMM') = PFK_ANHO|| LPAD(PFK_MES, 2, '0')
        if (!empty($p_cod_emp)) {
            $sql .= "AND COD_EMP = '$p_cod_emp' ";
        }
        if (!empty($p_cod_ger)) {
            $sql .= "AND COD_GERENCIA = '$p_cod_ger' ";
        }
        if (!empty($p_cod_dep)) {
            $sql .= "AND COD_DEPARTAMENTO = '$p_cod_dep' ";
        }
        if (!empty($p_cod_cc)) {
            $sql .= "AND COD_CC = '$p_cod_cc' ";
        }
        if (!empty($p_rol_cargo)) {
            $sql .= "AND TRIM(REPLACE(REPLACE(REPLACE(UPPER(ROL), 'EX SHIPPING' ), '('), ')')) = UPPER('$p_rol_cargo') ";
        }
        if (!empty($p_causal)) {
            $sql .= "AND COD_CAUSAL = '$p_causal' ";
        }

        $sql .= ")
                GROUP BY ANHO, MES, ROL )
            GROUP BY ROL ";
        $query = $this->db->query($sql);
        return $query->result();
    }


    public function cargarConteoRotacionMensualDet(
        $p_anho,
        $p_mes,
        $p_cod_emp,
        $p_cod_ger,
        $p_cod_dep,
        $p_cod_cc,
        $p_rol_cargo,
        $p_causal
    ) {

        $sql = "SELECT 
                    ANHO, 
                    MES, 
                    COD_CAUSAL,
                    NOM_CAUSAL,
                    (CASE 
                        WHEN MES = 1 THEN 'ENE' 
                        WHEN MES = 2 THEN 'FEB'
                        WHEN MES = 3 THEN 'MAR' 
                        WHEN MES = 4 THEN 'ABR' 
                        WHEN MES = 5 THEN 'MAY' 
                        WHEN MES = 6 THEN 'JUN' 
                        WHEN MES = 7 THEN 'JUL' 
                        WHEN MES = 8 THEN 'AGO' 
                        WHEN MES = 9 THEN 'SEP' 
                        WHEN MES = 10 THEN 'OCT' 
                        WHEN MES = 11 THEN 'NOV' 
                        WHEN MES = 12 THEN 'DIC' END) MES_TEXT,
                    SUM(CASE WHEN COD_CAUSAL IS NOT NULL 
                     AND TO_CHAR(FECHA_BAJA, 'YYYYMM') = PFK_ANHO|| LPAD(PFK_MES, 2, '0') 
                    THEN 1 ELSE 0 END) CANTIDAD
                FROM (
                    SELECT 
                        PFK_ANHO ANHO, 
                        PFK_MES MES, 
                        COD_CAUSAL,
                        NOM_CAUSAL,
                        FECHA_BAJA
                    FROM NOV_CIERRE_MENSUAL_PERSONAL
                    WHERE 1 = 1 ";
        if (!empty($p_anho)) {
            $sql .= "AND PFK_ANHO = $p_anho ";
        }
        if (!empty($p_mes)) {
            $sql .= "AND PFK_MES = $p_mes ";
        }
        if (!empty($p_cod_emp)) {
            $sql .= "AND COD_EMP = '$p_cod_emp' ";
        }
        if (!empty($p_cod_ger)) {
            $sql .= "AND COD_GERENCIA = '$p_cod_ger' ";
        }
        if (!empty($p_cod_dep)) {
            $sql .= "AND COD_DEPARTAMENTO = '$p_cod_dep' ";
        }
        if (!empty($p_cod_cc)) {
            $sql .= "AND COD_CC = '$p_cod_cc' ";
        }
        if (!empty($p_rol_cargo)) {
            $sql .= "AND TRIM(REPLACE(REPLACE(REPLACE(UPPER(ROL), 'EX SHIPPING' ), '('), ')')) = UPPER('$p_rol_cargo') ";
        }
        if (!empty($p_causal)) {
            $sql .= "AND COD_CAUSAL = '$p_causal' ";
        }

        $sql .= ")
                GROUP BY ANHO, MES, COD_CAUSAL, NOM_CAUSAL 
                ORDER BY ANHO ASC, MES ASC, COD_CAUSAL ASC";
        $query = $this->db->query($sql);
        return $query->result();
    }


    public function cargarConteoDotacionMensual(
        $p_anho,
        $p_mes,
        $p_cod_emp,
        $p_cod_ger,
        $p_cod_dep,
        $p_cod_cc,
        $p_rol_cargo
    ) {


        $sql = "SELECT 
                    ANHO, 
                    MES, 
                    (CASE 
                        WHEN MES = 1 THEN 'ENE' 
                        WHEN MES = 2 THEN 'FEB'
                        WHEN MES = 3 THEN 'MAR' 
                        WHEN MES = 4 THEN 'ABR' 
                        WHEN MES = 5 THEN 'MAY' 
                        WHEN MES = 6 THEN 'JUN' 
                        WHEN MES = 7 THEN 'JUL' 
                        WHEN MES = 8 THEN 'AGO' 
                        WHEN MES = 9 THEN 'SEP' 
                        WHEN MES = 10 THEN 'OCT' 
                        WHEN MES = 11 THEN 'NOV' 
                        WHEN MES = 12 THEN 'DIC' END) MES_TEXT,
                    COUNT(*) DOTACION
                FROM (
                    SELECT 
                        PFK_ANHO ANHO, 
                        PFK_MES MES
                    FROM NOV_CIERRE_MENSUAL_PERSONAL 
                    WHERE 1 = 1 ";
        if (!empty($p_anho)) {
            $sql .= "AND PFK_ANHO = $p_anho ";
        }
        if (!empty($p_mes)) {
            $sql .= "AND PFK_MES = $p_mes ";
        }
        if (!empty($p_cod_emp)) {
            $sql .= "AND COD_EMP = '$p_cod_emp' ";
        }
        if (!empty($p_cod_ger)) {
            $sql .= "AND COD_GERENCIA = '$p_cod_ger' ";
        }
        if (!empty($p_cod_dep)) {
            $sql .= "AND COD_DEPARTAMENTO = '$p_cod_dep' ";
        }
        if (!empty($p_cod_cc)) {
            $sql .= "AND COD_CC = '$p_cod_cc' ";
        }
        if (!empty($p_rol_cargo)) {
            $sql .= "AND TRIM(REPLACE(REPLACE(REPLACE(UPPER(ROL), 'EX SHIPPING' ), '('), ')')) = UPPER('$p_rol_cargo') ";
        }

        $sql .= ")
                GROUP BY ANHO, MES 
                ORDER BY ANHO ASC, MES ASC";

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function cargarConteoDotacionEmpresa(
        $p_anho,
        $p_mes,
        $p_cod_emp,
        $p_cod_ger,
        $p_cod_dep,
        $p_cod_cc,
        $p_rol_cargo
    ) {


        $sql = "SELECT 
                    ANHO, 
                    MES, 
                    COD_EMP,
                    NOM_EMP,
                    (CASE 
                        WHEN MES = 1 THEN 'ENE' 
                        WHEN MES = 2 THEN 'FEB'
                        WHEN MES = 3 THEN 'MAR' 
                        WHEN MES = 4 THEN 'ABR' 
                        WHEN MES = 5 THEN 'MAY' 
                        WHEN MES = 6 THEN 'JUN' 
                        WHEN MES = 7 THEN 'JUL' 
                        WHEN MES = 8 THEN 'AGO' 
                        WHEN MES = 9 THEN 'SEP' 
                        WHEN MES = 10 THEN 'OCT' 
                        WHEN MES = 11 THEN 'NOV' 
                        WHEN MES = 12 THEN 'DIC' END) MES_TEXT,
                    COUNT(*) DOTACION
                FROM (
                    SELECT 
                        PFK_ANHO ANHO, 
                        PFK_MES MES,
                        COD_EMP,
                        emp.NOMBRE NOM_EMP
                    FROM NOV_CIERRE_MENSUAL_PERSONAL per, NOV_EMPRESAS emp
                    WHERE PER.COD_EMP = EMP.PK_COD_EMP ";
        if (!empty($p_anho)) {
            $sql .= "AND PFK_ANHO = $p_anho ";
        }
        if (!empty($p_mes)) {
            $sql .= "AND PFK_MES = $p_mes ";
        }
        if (!empty($p_cod_emp)) {
            $sql .= "AND COD_EMP = '$p_cod_emp' ";
        }
        if (!empty($p_cod_ger)) {
            $sql .= "AND COD_GERENCIA = '$p_cod_ger' ";
        }
        if (!empty($p_cod_dep)) {
            $sql .= "AND COD_DEPARTAMENTO = '$p_cod_dep' ";
        }
        if (!empty($p_cod_cc)) {
            $sql .= "AND COD_CC = '$p_cod_cc' ";
        }
        if (!empty($p_rol_cargo)) {
            $sql .= "AND TRIM(REPLACE(REPLACE(REPLACE(UPPER(ROL), 'EX SHIPPING' ), '('), ')')) = UPPER('$p_rol_cargo') ";
        }

        $sql .= ")
                GROUP BY ANHO, MES, COD_EMP, NOM_EMP
                ORDER BY ANHO ASC, MES ASC";

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function cargarConteoDotacionMensualDinamic(
        $p_anho,
        $p_mes,
        $p_cod_emp,
        $p_cod_ger,
        $p_cod_dep,
        $p_cod_cc,
        $p_rol_cargo,
        $p_is_emp,
        $p_is_ger,
        $p_is_rol
    ) {


        $sql = "SELECT 
                    ANHO, 
                    MES, 
                    (CASE 
                        WHEN MES = 1 THEN 'ENE' 
                        WHEN MES = 2 THEN 'FEB'
                        WHEN MES = 3 THEN 'MAR' 
                        WHEN MES = 4 THEN 'ABR' 
                        WHEN MES = 5 THEN 'MAY' 
                        WHEN MES = 6 THEN 'JUN' 
                        WHEN MES = 7 THEN 'JUL' 
                        WHEN MES = 8 THEN 'AGO' 
                        WHEN MES = 9 THEN 'SEP' 
                        WHEN MES = 10 THEN 'OCT' 
                        WHEN MES = 11 THEN 'NOV' 
                        WHEN MES = 12 THEN 'DIC' END) MES_TEXT,
                    %emp%
                    %ger%
                    %rol% 
                    COUNT(*) VALOR
                FROM (
                    SELECT 
                        PFK_ANHO ANHO, 
                        PFK_MES MES,
                        COD_EMP,
                        emp.NOMBRE NOM_EMP,
                        COD_GERENCIA,
                        TRIM(REPLACE(REPLACE(REPLACE(UPPER(ROL), 'EX SHIPPING' ), '('), ')')) ROL
                    FROM NOV_CIERRE_MENSUAL_PERSONAL per, NOV_EMPRESAS emp
                    WHERE PER.COD_EMP = EMP.PK_COD_EMP ";
        if (!empty($p_anho)) {
            $sql .= "AND PFK_ANHO = $p_anho ";
        }
        if (!empty($p_mes)) {
            $sql .= "AND PFK_MES = $p_mes ";
        }
        if (!empty($p_cod_emp)) {
            $sql .= "AND COD_EMP = '$p_cod_emp' ";
        }
        if (!empty($p_cod_ger)) {
            $sql .= "AND COD_GERENCIA = '$p_cod_ger' ";
        }
        if (!empty($p_cod_dep)) {
            $sql .= "AND COD_DEPARTAMENTO = '$p_cod_dep' ";
        }
        if (!empty($p_cod_cc)) {
            $sql .= "AND COD_CC = '$p_cod_cc' ";
        }
        if (!empty($p_rol_cargo)) {
            $sql .= "AND TRIM(REPLACE(REPLACE(REPLACE(UPPER(ROL), 'EX SHIPPING' ), '('), ')')) = UPPER('$p_rol_cargo') ";
        }

        $sql .= ")
                GROUP BY 
                    ANHO, 
                    %emp%
                    %ger%
                    %rol% 
                    MES 
                ORDER BY ANHO ASC, MES ASC";


        if ($p_is_emp == '1') {
            $sql = str_replace('%emp%', 'COD_EMP, NOM_EMP, ', $sql);
        } else {
            $sql = str_replace('%emp%', '', $sql);
        }

        if ($p_is_ger == '1') {
            $sql = str_replace('%ger%', 'COD_GERENCIA, ', $sql);
        } else {
            $sql = str_replace('%ger%', '', $sql);
        }

        if ($p_is_rol == '1') {
            $sql = str_replace('%rol%', 'ROL, ', $sql);
        } else {
            $sql = str_replace('%rol%', '', $sql);
        }

        $query = $this->db->query($sql);
        return $query->result();
    }


    public function cargarConteoDotacionGerencia(
        $p_anho,
        $p_mes,
        $p_cod_emp,
        $p_cod_ger,
        $p_cod_dep,
        $p_cod_cc,
        $p_rol_cargo
    ) {


        $sql = "SELECT 
                    ANHO, 
                    MES, 
                    GERENCIA,
                    (CASE 
                        WHEN MES = 1 THEN 'ENE' 
                        WHEN MES = 2 THEN 'FEB'
                        WHEN MES = 3 THEN 'MAR' 
                        WHEN MES = 4 THEN 'ABR' 
                        WHEN MES = 5 THEN 'MAY' 
                        WHEN MES = 6 THEN 'JUN' 
                        WHEN MES = 7 THEN 'JUL' 
                        WHEN MES = 8 THEN 'AGO' 
                        WHEN MES = 9 THEN 'SEP' 
                        WHEN MES = 10 THEN 'OCT' 
                        WHEN MES = 11 THEN 'NOV' 
                        WHEN MES = 12 THEN 'DIC' END) MES_TEXT,
                    COUNT(*) DOTACION
                FROM (
                    SELECT 
                        PFK_ANHO ANHO, 
                        PFK_MES MES,
                        COD_GERENCIA GERENCIA
                    FROM NOV_CIERRE_MENSUAL_PERSONAL 
                    WHERE 1 = 1 ";
        if (!empty($p_anho)) {
            $sql .= "AND PFK_ANHO = $p_anho ";
        }
        if (!empty($p_mes)) {
            $sql .= "AND PFK_MES = $p_mes ";
        }
        if (!empty($p_cod_emp)) {
            $sql .= "AND COD_EMP = '$p_cod_emp' ";
        }
        if (!empty($p_cod_ger)) {
            $sql .= "AND COD_GERENCIA = '$p_cod_ger' ";
        }
        if (!empty($p_cod_dep)) {
            $sql .= "AND COD_DEPARTAMENTO = '$p_cod_dep' ";
        }
        if (!empty($p_cod_cc)) {
            $sql .= "AND COD_CC = '$p_cod_cc' ";
        }
        if (!empty($p_rol_cargo)) {
            $sql .= "AND TRIM(REPLACE(REPLACE(REPLACE(UPPER(ROL), 'EX SHIPPING' ), '('), ')')) = UPPER('$p_rol_cargo') ";
        }
        $sql .= ")
                GROUP BY ANHO, MES, GERENCIA 
                ORDER BY ANHO ASC, MES ASC, GERENCIA ASC";

        $query = $this->db->query($sql);
        return $query->result();
    }




    private function obtenerCamposPorNivel(
        $p_cod_emp,
        $p_cod_ger,
        $p_cod_dep,
        $p_cod_cc
    ) {
        $count = 0;

        if (!empty($p_cod_emp)) {
            $camposNivel = "COD_EMP";
            $count++;
        }
        if (!empty($p_cod_ger)) {
            $camposNivel = "COD_EMP, COD_GERENCIA";
            $count++;
        }
        if (!empty($p_cod_dep)) {
            $camposNivel = "COD_EMP, COD_GERENCIA, COD_DEPARTAMENTO";
            $count++;
        }
        if (!empty($p_cod_cc)) {
            $camposNivel = "COD_EMP, COD_GERENCIA, COD_DEPARTAMENTO, COD_CC";
            $count++;
        }

        if ($count == 0) {
            $camposNivel = "1";
        }

        return $camposNivel;
    }

    public function cargarCierresMensual()
    {
        $sql = "SELECT 
                    PK_ANHO,
                    PK_MES,
                    USR_CREADOR,
                    TO_CHAR(FECHA_CREACION, 'DD-MM-YYYY HH24:MI') FECHA_CREACION,
                    USR_IMPORT,
                    TO_CHAR(FECHA_IMPORT, 'DD-MM-YYYY HH24:MI') FECHA_IMPORT
                FROM NOV_CIERRE_MENSUAL 
                ORDER BY PK_ANHO DESC, PK_MES DESC ";

        $query = $this->db->query($sql);
        return $query->result();
    }


    public function cargarExportarDiasTrabajados($p_anho, $p_mes)
    {
        $sql = "SELECT cie.PFK_PERSONAL COD_PERSONAL, cie.NUM_RUT, cie.DV_RUT, cie.NOMBRE, EMP.NOMBRE EMPRESA, cie.COD_CC, cie.NOM_CC, cie.COD_CARGO, cie.NOM_CARGO, cie.ROL, cie.TIPO_CONTRATO, cie.JORNADA, 0 DIAS_TRABAJADOS
                from nov_cierre_mensual_personal cie, nov_empresas emp
                where cie.cod_emp = emp.pk_cod_emp 
                and cie.pfk_anho = $p_anho
                and cie.pfk_mes = $p_mes 
                ORDER BY cie.COD_EMP ASC, cie.COD_CC ASC";
        $query = $this->db->query($sql);
        return $query->result();
    }

    public function importarDiasTrabajados($data)
    {

        $this->db->query(
            "DELETE FROM NOV_CIERRE_MENSUAL_DIAS_IMPORT "
        );

        $res = $this->db->insert_batch('NOV_CIERRE_MENSUAL_DIAS_IMPORT', $data);


        if ($res) {
            return TRUE;
        } else {
            return FALSE;
        }
    }

    public function resumenValidarImportarDiasTrabajados($p_anho, $p_mes)
    {
        $sql = "SELECT MENSAJE, COUNT(*) CONTAR
                FROM(
                    SELECT 
                        CASE WHEN IMP.COD_PERSONAL IS NULL THEN 'TRABAJADOR FALTANTE' ELSE 
                        (CASE WHEN IMP.DIAS_TRABAJADOS IS NULL THEN 'SIN VALOR' ELSE 
                        (CASE WHEN is_numeric_positive(IMP.DIAS_TRABAJADOS) <> 1 THEN 'FORMATO INCORRECTO' ELSE 
                        'OK' END) END) END AS MENSAJE
                        
                    FROM nov_cierre_mensual_dias_import IMP, nov_cierre_mensual_personal per
                    WHERE imp.cod_personal(+) = per.pfk_personal
                    and per.pfk_anho = $p_anho
                    and per.pfk_mes = $p_mes)
                GROUP BY MENSAJE";

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function validarImportarDiasTrabajados($p_anho, $p_mes)
    {
        $sql = "SELECT 
                    IMP.COD_PERSONAL,
                    IMP.NUM_RUT,
                    IMP.DV_RUT,
                    IMP.NOMBRE,
                    IMP.COD_EMP,
                    IMP.COD_CC,
                    IMP.NOM_CC,
                    IMP.COD_CARGO,
                    IMP.NOM_CARGO,
                    IMP.ROL,
                    IMP.TIPO_CONTRATO,
                    IMP.JORNADA,
                    IMP.DIAS_TRABAJADOS,
                    
                    CASE WHEN IMP.COD_PERSONAL IS NULL THEN 'TRABAJADOR FALTANTE' ELSE 
                    (CASE WHEN IMP.DIAS_TRABAJADOS IS NULL THEN 'SIN VALOR' ELSE 
                    (CASE WHEN is_numeric_positive(IMP.DIAS_TRABAJADOS) <> 1 THEN 'FORMATO INCORRECTO' ELSE 
                    'OK' END) END) END AS MENSAJE
                    
                FROM nov_cierre_mensual_dias_import IMP, nov_cierre_mensual_personal per
                WHERE imp.cod_personal(+) = per.pfk_personal
                and per.pfk_anho = $p_anho
                and per.pfk_mes = $p_mes
                ORDER BY imp.COD_EMP ASC, imp.COD_CC ASC";

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function crearCierreMensual($p_anho, $p_mes, $p_usuario)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
            $this->db->conn_id,
            "BEGIN NOV_INS_CIERRE_MENSUAL(
                            :p_anho,
                            :p_mes,
                            :p_usuario,
                            :r_est,
                            :r_msg);END;"
        );

        oci_bind_by_name($proc, "p_anho", $p_anho, -1, OCI_B_INT);
        oci_bind_by_name($proc, "p_mes", $p_mes, -1, OCI_B_INT);
        oci_bind_by_name($proc, "p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc, "r_est", $r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc, "r_msg", $r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }


    public function guardarImportarDiasTrabajados($p_anho, $p_mes, $p_usuario)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
            $this->db->conn_id,
            "BEGIN NOV_IMPORT_DIAS_TRABAJADOS(
                            :p_anho,
                            :p_mes,
                            :p_usuario,
                            :r_est,
                            :r_msg);END;"
        );

        oci_bind_by_name($proc, "p_anho", $p_anho, -1, OCI_B_INT);
        oci_bind_by_name($proc, "p_mes", $p_mes, -1, OCI_B_INT);
        oci_bind_by_name($proc, "p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc, "r_est", $r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc, "r_msg", $r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }

    public function cargarConteoAusentismoMensual(
        $p_anho,
        $p_mes,
        $p_cod_emp,
        $p_cod_ger,
        $p_cod_dep,
        $p_cod_cc,
        $p_rol_cargo
    ) {
        $meses = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
        $sql = "SELECT 
                    Q2.ANHO, 
                    Q2.MES, 
                    (CASE 
                        WHEN Q2.MES = 1 THEN 'ENE' 
                        WHEN Q2.MES = 2 THEN 'FEB'
                        WHEN Q2.MES = 3 THEN 'MAR' 
                        WHEN Q2.MES = 4 THEN 'ABR' 
                        WHEN Q2.MES = 5 THEN 'MAY' 
                        WHEN Q2.MES = 6 THEN 'JUN' 
                        WHEN Q2.MES = 7 THEN 'JUL' 
                        WHEN Q2.MES = 8 THEN 'AGO' 
                        WHEN Q2.MES = 9 THEN 'SEP' 
                        WHEN Q2.MES = 10 THEN 'OCT' 
                        WHEN Q2.MES = 11 THEN 'NOV' 
                        WHEN Q2.MES = 12 THEN 'DIC' END) MES_TEXT,
                    SUM(q2.DIAS_TRABAJADOS) DIAS_TRABAJADOS, 
                    SUM(q2.VACACIONES) VACACIONES, 
                    SUM(q2.LICENCIAS) LICENCIAS, 
                    SUM(q2.AUSENCIAS) AUSENCIAS,
                    (SUM(q2.DIAS_TRABAJADOS) + 
                    SUM(q2.VACACIONES) +
                    SUM(q2.LICENCIAS) +
                    SUM(q2.AUSENCIAS)) TOTAL 
                FROM nov_cierre_mensual_personal q1, 
                (SELECT 
                    ANHO, 
                    MES, 
                    RUT,
                    SUM(DIAS_TRABAJADOS) DIAS_TRABAJADOS, 
                    SUM(VACACIONES) VACACIONES, 
                    SUM(LICENCIAS) LICENCIAS, 
                    SUM(AUSENCIAS) AUSENCIAS
                FROM(
                SELECT PFK_ANHO ANHO, PFK_MES MES, NUM_RUT||'-'||DV_RUT RUT, NVL(DIAS_TRABAJADOS, 0) DIAS_TRABAJADOS, 0 VACACIONES, 0 LICENCIAS, 0 AUSENCIAS
                FROM nov_cierre_mensual_personal
                WHERE PFK_ANHO = $p_anho ";

        for ($i = 0; $i < count($meses); $i++) {
            $sql .= "UNION ALL
                    SELECT 
                        ANHO, 
                        MES, 
                        RUT, 
                        0 DIAS_TRABAJADOS, 
                        calcular_ausentismo(
                            fec_ini=>fec_ini,
                            fec_fin=>fec_fin ,
                            lun=>'1',
                            mar=>'1',
                            mie=>'1',
                            jue=>'1',
                            vie=>'1',
                            sab=>'0',
                            dom=>'0',
                            fer=>'1') VACACIONES, 
                        0 LICENCIAS, 
                        0 AUSENCIAS
                    FROM (
                        SELECT %anho% ANHO, %mes% MES,
                            (CASE WHEN '%anho%%mes_text%' = TO_CHAR(FEC_INI, 'YYYYMM') THEN
                                FEC_INI
                            ELSE
                                TO_DATE('%anho%%mes_text%01', 'YYYYMMDD')
                            END) FEC_INI,
                            
                            (CASE WHEN '%anho%%mes_text%' = TO_CHAR(FEC_FIN, 'YYYYMM') THEN
                                FEC_FIN
                            ELSE
                                LAST_DAY(TO_DATE('%anho%%mes_text%', 'YYYYMM'))
                            END) FEC_FIN, RUT
                        FROM nov_ind_vacaciones_vw
                        WHERE '%anho%%mes_text%' BETWEEN TO_CHAR(FEC_INI, 'YYYYMM') AND TO_CHAR(FEC_FIN, 'YYYYMM'))
                    UNION ALL
                    SELECT ANHO, MES, RUT, 0 DIAS_TRABAJADOS, 0 VACACIONES, 
                        (CASE WHEN (TO_CHAR(fec_ini, 'DD') = '01' AND 
                        TO_CHAR(fec_fin, 'DD') = TO_CHAR(last_day(fec_fin), 'DD')) THEN
                            30 
                        ELSE
                            fec_fin - fec_ini +1
                        END) LICENCIAS, 
                        0 AUSENCIAS
                    FROM (
                        SELECT %anho% ANHO, %mes% MES,
                            (CASE WHEN '%anho%%mes_text%' = TO_CHAR(FEC_INI, 'YYYYMM') THEN
                                FEC_INI
                            ELSE
                                TO_DATE('%anho%%mes_text%01', 'YYYYMMDD')
                            END) FEC_INI,
                            
                            (CASE WHEN '%anho%%mes_text%' = TO_CHAR(FEC_FIN, 'YYYYMM') THEN
                                FEC_FIN
                            ELSE
                                LAST_DAY(TO_DATE('%anho%%mes_text%', 'YYYYMM'))
                            END) FEC_FIN, RUT
                        FROM nov_ind_licencias_vw
                        WHERE '%anho%%mes_text%' BETWEEN TO_CHAR(FEC_INI, 'YYYYMM') AND TO_CHAR(FEC_FIN, 'YYYYMM'))
                    UNION ALL
                    SELECT ANHO, MES, RUT, 
                        0 DIAS_TRABAJADOS, 
                        0 VACACIONES, 
                        0 LICENCIAS, 
                        (CASE WHEN (TO_CHAR(fec_ini, 'DD') = '01' AND 
                        TO_CHAR(fec_fin, 'DD') = TO_CHAR(last_day(fec_fin), 'DD')) THEN
                            30 
                        ELSE
                            fec_fin - fec_ini +1
                        END) AUSENCIAS
                    FROM (
                        SELECT %anho% ANHO, %mes% MES,
                            (CASE WHEN '%anho%%mes_text%' = TO_CHAR(FEC_INI, 'YYYYMM') THEN
                                FEC_INI
                            ELSE
                                TO_DATE('%anho%%mes_text%01', 'YYYYMMDD')
                            END) FEC_INI,
                            
                            (CASE WHEN '%anho%%mes_text%' = TO_CHAR(FEC_FIN, 'YYYYMM') THEN
                                FEC_FIN
                            ELSE
                                LAST_DAY(TO_DATE('%anho%%mes_text%', 'YYYYMM'))
                            END) FEC_FIN, RUT
                        FROM nov_ind_permisos_vw
                        WHERE '%anho%%mes_text%' BETWEEN TO_CHAR(FEC_INI, 'YYYYMM') AND TO_CHAR(FEC_FIN, 'YYYYMM'))";
            $sql = str_replace("%anho%", $p_anho, $sql);
            $sql = str_replace("%mes%", $i + 1, $sql);
            $sql = str_replace("%mes_text%", $meses[$i], $sql);
        }
        $sql .= ")
        GROUP BY ANHO, MES, RUT) Q2
        WHERE q1.pfk_anho = q2.anho
        AND q1.pfk_MES = q2.MES
        AND q1.NUM_RUT||'-'|| q1.DV_RUT = q2.RUT ";

        if (!empty($p_cod_emp)) {
            $sql .= "AND q1.COD_EMP = '$p_cod_emp' ";
        }
        if (!empty($p_cod_ger)) {
            $sql .= "AND q1.COD_GERENCIA = '$p_cod_ger' ";
        }
        if (!empty($p_cod_dep)) {
            $sql .= "AND q1.COD_DEPARTAMENTO = '$p_cod_dep' ";
        }
        if (!empty($p_cod_cc)) {
            $sql .= "AND q1.COD_CC = '$p_cod_cc' ";
        }
        if (!empty($p_rol_cargo)) {
            $sql .= "AND TRIM(REPLACE(REPLACE(REPLACE(UPPER(q1.ROL), 'EX SHIPPING' ), '('), ')')) = UPPER('$p_rol_cargo') ";
        }

        $sql .= "GROUP BY Q2.ANHO, Q2.MES 
                ORDER BY Q2.ANHO ASC, Q2.MES ASC";

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function cargarConteoAusentismoMensualDinamic(
        $p_anho,
        $p_mes,
        $p_cod_emp,
        $p_cod_ger,
        $p_cod_dep,
        $p_cod_cc,
        $p_rol_cargo,
        $p_is_emp,
        $p_is_ger,
        $p_is_rol
    ) {
        $meses = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
        $sql = "SELECT 
                    Q2.ANHO, 
                    Q2.MES, 
                    (CASE 
                        WHEN Q2.MES = 1 THEN 'ENE' 
                        WHEN Q2.MES = 2 THEN 'FEB'
                        WHEN Q2.MES = 3 THEN 'MAR' 
                        WHEN Q2.MES = 4 THEN 'ABR' 
                        WHEN Q2.MES = 5 THEN 'MAY' 
                        WHEN Q2.MES = 6 THEN 'JUN' 
                        WHEN Q2.MES = 7 THEN 'JUL' 
                        WHEN Q2.MES = 8 THEN 'AGO' 
                        WHEN Q2.MES = 9 THEN 'SEP' 
                        WHEN Q2.MES = 10 THEN 'OCT' 
                        WHEN Q2.MES = 11 THEN 'NOV' 
                        WHEN Q2.MES = 12 THEN 'DIC' END) MES_TEXT,
                    %emp%
                    %ger%
                    %rol%
                    SUM(q2.DIAS_TRABAJADOS) DIAS_TRABAJADOS, 
                    SUM(q2.VACACIONES) VACACIONES, 
                    SUM(q2.LICENCIAS) LICENCIAS, 
                    SUM(q2.AUSENCIAS) AUSENCIAS,
                    (SUM(q2.DIAS_TRABAJADOS) + 
                    SUM(q2.VACACIONES) +
                    SUM(q2.LICENCIAS) +
                    SUM(q2.AUSENCIAS)) TOTAL 
                FROM nov_cierre_mensual_personal q1, 
                (SELECT 
                    ANHO, 
                    MES, 
                    RUT,
                    SUM(DIAS_TRABAJADOS) DIAS_TRABAJADOS, 
                    SUM(VACACIONES) VACACIONES, 
                    SUM(LICENCIAS) LICENCIAS, 
                    SUM(AUSENCIAS) AUSENCIAS
                FROM(
                SELECT PFK_ANHO ANHO, PFK_MES MES, NUM_RUT||'-'||DV_RUT RUT, NVL(DIAS_TRABAJADOS, 0) DIAS_TRABAJADOS, 0 VACACIONES, 0 LICENCIAS, 0 AUSENCIAS
                FROM nov_cierre_mensual_personal
                WHERE PFK_ANHO = $p_anho ";

        for ($i = 0; $i < count($meses); $i++) {
            $sql .= "UNION ALL
                    SELECT 
                        ANHO, 
                        MES, 
                        RUT, 
                        0 DIAS_TRABAJADOS, 
                        calcular_ausentismo(
                            fec_ini=>fec_ini,
                            fec_fin=>fec_fin ,
                            lun=>'1',
                            mar=>'1',
                            mie=>'1',
                            jue=>'1',
                            vie=>'1',
                            sab=>'0',
                            dom=>'0',
                            fer=>'1') VACACIONES, 
                        0 LICENCIAS, 
                        0 AUSENCIAS
                    FROM (
                        SELECT %anho% ANHO, %mes% MES,
                            (CASE WHEN '%anho%%mes_text%' = TO_CHAR(FEC_INI, 'YYYYMM') THEN
                                FEC_INI
                            ELSE
                                TO_DATE('%anho%%mes_text%01', 'YYYYMMDD')
                            END) FEC_INI,
                            
                            (CASE WHEN '%anho%%mes_text%' = TO_CHAR(FEC_FIN, 'YYYYMM') THEN
                                FEC_FIN
                            ELSE
                                LAST_DAY(TO_DATE('%anho%%mes_text%', 'YYYYMM'))
                            END) FEC_FIN, RUT
                        FROM nov_ind_vacaciones_vw
                        WHERE '%anho%%mes_text%' BETWEEN TO_CHAR(FEC_INI, 'YYYYMM') AND TO_CHAR(FEC_FIN, 'YYYYMM'))
                    UNION ALL
                    SELECT ANHO, MES, RUT, 0 DIAS_TRABAJADOS, 0 VACACIONES, 
                        (CASE WHEN (TO_CHAR(fec_ini, 'DD') = '01' AND 
                        TO_CHAR(fec_fin, 'DD') = TO_CHAR(last_day(fec_fin), 'DD')) THEN
                          (CASE WHEN (fec_fin - fec_ini +1) >= 30  THEN 30 ELSE (fec_fin - fec_ini +1) END)
                        ELSE
                            fec_fin - fec_ini +1
                        END) LICENCIAS, 
                        0 AUSENCIAS
                    FROM (
                        SELECT %anho% ANHO, %mes% MES,
                            (CASE WHEN '%anho%%mes_text%' = TO_CHAR(FEC_INI, 'YYYYMM') THEN
                                FEC_INI
                            ELSE
                                TO_DATE('%anho%%mes_text%01', 'YYYYMMDD')
                            END) FEC_INI,
                            
                            (CASE WHEN '%anho%%mes_text%' = TO_CHAR(FEC_FIN, 'YYYYMM') THEN
                                FEC_FIN
                            ELSE
                                LAST_DAY(TO_DATE('%anho%%mes_text%', 'YYYYMM'))
                            END) FEC_FIN, RUT
                        FROM nov_ind_licencias_vw
                        WHERE '%anho%%mes_text%' BETWEEN TO_CHAR(FEC_INI, 'YYYYMM') AND TO_CHAR(FEC_FIN, 'YYYYMM'))
                    UNION ALL
                    SELECT ANHO, MES, RUT, 
                        0 DIAS_TRABAJADOS, 
                        0 VACACIONES, 
                        0 LICENCIAS, 
                        (CASE WHEN (TO_CHAR(fec_ini, 'DD') = '01' AND 
                        TO_CHAR(fec_fin, 'DD') = TO_CHAR(last_day(fec_fin), 'DD')) THEN
                            30 
                        ELSE
                            fec_fin - fec_ini +1
                        END) AUSENCIAS
                    FROM (
                        SELECT %anho% ANHO, %mes% MES,
                            (CASE WHEN '%anho%%mes_text%' = TO_CHAR(FEC_INI, 'YYYYMM') THEN
                                FEC_INI
                            ELSE
                                TO_DATE('%anho%%mes_text%01', 'YYYYMMDD')
                            END) FEC_INI,
                            
                            (CASE WHEN '%anho%%mes_text%' = TO_CHAR(FEC_FIN, 'YYYYMM') THEN
                                FEC_FIN
                            ELSE
                                LAST_DAY(TO_DATE('%anho%%mes_text%', 'YYYYMM'))
                            END) FEC_FIN, RUT
                        FROM nov_ind_permisos_vw
                        WHERE '%anho%%mes_text%' BETWEEN TO_CHAR(FEC_INI, 'YYYYMM') AND TO_CHAR(FEC_FIN, 'YYYYMM'))";
            $sql = str_replace("%anho%", $p_anho, $sql);
            $sql = str_replace("%mes%", $i + 1, $sql);
            $sql = str_replace("%mes_text%", $meses[$i], $sql);
        }
        $sql .= ")
        GROUP BY ANHO, MES, RUT) Q2, 
        nov_empresas q3
        WHERE q1.pfk_anho = q2.anho
        AND q1.pfk_MES = q2.MES
        AND q1.NUM_RUT||'-'|| q1.DV_RUT = q2.RUT 
        AND q1.COD_EMP = q3.PK_COD_EMP ";

        if (!empty($p_cod_emp)) {
            $sql .= "AND q1.COD_EMP = '$p_cod_emp' ";
        }
        if (!empty($p_cod_ger)) {
            $sql .= "AND q1.COD_GERENCIA = '$p_cod_ger' ";
        }
        if (!empty($p_cod_dep)) {
            $sql .= "AND q1.COD_DEPARTAMENTO = '$p_cod_dep' ";
        }
        if (!empty($p_cod_cc)) {
            $sql .= "AND q1.COD_CC = '$p_cod_cc' ";
        }
        if (!empty($p_rol_cargo)) {
            $sql .= "AND TRIM(REPLACE(REPLACE(REPLACE(UPPER(q1.ROL), 'EX SHIPPING' ), '('), ')')) = UPPER('$p_rol_cargo') ";
        }

        $sql .= "GROUP BY 
                    Q2.ANHO, 
                    %emp1%
                    %ger%
                    %rol1%
                    Q2.MES 
                ORDER BY Q2.ANHO ASC, Q2.MES ASC";

        if ($p_is_emp == '1') {
            $sql = str_replace('%emp%', 'q1.COD_EMP, q3.NOMBRE NOM_EMP, ', $sql);
            $sql = str_replace('%emp1%', 'q1.COD_EMP, q3.NOMBRE, ', $sql);
        } else {
            $sql = str_replace('%emp%', '', $sql);
            $sql = str_replace('%emp1%', '', $sql);
        }

        if ($p_is_ger == '1') {
            $sql = str_replace('%ger%', 'q1.COD_GERENCIA, ', $sql);
        } else {
            $sql = str_replace('%ger%', '', $sql);
        }

        if ($p_is_rol == '1') {
            $sql = str_replace('%rol%', "TRIM(REPLACE(REPLACE(REPLACE(UPPER(q1.ROL), 'EX SHIPPING' ), '('), ')')) ROL, ", $sql);
            $sql = str_replace('%rol1%', "TRIM(REPLACE(REPLACE(REPLACE(UPPER(q1.ROL), 'EX SHIPPING' ), '('), ')')), ", $sql);
        } else {
            $sql = str_replace('%rol%', '', $sql);
            $sql = str_replace('%rol1%', '', $sql);
        }

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function cargarConteoAusentismoGerencia(
        $p_anho,
        $p_mes,
        $p_cod_emp,
        $p_cod_ger,
        $p_cod_dep,
        $p_cod_cc,
        $p_rol_cargo
    ) {
        $meses = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

        if (!empty($p_mes)) {
            $valMes = $meses[intval($p_mes) - 1];
            $meses = [];
            $meses[0] = $valMes;
        }

        $sql = "SELECT 
                    Q2.ANHO, 
                    Q2.MES, 
                    Q1.COD_GERENCIA,
                    (CASE 
                        WHEN Q2.MES = 1 THEN 'ENE' 
                        WHEN Q2.MES = 2 THEN 'FEB'
                        WHEN Q2.MES = 3 THEN 'MAR' 
                        WHEN Q2.MES = 4 THEN 'ABR' 
                        WHEN Q2.MES = 5 THEN 'MAY' 
                        WHEN Q2.MES = 6 THEN 'JUN' 
                        WHEN Q2.MES = 7 THEN 'JUL' 
                        WHEN Q2.MES = 8 THEN 'AGO' 
                        WHEN Q2.MES = 9 THEN 'SEP' 
                        WHEN Q2.MES = 10 THEN 'OCT' 
                        WHEN Q2.MES = 11 THEN 'NOV' 
                        WHEN Q2.MES = 12 THEN 'DIC' END) MES_TEXT,
                    SUM(q2.DIAS_TRABAJADOS) DIAS_TRABAJADOS, 
                    SUM(q2.VACACIONES) VACACIONES, 
                    SUM(q2.LICENCIAS) LICENCIAS, 
                    SUM(q2.AUSENCIAS) AUSENCIAS,
                    (SUM(q2.DIAS_TRABAJADOS) + 
                    SUM(q2.VACACIONES) +
                    SUM(q2.LICENCIAS) +
                    SUM(q2.AUSENCIAS)) TOTAL 
                FROM nov_cierre_mensual_personal q1, 
                (SELECT 
                    ANHO, 
                    MES, 
                    RUT,
                    SUM(DIAS_TRABAJADOS) DIAS_TRABAJADOS, 
                    SUM(VACACIONES) VACACIONES, 
                    SUM(LICENCIAS) LICENCIAS, 
                    SUM(AUSENCIAS) AUSENCIAS
                FROM(
                SELECT PFK_ANHO ANHO, PFK_MES MES, NUM_RUT||'-'||DV_RUT RUT, NVL(DIAS_TRABAJADOS, 0) DIAS_TRABAJADOS, 0 VACACIONES, 0 LICENCIAS, 0 AUSENCIAS
                FROM nov_cierre_mensual_personal
                WHERE PFK_ANHO = $p_anho ";

        for ($i = 0; $i < count($meses); $i++) {
            $sql .= "UNION ALL
                    SELECT 
                        ANHO, 
                        MES, 
                        RUT, 
                        0 DIAS_TRABAJADOS, 
                        calcular_ausentismo(
                            fec_ini=>fec_ini,
                            fec_fin=>fec_fin ,
                            lun=>'1',
                            mar=>'1',
                            mie=>'1',
                            jue=>'1',
                            vie=>'1',
                            sab=>'0',
                            dom=>'0',
                            fer=>'1') VACACIONES, 
                        0 LICENCIAS, 
                        0 AUSENCIAS
                    FROM (
                        SELECT %anho% ANHO, %mes% MES,
                            (CASE WHEN '%anho%%mes_text%' = TO_CHAR(FEC_INI, 'YYYYMM') THEN
                                FEC_INI
                            ELSE
                                TO_DATE('%anho%%mes_text%01', 'YYYYMMDD')
                            END) FEC_INI,
                            
                            (CASE WHEN '%anho%%mes_text%' = TO_CHAR(FEC_FIN, 'YYYYMM') THEN
                                FEC_FIN
                            ELSE
                                LAST_DAY(TO_DATE('%anho%%mes_text%', 'YYYYMM'))
                            END) FEC_FIN, RUT
                        FROM nov_ind_vacaciones_vw
                        WHERE '%anho%%mes_text%' BETWEEN TO_CHAR(FEC_INI, 'YYYYMM') AND TO_CHAR(FEC_FIN, 'YYYYMM'))
                    UNION ALL
                    SELECT ANHO, MES, RUT, 0 DIAS_TRABAJADOS, 0 VACACIONES, 
                        (CASE WHEN (TO_CHAR(fec_ini, 'DD') = '01' AND 
                        TO_CHAR(fec_fin, 'DD') = TO_CHAR(last_day(fec_fin), 'DD')) THEN
                            30 
                        ELSE
                            fec_fin - fec_ini +1
                        END) LICENCIAS, 
                        0 AUSENCIAS
                    FROM (
                        SELECT %anho% ANHO, %mes% MES,
                            (CASE WHEN '%anho%%mes_text%' = TO_CHAR(FEC_INI, 'YYYYMM') THEN
                                FEC_INI
                            ELSE
                                TO_DATE('%anho%%mes_text%01', 'YYYYMMDD')
                            END) FEC_INI,
                            
                            (CASE WHEN '%anho%%mes_text%' = TO_CHAR(FEC_FIN, 'YYYYMM') THEN
                                FEC_FIN
                            ELSE
                                LAST_DAY(TO_DATE('%anho%%mes_text%', 'YYYYMM'))
                            END) FEC_FIN, RUT
                        FROM nov_ind_licencias_vw
                        WHERE '%anho%%mes_text%' BETWEEN TO_CHAR(FEC_INI, 'YYYYMM') AND TO_CHAR(FEC_FIN, 'YYYYMM'))
                    UNION ALL
                    SELECT ANHO, MES, RUT, 
                        0 DIAS_TRABAJADOS, 
                        0 VACACIONES, 
                        0 LICENCIAS, 
                        (CASE WHEN (TO_CHAR(fec_ini, 'DD') = '01' AND 
                        TO_CHAR(fec_fin, 'DD') = TO_CHAR(last_day(fec_fin), 'DD')) THEN
                            30 
                        ELSE
                            fec_fin - fec_ini +1
                        END) AUSENCIAS
                    FROM (
                        SELECT %anho% ANHO, %mes% MES,
                            (CASE WHEN '%anho%%mes_text%' = TO_CHAR(FEC_INI, 'YYYYMM') THEN
                                FEC_INI
                            ELSE
                                TO_DATE('%anho%%mes_text%01', 'YYYYMMDD')
                            END) FEC_INI,
                            
                            (CASE WHEN '%anho%%mes_text%' = TO_CHAR(FEC_FIN, 'YYYYMM') THEN
                                FEC_FIN
                            ELSE
                                LAST_DAY(TO_DATE('%anho%%mes_text%', 'YYYYMM'))
                            END) FEC_FIN, RUT
                        FROM nov_ind_permisos_vw
                        WHERE '%anho%%mes_text%' BETWEEN TO_CHAR(FEC_INI, 'YYYYMM') AND TO_CHAR(FEC_FIN, 'YYYYMM'))";
            $sql = str_replace("%anho%", $p_anho, $sql);
            $sql = str_replace("%mes%", intval($meses[$i]), $sql);
            $sql = str_replace("%mes_text%", $meses[$i], $sql);
        }
        $sql .= ")
        GROUP BY ANHO, MES, RUT) Q2 
        WHERE q1.pfk_anho = q2.anho
        AND q1.pfk_MES = q2.MES
        AND q1.NUM_RUT||'-'|| q1.DV_RUT = q2.RUT ";

        if (!empty($p_cod_emp)) {
            $sql .= "AND q1.COD_EMP = '$p_cod_emp' ";
        }
        if (!empty($p_mes)) {
            $sql .= "AND q1.PFK_MES = $p_mes ";
        }
        if (!empty($p_cod_ger)) {
            $sql .= "AND q1.COD_GERENCIA = '$p_cod_ger' ";
        }
        if (!empty($p_cod_dep)) {
            $sql .= "AND q1.COD_DEPARTAMENTO = '$p_cod_dep' ";
        }
        if (!empty($p_cod_cc)) {
            $sql .= "AND q1.COD_CC = '$p_cod_cc' ";
        }
        if (!empty($p_rol_cargo)) {
            $sql .= "AND TRIM(REPLACE(REPLACE(REPLACE(UPPER(q1.ROL), 'EX SHIPPING' ), '('), ')')) = UPPER('$p_rol_cargo') ";
        }

        $sql .= "GROUP BY Q2.ANHO, Q2.MES, Q1.COD_GERENCIA 
                ORDER BY Q2.ANHO ASC, Q2.MES ASC, Q1.COD_GERENCIA ASC ";

        $query = $this->db->query($sql);
        return $query->result();
    }
}
