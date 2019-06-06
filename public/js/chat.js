window.addEventListener("load",data);

function data(){
var socket = io.connect();
var today = new Date();
var time = today.getHours() + ":" + today.getMinutes();
// var messages = [];

var chat = document.querySelector('.chat');
var sendButton = document.getElementById("start_button");
var field = document.querySelector(".send");
var onlineUser = document.querySelector(".onlineUser");

function print(username,thumbnail){
    onlineUser.innerHTML += 
    `
    <div class="users">
        
              <img class="onlineImg" src="${thumbnail}" align="middle" height="50" width="50">
              <div class="status"> 
              <div class="userName">${username}</div>
              <div class="loc"><i class="fa fa-circle"></i><span class="online">online</span></div>
              </div>
    </div>
    
    `
}


socket.on('user joined',(data)=>{
    console.log("connected user",data);
    onlineUser.innerHTML = '';
    for(var i = 0;i<data.length;i++){
        print(data[i].username,data[i].thumbnail);
    }
});

socket.on('user left',(data)=>{

    console.log("disconected user ",data);
    
    onlineUser.innerHTML = '';
    for(var i = 0;i<data.length;i++){
        print(data[i].username,data[i].thumbnail);
    }
})



 // Rec Server Messages
 socket.on('message', function(data) {
    if (data.message) {
        if (data.userid) {
           
            // messages.push(data);
            // var html = '';
            if(data.userid == localStorage.myname){
                chat.innerHTML  += `<div class="space sp">

                <img  src="${data.thumbnail}" align="middle" height="50" width="50">
        
            <p class="messages lt"><span>${data.userid}: </span>${data.message} <span>&nbsp; ${time}</span></p>
            
        </div>
    `



            }else{
                chat.innerHTML += `<div class="rightProfile sp">

                <img  src="${data.thumbnail}" align="middle" height="50" width="50">
        
            <p class="messages rt"><span>${data.userid}: </span>${data.message}  <span>&nbsp; ${time}</span></p>
            
        </div>`
              
            }
        } 
        
       
    } else {
        console.log("There is a problem:", data);
    }
});







// Send Client Message to the Server
sendButton.onclick = function() {
    console.log("click toh kiya h");
    var text = field.value;
    // Event fire
    socket.emit('send', {
        userid: localStorage.myname,
        message: text,
        thumbnail: localStorage.thumbnail
    });
};


}