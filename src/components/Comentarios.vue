<template>
  <v-layout justify-center>
    
    <v-flex xs12 sm8 md6>
      <v-card>
          <v-card-text>Calificacion General 
               <div class="text-xs-center">
                <v-rating v-model="rating"></v-rating> </div>
          </v-card-text>
        <v-card-text>Comentarios</v-card-text>   
        <v-list two-line>
          
          <template v-for="(item, index) in items">
            
            <v-subheader v-if="item.header":key="item.header" inset >
              {{ item.header }}
            </v-subheader>

            <v-divider v-else-if="item.divider" :key="index" inset ></v-divider>

            <v-list-tile
              v-else
              :key="item.title"
              avatar
              ripple
              @click.stop="dialog = true"
            >
              <v-list-tile-avatar>
                <img :src="item.avatar">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
              </v-list-tile-content>
          
            </v-list-tile>
          
          </template>
        </v-list>
      </v-card>
    </v-flex>
    
   
    <v-dialog v-model="dialog" max-width="290">
       <v-card>
         <v-card-title class="headline">Calificacion</v-card-title>

            <v-list-tile >

            <v-list-tile-content> <v-list-tile-title>Prolijidad</v-list-tile-title></v-list-tile-content>
            <v-list-tile-action><div><v-rating  v-model="rating" small></v-rating></div></v-list-tile-action>
          </v-list-tile>

          <v-card-text>
              Escelente muy vuebo para otro dia seguro lo llamo. abzo
          </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click="dialog = false" >
            De acuerdo
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
  
</template>

<script>
  export default {
      name: 'comentarios',
    data () {
      return {
        dialog: false,
        items: [
          {
            header: 'Today'
          },
          { divider: true },
          {
            avatar: 'https://picsum.photos/250/300?image=660',
            title: 'Excelente',
            subtitle:
              "<span class='text--primary'>Juanca Olave</span> &mdash; excelente tabajador, lo volveria a elegir"
          },
          {
            avatar: 'https://picsum.photos/250/300?image=821',
            title: 'Summer BBQ <span class="grey--text text--lighten-1"></span>',
            subtitle:
              "<span class='text--primary'>to Operations support</span> &mdash; Wish I could come."
          },
          {
            avatar: 'https://picsum.photos/250/300?image=783',
            title: 'Yes yes',
            subtitle:
              "<span class='text--primary'>Bella</span> &mdash; Do you have Paris recommendations"
          },
          {
            header: 'Yesterday'
          },
          { divider: true },
          {
            avatar: 'https://picsum.photos/250/300?image=1006',
            title: 'Dinner tonight?',
            subtitle:
              "<span class='text--primary'>LaToya</span> &mdash; Do you want to hang out?"
          },
          {
            avatar: 'https://picsum.photos/250/300?image=146',
            title: 'So long',
            subtitle:
              "<span class='text--primary'>Nancy</span> &mdash; Do you see what time it is?"
          },
          {
            header: 'Last Week'
          },
          { divider: true },
          {
            avatar: 'https://picsum.photos/250/300?image=1008',
            title: 'Breakfast?',
            subtitle:
              "<span class='text--primary'>LaToya</span> &mdash; Do you want to hang out?"
          },
          {
            avatar: 'https://picsum.photos/250/300?image=839',
            title:
              'Winter Porridge <span class="grey--text text--lighten-1"></span>',
            subtitle:
              "<span class='text--primary'>cc: Daniel</span> &mdash; Tell me more..."
          },
          {
            avatar: 'https://picsum.photos/250/300?image=145',
            title: 'Oui oui',
            subtitle:
              "<span class='text--primary'>Nancy</span> &mdash; Do you see what time it is?"
          }
        ]
      }
    }
  }
</script>