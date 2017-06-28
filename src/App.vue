<template>
  <v-app>

    <nav-bar />
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

export default {
  name: 'app',
  components: {
    "nav-bar": Nav
  },
}
</script>

<style>
</style>
