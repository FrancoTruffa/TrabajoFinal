<template>
  <v-layout fluid >
      <!-- dialogo crear evento -->
      <div class="text-xs-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline"
          primary-title
        >
          Crear nuevo evento
        </v-card-title>

        <v-card-text>
            <v-text-field
            v-model="nombreEvento"
            label="Ingrese el nombre del evento"
          ></v-text-field>
            <v-menu
        v-model="menu2"
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
            v-model="date"
            label="Selecciona la fecha del evento"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
        
      </v-menu> 
      <v-menu
        ref="menu"
        v-model="menu"
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
            label="Picker in menu"
            prepend-icon="access_time"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="menu"
          v-model="time"
          full-width
          @click:minute="$refs.menu.save(time)"
        ></v-time-picker>
      </v-menu>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green"
            flat
            @click="dialog = false;crearEvento()"
          >
            Crear
          </v-btn>
          <v-btn
            color="secondary"
            flat
            @click="dialog = false"
          >
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
      <!-- boton crear evento -->
       <v-btn
              color="grey darken-"
              dark
              small
              absolute
              bottom
              right
              fab
              @click="dialog = true"
            >
              <v-icon>add</v-icon>
            </v-btn>

<!-- Calendario -->

    <v-flex>
      <v-sheet height="500">
  
      <v-btn
        fab
        outline
        small
        absolute
        left
        color="white"
        @click="$refs.calendar.prev()"
      >
        <v-icon dark>
          keyboard_arrow_left
        </v-icon>
      </v-btn>
      <v-btn
        fab
        outline
        small
        absolute
        right
        color="white"
        @click="$refs.calendar.next()"
      >
        <v-icon
          dark
        >
          keyboard_arrow_right
        </v-icon>
      </v-btn>
      <br><br><br>
      
        <v-calendar
          locale
          ref="calendar"
          :now="today"
          :value="today"
          color="blue"
        >
        
          <template v-slot:day="{ date }">
            
            <template v-for="event in eventsMap[date]">
              <v-menu
                :key="event.titulo"
                v-model="event.open"
                full-width
                offset-x
              >
              
                <template v-slot:activator="{ on }">
                  <div
                    v-if="!event.time"
                    v-ripple
                    class="my-event"
                    v-on="on"
                    v-html="event.titulo"
                  ></div>
                </template>
                <v-card
                  color="grey lighten-4"
                  min-width="350px"
                  flat
                >
                  <v-toolbar
                    color="blue"
                    dark
                  >
                    <v-btn icon>
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <v-toolbar-title v-html="event.titulo"></v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon>
                      <v-icon>favorite</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon>more_vert</v-icon>
                    </v-btn>
                  </v-toolbar>
                  <v-card-title >
                    <ul>
                       <li class="black--text"> Actividad: {{event.comentarios }}</li>
                       <li class="black--text"> Hora: {{event.hora }}</li>
                       <li class="black--text"> Cliente: {{event.cliente.apellido }},{{event.cliente.nombre }} </li>

                    </ul>
<!--                     <p>
                    <span class="black--text" v-html="event.comentarios"></span>
                    </p><br>
                    <p>
                      <span class="black--text" v-html="event.hora"></span>
                    </p>
 -->
                  </v-card-title>
                  <v-card-actions>
                    <v-btn
                      flat
                      color="secondary"
                    >
                      Cancel
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-menu>
            </template>
          </template>
        </v-calendar>
      </v-sheet>

    </v-flex>
  </v-layout>
</template>

<style lang="stylus" scoped>
  .my-event {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    background-color: #1867c0;
    color: #ffffff;
    border: 1px solid #1867c0;
    width: 100%;
    font-size: 12px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
  }
</style>

<script>
import firebaseconfigobject from '@/api/firebaseConfig'
let hoy = new Date()

  export default {
      name:'editarCalendar',
      
    data: () => ({
        time: null,
        menu: false,
        dialog: false,
        menu2: false,
      today:  hoy.getFullYear() + '-' + (hoy.getMonth()+1) + '-' + hoy.getDate(),//'2019-01-08',
      events: [
/*         {
          title: '',
          details: '',
          date: '',
          open: false
        } */
      ]
    }),
   mounted: function() {
        console.log('Estoy en Mostrarrrrrr')
        this.$store.dispatch('mostrarNotificaciones', this.$store.getters.user.uid).then(result => {
        this.events = this.$store.getters.cargarNotificaciones
        console.log(this.date )
    })
    },
    computed: {
      // convert the list of events into a map of lists keyed by date
      eventsMap () {
        const map = {}
        this.events.forEach(e => (map[e.fecha] = map[e.fecha] || []).push(e))
        return map
      }
    },
    methods: {
      open (event) {
        alert(event.titulo)
      },
      crearEvento () {
        firebaseconfigobject.db.ref('/agendaTrabajador').push({
                title: this.nombreEvento,
                details: this.time,
                date: this.date,
                open: false
        })
      },

       verQR(){
      this.$router.push('MensajesEnviar')
    }
    }
  }
</script>