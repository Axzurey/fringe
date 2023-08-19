/// <reference types="@rbxts/types" />
/// <reference types="@rbxts/types" />
import { Option } from "../option";
export declare function findFirstChildOption(inst: Instance, child: string): Option<Instance>;
export declare function findFirstChildOfClassOption(inst: Instance, child: keyof Instances): Option<Instance>;
export declare function findFirstChildOfClassWithNameOption(inst: Instance, name: string, cls: keyof Instances): Option<Instance>;
export default abstract class Wrapped {
    private object;
    constructor(object: Instance);
    findFirstChildOfClassOption(child: keyof Instances): Option<Instance>;
    findFirstChildOption(child: string): Option<Instance>;
}
