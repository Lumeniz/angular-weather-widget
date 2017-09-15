/**
 * Created by Тим on 15.09.2017.
 */
var fs = require('fs');
var cities = require('./src/app/city.list.js');

var cities_ua = [];

console.log('Start fetching');
console.log('Pass: ');

function formattingToTs( data ){
    return 'export const cities =' + JSON.stringify( data );
}


for( var i in cities ){
    var city = cities[i];
    if ( city.country.toUpperCase() == "UA")
        cities_ua.push( city )

    if ( i%100 == 0){
        console.log( i );
    }
}


fs.writeFile('./src/app/city.ua.list.ts', formattingToTs( cities_ua ), function(err){
    if (err) throw err;
    console.log('The file has been saved!');
});

console.log( 'Finished. Matched cities: ', cities_ua.length );

