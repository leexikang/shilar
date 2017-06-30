<template>
  <div> 

 <v-btn
      light
      class="blue"
      @click.native="handleSignIn"
      v-if="user == null"
    >
    Google Login 
    </v-btn> 
    <h4 v-if="user"> Hello! {{ user.displayName }}</h4>
    </div>
</template>

<script>
import axios from 'axios'
import * as api from '../api'
export default {
  name: 'hello',
  data () {
    return {
      user: null,
      msg: 'Welcome to Your Vue.js PWA'
    }
  },
  methods:{
    handleSignIn(){
      console.log("click")
      let vm = this
      api.signIn()

}
  },
  created(){
    api.currentUser(user =>{
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
