var db = require("../models");


    router.get("/api/purchases", (req, res) => {
        db.Purchase.findAll({
            include: [db.google_book, db.songs]
        }).then(function (dbPurchase) {
            console.log('In .get /api/purchases - findAll()');
            console.log('req.body: ', req.body);
            console.log('dbPurchase: ', dbPurchase);
            res.json(dbPurchase);
        });
    });

    router.get("/api/purchase/:UserId", function (req, res) {
        db.Purchase.findAll({
            where: {
                UserId: req.params.UserId
            },
            include: [db.Book]
        }).then(function (dbPurchase) {
            console.log('In .get /api/purchase/:UserId - findAll()');
            console.log('req.params.UserId: ', req.params.UserId);
            console.log('dbPurchase: ', dbPurchase);
            res.json(dbPurchase);
        });
    });

    router.post("/api/purchases", (req, res) => {
        db.Purchase.create({
            UserId: req.body.UserId,
            MediaId: req.body.MediaId,
            date: new Date()
        }).then(function (dbPurchase) {
            console.log('In .POST /api/purchases - create()');
            console.log('req.body: ', req.body);
            console.log('dbPurchase: ', dbPurchase);
          
            db.Purchase_Book.create({
                PurchaseId: dbPurchase.id,
                MediaId: req.body.MediaId
            }).then(function (dbPurchase_Media) {
                console.log('In .POST /api/purchase - create() - Purchase_Media');
                console.log('req.body: ', req.body);
                console.log('dbPurchase_Book: ', dbPurchase_Media);
                res.json(dbPurchase_Media);
            });
        });
    });


    router.delete("/api/purchases/:UserId", (req, res) => {
        db.Purchase.destroy({
            where: {
                UserId: req.params.UserId
            }
        }).then(function (dbPurchase) {
            console.log('In .DELETE /api/purchases - destroy()');
            console.log('req.params.UserId: ', req.params.UserId);
            console.log('dbPurchase: ', dbPurchase);
            res.json(dbPurchase);
        });
    });

    app.put("/api/purchases", (req, res) => {
        db.Purchase.update(
            req.body,
            {
                where: {
                    UserId: req.body.UserId
                }
            }).then(function (dbPurchase) {
                console.log('In .PUT /api/purchases - update()');
                console.log('req.body.UserId: ', req.body.UserId);
                console.log('dbPurchase: ', dbPurchase);
                res.json(dbPurchase);
            });
    });

    module.exports = router;
