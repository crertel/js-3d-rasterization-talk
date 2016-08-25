function Model() {
  this._verts = new Float32Array();
  this._normals = new Float32Array();
  this._uvs = new Float32Array();
  this._faces = new Int32Array(); // in form v0,uv0,n0,v1,uv1,n1, etc.
}

Model.prototype.toTriArray = function() {
  // this assumes face indices are trilists and not strips
  var faceCount = this._faces.length / 9;
  var out = this._faces.reduce( function( acc, el, faceIndex) {
    // unpack the face indexes into an array of 3-tuples
    var currFace = Math.floor(faceIndex / 9);
    if (faceIndex % 3 == 0) {
      var currVert = (faceIndex - 9 * currFace) /3 ;
      acc[currFace*9 + currVert*3 + 0] = this._verts[3*el + 0];
      acc[currFace*9 + currVert*3 + 1] = this._verts[3*el + 1];
      acc[currFace*9 + currVert*3 + 2] = this._verts[3*el + 2];
    }  
    return acc;
  }.bind(this), new Float32Array( faceCount * 9));
  
  return out;
}

Model.prototype.loadFromOBJString = function( src ) {
  // split source into trimmed lines with comments removed
  var processedLines = src.split('\n')
                          .map( function(s) { return s.replace(/#.*/,'').trim(); })
                          .filter( function(s) { return s.length !== 0; });

  var parseState = {
    verts: [],
    uvs: [],
    norms: [],
    faces: []
  };

  function decodeVertex( toks ) {
    if (toks.length !== 4) {
      throw new Error("Malformed vertex");
    }
    return toks.slice(1).map(Number.parseFloat);
  };

  function decodeNormal( toks ) {
    if (toks.length !== 4) {
      throw new Error("Malformed normal");
    }
    
    return toks.slice(1).map(Number.parseFloat);
  };

  function decodeUV( toks ) {
    if (toks.length !== 3) {
      throw new Error("Malformed UV");
    }
    return toks.slice(1).map(Number.parseFloat);
  };

  function decodeFaceToken(tok){

    var indices = {
      vert: 0,
      uv: 0,
      normal: 0
    };

    var kVertIndexOnly = /\d*/;
    var kVertAndUVOnly = /^(\d*)\/(\d*)$/;
    var kVertAndNormalOnly = /^(\d*)\/\/(\d*)$/;
    var kVertUVNormal = /^(\d*)\/(\d*)\/(\d*)$/;

    var match;

    /* We have a lot of (...-1) here because OBJ is 1s indexed */
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
    if (toks.length < 4) {
      throw new Error("Malformed face");
    }

    if (toks.length > 4) {
      throw new Error("Nontriangulated face (unsupported)");
    }

    return toks.slice(1)
            .map(decodeFaceToken)
            .reduce( function globIndices( out, indices ){
              out.push( indices.vert);
              out.push( indices.uv);
              out.push( indices.normal);
              return out;
          },[]);
  }

  var parsedState = processedLines.reduce( function (state, line) {
    var toks = line.split(/\s+/);
    try {
      switch(true) {
        case ('v' === toks[0]) :  state.verts = state.verts.concat(decodeVertex(toks)); break;
        case ('vn' === toks[0]) : state.norms = state.verts.concat(decodeNormal(toks)); break;
        case ('vt' === toks[0]) : state.uvs = state.uvs.concat(decodeUV(toks)); break;
        case ('f' === toks[0]) :  state.faces = state.faces.concat(decodeFace(toks)); break;
        default: throw new Error("Unrecognized line"); break;
      }      
    } catch( e ) {
      console.log("ERROR ", e.toString(), '\n>>>\t ', line);
    }
    return state;
  }, parseState);

  this._verts = Float32Array.from( parsedState.verts );
  this._uvs = Float32Array.from( parsedState.uvs );
  this._normals = Float32Array.from( parsedState.norms );
  this._faces = Int32Array.from(parsedState.faces);

  console.log('Model has\n',
    '\t', this._verts.length/3, ' vertices\n',
    '\t', this._uvs.length/2, ' UVs\n',
    '\t', this._normals.length/3, ' normals\n',
    '\t', this._faces.length/9, ' faces'); /* divide by 9 because 3 per face, 3 coords for position/vertx/normal */

  return processedLines;
}
