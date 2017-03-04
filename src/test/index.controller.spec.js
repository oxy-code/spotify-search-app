describe('TEST SUITE', function(){
	describe('Testing IndexController', function(){
		it('should initialize the title in the scope', function(){
			module('ng1-init');

			var vm;

			inject(function($controller){
				vm = $controller('IndexController');
			});

			expect(vm.title).toBeDefined();
			expect(vm.title).toBe('IndexController');
		});
	});
});