/**
 * Based on: http://www.as3dp.com/2012/01/from-actionscript-3-0-to-javascript-chain-of-responsibility-part-ii-the-help-desk
 * Jasmine docs: http://pivotal.github.io/jasmine/
 * @author William R. J. Ribeiro - will@williamrjribeiro.com
 */
define( [
    "js/cordetector2"                       // main module dependency
    ,"js/chainlink"                         // base Chain of Responsibility dependency
    ,"js/browserhandlers/firefoxhandler"    // Browser detection chain dependencies
    ,"js/browserhandlers/iehandler"
    ,"js/browserhandlers/chromehandler"
    ,"js/browserhandlers/safarihandler"
    ,"js/oshandlers/macchainlink"             // OS detection chain dependencies
    ,"js/oshandlers/winchainlink"],
    function (cor,ChainLink, fireFoxHandler, ieHandler, chromeHandler, safariHandler, macChainLink, winChainLink) {

        describe("ChainLink Test Suite", function() {
            var dummyHandler = function(){};

            it("ChainLink must be Constructor", function() {
                expect(typeof ChainLink).toEqual("function")
            });

            it("Constructor function requires a Function as argument", function() {
                expect( ChainLink ).toThrow();
                expect( ChainLink.bind(null,{}) ).toThrow();
                expect( ChainLink.bind(null,[]) ).toThrow();
                expect( ChainLink.bind(null,123) ).toThrow();
                expect( ChainLink.bind(null,false) ).toThrow();
                expect( ChainLink.bind(null,"foo") ).toThrow();

                expect( ChainLink.bind(null,dummyHandler) ).not.toThrow();
            });

            it("a new ChainLink object has no successor link and no ID.", function() {
                var link = new ChainLink(dummyHandler);
                expect( link.successor).toBeNull();
                expect( link.id).toBeNull();
            });

            it("a new ChainLink object can have an ID", function() {
                expect( new ChainLink(dummyHandler, "chainId").id).toEqual("chainId")
                expect( new ChainLink(dummyHandler, 123).id).toEqual(123)
            });

            it("has a link(chainLink) function", function() {
                expect(typeof new ChainLink(dummyHandler).link).toEqual("function")
            });

            it("link(chainLink) requires an instance of ChainLink that has a different handler than this.handler", function() {
                var link = new ChainLink(dummyHandler);
                expect( link.link.bind(null, new ChainLink(dummyHandler) )).toThrow();

                expect( link.link.bind(null, new ChainLink(function(){}) )).not.toThrow();
            });

            it("link(chainLink) requires a Function as argument different than this.handler", function() {
                var link = new ChainLink(dummyHandler);
                expect( link.link ).toThrow();
                expect( link.link.bind(null,{}) ).toThrow();
                expect( link.link.bind(null,[]) ).toThrow();
                expect( link.link.bind(null,123) ).toThrow();
                expect( link.link.bind(null,false) ).toThrow();
                expect( link.link.bind(null,"") ).toThrow();

                // this.handler == link(handler)
                expect( link.link.bind(null,dummyHandler) ).toThrow();

                expect( link.link.bind(null,function(){}) ).not.toThrow();
            });

            it("link(chainLink) function must return a new ChainLink with the handler as the given chainLink", function() {
                var link = new ChainLink(dummyHandler), linkHandler = function(){};
                expect( link.link(linkHandler).handler).toBe(linkHandler);
            });

            it("has a process() function", function() {
                var link = new ChainLink(dummyHandler);
                expect(typeof link.process).toEqual("function");
            });
        });

        describe("FireFox handler Test Suite", function() {
            it("fireFoxHandler must be a function", function() {
                expect(typeof fireFoxHandler).toEqual("function")
            });

            it("must create a boolean property browser.isFireFox on the given argument and return the modified argument", function() {
                expect( typeof fireFoxHandler({browser:{}}).browser.isFirefox ).toBe("boolean")
            });

            it("must create a browser object on the given argument if not defined and return the modified argument", function() {
                expect( typeof fireFoxHandler({}).browser ).toBe("object")
            });
        });

        describe("IE handler Test Suite", function() {
            it("ieHandler must be a function", function() {
                expect(typeof ieHandler).toEqual("function")
            });

            it("must create a boolean property browser.isIE on the given argument and return the modified argument", function() {
                expect( typeof ieHandler({browser:{}}).browser.isIE ).toBe("boolean")
            });

            it("must create a browser object on the given argument if not defined and return the modified argument", function() {
                expect( typeof ieHandler({}).browser ).toBe("object")
            });
        });

        describe("Chrome handler Test Suite", function() {
            it("chromeHandler must be a function", function() {
                expect(typeof chromeHandler).toEqual("function")
            });

            it("must create a boolean property browser.isChrome on the given argument and return the modified argument", function() {
                expect( typeof chromeHandler({browser:{}}).browser.isChrome ).toBe("boolean")
            });

            it("must create a browser object on the given argument if not defined and return the modified argument", function() {
                expect( typeof chromeHandler({}).browser ).toBe("object")
            });
        });

        describe("Mac handler Test Suite", function() {
            it("macChainLink must be a ChainLink objects", function() {
                expect(macChainLink instanceof ChainLink).toBe(true)
            });

            it("must create a boolean property os.isMac on the given argument and return the modified argument", function() {
                expect( typeof macChainLink.process({os:{}}).os.isMac ).toEqual("boolean")
            });

            it("must create a os object on the given argument if not defined and return the modified argument", function() {
                expect( typeof macChainLink.process({}).os ).toBe("object")
            });
        });

        describe("Win handler Test Suite", function() {
            it("winChainLink must be a ChainLink objects", function() {
                expect(winChainLink instanceof ChainLink).toBe(true)
            });

            it("must create a boolean property os.isWinc on the given argument and return the modified argument", function() {
                expect( typeof winChainLink.process({os:{}}).os.isWin ).toEqual("boolean")
            });

            it("must create a os object on the given argument if not defined and return the modified argument", function() {
                expect( typeof winChainLink.process({}).os ).toBe("object")
            });
        });

        describe("CorDetector Test Suite", function() {

            it("cor must be an Object", function() {
                expect(typeof cor).toEqual("object")
            });

            it("has a browser object", function() {
                expect(typeof cor.browser).toEqual("object")
            });

            it("must detect FireFox", function() {
                expect(typeof cor.browser.isFirefox).toEqual("boolean")
            });

            it("must detect Internet Explorer", function() {
                expect(typeof cor.browser.isIE).toEqual("boolean")
            });

            it("must detect Google Chrome", function() {
                expect(typeof cor.browser.isChrome).toEqual("boolean")
            });

            it("must detect Apple Safari", function() {
                expect(typeof cor.browser.isSafari).toEqual("boolean")
            });

            it("has a os object", function() {
                expect(typeof cor.os).toEqual("object")
            });

            it("must detect Apple Mac", function() {
                expect(typeof cor.os.isMac).toEqual("boolean")
            });

            it("must detect Microsoft Windows", function() {
                expect(typeof cor.os.isWin).toEqual("boolean")
            });
        });
    }
);
