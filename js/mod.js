let modInfo = {
	name: "The Roblox Tree",
	id: "robloxtree",
	author: "Robloxian",
	pointsName: "robux",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.1-3/1/1",
	name: "Layers of Players",
}

let changelog = `<h1>
		Changelog:</h1><br>
		<h5>v0.1 beta release candidate 3 prerelease 1 patch 1</h5><br>
		- Patch to players layer where it did not give more Robux. <br>
		<h4>v0.1 beta release candidate 3 prerelease 1</h4><br>
		- Players layer!!! <br>
		- Multiplies robux gain. <br>
		<h3>v0.1 beta release candidate 2</h3><br>
		- 3 new upgrades. <br>
		- Softcaps for 2 upgrades <br>
	<h3>v0.1 beta release candidate 1</h3><br>
		- Added first upgrade.<br>
		- Robux gain system overhauled.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)
	let gain = new Decimal(0.5)
	if(player.g.points.gte(1)) {
		gain = player.g.points
	}
	if (hasUpgrade('g', 11)){gain = gain.times(2)}
	if (hasUpgrade('g', 12)){gain = gain.times(upgradeEffect('g', 12))}
	gain = gain.times(layers.p.effect())
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}