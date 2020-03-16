<?php
/**
 * Created by IntelliJ IDEA.
 * User: MarioTi
 * Date: 03-01-16
 * Time: 10:47 PM
 */

if (!defined('BASEPATH')) exit('No se permite el acceso directo a este directorio');

class MenuSistema_model extends CI_Model
{

    public function __construct()
    {
        parent::__construct();
        //$this->load->database(); //Cargo la base de datos por defecto para todo el modelo
        $this->load->database("bdgeneral"); //Carga la base de datos en el grupo mantvia
    }

/*	public function getMenus($p_cod_emp, $p_cod_sistema, $p_usr){
        $sql = "SELECT distinct m.id_php --m.desc m.cod_modulo--*--m.id_php 
                FROM sg_as_rolesxmodulos r, sg_as_modulos m 
                WHERE r.cod_modulo = m.cod_modulo 
                AND m.ESTADO = 'A' 
                AND r.cod_sistema = $p_cod_sistema                 
                AND m.id_php IS NOT NULL
                AND r.cod_rol IN (SELECT COD_ROL FROM SG_AS_ROLESXUSUARIO ru, SG_AS_USUARIOS u
                                 WHERE ru.COD_EMP = u.COD_EMP
                                 and ru.rut_usuario = u.rut_usuario
                                 and u.COD_EMP = $p_cod_emp
                                 and u.login_intranet = '$p_usr')
                --sólo menús de primer nivel
                AND m.COD_MODULO_PADRE IN (SELECT B.MODULO_RAIZ
                                          FROM SG_AS_SISTEMAS B
                                          WHERE B.COD_SISTEMA = m.COD_SISTEMA)
                AND r.cod_modulo = m.COD_MODULO 
                AND R.COD_SISTEMA = M.COD_SISTEMA";

        $query = $this->db->query($sql);
        return $query->result();		
	}
*/	
	public function getPantallas($p_cod_emp, $p_cod_sistema, $p_usr){
			
        $sql = "SELECT  rut_usuario
            from    SG_AS_USUARIOS
            where   login_intranet = '$p_usr'";
        $query = $this->db->query($sql);

        if (count($query->result()) == 0) {
            $p_usr = 'GENERAL';
        }

        $sql = "SELECT DISTINCT m2.id_php id_padre, m1.id_php id_modulo --DISTINCT PARA QUE NO DUPLIQUE POR ROL
                FROM sg_as_rolesxmodulos r, sg_as_modulos m1, SG_AS_MODULOS m2 
                WHERE r.cod_modulo = m1.cod_modulo 
                AND m1.ESTADO = 'A' 
                AND r.cod_sistema = $p_cod_sistema                 
                AND m1.id_php IS NOT NULL
                AND r.cod_rol IN (SELECT COD_ROL FROM SG_AS_ROLESXUSUARIO ru, SG_AS_USUARIOS u
                                 WHERE ru.COD_EMP = u.COD_EMP
                                 and ru.rut_usuario = u.rut_usuario
                                 and u.COD_EMP = $p_cod_emp
                                 and u.login_intranet = '$p_usr')
                --filtra los menús de primer nivel
                AND m1.COD_MODULO_PADRE NOT IN (SELECT B.MODULO_RAIZ
                                          FROM SG_AS_SISTEMAS B
                                          WHERE B.COD_SISTEMA = m1.COD_SISTEMA)
                AND r.cod_modulo = m1.COD_MODULO 
                AND R.COD_SISTEMA = M1.COD_SISTEMA
                AND m2.ESTADO = m1.ESTADO
                --AND M2.COD_MODULO_PADRE IN (SELECT B.MODULO_RAIZ
                --                          FROM SG_AS_SISTEMAS B
                --                         WHERE B.COD_SISTEMA = m1.COD_SISTEMA)
                AND M2.COD_MODULO = M1.COD_MODULO_PADRE
                ORDER BY m2.id_php, m1.id_php";

        $sql = "SELECT LEVEL, M.COD_MODULO, m.desc_corta, m.id_php, M2.id_php id_padre
                FROM sg_as_modulos m 
                left join sg_as_modulos m2 on (M.COD_sistema = m2.cod_sistema and M.COD_MODULO_padre = m2.cod_modulo)
                WHERE m.ESTADO = 'A' 
                AND m.cod_sistema = $p_cod_sistema
                AND m.id_php IS NOT NULL
                --SOLO PARA DESARROLLO (SELECCIONA TODOS LOS MENUs)
                and m.cod_modulo in (select m3.cod_modulo FROM sg_as_rolesxmodulos m3, SG_AS_ROLESXUSUARIO ru, SG_AS_USUARIOS u 
                            WHERE M3.COD_ROL = RU.COD_ROL
                            and m3.cod_emp = ru.cod_emp
                            and ru.COD_EMP = u.COD_EMP 
                            and ru.rut_usuario = u.rut_usuario 
                            and u.COD_EMP = $p_cod_emp 
                            and u.login_intranet = '$p_usr')
                START WITH m.COD_MODULO_padre = $p_cod_sistema*1000
                CONNECT BY PRIOR M.COD_MODULO = M.COD_MODULO_PADRE
                ORDER SIBLINGS BY m.orden";
        $query = $this->db->query($sql);
        return $query->result();		
	}

    public function tiposRol($p_usr){

        $sql = "SELECT  rut_usuario
                from    SG_AS_USUARIOS
                where   login_intranet = '$p_usr'";
        $query = $this->db->query($sql);
        $vl_rut = (count($query->result()) > 0 ? $query->result()[0]->RUT_USUARIO : -1);
        
        $sql = "SELECT  rut_usuario
                from    SG_AS_USUARIOS
                where   login_intranet = '$p_usr'";
        $query = $this->db->query($sql);

        $sql = "SELECT  rut_usuario
                from    SG_AS_ROLESXUSUARIO ru
                where   ru.rut_usuario = $vl_rut
                and     ru.cod_rol = 'SCT_ADMIN_BASICO'";
        $query = $this->db->query($sql);
        $vl_admin_basico = (count($query->result()) > 0 || $vl_rut == -1 ? 1 : 0);//si rut=-1, se asigna básico por seguridad (esto no está controlado en ColdFusion)

        $sql = "SELECT  rut_usuario
                from    SG_AS_ROLESXUSUARIO ru
                where   ru.rut_usuario = $vl_rut
                and     ru.cod_rol in ('SCT_CONTROLADOR','SCT_JTURNO_CONTROL')";
        $query = $this->db->query($sql);
        $vl_controlador = (count($query->result()) > 0 ? 1 : 0);

        $sql = "SELECT  rut_usuario
                from    SG_AS_ROLESXUSUARIO ru
                where   ru.rut_usuario = $vl_rut
                and     ru.cod_rol = 'SCT_JEFATURA_CONTROL'";
        $query = $this->db->query($sql);
        $vl_jefatura = (count($query->result()) > 0 ? 1 : 0);

        $resultado = array('ESADMINBASICO' => $vl_admin_basico, 
                           'ESCONTROLADOR' => $vl_controlador, 
                           'ESJEFATURA'    => $vl_jefatura);
        return $resultado;
    }

}