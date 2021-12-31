var fs = require('fs');
var assert = require('assert');
var brotli = require('../');
var decompress = require('../decompress');

describe('brotli', function () {
  describe('decompress', function () {
    fs.readdirSync(__dirname + '/testdata').forEach(function (file) {
      if (!/\.compressed/.test(file)) return;

      it(file, function () {
        var compressed = fs.readFileSync(__dirname + '/testdata/' + file);
        var expected = fs.readFileSync(
          __dirname + '/testdata/' + file.replace(/\.compressed.*/, ''),
        );
        var result = decompress(compressed);
        assert.deepEqual(new Buffer(result), expected);
      });
    });
  });

  describe('roundtrip', function () {
    var files = ['alice29.txt', 'asyoulik.txt', 'lcet10.txt', 'plrabn12.txt'];
    files.forEach(function (file) {
      it(file, function () {
        this.timeout(10000);
        var input = fs.readFileSync(__dirname + '/testdata/' + file);
        var compressed = compress(input);
        var decompressed = decompress(compressed);
        assert.deepEqual(new Buffer(decompressed), input);
      });
    });
  });
});
