describe('FilterJS', function() {
  var fjs, options, tmpl;

  beforeEach(function() {
    options = {template: '#movie-template'};
  });

  describe('#initialize', function() {
    it('must set \'FJS\' values based on arguments', function() {
      fjs = FilterJS(movies, '#movies', options);
      // tmpl = FilterJS.templateBuilder($('#movie-template').html());

      expect(fjs.records).toEqual(movies);
      expect(fjs.recordsCount).toEqual(movies.length);
      expect(fjs._index).toEqual(movies.length + 1);

      expect(fjs.opts).toEqual(options);
      expect(fjs.callbacks).toEqual({});
      expect(fjs.criterias).toEqual([]);

      expect(fjs.has_pagination).toBeFalsy();
      expect(fjs.search_text).toEqual('');
      expect(fjs.anyFilterSelected).toBeFalsy();

      expect(fjs.$container.attr('id')).toEqual('movies');
    });

    it('must set custom options', function() {
      var search = {ele: '#searchbox'};

      var pagination = {
        container: '#pagination',
        visiblePages: 5,
        perPage: {
          values: [5, 10, 15],
          container: '#per_page'
        }
      };

      callbacks = {afterAddRecords: function() { return 'test'; }};

      options = {
        template: '#movie-template',
        search: search,
        callbacks: callbacks,
        pagination: pagination
      };
      fjs = FilterJS(movies, '#movies', options);

      expect(fjs.records).toEqual(movies);
      expect(fjs.recordsCount).toEqual(movies.length);
      expect(fjs._index).toEqual(movies.length + 1);

      expect(fjs.page.currentPage).toEqual(1);
      expect(fjs.page.perPage).toEqual(5);

      expect(fjs.opts).toEqual(options);
      expect(fjs.callbacks).toEqual(callbacks);
      expect(fjs.criterias).toEqual([]);

      expect(fjs.has_pagination).toBeTruthy();
      expect(fjs.opts.pagination).toEqual(pagination);

      expect(fjs.search_text).toEqual('');
      expect(fjs.anyFilterSelected).toBeFalsy();

      expect(fjs.$container.attr('id')).toEqual('movies');
    });
  });

  describe('#callbacks', function() {
    beforeEach(function() {
      this.buildFJS = function(callbacks, pagination) {
        options = {
          template: '#movie-template',
          callbacks: callbacks,
        };
        if(pagination) {
          options.pagination = pagination
        }
        FilterJS(movies, '#movies', options);
      };
    });

    it('must call \'beforeAddRecords\' callback', function() {
      var callbacks = {
        beforeAddRecords: function() {
          return 'Hello World';
        }
      };
      spyOn(callbacks, 'beforeAddRecords');
      this.buildFJS(callbacks);

      expect(callbacks.beforeAddRecords).toHaveBeenCalled();
    });

    it('must call \'afterAddRecords\' callback', function() {
      var callbacks = {
        afterAddRecords: function() {
          return 'Hello World';
        }
      };
      spyOn(callbacks, 'afterAddRecords');

      this.buildFJS(callbacks);
      expect(callbacks.afterAddRecords).toHaveBeenCalled();
    });

    it('must call \'beforeRender\' callback', function() {
      var callbacks = {
        beforeRender: function() {
          return 'Hello World';
        }
      };
      spyOn(callbacks, 'beforeRender');
      this.buildFJS(callbacks);

      expect(callbacks.beforeRender).toHaveBeenCalled();
    });

    it('must call \'beforeRecordRender\' callback', function() {
      var callbacks = {
        beforeRecordRender: function() {
          return 'Hello World';
        }
      };
      spyOn(callbacks, 'beforeRecordRender');
      this.buildFJS(callbacks);

      expect(callbacks.beforeRecordRender).toHaveBeenCalled();
    });

    it('must not call \'afterFilter\' callback when FilterJS initialized', function() {
      var callbacks = {
        afterFilter: function() {
          return 'Hello World';
        }
      };
      spyOn(callbacks, 'afterFilter');
      this.buildFJS(callbacks);

      expect(callbacks.afterFilter).not.toHaveBeenCalled();
    });

    it('must call \'afterFilter\' callback when FilterJS initialized and pagination enabled', function() {
      var pagination = {
        container: '#pagination',
        visiblePages: 5,
        perPage: {
          values: [5, 10, 15],
          container: '#per_page'
        }
      };

      var callbacks = {
        afterFilter: function() {
          return 'Hello World';
        }
      };
      spyOn(callbacks, 'afterFilter');
      this.buildFJS(callbacks, pagination);

      expect(callbacks.afterFilter).toHaveBeenCalled();
    });
  });

  describe('#initialize', function() {
    var paginationOpts;
    var paginationView = '<nav> <ul class="myPagination"> <% if(currentPage > 1) { %> <li> <a href="#" data-page="first" aria-label="First"><span aria-hidden="true">First</span></a> </li> <li><a href="#" data-page="prev" aria-label="Previous"><span aria-hidden="true">&larr; Previous</span></a></li> <% } %> <% for(var i = 0, l = pages.length; i < l; i++ ){ %> <li class="<%= pages[i] == currentPage ? \'active\' : \'\' %>"> <a href="#" data-page="<%= pages[i] %>"><%= pages[i] %></a> </li> <% } %> <% if( currentPage < totalPages ) { %> <li><a href="#" data-page="next" aria-label="Next"><span aria-hidden="true">Next &rarr;</span></a></li> <li><a href="#" data-page="last" aria-label="Last"><span aria-hidden="true">Last</span></a></li> <% } %> </ul></nav>';

    var perPageView = '<select size="1" name="per_page" data-perpage="true" class="per-page">  <% for(var i = 0; i < values.length; i++ ){ %>    <option value="<%= values[i] %>"><%= values[i] %></option>  <% } %></select>'; 

    it("must not set 'has_pagination' when no pagination options", function() {
      fjs = FilterJS(movies, '#movies', options);

      expect(fjs.has_pagination).toBeFalsy();
      expect(fjs.opts.pagination).toBeUndefined();
    });

    it("must set default pagination options", function() {
      paginationOpts = {
        container: '#pagination',
        perPage: { container: '#per_page' }
      }

      options.pagination = paginationOpts;
      fjs = FilterJS(movies, '#movies', options);

      expect(fjs.has_pagination).toBeTruthy();
      expect(fjs.opts.pagination).toEqual(paginationOpts);
      expect(fjs.page.currentPage).toEqual(1);
      // perPage value is set on 'onPagination' callback, default is 10
      expect(fjs.page.perPage).toEqual(10);
      // must use default pagination view set in filterjs dist
      expect(fjs.opts.pagination.paginationView).toBeUndefined();
      expect(fjs.opts.pagination.perPageView).toBeUndefined();
    });

    it("must set custom pagination options", function() {
      paginationOpts = {
        container: '#pagination',
        visiblePages: 5,
        perPage: {
          values: [5, 10, 15],
          container: '#per_page'
        }
      };

      paginationOpts.paginationView = paginationView;
      paginationOpts.perPageView = perPageView;

      options.pagination = paginationOpts;
      fjs = FilterJS(movies, '#movies', options);

      expect(fjs.has_pagination).toBeTruthy();
      expect(fjs.opts.pagination).toEqual(paginationOpts);
      expect(fjs.page.currentPage).toEqual(1);
      // perPage value is set on 'onPagination' callback
      expect(fjs.page.perPage).toEqual(paginationOpts.perPage.values[0]);
      expect(fjs.opts.pagination.paginationView).toEqual(paginationView);
      expect(fjs.opts.pagination.perPageView).toEqual(perPageView);
    });
  });
});

