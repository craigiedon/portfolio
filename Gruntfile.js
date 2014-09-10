module.exports = function(grunt){
    
    grunt.initConfig({
	sshconfig: {
	    portfolioServer: {
		host: 'craiginnes.com',
		username: 'root',
		agent: process.env.SSH_AUTH_SOCK,
	    }
	},

	sshexec:{
	    deploy:{
		command: [
		    'cd portfolio',
		    'git pull'
		].join(' && ')
	    },
	    options:{
		config: 'portfolioServer'
	    }
	},
	
	express: {
	    options:{
	    },
	    dev: {
		options: {
		    script: './app.js'
		}
	    }
	},
	
	less: {
	    style: {
		files: {
		    "styles/style.css": "less/style.less"
		}
	    }
	},
	watch: {
	    express: {
		files: ['**/*.less', '**/*.js'],
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
    grunt.loadNpmTasks('grunt-ssh');

    grunt.registerTask('look', ['watch']);
    grunt.registerTask('server', ['express', 'watch']);
    grunt.registerTask('deploy', ['sshexec:deploy']);
    
};	    
