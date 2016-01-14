var products = [
    {"id": 0, "name": "Olvi III plo 0,33l", "qtys": [{"n": "24", q: 24}, {"n": "2x24", q: 48}, {"n": "3x24", q: 72}]},
    {"id": 1, "name": "Olvi IV plo 0,33l", "qtys": [{"n": "24", q: 24}, {"n": "2x24", q: 48}, {"n": "3x24", q: 72}]},
    {"id": 2, "name": "Fizz Päärynä tölkki 0,5l", "qtys": [{"n": "6", q: 6}, {"n": "2x6", q: 12}, {"n": "3x6", q: 18}]}
];

var storages = [
    {'id': 0, 'name': 'Varasto', 'default': true},
    {'id': 1, 'name': 'Villipeura'},
    {'id': 2, 'name': 'Villikko'},
    {'id': 3, 'name': 'Villiruusu'}
];

function findProduct (id) {
    return _.find(products, { 'id' : id });
}

function findStorage (id) {
    return _.find(storages, { 'id' : id });
}
function setQty(qty) {
    $("#qty").val(qty);
}

function populateProducts(s) {
    $(s).empty();
    $.each(products, function (key, p) {
        s.append($('<option>', {
            value: p.id,
            text : p.name
        }));
    });

    changeProduct(s);
}

function changeProduct(s) {
    var pid = $(s).val();

    if(!pid) {
        return;
    }

    var p = products[pid];
    var quickQtys = p.qtys;

    if(!quickQtys) {
        return;
    }

    $("#quickqtys").empty();
    _.forEach(quickQtys, function (q) {
        var b = $('<button type="button" class="btn btn-primary">').html(q.n).click(function () { setQty(q.q); });
        $("#quickqtys").append(b);
    });

    setQty(quickQtys[0].q);
}

function doTransfer (f) {

    var data = {};
    _.map($(f).serializeArray(), function (o) { data[o.name] = 0 | o.value; });

    var p = findProduct(data.product);

    var t = 'Siirretty ' + data.qty + ' ' + p.name + ' ' + findStorage(data.sto_from).name + ' -> ' + findStorage(data.sto_dest).name;

    $('#alerttext').html(t);
    $('#alerttext').show();
}
