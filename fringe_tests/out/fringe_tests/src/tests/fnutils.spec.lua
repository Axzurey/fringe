-- Compiled with roblox-ts v2.1.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
-- / <reference types="@rbxts/testez/globals" />
local fnutils = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "fnutils").default
return function()
	describe("fnutils", function()
		it("should have positive slices working C:", function()
			local array = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 }
			expect(fnutils.slice_array(array, 5):is_ok()).to.equal(true)
			expect(#fnutils.slice_array(array, 0):unwrap()).to.equal(10)
			expect(#fnutils.slice_array(array, 9):unwrap()).to.equal(1)
		end)
		it("should have negative slices working C:", function()
			local array = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 }
			expect(fnutils.slice_array(array, -5):is_ok()).to.equal(true)
			expect(#fnutils.slice_array(array, -1):unwrap()).to.equal(1)
			expect(#fnutils.slice_array(array, -2):unwrap()).to.equal(2)
		end)
	end)
end
