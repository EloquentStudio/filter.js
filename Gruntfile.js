module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    uglify: {
      options: {
        mangle: false
      },
      target: {
        files: {
          'dist/filter.min.js': ['filter.js', 'lib/json_query.js']
        }
      }
    },
    remotefile: {
      remote_file_task: {
        url: 'https://raw.githubusercontent.com/jiren/JsonQuery/master/json_query.js', 
        dest: 'lib/json_query.js'
      },
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
          src: ['filter.js', 'lib/json_query.js'],
          dest: 'dist/filter.js',
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-remotefile');

  // Default task
  grunt.registerTask('default', ['remotefile', 'concat', 'uglify']);

  // Build task
  grunt.registerTask('build', ['remotefile', 'concat', 'uglify']);
};
