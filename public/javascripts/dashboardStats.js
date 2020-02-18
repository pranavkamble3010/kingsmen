$(document).ready(function(){

    $('#viewStats').on('click',function () {
    
    loadStatistics();
    });


    function loadStatistics(){
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
                // console.log(values);
                // console.log(labels);
    
                    var chart = new CanvasJS.Chart("chartContainer", {
                        animationEnabled: true,
                        title: {
                            text: "Status at a glance"
                        },
                        data: [{
                            type: "pie",
                            startAngle: 240,
                            yValueFormatString: "##0",
                            indexLabel: "{label} {y}",
                            dataPoints: [
                                {y: values[0], label: labels[0]},
                                {y: values[1], label: labels[1]},
                                {y: values[2], label: labels[2]},
                                {y: values[3], label: labels[3]}
                            ]
                        }]
                    });
                    chart.render();
                
            }
    }
});