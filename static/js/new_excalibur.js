function loadStaticData(input) {
    $.get('/files/' + input, function(csv) {
        visualize(csv);
    });
}

function visualize(csv) {
    renderable = d3.csv.parse(csv)
    console.log(renderable)
    var chart = createLineViewForData(renderable);
    chart.draw(renderable);
}

function createTableViewForData(data) {
  var chart = new aplos.chart.LineChartView();
  return chart;
}

function createLineViewForData(data) {
  var chart = new aplos.chart.LineChartView();
  chart.configureSeries().x('week_start_date');
  chart.configureSeries().y('queries');
  return chart
}
