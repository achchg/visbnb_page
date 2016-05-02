
// Load CSV file
var data_origin;
var data;
var data_update;
var data_update2;
//var x = [];
//var y = [];
var selectValue="Stephen Curry";
var selectValue2="LeBron James";
var selectValue3="All";
var selectValue4="All";

var player1_count = [];
var player2_count = [];

function player_filter(variable) {
    return variable.player_name == selectValue;
}

function player_filter2(variable) {
    return variable.player_name == selectValue2;
}

function shottype(variable) {
    return variable.shot_type == selectValue3;
}


function shotzonerange(variable) {
    return variable.shot_zone_range == selectValue4;
}


loadData();

function loadData(){
    d3.csv("data/final_shot_data.csv", function(error, csv) {
        csv.forEach(function(d) {

            // Convert numeric values to 'numbers'
            d.loc_x = +d.loc_x*10;
            d.loc_y = (+d.loc_y-5.25)*10;
            d.period = +d.period;
            d.shot_made_numeric = +d.shot_made_numeric;
            d.time = +d.time;
            d.shot_zone = +d.shot_zone;
            d.person_id = +d.person_id;

        });
        // Store csv data in global variable
        data_origin = csv;
        data = data_origin;

        var player_color = [];
        var myJSON = "";

        for (var l = 0; l < d3.map(csv, function(d){return d.team_name;}).keys(); l++) {

            var item = {
                "team_name": [l].team_name,
                "color": l
            };

            player_color.push(item);
        }
        console.log(player_color)

        myJSON = JSON.stringify({player_color: player_color});


        var select = d3.select('#selection1')
            .append('select')
            .attr('id','select1')
            .on('change',onchange1);

        select
            .selectAll('option')
            .data(d3.map(data, function(d){return d.player_name;}).keys())
            .enter()
            .append('option')
            .text(function(d){return d;})
            .attr("value", function(d){
                return d;});

        select.property("value", "Stephen Curry");

        var select2 = d3.select('#selection2')
            .append('select')
            .attr('id','select2')
            .on('change',onchange2);

        select2
            .selectAll('option')
            .data(d3.map(data, function(d){return d.player_name;}).keys())
            .enter()
            .append('option')
            .text(function(d){return d;})
            .attr("value", function(d){return d;});
        select2.property("value", "LeBron James");


        var select3 = d3.select('#selection3')
            .append('select')
            .attr('id','select3')
            .on('change',onchange3);

        select3
            .selectAll('option')
            .data(d3.map(["Jump", "Layup", "Others", "All"], function(d){return d;}).keys())
            .enter()
            .append('option')
            .text(function(d){return d;})
            .attr("value", function(d){return d;});
        select3.property("value", "All");

        var select4 = d3.select('#selection4')
            .append('select')
            .attr('id','select4')
            .on('change',onchange4);
        select4
            .selectAll('option')
            .data(d3.map(["Less Than 8 ft.",
                    "8-16 ft.",
                    "16-24 ft.",
                    "24+ ft.",
                    "Back Court Shot",
                    "All"],
                function(d){return d;}).keys())
            .enter()
            .append('option')
            .text(function(d){return d;})
            .attr("value", function(d){return d;});

        select4.property("value", "All");

        var playerid=data.filter(function(d){return d.player_name==selectValue});
        d3.select("#player1-img").attr("src","http://stats.nba.com/media/players/230x185/"+playerid[0].person_id+".png");
        updateTeammateData(playerid[0].person_id,1);
        playerid=data.filter(function(d){return d.player_name==selectValue2});
        d3.select("#player2-img").attr("src","http://stats.nba.com/media/players/230x185/"+playerid[0].person_id+".png");
        updateTeammateData(playerid[0].person_id,2);
        /*
        d3.csv("data/playerid.csv", function(error, csv) {
            //"http://stats.nba.com/media/players/230x185/"+playerid+".png"
            playerids=csv;
            var playerid=playerids.filter(function(d){return d.player_name==selectValue});
            d3.select("#player1-img").attr("src","http://stats.nba.com/media/players/230x185/"+playerid[0].player+".png");
            playerid=playerids.filter(function(d){return d.player_name==selectValue2});
            d3.select("#player2-img").attr("src","http://stats.nba.com/media/players/230x185/"+playerid[0].player+".png");
        });
*/
        data_update = data.filter(player_filter);
        data_update2 = data.filter(player_filter2);

        updateVisualization();
        updateBarchart();
})}

var d1=[];
var d2=[];
var radardata=[];


d3.csv("data/newradardata.csv", function(error, csv) {
    csv.forEach(function(d){
        // Convert numeric values to 'numbers'
        d.ast=+d.ast;
        d.blk=+d.blk;
        d.pf=+d.pf;
        d.gp=+d.gp;
        d.reb=+d.reb;
        d.stl=+d.stl;
        d.tov=+d.tov
    });
    radardata=csv;
    updateRadarVisualization1();
    updateRadarVisualization2();

});



function onchange1(){
    court_func();
    selectValue = d3.select('#select1').property('value');
    data_update = data.filter(player_filter);
    console.log(data_update[0]);
    var playerid=data_update.filter(function(d){return d.player_name==selectValue});
    console.log(playerid)
    d3.select("#player1-img").attr("src","http://stats.nba.com/media/players/230x185/"+playerid[0].person_id+".png");
    updateTeammateData(playerid[0].person_id,1);

    updateBarchart();
    updateVisualization();
    updateRadarVisualization1();

    //filterlineup1();
}

function onchange2(){
    court_func();
    selectValue2 = d3.select('#select2').property('value');
    data_update2 = data.filter(player_filter2);
    var playerid=data_update2.filter(function(d){return d.player_name==selectValue2});
    d3.select("#player2-img").attr("src","http://stats.nba.com/media/players/230x185/"+playerid[0].person_id+".png");
    updateTeammateData(playerid[0].person_id,2);

    updateBarchart();
    updateVisualization();
    updateRadarVisualization2();

    //filterlineup2();
}

function onchange3(){
    court_func();
    data_update = data.filter(player_filter);
    data_update2 = data.filter(player_filter2);
   // selectValue3 = d3.select('#select3').property('value');
    if(selectValue3 == "All"){
        if (selectValue4 != "All"){
            data_update = data_update.filter(shotzonerange);
            data_update2=data_update2.filter(shotzonerange)
        }
        else{}
    }
    else{
        if (selectValue4 != "All"){
            data_update = data_update.filter(shotzonerange).filter(shottype);
            data_update2=data_update2.filter(shotzonerange).filter(shottype);
        }

        else{
            data_update = data_update.filter(shottype);
        data_update2=data_update2.filter(shottype)}
    }
    updateBarchart();
    updateVisualization();

}

function onchange4(){
    court_func();
    data_update = data.filter(player_filter);
    data_update2 = data.filter(player_filter2);
   // selectValue4 = d3.select('#select4').property('value');
    if(selectValue3 == "All"){
        if (selectValue4 != "All"){
            data_update = data_update.filter(shotzonerange);
            data_update2=data_update2.filter(shotzonerange)
        }
        else{}
    }
    else{
        if (selectValue4 != "All"){
            data_update = data_update.filter(shotzonerange).filter(shottype);
            data_update2=data_update2.filter(shotzonerange).filter(shottype);
        }

        else{
            data_update = data_update.filter(shottype);
            data_update2=data_update2.filter(shottype)}
    }

    updateBarchart();
    updateVisualization();
}

var colorXStart =  colorXMid - (5 * largestHexagonRadius);
var colorXStart1 = colorXStart;
var hexbin = d3.hexbin();
var hexagon = hexbin.hexagon(largestHexagonRadius);
var hexbin1 = d3.hexbin();
var hexagon1 = hexbin1.hexagon(largestHexagonRadius);


// Text: color legend for the right court:
var colorLegend = d3.selectAll("#chart-area").append('g')
    .classed('legend', true);
colorLegend.append("text")
    .classed('legend-title', true)
    .attr("x", colorXMid-colorXMid)
    .attr("y", colorYStart + 20 - largestHexagonRadius * 2)
    .attr("text-anchor", "middle")
    .text(colorLegendTitle);
colorLegend.append("text")
    .attr("x", colorXStart-colorXMid)
    .attr("y", colorYStart + 20)
    .attr("text-anchor", "end")
    .text(colorLegendStartLabel);
colorLegend.append("text")
    .attr("x", colorXStart-colorXMid + 5 * 2 * largestHexagonRadius)
    .attr("y", colorYStart + 20)
    .attr("text-anchor", "start")
    .text(colorLegendEndLabel);

// Text: color legend for the left court:
var colorLegend1 = d3.selectAll("#chart-area").append('g')
    .attr("class","shooting_legend")
    .classed('legend', true);
colorLegend1.append("text")
    .classed('legend-title', true)
    .attr("x", colorXMid + 7.5)
    .attr("y", colorYStart + 20 - largestHexagonRadius * 2)
    .attr("text-anchor", "middle")
    .text(colorLegendTitle);
colorLegend1.append("text")
    .attr("x", colorXStart1+ 7.5)
    .attr("y", colorYStart + 20)
    .attr("text-anchor", "end")
    .text(colorLegendStartLabel);
colorLegend1.append("text")
    .attr("x", colorXStart1+ 7.5 + 5 * 2 * largestHexagonRadius)
    .attr("y", colorYStart + 20)
    .attr("text-anchor", "start")
    .text(colorLegendEndLabel);

// Draw size legend for the full court:
var sizeXStart = sizeXMid - (sizeLengendWidth / 2);
var sizeLegend = d3.selectAll("#chart-area").append('g')
    .classed('legend', true);
sizeLegend.append("text")
    .classed('legend-title', true)
    .attr("x", sizeXMid+15)
    .attr("y", sizeYStart  + 20- largestHexagonRadius * 2)
    .attr("text-anchor", "middle")
    .text(sizeLegendTitle);
sizeLegend.append("text")
    .attr("x", sizeXStart+15)
    .attr("y", sizeYStart + 20)
    .attr("text-anchor", "end")
    .text(sizeLegendSmallLabel);

var size = sizeLegend.selectAll('path').data(sizeRange);
size
    .enter()
    .append('path')
    .attr('d', function (d) { return hexbin.hexagon(d); })
    .attr("transform", function (d, i) {
        sizeXStart += d * 2;
        return "translate(" +
            (sizeXStart - d+15) + ", " +
            (sizeYStart + 20) + ")";
    })
    .style('fill', 'gray');
size.exit().remove();

// Text: size legend for the full court:
sizeLegend.append("text")
    .attr("x", sizeXStart+15)
    .attr("y", sizeYStart + 20)
    .attr("text-anchor", "start")
    .text(sizeLegendLargeLabel);


function updateVisualization(){
    court_func();

    var tenderData = [];
    for (var i = 0; i < data_update.length; i++) {
        tenderData.push({
            "x": Math.ceil((data_update[i].loc_x + 243) / 10),
            "y": Math.ceil((data_update[i].loc_y + 17) / 9),
            "made": data_update[i].shot_made_numeric,
            "attempts": 1
        });
    }



    var tenderData2 = [];
    for (var k = 0; k < data_update2.length; k++) {
        tenderData2.push({
            "x": Math.ceil((data_update2[k].loc_x + 243) / 10),
            "y": Math.ceil((data_update2[k].loc_y + 17) / 9),
            "made": data_update2[k].shot_made_numeric,
            "attempts": 1
        });
    }

    var coll = d3.nest()
        .key(function (d) {
            return [d.x, d.y];
        })
        .rollup(function (v) {
            return {
                made: d3.sum(v, function (d) {
                    return d.made
                }),
                attempts: d3.sum(v, function (d) {
                    return d.attempts
                }),
                shootingPercentage: d3.sum(v, function (d) {
                    return d.made
                }) / d3.sum(v, function (d) {
                    return d.attempts
                })
            }
        })
        .entries(tenderData);


    var coll2 = d3.nest()
        .key(function (d) {
            return [d.x, d.y];
        })
        .rollup(function (v) {
            return {
                made: d3.sum(v, function (d) {
                    return d.made
                }),
                attempts: d3.sum(v, function (d) {
                    return d.attempts
                }),
                shootingPercentage: d3.sum(v, function (d) {
                    return d.made
                }) / d3.sum(v, function (d) {
                    return d.attempts
                })
            }
        })
        .entries(tenderData2);

    var z = [];
    coll.forEach(function (a) {
        a.key = JSON.parse("[" + a.key + "]");
        z.push(a.values.shootingPercentage);
    });

    var meanShot;
    var z_square = [];
    var shotSTDV;
    for (var j = 0; j < z.length; j++) {z_square[j] = z_square[0]}
    if (z.length == 0){
        meanShot = 0;
        shotSTDV = 0;
    }
    else{
        meanShot= (z.reduce(function(a, b){return a+b;}))/ z.length;
        for (var j = 0; j < z.length; j++) {z_square[j] = z[j]*z[j]}
        shotSTDV = Math.sqrt((z_square.reduce(function(a,b){return a+b})- z.length*meanShot*meanShot)/ z.length);
    }

    var finalData = [];
    coll.forEach(function (a) {
        var k = (a.values.shootingPercentage - meanShot) / shotSTDV;
        finalData.push({"x": a.key[0], "y": a.key[1], "z": k, "made": a.values.made, "attempts": a.values.attempts})
    });

    var z2 = [];
    coll2.forEach(function (a) {
        a.key = JSON.parse("[" + a.key + "]");
        z2.push(a.values.shootingPercentage);
    });

    var meanShot2;
    var z_square2 = [];
    var shotSTDV2;
    for (var l = 0; l < z2.length; l++) {z_square2[l] = z_square2[0]}
    if (z2.length == 0){
        meanShot2 = 0;
        shotSTDV2 = 0;
    }
    else{
        meanShot2= (z2.reduce(function(a, b){return a+b;}))/ z2.length;
        for (var l = 0; l < z2.length; l++) {z_square2[l] = z2[l]*z2[l]}
        shotSTDV2 = Math.sqrt((z_square2.reduce(function(a,b){return a+b})- z2.length*meanShot2*meanShot2)/ z2.length);
    }


    var finalData2 = [];
    coll2.forEach(function (a) {
        var k2 = (a.values.shootingPercentage - meanShot2) / shotSTDV2;
        finalData2.push({"x": a.key[0], "y": a.key[1], "z2": k2, "made": a.values.made, "attempts": a.values.attempts})
    });


    tenderData = finalData;
    var heatRange = ['#ffffcc','#a1dab4','#41b6c4','#2c7fb8','#253494'];
    var court = d3.select("#player-shooting-chart")
        .select("svg")
        .attr("width",800)
        .attr("height", 480)
        .attr("viewBox", "0 0 60 60");

    tenderData2 = finalData2;
    var heatRange2 = ['#ffffb2','#fecc5c','#fd8d3c','#f03b20','#bd0026'];

    var court_right = court.append("g")
        .attr("class", "court")
        .attr("transform", "rotate(90, 10,10)")
        .chart("BasketballShotChart", {
            width: 800,
            title: "",
            // instead of makes/attempts, use z
            hexagonFillValue: function (d) {
                return d.z;
            },
            // switch heat scale domain to [-2.5, 2.5] to reflect range of z values
            heatScale: d3.scale.quantile()
                .domain([-2.5, 2.5])
                .range(heatRange),

            // update our binning algorithm to properly join z values
            // here, we update the z value to be proportional to the events of each point

            hexagonBin: function (point, bin) {
                var currentZ = bin.z || 0;
                var totalAttempts = bin.attempts || 0;
                var totalZ = currentZ * totalAttempts;

                var attempts = point.attempts || 1;
                bin.attempts = totalAttempts + attempts;
                bin.z = (totalZ + (point.z * attempts)) / bin.attempts;
            }
        });

// Draw hexagon color legend for the right court:

    var legend = colorLegend.selectAll('.legend').data(heatRange);
    legend
        .enter()
        .append('path')
        .attr('d', hexagon)
        .attr("transform", function (d, i) {
            return "translate(" +
                (colorXStart-colorXMid + ((1 + i*2) *largestHexagonRadius)) + ", " +
                (colorYStart + 20) + ")";
        })
        .style('fill', function (d, i) { return d; });
    legend.exit().remove();

    if(selectValue){
        setTimeout(function(){
            court_right
                .draw(tenderData);
        }, 250);
    }
    if(selectValue2){
        court_right
                .draw(tenderData);
    }


    var court_left = court.append("g")
        .attr("class", "court")
        .attr("transform", "rotate(-90, 40, 10)")
        .chart("BasketballShotChart", {
            width: 800,
            title: "",
            // instead of makes/attempts, use z
            hexagonFillValue: function (d) {
                return d.z2;
            },
            // switch heat scale domain to [-2.5, 2.5] to reflect range of z values
            heatScale: d3.scale.quantile()
                .domain([-2.5, 2.5])
                .range(heatRange2),

            // update our binning algorithm to properly join z values
            // here, we update the z value to be proportional to the events of each point

            hexagonBin: function (point, bin) {
                var currentZ = bin.z2 || 0;
                var totalAttempts = bin.attempts || 0;
                var totalZ = currentZ * totalAttempts;

                var attempts = point.attempts || 1;
                bin.attempts = totalAttempts + attempts;
                bin.z2 = (totalZ + (point.z2 * attempts)) / bin.attempts;
            }
        });


// Draw hexagon color legend for the left court:
    var legend1 = colorLegend1.selectAll('path').data(heatRange2);
    legend1
        .enter()
        .append('path')
        .attr('d', hexagon1)
        .attr("transform", function (d, i) {
            return "translate(" +
                (colorXStart1 + 7.5+ ((1 + i*2) *largestHexagonRadius)) + ", " +
                (colorYStart + 20) + ")";
        })
        .style('fill', function (d, i) { return d; });
    legend1.exit().remove();

    if(selectValue2){
        setTimeout(function(){
            court_left
                .draw(tenderData2);
        }, 250);
    }
    if(selectValue){
            court_left
                .draw(tenderData2);
    }

}

function court_func(){
    d3.selectAll(".shot-chart").remove();
}

// var team = d3.select("#img");

//team.append("svg:img")
//    .attr("href", "http://stats.nba.com/media/img/teams/logos/GSW_logo.svg")
//    .attr("width", 400)
//    .attr("height", 400)
//    .attr("x",150)
//    .attr("y",150);