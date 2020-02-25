<template>
  <v-container fluid style="background-color:#012c4f">
    <v-layout row wrap>
     
      <v-flex xs12 md  lg xl sm6 offset-sm3 pt-5>
      <v-card>
        <v-img
          src="./images/mercadopago.jpg"
          height="250px"
        >
        </v-img>

        <v-card-title primary-title>
          <div>
            <div class="headline"> ¡Bienvenido {{user.displayName}}!</div>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn flat color="blue">Informacion</v-btn>
        </v-card-actions>

        <v-slide-y-transition>
          <v-card-text v-show="show">
            Ofrecemos a traves de la plataforma Mercado Pago a que abones del 1 al 10 del corriente mes la supcripcion a Cordoba Service! Pasada dicha fecha 
            sin ser abonado se desabilitara la cuenta por falta de pago.
          </v-card-text>
        </v-slide-y-transition>
         <v-btn rigth :to="'/MercadoPago/'" color="green"> Pagar</v-btn>
      </v-card>
    </v-flex> 
    


    </v-layout>
  </v-container>
    
</template>

<script>

export default {
  data () {
    return {
      show: true,
    }
  },
  computed: {
    user () {
        return this.$store.getters.user
    },
    categoria () {
      return this.$store.getters.categoria
    },
  }
}
</script>