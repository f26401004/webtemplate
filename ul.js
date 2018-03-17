const sass = require( 'node-sass' );
const pug = require( 'pug' );
const fs = require( 'fs' );

sass.render({file: './source.sass'}, function( err, result){
	fs.writeFile( 'target.css', result.css, function( err, lala ) { console.log(lala)});
	});

const htmlFn = pug.compileFile( 'source.pug', {pretty: true} );

fs.writeFile( 'target.html', htmlFn(), function(){});
