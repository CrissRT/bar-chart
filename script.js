
let items;

let height = 600;
let width = 800;
let padding = 40;

let svg = d3.select("#stat-container")
            .append("svg");

function drawCanvas() {
  svg.attr("width", width)
      .attr("height", height);
}

function generateScales() {
  heightScale = d3.scaleLinear()
                  .domain([0, d3.max(items, (d) => d[1])])
                  .range([0, height - 2 * padding]);

  xScale = d3.scaleLinear()
             .domain([0, items.length - 1])
             .range([padding, width - padding]);                 
                
  let datesArray = items.map((d) =>
    new Date(d[0])
  );           

  xAxisScale = d3.scaleTime()
                 .domain([0, d3.max(datesArray)])
                 .range([padding, width - padding]);
                 
  yAxisScale = d3.scaleLinear()
                 .domain([0, d3.max(items, (d) => d[1])])
                 .range([height - padding, padding]);                 
}

function generateAxes() {
  let xAxis = d3.axisBottom(xAxisScale);

  svg.append("g")
     .call(xAxis)
     .attr("id", "x-axis");

  // let yAxis = d3.axisBottom(yAxisScale);
}

d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json')
  .then(data => {
    items = data.data;
    drawCanvas();
    generateScales();
    generateAxes();
    // console.log(items);
  })