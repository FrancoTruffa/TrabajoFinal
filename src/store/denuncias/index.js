import fbase from '@/api/firebaseConfig.js'
import objetoFB from '@/api/firebaseConfig'
import firebaseconfigobject from '@/api/firebaseConfig'
import * as firebase from 'firebase'

export default {
    state: {
        listaDenuncias: [],
        listaDenunciasTrabajadores: [],
        filtroDenuncias: '',
        listaPagos: [],
        contadorcito: 0
        //lista: []
    },
    actions: {
      CargarDenuncias({commit}){
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
      },

      CargarDenunciasTrabajadores({commit}){
        return new Promise((resolve, reject) => {
          let self = this
          let lista = []
          firebaseconfigobject.db.ref('/denunciasTrabajador').get().then(snapshot => {
              snapshot.forEach(doc =>{
              let dato = doc.data();
              lista.push(dato)
            }); 
            commit('setListaDenunciasTrabajadores', lista)
            resolve('ok')
          })
        })
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
      generandolistadenunciasTrabajadores({commit}){
        let self = this
        let lista = []
        var ref = firebaseconfigobject.db.ref('/denunciasTrabajador');
        ref.orderByChild('id_trabajador').on("child_added", function(snapshot){
          //console.log(snapshot.key + " WAS " + snapshot.val().apellido_trabajador_denunciado);
          let dato = snapshot.val();//nuevo
          lista.push(dato)//nuevo
        });
        console.log('MOSTRAME ESTO: ', lista);
         commit('resultadoListaTrabajadores',lista); //nuevo
      },
      obteniendoPagos({commit}){
        let self = this
        let listaPagos = []
        let objDic = []
        let objOct = []
        let objMar = []
        var ref = fbase.db.ref('/pagos_trabajadores');
        ref.orderByChild('id_trabajadores').on("child_added", function(snapshot){
          //console.log(snapshot.key + " WAS " + snapshot.val().apellido_trabajador_denunciado);
          let dato = snapshot.val();//nuevo
          listaPagos.push(dato)//nuevo
        });
        //return listaPagos;
        //objContar.push(objContar2)
        console.log("a ver los pagos: ", listaPagos);
        console.log("A VER EL CONTADOR: ", objDic);
        commit('resultadoListaPagos', listaPagos);
        commit('contadorMesDic', objDic)
      }
    },
    mutations: { 
        setListaDenuncias(state, dato){
            state.listaDenuncias = dato
        },
        setListaDenunciasTrabajadores(state, dato){ 
          state.listaDenunciasTrabajadores = dato 
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
        },
        resultadoListaTrabajadores(state, dato){
          state.listaDenunciasTrabajadores = dato
      },
        resultadoListaPagos(state, dato){
          state.listaPagos = dato
        },
        contadorMesDic(state, dato){
          state.contadorcito = dato
        }

    },
    getters: {
        getListaDenuncias(state){
            return state.listaDenuncias
        },
        getListaDenunciasTrabajadores(state){
          return state.listaDenunciasTrabajadores
        },
        getListaPagos(state){
          return state.listaPagos
        },
        getContadorMesDic(state){ 
          return state.contadorcito 
        },
        cargarDenunciasFiltro(state){
            return state.filtroDenuncias
          },
    }
}