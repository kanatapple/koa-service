/**
 * window オブジェクトを参照するモジュールがあるので、global を window に複製
 */
if (typeof window === 'undefined') {
    window = global;
}

/**
 * stream-http(capability.js) というモジュールで global.XMLHttpRequest(#open) を参照してるので
 * 空の関数を用意する
 */
if (typeof global.XMLHttpRequest === 'undefined') {
    global.XMLHttpRequest = function () {
        this.open = function () {};
    }
}
