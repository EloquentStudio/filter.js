function Pagination(records_count, per_page) {
  this.records_count = records_count;
  this.per_page = per_page || 20;

  this.pages_count = Math.ceil(records_count / this.per_page);
  this.tmpls = {};
}

window.Pagination = Pagination;

var P = Pagination.prototype;

P.buildTemplate = function(text, data_page, li_class){
  return '<li class="'+ li_class +'">' + 
    '<a href="#" data-page="'+ data_page+'">'+ text +'</a>' +
    '</li>';
}

P.loadTemplates = function(){
  this.tmpls['first_page'] = this.buildTemplate('First', 'first', 'first'); 
  this.tmpls['las_page']   = this.buildTemplate('Last', 'last', 'last'); 
  this.tmpls['next_page']  = this.buildTemplate('Next', 'next', 'next'); 
  this.tmpls['first_page'] = this.buildTemplate('Previous', 'prev', 'prev'); 
  this.tmpls['first_page'] = this.buildTemplate('Previous', 'prev', 'prev'); 
  this.tmpls['gap_page']   = this.buildTemplate('...', 'gap', 'gap'); 
  this.tmpls['paginator'] = "<ul class='pagination'>"
}
