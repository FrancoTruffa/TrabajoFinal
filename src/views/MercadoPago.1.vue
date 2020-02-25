<template>
  <v-container fluid style="background-color:#012c4f">
    <v-layout row wrap>
        <v-flex pt-5>
          <form action="" v-on:submit.prevent="onSubmit" method="post" ref="pay" id="pay" >
              <fieldset>
                  <ul>
                      <li>
                          <label for="email">Email</label>
                          <input id="email" name="email" v-model="pago.email" value="test_user_19653727@testuser.com" type="email" placeholder="your email"/>
                      </li>
                      <li>
                          <label for="cardNumber">Credit card number:</label>
                          <input type="text" id="cardNumber" v-model="pago.cardNumber" data-checkout="cardNumber" placeholder="4509 9535 6623 3704" onselectstart="return false" onpaste="return false" onCopy="return false" onCut="return false" onDrag="return false" onDrop="return false" autocomplete=off />
                      </li>
                      <li>
                          <label for="securityCode">Security code:</label>
                          <input type="text" id="securityCode" v-model="pago.securityCode" data-checkout="securityCode" placeholder="123" onselectstart="return false" onpaste="return false" onCopy="return false" onCut="return false" onDrag="return false" onDrop="return false" autocomplete=off />
                      </li>
                      <li>
                          <label for="cardExpirationMonth">Expiration month:</label>
                          <input type="text" id="cardExpirationMonth" v-model="pago.cardExpirationMonth" data-checkout="cardExpirationMonth" placeholder="12" onselectstart="return false" onpaste="return false" onCopy="return false" onCut="return false" onDrag="return false" onDrop="return false" autocomplete=off />
                      </li>
                      <li>
                          <label for="cardExpirationYear">Expiration year:</label>
                          <input type="text" id="cardExpirationYear" v-model="pago.cardExpirationYear" data-checkout="cardExpirationYear" placeholder="2015" onselectstart="return false" onpaste="return false" onCopy="return false" onCut="return false" onDrag="return false" onDrop="return false" autocomplete=off />
                      </li>
                      <li>
                          <label for="cardholderName">Card holder name:</label>
                          <input type="text" id="cardholderName" v-model="pago.cardholderName" data-checkout="cardholderName" placeholder="APRO" />
                      </li>
                      <li>
                          <label for="docType">Document type:</label>
                          <select id="docType" value="DNI" v-model="pago.docType" data-checkout="docType"></select>
                      </li>
                      <li>
                          <label for="docNumber">Document number:</label>
                          <input type="text" v-model="pago.docNumber" id="docNumber" data-checkout="docNumber" placeholder="12345678" />
                      </li>
                  </ul>
                  <input type="hidden" v-model="pago.paymentMethodId" name="paymentMethodId" />
                  <input type="submit" value="Pay!" />
              </fieldset>
          </form>
        </v-flex>
    </v-layout>
  </v-container>
    
</template>

<script>



  export default {
    data () {
      return {
        pago: {
          email: 'hola@hotmai.com',
          cardNumber: '5031 7557 3453 0604',
          securityCode: 123,
          cardExpirationMonth:11,
          cardExpirationYear: 25,
          cardholderName: 'Matias Miranda',
          docType: 'DNI',
          docNumber: 23687576,
          paymentMethodId: 1
        }
      }
    },
    mounted() {
      let recaptchaScript = document.createElement('script')
      //let formulario = document.getElementById('FormularioPago')
      recaptchaScript.setAttribute('src', 'https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js')
      //recaptchaScript.setAttribute('data-public-key', 'TEST-92d12afe-41be-4855-9a9f-87bccf36814c')
      //recaptchaScript.setAttribute('data-transaction-amount', '100.00')
      document.head.appendChild(recaptchaScript)
    },
    methods: {
      onSubmit (e) {
        window.Mercadopago.setPublishableKey("TEST-92d12afe-41be-4855-9a9f-87bccf36814c")
        window.Mercadopago.getPaymentMethod({
            "bin": this.pago.cardNumber.substring(0,6)
        }, this.setPaymentMethodInfo)
      },
      setPaymentMethodInfo(status, response) {
        console.log(response)
          if (status == 200) {
              const paymentMethodElement = document.querySelector('input[name=paymentMethodId]');

              if (paymentMethodElement) {
                  paymentMethodElement.value = response[0].id;
                  let form_data = new FormData();

                  for ( let key in this.pago ) {
                    //console.log(this.pago[key])
                      form_data.append(key, this.pago[key]);
                  }
                  console.log(form_data)
                  window.Mercadopago.createToken(form_data, this.sdkResponseHandler)
              } else {
                  const input = document.createElement('input');
                  input.setattribute('name', 'paymentMethodId');
                  input.setAttribute('type', 'hidden');
                  input.setAttribute('value', response[0].id);     

                  form.appendChild(input);

                  
              }
          } else {
              alert(`payment method info error: ${response}`);  
          }
      },
      sdkResponseHandler(status, response) {
          if (status != 200 && status != 201) {
              alert("verify filled data");
          }else{
              console.log(response.id)
              this.$http.post('http://localhost:8000/api/pagos', { token: response.id, email: this.pago.email, paymentmethod: this.pago.paymentMethodId }).then(result => {
                console.log(result)
              })
          }
      }
    }
  }
</script>
