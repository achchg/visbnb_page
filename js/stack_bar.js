/**
 * Created by pc on 4/19/2016.
 */


var padding=40;

var svg = d3.select("#stack-chart-area").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("class","stack")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



var stackx = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);


var stacky = d3.scale.linear()
    .range([height, 0]);

var stackxaxis = d3.svg.axis()
    .orient("bottom");

var stackyaxis = d3.svg.axis()
    .orient("left")
    .tickFormat(d3.format(".2s"));


svg.append("g")
    .attr("class","x-axis axis")
    .attr("transform", "translate(0,"+height+")");

svg.append("g")
    .attr("class","y-axis axis");





/*var xAxisGroup = svg.append("g")
    .attr("class", "x-axis axis");

var yAxisGroup = svg.append("g")
    .attr("class", "y-axis axis");*/

//var shot_zone_range;
var lineupcolor1 = d3.scale.ordinal()
    .range([ "#41b6c4","#2c7fb8","#253494"])
    .domain(["Jump", "Layup", "Others"]);
var lineupcolor2=d3.scale.ordinal()
    .range([ "#fd8d3c","#f03b20","#bd0026"])
    .domain(["Jump", "Layup", "Others"]);



var legend1=svg.selectAll(".legend1")
    .data(lineupcolor1.domain().slice().reverse())
    .enter().append("g")
    .attr("class", "legend1")
    .attr("transform", function (d, i) {
        return "translate(0," + (i * 20+10) + ")";
    });



legend1.append("rect")
    .attr("class", "rect-legend1")
    .attr("x", width - 38)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", lineupcolor1);

legend1.append("text")
    .attr("x", width - 40)
    .attr("y", 10)
    .attr("dy", ".35em")
    .style("text-anchor", "end")
    .text(function (d) {
        return d;
    });

var legend2=svg.selectAll(".legend2")
    .data(lineupcolor2.domain().slice().reverse())
    .enter().append("g")
    .attr("class", "legend2")
    .attr("transform", function (d, i) {
        return "translate(0," +(i * 20+10) + ")";
    });

legend2.append("rect")
    .attr("class", "rect-legend2")
    .attr("x", width - 18)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", lineupcolor2);

var stacktext=svg.append("g")
    .append("text")
    .attr("class","y-label")
    .attr("text-anchor","middle")
    .attr("x",40)
    .attr("y",-5)
    .style("font-size","12px")
    .attr("transform","rotate(90)")
    .text("Shot Attempted");


var titletext=svg.append("g")
    .append("text")
    .attr("class","stacktext")
    .attr("text-anchor","end")
    .attr("x",width)
    .attr("y",0)
    .style("font-size","18px");

titletext
    .style("cursor","pointer")
    .on("click",function(d){
    selectValue4="All"
    selectValue3="All"
    onchange4()
});




function Barchartdata() {




    //data wrangling player 1

    var Jump1 = 0;
    var Layup1 = 0;
    var Others1 = 0;
    var Jump12 = 0;
    var Layup12 = 0;
    var Others12 = 0;
    var Jump13 = 0;
    var Layup13 = 0;
    var Others13 = 0;
    var Jump14 = 0;
    var Layup14 = 0;
    var Others14 = 0;
    var Jump15 = 0;
    var Layup15 = 0;
    var Others15 = 0;
 //   console.log(typeof (data))
   // console.log(data_update.length)
   // console.log(data.length)
    var tmpplayer1_count=[];
    var tmpplayer2_count=[];

    for (var i = 0; i < data_update.length; i++) {

        if (data_update[i].shot_zone_range == "Less Than 8 ft.") {
            if (data_update[i].shot_type == "Jump") {
                Jump1 += 1;
            }
            else if (data_update[i].shot_type == "Layup") {
                Layup1 += 1;
            }
            else if (data_update[i].shot_type == "Others") {
                Others1 += 1;
            }
        }
        else if (data_update[i].shot_zone_range == "8-16 ft.") {
            if (data_update[i].shot_type == "Jump") {
                Jump12 += 1;
            }
            else if (data_update[i].shot_type == "Layup") {
                Layup12 += 1;
            }
            else if (data_update[i].shot_type == "Others") {
                Others12 += 1;
            }
        }
        else if (data_update[i].shot_zone_range == "16-24 ft.") {
            if (data_update[i].shot_type == "Jump") {
                Jump13 += 1;
            }
            else if (data_update[i].shot_type == "Layup") {
                Layup13 += 1;
            }
            else if (data_update[i].shot_type == "Others") {
                Others13 += 1;
            }
        }
        else if (data[i].shot_zone_range == "24+ ft.") {
            if (data_update[i].shot_type == "Jump") {
                Jump14 += 1;
            }
            else if (data_update[i].shot_type == "Layup") {
                Layup14 += 1;
            }
            else if (data_update[i].shot_type == "Others") {
                Others14 += 1;
            }
        }
        else if (data_update[i].shot_zone_range == "Back Court Shot") {
            if (data_update[i].shot_type == "Jump") {
                Jump15 += 1;
            }
            else if (data_update[i].shot_type == "Layup") {
                Layup15 += 1;
            }
            else if (data_update[i].shot_type == "Others") {
                Others15 += 1;
            }
        }
    }

   tmpplayer1_count.push({
            "shot_zone_range": "Less Than 8 ft.",
            "Jump": Jump1,
            "Layup": Layup1,
            "Others": Others1
        },
        {
            "shot_zone_range": "8-16 ft.",
            "Jump": Jump12,
            "Layup": Layup12,
            "Others": Others12
        },
        {
            "shot_zone_range": "16-24 ft.",
            "Jump": Jump13,
            "Layup": Layup13,
            "Others": Others13
        },
        {
            "shot_zone_range": "24+ ft.",
            "Jump": Jump14,
            "Layup": Layup14,
            "Others": Others14
        },
        {
            "shot_zone_range": "Back Court Shot",
            "Jump": Jump15,
            "Layup": Layup15,
            "Others": Others15
        });



    //data wrangling player2


    var Jump2 = 0;
    var Layup2 = 0;
    var Others2 = 0;
    var Jump22 = 0;
    var Layup22 = 0;
    var Others22 = 0;
    var Jump23 = 0;
    var Layup23 = 0;
    var Others23 = 0;
    var Jump24 = 0;
    var Layup24 = 0;
    var Others24 = 0;
    var Jump25 = 0;
    var Layup25 = 0;
    var Others25 = 0;
    for (var k = 0; k < data_update2.length; k++) {

        if (data_update2[k].shot_zone_range == "Less Than 8 ft.") {
            if (data_update2[k].shot_type == "Jump") {
                Jump2 += 1;
            }
            else if (data_update2[k].shot_type == "Layup") {
                Layup2 += 1;
            }
            else if (data_update2[k].shot_type == "Others") {
                Others2 += 1;
            }
        }
        else if (data_update2[k].shot_zone_range == "8-16 ft.") {
            if (data_update2[k].shot_type == "Jump") {
                Jump22 += 1;
            }
            else if (data_update2[k].shot_type == "Layup") {
                Layup22 += 1;
            }
            else if (data_update2[k].shot_type == "Others") {
                Others22 += 1;
            }
        }
        else if (data_update2[k].shot_zone_range == "16-24 ft.") {
            if (data_update2[k].shot_type == "Jump") {
                Jump23 += 1;
            }
            else if (data_update2[k].shot_type == "Layup") {
                Layup23 += 1;
            }
            else if (data_update2[k].shot_type == "Others") {
                Others23 += 1;
            }
        }
        else if (data_update2[k].shot_zone_range == "24+ ft.") {
            if (data_update2[k].shot_type == "Jump") {
                Jump24 += 1;
            }
            else if (data_update2[k].shot_type == "Layup") {
                Layup24 += 1;
            }
            else if (data_update2[k].shot_type == "Others") {
                Others24 += 1;
            }
        }
        else if (data_update2[k].shot_zone_range == "Back Court Shot") {
            if (data_update2[k].shot_type == "Jump") {
                Jump25 += 1;
            }
            else if (data_update2[k].shot_type == "Layup") {
                Layup25 += 1;
            }
            else if (data_update2[k].shot_type == "Others") {
                Others25 += 1;
            }
        }
    }
    tmpplayer2_count.push({
            "shot_zone_range": "Less Than 8 ft.",
            "Jump": Jump2,
            "Layup": Layup2,
            "Others": Others2
        },
        {
            "shot_zone_range": "8-16 ft.",
            "Jump": Jump22,
            "Layup": Layup22,
            "Others": Others22
        },
        {
            "shot_zone_range": "16-24 ft.",
            "Jump": Jump23,
            "Layup": Layup23,
            "Others": Others23
        },
        {
            "shot_zone_range": "24+ ft.",
            "Jump": Jump24,
            "Layup": Layup24,
            "Others": Others24
        },
        {
            "shot_zone_range": "Back Court Shot",
            "Jump": Jump25,
            "Layup": Layup25,
            "Others": Others25
        });

    player1_count=tmpplayer1_count;
    player2_count=tmpplayer2_count;

    //color.domain(d3.keys(player2_count[0]).filter(function(key) { return key !== "shot_zone_range"; }));



}







function updateBarchart() {
   // console.log("Hello")

    Barchartdata();
   player1_count.forEach(function (d) {

        var y0 = 0;
        d.counts = lineupcolor1.domain().map(function (name) {
            return {name: name, y0: y0, y1: y0 += +d[name]};
        });
       for(i=0;i< d.counts.length;i++){
           d.counts[i].shot_zone_range= d.shot_zone_range;
       }

        d.total = d.counts[d.counts.length - 1].y1;
    });
    player2_count.forEach(function (d) {
        var y0 = 0;
        d.counts = lineupcolor2.domain().map(function (name) {
            return {name: name, y0: y0, y1: y0 += +d[name]};
        });
        for(i=0;i< d.counts.length;i++){
            d.counts[i].shot_zone_range= d.shot_zone_range;
        }
        d.total = d.counts[d.counts.length - 1].y1;
    });


    if(selectValue4=="All"){
        if(selectValue3=="All"){
            updateBarchart1()
        }
        else{
            updateBarchart2()
        }
    }
    else{
        if(selectValue3=="All"){
            updateBarchart3()
        }
        else{
            updateBarchart4()
        }
    }

}




function updateBarchart1(){

    var combine = [player1_count[0], player1_count[1], player1_count[2], player1_count[3], player1_count[4],
        player2_count[0], player2_count[1], player2_count[2], player2_count[3], player2_count[4]];

    stackx.domain(["Less Than 8 ft.","8-16 ft.","16-24 ft.","24+ ft.","Back Court Shot"]);
    stacky.domain([0, d3.max(combine, function (d) {
        return d.total;
    })]);

    stackxaxis.scale(stackx)
    stackyaxis.scale(stacky)


    xAxisGroup = svg.select(".x-axis")
        .attr("transform", "translate(0," + height + ")")
        .transition()
        .duration(500)
        .call(stackxaxis);

    yAxisGroup = svg.select(".y-axis")
        .transition()
        .duration(500)
        .call(stackyaxis);



    var stackdata1=[]

    player1_count.forEach(function(d){
        stackdata1.push(d.counts[0]);
        stackdata1.push(d.counts[1]);
        stackdata1.push(d.counts[2]);
    })


    var rec1 = svg.selectAll(".rect3")
        .data(stackdata1);

    rec1.enter().append("rect")
        .attr("class", "rect3");
    rec1 .style("fill", function (d) {
            return lineupcolor1(d.name);
        })
        .transition()
        .duration(500)
        .attr("width", stackx.rangeBand()/2)
        .attr("x",function(d){
            return stackx(d.shot_zone_range);
        })
        .attr("y", function (d) {
            return stacky(d.y1);
        })
        .attr("height", function (d) {
            return stacky(d.y0) - stacky(d.y1);
        })
       ;
    rec1.exit().transition().remove();




    var stackdata2=[];

    player2_count.forEach(function(d){
        stackdata2.push(d.counts[0]);
        stackdata2.push(d.counts[1]);
        stackdata2.push(d.counts[2]);
    });


    var rec2 = svg.selectAll(".rect4")
        .data(stackdata2);

    rec2.enter().append("rect")
        .attr("class", "rect4")
    rec2.style("fill", function (d) {
            return lineupcolor2(d.name);
        })
        .transition()
        .duration(500)
        .attr("width", stackx.rangeBand()/2)
        .attr("x",function(d){
            return stackx(d.shot_zone_range);
        })
        .attr("y", function (d) {
            return stacky(d.y1);
        })
        .attr("height", function (d) {
            return stacky(d.y0) - stacky(d.y1);
        })

        .attr("transform", function (d) {
            return "translate(" + stackx.rangeBand()/2 + ",0)";
        });
    rec2.exit().transition().remove();

 titletext
        .transition()
        .duration(500)
        .text();

    d3.select("#stack-chart-area")
        .selectAll("text")
        .filter(function(d){
            return typeof(d)=="string"&&(d=="Jump"|d=="Layup"|d=="Others")
        })
        .style("cursor","pointer")
        .on("click",function(d){
            selectValue3=d;
            onchange3();
        })

    d3.select("#stack-chart-area")
        .selectAll("text")
        .filter(function(d){
            return typeof(d)=="string"&&(d!="Jump"&&d!="Layup"&&d!="Others")
        })
        .style("cursor","pointer")
        .on("click",function(d){
            selectValue4=d;
            onchange4();
        })



}

//in one shot type
function updateBarchart2(){

   // console.log(player1_count)
   // console.log(player2_count)

    var tmpplayer1=[]
    var tmpplayer2=[]
    for(i=0;i<5;i++){
       if(selectValue3=="Jump"){

           tmpplayer1.push(player1_count[i].counts[0])
           tmpplayer2.push(player2_count[i].counts[0])
       }
        if(selectValue3=="Layup"){
            tmpplayer1.push(player1_count[i].counts[1])
            tmpplayer2.push(player2_count[i].counts[1])
        }
        if(selectValue3=="Others"){
            tmpplayer1.push(player1_count[i].counts[2])
            tmpplayer2.push(player2_count[i].counts[2])
        }
    }
//console.log(tmpplayer1)


    var hei=[]
    tmpplayer1.forEach(function(d){
        hei.push(d.y1- d.y0);
    })
    tmpplayer2.forEach(function(d){
        hei.push(d.y1- d.y0)
    })

    var max=d3.max(hei);
    stackx.domain( ["Less Than 8 ft.","8-16 ft.","16-24 ft.","24+ ft.","Back Court Shot"]);
    stacky.domain([0,max]);


    stackxaxis.scale(stackx)
    stackyaxis.scale(stacky)




    xAxisGroup = svg.select(".x-axis")
        .attr("transform", "translate(0," + height + ")")
        .transition()
        .duration(500)
        .call(stackxaxis);

    yAxisGroup = svg.select(".y-axis")
        .transition()
        .duration(500)
        .call(stackyaxis);




    var rec1 = svg.selectAll(".rect3")
        .data(tmpplayer1);

    rec1.enter().append("rect")
        .attr("class", "rect3");
    rec1.style("fill", function (d) {
            return lineupcolor1(d.name);
        })
        .transition()
        .duration(500)
        .attr("width", stackx.rangeBand()/2)
        .attr("x",function(d){
            return stackx(d.shot_zone_range);
        })
        .attr("y", function (d) {
            no= d.y1- d.y0
            return stacky(no);
        })
        .attr("height", function (d) {
            no= d.y1- d.y0
            return height-stacky(no);
        })
        ;
    rec1.exit().transition().remove();






    var rec2 = svg.selectAll(".rect4")
        .data(tmpplayer2);

    rec2.enter().append("rect")
        .attr("class", "rect4");
    rec2 .style("fill", function (d) {
            return lineupcolor2(d.name);
        })
        .transition()
        .duration(500)
        .attr("width", stackx.rangeBand()/2)
        .attr("x",function(d){
            return stackx(d.shot_zone_range);
        })
        .attr("y", function (d) {
            no= d.y1- d.y0
            return stacky(no);
        })
        .attr("height", function (d) {
            no= d.y1- d.y0
            return height-stacky(no);
        })

        .attr("transform", function (d) {
            return "translate(" + stackx.rangeBand()/2 + ",0)";
        });
    rec2.exit().transition().remove();


        titletext.transition()
        .duration(500)
        .text(selectValue3)




    d3.select("#stack-chart-area")
        .selectAll("text")
        .filter(function(d){
            return typeof(d)=="string"&&(d=="Jump"|d=="Layup"|d=="Others")
        })
        .style("cursor","pointer")
        .on("click",function(d){
            selectValue3=d;
            onchange3();
        })

    d3.select("#stack-chart-area")
        .selectAll("text")
        .filter(function(d){
            return typeof(d)=="string"&&(d!="Jump"&&d!="Layup"&&d!="Others")
        })
        .style("cursor","pointer")
        .on("click",function(d){
            selectValue4=d;
            onchange4();
        })









}
//in one shot range
function updateBarchart3(){


    tmpplayer1=player1_count.filter(function(d){
        return d.shot_zone_range==selectValue4
    })
    tmpplayer2=player2_count.filter(function(d){
        return d.shot_zone_range==selectValue4;
    })


    var max=Math.max(tmpplayer1[0].Jump,tmpplayer1[0].Layup,tmpplayer1[0].Others,tmpplayer2[0].Jump,tmpplayer2[0].Layup,tmpplayer2[0].Others);
    stackx.domain(["Jump","Layup","Others"]);
    stacky.domain([0,max]);
//console.log(Math.max(tmpplayer1[0].Jump,tmpplayer1[0].Layup,tmpplayer1[0].Others,tmpplayer2[0].Jump,tmpplayer2[0].Layup,tmpplayer2[0].Others))

    stackxaxis.scale(stackx)
    stackyaxis.scale(stacky)



    xAxisGroup = svg.select(".x-axis")
        .attr("transform", "translate(0," + height + ")")
        .transition()
        .duration(500)
        .call(stackxaxis);

    yAxisGroup = svg.select(".y-axis")
        .transition()
        .duration(500)
        .call(stackyaxis);

    console.log(tmpplayer1[0]);
    console.log(tmpplayer2[0]);



    var rec1 = svg.selectAll(".rect3")
        .data(tmpplayer1[0].counts);

    rec1.enter().append("rect")
        .attr("class", "rect3");
    rec1.style("fill", function (d) {
            return lineupcolor1(d.name);
        })
        .transition()
        .duration(500)
        .attr("width", stackx.rangeBand()/2)
        .attr("x",function(d){
            return stackx(d.name);
        })
        .attr("y", function (d) {
            no= d.y1- d.y0
            return stacky(no);
        })
        .attr("height", function (d) {
            no= d.y1- d.y0
            return height-stacky(no);
        })
        ;
    rec1.exit().transition().remove();






    var rec2 = svg.selectAll(".rect4")
        .data(tmpplayer2[0].counts);

    rec2.enter().append("rect")
        .attr("class", "rect4");
    rec2.style("fill", function (d) {
            return lineupcolor2(d.name);
        })
        .transition()
        .duration(500)
        .attr("width", stackx.rangeBand()/2)
        .attr("x",function(d){
            return stackx(d.name);
        })
        .attr("y", function (d) {
            no= d.y1- d.y0
            return stacky(no);
        })
        .attr("height", function (d) {
            no= d.y1- d.y0
            return height-stacky(no);
        })

        .attr("transform", function (d) {
            return "translate(" + stackx.rangeBand()/2 + ",0)";
        });
    rec2.exit().transition().remove();

    titletext
        .transition()
        .duration(500)
        .text(selectValue4);


    d3.select("#stack-chart-area")
        .selectAll("text")
        .filter(function(d){
            return typeof(d)=="string"&&(d=="Jump"|d=="Layup"|d=="Others")
        })
        .style("cursor","pointer")
        .on("click",function(d){
            selectValue3=d;
            onchange3();
        })

}



//in one shot range and shot type
function updateBarchart4(){


    var tmpplayer1=[]
    var tmpplayer2=[]


    var tmptmpplayer1=player1_count.filter(function(d){
        return d.shot_zone_range==selectValue4
    })
    var tmptmpplayer2=player2_count.filter(function(d){
        return d.shot_zone_range==selectValue4;
    })
    //console.log("Hello")
    console.log(selectValue4)
    console.log(tmptmpplayer1)

        if(selectValue3=="Jump"){

            tmpplayer1=tmptmpplayer1[0].counts[0]
            tmpplayer2=tmptmpplayer2[0].counts[0]
        }
        if(selectValue3=="Layup"){
            tmpplayer1=(tmptmpplayer1[0].counts[1])
            tmpplayer2=(tmptmpplayer2[0].counts[1])
        }
        if(selectValue3=="Others"){
            tmpplayer1=(tmptmpplayer1[0].counts[2])
            tmpplayer2=(tmptmpplayer2[0].counts[2])
        }


    console.log(tmpplayer1)






 //   console.log(tmpplayer1)

    //var max=Math.max(tmpplayer1layer1[0].Others,tmpplayer2[0].Jump,tmpplayer2[0].Layup,tmpplayer2[0].Others);






    var max=Math.max((tmpplayer1.y1-tmpplayer1.y0),(tmpplayer2.y1-tmpplayer2.y0));
  //  console.log(max)
    stackx.domain([selectValue4]);
    stacky.domain([0,max]);


    stackxaxis.scale(stackx)
    stackyaxis.scale(stacky)





    xAxisGroup = svg.select(".x-axis")
        .attr("transform", "translate(0," + height + ")")
        .transition()
        .duration(500)
        .call(stackxaxis);

    yAxisGroup = svg.select(".y-axis")
        .transition()
        .duration(500)
        .call(stackyaxis);




    var rec1 = svg.selectAll(".rect3")
        .data([tmpplayer1])
//console.log("Hello")
    rec1.enter()
        .append("rect")
        .attr("class", "rect3");
    rec1.transition()
        .duration(500)
        .attr("width", stackx.rangeBand()/4)
        .attr("x",function(d){
            return stackx(d.shot_zone_range)+stackx.rangeBand()/4;
        })
        .attr("y", function (d) {
            no= d.y1- d.y0
            return stacky(no);
        })
        .attr("height", function (d) {
            no= d.y1- d.y0
            return height-stacky(no);
        })
        .style("fill", function (d) {
            return lineupcolor1(d.name);
        })

    rec1.exit().transition().remove();






    var rec2 = svg.selectAll(".rect4")
        .data([tmpplayer2]);

    rec2.enter().append("rect")
        .attr("class", "rect4");
    rec2.transition()
        .duration(500)
        .attr("width", stackx.rangeBand()/4)
        .attr("x",function(d){
            console.log(stackx(d.shot_zone_range))
            return stackx(d.shot_zone_range);
        })
        .attr("y", function (d) {
            no= d.y1- d.y0
            return stacky(no);
        })
        .attr("height", function (d) {
            no= d.y1- d.y0
            return height-stacky(no);
        })
        .style("fill", function (d) {
            return lineupcolor2(d.name);
        })
        .attr("transform", function (d) {
            return "translate(" + stackx.rangeBand()/2 + ",0)";
        });
    rec2.exit().transition().remove();


    titletext.transition()
        .duration(500)
        .text(selectValue3+" "+selectValue4);

}
