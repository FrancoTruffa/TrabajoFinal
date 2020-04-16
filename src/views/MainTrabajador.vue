<template>
  <v-container class="text-xs-center" fluid fill-height style="background-color:#012c4f">
    <v-layout row wrap v-if="trabajadorcito[0].bloqueado == false || trabajadorcito[0].bloqueado == null"> <!--     <v-layout row wrap v-if="!trabajadorcito.bloqueado"> -->
      <v-flex  xs12 pt-5 >
        <EditarHorarios></EditarHorarios>
      </v-flex>
    </v-layout>
    <v-layout v-else> <!--    <v-layout v-else>-->
      <v-flex xs12 pt-5>
    <v-spacer></v-spacer>
    <br><br><br><br>

  <v-card
    class="mx-auto"
    max-width="600"
    
  >
    <v-card-title>
      <span class="title font-weight-light" style="color: #FAFAFA">SU CUENTA HA SIDO BLOQUEADA</span>
    </v-card-title>

    <v-card-text class="headline font-weight-bold">
      Por favor, enviar un mail a la administracion:
      <a style="color:#E57373">cordobaservice.cba
        @gmail.com</a>
    </v-card-text>
    

    <v-card-actions>
      <v-list-tile class="grow">
        <v-list-tile-avatar color="grey darken-3">
          <!--<v-img
            class="elevation-6"
            src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
          ></v-img>-->
        <i class="fas fa-tools"></i>
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>Administración Córdoba Service</v-list-tile-title>
        </v-list-tile-content>

      </v-list-tile>
    </v-card-actions>
  </v-card>




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
      console.log('A VER SI EL TRABAJADORCITO ME TRAE DATO DEL USUARIO ENTERO O SOLO DE LOS TRABAJADORES: ', this.trabajadorcito[0])
      
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