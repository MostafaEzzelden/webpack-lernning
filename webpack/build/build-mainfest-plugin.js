const path = require('path');

function BuildMainfestPlugin () { }


BuildMainfestPlugin.prototype.apply = function (compiler) {

	// compiler.plugin('done', this.writeMainfestFile);

	compiler.plugin('emit', (compiler, callback) => {

		let mainfest  = JSON.stringify(compiler.getStats().toJson().assetsByChunkName)

		compiler.assets['mainfest.josn'] = {

			source: function() {
				return mainfest;
			},

			size: function() {
				return mainfest.length
			}
		};


		callback();



	});


}


// BuildMainfestPlugin.prototype.writeMainfestFile = function(stats) {
// 	require('fs').writeFileSync(path.resolve('dist/mainfest.json'), JSON.stringify(stats.toJson().assetsByChunkName))
// }


module.exports = BuildMainfestPlugin;