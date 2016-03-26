(function() {
    'use strict';

    angular.module('theDivisionAgent')
        .controller('TalentsController', TalentsController);

    TalentsController.$inject = ['$state', '$stateParams'];
    function TalentsController($state, $stateParams){
        var vm = this;

        vm.filter = { slot: $stateParams.slot };
        vm.talents = [
            { slot: "Backpack",  name: "Technical",      description: "While your signature skill is active, your skill power is increased by 13%" },
            { slot: "Backpack",  name: "Inventive",      description: "Your skill power is increased by 13% while at full health" },
            { slot: "Backpack",  name: "Relentless",     description: "3% of the damage dealt by your skills is returned to you as healing" },
            { slot: "Backpack",  name: "Resourceful",    description: "All healing applied to you is also applied to your skill objects" },
            { slot: "Backpack",  name: "Specialized",    description: "(12.5% - 13%) of your firearms and stamina is added to your skill power" },
            { slot: "Chest",     name: "Reckless",       description: "You deal 12.5% more damage and receive 10% more damage" },
            { slot: "Chest",     name: "Robust",         description: "You have 45% more armor while in cover" },
            { slot: "Chest",     name: "Rapid",          description: "The cool down of your healing skills is decreased by x%" },
            { slot: "Chest",     name: "Vigorous",       description: "All of your healing skills have Over Heal enabled" },
            { slot: "Chest",     name: "Forceful",       description: "Your armor is increased by x% while your Signature Skill is enabled" },
            { slot: "Mask",      name: "Enduring",       description: "While in your last segment, your health continuously regenerates to fill up the segment" },
            { slot: "Mask",      name: "Refreshed",      description: "When your health is in the last segment, all healing is improved by 30%" },
            { slot: "Mask",      name: "Rejuvenated",    description: "Consuming a medkit also removes all negative status effects from you" },
            { slot: "Mask",      name: "Tenacious",      description: "Using a medkit increases your damage by 9.5% for 10 seconds" },
            { slot: "Mask",      name: "Rehabilitated",  description: "When you are affected by a status effect you are healed for 2% every second" },
            { slot: "Gloves",    name: "Savage",         description: "Your critical hit chance is increased by 13% against targets out of cover" },
            { slot: "Gloves",    name: "Reckless",       description: "You deal 12.5% more damage and receive 10% more damage" },
            { slot: "Gloves",    name: "Cunning",        description: "After reloading, your next shot with this weapon has a 9.5% higher critical hit chance" },
            { slot: "Gloves",    name: "Decisive",       description: "Headshots with your sidearm deal 25% more damage" },
            { slot: "Gloves",    name: "Astute",         description: "The first three bullets of your magazine have a 9.5% higher chance to do a critical hit" },
            { slot: "Kneepads",  name: "Accomplished",   description: "Rewards from accolades are tripled" },
            { slot: "Kneepads",  name: "Prosperous",     description: "Critical headshots grant you credits" },
            { slot: "Kneepads",  name: "Perceptive",     description: "Your Item find and Credit find bonuses are increased by 25%" },
            { slot: "Holster",   name: "Recovered",      description: "Damage taken while doing a cover to cover maneuver is regenerated over 5 seconds upon reaching your destination" },
            { slot: "Holster",   name: "Nimble",         description: "While doing a cover to cover move in combat, you heal 2% of your max health for every y meter run" },
            { slot: "Holster",   name: "Steadfast",      description: "While in cover, health regeneration kicks in twice as fast" },
            { slot: "Holster",   name: "Sturdy",         description: "Your armor is increased by 12.5% when you stay more than y seconds in the same cover" },
            { slot: "Weapon",    name: "Accurate",       description: "Accuracy is increased by x%" },
            { slot: "Weapon",    name: "Adept",          description: "Skill increases your critical hit chance by 3% for y seconds" },
            { slot: "Weapon",    name: "Balanced",       description: "Weapon acquires maximum accuracy faster when shouldered" },
            { slot: "Weapon",    name: "Brutal",         description: "Headshot damage is increased by x% when using this weapon" },
            { slot: "Weapon",    name: "Capable",        description: "Using a skill improves the handling of your weapon for x seconds" },
            { slot: "Weapon",    name: "Commanding",     description: "Every kill performed while the signature skill is active extends its duration by x%" },
            { slot: "Weapon",    name: "Coolheaded",     description: "Performing a headshot reduces all skill cooldowns by x%" },
            { slot: "Weapon",    name: "Deadly",         description: "Critical hit damage is increased by x%" },
            { slot: "Weapon",    name: "Destructive",    description: "Armor destruction value is increased by x% when using this weapon" },
            { slot: "Weapon",    name: "Determined",     description: "Killing a target reduces skill cooldowns by x%" },
            { slot: "Weapon",    name: "Dominant",       description: "Every kill while your signature skill is active reduces the cooldown of your other skills by x%" },
            { slot: "Weapon",    name: "Expert",         description: "This weapon deals x% more damage when the target is below y% health" },
            { slot: "Weapon",    name: "Ferocious",      description: "Damage against elite and named enemies is increased by x%" },
            { slot: "Weapon",    name: "Fierce",         description: "Critical hit chance is increased by x% when using this weapon" },
            { slot: "Weapon",    name: "Fordern",        description: "Kills by active skills prolong their duration by x%" },
            { slot: "Weapon",    name: "Harmful",        description: "Each hit has a x% chance to apply the 'bleed' status effect" },
            { slot: "Weapon",    name: "Intense",        description: "The first bullet of a magazine has a x% chance to apply the 'on fire' status effect" },
            { slot: "Weapon",    name: "Meticulous",     description: "Killing a target has a x% chance to instantly refill the magazine" },
            { slot: "Weapon",    name: "Predatory",      description: "Killing a target regenerates x% health over y seconds" },
            { slot: "Weapon",    name: "Prepared",       description: "Damage is increased by x% when more than 40 meters from the target" },
            { slot: "Weapon",    name: "Proficient",     description: "The first bullet shot when out of combat has a x% chance to result in a critical hit" },
            { slot: "Weapon",    name: "Provident",      description: "The last bullet in your magazine deal x% bonus damage" },
            { slot: "Weapon",    name: "Responsive",     description: "Damage is increased by 5% when closer than 10 meters to the target" },
            { slot: "Weapon",    name: "Restored",       description: "Killing a target with this weapon removes all negative status effects" },
            { slot: "Weapon",    name: "Stable",         description: "Stability is improved by x%" },
            { slot: "Weapon",    name: "Sustained",      description: "Killing a target increases your health by x%" },
            { slot: "Weapon",    name: "Skilled",        description: "Headshot kills with this weapon increase signature skill resources by x%" },
            { slot: "Weapon",    name: "Swift",          description: "Reloading is x% faster" },
            { slot: "Weapon",    name: "Self-preserved", description: "Critical hits with this weapon heal the user for x% of damage dealt" },
            { slot: "Weapon",    name: "Talented",       description: "Killing a target with this weapon increases skill power by x% for y seconds" },
            { slot: "Weapon",    name: "Toxic",          description: "Headshots with this weapon have a x% chance to apply the 'blind' status effect" },
            { slot: "Weapon",    name: "Trained",        description: "Critical hits increase signature skill resources by 0.10% (only applies to shotguns, pistols and marksman rifles)" },
            { slot: "Weapon",    name: "Unforgiving",    description: "Missing health segments increases your damage by x%" },
            { slot: "Weapon",    name: "Vicious",        description: "Critical hit chance is increased by x% while at full health" }
        ];

        vm.slotDetails = {
            "Chest" : {
                "Armor" : { low: "706", high: "864" },
                "Major" : [
                    { name: "Firearms",                        low: "470",   high: "575"   },
                    { name: "Stamina",                         low: "470",   high: "575"   },
                    { name: "Electronics",                     low: "470",   high: "575"   },
                    { name: "Armor",                           low: "470",   high: "575"   },
                    { name: "Health",                          low: "2,353", high: "2,878" },
                    { name: "Damage to Elites",                low: "7%",    high: "8%"    },
                    { name: "Protection from Elites",          low: "9%",    high: "11%"   },
                    { name: "Exotic Damage Resilence",         low: "11%",   high: "14%"   },
                    { name: "Health on Kill",                  low: "9%",    high: "11%"   },
                    { name: "+1 Gear Mod Slot"                                             },
                ],
                "Minor" : [
                    { name: "Ammo Capacity",                   low: "38%",   high: "47%"   },
                    { name: "Increase Kill experience",        low: "19%",   high: "23%"   },
                ],
                "Skill" : [
                    { name: "Ballistic Shield Health",         low: "7.5%",  high: "9%"    },
                    { name: "First Aid Self Heal",             low: "7.5%",  high: "9%"    },
                    { name: "Mobile Cover Dmg Resilence",      low: "2.5%",  high: "3%"    },
                    { name: "Pulse Duration",                  low: "7.5%",  high: "9%"    },
                    { name: "Seeker Mine Explosion Radius",    low: "7.5%",  high: "9%"    },
                    { name: "Smart Cover Dmg Resilience",      low: "2.5%",  high: "3%"    },
                    { name: "Sticky Bomb Dmg",                 low: "7.5%",  high: "9%"    },
                    { name: "Support Station Health",          low: "7.5%",  high: "9%"    },
                    { name: "Turrent Health",                  low: "7.5%",  high: "9%"    },
                ]
            },
            "Mask" : {
                "Armor" : { low: "353", high: "431" },
                "Major" : [
                    { name: "Firearms",                        low: "470",   high: "575"   },
                    { name: "Stamina",                         low: "470",   high: "575"   },
                    { name: "Electronics",                     low: "470",   high: "575"   },
                    { name: "Health",                          low: "1,769", high: "2,168" },
                    { name: "Skill Power",                     low: "3,539", high: "4,328" },
                    { name: "Critical Hit Chance",             low: "4%",    high: "5%"    },
                    { name: "Damage to Elites",                low: "9%",    high: "11%"   },
                    { name: "Exotic Damage Resilience",        low: "11%",   high: "14%"   },
                    { name: "Health on Kill",                  low: "9%",    high: "11%"   },
                    { name: "+1 Gear Mod Slot"                                             },
                ],
                "Minor" : [
                    { name: "Scavenging",                      low: "19%",   high: "23%"   },
                    { name: "Enemy Armor Damage",              low: "6%",    high: "7%"    },
                    { name: "Increase Kill XP",                low: "9%",    high: "11%"   },
                    { name: "Burn Resistance",                 low: "11%",   high: "13%"   },
                    { name: "Blind/Deaf Resistance",           low: "11%",   high: "13%"   },
                    { name: "Disorient Resistance",            low: "11%",   high: "13%"   },
                ],
                "Skill" : [
                    { name: "Ballistic Shield health",         low: "7.5%",  high: "9%"    },
                    { name: "First Aid ally heal",             low: "7.5%",  high: "9%"    },
                    { name: "Mobile Cover damage resilience",  low: "2.5%",  high: "3%"    },
                    { name: "Pulse Critical Hit Damage Bonus", low: "2.5%",  high: "3%"    },
                    { name: "Seeker Mine explosion radius",    low: "7.5%",  high: "9%"    },
                    { name: "Smart Cover duration",            low: "7.5%",  high: "9%"    },
                    { name: "Support Station healing speed",   low: "7.5%",  high: "9%"    },
                    { name: "Turret duration",                 low: "7.5%",  high: "9%"    },
                ]
            },
            "Backpack" : {
                "Armor" : { low: "470", high: "575" },
                "Major" : [
                    { name: "Firearms",                        low: "470",   high: "575"   },
                    { name: "Stamina",                         low: "470",   high: "575"   },
                    { name: "Electronics",                     low: "470",   high: "575"   },
                    { name: "Armor",                           low: "353",   high: "431"   },
                    { name: "Critical Hit Damage",             low: "15%",   high: "18%"   },
                    { name: "Signature Ability Resource Gain", low: "10%",   high: "12%"   },
                    { name: "Skill Haste",                     low: "10%",   high: "12%"   },
                    { name: "Skill Power",                     low: "4,707", high: "5,757" },
                    { name: "+1 Gear Mod Slot"                                             },
                ],
                "Minor" : [
                    { name: "Ammo Capacity",                   low: "38%",   high: "47%"   },
                    { name: "Bleed Resistance",                low: "37%",   high: "57%"   },
                    { name: "Burn Resistance",                 low: "11%",   high: "13%"   },
                    { name: "Disrupt Resistance",              low: "11%",   high: "13%"   },
                ],
                "Skill" : [
                    { name: "Ballisitc Shield Damage",         low: "2.5%",  high: "3%"    },
                    { name: "Ballistic Shield Health",         low: "7.5%",  high: "9%"    },
                    { name: "Pulse Critical Hit Damage",       low: "7.5%",  high: "9%"    },
                    { name: "Pulse Duration",                  low: "7.5%",  high: "9%"    },
                    { name: "Seeker Mine Damage",              low: "7.5%",  high: "9%"    },
                    { name: "Sticky Bomb Damage",              low: "7.5%",  high: "9%"    },
                    { name: "Support Station Duration",        low: "7.5%",  high: "9%"    },
                    { name: "Support Station Healing Speed",   low: "7.5%",  high: "9%"    },
                    { name: "Support Station Health",          low: "7.5%",  high: "9%"    },
                    { name: "Turret Damage",                   low: "7.5%",  high: "9%"    },
                    { name: "Turret Duration",                 low: "7.5%",  high: "9%"    },
                    { name: "Turret Health",                   low: "7.5%",  high: "9%"    },
                ]
            },
            "Gloves" : {
                "Armor" : { low: "353", high: "431" },
                "Major" : [
                    { name: "Firearms",                        low: "470",   high: "575"   },
                    { name: "Stamina",                         low: "470",   high: "575"   },
                    { name: "Electronics",                     low: "470",   high: "575"   },
                    { name: "LMG Damage",                      low: "470",   high: "575"   },
                    { name: "SMG Damage",                      low: "353",   high: "431"   },
                    { name: "Assault Damage",                  low: "470",   high: "575"   },
                    { name: "Shotgun Damage",                  low: "470",   high: "575"   },
                    { name: "Pistol Damage",                   low: "470",   high: "575"   },
                    { name: "Marksman Damage",                 low: "1,651", high: "2,020" },
                    { name: "Critical Hit Chance",             low: "5%",    high: "6.5%"  },
                    { name: "Critical Hit Damage",             low: "30%",   high: "37%"   },
                    { name: "Damage to Elites",                low: "9%",    high: "11%"   },
                    { name: "Health on Kill",                  low: "9%",    high: "11%"   },
                ],
                "Minor" : null,
                "Skill" : [
                    { name: "Firearms",                        low: "470",   high: "575"   },
                    { name: "Stamina",                         low: "470",   high: "575"   },
                    { name: "Electronics",                     low: "470",   high: "575"   },
                    { name: "Ballistic Shield Damage",         low: "2.5%",  high: "3%"    },
                    { name: "First Aid Self Heal",             low: "7.5%",  high: "9%"    },
                    { name: "Mobile Cover Health",             low: "7.5%",  high: "9%"    },
                    { name: "Pulse Critical Hit Damage",       low: "7.5%",  high: "9%"    },
                    { name: "Seeker Mine Damage",              low: "7.5%",  high: "9%"    },
                    { name: "Smart Cover Damage Increase",     low: "2.5%",  high: "3%"    },
                    { name: "Sticky Bomb Damage",              low: "7.5%",  high: "9%"    },
                    { name: "Support Station Duration",        low: "7.5%",  high: "9%"    },
                    { name: "Turret Damage",                   low: "7.5%",  high: "9%"    },
                ]
            },
            "Holster" : {
                "Armor" : { low: "353", high: "431" },
                "Major" : [
                    { name: "Firearms",                        low: "470",   high: "575"   },
                    { name: "Stamina",                         low: "470",   high: "575"   },
                    { name: "Electronics",                     low: "470",   high: "575"   },
                    { name: "Armor",                           low: "353",   high: "431"   },
                    { name: "Protection from Elites",          low: "4%",    high: "5%"    },
                    { name: "Skill Haste",                     low: "7%",    high: "9%"    },
                    { name: "Pistol Damage",                   low: "235",   high: "287"   },
                    { name: "+1 Gear Mod Slot"                                             },
                ],
                "Minor" : null,
                "Skill" : [
                    { name: "Ballistic Shield Damage",         low: "2.5%",  high: "3%"    },
                    { name: "First Aid Ally Heal",             low: "7.5%",  high: "9%"    },
                    { name: "Mobile Cover Health",             low: "7.5%",  high: "9%"    },
                    { name: "Pulse Critical Hit Damage",       low: "7.5%",  high: "9%"    },
                    { name: "Seeker Mine Damage",              low: "7.5%",  high: "9%"    },
                    { name: "Smart cover Duration",            low: "7.5%",  high: "9%"    },
                    { name: "Sticky Bomb Damage",              low: "7.5%",  high: "9%"    },
                    { name: "Support Station Health",          low: "7.5%",  high: "9%"    },
                    { name: "Turret Duration",                 low: "7.5%",  high: "9%"    },
                ]
            },
            "Kneepads" : {
                "Armor" : { low: "588", high: "719" },
                "Major" : [
                    { name: "Firearms",                        low: "470",   high: "575"   },
                    { name: "Stamina",                         low: "470",   high: "575"   },
                    { name: "Electronics",                     low: "470",   high: "575"   },
                    { name: "Critical Hit Damage",             low: "15%",   high: "18%"   },
                    { name: "Armor",                           low: "235",   high: "287"   },
                    { name: "Health",                          low: "1,176", high: "1,439" },
                    { name: "Damage to Elites",                low: "4%",    high: "5%"    },
                    { name: "Protection from elites",          low: "4%",    high: "5%"    },
                    { name: "Exotic Damage Resilience",        low: "8.5%",  high: "10.5%" },
                    { name: "+1 Gear Mod Slot"                                             },
                ],
                "Minor" : [
                    { name: "Burn Resistance",                 low: "22%",   high: "27%"   },
                    { name: "Disorient Resistance",            low: "22%",   high: "27%"   },
                    { name: "Disrupt Resistance",              low: "22%",   high: "27%"   },
                    { name: "Blind / Deaf Resistance",         low: "22%",   high: "27%"   },
                    { name: "Bleed Resistance",                low: "94%",   high: "115%"  },
                    { name: "Increase Kill Exp",               low: "38%",   high: "47%"   },
                    { name: "Scavenging",                      low: "77%",   high: "94%"   },
                    { name: "Shock Resistance",                low: "22%",   high: "27%"   },
                    { name: "Enemy Armor Damage",              low: "8%",    high: "9%"    },
                ],
                "Skill" : [
                    { name: "Ballisitc Shield Health",         low: "7.5%",  high: "9%"    },
                    { name: "First Aid Ally Heal",             low: "7.5%",  high: "9%"    },
                    { name: "Mobile Cover Health",             low: "7.5%",  high: "9%"    },
                    { name: "Pulse Critical Hit Damage",       low: "7.5%",  high: "9%"    },
                    { name: "Seeker Mine Explosion Radius",    low: "7.5%",  high: "9%"    },
                    { name: "Smart Cover Damage Resilience",   low: "2.5%",  high: "3%"    },
                    { name: "Sticky Bomb Explosion Radius",    low: "7.5%",  high: "9%"    },
                    { name: "Support System Healing Speed",    low: "7.5%",  high: "9%"    },
                    { name: "Turret Health",                   low: "7.5%",  high: "9%"    },
                ]
            }
        };







        console.log("loaded");
        vm.selectSlot = function(slot){
            vm.filter.slot = (vm.filter.slot === slot ? undefined : slot);
            $state.go('.', {slot: vm.filter.slot}, {notify: false});
        };


        return vm;
    }

}());