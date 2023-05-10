const express = require("express")
const { google } = require("googleapis")
const app = express()
let PORT = process.env.PORT || 80;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const requestpromise = require("request-promise");
const handler = require('serve-handler');

app.get("/", async (req, res) => {
  res.send("<html> <head> <h1>please now work I want to sleep <br> Welcome to my node js server GitHub is The Best dude<br> </h1></head><body><h1> This page was render direcly from the server <p>Hello there welcome to my website 2023</p></h1></body></html>");
});

app.get("/files*", async (request, response) => {
  return handler(request, response); // this will serve the file
});


const auth = new google.auth.GoogleAuth({
  keyFile: "credentials.json",
  scopes: "https://www.googleapis.com/auth/spreadsheets",
});

const client = auth.getClient()
//DarAssendan
//first googlesheets
function DarAssendangoogle(json, cardnum = 10) {
  if (cardnum > num || cardnum == 0)
    cardnum = num;
  //{if you want to edit} edit the num varibles to the length of the list you want to repart about
  var num = json.length, i;
  manychat = { "version": "v2", "content": { "messages": [], "actions": [], "quick_replies": [] } };
  for (i = 0; i < Math.floor(num / cardnum); i++) {
    manychat["content"]["messages"].push({ "type": "cards", "elements": [], "image_aspect_ratio": "horizontal" });
    for (let j = 0; j < cardnum; j++) {
      /*edit each vaible the way you want it to display
      don't forget the other for loop*/
      title = json[(i * cardnum) + j]["ProductName"];
      subtitle = json[(i * cardnum) + j]["ProductDiscreption"];
      image_url = json[(i * cardnum) + j]["ProductImageURL"];
      manychat["content"]["messages"][i]["elements"].push({ "title": title, "subtitle": subtitle, "image_url": image_url, "action_url": "https://manychat.com", "buttons": [] });
    }
  }
  if (num % cardnum > 0) {
    manychat["content"]["messages"].push({ "type": "cards", "elements": [], "image_aspect_ratio": "horizontal" });
    for (let j = 0; j < num % cardnum; j++) {
      //this one
      title = json[(i * cardnum) + j]["ProductName"];
      subtitle = json[(i * cardnum) + j]["ProductDiscreption"];
      image_url = json[(i * cardnum) + j]["ProductImageURL"];
      manychat["content"]["messages"][i]["elements"].push({ "title": title, "subtitle": subtitle, "image_url": image_url, "action_url": "https://manychat.com", "buttons": [] });
    }
  }
  return manychat;
}
app.post("/DarAssendan/Google/get", async (req, res) => {
  //filter based on Categories
  const googleSheets = google.sheets({ version: "v4", auth: client });
  const spreadsheetId = "1L5VOht4Rw7tYeNh6Dmgtg25acYN3TB5WEDAUhJz7Bd4";
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Products!A1:Z1000",
    valueRenderOption: "UNFORMATTED_VALUE",
  });
  googledata = getRows.data.values
  var manychat = { "value": [] };
  for (let i = 1; i < googledata.length; i++) {
    let temp = {};
    for (let j = 0; j < googledata[0].length; j++) {
      temp[googledata[0][j]] = googledata[i][j];
    }
    manychat["value"].push(temp)
  }
  var manychatfilter = manychat.value.filter(function (el) {
    return el.Cats == req.body.Categories;
  });
  res.send(DarAssendangoogle(manychatfilter));
});

app.post("/DarAssendan/Google/append", async (req, res) => {
  const { request, name } = req.body;
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });
  const client = await auth.getClient();
  const googleSheets = google.sheets({ version: "v4", auth: client });
  const spreadsheetId = "1L5VOht4Rw7tYeNh6Dmgtg25acYN3TB5WEDAUhJz7Bd4";
  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "Questions!A:E",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [['2022-10-03T16:06:07.1015285Z', 'Messenger', '', 'نبي نسال لو فيه طباعه درفت او زي كتالوج ديجيتل 50 قطعه', 'Hala Elamari']],
    },
  });
  res.send('Done');
});
//second Sharepoint
function DarAssendansharepoint(json, cardnum = 10) {

  if (cardnum > num || cardnum == 0)
    cardnum = num;
  //{if you want to edit} edit the num varibles to the length of the list you want to repart about
  var num = json["value"].length, i;
  manychat = { "version": "v2", "content": { "messages": [], "actions": [], "quick_replies": [] } };
  for (i = 0; i < Math.floor(num / cardnum); i++) {
    manychat["content"]["messages"].push({ "type": "cards", "elements": [], "image_aspect_ratio": "horizontal" });
    for (let j = 0; j < cardnum; j++) {
      /*edit each vaible the way you want it to display
      don't forget the other for loop*/
      title = json["value"][(i * cardnum) + j]["ProductName"];
      subtitle = json["value"][(i * cardnum) + j]["ProductDiscreption"];
      image_url = json["value"][(i * cardnum) + j]["ProductImageURL"];
      manychat["content"]["messages"][i]["elements"].push({ "title": title, "subtitle": subtitle, "image_url": image_url, "action_url": "https://manychat.com", "buttons": [] });
    }
  }
  if (num % cardnum > 0) {
    manychat["content"]["messages"].push({ "type": "cards", "elements": [], "image_aspect_ratio": "horizontal" });
    for (let j = 0; j < num % cardnum; j++) {
      //this one
      title = json["value"][(i * cardnum) + j]["ProductName"];
      subtitle = json["value"][(i * cardnum) + j]["ProductDiscreption"];
      image_url = json["value"][(i * cardnum) + j]["ProductImageURL"];
      manychat["content"]["messages"][i]["elements"].push({ "title": title, "subtitle": subtitle, "image_url": image_url, "action_url": "https://manychat.com", "buttons": [] });
    }
  }
  return manychat;
}
class RedTech {
  static TenantID = "e1cbaea0-f8c8-4ce7-a484-ade672f55f8d";
  static TenantName = "redtechly0";
  static ApplicationID = "00000003-0000-0ff1-ce00-000000000000";
  static ClientID = "bc1fdfac-50ef-4031-90c8-f12401b38e7a";
  static ClientSecret = "br+8R9XC+97p24aP8iSZaIgl16CKOxUjpcVlG41WXnM=";
  static RefreshToken = "PAQABAAEAAAD--DLA3VO7QrddgJg7WevrLVZx_-lO6VBwT_3LyQbCKCz_y31k2_NBUlGOCHVaTQNssNFOz9ciOG68LVin33nflACoDGbMXjK6GMvshqE6z7ccWyDM2Rm4Nc9WJUJazyiIxg1xCFWRNm2kwLtsw4klNSe9kEtoJQyAMTxRfqpTBn_RDXQYM7NCGkczXQ_r4V23GesvEFuggk5JDi3r9N-6Rr4C7VU7JQaX5VWn4tWDmdiGQC8d4b-lIbBMN6Iwm8dCmjQw7tenNj-K7sLKt4QioI31zIt46Q6MxsRkjUFCqCAA";
  static AccessToken;
  static IssueDate;
  constructor(ListName, SiteName) {
    this.SiteName = SiteName
    this.ListName = ListName
  }
  static async generatetoken() {
    let result = await requestpromise({
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      form: {
        grant_type: "refresh_token",
        client_id: this.ClientID + "@" + this.TenantID,
        client_secret: this.ClientSecret,
        resource: this.ApplicationID + "/" + this.TenantName + ".sharepoint.com@" + this.TenantID,
        refresh_token: this.RefreshToken
      },
      uri: "https://accounts.accesscontrol.windows.net/" + this.TenantID + "/tokens/OAuth/2",
      method: 'POST'
    });
    return JSON.parse(result).access_token;
  }
  static async getAccessToken() {
    if (this.AccessToken == null || Date.now().valueOf() > (this.IssueDate + 28500000)) {
      console.log("Generating new token");
      this.IssueDate = Date.now().valueOf();
      this.AccessToken = await this.generatetoken();
    }
    return this.AccessToken;
  }
  async getListItems() {
    let result = await requestpromise({
      json: true,
      headers: {
        "Authorization": "Bearer " + await RedTech.getAccessToken(),
        "Content-Type": "application/json; odata=verbose",
        "Accept": "application/json; odata=nometadata"
      },
      uri: encodeURI("https://" + RedTech.TenantName + ".sharepoint.com/sites/" + SiteName + "/_api/web/lists/GetByTitle('" + ListName + "')/items"),
      body: "",
      method: 'GET'
    });
    return result;
  }

}
app.get("/DarAssendan/SharePoint/get", async (req, res) => {
  SiteName = "REDCompanies";
  ListName = "DarAssendan";
  darassedn = new RedTech(ListName, SiteName)
  res.send(await darassedn.getListItems());
});
app.post("/DarAssendan/SharePoint/append", async (req, res) => {
  SiteName = "REDCompanies";
  ListName = "DarAssendan";
  requestpromise({
    json: true,
    headers: {
      "Authorization": "Bearer " + await RedTech.getAccessToken(),
      "Content-Type": "application/json; odata=verbose",
      "Accept": "application/json; odata=nometadata"
    },
    uri: "https://" + TenantName + ".sharepoint.com/sites/" + SiteName + "/_api/web/lists/GetByTitle('" + ListName + "')/items",
    body: {
      "__metadata": { "type": "SP.Data.DarAssendanListItem" },
      "Active": true,
      "ProductName": "test",
      "Cats": "test",
      "ProductDiscreption": "test",
      "ProductPrice": 0,
      "Pricing": null,
      "Time": null,
      "ProductImageURL": "test"
    },
    method: 'POST'
  }, function (_err, _resreq, _body) {
    res.send(_body)
  });
});

app.get("/Whatsapp/send", async (req, res) => {
  let test = { "secret": "2.sS-KR35gFPxtS7azfoPe6lpGfwjykELUgGB0uUiCT2g", "to": "elkmeshi2002@gmail.com", "device": "OPPO CPH1803", "priority": "normal", "payload": { "type": 2, "phoneNumber": "", "message": "" } }
  test["payload"]["phoneNumber"] = req.query.phoneNumber
  test["payload"]["message"] = req.query.message
  let result = await requestpromise({
    json: true,
    headers: {
      "Content-Type": "application/json"
    },
    uri: "https://llamalab.com/automate/cloud/message",
    body: test,
    method: "POST"
  });
  res.send("<script>alert('Message Sent');location.href = '/Whatsapp'</script>");
});

app.get("/Whatsapp", async (req, res) => {
  res.sendFile("C:\\Users\\melkmeshi\\Documents\\Projects\\HTML\\send whatsapp message html\\index.html")
});


app.listen(PORT, () => {
  console.log(`listening on post http://localhost:${PORT}`);
});
