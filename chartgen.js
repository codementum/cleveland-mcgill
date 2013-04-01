var data = [40, 20, 10, 5 , 24];
//var data = [50, 25, 15, 5 , 5];

var onlyAB = true;
var onlyAdjacent = true; 

var labels;
var Apos = -1, Bpos = -1;
if(onlyAB && !onlyAdjacent){
    // choose label positions
    while(Apos == Bpos || Apos > Bpos){ // choose until not equal
        Apos = Math.floor(Math.random()*5)
        Bpos = Math.floor(Math.random()*5)
    }

    // set label string accoringly
    labels = ['', '', '', '', ''];
    labels[Apos] = 'A';
    labels[Bpos] = 'B';
    console.log(Apos);
    console.log(Bpos);
    console.log(labels);

} else if (onlyAB && onlyAdjacent){
    // choose label positions
    while(Math.abs(Apos - Bpos) != 1){ // choose until not equal
        Apos = Math.floor(Math.random()*5)
        Bpos = Math.floor(Math.random()*5)
        //if(Apos == 0){
        //    Bpos = 1;
        //} else if(Apos == 4){
        //    Bpos = 3;
        //} else {
        //}
    }

    // set label string accoringly
    labels = ['', '', '', '', ''];
    labels[Apos] = 'A';
    labels[Bpos] = 'B';
    console.log(Apos);
    console.log(Bpos);
    console.log(labels);
}else {
    labels = ['A', 'B', 'C', 'D', 'E'];
}

var w = 380;
var h = 380;

var sum = data[0] + data[1] + data[2] + data[3] + data[4];
while(sum != 100){
    data = randomizeData();
    sum = data[0] + data[1] + data[2] + data[3] + data[4];
}

// make nonAdjacent arrays based on original data
// shuffle data and Apos + Bpos
var nonAdjData = data.slice();
var nonAdjLabels = labels.slice();
var swapTo = Apos;
while( Math.abs(swapTo - Bpos) <= 1){
    swapTo = Math.floor(Math.random()*5);
}
//swap label
nonAdjLabels[Apos] = '';
nonAdjLabels[swapTo] = 'A';

//swap data
var tmp = nonAdjData[Apos];
nonAdjData[Apos] = nonAdjData[swapTo];
nonAdjData[swapTo] = tmp;



// add titles and svgs to doc
document.write('<h1> T1: Bar Chart (adjacent comparison) </h1>');
makeBar();
document.write('<br />');

document.write('<h1> T2: Stacked Bar (bottom comparison) </h1>');
makeStackedBar();
document.write('<br />');

document.write('<h1> T3: Bar Chart (non-adjacent comparison) </h1>');
makeNonAdjacentBar();
document.write('<br />');

document.write('<h1> T6: Pie Chart (ordered/non-rotated) (T6) </h1>');
makePie();
document.write('<br />');

document.write('<h1> T7: Bubble Chart </h1>');
makeBubble();
document.write('<br />');

document.write('<h1> T9: Treemap </h1>');
makeTree();
document.write('<br />');

document.write('<h1> TX: Sideways Bar (adjacent comparison) </h1>');
makeSidewaysBar();
document.write('<br />');

document.write('<h1> TY: Pie Chart (unordered/rotated) </h1>');
makeRandomPie();
document.write('<br />');


/* randomize data according to Cleveland84
 * specifically:
 *  - 5 numbers
 *  - add to 100
 *  - none less than 3
 *  - none greater than 39
 *  - differences greater than .1
 */
function randomizeData(){ // TODO finish
    var max = 36;
    var min = 3;
    var diff = 0.1;

    var d = [];

    while(d.length < 5){
        var randomnumber=Math.ceil(Math.random()*36 + 3);
        var found=false;
        for(var i=0;i<d.length;i++){
            if(!ensureDifference(d, randomnumber)){
                found=true;
                break;
            }
        }
        if(!found)
            d[d.length]=randomnumber;
    }
    //d[0] = 15; d[1] = 37; d[2] = 24; d[3] = 18; d[4] = 6;

    //console.log(d);
    return d;
}

function fillDataArray(A){ // TODO finish
    var max = 36;
    var min = 3;
    var diff = 0.1;

    var d = A;

    while(d.length < 5){
        var randomnumber=Math.ceil(Math.random()*36 + 3);
        var found=false;
        for(var i=0;i<d.length;i++){
            if(!ensureDifference(d, randomnumber)){
                found=true;
                break;
            }
        }
        if(!found)
            d[d.length]=randomnumber;
    }
    //d[0] = 15; d[1] = 37; d[2] = 24; d[3] = 18; d[4] = 6;

    //console.log(d);
    return d;
}

function ensureDifference(A, c){
    var result = true; // assume true
    for(var i=0;i<A.length;i++){
       if( c > (A[i] - 3) && c < (A[i] + 3) ){
           result = false;
       }
    }
    return result;
}

function makeSidewaysBar(){
var sbar = d3.select("body").append("svg")
              .attr("class", "sbar")
              .attr("width", w)
              .attr("height", h);

var barwidth = 30;
var pad = 20;

// scale for bar heights according to CMcGill data
var y = d3.scale.linear()
          .domain([0, 40])
          .range([0, w - pad*2]);
          //.domain([0, d3.max(data)])

// scale for bar spacing
var x = d3.scale.linear()
          .domain([0, data.length])
          .range([barwidth, h - pad]);

// bars
sbar.selectAll("rect")
     .data(data)
     .enter().append("rect")
     //.attr("x", function(d) { return w - y(d) - pad; })
     .attr("x", function(d) { return pad; })
     .attr("y", function(d, i) { return x(i) + pad; })
     .attr("width", function(d) { return y(d); })
     .attr("height", barwidth);

// labels
sbar.selectAll("text")
     .data(labels)
     .enter().append("text")
     //.attr("x", function(d, i) { return x(i) + barwidth; })
     //.attr("y", function(d) { return w - pad/2 + 5 ; })
     .attr("x", function(d) { return pad/2 - 2; })
     .attr("y", function(d, i) { return x(i) + pad*2; })
     .text(String);

// y axis line
sbar.append("line")
      .attr("y1", pad)
      .attr("y2", w - pad)
      .attr("x1", pad)
      .attr("x2", pad)
      .style("stroke", "#000");

// x axis line
sbar.append("line")
      .attr("x1", pad)
      .attr("x2", h - pad)
      .attr("y1", w - pad)
      .attr("y2", w - pad)
      .style("stroke", "#000");


// top y label
sbar.append("text")
        .text("100")
        .attr("y", h - pad/2)
        .attr("x", w - pad - 12)
        .attr("font-size", 10);

// bottom y label
sbar.append("text")
        .text("0")
        .attr("y", h - pad/2)
        .attr("x", pad)
        .attr("font-size", 10);


}

function makeBar(){
var barchart = d3.select("body").append("svg")
              .attr("class", "barchart")
              .attr("width", w)
              .attr("height", h);

var barwidth = 30;
var pad = 20;

// scale for bar heights according to CMcGill data
var y = d3.scale.linear()
          .domain([0, 40])
          .range([0, h - pad*2]);
          //.domain([0, d3.max(data)])

// scale for bar spacing
var x = d3.scale.linear()
          .domain([0, data.length])
          .range([barwidth, w - pad]);

barchart.selectAll("rect")
     .data(data)
     .enter().append("rect")
     .attr("x", function(d, i) { return x(i) + pad; })
     .attr("y", function(d) { return h - y(d) - pad; })
     .attr("width", barwidth)
     .attr("height", function(d) { return y(d); });

barchart.selectAll("text")
     .data(labels)
     .enter().append("text")
     .attr("x", function(d, i) { return x(i) + barwidth; })
     .attr("y", function(d) { return h - pad/2 + 5 ; })
     .text(String);

// y axis line
barchart.append("line")
      .attr("y1", pad)
      .attr("y2", h - pad)
      .attr("x1", pad)
      .attr("x2", pad)
      .style("stroke", "#000");

// top label
barchart.append("text")
        .text("100")
        .attr("x", 0)
        .attr("y", pad + 5)
        .attr("font-size", 10);

// bottom label
barchart.append("text")
        .text("0")
        .attr("x", 12)
        .attr("y", h - pad)
        .attr("font-size", 10);

// x axis line
barchart.append("line")
      .attr("x1", pad)
      .attr("x2", w - pad)
      .attr("y1", h - pad)
      .attr("y2", h - pad)
      .style("stroke", "#000");

}

function makeNonAdjacentBar(){
var barchart = d3.select("body").append("svg")
              .attr("class", "barchart")
              .attr("width", w)
              .attr("height", h);

var barwidth = 30;
var pad = 20;

// scale for bar heights according to CMcGill data
var y = d3.scale.linear()
          .domain([0, 40])
          .range([0, h - pad*2]);
          //.domain([0, d3.max(data)])

// scale for bar spacing
var x = d3.scale.linear()
          .domain([0, data.length])
          .range([barwidth, w - pad]);

barchart.selectAll("rect")
     .data(nonAdjData)
     .enter().append("rect")
     .attr("x", function(d, i) { return x(i) + pad; })
     .attr("y", function(d) { return h - y(d) - pad; })
     .attr("width", barwidth)
     .attr("height", function(d) { return y(d); });

barchart.selectAll("text")
     .data(nonAdjLabels)
     .enter().append("text")
     .attr("x", function(d, i) { return x(i) + barwidth; })
     .attr("y", function(d) { return h - pad/2 + 5 ; })
     .text(String);

// y axis line
barchart.append("line")
      .attr("y1", pad)
      .attr("y2", h - pad)
      .attr("x1", pad)
      .attr("x2", pad)
      .style("stroke", "#000");

// top label
barchart.append("text")
        .text("100")
        .attr("x", 0)
        .attr("y", pad + 5)
        .attr("font-size", 10);

// bottom label
barchart.append("text")
        .text("0")
        .attr("x", 12)
        .attr("y", h - pad)
        .attr("font-size", 10);

// x axis line
barchart.append("line")
      .attr("x1", pad)
      .attr("x2", w - pad)
      .attr("y1", h - pad)
      .attr("y2", h - pad)
      .style("stroke", "#000");

}


function makeRandomPie(){

var randomAngle = true;
var disableSorting = true;
var startAngle = 0, endAngle = 2*3.14;

if(randomAngle){
    startAngle = Math.random() * (2*3.14);
    endAngle = startAngle + (2*3.14);
}

var rOffset = 20;
var r = Math.min(w, h) / 2 - rOffset,
    color = d3.scale.category20(),
    //donut = d3.layout.pie(), // to disable sorting
    arc = d3.svg.arc().innerRadius(0).outerRadius(r);

var donut;

if(disableSorting){
    donut = d3.layout.pie().startAngle(startAngle).endAngle(endAngle).sort(null);
} else{
    donut = d3.layout.pie().startAngle(startAngle).endAngle(endAngle);
}

var piechart = d3.select("body").append("svg")
              .attr("class", "piechart")
              .data([nonAdjData])
              .attr("width", w)
              .attr("height", h);

var arcs = piechart.selectAll("g.arc")
    .data(donut)
    .enter().append("g")
    .attr("class", "arc")
    .attr("transform", "translate(" + (r+rOffset) + "," + (r+rOffset) + ")");

arcs.append("path")
    //.attr("fill", function(d, i) { return color(i); })
    .attr("d", arc);

arcs.append("text")
    .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
    .attr("text-anchor", "middle")
    .attr("stroke", "black" )
    .attr("fill", "black" )
    .text(function(d, i) { return nonAdjLabels[i]; });
}

function makePie(){

var randomAngle = false;
var disableSorting = false;
var startAngle = 0, endAngle = 2*3.14;

if(randomAngle){
    startAngle = Math.random() * (2*3.14);
    endAngle = startAngle + (2*3.14);
}

var rOffset = 20;
var r = Math.min(w, h) / 2 - rOffset,
    color = d3.scale.category20(),
    //donut = d3.layout.pie(), // to disable sorting
    arc = d3.svg.arc().innerRadius(0).outerRadius(r);

var donut;

if(disableSorting){
    donut = d3.layout.pie().startAngle(startAngle).endAngle(endAngle).sort(null);
} else{
    donut = d3.layout.pie().startAngle(startAngle).endAngle(endAngle);
}

var piechart = d3.select("body").append("svg")
              .attr("class", "piechart")
              .data([data])
              .attr("width", w)
              .attr("height", h);

var arcs = piechart.selectAll("g.arc")
    .data(donut)
    .enter().append("g")
    .attr("class", "arc")
    .attr("transform", "translate(" + (r+rOffset) + "," + (r+rOffset) + ")");

arcs.append("path")
    //.attr("fill", function(d, i) { return color(i); })
    .attr("d", arc);

arcs.append("text")
    .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
    .attr("text-anchor", "middle")
    .attr("stroke", "black" )
    .attr("fill", "black" )
    .text(function(d, i) { return labels[i]; });
}

function computeAnswerString(data){
    var A = "";
    var max = d3.max(data);
    if(onlyAB){
        if(data[Apos] < data[Bpos]){
            A+= data[Apos]+"_"+data[Bpos];
        } else {
            A+= data[Bpos]+"_"+data[Apos];
        }
        //for(var i = 0; i < data.length; i++){
        //    if(i == Apos){
        //        A += data[i]+"/"+max;

        //        if(i+1 != data.length)
        //            A += ", ";
        //    }
        //    if(i == Bpos){
        //        A += data[i]+"/"+max;
        //    }
        //}
 
    } else {
        for(var i = 0; i < data.length; i++){
            A += data[i]+"_"+max;
            if(i+1 != data.length)
                A += ", ";
        }
    }
    return A;
}


function makeBubble(){


var jsonData = {children:[
    {label:labels[0], value:data[0]},
    {label:labels[1], value:data[1]},
    {label:labels[2], value:data[2]},
    {label:labels[3], value:data[3]},
    {label:labels[4], value:data[4]}
]};

var r = 380;

var bubble = d3.layout.pack()
    .sort(null)
    .size([r, r]);
 
var chart = d3.select("body").append("svg:svg")
    .attr("width", r)
    .attr("height", r)
    .attr("class", "bubble");

var node = chart.selectAll("g.node")
    .data(bubble.nodes(classes(jsonData))
    .filter(function(d) { return !d.children; }))
    .enter().append("svg:g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
 
node.append("svg:circle")
    .attr("r", function(d) { return d.r; })
    .attr("stroke", "black" )
    .attr("fill", "white" );

// labels
node.append("svg:text")
    .attr("text-anchor", "middle")
    .attr("dy", ".3em")
    .text(function(d) { return d.label.substring(0, d.r/3); });


// Returns a flattened hierarchy containing all leaf nodes under the root.
 function classes(root) {
   var classes = [];
 
   function recurse(name, node) {
     if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
     else classes.push({label: node.label, value: node.value});
   }
 
   recurse(null, root);
   return {children: classes};
 }
} // end makeBubble()


function makeTree(){
    console.log('making a treemap');

var treeData = {name: "tree", children:[
    {name:labels[0], size:data[0]},
    {name:labels[1], size:data[1]},
    {name:labels[2], size:data[2]},
    {name:labels[3], size:data[3]},
    {name:labels[4], size:data[4]}
]};

   var treemap = d3.layout.treemap()
      .size([w, h])
      .sticky(true)
      .value(function(d) { return d.size; }); 

   var chart = d3.select("body").append("svg")
      .style("position", "relative")
      .data(d3.entries(treeData))
      .attr("width", w)
      .attr("height", h);

   treemap.nodes(treeData);

   var cell = chart.selectAll("g")
      .data(treemap)
    .enter().append("svg:g")
      .attr("class", "cell")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });


   cell.append("svg:rect")
      .attr("width", function(d) { return d.dx; })
      .attr("height", function(d) { return d.dy; })
      .attr("stroke", "black" )
      .attr("fill", "white" );
     // .style("fill", function(d) { return d.children ? color(d.data.key) : null; });

   cell.append("svg:text")
      .attr("x", function(d) { return d.dx / 2; })
      .attr("y", function(d) { return d.dy / 2; })
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .text(function(d) { return d.name; });

}

// TODO will only work for 2 judgements
function makeStackedBar(){
    console.log('making stacked bar');

    // divide the data based on A and B position
    var leftBar = [];
    var rightBar = [];
    var aIsLeft = true;
    if(Math.random() > 0.5){ 
        leftBar.push(data[Apos]);
        rightBar.push(data[Bpos]);
        aIsLeft = true;
    } else {
        leftBar.push(data[Bpos]);
        rightBar.push(data[Apos]);
        aIsLeft = false;
    }
    
//    // randomly distribute the rest of the data
    var chosen = [Apos, Bpos];
    var choice = Math.floor(Math.random()*5);
    while(chosen.length < 5){
        if(chosen.indexOf(choice) < 0){
            if(Math.random() > .5){
                leftBar.push(data[choice]);
            } else {
                rightBar.push(data[choice]);
            }
            chosen.push(choice);
        }
        choice = Math.floor(Math.random()*5);
    }

    var leftStart = leftBar.length;
    var rightStart = rightBar.length;
    while(d3.sum(leftBar) != 100){
        leftBar = leftBar.slice(0, leftStart);
        leftBar = fillDataArray(leftBar);
    }
    while(d3.sum(rightBar) != 100){
        rightBar = rightBar.slice(0, rightStart);
        rightBar = fillDataArray(rightBar);
    }

    console.log(leftBar);
    console.log(rightBar);


    // now build the bar charts
    //
    var stack = d3.layout.stack()
      .values(function(d, i) { return d[i]; }); 

    var chart = d3.select("body").append("svg")
              .attr("class", "stackedbar")
              .attr("width", w)
              .attr("height", h);

    var barwidth = 90;
    var pad = 20;

    // scale for bar heights according to CMcGill data
var y = d3.scale.linear()
          .domain([0, 40])
          .range([0, 100 + 25]);
          //.range([0, h - pad*2]);
          //.domain([0, d3.max(data)])

// scale for bar spacing
var x = d3.scale.linear()
          .domain([0, data.length])
          .range([barwidth, w - pad]);

chart.selectAll("rect")
     .data(leftBar)
     .enter().append("rect")
     .attr("x", function(d, i) { return  w/5; })
     .attr("y", function(d, i) { var y0 = isNaN(leftBar[i-1]) ? 0 : d3.sum(leftBar.slice(0, i)); return (h - y(d) - pad) - (y(y0)); })
     .attr("width", barwidth)
     .attr("height", function(d) { return y(d); });

chart.selectAll("rect2")
     .data(rightBar)
     .enter().append("rect")
     .attr("x", function(d, i) { return (w/5)*3; })
     .attr("y", function(d, i) { var y0 = isNaN(rightBar[i-1]) ? 0 : d3.sum(rightBar.slice(0, i)); return (h - y(d) - pad) - (y(y0)); })
     .attr("width", barwidth)
     .attr("height", function(d) { return y(d); });


// TODO label based on bar choices above (bottom of both)
//chart.selectAll("text")
//     .data(labels)
//     .enter().append("text")
//     .attr("x", function(d, i) { return x(i) + barwidth; })
//     .attr("y", function(d, i) { var y0 = isNaN(leftBar[i-1]) ? 0 : d3.sum(leftBar.slice(0, i)); return (h - y(data[i]) - pad) - (y(y0))/2; })
//     .text(String);

// left label
var leftText = aIsLeft ? 'A' : 'B';
var rightText = aIsLeft ? 'B' : 'A';
chart.append("text")
        .text(leftText)
        .attr("x", w/5 + barwidth/2)
        //.attr("y", h - pad - 10)
        .attr("y", function() { return (h - y(leftBar[0])/2 - pad + 5); })
        .attr("font-size", 10);
// right label
chart.append("text")
        .text(rightText)
        .attr("x", (w/5)*3 + barwidth/2)
        //.attr("y", h - pad - 10)
        .attr("y", function() { return (h - y(rightBar[0])/2 - pad + 5); })
        .attr("font-size", 10);




// y axis line
chart.append("line")
      .attr("y1", pad)
      .attr("y2", h - pad)
      .attr("x1", pad)
      .attr("x2", pad)
      .style("stroke", "#000");

// top label
chart.append("text")
        .text("100")
        .attr("x", 0)
        .attr("y", pad + 5)
        .attr("font-size", 10);

// bottom label
chart.append("text")
        .text("0")
        .attr("x", 12)
        .attr("y", h - pad)
        .attr("font-size", 10);

// x axis line
chart.append("line")
      .attr("x1", pad)
      .attr("x2", w - pad)
      .attr("y1", h - pad)
      .attr("y2", h - pad)
      .style("stroke", "#000");

}

//function fillArrayTo(A, end){
//        var remaining = 100 - d3.sum(A);
//        var amount = Math.floor(Math.random()*remaining);
//        return;
//    }
//}


// CONTROL

// on load, set input dataset
$(document).ready(function() {
    // set data
    $('#dataset').val(data);
    // set answers
    $('#ratios').val(computeAnswerString(data));
    // set title
    $('title').text(data.join('_')+'__'+computeAnswerString(data));
    // prefix
    $('#prefix').val(data.join('_')+'__'+computeAnswerString(data));

    // check for enter, and update data when pressed
    //$('#dataset').keypress(function(event){

    //    var keycode = (event.keyCode ? event.keyCode : event.which);
    //    if(keycode == '13'){
    //        alert('You pressed a "enter" key in dataset');	
    //    }
    //    event.stopPropagation();
    //});

    //$(document).keypress(function(event){

    //    var keycode = (event.keyCode ? event.keyCode : event.which);
    //    if(keycode == '13'){
    //        data = randomizeData();
    //        updateCharts();
    //    }

    //});

    // TODO somehow need to switch
    // make a/b switch button
    //$("#changeType").click(function () {
    //    onlyAB = !onlyAB;
    //}
    

});


