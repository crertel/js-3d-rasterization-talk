function Bitmap( width, height, $container ) {
  this._width = width;
  this._height = height;
  this._$canvas = document.createElement( 'canvas' );
  this._$canvas.width = width;
  this._$canvas.height = height;
  $container.appendChild( this._$canvas );
  this._ctx = this._$canvas.getContext('2d');
  this._frameBufferData = new Uint8ClampedArray( this._width * this._height * 4 );
  this._frameBuffer = new ImageData(  this._frameBufferData, this._width, this._height );
  this._depthBuffer = new Float32Array( this._width * this._height );

  this.kDepthFunc = {
    NEVER: 0,
    LESS: 1,
    EQUAL: 2,
    LEQUAL: 3,
    GREATER: 4,
    NEQUAL: 5,
    GEQUAL: 6,
    ALWAYS: 7
  };

  this._depthFunc = this.kDepthFunc.ALWAYS;
}

Bitmap.prototype.clear = function() {
  this._depthBuffer.fill(0);
  this._frameBufferData.fill(Math.Infinity);
}

Bitmap.prototype.flush = function() {
  this._ctx.putImageData(this._frameBuffer,0,0);
}

Bitmap.prototype.setDepthFunc = function( depthFunc ) {
  this._depthFunc = depthFunc;
}

Bitmap.prototype.doDepthTest = function( currentDepth, newDepthTest ) {
  var ret = false;
  switch (this._depthFunc) {
    case this.kDepthFunc.ALWAYS:  ret = true; break;
    case this.kDepthFunc.NEVER:   ret = false; break;
    case this.kDepthFunc.LESS:    ret = (currentDepth > newDepthTest);    break;
    case this.kDepthFunc.EQUAL:   ret = (currentDepth === newDepthTest);  break;
    case this.kDepthFunc.LEQUAL:  ret = (currentDepth >= newDepthTest);   break;
    case this.kDepthFunc.NEQUAL:  ret = (currentDepth !== newDepthTest);  break;
    case this.kDepthFunc.GEQUAL:  ret = (currentDepth <= newDepthTest);   break;
    case this.kDepthFunc.GREATER: ret = (currentDepth < newDepthTest);    break;
  }
  return ret;
}

Bitmap.prototype.putPixel = function(x, y, r, g, b, a, z ){
  x = Math.floor(x);
  y = Math.floor(y);

  var depthRowStride = this._width * 4;
  var depthBaseIndex = (x) + (y* depthRowStride);

  var imageRowStride = this._width * 4;
  var pixelBaseIndex = (4*x) + (y* imageRowStride);

  if ( this.doDepthTest( this._depthBuffer[depthBaseIndex],z ) ) {
    this._frameBufferData[ pixelBaseIndex + 0] = r;
    this._frameBufferData[ pixelBaseIndex + 1] = g;
    this._frameBufferData[ pixelBaseIndex + 2] = b;
    this._frameBufferData[ pixelBaseIndex + 3] = a;
    this._depthBuffer[ depthBaseIndex ] = z;
  }
}

console.log("Loaded bitmap shim.");
