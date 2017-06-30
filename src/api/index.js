import * as firebase from "firebase"
import {assign} from 'lodash'

const config = {
	apiKey: "AIzaSyCQdY0d5T6rSusK-RdX8enohHdtqIQfaOM",
	authDomain: "roll-call-ebc65.firebaseapp.com",
	databaseURL: "https://roll-call-ebc65.firebaseio.com",
	projectId: "roll-call-ebc65",
	storageBucket: "roll-call-ebc65.appspot.com",
	messagingSenderId: "747259032069"
};
const listeners = []
const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('profile');
provider.addScope('email');
provider.addScope('https://www.googleapis.com/auth/plus.me');


const db = firebase.initializeApp(config).database();
const api = db.ref();
let user = null
export {user}


export function signIn(){

	return firebase.auth().signInWithPopup(provider).then(function(result) {
		if (result.credential) {
			var token = result.credential.accesstoken;
		}
		var token = result.credential.accesstoken;
		user = result.user;

	}).catch(function(error) {

		var errorcode = error.code;
		var errormessage = error.message;
		var email = error.email;
		var credential = error.credential;
  // ...
});
}
export function currentUser(callback){
	firebase.auth().onAuthStateChanged(callback)
}

export function fetch(child, query){
	return new Promise((resolve, reject) => {
		let ref = api.child(child)	
		if(query){
			for (const key of Object.keys(query)) {
				if(query[key]){
					if(Array.isArray(query[key])){
						ref = ref[key](...query[key])
					}else{
						ref = ref[key](query[key])	
					}
				}else{
					ref = ref[key]()
				}
			}
		}
		ref.once('value', snapshot => {
			const val = snapshot.val();
        resolve(val)
    }, reject)
	})
}

export function nestedFetch(child, cb){
		console.log("Path", child)
		// let userRef = api.child('members').child( snapshot.key)
		api.child(child).once('value', snapshot => {
				// console.log(snapshot.val())
				cb(value)
			})
}

// export function test(child, cb){
// 	let attendances = new Promise( (resolve, reject) => 
// 		{
// 			api.child(child).once('value', snapshot => {
// 				// console.log(snapshot.val())
// 				resolve(snapshot.val())
// 			}, reject)
// 		}
// 	let attendees = new Promise((resolve, reject) =>{
// 		api.child('attendances').once('value', snapshot => {
// 			snapshot.val()	
// 		})
// 	}, reject)
// 
// }

export function fetchAndListen(node, child, cb){

	const ref = api.child(node)
		 const listener = ref.on('child_added', snapshot =>{
			let userRef = api.child(child).child( snapshot.key)
			userRef.once('value', snap => {
				let value = assign(snap.val(), {key: snapshot.key })
				cb(value)
			})
			listeners.push([ref, 'child_added', listener])
		})
}

export function onRemove(node, cb){
			const ref= api.child(node)
			const listener = ref.on('child_removed', snapshot =>{
			let userRef = api.child('members').child( snapshot.key)
			userRef.once('value', snap => {
				let value = assign(snap.val(), {key: snapshot.key })
				// console.log("removed")
				cb(value)
			})
			listeners.push[ref, 'child_removed', listener]
		})
}

export function post(node, data){
	return db.ref(node).set(data)
}
export function fetchOrCreate(node, data){
	fetch(node)
	.then( (value) => {
		if(value){
			return true
		}
		return post(node, data)
	})	
}

export function update(node, data){
	return db.ref(node).update(data)
}

export function offAll(){

	listeners.forEach((listener) => {
		const ref = listener[0]
		ref.off(listener[1], listener[2])
	})
	// console.log("Listners", listeners)
	// Object.keys(listeners).forEach(function(key) {
		// const ref = listeners[key]
		// console.log([db.ref().child("attendances")])
		// ref.off(listeners[key][0], listeners[key][1])
	// })

}

export function remove(node){
	return db.ref(node).remove()
}
export function equalTo(node, val){

	return new Promise((resolve, reject) => {
		api.child(node)
		.orderByChild("name")
		.equalTo(val)
		.once('value', snapshot => {
			const val = snapshot.val()
			resolve(val)
		}, reject)
	})
}

export function startAt(child, field, startAt){
	return new Promise((resolve, reject ) => {
		api.child(child)
		.orderByChild(field)
		.startAt(startAt)
		.endAt(startAt + '\uf8ff')
		.once('value', snapshot =>{
			const val = snapshot.val();
			resolve(val)
		},reject)
	})
}

//util
export function uniqueKey(val){
	return val.replace(/ /g,'').toLowerCase() +  new Date().getUTCMilliseconds();
}