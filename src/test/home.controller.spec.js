describe('TEST SUITE', function(){
	describe('Testing HomeController', function(){
		
		beforeEach(module('ng1-init'));

		var vm, controller, rootScope;
		var testData = {
			albums: {
				'items': [{
					name: 'beat it'
				}],
				'prev':null,
				'next': null,
				'offset': 0,
				'limit': 20,
				'total': 1
			}, 
			artists: {
				'items':[],
				'prev':null,
				'next': null,
				'offset': 0,
				'limit': 20,
				'total': 0
			}
		};

		beforeEach(inject(function(_$controller_, _$rootScope_, _$timeout_, _msApi_, _$mdDialog_){
			controller = _$controller_;
			rootScope = _$rootScope_;
			vm = controller('HomeController', {
				$rootScope: rootScope
			});
			spyOn(vm, 'showArtistDetail');
		}));

		it('should set title,version on load', function(){
			expect(vm.title).toBe('Music Search App');
        	expect(vm.version).toBe('0.1');
        	expect(vm.results).toBeDefined();
		});

		it('should set and extend vm.results when $rootScope.$emit(RESULTS.FOUND)', function(){
			
			rootScope.$emit('RESULTS.FOUND', testData);
			expect(vm.results).toEqual(Object(testData));

			// check if vm.results extend with new data
			var data2 = {
				artists: {
					'items': [{
						name: 'Micheal Jackson'
					}],
					'prev':null,
					'next': null,
					'offset': 0,
					'limit': 20,
					'total': 1
				}
			};
			var expectedData = {
				albums: {
					'items': [{
						name: 'beat it'
					}],
					'prev':null,
					'next': null,
					'offset': 0,
					'limit': 20,
					'total': 1
				}, 
				artists: {
					'items': [{
						name: 'Micheal Jackson'
					}],
					'prev':null,
					'next': null,
					'offset': 0,
					'limit': 20,
					'total': 1
				}
			};
			rootScope.$emit('RESULTS.FOUND', data2);
			expect(vm.results).toEqual(Object(expectedData));
		});

		it("vm.resultsCountAsString() should return valid numbers", function(){
			rootScope.$emit('RESULTS.FOUND', testData);
			expect(vm.resultsCountAsString('albums')).toBe('Showing 1 - 1 of 1')
			expect(vm.resultsCountAsString('artists')).toBe('No artists found')
		});

		it("vm.prev() should emit relevant params", function(){
			rootScope.$emit('RESULTS.FOUND', testData);
			rootScope.$on('QUERY.PREV.RESULTS', function(Event, resolver){
				expect(resolver).toEqual(Object({"offset":0,"limit":20,"type":"albums"}));
			});
			vm.prev('albums');
		});

		it("vm.next() should emit relevant params", function(){
			rootScope.$emit('RESULTS.FOUND', testData);
			rootScope.$on('QUERY.NEXT.RESULTS', function(Event, resolver){
				expect(resolver).toEqual(Object({"offset":20,"limit":20,"type":"albums"}));
			});
			vm.next('albums');
		});
	});
});