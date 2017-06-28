<template>
<div>
    </v-navigation-drawer>
    <v-navigation-drawer temporary v-model="drawer" :mini-variant.sync="mini" light>
      <v-list class="pa-0">
        <v-list-item>
          <v-list-tile avatar tag="div">
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg" />
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>John Leider</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>

              <v-btn icon dark @click.native.stop="mini = !mini">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-item>
      </v-list>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-item v-for="item in items" :key="item">

               <router-link :to="item.path" exact>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
              {{ item.name}}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

               </router-link>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar fixed class="indigo darken-2" light>
      <v-toolbar-side-icon light @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
    </v-toolbar>


    </div>

</template>

<script>
  export default {
    data () {
      return {
        drawer: null,
        items: [
          { name : 'Home', icon: 'dashboard', path: "/"},
          { name : 'Attentances', icon: 'assignment', path: "/select"},
          { name : 'Report', icon: 'assessment', path: "/report"},
          { name : 'Users', icon: 'people', path: "/user/attendances"}
        ],
        mini: false,
        right: null
      }
    }
  }
</script>

<style>
a{
  color: black;
  text-decoration: none;

}
</style>