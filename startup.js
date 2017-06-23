/*

	abc.json contains admin keys.
	It must be located in root/node_modules/here	

*/
console.log("Script start");
var res;

var util=require("util");
var admin = require("firebase-admin");
var serviceAccount = require("abc.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://toll-7844a.firebaseio.com"
});

db=admin.database();

try
{
	db.ref("sid_acer_ubuntu/").once('value').then(function(snapshot){
		id=1+snapshot.val().login_count;
		try
		{
			var date=new Date();
			newDat={
				login_count:id
			};
			newDat["entry"+id]={
				date:date.toString(),
				time:date.toTimeString()
			};
			db.ref("sid_acer_ubuntu/").update(newDat).then(function(){
				process.exit();
			},function(){
				process.exit();
			});
		}
		catch(e)
		{
			util.inspect(e);
		}
	});
}
catch(e)
{
	console.log("error in receiving\n");
}