<template>
  <v-app>

    <nav-bar 
    :user="user"
    />
        <main>
        <br/>
        <br/>
      <v-container fluid>

        <router-view></router-view>

        <!--v-router-->
      </v-container>
    </main>


  </v-app>
</template>

<script>
import Nav from './components/Nav'
import {currentUser} from './api'

export default {
  name: 'app',
  data(){
    return{
      user: null
    }
  },
  components: {
    "nav-bar": Nav
  },
  created(){
    currentUser(user =>{
      if(user){
        console.log(user)
        this.user = user
      }else{
        console.log("no user")
      }

    })
  }
}
</script>

<style>
</style>
