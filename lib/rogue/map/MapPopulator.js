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

