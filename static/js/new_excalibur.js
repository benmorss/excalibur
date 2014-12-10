function loadStaticData(input) {
//    $.get('/files/' + input, function(csv) {
    $.get('/static/result.csv', function(csv) {
        visualize(csv);
    });
}

function visualize(csv) {
    renderable = d3.csv.parse(csv)
    var chart = createLineViewForData(renderable);
    chart.draw(renderable);
}

function createTableViewForData(data) {
  var chart = new aplos.chart.LineChartView();
  return chart;
}

function createLineViewForData(data) {
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
    return new aplos.chart.LineChartView();
  }
}
