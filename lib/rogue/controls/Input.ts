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

module rogue.controls {
    
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