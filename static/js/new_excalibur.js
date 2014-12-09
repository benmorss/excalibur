function loadStaticData(input) {
    $.get('/files/' + input, function(csv) {
        visualize(csv);
    });
}

function visualize(csv) {
    renderable = d3.csv.parse(csv)
    console.log(renderable)
    var chart = new aplos.chart.LineChartView();
    chart.configureSeries().x('week_start_date');
    chart.configureSeries().y('queries');
    chart.draw(renderable);
}
