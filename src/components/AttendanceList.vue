<template>
      <v-card if="attendees.length > 0">
        <v-list subheader>
          <v-subheader> Total: {{  attendees.length   }}</v-subheader>
          <v-list-item class="list-item" v-for="attendee in attendees" v-bind:key="attendee.name">
            <v-list-tile>
              <v-list-tile-content>
              {{ attendee.name }}

                <!-- <v-list-tile-title v-html="attendee.name"></v-list-tile-title> -->
              </v-list-tile-content>

              <v-list-tile-action>
               <v-btn icon slot="activator" class="indigo--text" @click.native.stop="handleEdit(attendee)">
                <v-icon>mode_edit</v-icon>
              </v-btn> 

            </v-list-tile-action>

              <v-list-tile-action>
               <v-btn icon class="pink--text" @click.native="handleDelete(attendee)">
                <v-icon>delete</v-icon>
              </v-btn> 
              <!-- <v-icon pink--text>delete</v-icon> -->
              </v-list-tile-action>
              
            </v-list-tile>


          </v-list-item>
        </v-list>
      </v-card>
</template>

<script>
  export default {
    props: ["attendees"],
    data () {
      return {

      }
    },
    methods:{
     handleEdit(attendee){
      let user = attendee;      
      this.$emit("edit", user)
     },
     handleDelete(attendee){
      this.$emit("delete", attendee)
     } 
    }
  }
</script>
<style>
  .list-item a:hover{
    background: none;
    cursor: default; 
  } 
</style>