  <template>
    <v-layout>
    <v-flex  xs12 sm6 offset-sm3>
      <v-card>
        <v-img
          
          :src="foto"
          height="600px"
        >
          <v-layout
            column
            fill-height
          >

            <v-spacer></v-spacer>

          </v-layout>
        </v-img>

        <v-list two-line>
          <v-list-tile >
            <v-list-tile-action>
              <v-icon color="indigo">person</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{nombre}} {{apellido}}</v-list-tile-title>
              <v-list-tile-sub-title>Nombre perfil</v-list-tile-sub-title>
            </v-list-tile-content>

          </v-list-tile>


          <v-divider inset></v-divider>

          <v-list-tile >
            <v-list-tile-action>
              <v-icon color="indigo">fa fa-check</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{ especialidad }}</v-list-tile-title>
              <v-list-tile-sub-title>Especialidad</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider inset></v-divider>


        
          <v-divider inset></v-divider>




        </v-list>
      </v-card>
    </v-flex>
    </v-layout>
</template>

<script>
export default {
  name: 'verContacto',
  props: {
    nombre: String,
    apellido: String,
    email: String,
    serviciosEsp: String,
    foto: String,
    especialidad: String
  },
  methods: {
  verperfil(){
      location.replace('https://web.whatsapp.com/')
    }}
}
</script>