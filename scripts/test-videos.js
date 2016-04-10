/*eslint no-console: 0 */

require('colors');
var request = require('request');

var requiredir = require( 'requiredir' );
var data = requiredir( '../data' );

var categories = Object.keys(data).filter(key => data[key].videos);
var videos = [].concat.apply([], categories.map(key => {
  return Object.keys( data[key].videos ).map(videosKey => {
    var video = data[key].videos[videosKey];
    video.category = data[key].title;
    return video;
  });
}));


function validate(video, videos){
  console.log('VALIDATING: '.bold + video.category.toUpperCase() + ' ' +video.title);
  request(`http://noembed.com/embed?url=${video.url}`, function(err, res, body) {
    if( err || JSON.parse(body).error ) {
      console.error(` FAILED: ${video.url}`.red);
      console.error(' ' + (err || JSON.parse(body).error));
      process.exit(1);
    } else {
      console.log(` GREAT: ${video.url}`.green);
      if (videos.length){
        validate(videos.shift(), videos);
      } else {
        console.log(`\nALL GOOD!`.bold.green);
        process.exit(0);
      }
    }
  });
}


validate(videos.shift(), videos);
