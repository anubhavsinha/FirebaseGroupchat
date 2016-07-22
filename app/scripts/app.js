var config = {
   apiKey: "AIzaSyDtm-NU19ETL2DgQAbwbfGLAUlKpudqbYQ",
   authDomain: "myfirebaseapp-5c3ca.firebaseapp.com",
   databaseURL: "https://myfirebaseapp-5c3ca.firebaseio.com",
};

firebase.initializeApp(config);

function login(){
	var provider = new firebase.auth.FacebookAuthProvider();
	firebase.auth().signInWithPopup(provider);
	return false;
}

function logout(){
	firebase.auth().signOut();
	return false;
}

///callback when users session changes
firebase.auth().onAuthStateChanged(function(result){
	if(result){
		var user = firebase.auth().currentUser;
		logincontrol.style.display = "none";
		inputcontrol.style.display="block";
		userimage.style.display = "inline-block";
		userimage.src = user.photoURL;
		username.innerHTML = user.displayName;
	}else{
		logincontrol.style.display = "block";
		inputcontrol.style.display="none";
		userimage.style.display = "none";
		username.innerHTML = "";
	}
});

//database root
var ref = firebase.database().ref();

function addToList(){
	var message = document.getElementById("message").value;
	ref.child('messages').push({"user":auth.currentUser.displayName,"message":message});
	return false;
}


ref.child('messages').on('child_added', function(snapshot){
	updateUI(snapshot.val());
});

function updateUI(json){
	var listdiv = document.getElementById("messages");
	listdiv.innerHTML = 
		'<div class="message">' + "<b>" + json.user + "</b>" + " : " + json.message + 
		'</div>' + listdiv.innerHTML;
}
