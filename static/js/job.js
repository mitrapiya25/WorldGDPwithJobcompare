// Step 1: Set up our chart
//= ================================
var svgWidth = 2000;
var svgHeight = 2000;

var margin = {
  top: 200,
  right: 50,
  bottom: 20,
  left: 50
};
var svg = d3
.select("body")
.append("svg")
.attr("width", svgWidth)
.attr("height", svgHeight);

var width = svgWidth - margin.left - margin.right;
var high_height = svgHeight - margin.top- 1020;
var growing_height = svgHeight - high_height - margin.bottom;

function job_sector(){
   d3.json('/job_sectors', function(error,jobdata){
    if (error) return console.warn(error);
    
    console.log(jobdata[0]['Agriculture'])
    // jobdata.forEach(function(data){
    //     data['Agriculture'] = +data['Agriculture']
    //     data['Industry']= +data['Industry']
    //     data['Service'] = +data['Service']
    //     data['country_name'] = data['country_name'] 
    // })
   
    var xScale = d3.scaleOrdinal()
    .domain(jobdata[0].country_name)
    .range([10,210,410,610,810,1010,1210,1410,1610,1810]);

    var bottomAxis = d3.axisBottom(xScale);
  
    console.log(jobdata[0])
    console.log(jobdata[0].Agriculture)
    var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`)
   .call(bottomAxis);
   console.log(xScale(jobdata[0].country_name))
   var circle = chartGroup.selectAll('circle')
                .data(jobdata[0])
                .enter()
                .append("circle")
                .attr("cx",function(d){ return xScale(d.country_name)})
                .attr("cy", 3)
                .attr("r", function(d){return d.Agriculture})
                .attr("stroke", "blue")
                .attr("stroke-width", "2")
                .attr("fill", "blue");
                
    console.log(circle)            
   })


}

function job_sectors_growing_countries (){
 
    d3.json('/job_sectors_growing_countries', function(error,jobdata){
        if (error) return console.warn(error);
    
        console.log(jobdata)
        jobdata.forEach(function (job){
            job['Agriculture'] = +job['Agriculture']
            job['Industry']= +job['Industry']
            job['Service'] = +job['Service']
        })
        var data = jobdata[0]
        var xScale = d3.scaleBand()
        .domain(data.country_name)
        .range([0,width]);
    
        var bottomAxis = d3.axisBottom(xScale);
        var yScale = d3.scaleLinear()
            .domain(d3.extent(data['Agriculture']))
            .range([0, svgHeight]) 

        var chartGroup = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${growing_height})`)
       .call(bottomAxis);

    })
}
     


job_sector()