console.log("start");

function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`

    var chart = d3.select("#sample-metadata");

    // d3.json(`/metadata/${Sample}`).then(function(data) {
    //   var filteredData = response.filter(x => x.response === inputValue);
      

/* data route */


////////////////////////

          // d3.json(`/metadata/${Sample}`).then((x) => {
          //   x.forEach(sample_metadata)
          //     console.log(sample_metadata);
          //     Object.entries(sample)
          //     .forEach(([key, value]) => console.log(`Key: ${key} and Value ${value}`));
          //     chart.append(value)
          //   });
            ///////////////////////////////////////
          // }
          //   var filteredData = response.filter(x => x.response === inputValue);

          //   d3.json("/names").then((sampleNames) => {
          //     sampleNames.forEach((sample) => {
          //       selector
          //         .append("option")
          //         .text(sample)
          //         .property("value", sample);
          //     });


          //   console.log(filteredData);



// Object.entries(sample_metadata).forEach(([key, value]) => console.log(`Key: ${key} and Value ${value}`));
// console.log("hello");




      //       sample_metadata.forEach((sample) => { === selector
      //          console.log(sample);
      //  });

      //  var filteredData = people.filter(x => x.fullName === inputValue);

      //  console.log(filteredData);



//        response.forEach((sample) => {
//   var row = chart.append("li");
//   Object.entries(sample).forEach(([key, value]) => {
//     var list = row.append(value);
//     list.text(value);
//   });
// });
var chart = d3.select("#sample-metadata");

      d3.json(`/metadata/${sample}`).then(function(sample_metadata) {
        
        console.log(sample_metadata);
        console.log("sample_metadata is before this");
        var row = chart.append("li");
        Object.entries(sample_metadata).forEach((value) => {
          var cell = row.append("td");
          cell.text(value);
          
        })
      });

      


    // Use `.html("") to clear any existing metadata
//output.html("");


// sample_metadata.forEach((sample) => {
//   //var row = tbody.append("tr");
//   Object.entries(sample).forEach(([key, value]) => {
//     var cell = chart.append(value);
//     cell.text(value);
//   });
// });


    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);

    }
buildMetadata();
function buildCharts(sample) {
  

  // @TODO: Use `d3.json` to fetch the sample data for the plots



d3.json(`/samples/${sample}`).then(function(data) {
  var data = [data];
  console.log("data for pie");
  console.log(data);
   data.forEach((sample) => { 
    console.log("sample data is next"); 
   console.log(sample);
   

  //var PIE = document.getElementById("pie");

   //var data = [data];

  var trace1 = {
    x: sample.otu_ids,
    y: sample.sample_values,
    text: sample.otu_labels,
    mode: "markers",
    type: "bubble",
    name: "Belly Button Bacteria",
    marker: {
      color: sample.otu_ids,
      size: sample.sample_values
    }
  };
  
  var sample = [trace1];
  
  var layout = {
    title: 'Belly Button Bacteria',
    showlegend: false,
    height: 600,
    width: 600
  };
  
  Plotly.newPlot('bubble', sample, layout);





    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
      
    px = sample.sort(function(a, b) {
      return parseFloat(b.sample_values) - parseFloat(a.sample_values);
    });

    // console.log("sample sorted");
    // console.log(p)

    // console.log("p1 is next");
    // console.log(p);
    
    // Slice the first 10 objects for plotting
    p = px.slice(0, 10);
    // console.log("s2 is next");
    // console.log(p);

    p2 = p.reverse();

    

    var trace1 = {
      labels: p2.map(row => row.sample_values),
      values: p2.map(row => row.otu_ids),
      hoverinfo: p2.map(row => row.otu_labels),
      type: 'pie',
    };
    //labels: p2.map(row => row.sample_values),
    // values: d.map(row => row.otu_ids),
    // hoverinfo: d.map(row => row.otu_labels),
    
    var p2 = [trace1];
    
    var layout = {
      title: "pie",
    };
    
    Plotly.newPlot("pie", p2, layout);


    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
  
});
});
}

buildCharts();
function init() {
  console.log("hello");
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

    // Get the value property of the input element
    // var inputValue = selector.property("value");

    // console.log(inputValue);
    

    //var blanks = [];



  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
        // Object.entries(sample).forEach(([key, value]) => {
        //   blanks.push(value);
        
    });

    //Object.entries(sample).forEach(([key, value]) => blanks.push(value);
  
    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
  console.log("hello");


}

//selector.on("click", function() {
function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
//}











