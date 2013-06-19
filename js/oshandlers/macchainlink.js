/**
 * Based on: http://www.as3dp.com/2012/01/from-actionscript-3-0-to-javascript-chain-of-responsibility-part-ii-the-help-desk
 * @author William R. J. Ribeiro - will@williamrjribeiro.com
 */
define(["js/chainlink"],function (ChainLink) {

    var handler = function (request) {
        console.log("[macChainLink.handler]");
        request.os = request.os ? request.os : {};

        // Always false if not running on a browser. navigator is a global object injected by browsers.
        request.os.isMac = navigator ? (/mac/gi).test(navigator.platform) : false;

        return request;
    };

    var macChainLink = new ChainLink(handler,"Mac");

    return macChainLink;
});