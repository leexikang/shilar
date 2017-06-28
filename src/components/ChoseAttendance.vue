<template>
	<div>
	<v-select
	:items="trainings"
	v-model="training"	
	item-value="key"
	label="Select"
	></v-select>	

	<date-picker
	:default="date"
	@changed="updateDate"
	/>

	<v-btn
	 light
	 primary
	 :disabled="!canClick"
	 @click.native="hanldeClick"
	> OK </v-btn>
	</div>

</template>

<script>
import moment from "moment"
import {forEach} from "lodash"
import *  as api from '../api'
import DatePicker from "./DatePicker"

export default{

	data(){
		return{
			date: "",
			training: null,
			trainings: [],
			canClick: false
		}
	},
	components:{
		"date-picker": DatePicker
	},
	computed:{
	
	},
	methods:{
		updateDate(date){
			this.date = date
		},
		hanldeClick(){

			this.$router.push({
				name: 'Attendance', 
				params: {
					name: this.training, 
					date: this.date
				}
			})
		},
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
		}
	},
	watch:{
		training(){
			if( this.training){
				this.canClick = true
			}
		}
	},
	created(){
		this.date = moment().format('YYYY-MM-DD')
		this.getActiveTraining()
	}
}

</script>