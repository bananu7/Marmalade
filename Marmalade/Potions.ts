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
interface SimResult {
    winner: SimEntity;
    loser: SimEntity;
    description: string;
};
interface SimEntity {
    summonMessage: string;
    name: string;
    primaryAttack(self: SimEntity, other: SimEntity): SimResult;
};
interface Simulation {
    entities: SimEntity[];
};
var SummonIngredients: {
    [name: string]: SimEntity
} = {
    "Wing of Penguin": {
        summonMessage: "You have summoned a clone of yourself!",
        name: "Your clone",
        primaryAttack: (self: SimEntity, other: SimEntity) => {
            if (other.name == "Your clone") return { winner: self, loser: other, description: "Your clone hits another clone over the head with a baseball bat." };
            if (other.name == "The alien spaceship") return { winner: self, loser: other, description: "Your clone breaks the alien's window, enters the ship, and sets their reactor to self-destruct." };
            if (other.name == "The giant robot") return { winner: other, loser: self, description: "The giant robot stomps your clone into the dirt." };
            if (other.name == "The demon knight") return { winner: other, loser: self, description: "The demon knight grabs your clone and sends him screaming down to Hell." };
            if (other.name == "The raven") return { winner: null, loser: null, description: "Your clone stares at the raven for a while." };
            if (other.name == "The news crew") return { winner: other, loser: self, description: "The news crew does a detailed documentary about your private life, causing your clone to flee." };
            return null; 
        }
    },
    "Tail of Puppy": {
        summonMessage: "A giant demon knight teleports in from the depths of Hell.",
        name: "The demon knight",
        primaryAttack: (self: SimEntity, other: SimEntity) => {
            if (other.name == "Your clone") return { winner: self, loser: other, description: "Your clone hits another clone over the head with a baseball bat." };
            if (other.name == "The alien spaceship") return { winner: self, loser: other, description: "Your clone breaks the alien's window, enters the ship, and sets their reactor to self-destruct." };
            if (other.name == "The giant robot") return { winner: other, loser: self, description: "The giant robot stomps your clone into the dirt." };
            if (other.name == "The demon knight") return { winner: other, loser: self, description: "The demon knight grabs your clone and sends him screaming down to Hell." };
            if (other.name == "The raven") return { winner: null, loser: null, description: "Your clone stares at the raven for a while." };
            if (other.name == "The news crew") return { winner: other, loser: self, description: "The news crew does a detailed documentary about your private life, causing your clone to flee." };
            return null;
        }
    },
    "Hair of Ape": {
        summonMessage: "An alien spaceship lands right next to you.",
        name: "The alien spaceship",
        primaryAttack: (self: SimEntity, other: SimEntity) => {
            if (other.name == "Your clone") return { winner: self, loser: other, description: "Your clone hits another clone over the head with a baseball bat." };
            if (other.name == "The alien spaceship") return { winner: self, loser: other, description: "Your clone breaks the alien's window, enters the ship, and sets their reactor to self-destruct." };
            if (other.name == "The giant robot") return { winner: other, loser: self, description: "The giant robot stomps your clone into the dirt." };
            if (other.name == "The demon knight") return { winner: other, loser: self, description: "The demon knight grabs your clone and sends him screaming down to Hell." };
            if (other.name == "The raven") return { winner: null, loser: null, description: "Your clone stares at the raven for a while." };
            if (other.name == "The news crew") return { winner: other, loser: self, description: "The news crew does a detailed documentary about your private life, causing your clone to flee." };
            return null;
        }
    },
    "Eye of Newt": {
        summonMessage: "A giant robot arises from a hidden bunker.",
        name: "The giant robot",
        primaryAttack: (self: SimEntity, other: SimEntity) => {
            if (other.name == "Your clone") return { winner: self, loser: other, description: "Your clone hits another clone over the head with a baseball bat." };
            if (other.name == "The alien spaceship") return { winner: self, loser: other, description: "Your clone breaks the alien's window, enters the ship, and sets their reactor to self-destruct." };
            if (other.name == "The giant robot") return { winner: other, loser: self, description: "The giant robot stomps your clone into the dirt." };
            if (other.name == "The demon knight") return { winner: other, loser: self, description: "The demon knight grabs your clone and sends him screaming down to Hell." };
            if (other.name == "The raven") return { winner: null, loser: null, description: "Your clone stares at the raven for a while." };
            if (other.name == "The news crew") return { winner: other, loser: self, description: "The news crew does a detailed documentary about your private life, causing your clone to flee." };
            return null;
        }
    },
    "Nail of Human": {
        summonMessage: "A raven lands on a nearby tree and caws.",
        name: "The raven",
        primaryAttack: (self: SimEntity, other: SimEntity) => {
            if (other.name == "Your clone") return { winner: self, loser: other, description: "Your clone hits another clone over the head with a baseball bat." };
            if (other.name == "The alien spaceship") return { winner: self, loser: other, description: "Your clone breaks the alien's window, enters the ship, and sets their reactor to self-destruct." };
            if (other.name == "The giant robot") return { winner: other, loser: self, description: "The giant robot stomps your clone into the dirt." };
            if (other.name == "The demon knight") return { winner: other, loser: self, description: "The demon knight grabs your clone and sends him screaming down to Hell." };
            if (other.name == "The raven") return { winner: null, loser: null, description: "Your clone stares at the raven for a while." };
            if (other.name == "The news crew") return { winner: other, loser: self, description: "The news crew does a detailed documentary about your private life, causing your clone to flee." };
            return null;
        }
    },
    "Piss of Cat": {
        summonMessage: "A news crew drives up to report on the goings-on.",
        name: "The news crew",
        primaryAttack: (self: SimEntity, other: SimEntity) => {
            if (other.name == "Your clone") return { winner: self, loser: other, description: "Your clone hits another clone over the head with a baseball bat." };
            if (other.name == "The alien spaceship") return { winner: self, loser: other, description: "Your clone breaks the alien's window, enters the ship, and sets their reactor to self-destruct." };
            if (other.name == "The giant robot") return { winner: other, loser: self, description: "The giant robot stomps your clone into the dirt." };
            if (other.name == "The demon knight") return { winner: other, loser: self, description: "The demon knight grabs your clone and sends him screaming down to Hell." };
            if (other.name == "The raven") return { winner: null, loser: null, description: "Your clone stares at the raven for a while." };
            if (other.name == "The news crew") return { winner: other, loser: self, description: "The news crew does a detailed documentary about your private life, causing your clone to flee." };
            return null;
        }
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
};
interface TargetIngredient {
    name: string;
    targetIndex: number;
};
interface SingleTargetEffectIngredient {
    effect: Effect;
};

interface Ingredient {
    name: string;
    targetIndex: number;
    effect: Effect;
};

var Ingredients: Ingredient[] = [
    {
        name: "Beer",
        targetIndex: 1,
        effect: Effect.Explode
    },
    {
        name: "Eye of Newt",
        targetIndex: 2,
        effect: Effect.StrangelySatisfied
    },
    {
        name: "Water",
        targetIndex: 3,
        effect: Effect.TeleportedToMars
    },
    {
        name: "Dust",
        targetIndex: 4,
        effect: Effect.TurnedIntoNewt
    },
    {
        name: "Hemlock",
        targetIndex: 5,
        effect: Effect.TurnedInvisible
    } 
];
// SummonIngredient 
// SingleTargetEffectIngredient TargetIngredient
// DoubleTargetEffectIngredient TargetIngredient EffectIngredient
var Entities: SimEntity[] = [
    { name: "you", renderEffect: (e: Effect) => { return ""; } },
    { name: "your mother", renderEffect: (e: Effect) => { return ""; } },
    { name: "your girlfriend", renderEffect: (e: Effect) => { return ""; } },
    { name: "your dog", renderEffect: (e: Effect) => { return ""; } },
    { name: "your enemy", renderEffect: (e: Effect) => { return ""; } }
];
module Potions {
    function calculatePotion(ingredients: string[]): string {
        var currentPotion = { effect: Effect.Explode, target: Target.You };
        try {
            var output = "";

        } catch (e) {
            return "You exploded.";
        }
        return output;
    }
    function printPotion(potion: Potion) {
        var output = "";
        switch (potion.target) {
            case Target.You:
                output += "You were";
                break;
            case Target.YourDog:
                output += "Your dog was";
                break;
            case Target.YourEnemy:
                output += "Your most hated enemy was";
                break;
            case Target.YourGirlfriend:
                output += "Your girlfriend was";
                break;
            case Target.YourMother:
                output += "Your mother was";
                break;
        }
        output += " ";
        switch (potion.effect) {
            case Effect.Explode:
                output += "exploded.";
                break;
            case Effect.TurnedIntoNewt:
                output += "turned into a newt.";
                break;
            case Effect.TeleportedToMars:
                output += "teleported to Mars.";
                break;
            case Effect.TurnedInvisible:
                output += "turned invisible.";
                break;
            case Effect.StrangelySatisfied:
                output += "strangely satisfied.";
                break;
        }
        return output;
    }
    function printPotionToLog(potion: Potion) {
        console.log(printPotion(potion));
    }
    var ingredients: string[] = [];
    export function onStir() {
        jQuery("#inputInput").val("");
    }
    export function addIngredient(val: string) {
        ingredients.push(val);
    }
    export function onComplete() {
        var result = printPotion(calculatePotion(ingredients));
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