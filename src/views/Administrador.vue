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
      trabajadores: '',
      dialog:false,
      clientes:'',
      drawer: false,
      navItems: nav.items,
      userName: '',
      loginType: localStorage.getItem('login_type'),
      userId: localStorage.getItem('user_id'),
      fbId: localStorage.getItem('fb_id'),
      dateNow: this.getDateNow(),
      leftDays: this.getLastDays(),
      mensaje:''
    }
  },
  watch: {
    user: function (val) {
      this.userName = val.displayName
    }
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
  beforeCreate: function () {
    if(!(this.$store.getters.user !== null && this.$store.getters.user !== undefined)){
        this.$router.replace('login') 
    }
  },
  mounted: function () {
    if(this.user) {
      this.userName = this.user.displayName
    }
    if(this.categoria == 'trabajador'){
      this.$store.dispatch('verificarPago', this.user.uid).then(result => {
        if(!result){
          this.$router.replace('/MercadoPago')
        }
      })
    }
  },
  methods: {

    verperfil(){
      this.$router.push('Main')
    },
    perfilUsuario(){
      if (this.categoria == 'trabajador') {
        this.$router.push('/PerfilTrabajador')
      } else {
        this.$router.push('/PerfilCliente')
      }
    },
    admin(){
      if (this.user.displayName == 'Franco Truffa') {
        this.$router.push('/Administrador')
      } else {
        this.$router.push('/Main')
      }
      console.log('quiero ver que onda user: ',this.user)
    },

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