let btn = document.querySelector("#btn")
let content = document.querySelector("#content")
let voice = document.querySelector("#voice")

// ================= SPEECH SETUP =================
let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
let recognition = new SpeechRecognition()

recognition.continuous = true
recognition.interimResults = false

// ================= SPEAK FUNCTION =================
function speak(text){

    recognition.stop()
    window.speechSynthesis.cancel()

    setTimeout(()=>{

        let t = new SpeechSynthesisUtterance(text)
        t.rate = 1
        t.pitch = 1
        t.volume = 1
        t.lang = "hi-IN"

        t.onend = () => {
            setTimeout(()=>recognition.start(),500)
        }

        window.speechSynthesis.speak(t)

    },300)
}

// ================= OPEN APP =================
function openApp(mobileUrl, desktopUrl){
    if(/Android/i.test(navigator.userAgent)){
        window.location.href = mobileUrl
        setTimeout(()=>{
            window.open(desktopUrl,"_blank")
        },800)
    }else{
        window.open(desktopUrl,"_blank")
    }
}

// ================= GREETING =================
function wishMe(){
    let h = new Date().getHours()
    if(h < 12) speak("Good Morning Sir")
    else if(h < 16) speak("Good Afternoon Sir")
    else speak("Good Evening Sir")
}

// ================= START AFTER LOAD =================
window.addEventListener("load", ()=>{
    wishMe()
})

// ================= MIC RESULT =================
recognition.onresult = (e)=>{
    let i = e.resultIndex
    let transcript = e.results[i][0].transcript
    content.innerText = transcript
    takeCommand(transcript.toLowerCase())
}

// ================= BUTTON (FIRST CLICK REQUIRED) =================
btn.addEventListener("click",()=>{
    recognition.start()
    btn.style.display="none"
    voice.style.display="block"
})

// ================= COMMAND HANDLER =================
function takeCommand(message){

    if(message.includes("hello")){
        speak("hello sir what can i help you")
    }

    else if(message.includes("who are you")){
        speak("i am virtual assistant developed by Abhishek Rajput")
    }

    // ===== YOUTUBE PLAY =====
   else if(message.includes("open youtube") || message.startsWith("play")){

    let song = message
        .replace("hey","")
        .replace("sarthi","")
        .replace("play","")
        .replace("open youtube","")
        .replace("song","")
        .trim()

    if(song.length === 0){

        speak("opening youtube")

        setTimeout(()=>{
            window.open("https://www.youtube.com","_blank")
        },800)

    }else{

        speak("playing " + song)

        let q = encodeURIComponent(song)

        // normal youtube search + autoplay
        let url = `https://www.youtube.com/results?search_query=${q}&autoplay=1`

        setTimeout(()=>{
            window.open(url,"_blank")
        },800)
    }
}




    else if(message.includes("open google")){
        speak("opening google")
        setTimeout(()=>openApp("https://google.com","https://google.com"),800)
    }

    else if(message.includes("calculate") || message.includes("what is")){

    let text = message.toLowerCase()

    // remove wake words + junk
    text = text
        .replace("hey","")
        .replace("sarthi","")
        .replace("calculate","")
        .replace("what is","")
        .replace("please","")
        .trim()

    // number words to digits
    const map = {
        zero:0, one:1, two:2, three:3, four:4, five:5,
        six:6, seven:7, eight:8, nine:9, ten:10,
        eleven:11, twelve:12, thirteen:13, fourteen:14, fifteen:15,
        sixteen:16, seventeen:17, eighteen:18, nineteen:19,
        twenty:20, thirty:30, forty:40, fifty:50,
        sixty:60, seventy:70, eighty:80, ninety:90
    }

    Object.keys(map).forEach(w=>{
        text = text.replaceAll(w, map[w])
    })

    // operators
    text = text
        .replaceAll("plus","+")
        .replaceAll("minus","-")
        .replaceAll("into","*")
        .replaceAll("times","*")
        .replaceAll("multiply","*")
        .replaceAll("divide","/")
        .replaceAll("by","/")

    // keep only numbers and operators
    text = text.replace(/[^0-9+\-*/.]/g,"")

    try{
        let result = Function("return " + text)()

        if(result === undefined || isNaN(result)){
            speak("Sorry, I could not calculate")
        }else{
            speak("The answer is " + result)
            content.innerText = result
        }

    }catch(e){
        speak("Sorry, calculation failed")
    }
}


    else if(message.includes("open whatsapp")){
        speak("opening whatsapp")
        setTimeout(()=>openApp("whatsapp://","https://web.whatsapp.com"),800)
    }

    else if(message.includes("open chat gpt") || message.includes("open chatgpt") || message.startsWith("search") || message.startsWith("ask")){

    let query = message
        .toLowerCase()
        .replace("hey","")
        .replace("sarthi","")
        .replace("open chat gpt","")
        .replace("open chatgpt","")
        .replace("search","")
        .replace("ask","")
        .trim()

    // If no query, just open ChatGPT
    if(query.length === 0){
        speak("opening chat gpt")

        setTimeout(()=>{
            window.open("https://chatgpt.com/","_blank")
        },800)

    }else{
        speak("searching " + query)

        let q = encodeURIComponent(query)

        // Open ChatGPT with query (fallback: normal open + user pastes)
        let url = `https://chatgpt.com/?q=${q}`

        setTimeout(()=>{
            window.open(url,"_blank")
        },800)
    }
}



    else if(message.includes("open instagram")){
        speak("opening instagram")
        setTimeout(()=>openApp("instagram://app","https://instagram.com"),800)
    }

    else if(message.includes("open facebook")){
        speak("opening facebook")
        setTimeout(()=>openApp("fb://facewebmodal/f?href=https://facebook.com","https://facebook.com"),800)
    }

    else if(message.includes("time")){
        speak(new Date().toLocaleTimeString())
    }

    else if(message.includes("date")){
        speak(new Date().toLocaleDateString())
    }

    else{
        speak("searching on google")
        setTimeout(()=>{
            window.open(`https://google.com/search?q=${message}`)
        },800)
    }
}
