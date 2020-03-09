<!--<template>
    <v-container align-center fluid style="background-color:#012c4f">
        <v-layout align-center justify-center>
            <v-flex pt-5 xs12 md4>
                <v-card>
                    <v-card-text>
                        <div class="text-xs-right">
                            <v-chip>
                                <v-avatar>
                                    <img :src="user.photoURL">
                                </v-avatar>
                                mensaje de chat 
                            </v-chip>
                        </div>
                    </v-card-text>

                    <v-card-text>
                        <v-form @submit.prevent="enviarMensaje">
                            <v-text-field v-model="mensaje" label="escribe tu mensaje aqui"></v-text-field>
                        </v-form>
                        <v-btn @click="listaDenuncias2">
                          PRUEBA DENUNCIAS
                        </v-btn>
                    </v-card-text>

                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>-->

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
           color="red" 
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
    </v-layout>
  </v-container>
</template>
  


<script>
import nav from '../_nav'
import firebase, { firestore } from 'firebase'
import objetoFB from '@/api/firebaseConfig'
import fbase from '@/api/firebaseConfig.js'
import firebaseconfigobject from '@/api/firebaseConfig'

export default {
  name: 'DefaultLayout',
  components: {
  },
  data () {
    return {
      mensaje:'',
      denunciastotales: firebaseconfigobject.db.ref('/denuncias'),
      lista: ''
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
    
  generandolistadenuncias(){
    let self = this
    let lista = []
    var ref = firebaseconfigobject.db.ref('/denuncias');
    ref.orderByChild('id_cliente').on("child_added", function(snapshot){
      //console.log(snapshot.key + " WAS " + snapshot.val().apellido_trabajador_denunciado);
      let dato = snapshot.val();//nuevo
      lista.push(dato)//nuevo
    });
    return lista; //nuevo
  },
  
  },
 
  mounted: function () {

    this.$store.dispatch('generandolistadenuncias')
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

  listaDenuncias2(){
    console.log(this.$store.getters.getListaDenuncias);
    console.log(this.$store.getters.cargarDenunciasFiltro);
    console.log('Enviaste la denuncia...', this.administradorcito);
    console.log('usuario',this.user);
    console.log('viendo la lista',this.generandolistadenuncias);
    console.log('a ver si anda el store', this.obtenerLista)
  },
  mostrarDenuncias(){
    
  }
}
}

</script>