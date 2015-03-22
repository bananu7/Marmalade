 ///<reference path="lib/jquery.d.ts" />
enum Target {
    You,
    YourMother,
    YourGirlfriend,
    YourDog,
    YourEnemy
}
enum Effect {
    Explode,
    TurnedIntoNewt,
    TeleportedToMars,
    TurnedInvisible,
    StrangelySatisfied
}
interface SimEntity {
    summonMessage: string;
    name: string;
    primaryAttack(other: SimEntity): string;
};
interface Simulation {
    entities: SimEntity[];
};
var SummonIngredients: {
    [name: string]: SimEntity
} = {
     "Wing of Penguin": {
         summonMessage: "A wizard pops out of the nearby air.",
         name: "A wizard",
         primaryAttack: (other: SimEntity) => {
             return "fries the " + other.name + " with lightning.";
         },
    },
    "Tail of Puppy": {
        summonMessage: "A giant demon knight gates in from the depths of Hell.",
        name: "The demon knight",
        primaryAttack: (other: SimEntity) => {
            return "sends the " + other.name + " right back to Hell.";
        },
    },
    "Hair of Ape": {
        summonMessage: "An alien spaceship lands right next to you.",
        name: "The alien spaceship",
        primaryAttack: (other: SimEntity) => {
            return "fires phasers at the " + other.name + ".";
        },
    },
    "Eye of Newt": {
        summonMessage: "A giant robot is dropped in from a helicopter.",
        name: "The giant robot",
        primaryAttack: (other: SimEntity) => {
            return "stomps the " + other.name + " into the dirt.";
        },
    },
    "Piss of Cat": {
        summonMessage: "A cloud of gray goo bubbles up from the ground.",
        name: "The cloud of goo",
        primaryAttack: (other: SimEntity) => {
            return "digests the " + other.name + " and bubbles malevolently.";
        },
    }
};
var SingleTargetEffectIngredients: {
    [name: string]: { (sim: Simulation, target: number): string }
} = {
    "Hemlock": (sim: Simulation, target: number): string => {
        var entity = sim.entities.splice(target, 1)[0];
        return entity.name + " was teleported to Mars.";
    },
    "Nightshade": (sim: Simulation, target: number): string => {
        var entity = sim.entities[target];
        return entity.name + " feels strangely satisfied.";
    },
    "Thistle": (sim: Simulation, target: number): string => {
        var entity = sim.entities.splice(target, 1)[0];
        return entity.name + " turns invisible.";
    },
    "Japanese Knotweed": (sim: Simulation, target: number): string => {
        var entity = sim.entities.splice(target, 1)[0];
        return entity.name + " explodes.";
    },
    "Rose thorn": (sim: Simulation, target: number): string => {
        var entity = sim.entities.splice(target, 1)[0];
        return entity.name + " was turned into a newt.";
    }
};
var DoubleTargetEffectIngredients: {
    [name: string]: { (sim: Simulation, target1: number, target2: number): string }
} = {
    "Stinging nettle": (sim: Simulation, target1: number, target2: number) => {
        var dead = sim.entities.splice(target2, 1)[0];
        return sim.entities[target1].name + " " + sim.entities[target1].primaryAttack(dead);
    },
    "Heather": (sim: Simulation, target1: number, target2: number) => {
        return sim.entities[target1].name + " gazes longingly at " + sim.entities[target2].name;
    },
    "Bracken": (sim: Simulation, target1: number, target2: number) => {
        return sim.entities[target1].name + " makes a rude gesture at " + sim.entities[target2].name;
    }
};
var TargetIngredients: {
    [name: string]: number
} = {
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
module Potions {
    function calculatePotion(ingredients: string[]): string {
        try {
            var output = "";
            var simulation = {
                entities: [
                    {
                        summonMessage: "",
                        primaryAttack: (other: SimEntity) => {
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
                    if (!target) return "You exploded.";
                    if (target >= simulation.entities.length)
                        target = target % simulation.entities.length;
                    output += single(simulation, target) + "\n";
                    continue;
                }
                var double = DoubleTargetEffectIngredients[ingredients[i]];
                if (!double) return "You exploded.";
                var origin = TargetIngredients[ingredients[++i]];
                var dest = TargetIngredients[ingredients[++i]];
                output += double(simulation, origin, dest) + "\n";
            }
            return output;
        } catch (e) {
            return "You exploded.";
        }
        return output;
    }
    var ingredients: string[] = [];
    export function onStir() {
        jQuery("#inputInput").val("");
    }
    export function addIngredient(val: string) {
        ingredients.push(val);
    }
    export function onComplete() {
        var result = calculatePotion(ingredients);
        ingredients = [];
        return result;
    }
}

jQuery(() => {
    jQuery("#stirButton").click(() => Potions.onStir());    

    $("#inputInput").keypress(e => {
        //console.log(e.which);
        if (e.which == 13) {
            Potions.addIngredient($("#inputInput").val());
            console.log($("#inputInput").val());
            $("#inputInput").val("");
            return false;
        }
    });

    $("#endPotionButton").click(() => {
        var result = Potions.onComplete();
        $("#popup")
            .show()
            .html(result);
    });
});