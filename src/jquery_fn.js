$.fn.filterjs = function(records, options) {
  var $this = $(this);

  if (!$this.data('fjs')){
    $this.data('fjs', FilterJS(records, $this, options));
  }
};

