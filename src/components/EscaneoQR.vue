
<template>
<div id="app">
<h2 class="blue darken-2 text-xs-center">ESCANEO CODIGO QR</h2>
<qrcode-stream @decode="onDecode" @init="onInit" /> 
    <h1 v-if="mostrarError > 0">Código QR inválido</h1>
</div>

  <!--<div id="app">
    <h2 class="blue darken-2 text-xs-center">ESCANEO CODIGO QR</h2>

    <qrcode-stream @decode="onDecode" @init="onInit" />
    <v-btn class="mx-2" fab dark small color="primary" v-if="mostrarError > 0" @click="limpiarCampos"><i class="fas fa-redo-alt"></i></v-btn>
    
    <h1 v-if="mostrarError > 0">No es el QR del cliente</h1>
  </div>-->
</template>

<script>
//import VueQrReader from "@/components/VueQrReader";
import { QrcodeStream } from 'vue-qrcode-reader'
export default {
  name: "app",
  components: { QrcodeStream },
  data() {
    return {
      errorMessage: "",
      mostrarError: 0,
      scanned: "",
      show: true,
      result: '',
      error: ''
    };
  },
  mounted() {
    /*this.video = this.$refs.video;
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
            this.video.src = window.URL.createObjectURL(stream);
            this.video.play();
        });
    }*/
},
  methods: {
    onDecode (result) {
      this.result = result
      let qr= this.$route.params.id
      if(result== qr){
        this.$store.dispatch('siguientePaso')
      }else{
        this.mostrarError= 1
      }
    },

    async onInit (promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = "ERROR: you need to grant camera access permisson"
        } else if (error.name === 'NotFoundError') {
          this.error = "ERROR: no camera on this device"
        } else if (error.name === 'NotSupportedError') {
          this.error = "ERROR: secure context required (HTTPS, localhost)"
        } else if (error.name === 'NotReadableError') {
          this.error = "ERROR: is the camera already in use?"
        } else if (error.name === 'OverconstrainedError') {
          this.error = "ERROR: installed cameras are not suitable"
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = "ERROR: Stream API is not supported in this browser"
        }
      }
    },
    limpiarCampos () {
      this.result = ''
      },
    /*async onDecode (content) {
    
      let qr= this.$route.params.id
      if(this.scanned== qr){
        this.$store.dispatch('siguientePaso')
      }
    },*/
    
    codeScanned(code) {
      this.scanned = code;
      let qr= this.$route.params.id
      if(code== qr){
        this.$store.dispatch('siguientePaso')
      }else{
        this.mostrarError= 1
      }
    },
    errorCaptured(error) {
      switch (error.name) {
        case "NotAllowedError":
          this.errorMessage = "Camera permission denied.";
          break;
        case "NotFoundError":
          this.errorMessage = "There is no connected camera.";
          break;
        case "NotSupportedError":
          this.errorMessage =
            "Seems like this page is served in non-secure context.";
          break;
        case "NotReadableError":
          this.errorMessage =
            "Couldn't access your camera. Is it already in use?";
          break;
        case "OverconstrainedError":
          this.errorMessage = "Constraints don't match any installed camera.";
          break;
        default:
          this.errorMessage = "UNKNOWN ERROR: " + error.message;
      }
      console.error(this.errorMessage);
      this.$refs.video
    }
  }
};
</script>

<style></style>