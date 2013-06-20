
var expect = require('chai').expect
  , angular = require('angularjs')
  , contenteditable = require('contenteditable');

var bootstrap = function (src, mainModule) {
  var parent = document.createElement('div');
  parent.innerHTML = src;
  var node = parent.firstElementChild;
  document.body.appendChild(node);
  angular.bootstrap(node, [mainModule]);
  return node;
};

var TPL = '<form name="form"><div contenteditable ng-model="text">Text</div>' +
            '<input ng-model="text" name="input" type="text">{{text}}</form>';

describe('contenteditable', function(){
  var ce, input, container;
  beforeEach(function(){
    container = bootstrap(TPL, 'contenteditable');
    ce = angular.element(document.querySelector('[contenteditable]', container));
    input = document.getElementsByTagName('input')[0];
  });
  afterEach(function(){
    container.parentNode.removeChild(container);
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

