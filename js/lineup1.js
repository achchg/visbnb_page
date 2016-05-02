/**
 * Created by pc on 4/18/2016.
 */
function updatelineup1() {

    //draw lineup
    var nodes = flatten1(root1),
        links = d3.layout.tree().links(nodes);

    // Restart the force layout.
    force1.nodes(nodes)
        .links(links)
        .gravity(0.05)
        .charge(-1500)
        .linkDistance(100)
        .friction(0.5)
        .linkStrength(function(l, i) {return 1; })
        .size([w, h])
        .on("tick", tick)
        .start();

    var path = vis1.selectAll("path.link")
        .data(links, function(d) { return d.target.id; });

    path.enter().insert("svg:path")
        .attr("class", "link")
        // .attr("marker-end", "url(#end)")
        .style("stroke", "#eee");


    // Exit any old paths.
    path.exit().remove();



    // Update the nodes…
    var node = vis1.selectAll("g.node")
        .data(nodes, function(d) { return d.id; });


    // Enter any new nodes.
    var nodeEnter = node.enter().append("svg:g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
        .on("click", click1)
        .call(force1.drag);

    // Append a circle
    nodeEnter.append("svg:circle")
        .attr("r", function(d) { return Math.sqrt(d.size) / 10 || 4.5; })
        .style("fill", "#eee");


    // Append images
    var images = nodeEnter.append("svg:image")
        .attr("xlink:href",  function(d) { return d.img;})
        .attr("x", function(d) { return -25;})
        .attr("y", function(d) { return -25;})
        .attr("height", 100)
        .attr("width", 100);

    // make the image grow a little on mouse over and add the text details on click
    var setEvents = images
    // Append hero text
        .on( 'click', function (d) {
            //      d3.select("h1").html(d.hero);
            d3.select("#lineup1").html(d.name);
            //    d3.select("h3").html ("Take me to " + "<a href='" + d.link + "' >"  + d.hero + " web page ⇢"+ "</a>" );
        })

        .on( 'mouseenter', function() {
            // select element in current context
            d3.select( this )
                .transition()
                .attr("x", function(d) { return -60;})
                .attr("y", function(d) { return -60;})
                .attr("height", 100)
                .attr("width", 100);
        })
        // set back
        .on( 'mouseleave', function() {
            d3.select( this )
                .transition()
                .attr("x", function(d) { return -25;})
                .attr("y", function(d) { return -25;})
                .attr("height", 50)
                .attr("width", 50);
        });

    // Append hero name on roll over next to the node as well
    nodeEnter.append("text")
        .attr("class", "nodetext")
        .attr("x", x_browser)
        .attr("y", y_browser +15)
        .attr("fill", tcBlack)
        .text(function(d) { return d.name; });


    // Exit any old nodes.
    node.exit().remove();


    // Re-select for update.
    path = vis1.selectAll("path.link");
    node = vis1.selectAll("g.node");

    function tick() {


        path.attr("d", function(d) {

            var dx = d.target.x - d.source.x,
                dy = d.target.y - d.source.y,
                dr = Math.sqrt(dx * dx + dy * dy);
            return   "M" + d.source.x + ","
                + d.source.y
                + "A" + dr + ","
                + dr + " 0 0,1 "
                + d.target.x + ","
                + d.target.y;
        });
        node.attr("transform", nodeTransform1);
    }
}


/**
 * Gives the coordinates of the border for keeping the nodes inside a frame
 * http://bl.ocks.org/mbostock/1129492
 */
function nodeTransform1(d) {
    d.x =  Math.max(maxNodeSize, Math.min(w - (d.imgwidth/2 || 16), d.x));
    d.y =  Math.max(maxNodeSize, Math.min(h - (d.imgheight/2 || 16), d.y));
    return "translate(" + d.x + "," + d.y + ")";
}

/**
 * Toggle children on click.
 */
function click1(d) {
    if (d.children) {
        d._children = d.children;
        d.children = null;
    } else {
        d.children = d._children;
        d._children = null;
    }

    updatelineup1();
}

/**
 * Returns a list of all nodes under the root.
 */
function flatten1(root) {
    var nodes = [];
    var i = 0;

    function recurse(node) {
        if (node.children)
            node.children.forEach(recurse);
        if (!node.id)
            node.id = ++i;
        nodes.push(node);
    }

    recurse(root);
    return nodes;
}
