const show = document.querySelector('.display-info')
const clear = document.querySelector('.clear')
let defaultZero = document.querySelector('.zero')
let maxNumLength = 15;
const nums = document.querySelectorAll('.num')
const mathOperators = document.querySelectorAll('.operator')
const equal = document.querySelector('.equal')
const period = document.querySelector('.dot')
// three variables involved in the calculation
let firstNumber = '';
let operator = '';
let secondNumber = '';
//functions invovled add, sub, div, mult
const add = (num1, num2) => { return num1 + num2 }
const sub = (num1, num2) => { return num1 - num2 } 
const div = (num1,num2) => {return num1 / num2} 
const mult = (num1,num2) => {return num1 * num2} 

let arrOfOperators = ['+', '-', '*', '/']
let arr = []
function checkForOperators() {
    return arrOfOperators.some((arrOfOperator) => arr.includes(arrOfOperator))
 }


function clearAll() {
    console.log('clear')
    show.textContent = ''
    defaultZero.textContent = '0'
    firstNumber = ''
    secondNumber = ''
    arr = []
    console.log(arr)
 


    
}
clearAll()

function display() {
    nums.forEach((num) => {
        num.addEventListener('click', () => {
           defaultZero.textContent = ''
            if (show.textContent.length <= maxNumLength) {

                //correct code fix stroage issue with displaying strings
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
        } )
    })
}
display()

function chooseMathOperator() {
    mathOperators.forEach((mOperator) => {
        mOperator.addEventListener('click', () => {
            if (firstNumber.length != '' || show.textContent != 0)
                if (checkForOperators() && secondNumber != '') {
                    
                    console.log('already an operator and a second number')
                    solve()
                    operator = mOperator.textContent
                    arr.push(operator)
                    console.log(arr)
                } else if( checkForOperators()) {
                   
                    console.log('already an operator but no second number')
                    
                } else if (arr.length == 1 || arr.length == 0) {
                    operator = mOperator.textContent
                    arr.push(operator)
                 
                    console.log(arr)
                }       
        })
    })
}
chooseMathOperator()

function solve() {
    if (arr.length === 3) {
        console.log('result')
        switch (arr[1]) {
            case "+":
                console.log('adding...') 
                firstNumber = add(parseFloat(arr[0]), parseFloat(arr[2]))
                show.textContent = firstNumber
                arr.splice(0, arr.length, firstNumber)
                secondNumber = ''
                console.log(arr)
                break;
            case "-":
                console.log('subing...')
                firstNumber = sub(parseFloat(arr[0]), parseFloat(arr[2]))
                show.textContent = firstNumber
                arr.splice(0, arr.length, firstNumber)
                secondNumber = ''
                
                console.log(arr)
                break;
            case "*":
                console.log('mult...')
                firstNumber = mult(parseFloat(arr[0]), parseFloat(arr[2]))
                show.textContent = firstNumber
                arr.splice(0, arr.length, firstNumber)
                secondNumber = ''
                
                console.log(arr)
                break;
            case "/":
                console.log('div...')
                firstNumber = div(parseFloat(arr[0]), parseFloat(arr[2]))
                show.textContent = firstNumber
                arr.splice(0, arr.length, firstNumber)
                secondNumber = ''
                
                console.log(arr)
                break;
        }
    } else {
        console.log('please add a calculation')
    }
    
}
solve()


function insertPeriod() {
    if(arr ==0)
        console.log('no need for period')
    else if (arr.length == 1) {
        firstNumber+= period.textContent
        arr[0] += period.textContent
        console.log(arr)
        console.log('inserting period')

    } else if (arr.length == 3) {
        secondNumber += period.textContent
        arr[2] += period.textContent
        console.log(arr)
        console.log('inserting period at second number')
    }
}


clear.addEventListener('click',clearAll)

equal.addEventListener('click', solve)

period.addEventListener('click',insertPeriod)