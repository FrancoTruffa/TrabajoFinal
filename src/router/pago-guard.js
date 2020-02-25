import {store} from '../store'

export default (to, from, next) => {
  if (!store.getters.getPago) {
    next()
  } else {
    next('/MercadoPago')
  }
}
