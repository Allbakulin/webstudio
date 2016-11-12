var size;

$(".partners-items").attr("data-state", 1);

$(".partners-nav-item--prev").addClass("js-hidden");

size = 2;

$(".partners-nav-item--next").on("click", function() {
  var current;
  $(".partners-nav-item--prev").removeClass("js-hidden");
  current = parseInt($(".partners-items").attr("data-state"));
  $(".partners-items").attr("data-state", current + 1);
  if (current === 1) {
    return $(this).addClass("js-hidden");
  }
});

$(".partners-nav-item--prev").on("click", function() {
  var current;
  $(".partners-nav-item--next").removeClass("js-hidden");
  current = parseInt($(".partners-items").attr("data-state"));
  $(".partners-items").attr("data-state", current - 1);
  if (current === 2) {
    return $(this).addClass("js-hidden");
  }
});
