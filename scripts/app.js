var config = {
	apiKey: "AIzaSyDiXAZJtzzlrwPJTQmacdiVdOyfm1oFve0",
	authDomain: "fir-demo-a56a3.firebaseapp.com",
	databaseURL: "https://fir-demo-a56a3.firebaseio.com",
};
firebase.initializeApp(config);

var ref = firebase.database().ref();
var auth = firebase.auth();

function login(){
	var provider = new firebase.auth.FacebookAuthProvider();
	auth.signInWithPopup(provider);
	return false;
}

function logout(){
	auth.signOut();
	return false;
}

auth.onAuthStateChanged(function(result){
	if(result){
		logincontrol.style.display = "none";
		inputcontrol.style.display="block";
		userimage.style.display = "block";
		userimage.src = auth.currentUser.photoURL;
	}else{
		logincontrol.style.display = "block";
		inputcontrol.style.display="none";
		userimage.style.display = "none";
	}
});


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
	listdiv.innerHTML = '<p>' + json.user + " : " +json.message + '</div>' + listdiv.innerHTML;
}











