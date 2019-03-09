document.getElementById('taskInputForm').addEventListener('submit', saveTask);
document.getElementById('taskDueDateInput').valueAsDate = new Date();
window.addEventListener('load', function() {initApp()});

var database;
var uid;

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
	var tasksList = document.getElementById('tasksList');
  	tasksList.innerHTML = '';

	var tasks = data.val();
	var keys = Object.keys(tasks);
	
	for(var i = 0; i < keys.length; i++) {
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
            }
            );
          } else {
            // User is signed out.
            window.location.href = '/tasks';
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

function changePriority(p) {
 //  var ref = database.ref('priority');
   var value = p;
 //  ref.on('value', function (data) {

	//    ref.remove().then(function() {
	//    	ref.push(value);
	//    }).catch(function(error) {
	//    	console.log(error.message);
	//    });
	// });
  priorityText.innerHTML = `Priority: ${value}`;
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



























function buildHeap() {
  var tasks = this.tasksList();
  for (var i = tasks.length - 1; i > 0; i--) {
    heapifyDown(i);
  }
  fetchTasks();
}

function heapifyUp(index) {
  var tasks = this.tasksList();
  var priority = tasks[0];
  var parent = Math.floor(index/2);

  if (index !== 1) {
    if (compare(tasks[index], tasks[parent], priority)) {
      swap(index, parent);
      console.log(index);
      heapifyUp(parent);
    }
  }
}

function heapifyDown(index) {
  var tasks = this.tasksList();
  var priority = tasks[0];
  var size = tasks.length;
  var highestPriority = index;
  var left = 2*index;
  var right = 2*index+1;

  if (left <= size - 1) {
    if (compare(tasks[left], tasks[highestPriority], priority))
      highestPriority = left;
  }

  if (right <= size - 1) {
    if (compare(tasks[right], tasks[highestPriority], priority))
      highestPriority = right;
  }

  if (highestPriority !== index) {
    swap(index, highestPriority);
    heapifyDown(highestPriority);
  }
}

function compare(firstElement, secondElement, priority) {
  //var p = (priority === "quickest") ? "time" : "difficulty";
  var p = "time";
  return (firstElement[p] < secondElement[p]);
}

function swap(firstIndex, secondIndex) {
  var tasks = this.tasksList();
  if (secondIndex === "last")
    secondIndex = tasks.length - 1;

  var tmp = tasks[firstIndex];

  tasks[firstIndex] = tasks[secondIndex];
  tasks[secondIndex] = tmp;
  localStorage.setItem('tasks', JSON.stringify(tasks));
  //fetchTasks();
}
