//comments and clarification throughout file. 
//Deliverable ONE of Challenge 13. 
// Rubric Review 
//code is written to create arrays when a sample is selected from 
//the drop down menu (DONE)
//code is written to create the trace object in the buildCharts() function
//and it contains the following
// - yValues are OTU_IDs in descending order (done)
// - xValues are sample values in descending order (done) 
// - hover text is the OTU_labels in descending order (OUTSTANDING)
// code is written to create the layout in the buildCharts() funciton that creates a title for the chart (done) 
// when the dashboard is first opened in a browser, 940's data should be displayed in the dashboard and the bar 
//chart has the following - 
// - top 10 sample values are sorted in discending order (done)
//the top 10 sample_values as values (done)
//the otu_ids as the labels (done)

//create function to initialize screen: 
function init() {
  // Grab a reference to the dropdown select element from HTML 
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    //set data.names to sample names variable 
    var sampleNames = data.names;
      //for each sample name - append to the selector 
    sampleNames.forEach((sample) => {
      selector
        //append a new option row. 
        .append("option")
        //add the text from the selection
        .text(sample)
        //generate values on the HTML page. 
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// call the above function to initialize the dashboard
init();

//create a new function to handle when a new value is selected from the drop down list. 
function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  //build a new metadata values 
  buildMetadata(newSample);
  //build new charts 
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
// initialize function
function buildCharts(sample) {
// 2. Use d3.json to load and retrieve the samples.json file 
//read from samples.json file, once completed continue on: 
d3.json("samples.json").then((data) => {
// 3. Create a variable that holds the samples array. 
  var samples = data.samples
// 4. Create a variable that filters the samples for the object with the desired sample number.
  var sampleArray = samples.filter(sampleObj => sampleObj.id == sample); 
//  5. Create a variable that holds the first sample in the array.
  var sampleResult = sampleArray[0]; 
  //console log for validation (uncomment for troubleshooting) 
  //console.log("sample result> " + sampleResult); 

// 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
  //variable that holds otu_id 
  otuId = sampleResult.otu_ids; 
  otuLabels = sampleResult.otu_labels; 
  sampleValues = sampleResult.sample_values; 
  
  //console log for validation (uncomment for troubleshooting) 
  // console.log(otuId); 
  // console.log(otuLabels); 
  // console.log(sampleValues); 

// 7. Create the variables for the various charts.
// Hint: Get the the top 10 otu_ids and map them in descending order  
// so the otu_ids with the most bacteria are first. 
// filter sample values and sort in descending order 
 
//sort and slice top ten 

let yticks = otuId.map(id => "OTU " + id ).slice(0,10).reverse();
let xticks = sampleValues.slice(0,10).reverse(); 
let xlabels = otuLabels.map(label => "Type: " + label).slice(0,10).reverse();
//Create variables for bubble chart
let bubbleId = otuId 
let bubbleValues = sampleValues
let bubbleLabels = otuLabels

//Create variables for gauge chart 
//Pulling metadata 
var metadata = data.metadata;
// Filter the data for the object with the desired sample number
  var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
  var result = resultArray[0];
  var washFreq = parseFloat(result.wfreq); 
 
// console log for validation (uncomment for troubleshooting)
// console.log("<>>>>SLICED DATA<<<<< yticks" + yticks); 
// console.log("<>>>>SLICED DATA<<<<< Values" + xvalues); 
// console.log("<>>>>SLICED DATA<<<<< labels" + xlabels); 
// console.log("WASH FREQ: " + washFreq); 

//8. Create the trace for the bar chart. 

let trace = {
  x: xticks,
  y: yticks,
  type: "bar",
  hovertext: xlabels, 
  marker: {
    line: {
      width: .25
    }  
  },
  orientation: "h"
  };

//cast to an array 
var barData = [trace];

//9. Create the layout for the bar chart. 
let barLayout = {
  title: "Top 10 Bacteria Cultures Found", 
  x: {title: "Sample Values"},
  y: {title: "OTU"}
  };     

//10. Use Plotly to plot the data with the layout. 
Plotly.newPlot("bar", barData, barLayout);


//Deliverable Two - RUBRIC REVIEW: 
//the code for the trace object in the BuildCharts(); function does the following: 
//>> sets the OTU_IDs as the xaxis values 
//>> sets the sample values as the y-axis values
//>> sets the otu_labels as the hover text values
//>> sets the sample_values as the marker size 
//>> sets the otu_IDs as the marker colors (DONE) 
//the code for the layout in the buildCharts(); function does the following: 
//>>creates a title
//>>creates a label for the x-axis 
//>> the text bubble is shown when hovered over (DONE) 
// When the dashboard is first opened in a browser, ID940's data should be displayed in the dashboard. 
//All three charts should also be working according to their requirements when a sample is selected from the
//drop down menu (DONE) 

//Deliverable Two BubbleChart Development: 
//Create the trace. 
var bubbleData = [{
  x: bubbleId,
  y: bubbleValues, 
  text: bubbleLabels,
  mode: "markers", 
  marker: {
    color: bubbleValues,
    size: bubbleValues, 
    colorscale: "Jet"
  },
  type: "scatter",
 }   
];

// 2. Create the layout for the bubble chart.
var bubbleLayout = {
  xaxis: {title: "OTUs"}, 
  yaxis: {title: "Sample Values"}, 
  title: "Bacteria Cultures per Sample", 
  hovermode: bubbleLabels
  };

// 3. Use Plotly to plot the data with the layout.
Plotly.newPlot("bubble", bubbleData, bubbleLayout); 

//Gauge Chart
//RUBRIC REVIEW 
// Code 
//   Creates a title for the chart 
//   creates the ranges for the gauge in increments of two with a different color for each increment
//   adds the washing frequency value on the gauge chart 
//   the gauge is added to the dashboard 
//   the gauge fits in the margin of the <Div> element 
// When the webpage loads, the bar and bubble chart are working according the the requirements in Deliverable 
// 1 and 2 and the gauge chart is working according to the requirements listed for this deliverable. 

//4. Create the trace for the gauge chart.
var gaugeData = [ 
  {
    domain: {x: [0,1], y: [0,1]},
             value: washFreq, 
             title: {text: "<b>Belly Button Washing Frequency</b> <br> Scrubs per week"}, 
             type: "indicator",
             mode: "gauge+number" , 
             gauge: {
              axis: {
                range: [null, 10], 
                tickwidth: 1, 
                tickcolor: "gray"}, 
             bar: {color: "black"},
             steps: [
              {range: [0,2], color: "red"},
              {range: [2,4], color: "orange"},
              {range: [4,6], color: "yellow"},
              {range: [6,8], color: "green"}, 
              {range: [8,10], color: "blue"}
             ]
             }
  } 
];
//create the layout for the gauge chart 
var gaugeLayout = {width: 450, height: 450, margin: {t:0, b:0}}; 
//cast to gauge ID in html
Plotly.newPlot("gauge", gaugeData, gaugeLayout); 
})};








