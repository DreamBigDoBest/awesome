
function mediaSelection(index)
{
    switch (index)
    {
        case 1:
            console.log("selected-1");
            localStorage.setItem("login-token", "selected-1");
            window.location.assign("player.html");
            break;
        case 2:
            console.log("selected-2");
            localStorage.setItem("login-token", "selected-2");
            window.location.assign("player.html");
            break;
        default:
            break;
    }
}

function backGroundProcess()
{
    var hashChecker = 37047011;
    if(hashCode(window.location.href) != hashChecker)
    {
        window.location.replace("index.html");
        return;
    }
    
    var loginToken = localStorage.getItem("login-token");
    if((loginToken == "28021990")      ||
       (loginToken == "main")          ||
       (loginToken.includes("select")))
    {
        localStorage.setItem("login-token", "main");
        document.getElementById("selection1").addEventListener("click", function(){mediaSelection(1);});
        document.getElementById("selection2").addEventListener("click", function(){mediaSelection(2);});
    }
    else
    {
        window.location.replace("index.html");
        return;
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
