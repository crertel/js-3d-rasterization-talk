function SimpleFramebuffer( width, height, $container ) {
  this._width = width;
  this._height = height;
  this._$canvas = document.createElement( 'canvas' );
  this._$canvas.width = width;
  this._$canvas.height = height;
  $container.appendChild( this._$canvas );
  this._ctx = this._$canvas.getContext('2d');
  this._frameBufferData = new Uint8ClampedArray( this._width * this._height * 4 );
  this._frameBuffer = new ImageData(  this._frameBufferData, this._width, this._height );
}

SimpleFramebuffer.prototype.clear = function() {  
  this._frameBufferData.fill(0);
}

SimpleFramebuffer.prototype.flush = function() {
  this._ctx.putImageData(this._frameBuffer,0,0);
}

SimpleFramebuffer.prototype.putPixel = function(x, y, r, g, b, a){
  x = Math.floor(x);
  y = Math.floor(y);

  var imageRowStride = this._width * 4;
  var pixelBaseIndex = (4*x) + (y* imageRowStride);

  this._frameBufferData[ pixelBaseIndex + 0] = r;
  this._frameBufferData[ pixelBaseIndex + 1] = g;
  this._frameBufferData[ pixelBaseIndex + 2] = b;
  this._frameBufferData[ pixelBaseIndex + 3] = a;
}