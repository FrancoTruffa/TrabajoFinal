import fbase from '@/api/firebaseConfig.js'
import * as firebase from 'firebase'

export default {
    state: {
        token: null,
        user: null,
        additionalInfoUser: null,
        categoria: null,
        login: false,
    },
    actions: {
        actualizarDatos ({commit},payload) {
            console.log('Actuliza Datos:'+payload)
            const upadateObj = {}
            if (payload.nombre) {
              upadateObj.nombre=payload.nombre
            }
            if(payload.apellido){
              upadateObj.apellido=payload.apellido
            }
            if(payload.email){
              upadateObj.email = payload.email
            }
            if(payload.domicilio){
                upadateObj.domicilio = payload.domicilio
              }
            if(payload.telefono){
                upadateObj.telefono = payload.telefono
              }
              if(payload.foto){
                upadateObj.foto = payload.foto
              }
            firebase.database().ref('usuarios').child(payload.id).update(updateObj)        
        },
       logout ({ commit }){
        return new Promise((resolve, reject) => {
            firebase.auth().signOut().then(function() {
                // Sign-out successful.
                commit('setToken', null)
                commit('setUser', null)
                commit('setLogin', false)
                resolve(true)
              }).catch(function(error) {
                reject(false)
              });
        })
       },
        signUserUp ({commit}, payload) {
            return new Promise((resolve, reject) => {
                firebase.auth().createUserWithEmailAndPassword(payload.email, payload.contrasenia).then(
                    (user) => {
                        const newUser = {
                            id: user.uid //fijate si hay que agregar algo mas culia
                        }
                        resolve(user.user.uid)
                }).catch(
                    error => {
                    reject(error)
                })  
            })
        },
        setUser({commit}, user) {
            commit('setUser', user)
        },
        verifyUser ({commit}) {
            return new Promise((resolve, reject) => {
                firebase.auth().getRedirectResult().then(function(result) {
                    console.log(result)
                    if (result.credential) {
                      var token = result.credential.accessToken;
                      var user = result.user
                      var additionalInfoUser = result.additionalUserInfo.profile

                      fbase.db.ref('/usuarios').orderByChild('id_autentificacion').equalTo(user.uid).on("value", function(snapshot) {

                        commit('setToken', token)
                        commit('setUser', user)
                        commit('setAdditionalInfoUser', additionalInfoUser)

                        if (snapshot.val() === null) {
                            reject('no registrado')
                        }
                        
                        snapshot.forEach(function(data) {
                            user.categoria = data.val().rol.toLowerCase()                            
                            commit('setCategoria', data.val().rol.toLowerCase())
                            commit('setLogin', true)
                            resolve(user.categoria)
                        })
                      })
                    }else {
                        reject('no credencial')
                    }
                }, error => {
                    reject('no login')
                })
            })
        },
    
        signUserIn ({commit}, payload) {
            return new Promise((resolve, reject) => {
                firebase.auth().signInWithEmailAndPassword(payload.usuario, payload.contrasena).then(
                    (user) => {
                        const newUser = {
                            id: user.uid,
                        }
                        var ok = 0
                        
                        fbase.db.ref('/usuarios').orderByValue().on("value", function(snapshot) {
                        snapshot.forEach(function(data) {
                            if (data.val().id_autentificacion === user.user.uid) {
                                console.log("si encontro coincidencia2")
                                if(data.val().rol === 'Trabajador'){
                                    ok = 1
                                }
                                else{ ok = 2 }
                            }
                        })
                        
                        })

                        if (ok === 1) {
                            resolve('trabajador')
                        } else if ( ok === 2) {
                            resolve('cliente')
                        } else {
                            reject('mal')
                        }


                }, error => {
                        reject(error)
                    })
            })
            
        },  
    },
    mutations: {
        setToken (state, payload) {
            state.token = payload
        },
        setUser (state, payload) {
            state.user = payload
        },
        setAdditionalInfoUser (state, payload) {
            state.additionalInfoUser = payload
        },
        setCategoria (state, payload) {
            state.categoria = payload
        },
        setLogin (state, payload) {
            state.login = payload
        },
    },
    getters: {
        token (state) {
            return state.token
        },
        user (state) {
            return state.user
        },
        additionalInfoUser (state) {
            return state.additionalInfoUser
        },
        categoria (state) {
            return state.categoria
        },
        login (state) {
            return state.login
        },
    }
}
