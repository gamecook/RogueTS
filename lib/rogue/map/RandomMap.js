var rogue;
(function (rogue) {
    (function (map) {
        var RandomMap = (function () {
            function RandomMap() { }
            return RandomMap;
        })();
        map.RandomMap = RandomMap;        
    })(rogue.map || (rogue.map = {}));
    var map = rogue.map;

})(rogue || (rogue = {}));

