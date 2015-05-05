Ext.define('Rally.technicalservices.Legend',{
    extend: 'Ext.Container',
    alias: 'widget.tslegend',
    padding: 10,
    height: 40,
    flex: 1,
    layout: {type: 'hbox', pack: 'center'} ,
    tpl: '<tpl for="."><div class="tslegend" style="background-color:{color}">&nbsp;&nbsp;</div><div class="tslegendtext">&nbsp;&nbsp;{label}</div><span class="tslegendspacer">&nbsp;</span></tpl>',
    setLegendColors: function(legendHash){
        var color_data = [];
        _.each(legendHash, function(color, label){
            color_data.push({color: color, label: label});
        });
        this.update(color_data);
    }
});
