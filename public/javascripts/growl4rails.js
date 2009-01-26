var templateHTML = '<div id="#{id}" class="growl4rails_cell" style="display:none;">\
<table cellspacing="0" cellpadding="0">\
  <thead>\
    <tr>\
      <td><div class="growl4rails_corner_ul"></div></td>\
      <td><div class="growl4rails_top"></div></td>\
      <td><div class="growl4rails_corner_ur"></div></td>\
    </tr>\
  </thead>\
  <tbody>\
    <tr>\
      <td colspan="3">\
        <div class="growl4rails_body" id="growl4rails_body_#{id}"></div>\
      </td>\
    </tr>\
  </tbody>\
  <thead>\
    <tr>\
      <td><div class="growl4rails_corner_ll"></div></td>\
      <td><div class="growl4rails_bottom"></div></td>\
      <td><div class="growl4rails_corner_lr"></div></td>\
    </tr>\
  </thead>\
</table>\
</div>\
<div id="growl4rails_info_#{id}" class="growl4rails_info" style="display:none;">\
  <img src="#{img}" class="growl4rails_image" align="left" />\
  <div class="growl4rails_title">#{title}</div>\
  <div class="growl4rails_message">#{message}<div>\
</div>';

var growl4rails_template = new Template(templateHTML);

var growl4rails_instance_count = 0;
var growl4rails_current_showing = 0;
var growl4rails_queue = [];
var growl4rails_limit_reached = false;
var growl4rails_timer_hash = new Hash();

var Growl4Rails = Class.create();

Growl4Rails.showGrowl = function(arguments) {
  //if we're not showing maximum number of growls then show it, otherwise queue it up
  if(growl4rails_current_showing >= growl4rails_max_showing)
    growl4rails_limit_reached = true;
  
  //generate a unique id for this growl
  var growl_cell_id = $H(arguments).get('growl_id');
  if(growl_cell_id == null)
    growl_cell_id = 'growl4rails_cell_' + (growl4rails_instance_count++);
    
  if(!growl4rails_limit_reached) {
    growl4rails_current_showing++;
    
    //add it to the document
    var data = {
      id:growl_cell_id, 
      title:$H(arguments).get('title'), 
      img:$H(arguments).get('image_path'), 
      message:$H(arguments).get('message')
    };
    
    //get the other growls before we add this one so we can position
    var other_growls = $$('.growl4rails_cell');
    
    Element.insert(document.body, growl4rails_template.evaluate(data));
    
    //position the growl
    var top_offset = 0;
    var left_offset = document.viewport.getWidth() - 400;
    $(growl_cell_id).style.left = left_offset + 'px';
    
    if(other_growls.length > 0) {
      var top_position = 0;
      other_growls.each(function(growl) {
        top_position += growl.getHeight();
      });
      top_offset = document.viewport.getScrollOffsets().top + top_position + 10;
    } else {
      top_offset = document.viewport.getScrollOffsets().top + 10;
    }
    $(growl_cell_id).style.top = top_offset + 'px';
    
    //position the text and image
    $('growl4rails_info_' + growl_cell_id).style.top = (top_offset + 28) + 'px';
    $('growl4rails_info_' + growl_cell_id).style.left = left_offset + 28 + 'px';
  
    //wire up the growl mouse events
    $(growl_cell_id).observe('mouseover', Growl4Rails.mouseOver);
    $(growl_cell_id).observe('mouseout', Growl4Rails.mouseOut);
    $(growl_cell_id).observe('click', Growl4Rails.click);
    $('growl4rails_info_' + growl_cell_id).observe('click', Growl4Rails.click);
    
    //Temporary until we've got better support for opacity and alpha transparency
    if(Prototype.Browser.IE) {
      $('growl4rails_info_' + growl_cell_id).show();
      $(growl_cell_id).show();
    } else {  
      Effect.Appear('growl4rails_info_' + growl_cell_id);
      Effect.Appear(growl_cell_id);
    }
    
    $('growl4rails_body_' + growl_cell_id).style.height = ($('growl4rails_info_' + growl_cell_id).getDimensionsPatched().height - 20) + 'px';
    
    //set it up to disappear
    var timer = setTimeout("Growl4Rails.hideGrowl('" + growl_cell_id + "')", growl4rails_duration);
    growl4rails_timer_hash.set(growl_cell_id, timer);
  } else {
    growl4rails_queue.push($H({
      growl_id:growl_cell_id, 
      image_path:$H(arguments).get('image_path'), 
      title:$H(arguments).get('title'), 
      message:$H(arguments).get('message')
    }));
  }
  return growl_cell_id;
}

Growl4Rails.hideGrowl = function(growl_cell_id) {
  growl4rails_timer_hash.unset(growl_cell_id);
  if(Prototype.Browser.IE) {
    $('growl4rails_info_' + growl_cell_id).hide();
    $(growl_cell_id).hide();
  } else {
    Effect.Fade('growl4rails_info_' + growl_cell_id, { duration: 1.0 });
    Effect.Fade(growl_cell_id, { duration: 1.0 });
  }
    
  setTimeout("Growl4Rails.removeGrowl('" + growl_cell_id + "')", 1000);
};

Growl4Rails.removeGrowl = function(growl_cell_id) {
  growl4rails_current_showing--;
  $(growl_cell_id).remove();
  
  //if this is the last growl, fire an event so we can show more, if there are any
  if(growl4rails_current_showing == 0) {
    growl4rails_limit_reached = false;
    document.fire('growl4rails:lastgrowlshown');
  }
};

var mouseOverClasses = ['growl4rails_corner_ul', 'growl4rails_top', 'growl4rails_corner_ur', 
          'growl4rails_body', 'growl4rails_corner_ll', 'growl4rails_bottom', 'growl4rails_corner_lr'];

Growl4Rails.mouseOver = function(event) {
  //bunch of hoo-ha to make sure we're not handling bubbled mouseover events.
  var relatedTarget = event.relatedTarget;
  var currentTarget = event.currentTarget ? event.currentTarget : event.srcElement;
  if (relatedTarget && relatedTarget.nodeType == Node.TEXT_NODE) relatedTarget = relatedTarget.parentNode;   
  if (relatedTarget && relatedTarget != currentTarget && !Element.descendantOf(relatedTarget, currentTarget) && !relatedTarget.ancestors().any(function(n) { return n.hasClassName('growl4rails_info'); })) {
    growl_cell = Growl4Rails.findGrowlIdByDescendant(Event.findElement(event));
    mouseOverClasses.each(function(item) {
     $$('#' + growl_cell.id + ' .' + item)[0].toggleClassName(item + '_hi');
    });
    timer = growl4rails_timer_hash.get(growl_cell.id);
    clearTimeout(timer);
  }
};

Growl4Rails.mouseOut = function(event) {
  //bunch of hoo-ha to make sure we're not handling bubbled mouseover events.
  var relatedTarget = event.relatedTarget;
  var currentTarget = event.currentTarget ? event.currentTarget : event.srcElement;
  if (relatedTarget && relatedTarget.nodeType == Node.TEXT_NODE) relatedTarget = relatedTarget.parentNode;   
  if (relatedTarget && relatedTarget != currentTarget && !Element.descendantOf(relatedTarget, currentTarget) && !relatedTarget.ancestors().any(function(n) { return n.hasClassName('growl4rails_info'); })) {
    growl_cell = Growl4Rails.findGrowlIdByDescendant(Event.findElement(event));
    mouseOverClasses.each(function(item) {
     $$('#' + growl_cell.id + ' .' + item)[0].toggleClassName(item + '_hi');
    });
    var timer = setTimeout("Growl4Rails.hideGrowl('" + growl_cell.id + "')", growl4rails_duration);
    growl4rails_timer_hash.set(growl_cell.id, timer);
  }
};

Growl4Rails.click = function(event) {
  growl_cell = Growl4Rails.findGrowlIdByDescendant(Event.findElement(event));
  Growl4Rails.hideGrowl(growl_cell.id);
  growl_cell.fire(growl_cell.id + ':clicked');
};

Growl4Rails.findGrowlIdByDescendant = function(descendant) {
  //Thanks IE!!!
  if(descendant.className == 'growl4rails_cell')
    return descendant;
    
  var growl_cell = descendant.ancestors().find(function(ancestor){ return ancestor.hasClassName('growl4rails_cell'); });
  
  if(!growl_cell) {
    growl_info = descendant.ancestors().find(function(ancestor){ return ancestor.hasClassName('growl4rails_info'); });
    if(growl_info)
      growl_cell = $(growl_info.id.sub('growl4rails_info_', ''));
  }
  return growl_cell
};

document.observe('growl4rails:lastgrowlshown', function(event) {
  var i = 0;
  while(growl4rails_queue.length != 0 && i < growl4rails_max_showing) {
    Growl4Rails.showGrowl(growl4rails_queue.shift());
    i++;
  }
});

//Patch for getDimensions where parent is hidden, therefore can't get child dimensions:
Element.addMethods({
  getDimensionsPatched: function (element) { 
      element = $(element);
      var dimensions = {width: element.clientWidth, height: element.clientHeight}; 

      if ((dimensions.width || dimensions.height) == 0) { 
        // All *Width and *Height properties give 0 on elements with display none, 
        // or when ancestors have display none, so enable those temporarily 
        var restore = element.ancestors(function(element) { return !element.visible() }), 
        styles = []; 
        restore.push(element); 

        restore.each(function(r) { 
          styles.push({ 
            display: r.getStyle('display'), 
            position: r.getStyle('position'), 
            visibility: r.getStyle('visibility') 
          }); 
          r.setStyle({display: 'block', position: 'absolute', visibility: 'visible'}); 
        }); 

        dimensions = {width: element.clientWidth, height: element.clientHeight}; 
        restore.each(function(r, index) { 
          r.setStyle(styles[index]); 
        }); 
      } 
      return dimensions;         
  }//getDimensions
});
