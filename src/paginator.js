var Paginator = function(recordsCount, opts, onPagination) {
  var paginationView;

  this.recordsCount = recordsCount;;
  this.opts = opts;
  this.$container = $(this.opts.container);

  if(this.opts.paginationView){
    paginationView = $(this.opts.paginationView).html();
  } else {
    paginationView = views.pagination;
  }

  this.paginationTmpl = templateBuilder(paginationView);

  this.currentPage = 1;
  this.onPagination = onPagination;
  this.initPerPage();
  this.bindEvents();
};

var P = Paginator.prototype;

P.bindEvents = function(){
  var self = this;

  $(this.opts.container).on('click', '[data-page]', function(e){
    self.setCurrentPage($(this).data('page'));
    e.preventDefault();
  });
};

P.totalPages = function(){
  return Math.ceil(this.recordsCount/this.perPageCount);
};

P.setCurrentPage = function(page){
  page = this.toPage(page)
  this.prevCurrentPage = this.currentPage;
  this.currentPage = page;
  this.paginate(page);
};

P.toPage = function(page){
  if(page == 'first'){
    return 1;
  }

  if(page == 'last'){
    return this.totalPages();
  }

  if(page == 'next'){
    var next_page = this.currentPage + 1;
    return (next_page > this.totalPages() ? this.currentPage : next_page);
  }

  if(page == 'prev'){
    var prev_page = this.currentPage - 1;
    return (prev_page <= 0 ? this.currentPage : prev_page);
  }
  
  return parseInt(page);
};

P.paginate = function(page){
  this.$container.find('[data-page="'+ this.prevCurrentPage +'"]').removeClass('active');
  this.$container.find('[data-page="'+ this.currentPage +'"]').addClass('active');
  this.onPagination(this.currentPage, this.perPageCount);
  this.render();
};

P.render = function(){
  var pages  = this.getPages();
  this.$container.html(this.paginationTmpl(pages))

  return pages;  
};

function makePageArray(start, end){
  var i = start, pages = [];

  for(i; i <= end; i++){
    pages.push(i);
  }
  
  return pages;
}

P.getPages = function () {
  var total = this.totalPages();
    
  if(!this.opts.visiblePages){
    return { currentPage: this.currentPage, totalPages: total, pages: makePageArray(0, total), self: this };
  }

  var half = Math.floor(this.opts.visiblePages / 2);
  var start = this.currentPage - half + 1 - this.opts.visiblePages % 2;
  var end = this.currentPage + half;

  // handle boundary case
  if (start <= 0) {
    start = 1;
    end = this.opts.visiblePages;
  }

  if (end > total) {
    start = total - this.opts.visiblePages;

    if(start <= 0){
      start = 1;
    }

    end = total; 
  }

  return { currentPage: this.currentPage, totalPages: total, pages: makePageArray(start, end), self: this };
},

P.initPerPage = function(){
  var opts = this.opts.perPage,
      template,
      html,
      ele,
      event_type,
      self = this;

  this.perPageCount = opts.values[0];

  template = opts.perPageView ? $(opts.perPageView).html() : views.per_page;
  html = templateBuilder(template)({ values: opts.values });
  $(opts.container).html(html);

  ele = $(opts.container).find('[data-perpage]')
  event_type = ele.get(0).tagName == 'SELECT' ? 'change' : 'click';

  $(opts.container).on(event_type, '[data-perpage]', function(e){
    var value = parseInt($(this).val() || $(this).data('value'));
    self.setPerPage(value)
    e.preventDefault();
  });
};

P.setPerPage = function(value){
  var pages;

  this.perPageCount = value;
  pages = this.totalPages();

  if(this.currentPage > pages){
    this.currentPage = pages;
  }

  this.setCurrentPage(this.currentPage);
}
