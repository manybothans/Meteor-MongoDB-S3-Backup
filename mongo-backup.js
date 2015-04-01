var npmS3Backup = Npm.require("mongodump-s3").Dump;
var S3Dump;
var util = Npm.require('util');
var cronJob = Npm.require('cron').CronJob;
var job;
var timezone = "America/Vancouver";
var crontab = "0 0 1 * * *";

MongoBackup = {
    settings: {},
    backupNow: function() {
        console.log('MongoDB S3 Backup Started...')
        S3Dump.exec().then(function(config) {
            console.log('...MongoDB S3 Backup Complete', this.settings.basename)
        });
    },
    startCron: function() {
        if (this.settings.cron) {
            if (this.settings.cron.crontab) {
                crontab = this.settings.cron.crontab
            }
            if (this.settings.cron.timezone) {
                timezone = this.settings.cron.timezone;
            }
        }

        job = new cronJob(crontab, function() {
            console.log('MongoDB S3 Backup Started...')
            S3Dump.exec().then(function(config) {
                console.log('...MongoDB S3 Backup Complete', this.settings.basename)
            });
        }, null, true, timezone);
        npmS3Backup.log('MongoDB S3 Backup Successfully scheduled (' + crontab + ')');
    },
    config: function(settings) {
        this.settings = _.extend(this.settings, settings);

        if (!this.settings.aws || !this.settings.aws.key || !this.settings.aws.secret || !this.settings.aws.bucket)
            throw new Meteor.Error(400, 'You must provide Amazon S3 credentials (key, secret, region, and bucket).');

        if (!this.settings.mongodb) {
            this.settings.mongodb = process.env.MONGO_URL;
        }
        if (!this.settings.basename) {
            this.settings.basename = "mongodump";
        }

        S3Dump = new npmS3Backup(this.settings.mongodb, this.settings.aws.bucket);
    }
}