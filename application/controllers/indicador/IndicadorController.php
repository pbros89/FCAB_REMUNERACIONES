<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class IndicadorController extends CI_Controller
{

    function __construct()
    {
        parent::__construct();
        $this->load->model('indicador/IndicadorModel'); //Cargamos el modelo

        $this->output
            ->set_content_type('application/json')
            ->set_header("Access-Control-Allow-Origin: *")
            ->set_header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept")
            ->set_header("Content-Type: application/json; charset=UTF-8");
    }

    public function cargarConteoMensual()
    {
        $p_cod_emp = $this->input->get('p_cod_emp');
        $query = $this->IndicadorModel->cargarConteoMensual($p_cod_emp);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarConteoDotacionEtariaMensual()
    {

        $p_anho = $this->input->get('p_anho');
        $p_mes = $this->input->get('p_mes');
        $p_cod_emp = $this->input->get('p_cod_emp');
        $p_cod_ger = $this->input->get('p_cod_ger');
        $p_cod_dep = $this->input->get('p_cod_dep');
        $p_cod_cc = $this->input->get('p_cod_cc');

        $query = $this->IndicadorModel->cargarConteoDotacionEtariaMensual(
            $p_anho,
            $p_mes,
            $p_cod_emp,
            $p_cod_ger,
            $p_cod_dep,
            $p_cod_cc
        );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarConteoDotacionEtariaMensualDet(){
        $p_anho = $this->input->get('p_anho');
        $p_mes = $this->input->get('p_mes');
        $p_cod_emp = $this->input->get('p_cod_emp');
        $p_cod_ger = $this->input->get('p_cod_ger');
        $p_cod_dep = $this->input->get('p_cod_dep');
        $p_cod_cc = $this->input->get('p_cod_cc');

        $query = $this->IndicadorModel->cargarConteoDotacionEtariaMensualDet(
            $p_anho,
            $p_mes,
            $p_cod_emp,
            $p_cod_ger,
            $p_cod_dep,
            $p_cod_cc
        );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarConteoDotacionEtariaMensualDinamic()
    {

        $p_anho = $this->input->get('p_anho');
        $p_mes = $this->input->get('p_mes');
        $p_cod_emp = $this->input->get('p_cod_emp');
        $p_cod_ger = $this->input->get('p_cod_ger');
        $p_cod_dep = $this->input->get('p_cod_dep');
        $p_cod_cc = $this->input->get('p_cod_cc');

        $p_is_emp = $this->input->get('p_is_emp');
        $p_is_ger = $this->input->get('p_is_ger');
        $p_is_rol = $this->input->get('p_is_rol');

        $query = $this->IndicadorModel->cargarConteoDotacionEtariaMensualDinamic(
            $p_anho,
            $p_mes,
            $p_cod_emp,
            $p_cod_ger,
            $p_cod_dep,
            $p_cod_cc,
            $p_is_emp,
            $p_is_ger,
            $p_is_rol
        );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarConteoDotacionAntiguedadMensual()
    {

        $p_anho = $this->input->get('p_anho');
        $p_mes = $this->input->get('p_mes');
        $p_cod_emp = $this->input->get('p_cod_emp');
        $p_cod_ger = $this->input->get('p_cod_ger');
        $p_cod_dep = $this->input->get('p_cod_dep');
        $p_cod_cc = $this->input->get('p_cod_cc');

        $query = $this->IndicadorModel->cargarConteoDotacionAntiguedadMensual(
            $p_anho,
            $p_mes,
            $p_cod_emp,
            $p_cod_ger,
            $p_cod_dep,
            $p_cod_cc
        );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarConteoDotacionAntiguedadMensualDinamic()
    {

        $p_anho = $this->input->get('p_anho');
        $p_mes = $this->input->get('p_mes');
        $p_cod_emp = $this->input->get('p_cod_emp');
        $p_cod_ger = $this->input->get('p_cod_ger');
        $p_cod_dep = $this->input->get('p_cod_dep');
        $p_cod_cc = $this->input->get('p_cod_cc');

        $p_is_emp = $this->input->get('p_is_emp');
        $p_is_ger = $this->input->get('p_is_ger');
        $p_is_rol = $this->input->get('p_is_rol');

        $query = $this->IndicadorModel->cargarConteoDotacionAntiguedadMensualDinamic(
            $p_anho,
            $p_mes,
            $p_cod_emp,
            $p_cod_ger,
            $p_cod_dep,
            $p_cod_cc,
            $p_is_emp,
            $p_is_ger,
            $p_is_rol
        );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarConteoDotacionAntiguedadMensualDet()
    {

        $p_anho = $this->input->get('p_anho');
        $p_mes = $this->input->get('p_mes');
        $p_cod_emp = $this->input->get('p_cod_emp');
        $p_cod_ger = $this->input->get('p_cod_ger');
        $p_cod_dep = $this->input->get('p_cod_dep');
        $p_cod_cc = $this->input->get('p_cod_cc');

        $query = $this->IndicadorModel->cargarConteoDotacionAntiguedadMensualDet(
            $p_anho,
            $p_mes,
            $p_cod_emp,
            $p_cod_ger,
            $p_cod_dep,
            $p_cod_cc
        );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarConteoDotacionRolPaisMensual()
    {

        $p_anho = $this->input->get('p_anho');
        $p_mes = $this->input->get('p_mes');
        $p_cod_emp = $this->input->get('p_cod_emp');
        $p_cod_ger = $this->input->get('p_cod_ger');
        $p_cod_dep = $this->input->get('p_cod_dep');
        $p_cod_cc = $this->input->get('p_cod_cc');
        $p_rol_cargo = $this->input->get('p_rol_cargo');

        $query = $this->IndicadorModel->cargarConteoDotacionRolPaisMensual(
            $p_anho,
            $p_mes,
            $p_cod_emp,
            $p_cod_ger,
            $p_cod_dep,
            $p_cod_cc,
            $p_rol_cargo
        );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarConteoDotacionRolPaisMensualDinamic()
    {

        $p_anho = $this->input->get('p_anho');
        $p_mes = $this->input->get('p_mes');
        $p_cod_emp = $this->input->get('p_cod_emp');
        $p_cod_ger = $this->input->get('p_cod_ger');
        $p_cod_dep = $this->input->get('p_cod_dep');
        $p_cod_cc = $this->input->get('p_cod_cc');
        $p_rol_cargo = $this->input->get('p_rol_cargo');

        $p_is_emp = $this->input->get('p_is_emp');
        $p_is_ger = $this->input->get('p_is_ger');
        $p_is_rol = $this->input->get('p_is_rol');

        $query = $this->IndicadorModel->cargarConteoDotacionRolPaisMensualDinamic(
            $p_anho,
            $p_mes,
            $p_cod_emp,
            $p_cod_ger,
            $p_cod_dep,
            $p_cod_cc,
            $p_rol_cargo,
            $p_is_emp,
            $p_is_ger,
            $p_is_rol
        );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarConteoDotacionRolPaisMensualDet()
    {

        $p_anho = $this->input->get('p_anho');
        $p_mes = $this->input->get('p_mes');
        $p_cod_emp = $this->input->get('p_cod_emp');
        $p_cod_ger = $this->input->get('p_cod_ger');
        $p_cod_dep = $this->input->get('p_cod_dep');
        $p_cod_cc = $this->input->get('p_cod_cc');
        $p_rol_cargo = $this->input->get('p_rol_cargo');

        $query = $this->IndicadorModel->cargarConteoDotacionRolPaisMensualDet(
            $p_anho,
            $p_mes,
            $p_cod_emp,
            $p_cod_ger,
            $p_cod_dep,
            $p_cod_cc,
            $p_rol_cargo
        );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarConteoDotacionRolSexoMensual()
    {

        $p_anho = $this->input->get('p_anho');
        $p_mes = $this->input->get('p_mes');
        $p_cod_emp = $this->input->get('p_cod_emp');
        $p_cod_ger = $this->input->get('p_cod_ger');
        $p_cod_dep = $this->input->get('p_cod_dep');
        $p_cod_cc = $this->input->get('p_cod_cc');
        $p_rol_cargo = $this->input->get('p_rol_cargo');

        $query = $this->IndicadorModel->cargarConteoDotacionRolSexoMensual(
            $p_anho,
            $p_mes,
            $p_cod_emp,
            $p_cod_ger,
            $p_cod_dep,
            $p_cod_cc,
            $p_rol_cargo
        );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarConteoDotacionRolSexoMensualDet()
    {

        $p_anho = $this->input->get('p_anho');
        $p_mes = $this->input->get('p_mes');
        $p_cod_emp = $this->input->get('p_cod_emp');
        $p_cod_ger = $this->input->get('p_cod_ger');
        $p_cod_dep = $this->input->get('p_cod_dep');
        $p_cod_cc = $this->input->get('p_cod_cc');
        $p_rol_cargo = $this->input->get('p_rol_cargo');

        $query = $this->IndicadorModel->cargarConteoDotacionRolSexoMensualDet(
            $p_anho,
            $p_mes,
            $p_cod_emp,
            $p_cod_ger,
            $p_cod_dep,
            $p_cod_cc,
            $p_rol_cargo
        );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarConteoDotacionSexoMensualDinamic()
    {

        $p_anho = $this->input->get('p_anho');
        $p_mes = $this->input->get('p_mes');
        $p_cod_emp = $this->input->get('p_cod_emp');
        $p_cod_ger = $this->input->get('p_cod_ger');
        $p_cod_dep = $this->input->get('p_cod_dep');
        $p_cod_cc = $this->input->get('p_cod_cc');
        $p_rol_cargo = $this->input->get('p_rol_cargo');

        $p_is_emp = $this->input->get('p_is_emp');
        $p_is_ger = $this->input->get('p_is_ger');
        $p_is_rol = $this->input->get('p_is_rol');

        $query = $this->IndicadorModel->cargarConteoDotacionSexoMensualDinamic(
            $p_anho,
            $p_mes,
            $p_cod_emp,
            $p_cod_ger,
            $p_cod_dep,
            $p_cod_cc,
            $p_rol_cargo,
            $p_is_emp,
            $p_is_ger,
            $p_is_rol
        );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarConteoRotacionMensual()
    {

        $p_cod_emp = $this->input->get('p_cod_emp');
        $p_cod_ger = $this->input->get('p_cod_ger');
        $p_cod_dep = $this->input->get('p_cod_dep');
        $p_cod_cc = $this->input->get('p_cod_cc');
        $p_rol_cargo = $this->input->get('p_rol_cargo');
        $p_causal = $this->input->get('p_causal');

        $query = $this->IndicadorModel->cargarConteoRotacionMensual(
            $p_cod_emp,
            $p_cod_ger,
            $p_cod_dep,
            $p_cod_cc,
            $p_rol_cargo,
            $p_causal
        );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarConteoRotacionMensualDinamic()
    {

        $p_cod_emp = $this->input->get('p_cod_emp');
        $p_cod_ger = $this->input->get('p_cod_ger');
        $p_cod_dep = $this->input->get('p_cod_dep');
        $p_cod_cc = $this->input->get('p_cod_cc');
        $p_rol_cargo = $this->input->get('p_rol_cargo');
        $p_causal = $this->input->get('p_causal');

        $p_is_emp = $this->input->get('p_is_emp');
        $p_is_ger = $this->input->get('p_is_ger');
        $p_is_rol = $this->input->get('p_is_rol');

        $query = $this->IndicadorModel->cargarConteoRotacionMensualDinamic(
            $p_cod_emp,
            $p_cod_ger,
            $p_cod_dep,
            $p_cod_cc,
            $p_rol_cargo,
            $p_causal,
            $p_is_emp,
            $p_is_ger,
            $p_is_rol
        );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarConteoRotacionConsolidado() {
        $p_cod_emp = $this->input->get('p_cod_emp');
        $p_cod_ger = $this->input->get('p_cod_ger');
        $p_cod_dep = $this->input->get('p_cod_dep');
        $p_cod_cc = $this->input->get('p_cod_cc');
        $p_rol_cargo = $this->input->get('p_rol_cargo');
        $p_causal = $this->input->get('p_causal');

        $query = $this->IndicadorModel->cargarConteoRotacionConsolidado(
            $p_cod_emp,
            $p_cod_ger,
            $p_cod_dep,
            $p_cod_cc,
            $p_rol_cargo,
            $p_causal
        );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarConteoRotacionMensualDet()
    {

        $p_anho = $this->input->get('p_anho');
        $p_mes = $this->input->get('p_mes');
        $p_cod_emp = $this->input->get('p_cod_emp');
        $p_cod_ger = $this->input->get('p_cod_ger');
        $p_cod_dep = $this->input->get('p_cod_dep');
        $p_cod_cc = $this->input->get('p_cod_cc');
        $p_rol_cargo = $this->input->get('p_rol_cargo');
        $p_causal = $this->input->get('p_causal');

        $query = $this->IndicadorModel->cargarConteoRotacionMensualDet(
            $p_anho,
            $p_mes,
            $p_cod_emp,
            $p_cod_ger,
            $p_cod_dep,
            $p_cod_cc,
            $p_rol_cargo,
            $p_causal
        );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }


    public function cargarConteoDotacionGerencia()
    {

        $p_anho = $this->input->get('p_anho');
        $p_mes = $this->input->get('p_mes');
        $p_cod_emp = $this->input->get('p_cod_emp');
        $p_cod_ger = $this->input->get('p_cod_ger');
        $p_cod_dep = $this->input->get('p_cod_dep');
        $p_cod_cc = $this->input->get('p_cod_cc');
        $p_rol_cargo = $this->input->get('p_rol_cargo');

        $query = $this->IndicadorModel->cargarConteoDotacionGerencia(
            $p_anho,
            $p_mes,
            $p_cod_emp,
            $p_cod_ger,
            $p_cod_dep,
            $p_cod_cc,
            $p_rol_cargo
        );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }


    public function cargarConteoDotacionMensual()
    {

        $p_anho = $this->input->get('p_anho');
        $p_mes = $this->input->get('p_mes');
        $p_cod_emp = $this->input->get('p_cod_emp');
        $p_cod_ger = $this->input->get('p_cod_ger');
        $p_cod_dep = $this->input->get('p_cod_dep');
        $p_cod_cc = $this->input->get('p_cod_cc');
        $p_rol_cargo = $this->input->get('p_rol_cargo');

        $query = $this->IndicadorModel->cargarConteoDotacionMensual(
            $p_anho,
            $p_mes,
            $p_cod_emp,
            $p_cod_ger,
            $p_cod_dep,
            $p_cod_cc,
            $p_rol_cargo
        );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarConteoDotacionEmpresa()
    {

        $p_anho = $this->input->get('p_anho');
        $p_mes = $this->input->get('p_mes');
        $p_cod_emp = $this->input->get('p_cod_emp');
        $p_cod_ger = $this->input->get('p_cod_ger');
        $p_cod_dep = $this->input->get('p_cod_dep');
        $p_cod_cc = $this->input->get('p_cod_cc');
        $p_rol_cargo = $this->input->get('p_rol_cargo');

        $query = $this->IndicadorModel->cargarConteoDotacionEmpresa(
            $p_anho,
            $p_mes,
            $p_cod_emp,
            $p_cod_ger,
            $p_cod_dep,
            $p_cod_cc,
            $p_rol_cargo
        );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarConteoDotacionMensualDinamic()
    {

        $p_anho = $this->input->get('p_anho');
        $p_mes = $this->input->get('p_mes');
        $p_cod_emp = $this->input->get('p_cod_emp');
        $p_cod_ger = $this->input->get('p_cod_ger');
        $p_cod_dep = $this->input->get('p_cod_dep');
        $p_cod_cc = $this->input->get('p_cod_cc');
        $p_rol_cargo = $this->input->get('p_rol_cargo');

        $p_is_emp = $this->input->get('p_is_emp');
        $p_is_ger = $this->input->get('p_is_ger');
        $p_is_rol = $this->input->get('p_is_rol');

        $query = $this->IndicadorModel->cargarConteoDotacionMensualDinamic(
            $p_anho,
            $p_mes,
            $p_cod_emp,
            $p_cod_ger,
            $p_cod_dep,
            $p_cod_cc,
            $p_rol_cargo,
            $p_is_emp,
            $p_is_ger,
            $p_is_rol
        );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarCierresMensual()
    {
        $query = $this->IndicadorModel->cargarCierresMensual();
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function exportarDiasTrabajados()
    {
        set_time_limit(300);
        ini_set('max_execution_time', '300');
        ini_set('memory_limit', '2048M');

        $p_anho = 0;
        $p_mes = 0;

        if (isset($_POST['p_anho'])) {
            $p_anho = $_POST['p_anho'];
        }

        if (isset($_POST['p_mes'])) {
            $p_mes = $_POST['p_mes'];
        }

        $this->load->library('excel');
        $filename = $p_anho . '_' . $p_mes . '_DIAS_TRABAJADOS.xls'; //save our workbook as this file name

        $names = [];
        $query = $this->IndicadorModel->cargarExportarDiasTrabajados($p_anho, $p_mes);

        if (count($query) > 0) {
            $names = get_object_vars($query[0]);
            //print_r($names);

            $names = array_keys($names);

            //Cargamos la librería de excel.

            $this->excel->getActiveSheet()->setTitle('Datos');
            //Contador de filas
            $current_col = 0;
            $current_row = 1;


            //print_r($conceptos);
            //HEADER
            foreach ($names as $name) {
                $this->excel->getActiveSheet()->setCellValueByColumnAndRow($current_col, $current_row, $name);
                $current_col++;
            }

            $current_row++;

            //DATA
            foreach ($query as $obj) {
                $current_col = 0;
                $obj = get_object_vars($obj);
                foreach ($names as $name) {
                    $this->excel->getActiveSheet()->setCellValueByColumnAndRow($current_col, $current_row, $obj[$name]);
                    $current_col++;
                }
                $current_row++;
            }
        }

        //Le ponemos un nombre al archivo que se va a generar.
        header('Content-Type: application/vnd.ms-excel');
        //header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header('Content-Disposition: attachment;filename="' . $filename . '"');
        header('Cache-Control: max-age=0');
        $objWriter = PHPExcel_IOFactory::createWriter($this->excel, 'Excel5');
        //Hacemos una salida al navegador con el archivo Excel.
        $objWriter->save('php://output');
    }

    public function importarDiasTrabajados()
    {

        set_time_limit(300);
        ini_set('max_execution_time', '300');
        ini_set('memory_limit', '2048M');
        ini_set('upload_max_filesize', '2048M');
        ini_set('post_max_size', '2048M');

        $p_anho = 0;
        $p_mes = 0;

        if (!empty($_POST['p_anho'])) {
            $p_anho = $_POST['p_anho'];
        }

        if (!empty($_POST['p_mes'])) {
            $p_mes = $_POST['p_mes'];
        }


        if ($_FILES["file"]["error"] > 0) {
            $error  = $_FILES["file"]["error"];
            $response = array('success' => false, 'msg' => $error);


            $result = '{"success":"false", "items":{"r_msg": "' . $error . '"}';
        } else {
            require_once APPPATH . "/third_party/PHPExcel.php";

            $file_name = $_FILES["file"]["name"];
            $file_type = $_FILES["file"]["type"];
            $file_path = $_FILES["file"]["tmp_name"];
            $file_size = round($_FILES["file"]["size"] / 1024, 2) . "  Kilo Bytes";

            try {

                $object = PHPExcel_IOFactory::load($file_path);

                $i = 0;
                foreach ($object->getWorksheetIterator() as $worksheet) {

                    $highestRow = $worksheet->getHighestRow();
                    $highestColumn = $worksheet->getHighestColumn();

                    for ($row = 2; $row <= $highestRow; $row++) {
                        $inserdata[$i]['COD_PERSONAL'] = $worksheet->getCellByColumnAndRow(0, $row)->getValue();
                        $inserdata[$i]['NUM_RUT'] = $worksheet->getCellByColumnAndRow(1, $row)->getValue();
                        $inserdata[$i]['DV_RUT'] = $worksheet->getCellByColumnAndRow(2, $row)->getValue();
                        $inserdata[$i]['NOMBRE'] = $worksheet->getCellByColumnAndRow(3, $row)->getValue();
                        $inserdata[$i]['COD_EMP'] = $worksheet->getCellByColumnAndRow(4, $row)->getValue();
                        $inserdata[$i]['COD_CC'] = $worksheet->getCellByColumnAndRow(5, $row)->getValue();
                        $inserdata[$i]['NOM_CC'] = $worksheet->getCellByColumnAndRow(6, $row)->getValue();
                        $inserdata[$i]['COD_CARGO'] = $worksheet->getCellByColumnAndRow(7, $row)->getValue();
                        $inserdata[$i]['NOM_CARGO'] = $worksheet->getCellByColumnAndRow(8, $row)->getValue();
                        $inserdata[$i]['ROL'] = $worksheet->getCellByColumnAndRow(9, $row)->getValue();
                        $inserdata[$i]['TIPO_CONTRATO'] = $worksheet->getCellByColumnAndRow(10, $row)->getValue();
                        $inserdata[$i]['JORNADA'] = $worksheet->getCellByColumnAndRow(11, $row)->getValue();
                        $inserdata[$i]['DIAS_TRABAJADOS'] = $worksheet->getCellByColumnAndRow(12, $row)->getValue();
                        $inserdata[$i]['ANHO'] = $p_anho;
                        $inserdata[$i]['MES'] = $p_mes;
                        $i++;
                    }

                    //print_r($inserdata);
                }
                $result = $this->IndicadorModel->importarDiasTrabajados($inserdata);
                if ($result) {
                    $result = '{"success":"true", "items": {"r_msg": "OK"}}';
                } else {
                    $result = '{"success":"false", "items":{"r_msg": "Error al cargar documento"}';
                }
            } catch (Exception $e) {
                $result = '{"success":"false", "items":{"r_msg": "Error al cargar documento"}';
            }
        }
        $this->output->set_output($result);
    }

    public function resumenValidarImportarDiasTrabajados()
    {
        $p_anho = $this->input->get('p_anho');
        $p_mes = $this->input->get('p_mes');

        $query = $this->IndicadorModel->resumenValidarImportarDiasTrabajados(
            $p_anho,
            $p_mes
        );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function validarImportarDiasTrabajados()
    {
        $p_anho = $this->input->get('p_anho');
        $p_mes = $this->input->get('p_mes');

        $query = $this->IndicadorModel->validarImportarDiasTrabajados(
            $p_anho,
            $p_mes
        );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }


    public function guardarImportarDiasTrabajados()
    {

        $p_anho = $this->input->get('p_anho');
        $p_mes = $this->input->get('p_mes');
        $p_usuario = $this->input->get('p_usuario');

        $query = $this->IndicadorModel->guardarImportarDiasTrabajados(
            $p_anho,
            $p_mes,
            $p_usuario
        );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function crearCierreMensual()
    {

        $p_anho = $this->input->get('p_anho');
        $p_mes = $this->input->get('p_mes');
        $p_usuario = $this->input->get('p_usuario');

        $query = $this->IndicadorModel->crearCierreMensual(
            $p_anho,
            $p_mes,
            $p_usuario
        );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function crearCierreMensualAnterior()
    {

        $p_anho = date("Y", strtotime("-1 months"));
        $p_mes = date("m", strtotime("-1 months"));
        $p_usuario = 'PROC_AUTOMATICO';
        //echo $p_mes;
        $query = $this->IndicadorModel->crearCierreMensual(
            $p_anho,
            $p_mes,
            $p_usuario
        );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarConteoAusentismoMensual() {
        $p_anho = $this->input->get('p_anho');
        $p_mes = $this->input->get('p_mes');
        $p_cod_emp = $this->input->get('p_cod_emp');
        $p_cod_ger = $this->input->get('p_cod_ger');
        $p_cod_dep = $this->input->get('p_cod_dep');
        $p_cod_cc = $this->input->get('p_cod_cc');
        $p_rol_cargo = $this->input->get('p_rol_cargo');

        $query = $this->IndicadorModel->cargarConteoAusentismoMensual(
            $p_anho,
            $p_mes,
            $p_cod_emp,
            $p_cod_ger,
            $p_cod_dep,
            $p_cod_cc,
            $p_rol_cargo
        );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarConteoAusentismoMensualDinamic() {
        $p_anho = $this->input->get('p_anho');
        $p_mes = $this->input->get('p_mes');
        $p_cod_emp = $this->input->get('p_cod_emp');
        $p_cod_ger = $this->input->get('p_cod_ger');
        $p_cod_dep = $this->input->get('p_cod_dep');
        $p_cod_cc = $this->input->get('p_cod_cc');
        $p_rol_cargo = $this->input->get('p_rol_cargo');

        $p_is_emp = $this->input->get('p_is_emp');
        $p_is_ger = $this->input->get('p_is_ger');
        $p_is_rol = $this->input->get('p_is_rol');

        $query = $this->IndicadorModel->cargarConteoAusentismoMensualDinamic(
            $p_anho,
            $p_mes,
            $p_cod_emp,
            $p_cod_ger,
            $p_cod_dep,
            $p_cod_cc,
            $p_rol_cargo,
            $p_is_emp,
            $p_is_ger,
            $p_is_rol
        );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarConteoAusentismoGerencia() {
        $p_anho = $this->input->get('p_anho');
        $p_mes = $this->input->get('p_mes');
        $p_cod_emp = $this->input->get('p_cod_emp');
        $p_cod_ger = $this->input->get('p_cod_ger');
        $p_cod_dep = $this->input->get('p_cod_dep');
        $p_cod_cc = $this->input->get('p_cod_cc');
        $p_rol_cargo = $this->input->get('p_rol_cargo');

        $query = $this->IndicadorModel->cargarConteoAusentismoGerencia(
            $p_anho,
            $p_mes,
            $p_cod_emp,
            $p_cod_ger,
            $p_cod_dep,
            $p_cod_cc,
            $p_rol_cargo
        );

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }
}
