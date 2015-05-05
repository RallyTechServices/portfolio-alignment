Ext.define('Rally.technicalservices.chart.AllocationPie',{
    extend: 'Rally.ui.chart.Chart',
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        events: {
            load: function(){
                var chart = this,
                    title = chart.title.text;

                chart.title.on('mouseover', function(e){

                    Ext.create('Rally.technicalservices.tooltip.Help', {
                        target : e.target,
                        type: title,
                        autoShow: true
                    });
                });

                if (title == targetTitle){
                    chart.title.on('click', fnBuildTargetDialog);
                }
            }
        }
    },
    title: {
       // text: title,
       // style: style
    },
    tooltip: {
        pointFormat: '{point.y:.1f} (<b>{point.percentage:.1f}%</b>)'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: this.showDataLabels,
                distance: 3,
                color: 'black',
                formatter: function(){

                    if (this.percentage > 0){
                        return this.percentage.toFixed(1) + '%';
                    }
                    return null;
                }
            },
            showInLegend: false
        }
    }
});