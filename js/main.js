/*
stage 1: 41400141-44
stage 2: 41400221-26
stage 3: 41400311-15
stage 4: 41400401-06
    */
var matchids;
loopNum=4;
matchSelect();

//var scoreSVG = d3.select(".score-div").append("svg").attr("width", 160).attr("height", 160);

$('#timeline').slider().on('change',function(value){
    sliderValue = $('#timeline').data('slider').getValue();
    opId=opList[sliderValue-1];
    d3.select("#team2-img").attr("src","img/"+opId+".png");
    d3.select("#team2-title").text(refIdToName[opId]).style("color",teamColors[sliderValue-1]);
    d3.select("#donut-title2").style("color",teamColors[sliderValue-1]);
    matchSelect();
    setButton();
    ;
});

function matchSelect(){
    switch (sliderValue){
        case 1:
            loopNum=4;
            gameIdBase=41400140;
            break;
        case 2:
            loopNum=6;
            gameIdBase=41400220;
            break;
        case 3:
            loopNum=5;
            gameIdBase=41400310;
            break;
        case 4:
            loopNum=6;
            gameIdBase=41400400;
            break;
    }

    $(".match-button").map(function(){
        //console.log(($(this).attr("class")));
        if($(this).is(".disabled")){
            $(this).removeClass("disabled")
        }
        if (this.id.replace("match","")>loopNum&&this.id.replace("match","")!="-overall"){
            $(this).addClass("disabled");
        }
    });

    $("#match-overall").trigger("click");
    //console.log("start");

}

$(".match-button").click(function(){
    if(this.id=="match3"){
        //if(this.class)
        if($("#match3").attr("class").indexOf("expose")!=-1){
            console.log($("#match3").attr("class"));
            $("#btn-step-9").trigger("click");
        }
    }
    if(this.id!="match-overall"){
        matchSeriesId=parseInt(this.id.replace("match",""));
        setMatchId();
        afterBtnClickUpdate(matchId);
    }else{
        matchids=[];
        for (var i=1;i<=loopNum;i++){
            matchids.push("00" + (i+ gameIdBase).toString());
        }
        matchSeriesId=8;
        //teamShootingChartId=matchids;
        setMatchId();
        afterBtnClickUpdate(matchids);
        show_stage_story();
        //updateTeamVisualiteam_zation(matchids);
    }
    //afterBtnClickUpdate();

});


function setMatchId() {
    matchId = "00" + (matchSeriesId + gameIdBase).toString();
    opId = opList[sliderValue - 1];
    statNames[1] = refIdToName[opId];
}

function afterBtnClickUpdate(gameid){
    updateTeamVisualiteam_zation(gameid);
    selectStatData();
    displayScore();
    updateDonut(gameid);
}

//load stat bar chart data
queue()
    .defer(d3.csv,"data/gamelog_average.csv")
    .defer(d3.csv,"data/story.csv")
    .await(function(error, data1, data2){
        data1.forEach(function(d){
            if (error) throw error;
            // Convert numeric values to 'numbers'
            d.fgm_x=+d.fgm_x;
            d.reb_x=+d.reb_x;
            d.ast_x=+d.ast_x;
            d.stl_x=+d.stl_x;
            d.blk_x=+d.blk_x;
            d.tov_x=+d.tov_x;
            d.pts_x=+d.pts_x;
            d.fgm_y=+d.fgm_y;
            d.reb_y=+d.reb_y;
            d.ast_y=+d.ast_y;
            d.stl_y=+d.stl_y;
            d.blk_y=+d.blk_y;
            d.tov_y=+d.tov_y;
            d.pts_y=+d.pts_y;
        });
        for(var i = 0; i<data2.length; i++){
            data1[i].story= data2[i].story;
        }
        allStat=data1;
        statDataFlag=true;
        displayScore();
        setButton();
        selectStatData();
        show_stage_story();

    });


//team-shooting-chart
d3.csv("data/team_shots.csv", function(error, csv) {
    csv.forEach(function(d) {

        // Convert numeric values to 'numbers'
        d.loc_x = +d.loc_x * 10;
        d.loc_y = (+d.loc_y-5.25)*10;
        d.period = +d.period;
        d.shot_made_numeric = +d.shot_made_numeric;

    });
    // Store csv data in global variable
    team_data = csv;
    $("#match-overall").trigger("click");

    //updateTeamVisualiteam_zation(matchId);
});

function setButton(){
    d3.selectAll(".disabled").style("background-color","#333");
    var results=allStat.filter(function(d){return d.team_id_y==opId});
    results.forEach(function(value,index){
        //console.log(index);
        var buttonColor,buttonText;
        if(value.wl_x=="W"){
            buttonColor=gswColor;
            //buttonText="W";
        }else if(value.wl_x=="L"){
            buttonColor=teamColors[sliderValue-1];
            //buttonText="L";
        }
        d3.select("#match"+(index+1).toString()).style("background-color",buttonColor);

    });
    //d3.select(".match-button").text(refIdToName[opId]).style("color",teamColors[sliderValue-1]);


}

function displayScore(){
    //allStat.filter(function(d){return d.game_id=matchId});
    var scores=allStat.filter(function(d){return d.game_id==matchId});
    //console.log(allStat);
    var score1=scores[0].pts_x;
    var score2=scores[0].pts_y;
    //$("#match-title").text(scores[0].matchup_x);
    if (matchSeriesId != 8) {
        var textColor;
        if(scores[0].wl_x=="W"){
            textColor=gswColor;
        }else{
            textColor=teamColors[sliderValue-1];
        }
        $("#stat-title").text("Match " + matchSeriesId.toString()).css('color',textColor);
    } else {

        $("#stat-title").text("Overall Stats");
        //.css("color","#FDB927")
    }

    scoreSVG1.selectAll("text")
        .data([score1])
        .enter()
        .append("text")
        .attr("class","score-text").attr("x",0).attr("y",20).attr("fill",gswColor).style("text-anchor","middle")
        .text(function(d){return d});

    //console.log(scoreSVG.selectAll("text").enter());
    scoreSVG1.selectAll("text")
        .transition()
        .duration(300)
        .tween( 'text',function(d){
            var currentValue=+this.textContent;
            var i=d3.interpolateRound( currentValue, score1 );
            return function(t) {
                this.textContent = i(t);
            };
        } );

    scoreSVG2.selectAll("text")
        .data([score2])
        .enter()
        .append("text")
        .attr("class","score-text").attr("x",0).attr("y",20).style("text-anchor","middle")
        .text(function(d){return d});

    //console.log(scoreSVG.selectAll("text").enter());
    scoreSVG2.selectAll("text")
        .transition()
        .duration(300)
        .attr("fill",teamColors[sliderValue-1])
        .tween( 'text',function(d){
            var currentValue=+this.textContent;
            var i=d3.interpolateRound( currentValue, score2 );
            return function(t) {
                this.textContent = i(t);
            };
        } );

    //console.log(scoreSVG.selectAll("text").exit());



    //d3.select("#team1-score").text(score1).style("color",gswColor);
    //d3.select("#team2-score").text(score2).style("color",teamColors[sliderValue-1]);
}

//by Yufei



function updateDonut(gameid){
    var donutData_GSW;
    var donutData_op;

    if (typeof(gameid)=="string"){
        donutData_GSW = team_data.filter(function(d){return d.game_id==gameid&& d.team_id=="1610612744"&& d.shot_made_numeric==1});
        donutData_op = team_data.filter(function(d){return d.game_id==gameid&& d.team_id !="1610612744"&& d.shot_made_numeric==1});

    }else{
        donutData_GSW=[];
        donutData_op=[];
        for (var i=0;i<gameid.length;i++) {
            //console.log(gameid[i]);
            var temp1 = team_data.filter(function (d) {
                return (d.game_id == gameid[i] && d.team_id=="1610612744")
            });
            var temp2 = team_data.filter(function (d) {
                return (d.game_id == gameid[i] && d.team_id!="1610612744")
            });
            donutData_GSW=donutData_GSW.concat(temp1);
            donutData_op=donutData_op.concat(temp2);
        }
    }


    var donut_d1=0; var donut_d2=0; var donut_d3=0;

    donutData_GSW.forEach(function(d){
        //console.log(d);
        if (parseInt(d.shot_distance) < 8){
            donut_d1 +=1;
        }else if(parseInt(d.shot_distance) >= 8 && parseInt(d.shot_distance) < 24){
            donut_d2 +=1;
        }else{
            donut_d3 +=1;
        }
    });

    var donut_d1_op=0; var donut_d2_op=0; var donut_d3_op=0;

    donutData_op.forEach(function(d){
        //console.log(d);
        if (parseInt(d.shot_distance) < 8){
            donut_d1_op +=1;
        }else if(parseInt(d.shot_distance) >= 8 && parseInt(d.shot_distance) < 24){
            donut_d2_op +=1;
        }else{
            donut_d3_op +=1;
        }
    });
    var percentage_d1=donut_d1/(donut_d1+donut_d2+donut_d3);
    var percentage_d2=donut_d2/(donut_d1+donut_d2+donut_d3);
    var percentage_d3=donut_d3/(donut_d1+donut_d2+donut_d3);

    var percentage_d1_op=donut_d1_op/(donut_d1_op+donut_d2_op+donut_d3_op);
    var percentage_d2_op=donut_d2_op/(donut_d1_op+donut_d2_op+donut_d3_op);
    var percentage_d3_op=donut_d3_op/(donut_d1_op+donut_d2_op+donut_d3_op);

    var percentageFormat = d3.format("%");

    var radius = 110;
    var donut1=[{Distance:"<8ft",count:donut_d1,per:percentageFormat(percentage_d1)},{Distance:"8-24",count:donut_d2,per:percentageFormat(percentage_d2)},{Distance:">24",count:donut_d3,per:percentageFormat(percentage_d3)}];
    var donut2=[{Distance:"<8ft",count:donut_d1_op,per:percentageFormat(percentage_d1_op)},{Distance:"8-24",count:donut_d2_op,per:percentageFormat(percentage_d2_op)},{Distance:">24",count:donut_d3_op,per:percentageFormat(percentage_d3_op)}];


    //console.log(donut1);
    var donut_arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(radius - 50);


    var donut_pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.count; });


    var path = g.selectAll("path")
        .data(donut_pie(donut1));
    path.enter().append("path")
        .attr("class","piechart")
        .attr("fill", function(d,i){ return donut_color(d.data.Distance); })
        .each(function(d){ this._current = d; })
        .attr("d", donut_arc);

    path.transition()
        .duration(500)
        .attr("d", donut_arc)
        .attrTween("d", arcTween);

    var legend_list=["<8ft","8-24ft",">24ft"];

    //GSW label
    var t=g.selectAll("text.label")
        .data(donut_pie(donut1));
    t.enter().append("text")
        .attr("class","label");

    t.transition().duration(500)
        .attr("transform", function(d) {
            d.outerRadius = radius-10; // Set Outer Coordinate
            d.innerRadius = (radius - 30);
            return "translate(" + donut_arc.centroid(d) + ")"; })
        .style("text-anchor", "middle")
        .attr("dy", ".35em")
        .style('fill', 'white')
        .style("font-size", "10px")
        .attr("font-family","Arial")
        .text(function(d) { return d.data.per;});

    //GSW legend
    var legend1=scoreSVG1.selectAll(".legend1")
        .data(donut_color.domain().slice().reverse())
        .enter().append("g")
        .attr("class", "legend1")
        .attr("transform", function (d, i) {
            return "translate(-150," + (i * 20-115) + ")";
        });

    legend1.append("rect")
        .attr("class", "rect-legend1")
        .attr("x", 250 )
        .attr("width", 12)
        .attr("height", 12)
        .style("fill", donut_color);

    var text1=scoreSVG1.selectAll("text.legend1")
        .data(donut_color.domain().slice().reverse());
    text1.enter().append("text");
    text1.transition().duration(500)
        .attr("x", 250 - 99)
        .attr("y", function(d, i){ return  (i*20)-110 ;})
        .attr("dy", ".35em")
        .attr("class","legend1")
        .style("text-anchor", "end")
        .text(function (d,i) {return legend_list[i];
        });




    //op donut
    var donut_color_op = d3.scale.ordinal()
        .range(teamTocolor[donutData_op[0].team_id]);

    //console.log(teamTocolor[donutData_op[0].team_id].slice().reverse());

    //var g2 = scoreSVG2.append('g');
    var path2 = g2.selectAll("path")
        .data(donut_pie(donut2));
    path2.enter().append("path")
        .attr("class","piechart")
        .each(function(d){ this._current = d; });
    //.attr("d", donut_arc);
    path2.attr("fill", function(d,i){ return donut_color_op(d.data.Distance); })
        .transition()
        .duration(500)
        .attr("d", donut_arc)
        .attrTween("d", arcTween);

    //op donut text

    var t2=g2.selectAll("text.label2")
        .data(donut_pie(donut2));
    t2.enter().append("text")
        .attr("class","label2");

    t2.transition().duration(500)
        .attr("transform", function(d) {
            //d.outerRadius = radius-10; // Set Outer Coordinate
            //d.innerRadius = (radius - 50)/2;
            return "translate(" + donut_arc.centroid(d) + ")"; })
        .style("text-anchor", "middle")
        .attr("dy", ".35em")
        .style('fill', 'white')
        .attr("font-family","Arial")
        .style("font-size", "10px")
        .text(function(d) { return d.data.per;});

    //legend op
    scoreSVG2.selectAll(".legend2").remove();
    var legend2=scoreSVG2.selectAll(".legend2")
        .data(teamTocolor[donutData_op[0].team_id].slice().reverse())
        .enter().append("g")
        .attr("class", "legend2")
        .attr("transform", function (d, i) {
            return "translate(-60," + (i * 20-110) + ")";
        });

    legend2.append("rect").attr("class", "rect-legend2")
        .attr("x", 250-50 )
        .attr("width", 12)
        .attr("height", 12)
        .style("fill", donut_color_op);

    var text2=scoreSVG2.selectAll("text.legend2")
        .data(teamTocolor[donutData_op[0].team_id].slice().reverse());
    text2.enter().append("text");
    text2
        .attr("x",  135)
        .attr("y", function(d, i){ return  (i*20)-104 ;})
        .attr("dy", ".35em")
        .attr("class","legend2")
        .style("text-anchor", "end")
        .text(function (d,i) {return legend_list[i];
        });

    function arcTween(a) {
        var i = d3.interpolate(this._current, a);
        this._current = i(0);
        return function(t) {
            return donut_arc(i(t));
        };
    }

}




function show_stage_story(){
    var stage = stage_story.filter(function(d){return d.match_id==matchId});
    d3.select("#change_stage_text_onclick").text(stage[0].text);
}

