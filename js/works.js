var worksSlider;

worksSlider = {
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
  buildNav: function() {
    var $items;
    $items = $(".work");
    return $items.each(function() {
      var $parent, $root, id;
      id = $(this).parent().attr("id");
      $parent = $("<div/>", {
        "class": "workc-items",
        "data-id": id
      }).appendTo($(".workc-content"));
      $root = $("<div/>", {
        "class": "workc-wrap"
      }).appendTo($parent);
      $(this).find(".work-container").each(function() {
        var desc, header, item;
        header = $(this).find("h2").text();
        desc = $(this).find(".work-tooltip").text();
        item = $("<div/>", {
          "class": "workc-item"
        });
        item.append($("<div/>", {
          "class": "workc-item-name"
        }).text(header));
        item.append($("<div/>", {
          "class": "workc-item-label"
        }).text(desc));
        $root.append(item);
        return item.on("click", function() {
          return $(".content-item.js-active .work").mCustomScrollbar("scrollTo", -($(window).width() * $(this).index()));
        });
      });
      return $root.find(".workc-item").eq(0).addClass("js-active");
    });
  },
  init: function() {
    this.buildNav();
    this.pref = this.pref[Modernizr.prefixed('animation')];
    this.data.$items = $(".content-item");
    this.data.active.$elem = $(".content-item").eq(0).addClass("js-active");
    this.data.active.index = 0;
    $(".intro-arrow").on("click", $.proxy(this.setActive, this, this.data.active.index + 1, true, false));
    $(".intro-arrow").on("click", function() {
      $(".workc").addClass("js-active");
      return $(".workc-items").eq(0).addClass("js-active");
    });
    $(".intro-arrow").on('click', function() {
      return $('video')[0].play();
    });
    $(".workc-category").on("click", $.proxy(this.catController, this));
    $(".workc-nav--prev").on("click", $.proxy(this.navBack, this));
    $(".workc-nav--next").on("click", $.proxy(this.navNext, this));
    return $(window).on('mousewheel', $.proxy(this.wheelController, this));
  },
  wheelBinding: function() {
    return $(window).on('mousewheel', $.proxy(this.wheelController, this));
  },
  wheelController: function(event) {
    if (event.deltaY < 0) {
      this.setActive(this.data.active.index + 1, true, false);
      $(".workc").addClass("js-active");
      $(".workc-items").eq(0).addClass("js-active");
    }
    return $(window).off('mousewheel');
  },
  navBack: function() {
    var idx;
    $(".workc-nav--next").removeClass("js-hidden");
    idx = $(".workc-items.js-active .workc-item.js-active").index();
    if (idx <= 0) {
      this.setActive(0, false, true);
      return $(window).on('mousewheel', $.proxy(this.wheelController, this));
    } else {
      return $(".workc-items.js-active .workc-item").eq(idx - 1).click();
    }
  },
  navNext: function() {
    var idx;
    idx = $(".workc-items.js-active .workc-item.js-active").index();
    if ($(".workc-items.js-active .workc-item").size() > (idx + 1)) {
      $(".workc-items.js-active .workc-item").eq(idx + 1).click();
    }
    if ($(".workc-items.js-active .workc-item").size() === idx + 2) {
      return $(".workc-nav--next").addClass("js-hidden");
    }
  },
  resetCat: function() {
    $(".workc-nav--next").removeClass("js-hidden");
    $(".content-item.js-active .mCSB_container, .mCSB_dragger, .workc-items.js-active .workc-wrap").css({
      left: 0
    });
    return $(".workc-items.js-active .workc-item").removeClass("js-active").eq(0).addClass("js-active");
  },
  catController: function(evt) {
    var idx, prev;
    this.resetCat();
    idx = $(evt.target).index();
    prev = true;
    if (this.data.active.index - 1 === idx) {
      return false;
    }
    if (this.data.active.index > idx) {
      prev = false;
    }
    console.log(prev);
    return this.setActive(idx + 1, prev, false);
  },
  setActive: function(index, dir, isBack) {
    var activeClass, newItemClass;
    $(".workc-items").removeClass("js-active");
    if (!isBack) {
      $(".workc-items").eq(index - 1).addClass("js-active");
      $(".workc-category").removeClass("js-active");
      $(".workc-category").eq(index - 1).addClass("js-active");
    } else {
      $(".workc-items").removeClass("js-active");
      $(".workc").removeClass("js-active");
    }
    if (dir) {
      activeClass = 'navOutNext';
      newItemClass = 'navInNext';
    } else {
      activeClass = 'navOutPrev';
      newItemClass = 'navInPrev';
    }
    this.data.active.$elem.on(this.pref, function() {
      $(this).removeClass('js-active').removeClass(activeClass);
      return $(this).off(this.pref);
    });
    this.data.$items.eq(index).on(this.pref, function() {
      $(this).addClass('js-active').removeClass(newItemClass);
      return $(this).off(this.pref);
    });
    this.data.active.$elem.addClass(activeClass);
    this.data.$items.eq(index).addClass(newItemClass);
    this.data.active.index = index;
    return this.data.active.$elem = this.data.$items.eq(index);
  }
};

$(function() {
  return worksSlider.init();
});
