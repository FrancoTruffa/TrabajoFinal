<template>
  <v-container>
    <v-layout row wrap>
      <v-flex v-if="obtenerLista" xs12 pt-5>
        DENUNCIAS
        <v-card v-for="(denuncias, index) in obtenerLista" :key="index">
          <v-card-text>
          {{denuncias.nombre_cliente}} DENUNCIO A <a :href="'#/VerTrabajador/' + denuncias.id_trabajador_denunciado">{{ denuncias.apellido_trabajador_denunciado }} {{denuncias.nombre_trabajador_denunciado}}</a>
          <v-btn 
           color="red" 
           dark
           small
           @click="$store.dispatch('cambiarEstadoTrabajador', {
             id: denuncias.id_trabajador_denunciado,
             estado: true
           })"
           >BLOQUEAR
           </v-btn>
           <v-btn 
           color="green" 
           dark
           small
           @click="$store.dispatch('cambiarEstadoTrabajador', {
             id: denuncias.id_trabajador_denunciado,
             estado: false
           })"
           >DESBLOQUEAR
           </v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
      
      <v-flex xs12 pt-5 v-if="obtenerPagos">
        <!--<v-btn>LISTA DE PAGOS</v-btn>-->
        PAGOS
      </v-flex>

<v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer>
<v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer>

        <v-expansion-panel>
          
          <v-expansion-panel-content
          v-for="mes in meses" :key="mes.id"
          >
            <template v-slot:header>
              <div>{{ mes.nombre }}</div>
            </template>
            <v-card v-for="(pagos, index) in obtenerPagos" :key="index">
              <v-card-text v-if="pagos.fecha.substring(5,7) === String(mes.id) || pagos.fecha.substring(5,6) === String(mes.id)"> Nro Comprobante: {{pagos.comprobante}} - Año: {{pagos.fecha.substring(0,4)}}  </v-card-text>
            </v-card>
          </v-expansion-panel-content> 

        </v-expansion-panel>

    </v-layout>
  </v-container>
</template>

<script>
import nav from '../_nav'
import firebase, { firestore } from 'firebase'
import objetoFB from '@/api/firebaseConfig'
import fbase from '@/api/firebaseConfig.js'
import firebaseconfigobject from '@/api/firebaseConfig'
//import Vuetify from 'vuetify'

export default {
  name: 'DefaultLayout',
  components: {
  },
  data () {
    return {
      mensaje:'',
      denunciastotales: firebaseconfigobject.db.ref('/denuncias'),
      lista: '',
      meses: [
        {
          id: 1,
          nombre: 'Enero'
        },
        {
          id: 2,
          nombre: 'Febrero'
        },
        {
          id: 3,
          nombre: 'Marzo'
        },
        {
          id: 4,
          nombre: 'Abril'
        },
        {
          id: 5,
          nombre: 'Mayo'
        },
        {
          id: 6,
          nombre: 'Junio'
        },
        {
          id: 7,
          nombre: 'Julio'
        },
        {
          id: 8,
          nombre: 'Agosto'
        },
        {
          id: 9,
          nombre: 'Septiembre'
        },
        {
          id: 10,
          nombre: 'Octubre'
        },
        {
          id: 11,
          nombre: 'Noviembre'
        },
        {
          id: 12,
          nombre: 'Diciembre'
        }
        
      ]
    }
  },
  watch: {

  },
  computed: {
 
    user () {
        return this.$store.getters.user
    },
    administradorcito(){
      return this.$store.getters.setListaDenuncias
    },

    obtenerLista(){
      return this.$store.getters.getListaDenuncias
    },

    obtenerPagos(){
      return this.$store.getters.getListaPagos
    },

    obtenerMes(){
      return this.$$store.getters.getListaPagos.fecha
    },
    obtenerContador(){
      return this.$store.getters.getContadorMesDic
    },
  
  },
 
  mounted: function () {

    this.$store.dispatch('generandolistadenuncias')
    this.$store.dispatch('obteniendoPagos')
  },
  methods: {


    enviarMensaje(){
        console.log('Enviaste el mensaje...', this.mensaje, this.user);
        firebaseconfigobject.db.ref('/chat').push({
        id_autentificacion: this.user.uid, //es esto
        mensaje_chat: this.mensaje,
      })
    },

    listaDenuncias(){
      return new Promise((resolve, reject) => {
        let self = this
        //let lista = []
        firebaseconfigobject.db.ref('/denuncias').on("value", function(snapshot) {
          snapshot.forEach(function(childSnapshot){
            let dato = childSnapshot.val()
          });
          lista.push(dato)
          resolve('ok')
      })
    })
  },

  obteniendoPagos(){
    let self = this
    let listaPagos = []
    var ref = fbase.db.ref('/pagos_trabajadores');
    ref.orderByChild('id_trabajadores').on("child_added", function(snapshot){
      //console.log(snapshot.key + " WAS " + snapshot.val().apellido_trabajador_denunciado);
      let dato = snapshot.val();//nuevo
      listaPagos.push(dato)//nuevo
    });
    
    return listaPagos;
    //console.log("a ver los pagos: ", listaPagos);
  },
  /*obteniendoMesPagos(){
        let self = this
        let listaPagos = []
        var ref = fbase.db.ref('/pagos_trabajadores');
        ref.orderByChild('id_trabajadores').on("child_added", function(snapshot){
          //console.log(snapshot.key + " WAS " + snapshot.val().apellido_trabajador_denunciado);
          let fechita = snapshot.val().fecha.substring(5,7);//nuevo
          listaPagos.push(fechita)//nuevo
        });
        //return listaPagos;
        console.log("a ver las fechitas breeeeo: ", listaPagos);
        //commit('resultadoListaPagos', listaPagos);
      },*/
}
}

</script>