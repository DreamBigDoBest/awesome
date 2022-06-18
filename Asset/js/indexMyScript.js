function backgroundProcess()
{
    var username = localStorage.getItem("username");
    if(username != "")
    {
        document.getElementsByClassName("form-control username")[0].value = username;
    }
}
    
function pageAccess()
{
    // Click Sound Effect
    new Audio('https://cdn.jsdelivr.net/gh/DreamBigDoBest/awesome/Asset/audio/effectLogin.mp3').play();
        
    //document.write('<html><body><pre>The second html</pre></body></html>');
    //document.close();
    //var format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    var username = document.getElementsByClassName("form-control username")[0].value;
    if(username != "")
    {
        if((hashCode(username.toLowerCase()) == 1024174846)   ||
           (hashCode(username.toLowerCase()) == -1784251650)  ||
           (hashCode(username.toLowerCase()) == 2100132842)   ||
           (hashCode(username.toLowerCase()) == 1035887594))
        {
            localStorage.setItem("username", username);
            localStorage.setItem("login-token", "28021990");
            setTimeout(function(){window.location = "Main.html";}, 800);
            //console.log("login success!!")
        }
    }
}

function hashCode(str) {
    let hash = 0;
    for (let i = 0, len = str.length; i < len; i++) {
        let chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}
