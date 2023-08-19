import { None, Option, Some } from "./option";
import { findFirstChildOfClassOption, findFirstChildOfClassWithNameOption, findFirstChildOption } from "./wrappify/wrapped";
import RIterator from './riterator';
import Path from "./path";
import { Err, Ok, Result } from "./result";
import fnutils from "./fnutils";

namespace fs {

    function matchFileExt(str: string): Result<[string, string], string> {
        let res = fnutils.wrap_call<[string, string]>(() => {
            return str.find("(.+)%.(.+)" ) as unknown as [string, string];
        })
        if (res.is_err()) return Err(`${res.unwrap_err()}`);
        return Ok(res.unwrap().map((v) => v === undefined ? "" : v) as [string, string]);
    }

    function formatInstancePath(inst: Instance): string {
        return string.gsub(inst.GetFullName(), ".", "/")[0]; //todo: replace .s with /s
    }

    function recursive_search(current: Option<Instance>, path: RIterator<string>): Result<Instance, string> {
        let next_element = path.next();
    
        if (current.is_none()) return Err(`File not found for ${path.collect_array().join('/')}`);
    
        if (next_element.is_none()) return Ok(current.unwrap());
    
        let e = next_element.unwrap();
    
        if (e === "..") {
            if (script.Parent) {
                current = Some(script.Parent);
            }
            else { current = None() };
        }
        else if (e === '.') {
            current = Some(script);
        }
        else {
            let f = matchFileExt(e);
            if (f.is_ok()) {
                let [file, ext] = [f.unwrap()[0], f.unwrap()[1]];
                if (ext === "" || ext === "*") {
                    current = findFirstChildOption(current.unwrap(), f.unwrap()[0]);
                }
                else {
                    current = findFirstChildOfClassWithNameOption(current.unwrap(), file, ext as keyof Instances);
                }
            }
            else {
                return Err(`${e} is not a valid subpath of ${formatInstancePath(current.unwrap())}`)
            }
        }
    
        return recursive_search(current, path);
    }

    export function resolve(path: Path) {
        return recursive_search(None(), path.to_iter());
    }
}

export default fs;