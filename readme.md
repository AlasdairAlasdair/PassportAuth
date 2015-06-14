Playing around with express passport auth.

To run:
Setup a MongoLabs account.
Set environment variables:
SUPER_SECRET_EXPRESS_SECRET=<random string>
MONGO_LABS_CONNECTION=<mongo connection string> 
(something like mongodb://<mongodb_dbusername>:<mongodb_dbpassword>@ds12345.mongolab.com:67890/<db name>)

Then run 
$ npm install
$ node app.js