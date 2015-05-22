Ext.define('Rally.technicalservices.PortfolioAlignmentSettings',{

    chartColors: [ '#2f7ed8', '#8bbc21', '#910000',
        '#492970', '#f28f43', '#145499','#77a1e5', '#c42525', '#a6c96a',
        '#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9','#aa1925',
        '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1','#1aadce',
        '#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE',
        '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92'],
    noneText: 'None',
    noneColor: '#C0C0C0',
    otherText: 'Other',
    otherColor: '#363636',

    persistAllocationsByProject: true,
    categoryField: 'InvestmentCategory',

    chartType: {
        targeted: {
            title: 'Investment Planning Targets for {0}',
            field: '',
            display: true,
            toolTip: 'Desired investment allocation for {0} in the selected release.  <br/><br/>Click <b><i>Configure Targets...</i></b> to change the target allocations. Target Allocations will be saved to preferences for the selected Release and {1}.  Allocations must add up to 100%.'
        },
        planned: {
            title: 'Preliminary Feature Estimates',
            field: 'PreliminaryEstimate',
            display: true,
            dataFieldAttribute: 'Value',
            toolTip: "Allocation of numeric Preliminary Estimate field values for all {0}s in the selected Release for the current project scope."
        },
        scheduled: {
            title: 'Estimated User Story Points',
            field: 'LeafStoryPlanEstimateTotal',
            display: true,
            toolTip: "Sum of the plan estimates for all user story descendants of all {0}s in the selected release for the current project scope.<br/><br/>The portfolio items are for the current scope, the user stories included in the sum are independent of scope or associated release becuase they are retrieved from the LeafStoryPlanEstimateTotal field."
        },
        actual: {
            title: 'Accepted User Story Points',
            field: 'AcceptedLeafStoryPlanEstimateTotal',
            display: true,
            toolTip: "Sum of the plan estimates for all currently accepted user story descendants of all {0}s in the selected release for the current project scope.<br/><br/>  The portfolio items are for the current scope, the user stories included in the sum are independent of scope or associated release becuase they are retrieved from the AcceptedLeafStoryPlanEstimateTotal field."
        }
    },

    legendColors: {},

    showDataLabels: true,
    dataLabelDistance: 1,
    dataLabelColor: 'black',
    constructor: function(config){
        Ext.apply(this,config);
    },
    _getScopeText: function(){
        if (this.persistAllocationsByProject === true){
            return 'Project';
        }
        return 'Workspace';
    },
    setLegendColors: function(legendColorHash){
        legendColorHash[this.noneText] = this.noneColor;
      //  legendColorHash[this.otherText] = this.otherColor;
        this.legendColors = legendColorHash;
    },
    getLegendColor: function(category){
        return this.legendColors[category] || this.otherColor;
    },
    getSeriesName: function(chartType){
        var seriesName = chartType;
        if (this.chartType[chartType]){
            seriesName = this.chartType[chartType].title || chartType;
        }
        return seriesName;
    },
    getChartTypeDataField: function(chartType){
        if (this.chartType[chartType]){
            return this.chartType[chartType].field || null;
        }
        return null;
    },
    getChartTypeDataFieldAttribute: function(chartType){
        if (this.chartType[chartType]){
            return this.chartType[chartType].dataFieldAttribute || null;
        }
        return null;
    },
    getChartTitle: function(chartType){
        if (this.chartType[chartType]){
            if (chartType == 'targeted'){
                return Ext.String.format(this.chartType[chartType].title || chartType, this._getScopeText());
            }
            return this.chartType[chartType].title || chartType;
        }
        return chartType;
    },
    getToolTip: function(chartType, portfolioItemType){
        var toolTip = Ext.String.format(this.chartType[chartType].toolTip || Ext.String.format("No tool tip found.",chartType), portfolioItemType, this._getScopeText());
        if (chartType == 'targeted'){
        }
        return Ext.String.format("<b>{0}</b>:  {1}",
            this.getChartTitle(chartType), toolTip);
    },
    getNoDataMessage: function(chartType){
        return '<span class="tscenter">No data to display</span>';
    }
});