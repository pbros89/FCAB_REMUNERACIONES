<?php

if (!defined('BASEPATH'))
    exit('No se permite el acceso directo a este directorio');

class ExcelExportController extends CI_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('excelExport/ExcelExportModel'); //Cargamos el modelo
    }


    public function cargarProcesoConsolidado() {

        set_time_limit(300);
        ini_set('max_execution_time', '300');
        ini_set('memory_limit', '2048M');

        $cbAnho= $_POST['cbAnho'];
        $cbMes= $_POST['cbMes'];
        $cbAlineacion= $_POST['cbAlineacion'];
        $p_cod_emp = $_POST['p_cod_emp'];
        $p_rol = $_POST['p_rol'];
        $p_proceso = $cbAnho.'/'.$cbMes;
        $p_tipo_proceso = "";
        $p_grupo_concepto = '';
        $p_tipo_concepto = '';
        $p_usuario = $_POST['p_usuario'];

        if(isset($_POST['tip_pro_proceso'])){
            $p_tipo_proceso .= "'".$_POST['tip_pro_proceso']."',";
        }

        if(isset($_POST['tip_pro_reproceso'])){
            $p_tipo_proceso .= "'".$_POST['tip_pro_reproceso']."',";
        }

        if(isset($_POST['tip_pro_rrhh'])){
            $p_tipo_proceso .= "'".$_POST['tip_pro_rrhh']."',";
        }

        if(isset($_POST['tip_con_seleccionar'])){
            $p_tipo_concepto .= "'".$_POST['tip_con_seleccionar']."',";
        }

        if(isset($_POST['tip_con_rango'])){
            $p_tipo_concepto .= "'".$_POST['tip_con_rango']."',";
        }

        if(isset($_POST['tip_con_porcentaje'])){
            $p_tipo_concepto .= "'".$_POST['tip_con_porcentaje']."',";
        }

        if(isset($_POST['tip_con_monto'])){
            $p_tipo_concepto .= "'".$_POST['tip_con_monto']."',";
        }

        if(isset($_POST['tip_con_cantidad'])){
            $p_tipo_concepto .= "'".$_POST['tip_con_cantidad']."',";
        }

        if(isset($_POST['tip_con_booleano'])){
            $p_tipo_concepto .= "'".$_POST['tip_con_booleano']."',";
        }

        if(isset($_POST['tip_con_booleano2'])){
            $p_tipo_concepto .= "'".$_POST['tip_con_booleano2']."',";
        }

        if(isset($_POST['gru_con_haber'])){
            $p_grupo_concepto .= "'".$_POST['gru_con_haber']."',";
        }

        if(isset($_POST['gru_con_descuento'])){
            $p_grupo_concepto .= "'".$_POST['gru_con_descuento']."',";
        }

        if(isset($_POST['gru_con_bdi'])){
            $p_grupo_concepto .= "'".$_POST['gru_con_bdi']."',";
        }

        if(strlen($p_grupo_concepto) > 0){
            $p_grupo_concepto = substr($p_grupo_concepto, 0, -1);
        }

        if(strlen($p_tipo_concepto) > 0){
            $p_tipo_concepto = substr($p_tipo_concepto, 0, -1);
        }

        if(strlen($p_tipo_proceso) > 0){
            $p_tipo_proceso = substr($p_tipo_proceso, 0, -1);
        }
    
        
        //print_r($names);
        $this->load->library('excel'); 
        $filename='REPORTE_PROCESO.xls'; //save our workbook as this file name
        //create style of the cell
        /*$styleThinBlackBorderOutline = array(
            'borders' => array(
                'outline' => array(
                    'style' => PHPExcel_Style_Border::BORDER_THIN,
                    'color' => array('argb' => 'FF000000'),
                ),
            ),
        );*/


        $this->excel->setActiveSheetIndex(0);
        $this->excel->getActiveSheet()->setTitle('Información General');
        $this->excel->getActiveSheet()->setCellValue("A1", 'Reporte');
        $this->excel->getActiveSheet()->setCellValue("B1", 'Proceso Consolidado');
        $this->excel->getActiveSheet()->setCellValue("A2", 'Fecha Creación');
        $this->excel->getActiveSheet()->setCellValue("B2", new DateTime());
        $this->excel->getActiveSheet()->setCellValue("A3", 'Usuario Creador');
        $this->excel->getActiveSheet()->setCellValue("B3", $p_usuario);
        $this->excel->getActiveSheet()->setCellValue("A4", 'Periodo');
        $this->excel->getActiveSheet()->setCellValue("B4", $p_proceso);
        $this->excel->getActiveSheet()->setCellValue("A5", 'Tipos de Proceso');
        $this->excel->getActiveSheet()->setCellValue("B5", $p_tipo_proceso);
        $this->excel->getActiveSheet()->setCellValue("A6", 'Grupos de Conceptos');
        $this->excel->getActiveSheet()->setCellValue("B6", $p_grupo_concepto);
        $this->excel->getActiveSheet()->setCellValue("A7", 'Tipo de Conceptos');
        $this->excel->getActiveSheet()->setCellValue("B7", $p_tipo_concepto);
        $this->excel->getActiveSheet()->setCellValue("A8", 'Alineación');
        $this->excel->getActiveSheet()->setCellValue("B8", $cbAlineacion);
        $this->excel->getActiveSheet()->setCellValue("A9", 'Empresa');
        $this->excel->getActiveSheet()->setCellValue("B9", $p_cod_emp);
        $this->excel->getActiveSheet()->setCellValue("A10", 'Rol');
        $this->excel->getActiveSheet()->setCellValue("B10", $p_rol);

        /*$this->excel->getActiveSheet()->getStyleByColumnAndRow(0, 1)->applyFromArray($styleThinBlackBorderOutline);
        $this->excel->getActiveSheet()->getStyleByColumnAndRow(1, 1)->applyFromArray($styleThinBlackBorderOutline);
        $this->excel->getActiveSheet()->getStyleByColumnAndRow(0, 2)->applyFromArray($styleThinBlackBorderOutline);
        $this->excel->getActiveSheet()->getStyleByColumnAndRow(1, 2)->applyFromArray($styleThinBlackBorderOutline);
        $this->excel->getActiveSheet()->getStyleByColumnAndRow(0, 3)->applyFromArray($styleThinBlackBorderOutline);
        $this->excel->getActiveSheet()->getStyleByColumnAndRow(1, 3)->applyFromArray($styleThinBlackBorderOutline);
        $this->excel->getActiveSheet()->getStyleByColumnAndRow(0, 4)->applyFromArray($styleThinBlackBorderOutline);
        $this->excel->getActiveSheet()->getStyleByColumnAndRow(1, 4)->applyFromArray($styleThinBlackBorderOutline);
        $this->excel->getActiveSheet()->getStyleByColumnAndRow(0, 5)->applyFromArray($styleThinBlackBorderOutline);
        $this->excel->getActiveSheet()->getStyleByColumnAndRow(1, 5)->applyFromArray($styleThinBlackBorderOutline);
        $this->excel->getActiveSheet()->getStyleByColumnAndRow(0, 6)->applyFromArray($styleThinBlackBorderOutline);
        $this->excel->getActiveSheet()->getStyleByColumnAndRow(1, 6)->applyFromArray($styleThinBlackBorderOutline);
        $this->excel->getActiveSheet()->getStyleByColumnAndRow(0, 7)->applyFromArray($styleThinBlackBorderOutline);
        $this->excel->getActiveSheet()->getStyleByColumnAndRow(1, 7)->applyFromArray($styleThinBlackBorderOutline);
        $this->excel->getActiveSheet()->getStyleByColumnAndRow(0, 8)->applyFromArray($styleThinBlackBorderOutline);
        $this->excel->getActiveSheet()->getStyleByColumnAndRow(1, 8)->applyFromArray($styleThinBlackBorderOutline);
        $this->excel->getActiveSheet()->getStyleByColumnAndRow(0, 9)->applyFromArray($styleThinBlackBorderOutline);
        $this->excel->getActiveSheet()->getStyleByColumnAndRow(1, 9)->applyFromArray($styleThinBlackBorderOutline);
        $this->excel->getActiveSheet()->getStyleByColumnAndRow(0, 10)->applyFromArray($styleThinBlackBorderOutline);
        $this->excel->getActiveSheet()->getStyleByColumnAndRow(1, 10)->applyFromArray($styleThinBlackBorderOutline);
*/


        /*foreach(range('A','B') as $columnID) {
            $this->excel->getActiveSheet()->getColumnDimension($columnID)->setAutoSize(true);
        }*/

        $names = [];
        if($cbAlineacion == 'HORIZONTAL') {
            $query = $this->ExcelExportModel->cargarProcesoConsolidadoHorizontal($p_cod_emp, $p_proceso, $p_tipo_proceso, $p_grupo_concepto, $p_tipo_concepto, $p_rol, $p_usuario);
            $queryConcepto = $this->ExcelExportModel->cargarConceptosProceso($p_cod_emp, $p_proceso, $p_tipo_proceso, $p_grupo_concepto, $p_tipo_concepto, $p_rol, $p_usuario);
        }else{
            $query = $this->ExcelExportModel->cargarProcesoConsolidadoVertical($p_cod_emp, $p_proceso, $p_tipo_proceso, $p_grupo_concepto, $p_tipo_concepto, $p_rol, $p_usuario);
        }

        if(count($query) > 0){
            $names = get_object_vars($query[0]);
            //print_r($names);
            
            $names = array_keys($names);
            
            //Cargamos la librería de excel.
            
            $this->excel->createSheet();
            $this->excel->setActiveSheetIndex(1);
            $this->excel->getActiveSheet()->setTitle('Datos');
            //Contador de filas
            $current_col = 0;
            $current_row = 1;

            
            //print_r($conceptos);
            //HEADER
            foreach($names as $name) {
                $concepto = "";
                if($cbAlineacion == 'HORIZONTAL') {
                    foreach($queryConcepto as $obj) {
                        $con = get_object_vars($obj);
                        if($name == $con["PFK_COD_CONCEPTO"]) {
                            $concepto = $con["NOM_CONCEPTO"];
                        }
                    }
                }
                if(empty($concepto)){
                    $this->excel->getActiveSheet()->setCellValueByColumnAndRow($current_col, $current_row, $name);
                }else{
                    $this->excel->getActiveSheet()->setCellValueByColumnAndRow($current_col, $current_row, $name . "_" . $concepto);
                }
                
                //$this->excel->getActiveSheet()->getStyleByColumnAndRow($current_col, $current_row)->applyFromArray($styleThinBlackBorderOutline);
                $current_col++;
            }

            $current_row++;

             //DATA
            foreach($query as $obj) {
                $current_col = 0;
                $obj = get_object_vars($obj);
                foreach($names as $name) {
                    $this->excel->getActiveSheet()->setCellValueByColumnAndRow($current_col, $current_row, $obj[$name]);
                    //$this->excel->getActiveSheet()->getStyleByColumnAndRow($current_col, $current_row)->applyFromArray($styleThinBlackBorderOutline);
                    $current_col++;
                }
                $current_row++;
            }

            /*foreach(range('A','IV') as $columnID) {
                $this->excel->getActiveSheet()->getColumnDimension($columnID)->setAutoSize(true);
            }*/
            
         }

         //Le ponemos un nombre al archivo que se va a generar.
         header('Content-Type: application/vnd.ms-excel');
         //header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
         header('Content-Disposition: attachment;filename="'.$filename.'"');
         header('Cache-Control: max-age=0');
         $objWriter = PHPExcel_IOFactory::createWriter($this->excel, 'Excel5');
         //Hacemos una salida al navegador con el archivo Excel.
         $objWriter->save('php://output');

    }

    public function cargarFiniquitoConsolidado() {

        set_time_limit(300);
        ini_set('max_execution_time', '300');
        ini_set('memory_limit', '2048M');
        $dtFec1= $_POST['dtFec1'];
        $dtFec2= $_POST['dtFec2'];
        $cbAlineacion= $_POST['cbAlineacion'];
        $p_cod_emp = $_POST['p_cod_emp'];
        $p_grupo_concepto = '';
        $p_tipo_concepto = '';
        $p_usuario = $_POST['p_usuario'];


        if(isset($_POST['tip_con_seleccionar'])){
            $p_tipo_concepto .= "'".$_POST['tip_con_seleccionar']."',";
        }

        if(isset($_POST['tip_con_rango'])){
            $p_tipo_concepto .= "'".$_POST['tip_con_rango']."',";
        }

        if(isset($_POST['tip_con_porcentaje'])){
            $p_tipo_concepto .= "'".$_POST['tip_con_porcentaje']."',";
        }

        if(isset($_POST['tip_con_monto'])){
            $p_tipo_concepto .= "'".$_POST['tip_con_monto']."',";
        }

        if(isset($_POST['tip_con_cantidad'])){
            $p_tipo_concepto .= "'".$_POST['tip_con_cantidad']."',";
        }

        if(isset($_POST['tip_con_booleano'])){
            $p_tipo_concepto .= "'".$_POST['tip_con_booleano']."',";
        }

        if(isset($_POST['tip_con_booleano2'])){
            $p_tipo_concepto .= "'".$_POST['tip_con_booleano2']."',";
        }

        if(isset($_POST['gru_con_haber'])){
            $p_grupo_concepto .= "'".$_POST['gru_con_haber']."',";
        }

        if(isset($_POST['gru_con_descuento'])){
            $p_grupo_concepto .= "'".$_POST['gru_con_descuento']."',";
        }


        if(strlen($p_grupo_concepto) > 0){
            $p_grupo_concepto = substr($p_grupo_concepto, 0, -1);
        }

        if(strlen($p_tipo_concepto) > 0){
            $p_tipo_concepto = substr($p_tipo_concepto, 0, -1);
        }

    
        
        //print_r($names);
        $this->load->library('excel'); 
        $filename='REPORTE_FINIQUITO.xls'; //save our workbook as this file name
        //create style of the cell
        /*$styleThinBlackBorderOutline = array(
            'borders' => array(
                'outline' => array(
                    'style' => PHPExcel_Style_Border::BORDER_THIN,
                    'color' => array('argb' => 'FF000000'),
                ),
            ),
        );*/


        $this->excel->setActiveSheetIndex(0);
        $this->excel->getActiveSheet()->setTitle('Información General');
        $this->excel->getActiveSheet()->setCellValue("A1", 'Reporte');
        $this->excel->getActiveSheet()->setCellValue("B1", 'Finiquito Consolidado');
        $this->excel->getActiveSheet()->setCellValue("A2", 'Fecha Creación');
        $this->excel->getActiveSheet()->setCellValue("B2", new DateTime());
        $this->excel->getActiveSheet()->setCellValue("A3", 'Usuario Creador');
        $this->excel->getActiveSheet()->setCellValue("B3", $p_usuario);
        $this->excel->getActiveSheet()->setCellValue("A4", 'Desde');
        $this->excel->getActiveSheet()->setCellValue("B4", $dtFec1);
        $this->excel->getActiveSheet()->setCellValue("A5", 'Hasta');
        $this->excel->getActiveSheet()->setCellValue("B5", $dtFec2);
        $this->excel->getActiveSheet()->setCellValue("A6", 'Grupos de Conceptos');
        $this->excel->getActiveSheet()->setCellValue("B6", $p_grupo_concepto);
        $this->excel->getActiveSheet()->setCellValue("A7", 'Tipo de Conceptos');
        $this->excel->getActiveSheet()->setCellValue("B7", $p_tipo_concepto);
        $this->excel->getActiveSheet()->setCellValue("A8", 'Alineación');
        $this->excel->getActiveSheet()->setCellValue("B8", $cbAlineacion);
        $this->excel->getActiveSheet()->setCellValue("A9", 'Empresa');
        $this->excel->getActiveSheet()->setCellValue("B9", $p_cod_emp);

        /*$this->excel->getActiveSheet()->getStyleByColumnAndRow(0, 1)->applyFromArray($styleThinBlackBorderOutline);
        $this->excel->getActiveSheet()->getStyleByColumnAndRow(1, 1)->applyFromArray($styleThinBlackBorderOutline);
        $this->excel->getActiveSheet()->getStyleByColumnAndRow(0, 2)->applyFromArray($styleThinBlackBorderOutline);
        $this->excel->getActiveSheet()->getStyleByColumnAndRow(1, 2)->applyFromArray($styleThinBlackBorderOutline);
        $this->excel->getActiveSheet()->getStyleByColumnAndRow(0, 3)->applyFromArray($styleThinBlackBorderOutline);
        $this->excel->getActiveSheet()->getStyleByColumnAndRow(1, 3)->applyFromArray($styleThinBlackBorderOutline);
        $this->excel->getActiveSheet()->getStyleByColumnAndRow(0, 4)->applyFromArray($styleThinBlackBorderOutline);
        $this->excel->getActiveSheet()->getStyleByColumnAndRow(1, 4)->applyFromArray($styleThinBlackBorderOutline);
        $this->excel->getActiveSheet()->getStyleByColumnAndRow(0, 5)->applyFromArray($styleThinBlackBorderOutline);
        $this->excel->getActiveSheet()->getStyleByColumnAndRow(1, 5)->applyFromArray($styleThinBlackBorderOutline);
        $this->excel->getActiveSheet()->getStyleByColumnAndRow(0, 6)->applyFromArray($styleThinBlackBorderOutline);
        $this->excel->getActiveSheet()->getStyleByColumnAndRow(1, 6)->applyFromArray($styleThinBlackBorderOutline);
        $this->excel->getActiveSheet()->getStyleByColumnAndRow(0, 7)->applyFromArray($styleThinBlackBorderOutline);
        $this->excel->getActiveSheet()->getStyleByColumnAndRow(1, 7)->applyFromArray($styleThinBlackBorderOutline);
        $this->excel->getActiveSheet()->getStyleByColumnAndRow(0, 8)->applyFromArray($styleThinBlackBorderOutline);
        $this->excel->getActiveSheet()->getStyleByColumnAndRow(1, 8)->applyFromArray($styleThinBlackBorderOutline);
        $this->excel->getActiveSheet()->getStyleByColumnAndRow(0, 9)->applyFromArray($styleThinBlackBorderOutline);
        $this->excel->getActiveSheet()->getStyleByColumnAndRow(1, 9)->applyFromArray($styleThinBlackBorderOutline);
*/
        /*foreach(range('A','B') as $columnID) {
            $this->excel->getActiveSheet()->getColumnDimension($columnID)->setAutoSize(true);
        }*/

        $names = [];
        
        
        if($cbAlineacion == 'HORIZONTAL') {
            $query = $this->ExcelExportModel->cargarFiniquitoConsolidadoHorizontal($p_cod_emp, $dtFec1, $dtFec2, $p_grupo_concepto, $p_tipo_concepto);
            $queryConcepto = $this->ExcelExportModel->cargarConceptosFiniquito($p_cod_emp, $dtFec1, $dtFec2, $p_grupo_concepto, $p_tipo_concepto);
        }else{
            $query = $this->ExcelExportModel->cargarFiniquitoConsolidadoVertical($p_cod_emp, $dtFec1, $dtFec2, $p_grupo_concepto, $p_tipo_concepto);
        }

        if(count($query) > 0){
            $names = get_object_vars($query[0]);
            //print_r($names);
            
            $names = array_keys($names);
            
            //Cargamos la librería de excel.
            
            $this->excel->createSheet();
            $this->excel->setActiveSheetIndex(1);
            $this->excel->getActiveSheet()->setTitle('Datos');
            //Contador de filas
            $current_col = 0;
            $current_row = 1;

            
            //print_r($conceptos);
            //HEADER
            foreach($names as $name) {
                $concepto = "";
                if($cbAlineacion == 'HORIZONTAL') {
                    foreach($queryConcepto as $obj) {
                        $con = get_object_vars($obj);
                        if($name == $con["PFK_COD_CONCEPTO"]) {
                            $concepto = $con["NOM_CONCEPTO"];
                        }
                    }
                }
                if(empty($concepto)){
                    $this->excel->getActiveSheet()->setCellValueByColumnAndRow($current_col, $current_row, $name);
                }else{
                    $this->excel->getActiveSheet()->setCellValueByColumnAndRow($current_col, $current_row, $name . "_" . $concepto);
                }
                
                //$this->excel->getActiveSheet()->getStyleByColumnAndRow($current_col, $current_row)->applyFromArray($styleThinBlackBorderOutline);
                $current_col++;
            }

            $current_row++;

             //DATA
            foreach($query as $obj) {
                $current_col = 0;
                $obj = get_object_vars($obj);
                foreach($names as $name) {
                    $this->excel->getActiveSheet()->setCellValueByColumnAndRow($current_col, $current_row, $obj[$name]);
                    //$this->excel->getActiveSheet()->getStyleByColumnAndRow($current_col, $current_row)->applyFromArray($styleThinBlackBorderOutline);
                    $current_col++;
                }
                $current_row++;
            }

            /*foreach(range('A','IV') as $columnID) {
                $this->excel->getActiveSheet()->getColumnDimension($columnID)->setAutoSize(true);
            }*/
            
         }

         //Le ponemos un nombre al archivo que se va a generar.
         header('Content-Type: application/vnd.ms-excel');
         //header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
         header('Content-Disposition: attachment;filename="'.$filename.'"');
         header('Cache-Control: max-age=0');
         $objWriter = PHPExcel_IOFactory::createWriter($this->excel, 'Excel5');
         //Hacemos una salida al navegador con el archivo Excel.
         $objWriter->save('php://output');

    }


    public function cargarIngresarPersonalConsolidado() {

        set_time_limit(300);
        ini_set('max_execution_time', '300');
        ini_set('memory_limit', '2048M');
        $dtFec1= $_POST['dtFec1'];
        $dtFec2= $_POST['dtFec2'];
        $p_cod_emp = $_POST['p_cod_emp'];
        $p_usuario = $_POST['p_usuario'];
        $cbAlineacion = 'HORIZONTAL';

        //print_r($names);
        $this->load->library('excel'); 
        $filename='REPORTE_INGRESAR_PERSONAL.xls'; //save our workbook as this file name
        //create style of the cell


        $this->excel->setActiveSheetIndex(0);
        $this->excel->getActiveSheet()->setTitle('Información General');
        $this->excel->getActiveSheet()->setCellValue("A1", 'Reporte');
        $this->excel->getActiveSheet()->setCellValue("B1", 'Ingreso Consolidado');
        $this->excel->getActiveSheet()->setCellValue("A2", 'Fecha Creación');
        $this->excel->getActiveSheet()->setCellValue("B2", new DateTime());
        $this->excel->getActiveSheet()->setCellValue("A3", 'Usuario Creador');
        $this->excel->getActiveSheet()->setCellValue("B3", $p_usuario);
        $this->excel->getActiveSheet()->setCellValue("A4", 'Desde');
        $this->excel->getActiveSheet()->setCellValue("B4", $dtFec1);
        $this->excel->getActiveSheet()->setCellValue("A5", 'Hasta');
        $this->excel->getActiveSheet()->setCellValue("B5", $dtFec2);
        $this->excel->getActiveSheet()->setCellValue("A6", 'Empresa');
        $this->excel->getActiveSheet()->setCellValue("B6", $p_cod_emp);


        $names = [];
        
        
        if($cbAlineacion == 'HORIZONTAL') {
            $query = $this->ExcelExportModel->cagarIngresosPersonalConsolidadoHorizontal($p_cod_emp, $dtFec1, $dtFec2);
            $queryConcepto = $this->ExcelExportModel->cargarConceptosIngresoPersonal($p_cod_emp, $dtFec1, $dtFec2);
        }else{
            $query = $this->ExcelExportModel->cagarIngresosPersonalConsolidadoHorizontal($p_cod_emp, $dtFec1, $dtFec2);
        }

        if(count($query) > 0){
            $names = get_object_vars($query[0]);
            //print_r($names);
            
            $names = array_keys($names);
            
            //Cargamos la librería de excel.
            
            $this->excel->createSheet();
            $this->excel->setActiveSheetIndex(1);
            $this->excel->getActiveSheet()->setTitle('Datos');
            //Contador de filas
            $current_col = 0;
            $current_row = 1;

            
            //print_r($conceptos);
            //HEADER
            foreach($names as $name) {
                $concepto = "";
                if($cbAlineacion == 'HORIZONTAL') {
                    foreach($queryConcepto as $obj) {
                        $con = get_object_vars($obj);
                        if($name == $con["PFK_COD_CONCEPTO"]) {
                            $concepto = $con["NOM_CONCEPTO"];
                        }
                    }
                }
                if(empty($concepto)){
                    $this->excel->getActiveSheet()->setCellValueByColumnAndRow($current_col, $current_row, $name);
                }else{
                    $this->excel->getActiveSheet()->setCellValueByColumnAndRow($current_col, $current_row, $name . "_" . $concepto);
                }
                
                //$this->excel->getActiveSheet()->getStyleByColumnAndRow($current_col, $current_row)->applyFromArray($styleThinBlackBorderOutline);
                $current_col++;
            }

            $current_row++;

             //DATA
            foreach($query as $obj) {
                $current_col = 0;
                $obj = get_object_vars($obj);
                foreach($names as $name) {
                    $this->excel->getActiveSheet()->setCellValueByColumnAndRow($current_col, $current_row, $obj[$name]);
                    //$this->excel->getActiveSheet()->getStyleByColumnAndRow($current_col, $current_row)->applyFromArray($styleThinBlackBorderOutline);
                    $current_col++;
                }
                $current_row++;
            }

            
         }

         //Le ponemos un nombre al archivo que se va a generar.
         header('Content-Type: application/vnd.ms-excel');
         //header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
         header('Content-Disposition: attachment;filename="'.$filename.'"');
         header('Cache-Control: max-age=0');
         $objWriter = PHPExcel_IOFactory::createWriter($this->excel, 'Excel5');
         //Hacemos una salida al navegador con el archivo Excel.
         $objWriter->save('php://output');

    }


    public function cargarCambiarAFPConsolidado() {

        set_time_limit(300);
        ini_set('max_execution_time', '300');
        ini_set('memory_limit', '2048M');
        $dtFec1= $_POST['dtFec1'];
        $dtFec2= $_POST['dtFec2'];
        $p_cod_emp = $_POST['p_cod_emp'];
        $p_usuario = $_POST['p_usuario'];

        //print_r($names);
        $this->load->library('excel'); 
        $filename='REPORTE_CAMBIAR_AFP.xls'; //save our workbook as this file name
        


        $this->excel->setActiveSheetIndex(0);
        $this->excel->getActiveSheet()->setTitle('Información General');
        $this->excel->getActiveSheet()->setCellValue("A1", 'Reporte');
        $this->excel->getActiveSheet()->setCellValue("B1", 'Cambios de AFP');
        $this->excel->getActiveSheet()->setCellValue("A2", 'Fecha Creación');
        $this->excel->getActiveSheet()->setCellValue("B2", new DateTime());
        $this->excel->getActiveSheet()->setCellValue("A3", 'Usuario Creador');
        $this->excel->getActiveSheet()->setCellValue("B3", $p_usuario);
        $this->excel->getActiveSheet()->setCellValue("A4", 'Desde');
        $this->excel->getActiveSheet()->setCellValue("B4", $dtFec1);
        $this->excel->getActiveSheet()->setCellValue("A5", 'Hasta');
        $this->excel->getActiveSheet()->setCellValue("B5", $dtFec2);
        $this->excel->getActiveSheet()->setCellValue("A6", 'Empresa');
        $this->excel->getActiveSheet()->setCellValue("B6", $p_cod_emp);


        $names = [];
        $query = $this->ExcelExportModel->cargarCambiarAFPConsolidado($p_cod_emp, $dtFec1, $dtFec2);
        
        if(count($query) > 0){
            $names = get_object_vars($query[0]);
            //print_r($names);
            
            $names = array_keys($names);
            
            //Cargamos la librería de excel.
            
            $this->excel->createSheet();
            $this->excel->setActiveSheetIndex(1);
            $this->excel->getActiveSheet()->setTitle('Datos');
            //Contador de filas
            $current_col = 0;
            $current_row = 1;

            
            //print_r($conceptos);
            //HEADER
            foreach($names as $name) {
                $this->excel->getActiveSheet()->setCellValueByColumnAndRow($current_col, $current_row, $name);
                $current_col++;
            }

            $current_row++;

             //DATA
            foreach($query as $obj) {
                $current_col = 0;
                $obj = get_object_vars($obj);
                foreach($names as $name) {
                    $this->excel->getActiveSheet()->setCellValueByColumnAndRow($current_col, $current_row, $obj[$name]);
                    $current_col++;
                }
                $current_row++;
            }
            
         }

         //Le ponemos un nombre al archivo que se va a generar.
         header('Content-Type: application/vnd.ms-excel');
         //header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
         header('Content-Disposition: attachment;filename="'.$filename.'"');
         header('Cache-Control: max-age=0');
         $objWriter = PHPExcel_IOFactory::createWriter($this->excel, 'Excel5');
         //Hacemos una salida al navegador con el archivo Excel.
         $objWriter->save('php://output');

    }


    public function cargarCambiarSaludConsolidado() {

        set_time_limit(300);
        ini_set('max_execution_time', '300');
        ini_set('memory_limit', '2048M');
        $dtFec1= $_POST['dtFec1'];
        $dtFec2= $_POST['dtFec2'];
        $p_cod_emp = $_POST['p_cod_emp'];
        $p_usuario = $_POST['p_usuario'];

        //print_r($names);
        $this->load->library('excel'); 
        $filename='REPORTE_CAMBIAR_SALUD.xls'; //save our workbook as this file name


        $this->excel->setActiveSheetIndex(0);
        $this->excel->getActiveSheet()->setTitle('Información General');
        $this->excel->getActiveSheet()->setCellValue("A1", 'Reporte');
        $this->excel->getActiveSheet()->setCellValue("B1", 'Cambios de Salud');
        $this->excel->getActiveSheet()->setCellValue("A2", 'Fecha Creación');
        $this->excel->getActiveSheet()->setCellValue("B2", new DateTime());
        $this->excel->getActiveSheet()->setCellValue("A3", 'Usuario Creador');
        $this->excel->getActiveSheet()->setCellValue("B3", $p_usuario);
        $this->excel->getActiveSheet()->setCellValue("A4", 'Desde');
        $this->excel->getActiveSheet()->setCellValue("B4", $dtFec1);
        $this->excel->getActiveSheet()->setCellValue("A5", 'Hasta');
        $this->excel->getActiveSheet()->setCellValue("B5", $dtFec2);
        $this->excel->getActiveSheet()->setCellValue("A6", 'Empresa');
        $this->excel->getActiveSheet()->setCellValue("B6", $p_cod_emp);


        $names = [];
        $query = $this->ExcelExportModel->cargarCambiarSaludConsolidado($p_cod_emp, $dtFec1, $dtFec2);
        
        if(count($query) > 0){
            $names = get_object_vars($query[0]);
            //print_r($names);
            
            $names = array_keys($names);
            
            //Cargamos la librería de excel.
            
            $this->excel->createSheet();
            $this->excel->setActiveSheetIndex(1);
            $this->excel->getActiveSheet()->setTitle('Datos');
            //Contador de filas
            $current_col = 0;
            $current_row = 1;

            
            //print_r($conceptos);
            //HEADER
            foreach($names as $name) {
                $this->excel->getActiveSheet()->setCellValueByColumnAndRow($current_col, $current_row, $name);
                $current_col++;
            }

            $current_row++;

             //DATA
            foreach($query as $obj) {
                $current_col = 0;
                $obj = get_object_vars($obj);
                foreach($names as $name) {
                    $this->excel->getActiveSheet()->setCellValueByColumnAndRow($current_col, $current_row, $obj[$name]);
                    $current_col++;
                }
                $current_row++;
            }

         }

         //Le ponemos un nombre al archivo que se va a generar.
         header('Content-Type: application/vnd.ms-excel');
         //header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
         header('Content-Disposition: attachment;filename="'.$filename.'"');
         header('Cache-Control: max-age=0');
         $objWriter = PHPExcel_IOFactory::createWriter($this->excel, 'Excel5');
         //Hacemos una salida al navegador con el archivo Excel.
         $objWriter->save('php://output');

    }

    public function cargarCambiarSindicatoConsolidado() {

        set_time_limit(300);
        $dtFec1= $_POST['dtFec1'];
        $dtFec2= $_POST['dtFec2'];
        $p_cod_emp = $_POST['p_cod_emp'];
        $p_usuario = $_POST['p_usuario'];

        //print_r($names);
        $this->load->library('excel'); 
        $filename='REPORTE_CAMBIAR_SINDICATO.xls'; //save our workbook as this file name


        $this->excel->setActiveSheetIndex(0);
        $this->excel->getActiveSheet()->setTitle('Información General');
        $this->excel->getActiveSheet()->setCellValue("A1", 'Reporte');
        $this->excel->getActiveSheet()->setCellValue("B1", 'Cambios de Sindicato');
        $this->excel->getActiveSheet()->setCellValue("A2", 'Fecha Creación');
        $this->excel->getActiveSheet()->setCellValue("B2", new DateTime());
        $this->excel->getActiveSheet()->setCellValue("A3", 'Usuario Creador');
        $this->excel->getActiveSheet()->setCellValue("B3", $p_usuario);
        $this->excel->getActiveSheet()->setCellValue("A4", 'Desde');
        $this->excel->getActiveSheet()->setCellValue("B4", $dtFec1);
        $this->excel->getActiveSheet()->setCellValue("A5", 'Hasta');
        $this->excel->getActiveSheet()->setCellValue("B5", $dtFec2);
        $this->excel->getActiveSheet()->setCellValue("A6", 'Empresa');
        $this->excel->getActiveSheet()->setCellValue("B6", $p_cod_emp);


        $names = [];
        $query = $this->ExcelExportModel->cargarCambiarSindicatoConsolidado($p_cod_emp, $dtFec1, $dtFec2);
        
        if(count($query) > 0){
            $names = get_object_vars($query[0]);
            //print_r($names);
            
            $names = array_keys($names);
            
            //Cargamos la librería de excel.
            
            $this->excel->createSheet();
            $this->excel->setActiveSheetIndex(1);
            $this->excel->getActiveSheet()->setTitle('Datos');
            //Contador de filas
            $current_col = 0;
            $current_row = 1;

            
            //print_r($conceptos);
            //HEADER
            foreach($names as $name) {
                $this->excel->getActiveSheet()->setCellValueByColumnAndRow($current_col, $current_row, $name);
                $current_col++;
            }

            $current_row++;

             //DATA
            foreach($query as $obj) {
                $current_col = 0;
                $obj = get_object_vars($obj);
                foreach($names as $name) {
                    $this->excel->getActiveSheet()->setCellValueByColumnAndRow($current_col, $current_row, $obj[$name]);
                    $current_col++;
                }
                $current_row++;
            }

         }

         //Le ponemos un nombre al archivo que se va a generar.
         header('Content-Type: application/vnd.ms-excel');
         //header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
         header('Content-Disposition: attachment;filename="'.$filename.'"');
         header('Cache-Control: max-age=0');
         $objWriter = PHPExcel_IOFactory::createWriter($this->excel, 'Excel5');
         //Hacemos una salida al navegador con el archivo Excel.
         $objWriter->save('php://output');

    }
    public function cargarCambiarDepositoConsolidado() {

        set_time_limit(300);
        ini_set('max_execution_time', '300');
        ini_set('memory_limit', '2048M');

        $dtFec1= $_POST['dtFec1'];
        $dtFec2= $_POST['dtFec2'];
        $p_cod_emp = $_POST['p_cod_emp'];
        $p_usuario = $_POST['p_usuario'];

        //print_r($names);
        $this->load->library('excel'); 
        $filename='REPORTE_CAMBIAR_DEPOSITO.xls'; //save our workbook as this file name


        $this->excel->setActiveSheetIndex(0);
        $this->excel->getActiveSheet()->setTitle('Información General');
        $this->excel->getActiveSheet()->setCellValue("A1", 'Reporte');
        $this->excel->getActiveSheet()->setCellValue("B1", 'Cambios Deposito Remuneración');
        $this->excel->getActiveSheet()->setCellValue("A2", 'Fecha Creación');
        $this->excel->getActiveSheet()->setCellValue("B2", new DateTime());
        $this->excel->getActiveSheet()->setCellValue("A3", 'Usuario Creador');
        $this->excel->getActiveSheet()->setCellValue("B3", $p_usuario);
        $this->excel->getActiveSheet()->setCellValue("A4", 'Desde');
        $this->excel->getActiveSheet()->setCellValue("B4", $dtFec1);
        $this->excel->getActiveSheet()->setCellValue("A5", 'Hasta');
        $this->excel->getActiveSheet()->setCellValue("B5", $dtFec2);
        $this->excel->getActiveSheet()->setCellValue("A6", 'Empresa');
        $this->excel->getActiveSheet()->setCellValue("B6", $p_cod_emp);


        $names = [];
        $query = $this->ExcelExportModel->cargarCambiarDepositoConsolidado($p_cod_emp, $dtFec1, $dtFec2);
        
        if(count($query) > 0){
            $names = get_object_vars($query[0]);
            //print_r($names);
            
            $names = array_keys($names);
            
            //Cargamos la librería de excel.
            
            $this->excel->createSheet();
            $this->excel->setActiveSheetIndex(1);
            $this->excel->getActiveSheet()->setTitle('Datos');
            //Contador de filas
            $current_col = 0;
            $current_row = 1;

            
            //print_r($conceptos);
            //HEADER
            foreach($names as $name) {
                $this->excel->getActiveSheet()->setCellValueByColumnAndRow($current_col, $current_row, $name);
                $current_col++;
            }

            $current_row++;

             //DATA
            foreach($query as $obj) {
                $current_col = 0;
                $obj = get_object_vars($obj);
                foreach($names as $name) {
                    $this->excel->getActiveSheet()->setCellValueByColumnAndRow($current_col, $current_row, $obj[$name]);
                    $current_col++;
                }
                $current_row++;
            }

            /*foreach(range('A','IV') as $columnID) {
                $this->excel->getActiveSheet()->getColumnDimension($columnID)->setAutoSize(true);
            }*/
            
         }

         //Le ponemos un nombre al archivo que se va a generar.
         header('Content-Type: application/vnd.ms-excel');
         //header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
         header('Content-Disposition: attachment;filename="'.$filename.'"');
         header('Cache-Control: max-age=0');
         $objWriter = PHPExcel_IOFactory::createWriter($this->excel, 'Excel5');
         //Hacemos una salida al navegador con el archivo Excel.
         $objWriter->save('php://output');

    }

    public function cargarCambiarCargoRentaConsolidado() {

        set_time_limit(300);
        ini_set('max_execution_time', '300');
        ini_set('memory_limit', '2048M');

        $dtFec1= $_POST['dtFec1'];
        $dtFec2= $_POST['dtFec2'];
        $p_cod_emp = $_POST['p_cod_emp'];
        $p_usuario = $_POST['p_usuario'];

        //print_r($names);
        $this->load->library('excel'); 
        $filename='REPORTE_CAMBIAR_CARGO_RENTA.xls'; //save our workbook as this file name

        $this->excel->setActiveSheetIndex(0);
        $this->excel->getActiveSheet()->setTitle('Información General');
        $this->excel->getActiveSheet()->setCellValue("A1", 'Reporte');
        $this->excel->getActiveSheet()->setCellValue("B1", 'Cambios Cargo Renta');
        $this->excel->getActiveSheet()->setCellValue("A2", 'Fecha Creación');
        $this->excel->getActiveSheet()->setCellValue("B2", new DateTime());
        $this->excel->getActiveSheet()->setCellValue("A3", 'Usuario Creador');
        $this->excel->getActiveSheet()->setCellValue("B3", $p_usuario);
        $this->excel->getActiveSheet()->setCellValue("A4", 'Desde');
        $this->excel->getActiveSheet()->setCellValue("B4", $dtFec1);
        $this->excel->getActiveSheet()->setCellValue("A5", 'Hasta');
        $this->excel->getActiveSheet()->setCellValue("B5", $dtFec2);
        $this->excel->getActiveSheet()->setCellValue("A6", 'Empresa');
        $this->excel->getActiveSheet()->setCellValue("B6", $p_cod_emp);


        $names = [];
        $query = $this->ExcelExportModel->cargarCambiarCargoRentaConsolidado($p_cod_emp, $dtFec1, $dtFec2);
        
        if(count($query) > 0){
            $names = get_object_vars($query[0]);
            //print_r($names);
            
            $names = array_keys($names);
            
            //Cargamos la librería de excel.
            
            $this->excel->createSheet();
            $this->excel->setActiveSheetIndex(1);
            $this->excel->getActiveSheet()->setTitle('Datos');
            //Contador de filas
            $current_col = 0;
            $current_row = 1;

            
            //print_r($conceptos);
            //HEADER
            foreach($names as $name) {
                $this->excel->getActiveSheet()->setCellValueByColumnAndRow($current_col, $current_row, $name);
                $current_col++;
            }

            $current_row++;

             //DATA
            foreach($query as $obj) {
                $current_col = 0;
                $obj = get_object_vars($obj);
                foreach($names as $name) {
                    $this->excel->getActiveSheet()->setCellValueByColumnAndRow($current_col, $current_row, $obj[$name]);
                    $current_col++;
                }
                $current_row++;
            }

            
         }

         //Le ponemos un nombre al archivo que se va a generar.
         header('Content-Type: application/vnd.ms-excel');
         //header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
         header('Content-Disposition: attachment;filename="'.$filename.'"');
         header('Cache-Control: max-age=0');
         $objWriter = PHPExcel_IOFactory::createWriter($this->excel, 'Excel5');
         //Hacemos una salida al navegador con el archivo Excel.
         $objWriter->save('php://output');

    }


    public function cargarCambiarOtrosConsolidado() {

        set_time_limit(300);
        ini_set('max_execution_time', '300');
        ini_set('memory_limit', '2048M');

        $dtFec1= $_POST['dtFec1'];
        $dtFec2= $_POST['dtFec2'];
        $p_cod_emp = $_POST['p_cod_emp'];
        $p_usuario = $_POST['p_usuario'];

        //print_r($names);
        $this->load->library('excel'); 
        $filename='REPORTE_CAMBIAR_OTROS.xls'; //save our workbook as this file name


        $this->excel->setActiveSheetIndex(0);
        $this->excel->getActiveSheet()->setTitle('Información General');
        $this->excel->getActiveSheet()->setCellValue("A1", 'Reporte');
        $this->excel->getActiveSheet()->setCellValue("B1", 'Cambios Otros');
        $this->excel->getActiveSheet()->setCellValue("A2", 'Fecha Creación');
        $this->excel->getActiveSheet()->setCellValue("B2", new DateTime());
        $this->excel->getActiveSheet()->setCellValue("A3", 'Usuario Creador');
        $this->excel->getActiveSheet()->setCellValue("B3", $p_usuario);
        $this->excel->getActiveSheet()->setCellValue("A4", 'Desde');
        $this->excel->getActiveSheet()->setCellValue("B4", $dtFec1);
        $this->excel->getActiveSheet()->setCellValue("A5", 'Hasta');
        $this->excel->getActiveSheet()->setCellValue("B5", $dtFec2);
        $this->excel->getActiveSheet()->setCellValue("A6", 'Empresa');
        $this->excel->getActiveSheet()->setCellValue("B6", $p_cod_emp);


        $names = [];
        $query = $this->ExcelExportModel->cargarCambiarOtrosConsolidado($p_cod_emp, $dtFec1, $dtFec2);
        
        if(count($query) > 0){
            $names = get_object_vars($query[0]);
            //print_r($names);
            
            $names = array_keys($names);
            
            //Cargamos la librería de excel.
            
            $this->excel->createSheet();
            $this->excel->setActiveSheetIndex(1);
            $this->excel->getActiveSheet()->setTitle('Datos');
            //Contador de filas
            $current_col = 0;
            $current_row = 1;

            
            //print_r($conceptos);
            //HEADER
            foreach($names as $name) {
                $this->excel->getActiveSheet()->setCellValueByColumnAndRow($current_col, $current_row, $name);
                $current_col++;
            }

            $current_row++;

             //DATA
            foreach($query as $obj) {
                $current_col = 0;
                $obj = get_object_vars($obj);
                foreach($names as $name) {
                    $this->excel->getActiveSheet()->setCellValueByColumnAndRow($current_col, $current_row, $obj[$name]);
                    $current_col++;
                }
                $current_row++;
            }
            
         }

         //Le ponemos un nombre al archivo que se va a generar.
         header('Content-Type: application/vnd.ms-excel');
         //header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
         header('Content-Disposition: attachment;filename="'.$filename.'"');
         header('Cache-Control: max-age=0');
         $objWriter = PHPExcel_IOFactory::createWriter($this->excel, 'Excel5');
         //Hacemos una salida al navegador con el archivo Excel.
         $objWriter->save('php://output');

    }

    public function cargarCambiarBonosConsolidado() {

        set_time_limit(300);
        ini_set('max_execution_time', '300');
        ini_set('memory_limit', '2048M');

        $dtFec1= $_POST['dtFec1'];
        $dtFec2= $_POST['dtFec2'];
        $p_cod_emp = $_POST['p_cod_emp'];
        $p_usuario = $_POST['p_usuario'];

        //print_r($names);
        $this->load->library('excel'); 
        $filename='REPORTE_CAMBIAR_BONOS.xls'; //save our workbook as this file name

        $this->excel->setActiveSheetIndex(0);
        $this->excel->getActiveSheet()->setTitle('Información General');
        $this->excel->getActiveSheet()->setCellValue("A1", 'Reporte');
        $this->excel->getActiveSheet()->setCellValue("B1", 'Cambios Bonos');
        $this->excel->getActiveSheet()->setCellValue("A2", 'Fecha Creación');
        $this->excel->getActiveSheet()->setCellValue("B2", new DateTime());
        $this->excel->getActiveSheet()->setCellValue("A3", 'Usuario Creador');
        $this->excel->getActiveSheet()->setCellValue("B3", $p_usuario);
        $this->excel->getActiveSheet()->setCellValue("A4", 'Desde');
        $this->excel->getActiveSheet()->setCellValue("B4", $dtFec1);
        $this->excel->getActiveSheet()->setCellValue("A5", 'Hasta');
        $this->excel->getActiveSheet()->setCellValue("B5", $dtFec2);
        $this->excel->getActiveSheet()->setCellValue("A6", 'Empresa');
        $this->excel->getActiveSheet()->setCellValue("B6", $p_cod_emp);


        $names = [];
        $query = $this->ExcelExportModel->cargarCambiarBonosConsolidado($p_cod_emp, $dtFec1, $dtFec2);
        
        if(count($query) > 0){
            $names = get_object_vars($query[0]);
            //print_r($names);
            
            $names = array_keys($names);
            
            //Cargamos la librería de excel.
            
            $this->excel->createSheet();
            $this->excel->setActiveSheetIndex(1);
            $this->excel->getActiveSheet()->setTitle('Datos');
            //Contador de filas
            $current_col = 0;
            $current_row = 1;

            
            //print_r($conceptos);
            //HEADER
            foreach($names as $name) {
                $this->excel->getActiveSheet()->setCellValueByColumnAndRow($current_col, $current_row, $name);
                $current_col++;
            }

            $current_row++;

             //DATA
            foreach($query as $obj) {
                $current_col = 0;
                $obj = get_object_vars($obj);
                foreach($names as $name) {
                    $this->excel->getActiveSheet()->setCellValueByColumnAndRow($current_col, $current_row, $obj[$name]);
                    $current_col++;
                }
                $current_row++;
            }

         }

         //Le ponemos un nombre al archivo que se va a generar.
         header('Content-Type: application/vnd.ms-excel');
         //header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
         header('Content-Disposition: attachment;filename="'.$filename.'"');
         header('Cache-Control: max-age=0');
         $objWriter = PHPExcel_IOFactory::createWriter($this->excel, 'Excel5');
         //Hacemos una salida al navegador con el archivo Excel.
         $objWriter->save('php://output');

    }

    public function cargarIngDescuentoRRLLConsolidado() {

        set_time_limit(300);
        ini_set('max_execution_time', '300');
        ini_set('memory_limit', '2048M');

        $dtFec1= $_POST['dtFec1'];
        $dtFec2= $_POST['dtFec2'];
        $p_cod_emp = $_POST['p_cod_emp'];
        $p_usuario = $_POST['p_usuario'];

        //print_r($names);
        $this->load->library('excel'); 
        $filename='REPORTE_DESCUENTOS_RRLL.xls'; //save our workbook as this file name



        $this->excel->setActiveSheetIndex(0);
        $this->excel->getActiveSheet()->setTitle('Información General');
        $this->excel->getActiveSheet()->setCellValue("A1", 'Reporte');
        $this->excel->getActiveSheet()->setCellValue("B1", 'Descuentos RRLL');
        $this->excel->getActiveSheet()->setCellValue("A2", 'Fecha Creación');
        $this->excel->getActiveSheet()->setCellValue("B2", new DateTime());
        $this->excel->getActiveSheet()->setCellValue("A3", 'Usuario Creador');
        $this->excel->getActiveSheet()->setCellValue("B3", $p_usuario);
        $this->excel->getActiveSheet()->setCellValue("A4", 'Desde');
        $this->excel->getActiveSheet()->setCellValue("B4", $dtFec1);
        $this->excel->getActiveSheet()->setCellValue("A5", 'Hasta');
        $this->excel->getActiveSheet()->setCellValue("B5", $dtFec2);
        $this->excel->getActiveSheet()->setCellValue("A6", 'Empresa');
        $this->excel->getActiveSheet()->setCellValue("B6", $p_cod_emp);


        $names = [];
        $query = $this->ExcelExportModel->cargarIngDescuentoRRLLConsolidado($p_cod_emp, $dtFec1, $dtFec2);
        
        if(count($query) > 0){
            $names = get_object_vars($query[0]);
            //print_r($names);
            
            $names = array_keys($names);
            
            //Cargamos la librería de excel.
            
            $this->excel->createSheet();
            $this->excel->setActiveSheetIndex(1);
            $this->excel->getActiveSheet()->setTitle('Datos');
            //Contador de filas
            $current_col = 0;
            $current_row = 1;

            
            //print_r($conceptos);
            //HEADER
            foreach($names as $name) {
                $this->excel->getActiveSheet()->setCellValueByColumnAndRow($current_col, $current_row, $name);
                $current_col++;
            }

            $current_row++;

             //DATA
            foreach($query as $obj) {
                $current_col = 0;
                $obj = get_object_vars($obj);
                foreach($names as $name) {
                    $this->excel->getActiveSheet()->setCellValueByColumnAndRow($current_col, $current_row, $obj[$name]);
                    $current_col++;
                }
                $current_row++;
            }
            
         }

         //Le ponemos un nombre al archivo que se va a generar.
         header('Content-Type: application/vnd.ms-excel');
         //header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
         header('Content-Disposition: attachment;filename="'.$filename.'"');
         header('Cache-Control: max-age=0');
         $objWriter = PHPExcel_IOFactory::createWriter($this->excel, 'Excel5');
         //Hacemos una salida al navegador con el archivo Excel.
         $objWriter->save('php://output');

    }

    public function cargarIngHaberRRLLConsolidado() {

        set_time_limit(300);
        ini_set('max_execution_time', '300');
        ini_set('memory_limit', '2048M');

        $dtFec1= $_POST['dtFec1'];
        $dtFec2= $_POST['dtFec2'];
        $p_cod_emp = $_POST['p_cod_emp'];
        $p_usuario = $_POST['p_usuario'];

        //print_r($names);
        $this->load->library('excel'); 
        $filename='REPORTE_HABERES_RRLL.xls'; //save our workbook as this file name


        $this->excel->setActiveSheetIndex(0);
        $this->excel->getActiveSheet()->setTitle('Información General');
        $this->excel->getActiveSheet()->setCellValue("A1", 'Reporte');
        $this->excel->getActiveSheet()->setCellValue("B1", 'Haberes RRLL');
        $this->excel->getActiveSheet()->setCellValue("A2", 'Fecha Creación');
        $this->excel->getActiveSheet()->setCellValue("B2", new DateTime());
        $this->excel->getActiveSheet()->setCellValue("A3", 'Usuario Creador');
        $this->excel->getActiveSheet()->setCellValue("B3", $p_usuario);
        $this->excel->getActiveSheet()->setCellValue("A4", 'Desde');
        $this->excel->getActiveSheet()->setCellValue("B4", $dtFec1);
        $this->excel->getActiveSheet()->setCellValue("A5", 'Hasta');
        $this->excel->getActiveSheet()->setCellValue("B5", $dtFec2);
        $this->excel->getActiveSheet()->setCellValue("A6", 'Empresa');
        $this->excel->getActiveSheet()->setCellValue("B6", $p_cod_emp);


        $names = [];
        $query = $this->ExcelExportModel->cargarIngHaberRRLLConsolidado($p_cod_emp, $dtFec1, $dtFec2);
        
        if(count($query) > 0){
            $names = get_object_vars($query[0]);
            //print_r($names);
            
            $names = array_keys($names);
            
            //Cargamos la librería de excel.
            
            $this->excel->createSheet();
            $this->excel->setActiveSheetIndex(1);
            $this->excel->getActiveSheet()->setTitle('Datos');
            //Contador de filas
            $current_col = 0;
            $current_row = 1;

            
            //print_r($conceptos);
            //HEADER
            foreach($names as $name) {
                $this->excel->getActiveSheet()->setCellValueByColumnAndRow($current_col, $current_row, $name);
                $current_col++;
            }

            $current_row++;

             //DATA
            foreach($query as $obj) {
                $current_col = 0;
                $obj = get_object_vars($obj);
                foreach($names as $name) {
                    $this->excel->getActiveSheet()->setCellValueByColumnAndRow($current_col, $current_row, $obj[$name]);
                    $current_col++;
                }
                $current_row++;
            }

         }

         //Le ponemos un nombre al archivo que se va a generar.
         header('Content-Type: application/vnd.ms-excel');
         //header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
         header('Content-Disposition: attachment;filename="'.$filename.'"');
         header('Cache-Control: max-age=0');
         $objWriter = PHPExcel_IOFactory::createWriter($this->excel, 'Excel5');
         //Hacemos una salida al navegador con el archivo Excel.
         $objWriter->save('php://output');

    }

    public function cargarPersonal() {

        set_time_limit(300);
        ini_set('max_execution_time', '300');
        ini_set('memory_limit', '2048M');

        $p_cod_emp= $_POST['p_cod_emp'];
        $p_cod_cc= $_POST['cbCC'];
        $p_cod_cargo = $_POST['cbCargo'];
        $p_no_vig = "";
        $p_usuario = $_POST['p_usuario'];
        $p_fec_no_vig1=  "";
        $p_fec_no_vig2 = "";
        $p_rol = $_POST['p_rol'];

        if(isset($_POST['checkNoVig'])){
            $p_no_vig = $_POST['checkNoVig'];
            $p_fec_no_vig1= $_POST['dtFecNoVig1'];
            $p_fec_no_vig2 = $_POST['dtFecNoVig2'];
        }

        //print_r($names);
        $this->load->library('excel'); 
        $filename='REPORTE_MAESTRO_PERSONAL.xls'; //save our workbook as this file name


        $this->excel->setActiveSheetIndex(0);
        $this->excel->getActiveSheet()->setTitle('Información General');
        $this->excel->getActiveSheet()->setCellValue("A1", 'Reporte');
        $this->excel->getActiveSheet()->setCellValue("B1", 'Maestro Personal');
        $this->excel->getActiveSheet()->setCellValue("A2", 'Fecha Creación');
        $this->excel->getActiveSheet()->setCellValue("B2", new DateTime());
        $this->excel->getActiveSheet()->setCellValue("A3", 'Usuario Creador');
        $this->excel->getActiveSheet()->setCellValue("B3", $p_usuario);
        $this->excel->getActiveSheet()->setCellValue("A4", 'Empresa');
        $this->excel->getActiveSheet()->setCellValue("B4", $p_cod_emp);
        $this->excel->getActiveSheet()->setCellValue("A5", 'Centro de Costo');
        $this->excel->getActiveSheet()->setCellValue("B5", $p_cod_cc);
        $this->excel->getActiveSheet()->setCellValue("A6", 'Cargo');
        $this->excel->getActiveSheet()->setCellValue("B6", $p_cod_cargo);
        $this->excel->getActiveSheet()->setCellValue("A7", 'Vigente');
        $this->excel->getActiveSheet()->setCellValue("B7", $p_no_vig);
        $this->excel->getActiveSheet()->setCellValue("A8", 'Fecha Baja Desde');
        $this->excel->getActiveSheet()->setCellValue("B8", $p_fec_no_vig1);
        $this->excel->getActiveSheet()->setCellValue("A9", 'Fecha Baja Hasta');
        $this->excel->getActiveSheet()->setCellValue("B9", $p_fec_no_vig2);


        $names = [];
        $query = $this->ExcelExportModel->cargarPersonal($p_cod_emp, $p_cod_cc, $p_cod_cargo, $p_no_vig, $p_fec_no_vig1, $p_fec_no_vig2, $p_rol);
        
        if(count($query) > 0){
            $names = get_object_vars($query[0]);
            //print_r($names);
            
            $names = array_keys($names);
            
            //Cargamos la librería de excel.
            
            $this->excel->createSheet();
            $this->excel->setActiveSheetIndex(1);
            $this->excel->getActiveSheet()->setTitle('Datos');
            //Contador de filas
            $current_col = 0;
            $current_row = 1;

            
            //print_r($conceptos);
            //HEADER
            foreach($names as $name) {
                $this->excel->getActiveSheet()->setCellValueByColumnAndRow($current_col, $current_row, $name);
                $current_col++;
            }

            $current_row++;

             //DATA
            foreach($query as $obj) {
                $current_col = 0;
                $obj = get_object_vars($obj);
                foreach($names as $name) {
                    $this->excel->getActiveSheet()->setCellValueByColumnAndRow($current_col, $current_row, $obj[$name]);
                    $current_col++;
                }
                $current_row++;
            }

         }

         //Le ponemos un nombre al archivo que se va a generar.
         header('Content-Type: application/vnd.ms-excel');
         //header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
         header('Content-Disposition: attachment;filename="'.$filename.'"');
         header('Cache-Control: max-age=0');
         $objWriter = PHPExcel_IOFactory::createWriter($this->excel, 'Excel5');
         //Hacemos una salida al navegador con el archivo Excel.
         $objWriter->save('php://output');

    }

    public function cargarAusentismoConsolidado() {

        set_time_limit(300);
        ini_set('max_execution_time', '300');
        ini_set('memory_limit', '2048M');

        $dtFec1= $_POST['dtFec1'];
        $dtFec2= $_POST['dtFec2'];
        $p_cod_emp = $_POST['p_cod_emp'];
        $p_usuario = $_POST['p_usuario'];

        //print_r($names);
        $this->load->library('excel'); 
        $filename='REPORTE_AUSENTISMO.xls'; //save our workbook as this file name


        $this->excel->setActiveSheetIndex(0);
        $this->excel->getActiveSheet()->setTitle('Información General');
        $this->excel->getActiveSheet()->setCellValue("A1", 'Reporte');
        $this->excel->getActiveSheet()->setCellValue("B1", 'Ausentismo');
        $this->excel->getActiveSheet()->setCellValue("A2", 'Fecha Creación');
        $this->excel->getActiveSheet()->setCellValue("B2", new DateTime());
        $this->excel->getActiveSheet()->setCellValue("A3", 'Usuario Creador');
        $this->excel->getActiveSheet()->setCellValue("B3", $p_usuario);
        $this->excel->getActiveSheet()->setCellValue("A4", 'Desde');
        $this->excel->getActiveSheet()->setCellValue("B4", $dtFec1);
        $this->excel->getActiveSheet()->setCellValue("A5", 'Hasta');
        $this->excel->getActiveSheet()->setCellValue("B5", $dtFec2);
        $this->excel->getActiveSheet()->setCellValue("A6", 'Empresa');
        $this->excel->getActiveSheet()->setCellValue("B6", $p_cod_emp);


        $names = [];
        $query = $this->ExcelExportModel->cargarAusentismoConsolidado($p_cod_emp, $dtFec1, $dtFec2);
        
        if(count($query) > 0){
            $names = get_object_vars($query[0]);
            //print_r($names);
            
            $names = array_keys($names);
            
            //Cargamos la librería de excel.
            
            $this->excel->createSheet();
            $this->excel->setActiveSheetIndex(1);
            $this->excel->getActiveSheet()->setTitle('Datos');
            //Contador de filas
            $current_col = 0;
            $current_row = 1;

            
            //print_r($conceptos);
            //HEADER
            foreach($names as $name) {
                $this->excel->getActiveSheet()->setCellValueByColumnAndRow($current_col, $current_row, $name);
                $current_col++;
            }

            $current_row++;

             //DATA
            foreach($query as $obj) {
                $current_col = 0;
                $obj = get_object_vars($obj);
                foreach($names as $name) {
                    $this->excel->getActiveSheet()->setCellValueByColumnAndRow($current_col, $current_row, $obj[$name]);
                    $current_col++;
                }
                $current_row++;
            }
            
         }

         //Le ponemos un nombre al archivo que se va a generar.
         header('Content-Type: application/vnd.ms-excel');
         //header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
         header('Content-Disposition: attachment;filename="'.$filename.'"');
         header('Cache-Control: max-age=0');
         $objWriter = PHPExcel_IOFactory::createWriter($this->excel, 'Excel5');
         //Hacemos una salida al navegador con el archivo Excel.
         $objWriter->save('php://output');

    }
}
