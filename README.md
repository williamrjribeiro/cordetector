# CoR Detector

**Chain of Responsibility Detector**

This is just a learning project. The main topicts that I wanted to lear by doing are:

1. JavaScript Design Patterns: I implemented the generic [Chain of Responsibility](http://www.as3dp.com/2012/01/from-actionscript-3-0-to-javascript-chain-of-responsibility-part-ii-the-help-desk/) and the very JS specific [Revealing Module](http://weblogs.asp.net/dwahlin/archive/2011/08/02/techniques-strategies-and-patterns-for-structuring-javascript-code-revealing-module-pattern.aspx).
2. [DOJO Toolkit](http://dojotoolkit.org/): it's a very popular and powerful JavaScript framework that is AMD compatible. I'm using release-1.9.0.
3. Asynchronous Module Definition [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD): the library modules should be primarely compatible with DOJO 1.9 but also with other loaders like [RequireJS](http://requirejs.org/)
4. [Behaviour-Driven Development](http://behaviour-driven.org/Introduction) with [Jasmine](https://github.com/pivotal/jasmine/wiki): this [project](https://github.com/podefr/jasmine-reqjs-jstd) glues everything together.
5. Git and Github: this is my first open source project hosted here. [:
6. Create JavaScript code that is compatible with [JSHint](http://www.jshint.com).

This library and the sample code is Open Source under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.html).

**Author(s):**

* [William R. J. Ribeiro](https://github.com/williamrjribeiro) [@bill_bsb](http://twitter.com/bill_bsb), will at williamrjribeiro dot com)

## Roadmap
**Version 1**

Initial release.

- Detects two browsers: Internet Explorer and Firefox.
- Detects two OS: Windows and OSX.
- [ASTAH](http://astah.net/editions/community) class diagram.
- Validated by JSHint
- No Jasmine unit tests.
- Not AMD compatible.

**Version 2**

- Detects two additional browsers: Google Chrome and Apple Safari.
- Refactor code to be AMD compatible and use DOJO's loader.
- Implement Jasmine unit tests for all modules.
- Simplify the API
- Use [Dojo's DTL](http://dojotoolkit.org/reference-guide/1.9/dojox/dtl.html#dojox-dtl) engine which is basically [Django](https://docs.djangoproject.com/en/1.2/topics/templates/)

## Disclaimer

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

