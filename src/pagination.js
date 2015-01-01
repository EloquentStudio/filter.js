function Paginator(opts, filterCallback) {
  this.opts = $.extend({
    inner_window: 0,
    outer_window: 0,
    left: 0,
    right: 0
  }, opts);

  this.opts.window = this.opts.window || this.opts.inner_window || 3;
  this.opts.left = this.opts.left || this.opts.outer_window;
  this.opts.right = this.opts.right || this.opts.outer_window;

  this.opts.per_page = this.opts.per_page || {};
  this.opts.per_page.values = [].concat(this.opts.per_page.values || [20, 30, 50]);
  this.perPage = this.opts.per_page.values[0];

  this.currentPage = 1;
  this.lastCurrentPage = null;
  this.initTemplates();
  this.$container = $(this.opts.container);
  this.bindEvents(filterCallback); 
}

var P = Paginator.prototype;

P.initTemplates = function(){
  var pagiHtml, perPhtml;

  if(this.opts.template){
    pagiHtml = $(this.opts.template).html()
  }else{
    pagiHtml = /* inject src/views/paginator.html */;
  }

  this.paginationTmpl = templateBuilder(pagiHtml);

  if(!this.opts.per_page.container){
    return;
  }

  if(this.opts.per_page.template){
    perPhtml = $(this.opts.perPage.template).html();
  }else{
    perPhtml= /* inject src/views/per_page.html */;
  }

  $(this.opts.per_page.container).html(templateBuilder(perPhtml, {
    options: this.opts.per_page.values
  }));

};

P.rangeToArray = function(n1, n2){
  var nums = [];

  if(n1 <= 0){
    n1 = 1;
  }else if(n2 <= 0){
    n2 = 1;
  }
  
  if(n2 > this.totalPages){
    n2 = this.totalPages;
  } 

  for(n1; n1 <= n2; n1++){
    nums.push(n1);
  }
  return nums;
};

P.getPages = function(){
  var i = 0,
      l,
      pages = [],
      left = this.rangeToArray(1, this.opts.left),
      inside = this.rangeToArray(this.currentPage - this.opts.window, this.currentPage + this.opts.window ),
      right = this.rangeToArray(this.totalPages - this.opts.right, this.totalPages);

  var nums = $.unique(left.concat(inside, right))
                .sort(function(a,b){ return (a - b);})
  
  for(i = 0, l = nums.length; i < l; i++){
    this.lastPage = new Page(this.opts, nums[i], this.totalPages, this.currentPage);
    pages.push(this.lastPage);
  }

  return pages;
};

P.render = function(totalItems, currentPage){
  var html;

  this.totalItems = totalItems;
  this.totalPages = Math.ceil(totalItems / this.perPage);

  html = this.paginationTmpl({
    pages: this.getPages(), 
    current_page: new Page(this.opts, this.currentPage, this.totalPages, this.currentPage), 
  });

  this.$container.html(html);

  return this.getOffset(totalItems);
};

P.bindEvents = function(filterCallback){
  var self = this;

  this.$container.on('click', '[data-page]', function(e){
    e.preventDefault();
    var page = getPageNum($(this).data('page'), self.totalPages, self.currentPage);

    if(page != self.currentPage){
      self.lastCurrentPage = self.currentPage;
      self.currentPage = page;
      filterCallback(self.getOffset());
    }
  })

  if(!this.opts.per_page.container){ return; }

  var $perPage = $(this.opts.per_page.container), 
      eleEvent = $perPage.find('[data-per-page]').is('select') ? 'change' : 'click';

  $perPage.on(eleEvent, '[data-per-page]', function(e){

    var $ele = $(this), perPage;

    if($ele.is('a')){
      e.preventDefault();
      perPage = $ele.data('value') || $ele.text();
    }else{
      perPage = $ele.val();
    }

    perPage = parseInt(perPage);

    if(perPage && self.perPage != perPage){
      self.perPage = perPage;
      filterCallback(self.getOffset());
    }
  });

};

P.getOffset = function(totalItems){
  var start = (this.perPage * (this.currentPage - 1)),
      end = start + this.perPage;

  if(!totalItems){
    totalItems = this.totalItems
  }

  if(end > totalItems){
    end = totalItems;
  }

  return {start: start, end: end};
}
