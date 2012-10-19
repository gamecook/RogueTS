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

