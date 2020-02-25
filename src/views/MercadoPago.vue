<template>
  <v-container fluid style="background-color:#012c4f">
    <v-layout justify-center row wrap>
        <v-flex  pt-5>
             <v-row  v-if="!ver" justify="center">
                <v-col cols="12" sm="10" md="8" lg="6">
                <v-card ref="form">
                  <form action=""  method="post" ref="pay" id="pay" >
                    <v-card-text>
                    <v-text-field
                        ref="cardNumber"
                        v-model="pago.cardNumber"
                        :rules="[() => !!pago.cardNumber || 'El campo es requerido',
                        () => !!pago.cardNumber && pago.cardNumber.length <= 19 || 'El numero de la tarjeta debe tener 16 digitos',]"
                        :error-messages="errorMessages"
                        label="Numero de Tarjeta"
                        data-checkout="cardNumber"
                        v-mask="mask"
                        placeholder="5031 7575 3453 0654"
                        counter="19"
                        required
                    ></v-text-field>
                    <v-text-field
                        ref="securityCode"
                        v-mask="mask2"
                        v-model="pago.securityCode"
                        data-checkout="securityCode"
                        :rules="[
                        () => !!pago.securityCode || 'El campo es requerido',
                        () => !!pago.securityCode && pago.securityCode.length <= 4 || 'El codigo de seguridad debe tener 3 digitos'
                        ]"
                        label="Codigo de Seguridad"
                        placeholder="123"
                        counter="4"
                        required
                    ></v-text-field>
                    <v-text-field
                        ref="mes"
                        v-mask="mask3"
                        v-model="pago.cardExpirationMonth"
                        data-checkout="cardExpirationMonth"
                        :rules="[() => !!pago.cardExpirationMonth || 'El campo es requerido']"
                        label="Mes de vencimiento"
                        placeholder="mm"
                        required
                    ></v-text-field>

                    <v-text-field
                        ref="anio"
                        v-mask="mask3"
                        v-model="pago.cardExpirationYear"
                        data-checkout="cardExpirationYear"
                        :rules="[() => !!pago.cardExpirationYear || 'El campo es requerido']"
                        label="Año de vencimiento"
                        placeholder="aa"
                        required
                    ></v-text-field>
                    <input type="hidden" id="docType" value="DNI" v-model="pago.docType" data-checkout="docType" />
                    <v-text-field
                        ref="nombreTarjeta"
                        v-model="pago.cardholderName"
                        data-checkout="cardholderName"
                        :rules="[() => !!pago.cardholderName || 'El campo es requerido']"
                        label="Nombre del titular de la tarjeta"
                        required
                        placeholder="Juan Perez Del Campillo"
                    ></v-text-field>
                    <v-text-field
                        ref="dni"
                        v-model="pago.docNumber"
                        :rules="[() => !!pago.docNumber || 'El campo es requerido']"
                        label="Documento"
                        required
                        data-checkout="docNumber"
                        placeholder="36523214"
                    ></v-text-field>

                    </v-card-text>
                    <v-divider class="mt-12"></v-divider>
                    <v-card-actions>
                   
                    <v-spacer></v-spacer>
                    <v-slide-x-reverse-transition>
                        <v-tooltip
                        v-if="formHasErrors"
                        left
                        >
                        <template v-slot:activator="{ on }">
                            <v-btn
                            icon
                            class="my-0"
                            @click="resetForm"
                            v-on="on"
                            >
                            <v-icon>mdi-refresh</v-icon>
                            </v-btn>
                        </template>
                        <span>Refresh form</span>
                        </v-tooltip>
                    </v-slide-x-reverse-transition>
                    <v-btn color="primary" text @click="onSubmit" :disabled="!this.pago.cardNumber" :loading="loading">Pagar</v-btn>
                    </v-card-actions>
                  </form>
                </v-card>
                </v-col>
            </v-row>
        </v-flex>
        <v-flex xs12 md  lg xl sm6 offset-sm3  v-if="ver">
           <v-icon size="300" color="green">check</v-icon>
           <h3>Pago enviada con éxito!</h3><br>
           <v-btn  class="text-xs-right" color="blue" :to="'/MainTrabajador/'">Inicio</v-btn  >
        </v-flex>
                  


        
        <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="snackbar.time"
    >
      {{ snackbar.texto }}
      <v-btn
        color="black"
        text
        @click="snackbar.show = false"
      >
        Cerrar
      </v-btn>
    </v-snackbar>
    </v-layout>
  </v-container>
    
</template>

<script>
import { mask } from 'vue-the-mask'
import Vue from 'vue'

  export default {
    directives: {
      mask,
    },
    data () {
      return {
        ver:false,
        pago: {
          cardNumber: null,
          securityCode: null,
          cardExpirationMonth:null,
          cardExpirationYear: null,
          cardholderName: null,
          docType: 'DNI',
          docNumber: null,
          paymentMethodId: null
        },
        loading: false,
        snackbar: {
          texto: '',
          color: 'red',
          show: false,
          time: 3000
        },
        errorMessages: '',
        mask: '####-####-####-####',
        mask2: '####',
        mask3: '####',
         aleatorio: Math.floor(Math.random() * 10000),
       }
    },
    computed: {
      user () {
        return this.$store.getters.user
    },
    },
    mounted() {
/*       Vue.http.get('http://localhost:8000/api/pagos', {  }, { headers: { 'content-type': 'application/json', 'X-Requested-With': 'XMLhttpRequest' }}).then(result => {
                console.log(result)
              },
              error => {
                console.log(error)
              })
      let recaptchaScript = document.createElement('script')
      //let formulario = document.getElementById('FormularioPago')
      recaptchaScript.setAttribute('src', 'https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js')
      //recaptchaScript.setAttribute('data-public-key', 'TEST-92d12afe-41be-4855-9a9f-87bccf36814c')
      //recaptchaScript.setAttribute('data-transaction-amount', '100.00')
      document.head.appendChild(recaptchaScript) */
    },
    methods: {
      getBin() {
        return this.pago.cardNumber.substring(0,6);
      },
      onSubmit (e) {
         let hoy = new Date()
         let creacion = (hoy.getFullYear()) + '-' + ((hoy.getMonth() + 1)) + '-' + (hoy.getDate()) + ' ' + hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds()
 
        this.loading = true
        if (( this.pago.cardNumber === '5032-7557-3453-0606' || this.pago.cardNumber === '4170-0688-1010-8020' || this.pago.cardNumber === '3711-8030-3257-522') && (this.pago.cardExpirationMonth === '11' && this.pago.cardExpirationYear === '25' ) && (this.pago.securityCode === '123' || this.pago.securityCode === '1234' ))  {
          this.$store.dispatch('guardarPagoMensualTrabajador', { id: this.user.uid, comprobante:this.aleatorio, fecha: creacion}).then(result => {
                this.snackbar.color = 'success'
                this.snackbar.texto = 'El pago se realizo con exito ' 
                this.snackbar.show = true
                this.loading = false
                this.ver=true
              })
        }else{
                this.snackbar.color = 'error'
                this.snackbar.texto = 'Hubo un error en el pago, intente nuevamente o utilice otra tarjeta'
                this.snackbar.show = true
                this.loading = false
        }
        
/*         this.loading = true
        window.Mercadopago.setPublishableKey("TEST-92d12afe-41be-4855-9a9f-87bccf36814c")
        window.Mercadopago.getPaymentMethod({
            "bin": this.getBin()
        }, this.setPaymentMethodInfo) */
      },
      setPaymentMethodInfo(status, response) {
          if (status == 200) {
              
            this.pago.paymentMethodId = response[0].id
            var $form = document.querySelector('#pay');
            window.Mercadopago.createToken($form, this.sdkResponseHandler); // The function "sdkResponseHandler" is defined below
            
          } else {
              this.loading = false
              alert(`payment method info error: ${response}`);  
          }
      },
      sdkResponseHandler(status, response) {
         if (status != 200 && status != 201) {
              console.log('Error')
              console.log(response)
              this.snackbar.color = 'error'
              this.snackbar.texto =  'Quizas no completo todos los datos o Es posible que esta tarjeta ya se utilizo'
              this.snackbar.show = true
              this.loading = false
          }else{
              //let dato = { token: response.id, email: this.pago.email, paymentmethod: this.pago.paymentMethodId }
              //console.log(dato)
              this.$http.get('http://localhost:8000/api/pagos?token=' + response.id + '&email=' + this.user.email + '&paymentmethod=' + this.pago.paymentMethodId, {}, { headers: { 'content-type': 'application/json', 'X-Requested-With': 'XMLhttpRequest' }}).then(result => {
                this.$store.dispatch('guardarPagoMensualTrabajador', { id: this.user.uid, comprobante: result.body.message.response.id, fecha: result.body.message.response.date_created })
                this.snackbar.color = 'success'
                this.snackbar.texto = 'El pago se realizo con exito id: ' + result.body.message.response.id
                this.snackbar.show = true
                this.loading = false
              },
              error => {
                console.log(error)
                this.snackbar.color = 'error'
                this.snackbar.texto = 'Hubo un error en el pago, intente nuevamente o utilice otra tarjeta'
                this.snackbar.show = true
                this.loading = false
              })
              
          }
      }
    }
  }
</script>
