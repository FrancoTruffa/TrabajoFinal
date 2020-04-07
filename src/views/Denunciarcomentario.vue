<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm4 pt-5>
        
          <v-card
            class="mx-auto"
            max-width="600"  
          >
            <v-card-title>
              <span class="title font-weight" style="color: #F5F5F5">Estimado usuario, si usted ve una irregularidad en los
                 comentarios, por favor, haganoslo saber.</span>
                 <br>
              <span class="title font-weight" style="color: #FFF59D">Usted puede notificarnos enviando un mail
                 a la siguiente direccion: </span>
              
              <span class="title font-weight" style="color: #FFFFFF">cordobaservice.cba@gmail.com</span>
              <br><br><br>
              <span class="title font-weight" style="color: #FFF59D">o escribiendonos un mensaje: </span>

            </v-card-title>

            <v-card>
                    <v-card-text>
                        <div class="text-xs-center">
                            <v-chip>
                                <v-avatar>
                                    <img :src="user.photoURL">
                                </v-avatar>
                                {{user.displayName}} 
                            </v-chip>
                        </div>
                    </v-card-text>

                    <v-card-text>
                        <v-form @submit.prevent="enviarMensaje() && clearMessage()">
                            <v-text-field v-model="mensaje" label="escribe tu mensaje aqui"></v-text-field>
                        </v-form>
                    </v-card-text>
                  
                </v-card>

            <v-card-title>
                <span class="title font-weight" style="color: #F08080">Esto lo hacemos asi, porque queremos que quede un registro formal 
                  de la falta que se ha cometido. Por favor, disculpe las molestias.</span>
            </v-card-title>

      <v-list-tile class="grow">
        <v-list-tile-avatar color="grey darken-3">
        <i class="fas fa-tools"></i>
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>Administración Córdoba Service</v-list-tile-title>
        </v-list-tile-content>

      </v-list-tile>

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

data () {
    var a  = 0;
    return {
      mensaje:'',
      denunciastotales: firebaseconfigobject.db.ref('/denuncias'),
    }
  },
  watch: {

  },
  computed: {
 
    user () {
        return this.$store.getters.user
    },

  },
 
  mounted: function () {

  },
  methods: {

    enviarMensaje(){
        console.log('Enviaste el mensaje...', this.mensaje);
        firebaseconfigobject.db.ref('/chat').push({
        id_autentificacion: this.user.uid, //es esto
        mensaje_chat: this.mensaje,
        usuario: this.user.displayName
      })
    },
    clearMessage () {
        this.mensaje = ''
    },
  
  }

  
}
</script>