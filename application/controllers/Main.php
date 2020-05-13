<?php

if (!defined('BASEPATH')) exit('No se permite el acceso directo a este directorio');


class Main extends CI_Controller
{

    function __construct()
    {
        parent::__construct();
        $this->load->library('session');
    }

    public function index()
    {
        if($this->session->userdata('logeado') !== "conectado"){
            $this->session->sess_destroy();
        }

        $this->load->library('user_agent');
        $this->load->helper('url');

        $var = array();
        $var['titulo'] = 'FCAB Recursos Humanos';                      // Titulo de la ventana html
        $var['style'] = 'triton';                               // style de ExtJss (gray, classic, crisp o neptune)
        $var['logeado'] = $this->session->userdata('logeado');  //Verifica si el usuario ya esta logeado
        $var['externo'] = $this->input->post('externo'); 
        $var['formExterno'] = $this->input->post('formExterno');
        $var['formExternoParams'] = $this->input->post('formExternoParams');
        $var['empresa'] = $this->session->userdata('empresa');
        $var['nomempresa'] = $this->session->userdata('nomempresa');
        if ($this->agent->browser() == 'Internet Explorer' and $this->agent->version() <= 8)
        {
            vista_secundaria('noie');
        }
        else
        {
            $this -> load -> library('Mobile_Detect');
            $detect = new Mobile_Detect();
            if ($detect->isMobile() || $detect->isTablet()) {
                vista_secundaria('movil');
            } else {
                vista_principal('main', $var);
                //echo "<p>Hello {$_SERVER['PHP_AUTH_USER']}.</p>";
                //echo "<p>You entered {$_SERVER['PHP_AUTH_PW']} as you password.</p>";
            }


        }
    }
}
