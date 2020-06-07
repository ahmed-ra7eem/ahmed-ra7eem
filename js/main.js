/*--------------------------------[ main JS File ]-------------------------------------------

    Project     : Grinta One Page Portfolio
    Version     : 1.0
    Author      : AhmedRaheem
    Primary Use : Portfolio

-------------------------------------------------------------------------------------------*/

/**
* Page Loader
* global Function
* Website Themes And Colors
* Navigation Menu
* Scroll
* Portfolio Functions And Gallery
*/


//***************************************************
// Start Page Loader ********************************
//***************************************************
$(window).on("load", function() {
  $("#loader").fadeOut(700);
  $(':root').css({
    '--second-color': localStorage.secondColor,
    '--second-color-rgba': localStorage.secondColorRgba,
    '--main-color': localStorage.mainColor,
    '--bg-color': localStorage.bgColor,
    '--main-color-rgba': localStorage.mainColorRgba,
    '--bg-color-rgba': localStorage.bgColorRgba
  });
  $("body").css({
    "overflow-y": "auto",
    "backgroundImage": localStorage.bodyBg
  });
  if ($(":root").css('--main-color') == "#2c384d") {
    $(".theme__color").addClass("light");
  }
  
});

//***************************************************
// /*global $, jQuery, console, alert*/ *************
//***************************************************
$(function() {
  "use strict";
  
  //***************************************************
  // Start showing Section To Chane Theme Color *******
  //***************************************************
  $('#theme .theme__pull').before().on("click", function () {
      $("#theme").toggleClass('open');
      $("#theme .pull-icon").toggleClass('open');
  });

  //***************************************************
  // Change Website Theme ( Light Or Dark) ************
  //***************************************************
  $('.theme__color').on('click', function() {
    $(this).toggleClass('light');
    if ($('.theme__color').hasClass("light")) {
      $(":root").css({
        '--main-color': '#2c384d',
        '--bg-color': '#edf2f4',
        '--main-color-rgba': '44, 56, 77',
        '--bg-color-rgba': '255, 255, 255'
      });
      $("body").css('backgroundImage', 'none');
    } else {
      $(":root").css({
        '--main-color': '#edf2f4',
        '--bg-color': '#2c384d',
        '--main-color-rgba': '255, 255, 255',
        '--bg-color-rgba': '44, 56, 77'
      });
      $("body").css({
        backgroundImage: 'url("imgs/bg.png")'
      });
    }
    localStorage.setItem("mainColor", $(":root").css("--main-color"));
    localStorage.setItem("bgColor", $(":root").css("--bg-color"));
    localStorage.setItem("mainColorRgba", $(":root").css("--main-color-rgba"));
    localStorage.setItem("bgColorRgba", $(":root").css("--bg-color-rgba"));
    localStorage.setItem("bodyBg", $("body").css("backgroundImage"));
  });

  //***************************************************
  // Change Website Colors ****************************
  //***************************************************
  $('.theme__pallete li').on('click', function tito () {
    $(':root').css({
      '--second-color': $(this).attr('data-color'),
      '--second-color-rgba': $(this).attr('data-color-rgba')
    });
    localStorage.setItem("secondColor", $(":root").css("--second-color"));
    localStorage.setItem("secondColorRgba", $(":root").css("--second-color-rgba"));
  });

  //***************************************************
  // [ Start Navigation Menu fuction ( Show And Hide ) ]
  //***************************************************
  // [ cashing variables ]
  const body = $("body"),
    menuBtn = $(".menu-btn"),
    navMenu = $(".navigation-menu");
  // [ To Check if menu open or not ]
  let menuOpen = false;
  // [ Show And Hide Navigation Menu ]
  menuBtn.on('click', function () {
    if (!menuOpen) {
      menuOpen = true;
      menuBtn.addClass('open');
      navMenu.addClass('open');
      body.css('overflow', 'hidden');
    } else {
      menuOpen = false;
      menuBtn.removeClass('open');
      navMenu.removeClass('open');
      body.css('overflowY', 'auto');
    }
  });

//***************************************************
//  start Scroll To Top Buttons *********************
//***************************************************
// [ check window scroll to show or hide scroll top button ]
$(window).on("scroll", function() {
    if ($(this).scrollTop() > 600) {
      $("#scroll-top").fadeIn();
    } else {
      $("#scroll-top").fadeOut();
    }
  });

// [ Click And Scroll To Top Function ]
  $("#scroll-top").on("click", function() {
    $("html, body").animate(
      {
        scrollTop: 0
      },
      1000
    );
  });

  //***************************************************
  // start Scroll To Sections *************************
  //***************************************************
  // [ Scroll To Sections From Navigation Menu & Hide Navigaiton Menu ]
  $(".navigation-menu ul li").on("click", function() {
    var elemId = $(this).attr("data-class");
    $("html, body").animate(
      {
        scrollTop: $(elemId).offset().top
      },
      1000
    );
    menuOpen = false;
    menuBtn.removeClass('open');
    navMenu.removeClass('open');
    body.css('overflowY', 'auto');
  });

  // [ Scroll To Portfolio Section ]
  $("#works-btn").on("click", function() {
    $("html, body").animate(
      {
        scrollTop: $(".portfolio").offset().top
      },
      1000
    );
  });

  // [ Scroll To Contact Section ]
  $("#hire-btn").on("click", function() {
    $("html, body").animate(
      {
        scrollTop: $(".contact").offset().top
      },
      1000
    );
  });

  //***************************************************
  //[ start Portfolio Functions ]**********************
  //***************************************************
  // [ MixItUp ( Portfolio Shuffle ) ]
  mixitup(".portfolio");

  // [ Portfolio Buutons (Add or remove active class) ]
  $(".portfolio ul li").on('click', function () {
    $(this).addClass('active');
    $(this).siblings().removeClass('active');
  });

  // Show Portfolio Images on [ Gallery Slider ]
  $(".portfolio .zoom").on("click", function(e) {
    
    // [ To prevent Default event ]
    e.preventDefault();

    // [ cashing Variables to portfolio elements ]
    let zis = $(this),
      imgSrc = zis
        .parent()
        .parent()
        .attr("data-src"),
      imgCounter = zis
        .parent()
        .parent()
        .attr("data-count"),
      imgLength = $(".portfolio .mix").length,

      // [ Gallery elements ]
      glry = $("#gallery"),
      glryImg = $("#gallery img"),
      glryCounter = $("#gallery .counter span.count"),
      glryCounterLength = $("#gallery .counter span.length"),
      // [ Check if gallery hidden ]
      check = glry.css("display") == "none";

    // [ Show Gallery Function ]
    if (check === true) {
      glry.css("display", "flex");
      glryImg.attr("src", imgSrc);
      glryCounter.text(imgCounter);
      glryCounterLength.text(imgLength);
    }

    // [ Show & Hide Gallery Arrows Functions ]
    // [ right Function ]
    function ritArrow() {
      if (imgCounter >= imgLength) {
        $("#gallery i.right").hide();
      } else {
        $("#gallery i.right").show();
      }
    }

    // [ Left Function ]
    function lftArrow() {
      if (imgCounter <= 1) {
        $("#gallery i.left").hide();
      } else {
        $("#gallery i.left").show();
      }
    }

    // [ Switch Arrows Functions On ]
    ritArrow();
    lftArrow();

    // [ Flipping Gallery Images Via left Right Arrow ]
    $("#gallery .right").on("click", function() {
      $("#gallery .img-container").fadeOut(function() {
        let temp = parseInt(imgCounter) + 1;
        for (let x = temp; x <= imgLength; x++) {
          let item = $(".mix:nth-child(" + x + ")"),
            z = item.css("display") == "none";
          if (z === false) {
            $(this).fadeIn();
            glryImg.attr("src", item.children(".project").attr("data-src")); // Show Image
            imgCounter = item.children(".project").attr("data-count");
            glryCounter.text(imgCounter);
            ritArrow();
            lftArrow();
            return false; // for stop loop//
          }
        }
      });
    });

    // [ Flipping Gallery Images Via left Right Arrow ]
    $("#gallery .left").on("click", function() {
      $("#gallery .img-container").fadeOut(function() {
        let temp = parseInt(imgCounter) - 1;
        for (let x = temp; x <= imgLength; x--) {
          let item = $(".mix:nth-child(" + x + ")");
          $(this).fadeIn();
          glryImg.attr("src", item.children(".project").attr("data-src")); // Show Image
          imgCounter = item.children(".project").attr("data-count");
          glryCounter.text(imgCounter);
          ritArrow();
          lftArrow();
          return false; // for stop loop//
        }
      });
    });
  });

  // [ Close Gallery ]
  $("#gallery i.close").on("click", function() {
    $("#gallery").fadeOut();
  });
});