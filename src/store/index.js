import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import cliente from './cliente'
import user from './user'
import trabajador from './trabajador'
import denuncias from './denuncias'

Vue.use(Vuex)

const vuexLocal = new VuexPersist({
    key: 'tesisApp',
    storage: window.localStorage
})

export default new Vuex.Store({
    plugins: [vuexLocal.plugin],
    modules:{
        user,
        trabajador,
        cliente,
        denuncias
    }
})