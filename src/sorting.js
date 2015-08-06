var Sort = function(opts, onSortEvent) {
  this.opts = opts;

  if(!this.opts.default_sort){
    this.opts.default_sort = 'desc';
  }

  this.fields = {};
  this.onSortEvent = onSortEvent;
};

var S = Sort.prototype;

S.addSorting = function(selector, field, order){
  if(!order){
    order = this.order.default_sort; 
  }

  var opts = { 
    field: field, 
    selector: selector, 
    order: order, 
    toggle: false,
    enable: true 
  };

  this.fields[fields] = opts;
  this.bindEvent(opts);
};


S.bindEvents = function(opts){
  var self = this, 
      event_type,
      $ele = $(opts.selector);

  if(!opts.event_type){
   event_type = $ele.tagName == 'SELECT' ? 'change' : 'click';
  }

  $ele.data('sort', opts.field);

  $ele.on(event_type, { field: opts.field }, function(e){
    var f = self.field[e.data.field]

    if(f.toggle){
      f.order = f.order == 'desc' ? 'asc' : 'desc';
    }

    self.onSortEvent(f);
    e.preventDefault();
  });
};

S.disableAll = function(){
  $.each(this.field, function(f, opts){
    opts.enable = false;
  });
}
