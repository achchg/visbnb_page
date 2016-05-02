function team_filter(variable) {
    return variable.game_id == matchId;
}
function gsw(variable){
    return variable.team_name == "Golden State Warriors"
}
function opponent(variable){
    return variable.team_name != "Golden State Warriors"
}


// Text: team color legend for court right:
var team_colorXStart = colorXMid - (2 * largestHexagonRadius);
var team_hexbin = d3.hexbin();
var team_hexagon = team_hexbin.hexagon(largestHexagonRadius);

var team_colorLegend = d3.selectAll("#chart-area2").append('g')
    .classed('legend', true);
team_colorLegend.append("text")
    .classed('legend-title', true)
    .attr("x", colorXMid -colorXMid)
    .attr("y", colorYStart + 20 - largestHexagonRadius * 2)
    .attr("text-anchor", "middle")
    .text(colorLegendTitle);
team_colorLegend.append("text")
    .attr("x", team_colorXStart -colorXMid-0.5)
    .attr("y", colorYStart + 20)
    .attr("text-anchor", "end")
    .text(colorLegendStartLabel_team);
team_colorLegend.append("text")
    .attr("x", team_colorXStart  -colorXMid + 0.5 + 2 * 2 * largestHexagonRadius)
    .attr("y", colorYStart + 20)
    .attr("text-anchor", "start")
    .text(colorLegendEndLabel_team);



// Text: team color legend for court left:
var team_colorXStart1 = colorXMid - (2 * largestHexagonRadius);
var team_hexbin1 = d3.hexbin();
var team_hexagon1 = team_hexbin1.hexagon(largestHexagonRadius);

var team_colorLegend1 = d3.selectAll("#chart-area2").append('g')
    .classed('legend', true);
team_colorLegend1.append("text")
    .classed('legend-title', true)
    .attr("x", colorXMid + 7.5)
    .attr("y", colorYStart + 20 - largestHexagonRadius * 2)
    .attr("text-anchor", "middle")
    .text(colorLegendTitle);
team_colorLegend1.append("text")
    .attr("x", team_colorXStart1 + 7)
    .attr("y", colorYStart + 20)
    .attr("text-anchor", "end")
    .text(colorLegendStartLabel_team);
team_colorLegend1.append("text")
    .attr("x", team_colorXStart1 + 8 + 2 * 2 * largestHexagonRadius)
    .attr("y", colorYStart + 20)
    .attr("text-anchor", "start")
    .text(colorLegendEndLabel_team);



function updateTeamVisualiteam_zation(gameid){
    team_court_func();
    if (typeof(gameid)=="string"){
        team_data_update = team_data.filter(function(d){return d.game_id==gameid});

    }else{
        team_data_update=[];
        for (var i=0;i<gameid.length;i++){
            //console.log(gameid[i]);
            var temp= team_data.filter(function(d){return d.game_id==gameid[i]});
            team_data_update=team_data_update.concat(temp);
        }
    }
    //console.log(team_data_update);
    team_selectValue1 = team_data_update.filter(function(d){return d.team_id=="1610612744"});
    team_selectValue2 = team_data_update.filter(function(d){return d.team_id!="1610612744"});


    var team_tenderData = [];
    for (var i = 0; i < team_selectValue1.length; i++) {
        team_tenderData.push({
            "x": Math.ceil((team_selectValue1[i].loc_x + 243) / 10),
            "y": Math.ceil((team_selectValue1[i].loc_y + 17) / 9),
            "made": team_selectValue1[i].shot_made_numeric,
            "attempts": 1
        });
    }

    //console.log(team_tenderData);

    var team_tenderData2 = [];
    for (var k = 0; k < team_selectValue2.length; k++) {
        team_tenderData2.push({
            "x": Math.ceil((team_selectValue2[k].loc_x + 243) / 10),
            "y": Math.ceil((team_selectValue2[k].loc_y + 17) / 9),
            "made": team_selectValue2[k].shot_made_numeric,
            "attempts": 1
        });
    }

    var team_coll = d3.nest()
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
        .entries(team_tenderData);


    var team_coll2 = d3.nest()
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
        .entries(team_tenderData2);

    var team_z = [];
    team_coll.forEach(function (a) {
        a.key = JSON.parse("[" + a.key + "]");
        team_z.push(a.values.shootingPercentage);
    });

    //var meanShot = (team_z.reduce(function(a, b){return a+b;}))/ team_z.length;
    var team_z_square = [];
    for (var j = 0; j < team_z.length; j++) {team_z_square[j] = team_z[j]*team_z[j]}
    //var shotSTDV = Math.sqrt((team_z_square.reduce(function(a,b){return a+b})- team_z.length*meanShot*meanShot)/ team_z.length);

    var team_finalData = [];
    team_coll.forEach(function (a) {
        var k = (a.values.shootingPercentage);
        team_finalData.push({"x": a.key[0], "y": a.key[1], "team_z": k, "made": a.values.made, "attempts": a.values.attempts})
    });

    var team_z2 = [];
    team_coll2.forEach(function (a) {
        a.key = JSON.parse("[" + a.key + "]");
        team_z2.push(a.values.shootingPercentage);
    });

    //var meanShot2 = (team_z2.reduce(function(a, b){return a+b;}))/ team_z2.length;
    var team_z_square2 = [];
    for (var l = 0; l < team_z2.length; l++) {team_z_square2[l] = team_z2[l]*team_z2[l]}
    //var shotSTDV2 = Math.sqrt((team_z_square2.reduce(function(a,b){return a+b})- team_z2.length*meanShot2*meanShot2)/ team_z2.length);

    var team_finalData2 = [];
    team_coll2.forEach(function (a) {
        var k2 = (a.values.shootingPercentage);
        team_finalData2.push({"x": a.key[0], "y": a.key[1], "team_z2": k2, "made": a.values.made, "attempts": a.values.attempts})
    });

    team_tenderData = team_finalData;
    var team_heatRange = ['#b3dfff',"#006BB6"];
    var team_court = d3.select("#team-shooting-chart")
        .select("svg")
        .attr("width",800)
        .attr("height", 350)
        .attr("viewBox", "0 0 60 60");

    team_tenderData2 = team_finalData2;
    var team_heatRange2 = [teamTocolor[opId][0], teamTocolor[opId][2]];
    var team_court_right = team_court.append("g")
        .attr("class", "team-court")
        .attr("transform", "rotate(90, 10,10)")
        .chart("team_BasketballShotChart", {
            width: 800,
            title: "",
            // instead of makes/attempts, use team_z
            hexagonFillValue: function (d) {

                return d.team_z;
            },
            // switch heat scale domain to [-2.5, 2.5] to reflect range of team_z values
            heatScale: d3.scale.quantile()
                .domain([0, 1])
                .range(team_heatRange),

            // update our binning algorithm to properly join team_z values
            // here, we update the team_z value to be proportional to the events of each point

            hexagonBin: function (point, bin) {
                var currentteam_z = bin.team_z || 0;
                var team_totalAttempts = bin.attempts || 0;
                var totalteam_z = currentteam_z * team_totalAttempts;

                var attempts = point.attempts || 1;
                bin.attempts = team_totalAttempts + attempts;
                bin.team_z = (totalteam_z + (point.team_z * attempts)) / bin.attempts;
            }
        });

    // Draw team color legend for court right:
    var team_legend = team_colorLegend.selectAll('path').data(team_heatRange);
    team_legend
        .enter()
        .append('path')
        .attr('d', team_hexagon)
        .attr("transform", function (d, i) {
            return "translate(" +
                (team_colorXStart  -colorXMid + ((1 + i*2) *largestHexagonRadius)) + ", " +
                (colorYStart + 20) + ")";
        })
        .style('fill', function (d, i) { return d; });

    team_legend.exit().remove();

    setTimeout(function(){
        team_court_right
            .draw(team_tenderData);
    }, 250);


    var team_court_left = team_court.append("g")
        .attr("class", "team-court")
        .attr("transform", "rotate(-90, 40, 10)")
        .chart("team_BasketballShotChart", {
            width: 800,
            title: "",
            // instead of makes/attempts, use team_z
            hexagonFillValue: function (d) {
                //console.log(team_z2)
                return d.team_z2;
            },
            // switch heat scale domain to [-2.5, 2.5] to reflect range of team_z values
            heatScale: d3.scale.quantile()
                .domain([0, 1])
                .range(team_heatRange2),

            // update our binning algorithm to properly join team_z values
            // here, we update the team_z value to be proportional to the events of each point

            hexagonBin: function (point, bin) {
                var currentteam_z = bin.team_z2 || 0;
                var team_totalAttempts = bin.attempts || 0;
                var totalteam_z = currentteam_z * team_totalAttempts;

                var attempts = point.attempts || 1;
                bin.attempts = team_totalAttempts + attempts;
                bin.team_z2 = (totalteam_z + (point.team_z2 * attempts)) / bin.attempts;
            }
        });

    // Draw team color legend for court left:
    var team_legend1 = team_colorLegend1.selectAll('.legend').data(team_heatRange2);

    team_legend1
        .enter()
        .append('path')
        .attr('d', team_hexagon1)
        .attr("transform", function (d, i) {
            return "translate(" +
                (team_colorXStart1 + 7.5 + ((1 + i*2) *largestHexagonRadius)) + ", " +
                (colorYStart + 20) + ")";
        })
        .style('fill', function (d, i) { return d; });

    team_legend1.exit().remove();

    setTimeout(function(){
        team_court_left
            .draw(team_tenderData2);
    }, 250);
}

function team_court_func(){
    d3.selectAll(".team-shot-chart").remove();
}
