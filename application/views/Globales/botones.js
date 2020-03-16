Ext.define('fcab.boton.Cancelar', {
    extend: 'Ext.Button',
    xtype: 'btnBotonCancelar',
    text: 'Cancelar',
    width: 150,
    handler: function() {
        closeWin();
    }
});