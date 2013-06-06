
var expect = require('chai').expect
  , angular = require('angularjs')
  , contenteditable = require('contenteditable');

describe('contenteditable', function(){
  var ce, input;
  beforeEach(function(){
    ce = angular.element(document.querySelector('[contenteditable]'));
    input = document.getElementsByTagName('input')[0];
  });
  describe('when the scope changes', function(){
    beforeEach(function(){
      ce.scope().text = 'man';
      ce.scope().$digest();
    });
    it('should notice', function(){
      expect(ce.text()).to.eql('man');
    });
  });
  describe('when other input happens', function(){
    beforeEach(function(){
      input.value = 'frominput';
      angular.element(input).triggerHandler('input');
    });
    it('should notice', function(){
      expect(ce.text()).to.eql('frominput');
    });
  });
  describe('when text changes', function(){
    beforeEach(function(){
      ce[0].focus();
      ce.text('fromce');
      ce[0].blur();
    });
    it('should update the scope', function(){
      expect(ce.scope().text).to.eql('fromce');
    });
  });
});

