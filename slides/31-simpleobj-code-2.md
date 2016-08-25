## SimpleOBJ: Code, loadFromOBJString(2/3)

```
/* ...snip... */
function decodeFace( toks ) {
    if (toks.length < 4) { throw new Error("Malformed face"); }
    if (toks.length > 4) { throw new Error("Nontriangulated face (unsupported)"); }

    return toks.slice(1)
            .map(function _decodeFaceToken(tok){    
              var kVertOnly = /^\d*$/;
              var kVertAndUVOnly = /^(\d*)\/(\d*)$/;
              var kVertAndNormalOnly = /^(\d*)\/\/(\d*)$/;
              var kVertUVNormal = /^(\d*)\/(\d*)\/(\d*)$/;
              
              /* We have a lot of (...-1) here because OBJ is 1s indexed */
              var match;
              var indices = [0,0,0];//{ vert: 0, uv: 0, normal: 0 };
              if (match = tok.match( kVertOnly ) ) {
                indices[0] =     Number.parseInt(match[1],10) - 1;
              } else if (match = tok.match( kVertAndUVOnly )) {
                indices[0] =     Number.parseInt(match[1],10) - 1;
                indices[2] =     Number.parseInt(match[2],10) - 1;
              } else if (match = tok.match( kVertAndNormalOnly )) {
                indices[0] =     Number.parseInt(match[1],10) - 1;
                indices[1] =     Number.parseInt(match[2],10) - 1;
              } else if (match = tok.match( kVertUVNormal )) {
                indices[0] =     Number.parseInt(match[1],10) - 1;
                indices[2] =     Number.parseInt(match[2],10) - 1;
                indices[1] =     Number.parseInt(match[3],10) - 1;
              }
              return indices;
            })
            .reduce( function _globIndices( out, indices ){           
              return out.concat(indices);
          },[]);
  }
/* ...snip... */
```