var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
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

