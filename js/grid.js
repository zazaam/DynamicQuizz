
window.onload = print;

function print(){
    var can = document.createElement("canvas");
    document.body.appendChild(can);

    can.setAttribute('width','400');
    can.setAttribute('height','400');

    const number = can.getAttribute('width');


    var context = can.getContext('2d');
    can.lineWidth = 1;


    context.clearRect(0,0,number,number);
    context.strokeStyle = "black";


    context.beginPath();
    var x = 0, y = 0;

    for(var i = 0; i <= Math.round(number/20); i++)
    {
        x = i*20;
        context.moveTo(x,y);
        context.lineTo(x, number);
    }

    x = 0;

    for(var i = 0; i <= Math.round(number/20); i++)
    {
        y = i*20;
        context.moveTo(x,y);
        context.lineTo(number, y);
    }

    context.stroke();

}