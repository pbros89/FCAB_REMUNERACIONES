/**
 * Contenedor
 **/
Ext.define("fcab.Container.WFModificarFichaInicio", {
  extend: "Ext.container.Container",
  xtype: "WFModificarFichaInicio",
  layout: "fit",
  border: false,
  frame: false,
  style: "margin: 0px auto 0px auto;",
  constructor: function (config) {
    this.callParent([config]);

    storeCargarRolesWFUsuario.load({
      params: {
        p_usuario: NOMBRE,
        p_cod_emp: EMPRESA
      }
    });
    cargarWFModificarFicha(null);
  },
  items: [
    {
      xtype: "WFModificarFichaInicioGrilla",
    },
  ],
});

Ext.define("fcab.Container.WF.ModificarFicha.Inicio.Grilla", {
  extend: "Ext.grid.Panel",
  xtype: "WFModificarFichaInicioGrilla",
  itemId: "WFModificarFichaInicioGrilla",
  store: storeCagarSolicitudesCambioFicha,
  title: "Solicitud Modificar Ficha de Personal (" + NOM_EMPRESA + ")",
  viewConfig: {
    stripeRows: true,
  },
  columnLines: true,
  emptyText: "Sin datos para mostrar",
  filtros: null,
  plugins: pluginFactory(),
  height: Ext.getBody().getViewSize().height - 130,
  width: "100%",
  listeners: {
    itemdblclick: function (view, rec, node, index, e, options) {
      clickDetalleWFModificarFicha(view.grid, rowIndex);
    },
  },
  columns: [
    {
      text: "Estado",
      sortable: true,
      dataIndex: "ESTADO",
      width: 120,
      renderer: function (value, meta) {
        switch (value) {
          case "ACTIVO":
            meta.style = "color:orange;";
            break;

          case "RECHAZADO":
            meta.style = "color:red;";
            break;

          case "APROBADO":
            meta.style = "color:green;";
            break;

          default:
            meta.style = "color:blue;";
            break;
        }

        return value;
      },
    },
    {
      text: "ID",
      sortable: true,
      dataIndex: "PK_ID",
      hidden: false,
      width: 100,
    },
    {
      text: "Periodo",
      sortable: true,
      dataIndex: "PERIODO",
      hidden: false,
      width: 100,
    },
    {
      text: "ID Personal",
      sortable: true,
      dataIndex: "FK_PERSONAL",
      hidden: true,
      width: 100,
    },
    {
      text: "ID Ceco Solicitud",
      sortable: true,
      dataIndex: "COD_CC_SOL",
      width: 100,
      hidden: true,
    },
    {
      text: "ID Empresa",
      sortable: true,
      dataIndex: "COD_EMP",
      hidden: true,
      width: 100,
    },
    {
      text: "Rut",
      sortable: true,
      dataIndex: "RUT",
      hidden: false,
      width: 120,
    },
    {
      text: "Nombre",
      sortable: true,
      dataIndex: "NOMBRE",
      hidden: false,
      width: 200,
    },
    {
      text: "Usuario Creador",
      sortable: true,
      dataIndex: "USR_CREADOR",
      width: 150,
    },
    {
      text: "Rol Creador",
      sortable: true,
      dataIndex: "ROL_CREADOR",
      width: 150,
    },
    {
      text: "Fecha Creación",
      sortable: true,
      dataIndex: "FECHA_CREACION",
      width: 150,
    },
    {
      text: "Dias Espera",
      sortable: true,
      dataIndex: "DIAS_INAC",
      align: 'center',
      width: 100,
      renderer: function (value, meta) {
        var number = Number(value);
        if(number >= 2) {
          meta.style = "color:red;";
        }else{
          meta.style = "color:green;";
        }
        return value;
      },
    },
    {
      text: "Caso",
      sortable: true,
      dataIndex: "FK_CASO",
      hidden: false,
      width: 150,
    },
    {
      text: "Nombre WF",
      sortable: true,
      dataIndex: "FK_NOMBRE_WF",
      hidden: true,
      width: 150,
    },
    {
      text: "Total Etapas",
      sortable: true,
      dataIndex: "TOTAL_ETAPA",
      align: 'center',
      width: 100,
    },
    {
      text: "En Espera",
      sortable: true,
      dataIndex: "EN_ESPERA_ETAPA",
      align: 'center',
      width: 100,
    },
    {
      text: "Aprobadas",
      sortable: true,
      dataIndex: "APROBADO_ETAPA",
      align: 'center',
      width: 100,
    },
    {
      text: "Rechazadas",
      sortable: true,
      dataIndex: "RECHAZO_ETAPA",
      align: 'center',
      width: 100,
    },
    {
      text: "ID Gerencia",
      sortable: true,
      dataIndex: "COD_GERENCIA",
      hidden: true,
      width: 100,
    },
    {
      text: "Gerencia",
      sortable: true,
      dataIndex: "NOM_GERENCIA",
      hidden: true,
      width: 100,
    },
    {
      text: "ID Departamento",
      sortable: true,
      dataIndex: "COD_DEPARTAMENTO",
      hidden: true,
      width: 100,
    },
    {
      text: "Departamento",
      sortable: true,
      dataIndex: "NOM_DEPARTAMENTO",
      hidden: true,
      width: 100,
    },
    {
      text: "ID Ceco",
      sortable: true,
      dataIndex: "COD_CC",
      hidden: true,
      width: 100,
    },
    {
      text: "Ceco",
      sortable: true,
      dataIndex: "NOM_CC",
      hidden: true,
      width: 100,
    },
    {
      text: "ID Cargo",
      sortable: true,
      dataIndex: "COD_CARGO",
      hidden: true,
      width: 100,
    },
    {
      text: "Cargo",
      sortable: true,
      dataIndex: "NOM_CARGO",
      hidden: true,
      width: 100,
    },

    {
      text: "ID Plazo",
      sortable: true,
      dataIndex: "COD_PLAZO",
      hidden: true,
      width: 100,
    },
    {
      text: "Plazo",
      sortable: true,
      dataIndex: "NOM_PLAZO",
      hidden: true,
      width: 100,
    },
    {
      text: "ID Jornada",
      sortable: true,
      dataIndex: "COD_JORNADA",
      hidden: true,
      width: 100,
    },
    {
      text: "Jornada",
      sortable: true,
      dataIndex: "NOM_JORNADA",
      hidden: true,
      width: 100,
    },
    {
      text: "ID Lugar",
      sortable: true,
      dataIndex: "COD_LUGAR",
      hidden: true,
      width: 100,
    },
    {
      text: "Lugar",
      sortable: true,
      dataIndex: "NOM_LUGAR",
      hidden: true,
      width: 100,
    },
    {
      text: "Bonos",
      sortable: true,
      dataIndex: "DESC_BONOS",
      hidden: true,
      width: 100,
    },
    {
      text: "Sueldo",
      sortable: true,
      dataIndex: "SUELDO",
      hidden: true,
      width: 100,
    },
    {
      text: "Rut Jefe",
      sortable: true,
      dataIndex: "RUT_JEFE",
      hidden: true,
      width: 100,
    },
    {
      text: "Nombre Jefe",
      sortable: true,
      dataIndex: "NOMBRE_JEFE",
      hidden: true,
      width: 100,
    },

    {
      text: "Comentario Cargo",
      sortable: true,
      dataIndex: "OBS_CARGO",
      hidden: true,
      width: 150,
    },
    {
      text: "Comentario Ceco",
      sortable: true,
      dataIndex: "OBS_CC",
      hidden: true,
      width: 150,
    },
    {
      text: "Comentario Plazo",
      sortable: true,
      dataIndex: "OBS_PLAZO",
      hidden: true,
      width: 150,
    },
    {
      text: "Comentario Jornada",
      sortable: true,
      dataIndex: "OBS_JORNADA",
      hidden: true,
      width: 150,
    },
    {
      text: "Comentario Lugar",
      sortable: true,
      dataIndex: "OBS_LUGAR",
      hidden: true,
      width: 100,
    },
    {
      text: "Comentario Sueldo",
      sortable: true,
      dataIndex: "OBS_SUELDO",
      hidden: true,
      width: 100,
    },
    {
      text: "Tras. ID Cargo",
      sortable: true,
      dataIndex: "TRAS_COD_CARGO",
      hidden: true,
      width: 100,
    },
    {
      text: "Tras. Cargo",
      sortable: true,
      dataIndex: "TRAS_NOM_CARGO",
      hidden: true,
      width: 100,
    },
    {
      text: "Tras. Comentario Cargo",
      sortable: true,
      dataIndex: "OBS_TRAS_CARGO",
      hidden: true,
      width: 150,
    },
    {
      text: "Tras. Fecha Inicio",
      sortable: true,
      dataIndex: "TRAS_INI",
      hidden: true,
      width: 100,
    },
    {
      text: "Tras. Fecha Fin",
      sortable: true,
      dataIndex: "TRAS_FIN",
      hidden: true,
      width: 100,
    },
    {
      text: "Tras. Tiene Bono?",
      sortable: true,
      dataIndex: "TRAS_TIENE_BONO",
      hidden: true,
      width: 100,
    },
    {
      text: "Tras. Bono",
      sortable: true,
      dataIndex: "TRAS_BONO",
      hidden: true,
      width: 100,
    },
    {
      text: "Motivo de Cambio",
      sortable: true,
      dataIndex: "MOTIVO_CAMBIO",
      hidden: true,
      width: 150,
    },
    

    {
      text: "ID Cargo Actual",
      sortable: true,
      dataIndex: "COD_CARGO_OLD",
      hidden: true,
      width: 150,
    },
    {
      text: "Cargo Actual",
      sortable: true,
      dataIndex: "NOM_CARGO_OLD",
      hidden: true,
      width: 150,
    },
    {
      text: "ID Ceco Actual",
      sortable: true,
      dataIndex: "COD_CC_OLD",
      hidden: true,
      width: 150,
    },
    {
      text: "Ceco Actual",
      sortable: true,
      dataIndex: "NOM_CC_OLD",
      hidden: true,
      width: 150,
    },
    {
      text: "ID Gerencia Actual",
      sortable: true,
      dataIndex: "COD_GERENCIA_OLD",
      hidden: true,
      width: 150,
    },
    {
      text: "Gerencia Actual",
      sortable: true,
      dataIndex: "NOM_GERENCIA_OLD",
      hidden: true,
      width: 150,
    },
    {
      text: "ID Departamento Actual",
      sortable: true,
      dataIndex: "COD_DEPARTAMENTO_OLD",
      hidden: true,
      width: 150,
    },
    {
      text: "Departamento Actual",
      sortable: true,
      dataIndex: "NOM_DEPARTAMENTO_OLD",
      hidden: true,
      width: 150,
    },
    {
      text: "ID Plazo Actual",
      sortable: true,
      dataIndex: "COD_PLAZO_OLD",
      hidden: true,
      width: 150,
    },
    {
      text: "Plazo Actual",
      sortable: true,
      dataIndex: "NOM_PLAZO_OLD",
      hidden: true,
      width: 150,
    },
    {
      text: "ID Jornada Actual",
      sortable: true,
      dataIndex: "COD_JORNADA_OLD",
      hidden: true,
      width: 150,
    },
    {
      text: "Jornada Actual",
      sortable: true,
      dataIndex: "NOM_JORNADA_OLD",
      hidden: true,
      width: 150,
    },
    {
      text: "ID Lugar Actual",
      sortable: true,
      dataIndex: "COD_LUGAR_OLD",
      hidden: true,
      width: 150,
    },
    {
      text: "Lugar Actual",
      sortable: true,
      dataIndex: "NOM_LUGAR_OLD",
      hidden: true,
      width: 150,
    },
    {
      text: "Rut Jefe Actual",
      sortable: true,
      dataIndex: "RUT_JEFE_OLD",
      hidden: true,
      width: 150,
    },
    {
      text: "Nombre Jefe Actual",
      sortable: true,
      dataIndex: "NOMBRE_JEFE_OLD",
      hidden: true,
      width: 150,
    },
    {
      text: "Sueldo Actual",
      sortable: true,
      dataIndex: "SUELDO_OLD",
      hidden: true,
      width: 150,
    },
  ],
  dockedItems: [
    {
      xtype: "toolbar",
      items: [
        {
            xtype: "combo",
            name: "cbRol",
            itemId: "cbRol",
            displayField: "NOMBRE",
            valueField: "PK_ROL_WF",
            store: storeCargarRolesWFUsuario,
            fieldLabel: "Rol",
            labelAlign: "left",
            queryMode: "local",
            triggerAction: "all",
            editable: false,
            typeAhead: true,
            selectOnFocus: true,
            forceSelection: true,
            allowBlank: true,
            readOnly: false,
          },
        {
          text: "Ingresar",
          itemId: "btnIngresar",
          hidden: false,
          tooltip: "Ingresar nuevo item",
          iconCls: "icon-form-add",
          handler: function () {
            var grid = this.up("grid"); //Recuperamos la grilla
            clickCrearWFModificarFicha(grid);
          },
        },
        {
          text: "Detalle",
          itemId: "btnDetalle",
          hidden: false,
          tooltip: "Ver Detalle",
          iconCls: "icon-form-detail",
          handler: function () {
            var grid = this.up("grid"); //Recuperamos la grilla
            try {
              //Obtenemos el index del item seleccionado
              var rowIndex = grid.getSelectionModel().getCurrentPosition()
                .rowIdx;
              clickDetalleWFModificarFicha(grid, rowIndex);
            } catch (e) {
              console.log(e);
              msg(
                "Nada seleccionado",
                "Por favor, seleccione el item que desea ver el Detalle",
                Ext.Msg.ERROR,
                Ext.Msg.OK
              );
              
            }
          },
        },
        {
          text: 'Anular',
          itemId: 'btnAnular',
          hidden: false,
          tooltip: 'Anular Item seleccionado',
          iconCls: 'icon-form-suspend',
          handler: function () {
              var grid = this.up('grid'); //Recuperamos la grilla
              try { //Obtenemos el index del item seleccionado
                  var rowIndex = grid.getSelectionModel().getCurrentPosition().rowIdx;
                  clickAnularWFModificarFicha(grid, rowIndex);
              } catch (e) {
                  msg("Nada seleccionado", "Por favor, seleccione el item que desea anular", Ext.Msg.ERROR, Ext.Msg.OK);
                  console.debug(e);
              }
          }

        },
        {
            text: "Documentos",
            itemId: "btnDoc",
            hidden: false,
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
                if (recRow.data.ESTADO == 'ACTIVO') 
                {
                  modalAdjuntosAdmin(
                    recRow.data.PK_ID,
                    "cambio_ficha_wf",
                    "Solicitud " + recRow.data.PK_ID
                  );
                } else {
                  modalAdjuntosBasic(
                    recRow.data.PK_ID,
                    "cambio_ficha_wf",
                    "Solicitud " + recRow.data.PK_ID
                  );
                }
              } catch (e) {
                msg(
                  "Nada seleccionado",
                  "Por favor, seleccione el item",
                  Ext.Msg.WARNING,
                  Ext.Msg.OK
                );
                console.debug(e);
              }
            }
        },
        {
          text: "Refrescar",
          tooltip: "Refrescar Pantalla",
          iconCls: "icon-form-refresh",
          handler: function () {
            var grid = this.up("grid");
            cargarWFModificarFicha(grid.filtros);
          },
        },
        {
          text: "Exportar",
          tooltip: "Exportar xls",
          iconCls: "icon-form-download",
          handler: function () {
            this.ownerCt.ownerCt.saveDocumentAs({
              type: "excel",
              title: "solicitudes_" + NOM_EMPRESA,
              fileName:
                "sol_cambio_ficha_" +
                NOM_EMPRESA +
                "_" +
                new Date().getTime() +
                ".xls",
            });
          },
        },
        {
          text: "Filtrar",
          tooltip: "Filtrar Tabla",
          iconCls: "icon-form-filter",
          handler: function () {
            var grid = this.up("grid"); //Recuperamos la grilla
            try {
              clickFiltrarWFModificarFicha(grid);
            } catch (e) {
              //msg("Nada seleccionado", "Por favor, seleccione el item que desea Editar", Ext.Msg.ERROR, Ext.Msg.OK);
              console.debug(e);
            }
          },
        },
        {
          text: "Limpiar",
          itemId: "btnLimFiltro",
          tooltip: "Limpiar Filtros",
          iconCls: "icon-form-filter-del",
          hidden: true,
          width: 120,
          handler: function () {
            var grid = this.up("grid");
            Ext.ComponentQuery.query(
              "#WFModificarFichaInicioGrilla #btnLimFiltro"
            )[0].setHidden(true);
            grid.filtros = null;
            cargarWFModificarFicha(null);
          },
        },
      ],
    },
  ],
});

var clickCrearWFModificarFicha = function (grid) {  
  var width = Ext.getBody().getViewSize().width > 1300 ? 1300 : Ext.getBody().getViewSize().width;
  var height = Ext.getBody().getViewSize().height > 800 ? 800 : Ext.getBody().getViewSize().height;
  var rec = grid.getStore();

  var cbRol = Ext.ComponentQuery.query("#WFModificarFichaInicioGrilla #cbRol")[0];
  
  
  if(cbRol.getValue() != null) {

    storeValidarRolEtapa1.load({
      params: {
        p_rol: cbRol.selection.data.PK_ROL_WF
      },
      callback: function(records, operation, success) {
        if(records != null && records.length > 0) {
            if(records[0].data.CONTAR != '0'){
              
              ventanaDinamica(
                "WFModificarFichaCrear",
                "Crear Solicitud (" + NOM_EMPRESA + " - " + cbRol.selection.data.PK_ROL_WF+ ")",
                width,
                "",
                "WFModificarFichaCrear",
                1,
                0,
                rec,
                cbRol.selection.data
              );
                
            }else{
                Ext.MessageBox.show({
                    title: 'ADVERTENCIA',
                    msg: "El rol seleccionado no puede crear solicitudes.",
                    icon: Ext.MessageBox.WARNING,
                    buttons: Ext.Msg.OK
                });
            }
        }
        
    }

    });
    
  }else{
    Ext.MessageBox.show({
      title: 'ADVERTENCIA',
      msg: "Debe seleccionar un rol para poder crear una solicitud.",
      icon: Ext.MessageBox.WARNING,
      buttons: Ext.Msg.OK
  });
  }
};

var clickDetalleWFModificarFicha = function (grid, rowIndex) {
  var width = Ext.getBody().getViewSize().width > 1300 ? 1300 : Ext.getBody().getViewSize().width;
  var height = Ext.getBody().getViewSize().height > 800 ? 800 : Ext.getBody().getViewSize().height;
  
  var rec = grid.getStore();
  var recRow = rec.getAt(rowIndex);
  var cbRol = Ext.ComponentQuery.query("#WFModificarFichaInicioGrilla #cbRol")[0];
  var id = recRow.data.PK_ID;
  var estado = recRow.data.ESTADO;
  if(cbRol.getValue() != null) {
    ventanaDinamica(
      "WFModificarFichaDetalle",
      "Detalle Solicitud (" + id + " - " + estado + ")",
      width,
      "",
      "WFModificarFichaDetalle",
      1,
      0,
      cbRol.selection.data,
      recRow.data
    );
  }else{
    Ext.MessageBox.show({
      title: 'ADVERTENCIA',
      msg: "Debe seleccionar un rol para poder ingresar al detalle",
      icon: Ext.MessageBox.WARNING,
      buttons: Ext.Msg.OK
  });
  }
};

var clickAnularWFModificarFicha = function(grid, rowIndex) {
  var rec = grid.getStore();
    var recRow = rec.getAt(rowIndex);
    Ext.MessageBox.confirm(
        'Anular Solicitud', 
        '¿Esta seguro de anular la solicitud?', 
    function(btn) {
        if (btn === 'yes') {
            storeAnularSolicitudCambioFicha.load({
                params:{
                    P_ID: recRow.data.PK_ID,
                    P_USUARIO: NOMBRE
                },
                callback: function(records, operation, success) {
                    if(records != null) {
                        if(records[0].data.r_msg == 'OK'){
                            showToast('Solicitud anulada correctamente.');
                            cargarWFModificarFicha(null);
                            
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

var clickFiltrarWFModificarFicha = function (grid) {
  var rec = grid.getStore();
  var filtros = grid.filtros;
  ventanaDinamica(
    "WFModificarFichaFiltro",
    "Filtrar (" + NOM_EMPRESA + ")",
    "500",
    "",
    "WFModificarFichaFiltro",
    1,
    0,
    grid,
    filtros
  );
};

var cargarWFModificarFicha = function (filtros) {
  if (filtros !== null) {
    filtros = Ext.ComponentQuery.query("#WFModificarFichaInicioGrilla")[0]
      .filtros;
    if (filtros !== null) {
      storeCagarSolicitudesCambioFicha.load({
        params: {
          p_id: filtros.p_id,
          p_periodo: filtros.p_periodo,
          p_cod_emp: EMPRESA,
          p_rut: filtros.p_rut,
          p_usuario: NOMBRE,
          p_estado: filtros.p_estado,
          p_rol: ROL,
        },
      });
    } else {
      storeCagarSolicitudesCambioFicha.load({
        params: {
          p_cod_emp: EMPRESA,
          p_usuario: NOMBRE,
          p_rol: ROL,
        },
      });
    }
  } else {
    Ext.ComponentQuery.query(
      "#WFModificarFichaInicioGrilla #btnLimFiltro"
    )[0].setHidden(true);
    Ext.ComponentQuery.query("#WFModificarFichaInicioGrilla")[0].filtros = null;
    storeCagarSolicitudesCambioFicha.load({
      params: {
        p_cod_emp: EMPRESA,
        p_usuario: NOMBRE,
        p_rol: ROL,
      },
    });
  }
};
