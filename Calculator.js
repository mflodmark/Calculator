var resultTxt = "result";
var actionTxt = "action";
var firstNumberTxt = "firstNumber";
var secondNumberTxt = "secondNumber";

var oneBtn = "oneBtn";
var twoBtn = "twoBtn";
var threeBtn = "threeBtn";
var fourBtn = "fourBtn";
var fiveBtn = "fiveBtn";
var sixBtn = "sixBtn";
var sevenBtn = "sevenBtn";
var eightBtn = "eightBtn";
var nineBtn = "nineBtn";
var zeroBtn = "zeroBtn";

var plusBtn = "plusBtn";
var minusBtn = "minusBtn";
var multiplyBtn = "multiplyBtn";
var divideBtn = "divideBtn";
var clearBtn = "clearBtn";
var plusMinusBtn = "plusMinusBtn";
var equalBtn = "equalBtn";
var resultBtn = "resultBtn";

var buttons = [oneBtn, twoBtn, threeBtn, fourBtn, fiveBtn, 
    sixBtn, sevenBtn, eightBtn, nineBtn, zeroBtn,
    plusBtn, minusBtn, multiplyBtn, plusMinusBtn, divideBtn, 
    equalBtn, resultBtn, clearBtn];

var numberButtons = [oneBtn, twoBtn, threeBtn, fourBtn, fiveBtn, 
    sixBtn, sevenBtn, eightBtn, nineBtn, zeroBtn];

var actionButtons = [plusBtn, minusBtn, multiplyBtn, divideBtn];

function Calculator() {
    this.firstNumber = "?";
    this.secondNumber = "?";
    this.action = "?";
    this.actionPressed = false;
    this.result = "0";
}

var calc = new Calculator(); 

function UpdateResult() {
    if(calc.action == "+") {
        calc.result = Number(calc.firstNumber) + Number(calc.secondNumber);
    } else if (calc.action == "-") {
        calc.result = Number(calc.firstNumber) - Number(calc.secondNumber);        
    } else if (calc.action == "*") {
        calc.result = Number(calc.firstNumber) * Number(calc.secondNumber);        
    } else if (calc.action == "/") {
        calc.result = Number(calc.firstNumber) / Number(calc.secondNumber);        
    }
    
    document.getElementById(resultTxt).innerHTML = calc.result;
}

function UpdateFirstNumber(res) {
    document.getElementById(firstNumberTxt).innerHTML = res;
}

function UpdateSecondNumber(res) {
    document.getElementById(secondNumberTxt).innerHTML = res;
}

function UpdateAction(res) {
    document.getElementById(actionTxt).innerHTML = res;
}

buttons.forEach(button => {
    $(function(){
        $("#" + button).hover(function(){
            $(this).addClass('ui-state-hover');
        }, function(){
            $(this).removeClass('ui-state-hover');
        });
    });
});

numberButtons.forEach(button => {
    $(function(){
        $("#" + button).click(function(){
            if (calc.actionPressed == false) {
                var innerFirst = document.getElementById(firstNumberTxt).innerHTML;

                if (innerFirst == "?") {
                    calc.firstNumber = document.getElementById(button).innerHTML
                    UpdateFirstNumber(calc.firstNumber);
                } else {
                    calc.firstNumber += document.getElementById(button).innerHTML
                    UpdateFirstNumber(calc.firstNumber);
                }

                ShowActionButtons();
                document.getElementById("equalBtn").disabled = true;                               
                
            } else {
                var innerSecond = document.getElementById(secondNumberTxt).innerHTML;
                
                if (innerSecond == "?") {
                    calc.secondNumber = document.getElementById(button).innerHTML
                    UpdateSecondNumber(calc.secondNumber);
                } else {
                    calc.secondNumber += document.getElementById(button).innerHTML
                    UpdateSecondNumber(calc.secondNumber);
                }

                HideActionButtons();
                document.getElementById("equalBtn").disabled = false;           
            }
        });
    });
});

actionButtons.forEach(button => {
    $(function(){
        $("#" + button).click(function() {
            calc.action = document.getElementById(button).innerHTML
            UpdateAction(calc.action);
            calc.actionPressed = true;            
        });
    });
});

function HideActionButtons() {
    actionButtons.forEach(button => {
        $(function(){
            document.getElementById(button).disabled = true;
        });
    });

    document.getElementById("plusMinusBtn").disabled = true;    
}

function ShowActionButtons() {
    actionButtons.forEach(button => {
        $(function(){
            document.getElementById(button).disabled = false;
        });
    });

    document.getElementById("plusMinusBtn").disabled = false;    
}

actionButtons.forEach(button => {
    $(function(){
        document.getElementById(button).disabled = true;
    });
});

document.getElementById("plusMinusBtn").disabled = true;
document.getElementById("equalBtn").disabled = true;                               

$("#equalBtn").click(function() {
    UpdateResult();    
    
    if (calc.firstNumber !== "?") {
        AddCalculations();
    }

    calc.firstNumber = "?";
    calc.secondNumber = "?";    
    calc.action = "?";

    UpdateAction(calc.action);
    UpdateFirstNumber(calc.firstNumber);
    UpdateSecondNumber(calc.secondNumber); 

    calc.actionPressed = false;
    
    HideActionButtons();    
}); 

$("#resultBtn").click(function() {
    calc.firstNumber = calc.result
    UpdateFirstNumber(calc.firstNumber); 

    ShowActionButtons();
}); 

$("#plusMinusBtn").click(function() {
    if (calc.actionPressed == false) {
        calc.firstNumber = -calc.firstNumber;
        UpdateFirstNumber(calc.firstNumber);
    } else {
        calc.secondNumber = -calc.secondNumber;
        UpdateSecondNumber(calc.secondNumber);
    }
}); 

$("#clearBtn").click(function() {

    UpdateResult();

    calc.result = "?";   
    calc.firstNumber = "?";
    calc.secondNumber = "?";    
    calc.action = "?";

    UpdateAction(calc.action);
    UpdateFirstNumber(calc.firstNumber);
    UpdateSecondNumber(calc.secondNumber);

    calc.actionPressed = false; 
    
    HideActionButtons();    
}); 

var pixel = 450;

function AddCalculations()
{
    //Skapar element och sätter texten från textboxen
    var newElement = document.createElement("dd");
    var text = calc.firstNumber + " " + calc.action + " " + 
        calc.secondNumber + " = " + calc.result;
    var textNode = document.createTextNode(text);

    newElement.appendChild(textNode);

    //KOpplar det nya elementet till listan
    document.getElementById("calculations").appendChild(newElement);

    pixel += 20;

    document.getElementById("my-container").style.height = pixel + "px";
}



