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

/// <reference path="../geom/Point.ts" />
/// <reference path="./TileMap.ts" />
/// <reference path="./ISelectTiles.ts" />
/// <reference path="./IMapSelection.ts" />

interface IRangeObject {
    start: number;
    end: number;
}

// Module
module rogue.map {
 

    export class MapSelection implements IMapSelection {
        map: map.IMap;
        tiles: any[] = [];
        offsetX: number = 0;
        offsetY: number = 0;
        centerPoint: geom.Point;
        width: number = 0;
        height: number = 0;

        constructor (map: map.IMap, width: number, height: number) {
            this.height = height;
            this.width = width;
            this.map = map;
        }

        /**
         *
         * @param center
         * @param horizontalRange
         * @param verticalRange
         * @return
         */
        getSurroundingTiles(center: geom.Point, horizontalRange: number, verticalRange: number): any[] {
            //TODO need to test different vertical and horizontal ranges, on horizontal is being used.

            this.tiles.length = 0;
            var i: number;

            var hRangeObj: IRangeObject = this.calculateRange(center.x, horizontalRange, this.map.getWidth());
            var vRangeObj: IRangeObject = this.calculateRange(center.y, verticalRange + 1, this.map.getHeight());
            //TODO look into why this is off by one
            vRangeObj.end += 1;

            this.offsetX = hRangeObj.start;
            this.offsetY = vRangeObj.start;

            for (i = vRangeObj.start; i < vRangeObj.end; i++) {
                this.tiles.push(this.getTilesInRow(i, hRangeObj.start, hRangeObj.end));
            }

            return this.tiles;
        }

        calculateRange(center: number, range: number, length: number): IRangeObject {
            var obj: IRangeObject = <IRangeObject>{ start: 0, end: 0 };

            range--;

            if (center == 0) {
                // At far right
                obj.start = center;
                obj.end = range;
            }
            else if (center == length - 1) {
                // At far right
                obj.start = center - range;
                obj.end = center;
            }
            else {
                // Center
                var split: number = Math.floor(range * .5);
                var paddingLeft: number = split;
                var paddingRight: number = range - split;
                var mapCenter: number = Math.floor(length * .5);

                if (center < mapCenter) {
                    var leftOutOfBounds: number = center - paddingLeft;
                    if (leftOutOfBounds < 0) {
                        paddingRight -= leftOutOfBounds;
                        paddingLeft += leftOutOfBounds;
                    }
                }
                else if (center > mapCenter) {
                    var rightOutOfBounds: number = (length - 1) - (center + paddingRight);
                    if (rightOutOfBounds < 0) {
                        paddingRight += rightOutOfBounds;
                        paddingLeft -= rightOutOfBounds;
                    }
                }
                obj.start = center - paddingLeft;
                obj.end = obj.start + paddingLeft + paddingRight;
            }

            // Just in case, make sure set is always in range
            if (obj.start < 0) {
                // If start is less then 0, shift selection back into range.
                obj.start = 0;
                obj.end++;
            }

            // Make sure selection is never larger then the length.
            if (obj.end > length)
                obj.end = length;

            return obj;
        }


        /**
         *
         * @param i
         * @param start
         * @param end
         * @return
         */
        getTilesInRow(i: number, start: number, end: number): any[] {

            var row: any[] = this.map.getTiles()[i];

            var tiles: any[] = row["slice"](start, end + 1);

            return tiles;
        }


        getTiles(): any[] {
            return this.tiles;
        }

        getOffsetX(): number {
            return this.offsetX;
        }

        getOffsetY(): number {
            return this.offsetY;
        }

        setCenter(value: geom.Point): void {
            this.centerPoint = value.clone();
            this.getSurroundingTiles(this.centerPoint, this.width, this.height);

        }

        getTileID(column: number, row: number): number {
            return this.map.getTileID(row + this.offsetY, column + this.offsetX);
        }

        getCenter(): geom.Point {
            return this.centerPoint;
        }

        toString(): string {
            var stringMap: string = "";
            var total: number = this.getTiles.length;
            var i: number;

            // Render Map
            for (i = 0; i < total; i++) {
                stringMap = stringMap + (this.getTiles[i]).join() + "\n";
            }

            return stringMap;
        }
    }
}