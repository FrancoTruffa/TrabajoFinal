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
 
<!-- 
          <v-tab href="#tab2">
            Calendario
            <v-icon>fas fa-calendar-check</v-icon>
          </v-tab> -->

          <v-tab href="#tab3">
            Comentarios
            <v-icon>fas fa-comments</v-icon>
          </v-tab>

          <v-tab-item value="tab1">
            <verContacto  :nombre="trabajador.nombre" :apellido="trabajador.apellido" :especialidad="trabajador.especialidad" :serviciosEsp="trabajador.serviciosEsp " :foto="trabajador.foto " ></verContacto>
            <verComentarios :nombre="trabajador.rating" ></verComentarios>
          </v-tab-item>


<!--           <v-tab-item value="tab2">
            <verCalendario></verCalendario>
          </v-tab-item> -->


          <v-tab-item value="tab3">
            <verServicios></verServicios>
          </v-tab-item>

        </v-tabs>

      <v-spacer></v-spacer> <v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer>
           
           <v-btn 
           color="red" 
           dark
           @click="denuncia = true"
           >DENUNCIAR
              <v-icon dark small right>block</v-icon>
           </v-btn>

          <v-btn  x-large dark rounded rigth color="green darken-3"  @click="dialog = true" >Solicitar</v-btn>

      <v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer>

      </v-flex>

      <v-dialog
              v-model="dialog"
              width="500"
            >
              <v-card >
                <v-card-title
                  class="headline"
                  primary-title
                >
                  Enviar Solicitud
                </v-card-title>

                <v-card-text>
                    <v-text-field
                    v-model="nombreEvento"
                    label="Título del trabajo a realizar"
                    color="white"
                  ></v-text-field>
                <v-menu
                locale
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="datoFecha"
                    color="white"
                    label="Fecha del día del trabajo"
                    prepend-icon="event"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker locale v-model="datoFecha" @input="menuFecha = false"></v-date-picker>
                
              </v-menu> 
              

              <v-menu
                ref="menuHs"
                v-model="menuHs"
                locale
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="time"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="tiempoFecha"
                    color="white"
                    label="Horario aproximado"
                    prepend-icon="access_time"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="menuHs"
                  v-model="tiempoFecha"
                  full-width
                  @click:minute="$refs.menu.save(tiempoFecha)"
                ></v-time-picker>

              </v-menu>
                </v-card-text>

                <v-divider></v-divider>
                <v-card-text>
                  <v-textarea
                      name="input-7-1"
                      box
                      label="Comentario"
                      v-model="comentario"
                      color="white"
                      placeholder="Escribe en detalle lo que necesitas asi el trabajador puede solucionartelo!"
                      dense
                      filled
                  ></v-textarea>
                  
                </v-card-text>
                <v-flex >
            <div class="yellow darken-2 text-xs-center">
              <h2><i class="fas fa-exclamation-triangle"></i> ¡ATENCION! La hora seleccionada puede ser modificada por parte del Trabajador  <i class="fas fa-exclamation-triangle"></i></h2>
            </div><br>

            <div  v-if="comentario.length === 0 && nombreEvento.length === 0" class=" text-xs-left">
              <h3> Porfavor completar los campos antes de enviar la solicitud </h3>
            </div><br>
        </v-flex>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="secondary"  
                    @click="dialog = false"
                  >
                    Cancelar
                  </v-btn>
                  <v-btn
                    v-if="comentario.length > 0 && nombreEvento.length > 0"
                    color="green"
                    @click="dialog = false;crearEvento()"
                  >
                    Enviar
                  </v-btn>

                </v-card-actions>
              </v-card>
            </v-dialog>
             <v-snackbar
              v-model="snackbar.show"
              color="green"
            >
              {{ snackbar.texto }}
              <v-btn
                color="black"
                flat
                @click="snackbar.show = false"
              >
                Cerrar
              </v-btn>
            </v-snackbar>
    </v-layout>

    <v-dialog v-model="denuncia" persistent>
      <v-card>
        <v-card-title class="headline"> ¿Usted realmente quiere denunciar a esta persona?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1"  @click="denuncia = false">Cancelar</v-btn>
            <v-btn color="blue darken-1" @click="denuncia=false; enviarDenuncia()">Si, deseo denunciar</v-btn>
          </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
import VerContacto from "@/components/VerContacto";
import VerCalendario from "@/components/VerCalendario";
import VerComentarios from "@/components/VerComentarios";
import VerServicios from "@/components/VerServicios";
import firebase from 'firebase'
import fb from '@/api/firebaseConfig'
import firebaseconfigobject from '@/api/firebaseConfig'


export default {
  components: {
    VerContacto,
    VerCalendario,
    VerComentarios,
    VerServicios
  },
  data: () => ({
    dialog: false,
    denuncia: false,
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
      enviarDenuncia (){
        console.log('Enviaste la denuncia...', this.user, this.trabajador);
        firebaseconfigobject.db.ref('/denuncias').push({
        id_trabajador_denunciado: this.trabajador.id_autentificacion, //es esto
        nombre_trabajador_denunciado: this.trabajador.nombre,
        apellido_trabajador_denunciado: this.trabajador.apellido,
        id_cliente: this.user.uid,
        nombre_cliente: this.user.displayName,
      })
    },
  },
  
  mounted: function () {
    this.$store.dispatch('cargarTrabajadorFiltro', this.$route.params.id)
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
  },
};
</script> 