/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('appmovil.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    init: function () {
        Ext.Viewport.setMenu(this.getMenu('left'), {
            side: 'left',
            cover: false
        });
        /*Ext.Viewport.setMenu(this.getMenuCfg('top'), {
            side: 'top'
        });*/
        
        Ext.Viewport.setActiveItem({
            xtype: 'inicioView'
        });
        
        //PRIVILEGIOS USUARIO MENU
        var storeMenuUsuario = Ext.ComponentQuery.query('#mainGen')[0].getViewModel().getStore('storeMenuUsuario');
        storeMenuUsuario.load({
            params:{p_log : localStorage.getItem('movilMasterUsuario')},
            callback: function(records, operation, success) {
                if(records !== null && records.length > 0)
                {
                    for(var i = 0; i < records.length; i++)
                    {
                        if(Ext.ComponentQuery.query('#'+records[i].data.ID_PHP).length > 0)
                        {
                            Ext.ComponentQuery.query('#'+records[i].data.ID_PHP)[0].setHidden(false);
                        }
                    }
                }
            }
        });
    },
    
    getMenu: function (side) {
        return {
            items: [/*{
             xtype: 'fieldset',
             title: '<div style="width: 100px; color:black; font-size:12px!important; word-wrap: break-word!important;">'

             +localStorage.getItem('movilMasterNombre')+'</br>'
             +'<span>'+localStorage.getItem('movilMasterRol')+'</br></span> </div>'

             },*/{
                    text: 'Inicio',
                    iconCls: 'x-fa fa-home',
                    handler: function () {
                        Ext.Viewport.hideMenu(side);
                        Ext.Viewport.remove(Ext.Viewport.getActiveItem(), true);

                        Ext.Viewport.setActiveItem({
                            xtype: 'inicioView'
                        });
                    }
                }, {
                    text: 'Alertas',
                    itemId: 'menuTiemposAlertas',
                    iconCls: 'x-fa fa-list',
                    hidden: true,
                    handler: function () {
                        Ext.Viewport.hideMenu(side);
                        Ext.Viewport.remove(Ext.Viewport.getActiveItem(), true);

                        Ext.Viewport.setActiveItem({
                            xtype: 'alertasView'
                        });
                    }
                }, {
                    text: 'Eventos',
                    itemId: 'menuTiempoRegistrarEvento',
                    iconCls: 'x-fa fa-list',
                    hidden: true,
                    handler: function () {
                        Ext.Viewport.hideMenu(side);
                        Ext.Viewport.remove(Ext.Viewport.getActiveItem(), true);

                        Ext.Viewport.setActiveItem({
                            xtype: 'eventosLocoView'
                        });
                    }
                }, {
                    text: 'Dispo',
                    itemId: 'menuSistIndicadores_80303',
                    iconCls: 'x-fa fa-list',
                    hidden: true,
                    handler: function () {
                        Ext.Viewport.hideMenu(side);
                        Ext.Viewport.remove(Ext.Viewport.getActiveItem(), true);

                        Ext.Viewport.setActiveItem({
                            xtype: 'indDispoView'
                        });
                    }
                },{
                    xtype: 'button',
                    text: 'Salir',
                    iconCls: 'x-fa fa-remove',
                    scope: this,
                    handler: function () {
                        
                        localStorage.removeItem('movilMasterLogin');
                        localStorage.removeItem('movilMasterCorreo');
                        localStorage.removeItem('movilMasterNombre');
                        localStorage.removeItem('movilMasterRut');
                        localStorage.removeItem('movilMasterRol');
                        localStorage.removeItem('movilMasterUsuario');
                        Ext.Viewport.removeMenu('left');
                        Ext.Viewport.removeMenu('top');

                        this.getView().destroy();

                        location.reload();
                    }
                }]
        };
    }
});
