///<reference path="lib/jquery.d.ts" />
var Target;
(function (Target) {
    Target[Target["You"] = 0] = "You";
    Target[Target["YourMother"] = 1] = "YourMother";
    Target[Target["YourGirlfriend"] = 2] = "YourGirlfriend";
    Target[Target["YourDog"] = 3] = "YourDog";
    Target[Target["YourEnemy"] = 4] = "YourEnemy";
})(Target || (Target = {}));
var Effect;
(function (Effect) {
    Effect[Effect["Explode"] = 0] = "Explode";
    Effect[Effect["TurnedIntoNewt"] = 1] = "TurnedIntoNewt";
    Effect[Effect["TeleportedToMars"] = 2] = "TeleportedToMars";
    Effect[Effect["TurnedInvisible"] = 3] = "TurnedInvisible";
    Effect[Effect["StrangelySatisfied"] = 4] = "StrangelySatisfied";
})(Effect || (Effect = {}));
;
;
var SummonIngredients = {
    "Wing of Penguin": {
        summonMessage: "A wizard pops out of the nearby air.",
        name: "A wizard",
        primaryAttack: function (other) {
            return "fries the " + other.name + " with lightning.";
        },
    },
    "Tail of Puppy": {
        summonMessage: "A giant demon knight gates in from the depths of Hell.",
        name: "The demon knight",
        primaryAttack: function (other) {
            return "sends the " + other.name + " right back to Hell.";
        },
    },
    "Hair of Ape": {
        summonMessage: "An alien spaceship lands right next to you.",
        name: "The alien spaceship",
        primaryAttack: function (other) {
            return "fires phasers at the " + other.name + ".";
        },
    },
    "Eye of Newt": {
        summonMessage: "A giant robot is dropped in from a helicopter.",
        name: "The giant robot",
        primaryAttack: function (other) {
            return "stomps the " + other.name + " into the dirt.";
        },
    },
    "Piss of Cat": {
        summonMessage: "A cloud of gray goo bubbles up from the ground.",
        name: "The cloud of goo",
        primaryAttack: function (other) {
            return "digests the " + other.name + " and bubbles malevolently.";
        },
    }
};
var SingleTargetEffectIngredients = {
    "Hemlock": function (sim, target) {
        var entity = sim.entities.splice(target, 1)[0];
        return entity.name + " was teleported to Mars.";
    },
    "Nightshade": function (sim, target) {
        var entity = sim.entities[target];
        return entity.name + " feels strangely satisfied.";
    },
    "Thistle": function (sim, target) {
        var entity = sim.entities.splice(target, 1)[0];
        return entity.name + " turns invisible.";
    },
    "Japanese Knotweed": function (sim, target) {
        var entity = sim.entities.splice(target, 1)[0];
        return entity.name + " explodes.";
    },
    "Rose thorn": function (sim, target) {
        var entity = sim.entities.splice(target, 1)[0];
        return entity.name + " was turned into a newt.";
    }
};
var DoubleTargetEffectIngredients = {
    "Stinging nettle": function (sim, target1, target2) {
        var dead = sim.entities.splice(target2, 1)[0];
        return sim.entities[target1].name + " " + sim.entities[target1].primaryAttack(dead);
    },
    "Heather": function (sim, target1, target2) {
        return sim.entities[target1].name + " gazes longingly at " + sim.entities[target2].name;
    },
    "Bracken": function (sim, target1, target2) {
        return sim.entities[target1].name + " makes a rude gesture at " + sim.entities[target2].name;
    }
};
var TargetIngredients = {
    "Thorn of Rose": 0,
    "Four-leaf Clover": 1,
    "Briarthorn": 2,
    "Stranglekelp": 3,
    "Fadeleaf": 4,
    "Liferoot": 5,
    "Firebloom": 6
};
// SummonIngredient 
// SingleTargetEffectIngredient TargetIngredient
// DoubleTargetEffectIngredient TargetIngredient EffectIngredient
var Potions;
(function (Potions) {
    function calculatePotion(ingredients) {
        try {
            var output = "";
            var simulation = {
                entities: [
                    {
                        summonMessage: "",
                        primaryAttack: function (other) {
                            return "drink a potion that unsummons the " + other.name;
                        },
                        name: "You"
                    }
                ]
            };
            for (var i = 0; i < ingredients.length; ++i) {
                var summon = SummonIngredients[ingredients[i]];
                if (summon) {
                    simulation.entities.push(summon);
                    output += summon.summonMessage + "\n";
                    continue;
                }
                var single = SingleTargetEffectIngredients[ingredients[i]];
                if (single) {
                    var target = TargetIngredients[ingredients[++i]];
                    if (!target)
                        return "You exploded.";
                    if (target >= simulation.entities.length)
                        target = target % simulation.entities.length;
                    output += single(simulation, target) + "\n";
                    continue;
                }
                var double = DoubleTargetEffectIngredients[ingredients[i]];
                if (!double)
                    return "You exploded.";
                var origin = TargetIngredients[ingredients[++i]];
                var dest = TargetIngredients[ingredients[++i]];
                output += double(simulation, origin, dest) + "\n";
            }
            return output;
        }
        catch (e) {
            return "You exploded.";
        }
        return output;
    }
    var ingredients = [];
    function onStir() {
        var ingredient = jQuery("#inputInput").val();
        Potions.addIngredient(ingredient);
        jQuery("#inputInput").val("");
    }
    Potions.onStir = onStir;
    function addIngredient(val) {
        ingredients.push(val);
        $("#inBowl").append($("<li>" + val + "</li>"));
    }
    Potions.addIngredient = addIngredient;
    function onComplete() {
        var result = calculatePotion(ingredients);
        ingredients = [];
        return result;
    }
    Potions.onComplete = onComplete;
    function getIngredients() {
        var result = [];
        for (var key in DoubleTargetEffectIngredients)
            result.push(key);
        for (var key in SingleTargetEffectIngredients)
            result.push(key);
        for (var key in SummonIngredients)
            result.push(key);
        for (var key in TargetIngredients)
            result.push(key);
        return result;
    }
    Potions.getIngredients = getIngredients;
})(Potions || (Potions = {}));
jQuery(function () {
    jQuery("#stirButton").click(function () { return Potions.onStir(); });
    for (var key in Potions.getIngredients()) {
        jQuery("#availableIngredients").append(jQuery("<li>", {
            text: Potions.getIngredients()[key]
        }));
    }
    $("#inputInput").keypress(function (e) {
        //console.log(e.which);
        if (e.which == 13) {
            var ingredient = $("#inputInput").val();
            Potions.addIngredient(ingredient);
            $("#inputInput").val("");
            return false;
        }
    });
    $("#endPotionButton").click(function () {
        var result = Potions.onComplete();
        $("#popup").show().html(result);
        $("#inBowl").html("");
    });
});
//# sourceMappingURL=Potions.js.map