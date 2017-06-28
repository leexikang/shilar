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

      <td class="text-xs-left" v-for="attendanceKey in props.item.date">
      <v-icon large class="teal--text" v-if="props.item[attendanceKey]">done</v-icon>
      <v-icon large class="pink--text accent-4" v-else>remove</v-icon>
      <!-- {{ props.item[attendanceKey] }} -->
      <!-- <span v-if="props.item[attendanceKey]">True</span> -->
      </td>
    </template>

  </v-data-table>

</template>

<script>
import * as api from "../api"
import { forEach, keys, includes, add } from "lodash"
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
    	// console.log(this.$route.params.name)
    	const training = this.$route.params.name
    	let vm = this
    	

    	let attendances = api.fetch("attendances/" + training)
    	let members = api.fetch("members")
    	Promise.all([attendances, members])
    	.then(val =>{
    		let attendances = val[0]
    		let attendees = val[1]
    		forEach(keys(attendances), attendance =>{
    			vm.headers.push({
    				text: attendance,
    				sortable: false,
    				left: true,
    				value: attendance
    			})
    		}) 

    		forEach(attendees, (attendee, key) =>{
	    			let attendeeList = {
    				key: attendee.key,
    				name: attendee.name,
    				total: 0,
    				date: []
    			}	

    			forEach(attendances, (attendance, num) =>{
    				let attendancesKey= keys(attendance)
    				if(includes(attendancesKey, key)){
    					attendeeList.total = add(attendeeList.total, 1)
    					attendeeList[num] = true
    					attendeeList.date.push(num)

    				}else{
    					attendeeList[num] = false
    					attendeeList.date.push(num)
    				}
    			})
    			vm.items.push(attendeeList)
    		})

    	})



    }
  }
</script>


