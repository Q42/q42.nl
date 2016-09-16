# Q42.nl & Q42.com [![Link](https://img.shields.io/website-up-down-green-red/https/www.q42.com.svg?maxAge=2592000)](https://www.q42.com) ![](https://img.shields.io/badge/nerds-happy-brightgreen.svg)

We've published the source code to [q42.nl](https://q42.nl) and
[q42.com](https://q42.com) here for your perusal.

If you find anything on our site that you feel needs fixing, be it code,
spelling or anything else, don't hesitate to send us a pull request or create
an issue. We maintain the site ourselves with the same workflow.

The site is built with [Meteor](http://meteor.com).

## Configure your editor

Make sure your editor has support for .editorconfig, and .jshintrc.

## Add settings you need

Create a `config/dev/settings.json` file containing the correct
Kadira account information:

```
{
	"public": {
		"siteVersion": "nl", // or "en" to develop the .com site
	},
	"private": {
		"MONGO_URL": "...",
		"MONGO_OPLOG_URL": "..."
	},
	"kadira": {
		"appId": "...",
		"appSecret": "..."
	}
}
```

If you misconfigure Kadira, you'll just get console errors. You can get a hold
of the keys in the "q42.nl" vault in 1Password.

(if you use the config file as above, without actual values, the site will still
	run, but with warnings/errors).

## Running the site locally

First install any NPM packages you need:

	meteor npm install

Then run the app:

	./run.sh

# Deploying to Galaxy

You need the following prerequisites:

 - `config/q42.nl/settings.json` and `config/q42.com/settings.json` based on the
   above template. In the '.com' version, be sure to set siteVersion to 'en'.
	 Make sure _all_ fields are configured. Since Meteor 1.4, the MONGO_OPLOG_URL
	 also needs a ?replicaSet querystring parameter.
 - Git Flow, which you can get here:
	 https://github.com/nvie/gitflow/wiki/Installation -- note you'll need to
	 `git flow init` while on the `develop` branch, as the git flow state isn't
	 checked in to the repository. At init time, choose 'master' for production
	 releases and 'develop' for next release (the defaults). Choose the defaults
	 for all others too (feature/, release/, hotfix/, support/, empty).
 - `gcloud` command line tool, from https://cloud.google.com/sdk/. Install,
 	 then authenticate using `gcloud auth login`.
 - Access to the static.q42.nl GCS bucket via
   https://console.developers.google.com/project/504623166341/storage/browser.
   Ask Rahul or Lukas.

Since you need to deploy to two separate sites (q42.nl and q42.com), there's a
script which will take care of both commands. Just run:

	./deploy-galaxy.sh

# Contributing

Content for the site is located in the /views folder as regular .html files, so
if you want to edit some content, just navigate to that file and edit it! A
really fast way to clean up spelling mistakes and similar small problems is to
just load the repository on Github and use its built-in editor to edit files.
Github will automatically fork the project for you and submit a pull request.

# License?

There is no license. This is the code for our website, copyright Q42. You can
browse the source and learn from our mishaps,
but please don't re-use the code elsewhere or redistribute it.
