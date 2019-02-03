console.log('2222');

const a = 2;
function f () {
	return () => console.log('arrow', a);
}

f()();
