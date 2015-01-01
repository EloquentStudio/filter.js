function getPageNum(page, total, current){
  var num = parseInt(page);

  if(num){
    return num;
  }

  if(page == 'first') {
   return  1;
  }
  
  if(page == 'last'){
    return total;
  }

  if(page == 'next'){
    return current == total ? current : (current + 1);
  }

  if(page == 'previous'){
    return current == 1 ? 1 : (current - 1);
  }

  return page;
};

function Page(opts, page, last, current){
  this.opts = opts;
  this.last = last;
  this.current = current;
  this.num = getPageNum(page);
}

var G = Page.prototype;

G.isCurrent = function(){
  return this.num == this.current;
};

G.isFirst = function(){
  return this.num == 1;
};

G.isLast = function(){
  return this.num == this.last;
};

G.isPrev = function(){
  return this.num == (this.current - 1);
};

G.isNext = function(){
  return this.num == (this.current + 1);
};

//within the left outer window or not
G.isLeftOuter = function(){
  return this.num <= this.opts.left;
};

//within the right outer window or not
G.isRightOuter = function(){
  return (this.last - this.num) < this.opts.right;
};

//inside the inner window or not
G.isInsideWindow = function(){
  return Math.abs(this.current - this.num) <= this.opts.window;
};

G.isTruncated = function(){
  return this.num == 'gap';
};

