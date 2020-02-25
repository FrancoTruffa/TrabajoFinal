<template>
    
</template>

<script>
export default {
    mounted(){
      this.$store.dispatch('logout').then(result => {
        console.log('logout')
        this.$router.replace('/login')
      })
    }
}
</script>
