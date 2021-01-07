Ext.define("fcab.Container.AusentismoISSA", {
  extend: "Ext.container.Container",
  xtype: "AusentismoISSA",
  itemId: "AusentismoISSA",
  layout: "fit",
  width: "100%",
  border: false,
  frame: false,
  style: "margin: 0px auto 0px auto;",

  constructor: function (config) {
    this.callParent([config]);
  },
  items: [
    {
      xtype: "form",
      titleAlign: "center",
      border: false,
      frame: false,
      title: "Consultas Ausentismo ISSA",
      bodyPadding: 10,
      layout: {
        type: "column",
        align: "center",
        pack: 'center'
      },
      items: [
        {
            xtype: 'container',
            columnWidth: 1,
            layout: 'anchor',
            style: 'margin: 0 10px 5px 0',
            items: [{
                xtype: 'combobox',
                labelAlign:'left',
                fieldLabel: 'Tipo',
                displayField: 'NOMBRE',
                valueField: 'VALOR',
                anchor: '30%',
                name: 'cbTipo',
                itemId: 'cbTipo',
                editable: true,
                readOnly: false,
                triggerAction: 'all',
                typeAhead: true,
                queryMode: 'local',
                forceSelection: true,
                selectOnFocus: true,
                allowBlank: false,
                value: 'LICENCIA',
                store: Ext.create('Ext.data.Store', {
                    data: [
                        {
                            "NOMBRE": "LICENCIA",
                            "VALOR": "LICENCIA"
                        },
                        {
                            "NOMBRE": "PERMISO",
                            "VALOR": "PERMISO"
                        },
                        {
                            "NOMBRE": "VACACION",
                            "VALOR": "VACACION"
                        }
                        
                    ]
                }),
                
            }]
        },{
          xtype: "container",
          columnWidth: 1,
          layout: "anchor",
          style: "margin: 0 10px 5px 0",
          items: [
            {
              xtype: "thousandnumber",
              itemId: "txtRut",
              name: "txtRut",
              forcePrecision: true,
              decimalPrecision: 0,
              allowDecimals: false,
              labelAlign: "left",
              fieldLabel: "Rut",
              width: "30%",
              allowBlank: true,
              minValue: 0,
            },
            
          ],
        },
        {
          xtype: "container",
          columnWidth: 1,
          layout: "anchor",
          style: "margin: 0 10px 5px 0",
          items: [
            {
              xtype: "datefield",
              name: "dtFec1",
              labelAlign: "left",
              anchor: "30%",
              fieldLabel: "Desde",
              itemId: "dtFec1",
              emptyText: "dd-mm-yyyy",
              submitFormat: "d-m-Y",
              format: "d-m-Y",
              editable: true,
              allowBlank: false,
            },
          ],
        },
        {
          xtype: "container",
          columnWidth: 1,
          layout: "anchor",
          style: "margin: 0 10px 5px 0",
          items: [
            {
              xtype: "datefield",
              name: "dtFec2",
              labelAlign: "left",
              anchor: "30%",
              fieldLabel: "Hasta",
              itemId: "dtFec2",
              emptyText: "dd-mm-yyyy",
              submitFormat: "d-m-Y",
              format: "d-m-Y",
              editable: true,
              allowBlank: false,
            },
          ],
        },
      ],
      buttons: [
        {
          tooltip: "Genera excel según filtros de consulta",
          scale: "large",
          text: "Exportar",
          handler: function () {
            var form = this.up("form").getForm();
            var values = form.getValues();
            values.p_fec1 = values.dtFec1;
            values.p_fec2 = values.dtFec2;
            values.p_rut = values.txtRut;
            values.p_tipo = values.cbTipo;

            console.log(values);
            if (form.isValid()) {
              Ext.MessageBox.confirm(
                "Exportar",
                "El proceso puede demorarse varios segundos.<br> ¿Desea continuan?",
                function (btn) {
                  if (btn === "yes") {
                    //console.log(form.getValues());
                    Ext.create("Ext.form.Panel", {
                      renderTo: Ext.getBody(),
                      standardSubmit: true,
                      timeout: 300000,
                      url:
                        host +
                        "issa/IssaController/crearXlsAusentismoIssa",
                    }).submit({
                      params: values,
                      timeout: 300000,
                      target: "ReporteAusentismo" + "-form-iframe",
                    });
                  }
                }
              );
            }
          },
        },
      ],
    },
  ],
});
