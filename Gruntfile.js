/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['lib/js/<%= pkg.name %>.js'],
        dest: 'js/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'js/<%= pkg.name %>.min.js'
      }
    },
    jshint: {
      options: {
        devel: true,
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: false,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          require: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js']
      }
    },
    sass: {
      dev: {
        options: {
          debugInfo: true,
          style: 'compact'
        },
        files: [{
          expand: true,
          cwd: 'lib/sass',
          src: '**/*.scss',
          dest: 'css',
          ext: '.css'
        }]
      },
      dist: {
        options: {
          style: 'compressed',
          banner: '<%= banner %>'
        },
        files: [{
          expand: true,
          cwd: 'lib/sass',
          src: '**/*.scss',
          dest: 'dist/css',
          ext: '.min.css'
        }]
      }
    },
    autoprefixer: {
      dev: {
        src: ['css/**/*.css']
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test']
      },
      js: {
        files: 'lib/js/**/*.js',
        tasks: ['concat']
      },
      sass: {
        files: '**/*.scss',
        tasks: ['sass:dev', 'autoprefixer']
      },
      html: {
        files: '**/*.html'
      },
      options: {
        livereload: true
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  // Default task.
  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);

};
