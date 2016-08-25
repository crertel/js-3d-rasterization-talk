## SimpleOBJ: Some numbers

* Every model has `$N$` triangles.

* Each triangle has 3 vertices.

* Each vertex has 8 components.
  - 3 position coordinates ( `$X,Y,Z$` )
  - 3 normal coordinates ( `$N_x,N_y,N_z$` )
  - 2 texture coordinates ( `$U,V$` )

* Each coordinate is a 4-byte floating point number.

* **To store a model as flat triangles, we need `$96N$` bytes**.