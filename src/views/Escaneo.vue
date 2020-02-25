<template>
  <v-app id="login" style="background-color:#012c4f">
    
    <v-container  align-center>
      <v-layout  align-center justify-center>

        <v-flex pt-5 xs12 md4 >
        <h2 class="blue darken-2 text-xs-center">Codigo QR</h2><br>
        <v-card  color="white darken-2">
        <v-container>
        <v-row justify="space-between">
        <v-col cols="auto">
            <qr-code 
            class="text-xs-center"
            :text="texto"
            :size="300"
            color="black"
            bg-color="white" 
            error-level="L">
           </qr-code>
        </v-col>

        <v-col
          cols="auto"
          class="text-center pl-0"
        >
          <v-row
            class="flex-column ma-0 fill-height"
            justify="center"
          >
            <v-col class="px-0">
              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
            </v-col>

            <v-col class="px-0">
              <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>
            </v-col>

            <v-col class="px-0">
              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
          </v-flex>
<!--         <v-flex  pt-5 xs12 md4 >
      <h2 class="blue darken-2 text-xs-center">Codigo QR</h2><br>
            <qr-code 
        class="text-xs-center"
            :text="texto"
            :size="300"
            color="black"
            bg-color="white" 
            error-level="L">
        </qr-code><br><br>

        <h2 class="yellow darken-2 text-xs-center"> ¡ Presenta el QR al cliente para calificar el trabajo realizado !</h2><br>

        
      </v-flex>  -->
      

      </v-layout>
      
    </v-container>
      
</v-app>
</template>

<script>

export default {
  data: () => ({
    text: 'Talleres'
  
  }),
  computed: {
    texto () {
        return this.$route.params.id
      },
    },
  beforeMount: function () {
    console.log(this.$route.params.id)
  },

};
</script> 