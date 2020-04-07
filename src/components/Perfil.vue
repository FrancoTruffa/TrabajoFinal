  <template>
    <v-layout style="background-color:#012c4f">
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-img
          :src="user.photoURL"
          height="200px"
        >
          <v-layout
            column
            fill-height
          >
            <v-card-title>

              <v-spacer></v-spacer>

              
            </v-card-title>

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
              <v-list-tile-sub-title>Nombre</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>


          <v-divider inset></v-divider>

          <v-list-tile >
            <v-list-tile-action>
              <v-icon color="indigo">phone</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{telefono}}</v-list-tile-title>
              <v-list-tile-sub-title>Celular</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider inset></v-divider>

          <v-list-tile >
            <v-list-tile-action>
              <v-icon color="indigo">mail</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{email}}</v-list-tile-title>
              <v-list-tile-sub-title>Gmail</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>


          <v-divider inset></v-divider>

          <v-list-tile >
            <v-list-tile-action>
              <v-icon color="indigo">location_on</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{domicilio}}</v-list-tile-title>
              <v-list-tile-sub-title>Direccion </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>

      <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title class="headline" primary-title >
          Actualizar Datos del Perfil
        </v-card-title>

        <v-card-text>
            <v-text-field v-model="nombre" label="Nombre"></v-text-field>
            <v-text-field v-model="apellido" label="Apellido"></v-text-field>
            <v-text-field v-model="telefono" label="Telefono"></v-text-field>
            <v-text-field v-model="domicilio" label="Domicilio"></v-text-field>
            <v-text-field v-model="email" label="Domicilio"></v-text-field>
            <v-btn raised class="blue" @click="onPickFile" > Actualizar Imagen</v-btn>
            <input type="file" style="display: none" ref="fileInput" accept="image/*" @change="onPickFilePicked">
            
        </v-card-text>

        
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" @click="dialog = false">
            Cancelar
          </v-btn>
          <v-btn
            color="green"
            
            @click="dialog = false;actualizar()"
          >
            Actualizar
          </v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-layout>
</template>
<script>
import firebaseconfigobject from '@/api/firebaseConfig'
export default {
  name: 'perfil',
  props: {
    nombre: String,
    apellido: String,
    email: String,
    domicilio: String,
    foto: String,
    telefono: Number
  },
  data: () => ({ 
    dialog: false,
    imageUrl:''
  }),
  computed:{
    user(){
      return this.$store.getters.user
    }
  },
  methods: {
      actualizar () {
        this.$store.dispatch("actualizarDatos",) 
      },
}
}
</script>