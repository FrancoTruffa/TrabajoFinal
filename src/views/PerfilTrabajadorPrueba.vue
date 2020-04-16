<template>  
  <v-container fluid style="background-color:#012c4f">
    <v-layout row wrap>
      <v-flex pt-5 xs12 class="pa-3 mb-3 feature-pane" v-if="trabajador">
                
        <v-tabs
          centered
          dark
          icons-and-text
          class="mt-x"
          color="transparent"
          grow
          active-class="white--text"
        >
          <v-tabs-slider color="white"></v-tabs-slider>

          <v-tab href="#tab1">
            Perfil
            <v-icon>person</v-icon>
          </v-tab>


          <v-tab href="#tab3">
            Comentarios
            <v-icon>fas fa-comments</v-icon>
          </v-tab>

          <v-tab-item value="tab1">
            <verContacto  :nombre="trabajadorcito[0].nombre" :apellido="trabajadorcito[0].apellido" :especialidad="trabajadorcito[0].especialidad" :serviciosEsp="trabajadorcito[0].serviciosEsp " :foto="trabajadorcito[0].foto " ></verContacto>
            <!--<verComentarios :nombre="trabajadorcito[0].rating" ></verComentarios>-->
          </v-tab-item>


          <v-tab-item value="tab3">
            <VerServiciosDos></verServiciosDos>
          </v-tab-item>

        </v-tabs>


      </v-flex>

    </v-layout>

  </v-container>
</template>

<script>

import VerContacto from "@/components/VerContacto";
import VerCalendario from "@/components/VerCalendario";
import VerComentarios from "@/components/VerComentarios";
import VerServicios from "@/components/VerServicios"
import VerServiciosDos from "@/components/VerServiciosDos";
import firebase from 'firebase'
import fb from '@/api/firebaseConfig'
import firebaseconfigobject from '@/api/firebaseConfig'


export default {
  components: {
    VerContacto,
    VerCalendario,
    VerComentarios,
    VerServicios,
    VerServiciosDos
  },
  data: () => ({
    dialog: false,
    menuHs:false,
    menu2: false,
    datoFecha: new Date().toISOString().substr(0, 10),
    tiempoFecha:'',
    time:null,
    nombreEvento:'',
    comentario: '',
    snackbar: {
     show: false,
     texto: ''
   }
  
  }),
  watch: {
    datoFecha: function (val) {
      this.filtro()
    },
    tiempoFecha: function (val) {
      this.filtro()
    },
    categoria: function (val) {
      this.filtro()
    },
    buscador: function (val) {
      this.filtro()
    },
    categoriaUser: function (val) {
      //console.log(val)
    }
  },
  computed:{
      categoriaUser () {
        return this.$store.getters.categoria
      },

  },
  methods: {
      filtro () {
        this.trabajador = this.$store.getters.cargarTrabajador.filter(item =>{

          let cantidad = item.noDisponible.length
          let cuenta = 0

          let fecha = new Date(this.datoFecha + ' ' + this.tiempoFecha)

          if (fecha.getTime() > 0) {
           for (let noDisponible of item.noDisponible) {
              let fecha_inicio = new Date(noDisponible.fecha_inicio + ' ' + noDisponible.hora_inicio)
              let fecha_fin = new Date(noDisponible.fecha_fin  + ' ' + noDisponible.hora_fin)
              if (fecha.getTime() < fecha_inicio.getTime() || fecha.getTime() > fecha_fin.getTime()) {
                cuenta++
              }
           }
          } else {
            cuenta = cantidad
          }

          return (item.nombre.toLowerCase().includes(this.buscador.toLowerCase()) 
            || item.apellido.toLowerCase().includes(this.buscador.toLowerCase())
            || item.especialidad.toLowerCase().includes(this.buscador.toLowerCase())
            || item.serviciosEsp.toLowerCase().includes(this.buscador.toLowerCase())
            || item.id_autentificacion.includes(this.buscador)) && 
          (item.especialidad === this.categoria || this.categoria.length == 0) &&
          cantidad == cuenta
        })
      },
      busquedaTrabajadorFecha (){
        let fechaBusqueda = {
          categoria: this.categoria,
          fecha:this.fecha,
          hs:this.tiempoFecha
        }
         this.trabajador = this.$store.getters.cargarFecha(fechaBusqueda)
        },
      crearEvento () {
          let hoy = new Date()

          let evento = {
                titulo: this.nombreEvento,
                hora: this.tiempoFecha,
                fecha: this.datoFecha,
                id_trabajador: this.$route.params.id,
                id_cliente: this.$store.getters.user.uid,
                comentario: this.comentario,
                creacion: (hoy.getFullYear()) + '-' + ('0' + (hoy.getMonth() + 1)) + '-' + (hoy.getDate()) + ' ' + hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds()
                
          }
          this.$store.dispatch('guardarSolicitud', evento).then(result => {
            this.snackbar.texto = 'Solicitud enviada!'
            this.snackbar.show = true
          })          
      },
     
  },
  
  
    computed:{
    verTrabajador() {
      console.log("Estoy en Ver Trabajador")
      return this.$store.getters.VerElTrabajador;
    },
    trabajador () {
      return this.$store.getters.cargarTrabajadorFiltro
    },
     user () {
        return this.$store.getters.user
    },
    trabajadorcito () {
         return this.$store.getters.getTrabajadorActual
    },
  },

mounted: function () {
    this.$store.dispatch('cargarTrabajadorFiltro', this.$route.params.id);
    console.log('QUIERO VER USER: ', this.user);
    console.log('QUIERO VER TRABAJADORCITO BREEEEO: ', this.trabajadorcito);
  },
};
</script>