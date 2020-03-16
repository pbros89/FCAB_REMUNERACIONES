<?php
/**
 * Created by IntelliJ IDEA.
 * User: MarioTi
 * Date: 03-01-16
 * Time: 10:47 PM
 */

if (!defined('BASEPATH')) exit('No se permite el acceso directo a este directorio');

class MenuSistemaModel extends CI_Model
{

    public function __construct()
    {
        parent::__construct();
        //$this->load->database(); //Cargo la base de datos por defecto para todo el modelo
        $this->load->database("bdgeneral"); //Carga la base de datos en el grupo mantvia
    }


    public function cargarMenuUsuario($p_log)
    {
        $sql = "SELECT MO.ID_PHP, MO.COD_MODULO, MO.COD_MODULO_PADRE, MO.COD_PANTALLA, MO.ESTADO
                FROM SG_AS_ROLESXMODULOS RM,
                SG_AS_ROLESXUSUARIO RU,
                SG_AS_USUARIOS US, 
                SG_AS_MODULOS MO
                WHERE US.RUT_USUARIO = RU.RUT_USUARIO
                AND US.COD_EMP = RU.COD_EMP
                AND US.COD_EMP = RM.COD_EMP
                AND RU.COD_ROL = RM.COD_ROL
                AND RM.COD_MODULO = MO.COD_MODULO
                AND RM.COD_SISTEMA = '80'
                AND US.COD_EMP = '1'
                AND UPPER(US.LOGIN_INTRANET) = UPPER('$p_log')";
        
        $query = $this->db->query($sql);
        return $query->result();
    }
}