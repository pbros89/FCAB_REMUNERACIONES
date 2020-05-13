var modalAdjuntosAdmin = function(cod, ruta, titulo){
    Ext.create("Ext.window.Window", {
        title: "Adjuntos "+ titulo,
        modal: true,
        width: 800,
        height: 500,
        layout: 'fit',
        items: [{
            xtype: 'FormUploadModalAdjunto'
        },{
            xtype: 'hiddenfield',
            name: 'p_ruta',
            id:'rutaModalAdjunto',
            value: ruta
        },{
            xtype: 'hiddenfield',
            name: 'p_cod',
            id:'codModalAdjunto',
            value: cod
        }],
        listeners:{
            afterrender: function(){
                
                console.log(cod + " / " + ruta);

                storeAdjuntos_cargarAdjuntos.getProxy().extraParams = {
                    p_cod: cod,
                    p_ruta: ruta
                };
                storeAdjuntos_cargarAdjuntos.load();
            }  
        }
    }).show();
};

Ext.define('Ext.ux.form.ReportesModalAdjunto', {
    extend: 'Ext.form.field.File',
    alias: 'widget.reporteUploadModalAdjunto',
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

Ext.define('fcab.Form.FormUploads.ModalAdjuntos', {
    extend: 'Ext.panel.Panel',
    xtype: 'FormUploadModalAdjunto',
    layout: 'anchor',
    border: false,
    frame: true,
    bodyPadding: '5 5 5',
    items: [{
        xtype: 'uploadWidgetModalAdjunto'
    }]
});



Ext.define('fcab.Grilla.Adjuntos.AdjuntosModal', {
    extend: 'Ext.grid.GridPanel',
    xtype: 'uploadWidgetModalAdjunto',
    id: 'uploadGridModalAdjunto',
    itemId: 'uploadGridModalAdjunto',
    height: '100%',
    store: storeAdjuntos_cargarAdjuntos,
    tbar: [{
        text: 'Agregar Documento',
        iconCls: 'icon-form-add',
        handler: function() {
            var win = Ext.widget({
                xtype: 'window',
                title: 'Cargar Archivo',
                width: 350,
                modal: true,
                autoShow: true,
                resizable: false,
                items: {
                    xtype: 'form',
                    border: false,
                    bodyStyle: {
                        padding: '10px'
                    },
                    items: [{
                        xtype: 'component',
                        html: '<div style="text-align: center;">Se permiten archivos "jpg", "png", "pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx" hasta de 2MB</div>',
                        style: 'margin-bottom: 10px'
                    }, {
                        //xtype: 'multifilefield', // Para selección multiple
                        xtype: 'filefield', //Para selección simple
                        labelWidth: 80,
                        fieldLabel: 'Seleccionar',
                        anchor: '100%',
                        allowBlank: false,
                        style: 'margin-bottom: 10px',
                        name: 'archivo'
                        /*fileInputAttributes: {
                            accept: 'image/*'
                        },
                        listeners:{
                            afterrender:function(cmp){
                                cmp.fileInputEl.set({
                                    accept:'image/*' // or w/e type
                                });
                            }
                        }*///,
                        //regex: /(.)+((\.png)|(\.jpg)|(\.jpeg)(\w)?)$/i,
                        //regexText: 'Solo imagenes PNG y JPEG son aceptados'
                    }]
                },
                buttons: [{
                    text: 'Adjuntar',
                    handler: function() {
                        var form = win.down('form').getForm();
                        var values = form.getValues();
                        //console.log(form);
                        //console.log(values);
                        if (!form.isValid())
                            return;

                        form.submit({
                            url: host + 'adjunto/AdjuntoController/subirAdjunto',
                            waitMsg: 'Cargando su archivo...',
                            params: {
                                p_ruta: Ext.getCmp('rutaModalAdjunto').value,
                                p_cod: Ext.getCmp('codModalAdjunto').value
                            },
                            success: function(f, a) {
                                var data = a.result.data;
                                if (data.length) {
                                    var uploadWidget = Ext.getCmp('uploadGridModalAdjunto');
                                    uploadWidget.store.loadData(data, true);
                                }
                                win.close();
                                return false;
                            },
                            failure: function(f, a) {
                                console.log(f);
                                console.log(a);
                                Ext.Msg.alert('Error interno', a.result.msg || 'Error del servidor', function() {
                                    win.close();
                                    return false;
                                });
                            }
                        });
                    }
                }, {
                    text: 'Cancelar',
                    handler: function() {
                        win.close();
                    }
                }]
            });
        }
    }],
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
                    
                    OpenInNewTabWinBrowser("resources/upload/"+Ext.getCmp('rutaModalAdjunto').value+"/"+
                            Ext.getCmp('codModalAdjunto').value+"/"+recRow.data.file_name);
                }
            }]
        },{
            xtype: 'actioncolumn',
            text: '',
            width: 30,
            items: [{
                iconCls: 'icon-form-delete',
                tooltip: 'Eliminar Imagen',
                handler: function(grid, rowIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    Ext.MessageBox.confirm('Borrar', '¿Esta seguro de borrar este archivo?', function(btn) {
                        if (btn === 'yes') {
                            grid.getStore().remove(rec);
                            Ext.Ajax.request({
                                url: '' + host + 'adjunto/AdjuntoController/eliminarAdjunto',
                                method: 'POST',
                                disableCaching: false,
                                params: {
                                    archivo: rec.data.file_name,
                                    p_ruta: Ext.getCmp('rutaModalAdjunto').value,
                                    p_cod: Ext.getCmp('codModalAdjunto').value
                                },
                                success: function(response) {
                                    return false;
                                },
                                failure: function(response) {
                                    return false;
                                }
                            });
                        }
                    });
                }
            }]
        }]
    });