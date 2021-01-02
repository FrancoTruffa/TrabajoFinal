<template>
  <v-layout wrap>
    <v-flex
      sm4
      xs12
     class="d-flex justify-between align-center mb-3"
    >
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
      class="d-flex justify-between align-center mb-3"
    >
      <v-select
        v-model="type"
        :items="typeOptions"
        label="Tipo"
      ></v-select>
    </v-flex>
    <v-flex
      sm4
      xs12
     class="d-flex justify-between align-center mb-3"
    >
      <v-btn @click="$refs.calendar.next()">
        Siguiente
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
          class="my-caler"
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
                  <v-toolbar color="blue" dark>
                    <v-toolbar-title v-html="event.titulo"></v-toolbar-title>
                    <v-spacer></v-spacer>
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
          </v-calendar>
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
      type: 'day',
      start: hoy.getFullYear() + '-' + (hoy.getMonth()+1) + '-' + hoy.getDate(),
      end: '2022-01-06',
      typeOptions: [
        { text: 'Días', value: 'day' },
        { text: '4 día', value: '4day' },
        { text: 'Semana', value: 'week' },
        { text: 'Mes', value: 'month' },
      ],
        time: null,
        menu: false,
        dialog: false,
        menu2: false,
      today:  hoy.getFullYear() + '-' + (hoy.getMonth()+1) + '-' + hoy.getDate(),//'2019-01-15',
    }),
    mounted: function() {
        
    },
    computed: {
      user () {
        return this.$store.getters.user
      },
      events () {
        return this.$store.getters.getNotificacionesAceptadas
      },
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
                details: 'trabajo nuevo a las ' + this.time,
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

<style lang="stylus" scoped>

.v-calendar-daily_head-day-label {
  font-size: 26px;
  padding: 0 4px 4px 8px;
  line-height: 40px;
  cursor: pointer;
}
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

    &.my-caler{
      font-size: 4fpx;
    }
  }
</style>