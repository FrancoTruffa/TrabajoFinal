import fbase from '@/api/firebaseConfig.js'
import objetoFB from '@/api/firebaseConfig'
import firebaseconfigobject from '@/api/firebaseConfig'
import * as firebase from 'firebase'

export default {
    state: {
        listaDenuncias: [],
        filtroDenuncias: '',
        //lista: []
    },
    actions: {
      CargarDenuncias({commit}){
        /*return new Promise((resolve, reject) => {
            let self = this
            let lista = []
            fbase.db.ref('/denuncias').on("value", function(snapshot) {
              snapshot.forEach(function(childSnapshot){
                let dato = childSnapshot.val();
                lista.push(dato)
              }); 
              commit('setListaDenuncias', lista)
              resolve('ok')
            })
          })*/
          return new Promise((resolve, reject) => {
            let self = this
            let lista = []
            firebaseconfigobject.db.ref('/denuncias').get().then(snapshot => {
                snapshot.forEach(doc =>{
                let dato = doc.data();
                lista.push(dato)
              }); 
              commit('setListaDenuncias', lista)
              resolve('ok')
            })
          })
        /*firebase.database().ref('/denuncias').get().then(snapchot => {
            snapchot.forEach(doc =>{
                let dato = doc.val()
                console.log("chequeando esto",dato)
                //console.log(doc.id_cliente)
                //console.log(doc.id_trabajador_denunciado)
                listaDenuncias.push(dato)
                commits('setListaDenuncias', listaDenuncias)
            })
        })*/
      },

      cargarDenunciasFiltro ({commit}, payload) {
        commit('cargarDenunciasFiltro', payload)
      },
      generandolistadenuncias({commit}){
        let self = this
        let lista = []
        var ref = firebaseconfigobject.db.ref('/denuncias');
        ref.orderByChild('id_cliente').on("child_added", function(snapshot){
          //console.log(snapshot.key + " WAS " + snapshot.val().apellido_trabajador_denunciado);
          let dato = snapshot.val();//nuevo
          lista.push(dato)//nuevo
        });
        console.log('probando lista', lista);
         commit('resultadoLista',lista); //nuevo
      },
    },
    mutations: { 
        setListaDenuncias(state, dato){
            state.listaDenuncias = dato
        },
        cargarDenunciasFiltro(state, payload) {
          
            state.filtroDenuncias = state.listaDenuncias.filter(item =>{
              return (item.id_cliente.includes(payload) 
              || item.id_trabajador_denunciado.includes(payload)
              )
            })
            
          },
        resultadoLista(state, dato){
            state.listaDenuncias = dato
        }
    },
    getters: {
        getListaDenuncias(state){
            return state.listaDenuncias
        },
        cargarDenunciasFiltro(state){
            return state.filtroDenuncias
          },
    }
}