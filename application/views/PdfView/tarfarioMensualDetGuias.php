<html>

<head>
    <title>Reporte bonos por conductor</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <style type="text/css">
        @media print {
            @page {
                size: letter;
                margin: 5px;
            }
        }

        @page {
            margin: 150px 25px 100px 25px;
        }

        .pagenum::after {
            counter-increment: pages;
            content: counter(page)
        }

        header {
            position: fixed;
            top: -100px;
            left: 0px;
            right: 0px;
            height: 130px;
        }

        footer {
            position: fixed;
            bottom: -150px;
            left: 0px;
            right: 10px;
            height: 130px;
        }

        body {

            font-family: Arial, sans-serif;
            color: #153643;
        }

        h5 {
            margin: 0 0 10 0;
            padding: 0 0 10 0;
        }

        td {
            border: 1px solid black;
            border-collapse: collapse;
        }

        .cell1 {
            padding: 3px;
            font-size: 12px;
            line-height: 15px;
        }

        .cell-r {
            padding: 3px;
            font-size: 12px;
            line-height: 15px;
            text-align: right;
        }

        .cell-c {
            padding: 3px;
            font-size: 12px;
            line-height: 15px;
            text-align: center;
        }

        .cellTotalFinal-c {
            padding: 3px;
            font-size: 15px;
            text-align: center;
            font-weight: bold;
        }

        .cellTotalFinal {
            padding: 3px;
            font-size: 15px;
            font-weight: bold;
        }

        .no-border {
            border: 0px solid black;
        }

        .cell2 {
            padding: 1px 0 1px 5px;
            font-size: 12px;
            border: 0px solid black;
        }

        .cellBorder {
            border: 1px solid black;
        }

        .cellTitulo {
            padding: 5px;
            font-size: 12px;
            line-height: 20px;
            font-weight: bold;
            background-color: #005A8B;
            color: white;
            text-align: center;
        }

        .cellTotal-c {
            padding: 5px;
            font-size: 15px;
            line-height: 20px;
            font-weight: bold;
            background-color: grey;
            color: white;
            text-align: center;
        }

        .cellTotal-l {
            padding: 5px;
            font-size: 15px;
            line-height: 20px;
            font-weight: bold;
            background-color: grey;
            color: white;
            text-align: left;
        }

        .subTitle {
            font-size: 15px;
        }

        .center {
            margin-left: auto;
            margin-right: auto;
        }


        .right {
            text-align: right;

        }

        img {
            padding: 0 0 0 10,
        }
    </style>
</head>

<body>
    <header>
        <table border="0" cellpadding="0" cellspacing="0" width='100%'>
            <tr>
                <td width="150" class="no-border">
                    <img src="resources/images/logo-FCAB-Train-texto-abajo-sin-fondo.png" width="130" />
                </td>
                <td class="no-border">
                    <h3>
                        <center>Bonos por conductor</center>
                    </h3>
                </td>
                <td width="150" class="no-border">
                    <table border="0" cellpadding="0" cellspacing="0" width='100%'>
                        <tr>
                            <td class="cell2">Periodo</td>
                            <td class="cell2"><?php echo $general->PK_ANHO . "/" . $general->PK_MES; ?></td>
                        </tr>
                        <tr>
                            <td class="cell2">Desde</td>
                            <td class="cell2"><?php echo $general->DESDE ?></td>
                        </tr>
                        <tr>
                            <td class="cell2">Hasta</td>
                            <td class="cell2"><?php echo $general->HASTA ?></td>
                        </tr>
                        tr>
                        <td class="cell2">Pagina</td>
                        <td class="cell2"><span class="pagenum"></span></td>
            </tr>
        </table>
        </td>
        </tr>
        </table>

    </header>
    <main>

        <?php
        $v_rut = 0;
        $v_nro_solicitud = 0;
        $count = 0;
        $count_total = 0;

        $v_esp = 0.0;
        $v_mp = 0;
        $v_ton = 0;
        $v_bono = 0;
        $v_bono2 = 0;
        $v_val_esp = 0.0;
        $v_val_mp = 0;
        $v_val_ton = 0;

        $v_esp_total = 0.0;
        $v_mp_total = 0;
        $v_ton_total = 0;
        $v_bono_total = 0;
        $v_bono2_total = 0;
        $v_val_esp_total = 0.0;
        $v_val_mp_total = 0;
        $v_val_ton_total = 0;

        foreach ($guias as $data) {
            if ($data->ID_CONDUCTOR != $v_rut) {

                $v_rut = $data->ID_CONDUCTOR;
                $v_nro_solicitud = $data->PFK_SOLICITUD;


                echo '<p class="subTitle"><b>ID Conductor:</b> ' . $data->ID_CONDUCTOR . '<br>';
                echo '<b>Nombre Conductor:</b>' . $data->NOMBRE_CONDUCTOR  . '<br></p>';
                echo '<p class="subTitle"><b>Servicio:</b>' . $data->DESCRIPCION . '</p>';

                echo '<table width="100%">
                            <tr>
                                <th class="cellTitulo">Nro Guia</th>
                                <th class="cellTitulo">Toneladas</th>
                                <th class="cellTitulo">Fecha Salida</th>
                                <th class="cellTitulo">Producto</th>
                                <th class="cellTitulo">Origen</th>
                                <th class="cellTitulo">Destino</th>
                                <th class="cellTitulo">HR.Espera</th>
                                <th class="cellTitulo">MP Vacio</th>
                                <th class="cellTitulo">+27,5 Ton</th>
                                <th class="cellTitulo">Bono Conductor</th>
                                <th class="cellTitulo">Bono Conductor2</th>
                            </tr>';
            } else {
                if ($data->PFK_SOLICITUD != $v_nro_solicitud) {
                    $v_nro_solicitud = $data->PFK_SOLICITUD;

                    if ($count_total > 0) {
                        echo '<tr>
                                <td class="cellTotal-l" colspan="6">Total vueltas servicio:' . $count . '</td>
                                <td class="cellTotal-c">' . number_format($v_esp, 2, ',', '.') . '</td>
                                <td class="cellTotal-c">' . $v_mp . '</td>
                                <td class="cellTotal-c">' . $v_ton . '</td>
                                <td class="cellTotal-c">$' . number_format($v_bono, 0, ',', '.') . '</td>
                                <td class="cellTotal-c">$' . number_format($v_bono2, 0, ',', '.') . '</td>
                            </tr>';
                        echo '</table>';
                        echo '<hr>';

                        echo '<p class="subTitle"><b>Servicio:</b> <i>' . $data->DESCRIPCION . '</i></p>';

                        echo '<table width="100%">
                                <tr>
                                    <th class="cellTitulo">Nro Guia</th>
                                    <th class="cellTitulo">Toneladas</th>
                                    <th class="cellTitulo">Fecha Salida</th>
                                    <th class="cellTitulo">Producto</th>
                                    <th class="cellTitulo">Origen</th>
                                    <th class="cellTitulo">Destino</th>
                                    <th class="cellTitulo">HR.Espera</th>
                                    <th class="cellTitulo">MP Vacio</th>
                                    <th class="cellTitulo">+27,5 Ton</th>
                                    <th class="cellTitulo">Bono Conductor</th>
                                    <th class="cellTitulo">Bono Conductor2</th>
                                </tr>';

                        $v_bono = 0;
                        $v_esp = 0;
                        $v_mp = 0;
                        $v_ton = 0;
                        $v_val_ton = 0;
                        $v_val_mp = 0;
                        $v_val_esp = 0.0;
                        $count = 0;
                    }
                }
            }


            echo '<tr>
                    <td class="cell-c">' . $data->PK_NRO_GUIA . '</td>
                    <td class="cell-c">' . number_format($data->CANTIDAD_TRANSPORTADA, '2', ',', '.') . '</td>
                    <td class="cell-c">' . $data->FECHA_SALIDA . '</td>
                    <td class="cell-c">' . $data->PRODUCTO . '</td>
                    <td class="cell-c">' . $data->ORIGEN . '</td>
                    <td class="cell-c">' . $data->DESTINO . '</td>
                    <td class="cell-c">' . number_format($data->FACTOR_TE, 2, ',', '.') . '</td>
                    <td class="cell-c">' . $data->MP_VACIO . '</td>
                    <td class="cell-c">' . $data->IS_27_5 . '</td>

                    <td class="cell-c">$' . number_format($data->TIPO == 'PRIMARIO' ? $data->BONO_CONDUCTOR : 0, 0, ',', '.') . '</td>
                    <td class="cell-c">$' . number_format($data->TIPO == 'SEGUNDARIO' ? $data->BONO_CONDUCTOR_SEC : 0, 0, ',', '.') . '</td>
                </tr>';

            $v_bono +=  $data->TIPO == 'PRIMARIO' ? $data->BONO_CONDUCTOR : 0;
            $v_bono2 +=  $data->TIPO == 'SEGUNDARIO' ? $data->BONO_CONDUCTOR_SEC : 0;
            $v_esp +=  $data->FACTOR_TE;
            $v_mp +=  $data->MP_VACIO;
            $v_ton +=  $data->IS_27_5;
            $v_val_ton += $data->TON_27_5 * $data->IS_27_5;
            $v_val_mp += $data->MP_VACIO * $data->MP_VACIO_VAL; 
            $v_val_esp += $data->FACTOR_TE * $data->TIEMPO_ESPERA;

            $v_bono_total +=  $data->TIPO == 'PRIMARIO' ? $data->BONO_CONDUCTOR : 0;
            $v_bono2_total +=  $data->TIPO == 'SEGUNDARIO' ? $data->BONO_CONDUCTOR_SEC : 0;
            $v_esp_total +=  $data->FACTOR_TE;
            $v_mp_total +=  $data->MP_VACIO;
            $v_ton_total +=  $data->IS_27_5;
            $v_val_ton_total += $data->TON_27_5 * $data->IS_27_5;
            $v_val_mp_total += $data->MP_VACIO * $data->MP_VACIO_VAL;
            $v_val_esp_total += $data->FACTOR_TE * $data->TIEMPO_ESPERA;



            $count++;
            $count_total++;
        }
        echo '<tr>
                <td class="cellTotal-l" colspan="6">Total vueltas servicio:' . $count . '</td>
                <td class="cellTotal-c">' . number_format($v_esp, 2, ',', '.') . '</td>
                <td class="cellTotal-c">' . $v_mp . '</td>
                <td class="cellTotal-c">' . $v_ton . '</td>
                <td class="cellTotal-c">$' . number_format($v_bono, 0, ',', '.') . '</td>
                <td class="cellTotal-c">$' . number_format($v_bono2, 0, ',', '.') . '</td>
            </tr>';
        echo '</table>';
        echo '<hr>';

        echo '<h4>Total Cantidades</h4>';
        echo '<table class="center">
                <tr>
                    <td class="cellTotalFinal" width="300">Total vueltas: </td>
                    <td class="cellTotalFinal-c" width="150">' . count($guias) . '</td>
                </tr>
                <tr>
                    <td class="cellTotalFinal">Total horas espera: </td>
                    <td class="cellTotalFinal-c">' . $v_esp_total . '</td>
                </tr>
                <tr>
                    <td class="cellTotalFinal">Total MP vacio: </td>
                    <td class="cellTotalFinal-c">' . $v_mp_total . '</td>
                </tr>
                <tr>
                    <td class="cellTotalFinal">Total +27,5 Ton: </td>
                    <td class="cellTotalFinal-c">' . $v_ton_total . '</td>
                </tr>
            </table> <hr>';

        echo '<h4>Total Bono Producción</h4>';
        echo '<table class="center">
            <tr>
                <td class="cellTotalFinal" width="300">Total bono conductor: </td>
                <td class="cellTotalFinal-c" width="150">$' . number_format($v_bono_total, 0, ',', '.') . '</td>
            </tr>
            <tr>
                <td class="cellTotalFinal">Total bono conductor 2: </td>
                <td class="cellTotalFinal-c">$' . number_format($v_bono2_total, 0, ',', '.') . '</td>
            </tr>
            <tr>
                <td class="cellTotalFinal">Total bono MP vacio: </td>
                <td class="cellTotalFinal-c">$' . number_format($v_val_mp_total, 0, ',', '.') . '</td>
            </tr>
            <tr>
                <td class="cellTotalFinal">Total bono +27,5 Ton: </td>
                <td class="cellTotalFinal-c">$' . number_format($v_val_ton_total, 0, ',', '.') . '</td>
            </tr>
            <tr>
                <td class="cellTotalFinal"><b>Total Final: </b></td>
                <td class="cellTotalFinal-c"><b>$' . number_format(
            $v_bono_total + $v_bono2_total + $v_val_mp_total + $v_val_ton_total,
            0,
            ',',
            '.'
        ) . '</b></td>
            </tr>
        </table> <hr>';

        echo '<h4>Total Bono Tiempo Espera</h4>';
        echo '<table class="center">
            <tr>
                <td class="cellTotalFinal" width="300"><b>Total Final: </b></td>
                <td class="cellTotalFinal-c" width="150"><b>$' . number_format(
            $v_val_esp_total,
            0,
            ',',
            '.'
        ) . '</b></td>
            </tr>
        </table> <hr>';

        ?>

    </main>
    <footer>

    </footer>
</body>

</html>