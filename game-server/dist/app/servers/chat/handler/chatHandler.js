"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(app) {
    return new ChatHandler(app);
}
exports.default = default_1;
class ChatHandler {
    constructor(app) {
        this.app = app;
    }
    /**
     * Send messages to users
     *
     * @param {Object} msg message from client
     * @param {Object} session
     * @param  {Function} next next stemp callback
     *
     */
    send(msg, session) {
        return __awaiter(this, void 0, void 0, function* () {
            let rid = session.get('rid');
            let username = session.uid.split('*')[0];
            let channelService = this.app.get('channelService');
            let param = {
                msg: msg.content,
                from: username,
                target: msg.target
            };
            let channel = channelService.getChannel(rid, false);
            // the target is all users
            if (msg.target === '*') {
                channel.pushMessage('onChat', param);
            }
            // the target is specific user
            else {
                let tuid = msg.target + '*' + rid;
                let tsid = channel.getMember(tuid)['sid'];
                channelService.pushMessageByUids('onChat', param, [{
                        uid: tuid,
                        sid: tsid
                    }]);
            }
        });
    }
}
exports.ChatHandler = ChatHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdEhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9hcHAvc2VydmVycy9jaGF0L2hhbmRsZXIvY2hhdEhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUlBLG1CQUF3QixHQUFnQjtJQUNwQyxPQUFPLElBQUksV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2hDLENBQUM7QUFGRCw0QkFFQztBQUVEO0lBQ0ksWUFBb0IsR0FBZ0I7UUFBaEIsUUFBRyxHQUFILEdBQUcsQ0FBYTtJQUNwQyxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNHLElBQUksQ0FBQyxHQUF1QyxFQUFFLE9BQXVCOztZQUN2RSxJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzdCLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLElBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDcEQsSUFBSSxLQUFLLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEdBQUcsQ0FBQyxPQUFPO2dCQUNoQixJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU07YUFDckIsQ0FBQztZQUNGLElBQUksT0FBTyxHQUFHLGNBQWMsQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBRXBELDBCQUEwQjtZQUMxQixJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUNwQixPQUFPLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQzthQUN4QztZQUNELDhCQUE4QjtpQkFDekI7Z0JBQ0QsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO2dCQUNsQyxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMxQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDO3dCQUMvQyxHQUFHLEVBQUUsSUFBSTt3QkFDVCxHQUFHLEVBQUUsSUFBSTtxQkFDWixDQUFDLENBQUMsQ0FBQzthQUNQO1FBQ0wsQ0FBQztLQUFBO0NBQ0o7QUFyQ0Qsa0NBcUNDIn0=