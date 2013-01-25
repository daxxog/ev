/* ev / ev.js
 * JavaScript events done the daXXog way.
 * (c) 2013 David (daXXog) Volm ><> + + + <><
 * Released under Apache License, Version 2.0:
 * http://www.apache.org/licenses/LICENSE-2.0.html  
 */
 
    var ev = {};
    ev = function(e, cb) { //run / on event
        if(typeof ev._ == 'undefined') {
            ev._ = {};
        }
        
        if(typeof e == 'string') {
            if(!$.isArray(ev._[e])) {
                ev._[e] = [];
            }
            
            if(typeof cb == 'function') { //if we have a function
                return ev._[e].push(cb); //push it on the stack
            } else if(cb === 'k') { //if we want to kill an event now
                ev._[e].forEach(function(v, i, a) { // loop and
                    delete ev._[e][i];              // kill all events
                });
            } else { //execute event
                ev._[e].forEach(function(v, i, a) { // loop and
                    if(typeof v == 'function') { //find functions
                        if(v() === 'k') { //if we should kill this function after running
                            delete ev._[e][i]; //delete the function
                        }
                    }
                });
            }
        }
    };