<template>
  <v-container class="text-xs-center" fluid fill-height style="background-color:#012c4f">
    <v-layout row wrap v-if="trabajadorcito[0].bloqueado == false || trabajadorcito[0].bloqueado == null"> <!--     <v-layout row wrap v-if="!trabajadorcito.bloqueado"> -->
      <v-flex  xs12 pt-5 >
        <EditarHorarios></EditarHorarios>
      </v-flex>
    </v-layout>
    <v-layout v-else> <!--    <v-layout v-else>-->
      <v-flex xs12 pt-5>
      SU CUENTA ESTA BLOQUEADA, POR FAVOR COMUNIQUESE CON NOSOTROS ENVIANDO UN MAIL A LA ADMINISTRACION: 
      cordobaservice.cba@gmail.com
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
  
    data: () => ({
        dialog: false,
        lista2: [],
        datoTrabajadorEstado: '',
    }),  
    components:{
      EditarHorarios
    },
    computed: {
      user () {
        return this.$store.getters.user
      },
      trabajadorcito () {
         return this.$store.getters.getTrabajadorActual
    },

    },
    mounted: function() { 
      //this.$store.dispatch('mostrarNotificaciones', this.user.uid)     var userT = firebase.auth().currentUser;

      console.log("mostrameeee", this.user)
      this.$store.dispatch('TraerTrabajadorActual', this.user)
    },
    methods: {
      trabajadorActual(){
        var userT = fbase.auth.currentUser;
        let self = this;
        let datito;
        var ref = firebaseconfigobject.db.ref('/usuarios');
        ref.orderByChild('id_autentificacion').on("child_added", function(snapshot){
          if(userT.uid == snapshot.val().id_autentificacion){
            datito = snapshot.val();
            }
        });
        this.datoTrabajadorEstado = datito;
        },
    }
  }
</script>