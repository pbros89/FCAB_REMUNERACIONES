<?php
/**
 * Created by IntelliJ IDEA.
 * User: MarioTi
 * Date: 03-01-16
 * Time: 10:47 PM
 */

if (!defined('BASEPATH')) exit('No se permite el acceso directo a este directorio');

class MaestraSGS_model extends CI_Model
{

    public function __construct()
    {
        parent::__construct();
        //$this->load->database(); //Cargo la base de datos por defecto para todo el modelo
        $this->load->database("mantvia"); //Carga la base de datos en el grupo mantvia
    }

    /**
     * @param $offset_page última pagina solicitada
     * @param $end : Limite enviado por el store, para filtrar los resultados mostrados
     * @param $ramal
     * @param $causa
     * @param $activo
     * @return mixed retorna un array con los resultados de a base de datos.
     */
    public function getDatosMaestraPaggin($offset_page, $end, $ramal, $causa, $activo, $vence)
    {
        $sql = "SELECT * from
                (SELECT a.*, ROWNUM rnum from
                (SELECT	cod_ramal RAMAL, cod_estacion ESTACION, TIPO, cod_equipo EQUIPO, LINEA,
			        TO_CHAR(km_desde, '000.000') DESDE, TO_CHAR(km_hasta, '000.000') HASTA, NUMERO, VELOCIDAD, CAUSA , OBSERVACION, ESTADO,
			        TO_CHAR(fvence,'dd/mm/yyyy') VENCE, activa ACTIVO, CANCELA,
			        TO_CHAR(factiva,'dd/mm/yyyy') FECHA, nvl(solicita,'') SOLICITO
                FROM VO_PRECAUCIONES_TRANSITORIAS
	            WHERE estado = 'A'";

        if ($causa !== "") {
            $sql .= " AND causa = '" . $causa . "'";
        }

        if ($ramal !== "") {
            $sql .= " AND cod_ramal = '" . $ramal ."'";
        }

        if ($activo !== "") {
            $sql .= " AND activa = '" . $activo . "'";
        }

        if ($vence !== "") {
            $sql .= " AND fvence = to_date('" . $vence . "','dd/mm/yyyy')";
        }

	    $sql .= "ORDER BY VENCE) a
                WHERE ROWNUM <= $end )
                WHERE rnum  >= $offset_page";

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function getDatosMaestra()
    {
        $sql = "SELECT	cod_ramal RAMAL, cod_estacion ESTACION, TIPO, cod_equipo EQUIPO, LINEA,
			        TO_CHAR(km_desde, '000.000') DESDE, TO_CHAR(km_hasta, '000.000') HASTA, NUMERO, VELOCIDAD, CAUSA , OBSERVACION, ESTADO,
			        TO_CHAR(fvence,'dd/mm/yyyy') VENCE, activa ACTIVO, CANCELA,
			        TO_CHAR(factiva,'dd/mm/yyyy') FECHA, nvl(solicita,'') SOLICITO
                FROM VO_PRECAUCIONES_TRANSITORIAS
	            WHERE estado = 'A'
	            ORDER BY VENCE";

        $query = $this->db->query($sql);
        return $query->result();
    }

    public function getTotalDatosMaestraPaggin($ramal, $causa, $activo, $vence)
    {
        $sql = "SELECT cod_ramal FROM VO_PRECAUCIONES_TRANSITORIAS WHERE estado = 'A'";

        if ($causa !== "") {
            $sql .= " AND causa = '" . $causa . "'";
        }

        if ($ramal !== "") {
            $sql .= " AND cod_ramal = '" . $ramal ."'";
        }

        if ($activo !== "") {
            $sql .= " AND activa = '" . $activo . "'";
        }

        if ($vence !== "") {
            $sql .= " AND fvence = to_date('" . $vence . "','dd/mm/yyyy')";
        }

        $query = $this->db->query($sql);
        return $query->num_rows();
    }

    public function getTotalDatosMaestra()
    {
        $sql = "SELECT cod_ramal FROM VO_PRECAUCIONES_TRANSITORIAS WHERE estado = 'A'";
        $query = $this->db->query($sql);
        return $query->num_rows();
    }

    public function CrearPrecaucionMaestra($user, $cod_ramal, $estacion, $tipo, $equipo, $km_desde, $km_hasta, $velocidad, $causa, $observacion, $fvence, $uid)
    {
        $veces = 1;
        $vl_numero = 0;
        $mensaje = "";
        $error = 0;

        for ($index = 1; $index <= 500; $index++) {
            $obt_numero = "SELECT vo_seq_precaucion.nextval numero FROM dual";
            $q0 = $this->db->query($obt_numero);
            foreach ($q0->result() as $row) {
                $vl_numero = $row->NUMERO;
            }

            $obt_numero_prec = "SELECT	numero
										FROM 	VO_PRECAUCIONES_ADMINISTRATIVA
										WHERE   numero = " . $vl_numero . "
										  AND   estado = 'A'
										UNION
										SELECT	numero
										FROM 	VO_PRECAUCIONES_ARRASTRE
										WHERE   numero = " . $vl_numero . "
										  AND   estado = 'A'
										UNION
										SELECT	numero
										FROM 	VO_PRECAUCIONES_TRANSITORIAS
										WHERE   numero = " . $vl_numero . "
										  AND   estado = 'A'";
            $q1 = $this->db->query($obt_numero_prec);
            if ($q1->num_rows() === 0) {
                break;
            } else {
                if ($veces >= 500) {
                    $error = 1;
                    $vl_numero = 0;
                }
            }
            $veces++;
        }

        if ($estacion == "") {
            $insertar_prec = "INSERT INTO VO_PRECAUCIONES_TRANSITORIAS(cod_ramal,
							km_desde,  km_hasta,  numero,  velocidad,
							causa,  observacion, estado,
							fvence, activa,  factiva, solicita)
			VALUES('" . $cod_ramal . "',  " . $km_desde . ",  " . $km_hasta . ",  " . $vl_numero . ",
					" . $velocidad . ",  '" . $causa . "',  '" . $observacion . "',
					'A',  to_date('" . $fvence . "','dd/mm/yyyy'),
					'" . $user . "', sysdate, '" . $uid . "')";
        } else {
            if ($estacion != "" && $equipo == "LINEA_P") {
                $insertar_prec = "INSERT INTO VO_PRECAUCIONES_TRANSITORIAS(cod_ramal,
                            cod_estacion, tipo, cod_equipo,
                            km_desde,  km_hasta,  numero,  velocidad,
                            causa ,  observacion, estado,
                            fvence, activa,  factiva, solicita)
                            VALUES('" . $cod_ramal . "','" . $estacion . "', '" . $tipo . "', nvl('" . $equipo . "','x'),  " . $km_desde . ",  " . $km_hasta . ",  " . $vl_numero . ",
                    " . $velocidad . ",  '" . $causa . "',  '" . $observacion . "',
                    'A',  to_date('" . $fvence . "','dd/mm/yyyy'),
                    '" . $user . "', sysdate, '" . $uid . "')";
            } else {
                $insertar_prec = "INSERT INTO VO_PRECAUCIONES_TRANSITORIAS(cod_ramal,
                            km_desde,  km_hasta,  numero,  velocidad,
                            causa ,  observacion, estado,
                            fvence, activa,  factiva, solicita)
            VALUES('" . $cod_ramal . "',  " . $km_desde . ",  " . $km_hasta . ",  " . $vl_numero . ",
                    " . $velocidad . ",  '" . $causa . "',  '" . $observacion . "',
                    'A',  to_date('" . $fvence . "','dd/mm/yyyy'),
                    '" . $user . "', sysdate, '" . $uid . "')";
            }
        }
        $this->db->query($insertar_prec);
        if ($error == 1) {
            $mensaje = "No existen posibilidades de nuevas precauciones se intentaron 500 posibilidades";
        } else {
            $mensaje = "Se ingreso la precaución $vl_numero de forma exitosa";
        }
        $salida = array("numero" => $vl_numero, "mensaje" => $mensaje);

        return $vl_numero;
    }

    public function EditarPrecaucionMaestra($numero, $desde, $hasta, $vence, $velocidad, $observaciones)
    {
        $sql = "UPDATE VO_PRECAUCIONES_TRANSITORIAS
		        SET km_desde = '" . $desde . "',
			        km_hasta = '" . $hasta . "',
                    fvence = to_date('" . $vence . "','dd/mm/yyyy'),
                    velocidad = " . $velocidad . ",
                    observacion = '" . $observaciones . "'
		        WHERE numero = " . $numero . "
			    AND estado = 'A'";

        $query = $this->db->query($sql);
        return $query;
    }

    public function CancelarPrecaucionMaestra($numero)
    {
        $sql = "UPDATE VO_PRECAUCIONES_TRANSITORIAS
		        SET estado = 'C',
			      cancela = 'PRUEBA_MAESTRA',
			      fcancela = sysdate
		        WHERE numero = " . $numero . "
			    AND estado = 'A'";

        $query = $this->db->query($sql);
        return $query;
    }

    public function  ListadoRamales()
    {
        $sql = "SELECT	cod_ramal ramal
		                FROM	mr_ramales
						ORDER BY 1";
        $query = $this->db->query($sql);
        return $query->result();
    }

    public function  ListadoCausas()
    {
        $sql = "SELECT parametro, DESCRIPCION, substr(parametro||'_______________',1,15) TIPO
						FROM 	bd_mantvia.VO_CODIGOS_BASICOS
						WHERE	CODIGO = '2'
						AND     parametro NOT IN ('PREC_CONTROL_VI')
						AND		parametro NOT IN ('PREC_CONTROL')
						ORDER BY 1";
        $query = $this->db->query($sql);
        return $query->result();
    }

    public function  ListadoActiva()
    {
        $sql = "SELECT activa ACTIVO
                  FROM VO_PRECAUCIONES_TRANSITORIAS
                  GROUP BY activa
                  HAVING COUNT(*) > 1";
        $query = $this->db->query($sql);
        return $query->result();
    }
    
    public function obtener_datos_fluct_petroleo()
    {
        $sql = "SELECT * FROM SGL_CONTROL_FLUCTUACION";

        $query = $this->db->query($sql);
        return $query->result();

    }
}