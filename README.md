# node-red-contrib-msalcertauth

[Node RED](https://nodered.org) node to authenticate using MSAL using a Certificate file.  

Mainly based on Azure docs and [samples](https://github.com/Azure-Samples/ms-identity-node/)  

## Installation via the Web-Interface

1. Open the menu in the upper right corner  
2. Choose **Manage Palette**  
3. Under **Install**, search for: *node-red-contrib-msalcertauth*  

## Installation via the command line

1. Navigate to your Node RED user directory, usally `$HOME/.node-red`  
2. Run the following command:  

```shell
npm install node-red-contrib-msalcertauth
```

---

## Prerequisites

Already registered App on Azure Portal.

## Usage

This node is using `Certificate Method` of msal  
Enter:

- `Client ID` :  either as **msg.clientId**  or via config, e.g. **"12345678-1abc-xxxx-8906-000"** 
- `Tenant ID` :  either as **msg.tenantId**  or via config, e.g. **"34509348-0000-zzzz-8906-000"** 
- `Scope` : either as **msg.scope**  or via config, e.g. **"api://sdfs6335-s463-0000-...."** 
- `Thumbprint` :  either as **msg.thumbprint**  or via config, e.g. **"00:1A:F6:39:CD:82:F0:...."** 
- `PrivateKey` :  either as **msg.privateKey**  or via config by setting the relativ path to the *.pem File
 
     


Node can receive `msg.clientId, msg.tenantId, msg.scope, msg.thumbprint, msg.privateKey` object.  

Node will send msal JWT as response object. The included accessToken can be use to trigger http node to do REST call on Azure API. Example:

`msg.msalToken: "eyJ0eXAiOiJKV1QiLCJhbGxx...."`

## Unit-Testing /Test JWT 

- Install node via `npm i node-red-contrib-msalcertauth`
- Rename /test/config_sample.json to config.json and set the proper clientId, tenantId etc. 
- Run `npm test`
- Respone should be a JWT.