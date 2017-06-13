<template>
<div>
    <auto-complete
    :names="names"
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

   </div>
</template>
<script>
import {matches, map, keys, filter, differenceBy,keyBy, values } from 'lodash'
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

		}
	},

    components:{
        "auto-complete": AutoComplete,
        "attendance-list": AttendanceList,
        "edit-name-dialog": EditNameDialog
    },
    methods:{
    	handleChange(input){

		const vm = this;
			api.startAt('members', 'name', input)
			.then(members => {
			 let suggestions = differenceBy(values(members), vm.attendees, 'key')
    		vm.names = map(suggestions, member => {
    			return member.name
    		})
    	})
    	.catch(val => console.log(val))
    	},
    	handleEnter(name){
    		
    		const date = this.$route.params.date
    		const vm = this
    		api.equalTo('members', name)
    		.then(member => {
    			if(member){
    				const key = keys(member)[0]
    				api.post(vm.todayAttendanceNode(key), true)
    			}else{
    				// console.warn("No User By that name")
    				const key = api.uniqueKey(name)
    				api.post('members/' + key,{
    					name: name,
    					key: key
    				})
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
    		if(key){
    			return 'attendances/' + this.$route.params.date + "/" + key
    		}else{
    			return 'attendances/' + this.$route.params.date
    		}
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
    	api.fetchAndListen(this.todayAttendanceNode(), (member) =>{
    		 // console.log(member)
    		 // vm.$set(vm.attendees, member)
    		 // console.log(vm.attendees)
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