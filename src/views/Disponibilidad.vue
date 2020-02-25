<template>
     <v-container fluid style="background-color:#012c4f">
         <v-layout row wrap>
             <v-flex class=" darken-2 text-xs-center" pt-5>
                 <h1>
                     DIAS NO DISPONIBLES
                 </h1><br>
             </v-flex><br>

             <v-flex xs12>
                 <v-form @submit.prevent="enviarDisponibilidad">
                     
                 
                 <h2 class="blue darken-0 text-xs-center">
                     INICIO
                 </h2>
                 <br>
                 <v-menu
                    locale
                    v-model="menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                    >
                    <template v-slot:activator="{ on }">
                    <v-text-field
                    v-model="fechaInicio"
                    locale
                    label="Seleccionar la fecha inicio de NO dispobilidad"
                    prepend-icon="event"
                    readonly
                    v-on="on"
                    ></v-text-field>
                    </template>
                    <v-date-picker locale v-model="fechaInicio" @input="menu2 = false"></v-date-picker>
                    </v-menu> 
                    
                    <v-menu
                        ref="menu2"
                        v-model="menu2"
                        locale
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="time"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        max-width="290px"
                        min-width="290px"
                        >
                        <template v-slot:activator="{ on }">
                        <v-text-field
                        v-model="time"
                        label="Seleccionar el horario de inicio"
                        prepend-icon="access_time"
                        readonly
                        v-on="on"
                        ></v-text-field>
                        </template>
                        <v-time-picker
                        v-if="menu2"
                        v-model="time"
                        full-width
                        @click:minute="$refs.menu2.save(time)"
                        ></v-time-picker>
                    </v-menu>

                    <h2 class="blue darken-0 text-xs-center">
                     FIN
                    </h2>
                    <br>
                 <v-menu
                    locale
                    v-model="menu3"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                    >
                    <template v-slot:activator="{ on }">
                    <v-text-field
                    v-model="fechaFin"
                    locale
                    label="Seleccionar la fecha en la que ya estas disponible"
                    prepend-icon="event"
                    readonly
                    v-on="on"
                    ></v-text-field>
                    </template>
                    <v-date-picker locale v-model="fechaFin" @input="menu3 = false"></v-date-picker>
                    </v-menu> 
                    
                    <v-menu
                        ref="menu4"
                        v-model="menu4"
                        locale
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="time4"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        max-width="290px"
                        min-width="290px"
                        >
                        <template v-slot:activator="{ on }">
                        <v-text-field
                        v-model="time4"
                        label="Seleccionar el horario final"
                        prepend-icon="access_time"
                        readonly
                        v-on="on"
                        ></v-text-field>
                        </template>
                        <v-time-picker
                        v-if="menu4"
                        v-model="time4"
                        full-width
                        @click:minute="$refs.menu4.save(time4)"
                        ></v-time-picker>
                    </v-menu>

                    <div  class="text-xs-right">
                    <!-- <v-text v-if="time == null || time4 == null"> Complete los datos para enviar la No Disponibilidad!</v-text> -->
                    <v-text v-if="fechaInicio > fechaFin || (fechaInicio == fechaFin && time > time4)"> Por favor Colocar un horario inicial menor que el final</v-text>
                    <v-btn  :disabled="!(fechaInicio < fechaFin || (fechaInicio == fechaFin && time < time4))" color="green" type="submit" rounded right>Guardar</v-btn>
                    </div>
                    <!--                 <div  class="text-xs-right">
                   <v-btn type="submit" rigth color="primary"> Enviar</v-btn>
                </div> -->
                    </v-form>
             </v-flex>
                <v-snackbar
                    v-model="snackbar.show"
                    color="green"
                    >
                    {{ snackbar.texto }}
                    <v-btn
                        color="black"
                        flat
                        @click="snackbar.show = false"
                    >
                        Cerrar
                    </v-btn>
                </v-snackbar>
         </v-layout>
     </v-container>
</template>

<script>
import firebaseconfigobject from '@/api/firebaseConfig'
export default {
    data:() => ({
        menu2: false,
        menu: false,
        menu3: false,
        menu4: false,
        fechaInicio: new Date().toISOString().substr(0,10),
        time: null,
        fechaFin: new Date().toISOString().substr(0,10),
        time4: null,
        snackbar: {
            show: false,
            texto: ''
        }

    }),
    methods:{
        enviarDisponibilidad(){
            console.log('vamos a ver que muestra DATE ', this.fechaInicio)
            console.log('vamos a ver que muestra DATE ', this.fechaF)
            /*otra forma es stringFormat (supongo que asi se llama la variable, no creo que sea un tipo de dato) = ... 
            entonces despues hacemos: fecha_nueva = new Date(stringFormat);*/
            if( Date.parse(this.fechaInicio) <= Date.parse(this.fechaFin)){
            firebaseconfigobject.db.ref('/disponibilidad').push({
                    fecha_inicio: this.fechaInicio,
                    hora_inicio: this.time,
                    id_trabajador: this.$store.getters.user.uid,
                    fecha_fin: this.fechaFin,
                    hora_fin: this.time4
                }).then(result => {
                this.snackbar.texto = 'Solicitud de No Disponibilidad Enviada!'
                this.snackbar.show = true
                /* this.$router.push('MainTrabajador') */
                })          
         }
         else{window.alert("la fecha de inicio es mayor que la de fin, por favor, verificar las fechas ingresadas nuevamente")}

        }
    }
}
</script>