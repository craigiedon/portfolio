module.exports = function(grunt){
    
    grunt.initConfig({
	express: {
	    options:{
	    },
	    dev: {
		options: {
		    script: './testServer.js'
		}
	    }
	},
	less: {
	    style: {
		files: {
		    "public/styles/style.css": "less/style.less"
		}
	    }
	},
	watch: {
	    express: {
		files: ['**/*.html', '**/*.less', '**/*.js'],
		tasks: ['less:style', 'express:dev'],
		options: {
		    spawn: false,
		    livereload: true
		}
	    }

	}
    });
    
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-open');

    grunt.registerTask('serve', ['express:dev','watch']);
};	    
