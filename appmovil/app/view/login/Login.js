Ext.define('appmovil.view.login.Login', {
    extend: 'Ext.form.Panel',

    xtype: 'login',

    requires: [
        'Ext.field.Password',
        'Ext.field.Select',
        'Ext.field.Text',
        'Ext.form.FieldSet',
        'appmovil.view.login.LoginController',
        'appmovil.view.login.LoginModel'
    ],
    shadow: true,
    fullscreen: true,
    controller: 'login',
    viewModel: {
        type: 'login'
    },
    itemId: 'login-form',

    items: [{
        xtype: 'fieldset',
        //title: 'FCAB: Identifícate',
        //instructions: 'Por favor complete la información.',
        defaults: {
            labelWidth: '35%'
        },
        items: [{
            xtype: "panel",
            html: "<div><img src='resources/images/logo-sin-fondo.png' height=200 width=250 style='display: block;margin: 0 auto; border-radius: 10px;' /></div>"
            //html: "<div style='display: block;margin: 0 auto; border-radius: 10px; width:250px; height:200px; border: 1px solid #ccc;'></div>"
        }/*,{
            xtype: 'selectfield',
            name: 'tipo',
            itemId: 'tipo',
            label: 'Tipo Ingreso',
            options: [{
                text: 'Cuenta Intranet',
                value: 'INTRANET'
            }],
            listeners: {
                change: 'onTipoChange'
            }
        }, {
            xtype: 'textfield',
            name: 'usuario',
            itemId: 'username',
            label: 'Nombre',
            placeHolder: 'Usuario',
            autoCapitalize: false,
            required: true,
            clearIcon: true
        }, {
            xtype: 'passwordfield',
            revealable: true,
            name: 'password',
            itemId: 'password',
            label: 'Contraseña',
            required: true,
            clearIcon: true
        }, {
            xtype: 'textfield',
            name: 'rut',
            itemId: 'rutUsuario',
            label: 'RUT',
            placeHolder: '15.021.647-8',
            required: true,
            hidden: true,
            clearIcon: true,
            listeners: {
                keyup: 'onRutChange'
            }
        }, {
            xtype: 'textfield',
            name: 'anho',
            itemId: 'anhoUsuario',
            label: 'Año Nac.',
            placeHolder: '2010',
            required: true,
            hidden: true,
            clearIcon: true
        }*/]
    }/*, {
        xtype: 'button',
        style: 'margin: 1em',
        text: 'Ingresar',
        ui: 'action',
        handler: 'onLoginClick'
    }*/]
});
