var should = require("should");
const rl = require('readline');
var path = require('path')
var fs = require('fs')
var assert = require('assert')
var argv = require('optimist').demand('config').argv
var configFilePath = argv.config
assert.ok(fs.existsSync(configFilePath), 'config file not found at path: ' + configFilePath)
var config = require('nconf').env().argv().file({file: configFilePath})
var credentials = config.get('credentials')

var clientId = credentials.clientId;
var thumbprint = credentials.thumbprint;
var tenantId = credentials.tenantId;
var scope = credentials.scope;
var privateKeyLocation = credentials.privateKeyLocation;


var helper = require("node-red-node-test-helper");
var msalcertauthNode = require("../msal-certauth.js");

const settings = {
  functionGlobalContext: {
    osModule: require("os")
  }
};


helper.init(require.resolve('node-red'));


// mocking an environment


describe('msal-certauth Node-Tests', function () {
 
  before(function(done) {
   
    helper.startServer(done);
  });

  afterEach(function() {
    helper.unload();
  });

  after(function(done) {
    helper.stopServer(done);
  });

  it('should be loaded', function (done) {
   
    var flow = [{ id: "n1", type: "msal-certauth", name: "msal-certauth" }];
    helper.load(msalcertauthNode, flow, function () {
      var n1 = helper.getNode("n1");
      try {
    //    n1.should.have.property('clientId', "");
     /*   n1.should.have.property('tenantId', 'msal-certauth');
        n1.should.have.property('scope', 'msal-certauth');
        n1.should.have.property('thumbprint', 'msal-certauth');
        n1.should.have.property('privateKey', 'msal-certauth');*/
        done();
      } catch(err) {
        done(err);
      }
    });
  });

  it('should get an JWT from Azure', function (done) {
    var flow = [
      { id: "n1", type: "msal-certauth", name: "msal-certauth",wires:[["n2"]] },
      { id: "n2", type: "helper" }
    ];
    helper.load(msalcertauthNode, flow, settings, function () {
      var n2 = helper.getNode("n2");
      var n1 = helper.getNode("n1");
      n1.trace.should.be.calledWithExactly('badness');
      
      n1.on("input", function(msg) {
        console.log(msg);
        
      });    

      n2.on("input", function (msg) {
       
        console.log('Test message received N1: ' + JSON.stringify(msg));
        try {
         
         msg.should.have.property('tokenType', 'Bearer');
  
          done();
        } catch(err) {
         done( err);
        }
      });
 
    //  done();
    n1.receive({ 

            'clientId': clientId,
            'tenantId': tenantId,
            'scope': scope,
            'thumbprint': thumbprint,
            'privateKeyLocation': privateKeyLocation    
    });
    });
  });
});