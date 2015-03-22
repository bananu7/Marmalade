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
interface Potion {
    target: Target;
    effect: Effect;
}
var PostPostWaterIngredients: {
    [name: string]: { (potion: Potion, next: { (): string }): void }
} = {
    "Beer": (potion: Potion, next: { (): string }) => {
        potion.effect = Effect.Explode;
        AloneIngredients[next()](potion, next);
    },
    "Eye of Newt": (potion: Potion, next: { (): string }) => {
        potion.effect = Effect.TurnedIntoNewt;
        AloneIngredients[next()](potion, next);
    },
    "Water": (potion: Potion, next: { (): string }) => {
        potion.effect = Effect.TeleportedToMars;
        AloneIngredients[next()](potion, next);
    },
    "Dust": (potion: Potion, next: { (): string }) => {
        potion.effect = Effect.StrangelySatisfied;
        AloneIngredients[next()](potion, next);
    },
    "Hemlock": (potion: Potion, next: { (): string }) => {
        potion.effect = Effect.TurnedInvisible;
        AloneIngredients[next()](potion, next);
    }
};
var PostWaterIngredients: {
    [name: string]: { (potion: Potion, next: { (): string }): void }
} = {
    "Beer": (potion: Potion, next: { (): string }) => {
        potion.target = Target.You;
        PostPostWaterIngredients[next()](potion, next);
    },
    "Eye of Newt": (potion: Potion, next: { (): string }) => {
        potion.target = Target.YourDog;
        PostPostWaterIngredients[next()](potion, next);
    },
    "Water": (potion: Potion, next: { (): string }) => {
        potion.target = Target.YourEnemy;
        PostPostWaterIngredients[next()](potion, next);
    },
    "Dust": (potion: Potion, next: { (): string }) => {
        potion.target = Target.YourGirlfriend;
        PostPostWaterIngredients[next()](potion, next);
    },
    "Hemlock": (potion: Potion, next: { (): string }) => {
        potion.target = Target.YourMother;
        PostPostWaterIngredients[next()](potion, next);
    }
};
var AloneIngredients: {
    [name: string]: { (potion: Potion, next: { (): string }): void }
} = {
    "Beer": (potion: Potion, next: { (): string }) => {
        potion.effect = Effect.Explode;
        AloneIngredients[next()](potion, next);
    },
    "Eye of Newt": (potion: Potion, next: { (): string }) => {
        potion.effect = Effect.TurnedIntoNewt;
        AloneIngredients[next()](potion, next);
    },
    "Water": (potion: Potion, next: { (): string }) => {
        potion.effect = Effect.TeleportedToMars;
        PostWaterIngredients[next()](potion, next);
    },
    "Dust": (potion: Potion, next: { (): string }) => {
        potion.effect = Effect.Explode;
        AloneIngredients[next()](potion, next);
    },
    "Hemlock": (potion: Potion, next: { (): string }) => {
        potion.effect = Effect.TeleportedToMars;
        AloneIngredients[next()](potion, next);
    }
    };

module Potions {
    function calculatePotion(ingredients: string[]): Potion {
        var currentPotion = { effect: Effect.Explode, target: Target.You };
        try {
            var i = 0;
            AloneIngredients[ingredients[0]](currentPotion,() => {
                ++i;
                if (i == ingredients.length)
                    return null;
                return ingredients[i];
            });
        } catch (e) {
            return { effect: Effect.Explode, target: Target.You };
        }
        return currentPotion;
    }
}