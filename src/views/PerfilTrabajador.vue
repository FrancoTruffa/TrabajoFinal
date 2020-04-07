<template>
  <v-container fluid style="background-color:#012c4f">
    <v-layout row wrap >
      <v-flex pt-5 sm4 xs12 v-if="trabajadorcito.length > 0">
        <perfil :telefono="trabajadorcito[0].telefono" :nombre="trabajadorcito[0].nombre" :apellido="trabajadorcito[0].apellido" 
        :email="trabajadorcito[0].email" :domicilio="trabajadorcito[0].domicilio " :foto="trabajadorcito[0].foto "></perfil>
      </v-flex>
    </v-layout>
              <v-dialog 
                v-if="trabajadorcito.length === 0"
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
import Perfil from "@/components/Perfil";

export default {

  components: {
    Perfil,
  },
  data: () => ({
    trabajador: '',
    loading: true,
  }),
  
  computed:{
    trabajadorcito () {
         return this.$store.getters.getTrabajadorActual
    },
  },

  mounted: function () {
    this.$store.dispatch('mostrarTrabajador').then(result => {
      this.trabajador = this.$store.getters.cargarTrabajadorFiltro(this.$store.getters.user.uid)
    })
    console.log('mostrame el trabajador rey de reyes: ', this.trabajdor);
    console.log('mostrame el TRABAJADORCITO RETYYY: ', this.trabajadorcito[0]);
      
    
  }
};
</script>