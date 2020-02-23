$(document).ready(function(){

    $('#viewStats').on('click',function () {
    
    loadPieChart();
    });


    function loadPieChart(){
        var results = {}
            $.ajax({
                type: "GET",
                url: '/stats',
                async: false,
                error: function(_,status,err){
                    console.log(status,err);
                    alert("Error occured!"+err);
                },
                success:function(data){
                    renderChart(data)
                }});
    
        function renderChart(data){
                this.results=JSON.parse(data);
                console.log(this.results);
                values = Object.values(this.results);
                labels = Object.keys(this.results);

                function getDataPoints(){

                    result = [];

                    for(var i=0;i<labels.length;i++){
                        result.push({y:values[i], label:labels[i]})

                    }
                    return result;
                }
                // console.log(values);
                // console.log(labels);
    
                    var chart = new CanvasJS.Chart("chartContainer", {
                        animationEnabled: true,
                        title: {
                            text: "Results at a glance"
                        },
                        data: [{
                            type: "pie",
                            startAngle: 240,
                            yValueFormatString: "##0",
                            indexLabel: "{label} {y}",
                            dataPoints: getDataPoints()
                            //[
                            //     {y: values[0], label: labels[0]},
                            //     {y: values[1], label: labels[1]},
                            //     {y: values[2], label: labels[2]},
                            //     {y: values[3], label: labels[3]}
                            // ]
                        }]
                    });
                    chart.render();
                
            }
    }


    function loadBarChart(){
        
    }
});