<?php
/**
 * Created by Mario Hidalgo García
 */

if (!defined('BASEPATH')) exit('No se permite el acceso directo a este directorio');


class Adjuntos extends CI_Controller {

    function __construct() {
        parent::__construct();

        $this->output
            ->set_content_type('text/json')
            ->set_header("Access-Control-Allow-Origin: *")
            ->set_header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept")
            //->set_header("Content-Type: application/json; charset=UTF-8");
            ->set_header("'Content-Type', 'text/json'");
    }

    public function index() {

        $this->load->library('upload');

        $descripcion = strtoupper($this->input->post('descripcion'));

        //Eliminando acentos y caracteres especiales del nombre
        $filename = pathinfo($_FILES['archivo']['name'], PATHINFO_FILENAME);
        $output = iconv("utf-8", "ascii//TRANSLIT//IGNORE", $filename);
        $name = preg_replace("/^'|[^A-Za-z0-9\s-]|'$/", '', $output); // lets remove utf-8 special characters except blank spaces
        $new_name = substr(strip_tags($name), 0, 40) . '_' . date('his');

        $config['upload_path'] = 'resources/upload/';
        $config['allowed_types'] = 'bmp|jpg|jpeg|png';
        $config['file_name'] = $new_name;
        $config['max_size'] = '16384';

        $this->upload->initialize($config);

        if (!$this->upload->do_upload('archivo')) {
            $this->output->set_output(json_encode(array('success' => false, 'msg' => $this->upload->display_errors())));
        } else {
            $this->output->set_output(json_encode(array('success' => true, 'data' => array(array('file_path' => $this->upload->data()['file_path'], 'descripcion' => $descripcion, 'file_size' => $this->upload->data()['file_size'], 'file_name' => $this->upload->data()['file_name'], 'image_type' => $this->upload->data()['image_type'], 'image_height' => $this->upload->data()['image_height'], 'image_width' => $this->upload->data()['image_width'])))));
            //echo json_encode(array('success' => true, 'data' => array($this->upload->data())));
        }
    }

    public function testparametros()
    {

        $param1 = $this->input->post('foo');
        $param2 = $this->input->post('bar');

        echo json_encode(array('param1' => $param1, 'param2' => $param2));
    }
    public function upload_app() {

        $this->load->library('upload');

        $descripcion = "ENVIADO DESDE LA APP";

        //Eliminando acentos y caracteres especiales del nombre
        $filename = pathinfo($_FILES['archivo']['name'], PATHINFO_FILENAME);
        $output = iconv("utf-8", "ascii//TRANSLIT//IGNORE", $filename);
        $name = preg_replace("/^'|[^A-Za-z0-9\s-]|'$/", '', $output); // lets remove utf-8 special characters except blank spaces
        $num = rand(10, 100);
        $new_name = substr(strip_tags($name), 0, 40) . '_' . $num . date('his');

        $config['upload_path'] = 'resources/upload/';
        $config['allowed_types'] = 'bmp|jpg|jpeg|png';
        $config['file_name'] = $new_name;
        $config['max_size'] = '16384';

        $this->upload->initialize($config);

        if (!$this->upload->do_upload('archivo')) {
            $this->output->set_output(json_encode(array('success' => false, 'msg' => $this->upload->display_errors())));
        } else {
            $this->output->set_output(json_encode(array('success' => true, 'data' => array(array('file_path' => $this->upload->data()['file_path'], 'descripcion' => $descripcion, 'file_size' => $this->upload->data()['file_size'], 'file_name' => $this->upload->data()['file_name'], 'image_type' => $this->upload->data()['image_type'], 'image_height' => $this->upload->data()['image_height'], 'image_width' => $this->upload->data()['image_width'])))));
            //echo json_encode(array('success' => true, 'data' => array($this->upload->data())));
        }
    }

    public function upload_app_temp() {

        $this->load->library('upload');

        $descripcion = "ENVIADO DESDE LA APP";

        //Eliminando acentos y caracteres especiales del nombre
        $filename = pathinfo($_FILES['archivo']['name'], PATHINFO_FILENAME);
        $output = iconv("utf-8", "ascii//TRANSLIT//IGNORE", $filename);
        $name = preg_replace("/^'|[^A-Za-z0-9\s-]|'$/", '', $output); // lets remove utf-8 special characters except blank spaces
        $num = rand(10, 100);
        $new_name = substr(strip_tags($name), 0, 40) . '_' . $num . date('his');

        $config['upload_path'] = 'resources/upload_test/';
        $config['allowed_types'] = 'bmp|jpg|jpeg|png';
        $config['file_name'] = $new_name;
        $config['max_size'] = '16384';

        $this->upload->initialize($config);

        if (!$this->upload->do_upload('archivo')) {
            $this->output->set_output(json_encode(array('success' => false, 'msg' => $this->upload->display_errors())));
        } else {
            $this->output->set_output(json_encode(array('success' => true, 'data' => array(array('file_path' => $this->upload->data()['file_path'], 'descripcion' => $descripcion, 'file_size' => $this->upload->data()['file_size'], 'file_name' => $this->upload->data()['file_name'], 'image_type' => $this->upload->data()['image_type'], 'image_height' => $this->upload->data()['image_height'], 'image_width' => $this->upload->data()['image_width'])))));
            //echo json_encode(array('success' => true, 'data' => array($this->upload->data())));
        }
    }

    public function delete() {
        $file = $this->input->post('archivo');
        unlink('resources/upload/' . $file . '');
    }

    public function delete_temp() {
        $file = $this->input->post('archivo');
        unlink('resources/upload_test/' . $file . '');
    }

    public function anexos_investigacion() {

        $this->load->library('upload');
        $reporte = $this->input->post('reporte');
        $descripcion = strtoupper($this->input->post('descripcion'));
        //Eliminando acentos y caracteres especiales del nombre
        $filename = pathinfo($_FILES['archivo']['name'], PATHINFO_FILENAME);
        $output = iconv("utf-8", "ascii//TRANSLIT//IGNORE", $filename);
        $name = preg_replace("/^'|[^A-Za-z0-9\s-]|'$/", '', $output); // lets remove utf-8 special characters except blank spaces
        $new_name = substr(strip_tags($name), 0, 40) . '_' . date('his');

        $config['upload_path'] = 'resources/upload/';
        $config['allowed_types'] = 'bmp|jpg|jpeg|png';
        $config['file_name'] = $new_name;
        $config['max_size'] = '16384';

        $this->upload->initialize($config);

        if (!$this->upload->do_upload('archivo')) {
            $this->output->set_output(json_encode(array('success' => false, 'msg' => $this->upload->display_errors())));
        } else {
            $this->load->model('Reportes_model'); //Cargamos el modelo
            $this->Reportes_model->guardarAnexo(1, $this->upload->data()['full_path'], $reporte, $this->upload->data()['orig_name'], $this->upload->data()['image_type'], $this->upload->data()['image_height'], $this->upload->data()['image_width'], $descripcion, $config['upload_path']); //Solo almacena las rutas en la DB, los archivos ya estan en el servidor

            $this->output->set_output(json_encode(array('success' => true, 'data' => array(array('file_path' => $this->upload->data()['file_path'], 'descripcion' => $descripcion, 'file_size' => $this->upload->data()['file_size'], 'file_name' => $this->upload->data()['orig_name'], 'image_type' => $this->upload->data()['image_type'], 'image_height' => $this->upload->data()['image_height'], 'image_width' => $this->upload->data()['image_width'])))));
            //echo json_encode(array('success' => true, 'data' => array($this->upload->data())));
        }
    }

    public function delete_investigacion() {
        $file = $this->input->post('archivo');
        unlink('resources/upload/' . $file . '');
    }

    public function anexos_investigacion_documentos() {

        $this->load->library('upload');
        $reporte = $this->input->post('reporte');
        $descripcion = strtoupper($this->input->post('descripcion'));
        //Eliminando acentos y caracteres especiales del nombre
        $filename = pathinfo($_FILES['archivo']['name'], PATHINFO_FILENAME);
        $output = iconv("utf-8", "ascii//TRANSLIT//IGNORE", $filename);
        $name = preg_replace("/^'|[^A-Za-z0-9\s-]|'$/", '', $output); // lets remove utf-8 special characters except blank spaces
        $new_name = substr(strip_tags($name), 0, 40) . '_' . date('his');

        $config['upload_path'] = 'resources/upload_docs/';
        $config['allowed_types'] = 'odt|doc|docx|pdf';
        $config['file_name'] = $new_name;
        $config['max_size'] = '16384';


        $this->upload->initialize($config);

        if (!$this->upload->do_upload('archivo')) {
            $this->output->set_output(json_encode(array('success' => false, 'msg' => $this->upload->display_errors())));
        } else {
            $nombre_archivo = $this->upload->data()['orig_name'];
            $pos_extension = strpos($nombre_archivo, '.');
            $extencion = substr($nombre_archivo, ($pos_extension + 1));
            $this->load->model('Reportes_model'); //Cargamos el modelo
            $this->Reportes_model->guardarAnexo(1, $this->upload->data()['full_path'], $reporte, $nombre_archivo, $extencion, 0, 0, $descripcion, $config['upload_path']); //Solo almacena las rutas en la DB, los archivos ya estan en el servidor

            $this->output->set_output(json_encode(array('success' => true, 'data' => array(array('file_path' => $this->upload->data()['file_path'], 'descripcion' => $descripcion, 'file_size' => $this->upload->data()['file_size'], 'file_name' => $this->upload->data()['orig_name'], 'ext' => $extencion, 'image_height' => $this->upload->data()['image_height'], 'image_width' => $this->upload->data()['image_width'])))));
            //echo json_encode(array('success' => true, 'data' => array($this->upload->data())));
        }
    }

    public function delete_investigacion_documentos() {
        $file = $this->input->post('archivo');
        unlink('resources/upload_docs/' . $file . '');
    }

    public function anexos_correctivas() {
        $this->load->library('upload');
        $reporte = $this->input->post('reporte');
        $descripcion = strtoupper($this->input->post('descripcion'));
        //Eliminando acentos y caracteres especiales del nombre
        $filename = pathinfo($_FILES['archivo']['name'], PATHINFO_FILENAME);
        $output = iconv("utf-8", "ascii//TRANSLIT//IGNORE", $filename);
        $name = preg_replace("/^'|[^A-Za-z0-9\s-]|'$/", '', $output); // lets remove utf-8 special characters except blank spaces
        $new_name = substr(strip_tags($name), 0, 40) . '_' . date('his');

        $config['upload_path'] = 'resources/upload/';
        $config['allowed_types'] = 'bmp|jpg|jpeg|png';
        $config['file_name'] = $new_name;
        $config['max_size'] = '16384';

        $this->upload->initialize($config);

        if (!$this->upload->do_upload('archivo')) {
            $this->output->set_output(json_encode(array('success' => false, 'msg' => $this->upload->display_errors())));
        } else {
            $this->load->model('Reportes_model'); //Cargamos el modelo
            $this->Reportes_model->guardarAnexo_correctivas(1, $this->upload->data()['full_path'], $reporte, $this->upload->data()['orig_name'], $this->upload->data()['image_type'], $this->upload->data()['image_height'], $this->upload->data()['image_width'], $descripcion, $config['upload_path']); //Solo almacena las rutas en la DB, los archivos ya estan en el servidor

            $this->output->set_output(json_encode(array('success' => true, 'data' => array(array('file_path' => $this->upload->data()['file_path'], 'descripcion' => $descripcion, 'file_size' => $this->upload->data()['file_size'], 'file_name' => $this->upload->data()['orig_name'], 'image_type' => $this->upload->data()['image_type'], 'image_height' => $this->upload->data()['image_height'], 'image_width' => $this->upload->data()['image_width'])))));
            //echo json_encode(array('success' => true, 'data' => array($this->upload->data())));
        }
    }

    public function delete_correctivas() {
        $this->load->model('Reportes_model'); //Cargamos el modelo
        $reporte = $this->input->post('reporte');
        $url = $this->input->post('url');
        $file = $this->input->post('archivo');
        $this->Reportes_model->borrarAnexo_correctivas(1, $reporte, $file);
        unlink($url);
    }

}
