function loadStaticData(input) {
//    $.get('/files/' + input, function(csv) {
    $.get('/static/' + input, function(csv) {
        visualize(csv);
    });
}

function visualize(csv) {
    renderable = d3.csv.parse(csv)
    return visualizeLineViewForData(renderable);
}

function createTableViewForData(data) {
  var chart = new aplos.chart.LineChartView();
  return chart;
}

function visualizeLineViewForData(data) {
  if (data == null || data.length === 0) { // null input, return empty chart
    return new aplos.chart.LineChartView();
  } else if (Object.keys(data[0]).length === 2) { // single series line view
    var chart = new aplos.chart.LineChartView().frameSize({width: 800, height: 300});
    var keys = Object.keys(data[0]);
    chart.configureSeries().x(keys[0]);
    chart.configureSeries().y(keys[1]);
    return chart;
  } else {
    var chart = new aplos.chart.LineChartView().frameSize({width: 800, height: 300});
    var keys = Object.keys(data[0]);
    var x_axis = keys[0];
    var newData = {};
    for (var i = 0; i < data.length; i++) {
      for (var j = 1; j < keys.length; j++) {
        if (!(keys[j] in newData)) {
	  // seeing this series for the first time, do necessary setup
	  newData[keys[j]] = [];
          chart.configureSeries(keys[j]).x(x_axis);
          chart.configureSeries(keys[j]).y(keys[j]);
	  chart.configureSeries(keys[j]).domainAxis(x_axis);
	  chart.configureSeries(keys[j]).axisRenderer(new aplos.chart.d3.svg.axis(40));
	}
	objToPush = {};
	objToPush[x_axis] = data[i][x_axis];
	objToPush[keys[j]] = data[i][keys[j]];
	newData[keys[j]].push(objToPush);
      }
    }
    drawable = [];
    var keys = Object.keys(newData);
    for (var i = 0; i < keys.length; i++) {
      drawableObj = {};
      drawableObj['name'] = keys[i];
      drawableObj['data'] = newData[keys[i]];
      drawable.push(drawableObj);
    }
    chart.draw(drawable);
  }
}
