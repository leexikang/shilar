<template>
	<!-- <v-divider v-else-if="item.divider" v-bind:inset="item.inset"></v-divider> -->
	<!-- <v-list-item v-else v-bind:key="item.title"> -->
<v-list two-line>
	<v-list-item v-for="(training, index) in trainings" v-bind:key="training.name">

		<router-link :to="{ name: 'TrainingReport', params: { name: index }}">
			<v-list-tile>
				<v-list-tile-content>
					<v-list-tile-title>{{ training.name }}</v-list-tile-title>
				</v-list-tile-content>
			</v-list-tile>
			<v-divider></v-divider>
		</router-link>
	</v-list-item>
<p class="text-xs-center">.........</p>
</v-list>
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
			getActiveTraining(){
				api.fetch('trainings', {
					orderByChild: 'active',
					equalTo: true
				}).then( val => {
					this.trainings = val
				})
			}
		},
		created(){
			this.date = moment().format('YYYY-MM-DD')
			this.getActiveTraining()
		}
	}

</script>