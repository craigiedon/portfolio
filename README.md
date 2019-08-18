# My Personal Static Web Page

## Develop Loop

The functionality for this website is written in [typescript](https://typescriptlang.org). So when writing code, you should run:

    tsc -w

On the terminal to watch for updates to files, and recompile when changes are made.

To run the app locally, do

    node app.js

However, this will not update if you make changes to the functionality. You are better to run things with the [Forever](https://www.npmjs.com/package/forever) library or equivalent, so that the server restarts each time a functional change is made. This can be run via:

    forever -w app.js

## Notes for Troubleshooting

Once you have pushed changes to the server, you will have to chase them to the server and pull again from there.

If this still doesn't make the changes go through, you may have to restart the node server. The node server is controlled by UpStart (see the following tutorial for details: https://www.digitalocean.com/community/tutorials/the-upstart-event-system-what-it-is-and-how-to-use-it)

The main thrust of it is that you can see the current status of the service by running:

    service portfolioApp status

And restart it with:

    service portfolioApp restart

To change the configuration, you go to `/etc/init/portfolioApp.conf`
