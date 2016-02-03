var products = [];
// var products = [
//     {"id": 0, "name": "Olvi III plo 0,33l", "qtys": [{"n": "24", q: 24}, {"n": "2x24", q: 48}, {"n": "3x24", q: 72}]},
//     {"id": 1, "name": "Olvi IV plo 0,33l", "qtys": [{"n": "24", q: 24}, {"n": "2x24", q: 48}, {"n": "3x24", q: 72}]},
//     {"id": 2, "name": "Fizz Päärynä tölkki 0,5l", "qtys": [{"n": "6", q: 6}, {"n": "2x6", q: 12}, {"n": "3x6", q: 18}]}
// ];

// /* Populate pruducts table in db */

// $.each(products, function (key, i) {

//     i.qtys = JSON.stringify(i.qtys);

//     $.ajax({
//         type: 'PUT',
//         url: '/api/products',
//         contentType: 'application/json',
//         data: JSON.stringify(i)
//     }).then(function (data) {
//         console.log('added: ' + data);
//     }).fail(function (error) {
//         console.log(error);
//     });
// });

var storages = [
    {'id': 0, 'name': 'Varasto', 'def': true},
    {'id': 1, 'name': 'Villipeura'},
    {'id': 2, 'name': 'Villikko'},
    {'id': 3, 'name': 'Villiruusu'}
];

// /* Populate storage table in db */

//    $.each(storages, function (key, i) {
//     console.log(JSON.stringify(i));
//         $.ajax({
//             type: 'PUT',
//             url: '/api/storages',
//             contentType: 'application/json',
//             data: JSON.stringify(i)
//         }).then(function (data) {
//             console.log('added: ' + data);
//         }).fail(function (error) {
//             console.log(error);
//         });
//     });

// var storages = [];

// $.getJSON('/api/storages')
//     .then(function (data) {
//         storages = data;
//     })
//     .fail(function (error) {
//         console.log(error);
//     });

function findProduct (id) {
    return products[id];
    // console.log(_.find(products, { 'id' : id }));
    // return _.find(products, { 'id' : id });
}

function findStorage (id) {
    return _.find(storages, { 'id' : id });
}
function setQty(qty) {
    $("#qty").val(qty);
}

function populateProducts(s) {
    $(s).empty();

    $.getJSON('/api/products')
       .then(function (data) {
           products = data;
            $.each(products, function (key, p) {
                // TODO: change
                products[key].qtys = JSON.parse(p.qtys);
                //console.log(key, products[key]);
                s.append($('<option>', {
                    value: p.id,
                    text : p.name
                }));
            });
            changeProduct(s);
        })
        .fail(function (error) {
            console.log(error);
        });
}

function changeProduct(s) {
    var pid = $(s).val();

    if(!pid) {
        return;
    }

    var p = findProduct(pid);

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
