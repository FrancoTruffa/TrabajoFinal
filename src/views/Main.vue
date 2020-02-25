<template>
  <v-container fluid style="background-color:#012c4f">
    <v-layout row wrap>
    <div class="text-xs-center">
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
        
      </v-menu> 
      

      <v-menu
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
            :disabled="!(comentario.length > 0 && nombreEvento.length > 0)"
            color="green"
            @click="dialog = false;crearEvento()"
          >
            Enviar
          </v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
      <v-flex xs12 pt-5>  
       <v-text-field
          class="mx-3"
          flat
          prepend-inner-icon="search"
          v-model="buscador"
          solo-inverted
      ></v-text-field>

      </v-flex>

      <v-flex xs12>
       
      <v-form class="text-xs-center" @submit.prevent="busquedaTrabajadorFecha">
     <v-flex >
        <v-select
         class="text-xs-center"
          :items="items"
          style="width: 100%"
          v-model="categoria"
          label="Categoría"
        ></v-select>
        
      </v-flex>

      <v-flex >
        <v-menu
        locale
        v-model="menuFecha"
        :close-on-content-click="false"
        :nudge-right="40"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="200px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="datoFecha"
            style="width: 100%"
            label="Fecha del trabajo"
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
            style="width: 100%"
            label="Horario del trabajo"
            prepend-icon="access_time"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="menuHs"
          prepend-icon="access_time"
          v-model="tiempoFecha"
          full-width
          @click:minute="$refs.menu.save(tiempoFecha)"
          @input="menuHs = false"
        ></v-time-picker>
      </v-menu>
      </v-flex>
                      
      <div  class="text-xs-right">
        <v-tex v-if="datoFecha < date ">Por favor seleccione una fecha a partir del día de hoy! </v-tex>
        <v-tex v-if=" (datofecha=== date) &&(tiempoFecha <= horita) "> Seleccione un horario posterior al de ahora! </v-tex>
        <v-btn small fab rigth color="green" @click="limpiarCampos"><v-icon medium small>fas fa-trash</v-icon></v-btn>
      </div>
  </v-form>
      </v-flex> <br>

      
    </v-layout>
    
      <v-layout  v-show="!hidden" wrap column >
       <v-flex class="mb-2" sm6 justify-space-between  v-for="t in trabajadores" :key="t.id">
         <v-card color="blue-grey darken-4" dark  >
           <v-layout >
             <v-flex xs12>
               <v-card-title primary-title>
                 <span class="headline">{{t.nombre}}, {{t.apellido}}</span>
                 <v-flex xs12 class="pt-2"> 
                <div><v-icon color="blue darken-2">thumb_up</v-icon> {{t.especialidad}}</div> 
                <div ><v-icon color="blue darken-2">chat</v-icon> {{t.serviciosEsp}}</div>    
                 </v-flex>
               </v-card-title>
            </v-flex>
          <v-img
            class="shrink ma-2"
            contain
            height="125px"
            :src="t.foto"
            style="flex-basis: 90px"
          ></v-img>
    </v-layout>
        <v-divider dark></v-divider>

        <v-card-actions class="pa-3">
         <v-btn fab small dark color="blue darken-3"  :to="'/VerTrabajador/' + t.id_autentificacion "><i class="fas fa-eye"></i></v-btn>
          <v-spacer></v-spacer> <v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer>
          <v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer>
           <v-btn
           :disabled="!((datoFecha.length > 0 && tiempoFecha.length > 0) && (datoFecha >= date) ||  (tiempoFecha > horita && datoFecha === date)) " 
             x-large dark
          rigth color="blue darken-3"  @click="dialog = true; id_trabajador = t.id_autentificacion" >Solicitar</v-btn>

          <v-spacer></v-spacer>

        </v-card-actions>
      </v-card>
 
 </v-flex>
 <v-flex v-if="trabajadores.length == 0">
    <div class="yellow darken-2 text-xs-center">
      <h2><i class="fas fa-exclamation-triangle"></i> ¡ATENCION! No hay trabajadores disponibles en la fecha y hora que seleccionaste <i class="fas fa-exclamation-triangle"></i></h2>
    </div><br>
 </v-flex>

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
 </v-container>

</template>

<script>
import firebase, { firestore } from 'firebase'
import objetoFB from '@/api/firebaseConfig'
export default {

  data: () => ({
   dialog: false,
   time:null,
   tiempoFecha:'',
   menu:false,
   menuHs:false,
   menuFecha:false,
   nombreEvento:'',
   date: new Date().toISOString().substr(0, 10),
   datoFecha: new Date().toISOString().substr(0, 10),
    horita: new Date().getHours().toString(),
   menu2: false,
   today: '2019-04-21',
   events: [     
      ],
   hidden: false,
   loadSuccess: true,
   categoria: '',
   trabajadores: '',
   comentario: '',
   buscador: '',
   id_trabajador: '',
   items: ['PLOMERO', 'ALBAÑIL', 'GASISTA', 'CARPINTERO', 'ELECTRICISTA', 'CERRAJERO', 'REFRIGERACION', 'DESGASTES', 'VIDRIERO'],
   snackbar: {
     show: false,
     texto: ''
   }
  }),

  /* Va a cargar la categoria que seleccione */
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
      }

  },
  methods: {
      limpiarCampos () {
        this.categoria = ''
        this.buscador = ''
        this.datoFecha = ''
        this.tiempoFecha = ''
      },
      filtro () {
        this.trabajadores = this.$store.getters.cargarTrabajador.filter(item =>{

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
         this.trabajadores = this.$store.getters.cargarFecha(fechaBusqueda)
        },
      crearEvento () {
          let hoy = new Date()

          let evento = {
                titulo: this.nombreEvento,
                hora: this.tiempoFecha,
                fecha: this.datoFecha,
                id_trabajador: this.id_trabajador,
                id_cliente: this.$store.getters.user.uid,
                comentario: this.comentario,
                creacion: (hoy.getFullYear()) + '-' + ((hoy.getMonth() + 1)) + '-' + (hoy.getDate()) + ' ' + hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds()
                
          }
          this.$store.dispatch('guardarSolicitud', evento).then(result => {
            this.snackbar.texto = 'Solicitud enviada!'
            this.snackbar.show = true
          })          
      }
  },
  beforeCreate() {
    console.log('Esto trae dato fecha'+this.datoFecha)
    this.$store.dispatch('mostrarTrabajador').then(result => {
      this.trabajadores = this.$store.getters.cargarTrabajador
    })
    if(this.$store.getters.categoria === 'trabajador') {
      this.$router.push('MainTrabajador')
    }
    console.log("todos los trabajadores: ", this.$store.getters.cargarTrabajador)
    console.log("Que onda perri: ", this.user)
  },
  mounted () {
    
  }
}
</script>