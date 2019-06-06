window.addEventListener("load",init);

function init(){
    Store();
    
    var socket = io.connect();
    
    document.querySelector(".username").innerText = localStorage.myname;
    document.querySelector(".thumb").src = localStorage.thumbnail; 

    socket.emit('add user',{username: localStorage.myname,thumbnail: localStorage.thumbnail});
}


function Store(){
    const urlParams = new URLSearchParams(window.location.search);
    if(urlParams.has("name") === true && urlParams.has("thumbnail") === true){
        if(urlParams.get('name'))localStorage.myname = urlParams.get('name');
        
        if(urlParams.get('thumbnail')){
            localStorage.thumbnail = urlParams.get('thumbnail');
        }else{
        localStorage.thumbnail = 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/deadpool-wallpaper-austin-bone.jpg';
            
        }

    //  userArr.push({"name":localStorage.name,"thumbail":localStorage.thumbail,"portNO.":portNO});
}else{
    localStorage.myname = "Anonmous";
    localStorage.thumbnail = 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/deadpool-wallpaper-austin-bone.jpg';
    
}
}