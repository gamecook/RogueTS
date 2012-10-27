/**
* The MIT License
*
* Copyright (c) 2009-2012 @author jessefreeman GameCook, Inc.
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
* THE SOFTWARE.
*
*/

/// <reference path="./geom/Point.ts" />
/// <reference path="./renderer/IMapRenderer.ts" />
/// <reference path="./renderer/CanvasMapRenderer.ts" />
/// <reference path="./controls/Input.ts" />
/// <reference path="./controls/MovementHelper.ts" />
/// <reference path="./map/MapPopulator.ts" />
/// <reference path="./map/FogOfWarMapSelection.ts" />
/// <reference path="./map/RandomMap.ts" />

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

            this.map = new map.RandomMap(21);
            
            this.populateMapHelper = new map.MapPopulater(this.map);
            this.populateMapHelper.populateMap(["x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"]);

            this.movementHelper = new controls.MovementHelper(this.map);
            this.movementHelper.startPosition(this.populateMapHelper.getRandomEmptyPoint());

            this.selection = new map.FogOfWarMapSelection(this.map, 40, 24, 5);
            this.selection.setCenter(this.movementHelper.playerPosition);

            this.renderer = new renderer.CanvasMapRenderer(this.display, new geom.Rectangle(0, 0, 20, 20));
            
            console.log(this.map.toString());
            // Start game loop
            this.onEnterFrame();
        }

        onEnterFrame() {

            // Invalidate the display
            this.invalidate();

            // Begin rendering the display
            var that = this;
            var _cb = function () { that.render(); requestAnimationFrame(_cb); }
            _cb(that);
        }

        render() {

            //TODO need to pool for controls
            if (this.input.state) {
                this.move(this.input.state);
            }

            if (this.invalid) {
                
                this.renderer.renderMap(this.selection); //fogOfWarSelection);

                var pos: geom.Point = this.movementHelper.playerPosition;

                var x: number = pos.x - this.selection.getOffsetX();
                var y: number = pos.y - this.selection.getOffsetY();

                this.renderer.renderPlayer(x, y, "@");


                this.invalid = false;
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