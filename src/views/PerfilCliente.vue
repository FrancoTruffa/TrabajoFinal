<template>
  <v-container fluid style="background-color:#012c4f">
    <v-layout row wrap>
      <v-flex xs12 sm4 pt-5>
      </v-flex>
      <v-flex v-if="cliente.length > 0" xs12>

            <perfil :telefono="cliente[0].telefono" :nombre="cliente[0].nombre" 
                    :apellido="cliente[0].apellido" :email="cliente[0].email" 
                    :domicilio="cliente[0].domicilio " :foto="cliente[0].foto ">
            </perfil>

      </v-flex>


    </v-layout>
              <v-dialog 
                v-if="cliente.length === 0"
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
    cliente: '',
    loading: true,
  }),
  mounted: function () {
    this.$store.dispatch('mostrarCliente').then(result => {
      this.cliente = this.$store.getters.cargarClienteFiltro(this.$store.getters.user.uid)
    })
  }
};
</script>