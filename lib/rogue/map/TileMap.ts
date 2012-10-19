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
/// <reference path="./MapSelection.ts" />
/// <reference path="./IMap.ts" />
/// <reference path="./ISelectTiles.ts" />

// Module
module rogue.map {
    
    export class TileMap implements IMap {
        tiles: any[] = [];
        dirs: Array;
        mapsize: number;
        paths: Array;
        _rooms: Array;
        _width: number;
        _height: number;
        openTiles: any[] = [];

        /**
         *
         * @param self
         * @throws Error
         */
        constructor () {
            //TODO need to pass in width/height into constructor
        }

        /**
         *
         * @param tiles
         */
        addRow(tiles: Array): void {
            tiles.push(tiles);
        }

        /**
         *
         * @param position
         * @return
         */
        getTileType(position: geom.Point): string {
            return this.tiles[position.y][position.x];
        }

        /**
         *
         * @param id
         */
        removeRow(id: number): void {
            this.tiles.splice(id, 1);
        }

        indexOpenTiles(): void {
            var row: number;
            var column: number;
            var totalRows: number = this.getHeight();
            var totalColumns: number = this.getWidth();
            var tile: string;

            for (row = 0; row < this._height; row++) {
                for (column = 0; column < this._width; column++) {
                    tile = this.tiles[row][column];
                    if (tile != "#")
                        this.openTiles.push(new geom.Point(column, row));
                }
            }
        }

        /**
         *
         * @return
         */
        toString(): string {
            var stringMap: string = "";
            var total: number = this.tiles.length;
            var i: number;
            // Render Map
            for (i = 0; i < total; i++) {
                stringMap = stringMap + (this.tiles[i]).join() + "\n";
            }

            return stringMap;
        }

        getWidth(): number {
            return this._width;
        }

        getHeight(): number {
            return this._height;
        }

        swapTile(point: geom.Point, value: string): string {
            var oldValue: string = this.tiles[point.y][point.x];
            this.tiles[point.y][point.x] = value;
            return oldValue;
        }

        getTileID(row: number, column: number): number {
            return row * this._width + column;
        }

        tileIDToPoint(id: number): geom.Point {
            return new geom.Point(id % this._width, id / this._width);
        }

        getOpenTiles(): any[] {
            return this.openTiles;
        }

        toObject(): void {
            /*var mapObj: Object = {};
            mapObj.tiles = this.tiles;
            return mapObj;*/
        }

        getTiles(): any[] {
            return this.tiles;
        }

        setTiles(value: any[]): void {
            //TODO Need to index tiles to find empty tiles.
            this.tiles = value["slice"]();// This is a hack
            this._width = this.tiles[0].length;
            this._height = this.tiles.length;
            this.indexOpenTiles();
        }
    }

}