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

/// <reference path="./MapSelection.ts" />

// Module
module rogue.map {

    export class FogOfWarMapSelection extends MapSelection {
        exploredTilesHashMap: string[] = [];
        saveExploredTiles: bool = true;
        _revealAll: bool;
        visiblePoints: any[] = [];
        viewDistance: number;
        _tourchMode: bool;
        _fullLineOfSight: bool;
        exploredTiles: number[] = [];

        constructor (map: IMap, width: number, height: number, viewDistance: number) {
            super(map, width, height);
            this.viewDistance = viewDistance;
        }

        getSurroundingTiles(center: geom.Point, horizontalRange: number, verticalRange: number): any[] {

            var tiles: any[] = super.getSurroundingTiles(center, horizontalRange, verticalRange);

            // Need to adjust the center point coming in
            var newPoint: geom.Point = center.clone();
            newPoint.x -= this.getOffsetX();
            newPoint.y -= this.getOffsetY();

            this.calculateLight(tiles, new geom.Point(newPoint.y, newPoint.x));

            this.applyLight(tiles, this.visiblePoints);

            if (!this.saveExploredTiles)
                this.clear();

            return this.tiles;
        }

        applyLight(tiles: any[], visiblePoints: any[]): void {
            var width: number = tiles[0].length;
            var height: number = tiles.length;

            var rows: number;
            var columns: number;

            for (rows = 0; rows < height; rows++) {
                for (columns = 0; columns < width; columns++) {
                    var uID: number = this.getTileID(columns, rows);
                    if (this.visiblePoints.indexOf(uID) == -1) {
                        if (this.exploredTilesHashMap[uID] || this._revealAll)
                            tiles[rows][columns] = tiles[rows][columns] == "?" ? "#" : "?";
                        else
                            tiles[rows][columns] = "*";
                    }
                }

            }

            visiblePoints.length = 0;
        }

        calculateLight(tiles: any[], center: geom.Point): void {

            var totalRows: number = tiles.length;
            var totalColumns: number = tiles[0].length;
            var i: number;

            // Get top
            for (i = 0; i < totalColumns; i++) {
                this.rayTrace(center.x, center.y, 0, i, tiles);
                this.rayTrace(center.x, center.y, totalRows - 1, i, tiles);
            }

            for (i = 0; i < totalRows; i++) {
                this.rayTrace(center.x, center.y, i, 0, tiles);
                this.rayTrace(center.x, center.y, i, totalColumns - 1, tiles);
            }
        }


        rayTrace(x0: number, y0: number, x1: number, y1: number, tiles: any[]): void {

            var dx: number = Math.abs(x1 - x0);
            var dy: number = Math.abs(y1 - y0);
            var x: number = x0;
            var y: number = y0;
            var n: number = this.viewDistance;//(!_fullLineOfSight) ? viewDistance : 1 + dx + dy;
            var x_inc: number = (x1 > x0) ? 1 : -1;
            var y_inc: number = (y1 > y0) ? 1 : -1;
            var error: number = dx - dy;
            dx *= 2;
            dy *= 2;

            for (; n > 0; --n) {
                var isWall: Boolean = this.visit(x, y, tiles, n);

                if (isWall)
                    n = 0;

                if (error > 0) {
                    x += x_inc;
                    error -= dy;
                }
                else {
                    y += y_inc;
                    error += dx;
                }
            }

        }

        visit(x: number, y: number, tiles: any[], distance: number): Boolean {
            //TODO not sure why I would ever get a value less then 0 but I do
            if (x < 0) x = 0;
            if (x > tiles.length - 1) x = tiles.length - 1;
            if (y < 0) y = 0;
            if (y > tiles[0].length - 1) y = tiles[0].length - 1;

            var tile: string = tiles[x][y];

            var uID: number = this.getTileID(y, x);

            if (this.visiblePoints.indexOf(uID) == -1)
                this.visiblePoints.push(uID);

            if (!this._tourchMode || !this._fullLineOfSight) {
                if (!this.exploredTilesHashMap[uID] && tile != "#") {
                    this.exploredTilesHashMap[uID] = " ";
                    this.exploredTiles.push(uID);
                }
            }
            //TODO this should use the type types to see if it is see threw not just a wall to add shadow around monsters
            return tile == "#" ? true : false;
        }

        clear(): void {
            this.exploredTilesHashMap.length = 0;
            this.exploredTiles.length = 0;
        }

        revealAll(value: bool): void {
            this._revealAll = value;

        }

        tourchMode(value: bool): void {
            this._tourchMode = value;
        }

        fullLineOfSight(value: bool): void {
            this._fullLineOfSight = value;
        }

        getVisitedTiles(): number {
            return this.exploredTiles.length;
        }

        getExploredTiles(): any[] {
            return this.exploredTiles;
        }
    }
}