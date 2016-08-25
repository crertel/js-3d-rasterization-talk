## SimpleFB: HTML Canvas is Bad

`<canvas>` and `CanvasRenderingContext2D` is not what we need.

* It lacks a way of setting individual pixels--is path API.
* `putImageData` every pixel is **slow**.

We want something we can bang against and occasionally flush to the canvas element. 
