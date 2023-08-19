-- Compiled with roblox-ts v2.1.0
local TS = _G[script]
local _option = TS.import(script, script.Parent, "option")
local None = _option.None
local Some = _option.Some
local _wrapped = TS.import(script, script.Parent, "wrappify", "wrapped")
local findFirstChildOfClassWithNameOption = _wrapped.findFirstChildOfClassWithNameOption
local findFirstChildOption = _wrapped.findFirstChildOption
local _result = TS.import(script, script.Parent, "result")
local Err = _result.Err
local Ok = _result.Ok
local fnutils = TS.import(script, script.Parent, "fnutils").default
local fs = {}
do
	local _container = fs
	local function matchFileExt(str)
		local res = fnutils.wrap_call(function()
			return string.find(str, "(.+)%.(.+)")
		end)
		if res:is_err() then
			return Err(res:unwrap_err())
		end
		local _exp = res:unwrap()
		local _arg0 = function(v)
			return if v == nil then "" else v
		end
		-- ▼ ReadonlyArray.map ▼
		local _newValue = table.create(#_exp)
		for _k, _v in _exp do
			_newValue[_k] = _arg0(_v, _k - 1, _exp)
		end
		-- ▲ ReadonlyArray.map ▲
		return Ok(_newValue)
	end
	local function formatInstancePath(inst)
		return (string.gsub(inst:GetFullName(), ".", "/"))
	end
	local function recursive_search(current, path)
		local next_element = path:next()
		if current:is_none() then
			return Err("File not found for " .. table.concat(path:collect_array(), "/"))
		end
		if next_element:is_none() then
			return Ok(current:unwrap())
		end
		local e = next_element:unwrap()
		if e == ".." then
			if script.Parent then
				current = Some(script.Parent)
			else
				current = None()
			end
		elseif e == "." then
			current = Some(script)
		else
			local f = matchFileExt(e)
			if f:is_ok() then
				local file, ext = f:unwrap()[1], f:unwrap()[2]
				if ext == "" or ext == "*" then
					current = findFirstChildOption(current:unwrap(), f:unwrap()[1])
				else
					current = findFirstChildOfClassWithNameOption(current:unwrap(), file, ext)
				end
			else
				return Err(e .. (" is not a valid subpath of " .. formatInstancePath(current:unwrap())))
			end
		end
		return recursive_search(current, path)
	end
	local function resolve(path)
		return recursive_search(None(), path:to_iter())
	end
	_container.resolve = resolve
end
local default = fs
return {
	default = default,
}
