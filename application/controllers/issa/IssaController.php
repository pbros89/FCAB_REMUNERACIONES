<?php
defined('BASEPATH') or exit('No direct script access allowed');

class IssaController extends CI_Controller
{

	function __construct()
	{
		parent::__construct();
		$this->load->helper('date');
		$this->load->model('issa/IssaModel');

		$this->output
			->set_content_type('application/json')
			->set_header("Access-Control-Allow-Origin: *")
			->set_header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept")
			->set_header("Content-Type: application/json; charset=UTF-8");
	}

	public function index()
	{
		echo "fuera de aquí";
	}

	public function envioDiario()
	{
		$this->enviarCambioAfp();
		$this->enviarFiniquito();
		$this->enviarCambioCargoRenta();
		$this->enviarCambioDeposito();
		$this->enviarCambioSalud();
		$this->enviarCambioSindicato();
		$this->enviarAusentismo();
		$this->enviarCambioBono();
		$this->enviarCambioOtros();
		$this->enviarConceptosFiniquito();
		$this->enviarConceptosIngPersonal();
		$this->enviarIngDescuentoRRLL();
		$this->enviarIngHaberRRLL();
		$this->enviarIngPersonal();
	}

	public function obtenerJson()
	{
		$p_tipo = 'nada';
		if ($this->input->get('p_tipo') != null) {
			$p_tipo = $this->input->get('p_tipo');
		}

		switch ($p_tipo) {
			case "cambio_afp":
				$data  =  $this->IssaModel->cargarCambioAfpIssa();
				break;

			case "finiquito":
				$data  =  $this->IssaModel->cargarFiniquitoIssa();
				break;

			case "cambio_cargo_renta":
				$data  =  $this->IssaModel->cargarCambioCargoRentaIssa();
				break;

			case "cambio_deposito":
				$data  =  $this->IssaModel->cargarCambioDepositoIssa();
				break;

			case "cambio_salud":
				$data  =  $this->IssaModel->cargarCambioSaludIssa();
				break;
			case "cambio_sindicato":
				$data  =  $this->IssaModel->cargarCambioSindicatoIssa();
				break;
			case "ausentismo":
				$data  =  $this->IssaModel->cargarAusentismoIssa();
				break;
			case "cambio_bono":
				$data  =  $this->IssaModel->cargarCambioBonoIssa();
				break;
			case "cambio_otros":
				$data  =  $this->IssaModel->cargarCambioOtrosIssa();
				break;
			case "conceptos_finiquito":
				$data  =  $this->IssaModel->cargarConceptosFiniquitoIssa();
				break;
			case "conceptos_ing_personal":
				$data  =  $this->IssaModel->cargarConceptosIngPersonalIssa();
				break;

			case "descuento_rrll":
				$data  =  $this->IssaModel->cargarIngDescuentoRRLLIssa();
				break;
			case "haber_rrll":
				$data  =  $this->IssaModel->cargarIngHaberRRLLIssa();
				break;
			case "ing_personal":
				$data  =  $this->IssaModel->cargarIngPersonalIssa();
				break;

			default :
				$p_tipo = "nada";
				break;
				
		}

		if($p_tipo != "nada") {
			$jsonData = json_encode($data);
			$jsonData = str_replace("%null%", "", $jsonData);
			$jsonData = str_replace("&", "y", $jsonData);

			echo $jsonData;
		}else{
			echo "Tipo incorrecto";
		}
		
	}

	public function obtenerJsonProceso()
	{
		$p_proceso = '';
		$p_tipo = '';
		$p_cod_emp = '';
		$cant_x_pagina = 100;

		if ($this->input->get('p_proceso') != null) {
			$p_proceso = $this->input->get('p_proceso');
		}
		if ($this->input->get('p_tipo') != null) {
			$p_tipo = $this->input->get('p_tipo');
		}
		if ($this->input->get('p_cod_emp') != null) {
			$p_cod_emp = $this->input->get('p_cod_emp');
		}

		if (!empty($p_proceso) && !empty($p_tipo) && !empty($p_cod_emp)) {

			$count = $this->IssaModel->contarRegistrosProcesoMensualIssa($p_proceso, $p_tipo, $p_cod_emp);
			$ultimoTermino = $this->IssaModel->cargarUltimoEnvioProcesoMensual($p_proceso, $p_tipo, $p_cod_emp);
			$cantRegistros = (int) $count[0]->CONTAR;
			$termino = (int) $ultimoTermino[0]->TERMINO;
			//while($cantRegistros > 0) {
			if ($cantRegistros - $termino < $cant_x_pagina) {
				$cant_x_pagina = $cantRegistros - $termino;
			}

			if ($cant_x_pagina > 0) {
				$data  =  $this->IssaModel->cargarProcesoMensualIssa(
					$p_proceso,
					$p_tipo,
					$p_cod_emp,
					$termino + 1,
					$termino + $cant_x_pagina
				);

				$jsonData = json_encode($data);
				$jsonData = str_replace("%null%", "", $jsonData);
				$jsonData = str_replace("&", "y", $jsonData);

				echo $jsonData;
			} else {
				$log['r_obs'] = 'No hay datos por enviar';
				$result = '{"success":"true", "items":' . json_encode($log) . '}';
				$this->output->set_output($result);
			}
		} else {
			$log['r_obs'] = 'Parametros Incorrectos';
			$result = '{"success":"true", "items":' . json_encode($log) . '}';
			$this->output->set_output($result);
		}
	}

	public function enviarCambioAfp()
	{
		$p_usuario = 'SYSTEM';

		if ($this->input->get('p_usuario') != null) {
			$p_usuario = $this->input->get('p_usuario');
		}

		$data  =  $this->IssaModel->cargarCambioAfpIssa();

		$jsonData = json_encode($data);
		$jsonData = str_replace("%null%", "", $jsonData);
		$jsonData = str_replace("&", "y", $jsonData);
		//echo $jsonData;

		$params = 'operacion=api_carga_maestro' .
			'&maestro=api_cambio_afp' .
			'&datos=' . $jsonData;

		$this->iniciarEnvioIssa($params, $data, 'CAMBIO AFP', 'NOV_CAMBIO_AFP', 'PK_ID', $p_usuario);
	}

	public function enviarFiniquito()
	{
		$p_usuario = 'SYSTEM';

		if ($this->input->get('p_usuario') != null) {
			$p_usuario = $this->input->get('p_usuario');
		}

		$data  =  $this->IssaModel->cargarFiniquitoIssa();
		$jsonData = json_encode($data);
		$jsonData = str_replace("%null%", "", $jsonData);
		$jsonData = str_replace("&", "y", $jsonData);

		//echo $jsonData;

		$params = 'operacion=api_carga_maestro' .
			'&maestro=api_finiquito' .
			'&datos=' . $jsonData;

		$this->iniciarEnvioIssa($params, $data, 'FINIQUITO', 'NOV_FINIQUITOS', 'PK_FINIQUITO', $p_usuario);
	}

	public function enviarCambioCargoRenta()
	{
		$p_usuario = 'SYSTEM';

		if ($this->input->get('p_usuario') != null) {
			$p_usuario = $this->input->get('p_usuario');
		}

		$data  =  $this->IssaModel->cargarCambioCargoRentaIssa();
		$jsonData = json_encode($data);
		$jsonData = str_replace("%null%", "", $jsonData);
		$jsonData = str_replace("&", "y", $jsonData);
		//echo $jsonData;
		$params = 'operacion=api_carga_maestro' .
			'&maestro=api_cambiar_cargo_renta' .
			'&datos=' . $jsonData;

		$this->iniciarEnvioIssa($params, $data, 'CAMBIO CARGO RENTA', 'NOV_CAMBIO_CARGO_RENTA', 'PK_ID', $p_usuario);
	}

	public function enviarCambioDeposito()
	{
		$p_usuario = 'SYSTEM';

		if ($this->input->get('p_usuario') != null) {
			$p_usuario = $this->input->get('p_usuario');
		}

		$data  =  $this->IssaModel->cargarCambioDepositoIssa();
		$jsonData = json_encode($data);
		$jsonData = str_replace("%null%", "", $jsonData);
		$jsonData = str_replace("&", "y", $jsonData);

		//echo $jsonData;

		$params = 'operacion=api_carga_maestro' .
			'&maestro=api_cambiar_deposito' .
			'&datos=' . $jsonData;

		$this->iniciarEnvioIssa($params, $data, 'CAMBIO DEPOSITO', 'NOV_CAMBIO_DEPOSITO', 'PK_ID', $p_usuario);
	}

	public function enviarCambioSalud()
	{
		$p_usuario = 'SYSTEM';

		if ($this->input->get('p_usuario') != null) {
			$p_usuario = $this->input->get('p_usuario');
		}

		$data  =  $this->IssaModel->cargarCambioSaludIssa();
		$jsonData = json_encode($data);
		$jsonData = str_replace("%null%", "", $jsonData);
		$jsonData = str_replace("&", "y", $jsonData);

		//echo $jsonData;

		$params = 'operacion=api_carga_maestro' .
			'&maestro=api_cambiar_salud' .
			'&datos=' . $jsonData;

		$this->iniciarEnvioIssa($params, $data, 'CAMBIO SALUD', 'NOV_CAMBIO_SALUD', 'PK_ID', $p_usuario);
	}

	public function enviarCambioSindicato()
	{
		$p_usuario = 'SYSTEM';

		if ($this->input->get('p_usuario') != null) {
			$p_usuario = $this->input->get('p_usuario');
		}

		$data  =  $this->IssaModel->cargarCambioSindicatoIssa();
		$jsonData = json_encode($data);
		$jsonData = str_replace("%null%", "", $jsonData);
		$jsonData = str_replace("&", "y", $jsonData);

		$params = 'operacion=api_carga_maestro' .
			'&maestro=api_cambiar_sindicato' .
			'&datos=' . $jsonData;

		//echo $jsonData;

		$this->iniciarEnvioIssa($params, $data, 'CAMBIO SINDICATO', 'NOV_CAMBIO_SINDICATO', 'PK_ID', $p_usuario);
	}

	public function enviarAusentismo()
	{
		$p_usuario = 'SYSTEM';

		if ($this->input->get('p_usuario') != null) {
			$p_usuario = $this->input->get('p_usuario');
		}

		$data  =  $this->IssaModel->cargarAusentismoIssa();
		$jsonData = json_encode($data);
		$jsonData = str_replace("%null%", "", $jsonData);
		$jsonData = str_replace("&", "y", $jsonData);

		$params = 'operacion=api_carga_maestro' .
			'&maestro=api_ausentismo' .
			'&datos=' . $jsonData;

		//echo $jsonData;

		$this->iniciarEnvioIssa($params, $data, 'AUSENTISMO', 'NOV_AUSENTISMO', 'PK_ID', $p_usuario);
	}

	public function enviarCambioBono()
	{
		$p_usuario = 'SYSTEM';

		if ($this->input->get('p_usuario') != null) {
			$p_usuario = $this->input->get('p_usuario');
		}

		$data  =  $this->IssaModel->cargarCambioBonoIssa();
		$jsonData = json_encode($data);
		$jsonData = str_replace("%null%", "", $jsonData);
		$jsonData = str_replace("&", "y", $jsonData);

		$params = 'operacion=api_carga_maestro' .
			'&maestro=api_cambiar_bonos' .
			'&datos=' . $jsonData;

		//echo $jsonData;

		$this->iniciarEnvioIssa($params, $data, 'CAMBIO BONO', 'NOV_CAMBIO_BONO_CONCEPTOS', 'PFK_BONO', $p_usuario);
	}

	public function enviarConceptosIngPersonal()
	{
		$p_usuario = 'SYSTEM';

		if ($this->input->get('p_usuario') != null) {
			$p_usuario = $this->input->get('p_usuario');
		}

		$data  =  $this->IssaModel->cargarConceptosIngPersonalIssa();
		$jsonData = json_encode($data);
		$jsonData = str_replace("%null%", "", $jsonData);
		$jsonData = str_replace("&", "y", $jsonData);

		$params = 'operacion=api_carga_maestro' .
			'&maestro=api_conceptos_ingreso' .
			'&datos=' . $jsonData;

		//echo $jsonData;

		$this->iniciarEnvioIssa($params, $data, 'CONCEPTOS INGRESO PERSONAL', 'NOV_ING_PER_CONCEPTOS', 'PFK_INGRESO', $p_usuario);
	}

	public function enviarConceptosFiniquito()
	{
		$p_usuario = 'SYSTEM';

		if ($this->input->get('p_usuario') != null) {
			$p_usuario = $this->input->get('p_usuario');
		}

		$data  =  $this->IssaModel->cargarConceptosFiniquitoIssa();
		$jsonData = json_encode($data);
		$jsonData = str_replace("%null%", "", $jsonData);
		$jsonData = str_replace("&", "y", $jsonData);

		$params = 'operacion=api_carga_maestro' .
			'&maestro=api_conceptos_finiquito' .
			'&datos=' . $jsonData;

		//echo $jsonData;

		$this->iniciarEnvioIssa($params, $data, 'CONCEPTOS FINIQUITO', 'NOV_FINIQUITO_CONCEPTOS', 'PFK_FINIQUITO', $p_usuario);
	}

	public function enviarCambioOtros()
	{
		$p_usuario = 'SYSTEM';

		if ($this->input->get('p_usuario') != null) {
			$p_usuario = $this->input->get('p_usuario');
		}

		$data  =  $this->IssaModel->cargarCambioOtrosIssa();
		$jsonData = json_encode($data);
		$jsonData = str_replace("%null%", "", $jsonData);
		$jsonData = str_replace("&", "y", $jsonData);

		$params = 'operacion=api_carga_maestro' .
			'&maestro=api_cambiar_otros' .
			'&datos=' . $jsonData;

		//echo $jsonData;

		$this->iniciarEnvioIssa($params, $data, 'CAMBIO OTROS', 'NOV_CAMBIO_OTROS', 'PK_ID', $p_usuario);
	}

	public function enviarIngDescuentoRRLL()
	{
		$p_usuario = 'SYSTEM';

		if ($this->input->get('p_usuario') != null) {
			$p_usuario = $this->input->get('p_usuario');
		}

		$data  =  $this->IssaModel->cargarIngDescuentoRRLLIssa();
		$jsonData = json_encode($data);
		$jsonData = str_replace("%null%", "", $jsonData);
		$jsonData = str_replace("&", "y", $jsonData);

		$params = 'operacion=api_carga_maestro' .
			'&maestro=api_descuentos_rrll' .
			'&datos=' . $jsonData;

		//echo $jsonData;

		$this->iniciarEnvioIssa($params, $data, 'DESCUENTO RRLL', 'NOV_ING_DESCUENTOS_RRLL', 'PK_COD', $p_usuario);
	}

	public function enviarIngHaberRRLL()
	{
		$p_usuario = 'SYSTEM';

		if ($this->input->get('p_usuario') != null) {
			$p_usuario = $this->input->get('p_usuario');
		}

		$data  =  $this->IssaModel->cargarIngHaberRRLLIssa();
		$jsonData = json_encode($data);
		$jsonData = str_replace("%null%", "", $jsonData);
		$jsonData = str_replace("&", "y", $jsonData);

		$params = 'operacion=api_carga_maestro' .
			'&maestro=api_haberes_rrll' .
			'&datos=' . $jsonData;

		//echo $jsonData;

		$this->iniciarEnvioIssa($params, $data, 'HABER RRLL', 'NOV_ING_HABERES_RRLL', 'PK_COD', $p_usuario);
	}

	public function enviarIngPersonal()
	{
		$p_usuario = 'SYSTEM';

		if ($this->input->get('p_usuario') != null) {
			$p_usuario = $this->input->get('p_usuario');
		}

		$data  =  $this->IssaModel->cargarIngPersonalIssa();
		$jsonData = json_encode($data);
		$jsonData = str_replace("%null%", "", $jsonData);
		$jsonData = str_replace("&", "y", $jsonData);

		$params = 'operacion=api_carga_maestro' .
			'&maestro=api_ingresar_personal' .
			'&datos=' . $jsonData;

		//echo $jsonData;

		$this->iniciarEnvioIssa($params, $data, 'INGRESAR PERSONAL', 'NOV_INGRESAR_PERSONAL', 'PK_ID', $p_usuario);
	}


	public function enviarProcesoMensual()
	{
		$p_usuario = 'SYSTEM';
		$p_proceso = '';
		$p_tipo = '';
		$p_cod_emp = '';
		$cant_x_pagina = 100;

		if ($this->input->get('p_usuario') != null) {
			$p_usuario = $this->input->get('p_usuario');
		}
		if ($this->input->get('p_proceso') != null) {
			$p_proceso = $this->input->get('p_proceso');
		}
		if ($this->input->get('p_tipo') != null) {
			$p_tipo = $this->input->get('p_tipo');
		}
		if ($this->input->get('p_cod_emp') != null) {
			$p_cod_emp = $this->input->get('p_cod_emp');
		}

		if (!empty($p_proceso) && !empty($p_tipo) && !empty($p_cod_emp)) {

			$count = $this->IssaModel->contarRegistrosProcesoMensualIssa($p_proceso, $p_tipo, $p_cod_emp);
			$ultimoTermino = $this->IssaModel->cargarUltimoEnvioProcesoMensual($p_proceso, $p_tipo, $p_cod_emp);
			$cantRegistros = (int) $count[0]->CONTAR;
			$termino = (int) $ultimoTermino[0]->TERMINO;
			//while($cantRegistros > 0) {
			if ($cantRegistros - $termino < $cant_x_pagina) {
				$cant_x_pagina = $cantRegistros - $termino;
			}

			if ($cant_x_pagina > 0) {
				$data  =  $this->IssaModel->cargarProcesoMensualIssa(
					$p_proceso,
					$p_tipo,
					$p_cod_emp,
					$termino + 1,
					$termino + $cant_x_pagina
				);

				$jsonData = json_encode($data);
				$jsonData = str_replace("%null%", "", $jsonData);
				$jsonData = str_replace("&", "y", $jsonData);
				$params = 'operacion=api_carga_maestro' .
					'&maestro=api_proceso' .
					'&datos=' . $jsonData;
				//echo $jsonData;
				$this->iniciarEnvioProcesoMensualIssa(
					$params,
					$data,
					$p_usuario,
					$p_proceso,
					$p_tipo,
					$p_cod_emp,
					$termino + 1,
					$termino + $cant_x_pagina,
					$count[0]->CONTAR
				);
			} else {
				$log['r_obs'] = 'No hay datos por enviar';
				$result = '{"success":"true", "items":' . json_encode($log) . '}';
				$this->output->set_output($result);
			}
		} else {
			$log['r_obs'] = 'Parametros Incorrectos';
			$result = '{"success":"true", "items":' . json_encode($log) . '}';
			$this->output->set_output($result);
		}
	}

	private function iniciarEnvioIssa($params, $data, $tipo, $tabla, $id, $usuario)
	{

		$observacion = null;
		$resIssa = null;
		$resEstado = null;
		$cantEnviados = 0;
		$cantRegistros = 0;

		if ($data != null && count($data) > 0) {
			//Realiza el envio a ISSA
			$cantEnviados = count($data);
			$resIssa = $this->enviarIssa($params);
			//$resIssa = $this->enviarIssaQA($params); //enviarIssa es PROD // enviarIssaQA es DESA

			if ($resIssa != null) {
				$resDecode = json_decode($resIssa);
				if (isset($resDecode->Error) && $resDecode->Error == 0) {
					$cantRegistros = $resDecode->Results->registros;
					if (count($data) == $cantRegistros) {
						$resEstado = $this->actualizarEstadoRegistro($tabla, $id, $data, $usuario);
						if ($resEstado > 0) {
							$observacion = 'OK';
						} else {
							$observacion = 'No actualizo estado';
						}
					} else {
						$observacion = "El servicio no guardo todos los datos";
					}
				} else {
					$observacion = "Error en respuesta del servicio";
				}
			} else {
				$observacion = "Servicio sin respuesta";
			}
		} else {
			$observacion = "No hay datos para enviar.";
		}
		//GUARDAR LOG DE EJECUCIÓN
		$log = $this->IssaModel->guardarLogEjecucion($usuario, $tipo, $resIssa, $observacion, $cantEnviados, $cantRegistros);
		$log['r_obs'] = $observacion;

		$result = '{"success":"true", "items":' . json_encode($log) . '}';
		$this->output->set_output($result);
	}

	private function actualizarEstadoRegistro($tipo, $id, $data, $p_usuario)
	{

		$timestamp = date('Y/m/d H:i:s');
		$items = [];
		$count = 0;
		foreach ($data as $i) {
			$items[$count][$id] = $i['codigo'];
			$items[$count]['USR_ENVIADO'] = $p_usuario;
			$items[$count]['ESTADO_ENVIADO'] = 'OK';
			$items[$count]['FECHA_ENVIADO'] = $timestamp;
			$count++;
		}

		$respuesta = $this->IssaModel->actualizarEstadoRegistros($items, $tipo, $id);
		return $respuesta;
	}

	private function iniciarEnvioProcesoMensualIssa($params, $data, $p_usuario, $p_proceso, $p_tipo, $p_cod_emp, $inicio, $termino, $total)
	{

		$observacion = null;
		$resIssa = null;
		$resEstado = null;
		$cantEnviados = 0;
		$cantRegistros = 0;

		if ($data != null && count($data) > 0) {
			//Realiza el envio a ISSA
			$cantEnviados = count($data);
			$resIssa = $this->enviarIssa($params);
			//$resIssa = $this->enviarIssaQA($params); //enviarIssa es PROD // enviarIssaQA es DESA

			if ($resIssa != null) {
				$resDecode = json_decode($resIssa);
				if (isset($resDecode->Error) && $resDecode->Error == 0) {
					$cantRegistros = $resDecode->Results->registros;
					if (count($data) == $cantRegistros) {
						$observacion = 'OK';
					} else {
						$observacion = "El servicio no guardo todos los datos enviados";
					}
				} else {
					$observacion = "Error en respuesta del servicio";
				}
			} else {
				$observacion = "Servicio sin respuesta";
			}
		} else {
			$observacion = "No hay datos para enviar";
		}
		//echo $observacion . " ";
		//echo 'RESPUESTA ESTADO '.$inicio. " - " . "$termino" . " - ".$total . $resIssa . date('Y-m-d H:i:s'). "\n";
		//GUARDAR LOG DE EJECUCIÓN
		if ($inicio == 1 && $observacion == 'OK' || $inicio > 1) {
			$log = $this->IssaModel->guardarLogPMEjecucion(
				$p_usuario,
				$p_proceso,
				$p_tipo,
				$p_cod_emp,
				$total,
				$inicio,
				$termino,
				$resIssa,
				$observacion,
				$cantEnviados,
				$cantRegistros
			);
		}
		$log['r_obs'] = $observacion;

		$result = '{"success":"true", "items":' . json_encode($log) . '}';
		$this->output->set_output($result);
	}
	

	private function enviarIssaQA($params)
	{

		$curl = curl_init();

		curl_setopt_array($curl, array(
			CURLOPT_URL => "https://mapiqa.hr4u.cl/mapi/service",
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_ENCODING => "",
			CURLOPT_MAXREDIRS => 10,
			CURLOPT_TIMEOUT => 0,
			CURLOPT_FOLLOWLOCATION => true,
			CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			CURLOPT_CUSTOMREQUEST => "POST",
			CURLOPT_POSTFIELDS => $params,
			CURLOPT_HTTPHEADER => array(
				'Accept: application/json',
				"username: fcabapi",
				"password: d2f3de485de48501b0a03edf91c7c8d4",
				"Authorization: Bearer 6e847a4554b7b9906a836b02f5f897acc73e66705b0b75ea8e2354662349ee00",
				"Content-Type: application/x-www-form-urlencoded"
			),
		));

		$response = curl_exec($curl);
		curl_close($curl);

		return $response;
	}

	private function enviarIssa($params)
	{

		$curl = curl_init();

		curl_setopt_array($curl, array(
			CURLOPT_URL => "https://mapi.hr4u.cl/mapi/service",
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_ENCODING => "",
			CURLOPT_MAXREDIRS => 10,
			CURLOPT_TIMEOUT => 0,
			CURLOPT_FOLLOWLOCATION => true,
			CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			CURLOPT_CUSTOMREQUEST => "POST",
			CURLOPT_POSTFIELDS => $params,
			CURLOPT_HTTPHEADER => array(
				'Accept: application/json',
				"username: fcabapi",
				"password: d2f3de485de48501b0a03edf91c7c8d4",
				"Authorization: Bearer 6e847a4554b7b9906a836b02f5f897acc73e66705b0b75ea8e2354662349ee00",
				"Content-Type: application/x-www-form-urlencoded"
			),
		));

		$response = curl_exec($curl);
		curl_close($curl);

		return $response;
	}

	public function cargarConteoEnviosIssa()
	{
		$query = $this->IssaModel->cargarConteoEnviosIssa();
		$result = '{"success":"true", "items":' . json_encode($query) . '}';
		$this->output->set_output($result);
	}


	public function cargarConteoPMEnviosIssa()
	{
		$tipo = $this->input->get('tipo');
		$proceso = $this->input->get('proceso');
		$codemp = $this->input->get('codemp');

		$query = $this->IssaModel->cargarConteoPMEnviosIssa($proceso, $tipo, $codemp);
		$result = '{"success":"true", "items":' . json_encode($query) . '}';
		$this->output->set_output($result);
	}

	public function crearXlsHistorialEnviosISSA()
	{

		set_time_limit(300);
		ini_set('max_execution_time', '300');
		ini_set('memory_limit', '2048M');

		$cbTipo = $_POST['cbTipo'];
		$dtFec1 = $_POST['dtFec1'];
		$dtFec2 = $_POST['dtFec2'];

		//print_r($names);
		$this->load->library('excel');
		$filename = 'REPORTE_ENVIOS_NOVEDADES_ISSA.xls'; //save our workbook as this file name


		$this->excel->setActiveSheetIndex(0);
		$this->excel->getActiveSheet()->setTitle('Datos');

		$names = [];
		$query = $this->IssaModel->cargarHistorialEnviosIssa($dtFec1, $dtFec2, $cbTipo);

		if (count($query) > 0) {
			$names = get_object_vars($query[0]);
			//print_r($names);

			$names = array_keys($names);
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

	public function crearXlsHistorialEnviosPMISSA()
	{

		set_time_limit(300);
		ini_set('max_execution_time', '300');
		ini_set('memory_limit', '2048M');

		$txtProceso = $_POST['txtProceso'];
		$cbTipo = $_POST['cbTipo'];
		$cbEmp = $_POST['cbEmp'];

		//print_r($names);
		$this->load->library('excel');
		$filename = 'REPORTE_ENVIOS_PM_ISSA.xls'; //save our workbook as this file name


		$this->excel->setActiveSheetIndex(0);
		$this->excel->getActiveSheet()->setTitle('Datos');

		$names = [];
		$query = $this->IssaModel->cargarHistorialPMEnviosIssa($txtProceso, $cbTipo, $cbEmp);

		if (count($query) > 0) {
			$names = get_object_vars($query[0]);
			//print_r($names);

			$names = array_keys($names);
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


	public function crearAsisIssaPeriodo() {
		set_time_limit(300);
		ini_set('max_execution_time', '300');
		ini_set('memory_limit', '2048M');

		$p_periodo = '';
		$p_usuario = 'SYSTEM';
		$count = 0;
		$observacion = 'OK';

		if ($this->input->get('p_usuario') != null) {
			$p_usuario = $this->input->get('p_usuario');
		}

		if ($this->input->get('p_periodo') != null) {
			$p_periodo = $this->input->get('p_periodo');
		}

		$params = 'operacion=asis_solicitud_he' .
					'&periodo=' . $p_periodo;

		$resData = $this->enviarIssa($params);


		if ($resData != null) {
			$resDecode = json_decode($resData);
			
			if (isset($resDecode->Error) && $resDecode->Error == 0) {
				$error = $resDecode->Error;
				$results = $resDecode->Results;
				$mensaje = $resDecode->Mensaje;
				if(count($results) > 0) {
					//limpiamos data existente del periodo
					$this->IssaModel->eliminarAsiSolIssa($p_periodo, $p_usuario);

					//guardamos log de inicio de guardados de registros
					$this->IssaModel->guardarLogAsiSolIssa(
					$p_periodo 
					, 'INICIO' 
					, $p_usuario 
					, $mensaje 
					, count($results) 
					, 0);

					//print_r($results);
					foreach ($results as $i) {
						$res = $this->IssaModel->guardarAsiSolIssa(
							$i->rut,
							$i->periodo,
							$i->nombre,
							$i->desde,
							$i->hasta,
							$i->horas_extras,
							$i->horas_emergencia,
							$i->horas_nocturnas,
							$i->horas_comp_turno,
							$i->desc_comp_feriado,
							$i->desc_comp_legal,
							$i->colacion,
							$i->viatico,
							$i->falta,
							$p_usuario
						);

						if($res != null && $res['r_est'] == 0) {
							$count++;
						}
					}

					//print_r('FINAL ' . count($results) . ' / ' . $count);

					if (count($results) == $count) {
						$this->IssaModel->guardarLogAsiSolIssa(
							$p_periodo 
						, 'FINAL' 
						, $p_usuario 
						, $observacion
						, count($results) 
						, $count);
						
					} else {
						$observacion = "El servicio no guardo todos los datos enviados" ;
						$this->IssaModel->guardarLogAsiSolIssa(
							$p_periodo 
						, 'FINAL' 
						, $p_usuario 
						, $observacion
						, count($results) 
						, $count);
					}
				}else{
					$observacion = "Servicio sin data" ;
					$this->IssaModel->guardarLogAsiSolIssa(
						$p_periodo 
						, 'INICIO' 
						, $p_usuario 
						, $observacion 
						, count($results) 
						, 0);
				}
				
			} else {
				$observacion = "Error en respuesta del servicio" ;
				$this->IssaModel->guardarLogAsiSolIssa(
					$p_periodo 
				  , 'ERROR' 
				  , $p_usuario 
				  , $observacion
				  , 0
				  , 0);
				
			}
		} else {
			$observacion = 'Servicio sin respuesta';
			$this->IssaModel->guardarLogAsiSolIssa(
				$p_periodo 
			  , 'ERROR' 
			  , $p_usuario 
			  , $observacion
			  , 0
			  , 0);
		}

		$result = array('r_est' => '0', 'r_msg' => $observacion);
		$resultFinal = '{"success":"true", "items": '.json_encode($result).'}';
		$this->output->set_output($resultFinal);
	}


	public function cargarAsisIssaNo()
	{
		$p_periodo = $this->input->get('p_periodo');
		$p_cod_emp = $this->input->get('p_cod_emp');

		$query = $this->IssaModel->cargarAsisIssaNo($p_periodo, $p_cod_emp);

		$result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
	}


	public function cargarAsisIssa()
	{
		$p_periodo = $this->input->get('p_periodo');

		$query = $this->IssaModel->cargarAsisIssa($p_periodo);

		$result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
	}

	public function cargarAsisIssaCon() {

		$p_cod_emp = $this->input->get('p_cod_emp');

		$query = $this->IssaModel->cargarAsisIssaCon($p_cod_emp);

		$result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
	}

	public function cargarSeguimientAsisIssa() {
		
		$query = $this->IssaModel->cargarSeguimientAsisIssa();

		$result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
	}

	public function importarAsiSolIssaProceso()
	{
		$P_PERIODO = $this->input->get('P_PERIODO');
		$P_COD_EMP = $this->input->get('P_COD_EMP');
		$P_USUARIO = $this->input->get('P_USUARIO');

		$query = $this->IssaModel->importarAsiSolIssaProceso(
			  $P_PERIODO 
			, $P_COD_EMP 
			, $P_USUARIO);

		$result = '{"success":"true", "items":' . json_encode($query) . '}';
		$this->output->set_output($result);
	}

	public function validarPeriodoAsisSolProc()
	{
		$periodo = $this->input->get('periodo');
		$query = $this->IssaModel->validarPeriodoAsisSolProc(
			  $periodo);

		$result = '{"success":"true", "items":' . json_encode($query) . '}';
		$this->output->set_output($result);
	}

	public function crearDotacionISSA() {

		set_time_limit(300);
		ini_set('max_execution_time', '300');
		ini_set('memory_limit', '2048M');

		$p_fecha = date('d-m-Y');
		
		$p_usuario = 'SYSTEM';
		$count = 0;
		$data = array();
		$observacion = 'OK';

		if ($this->input->get('p_usuario') != null) {
			$p_usuario = $this->input->get('p_usuario');
		}

		if ($this->input->get('p_fecha') != null) {
			$p_fecha = $this->input->get('p_fecha');
		}

		//echo $p_fecha;
		$params = 'operacion=asis_dotacion' .
					'&fecha=' . $p_fecha . 
					'&fecha_ultima_mod='. 
					'&empresa=' . 
					'&rut=';

		$resData = $this->enviarIssa($params);


		if ($resData != null) {
			$resDecode = json_decode($resData);

			
			
			if (isset($resDecode->Error) && $resDecode->Error == 0) {
				$error = $resDecode->Error;
				$results = $resDecode->Results;
				$mensaje = $resDecode->Mensaje;

				//print_r(count($results));
				if(count($results) > 0) {
				
					$this->IssaModel->borrarDotacionIssa();

					foreach ($results as $i) {

						$data[$count]['CODIGO'] = $i->codigo;
						$data[$count]['RUT'] = $i->rut;
						$data[$count]['APELLIDO_1'] = $i->apellido_1;
						$data[$count]['APELLIDO_2'] = $i->apellido_2;
						$data[$count]['NOMBRES'] = $i->nombres;
						$data[$count]['FECHA_ALTA'] = $i->fecha_alta;
						$data[$count]['FECHA_BAJA'] = $i->fecha_baja;
						$data[$count]['COD_EMPRESA'] = $i->cod_empresa;
						$data[$count]['NOM_EMPRESA'] = $i->nom_empresa;
						$data[$count]['DIRECCION'] = $i->Direccion;
						$data[$count]['COD_COMUNA'] = $i->cod_Comuna;
						$data[$count]['NOM_COMUNA'] = $i->nom_Comuna;
						$data[$count]['CIUDAD'] = $i->Ciudad;
						$data[$count]['FONO'] = $i->Fono;
						$data[$count]['CELULAR'] = $i->Celular;
						$data[$count]['MAIL'] = $i->Mail;
						$data[$count]['COD_SEXO'] = $i->cod_Sexo;
						$data[$count]['NOM_SEXO'] = $i->nom_Sexo;
						$data[$count]['FECHANACIMIENTO'] = $i->FechaNacimiento;
						$data[$count]['COD_NACIONALIDAD'] = $i->cod_Nacionalidad;
						$data[$count]['NOM_NACIONALIDAD'] = $i->nom_Nacionalidad;
						$data[$count]['COD_ESTADOCIVIL'] = $i->cod_EstadoCivil;
						$data[$count]['NOM_ESTADOCIVIL'] = $i->nom_EstadoCivil;
						$data[$count]['COD_FORMAPAGO'] = $i->cod_FormaPago;
						$data[$count]['NOM_FORMAPAGO'] = $i->nom_FormaPago;
						$data[$count]['COD_BANCO'] = $i->cod_Banco;
						$data[$count]['NOM_BANCO'] = $i->nom_Banco;
						$data[$count]['NUMEROCUENTA'] = $i->NumeroCuenta;
						$data[$count]['COD_CONDICIONPAGO'] = $i->cod_CondicionPago;
						$data[$count]['NOM_CONDICIONPAGO'] = $i->nom_CondicionPago;
						$data[$count]['CONTACTO'] = $i->Contacto;
						$data[$count]['CELULARCONTACTO'] = $i->CelularContacto;
						$data[$count]['FONOCONTACTO'] = $i->FonoContacto;
						$data[$count]['MAILCONTACTO'] = $i->MailContacto;
						$data[$count]['COD_SIGLA'] = $i->cod_Sigla;
						$data[$count]['NOM_SIGLA'] = $i->nom_Sigla;
						$data[$count]['COD_REGION'] = $i->cod_Region;
						$data[$count]['NOM_REGION'] = $i->nom_Region;
						$data[$count]['EMAIL_PERSONAL'] = $i->email_personal;
						$data[$count]['INSTITUCIÓN_AFP'] = $i->RemInstitución_AFP;
						$data[$count]['NOMINSTITUCIÓN_AFP'] = $i->RemNomInstitución_AFP;
						$data[$count]['TIPO_CONTRATO'] = $i->RemTipo_Contrato;
						$data[$count]['NOMTIPO_CONTRATO'] = $i->RemNomTipo_Contrato;
						$data[$count]['CONVENIO_COL_INSTITUCION'] = $i->RemConvenio_Colectivo_Institucion;
						$data[$count]['NOMCONVENIO_COL_INS'] = $i->RemNomConvenio_Colectivo_Institucion;
						$data[$count]['SUPERVISOR'] = $i->RemSupervisor;
						$data[$count]['NOMSUPERVISOR'] = $i->RemNomSupervisor;
						$data[$count]['SINDICATO'] = $i->RemSindicato;
						$data[$count]['NOMSINDICATO'] = $i->RemNomSindicato;
						$data[$count]['SUELDO_BASE'] = $i->RemSueldo_Base;
						$data[$count]['CARGO'] = $i->RemCargo;
						$data[$count]['NOMCARGO'] = $i->RemNomCargo;
						$data[$count]['CC'] = $i->RemCentro_Costo;
						$data[$count]['NOMCC'] = $i->RemNomCentro_Costo;
						$data[$count]['DEPARTAMENTO'] = $i->RemDepartamento;
						$data[$count]['NOMDEPARTAMENTO'] = $i->RemNomDepartamento;
						$data[$count]['GERENCIA'] = $i->RemGerencia;
						$data[$count]['NOMGERENCIA'] = $i->RemNomGerencia;
						$data[$count]['JORNADA'] = $i->RemJornada_Laboral;
						$data[$count]['NOMJORNADA'] = $i->RemNomJornada_Laboral;
						$data[$count]['SALUD'] = $i->RemInstitución_Salud;
						$data[$count]['NOMSALUD'] = $i->RemNomInstitución_Salud;
						$data[$count]['CONVENIO'] = $i->RemConvenio;
						$data[$count]['NOMCONVENIO'] = $i->RemNomConvenio;

						$count++;
					}
					$this->IssaModel->guardarDotacionIssa($data);
					$this->IssaModel->crearLogDotacionIssa($p_fecha, $p_usuario, $observacion);
						
				}else{
					$observacion = "Servicio sin data" ;
				}
				
			} else {
				$observacion = "Error en respuesta del servicio" ;
				
			}
		} else {
			$observacion = 'Servicio sin respuesta';
		}

		$result = array('r_est' => '0', 'r_msg' => $observacion);
		$resultFinal = '{"success":"true", "items": '.json_encode($result).'}';
		$this->output->set_output($resultFinal);

	}

	public function cargarCountDifDotacion()
    {
		$query = $this->IssaModel->cargarCountDifDotacion();

		$result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
	}

	public function cargarUltimoLogDotacionIssa()
    {
		$query = $this->IssaModel->cargarUltimoLogDotacionIssa();

		$result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
	}


	public function crearXlsDotacionIssa()
	{

		set_time_limit(300);
		ini_set('max_execution_time', '300');
		ini_set('memory_limit', '2048M');

		//print_r($names);
		$this->load->library('excel');
		$filename = 'FICHAS_ISSA.xls'; //save our workbook as this file name


		$this->excel->setActiveSheetIndex(0);
		$this->excel->getActiveSheet()->setTitle('Datos');

		$names = [];
		$query = $this->IssaModel->cargarDotacionesIssa();

		if (count($query) > 0) {
			$names = get_object_vars($query[0]);
			//print_r($names);

			$names = array_keys($names);
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

	public function crearXlsDotacionIssaTipo()
	{

		set_time_limit(300);
		ini_set('max_execution_time', '300');
		ini_set('memory_limit', '2048M');

		$p_tipo = $_POST['p_tipo'];

		//print_r($names);
		$this->load->library('excel');
		$filename = 'DIFERENCIAS_FICHAS_'.$p_tipo.'.xls'; //save our workbook as this file name


		$this->excel->setActiveSheetIndex(0);
		$this->excel->getActiveSheet()->setTitle('FCAB_RRHH');

		$names = [];
		$query = $this->IssaModel->cargarDotacionIssaPorTipo('FCAB_RRHH', $p_tipo);

		if (count($query) > 0) {
			$names = get_object_vars($query[0]);
			//print_r($names);

			$names = array_keys($names);
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

		$this->excel->createSheet();
		$this->excel->setActiveSheetIndex(1);
		$this->excel->getActiveSheet()->setTitle('ISSA');

		$names = [];
		$query = $this->IssaModel->cargarDotacionIssaPorTipo('ISSA', $p_tipo);

		if (count($query) > 0) {
			$names = get_object_vars($query[0]);
			//print_r($names);

			$names = array_keys($names);
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



	public function crearAusentismoISSA() {

		set_time_limit(300);
		ini_set('max_execution_time', '300');
		ini_set('memory_limit', '2048M');

		$p_fecha = '01-01-2020';
		$p_usuario = 'SYSTEM';
		$p_tipo = ''; //LICENCIA, PERMISO, VACACION
		$operacion = '';
		$count = 0;
		$data = array();
		$observacion = 'OK';

		if ($this->input->get('p_tipo') != null) {
			$p_tipo = $this->input->get('p_tipo');
		}
		
		switch($p_tipo) {
			case 'LICENCIA':
				$operacion = 'api_list_licenciamedica';
				break;
			case 'PERMISO':
				$operacion = 'api_list_permisos';
				break;
			case 'VACACION':
				$operacion = 'api_list_vacaciones';
				break;
			default :
				$p_tipo = 'ERROR';
				$observacion = 'Tipo incorrecto';
				break;
		}

		if($p_tipo != 'ERROR') {
			
			if ($this->input->get('p_usuario') != null) {
				$p_usuario = $this->input->get('p_usuario');
			}

			$last_log = $this->IssaModel->cargarUltimoLogAusentismo($p_tipo);


			if ($this->input->get('p_fecha') != null) {
				$p_fecha = $this->input->get('p_fecha');
			}else{
				if(count($last_log) > 0) {
					$p_fecha = $last_log[0]->FECHA_EJECUTAR;
				}
			}
			$params = 'operacion=' . $operacion .
						'&fecha=' . $p_fecha ;

			$resData = $this->enviarIssa($params);


			if ($resData != null) {
				$resDecode = json_decode($resData);

				if (isset($resDecode->Error) && $resDecode->Error == 0) {
					$error = $resDecode->Error;
					$results = $resDecode->Results;
					$mensaje = $resDecode->Mensaje;

					//print_r(count($results));
					if(count($results) > 0) {
						$sequencia = $this->IssaModel->cargarSeqAusentismo();
						$names = get_object_vars($results[0]);
						$names = array_keys($names);
						//print_r($names);
						foreach ($results as $i) {
							
							$i = get_object_vars($i);
							//print_r($i);
							foreach ($names as $name) {
								$nameUpper = strtoupper($name);
								if(strpos($name, "TOM_DIAS") === false) {
									$data[$count][$nameUpper] = $i[$name];
								}else{
									$data[$count][$nameUpper] = str_replace('.','%',$i[$name]);
									$data[$count][$nameUpper] = str_replace(',','.',$data[$count][$nameUpper] );
									$data[$count][$nameUpper] = str_replace('%','',$data[$count][$nameUpper] );
								}
								
							}
							$data[$count]['ID_EJECUCION'] = $sequencia[0]->SEQUENCIA;
							$count++;
						}
						//print_r($data[0]);
						$this->IssaModel->guardarAusentismoIssa($p_tipo, $data);
						$this->IssaModel->crearLogAusentismoIssa($sequencia[0]->SEQUENCIA, $p_tipo, $p_fecha, $p_usuario, $observacion);
						$this->IssaModel->eliminarDatosAusentismo();	
					}else{
						$observacion = "Servicio sin data" ;
					}
					
				} else {
					$observacion = "Error en respuesta del servicio" ;
					
				}
			} else {
				$observacion = 'Servicio sin respuesta';
			}
		}

		$result = array('r_est' => '0', 'r_msg' => $observacion);
		$resultFinal = '{"success":"true", "items": '.json_encode($result).'}';
		$this->output->set_output($resultFinal);

	}


	public function cargarAusentismosISSA() {
		$p_tipo = $this->input->get('p_tipo');
		$p_fec1 = $this->input->get('p_fec1');
		$p_fec2 = $this->input->get('p_fec2');
		$p_rut = $this->input->get('p_rut');

		$query = $this->IssaModel->cargarAusentismosISSA($p_tipo, $p_fec1, $p_fec2, $p_rut);

		$result = '{"success":"true", "items":' . json_encode($query) . '}';
        $this->output->set_output($result);
	}


	public function crearXlsAusentismoIssa()
	{
		set_time_limit(300);
        ini_set('max_execution_time', '300');
        ini_set('memory_limit', '2048M');

        $p_tipo = $_POST['p_tipo'];
		$p_fec1 = $_POST['p_fec1'];
		$p_fec2 = $_POST['p_fec2'];
		$p_rut = $_POST['p_rut'];

        //print_r($names);
        $this->load->library('excel'); 
        $filename='AUSENTISMO_ISSA_'.$p_tipo.'.xls'; //save our workbook as this file name


        $this->excel->setActiveSheetIndex(0);
        $this->excel->getActiveSheet()->setTitle('Información General');
        $this->excel->getActiveSheet()->setCellValue("A1", 'Reporte');
        $this->excel->getActiveSheet()->setCellValue("B1", 'Ausentismo ISSA');
        $this->excel->getActiveSheet()->setCellValue("A2", 'Fecha Creación');
        $this->excel->getActiveSheet()->setCellValue("B2", new DateTime());
        $this->excel->getActiveSheet()->setCellValue("A3", 'Tipo');
        $this->excel->getActiveSheet()->setCellValue("B3", $p_tipo);
        $this->excel->getActiveSheet()->setCellValue("A4", 'Rut');
        $this->excel->getActiveSheet()->setCellValue("B4", $p_rut);
        $this->excel->getActiveSheet()->setCellValue("A5", 'Fecha Desde');
        $this->excel->getActiveSheet()->setCellValue("B5", $p_fec1);
        $this->excel->getActiveSheet()->setCellValue("A6", 'Fecha Hasta');
        $this->excel->getActiveSheet()->setCellValue("B6", $p_fec2);


        $names = [];
        $query = $this->IssaModel->cargarAusentismosISSA($p_tipo, $p_fec1, $p_fec2, $p_rut);
        
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
