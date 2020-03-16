Ext.define('appmovil.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',

    /*requires: [
        'appmovil.store.Login'
    ],*/

    onTipoChange: function(cons, newValue) {
        if(newValue.data.value === 'TALLER'){
            Ext.ComponentQuery.query('#username')[0].hide();
            Ext.ComponentQuery.query('#password')[0].hide();
            Ext.ComponentQuery.query('#rutUsuario')[0].show();
            Ext.ComponentQuery.query('#anhoUsuario')[0].show();
        } else {
            Ext.ComponentQuery.query('#username')[0].show();
            Ext.ComponentQuery.query('#password')[0].show();
            Ext.ComponentQuery.query('#rutUsuario')[0].hide();
            Ext.ComponentQuery.query('#anhoUsuario')[0].hide();
        }
    },

    onRutChange: function(cons, newValue) {

        var ultimo_ingreso = newValue.event.key;

        if(ultimo_ingreso !== '0' && ultimo_ingreso !== '1' && ultimo_ingreso !== '2' && ultimo_ingreso !== '3' &&
            ultimo_ingreso !== '4' && ultimo_ingreso !== '5' && ultimo_ingreso !== '6' && ultimo_ingreso !== '7' &&
            ultimo_ingreso !== '8' && ultimo_ingreso !== '9') {cons.setValue(''); return;}

        var str = newValue.target.value;
        var n = str.indexOf("-");

        if(n >= 0) {
            var rut = str.substr(0, n);
            rut = rut + '' + ultimo_ingreso;
        } else {
            rut = newValue.target.value;
        }

        var nuevo_numero = rut.toString().split("").reverse().join("");
        for(var i=0, j=2,suma=0; i < nuevo_numero.length; i++, ((j==7) ? j=2 : j++)) {
            suma += (parseInt(nuevo_numero.charAt(i)) * j);
        }
        var n_dv = 11 - (suma % 11);
        var dv = ((n_dv == 11) ? 0 : ((n_dv == 10) ? "K" : n_dv));

        cons.setValue(rut  + '-' + dv);

    },

    onLoginClick: function(button) {

        var me = this;

        var form = button.up('panel');
        var fields = form.getValues();

        var valide = true;
        if(fields['tipo'] === 'TALLER') {
            if(fields['rut'] === null || fields['anho'] === null) valide = false;
        } else {
            if(fields['username'] === null || fields['password'] === null) valide = false;
        }

        if(!valide){
            Ext.toast('Complete todo los campo');
            return;
        }


        form.submit({
            url: 'https://sierragorda.fcab.cl/FCABMasterFinal/index.php/store/login/modern_touch',
            method: 'GET',
            waitMsg:'Verificando...',
            success: function(form, action) {
                console.log(action.items[0]);
                localStorage.setItem("movilMasterLogin", true); //Sessión local
                localStorage.setItem("movilMasterCorreo", action.items[0]['correo']); //Sessión local
                localStorage.setItem("movilMasterNombre", action.items[0]['nombre_full']); //Sessión local
                localStorage.setItem("movilMasterRut", action.items[0]['rut']); //Sessión local
                localStorage.setItem("movilMasterUsuario", action.items[0]['nombre']);

                me.getView().destroy();

                //noinspection RequiresInspection
                Ext.create({
                    xtype: 'app-main'
                });
                location.reload();
            },
            failure: function() {
                Ext.toast("Los datos ingresados no corresponden a un usuario o usuaria del dominio.");
                //Ext.Msg.alert('Failed', action.result.msg);
            }
        });

        /*var myStore = Ext.create('appmovil.store.Login');
        myStore.load({
            params: {
                'tipo' : fields['tipo'],
                'usuario': fields['username'],
                'password': fields['password'],
                'rut': fields['rut'],
                'anho': fields['anho']
            },
            callback: function(records, opertion, success) {

                if(Boolean(success)) {

                    localStorage.setItem("movilMasterLogin", true); //Sessión local
                    localStorage.setItem("movilMasterCorreo", records[0].data.correo); //Sessión local
                    localStorage.setItem("movilMasterNombre", records[0].data.nombre_full); //Sessión local
                    localStorage.setItem("movilMasterRut", records[0].data.rut); //Sessión local

                    this.getView().destroy();

                    //noinspection RequiresInspection
                    Ext.create({
                        xtype: 'app-main'
                    });
                    location.reload();
                } else {
                    Ext.toast({
                        html: "Los datos ingresados no corresponden a un usuario o usuaria del dominio.",
                        closable: false,
                        align: 't',
                        slideInDuration: 400,
                        minWidth: 400
                    });
                }
            },
            scope: this
        });*/
    }
});