

window.onload = loadP;
var clickedMouse = false;
var startX = 0, endX = 24;
var startY = 0, endY = 12;


var worldSizeX = 30, worldSizeY = 15;
var childList = [], visited = [], neighbours = [];
var timeout;
var buttonText = 'start';

function loadP() {
    var xmlns = "http://www.w3.org/2000/svg";
    var xlink = 'http://www.w3.org/1999/xlink';

    var svg = document.getElementById('svgid');

    var svg2 = document.createElementNS(xmlns, 'svg');
    svg2.setAttribute('id', 'svgGrid');

    loadLayout(xmlns, svg2, parseInt(svg.getAttribute('height')), parseInt(svg.getAttribute('width')));

    var div = document.createElement('div');
    var button = document.createElement('button');

    button.id = 'buttonStart';
    button.addEventListener('click', breadthSearch);
    button.appendChild(document.createTextNode(buttonText));

    div.appendChild(button);
    document.body.appendChild(div);

    svg.appendChild(svg2);

}

function breadthSearch() {


    var b = document.getElementById('buttonStart');
    if (b.textContent == 'start') {
        b.textContent = 'stop';
    }
    else if (b.textContent == 'stop') {
        b.textContent = 'start'
    }

    var a = document.getElementById('svgGrid');
    var nodes = a.firstElementChild;

    for (var i = 0; i < a.childElementCount; i++) {
        childList.push(nodes);
        nodes = nodes.nextElementSibling;
        visited[i] = -1;
    }

    neighbours.push(0);

    var current = 0;
    var prev = -1;
    var found = false;

    function loop() {

        var c = neighbours.shift();
        prev = current;
        current = c;

        if (current != 0) {
            childList[c].classList.remove('neighbour');
            childList[c].classList.add('visited');
        }

        //visited[current] = prev;

        var neighb = getNeighbours(current);

        for (var j = 0; j < neighb.length; j++) {

            var next = neighb[j];

            if (next < 0 || next >= worldSizeX * worldSizeY) {

            }
            else if (visited[next] == -1) {
                var result = false;

                switch (j) {
                    case 0:
                        if (checkCollision(next, current, -1, 0) == 1)
                            result = true;
                        break;
                    case 1:
                        if (checkCollision(next, current, -1, -1) == 1)
                            result = true;
                        break;
                    case 2:
                        if (checkCollision(next, current, -worldSizeY, 2) == 1)
                            result = true;
                        break;
                    case 3:
                        if (checkCollision(next, current, -worldSizeY, -1) == 1)
                            result = true;
                        break;
                    default :
                        break;
                }
                if (result) {
                    //quick exit
                    found = true;

                    function path()
                    {
                        var x = visited[current];

                        while(x != -1)
                        {
                            childList[x].classList.add('path');
                            x = visited[x];
                        }
                    }
                    path();
                    break;
                }
            }
        }

        if (found) {

        }
        else if (neighbours.length != 0)
            timeout = setTimeout(function () {
                if (b.textContent == 'stop')
                    loop();
            }, 5);

    }

    loop();

}

function checkCollision(next, current, dir, num) {
    var valueOfPosition = childList[next];

    if (!valueOfPosition.classList.contains('open'))
        return 0;

    else if (num == -1) {
        visited[next] = current;
        neighbours.push(next);
        childList[next].classList.add('neighbour');
    }
    else {
        //UP
        if (num == 0) {
            visited[next] = current;
            neighbours.push(next);
        }
        else {
            visited[next] = current;
            neighbours.push(next);
        }

    }
    childList[next].classList.add('neighbour');
    /*
     check for goal node here and return 0 if found
     */
    if (next == (endX-1)*worldSizeY + endY) {
        return 1;
    }

    return 0;

}

function getNeighbours(current) {
    var neighbours = [-1, -1, -1, -1];

    //LEFT
    if (current >= worldSizeY)
        neighbours[2] = current - worldSizeY;
    //RIGHT
    if (Math.floor(current / worldSizeY) != worldSizeX - 1)
        neighbours[3] = current + worldSizeY;
    //UP
    if (Math.floor(current) % worldSizeY != 0)
        neighbours[0] = current - 1;
    //DOWN
    if (Math.floor(current - worldSizeY - 1) % (worldSizeY - 1) != 0)
        neighbours[1] = current + 1;


    return neighbours;
}

function loadLayout(xmlns, svg2, h, w) {
    var xOff = Math.round(w / 20);
    var yOff = Math.round(h / 20);
    for (var i = 0; i < xOff; i++) {
        for (var j = 0; j < yOff; j++) {

            var rect = document.createElementNS(xmlns, 'rect');
            rect.setAttribute('x', i * 20 + "");
            rect.setAttribute('y', j * 20 + "");
            rect.setAttribute('height', "20");
            rect.setAttribute('width', "20");
            rect.setAttribute('id', "" + i + j * xOff);

            rect.setAttribute('onmouseover', "over(event)");
            rect.setAttribute('onmouseout', "out(event)");
            rect.setAttribute('onmousedown', "clicked(event)");
            rect.setAttribute('onmouseup', "released(event)");

            if (startX == i && startY == j) {
                rect.setAttribute('class', 'start');
            }
            else if (endX == i && endY == j) {
                rect.setAttribute('class', 'end');
            }
            else {
                rect.setAttribute('class', 'open');
            }


            svg2.appendChild(rect);
        }
    }
}

function over(event) {
    if (clickedMouse) {
        if (event.target.classList.contains('open')) {
            event.target.classList.toggle('open');
        }
        else {
            event.target.classList.toggle('open');
        }

    }
    else {
        event.target.setAttributeNS(null, 'opacity', '0.25');
    }

}

function out(event) {
    event.target.setAttributeNS(null, 'opacity', '1');
}

function clicked(event) {
    clickedMouse = true;

    if (event.target.classList.contains('open')) {
        event.target.classList.toggle('open');
    }
    else {
        event.target.classList.toggle('open');
    }

}

function released(event) {
    clickedMouse = false;

}


