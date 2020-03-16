<?php

if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

class Tiendas extends CI_Controller
{

    public function host() {
        $this->load->library('session');
        $HOST = 'http://' . $this->session->userdata('user') . ':' . $this->session->userdata('pass') . '@' . $this->session->userdata('host');

        return $HOST;
    }

    public function hostxml() {
        $this->load->library('session');
        $HOSTXML = 'http://' . $this->session->userdata('user') . ':' . $this->session->userdata('pass') . '@' . '89.0.0.86';

        return $HOSTXML;
    }
    
    public function usuarioDominio(){
        if (isset($_SERVER["AUTHENTICATE_SAMACCOUNTNAME"])){
            echo json_encode($_SERVER["AUTHENTICATE_SAMACCOUNTNAME"]);
        }else{
            echo json_encode("LOCALHOST");
        }
    }

}