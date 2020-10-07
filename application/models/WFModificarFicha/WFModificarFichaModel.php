<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class WFModificarFichaModel extends CI_Model
{

    public function __construct()
    {
        parent::__construct();
        $this->load->database("BD_NOVEDADES");
    }

    public function cagarSolicitudesCambioFicha($p_id, $p_cod_emp, $p_rut, $p_usuario, $p_estado, $p_rol, $p_periodo)
    {
        $sql = "SELECT 
                    SOL.PK_ID,
                    nvl(SOL.COD_CARGO, '') COD_CARGO,
                    SOL.NOM_CARGO,
                    SOL.COD_CC,
                    SOL.NOM_CC,
                    SOL.COD_GERENCIA,
                    SOL.NOM_GERENCIA,
                    SOL.COD_DEPARTAMENTO,
                    SOL.NOM_DEPARTAMENTO,
                    SOL.COD_PLAZO,
                    SOL.NOM_PLAZO,
                    SOL.COD_JORNADA,
                    SOL.NOM_JORNADA,
                    SOL.COD_LUGAR,
                    SOL.NOM_LUGAR,
                    SOL.DESC_BONOS,
                    SOL.SUELDO,
                    nvl(SOL.OBS_CARGO, 'SIN COMENTARIO') OBS_CARGO,
                    nvl(SOL.OBS_CC, 'SIN COMENTARIO') OBS_CC,
                    nvl(SOL.OBS_GERENCIA, 'SIN COMENTARIO') OBS_GERENCIA,
                    nvl(SOL.OBS_DEPARTAMENTO, 'SIN COMENTARIO') OBS_DEPARTAMENTO,
                    nvl(SOL.OBS_PLAZO, 'SIN COMENTARIO') OBS_PLAZO,
                    nvl(SOL.OBS_JORNADA, 'SIN COMENTARIO') OBS_JORNADA,
                    nvl(SOL.OBS_LUGAR, 'SIN COMENTARIO') OBS_LUGAR,
                    nvl(SOL.OBS_SUELDO, 'SIN COMENTARIO') OBS_SUELDO,
                    SOL.TRAS_COD_CARGO,
                    SOL.TRAS_NOM_CARGO,
                    nvl(SOL.OBS_TRAS_CARGO, 'SIN COMENTARIO') OBS_TRAS_CARGO,
                    TO_CHAR(SOL.TRAS_INI, 'YYYY/MM/DD') TRAS_INI,
                    TO_CHAR(SOL.TRAS_FIN, 'YYYY/MM/DD') TRAS_FIN,
                    SOL.TRAS_TIENE_BONO,
                    SOL.TRAS_BONO,
                    SOL.MOTIVO_CAMBIO,
                    SOL.USR_CREADOR,
                    TO_CHAR(SOL.FECHA_CREACION, 'YYYY/MM/DD HH24:MI') FECHA_CREACION,
                    SOL.COD_EMP,
                    SOL.NOM_EMP,
                    SOL.FK_PERSONAL,
                    nvl(SOL.RUT_JEFE, '') RUT_JEFE,
                    nvl(SOL.NOMBRE_JEFE, '') NOMBRE_JEFE,
                    nvl(SOL.OBS_JEFE, 'SIN COMENTARIO') OBS_JEFE,
                    SOL.ESTADO,
                    SOL.FK_CASO,
                    SOL.FK_NOMBRE_WF,
                    SOL.COD_CC_SOL,
                    SOL.PERIODO,
                    SOL.ROL_CREADOR,
                    PER.RUT,
                    PER.NOMBRE,
                    SOL.COD_CARGO_OLD,
                    SOL.NOM_CARGO_OLD,
                    SOL.COD_CC_OLD,
                    SOL.NOM_CC_OLD,
                    SOL.COD_GERENCIA_OLD,
                    SOL.NOM_GERENCIA_OLD,
                    SOL.COD_DEPARTAMENTO_OLD,
                    SOL.NOM_DEPARTAMENTO_OLD,
                    SOL.COD_PLAZO_OLD,
                    SOL.NOM_PLAZO_OLD,
                    SOL.COD_JORNADA_OLD,
                    SOL.NOM_JORNADA_OLD,
                    SOL.COD_LUGAR_OLD,
                    SOL.NOM_LUGAR_OLD,
                    nvl(SOL.RUT_JEFE_OLD, '') RUT_JEFE_OLD,
                    nvl(SOL.NOMBRE_JEFE_OLD, '') NOMBRE_JEFE_OLD,
                    SOL.SUELDO_OLD,
                    (
                        SELECT NVL(FLOOR(SYSDATE - MAX(FECHA_APROB)), 0) 
                        FROM NOV_WF_APROBACIONES APR, NOV_SOL_CAMBIO_FICHA CAM
                        WHERE APR.PFK_SOLICITUD = CAM.PK_ID
                        AND APR.PFK_SOLICITUD = SOL.PK_ID
                        AND CAM.ESTADO = 'ACTIVO'
                        AND PFK_NOMBRE_WF = 'CAMBIO_FICHA'
                    ) DIAS_INAC,
                    (
                        SELECT COUNT(*)
                        FROM NOV_WF_APROBACIONES
                        WHERE PFK_SOLICITUD = SOL.PK_ID
                        AND PFK_NOMBRE_WF = 'CAMBIO_FICHA'
                    ) TOTAL_ETAPA,
                    (
                        SELECT COUNT(*)
                        FROM NOV_WF_APROBACIONES
                        WHERE PFK_SOLICITUD = SOL.PK_ID
                        AND PFK_NOMBRE_WF = 'CAMBIO_FICHA'
                        AND ESTADO = 'EN ESPERA'
                    ) EN_ESPERA_ETAPA,
                    (
                        SELECT COUNT(*)
                        FROM NOV_WF_APROBACIONES
                        WHERE PFK_SOLICITUD = SOL.PK_ID
                        AND PFK_NOMBRE_WF = 'CAMBIO_FICHA'
                        AND ESTADO = 'APROBADO'
                    ) APROBADO_ETAPA,
                    (
                        SELECT COUNT(*)
                        FROM NOV_WF_APROBACIONES
                        WHERE PFK_SOLICITUD = SOL.PK_ID
                        AND PFK_NOMBRE_WF = 'CAMBIO_FICHA'
                        AND ESTADO = 'RECHAZADO'
                    ) RECHAZO_ETAPA
                FROM NOV_SOL_CAMBIO_FICHA SOL, NOV_PERSONAL PER
                WHERE SOL.FK_PERSONAL = PER.PK_PERSONAL ";

        if (!empty($p_rol) && $p_rol != 'ADMIN' && $p_rol != 'SUPER_ADMIN' && $p_rol != 'ANALISTA_RRHH') {
            $sql .= "AND SOL.COD_CC_SOL IN (
                        SELECT PFK_COD_CC 
                        FROM NOV_USUARIOS_CC 
                        WHERE PFK_USUARIO = '$p_usuario'
                        AND PFK_COD_EMP = '$p_cod_emp' )";
        }
        if (!empty($p_id)) {
            $sql .= "AND SOL.PK_ID = $p_id ";
        }

        if (!empty($p_cod_emp)) {
            $sql .= "AND SOL.COD_EMP = '$p_cod_emp' ";
        }

        if (!empty($p_periodo)) {
            $sql .= "AND SOL.PERIODO = '$p_periodo' ";
        }

        if (!empty($p_rut)) {
            $sql .= "AND UPPER(PER.RUT) LIKE(UPPER('%$p_rut%')) ";
        }

        if (!empty($p_estado)) {
            $sql .= "AND SOL.ESTADO = '$p_estado' ";
        }
        $sql .= "ORDER BY SOL.FECHA_CREACION DESC";


        $query = $this->db->query($sql);
        return $query->result();
    }

    public function cargarPersonalVigentePorPrivilegioUsuario($p_cod_emp, $p_usuario, $p_rol) {
        $sql = "SELECT PER.*, PER.NUM_RUT || '-' || PER.DV_RUT || ' ' ||PER.NOMBRE INFO, PER.NUM_RUT || '-' || PER.DV_RUT RUT_FINAL
                FROM NOV_PERSONAL PER,
                (
                    select max(pk_personal) PK_PERSONAL, rut
                    from nov_personal
                    group by rut
                )  PKS ";
        if (!empty($p_rol) && $p_rol != 'ADMIN' && $p_rol != 'SUPER_ADMIN' && $p_rol != 'ANALISTA_RRHH') {
            $sql .= ",NOV_USUARIOS_CC CC ";
        }

        $sql .= "WHERE PER.PK_PERSONAL = PKS.PK_PERSONAL ";
        if (!empty($p_rol) && $p_rol != 'ADMIN' && $p_rol != 'SUPER_ADMIN' && $p_rol != 'ANALISTA_RRHH') {
            $sql .= "AND PER.COD_CC = cc.pfk_cod_cc
                    AND PER.COD_EMP = cc.pfk_cod_emp
                    AND cc.pfk_usuario = '$p_usuario' ";
        }
            
        $sql .= "AND PER.FECHA_BAJA IS NULL
                AND PER.COD_EMP = '$p_cod_emp'
                ORDER BY PER.NUM_RUT ASC";

        $query = $this->db->query($sql);
        return $query->result();
            
    }

    public function cargarRolesWFUsuario($p_usuario, $p_cod_emp) {
        $sql = "SELECT ROL.*
                FROM NOV_WF_ROLES ROL, NOV_WF_USUARIOS_ROLES USR
                WHERE ROL.PK_ROL_WF = USR.PFK_ROL_WF 
                AND USR.PFK_USUARIO = '$p_usuario' 
                AND USR.PFK_COD_EMP = '$p_cod_emp' ";

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function crearSolicitudCambioFicha(
        $P_COD_CARGO,
        $P_NOM_CARGO,
        $P_COD_CC,
        $P_NOM_CC,
        $P_COD_PLAZO,
        $P_NOM_PLAZO,
        $P_COD_JORNADA,
        $P_NOM_JORNADA,
        $P_COD_LUGAR,
        $P_NOM_LUGAR,
        $P_DESC_BONOS,
        $P_SUELDO,
        $P_OBS_CARGO,
        $P_OBS_CC,
        $P_OBS_PLAZO,
        $P_OBS_JORNADA,
        $P_OBS_LUGAR,
        $P_OBS_SUELDO,
        $P_TRAS_COD_CARGO,
        $P_TRAS_NOM_CARGO,
        $P_OBS_TRAS_CARGO,
        $P_TRAS_INI,
        $P_TRAS_FIN,
        $P_TRAS_TIENE_BONO,
        $P_TRAS_BONO,
        $P_MOTIVO_CAMBIO,
        $P_USUARIO,
        $P_COD_EMP,
        $P_NOM_EMP,
        $P_FK_PERSONAL,
        $P_ESTADO,
        $P_ROL_WF,
        $P_COD_CC_SOL,
        $P_PERIODO
    ) {
        $R_EST = 0;
        $R_MSG = "";
        $proc = oci_parse(
            $this->db->conn_id,
            "BEGIN NOV_INS_SOL_CAMBIO_FICHA(
                              :P_COD_CARGO
                            , :P_NOM_CARGO
                            , :P_COD_CC
                            , :P_NOM_CC
                            , :P_COD_PLAZO
                            , :P_NOM_PLAZO
                            , :P_COD_JORNADA
                            , :P_NOM_JORNADA
                            , :P_COD_LUGAR
                            , :P_NOM_LUGAR
                            , :P_DESC_BONOS
                            , :P_SUELDO
                            , :P_OBS_CARGO
                            , :P_OBS_CC
                            , :P_OBS_PLAZO
                            , :P_OBS_JORNADA
                            , :P_OBS_LUGAR
                            , :P_OBS_SUELDO
                            , :P_TRAS_COD_CARGO
                            , :P_TRAS_NOM_CARGO
                            , :P_OBS_TRAS_CARGO
                            , :P_TRAS_INI
                            , :P_TRAS_FIN
                            , :P_TRAS_TIENE_BONO
                            , :P_TRAS_BONO
                            , :P_MOTIVO_CAMBIO
                            , :P_USUARIO
                            , :P_COD_EMP
                            , :P_NOM_EMP
                            , :P_FK_PERSONAL
                            , :P_ESTADO
                            , :P_ROL_WF
                            , :P_COD_CC_SOL
                            , :P_PERIODO
                            , :R_EST
                            , :R_MSG
                            , :R_ID
                            , :R_ROL 
                            , :R_EST_SOL);END;"
        );

        oci_bind_by_name($proc, "P_COD_CARGO", $P_COD_CARGO, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_NOM_CARGO", $P_NOM_CARGO, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_COD_CC", $P_COD_CC, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_NOM_CC", $P_NOM_CC, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_COD_PLAZO", $P_COD_PLAZO, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_NOM_PLAZO", $P_NOM_PLAZO, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_COD_JORNADA", $P_COD_JORNADA, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_NOM_JORNADA", $P_NOM_JORNADA, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_COD_LUGAR", $P_COD_LUGAR, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_NOM_LUGAR", $P_NOM_LUGAR, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_DESC_BONOS", $P_DESC_BONOS, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_SUELDO", $P_SUELDO);
        oci_bind_by_name($proc, "P_OBS_CARGO", $P_OBS_CARGO, 1000, SQLT_CHR);
        oci_bind_by_name($proc, "P_OBS_CC", $P_OBS_CC, 1000, SQLT_CHR);
        oci_bind_by_name($proc, "P_OBS_PLAZO", $P_OBS_PLAZO, 1000, SQLT_CHR);
        oci_bind_by_name($proc, "P_OBS_JORNADA", $P_OBS_JORNADA, 1000, SQLT_CHR);
        oci_bind_by_name($proc, "P_OBS_LUGAR", $P_OBS_LUGAR, 1000, SQLT_CHR);
        oci_bind_by_name($proc, "P_OBS_SUELDO", $P_OBS_SUELDO, 1000, SQLT_CHR);
        oci_bind_by_name($proc, "P_TRAS_COD_CARGO", $P_TRAS_COD_CARGO, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_TRAS_NOM_CARGO", $P_TRAS_NOM_CARGO, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_OBS_TRAS_CARGO", $P_OBS_TRAS_CARGO, 1000, SQLT_CHR);
        oci_bind_by_name($proc, "P_TRAS_INI", $P_TRAS_INI, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_TRAS_FIN", $P_TRAS_FIN, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_TRAS_TIENE_BONO", $P_TRAS_TIENE_BONO, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_TRAS_BONO", $P_TRAS_BONO);
        oci_bind_by_name($proc, "P_MOTIVO_CAMBIO", $P_MOTIVO_CAMBIO, 1000, SQLT_CHR);
        oci_bind_by_name($proc, "P_USUARIO", $P_USUARIO, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_COD_EMP", $P_COD_EMP, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_NOM_EMP", $P_NOM_EMP, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_FK_PERSONAL", $P_FK_PERSONAL);
        oci_bind_by_name($proc, "P_ESTADO", $P_ESTADO, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_ROL_WF", $P_ROL_WF, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_COD_CC_SOL", $P_COD_CC_SOL, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_PERIODO", $P_PERIODO, 20, SQLT_CHR);

        oci_bind_by_name($proc, "R_EST", $R_EST, -1, OCI_B_INT);
        oci_bind_by_name($proc, "R_MSG", $R_MSG, 200, SQLT_CHR);

        oci_bind_by_name($proc, "R_ID", $R_ID, -1, OCI_B_INT);
        oci_bind_by_name($proc, "R_ROL", $R_ROL, 20, SQLT_CHR);
        oci_bind_by_name($proc, "R_EST_SOL", $R_EST_SOL, 20, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $R_EST, 'r_msg' => $R_MSG, 'r_id' => $R_ID, 'r_rol' => $R_ROL, 'r_est_sol' => $R_EST_SOL);
        return $result;
    }



    public function cambiarEstadoEtapaSolCambioFicha(
        $P_ID,
        $P_ROL_WF,
        $P_USUARIO,
        $P_ESTADO
    ) {
        $R_EST = 0;
        $R_MSG = "";
        $R_ID = 0;
        $R_ROL = "";
        $R_EST_SOL = "";

        $proc = oci_parse(
            $this->db->conn_id,
            "BEGIN NOV_EST_SOL_CAMBIO_FICHA(
                              :P_ID
                            , :P_ROL_WF
                            , :P_USUARIO
                            , :P_ESTADO
                            , :R_EST
                            , :R_MSG
                            , :R_ID
                            , :R_ROL 
                            , :R_EST_SOL);END;"
        );

        oci_bind_by_name($proc, "P_ID", $P_ID, -1, OCI_B_INT);
        oci_bind_by_name($proc, "P_ROL_WF", $P_ROL_WF, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_USUARIO", $P_USUARIO, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_ESTADO", $P_ESTADO, 20, SQLT_CHR);

        oci_bind_by_name($proc, "R_EST", $R_EST, -1, OCI_B_INT);
        oci_bind_by_name($proc, "R_MSG", $R_MSG, 200, SQLT_CHR);

        oci_bind_by_name($proc, "R_ID", $R_ID, -1, OCI_B_INT);
        oci_bind_by_name($proc, "R_ROL", $R_ROL, 20, SQLT_CHR);
        oci_bind_by_name($proc, "R_EST_SOL", $R_EST_SOL, 20, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $R_EST, 'r_msg' => $R_MSG, 'r_id' => $R_ID, 'r_rol' => $R_ROL, 'r_est_sol' => $R_EST_SOL);
        return $result;
    }

    public function anularSolicitudCambioFicha(
        $P_ID,
        $P_USUARIO
    ) {
        $R_EST = 0;
        $R_MSG = "";
        $proc = oci_parse(
            $this->db->conn_id,
            "BEGIN NOV_ANU_SOL_CAMBIO_FICHA(
                              :P_ID
                            , :P_USUARIO
                            , :R_EST
                            , :R_MSG);END;"
        );

        oci_bind_by_name($proc, "P_ID", $P_ID, -1, OCI_B_INT);
        oci_bind_by_name($proc, "P_USUARIO", $P_USUARIO, 100, SQLT_CHR);
        oci_bind_by_name($proc, "R_EST", $R_EST, -1, OCI_B_INT);
        oci_bind_by_name($proc, "R_MSG", $R_MSG, 200, SQLT_CHR);
        oci_execute($proc);

        $result = array('r_est' => $R_EST, 'r_msg' => $R_MSG);
        return $result;
    }

    public function cargarEtapasCambiarficha($p_id) {
        $sql = "select 
                    PFK_SOLICITUD,
                    PFK_NOMBRE_WF,
                    PFK_CASO,
                    PFK_ETAPA,
                    FK_ROL_WF,
                    ESTADO,
                    TO_CHAR(FECHA_APROB, 'YYYY/MM/DD HH24:MI') FECHA_APROB,
                    USR_APROB
                from nov_wf_aprobaciones
                where pfk_nombre_wf = 'CAMBIO_FICHA'
                and pfk_solicitud = $p_id
                order by pfk_etapa asc";

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function validarRolEtapa1($p_rol) {
        $sql = "select 
                    count(*) CONTAR
                from NOV_WF_PROCESO
                where pfk_nombre_wf = 'CAMBIO_FICHA'
                and pk_etapa = '1'
                and fk_rol_wf = '$p_rol' ";

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function enviarCorreoCambioEtapaWFCambioFicha(
          $P_ID 
        , $P_COD_EMP 
        , $P_COD_CC 
        , $P_ROL_WF 
        , $P_ESTADO_SOL 
    ) {

        $proc = oci_parse(
            $this->db->conn_id,
            "BEGIN NOV_CORREO_SOL_CAMBIO_FICHA(
                              :P_ID
                            , :P_COD_EMP
                            , :P_COD_CC
                            , :P_ROL_WF
                            , :P_ESTADO_SOL);END;"
        );

        oci_bind_by_name($proc, "P_ID", $P_ID, -1, OCI_B_INT);
        oci_bind_by_name($proc, "P_ROL_WF", $P_ROL_WF, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_COD_EMP", $P_COD_EMP, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_ESTADO_SOL", $P_ESTADO_SOL, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_COD_CC", $P_COD_CC, 20, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => 0, 'r_msg' => 'OK');
        return $result;
    }
}
