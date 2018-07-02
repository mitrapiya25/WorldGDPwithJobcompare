// Step 1: Set up our chart
//= ================================
var svgWidth = 1200;
var svgHeight = 500;

var margin = {
  top: 30,
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
var high_height = svgHeight/2 - margin.top - margin.bottom;
var growing_height = svgHeight/2 - margin.top - margin.bottom;
var top = 0

function job_sector(){
   d3.json('/job_sectors', function(error,jobdata){
    if (error) return console.warn(error);
    var country =[]
    console.log(jobdata)
     jobdata.forEach(function(data){
         data.Agriculture = +data.Agriculture
         data['Industry']= +data['Industry']
         data['Service'] = +data['Service']
         country.push(data['country_name']) 
     })
   
    var xScale = d3.scaleOrdinal()
    .domain(country)
    .range([10,90,200,310,420,530,640,750,860,970]);

    var yScale =d3.scaleLinear()
    .domain([0,150])
    .range([high_height,0]);

    var bottomAxis = d3.axisBottom(xScale);
    var leftAxis = d3.axisLeft(yScale)
  
    
    var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, 0)`)
   chartGroup.append("g")
             .attr("transform", `translate(0, ${high_height})`)
             .call(bottomAxis);

   chartGroup.append("g")
   .call(leftAxis);
   
    var circle_agri = chartGroup.selectAll('circle_agri')
                    .data(jobdata)
                    .enter()
                     .append("circle")
                .attr("cx",function(d){ return xScale(d.country_name)})
                .attr("cy", function(d){return d.Agriculture +40} )
                .attr("r", function(d){return d.Agriculture})
                .attr("stroke", "blue")
                .attr("stroke-width", "2")
                .attr("fill", "blue")
                .attr('opacity','.6');
    var circle_ind = chartGroup.selectAll('circle_ind')
                    .data(jobdata)
                    .enter()
                 .append("circle")
                .attr("cx",function(d){ return xScale(d.country_name)})
                .attr("cy", function(d){return d.Industry +40} )
                .attr("r", function(d){return d.Industry})
                .attr("stroke", "green")
                .attr("stroke-width", "2")
                .attr("fill", "green")
                .attr('opacity','.6'); 
    var circle_ser = chartGroup.selectAll('circle_ser')
                     .data(jobdata)
                     .enter()
                .append("circle")
                .attr("cx",function(d){ return xScale(d.country_name)})
                .attr("cy", function(d){return d.Service + 40 })
                .attr("r", function(d){return d.Service *.6})
                .attr("stroke", "red")
                .attr("stroke-width", "2")
                .attr("fill", "red")
                .attr('opacity','.6');        
                
    var legend_text1 = chartGroup.append("text")
                     .attr("x", 990)
                     .attr("y", 20)
                     .attr('fill','blue')
                     .text("Agriculture");
    var legend_text2 = chartGroup.append("text")
                     .attr("x", 990)
                     .attr("y", 40)
                     .attr('fill','green')
                     .text("Industry");    
    var legend_text3 = chartGroup.append("text")
                     .attr("x", 990)
                     .attr("y", 60)
                     .attr('fill','red')
                     .text("Service");        
   })


}

function job_sectors_growing_countries (){
 
    d3.json('/job_sectors_growing_countries', function(error,jobdata){
        if (error) return console.warn(error);
        var country =[]
        jobdata.forEach(function(data){
            data.Agriculture = +data.Agriculture
            data['Industry']= +data['Industry']
            data['Service'] = +data['Service']
            country.push(data['country_name']) 
        })
      
       var xScale = d3.scaleOrdinal()
       .domain(country)
       .range([10,90,200,310,420,530,640,750,860,970]);
   
       var yScale =d3.scaleLinear()
       .domain([0,150])
       .range([high_height,0])
   
       var bottomAxis = d3.axisBottom(xScale)
                        .ticks(function(jobdata){return d.country_name}, 1);
       var leftAxis = d3.axisLeft(yScale)
     
       
       var chartGroup = svg.append("g")
     .attr("transform", `translate(${margin.left},280)`)

      chartGroup.append("g")
                .attr("transform", `translate(0,190)`)
                .call(bottomAxis);
   
      chartGroup.append("g")
      .call(leftAxis);
      
       var circle_agri = chartGroup.selectAll('circle_agri')
                       .data(jobdata)
                       .enter()
                        .append("circle")
                   .attr("cx",function(d){ return xScale(d.country_name)})
                   .attr("cy", function(d){return d.Agriculture+40} )
                   .attr("r", function(d){return d.Agriculture})
                   .attr("stroke", "blue")
                   .attr("stroke-width", "2")
                   .attr("fill", "blue")
                   .attr('opacity','.6');
       var circle_ind = chartGroup.selectAll('circle_ind')
                       .data(jobdata)
                       .enter()
                    .append("circle")
                   .attr("cx",function(d){ return xScale(d.country_name)})
                   .attr("cy", function(d){return d.Industry+40} )
                   .attr("r", function(d){return d.Industry})
                   .attr("stroke", "green")
                   .attr("stroke-width", "2")
                   .attr("fill", "green")
                   .attr('opacity','.6'); 
       var circle_ser = chartGroup.selectAll('circle_ser')
                        .data(jobdata)
                        .enter()
                   .append("circle")
                   .attr("cx",function(d){ return xScale(d.country_name)})
                   .attr("cy", function(d){return d.Service+40 })
                   .attr("r", function(d){return d.Service*.6})
                   .attr("stroke", "red")
                   .attr("stroke-width", "2")
                   .attr("fill", "red")
                   .attr('opacity','.6');        
         var legend_text1 = chartGroup.append("text")
                   .attr("x", 990)
                   .attr("y", 20)
                   .attr('fill','blue')
                   .text("Agriculture");
        var legend_text2 = chartGroup.append("text")
                   .attr("x", 990)
                   .attr("y", 40)
                   .attr('fill','green')
                   .text("Industry");    
        var legend_text3 = chartGroup.append("text")
                   .attr("x", 990)
                   .attr("y", 60)
                   .attr('fill','red')
                   .text("Service");            
                  
      })
}
     


job_sector()
job_sectors_growing_countries ()