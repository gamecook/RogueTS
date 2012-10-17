module rogue {
    export class Game {
        display: HTMLCanvasElement;
        invalid: bool;
        renderer: renderer.IMapRenderer;
        map: map.IMap;
        selection: map.IMapSelection;
        input: controls.Input;
        movementHelper: controls.MovementHelper;
        populateMapHelper:map.MapPopulater;
        
        constructor (display: HTMLCanvasElement) {
            this.display = display;
            this.input = new controls.Input();

            var mapTiles =
                        [
                            ["#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#"],
                            ["#", "#", "#", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "#"],
                            ["#", "#", "#", " ", " ", " ", " ", " ", "#", "#", "#", "#", "#", " ", "#", " ", " ", " ", " ", " ", " ", " ", " ", " ", "#", "#", "#", "#", "#", "#", "#", " ", "#", "#", "#", "#", "#", " ", "#", " ", "#"],
                            ["#", "#", "#", " ", " ", " ", " ", " ", " ", " ", " ", " ", "#", " ", "#", " ", " ", " ", " ", " ", " ", " ", " ", " ", "#", " ", " ", " ", " ", " ", " ", " ", " ", " ", "#", "#", "#", " ", "#", " ", "#"],
                            ["#", "#", "#", " ", " ", " ", " ", " ", "#", "#", "#", " ", "#", " ", "#", " ", " ", " ", " ", " ", " ", " ", " ", " ", "#", " ", " ", " ", " ", " ", " ", " ", " ", " ", "#", "#", "#", " ", "#", " ", "#"],
                            ["#", "#", "#", " ", " ", " ", " ", " ", "#", "#", "#", " ", "#", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "#", " ", " ", " ", " ", " ", " ", " ", " ", " ", "#", "#", "#", " ", "#", " ", "#"],
                            ["#", "#", "#", " ", " ", " ", " ", " ", "#", "#", "#", " ", "#", "#", "#", "#", "#", " ", "#", "#", "#", "#", "#", "#", "#", " ", " ", " ", " ", " ", " ", " ", " ", " ", "#", "#", "#", " ", "#", " ", "#"],
                            ["#", "#", "#", " ", " ", " ", " ", " ", "#", "#", "#", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "#", " ", "#"],
                            ["#", "#", "#", " ", " ", " ", " ", " ", "#", "#", "#", "#", "#", "#", "#", "#", "#", " ", " ", " ", " ", " ", " ", " ", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", " ", "#"],
                            ["#", "#", "#", " ", " ", " ", " ", " ", "#", "#", "#", "#", "#", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", " ", "#"],
                            ["#", "#", "#", " ", "#", "#", "#", "#", "#", "#", "#", "#", "#", " ", "#", "#", "#", " ", " ", " ", " ", " ", " ", " ", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", " ", "#"],
                            ["#", "#", "#", " ", "#", "#", "#", "#", "#", "#", "#", "#", "#", " ", "#", "#", "#", " ", " ", " ", " ", " ", " ", " ", " ", " ", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", " ", " ", " ", "#"],
                            ["#", "#", "#", " ", "#", "#", "#", "#", "#", "#", "#", "#", "#", " ", "#", "#", "#", " ", " ", " ", " ", " ", " ", " ", "#", " ", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", " ", "#", " ", "#"],
                            ["#", "#", "#", " ", " ", " ", " ", " ", " ", " ", "#", "#", "#", " ", "#", "#", "#", " ", " ", " ", " ", " ", " ", " ", "#", " ", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", " ", " ", " ", "#"],
                            ["#", "#", "#", " ", " ", " ", " ", " ", " ", " ", "#", "#", "#", " ", "#", "#", "#", " ", " ", " ", " ", " ", " ", " ", "#", " ", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", " ", "#"],
                            ["#", "#", "#", " ", " ", " ", " ", " ", " ", " ", "#", " ", " ", " ", "#", " ", " ", " ", " ", " ", " ", " ", " ", " ", "#", " ", " ", " ", "#", "#", "#", " ", " ", " ", " ", " ", "#", "#", "#", " ", "#"],
                            ["#", "#", "#", " ", " ", " ", " ", " ", " ", " ", "#", " ", "#", "#", "#", " ", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", " ", "#", "#", "#", " ", " ", " ", " ", " ", "#", "#", "#", " ", "#"],
                            ["#", "#", "#", " ", " ", " ", " ", " ", " ", " ", " ", " ", "#", "#", "#", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "#", " ", " ", " ", "#", " ", " ", " ", " ", " ", "#", "#", "#", " ", "#"],
                            ["#", "#", "#", " ", " ", " ", " ", " ", " ", " ", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", " ", "#", "#", "#", " ", "#", " ", " ", " ", " ", " ", "#", "#", "#", " ", "#"],
                            ["#", "#", "#", " ", " ", " ", " ", " ", " ", " ", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", " ", " ", " ", "#", " ", " ", " ", " ", " ", " ", " ", "#", " ", " ", " ", "#"],
                            ["#", "#", "#", " ", " ", " ", " ", " ", " ", " ", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", " ", "#", "#", "#", "#", "#", "#", "#", "#", "#", " ", "#", " ", "#"],
                            ["#", "#", "#", " ", " ", " ", " ", " ", " ", " ", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", " ", " ", " ", " ", " ", "#", "#", "#", "#", "#", " ", " ", " ", "#"],
                            ["#", "#", "#", " ", "#", "#", "#", "#", "#", " ", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", " ", "#", "#", "#", "#", "#", "#", "#", " ", "#"],
                            ["#", "#", "#", " ", "#", "#", "#", "#", "#", " ", "#", "#", "#", "#", "#", " ", " ", " ", " ", " ", " ", " ", " ", " ", "#", "#", "#", "#", "#", " ", " ", " ", "#", "#", "#", "#", "#", "#", "#", " ", "#"],
                            ["#", "#", "#", " ", "#", "#", "#", "#", "#", " ", "#", "#", "#", "#", "#", " ", " ", " ", " ", " ", " ", " ", " ", " ", "#", "#", "#", "#", "#", " ", "#", "#", "#", "#", "#", "#", "#", "#", "#", " ", "#"],
                            ["#", "#", "#", " ", " ", " ", " ", " ", "#", " ", "#", "#", "#", "#", "#", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "#", "#", "#", "#", "#", "#", "#", "#", "#", " ", "#"],
                            ["#", "#", "#", " ", "#", "#", "#", " ", "#", " ", "#", "#", "#", "#", "#", " ", " ", " ", " ", " ", " ", " ", " ", " ", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", " ", "#"],
                            ["#", "#", "#", " ", "#", "#", "#", " ", " ", " ", " ", " ", " ", " ", "#", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "#", " ", " ", " ", "#"],
                            ["#", "#", "#", " ", "#", "#", "#", " ", " ", " ", " ", " ", " ", " ", "#", " ", " ", " ", " ", " ", " ", " ", " ", " ", "#", "#", "#", " ", " ", " ", " ", " ", " ", " ", " ", " ", "#", " ", "#", " ", "#"],
                            ["#", "#", "#", " ", "#", "#", "#", " ", " ", " ", " ", " ", " ", " ", "#", " ", " ", " ", " ", " ", " ", " ", " ", " ", "#", "#", "#", " ", " ", " ", " ", " ", " ", " ", " ", " ", "#", " ", "#", " ", "#"],
                            ["#", "#", "#", " ", "#", "#", "#", " ", " ", " ", " ", " ", " ", " ", "#", "#", "#", "#", "#", " ", "#", "#", "#", "#", "#", "#", "#", " ", " ", " ", " ", " ", " ", " ", " ", " ", "#", " ", "#", " ", "#"],
                            ["#", "#", "#", " ", "#", "#", "#", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "#", "#", "#", "#", "#", "#", "#", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "#", " ", "#"],
                            ["#", "#", "#", " ", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", " ", " ", " ", " ", " ", " ", " ", " ", " ", "#", "#", "#", " ", "#"],
                            ["#", "#", "#", " ", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", " ", " ", " ", " ", " ", " ", " ", " ", " ", "#", "#", "#", " ", "#"],
                            ["#", "#", "#", " ", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", " ", " ", " ", " ", " ", " ", " ", " ", " ", "#", "#", "#", " ", "#"],
                            ["#", "#", "#", " ", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", " ", " ", " ", " ", " ", " ", " ", " ", " ", "#", "#", "#", " ", "#"],
                            ["#", "#", "#", " ", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", " ", "#"],
                            ["#", "#", "#", " ", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", " ", "#"],
                            ["#", "#", "#", " ", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", " ", "#"],
                            ["#", "#", "#", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "#"],
                            ["#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#"]
                        ];

            this.map = new map.TileMap();
            this.map.setTiles(mapTiles);

            this.populateMapHelper = new map.MapPopulater(this.map);
            this.populateMapHelper.populateMap(["x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"]);

            this.movementHelper = new controls.MovementHelper(this.map);
            this.movementHelper.startPosition(this.populateMapHelper.getRandomEmptyPoint()); //TODO this need to be filled in by the populateMapHelper

            this.selection = new map.FogOfWarMapSelection(this.map, 40, 24, 5);
            this.selection.setCenter(this.movementHelper.playerPosition);

            this.renderer = new renderer.CanvasMapRenderer(this.display, new geom.Rectangle(0, 0, 20, 20));

            // Start game loop
            this.onEnterFrame();
        }



        onEnterFrame() {

            // Invalidate the display
            this.invalidate();

            // Begin rendering the display
            var that = this;
            var _cb = function () { that.render(that); requestAnimationFrame(_cb); }
            _cb(that);
        }

        render(instance: Game) {

            //TODO need to pool for controls
            if (this.input.state) {
                console.log("state", this.input.state);
                this.move(this.input.state);
            }

            if (instance.invalid) {
                console.log("$Running Loop");


                instance.renderer.renderMap(instance.selection); //fogOfWarSelection);

                var pos: geom.Point = this.movementHelper.playerPosition;

                var x: number = pos.x - this.selection.getOffsetX();
                var y: number = pos.y - this.selection.getOffsetY();

                this.renderer.renderPlayer(x, y, "@");


                instance.invalid = false;
            }

            this.input.clear();

        }

        move(state:string): void {

            var tmpPoint: geom.Point = this.movementHelper.previewMove(state);

            if (tmpPoint != null) {
                var tile: string = this.map.getTileType(tmpPoint);
                switch (tile) {
                    case " ": case "x":
                        this.movementHelper.move(tmpPoint.x, tmpPoint.y);
                        this.selection.setCenter(this.movementHelper.playerPosition);
                        this.invalidate();
                        break;
                }
            }
        }

        invalidate(): void {
            this.invalid = true;
        }
    }
}

module rogue.geom {
    export class Point {
        // Adapted from https://github.com/moagrius/Point/blob/master/Point.js

        x: number;
        y: number;

        constructor (x: number, y: number) {
            this.x = x || 0;
            this.y = y || 0;
        }

        /**
	    * Adds the coordinates of another point to the coordinates of this point to create a new point.
	    * @function
	    * @param {Point} v The point to be added.
	    * @returns Point
	    */
        add(v: Point): Point {
            return new Point(this.x + v.x, this.y + v.y);
        };

            /**
            * Creates a copy of this Point object.
            * @function
            * @returns Point
            */
        clone(): Point {
            return new Point(this.x, this.y);
        };

        /**
	    * Returns the distance between this and another Point.
	    * @function
	    * @param {Point} v The point at the opposite end of the distance comparison.
	    * @returns number
	    */
        distance(v: Point): number {
            var x: number = this.x - v.x;
            var y: number = this.y - v.y;
            return Math.sqrt(x * x + y * y);
        };

            /**
            * Returns the Point object expressed as a String value.
            * @function
            * @returns string
            */
        toString(): string {
            return "(x=" + this.x + ", y=" + this.y + ")";
        };

    }

    export class Rectangle {
        x: number;
        y: number;
        width: number;
        height: number;

        constructor (x: number, y: number, width: number, height: number) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }
    }
}

module rogue.map {
    export interface ISelectTiles {
        getTileID(column: number, row: number): number;

        getTiles(): any[];
    }

    export interface IMapSelection extends ISelectTiles {
        getOffsetX(): number;

        getOffsetY(): number;

        setCenter(value: geom.Point): void;

        getCenter(): geom.Point;

        toString(): string;
    }

    interface IRangeObject {
        start: number;
        end: number;
    }

    export class MapSelection implements IMapSelection {
        map: IMap;
        tiles: any[] = [];
        offsetX: number = 0;
        offsetY: number = 0;
        centerPoint: geom.Point;
        width: number = 0;
        height: number = 0;

        constructor (map: IMap, width: number, height: number) {
            this.height = height;
            this.width = width;
            this.map = map;
        }

        /**
         *
         * @param center
         * @param horizontalRange
         * @param verticalRange
         * @return
         */
        getSurroundingTiles(center: geom.Point, horizontalRange: number, verticalRange: number): any[] {
            //TODO need to test different vertical and horizontal ranges, on horizontal is being used.

            this.tiles.length = 0;
            var i: number;

            var hRangeObj: IRangeObject = this.calculateRange(center.x, horizontalRange, this.map.getWidth());
            var vRangeObj: IRangeObject = this.calculateRange(center.y, verticalRange + 1, this.map.getHeight());
            //TODO look into why this is off by one
            vRangeObj.end += 1;

            this.offsetX = hRangeObj.start;
            this.offsetY = vRangeObj.start;

            for (i = vRangeObj.start; i < vRangeObj.end; i++) {
                this.tiles.push(this.getTilesInRow(i, hRangeObj.start, hRangeObj.end));
            }

            return this.tiles;
        }

        calculateRange(center: number, range: number, length: number): IRangeObject {
            var obj: IRangeObject = <IRangeObject>{ start: 0, end: 0 };

            range--;

            if (center == 0) {
                // At far right
                obj.start = center;
                obj.end = range;
            }
            else if (center == length - 1) {
                // At far right
                obj.start = center - range;
                obj.end = center;
            }
            else {
                // Center
                var split: number = Math.floor(range * .5);
                var paddingLeft: number = split;
                var paddingRight: number = range - split;
                var mapCenter: number = Math.floor(length * .5);

                if (center < mapCenter) {
                    var leftOutOfBounds: number = center - paddingLeft;
                    if (leftOutOfBounds < 0) {
                        paddingRight -= leftOutOfBounds;
                        paddingLeft += leftOutOfBounds;
                    }
                }
                else if (center > mapCenter) {
                    var rightOutOfBounds: number = (length - 1) - (center + paddingRight);
                    if (rightOutOfBounds < 0) {
                        paddingRight += rightOutOfBounds;
                        paddingLeft -= rightOutOfBounds;
                    }
                }
                obj.start = center - paddingLeft;
                obj.end = obj.start + paddingLeft + paddingRight;
            }

            // Just in case, make sure set is always in range
            if (obj.start < 0) {
                // If start is less then 0, shift selection back into range.
                obj.start = 0;
                obj.end++;
            }

            // Make sure selection is never larger then the length.
            if (obj.end > length)
                obj.end = length;

            return obj;
        }


        /**
         *
         * @param i
         * @param start
         * @param end
         * @return
         */
        getTilesInRow(i: number, start: number, end: number): any[] {

            var row: any[] = this.map.getTiles()[i];

            var tiles: any[] = row["slice"](start, end + 1);

            return tiles;
        }


        getTiles(): any[] {
            return this.tiles;
        }

        getOffsetX(): number {
            return this.offsetX;
        }

        getOffsetY(): number {
            return this.offsetY;
        }

        setCenter(value: geom.Point): void {
            this.centerPoint = value.clone();
            this.getSurroundingTiles(this.centerPoint, this.width, this.height);

        }

        getTileID(column: number, row: number): number {
            return this.map.getTileID(row + this.offsetY, column + this.offsetX);
        }

        getCenter(): geom.Point {
            return this.centerPoint;
        }

        toString(): string {
            var stringMap: string = "";
            var total: number = this.getTiles.length;
            var i: number;

            // Render Map
            for (i = 0; i < total; i++) {
                stringMap = stringMap + (this.getTiles[i]).join() + "\n";
            }

            return stringMap;
        }
    }

    export class FogOfWarMapSelection extends MapSelection
    {
        exploredTilesHashMap:string[] = [];
        saveExploredTiles:bool = true;
        _revealAll:bool;
        visiblePoints:any[] = [];
        viewDistance:number;
        _tourchMode:bool;
        _fullLineOfSight:bool;
        exploredTiles:number[] = [];

        constructor(map:IMap, width:number, height:number, viewDistance:number)
        {
            super(map, width, height);
            this.viewDistance = viewDistance;
        }

        getSurroundingTiles(center:geom.Point, horizontalRange:number, verticalRange:number):any[]
        {

            var tiles:any[] = super.getSurroundingTiles(center, horizontalRange, verticalRange);

            // Need to adjust the center point coming in
            var newPoint:geom.Point = center.clone();
            newPoint.x -= this.getOffsetX();
            newPoint.y -= this.getOffsetY();

            this.calculateLight(tiles, new geom.Point(newPoint.y, newPoint.x));

            this.applyLight(tiles, this.visiblePoints);

            if (!this.saveExploredTiles)
                this.clear();

            return this.tiles;
        }

        applyLight(tiles:any[], visiblePoints:any[]):void
        {
            var width:number = tiles[0].length;
            var height:number = tiles.length;

            var rows:number;
            var columns:number;

            for (rows = 0; rows < height; rows++)
            {
                for (columns = 0; columns < width; columns ++)
                {
                    var uID:number = this.getTileID(columns, rows);
                    if (this.visiblePoints.indexOf(uID) == -1)
                    {
                        if (this.exploredTilesHashMap[uID] || this._revealAll)
                            tiles[rows][columns] = tiles[rows][columns] == "?" ? "#" : "?";
                        else
                            tiles[rows][columns] = "*";
                    }
                }

            }

            visiblePoints.length = 0;
        }

        calculateLight(tiles:any[], center:geom.Point):void
        {

            var totalRows:number = tiles.length;
            var totalColumns:number = tiles[0].length;
            var i:number;

            // Get top
            for (i = 0; i < totalColumns; i++)
            {
                this.rayTrace(center.x, center.y, 0, i, tiles);
                this.rayTrace(center.x, center.y, totalRows - 1, i, tiles);
            }

            for (i = 0; i < totalRows; i++)
            {
                this.rayTrace(center.x, center.y, i, 0, tiles);
                this.rayTrace(center.x, center.y, i, totalColumns - 1, tiles);
            }
        }


        rayTrace(x0:number, y0:number, x1:number, y1:number, tiles:any[]):void
        {

            var dx:number = Math.abs(x1 - x0);
            var dy:number = Math.abs(y1 - y0);
            var x:number = x0;
            var y:number = y0;
            var n:number = this.viewDistance;//(!_fullLineOfSight) ? viewDistance : 1 + dx + dy;
            var x_inc:number = (x1 > x0) ? 1 : -1;
            var y_inc:number = (y1 > y0) ? 1 : -1;
            var error:number = dx - dy;
            dx *= 2;
            dy *= 2;

            for (; n > 0; --n)
            {
                var isWall:Boolean = this.visit(x, y, tiles, n);

                if (isWall)
                    n = 0;

                if (error > 0)
                {
                    x += x_inc;
                    error -= dy;
                }
                else
                {
                    y += y_inc;
                    error += dx;
                }
            }

        }

        visit(x:number, y:number, tiles:any[], distance:number):Boolean
        {
            //TODO not sure why I would ever get a value less then 0 but I do
            if (x < 0) x = 0;
            if (x > tiles.length - 1) x = tiles.length - 1;
            if (y < 0) y = 0;
            if (y > tiles[0].length - 1) y = tiles[0].length - 1;

            var tile:string = tiles[x][y];

            var uID:number = this.getTileID(y, x);

            if (this.visiblePoints.indexOf(uID) == -1)
                this.visiblePoints.push(uID);

            if (!this._tourchMode || !this._fullLineOfSight)
            {
                if (!this.exploredTilesHashMap[uID] && tile != "#")
                {
                    this.exploredTilesHashMap[uID] = " ";
                    this.exploredTiles.push(uID);
                }
            }
            //TODO this should use the type types to see if it is see threw not just a wall to add shadow around monsters
            return tile == "#" ? true : false;
        }

        clear():void
        {
            this.exploredTilesHashMap.length = 0;
            this.exploredTiles.length = 0;
        }

        revealAll(value:bool):void
        {
            this._revealAll = value;

        }

        tourchMode(value:bool):void
        {
            this._tourchMode = value;
        }

        fullLineOfSight(value:bool):void
        {
            this._fullLineOfSight = value;
        }

        getVisitedTiles():number
        {
            return this.exploredTiles.length;
        }

        getExploredTiles():any[]
        {
            return this.exploredTiles;
        }
    }

    export interface IMap extends ISelectTiles {

        getTileType(position: geom.Point): string;

        getWidth(): number;

        getHeight(): number;

        swapTile(point: geom.Point, value: string): string;

        getOpenTiles(): any[];

        setTiles(value: any[]): void;
    }

    export class TileMap implements IMap {
        tiles: any[] = [];
        dirs: Array;
        mapsize: number;
        paths: Array;
        _rooms: Array;
        _width: number;
        _height: number;
        openTiles: any[] = [];

        /**
         *
         * @param self
         * @throws Error
         */
        constructor () {
            //TODO need to pass in width/height into constructor
        }

        /**
         *
         * @param tiles
         */
        addRow(tiles: Array): void {
            tiles.push(tiles);
        }

        /**
         *
         * @param position
         * @return
         */
        getTileType(position: geom.Point): string {
            return this.tiles[position.y][position.x];
        }

        /**
         *
         * @param id
         */
        removeRow(id: number): void {
            this.tiles.splice(id, 1);
        }

        indexOpenTiles(): void {
            var row: number;
            var column: number;
            var totalRows: number = this.getHeight();
            var totalColumns: number = this.getWidth();
            var tile: string;

            for (row = 0; row < this._height; row++) {
                for (column = 0; column < this._width; column++) {
                    tile = this.tiles[row][column];
                    if (tile != "#")
                        this.openTiles.push(new geom.Point(column, row));
                }
            }
        }

        /**
         *
         * @return
         */
        toString(): string {
            var stringMap: string = "";
            var total: number = this.tiles.length;
            var i: number;
            // Render Map
            for (i = 0; i < total; i++) {
                stringMap = stringMap + (this.tiles[i]).join() + "\n";
            }

            return stringMap;
        }

        getWidth(): number {
            return this._width;
        }

        getHeight(): number {
            return this._height;
        }

        swapTile(point: geom.Point, value: string): string {
            var oldValue: string = this.tiles[point.y][point.x];
            this.tiles[point.y][point.x] = value;
            return oldValue;
        }

        getTileID(row: number, column: number): number {
            return row * this._width + column;
        }

        tileIDToPoint(id: number): geom.Point {
            return new geom.Point(id % this._width, id / this._width);
        }

        getOpenTiles(): any[] {
            return this.openTiles;
        }

        toObject(): void {
            /*var mapObj: Object = {};
            mapObj.tiles = this.tiles;
            return mapObj;*/
        }

        getTiles(): any[] {
            return this.tiles;
        }

        setTiles(value: any[]): void {
            //TODO Need to index tiles to find empty tiles.
            this.tiles = value["slice"]();// This is a hack
            this._width = this.tiles[0].length;
            this._height = this.tiles.length;
            this.indexOpenTiles();
        }
    }

    export class MapPopulater
    {
        map:IMap;
        openSpaces:any[] = [];

        getOpenSpaces():number
        {
            return this.openSpaces.length;
        }

        constructor(map:IMap)
        {
            this.map = map;
            this.openSpaces = map.getOpenTiles();
        }

        populateMap(items:string[]):void
        {
            var key:string;
            var i: number;
            var total: number = items.length;
            for (i = 0; i < total; i++)
            {
                this.randomlyPlaceTile(items[i]);
            }
        }

        randomlyPlaceTile(key:string):void
        {
            var point:geom.Point = this.getRandomEmptyPoint();
            if (point)
                this.placeTile(point, key);
        }

        placeTile(point:geom.Point, key:string):void
        {
            this.map.swapTile(point, key);
        }

        getRandomEmptyPoint():geom.Point
        {
            return this.openSpaces[Math.floor((Math.random() * this.openSpaces.length))];
        }

    }
}

module rogue.renderer {
    export interface IMapRenderer {
        renderMap(selection: map.ISelectTiles): void;
        renderTile(j: number, i: number, currentTile: string, tileId: number): void;
        clearMap(): void;
        renderPlayer(j: number, i: number, tileType: string): void;
    }

    class BaseMapRenderer implements IMapRenderer {
        renderMap(selection: map.ISelectTiles): void {
            var tiles: any[] = selection.getTiles();
            var row: number;
            var column: number;
            var total: number = tiles.length;
            var rowWidth: number = tiles[0].length;
            var currentTile: string;
            var tileID: number = 0;

            this.clearMap();

            for (row = 0; row < total; row++) {
                for (column = 0; column < rowWidth; column++) {
                    currentTile = tiles[row][column];
                    this.renderTile(column, row, currentTile, selection.getTileID(column, row));
                }
            }

        }

        renderTile(j: number, i: number, currentTile: string, tileID: number): void {

        }

        clearMap(): void {
        }


        renderPlayer(j: number, i: number, tileType: string): void {
            this.renderTile(j, i, tileType, 0);
        }

    }

    export class CanvasMapRenderer extends BaseMapRenderer {
        canvas: HTMLCanvasElement;
        target: CanvasRenderingContext2D;
        tileRect: geom.Rectangle;

        constructor (canvas: HTMLCanvasElement, tileSize: geom.Rectangle) {
            super();
            this.canvas = canvas;
            this.target = this.canvas.getContext("2d");
            this.tileRect = tileSize;
        }

        renderTile(j: number, i: number, currentTile: string, tileID: number): void {
            super.renderTile(j, i, currentTile, tileID);

            this.tileRect.x = j * this.tileRect.width;
            this.tileRect.y = i * this.tileRect.height;

            /*
            this.target.lineStyle(1, 0x000000);
            this.target.beginFill();
            this.target.drawRect(tileRect.x, tileRect.y, tileRect.width, tileRect.height);
            this.target.endFill();
            */

            
            this.target.fillStyle = this.tileColor(currentTile);
            this.target.fillRect(this.tileRect.x, this.tileRect.y, this.tileRect.width, this.tileRect.height);

            this.target.strokeStyle = "black";
            this.target.strokeRect(this.tileRect.x, this.tileRect.y, this.tileRect.width, this.tileRect.height) 
        }

        clearMap(): void {
            this.canvas.width = this.canvas.width;
        }

        tileColor(value: string): string {
            switch (value) {
                case " ":
                    return "#ffffff";
                    break;
                case "@":
                    return "#ff0000";
                case "x":
                    return "#00ff00";
                case "?":
                    return "#666666";
                default:
                    return "#333333";
            }
        }
    }
}

module rogue.controls {
    var Directions = {
        UP: new geom.Point(0, -1),
        DOWN: new geom.Point(0, 1),
        RIGHT: new geom.Point(1, 0),
        LEFT: new geom.Point(-1, 0)
    }

    export class MovementHelper {
        playerPosition: geom.Point;
        oldTileValue: string;
        map: map.IMap;


        constructor (map: map.IMap) {
            this.map = map;
        }

        move(x: number, y: number, playerToken: string = "@"): void {
            console.log("Move", x+" ", y+" ", this.playerPosition.x+" ", this.playerPosition.y);
            this.playerPosition.x = x;
            this.playerPosition.y = y;
        }

        previewMove(state): geom.Point {
            
            var tmpPoint: geom.Point;

            switch (state)
            {
                case "up":
                    tmpPoint = Directions.UP;
                    break;
                case "right":
                    tmpPoint = Directions.RIGHT;
                    break;
                case "down":
                    tmpPoint = Directions.DOWN;
                    break;
                case "left":
                    tmpPoint = Directions.LEFT;
                    break;
                defualt:
                    return null;
            }

            var tmpPosition: geom.Point = this.playerPosition.clone();
            tmpPosition.x += tmpPoint.x;
            tmpPosition.y += tmpPoint.y;

            if (tmpPosition.x < 0 || tmpPosition.x + 1 > this.map.getWidth())
                return null;

            if (tmpPosition.y < 0 || tmpPosition.y + 1 > this.map.getHeight())
                return null;

            return tmpPosition;

        }

        getPlayerPosition(): geom.Point {
            return this.playerPosition;
        }

        startPosition(value: geom.Point): void {
            this.playerPosition = value;
            this.oldTileValue = "E";
        }
    }

    var Keyboard = {
	    'LEFT': 37,
	    'UP': 38,
	    'RIGHT': 39,
	    'DOWN': 40,
    }

    export class Input {
        state: string;

        constructor () {
            window.addEventListener("keydown", event => this.keydown(event) , false);
            window.addEventListener("keyup", event => this.keyup(event) , false); 
        }

        keydown( event: Event ) {
            this.clear();
            event.stopPropagation();
			event.preventDefault();
	    }

	    keyup( event ) {
	        var keyCode = event["keyCode"];

            switch (keyCode)
            {
                case Keyboard.UP:
                    this.state = "up";
                    break;
                case Keyboard.RIGHT:
                    this.state = "right";
                    break;
                case Keyboard.DOWN:
                    this.state = "down";
                    break;
                case Keyboard.LEFT:
                    this.state = "left";
                    break;
            }

            event.stopPropagation();
			event.preventDefault();

            
	    }
        
	    clear() {
	        this.state = null;
	    }

    }
}



window.onload = () => {
    var canvas = <HTMLCanvasElement>document.getElementById('display');
    var rogueTS = new rogue.Game(canvas);


};