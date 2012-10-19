var rogue;
(function (rogue) {
    (function (geom) {
        var Point = (function () {
            function Point(x, y) {
                this.x = x || 0;
                this.y = y || 0;
            }
            Point.prototype.add = function (v) {
                return new Point(this.x + v.x, this.y + v.y);
            };
            Point.prototype.clone = function () {
                return new Point(this.x, this.y);
            };
            Point.prototype.distance = function (v) {
                var x = this.x - v.x;
                var y = this.y - v.y;
                return Math.sqrt(x * x + y * y);
            };
            Point.prototype.toString = function () {
                return "(x=" + this.x + ", y=" + this.y + ")";
            };
            return Point;
        })();
        geom.Point = Point;        
    })(rogue.geom || (rogue.geom = {}));
    var geom = rogue.geom;

})(rogue || (rogue = {}));

