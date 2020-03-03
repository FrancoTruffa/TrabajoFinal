<!--<template>
    <v-layout>
        <v-flex>
            <v-card>
                <v-card-text>
                    <h3>Bienvenido Usuario</h3>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>-->

<template>
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
import firebaseconfigobject from '@/api/firebaseConfig'

export default {
  name: 'DefaultLayout',
  components: {
  },
  data () {
    return {
      mensaje:''
    }
  },
  watch: {

  },
  computed: {
    isLogin () {
      return this.$store.getters.login
    },
    user () {
        return this.$store.getters.user
    },
    categoria () {
      return this.$store.getters.categoria
    },
    numTareas () {
      return this.$store.getters.numTareas
    },
    pago () {
      return this.$store.getters.getPago
    }
  },
 
  mounted: function () {
    
  },
  methods: {


    enviarMensaje(){
        console.log('Enviaste el mensaje...', this.mensaje);
        firebaseconfigobject.db.ref('/chat').push({
        id_autentificacion: this.user.uid, //es esto
        mensaje_chat: this.mensaje,
      })
    }

  }
}




</script>