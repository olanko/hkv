

var products = [
    {"id": 0, "name": "Olvi III plo 0,33l", "qtys": [{"n": "24", q: 24}, {"n": "2x24", q: 48}, {"n": "3x24", q: 72}]},
    {"id": 1, "name": "Olvi IV plo 0,33l", "qtys": [{"n": "24", q: 24}, {"n": "2x24", q: 48}, {"n": "3x24", q: 72}]},
    {"id": 2, "name": "Fizz Päärynä tölkki 0,5l", "qtys": [{"n": "6", q: 6}, {"n": "2x6", q: 12}, {"n": "3x6", q: 18}]}
];

function setQty(qty) {
    $("#qty").val(qty);
}

function populateProducts(s) {
    console.log(s.val());
    $.each(products, function (key, value) {
        console.log(key, value);
    });

    changeProduct(s);
}

function changeProduct(s) {
    var pid = s.val();

    if(!pid) {
        return;
    }

    var p = products[pid];
    console.log(p);
    var quickQtys = p.qtys;

    if(!quickQtys) {
        return;
    }

    console.log(quickQtys);

    $("#quickqtys").empty();
    _.forEach(quickQtys, function (q) {
        console.log(q);
        var b = $('<button type="button" class="btn btn-primary"></button>').html(q.n).click(function () { setQty(q.q); });
        $("#quickqtys").append(b);
    });

    setQty(quickQtys[0].q);
}

