var less = require('less');
var parser = new(less.Parser);

less.render('.class{width: (1 + 1)}', function(e, css) {
	console.log(css);
});

parser.parse('.class{ width: { width: (1 + 1)', function(err, tree) {
	if(err) {
		return console.error(err);
	}
	console.log(tree.toCSS);
});

