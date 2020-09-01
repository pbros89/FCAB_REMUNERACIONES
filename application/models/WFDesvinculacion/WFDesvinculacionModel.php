<?php
if (!defined('BASEPATH')) exit('No se permite el acceso directo a este directorio');

class WFDesvinculacionModel extends CI_Model {
    public function __construct() {
        parent::__construct();
        $this->load->database("BD_NOVEDADES");
    }

    public function misRoles($usaurio){

        $sql = "SELECT
        u.pfk_rol_wf rol,
        r.nombre
    FROM
        nov_usuarios_roles_wf   u,
        nov_roles_wf            r
    WHERE
        u.pfk_usuario = '$usaurio'
        AND u.pfk_rol_wf = r.pk_rol_wf";

        $query = $this->db->query($sql);
        return $query->result();

    }

    public function listRutNombre($cod_emp){

        $sql = "SELECT DISTINCT
                    ( rut
                    || ' | '
                    || nombre ) rutNom,
                    rut,
                    pk_personal
                FROM
                    nov_personal
                WHERE
                    fecha_baja IS NULL
                    AND cod_emp = '$cod_emp'
                ORDER BY
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
                    nombre
                FROM 
                    nov_parametros
                WHERE 
                    pfk_tipo_param = 'CAUSAL_DESPIDO'
                    AND pfk_cod_emp = '$cod_emp'
                ORDER BY 
                    nombre";

        $query = $this->db->query($sql);
        return $query->result();

    }

    public function guardarSolDesvinculacion($listado_lineas){

        $detalle = json_decode($listado_lineas,true);
        
        $r_estado = 0;
        $r_mensaje = "OK"; 

        foreach ($detalle as $alerta) {

            $rol = $alerta['rol'];
            $personal = $alerta['personal'];
            $usuario = $alerta['usuario'];
            $finiquito = $alerta['finiquito'];
            $causal = $alerta['causal'];
            $carta = $alerta['carta'];
            $hechos = $alerta['hechos'];
            $motivo = $alerta['motivo'];
            $horasextras = $alerta['horasextras'];
            $viaticos = $alerta['viaticos'];
            $haberes = $alerta['haberes'];
            $descuentos = $alerta['descuentos'];
            $equipos = $alerta['equipos'];
            $celu = $alerta['celu'];
            $docs = $alerta['docs'];
            $caja = $alerta['caja'];
            $vehiculo = $alerta['vehiculo'];
            $estado = $alerta['estado'];

            $proc = oci_parse($this->db->conn_id, "

                                                BEGIN

                                                NOV_INS_SOL_DESVINCULACION(
                                                        :P_ROL,
                                                        :P_PERSONAL,
                                                        :P_USUARIO,
                                                        :P_FINIQUITO,
                                                        :P_CAUSAL,
                                                        :P_CARTA,
                                                        :P_HECHOS,
                                                        :P_MOTIVO,
                                                        :P_HORASEXTRAS,
                                                        :P_VIATICOS,
                                                        :P_HABERES,
                                                        :P_DESCUENTOS,
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

            oci_bind_by_name($proc,"P_ROL",$rol, 40, SQLT_CHR);
            oci_bind_by_name($proc,"P_PERSONAL",$personal, -1, OCI_B_INT);
            oci_bind_by_name($proc,"P_USUARIO",$usuario, 40, SQLT_CHR); 
            oci_bind_by_name($proc,"P_FINIQUITO",$finiquito, 40, SQLT_CHR);
            oci_bind_by_name($proc,"P_CAUSAL",$causal, 40, SQLT_CHR);
            oci_bind_by_name($proc,"P_CARTA",$carta, 2, SQLT_CHR);
            oci_bind_by_name($proc,"P_HECHOS",$hechos, 500, SQLT_CHR);
            oci_bind_by_name($proc,"P_MOTIVO",$motivo, 500, SQLT_CHR);
            oci_bind_by_name($proc,"P_HORASEXTRAS",$horasextras, -1, OCI_B_INT);
            oci_bind_by_name($proc,"P_VIATICOS",$viaticos, -1, OCI_B_INT);
            oci_bind_by_name($proc,"P_HABERES",$haberes, 100, SQLT_CHR);
            oci_bind_by_name($proc,"P_DESCUENTOS",$descuentos, 100, SQLT_CHR); 
            oci_bind_by_name($proc,"P_EQUIPOS",$equipos, 2, SQLT_CHR); 
            oci_bind_by_name($proc,"P_CELU",$celu, 2, SQLT_CHR); 
            oci_bind_by_name($proc,"P_DOCS",$docs, 2, SQLT_CHR); 
            oci_bind_by_name($proc,"P_CAJA",$caja, 2, SQLT_CHR); 
            oci_bind_by_name($proc,"P_VEHICULO",$vehiculo, 100, SQLT_CHR); 
            oci_bind_by_name($proc,"P_ESTADO",$estado, 20, SQLT_CHR); 
            oci_bind_by_name($proc,"ESTADO",$r_estado,  -1, OCI_B_INT); 
            oci_bind_by_name($proc,"MENSAJE",$r_mensaje, 1100, SQLT_CHR);

            oci_execute($proc);

            if($estado < 0){
                $result = array('ESTADO' => $r_estado, 'MENSAJE' => $r_mensaje);    
                return $result;      
            }

        }

        $result = array('ESTADO' => $r_estado, 'MENSAJE' => $r_mensaje);    
        return $result; 
    }

    public function listaDesvinculaciones($cod_emp){

        $sql = "SELECT
                    d.pk_num_desv numero,
                    d.estado,
                    p.rut,
                    p.nombre
                FROM
                    nov_sol_desvinculacion   d,
                    nov_personal             p
                WHERE
                    d.pfk_personal = p.pk_personal
                    AND p.cod_emp = $cod_emp";

        $query = $this->db->query($sql);
        return $query->result();

    }

    public function detalleDesvinculacion($numero){

        $sql = "SELECT
                    pk_num_desv     numero,
                    pfk_personal    personal,
                    fecha_solicitud fecha,
                    usr_creador     creador,
                    fecha_finiquito finiquito,
                    causal_desp     causal,
                    carta_aviso     carta,
                    det_hechos      hechos,
                    det_motivo      motivo,
                    horas_extras,
                    viaticos,
                    det_haberes     haberes,
                    det_descuentos  descuentos,
                    equip_comp      equipos,
                    celular,
                    documentos,
                    caja_chica,
                    det_vehiculos   vehiculos,
                    estado,
                    caso
                FROM
                    nov_sol_desvinculacion
                WHERE
                    pk_num_desv = $numero";

        $query = $this->db->query($sql);
        return $query->result();

    }

    public function detalleCasoWF($wf, $caso){

        $sql = "SELECT
                    caso,
                    etapa,
                    rol
                FROM
                    nov_proc_wf
                WHERE
                    nombre_wf = '$wf'
                    and caso =$caso";

        $query = $this->db->query($sql);
        return $query->result();

    }

    public function detalleAprobacionWF($numero){

        $sql = "SELECT
                    pfk_etapa etapa,
                    usr_aprob usuario,
                    estado
                FROM
                    nov_aprobaciones_wf
                WHERE
                    pfk_solicitud =$numero";

        $query = $this->db->query($sql);
        return $query->result();

    }

}