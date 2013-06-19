/**
 * Based on: http://www.as3dp.com/2012/01/from-actionscript-3-0-to-javascript-chain-of-responsibility-part-ii-the-help-desk
 * @author William R. J. Ribeiro - will@williamrjribeiro.com
 */
define(function () {
    return function fireFoxHandler(request) {
        console.log("[fireFoxHandler]");
        request.browser = request.browser ? request.browser : {};

        // Always false if not running on a browser. navigator is a global object injected by browsers.
        request.browser.isFirefox = navigator ? (/firefox/i).test(navigator.userAgent) : false;

        return request;
    };
});