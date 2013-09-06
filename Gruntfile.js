module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                files: {
                    'dest/<%= pkg.name %>.min.js': [
                        'js/modernizr-2.6.2.min.js',
                        'js/polyfill.js',
                        'js/bootstrap.js',
                        'js/util.js',
                        'js/font.js',
                        'js/sky.js',
                        'js/orbit.js',
                        'js/main.js'
                    ]
                }
            }
        },

        cssmin: {
            combine: {
                files: {
                    'dest/<%= pkg.name %>.min.css': [
                        'css/normalize.css',
                        'css/main.css'
                    ]
                }
            }
        },

        watch: {
            scripts: {
                files: ['js/*.js'],
                tasks: ['uglify']
            },
            css: {
                files: ['css/*.css'],
                tasks: ['cssmin']
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'cssmin']);
    grunt.registerTask('dev', ['uglify', 'cssmin', 'watch']);

};