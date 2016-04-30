/**
 * Created by achchg on 4/30/16.
 */
/**
 * Created by achchg on 3/3/16.
 */
var margin = {
    top: 40,
    right: 40,
    bottom: 60,
    left: 60
};

var width = 1000 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

var formatnumber = d3.format(".0%");

var svg = d3.select("#chart-area").append("svg")
    .attr("width", width)
    .attr("height", height);

var projection = d3.geo.mercator()
    .scale(140000)
    .translate([width / 2, height / 2])
    .center([-71.1,42.313]);

var path = d3.geo.path()
    .projection(projection);

var data;
var green;
var color = d3.scale.quantize()
    .domain([0, 0.0005, 0.001,0.02,0.04, 0.05, 0.06, 0.1,0.11,0.12, 0.13])
    .range(["#d9f0a3","#addd8e", "#78c679", "#41ab5d", "#238443", "#006837"
    ]);


// Load data parallel
// Load shapes of world counties (TopoJSON)

queue()
    .defer(d3.json,"data/clip_boston_census.zip.geojson")
    /*   .defer(d3.csv,"data/green.csv") */
    .defer(d3.csv,"data/NDVI_TABLE_1138.csv")
    .await(function(error, data1, data2) {
        data = data1.features;
        green = data2;
        update_vis();
    });



function update_vis(){
    var selectValue = d3.select("#ranking-type").property("value");
    color.domain([0, d3.max(green, function(d) {
        return parseFloat(d[selectValue])
    })]);

    for (var i = 0; i < green.length; i++) {
        var census_id = parseFloat(green[i].NAME10);
        var census_value = parseFloat(green[i][selectValue]);
        for (var j = 0; j < data.length; j++) {
            var json_census_id = parseFloat(data[j].properties.NAME10);
            if (census_id == json_census_id) {
                data[j].properties.value = census_value;
                break;
            }
        }
    }

    var g = svg.append("g");

    var map = g.append("g")
        .selectAll("path")
        .data(data);

    map
        .enter().append("path")
        .attr("d", path);

    var value1;
    map.transition().duration(800)
        .style("fill", function(d) {
            //Get data value
            var value = d.properties.value;
            value1 = value;
            if (value) {
                //If value exists…
                return color(value);
            }
            else {
                //If value is undefined…
                return "#ccc";
            }
        })
        .style("opacity", 0.7);
    map.exit().remove();

    // Tooltip setup
    var tip = d3.tip().attr('class', 'd3-tip').html(function(d){
        console.log(d)
        return "<b>"+ "Green:" + formatnumber(d.properties.value);
    });

    map.call(tip);

// Tooltip show/hide
    map.on("mouseover", function(d) {
            d3.select(this).transition().duration(300).style("opacity", 1);
            tip.show(d);

        })
        .on("mouseout", function(d) {
            d3.select(this)
                .transition().duration(300)
                .style("opacity", 0.7);
            tip.hide(d);
        });

}


d3.select("#ranking-type").on("change", function() {
    // Update choropleth
    update_vis();

})

