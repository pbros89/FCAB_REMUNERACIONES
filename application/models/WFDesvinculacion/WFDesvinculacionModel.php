<?php
if (!defined('BASEPATH')) exit('No se permite el acceso directo a este directorio');

class WFDesvinculacionModel extends CI_Model {
    public function __construct() {
        parent::__construct();
        $this->load->database("BD_NOVEDADES");
    }

    public function misRoles($usuario){

        $sql = "SELECT
                    u.pfk_rol_wf rol,
                    r.nombre,
                    (
                        SELECT
                            MIN(pk_etapa)
                        FROM
                            nov_wf_proceso
                        WHERE
                            pfk_nombre_wf = 'DESVINCULACION'
                            AND fk_rol_wf = u.pfk_rol_wf
                    ) etapa
                FROM
                    nov_wf_usuarios_roles   u,
                    nov_wf_roles            r
                WHERE
                    u.pfk_usuario = '$usuario'
                    AND u.pfk_rol_wf = r.pk_rol_wf";

        $query = $this->db->query($sql);
        return $query->result();

    }

    public function listRutNombre($cod_emp, $cod_usr){

        $sql = "SELECT 
                    ( p.rut
                    || ' | '
                    || p.nombre ) rutnom,
                    p.rut,
                    p.pk_personal
                FROM
                    nov_personal p
                WHERE
                    p.fecha_baja IS NULL
                    AND p.cod_emp = '$cod_emp'
                    AND p.pk_personal = ( SELECT
                                            max (pk_personal)
                                        FROM
                                            nov_personal
                                        WHERE
                                            rut = p.rut
                                            AND cod_emp = '$cod_emp'
                                        )";

        if(!empty($rol_usr) && $rol_usr!='ADMIN' && $rol_usr!='SUPER_ADMIN' && $rol_usr!= 'ANALISTA_RRHH'){
            $sql .= "AND cod_cc IN(
                        SELECT pfk_cod_cc
                        FROM nov_usuarios_cc
                        WHERE pfk_usuario = '$cod_usr'
                        AND pfk_cod_emp = '$cod_emp')";
        }

        $sql .= "ORDER BY
                    rutNom";

        $query = $this->db->query($sql);
        return $query->result();

    }

    public function datosPersonal($p_id){

        $sql = "SELECT
                    p.rut,
                    substr(p.nombre, instr(p.nombre, ',') + 1) nombres,
                    substr(p.nombre, 0, instr(p.nombre, ',') - 1) apellidos,
                    p.nom_emp empresa,
                    p.nom_departamento departamento,
                    p.nom_gerencia gerencia,
                    p.rol rol    
                FROM
                    nov_personal p
                WHERE
                    p.pk_personal = '$p_id'
                    AND p.fecha_baja IS NULL
                    AND ROWNUM = 1";

        $query = $this->db->query($sql);
        return $query->result();

    }

    public function listCausalesDespido($cod_emp){

        $sql = "SELECT 
                    nombre,
                    pk_param codigo
                FROM 
                    nov_parametros
                WHERE 
                    pfk_tipo_param = 'CAUSAL_DESPIDO'
                    AND pfk_cod_emp = '$cod_emp'
                ORDER BY 
                    pk_param";

        $query = $this->db->query($sql);
        return $query->result();

    }

    public function guardarSolDesvinculacion($listado_lineas){

        $detalle = json_decode($listado_lineas,true);
        
        $r_est = 0;
        $r_msg = "OK"; 

        foreach ($detalle as $alerta) {

            $usuario = $alerta['usuario'];
            $empresa = $alerta['empresa'];
            $rol = $alerta['rol'];
            $personal = $alerta['personal'];
            $finiquito = $alerta['finiquito'];
            $carta = $alerta['carta'];
            $causal = $alerta['causal'];
            $causal2 = $alerta['causal2'];
            $hechos = $alerta['hechos'];
            $motivo = $alerta['motivo'];
            $equipos = $alerta['equipos'];
            $celu = $alerta['celu'];
            $docs = $alerta['docs'];
            $caja = $alerta['caja'];
            $vehiculo = $alerta['vehiculo'];
            $estado = $alerta['estado'];

            $proc = oci_parse($this->db->conn_id, "

                                                BEGIN

                                                NOV_WF_INS_SOL_DESVINCULACION(
                                                        :P_USUARIO,
                                                        :P_EMPRESA,
                                                        :P_ROL,
                                                        :P_PERSONAL,
                                                        :P_FINIQUITO,
                                                        :P_CARTA,
                                                        :P_CAUSAL,
                                                        :P_CAUSAL2,
                                                        :P_HECHOS,
                                                        :P_MOTIVO,
                                                        :P_EQUIPOS,
                                                        :P_CELU,
                                                        :P_DOCS,
                                                        :P_CAJA,
                                                        :P_VEHICULO,
                                                        :P_ESTADO,
                                                        :ESTADO,
                                                        :MENSAJE
                                                );
                                                END;");

            oci_bind_by_name($proc,"P_USUARIO",$usuario, 40, SQLT_CHR);
            oci_bind_by_name($proc,"P_EMPRESA",$empresa, 40, SQLT_CHR);                                  
            oci_bind_by_name($proc,"P_ROL",$rol, 40, SQLT_CHR);
            oci_bind_by_name($proc,"P_PERSONAL",$personal, -1, OCI_B_INT);
            oci_bind_by_name($proc,"P_FINIQUITO",$finiquito, 40, SQLT_CHR);
            oci_bind_by_name($proc,"P_CARTA",$carta, 2, SQLT_CHR);
            oci_bind_by_name($proc,"P_CAUSAL",$causal, 40, SQLT_CHR);
            oci_bind_by_name($proc,"P_CAUSAL2",$causal2, 40, SQLT_CHR);
            oci_bind_by_name($proc,"P_HECHOS",$hechos, 500, SQLT_CHR);
            oci_bind_by_name($proc,"P_MOTIVO",$motivo, 500, SQLT_CHR);
            oci_bind_by_name($proc,"P_EQUIPOS",$equipos, 2, SQLT_CHR); 
            oci_bind_by_name($proc,"P_CELU",$celu, 2, SQLT_CHR); 
            oci_bind_by_name($proc,"P_DOCS",$docs, 2, SQLT_CHR); 
            oci_bind_by_name($proc,"P_CAJA",$caja, 2, SQLT_CHR); 
            oci_bind_by_name($proc,"P_VEHICULO",$vehiculo, 100, SQLT_CHR); 
            oci_bind_by_name($proc,"P_ESTADO",$estado, 20, SQLT_CHR); 
            oci_bind_by_name($proc,"ESTADO",$r_est,  -1, OCI_B_INT); 
            oci_bind_by_name($proc,"MENSAJE",$r_msg, 1100, SQLT_CHR);

            oci_execute($proc);

            if($r_est < 0){
                $result = array('r_est' => $r_est, 'r_msg' => $r_msg);   
                return $result;      
            }

        }

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);    
        return $result; 
    }

    public function listaDesvinculaciones($cod_emp, $cod_usr, $rol_usr){

        $sql = "SELECT
                    p.rut,
                    p.nombre,
                    d.pk_solicitud    numero,
                    d.pfk_personal    personal,
                    d.fecha_solicitud fecha,
                    d.usr_creador     creador,
                    d.fecha_finiquito finiquito,
                    d.causal_desp     causal,
                    d.causal_desp_2   causal_2,
                    d.carta_aviso     carta,
                    d.det_hechos      hechos,
                    d.det_motivo      motivo,
                    d.equip_comp      equipos,
                    d.celular,
                    d.documentos,
                    d.caja_chica,
                    d.det_vehiculos   vehiculos,
                    d.estado,
                    d.fk_caso
                FROM
                    nov_sol_desvinculacion   d,
                    nov_personal             p
                WHERE
                    d.pfk_personal = p.pk_personal
                    AND d.fk_cod_emp = '$cod_emp'";
        if(!empty($rol_usr) && $rol_usr!='ADMIN' && $rol_usr!='SUPER_ADMIN' && $rol_usr!= 'ANALISTA_RRHH'){
            $sql .= "AND d.cod_cc IN(
                        SELECT pfk_cod_cc
                        FROM nov_usuarios_cc
                        WHERE pfk_usuario = '$cod_usr'
                        AND pfk_cod_emp = '$cod_emp')";
        }
        $sql .= "ORDER BY
                        d.estado,
                        d.pk_num_desv";

        $query = $this->db->query($sql);
        return $query->result();

    }

    public function detalleDesvinculacion($numero, $cod_emp){

        $sql = "SELECT
                    d.pk_solicitud    numero,
                    d.pfk_personal    personal,
                    d.fecha_solicitud fecha,
                    d.usr_creador     creador,
                    d.fecha_finiquito finiquito,
                    d.carta_aviso     carta,
                    d.det_hechos      hechos,
                    d.det_motivo      motivo,
                    d.equip_comp      equipos,
                    d.celular,
                    d.documentos,
                    d.caja_chica,
                    d.det_vehiculos   vehiculos,
                    d.estado,
                    d.fk_caso,
                    p1.nombre causal,
                    CASE
                        WHEN d.causal_desp_2 IS NULL THEN null
                        ELSE (SELECT NOMBRE FROM NOV_PARAMETROS WHERE pk_param = d.causal_desp_2 AND pfk_cod_emp = '$cod_emp'  AND pfk_tipo_param = 'CAUSAL_DESPIDO')
                    END causal_2
                FROM
                    nov_sol_desvinculacion d,
                    nov_parametros p1
                WHERE
                    d.pk_solicitud = '$numero'
                    AND p1.pk_param = d.causal_desp
                    AND p1.pfk_cod_emp = '$cod_emp'
                    AND p1.pfk_tipo_param = 'CAUSAL_DESPIDO'";

        $query = $this->db->query($sql);
        return $query->result();

    }

    public function detalleCasoWF($wf, $caso){

        $sql = "SELECT
                    pfk_caso caso,
                    pk_etapa etapa,
                    fk_rol_wf rol
                FROM
                    nov_wf_proceso
                WHERE
                    pfk_nombre_wf = '$wf'
                    and pfk_caso = $caso";

        $query = $this->db->query($sql);
        return $query->result();

    }

    public function detalleAprobacionWF($numero){

        $sql = "SELECT
                    pfk_etapa etapa,
                    usr_aprob usuario,
                    estado
                FROM
                    nov_wf_aprobaciones
                WHERE
                    pfk_solicitud ='$numero'
                    AND pfk_nombre_wf = 'DESVINCULACION'";

        $query = $this->db->query($sql);
        return $query->result();

    }

    public function anularSolDesvinculacion($P_NUMERO, $P_USUARIO) {

        $r_est = 0;
        $r_msg = "";
        $proc = oci_parse(
            $this->db->conn_id,
            "BEGIN NOV_WF_ANU_SOLDESVINCULACION(
                :P_NUMERO,
                :P_USUARIO,
                :r_est,
                :r_msg);
            END;"
        );

        oci_bind_by_name($proc, "P_NUMERO", $P_NUMERO, -1, OCI_B_INT);
        oci_bind_by_name($proc, "P_USUARIO", $P_USUARIO, 40, SQLT_CHR);
        oci_bind_by_name($proc, "r_est", $r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc, "r_msg", $r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;
    }

    public function aprobarDesvinculacion($numero, $rol, $estado, $usuario, $fecha, $horario){

        $r_est = 0;
        $r_msg = "";

        $proc = oci_parse(
            $this->db->conn_id,
            "BEGIN NOV_WF_APROBAR_DESVINCULACION(
                :P_NUMERO,
                :P_ROL,
                :P_ESTADO,
                :P_USUARIO,
                :P_FECHA,
                :P_HORARIO,
                :r_est,
                :r_msg);
            END;"
        );

        oci_bind_by_name($proc, "P_NUMERO", $numero, -1, OCI_B_INT);
        oci_bind_by_name($proc, "P_ROL", $rol, 40, SQLT_CHR);
        oci_bind_by_name($proc, "P_ESTADO", $estado, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_USUARIO", $usuario, 40, SQLT_CHR);
        oci_bind_by_name($proc, "P_FECHA", $fecha, 20, SQLT_CHR);
        oci_bind_by_name($proc, "P_HORARIO", $horario, 20, SQLT_CHR);
        oci_bind_by_name($proc, "r_est", $r_est, -1, OCI_B_INT);
        oci_bind_by_name($proc, "r_msg", $r_msg, 200, SQLT_CHR);

        oci_execute($proc);

        $result = array('r_est' => $r_est, 'r_msg' => $r_msg);
        return $result;

    }

    public function existeSolicitud($p_personal){

        $sql = "SELECT
                    COUNT(*) existe
                FROM
                    nov_sol_desvinculacion
                WHERE
                    pfk_personal = $p_personal
                    AND estado = 'ACTIVO'";

        $query = $this->db->query($sql);
        return $query->result();

    }

}