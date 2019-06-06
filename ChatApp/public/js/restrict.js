function stoppedTyping(){
    var x = document.querySelector('.send').value;
    var btn = document.querySelector('#start_button');
    if(x != ''){
        btn.disabled = false;
        // btn.classList.add("disb");
    }else{
        btn.disabled = true;
       
    }
}

function verify(){
    var x = document.querySelector('.send').value;
    if (x = ''){
        alert ("Put some text in there!");           
    }
    
}