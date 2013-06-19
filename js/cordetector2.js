/**
 * Based on: http://www.as3dp.com/2012/01/from-actionscript-3-0-to-javascript-chain-of-responsibility-part-ii-the-help-desk
 * @author William R. J. Ribeiro - will@williamrjribeiro.com
 */
define(["js/chainlink"                          // base Chain of Responsibility dependency
        ,"js/browserhandlers/firefoxhandler"    // Browser detection chain dependencies
        ,"js/browserhandlers/iehandler"
        ,"js/browserhandlers/chromehandler"
        ,"js/browserhandlers/safarihandler"
        ,"js/oshandlers/macchainlink"             // OS detection chain dependencies
        ,"js/oshandlers/winchainlink"],
    function (ChainLink, fireFoxHandler, ieHandler, chromeHandler, safariHandler, macChainLink, winChainLink) {
        console.log("[cordetector2] initializing");

        /**
         * The Browser and OS detection chains write their results to this object and it's returned by the module.
         * @type {Object}
         */
        var result = {};

        /**
         * It's the chain for detecting the browser.
         * @type {ChainLink}
         */
        var browserChain = new ChainLink(fireFoxHandler);

        // create the browser detection chain. This demonstrates the chained API style.
        // the browser handlers are just function thus, they don't have chain IDs.
        browserChain.link(ieHandler).link(chromeHandler).link(safariHandler);

        // create the OS detection chain. The OSes are ChainLink instances with IDs so it's easier to use. Right?
        winChainLink.link(macChainLink);

        // start the browser detection chain
        result = browserChain.process(result);

        // start the OS detection chain
        result = winChainLink.process(result);

        return result
    }
);