Ext.define("fcab.Container.MainPresupuesto.Crear", {
  extend: "Ext.container.Container",
  xtype: "MainPresupuestoCrear",
  border: false,
  frame: false,
  style: "margin: 0px auto 0px auto;",
  layout: "anchor",
  scrollable: true,
  listeners: {
    beforerender: function () {
      var cbAnho = Ext.ComponentQuery.query("#MainPresupuestoCrear #cbAnho")[0];
      var dtFec1 = Ext.ComponentQuery.query("#MainPresupuestoCrear #dtFec1")[0];
      var dtFec2 = Ext.ComponentQuery.query("#MainPresupuestoCrear #dtFec2")[0];
      var dtHH1 = Ext.ComponentQuery.query("#MainPresupuestoCrear #dtHH1")[0];
      var dtHH2 = Ext.ComponentQuery.query("#MainPresupuestoCrear #dtHH2")[0];

      var date = new Date();
      var yearIni = 2019;
      var year = date.getFullYear() + 1;
      var years = [];
      while (yearIni <= year) {
        years.push({
          VALOR: yearIni,
        });
        yearIni++;
      }

      cbAnho.getStore().loadData(years);
      cbAnho.setValue(year);
      dtFec1.setValue(date);
      dtFec2.setValue(date);
      dtHH1.setValue("00:00");
      dtHH2.setValue("00:00");
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
          style: "margin-bottom: 5px",
          items: [
            {
              xtype: "combobox",
              labelAlign: "left",
              fieldLabel: "Tipo",
              displayField: "NOMBRE",
              valueField: "VALOR",
              anchor: "50%",
              name: "cbTipo",
              itemId: "cbTipo",
              editable: true,
              readOnly: false,
              triggerAction: "all",
              typeAhead: true,
              queryMode: "local",
              forceSelection: true,
              selectOnFocus: true,
              allowBlank: false,
              value: "PRINCIPAL",
              store: Ext.create("Ext.data.Store", {
                data: [
                  {
                    NOMBRE: "PRINCIPAL",
                    VALOR: "PRINCIPAL",
                  },
                ],
              }),
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
              xtype: "combo",
              name: "cbAnho",
              itemId: "cbAnho",
              fieldLabel: "Año",
              labelAlign: "left",
              queryMode: "local",
              triggerAction: "all",
              displayField: "VALOR",
              valueField: "VALOR",
              editable: true,
              typeAhead: true,
              selectOnFocus: true,
              forceSelection: true,
              anchor: "50%",
              allowBlank: false,
            },
          ],
        },
        {
          xtype: "container",
          columnWidth: 1,
          layout: "hbox",
          style: "margin-bottom: 15px",
          items: [
            {
              xtype: "datefield",
              name: "dtFec1",
              labelAlign: "left",
              fieldLabel: "Inicio",
              itemId: "dtFec1",
              emptyText: "yyyy/mm/dd",
              submitFormat: "Y/m/d",
              format: "Y/m/d",
              editable: true,
              allowBlank: false,
              width: "60%",
              margin: "0 10 0 0",
            },
            {
              xtype: "timefield",
              format: "H:i",
              increment: 1,
              name: "dtHH1",
              scrollable: true,
              itemId: "dtHH1",
              editable: true,
              allowBlank: false,
              //value: Ext.Date.format(new Date(), 'H:i'),
              width: "30%",
            },
          ],
        },
        {
          xtype: "container",
          columnWidth: 1,
          layout: "hbox",
          style: "margin-bottom: 10px",
          items: [
            {
              xtype: "datefield",
              name: "dtFec2",
              labelAlign: "left",
              fieldLabel: "Termino",
              itemId: "dtFec2",
              emptyText: "yyyy/mm/dd",
              submitFormat: "Y/m/d",
              format: "Y/m/d",
              editable: true,
              allowBlank: false,
              margin: "0 10 0 0",
              width: "60%",
            },
            {
              xtype: "timefield",
              format: "H:i",
              increment: 1,
              name: "dtHH2",
              scrollable: true,
              itemId: "dtHH2",
              editable: true,
              allowBlank: false,
              //value: Ext.Date.format(new Date(), 'H:i'),
              width: "30%",
            },
          ],
        },
        {
          xtype: "container",
          columnWidth: 1,
          layout: "anchor",
          style: "margin-bottom: 15px",
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
      ],
      buttons: [
        {
          text: "Iniciar",
          handler: function () {
            var form = this.up("form").getForm();
            if (!ValidarFormulario(form)) return;

            var ewin = Ext.WindowManager.getActive();
            if (ewin) {
              var values = form.getValues();

              iniciarPresupuesto(values);
            }
          },
        },
      ],
    },
  ],
});

var iniciarPresupuesto = function (values) {
  Ext.MessageBox.show({
    msg: "Creando Presupuesto",
    progressText: "Espere por favor...",
    width: 300,
    wait: {
      interval: 200,
    },
  });

  storeCrearPresupuesto.load({
    params: {
      p_cod_emp: EMPRESA,
      p_anho: values.cbAnho,
      p_tipo: values.cbTipo,
      p_inicio: values.dtFec1 + " " + values.dtHH1,
      p_termino: values.dtFec2 + " " + values.dtHH2,
      p_observacion: values.txtObservacion,
      p_usuario: NOMBRE,
    },
    callback: function (records, operation, success) {
      Ext.MessageBox.hide();
      var param = {
        p_proceso: values.cbAnho + "/" + values.cbMes,
        p_cod_emp: EMPRESA,
      };
      if (records != null) {
        if (records[0].data.r_msg == "OK") {
          showToast("Presupuesto creado correctamente.");
          cargarMainPresupuesto(null);
          Ext.getCmp("MainPresupuestoCrear").destroy();
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
};
