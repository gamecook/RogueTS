/**
* The MIT License
*
* Based on iPhone RPG, (c) 2007 Chris Knight, Creative Commons license
*
* Modified by jessefreeman GameCook, Inc.
*
*/

/// <reference path="../geom/Point.ts" />
/// <reference path="./TileMap.ts" />
/// <reference path="./Room.ts" />

module rogue.map {


    export class RandomMap extends TileMap{
       
        dirs = [
            { x: -1, y: 0 },
            { x: 0, y: 1 },
            { x: 1, y: 0 },
            { x: 0, y: -1 }
        ];
        
        constructor (size) {
            super();
            this.mapsize = size;
            this.tiles = [];

            // Generate Map before passing up to super
            this.randomMap(this.mapsize);
            this.genMaze();
            this.genRooms(1, 3);
        }

        randomMap(mapsize) {
            this.mapsize = mapsize;
            this._width = this._height = mapsize * 2 + 3;
            this.paths = [];
            this._rooms = [];
            for (var i = 0; i < this._height; i++) {
                var a = [];
                var b = [];
                for (var j = 0; j < this._width; j++) {
                    a.push('#');
                    b.push("0");
                }
                this.tiles.push(a);
            }
            return this;
        };

        genMaze() {
            var x = 1, y = 1;
            this.tiles[x][y] = ' ';
            while (1) {
                var dir = Math.floor(Math.random() * 4);
                for (var i = 0; i < 4; i++) { 
                        var testdir = (dir + i) % 4;
                    var newx = x + this.dirs[testdir].x * 2, newy = y + this.dirs[testdir].y * 2;
                    if (newx > 0 && newx < this._width
                        && newy > 0 && newy < this._height
                        && this.tiles[newx][newy] == '#')
                        break; 
                    }
                if (i < 4) {
                    x += this.dirs[testdir].x;
                    y += this.dirs[testdir].y;
                    this.tiles[x][y] = ' ';
                    x += this.dirs[testdir].x;
                    y += this.dirs[testdir].y;
                    this.tiles[x][y] = '' + testdir;
                } else { //backup
                    if (x == 1 && y == 1) break;
                    else {
                        dir = this.tiles[x][y];
                        this.tiles[x][y] = ' ';
                        x -= this.dirs[dir].x * 2;
                        y -= this.dirs[dir].y * 2;
                    }
                }
            }
        }

        genRooms(min, max) {
            var trycount = 0;
            while (1) {
                if (trycount > 10) break;
                var _width = Math.floor(Math.random() * max) + min,
                    _height = Math.floor(Math.random() * max) + min,
                    x1 = Math.floor(Math.random() * (this.mapsize - _width)) * 2 + 1,
                    y1 = Math.floor(Math.random() * (this.mapsize - _height)) * 2 + 1,
                    x2 = x1 + _width * 2, y2 = y1 + _height * 2;
                room = new Room(x1, y1, x2, y2);
                for (var i = 0; i < this._rooms.length; i++) {
                    if (room.intersects(this._rooms[i])) break;
                }
                if (i == this._rooms.length) {
                    this._rooms.push(room);
                    trycount = 0;
                } else {
                    trycount++;
                }
            }
            for (var i = 0; i < this._rooms.length; i++) {
                var room = this._rooms[i];
                for (var x = room.x1; x <= room.x2; x++) {
                    for (var y = room.y1; y <= room.y2; y++) {
                        this.tiles[x][y] = " ";
                        this.openTiles.push(new geom.Point(x, y));
                    }
                }
            }
        }

    }
}