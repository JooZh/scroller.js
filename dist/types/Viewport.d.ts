import TouchHandle from './TouchHandle';
import { Options } from './interface.d';
declare class Dimensions extends TouchHandle {
    protected constructor(selector: string, options: Options);
    protected initElement(selector: string): void;
    protected initEventListener(): void;
}
export default Dimensions;
