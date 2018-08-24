var image = document.querySelectorAll(".image");
var overlay = document.querySelector("#overlay");
var oneZone = document.querySelector("#onezone");
var twoZone = document.querySelector("#twozone");
var threeZone = document.querySelector("#threezone");
var fourZone = document.querySelector("#fourzone");
var fiveZone = document.querySelector("#fivezone");
var sixZone = document.querySelector("#sixzone");
var input = document.querySelector("#inputsearch");

/* global choices */

var choices = [];

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                choices = Array(allText);
                choices = JSON.parse(choices);
            }
        }
    }
    rawFile.send(null);
}

readTextFile("/gamesList.txt");

console.log(choices);

var autoComplete = new autoComplete({
    selector: input,
    minChars: 1,
    source: function(term, suggest){
        term = term.toLowerCase();
        var matches = [];
        var i = 0;
        for (i=0; i<choices.length; i++) {
            console.log(choices[i]);
            console.log(choices[i].toLowerCase());
            if (~choices[i].toLowerCase().indexOf(term)) matches.push(choices[i]);
        }
        suggest(matches);
    }
});

image[0].addEventListener("mouseenter", function() {
    oneZone.classList.toggle("overlayeffect");
});

oneZone.addEventListener("mouseleave", function() {
    oneZone.classList.toggle("overlayeffect");
});

image[1].addEventListener("mouseenter", function() {
    twoZone.classList.toggle("overlayeffect");
});

twoZone.addEventListener("mouseleave", function() {
    twoZone.classList.toggle("overlayeffect");
});

image[2].addEventListener("mouseenter", function() {
    threeZone.classList.toggle("overlayeffect");
});

threeZone.addEventListener("mouseleave", function() {
    threeZone.classList.toggle("overlayeffect");
});

image[3].addEventListener("mouseenter", function() {
    fourZone.classList.toggle("overlayeffect");
});

fourZone.addEventListener("mouseleave", function() {
    fourZone.classList.toggle("overlayeffect");
});

image[4].addEventListener("mouseenter", function() {
    fiveZone.classList.toggle("overlayeffect");
});

fiveZone.addEventListener("mouseleave", function() {
    fiveZone.classList.toggle("overlayeffect");
});

image[5].addEventListener("mouseenter", function() {
    sixZone.classList.toggle("overlayeffect");
});

sixZone.addEventListener("mouseleave", function() {
    sixZone.classList.toggle("overlayeffect");
});