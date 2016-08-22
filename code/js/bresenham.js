function bresenhamLine( canvas, p0x, p0y, p1x, p1y, r, g, b, a) {
  var dx = p1x - p0x;
  var dy = p1y - p0y;
  var dydx = dy / dx;
  var dxdy = dx / dy;

  // this check causes us to draw along the least-degenerate case
  if ( Math.abs(dx) >= Math.abs(dy) ) {
    for ( var i = 0; i < Math.abs(dx); i++ ) {
      // this handles case where points are in inconvenient order
      canvas.putPixel(  (dx > 0) ? (i + p0x) : (-i  + p0x),
                        (dx > 0) ? (i*dydx + p0y) : (-i*dydx + p0y),
                        r,g,b,a);
    }
  } else {
    for ( var i = 0; i < Math.abs(dy); i++ ) {
      // inconvenient check as in above
      canvas.putPixel(  (dy > 0) ? (i*dxdy + p0x) : (-i*dxdy + p0x),
                        (dy > 0) ? (i + p0y) : (-i + p0y),
                        r,g,b,a);
    }
  }
}