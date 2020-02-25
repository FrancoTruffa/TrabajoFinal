<template>
  <v-container  style="background-color:#012c4f">
    <v-layout row wrap >
      <v-flex pt-5 v-if="trabajador.length > 0" xs12>
        <perfil :telefono="trabajador[0].telefono" :nombre="trabajador[0].nombre" :apellido="trabajador[0].apellido" :email="trabajador[0].email" :domicilio="trabajador[0].domicilio " :foto="trabajador[0].foto "></perfil>
      </v-flex>
    </v-layout>
                      <v-dialog 
                v-if="trabajador.length === 0"
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

  mounted: function () {
    this.$store.dispatch('mostrarTrabajador').then(result => {
      this.trabajador = this.$store.getters.cargarTrabajadorFiltro(this.$store.getters.user.uid)
    })
    
  }
};
</script>