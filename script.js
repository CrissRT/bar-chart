
let items;

let height = 512;
let width = 900;
let padding = 40;

let svg = d3.select('.visHolder').append('svg');
    

function drawCanvas() {
  svg.attr('width', width + 100)
  .attr('height', height + 60);
}

function generateScales() {
  yScale = d3.scaleLinear()
                  .domain([0, d3.max(items, (d) => d[1])])
                  .range([0, height - 2 * padding]);

  xScale = d3.scaleLinear()
             .domain([0, items.length - 1])
             .range([padding, width - padding]);                 
                
  let datesArray = items.map((d) => new Date(d[0]));

  xAxisScale = d3.scaleTime()
                 .domain(d3.extent(datesArray))
                 .range([padding, width - padding]);
                 
  yAxisScale = d3.scaleLinear()
                 .domain([0, d3.max(items, (d) => d[1])])
                 .range([height - padding, padding]);                 
}


function generateAxes() {
  let xAxis = d3.axisBottom(xAxisScale);

  svg.append("g")
     .attr("transform", "translate(0," + (height - padding) + ")")
     .call(xAxis)
     .attr("id", "x-axis");

  // let yAxis = d3.axisLeft(yAxisScale);

  // svg.append("g")
  //    .attr("transform", "translate(" + padding + ", 0)")
  //    .call(yAxis)
  //    .attr("id", "y-axis");
}


d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json')
  .then(data => {
    items = data.data;
    drawCanvas();
    generateScales();
    generateAxes();
    // console.log(items);
  })