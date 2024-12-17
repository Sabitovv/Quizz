let questions = [
    {
    numb: 1,
    question: "What sport is considered the most popular in the world?",
    answer: ["Football"],
    options: [
        "Football",
        "Tennis",
        "Golf",
        "Basketball"
    ]
    },
    {
    numb: 2,
    question: "Which team won the last World Hockey Championship?",
    answer: ["Canada","Russia"],
    options: [
        "Russia",
        "Canada",
        "USA",
        "Finland"
    ]
    },
    {
    numb: 3,
    question: "What year is officially recognized as the beginning of the modern Olympic Games?",
    answer: ["1896"],
    options: [
        "1886",
        "1896",
        "1906",
        "1916"
    ]
    },
    {
    numb: 4,
    question: "What material is used for weights in most bicycle races?",
    answer: ["Lead"],
    options: [
        "Lead",
        "Glass",
        "Aluminum",
        "Concrete"
    ]
    },
    {
    numb: 5,
    question: "What distance do marathon participants run?",
    answer: ["42,195 kilometres"],
    options: [
        "10 kilometres",
        "21 kilometres",
        "42,195 kilometres",
        "100 kilometres"
    ]
    }
]

let all=document.querySelector(".questions")

let container= document.querySelector(".cintainer")
let question= document.querySelector(".question")
let ans= document.querySelector(".answers")
let btnNext= document.querySelector(".btn_next")
let btnSee=document.querySelector(".see_res")
let res= document.querySelector(".res")
let res_h=document.querySelector(".title")
let checkbox=null

let current_ans=[]
let currentquestionIndex=0
let score=0
function startQuiz(){
    currentquestionIndex=0
    score=0
    showQuestions()
}
function showQuestions(){
    deletepast()
    let currentquestion= questions[currentquestionIndex]
    question.innerHTML= currentquestion.question
    currentquestion.options.forEach(option => {
        const button= document.createElement("button")
        const input=document.createElement("input")
        input.setAttribute("type", "checkbox");
        button.innerHTML= option
        button.classList.add("ans_text")
        input.classList.add("input_space")
        input.style.pointerEvents = "none";
        ans.appendChild(button)
        button.appendChild(input)
        button.addEventListener("click", (e) =>{ 
            toggleCheckbox(button)
            selectAns(currentquestion, e)
        })
    });
}

function deletepast(){
    btnNext.style.display="none"
    while(ans.firstChild){
        ans.removeChild(ans.firstChild)
    }
}

function selectAns(currentQuestion,e){
    const selectbtn= e.target
    if (currentQuestion.answer.length >= 2) {
        if (checkbox.checked) {
            current_ans.push(selectbtn.innerText);
        } else {
            const index = current_ans.indexOf(selectbtn.innerText);
            if (index !== -1) {
                current_ans.splice(index, 1);
            }
        }
        if (current_ans.length === currentQuestion.answer.length) {
            btnSee.style.display = "inline";
        }
        if(current_ans.length==2){
            Array.from(ans.children).forEach(button => button.disabled = true);
        }
        btnSee.addEventListener("click",(e)=>{
                if(current_ans[0]===currentQuestion.answer[0] || current_ans[0]===currentQuestion.answer[1] || current_ans[1]===currentQuestion.answer[1]){
                    score=score+0.5
                    selectbtn.classList.add("correct");
                }
                if((current_ans[0]===currentQuestion.answer[0] && current_ans[1]===currentQuestion.answer[1])|| (current_ans[1]===currentQuestion.answer[0] && current_ans[0]===currentQuestion.answer[1])){
                    score=score+0.5
                    selectbtn.classList.add("correct");
                }
                else{
                    selectbtn.classList.add("incorrect");
                }
                btnNext.style.display = "inline";
                btnSee.style.display = "none";
        })
    } else {
        if (selectbtn.innerText === currentQuestion.answer[0]) {
            selectbtn.classList.add("correct");
            score++;
        } else {
            selectbtn.classList.add("incorrect");
        }
        Array.from(ans.children).forEach(button => button.disabled = true);
        btnNext.style.display = "inline";
    }
}


function toggleCheckbox(button) {
    checkbox = button.querySelector('input[type="checkbox"]');
    checkbox.checked = !checkbox.checked;
}

function showres(){
    res.style.display= "flex";
    all.style.display="none"
    res.innerHTML=`<h1 class="title">Your result is ${score}/${questions.length+1}</h1>`
}

btnNext.addEventListener("click", () => {
    currentquestionIndex++;
    if (currentquestionIndex < questions.length) {
        showQuestions();
    } else {
        showres()
    }
});

startQuiz()

