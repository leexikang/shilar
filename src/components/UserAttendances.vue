<template>
<div>
	<v-select
	v-bind:items="trainings"
	v-model="training"
	item-value="key"
	label="Select"
	dark
	single-line
	auto
	></v-select>
	<br/>
	<auto-complete
		:names="names"
		:fetching="fetching"
		@change="handleChange"
		@choose="handleChoose"
		@enter="handleEnter"
	/>	
	</auto-complete>
	<v-card v-if="selected">
	<v-card-text>
	 <v-card-row height="150px">
	 <!-- <v-icon class="mr-5" dark>card_membership</v-icon> -->
	<div> <h5> {{ chose }} </h5></div>
	<v-spacer></v-spacer>
	<v-progress-circular
      v-bind:size="100"
      v-bind:width="15"
      v-bind:rotate="360"
      v-bind:value="value"
      class="teal--text"
    >
      {{  value }}
    </v-progress-circular>
    </v-card-row>
    </v-card-text>
    <v-divider></v-divider>
   	<v-card-row> 
	<v-data-table
	v-bind:headers="headers"
	:items="attendances"
	hide-actions
	class="elevation-1"
	>
	<template slot="items" scope="props">
		<td class="text-xs-left">{{ props.item.name }}</td>
		<td class="text-xs-left">
			<v-icon large class="teal--text" v-if="props.item.present">done</v-icon>
			<v-icon large class="pink--text accent-4" v-else>remove</v-icon>
		</td>

	</template>
  </v-data-table>
  </v-card-row>
  </v-card>

</div>
</template>

<script>
import AutoComplete from './AutoComplete'
import { filter, forEach, differenceBy, values, map, keys, includes } from 'lodash'
import * as api from '../api'

export default{
	data(){
		return{
			fetching: false,
			training: null,
			value: 0,
			trainings: [],
			names: [],
			chose: "",
			selected: false,
			headers: [
			{
				text: 'Name',
				left: true,
				sortable: false,
				value: 'name'
			},
			{
				text: 'Present',
				left: true,
				sortable: false,
				value: 'present'
			}
			],
			attendances: []
		}
	},
	components:{
		'auto-complete': AutoComplete
	},
	methods:{

		getActiveTraining(){
			api.fetch('trainings', {
				orderByChild: 'active',
				equalTo: true
			}).then( val => {
				let arr = []
				forEach(val, (item, key) =>{
					arr.push({
						key: key,
						text: item.name,
					})
					this.training = key
				})
				this.trainings = arr
			})
		},

		handleChange(input){
			const vm = this
			this.fetching = true
			if(input.length > 1){
				api.fetch('members', {
					orderByChild: 'name',
					startAt: input,
					endAt: input + '\uf8ff'
				}).then(members => {
					vm.names = map(members, member => {
						return 	member.name
					})
					console.log(input)
					vm.fetching = false
				})
			}else{
				this.names = []
			}
			this.fetching = false
		},
		handleEnter(name){
			this.attendances = []
			this.names = []
			const vm = this
			let userKey = ""
			let member = api.fetch('members/',{
				orderByChild: 'name',
				equalTo: name
			})
			let attendances = api.fetch('attendances/' + this.training)
			Promise.all([
				member,
				attendances
				]).then((val) => {
					const userKey = keys(val[0])[0]
					forEach(val[1], (attendance, key) =>{						

						const attendancesKey = keys(attendance)
						console.log(key)
						vm.attendances.push({
							name: key,
							present: includes(attendancesKey, userKey)
						})

					})
					vm.calculatePrecentate()
					vm.selected = true
				})

		},
		calculatePrecentate(){
			let total = this.attendances.length
			let attendances = filter(this.attendances, ['present', true]).length
			this.value = Math.round( (attendances / total) * 100)

		},
		handleChoose( name ){
			this.chose = name
			this.names = []
		},
	},

	created(){
		this.getActiveTraining()
	}

}	
</script>
<style scoped>
  div{
    text-align: center
}

  .progress-circular{
  	margin: 1rem
  }
</style>