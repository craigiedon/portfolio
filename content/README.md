# My Personal Static Web Page

## Notes for Troubleshooting

Once you have pushed changes to the server, you will have to chase them to the server and pull again from there.

If this still doesn't make the changes go through, you may have to restart the node server. The node server is controlled by UpStart (see the following tutorial for details: https://www.digitalocean.com/community/tutorials/the-upstart-event-system-what-it-is-and-how-to-use-it)

The main thrust of it is that you can see the current status of the service by running:

    service portfolioApp status

And restart it with:

    service portfolioApp restart

To change the configuration, you want to go to /etc/init/portfolioApp.conf