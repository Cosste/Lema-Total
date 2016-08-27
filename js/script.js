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
        var homeHTML="snippets/home-snippet.html";
        function insertHTML(selector, htmlToInsert){
            $(selector).html(htmlToInsert);
        }
        function showLoading (selector){
            insertHTML(selector, "<div class='text-center'>" + "<img src='images/gears.svg'></div>");
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
    })(window);

    //initialize swiper when document ready

});