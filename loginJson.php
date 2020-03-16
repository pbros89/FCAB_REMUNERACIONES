<?php

	include("Oracle.php");

	$args = array("username"=>"bd_sso",
	  "password"=>"ds2016",
	  "datasource"=>"89.168.89.105:1521/prod11");

	$oracle = new CI_Oracle($args);

  	$user = strtoupper($_GET["USER"]);
	$tipo = strtoupper($_GET["TIPO"]);
	$rut = $_GET["RUT"];
	$anho = $_GET["ANHO"];

	//Pruebas app precauciones
	$usuario = $_GET["USER"];
  	$password = $_GET["PASS"];

	if($tipo === "TALLER"){

		$query = $oracle->query("SELECT COD_EMPRESA, RUT_TRABAJADOR, APE_PATERNO_TRABAJ, APE_MATERNO_TRABAJ, NOMBRE, NOMBRE||' '||APE_PATERNO_TRABAJ||' '||APE_MATERNO_TRABAJ NOMBRE_COMPLETO
								 FROM winper.personal
							     WHERE NRO_TRABAJADOR = $rut
								 AND  TO_CHAR(fec_nacimiento,'yyyy') = '$anho'
								 AND cod_vigen_trabajad = 'S'");

		$datos = array();
		$datos["CORREO"] = 'HLEPPE@GMAIL.COM'; //EL USUARIO NO TIENE CORREO
		$datos["LOGIN"] = 'CAPACITA'; //NO ENCONTRO EL LOGIN
		$count = 0;

		while ($query->next()){
			$datos["RUT"] = $query->get("RUT_TRABAJADOR");
			$datos["NOMBRE"] = $query->get("NOMBRE_COMPLETO");
			$datos["EMPRESA"] = $query->get("COD_EMPRESA");
			$count++;
		}

		$query2 = $oracle->query("SELECT BD_GENERAL.SG_AS_USUARIOS.LOGIN_INTRANET || '@' || INC_USUARIOS_VW_WP.CORREO CORREO, BD_GENERAL.SG_AS_USUARIOS.LOGIN_INTRANET LOGIN
								 FROM BD_GENERAL.SG_AS_USUARIOS, INC_USUARIOS_VW_WP
								 WHERE BD_GENERAL.SG_AS_USUARIOS.RUT_USUARIO = $rut
								 AND INC_USUARIOS_VW_WP.RUT_FUN = $rut");

		while ($query2->next()){
			$datos["LOGIN"] = $query2->get("LOGIN");
			$datos["CORREO"] = $query2->get("CORREO");
		}

		header('Access-Control-Allow-Origin: *');
		header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
		header('Content-Type', 'text/json');

		if($count !== 0){
			$json = array(
				"results"=>array([
					'error' => false,
					'nombre'=> $datos["LOGIN"],
					'rut'=> $datos["RUT"],
					'nombre_full'=> $datos["NOMBRE"],
					'area'=> 'TALLER',
					'correo'=> $datos["CORREO"],
					'empresa'=> $datos["EMPRESA"],
					'tipo' => $tipo,
					'cargo'=> '',
					'usuario'=> 'capacita',
					'password'=> 'capacita'
				])
			);
		} else {
			$json = array(
				"results"=>array([
					'error' => true,
					'nombre'=> $user,
					'rut'=> $rut,
					'nombre_full'=> '',
					'area'=> 'TALLER',
					'correo'=> '',
					'empresa'=> 1,
					'tipo' => $tipo,
					'cargo'=> '',
					'usuario'=> '',
					'password'=> ''
				])
			);
		}

		echo json_encode($json);
		
	} else if($tipo === "DASHBOARD") {

		$gerencia = strtoupper($_GET["GERENCIA"]);

		$query = $oracle->query("SELECT RUT_USUARIO, NOM_FUN||' '||APP_FUN||' '||APM_FUN NOMBRE, CORREO,
									SSO_ISADMIN(RUT_USUARIO, '$gerencia') ISADMIN
                            		FROM BD_GENERAL.SG_AS_USUARIOS, INC_USUARIOS_VW_WP
                            		WHERE LOGIN_INTRANET = '$user'
                            		AND RUT_USUARIO = RUT_FUN
                            		AND INC_USUARIOS_VW_WP.SIT_PRO_FUN='L'
                            		AND INC_USUARIOS_VW_WP.IND_FUN_FIN='N'");

		$datos = array();
		$datos["CORREO"] = 'HLEPPE@GMAIL.COM';
		$count = 0;
		while ($query->next()){
			$datos["RUT"] = $query->get("RUT_USUARIO");
			$datos["ISADMIN"] = $query->get("ISADMIN");
			$datos["NOMBRE"] = $query->get("NOMBRE");
			$datos["CORREO"] = $user . '@' . $query->get("CORREO");
			$count++;
		}

		header('Access-Control-Allow-Origin: *');
		header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
		header('Content-Type', 'text/json');

		if($count !== 0){
			$json = array(
				"results"=>array([
					'error' => false,
					'isAdmin' => $datos["ISADMIN"],
					'nombre'=> $user,
					'rut'=> $datos["RUT"],
					'nombre_full'=> $datos["NOMBRE"],
					'area'=> 'DASHBOARD',
					'correo'=> $datos["CORREO"],
					'empresa'=> 1,
					'tipo' => $tipo,
					'cargo'=> '',
					'usuario'=> $usuario,
					'password'=> $password
				])
			);
		} else {
			$json = array(
				"results"=>array([
					'error' => true,
					'isAdmin' => 0,
					'nombre'=> $user,
					'rut'=> $rut,
					'nombre_full'=> '',
					'area'=> 'DASHBOARD',
					'correo'=> '',
					'empresa'=> 1,
					'tipo' => $tipo,
					'cargo'=> '',
					'usuario'=> '',
					'password'=> ''
				])
			);
		}


		echo json_encode($json);
	} else {
		$query = $oracle->query("SELECT RUT_USUARIO, NOM_FUN||' '||APP_FUN||' '||APM_FUN NOMBRE, CORREO
                            		FROM BD_GENERAL.SG_AS_USUARIOS, INC_USUARIOS_VW_WP
                            		WHERE LOGIN_INTRANET = '$user'
                            		AND RUT_USUARIO = RUT_FUN
                            		AND INC_USUARIOS_VW_WP.SIT_PRO_FUN='L'
                            		AND INC_USUARIOS_VW_WP.IND_FUN_FIN='N'");

		$datos = array();
		$datos["CORREO"] = 'HLEPPE@GMAIL.COM';
		$count = 0;
		while ($query->next()){
			$datos["RUT"] = $query->get("RUT_USUARIO");
			$datos["NOMBRE"] = $query->get("NOMBRE");
			$datos["CORREO"] = $user . '@' . $query->get("CORREO");
			$count++;
		}

		header('Access-Control-Allow-Origin: *');
		header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
		header('Content-Type', 'text/json');

		if($count !== 0){
			$json = array(
				"results"=>array([
					'error' => false,
					'nombre'=> $user,
					'rut'=> $datos["RUT"],
					'nombre_full'=> $datos["NOMBRE"],
					'area'=> 'INTRANET',
					'correo'=> $datos["CORREO"],
					'empresa'=> 1,
					'tipo' => $tipo,
					'cargo'=> '',
					'usuario'=> $usuario,
					'password'=> $password
				])
			);
		} else {
			$json = array(
				"results"=>array([
					'error' => true,
					'nombre'=> $user,
					'rut'=> $rut,
					'nombre_full'=> '',
					'area'=> 'INTRANET',
					'correo'=> '',
					'empresa'=> 1,
					'tipo' => $tipo,
					'cargo'=> '',
					'usuario'=> '',
					'password'=> ''
				])
			);
		}


		echo json_encode($json);
	}
