<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class IssaModel extends CI_Model
{

    public function __construct()
    {
        parent::__construct();
        $this->load->database("BD_NOVEDADES");
    }

    public function cargarCambioAfpIssa()
    {
        $sql = 'SELECT 
                    PK_ID as "codigo",' .
            "to_char(to_date(PERIODO, 'yyyy/mm'), 'mm-yyyy')" . ' as "mes_impacto",' .
            "to_char(FECHA_CREACION, 'dd-mm-yyyy')" . ' as "fecha_creacion",' .
            'case SUBSTR(rut,0,1) when ' . "'0'" . ' then SUBSTR(rut,2,LENGTH(rut)) else rut end as "rut",
                    NOMBRE as "nombre",
                    COD_TIPO_CAMBIO as "cod_tipo_cambio",
                    NOM_TIPO_CAMBIO as "nom_tipo_cambio",
                    nvl(COD_AFP, ' . "'%null%'" . ') as "cod_afp",
                    nvl(NOM_AFP, ' . "'%null%'" . ') as "nom_afp",
                    nvl(COD_APV, ' . "'%null%'" . ') as "cod_apv",
                    nvl(NOM_APV, ' . "'%null%'" . ') as "nom_apv",
                    nvl(MONTO, ' . "'0'" . ') as "monto",
                    nvl(TIPO_MONTO, ' . "'%null%'" . ') as "tipo_moneda",
                    nvl(OBSERVACION, ' . "'%null%'" . ') as "observacion",
                    nvl(FK_COD_EMP, ' . "'%null%'" . ') as "cod_emp",
                    nvl(COD_REG_APV, ' . "'%null%'" . ') as "cod_reg_apv",
                    nvl(NOM_REG_APV, ' . "'%null%'" . ') as "nom_reg_apv"
                FROM NOV_CAMBIO_AFP CAM 
                WHERE periodo is not null
                AND (estado_enviado is null
                OR estado_enviado <>' . " 'OK')
                AND estado = 'TERMINADO' 
                AND ROWNUM <= 200
                ORDER BY FECHA_CREACION asc";


        $query = $this->db->query($sql);
        return $query->result_array();
    }

    public function cargarFiniquitoIssa()
    {
        $sql = 'SELECT 
                    PK_FINIQUITO as "codigo",' .
            "to_char(to_date(PERIODO, 'yyyy/mm'), 'mm-yyyy')" . ' as "mes_impacto",' .
            "to_char(FECHA_CREACION, 'dd-mm-yyyy')" . ' as "fecha_creacion",' .
            'case SUBSTR(rut,0,1) when ' . "'0'" . ' then SUBSTR(rut,2,LENGTH(rut)) else rut end as "rut",
                    NOMBRE as "nombre",
                    COD_CAUSAL as "cod_causal",
                    NOM_CAUSAL as "nom_causal",' .
            "to_char(FECHA_BAJA, 'dd-mm-yyyy')" . ' as "fecha_baja",' .
            'nvl(OBSERVACION, ' . "'%null%'" . ') as "observacion",
                    nvl(FK_COD_EMP, ' . "'%null%'" . ') as "cod_emp"
                FROM NOV_FINIQUITOS  
                WHERE periodo is not null
                AND (estado_enviado is null
                OR estado_enviado <>' . " 'OK')
                AND estado = 'TERMINADO' 
                AND ROWNUM <= 200
                ORDER BY FECHA_CREACION asc";


        $query = $this->db->query($sql);
        return $query->result_array();
    }

    public function cargarCambioCargoRentaIssa()
    {
        $sql = 'SELECT 
                    PK_ID as "codigo",' .
            "to_char(to_date(PERIODO, 'yyyy/mm'), 'mm-yyyy')" . ' as "mes_impacto",' .
            "to_char(FECHA_CREACION, 'dd-mm-yyyy')" . ' as "fecha_creacion",' .
            'case SUBSTR(rut,0,1) when ' . "'0'" . ' then SUBSTR(rut,2,LENGTH(rut)) else rut end as "rut",
                    NOMBRE as "nombre",
                    COD_TIPO_CAMBIO as "cod_tipo_cambio",
                    NOM_TIPO_CAMBIO as "nom_tipo_cambio",
                    nvl(COD_CC, ' . "'%null%'" . ') as "cod_cc",
                    nvl(NOM_CC, ' . "'%null%'" . ') as "nom_cc",
                    nvl(COD_CARGO, ' . "'%null%'" . ') as "cod_cargo",
                    nvl(NOM_CARGO, ' . "'%null%'" . ') as "nom_cargo",
                    nvl(COD_JORNADA, ' . "'%null%'" . ') as "cod_jornada",
                    nvl(NOM_JORNADA, ' . "'%null%'" . ') as "nom_jornada",
                    nvl(COD_TIPO_CONTRATO, ' . "'%null%'" . ') as "cod_tipo_contrato",
                    nvl(NOM_TIPO_CONTRATO, ' . "'%null%'" . ') as "nom_tipo_contrato",' .
            "nvl(to_char(FECHA_FIN_CONTRATO, 'dd-mm-yyyy'), '%null%')" . ' as "fecha_fin_contrato",' .
            'nvl(SUELDO_BASE, ' . "0" . ') as "sueldo_base",
                    nvl(OBSERVACION, ' . "'%null%'" . ') as "observacion",
                    nvl(FK_COD_EMP, ' . "'%null%'" . ') as "cod_emp",
                    nvl(ROL_CARGO, ' . "'%null%'" . ') as "rol_cargo",
                    nvl(COD_GERENCIA, ' . "'%null%'" . ') as "cod_gerencia",
                    nvl(NOM_GERENCIA, ' . "'%null%'" . ') as "nom_gerencia",
                    nvl(COD_DEPARTAMENTO, ' . "'%null%'" . ') as "cod_departamento",
                    nvl(NOM_DEPARTAMENTO, ' . "'%null%'" . ') as "nom_departamento",
                    nvl(COD_LUGAR_TRABAJO, ' . "'%null%'" . ') as "cod_lugar",
                    nvl(NOM_LUGAR_TRABAJO, ' . "'%null%'" . ') as "nom_lugar",
                    nvl(RUT_JEFE, ' . "'%null%'" . ') as "rut_jefe",
                    nvl(NOM_JEFE, ' . "'%null%'" . ') as " nom_jefe"
                FROM NOV_CAMBIO_CARGO_RENTA CAM 
                WHERE periodo is not null
                AND (estado_enviado is null
                OR estado_enviado <>' . " 'OK')
                AND estado = 'TERMINADO' 
                AND ROWNUM <= 200
                ORDER BY FECHA_CREACION asc";


        $query = $this->db->query($sql);
        return $query->result_array();
    }

    public function cargarCambioDepositoIssa()
    {
        $sql = 'SELECT 
                    PK_ID as "codigo",' .
            "to_char(to_date(PERIODO, 'yyyy/mm'), 'mm-yyyy')" . ' as "mes_impacto",' .
            "to_char(FECHA_CREACION, 'dd-mm-yyyy')" . ' as "fecha_creacion",' .
            'case SUBSTR(rut,0,1) when ' . "'0'" . ' then SUBSTR(rut,2,LENGTH(rut)) else rut end as "rut",
                    NOMBRE as "nombre",
                    nvl(COD_FORMA_PAGO, ' . "'%null%'" . ') as "cod_forma_pago",
                    nvl(NOM_FORMA_PAGO, ' . "'%null%'" . ') as "nom_forma_pago",
                    nvl(COD_BANCO, ' . "'%null%'" . ') as "cod_banco",
                    nvl(NOM_BANCO, ' . "'%null%'" . ') as "nom_banco",
                    nvl(NUM_CUENTA, ' . "'%null%'" . ') as "num_cuenta",
                    USR_CREADOR as "usr_creador",
                    nvl(OBSERVACION, ' . "'%null%'" . ') as "observacion",
                    nvl(FK_COD_EMP, ' . "'%null%'" . ') as "cod_emp"
                FROM NOV_CAMBIO_DEPOSITO CAM 
                WHERE periodo is not null
                AND (estado_enviado is null
                OR estado_enviado <>' . " 'OK')
                AND estado = 'TERMINADO' 
                AND ROWNUM <= 200
                ORDER BY FECHA_CREACION asc";


        $query = $this->db->query($sql);
        return $query->result_array();
    }

    public function cargarCambioSaludIssa()
    {
        $sql = 'SELECT 
                    PK_ID as "codigo",' .
            "to_char(to_date(PERIODO, 'yyyy/mm'), 'mm-yyyy')" . ' as "mes_impacto",' .
            "to_char(FECHA_CREACION, 'dd-mm-yyyy')" . ' as "fecha_creacion",' .
            'case SUBSTR(rut,0,1) when ' . "'0'" . ' then SUBSTR(rut,2,LENGTH(rut)) else rut end as "rut",
                    NOMBRE as "nombre",
                    COD_TIPO_CAMBIO as "cod_tipo_cambio",
                    NOM_TIPO_CAMBIO as "nom_tipo_cambio",
                    nvl(COD_SALUD, ' . "'%null%'" . ') as "cod_salud",
                    nvl(NOM_SALUD, ' . "'%null%'" . ') as "nom_salud",
                    nvl(VALOR_PLAN, ' . "'0'" . ') as "valor_plan",
                    nvl(TIPO_PLAN, ' . "'%null%'" . ') as "tipo_plan",
                    nvl(VALOR_GES, ' . "'0'" . ') as "valor_ges",
                    nvl(TIPO_GES, ' . "'%null%'" . ') as "tipo_ges",
                    nvl(VALOR_ADI_TRA, ' . "'0'" . ') as "valor_adi_tra",
                    nvl(TIPO_ADI_TRA, ' . "'%null%'" . ') as "tipo_adi_tra",
                    nvl(VALOR_ADI_EMP, ' . "'0'" . ') as "valor_adi_emp",
                    nvl(TIPO_ADI_EMP, ' . "'%null%'" . ') as "tipo_adi_emp",
                    nvl(VALOR_CONVENIO, ' . "'0'" . ') as "valor_convenio",
                    nvl(TIPO_CONVENIO, ' . "'%null%'" . ') as "tipo_convenio",
                    nvl(OBSERVACION, ' . "'%null%'" . ') as "observacion",
                    nvl(FK_COD_EMP, ' . "'%null%'" . ') as "cod_emp"
                FROM NOV_CAMBIO_SALUD CAM 
                WHERE periodo is not null
                AND (estado_enviado is null
                OR estado_enviado <>' . " 'OK')
                AND estado = 'TERMINADO' 
                AND ROWNUM <= 200
                ORDER BY FECHA_CREACION asc";


        $query = $this->db->query($sql);
        return $query->result_array();
    }

    public function cargarCambioSindicatoIssa()
    {
        $sql = 'SELECT 
                    PK_ID as "codigo",' .
            "to_char(to_date(PERIODO, 'yyyy/mm'), 'mm-yyyy')" . ' as "mes_impacto",' .
            "to_char(FECHA_CREACION, 'dd-mm-yyyy')" . ' as "fecha_creacion",' .
            'case SUBSTR(rut,0,1) when ' . "'0'" . ' then SUBSTR(rut,2,LENGTH(rut)) else rut end as "rut",
                    NOMBRE as "nombre",
                    nvl(COD_TIPO_CAMBIO, ' . "'%null%'" . ') as "cod_tipo_cambio",
                    nvl(NOM_TIPO_CAMBIO, ' . "'%null%'" . ') as "nom_tipo_cambio",
                    nvl(COD_SINDICATO, ' . "'%null%'" . ') as "cod_sindicato",
                    nvl(NOM_SINDICATO, ' . "'%null%'" . ') as "nom_sindicato",
                    nvl(COD_ADHERENCIA, ' . "'%null%'" . ') as "cod_adherencia",
                    nvl(NOM_ADHERENCIA, ' . "'%null%'" . ') as "nom_adherencia",
                    nvl(OBSERVACION, ' . "'%null%'" . ') as "observacion",
                    nvl(FK_COD_EMP, ' . "'%null%'" . ') as "cod_emp"
                FROM NOV_CAMBIO_SINDICATO CAM 
                WHERE periodo is not null
                AND (estado_enviado is null
                OR estado_enviado <>' . " 'OK')
                AND estado = 'TERMINADO' 
                AND ROWNUM <= 200
                ORDER BY FECHA_CREACION asc";


        $query = $this->db->query($sql);
        return $query->result_array();
    }

    public function cargarAusentismoIssa()
    {
        $sql = 'SELECT 
                    PK_ID as "codigo",' .
            "to_char(to_date(PERIODO, 'yyyy/mm'), 'mm-yyyy')" . ' as "mes_impacto",' .
            "to_char(FECHA_CREACION, 'dd-mm-yyyy')" . ' as "fecha_creacion",' .
            'case SUBSTR(rut,0,1) when ' . "'0'" . ' then SUBSTR(rut,2,LENGTH(rut)) else rut end as "rut",
                    NOMBRE as "nombre",
                    TIPO as "tipo",
                    COD_AUSENTISMO as "cod_ausentismo",
                    NOMBRE_AUSENTISMO as "nombre_ausentismo",' .
            "to_char(FECHA_INI, 'dd-mm-yyyy')" . ' as "fecha_ini",' .
            "to_char(FECHA_FIN, 'dd-mm-yyyy')" . ' as "fecha_fin",' .
            'CANTIDAD_DIAS as "cantidad_dias",
                    nvl(OBSERVACION, ' . "'%null%'" . ') as "observacion",
                    nvl(FK_COD_EMP, ' . "'%null%'" . ') as "cod_emp"
                FROM NOV_AUSENTISMO  
                WHERE periodo is not null
                AND (estado_enviado is null
                OR estado_enviado <>' . " 'OK')
                AND estado = 'TERMINADO' 
                AND ROWNUM <= 200
                ORDER BY FECHA_CREACION asc";


        $query = $this->db->query($sql);
        return $query->result_array();
    }

    public function cargarCambioBonoIssa()
    {
        $sql = ' SELECT * FROM (
                    SELECT 
                        BON.PK_ID as "codigo",' .
            "to_char(to_date(BON.PERIODO, 'yyyy/mm'), 'mm-yyyy')" . ' as "mes_impacto",' .
            "to_char(BON.FECHA_CREACION, 'dd-mm-yyyy')" . ' as "fecha_creacion",' .
            'case SUBSTR(rut,0,1) when ' . "'0'" . ' then SUBSTR(rut,2,LENGTH(rut)) else rut end as "rut",
                        BON.NOMBRE as "nombre",
                        CON.pfk_cod_concepto as "cod_concepto",   
                        CON.NOM_CONCEPTO as "nom_concepto",   
                        CON.valor as "valor",
                        nvl(bon.FK_COD_EMP, ' . "'%null%'" . ') as "cod_emp"
                    FROM NOV_CAMBIO_BONO BON, NOV_CAMBIO_BONO_CONCEPTOS CON
                    WHERE BON.PK_ID = CON.PFK_BONO
                    AND BON.periodo is not null
                    AND (CON.estado_enviado is null
                    OR CON.estado_enviado <>' . " 'OK')
                    AND BON.estado = 'TERMINADO' 
                    AND CON.valor <> 0 
                    UNION " .
            'SELECT 
                        BON.PK_ID as "codigo",' .
            "to_char(to_date(BON.PERIODO, 'yyyy/mm'), 'mm-yyyy')" . ' as "mes_impacto",' .
            "to_char(BON.FECHA_CREACION, 'dd-mm-yyyy')" . ' as "fecha_creacion",' .
            'case SUBSTR(rut,0,1) when ' . "'0'" . ' then SUBSTR(rut,2,LENGTH(rut)) else rut end as "rut",
                        BON.NOMBRE as "nombre",
                        CON.pfk_cod_concepto as "cod_concepto",   
                        CON.NOM_CONCEPTO as "nom_concepto",   
                        CON.valor as "valor",
                        nvl(bon.FK_COD_EMP, ' . "'%null%'" . ') as "cod_emp"
                    FROM NOV_CAMBIO_BONO BON, NOV_CAMBIO_BONO_CONCEPTOS CON, NOV_CONCEPTOS CO
                    WHERE BON.PK_ID = CON.PFK_BONO
                    AND con.pfk_cod_concepto = co.pk_cod_concepto
                    AND CON.PFK_COD_EMP = CO.PFK_COD_EMP
                    AND BON.periodo is not null
                    AND (CON.estado_enviado is null
                    OR CON.estado_enviado <>' . " 'OK')
                    AND BON.estado = 'TERMINADO' 
                    AND CON.VALOR = 0
                    AND CO.NO_CERO = '0' 
                )
                WHERE ROWNUM <= 200";

        $query = $this->db->query($sql);
        return $query->result_array();
    }

    public function cargarConceptosFiniquitoIssa()
    {
        $sql = 'SELECT *
                FROM (
                    SELECT 
                        FIN.PK_FINIQUITO as "codigo",' .
            "to_char(to_date(FIN.PERIODO, 'yyyy/mm'), 'mm-yyyy')" . ' as "mes_impacto",' .
            "to_char(FIN.FECHA_CREACION, 'dd-mm-yyyy')" . ' as "fecha_creacion",' .
            'case SUBSTR(rut,0,1) when ' . "'0'" . ' then SUBSTR(rut,2,LENGTH(rut)) else rut end as "rut",
                        FIN.NOMBRE as "nombre",
                        CON.pfk_cod_concepto as "cod_concepto",   
                        CON.NOM_CONCEPTO as "nom_concepto",   
                        CON.valor as "valor",
                        nvl(FIN.FK_COD_EMP, ' . "'%null%'" . ') as "cod_emp"
                    FROM NOV_FINIQUITO_CONCEPTOS con, NOV_FINIQUITOS FIN
                    WHERE CON.PFK_FINIQUITO = FIN.PK_FINIQUITO
                    AND FIN.periodo is not null
                    AND (CON.estado_enviado is null
                    OR CON.estado_enviado <>' . " 'OK')
                    AND FIN.estado = 'TERMINADO' 
                    AND CON.valor <> 0 
                    UNION " .
            'SELECT 
                        FIN.PK_FINIQUITO as "codigo",' .
            "to_char(to_date(FIN.PERIODO, 'yyyy/mm'), 'mm-yyyy')" . ' as "mes_impacto",' .
            "to_char(FIN.FECHA_CREACION, 'dd-mm-yyyy')" . ' as "fecha_creacion",' .
            'case SUBSTR(rut,0,1) when ' . "'0'" . ' then SUBSTR(rut,2,LENGTH(rut)) else rut end as "rut",
                        FIN.NOMBRE as "nombre",
                        CON.pfk_cod_concepto as "cod_concepto",   
                        CON.NOM_CONCEPTO as "nom_concepto",   
                        CON.valor as "valor",
                        nvl(FIN.FK_COD_EMP, ' . "'%null%'" . ') as "cod_emp"
                    FROM NOV_FINIQUITO_CONCEPTOS con, NOV_FINIQUITOS FIN, NOV_CONCEPTOS CO
                    WHERE CON.PFK_FINIQUITO = FIN.PK_FINIQUITO
                    AND con.pfk_cod_concepto = co.pk_cod_concepto
                    AND CON.PFK_COD_EMP = CO.PFK_COD_EMP
                    AND FIN.periodo is not null
                    AND (CON.estado_enviado is null
                    OR CON.estado_enviado <>' . " 'OK')
                    AND FIN.estado = 'TERMINADO' 
                    AND CON.VALOR = 0
                    AND CO.NO_CERO = '0' 
                )
                WHERE ROWNUM <= 200 ";

        $query = $this->db->query($sql);
        return $query->result_array();
    }

    public function cargarConceptosIngPersonalIssa()
    {
        $sql = 'SELECT * 
                FROM (
                    SELECT 
                        ING.PK_ID as "codigo",' .
            "to_char(to_date(ING.PERIODO, 'yyyy/mm'), 'mm-yyyy')" . ' as "mes_impacto",' .
            "to_char(ING.FECHA_CREACION, 'dd-mm-yyyy')" . ' as "fecha_creacion",' .
            'case SUBSTR(ING.RUT || ' . "'-'" . '||ING.DV,0,1) when ' . "'0'" . ' then SUBSTR(ING.RUT || ' . "'-'" . '||ING.DV,2,LENGTH(rut)) else ING.RUT ||' . "'-'" . '|| ING.DV end as "rut",
                        ING.APE_PAT || ' . "' ' || ING.APE_MAT || ', ' ||ING.NOMBRES " . '  as "nombre",
                        CON.pfk_cod_concepto as "cod_concepto",   
                        CON.NOM_CONCEPTO as "nom_concepto",   
                        CON.valor as "valor",
                        nvl(ING.COD_EMP, ' . "'%null%'" . ') as "cod_emp"
                    FROM NOV_INGRESAR_PERSONAL ING, NOV_ING_PER_CONCEPTOS con
                    WHERE ING.PK_ID = CON.PFK_INGRESO 
                    AND ING.periodo is not null
                    AND (CON.estado_enviado is null
                    OR CON.estado_enviado <>' . " 'OK')
                    AND ING.estado = 'TERMINADO' 
                    AND CON.valor <> 0 
                    UNION " .
            'SELECT 
                        ING.PK_ID as "codigo",' .
            "to_char(to_date(ING.PERIODO, 'yyyy/mm'), 'mm-yyyy')" . ' as "mes_impacto",' .
            "to_char(ING.FECHA_CREACION, 'dd-mm-yyyy')" . ' as "fecha_creacion",' .
            'case SUBSTR(ING.RUT || ' . "'-'" . '||ING.DV,0,1) when ' . "'0'" . ' then SUBSTR(ING.RUT || ' . "'-'" . '||ING.DV,2,LENGTH(rut)) else ING.RUT ||' . "'-'" . '|| ING.DV end as "rut",
                        ING.APE_PAT || ' . "' ' || ING.APE_MAT || ', ' ||ING.NOMBRES " . '  as "nombre",
                        CON.pfk_cod_concepto as "cod_concepto",   
                        CON.NOM_CONCEPTO as "nom_concepto",   
                        CON.valor as "valor",
                        nvl(ING.COD_EMP, ' . "'%null%'" . ') as "cod_emp"
                    FROM NOV_INGRESAR_PERSONAL ING, NOV_ING_PER_CONCEPTOS con, NOV_CONCEPTOS CO
                    WHERE ING.PK_ID = CON.PFK_INGRESO 
                    AND con.pfk_cod_concepto = co.pk_cod_concepto
                    AND CON.PFK_COD_EMP = CO.PFK_COD_EMP
                    AND ING.periodo is not null
                    AND (CON.estado_enviado is null
                    OR CON.estado_enviado <>' . " 'OK')
                    AND ING.estado = 'TERMINADO' 
                    AND CON.VALOR = 0
                    AND CO.NO_CERO = '0' 
                )
                WHERE ROWNUM <= 200 ";

        $query = $this->db->query($sql);
        return $query->result_array();
    }


    public function cargarCambioOtrosIssa()
    {
        $sql = 'SELECT 
                    PK_ID as "codigo",' .
            "to_char(to_date(PERIODO, 'yyyy/mm'), 'mm-yyyy')" . ' as "mes_impacto",' .
            "to_char(FECHA_CREACION, 'dd-mm-yyyy')" . ' as "fecha_creacion",' .
            'case SUBSTR(rut,0,1) when ' . "'0'" . ' then SUBSTR(rut,2,LENGTH(rut)) else rut end as "rut",
                    NOMBRE as "nombre",
                    COD_TIPO_CAMBIO as "cod_tipo_cambio",
                    NOM_TIPO_CAMBIO as "nom_tipo_cambio",
                    nvl(COD_EST_CIVIL, ' . "'%null%'" . ') as "cod_est_civil",
                    nvl(NOM_EST_CIVIL, ' . "'%null%'" . ') as "nom_est_civil",
                    nvl(COD_ESCOLARIDAD, ' . "'%null%'" . ') as "cod_escolaridad",
                    nvl(NOM_ESCOLARIDAD, ' . "'%null%'" . ') as "nom_escolaridad",
                    nvl(CALLE, ' . "'%null%'" . ') as "calle",
                    nvl(NUMERO, ' . "'%null%'" . ') as "numero",
                    nvl(DEPARTAMENTO, ' . "'%null%'" . ') as "departamento",
                    nvl(COMUNA, ' . "'%null%'" . ') as "comuna",
                    nvl(CIUDAD, ' . "'%null%'" . ') as "ciudad",
                    nvl(CORREO, ' . "'%null%'" . ') as "correo", 
                    nvl(TELEFONO, ' . "'%null%'" . ') as "telefono",
                    nvl(OBSERVACION, ' . "'%null%'" . ') as "observacion",
                    nvl(FK_COD_EMP, ' . "'%null%'" . ') as "cod_emp",
                    nvl(TELEFONO2, ' . "'%null%'" . ') as "telefono2",
                    nvl(COD_COMUNA, ' . "'%null%'" . ') as "cod_comuna",
                    nvl(COD_CIUDAD, ' . "'%null%'" . ') as "cod_ciudad"
                FROM NOV_CAMBIO_OTROS CAM 
                WHERE periodo is not null
                AND (estado_enviado is null
                OR estado_enviado <>' . " 'OK')
                AND estado = 'TERMINADO' 
                AND ROWNUM <= 200
                ORDER BY FECHA_CREACION asc";


        $query = $this->db->query($sql);
        return $query->result_array();
    }


    public function cargarIngDescuentoRRLLIssa()
    {

        $sql = 'SELECT 
                    PK_COD as "codigo",' .
            "to_char(to_date(PERIODO, 'yyyy/mm'), 'mm-yyyy')" . ' as "mes_impacto",' .
            "to_char(FECHA_CREACION, 'dd-mm-yyyy')" . ' as "fecha_creacion",' .
            'case SUBSTR(rut,0,1) when ' . "'0'" . ' then SUBSTR(rut,2,LENGTH(rut)) else rut end as "rut",
                    NOMBRE as "nombre",
                    nvl(NOM_GERENCIA, ' . "'%null%'" . ') as "gerencia",
                    nvl(NOM_DEPARTAMENTO, ' . "'%null%'" . ') as "departamento",
                    nvl(COD_CC, ' . "'%null%'" . ') as "cod_cc",
                    nvl(NOM_CC, ' . "'%null%'" . ') as "nom_cc",
                    nvl(FK_TIPO, ' . "'%null%'" . ') as "tipo",
                    nvl(FK_DESCUENTO, ' . "'%null%'" . ') as "cod_descuento",
                    nvl(NOM_DESCUENTO, ' . "'%null%'" . ') as "nom_descuento",
                    nvl(FORMATO_VALOR, ' . "'%null%'" . ') as "formato",
                    nvl(MONTO_TOTAL, ' . "'0'" . ') as "monto_total",
                    nvl(CUOTAS, ' . "'0'" . ') as "cuotas",
                    nvl(VALOR_CUOTA, ' . "'0'" . ') as "valor_cuota",
                    nvl(ANHO_DESCUENTO, ' . "'0'" . ') as "anho_descuento",
                    nvl(MES_DESCUENTO, ' . "'%null%'" . ') as "mes_descuento", 
                    nvl(OBSERVACION, ' . "'%null%'" . ') as "observacion",
                    nvl(FK_COD_EMP, ' . "'%null%'" . ') as "cod_emp"
                FROM NOV_ING_DESCUENTOS_RRLL  
                WHERE periodo is not null
                AND (estado_enviado is null
                OR estado_enviado <>' . " 'OK')
                AND estado = 'TERMINADO' 
                AND ROWNUM <= 200
                ORDER BY FECHA_CREACION asc";


        $query = $this->db->query($sql);
        return $query->result_array();
    }

    public function cargarIngHaberRRLLIssa()
    {

        $sql = 'SELECT 
                    PK_COD as "codigo",' .
            "to_char(to_date(PERIODO, 'yyyy/mm'), 'mm-yyyy')" . ' as "mes_impacto",' .
            "to_char(FECHA_CREACION, 'dd-mm-yyyy')" . ' as "fecha_creacion",' .
            'case SUBSTR(rut,0,1) when ' . "'0'" . ' then SUBSTR(rut,2,LENGTH(rut)) else rut end as "rut",
                    NOMBRE as "nombre",
                    nvl(NOM_GERENCIA, ' . "'%null%'" . ') as "gerencia",
                    nvl(NOM_DEPARTAMENTO, ' . "'%null%'" . ') as "departamento",
                    nvl(COD_CC, ' . "'%null%'" . ') as "cod_cc",
                    nvl(NOM_CC, ' . "'%null%'" . ') as "nom_cc",
                    nvl(FK_TIPO, ' . "'%null%'" . ') as "tipo",
                    nvl(FK_HABER, ' . "'%null%'" . ') as "cod_haber",
                    nvl(NOM_HABER, ' . "'%null%'" . ') as "nom_haber",
                    nvl(FORMATO_VALOR, ' . "'%null%'" . ') as "formato",
                    nvl(MONTO, 0) as "monto",
                    nvl(USA_FECHA, ' . "'0'" . ') as "usa_fecha",' .
            "nvl(to_char(INICIO, 'dd-mm-yyyy'), '%null%')" . ' as "inicio",' .
            "nvl(to_char(TERMINO, 'dd-mm-yyyy'), '%null%')" . ' as "termino",' .
            'nvl(OBSERVACION, ' . "'%null%'" . ') as "observacion",
                    nvl(FK_COD_EMP, ' . "'%null%'" . ') as "cod_emp"
                FROM NOV_ING_HABERES_RRLL  
                WHERE periodo is not null
                AND (estado_enviado is null
                OR estado_enviado <>' . " 'OK')
                AND estado = 'TERMINADO' 
                AND ROWNUM <= 200
                ORDER BY FECHA_CREACION asc";


        $query = $this->db->query($sql);
        return $query->result_array();
    }

    public function cargarIngPersonalIssa()
    {
        $sql = 'SELECT 
                    PK_ID as "codigo",' .
            "to_char(to_date(PERIODO, 'yyyy/mm'), 'mm-yyyy')" . ' as "mes_impacto",' .
            "to_char(FECHA_CREACION, 'dd-mm-yyyy')" . ' as "fecha_creacion",' .
            'case SUBSTR(ING.RUT || ' . "'-'" . '||ING.DV,0,1) when ' . "'0'" . ' then SUBSTR(ING.RUT || ' . "'-'" . '||ING.DV,2,LENGTH(rut)) else ING.RUT || ' . "'-'" . ' || ING.DV end as "rut",
                    ING.NOMBRES as "nombres",
                    ING.APE_PAT as "ape_pat",
                    ING.APE_MAT as "ape_mat",' .
            "to_char(FECHA_CREACION, 'dd-mm-yyyy')" . ' as "fecha_nacimiento",' .
            'nvl(COD_SEXO, ' . "'%null%'" . ') as "cod_sexo",
                    nvl(SEXO, ' . "'%null%'" . ') as "sexo", 
                    nvl(NACIONALIDAD, ' . "'%null%'" . ') as "nacionalidad", 
                    nvl(COD_ESTADO_CIVIL, ' . "'%null%'" . ') as "cod_estado_civil", 
                    nvl(ESTADO_CIVIL, ' . "'%null%'" . ') as "estado_civil", 
                    nvl(COD_NIVEL_EDUCACION, ' . "'%null%'" . ') as "cod_nivel_educacion",
                    nvl(NIVEL_EDUCACION, ' . "'%null%'" . ') as "nivel_educacion",
                    nvl(CALLE, ' . "'%null%'" . ') as "calle",
                    nvl(NUMERO, ' . "'%null%'" . ') as "numero",
                    nvl(DEPARTAMENTO, ' . "'%null%'" . ') as "num_dep",
                    nvl(COMUNA, ' . "'%null%'" . ') as "comuna", 
                    nvl(CIUDAD, ' . "'%null%'" . ') as "ciudad", 
                    nvl(TELEFONO, ' . "'%null%'" . ') as "telefono", 
                    nvl(CELULAR, ' . "'%null%'" . ') as "celular", 
                    nvl(CORREO, ' . "'%null%'" . ') as "correo", 
                    nvl(NOM_GERENCIA, ' . "'%null%'" . ') as "gerencia", 
                    nvl(NOM_DEPARTAMENTO, ' . "'%null%'" . ') as "departamento", 
                    nvl(COD_CC, ' . "'%null%'" . ') as "cod_cc", 
                    nvl(NOM_CC, ' . "'%null%'" . ') as "nom_cc",  
                    nvl(COD_CARGO, ' . "'%null%'" . ') as "cod_cargo", 
                    nvl(NOM_CARGO, ' . "'%null%'" . ') as "nom_cargo",  
                    nvl(COD_JORNADA, ' . "'%null%'" . ') as "cod_jornada",  
                    nvl(JORNADA, ' . "'%null%'" . ') as "jornada",' .
            "nvl(to_char(FECHA_INGRESO, 'dd-mm-yyyy'), '%null%')" . ' as "fecha_ingreso",' .
            "nvl(to_char(FECHA_VENCIMIENTO, 'dd-mm-yyyy'), '%null%')" . ' as "fecha_vencimiento",' .
            'nvl(COD_INE, ' . "'%null%'" . ') as "cod_ine",  
                    nvl(INE, ' . "'%null%'" . ') as "ine",  
                    nvl(RUT_JEFE, ' . "'%null%'" . ') as "rut_jefe",  
                    nvl(DV_JEFE, ' . "'%null%'" . ') as "dv_jefe",  
                    nvl(COD_TIPO_CONTRATO, ' . "'%null%'" . ') as "cod_tipo_contrato",  
                    nvl(TIPO_CONTRATO, ' . "'%null%'" . ') as "tipo_contrato", 
                    nvl(ROL_CARGO, ' . "'%null%'" . ') as "rol_cargo", 
                    nvl(SUELDO_BASE, ' . "'0'" . ') as "sueldo_base",
                    nvl(RENTA_CONTRATO, ' . "'0'" . ') as "renta_contrato", 
                    nvl(COD_AFP, ' . "'%null%'" . ') as "cod_afp",
                    nvl(AFP, ' . "'%null%'" . ') as "afp", 
                    nvl(COD_SALUD, ' . "'%null%'" . ') as "cod_salud",
                    nvl(SALUD, ' . "'%null%'" . ') as "salud", 
                    nvl(PLAN_SALUD, ' . "'0'" . ') as "plan_salud", 
                    nvl(FORMATO_PLAN_SALUD, ' . "'%null%'" . ') as "formato_plan_salud", 
                    nvl(PLAN_COLECTIVO_SALUD, ' . "'0'" . ') as "plan_colectivo_salud", 
                    nvl(FORMATO_PLAN_COLECTIVO_SALUD, ' . "'%null%'" . ') as "formato_plan_colectivo_salud", 
                    nvl(MONTO_APV, ' . "'0'" . ') as "monto_apv", 
                    nvl(COD_INSTITUCION_APV, ' . "'%null%'" . ') as "cod_institucion_apv", 
                    nvl(INSTITUCION_APV, ' . "'%null%'" . ') as "institucion_apv", 
                    nvl(COD_REGIMEN_APV, ' . "'%null%'" . ') as "cod_regimen_apv", 
                    nvl(REGIMEN_APV, ' . "'%null%'" . ') as "regimen_apv", 
                    nvl(FORMATO_MONTO_APV, ' . "'%null%'" . ') as "formato_monto_apv", 
                    nvl(MONTO_GES, ' . "'0'" . ') as "monto_ges", 
                    nvl(FORMATO_GES, ' . "'%null%'" . ') as "formato_ges", 
                    nvl(MONTO_ADI_TRA, ' . "'0'" . ') as "monto_adi_tra", 
                    nvl(FORMATO_ADI_TRA, ' . "'%null%'" . ') as "formato_adi_tra", 
                    nvl(MONTO_ADI_EMP, ' . "'0'" . ') as "monto_adi_emp", 
                    nvl(FORMATO_ADI_EMP, ' . "'%null%'" . ') as "formato_adi_emp", 
                    nvl(COD_FORMA_PAGO, ' . "'%null%'" . ') as "cod_forma_pago", 
                    nvl(FORMA_PAGO, ' . "'%null%'" . ') as "forma_pago", 
                    nvl(COD_BANCO, ' . "'%null%'" . ') as "cod_banco", 
                    nvl(BANCO, ' . "'%null%'" . ') as "banco", 
                    nvl(CUENTA, ' . "'%null%'" . ') as "cuenta",
                    nvl(COD_EMP, ' . "'%null%'" . ') as "cod_emp",
                    nvl(CORREO_EMP, ' . "'%null%'" . ') as "correo_emp",
                    nvl(COD_EMP, ' . "'%null%'" . ') as "cod_emp",
                    nvl(COD_LUGAR_TRABAJO, ' . "'%null%'" . ') as "cod_lugar",
                    nvl(NOM_LUGAR_TRABAJO, ' . "'%null%'" . ') as "nom_lugar",
                    nvl(NOM_JEFE, ' . "'%null%'" . ') as "nom_jefe",
                    nvl(COD_COMUNA, ' . "'%null%'" . ') as "cod_comuna",
                    nvl(COD_CIUDAD, ' . "'%null%'" . ') as "cod_ciudad",
                    nvl(COD_NACIONALIDAD, ' . "'%null%'" . ') as "cod_nacionalidad",
                    nvl(COD_INVALIDEZ, ' . "'%null%'" . ') as "cod_invalidez",
                    nvl(NOM_INVALIDEZ, ' . "'%null%'" . ') as "nom_invalidez",
                    nvl(TELEFONO2, ' . "'%null%'" . ') as "telefono2"
                    
                FROM NOV_INGRESAR_PERSONAL ING
                WHERE periodo is not null
                AND (estado_enviado is null
                OR estado_enviado <>' . " 'OK')
                AND estado = 'TERMINADO' 
                AND ROWNUM <= 200
                ORDER BY FECHA_CREACION asc ";

        //echo $sql;


        $query = $this->db->query($sql);
        return $query->result_array();
    }

    public function contarRegistrosProcesoMensualIssa($p_proceso, $p_tipo, $p_cod_emp)
    {
        //AND PRO.estado = 'TERMINADO'
        $sql = '
            SELECT SUM(CONTAR) CONTAR FROM (
            SELECT 
                    count(*) CONTAR
            FROM NOV_PROC_MENSUAl_conceptos con, 
                NOV_PROC_MENSUAL_PERSONS PER,
                NOV_PROC_MENSUAL_CC CC,
                NOV_PROC_MENSUAL PRO
            WHERE PRO.PK_PROCESO = CC.PFK_PROCESO
            AND PRO.PK_TIPO = CC.PFK_TIPO
            AND PRO.PFK_COD_EMP = CC.PFK_COD_EMP
            AND CC.PFK_PROCESO = PER.PFK_PROCESO
            AND CC.PFK_TIPO = PER.PFK_TIPO
            AND CC.PFK_COD_EMP = PER.PFK_COD_EMP
            AND cc.pk_cod_cc = PER.PFK_COD_CC
            AND CON.PFK_PROCESO = PER.PFK_PROCESO
            AND CON.PFK_TIPO = PER.PFK_TIPO
            AND CON.PFK_COD_EMP = PER.PFK_COD_EMP
            AND CON.PFK_COD_CC = PER.PFK_COD_CC
            AND CON.PFK_RUT = PER.PK_RUT
            AND CON.PFK_COD_EMP =' . "'" . $p_cod_emp . "'
            AND CON.PFK_PROCESO = '$p_proceso'
            AND CON.PFK_TIPO = '$p_tipo'
            AND CON.VALOR <> 0
            AND (CON.estado_enviado is null
            OR CON.estado_enviado <> 'OK')" .
            'UNION
            SELECT 
                    count(*) CONTAR
            FROM NOV_PROC_MENSUAl_conceptos con, 
                NOV_PROC_MENSUAL_PERSONS PER,
                NOV_PROC_MENSUAL_CC CC,
                NOV_PROC_MENSUAL PRO,
                NOV_CONCEPTOS CO
            WHERE PRO.PK_PROCESO = CC.PFK_PROCESO
            AND PRO.PK_TIPO = CC.PFK_TIPO
            AND PRO.PFK_COD_EMP = CC.PFK_COD_EMP
            AND CC.PFK_PROCESO = PER.PFK_PROCESO
            AND CC.PFK_TIPO = PER.PFK_TIPO
            AND CC.PFK_COD_EMP = PER.PFK_COD_EMP
            AND cc.pk_cod_cc = PER.PFK_COD_CC
            AND CON.PFK_PROCESO = PER.PFK_PROCESO
            AND CON.PFK_TIPO = PER.PFK_TIPO
            AND CON.PFK_COD_EMP = PER.PFK_COD_EMP
            AND CON.PFK_COD_CC = PER.PFK_COD_CC
            AND CON.PFK_RUT = PER.PK_RUT
            AND con.pfk_cod_concepto = co.pk_cod_concepto
            AND CON.PFK_COD_EMP = CO.PFK_COD_EMP
            AND CON.PFK_COD_EMP =' . "'" . $p_cod_emp . "'
            AND CON.PFK_PROCESO = '$p_proceso'
            AND CON.PFK_TIPO = '$p_tipo'
            AND CON.VALOR = 0
            AND CO.NO_CERO = '0'
            AND (CON.estado_enviado is null
            OR CON.estado_enviado <> 'OK'))";

        //echo $sql;

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function cargarUltimoEnvioProcesoMensual($p_proceso, $p_tipo, $p_cod_emp)
    {
        $sql = "SELECT 
                    NVL(MAX(TERMINO), 0) TERMINO
                FROM NOV_LOG_ENVIO_PM_ISSA
                WHERE PROCESO = '$p_proceso'
                AND TIPO = '$p_tipo'
                AND COD_EMP = $p_cod_emp
                AND OBSERVACION = 'OK'";

        //echo $sql;

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function cargarProcesoMensualIssa($p_proceso, $p_tipo, $p_cod_emp, $rowini, $rowter)
    {
        /*AND PRO.estado = 'TERMINADO' */
        $sql = 'SELECT 
                    "mes_impacto", 
                    "fecha_creacion", 
                    "tipo", "rut", "nombre", 
                    "cod_cc", "nom_cc", 
                    "cod_cargo", 
                    "nom_cargo", "fecha_ingreso", 
                    "tipo_contrato","jornada", "cod_sindicato", "nom_sindicato", 
                    "cod_adherido", "nom_adherido", "cod_concepto","nom_concepto",
                    "valor",
                    "cod_emp"
                FROM(
                    SELECT "mes_impacto", 
                        "fecha_creacion", 
                        "tipo", "rut", "nombre", 
                        "cod_cc", "nom_cc", 
                        "cod_cargo", 
                        "nom_cargo", "fecha_ingreso", 
                        "tipo_contrato","jornada", "cod_sindicato", "nom_sindicato", 
                        "cod_adherido", "nom_adherido", "cod_concepto","nom_concepto",
                        "valor",
                        "cod_emp", ROWNUM FILA 
                    FROM(
                        SELECT 
                                to_char(to_date(con.PFK_PROCESO,' . "'yyyy/mm'), 'mm-yyyy')" . ' as "mes_impacto",' .
            "to_char(CON.FECHA_CREACION, 'dd-mm-yyyy')" . ' as "fecha_creacion",' .
            'con.pfk_tipo as "tipo",' .
            'case SUBSTR(pfk_rut,0,1) when ' . "'0'" . ' then SUBSTR(pfk_rut,2,LENGTH(pfk_rut)) else pfk_rut end as "rut",
                                PER.NOMBRE as "nombre", 
                                PER.PFK_COD_CC as "cod_cc", 
                                PER.NOM_CC as "nom_cc",
                                PER.COD_CARGO as "cod_cargo",
                                PER.NOM_CARGO as "nom_cargo",' .
            "to_char(PER.FECHA_INGRESO, 'dd-mm-yyyy')" . ' as "fecha_ingreso",' .
            'nvl(PER.TIPO_CONTRATO, ' . "'%null%'" . ') as "tipo_contrato",
                                nvl(PER.JORNADA, ' . "'%null%'" . ') as "jornada",
                                nvl(PER.COD_SINDICATO, ' . "'%null%'" . ') as "cod_sindicato", 
                                nvl(PER.NOM_SINDICATO, ' . "'%null%'" . ') as "nom_sindicato", 
                                nvl(PER.COD_ADHERIDO, ' . "'%null%'" . ') as "cod_adherido",
                                nvl(PER.NOM_ADHERIDO, ' . "'%null%'" . ') as "nom_adherido",
                                nvl(CON.pfk_cod_concepto, ' . "'%null%'" . ') as "cod_concepto",   
                                nvl(CON.NOM_CONCEPTO, ' . "'%null%'" . ') as "nom_concepto",
                                nvl(CON.valor, 0) as "valor",
                                nvl(con.PFK_COD_EMP, ' . "'%null%'" . ') as "cod_emp"
                        FROM NOV_PROC_MENSUAl_conceptos con, 
                            NOV_PROC_MENSUAL_PERSONS PER,
                            NOV_PROC_MENSUAL_CC CC,
                            NOV_PROC_MENSUAL PRO
                        WHERE PRO.PK_PROCESO = CC.PFK_PROCESO
                        AND PRO.PK_TIPO = CC.PFK_TIPO
                        AND PRO.PFK_COD_EMP = CC.PFK_COD_EMP
                        AND CC.PFK_PROCESO = PER.PFK_PROCESO
                        AND CC.PFK_TIPO = PER.PFK_TIPO
                        AND CC.PFK_COD_EMP = PER.PFK_COD_EMP
                        AND cc.pk_cod_cc = PER.PFK_COD_CC
                        AND CON.PFK_PROCESO = PER.PFK_PROCESO
                        AND CON.PFK_TIPO = PER.PFK_TIPO
                        AND CON.PFK_COD_EMP = PER.PFK_COD_EMP
                        AND CON.PFK_COD_CC = PER.PFK_COD_CC
                        AND CON.PFK_RUT = PER.PK_RUT
                        AND CON.PFK_COD_EMP =' . "'" . $p_cod_emp . "'
                        AND CON.PFK_PROCESO = '$p_proceso'
                        AND CON.PFK_TIPO = '$p_tipo'
                        AND CON.VALOR <> 0
                        AND (CON.estado_enviado is null
                        OR CON.estado_enviado <> 'OK') ";

        $sql .= '
                        UNION
                        SELECT 
                            to_char(to_date(con.PFK_PROCESO,' . "'yyyy/mm'), 'mm-yyyy')" . ' as "mes_impacto",' .
            "to_char(CON.FECHA_CREACION, 'dd-mm-yyyy')" . ' as "fecha_creacion",' .
            'con.pfk_tipo as "tipo",' .
            'case SUBSTR(pfk_rut,0,1) when ' . "'0'" . ' then SUBSTR(pfk_rut,2,LENGTH(pfk_rut)) else pfk_rut end as "rut",
                            PER.NOMBRE as "nombre", 
                            PER.PFK_COD_CC as "cod_cc", 
                            PER.NOM_CC as "nom_cc",
                            PER.COD_CARGO as "cod_cargo",
                            PER.NOM_CARGO as "nom_cargo",' .
            "to_char(PER.FECHA_INGRESO, 'dd-mm-yyyy')" . ' as "fecha_ingreso",' .
            'nvl(PER.TIPO_CONTRATO, ' . "'%null%'" . ') as "tipo_contrato",
                            nvl(PER.JORNADA, ' . "'%null%'" . ') as "jornada",
                            nvl(PER.COD_SINDICATO, ' . "'%null%'" . ') as "cod_sindicato", 
                            nvl(PER.NOM_SINDICATO, ' . "'%null%'" . ') as "nom_sindicato", 
                            nvl(PER.COD_ADHERIDO, ' . "'%null%'" . ') as "cod_adherido",
                            nvl(PER.NOM_ADHERIDO, ' . "'%null%'" . ') as "nom_adherido",
                            nvl(CON.pfk_cod_concepto, ' . "'%null%'" . ') as "cod_concepto",   
                            nvl(CON.NOM_CONCEPTO, ' . "'%null%'" . ') as "nom_concepto",
                            nvl(CON.valor, 0) as "valor",
                            nvl(con.PFK_COD_EMP, ' . "'%null%'" . ') as "cod_emp"
                        FROM NOV_PROC_MENSUAl_conceptos con, 
                            NOV_PROC_MENSUAL_PERSONS PER,
                            NOV_PROC_MENSUAL_CC CC,
                            NOV_PROC_MENSUAL PRO,
                            NOV_CONCEPTOS CO
                        WHERE PRO.PK_PROCESO = CC.PFK_PROCESO
                        AND PRO.PK_TIPO = CC.PFK_TIPO
                        AND PRO.PFK_COD_EMP = CC.PFK_COD_EMP
                        AND CC.PFK_PROCESO = PER.PFK_PROCESO
                        AND CC.PFK_TIPO = PER.PFK_TIPO
                        AND CC.PFK_COD_EMP = PER.PFK_COD_EMP
                        AND cc.pk_cod_cc = PER.PFK_COD_CC
                        AND CON.PFK_PROCESO = PER.PFK_PROCESO
                        AND CON.PFK_TIPO = PER.PFK_TIPO
                        AND CON.PFK_COD_EMP = PER.PFK_COD_EMP
                        AND CON.PFK_COD_CC = PER.PFK_COD_CC
                        AND CON.PFK_RUT = PER.PK_RUT
                        AND con.pfk_cod_concepto = co.pk_cod_concepto
                        AND CON.PFK_COD_EMP = CO.PFK_COD_EMP
                        AND CON.PFK_COD_EMP =' . "'" . $p_cod_emp . "'
                        AND CON.PFK_PROCESO = '$p_proceso'
                        AND CON.PFK_TIPO = '$p_tipo'
                        AND CON.VALOR = 0
                        AND CO.NO_CERO = '0'
                        AND (CON.estado_enviado is null
                        OR CON.estado_enviado <> 'OK')
                    )
                    " . 'ORDER BY "rut", "cod_concepto"' .
            ")
                WHERE FILA >= $rowini
                AND FILA <= $rowter ";

        $query = $this->db->query($sql);
        return $query->result_array();
    }




    public function actualizarEstadoRegistros($items, $tipo, $id)
    {

        $res = $this->db->update_batch($tipo, $items, $id);

        return $res;
    }

    public function guardarLogEjecucion($p_usuario, $p_tipo, $p_respuesta, $p_observacion, $p_cant_enviados, $p_cant_respuesta)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
            $this->db->conn_id,
            "BEGIN NOV_INS_LOG_ENVIO_ISSA(
                        :p_usuario,
                        :p_tipo,
                        :p_respuesta,
                        :p_observacion,
                        :p_cant_enviados,
                        :p_cant_respuesta,
                        :r_est,
                        :r_msg);END;"
        );

        oci_bind_by_name($proc, "p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc, "p_tipo", $p_tipo, 100, SQLT_CHR);
        oci_bind_by_name($proc, "p_respuesta", $p_respuesta, 2000, SQLT_CHR);
        oci_bind_by_name($proc, "p_observacion", $p_observacion, 1000, SQLT_CHR);
        oci_bind_by_name($proc, "p_cant_enviados", $p_cant_enviados);
        oci_bind_by_name($proc, "p_cant_respuesta", $p_cant_respuesta);
        oci_bind_by_name($proc, "r_est", $r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc, "r_msg", $r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }

    public function guardarLogPMEjecucion(
        $p_usuario,
        $p_proceso,
        $p_tipo,
        $p_cod_emp,
        $p_total,
        $p_inicio,
        $p_termino,
        $p_respuesta,
        $p_observacion,
        $p_cant_enviados,
        $p_cant_respuesta
    ) {

        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
            $this->db->conn_id,
            "BEGIN NOV_INS_LOG_PM_ENVIO_ISSA(
                        :p_usuario,
                        :p_proceso,
                        :p_tipo,
                        :p_cod_emp,
                        :p_total,
                        :p_inicio,
                        :p_termino,
                        :p_respuesta,
                        :p_observacion,
                        :p_cant_enviados,
                        :p_cant_respuesta,
                        :r_est,
                        :r_msg);END;"
        );

        oci_bind_by_name($proc, "p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc, "p_proceso", $p_proceso, 20, SQLT_CHR);
        oci_bind_by_name($proc, "p_tipo", $p_tipo, 20, SQLT_CHR);
        oci_bind_by_name($proc, "p_cod_emp", $p_cod_emp, 20, SQLT_CHR);
        oci_bind_by_name($proc, "p_total", $p_total);
        oci_bind_by_name($proc, "p_inicio", $p_inicio);
        oci_bind_by_name($proc, "p_termino", $p_termino);
        oci_bind_by_name($proc, "p_respuesta", $p_respuesta, 2000, SQLT_CHR);
        oci_bind_by_name($proc, "p_observacion", $p_observacion, 1000, SQLT_CHR);
        oci_bind_by_name($proc, "p_cant_enviados", $p_cant_enviados);
        oci_bind_by_name($proc, "p_cant_respuesta", $p_cant_respuesta);
        oci_bind_by_name($proc, "r_est", $r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc, "r_msg", $r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }


    public function update_batch_custom($table_name, $data, $indexes)
    {
        if (empty($data) || empty($indexes)) {
            return 'Data or indexes must not be empty';
        }

        $sql = 'UPDATE ' . $table_name . ' SET ' . "";

        //columns on which is done actual update
        $columns = [];
        foreach ($data[0] as $key => $value) {
            if (!in_array($key, $indexes)) {
                $columns[] = $key;
            }
        }

        /*
         * forming WHEN .. THEN sql parts and WHERE condition
         */
        $parts = [];
        $where = [];
        foreach ($data as $row) {
            foreach ($columns as $column) {
                $sql_part = ' WHEN (';
                foreach ($indexes as $index) {
                    $sql_part .=  $index . "= '" . $row[$index] . "' AND ";
                    $where[$index][] = $row[$index];
                }

                $sql_part = substr($sql_part, 0, -4);
                $sql_part .= ") THEN '" . $row[$column] . "'";
                $parts[$column][] = $sql_part;
            }
        }

        /*
         * connecting WHEN .. THEN parts for each column to be updated
         */
        foreach ($columns as $column) {
            $sql .= $column . '= CASE ';
            foreach ($parts[$column] as  $sql_part) {
                $sql .= $sql_part;
            }
            $sql .= ' ELSE ' . $column . ' END,';
        }

        /*
         * adding WHERE part
         */
        $sql = substr($sql, 0, -1);
        $sql .= ' WHERE ';
        foreach ($indexes as $index) {
            if (count($where[$index]) > 0) {
                $unique_where = array_unique($where[$index]);
                $sql .= $index . " IN ('" . join(',', $unique_where) . "') AND ";
            }
        }

        $sql = substr($sql, 0, -4);
        $sql .= '';

        echo $sql;

        return $this->db->query($sql);
    }

    public function cargarConteoEnviosIssa()
    {
        $sql = "SELECT NOMBRE, CONTAR
                FROM nov_conteo_envios_issa_vw";

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function cargarHistorialEnviosIssa($desde, $hasta, $tipo)
    {

        $sql = "SELECT 
                    TO_CHAR(FECHA, 'DD-MM-YYYY HH24:MI:SS') FECHA,
                    TIPO,
                    RESPUESTA,
                    CANT_ENVIADOS,
                    CANT_RESPUESTA,
                    OBSERVACION,
                    USUARIO
                FROM nov_log_envio_issa
                WHERE 1 = 1 ";
        if (!empty($fecha)) {
            $sql .= "AND FECHA BETWEEN TO_DATE('$desde', 'YYYY/MM/DD') AND TO_DATE('$hasta 23:59', 'YYYY/MM/DD HH24:MI') ";
        } else {
            $sql .= "AND TO_CHAR(FECHA, 'YYYYMM') = TO_CHAR(SYSDATE, 'YYYYMM') ";
        }

        if (!empty($tipo)) {
            $sql .= "AND TIPO =  '$tipo' ";
        }
        $sql .= "ORDER BY FECHA DESC";

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function cargarHistorialPMEnviosIssa($proceso, $tipo, $codemp)
    {

        $sql = "SELECT TO_CHAR(FECHA, 'DD-MM-YYYY HH24:MI:SS') FECHA,
                    PROCESO,
                    TIPO,
                    COD_EMP,
                    INICIO INICIO_REGISTRO,
                    TERMINO TERMINO_REGISTRO,
                    TOTAL_REGISTROS,
                    RESPUESTA,
                    CANT_RESPUESTA,
                    CANT_ENVIADOS,
                    OBSERVACION,
                    USUARIO
                FROM nov_log_envio_pm_issa
                WHERE 1 = 1 ";

        if (!empty($proceso)) {
            $sql .= "AND PROCESO =  '$proceso' ";
        }

        if (!empty($tipo)) {
            $sql .= "AND TIPO =  '$tipo' ";
        }

        if (!empty($codemp)) {
            $sql .= "AND COD_EMP =  '$codemp' ";
        }
        $sql .= "ORDER BY FECHA DESC";

        $query = $this->db->query($sql);
        return $query->result();
    }



    public function cargarConteoPMEnviosIssa($proceso, $tipo, $codemp)
    {

        $sql = "SELECT TO_CHAR(FECHA, 'DD-MM-YYYY HH24:MI:SS') FECHA,
                    PROCESO,
                    TIPO,
                    COD_EMP,
                    TOTAL_REGISTROS,
                    INICIO,
                    TERMINO,
                    RESPUESTA,
                    OBSERVACION,
                    CANT_RESPUESTA,
                    CANT_ENVIADOS,
                    USUARIO,
                    ESTADO
                FROM NOV_PM_ENVIOS_ISSA_VW
                WHERE 1 = 1 ";
        if (!empty($periodo)) {
            $sql .= "AND PROCESO = '$proceso' ";
        }

        if (!empty($tipo)) {
            $sql .= "AND TIPO =  '$tipo' ";
        }

        if (!empty($codemp)) {
            $sql .= "AND COD_EMP =  '$codemp' ";
        }
        $sql .= "ORDER BY PROCESO DESC, COD_EMP ASC, TIPO ASC";

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function guardarAsiSolIssa(
        $P_RUT,
        $P_PERIODO,
        $P_NOMBRE,
        $P_DESDE,
        $P_HASTA,
        $P_HORAS_EXTRAS,
        $P_HORAS_EMERGENCIA,
        $P_HORAS_NOCTURNAS,
        $P_HORAS_COMP_TURNO,
        $P_DESC_COMP_FERIADO,
        $P_DESC_COMP_LEGAL,
        $P_COLACION,
        $P_VIATICO,
        $P_FALTA,
        $P_USUARIO
    ) {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
            $this->db->conn_id,
            "BEGIN NOV_INS_ASIS_SOL_ISSA(
                            :P_RUT,
                            :P_PERIODO,
                            :P_NOMBRE,
                            :P_DESDE,
                            :P_HASTA,
                            :P_HORAS_EXTRAS,
                            :P_HORAS_EMERGENCIA,
                            :P_HORAS_NOCTURNAS,
                            :P_HORAS_COMP_TURNO,
                            :P_DESC_COMP_FERIADO,
                            :P_DESC_COMP_LEGAL,
                            :P_COLACION,
                            :P_VIATICO,
                            :P_FALTA,
                            :P_USUARIO,
                            :r_est,
                            :r_msg);END;"
        );

        oci_bind_by_name($proc, "P_RUT", $P_RUT, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_PERIODO", $P_PERIODO, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_NOMBRE", $P_NOMBRE, 200, SQLT_CHR);
        oci_bind_by_name($proc, "P_DESDE", $P_DESDE, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_HASTA", $P_HASTA, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_HORAS_EXTRAS", $P_HORAS_EXTRAS, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_HORAS_EMERGENCIA", $P_HORAS_EMERGENCIA, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_HORAS_NOCTURNAS", $P_HORAS_NOCTURNAS, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_HORAS_COMP_TURNO", $P_HORAS_COMP_TURNO, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_DESC_COMP_FERIADO", $P_DESC_COMP_FERIADO);
        oci_bind_by_name($proc, "P_DESC_COMP_LEGAL", $P_DESC_COMP_LEGAL);
        oci_bind_by_name($proc, "P_COLACION", $P_COLACION);
        oci_bind_by_name($proc, "P_VIATICO", $P_VIATICO);
        oci_bind_by_name($proc, "P_FALTA", $P_FALTA);
        oci_bind_by_name($proc, "P_USUARIO", $P_USUARIO);
        oci_bind_by_name($proc, "r_est", $r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc, "r_msg", $r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }

    public function eliminarAsiSolIssa(
        $P_PERIODO,
        $P_USUARIO
    ) {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
            $this->db->conn_id,
            "BEGIN NOV_DEL_ASIS_SOL_ISSA(
                            :P_PERIODO,
                            :P_USUARIO,
                            :r_est,
                            :r_msg);END;"
        );

        oci_bind_by_name($proc, "P_PERIODO", $P_PERIODO, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_USUARIO", $P_USUARIO, 100, SQLT_CHR);
        oci_bind_by_name($proc, "r_est", $r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc, "r_msg", $r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }


    public function guardarLogAsiSolIssa(
        $P_PERIODO,
        $P_OBSERVACION,
        $P_USUARIO,
        $P_ERROR,
        $P_CANT_INI,
        $P_CANT_FIN
    ) {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
            $this->db->conn_id,
            "BEGIN NOV_INS_LOG_ASIS_SOL_ISSA(
                          :P_PERIODO 
                        , :P_OBSERVACION 
                        , :P_USUARIO 
                        , :P_ERROR 
                        , :P_CANT_INI 
                        , :P_CANT_FIN
                        , :r_est
                        , :r_msg);END;"
        );

        oci_bind_by_name($proc, "P_PERIODO", $P_PERIODO, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_OBSERVACION", $P_OBSERVACION, 2000, SQLT_CHR);
        oci_bind_by_name($proc, "P_ERROR", $P_ERROR, 1000, SQLT_CHR);
        oci_bind_by_name($proc, "P_CANT_INI", $P_CANT_INI);
        oci_bind_by_name($proc, "P_CANT_FIN", $P_CANT_FIN);
        oci_bind_by_name($proc, "P_USUARIO", $P_USUARIO);
        oci_bind_by_name($proc, "r_est", $r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc, "r_msg", $r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }


    public function cargarAsisIssaNo($p_periodo, $p_cod_emp)
    {
        $sql = "SELECT DISTINCT 
                    PK_RUT,
                    PK_PERIODO,
                    NOMBRE,
                    DESDE,
                    HASTA,
                    to_number(SUBSTR(HORAS_EXTRAS,0,INSTR(HORAS_EXTRAS, ':')-1)) +  
                    to_number(SUBSTR(HORAS_EXTRAS,INSTR(HORAS_EXTRAS, ':')+1,4)/60) HORAS_EXTRAS_NUM,
                    
                    to_number(SUBSTR(HORAS_EMERGENCIA,0,INSTR(HORAS_EMERGENCIA, ':')-1)) +  
                    to_number(SUBSTR(HORAS_EMERGENCIA,INSTR(HORAS_EMERGENCIA, ':')+1,4)/60) HORAS_EMERGENCIA_NUM,
                    
                    to_number(SUBSTR(HORAS_NOCTURNAS,0,INSTR(HORAS_NOCTURNAS, ':')-1)) +  
                    to_number(SUBSTR(HORAS_NOCTURNAS,INSTR(HORAS_NOCTURNAS, ':')+1,4)/60) HORAS_NOCTURNAS_NUM,

                    to_number(SUBSTR(HORAS_COMP_TURNO,0,INSTR(HORAS_COMP_TURNO, ':')-1)) +  
                    to_number(SUBSTR(HORAS_COMP_TURNO,INSTR(HORAS_COMP_TURNO, ':')+1,4)/60) HORAS_COMP_TURNO_NUM,
                    HORAS_EXTRAS,
                    HORAS_EMERGENCIA,
                    HORAS_NOCTURNAS,
                    HORAS_COMP_TURNO,
                    DESC_COMP_FERIADO,
                    DESC_COMP_LEGAL,
                    COLACION,
                    VIATICO,
                    FALTA
                FROM nov_asis_sol_issa ASI
                WHERE replace(ASI.PK_PERIODO, '/', '') = replace('$p_periodo', '/', '')
                AND ASI.PK_RUT NOT IN (
                    SELECT ((case substr(PER.PK_rut, 0, 1) when '0' then substr(PER.PK_rut, 2) else PER.PK_rut end))
                    FROM NOV_PROC_MENSUAL_PERSONS PER
                    WHERE replace(pfk_proceso, '/', '') = replace('$p_periodo', '/', '')
                    AND pfk_tipo = 'PROCESO'
                    AND pfk_cod_emp = '$p_cod_emp'
                )
                ORDER BY ASI.PK_RUT";

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function cargarAsisIssa($p_periodo)
    {
        $sql = "SELECT DISTINCT PK_RUT,
                    PK_PERIODO,
                    NOMBRE,
                    DESDE,
                    HASTA,
                    to_number(SUBSTR(HORAS_EXTRAS,0,INSTR(HORAS_EXTRAS, ':')-1)) +  
                    to_number(SUBSTR(HORAS_EXTRAS,INSTR(HORAS_EXTRAS, ':')+1,4)/60) HORAS_EXTRAS_NUM,
                    
                    to_number(SUBSTR(HORAS_EMERGENCIA,0,INSTR(HORAS_EMERGENCIA, ':')-1)) +  
                    to_number(SUBSTR(HORAS_EMERGENCIA,INSTR(HORAS_EMERGENCIA, ':')+1,4)/60) HORAS_EMERGENCIA_NUM,
                    
                    to_number(SUBSTR(HORAS_NOCTURNAS,0,INSTR(HORAS_NOCTURNAS, ':')-1)) +  
                    to_number(SUBSTR(HORAS_NOCTURNAS,INSTR(HORAS_NOCTURNAS, ':')+1,4)/60) HORAS_NOCTURNAS_NUM,

                    to_number(SUBSTR(HORAS_COMP_TURNO,0,INSTR(HORAS_COMP_TURNO, ':')-1)) +  
                    to_number(SUBSTR(HORAS_COMP_TURNO,INSTR(HORAS_COMP_TURNO, ':')+1,4)/60) HORAS_COMP_TURNO_NUM,
                    HORAS_EXTRAS,
                    HORAS_EMERGENCIA,
                    HORAS_NOCTURNAS,
                    HORAS_COMP_TURNO,
                    DESC_COMP_FERIADO,
                    DESC_COMP_LEGAL,
                    COLACION,
                    VIATICO,
                    FALTA
                FROM nov_asis_sol_issa ASI
                WHERE replace(ASI.PK_PERIODO, '/', '') = replace('$p_periodo', '/', '')
                ORDER BY ASI.PK_RUT";

        $query = $this->db->query($sql);
        return $query->result();
    }


    public function cargarAsisIssaCon($p_cod_emp)
    {
        $sql = "SELECT COD_EMP,
                    COD_HORAS_EXTRAS,
                    COD_HORAS_EMERGENCIA,
                    COD_HORAS_NOCTURNAS,
                    COD_HORAS_COMP_TURNO,
                    COD_DESC_COMP_FERIADO,
                    COD_DESC_COMP_LEGAL,
                    COD_COLACION,
                    COD_VIATICO,
                    COD_FALTA
                FROM nov_asis_sol_issa_con 
                WHERE COD_EMP = '$p_cod_emp' ";

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function cargarSeguimientAsisIssa()
    {
        $sql = "SELECT PRO.PK_PROCESO, PRO.PFK_COD_EMP, 
                NVL((
                    SELECT (CASE WHEN LOG.OBSERVACION||LOG.ERROR = 'FINALOK' THEN 'OK' ELSE LOG.ERROR END)
                    FROM NOV_LOG_ASIS_SOL_ISSA LOG, 
                    (
                        SELECT MAX(FECHA) FECHA, PERIODO
                        FROM NOV_LOG_ASIS_SOL_ISSA
                        GROUP BY PERIODO
                    ) MAX
                    WHERE MAX.FECHA = LOG.FECHA
                    AND MAX.PERIODO = LOG.PERIODO
                    AND MAX.PERIODO = REPLACE(PRO.PK_PROCESO, '/', '')
                ), 'NO EXISTE') CARGAR_DATA,
                NVL((
                    SELECT LOG.OBSERVACION
                    FROM NOV_ASIS_SOL_ISSA_PROCESO LOG, 
                    (
                        SELECT MAX(FECHA) FECHA, PERIODO
                        FROM NOV_ASIS_SOL_ISSA_PROCESO
                        GROUP BY PERIODO
                    ) MAX
                    WHERE MAX.FECHA = LOG.FECHA
                    AND MAX.PERIODO = LOG.PERIODO
                    AND MAX.PERIODO = REPLACE(PRO.PK_PROCESO, '/', '')
                ), 'NO EXISTE') IMPORTAR_PROCESO
                FROM nov_proc_mensual PRO
                WHERE PK_TIPO = 'PROCESO'
                AND PFK_COD_EMP = '097'
                ORDER BY PRO.PK_PROCESO DESC ";

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function importarAsiSolIssaProceso(
        $P_PERIODO,
        $P_COD_EMP,
        $P_USUARIO
    ) {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
            $this->db->conn_id,
            "BEGIN NOV_INS_ASIS_SOL_ISSA_PROC(
                        :P_PERIODO 
                      , :P_COD_EMP
                      , :P_USUARIO 
                      , :r_est
                      , :r_msg);END;"
        );

        oci_bind_by_name($proc, "P_PERIODO", $P_PERIODO, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_COD_EMP", $P_COD_EMP, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_USUARIO", $P_USUARIO);
        oci_bind_by_name($proc, "r_est", $r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc, "r_msg", $r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }

    public function validarPeriodoAsisSolProc($periodo)
    {
        $sql = "SELECT pro.*
            FROM NOV_ASIS_SOL_ISSA_PROCESO pro, (
                    SELECT MAX(FECHA) FECHA, PERIODO
                    FROM NOV_ASIS_SOL_ISSA_PROCESO
                    GROUP BY PERIODO
                ) MAX
            WHERE MAX.FECHA = pro.FECHA
            AND MAX.PERIODO = pro.PERIODO
            AND pro.PERIODO = case when instr(REPLACE('$periodo', '/', ''), '01') > 0 then 
                    TO_NUMBER(REPLACE('$periodo', '/', ''))-96 
                    ELSE TO_NUMBER(REPLACE('$periodo', '/', ''))-1 END";

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function borrarDotacionIssa() {
    
        $this->db->query("DELETE FROM NOV_DOTACION_ISSA");

        return TRUE; 
    }


    public function guardarDotacionIssa($data)
    {

        $res = $this->db->insert_batch('NOV_DOTACION_ISSA', $data);


        if ($res) {
            return TRUE;
        } else {
            return FALSE;
        }
    }

    public function crearLogDotacionIssa($p_fecha, $p_usuario, $p_observacion) {
    
        $this->db->query(
            "INSERT INTO NOV_LOG_DOTACION_ISSA(
                FECHA,
                USUARIO,
                OBSERVACION,
                FECHA_CREACION) 
            VALUES(
                to_date('$p_fecha', 'dd-mm-yyyy'), 
                '$p_usuario', 
                '$p_observacion', 
                SYSDATE)");
        return TRUE; 
    }

    public function cargarCountDifDotacion()
    {
        $sql = "SELECT 'GERENCIA' TIPO, COUNT(*) CONTAR
                FROM NOV_PERSONAL PER, NOV_DOTACION_ISSA DOT
                WHERE per.num_rut = DOT.CODIGO
                AND PER.FECHA_BAJA IS NULL
                AND per.cod_gerencia <> dot.gerencia
                UNION ALL
                SELECT 'DEPARTAMENTO' TIPO, COUNT(*) CONTAR
                FROM NOV_PERSONAL PER, NOV_DOTACION_ISSA DOT
                WHERE per.num_rut = DOT.CODIGO
                AND PER.FECHA_BAJA IS NULL
                AND per.cod_departamento <> dot.departamento
                UNION ALL
                SELECT 'CENTRO DE COSTO' TIPO, COUNT(*) CONTAR
                FROM NOV_PERSONAL PER, NOV_DOTACION_ISSA DOT
                WHERE per.num_rut = DOT.CODIGO
                AND PER.FECHA_BAJA IS NULL
                AND per.cod_cc <> dot.cc
                UNION ALL
                SELECT 'CARGO' TIPO, COUNT(*) CONTAR
                FROM NOV_PERSONAL PER, NOV_DOTACION_ISSA DOT
                WHERE per.num_rut = DOT.CODIGO
                AND PER.FECHA_BAJA IS NULL
                AND PER.COD_CARGO <> REPLACE(REPLACE(DOT.CARGO, 'F', ''), 'T', '')
                UNION ALL
                SELECT 'SUPERVISOR' TIPO, COUNT(*) CONTAR
                FROM NOV_PERSONAL PER, NOV_DOTACION_ISSA DOT
                WHERE per.num_rut = DOT.CODIGO
                AND PER.FECHA_BAJA IS NULL
                AND per.rut_supervisor <> DOT.SUPERVISOR
                UNION ALL
                SELECT 'FECHA_ALTA' TIPO, COUNT(*) CONTAR
                FROM NOV_PERSONAL PER, NOV_DOTACION_ISSA DOT
                WHERE per.num_rut = DOT.CODIGO
                AND PER.FECHA_BAJA IS NULL
                AND TO_CHAR(per.fecha_ingreso, 'DD-MM-YYYY') <> dot.fecha_alta
                UNION ALL
                SELECT 'COMUNA' TIPO, COUNT(*) CONTAR
                FROM NOV_PERSONAL PER, NOV_DOTACION_ISSA DOT
                WHERE per.num_rut = DOT.CODIGO
                AND PER.FECHA_BAJA IS NULL
                AND UPPER(per.cod_COMUNA) <> UPPER(dot.cod_COMUNA)
                UNION ALL
                SELECT 'CIUDAD' TIPO, COUNT(*) CONTAR
                FROM NOV_PERSONAL PER, NOV_DOTACION_ISSA DOT
                WHERE per.num_rut = DOT.CODIGO
                AND PER.FECHA_BAJA IS NULL
                AND UPPER(per.CIUDAD) <> UPPER(dot.CIUDAD)
                UNION ALL
                SELECT 'SEXO' TIPO, COUNT(*) CONTAR
                FROM NOV_PERSONAL PER, NOV_DOTACION_ISSA DOT
                WHERE per.num_rut = DOT.CODIGO
                AND PER.FECHA_BAJA IS NULL
                AND UPPER(per.cod_SEXO) <> UPPER(dot.cod_SEXO)
                UNION ALL
                SELECT 'FECHA_NACIMIENTO' TIPO, COUNT(*) CONTAR
                FROM NOV_PERSONAL PER, NOV_DOTACION_ISSA DOT
                WHERE per.num_rut = DOT.CODIGO
                AND PER.FECHA_BAJA IS NULL
                AND TO_CHAR(per.fecha_nac, 'DD-MM-YYYY') <> dot.FECHANACIMIENTO
                UNION ALL
                SELECT 'NACIONALIDAD' TIPO, COUNT(*) CONTAR
                FROM NOV_PERSONAL PER, NOV_DOTACION_ISSA DOT
                WHERE per.num_rut = DOT.CODIGO
                AND PER.FECHA_BAJA IS NULL
                AND UPPER(per.cod_pais) <> UPPER(dot.cod_NACIONALIDAD)
                UNION ALL
                SELECT 'ESTADO_CIVIL' TIPO, COUNT(*) CONTAR
                FROM NOV_PERSONAL PER, NOV_DOTACION_ISSA DOT
                WHERE per.num_rut = DOT.CODIGO
                AND PER.FECHA_BAJA IS NULL
                AND UPPER(per.cod_est_civil) <> UPPER(dot.COD_ESTADOCIVIL)
                UNION ALL
                SELECT 'FORMA_PAGO' TIPO, COUNT(*) CONTAR
                FROM NOV_PERSONAL PER, NOV_DOTACION_ISSA DOT
                WHERE per.num_rut = DOT.CODIGO
                AND PER.FECHA_BAJA IS NULL
                AND UPPER(per.cod_forma_pago) <> UPPER(dot.COD_FORMAPAGO)
                UNION ALL
                SELECT 'NOM_BANCO' TIPO, COUNT(*) CONTAR
                FROM NOV_PERSONAL PER, NOV_DOTACION_ISSA DOT
                WHERE per.num_rut = DOT.CODIGO
                AND PER.FECHA_BAJA IS NULL
                AND UPPER(per.cod_banco) <> UPPER(dot.COD_BANCO)
                UNION ALL
                SELECT 'NUMERO_CUENTA' TIPO, COUNT(*) CONTAR
                FROM NOV_PERSONAL PER, NOV_DOTACION_ISSA DOT
                WHERE per.num_rut = DOT.CODIGO
                AND PER.FECHA_BAJA IS NULL
                AND UPPER(per.num_cuenta) <> UPPER(dot.NUMEROCUENTA)
                UNION ALL
                SELECT 'AFP' TIPO, COUNT(*) CONTAR
                FROM NOV_PERSONAL PER, NOV_DOTACION_ISSA DOT
                WHERE per.num_rut = DOT.CODIGO
                AND PER.FECHA_BAJA IS NULL
                AND UPPER(per.COD_AFP) <> UPPER(dot.INSTITUCIÓN_AFP)
                UNION ALL
                SELECT 'SALUD' TIPO, COUNT(*) CONTAR
                FROM NOV_PERSONAL PER, NOV_DOTACION_ISSA DOT
                WHERE per.num_rut = DOT.CODIGO
                AND PER.FECHA_BAJA IS NULL
                AND UPPER(per.cod_salud) <> UPPER(dot.SALUD)
                UNION ALL
                SELECT 'TIPO_CONTRATO' TIPO, COUNT(*) CONTAR
                FROM NOV_PERSONAL PER, NOV_DOTACION_ISSA DOT
                WHERE per.num_rut = DOT.CODIGO
                AND PER.FECHA_BAJA IS NULL
                AND UPPER(per.cod_tipo_contrato) <> UPPER(dot.Tipo_Contrato)
                UNION ALL
                SELECT 'SINDICATO' TIPO, COUNT(*) CONTAR
                FROM NOV_PERSONAL PER, NOV_DOTACION_ISSA DOT
                WHERE per.num_rut = DOT.CODIGO
                AND PER.FECHA_BAJA IS NULL
                AND UPPER(per.cod_sindicato) <> UPPER(dot.SINDICATO)
                UNION ALL
                SELECT 'SUELDO_BASE' TIPO, COUNT(*) CONTAR
                FROM NOV_PERSONAL PER, NOV_DOTACION_ISSA DOT
                WHERE per.num_rut = DOT.CODIGO
                AND PER.FECHA_BAJA IS NULL
                AND TO_NUMBER(NVL(per.salario_base, '0')) <> TO_NUMBER(NVL(REPLACE(dot.SUELDO_BASE, '.00', ''), '0'))
                UNION ALL
                SELECT 'CORREO_EMP' TIPO, COUNT(*) CONTAR
                FROM NOV_PERSONAL PER, NOV_DOTACION_ISSA DOT
                WHERE per.num_rut = DOT.CODIGO
                AND PER.FECHA_BAJA IS NULL
                AND UPPER(per.CORREO_EMP) <> UPPER(dot.MAIL)
                UNION ALL
                SELECT 'CORREO' TIPO, COUNT(*) CONTAR
                FROM NOV_PERSONAL PER, NOV_DOTACION_ISSA DOT
                WHERE per.num_rut = DOT.CODIGO
                AND PER.FECHA_BAJA IS NULL
                AND UPPER(per.CORREO) <> UPPER(dot.EMAIL_PERSONAL)
                UNION ALL
                SELECT 'CELULAR' TIPO, COUNT(*) CONTAR
                FROM NOV_PERSONAL PER, NOV_DOTACION_ISSA DOT
                WHERE per.num_rut = DOT.CODIGO
                AND PER.FECHA_BAJA IS NULL
                AND UPPER(per.TELEFONO) <> UPPER(dot.fono)";

        $query = $this->db->query($sql);
        return $query->result();
    }


    public function cargarUltimoLogDotacionIssa()
    {
        $sql = "SELECT TO_CHAR(FECHA, 'DD-MM-YYYY') FECHA,
                        USUARIO,
                        OBSERVACION,
                        TO_CHAR(FECHA_CREACION, 'DD-MM-YYYY') FECHA_CREACION
                FROM NOV_LOG_DOTACION_ISSA
                WHERE ROWNUM = 1
                order by FECHA_CREACION DESC";

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function cargarDotacionesIssa()
    {
        $sql = "SELECT *
                FROM NOV_DOTACION_ISSA ";

        $query = $this->db->query($sql);
        return $query->result();
    }


    public function cargarDotacionIssaPorTipo($p_fuente, $p_tipo){

        $select = "";
        $where = "";
        if($p_fuente == 'ISSA') {
            $select = "DOT.*";
        }else{
            $select = "PER.*";
        }
        
        switch($p_tipo) {
            case "GERENCIA":
                $where = "per.cod_gerencia <> dot.gerencia";
                break;
            case "DEPARTAMENTO":
                $where = "per.cod_departamento <> dot.departamento";
                break;
            case "CENTRO DE COSTO":
                $where = "per.cod_cc <> dot.cc";
                break;
            case "CARGO":
                $where = "PER.COD_CARGO <> REPLACE(REPLACE(DOT.CARGO, 'F', ''), 'T', '')";
                break;
            case "SUPERVISOR":
                $where = "per.rut_supervisor <> DOT.SUPERVISOR";
                break;
            case "FECHA_ALTA":
                $where = "TO_CHAR(per.fecha_ingreso, 'DD-MM-YYYY') <> dot.fecha_alta";
                break;
            case "COMUNA":
                $where = "UPPER(per.COD_COMUNA) <> UPPER(dot.COD_COMUNA)";
                break;
            case "CIUDAD":
                $where = "UPPER(per.CIUDAD) <> UPPER(dot.CIUDAD)";
                break;
            case "SEXO":
                $where = "UPPER(per.COD_SEXO) <> UPPER(dot.COD_SEXO)";
                break;
            case "FECHA_NACIMIENTO":
                $where = "TO_CHAR(per.fecha_nac, 'DD-MM-YYYY') <> dot.FECHANACIMIENTO";
                break;
            case "NACIONALIDAD":
                $where = "UPPER(per.cod_pais) <> UPPER(dot.COD_NACIONALIDAD)";
                break;
            case "ESTADO_CIVIL":
                $where = "UPPER(per.cod_est_civil) <> UPPER(dot.COD_ESTADOCIVIL)";
                break;
            case "FORMA_PAGO":
                $where = "UPPER(per.cod_forma_pago) <> UPPER(dot.COD_FORMAPAGO)";
                break;
            case "NOM_BANCO":
                $where = "UPPER(per.cod_banco) <> UPPER(dot.cod_BANCO)";
                break;
            case "NUMERO_CUENTA":
                $where = "UPPER(per.num_cuenta) <> UPPER(dot.NUMEROCUENTA)";
                break;
            case "AFP":
                $where = "UPPER(per.COD_AFP) <> UPPER(dot.INSTITUCIÓN_AFP)";
                break;
            case "SALUD":
                $where = "UPPER(per.cod_salud) <> UPPER(dot.SALUD)";
                break;
            case "TIPO_CONTRATO":
                $where = "UPPER(per.cod_tipo_contrato) <> UPPER(dot.Tipo_Contrato)";
                break;
            case "SINDICATO":
                $where = "UPPER(per.cod_sindicato) <> UPPER(dot.SINDICATO)";
                break;
            case "SUELDO_BASE":
                $where = "TO_NUMBER(NVL(per.salario_base, '0')) <> TO_NUMBER(NVL(REPLACE(dot.SUELDO_BASE, '.00', ''), '0'))";
                break;
            case "CORREO_EMP":
                $where = "UPPER(per.CORREO_EMP) <> UPPER(dot.MAIL)";
                break;
            case "CORREO":
                $where = "UPPER(per.CORREO) <> UPPER(dot.EMAIL_PERSONAL)";
                break;
            case "CELULAR":
                $where = "UPPER(per.TELEFONO) <> UPPER(dot.fono)";
                break;
        }

        $sql = "SELECT @select@
                FROM NOV_PERSONAL PER, NOV_DOTACION_ISSA DOT
                WHERE per.num_rut = DOT.CODIGO
                AND PER.FECHA_BAJA IS NULL
                AND @where@";

        $sql = str_replace("@select@",$select, $sql);
        $sql = str_replace("@where@",$where, $sql);
        
        $query = $this->db->query($sql);
        return $query->result();
    }
    
    public function cargarUltimoLogAusentismo($tipo)
    {
        $sql = "SELECT 
                    TO_CHAR(FECHA, 'DD-MM-YYYY') FECHA,
                    USUARIO,
                    TIPO,
                    RESPUESTA,
                    OBSERVACION,
                    TO_CHAR(FECHA_CREACION, 'DD-MM-YYYY') FECHA_CREACION,
                    TO_CHAR((FECHA_CREACION - 7), 'DD-MM-YYYY') FECHA_EJECUTAR,
                    ID
                FROM NOV_LOG_AUSENTISMO_ISSA 
                WHERE TIPO = '$tipo' 
                AND ROWNUM = 1
                ORDER BY ID DESC";

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function cargarSeqAusentismo()
    {
        $sql = "SELECT SEQ_NOV_AUSENTISMO_ISSA.NEXTVAL SEQUENCIA
                FROM DUAL ";

        $query = $this->db->query($sql);
        return $query->result();
    }


    public function guardarAusentismoIssa($tipo, $data)
    {
        switch($tipo) {
            case 'LICENCIA':    
                $res = $this->db->insert_batch('NOV_LICENCIAS_ISSA', $data);
                break;
            case 'PERMISO':    
                $res = $this->db->insert_batch('NOV_PERMISOS_ISSA', $data);
                break;
            case 'VACACION':    
                $res = $this->db->insert_batch('NOV_VACACIONES_ISSA', $data);
                break;
        }

        if ($res) {
            return TRUE;
        } else {
            return FALSE;
        }
    }

    public function crearLogAusentismoIssa($p_id, $p_tipo, $p_fecha, $p_usuario, $p_observacion) {
    
        $this->db->query(
            "INSERT INTO NOV_LOG_AUSENTISMO_ISSA(
                FECHA,
                USUARIO,
                TIPO,
                RESPUESTA,
                OBSERVACION,
                FECHA_CREACION,
                ID) 
            VALUES(
                to_date('$p_fecha', 'dd-mm-yyyy'), 
                '$p_usuario', 
                '$p_tipo',
                '',
                '$p_observacion', 
                SYSDATE,
                $p_id)");
        return TRUE; 
    }


    public function eliminarDatosAusentismo() {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
            $this->db->conn_id,
            "BEGIN NOV_DEL_AUSENTISMO_ISSA(
                            :r_est,
                            :r_msg);END;"
        );

        oci_bind_by_name($proc, "r_est", $r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc, "r_msg", $r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }


    public function cargarAusentismosISSA($p_tipo, $p_fec1, $p_fec2, $p_rut) {
        switch($p_tipo) {
            case 'LICENCIA':
                $sql = $this->queryLicencia($p_fec1, $p_fec2, $p_rut);
                break;
            case 'PERMISO':
                $sql = $this->queryPermiso($p_fec1, $p_fec2, $p_rut);
                break;
            case 'VACACION':
                $sql = $this->queryVacacion($p_fec1, $p_fec2, $p_rut);
                break;
        }
        $query = $this->db->query($sql);
        return $query->result();
    }
    
    private function queryLicencia($p_fec1, $p_fec2, $p_rut) {
        $sql = "SELECT *
                FROM nov_licencias_issa
                WHERE (
                    TO_DATE(FECHAINGRESO, 'DD-MM-YYYY') BETWEEN TO_DATE('$p_fec1', 'DD-MM-YYYY') AND TO_DATE('$p_fec2', 'DD-MM-YYYY') OR
                    TO_DATE(FECHATERMINO, 'DD-MM-YYYY') BETWEEN TO_DATE('$p_fec1', 'DD-MM-YYYY') AND TO_DATE('$p_fec2', 'DD-MM-YYYY')
                ) ";
        if(!empty($p_rut)) {
            $sql.= "AND RUT LIKE('%$p_rut%') ";
        }
                
        $sql.= "ORDER BY ID_MAESTRO ASC, ID ASC";

        return $sql;
    }

    private function queryPermiso($p_fec1, $p_fec2, $p_rut) {
        $sql = "SELECT *
                FROM nov_permisos_issa
                WHERE (
                    TO_DATE(FECHA_INICIO, 'DD-MM-YYYY') BETWEEN TO_DATE('$p_fec1', 'DD-MM-YYYY') AND TO_DATE('$p_fec2', 'DD-MM-YYYY') OR
                    TO_DATE(FECHA_TERMINO, 'DD-MM-YYYY') BETWEEN TO_DATE('$p_fec1', 'DD-MM-YYYY') AND TO_DATE('$p_fec2', 'DD-MM-YYYY')
                ) ";
        if(!empty($p_rut)) {
            $sql.= "AND RUT LIKE('%$p_rut%') ";
        }
                
        $sql.= "ORDER BY ID_PERMISO ASC, ID ASC";

        return $sql;
    }

    private function queryVacacion($p_fec1, $p_fec2, $p_rut) {
        $sql = "SELECT *
                FROM nov_vacaciones_issa
                WHERE (
                    TO_DATE(FECHAINGRESO, 'DD-MM-YYYY') BETWEEN TO_DATE('$p_fec1', 'DD-MM-YYYY') AND TO_DATE('$p_fec2', 'DD-MM-YYYY') OR
                    TO_DATE(FECHATERMINO, 'DD-MM-YYYY') BETWEEN TO_DATE('$p_fec1', 'DD-MM-YYYY') AND TO_DATE('$p_fec2', 'DD-MM-YYYY')
                ) ";
        if(!empty($p_rut)) {
            $sql.= "AND RUT LIKE('%$p_rut%') ";
        }
                
        $sql.= "ORDER BY ID_MAESTRO ASC, ID ASC";

        return $sql;
    }
    
}
