module.exports = function (grunt) {

	grunt.initConfig({
		compress: {
			release: {
				options: {
					archive: "www.zip"
				},
				files: [
					{src: ["dist/**"]}
				]
			},
			web: {
				options: {
					archive: "www.zip"
				},
				files: [
					{ src: ["dist/**"] }
				]
			}
		},
		copy: {
			phonegap:{
				files: [
					{ expand: true, cwd: "src/", src: "assets/**", dest: "dist/" },
					{ expand: true, cwd: "src/", src: "examples/**", dest: "dist/" },
					{ expand: true, cwd: "src/", src: "lib/bootstrap/**", dest: "dist/" },
					{ expand: true, cwd: "src/", src: "lib/met/fonts/**", dest: "dist/" },
					{ expand: true, cwd: "src/", src: "lib/met/images/**", dest: "dist/" },
					{ expand: true, cwd: "src/", src: "lib/jquery.min.js", dest: "dist/" },
					{ expand: true, cwd: "src/", src: "res/**", dest: "dist/" },
					{ expand: true, cwd: "src/", src: "config.xml", dest: "dist/" },
					{ expand: true, cwd: "src/", src: "icon.png", dest: "dist/" },
					{ expand: true, cwd: "src/", src: "splash.png", dest: "dist/" },
					{ expand: true, cwd: "src/", src: "index.html", dest: "dist/" }
				]
			},
			web: {
				files: [
					{ expand: true, cwd: "src/", src: "assets/**", dest: "dist/" },
					{ expand: true, cwd: "src/", src: "lib/bootstrap/**", dest: "dist/" },
					{ expand: true, cwd: "src/", src: "lib/font-awesome-4.4.0/**", dest: "dist/" },
					{ expand: true, cwd: "src/", src: "lib/met/fonts/**", dest: "dist/" },
					{ expand: true, cwd: "src/", src: "lib/met/images/**", dest: "dist/" },
					{ expand: true, cwd: "src/", src: "lib/jquery.min.js", dest: "dist/" },
					{ expand: true, cwd: "src/", src: "lib/flu_points.json", dest: "dist/" },
					{ expand: true, cwd: "src/", src: "lib/heat.js", dest: "dist/" },
					{ expand: true, cwd: "src/", src: "lib/imgs/tims.png", dest: "dist/" },
					{ expand: true, cwd: "src/", src: "lib/imgs/petro.png", dest: "dist/" },
					{ expand: true, cwd: "src/", src: "index.html", dest: "dist/" },
					{ expand: true, cwd: "src/", src: "map.html", dest: "dist/" },
					{ expand: true, cwd: "src/", src: "survey.html", dest: "dist/" },
					{ expand: true, cwd: "src/", src: "index-fr.html", dest: "dist/" },
					{ expand: true, cwd: "src/", src: "about-en.html", dest: "dist/" },
					{ expand: true, cwd: "src/", src: "terms-en.html", dest: "dist/" },
					{ expand: true, cwd: "src/", src: "settings.html", dest: "dist/" },
					//{ expand: true, cwd: "src/", src: "vacsites.html", dest: "dist/" },
					//{ expand: true, cwd: "src/", src: "stats.html", dest: "dist/" },
					{ expand: true, cwd: "src/", src: "notices.html", dest: "dist/" },
					{ expand: true, cwd: "src/", src: "fluinfo.html", dest: "dist/" }
				]
			}
		},
		csslint: {
			default: {
				options: {
					quiet: true
				},
				src: [
					"dist/lib/met/css/met.css"
				]
			}
		},
		cssmin: {
			target: {
				files: [
					{ expand:true, cwd: "src/lib/met/css", src: "*.css", dest: "dist/lib/met/css", ext: ".min.css" }
				]
			}
		},
		"github-release": {
			phonegap: {
				options: {
					repository: 'hc-sc/met',
					auth: {
						user: grunt.option("GITHUB_USER"),
						password: grunt.option("GITHUB_PASSWD")
					},
					release: {
						tag_name: 'pg-build-<%= pkg.version %>',
						name: 'met-pg',
						body: 'Mobile Experience Toolkit phonegap build',
						prerelease: true
					}
				},
				files: {
					'dest': ['www.zip']
				}
			},
			web: {
				options: {
					repository: 'hc-sc/met',
				auth: {
						user: grunt.option("GITHUB_USER"),
						password:grunt.option("GITHUB_PASSWD")
					},
					release: {
						tag_name: 'web-build-<%= pkg.version %>',
						name: 'met-web',
						body: 'Mobile Experience Toolkit web build',
						prerelease: true
					}
				},
				files: {
					'dest': ['www.zip']
				}
			}
		},
		htmllint: {
			default: {
				options: {
					ignore: [
						"Bad value \"button\" for attribute \"type\" on element \"a\": Subtype missing."
					]
				},
				src: [
					"src/*.html",
					"src/examples/*.html"
				]
			}
		},
		jshint: {
			assets: ["assets/**/*.js"],
			met: ["src/lib/met/js/*.js"]
		},
		less: {
			default: {
				options: { },
				files: {
					"dist/lib/met/css/met.css": "src/lib/met/less/met.less"
				}
			}
		},
		lesslint: {
			default: {
				options: {
					csslint: {
						"quiet": true
					}
				},
				src: [
					'src/lib/met/less/*.less'
				]
			}
		},
		"phonegap-build": {
			release: {
				options: {
					"archive": "www.zip",
					"appId": "1553732",
					"user": {
						"token": grunt.option("PGB_TOKEN")
					}
				}
			}
		},
		pkg: grunt.file.readJSON('package.json'),
		sftp: {
			dev: {
				files: {
					"./" : "dist/**"
				},
				options: {
					path: "/wwwroot/met",
					host: grunt.option("DEV_SERVER_ADDRESS"),
					username: grunt.option("DEV_SERVER_USER"),
					password: grunt.option("DEV_SERVER_PW"),
					showProgress: true,
					createDirectories: true,
					srcBasePath: "dist/"
				}
			}
		},
		sshexec:{
			delete_dir:{
				command: ["cd ../..; ls; rm -r wwwroot/met"],
				options: {
					host: grunt.option("DEV_SERVER_ADDRESS"),
					username: grunt.option("DEV_SERVER_USER"),
					password: grunt.option("DEV_SERVER_PW")
				}
			}
		},
		uglify: {
			web:{
				options: {
					banner: "/*! <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today(\"yyyy-mm-dd\") %> */\n",
					beautify: true,
					compress: false,
					mangle: false
				},
				files: {
					'dist/lib/met/js/met.js': ["src/lib/met/js/met.js"]
				}
			},
			phonegap:{
				options: {
					banner: "/*! <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today(\"yyyy-mm-dd\") %> */\n",
					compress: {
						drop_console: true
					},
					mangle: false
				},
				files: [
					{ 'dist/lib/met/js/met.js': ["src/lib/met/js/met.js"] }
				]
			}
		}
	});

	// Load tasks.
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-github-releaser');
	grunt.loadNpmTasks('grunt-html');
	grunt.loadNpmTasks('grunt-lesslint');
	grunt.loadNpmTasks('grunt-phonegap-build');
	grunt.loadNpmTasks('grunt-ssh');

	grunt.registerTask('delete-dist', 'Delete dist folder', function () {
		grunt.file.delete('dist/');
	});

	grunt.registerTask('dummy-phonegap', 'Create a dummy phonegap file', function () {
		grunt.file.write('dist/phonegap.js', '// Dummy Phonegap File'); //Create dummy phonegap.js file for web testing
	});

	grunt.registerTask('locales', 'Creating locales directories.', function () {
		grunt.file.write('dist/locales/en/local.strings', '"DummyKey" = "DummyValue";');
		grunt.file.write('dist/locales/en-ca/local.strings', '"DummyKey" = "DummyValue";');
		grunt.file.write('dist/locales/fr/local.strings', '"DummyKey" = "DummyValue";');
		grunt.file.write('dist/locales/fr-ca/local.strings', '"DummyKey" = "DummyValue";');
	});

	grunt.registerTask('css', "Generate css files", function () {
		grunt.file.delete('dist/lib/met/css/met.css');
		grunt.task.run('less');
	});

	grunt.registerTask('phonegap', 'Create the dist folder for phonegap build', function () {
		grunt.task.run('delete-dist');
		grunt.task.run('copy:phonegap');
		grunt.task.run('locales');
		grunt.task.run('uglify:phonegap');
		grunt.task.run('less');
	});

	grunt.registerTask('web', 'Create the dist folder for website testing', function () {
		grunt.task.run('delete-dist');
		grunt.task.run('copy:web');
		grunt.task.run('dummy-phonegap');
		grunt.task.run('uglify:web');
		grunt.task.run('less');
	});

	//Default Task
	grunt.registerTask('default', 'local build', function () {
		grunt.task.run('web');
	});
};
