/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
        '<%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        // Task configuration.
        connect: {
            port: 8000,
            options: {
                base: './app'
            }
        },
        watch: {
            sass: {
                files: [
                    'app/styles/**/*.scss'
                ],
                tasks: ['compass:dev']
            },
            js: {
                files: '<%= jshint.all %>',
                tasks: ['jshint']
            },
            handlebars: {
                files: [
                    'app/scripts/templates/**/*.hbs'
                ],
                tasks: ['templates']
            }
        },
        clean: {
            dist: ["dist"],
            dev: [
                "app/styles/css",
                "app/scripts/templates.js"
            ]
        },
        jshint: {
            options: {
                bitwise: true,
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                browser: true,
                globals: {
                    define: true,
                    describe: true,
                    expect: true,
                    JST: false,
                    require: true
                }
            },
            all: [
                'Gruntfile.js',
                'app/scripts/**/*.js',
                '!app/scripts/lib/**/*.js',
                '!app/scripts/templates.js',
                'test/spec/**/*.js'
            ]
        },
        jasmine: {
            custom: {
                src: [
                    'app/scripts/**/*.js',
                    '!app/scripts/lib/**/*.js'
                ],
                options: {
                    specs: 'test/spec/**/*.js',
                    host: 'http://127.0.0.1:<%= connect.port %>/',
                    template: 'test/runner.tmpl',
                    templateOptions: {
                        baseUrl: './app/scripts/',
                        config: './app/scripts/config.js',
                        requirejs: './app/scripts/lib/require.js'
                    }
                }
            }
        },
        requirejs: {
            compile: {
                options: {
                    name: 'config',
                    baseUrl: './app/scripts',
                    mainConfigFile: 'app/scripts/config.js',
                    out: 'dist/build/require.js',
                    optimize: 'none'
                }
            }
        },
        compass: {
            dist: {
                options: {
                    sassDir: 'app/styles/sass',
                    cssDir: 'dist/build/css'
                }
            },
            dev: {
                options: {
                    sassDir: 'app/styles/sass',
                    cssDir: 'app/styles/css'
                }
            }
        },
        handlebars: {
            compile: {
                options: {
                    processName: function(filename) {
                        return filename.replace('app/scripts/templates/', '');
                    },
                    wrapped: true
                },
                files: {
                    'app/scripts/templates.js': 'app/scripts/templates/**/*.hbs'
                }
            }
        },
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            handlebars: {
                src: [
                    'app/scripts/lib/handlebars.runtime.js',
                    'app/scripts/templates.js'
                ],
                dest: 'app/scripts/templates.js'
            },
            js: {
                src: [
                    'app/scripts/lib/almond.js',
                    'dist/build/require.js'
                ],
                dest: 'dist/release/scripts/lib/require.js'
            },
            css: {
                src: ['dist/build/css/main.css'],
                dest: 'dist/release/styles/css/main.css'
            }
        },
        mincss: {
            dist: {
                files: {
                    'dist/release/styles/css/main.css': [
                        'dist/build/css/main.css'
                    ]
                }
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: '<%= concat.js.dest %>',
                dest: '<%= concat.js.dest %>'
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    removeComments: true
                },
                files: {
                    'dist/release/index.html': 'app/index.html'
                }
            }
        },
        copy: {
            dist: {
                files: {
                    'dist/release/images/': 'app/images/**',
                    'dist/release/favicon.ico': 'app/favicon.ico',
                    'dist/release/scripts/lib/modernizr.js': 'app/scripts/lib/modernizr.js'
                }
            }
        }
    });

    // Load npm tasks.
    grunt.util._.each([
        'contrib-clean',
        'contrib-compass',
        'contrib-concat',
        'contrib-connect',
        'contrib-copy',
        'contrib-handlebars',
        'contrib-htmlmin',
        'contrib-jasmine',
        'contrib-jshint',
        'contrib-mincss',
        'contrib-requirejs',
        'contrib-uglify',
        'contrib-watch'
    ], function (tasks) {
        grunt.loadNpmTasks('grunt-' + tasks);
    });

    // Register local tasks.
    grunt.registerTask('templates', [
        'handlebars:compile',
        'concat:handlebars'
    ]);

    grunt.registerTask('test', ['templates', 'connect', 'jasmine']);

    grunt.registerTask('build', [
        'clean',
        'jshint',
        'test',
        'compass:dist',
        'requirejs'
    ]);

    grunt.registerTask('release', [
        'build',
        'concat',
        'mincss',
        'uglify',
        'htmlmin',
        'copy'
    ]);

    grunt.registerTask('serve', [
        'templates',
        'compass:dev',
        'connect',
        'watch'
    ]);

};
