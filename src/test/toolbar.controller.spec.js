describe("Test Suite", function(){
	beforeEach(module('ng1-init'));
	
	var controller, vm, rootScope;
	
	beforeEach(inject(function(_$controller_, _$rootScope_){
		controller = _$controller_;
		rootScope = _$rootScope_;
		vm = controller("ToolbarController", {$rootScope: rootScope});
	}));

	it("should initialize the scope", function(){
		expect(vm).toBeDefined();
	});
})