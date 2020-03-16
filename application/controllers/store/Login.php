<?php
/**
 * Sistema de Login basado en Active Directory y Sessiones
 * Creador: Mario Hidalgo García
 * Fecha: 10-11-15
 * Sistema: ExtJs 6 y Codeignaiter 3.0
 */

class Login extends CI_Controller{

    function __construct()
    {
        parent::__construct();
        $this->load->library('session');
        $this->load->helper('cookie');
        $this->load->helper('url');
        $this->output
            ->set_content_type('application/json')
            ->set_header("Access-Control-Allow-Origin: *")
            ->set_header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept")
            ->set_header("Content-Type: application/json; charset=UTF-8");
    }

    public function Salir() //Validación Login
    {
        $this->session->sess_destroy();
    }
    
    public function getLogin()
    {
        $usuario = $_SERVER["AUTHENTICATE_SAMACCOUNTNAME"];
        if(get_cookie('usuario') != null)
        {
            $usuario = get_cookie('usuario');
        }
        echo json_encode(array('empresa'=> get_cookie('empresa'), 'usuario' => $usuario));
    }

    public function Ingresar() //Validación Login
    {
        if ($this->input->post('tIngreso')) {

            if($this->input->post('cLogin') === "true") {
                $logeado = "conectado";
            } else {
                $logeado = "no recordar";
            }

            $usuario = array(
                'user'      => $this->input->post('uDominio'),
                'pass'      => $this->input->post('pDominio'),
                'tipo'      => strtoupper($this->input->post('tIngreso')), //Cuando es taller
                'rut'       => $this->input->post('rInformante'),
                'anho'      => $this->input->post('aNacimiento'),
                'logeado'   => $logeado,
                'redirect'  => 'no',
                'host'      => 'sierragorda.fcab.cl', //Cambiar según ubicación,
                'empresa'  => $this->input->post('cemp'),
                'nomempresa'  => $this->input->post('cnomemp')
                
            );
        } else if ($this->input->get('tIngreso')) {
            if($this->input->get('cLogin') === "true") {
                $logeado = "conectado";
            } else {
                $logeado = "no recordar";
            }

            $usuario = array(
                'user'      => 'capacita',
                'pass'      => 'capacita',
                'tipo'      => strtoupper($this->input->post('tIngreso')),
                'rut'       => $this->input->post('rInformante'),
                'anho'      => $this->input->post('aNacimiento'),
                'logeado'   => $logeado,
                'host'      => 'sierragorda.fcab.cl',
                'redirect'  => $this->input->post('rdirect'),
                'empresa'  => $this->input->post('cemp'),
                'nomempresa'  => $this->input->post('cnomemp')
            );
           
        } else {
            return;
        }

        $arrContextOptions=array(
            "ssl"=>array(
                "crypto_method" => STREAM_CRYPTO_METHOD_TLS_CLIENT,
                "verify_peer"=>false,
                "verify_peer_name"=>false,
            ),
        );

        if($usuario['tipo'] === 'TALLER') {
            $url = 'http://capacita:capacita@' . $usuario['host'] . '/loginGestionOperacional.php?TIPO=' . $usuario['tipo'] . '&RUT=' . $usuario['rut'] . '&ANHO=' . $usuario['anho'];
        } else {
            $url = 'http://' . $usuario['user'] . ':' . $usuario['pass'] . '@' . $usuario['host'] . '/loginGestionOperacional.php?TIPO=' . 
                    $usuario['tipo']. '&USER=' . $usuario['user']. 
                    '&EMPRESA=' . $usuario['empresa'].
                    '&NOM_EMPRESA' . $usuario['nomempresa'];
        }


        set_cookie('usuario', $usuario['user'], 999999);
        set_cookie('empresa', $usuario['empresa'], 999999);
        set_cookie('nomempresa', $usuario['nomempresa'], 999999);

        //Obtenemos y limpiamos el contenido
       libxml_use_internal_errors(true);
       $contenido = file_get_contents($url);
       $rpcContenido = str_replace(array("\n", "\r", "\t"), '', $contenido);
       $trimContenido = trim(str_replace('"', "'", $rpcContenido));
       $simpleXml = simplexml_load_string($trimContenido);


       if ($simpleXml === false) {
           echo "<\div>\`error 401, no autorizado&%$-.+`*<>"; //Prod error
           $this->session->sess_destroy(); //POR SI ESCRIBE MAL EL USUARIO Y ACTUALIZA
           return;
       } else {
           //Almacenamos el contenido en un array
           $arr = array();
           foreach ($simpleXml->registro as $item) { //Recorro el XML
               //se remplaza el elemento vacio {} por "";
               $dexml = str_replace("{}", '""', json_encode($item));
               $arr[] = json_decode($dexml);
           }
           $json = json_encode($arr); //Se codifica el array como objeto
       }

       $this->session->set_userdata($usuario);

       echo $json;
    }

    public function Recuperar() //Validación Login
    {

        if($this->session->userdata('tipo') === 'TALLER') {
            $url = 'http://capacita:capacita@' . $this->session->userdata('host') . '/loginGestionOperacional.php?TIPO=' . $this->session->userdata('tipo') . '&USER=' . $this->session->userdata('user') . '&RUT=' . $this->session->userdata('rut') . '&ANHO=' . $this->session->userdata('anho');
        } else {
            $url = 'http://' . $this->session->userdata('user') . ':' . 
            $this->session->userdata('pass') . '@' . $this->session->userdata('host') . 
            '/loginGestionOperacional.php?TIPO=' . $this->session->userdata('tipo') . 
            '&USER=' . $this->session->userdata('user'). 
            '&EMPRESA=' . $this->session->userdata('empresa').
            '&NOM_EMPRESA=' . $this->session->userdata('nomempresa');
        }

        //Obtenemos y limpiamos el contenido
        libxml_use_internal_errors(true);
        $contenido = file_get_contents($url);
        $rpcContenido = str_replace(array("\n", "\r", "\t"), '', $contenido);
        $trimContenido = trim(str_replace('"', "'", $rpcContenido));
        $simpleXml = simplexml_load_string($trimContenido);

        if ($simpleXml === false) {
            $json = "<\div>`\error 401, no autorizado&%$-.+`*"; //Prod error
        } else {
            //Almacenamos el contenido en un array
            $arr = array();
            foreach ($simpleXml->registro as $item) { //Recorro el XML
                //se remplaza el elemento vacio {} por "";
                $dexml = str_replace("{}", '""', json_encode($item));
                $arr[] = json_decode($dexml);
            }
            $arr['empresa'] = $this->session->userdata('empresa');
            $arr['nomempresa'] = $this->session->userdata('nomempresa');
            $json = json_encode($arr); //Se codifica el array como objeto
        }
        echo $json;
    }
}

 