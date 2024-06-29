const options = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    authorization: 'Bearer 11b6e7998d431ff5be6d0611d101e05ffabf381eb6b7513ec595c70444d375f5'
  },
  body: JSON.stringify({
    triggerType: 'collection_item_changed',
    url: 'https://hooks.airtable.com/workflows/v1/genericWebhook/appA94RQLjDjFYKbH/wfldfsOvp7u205N52/wtrTQ8HzoMe5iSuon'
  })
};

fetch('https://api.webflow.com/v2/sites/64f5a60c9d914de177e256f6/webhooks', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
