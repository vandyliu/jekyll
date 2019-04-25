document.getElementById('taskInputForm').addEventListener('submit', saveTask);
document.getElementById('taskDueDateInput').valueAsDate = new Date();
window.addEventListener('load', function() {initApp()});

var database;
var uid;
var keys;
var tasks;
var p;

function setup() {
	setupFirebase();
	logIn();	
	//console.log(uid);
	//var ref = database.ref(uid+'/tasks');
	//ref.on('value', gotTasks, errTasks);
}

function loggedinsetup() {
	setupFirebase();
}

function getDifficulty(number) {
	if (number === '3')
		return 'Easy';
	if (number === '2')
		return 'Moderate';
	else
		return 'Difficult';
}

function getButtonType(number) {
	if (number === '3')
		return 'label label-info';
	if (number === '2')
		return 'label label-warning';
	else
		return 'label label-danger';
}

function gotTasks(data) {
	showTasks(data);
}

function showTasks(data) {
	tasks = data.val();
	keys = Object.keys(tasks);
	displayTasks();
}

function displayTasks() {
	var tasksList = document.getElementById('tasksList');
	tasksList.innerHTML = '';
	switch (p) {
		case 'quickest':
			keys.sort((a,b) => (tasks[a].time > tasks[b].time) ? 1 : (tasks[a].time === tasks[b].time) ? ((tasks[a].dueDate > tasks[b].dueDate) ? 1 : -1) : -1);
			break;
		case 'easiest':
			keys.sort((a,b) => (tasks[a].difficulty < tasks[b].difficulty) ? 1 : (tasks[a].difficulty === tasks[b].difficulty) ? ((tasks[a].dueDate > tasks[b].dueDate) ? 1 : -1) : -1);
			break;
		default:
			keys.sort((a,b) => (tasks[a].dueDate > tasks[b].dueDate) ? 1 : (tasks[a].dueDate === tasks[b].dueDate) ? ((tasks[a].time > tasks[b].time) ? 1 : -1) : -1);
			break;
	}
	
	for (var i = 0; i < keys.length; i++) {
		var k = keys[i];
		var desc = tasks[k].desc;
		var buttonType = getButtonType(tasks[k].difficulty);
		var difficulty = getDifficulty(tasks[k].difficulty);
		var dueDate = tasks[k].dueDate;
		var time = tasks[k].time;
		tasksList.innerHTML +=   
		`<div class="well">
		<div><span class="label label-primary">Task ID: ${k}</span>
		<div><span class="${buttonType}">Difficulty: ${difficulty}</span>
		<h2><strong>${desc}</strong></h2>
		<p><span class="glyphicon glyphicon-time"></span> ${time} hours </p>
		<p><span class="glyphicon glyphicon-calendar"></span> ${dueDate}</p>`+
		`<a href="#" class="btn btn-success" onclick="deleteTask('${k}')">Complete</a>
		</div>`;
	}
}

function errTasks(err) {
	console.log("Error!");
	console.log(err);
}

function setupFirebase() {
	var config = {
		apiKey: "AIzaSyBfC366dnGEl83wJRhrmdxgFIGRx6D4hyA",
		authDomain: "priority-to-do-list.firebaseapp.com",
		databaseURL: "https://priority-to-do-list.firebaseio.com",
		projectId: "priority-to-do-list",
		storageBucket: "priority-to-do-list.appspot.com",
		messagingSenderId: "722313367455"
	};
	firebase.initializeApp(config);
	database = firebase.database();
}

function logIn() {
	var uiConfig = {
		signInSuccessUrl: 'loggedin.html',
		signInOptions: [
			 // Leave the lines as is for the providers you want to offer your users.
			 firebase.auth.GoogleAuthProvider.PROVIDER_ID,
			 ],
		  // tosUrl and privacyPolicyUrl accept either url string or a callback
		  // function.
		  // Terms of service url/callback.
		  tosUrl: '<your-tos-url>',
		  // Privacy policy url/callback.
		  privacyPolicyUrl: function() {
			window.location.assign('<your-privacy-policy-url>');
		  }
	 };

	// Initialize the FirebaseUI Widget using Firebase.
	var ui = new firebaseui.auth.AuthUI(firebase.auth());
	// The start method will wait until the DOM is loaded.
	ui.start('#firebaseui-auth-container', uiConfig);
}

function logout() {
	firebase.auth().signOut();
}

function initApp() {
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
		  // User is signed in.
		  var displayName = user.displayName;
		  var email = user.email;
		  var emailVerified = user.emailVerified;
		  var photoURL = user.photoURL;
		  uid = user.uid;
		  var phoneNumber = user.phoneNumber;
		  var providerData = user.providerData;
		  user.getIdToken().then(function(accessToken) {
			document.getElementById('sign-in-msg').textContent = 'Welcome '+user.displayName;
			document.getElementById('sign-in').textContent = 'Sign out';
			var ref = database.ref('users/'+uid+'/tasks');
			ref.on('value', gotTasks, errTasks);
		  });
		 } else {
			  // User is signed out.
			  window.location.href = '/';
		 }
	}, function(error) {
		console.log(error);
	});
};


function fieldMissingPopUp() {
  //var popup = document.getElementById("myPopup");
  //popup.classList.toggle("show");
  //setTimeout(function(){ return true;}, 3000);
  //popup.classList.toggle("show");
  alert('You missed a field!');
}

function saveTask(e) {

	var desc = document.getElementById('taskDescInput').value;
	var difficulty = document.getElementById('taskDifficultyInput').value;
	var time = parseFloat(document.getElementById('taskTimeInput').value);
	var dueDate = document.getElementById('taskDueDateInput').value;    // make into if statement
  
	if (desc === "" || time === "" || dueDate === "") {
		fieldMissingPopUp();
	} 
	else {
		var ref = database.ref('users/'+uid+'/tasks');
		var data = {
			desc: desc,
			difficulty: difficulty,
			time: time,
			dueDate: dueDate
		}
		ref.push(data);
		 document.getElementById('taskInputForm').reset();   //resets form
	}
	e.preventDefault(); // prevents default form to be submitted
}

function deleteTask(id) {
	var ref = database.ref('users/'+uid+'/tasks/'+id);
	console.log(ref);
	ref.remove().then(function() {
		console.log(id + "Removed");
	}).catch(function(error) {
		console.log("Remove failed: " + error.message)
	});
}

function changePriority(pr) {
	p = pr;
	displayTasks();
	priorityText.innerHTML = `Priority: ${p}`;
}

function soonest() {
	changePriority("soonest");
}

function quickest() {
	changePriority("quickest");
}

function easiest() {
	changePriority("easiest");
}