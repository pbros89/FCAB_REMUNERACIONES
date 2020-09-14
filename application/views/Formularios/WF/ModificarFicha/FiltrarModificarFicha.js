Ext.define("fcab.Container.WF.ModificarFicha.Filtro", {
  extend: "Ext.form.Panel",
  xtype: "WFModificarFichaFiltro",
  itemId: "WFModificarFichaFiltro",
  border: false,
  padding: 5,
  layout: {
    type: "column",
    align: "stretch",
    pack: "center",
  },
  listeners: {
    beforerender: function () {
      //Cargamos los años para filtro
      var cbAnho = Ext.ComponentQuery.query(
        "#WFModificarFichaFiltro #cbAnho"
      )[0];
      var date = new Date();
      var yearIni = 2019;
      var year = date.getFullYear();
      var years = [];
      years.push({
        NOMBRE: 'TODOS',
        VALOR: '',
      });

      while (yearIni <= year) {
        years.push({
            NOMBRE: yearIni.toString(),
            VALOR: yearIni.toString(),
        });
        yearIni++;
      }

      cbAnho.getStore().loadData(years, false);


      var dataForm = Ext.getCmp("WFModificarFichaFiltro").myExtraParams.param2;
      var txtId = Ext.ComponentQuery.query("WFModificarFichaFiltro #txtId")[0];
      var txtRut = Ext.ComponentQuery.query(
        "WFModificarFichaFiltro #txtRut"
      )[0];
      var cbAnho = Ext.ComponentQuery.query(
        "WFModificarFichaFiltro #cbAnho"
      )[0];
      var cbMes = Ext.ComponentQuery.query("WFModificarFichaFiltro #cbMes")[0];
      var cbEstado = Ext.ComponentQuery.query(
        "WFModificarFichaFiltro #cbEstado"
      )[0];
      if (dataForm !== null && dataForm !== "") {
        txtId.setValue(dataForm.p_id);
        txtRut.setValue(dataForm.p_rut);
        cbAnho.setValue(dataForm.p_anho);
        cbMes.setValue(dataForm.p_mes);
        cbEstado.setValue(dataForm.p_estado);
      } else {
        txtId.reset();
        txtRut.reset();
        cbAnho.reset();
        cbMes.reset();
        cbEstado.reset();
      }
    },
  },
  items: [
    {
      xtype: "container",
      columnWidth: 1,
      layout: "anchor",
      style: "margin:0 5 5 5",
      items: [
        {
          xtype: "textfield",
          //labelWidth: 50,
          itemId: "txtId",
          fieldLabel: "ID",
          labelAlign: "top",
          name: "txtId",
          allowBlank: true,
          editable: true,
          anchor: "100%",
          maxLength: 20,
        },
      ],
    },
    {
      xtype: "container",
      columnWidth: 1,
      layout: "anchor",
      style: "margin:0 5 5 5",
      items: [
        {
          xtype: "thousandnumber",
          itemId: "txtRut",
          name: "txtRut",
          forcePrecision: true,
          decimalPrecision: 0,
          allowDecimals: false,
          labelAlign: "top",
          fieldLabel: "Rut",
          width: "100%",
          allowBlank: true,
          minValue: 0,
        },
      ],
    },
    {
      xtype: "container",
      columnWidth: 0.3,
      layout: "anchor",
      style: "margin:0 5 5 5",
      items: [
        {
          xtype: "combo",
          name: "cbAnho",
          itemId: "cbAnho",
          fieldLabel: "Año",
          labelAlign: "top",
          queryMode: "local",
          triggerAction: "all",
          displayField: "NOMBRE",
          valueField: "VALOR",
          editable: true,
          typeAhead: true,
          selectOnFocus: true,
          forceSelection: true,
          anchor: "100%",
          allowBlank: false,
          store: Ext.create("Ext.data.Store", {
            data: [
              {
                NOMBRE: "TODOS",
                VALOR: "",
              },
            ],
          }),
          value: "",
        },
      ],
    },
    {
      xtype: "container",
      columnWidth: 0.7,
      layout: "anchor",
      style: "margin:0 5 5 5",
      items: [
        {
          xtype: "combo",
          name: "cbMes",
          itemId: "cbMes",
          displayField: "NOMBRE",
          valueField: "VALOR",
          store: storeExtras_cargarMesesFiltro,
          fieldLabel: "Mes",
          labelAlign: "top",
          queryMode: "local",
          triggerAction: "all",
          editable: true,
          typeAhead: true,
          selectOnFocus: true,
          forceSelection: true,
          anchor: "100%",
          allowBlank: false,
          value: "",
        },
      ],
    },
    {
      xtype: "container",
      columnWidth: 1,
      layout: "anchor",
      style: "margin: 0 5 5 5",
      items: [
        {
          xtype: "combobox",
          labelAlign: "top",
          fieldLabel: "Estado",
          displayField: "NOMBRE",
          valueField: "VALOR",
          anchor: "100%",
          name: "cbEstado",
          itemId: "cbEstado",
          editable: true,
          readOnly: false,
          triggerAction: "all",
          typeAhead: true,
          queryMode: "local",
          forceSelection: true,
          selectOnFocus: true,
          allowBlank: false,
          value: "",
          store: Ext.create("Ext.data.Store", {
            data: [
              {
                NOMBRE: "TODOS",
                VALOR: "",
              },
              {
                NOMBRE: "ACTIVO",
                VALOR: "ACTIVO",
              },
              {
                NOMBRE: "APROBADO",
                VALOR: "APROBADO",
              },
              {
                NOMBRE: "RECHAZADO",
                VALOR: "RECHAZADO",
              },
            ],
          }),
        },
      ],
    },
  ],
  buttons: [
    {
      text: "Limpiar",
      scale: "small",
      width: 100,
      style: "margin-right: 5px",
      handler: function () {
        var txtId = Ext.ComponentQuery.query(
          "WFModificarFichaFiltro #txtId"
        )[0];
        var txtRut = Ext.ComponentQuery.query(
          "WFModificarFichaFiltro #txtRut"
        )[0];
        var cbAnho = Ext.ComponentQuery.query(
          "WFModificarFichaFiltro #cbAnho"
        )[0];
        var cbMes = Ext.ComponentQuery.query(
          "WFModificarFichaFiltro #cbMes"
        )[0];
        var cbEstado = Ext.ComponentQuery.query(
          "WFModificarFichaFiltro #cbEstado"
        )[0];

        txtId.reset();
        txtRut.reset();
        cbAnho.reset();
        cbMes.reset();
        cbEstado.reset();
      },
    },
    {
      text: "Filtrar",
      scale: "small",
      width: 100,
      handler: function () {
        var grid = Ext.getCmp("WFModificarFichaFiltro").myExtraParams.param1;
        var param = Ext.getCmp("WFModificarFichaFiltro").myExtraParams.param2;
        var form = this.up("form").getForm(); //Obtenemos el formulario actual
        var values = form.getValues();
        var filtros = null;
        console.log(values);

        //Verificar si existe algun filtro
        if (
          values.txtId !== "" ||
          values.txtRut !== "" ||
          values.cbEstado !== "" ||
          values.cbAnho !== "" ||
          values.cbMes !== "" 
        ) {
          //guardar filtros en grilla principal
          filtros = {
            p_cod_emp: EMPRESA,
            p_id: values.txtId,
            p_rut: values.txtRut,
            p_estado: values.cbEstado,
            p_mes: values.cbMes,
            p_anho: values.cbAnho,
            p_periodo: (values.cbAnho !== "" && values.cbMes !== "") ? values.cbAnho+"/"+values.cbMes : "",
          };
          Ext.ComponentQuery.query("#WFModificarFichaInicioGrilla")[0].filtros = filtros;

          //cargarmos datos con filtros
          cargarWFModificarFicha(filtros);

          //Mostramos boton de limpiar filtros
          Ext.ComponentQuery.query(
            "#WFModificarFichaInicioGrilla #btnLimFiltro"
          )[0].setHidden(false);

        } else {
          //Si no hay filtros se esconde boton de limpiar filtros y hacemos una carga de datos sin filtros
          Ext.ComponentQuery.query(
            "#WFModificarFichaInicioGrilla #btnLimFiltro"
          )[0].setHidden(true);

          cargarWFModificarFicha(null);
        }
        
        grid.filtros = filtros;

        //Salimos de la pantalla
        Ext.getCmp("WFModificarFichaFiltro").destroy();
      },
    },
  ],
});
