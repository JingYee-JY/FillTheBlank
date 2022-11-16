const start = document.querySelector(".start");
const startButton = document.querySelector(".startButton");
const game = document.querySelector(".game");
const number = document.querySelector(".number");
const question = document.querySelector(".question");
const showAnswer = document.querySelector(".answer");
const right = document.querySelector(".right");
const image = document.querySelector(".image");
const popUp = document.querySelector(".popUp");
const final = document.querySelector(".final");
const againButton = document.querySelector(".againButton");
const homeButton = document.querySelector(".homeButton");

const clickSound = document.getElementById("click")
const clap = document.getElementById("clap")
const correct = document.getElementById("correct")
const wrong = document.getElementById("wrong")

let current;
let total;
let tempoArray;
let answer;
let wrongAnswer;

const words = [
    {answer:"REST",word1:"R", word2:"E",word3:"S", word4:"T"},
    {answer:"PLAY",word1:"P", word2:"L",word3:"A", word4:"Y"},
    {answer:"FOOD",word1:"F", word2:"O",word3:"O", word4:"D"},
    {answer:"HAIR",word1:"H", word2:"A",word3:"I", word4:"R"},
    {answer:"BOOK",word1:"B", word2:"O",word3:"O", word4:"K"},
    {answer:"CARD",word1:"C", word2:"A",word3:"R", word4:"D"},
    {answer:"FOUR",word1:"F", word2:"O",word3:"U", word4:"R"},
    {answer:"TREE",word1:"T", word2:"R",word3:"E", word4:"E"},
    {answer:"RAIN",word1:"R", word2:"A",word3:"I", word4:"N"},
    {answer:"TAXI",word1:"T", word2:"A",word3:"X", word4:"I"}
]

const letters =["A", "B", "C","D", "E", "F", "G", "H", "I", "J", "K", "L","M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

startButton.addEventListener("click", () => {
    playClickSound()
    let delay = setTimeout(() => {
        start.classList.add("hide")
        game.classList.remove("hide")
        current = 0;
        total = 5;

        tempoArray = []
        for(let i = 0; i < words.length; i++){
            tempoArray.push(words[i])
        }
        Question()
    }, 200);
})

function Question(){
    current += 1;

    if(current > total){
        clap.currentTime = 0
        clap.play()
        game.classList.add("hide")
        final.classList.remove("hide")
        return
    }

    number.innerHTML = `${current} / ${total}`

    let randomQuestion = Math.floor(Math.random() * tempoArray.length)

    let missingWord = Math.floor(Math.random() * 4)

    wrongAnswer = ""
    question.innerHTML = ""
    for(let i=0; i< 4; i++){
        let name = "word" + (i + 1);
        if(i == missingWord){
            tempoArray[randomQuestion][name] = "?";
        }
        question.innerHTML += `<p>${tempoArray[randomQuestion][name]}</p>`

        if(i == missingWord){
            let randomLetter = Math.floor(Math.random() * letters.length)
            tempoArray[randomQuestion][name] = letters[randomLetter];
        }
        console.log(wrongAnswer)
        wrongAnswer += tempoArray[randomQuestion][name]
    }

    let index = ["1","2"]

    for(let u = 1; u < 3;u++){
        let btnClass = "btn" + u
        let btn = document.querySelector(`.${btnClass}`)

        let randomNumber = Math.floor((Math.random() * index.length))
        let randomChoice = index[randomNumber] > 1 ? "answer" : "wrongAnswer"

        let variable;

        if(randomChoice == "answer"){
            variable = answer = tempoArray[randomQuestion].answer
            console.log("!")
        }
        if(randomChoice == "wrongAnswer"){
            variable = wrongAnswer
            console.log("@")
        }

        btn.innerHTML = `<p>${variable}</p>`
        btn.setAttribute("data", variable)
        index.splice(randomNumber, 1)
    }
    tempoArray.splice(randomQuestion, 1)
}

for(let b = 1; b < 3; b++){
    let btnClass = "btn" + b
    let btn = document.querySelector(`.${btnClass}`)

    btn.addEventListener("click", ()=>{
        console.log(answer)
        let data = btn.getAttribute("data")
        console.log(data)
        if(data == answer){
            correct.currentTime = 0
            correct.play()
            console.log("correct")
            right.classList.remove("hide")
            showAnswer.innerHTML = answer;
            image.src = "./img/" + answer + ".png"
            let delay = setTimeout(()=>{
                right.classList.add("hide")
                Question()
            },2500)
        }
        if(data != answer){
            wrong.currentTime = 0
            wrong.play()
            popUp.classList.remove("hide")
            let delay = setTimeout(()=>{
                popUp.classList.add("hide")
            },1500)
        }
    })
}

againButton.addEventListener("click", () =>{
    playClickSound()
    let daley = setTimeout(() =>{
        final.classList.add("hide")
        start.classList.remove("hide")
    }, 200)
})

homeButton.addEventListener("click", ()=>{
    playClickSound()
    let daley = setTimeout(() =>{
        location.assign('https://gimme.sg/activations/dementia/');
    }, 200)
})

function playClickSound(){
    console.log(clickSound)
    clickSound.currentTime = 0
    clickSound.play()
}

/*prevent double tag zoom*/
document.addEventListener('dblclick', function(event) {
    event.preventDefault();
    }, { passive: false });