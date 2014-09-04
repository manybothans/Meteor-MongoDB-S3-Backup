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

``` javascript
Meteor.startup(function() {
	MongoBackup.config({
		// mongodb data is optional; if not provided,
		// information from process.env.MONGO_URL is used
		mongodb: {
			host: "localhost",
			port: 3001,
			username: false,
			password: false,
			db: "meteor"
		},
		s3: {
			key: "your_s3_key",
			secret: "your_s3_secret",
			bucket: "s3_bucket_to_upload_to",
			destination: "/upload-directory" // optional; defaults to "/"
		},
		cron: {
			time: "11:59",
			timezone: "America/Vancouver" // optional; defaults to "America/Vancouver"
		}
	});
});
```

#### Crontabs

You may optionally substitute the cron "time" field with an explicit "crontab" of the standard format `0 0 * * *`.

``` javascript
cron: {
	crontab: "0 0 * * *"
}
```

*Note*: The version of cron that we run supports a sixth digit (which is in seconds) if
you need it.

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

This package uses the awesome node-mongodb-s3-backup NodeJS module created by @theycallmeswift, available here:

https://github.com/theycallmeswift/node-mongodb-s3-backup