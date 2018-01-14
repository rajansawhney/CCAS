const daba= connect('localhost:27017/CCASdb');
const testVals = [ { cName: 'Tomas', cAddress: 'West Buster' },
  { cName: 'Maxwell', cAddress: 'Port Eugenia' },
	  { cName: 'Rose', cAddress: 'Port Sonyaberg' },
		  { cName: 'Ernestina', cAddress: 'East Sierra' },
			  { cName: 'Lukas', cAddress: 'Lake Maurinetown' } ];
function createUser(val){
	daba.Customer.insert(val)

}

testVals.map(function(val){createUser(val)})
