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

/// <reference path="../geom/Rectangle.ts" />
/// <reference path="./BaseMapRenderer.ts" />

module rogue.renderer {

    export class CanvasMapRenderer extends BaseMapRenderer
    {
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