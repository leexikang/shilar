const functions = require('firebase-functions');
const admin = require('firebase-admin');
  const cors = require('cors')({origin: true})
const _ = require('lodash');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.trainingReport = functions.https.onRequest((req, res) =>{
	// res.send("Hello from function")
	cors(req, res, () => {
		if (req.query.training) {
			let training = req.query.training

			const attendances = admin.database()
				.ref('/attendances')
				.child(training)
				.once('value')
				.then(snapshot => {
					return snapshot.val()
				})

			const members = admin.database()
				.ref('/members')
				.orderByChild('/trainings/' + training)
				.equalTo(true)
				.once('value')
				.then(snapshot => {
					return snapshot.val()
				})
			// .once('value')
			// res.send("ok")
			// })
			// .catch(err =>{
			// res.send("error")
			// })

			Promise.all([attendances, members])
				.then(val => {
					let attendances = val[0]
					let members = val[1]
					let report = []

					_.forEach(members, (member, key) => {
						let userAttendance = {
							name: member.name,
							key: member.key,
							attendances: {},
							total: 0
						}

						_.forEach(attendances, (attendance, index) => {
							let attendees = _.keys(attendance)
							if (_.includes(attendees, member.key)) {
								userAttendance['attendances'][index] = true
								userAttendance['total'] += 1

							} else {
								userAttendance['attendances'][index] = false
							}
						})
						report.push(userAttendance)
					})

					res.status(200).json(report)
				})
				.catch(err => {
					console.log(err)
					res.send("error")
				})


		} else {
			res.send('missing parameter')
		}
	})

})
