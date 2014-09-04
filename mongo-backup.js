var npmS3Backup = Npm.require("mongodb_s3_backup");
var util = Npm.require('util')
var cronJob = Npm.require('cron').CronJob
var crontab = "0 0 * * *"
var timezone = "America/Vancouver"
var time = [0, 0]

MongoBackup = {
    settings: {},
    backupNow: function() {
        npmS3Backup.sync(this.settings.mongodb, this.settings.s3, function(err) {
            if(err)
            	npmS3Backup.log(err, "error");
        });
    },
    startCron: function() {
        if (this.settings.cron) {
            if (this.settings.cron.crontab) {
                crontab = this.settings.cron.crontab
            } else if (this.settings.cron.time) {
                time = this.settings.cron.time.split(':')
                crontab = util.format('%d %d * * *', time[0], time[1]);
            }

            if (this.settings.cron.timezone) {
                timezone = this.settings.cron.timezone;
            }
        }

        new cronJob(crontab, function() {
            npmS3Backup.sync(this.settings.mongodb, this.settings.s3);
        }, null, true, timezone);
        npmS3Backup.log('MongoDB S3 Backup Successfully scheduled (' + crontab + ')');
    },
    config: function(settings) {
        this.settings = _.extend(this.settings, settings);

  		if(!this.settings.s3 || !this.settings.s3.key || !this.settings.s3.secret || !this.settings.s3.bucket)
  			throw new Meteor.Error(400, 'You must provide Amazon S3 credentials (key, secret, and bucket).');
  		if(!this.settings.s3.destination)
  			this.settings.s3.destination = '/';
  		if(!this.settings.mongodb)
  		{
  			this.settings.mongodb = {
			    host: "127.0.0.1",
			    port: 3001,
			    username: false,
			    password: false,
			    db: "meteor"
			};
  			var mongoPath = process.env.MONGO_URL.replace("mongodb://", "");
  			var hostPortDb = "127.0.0.1:3001/meteor";
  			var portDb = "3001/meteor";

  			var splitArray = mongoPath.split("@");
  			if(splitArray.length == 1)
  			{
  				hostPortDb = splitArray[0];
  			}
  			else if(splitArray.length == 2)
  			{
  				var userPass = splitArray[0];
  				hostPortDb = splitArray[1];

  				splitArray = userPass.split(":");
  				if(splitArray.length == 2)
  				{
	  				this.settings.mongodb.username = splitArray[0];
	  				this.settings.mongodb.password = splitArray[1];
  				}
  			}
  			
  			splitArray = hostPortDb.split(":");
  			if(splitArray.length == 2)
  			{
  				this.settings.mongodb.host = splitArray[0];
  				portDb = splitArray[1];
  			}
  			
  			splitArray = portDb.split("/");
  			if(splitArray.length == 2)
  			{
  				this.settings.mongodb.port = splitArray[0];
  				this.settings.mongodb.db = splitArray[1];
  			}
  		}
    }
}