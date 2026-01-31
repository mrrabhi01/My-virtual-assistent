let btn=document.querySelector("#btn")
let content=document.querySelector("#content")
let voice =document.querySelector("#voice")

function speak(text){
let text_speak=new SpeechSynthesisUtterance(text)
 text_speak.rate=1
 text_speak.pitch=1
 text_speak.volume=1
 text_speak.lang="hi-GB"
 window.speechSynthesis.speak(text_speak)
}

// Mobile + Laptop helper
function openApp(androidIntent, desktopUrl){
    if(/Android/i.test(navigator.userAgent)){
        window.location.href = androidIntent;
    }else{
        window.open(desktopUrl,"_blank");
    }
}

function wishMe(){
    let hours=new Date().getHours()

    if(hours>=0 && hours<12){
        speak("Good Morning Sir")
    }
    else if(hours>=12 && hours <16 ){
        speak("Good Afternoon Sir")
    }
    else{
        speak("Good Evening Sir")
    }
}

window.addEventListener('load',()=>{
    wishMe()
})

let speechRecognition= Window.SpeechRecognition || window.webkitSpeechRecognition
let recognition =new speechRecognition()

recognition.onresult=(event)=>{
    let currentIndex=event.resultIndex
    let transcript=event.results[currentIndex][0].transcript
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
        openApp("vnd.youtube://","https://www.youtube.com/")
    }

    else if(message.includes("open facebook")){
        speak("opening facebook")
        openApp("fb://","https://www.facebook.com/")
    }

    else if(message.includes("open instagram")){
        speak("opening instagram")
        openApp("instagram://","https://www.instagram.com/")
    }

    else if(message.includes("open chatgpt")){
        speak("opening chatgpt")
        openApp("intent://chat.openai.com/#Intent;scheme=https;end","https://chatgpt.com/")
    }

    else if(message.includes("open google")){
        speak("opening google")
        openApp("intent://#Intent;scheme=http;package=com.android.chrome;end","https://google.com/")
    }

    else if(message.includes("open calculator")){
        speak("opening calculator")
        openApp("intent://com.android.calculator2/#Intent;scheme=android-app;package=com.android.calculator2;end","calculator:")
    }

    else if(message.includes("open whatsapp")){
        speak("opening whatsapp")
        openApp("intent://send/#Intent;scheme=whatsapp;package=com.whatsapp;end","https://web.whatsapp.com")
    }

    else if(message.includes("send whatsapp message")){
        speak("sending message")
        window.open("https://wa.me/?text=Hello","_blank")
    }

    else if(message.includes("open camera")){
        speak("opening camera")
        openApp("intent://media/#Intent;scheme=android-app;package=com.android.camera;end","")
    }

    else if(message.includes("open maps")){
        speak("opening maps")
        openApp("geo:0,0?q=","https://www.google.com/maps")
    }

    else if(message.includes("open flashlight")){
        speak("opening flashlight")
        openApp("intent://com.android.systemui/#Intent;scheme=android-app;end","https://google.com/search?q=flashlight")
    }

    else if(message.includes("open bluetooth")){
        speak("opening bluetooth")
        openApp("intent://settings/bluetooth/#Intent;scheme=android-app;package=com.android.settings;end","")
    }

    else if(message.includes("play music")){
        speak("playing music")
        openApp("intent://com.google.android.music/#Intent;scheme=android-app;end","https://music.youtube.com")
    }

    else if(message.includes("open file manager")){
        speak("opening file manager")
        openApp("intent://com.android.documentsui/#Intent;scheme=android-app;end","")
    }

    else if(message.includes("open wifi")){
        speak("opening wifi")
        openApp("intent://settings/wifi/#Intent;scheme=android-app;package=com.android.settings;end","")
    }

    else if(message.includes("time")){
        speak(new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"}))
    }

    else if(message.includes("date")){
        speak(new Date().toLocaleString(undefined,{day:"numeric",month:"short",year:"numeric"}))
    }

    else{
        let cleanMsg=message.replace("aarthi","").replace("sarthi","")
        speak("this is what i found on internet regarding "+cleanMsg)
        window.open(`https://www.google.com/search?q=${cleanMsg}`,"_blank")
    }
}
