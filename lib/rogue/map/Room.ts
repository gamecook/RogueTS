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

module rogue.map {
 

    export class Room {
        x1 = 0;
        y1 = 0;
        x2 = 0;
        y2 = 0;
        connectedRooms;
        constructor (x1, y1, x2, y2)
        {


            if (x1 > x2)
            {
                var x = x1;
                x1 = x2;
                x2 = x;
            }
            if (y1 > y2)
            {
                var y = y1;
                y1 = y2;
                y2 = y;
            }
            this.x1 = x1;
            this.y1 = y1;
            this.x2 = x2;
            this.y2 = y2;


            /*this.__defineGetter__('width',
                function ()
                {
                    return this.x2 - this.x1;
                });
            this.__defineGetter__('height',
                function ()
                {
                    return this.y2 - this.y1;
                });
            this.__defineGetter__('top', function ()
            {
                return this.y1;
            });
            this.__defineGetter__('left', function ()
            {
                return this.x1;
            });*/


            this.connectedRooms = new Object();


            return this;
        }

        toString ()
        {
            return '[room ' + this.x1 + ', ' + this.y1 + ', '
                + this.x2 + ', ' + this.y2 + ']';
        }
        intersects (room)
        {
            return this.x1 <= room.x2 && this.x2 >= room.x1
                && this.y1 <= room.y2 && this.y2 >= room.y1;
        }
        contains (x, y)
        {
            return x >= this.x1 && x <= this.x2 && y >= this.y1 && y <= this.y2;
        }
        connected (otherroom, seenlist)
        {
            if (this.connectedRooms[otherroom]) return true;
            var that = this;
            if (!seenlist) seenlist = {that:true};
            if (seenlist[otherroom]) return false;
            seenlist[otherroom] = true;
            for (var i in otherroom.connectedRooms)
            {
                if (this.connected(otherroom.connectedRooms[i], seenlist)) return true;
            }
            return false;
        }

    }
}