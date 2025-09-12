sap.ui.define([
    "com/eshipjetcopy/zeshipjetcopy/controller/BaseController"
  ], function(BaseController) {
    "use strict";
  
    return BaseController.extend("com.eshipjetcopy.zeshipjetcopy.controller.Dashboard", {
    
      onInit: function() {
        // nothing special if you don't need
      },
  
      handlePopoverListItemPress: function(oEvent) {
        const oCurrObj = oEvent.getSource().getBindingContext().getObject();
        if (oCurrObj && oCurrObj.name === "Locations") {
          this.loadFragmentPage(
            "com.eshipjetcopy.zeshipjetcopy.view.fragments.Locations",
            "Locations",
            "_oLocationsPage",
            this.byId("pageContainer"),
            function(oFragment){
              this._displayTables(
                oFragment.byId("_IDLocationTable").getId(),
                "LocationTableColumns",
                "LocationTableRows",
                "Locations"
              );
            }.bind(this)
          );
        }
      }
    });
  });
  