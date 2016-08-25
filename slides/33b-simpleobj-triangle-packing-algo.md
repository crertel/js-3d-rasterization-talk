The Algorithm

1. Initialize our packed buffer with the correct size (24*`$N_{triangles}$`).
2. For every face element index in the face buffer:
  1. Calculate which face and vertex it belongs to
  2. Decide if it's a position, normal, or uv element
  3. Look up the components from the appropriate buffer and copy into the packed buffer.

**Not so bad, right?**