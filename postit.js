num = 0;

base_postit_id_name = "postit_";
base_button_id_name = "botton_";

/* SOURCE https://gist.github.com/renancouto/4675192 */
/**
 * @return {string}
 */
function LightenColor(color, percent) {
    let num = parseInt(color.replace("#",""),16),
        amt = Math.round(2.55 * percent),
        R = (num >> 16) + amt,
        B = (num >> 8 & 0x00FF) + amt,
        G = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (B<255?B<1?0:B:255)*0x100 + (G<255?G<1?0:G:255)).toString(16).slice(1);
}

/* SOURCE https://www.w3schools.com/howto/howto_js_draggable.asp */
function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function delete_post(button_id) {
    let id = parseInt(button_id.substring(7));
    let element = document.getElementById(base_postit_id_name+id);
    element.parentNode.removeChild(element);
}

function generatePostIt(text, color) {
    let div = document.createElement("div");
    div.setAttribute("class","post_it");
    div.setAttribute("style","background-color:"+color);
    div.setAttribute("id",base_postit_id_name+num);

    let divheader = document.createElement("div");
    divheader.setAttribute("class","post_it_header");
    divheader.setAttribute("id",base_postit_id_name+num+"header");
    divheader.setAttribute("style","background-color:"+LightenColor(color,-12));
    div.appendChild(divheader);

    let button = document.createElement("button");
    button.innerHTML="X";
    button.setAttribute("class","delete");
    button.setAttribute("id",base_button_id_name+num);
    button.setAttribute("onclick","delete_post(this.id)");
    divheader.appendChild(button);

    let content = document.createTextNode(text);
    div.appendChild(content);

    dragElement(div);

    return div;
}

function generate() {
    document.getElementById("container")
        .appendChild(
            generatePostIt(
                document.getElementById("in_text").value,
                document.getElementById("in_color").value
            )
        );
    num++;
}