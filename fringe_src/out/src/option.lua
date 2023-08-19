-- Compiled with roblox-ts v2.1.0
--[[
	*
	* cmon, this seemed like it would be fun c:
	* Though we don't have the "?" syntax or the same pattern matching we can still have fun with unwrapping
]]
local Option
do
	Option = setmetatable({}, {
		__tostring = function()
			return "Option"
		end,
	})
	Option.__index = Option
	function Option.new(...)
		local self = setmetatable({}, Option)
		return self:constructor(...) or self
	end
	function Option:constructor(value)
		self.value = value
		self.__eq = function(a, b)
			if a.value ~= nil and b.value ~= nil then
				if a.value == b.value then
					return true
				end
			elseif a.value == nil and b.value == nil then
				return true
			end
			return false
		end
		return self
	end
	function Option:is_some()
		return self.value ~= nil
	end
	function Option:is_none()
		return self.value == nil
	end
	function Option:unwrap()
		local _arg0 = self.value ~= nil
		assert(_arg0, "Attempt to unwrap an Option with a null value.")
		return self.value
	end
	function Option:expect(message)
		local _arg0 = self.value ~= nil
		local _message = message
		assert(_arg0, _message)
		return self.value
	end
	function Option:unwrap_or(default_value)
		if self.value == nil then
			return default_value
		end
		return self.value
	end
	function Option:unwrap_or_else(default_function)
		if self.value == nil then
			return default_function()
		end
		return self.value
	end
end
local function Some(value)
	return Option.new(value)
end
local function None()
	return Option.new()
end
return {
	Some = Some,
	None = None,
	Option = Option,
}
