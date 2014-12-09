function loadStaticData() {
    // Grab whatever csv is in the editor.
    var csv = d3.select('#dataEditor').property('value');
    // Parse the data into an array of objects (rows).  Each row is really
    // a map of column-name to some value (string, number, or null).
    var tabularData = d3.csv.parse(csv);

    // Create a DataLoader.  In this case, we already have the data so we'll
    // just create a StaticDataLoader that always loads the same data. There
    // are other types of DataLoaders which we'll demonstrate in other example
    // applications.
    var dataLoader = aplos.data.loader.Builder.fromData(tabularData).build();

    // Create a DataSet.  This is Aplos' core data model that holds metadata
    // (information about the data's structure and key properties such as
    // column info, dimension hierarchy, etc) and the DataLoader it should
    // use to fetch the data.  In this example, the DataLoader is static so
    // it will always just give back whatever CSV we had in the dataEditor.
    return new aplos.data.DataSet().dataLoader(dataLoader);
}

// Visualizing the data actually requires a series of steps which Aplos has
// mostly taken care of for you.  We also provide ways to make multiple
// charts interact if you want.  Let's take a look...
function visualize(dataSet) {
    // The first steps towards visualization is creating a Projection, a key
    // concept in Aplos.  One way to think of a Projection is as a nice way to
    // write a SQL query.  By default, a Projection will just give you all the
    // data, which is what we'll demonstrate in this example.
    //
    // Once we have a Projection, we'll tell it to fetch data it needs. This
    // is really just a convenient way to have the Projection ask the DataSet
    // to ask the DataLoader to load data if needed.
    dataSet.fetch(new aplos.data.Projection()).then(function(d) {
	    onDataLoad(dataSet, d);
	}, onDataError);
}

// This function is called when the data is loaded and available.
// The variable 'd' is what we call SeriesData, which is a map from
// a series-name to the TabularData for that series. In this example,
// there is one series named 'All' because the projection we created
// simply grabbed all the data.
function onDataLoad(dataSet, d) {
    // Clear status.
    d3.select('#status').text('');

    // Grab the first (and only) TabularData returned by the projection.
    var data = d[0].data;

    // Perform some simple analysis of the data to determine things like
    // data types, hierarchy, etc.
    new aplos.data.SimpleDataAnalyzer().populateMetadata(dataSet, data);

    // Create a ChartGroup - any charts within a ChartGroup will be
    // linked together, meaning they will highlight the same data,
    // know when another chart drills or filters, etc.
    var chartGroup = new aplos.chart.ChartGroup();
    chartGroup.primaryHierarchy(dataSet.defaultHierarchy());
    chartGroup.defaultMeasure(dataSet.defaultMeasure());
    chartGroup.defaultAggregation(d3.sum);
      
    console.log(dataSet.defaultHierarchy());
      
    // Add a PieChart
    var pie = aplos.chart.PieChartView.fromConfig({
	    parentElementSelector: '#chartArea',
	    frameSize: {width: 320, height: 320},
	    arcWidth: 45
	});
    var controller = new aplos.chart.PieChartController(dataSet)
	.addChart(pie);
    chartGroup.addChartController(controller);

    chartGroup.draw();
}

function onDataError(e) {
    if (e.getStatusText) {
        console.log(e.getStatusText());
        d3.select('#status').text('Error: ' + e.getStatusText());
    } else {
        console.log(e);
    }
}

/*var chart = new aplos.chart.BarChartView();*/
console.log('About to do stuff...');
visualize(loadStaticData());
/*var data = [{x: 'foo', y: 212}, {x: 'bar', y: 121}];*/
/*chart.draw(data);*/