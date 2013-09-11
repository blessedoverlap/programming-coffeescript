(function() {
  var Application, CoffeeScript, JavaScriptProcessor, Processor, PublicProcessor, fs, http, ip, port, server, url, _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  http = require('http');

  url = require('url');

  fs = require('fs');

  CoffeeScript = require('coffee-script');

  port = 3000;

  ip = "127.0.0.1";

  Application = (function() {
    function Application(req, res) {
      this.req = req;
      this.res = res;
      this.pathInfo = url.parse(this.req.url, true);
    }

    Application.prototype.process = function() {
      if (/^\/javascripts\//.test(this.pathInfo.pathname)) {
        return new JavaScriptProcessor(this.req, this.res, this.pathInfo).process();
      } else {
        return new PublicProcessor(this.req, this.res, this.pathInfo).process();
      }
    };

    return Application;

  })();

  Processor = (function() {
    function Processor(req, res, pathInfo) {
      this.req = req;
      this.res = res;
      this.pathInfo = pathInfo;
    }

    Processor.prototype.contentType = function() {
      throw new Error("must be implemented!");
    };

    Processor.prototype.process = function() {
      throw new Error("must be implemented!");
    };

    Processor.prototype.pathname = function() {
      return this.pathInfo.pathname;
    };

    Processor.prototype.write = function(data, status, headers) {
      if (status == null) {
        status = 200;
      }
      if (headers == null) {
        headers = {};
      }
      headers["Content-Type"] || (headers["Content-Type"] = this.contentType());
      headers["Content-Length"] || (headers["Content-Length"] = Buffer.byteLength(data, "utf-8"));
      this.res.writeHead(status, headers);
      this.res.write(data, "utf-8");
      return this.res.end();
    };

    return Processor;

  })();

  JavaScriptProcessor = (function(_super) {
    __extends(JavaScriptProcessor, _super);

    function JavaScriptProcessor() {
      _ref = JavaScriptProcessor.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    JavaScriptProcessor.prototype.contentType = function() {
      return "application/x-javascript";
    };

    JavaScriptProcessor.prototype.process = function() {
      var _this = this;
      return fs.readFile("src/" + (this.pathname()), "utf-8", function(err, data) {
        if (err != null) {
          return _this.write("", 404);
        } else {
          return _this.write(CoffeeScript.compile(data));
        }
      });
    };

    JavaScriptProcessor.prototype.pathname = function() {
      var file;
      file = (/\/javascripts\/(.+)\.js/.exec(this.pathInfo.pathname))[1];
      return "" + file + ".coffee";
    };

    return JavaScriptProcessor;

  })(Processor);

  PublicProcessor = (function(_super) {
    __extends(PublicProcessor, _super);

    function PublicProcessor() {
      _ref1 = PublicProcessor.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    PublicProcessor.prototype.contentType = function() {
      var ext;
      ext = (/\.(.+)$/.exec(this.pathname()))[1].toLowerCase();
      switch (ext) {
        case "png":
        case "jpg":
        case "jpeg":
        case "gif":
          return "image/" + ext;
        case "css":
          return "text/css";
        default:
          return "text/html";
      }
    };

    PublicProcessor.prototype.process = function() {
      var _this = this;
      return fs.readFile("public/" + (this.pathname()), "utf-8", function(err, data) {
        if (err != null) {
          return _this.write("Oops! We couldn't find the page you were looking for.", 404);
        } else {
          return _this.write(data);
        }
      });
    };

    PublicProcessor.prototype.pathname = function() {
      if (!this._pathname) {
        if (this.pathInfo.pathname === "/" || this.pathInfo.pathname === "") {
          this.pathInfo.pathname = "index";
        }
        if (!/\..+$/.test(this.pathInfo.pathname)) {
          this.pathInfo.pathname += ".html";
        }
      }
      this._pathname = this.pathInfo.pathname;
      return this._pathname;
    };

    return PublicProcessor;

  })(Processor);

  server = http.createServer(function(req, res) {
    var app;
    app = new Application(req, res);
    return app.process();
  });

  server.listen(port, ip);

  console.log("Server running at http://" + ip + ":" + port + "/");

}).call(this);
