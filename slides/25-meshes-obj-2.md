## Meshes: Wavefront OBJ 2/3

Geometry is made by indexing into a collection of vertices, texture coordinates, and normals:

```
v 1.0 2.0 3e-4
vt 0.0 1.0 0.5
vn 1.0 0.0 0.0
```

Faces are made by indexing those declared features:

```
f 1/1/1/ 2/2/2 3/3/3
```

Faces can be in any of 4 forms:
```
f v1 v2 v3
f v1/vt1 v2/vt2 v3/vt3
f v1//vn1 v2//vn2 v3//vn3
f v1/vt1/vn1 v2/vt2/vn2 v3/vt3/vn3
```

Faces can even have more than 3 vertices. We ignore that.