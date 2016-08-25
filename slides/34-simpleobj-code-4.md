## SimpleOBJ: Triangle Packing Code

```
Model.prototype.toTriArray = function() {
  return this._faces.reduce( function( acc, faceElementIndex, faceIndex) {
    var currFace = Math.floor(faceIndex / 9);   // which face are we on
    var faceBaseElementIndex = 9 * currFace;    // what's the starting element for this face
    var currVert = Math.floor( (faceIndex - faceBaseElementIndex) /3 );

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
  }.bind(this), new Float32Array( (this._faces.length / 9) * 24) );
}
```