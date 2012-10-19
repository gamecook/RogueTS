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

