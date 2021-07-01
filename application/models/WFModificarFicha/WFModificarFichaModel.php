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
                    SOL.SUELDO, 
                    nvl(SOL.OBSERVACION, 'SIN COMENTARIO') OBSERVACION, 
                    SOL.TRAS_COD_CARGO, 
                    SOL.TRAS_NOM_CARGO, 
                    TO_CHAR(SOL.TRAS_INI, 'YYYY/MM/DD') TRAS_INI, 
                    TO_CHAR(SOL.TRAS_FIN, 'YYYY/MM/DD') TRAS_FIN, 
                    SOL.TRAS_TIENE_BONO, SOL.TRAS_BONO, 
                    SOL.USR_CREADOR, 
                    TO_CHAR(SOL.FECHA_CREACION, 'YYYY/MM/DD HH24:MI') FECHA_CREACION, 
                    SOL.COD_EMP, 
                    SOL.NOM_EMP, 
                    nvl(SOL.RUT_JEFE, '') RUT_JEFE, 
                    nvl(SOL.NOMBRE_JEFE, '') NOMBRE_JEFE, 
                    SOL.ESTADO, SOL.FK_CASO, 
                    SOL.FK_NOMBRE_WF, 
                    SOL.COD_CC_SOL, 
                    SOL.PERIODO, 
                    SOL.OBSERVACION,
                    SOL.COD_CONTRATO,
                    SOL.NOM_CONTRATO,
                    SOL.TIPO,
                    SOL.COD_MOTIVO,
                    SOL.NOM_MOTIVO,
                    SOL.ROL_CREADOR, 
                    SOL.TRAS_COD_CC, 
                    SOL.TRAS_NOM_CC, 
                    SOL.TRAS_COD_CONTRATO, 
                    SOL.TRAS_NOM_CONTRATO, 
                    SOL.TRAS_INDEFINIDO, 
                    SOL.MID_POINT, 
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
                FROM NOV_SOL_CAMBIO_FICHA SOL 
                WHERE 1 = 1 ";

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

        if (!empty($p_rut)) {
            $sql .= "AND PK_ID IN (SELECT DISTINCT PFK_ID FROM NOV_SOL_CAMBIO_FICHA_DET WHERE RUT LIKE '%$p_rut%') ";
        }

        if (!empty($p_cod_emp)) {
            $sql .= "AND SOL.COD_EMP = '$p_cod_emp' ";
        }

        if (!empty($p_periodo)) {
            $sql .= "AND SOL.PERIODO = '$p_periodo' ";
        }

        if (!empty($p_estado)) {
            $sql .= "AND SOL.ESTADO = '$p_estado' ";
        }
        $sql .= "ORDER BY SOL.FECHA_CREACION DESC";


        $query = $this->db->query($sql);
        return $query->result();
    }

    public function cargarSolicitudesCambioFichaDet($p_id) {
        $sql = "SELECT 
                    PFK_ID,
                    PFK_PERSONAL,
                    RUT,
                    NOMBRE,
                    COD_CARGO,
                    NOM_CARGO,
                    COD_CC,
                    NOM_CC,
                    COD_GERENCIA,
                    NOM_GERENCIA,
                    COD_DEPARTAMENTO,
                    NOM_DEPARTAMENTO,
                    COD_PLAZO,
                    NOM_PLAZO,
                    COD_JORNADA,
                    NOM_JORNADA,
                    COD_LUGAR,
                    NOM_LUGAR,
                    SUELDO,
                    COD_EMP,
                    NOM_EMP,
                    RUT_JEFE,
                    NOM_JEFE
                FROM NOV_SOL_CAMBIO_FICHA_DET 
                WHERE PFK_ID = $p_id ";
        
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
        $P_SUELDO,
        $P_TRAS_COD_CARGO,
        $P_TRAS_NOM_CARGO,
        $P_TRAS_INI,
        $P_TRAS_FIN,
        $P_TRAS_TIENE_BONO,
        $P_TRAS_BONO,
        $P_USUARIO,
        $P_COD_EMP,
        $P_NOM_EMP,
        $P_ESTADO,
        $P_ROL_WF,
        $P_COD_CC_SOL,
        $P_PERIODO,
        $P_OBSERVACION,
        $P_COD_CONTRATO,
        $P_NOM_CONTRATO,
        $P_TIPO,
        $P_COD_MOTIVO,
        $P_NOM_MOTIVO,
        $P_TRAS_COD_CC,
        $P_TRAS_NOM_CC,
        $P_TRAS_COD_CONTRATO,
        $P_TRAS_NOM_CONTRATO,
        $P_TRAS_INDEFINIDO,
        $P_MID_POINT
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
                            , :P_SUELDO
                            , :P_TRAS_COD_CARGO
                            , :P_TRAS_NOM_CARGO
                            , :P_TRAS_INI
                            , :P_TRAS_FIN
                            , :P_TRAS_TIENE_BONO
                            , :P_TRAS_BONO
                            , :P_USUARIO
                            , :P_COD_EMP
                            , :P_NOM_EMP
                            , :P_ESTADO
                            , :P_ROL_WF
                            , :P_COD_CC_SOL
                            , :P_PERIODO
                            , :P_OBSERVACION
                            , :P_COD_CONTRATO
                            , :P_NOM_CONTRATO
                            , :P_TIPO
                            , :P_COD_MOTIVO
                            , :P_NOM_MOTIVO
                            , :P_TRAS_COD_CC
                            , :P_TRAS_NOM_CC
                            , :P_TRAS_COD_CONTRATO
                            , :P_TRAS_NOM_CONTRATO
                            , :P_TRAS_INDEFINIDO
                            , :P_MID_POINT
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
        oci_bind_by_name($proc, "P_SUELDO", $P_SUELDO);
        oci_bind_by_name($proc, "P_TRAS_COD_CARGO", $P_TRAS_COD_CARGO, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_TRAS_NOM_CARGO", $P_TRAS_NOM_CARGO, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_TRAS_INI", $P_TRAS_INI, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_TRAS_FIN", $P_TRAS_FIN, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_TRAS_TIENE_BONO", $P_TRAS_TIENE_BONO, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_TRAS_BONO", $P_TRAS_BONO);
        oci_bind_by_name($proc, "P_USUARIO", $P_USUARIO, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_COD_EMP", $P_COD_EMP, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_NOM_EMP", $P_NOM_EMP, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_ESTADO", $P_ESTADO, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_ROL_WF", $P_ROL_WF, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_COD_CC_SOL", $P_COD_CC_SOL, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_PERIODO", $P_PERIODO, 20, SQLT_CHR);
        
        oci_bind_by_name($proc, "P_OBSERVACION", $P_OBSERVACION, 1000, SQLT_CHR);
        oci_bind_by_name($proc, "P_COD_CONTRATO", $P_COD_CONTRATO, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_NOM_CONTRATO", $P_NOM_CONTRATO, 1000, SQLT_CHR);
        oci_bind_by_name($proc, "P_TIPO", $P_TIPO, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_COD_MOTIVO", $P_COD_MOTIVO, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_NOM_MOTIVO", $P_NOM_MOTIVO, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_TRAS_COD_CC", $P_TRAS_COD_CC, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_TRAS_NOM_CC", $P_TRAS_NOM_CC, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_TRAS_COD_CONTRATO", $P_TRAS_COD_CONTRATO, 100, SQLT_CHR);
        oci_bind_by_name($proc, "P_TRAS_NOM_CONTRATO", $P_TRAS_NOM_CONTRATO, 2000, SQLT_CHR);
        oci_bind_by_name($proc, "P_TRAS_INDEFINIDO", $P_TRAS_INDEFINIDO, 1, SQLT_CHR);
        oci_bind_by_name($proc, "P_MID_POINT", $P_MID_POINT, 1, SQLT_CHR);

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
        $P_ESTADO,
        $P_OBSERVACION
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
                            , :P_OBSERVACION
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
        oci_bind_by_name($proc, "P_OBSERVACION", $P_OBSERVACION, 1000, SQLT_CHR);

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
                    USR_APROB,
                    OBSERVACION
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

    public function crearSolicitudCambioFichaDet(
        $P_ID_SOLICITUD,
        $P_ID_PERSONAL,
        $P_USUARIO
    ) {
        $R_EST = 0;
        $R_MSG = "";
        $proc = oci_parse(
            $this->db->conn_id,
            "BEGIN NOV_INS_SOL_CAMBIO_FICHA_DET(
                              :P_ID_SOLICITUD
                            , :P_ID_PERSONAL
                            , :P_USUARIO
                            , :R_EST
                            , :R_MSG);END;"
        );

        oci_bind_by_name($proc, "P_ID_SOLICITUD", $P_ID_SOLICITUD, -1, OCI_B_INT);
        oci_bind_by_name($proc, "P_ID_PERSONAL", $P_ID_PERSONAL, -1, OCI_B_INT);
        oci_bind_by_name($proc, "P_USUARIO", $P_USUARIO, 100, SQLT_CHR);
        oci_bind_by_name($proc, "R_EST", $R_EST, -1, OCI_B_INT);
        oci_bind_by_name($proc, "R_MSG", $R_MSG, 500, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => 0, 'r_msg' => 'OK');
        return $result;
    }

    
}
