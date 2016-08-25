function Model(verts, normals, uvs, faces) {
  this._verts = new Float32Array( verts || [] );
  this._normals = new Float32Array( normals || [] );
  this._uvs = new Float32Array( uvs || []) ;
  this._faces = faces || [];
}

Model.prototype.toTriArray = function() {
  return this._faces.reduce( function( acc, faceElementIndex, faceIndex) {
    var currFace = Math.floor(faceIndex / 9);
    var currVert = (faceIndex - 9 * currFace) /3 ;

    if (faceIndex % 3 == 0) {
      acc[currFace*24 + currVert*8 + 0] = this._verts[3*faceElementIndex + 0];
      acc[currFace*24 + currVert*8 + 1] = this._verts[3*faceElementIndex + 1];
      acc[currFace*24 + currVert*8 + 2] = this._verts[3*faceElementIndex + 2];
    } else  if (faceIndex % 3 == 1) {
      acc[currFace*24 + currVert*8 + 3] = this._normals[3*faceElementIndex + 0];
      acc[currFace*24 + currVert*8 + 4] = this._normals[3*faceElementIndex + 1];
      acc[currFace*24 + currVert*8 + 5] = this._normals[3*faceElementIndex + 2];
    } else if (faceIndex % 3 == 2) {
      acc[currFace*24 + currVert*8 + 6] = this._uvs[2*faceElementIndex + 0];
      acc[currFace*24 + currVert*8 + 7] = this._uvs[2*faceElementIndex + 1];
    }
    return acc;
  }.bind(this), new Float32Array( (this._faces.length / 3) * 8) );
}

Model.loadFromOBJString = function( src ) {
  // split source into trimmed lines with comments removed
  var processedLines = src.split('\n')
                          .map( function(s) { return s.replace(/#.*/,'').trim(); })
                          .filter( function(s) { return s.length !== 0; });

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

  function decodeFaceToken(tok){    
    var kVertIndexOnly = /\d*/;
    var kVertAndUVOnly = /^(\d*)\/(\d*)$/;
    var kVertAndNormalOnly = /^(\d*)\/\/(\d*)$/;
    var kVertUVNormal = /^(\d*)\/(\d*)\/(\d*)$/;
    
    /* We have a lot of (...-1) here because OBJ is 1s indexed */
    var match;
    var indices = { vert: 0, uv: 0, normal: 0 };
    switch( true ) {
      case (kVertIndexOnly.test(tok)):      indices.vert = Number.parseInt(tok,10) - 1;
                                            break;
      case (kVertAndUVOnly.test(tok)):      match = tok.match(kVertAndUVOnly);
                                            indices.vert = Number.parseInt(match[1],10) - 1;
                                            indices.uv = Number.parseInt(match[2],10) - 1;
                                            break;
      case (kVertAndNormalOnly.test(tok)):  match = tok.match(kVertAndNormalOnly);
                                            indices.vert = Number.parseInt(match[1],10) - 1;
                                            indices.normal = Number.parseInt(match[2],10) - 1;
                                            break;
      case (kVertUVNormal.test(tok)):       match = tok.match(kVertUVNormal);
                                            indices.vert = Number.parseInt(match[1],10) - 1;
                                            indices.uv = Number.parseInt(match[2],10) - 1;
                                            indices.normal = Number.parseInt(match[3],10) - 1;
                                            break;
      default: break;
    }
    return indices;
  }

  function decodeFace( toks ) {
    if (toks.length < 4) { throw new Error("Malformed face"); }
    if (toks.length > 4) { throw new Error("Nontriangulated face (unsupported)"); }

    return toks.slice(1)
            .map(decodeFaceToken)
            .reduce( function globIndices( out, indices ){
              out.push( indices.vert);
              out.push( indices.normal);
              out.push( indices.uv);              
              return out;
          },[]);
  }

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