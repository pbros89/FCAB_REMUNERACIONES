<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class IssaModel extends CI_Model {

    public function __construct() {
        parent::__construct();
        $this->load->database("BD_NOVEDADES");
    }

    public function cargarCambioAfpIssa() {
        $sql = 'SELECT 
                    PK_ID as "codigo",'.
                    "to_char(to_date(PERIODO, 'yyyy/mm'), 'mm-yyyy')".' as "mes_impacto",'.
                    "to_char(FECHA_CREACION, 'dd-mm-yyyy')".' as "fecha_creacion",'.
                    'case SUBSTR(rut,0,1) when '."'0'".' then SUBSTR(rut,2,LENGTH(rut)) else rut end as "rut",
                    NOMBRE as "nombre",
                    COD_TIPO_CAMBIO as "cod_tipo_cambio",
                    NOM_TIPO_CAMBIO as "nom_tipo_cambio",
                    nvl(COD_AFP, '."'%null%'".') as "cod_afp",
                    nvl(NOM_AFP, '."'%null%'".') as "nom_afp",
                    nvl(COD_APV, '."'%null%'".') as "cod_apv",
                    nvl(NOM_APV, '."'%null%'".') as "nom_apv",
                    nvl(MONTO, '."'0'".') as "monto",
                    nvl(TIPO_MONTO, '."'%null%'".') as "tipo_moneda",
                    nvl(OBSERVACION, '."'%null%'".') as "observacion",
                    nvl(FK_COD_EMP, '."'%null%'".') as "cod_emp"
                FROM NOV_CAMBIO_AFP CAM 
                WHERE periodo is not null
                AND (estado_enviado is null
                OR estado_enviado <>'." 'OK')
                AND estado = 'TERMINADO' 
                AND ROWNUM <= 200
                ORDER BY FECHA_CREACION asc";
                

        $query = $this->db->query($sql);
        return $query->result_array();
    }

    public function cargarFiniquitoIssa() {
        $sql = 'SELECT 
                    PK_FINIQUITO as "codigo",'.
                    "to_char(to_date(PERIODO, 'yyyy/mm'), 'mm-yyyy')".' as "mes_impacto",'.
                    "to_char(FECHA_CREACION, 'dd-mm-yyyy')".' as "fecha_creacion",'.
                    'case SUBSTR(rut,0,1) when '."'0'".' then SUBSTR(rut,2,LENGTH(rut)) else rut end as "rut",
                    NOMBRE as "nombre",
                    COD_CAUSAL as "cod_causal",
                    NOM_CAUSAL as "nom_causal",'.
                    "to_char(FECHA_BAJA, 'dd-mm-yyyy')".' as "fecha_baja",'.
                    'nvl(OBSERVACION, '."'%null%'".') as "observacion",
                    nvl(FK_COD_EMP, '."'%null%'".') as "cod_emp"
                FROM NOV_FINIQUITOS  
                WHERE periodo is not null
                AND (estado_enviado is null
                OR estado_enviado <>'." 'OK')
                AND estado = 'TERMINADO' 
                AND ROWNUM <= 200
                ORDER BY FECHA_CREACION asc";
                

        $query = $this->db->query($sql);
        return $query->result_array();
    }

    public function cargarCambioCargoRentaIssa() {
        $sql = 'SELECT 
                    PK_ID as "codigo",'.
                    "to_char(to_date(PERIODO, 'yyyy/mm'), 'mm-yyyy')".' as "mes_impacto",'.
                    "to_char(FECHA_CREACION, 'dd-mm-yyyy')".' as "fecha_creacion",'.
                    'case SUBSTR(rut,0,1) when '."'0'".' then SUBSTR(rut,2,LENGTH(rut)) else rut end as "rut",
                    NOMBRE as "nombre",
                    COD_TIPO_CAMBIO as "cod_tipo_cambio",
                    NOM_TIPO_CAMBIO as "nom_tipo_cambio",
                    nvl(COD_CC, '."'%null%'".') as "cod_cc",
                    nvl(NOM_CC, '."'%null%'".') as "nom_cc",
                    nvl(COD_CARGO, '."'%null%'".') as "cod_cargo",
                    nvl(NOM_CARGO, '."'%null%'".') as "nom_cargo",
                    nvl(COD_JORNADA, '."'%null%'".') as "cod_jornada",
                    nvl(NOM_JORNADA, '."'%null%'".') as "nom_jornada",
                    nvl(COD_TIPO_CONTRATO, '."'%null%'".') as "cod_tipo_contrato",
                    nvl(NOM_TIPO_CONTRATO, '."'%null%'".') as "nom_tipo_contrato",'.
                    "nvl(to_char(FECHA_FIN_CONTRATO, 'dd-mm-yyyy'), '%null%')".' as "fecha_fin_contrato",'.
                    'nvl(SUELDO_BASE, '."0".') as "sueldo_base",
                    nvl(OBSERVACION, '."'%null%'".') as "observacion",
                    nvl(FK_COD_EMP, '."'%null%'".') as "cod_emp"
                FROM NOV_CAMBIO_CARGO_RENTA CAM 
                WHERE periodo is not null
                AND (estado_enviado is null
                OR estado_enviado <>'." 'OK')
                AND estado = 'TERMINADO' 
                AND ROWNUM <= 200
                ORDER BY FECHA_CREACION asc";
                

        $query = $this->db->query($sql);
        return $query->result_array();
    }

    public function cargarCambioDepositoIssa() {
        $sql = 'SELECT 
                    PK_ID as "codigo",'.
                    "to_char(to_date(PERIODO, 'yyyy/mm'), 'mm-yyyy')".' as "mes_impacto",'.
                    "to_char(FECHA_CREACION, 'dd-mm-yyyy')".' as "fecha_creacion",'.
                    'case SUBSTR(rut,0,1) when '."'0'".' then SUBSTR(rut,2,LENGTH(rut)) else rut end as "rut",
                    NOMBRE as "nombre",
                    nvl(COD_FORMA_PAGO, '."'%null%'".') as "cod_forma_pago",
                    nvl(NOM_FORMA_PAGO, '."'%null%'".') as "nom_forma_pago",
                    nvl(COD_BANCO, '."'%null%'".') as "cod_banco",
                    nvl(NOM_BANCO, '."'%null%'".') as "nom_banco",
                    nvl(NUM_CUENTA, '."'%null%'".') as "num_cuenta",
                    USR_CREADOR as "usr_creador",
                    nvl(OBSERVACION, '."'%null%'".') as "observacion",
                    nvl(FK_COD_EMP, '."'%null%'".') as "cod_emp"
                FROM NOV_CAMBIO_DEPOSITO CAM 
                WHERE periodo is not null
                AND (estado_enviado is null
                OR estado_enviado <>'." 'OK')
                AND estado = 'TERMINADO' 
                AND ROWNUM <= 200
                ORDER BY FECHA_CREACION asc";
                

        $query = $this->db->query($sql);
        return $query->result_array();
    }

    public function cargarCambioSaludIssa() {
        $sql = 'SELECT 
                    PK_ID as "codigo",'.
                    "to_char(to_date(PERIODO, 'yyyy/mm'), 'mm-yyyy')".' as "mes_impacto",'.
                    "to_char(FECHA_CREACION, 'dd-mm-yyyy')".' as "fecha_creacion",'.
                    'case SUBSTR(rut,0,1) when '."'0'".' then SUBSTR(rut,2,LENGTH(rut)) else rut end as "rut",
                    NOMBRE as "nombre",
                    COD_TIPO_CAMBIO as "cod_tipo_cambio",
                    NOM_TIPO_CAMBIO as "nom_tipo_cambio",
                    nvl(COD_SALUD, '."'%null%'".') as "cod_salud",
                    nvl(NOM_SALUD, '."'%null%'".') as "nom_salud",
                    nvl(VALOR_PLAN, '."'0'".') as "valor_plan",
                    nvl(TIPO_PLAN, '."'%null%'".') as "tipo_plan",
                    nvl(VALOR_GES, '."'0'".') as "valor_ges",
                    nvl(TIPO_GES, '."'%null%'".') as "tipo_ges",
                    nvl(VALOR_ADI_TRA, '."'0'".') as "valor_adi_tra",
                    nvl(TIPO_ADI_TRA, '."'%null%'".') as "tipo_adi_tra",
                    nvl(VALOR_ADI_EMP, '."'0'".') as "valor_adi_emp",
                    nvl(TIPO_ADI_EMP, '."'%null%'".') as "tipo_adi_emp",
                    nvl(VALOR_CONVENIO, '."'0'".') as "valor_convenio",
                    nvl(TIPO_CONVENIO, '."'%null%'".') as "tipo_convenio",
                    nvl(OBSERVACION, '."'%null%'".') as "observacion",
                    nvl(FK_COD_EMP, '."'%null%'".') as "cod_emp"
                FROM NOV_CAMBIO_SALUD CAM 
                WHERE periodo is not null
                AND (estado_enviado is null
                OR estado_enviado <>'." 'OK')
                AND estado = 'TERMINADO' 
                AND ROWNUM <= 200
                ORDER BY FECHA_CREACION asc";
                

        $query = $this->db->query($sql);
        return $query->result_array();
    }

    public function cargarCambioSindicatoIssa() {
        $sql = 'SELECT 
                    PK_ID as "codigo",'.
                    "to_char(to_date(PERIODO, 'yyyy/mm'), 'mm-yyyy')".' as "mes_impacto",'.
                    "to_char(FECHA_CREACION, 'dd-mm-yyyy')".' as "fecha_creacion",'.
                    'case SUBSTR(rut,0,1) when '."'0'".' then SUBSTR(rut,2,LENGTH(rut)) else rut end as "rut",
                    NOMBRE as "nombre",
                    nvl(COD_TIPO_CAMBIO, '."'%null%'".') as "cod_tipo_cambio",
                    nvl(NOM_TIPO_CAMBIO, '."'%null%'".') as "nom_tipo_cambio",
                    nvl(COD_SINDICATO, '."'%null%'".') as "cod_sindicato",
                    nvl(NOM_SINDICATO, '."'%null%'".') as "nom_sindicato",
                    nvl(COD_ADHERENCIA, '."'%null%'".') as "cod_adherencia",
                    nvl(NOM_ADHERENCIA, '."'%null%'".') as "nom_adherencia",
                    nvl(OBSERVACION, '."'%null%'".') as "observacion",
                    nvl(FK_COD_EMP, '."'%null%'".') as "cod_emp"
                FROM NOV_CAMBIO_SINDICATO CAM 
                WHERE periodo is not null
                AND (estado_enviado is null
                OR estado_enviado <>'." 'OK')
                AND estado = 'TERMINADO' 
                AND ROWNUM <= 200
                ORDER BY FECHA_CREACION asc";
                

        $query = $this->db->query($sql);
        return $query->result_array();
    }

    public function cargarAusentismoIssa() {
        $sql = 'SELECT 
                    PK_ID as "codigo",'.
                    "to_char(to_date(PERIODO, 'yyyy/mm'), 'mm-yyyy')".' as "mes_impacto",'.
                    "to_char(FECHA_CREACION, 'dd-mm-yyyy')".' as "fecha_creacion",'.
                    'case SUBSTR(rut,0,1) when '."'0'".' then SUBSTR(rut,2,LENGTH(rut)) else rut end as "rut",
                    NOMBRE as "nombre",
                    TIPO as "tipo",
                    COD_AUSENTISMO as "cod_ausentismo",
                    NOMBRE_AUSENTISMO as "nombre_ausentismo",'.
                    "to_char(FECHA_INI, 'dd-mm-yyyy')".' as "fecha_ini",'.
                    "to_char(FECHA_FIN, 'dd-mm-yyyy')".' as "fecha_fin",'.
                    'CANTIDAD_DIAS as "cantidad_dias",
                    nvl(OBSERVACION, '."'%null%'".') as "observacion",
                    nvl(FK_COD_EMP, '."'%null%'".') as "cod_emp"
                FROM NOV_AUSENTISMO  
                WHERE periodo is not null
                AND (estado_enviado is null
                OR estado_enviado <>'." 'OK')
                AND estado = 'TERMINADO' 
                AND ROWNUM <= 200
                ORDER BY FECHA_CREACION asc";
                

        $query = $this->db->query($sql);
        return $query->result_array();
    }

    public function cargarCambioBonoIssa(){
        $sql = ' SELECT * FROM (
                    SELECT 
                        BON.PK_ID as "codigo",'.
                        "to_char(to_date(BON.PERIODO, 'yyyy/mm'), 'mm-yyyy')".' as "mes_impacto",'.
                        "to_char(BON.FECHA_CREACION, 'dd-mm-yyyy')".' as "fecha_creacion",'.
                        'case SUBSTR(rut,0,1) when '."'0'".' then SUBSTR(rut,2,LENGTH(rut)) else rut end as "rut",
                        BON.NOMBRE as "nombre",
                        CON.pfk_cod_concepto as "cod_concepto",   
                        CON.NOM_CONCEPTO as "nom_concepto",   
                        CON.valor as "valor",
                        nvl(bon.FK_COD_EMP, '."'%null%'".') as "cod_emp"
                    FROM NOV_CAMBIO_BONO BON, NOV_CAMBIO_BONO_CONCEPTOS CON
                    WHERE BON.PK_ID = CON.PFK_BONO
                    AND BON.periodo is not null
                    AND (CON.estado_enviado is null
                    OR CON.estado_enviado <>'." 'OK')
                    AND BON.estado = 'TERMINADO' 
                    AND CON.valor <> 0 
                    UNION ".
                    'SELECT 
                        BON.PK_ID as "codigo",'.
                        "to_char(to_date(BON.PERIODO, 'yyyy/mm'), 'mm-yyyy')".' as "mes_impacto",'.
                        "to_char(BON.FECHA_CREACION, 'dd-mm-yyyy')".' as "fecha_creacion",'.
                        'case SUBSTR(rut,0,1) when '."'0'".' then SUBSTR(rut,2,LENGTH(rut)) else rut end as "rut",
                        BON.NOMBRE as "nombre",
                        CON.pfk_cod_concepto as "cod_concepto",   
                        CON.NOM_CONCEPTO as "nom_concepto",   
                        CON.valor as "valor",
                        nvl(bon.FK_COD_EMP, '."'%null%'".') as "cod_emp"
                    FROM NOV_CAMBIO_BONO BON, NOV_CAMBIO_BONO_CONCEPTOS CON, NOV_CONCEPTOS CO
                    WHERE BON.PK_ID = CON.PFK_BONO
                    AND con.pfk_cod_concepto = co.pk_cod_concepto
                    AND CON.PFK_COD_EMP = CO.PFK_COD_EMP
                    AND BON.periodo is not null
                    AND (CON.estado_enviado is null
                    OR CON.estado_enviado <>'." 'OK')
                    AND BON.estado = 'TERMINADO' 
                    AND CON.VALOR = 0
                    AND CO.NO_CERO = '0' 
                )
                WHERE ROWNUM <= 200";

        $query = $this->db->query($sql);
        return $query->result_array();
    }

    public function cargarConceptosFiniquitoIssa(){
        $sql = 'SELECT *
                FROM (
                    SELECT 
                        FIN.PK_FINIQUITO as "codigo",'.
                        "to_char(to_date(FIN.PERIODO, 'yyyy/mm'), 'mm-yyyy')".' as "mes_impacto",'.
                        "to_char(FIN.FECHA_CREACION, 'dd-mm-yyyy')".' as "fecha_creacion",'.
                        'case SUBSTR(rut,0,1) when '."'0'".' then SUBSTR(rut,2,LENGTH(rut)) else rut end as "rut",
                        FIN.NOMBRE as "nombre",
                        CON.pfk_cod_concepto as "cod_concepto",   
                        CON.NOM_CONCEPTO as "nom_concepto",   
                        CON.valor as "valor",
                        nvl(FIN.FK_COD_EMP, '."'%null%'".') as "cod_emp"
                    FROM NOV_FINIQUITO_CONCEPTOS con, NOV_FINIQUITOS FIN
                    WHERE CON.PFK_FINIQUITO = FIN.PK_FINIQUITO
                    AND FIN.periodo is not null
                    AND (CON.estado_enviado is null
                    OR CON.estado_enviado <>'." 'OK')
                    AND FIN.estado = 'TERMINADO' 
                    AND CON.valor <> 0 
                    UNION ".
                    'SELECT 
                        FIN.PK_FINIQUITO as "codigo",'.
                        "to_char(to_date(FIN.PERIODO, 'yyyy/mm'), 'mm-yyyy')".' as "mes_impacto",'.
                        "to_char(FIN.FECHA_CREACION, 'dd-mm-yyyy')".' as "fecha_creacion",'.
                        'case SUBSTR(rut,0,1) when '."'0'".' then SUBSTR(rut,2,LENGTH(rut)) else rut end as "rut",
                        FIN.NOMBRE as "nombre",
                        CON.pfk_cod_concepto as "cod_concepto",   
                        CON.NOM_CONCEPTO as "nom_concepto",   
                        CON.valor as "valor",
                        nvl(FIN.FK_COD_EMP, '."'%null%'".') as "cod_emp"
                    FROM NOV_FINIQUITO_CONCEPTOS con, NOV_FINIQUITOS FIN, NOV_CONCEPTOS CO
                    WHERE CON.PFK_FINIQUITO = FIN.PK_FINIQUITO
                    AND con.pfk_cod_concepto = co.pk_cod_concepto
                    AND CON.PFK_COD_EMP = CO.PFK_COD_EMP
                    AND FIN.periodo is not null
                    AND (CON.estado_enviado is null
                    OR CON.estado_enviado <>'." 'OK')
                    AND FIN.estado = 'TERMINADO' 
                    AND CON.VALOR = 0
                    AND CO.NO_CERO = '0' 
                )
                WHERE ROWNUM <= 200 ";

        $query = $this->db->query($sql);
        return $query->result_array();
    }

    public function cargarConceptosIngPersonalIssa(){
        $sql = 'SELECT * 
                FROM (
                    SELECT 
                        ING.PK_ID as "codigo",'.
                        "to_char(to_date(ING.PERIODO, 'yyyy/mm'), 'mm-yyyy')".' as "mes_impacto",'.
                        "to_char(ING.FECHA_CREACION, 'dd-mm-yyyy')".' as "fecha_creacion",'.
                        'case SUBSTR(ING.RUT || '."'-'".'||ING.DV,0,1) when '."'0'".' then SUBSTR(ING.RUT || '."'-'".'||ING.DV,2,LENGTH(rut)) else ING.RUT ||'."'-'".'|| ING.DV end as "rut",
                        ING.APE_PAT || '."' ' || ING.APE_MAT || ', ' ||ING.NOMBRES " . '  as "nombre",
                        CON.pfk_cod_concepto as "cod_concepto",   
                        CON.NOM_CONCEPTO as "nom_concepto",   
                        CON.valor as "valor",
                        nvl(ING.COD_EMP, '."'%null%'".') as "cod_emp"
                    FROM NOV_INGRESAR_PERSONAL ING, NOV_ING_PER_CONCEPTOS con
                    WHERE ING.PK_ID = CON.PFK_INGRESO 
                    AND ING.periodo is not null
                    AND (CON.estado_enviado is null
                    OR CON.estado_enviado <>'." 'OK')
                    AND ING.estado = 'TERMINADO' 
                    AND CON.valor <> 0 
                    UNION ".
                    'SELECT 
                        ING.PK_ID as "codigo",'.
                        "to_char(to_date(ING.PERIODO, 'yyyy/mm'), 'mm-yyyy')".' as "mes_impacto",'.
                        "to_char(ING.FECHA_CREACION, 'dd-mm-yyyy')".' as "fecha_creacion",'.
                        'case SUBSTR(ING.RUT || '."'-'".'||ING.DV,0,1) when '."'0'".' then SUBSTR(ING.RUT || '."'-'".'||ING.DV,2,LENGTH(rut)) else ING.RUT ||'."'-'".'|| ING.DV end as "rut",
                        ING.APE_PAT || '."' ' || ING.APE_MAT || ', ' ||ING.NOMBRES " . '  as "nombre",
                        CON.pfk_cod_concepto as "cod_concepto",   
                        CON.NOM_CONCEPTO as "nom_concepto",   
                        CON.valor as "valor",
                        nvl(ING.COD_EMP, '."'%null%'".') as "cod_emp"
                    FROM NOV_INGRESAR_PERSONAL ING, NOV_ING_PER_CONCEPTOS con, NOV_CONCEPTOS CO
                    WHERE ING.PK_ID = CON.PFK_INGRESO 
                    AND con.pfk_cod_concepto = co.pk_cod_concepto
                    AND CON.PFK_COD_EMP = CO.PFK_COD_EMP
                    AND ING.periodo is not null
                    AND (CON.estado_enviado is null
                    OR CON.estado_enviado <>'." 'OK')
                    AND ING.estado = 'TERMINADO' 
                    AND CON.VALOR = 0
                    AND CO.NO_CERO = '0' 
                )
                WHERE ROWNUM <= 200 ";

        $query = $this->db->query($sql);
        return $query->result_array();
    }
    

    public function cargarCambioOtrosIssa() {
        $sql = 'SELECT 
                    PK_ID as "codigo",'.
                    "to_char(to_date(PERIODO, 'yyyy/mm'), 'mm-yyyy')".' as "mes_impacto",'.
                    "to_char(FECHA_CREACION, 'dd-mm-yyyy')".' as "fecha_creacion",'.
                    'case SUBSTR(rut,0,1) when '."'0'".' then SUBSTR(rut,2,LENGTH(rut)) else rut end as "rut",
                    NOMBRE as "nombre",
                    COD_TIPO_CAMBIO as "cod_tipo_cambio",
                    NOM_TIPO_CAMBIO as "nom_tipo_cambio",
                    nvl(COD_EST_CIVIL, '."'%null%'".') as "cod_est_civil",
                    nvl(NOM_EST_CIVIL, '."'%null%'".') as "nom_est_civil",
                    nvl(COD_ESCOLARIDAD, '."'%null%'".') as "cod_escolaridad",
                    nvl(NOM_ESCOLARIDAD, '."'%null%'".') as "nom_escolaridad",
                    nvl(CALLE, '."'%null%'".') as "calle",
                    nvl(NUMERO, '."'%null%'".') as "numero",
                    nvl(DEPARTAMENTO, '."'%null%'".') as "departamento",
                    nvl(COMUNA, '."'%null%'".') as "comuna",
                    nvl(CIUDAD, '."'%null%'".') as "ciudad",
                    nvl(CORREO, '."'%null%'".') as "correo", 
                    nvl(TELEFONO, '."'%null%'".') as "telefono",
                    nvl(OBSERVACION, '."'%null%'".') as "observacion",
                    nvl(FK_COD_EMP, '."'%null%'".') as "cod_emp"
                FROM NOV_CAMBIO_OTROS CAM 
                WHERE periodo is not null
                AND (estado_enviado is null
                OR estado_enviado <>'." 'OK')
                AND estado = 'TERMINADO' 
                AND ROWNUM <= 200
                ORDER BY FECHA_CREACION asc";
                

        $query = $this->db->query($sql);
        return $query->result_array();
    }


    public function cargarIngDescuentoRRLLIssa() {

        $sql = 'SELECT 
                    PK_COD as "codigo",'.
                    "to_char(to_date(PERIODO, 'yyyy/mm'), 'mm-yyyy')".' as "mes_impacto",'.
                    "to_char(FECHA_CREACION, 'dd-mm-yyyy')".' as "fecha_creacion",'.
                    'case SUBSTR(rut,0,1) when '."'0'".' then SUBSTR(rut,2,LENGTH(rut)) else rut end as "rut",
                    NOMBRE as "nombre",
                    nvl(NOM_GERENCIA, '."'%null%'".') as "gerencia",
                    nvl(NOM_DEPARTAMENTO, '."'%null%'".') as "departamento",
                    nvl(COD_CC, '."'%null%'".') as "cod_cc",
                    nvl(NOM_CC, '."'%null%'".') as "nom_cc",
                    nvl(FK_TIPO, '."'%null%'".') as "tipo",
                    nvl(FK_DESCUENTO, '."'%null%'".') as "cod_descuento",
                    nvl(NOM_DESCUENTO, '."'%null%'".') as "nom_descuento",
                    nvl(FORMATO_VALOR, '."'%null%'".') as "formato",
                    nvl(MONTO_TOTAL, '."'0'".') as "monto_total",
                    nvl(CUOTAS, '."'0'".') as "cuotas",
                    nvl(VALOR_CUOTA, '."'0'".') as "valor_cuota",
                    nvl(ANHO_DESCUENTO, '."'0'".') as "anho_descuento",
                    nvl(MES_DESCUENTO, '."'%null%'".') as "mes_descuento", 
                    nvl(OBSERVACION, '."'%null%'".') as "observacion",
                    nvl(FK_COD_EMP, '."'%null%'".') as "cod_emp"
                FROM NOV_ING_DESCUENTOS_RRLL  
                WHERE periodo is not null
                AND (estado_enviado is null
                OR estado_enviado <>'." 'OK')
                AND estado = 'TERMINADO' 
                AND ROWNUM <= 200
                ORDER BY FECHA_CREACION asc";
                

        $query = $this->db->query($sql);
        return $query->result_array();
    }

    public function cargarIngHaberRRLLIssa() {

        $sql = 'SELECT 
                    PK_COD as "codigo",'.
                    "to_char(to_date(PERIODO, 'yyyy/mm'), 'mm-yyyy')".' as "mes_impacto",'.
                    "to_char(FECHA_CREACION, 'dd-mm-yyyy')".' as "fecha_creacion",'.
                    'case SUBSTR(rut,0,1) when '."'0'".' then SUBSTR(rut,2,LENGTH(rut)) else rut end as "rut",
                    NOMBRE as "nombre",
                    nvl(NOM_GERENCIA, '."'%null%'".') as "gerencia",
                    nvl(NOM_DEPARTAMENTO, '."'%null%'".') as "departamento",
                    nvl(COD_CC, '."'%null%'".') as "cod_cc",
                    nvl(NOM_CC, '."'%null%'".') as "nom_cc",
                    nvl(FK_TIPO, '."'%null%'".') as "tipo",
                    nvl(FK_HABER, '."'%null%'".') as "cod_haber",
                    nvl(NOM_HABER, '."'%null%'".') as "nom_haber",
                    nvl(FORMATO_VALOR, '."'%null%'".') as "formato",
                    nvl(MONTO, 0) as "monto",
                    nvl(USA_FECHA, '."'0'".') as "usa_fecha",'.
                    "nvl(to_char(INICIO, 'dd-mm-yyyy'), '%null%')".' as "inicio",'. 
                    "nvl(to_char(TERMINO, 'dd-mm-yyyy'), '%null%')".' as "termino",'.
                    'nvl(OBSERVACION, '."'%null%'".') as "observacion",
                    nvl(FK_COD_EMP, '."'%null%'".') as "cod_emp"
                FROM NOV_ING_HABERES_RRLL  
                WHERE periodo is not null
                AND (estado_enviado is null
                OR estado_enviado <>'." 'OK')
                AND estado = 'TERMINADO' 
                AND ROWNUM <= 200
                ORDER BY FECHA_CREACION asc";
                

        $query = $this->db->query($sql);
        return $query->result_array();
    }

    public function cargarIngPersonalIssa() {
        $sql = 'SELECT 
                    PK_ID as "codigo",'.
                    "to_char(to_date(PERIODO, 'yyyy/mm'), 'mm-yyyy')".' as "mes_impacto",'.
                    "to_char(FECHA_CREACION, 'dd-mm-yyyy')".' as "fecha_creacion",'.
                    'case SUBSTR(ING.RUT || '."'-'".'||ING.DV,0,1) when '."'0'".' then SUBSTR(ING.RUT || '."'-'".'||ING.DV,2,LENGTH(rut)) else ING.RUT || '."'-'".' || ING.DV end as "rut",
                    ING.NOMBRES as "nombres",
                    ING.APE_PAT as "ape_pat",
                    ING.APE_MAT as "ape_mat",'.
                    "to_char(FECHA_CREACION, 'dd-mm-yyyy')".' as "fecha_nacimiento",'.
                    'nvl(COD_SEXO, '."'%null%'".') as "cod_sexo",
                    nvl(SEXO, '."'%null%'".') as "sexo", 
                    nvl(NACIONALIDAD, '."'%null%'".') as "nacionalidad", 
                    nvl(COD_ESTADO_CIVIL, '."'%null%'".') as "cod_estado_civil", 
                    nvl(ESTADO_CIVIL, '."'%null%'".') as "estado_civil", 
                    nvl(COD_NIVEL_EDUCACION, '."'%null%'".') as "cod_nivel_educacion",
                    nvl(NIVEL_EDUCACION, '."'%null%'".') as "nivel_educacion",
                    nvl(CALLE, '."'%null%'".') as "calle",
                    nvl(NUMERO, '."'%null%'".') as "numero",
                    nvl(DEPARTAMENTO, '."'%null%'".') as "num_dep",
                    nvl(COMUNA, '."'%null%'".') as "comuna", 
                    nvl(CIUDAD, '."'%null%'".') as "ciudad", 
                    nvl(TELEFONO, '."'%null%'".') as "telefono", 
                    nvl(CELULAR, '."'%null%'".') as "celular", 
                    nvl(CORREO, '."'%null%'".') as "correo", 
                    nvl(NOM_GERENCIA, '."'%null%'".') as "gerencia", 
                    nvl(NOM_DEPARTAMENTO, '."'%null%'".') as "departamento", 
                    nvl(COD_CC, '."'%null%'".') as "cod_cc", 
                    nvl(NOM_CC, '."'%null%'".') as "nom_cc",  
                    nvl(COD_CARGO, '."'%null%'".') as "cod_cargo", 
                    nvl(NOM_CARGO, '."'%null%'".') as "nom_cargo",  
                    nvl(COD_JORNADA, '."'%null%'".') as "cod_jornada",  
                    nvl(JORNADA, '."'%null%'".') as "jornada",'.  
                    "nvl(to_char(FECHA_INGRESO, 'dd-mm-yyyy'), '%null%')".' as "fecha_ingreso",'.
                    "nvl(to_char(FECHA_VENCIMIENTO, 'dd-mm-yyyy'), '%null%')".' as "fecha_vencimiento",'.
                    'nvl(COD_INE, '."'%null%'".') as "cod_ine",  
                    nvl(INE, '."'%null%'".') as "ine",  
                    nvl(RUT_JEFE, '."'%null%'".') as "rut_jefe",  
                    nvl(DV_JEFE, '."'%null%'".') as "dv_jefe",  
                    nvl(COD_TIPO_CONTRATO, '."'%null%'".') as "cod_tipo_contrato",  
                    nvl(TIPO_CONTRATO, '."'%null%'".') as "tipo_contrato", 
                    nvl(ROL_CARGO, '."'%null%'".') as "rol_cargo", 
                    nvl(SUELDO_BASE, '."'0'".') as "sueldo_base",
                    nvl(RENTA_CONTRATO, '."'0'".') as "renta_contrato", 
                    nvl(COD_AFP, '."'%null%'".') as "cod_afp",
                    nvl(AFP, '."'%null%'".') as "afp", 
                    nvl(COD_SALUD, '."'%null%'".') as "cod_salud",
                    nvl(SALUD, '."'%null%'".') as "salud", 
                    nvl(PLAN_SALUD, '."'0'".') as "plan_salud", 
                    nvl(FORMATO_PLAN_SALUD, '."'%null%'".') as "formato_plan_salud", 
                    nvl(PLAN_COLECTIVO_SALUD, '."'0'".') as "plan_colectivo_salud", 
                    nvl(FORMATO_PLAN_COLECTIVO_SALUD, '."'%null%'".') as "formato_plan_colectivo_salud", 
                    nvl(MONTO_APV, '."'0'".') as "monto_apv", 
                    nvl(COD_INSTITUCION_APV, '."'%null%'".') as "cod_institucion_apv", 
                    nvl(INSTITUCION_APV, '."'%null%'".') as "institucion_apv", 
                    nvl(COD_REGIMEN_APV, '."'%null%'".') as "cod_regimen_apv", 
                    nvl(REGIMEN_APV, '."'%null%'".') as "regimen_apv", 
                    nvl(FORMATO_MONTO_APV, '."'%null%'".') as "formato_monto_apv", 
                    nvl(MONTO_GES, '."'0'".') as "monto_ges", 
                    nvl(FORMATO_GES, '."'%null%'".') as "formato_ges", 
                    nvl(MONTO_ADI_TRA, '."'0'".') as "monto_adi_tra", 
                    nvl(FORMATO_ADI_TRA, '."'%null%'".') as "formato_adi_tra", 
                    nvl(MONTO_ADI_EMP, '."'0'".') as "monto_adi_emp", 
                    nvl(FORMATO_ADI_EMP, '."'%null%'".') as "formato_adi_emp", 
                    nvl(COD_FORMA_PAGO, '."'%null%'".') as "cod_forma_pago", 
                    nvl(FORMA_PAGO, '."'%null%'".') as "forma_pago", 
                    nvl(COD_BANCO, '."'%null%'".') as "cod_banco", 
                    nvl(BANCO, '."'%null%'".') as "banco", 
                    nvl(CUENTA, '."'%null%'".') as "cuenta",
                    nvl(COD_EMP, '."'%null%'".') as "cod_emp"
                FROM NOV_INGRESAR_PERSONAL ING
                WHERE periodo is not null
                AND (estado_enviado is null
                OR estado_enviado <>'." 'OK')
                AND estado = 'TERMINADO' 
                AND ROWNUM <= 200
                ORDER BY FECHA_CREACION asc ";

                //echo $sql;
                
        
        $query = $this->db->query($sql);
        return $query->result_array();
    }

    public function contarRegistrosProcesoMensualIssa($p_proceso, $p_tipo, $p_cod_emp) {
        //AND PRO.estado = 'TERMINADO'
        $sql = 'SELECT 
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
            AND CON.PFK_COD_EMP ='."'".$p_cod_emp."'
            AND CON.PFK_PROCESO = '$p_proceso'
            AND CON.PFK_TIPO = '$p_tipo'
            AND (CON.estado_enviado is null
            OR CON.estado_enviado <> 'OK')
            ";

            //echo $sql;

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function cargarUltimoEnvioProcesoMensual($p_proceso, $p_tipo, $p_cod_emp) {
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

    public function cargarProcesoMensualIssa($p_proceso, $p_tipo, $p_cod_emp, $rowini, $rowter) {
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
                                to_char(to_date(con.PFK_PROCESO,'. "'yyyy/mm'), 'mm-yyyy')".' as "mes_impacto",'.
                                "to_char(CON.FECHA_CREACION, 'dd-mm-yyyy')".' as "fecha_creacion",'.
                                'con.pfk_tipo as "tipo",'.
                                'case SUBSTR(pfk_rut,0,1) when '."'0'".' then SUBSTR(pfk_rut,2,LENGTH(pfk_rut)) else pfk_rut end as "rut",
                                PER.NOMBRE as "nombre", 
                                PER.PFK_COD_CC as "cod_cc", 
                                PER.NOM_CC as "nom_cc",
                                PER.COD_CARGO as "cod_cargo",
                                PER.NOM_CARGO as "nom_cargo",'.
                                "to_char(PER.FECHA_INGRESO, 'dd-mm-yyyy')".' as "fecha_ingreso",'.
                                'nvl(PER.TIPO_CONTRATO, '."'%null%'".') as "tipo_contrato",
                                nvl(PER.JORNADA, '."'%null%'".') as "jornada",
                                nvl(PER.COD_SINDICATO, '."'%null%'".') as "cod_sindicato", 
                                nvl(PER.NOM_SINDICATO, '."'%null%'".') as "nom_sindicato", 
                                nvl(PER.COD_ADHERIDO, '."'%null%'".') as "cod_adherido",
                                nvl(PER.NOM_ADHERIDO, '."'%null%'".') as "nom_adherido",
                                nvl(CON.pfk_cod_concepto, '."'%null%'".') as "cod_concepto",   
                                nvl(CON.NOM_CONCEPTO, '."'%null%'".') as "nom_concepto",
                                nvl(CON.valor, 0) as "valor",
                                nvl(con.PFK_COD_EMP, '."'%null%'".') as "cod_emp"
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
                        AND CON.PFK_COD_EMP ='."'".$p_cod_emp."'
                        AND CON.PFK_PROCESO = '$p_proceso'
                        AND CON.PFK_TIPO = '$p_tipo'
                        AND CON.VALOR <> 0
                        AND (CON.estado_enviado is null
                        OR CON.estado_enviado <> 'OK') ";

                    $sql .= '
                        UNION
                        SELECT 
                            to_char(to_date(con.PFK_PROCESO,'. "'yyyy/mm'), 'mm-yyyy')".' as "mes_impacto",'.
                            "to_char(CON.FECHA_CREACION, 'dd-mm-yyyy')".' as "fecha_creacion",'.
                            'con.pfk_tipo as "tipo",'.
                            'case SUBSTR(pfk_rut,0,1) when '."'0'".' then SUBSTR(pfk_rut,2,LENGTH(pfk_rut)) else pfk_rut end as "rut",
                            PER.NOMBRE as "nombre", 
                            PER.PFK_COD_CC as "cod_cc", 
                            PER.NOM_CC as "nom_cc",
                            PER.COD_CARGO as "cod_cargo",
                            PER.NOM_CARGO as "nom_cargo",'.
                            "to_char(PER.FECHA_INGRESO, 'dd-mm-yyyy')".' as "fecha_ingreso",'.
                            'nvl(PER.TIPO_CONTRATO, '."'%null%'".') as "tipo_contrato",
                            nvl(PER.JORNADA, '."'%null%'".') as "jornada",
                            nvl(PER.COD_SINDICATO, '."'%null%'".') as "cod_sindicato", 
                            nvl(PER.NOM_SINDICATO, '."'%null%'".') as "nom_sindicato", 
                            nvl(PER.COD_ADHERIDO, '."'%null%'".') as "cod_adherido",
                            nvl(PER.NOM_ADHERIDO, '."'%null%'".') as "nom_adherido",
                            nvl(CON.pfk_cod_concepto, '."'%null%'".') as "cod_concepto",   
                            nvl(CON.NOM_CONCEPTO, '."'%null%'".') as "nom_concepto",
                            nvl(CON.valor, 0) as "valor",
                            nvl(con.PFK_COD_EMP, '."'%null%'".') as "cod_emp"
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
                        AND CON.PFK_COD_EMP ='."'".$p_cod_emp."'
                        AND CON.PFK_PROCESO = '$p_proceso'
                        AND CON.PFK_TIPO = '$p_tipo'
                        AND CON.VALOR = 0
                        AND CO.NO_CERO = '0'
                        AND (CON.estado_enviado is null
                        OR CON.estado_enviado <> 'OK')
                    )
                    ".'ORDER BY "rut", "cod_concepto"'.
                ")
                WHERE FILA >= $rowini
                AND FILA <= $rowter ";
                        
        $query = $this->db->query($sql);
        return $query->result_array();
    }




    public function actualizarEstadoRegistros($items, $tipo, $id) {
        
        $res = $this->db->update_batch($tipo, $items, $id);
        
        return $res;
    }

    public function guardarLogEjecucion($p_usuario, $p_tipo, $p_respuesta, $p_observacion, $p_cant_enviados, $p_cant_respuesta) {
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


    public function update_batch_custom($table_name, $data, $indexes) {
        if (empty($data) || empty($indexes)){
            return 'Data or indexes must not be empty';
        }

        $sql = 'UPDATE ' . $table_name . ' SET ' . "";
    
        //columns on which is done actual update
        $columns = [];
        foreach ($data[0] as $key => $value) {
            if (!in_array($key, $indexes)){
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
                     $sql_part .=  $index . "= '".$row[$index] . "' AND ";
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
            $sql .= $column .'= CASE ';
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
            if ( count($where[$index]) > 0){
                $unique_where = array_unique($where[$index]);
                $sql .= $index . " IN ('". join(',', $unique_where) . "') AND ";
            }
        }
    
        $sql = substr($sql, 0, -4);
        $sql .= '';

        echo $sql;
    
        return $this->db->query($sql);
    }

    public function cargarConteoEnviosIssa() {
        $sql = "SELECT NOMBRE, CONTAR
                FROM nov_conteo_envios_issa_vw";

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function cargarHistorialEnviosIssa($desde, $hasta, $tipo) {
        
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
        if(!empty($fecha))
        {
            $sql .= "AND FECHA BETWEEN TO_DATE('$desde', 'YYYY/MM/DD') AND TO_DATE('$hasta 23:59', 'YYYY/MM/DD HH24:MI') ";
        }else{
            $sql .= "AND TO_CHAR(FECHA, 'YYYYMM') = TO_CHAR(SYSDATE, 'YYYYMM') ";
        }

        if(!empty($tipo))
        {
            $sql .= "AND TIPO =  '$tipo' ";
        }
        $sql .= "ORDER BY FECHA DESC";

        $query = $this->db->query($sql);
        return $query->result();

    }   

    public function cargarHistorialPMEnviosIssa($proceso, $tipo, $codemp) {
        
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

        if(!empty($proceso))
        {
            $sql .= "AND PROCESO =  '$proceso' ";
        }

        if(!empty($tipo))
        {
            $sql .= "AND TIPO =  '$tipo' ";
        }

        if(!empty($codemp))
        {
            $sql .= "AND COD_EMP =  '$codemp' ";
        }
        $sql .= "ORDER BY FECHA DESC";

        $query = $this->db->query($sql);
        return $query->result();

    }   
    

    
    public function cargarConteoPMEnviosIssa($proceso, $tipo, $codemp) {
        
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
        if(!empty($periodo))
        {
            $sql .= "AND PROCESO = '$proceso' ";
        }

        if(!empty($tipo))
        {
            $sql .= "AND TIPO =  '$tipo' ";
        }

        if(!empty($codemp))
        {
            $sql .= "AND COD_EMP =  '$codemp' ";
        }
        $sql .= "ORDER BY PROCESO DESC, COD_EMP ASC, TIPO ASC";

        $query = $this->db->query($sql);
        return $query->result();

    }   
    
}
