# Q42.nl runs on Meteor!

We've published the source code to q42.nl here for your perusal.

If you find anything on our site that you feel needs fixing, be it code, spelling or anything else,
don't hesitate to send us a pull request or create an issue. We maintain the site ourselves with the same workflow.

# Getting the damn thing to run
Sounds like it'll be a royal pain in the butt ey? Guess again amigo.

### Fork and checkout this project 
The hard bit since the repo is around ~100MB

	git clone https://github.com/[YOURUSERNAME]/q42.nl.git

### Install meteor

	curl https://install.meteor.com | /bin/sh
	
### But I have Windows

That's okay! Just follow [the instructions for the Windows port](http://win.meteor.com).

### cd into checkout and run meteor

	cd q42.nl
	meteor

# Contributing

Content for the site is located in the /views/page folder as regular .html files, so if you want to edit some content, just
navigate to that file and edit it! A really fast way to clean up spelling mistakes and similar small problems is to just
load the repository on Github and use its built-in editor to edit files. Github will automatically fork the project for you
and submit a pull request. Yay!

# License

There is no license. This is the code for our website, copyright Q42. You can browse the source and learn from our mishaps,
but please don't re-use the code elsewhere or redistribute it.
