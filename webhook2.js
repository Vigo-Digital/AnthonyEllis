const options = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    authorization: 'Bearer fc6542dbe9ceb205729c0632b743d5b05a578eafe1c7f0c5904ad84a6f47377b'
  },
  body: JSON.stringify({
    triggerType: 'collection_item_changed',
    url: 'https://hooks.airtable.com/workflows/v1/genericWebhook/appA94RQLjDjFYKbH/wfloZUYcCMcaPULDm/wtryPTvIk4i2diJE0'
  })
};

fetch('https://api.webflow.com/v2/sites/64f5a60c9d914de177e256f6/webhooks', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
