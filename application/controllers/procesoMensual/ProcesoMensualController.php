<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class ProcesoMensualController extends CI_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('procesoMensual/ProcesoMensualModel'); //Cargamos el modelo

        /*$this->output
                ->set_content_type('application/json')
                ->set_header("Access-Control-Allow-Origin: *")
                ->set_header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept")
                ->set_header("Content-Type: application/json; charset=UTF-8");*/
    }
    
    public function cargarProcesosMensual()
    {
        $p_anho = $this->input->get('p_anho');  
        $p_mes = $this->input->get('p_mes');  
        $p_tipo = $this->input->get('p_tipo'); 
        $p_cod_emp = $this->input->get('p_cod_emp'); 
        $p_estado = $this->input->get('p_estado');  
        $p_no_tipo = $this->input->get('p_no_tipo'); 
        $query = $this->ProcesoMensualModel->cargarProcesosMensual($p_anho, $p_mes, $p_cod_emp, $p_estado, $p_tipo, $p_no_tipo);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function crearProcesoMensual()
    {
        $p_anho = $this->input->get('p_anho');  
        $p_mes = $this->input->get('p_mes');  
        $p_tipo = $this->input->get('p_tipo');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_inicio = $this->input->get('p_inicio');  
        $p_termino = $this->input->get('p_termino');  
        $p_observacion = $this->input->get('p_observacion');  
        $p_usuario = $this->input->get('p_usuario');  
        $query = $this->ProcesoMensualModel->crearProcesoMensual($p_anho, $p_mes, $p_tipo, $p_cod_emp, $p_inicio, $p_termino, $p_observacion, $p_usuario);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function modificarProcesoMensual()
    {
        $p_proceso = $this->input->get('p_proceso');  
        $p_tipo = $this->input->get('p_tipo');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_inicio = $this->input->get('p_inicio');  
        $p_termino = $this->input->get('p_termino');  
        $p_observacion = $this->input->get('p_observacion');  
        $p_usuario = $this->input->get('p_usuario');  
        $query = $this->ProcesoMensualModel->modificarProcesoMensual($p_proceso, $p_tipo, $p_cod_emp, $p_inicio, $p_termino, $p_observacion, $p_usuario);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarDetalleProcesoMensual()
    {
        $p_anho = $this->input->get('p_anho');  
        $p_mes = $this->input->get('p_mes');  
        $p_tipo = $this->input->get('p_tipo'); 
        $p_cod_emp = $this->input->get('p_cod_emp'); 
        $p_estado = $this->input->get('p_estado');  
        $query = $this->ProcesoMensualModel->cargarDetalleProcesoMensual($p_anho, $p_mes, $p_cod_emp, $p_estado, $p_tipo);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarCCProcesoMensual() 
    {
        $p_proceso = $this->input->get('p_proceso');  
        $p_tipo = $this->input->get('p_tipo');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_cod_cc = $this->input->get('p_cod_cc');  
        $p_nom_cc = $this->input->get('p_nom_cc');  
        $query = $this->ProcesoMensualModel->cargarCCProcesoMensual($p_proceso, $p_cod_emp, $p_tipo, $p_cod_cc, $p_nom_cc);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarCCProcesoMensualPorUsuario(){

        $p_usuario = $this->input->get('p_usuario');  
        $p_rol = $this->input->get('p_rol');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        //$p_proceso = $this->input->get('p_proceso');  
        //$p_tipo = $this->input->get('p_tipo');  
        $query = $this->ProcesoMensualModel->cargarCCProcesoMensualPorUsuario($p_usuario, $p_rol, $p_cod_emp);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarPersonasProcesoMensual() 
    {
        $p_proceso = $this->input->get('p_proceso');  
        $p_tipo = $this->input->get('p_tipo');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_cod_cc = $this->input->get('p_cod_cc');  
        $p_rut = $this->input->get('p_rut');  
        $query = $this->ProcesoMensualModel->cargarPersonasProcesoMensual($p_proceso, $p_cod_emp, $p_tipo, $p_cod_cc, $p_rut);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }


    public function cargarPersonasProcesoMensualPorUsuario(){

        $p_usuario = $this->input->get('p_usuario');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_rol = $this->input->get('p_rol');  
        $p_cod_cc = $this->input->get('p_cod_cc');  
        $p_desc = $this->input->get('p_desc');
        $p_estado = $this->input->get('p_estado');  
        $query = $this->ProcesoMensualModel->cargarPersonasProcesoMensualPorUsuario($p_usuario, $p_rol, $p_cod_emp, $p_cod_cc, $p_desc, $p_estado);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarConceptosPersonaProcesoMensual() {

        $p_proceso = $this->input->get('p_proceso');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_tipo = $this->input->get('p_tipo');  
        $p_grupo = $this->input->get('p_grupo');  
        $p_cod_cc = $this->input->get('p_cod_cc');  
        $p_rut = $this->input->get('p_rut');  
        $query = $this->ProcesoMensualModel->cargarConceptosPersonaProcesoMensual($p_proceso, $p_cod_emp, $p_tipo, $p_cod_cc, $p_rut, $p_grupo);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);

    }


    public function modificarValorConceptoPersonaProcesoMensual()
    {
        $p_proceso = $this->input->get('p_proceso');  
        $p_tipo = $this->input->get('p_tipo');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_cod_cc = $this->input->get('p_cod_cc');  
        $p_rut = $this->input->get('p_rut');  
        $p_cod_concepto = $this->input->get('p_cod_concepto');  
        $p_usuario = $this->input->get('p_usuario');  
        $p_valor = $this->input->get('p_valor');  
        $query = $this->ProcesoMensualModel->modificarValorConceptoPersonaProcesoMensual(
            $p_proceso, 
            $p_tipo, 
            $p_cod_emp, 
            $p_cod_cc, 
            $p_rut, 
            $p_cod_concepto, 
            $p_usuario, 
            $p_valor);

        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }


    public function modificarEstadoProcMensualPerson()
    {
        $p_proceso = $this->input->get('p_proceso');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_tipo = $this->input->get('p_tipo');  
        $p_cod_cc = $this->input->get('p_cod_cc');  
        $p_rut = $this->input->get('p_rut');  
        $p_estado = $this->input->get('p_estado');  
        $p_usuario = $this->input->get('p_usuario');  
        $query = $this->ProcesoMensualModel->modificarEstadoProcMensualPerson($p_proceso, $p_tipo, $p_cod_emp, $p_cod_cc, $p_rut, $p_estado, $p_usuario);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);

    }


    public function modificarEstadoProcMensualCC()
    {
        $p_proceso = $this->input->get('p_proceso');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_tipo = $this->input->get('p_tipo');  
        $p_cod_cc = $this->input->get('p_cod_cc');  
        $p_estado = $this->input->get('p_estado');  
        $p_usuario = $this->input->get('p_usuario');  
        $query = $this->ProcesoMensualModel->modificarEstadoProcMensualCC($p_proceso, $p_tipo, $p_cod_emp, $p_cod_cc, $p_estado, $p_usuario);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);

    }


    public function modificarEstadoProcMensual()
    {
        $p_proceso = $this->input->get('p_proceso');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_tipo = $this->input->get('p_tipo');  
        $p_estado = $this->input->get('p_estado');  
        $p_usuario = $this->input->get('p_usuario');  
        $query = $this->ProcesoMensualModel->modificarEstadoProcMensual($p_proceso, $p_tipo, $p_cod_emp, $p_estado, $p_usuario);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);

    }

    public function exportarProcesoMensualRRHH() {

        set_time_limit(300);
        ini_set('max_execution_time', '300');
        ini_set('memory_limit', '2048M');
        if(!empty($_POST['p_proceso']))
        {
            $p_proceso = $_POST['p_proceso'];
        }else{
            $p_proceso = '0';
        }  
        
        if(!empty($_POST['p_tipo']))
        {
            $p_tipo = $_POST['p_tipo'];
        }else{
            $p_tipo = '0';
        }  

        if(!empty($_POST['p_cod_emp']))
        {
            $p_cod_emp = $_POST['p_cod_emp'];
        }else{
            $p_cod_emp = '0';
        }  

        //load our new PHPExcel library
        $this->load->library('excel');
        //activate worksheet number 1
        $this->excel->setActiveSheetIndex(0);

        // get all data
        $query = $this->ProcesoMensualModel->exportarProcesoMensualRRHH($p_proceso, $p_tipo, $p_cod_emp);
        //print_r($query);
        $filename=$p_cod_emp.'-'.$p_tipo."-".time().".xls"; //save our workbook as this file name
        if(count($query) > 0){
            //Cargamos la librería de excel.
            $this->load->library('excel'); 
            $this->excel->setActiveSheetIndex(0);
            $this->excel->getActiveSheet()->setTitle("$p_tipo");
            //Contador de filas
            $contador = 1;
            
            $this->excel->getActiveSheet()->setCellValue("A{$contador}", "RUT");
            $this->excel->getActiveSheet()->setCellValue("B{$contador}", "NOMBRE");
            $this->excel->getActiveSheet()->setCellValue("C{$contador}", "COD_CC");
            $this->excel->getActiveSheet()->setCellValue("D{$contador}", "NOM_CC");
            $this->excel->getActiveSheet()->setCellValue("E{$contador}", "COD_CARGO");
            $this->excel->getActiveSheet()->setCellValue("F{$contador}", "NOM_CARGO");              
            $this->excel->getActiveSheet()->setCellValue("G{$contador}", "TIPO_CONTRATO");
            $this->excel->getActiveSheet()->setCellValue("H{$contador}", "JORNADA");
            $this->excel->getActiveSheet()->setCellValue("I{$contador}", "COD_SINDICATO");
            $this->excel->getActiveSheet()->setCellValue("J{$contador}", "NOM_SINDICATO");
            $this->excel->getActiveSheet()->setCellValue("K{$contador}", "COD_ADHERIDO");
            $this->excel->getActiveSheet()->setCellValue("L{$contador}", "NOM_ADHERIDO");
            $this->excel->getActiveSheet()->setCellValue("M{$contador}", "GRUPO_CONCEPTO");
            $this->excel->getActiveSheet()->setCellValue("N{$contador}", "TIPO_CONCEPTO");
            $this->excel->getActiveSheet()->setCellValue("O{$contador}", "COD_CONCEPTO");
            $this->excel->getActiveSheet()->setCellValue("P{$contador}", "NOM_CONCEPTO");
            $this->excel->getActiveSheet()->setCellValue("Q{$contador}", "OBS_TIPO_CONCEPTO");
            $this->excel->getActiveSheet()->setCellValue("R{$contador}", "VALOR_RANGO_INI");
            $this->excel->getActiveSheet()->setCellValue("S{$contador}", "VALOR_RANGO_FIN");
            $this->excel->getActiveSheet()->setCellValue("T{$contador}", "VALORES_SELECCIONAR");
            $this->excel->getActiveSheet()->setCellValue("U{$contador}", "VALOR_A_CARGAR");
            //Definimos la data del cuerpo.        
            foreach($query as $l){
               //Incrementamos una fila más, para ir a la siguiente.
               $contador++;
               //Informacion de las filas de la consulta.
                $this->excel->getActiveSheet()->setCellValue("A{$contador}", $l->RUT);
                $this->excel->getActiveSheet()->setCellValue("B{$contador}", $l->NOMBRE);
                $this->excel->getActiveSheet()->setCellValue("C{$contador}", $l->COD_CC);
                $this->excel->getActiveSheet()->setCellValue("D{$contador}", $l->NOM_CC);
                $this->excel->getActiveSheet()->setCellValue("E{$contador}", $l->COD_CARGO);
                $this->excel->getActiveSheet()->setCellValue("F{$contador}", $l->NOM_CARGO);              
                $this->excel->getActiveSheet()->setCellValue("G{$contador}", $l->TIPO_CONTRATO);
                $this->excel->getActiveSheet()->setCellValue("H{$contador}", $l->JORNADA);
                $this->excel->getActiveSheet()->setCellValue("I{$contador}", $l->COD_SINDICATO);
                $this->excel->getActiveSheet()->setCellValue("J{$contador}", $l->NOM_SINDICATO);
                $this->excel->getActiveSheet()->setCellValue("K{$contador}", $l->COD_ADHERIDO);
                $this->excel->getActiveSheet()->setCellValue("L{$contador}", $l->NOM_ADHERIDO);
                $this->excel->getActiveSheet()->setCellValue("M{$contador}", $l->GRUPO_CONCEPTO);
                $this->excel->getActiveSheet()->setCellValue("N{$contador}", $l->TIPO_CONCEPTO);
                $this->excel->getActiveSheet()->setCellValue("O{$contador}", $l->COD_CONCEPTO);
                $this->excel->getActiveSheet()->setCellValue("P{$contador}", $l->NOM_CONCEPTO);
                $this->excel->getActiveSheet()->setCellValue("Q{$contador}", $l->OBS_TIPO_CONCEPTO);
                $this->excel->getActiveSheet()->setCellValue("R{$contador}", $l->VALOR_RANGO_INI);
                $this->excel->getActiveSheet()->setCellValue("S{$contador}", $l->VALOR_RANGO_FIN);
                $this->excel->getActiveSheet()->setCellValue("T{$contador}", $l->VALORES_SELECCIONAR);
                $this->excel->getActiveSheet()->setCellValue("U{$contador}", $l->VALOR_A_CARGAR);
            }
            
            /*foreach(range('A','U') as $columnID) {
                $this->excel->getActiveSheet()->getColumnDimension($columnID)->setAutoSize(true);
            }*/

            //Le ponemos un nombre al archivo que se va a generar.
            header('Content-Type: application/vnd.ms-excel');
            //header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            header('Content-Disposition: attachment;filename="'.$filename.'"');
            header('Cache-Control: max-age=0');
            $objWriter = PHPExcel_IOFactory::createWriter($this->excel, 'Excel5');
            //Hacemos una salida al navegador con el archivo Excel.
            $objWriter->save('php://output');
         }else{
            echo 'No se encontro información';
            exit;        
         }
    }

    public function importarProcesoMensual(){

        set_time_limit(300);
        ini_set('max_execution_time', '300');
        ini_set('memory_limit', '2048M');
        ini_set('upload_max_filesize', '2048M');
        ini_set('post_max_size', '2048M');
        
        if(!empty($_POST['p_proceso']))
        {
            $p_proceso = $_POST['p_proceso'];
        }else{
            $p_proceso = '0';
        }  
        
        if(!empty($_POST['p_tipo']))
        {
            $p_tipo = $_POST['p_tipo'];
        }else{
            $p_tipo = '0';
        }  

        if(!empty($_POST['p_cod_emp']))
        {
            $p_cod_emp = $_POST['p_cod_emp'];
        }else{
            $p_cod_emp = '0';
        }

        //echo $p_proceso;

        if ($_FILES["file"]["error"] > 0)
        {
            $error  = $_FILES["file"]["error"];
            $response = array('success' => false, 'msg' => $error);

            
            $result = '{"success":"false", "items":{"r_msg": "'.$error.'"}';
        }
        else
        {
            require_once APPPATH . "/third_party/PHPExcel.php";

            $file_name = $_FILES["file"]["name"];
            $file_type = $_FILES["file"]["type"];
            $file_path = $_FILES["file"]["tmp_name"];
            $file_size = round($_FILES["file"]["size"] / 1024, 2) . "  Kilo Bytes";
            $response = array('success' => true,
                'data' => array('name' => $file_name, 'size' => $file_size),
                'msg' => 'File Uploaded successfully'
            );

            try {
                $object = PHPExcel_IOFactory::load($file_path);

                $i = 0;
                foreach ($object->getWorksheetIterator() as $worksheet) {
                    
                    $highestRow = $worksheet->getHighestRow();
                    $highestColumn = $worksheet->getHighestColumn();
                    
                    for($row = 2; $row <= $highestRow; $row++) {
                        $inserdata[$i]['RUT'] = $worksheet->getCellByColumnAndRow(0, $row)->getValue();
                        $inserdata[$i]['NOMBRE'] = $worksheet->getCellByColumnAndRow(1, $row)->getValue();
                        $inserdata[$i]['COD_CC'] =$worksheet->getCellByColumnAndRow(2, $row)->getValue();
                        $inserdata[$i]['NOM_CC'] = $worksheet->getCellByColumnAndRow(3, $row)->getValue();
                        $inserdata[$i]['COD_CARGO'] = $worksheet->getCellByColumnAndRow(4, $row)->getValue();
                        $inserdata[$i]['NOM_CARGO'] = $worksheet->getCellByColumnAndRow(5, $row)->getValue();
                        $inserdata[$i]['TIPO_CONTRATO'] = $worksheet->getCellByColumnAndRow(6, $row)->getValue();
                        $inserdata[$i]['JORNADA'] = $worksheet->getCellByColumnAndRow(7, $row)->getValue();
                        $inserdata[$i]['COD_SINDICATO'] = $worksheet->getCellByColumnAndRow(8, $row)->getValue();
                        $inserdata[$i]['NOM_SINDICATO'] = $worksheet->getCellByColumnAndRow(9, $row)->getValue();
                        $inserdata[$i]['COD_ADHERIDO'] = $worksheet->getCellByColumnAndRow(10, $row)->getValue();
                        $inserdata[$i]['NOM_ADHERIDO'] = $worksheet->getCellByColumnAndRow(11, $row)->getValue();
                        $inserdata[$i]['GRUPO_CONCEPTO'] = $worksheet->getCellByColumnAndRow(12, $row)->getValue();
                        $inserdata[$i]['TIPO_CONCEPTO'] = $worksheet->getCellByColumnAndRow(13, $row)->getValue();
                        $inserdata[$i]['COD_CONCEPTO'] = $worksheet->getCellByColumnAndRow(14, $row)->getValue();
                        $inserdata[$i]['NOM_CONCEPTO'] = $worksheet->getCellByColumnAndRow(15, $row)->getValue();
                        $inserdata[$i]['OBS_TIPO_CONCEPTO'] = $worksheet->getCellByColumnAndRow(16, $row)->getValue();
                        $inserdata[$i]['VALOR_RANGO_INI'] = $worksheet->getCellByColumnAndRow(17, $row)->getValue();
                        $inserdata[$i]['VALOR_RANGO_FIN'] = $worksheet->getCellByColumnAndRow(18, $row)->getValue();
                        $inserdata[$i]['VALORES_SELECCIONAR'] = $worksheet->getCellByColumnAndRow(19, $row)->getValue();
                        $inserdata[$i]['VALOR_A_CARGAR'] = $worksheet->getCellByColumnAndRow(20, $row)->getValue();
                        $inserdata[$i]['PROCESO'] = $p_proceso;
                        $inserdata[$i]['TIPO_PROCESO'] = $p_tipo;
                        $inserdata[$i]['COD_EMP'] = $p_cod_emp;
                        $i++;
                    }
                    
                    //print_r($inserdata);
                }               
                $result = $this->ProcesoMensualModel->importarProcesoMensual($p_proceso, $p_tipo, $p_cod_emp, $inserdata);   
                if($result){
                    $result = '{"success":"true", "items": {"r_msg": "OK"}}';
                }else{
                    $result = '{"success":"false", "items":{"r_msg": "Error al cargar documento"}';
                }  
                

            } catch (Exception $e) {
                $result = '{"success":"false", "items":{"r_msg": "Error al cargar documento"}';
            }

        }
        $this->output->set_output($result);
    }


    public function validarImportarProceso(){
        $p_proceso = $this->input->get('p_proceso');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_tipo = $this->input->get('p_tipo');   
        $query = $this->ProcesoMensualModel->validarImportarProceso($p_proceso, $p_tipo, $p_cod_emp);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function resumenValidarImportarProceso(){
        $p_proceso = $this->input->get('p_proceso');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_tipo = $this->input->get('p_tipo');   
        $query = $this->ProcesoMensualModel->resumenValidarImportarProceso($p_proceso, $p_tipo, $p_cod_emp);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function guardarValoresImportacion(){
        $p_proceso = $this->input->get('p_proceso');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_tipo = $this->input->get('p_tipo');   
        $p_usuario = $this->input->get('p_usuario');   
        $query = $this->ProcesoMensualModel->guardarValoresImportacion($p_proceso, $p_tipo, $p_cod_emp, $p_usuario);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function borrarProcesoMensual(){
        $p_proceso = $this->input->get('p_proceso');  
        $p_cod_emp = $this->input->get('p_cod_emp');  
        $p_tipo = $this->input->get('p_tipo');   
        $p_usuario = $this->input->get('p_usuario');   
        $query = $this->ProcesoMensualModel->borrarProcesoMensual($p_proceso, $p_tipo, $p_cod_emp, $p_usuario);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }

    public function cargarValidacionCC() {
        $p_proceso = $this->input->get('p_proceso');  
        $p_cod_emp = $this->input->get('p_cod_emp');   
        $query = $this->ProcesoMensualModel->cargarValidacionCC($p_proceso, $p_cod_emp);
        $result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
    }
}
