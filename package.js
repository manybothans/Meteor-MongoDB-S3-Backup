Package.describe({
    name: "jplatimer:mongo-backup",
	summary: "Backup MongoDB to Amazon S3 on a Schedule.",
	git: "https://github.com/manybothans/Meteor-MongoDB-S3-Backup.git",
    version: "0.1.0",
});

/* This defines your actual package */
Package.onUse(function (api) {
	// If no version is specified for an 'api.use' dependency, use the
	// one defined in Meteor 0.9.0.
	api.versionsFrom('METEOR@1.0');

	api.addFiles("mongo-backup.js", "server");
    api.export && api.export("MongoBackup", "server");
});


Npm.depends({
	"time": "0.11.0",
	"cron": "1.0.x",
    "promised-io": "0.3.x",
    "aws-sdk": "1.3.x",
	"mongodump-s3": "0.1.1"
});
