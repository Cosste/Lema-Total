/**
 * Created by stefanromanescu on 22/08/16.
 */
var app=angular.module('myApp', ['ngRoute', 'ngAnimate'])
    .config(function($routeProvider, $httpProvider, $locationProvider){
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
        .when('/oferta', {
            templateUrl: 'snippets/cerereDeOferta.html',
            controller:'cerereController'
        })
        .when('/certificate',{
            templateUrl:'snippets/certificate.html',
            controller:'certificateController'
        })
        .otherwise({redirectTo:'/'});

        $locationProvider.hashPrefix('!');
        $locationProvider.html5Mode(true);
});

app.controller('homeController',function($scope, $locationProvider){
    //$("html, body").animate({ scrollTop: $('#carousel').offset().top }, 500);
});
app.controller('produseController',function($scope){
    $("html, body").animate({ scrollTop: $('#products').offset().top }, 500);
});
app.controller('contactController',function($scope){
    $("html, body").animate({ scrollTop: $('#contact').offset().top }, 500);
});


app.controller('HomeCtrl', function ($scope, $rootScope) {
    var vm = this;
    var mySwiper = new Swiper('.swiper-container', {
        observer:true,
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

app.controller('HomeController', function($scope, $locationProvider){
    $(document).ready(function() {
        $('.carousel').carousel({
            interval: 4000
        });
    });
    $("#navbarToggle").blur(function(event){
        if(window.innerWidth < 768){
            $("#collapsable-nav").collapse('hide');
        }
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
            insertHTML("#links", productsViewHtml);
        });
    }

    function buildProductsViewHtml(product, productsHtml){
        var finalHtml = "";
        finalHtml += "<section class='row panouriRadianteCategorii'>";
        for (var i in product.products){
            var html = productsHtml;
            var name = "" + product.products[i].name;
            html = insertProperty(html, "name", name);
            html = insertProperty(html, "shortName", i);
            finalHtml += html;
        }
        finalHtml += "</section></div>";
        //insertHTML("#mainContent", finalHtml);
        return finalHtml;
    }
    function insertProductsDetails(){
        $.get("snippets/products-details.html", function(data){
            $("#productLinks").append(data);
        });
    }
    lema.loadProductsCategories();
    $.get("snippets/products-details.html",function(data){
        $("#mainContent").append(data);
    });
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
        })
            .done(function(){
                if(lema.shortName == "I"){
                    $(".noLux").remove();
                }
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
            html = insertProperty(html, "image", product.products[lema.shortName].objects[i]["image"]);
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
            html = insertProperty(html, "garantie", product.products[lema.shortName].objects[i]["Garantie"]);
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

app.controller('iluminareController', function($scope){
    $("html, body").animate({ scrollTop: $('#Title').offset().top }, 1);
    var modal = document.getElementById('myModal2');

// Get the image and insert it inside the modal - use its "alt" text as a caption
    var modalImg = document.getElementById("img02");
    var captionText = document.getElementById("caption");
    function imgBig(id){
        var img = document.getElementById(id);
        img.onclick = function(){
            modal.style.display = "block";
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
        }
    }
    imgBig("turn1");
    imgBig("turn2");
    imgBig("turn3");
    imgBig("turn4");
    imgBig("turn5");
    imgBig("turn6");
    imgBig("turn7");

// Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }
});

app.controller('certificateController', function(){
    var modal = document.getElementById('myModal');

// Get the image and insert it inside the modal - use its "alt" text as a caption
    var img = document.getElementById('certificat1');
    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");
    /*img.onclick = function(){
     modal.style.display = "block";
     modalImg.src = this.src;
     captionText.innerHTML = this.alt;
     }*/
    function imgBig(id){
        var img = document.getElementById(id);
        img.onclick = function(){
            modal.style.display = "block";
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
        }
    }
    imgBig("certificat1");
    imgBig("certificat2");
    imgBig("certificat3");
    imgBig("certificat4");
    imgBig("certificat5");
    imgBig("certificat6");
    imgBig("certificat7");

// Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }
});

/*angular.module('website', ['ngAnimate'])
 .controller('MainCtrl', function ($scope) {
 $scope.slides = [
 {image: 'images/potolok3_1920x1200.jpg', description: 'Image 00'},
 {image: 'images/RomanticHome_9009_1920x1200.jpg', description: 'Image 01'},
 {image: 'images/боковая%20стена_1920x1200.jpg', description: 'Image 02'}
 ];
 $scope.currentIndex = 0;
 $scope.setCurrentSlideIndex = function (index) {
 $scope.currentIndex = index;
 };
 $scope.isCurrentSlideIndex = function (index) {
 return $scope.currentIndex === index;
 };
 $scope.prevSlide = function () {
 $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
 };
 $scope.nextSlide = function () {
 $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
 };
 })
 .animation('.slide-animation', function () {
 return {
 addClass: function (element, className, done) {
 if (className == 'ng-hide') {
 TweenMax.to(element, 0.5, {left: -element.parent().width(), onComplete: done });
 }
 else {
 done();
 }
 },
 removeClass: function (element, className, done) {
 if (className == 'ng-hide') {
 element.removeClass('ng-hide');
 TweenMax.set(element, { left: element.parent().width() });
 TweenMax.to(element, 0.5, {left: 0, onComplete: done });
 }
 else {
 done();
 }
 }
 };
 });

 */
/*
 app.controller('Dropdown1', ['$scope',function($scope){
 console.log($(".content"));
 $scope.dropdownClass='hideContent';
 $scope.showHide = function(){
 if ($(".content").hasClass("hideContent")){
 $scope.dropdownClass = 'showContent';
 $(".glyphicon").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
 }
 else{
 $scope.dropdownClass = 'hideContent';
 $(".glyphicon").removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
 }
 }
 }]);

 app.controller('Dropdown2', ['$scope',function($scope){
 console.log($(".content"));
 $scope.dropdownClass='hideContent';
 $scope.showHide = function(){
 if ($(".content").hasClass("hideContent")){
 $scope.dropdownClass = 'showContent';
 $(".glyphicon").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
 }
 else{
 $scope.dropdownClass = 'hideContent';
 $(".glyphicon").removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
 }
 }
 }]);
 */



$(document).ready(function () {


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
