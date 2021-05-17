<?php defined('BASEPATH') OR exit('No direct script access allowed');

class PdfController extends CI_Controller {
    

    public function reporteGuiasTrain() {
        set_time_limit(300);
        ini_set('max_execution_time', '300');
        ini_set('memory_limit', '2048M');
        $this->load->model('tarifarioMensual/TarifarioMensualModel');

        $p_anho = $this->input->post('p_anho'); 
        $p_mes = $this->input->post('p_mes'); 
        $p_rut = $this->input->post('p_rut'); //'15976443'; 
        
        $query1 = $this->TarifarioMensualModel->cargarTarifarioMensual(
            $p_anho, 
            $p_mes);
    
        $query2 = $this->TarifarioMensualModel->cargarTarifarioMensualGuiasDet(
            $p_anho, 
            $p_mes,
            $p_rut);


        if(count($query1) > 0 && count($query2) > 0){
            $data['general'] = $query1[0];
            $data['guias'] = $query2;
            $this->load->view('PdfView/tarfarioMensualDetGuias', $data);
            
            // Get output html
            $html = $this->output->get_output();
            
            // Load pdf library
            $this->load->library('pdf');
            
            // Load HTML content
            $this->dompdf->loadHtml($html);
            
            // (Optional) Setup the paper size and orientation
            $this->dompdf->setPaper('A4', 'landscape');
            
            // Render the HTML as PDF
            $this->dompdf->render();
            
            // Output the generated PDF (1 = download and 0 = preview)
            $this->dompdf->stream("Detalle_Guias", array("Attachment"=>0));
        }else{
            echo "No se encontro información";
        }
    }

    
}