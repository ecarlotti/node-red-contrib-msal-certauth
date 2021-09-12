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

This node is using `Redirect Method` of msal  
Enter:

- `Scopes` :  e.g. **user.read**  or **<https://management.azure.com/.default>**...
- `Init URL` : Url that will lead to Azure Login: **/login2azure**  
- `Local Redirect URL` : RedirectUrl that will listen on Azure Login Response: **/redirect**  
**Note: On Azure Portal you have to add the complete REDIRECT URL !!!  
Running NR on `http://localhost:1880` then you have to add `http://localhost:1880/redirect` for your app in Azure Portal !  
This node will patch up the complete REDIRECT URL on its own and pass it to msal!**  

Node can receive `msg.update = true` object to do a silent renewal of token.  
Node will send msal processed response object. The included accessToken can be use to trigger http node to do REST call on Azure API  

## Config Node

- Application (client) ID  
- Application (client) Secret
- Authority (`https://login.microsoftonline.com/<tenantId>` or `https://login.microsoftonline.com/common` ...)

---
