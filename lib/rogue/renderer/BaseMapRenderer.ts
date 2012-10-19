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

/// <reference path="./IMapRenderer.ts" />

module rogue.renderer {

    export class BaseMapRenderer implements IMapRenderer {
        renderMap(selection: map.ISelectTiles): void {
            var tiles: any[] = selection.getTiles();
            var row: number;
            var column: number;
            var total: number = tiles.length;
            var rowWidth: number = tiles[0].length;
            var currentTile: string;
            var tileID: number = 0;

            this.clearMap();

            for (row = 0; row < total; row++) {
                for (column = 0; column < rowWidth; column++) {
                    currentTile = tiles[row][column];
                    this.renderTile(column, row, currentTile, selection.getTileID(column, row));
                }
            }

        }

        renderTile(j: number, i: number, currentTile: string, tileID: number): void {

        }

        clearMap(): void {
        }


        renderPlayer(j: number, i: number, tileType: string): void {
            this.renderTile(j, i, tileType, 0);
        }

    }

    

      
}