<template>
  <v-container class="text-xs-center" fluid fill-height style="background-color:#012c4f">
    <v-layout row wrap >
      <v-flex  xs12 pt-5>
    <editarHorarios></editarHorarios>

      </v-flex>
    </v-layout>
 </v-container>

</template>

<script>
import EditarHorarios from "@/components/EditarHorarios";
  export default {
    components:{
      EditarHorarios
    },
    data () {
      return {
        dialog: false,
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      }
    },
    mounted () { 
      this.$store.dispatch('mostrarNotificaciones', this.user.uid)
      
    }
  }
</script>