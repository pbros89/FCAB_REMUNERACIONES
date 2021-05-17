<?php
/**
 * Created by IntelliJ IDEA.
 * User: MarioTi
 * Date: 11-03-16
 * Time: 12:20
 */

if (!defined('BASEPATH')) exit('No se permite el acceso directo a este directorio');


class Sendmail extends CI_Controller
{

    function __construct()
    {
        parent::__construct();
        //$this->load->model('Correos_model'); //Cargamos el modelo
        //$this->load->library('email');
        //$this->load->helper('url');

        $this->output
            ->set_content_type('application/json')
            ->set_header("Access-Control-Allow-Origin: *")
            ->set_header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept")
            ->set_header("Content-Type: application/json; charset=UTF-8");
    }

    public function index()
    {
        //TODO: Clase para envio de correos, la configuración esta en /config/email.php
        echo "¿Hola, que hace?";
    }
    
    //Ejemplo de correos
    public function ejemplo()
    {
        $this->load->library("email");
        
        $config = array();

        $config['protocol']     = 'smtp';  // 'mail', 'sendmail', or 'smtp'
        $config['smtp_host']    = 'smtp.gmail.com'; 
        $config['smtp_port']    = 465;
        $config['smtp_user']    = "pedro.antonio.bros@gmail.com";
        $config['smtp_pass']    = "******";
        $config['smtp_crypto']  = 'ssl';   //can be 'ssl' or 'tls' for example
        $config['smtp_timeout'] = '30'; 
        

        //cargamos la configuración para enviar con gmail
        $this->email->initialize($config);

        $this->email->from('pedro.antonio.bros@gmail.com');
        $this->email->to("pedro.antonio.bros@gmail.com");
        $this->email->subject('Bienvenido/a a uno-de-piera.com');
        $this->email->message('<h2>Email enviado con codeigniter haciendo uso del smtp de gmail</h2><hr><br> Bienvenido al blog');
        $this->email->send();
        //con esto podemos ver el resultado
        var_dump($this->email->print_debugger());
        
    }

    //Ejemplo de correos
    /*public function reportar_error()
    {

        $mensaje = $this->input->post('msgError');
        $rut = $this->input->post('informante');
        $indicador = $this->input->post('indicador');

        if ($this->input->post('anexos')) {
            $anexos = json_decode($this->input->post('anexos')); //Los adjuntos, se almacenan en la db, solo si el reporte se guarda de manera exitosa
        } else {
            $anexos = array();
        }

        $max_anexos = count($anexos);
        for($i = 0; $i < $max_anexos; $i++)
        {
            $this->email->attach("resources/upload/" . $anexos[$i]->nombre, "inline");
        }


        $informante = $this->Correos_model->obtener_datos_por_rut($rut);

        $list = array("luis.avalos@fcab.cl", "MarioHidalgoTi@gmail.com", $informante[0]->LOGIN . "@fcab.cl");

        $this->email->set_crlf("\r\n");
        $this->email->from('infofcab@fcab.cl', 'Librería FCAB');
        $this->email->to('hleppe@fcab.cl');
        $this->email->cc($list);
        $this->email->subject('Solo un ejemplo del correo');
        $this->email->message('El usuario <strong>' . $informante[0]->NOMBRE . '</strong> Indica un posible contratiempo, desde el indicador: <strong>' . $indicador . '</strong> descrito en el siguiente mensaje: <br /><br /><i>"' . $mensaje. '"</i><br /><br /><p>Se ruega responder a la brevedad e investigar la posible falla.</p><br /> <p></p>');

        if ($this->email->send()) {
            $this->output
                ->set_output('{"success": true, "msg": "exito"}');
        } else {
            $this->output
                ->set_output('{"success": true, "msg": "' . json_encode($this->email->print_debugger()) . '"}');
        }
        return;
    }



    public function condicion_mail()
    {
        $reporte = $this->input->get('reporte');
        $correo = $this->input->get('correo');
        $empresa = 1;

        $query = $this->Correos_model->obtener_datos_reportes($reporte, $empresa);

        $informante_nombre = $query[0]->NOMBRE_INFORMANTE;
        $informante = $query[0]->RUT_INFORMANTE;
        $fecha = $query[0]->FECHA;
        $area = $query[0]->CB_AREA_AFECTADA;
        $lugar = $query[0]->LUGAR_EXACTO;
        $departamento = $query[0]->CB_AREA_USUARIO;
        $descripcion = $query[0]->DESCRIPCION;
        $solucion = $query[0]->SOLUCION_PROPUESTA;
        $horaIncidente = $query[0]->HORA_INCIDENTE;
        $minutoIncidente = $query[0]->MINUTO_INCIDENTE;
        $categoria = $query[0]->CATEGORIA;
        $ocurrencia = $query[0]->OCURRENCIA_INFORMANTE;
        $magnitud = $query[0]->MAGNITUD_INFORMANTE;
        $riesgo = $query[0]->RIESGO_INFORMANTE;
        $informante_email = $correo;

        $tipoReporte = $query[0]->TIPO_REPORTE;
        $trabajador_observado = $query[0]->NOMBRE_INVOLUCRADO;

        $plataforma = $query[0]->PLATAFORMA;
        $uid = $query[0]->UID_MOBILE;

        $plataforma_fin = "Desconocida";
        if($plataforma === "WEB") {
            $plataforma_fin = "Reportado desde el sitio web Plataforma SSO";
        } else {
            $plataforma_fin = "Reportado desde un teléfono " . $plataforma . " con UID " . $uid;
        }

        $email ="
            <table width='80%' border='0' style='Font-size: 10pt; font-family: Verdana' bgcolor='White'>
                <tr align='center'>
                    <th colspan='2' style='background : #003366; color: white; font-weight: bold; font-size : 8pt; font-family: Verdana'>Se genero el siguiente reporte: " . htmlentities($reporte) . ".</th>
                </tr>
                <tr>
                    <td align='center' colspan='2' valign='top' width='50px'>
                        <br>
                    </td>
                </tr>
                <tr>
                    <th colspan='2' align='left' style='background : #EEEEEE; align: left; font-family: Verdana'>Detalles: </th>
                </tr>
                <tr>
                    <td colspan='2' >
                        <span style='background: White; color: #606060 ; font-size: 8pt; font-weight: bold; font-family: Verdana'>Fecha Reporte: " . htmlentities($fecha) . "</span>
                        &nbsp;&nbsp;
                        <span style='background: White; color: #606060 ; font-size: 8pt; font-weight: bold; font-family: Verdana'>Hora: " . htmlentities($horaIncidente) . ":" . htmlentities($minutoIncidente) . "</span>
                        &nbsp;&nbsp;
                        <span style='background: White; color: #606060 ; font-size: 8pt; font-weight: bold; font-family: Verdana'>Número de reporte: " . htmlentities($reporte) . "</span>
                        <br>
                        <span style='background: White; color: #606060 ; font-size: 8pt; font-weight: bold; font-family: Verdana'>Área: " . htmlentities($area) . "</span>
                        &nbsp;&nbsp;
                        <span style='background: White; color: #606060 ; font-size: 8pt; font-weight: bold; font-family: Verdana'>Departamento: " . htmlentities($departamento) . "</span>
                        <br />
                        <span style='background: White; color: #606060 ; font-size: 8pt; font-weight: bold; font-family: Verdana'>Informado Por: " . htmlentities($informante_nombre) . "</span>
                        &nbsp;&nbsp;
                        <span style='background: White; color: #606060 ; font-size: 8pt; font-weight: bold; font-family: Verdana'>RUT: " . htmlentities($informante) . "</span>
                    </td>
                </tr>
                <tr>
                    <td colspan='2'>
                       <span style='background: White; color: #606060 ; font-size: 8pt; font-weight: bold; font-family: Verdana'>Categoría: " . htmlentities($categoria) . "</span>
                    </td>
                </tr>
                <tr>
                    <td colspan='2'>
                       <span style='background: White; color: #606060 ; font-size: 8pt; font-weight: bold; font-family: Verdana'>Lugar: " . htmlentities($lugar) . "</span>
                    </td>
                </tr>
                <tr>
                    <td colspan='2'>
                       <span style='background: White; color: #606060 ; font-size: 8pt; font-weight: bold; font-family: Verdana'>Probabilidad de ocurrencia: " . htmlentities($ocurrencia) . "</span>
                    </td>
                </tr>
                <tr>
                    <td colspan='2'>
                       <span style='background: White; color: #606060 ; font-size: 8pt; font-weight: bold; font-family: Verdana'>Magnitud de impacto: " . htmlentities($magnitud) . "</span>
                    </td>
                </tr>
                <tr>
                    <td colspan='2'>
                       <span style='background: White; color: #606060 ; font-size: 8pt; font-weight: bold; font-family: Verdana'>Nivel de riesgo: " . htmlentities($riesgo) . "</span>
                    </td>
                </tr>
                <tr>
                    <td colspan='2'>
                       <span style='background: White; color: #606060 ; font-size: 8pt; font-weight: bold; font-family: Verdana'>Tipo de reporte: " . htmlentities($tipoReporte) . "</span>
                    </td>
                </tr>
                 <tr>
                    <td colspan='2'>
                       <span style='background: White; color: #606060 ; font-size: 8pt; font-weight: bold; font-family: Verdana'>Trabajador Observado: " . htmlentities($trabajador_observado) . "</span>
                    </td>
                </tr>
                <tr>
                    <td colspan='2'>
                       <span style='background: White; color: #606060 ; font-size: 8pt; font-weight: bold; font-family: Verdana'>" . htmlentities($plataforma_fin) . "</span>
                    </td>
                </tr>
                <tr>
                    <td colspan='2'>
                       <span style='background: White; color: #606060 ; font-size: 8pt; font-weight: bold; font-family: Verdana'>" . htmlentities('Descripción:') . "</span> " . htmlentities($descripcion) . "
                    </td>
                </tr>
                <tr>
                    <td colspan='2'>
                        <span style='background: White; color: #606060 ; font-size: 8pt; font-weight: bold; font-family: Verdana'>" . htmlentities('Solución Propuesta: ') . "</span>" . htmlentities($solucion) . "
                        <br />
                    </td>
                </tr>
            </table>";

        //$email .= "<br><h3><p style='text-align:center;'><a href='http://200.11.83.188/psso/index.php/ResumeReporte/?isResumen=true&resumenReporte=" . $reporte ."&tipoReporteResumen=" . $tipoReporte . "'>Ir al resumen (Enlace interno)</a></p></h3><br /> <br />";
        //$email .= "<br><h3><p style='text-align:center;'><a href='http://172.16.0.39/psso/index.php/ResumeReporte/?isResumen=true&resumenReporte=" . $reporte ."&tipoReporteResumen=" . $tipoReporte . "'>Ir al resumen (Enlace Externo)</a></p></h3><br /> <br />";


        $email .= "<br /><div style='text-align:center;'><form action=\"https://sierragorda.fcab.cl/psso/index.php/ResumeReporte/\" method=\"GET\">
                        <input type=\"hidden\" name=\"isResumen\" value=\"true\" /> 
                        <input type=\"hidden\" name=\"resumenReporte\" value=\"$reporte\" /> 
                        <input type=\"hidden\" name=\"tipoReporteResumen\" value=\"$tipoReporte\" /> 
                        <input type=\"submit\" value=\"Resumen del reporte\"/>
                   </form></div>";

        $list = array('copias@gmail.com', 'otro@gmail.com');

        $this->email->set_crlf("\r\n");
        $this->email->from('infofcab@fcab.cl', 'Plataforma SSO');
        $this->email->to($informante_email);
        $this->email->cc($list);
        $this->email->bcc('MarioHidalgoTi@gmail.com');
        $this->email->subject('Se genero el reporte: ' . $reporte . ' con un nivel de riesgo: ' . $riesgo . '');
        $this->email->message($email);

        if ($this->email->send()) {
            $this->output
                ->set_output('{"success": true, "msg": "exito"}');
        } else {
            $this->output
                ->set_output('{"success": true, "msg": "' . json_encode($this->email->print_debugger()) . '"}');
        }
        return;
    }*/
}