<?php
/**
 * Created by Pedro Bros
 */

if (!defined('BASEPATH')) exit('No se permite el acceso directo a este directorio');


class AdjuntoController extends CI_Controller {

    function __construct() {
        parent::__construct();

        $this->output
            ->set_content_type('application/json')
            ->set_header("Access-Control-Allow-Origin: *")
            ->set_header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept")
            ->set_header("Content-Type: application/json; charset=UTF-8");
    }

    public function subirAdjunto() {

        $this->load->library('upload');
        $p_ruta = $this->input->post('p_ruta');
        $p_cod = $this->input->post('p_cod');

        //$p_archivo = $this->input->post('archivo');

        //print_r($p_archivo);
        //Eliminando acentos y caracteres especiales del nombre
        $filename = pathinfo($_FILES['archivo']['name'], PATHINFO_FILENAME);
        $output = iconv("utf-8", "ascii//TRANSLIT//IGNORE", $filename);
        $name = preg_replace("/^'|[^A-Za-z0-9\s-]|'$/", '', $output); // lets remove utf-8 special characters except blank spaces
        $new_name = substr(strip_tags($name), 0, 40) . '_' . date('dmYhis');

        $config['upload_path'] = 'resources/upload/'.$p_ruta . "/" . $p_cod;
        $config['allowed_types'] = 'bmp|jpg|jpeg|png|xls|xlsx|doc|docx|pdf|ppt|pptx|txt';
        $config['file_name'] = $new_name;
        $config['max_size'] = 16384;
        $config['max_width'] = 1024;
        $config['max_height'] = 768;
        
        if (!is_dir($config['upload_path'])) {
            mkdir($config['upload_path'], 0777, TRUE);
        }

        $this->upload->initialize($config);

        if (!$this->upload->do_upload('archivo')) {
            $this->output->set_output(json_encode(array('success' => false, 'msg' => $this->upload->display_errors())));
        } else {
            //$this->output->set_output(json_encode(array('success' => true, 'data' => array(array('file_path' => $this->upload->data()['file_path'], 'file_size' => $this->upload->data()['file_size'], 'file_name' => $this->upload->data()['file_name'])))));
            echo json_encode(array('success' => true, 'data' => array($this->upload->data()), 'cod' => $p_cod, 'ruta' => $p_ruta));
        }
    }
    
    public function cargarAdjuntos(){
        $p_ruta = $_GET['p_ruta'];
        $p_cod = $_GET['p_cod'];
        $dir = 'resources/upload/'.$p_ruta . "/" .$p_cod ."/";
        $archivo = array();
        if (is_dir($dir)) {
            $d = dir($dir);
            while ($name = $d->read()) {
                if (!preg_match('/\.(zip|rar|odt|ods|odp|csv|xls|xlsx|docx|doc|pdf|jpg|png|gif|ppt|pptx|txt|jpeg)$/', $name))
                    continue;
                $size = filesize($dir . $name) / 1000;
                $lastmod = filemtime($dir . $name);
                $archivo[] = array('file_name' => $name, 'file_size' => $size,
                    'lastmod' => $lastmod, 'url' => $dir . $name);
            }
            $d->close();
        }
        
        echo json_encode($archivo);
    }

    public function eliminarAdjunto() {
        
        $file = $this->input->post('archivo');
        $p_ruta = $this->input->post('p_ruta');
        $p_cod = $this->input->post('p_cod');
        unlink('resources/upload/' . $p_ruta ."/" . $p_cod . "/" . $file . '');
    }

    public function testparametros()
    {

        $param1 = $this->input->post('foo');
        $param2 = $this->input->post('bar');

        echo json_encode(array('param1' => $param1, 'param2' => $param2));
    }
}
