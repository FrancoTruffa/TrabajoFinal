<template>
<v-app style="background-color:#012c4f">
<v-container align-center>

   <h1 > Usted Trabaja? </h1> 

    <v-flex xs12 sm4 md4>
    <v-checkbox label="Lunes"  @click="dialog = true" ></v-checkbox>
    <v-checkbox  label="Martes"  @click="dialog = true"  ></v-checkbox>
    <v-checkbox  label="Miercoles"  @click="dialog = true" ></v-checkbox>
    <v-checkbox  label="Jueves"  @click="dialog = true" ></v-checkbox>
    <v-checkbox label="Viernes"  @click="dialog = true" ></v-checkbox>
    <v-checkbox label="Sabado" @click="dialog = true"  ></v-checkbox>
    <v-checkbox  label="Domingo"  @click="dialog = true" ></v-checkbox>
    </v-flex>

  <v-flex  xs11 sm5>
    <v-checkbox
      v-model="checkbox"
      :label="`No tengo horarios de trabajos fijos`"
    ></v-checkbox>
  </v-flex>

    <v-flex xs12 sm4 text-xs-right>
     <v-btn rigth color="success" v-on:click="perfilTrabajador()"> Listo </v-btn>
  </v-flex>

</v-container>
<v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline"
          primary-title
        >
          Elegir hs de Trabajo
        </v-card-title>

      <elegirHs></elegirHs>

      <v-btn
            color="green"
            flat
            @click="dialog = false"
      >Listo
      </v-btn>
      </v-card>
    </v-dialog>
</v-app>

</template>

<script>
import ElegirHs from "@/components/ElegirHs";
  export default {
  components: {
    ElegirHs
  },
   
  data: () => ({
    checkbox: true,
    dialog: false,
  }),
  props: {
  },
  methods: {
    redirect (url) {
      this.$router.push('/' + url)
    },
      perfilTrabajador(){
        this.$router.push('PerfilTrabajador')
      }
  }
}
</script>