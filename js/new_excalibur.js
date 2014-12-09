function loadStaticData() {
    $.get('/static/AwesomeData.csv', function(csv) {
        visualize(csv);
    });
}

//TODO: the problem here might be that the draw method() might expect JSON. Or not.
function visualize(csv) {
    var chart = new aplos.chart.LineChartView();
    chart.draw(csv);
}

console.log('About to do stuff...');
loadStaticData();
