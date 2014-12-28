function Paginator(opts, filterCallback) {
  this.opts = opts || {};

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

P.pageCount = function(objCount){
  return Math.ceil(objCount / this.perPage);
};

P.render = function(objCount, currentPage){
  var html = "";

  if(this.perPage >= objCount){
    this.$container.html(html);
    return;
  }  
 
  this.objCount = objCount;
  this.pages = this.pageCount(objCount);

  html = this.paginationTmpl({
    pages: this.pages, 
    current_page: currentPage || this.currentPage
  });

  this.$container.html(html);
};

P.findClickedPage = function(page){
  console.log(this.currentPage, this.pages)
  if(parseInt(page)){
    return page;
  }

  if(page == 'first') {
   return  0;
  }
  
  if(page == 'last'){
    return this.pages;
  }

  if(page == 'next'){
    return this.currentPage == this.pages ? this.currentPage : (this.currentPage + 1);
  }

  if(page == 'previous'){
    return this.currentPage == 1 ? 1 : (this.currentPage - 1);
  }
};

P.bindEvents = function(filterCallback){
  var self = this;

  this.$container.on('click', '[data-page]', function(e){
    e.preventDefault();
    var page = self.findClickedPage($(this).data('page'));

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

P.pageChanged = function(){
  return this.currentPage == this.lastCurrentPage;
};

P.getOffset = function(){
  var start = (this.perPage * (this.currentPage - 1)),
      end = start + this.perPage;

  if(end > this.objCount){
    end = this.objCount;
  }

  return {start: start, end: end};
}
