But our face buffers look like:

```
triangle 1: vertex 1: position index
triangle 1: vertex 1: normal index
triangle 1: vertex 1: uv index
triangle 1: vertex 2: position index
triangle 1: vertex 2: normal index
triangle 1: vertex 2: uv index
triangle 1: vertex 3: position index
triangle 1: vertex 3: normal index
triangle 1: vertex 3: uv index
triangle 2: vertex 1: position index
```

We want to turn our face buffer into a packed set of triangle components!

**What could go wrong?**