import Viewport from './Viewport';
import { Options } from './interface.d';
declare class Scroller extends Viewport {
    constructor(selector: string, options: Options);
}
export default Scroller;
