<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class TarifarioMensualModel extends CI_Model
{

    public function __construct()
    {
        parent::__construct();
        $this->load->database("BD_NOVEDADES");
    }

    public function cargarTarifasMensuales()
    {
        $sql = "SELECT 
                    PK_ANHO,
                    PK_MES,
                    TO_CHAR(DESDE, 'YYYY/MM/DD') DESDE,
                    TO_CHAR(HASTA, 'YYYY/MM/DD') HASTA,
                    OBSERVACION,
                    USR_CREADOR,
                    TO_CHAR(FECHA_CREACION, 'YYYY/MM/DD') FECHA_CREACION,
                    ESTADO,
                    TO_CHAR(FECHA_TRASPASO, 'YYYY/MM/DD') FECHA_TRASPASO,
                    USR_TRASPASO,
                    TO_CHAR(FECHA_TERMINO, 'YYYY/MM/DD') FECHA_TERMINO,
                    USR_TERMINO
                FROM NOV_TRAIN_TARIFAS 
                ORDER BY PK_ANHO DESC, PK_MES DESC";

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function cargarValidacionErroresTarifario(
        $p_anho,
        $p_mes,
        $p_desde,
        $p_hasta)
    {
        $sql = "SELECT TIPO, DESCRIPCION, CANTIDAD_GUIAS
        FROM(
            SELECT 'SOLICITUD FALTANTE' TIPO,  TO_CHAR(NRO_SOLICITUD) DESCRIPCION, COUNT(*) CANTIDAD_GUIAS
            FROM TRAIN_GUIAS
            WHERE FECHA_DOCTO BETWEEN TO_DATE('$p_desde', 'YYYY/MM/DD') AND TO_DATE('$p_hasta', 'YYYY/MM/DD')
            AND NRO_SOLICITUD NOT IN(SELECT NRO_SOLICITUD FROM TRAIN_TARIFAS)
            GROUP BY NRO_SOLICITUD
            UNION ALL
            SELECT TIPO, TO_CHAR(RUT) DESCRIPCION, COUNT(*) CANTIDAD_GUIAS
            FROM(
                SELECT 'CONDUCTOR FALTANTE' TIPO, ID_CONDUCTOR RUT
                FROM TRAIN_GUIAS
                WHERE FECHA_DOCTO BETWEEN TO_DATE('$p_desde', 'YYYY/MM/DD') AND TO_DATE('$p_hasta', 'YYYY/MM/DD')
                AND ID_CONDUCTOR IS NOT NULL
                AND ID_CONDUCTOR NOT IN (
                    SELECT TO_NUMBER(SUBSTR(PK_RUT, 0 , INSTR(PK_RUT, '-') -1))
                    FROM nov_proc_mensual_persons p
                    WHERE p.pfk_cod_emp = '094'
                    AND p.pfk_tipo = 'RRHH'
                    AND p.pfk_proceso = '$p_anho/$p_mes')
                UNION ALL
                SELECT 'CONDUCTOR 2 FALTANTE' TIPO, ID_CONDUCTOR_SEC RUT
                FROM TRAIN_GUIAS
                WHERE FECHA_DOCTO BETWEEN TO_DATE('$p_desde', 'YYYY/MM/DD') AND TO_DATE('$p_hasta', 'YYYY/MM/DD')
                AND ID_CONDUCTOR_SEC IS NOT NULL
                AND ID_CONDUCTOR_SEC NOT IN (
                    SELECT TO_NUMBER(SUBSTR(PK_RUT, 0 , INSTR(PK_RUT, '-') -1))
                    FROM nov_proc_mensual_persons p
                    WHERE p.pfk_cod_emp = '094'
                    AND p.pfk_tipo = 'RRHH'
                    AND p.pfk_proceso = '$p_anho/$p_mes'))
            GROUP BY TIPO, RUT)
        ORDER BY TIPO ASC, CANTIDAD_GUIAS DESC";

        $query = $this->db->query($sql);
        return $query->result();
    }


    public function iniciarTarifarioMensual(
        $p_anho, 
        $p_mes, 
        $p_desde, 
        $p_hasta, 
        $p_observacion, 
        $p_usuario)
    {

        
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
            $this->db->conn_id,
            "BEGIN NOV_INIT_PROC_TRAIN_TARIFA(
                            :p_anho, 
                            :p_mes, 
                            :p_desde, 
                            :p_hasta, 
                            :p_observacion, 
                            :p_usuario,
                            :r_est,
                            :r_msg); END;"
        );


        oci_bind_by_name($proc, "p_anho", $p_anho);
        oci_bind_by_name($proc, "p_mes", $p_mes, 20, SQLT_CHR);
        oci_bind_by_name($proc, "p_desde", $p_desde, 20, SQLT_CHR);
        oci_bind_by_name($proc, "p_hasta", $p_hasta, 20, SQLT_CHR);
        oci_bind_by_name($proc, "p_observacion", $p_observacion, 1000, SQLT_CHR);
        oci_bind_by_name($proc, "p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc, "r_est", $r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc, "r_msg", $r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }


    public function traspasarTarifarioMensual(
        $p_anho, 
        $p_mes, 
        $p_usuario)
    {

        
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
            $this->db->conn_id,
            "BEGIN NOV_TRAS_PROC_TRAIN_TARIFA(
                            :p_anho, 
                            :p_mes,  
                            :p_usuario,
                            :r_est,
                            :r_msg); END;"
        );


        oci_bind_by_name($proc, "p_anho", $p_anho);
        oci_bind_by_name($proc, "p_mes", $p_mes, 20, SQLT_CHR);
        oci_bind_by_name($proc, "p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc, "r_est", $r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc, "r_msg", $r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }


    public function eliminarTarifarioMensual(
        $p_anho, 
        $p_mes, 
        $p_usuario)
    {
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
            $this->db->conn_id,
            "BEGIN NOV_ELI_PROC_TRAIN_TARIFA(
                            :p_anho, 
                            :p_mes,  
                            :p_usuario,
                            :r_est,
                            :r_msg); END;"
        );


        oci_bind_by_name($proc, "p_anho", $p_anho);
        oci_bind_by_name($proc, "p_mes", $p_mes, 20, SQLT_CHR);
        oci_bind_by_name($proc, "p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc, "r_est", $r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc, "r_msg", $r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }

    public function terminarTarifarioMensual(
        $p_anho, 
        $p_mes, 
        $p_usuario)
    {

        
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
            $this->db->conn_id,
            "BEGIN NOV_TER_PROC_TRAIN_TARIFA(
                            :p_anho, 
                            :p_mes,  
                            :p_usuario,
                            :r_est,
                            :r_msg); END;"
        );


        oci_bind_by_name($proc, "p_anho", $p_anho);
        oci_bind_by_name($proc, "p_mes", $p_mes, 20, SQLT_CHR);
        oci_bind_by_name($proc, "p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc, "r_est", $r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc, "r_msg", $r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }

    public function anularTarifarioMensual(
        $p_anho, 
        $p_mes, 
        $p_usuario)
    {

        
        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
            $this->db->conn_id,
            "BEGIN NOV_ANU_PROC_TRAIN_TARIFA(
                            :p_anho, 
                            :p_mes,  
                            :p_usuario,
                            :r_est,
                            :r_msg); END;"
        );


        oci_bind_by_name($proc, "p_anho", $p_anho);
        oci_bind_by_name($proc, "p_mes", $p_mes, 20, SQLT_CHR);
        oci_bind_by_name($proc, "p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc, "r_est", $r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc, "r_msg", $r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }

    public function cargarTarifaMensualGuias(
        $p_anho, 
        $p_mes,
        $p_rut_1,
        $p_rut_2
    ) {
        $sql = "SELECT 
                    guia.PFK_ANHO,
                    guia.PFK_MES ,
                    guia.PFK_SOLICITUD,
                    guia.PK_NRO_GUIA,
                    guia.TIPO_DOCTO,
                    TO_CHAR(guia.FECHA_SALIDA, 'DD-MM-YYYY') FECHA_SALIDA,
                    guia.PRODUCTO,
                    guia.ORIGEN,
                    guia.DESTINO,
                    guia.ID_CONDUCTOR,
                    guia.ID_CONDUCTOR_SEC,
                    guia.NUM_MOV,
                    guia.CANTIDAD_TRANSPORTADA,
                    guia.MP_VACIO,
                    guia.RUT_CLIENTE,
                    guia.RAZON_SOCIAL,
                    guia.ID_RUTA,
                    guia.SERVICIO,
                    TO_CHAR(guia.FECHA_DOCTO, 'DD-MM-YYYY') FECHA_DOCTO,
                    guia.NOMBRE_CONDUCTOR,
                    guia.NOMBRE_CONDUCTOR_SEC, 
                    sol.descripcion
                FROM nov_train_tarifas_guias guia, train_solicitudes sol
                WHERE guia.pfk_solicitud = sol.nro_solicitud
                AND PFK_ANHO = $p_anho
                AND PFK_MES = '$p_mes' ";
        if (!empty($p_rut_1)) {
            $sql .= "AND ID_CONDUCTOR = '$p_rut_1' ";
        }
        if (!empty($p_rut_2)) {
            $sql .= "AND ID_CONDUCTOR_SEC = '$p_rut_2' ";
        }

        $sql .= "ORDER BY 
                    guia.ID_CONDUCTOR ASC, 
                    guia.ID_CONDUCTOR_SEC ASC, 
                    guia.PFK_SOLICITUD ASC,
                    guia.PK_NRO_GUIA ASC ";
        
        $query = $this->db->query($sql);
        return $query->result();
    }


    public function cargarTarifaMensualDet(
        $p_anho, 
        $p_mes)
    {
        $sql = "SELECT 
                    PK_SOLICITUD,
                    PFK_ANHO,
                    PFK_MES,
                    RUT,
                    RAZON_SOCIAL,
                    ID_RUTA,
                    SERVICIO,
                    nvl(BONO_CONDUCTOR, 0) BONO_CONDUCTOR,
                    nvl(BONO_CONDUCTOR_SEC, 0) BONO_CONDUCTOR_SEC,
                    nvl(VIATICO, 0) VIATICO,
                    nvl(VALOR, 0) VALOR,
                    nvl(TON_27_5, 0) TON_27_5,
                    nvl(PEAJE, 0) PEAJE,
                    nvl(TIEMPO_ESPERA, 0) TIEMPO_ESPERA,
                    nvl(FACTOR_TE, 0) FACTOR_TE,
                    nvl(BONO_SQM, 0) BONO_SQM,
                    nvl(MP_VACIO, 0) MP_VACIO
                FROM nov_train_tarifas_det
                WHERE PFK_ANHO = $p_anho
                AND PFK_MES = '$p_mes'
                ORDER BY PK_SOLICITUD ASC";

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function cargarTarifarioMensualGuiasDet(
        $p_anho, 
        $p_mes,
        $p_rut
    ) {
        $sql = "SELECT *
                FROM(
                    SELECT 
                        guia.PFK_ANHO,
                        guia.PFK_MES ,
                        guia.PFK_SOLICITUD,
                        guia.PK_NRO_GUIA,
                        guia.TIPO_DOCTO,
                        TO_CHAR(guia.FECHA_SALIDA, 'DD-MM-YYYY') FECHA_SALIDA,
                        guia.PRODUCTO,
                        guia.ORIGEN,
                        guia.DESTINO,
                        guia.ID_CONDUCTOR,
                        guia.ID_CONDUCTOR_SEC,
                        guia.NUM_MOV,
                        guia.CANTIDAD_TRANSPORTADA,
                        guia.MP_VACIO,
                        guia.RUT_CLIENTE,
                        guia.RAZON_SOCIAL,
                        guia.ID_RUTA,
                        guia.SERVICIO,
                        TO_CHAR(guia.FECHA_DOCTO, 'DD-MM-YYYY') FECHA_DOCTO,
                        guia.NOMBRE_CONDUCTOR,
                        guia.NOMBRE_CONDUCTOR_SEC, 
                        sol.descripcion,
                        nvl(det.BONO_CONDUCTOR, 0) BONO_CONDUCTOR,
                        nvl(det.BONO_CONDUCTOR_SEC, 0) BONO_CONDUCTOR_SEC,
                        nvl(det.VIATICO, 0) VIATICO,
                        nvl(det.VALOR, 0) VALOR,
                        nvl(det.TON_27_5, 0) TON_27_5,
                        nvl(det.PEAJE, 0) PEAJE,
                        nvl(det.TIEMPO_ESPERA, 0) TIEMPO_ESPERA,
                        nvl(det.FACTOR_TE, 0) FACTOR_TE,
                        nvl(det.BONO_SQM, 0) BONO_SQM,
                        nvl(det.MP_VACIO, 0) MP_VACIO_VAL,
                        (case when guia.CANTIDAD_TRANSPORTADA > 27.5 then 1 else 0 end) IS_27_5,
                        'PRIMARIO' TIPO
                    FROM nov_train_tarifas_guias guia, train_solicitudes sol, 
                        nov_train_tarifas_det det
                    WHERE guia.pfk_solicitud = sol.nro_solicitud
                    AND guia.pfk_anho = det.pfk_anho
                    AND guia.pfk_mes = det.pfk_mes
                    AND guia.pfk_solicitud = det.pk_solicitud
                    AND guia.PFK_ANHO = $p_anho
                    AND guia.PFK_MES = '$p_mes'
                    AND ID_CONDUCTOR = '$p_rut'
                    UNION
                    SELECT 
                        guia.PFK_ANHO,
                        guia.PFK_MES ,
                        guia.PFK_SOLICITUD,
                        guia.PK_NRO_GUIA,
                        guia.TIPO_DOCTO,
                        TO_CHAR(guia.FECHA_SALIDA, 'DD-MM-YYYY') FECHA_SALIDA,
                        guia.PRODUCTO,
                        guia.ORIGEN,
                        guia.DESTINO,
                        guia.ID_CONDUCTOR_SEC ID_CONDUCTOR,
                        guia.ID_CONDUCTOR_SEC,
                        guia.NUM_MOV,
                        guia.CANTIDAD_TRANSPORTADA,
                        guia.MP_VACIO,
                        guia.RUT_CLIENTE,
                        guia.RAZON_SOCIAL,
                        guia.ID_RUTA,
                        guia.SERVICIO,
                        TO_CHAR(guia.FECHA_DOCTO, 'DD-MM-YYYY') FECHA_DOCTO,
                        guia.NOMBRE_CONDUCTOR_SEC NOMBRE_CONDUCTOR,
                        guia.NOMBRE_CONDUCTOR_SEC, 
                        sol.descripcion,
                        nvl(det.BONO_CONDUCTOR, 0) BONO_CONDUCTOR,
                        nvl(det.BONO_CONDUCTOR_SEC, 0) BONO_CONDUCTOR_SEC,
                        nvl(det.VIATICO, 0) VIATICO,
                        nvl(det.VALOR, 0) VALOR,
                        nvl(det.TON_27_5, 0) TON_27_5,
                        nvl(det.PEAJE, 0) PEAJE,
                        nvl(det.TIEMPO_ESPERA, 0) TIEMPO_ESPERA,
                        nvl(det.FACTOR_TE, 0) FACTOR_TE,
                        nvl(det.BONO_SQM, 0) BONO_SQM,
                        nvl(det.MP_VACIO, 0) MP_VACIO_VAL,
                        (case when guia.CANTIDAD_TRANSPORTADA > 27.5 then 1 else 0 end) IS_27_5,
                        'SEGUNDARIO' TIPO
                    FROM nov_train_tarifas_guias guia, train_solicitudes sol, 
                        nov_train_tarifas_det det
                    WHERE guia.pfk_solicitud = sol.nro_solicitud
                    AND guia.pfk_anho = det.pfk_anho
                    AND guia.pfk_mes = det.pfk_mes
                    AND guia.pfk_solicitud = det.pk_solicitud
                    AND guia.PFK_ANHO = $p_anho
                    AND guia.PFK_MES = '$p_mes'
                    AND ID_CONDUCTOR_SEC = '$p_rut') ";
        $sql .= "ORDER BY 
                    PFK_SOLICITUD ASC,
                    PK_NRO_GUIA ASC "; 
                    
        
        $query = $this->db->query($sql);
        return $query->result();
    }

    public function cargarTarifarioMensual($p_anho, $p_mes)
    {
        $sql = "SELECT 
                    PK_ANHO,
                    PK_MES,
                    TO_CHAR(DESDE, 'YYYY/MM/DD') DESDE,
                    TO_CHAR(HASTA, 'YYYY/MM/DD') HASTA,
                    OBSERVACION,
                    USR_CREADOR,
                    TO_CHAR(FECHA_CREACION, 'YYYY/MM/DD') FECHA_CREACION,
                    ESTADO,
                    TO_CHAR(FECHA_TRASPASO, 'YYYY/MM/DD') FECHA_TRASPASO,
                    USR_TRASPASO,
                    TO_CHAR(FECHA_TERMINO, 'YYYY/MM/DD') FECHA_TERMINO,
                    USR_TERMINO
                FROM NOV_TRAIN_TARIFAS 
                WHERE PK_ANHO = $p_anho
                AND PK_MES = '$p_mes' 
                ORDER BY PK_ANHO DESC, PK_MES DESC";

        $query = $this->db->query($sql);
        return $query->result();
    }

}