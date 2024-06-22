var showHistory = false;
const history = new Array();

// Load the default content
document.addEventListener('DOMContentLoaded', () => {
    loadContent('standard.html');
});

//update the expression
function appendCharacter(val){
    document.getElementById('expression').value += val;
}

function clearDisplay(){
    document.getElementById('expression').value = '';
}

function deleteLast(){
    let expression = document.getElementById('expression').value;
    document.getElementById('expression').value = expression.slice(0, -1);
}

function calculatePercentage(){
    let expression = document.getElementById('expression').value;
    document.getElementById('expression').value = expression / 100;
}

document.getElementById('dropDownMenu').addEventListener('change', function() {
    if(document.getElementById('dropDownMenu').value == "advance"){
        loadContent('advance.html');
    }else if(document.getElementById('dropDownMenu').value == "standard"){
        loadContent('standard.html');
    };
});
//load the content of the page
function loadContent(url) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            // Assuming each of these pages only has one main div with content.
            const newContent = doc.querySelector('#cal').innerHTML;
            document.getElementById('default').innerHTML = newContent;

        })
        .catch(err => console.error('Failed to load the page:',err));
}

//evaluate the expression
function Evaluate() {
    let expression = document.getElementById("expression").value;

    if(expression == ''){
        alert("Please enter an expression to evaluate");
    }else{
        try{
            const result = eval(expression);
            document.getElementById("expression").value = result;
            if(expression != result){
                updateHistory(expression + '=' + result);  
            }
        }catch(e){
            alert('\tname: ' + e.name + ' message: ' + e.message + ' at: ' + e.at + ' text: ' + e.text);
        } 
    }  
}

function updateHistory(element){
    if(element == history[history.length - 1]){
        return;
    } else{
        history.push(element);
        var content = '';
        history.forEach((element, index) => {
            content += `<li key="${index}" onClick="${() => this.fetchHistory(index)}">${element}</li>`;
        });
        document.getElementById('history-list').innerHTML = content;
    }
    
}

function toggleHistory(){
    showHistory = !showHistory;
    if(showHistory)
        document.getElementById('history').style.display = 'block';
    else
        document.getElementById('history').style.display = 'none';
}

function fetchHistory(index){
    document.getElementById('expression').value = history[index].split('=')[0];
    console.log("It works, Index = "+index);
}

