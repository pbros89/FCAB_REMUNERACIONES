<?php
/**
 * Created by Mario Hidalgo García
 */

if (!defined('BASEPATH')) exit('No se permite el acceso directo a este directorio');


class Loader extends CI_Controller {

    function __construct() {
        parent::__construct();
        $this->load->helper('file');
    }

    public function getRecursos() {
        $elemento = $this->input->get('elemento');
        $this->output->set_content_type("text/javascript");
        $this->load->view($elemento);
    }

    public function getFolder() {
        $folder = $this->input->get('folder');
        $extensions = array('js');
        $filenames = get_filenames_by_extension(APPPATH . 'views/' . $folder . '', $extensions);
        echo json_encode($filenames);
    }

    public function getCarpeta() {

        function showFiles($path) {
            $directorio = dir($path);
            $contenido = "";
            while ($archivo = $directorio->read()) {
                if ($archivo != "." && $archivo != "..") {
                    if (is_dir($path . $archivo)) {
                        showFiles($path . '/' . $archivo . '/');
                    } else {
                       $contenido($archivo);
                    }
                }
            }
            $directorio->close();
        }

        function get_infoFile($path, $archivo) {
            $finfo = finfo_open(FILEINFO_MIME_TYPE);

            $cadena = "<div class='name'>" . $archivo . "</div>";
            $cadena.="<div class='size'>" . number_format(filesize($path . "/" . $archivo) / 1024, 2, ",", ".") . " Kb</div>";
            $cadena.="<div class='perms'>" . substr(sprintf('%o', fileperms($path . "/" . $archivo)), -4) . "</div>";
            $cadena.="<div class='mime'>" . finfo_file($finfo, $path . "/" . $archivo) . "</div>";
            return $cadena;
        }

# iniciamos la función recursiva
        showFiles(APPPATH . 'views/Vistas/');
    }

}
