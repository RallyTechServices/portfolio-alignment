Ext.define('Rally.technicalservices.preferences.Allocation',{
    logger: new Rally.technicalservices.Logger(),
    noneText: 'None',
    allocationsByRelease: null,
    /**
     *  {
     *      releaseKey1:  {
     *          A:
     *          B:
     *          C:
     *          D:
     *      }
     *      releaseKey2: {}
     *  }
     *
     */
    constructor: function(){
        this.allocationsByRelease = {};
    },
    getAllocationHash: function(release){

        return this.allocationsByRelease[this.getReleaseKey(release)] || this.defaultHash;
    },
    getReleaseKey: function(release){
        if (release){
            var startDate = Rally.util.DateTime.fromIsoString(release.get('ReleaseStartDate')),
                endDate = Rally.util.DateTime.fromIsoString(release.get('ReleaseDate'));

            var utcStartDate = Rally.util.DateTime.shiftTimezoneOffDate(startDate),
                utcEndDate = Rally.util.DateTime.shiftTimezoneOffDate(endDate);

            return Rally.util.DateTime.toIsoString(utcStartDate) + Rally.util.DateTime.toIsoString(utcEndDate) + release.get('Name');
        } else {
            return "Unscheduled";
        }

    },
    load: function(appId, portfolioItemType, targetValues){
        var deferred = Ext.create('Deft.Deferred');
        this.allocationsByRelease = {};
        this.defaultHash = this._buildDefaultHash(targetValues);

        Rally.data.PreferenceManager.load({
            appID: appId,
            filterByName: portfolioItemType,
            scope: this,
            success: function(prefs) {
                if (prefs[portfolioItemType]){
                    this.allocationsByRelease = Ext.JSON.decode(prefs[portfolioItemType]);
                }
                deferred.resolve();
            }
        });
        return deferred;
    },
    update: function(appId, portfolioItemType, release, targetHash){

        this.allocationsByRelease[this.getReleaseKey(release)] = targetHash;

        var prefs = {};
        prefs[portfolioItemType] = Ext.JSON.encode(this.allocationsByRelease);

        Rally.data.PreferenceManager.update({
            appID: appId,
            settings: prefs,
            scope: this,
            success: function(updatedRecords, notUpdatedRecords) {
                this.logger.log('_setTargetAllocationHash save preferences',updatedRecords, notUpdatedRecords);
            }
        });
    },
    _cleanseHash: function(hash){
        var cleansedHash = {},
            noneText = this.noneText;

        _.each(values, function(v){
            if (v && v.length > 0) {
                cleansedHash[v] = 0;
            }
        });
        cleansedHash[noneText] = 0;

        _.each(hash, function(value, key){
            if (Ext.Array.contains(values, key)){
                cleansedHash[key] = value;
            } else {
                cleansedHash[noneText] = (cleansedHash[noneText] || 0) + value;
            }
        });
        return cleansedHash;
    },
    _buildDefaultHash: function(targetValues){
        var targetAllocationHash = {},
            numValidTargetValues = _.without(targetValues,"").length,
            defaultTargetAllocation = numValidTargetValues > 0 ? 100 / numValidTargetValues : 100;

        Ext.each(targetValues, function(f){
            if (f && f.length > 0){
                targetAllocationHash[f] = defaultTargetAllocation;
            }
        });
        return targetAllocationHash;
    }
});
