<template>
  <v-app id="login" style="background-color:#012c4f">
    <v-content>
      <v-container>
        <v-layout justify-center row wrap>

          <v-flex xs8 sm8 py-2 class="login-logo">
            <v-img  src="./images/herr.png"></v-img> 
          </v-flex>
          <v-flex xs10 sm6 text-xs-center>
            <v-form @submit.prevent="onSignIn" @sumit.prevent="authGoogle">
              <v-text-field v-if="false" @focus="isFocus = true" @blur="isFocus = false" :disabled="!loginSuccess" color="cyan" name="login" placeholder="Usuario" v-model="usuario" type="email" class="pt-0"></v-text-field>
              <v-text-field v-if="false"  @focus="isFocus = true" @blur="isFocus = false" :disabled="!loginSuccess" color="cyan" id="password" name="password" v-model="contrasena" placeholder="Contraseña" type="password" class="pt-0"></v-text-field>
                <v-btn v-if="false" type="submit" value="acceder" color="success">Acceder</v-btn>
                <v-btn type="button" color="error" @click="authGoogle"><v-icon class="mr-2">fab fa-google</v-icon> <b>ACCERDER GOOGLE</b></v-btn>

            </v-form>

          <v-spacer></v-spacer>
        

          <v-spacer></v-spacer>
          <v-btn v-if="false" :disabled="!loginSuccess" color="light-blue lighten-1" class="btn-cs" block center v-on:click="registro()">Crear Cuenta</v-btn>
          <v-spacer></v-spacer>
          
          
      </v-flex>
    </v-layout>
  </v-container>

</v-content>
</v-app>
</template>

<script>
import Vue from 'vue'
import firebase, { firestore } from 'firebase'
import objetoFB from '@/api/firebaseConfig'

export default {
  components: {
    // facebookLogin
  },
  data: () => ({
    usuario: '',
    contrasena: '',
    isFocus: false,
    loginSuccess: true,
    authWindow: null,
    showDismissibleAlert: false,
    alert: {
      color: 'danger',
      message: ''
    },
  }),

  beforeMount: function () {
    /*this.$store.dispatch('verifyUser').then(result => {
      if (result == 'trabajador') {
        this.$router.replace('/MainTrabajador')
      } else if (result == 'cliente') {
        this.$router.replace('/Main')
      }
    })*/
  },

  mounted: function () {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  },
  
  computed: {
    user () {
     return this.$store.getters.user
    },
    error () {
      return this.$store.getters.error
    },
    loading () {
      return this.$store.getters.loading
    }
  },


  watch: {
  },

  methods: {
    registro(){
    this.$router.push('Registrar')
    },
  
    login(){
      firebase
      .auth()
      .signInWithEmailAndPassword(this.usuario,this.contrasena)
      .then((user) => alert('Usuario Conectado '),(error) => console.error(error))
      .catch(function(error){
      var errorCode= error.code;
      var errorMessage=errormessage;
      });
    },

    authGoogle(){
      
      let self = this
      console.log('entrando por google')
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(function() {
        return firebase.auth().signInWithRedirect(provider)
      })
      this.$router.push('verificar')
      /*firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
          var token = result.credential.accessToken;
          console.log('token')
          console.log(token)
          /*console.log(result.user.uid)
          self.$store.dispatch('verifyUser', result.user.uid).then(result => {
          if(result === 'trabajador') {
              self.$router.push('PerfilTrabajador')
            } else {
              self.$router.push('main')
            }
          }, error =>{
            console.log(error)
            localStorage.setItem('login_type', 'Google')
            self.$router.push('verificar')}
          )
        } else {
          console.log('no esta logeado')
          var provider = new firebase.auth.GoogleAuthProvider();
          firebase.auth().signInWithRedirect(provider)
          //self.$router.push('verificar')
        }
      })*/
    },

    onSignIn(){
      this.$store.dispatch('signUserIn', {usuario: this.usuario, contrasena: this.contrasena}).then(result => {
        console.log(result)
          if(result === 'trabajador') {
            this.$router.push('PerfilTrabajador')
          } else {
            this.$router.push('main')
          }
        }, error =>{
          this.$router.push('login')}
      )
    },

    onDismissed () {
      this.$store.dispatch('clearError')
    },

  },


}
</script>

<style scoped>
.btn-cs {
  color: white !important;
}
</style>
