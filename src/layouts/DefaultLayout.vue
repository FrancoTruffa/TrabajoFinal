<template>
  <v-app dark>
    <v-navigation-drawer
    v-model="drawer"
    fixed 
     color="color:#012c4f"
    app
    >
    <v-text class="nav-header">{{ dateNow }}</v-text><br> 
    <!-- Nombre, foto etc -->
    
    <v-list class="pa-0">
      <v-list-tile avatar>
        <v-avatar  size="48px"  class="mr-3">
          <v-img :src="user.photoURL" dark left></v-img>
        </v-avatar>
        <v-list-tile-content>
          <v-list-tile-title v-html="userName">{{ userName }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile  v-if="categoria === 'trabajador'" :class=" ((pago) ? 'success' : 'error') + ' darken-2 text-xs-center mt-2'">
        <v-list-tile-content>
          <v-list-tile-title v-html="(pago) ? 'Usted tiene la cuenta al dia ' : 'Usted debe abonar la membresia'"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    
    <!-- Lista de icono y titulos -->
    <v-list dense> 

        <v-divider class="my-2" my-5></v-divider>
        
        <v-list-tile  v-if="categoria === 'trabajador'" v-on:click="noti();drawer=false" ><!-- :to="'/PerfilTrabajador/' + user.uid " -->
          <v-list-tile-action>
            <v-badge color="grey" right>
            <span slot="badge">{{ numTareas }}</span>
            <v-icon medium color="#01579B">fas fa-bell</v-icon>
            </v-badge >

          </v-list-tile-action>
          <v-list-tile-content class="white--text">
            <v-list-tile-title>Solicitudes</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
                <v-list-tile v-if="categoria === 'trabajador'" v-on:click="disponibilidad();drawer=false" ><!-- :to="'/PerfilTrabajador/' + user.uid " -->
          <v-list-tile-action>
            <v-icon  color="#01579B"  >fas fa-clock</v-icon>
          </v-list-tile-action>
          <v-list-tile-content class="white--text">
            <v-list-tile-title>No disponibilidad</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile  v-if="categoria === 'trabajador'" :to="'/FormasPago/' + user.uid "><!-- :to="'/PerfilTrabajador/' + user.uid " -->
          <v-list-tile-action>
            <v-badge color="grey" right>
            <v-icon medium color="#01579B">fas fa-file-invoice-dollar</v-icon>
            </v-badge >
          </v-list-tile-action>
          <v-list-tile-content class="white--text">
            <v-list-tile-title>Pagar membresía</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile  v-if="categoria === 'cliente'" v-on:click="noti();drawer=false" ><!-- :to="'/PerfilTrabajador/' + user.uid " -->
          <v-list-tile-action>
            <v-badge color="grey" right>
            <v-icon medium color="#01579B">fas fa-clipboard-check</v-icon>
            </v-badge >
          </v-list-tile-action>
          <v-list-tile-content class="white--text">
            <v-list-tile-title>Solicitudes</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider class="my-2" my-5></v-divider>

        <v-list-tile v-on:click="perfilUsuario();drawer=false" ><!-- :to="'/PerfilTrabajador/' + user.uid " -->
          <v-list-tile-action>
            <v-icon  color="#01579B">fas fa-user</v-icon>
          </v-list-tile-action>
          <v-list-tile-content class="white--text">
            <v-list-tile-title>Perfil</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-on:click="home();drawer=false" ><!-- :to="'/PerfilTrabajador/' + user.uid " -->
          <v-list-tile-action>
            <v-icon  color="#01579B"  >fas fa-home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content class="white--text">
            <v-list-tile-title>Inicio</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-on:click="admin();drawer=false" v-if="user.displayName === 'Franco Truffa'">
          <v-list-tile-action>
            <v-icon  color="#01579B"  >fas fa-home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content class="white--text">
            <v-list-tile-title>Administrador</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider class="my-2" my-5></v-divider>
        <v-list-tile @click="dialog = true;" ><!-- :to="'/Logout/'"-->
          <v-list-tile-action>
            <v-icon  color="#01579B">fas fa-sign-out-alt</v-icon>
          </v-list-tile-action>
          <v-list-tile-content class="white--text">
            <v-list-tile-title>Salir</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

            <v-dialog v-model="dialog" width="500">
              <v-card>
                <v-card-title class="headline"> ¿Usted realmente quiere salir?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red darken-1"  @click="dialog = false">Cancelar</v-btn>
                  <v-btn color="blue darken-1"  :to="'/Logout/'">Si, deseo salir</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

  
        <v-divider class="my-2" my-5></v-divider>
    </v-list>
  </v-navigation-drawer>


  <v-toolbar color="#012c4f" absolute dark fixed app flat>
    <v-toolbar-side-icon v-on:click.stop="drawer = !drawer"></v-toolbar-side-icon>
    <v-img src="./images/herr.png" contain height="45px" ></v-img>
  
  </v-toolbar>
  <router-view></router-view>
</v-app>


</template>
<script>
import nav from '../_nav'
import firebase, { firestore } from 'firebase'
import objetoFB from '@/api/firebaseConfig'


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
      leftDays: this.getLastDays()
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
    redirect (url, redirect) {
      if (!redirect) {
        this.$router.push(url)
      } else {
        window.location.href = url
      }
    },
    updateMisPromos () {
      var self = this
      this.countMisPromos = 0
      getCountMisPromos(self, { 'id_usuario': self.userId }, function (result) {
        var number = parseInt(result)
        if (Number.isInteger(number)) {
          self.countMisPromos += number
        }
      })
      getCountMisCupones(self, { 'id_usuario': self.userId }, function (result) {
        var number = parseInt(result)
        if (Number.isInteger(number)) {
          self.countMisPromos += number
        }
      })
    },
    getDateNow () {
      var days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
      var months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
      var today = new Date()
      var dd1 = today.getUTCDay()
      var dd2 = today.getDate()
      var mm = today.getUTCMonth()
      return days[dd1] + ' ' + dd2 + ' de ' + months[mm]
    },
    getLastDays () {
      var today = new Date()
      var dd1 = today.getUTCDay()
      return 7 - dd1
    },
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
    home(){
      if (this.categoria == 'trabajador') {
        this.$router.push('/MainTrabajador')
      } else {
        this.$router.push('/Main')
      }
    },
    admin(){
      if (this.user.uid == 'b7YNiwK6ZGSYWurNK1MPnpz2DLq1') {
        this.$router.push('/Administrador')
      } else {
        this.$router.push('/Main')
      }
      console.log('quiero ver que onda user: ',this.user)
    },
    disponibilidad(){
      if (this.categoria == 'trabajador') {
        this.$router.push('/Disponibilidad')
      }
    },
    noti(){
      if (this.categoria == 'trabajador') {
        this.$router.push('/Notificaciones')
      } else {
        this.$router.push('/NotificacionesClientes')
      }
    }
  }
}


</script>
