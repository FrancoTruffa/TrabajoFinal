<template>
<v-container fluid style="background-color:#012c4f">
 <v-layout row wrap>
    <v-flex xs12 pt-5 >
      <v-stepper v-model="pasosPago" >


           <v-stepper-items>
             <v-stepper-content step="1">
               <escaneoQR>
               </escaneoQR> 

             </v-stepper-content>

             <v-stepper-content step="2">

               <puntuacion>
               </puntuacion>
             </v-stepper-content>

           </v-stepper-items>
        </v-stepper>
    </v-flex>
 
 </v-layout>
</v-container>
</template> 

<script>
import EscaneoQR from "@/components/EscaneoQR";
import Puntuacion from "@/components/Puntuacion";


export default {

  components: {
    EscaneoQR,
    Puntuacion

  },
  data: () => ({
  }),
  computed: {
    pasosPago () {
      return this.$store.getters.pasosPago
    }
  },
  mounted() {
     this.$store.dispatch('resetearPasos')
     this.$refs.video
  },

};
</script>