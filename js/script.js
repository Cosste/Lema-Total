/**
 * Created by stefanromanescu on 22/08/16.
 */
var app=angular.module('myApp', ['ngRoute']);
app.config(function($routeProvider){
    $routeProvider
        .when('/',{
            templateUrl:'snippets/home-snippet.html',
            controller: 'HomeController'
        })
        .when('/acasa',{
            templateUrl:'snippets/home-snippet.html',
            controller: 'homeController'
        })
        .when('/produse',{
            templateUrl:'snippets/home-snippet.html',
            controller: 'produseController'
        })
        .when('/contact',{
            templateUrl:'snippets/home-snippet.html',
            controller: 'contactController'
        })
        .when('/panouriRadiante',{
            templateUrl:'snippets/products-title-snippet.html',
            controller: 'ProductsController'
        })
        .when('/panouriRadiante/P',{
        templateUrl:'snippets/products-category-title-snippet.html',
        controller: 'productsSubcategoryController'
        })
        .when('/panouriRadiante/PN',{
            templateUrl:'snippets/products-category-title-snippet.html',
            controller: 'productsSubcategoryController'
        })
        .when('/panouriRadiante/A',{
            templateUrl:'snippets/products-category-title-snippet.html',
            controller: 'productsSubcategoryController'
        })
        .when('/panouriRadiante/LUX',{
            templateUrl:'snippets/products-category-title-snippet.html',
            controller: 'productsSubcategoryController'
        })
        .when('/panouriRadiante/I',{
            templateUrl:'snippets/products-category-title-snippet.html',
            controller: 'productsSubcategoryController'
        })
        .when('/foliiradiante',{
            templateUrl:'snippets/folieRadianta-snippet.html',
            controller: 'folieController'
        })
        .when('/termostat',{
            templateUrl:'snippets/termostat-title-snippet.html',
            controller: 'termostatController'
        })
        .when('/iluminare',{
            templateUrl:'snippets/iluminareUrgenta-snippet.html',
            controller: 'iluminareController'
        })
        /*.when('/iluminare',{
            templateUrl:'snippets/iluminareUrgenta-snippet.html',
            controller:iluminareController
        })
*/

});

app.controller('homeController',function($scope){
    //$("html, body").animate({ scrollTop: $('#carousel').offset().top }, 500);
});
app.controller('produseController',function($scope){
    $("html, body").animate({ scrollTop: $('#products').offset().top }, 500);
});
app.controller('contactController',function($scope){
    $("html, body").animate({ scrollTop: $('#contact').offset().top }, 500);
});


function insertHTML(selector, htmlToInsert){
    $(selector).append(htmlToInsert);
}

function showLoading (selector){
    insertHTML(selector, "<div class='text-center'>" + "<img src='images/gears.svg'></div>");
}

//Return substitute of '{{propName}}' with propValue in given 'string'
function insertProperty (string, propName, propValue) {
    return string.replace(new RegExp("{{" + propName + "}}", "g"), propValue);
}

app.controller('HomeController', function($scope){
    var mySwiper = new Swiper ('.swiper-container', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
        effect:'coverflow',
        slidesPerView: 2,
        centeredSlides: true,
        grabCursor: true,
        hashnav:true,
        // If we need pagination
        pagination: '.swiper-pagination',

        // Navigation arrows
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev'

    });
});

app.controller('ProductsController', function($scope){
    $scope.message = "Panouri radiante";
    var lema = {};

    var homeHTML="snippets/home-snippet.html";
    var allProductsUrl = "panouriRadiante.json";
    var productsTitleHtml = "snippets/products-title-snippet.html";
    var productsHtml = "snippets/products-snippet.html";

    function insertHTML(selector, htmlToInsert){
        $(selector).append(htmlToInsert);
    }

    function showLoading (selector){
        insertHTML(selector, "<div class='text-center'>" + "<img src='images/gears.svg'></div>");
    }

    //Return substitute of '{{propName}}' with propValue in given 'string'
    function insertProperty (string, propName, propValue){
        return string.replace(new RegExp("{{" + propName + "}}", "g"), propValue);
    }

    lema.loadProductsCategories = function (){
        $.get(allProductsUrl, buildAndShowProductsHTML);
    };

    function buildAndShowProductsHTML(products){
            //Retrive single product snippet
            $.get(productsHtml, function(productsHtml){
                var productsViewHtml =
                    buildProductsViewHtml(products, productsHtml);
                insertHTML("#mainContent", productsViewHtml);
            });
    }

    function buildProductsViewHtml(product, productsHtml){
        var finalHtml = "<div class='container'>";
        finalHtml += "<section class='row'>";
        for (var i in product.products){
            var html = productsHtml;
            var name = "" + product.products[i].name;
            html = insertProperty(html, "name", name);
            html = insertProperty(html, "shortName", i);
            finalHtml += html;
        }
        finalHtml += "</section></div></div>";
        //insertHTML("#mainContent", finalHtml);
        return finalHtml;
    }
    lema.loadProductsCategories();
});

app.controller('productsSubcategoryController', function($scope){
    var url = (document.location.hash).substr(document.location.hash.lastIndexOf('/') + 1);
    var homeHTML="snippets/home-snippet.html";
    var allProductsUrl = "panouriRadiante.json";
    var productsTitleHtml = "snippets/products-title-snippet.html";
    var productsHtml = "snippets/products-snippet.html";
    var lema = {};
    loadProductsSubcatgory = function(short_name){
        lema.shortName = short_name;
        $.get(allProductsUrl, buildAndShowProductsSubcategories);
    }

    function buildAndShowProductsSubcategories(products){
        $scope.message = products.products[lema.shortName].name;
        $.get("snippets/products-category-snippet.html", function(productsHtml){
            var productsViewHtml =
                buildProductsSubcategoriesHtml(products, productsHtml);
            insertHTML("#mainContent", productsViewHtml)
        });
    }

    function buildProductsSubcategoriesHtml(product, productsHtml){
        var finalHtml = "";
        if(product.products[lema.shortName].details != undefined){
            finalHtml += "<h3 class='text-center'>" + product.products[lema.shortName].details + "</h3>";
        }
        finalHtml += "<div class='container'><section class='row'>";
        for(var i in product.products[lema.shortName].objects){
            var html = productsHtml;
            html = insertProperty(html, "name", product.products[lema.shortName].objects[i].name);
            html = insertProperty(html, "aplication", product.products[lema.shortName].objects[i].aplication);
            html = insertProperty(html, "putere", product.products[lema.shortName].objects[i].specifications["Putere [W]"]);
            html = insertProperty(html, "tensiune", product.products[lema.shortName].objects[i].specifications["Tensiune [V]"]);
            html = insertProperty(html, "amperaj", product.products[lema.shortName].objects[i].specifications["Amperaj [A]"]);
            html = insertProperty(html, "dimensiuni", product.products[lema.shortName].objects[i].specifications["Dimensiuni [mm]"]);
            html = insertProperty(html, "greutate", product.products[lema.shortName].objects[i].specifications["Greutate [kg]"]);
            html = insertProperty(html, "suprafata", product.products[lema.shortName].objects[i].specifications["Suprafata incalzita"]);
            html = insertProperty(html, "inaltime", product.products[lema.shortName].objects[i].specifications["Inaltime de montaj"]);
            html = insertProperty(html, "catalog", product.products[lema.shortName].objects[i].Catalog);
            html = insertProperty(html, "instructiuni", product.products[lema.shortName].objects[i].Instructiuni);
            html = insertProperty(html, "foaieProdus", product.products[lema.shortName].objects[i]["Foaie produs"]);
            finalHtml += html;
        }
        finalHtml += "</section></div></div>";
        return finalHtml;
    }

    loadProductsSubcatgory(url);
});

app.controller('folieController', function($scope){

});

app.controller('termostatController', function($scope){
    loadThermostatCategories = function (){
        $.get("termostat.json", buildAndShowThermostatCategoriesHtml);
    };
    function buildAndShowThermostatCategoriesHtml(thermostatJSON){
            $.get("snippets/termostat-snippet.html", function(thermostatHtml){
                var thermostatViewHtml=
                    buildThermostatCategoriesHtml(thermostatJSON, thermostatHtml);
                insertHTML("#mainContent", thermostatViewHtml);
            });
    }

    function buildThermostatCategoriesHtml(thermostatJSON, thermostatHtml){
        var finalHtml = "<div class='container'><div class='row'>";
        for(var i in thermostatJSON){
            var html = thermostatHtml;
            html = insertProperty(html, "name", thermostatJSON[i].name);
            html = insertProperty(html, "image", thermostatJSON[i].image);
            html = insertProperty(html, "content", thermostatJSON[i].content);
            finalHtml += html;
        }
        finalHtml += "</div></div>";
        return finalHtml;

    }
    loadThermostatCategories();

});

app.controller('iluminareController', function($scope){});

$(document).ready(function () {

    $("#navbarToggle").blur(function(event){
        if(window.innerWidth < 768){
            $("#collapsable-nav").collapse('hide');
        }
    });
    /*
    function insertHTML(selector, htmlToInsert){
        $(selector).html(htmlToInsert);
    }
    $.get("snippets/home-snippet.html", function(data){
        ins
    });*/
    (function (window){

        var lema = {};

        var homeHTML="snippets/home-snippet.html";
        var allProductsUrl = "panouriRadiante.json";
        var productsTitleHtml = "snippets/products-title-snippet.html";
        var productsHtml = "snippets/products-snippet.html";


        function insertHTML(selector, htmlToInsert){
            $(selector).html(htmlToInsert);
        }

        function showLoading (selector){
            insertHTML(selector, "<div class='text-center'>" + "<img src='images/gears.svg'></div>");
        }

        //Return substitute of '{{propName}}' with propValue in given 'string'
        function insertProperty (string, propName, propValue){
            return string.replace(new RegExp("{{" + propName + "}}", "g"), propValue);
        }


        /*$.get(homeHTML, function(data){
            $("#mainContent").html(data);
        }).done(function(){
            //SWIPER
            var mySwiper = new Swiper ('.swiper-container', {
                // Optional parameters
                direction: 'horizontal',
                loop: true,
                effect:'coverflow',
                slidesPerView: 2,
                centeredSlides: true,
                grabCursor: true,
                hashnav:true,
                // If we need pagination
                pagination: '.swiper-pagination',

                // Navigation arrows
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',

                // And if we need scrollbar
                scrollbar: '.swiper-scrollbar',
            });
            if(window.innerWidth < 992) {
                mySwiper.slidesPerView = 1;
                mySwiper.effect = "slide";
            }
            //LOAD FOLIE RADIANTA
            $("#sheets-tile").on("click", function(){
                $.get("snippets/folieRadianta-snippet.html", function(data){
                    insertHTML("#mainContent", data);
                });

            });
            $("#thermostat-tile").on("click", loadThermostatCategories);
            $(document).ready(function(){
                $("#panels-tile").on("click", lema.loadProductsCategories);
            });
            $("#lighting-tile").on("click", function(){
                $.get("snippets/iluminareUrgenta-snippet.html", function(data) {
                    console.log(window.location.href);
                    insertHTML("#mainContent", data);
                });
            });

        });
*/
        // LOAD PANOURI RADIANTE

        lema.loadProductsCategories = function (){
            showLoading("#mainContent");
            $.get(allProductsUrl, buildAndShowProductsHTML);
        };

        function buildAndShowProductsHTML(products){
            $.get(productsTitleHtml, function(productsTitleHtml){
                //Retrive single product snippet
                $.get(productsHtml, function(productsHtml){
                    var productsViewHtml =
                        buildProductsViewHtml(products, productsTitleHtml, productsHtml);
                    insertHTML("#mainContent", productsViewHtml);
                })
            });
        }

        function buildProductsViewHtml(product, productsTitleHtml, productsHtml){
            var finalHtml = insertProperty(productsTitleHtml, "name", product.name);
            console.log(product.name);
            finalHtml += "<section class='row'>";
            for (var i in product.products){
                var html = productsHtml;
                var name = "" + product.products[i].name;
                html = insertProperty(html, "name", name);
                html = insertProperty(html, "shortName", i);
                finalHtml += html;
            }
            finalHtml += "</section></div>";
            insertHTML("#mainContent", finalHtml);
        }

        lema.loadProductsSubcatgory = function(short_name){
            lema.shortName = short_name;
            showLoading();
            $.get(allProductsUrl, buildAndShowProductsSubcategories);
        }

        function buildAndShowProductsSubcategories(products){
            $.get(productsTitleHtml, function(productsTitleHtml){
                $.get("snippets/products-category-snippet.html", function(productsHtml){
                    var productsViewHtml =
                        buildProductsSubcategoriesHtml(products, productsTitleHtml, productsHtml);
                    insertHTML("#mainContent", productsViewHtml)
                });
            });
        }

        function buildProductsSubcategoriesHtml(product, productsTitleHtml, productsHtml){
            var finalHtml = insertProperty(productsTitleHtml, "name", product.products[lema.shortName].name);
            if(product.products[lema.shortName].details != undefined){
                finalHtml += "<h3>" + product.products[lema.shortName].details + "</h3>";
            }
            finalHtml += "<section class='row'>";
            for(var i in product.products[lema.shortName].objects){
                var html = productsHtml;
                html = insertProperty(html, "name", product.products[lema.shortName].objects[i].name);
                html = insertProperty(html, "aplication", product.products[lema.shortName].objects[i].aplication);
                html = insertProperty(html, "putere", product.products[lema.shortName].objects[i].specifications["Putere [W]"]);
                html = insertProperty(html, "tensiune", product.products[lema.shortName].objects[i].specifications["Tensiune [V]"]);
                html = insertProperty(html, "amperaj", product.products[lema.shortName].objects[i].specifications["Amperaj [A]"]);
                html = insertProperty(html, "dimensiuni", product.products[lema.shortName].objects[i].specifications["Dimensiuni [mm]"]);
                html = insertProperty(html, "greutate", product.products[lema.shortName].objects[i].specifications["Greutate [kg]"]);
                html = insertProperty(html, "suprafata", product.products[lema.shortName].objects[i].specifications["Suprafata incalzita"]);
                html = insertProperty(html, "inaltime", product.products[lema.shortName].objects[i].specifications["Inaltime de montaj"]);
                html = insertProperty(html, "catalog", product.products[lema.shortName].objects[i].Catalog);
                html = insertProperty(html, "instructiuni", product.products[lema.shortName].objects[i].Instructiuni);
                html = insertProperty(html, "foaieProdus", product.products[lema.shortName].objects[i]["Foaie produs"]);
                finalHtml += html;
            }
            finalHtml += "</section></div>";
            return finalHtml;
        }
        window.$lema = lema;
        //END PANOURI RADIANTE
        //START TERMOSTAT AMBIENT
        loadThermostatCategories = function (){
            showLoading("#mainContent");
            $.get("termostat.json", buildAndShowThermostatCategoriesHtml);
        };
        function buildAndShowThermostatCategoriesHtml(thermostatJSON){
            $.get("snippets/termostat-title-snippet.html", function(thermostatTitleHtml){
               $.get("snippets/termostat-snippet.html", function(thermostatHtml){
                   var thermostatViewHtml=
                       buildThermostatCategoriesHtml(thermostatJSON, thermostatTitleHtml, thermostatHtml);
                   insertHTML("#mainContent", thermostatViewHtml);
               })
            });
        }

        function buildThermostatCategoriesHtml(thermostatJSON, thermostatTitleHtml, thermostatHtml){
            var finalHtml = thermostatTitleHtml + "<div class='row'>";
            for(var i in thermostatJSON){
                var html = thermostatHtml;
                html = insertProperty(html, "name", thermostatJSON[i].name);
                html = insertProperty(html, "image", thermostatJSON[i].image);
                html = insertProperty(html, "content", thermostatJSON[i].content);
                finalHtml += html;
            }
            finalHtml += "</div></div>";
            return finalHtml;

        }







    })(window);






});
