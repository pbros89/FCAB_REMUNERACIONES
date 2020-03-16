/**
 * Created by MarioTi on 08-03-16.
 */

Ext.define('Ext.ux.form.ReportesUploadImages', {
    extend: 'Ext.form.field.File',
    alias: 'widget.reporteUploadImages',
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

Ext.define('fcab.Form.FormUploads.imagesReportes', {
    extend: 'Ext.panel.Panel',
    xtype: 'FormUploadImagesReporte',
    layout: 'anchor',
    border: false,
    frame: true,
    bodyPadding: '5 5 5',
    items: [{
        xtype: 'uploadWidgetReportesImages'
    }]
});

Ext.define('fcab.Grilla.Adjuntos.reportesImages', {
    extend: 'Ext.grid.GridPanel',
    xtype: 'uploadWidgetReportesImages',
    id: 'uploadImagesGridReportes',
    itemId: 'uploadImagesGridReportes',
    height: 180,
    store: {
        fields: ['file_name', 'file_size']
    },
    tbar: [{
        text: 'AGREGAR EVIDENCIA GRÁFICA',
        iconCls: 'icon-adddoc',
        handler: function() {
            var win = Ext.widget({
                xtype: 'window',
                title: 'Cargar Imagenes',
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
                        html: '<div style="text-align: center;">Se permiten archivos "jpg" y "png" hasta de 2MB</div>',
                        style: 'margin-bottom: 10px'
                    }, {
                        //xtype: 'multifilefield', // Para selección multiple
                        xtype: 'filefield', //Para selección simple
                        labelWidth: 80,
                        fieldLabel: 'Seleccionar',
                        anchor: '100%',
                        allowBlank: false,
                        style: 'margin-bottom: 10px',
                        name: 'archivo',
                        fileInputAttributes: {
                            accept: 'image/*'
                        },
                        listeners:{
                            afterrender:function(cmp){
                                cmp.fileInputEl.set({
                                    accept:'image/*' // or w/e type
                                });
                            }
                        }//,
                        //regex: /(.)+((\.png)|(\.jpg)|(\.jpeg)(\w)?)$/i,
                        //regexText: 'Solo imagenes PNG y JPEG son aceptados'
                    }, {
                        xtype: 'textfield',
                        name: 'descripcion',
                        fieldLabel: 'Descripción',
                        allowBlank: false,
                        labelWidth: 80,
                        maxLength: 55,
                        fieldStyle: 'text-transform:uppercase',
                        anchor: '100%'
                    }]
                },
                buttons: [{
                    text: 'Adjuntar',
                    handler: function() {
                        var form = win.down('form').getForm();
                        if (!form.isValid())
                            return;

                        form.submit({
                            url: host + 'adjuntos',
                            waitMsg: 'Cargando su imagen...',
                            success: function(f, a) {
                                var data = a.result.data;
                                if (data.length) {
                                    var uploadWidget = Ext.getCmp('uploadImagesGridReportes');
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
        {text: 'Nombre', dataIndex: 'file_name', width: 150},
        {text: 'Descripción', dataIndex: 'descripcion', flex: 1},
        {text: 'Tamaño', dataIndex: 'file_size', width: 100, align: 'right', renderer: Ext.util.Format.fileSize},
        {
            xtype: 'actioncolumn',
            text: '',
            width: 30,
            items: [{
                iconCls: 'icon-deldoc',
                tooltip: 'Eliminar Imagen',
                handler: function(grid, rowIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    Ext.MessageBox.confirm('Borrar', '¿Esta seguro de borrar esta imagen?', function(btn) {
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