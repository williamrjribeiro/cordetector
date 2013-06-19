/**
 * Based on: http://www.as3dp.com/2012/01/from-actionscript-3-0-to-javascript-chain-of-responsibility-part-ii-the-help-desk
 * Google Closure Compiler Annotations: https://developers.google.com/closure/compiler/docs/js-for-compiler
 * @author William R. J. Ribeiro - will@williamrjribeiro.com
 */
define(function () {

    /**
     * Many links connected form a chain that execute its handlers sequentially until it reaches the end.
     * It's the implementation of the Chain of Responsibility design pattern.
     * This object has two public properties: handler and successor.
     * @param {!function} handler a function that is called by ChainLink.process().
     * @param {?(string|number)} id an optional identification for this instance for convenience. Can be a String or Number.
     * @constructor
     * @throws If handler is not of type Function.
     */
    function ChainLink(handler, id) {
        var type = typeof handler;

        console.log("[ChainLink] typeof handler: " + type + ", id: " + id);

        if(type !== 'function' ){
            throw "Invalid argument. Function is required.";
        }

        /**
         * Functionality implementation of this ChainLink. Called by ChainLink.process().
         * @type {!function}
         */
        this.handler = handler;

        /**
         * It's the next element to be called on a ChainLink.process() call, if any. Assigned by ChainLink.link().
         * @type {?ChainLink}
         */
        this.successor = null;

        /**
         * Identification of this instance for convenience.
         * @type {?(string|number)}
         */
        this.id = (id ? id : null);
    };

    /**
     * Connects this ChainLink to the given chainLink.
     * @param {!(function|ChainLink)} chainLink it can be a Function or another ChainLink instance. If it's a function, a new ChainLink object
     * is created if the function as its handler.
     * @return {ChainLink} successor the given/created ChainLink instance. Useful for chaining link calls. e.g.: linkA.link(linkB).link(linkC);
     * @throws If chainLink is a ChainLink, its handler cannot be equal to this.handler.
     *         If chainLink is a Function, it cannot be equal to this.handler.
     */
    ChainLink.prototype.link = function(chainLink) {
        var type = typeof chainLink;

        console.log("[ChainLink.link" + (this.id ? "."+this.id : "") + "] type: " + type + ", successor: " + this.successor);

        if( chainLink instanceof ChainLink ){
            if(chainLink.handler === this.handler){
                throw "Invalid argument. chainLink.handler must not be equal to this.handler.";
            }

            this.successor = chainLink;
        }
        else {
            if(type !== 'function' || this.handler === chainLink ){
                throw "Invalid argument. Function is required. Must not be equal to this.handler.";
            }

            // create a new ChainLink instance with the given handler function
            this.successor = new ChainLink(chainLink);
        }

        return this.successor;
    };

    /**
     * Starts the processing chain. Calls this.handler(request) and, if defined, the linked ChainLink.process.
     * @param {?object} request some data that needs processing by the chain.
     *                  The request is passed to evey single ChainLink on the chain.
     * @return {object} request the chain probably changes the given request but it's up to the functionality
     *                  in this.handler.
     */
    ChainLink.prototype.process = function(request) {

        console.log("[ChainLink.process" + (this.id ? "."+this.id : "") + "] successor: " + this.successor);

        request = this.handler(request);

        // continue the process chain if defined
        return this.successor ? this.successor.process(request) : request;
    }

    return ChainLink;
});