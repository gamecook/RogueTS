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

