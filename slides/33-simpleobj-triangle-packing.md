## SimpleOBJ: Triangle Packing

Our loader gives us a mesh object with vertex, normal, uv, and face buffers.

Unfortunately, our rendering pipeline is going to want buffers in the form:

```
px0|py0|pz0|nx0|ny0|nz0|tu0|tv0| 
px1|py1|pz1|nx1|ny1|nz1|tu1|tv1|
...
```