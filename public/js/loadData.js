window.addEventListener("load",loadata);

function loadata(){
    var socket = io.connect();
    var chat = document.querySelector('.chat');

    var html = '';
    
    console.log("chat innerhtml = " ,chat.innerHTML);
    if(chat.innerHTML === ""){
        
        socket.on('data',function(data){
        console.log(data);
            if(data.length>0){
                
                  for(var i = 0; i < data.length; i++){
                      if(data[i].userid == localStorage.myname){
                          html += `<div class="space sp">

                          <img  src="${data[i].thumbnail}" align="middle" height="50" width="50">
                  
                      <p class="messages lt"><span>${data[i].userid}: </span>${data[i].message} </p>
                      
                  </div>`

                         chat.innerHTML = html;
                      }else{
                          html += `<div class="rightProfile sp">

                          <img  src="${data[i].thumbnail}" align="middle" height="50" width="50">
                  
                      <p class="messages rt"><span>${data[i].userid}: </span>${data[i].message} </p>
                      
                  </div>`
                        chat.innerHTML = html;
                      }
                  }
            }else{
                html = "start group conversion .........."
                chat.innerHTML = html;
            }
              

        });
        
        console.log("chat innerhtml = " ,chat.innerHTML); 
    }
}


