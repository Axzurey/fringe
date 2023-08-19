import { None, Option, Some } from "../option";

export function findFirstChildOption(inst: Instance, child: string): Option<Instance> {
    let result = inst.FindFirstChild(child);

    if (result) return Some(result);
    return None();
}

export function findFirstChildOfClassOption(inst: Instance, child: keyof Instances): Option<Instance> {
    let result = inst.FindFirstChildOfClass(child);

    if (result) return Some(result);
    return None();
}

export function findFirstChildOfClassWithNameOption(inst: Instance, name: string, cls: keyof Instances): Option<Instance> {
    for (let child of inst.GetChildren()) {
        if (child.IsA(cls) && child.Name === name) return Some(child);
    }
    return None();
}

export default abstract class Wrapped {
    
    constructor(private object: Instance) {
        return setmetatable(this, {

        });
    }
    findFirstChildOfClassOption(child: keyof Instances): Option<Instance> {
        return findFirstChildOfClassOption(this.object, child);
    }
    findFirstChildOption(child: string): Option<Instance> {
        return findFirstChildOption(this.object, child);
    }
}