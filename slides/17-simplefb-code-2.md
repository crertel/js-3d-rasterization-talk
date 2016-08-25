## SimpleFB: Code 2/2

```
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
```