<template>
<v-app style="background-color:#012c4f">
   <v-container style="background-color:#012c4f" align-center>
     <v-layout   wrap>

         
          <v-flex pt-5>
            <h2 class="blue darken-3 text-xs-center white--text" > Por favor complete los siguientes datos para poder continuar</h2>
             <v-row justify="center">
                <v-col cols="12" sm="10" md="8" lg="6">
                <v-card ref="form">
                    <v-card-text>
          <v-text-field v-model="usuario.nombre" placeholder="Juan" :counter="10" mask="Aaaaaaaaaa" label="Nombre" required ></v-text-field>
   
   
          <v-text-field v-model="usuario.apellido" placeholder="Perez" :counter="20" mask="Aaaaaaaaaa Aaaaaaaaaa" label="Apellido" required   ></v-text-field>
  
                    <v-text-field
                        ref="usuario.telefono"
                        v-model="usuario.telefono"
                        :rules="[() => !!usuario.telefono || 'El campo es requerido']"
                        :error-messages="errorMessages"
                        label="Telefono"
                         mask="###########################"
                        placeholder="03515749653"
                        required
                    ></v-text-field>

                    <v-text-field
                        ref="usuario.domicilio"
                        v-model="usuario.domicilio"
                        :rules="[() => !!usuario.domicilio || 'El campo es requerido']"
                        label="Domicilio"
                        required
                        placeholder="Juan Del Campillo"
                    ></v-text-field>
                    <v-text-field
                        mask="######################"
                        ref="usuario.dni"
                        v-model="usuario.dni"
                        :rules="[() => !!usuario.dni || 'El campo es requerido']"
                        label="Documento"
                        required
                        placeholder="36523214"
                    ></v-text-field>

                    </v-card-text>
                    <v-divider class="mt-12"></v-divider>
                    <v-card-actions>
                   
                    <v-spacer></v-spacer>
                    <v-slide-x-reverse-transition>
                        <v-tooltip
                        v-if="formHasErrors"
                        left
                        >
                        <template v-slot:activator="{ on }">
                            <v-btn
                            icon
                            class="my-0"
                            @click="resetForm"
                            v-on="on"
                            >
                            <v-icon>mdi-refresh</v-icon>
                            </v-btn>
                        </template>
                        <span>Refresh form</span>
                        </v-tooltip>
                    </v-slide-x-reverse-transition>
                    <v-btn @click="onSignup" rigth color="success" 
                           :disabled="!(usuario.dni.length > 0 && usuario.domicilio.length > 0 && usuario.telefono > 4)" 
                           > Registrar
                           </v-btn>
                    </v-card-actions>
                </v-card>
                </v-col>
            </v-row>
        </v-flex>
   </v-layout>
 </v-container>
</v-app> 
</template>

<script>
import firebaseconfigobject from '@/api/firebaseConfig'
import firebase, { firestore } from 'firebase'
import objetoFB from '@/api/firebaseConfig'
export default {

 data: vm => ({
   usuario: {
     email: '',
     contrasenia:'',
      nombre: '',
      apellido: '',
      nombre_usuario: '',
      domicilio: '',
      telefono:'',
      dni: '',
      rol:'cliente',
      uid: ''
    },
    googleAuth: false,
   lista: [],
   show1: false,
 }),
 mounted: function () {
   let self = this
   let loginType = localStorage.getItem('login_type')
   if (loginType) {
     firebaseconfigobject.auth().getRedirectResult().then(function(result) {
       var credential = result.credential
        if (credential) {
          self.googleAuth = true
          self.usuario.email = result.additionalUserInfo.profile.email
          self.usuario.nombre = result.additionalUserInfo.profile.given_name
          self.usuario.apellido = result.additionalUserInfo.profile.family_name
          self.usuario.uid = result.user.uid
        }
      })
   }
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

 methods: {
   main(){
     this.$router.push('main')
  },
  onSignup () {
    let self = this
    console.log("que hace est0000o: ", this.googleAuth)
    if(!this.googleAuth) {
      firebaseconfigobject.db.ref('/usuarios').push({
        id_autentificacion: this.user.uid, //es esto
        email: this.user.email,
        nombre: this.usuario.nombre,
        apellido: this.usuario.apellido,
        foto: this.user.photoURL,
        telefono: this.usuario.telefono,
        domicilio: this.usuario.domicilio,
        dni: this.usuario.dni,
        rol: 'Cliente',

      })
      this.$router.push('Main')

    
      
    } else {
    this.$store.dispatch('signUserUp', {email: self.usuario.email, contrasenia: self.usuario.contrasenia}).then( (result) => {
     
      firebaseconfigobject.db.ref('/usuarios').push({
        id_autentificacion: this.user.uid, //es esto
        email: this.user.email,
        nombre: this.usuario.nombre,
        apellido: this.usuario.apellido,
        foto: this.user.photoURL,
        nombre_usuario: this.usuario.nombre_usuario,
        telefono: this.usuario.telefono,
        domicilio: this.usuario.domicilio,
        dni: this.usuario.dni,
        rol: 'cliente',

      })
      this.$router.push('Main')
       
      //.then(result =>{})
    }, error => {
      window.alert("NO ESTAN TODOS LOS CAMPOS COMPLETOS, POR FAVOR LLENAR LOS CAMPOS FALTANTES")
      })
    } 
    },
    onDismissed () {
      window.alert("no se amigo toy probando")
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