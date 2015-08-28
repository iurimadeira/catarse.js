describe('AdminInputAction', function(){
  var c = window.c, m = window.m, models = window.c.models,
      AdminInputAction = c.AdminInputAction,
      testModel = m.postgrest.model('test'),
      item = {
        testKey: 'foo'
      },
      ctrl, $output;

  var args = {
        getKey: 'testKey',
        updateKey: 'updateKey',
        callToAction: 'cta',
        innerLabel: 'inner',
        outerLabel: 'outer',
        placeholder: 'place',
        model: testModel,
        updateModel: testModel
      };

  describe('controller', function(){
    beforeAll(function(){
      ctrl = AdminInputAction.controller({data: args, item: item});
    });

    it('should instantiate a submit function', function(){
      expect(ctrl.submit).toBeFunction();
    });
    it('should return a toggler prop', function(){
      expect(ctrl.toggler).toBeFunction();
    });
    it('should return a value property to bind to', function(){
      expect(ctrl.newValue).toBeFunction();
    });
  });

  describe('view', function(){
    beforeEach(function(){
      $output = mq(AdminInputAction, {data: args, item: item});
    });

    it('shoud render the outerLabel on first render', function(){
      expect($output.contains(args.outerLabel)).toBeTrue();
      expect($output.contains(args.innerLabel)).toBeFalse();
      expect($output.contains(args.placeholder)).toBeFalse();
      expect($output.contains(args.callToAction)).toBeFalse();
    });

    describe('on button click', function(){
      beforeEach(function(){
        $output.click('button');
      });

      it('should render an inner label', function(){
        expect($output.contains(args.innerLabel)).toBeTrue();
      });
      it('should render a placeholder', function(){
        expect($output.has('input[placeholder="' + args.placeholder + '"]')).toBeTrue();
      });
      it('should render a call to action', function(){
        expect($output.first('input[type="submit"]').attrs.value).toEqual(args.callToAction);
      });
    });

    describe('on form submit', function(){
      beforeAll(function(){
        spyOn(m, 'request').and.callFake(function(){
          return [{test: true}];
        });
      });
      beforeEach(function(){
        $output.click('button');
      });

      it('should call a submit function on form submit', function(){
        $output.trigger('form', 'submit');
        expect(m.request).toHaveBeenCalled();
      });
    });
  });
});
