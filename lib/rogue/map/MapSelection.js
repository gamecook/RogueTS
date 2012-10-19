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

