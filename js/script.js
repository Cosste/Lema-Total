/**
 * Created by stefanromanescu on 22/08/16.
 */
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

        showLoading("#mainContent");

        $.get(homeHTML, function(data){
            $("#mainContent").html(data);
        }).done(function(){
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
        });

        lema.loadProductsCategories = function (){
            showLoading("#mainContent");
            $.get(allProductsUrl, buildAndShowProductsHTML);
        };

        function buildAndShowProductsHTML(products){
            $.get(productsTitleHtml, function(productsTitleHtml){
                //Retrive single product snippet
                $get(productsHtml, function(productsHtml){
                    var productsViewHtml =
                        bulidProductsViewHtml(products, productsTitleHtml, productsHtml);
                    insertHTML("#mainContect", productsViewHtml);
                })
            })
        }

        function buildProductsViewHtml(products, productsTitleHtml, productsHtml){
            var finalHtml = productsTitleHtml;
            finalHtml += "<section class='row";
            for (var i = 0; i < products.length; i++){
                var html = productsHtml;
                var name = "" + products[i].name;
                html = insertProperty(html, "name", name);
                finalhtml += html;
            }
        }

        window.$lema = lema;
    })(window);

    //initialize swiper when document ready

});