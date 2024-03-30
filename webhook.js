const options = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    authorization: 'Bearer dc803a5b31af947c768f2bfc894140f298e5e4bee13e055cea814d6efd597434'
  },
  body: JSON.stringify({triggerType: 'collection_item_created'})
};

fetch('https://api.webflow.com/v2/sites/64f5a60c9d914de177e256f6/webhooks', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));


//https://hooks.airtable.com/workflows/v1/genericWebhook/appA94RQLjDjFYKbH/wfll8AWsAUkg1ySxn/wtr1JgPwzz4jjlzQI
