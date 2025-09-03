sap.ui.define([
    "sap/ui/core/format/DateFormat"
], (DateFormat) => {
	"use strict";

	return {
		/**
         * Formats a date to "d/MM/yy (EEE)"
         * Example: "2/12/25 (Wed)"
         * @param {string|Date} sDate - The date to format
         * @returns {string} - Formatted date string
         */
		formatDate: function (sDate) {
            if (!sDate) return "";  // Handle null/empty date values

            var oDateFormat = DateFormat.getInstance({ pattern: "MM/dd/yyyy" });
            return oDateFormat.format(new Date(sDate));
        },

        weightState(fValue) {
			try {
				fValue = parseFloat(fValue);
				if (fValue === "") {
					return None;
				} else if (fValue === "Open") {
					return Success;
				} else if (fValue === "Shipped") {
					return Error;
				}
			} catch (err) {
				return None;
			}
		},

		formatEstimatedDate: function (sDate) {
            if (!sDate) {
                return "01/01/1970";
            }
            
            if(sDate && sDate.length === 8){
                const year = sDate.slice(0, 4);
                const month = sDate.slice(4, 6) - 1; // Months are zero-indexed in JavaScript
                const day = sDate.slice(6, 8);
                sDate =  new Date(year, month, day);
            }
            let oDate = new Date(sDate);
            let oDateFormat = DateFormat.getDateInstance({ pattern: "MM/dd/yyyy" });
            return oDateFormat.format(oDate);
        },

		getTransitDays: function (sDate) {
            // if (!sDate) {
            //     return "";
            // }
            // let oTargetDate = new Date(sDate);
            // let oToday = new Date();
            // oToday.setHours(0, 0, 0, 0);
            // oTargetDate.setHours(0, 0, 0, 0);
            // let iDiff = Math.round((oTargetDate - oToday) / (1000 * 60 * 60 * 24));
            // return iDiff;
			const today = new Date();
			const expectedDate = new Date(sDate);
			const timeDiff = expectedDate.getTime() - today.getTime();
			const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
			return dayDiff > 0 ? dayDiff : 5;
        },

        getHBoxStyleClass: function(sMethod, sService) {
            return (sMethod || sService) ? "blueBackground" : "whiteBackground";
        },

        carrierDisplay:function(sCarrier){
            if(sCarrier && sCarrier.toUpperCase() === "FEDEX"){
                return "FedEx";
            }else{
                return sCarrier;
            }
        },

        formatCustomDateTimeForOrders: function (oDate) {
            if (!oDate) return "";
            const oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
                pattern: "MM/dd/yyyy HH:mm"
            });
            return oDateFormat.format(new Date(oDate));
          },

          formatCustomDateShipmentTable: function (sDateStr) {
            if (!sDateStr) return "";
            const oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
                pattern: "MM/dd/yyyy"
            });
            return oDateFormat.format(new Date(sDateStr));
          },

          getCarrierIconClass: function (sCarrierType) {
            switch (sCarrierType) {
              case "UPS":
                return "greenColorForIcon";
              case "FedEx":
                return "redColorForIcon";
              case "ABFS":
                return "yellowColorForIcon";
            }
          },

          getDeliveryStatusClass: function (sStatus) {
			if (sStatus === "Shipped") {
				return "greenColorForIcon";
			} else if (sStatus === "Cancelled") {
				return "redColorForIcon";
			}
			return "";
		},

        formatShipmentType:function(shipType){
            if(shipType === "SHIP"){
                return "Shipped";
            }else if(shipType === "CANC"){
                return "Cancelled";
            }
        }
	};
});