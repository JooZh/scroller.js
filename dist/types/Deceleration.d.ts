import { Options } from './interface.d';
import Attributes from './Attributes';
declare class Deceleration extends Attributes {
    constructor(options: Options);
    protected hasDeceleration(): boolean;
    protected startDeceleration(): void;
    protected stepThroughDeceleration(render: boolean): void;
    scrollTo(x: number, y: number, snap: boolean): void;
}
export default Deceleration;
