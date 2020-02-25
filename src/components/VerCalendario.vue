<template>
  <v-layout wrap>
    <v-flex
      sm4
      xs12
      class="text-sm-left text-xs-center"
    ><br>
      <v-btn @click="$refs.calendar.prev()">
        <v-icon
          dark
          left
        >
          keyboard_arrow_left
        </v-icon>
        Antes
      </v-btn>
    </v-flex>
    <v-flex
      sm4
      xs12
      class="text-xs-center"
    >
      <v-select
        v-model="type"
        :items="typeOptions"
        label="Type"
      ></v-select>
    </v-flex>
    <v-flex
      sm4
      xs12
      class="text-sm-right text-xs-center"
    >
      <v-btn @click="$refs.calendar.next()">
        Sigui
        <v-icon
          right
          dark
        >
          keyboard_arrow_right
        </v-icon>
      </v-btn>
    </v-flex>
    <v-flex
      xs12
      class="mb-3"
    >
      <v-sheet height="500">
        <v-calendar
          locale
          ref="calendar"
          v-model="start"
          :type="type"
          :end="end"
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
                  </v-card-title>
                  
            
                </v-card>
              </v-menu>
              
            </template>
          </template>
        <template v-slot:dayHeader="{ date }">
            <template v-for="event in eventsMap[date]">
              <!-- all day events don't have time -->
              <div
                v-if="!event.hora"
                :key="event.titulo"
                class="my-event"
                @click="open(event)"
                v-html="event.titulo"
              ></div>
            </template>
          </template>
          <!-- the events at the bottom (timed) -->
          <template v-slot:dayBody="{ date, timeToY, minutesToPixels }">
            <template v-for="event in eventsMap[date]">
              <!-- timed events -->
              <div
                v-if="event.hora"
                :key="event.titulo"
                :style="{ top: timeToY(event.hora) + 'px', height: minutesToPixels(event.duration) + 'px' }"
                class="my-event with-time"
                @click="open(event)"
                v-html="event.titulo"
              ></div>
            </template>
          </template>
          </v-calendar><br>
          
          <v-flex sm4 xs12 class="text-sm-left text-xs-right">
             <v-btn  round color="green" @click="dialog = true" > Solicitar</v-btn>
          </v-flex>
             <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline"
          primary-title
        >
          Enviar Solicitud
        </v-card-title>

        <v-card-text>
            <v-text-field
            v-model="nombreEvento"
            label="Que tarea desea que le hagan?"
          ></v-text-field>
        <v-menu
        locale
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
            locale
            label="Selecciona la fecha del Trabajo"
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
            label="Seleccione el hs"
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
        <v-card-text>
        <v-textarea
            name="input-7-1"
            box
            label="Comentario"
            auto-grow
            v-model="comentario"
            value="Escribe en detalle lo que necesita"
        ></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="secondary"  
            @click="dialog = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="green"
            
            @click="dialog = false;crearEvento()"
          >
            Enviar
          </v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>
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
        </v-sheet>
    </v-flex>


  </v-layout>
</template>



<script>
import firebaseconfigobject from '@/api/firebaseConfig'
let hoy = new Date()

  export default {
      name:'editarHorarios',
      
    data: () => ({
      type: 'month',
      start: hoy.getFullYear() + '-' + (hoy.getMonth()+1) + '-' + hoy.getDate(),
      end: '2022-01-06',
      typeOptions: [
        { text: 'Dia', value: 'day' },
        { text: '4 dia', value: '4day' },
        { text: 'Semana', value: 'week' },
        { text: 'Mes', value: 'month' },
      ],
        time: null,
        menu: false,
        dialog: false,
        menu2: false,
        comentario: '',
        nombreEvento:'',
        date: new Date().toISOString().substr(0, 10),
        snackbar: {
          show: false,
          texto: ''
          },
      today:  hoy.getFullYear() + '-' + (hoy.getMonth()+1) + '-' + hoy.getDate(),//'2019-01-15',
      events: [

      ],
    }),
   mounted: function() {
        this.$store.dispatch('mostrarNotificaciones', this.$route.params.id).then(result => {
        this.events = this.$store.getters.cargarNotificaciones
       
    })
    },
    computed: {
      // convert the list of events into a map of lists keyed by date
      eventsMap () {
  
        const map = {}
        this.events.forEach(e => (map[e.confirmado] = map[e.confirmado] || []).push(e))
        return map
      }
    },
    methods: {
      crearEvento () {
           let evento = {
                titulo: this.nombreEvento,
                hora: this.time,
                fecha: this.date,
                id_trabajador: this.$route.params.id,
                id_cliente: this.$store.getters.user.uid,
                comentario: this.comentario,
                
          }
          this.$store.dispatch('guardarSolicitud', evento).then(result => {
            this.snackbar.texto = 'Solicitud enviada!'
            this.snackbar.show = true
          })           
      },
      open (event) {
        alert(event.titulo)
      },
    }
  }
</script>

<style lang="stylus" scoped>
  .my-event {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    background-color: #1867c0;
    color: #ffffff;
    border: 1px solid #1867c0;
    font-size: 12px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
    left: 4px;
    margin-right: 8px;
    position: relative;

    &.with-time {
      position: absolute;
      right: 4px;
      margin-right: 0px;
    }
  }
</style>