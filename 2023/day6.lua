local _, timesInput = io.read(string.len("Time:"), "l")
local _, distanceInput = io.read(string.len("Distance:"), "l")

-- https://stackoverflow.com/questions/1426954/split-string-in-lua
local function mySplit(input, sep)
	if sep == nil then
		sep = "%s"
	end
	local t = {}
	for str in string.gmatch(input, "([^" .. sep .. "]+)") do
		table.insert(t, str)
	end
	return t
end

local function solveEq(a, b, c)
	local sqrtDet = math.sqrt(b * b - 4 * a * c)
	return (-b - sqrtDet) / 2, (-b + sqrtDet) / 2
end

local times = mySplit(timesInput)
local distances = mySplit(distanceInput)

local function getPossibleRange(time, dist)
	-- (T - t) * t > d
	-- t^2 -T t + d < 0
	local x1, x2 = solveEq(1, -time, dist)
	local min = x1 % 1 == 0 and x1 + 1 or math.ceil(x1)
	local max = x2 % 1 == 0 and x2 - 1 or math.floor(x2)
	return max - min + 1
end

local function part1()
	local prod = 1

	for i = 1, #times do
		prod = prod * getPossibleRange(times[i], distances[i])
	end

	print(prod)
end

local function part2()
	local concatTimes = table.concat(times)
	local concatDistances = table.concat(distances)

	print(getPossibleRange(concatTimes, concatDistances))
end

part1()
part2()
