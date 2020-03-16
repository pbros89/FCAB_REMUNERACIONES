/**
 * Created by Mario on 11-08-16.
 */


Ext.define('fcab.issues.Reportes', {
    extend: 'Ext.form.Panel',
    xtype: 'FormIssues',
    layout: 'anchor',
    bodyPadding: '10 10 0',
    border: 0,
    height: 350,
    items: [{
        xtype: 'textarea',
        fieldLabel: 'Por favor explique con detalle el posible contratiempo. apóyese con imágenes, de ser necesario',
        labelAlign: 'top',
        name: 'msgError',
        labelWidth: 130,
        allowBlank: false,
        height: 150,
        anchor: '100%'
    }, {
        xtype: 'uploadWidgetIssuesImages'
    }],
    buttons: [{
        text: 'Informar',
        itemId: 'btnGuardarAviso',
        handler: function () {
            var form = this.up('form');

            var ewin = Ext.WindowManager.getActive();


            if (ValidarFormulario(form.getForm())) {
                var storeAnexos = Ext.getCmp('uploadIssuesGridIssues').getStore();
                var store_data = [];
                storeAnexos.each(function (node) {
                    store_data.push({
                        "file_path": node.data.file_path,
                        "nombre": node.data.file_name,
                        "ext": node.data.image_type,
                        "height": node.data.image_height,
                        "width": node.data.image_width,
                        "descripcion": node.data.descripcion
                    })
                });



                form.submit({
                    url: host + 'Sendmail/reportar_error',
                    params: {
                        anexos: Ext.JSON.encode(store_data),
                        informante: RUT,
                        indicador: ewin.getId()
                    },
                    waitMsg: 'Enviando el comentario...',
                    method: 'POST',
                    success: function (form, action) {
                        Ext.Msg.alert('Enviado', 'Mensaje Enviado');
                        ewin.destroy();
                    },
                    failure: function (form, action) {
                        Ext.Msg.alert('Error', 'Error al crear el reporte');
                    }
                });
            }
        }
    }]
});


Ext.define('fcab.Grilla.Adjuntos.IssuesImages', {
    extend: 'Ext.grid.GridPanel',
    xtype: 'uploadWidgetIssuesImages',
    id: 'uploadIssuesGridIssues',
    itemId: 'uploadIssuesGridIssues',
    height: 120,
    store: {
        fields: ['file_name', 'file_size']
    },
    tbar: ['->',{
        text: 'Adjuntos',
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
                        html: '<div style="text-align: center;">Se permiten archivos "jpg" y "png" hasta de 8MB</div>',
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
                                    var uploadWidget = Ext.getCmp('uploadIssuesGridIssues');
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