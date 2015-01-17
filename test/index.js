'use strict';

var code = require('code');
var lab = module.exports.lab = require('lab').script();

var expect = code.expect;
var describe = lab.describe;
var it = lab.it;

var bcp47 = require('../lib');

describe('bcp47', function () {
  it('returns null when the tag does not match the regular expression',
      function (done) {
    expect(bcp47.parse('.')).to.be.null();
    done();
  });

  describe('langtag', function () {
    describe('language', function () {
      it('{2,3} alpha, 2', function (done) {
        var tag = bcp47.parse('aa');
        expect(tag.langtag.language.language).to.be.equal('aa');
        expect(tag.langtag.language.extlang).to.be.an.array().and.to.be.empty();
        done();
      });

      it('{2,3} alpha, 3', function (done) {
        var tag = bcp47.parse('aaa');
        expect(tag.langtag.language.language).to.be.equal('aaa');
        expect(tag.langtag.language.extlang).to.be.an.array().and.to.be.empty();
        done();
      });

      it('{4} alpha', function (done) {
        var tag = bcp47.parse('aaaa');
        expect(tag.langtag.language.language).to.be.equal('aaaa');
        expect(tag.langtag.language.extlang).to.be.an.array().and.to.be.empty();
        done();
      });

      it('{5,8} alpha, 5', function (done) {
        var tag = bcp47.parse('aaaaa');
        expect(tag.langtag.language.language).to.be.equal('aaaaa');
        expect(tag.langtag.language.extlang).to.be.an.array().and.to.be.empty();
        done();
      });

      it('{5,8} alpha, 6', function (done) {
        var tag = bcp47.parse('aaaaaa');
        expect(tag.langtag.language.language).to.be.equal('aaaaaa');
        expect(tag.langtag.language.extlang).to.be.an.array().and.to.be.empty();
        done();
      });

      it('{5,8} alpha, 7', function (done) {
        var tag = bcp47.parse('aaaaaaa');
        expect(tag.langtag.language.language).to.be.equal('aaaaaaa');
        expect(tag.langtag.language.extlang).to.be.an.array().and.to.be.empty();
        done();
      });

      it('{5,8} alpha, 8', function (done) {
        var tag = bcp47.parse('aaaaaaaa');
        expect(tag.langtag.language.language).to.be.equal('aaaaaaaa');
        expect(tag.langtag.language.extlang).to.be.an.array().and.to.be.empty();
        done();
      });

      it('language with 1 extlang', function (done) {
        var tag = bcp47.parse('aa-bbb');
        expect(tag.langtag.language.language).to.be.equal('aa');
        expect(tag.langtag.language.extlang).to.only.include(['bbb']);
        done();
      });

      it('language with 2 extlang', function (done) {
        var tag = bcp47.parse('aaa-bbb-ccc');
        expect(tag.langtag.language.language).to.be.equal('aaa');
        expect(tag.langtag.language.extlang).to.only.include(['bbb', 'ccc']);
        done();
      });

      it('language with 3 extlang', function (done) {
        var tag = bcp47.parse('aa-bbb-ccc-ddd');
        expect(tag.langtag.language.language).to.be.equal('aa');
        expect(tag.langtag.language.extlang).to.only
            .include(['bbb', 'ccc', 'ddd']);
        done();
      });
    });

    describe('script', function () {
      it('script', function (done) {
        var tag = bcp47.parse('aa-bbbb');
        expect(tag.langtag.language.language).to.be.equal('aa');
        expect(tag.langtag.script).to.be.equal('bbbb');
        done();
      });
    });

    describe('region', function () {
      it('{2} alpha', function (done) {
        var tag = bcp47.parse('aa-bb');
        expect(tag.langtag.language.language).to.be.equal('aa');
        expect(tag.langtag.region).to.be.equal('bb');
        done();
      });

      it('{3} digit', function (done) {
        var tag = bcp47.parse('aa-111');
        expect(tag.langtag.language.language).to.be.equal('aa');
        expect(tag.langtag.region).to.be.equal('111');
        done();
      });

      it('region with script', function (done) {
        var tag = bcp47.parse('aa-bbbb-cc');
        expect(tag.langtag.language.language).to.be.equal('aa');
        expect(tag.langtag.script).to.be.equal('bbbb');
        expect(tag.langtag.region).to.be.equal('cc');
        done();
      });
    });

    describe('variant', function () {
      it('1 variant', function (done) {
        var tag = bcp47.parse('aa-b1b1b');
        expect(tag.langtag.language.language).to.be.equal('aa');
        expect(tag.langtag.variant).to.only.include(['b1b1b']);
        done();
      });

      it('3 variant', function (done) {
        var tag = bcp47.parse('aa-b1b1b-6a8b-cccccc');
        expect(tag.langtag.language.language).to.be.equal('aa');
        expect(tag.langtag.variant).to.only
            .include(['b1b1b', '6a8b', 'cccccc']);
        done();
      });

      it('2 extlang with 3 variant', function (done) {
        var tag = bcp47.parse('aa-bbb-ccc-1111-ccccc-b1b1b');
        expect(tag.langtag.language.language).to.be.equal('aa');
        expect(tag.langtag.variant).to.only.include(['1111', 'ccccc', 'b1b1b']);
        expect(tag.langtag.language.extlang).to.only.include(['bbb', 'ccc']);
        done();
      });
    });

    describe('extension', function () {
      it('extension', function (done) {
        var tag = bcp47.parse('aa-7-123abc-abc-a-12');
        expect(tag.langtag.language.language).to.be.equal('aa');
        expect(tag.langtag.extension).to.only.deep.include(
          [
            {
              singleton: '7',
              extension: ['123abc', 'abc']
            },
            {
              singleton: 'a',
              extension: ['12']
            }
          ]
        );
        done();
      });
    });

    describe('privateuse', function () {
      it('extension', function (done) {
        var tag = bcp47.parse('aa-x-1234ab-d');
        expect(tag.langtag.language.language).to.be.equal('aa');
        expect(tag.langtag.privateuse).to.only.include(['1234ab', 'd']);
        done();
      });
    });

    describe('all', function () {
      it('all', function (done) {
        var tag = bcp47.parse('aaa-bbb-ccc-ddd-abcd-123-abc123-0abc-b-01-' +
          'abc123-x-01ab-abc12');
        expect(tag.langtag.language.language).to.be.equal('aaa');
        expect(tag.langtag.language.extlang).to.only
            .include(['bbb', 'ccc', 'ddd']);
        expect(tag.langtag.script).to.be.equal('abcd');
        expect(tag.langtag.region).to.be.equal('123');
        expect(tag.langtag.variant).to.only.include(['abc123', '0abc']);
        expect(tag.langtag.extension).to.only.deep.include([{
          singleton: 'b',
          extension: ['01', 'abc123']
        }]);
        expect(tag.langtag.privateuse).to.only.include(['01ab', 'abc12']);
        done();
      });
    });
  });

  describe('privateuse', function () {
    it('privateuse', function (done) {
      var tag = bcp47.parse('x-111-aaaaa-BBB');
      expect(tag.privateuse).to.only.include(['111', 'aaaaa', 'BBB']);

      tag = bcp47.parse('x-a');
      expect(tag.privateuse).to.only.include(['a']);

      tag = bcp47.parse('x-1-2-a-b');
      expect(tag.privateuse).to.only.include(['1', '2', 'a', 'b']);

      done();
    });
  });

  describe('grandfathered', function () {
    it('irregular', function (done) {
      var arr = ['en-GB-oed', 'i-ami', 'i-bnn', 'i-default', 'i-enochian',
          'i-hak', 'i-klingon', 'i-lux', 'i-mingo', 'i-navajo', 'i-pwn',
          'i-tao', 'i-tay', 'i-tsu', 'sgn-BE-FR', 'sgn-BE-NL', 'sgn-CH-DE'];
      arr.forEach(function (str) {
        expect(bcp47.parse(str).grandfathered.irregular).to.be.equal(str);
      });
      done();
    });

    it('regular', function (done) {
      var arr = ['art-lojban', 'cel-gaulish', 'no-bok', 'no-nyn', 'zh-guoyu',
          'zh-hakka', 'zh-min', 'zh-min-nan', 'zh-xiang'];
      arr.forEach(function (str) {
        expect(bcp47.parse(str).grandfathered.regular).to.be.equal(str);
      });
      done();
    });
  });
});