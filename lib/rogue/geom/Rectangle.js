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

