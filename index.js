let btn=document.querySelector("#btn")
let content=document.querySelector("#content")
let voice=document.querySelector("#voice")

function speak(text){
    let t=new SpeechSynthesisUtterance(text)
    t.rate=1
    t.pitch=1
    t.volume=1
    t.lang="hi-GB"
    window.speechSynthesis.speak(t)
}

// Safe mobile + laptop opener
function openApp(mobileUrl, desktopUrl){
    if(/Android/i.test(navigator.userAgent)){
        window.location.href = mobileUrl;
        setTimeout(()=>{
            window.open(desktopUrl,"_blank");
        },800);
    }else{
        window.open(desktopUrl,"_blank");
    }
}

function wishMe(){
    let h=new Date().getHours()
    if(h<12) speak("Good Morning Sir")
    else if(h<16) speak("Good Afternoon Sir")
    else speak("Good Evening Sir")
}

window.addEventListener("load",wishMe)

let speechRecognition=window.SpeechRecognition||window.webkitSpeechRecognition
let recognition=new speechRecognition()

recognition.onresult=(e)=>{
    let i=e.resultIndex
    let transcript=e.results[i][0].transcript
    content.innerText=transcript
    takeCommand(transcript.toLowerCase())
}

btn.addEventListener("click",()=>{
    recognition.start()
    btn.style.display="none"
    voice.style.display="block"
})

function takeCommand(message){
    btn.style.display="flex"
    voice.style.display="none"

    if(message.includes("hello")||message.includes("hii")){
        speak("hello sir what can i help you")
    }

    else if(message.includes("who are you")){
        speak("i am virtual assistant develop by Abhishek Rajput")
    }

    else if(message.includes("open youtube")){
        speak("opening youtube")
        openApp("vnd.youtube://","https://youtube.com")
    }

    else if(message.includes("open facebook")){
        speak("opening facebook")
        openApp("fb://facewebmodal/f?href=https://facebook.com","https://facebook.com")
    }

    else if(message.includes("open instagram")){
        speak("opening instagram")
        openApp("instagram://app","https://instagram.com")
    }

    else if(message.includes("open whatsapp")){
        speak("opening whatsapp")
        openApp("whatsapp://","https://web.whatsapp.com")
    }

    else if(message.includes("open chatgpt")){
        speak("opening chatgpt")
        openApp("https://chat.openai.com","https://chatgpt.com")
    }

    else if(message.includes("open google")){
        speak("opening google")
        openApp("https://google.com","https://google.com")
    }

    else if(message.includes("open calculator")){
        speak("opening calculator")
        if(/Android/i.test(navigator.userAgent)){
            openApp("https://www.google.com/search?q=calculator","https://www.google.com/search?q=calculator")
        }else{
            window.open("calculator:")
        }
    }

    else if(message.includes("play music")){
        speak("playing music")
        openApp("https://music.youtube.com","https://music.youtube.com")
    }

    else if(message.includes("open maps")){
        speak("opening maps")
        openApp("geo:0,0?q=","https://maps.google.com")
    }

    else if(message.includes("time")){
        speak(new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"}))
    }

    else if(message.includes("date")){
        speak(new Date().toLocaleString(undefined,{day:"numeric",month:"short",year:"numeric"}))
    }

    else{
        let clean=message.replace("aarthi","").replace("sarthi","")
        speak("this is what i found on internet regarding "+clean)
        window.open(`https://google.com/search?q=${clean}`,"_blank")
    }
}
