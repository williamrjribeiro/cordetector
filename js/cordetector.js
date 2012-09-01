/**
 * The CoRDetector is the object responsible for creating the two Chain of Responsibility (CoR) using the DOJO Toolkit.
 * One CoR is for identifying the user agent - a.k.a. browser - and the other for the operating system.
 * The CoRDetector is a Revealing Module pattern implementation.
 * Based on: http://www.as3dp.com/2012/01/from-actionscript-3-0-to-javascript-chain-of-responsibility-part-ii-the-help-desk
 * @author William R. J. Ribeiro - will@williamrjribeiro.com
 */
var CoRDetector = function () {
    "use strict";

    // private members here
    var _output = null,
        _browserDetectionCoR,
        _osDetectionCoR,
        /**
         * The ChainLink is the base CoR object. It is the 'abstract class' that defines the methods that must be overriden
         * in order for a chain to work. It is implemented to be used with dojo.declare().
         */
        ChainLink =	{
            // holds a reference to the client object that created an instance of a chain link.
            _client: null,

            constructor: function (client) {
                console.debug("[ChainLink.constructor] client: " + client);
                this._client = client;
            },

            setSuccessor: function (successor) {
                this.successor = successor;
            },

            // Can't call Dojo's "inherited(arguments)" function on "strict mode". Added this function to compensate.
            forwardRequest: function (req) {
                // only continue with the chain if there's a compatible successor!
                if (this.successor && typeof this.successor.handleRequest === "function") {
                    this.successor.handleRequest(req);
                } else {
                    console.debug("[ChainLink.forwardRequest] end of chain. req: " + req);
                    _print("End of chain.");
                }
            },

            handleRequest: function (req) {
                throw "This is an abstract method!";
            }
        },

        /**
         * The MacChainLink is a ChainLink for the _osDetectionCoR. It detects if the user's OS is MacOS based.
         */
        MacChainLink = {
            constructor: function (client) {
                console.debug("[MacChainLink.constructor]");
                // adds a property to the client object
                client.isMac = false;
            },

            handleRequest: function (req) {
                console.debug("[MacChainLink.handleRequest] req.platform: " + req.platform);

                if ((/mac/gi).test(req.platform)) {
                    console.debug("[MacChainLink.handleRequest] You are using a Mac device.");

                    // adds a property to the client object
                    this._client.isMac = true;

                    _print("You are using a Mac device.");
                } else {
                    console.debug("[MacChainLink.handleRequest] you are NOT using a Mac device...");

                    _print("You are NOT using a Mac device.");

                    this.forwardRequest(req);
                }
            }
        },

        /**
         * The WinChainLink is a ChainLink for the _osDetectionCoR.
         */
        WinChainLink = {
            constructor: function (client) {
                console.debug("[WinChainLink.constructor]");

                // adds a property to the client object
                client.isWindows = false;
            },

            handleRequest: function (req) {
                console.debug("[WinChainLink.handleRequest] req.platform: " + req.platform);

                if ((/win/gi).test(req.platform)) {
                    console.debug("[WinChainLink.handleRequest] You are using a Windows device.");

                    // adds a property to the client object
                    this._clientisWindows = true;

                    _print("You are using a Windows device.");
                } else {
                    console.debug("[WinChainLink.handleRequest] you are NOT using a Windowsdevice...");

                    _print("You are NOT using a Windows device.");

                    this.forwardRequest(req);
                }
            }
        },

    //////////////////////
    // BROWSER DETECTORS
    //////////////////////

        /**
         * The FirefoxChainLink is a ChainLink for the _browserDetectionCoR.
         */
        FirefoxChainLink = {
            constructor: function (client) {
                console.debug("[FirefoxChainLink.constructor]");

                // adds a property to the client object
                client.isFirefox = false;
            },

            handleRequest: function (req) {
                console.debug("[FirefoxChainLink.handleRequest] req.userAgent: " + req.userAgent);

                if ((/firefox/i).test(req.userAgent)) {
                    console.debug("[FirefoxChainLink.handleRequest] You are using a Firefox browser.");

                    // adds a property to the client object
                    this._client.isFirefox = true;

                    _print("You are using a Firefox browser.");
                } else {
                    console.debug("[FirefoxChainLink.handleRequest] you are NOT using a Firefox browser...");

                    _print("You are NOT using a Firefox browser...");

                    this.forwardRequest(req);
                }
            }
        },

        /**
         * The IEChainLink is a ChainLink for the _browserDetectionCoR.
         */
        IEChainLink = {
            constructor: function (client) {
                console.debug("[IEChainLink.constructor]");

                // adds a property to the client object
                client.isIntertExplorer = false;
            },

            handleRequest: function (req) {
                console.debug("[IEChainLink.handleRequest] req: " + req);

                // MSIE for IE10
                if ((/msie/i).test(req.userAgent) || (/microsoft/i).test(req.userAgent)) {
                    console.debug("[IEChainLink.handleRequest] You are using a Internet Explorer browser.");

                    // adds a property to the client object
                    this._client.isIntertExplorer = true;

                    _print("You are using a Internet Explorer browser.");
                } else {
                    console.debug("[IEChainLink.handleRequest] you are NOT using a Internet Explorer browser...");

                    _print("You are NOT using a Internet Explorer browser...");

                    this.forwardRequest(req);
                }
            }
        };

    /**
     * Displays the message in the _output element.
     * @param message - the message to be appended to the output.
     */
    function _print(message) {
        if (_output) {
            _output.innerHTML += message + "<br />";
        }
    }

    function _init() {
        console.debug("[CoRDetector.init]");

        // get an element with id 'cordetectorout' so we can write logging messages.
        _output = dojo.byId('cordetectorout');

        // create the base CoR object. Must ovewrite the object definition after calling dojo.declare()
        ChainLink = dojo.declare("cordetector.ChainLink", null, ChainLink);

        // create the browser CoR
        FirefoxChainLink = dojo.declare("cordetector.FirefoxChainLink", ChainLink, FirefoxChainLink);
        IEChainLink = dojo.declare("cordetector.IEChainLink", ChainLink, IEChainLink);

        // create the OS CoR
        MacChainLink = dojo.declare("cordetector.MacChainLink", ChainLink, MacChainLink);
        WinChainLink = dojo.declare("cordetector.WinChainLink", ChainLink, WinChainLink);
    }

    // call init function every time the constructor is called
    _init();

    // all the public members of the object are defined in the returned object.
    return {
        /**
         * Detects the Browser and the OS. Must be initialized.
         */
        detect: function () {
            console.debug("[CoRDetector.detect]");

            this.detectBrowser();
            this.detectOS();
        },

        /**
         * Detects only the Browser.
         */
        detectBrowser: function () {
            console.debug("[CoRDetector.detectBrowser]");

            // creates the CoR only if needed
            if (!_browserDetectionCoR) {
                // start CoR with Fifefox detector
                _browserDetectionCoR = new cordetector.FirefoxChainLink(this);
                _browserDetectionCoR.setSuccessor(new cordetector.IEChainLink(this));
            }
            _browserDetectionCoR.handleRequest(navigator);
        },

        detectOS: function () {
            console.debug("[CoRDetector.detectOS]");

            // creates the CoR only if needed
            if (!_osDetectionCoR) {
                // start CoR with MacChainLink
                _osDetectionCoR = new cordetector.MacChainLink(this);
                _osDetectionCoR.setSuccessor(new cordetector.WinChainLink(this));
            }
            _osDetectionCoR.handleRequest(navigator);
        }
    };
};