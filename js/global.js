/**
 * Created by Michaelhua on 2016/4/18.
 */
var sliderValue=1;
var gameIdBase=41400140;
var matchSeriesId=8;
var matchId="0041400148";
//var playids;
var gswColor="#006BB6";
var loopNum;
var statDataFlag=false;

//by yufei change to scoreSVG1 scoreSVG2
var donut_team_data;
var scoreSVG1 = d3.select("#score-div-1").append("svg").attr("width", 350).attr("height", 250)
    .append("g")
    .attr("transform", "translate(" + 100 + "," + 250 / 2 + ")");

var scoreSVG2 = d3.select("#score-div-2").append("svg").attr("width", 350).attr("height", 250)
    .append("g")
    .attr("transform", "translate(" + 100 + "," + 250 / 2 + ")");


var teamTocolor= {1610612740:["#1a85ff","#004799","#002B5C"],1610612763:["#35bee3","#15809d","#0F586C"],1610612745:["#f9b8c8","#ee2b5b","#CE1141"],1610612739:["#b3004a","#860038","#4d0020"]};
var g = scoreSVG1.append('g')
    .attr("class","g1");
var g2 = scoreSVG2.append('g');
var donut_color = d3.scale.ordinal()
    .range(["#006bb6", "#1a9fff", "#b3dfff"]);

//for the stat bar chart
var allStat;
var boxscore_data=[{statType:"Goals",teamValue:[{teamId:"",value:0},{teamId:"",value:0}]},
    {statType:"Rebounds",teamValue:[{teamId:"",value:0},{teamId:"",value:0}]},
    {statType:"Assists",teamValue:[{teamId:"",value:0},{teamId:"",value:0}]},
    {statType:"Steals",teamValue:[{teamId:"",value:0},{teamId:"",value:0}]},
    {statType:"Blocks",teamValue:[{teamId:"",value:0},{teamId:"",value:0}]},
    {statType:"Turnovers",teamValue:[{teamId:"",value:0},{teamId:"",value:0}]}];
var opList=["1610612740","1610612763","1610612745","1610612739"];
var opId=opList[sliderValue-1];
var refIdToName={"1610612744":"Golden State Warriors", "1610612745":"Houston Rockets","1610612740":"New Orleans Pelicans","1610612763":"Memphis Grizzlies","1610612739":"Cleveland Cavaliers"};
var teamColors=["#002B5C","#0F586C","#CE1141","#860038"];
d3.select("#team2-img").attr("src","img/"+opId+".png");
d3.select("#team2-title").text(refIdToName[opId]).style("color",teamColors[sliderValue-1]);
var statNames=[refIdToName["1610612744"],refIdToName[opId]];
var winLost;
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 600 - margin.left - margin.right,
    height = 320 - margin.top - margin.bottom;


var stat_x0 = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var stat_x1 = d3.scale.ordinal();

var stat_y = d3.scale.linear()
    .range([height, 0]);

var stat_color = d3.scale.ordinal()
    .range(["#41B6C4", "#FD8D3C"]);

var stat_xAxis = d3.svg.axis()
//    .scale(stat_x0)
    .orient("bottom");

var stat_yAxis = d3.svg.axis()
//    .scale(stat_y)
    .orient("left");
//.tickFormat(d3.format(".2s"));

var stat_svg = d3.select("#team-trad-bar-chart").select("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

stat_svg.append("g")
    .attr("class", "x axis x-axis")
    .attr("transform", "translate(0," + height + ")");
//    .call(stat_xAxis);

stat_svg.append("g")
    .attr("class", "y axis y-axis");
//    .call(stat_yAxis)

/*
var statlegend = stat_svg.selectAll(".legend")
    .data(statNames.slice().reverse());
statlegend
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

statlegend.append("rect")
    .attr("x", width - 18)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", stat_color);

statlegend.append("text")
    .data(["GSW","Opponent"])
    .attr("x", width - 24)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "end")
    .text(function(d) { return d; });

*/



//team shooting chart

var team_data;
var team_data_update;
var team_selectValue1;
var team_selectValue2;


// general shooting chart size
var courtWidth = 50;
var visibleCourtLength = 37.375;
var threePointSideRadius = 22;
var keyWidth = 16;
var colorLegendTitle = 'Field Goal';
var colorLegendStartLabel_team = "Missed";
var colorLegendEndLabel_team = "Made";
var colorLegendStartLabel = "Low";
var colorLegendEndLabel = "High";
var largestHexagonRadius = 0.75;
var colorXMid = courtWidth - (threePointSideRadius - keyWidth / 2) / 2 - (courtWidth / 2 - threePointSideRadius);
var basketProtrusionLength = 4;
var colorYStart = visibleCourtLength - basketProtrusionLength/3;


var hexagonRadiusSizes = [0,.25, .4, .6,.75];
var sizeRange = hexagonRadiusSizes.slice(-5);
var sizeLengendWidth = 0;
for (var c = 0, d = sizeRange.length; c < d; ++c) {
    sizeLengendWidth += sizeRange[c] * 2;
}
var sizeXMid = (threePointSideRadius - keyWidth / 2) / 2 +
    (courtWidth / 2 - threePointSideRadius);
var sizeYStart = visibleCourtLength - basketProtrusionLength/3;
var sizeLegendTitle='Frequency';
var sizeLegendSmallLabel='Low';
var sizeLegendLargeLabel='High';


//teammate data load
d3.csv("data/ranklineup.csv", function (error, csv) {
    lineupData=csv;

});


var stage_story = [
    {"text":"From start to finish in this season, the Golden State Warriors (W67-L15) have been the best team in NBA. " +
    "The deserving MVP Stephen Curry and Steve Kerr lead team has evolved from a jump shooting fan favorite to a bonafide terror, " +
    "closing the door on games in the third quarter on a routine and borderline-rude basis. " +
    "At the end of the day it was amazing that the New Orleans Pelicans were able to get the play-off ticket. " +
    "The Pelicans’ youth and relative playoff inexperience won’t be able to respond well enough to overcome " +
    "those deficits enough times to win four games. Unsurprisingly, the Golden State won the first round within 4 games.","match_id":"0041400148"},
    {"text":"Through the regular season and first play-off round, the Warriors proved their shooting, defense, " +
    "mental toughness — all the qualities that made them such a formidable regular season team, " +
    "really — will carry over to the playoffs without too many problems. " +
    "The Golden State relied on their 3- point shoots to kill the game. " +
    "Memphis Grizzlies is one of the league's best inside scoring teams and defense teams. " +
    "Grizzlies had to get position closer to the basket quicker and beat the Warriors to " +
    "their preferred position and need players to knock down some perimeter shots to force " +
    "Golden State to back somebody out defensively. ","match_id":"0041400228"},
    {"text":"Houston has fought back from the brink of elimination before when everyone was ruling them out, " +
    "coming back from a 3-1 series deficit in the last round against the Clippers. " +
    "Both teams make lots of 3-point shots and few long 2-point shots. " +
    "Performance of Harden and Howard has a great influence on the game. " +
    "In this round, the Warriors did a nice job of keeping Harden off of the foul line and forced him into committing turnovers. " +
    "And a big issue going forward is going to be Dwight Howard's health. He failed to play well in this round. " +
    "At last the Golden State warriors beat Houston Rockets in 5 games.","match_id":"0041400318"},
    {"text":"Great player (LeBron James) vs. great team. " +
    "We have never seen so many individual-based facts associated with a team as I have with the Cavaliers these playoffs. " +
    "Everything is 'LeBron James' record when leading a series 2-0 is . . .  or 'LeBron's fifth straight trip to the Finals.' " +
    "But that's how singularly significant he is in this league, reflective of a man who has won 17 of his past 19 playoff series. " +
    "Then again, the Spurs hung one of those L's on him with outstanding team play in the 2014 Finals, " +
    "and great team play in every facet has been the hallmark of these 2014-15 Warriors. " +
    "History tells you the better team wins a best-of-seven series. But there's that nagging question: Can you beat a great player in his prime four times? " +
    "Games proved that James failed to defeat a team without any great teammates. Love and Irvin both got injured on their way to final and championship.","match_id":"0041400408"}
];
