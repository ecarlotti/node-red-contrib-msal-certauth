module.exports = function(RED) {
	'use strict';
	const msal = require("@azure/msal-node");
	const fs = require("fs");
    function msalAuthenticate(config) {


		
		RED.nodes.createNode(this,config);
		
		this.clientId = config.clientId;
		this.scope= config.scope;
		this.tenantId= config.tenantId;
		this.thumbprint= config.thumbprint;
		this.privateKeyLocation= config.privateKeyLocation;
	
		var node = this;		
      
        node.on('input', function(msg) {

		

		var msal_clientId =  msg.clientId || this.clientId ;
		var msal_scope = msg.scope || this.scope ;
		var msal_tenantId = msg.tenantId || this.tenantId ;
		var msal_thumbprint = msg.thumbprint || this.thumbprint ;
		var msal_privateKeyLocation =  this.privateKeyLocation ;
		var msal_privateKey;
		if (msg.hasOwnProperty("privateKey")){
			msal_privateKey = msg.privateKey;
		}
		else {
		 msal_privateKey =  fs.readFileSync(msal_privateKeyLocation).toString();
		}

		const tokenRequest = {
				scopes: [ msal_scope + "/.default"],
		};

	
	   
		const cca = new msal.ConfidentialClientApplication({
				auth: {
				  clientId: msal_clientId, 
				  authority:	"https://login.microsoftonline.com/" + msal_tenantId,
				  clientCertificate: {
					// To get the tumbprint run "openssl x509 -in cert.pem -noout -fingerprint"
					thumbprint: msal_thumbprint.replace(
						/\:/g,
						""
					  ),
					privateKey: msal_privateKey
				  },
				},
			  });



	
		 cca.acquireTokenByClientCredential(tokenRequest).then((response) => { 
	
			msg.msalToken =  response.accessToken;
			msg.tokenType = response.tokenType;	
			node.send(msg);
		  })
		  .catch((error) => {
			msg.tokenType = "";	
			node.send(msg);      
		  });

           
        });
    }


	
	
	
    RED.nodes.registerType("msalcertauth",msalAuthenticate);
}