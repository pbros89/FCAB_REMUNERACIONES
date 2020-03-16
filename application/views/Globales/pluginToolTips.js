/**
 * Created by MarioTi on 10-03-15.
 */

//Permite agregar unu plugins de toltips para las imagenes.

//Uso

/*********************************************************************************************

 xtype: 'image',
 src: 'resources/images/reloj.48x48.png',
 height: 24,
 width: 24,
 margin: '0 5 0 5',
 plugins: {
    ptype: 'ux-tooltip',
        html: '<b>Obtener hora</b>: Presione la imagen, para obtener la hora actual<br> '
    },
 listeners: {
    el: {
        click: function () {
            alert('Hola Mundo');
        }
    }
}

 *********************************************************************************************/

Ext.define('Ext.ux.Tooltip', {
    extend: 'Ext.AbstractPlugin',
    alias: 'plugin.ux-tooltip',

    /**
     * @cfg html The text to put into the tooltip
     */
    init: function(cmp) {
        var me = this;
        cmp.on('render', function() {
            Ext.create('Ext.tip.ToolTip', {
                target: cmp.el,
                html: me.html
            });
        });
    }
});


Ext.tip.QuickTipManager.init();