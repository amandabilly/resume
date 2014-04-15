module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: [{
          expand: true,
          cwd: 'sass',
          src: ['*.scss'],
          dest: 'sass/css',
          ext: '.css'
        }]
      }
    },
    concat: {
      js: {
        src: ['js/bootstrap.js', 'js/jquery.simple-text-rotator.js', 'js/jquery.sticky-kit.js', 'js/enquire.min.js', 'js/custom.js'],
        dest: 'dist/js/main.js'
      },
      css: {
        src: ['sass/css/bootstrap.css', 'sass/css/simpletextrotator.css', 'sass/css/custom.css'],
        dest: 'dist/css/main.css'
      }
    },
    jshint: {
      all: ['js/custom.js']
    },
    autoprefixer: {
      multiple_files: {
        expand: true,
        flatten: true,
        src: 'dist/css/*.css', // -> src/css/file1.css, src/css/file2.css
        dest: 'dist/css' // -> dest/css/file1.css, dest/css/file2.css
      },
    },
    cssmin: {
      add_banner: {
        options: {
          banner: '/* My minified css file */'
        },
        files: {
          'dist/css/main.min.css': ['dist/css/main.css']
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      js: {
        src: 'dist/js/main.js',
        dest: 'dist/js/main.min.js'
      }
    },
    watch: {
      css: {
        files: ['sass/*.scss'],
        tasks: ['sass', 'concat', 'autoprefixer', 'cssmin']
      },
      scripts: {
        files: ['js/*.js'],
        tasks: ['jshint', 'concat']
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
  // Load the plugin that provides the "autoprefixer" task.
  grunt.loadNpmTasks('grunt-autoprefixer');
  // Load the plugin that provides the "cssmin" task.
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // Load the plugin that provides the "watch" task.
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['sass', 'concat', 'jshint', 'autoprefixer', 'cssmin', 'uglify', 'watch']);

};