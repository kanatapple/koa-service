/**
 * window オブジェクトを参照するモジュールがあるので、global を window に複製
 * Browserify の --no-browser-filed で回避したかったが下記エラーが出て断念
 *
 * Error: Cannot find module '_process' from 'D:\git-repos\koa-service\node_modules\koa\lib'
 *     at D:\git-repos\koa-service\node_modules\resolve\lib\async.js:46:17
 *     at process (D:\git-repos\koa-service\node_modules\resolve\lib\async.js:173:43)
 *     at ondir (D:\git-repos\koa-service\node_modules\resolve\lib\async.js:188:17)
 *     at load (D:\git-repos\koa-service\node_modules\resolve\lib\async.js:69:43)
 *     at onex (D:\git-repos\koa-service\node_modules\resolve\lib\async.js:92:31)
 *     at D:\git-repos\koa-service\node_modules\resolve\lib\async.js:22:47
 *     at FSReqWrap.oncomplete (fs.js:123:15)
 *
 */
if (typeof window === 'undefined') {
    window = global;
}

if (typeof global.XMLHttpRequest === 'undefined') {
    global.XMLHttpRequest = function () {
        this.open = function () {};
    }
}
