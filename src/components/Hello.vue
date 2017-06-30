<template>
  
</template>

<script>
import axios from 'axios'
import * as api from '../api'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js PWA'
    }
  },
  created(){
    api.fetch("members", {
      orderByChild: "trainings/shanyoma2017",
      equalTo: true
    }).then(val =>{
      console.log(val)
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
