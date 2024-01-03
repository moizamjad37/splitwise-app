// ------------------------------------
// This provides a 2 dimensional array.
// Dimensions are x & y.
// Each cell is a string.
// It is implemented as a function object.
// Prototype functions: setValue, getValue.
// Example usage:
//   matrix = new Matrix();
//   matrix.setValue(3, 4, 1234);
//   const value = matrix.getValue(3, 4);
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Matrix() {
    var _this = this;
    this.getValue = function (x, y) { return _this["".concat(x, ":").concat(y)]; };
    this.setValue = function (x, y, value) {
        _this["".concat(x, ":").concat(y)] = value;
    };
}
exports.default = Matrix;

  