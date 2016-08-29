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
                }).done(function(){$(".zoom").elevateZoom();});
            });
            $("#thermostat-tile").on("click", loadThermostatCategories);
            $(document).ready(function(){
                $("#panels-tile").on("click", lema.loadProductsCategories);
            });
            $("#lighting-tile").on("click", function(){
                $.get("snippets/iluminareUrgenta-snippet.html", function(data) {
                    insertHTML("#mainContent", data);
                });
            });

        });

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

    //initialize swiper when document ready

});
