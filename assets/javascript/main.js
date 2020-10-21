//Tooltips
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

//Collapsing navbar
var autocollapse = function (menu,maxHeight) {
    
    var nav = $(menu);
    var navHeight = nav.innerHeight();
    if (navHeight >= maxHeight) {
        
        $(menu + ' .dropdown').removeClass('d-none');
        $(".navbar-nav").removeClass('w-auto').addClass("w-100");
        
        while (navHeight > maxHeight) {
            //  add child to dropdown
            var children = nav.children(menu + ' li:not(:last-child)');
            var count = children.length;
            $(children[count - 1]).prependTo(menu + ' .dropdown-menu');
            navHeight = nav.innerHeight();
        }
        $(".navbar-nav").addClass("w-auto").removeClass('w-100');
        
    }
    else {
        
        var collapsed = $(menu + ' .dropdown-menu').children(menu + ' li');
      
        if (collapsed.length===0) {
          $(menu + ' .dropdown').addClass('d-none');
        }
      
        while (navHeight < maxHeight && (nav.children(menu + ' li').length > 0) && collapsed.length > 0) {
            //  remove child from dropdown
            collapsed = $(menu + ' .dropdown-menu').children('li');
            $(collapsed[0]).insertBefore(nav.children(menu + ' li:last-child'));
            navHeight = nav.innerHeight();
        }

        if (navHeight > maxHeight) { 
            autocollapse(menu,maxHeight);
        }
        
    }
};

// Iframe
$(document).ready(function () {
    if( window.location.search.indexOf("iframe") > -1 ) {
        $('#mobile-navbar').remove();
        $('a.navbar-brand').hide();
        $('button.navbar-toggler').hide();
        $( '#desktop-navbar' ).removeClass( 'bg-dark d-none d-sm-block' ).addClass( 'justify-content-center nav-iframe' );
        // $( '#nav' ).addClass( 'mx-auto' )
        $('a').each(function(i,e) {
            if (e != window.undefined && !e.target) {
                if (e.href.indexOf(location.hostname) > -1) {
                    e.href = e.href+"?iframe"
                }
            }
        });

        updateParentUrl();
    }

    // when the page loads
    autocollapse('#nav',50); 
    
    // when the window is resized
    $(window).on('resize', function () {
        autocollapse('#nav',50); 
    });


});


function updateParentUrl() {
    window.addEventListener("message", (event) => {
        // console.log("tb",event);
        if (event.data.url) {
            window.location.pathname=event.data.url.substr(1);
        }
    });
    
    window.parent.postMessage({ url: window.location.pathname},"https://poderlatam.org");        
}