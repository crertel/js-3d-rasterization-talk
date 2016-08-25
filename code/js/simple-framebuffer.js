function SimpleFramebuffer( width, height, $canvas ) {
  this._$canvas = $canvas
  this._$canvas.width = this._width = width;
  this._$canvas.height = this._height = height;
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

  var pixelBaseIndex = 4 * (x + (y*this._width));
  this._frameBufferData[ pixelBaseIndex + 0] = r;
  this._frameBufferData[ pixelBaseIndex + 1] = g;
  this._frameBufferData[ pixelBaseIndex + 2] = b;
  this._frameBufferData[ pixelBaseIndex + 3] = a;
}