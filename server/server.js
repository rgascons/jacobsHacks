var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var config = require('./config');
var app = express();
var braintree = require("braintree");
var aws = require("aws-lib");
var beautifier = require("beautifier");

var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: config.merchantId,
    publicKey: config.publicKey,
    privateKey: config.privateKey
});

function getProductData() {


    // return result ;
    return 1;
}


var baseproductASIN = "B00IK01PJC";
var baseproductASIN = "B00JLT24BY";
var baseproductASIN2 = "B00C2QNGYC";

app.use(bodyParser.json());

app.get('/nextProduct', function(req, res, next) {
    console.log('Hi from express!');
    var data = getProductData();
    console.log(data);

    prodAdv = aws.createProdAdvClient(config.accessKeyId, config.secretAccessKey, config.associateTag);

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