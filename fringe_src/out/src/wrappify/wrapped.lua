-- Compiled with roblox-ts v2.1.0
local TS = _G[script]
local _option = TS.import(script, script.Parent.Parent, "option")
local None = _option.None
local Some = _option.Some
local function findFirstChildOption(inst, child)
	local result = inst:FindFirstChild(child)
	if result then
		return Some(result)
	end
	return None()
end
local function findFirstChildOfClassOption(inst, child)
	local result = inst:FindFirstChildOfClass(child)
	if result then
		return Some(result)
	end
	return None()
end
local function findFirstChildOfClassWithNameOption(inst, name, cls)
	for _, child in inst:GetChildren() do
		if child:IsA(cls) and child.Name == name then
			return Some(child)
		end
	end
	return None()
end
local Wrapped
do
	Wrapped = {}
	function Wrapped:constructor(object)
		self.object = object
		return setmetatable(self, {})
	end
	function Wrapped:findFirstChildOfClassOption(child)
		return findFirstChildOfClassOption(self.object, child)
	end
	function Wrapped:findFirstChildOption(child)
		return findFirstChildOption(self.object, child)
	end
end
return {
	findFirstChildOption = findFirstChildOption,
	findFirstChildOfClassOption = findFirstChildOfClassOption,
	findFirstChildOfClassWithNameOption = findFirstChildOfClassWithNameOption,
	default = Wrapped,
}
