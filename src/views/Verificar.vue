<template>
  <v-app id="login" style="background-color:#012c4f">
    
    <v-container  align-center>
      <v-layout  align-center justify-center>
        <v-flex  pt-5 xs12 md4 >
        <v-img  src="./images/herr.png"></v-img>  <br>    
       
       <v-progress-linear
          :size="100"
          :width="7"
          color="white"
          indeterminate
         ></v-progress-linear> 
        
      </v-flex> 
      

      </v-layout>
      
    </v-container>
      
</v-app>
</template>

<script>
import Vue from 'vue'
import firebase, { firestore } from 'firebase'
import objetoFB from '@/api/firebaseConfig'

export default {
  components: {
    // facebookLogin
  },
  data: () => ({
  }),
  created() {
    this.$store.dispatch('verifyUser').then(result => {
      console.log(result)
      if (result == 'trabajador') {
        this.$router.replace('/MainTrabajador')
      } else if (result == 'cliente') {
        this.$router.replace('/Main')
      }
    }, error => {
      console.log(error)
      if (error === 'no registrado') {
        this.$router.replace('/registrar')
      }
    })
  }
  
}
</script>

<style scoped>
.btn-cs {
  color: white !important;
}
</style>
