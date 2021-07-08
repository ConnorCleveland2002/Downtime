$(document).ready(() => {


    let cleanedCarts;

    // Get logged in user's data
    let user = $.get("/api/user_data").then(function (data) {
        console.log('user.email: ', data.email);
        console.log('user.id: ', data.id);
        return data;
    });



    // ******************** Event listeners *********************
    $(document).on('click', (event) => {

        // Continue browsing button clicked
        if ($(event.target).attr('id') === 'continueBrowsing') {
            window.location.href = "/browse"
        }

        // Purchases history button clicked
        if ($(event.target).attr('id') === 'purchasesHistory') {
            $('#purchasesDiv').toggle();
        }

        // Confirm purchse button clicked
        if ($(event.target).attr('id') === 'confirmPurchase') {

            $.get("/api/user_data").then(function (data) {
                console.log('user.email: ', data.email);
                console.log('user.id: ', data.id);

                // Add the shoppincart to the purchases
                cleanedCarts.forEach((cart) => {
                    Object.values(cart).forEach((cartElement) => {
                        if (typeof cartElement === 'object' && cartElement != null && cartElement[0] != undefined) {
                            $.post("/api/purchases", {
                                UserId: data.id,
                                BookId: cartElement[0].id
                            }, (cart_answer) => {
                                // window.location.href = "/cart";
                            });
                        }
                    });
                });

                // Delete the shoppingcart
                $.ajax({
                    method: "DELETE",
                    url: `/api/shoppingcarts/${data.id}`
                }).then((cart_answer) => {
                    console.log('Cart deleted: ', cart_answer);
                });


                // Display the modal
                $('#purchaeConfirmationModal').modal();

                // Refresh shoppincart table and Show purchase history
                $('#purchaeConfirmationModal').on('hidden.bs.modal', function (e) {
                    loadShoppingcart();
                    loadPurchases();
                    $('#purchasesDiv').show();
                    $('#confirmPurchase').hide();
                })
            });


        }
    });

    // ******************** Functions *********************
    const loadShoppingcart = () => {
        console.log('loadShoppingcart()');

        // Clean the shoppingcart table
        $('#cartTableBody').empty();

        // Load the shoppingcarts
        $.ajax({
            method: "GET",
            url: "/api/shoppingcarts/"
        }).then((shoppingcarts) => {
            let total = 0;

            if (shoppingcarts.length > 0) {
                // Clean the data
                cleanedCarts = shoppingcarts.map((shoppingcart) => {
                    return {
                        id: shoppingcart.id,
                        UserId: shoppingcart.UserId,
                        Books: shoppingcart.Books
                    }
                });

                // Create the table
                cleanedCarts.forEach((cart) => {
                    let tr = $('<tr>');
                    let td0 = $('<td>');
                    let td1 = $('<td>');
                    let td2 = $('<td>');
                    let td3 = $('<td>');
                    let td4 = $('<td>');
                    td0.text(cart.id);
                    td1.text(cart.UserId);
                    Object.values(cart).forEach((cartElement) => {
                        if (typeof cartElement === 'object' && cartElement != null && cartElement[0] != undefined) {
                            td2.text(cartElement[0].id);
                            td3.text(cartElement[0].title);
                            td4.text(cartElement[0].price);
                            total += parseFloat(cartElement[0].price);
                        }
                        tr.append(td0);
                        tr.append(td1);
                        tr.append(td2);
                        tr.append(td3);
                        tr.append(td4);
                    });
                    $('#cartTableBody').append(tr);
                });
                total = total.toFixed(2);
                let tr = $('<tr>');
                let td0 = $('<td>');
                let td1 = $('<td>');
                let td2 = $('<td>');
                let td3 = $('<td>');
                let td4 = $('<td>');
                td3.text('Total');
                td4.text(`${total}`);
                tr.append(td0);
                tr.append(td1);
                tr.append(td2);
                tr.append(td3);
                tr.append(td4);
                $('#cartTableBody').append(tr);
            } else {
                $('#confirmPurchase').hide();
            }
        });
    }


    const loadPurchases = () => {
        // Clean the purchases table
        $('#purchasesTableBody').empty();

        // Load the purchases
        $.get("/api/user_data").then(function (data) {
            console.log('user.email: ', data.email);
            console.log('user.id: ', data.id);

            $.ajax({
                method: "GET",
                url: `/api/purchase/${data.id}` // Missing 
            }).then((purchases) => {

                // Clean the data
                let cleanedPurchases = purchases.map((purchase) => {
                    return {
                        id: purchase.id,
                        date: moment(purchase.date).format("MMM Do YY"),
                        UserId: purchase.UserId,
                        Books: purchase.Books
                    }
                });
                console.log('cleanedPurchases: ', cleanedPurchases);

                // Create the table
                cleanedPurchases.forEach((purchase) => {
                    let tr = $('<tr>');
                    let td0 = $('<td>');
                    let td1 = $('<td>');
                    let td2 = $('<td>');
                    let td3 = $('<td>');
                    let td4 = $('<td>');
                    let td5 = $('<td>');
                    td0.text(purchase.id);
                    td1.text(purchase.UserId);
                    td5.text(purchase.date);
                    Object.values(purchase).forEach((purchaseElement) => {
                        if (typeof purchaseElement === 'object' && purchaseElement != null && purchaseElement[0] != undefined) {
                            td2.text(purchaseElement[0].id);
                            td3.text(purchaseElement[0].title);
                            td4.text(purchaseElement[0].price);
                        }
                    });
                    tr.append(td0);
                    tr.append(td1);
                    tr.append(td2);
                    tr.append(td3);
                    tr.append(td4);
                    tr.append(td5);
                    $('#purchasesTableBody').append(tr);
                });
            });
        });

    }

    const init = () => {
        loadShoppingcart();
        loadPurchases()
        $('#purchasesDiv').hide();
    }

    init();
});