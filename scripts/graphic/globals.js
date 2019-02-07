
var maxWidth=Math.max(600,Math.min(window.innerWidth,window.innerHeight)-40);

var outerRadius = (maxWidth / 2),
    innerRadius = outerRadius - 100,
    yearWidth=Math.max(400,(innerRadius*2)-250);


var uText,uChords,dText,dChords;

var angleRange=350,
    baseYear=2007,
    maxYear=11,
    yearOffset=(yearWidth)/(maxYear),
    states,
    d_labels=[],
    d_chords=[],
    u_labels=[],
    u_chords=[],
    topStateCount=25,
    d_buf_indexByName={},
    d_indexByName = {},
    d_nameByIndex = {},
    u_indexByName = {},
    u_nameByIndex = {},
    u_buf_indexByName={},
    drate_states=[],
    unemp_states=[],
    d_colorByName={},
    u_colorByName={},
    yearlyDeaths=[],
    yearlyUnemp=[],
    years=[],
    statesGrouped,
    delay=1200,
    refreshIntervalId,
    year= -1,
    //month=-1,
    running=true,
    formatNumber = d3.format(",.2f"),
    formatPercent = function(d) { return  formatNumber(d)+ "%"},
    dTextUpdate,
    dChordUpdate,
    TextUpdate,
    uChordUpdate;

var toolTip = d3.select(document.getElementById("toolTip"));
var header = d3.select(document.getElementById("head"));
var header1 = d3.select(document.getElementById("header1"));
var header2 = d3.select(document.getElementById("header2"));

var d_fill= d3.scaleOrdinal().range(["#00AC6B","#20815D","#007046","#35D699","#60D6A9"]);
var u_fill= d3.scaleOrdinal().range(["#EF002A","#B32D45","#9B001C","#F73E5F","#F76F87"]);

var yearsMap=["2007","2008","2009","2010","2011","2012", "2013", "2014", "2015", "2016", "2017"];

d3.select(document.getElementById("bpg"))
    .style("min-width",(outerRadius*2 + 150) + "px"); //150


var playPause=d3.select(document.getElementById("playPause"));

d3.select(document.getElementById("imgDiv"))
    .style("left",((outerRadius-yearWidth/2))+"px");

var svg = d3.select(document.getElementById("svgDiv"))
    .style("width", (outerRadius*2) + "px")
    .style("height", (outerRadius*2+200) + "px")
    .append("svg")
    .attr("id","svg")
    .style("width", (outerRadius*2) + "px")
    .style("height", (outerRadius*2+200) + "px");


var drate_chord = d3.layout.arc_chord()
    .padding(.05)
    .sortSubgroups(d3.descending)
    .sortChords(d3.descending)
    .yOffsetFactor(-0.7);

var unemp_chord = d3.layout.arc_chord()
    .padding(.05)
    .yOffsetFactor(0.7)
    .sortSubgroups(d3.descending)
    .sortChords(d3.descending);

var arc = d3.svg.arc()
    .innerRadius(innerRadius)
    .outerRadius(innerRadius + 10);


var gGroup = svg.append("g")
    .attr("class","mainLabel")

gGroup.append("text")
    .attr("class","mainLabel")
    .attr("transform", "translate(" + (outerRadius - 20) + ","  + (outerRadius + 30) +")")
    .style("font-size","0px");

gGroup.append("text")
    .attr("class","secondLabel")
    .attr("transform", "translate(" + (outerRadius - 50) + ","  + (outerRadius * 1.15) +")") //90
    .text("*  U.S. opioid deaths per 100,000")
    .style("font-size","10px");

var gY=(outerRadius-(innerRadius *.8/2));

gradientGroup =svg.append("g")
    .attr("class","gradient")
    .attr("transform","translate(" + (outerRadius-6) + "," + (gY+70)  + ")" );

gradientGroup.append("rect")
    .attr("height",((outerRadius + innerRadius *.7/2)-gY))
    .attr("width",0)
    .style("fill","url(#gradient1)");

var mGroup=svg.append("g")
    .attr("class","years")
    .style("cursor","pointer")
    .attr("transform", "translate(" + (outerRadius-yearWidth/2-20) + ","  + 20 + ")");

var dGroup=svg.append("g")
    .attr("class","deathrate")
    .attr("transform", "translate(" + outerRadius + "," + (outerRadius+70) + ")"); //70

var uGroup=svg.append("g")
    .attr("class","unemployment_rate")
    .attr("transform", "translate(" + outerRadius + "," + (outerRadius+70) + ")");
