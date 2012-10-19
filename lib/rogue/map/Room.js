var rogue;
(function (rogue) {
    (function (map) {
        var Room = (function () {
            function Room() { }
            return Room;
        })();
        map.Room = Room;        
    })(rogue.map || (rogue.map = {}));
    var map = rogue.map;

})(rogue || (rogue = {}));

