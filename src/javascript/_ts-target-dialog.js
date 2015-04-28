Ext.define('Rally.technicalservices.dialog.TargetAllocation', {
    extend: 'Rally.ui.dialog.Dialog',
    autoShow: true,
    draggable: true,
    modal: true,
    width: 300,
    title: 'Target Allocations',
    items: {
        xtype: 'container',
        itemId: 'dialog-body',
        padding: 10
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            padding: '10',
            layout: {
                type: 'hbox',
                pack: 'center'
            },
            ui: 'footer',
            items: [
                {
                    xtype: 'rallybutton',
                    cls: 'primary',
                    itemId: 'saveButton',
                    text: 'Save',
                    disabled: true
                },
                {
                    xtype: 'rallybutton',
                    cls: 'cancel secondary',
                    text: 'Cancel',
                    itemId: 'cancelButton'
                }
            ]
        }
    ],
    initComponent: function(){
        this.callParent(arguments);

        this.addEvents('allocationsupdate');

        _.each(this.targetAllocation, function(val,key){
            this.down('#dialog-body').add({
                xtype: 'rallynumberfield',
                fieldLabel: key,
                labelAlign: 'right',
                value: val || 0,
                minValue: 0,
                maxValue: 100,
                listeners: {
                    scope: this,
                    change: this._validate
                }
            });
        }, this);

        this._validate();
        this.down('#saveButton').on('click', this._onSave, this);
        this.down('#cancelButton').on('click', this._onCancel, this);
    },
    _getUpdatedAllocations: function(){
        var allocations = {};
        var cmps = this.down('#dialog-body').query('rallynumberfield');
        _.each(cmps, function(cmp){
            allocations[cmp.fieldLabel] = cmp.getValue();
        });
        return allocations;
    },
    _validate: function(){

        var cmps = this.down('#dialog-body').query('rallynumberfield');
        var val = 0;
        _.each(cmps, function(cmp){
            val += cmp.getValue();
        });
        var valid = (val === 100);

        this.down('#saveButton').setDisabled(!valid);
        return valid;
    },
    _onSave: function(){
        var targetAllocationHash = this._getUpdatedAllocations();
        this.fireEvent('allocationsupdate', targetAllocationHash);
        this.destroy();
    },
    _onCancel: function(){
        this.destroy();
    }
});
