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
/// <reference path="../map/TileMap.ts" />

module rogue.controls {
    var Directions = {
        UP: new geom.Point(0, -1),
        DOWN: new geom.Point(0, 1),
        RIGHT: new geom.Point(1, 0),
        LEFT: new geom.Point(-1, 0)
    }

    export class MovementHelper {
        playerPosition: geom.Point;
        oldTileValue: string;
        map: map.IMap;


        constructor (map: map.IMap) {
            this.map = map;
        }

        move(x: number, y: number, playerToken: string = "@"): void {
            console.log("Move", x + " ", y + " ", this.playerPosition.x + " ", this.playerPosition.y);
            this.playerPosition.x = x;
            this.playerPosition.y = y;
        }

        previewMove(state): geom.Point {

            var tmpPoint: geom.Point;

            switch (state) {
                case "up":
                    tmpPoint = Directions.UP;
                    break;
                case "right":
                    tmpPoint = Directions.RIGHT;
                    break;
                case "down":
                    tmpPoint = Directions.DOWN;
                    break;
                case "left":
                    tmpPoint = Directions.LEFT;
                    break;
                    defualt:
                    return null;
            }

            var tmpPosition: geom.Point = this.playerPosition.clone();
            tmpPosition.x += tmpPoint.x;
            tmpPosition.y += tmpPoint.y;

            if (tmpPosition.x < 0 || tmpPosition.x + 1 > this.map.getWidth())
                return null;

            if (tmpPosition.y < 0 || tmpPosition.y + 1 > this.map.getHeight())
                return null;

            return tmpPosition;

        }

        getPlayerPosition(): geom.Point {
            return this.playerPosition;
        }

        startPosition(value: geom.Point): void {
            this.playerPosition = value;
            this.oldTileValue = "E";
        }
    }
}