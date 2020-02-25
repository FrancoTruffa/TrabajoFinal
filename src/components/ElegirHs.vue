<template>
    <v-layout>
    <v-flex xs11 sm5>
      <v-menu
        ref="menu"
        v-model="menu2"
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
            label="Desde"
            prepend-icon="access_time"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="menu2"
          v-model="time"
          full-width
          @click:minute="$refs.menu.save(time)"
        ></v-time-picker>
      </v-menu>
    </v-flex>

    <v-flex xs11 sm5>
      <v-menu
        ref="menu3"
        v-model="menu3"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="time1"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="time1"
            label="Hasta"
            prepend-icon="access_time"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="menu3"
          v-model="time1"
          full-width
          @click:minute="$refs.menu3.save(time1)"
        ></v-time-picker>
      </v-menu>
    </v-flex>  

    </v-layout>
</template>

<script>
  export default {
      name:'elegirHs',
    data () {
      return {
        checkbox: true,
        time: null,
        menu2: false,
        modal2: false,
        time1:false,
        menu3: false,
        modal3: false, 
      }
    }
  }
</script>