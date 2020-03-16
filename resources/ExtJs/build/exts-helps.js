/**
 * Created by mario on 14-09-16.
 */


//Mis Tours (Visitas Guiadas)

//Ventana Presentacion Tour - 1
var ventanaTourInit = function (id, width, height, formulario, modal) {
    var winWidth = parseInt(width);
    if(Ext.isEmpty(modal)) modal = 1;
    if (!Ext.getCmp(id)) {
        var vDinamica = new Ext.create('fcab.view.Nuevo', {
            id: id,
            width: parseInt(width),
            height: parseInt(height),
            layout: 'anchor',
            modal: modal,
            constrain: true,
            minimizable: false,
            resizable: false,
            preventHeader: true,
            shadow:false,
            header: false,
            border: false,
            closable: false,
            draggable: false,
            style: 'border-width: 0px;',
            items: [{
                xtype: formulario
            }],
            listeners: {
                "show" : function(window) {
                    window.getEl().setOpacity(0);
                    window.getEl().fadeIn({duration: 2500});
                },
                'hide':function(win){
                    hopscotch.endTour(true);
                }
            }
        });
        vDinamica.show();
        vDinamica.center();
    } else {
        var window = Ext.getCmp(id);
        window.setWidth(winWidth);
        window.expand('', false);
        window.center();
    }
};

var IndicadoresTour = function() {
    var tour = {
        id: "reportes-tour",
        showPrevButton: true,
        i18n: {
            nextBtn: "Siguiente",
            prevBtn: "Anterior",
            doneBtn: "Listo!",
            skipBtn: "Omitir",
            closeTooltip: "Cancelar"
        },
        steps: [
            {
                title: "Ayuda",
                content: "Antes de comenzar, puedes cerrar este tour cuando lo desees y luego continuar, haciendo click en el menu de ayuda. Este menu de ayuda, tambien puedes encontrarlos en otros modulos de la plataforma SSO.",
                target: 'menuAyudaIndicadores',
                placement: "left",
                yOffset: -20
            },
            {
                title: "Listado de Gerencias",
                content: "En esta columna, aparecen las gerencias actuales según el organigrama de FCAB, Además, podrás ordenar las gerencias y decidir qué información visualizar y ocultar.",
                target: 'GerenciasIndicadores',
                placement: "right",
                yOffset: -20
            },
            {
                title: "Desrielos",
                content: "Los reportes de desrielos también están incluidos en los incides estadísticos.",
                target: 'GerenciasIndicadores',
                placement: "right",
                yOffset: -20,
                arrowOffset: 'center'
            },
            /*{
                title: "Seguimientos Anteriores",
                content: "Este conjunto de columnas, muestra un resumen de los reportes de la semana anterior.",
                target: 'IndicadoresSeguimientoSemAnterior',
                placement: "right",
                yOffset: -20
            },*/
            {
                title: "Indicadores Acumulados",
                content: "La información contenida en este grupo de columnas contiene información de todo los reportes incluyendo los del antiguo sistema de incidentes en lo que va del año.",
                target: 'segumientoAcumiladoIndicadores',
                placement: "left",
                yOffset: -20
            },
            {
                title: "Diferencias A/C",
                content: "Es el porcentaje en relación a los reportes abiertos y los cerrados tanto en reportes anteriores, como en la plataforma SSO.",
                target: 'segumientoAcumiladoDifAC',
                placement: "bottom",
                xOffset: 'center',
                arrowOffset: 'center'
            },
            {
                title: "Potenciales Acumulados",
                content: "Contiene la cantidad de reportes potenciales reportados por gerencias.",
                target: 'IndicadoresPotencialesAcumulados',
                placement: "left",
                yOffset: -20
            },
            {
                title: "Todo Listo!",
                content: "Recuerde que podrá ver la ayuda de otras pantallas haciendo click en el icono superior izquierdo.",
                target: 'IndicadoresPotencialesAcumulados',
                placement: "bottom",
                xOffset: 'center',
                arrowOffset: 'center'
            }
        ]
    };
    hopscotch.startTour(tour);
};

var ReportesTour = function() {
    var tour = {
        id: "reportes-tour",
        showPrevButton: true,
        i18n: {
            nextBtn: "Siguiente",
            prevBtn: "Anterior",
            doneBtn: "Listo!",
            skipBtn: "Omitir",
            closeTooltip: "Cancelar"
        },
        steps: [
            {
                title: "Fecha y Hora",
                content: "En este campo, podra seleccionar la fecha y la hora en que sucedio el acontecimiento, esta es independiente de la hora y el día en que fue reportado.",
                target: 'FechaHoraReporte',
                placement: "top",
                xOffset: 'center',
                arrowOffset: 'center'
            },
            {
                title: "Gerencía y Departamentos",
                content: "Al seleccionar este item, podra elejir entre las diferentes áreas y departamentos de las instalaciones. Con esto podra indicar cual es la gerencia responsable del incidente.",
                target: 'GerenciaDepartamentoReportes',
                placement: "right",
                yOffset: -17
            },
            {
                title: "Matriz de Riesgo",
                content: "La matriz de riesgo, indica la gravedad del reporte, la probabilidad de que este vuelva a suceder y la magnitud de impacto que puede provocar.",
                target: 'NivelRiesgoReportes',
                placement: "bottom",
                xOffset: 'center',
                arrowOffset: 'center'
            },
            {
                title: "Categoria",
                content: "Seleccione la categoría mas adecuada al incidente que esta reportando.",
                target: 'CategoriaReportes',
                placement: "right",
                yOffset: -17
            },
            {
                title: "Descripción",
                content: "Explique en sus propias palabras que sucedio, intente de ser lo más claro y breve posible.",
                target: 'DescripcionReportes',
                placement: "bottom",
                arrowOffset: 'center'
            },
            {
                title: "Solución Propuesta",
                content: "Explique como considera usted que se puede resolver el problema desde un punto de vista objetiva.",
                target: 'SolucionReportes',
                placement: "bottom",
                arrowOffset: 'center'
            },
            {
                title: "Continuar",
                content: "Una vez completada toda la información, podra continuar con la segunta etapa para generar su reporte.",
                target: 'continuarReportes',
                placement: "right",
                yOffset: -17
            }
        ]
    };
    hopscotch.startTour(tour);
};

var ReportesTour2 = function() {
    var tour = {
        id: "reportes-tour-2",
        showPrevButton: true,
        i18n: {
            nextBtn: "Siguiente",
            prevBtn: "Anterior",
            doneBtn: "Listo!",
            skipBtn: "Omitir",
            closeTooltip: "Cancelar"
        },
        steps: [
            {
                title: "Evidencia Gráfica",
                content: "Una imagen vale más que mil palabras. En este apartado, podra agregar imagenes del acontecimiento.",
                target: 'EvidenciaGraficaReportes',
                placement: "top",
                xOffset: 'center',
                arrowOffset: 'center'
            },
            {
                title: "Volver y Revisar",
                content: "Si necesita revisar o modificar su reporte, puede volver con tranquilidad, mientras no cierre esta ventana, los datos no se perderan.",
                target: 'BtnVolverReportes',
                placement: "left",
                yOffset: -17
            },
            {
                title: "Generar Reporte",
                content: "Al presionar este boton, se generara un numero de reporte, el cual sera enviado a su correo y al coordinador encargado del área seleccionada.",
                target: 'BtnEnviarReporte',
                placement: "bottom",
                xOffset: 'center',
                arrowOffset: 'center'
            }
        ]
    };
    hopscotch.startTour(tour);
};

var ReportesTourTrab = function() {
    var tour = {
        id: "reportes-tour-trab",
        showPrevButton: true,
        i18n: {
            nextBtn: "Siguiente",
            prevBtn: "Anterior",
            doneBtn: "Listo!",
            skipBtn: "Omitir",
            closeTooltip: "Cancelar"
        },
        steps: [
            {
                title: "Fecha y Hora",
                content: "En este campo, podra seleccionar la fecha y la hora en que sucedio el acontecimiento, esta es independiente de la hora y el día en que fue reportado.",
                target: 'FechaHoraReporte',
                placement: "top",
                xOffset: 'center',
                arrowOffset: 'center'
            },
            {
                title: "Gerencía y Departamentos",
                content: "Al seleccionar este item, podra elejir entre las diferentes áreas y departamentos de las instalaciones. Con esto podra indicar cual es la gerencia responsable del incidente.",
                target: 'GerenciaDepartamentoReportes',
                placement: "right",
                yOffset: -17
            },
            {
                title: "Trabajador Observado",
                content: "Persona quien es causante o afectado por la acción que causo una acción insegura.",
                target: 'TrabajadorObservadoReportes',
                placement: "bottom",
                xOffset: 'center',
                arrowOffset: 'center'
            },
            {
                title: "Matriz de Riesgo",
                content: "La matriz de riesgo, indica la gravedad del reporte, la probabilidad de que este vuelva a suceder y la magnitud de impacto que puede provocar.",
                target: 'NivelRiesgoReportes',
                placement: "bottom",
                xOffset: 'center',
                arrowOffset: 'center'
            },
            {
                title: "Categoria",
                content: "Seleccione la categoría mas adecuada al incidente que esta reportando.",
                target: 'CategoriaReportes',
                placement: "right",
                yOffset: -17
            },
            {
                title: "Descripción",
                content: "Explique en sus propias palabras que sucedio, intente de ser lo más claro y breve posible.",
                target: 'DescripcionReportes',
                placement: "bottom",
                arrowOffset: 'center'
            },
            {
                title: "Solución Propuesta",
                content: "Explique como considera usted que se puede resolver el problema desde un punto de vista objetiva.",
                target: 'SolucionReportes',
                placement: "bottom",
                arrowOffset: 'center'
            },
            {
                title: "Continuar",
                content: "Una vez completada toda la información, podra continuar con la segunta etapa para generar su reporte.",
                target: 'continuarReportes',
                placement: "right",
                yOffset: -17
            }
        ]
    };
    hopscotch.startTour(tour);
};

var ReportesTourRetro = function() {
    var tour = {
        id: "reportes-tour-retro",
        showPrevButton: true,
        i18n: {
            nextBtn: "Siguiente",
            prevBtn: "Anterior",
            doneBtn: "Listo!",
            skipBtn: "Omitir",
            closeTooltip: "Cancelar"
        },
        steps: [
            {
                title: "Fecha y Hora",
                content: "En este campo, podra seleccionar la fecha y la hora en que sucedio el acontecimiento, esta es independiente de la hora y el día en que fue reportado.",
                target: 'FechaHoraReporte',
                placement: "top",
                xOffset: 'center',
                arrowOffset: 'center'
            },
            {
                title: "Gerencía y Departamentos",
                content: "Al seleccionar este item, podra elejir entre las diferentes áreas y departamentos de las instalaciones. Con esto podra indicar cual es la gerencia responsable del incidente.",
                target: 'GerenciaDepartamentoReportes',
                placement: "right",
                yOffset: -17
            },
            {
                title: "Trabajador Observado",
                content: "Persona quien es causante o afectado por la acción que causo una acción insegura.",
                target: 'TrabajadorObservadoReportes',
                placement: "bottom",
                xOffset: 'center',
                arrowOffset: 'center'
            },
            {
                title: "Descripción",
                content: "Explique en sus propias palabras que sucedio, intente de ser lo más claro y breve posible.",
                target: 'DescripcionReportes',
                placement: "bottom",
                arrowOffset: 'center'
            },
            {
                title: "Continuar",
                content: "Una vez completada toda la información, podra continuar con la segunta etapa para generar su reporte.",
                target: 'continuarReportes',
                placement: "right",
                yOffset: -17
            }
        ]
    };
    hopscotch.startTour(tour);
};

var ReabrirReportesTour = function() {
    var tour = {
        id: "reportes-tour-reabrir",
        showPrevButton: true,
        i18n: {
            nextBtn: "Siguiente",
            prevBtn: "Anterior",
            doneBtn: "Listo!",
            skipBtn: "Omitir",
            closeTooltip: "Cancelar"
        },
        steps: [
            {
                title: "Fecha y Hora",
                content: "Esta se mantendrá, para mantener el dato real de cuando ocurrió el incidente, se registrara adicional a esta una fecha en que fue solicitada su reapertura.",
                target: 'fecha_reporte',
                placement: "right",
                yOffset: -17
            },
            {
                title: "Gerencia",
                content: "La gerencia, solo puede ser cambiada por un coordinador, Si intenta reabrir un reporte, solo para el cambio de gerencia, infórmelo a su coordinador, desde la descripción del problema.",
                target: 'area_investigada',
                placement: "top",
                xOffset: 'center',
                arrowOffset: 'center'
            },
            {
                title: "Trabajador Observado",
                content: "Esto será editable, si el reportes así lo permite.",
                target: 'trabajador_reportado',
                placement: "right",
                yOffset: -17
            },
            {
                title: "Tipo de Reporte",
                content: "Si el tipo de reporte, no corresponde, deberá crear un nuevo reporte que se adecue a las condiciones del incidente.",
                target: 'tipo_reporte',
                placement: "right",
                yOffset: -17
            },
            {
                title: "Descripción",
                content: "Por favor, detalle con mayor precisión lo acontecido y complete la información por la cual el coordinador rechazo anteriormente su reporte.",
                target: 'descripcion_incidente',
                placement: "bottom",
                xOffset: 'center',
                arrowOffset: 'center'
            },
            {
                title: "Solución",
                content: "Complete la información faltante que pudo ocasionar que su reporte fuese rechazado.",
                target: 'solucion_propuesta_reporte',
                placement: "bottom",
                xOffset: 'center',
                arrowOffset: 'center'
            },
            {
                title: "Nueva Evidencia",
                content: "Si es necesario, puede agregar nueva evidencia gráfica.",
                target: 'NuevaEvidenciaReabrir',
                placement: "top",
                xOffset: 'center',
                arrowOffset: 'center'
            },
            {
                title: "Reabrir Reporte",
                content: "Cuando confirme los cambios, el proceso cambiara su estado a Abierto y estará disponible para una nueva evaluación.",
                target: 'btnConfirmarReapertura',
                placement: "right",
                yOffset: -17
            }
        ]
    };
    hopscotch.startTour(tour);
};