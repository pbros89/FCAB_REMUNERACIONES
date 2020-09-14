Ext.define("fcab.Container.MasterConcepto.Editar", {
  extend: "Ext.container.Container",
  xtype: "MasterConceptoEditar",
  itemId: "MasterConceptoEditar",
  border: false,
  frame: false,
  style: "margin: 0px auto 0px auto;",
  layout: "anchor",
  height: 500,
  scrollable: true,
  listeners: {
    afterrender: function () {
      var param = Ext.getCmp("MasterConceptoEditar").myExtraParams.param2.data;
      console.log(param);
      Ext.ComponentQuery.query("#MasterConceptoEditar #cbGrupo")[0].setValue(
        param.FK_GRUPO_CONCEPTO
      );
      Ext.ComponentQuery.query("#MasterConceptoEditar #txtId")[0].setValue(
        param.PK_COD_CONCEPTO
      );
      Ext.ComponentQuery.query("#MasterConceptoEditar #txtNombre")[0].setValue(
        param.NOMBRE
      );
      Ext.ComponentQuery.query("#MasterConceptoEditar #cbTipoMes")[0].setValue(
        param.FK_TIPO_MES
      );
      Ext.ComponentQuery.query("#MasterConceptoEditar #cbMes")[0].setValue(
        param.MESES
      );
      Ext.ComponentQuery.query("#MasterConceptoEditar #txtInicial")[0].setValue(
        param.INICIAL
      );

      Ext.ComponentQuery.query("#MasterConceptoEditar #cbTipo")[0].setValue(
        param.FK_TIPO
      );
      Ext.ComponentQuery.query(
        "#MasterConceptoEditar #txtRangoIni"
      )[0].setValue(param.RANGO_INI);
      Ext.ComponentQuery.query(
        "#MasterConceptoEditar #txtRangoFin"
      )[0].setValue(param.RANGO_FIN);
      Ext.ComponentQuery.query(
        "#MasterConceptoEditar #txtObservacion"
      )[0].setValue(param.OBSERVACION);
      Ext.ComponentQuery.query("#MasterConceptoEditar #cbEstado")[0].setValue(
        param.ESTADO
      );
      Ext.ComponentQuery.query("#MasterConceptoEditar #chCopiar")[0].setValue(
        param.COPIAR_ANTERIOR == "1" ? true : false
      );
      Ext.ComponentQuery.query("#MasterConceptoEditar #chNoCero")[0].setValue(
        param.NO_CERO == "1" ? true : false
      );

      storeCargarConceptoVal.load({
        params: {
          p_cod_concepto: param.PK_COD_CONCEPTO,
          p_cod_emp: EMPRESA,
        },
      });
    },
  },
  items: [
    {
      xtype: "form",
      titleAlign: "center",
      border: false,
      frame: true,
      bodyPadding: 10,
      layout: {
        type: "column",
        align: "strech",
      },
      items: [
        {
          xtype: "container",
          columnWidth: 1,
          layout: "anchor",
          style: "margin:0 10px 5px 0",
          items: [
            {
              xtype: "combo",
              name: "cbGrupo",
              itemId: "cbGrupo",
              displayField: "NOMBRE",
              valueField: "PK_GRUPO_CONCEPTOS",
              store: storeCargarGrupoConceptos,
              fieldLabel: "Grupo",
              labelAlign: "top",
              queryMode: "local",
              triggerAction: "all",
              editable: true,
              typeAhead: true,
              selectOnFocus: true,
              forceSelection: true,
              anchor: "50%",
              allowBlank: false,
              listConfig: {
                getInnerTpl: function () {
                  return '<div data-qtip="{OBSERVACION}">{NOMBRE}</div>';
                },
              },
            },
          ],
        },
        {
          xtype: "container",
          columnWidth: 1,
          layout: "anchor",
          style: "margin:0 10px 5px 0",
          items: [
            {
              xtype: "textfield",
              fieldLabel: "ID",
              labelAlign: "top",
              name: "txtId",
              itemId: "txtId",
              typeAhead: true,
              anchor: "50%",
              maxLength: 20,
              allowBlank: false,
              readOnly: true,
              fieldStyle: "background-color: #d8d8d8; background-image: none;",
            },
          ],
        },
        {
          xtype: "container",
          columnWidth: 1,
          layout: "anchor",
          style: "margin-bottom: 5px",
          items: [
            {
              xtype: "textfield",
              fieldLabel: "Nombre",
              labelAlign: "top",
              name: "txtNombre",
              itemId: "txtNombre",
              typeAhead: true,
              anchor: "100%",
              maxLength: 100,
              allowBlank: false,
            },
          ],
        },
        {
          xtype: "container",
          columnWidth: 0.5,
          layout: "anchor",
          style: "margin:0 10px 5px 0",
          items: [
            {
              xtype: "combo",
              name: "cbTipoMes",
              itemId: "cbTipoMes",
              displayField: "NOMBRE",
              valueField: "PK_TIPO_MES_CONCEPTO",
              store: storeCargarTipoMesConceptos,
              fieldLabel: "Periodo",
              labelAlign: "top",
              queryMode: "local",
              triggerAction: "all",
              editable: true,
              typeAhead: true,
              selectOnFocus: true,
              forceSelection: true,
              anchor: "100%",
              allowBlank: false,
              listConfig: {
                getInnerTpl: function () {
                  return '<div data-qtip="{OBSERVACION}">{NOMBRE}</div>';
                },
              },
              listeners: {
                change: function (obj, newValue, oldValue) {
                  var cbMes = Ext.ComponentQuery.query(
                    "#MasterConceptoEditar #cbMes"
                  )[0];
                  var txtMeses = Ext.ComponentQuery.query(
                    "#MasterConceptoEditar #txtMeses"
                  )[0];
                  console.log(newValue);
                  if (
                    newValue == null ||
                    newValue == "LIBRE" ||
                    newValue == "MENSUAL"
                  ) {
                    cbMes.reset();
                    txtMeses.reset();
                    cbMes.setDisabled(true);
                    txtMeses.setDisabled(true);
                    cbMes.hide();
                    txtMeses.hide();
                  } else {
                    cbMes.reset();
                    txtMeses.reset();
                    cbMes.setDisabled(false);
                    txtMeses.setDisabled(false);
                    cbMes.show();
                    txtMeses.show();
                  }
                },
              },
            },
          ],
        },
        {
          xtype: "container",
          columnWidth: 0.5,
          layout: "anchor",
          style: "margin-bottom: 5px",
          items: [
            {
              xtype: "combo",
              name: "cbMes",
              itemId: "cbMes",
              displayField: "NOMBRE",
              valueField: "VALOR",
              store: storeExtras_cargarMeses,
              fieldLabel: "Mes Inicial",
              labelAlign: "top",
              queryMode: "local",
              triggerAction: "all",
              editable: true,
              typeAhead: true,
              selectOnFocus: true,
              forceSelection: true,
              anchor: "100%",
              allowBlank: false,
              listeners: {
                change: function (obj, newValue, oldValue) {
                  var cbTipoMes = Ext.ComponentQuery.query(
                    "#MasterConceptoEditar #cbTipoMes"
                  )[0];
                  var txtMeses = Ext.ComponentQuery.query(
                    "#MasterConceptoEditar #txtMeses"
                  )[0];
                  txtMeses.reset();

                  if (newValue != null && cbTipoMes.value) {
                    var mes = Number.parseInt(newValue);
                    var texto = obtenerMesesPeriodoTexto(mes, cbTipoMes.value);

                    if (texto != null && texto != "") {
                      txtMeses.setValue(texto);
                    } else {
                      Ext.MessageBox.show({
                        title: "Mes Inicial",
                        msg:
                          "El mes inicial seleccionado es incorrecto para el periodo",
                        icon: Ext.MessageBox.WARNING,
                        buttons: Ext.Msg.OK,
                      });
                    }
                  }
                },
              },
            },
          ],
        },
        {
          xtype: "container",
          columnWidth: 1,
          layout: "anchor",
          style: "margin-bottom: 5px",
          items: [
            {
              xtype: "textfield",
              fieldLabel: "Meses",
              labelAlign: "top",
              name: "txtMeses",
              itemId: "txtMeses",
              typeAhead: true,
              readOnly: true,
              anchor: "100%",
              maxLength: 100,
              allowBlank: true,
            },
          ],
        },
        {
          xtype: "container",
          columnWidth: 0.5,
          layout: "anchor",
          style: "margin:0 10px 5px 0",
          items: [
            {
              xtype: "combo",
              name: "cbTipo",
              itemId: "cbTipo",
              displayField: "NOMBRE",
              valueField: "PK_TIPO_CONCEPTO",
              store: storeCargarTipoConceptos,
              fieldLabel: "Tipo",
              labelAlign: "top",
              queryMode: "local",
              triggerAction: "all",
              editable: true,
              typeAhead: true,
              selectOnFocus: true,
              forceSelection: true,
              anchor: "100%",
              allowBlank: false,
              listConfig: {
                getInnerTpl: function () {
                  return '<div data-qtip="{OBSERVACION}">{NOMBRE}</div>';
                },
              },
              listeners: {
                change: function (obj, newValue, oldValue) {
                  var txtRangoIni = Ext.ComponentQuery.query(
                    "#MasterConceptoEditar #txtRangoIni"
                  )[0];
                  var txtRangoFin = Ext.ComponentQuery.query(
                    "#MasterConceptoEditar #txtRangoFin"
                  )[0];
                  var MasterConceptoEditarSeleccionGrilla = Ext.ComponentQuery.query(
                    "#MasterConceptoEditar #MasterConceptoEditarSeleccionGrilla"
                  )[0];

                  if (newValue != null) {
                    txtRangoIni.reset();
                    txtRangoFin.reset();
                    switch (newValue) {
                      case "RANGO":
                        console.log(newValue);
                        txtRangoIni.setDisabled(false);
                        txtRangoFin.setDisabled(false);
                        txtRangoIni.show();
                        txtRangoFin.show();
                        MasterConceptoEditarSeleccionGrilla.setDisabled(true);
                        MasterConceptoEditarSeleccionGrilla.hide();
                        break;
                      case "SELECCIONAR":
                        console.log(newValue);
                        txtRangoIni.setDisabled(true);
                        txtRangoFin.setDisabled(true);
                        txtRangoIni.hide();
                        txtRangoFin.hide();
                        MasterConceptoEditarSeleccionGrilla.setDisabled(false);
                        MasterConceptoEditarSeleccionGrilla.show();
                        break;
                      default:
                        console.log("VALOR");
                        txtRangoIni.setDisabled(true);
                        txtRangoFin.setDisabled(true);
                        MasterConceptoEditarSeleccionGrilla.setDisabled(true);
                        txtRangoIni.hide();
                        txtRangoFin.hide();
                        MasterConceptoEditarSeleccionGrilla.hide();
                        break;
                    }
                  }
                },
              },
            },
          ],
        },
        {
          xtype: "container",
          columnWidth: 0.5,
          layout: "anchor",
          style: "margin:0 10px 5px 0",
          items: [
            {
              xtype: "thousandnumber",
              itemId: "txtInicial",
              name: "txtInicial",
              allowDecimals: true,
              labelAlign: "top",
              decimalPrecision: 4,
              fieldLabel: "Valor Inicial",
              anchor: "100%",
              allowBlank: false,
              minValue: 0,
              value: 0,
            },
          ],
        },
        {
          xtype: "container",
          columnWidth: 0.5,
          layout: "anchor",
          style: "margin:0 10px 5px 0",
          items: [
            {
              xtype: "thousandnumber",
              itemId: "txtRangoIni",
              name: "txtRangoIni",
              labelAlign: "top",
              fieldLabel: "Rango Inicial",
              anchor: "100%",
              allowBlank: false,
              decimalPrecision: 4,
              minValue: 0,
              //value: recRow.data["DURACION"]
            },
          ],
        },
        {
          xtype: "container",
          columnWidth: 0.5,
          layout: "anchor",
          style: "margin-bottom: 5px",
          items: [
            {
              xtype: "thousandnumber",
              itemId: "txtRangoFin",
              name: "txtRangoFin",
              labelAlign: "top",
              fieldLabel: "Rango Final",
              anchor: "100%",
              allowBlank: false,
              decimalPrecision: 4,
              minValue: 0,
              //value: recRow.data["DURACION"]
            },
          ],
        },
        {
          xtype: "container",
          columnWidth: 1,
          layout: "anchor",
          style: "margin-bottom: 5px",
          items: [
            {
              xtype: "MasterConceptoEditarSeleccionGrilla",
            },
          ],
        },
        {
          xtype: "checkbox",
          columnWidth: 1,
          boxLabel: "Copiar el valor del proceso mensual anterior.",
          name: "chCopiar",
          itemId: "chCopiar",
          checked: false,
          inputValue: "1",
        },
        {
          xtype: "checkbox",
          columnWidth: 1,
          boxLabel: "No tomar cuando es cero en envios a ISSA",
          name: "chNoCero",
          itemId: "chNoCero",
          checked: false,
          inputValue: "1",
        },
        {
          xtype: "container",
          columnWidth: 1,
          layout: "anchor",
          style: "margin-bottom: 5px",
          items: [
            {
              xtype: "textareafield",
              fieldLabel: "Observación",
              labelAlign: "top",
              name: "txtObservacion",
              itemId: "txtObservacion",
              typeAhead: true,
              anchor: "100%",
              maxLength: 1000,
              allowBlank: true,
            },
          ],
        },
        {
          xtype: "container",
          columnWidth: 1,
          layout: "anchor",
          style: "margin:0 10px 5px 0",
          items: [
            {
              xtype: "combo",
              name: "cbEstado",
              itemId: "cbEstado",
              store: [
                ["A", "ACTIVO"],
                ["I", "INACTIVO"],
              ],
              fieldLabel: "Estado",
              labelAlign: "top",
              queryMode: "local",
              triggerAction: "all",
              editable: true,
              typeAhead: true,
              selectOnFocus: true,
              forceSelection: true,
              anchor: "50%",
              allowBlank: false,
              value: "A",
            },
          ],
        },
      ],
      buttons: [
        {
          text: "Editar",
          handler: function () {
            var form = this.up("form").getForm();
            var values = form.getValues();
            var ewin = Ext.WindowManager.getActive();
            var grid = Ext.ComponentQuery.query(
              "#MasterConceptoEditarSeleccionGrilla"
            )[0];
            var existeInicial = false;
            var txtInicial =
              values.txtInicial != null
                ? values.txtInicial.replace(",", ".")
                : null;
            var txtRangoIni =
              values.txtRangoIni != null
                ? values.txtRangoIni.replace(",", ".")
                : null;
            var txtRangoFin =
              values.txtRangoFin != null
                ? values.txtRangoFin.replace(",", ".")
                : null;

            if (values.chCopiar) {
              values.chCopiar = "1";
            } else {
              values.chCopiar = "0";
            }

            if (values.chNoCero) {
              values.chNoCero = "1";
            } else {
              values.chNoCero = "0";
            }

            //VALIDAR FORMAULARIO
            if (!ValidarFormulario(form)) return;
            //VALIDAR CANTIDAD DE VALORES CUANDO ES TIPO SELECCIONAR
            if (
              (values.cbTipo == "SELECCIONAR" && grid == null) ||
              (values.cbTipo == "SELECCIONAR" &&
                grid.getStore().data.items.length < 2)
            ) {
              Ext.MessageBox.show({
                title: "Tipo Seleccionar",
                msg: "Debe tener al menos 2 valores",
                icon: Ext.MessageBox.WARNING,
                buttons: Ext.Msg.OK,
              });
              return;
            }

            if (values.cbTipo == "SELECCIONAR") {
              var valor;
              for (i = 0; i < grid.store.data.items.length; i++) {
                valor = grid.store.data.items[i].data.VALOR;
                if (parseFloat(valor) == parseFloat(txtInicial)) {
                  existeInicial = true;
                }
              }
              if (existeInicial == false) {
                Ext.MessageBox.show({
                  title: "Tipo Seleccionar",
                  msg: "El valor inicial debe estar dentro del listado.",
                  icon: Ext.MessageBox.WARNING,
                  buttons: Ext.Msg.OK,
                });
                return;
              }
            }

            if (
              values.cbTipo == "RANGO" &&
              parseFloat(txtRangoIni) >= parseFloat(txtRangoFin)
            ) {
              Ext.MessageBox.show({
                title: "Tipo Rango",
                msg: "El rango inicio debe ser menor al rango final",
                icon: Ext.MessageBox.WARNING,
                buttons: Ext.Msg.OK,
              });
              return;
            }

            if (
              (values.cbTipo == "RANGO" &&
                parseFloat(txtInicial) > parseFloat(txtRangoFin)) ||
              (values.cbTipo == "RANGO" &&
                parseFloat(txtInicial) < parseFloat(txtRangoIni))
            ) {
              Ext.MessageBox.show({
                title: "Tipo Rango",
                msg: "El valor inicial no puede estar fuera de los rangos",
                icon: Ext.MessageBox.WARNING,
                buttons: Ext.Msg.OK,
              });
              return;
            }

            if (
              values.cbTipo == "BOOLEANO" &&
              parseFloat(txtInicial) != parseFloat(1) &&
              parseFloat(txtInicial) != parseFloat(0)
            ) {
              Ext.MessageBox.show({
                title: "Tipo Booleano",
                msg: "Solo se admiten los valores iniciales {0} o {1}",
                icon: Ext.MessageBox.WARNING,
                buttons: Ext.Msg.OK,
              });
              return;
            }

            if (
              values.cbTipo == "PORCENTAJE" &&
              parseFloat(txtInicial) > parseFloat(100)
            ) {
              Ext.MessageBox.show({
                title: "Tipo Porcentaje",
                msg: "Solo se admiten valores iniciales desde {0} hasta {100}",
                icon: Ext.MessageBox.WARNING,
                buttons: Ext.Msg.OK,
              });
              return;
            }

            //INICIO DE MODIFICACION

            if (ewin) {
              Ext.MessageBox.show({
                msg: "Modificando concepto",
                progressText: "Espere por favor...",
                width: 300,
                wait: {
                  interval: 200,
                },
              });

              storeModificarConcepto.load({
                params: {
                  p_cod_concepto: values.txtId,
                  p_cod_emp: EMPRESA,
                  p_tipo: values.cbTipo,
                  p_tipo_mes: values.cbTipoMes,
                  p_grupo: values.cbGrupo,
                  p_nombre: values.txtNombre,
                  p_observacion: values.txtObservacion,
                  p_meses: values.cbMes,
                  p_rango_ini: txtRangoIni,
                  p_rango_fin: txtRangoFin,
                  p_inicial: txtInicial,
                  p_usuario: NOMBRE,
                  p_estado: values.cbEstado,
                  p_copiar: values.chCopiar,
                },
                callback: function (records, operation, success) {
                  Ext.MessageBox.hide();
                  if (records != null) {
                    if (records[0].data.r_msg == "OK") {
                      cargarMasterConcepto(1);
                      showToast("Concepto modificado correctamente.");
                      Ext.getCmp("MasterConceptoEditar").destroy();
                    } else {
                      Ext.MessageBox.show({
                        title: "ADVERTENCIA",
                        msg: records[0].data.r_msg,
                        icon: Ext.MessageBox.WARNING,
                        buttons: Ext.Msg.OK,
                      });
                    }
                  }
                },
              });
            }
          },
        },
      ],
    },
  ],
});

Ext.define("fcab.Container.MasterConcepto.EditarSeleccionGrilla", {
  extend: "Ext.grid.Panel",
  xtype: "MasterConceptoEditarSeleccionGrilla",
  itemId: "MasterConceptoEditarSeleccionGrilla",
  columnLines: true,
  emptyText: "Sin datos para mostrar",
  store: storeCargarConceptoVal,
  filtros: null,
  plugins: pluginFactory(),
  columns: [
    {
      text: "Valores Seleccionar",
      sortable: true,
      dataIndex: "VALOR",
      //align: 'center',
      flex: 1,
      renderer: Ext.util.Format.numberRenderer("0.0,000"),
    },

    {
      xtype: "actioncolumn",
      text: "",
      width: 30,
      items: [
        {
          iconCls: "icon-form-delete",
          tooltip: "",
          handler: function (grid, rowIndex) {
            var rec = grid.getStore().getAt(rowIndex);
            var param = Ext.getCmp("MasterConceptoEditar").myExtraParams.param2
              .data;

            storeEliminarConceptoVal.load({
              params: {
                p_cod_concepto: param.PK_COD_CONCEPTO,
                p_cod_emp: EMPRESA,
                p_index: rec.data.PK_INDEX,
                p_usuario: NOMBRE,
              },

              callback: function (records, operation, success) {
                if (records != null) {
                  if (records[0].data.r_msg == "OK") {
                    showToast("Valor seleccionar eliminado correctamente.");
                  } else {
                    Ext.MessageBox.show({
                      title: "ADVERTENCIA",
                      msg: records[0].data.r_msg,
                      icon: Ext.MessageBox.WARNING,
                      buttons: Ext.Msg.OK,
                    });
                  }
                  storeCargarConceptoVal.load({
                    params: {
                      p_cod_concepto: param.PK_COD_CONCEPTO,
                      p_cod_emp: EMPRESA,
                    },
                  });
                }
              },
            });
          },
        },
      ],
    },
  ],
  height: 200,
  width: "100%",
  dockedItems: [
    {
      xtype: "toolbar",
      items: [
        {
          xtype: "thousandnumber",
          itemId: "txtValor",
          name: "txtValor",
          labelAlign: "left",
          fieldLabel: "Valor",
          anchor: "100%",
          allowBlank: true,
          decimalPrecision: 4,
          minValue: 0,
        },
        {
          text: "Agregar",
          tooltip: "Agregar nuevo valor",
          iconCls: "icon-form-add",
          handler: function () {
            var param = Ext.getCmp("MasterConceptoEditar").myExtraParams.param2
              .data;
            var txtValor = Ext.ComponentQuery.query(
              "#MasterConceptoEditarSeleccionGrilla #txtValor"
            )[0];
            var grid = this.up("grid"); //Recuperamos la grilla
            var store = grid.getStore();
            var valor =
              txtValor.value.toString() != null
                ? txtValor.value.toString().replace(",", ".")
                : null;
            console.log("valor" + valor);
            if (txtValor.value != null) {
              for (var i = 0; i < store.data.items.length; i++) {
                if (store.data.items[i].data.VALOR == txtValor.value) {
                  Ext.MessageBox.show({
                    title: "Valor Repetido",
                    msg: "No se permiten valores repetidos",
                    icon: Ext.MessageBox.WARNING,
                    buttons: Ext.Msg.OK,
                  });
                  return;
                }
              }
              storeCrearConceptoVal.load({
                params: {
                  p_cod_concepto: param.PK_COD_CONCEPTO,
                  p_cod_emp: EMPRESA,
                  p_valor: valor,
                  p_usuario: NOMBRE,
                },
                callback: function (records, operation, success) {
                  if (records != null) {
                    if (records[0].data.r_msg == "OK") {
                      //showToast('Valor seleccionar creado correctamente.');
                    } else {
                      Ext.MessageBox.show({
                        title: "ADVERTENCIA",
                        msg: records[0].data.r_msg,
                        icon: Ext.MessageBox.WARNING,
                        buttons: Ext.Msg.OK,
                      });
                    }
                  }
                  storeCargarConceptoVal.load({
                    params: {
                      p_cod_concepto: param.PK_COD_CONCEPTO,
                      p_cod_emp: EMPRESA,
                    },
                  });
                },
              });
            }
          },
        },
      ],
    },
  ],
});
