<?php
/**
 * Created by PhpStorm.
 * User: Mario
 * Date: 11-07-16
 * Time: 12:44
 */


if (!defined('BASEPATH')) exit('No se permite el acceso directo a este directorio');

class Correos_model extends CI_Model
{

    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    public function obtener_datos_por_rut($rut)
    {
        $sql = "SELECT PER.NOM_FUN||' '||PER.APP_FUN||' '||PER.APM_FUN NOMBRE, SG_AS_USUARIOS.LOGIN_INTRANET LOGIN,
                SSO_GETCORREO(PER.RUT_FUN)
                FROM INC_USUARIOS_VW_WP PER, BD_GENERAL.SG_AS_USUARIOS SG_AS_USUARIOS
                WHERE  PER.RUT_FUN = $rut
                AND SG_AS_USUARIOS.RUT_USUARIO = $rut";

        $query = $this->db->query($sql);
        return $query->result();

    }

}