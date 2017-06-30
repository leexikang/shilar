<template>

  <v-data-table
      v-bind:headers="headers"
      :items="items"
      hide-actions
      class="elevation-1"
    >
    <template slot="items" scope="props" >
      <td>{{ props.item.name }}</td>
      <td>{{ props.item.total}}</td>

      <td class="text-xs-left" v-for="attendance in props.item.attendances">
      <v-icon large class="teal--text" v-if="attendance">done</v-icon>
      <v-icon large class="pink--text accent-4" v-else>remove</v-icon>
      <!-- {{ props.item[attendanceKey] }} -->
      <!-- <span v-if="props.item[attendanceKey]">True</span> -->
      </td>
    </template>

  </v-data-table>

</template>

<script>
import * as api from "../api"
import axios from "axios"
import { merge, forEach, keys, includes, add } from "lodash"
  export default {
    data () {
      return {
      	headers: [
      	{
      		text: 'name',
      		left: true,
      		sortable: true,
      		value: 'name'
      	},
      	{
      		text: 'Total (days)',
      		left: true,
      		sortable: true,
      		value: 'total'
      	}

      	],
      	items: [],
        attendances: []
      }
    },
    created(){
    	const training = this.$route.params.name
    	let vm = this

    	// get Headers 
    	api.fetch("attendances/" + training)
    	.then(val =>{
    		let headers = []
    		 headers = (keys(val).map(date => {
    		 	let obj = {}
    			obj["text"] = date
    			obj["left"] = true
    			obj["value"] = date 
    			return obj
    		}))
    		 this.headers = this.headers.concat(headers)
    	})
    	//create attendances 
    	const url = "https://us-central1-roll-call-ebc65.cloudfunctions.net/trainingReport"
    	+ "?training=" + training
    	axios.get(url)
    	.then(val => {
    		this.items = val.data
    		console.log(val)
    	}).catch(err =>{
    		console.log(err)	
    	})




    }
  }
</script>


