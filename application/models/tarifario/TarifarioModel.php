<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class TarifarioModel extends CI_Model
{

    public function __construct()
    {
        parent::__construct();
        $this->load->database("BD_NOVEDADES");
    }

    public function cargarTarifas()
    {
        $sql = "SELECT 
                    NRO_SOLICITUD,
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
                FROM TRAIN_TARIFAS 
                ORDER BY NRO_SOLICITUD ASC";

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function cargarSimulacionFactor(
        $p_factor,
        $p_bono_conductor, 
        $p_bono_conductor_sec, 
        $p_viatico, 
        $p_valor, 
        $p_ton_27_5, 
        $p_peaje,
        $p_tiempo_espera,
        $p_bono_sqm,
        $p_mp_vacio)
    {
        $sql = "SELECT 
            NRO_SOLICITUD,
            RUT,
            RAZON_SOCIAL,
            ID_RUTA,
            SERVICIO,
            round(case when $p_bono_conductor = 1 then nvl(BONO_CONDUCTOR, 0) + nvl(BONO_CONDUCTOR, 0) * $p_factor else nvl(BONO_CONDUCTOR, 0) end) BONO_CONDUCTOR,
            round(case when $p_bono_conductor_sec = 1 then nvl(BONO_CONDUCTOR_SEC, 0) + nvl(BONO_CONDUCTOR_SEC, 0) * $p_factor else nvl(BONO_CONDUCTOR_SEC, 0) end) BONO_CONDUCTOR_SEC,
            round(case when $p_viatico = 1 then nvl(VIATICO, 0) + nvl(VIATICO, 0) * $p_factor else nvl(VIATICO, 0) end) VIATICO,
            round(case when $p_valor = 1 then nvl(VALOR, 0) + nvl(VALOR, 0) * $p_factor else nvl(VALOR, 0) end) VALOR,
            round(case when $p_ton_27_5 = 1 then nvl(TON_27_5, 0) + nvl(TON_27_5, 0) * $p_factor else nvl(TON_27_5, 0) end) TON_27_5,
            round(case when $p_peaje = 1 then nvl(PEAJE, 0) + nvl(PEAJE, 0) * $p_factor else nvl(PEAJE, 0) end) PEAJE,
            round(case when $p_tiempo_espera = 1 then nvl(TIEMPO_ESPERA, 0) + nvl(TIEMPO_ESPERA, 0) * $p_factor else nvl(TIEMPO_ESPERA, 0) end) TIEMPO_ESPERA,
            nvl(FACTOR_TE, 0)  FACTOR_TE,
            round(case when $p_bono_sqm = 1 then nvl(BONO_SQM, 0) + nvl(BONO_SQM, 0) * $p_factor else nvl(BONO_SQM, 0) end) BONO_SQM,
            round(case when $p_mp_vacio = 1 then nvl(MP_VACIO, 0) + nvl(MP_VACIO, 0) * $p_mp_vacio else nvl(MP_VACIO, 0) end) MP_VACIO
        FROM TRAIN_TARIFAS 
        ORDER BY NRO_SOLICITUD ASC";

        $query = $this->db->query($sql);
        return $query->result();
    }

    
    public function crearTarifa(
        $p_nro_solicitud, 
        $p_rut, 
        $p_razon_social, 
        $p_id_ruta, 
        $p_servicio, 
        $p_bono_conductor, 
        $p_bono_conductor_sec, 
        $p_viatico, 
        $p_valor, 
        $p_ton_27_5, 
        $p_peaje,
        $p_tiempo_espera, 
        $p_factor_te, 
        $p_bono_sqm, 
        $p_mp_vacio, 
        $p_usuario)
    {

        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
            $this->db->conn_id,
            "BEGIN NOV_INS_TRAIN_TARIFA(
                            :p_nro_solicitud, 
                            :p_rut, 
                            :p_razon_social, 
                            :p_id_ruta, 
                            :p_servicio, 
                            :p_bono_conductor, 
                            :p_bono_conductor_sec, 
                            :p_viatico, 
                            :p_valor, 
                            :p_ton_27_5, 
                            :p_peaje,
                            :p_tiempo_espera, 
                            :p_factor_te, 
                            :p_bono_sqm, 
                            :p_mp_vacio,
                            :p_usuario,
                            :r_est,
                            :r_msg); END;"
        );


        oci_bind_by_name($proc, "p_nro_solicitud", $p_nro_solicitud);
        oci_bind_by_name($proc, "p_rut", $p_rut, 20, SQLT_CHR);
        oci_bind_by_name($proc, "p_razon_social", $p_razon_social, 100, SQLT_CHR);
        oci_bind_by_name($proc, "p_id_ruta", $p_id_ruta);
        oci_bind_by_name($proc, "p_servicio", $p_servicio, 100, SQLT_CHR);
        oci_bind_by_name($proc, "p_bono_conductor", $p_bono_conductor);
        oci_bind_by_name($proc, "p_bono_conductor_sec", $p_bono_conductor_sec);
        oci_bind_by_name($proc, "p_viatico", $p_viatico);
        oci_bind_by_name($proc, "p_valor", $p_valor);
        oci_bind_by_name($proc, "p_ton_27_5", $p_ton_27_5);
        oci_bind_by_name($proc, "p_peaje", $p_peaje);
        oci_bind_by_name($proc, "p_tiempo_espera", $p_tiempo_espera);
        oci_bind_by_name($proc, "p_factor_te", $p_factor_te);
        oci_bind_by_name($proc, "p_bono_sqm", $p_bono_sqm);
        oci_bind_by_name($proc, "p_mp_vacio", $p_mp_vacio);
        oci_bind_by_name($proc, "p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc, "r_est", $r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc, "r_msg", $r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }

    public function copiarTarifa(
        $p_anho, 
        $p_mes, 
        $p_usuario)
    {

        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
            $this->db->conn_id,
            "BEGIN NOV_COPIAR_TRAIN_TARIFA(
                            :p_anho, 
                            :p_mes, 
                            :p_usuario,
                            :r_est,
                            :r_msg); END;"
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


    public function modificarTarifa(
        $p_nro_solicitud, 
        $p_rut, 
        $p_razon_social, 
        $p_id_ruta, 
        $p_servicio, 
        $p_bono_conductor, 
        $p_bono_conductor_sec, 
        $p_viatico, 
        $p_valor, 
        $p_ton_27_5, 
        $p_peaje,
        $p_tiempo_espera, 
        $p_factor_te, 
        $p_bono_sqm, 
        $p_mp_vacio, 
        $p_usuario)
    {

        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
            $this->db->conn_id,
            "BEGIN NOV_UPD_TRAIN_TARIFA(
                            :p_nro_solicitud, 
                            :p_rut, 
                            :p_razon_social, 
                            :p_id_ruta, 
                            :p_servicio, 
                            :p_bono_conductor, 
                            :p_bono_conductor_sec, 
                            :p_viatico, 
                            :p_valor, 
                            :p_ton_27_5, 
                            :p_peaje,
                            :p_tiempo_espera, 
                            :p_factor_te, 
                            :p_bono_sqm, 
                            :p_mp_vacio,
                            :p_usuario,
                            :r_est,
                            :r_msg); END;"
        );


        oci_bind_by_name($proc, "p_nro_solicitud", $p_nro_solicitud);
        oci_bind_by_name($proc, "p_rut", $p_rut, 20, SQLT_CHR);
        oci_bind_by_name($proc, "p_razon_social", $p_razon_social, 100, SQLT_CHR);
        oci_bind_by_name($proc, "p_id_ruta", $p_id_ruta);
        oci_bind_by_name($proc, "p_servicio", $p_servicio, 100, SQLT_CHR);
        oci_bind_by_name($proc, "p_bono_conductor", $p_bono_conductor);
        oci_bind_by_name($proc, "p_bono_conductor_sec", $p_bono_conductor_sec);
        oci_bind_by_name($proc, "p_viatico", $p_viatico);
        oci_bind_by_name($proc, "p_valor", $p_valor);
        oci_bind_by_name($proc, "p_ton_27_5", $p_ton_27_5);
        oci_bind_by_name($proc, "p_peaje", $p_peaje);
        oci_bind_by_name($proc, "p_tiempo_espera", $p_tiempo_espera);
        oci_bind_by_name($proc, "p_factor_te", $p_factor_te);
        oci_bind_by_name($proc, "p_bono_sqm", $p_bono_sqm);
        oci_bind_by_name($proc, "p_mp_vacio", $p_mp_vacio);
        oci_bind_by_name($proc, "p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc, "r_est", $r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc, "r_msg", $r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }


    public function eliminarTarifa(
        $p_nro_solicitud,
        $p_usuario)
    {

        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
            $this->db->conn_id,
            "BEGIN NOV_DEL_TRAIN_TARIFA(
                            :p_nro_solicitud, 
                            :p_usuario,
                            :r_est,
                            :r_msg); END;"
        );


        oci_bind_by_name($proc, "p_nro_solicitud", $p_nro_solicitud);
        oci_bind_by_name($proc, "p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc, "r_est", $r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc, "r_msg", $r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }

    public function agregarFactorTarifa(
        $p_factor,
        $p_bono_conductor, 
        $p_bono_conductor_sec, 
        $p_viatico, 
        $p_valor, 
        $p_ton_27_5, 
        $p_peaje,
        $p_tiempo_espera,
        $p_bono_sqm, 
        $p_mp_vacio, 
        $p_usuario)
    {

        $r_est = 0;
        $r_msg = "";

        $proc = oci_parse(
            $this->db->conn_id,
            "BEGIN NOV_FACTOR_TRAIN_TARIFA(
                :p_factor,
                :p_bono_conductor, 
                :p_bono_conductor_sec, 
                :p_viatico, 
                :p_valor, 
                :p_ton_27_5, 
                :p_peaje,
                :p_tiempo_espera,
                :p_bono_sqm, 
                :p_mp_vacio,
                :p_usuario,
                :r_est,
                :r_msg); END;"
        );

        oci_bind_by_name($proc, "p_factor", $p_factor);
        oci_bind_by_name($proc, "p_bono_conductor", $p_bono_conductor);
        oci_bind_by_name($proc, "p_bono_conductor_sec", $p_bono_conductor_sec);
        oci_bind_by_name($proc, "p_viatico", $p_viatico);
        oci_bind_by_name($proc, "p_valor", $p_valor);
        oci_bind_by_name($proc, "p_ton_27_5", $p_ton_27_5);
        oci_bind_by_name($proc, "p_peaje", $p_peaje);
        oci_bind_by_name($proc, "p_tiempo_espera", $p_tiempo_espera);
        oci_bind_by_name($proc, "p_bono_sqm", $p_bono_sqm);
        oci_bind_by_name($proc, "p_mp_vacio", $p_mp_vacio);
        oci_bind_by_name($proc, "p_usuario", $p_usuario, 100, SQLT_CHR);
        oci_bind_by_name($proc, "r_est", $r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc, "r_msg", $r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }

    public function cargarSolicitud($p_solicitud) {
        $sql = "SELECT 
                    COD_NEGOCIO,
                    COD_SERVICIO,
                    COD_SUBTIPO_SS,
                    COD_TIPO_SS,
                    DESCRIPCION,
                    ID_RUTA,
                    KLM,
                    MERCADO,
                    NRO_SOLICITUD,
                    PRODUCTO,
                    RAZON_SOCIAL,
                    RUT_CLIENTE,
                    UNIDAD 
                FROM train_solicitudes
                WHERE NRO_SOLICITUD = $p_solicitud";

        $query = $this->db->query($sql);
        return $query->result();
    }
}
