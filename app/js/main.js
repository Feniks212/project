"use strict";
$(window).on("load", function() {
  setTimeout(() => {
    $(".loader svg").fadeOut("slow");
    $(".loader .e-loadholder").fadeOut(1000);
    setTimeout(() => {
      $(".loader").fadeOut(1000);
    }, 1000);
  }, 3000);

  // preload-animation
  window.addEventListener("resize", () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });
});

document.addEventListener("DOMContentLoaded", event => {
  // $("#loader").fadeOut("slow");
  // plugins ON
  {
    let bodyUpdate = document.querySelector("body");

    let lastClicked;
    if (bodyUpdate.classList.contains("home")) {
      // create map
      blockInForm();
      // SNOW
      snowAnimation();

      // animation
      animationForHome();
    } else if (bodyUpdate.classList.contains("map")) {
      initMap();
      sliderInMapPage();
      blockInForm();
      showHideBlock();
      animationForMap();
      loadeerMapReady();
    } else if (
      bodyUpdate.classList.contains("privacy") ||
      bodyUpdate.classList.contains("media-kit")
    ) {
      // custom scroll
      customScroll();
      animationForPageStatic();
    }

    Barba.Dispatcher.on("transitionCompleted", function(
      currentStatus,
      oldStatus,
      container
    ) {
      if (oldStatus !== undefined) {
        $("#departure-date").selectize({
          sortField: "text"
        });
        // animationForHome();
        // initMap();
        if (bodyUpdate.classList.contains("home")) {
          // create map
          initMap();
          homeOption();
          blockInForm();
          // SNOW
          snowAnimation();
          // animation
          animationForHome();
        } else if (bodyUpdate.classList.contains("map")) {
          loadeerMapReady();
          initMap();
          MapOption();
          sliderInMapPage();
          showHideBlock();
          blockInForm();
          blurForMenu();
          resizeOption();

          // animation
          animationForMap();
          window.addEventListener("resize", function(event) {
            resizeOption();
          });
        } else if (
          bodyUpdate.classList.contains("privacy") ||
          bodyUpdate.classList.contains("media-kit")
        ) {
          // create map
          initMap();

          // custom scroll
          customScroll();
          animationForPageStatic();
        }
      }
    });

    Barba.Pjax.originalPreventCheck = Barba.Pjax.preventCheck;

    let originalFn = Barba.Pjax.Dom.parseResponse;
    Barba.Dispatcher.on("newPageReady", function(
      currentStatus,
      oldStatus,
      container
    ) {
      // qery plugin
      $("#departure-date").selectize({
        sortField: "text"
      });
      // change title-text
      {
        let styleindex = 0;
        let stylearray = [
          "Plan your ski holiday with <br> data-driven confidence",
          "50% of resorts are <br> expected to close by 2050...",
          "Climate change is hurting <br> the ski industry..."
        ];

        // let elem = $(".heading");
        // setInterval(change, 8000);
        // function change() {
        //   elem.fadeOut(function() {
        //     elem.html(stylearray[styleindex]);
        //     styleindex++;
        //     if (styleindex >= stylearray.length) {
        //       styleindex = 0;
        //     }
        //     elem.fadeIn();
        //   });
        // }

        // function eachletter() {
        //   $(".heading .letters").each(function() {
        //     $(this).html(
        //       $(this)
        //         .text()
        //         .replace(/\S/g, "<span class='letter'>$&</span>")
        //     );
        //   });
        //   do_animate();
        // }
        // eachletter();
        // function do_animate() {
        //   anime
        //     .timeline({ loop: false })
        //     .add({
        //       targets: ".heading .letter",
        //       opacity: 1,
        //       rotateY: [-90, 0],
        //       duration: 1300,
        //       delay: (el, i) => 45 * i
        //     })
        //     .add({
        //       targets: ".heading .letter",
        //       opacity: 0,
        //       duration: 1000,
        //       easing: "easeOutExpo",
        //       delay: 8000,
        //       complete: function(anim) {
        //         $(".letters").text(stylearray[styleindex]);
        //         styleindex++;
        //         if (styleindex >= stylearray.length) {
        //           styleindex = 0;
        //         }
        //         eachletter();
        //       }
        //     });
      }

      // hover button
      {
        const animatedClassName = "animated";
        const ELEMENTS = document.querySelectorAll(".hover");
        const ELEMENTS_SPAN = [];

        function getCoords(elem) {
          // (1)
          let box = elem.getBoundingClientRect();
          let body = document.body;
          let docEl = document.documentElement;

          // (2)
          let scrollTop =
            window.pageYOffset || docEl.scrollTop || body.scrollTop;
          let scrollLeft =
            window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

          // (3)
          let clientTop = docEl.clientTop || body.clientTop || 0;
          let clientLeft = docEl.clientLeft || body.clientLeft || 0;

          // (4)
          let top = box.top + scrollTop - clientTop;
          let left = box.left + scrollLeft - clientLeft;

          return {
            top: top,
            left: left
          };
        }

        ELEMENTS.forEach((element, index) => {
          let addAnimation = false;

          // If The span element for this element does not exist in the array, add it.
          if (!ELEMENTS_SPAN[index])
            ELEMENTS_SPAN[index] = element.querySelector("span");

          element.addEventListener(
            "mouseover",
            e => {
              let rect = getCoords(element);
              ELEMENTS_SPAN[index].style.left = e.pageX - rect.left + "px";
              ELEMENTS_SPAN[index].style.top = e.pageY - rect.top + "px";
            },
            true
          );

          element.addEventListener(
            "mouseout",
            e => {
              let rect = getCoords(element);
              ELEMENTS_SPAN[index].style.left = e.pageX - rect.left + "px";
              ELEMENTS_SPAN[index].style.top = e.pageY - rect.top + "px";
            },
            true
          );
        });
      }
    });

    Barba.Pjax.getTransition = function() {
      let transitionObj = ExpandTransition;

      return transitionObj;
    };
    Barba.Dispatcher.on("linkClicked", function(el) {
      lastClicked = el;
    });

    let transEffect = Barba.BaseTransition.extend({
      start: function() {
        this.newContainerLoading.then(val =>
          this.fadeInNewcontent($(this.newContainer))
        );
        // Promise.all([this.newContainerLoading, this.fadeInNewcontent()]).then(
        //   this.showNewPage.bind(this)
        // );
      },
      fadeInNewcontent: function(nc) {
        nc.hide();
        // let deferred = Barba.Utils.deferred();

        // let _this = this;
        // // $(this.oldContainer).fadeOut(800);
        // $("#loader").fadeIn();
        // deferred.resolve();
        // setTimeout(() => {
        //   $("#loader").fadeOut();
        // }, 1000);

        // return deferred.promise;

        let _this = this;
        $(this.oldContainer)
          .fadeOut(0)
          .promise()
          .done(() => {
            // nc.css("visibility", "visible");
            if (bodyUpdate.classList.contains("home")) {
              $(".loader.default").fadeIn();
              $(".loader .e-loadholder").fadeIn(1000);
              $(".loader.map").fadeOut();
            } else if (bodyUpdate.classList.contains("map")) {
              $(".loader.default").fadeOut();
              $(".loader.map").fadeIn();
              $(".loader svg").fadeIn();
            } else if (
              bodyUpdate.classList.contains("privacy") ||
              bodyUpdate.classList.contains("media-kit")
            ) {
              $(".loader.default").fadeIn();
              $(".loader .e-loadholder").fadeIn(1000);
              $(".loader.map").fadeOut();
            }
            // $(".loader").fadeIn();
            // $(".loader svg").fadeIn();
            // loader();
            nc.fadeIn(1000, function() {
              _this.done();
            });
            setTimeout(() => {
              $(".loader svg").fadeOut(1000);
              $(".loader .e-loadholder").fadeOut(1000);
            }, 2500);
            setTimeout(() => {
              $(".loader").fadeOut();
            }, 3000);
            // $("html, body").animate(
            //   {
            //     scrollTop: 300
            //   },
            //   1000
            // );
          });
      }
      // showNewPage: function() {
      //   this.done();
      // }
    });

    Barba.Pjax.getTransition = function() {
      return transEffect;
    };

    Barba.Pjax.Dom.parseResponse = function(response) {
      // Because jQuery will strip <body> when parsing a HTML DOM, change
      // <body> to <notbody>, then we can grab the classes assigned to it
      // See: http://stackoverflow.com/a/14423412/4081305

      response = response.replace(
        /(<\/?)body( .+?)?>/gi,
        "$1notbody$2>",
        response
      );

      // Get the classes on the <notbody> element
      let bodyClasses;
      bodyClasses = $(response)
        .filter("notbody")
        .attr("class");
      // Apply the classes to the current body
      $("body").attr("class", bodyClasses);

      // Call the original barba.js function

      return originalFn.apply(Barba.Pjax.Dom, arguments);
    };

    Barba.Pjax.start();
  }

  // SNOW ANIMATION
  function snowAnimation() {
    let w = window.innerWidth, //window.innerWidth,
      h = window.innerHeight, // window.innerHeight,
      canvas = document.getElementById("snow"),
      ctx = canvas.getContext("2d"),
      rate = 50,
      arc = 500,
      time,
      count,
      size = 2,
      speed = 2,
      lights = new Array(),
      colors = ["#586167", "#17222c", "#0a1721"];

    canvas.setAttribute("width", w);
    canvas.setAttribute("height", h);

    // snow
    function init() {
      time = 0;
      count = 0;

      for (let i = 0; i < arc; i++) {
        lights[i] = {
          x: Math.ceil(Math.random() * w),
          y: Math.ceil(Math.random() * h),
          toX: Math.random() * 5 + 1,
          toY: Math.random() * 5 + 1,
          c: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * size
        };
      }
    }

    function bubble() {
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < arc; i++) {
        let li = lights[i];

        ctx.beginPath();
        ctx.arc(li.x, li.y, li.size, 0, Math.PI * 2, false);
        ctx.fillStyle = li.c;
        ctx.fill();

        li.x = li.x + li.toX * (time * 0.05);
        li.y = li.y + li.toY * (time * 0.05);

        if (li.x > w) {
          li.x = 0;
        }
        if (li.y > h) {
          li.y = 0;
        }
        if (li.x < 0) {
          li.x = w;
        }
        if (li.y < 0) {
          li.y = h;
        }
      }
      if (time < speed) {
        time++;
      }
      let timerID = setTimeout(bubble, 1000 / rate);
    }
    init();
    bubble();
  }

  //  Slider in MAP-PAGE
  function sliderInMapPage() {
    let mySwiper = new Swiper(".swiper-container", {
      // Optional parameters
      direction: "vertical",
      slidesPerView: 3,
      mousewheel: true,
      // autoHeight: true,
      // forceToAxis: true,
      // slidesPerView: "auto",
      // freeMode: true,
      setWrapperSize: true,
      speed: 800,
      // freeMode: true,
      spaceBetween: 30,
      loop: false,
      // calculateHeight: true,
      breakpoints: {
        320: {
          direction: "horizontal",
          slidesPerView: 1,
          spaceBetween: 0,
          loop: true,
          freeMode: true,
          width: 280
        },
        570: {
          direction: "horizontal",
          slidesPerView: 1,
          spaceBetween: 0,
          loop: true,
          freeMode: true,
          width: 280
        },
        800: {
          direction: "horizontal",
          slidesPerView: 2,
          setWrapperSize: true,
          spaceBetween: 30,
          loop: false,
          freeMode: false,
          setWrapperSize: true
        },
        1080: {
          direction: "horizontal",
          slidesPerView: 3,
          setWrapperSize: true,
          spaceBetween: 30,
          loop: false,
          freeMode: false,
          setWrapperSize: true
        },
        1200: {
          direction: "vertical",
          slidesPerView: 3,
          // mousewheel: true,
          setWrapperSize: true
          // slidesPerView: 4,
          // setWrapperSize: true,
          // spaceBetween: 30
        }
      }
    });
    let sw = document.querySelector(".swiper-container");
    let chil = mySwiper.wrapperEl.children;
    let index;
    let chilArray = [];

    if (screen.width > 1200) {
      function callHover() {
        for (let i = 0; i < chil.length; i++) {
          const element = chil[i];
          chilArray.push(element);
          element.style.opacity = "";
        }
        function isPrime(element, index, array) {
          if (element.classList.contains("swiper-slide-next")) {
            index = index + 2;
            if (index <= chilArray.length - 2) {
              chilArray[index].style.opacity = 0.3;
            }
          }
          // return element[index];
        }
        chilArray.find(isPrime);
      }
      callHover();

      document.addEventListener("mouseover", () => {
        callHover();
      });
    }

    document.addEventListener("scroll", () => {
      console.dir(sw);
    });
  }

  // show and hide block in form
  function blockInForm() {
    const destination = document.querySelector(".select");
    const chooseBlock = document.querySelector(".choose-checkbox");

    const toggleChooseBlock = () => {
      chooseBlock.classList.toggle("is-visible");
      destination.classList.toggle("is-active");
    };

    destination.addEventListener("click", e => {
      e.stopPropagation();

      toggleChooseBlock();
    });

    document.addEventListener("click", e => {
      let target = e.target;
      let its_chooseBlock =
        target == chooseBlock || chooseBlock.contains(target);
      let its_destination = target == destination;
      let chooseBlock_is_visible = chooseBlock.classList.contains("is-visible");
      let destination_is_active = destination.classList.contains("is-active");

      if (
        !its_chooseBlock &&
        !its_destination &&
        chooseBlock_is_visible &&
        destination_is_active
      ) {
        toggleChooseBlock();
      }
    });
  }
  // resizeBlock
  function resizeOption() {
    let sliderSettingForBarba = document.querySelector(".swiper-wrapper");
    if (screen.width < 1200) {
      sliderSettingForBarba.style.display = "flex";
    }
  }

  // setting Map-HOME
  function homeOption() {
    const myMap = document.getElementById("map");
    const centerMap = new google.maps.LatLng(25, 15);

    let options = {
      center: centerMap,
      zoom: 3,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
      scrollwheel: 0,

      styles: [
        {
          featureType: "all",
          elementType: "all",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "administrative",
          elementType: "all",
          stylers: [
            {
              visibility: "on"
            }
          ]
        },
        {
          featureType: "administrative",
          elementType: "geometry",
          stylers: [
            {
              visibility: "on"
            }
          ]
        },
        {
          featureType: "administrative",
          elementType: "geometry.fill",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "administrative",
          elementType: "geometry.stroke",
          stylers: [
            {
              visibility: "on"
            },
            {
              color: "#00e1d8"
            },
            {
              weight: "1"
            },
            {
              gamma: "1.00"
            }
          ]
        },
        {
          featureType: "administrative",
          elementType: "labels",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "administrative",
          elementType: "labels.text",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "administrative",
          elementType: "labels.text.fill",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "administrative",
          elementType: "labels.text.stroke",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "administrative",
          elementType: "labels.icon",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "administrative.country",
          elementType: "all",
          stylers: [
            {
              visibility: "on"
            }
          ]
        },
        {
          featureType: "administrative.country",
          elementType: "geometry",
          stylers: [
            {
              visibility: "on"
            }
          ]
        },
        {
          featureType: "administrative.country",
          elementType: "labels",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "administrative.country",
          elementType: "labels.text",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "administrative.province",
          elementType: "all",
          stylers: [
            {
              visibility: "on"
            },
            {
              weight: "0.48"
            },
            {
              gamma: "1.00"
            }
          ]
        },
        {
          featureType: "administrative.province",
          elementType: "labels.text",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "administrative.neighborhood",
          elementType: "all",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "administrative.neighborhood",
          elementType: "geometry",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "administrative.neighborhood",
          elementType: "geometry.fill",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "administrative.neighborhood",
          elementType: "geometry.stroke",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "administrative.neighborhood",
          elementType: "labels",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "administrative.neighborhood",
          elementType: "labels.text",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "administrative.neighborhood",
          elementType: "labels.text.fill",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "administrative.neighborhood",
          elementType: "labels.text.stroke",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "administrative.land_parcel",
          elementType: "all",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "landscape",
          elementType: "all",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "landscape",
          elementType: "geometry.fill",
          stylers: [
            {
              visibility: "on"
            },
            {
              color: "#262c30"
            }
          ]
        },
        {
          featureType: "road",
          elementType: "all",
          stylers: [
            {
              visibility: "on"
            }
          ]
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "road",
          elementType: "labels",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "road",
          elementType: "labels.text",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "transit",
          elementType: "all",
          stylers: [
            {
              visibility: "on"
            }
          ]
        },
        {
          featureType: "transit",
          elementType: "geometry",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "transit",
          elementType: "labels",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "transit.station",
          elementType: "all",
          stylers: [
            {
              visibility: "on"
            }
          ]
        },
        {
          featureType: "transit.station",
          elementType: "geometry",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "transit.station",
          elementType: "labels",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "water",
          elementType: "all",
          stylers: [
            {
              visibility: "on"
            }
          ]
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [
            {
              visibility: "on"
            }
          ]
        },
        {
          featureType: "water",
          elementType: "geometry.fill",
          stylers: [
            {
              visibility: "on"
            },
            {
              color: "#020f19"
            }
          ]
        },
        {
          featureType: "water",
          elementType: "geometry.stroke",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "water",
          elementType: "labels",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "water",
          elementType: "labels.text",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "water",
          elementType: "labels.text.stroke",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "water",
          elementType: "labels.icon",
          stylers: [
            {
              visibility: "off"
            }
          ]
        }
      ]
    };
    map = new google.maps.Map(myMap, options);
  }

  // setting Map-MAP-PAGE
  function MapOption() {
    // DATA location
    let locationData = [
      [44.52031, 7.873723, 0, "local-1"],
      [48, 7.873723, 1, "local-2"],
      [48, 120, 2, "local-3"],
      [47, 120, 3, "local-4"],
      [46, 80, 4, "local-5"],
      [45, 70, 5, "local-6"],
      [44, 50, 6, "local-7"],
      [43, 14, 7, "local-8"],
      [42, 12, 8, "local-9"]
    ];

    const myMap = document.getElementById("map");
    const centerMap = new google.maps.LatLng(44, 7);
    const maxZoomIn = 6;
    const maxZoomOut = 3;
    const timeOut = 1000;
    const colorOne = "#fff";

    // style MARKER
    const templateMarker = [
      '<?xml version="1.0"?>',
      '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">',
      "<g>",
      "<g>",
      '<path fill="{{ colorOne }}" fill-opacity=".1" d="M6 12A6 6 0 1 0 6 0a6 6 0 0 0 0 12z"/>',
      "</g>",
      "<g>",
      '<path fill="#fff" d="M6 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>',
      "</g>",
      "</g>",
      "</svg>"
    ].join("\n");

    let zoomedIn = false;
    let marker;
    let svg = templateMarker.replace("{{ colorOne }}", colorOne);

    // MAP OPTION
    const options = {
      center: centerMap,
      // center: points,
      zoom: 3,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
      scrollwheel: 0,
      styles: [
        {
          featureType: "all",
          elementType: "all",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "administrative",
          elementType: "all",
          stylers: [
            {
              visibility: "on"
            }
          ]
        },
        {
          featureType: "administrative",
          elementType: "geometry",
          stylers: [
            {
              visibility: "on"
            }
          ]
        },
        {
          featureType: "administrative",
          elementType: "geometry.fill",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "administrative",
          elementType: "geometry.stroke",
          stylers: [
            {
              visibility: "on"
            },
            {
              color: "#00e1d8"
            },
            {
              weight: "1"
            },
            {
              gamma: "1.00"
            }
          ]
        },
        {
          featureType: "administrative",
          elementType: "labels",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "administrative",
          elementType: "labels.text",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "administrative",
          elementType: "labels.text.fill",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "administrative",
          elementType: "labels.text.stroke",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "administrative",
          elementType: "labels.icon",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "administrative.country",
          elementType: "all",
          stylers: [
            {
              visibility: "on"
            }
          ]
        },
        {
          featureType: "administrative.country",
          elementType: "geometry",
          stylers: [
            {
              visibility: "on"
            }
          ]
        },
        {
          featureType: "administrative.country",
          elementType: "labels",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "administrative.country",
          elementType: "labels.text",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "administrative.province",
          elementType: "all",
          stylers: [
            {
              visibility: "on"
            },
            {
              weight: "0.48"
            },
            {
              gamma: "1.00"
            }
          ]
        },
        {
          featureType: "administrative.province",
          elementType: "labels.text",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "administrative.neighborhood",
          elementType: "all",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "administrative.neighborhood",
          elementType: "geometry",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "administrative.neighborhood",
          elementType: "geometry.fill",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "administrative.neighborhood",
          elementType: "geometry.stroke",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "administrative.neighborhood",
          elementType: "labels",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "administrative.neighborhood",
          elementType: "labels.text",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "administrative.neighborhood",
          elementType: "labels.text.fill",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "administrative.neighborhood",
          elementType: "labels.text.stroke",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "administrative.land_parcel",
          elementType: "all",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "landscape",
          elementType: "all",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "landscape",
          elementType: "geometry.fill",
          stylers: [
            {
              visibility: "on"
            },
            {
              color: "#262c30"
            }
          ]
        },
        {
          featureType: "road",
          elementType: "all",
          stylers: [
            {
              visibility: "on"
            }
          ]
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "road",
          elementType: "labels",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "road",
          elementType: "labels.text",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "transit",
          elementType: "all",
          stylers: [
            {
              visibility: "on"
            }
          ]
        },
        {
          featureType: "transit",
          elementType: "geometry",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "transit",
          elementType: "labels",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "transit.station",
          elementType: "all",
          stylers: [
            {
              visibility: "on"
            }
          ]
        },
        {
          featureType: "transit.station",
          elementType: "geometry",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "transit.station",
          elementType: "labels",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "water",
          elementType: "all",
          stylers: [
            {
              visibility: "on"
            }
          ]
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [
            {
              visibility: "on"
            }
          ]
        },
        {
          featureType: "water",
          elementType: "geometry.fill",
          stylers: [
            {
              visibility: "on"
            },
            {
              color: "#020f19"
            }
          ]
        },
        {
          featureType: "water",
          elementType: "geometry.stroke",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "water",
          elementType: "labels",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "water",
          elementType: "labels.text",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "water",
          elementType: "labels.text.stroke",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "water",
          elementType: "labels.icon",
          stylers: [
            {
              visibility: "off"
            }
          ]
        }
      ]
    };
    // Create the Map
    map = new google.maps.Map(myMap, options);

    let myoverlay = new google.maps.OverlayView();

    myoverlay.draw = function() {
      this.getPanes().markerLayer.id = "markerLayer";
    };
    myoverlay.setMap(map);

    let infowindow = new google.maps.InfoWindow({});

    // SCROLL - ZOOM map
    // myMap.addEventListener("wheel", function(event) {
    //   if (event.deltaY && event.deltaY < 0) {
    //     map.setZoom(map.getZoom() + 1);
    //   } else {
    //     map.setZoom(map.getZoom() - 1);
    //   }
    //   event.preventDefault();
    // });

    let panPath = []; // An array of points the current panning action will use
    let panQueue = []; // An array of subsequent panTo actions to take
    let STEPS = 50; // The number of steps that each panTo action will undergo

    for (let i = 0; i < locationData.length; i++) {
      let thisPin = locationData[i];

      let myLatLng = new google.maps.LatLng(thisPin[0], thisPin[1]);

      function panTo(newLat, newLng) {
        if (panPath.length > 0) {
          // We are already panning...queue this up for next move
          panQueue.push([newLat, newLng]);
        } else {
          // Lets compute the points we'll use
          panPath.push("LAZY SYNCRONIZED LOCK"); // make length non-zero - 'release' this before calling setTimeout
          let curLat = map.getCenter().lat();
          let curLng = map.getCenter().lng();
          let dLat = (newLat - curLat) / STEPS;
          let dLng = (newLng - curLng) / STEPS;

          for (let i = 0; i < STEPS; i++) {
            panPath.push([curLat + dLat * i, curLng + dLng * i]);
          }
          panPath.push([newLat, newLng]);
          panPath.shift(); // LAZY SYNCRONIZED LOCK
          setTimeout(doPan, 20);
        }
      }

      function doPan() {
        let next = panPath.shift();
        if (next != null) {
          // Continue our current pan action
          map.panTo(new google.maps.LatLng(next[0], next[1]));
          setTimeout(doPan, 20);
        } else {
          // We are finished with this pan - check if there are any queue'd up locations to pan to
          let queued = panQueue.shift();
          if (queued != null) {
            panTo(queued[0], queued[1]);
          }
        }
      }

      // let easingAnimator = EasingAnimator.makeFromCallback(function(
      //   myLatLng
      // ) {

      // });

      // let easingAnimator = EasingAnimator.makeFromCallback(function(
      //   myLatLng
      // ) {
      //   map.setCenter(myLatLng);
      // });

      marker = new google.maps.Marker({
        map: map,
        position: myLatLng,
        icon: {
          url: "data:image/svg+xml;charset=UTF-8;base64," + btoa(svg),
          scaledSize: new google.maps.Size(12, 12)
        },
        optimized: false,
        draggable: false
        // title: locationData.length.toString()
      });

      // let content = thisPin[4];

      // google.maps.event.addListener(
      //   marker,
      //   "click",
      //   (function(marker, content, infowindow) {
      //     return function() {
      //       infowindow.setContent(content);
      //       infowindow.open(map, marker);
      //     };
      //   })(marker, content, infowindow)
      // );

      (function(_thisPin, _marker) {
        let timeoutId;

        $("#" + _thisPin[3]).on("mouseenter", function(e) {
          let thisTitle = Number(_thisPin[2]);

          if (e.currentTarget) {
            $("#markerLayer img")
              .eq(thisTitle)
              .css({
                animation: "pulse 1.5s infinite ease-out",
                background: "#00e1d8"
              });

            $("#" + _thisPin[3]).hover(
              function() {
                if (!timeoutId) {
                  timeoutId = window.setTimeout(function() {
                    timeoutId = null;
                    $("#" + _thisPin[3]).addClass("show");
                    panTo(_thisPin[0], _thisPin[1]);
                  }, 1000);
                }
              },
              function() {
                if (timeoutId) {
                  window.clearTimeout(timeoutId);
                  timeoutId = null;
                } else {
                  $("#" + _thisPin[3]).removeClass("show");
                }
              }
            );
            // map.panTo(_marker.getPosition());
            // if (!zoomedIn) {
            //   smoothZoom(map, maxZoomIn, map.getZoom(_marker), true);
            //   zoomedIn = true;
            // } else {
            //   smoothZoom(map, maxZoomOut, map.getZoom(_marker), false);
            //   zoomedIn = false;
            // }
          }
        });

        $("#" + _thisPin[3]).on("click", function(e) {
          // map.slowPanTo(_marker.getPosition()); // set map center to marker position
          panTo(_thisPin[0], _thisPin[1]);

          if (e.currentTarget) {
            if (!timeoutId) {
              timeoutId = window.setTimeout(function() {
                timeoutId = null;
                // animateMapZoomTo(map, 6);
              }, 1000);
            } else if (timeoutId) {
              window.clearTimeout(timeoutId);
              timeoutId = null;
            }
          }
        });

        $("#" + _thisPin[3]).bind("touchenter", function(e) {
          // map.slowPanTo(_marker.getPosition()); // set map center to marker position
          animateMapZoomTo(map, 3);
          panTo(_thisPin[0], _thisPin[1]);
        });

        $("#" + _thisPin[3]).on("mouseleave", function(e) {
          // panTo(null, null);
          setTimeout(() => {
            if (e.currentTarget) {
              animateMapZoomTo(map, 3);
            }
          }, 1000);

          $("#markerLayer img").css({
            animation: "",
            background: "none"
          });
        });
      })(thisPin, marker);

      function animateMapZoomTo(map, targetZoom) {
        let currentZoom = arguments[2] || map.getZoom();
        if (currentZoom != targetZoom) {
          google.maps.event.addListenerOnce(map, "zoom_changed", function(
            event
          ) {
            animateMapZoomTo(
              map,
              targetZoom,
              currentZoom + (targetZoom > currentZoom ? 1 : -1)
            );
          });
          setTimeout(function() {
            map.setZoom(currentZoom);
          }, 80);
        }
      }
    }
  }

  // blur for menu
  function blurForMenu() {
    let logoBlur = document.querySelector(".header a");
    let mapBlur = document.getElementById("map");
    let listBlur = document.querySelector(".list-of-locations");
    let hidden = document.querySelector(".hidden");

    let butonMenu = document.querySelector(".mobile-menu");
    let formForMenu = document.getElementById("my-resort");

    butonMenu.addEventListener("click", () => {
      formForMenu.classList.toggle("is-active");
      butonMenu.classList.toggle("is-active");
      hidden.classList.toggle("is-active");
      logoBlur.classList.toggle("blur");
      mapBlur.classList.toggle("blur");
      listBlur.classList.toggle("blur");
    });
  }

  // touch event for mobile
  function touchEv() {
    let listOfLocations = document.querySelector(".list-of-locations");

    listOfLocations.addEventListener("touchmove", () => {});
  }

  //anim
  function animationForHome() {
    let thisMap = document.getElementById("map");
    let footer = document.querySelector("footer");

    let elements = $(".content");
    let element = elements.find("[data-stagger]");
    // TimelineMax
    let tl = new TimelineMax();

    tl.fromTo(thisMap, 2, { opacity: 0 }, { opacity: 1 }, 3.5)
      .staggerFromTo(element, 1, { y: 50, opacity: 0 }, { y: 0, opacity: 1 }, 1)
      .fromTo(
        footer,
        1,
        { y: "150%", opacity: 1 },
        { y: "0%", opacity: 1 },
        3.5
      );
  }

  function animationForMap() {
    let thisMap = document.getElementById("map");
    let header = document.querySelector(".header");
    let formForMap = document.getElementById("my-resort");
    let graphInfo = $(".graph__info");
    let elementGraph = graphInfo.find(".column");
    let shadow = document.querySelector(".shadow");

    let elements = $(".list-of-locations");
    let element = elements.find("[data-transform]");
    // TimelineMax
    let tlTwo = new TimelineMax();

    tlTwo

      .fromTo(thisMap, 2, { opacity: 0 }, { opacity: 1 }, 3.5)
      .staggerFromTo(
        element,
        0.2,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1 },
        0.2
      )
      .staggerFromTo(
        elementGraph,
        0.2,
        { opacity: 0, height: 0 },
        { opacity: 1, height: 100 },
        0.2
      )
      .fromTo(
        header,
        1,
        { y: "-150%", opacity: 1 },
        { y: "0%", opacity: 1 },
        3.5
      )
      .fromTo(
        formForMap,
        1,
        { y: "150%", opacity: 1 },
        { y: "0%", opacity: 1 },
        3.5
      )
      .fromTo(shadow, 3, { opacity: 0 }, { opacity: 1 }, 10);
  }

  //animation for page static
  function animationForPageStatic() {
    let thisMap = document.getElementById("map");
    let header = document.querySelector(".header");
    let footer = document.querySelector("footer");
    let text = document.querySelector(".text");
    let backLink = document.querySelector(".link-back");
    // TimelineMax
    let tlThree = new TimelineMax();

    tlThree
      .fromTo(thisMap, 2, { opacity: 0 }, { opacity: 1 }, 3.5)
      .fromTo(
        header,
        1,
        { y: "-150%", opacity: 1 },
        { y: "0%", opacity: 1 },
        3.5
      )
      .fromTo(
        backLink,
        0.8,
        { y: "-150%", opacity: 0 },
        { y: "0%", opacity: 1 },
        4
      )
      .fromTo(text, 1, { y: "5%", opacity: 0 }, { y: "0%", opacity: 1 }, 4)
      .fromTo(
        footer,
        1,
        { y: "150%", opacity: 1 },
        { y: "0%", opacity: 1 },
        3.5
      );
  }

  // custom scroll
  function customScroll() {
    let Scrollbar = window.Scrollbar;

    Scrollbar.init(document.querySelector(".text"));
  }

  //loadeerMapReady
  function loadeerMapReady() {
    let checkmarkIdPrefix = "loadingCheckSVG-";
    let checkmarkCircleIdPrefix = "loadingCheckCircleSVG-";
    let verticalSpacing = 50;

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    }

    function createSVG(tag, properties, opt_children) {
      let newElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        tag
      );
      for (prop in properties) {
        newElement.setAttribute(prop, properties[prop]);
      }
      if (opt_children) {
        opt_children.forEach(function(child) {
          newElement.appendChild(child);
        });
      }
      return newElement;
    }

    function createPhraseSvg(phrase, yOffset) {
      let text = createSVG("text", {
        fill: "white",
        x: 50,
        y: yOffset,
        "font-size": 18,
        "font-family": "Arial"
      });
      text.appendChild(document.createTextNode(phrase + "..."));
      return text;
    }
    function createCheckSvg(yOffset, index) {
      let check = createSVG("polygon", {
        points:
          "21.661,7.643 13.396,19.328 9.429,15.361 7.075,17.714 13.745,24.384 24.345,9.708 ",
        fill: "rgba(255,255,255,1)",
        id: checkmarkIdPrefix + index
      });
      let circle_outline = createSVG("path", {
        d:
          "M16,0C7.163,0,0,7.163,0,16s7.163,16,16,16s16-7.163,16-16S24.837,0,16,0z M16,30C8.28,30,2,23.72,2,16C2,8.28,8.28,2,16,2 c7.72,0,14,6.28,14,14C30,23.72,23.72,30,16,30z",
        fill: "white"
      });
      let circle = createSVG("circle", {
        id: checkmarkCircleIdPrefix + index,
        fill: "rgba(255,255,255,0)",
        cx: 16,
        cy: 16,
        r: 15
      });
      let group = createSVG(
        "g",
        {
          transform: "translate(10 " + (yOffset - 20) + ") scale(.9)"
        },
        [circle, check, circle_outline]
      );
      return group;
    }

    function addPhrasesToDocument(phrases) {
      phrases.forEach(function(phrase, index) {
        let yOffset = 30 + verticalSpacing * index;
        document
          .getElementById("phrases")
          .appendChild(createPhraseSvg(phrase, yOffset));
        document
          .getElementById("phrases")
          .appendChild(createCheckSvg(yOffset, index));
      });
    }

    function easeInOut(t) {
      let period = 200;
      return (Math.sin(t / period + 100) + 1) / 2;
    }

    document.addEventListener("DOMContentLoaded", function(event) {
      let phrases = shuffleArray([
        "Initiating Map Experience",
        "Analysing Snowfall Data",
        "Checking Local Holidays",
        "Locating Ski Resorts",
        "Initiating Map Experience",
        "Analysing Snowfall Data",
        "Checking Local Holidays",
        "Locating Ski Resorts",
        "Initiating Map Experience",
        "Analysing Snowfall Data",
        "Checking Local Holidays",
        "Locating Ski Resorts"
      ]);
      addPhrasesToDocument(phrases);
      let start_time = new Date().getTime();
      let upward_moving_group = document.getElementById("phrases");
      upward_moving_group.currentY = 0;
      let checks = phrases.map(function(_, i) {
        return {
          check: document.getElementById(checkmarkIdPrefix + i),
          circle: document.getElementById(checkmarkCircleIdPrefix + i)
        };
      });
      function animateLoading() {
        let now = new Date().getTime();
        upward_moving_group.setAttribute(
          "transform",
          "translate(0 " + upward_moving_group.currentY + ")"
        );
        upward_moving_group.currentY -= 1.35 * easeInOut(now);
        checks.forEach(function(check, i) {
          let color_change_boundary =
            -i * verticalSpacing + verticalSpacing + 15;
          if (upward_moving_group.currentY < color_change_boundary) {
            let alpha = Math.max(
              Math.min(
                1 -
                  (upward_moving_group.currentY - color_change_boundary + 15) /
                    30,
                1
              ),
              0
            );
            check.circle.setAttribute(
              "fill",
              "rgba(255, 255, 255, " + alpha + ")"
            );
            let check_color = [
              Math.round(255 * (1 - alpha) + 120 * alpha),
              Math.round(255 * (1 - alpha) + 154 * alpha)
            ];
            check.check.setAttribute(
              "fill",
              "rgba(255, " + check_color[0] + "," + check_color[1] + ", 1)"
            );
          }
        });
        if (now - start_time < 30000 && upward_moving_group.currentY > -710) {
          requestAnimationFrame(animateLoading);
        }
      }
      /* animateLoading() */
    });
  }

  // show/hide block
  function showHideBlock() {
    let buttonForMobile = document.querySelector(".for-mobile .show");
    let listLocation = document.querySelector(".swiper-container");

    buttonForMobile.addEventListener("click", e => {
      buttonForMobile.classList.toggle("is-active");

      if (e.currentTarget.classList.contains("is-active")) {
        buttonForMobile.innerHTML = "hide";
        listLocation.style.transform = "translateY(0)";
      } else {
        buttonForMobile.innerHTML = "show";
        listLocation.style.transform = "translateY(990px)";
      }
    });

    window.addEventListener("resize", () => {
      if (screen.height > 420) {
        listLocation.style.transform = "translateY(0)";
        buttonForMobile.innerHTML = "hide";
      } else if (screen.height < 420) {
        listLocation.style.transform = "translateY(990px)";
        buttonForMobile.innerHTML = "show";
      }
    });
  }
});
