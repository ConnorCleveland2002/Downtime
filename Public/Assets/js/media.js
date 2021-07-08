$(document).ready(() => {

    // Get logged in user's data
    let user = $.get("/").then(function (data) {
        console.log('user.email: ', data.email);
        console.log('user.name: ', data.name);
        return data;
    });

    // ********** Event listeners ***********
    let currentMediaId;
    $(document).on('click', (event) => {

        // Click on any category name
        if ($(event.target).attr('class') === 'title || song_title') {

            // Get the media accoridng to title
            $.ajax({
                method: "GET",
                url: `/api/db/schema/${event.target.text}`
            }).then((medias) => {
                console.log(`Media within ${event.target.text}: `, schema);

                // Empty the mediaCards area
                $('#mediaCards').empty();

                // Create the media cards
                medias.forEach((media) => {
                    let card = `
                <div class="card" style="width: 12rem;">
                    <div class="card-body">
                        <h5 class="card-title"><a href="#" class="modalTrigger" bookId="${media.id}">${media.title}</a></h5>
                        <p class="card-text">
                            By ${media.authors}
                        </p>
                    </div>
                </div>
                `;
                    $('#booksCards').append(card);
                });
            });
        }

        // Click on the modal
        else if ($(event.target).attr('class') == 'modalTrigger') {

            // Get media details by its id
            $.ajax({
                method: "GET",
                url: `/api/db/schema${$(event.target).attr('mediaId')}`
            }).then((media) => {
                console.log('Modal media: ', media);

                // Empty the modal area
                $('.modal-body').empty();

                // Create the modal media card
                let modalBMediaCard = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title"><a href="#" class="modalTrigger" mediaId="${media.id}">${media.title}</a></h5>
                        <p class="card-text"> <strong> By </strong> ${media.authors}</p>
                        <p class="card-text"> <strong> Categories </strong> ${media.category}</p>
                        <p class="card-text"> <strong> Published year </strong> ${book.publishedDate}</p>
                    </div>
                </div>
                `;
                $('.modal-body').append(modalMediaCard);

                // Display the modal
                $('#bookModal').modal();

                currentMediaId = media.id;
            });
        }

        // Click on add to the cart
        else if ($(event.target).attr('id') == 'addToCart') {
            console.log('Add to cart button clicked');
            console.log('currentMediaId: ', currentMediaId);

            $.get("/api/user_data").then(function (data) {
                console.log('user.email: ', data.email);
                console.log('user.id: ', data.id);

                // Add the book to the cart
                $.post("/api/shoppingcarts", {
                    UserId: data.id,
                    MediaId: currentMediaId
                }, (cart_answer) => {
                    console.log('cart_answer: ', cart_answer);
                    window.location.href = "/cart";
                });
            });


        }
    });

    // Load the medias
    $.ajax({
        method: "GET",
        url: "/api/schema/"
    }).then((medias) => {
        // console.log('Medias: ', media);

        // Create the list of title
        let categories = medias.map((book) => {
            return media.title;
        });
        // console.log('Title: ', title);

        let uniqueTitle = Array.from(new Set(title));

        
        uniqueTitle.forEach((title) => {
            let li = $('<li>');
            let a = $('<a>');
            a.attr('href', `#`);
            a.attr('class', 'title || song_title');
            a.text(title);
            li.append(a);
            $('#titles').append(li);
        });
    });
});