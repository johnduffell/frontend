define([
    'underscore',
    'jquery',
    'modules/authed-ajax',
    'modules/vars'
], function (
    _,
    $,
    authedAjax,
    vars
) {
    var endpoints = [{
        key: 'config',
        url: vars.CONST.apiBase + '/config',
        validate: function (response) {
            // TODO
        }
    }, {
        key: 'switches',
        url: vars.CONST.apiBase + '/switches'
    }];

    function sendRequest (endpoint) {
        return authedAjax.request({
            url: endpoint.url
        })
        .then(function (response) {
            if (endpoint.validate) {
                endpoint.validate(response);
            }
            return response;
        });
    }

    function Bootstrap () {
        this.get();
    }

    Bootstrap.prototype.get = function() {
        $.when(_.map(endpoints, sendRequest));

        return this;
    };

    Bootstrap.prototype.every = function () {
        // TODO poll every once in a while and call a callback
        return this;
    };

    Bootstrap.prototype.onload = function () {
        // TODO do something only once
        return this;
    };

    Bootstrap.prototype.onfail = function () {
        // TODO do something only once it fails
        return this;
    };

    Bootstrap.prototype.dispose = function () {
        // stop polling
    };

    return Bootstrap;
});





// define([
//     'jquery',
//     'underscore',
//     'utils/fetch-config',
//     'utils/fetch-switches'
// ], function (
//     $,
//     _,
//     fetchConfig,
//     fetchSwitches
// ) {
//     var poller = _.once(function(callback, pollingMs) {
//         setInterval(function(){
//             fetchSettings(callback);
//         }, pollingMs);
//     });

//     function fetchSettings(callback, pollingMs, terminateOnFail) {
//         return $.when(fetchConfig(terminateOnFail), fetchSwitches(terminateOnFail))
//         .done(function(config, switches) {
//             callback(config, switches);
//             if (pollingMs) {
//                 poller(callback, pollingMs);
//             }
//         });
//     }

//     return fetchSettings;
// });


// define('fetch config', function () {
//     return function (terminateOnFail) {
//         var deferred = $.Deferred();

//         authedAjax.request({
//             url: vars.CONST.apiBase + '/config'
//         })
//         .fail(function () {
//             if(terminateOnFail) {
//                 terminate('the config is invalid or unvailable');
//             }
//             deferred.reject();
//         })
//         .done(function(config) {
//             if (_.isObject(config.fronts) && _.isObject(config.collections)) {
//                 deferred.resolve(config);
//             } else if (terminateOnFail ) {
//                 terminate('the config is invalid.');
//             } else {
//                 deferred.reject();
//             }
//         });

//         return deferred.promise();
//     };
// });

// define('fetch switches', function() {
//     return function (terminateOnFail) {
//         var deferred = $.Deferred();

//         authedAjax.request({
//             url: vars.CONST.apiBase + '/switches'
//         })
//         .fail(function () {
//             if(terminateOnFail) {
//                 terminate('the switches are invalid or unvailable');
//             }
//             deferred.reject();
//         })
//         .done(function(switches) {
//             deferred.resolve(switches || {});
//         });

//         return deferred.promise();
//     };
// });
