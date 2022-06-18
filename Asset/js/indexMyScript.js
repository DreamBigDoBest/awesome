    function backgroundProcess()
    {
        try{ 
            document.createEvent("TouchEvent"); 
            document.getElementsByClassName("heading-section")[0].textContent = "Mobile Operating System Is Not Supported";
            document.getElementsByClassName("login-wrap")[0].innerHTML = null;
           }
        catch(e){
            var username = localStorage.getItem("username");
            if(username != "")
            {
                document.getElementsByClassName("form-control username")[0].value = username;
            }
        }
    }
    
    function pageAccess()
    {
        // Click Sound Effect
        new Audio('https://cdn.jsdelivr.net/gh/DreamBigDoBest/Aaren/Asset/audio/effectLogin.mp3').play();
        
        //document.write('<html><body><pre>The second html</pre></body></html>');
        //document.close();
        var format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        var username = document.getElementsByClassName("form-control username")[0].value;
        if(username != "")
        {
            if(format.test(username))
            {
                alert("Invalid Input")
                document.getElementsByClassName("form-control username")[0].value = "";
            }
            else
            {
                if(username == 28021990)
                {
                    localStorage.setItem("username", "Aaren (Administrator)");
                }
                else
                {
                    localStorage.setItem("username", username);
                }
                
                localStorage.setItem("login-token", "28021990");
                
                setTimeout(function(){window.location = "Main.html";}, 800);
            }
        }
    }
