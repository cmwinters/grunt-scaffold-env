module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    assemble: {
      options: {
        flatten: false,
        assets: 'dist/assets/',
        data: ['src/data/*.json']
      },
      dist: {
        options: {
          partials: ['src/partials/*.html', 'src/partials/*.svg'],
          helpers: ['src/helpers/*.js'],
          layout: 'src/layouts/default.html'
        },
        expand: true,
        cwd: 'src/pages/',
        src: '**/*.html',
        dest: 'dist/'
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 10']
      },
      single_file: {
        expand: true,
        flatten: true,
        src: 'dist/assets/css/src/app.css',
        dest: 'dist/assets/css/'
      }
    },

    compass: {
      options: {
        importPath: ['bower_components/bootstrap-sass/assets/stylesheets']
      },
      dist: {
        options: {
          sassDir: ['src/assets/scss/'],
          cssDir: ['dist/assets/css/src'],
          environment: 'development',
          outputStyle: 'expanded'
        }
      }
    },

    copy: {
      dist: {
        files: [
          {expand:true, cwd: 'src/assets/', src: ['**/*','!{scss,js}/**/*'], dest: 'dist/assets/', filter:'isFile'},
        ]
      }
    },

    uglify: {
      dist: {
        files: {
          'dist/assets/js/all.js': ['bower_components/jquery/dist/jquery.js', 'bower_components/bootsrap-sass/javascripts/bootsrap.js', 'src/assets/js/*']
        }
      }
    },

    clean: ['dist/'],

    watch: {
      grunt: {
        files: ['Gruntfile.js'],
        tasks: ['build']
      },

      compass: {
        files: ['src/assets/scss/**/*.scss'],
        tasks: ['compass', 'autoprefixer']
      },

      copy: {
        options: {cwd: 'src/assets/'},
        files: ['**/*','!{scss,js}/**/*'],
        tasks: ['copy']
      },

      uglify: {
        options: {cwd: 'src/assets/js'},
        files: ['**/*.js'],
        tasks: ['uglify']
      },

      assemble_all: {
        files: ['src/{partials,layouts}/**/*.html','src/{partials,layouts}/**/*.svg'],
        tasks: ['assemble'],
        options: {livereload:true}
      },

      assemble_pages: {
        files: ['src/pages/**/*.html'],
        tasks: ['newer:assemble'],
        options: {livereload:true}
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-compass')
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-autoprefixer');

  grunt.registerTask('build', ['clean','compass','autoprefixer','assemble','copy']);
  grunt.registerTask('default', ['build','watch']);
};
