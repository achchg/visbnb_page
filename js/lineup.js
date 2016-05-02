/**
 * Created by pc on 4/18/2016.
 */


// some colour variables
var tcBlack = "#130C0E";

// rest of vars
var w = 480,
    h = 400,
    maxNodeSize = 50,
    x_browser = 20,
    y_browser = 25,
    root1,
    root2;

var vis1;
var force1 = d3.layout.force();

vis1 = d3.select("#vis1").append("svg").attr("width", w).attr("height", h);

var vis2;
var force2 = d3.layout.force();
vis2 = d3.select("#vis2").append("svg").attr("width", w).attr("height", h);

/*d3.json("data/marvel.json", function(json) {
    console.log(json)

    root = json;
    root.fixed = true;
    root.x = w / 2;
    root.y = h / 4;


    // Build the path
    var defs = vis.insert("svg:defs")
        .data(["end"]);


    defs.enter().append("svg:path")
        .attr("d", "M0,-5L10,0L0,5");

    updatelineup1();
});*/

//var selectValue="Stephen Curry";
//var selectValue2="LeBron James";
var lineup1={};
var lineup2={};

var lineupdata=[];
loadlineupdata();
function loadlineupdata() {
    d3.csv("data/ranklineup.csv", function (error, csv) {
      //  csv.forEach(function (d) {
            // Convert numeric values to 'numbers'

        //});
        lineupdata=csv;
        filterlineup1();
        filterlineup2();
    });
}

function filterlineup1(){
    var data = lineupdata.filter(function (d) {
        return (d.player_name == selectValue);
    });
    console.log(data);
    var playerid=data[0].player;
    lineup1={
        "name": selectValue,
        "img": "http://stats.nba.com/media/players/230x185/"+playerid+".png",
        "children":[]
    };
    console.log(lineup1);
    data.forEach(function(d){
        a={
            "name": d.lineup_name,
            "img":  "http://stats.nba.com/media/players/230x185/"+ d.lineup+".png",
            "size": 40000
        };
        lineup1.children.push(a);
    });

    root1 = lineup1;
    root1.fixed = true;
    root1.x = w / 2;
    root1.y = h / 4;


    // Build the path
    var defs = vis1.insert("svg:defs")
        .data(["end"]);


    defs.enter().append("svg:path")
        .attr("d", "M0,-5L10,0L0,5");


    updatelineup1()
}



function filterlineup2(){
    var data = lineupdata.filter(function (d) {
        return (d.player_name == selectValue2);
    });
    var playerid=data[0].player;
    lineup2={
        "name": selectValue2,
        "img": "http://stats.nba.com/media/players/230x185/"+playerid+".png",
        "children":[]
    };
    data.forEach(function(d){
        a={
            "name": d.lineup_name,
            "img":  "http://stats.nba.com/media/players/230x185/"+ d.lineup+".png",
            "size": 40000
        };
        lineup2.children.push(a);
    });

    root2 = lineup2;
    root2.fixed = true;
    root2.x = w / 2;
    root2.y = h / 4;


    // Build the path
    var defs = vis2.insert("svg:defs")
        .data(["end"]);


    defs.enter().append("svg:path")
        .attr("d", "M0,-5L10,0L0,5");


    updatelineup2()
}



