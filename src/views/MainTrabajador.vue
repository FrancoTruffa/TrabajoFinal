<template>
  <v-container class="text-xs-center" fluid fill-height style="background-color:#012c4f">
    <v-layout row wrap> <!--     <v-layout row wrap v-if="!trabajadorcito.bloqueado"> -->
      <v-flex  xs12 pt-5>
        <v-btn @click="trabajadorActual();">CLICK</v-btn>
      </v-flex>
    </v-layout>
    <v-layout> <!--    <v-layout v-else>-->
      <v-flex xs12 pt-5>
      USUARIO PUTO
      </v-flex>
    </v-layout>
 </v-container>

</template>

<script>
import EditarHorarios from "@/components/EditarHorarios";
import firebase, { firestore } from 'firebase'
import objetoFB from '@/api/firebaseConfig'
import firebaseconfigobject from '@/api/firebaseConfig'
import fbase from '@/api/firebaseConfig.js'


  export default {
    components:{
      EditarHorarios
    },
    data () {
      
      return {
        dialog: false,
        lista2: [],
        datoTrabajadorEstado: false,
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      },
      trabajadorcito () {
        console.log(this.datoTrabajadorEstado)
    },

    },
    mounted () { 
      this.$store.dispatch('mostrarNotificaciones', this.user.uid)
      
    },
    methods: {
      trabajadorActual(){
        var userT = firebase.auth().currentUser;
        let self = this;
        let datito;
        var ref = firebaseconfigobject.db.ref('/usuarios');
        ref.orderByChild('id_autentificacion').on("child_added", function(snapshot){
          if(userT.uid === snapshot.val().id_autentificacion){
            datito = snapshot.val();
            }
        });
          console.log(datito);    
      }
    }
  }
</script>