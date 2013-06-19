/**
 * Based on: http://www.as3dp.com/2012/01/from-actionscript-3-0-to-javascript-chain-of-responsibility-part-ii-the-help-desk
 * @author William R. J. Ribeiro - will@williamrjribeiro.com
 */
define(["js/chainlink"],function (ChainLink) {

    var handler = function (request) {
        console.log("[winChainLink.handler]");
        request.os = request.os ? request.os : {};

        // Always false if not running on a browser. navigator is a global object injected by browsers.
        request.os.isWin = navigator ? (/win/gi).test(navigator.platform) : false;

        return request;
    };

    var winChainLink = new ChainLink(handler,"Win");

    return winChainLink;
});