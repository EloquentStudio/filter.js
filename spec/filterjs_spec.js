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
});

