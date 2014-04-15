module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: ['js/*.js'],
        dest: 'dist/js/main.js'
      }
    },
    jshint: {
      beforeconcat: ['js/*.js'],
      afterconcat: ['dist/js/*.js']
    },
    sass: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          style: 'expanded'
        },
        files: [{
          expand: true,
          cwd: 'sass',
          src: ['*.scss'],
          dest: 'dist/css',
          ext: '.css'
        }]
      }
    },
    csslint: {
      strict: {
        options: {
          import: 2
        },
        src: ['sass/*.css']
      },
      lax: {
        options: {
          import: false
        },
        src: ['sass/*.css']
      }
    },
    autoprefixer: {
      multiple_files: {
        expand: true,
        flatten: true,
        src: 'sass/*.css', // -> src/css/file1.css, src/css/file2.css
        dest: 'dist/css/' // -> dest/css/file1.css, dest/css/file2.css
      },
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'js/<%= pkg.name %>.js',
        dest: 'dist/js/<%= pkg.name %>.min.js'
      }
    },
    watch: {
      css: {
        files: ['sass/*.scss'],
        tasks: ['sass', 'csslint', 'autoprefixer']
      },
      scripts: {
        files: ['js/*.js'],
        tasks: ['jshint']
      },
      disembiggen: {
        files: ['dist/*/*.js', 'dist/*/*.css'],
        tasks: ['uglify', 'watch']
      }
    },
  });

  // Load the plugin that provides the "concat" task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  // Load the plugin that provides the "jshint" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  // Load the plugin that provides the "sass" task.
  grunt.loadNpmTasks('grunt-contrib-sass');
  // Load the plugin that provides the "csslint" task.
  grunt.loadNpmTasks('grunt-contrib-csslint');
  // Load the plugin that provides the "autoprefixer" task.
  grunt.loadNpmTasks('grunt-autoprefixer');
  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // Load the plugin that provides the "watch" task.
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['concat', 'jshint', 'sass', 'csslint', 'autoprefixer', 'uglify', 'watch']);

};