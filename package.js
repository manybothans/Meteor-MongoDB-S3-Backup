Package.describe({
    name: "jplatimer:mongo-backup",
	summary: "Backup MongoDB to Amazon S3 on a Schedule.",
	git: "https://github.com/manybothans/Meteor-MongoDB-S3-Backup.git",
    version: "0.0.1",
});

/* This defines your actual package */
Package.onUse(function (api) {
	// If no version is specified for an 'api.use' dependency, use the
	// one defined in Meteor 0.9.0.
	api.versionsFrom('METEOR@0.9.0');

	api.addFiles("mongo-backup.js", "server");
    api.export && api.export("MongoBackup", "server");
});


Npm.depends({
	time: "0.11.0",
	cron: "1.0.4",
	mongodb_s3_backup: "0.0.6"
});
