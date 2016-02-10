$(function() {
	$(".button-collapse").sideNav();

	var data;
	var head_container;
	var visual_container;
	var detail_container;
	var welcome_container;
	var height , width;
	var tip = d3.tip()
		  .attr("class", "tip")
		  .offset([-10, 0])
		  .html(function(d) {
		    return "<span style='color:#ffffba'>" + Math.round(d.values) + "</span>";
		  })

	
	

	d3.csv("terClean.csv", function(loadedRows) {
	  	rows = loadedRows;
	  	//for(i=0;i<data.length;i++)
	  	//	console.log(data[i].country);

	   	head_container = d3.select("div.head");
	  	visual_container = d3.select("div#visual");
	  	detail_container = d3.select("div#option");
	  	welcome_container = d3.select(".welcome-box");
	  	
	  	reset_visual();



	});

	reset_visual = function(){

		head_container.text("You're home to catch up on World Terrorism outlook!!!");
		visual_container.selectAll("*").remove();
		detail_container.selectAll("*").remove();
		welcome_container.html("<h4> Data Source </h4>	<p> <a href = \"http://www.start.umd.edu/gtd/contact/\"> Global Terrorism Database </a></p> 	<h4> Data Cleaning (R Studio)</h4> 	<p> File from source: <a href = \"ter.csv\" download> ter.csv (Click to download)</a><br /> <u><b>Processing</b></u><br />	terror <- read.csv(\"ter.csv\" , header = TRUE , fill = TRUE , row.names = NULL)<br />	a<- count(terror , \"country_txt\")<br />	b<- subset(a ,freq>500)<br />	c<-merge(b , terror , by = \"country_txt\")<br />c<- subset(c , select = -freq)<br />d<- count(c , \"gname\")<br />	e<- subset(d , freq>150)<br />	f<- merge(e , c , by=\"gname\")<br />	f<- subset(f , select = -freq)<br />	g<- subset(f , gname != \"Unknown\")<br />	h<- subset(g , iday != 0)<br />	write.csv(h , \"terClean.csv\")	<br> File used for visualization: <a href = \"terClean.csv\" download>terClean.csv (Click to download)</a></p>");
		detail_container.text("");

		
	}

	country_visual = function(){	

		head_container.text("Terrorism based on Country");
		visual_container.selectAll("*").remove();
		welcome_container.selectAll("*").remove();
		detail_container.text("This plot shows No of Terrorist Attacks in Highly prone countries in past 10 years.");

		var margin = {top: 20, right: 20, bottom: 200, left: 60};
		    width = 960 - margin.left - margin.right;
		    height = 700 - margin.top - margin.bottom;

		var xValue = function(d) { return d.key; }, // data -> value
		    xScale = d3.scale.ordinal().rangeRoundBands([0, width], .1), // value -> display
		    xMap = function(d) { return xScale(xValue(d)); }, // data -> display
		    xAxis = d3.svg.axis().scale(xScale).orient("bottom");

		var yValue = function(d) { return d.values; }, // data -> value
		    yScale = d3.scale.linear().range([height, 0]), // value -> display
		    yMap = function(d) { return yScale(yValue(d)); }, // data -> display
		    yAxis = d3.svg.axis().scale(yScale).orient("left");

		var svg = visual_container.append("svg")
		    // .attr("width", width + margin.left + margin.right)
		    // .attr("height", height + margin.top + margin.bottom)
		    .attr("preserveAspectRatio","xMinYMin meet")
		    .attr("viewBox","0 0 960 700")
		  .append("g")
		    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		    svg.call(tip);

		    data = d3.nest()
	        .key(function(d) { return d.country_txt;})
	        .rollup(function(d) { return d.length; })
	        .entries(rows);


		  xScale.domain(data.map(xValue));
		  yScale.domain([0, d3.max(data, yValue)]);

		  svg.append("g")
		      .attr("class", "x axis")
		      .attr("transform", "translate(0," + height + ")")
		      .call(xAxis)
		      .selectAll("text")  
		            .style("text-anchor", "end")
		            .attr("dx", "-.8em")
		            .attr("dy", ".25em")
		            .attr("transform", "rotate(-90)");

		  svg.append("g")
		      .attr("class", "y axis")
		      .attr("width" , "500px")
		      .call(yAxis)
		    .append("text")
		      .attr("transform", "rotate(-90)")
		      .attr("y", 6)
		      .attr("dy", ".71em")
		      .style("text-anchor", "end")
		      .text("Terrorist Attacks");

		  svg.selectAll(".bar")
		      .data(data)
		    .enter().append("rect")
		      .attr("class", "bar")
		      .attr("x", xMap)
		      .attr("width", xScale.rangeBand)
		      .attr("y", yMap)
		      .attr("height", function(d) { return height - yMap(d); })
		      .on('mouseover', tip.show)
      		  .on('mouseout', tip.hide);
		      



	}

	year_visual = function(){
		head_container.text("Yearly distribution for Terrorist Attacks");
		visual_container.selectAll("*").remove();
		welcome_container.selectAll("*").remove();
		detail_container.text("This plot shows No of Terrorist Attacks in past 10 years.");


		var margin = {top: 20, right: 20, bottom: 200, left: 60},
		    width = 960 - margin.left - margin.right,
		    height = 700 - margin.top - margin.bottom;


		var xValue = function(d) { return d.key; }, // data -> value
		    xScale = d3.scale.ordinal().rangeRoundBands([0, width], .1), // value -> display
		    xMap = function(d) { return xScale(xValue(d)); }, // data -> display
		    xAxis = d3.svg.axis().scale(xScale).orient("bottom");

		var yValue = function(d) { return d.values; }, // data -> value
		    yScale = d3.scale.linear().range([height, 0]), // value -> display
		    yMap = function(d) { return yScale(yValue(d)); }, // data -> display
		    yAxis = d3.svg.axis().scale(yScale).orient("left");

		var svg = visual_container.append("svg")
		    // .attr("width", width + margin.left + margin.right)
		    // .attr("height", height + margin.top + margin.bottom)
		    .attr("preserveAspectRatio","xMinYMin meet")
		    .attr("viewBox","0 0 960 700")
		  .append("g")
		    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		    svg.call(tip);

		    data = d3.nest()
	        .key(function(d) { return d.iyear;})
	        .rollup(function(d) { return d.length; })
	        .entries(rows);


		  xScale.domain(data.map(xValue));
		  yScale.domain([0, d3.max(data, yValue)]);

		  svg.append("g")
		      .attr("class", "x axis")
		      .attr("transform", "translate(0," + height + ")")
		      .call(xAxis)
		      .selectAll("text")  
		            .style("text-anchor", "end")
		            .attr("dx", "-.8em")
		            .attr("dy", ".25em")
		            .attr("transform", "rotate(-90)");

		  svg.append("g")
		      .attr("class", "y axis")
		      .attr("width" , "500px")
		      .call(yAxis)
		    .append("text")
		      .attr("transform", "rotate(-90)")
		      .attr("y", 6)
		      .attr("dy", ".71em")
		      .style("text-anchor", "end")
		      .text("Terrorist Attacks");

		  svg.selectAll(".bar")
		      .data(data)
		    .enter().append("rect")
		      .attr("class", "bar")
		      .attr("x", xMap)
		      .attr("width", xScale.rangeBand)
		      .attr("y", yMap)
		      .attr("height", function(d) { return height - yMap(d); })
		      .on('mouseover', tip.show)
      		  .on('mouseout', tip.hide);

	}

	attack_visual = function(){
		head_container.text("Types of terrorist attacks");
		visual_container.selectAll("*").remove();
		welcome_container.selectAll("*").remove();
		detail_container.text("This plot shows No of Terrorist Attacks in of each type in past 10 years.");


		var margin = {top: 20, right: 20, bottom: 200, left: 60},
		    width = 960 - margin.left - margin.right,
		    height = 700 - margin.top - margin.bottom;


		var xValue = function(d) { return d.key; }, // data -> value
		    xScale = d3.scale.ordinal().rangeRoundBands([0, width], .1), // value -> display
		    xMap = function(d) { return xScale(xValue(d)); }, // data -> display
		    xAxis = d3.svg.axis().scale(xScale).orient("bottom");

		var yValue = function(d) { return d.values; }, // data -> value
		    yScale = d3.scale.linear().range([height, 0]), // value -> display
		    yMap = function(d) { return yScale(yValue(d)); }, // data -> display
		    yAxis = d3.svg.axis().scale(yScale).orient("left");

		var svg = visual_container.append("svg")
		    // .attr("width", width + margin.left + margin.right)
		    // .attr("height", height + margin.top + margin.bottom)
		    .attr("preserveAspectRatio","xMinYMin meet")
		    .attr("viewBox","0 0 960 700")
		  .append("g")
		    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		    svg.call(tip);

		    data = d3.nest()
	        .key(function(d) { return d.attacktype1_txt;})
	        .rollup(function(d) { return d.length; })
	        .entries(rows);


		  xScale.domain(data.map(xValue));
		  yScale.domain([0, d3.max(data, yValue)]);

		  svg.append("g")
		      .attr("class", "x axis")
		      .attr("transform", "translate(0," + height + ")")
		      .call(xAxis)
		      .selectAll("text")  
		            .style("text-anchor", "end")
		            .attr("dx", "-.8em")
		            .attr("dy", ".25em")
		            .attr("transform", "rotate(-90)");

		  svg.append("g")
		      .attr("class", "y axis")
		      .attr("width" , "500px")
		      .call(yAxis)
		    .append("text")
		      .attr("transform", "rotate(-90)")
		      .attr("y", 6)
		      .attr("dy", ".71em")
		      .style("text-anchor", "end")
		      .text("Terrorist Attacks");

		  svg.selectAll(".bar")
		      .data(data)
		    .enter().append("rect")
		      .attr("class", "bar")
		      .attr("x", xMap)
		      .attr("width", xScale.rangeBand)
		      .attr("y", yMap)
		      .attr("height", function(d) { return height - yMap(d); })
		      .on('mouseover', tip.show)
      		  .on('mouseout', tip.hide);


	}

	weapon_visual = function(){
		head_container.text("Weapon Type distribution for terror Groups");
		visual_container.selectAll("*").remove();
		welcome_container.selectAll("*").remove();
		detail_container.text("This plot shows No of Terrorist Attacks in which each types of weapon were used in past 10 years.");


		var margin = {top: 20, right: 20, bottom: 400, left: 60},
		    width = 960 - margin.left - margin.right,
		    height = 700 - margin.top - margin.bottom;


		var xValue = function(d) { return d.key; }, // data -> value
		    xScale = d3.scale.ordinal().rangeRoundBands([0, width], .1), // value -> display
		    xMap = function(d) { return xScale(xValue(d)); }, // data -> display
		    xAxis = d3.svg.axis().scale(xScale).orient("bottom");

		var yValue = function(d) { return d.values; }, // data -> value
		    yScale = d3.scale.linear().range([height, 0]), // value -> display
		    yMap = function(d) { return yScale(yValue(d)); }, // data -> display
		    yAxis = d3.svg.axis().scale(yScale).orient("left");

		var svg = visual_container.append("svg")
		    // .attr("width", width + margin.left + margin.right)
		    // .attr("height", height + margin.top + margin.bottom)
		    .attr("preserveAspectRatio","xMinYMin meet")
		    .attr("viewBox","0 0 960 700")
		  .append("g")
		    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		    svg.call(tip);

		    data = d3.nest()
	        .key(function(d) { return d.weaptype1_txt;})
	        .rollup(function(d) { return d.length; })
	        .entries(rows);


		  xScale.domain(data.map(xValue));
		  yScale.domain([0, d3.max(data, yValue)]);

		  svg.append("g")
		      .attr("class", "x axis")
		      .attr("transform", "translate(0," + height + ")")
		      .call(xAxis)
		      .selectAll("text")  
		            .style("text-anchor", "end")
		            .attr("dx", "-.8em")
		            .attr("dy", ".25em")
		            .attr("transform", "rotate(-90)");

		  svg.append("g")
		      .attr("class", "y axis")
		      .attr("width" , "500px")
		      .call(yAxis)
		    .append("text")
		      .attr("transform", "rotate(-90)")
		      .attr("y", 6)
		      .attr("dy", ".71em")
		      .style("text-anchor", "end")
		      .text("Terrorist Attacks");

		  svg.selectAll(".bar")
		      .data(data)
		    .enter().append("rect")
		      .attr("class", "bar")
		      .attr("x", xMap)
		      .attr("width", xScale.rangeBand)
		      .attr("y", yMap)
		      .attr("height", function(d) { return height - yMap(d); })
		      .on('mouseover', tip.show)
      		  .on('mouseout', tip.hide);


	}

	group_visual = function(){
		head_container.text("Terrorism based on Terror groups");
		visual_container.selectAll("*").remove();
		welcome_container.selectAll("*").remove();
		detail_container.text("This plot shows No of Terrorist Attacks in by respective Perpetrator Groups in past 10 years.");


		var margin = {top: 20, right: 20, bottom: 400, left: 80},
		    width = 960 - margin.left - margin.right,
		    height = 700 - margin.top - margin.bottom;


		var xValue = function(d) { return d.key; }, // data -> value
		    xScale = d3.scale.ordinal().rangeRoundBands([0, width], .1), // value -> display
		    xMap = function(d) { return xScale(xValue(d)); }, // data -> display
		    xAxis = d3.svg.axis().scale(xScale).orient("bottom");

		var yValue = function(d) { return d.values; }, // data -> value
		    yScale = d3.scale.linear().range([height, 0]), // value -> display
		    yMap = function(d) { return yScale(yValue(d)); }, // data -> display
		    yAxis = d3.svg.axis().scale(yScale).orient("left");

		var svg = visual_container.append("svg")
		    // .attr("width", width + margin.left + margin.right)
		    // .attr("height", height + margin.top + margin.bottom)
		    .attr("preserveAspectRatio","xMinYMin meet")
		    .attr("viewBox","0 0 960 700")
		  .append("g")
		    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		    svg.call(tip);

		    data = d3.nest()
	        .key(function(d) { return d.gname;})
	        .rollup(function(d) { return d.length; })
	        .entries(rows);


		  xScale.domain(data.map(xValue));
		  yScale.domain([0, d3.max(data, yValue)]);

		  svg.append("g")
		      .attr("class", "x axis")
		      .attr("transform", "translate(0," + height + ")")
		      .call(xAxis)
		      .selectAll("text")  
		            .style("text-anchor", "end")
		            .attr("dx", "-.8em")
		            .attr("dy", ".25em")
		            .attr("transform", "rotate(-90)");

		  svg.append("g")
		      .attr("class", "y axis")
		      .attr("width" , "500px")
		      .call(yAxis)
		    .append("text")
		      .attr("transform", "rotate(-90)")
		      .attr("y", 6)
		      .attr("dy", ".71em")
		      .style("text-anchor", "end")
		      .text("Terrorist Attacks");

		  svg.selectAll(".bar")
		      .data(data)
		    .enter().append("rect")
		      .attr("class", "bar")
		      .attr("x", xMap)
		      .attr("width", xScale.rangeBand)
		      .attr("y", yMap)
		      .attr("height", function(d) { return height - yMap(d); })
		      .on('mouseover', tip.show)
      		  .on('mouseout', tip.hide);
	}

	injured_visual = function(){
		head_container.text("Injured and fatalties count by Terror Groups");
		visual_container.selectAll("*").remove();
		welcome_container.selectAll("*").remove();
		detail_container.text("This plot shows Total no of people Killed/Injured by respective Perpetrator in terror Attacks in past 10 years.");


		var margin = {top: 20, right: 20, bottom: 400, left: 80},
		    width = 960 - margin.left - margin.right,
		    height = 700 - margin.top - margin.bottom;


		var xValue = function(d) { return d.key; }, // data -> value
		    xScale = d3.scale.ordinal().rangeRoundBands([0, width], .1), // value -> display
		    xMap = function(d) { return xScale(xValue(d)); }, // data -> display
		    xAxis = d3.svg.axis().scale(xScale).orient("bottom");

		var yValue = function(d) { return d.values; }, // data -> value
		    yScale = d3.scale.linear().range([height, 0]), // value -> display
		    yMap = function(d) { return yScale(yValue(d)); }, // data -> display
		    yAxis = d3.svg.axis().scale(yScale).orient("left");

		var svg = visual_container.append("svg")
		    // .attr("width", width + margin.left + margin.right)
		    // .attr("height", height + margin.top + margin.bottom)
		    .attr("preserveAspectRatio","xMinYMin meet")
		    .attr("viewBox","0 0 960 700")
		  .append("g")
		    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		    svg.call(tip);

		    data = d3.nest()
	        .key(function(d) { return d.gname;})
	        .rollup(function(d) { return d3.sum(d , function(e){ return e.nkill+ e.nwound}); })
	        .entries(rows);


		  xScale.domain(data.map(xValue));
		  yScale.domain([0, d3.max(data, yValue)]);

		  svg.append("g")
		      .attr("class", "x axis")
		      .attr("transform", "translate(0," + height + ")")
		      .call(xAxis)
		      .selectAll("text")  
		            .style("text-anchor", "end")
		            .attr("dx", "-.8em")
		            .attr("dy", ".25em")
		            .attr("transform", "rotate(-90)");

		  svg.append("g")
		      .attr("class", "y axis")
		      .attr("width" , "500px")
		      .call(yAxis)
		    .append("text")
		      .attr("transform", "rotate(-90)")
		      .attr("y", 6)
		      .attr("dy", ".71em")
		      .style("text-anchor", "end")
		      .text("Fatalties and Injured Count");

		  svg.selectAll(".bar")
		      .data(data)
		    .enter().append("rect")
		      .attr("class", "bar")
		      .attr("x", xMap)
		      .attr("width", xScale.rangeBand)
		      .attr("y", yMap)
		      .attr("height", function(d) { return height - yMap(d); })
		      .on('mouseover', tip.show)
      		  .on('mouseout', tip.hide);

	}

	$(".0").click(function(){
		reset_visual();
	});


	$(".1").click(function(){
		country_visual();
	});

	$(".2").click(function(){
		year_visual();

	});

	$(".3").click(function(){
		attack_visual();

	});

	$(".4").click(function(){
		weapon_visual();

	});

	$(".5").click(function(){
		group_visual();

	});

	$(".6").click(function(){
		injured_visual();

	});

	// var aspect = width / height,
 //    chart = d3.select('div#');
	// 	d3.select(window)
	// 	  .on("resize", function() {
	// 	    var targetWidth = chart.node().getBoundingClientRect().width;
	// 	    chart.attr("width", targetWidth);
	// 	    chart.attr("height", targetWidth / aspect);
	// 	  });




})