var uiSlider;

uiSlider = {
  pref: {
    'WebkitAnimation': 'webkitAnimationEnd',
    'OAnimation': 'oAnimationEnd',
    'msAnimation': 'MSAnimationEnd',
    'animation': 'animationend'
  },
  data: {
    $items: null,
    active: {
      $elem: null,
      index: -1
    }
  },
  ui: {
    $slider: null,
    $itemsWrap: null,
    $paginator: [],
    $pager: null,
    $wrap: null,
    $next: null,
    $prev: null
  },
  init: function() {
    var i;
    this.pref = this.pref[Modernizr.prefixed('animation')];
    this.data.$items = $(".content-item");
    this.data.active.$elem = $(".content-item").eq(0).addClass("js-active");
    this.data.active.index = 0;
    this.ui.$slider = $("<div/>", {
      "class": "slider js-hidden"
    });
    this.ui.$itemsWrap = $("<div/>", {
      "class": "slider-items"
    }).appendTo(this.ui.$slider);
    i = 0;
    while (i < this.data.$items.length) {
      this.ui.$paginator.push($("<div/>", {
        "class": "slider-item"
      }).append("<span/>"));
      this.ui.$itemsWrap.append(this.ui.$paginator[i]);
      i++;
    }
    this.ui.$paginator[this.data.active.index].addClass("js-active");
    this.ui.$pager = $("<div/>", {
      "class": "slider-ui-pager"
    }).appendTo(this.ui.$itemsWrap);
    this.ui.$wrap = $("<div/>", {
      "class": "slider-ui"
    }).appendTo(this.ui.$itemsWrap);
    this.ui.$next = $("<div/>", {
      "class": "slider-ui-arrow slider-ui-arrow--r"
    }).append("<span/>").append("<i/>").appendTo(this.ui.$wrap);
    this.ui.$prev = $("<div/>", {
      "class": "slider-ui-arrow slider-ui-arrow--l js-hidden"
    }).append("<span/>").append("<i/>").appendTo(this.ui.$wrap);
    this.ui.$next.find("span").text(this.data.$items.eq(1).attr("data-name"));
    if($('.content-item').length > 1) {
      $(".content").append(this.ui.$slider); 
    }
    this.ui.$next.on("click", $.proxy(this.next, this));
    this.ui.$prev.on("click", $.proxy(this.prev, this));
    return $(window).on('mousewheel', $.proxy(this.wheelController, this));
  },
  wheelBinding: function() {
    return $(window).on('mousewheel', $.proxy(this.wheelController, this));
  },
  wheelController: function(event) {
    if (event.deltaY > 0 && $('.content').scrollTop() === 0) {
      this.prev();
    } else if (($('.content-item.js-active').height() - $('.content').height()) <= $('.content').scrollTop()) {
      this.next();
    }
    $(window).off('mousewheel');
    return setTimeout($.proxy(this.wheelBinding, this), 1750);
  },
  next: function() {
    var nextIndex;
    nextIndex = this.data.active.index + 1;
    if (nextIndex > (this.data.$items.size() - 1)) {
      return false;
    }
    this.ui.$prev.removeClass("js-hidden");
      this.ui.$slider.removeClass("js-hidden");
    this.ui.$paginator[this.data.active.index].removeClass("js-active");
    this.ui.$paginator[nextIndex].addClass("js-active");
      
    if (nextIndex + 1 === this.data.$items.length) {
      this.ui.$next.addClass("js-hidden");
    } else {
      this.ui.$next.find("span").text(this.data.$items.eq(nextIndex + 1).attr("data-name"));
    }
    this.ui.$prev.find("span").text(this.data.$items.eq(nextIndex - 1).attr("data-name"));
    return this.setActive(nextIndex, true);
  },
  prev: function() {
    var nextIndex;
    nextIndex = this.data.active.index - 1;
    if (nextIndex < 0) {
      return false;
    }
    this.ui.$next.removeClass("js-hidden");
    this.ui.$paginator[this.data.active.index].removeClass("js-active");
    this.ui.$paginator[nextIndex].addClass("js-active");
    if (nextIndex === 0) {
      this.ui.$prev.addClass("js-hidden");
        this.ui.$slider.addClass("js-hidden");
    } else {
      this.ui.$prev.find("span").text(this.data.$items.eq(nextIndex - 1).attr("data-name"));
    }
    this.ui.$next.find("span").text(this.data.$items.eq(nextIndex + 1).attr("data-name"));
    return this.setActive(nextIndex, false);
  },
  setActive: function(index, dir) {
    var activeClass, modify, newItemClass, uiTheme;
    if(!$('.no-anim-portfolio').length) {
    $('.content').on('mousewheel.disable', function(evt) {
      evt.preventDefault();
      return false;
    });
    $('.content').scrollTop(0);
    uiTheme = this.data.$items.eq(index).attr("data-ui");
    modify = this.data.$items.eq(index).attr('data-class');
    if (modify) {
      $('.content').addClass('scrolled');
    } else {
      $('.content').removeClass('scrolled');
    }
    if (uiTheme && uiTheme === "dark") {
      $(".ui, .slider").addClass("ui--dark");
      $(".ui, .slider").removeClass("ui--white");
    } else if (uiTheme && uiTheme === "white") {
      $(".ui, .slider").removeClass("ui--dark");
      $(".ui, .slider").addClass("ui--white");
    } else {
      $(".ui, .slider").removeClass("ui--dark");
      $(".ui, .slider").removeClass("ui--white");
    }
    if (dir) {
      activeClass = 'navOutNext';
      newItemClass = 'navInNext';
    } else {
      activeClass = 'navOutPrev';
      newItemClass = 'navInPrev';
    }

    this.data.active.$elem.on(this.pref, function() {
      $('.content').off('mousewheel.disable');
      $(this).removeClass('js-active').removeClass(activeClass);
      $(this).off(this.pref);
      if ($(this).find('video').size() > 0) {
        $(this).find('video')[0].pause();
        return $(this).find('video')[0].currentTime = 0;
      }
      if ($('.portfolio').length) {
          $('.content-portfolio').addClass('no-anim-portfolio');
           $('.content-perspective').removeClass('ov-hidd');
            $(window).scrollTop(0);
            $('.content-item:first-child').hide();

            // Skrollr parallax
            var s,
                setTimeSroll;

              function touchevents() {
                  return (/Android|iPhone|iPad|iPod|BlackBerry/i).test(navigator.userAgent || navigator.vendor || window.opera);
              }

            if (touchevents() == false) {

                s = skrollr.init({
                    forceHeight: false
                });

                $(window).on('resize load', function(){
                    clearTimeout(setTimeSroll);
                    setTimeSroll = setTimeout(function(){
                        s.refresh();
                    }, 300);
                });

            }
          
      }
        
    });
    this.data.$items.eq(index).on(this.pref, function() {
      $(this).addClass('js-active').removeClass(newItemClass);
      $(this).off(this.pref);
      if ($(this).find('video').size() > 0) {
        return $(this).find('video')[0].play();
      }
    });
    this.data.active.$elem.addClass(activeClass);
    this.data.$items.eq(index).addClass(newItemClass);
    this.data.active.index = index;
    return this.data.active.$elem = this.data.$items.eq(index);
  }
  }
};

$(function() {
    return uiSlider.init();
});
