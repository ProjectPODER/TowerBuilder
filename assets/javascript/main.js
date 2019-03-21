$(function() {
  $('#fullpage').fullpage({
    verticalCentered: true,
    navigation: true,
    anchors: anchors,
    menu: '#menu'
  });
});

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})