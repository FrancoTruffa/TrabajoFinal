import Vue from 'vue'
import Router from 'vue-router'

// Layouts
import DefaultLayout from '@/layouts/DefaultLayout'

import Registrar from '@/views/Registrar'
import Splash from '@/views/Splash'
import Main from '@/views/Main'
import MainTrabajador from '@/views/MainTrabajador'
import PerfilTrabajador from '@/views/PerfilTrabajador'
import PerfilCliente from '@/views/PerfilCliente'
import VerTrabajador from '@/views/VerTrabajador'
import Login from '@/views/Login'
import RegistroCliente from '@/views/RegistroCliente'
import RegistroTrabajador from '@/views/RegistroTrabajador'
import EleccionPagosyhs from '@/views/EleccionPagosyhs'
import fbase from '../api/firebaseConfig.js'
import Logout from '@/views/Logout'
import Notificaciones from '@/views/Notificaciones'
import Verificar from '@/views/Verificar'
import RealizarPagyCom from '@/views/RealizarPagyCom'
import Escaneo from '@/views/Escaneo'
import NotificacionesClientes from '@/views/NotificacionesClientes'
import FormasPago from '@/views/FormasPago'
import Disponibilidad from '@/views/Disponibilidad'
import MercadoPago from '@/views/MercadoPago'
import Transaccion from '@/views/Transaccion'
import Administrador from '@/views/Administrador'


Vue.use(Router)

const router  = new Router({
  routes: [
    {
      path:'/',
      redirect: 'login'
    },
    {
      path: '/',
      redirect: '/splash'
    },
    {
      path: '/',
      redirect: '/Main',
      name: 'Main',
      component: DefaultLayout,
      children: [
        {
          path: 'main',
          name: 'Main',
          component: Main  
        }
      ]
    },
    {
      path: '/',
      redirect: '/MainTrabajador',
      name: 'MainTrabajador',
      component: DefaultLayout,
      children: [
        {
          path: 'mainTrabajador',
          name: 'MainTrabajador',
          component: MainTrabajador  
        }
      ]
    },
    {
      path: '/',
      redirect: '/realizarpagycom',
      name: 'RealizarPagyCom',
      component: DefaultLayout,
      children: [
        {
          path: 'realizarpagycom/:id',
          name: 'RealizarPagyCom',
          component: RealizarPagyCom   
        }
      ]
    },
    {
      path: '/',
      redirect: '/formaspago',
      name: 'FormasPago',
      component: DefaultLayout,
      children: [
        {
          path: 'formaspago/:id',
          name: 'FormasPago',
          component: FormasPago   
        }
      ]
    },
    {
      path: '/',
      redirect: '/mercadopago',
      name: 'MercadoPago',
      component: DefaultLayout,
      children: [
        {
          path: 'mercadopago',
          name: 'MercadoPago',
          component: MercadoPago   
        }
      ]
    },
    {
      path: '/',
      redirect: '/transaccion',
      name: 'Transaccion',
      component: DefaultLayout,
      children: [
        {
          path: 'transaccion',
          name: 'Transaccion',
          component: Transaccion   
        }
      ]
    },
    {
      path: '/',
      redirect: '/escaneo',
      name: 'Escaneo',
      component: DefaultLayout,
      children: [
        {
          path: 'escaneo/:id',
          name: 'Escaneo',
          component: Escaneo   
        }
      ]
    },
    
    {
      path: '/',
      redirect: '/PerfilTrabajador',
      name: 'PerfilTrabajador',
      component: DefaultLayout,
      children: [
        {
          path: 'perfilTrabajador',
          name: 'PerfilTrabajador',
          component: PerfilTrabajador
        }
      ]
    },
    {
    path: '/',
    redirect: '/PerfilCliente',
    name: 'PerfilCliente',
    component: DefaultLayout,
    children: [
      {
        path: 'perfilCliente',
        name: 'PerfilCliente',
        component: PerfilCliente
      }
    ]
  },
    {
      path: '/',
      redirect: '/VerTrabajador',
      name: 'VerTrabajador',
      component: DefaultLayout,
      children: [
        {
          path: 'verTrabajador/:id',
          name: 'VerTrabajador',
          component: VerTrabajador
        }
      ]
    },
    {
      path: '/',
      redirect: '/login',
      name: 'Login',
      component: {
        render (c) {
          return c('router-view')
        }
      },
      children: [
        {
          path: 'login',
          name: 'Login',
          component: Login
        }
      ]
    },
    {
      path: '/',
      redirect: '/notificaciones',
      name: 'Notificaciones',
      component: DefaultLayout,
      children: [
        {
          path: 'notificaciones',
          name: 'Notificaciones',
          component: Notificaciones
        }
      ]
    },
    {
      path: '/',
      redirect: '/notificacionesclientes',
      name: 'NotificacionesClientes',
      component: DefaultLayout,
      children: [
        {
          path: 'notificacionesclientes',
          name: 'NotificacionesClientes',
          component: NotificacionesClientes
        }
      ]
    },
    {
      path: '/',
      redirect: '/logout',
      name: 'Logout',
      component: {
        render (c) {
          return c('router-view')
        }
      },
      children: [
        {
          path: 'logout',
          name: 'Logout',
          component: Logout
        }
      ]
    },
    {
      path: '/',
      redirect: '/verificar',
      name: 'Verificar',
      component: {
        render (c) {
          return c('router-view')
        }
      },
      children: [
        {
          path: 'verificar',
          name: 'Verificar',
          component: Verificar
        }
      ]
    },
    {
      path: '/',
      redirect: '/splash',
      name: 'Splash',
      component: {
        render (c) {
          return c('router-view')
        }
      },
      children: [
        {
          path: 'splash',
          name: 'Splash',
          component: Splash
        }
      ]
    },
    {
      path: '/',
      redirect: '/Disponibilidad',
      name: 'Disponibilidad',
      component: DefaultLayout,
      children: [
        {
          path: 'disponibilidad',
          name: 'Disponibilidad',
          component: Disponibilidad
        }
      ]
    },
    {
      path: '/',
      redirect: '/Administrador',
      name: 'Administrador',
      component: DefaultLayout,
      children: [
        {
          path: 'administrador',
          name: 'Administrador',
          component: Administrador
        }
      ]
    },
    {
      path: '/',
      redirect: '/registrar',
      name: 'Registrar',
      component: {
        render (c) {
          return c('router-view')
        }
      },
      children: [
        {
          path: 'registrar',
          name: 'Registrar',
          component: Registrar
        }
      ]
    },
    {
      path: '/',
      redirect: '/registroCliente',
      name: 'RegistroCliente',
      component: {
        render (c) {
          return c('router-view')
        }
      },
      children: [
        {
          path: 'registroCliente',
          name: 'RegistroCliente',
          component: RegistroCliente
        }
      ]
    },    
    {
      path: '/',
      redirect: '/eleccionPagosyhs',
      name: 'EleccionPagosyhs',
      component: {
        render (c) {
          return c('router-view')
        }
      },
      children: [
        {
          path: 'eleccionPagosyhs',
          name: 'EleccionPagosyhs',
          component: EleccionPagosyhs
        }
      ]
    },
    {
      path: '/',
      redirect: '/registroTrabajador',
      name: 'RegistroTrabajador',
      component: {
        render (c) {
          return c('router-view')
        }
      },
      children: [
        {
          path: 'registroTrabajador',
          name: 'RegistroTrabajador',
          component: RegistroTrabajador
        }
      ]
    },
    
  ]
})


export default router