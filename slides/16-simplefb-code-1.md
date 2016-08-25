## SimpleFB: Code 1/2

```
function SimpleFramebuffer( width, height, $canvas ) {
  this._$canvas = $canvas;
  this._$canvas.width = this._width = width;
  this._$canvas.height = this._height = height;
  this._ctx = this._$canvas.getContext('2d');
  this._frameBufferData = new Uint8ClampedArray(
  							this._width * this._height * 4
  						  );
  this._frameBuffer = new ImageData(  this._frameBufferData,
  									  this._width,
  									  this._height );
}

SimpleFramebuffer.prototype.clear = function() {  
  this._frameBufferData.fill(0);
}
```