function buildMetadata (sample) {
    d3.json("samples.json").then((data)=> {
        var metadata = data.metadata;
        var resultArray= metadata.filter(sampleObject => sampleObject.id==sample);
        var result=resultArray[0];
        var pannel = d3.select ('#sample-metadata');
        pannel.html ('');
        Object.entries(result).forEach(([key,value])=> {
            pannel.append('h6').text(`${key.toUpperCase()}: ${value}`);
        });
        
    });
}
function buildChart (sample) {
    d3.json('samples.json').then((data)=> {
       
        var sample = data.samples;
        var resultArray= sample.filter(sampleObject => sampleObject.id==sample);
        var result=resultArray[0];
        var otuIds = result.otu_ids;
        var otuLables = result.otu_lables;
        var sampleValues = result.sample_values;

        var bubbleData = [{
            x: otuLables, 
            y: sampleValues,
            mode: 'markers', 
            type: 'scatter',
            text: otuLables,
            marker: {
                color: otuLables,
                size: sampleValues,
                colorscale: 'Earth'
            }
        }];

        var bubbleLayout = {
            title: "Bacteria Cultures Per Sample",
            margin: { t: 0 },
            hovermode: "closest",
            xaxis: { title: "OTU ID" },
            margin: { t: 30}
          };

          Plotly.newPlot('bubble', bubbleData, bubbleLayout);


        var yticks = otuIds.slice(0,10).map(otuID => `OTU ${otuID}`).reverse();

        var barData = [{
            y: yticks,
            x: sampleValues.slice(0,10).reverse(),
            text:otuLables.slice(0,10).reverse(),
            type: 'bar',
            orientation: 'h'
        }];
        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: { t: 30, l: 150 }
          };
          Plotly.newPlot('bar', barData, barLayout);
        

    });   
}



function init () {
    var selector = d3.select('#selDataset');
    d3.json('samples.json').then((data)=> {
        var sampleNames = data.names;
        sampleNames.forEach((sample)=>{
            selector.append('option')
            .text(sample)
            .property('value', sample);            
        });
        var firstSample = sampleNames[0];
        buildChart(firstSample);
        buildMetadata(firstSample);

});
}

function optionChanged (newSample) {
    buildChart(newSample);
    buildMetadata(newSample);

}
init();

