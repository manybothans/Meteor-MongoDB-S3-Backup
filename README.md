# Meteor MongoDB Backup To Amazon S3

Easily backup your MongoDB database to Amazon AWS S3. Run scheduled backups with a cron job, or backup on demand as needed.

## NOTE

This package does NOT currently work on deployments to *.meteor.com becuase it uses NPM modules that contain binary files. I am working on a solution.

## Installation

``` sh
meteor add jplatimer:mongo-backup
```

## Configuration

###On The Server

Add your MongoDB and Amazon credentials to the package. Do this in server-only code (not just an 'isServer' block) to keep your key secret. If you do not provide MongoDB information, the package will use information from the `MONGO_URL` environment variable.

*Note*: This package will likely not work with mongo data from apps hosted on meteor.com.

``` javascript
Meteor.startup(function() {
	MongoBackup.config({
			"aws": {
		  		"region": "<your-s3-region>",
		        "bucket": "<your-bucket>",
		        "accessKeyId": "<your-access-key>",
		        "secretAccessKey": "<your-secret-key>"
			},
			// mongodb data is optional; if not provided,
			// information from process.env.MONGO_URL is used
			"mongodb": "mongodb://<username>:<password>@<host>:<port>/<db-name>",
			// default
			"basename": "mongodump",
			//default
			"cron": {
				"crontab": "0 0 1 * * *",
				"timezone": "America/Vancouver"
			}
		}
	});
});
```

## Running

After configuring, to start a long-running process with scheduled cron job:

``` javascript
MongoBackup.startCron();
```

Or, also after configuring, to execute a single backup immediately:

``` javascript
MongoBackup.backupNow();
```

## Disclaimer

I made this package for my own purposes and decided to share it. It is provided "AS IS." I take no resposibility for any lost data or other problems resulting from using this package. It's your resonsibility to make sure it's working on your deployment!!

## Credits

This package uses the awesome mongodump-s3 NodeJS module created by @SamDuvall, available here:

https://github.com/SamDuvall/mongodump-s3