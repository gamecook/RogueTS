var rogue;
(function (rogue) {
    (function (map) {
        var Room = (function () {
            function Room(x1, y1, x2, y2) {
                this.x1 = 0;
                this.y1 = 0;
                this.x2 = 0;
                this.y2 = 0;
                if(x1 > x2) {
                    var x = x1;
                    x1 = x2;
                    x2 = x;
                }
                if(y1 > y2) {
                    var y = y1;
                    y1 = y2;
                    y2 = y;
                }
                this.x1 = x1;
                this.y1 = y1;
                this.x2 = x2;
                this.y2 = y2;
                this.connectedRooms = new Object();
                return this;
            }
            Room.prototype.toString = function () {
                return '[room ' + this.x1 + ', ' + this.y1 + ', ' + this.x2 + ', ' + this.y2 + ']';
            };
            Room.prototype.intersects = function (room) {
                return this.x1 <= room.x2 && this.x2 >= room.x1 && this.y1 <= room.y2 && this.y2 >= room.y1;
            };
            Room.prototype.contains = function (x, y) {
                return x >= this.x1 && x <= this.x2 && y >= this.y1 && y <= this.y2;
            };
            Room.prototype.connected = function (otherroom, seenlist) {
                if(this.connectedRooms[otherroom]) {
                    return true;
                }
                var that = this;
                if(!seenlist) {
                    seenlist = {
                        that: true
                    };
                }
                if(seenlist[otherroom]) {
                    return false;
                }
                seenlist[otherroom] = true;
                for(var i in otherroom.connectedRooms) {
                    if(this.connected(otherroom.connectedRooms[i], seenlist)) {
                        return true;
                    }
                }
                return false;
            };
            return Room;
        })();
        map.Room = Room;        
    })(rogue.map || (rogue.map = {}));
    var map = rogue.map;

})(rogue || (rogue = {}));

