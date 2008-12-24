var Growl = Class.create({
  initialize: function() { 
    //top left image
    this.growl_tl = document.createElement('IMG');
    this.growl_tl.id = 'growl_tl';
    this.growl_tl.src = '/images/growl4rails/corner_ul.png';
    this.growl_tl.className = 'growl';
    this.growl_tl.hide();
    document.body.appendChild(this.growl_tl);
    
    //top div
    this.growl_top = document.createElement('DIV');
    this.growl_top.id = 'growl_top';
    this.growl_top.className = 'growl';
    this.growl_top.hide();
    document.body.appendChild(this.growl_top);
    
    //top right image
    this.growl_tr = document.createElement('IMG');
    this.growl_tr.id = 'growl_tr';
    this.growl_tr.src = '/images/growl4rails/corner_ur.png';
    this.growl_tr.className = 'growl';
    this.growl_tr.hide();
    document.body.appendChild(this.growl_tr);
    
    //body div
    this.growl_body = document.createElement('DIV');
    this.growl_body.id = 'growl_body';
    this.growl_body.className = 'growl';
    this.growl_body.hide();
    document.body.appendChild(this.growl_body);
    
    //bottom left image
    this.growl_bl = document.createElement('IMG');
    this.growl_bl.id = 'growl_bl';
    this.growl_bl.src = '/images/growl4rails/corner_ll.png';
    this.growl_bl.className = 'growl';
    this.growl_bl.hide();
    document.body.appendChild(this.growl_bl);
    
    //bottom image
    this.growl_bottom = document.createElement('DIV');
    this.growl_bottom.id = 'growl_bottom';
    this.growl_bottom.className = 'growl';
    this.growl_bottom.hide();
    document.body.appendChild(this.growl_bottom);
    
    //bottom right image
    this.growl_br = document.createElement('IMG');
    this.growl_br.id = 'growl_br';
    this.growl_br.src = '/images/growl4rails/corner_lr.png';
    this.growl_br.className = 'growl';
    this.growl_br.hide();
    document.body.appendChild(this.growl_br);
    
    //add container (this is for easier mouseover code.)
    this.growl_container = document.createElement('DIV');
    this.growl_container.id = 'growl_container';
    this.growl_container.className = 'growl';
    this.growl_container.hide();
    document.body.appendChild(this.growl_container);
    
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
    if(this.growl_body_text)
      this.growl_body.removeChild(this.growl_body_text);
    
    this.growl_body_text = document.createElement('DIV');
    this.growl_body_text.id = 'growl_body_text';
    
    this.growl_ico = document.createElement('IMG');
    this.growl_ico.id = 'growl_ico';
    this.growl_ico.align = 'left';
    this.growl_body_text.appendChild(this.growl_ico);
    
    this.growl_title = document.createElement('DIV');
    this.growl_title.className = 'growl_title';
    this.growl_body_text.appendChild(this.growl_title);
    
    this.growl_body.appendChild(this.growl_body_text);
    
    this.growl_ico.src = img;
    this.growl_title.insert(title);
    this.growl_body_text.insert(message);
    
    left = document.viewport.getWidth() - 400;
    
    this.growl_tl.style.left = left + 'px';
    this.growl_top.style.left = (left + 28) + 'px';
    this.growl_tr.style.left = (left + 351) + 'px';
    this.growl_body.style.left = left + 'px';
    
    if(Prototype.Browser.IE) {
      this.growl_tl.show();
      this.growl_top.show();
      this.growl_tr.show();
      this.growl_body.show();
    } else {
      Effect.Appear(this.growl_tl);
      Effect.Appear(this.growl_top); 
      Effect.Appear(this.growl_tr);
      Effect.Appear(this.growl_body);
    }
    
    //need to wait until the top and body appears in order to get proper position for the bottom and container
    height = this.growl_body.getHeight();
    
    this.growl_bl.style.left = left + 'px';
    this.growl_bl.style.top = (height + 36) + 'px';
    this.growl_bottom.style.left = (left + 28) + 'px';
    this.growl_bottom.style.top = (height + 36) + 'px';
    this.growl_br.style.left = (left + 351) + 'px';
    this.growl_br.style.top = (height + 36) + 'px';
    this.growl_container.style.left = left + 'px';
    this.growl_container.style.height = (height + 80) + 'px';
    
    this.growl_container.show();
    
    if(Prototype.Browser.IE) {
      this.growl_bl.show();
      this.growl_bottom.show();
      this.growl_br.show();
    } else {
      Effect.Appear(this.growl_bl);
      Effect.Appear(this.growl_bottom); 
      Effect.Appear(this.growl_br);
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
    this.growl_body.style.backgroundImage = 'url(/images/growl4rails/body_hi.png)';
  },
  
  unhighlight: function() {
    this.growl_tl.src = '/images/growl4rails/corner_ul.png';
    this.growl_tr.src = '/images/growl4rails/corner_ur.png';
    this.growl_bl.src = '/images/growl4rails/corner_ll.png';
    this.growl_br.src = '/images/growl4rails/corner_lr.png';
    this.growl_top.style.backgroundImage = 'url(/images/growl4rails/top.png)';
    this.growl_bottom.style.backgroundImage = 'url(/images/growl4rails/bottom.png)';
    this.growl_body.style.backgroundImage = 'url(/images/growl4rails/body.png)';
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