<template>
  <v-app style="background-color:#012c4f">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs11 sm4 md10 text-xs-center >
              <div>
                <v-btn depressed  block large v-on:click="verperfilCliente()" color="error">CLIENTE</v-btn>
              </div><br>

              <div>
                <v-btn depressed block large v-on:click="verperfilTrabajador()"  color="error">TRABAJADOR</v-btn>
              </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
export default {

     methods: {
    verperfilCliente(){
      this.$router.push('RegistroCliente')
    },
    verperfilTrabajador(){
      this.$router.push('RegistroTrabajador')
    }
  }
}
</script>