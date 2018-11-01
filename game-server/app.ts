import { pinus } from 'pinus';
import { preload } from './preload';
import { dispatch } from './app/util/dispatcher';

/**
 *  替换全局Promise
 *  自动解析sourcemap
 *  捕获全局错误
 */
preload();

/**
 * Init app for client.
 */
let app = pinus.createApp();
app.set('name', 'myWebsocketChat');

// route definition for chat server
var chatRoute = function(session, msg, app, cb) {
    var chatServers = app.getServersByType('chat');
  
      if(!chatServers || chatServers.length === 0) {
          cb(new Error('can not find chat servers.'));
          return;
      }
  
      var res = dispatch(session.get('rid'), chatServers);
  
      cb(null, res.id);
  };

// app configuration
app.configure('production|development', 'connector', function () {
    app.set('connectorConfig',
        {
            connector: pinus.connectors.hybridconnector,
            heartbeat: 3,
            useDict: true,
            useProtobuf: true
        });
});

app.configure('production|development', 'gate', function () {
    app.set('connectorConfig',
        {
            connector: pinus.connectors.hybridconnector,
            useProtobuf: true
        });
});

app.configure('production|development', function() {
    app.route('chat', chatRoute);
  });

// start app
app.start();

