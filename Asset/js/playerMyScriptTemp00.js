var Playback_List = [];
var mediaName = [];
var mediaSource = [];
var mediaPath = "";
function indexUpdate()
{
    var loginToken = localStorage.getItem("login-token");
    
    if(loginToken == "selected-1")
    {
        if(document.getElementById("playbackIndex").value.match(/^[0-9]+$/) != null)
        {
            document.getElementById('videoPlayer').src = "https://archive.org/download/" + mediaPath + "/" + mediaSource[parseFloat(document.getElementById("playbackIndex").value)];
            document.getElementById('videoPlayer').load();
        }
    }
    else if(loginToken == "selected-2")
    {  
        if(document.getElementById("playbackIndex").value.match(/^[0-9]+$/) != null)
        {
            document.getElementById('MediaName').innerHTML = mediaName[parseFloat(document.getElementById("playbackIndex").value)];
            document.getElementById('audioPlayer').src = "https://archive.org/download/" + mediaPath + "/" + mediaSource[parseFloat(document.getElementById("playbackIndex").value)];
            document.getElementById('audioPlayer').load();
            
            localStorage.setItem(localStorage.getItem("login-token")+ "SAVED", document.getElementById("playbackIndex").value);
        }
    }
}

function playNextItem()
{
    var loginToken = localStorage.getItem("login-token");
    
    if(loginToken == "selected-1")
    {
        if((parseFloat(document.getElementById("playbackIndex").value) + 1) < (mediaSource.length))
        {
            /* Select Next Item */
            document.getElementById("playbackIndex").value = parseFloat(document.getElementById("playbackIndex").value) + 1;
            
            indexUpdate(); /* Load Latest Selected Media */
            document.getElementById('videoPlayer').play();
        }
    }
    else if(loginToken == "selected-2")
    {
        if((parseFloat(document.getElementById("playbackIndex").value) + 1) < (mediaSource.length))
        {
            /* Select Next Item */
            document.getElementById("playbackIndex").value = parseFloat(document.getElementById("playbackIndex").value) + 1;
            
            indexUpdate(); /* Load Latest Selected Media */
            document.getElementById('audioPlayer').play();
        }
    }
}

function mediaPauseEffect()
{
    var object = document.getElementById('videoPlayer');
    if((parseFloat(object.currentTime) > 1) && (parseFloat(object.currentTime) < parseFloat(object.duration) - 1))
    {
        playNextItem();
    }
}

function loadPlaybackMedia()
{
    var seperator = " # ";
    var eachMedia = Playback_List.split("\n");
    var loginToken = localStorage.getItem("login-token");

    for(var index = 0; index < eachMedia.length; index++)
    {
        if(eachMedia[index].split(seperator)[1] != null)
        {
            mediaName.push(eachMedia[index].split(seperator)[0]);
            mediaSource.push(eachMedia[index].split(seperator)[1]);
        }
    }
    
    if(loginToken != "selected-1") /* Normal Playback List */
    {
        if(localStorage.getItem(localStorage.getItem("login-token") + "SAVED") != null)
        {
            document.getElementById("playbackIndex").value = parseFloat(localStorage.getItem(localStorage.getItem("login-token") + "SAVED"));
            indexUpdate();
        }
        else
        {
            document.getElementById("playbackIndex").value = 0;
            indexUpdate();
        }
    }
    else /* Random Playback List */
    {
        let shuffleMediaSource = mediaSource
                                  .map(value => ({ value, sort: Math.random() }))
                                  .sort((a, b) => a.sort - b.sort)
                                  .map(({ value }) => value)
                                  
        mediaSource = shuffleMediaSource;
    
        document.getElementById("playbackIndex").style.visibility = "hidden";
        document.getElementById("playbackIndex").value = 0;
        indexUpdate();        
    }
}


function backGroundProcess()
{
    var hashChecker = 1672383003;
    if(hashCode(window.location.href) != hashChecker)
    {
        window.location.replace("index.html");
        return;
    }
    //https://archive.org/download/<folder identifier>/<filename>
    var loginToken = localStorage.getItem("login-token");
    if(loginToken == null)
    {
        window.location.replace("index.html");
        return;
    }
    
    if((loginToken == "selected-1") ||
       (loginToken == "selected-2"))
    {
        switch(loginToken)
        {
            case "selected-1":
                fetch("https://raw.githubusercontent.com/DreamBigDoBest/awesome/main/PlaybackList/random_video_playlist.txt")
                .then((response) => {
                    return response.text();
                })
                .then((text) => {
                    Playback_List = text;
                    mediaPath = "RMediaCollection";
                    document.getElementById('mediaPlayer').innerHTML = '<input onchange="indexUpdate()"  type="text" id="playbackIndex"><br><video id="videoPlayer" width="400" controls="controls" onpause="mediaPauseEffect()" src="" type="video/mp4">';
                    
                    document.getElementById('videoPlayer').addEventListener('ended',function(){
                        playNextItem();
                    });
                    
                    document.getElementById('videoPlayer').addEventListener('loadeddata', function() {
                        /* Direct Display Full Screen */
                        try{
                            if (document.getElementById('videoPlayer').requestFullscreen) {
                              document.getElementById('videoPlayer').requestFullscreen();
                            } else if (document.getElementById('videoPlayer').mozRequestFullScreen) {
                              document.getElementById('videoPlayer').mozRequestFullScreen();
                            } else if (document.getElementById('videoPlayer').webkitRequestFullscreen) {
                              document.getElementById('videoPlayer').webkitRequestFullscreen();
                            }
                        }
                        catch(err) {}
                    }, false);
                    
                    loadPlaybackMedia();
                });
                break;
            case "selected-2":
                fetch("https://raw.githubusercontent.com/DreamBigDoBest/awesome/main/PlaybackList/yinianyongheng_audio_playlist.txt")
                .then((response) => {
                    return response.text();
                })
                .then((text) => {
                    Playback_List = text;
                    mediaPath = "MediaCollection1";
                    document.getElementById('mediaPlayer').innerHTML = '<label id="MediaName">Media Name</label><br><label id="IndexInfo">PlayIndex: </label><input onchange="indexUpdate()"  type="text" id="playbackIndex"><br><audio id="audioPlayer" controls="controls" src="" type="audio/mp3">';
                    
                    document.getElementById('audioPlayer').addEventListener('ended',function(){
                        playNextItem();
                    });
                    
                    loadPlaybackMedia();
                });
                break;
            default:
                break;
        }  
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
