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
                
                <v-list-tile-title v-html="prueba.observacion"></v-list-tile-title>
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

          <v-dialog v-if="dialog.item" v-model="dialog.show" max-width="300" >
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
                   <v-btn
                   style="color: #F08080" 
                    small
                    center
                   @click="enviarDenuncia()"
                   >DENUNCIAR</v-btn>
                </ul>

                </v-flex>
                </v-list-tile-content>
            <v-card-actions>
            </v-card-actions>
            
          </v-card>
        </v-dialog>


        <!--<v-dialog v-model="denuncia" persistent>
        <v-card>
          <v-card-title class="headline"> ¿Usted realmente quiere denunciar el comentario de esta persona?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1"  @click="denuncia = false">Cancelar</v-btn>
              <v-btn color="blue darken-1" @click="denuncia=false; enviarDenuncia()">Si, deseo denunciar</v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>-->


    </v-flex>

    <v-snackbar
              v-model="snackbar.show"
              color="success"
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
  
</template>

<script>

import firebaseconfigobject from '@/api/firebaseConfig'

export default {
  data: () => ({
      notificaciones: '',
      dialog:{
      show:false,
      item: null,  
      mostrarEvento: '',
      cargaEvento:'',
      },
      snackbar:{
        show: false,
        texto: ''
      }
  }),
  watch: {
  mostrarEvento: function (val) {
    console.log('estoy en mostrar evento')
    this.dialog = this.$store.getters.cargarNotificacionSeleccion(val)
  }},
  methods: {
    enviarDenuncia (){
        console.log('Enviaste la denuncia...', 
        this.user, 
        this.trabajadorcito,
        this.finalizadas
        );
        firebaseconfigobject.db.ref('/denunciasTrabajador').push({
        id_trabajador: this.trabajadorcito.id_autentificacion, //es esto
        nombre_trabajador: this.trabajadorcito.nombre,
        apellido_trabajador: this.trabajadorcito.apellido,
        id_cliente: this.dialog.item.cliente.id_autentificacion,
        nombre_cliente: this.dialog.item.cliente.nombre,
        apellido_cliente: this.dialog.item.cliente.apellido,
        comentario: this.dialog.item.observacion
      }).then(result => {
        //this.snackbar.color = "success"
        this.snackbar.texto = "Enviaste la denuncia..."
        this.snackbar.show = true
        this.loading = false

      })
    },
  },
  computed: {
      finalizadas () {
        return this.$store.getters.getNotificacionesMostrarFinalizadas
      },
      user () {
        return this.$store.getters.user
    },
    trabajadorcito () {
         return this.$store.getters.getTrabajadorActual[0]
    },
  },
  mounted() {
    
      this.$store.dispatch('mostrarNotificaciones', this.trabajadorcito.id_autentificacion).then(result => {
      this.notificaciones = this.$store.getters.cargarNotificacionesFiltro;
      });
      //this.$store.dispatch('mostrarNotificaciones', this.user.uid);
      console.log('MOSTRAME USER REY DE REYES: ', this.user);
      console.log('MOSTRAME EL TRABAJADORCITO MOOOOOSTRI: ', this.trabajadorcito);
      console.log('DE ACA SACAMOS LOS DATOS PARA DENUNCIAR REEEEEEYYYYYY: ', this.finalizadas);
     },
}
</script>