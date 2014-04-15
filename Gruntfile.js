
module.exports = function(grunt) {

  // Global configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Concat JS files.
    // https://github.com/gruntjs/grunt-contrib-concat
    concat: {
      dist: {
        src: [
          'js/libs/*.js', // All JS in the libs folder
          'js/scripts.js'
        ],
        dest: 'js/build/production.js'
      }
    },

    // Minify your JS.
    // https://github.com/gruntjs/grunt-contrib-uglify
    uglify: {
      // DEV
      dev: {
        options: {
          mangle: false,
          compress: false,
          beautify: true
        },
        files: [{
          expand: true,
          flatten: true,
          cwd: 'js/build',
          dest: 'js/build',
          src: ['**/*.js', '!**/*.min.js'],
          rename: function(dest, src) {
            var folder = src.substring(0, src.lastIndexOf('/'));
            var filename = src.substring(src.lastIndexOf('/'), src.length);
            filename = filename.substring(0, filename.lastIndexOf('.'));
            return dest + '/' + folder + filename + '.min.js';
          }
        }]
      },
      // PROD
      dist: {
        options: {
          mangle: true,
          compress: true
        },
        files: [{
          expand: true,
          flatten: true,
          cwd: 'js/build',
          dest: 'js/build',
          src: ['**/*.js', '!**/*.min.js'],
          rename: function(dest, src) {
            var folder = src.substring(0, src.lastIndexOf('/'));
            var filename = src.substring(src.lastIndexOf('/'), src.length);
            filename = filename.substring(0, filename.lastIndexOf('.'));
            return dest + '/' + folder + filename + '.min.js';
          }
        }]
      }
    },

    // Optimize your images.
    // https://github.com/gruntjs/grunt-contrib-imagemin
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
            cwd: 'images_sources/',
            src: ['**/*.{png,jpg,gif}'],
            dest: 'images/'
          }]
        }
    },

    // Compile sass.
    // https://github.com/gruntjs/grunt-contrib-compass
    compass: {
      dist: {
        options: {
          config: 'config.rb'
        }
      }
    },

    // Un CSS
    //https://github.com/addyosmani/grunt-uncss
    uncss: {
      dist: {
        src: ['app/about.html', 'app/index.html'],
        dest: 'dist/css/tidy.css',
        options: {
          report: 'min'
          }
        }
    },

    // Watch for change.
    // https://github.com/gruntjs/grunt-contrib-watch
    watch: {
      options: {
        livereload: true
      },
      scripts: {
        files: ['js/*.js'],
        tasks: ['concat', 'uglify:dist'],
        options: {
          spawn: false
        }
      },
      css: {
        files: 'sass/*.scss',
        tasks: ['compass'],
        options: {
          livereload: true
        }
      }
    }

  });

  // Plug-in.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Tell Grunt what to do when we type "grunt" into the terminal.
  grunt.registerTask('default', ['concat', 'uglify:dist', 'imagemin', 'compass']);

  // Tell Grunt what to do when we type "grunt dev" into the terminal.
  grunt.registerTask('dev', ['concat', 'uglify:dev', 'imagemin', 'compass']);

  // Tell Grunt what to do when we type "grunt js" into the terminal.
  grunt.registerTask('js', ['concat', 'uglify']);

};
