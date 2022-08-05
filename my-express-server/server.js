const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const https = require('node:https');

const port = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));


app.get('/', (req, res) => {
    console.log(__dirname);
    res.sendFile(__dirname + '/index.html');
})

app.post('/', (req, res) => {
    const fName = req.body.fName;
    const lName = req.body.lName;
    const emailAddress = req.body.emailAddr;
    console.log(emailAddress + fName + lName);

    const data = {
        members: [
            {
                "email_address": emailAddress,
                "status": "subscribed",
                "merge_fields": {
                    "FNAME": fName,
                    "LNAME": lName
                }
            }]
    }

    const jsondata = JSON.stringify(data);

    const options = {
        //hostname: 'https://us13.api.mailchimp.com/3.0/lists/c854a11818/members',
        method: 'POST',
        auth: "key:fcce077f961bb19a321e32ec6a6d7d2d-us13"
    };


    const url = "https://us13.api.mailchimp.com/3.0/lists/c854a11818"
    const request = https.request(url, options, function (response) {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        }
        else {
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })

    });
    request.write(jsondata);
    request.end();

    // res.send(req.body);
})


app.post("/failure", (req, res) => {
    res.redirect("/");
})
app.listen(3000 || process.env.PORT, () => {
    console.log(`Example app listening on port 3000`)
})

// api key fcce077f961bb19a321e32ec6a6d7d2d-us13

// audience id c854a11818

// ---------add audient to list----------
// #!/bin/bash
// set -euo pipefail


// list_id="YOUR_LIST_ID"
// user_email="prudence.mcvankab@example.com"
// user_fname="Prudence"
// user_lname="McVankab"

// curl -sS --request POST \
//   --url "https://$API_SERVER.api.mailchimp.com/3.0/lists/$list_id/members" \
//   --user "key:$API_KEY" \
//   --header 'content-type: application/json' \
//   --data @- \
// <<EOF | jq '.id'
// {
//   "email_address": "$user_email",
//   "status": "subscribed",
//   "merge_fields": {
// 	"FNAME": "$user_fname",
// 	"LNAME": "$user_lname"
//   }
// }
// EOF

