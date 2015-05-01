

window.onload = loadPage;

var allQuestions = [
    {question: "Who is Prime Minister of the United Kingdom?", choices: ["David Cameron", "Gordon Brown", "Winston Churchill", "Tony Blair"], correctAnswer:0},
    {question: "Who is Prime Minister of the United Kingdom?", choices: ["David Cameron", "Gordon Brown", "Winston Churchill", "Tony Blair"], correctAnswer:0}
];
var score = 0;
var currentQ = 0;

function createElements(name, num) {

    var array = [];
    for(var i = 0; i < num; i++)
    {
        array.push(document.createElement(name));
    }
    return array;
}
function loadPage() {
    var ul = document.createElement('ul');

    var question = document.createTextNode(allQuestions[currentQ].question);
    var questBank = createElements('li', allQuestions[currentQ].choices.length);

    for(var i = 0; i < questBank.length; i++)
    {
        var inp = document.createElement('input');
        inp.type = 'radio';
        inp.name = 'choice';
        inp.id = 'q'+i;

        var l = document.createElement('label');
        l.appendChild(document.createTextNode(allQuestions[currentQ].choices[i]));
        l.appendChild(inp);
        questBank[i].appendChild(l);
        ul.appendChild(questBank[i]);
    }

    var submitB = document.createElement('button');
    submitB.appendChild(document.createTextNode("Submit"));

    ul.appendChild(submitB);

    document.body.appendChild(question);
    document.body.appendChild(ul);

    submitB.addEventListener('click', validate);

}

function validate()
{
    var f = document.getElementsByName('choice');

    for(var i = 0; i < f.length; i++)
    {
        if(f[i].checked == true)
        {
            if(f[i].id.charAt(1) == allQuestions[currentQ].correctAnswer)
            {
               f[i].parentNode.style.color = 'green'

            }
            else
            {
                f[i].parentNode.style.color = 'red';
            }
        }
        else
        {
            f[i].parentNode.style.color = 'black';
        }
    }


}