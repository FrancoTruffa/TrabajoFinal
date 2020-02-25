<template>
  <v-layout justify-center>
    
    <v-flex xs12 sm8 md6>
      <v-card>
          <v-card-text> <h2 class="text-xs-center">CALIFICACION GENERAL </h2 >
               <div class="text-xs-center">
                <v-rating color="yellow accent-4" v-model="calificacionGeneral" readonly></v-rating> </div>
          </v-card-text>

      <v-card-actions class="pa-3">
           Calidad Precio
          <v-spacer></v-spacer>

        <v-rating
          v-model="precio"
          color="yellow accent-4"
          dense
          hover
          size="18"
          readonly
         ></v-rating>
    </v-card-actions>

      <v-card-actions class="pa-3">
           Calidad Trabajo 
          <v-spacer></v-spacer>

        <v-rating
          v-model="trabajo"
          color="yellow accent-4"
          dense
          hover
          size="18"
          readonly
         ></v-rating>
    </v-card-actions>

        <v-card-actions class="pa-3">
           Calidad Limpieza
          <v-spacer></v-spacer>

        <v-rating
          v-model="limpieza"
          color="yellow accent-4"
          dense
          hover
          size="18"
          readonly
         ></v-rating>
    </v-card-actions>

    <v-card-actions class="pa-3">
          Puntualidad
          <v-spacer></v-spacer>

        <v-rating
          v-model="puntualidad"
          color="yellow accent-4"
          dense
          hover
          size="18"
          readonly
         ></v-rating>
    </v-card-actions>

    <v-card-actions class="pa-3">
            Recomendabilidad 
            <v-spacer></v-spacer>

          <v-rating
            v-model="recomendable"
            color="yellow accent-4"
            dense
            hover
            size="18"
            readonly
          ></v-rating>
      </v-card-actions>

 
      </v-card>
    </v-flex>
    
  </v-layout>
  
</template>

<script>
export default {
      name: 'verComentarios',
    data () {
      return {
        rating: 0,
        dialog: false,

      }
    },
    watch: {
    },
    computed: {
      precio () {
        return this.$store.getters.getCalidadPrecio.reduce(function(a, b) {
          return a + b.calidadPrecio
        }, 0)/this.$store.getters.getCalidadPrecio.length
      },
      limpieza () {
        return this.$store.getters.getLimpieza.reduce(function(a, b) {
          return a + b.limpieza
        },0)/this.$store.getters.getLimpieza.length
      },
      puntualidad () {
        return this.$store.getters.getPuntualidad.reduce(function(a, b) {
          return a + b.puntualidad
        },0)/this.$store.getters.getPuntualidad.length
      },
      trabajo () {
        return this.$store.getters.getCalidadTrabajo.reduce(function(a, b) {
          return a + b.calidadTrabajo
        },0)/this.$store.getters.getCalidadTrabajo.length
      },
      recomendable () {
        return this.$store.getters.getRecomendacion.reduce(function(a, b) {
          return a + b.recomendacion
        },0)/this.$store.getters.getRecomendacion.length
      },
      calificacionGeneral () {
        return (this.precio+this.limpieza+this.trabajo+this.puntualidad+this.recomendable)/5
      }
    },
    mounted() {
      this.$store.dispatch('calificaciones',this.$route.params.id)
    },
    methods: {

        }
}
</script>