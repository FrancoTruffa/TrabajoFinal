<template>

  <v-app  text-align: center id="splash"  style="background-color:#01579B;
                                                 background-image: url('./images/herr.png');
                                                 background-size:100px;
                                                 background-attachment: fixed;
                                                 background-position: center;background-repeat: no-repeat  " 
                                                 dark>
      
    <v-container align-center>
      <v-progress-circular :indeterminate="true" :size="70" class="fixed-bottom"></v-progress-circular>
    </v-container >
  </v-app>
</template>

<script>


export default {
  name: 'Splash',
  components: {
  },
  data: () => ({

  }),
  props: {
  },
  mounted: function () {
    setTimeout(this.redirect, 2000)
  },
  methods: {
  
  }
}

</script>
