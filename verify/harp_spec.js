var expect = require("chai").expect;
var connect = require("connect");
var request = require("supertest");
var harp = require("../");

var root = __dirname + "/assets";

describe("Implement jade template rendering",function() {
  var jade;

  before(function() {
    jade = connect().use(require("../lib/processor/jade")(root));
  });


  it("should return 200 for /foo.html",function(done) {
    request(jade)
      .get("/foo.html")
      .expect(200)
      .end(done);
  });

  it("should render foo.jade for /foo.html",function(done) {
    request(jade)
      .get("/foo.html")
      .expect("<b>hello from foo.jade</b>")
      .end(done);
  });

  it("should 404 for /not-found.html", function(done) {
    request(jade)
      .get("/not-found.html")
      .expect(404)
      .end(done);
  });

  // it("should return 500 for /foo.jade");

  // it("should return 500 if path contains relative segment ..",function(done) {
  //   request(jade)
  //     .get("/../foo.html")
  //     .expect(403)
  //     .end(done);
  // });
});

describe("Add jade preprocessor to the mini-harp app",function() {
  var app = harp(root);
  it("should serve /foo.html if foo.html does not exist but foo.jade does",function(done) {
    request(app)
      .get("/foo.html")
      .expect("<b>hello from foo.jade</b>")
      .end(done);
  });

  it("should serve /bar.html if bar.html exists",function(done) {
    request(app)
      .get("/bar.html")
      .expect("hello from bar.html")
      .end(done);
  });
});

describe("Implement less template rendering",function() {
  var css;
  before(function() {
    css = connect().use(require("../lib/processor/less")(root));
  });

  it("should return 200 for /foo.css",function(done) {
    request(css)
      .get("/foo.css")
      .expect(200)
      .end(done);
  });

  it("should render foo.less for /foo.css",function(done) {
    request(css)
      .get("/foo.css")
      .expect(".foo {\n  width: 500px;\n}\n")
      .end(done);
  });

  it("should 404 for /not-found.css", function(done) {
    request(css)
      .get("/not-found.css")
      .expect(404)
      .end(done);
  });
});

describe("Add less preprocessor to the mini-harp app",function() {
  var app = harp(root);
  it("should serve /foo.css if foo.css does not exist but foo.less does",function(done) {
    request(app)
      .get("/foo.css")
      .expect(".foo {\n  width: 500px;\n}\n")
      .end(done);
  });

  it("should serve /bar.css if bar.css exists",function(done) {
    request(app)
      .get("/bar.css")
      .expect(".bar {}")
      .end(done);
  });
});

describe("The root path should render index.html",function() {
  var app = harp(root);

  it("should render index",function(done) {
    request(app)
      .get("/")
      .expect("<b>hello from index.jade</b>")
      .end(done);
  });
});

describe("Should not respond to .jade or .less",function() {
  var app = harp(root);

  it("should return 404 for /index.jade",function(done) {
    request(app)
      .get("/index.jade")
      .expect(404)
      .end(done);
  });

  it("should return 404 for /foo.less",function(done) {
    request(app)
      .get("/foo.less")
      .expect(404)
      .end(done);
  });
});

describe("No chunked transfer for .jade or .less",function() {
  var app = harp(root);

  it("disables chunking for jade",function(done) {
    request(app)
      .get("/foo.html")
      .expect("Content-Length",26)
      .end(done);
  });

  it("disables chunking for less",function(done) {
    request(app)
      .get("/foo.css")
      .expect("Content-Length",25)
      .end(done);
  });
});

describe("Set content type for .jade or .less",function() {
  var app = harp(root);

  it("set content type for jade",function(done) {
    request(app)
      .get("/foo.html")
      .expect("Content-Type","text/html; charset=UTF-8")
      .end(done);
  });

  it("set content type for less",function(done) {
    request(app)
      .get("/foo.css")
      .expect("Content-Type","text/css; charset=UTF-8")
      .end(done);
  });
});