<template>
  <v-layout justify-center>
    <v-flex pt-3  xs12 sm8 md6>
        <div class="blue darken-2 text-xs-center">
         <h2> Trabajos realizados</h2>
        </div><br>

          <v-list three-line>
          <h3 class="text-xs-center" v-if="Object.entries(finalizadas).length === 0"> No hay trabajos realizados</h3>
          <template v-for="prueba in finalizadas">
            <v-list-tile
              @click="dialog.show = true; dialog.item = prueba"
              :key="prueba.titulo"
              avatar
            >
              <v-list-tile-avatar>
                <v-img :src="prueba.cliente.foto"></v-img>
              </v-list-tile-avatar>

              <v-list-tile-content>
                
                <v-list-tile-title v-html="prueba.titulo"></v-list-tile-title>
                <v-list-tile-sub-title v-html="'Trabajo realizado a: ' + prueba.cliente.apellido + '  ' + prueba.cliente.nombre"></v-list-tile-sub-title>
                <v-list-tile-sub-title v-html="'Calificación General'"></v-list-tile-sub-title>
                <v-rating
                  v-model="prueba.calificacion"
                  small
                  background-color="white"
                  color="yellow accent-4"
                  dense
                  half-increments
                  hover
                  size="18"
                  readonly
                ></v-rating>
              </v-list-tile-content>
            </v-list-tile>           
          </template>
        </v-list>

                <v-dialog v-if="dialog.item" v-model="dialog.show" max-width="300">
           <v-card>
             <v-card-title small class="headline"> <v-icon>fa fa-user-check</v-icon>  --Calificación de:  </v-card-title>
    
                <v-list-tile>
                
                <v-list-tile-avatar>
                    <v-img :src="dialog.item.cliente.foto" width="50px" height="50px"></v-img>
                </v-list-tile-avatar>
                <v-list-tile-action><div>{{dialog.item.cliente.nombre}} {{dialog.item.cliente.apellido}}</div></v-list-tile-action>
              </v-list-tile><br>
              
              <v-list-tile-content>
                <v-flex xs12>
                  <ul>
                   <li> Titulo: {{dialog.item.titulo }}</li>
                   <li> Actividad: {{dialog.item.comentarios}}</li>
                   <li> Precio:<v-rating small readonly v-model="dialog.item.calidadPrecio" color="yellow accent-4" dense hover size="18" ></v-rating></li>
                   <li> Limpieza:<v-rating small readonly v-model="dialog.item.limpieza" color="yellow accent-4" dense hover size="18" ></v-rating></li>
                   <li> Puntualidad:<v-rating small readonly v-model="dialog.item.puntualidad" color="yellow accent-4" dense hover size="18" ></v-rating></li>
                   <li> Trabajo:<v-rating small readonly v-model="dialog.item.calidadTrabajo" color="yellow accent-4" dense hover size="18" ></v-rating></li>
                   <li> Recomendabilidad:<v-rating small readonly v-model="dialog.item.recomendacion" color="yellow accent-4" dense hover size="18" ></v-rating></li>
                   <li> Observación: {{dialog.item.observacion}}</li>
                </ul>

                </v-flex>
                </v-list-tile-content>
            <v-card-actions>
            </v-card-actions>
            
          </v-card>
        </v-dialog>


    </v-flex>
  </v-layout>
  
</template>

<script>
export default {
  data: () => ({
      notificaciones: '',
      dialog:{
      show:false,
      item: null,  
      mostrarEvento: '',
      cargaEvento:'',
      },
  }),
  watch: {
  mostrarEvento: function (val) {
    console.log('estoy en mostrar evento')
    this.dialog = this.$store.getters.cargarNotificacionSeleccion(val)
  }},
  computed: {
      finalizadas () {
        return this.$store.getters.getNotificacionesMostrarFinalizadas
      },
  },
  mounted() {
      this.$store.dispatch('mostrarNotificaciones', this.$route.params.id ).then(result => {
      this.notificaciones = this.$store.getters.cargarNotificaciones
      })
     },
}
</script>