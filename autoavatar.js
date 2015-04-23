var AutoAvatar = (function(){
  'use strict';
  var defaultImageSize = 256;
  var defaultGridSize = 8;

  var randomColor = function(hue, saturation, lightness){
    //return 'hsl('+Math.round(Math.random()*360)+','+Math.floor(Math.random()*100)+'%,50%)';
    return 'hsl('+(hue || Math.round(Math.random()*360))+','+(saturation || 50)+'%,'+(lightness || 50)+'%)';
  };

  return {
    generate: function(callback, options){
      options = options || {};
      var imageSize = options.imageSize || defaultImageSize;
      var gridSize = options.gridSize || defaultGridSize;
      var cellSize = imageSize / gridSize;

      var canvas = document.createElement('canvas');

      canvas.width = canvas.height = imageSize;

      canvas.getContext('2d').clearRect(0, 0, imageSize, imageSize);
      canvas.getContext('2d').fillStyle = randomColor(options.hue, options.saturation, options.lightness);

      for(var x = 0; x < imageSize / 2; x += cellSize){
        for(var y = 0; y < imageSize; y += cellSize){
          if(Math.round(Math.random())){
            if(options.multicolored){
              canvas.getContext('2d').fillStyle = randomColor(options.hue, options.saturation, options.lightness);
            }
            canvas.getContext('2d').fillRect(x, y, cellSize, cellSize);
            canvas.getContext('2d').fillRect(imageSize - cellSize - x, y, cellSize, cellSize);
          }
        }
      }

      callback(canvas.toDataURL());
    },
    benchmark: function(n){
      var startTime = window.performance.now();
      for(var i = 0; i < n; i++){
        this.generate(function(){});
      }
      var endTime = window.performance.now();

      console.log('Generated %s avatars in %s ms', n, endTime - startTime);
    }
  };
})();
