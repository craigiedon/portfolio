# My Personal Web Page

## Develop Loop

The functionality for this website is written in [typescript](https://typescriptlang.org). So when writing code, you should run:

    tsc -w

On the terminal to watch for updates to files, and recompile when changes are made.

To run the app locally, do

    node app.js

However, this will not update if you make changes to the functionality. You are better to run things with the [Forever](https://www.npmjs.com/package/forever) library or equivalent, so that the server restarts each time a functional change is made. This can be run via:

    forever -w app.js

## Setup for "One-Click" Git Deploy

I've added my web server as a remote alongside origin using:

    git remote add live root@www.craiginnes.com:/root/bare-repo/portfolio.git

On the server, the bare-repo is a cloned version of my website repository, cloned using:

    git clone --bare [repo-address]

The `--bare` flag means that the source code itself is not checked out, just a tracker for the current version of the code. To then actually turn this into a deployment, i put code in the `post-receive` hook of this bare repo which checks out the latest version in a `website` directory, restarts the server, and also reruns `npm install` just in case I've added any new libraries from version to version.

I now have a few remaining annoyances. For one, I still have to enter in my password every time I ssh in. This can be remedied by generating an ssh key with

    ssh-keygen

Then copying this key over to the server with a command that looks something like:

    cat ~/.ssh/id_rsa.pub | ssh username@203.0.113.0 "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"


Another minor annoyance is that i have to push twice every time now: Once to the origin repo, and once to the live web server. To push to both at once, I can just set up a new remote alias:

    git remote add all [original-repo-address]
    git remote set-url --add all [web-server-address]

## Notes for Troubleshooting

Once you have pushed changes to the server, you shouldn't have to pull them again server side. If you look in the file:

	bare-repo/portfolio.git/hook/post-receive

You should see that the repository is automatically set up to set up the latest version whenever someone pushes to the repo


However, if the changes still haven't gone through, you may have to restart the node server. The node server is controlled by UpStart (see the following tutorial for details: https://www.digitalocean.com/community/tutorials/the-upstart-event-system-what-it-is-and-how-to-use-it)

The main thrust of it is that you can see the current status of the service by running:

    service portfolioApp status

And restart it with:

    service portfolioApp restart

To change the configuration, you go to

    /etc/init/portfolioApp.conf

The error logs for this server are dumped in:

    /var/log/node.log

I've had to remove the line that allows the system to do an NPM install on restarting (it wasn't working for some reason, I don't know why...). So you may need to re-run

	npm install

In the website directory to ensure everything is set up correctly
