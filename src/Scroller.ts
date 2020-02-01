import Viewport from './Viewport';
import {Options} from './interface.d'

class Scroller extends Viewport{
    constructor(selector:string ,options:Options){
        super(selector,options)
    }
}

export default Scroller
