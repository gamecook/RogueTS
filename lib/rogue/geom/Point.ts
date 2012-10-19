/**
* The MIT License
*
* Copyright (c) 2009-2012 @author jessefreeman GameCook, Inc.
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
* THE SOFTWARE.
*
*/

module rogue.geom {
    export class Point {
        // Adapted from https://github.com/moagrius/Point/blob/master/Point.js

        x: number;
        y: number;

        constructor (x: number, y: number) {
            this.x = x || 0;
            this.y = y || 0;
        }

        /**
	    * Adds the coordinates of another point to the coordinates of this point to create a new point.
	    * @function
	    * @param {Point} v The point to be added.
	    * @returns Point
	    */
        add(v: Point): Point {
            return new Point(this.x + v.x, this.y + v.y);
        };

            /**
            * Creates a copy of this Point object.
            * @function
            * @returns Point
            */
        clone(): Point {
            return new Point(this.x, this.y);
        };

        /**
	    * Returns the distance between this and another Point.
	    * @function
	    * @param {Point} v The point at the opposite end of the distance comparison.
	    * @returns number
	    */
        distance(v: Point): number {
            var x: number = this.x - v.x;
            var y: number = this.y - v.y;
            return Math.sqrt(x * x + y * y);
        };

            /**
            * Returns the Point object expressed as a String value.
            * @function
            * @returns string
            */
        toString(): string {
            return "(x=" + this.x + ", y=" + this.y + ")";
        };

    }

}