// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var $web = $("li.web");
var $lastLi = $("li.last");
var x = localStorage.getItem("x");
var xObject = JSON.parse(x);
var hashTable = xObject || [{
  logo: "A",
  url: "https://www.acfun.cn"
}, {
  logo: "B",
  url: "https://bilibili.com"
}];

var simplyUrl = function simplyUrl(url) {
  return url.replace("https://", "").replace("http://", "").replace("www.", "").replace(/\/.*/, "");
};

var render = function render() {
  $(".li").remove();
  hashTable.forEach(function (node, index) {
    var $li = $("<li class='li'>\n          \n              <div class=\"site\">\n                <div class=\"logo\">".concat(simplyUrl(node.url)[0], "</div>\n                <div class=\"link\">").concat(simplyUrl(node.url), "</div>\n                <div class=\"close\">\n                    <svg class=\"icon\">\n                        <use xlink:href=\"#icon-shanchu\"></use>\n                    </svg>\n                </div>\n              </div>\n \n          </li>")).insertBefore($lastLi);
    $li.on("click", function () {
      window.open(node.url);
    });
    $li.on("click", ".close", function (e) {
      e.stopPropagation();
      hashTable.splice(index, 1);
      render();
    });
  });
};

render();
$(".addButton").on("click", function () {
  var url = window.prompt("请输入想要添加的网址");

  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }

  hashTable.push({
    logo: simplyUrl(url)[0],
    url: url
  });
  render();
});

window.onbeforeunload = function () {
  console.log("页面要关闭了");
  var string = JSON.stringify(hashTable);
  console.log(_typeof(hashTable));
  console.log(hashTable);
  console.log(_typeof(string));
  console.log(string);
  localStorage.setItem("x", string);
};

console.log(hashTable);
$(document).on("keypress", function (e) {
  var key = e.key;
  console.log(key);
  console.log(hashTable);
  var hashMap = [{
    logo: "M",
    url: "https://developer.mozilla.org/zh-CN/"
  }, {
    logo: "E",
    url: "https://es6.ruanyifeng.com/"
  }, {
    logo: "C",
    url: "https://cssgradient.io/"
  }, {
    logo: "T",
    url: "https://css-tricks.com/"
  }, {
    logo: "G",
    url: "https://github.com/"
  }, {
    logo: "S",
    url: "https://stackoverflow.com/"
  }, {
    logo: "R",
    url: "https://reactjs.org/"
  }, {
    logo: "V",
    url: "https://cn.vuejs.org/"
  }, {
    logo: "J",
    url: "https://www.jquery123.com/"
  }];

  for (var i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }

  for (var _i = 0; _i < hashTable.length; _i++) {
    if (hashTable[_i].logo.toLowerCase() === key) {
      window.open(hashTable[_i].url);
    }
  }
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.09b67acf.js.map