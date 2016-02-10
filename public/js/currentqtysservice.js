angular.module('hkApp.controllers')
/* Find current qtys of all products */
.factory('CurrentQtysService', function () {
    return {
        setCurrentQtys: function (transfers, products, storage) {
            var runningvalues = {};

            for (var i = 0; i < transfers.length; i++) {
                /* Delivery */
                if (transfers[i].type == 3) {
                    transfers[i].runningvalue = transfers[i].absolute;

                    /* If first absolute value or value matches running value, then fine. */
                    if (!runningvalues[transfers[i].productid] || runningvalues[transfers[i].productid] == transfers[i].absolute) {
                        transfers[i].class = 'bg-success';
                    } else {
                        transfers[i].class = 'bg-danger';
                    }
                    runningvalues[transfers[i].productid] = 1.0 * transfers[i].absolute;
                } else {
                    if (!runningvalues[transfers[i].productid]) {
                        runningvalues[transfers[i].productid] = 0;
                        transfers[i].runningvalue = 0;
                    }

                    transfers[i].change = 0;

                    /* Transfer and delivery */
                    if (transfers[i].type === 0 || transfers[i].type === 1) {
                        if (transfers[i].fromstorageid == storage.id) {
                            transfers[i].change += -1.0 * transfers[i].relative;

                        }
                        if (transfers[i].tostorageid == storage.id) {
                            transfers[i].change += 1.0 * transfers[i].relative;
                        }
                    }

                    /* Sales */
                    if (transfers[i].type === 2) {
                        transfers[i].change += 1.0 * transfers[i].relative;
                    }

                    runningvalues[transfers[i].productid] += transfers[i].change;
                    transfers[i].runningvalue = runningvalues[transfers[i].productid];
                }
            }

            /* Populate products current values ater products loaded. */
            angular.forEach(products, function (value, key) {
                products[key].currentqty = runningvalues[value['id']];
            });
        }
    };
});