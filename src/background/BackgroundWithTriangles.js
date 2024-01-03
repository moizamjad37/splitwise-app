import React, { useRef, useEffect } from "react";
import styled from "styled-components";

// @ts-ignore
import Matrix from "misc/matrix";
"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
// SETTINGS:
// Canvas contains many squares, each square contains 2 triangles.
// l=logical, w=width, h=height.
var canvas_lw = 1000; // set higher for higher resolution
var canvas_lh = 1000; // set higher for higher resolution
var square_lw = 30; // size of the square
var square_lh = 30; // size of the square
var squareShift_lx = 4; // horizontal tilting
var squareShift_ly = 4; // vertical tilting
var tilt = 0.5; // 0=left, 0.5=equal, 1=right
var drawSquaresOnly = false;
// THESE THREE MUST ADD UP TO 256, FOR RGB:
var grayMinimum = 180; // higher for lighter.
var colourShift = 3; // 0 for full grayscale.
var grayShift = 256 - grayMinimum - colourShift; // 0+
// ------------------------------------
var Canvas = styled.canvas(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: fixed;\n  z-index: -1;\n  top: 0;\n  left: 0;\n  width: calc(100vw + 50px); // 50px: compensate for the shifting at the end\n  height: calc(100vh + 50px); // 50px: compensate for the shifting at the end\n"], ["\n  position: fixed;\n  z-index: -1;\n  top: 0;\n  left: 0;\n  width: calc(100vw + 50px); // 50px: compensate for the shifting at the end\n  height: calc(100vh + 50px); // 50px: compensate for the shifting at the end\n"])));
// ------------------------------------
// Output range: 0 .. maxIncl.
var getRandomInt = function (maxIncl) {
    return Math.floor(Math.random() * (maxIncl + 1));
};
// Output range: -x/2 .. x/2
var getShiftPositiveOrNegative = function (x) { return getRandomInt(x) - x / 2; };
// ------------------------------------
var getRandomGrayishRgb = function () {
    var randomGrayBase = grayMinimum + getRandomInt(grayShift);
    var r = randomGrayBase + getRandomInt(colourShift);
    var g = randomGrayBase + getRandomInt(colourShift);
    var b = randomGrayBase + getRandomInt(colourShift);
    return "rgb(".concat(r, ",").concat(g, ",").concat(b, ")");
};
// ------------------------------------
// "12:34" --> [12, 34]
var stringToArray = function (value) {
    return value.split(":").map(function (s) { return Number(s); });
};
// [12, 34] --> "12:34"
var arrayToString = function (valueX, valueY) {
    return "".concat(valueX, ":").concat(valueY);
};
// ------------------------------------
var drawTriangle = function (ctx, x1, y1, x2, y2, x3, y3, fillStyle) {
    ctx.beginPath();
    ctx.lineWidth = 0;
    ctx.fillStyle = fillStyle;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.fill();
};
// ------------------------------------
var drawSquare = function (ctx, x1, y1, x2, y2, x3, y3, x4, y4, fillStyle) {
    ctx.beginPath();
    ctx.lineWidth = 0;
    ctx.fillStyle = fillStyle;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x4, y4);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.fill();
};
// ------------------------------------
// Two triangles forming a square.
var drawSquareOrTriangles = function (ctx, x1, y1, x2, y2, x3, y3, x4, y4) {
    if (drawSquaresOnly) {
        drawSquare(ctx, x1, y1, x2, y2, x3, y3, x4, y4, getRandomGrayishRgb());
        return;
    }
    // Draw two triangles
    if (Math.random() <= tilt) {
        // Tilt right, like: /
        drawTriangle(ctx, x1, y1, x2, y2, x3, y3, getRandomGrayishRgb());
        drawTriangle(ctx, x2, y2, x3, y3, x4, y4, getRandomGrayishRgb());
    }
    else {
        // Tilt left, like: \
        drawTriangle(ctx, x1, y1, x2, y2, x4, y4, getRandomGrayishRgb());
        drawTriangle(ctx, x1, y1, x3, y3, x4, y4, getRandomGrayishRgb());
    }
};
// ------------------------------------
// x, y: top left corner of the cell, which contain 1 square or 2 triangles.
var drawCell = function (matrix, ctx, x, y) {
    // 4 corners of the square
    var x1 = x;
    var y1 = y;
    var x2 = x;
    var y2 = y + square_lh;
    var x3 = x + square_lw;
    var y3 = y;
    var x4 = x + square_lw;
    var y4 = y + square_lh;
    drawSquareOrTriangles.apply(void 0, __spreadArray(__spreadArray(__spreadArray(__spreadArray([ctx], stringToArray(matrix.getValue(x1, y1)), false), stringToArray(matrix.getValue(x2, y2)), false), stringToArray(matrix.getValue(x3, y3)), false), stringToArray(matrix.getValue(x4, y4)), false));
};
// ------------------------------------
var createMatrix = function (ctx) {
    var matrix = new Matrix();
    // Create a matrix of dots for the squares, with shifts
    for (var x = 0; x <= canvas_lw; x += square_lw)
        for (var y = 0; y <= canvas_lh; y += square_lh) {
            var xWithShift = x + getShiftPositiveOrNegative(squareShift_lx);
            var yWithShift = y + getShiftPositiveOrNegative(squareShift_ly);
            matrix.setValue(x, y, arrayToString(xWithShift, yWithShift));
        }
    // Draw the squares (we need 4 dots for each square)
    for (var x = 0; x <= canvas_lw - square_lw; x += square_lw)
        for (var y = 0; y <= canvas_lh - square_lh; y += square_lh) {
            drawCell(matrix, ctx, x, y);
        }
};
// ------------------------------------
// COMPONENT:
// Draws a window background of squares.
// Each square draws 2 triangles.
// Each triangle has random shifts in: corner positions, and colour.
var BackgroundWithTriangles = function () {
    var ref = useRef(null);
    // ------------------------------------
    useEffect(function () {
        if (ref && ref.current) {
            var canvas = ref.current;
            var ctx = canvas.getContext("2d");
            createMatrix(ctx);
        }
    }, [ref === null || ref === void 0 ? void 0 : ref.current]);
    // ------------------------------------
    // Width and height: logical (int), not physical (px).
    return ref;
    {
        ref;
    }
    width = { canvas_lw: canvas_lw };
    height = { canvas_lh: canvas_lh };
};
exports.default = BackgroundWithTriangles;
var templateObject_1;
