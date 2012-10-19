var rogue;
(function (rogue) {
    (function (geom) {
        var Point = (function () {
            function Point(x, y) {
                this.x = x || 0;
                this.y = y || 0;
            }
            Point.prototype.add = function (v) {
                return new Point(this.x + v.x, this.y + v.y);
            };
            Point.prototype.clone = function () {
                return new Point(this.x, this.y);
            };
            Point.prototype.distance = function (v) {
                var x = this.x - v.x;
                var y = this.y - v.y;
                return Math.sqrt(x * x + y * y);
            };
            Point.prototype.toString = function () {
                return "(x=" + this.x + ", y=" + this.y + ")";
            };
            return Point;
        })();
        geom.Point = Point;        
    })(rogue.geom || (rogue.geom = {}));
    var geom = rogue.geom;

})(rogue || (rogue = {}));

var rogue;
(function (rogue) {
    
})(rogue || (rogue = {}));

var rogue;
(function (rogue) {
    
})(rogue || (rogue = {}));

var rogue;
(function (rogue) {
    (function (map) {
        var MapSelection = (function () {
            function MapSelection(map, width, height) {
                this.tiles = [];
                this.offsetX = 0;
                this.offsetY = 0;
                this.width = 0;
                this.height = 0;
                this.height = height;
                this.width = width;
                this.map = map;
            }
            MapSelection.prototype.getSurroundingTiles = function (center, horizontalRange, verticalRange) {
                this.tiles.length = 0;
                var i;
                var hRangeObj = this.calculateRange(center.x, horizontalRange, this.map.getWidth());
                var vRangeObj = this.calculateRange(center.y, verticalRange + 1, this.map.getHeight());
                vRangeObj.end += 1;
                this.offsetX = hRangeObj.start;
                this.offsetY = vRangeObj.start;
                for(i = vRangeObj.start; i < vRangeObj.end; i++) {
                    this.tiles.push(this.getTilesInRow(i, hRangeObj.start, hRangeObj.end));
                }
                return this.tiles;
            };
            MapSelection.prototype.calculateRange = function (center, range, length) {
                var obj = {
                    start: 0,
                    end: 0
                };
                range--;
                if(center == 0) {
                    obj.start = center;
                    obj.end = range;
                } else {
                    if(center == length - 1) {
                        obj.start = center - range;
                        obj.end = center;
                    } else {
                        var split = Math.floor(range * 0.5);
                        var paddingLeft = split;
                        var paddingRight = range - split;
                        var mapCenter = Math.floor(length * 0.5);
                        if(center < mapCenter) {
                            var leftOutOfBounds = center - paddingLeft;
                            if(leftOutOfBounds < 0) {
                                paddingRight -= leftOutOfBounds;
                                paddingLeft += leftOutOfBounds;
                            }
                        } else {
                            if(center > mapCenter) {
                                var rightOutOfBounds = (length - 1) - (center + paddingRight);
                                if(rightOutOfBounds < 0) {
                                    paddingRight += rightOutOfBounds;
                                    paddingLeft -= rightOutOfBounds;
                                }
                            }
                        }
                        obj.start = center - paddingLeft;
                        obj.end = obj.start + paddingLeft + paddingRight;
                    }
                }
                if(obj.start < 0) {
                    obj.start = 0;
                    obj.end++;
                }
                if(obj.end > length) {
                    obj.end = length;
                }
                return obj;
            };
            MapSelection.prototype.getTilesInRow = function (i, start, end) {
                var row = this.map.getTiles()[i];
                var tiles = row["slice"](start, end + 1);
                return tiles;
            };
            MapSelection.prototype.getTiles = function () {
                return this.tiles;
            };
            MapSelection.prototype.getOffsetX = function () {
                return this.offsetX;
            };
            MapSelection.prototype.getOffsetY = function () {
                return this.offsetY;
            };
            MapSelection.prototype.setCenter = function (value) {
                this.centerPoint = value.clone();
                this.getSurroundingTiles(this.centerPoint, this.width, this.height);
            };
            MapSelection.prototype.getTileID = function (column, row) {
                return this.map.getTileID(row + this.offsetY, column + this.offsetX);
            };
            MapSelection.prototype.getCenter = function () {
                return this.centerPoint;
            };
            MapSelection.prototype.toString = function () {
                var stringMap = "";
                var total = this.getTiles.length;
                var i;
                for(i = 0; i < total; i++) {
                    stringMap = stringMap + (this.getTiles[i]).join() + "\n";
                }
                return stringMap;
            };
            return MapSelection;
        })();
        map.MapSelection = MapSelection;        
    })(rogue.map || (rogue.map = {}));
    var map = rogue.map;

})(rogue || (rogue = {}));

var rogue;
(function (rogue) {
    
})(rogue || (rogue = {}));

var rogue;
(function (rogue) {
    (function (map) {
        var TileMap = (function () {
            function TileMap() {
                this.tiles = [];
                this.openTiles = [];
            }
            TileMap.prototype.addRow = function (tiles) {
                tiles.push(tiles);
            };
            TileMap.prototype.getTileType = function (position) {
                return this.tiles[position.y][position.x];
            };
            TileMap.prototype.removeRow = function (id) {
                this.tiles.splice(id, 1);
            };
            TileMap.prototype.indexOpenTiles = function () {
                var row;
                var column;
                var totalRows = this.getHeight();
                var totalColumns = this.getWidth();
                var tile;
                for(row = 0; row < this._height; row++) {
                    for(column = 0; column < this._width; column++) {
                        tile = this.tiles[row][column];
                        if(tile != "#") {
                            this.openTiles.push(new rogue.geom.Point(column, row));
                        }
                    }
                }
            };
            TileMap.prototype.toString = function () {
                var stringMap = "";
                var total = this.tiles.length;
                var i;
                for(i = 0; i < total; i++) {
                    stringMap = stringMap + (this.tiles[i]).join() + "\n";
                }
                return stringMap;
            };
            TileMap.prototype.getWidth = function () {
                return this._width;
            };
            TileMap.prototype.getHeight = function () {
                return this._height;
            };
            TileMap.prototype.swapTile = function (point, value) {
                var oldValue = this.tiles[point.y][point.x];
                this.tiles[point.y][point.x] = value;
                return oldValue;
            };
            TileMap.prototype.getTileID = function (row, column) {
                return row * this._width + column;
            };
            TileMap.prototype.tileIDToPoint = function (id) {
                return new rogue.geom.Point(id % this._width, id / this._width);
            };
            TileMap.prototype.getOpenTiles = function () {
                return this.openTiles;
            };
            TileMap.prototype.toObject = function () {
            };
            TileMap.prototype.getTiles = function () {
                return this.tiles;
            };
            TileMap.prototype.setTiles = function (value) {
                this.tiles = value["slice"]();
                this._width = this.tiles[0].length;
                this._height = this.tiles.length;
                this.indexOpenTiles();
            };
            return TileMap;
        })();
        map.TileMap = TileMap;        
    })(rogue.map || (rogue.map = {}));
    var map = rogue.map;

})(rogue || (rogue = {}));

var rogue;
(function (rogue) {
    
})(rogue || (rogue = {}));

var rogue;
(function (rogue) {
    (function (geom) {
        var Rectangle = (function () {
            function Rectangle(x, y, width, height) {
                this.x = x;
                this.y = y;
                this.width = width;
                this.height = height;
            }
            return Rectangle;
        })();
        geom.Rectangle = Rectangle;        
    })(rogue.geom || (rogue.geom = {}));
    var geom = rogue.geom;

})(rogue || (rogue = {}));

var rogue;
(function (rogue) {
    (function (renderer) {
        var BaseMapRenderer = (function () {
            function BaseMapRenderer() { }
            BaseMapRenderer.prototype.renderMap = function (selection) {
                var tiles = selection.getTiles();
                var row;
                var column;
                var total = tiles.length;
                var rowWidth = tiles[0].length;
                var currentTile;
                var tileID = 0;
                this.clearMap();
                for(row = 0; row < total; row++) {
                    for(column = 0; column < rowWidth; column++) {
                        currentTile = tiles[row][column];
                        this.renderTile(column, row, currentTile, selection.getTileID(column, row));
                    }
                }
            };
            BaseMapRenderer.prototype.renderTile = function (j, i, currentTile, tileID) {
            };
            BaseMapRenderer.prototype.clearMap = function () {
            };
            BaseMapRenderer.prototype.renderPlayer = function (j, i, tileType) {
                this.renderTile(j, i, tileType, 0);
            };
            return BaseMapRenderer;
        })();
        renderer.BaseMapRenderer = BaseMapRenderer;        
    })(rogue.renderer || (rogue.renderer = {}));
    var renderer = rogue.renderer;

})(rogue || (rogue = {}));

var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
var rogue;
(function (rogue) {
    (function (renderer) {
        var CanvasMapRenderer = (function (_super) {
            __extends(CanvasMapRenderer, _super);
            function CanvasMapRenderer(canvas, tileSize) {
                        _super.call(this);
                this.canvas = canvas;
                this.target = this.canvas.getContext("2d");
                this.tileRect = tileSize;
            }
            CanvasMapRenderer.prototype.renderTile = function (j, i, currentTile, tileID) {
                _super.prototype.renderTile.call(this, j, i, currentTile, tileID);
                this.tileRect.x = j * this.tileRect.width;
                this.tileRect.y = i * this.tileRect.height;
                this.target.fillStyle = this.tileColor(currentTile);
                this.target.fillRect(this.tileRect.x, this.tileRect.y, this.tileRect.width, this.tileRect.height);
                this.target.strokeStyle = "black";
                this.target.strokeRect(this.tileRect.x, this.tileRect.y, this.tileRect.width, this.tileRect.height);
            };
            CanvasMapRenderer.prototype.clearMap = function () {
                this.canvas.width = this.canvas.width;
            };
            CanvasMapRenderer.prototype.tileColor = function (value) {
                switch(value) {
                    case " ": {
                        return "#ffffff";
                        break;

                    }
                    case "@": {
                        return "#ff0000";

                    }
                    case "x": {
                        return "#00ff00";

                    }
                    case "?": {
                        return "#666666";

                    }
                    default: {
                        return "#333333";

                    }
                }
            };
            return CanvasMapRenderer;
        })(renderer.BaseMapRenderer);
        renderer.CanvasMapRenderer = CanvasMapRenderer;        
    })(rogue.renderer || (rogue.renderer = {}));
    var renderer = rogue.renderer;

})(rogue || (rogue = {}));

var rogue;
(function (rogue) {
    (function (controls) {
        var Keyboard = {
            'LEFT': 37,
            'UP': 38,
            'RIGHT': 39,
            'DOWN': 40
        };
        var Input = (function () {
            function Input() {
                var _this = this;
                window.addEventListener("keydown", function (event) {
                    return _this.keydown(event);
                }, false);
                window.addEventListener("keyup", function (event) {
                    return _this.keyup(event);
                }, false);
            }
            Input.prototype.keydown = function (event) {
                this.clear();
                event.stopPropagation();
                event.preventDefault();
            };
            Input.prototype.keyup = function (event) {
                var keyCode = event["keyCode"];
                switch(keyCode) {
                    case Keyboard.UP: {
                        this.state = "up";
                        break;

                    }
                    case Keyboard.RIGHT: {
                        this.state = "right";
                        break;

                    }
                    case Keyboard.DOWN: {
                        this.state = "down";
                        break;

                    }
                    case Keyboard.LEFT: {
                        this.state = "left";
                        break;

                    }
                }
                event.stopPropagation();
                event.preventDefault();
            };
            Input.prototype.clear = function () {
                this.state = null;
            };
            return Input;
        })();
        controls.Input = Input;        
    })(rogue.controls || (rogue.controls = {}));
    var controls = rogue.controls;

})(rogue || (rogue = {}));

var rogue;
(function (rogue) {
    (function (controls) {
        var Directions = {
            UP: new rogue.geom.Point(0, -1),
            DOWN: new rogue.geom.Point(0, 1),
            RIGHT: new rogue.geom.Point(1, 0),
            LEFT: new rogue.geom.Point(-1, 0)
        };
        var MovementHelper = (function () {
            function MovementHelper(map) {
                this.map = map;
            }
            MovementHelper.prototype.move = function (x, y, playerToken) {
                if (typeof playerToken === "undefined") { playerToken = "@"; }
                console.log("Move", x + " ", y + " ", this.playerPosition.x + " ", this.playerPosition.y);
                this.playerPosition.x = x;
                this.playerPosition.y = y;
            };
            MovementHelper.prototype.previewMove = function (state) {
                var tmpPoint;
                switch(state) {
                    case "up": {
                        tmpPoint = Directions.UP;
                        break;

                    }
                    case "right": {
                        tmpPoint = Directions.RIGHT;
                        break;

                    }
                    case "down": {
                        tmpPoint = Directions.DOWN;
                        break;

                    }
                    case "left": {
                        tmpPoint = Directions.LEFT;
                        break;
                        defualt:
return null;

                    }
                }
                var tmpPosition = this.playerPosition.clone();
                tmpPosition.x += tmpPoint.x;
                tmpPosition.y += tmpPoint.y;
                if(tmpPosition.x < 0 || tmpPosition.x + 1 > this.map.getWidth()) {
                    return null;
                }
                if(tmpPosition.y < 0 || tmpPosition.y + 1 > this.map.getHeight()) {
                    return null;
                }
                return tmpPosition;
            };
            MovementHelper.prototype.getPlayerPosition = function () {
                return this.playerPosition;
            };
            MovementHelper.prototype.startPosition = function (value) {
                this.playerPosition = value;
                this.oldTileValue = "E";
            };
            return MovementHelper;
        })();
        controls.MovementHelper = MovementHelper;        
    })(rogue.controls || (rogue.controls = {}));
    var controls = rogue.controls;

})(rogue || (rogue = {}));

var rogue;
(function (rogue) {
    (function (map) {
        var MapPopulater = (function () {
            function MapPopulater(map) {
                this.openSpaces = [];
                this.map = map;
                this.openSpaces = map.getOpenTiles();
            }
            MapPopulater.prototype.getOpenSpaces = function () {
                return this.openSpaces.length;
            };
            MapPopulater.prototype.populateMap = function (items) {
                var key;
                var i;
                var total = items.length;
                for(i = 0; i < total; i++) {
                    this.randomlyPlaceTile(items[i]);
                }
            };
            MapPopulater.prototype.randomlyPlaceTile = function (key) {
                var point = this.getRandomEmptyPoint();
                if(point) {
                    this.placeTile(point, key);
                }
            };
            MapPopulater.prototype.placeTile = function (point, key) {
                this.map.swapTile(point, key);
            };
            MapPopulater.prototype.getRandomEmptyPoint = function () {
                return this.openSpaces[Math.floor((Math.random() * this.openSpaces.length))];
            };
            return MapPopulater;
        })();
        map.MapPopulater = MapPopulater;        
    })(rogue.map || (rogue.map = {}));
    var map = rogue.map;

})(rogue || (rogue = {}));

var rogue;
(function (rogue) {
    (function (map) {
        var FogOfWarMapSelection = (function (_super) {
            __extends(FogOfWarMapSelection, _super);
            function FogOfWarMapSelection(map, width, height, viewDistance) {
                        _super.call(this, map, width, height);
                this.exploredTilesHashMap = [];
                this.saveExploredTiles = true;
                this.visiblePoints = [];
                this.exploredTiles = [];
                this.viewDistance = viewDistance;
            }
            FogOfWarMapSelection.prototype.getSurroundingTiles = function (center, horizontalRange, verticalRange) {
                var tiles = _super.prototype.getSurroundingTiles.call(this, center, horizontalRange, verticalRange);
                var newPoint = center.clone();
                newPoint.x -= this.getOffsetX();
                newPoint.y -= this.getOffsetY();
                this.calculateLight(tiles, new rogue.geom.Point(newPoint.y, newPoint.x));
                this.applyLight(tiles, this.visiblePoints);
                if(!this.saveExploredTiles) {
                    this.clear();
                }
                return this.tiles;
            };
            FogOfWarMapSelection.prototype.applyLight = function (tiles, visiblePoints) {
                var width = tiles[0].length;
                var height = tiles.length;
                var rows;
                var columns;
                for(rows = 0; rows < height; rows++) {
                    for(columns = 0; columns < width; columns++) {
                        var uID = this.getTileID(columns, rows);
                        if(this.visiblePoints.indexOf(uID) == -1) {
                            if(this.exploredTilesHashMap[uID] || this._revealAll) {
                                tiles[rows][columns] = tiles[rows][columns] == "?" ? "#" : "?";
                            } else {
                                tiles[rows][columns] = "*";
                            }
                        }
                    }
                }
                visiblePoints.length = 0;
            };
            FogOfWarMapSelection.prototype.calculateLight = function (tiles, center) {
                var totalRows = tiles.length;
                var totalColumns = tiles[0].length;
                var i;
                for(i = 0; i < totalColumns; i++) {
                    this.rayTrace(center.x, center.y, 0, i, tiles);
                    this.rayTrace(center.x, center.y, totalRows - 1, i, tiles);
                }
                for(i = 0; i < totalRows; i++) {
                    this.rayTrace(center.x, center.y, i, 0, tiles);
                    this.rayTrace(center.x, center.y, i, totalColumns - 1, tiles);
                }
            };
            FogOfWarMapSelection.prototype.rayTrace = function (x0, y0, x1, y1, tiles) {
                var dx = Math.abs(x1 - x0);
                var dy = Math.abs(y1 - y0);
                var x = x0;
                var y = y0;
                var n = this.viewDistance;
                var x_inc = (x1 > x0) ? 1 : -1;
                var y_inc = (y1 > y0) ? 1 : -1;
                var error = dx - dy;
                dx *= 2;
                dy *= 2;
                for(; n > 0; --n) {
                    var isWall = this.visit(x, y, tiles, n);
                    if(isWall) {
                        n = 0;
                    }
                    if(error > 0) {
                        x += x_inc;
                        error -= dy;
                    } else {
                        y += y_inc;
                        error += dx;
                    }
                }
            };
            FogOfWarMapSelection.prototype.visit = function (x, y, tiles, distance) {
                if(x < 0) {
                    x = 0;
                }
                if(x > tiles.length - 1) {
                    x = tiles.length - 1;
                }
                if(y < 0) {
                    y = 0;
                }
                if(y > tiles[0].length - 1) {
                    y = tiles[0].length - 1;
                }
                var tile = tiles[x][y];
                var uID = this.getTileID(y, x);
                if(this.visiblePoints.indexOf(uID) == -1) {
                    this.visiblePoints.push(uID);
                }
                if(!this._tourchMode || !this._fullLineOfSight) {
                    if(!this.exploredTilesHashMap[uID] && tile != "#") {
                        this.exploredTilesHashMap[uID] = " ";
                        this.exploredTiles.push(uID);
                    }
                }
                return tile == "#" ? true : false;
            };
            FogOfWarMapSelection.prototype.clear = function () {
                this.exploredTilesHashMap.length = 0;
                this.exploredTiles.length = 0;
            };
            FogOfWarMapSelection.prototype.revealAll = function (value) {
                this._revealAll = value;
            };
            FogOfWarMapSelection.prototype.tourchMode = function (value) {
                this._tourchMode = value;
            };
            FogOfWarMapSelection.prototype.fullLineOfSight = function (value) {
                this._fullLineOfSight = value;
            };
            FogOfWarMapSelection.prototype.getVisitedTiles = function () {
                return this.exploredTiles.length;
            };
            FogOfWarMapSelection.prototype.getExploredTiles = function () {
                return this.exploredTiles;
            };
            return FogOfWarMapSelection;
        })(map.MapSelection);
        map.FogOfWarMapSelection = FogOfWarMapSelection;        
    })(rogue.map || (rogue.map = {}));
    var map = rogue.map;

})(rogue || (rogue = {}));

var rogue;
(function (rogue) {
    (function (map) {
        var Room = (function () {
            function Room(x1, y1, x2, y2) {
                this.x1 = 0;
                this.y1 = 0;
                this.x2 = 0;
                this.y2 = 0;
                if(x1 > x2) {
                    var x = x1;
                    x1 = x2;
                    x2 = x;
                }
                if(y1 > y2) {
                    var y = y1;
                    y1 = y2;
                    y2 = y;
                }
                this.x1 = x1;
                this.y1 = y1;
                this.x2 = x2;
                this.y2 = y2;
                this.connectedRooms = new Object();
                return this;
            }
            Room.prototype.toString = function () {
                return '[room ' + this.x1 + ', ' + this.y1 + ', ' + this.x2 + ', ' + this.y2 + ']';
            };
            Room.prototype.intersects = function (room) {
                return this.x1 <= room.x2 && this.x2 >= room.x1 && this.y1 <= room.y2 && this.y2 >= room.y1;
            };
            Room.prototype.contains = function (x, y) {
                return x >= this.x1 && x <= this.x2 && y >= this.y1 && y <= this.y2;
            };
            Room.prototype.connected = function (otherroom, seenlist) {
                if(this.connectedRooms[otherroom]) {
                    return true;
                }
                var that = this;
                if(!seenlist) {
                    seenlist = {
                        that: true
                    };
                }
                if(seenlist[otherroom]) {
                    return false;
                }
                seenlist[otherroom] = true;
                for(var i in otherroom.connectedRooms) {
                    if(this.connected(otherroom.connectedRooms[i], seenlist)) {
                        return true;
                    }
                }
                return false;
            };
            return Room;
        })();
        map.Room = Room;        
    })(rogue.map || (rogue.map = {}));
    var map = rogue.map;

})(rogue || (rogue = {}));

var rogue;
(function (rogue) {
    (function (map) {
        var RandomMap = (function (_super) {
            __extends(RandomMap, _super);
            function RandomMap(size) {
                        _super.call(this);
                this.dirs = [
                    {
                        x: -1,
                        y: 0
                    }, 
                    {
                        x: 0,
                        y: 1
                    }, 
                    {
                        x: 1,
                        y: 0
                    }, 
                    {
                        x: 0,
                        y: -1
                    }
                ];
                this.mapsize = size;
                this.tiles = [];
                this.randomMap(this.mapsize);
                this.genMaze();
                this.genRooms(1, 3);
            }
            RandomMap.prototype.randomMap = function (mapsize) {
                this.mapsize = mapsize;
                this._width = this._height = mapsize * 2 + 3;
                this.paths = [];
                this._rooms = [];
                for(var i = 0; i < this._height; i++) {
                    var a = [];
                    var b = [];
                    for(var j = 0; j < this._width; j++) {
                        a.push('#');
                        b.push("0");
                    }
                    this.tiles.push(a);
                }
                return this;
            };
            RandomMap.prototype.genMaze = function () {
                var x = 1;
                var y = 1;

                this.tiles[x][y] = ' ';
                while(1) {
                    var dir = Math.floor(Math.random() * 4);
                    for(var i = 0; i < 4; i++) {
                        var testdir = (dir + i) % 4;
                        var newx = x + this.dirs[testdir].x * 2;
                        var newy = y + this.dirs[testdir].y * 2;

                        if(newx > 0 && newx < this._width && newy > 0 && newy < this._height && this.tiles[newx][newy] == '#') {
                            break;
                        }
                    }
                    if(i < 4) {
                        x += this.dirs[testdir].x;
                        y += this.dirs[testdir].y;
                        this.tiles[x][y] = ' ';
                        x += this.dirs[testdir].x;
                        y += this.dirs[testdir].y;
                        this.tiles[x][y] = '' + testdir;
                    } else {
                        if(x == 1 && y == 1) {
                            break;
                        } else {
                            dir = this.tiles[x][y];
                            this.tiles[x][y] = ' ';
                            x -= this.dirs[dir].x * 2;
                            y -= this.dirs[dir].y * 2;
                        }
                    }
                }
            };
            RandomMap.prototype.genRooms = function (min, max) {
                var trycount = 0;
                while(1) {
                    if(trycount > 10) {
                        break;
                    }
                    var _width = Math.floor(Math.random() * max) + min;
                    var _height = Math.floor(Math.random() * max) + min;
                    var x1 = Math.floor(Math.random() * (this.mapsize - _width)) * 2 + 1;
                    var y1 = Math.floor(Math.random() * (this.mapsize - _height)) * 2 + 1;
                    var x2 = x1 + _width * 2;
                    var y2 = y1 + _height * 2;

                    room = new map.Room(x1, y1, x2, y2);
                    for(var i = 0; i < this._rooms.length; i++) {
                        if(room.intersects(this._rooms[i])) {
                            break;
                        }
                    }
                    if(i == this._rooms.length) {
                        this._rooms.push(room);
                        trycount = 0;
                    } else {
                        trycount++;
                    }
                }
                for(var i = 0; i < this._rooms.length; i++) {
                    var room = this._rooms[i];
                    for(var x = room.x1; x <= room.x2; x++) {
                        for(var y = room.y1; y <= room.y2; y++) {
                            this.tiles[x][y] = " ";
                            this.openTiles.push(new rogue.geom.Point(x, y));
                        }
                    }
                }
            };
            return RandomMap;
        })(map.TileMap);
        map.RandomMap = RandomMap;        
    })(rogue.map || (rogue.map = {}));
    var map = rogue.map;

})(rogue || (rogue = {}));

var rogue;
(function (rogue) {
    var Game = (function () {
        function Game(display) {
            this.display = display;
            this.input = new rogue.controls.Input();
            this.map = new rogue.map.RandomMap(11);
            this.populateMapHelper = new rogue.map.MapPopulater(this.map);
            this.populateMapHelper.populateMap([
                "x", 
                "x", 
                "x", 
                "x", 
                "x", 
                "x", 
                "x", 
                "x", 
                "x", 
                "x", 
                "x", 
                "x", 
                "x", 
                "x", 
                "x", 
                "x", 
                "x", 
                "x", 
                "x", 
                "x", 
                "x", 
                "x", 
                "x", 
                "x", 
                "x", 
                "x", 
                "x", 
                "x", 
                "x", 
                "x", 
                "x", 
                "x"
            ]);
            this.movementHelper = new rogue.controls.MovementHelper(this.map);
            this.movementHelper.startPosition(this.populateMapHelper.getRandomEmptyPoint());
            this.selection = new rogue.map.FogOfWarMapSelection(this.map, 40, 24, 5);
            this.selection.setCenter(this.movementHelper.playerPosition);
            this.renderer = new rogue.renderer.CanvasMapRenderer(this.display, new rogue.geom.Rectangle(0, 0, 20, 20));
            console.log("Random Map", this.map.toString());
            this.onEnterFrame();
        }
        Game.prototype.onEnterFrame = function () {
            this.invalidate();
            var that = this;
            var _cb = function () {
                that.render();
                requestAnimationFrame(_cb);
            };
            _cb(that);
        };
        Game.prototype.render = function () {
            if(this.input.state) {
                this.move(this.input.state);
            }
            if(this.invalid) {
                this.renderer.renderMap(this.selection);
                var pos = this.movementHelper.playerPosition;
                var x = pos.x - this.selection.getOffsetX();
                var y = pos.y - this.selection.getOffsetY();
                this.renderer.renderPlayer(x, y, "@");
                this.invalid = false;
            }
            this.input.clear();
        };
        Game.prototype.move = function (state) {
            var tmpPoint = this.movementHelper.previewMove(state);
            if(tmpPoint != null) {
                var tile = this.map.getTileType(tmpPoint);
                switch(tile) {
                    case " ":
                    case "x": {
                        this.movementHelper.move(tmpPoint.x, tmpPoint.y);
                        this.selection.setCenter(this.movementHelper.playerPosition);
                        this.invalidate();
                        break;

                    }
                }
            }
        };
        Game.prototype.invalidate = function () {
            this.invalid = true;
        };
        return Game;
    })();
    rogue.Game = Game;    
})(rogue || (rogue = {}));

window.onload = function () {
    var canvas = document.getElementById('display');
    var rogueTS = new rogue.Game(canvas);
};
