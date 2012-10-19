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

