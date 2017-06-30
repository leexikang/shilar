<template>
<div>
    <auto-complete
    :names="names"
    :fetching="fetching"
    @change="handleChange"
    @choose="handleChoose"
    @enter="handleEnter"
    ref="child"
    />
   	<attendance-list
   	:attendees="attendees"
   	@edit="handleEdit"
   	@delete="handleDelete"
   	/> 
   	<edit-name-dialog
   	:dialog="dialog"
   	:edit="editedUser.name"
   	@cancel="handleCancel"
   	@save="handleSave"
   	ref="edit"
   	/>
   	<br/>
   	<router-link 
   	:to="{name: 'TodayAttendance', 
   	params: {
   	date: $route.params.date,
   	training: $route.params.name
   	 }}">
   	<v-btn success light router secondary raised> 
   		Finish 
   	</v-btn>
   </router-link>

</div>
</template>
<script>
import {debounce, matches, map, keys, filter, difference, differenceBy, keyBy, values } from 'lodash'
import *  as api from '../api'
import AutoComplete from './AutoComplete'
import AttendanceList from './AttendanceList'
import EditNameDialog from './EditNameDialog'

export default{

	data(){
		return{
			names: [],
			chose: "",
			attendees: [],
			listenedEvent: [],
			dialog: false,
			editedUser: {},
			members: [],
			fetching: false

		}
	},

    components:{
        "auto-complete": AutoComplete,
        "attendance-list": AttendanceList,
        "edit-name-dialog": EditNameDialog
    },
    methods:{
    	handleChange(input){
    		console.log(input)
			const vm = this
			if( input ){
				this.fetching = true
				api.fetch('members', {
					orderByChild: 'name',
					startAt: input,
					endAt: input + '\uf8ff'
				}).then(members => {
					let matches = differenceBy(values(members), vm.attendees, 'key')
					vm.names = map(matches, member => {
						return 	member.name
					})
					this.fetching = false
					if( input == ""){
						this.names = []
					}

				})
			}else{
				this.names = []
			}
		},
   		handleEnter(name){
    		
    		const date = this.$route.params.date
    		const vm = this
    		const training = this.$route.params.name
    		api.fetch('members', {
    			orderByChild: 'name',
    			equalTo: name
    		})
    		.then(member => {
    			if(member){
    				console.log(member)
    				const key = keys(member)[0]
    				if( member.trainings ){
    					if(member.trainings[training]){
    						api.post('members/' + key + '/trainings/' + training , true )
    						api.post('trainings/' + training + '/members/' + key, true )
    					}
    				}else{
    					console.log("Yo")
    						api.post('members/' + key + '/trainings/' + training, true )
    						api.post('trainings/' + training + '/members/' + key, true )
    				}

    				api.post(vm.todayAttendanceNode(key), true)
    			}else{
    				// console.warn("No User By that name")
    				const key = api.uniqueKey(name)
    				api.post('members/' + key,{
    					name: name,
    					key: key,
    					trainings:{
    						[training]: true
    					}
    				})
    				api.post('trainings/' + training + '/members/' + key, true)
    				api.post(vm.todayAttendanceNode(key), true)
    			}
    		})

    	},
    	handleChoose( name ){
    		this.chose = name
    		this.names = []
    	},
    	handleEdit(user){
    		this.dialog = true
    		this.editedUser = user
    		this.$refs.edit.$refs.input_edit.focus()
    		console.log(this.$refs.edit.$refs.input_edit)
    	},
    	handleDelete(attendee){
    		api.remove(this.todayAttendanceNode(attendee.key))
    	},
    	todayAttendanceNode(key){
    		let base_url =  'attendances/' +this.$route.params.name +  '/' + this.$route.params.date 
    		if(key){
    			return base_url + '/' + key
    		}
    			return base_url
    	},
    	handleCancel(){
    		this.dialog = false
    		this.editedUser = ""
    	},
    	repalceAttendee(attendees, target, newValue){
    		let updated = this.attendees.map((attendee) => {
    			if(attendee.key === target.key ){
    				return newValue
    			}
    			return attendee
    		})
    		return updated
    	},
    	handleSave(name){
    		const vm = this
    		let editedUser = this.editedUser
    		if( name ){
    			let user = {
    				key: editedUser.key,
    				name: name
    			}
    			api.update("members" + "/" + user.key, user)
    			.then((val) => {
    				vm.attendees = vm.repalceAttendee(vm.attendees, editedUser, user)
    				vm.editedUser = ""
    			})

    		}
    		
    		this.dialog = false
    	}
    },
    created(){
    	const vm = this
    	const name = this.$route.params.name
    	let AttendeeKeyPath = 'trainings/' + this.$route.params.name + "/members"

    	api.fetchAndListen(AttendeeKeyPath, "members", (member) =>{
    		vm.members.push(member.name)
    	})

    	api.fetchAndListen(this.todayAttendanceNode(), "members", (member) =>{
    		console.log(member)
    		 vm.attendees.push(member)
    	})

    	api.onRemove(this.todayAttendanceNode(), (member) =>{
    		 vm.attendees = filter(vm.attendees, (obj) => {
    		 	return obj.name !== member.name
    		 })
    	})
    },
    destroyed(){
    	api.offAll()
    }


}
</script>