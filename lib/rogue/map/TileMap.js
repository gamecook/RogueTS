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

