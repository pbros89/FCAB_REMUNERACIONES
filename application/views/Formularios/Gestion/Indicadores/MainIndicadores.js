Ext.define("fcab.Container.MainIndicadores", {
  extend: "Ext.tab.Panel",
  xtype: "MainIndicadores",
  id: 'MainIndicadores',
  itemId: "MainIndicadores",
  activeTab: 0,
  width: '100%',
  maxHeight: 3000,
  //border:false,
  listeners: {
    afterrender: function () {
      //cargarIniciarFiltroDistribucionEtaria();
    },
  },
  items: [
    {
      id: "tabIndDotacion",
      title: "Dotacion",
      xtype: "IndDotacion",
    },
    {
      id: "tabIndDistribucionEtaria",
      title: "Etaria",
      xtype: "IndDistribucionEtaria",
    },
    {
      id: "tabIndDistribucionAntiguedad",
      title: "Antiguedad",
      xtype: "IndDistribucionAntiguedad",
    },
    {
      id: "tabIndDistribucionSexo",
      title: "Sexo",
      xtype: "IndDistribucionSexo",
    },
    {
      id: "tabIndDistribucionPais",
      title: "Nacionalidad",
      xtype: "IndDistribucionPais",
    },
    {
      id: "tabIndRotacion",
      title: "Rotación",
      xtype: "IndRotacion",
    },
    {
      id: "tabIndAusentismo",
      title: "Ausentismo",
      xtype: "IndAusentismo",
    },
    {
      id: "tabIndCierreMensual",
      title: "Cierre Mensual",
      xtype: "IndCierreMensual",
    },
  ],
});
