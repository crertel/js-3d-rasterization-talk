## SimpleOBJ: Code, loadFromOBJString(1/3)

```
Model.loadFromOBJString = function( src ) {
  function decodeVertex( toks ) {
    if (toks.length !== 4) { throw new Error("Malformed vertex"); }
    return toks.slice(1).map(Number.parseFloat);
  };

  function decodeNormal( toks ) {
    if (toks.length !== 4) { throw new Error("Malformed normal"); }
    return toks.slice(1).map(Number.parseFloat);
  };

  function decodeUV( toks ) {
    if (toks.length !== 3) { throw new Error("Malformed UV"); }
    return toks.slice(1).map(Number.parseFloat);
  };

  /* ...snip... */  
```