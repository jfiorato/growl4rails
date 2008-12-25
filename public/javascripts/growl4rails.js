var Growl = Class.create({
  initialize: function() { 
    //top left image
    this.growl_tl = document.createElement('IMG');
    this.growl_tl.id = 'growl_tl';
    this.growl_tl.src = '/images/growl4rails/corner_ul.png';
    this.growl_tl.className = 'growl';
    document.body.appendChild(this.growl_tl);
    $('growl_tl').hide();
    
    //top div
    this.growl_top = document.createElement('DIV');
    this.growl_top.id = 'growl_top';
    this.growl_top.className = 'growl';
    document.body.appendChild(this.growl_top);
    $('growl_top').hide();
    
    //top right image
    this.growl_tr = document.createElement('IMG');
    this.growl_tr.id = 'growl_tr';
    this.growl_tr.src = '/images/growl4rails/corner_ur.png';
    this.growl_tr.className = 'growl';
    document.body.appendChild(this.growl_tr);
    $('growl_tr').hide();
    
    //left div
    this.growl_left = document.createElement('DIV');
    this.growl_left.id = 'growl_left';
    this.growl_left.className = 'growl';
    document.body.appendChild(this.growl_left);
    $('growl_left').hide();
    
    //body div
    this.growl_body = document.createElement('DIV');
    this.growl_body.id = 'growl_body';
    this.growl_body.className = 'growl';
    document.body.appendChild(this.growl_body);
    $('growl_body').hide();
    
    //right div
    this.growl_right = document.createElement('DIV');
    this.growl_right.id = 'growl_right';
    this.growl_right.className = 'growl';
    document.body.appendChild(this.growl_right);
    $('growl_right').hide();
    
    //bottom left image
    this.growl_bl = document.createElement('IMG');
    this.growl_bl.id = 'growl_bl';
    this.growl_bl.src = '/images/growl4rails/corner_ll.png';
    this.growl_bl.className = 'growl';
    document.body.appendChild(this.growl_bl);
    $('growl_bl').hide();
    
    //bottom image
    this.growl_bottom = document.createElement('DIV');
    this.growl_bottom.id = 'growl_bottom';
    this.growl_bottom.className = 'growl';
    document.body.appendChild(this.growl_bottom);
    $('growl_bottom').hide();
    
    //bottom right image
    this.growl_br = document.createElement('IMG');
    this.growl_br.id = 'growl_br';
    this.growl_br.src = '/images/growl4rails/corner_lr.png';
    this.growl_br.className = 'growl';
    document.body.appendChild(this.growl_br);
    $('growl_br').hide();
    
    //add container (this is for easier mouseover code.)
    this.growl_container = document.createElement('DIV');
    this.growl_container.id = 'growl_container';
    this.growl_container.className = 'growl';
    document.body.appendChild(this.growl_container);
    $('growl_container').hide();
    
    this.growl_container.observe('mouseover', function(event) {
      Growl.cancelTimeout();
      Growl.highlight();
    });
    
    this.growl_container.observe('mouseout', function(event) {
      this.timeout = setTimeout("Growl.hide()",5000);
      Growl.unhighlight();
    });
  },
  
  show: function(img, title, message) {
    if(this.showing) return;
    this.showing = true;
    
    //clear any child elements;
    if(this.growl_ico)
      this.growl_body.removeChild(this.growl_ico);

    if(this.growl_title)
      this.growl_body.removeChild(this.growl_title);
        
    if(this.growl_text)
      this.growl_body.removeChild(this.growl_text);
      
    this.growl_ico = document.createElement('IMG');
    this.growl_ico.id = 'growl_ico';
    this.growl_ico.align = 'left';
    this.growl_body.appendChild(this.growl_ico);
    
    this.growl_title = document.createElement('DIV');
    this.growl_title.id = 'growl_title';
    this.growl_title.className = 'growl_title';
    this.growl_body.appendChild(this.growl_title);
    
    this.growl_text = document.createElement('DIV');
    this.growl_text.id = 'growl_text';
    this.growl_body.appendChild(this.growl_text);
    
    this.growl_ico.src = img;
    $('growl_title').insert(title);
    $('growl_text').insert(message);
    
    left = document.viewport.getWidth() - 400;
    
    this.growl_tl.style.left = left + 'px';
    this.growl_top.style.left = (left + 39) + 'px';
    this.growl_tr.style.left = (left + 340) + 'px';
    this.growl_body.style.left = (left + 39) + 'px';
    
    if(Prototype.Browser.IE) {
      $('growl_tl').show();
      $('growl_top').show();
      $('growl_tr').show();
      $('growl_body').show();
    } else {
      Effect.Appear(this.growl_tl);
      Effect.Appear(this.growl_top); 
      Effect.Appear(this.growl_tr);
      Effect.Appear(this.growl_body);
    }
    
    //need to wait until the top and body appears in order to get proper position for the bottom, sides and container
    height = this.growl_body.getHeight();
    
    this.growl_left.style.left = left + 'px';
    this.growl_left.style.height = (height - 24) + 'px';
    this.growl_right.style.left = (left + 340) + 'px';
    this.growl_right.style.height = (height - 24) + 'px';
    
    this.growl_bl.style.left = left + 'px';
    this.growl_bl.style.top = (height + 27) + 'px';//height + 10 + 41 - 25
    this.growl_bottom.style.left = (left + 39) + 'px';
    this.growl_bottom.style.top = (height + 36) + 'px';
    this.growl_br.style.left = (left + 340) + 'px';
    this.growl_br.style.top = (height + 27) + 'px';
    this.growl_container.style.left = left + 'px';
    this.growl_container.style.height = (height + 91) + 'px';
    
    this.growl_container.show();
    
    if(Prototype.Browser.IE) {
      $('growl_bl').show();
      $('growl_bottom').show();
      $('growl_br').show();
      $('growl_left').show();
      $('growl_right').show();
    } else {
      Effect.Appear(this.growl_bl);
      Effect.Appear(this.growl_bottom); 
      Effect.Appear(this.growl_br);
      Effect.Appear(this.growl_left);
      Effect.Appear(this.growl_right);
    }
    
    this.timeout = setTimeout("Growl.hide()",5000);
  },
  
  hide: function() {
    if(Prototype.Browser.IE) {
      $$('.growl').invoke('hide');
    } else {
      $$('.growl').each(function(element) {
        Effect.Fade(element);
      });
    }
    setTimeout("Growl.setShowing()", 1000);
  },

  cancelTimeout: function() {
    if(this.timeout)
      clearTimeout(this.timeout);
  },
  
  highlight: function() {
    this.growl_tl.src = '/images/growl4rails/corner_ul_hi.png';
    this.growl_tr.src = '/images/growl4rails/corner_ur_hi.png';
    this.growl_bl.src = '/images/growl4rails/corner_ll_hi.png';
    this.growl_br.src = '/images/growl4rails/corner_lr_hi.png';
    this.growl_top.style.backgroundImage = 'url(/images/growl4rails/top_hi.png)';
    this.growl_bottom.style.backgroundImage = 'url(/images/growl4rails/bottom_hi.png)';
    this.growl_left.style.backgroundImage = 'url(/images/growl4rails/left_hi.png)';
    this.growl_right.style.backgroundImage = 'url(/images/growl4rails/right_hi.png)';
  },
  
  unhighlight: function() {
    this.growl_tl.src = '/images/growl4rails/corner_ul.png';
    this.growl_tr.src = '/images/growl4rails/corner_ur.png';
    this.growl_bl.src = '/images/growl4rails/corner_ll.png';
    this.growl_br.src = '/images/growl4rails/corner_lr.png';
    this.growl_top.style.backgroundImage = 'url(/images/growl4rails/top.png)';
    this.growl_bottom.style.backgroundImage = 'url(/images/growl4rails/bottom.png)';
    this.growl_left.style.backgroundImage = 'url(/images/growl4rails/left.png)';
    this.growl_right.style.backgroundImage = 'url(/images/growl4rails/right.png)';
  }
});

var _growl;

Event.observe(window, 'load', function(event) {
  _growl = new Growl();
});

Growl.show = function(img, title, message) {
  if(!_growl) _growl = new Growl();
  _growl.show(img, title, message);
};

Growl.hide = function() {
  if(!_growl) return;
  _growl.hide();
};

Growl.cancelTimeout = function() {
  if(!_growl) return;
  _growl.cancelTimeout();
}

Growl.highlight = function() {
  if(!_growl) return;
  _growl.highlight();
}

Growl.unhighlight = function() {
  if(!_growl) return;
  _growl.unhighlight();
}

Growl.setShowing = function() {
  if(!_growl) return;
   _growl.showing = false;
}