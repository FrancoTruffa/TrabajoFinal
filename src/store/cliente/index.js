import fbase from '@/api/firebaseConfig.js'
import * as firebase from 'firebase'

export default {
    state: {
        listaCliente: [],
        listaNotificacionesClientes: [],
        pasosPago: 1,
        notificacionesSolicitadas: [],
        notificacionesCambioHs: [],
        notificacionesRechazadas: [],
        notificacionesAceptadas: [],
        notificacionesFinalizadas: [],
        listaDisponibilidad:[],
    },
    actions: {
      aceptarTrabajoCliente ({commit},payload) {
        let hoy = new Date()
        firebase.database().ref('notificaciones').child(payload.id).update({
            confirmado: payload.fecha,
            hora:payload.cambioHsporTrabajador
        })
       },
       rechazarTrabajoCliente ({commit}, payload) {
        let hoy = new Date()
        firebase.database().ref('notificaciones').child(payload.id).update({
            rechazado: payload.fecha,

        })
      },
      eliminarTrabajo ({commit},payload) {
        firebase.database().ref('notificaciones').child(payload.id).update({
          borrarvistaCliente: "si",
      })
      },
      cancelarTrabajo ({commit},payload) {
        firebase.database().ref('notificaciones').child(payload.id).update({
          cancelar: "si",
      })
      },
      resetearPasos ({commit}) {
        commit('resetearPasos')
      },
      siguientePaso ({commit}) {
        commit('siguientePaso')
      },
       guardarSolicitud({commit}, solicitud) { 
        return new Promise ((resolve,reject)=> {
            fbase.db.ref('/notificaciones').push({
            id_trabajador: solicitud.id_trabajador,
            id_cliente: solicitud.id_cliente,
            fecha: solicitud.fecha,
            hora: solicitud.hora,
            titulo: solicitud.titulo,
            comentarios: solicitud.comentario,
            confirmado: "",
            rechazado: "",     
            finalizado: "",
            observacion: "", 
            calificacion: "" ,
            puntualidad: "",
            limpieza: "",
            calidadTrabajo: "",
            calidadPrecio: "",
            recomendacion: "",
            creacion: solicitud.creacion,
            cancelar:"no",
            borrarvistaCliente:"no",
            borrarvistaTrabajador:"no"
        });
        resolve('ok')
        })    
       },
       mostrarCliente({commit}){
        return new Promise((resolve, reject) => {
            let self = this
            let lista = []
            fbase.db.ref('/usuarios').orderByChild("rol").equalTo("Cliente").on("value", function(snapshot) {
              snapshot.forEach(function(childSnapshot){
                lista.push(childSnapshot.val())
              }); 
              commit('setListaCliente', lista)
              resolve('ok')
            })
          })    
       },
        mostrarNotificacionesClientes({commit}, uid){
            return new Promise ((resolve, reject)=> {
                let self = this 
                let lista = []
                let solicitados = []
                let cambioHs = []
                let rechazados = []
                let aceptados = []
                let finalizados = []
                let hoy = new Date()
                fbase.db.ref('/notificaciones').orderByChild('id_cliente').equalTo(uid).once("value", function(snapshot){
                    snapshot.forEach(function(childSnapshot){
                        let dato = childSnapshot.val()
                        dato.id = childSnapshot.key
                        fbase.db.ref('/usuarios').orderByChild("id_autentificacion").equalTo(dato.id_trabajador).once("value", function(snapshot) {                            
                            snapshot.forEach(function(childSnapshot){
                              dato.trabajador = childSnapshot.val()
                              lista.push(dato)
                            }); 
                            lista = lista.filter(function (el) {
                              let fecha = new Date (el.creacion)
                              return (hoy.getTime()-fecha.getTime() < 86400000 && !(el.confirmado.length > 0 && el.rechazado.length > 0)) || 
                              el.confirmado.length > 0 || el.rechazado.length > 0
                            })

                            solicitados = lista.filter(function (el) {
                              return !(el.cambioComentarioporTrabajador != null && el.cambioHsporTrabajador != null) && !(el.cancelar == 'si') && !(el.confirmado.length > 0 || el.rechazado.length > 0) 
                            })
                            
                            cambioHs = lista.filter(function (el) {
                              return (el.cambioComentarioporTrabajador != null && el.cambioHsporTrabajador != null) && !(el.confirmado.length > 0 || el.rechazado.length > 0)
                            })
                            
                            rechazados = lista.filter(function (el) {
                              return !(el.borrarvistaCliente == 'si') && (el.rechazado.length > 0)
                            }) 
                            
                            aceptados = lista.filter(function (el) {
                              return (el.confirmado.length > 0 && el.finalizado.length == 0)
                            })    
        
                            finalizados = lista.filter(function (el) {
                              return (el.confirmado.length > 0 && el.finalizado.length > 0)
                            })          
                            commit('setNotificacionesSolicitadas', solicitados)
                            commit('setNotificacionesCambioHs', cambioHs)
                            commit('setNotificacionesRechazadas', rechazados)
                            commit('setNotificacionesAceptadas', aceptados)
                            commit('setNotificacionesFinalizadas', finalizados)
                            resolve('ok')    
                        })
                    });

                })
            }
            )
        },
    },
    mutations: {
        setListaCliente (state, dato) {
            state.listaCliente = dato
        },
        setListaNotificacionesClientes (state, dato) {
            state.listaNotificacionesClientes = dato
        },
        siguientePaso (state) {
          state.pasosPago++
        },
        resetearPasos (state) {
          state.pasosPago = 1
        },
        setNotificacionesSolicitadas (state, dato) {
          state.notificacionesSolicitadas = dato
        },
        setNotificacionesCambioHs (state, dato) {
          state.notificacionesCambioHs = dato
        },
        setNotificacionesRechazadas (state, dato) {
          state.notificacionesRechazadas = dato
        },
        setNotificacionesAceptadas (state, dato) {
          state.notificacionesAceptadas = dato
        },
        setNotificacionesFinalizadas (state, dato) {
          state.notificacionesFinalizadas = dato
        },
    },
    getters: {
        getNotificacionesSolicitadasClientes (state) {
          return state.notificacionesSolicitadas.sort((a, b) => {
            let fechaA = new Date(a.fecha);
            let fechaB = new Date(b.fecha);
            return fechaA.getTime() > fechaB.getTime();
          });
        },
        getNotificacionesCambioHs (state) {
          return state.notificacionesCambioHs.sort((a, b) => {
            let fechaA = new Date(a.fecha);
            let fechaB = new Date(b.fecha);
            return fechaA.getTime() > fechaB.getTime();
          });
        },
        getNotificacionesRechazadasClientes (state) {
          return state.notificacionesRechazadas.sort((a, b) => {
            let fechaA = new Date(a.fecha);
            let fechaB = new Date(b.fecha);
            return fechaA.getTime() > fechaB.getTime();
          });
        },
        getNotificacionesAceptadasClientes (state) {
          return state.notificacionesAceptadas.sort((a, b) => {
            let fechaA = new Date(a.fecha);
            let fechaB = new Date(b.fecha);
            return fechaA.getTime() > fechaB.getTime();
          });
        },
        getNotificacionesFinalizadasClientes (state) {
          return state.notificacionesFinalizadas
        },
        cargarCliente(state, getters){
            return state.listaCliente
        },
        pasosPago (state) {
          return state.pasosPago
        },
        cargarNotificacionesClientes(state, getters){
            return state.listaNotificacionesClientes
        },
          cargarNotificacionSeleccionCliente(state){
            return keyword => state.listaCliente.filter(item =>{
              return item.uid === keyword 
            });
          },
        cargarClienteFiltro(state){
            return keyword => state.listaCliente.filter(item =>{
              return (item.id_autentificacion.includes(keyword))
            });
          },
        
    }
}