var data = [
    {name: "Number of government issued takedowns.", value: 4931},
    {name: "Number of websites affected by copyright takedowns", value: 1020000},
    {name: "Government requests for user information in 2016", value: 44943}]

// Currently unused because of long number:  {name: "Number of URLs removed by Google", value: 2910000000}

var values = data.map(function(i) { return i.value })
var x = d3.scaleLinear()
    .domain([0, d3.max(values)])
    .range([0, 800]);

d3.select('.chart')
    .selectAll('div')
        .data(data)
    .enter().append('div')
        .style("width", function(d) {return x(d.value) + "px"})
        .style("height", function(d) { return x(d.value) + "px"})