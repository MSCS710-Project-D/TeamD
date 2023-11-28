const Pusher = require('pusher');

exports.pusher = new Pusher({
    appId: "1715034",
    key: "5afd7e1b61fe0c4e7af3",
    secret: "536de03e644ddc5ef86c",
    cluster: "us2",
    useTLS: true
});