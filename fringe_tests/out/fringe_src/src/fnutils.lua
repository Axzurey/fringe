-- Compiled with roblox-ts v2.1.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _result = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "result")
local Err = _result.Err
local Ok = _result.Ok
local fnutils = {}
do
	local _container = fnutils
	local function wrap_call(fn)
		local out = { pcall(fn) }
		if out[1] == true then
			return Ok(out[2])
		else
			return Err(out[2])
		end
	end
	_container.wrap_call = wrap_call
	local function slice_array(array, slice)
		local x = {}
		if slice >= #array then
			return Err("Slice of " .. (tostring(slice) .. (" is greater index than the array with a length of " .. tostring(#array))))
		end
		if slice >= 0 then
			do
				local i = slice
				local _shouldIncrement = false
				while true do
					if _shouldIncrement then
						i += 1
					else
						_shouldIncrement = true
					end
					if not (i < #array) then
						break
					end
					local _x = x
					local _arg0 = array[i + 1]
					table.insert(_x, _arg0)
				end
			end
		else
			do
				local i = #array + slice
				local _shouldIncrement = false
				while true do
					if _shouldIncrement then
						i += 1
					else
						_shouldIncrement = true
					end
					if not (i < #array) then
						break
					end
					local _x = x
					local _arg0 = array[i + 1]
					table.insert(_x, _arg0)
				end
			end
		end
		return Ok(x)
	end
	_container.slice_array = slice_array
end
local default = fnutils
return {
	default = default,
}
