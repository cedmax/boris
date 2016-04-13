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


function validateVideos(video, videos){
  console.log('VALIDATING: '.bold + video.category.toUpperCase() + ' ' +video.title);
  request(`http://noembed.com/embed?url=${video.url}`, function(err, res, body) {
    if( err || JSON.parse(body).error ) {
      console.error(` FAILED: ${video.url}`.red);
      console.error(' ' + (err || JSON.parse(body).error));
      process.exit(1);
    } else {
      console.log(` GREAT: ${video.url}`.green);
      if (videos.length){
        validateVideos(videos.shift(), videos);
      } else {
        console.log(`\nALL GOOD!`.bold.green);
      }
    }
  });
}

function validateGifs(videos){
  console.log('VALIDATING GIF HTTPS'.bold);

  var invalidGifs = videos.filter(function(video){
    return video.gif &&
      !/^(https:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?.gif$/.test(video.gif);
  });
  if (invalidGifs.length){
    console.error(` HTTPS FAILED:
      ${invalidGifs.map(
        function(video){
          return video.title.white.bold + '\n      ' + video.gif.red + '\n';
        })
      }`.red.bold
    );
    process.exit(1);
  } else {
    console.log(`ALL GOOD! \n`.bold.green);
  }
}

validateGifs(videos);
validateVideos(videos.shift(), videos);
