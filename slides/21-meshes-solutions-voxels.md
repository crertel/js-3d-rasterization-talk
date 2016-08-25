## Meshes: Solution -- Voxels

We take an object and turn it into cubes. We get back a collection of `$(X,Y,Z,R,G,B)$` cubes.

* **Pros**: straightforward to generate, can be converted to triangles, support really cool effects
* **Cons**: potentially large files, limited resolution, break modern pipelines, bad lighting