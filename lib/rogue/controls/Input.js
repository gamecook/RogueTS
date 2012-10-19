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

