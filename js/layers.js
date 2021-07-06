addLayer("g", {
    name: "games", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "G", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "games", // Name of prestige currency
    baseResource: "robux", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    softcap: new Decimal(1e6),
    exponent: 0.5, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('g', 13)){mult = mult.times(upgradeEffect('g', 13))}
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "G", description: "G: Reset to create games.", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11: {
            title: "Add gamepasses",
            description: "Double your robux gain.",
            cost: new Decimal(1),
        },
        12: {
            title: "Mastery",
            description: "Increases gamepass price by how many games you have.",
            cost: new Decimal(12),
            effect() {
                return softcap(player[this.layer].points.add(1).pow(0.4),new Decimal(100),0.2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x." },
        },
        13: {
            title: "Use free models",
            description: "Lowers robux requirement to make a game.",
            cost: new Decimal(125),
            effect() {
                return softcap(player[this.layer].points.add(1).pow(0.08),new Decimal(2),0.02)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x." },
        },
    },
    layerShown(){return true}
})
