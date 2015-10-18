var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var config = require('./config');
var braintree = require("braintree");
var aws = require("aws-lib");
var cors = require('cors');
var app = express();

app.use(cors());

var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: config.merchantId,
    publicKey: config.publicKey,
    privateKey: config.privateKey
});

var baseProducts = ["B00IK01PJC","B00JLT24BY","B00C2QNGYC","B00A6TNDAY","B013RMG6SM",
    "B00V6WSHZG","B004UPU06K","B007N9OWKU","B004RBDKQ4",
    "B00B0FV4FE","B00NAX637I","B001FVRUFQ","B004LUY9TS",
    "B00175TFU8","B00YIHH5KO","B01473TI3A","B00H8YHRU2","B00FX0G9UW"];

app.use(bodyParser.json());

app.get('/nextProduct', function(req, res, next) {
    console.log('Hi from express!');

    prodAdv = aws.createProdAdvClient(config.accessKeyId, config.secretAccessKey, config.associateTag);
    //var baseproductASIN2 = baseProducts[Math.floor(Math.random() * baseProducts.length)];
    var baseproductASIN2 = "B00C2QNGYC";
    console.log(baseproductASIN2);
    prodAdv.call("SimilarityLookup", {
        ItemId: baseproductASIN2,
        MerchantId: "Amazon",
        SimilarityType: "Random",
        ResponseGroup: "Similarities"
    }, function (err, result) {
        var items1 = result.Items['Item'];
        var randBaseItem = items1[Math.floor((Math.random() * items1.length))];
        var relatedProductASIN = randBaseItem.SimilarProducts.SimilarProduct[0].ASIN;
        //res.status(200).json(relatedProductASIN);
        console.log(relatedProductASIN);

        prodAdv.call("ItemLookup", {
            ItemId: relatedProductASIN,
            MerchantId: "Amazon",
            IncludeReviewsSummary: "False",
            ResponseGroup: "Request,Images,ItemAttributes"
        }, function (err2, result2) {
            console.log(JSON.stringify(result2));
            var expectedItem = result2.Items.Item;
            if (expectedItem != null) {
                var imageURL = expectedItem.LargeImage.URL;
                var title = expectedItem.ItemAttributes.Title;
                var price = expectedItem.ItemAttributes.ListPrice.FormattedPrice;
                var wishlistLink = expectedItem.ItemLinks.ItemLink[3].URL;
                var productLink = expectedItem.ItemLinks.ItemLink[3].URL;
                console.log(JSON.stringify(imageURL));
                r = {
                    title: title,
                    imageURL: imageURL,
                    price: price,
                    link: wishlistLink
                };
                res.status(200).json(r);
            }
        });

    });
});

http.createServer(app).listen(8080);