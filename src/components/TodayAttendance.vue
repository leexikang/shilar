<template>
  <div>
      <br/>
      <h5 class="grey--text gray darken-4"> {{  training }} </h5>
      <v-card>
      <v-card-row class="cyan accent-4">
      <v-card-title>
        <span class="white--text"> {{  this.$route.params.date }} </span>
      </v-card-title>
      </v-card-row>
      <v-card-text> 
        <v-card-row>
        <v-spacer></v-spacer>
          <div>
          Total: {{  attendees.length + 1 }}
          </div>
        </v-card-row>
      </v-card-text>

        <v-card-text v-for="(attendee, index) in attendees" v-bind:key="attendee.name">
        <v-card-row>
          <div>
          {{ index + 1 }}. {{ attendee.name }} 
          </div>
        </v-card-row>
      </v-card-text>
      </v-card>
    <p class="text-xs-center">...</p>
    </div>
</template>
<script>
import * as api from "../api"
  export default {
    data () {
      return {
        attendees: [],
        training: "",
      }
    },
    created(){
      const vm = this
      const training = this.$route.params.training 
      const date = this.$route.params.date
      // let base_url =  'attendances/' +this.$route.params.name +  '/' + this.$route.params.date 
      const path = "attendances/" + training + "/" + date
      api.fetchAndListen(path, "members", (member) =>{
        vm.attendees.push(member)
        console.log(member)
      })

      api.fetch("trainings/" + training)
      .then((val) =>{
          vm.training = val.name
      })
    }
  
  }
</script>
