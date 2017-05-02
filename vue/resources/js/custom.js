$(function(){

  var $window = $(window);
  var position = 0;

  // Scroll the page when clicked, instead of just jumping
  $('a').bind('click',function(event){
    var anchor = $(this).attr('href');
    if(anchor.indexOf("#") != -1 && anchor != '#') {
      $('html, body').stop().animate({
        scrollTop: $(anchor).offset().top - 40
      }, 300);
      event.preventDefault();
    }
  });


  ///////////////////////
  // Table of Contents //
  ///////////////////////

  var $tocNavList = $('.sidebar-toc .nav-list');

  // Affix TOC to top position on scroll
  if($tocNavList.length > 0) { // C heck to see if there's a nav list before affixing it. Needed for IE.
    setTimeout(function () {
      position = $tocNavList.position().top - 60;
      $tocNavList.affix({
        offset: {
          top: position
        }
      })
    }, 100)
  }

});
