

function updateRadarVisualization1(){

	var radardata1=radardata.filter(function (d) {
		return(d.player_name==selectValue)
	});
	d1=radardata1.map(function(d){
		a=[{axis:"Assists",value: d.ast,description:"An assist occurs when a player completes a pass to a teammate that directly leads to a made field goal."},
			{axis:"Blocks",value: d.blk,description:"A block occurs whenand offensive player attempts a shot, and the defense player tips the ball, " +
			"blocking their chance to score."},
			{axis:"Rebounds",value: d.reb,description:"A rebound occurs when a player recovers the ball after a  missed shot. This statistic is the " +
			"number of total rebounds a player or team has collected on either offense of defense."},
			{axis:"Personal Fouls",value: d.pf,description:"The total number of fouls that a player or team has committed"},

			{axis:"Turnovers",value: d.tov,description:"A turnover occurs when the team on offense loses the ball to the defense."},
			{axis:"Steals",value: d.stl,description:"A steal occurs when a defensive player takes the ball from a player on offense, causing a turnover."}];
		return a
	});

	var w = 140,
		h = 140;

	//var colorscale = d3.scale.category10();
	//var console.log(colorscale)
	var colorscale1=['#A1DAB4','#41B6C4'];


//Legend titles
	var LegendOptions1 = ['Regular','Playoff'];


//Options for the Radar chart, other than default
	var mycfg1 = {
		w: w,
		h: h,
		maxValue: 0.6,
		levels: 6,
		ExtraWidthX: 300
	}



//Call function to draw the Radar chart
//Will expect that data is in %'s
	RadarChart.draw("#radar-chart1",d1, mycfg1,colorscale1);

////////////////////////////////////////////
/////////// Initiate legend ////////////////
////////////////////////////////////////////

	var svg1 = d3.select('#radar-chart1')
		.selectAll('svg')
		.append('svg')
		.attr("width", w+100)
		.attr("height",h);

//Create the title for the legend
	var text1 = svg1.append("text")
		.attr("class", "title")
		.attr('transform', 'translate(90,0)')
		.attr("x", w - 65)
		.attr("y", 10)
		.attr("font-size", "10px")
		.attr("fill", "#404040")
		.text("Season Type");

//Initiate Legend
	var legend1 = svg1.append("g")
		.attr("class", "legend")
		.attr("height", 100)
		.attr("width", 100)
		.attr('transform', 'translate(90,20)')
		;
	//Create colour squares
	legend1.selectAll('rect')
		.data(LegendOptions1)
		.enter()
		.append("rect")
		.attr("x", w - 50)
		.attr("y", function(d, i){ return i * 10-5;})
		.attr("width", 8)
		.attr("height", 8)
		.style("fill", function(d, i){
			//console.log(colorscale1[i])
			return colorscale1[i];})
	;
	//Create text next to squares
	legend1.selectAll('text')
		.data(LegendOptions1)
		.enter()
		.append("text")
		.attr("x", w - 40)
		.attr("y", function(d, i){ return i * 10 + 4;})
		.attr("font-size", "8px")
		.attr("fill", "#737373")
		.text(function(d) { return d; })

}

function updateRadarVisualization2(){
	var radardata2=radardata.filter(function (d) {
		return(d.player_name==selectValue2)
	})
	d2=radardata2.map(function(d){
		a=[{axis:"Assists",value: d.ast,description:"An assist occurs when a player completes a pass to a teammate that directly leads to a made field goal."},
			{axis:"Blocks",value: d.blk,description:"A block occurs whenand offensive player attempts a shot, and the defense player tips the ball, " +
			"blocking their chance to score."},
			{axis:"Rebounds",value: d.reb,description:"A rebound occurs when a player recovers the ball after a  missed shot. This statistic is the " +
			"number of total rebounds a player or team has collected on either offense of defense."},
			{axis:"Personal Fouls",value: d.pf,description:"The total number of fouls that a player or team has committed"},

			{axis:"Turnovers",value: d.tov,description:"A turnover occurs when the team on offense loses the ball to the defense."},
			{axis:"Steals",value: d.stl,description:"A steal occurs when a defensive player takes the ball from a player on offense, causing a turnover."}];

		return a
	});
	var w = 140,
		h = 140;

	//var colorscale = d3.scale.category10();
	var colorscale2=['#FD8D3C','#F03B20'];

//Legend titles
	var LegendOptions2 = ['Regular','Playoff'];


//Options for the Radar chart, other than default
	var mycfg2 = {
		w: w,
		h: h,
		maxValue: 0.6,
		levels: 6,
		ExtraWidthX: 300
	};



//Call function to draw the Radar chart
//Will expect that data is in %'s
	RadarChart.draw("#radar-chart2",d2, mycfg2,colorscale2);

////////////////////////////////////////////
/////////// Initiate legend ////////////////
////////////////////////////////////////////


	var svg2 = d3.select('#radar-chart2')
		.selectAll('svg')
		.append('svg')
		.attr("width", w+100)
		.attr("height",h);

//Create the title for the legend
	var text2 = svg2.append("text")
		.attr("class", "title")
		.attr('transform', 'translate(90,0)')
		.attr("x", w - 65)
		.attr("y", 10)
		.attr("font-size", "10px")
		.attr("fill", "#404040")
		.text("Season Type");

//Initiate Legend
	var legend2 = svg2.append("g")
		.attr("class", "legend")
		.attr("height", 100)
		.attr("width", 100)
		.attr('transform', 'translate(90,20)')
		;
	//Create colour squares
	legend2.selectAll('rect')
		.data(LegendOptions2)
		.enter()
		.append("rect")
		.attr("x", w - 50)
		.attr("y", function(d, i){ return i * 10-5;})
		.attr("width", 8)
		.attr("height", 8)
		.style("fill", function(d, i){
			//console.log(colorscale1[i])
			return colorscale2[i];})
	;
	//Create text next to squares
	legend2.selectAll('text')
		.data(LegendOptions2)
		.enter()
		.append("text")
		.attr("x", w - 40)
		.attr("y", function(d, i){ return i * 10 + 4;})
		.attr("font-size", "8px")
		.attr("fill", "#737373")
		.text(function(d) { return d; })



}

