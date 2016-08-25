## Meshes: Solution -- Point clouds

We take an object and scan its outside with a laser and/or cameras. We get back a collection of `$(X,Y,Z,R,G,B)$` points.

* **Pros**: simple to render, straightforward to generate
* **Cons**: large files, limited resolution, break modern pipelines, hard to turn into triangles, bad lighting