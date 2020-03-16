//Store Menu:
/*******************************************************************************
 Store Arbol de Ingresos
 *******************************************************************************/
Ext.define('fcab.store.menu.reporte', {
    extend: 'Ext.data.TreeStore',
    fields: ['name', 'text', 'tituloTab', 'formulario', 'id', 'descripcion', 'icon', 'iconCls', 'expanded', 'cerrable'],
    root: {
        name: "Filtro1", text: "ROOT", tituloTab: "", formulario: "", id: "",
        descripcion: "", icon: "", iconCls: "", expanded: true, cerrable: false,
        children: [{
            name: "Filtro1", //Items a Filtrar
            text: "Proceso Consolidado",
            tipo: "tab",
            tituloTab: "Proceso Consolidado",
            id: "menu_proceso_consolidado",
            formulario: "ReporteProcesoConsolidado",
            icon: "icon-listaTab", leaf: true,
            iconCls: "icon-reportes",
            cerrable: 1,
            cls: 'x-hidden'
            //disabled: true
        },{
            name: "Filtro1", //Items a Filtrar
            text: "Ingreso Consolidado",
            tipo: "tab",
            tituloTab: "Ingreso Consolidado",
            id: "menu_ingreso_consolidado",
            formulario: "ReporteIngresoConsolidado",
            icon: "icon-listaTab", leaf: true,
            iconCls: "icon-reportes",
            cerrable: 1,
            cls: 'x-hidden'
            //disabled: true
        },{
            name: "Filtro1", //Items a Filtrar
            text: "Cambios AFP",
            tipo: "tab",
            tituloTab: "Cambios AFP",
            id: "menu_reporte_cambio_afp",
            formulario: "ReporteCambioAFP",
            icon: "icon-listaTab", leaf: true,
            iconCls: "icon-reportes",
            cerrable: 1,
            cls: 'x-hidden'
            //disabled: true
        },{
            name: "Filtro1", //Items a Filtrar
            text: "Cambios Salud",
            tipo: "tab",
            tituloTab: "Cambios Salud",
            id: "menu_reporte_cambio_salud",
            formulario: "ReporteCambioSalud",
            icon: "icon-listaTab", leaf: true,
            iconCls: "icon-reportes",
            cerrable: 1,
            cls: 'x-hidden'
            //disabled: true
        },{
            name: "Filtro1", //Items a Filtrar
            text: "Cambios Sindicato",
            tipo: "tab",
            tituloTab: "Cambios Sindicato",
            id: "menu_reporte_cambio_sindicato",
            formulario: "ReporteCambioSindicato",
            icon: "icon-listaTab", leaf: true,
            iconCls: "icon-reportes",
            cerrable: 1,
            cls: 'x-hidden'
            //disabled: true
        },{
            name: "Filtro1", //Items a Filtrar
            text: "Cambios Deposito Rem", 
            tipo: "tab",
            tituloTab: "Cambios Deposito Rem",
            id: "menu_reporte_cambio_depositorem",
            formulario: "ReporteCambioDeposito",
            icon: "icon-listaTab", leaf: true,
            iconCls: "icon-reportes",
            cerrable: 1,
            cls: 'x-hidden'
            //disabled: true
        },{
            name: "Filtro1", //Items a Filtrar
            text: "Cambios Cargo Renta", 
            tipo: "tab",
            tituloTab: "Cambios Cargo Renta",
            id: "menu_reporte_cambio_cargorenta",
            formulario: "ReporteCambioCargoRenta",
            icon: "icon-listaTab", leaf: true,
            iconCls: "icon-reportes",
            cerrable: 1,
            cls: 'x-hidden'
            //disabled: true
        },{
            name: "Filtro1", //Items a Filtrar
            text: "Cambios Bonos", 
            tipo: "tab",
            tituloTab: "Cambios Bonos",
            id: "menu_reporte_cambio_bono",
            formulario: "ReporteCambioBono",
            icon: "icon-listaTab", leaf: true,
            iconCls: "icon-reportes",
            cerrable: 1,
            cls: 'x-hidden'
            //disabled: true
        },{
            name: "Filtro1", //Items a Filtrar
            text: "Cambios Otros", 
            tipo: "tab",
            tituloTab: "Cambios Otros",
            id: "menu_reporte_cambio_otros",
            formulario: "ReporteCambioOtros",
            icon: "icon-listaTab", leaf: true,
            iconCls: "icon-reportes",
            cerrable: 1,
            cls: 'x-hidden'
            //disabled: true
        },{
            name: "Filtro1", //Items a Filtrar
            text: "Finiquito Consolidado",
            tipo: "tab",
            tituloTab: "Finiquito Consolidado",
            id: "menu_finiquito_consolidado",
            formulario: "ReporteFiniquitoConsolidado",
            icon: "icon-listaTab", leaf: true,
            iconCls: "icon-reportes",
            cerrable: 1,
            cls: 'x-hidden'
            //disabled: true
        },{
            name: "Filtro1", //Items a Filtrar
            text: "Haberes RRLL",
            tipo: "tab",
            tituloTab: "Haberes RRLL",
            id: "menu_reporte_ing_haber_rrll",
            formulario: "ReporteIngHaberRRLL",
            icon: "icon-listaTab", leaf: true,
            iconCls: "icon-reportes",
            cerrable: 1,
            cls: 'x-hidden'
            //disabled: true
        },{
            name: "Filtro1", //Items a Filtrar
            text: "Descuentos RRLL",
            tipo: "tab",
            tituloTab: "Descuentos RRLL",
            id: "menu_reporte_ing_descuento_rrll",
            formulario: "ReporteIngDescuentoRRLL",
            icon: "icon-listaTab", leaf: true,
            iconCls: "icon-reportes",
            cerrable: 1,
            cls: 'x-hidden'
            //disabled: true
        },{
            name: "Filtro1", //Items a Filtrar
            text: "Maestro Personal",
            tipo: "tab",
            tituloTab: "Maestro Personal",
            id: "menu_reporte_personal",
            formulario: "ReportePersonal",
            icon: "icon-listaTab", leaf: true,
            iconCls: "icon-reportes",
            cerrable: 1,
            cls: 'x-hidden'
            //disabled: true
        },{
            name: "Filtro1", //Items a Filtrar
            text: "Ausentismo",
            tipo: "tab",
            tituloTab: "Ausentismo",
            id: "menu_reporte_ausentismo",
            formulario: "ReporteAusentismo",
            icon: "icon-listaTab", leaf: true,
            iconCls: "icon-reportes",
            cerrable: 1,
            cls: 'x-hidden'
            //disabled: true
        }]
        
    },
    noCache: false,
    autoScroll: false
});
var storeMenuReporte = Ext.create('fcab.store.menu.reporte');

//Menu Sección
/*******************************************************************************
 Arbol de Ingresos
 *******************************************************************************/
Ext.define('fcab.menu.reporte', {
    extend: 'Ext.tree.Panel',
    store: storeMenuReporte,
    id: 'west-panel-reporte',
    itemId: 'west-panel-reporte',
    autoHeight: true,
    border: 0,
    animate: true,
    useArrows: true,
    rootVisible: false,
    containerScroll: false,
    listeners: {
        itemdblclick: function(s, r) {
            // Recojo los datos del Store (Nombre, Id, Icono)
            // Y los envio para generar el nuevo TAB
            var id = r.data.id.toString();
            var tituloTab = r.data.tituloTab.toString();
            var formulario = r.data.formulario.toString();
            var icono = r.data.icon.toString(); //http://fortawesome.github.io/Font-Awesome/icons/
            var cerrable = r.data.cerrable.toString();
            if (formulario === "") { //Id no permite campos null por eso string
                //No hacemos nada :)
            }
            else {
                addTab(id, tituloTab, icono, formulario, cerrable); //Generamos el nuevo TAB
            }

        }
    }
});
var menuReporte = Ext.create('fcab.menu.reporte', {
    scroll: false,
    viewConfig: {
        style: {overflow: 'auto', overflowX: 'hidden'}
    }
});
