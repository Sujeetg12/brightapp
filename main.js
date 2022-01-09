var loading = document.getElementById('loading');


function login(){
var email = document.getElementById('email').value;
var password = document.getElementById('password').value;

if(email !== '' && password !== ''){
loading.style.display = 'grid';
auth.signInWithEmailAndPassword(email , password).then((userCredential)=>{
//signed
const user = userCredential.user;
loading.style.display = 'none';


}).catch((error)=> {
const errorCode = error.code;
const errorMessage = error.message;
toast(errorCode);
loading.style.display = 'none';
})
}else{
toast('Please enter all details');
}
}



function signup(){
var email = document.getElementById('email').value;
var password = document.getElementById('password').value;

if(email !== '' && password !==''){
loading.style.display = 'grid';

auth.createUserWithEmailAndPassword(email , password).then((userCredential)=>{

const user = userCredential.user;
toast('You are successfully created your account');
loading.style.display = 'none';

}).catch((error)=> {
const errorCode = error.code;
const errorMessage = error.message;
toast(errorMessage);
loading.style.display = 'none';
})
}else{
toast('Please full all details');
}
}



auth.onAuthStateChanged((user) => {
	if (user) {
		// User is signed in, see docs for a list of available properties
		// https://firebase.google.com/docs/reference/js/firebase.User
const uid = user.uid;
const email = user.email;
const emailVerified = user.emailVerified;

if (emailVerified){
document.getElementById('login_signup').style.display = 'none';
document.getElementById('chat').style.display = 'block';



firebase.database().ref('user/messages').on('value' , function(snapshot){
document.getElementById('messagesContent').innerHTML = '';
snapshot.forEach(function(ChildSnapshot){
var messageFrom = ChildSnapshot.val().messageFrom;
var message = ChildSnapshot.val().message;

addItemToList(user.email , messageFrom , message);
});
});


document.getElementById('send').onclick = function push(){
firebase.database().ref('user/messages').push({
message : document.getElementById('sms').value,
messageFrom : email
});
document.getElementById('sms').value = '';
}


function addItemToList(email , messageFrom , textMessage){
	let div = document.createElement('div');
	let h6 = document.createElement('h6');
	let divsec = document.createElement('div');
if(messageFrom == email){
	div.setAttribute('class' , 'myMessage')
}else{
	div.setAttribute('class' , 'otherMessage')
}
div.id = 'messages';
h6.innerHTML = messageFrom;
divsec.innerHTML = textMessage;
document.getElementById('messagesContent').appendChild(div);
div.appendChild(h6);
div.appendChild(divsec);


}














} else {
toast('Sending email Verification link');
user.sendEmailVerification().then(function() {
toast("Verification link sent successfully on your email");
}).catch(function(error) {
	// An error happened.
var errorMessage = error.code;
toast(errorMessage);
});
}

} else {
document.getElementById('login_signup').style.display = 'grid';
document.getElementById('chat').style.display = 'none';

}
});







//toast,


function toast(message){
let toast = document.createElement('div');
        toast.id = 'toast';
        document.body.appendChild(toast);;
        let toastMessage = document.createElement('span');
        toastMessage.id = 'toastMessage';
        toastMessage.innerHTML = message;
        toast.appendChild(toastMessage);
        setTimeout(function() { toast.remove() }, 3000);
        setTimeout(function() { toastMessage.remove() }, 3000);
}
//New

function next() {
    document.getElementById("p1").style.display = "none";
}

