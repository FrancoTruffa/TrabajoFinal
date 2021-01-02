<template>
  <v-container fluid style="background-color:#012c4f">
 <v-layout row wrap v-if="!loading && (trabajadorcito[0].bloqueado == false || trabajadorcito[0].bloqueado == null)">

 <v-flex xs12 pt-5 >
          <h3>Trabajos solicitados</h3>
          
          <v-list three-line >
          <h3 class="text-xs-center" v-if="Object.entries(solicitadas).length === 0"> No hay trabajos solicitados</h3>
          <template v-for="prueba in solicitadas">
            
            <v-list-tile
              :key="prueba.titulo"
              avatar
            >
           
              <v-list-tile-avatar>
                <v-img :src="prueba.cliente.foto"></v-img>
              </v-list-tile-avatar>
              
              <v-list-tile-content>
                <v-list-tile-title v-html="prueba.titulo"></v-list-tile-title>
                <v-list-tile-sub-title v-html=" 'Fecha: '+prueba.fecha"></v-list-tile-sub-title>
                  <v-list-tile-sub-title v-html=" 'Hs: ' + prueba.hora"></v-list-tile-sub-title>
                <v-list-tile-sub-title v-html="'Trabajo pedido por: ' + prueba.cliente.apellido + '  ' + prueba.cliente.nombre"></v-list-tile-sub-title>
                <v-list-tile-sub-title> <v-divider></v-divider></v-list-tile-sub-title>
              </v-list-tile-content>

            <v-list-tile-action>
              <v-btn icon >
                <v-icon @click="dialog.show = true; dialog.item = prueba"  color="white lighten-1">fas fa-info-circle</v-icon>
              </v-btn>
              <v-btn icon >
                <v-icon @click="hours.show = true; hours.item = prueba" color="grey lighten-1">fas fa-clock</v-icon>
              </v-btn>
            </v-list-tile-action>
            </v-list-tile>           
          </template>
        </v-list>
        
        </v-flex> 


        <v-flex xs12 pt-5 >
          <h3>Trabajos aceptados</h3>

          <v-list three-line>
          <h3 class="text-xs-center" v-if="Object.entries(aceptadas).length === 0"> No hay trabajos aceptados</h3>
          <template v-for="prueba in aceptadas">
            <!-- && !(prueba.finalizado.length > 0) -->
            <v-list-tile
              :key="prueba.titulo"
              avatar
              class="green darken-4"
            >
              <v-list-tile-avatar>
                <v-img :src="prueba.cliente.foto"></v-img>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-html="prueba.titulo"></v-list-tile-title>
                <v-list-tile-sub-title v-html=" 'Fecha: '+prueba.fecha"></v-list-tile-sub-title>
                  <v-list-tile-sub-title v-html=" 'Hs: ' + prueba.hora"></v-list-tile-sub-title>
                <v-list-tile-sub-title v-html="'Trabajo pedido por: ' + prueba.cliente.apellido + '  ' + prueba.cliente.nombre"></v-list-tile-sub-title>
                <v-list-tile-sub-title> <v-divider></v-divider></v-list-tile-sub-title>
              </v-list-tile-content>

            <v-list-tile-action>
              <v-btn icon >
                <v-icon @click="dialog.show = true; dialog.item = prueba"  color="white lighten-1">fas fa-info-circle</v-icon>
              </v-btn>

              <v-btn icon :to="'/Escaneo/' + prueba.id" >
              <v-icon> fas fa-qrcode</v-icon>
              </v-btn>
            </v-list-tile-action>
            </v-list-tile>

           
          </template>
        </v-list>
        </v-flex> 
        
        <v-dialog v-if="hours.item" v-model="hours.show" max-width="500">
           <v-card>

             <v-card-title class="headline"> El trabajo actual es: </v-card-title>    
                <v-list-tile>
                
                <v-list-tile-avatar>
                    <v-img :src="hours.item.cliente.foto" width="50px" height="50px"></v-img>
                </v-list-tile-avatar>
                <v-list-tile-action><div>{{hours.item.cliente.nombre}} {{hours.item.cliente.apellido}}</div></v-list-tile-action>
              </v-list-tile><br>
                <v-list-tile-content>
                <v-flex xs12>
                  <ul>
                   <li> Actividad: {{hours.item.titulo }}</li>
                   <li> Comentario: {{hours.item.comentarios}}</li>
                   <li> Fecha: {{hours.item.fecha}}</li>
                   <li> Hora: {{hours.item.hora}}</li>
                   <li v-if=" (hours.item.confirmado.length > 0)">Teléfono : {{hours.item.cliente.telefono}}</li>
                   <li v-if=" (hours.item.confirmado.length > 0)">Correo: {{hours.item.cliente.email  }}</li>
                   <li  v-on:click="VerUbicacion(hours.item.cliente.domicilio)"> Domicilio: {{hours.item.cliente.domicilio}} <u>(ver ubicacion)</u> </li>
                </ul>
                </v-flex><br>
                </v-list-tile-content>

                <v-card-title class="headline">El horario por el que usted desea cambiar:</v-card-title>  
                <v-list-tile>
                    <v-menu
                          ref="menuHs"
                          v-model="menuHs"
                          locale
                          :close-on-content-click="false"
                          :nudge-right="40"
                          :return-value.sync="time5"
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
                              label="Hora de cambio"
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
                </v-list-tile>

                <v-card-title class="headline">Explique el motivo por el cual usted desea cambiar el horario:</v-card-title>  
                <v-card-text>
                    <v-textarea
                        name="input-7-1"
                        box
                        label="Motivo"
                        v-model="comentario"
                        color="white"
                        placeholder="Escribe el motivo de cambio de horario  "
                        dense
                        filled
                    ></v-textarea>
                  </v-card-text>
              
              <v-card-actions>
                 <v-spacer></v-spacer>
              <v-btn :disabled="!(comentario && tiempoFecha)" rounded small color="green darken-1"  @click="hours.show = false; cambiarTrabajoHs(hours.item)" >
                Enviar
              </v-btn>
              </v-card-actions>
              
          </v-card>
        </v-dialog>

        <v-flex xs12 pt-5 >
          <h3>Trabajos rechazados</h3>

          <v-list three-line>
          <h3 class="text-xs-center" v-if="Object.entries(rechazadas).length === 0"> No hay trabajos rechazados</h3>
          <template v-for="prueba in rechazadas">
            <v-list-tile
              :key="prueba.titulo"
              avatar
              class="red darken-4"
            >
              <v-list-tile-avatar>
                <v-img :src="prueba.cliente.foto"></v-img>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-html="prueba.titulo"></v-list-tile-title>
                <v-list-tile-sub-title v-html=" 'Fecha: '+prueba.fecha"></v-list-tile-sub-title>
                  <v-list-tile-sub-title v-html=" 'Hs: ' + prueba.hora"></v-list-tile-sub-title>
                <v-list-tile-sub-title v-html="'Trabajo pedido por: ' + prueba.cliente.apellido + '  ' + prueba.cliente.nombre"></v-list-tile-sub-title>
                <v-list-tile-sub-title> <v-divider light></v-divider></v-list-tile-sub-title>
              </v-list-tile-content>
            
             <v-list-tile-action>
              <v-btn icon >
                <v-icon  color="white" @click="dialog.show = true; dialog.item = prueba"  >fas fa-info-circle</v-icon>
              </v-btn >
                <v-icon color="white" @click="dialogorechazar.show = true; dialogorechazar.item = prueba" class="fas fa-times-circle"></v-icon>
                
            </v-list-tile-action>
             
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

            </v-list-tile>
          </template>
        </v-list>
        </v-flex> 

        <v-flex xs12 pt-5 >
          <h3>Trabajos finalizados</h3>

          <v-list three-line>
          <h3 class="text-xs-center" v-if="Object.entries(finalizadas).length === 0"> No hay trabajos finalizados</h3>
          <template v-for="prueba in finalizadas">
            <v-list-tile
              :key="prueba.titulo"
              avatar
            >
              <v-list-tile-avatar>
                <v-img :src="prueba.cliente.foto"></v-img>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-html="prueba.titulo"></v-list-tile-title>
                <v-list-tile-sub-title v-html=" 'Fecha: '+prueba.fecha"></v-list-tile-sub-title>
                  <v-list-tile-sub-title v-html=" 'Hs: ' + prueba.hora"></v-list-tile-sub-title>
                <v-list-tile-sub-title v-html="'Trabajo pedido por: ' + prueba.cliente.apellido + '  ' + prueba.cliente.nombre"></v-list-tile-sub-title>
                <v-list-tile-sub-title> <v-divider light></v-divider></v-list-tile-sub-title>
              </v-list-tile-content>
            
             <v-list-tile-action>
              
              <v-btn icon >
                <v-icon @click="dialog.show = true; dialog.item = prueba"  color="white lighten-1">fas fa-info-circle</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon  color="red" @click="dialogorechazar.show = true; dialogorechazar.item = prueba" class="fas fa-times-circle"></v-icon>
              </v-btn>
               
            </v-list-tile-action>
             
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

            </v-list-tile>
          </template>
        </v-list>
        </v-flex> 

        <v-dialog v-if="dialog.item" v-model="dialog.show" max-width="300">
           <v-card>
             <v-card-title class="headline"> Trabajo pedido por: </v-card-title>
    
                <v-list-tile>
                
                <v-list-tile-avatar>
                    <v-img :src="dialog.item.cliente.foto" width="50px" height="50px"></v-img>
                </v-list-tile-avatar>
                <v-list-tile-action><div>{{dialog.item.cliente.nombre}} {{dialog.item.cliente.apellido}}</div></v-list-tile-action>
              </v-list-tile><br>
              
              <v-list-tile-content>
                <v-flex xs12>
                  <ul>
                   <li> Actividad: {{dialog.item.titulo }}</li>
                   <li> Comentario: {{dialog.item.comentarios}}</li>
                   <li> Fecha: {{dialog.item.fecha}}</li>
                   <li> Hora: {{dialog.item.hora}}</li>
                   <li v-if=" (dialog.item.confirmado.length > 0)">Teléfono : {{dialog.item.cliente.telefono}}</li>
                   <li v-if=" (dialog.item.confirmado.length > 0)">Correo: {{dialog.item.cliente.email  }}</li>
                   <li  v-on:click="VerUbicacion(dialog.item.cliente.domicilio)"> Domicilio: {{dialog.item.cliente.domicilio}} <u>(ver ubicacion)</u> </li><br>
                   
                   <h3 v-if=" (dialog.item.finalizado.length > 0)"> <u> Calificacion del cliente </u></h3>
                   <li v-if=" (dialog.item.finalizado.length > 0)"> Precio:<v-rating small readonly v-model="dialog.item.calidadPrecio" color="yellow accent-4" dense hover size="18" ></v-rating></li>
                   <li v-if=" (dialog.item.finalizado.length > 0)"> Limpieza:<v-rating small readonly v-model="dialog.item.limpieza" color="yellow accent-4" dense hover size="18" ></v-rating></li>
                   <li v-if=" (dialog.item.finalizado.length > 0)"> Puntualidad:<v-rating small readonly v-model="dialog.item.puntualidad" color="yellow accent-4" dense hover size="18" ></v-rating></li>
                   <li v-if=" (dialog.item.finalizado.length > 0)"> Trabajo:<v-rating small readonly v-model="dialog.item.calidadTrabajo" color="yellow accent-4" dense hover size="18" ></v-rating></li>
                   <li v-if=" (dialog.item.finalizado.length > 0)"> Recomendabilidad:<v-rating small readonly v-model="dialog.item.recomendacion" color="yellow accent-4" dense hover size="18" ></v-rating></li>
                   <li v-if=" (dialog.item.finalizado.length > 0)"> Observación: {{dialog.item.observacion}}</li>
                </ul>
                </v-flex>
                </v-list-tile-content>
              
            <v-card-actions>
              <v-spacer></v-spacer>
              
              <v-btn v-if=" !(dialog.item.rechazado.length > 0 || dialog.item.confirmado.length > 0)" color="red darken-1"  @click="dialog.show = false;rechazarTrabajo(dialog.item)" >
                Rechazar
              </v-btn>
              
              <v-btn v-if=" !(dialog.item.rechazado.length > 0 || dialog.item.confirmado.length > 0)" color="green darken-1"  @click="dialog.show = false; aceptarTrabajo(dialog.item)" >
                Aceptar
              </v-btn>


            </v-card-actions>
            
          </v-card>
        </v-dialog>

         <v-snackbar v-model="snackbar.show" color="green" > {{ snackbar.texto }}
              <v-btn
                color="black"
                flat
                @click="snackbar.show = false"
              >Cerrar </v-btn>
          </v-snackbar>
          
 </v-layout>

<v-layout row wrap v-if="trabajadorcito[0].bloqueado == true"> <!--    <v-layout v-else>-->
  <v-flex xs12 pt-5>
    <v-alert
      :value="true"
      color="error"
      icon="warning"
      outline
      style="text-align: center"
    >
        USTED HA SIDO BLOQUEADO
    </v-alert>
    
  <br><br><br><br><br>


  <v-card
    class="mx-auto"
    max-width="600"  
  >
    <v-card-title>
      <span class="title font-weight-light" style="color: #FAFAFA" >Por favor, enviar un mail a la Administración: </span>
      <br><br>
      <span class="title font-weight" style="color: #FAFAFA">cordobaservice.cba@gmail.com</span>
    </v-card-title>

    <v-card-actions>
      <v-list-tile class="grow">
        <v-list-tile-avatar color="grey darken-3">
          <!--<v-img
            class="elevation-6"
            src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
          ></v-img>-->
        <i class="fas fa-tools"></i>
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>Administración Córdoba Service</v-list-tile-title>
        </v-list-tile-content>

      </v-list-tile>
    </v-card-actions>
  </v-card>

  </v-flex>
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
 </v-container>

</template>




<script>
export default {
    data: () => ({ 
      notificaciones: '',
      menuHs:false,
      tiempoFecha:'',
      comentario: null,
      actualizado:false,
      loading: false,
      dialog:{
        show:false,
        item: null
      },
      hours:{
        show:false,
        item: null
      },
      dialogorechazar:{
        show:false,
        item: null
      },
      mostrarEvento: '',
      cargaEvento:'',
      date: new Date().toISOString().substr(0, 10),
      hs: new Date().getHours(),
      horita: new Date().getHours().toString(),
      eliminar:"",
      snackbar: {
        show: false,
        texto: ''
      }
    }),
    watch: {
      mostrarEvento: function (val) {
        console.log('estoy en mostrar evento')
        this.dialog = this.$store.getters.cargarNotificacionSeleccion(val)
      },
    },
    computed: {
      solicitadas () {
        return this.$store.getters.getNotificacionesSolicitadas
      },
      rechazadas () {
        return this.$store.getters.getNotificacionesRechazadas
      },
      aceptadas () {
        return this.$store.getters.getNotificacionesAceptadas
      },
      finalizadas () {
        return this.$store.getters.getNotificacionesFinalizadas
      },
      user () {
        return this.$store.getters.user
      },
      trabajadorcito () {
         return this.$store.getters.getTrabajadorActual
    },
    },
    mounted: function() {
      this.cargaNotificaciones();
      this.$store.dispatch('TraerTrabajadorActual', this.user);
      console.log("quiero ver trabajadorcitoooo: ", trabajadorcito);
      console.log("QUIERO VER AL USER TESIS 2020: ", user);

    },
    methods: {
      VerUbicacion(dir){
       window.open ("https://www.google.com/maps/search/" + dir)
    },
    cargaNotificaciones(){
      this.loading = true
      this.$store.dispatch('mostrarNotificaciones', this.$store.getters.user.uid).then(result => {
      this.loading = false
        })
    },
    aceptarTrabajo(evento){
      this.$store.dispatch('aceptarTrabajo',evento)
      this.cargaNotificaciones()  
    },
    rechazarTrabajo(evento){
      this.$store.dispatch('rechazarTrabajo', evento)
      this.cargaNotificaciones()  
    },
    eliminarTrabajo(evento){
      this.$store.dispatch('borrarTrabajo',evento)
      this.cargaNotificaciones()  
    },
    cambiarTrabajoHs(evento){
        let cambio = {
          comentario: this.comentario,
          hs:this.tiempoFecha,
          id:evento.id
        }
        this.$store.dispatch('cambiarTrabajoHs',cambio).then(result => {
            this.snackbar.texto = 'Cambio de HS enviada! '
            this.snackbar.show = true
          })          
        this.cargaNotificaciones()  
     },
    
        }
}
</script>