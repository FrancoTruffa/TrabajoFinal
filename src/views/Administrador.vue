<template>
  <v-container>
    <v-layout row wrap>
      <v-flex v-if="obtenerLista" xs12 pt-5>
        <div 
        class="title mb-3"
        style="text-align: center"
        >Denuncias de Clientes</div>
        
        <v-card v-for="(denuncias, index) in obtenerLista" :key="index">
          <v-card-text>
          <a style="color:#FFFFFF;" >{{ denuncias.nombre_cliente }}</a> 
          DENUNCIO A <a :href="'#/VerTrabajador/' + denuncias.id_trabajador_denunciado" style="color:#FFFFFF;">{{ denuncias.apellido_trabajador_denunciado }} {{denuncias.nombre_trabajador_denunciado}}</a>
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

      <v-flex v-if="obtenerListaTrabajadores" xs12 pt-5>
        <div 
        class="title mb-3"
        style="text-align: center"
        >Denuncias de Trabajadores</div>
        
        <v-card v-for="(denun, index) in obtenerListaTrabajadores" :key="index">
          <v-card-text style="font-size: 14px">
            <a :href="'#/VerTrabajador/' + denun.id_trabajador" style="color:#FFFFFF;">{{denun.nombre_trabajador}} {{denun.apellido_trabajador}}</a>
           DENUNCIO A <a style="color:#FFFFFF;">{{ denun.apellido_cliente }} {{denun.nombre_cliente}}</a> por el siguiente comentario en su perfil: "{{denun.comentario}}"
           <br>
           <v-btn 
           color="red" 
           dark
           small
           @click="$store.dispatch('cambiarEstadoTrabajador', {
             id: denun.id_cliente,
             estado: true
           })"
           >BLOQUEAR
           </v-btn>
           <v-btn 
           color="green" 
           dark
           small
           @click="$store.dispatch('cambiarEstadoTrabajador', {
             id: denun.id_cliente,
             estado: false
           })"
           >DESBLOQUEAR
           </v-btn>
          </v-card-text>
        </v-card>
      </v-flex>


      <v-flex xs12 pt-5 v-if="obtenerPagos">
        <!--<v-btn>LISTA DE PAGOS</v-btn>-->
        <div 
          class="title mb-3"
          style="text-align: center"
        >Lista de Pagos</div>
        
      </v-flex>

      <v-expansion-panel>
        <v-expansion-panel-content>

          <template v-slot:header>
            <div>2019 | Ganancias: $550</div>
          </template>

          <v-card>
            <v-card-text>
              <v-expansion-panel>
                <v-expansion-panel-content           v-for="mes in meses" :key="mes.id"
>

                  <template v-slot:header>
              <div v-if="mes.nombre == 'Enero'">{{ mes.nombre }} |  Cantidad: 0 -  <i class="fas fa-dollar-sign"></i> 0</div>
              <div v-if="mes.nombre == 'Febrero'">{{ mes.nombre }} |  Cantidad: 0 -  <i class="fas fa-dollar-sign"></i> 0</div>
              <div v-if="mes.nombre == 'Marzo'">{{ mes.nombre }} |  Cantidad: 0 - <i class="fas fa-dollar-sign"></i> 0</div>
              <div v-if="mes.nombre == 'Abril'">{{ mes.nombre }} |  Cantidad: 0 - <i class="fas fa-dollar-sign"></i> 0</div>
              <div v-if="mes.nombre == 'Mayo'">{{ mes.nombre }} |  Cantidad: 0 - <i class="fas fa-dollar-sign"></i> 0</div>
              <div v-if="mes.nombre == 'Junio'">{{ mes.nombre }} |  Cantidad: 0 - <i class="fas fa-dollar-sign"></i> 0</div>
              <div v-if="mes.nombre == 'Julio'">{{ mes.nombre }} |  Cantidad: 0 - <i class="fas fa-dollar-sign"></i> 0</div>
              <div v-if="mes.nombre == 'Agosto'">{{ mes.nombre }} |  Cantidad: 0 - <i class="fas fa-dollar-sign"></i> 0</div>
              <div v-if="mes.nombre == 'Septiembre'">{{ mes.nombre }} |  Cantidad: 0 - <i class="fas fa-dollar-sign"></i> 0</div>
              <div v-if="mes.nombre == 'Octubre'">{{ mes.nombre }} |  Cantidad: 1 - <i class="fas fa-dollar-sign"></i> 50</div>
              <div v-if="mes.nombre == 'Noviembre'">{{ mes.nombre }} |  Cantidad: 0 - <i class="fas fa-dollar-sign"></i> 0</div>
              <div v-if="mes.nombre == 'Diciembre'">{{ mes.nombre }} |  Cantidad: 10 - <i class="fas fa-dollar-sign"></i> 500</div>
            </template>
            <v-card v-for="(pagos, index) in obtenerPagos" :key="index">
              <v-card-text v-if="pagos.fecha.substring(5,7) === String(mes.id) && pagos.fecha.substring(0,4) === '2019'">Nro Comprobante: {{pagos.comprobante}} - Año: {{pagos.fecha.substring(0,4)}}</v-card-text>
            </v-card>

                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-card-text>

            
           
            
          </v-card>

        </v-expansion-panel-content>
      </v-expansion-panel>


       <v-expansion-panel>
        <v-expansion-panel-content>

          <template v-slot:header>
            <div>2020 | Ganancias: $350</div>
          </template>

          <v-card>
            <v-card-text>
              <v-expansion-panel>
                <v-expansion-panel-content           v-for="mes in meses" :key="mes.id"
>

                  <template v-slot:header>
              <div v-if="mes.nombre == 'Enero'">{{ mes.nombre }} |  Cantidad: 0 - <i class="fas fa-dollar-sign"></i> 0</div>
              <div v-if="mes.nombre == 'Febrero'">{{ mes.nombre }} |  Cantidad: 0 - <i class="fas fa-dollar-sign"></i> 0</div>
              <div v-if="mes.nombre == 'Marzo'">{{ mes.nombre }} |  Cantidad: 2 - <i class="fas fa-dollar-sign"></i> 100</div>
              <div v-if="mes.nombre == 'Abril'">{{ mes.nombre }} |  Cantidad: 1 - <i class="fas fa-dollar-sign"></i> 50</div>
              <div v-if="mes.nombre == 'Mayo'">{{ mes.nombre }} |  Cantidad: 2 - <i class="fas fa-dollar-sign"></i> 100</div>
              <div v-if="mes.nombre == 'Junio'">{{ mes.nombre }} |  Cantidad: 0 - <i class="fas fa-dollar-sign"></i> 0</div>
              <div v-if="mes.nombre == 'Julio'">{{ mes.nombre }} |  Cantidad: 0 - <i class="fas fa-dollar-sign"></i> 0</div>
              <div v-if="mes.nombre == 'Agosto'">{{ mes.nombre }} |  Cantidad: 0 - <i class="fas fa-dollar-sign"></i> 0</div>
              <div v-if="mes.nombre == 'Septiembre'">{{ mes.nombre }} |  Cantidad: 0 - <i class="fas fa-dollar-sign"></i> 0</div>
              <div v-if="mes.nombre == 'Octubre'">{{ mes.nombre }} |  Cantidad: 0 - <i class="fas fa-dollar-sign"></i> 0</div>
              <div v-if="mes.nombre == 'Noviembre'">{{ mes.nombre }} |  Cantidad: 1 - <i class="fas fa-dollar-sign"></i> 50</div>
              <div v-if="mes.nombre == 'Diciembre'">{{ mes.nombre }} |  Cantidad: 1 - <i class="fas fa-dollar-sign"></i> 50</div>
            </template>
            <v-card v-for="(pagos, index) in obtenerPagos" :key="index">
              <v-card-text v-if="pagos.fecha.substring(5,7) === String(mes.id) && pagos.fecha.substring(0,4) === '2020'">Nro Comprobante: {{pagos.comprobante}} - Año: {{pagos.fecha.substring(0,4)}}</v-card-text>
            </v-card>

                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-card-text>

            
           
            
          </v-card>

        </v-expansion-panel-content>
      </v-expansion-panel>

      
      <v-flex>
        <br>
        <div style="text-align: center; font-size: 14px;">Ganancias Totales: $900</div>
      </v-flex>


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
    var a  = 0;
    return {
      mensaje:'',
      denunciastotales: firebaseconfigobject.db.ref('/denuncias'),
      lista: '',
      contadorMeses2: [],

      meses: [
        {
          id: '1-',
          nombre: 'Enero'
        },
        {
          id: '2-',
          nombre: 'Febrero'
        },
        {
          id: '3-',
          nombre: 'Marzo'
        },
        {
          id: '4-',
          nombre: 'Abril'
        },
        {
          id: '5-',
          nombre: 'Mayo'
        },
        {
          id: '6-',
          nombre: 'Junio'
        },
        {
          id: '7-',
          nombre: 'Julio'
        },
        {
          id: '8-',
          nombre: 'Agosto'
        },
        {
          id: '9-',
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

    obtenerListaTrabajadores(){
      return this.$store.getters.getListaDenunciasTrabajadores
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
    this.$store.dispatch('generandolistadenunciasTrabajadores')
    this.$store.dispatch('CargarDenunciasTrabajadores')
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

  contarMeses(){
    let self = this
    let listaPagos = []
    var ref = fbase.db.ref('/pagos_trabajadores');
    ref.orderByChild('id_trabajadores').on("child_added", function(snapshot){
      //console.log(snapshot.key + " WAS " + snapshot.val().apellido_trabajador_denunciado);
      let dato = snapshot.val();//nuevo
      //pagos.fecha.substring(5,7) === String(mes.id) || pagos.fecha.substring(5,6) === String(mes.id)
      if(dato.fecha.substring(5,7) == this.contadorMeses.id || dato.fecha.substring(5,6) == this.contadorMeses.id){
        //this.contadorMeses.contador.val()+1;
        this.contadorMeses2.push(contadorMeses.id);
      }
      //listaPagos.push(this.contadorMeses)//nuevo
    });
    console.log("mostrame la listita breeeo: ",this.contadorMeses2);
    
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

}
}

</script>