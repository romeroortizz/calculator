const show = document.querySelector('.display-info')
const clear = document.querySelector('.clear')
let defaultZero = document.querySelector('.zero')
let maxNumLength = 15;
const nums = document.querySelectorAll('.num')
const mathOperators = document.querySelectorAll('.operator')
const equal = document.querySelector('.equal')
const period = document.querySelector('.dot')
const backspace = document.querySelector('.backspace')
const negation = document.querySelector(".negation")
let delCount = 0
// three variables involved in the calculation
let firstNumber = ""
let operator = ""
let secondNumber = ""
//functions invovled add, sub, div, mult
const add = (num1, num2) => { return num1 + num2}
const sub = (num1, num2) => { return num1 - num2 } 
const div = (num1,num2) => {return num1 / num2} 
const mult = (num1,num2) => {return num1 * num2} 

let arrOfOperators = ['+', '-', '*', '/']
let arr = []
function checkForOperators() {
    return arrOfOperators.some((arrOfOperator) => arr.includes(arrOfOperator))
 }

function clearAll() {
    show.textContent = '' 
    defaultZero.textContent = '0'
    firstNumber = ''
    secondNumber = ''
    arr = []
}
clearAll()
function outputNums(num) {
    if (show.textContent.length <= maxNumLength) {
        defaultZero.textContent = ''
              
        if (arr.length >= 1 && checkForOperators()) {
            console.log("includes first number and operator")
            secondNumber += num.textContent
            show.textContent = secondNumber
            arr.splice(2,1)
            arr.push(secondNumber)
            console.log(arr)            
        }  else{
          
            console.log(num.textContent)
            firstNumber += num.textContent
            show.textContent = firstNumber
            arr.splice(0, 1)
            arr.push(firstNumber)
            console.log(arr)     
        }   
    } 
}

function display() {
    nums.forEach((num) => {
        num.addEventListener('click', () => {       
           outputNums(num)
        } )
    })
}
display()
function testOperator(mOperator) {
    if (firstNumber === "") {
        return
    }
    if (firstNumber !== "" && checkForOperators() && secondNumber !== "") {
        solve();
    }

    if (!checkForOperators()) {
        operator = mOperator.textContent;
        arr[1] = operator;
    }
}
function chooseMathOperator() {
    mathOperators.forEach((mOperator) => {
        mOperator.addEventListener('click', () => {
            testOperator(mOperator)
        })
    })
}
chooseMathOperator()

function solve() {
    if (arr.length === 3 && firstNumber !== "" && secondNumber !== "") {
        let result;
        switch (arr[1]) {
            case "+":
                result = add(parseFloat(arr[0]), parseFloat(arr[2]));
                break;
            case "-":
                result = sub(parseFloat(arr[0]), parseFloat(arr[2]));
                break;
            case "*":
                result = mult(parseFloat(arr[0]), parseFloat(arr[2]));
                break;
            case "/":
                result = div(parseFloat(arr[0]), parseFloat(arr[2]));
                break;
            default:
                console.log("Invalid operation");
                return;
        }
        firstNumber = result.toString();
        secondNumber = "";
        arr.splice(0, arr.length, firstNumber);
        
        console.log(show.textContent = result)
    } else {
        console.log("Please add a calculation");
    }
}
solve()
/*fix insert period*/
function insertPeriod() {

    if (arr[arr.length-1] % 1 == 0 && arr[arr.length-1] === firstNumber && !arr[arr.length-1].includes('.') ) {
        firstNumber+= period.textContent
        arr[arr.length-1] += period.textContent
        console.log(arr)
        console.log(firstNumber)
        console.log('inserting period at num 1')
    
    } 
    if (arr[arr.length - 1] % 1 == 0 && arr[arr.length - 1] === secondNumber && !arr[arr.length - 1].includes('.')) {
        secondNumber+= period.textContent
        arr[arr.length-1] += period.textContent
        console.log(arr)
        console.log(firstNumber)
        console.log('inserting period at num 1')
    }
   
}
function keypad(e) {
    if (e.key >= 0 && e.key <= 9) {
        let num = {textContent: e.key}
       outputNums(num)
    }
    if (e.key === "Enter") {
        e.preventDefault()
        solve()
    }
    if (e.key === ".") {
        console.log("keyboard dot")
        insertPeriod() 
    }
    if (e.key === "Backspace") {
        del()
    }
    switch (e.key) {
        case "+":
            testOperator({textContent:e.key})
            break;
        case "-":
            testOperator({textContent:e.key})
            break;
        case "/":
            testOperator({textContent:e.key})
            break;
        case "*":
            testOperator({textContent:e.key})
            break;
    }
  
}
function del() {
    if (arr.length === 1) {
   
        show.textContent = show.textContent.slice(0, -1)
        firstNumber = firstNumber.slice(0, -1)
        arr[0] = arr[0].slice(0,-1) 
       
    } else if (arr.length === 3) {
        show.textContent = show.textContent.slice(0, -1)
        secondNumber = secondNumber.slice(0, -1)
        arr[2] = arr[2].slice(0,-1)
    }
    
}

function toNeg() {
    const currentNum = arr.length-1

    if (Number(arr[0]) && !arr[0].includes('-')) {
        firstNumber = "-" + firstNumber
        arr[currentNum] = firstNumber
        show.textContent = firstNumber
    
    }
    if (Number(arr[2]) && !arr[2].includes('-')) {
        secondNumber = "-" + secondNumber
        arr[currentNum] = secondNumber
        show.textContent = secondNumber
   }

}
clear.addEventListener('click',clearAll)
equal.addEventListener('click', solve)
period.addEventListener('click', insertPeriod)
backspace.addEventListener('click', del)
negation.addEventListener('click',toNeg)
/* use keyboard to control calculator*/
document.addEventListener('keydown', keypad)
