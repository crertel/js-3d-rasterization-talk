## SimpleOBJ: Code, loadFromOBJString(3/3)

```
/* ...snip... */
  // split source into trimmed lines with comments removed
  var processedLines = src.split('\n')
                          .map( function(s) { return s.replace(/#.*/,'').trim(); })
                          .filter( function(s) { return s.length !== 0; });

  var parsedState = processedLines.reduce( function (state, line) {
    var toks = line.split(/\s+/);
    try {
      switch(toks[0]) {
        case 'v':  state.verts = state.verts.concat(decodeVertex(toks)); break;
        case 'vn': state.norms = state.verts.concat(decodeNormal(toks)); break;
        case 'vt': state.uvs = state.uvs.concat(decodeUV(toks)); break;
        case 'f':  state.faces = state.faces.concat(decodeFace(toks)); break;
        default: throw new Error("Unrecognized line"); break;
      }      
    } catch( e ) {
      console.log("ERROR ", e.toString(), '\n>>>\t ', line);
    }
    return state;
  }, { verts: [], uvs: [], norms: [], faces: [] });

  console.log('Model has\n',
    '\t', parsedState.verts.length/3, ' vertices\n',
    '\t', parsedState.uvs.length/2, ' UVs\n',
    '\t', parsedState.norms.length/3, ' normals\n',
    '\t', parsedState.faces.length/9, ' faces'); /* divide by 9 because 3 per face, 3 coords for vertx/uv/normal/whatever */

  return new Model( parsedState.verts, parsedState.uvs, parsedState.norms, parsedState.faces );
}
```