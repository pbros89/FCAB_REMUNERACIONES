/**
  * Contenedor
  **/
 Ext.define("fcab.Container.MainIngresoPersonal", {
    extend: 'Ext.container.Container',
    xtype: 'MainIngresoPersonal',
    layout : 'fit',
    border: false,
    frame: false,
    style: "margin: 0px auto 0px auto;",
    constructor: function (config) {
        this.callParent([config]);

        ROL_ACCIONES.forEach(accion => {
            var estado = accion.ESTADO;
            var acc = accion.PFK_ACCION;
            var pantalla = accion.PFK_PANTALLA;
            console.log(acc + " " + estado);
            if(pantalla == 'INGRESO_PERSONAL' && estado == 'A'){
                switch(acc){
                    case 'DETALLE':
                        Ext.ComponentQuery.query('#MainIngresoPersonalGrilla #btnDetalle')[0].setHidden(false);
                        break;
                    case 'INGRESAR':
                        Ext.ComponentQuery.query('#MainIngresoPersonalGrilla #btnIngresar')[0].setHidden(false);
                        break;
                    case 'EDITAR':
                        Ext.ComponentQuery.query('#MainIngresoPersonalGrilla #btnEditar')[0].setHidden(false);
                        break;
                    case 'TERMINAR':
                        Ext.ComponentQuery.query('#MainIngresoPersonalGrilla #btnTerminar')[0].setHidden(false);
                        break;
                    case 'ELIMINAR':
                        Ext.ComponentQuery.query('#MainIngresoPersonalGrilla #btnEliminar')[0].setHidden(false);
                        break;
                    case 'ANULAR':
                        Ext.ComponentQuery.query('#MainIngresoPersonalGrilla #btnAnular')[0].setHidden(false);
                        break;
                    case 'DOCUMENTO':
                        Ext.ComponentQuery.query('#MainIngresoPersonalGrilla #btnDoc')[0].setHidden(false);
                        break;
                }
            }else if(pantalla == 'INGRESO_PERSONAL' && estado != 'A' && acc == 'EDITAR'){
                //SUSPENDE EVENTOS DE LA GRILLA (DOBLECLICK)
                Ext.ComponentQuery.query('#MainIngresoPersonalGrilla')[0].suspendEvents();
            }
        });

        cargarMainIngresoPersonal(null);
    },
    items: [{
    	xtype: 'MainIngresoPersonalGrilla'
    }]

});


Ext.define('fcab.Container.MainIngresoPersonal.Grilla', {
    extend: 'Ext.grid.Panel',
    xtype: 'MainIngresoPersonalGrilla',
    itemId: 'MainIngresoPersonalGrilla',
    store: storeCargarIngresarPersonal,
    columnLines: true,
    emptyText: 'Sin datos para mostrar',
    filtros: null,
    plugins: pluginFactory(),
    listeners: {
        itemdblclick: function( view, rec, node, index, e, options ) {
            clickEditarIngresoPersonal(view.grid, index);
        }
    },
    columns: [
        {
            text     : 'ID Empresa',
            sortable : true,
            dataIndex: 'COD_EMP',
            //align: 'center',
            hidden: true,
            width: 100
        },
        {
            text     : 'Estado',
            sortable : true,
            dataIndex: 'ESTADO',
            width: 150,
            hidden: false,
            renderer : function(value, meta) {
                if(value === 'EN ESPERA')
                {
                    meta.style = 'color:orange;';
                    return 'EN ESPERA';
                }else if(value === 'ANULADO')
                {
                    meta.style = 'color:red;';
                    return 'ANULADO';
                }else if(value === 'TERMINADO'){
                    meta.style = 'color:green;';
                    return 'TERMINADO';
                }else{
                    return value;
                }
            }
        },
        {
            text     : 'Empresa',
            sortable : true,
            dataIndex: 'NOM_EMP',
            //align: 'center',
            hidden: true,
            width: 100
        },
        {
            text     : 'ID',
            sortable : true,
            dataIndex: 'PK_ID',
            //align: 'center',
            width: 100
        },
        {
            text     : 'Periodo',
            sortable : true,
            dataIndex: 'PERIODO',
            //align: 'center',
            width: 100
        },
        {
            text     : 'Rut',
            sortable : true,
            dataIndex: 'RUT',
            //align: 'center',
            width: 100
        },
        {
            text     : 'DV',
            sortable : true,
            dataIndex: 'DV',
            //align: 'center',
            hidden: true,
            width: 100
        },
        {
            text     : 'Nombres',
            sortable : true,
            dataIndex: 'NOMBRES',
            //align: 'center',
            width: 200
        },
        {
            text     : 'Ape. Paterno',
            sortable : true,
            dataIndex: 'APE_PAT',
            //align: 'center',
            width: 150
        },
        {
            text     : 'Ape. Materno',
            sortable : true,
            dataIndex: 'APE_MAT',
            //align: 'center',
            width: 150
        },
        {
            text     : 'Fecha Nacimiento',
            sortable : true,
            dataIndex: 'FECHA_NACIMIENTO',
            //align: 'center',
            width: 100
        },
        {
            text     : 'Sexo',
            sortable : true,
            dataIndex: 'SEXO',
            //align: 'center',
            width: 100
        },
        {
            text     : 'Nacionalidad',
            sortable : true,
            dataIndex: 'NACIONALIDAD',
            //align: 'center',
            width: 150
        },
        {
            text     : 'Estado Civil',
            sortable : true,
            dataIndex: 'ESTADO_CIVIL',
            //align: 'center',
            width: 150
        },
        {
            text     : 'Nivel Educación',
            sortable : true,
            dataIndex: 'NIVEL_EDUCACION',
            width: 150
        },

        {
            text     : 'Calle',
            sortable : true,
            dataIndex: 'CALLE',
            //align: 'center',
            width: 200
        },
        {
            text     : 'Numero',
            sortable : true,
            dataIndex: 'NUMERO',
            //align: 'center',
            width: 100
        },
        {
            text     : 'Nº Depto',
            sortable : true,
            dataIndex: 'DEPARTAMENTO',
            //align: 'center',
            width: 100
        },
        {
            text     : 'Comuna',
            sortable : true,
            dataIndex: 'COMUNA',
            //align: 'center',
            width: 150
        },
        {
            text     : 'Ciudad',
            sortable : true,
            dataIndex: 'CIUDAD',
            //align: 'center',
            width: 150
        },
        {
            text     : 'Telefono',
            sortable : true,
            dataIndex: 'TELEFONO',
            //align: 'center',
            width: 100
        },
        {
            text     : 'Telefono2',
            sortable : true,
            dataIndex: 'TELEFONO2',
            //align: 'center',
            width: 100
        },
        
        
        {
            text     : 'Correo',
            sortable : true,
            dataIndex: 'CORREO',
            //align: 'center',
            width: 200
        },
        {
            text     : 'Gerencia',
            sortable : true,
            dataIndex: 'NOM_GERENCIA',
            //align: 'center',
            width: 100
        },
        {
            text     : 'Departamento',
            sortable : true,
            dataIndex: 'NOM_DEPARTAMENTO',
            width: 200
        },
        {
            text     : 'ID CC',
            sortable : true,
            dataIndex: 'COD_CC',
            //align: 'center',
            width: 100
        },
        {
            text     : 'Nombre CC',
            sortable : true,
            dataIndex: 'NOM_CC',
            width: 200
        },
        {
            text     : 'ID Cargo',
            sortable : true,
            dataIndex: 'COD_CARGO',
            width: 100
        },

        {
            text     : 'Nombre Cargo',
            sortable : true,
            dataIndex: 'NOM_CARGO',
            width: 200
        },
        {
            text     : 'Rol Cargo',
            sortable : true,
            dataIndex: 'ROL_CARGO',
            width: 100
        },
        {
            text     : 'INE',
            sortable : true,
            dataIndex: 'INE',
            width: 200
        },
        {
            text     : 'Tipo Contrato',
            sortable : true,
            dataIndex: 'TIPO_CONTRATO',
            fidth: 200
        },
        {
            text     : 'Jornada',
            sortable : true,
            dataIndex: 'JORNADA',
            fidth: 200
        },
        {
            text     : 'Fecha Ingreso',
            sortable : true,
            dataIndex: 'FECHA_INGRESO',
            width: 150
        },
        {
            text     : 'Fecha Vencimiento',
            sortable : true,
            dataIndex: 'FECHA_VENCIMIENTO',
            width: 150
        },

        {
            text     : 'Rut Jefatura',
            sortable : true,
            dataIndex: 'RUT_JEFE',
            width: 100
        },

        {
            text     : 'DV Jefatura',
            sortable : true,
            dataIndex: 'DV_JEFE',
            width: 100
        },

        {
            text     : 'Sueldo Base',
            sortable : true,
            dataIndex: 'SUELDO_BASE',
            width: 150
        },
        {
            text     : 'Renta Contrato',
            sortable : true,
            dataIndex: 'RENTA_CONTRATO',
            width: 150
        },
        {
            text     : 'AFP',
            sortable : true,
            dataIndex: 'AFP',
            width: 200
        },
        {
            text     : 'Salud',
            sortable : true,
            dataIndex: 'SALUD',
            width: 200
        },
        {
            text     : 'Plan Salud',
            sortable : true,
            dataIndex: 'PLAN_SALUD',
            width: 150
        },
        {
            text     : 'Formato Plan Salud',
            sortable : true,
            dataIndex: 'FORMATO_PLAN_SALUD',
            width: 100
        },
        {
            text     : 'Plan Colectivo Salud',
            sortable : true,
            dataIndex: 'PLAN_COLECTIVO_SALUD',
            width: 150
        },
        {
            text     : 'Formato Plan Colectivo Salud',
            sortable : true,
            dataIndex: 'FORMATO_PLAN_COLECTIVO_SALUD',
            width: 100
        },
        {
            text     : 'Institución APV',
            sortable : true,
            dataIndex: 'INSTITUCION_APV',
            width: 200
        },
        {
            text     : 'Regimen APV',
            sortable : true,
            dataIndex: 'REGIMEN_APV',
            width: 200
        },
        {
            text     : 'Monto APV',
            sortable : true,
            dataIndex: 'MONTO_APV',
            width: 150
        },
        {
            text     : 'Forma de Pago',
            sortable : true,
            dataIndex: 'FORMA_PAGO',
            width: 200
        },
        {
            text     : 'Banco',
            sortable : true,
            dataIndex: 'BANCO',
            width: 200
        },
        {
            text     : 'Cuenta',
            sortable : true,
            dataIndex: 'CUENTA',
            width: 150
        },
        {
            text     : 'Creador',
            sortable : true,
            dataIndex: 'USR_CREADOR',
            width: 150
        },
        {
            text     : 'Fecha Creación',
            sortable : true,
            dataIndex: 'FECHA_CREACION',
            width: 150
        },
        {
            text     : 'Modifico',
            sortable : true,
            dataIndex: 'USR_MODIFICO',
            width: 150
        },
        {
            text     : 'Fecha Modifico',
            sortable : true,
            dataIndex: 'FECHA_MODIFICO',
            width: 150
        },
        {
            text     : 'Correo Emp',
            sortable : true,
            dataIndex: 'CORREO_EMP',
            width: 150,
            hidden: true
        },
        {
            text     : 'ID Lugar Trabajo',
            sortable : true,
            dataIndex: 'COD_LUGAR_TRABAJO',
            width: 150,
            hidden: true
        },
        {
            text     : 'Lugar Trabajo',
            sortable : true,
            dataIndex: 'NOM_LUGAR_TRABAJO',
            width: 150,
            hidden: true
        },
        {
            text     : 'ID AFP',
            sortable : true,
            dataIndex: 'COD_AFP',
            width: 100,
            hidden: true
        },

        {
            text     : 'ID Salud',
            sortable : true,
            dataIndex: 'COD_SALUD',
            width:100,
            hidden: true
        },
        {
            text     : 'ID Banco',
            sortable : true,
            dataIndex: 'COD_BANCO',
            width:100,
            hidden: true
        },
        {
            text     : 'ID Estado Civil',
            sortable : true,
            dataIndex: 'COD_ESTADO_CIVIL',
            width:100,
            hidden: true
        },
        {
            text     : 'ID Jornada',
            sortable : true,
            dataIndex: 'COD_JORNADA',
            width:100,
            hidden: true
        },
        {
            text     : 'ID INE',
            sortable : true,
            dataIndex: 'COD_INE',
            width:100,
            hidden: true
        },
        {
            text     : 'ID Sexo',
            sortable : true,
            dataIndex: 'COD_SEXO',
            width:100,
            hidden: true
        },
        {
            text     : 'ID Institución APV',
            sortable : true,
            dataIndex: 'COD_INSTITUCION_APV',
            width:100,
            hidden: true
        },
        {
            text     : 'ID Regimen APV',
            sortable : true,
            dataIndex: 'COD_REGIMEN_APV',
            width:100,
            hidden: true
        },
        {
            text     : 'ID Forma Pago',
            sortable : true,
            dataIndex: 'COD_FORMA_PAGO',
            width:100,
            hidden: true
        },
        {
            text     : 'ID Nivel Educación',
            sortable : true,
            dataIndex: 'COD_NIVEL_EDUCACION',
            width:100,
            hidden: true
        },
        {
            text     : 'ID Nacionalidad',
            sortable : true,
            dataIndex: 'COD_NACIONALIDAD',
            width:100,
            hidden: true
        },
        {
            text     : 'ID Comuna',
            sortable : true,
            dataIndex: 'COD_COMUNA',
            width:100,
            hidden: true
        },
        {
            text     : 'ID Ciudad',
            sortable : true,
            dataIndex: 'COD_CIUDAD',
            width:100,
            hidden: true
        },
        {
            text     : 'ID Invalidez',
            sortable : true,
            dataIndex: 'COD_INVALIDEZ',
            width:100,
            hidden: true
        },
        {
            text     : 'Invalidez',
            sortable : true,
            dataIndex: 'NOM_INVALIDEZ',
            width:100,
            hidden: true
        },
        {
            text     : 'Origen',
            sortable : true,
            dataIndex: 'SISTEMA_ORIGEN',
            width: 150,
            hidden: false
        },
        {
            text     : 'Codigo Origen',
            sortable : true,
            dataIndex: 'COD_ORIGEN',
            width: 100,
            hidden: true
        },
        
    ],
    dockedItems: [{
        xtype: 'toolbar',
        items: [{
            text: 'Detalle',
            itemId: 'btnDetalle',
            hidden: true,
            tooltip: 'Ver Detalle',
            iconCls: 'icon-form-detail',
            handler: function () {
                var grid = this.up('grid'); //Recuperamos la grilla
                try { //Obtenemos el index del item seleccionado
                    var rowIndex = grid.getSelectionModel().getCurrentPosition().rowIdx;
                    clickDetalleIngresoPersonal(grid, rowIndex);
                } catch (e) {
                    msg("Nada seleccionado", "Por favor, seleccione el item que desea ver el Detalle", Ext.Msg.ERROR, Ext.Msg.OK);
                    console.debug(e);
                }
            }
        },{
            text: 'Ingresar',
            itemId: 'btnIngresar',
            hidden: true,
            tooltip: 'Ingresar nuevo item',
            iconCls: 'icon-form-add',
            handler: function () {
                var grid = this.up('grid'); //Recuperamos la grilla
                clickCrearIngresoPersonal(grid);
            }
        }, {
            text: 'Editar',
            itemId: 'btnEditar',
            hidden: true,
            tooltip: 'Editar Item seleccionado',
            iconCls: 'icon-form-edit',
            handler: function () {
                var grid = this.up('grid'); //Recuperamos la grilla
                try { //Obtenemos el index del item seleccionado
                    var rowIndex = grid.getSelectionModel().getCurrentPosition().rowIdx;
                    clickEditarIngresoPersonal(grid, rowIndex);
                } catch (e) {
                    msg("Nada seleccionado", "Por favor, seleccione el item que desea Editar", Ext.Msg.ERROR, Ext.Msg.OK);
                    console.debug(e);
                }
            }

        }, {
            text: 'Terminar',
            itemId: 'btnTerminar',
            hidden: true,
            tooltip: 'Terminar Item seleccionado',
            iconCls: 'icon-form-ok',
            handler: function () {
                var grid = this.up('grid'); //Recuperamos la grilla
                try { //Obtenemos el index del item seleccionado
                    var rowIndex = grid.getSelectionModel().getCurrentPosition().rowIdx;
                    clickTerminarIngresoPersonal(grid, rowIndex);
                } catch (e) {
                    msg("Nada seleccionado", "Por favor, seleccione el item que desea terminar", Ext.Msg.ERROR, Ext.Msg.OK);
                    console.debug(e);
                }
            }
        },{
            text: 'Eliminar',
            itemId: 'btnEliminar',
            hidden: true,
            tooltip: 'Eliminar Item seleccionado',
            iconCls: 'icon-form-delete',
            handler: function () {
                var grid = this.up('grid'); //Recuperamos la grilla
                try { //Obtenemos el index del item seleccionado
                    var rowIndex = grid.getSelectionModel().getCurrentPosition().rowIdx;
                    clickEliminarIngresoPersonal(grid, rowIndex);
                } catch (e) {
                    msg("Nada seleccionado", "Por favor, seleccione el item que desea eliminar", Ext.Msg.ERROR, Ext.Msg.OK);
                    console.debug(e);
                }
            }

        },{
            text: 'Anular',
            itemId: 'btnAnular',
            hidden: true,
            tooltip: 'Anular Item seleccionado',
            iconCls: 'icon-form-suspend',
            handler: function () {
                var grid = this.up('grid'); //Recuperamos la grilla
                try { //Obtenemos el index del item seleccionado
                    var rowIndex = grid.getSelectionModel().getCurrentPosition().rowIdx;
                    clickAnularIngresoPersonal(grid, rowIndex);
                } catch (e) {
                    msg("Nada seleccionado", "Por favor, seleccione el item que desea anular", Ext.Msg.ERROR, Ext.Msg.OK);
                    console.debug(e);
                }
            }

        },{
            text: "Documentos",
            itemId: "btnDoc",
            hidden: true,
            tooltip: "Ver documentos",
            iconCls: "icon-form-folder",
            handler: function() {
              var grid = this.up("grid"); //Recuperamos la grilla
              try {
                //Obtenemos el index del item seleccionado
                var rowIndex = grid.getSelectionModel().getCurrentPosition()
                  .rowIdx;
                var rec = grid.getStore();
                var recRow = rec.getAt(rowIndex);
                if (ROL == "ADMIN" || ROL == "SUPER_ADMIN" || recRow.data.ESTADO == 'EN ESPERA') 
                {
                  modalAdjuntosAdmin(
                    recRow.data.PK_ID,
                    "ingreso_personal",
                    "Ingreso Personal " + recRow.data.PK_ID
                  );
                } else {
                  modalAdjuntosBasic(
                    recRow.data.PK_ID,
                    "ingreso_personal",
                    "Ingreso Personal " + recRow.data.PK_ID
                  );
                }
              } catch (e) {
                msg(
                  "Nada seleccionado",
                  "Por favor, seleccione el item",
                  Ext.Msg.ERROR,
                  Ext.Msg.OK
                );
                console.debug(e);
              }
            }
        },{
            text: 'Refrescar',
            tooltip: 'Refrescar Pantalla',
            iconCls: 'icon-form-refresh',
            handler: function () {
                var grid = this.up('grid');
                cargarMainIngresoPersonal(grid.filtros);
                
            }

        }, {
            text: 'Exportar',
            tooltip: 'Exportar xls',
            iconCls: 'icon-form-download',
            handler: function () {
                this.ownerCt.ownerCt.saveDocumentAs({
                  type: 'excel',
                  title: "Ingresar Personal " + NOM_EMPRESA,
                  fileName: 'Ingresar Personal '+NOM_EMPRESA+' ' + new Date().getTime() +'.xls'
                });
            }

        },{
            text: 'Filtrar',
            tooltip: 'Filtrar Tabla',
            iconCls: 'icon-form-filter',
            handler: function () {
                var grid = this.up('grid'); //Recuperamos la grilla
                try {
                    clickFiltrarIngresoPersonal(grid);
                } catch (e) {
                    //msg("Nada seleccionado", "Por favor, seleccione el item que desea Editar", Ext.Msg.ERROR, Ext.Msg.OK);
                    console.debug(e);
                }
            }

        }, {
            text: 'Limpiar',
            itemId: 'btnLimFiltro',
            tooltip: 'Limpiar Filtros',
            iconCls: 'icon-form-filter-del',
            hidden: true,
            width: 120,
            handler: function () {
                var grid = this.up('grid');
                Ext.ComponentQuery.query('#MainIngresoPersonalGrilla #btnLimFiltro')[0].setHidden(true);
                grid.filtros = null;
                cargarMainIngresoPersonal(null);
            }
        }]
    }],
    height: Ext.getBody().getViewSize().height - 150, 
    width : '100%',
    title: 'Ingreso de Personal ('+NOM_EMPRESA+')',
});



var clickCrearIngresoPersonal = function (grid) {
    var rec = grid.getStore();
    ventanaDinamica("CrearIngresoPersonal", "Ingresar Personal ("+NOM_EMPRESA+")", "1000", "", "CrearIngresoPersonal", 1, 0, rec);
};

var clickDetalleIngresoPersonal = function (grid, rowIndex) {
    var rec = grid.getStore();
    var recRow = rec.getAt(rowIndex);
    var estado = recRow.data.ESTADO;
    var origen = recRow.data.SISTEMA_ORIGEN != null ? " - " +recRow.data.SISTEMA_ORIGEN :"";
    ventanaDinamica("DetalleIngresoPersonal", "Detalle Ingreso Personal ("+NOM_EMPRESA+") - "+estado + origen, "1000", "", "DetalleIngresoPersonal", 1, 0, rec, recRow);
};

var clickEditarIngresoPersonal= function (grid, rowIndex) {
    var rec = grid.getStore();
    var recRow = rec.getAt(rowIndex);
    var estado = recRow.data.ESTADO;
    var origen = recRow.data.SISTEMA_ORIGEN != null ? " - " +recRow.data.SISTEMA_ORIGEN :"";
    ventanaDinamica("EditarIngresoPersonal", "Editar Ingreso Personal ("+NOM_EMPRESA+") - " + estado + origen, "1000", "", "EditarIngresoPersonal", 1, 0, rec, recRow);
};

var clickTerminarIngresoPersonal = function(grid, rowIndex) {
    var rec = grid.getStore();
    var recRow = rec.getAt(rowIndex);
    Ext.MessageBox.confirm('Terminar Ingreso Personal', '¿Esta seguro de terminar el ingreso?', function(btn) {
        if (btn === 'yes') {
                storeCambiarEstadoIngresoPersonal.load({
                    params:{
                        p_ingreso: recRow.data.PK_ID,
                        p_estado: 'TERMINADO',
                        p_usuario: NOMBRE
                    },
                    callback: function(records, operation, success) {
                        if(records != null) {
                            if(records[0].data.r_msg == 'OK'){
                                showToast('Ingreso terminado correctamente.');
                                cargarMainIngresoPersonal(null);
                                
                            }else{
                                Ext.MessageBox.show({
                                    title: 'ADVERTENCIA',
                                    msg: records[0].data.r_msg,
                                    icon: Ext.MessageBox.WARNING,
                                    buttons: Ext.Msg.OK
                                });
                            }
                        }
                        
                    }
                });
            
        }
    });
}

var clickEliminarIngresoPersonal= function (grid, rowIndex) {
    var rec = grid.getStore();
    var recRow = rec.getAt(rowIndex);
    Ext.MessageBox.confirm('Eliminar Ingreso Personal', '¿Esta seguro de eliminar el ingreso?', function(btn) {
        if (btn === 'yes') {
            storeEliminarIngresoPersonal.load({
                params : {
                    p_ingreso: recRow.data.PK_ID,
                    p_usuario: NOMBRE
                },
                callback: function(records, operation, success) {
                    if(records != null) {
                        if(records[0].data.r_msg == 'OK'){
                            showToast('Ingreso eliminado correctamente.');
                            cargarMainIngresoPersonal(null);
                        }else{
                            Ext.MessageBox.show({
                                title: 'ADVERTENCIA',
                                msg: records[0].data.r_msg,
                                icon: Ext.MessageBox.WARNING,
                                buttons: Ext.Msg.OK
                            });
                        }
                    }
                    
                }
            });
        }
    });
};


var clickFiltrarIngresoPersonal = function (grid) {
    var rec = grid.getStore();
    var filtros = grid.filtros;
    ventanaDinamica("MainIngresoPersonalFiltro", "Filtrar ("+NOM_EMPRESA+")", "500", "", "MainIngresoPersonalFiltro", 1, 0, grid, filtros);
    
};

var cargarMainIngresoPersonal = function(filtros){

    if(filtros !== null)
    {
        storeCargarIngresarPersonal.load({
            params:{
                p_cod_emp : EMPRESA,
                p_rut : filtros.p_rut,
                p_fec1: filtros.p_fec1,
                p_fec2: filtros.p_fec2
            }
        });
        
    }else{
        Ext.ComponentQuery.query('#MainIngresoPersonalGrilla #btnLimFiltro')[0].setHidden(true);
        Ext.ComponentQuery.query('#MainIngresoPersonalGrilla')[0].filtros = null;
        storeCargarIngresarPersonal.load({
            params:{
                p_cod_emp : EMPRESA,
            }
        });
    }
};

var clickAnularIngresoPersonal= function(grid, rowIndex) {
    var rec = grid.getStore();
    var recRow = rec.getAt(rowIndex);
    Ext.MessageBox.confirm(
        'Anular Ingreso de Personal', 
        '¿Esta seguro de anular el ingreso de personal?<br>'+
        '<b>-Los registros anulados no seran considerados para reportes.<br>'+
        '-El trabajador será quedara como no vigente con motivo "INGRESO_ANULADO".</b>', 
    function(btn) {
        if (btn === 'yes') {
            storeAnularIngresoPersonal.load({
                params:{
                    p_cod: recRow.data.PK_ID,
                    p_obs: '',
                    p_usuario: NOMBRE
                },
                callback: function(records, operation, success) {
                    if(records != null) {
                        if(records[0].data.r_msg == 'OK'){
                            showToast('Ingreso anulado correctamente.');
                            cargarMainIngresoPersonal(null);
                            
                        }else{
                            Ext.MessageBox.show({
                                title: 'ADVERTENCIA',
                                msg: records[0].data.r_msg,
                                icon: Ext.MessageBox.WARNING,
                                buttons: Ext.Msg.OK
                            });
                        }
                    }
                    
                }
            });
            
        }
    });
};
