<template>
  <v-container fluid style="background-color:#012c4f">
 <v-layout row wrap v-if="!loading">
      
      <v-flex xs12 pt-5 >
          <h3>Trabajos solicitados</h3>

          <v-list three-line>
          <h3 class="text-xs-center" v-if="Object.entries(solicitadas).length === 0"> No hay trabajos solicitados</h3>
          <template v-for="prueba in solicitadas">
           
             <v-list-tile 
              :key="prueba.titulo"
              avatar
            >
              <v-list-tile-avatar>
                <v-img :src="prueba.trabajador.foto"></v-img>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-html="prueba.titulo"></v-list-tile-title>
                <v-list-tile-sub-title v-html=" 'Fecha: '+prueba.fecha"></v-list-tile-sub-title>
                <v-list-tile-sub-title v-html=" 'Hs: ' + prueba.hora"></v-list-tile-sub-title>
              </v-list-tile-content>
          

            <v-list-tile-action>
              <v-btn icon >
                <v-icon @click="dialog.show = true; dialog.item = prueba"  color="white lighten-1">info</v-icon>
              </v-btn>
              <v-icon color="red" @click="dialogocancelar.show = true; dialogocancelar.item = prueba"  > fas fa-times-circle</v-icon>

            </v-list-tile-action>
            </v-list-tile>

          </template>
          <v-dialog v-if="dialogocancelar.item" v-model="dialogocancelar.show" width="500">
              <v-card>
                <v-card-title class="headline"> ¿Usted realmente quiere cancelar la solicitud?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red darken-1"       :loading="loading"
      :disabled="loading"  @click="dialogocancelar.show = false">Cancelar</v-btn>
                  <v-btn color="blue darken-1"  @click="dialogocancelar.show = false;cancelarTrabajo(dialogocancelar.item);loader = 'loading'">Si,quiero cancelar</v-btn>

                </v-card-actions>
              </v-card>
            </v-dialog>
        </v-list>
        </v-flex> 

        <v-flex xs12 pt-5 >
          <h3>Cambio de horario solicitado por el trabajador</h3>

          <v-list three-line>
          <h3 class="text-xs-center" v-if="Object.entries(cambiohs).length === 0"> No hay trabajos con cambios de horarios</h3>
          <template v-for="prueba in cambiohs">
            <v-list-tile
              @click="dialog5.show = true; dialog5.item = prueba"
              :key="prueba.titulo"
              avatar
              class="yellow darken-4"
            >
              <v-list-tile-avatar>
                <v-img :src="prueba.trabajador.foto"></v-img>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-html="prueba.titulo"></v-list-tile-title>
                <v-list-tile-sub-title v-html=" 'Fecha: '+prueba.fecha"></v-list-tile-sub-title>
                <v-list-tile-sub-title v-html=" 'Hs: ' + prueba.hora"></v-list-tile-sub-title>
              </v-list-tile-content>

            </v-list-tile>

          </template>

          <v-dialog v-if="dialog5.item" v-model="dialog5.show" width="500">
              <v-card>
                <v-card-title  class="text-xs headline"> Detalle del Trabajo que usted mando</v-card-title>
                   <v-list-tile-content>
                   <li> - Actividad: {{dialog5.item.titulo }}</li>
                   <li> - Comentario: {{dialog5.item.comentarios}}</li>
                   <li> - Fecha: {{dialog5.item.fecha}}</li>
                   <li> - Hs Anterior: {{dialog5.item.hora}}</li>
                   </v-list-tile-content>
                <v-card-title  class="text-xs headline">Horario propuesto por el trabajador </v-card-title>
                  <v-list-tile-content>
                   <li> - Hora  : {{dialog5.item.cambioHsporTrabajador }}</li>
                   <li> - Motivo del cambio: {{dialog5.item.cambioComentarioporTrabajador}}</li>
                   </v-list-tile-content>
                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn  color="red darken-1"  @click="dialog5.show = false;rechazarTrabajo(dialog5.item)" >
                    Rechazar
                  </v-btn>
          
                  <v-btn rounded  color="green darken-1"  @click="aceptarTrabajo(dialog5.item);dialog5.show = false" >
                    Aceptar
                  </v-btn>  
                </v-card-actions>
              </v-card>
            </v-dialog>
        </v-list>
        </v-flex> 


        <v-flex xs12 pt-5 >
          <h3>Trabajos Aceptados</h3>

          <v-list three-line>
          <h3 class="text-xs-center" v-if="Object.entries(aceptadas).length === 0"> No hay trabajos aceptados</h3>
          <template v-for="prueba in aceptadas">
            <v-list-tile
              :key="prueba.titulo"
              avatar
              class="green darken-4"
            >
              <v-list-tile-avatar>
                <v-img :src="prueba.trabajador.foto"></v-img>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-html="prueba.titulo"></v-list-tile-title>
                <v-list-tile-sub-title v-html=" 'Fecha: '+prueba.fecha"></v-list-tile-sub-title>
                <v-list-tile-sub-title v-html=" 'Hs: ' + prueba.hora"></v-list-tile-sub-title>
              </v-list-tile-content>

            <v-list-tile-action>
              <v-btn icon >
                <v-icon @click="dialog.show = true; dialog.item = prueba"  color="white lighten-1">info</v-icon>
              </v-btn>
              <v-btn icon :to="'/RealizarPagyCom/' + prueba.id">
                <v-icon  >fas fa-qrcode </v-icon>
              </v-btn>
                
            </v-list-tile-action>
            </v-list-tile>
            
          </template>
        </v-list>
        </v-flex> 

              <v-flex xs12 pt-5 >
          <h3>Trabajos Rechazados</h3>
         
          <v-list three-line>
             <h3 class="text-xs-center" v-if="Object.entries(rechazadas).length === 0"> No hay trabajos rechazados</h3>
          <template v-for="prueba in rechazadas">
            <v-list-tile
              v-if="prueba.rechazado.length > 0"
             
              :key="prueba.titulo"
              avatar
              :class="{ 'yellow darken-4': !(prueba.rechazado.length > 0 || prueba.confirmado.length > 0),
               'green darken-4': (prueba.confirmado.length > 0),
               'red darken-4': (prueba.rechazado.length > 0) }"
            >
              <v-list-tile-avatar>
                <v-img :src="prueba.trabajador.foto"></v-img>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-html="prueba.titulo"></v-list-tile-title>
                <v-list-tile-sub-title v-html=" 'Fecha: '+prueba.fecha"></v-list-tile-sub-title>
                <v-list-tile-sub-title v-html=" 'Hs: ' + prueba.hora"></v-list-tile-sub-title>
              </v-list-tile-content>

            <v-list-tile-action>
              <v-btn icon >
                <v-icon @click="dialog.show = true; dialog.item = prueba"  color="white lighten-1">info</v-icon>
              </v-btn>
              <v-btn icon>
                  <v-icon color="white" @click="dialogorechazar.show = true; dialogorechazar.item = prueba">fas fa-times-circle</v-icon>
              </v-btn>
              
            </v-list-tile-action>
            </v-list-tile>
          </template>
          
          <v-dialog v-if="dialogorechazar.item" v-model="dialogorechazar.show" width="500">
              <v-card>
                <v-card-title class="headline"> ¿Usted realmente quiere eliminar esta solicitud rechazada?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red darken-1"  @click="dialogorechazar.show = false">Cancelar</v-btn>
                  <v-btn color="blue darken-1"  @click="dialogorechazar.show = false;eliminarTrabajo(dialogorechazar.item)">Si,quiero eliminar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          
        </v-list>

          <v-dialog v-if="dialog.item" v-model="dialog.show" max-width="300">
           <v-card>
             <v-card-title class="headline"> Detalle del Trabajo: </v-card-title>
    
                <v-list-tile>
                
                <v-list-tile-avatar>
                    <v-img :src="dialog.item.trabajador.foto" width="50px" height="50px"></v-img>
                </v-list-tile-avatar>
                <v-list-tile-action><div>{{dialog.item.trabajador.nombre}} {{dialog.item.trabajador.apellido}}</div></v-list-tile-action>
              </v-list-tile><br>
              
              <v-list-tile-content>
                <v-flex xs12>
                  <ul>
                   <li> Actividad: {{dialog.item.titulo }}</li>
                   <li> Comentario: {{dialog.item.comentarios}}</li>
                   <li> Fecha: {{dialog.item.fecha}}</li>
                   <li v-if=" (dialog.item.confirmado.length > 0)">Telefono: {{dialog.item.trabajador.telefono}}</li>
                   <li v-if=" (dialog.item.confirmado.length > 0)">Correo: {{dialog.item.trabajador.email  }}</li>
                   <li  v-on:click="VerUbicacion(dialog.item.trabajador.domicilio)"> Domicilio: {{dialog.item.trabajador.domicilio}} <u>(ver ubicacion)</u> </li>
                </ul><br>
                </v-flex>
                </v-list-tile-content>


            
          </v-card>
        </v-dialog>
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
        <v-dialog
              v-model="loading"
              hide-overlay
              persistent
              width="300"
            >
              <v-card
                color="primary"
                dark
              >
          <v-card-text>
            Por favor espere ...
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>

      </v-dialog>
              <v-dialog
              v-if=" solicitadas == null && cambiohs == null && rechazadas == null && aceptadas == null && finalizadas == null" 
              v-model="loading"
              hide-overlay
              persistent
              width="300"
            >
              <v-card
                color="primary"
                dark
              >
          <v-card-text>
            Por favor espere ...
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
 </v-container>

</template>




<script>
export default {
    data: () => ({ 
     loading: false,
     snackbar: {
      show: false,      
      actualizado:false,
      texto: ''
     },
      notificaciones: '',
      dialog:{
        show:false,
        item: null
      },
      dialog5:{
        show:false,
        item: null
      },
      dialogocancelar:{
        show:false,
        item: null
      },
      dialogorechazar:{
        show:false,
        item: null
      },
      mostrarEvento: '',
      cargaEvento:'',
    }),
      watch: {
        mostrarEvento: function (val) {
          console.log('estoy en mostrar evento')
          this.dialog = this.$store.getters.cargarNotificacionSeleccionCliente(val)
    },},
    computed: {
      solicitadas () {
        return this.$store.getters.getNotificacionesSolicitadasClientes
      },
      cambiohs() {
        return this.$store.getters.getNotificacionesCambioHs
      },
      rechazadas () {
        return this.$store.getters.getNotificacionesRechazadasClientes
      },
      aceptadas () {
        return this.$store.getters.getNotificacionesAceptadasClientes
      },
      finalizadas () {
        return this.$store.getters.getNotificacionesFinalizadasClientes
      }
    },
    mounted: function() {
      this.cargarNotificaciones()   
    },
    methods: {
      cargarNotificaciones () {
        this.loading = true
        this.$store.dispatch('mostrarNotificacionesClientes', this.$store.getters.user.uid).then(result => {
         this.loading = false
        })
      },
      VerUbicacion(dir){
       window.open ("https://www.google.com/maps/search/" + dir)
      },
      cancelarTrabajo(evento){
        this.$store.dispatch('cancelarTrabajo',evento)
        this.cargarNotificaciones()  
      },
      eliminarTrabajo(evento){
        this.$store.dispatch('eliminarTrabajo',evento)
        this.cargarNotificaciones()  
      },
      aceptarTrabajo(evento){
        this.$store.dispatch('aceptarTrabajoCliente',evento)
        this.cargarNotificaciones()  
      },
      rechazarTrabajo(evento){
        this.$store.dispatch('rechazarTrabajoCliente', evento)
        this.cargarNotificaciones()  
      },
    }
}
</script>