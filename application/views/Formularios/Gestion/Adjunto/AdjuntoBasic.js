var modalAdjuntosBasic = function(cod, ruta, titulo){
    Ext.create("Ext.window.Window", {
        title: "Adjuntos "+ titulo,
        modal: true,
        width: 800,
        height: 500,
        layout: 'fit',
        items: [{
            xtype: 'FormUploadModalAdjuntoBasic'
        },{
            xtype: 'hiddenfield',
            name: 'p_ruta',
            id:'rutaModalAdjuntoBasic',
            value: ruta
        },{
            xtype: 'hiddenfield',
            name: 'p_cod',
            id:'codModalAdjuntoBasic',
            value: cod
        }],
        listeners:{
            afterrender: function(){
                
                storeAdjuntos_cargarAdjuntos.getProxy().extraParams = {
                    p_cod: cod,
                    p_ruta: ruta
                };
                storeAdjuntos_cargarAdjuntos.load();
            }  
        }
    }).show();
};

Ext.define('Ext.ux.form.ReportesModalAdjuntoBasic', {
    extend: 'Ext.form.field.File',
    alias: 'widget.reporteUploadModalAdjuntoBasic',
    initComponent: function() {
        var me = this;

        me.on('render', function() {
            me.fileInputEl.set({multiple: true});
        });

        me.callParent(arguments);
    },
    onFileChange: function(button, e, value) {
        this.duringFileSelect = true;

        var me = this,
            upload = me.fileInputEl.dom,
            files = upload.files,
            names = [];

        if (files) {
            for (var i = 0; i < files.length; i++)
                names.push(files[i].name);
            value = names.join(', ');
        }

        Ext.form.field.File.superclass.setValue.call(this, value);

        delete this.duringFileSelect;
    }
});

Ext.define('fcab.Form.FormUploads.ModalAdjuntosBasic', {
    extend: 'Ext.panel.Panel',
    xtype: 'FormUploadModalAdjuntoBasic',
    layout: 'anchor',
    border: false,
    frame: true,
    bodyPadding: '5 5 5',
    items: [{
        xtype: 'uploadWidgetModalAdjuntoBasic'
    }]
});



Ext.define('fcab.Grilla.Adjuntos.AdjuntosModalBasic', {
    extend: 'Ext.grid.GridPanel',
    xtype: 'uploadWidgetModalAdjuntoBasic',
    id: 'uploadGridModalAdjuntoBasic',
    itemId: 'uploadGridModalAdjuntoBasic',
    height: '100%',
    store: storeAdjuntos_cargarAdjuntos,
    columns: [
        {text: 'Nombre', dataIndex: 'file_name', flex: 3},
        {text: 'Tamaño', dataIndex: 'file_size', flex: 1, align: 'right', renderer: Ext.util.Format.fileSize},
        {
            xtype: 'actioncolumn',
            text: '',
            width: 30,
            items: [{
                iconCls: 'icon-form-download',
                tooltip: 'Ver archivo',
                handler: function(grid, rowIndex) {
                    var rec = grid.getStore();
                    var recRow = rec.getAt(rowIndex);
                    
                    OpenInNewTabWinBrowser("resources/upload/"+Ext.getCmp('rutaModalAdjuntoBasic').value+"/"+
                            Ext.getCmp('codModalAdjuntoBasic').value+"/"+recRow.data.file_name);
                }
            }]
        }]
    });