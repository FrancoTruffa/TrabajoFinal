<template>
<v-container fluid >
   <v-layout justify-center row wrap >
          <v-flex  v-if="!ver">
            <v-form  @submit.prevent="enviarcomentario">
                 <div class="blue darken-2 text-xs-center">
                 <h2>CALIFICACION AL TRABAJADOR</h2>
               </div><br>
 
                <div class="text-xs-center">
                   <h3>Trabajo que le realizo: </h3>
                   <v-rating v-model="comentarios.trabajo" small ></v-rating>
                   <v-divider></v-divider>
                </div><br>

                <div class="text-xs-center">
                   <h3>Limpieza: </h3>
                   <v-rating v-model="comentarios.limpieza" small ></v-rating>
                   <v-divider></v-divider>
                </div><br>

                <div class="text-xs-center">
                   <h3>Puntualidad: </h3>
                   <v-rating small v-model="comentarios.puntualidad"></v-rating>
                   <v-divider></v-divider>
                </div><br>

                <div class="text-xs-center">
                   <h3>Precio: </h3>
                   <v-rating small v-model="comentarios.precio"></v-rating>
                   <v-divider></v-divider>
                </div><br>

                <div class="text-xs-center">
                   <h3>Recomendable: </h3>
                   <v-rating small v-model="comentarios.recomendable"></v-rating>
                   <v-divider></v-divider>
                </div><br>

                <div class="text-xs-center">
                   <h3>Calificacion General: </h3>
                   <v-rating small v-model="comentarios.calificacion"></v-rating>
                   <v-divider></v-divider>
                </div><br>

                <div class="text-xs-center">
                   <h3>Algun comentario extra sobre el trabajador: </h3>
                   <v-text-field v-model="comentarios.comentar" label="Comentarios sobre el trabajador" required ></v-text-field>
                </div>

                <div  class="text-xs-right">
                   <v-btn 
                     :disabled="!(comentarios.comentar.length > 0 && comentarios.precio > 0 && comentarios.trabajo > 0
                     && comentarios.limpieza > 0 && comentarios.puntualidad > 0 && comentarios.recomendable > 0 && comentarios.calificacion > 0 )"
                   type="submit" rigth color="primary"> Enviar</v-btn>
                </div>
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
         </v-form>
        </v-flex>

        <div v-if="ver">
           <v-icon size="300" color="green">check</v-icon>
           <h3>Calificacion enviada con éxito!</h3><br>
           <v-btn  class="text-xs-right" color="blue" :to="'/Main/'">Inicio</v-btn  >
        </div>

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
import firebaseconfigobject from '@/api/firebaseConfig'
  export default {
      name: 'puntuacion',
  
    data: () => ({
      ver:false,
      loading: false,
      comentarios:{
        trabajo:0,
        limpieza:0,
        puntualidad:0,  
        recomendable:0,
        comentar:'',
        calificacion:0,
        precio:0
      },
      snackbar: {
            show: false,
            texto: ''
      }

  }),
  methods:{
    enviarcomentario(){
        this.loading = true
        firebaseconfigobject.db.ref('/notificaciones').child(this.$route.params.id).update({
          calidadPrecio: this.comentarios.precio,
          calidadTrabajo:this.comentarios.trabajo,
          calificacion: this.comentarios.calificacion,
          finalizado:new Date().toISOString().substr(0, 10),
          limpieza:this.comentarios.limpieza,
          observacion:this.comentarios.comentar,
          puntualidad:this.comentarios.puntualidad,
          recomendacion: this.comentarios.recomendable
        }).then(result => {
            this.snackbar.texto = 'Calificacion enviada!'
            this.snackbar.show = true
            this.loading = false
            this.ver=true
            /* this.$router.push('MainTrabajador') */
          }) 
          
    },
  }

  }
</script>