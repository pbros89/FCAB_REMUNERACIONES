Ext.define('Ext.ux.form.MultiFile', {
    extend: 'Ext.form.field.File',
    alias: 'widget.multifilefield',
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

Ext.define('fcab.Grilla.Adjuntos', {
    extend: 'Ext.grid.GridPanel',
    xtype: 'uploadWidget',
    id: 'uploadWidget',
    itemId: 'uploadGrid',
    height: 120,
    store: {
        fields: ['file_name', 'file_size', 'file_type']
    },
    tbar: [{
            text: 'Agregar Documentos',
            iconCls: 'icon-adddoc',
            handler: function() {
                var win = Ext.widget({
                    xtype: 'window',
                    title: 'Cargar Archivos',
                    width: 350,
                    autoShow: true,
                    resizable: false,
                    items: {
                        xtype: 'form',
                        border: false,
                        bodyStyle: {
                            padding: '10px'
                        },
                        items: {
                            //xtype: 'multifilefield', // Para selección multiple
                            xtype: 'filefield', //Para selección simple
                            labelWidth: 80,
                            fieldLabel: 'Seleccionar',
                            anchor: '100%',
                            allowBlank: false,
                            margin: 0,
                            name: 'archivo'
                        }
                    },
                    buttons: [{
                            text: 'Cargar',
                            handler: function() {
                                var form = win.down('form').getForm();
                                if (!form.isValid())
                                    return;

                                form.submit({
                                    url: host + 'adjuntos',
                                    waitMsg: 'Cargando sus archivo(s)...',
                                    success: function(f, a) {
                                        var data = a.result.data;
                                        if (data.length) {
                                            var uploadWidget = Ext.getCmp('uploadGrid');
                                            uploadWidget.store.loadData(data, true);
                                        }
                                        win.close();
                                    },
                                    failure: function(f, a) {
                                        Ext.Msg.alert('Error interno', a.result.msg || 'Error del servidor', function() {
                                            win.close();
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
        {text: 'Nombre', dataIndex: 'file_name', flex: 1},
        {text: 'Tamaño', dataIndex: 'file_size', width: 100, align: 'right', renderer: Ext.util.Format.fileSize},
        {text: 'Tipo', dataIndex: 'file_type', width: 150, align: 'right'},
        {
            xtype: 'actioncolumn',
            text: '',
            width: 30,
            items: [{
                    iconCls: 'icon-deldoc',
                    tooltip: 'Eliminar negocio',
                    handler: function(grid, rowIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        Ext.MessageBox.confirm('Borrar', '¿Esta seguro de borrar este adjunto?', function(btn) {
                            if (btn === 'yes') {
                                grid.getStore().remove(rec);
                                Ext.Ajax.request({
                                    url: '' + host + 'adjuntos/delete',
                                    method: 'POST',
                                    disableCaching: false,
                                    params: {
                                        archivo: rec.data.file_name
                                    },
                                    success: function(response) {
                                    },
                                    failure: function(response) {
                                        
                                    }
                                });
                            }
                        });
                    }
                }]
        }]
});