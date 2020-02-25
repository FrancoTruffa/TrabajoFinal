import fbase from '@/api/firebaseConfig.js'
import * as firebase from 'firebase'

export default {
    state: {
        listaTrabajador: [], 
        notificacionesSolicitadas: [],
        notificacionesRechazadas: [],
        notificacionesAceptadas: [],
        notificacionesFinalizadas: [],
        notificacionesMostrarFinalizadas: [],
        listaDisponibilidad:[],
        calidadPrecioBase:[],
        calidadTrabajoBase:[],
        limpiezaBase:[],
        puntualidadBase:[],
        recomendacionBase:[],
        pago: false,
        numTareas: 0,
        filtroTrabajador: null

    },
    actions: {
      verificarPago({commit},payload){
        return new Promise((resolve, reject)=>{
          fbase.db.ref('/pagos_trabajadores').orderByChild("id_trabajador").equalTo(payload).limitToLast(1).on("value", function(snapshot) {
            let obj = snapshot.val()
            let keys = Object.keys(obj || {})
            let fecha_pago = new Date(obj[keys[0]].fecha)
            let fecha_hoy = new Date()
            let pago = (fecha_hoy.getMonth() === fecha_pago.getMonth()) && (fecha_hoy.getFullYear() === fecha_pago.getFullYear())
            console.log(pago)
            commit('setPago', pago)
            resolve(pago)
          })
        })        
      },

      guardarPagoMensualTrabajador({commit},payload){
        firebase.database().ref('pagos_trabajadores').push({
          id_trabajador: payload.id,
          comprobante: payload.comprobante,
          fecha: payload.fecha
        })
      },
      cambiarTrabajoHs ({commit},payload) {
        firebase.database().ref('notificaciones').child(payload.id).update({
            cambioHsporTrabajador: payload.hs,
            cambioComentarioporTrabajador: payload.comentario,
        }) 
      },
      borrarTrabajo ({commit},payload) {
        firebase.database().ref('notificaciones').child(payload.id).update({
            borrarvistaTrabajador:"si"
        }) 
    },
      aceptarTrabajo ({commit},payload) {
            let hoy = new Date()
            firebase.database().ref('notificaciones').child(payload.id).update({
                confirmado: payload.fecha,//new Date().toISOString().substr(0, 10),//hoy.getFullYear() + '-' + ("0"+(hoy.getMonth()+1)).slice(-2) + '-' + hoy.getDate(),
                rechazado:"" ,
            })
        },
        rechazarTrabajo ({commit}, payload) {
            let hoy = new Date()
            firebase.database().ref('notificaciones').child(payload.id).update({
                confirmado:"",
                rechazado: payload.fecha,

                 //new Date().toISOString().substr(0, 10),//hoy.getFullYear() + '-' + ("0"+(hoy.getMonth()+1)).slice(-2) + '-' + hoy.getDate(),
            })
        },
       mostrarTrabajador({commit}){
            return new Promise((resolve, reject) => {
              let self = this
              let lista = []
              let hoy = new Date()
              fbase.db.ref('/usuarios').orderByChild("rol").equalTo("Trabajador").on("value", function(snapshot) {
                snapshot.forEach(function(childSnapshot){
                  let dato = childSnapshot.val()
                  dato.noDisponible = []
                  fbase.db.ref('/disponibilidad').orderByChild("id_trabajador").equalTo(dato.id_autentificacion).on("value", function(snapshot) {                            
                    snapshot.forEach(function(childSnapshot){
                      let noDisponible = childSnapshot.val()
                      let fecha = new Date(noDisponible.fecha_fin + ' ' + noDisponible.hora_fin)
                      if (hoy.getTime() <= fecha.getTime()) {
                        dato.noDisponible.push(noDisponible)
                      }
                    })
                    lista.push(dato)
                  })
                });
                commit('setListaTrabajadores', lista)
                resolve('ok')
              })
            })   
        },
        mostrarDisponibilidad({commit},){
          return new Promise((resolve, reject) => {
            let self = this
            let lista = []
            fbase.db.ref('/disponibilidad').on("value", function(snapshot) {
              snapshot.forEach(function(childSnapshot){
                lista.push(childSnapshot.val())
              }); 
              commit('setListaDisponibilidad', lista)
              resolve('ok')
            })
          })   
      },
        mostrarNotificaciones({commit}, uid){
            return new Promise ((resolve, reject)=> {
                let self = this 
                let lista = []
                let solicitados = []
                let rechazados = []
                let aceptados = []
                let finalizados = []
                let mostrarFinalizados = []
                let hoy = new Date()
                fbase.db.ref('/notificaciones').orderByChild('id_trabajador').equalTo(uid).once("value", function(snapshot){

                  if(snapshot.numChildren() === 0){
                    commit('setNumTareas', [])
                    commit('setNotificacionesSolicitadas', [])
                    commit('setNotificacionesRechazadas', [])
                    commit('setNotificacionesAceptadas', [])
                    commit('setNotificacionesFinalizadas', [])
                    commit('setNotificacionesMostrarFinalizadas', [])
                    resolve('ok')
                  }else{
                    //console.log(snapshot.numChildren())
                    snapshot.forEach(function(childSnapshot){
                        let dato = childSnapshot.val()
                        dato.id = childSnapshot.key
                        //console.log(dato)
                        fbase.db.ref('/usuarios').orderByChild("id_autentificacion").equalTo(dato.id_cliente).once("value", function(snapshot) {                            
                            snapshot.forEach(function(childSnapshot){
                              dato.cliente = childSnapshot.val()
                              //if(dato.borrado.length == 0) {
                                lista.push(dato)
                              //}
                            });

                            lista = lista.filter(function (el) {
                              let fecha = new Date (el.creacion)
                              return (hoy.getTime()-fecha.getTime() < 86400000 && !(el.confirmado.length > 0 && el.rechazado.length > 0)) || 
                              el.confirmado.length > 0 || el.rechazado.length > 0
                            })
        
                            solicitados = lista.filter(function (el) {
                              return !(el.cambioComentarioporTrabajador != null && el.cambioHsporTrabajador != null) && !(el.cancelar == 'si') && !(el.confirmado.length > 0 || el.rechazado.length > 0) 
                            })  
                            
                            rechazados = lista.filter(function (el) {
                              return !(el.borrarvistaTrabajador == 'si') && (el.rechazado.length > 0)
                            }) 
                            
                            aceptados = lista.filter(function (el) {
                              return (el.confirmado.length > 0 && el.finalizado.length == 0)
                            })    
        
                            finalizados = lista.filter(function (el) {
                              return !(el.borrarvistaTrabajador == 'si') && (el.confirmado.length > 0 && el.finalizado.length > 0)
                            })          

                            mostrarFinalizados = lista.filter(function (el) {
                              return (el.confirmado.length > 0 && el.finalizado.length > 0)
                            })    
        
                            commit('setNumTareas', solicitados.length)
                            commit('setNotificacionesSolicitadas', solicitados)
                            commit('setNotificacionesRechazadas', rechazados)
                            commit('setNotificacionesAceptadas', aceptados)
                            commit('setNotificacionesFinalizadas', finalizados)
                            commit('setNotificacionesMostrarFinalizadas', mostrarFinalizados)
                            resolve('ok')
                        })
                    });
                  }
                })
            }
            )
        },
        calificaciones({commit}, uid){

          return new Promise ((resolve, reject)=> {
              let self = this 
              let lista = []
              let calidadPrecio = []
              let calidadTrabajo = []
              let limpieza = []
              let puntualidad = []
              let recomendacion = []
              

              let hoy = new Date()
              fbase.db.ref('/notificaciones').orderByChild('id_trabajador').equalTo(uid).once("value", function(snapshot){
                  if (snapshot.numChildren() === 0) {
                    commit('setCalidadPrecio', [])
                    commit('setCalidadTrabajo', [])
                    commit('setCalidadlimpieza', [])
                    commit('setPuntualidad', [])
                    commit('setRecomendacion', [])
                    resolve('ok')
                  } else { 
                  snapshot.forEach(function(childSnapshot){
                      let dato = childSnapshot.val()
                      dato.id = childSnapshot.key
                      fbase.db.ref('/usuarios').orderByChild("id_autentificacion").equalTo(dato.id_cliente).once("value", function(snapshot) {                            
                          snapshot.forEach(function(childSnapshot){
                            dato.cliente = childSnapshot.val()
                              lista.push(dato)
                          });

                          lista = lista.filter(function (el) {
                            let fecha = new Date (el.creacion)
                            return (hoy.getTime()-fecha.getTime() < 86400000 && !(el.confirmado.length > 0 && el.rechazado.length > 0)) || 
                            el.confirmado.length > 0 || el.rechazado.length > 0
                          })
      
                          calidadPrecio = lista.filter(function (el) {
                            return el.calidadPrecio  != null && el.finalizado.length > 0
                          })  

                          calidadTrabajo = lista.filter(function (el) {
                            return el.calidadTrabajo  != null && el.finalizado.length > 0
                          })  
                          limpieza = lista.filter(function (el) {
                            return el.limpieza  != null && el.finalizado.length > 0
                          })  
                          puntualidad = lista.filter(function (el) {
                            return el.puntualidad  != null && el.finalizado.length > 0
                          })  
                          calidadPrecio = lista.filter(function (el) {
                            return el.calidadPrecio  != null && el.finalizado.length > 0
                          })
                          recomendacion = lista.filter(function (el) {
                            return el.recomendacion  != null && el.finalizado.length > 0
                          })
                          
                          commit('setCalidadPrecio', calidadPrecio)
                          commit('setCalidadTrabajo', calidadTrabajo)
                          commit('setCalidadlimpieza', limpieza)
                          commit('setPuntualidad', puntualidad)
                          commit('setRecomendacion', recomendacion)
                          resolve('ok')

                      })
                  });
                }
              })
            }
          )
      },
      cargarTrabajadorFiltro ({commit}, payload) {
        commit('cargarTrabajadorFiltro', payload)
      }
    },
    mutations: {
      
        setNumTareas(state, num) {
            state.numTareas = num
        },
        setPago(state,payload){
          state.pago=payload
        },
        setListaTrabajadores (state, dato) {
            state.listaTrabajador = dato
        },
        setNotificacionesSolicitadas (state, dato) {
            state.notificacionesSolicitadas = dato
        },
        
        setNotificacionesMostrarFinalizadas (state, dato) {
          state.notificacionesMostrarFinalizadas = dato
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
        setListaDisponibilidad (state, dato) {
          state.listaDisponibilidad = dato
        },
        setCalidadPrecio(state, dato) {
          state.calidadPrecioBase = dato
        },
        setCalidadTrabajo(state, dato) {
          state.calidadTrabajoBase = dato
        },
        setCalidadlimpieza(state, dato) {
          state.limpiezaBase = dato
        },
        setPuntualidad(state, dato) {
          state.puntualidadBase = dato
        },
        setRecomendacion(state, dato) {
          state.recomendacionBase = dato
        },
        cargarTrabajadorFiltro(state, payload) {
          
          state.filtroTrabajador = state.listaTrabajador.filter(item =>{
            return (item.nombre.toLowerCase().includes(payload.toLowerCase()) 
            || item.apellido.toLowerCase().includes(payload.toLowerCase())
            || item.especialidad.toLowerCase().includes(payload.toLowerCase())
            || item.serviciosEsp.toLowerCase().includes(payload.toLowerCase())
            || item.id_autentificacion.includes(payload))
          })
          state.filtroTrabajador = state.filtroTrabajador[0]
        }

    },

    getters: {
        getPago(state){
          return state.pago
        },
        getCalidadPrecio (state) {
          return state.calidadPrecioBase
        },
        getCalidadTrabajo (state) {
          return state.calidadTrabajoBase
        },
        getLimpieza (state) {
          return state.limpiezaBase
        },
        getPuntualidad (state) {
          return state.puntualidadBase
        },
        getRecomendacion (state) {
          return state.recomendacionBase
        },
        cargarTrabajador(state, getters){
            return state.listaTrabajador
        },
        cargarDisponibilidad(state, getters){
          return state.listaDisponibilidad
        },
        getNotificacionesSolicitadas (state) {
          return state.notificacionesSolicitadas.sort((a, b) => {
            let fechaA = new Date(a.fecha);
            let fechaB = new Date(b.fecha);
            return fechaA.getTime() > fechaB.getTime();
          });
        },
        getNotificacionesMostrarFinalizadas (state) {
          return state.notificacionesMostrarFinalizadas.sort((a, b) => {
            let fechaA = new Date(a.fecha);
            let fechaB = new Date(b.fecha);
            return fechaA.getTime() > fechaB.getTime();
          });
        },
        getNotificacionesRechazadas (state) {
          return state.notificacionesRechazadas.sort((a, b) => {
            let fechaA = new Date(a.fecha);
            let fechaB = new Date(b.fecha);
            return fechaA.getTime() > fechaB.getTime();
          });
        },
        getNotificacionesAceptadas (state) {
          return state.notificacionesAceptadas.sort((a, b) => {
            let fechaA = new Date(a.fecha);
            let fechaB = new Date(b.fecha);
            return fechaA.getTime() > fechaB.getTime();
          });
        },
        getNotificacionesFinalizadas (state) {
          return state.notificacionesFinalizadas.sort((a, b) => {
            let fechaA = new Date(a.fecha);
            let fechaB = new Date(b.fecha);
            return fechaA.getTime() > fechaB.getTime();
          });
        },
        cargarTrabajadorSeleccion(state){
          return keyword => state.listaTrabajador.filter(item =>{
            return item.especialidad === keyword 
          });
        },
        cargarFecha(state,fechaBusqueda){
          return fechaBusqueda => state.listaDisponibilidad.filter(item =>{
            return ((fechaBusqueda.fecha > item.fecha_fin) && (fechaBusqueda.hs > item.hora_fin)  ) ||
                    ((fechaBusqueda.fecha < item.fecha_inicio) && (fechaBusqueda.hs < item.hora_inicio))
                                    
          });
        },
        cargarNotificacionesFiltro(state){
            return keyword => state.listaNotificaciones.filter(item =>{
                return item.uid.includes(keyword)
            })
        },
        cargarTrabajadorFiltro(state){
          return state.filtroTrabajador
        },
          VerElTrabajador (state) { /* Este es el que tengo que usar */
            return (trabajadorId) => {
              console.log("llegue")
              return state.listaTrabajador.find((listaTrabajador) => {
                return listaTrabajador === trabajadorId
              })
            }
          },
          VerNotificacion (state) { /* Este es el que tengo que usar */
            return (NotificacionId) => {
              return state.listaNotificaciones.find((listaNotificaciones) => {
                return listaNotificaciones === NotificacionId
              })
            }
          },
        numTareas (state) {
            return state.numTareas
        }
        
    }
}