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
/// <reference path="TileMap.ts" />

module rogue.map {
    export class MapPopulater
    {
        map:IMap;
        openSpaces:any[] = [];

        getOpenSpaces():number
        {
            return this.openSpaces.length;
        }

        constructor(map:IMap)
        {
            this.map = map;
            this.openSpaces = map.getOpenTiles();
        }

        populateMap(items:string[]):void
        {
            var key:string;
            var i: number;
            var total: number = items.length;
            for (i = 0; i < total; i++)
            {
                this.randomlyPlaceTile(items[i]);
            }
        }

        randomlyPlaceTile(key:string):void
        {
            var point: geom.Point = this.getRandomEmptyPoint();
            if (point)
                this.placeTile(point, key);
        }

        placeTile(point: geom.Point, key:string):void
        {
            this.map.swapTile(point, key);
        }

        getRandomEmptyPoint(): geom.Point
        {
            return this.openSpaces[Math.floor((Math.random() * this.openSpaces.length))];
        }

    }
}