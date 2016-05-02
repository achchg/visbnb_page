
function selectStatData(){
    var selectMatchStat=allStat.filter(function(d){return d.game_id==matchId});
    //console.log(selectMatchStat);
    boxscore_data.forEach(function(d) {
        switch (d.statType){
            case "Goals":
                d.teamValue[0]["teamId"]=refIdToName[selectMatchStat[0].team_id_x];
                d.teamValue[0]["value"]=selectMatchStat[0].fgm_x;
                d.teamValue[1]["teamId"]=refIdToName[selectMatchStat[0].team_id_y];
                d.teamValue[1]["value"]=selectMatchStat[0].fgm_y;
                //console.log(selectMatchStat[0].fgm_y);
                break;
            case "Rebounds":
                d.teamValue[0]["teamId"]=refIdToName[selectMatchStat[0].team_id_x];
                d.teamValue[0]["value"]=selectMatchStat[0].reb_x;
                d.teamValue[1]["teamId"]=refIdToName[selectMatchStat[0].team_id_y];
                d.teamValue[1]["value"]=selectMatchStat[0].reb_y;
                break;
            case "Assists":
                d.teamValue[0]["teamId"]=refIdToName[selectMatchStat[0].team_id_x];
                d.teamValue[0]["value"]=selectMatchStat[0].ast_x;
                d.teamValue[1]["teamId"]=refIdToName[selectMatchStat[0].team_id_y];
                d.teamValue[1]["value"]=selectMatchStat[0].ast_y;
                break;
            case "Steals":
                d.teamValue[0]["teamId"]=refIdToName[selectMatchStat[0].team_id_x];
                d.teamValue[0]["value"]=selectMatchStat[0].stl_x;
                d.teamValue[1]["teamId"]=refIdToName[selectMatchStat[0].team_id_y];
                d.teamValue[1]["value"]=selectMatchStat[0].stl_y;
                break;
            case "Blocks":
                d.teamValue[0]["teamId"]=refIdToName[selectMatchStat[0].team_id_x];
                d.teamValue[0]["value"]=selectMatchStat[0].blk_x;
                d.teamValue[1]["teamId"]=refIdToName[selectMatchStat[0].team_id_y];
                d.teamValue[1]["value"]=selectMatchStat[0].blk_y;
                break;
            case "Turnovers":
                d.teamValue[0]["teamId"]=refIdToName[selectMatchStat[0].team_id_x];
                d.teamValue[0]["value"]=selectMatchStat[0].tov_x;
                d.teamValue[1]["teamId"]=refIdToName[selectMatchStat[0].team_id_y];
                d.teamValue[1]["value"]=selectMatchStat[0].tov_y;
                break;
        }
    });
    updateStatBarchart();
}

function updateStatBarchart(){
/*
    d3.selectAll(".stat").remove();
    d3.selectAll(".legend").remove();
    d3.selectAll(".axis").remove();
    d3.select("#team-trad-bar-chart").select("svg").remove();

    var x0 = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var x1 = d3.scale.ordinal();

    var y = d3.scale.linear()
        .range([height, 0]);

    var color = d3.scale.ordinal()
        .range(["#41B6C4", "#FD8D3C"]);

    var xAxis = d3.svg.axis()
        .scale(x0)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");
        //.tickFormat(d3.format(".2s"));

    var svg = d3.select("#team-trad-bar-chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

*/

    //console.log(boxscore_data);

    stat_x0.domain(boxscore_data.map(function(d) { return d.statType; }));
    stat_x1.domain(statNames).rangeRoundBands([0, stat_x0.rangeBand()]);
    stat_y.domain([0, d3.max(boxscore_data, function(d) { return d3.max(d.teamValue, function(d) { return d.value; }); })]);
    //console.log(statNames);
    stat_xAxis.scale(stat_x0);
    stat_yAxis.scale(stat_y);

    var stat_color = d3.scale.ordinal()
        .range(["#006BB6", teamColors[sliderValue-1]]);
/*
    stat_svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(stat_xAxis);

    stat_svg.append("g")
        .attr("class", "y axis")
        .call(stat_yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Stats");
*/
    //stat_svg.transition();

    stat_svg
        .select("g.x-axis")
        .transition()
        .duration(300)
        .call(stat_xAxis);
    stat_svg
        .select("g.y-axis")
        .transition()
        .duration(300)
        .call(stat_yAxis)
       ;
    //var stat = stat_svg.selectAll(".stat")

    var stat = stat_svg.selectAll(".stat")
        .data(boxscore_data);
    //console.log(stat.enter());

    stat
        .enter().append("g")
        .attr("class", "stat")
        .attr("transform", function(d) { return "translate(" + stat_x0(d.statType) + ",0)"; });

    stat
        .attr("transform", function(d) { return "translate(" + stat_x0(d.statType) + ",0)"; });


    var rects=stat.selectAll("rect")
        .data(function(d) { return d.teamValue; });


    rects
        .enter().append("rect")
        .attr("width", stat_x1.rangeBand())
        .attr("x", function(d) { return stat_x1(d.teamId); })
        .attr("y", function(d) { return stat_y(d.value); })
        .attr("height", function(d) { return height - stat_y(d.value); })
        .style("fill", function(d) { return stat_color(d.teamId); });

    rects
        .attr("width", stat_x1.rangeBand())
        .attr("x", function(d) { return stat_x1(d.teamId); })
        .transition()
        .duration(300)
        .attr("y", function(d) { return stat_y(d.value); })
        .attr("height", function(d) { return height - stat_y(d.value); })
        .style("fill", function(d) {return stat_color(d.teamId); });

    rects.exit().transition().duration(300)
        .remove();

    stat.exit()
        .remove();

}