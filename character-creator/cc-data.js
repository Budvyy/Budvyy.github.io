const originData = {
    Alien: {
        description: "The character is not human and probably not from Earth or at least Earth-616. The Marvel Multiverse features all sorts of different alien races. The most common of these—Kree, Skrulls and so on—have their own entries. If the character doesn't fit one of those, then this origin applies.",
        tags: ["Alien Heritage", "Extreme Appearance (common)"],
        suggestedOccupation: "Outsider"
    },
    
    Kree: {
        description: "The character is a member of the Kree, a humanoid race from the planet Hala who formed the interstellar Kree Empire in the region of space known as the Large Magellanic Cloud. They resemble humans but are stronger and tougher. Many of them have blue skin, but a good number of them have pink skin.\n\nThe air on Hala has much more nitrogen in it, and Kree who are raised in it (or something like it) have a hard time breathing the air on Earth.",
        tags: ["Alien Heritage", "Extreme Appearance (if blue-skinned)"],
        traits: ["Breathe Different", "Enhanced Physique"],
        suggestedOccupation: "Outsider"
    },
    
    Shiar: {
        description: "The character is a member of the Shi’ar, an avian humanoid race from the planet Chandilar who formed the interstellar Shi’ar Empire in the Shi’ar Galaxy. They resemble humans but are much stronger and have feathers instead of hair on their heads.",
        tags: ["Alien Heritage", "Extreme Appearance"],
        traits: ["Enhanced Physique"],
        suggestedOccupation: "Outsider"
    },
    
    Skrull: {
        description: "The character is a member of the Skrull, a reptilian humanoid race of shape-shifters who formed the interstellar Skrull Empire. In their natural form, they have green skin, red or green eyes, pointed ears and furrowed chins. They sprang from the planet Skrullos in the Andromeda Galaxy.\n\nThe original Skrulls could not shape-shift, but the Celestials experimented on them to form Eternal Skrulls and Deviant Skrulls, much like they did with humans on Earth. The Deviant Skrulls became the dominant form of the species, driving the originals to extinction.",
        tags: ["Alien Heritage", "Extreme Appearance (in their natural form)"],
        traits: ["Flexible Bones", "Shape-shift"],
        suggestedOccupation: "Outsider",
        powers: ["Disguise", "Extended Reach", "Flexible Bones", "Shape-shift", "Slip Free"]
    },
    
    Atlantean: {
        description: "The character is a member Homo mermanus, a variant race of humanity. Atlanteans breathe water through gills on both sides of their neck, and they cannot breathe air for longer than ten minutes.\n\nIf they live in the Atlantic Ocean, they likely have blue skin and hail from Atlantis. If they come from the Pacific Ocean, they likely have green skin and live in Lemuria.",
        tags: ["Amphibious", "Extreme Appearance"],
        traits: ["Breathe Different", "Enhanced Physique"],
        suggestedOccupation: "Outsider",
        powers: ["Heightened Senses", "Speed Swim"]
    },
    
    Deviant: {
        description: "The character is a member of Homo descendus, a variant race of humanity created by the Celestials. They are scattered across Earth, but they mainly live in underground cities beneath the Pacific Ocean, close to Lemuria.\n\nOnly one hundred Deviants were originally created, but many more have been born over the millennia since then. They vary a great deal physically, coming in all sizes, shapes, colors and textures. Each is born with a unique physical mutation, and they have the latent genetic ability to develop powers, much like mutants.\n\nEternals are compelled to kill Deviant mutates as part of their principle 'Correct excess deviation.'",
        tags: ["Extreme Appearance", "Hunted"],
        traits: ["Breathe Different", "Enhanced Physique"],
        suggestedOccupation: "Outsider"
    },
    
    Eternal: {
        description: "The character is a member of Homo immortalis, a variant race of humanity created by the Celestials. They are scattered across Earth, but their headquarters lies in the city of Olympia, high in the mountains in Greece and folded into an echo dimension. Some live on Titan (a moon of Saturn) instead. The Eternals live by three principles:\n\n1. Protect Celestials.\n2. Protect the Machine (a sentient A.I. deeply connected with the Earth).\n3. Correct excess deviation.\n\nOnly one hundred Eternals were originally created, and only two have been born since: Thanos and Eros. The character is either one of the lesser-known one hundred or a new Eternal brought to life through extraordinary means.\n\nThrough a ritual usually initiated by the Prime Eternal (their official leader), Eternals can be called to be part of a collective being known as the Uni-Mind.",
        examples: ["Ikaris", "Sersi", "Sprite", "Thanos", "Thena"],
        tags: ["Eternally Immortal", "Mahd Wy’ry"],
        suggestedOccupation: "Outsider"
    },
    HighTech: {
        description: "The character's powers arise from high-tech devices that are well beyond the limits of modern-day engineering. This can come in many forms.",
        examples: ["Doctor Octopus (Otto Octavius)", "Gauntlet (Joseph Green)", "Mysterio (Quentin Beck)", "Trapster"],
        traits: ["Tech Reliance"],
        tags: []
    },
    
    HighTechAndroid: {
        description: "The character is an artificial person. Their body (when they have one) is made of plastic, metal and circuitry rather than flesh and blood. Their powers come from technology embedded in their artificial body.",
        examples: ["Human Torch (Jim Hammond)", "Jocasta", "Machine Man", "Vision"],
        traits: ["Tech Reliance"],
        tags: ["A.I.", "Extreme Appearance (common)"],
        suggestedOccupation: "Outsider"
    },
    
    HighTechBattleSuit: {
        description: "The character wears a high-tech suit that grants them powers. When the battle suit is removed, the character no longer has access to the powers it grants. They are entirely—or at least mostly—normal underneath.",
        examples: ["Iron Man (Tony Stark)", "Ironheart", "War Machine"],
        traits: ["Tech Reliance"],
        tags: ["Extreme Appearance (common when in Battle Suit)"],
        suggestedOccupation: "Outsider"
    },
    
    HighTechCybernetics: {
        description: "The character has high-tech, surgically embedded implants that grant them powers. These cannot be removed without great care or pain.",
        examples: ["Deathlok", "Sabretooth", "Winter Soldier", "Wolverine (Logan)"],
        traits: ["Tech Reliance"],
        tags: ["Extreme Appearance (common)"]
    },
    
    HighTechPymParticles: {
        description: "The character uses Pym Particles (named after their inventor, Henry Pym) to dramatically grow or shrink in size. After long-enough exposure to Pym Particles, many people are able to generate such particles on their own without the need of external aid. They may still need to use extra Pym Particles to reach extremely large or small sizes.",
        examples: ["Ant-Man (Scott Lang)", "Giant-Man (Rax Malhotra)", "Wasp (Janet Van Dyne)"],
        traits: ["Tech Reliance (at first)"],
        powers: ["Grow 1", "Shrink 1"],
        tags: []
    },
    
    Inhuman: {
        description: "The character is a member of Homo sapiens inhumanus, a variant race of humanity genetically engineered by the Kree. For millennia, they lived isolated from the world, but they emerged in recent years, led by Black Bolt. All Inhumans carry a latent gene that can be activated by the Terrigen Mist. The explosion of a Terrigen Bomb spread the mist across the entire planet, revealing that many humans (including Kamala Khan) had Inhuman genetics. Black Bolt was later forced to destroy the Inhumans, leaving few outside of the royal family alive. The character is one of those rare Inhumans who survived.",
        examples: ["Black Bolt", "Crystal", "Karnak", "Lockjaw", "Medusa", "Ms. Marvel (Kamala Khan)"],
        traits: [],
        tags: ["Inhuman Genes"]
    },
    
    Magic: {
        description: "The character’s powers arise from supernatural means. There are many different traditions within magic, each with their own teachings.",
        examples: ["Clea", "Doctor Voodoo (Jericho Drumm)", "Enchantress"],
        traits: [],
        tags: ["Supernatural"]
    },
    
    MagicChaosMagic: {
        description: "The character is able to use chaos magic, which allows them to bend reality to their will. It stems from the ancient god Chthon.",
        examples: ["Morgan Le Fay", "Scarlet Witch", "Wiccan"],
        traits: [],
        tags: ["Chaotic", "Supernatural"]
    },
    
    MagicDemonic: {
        description: "The character taps into (or is cursed by) the powers of Hell. They may be a native of one of the Nine Circles of Hell, or their powers might simply come from a Hellish source.",
        examples: ["Belasco", "Blackheart", "Daimon Hellstrom", "Dormammu"],
        traits: [],
        tags: ["Cursed", "Supernatural"]
    },
    
    MagicSorcery: {
        description: "The character’s powers arise from the study and practice of sorcery.",
        examples: ["Agatha Harkness", "Ancient One (Yao)", "Doctor Strange", "Magik", "Wong"],
        traits: [],
        tags: ["Sorcerous", "Supernatural"]
    },
    
    Monstrous: {
        description: "The character is some kind of monster. They may have a human form—or may have once been human—but they get their powers from their unnatural monstrousness.",
        examples: ["Cullen Bloodstone", "Living Mummy", "Man-Thing"],
        traits: ["Monster"],
        tags: []
    },
    
    MonstrousVampire: {
        description: "The character was once alive but was embraced by a vampire and has risen from death as a vampire too. They can transmit this magical disease to victims of their choosing. When a character becomes a vampire, they go up one rank and gain the listed tags, traits and powers. They do not gain any additional powers or traits from this bump in rank, but they do gain 5 ability points and add +1 to their damage multiplier. If they have the Heroic tag, they also add 1 to their Karma.",
        examples: ["Baron Blood", "Dracula", "Blade (half vampire)"],
        traits: ["Anathema: Garlic/Holy Symbols (including Holy Water)", "Bloodthirsty", "Monster", "Weaknesses: Silver/Wood"],
        powers: ["Animal Communication: Bats/Rodents", "Command", "Healing Factor", "Leech Life", "Mighty 1", "Sturdy 2", "Telepathic Link"],
        limitations: ["Unless the character has another origin, they cannot choose other powers"],
        tags: ["Alternate Forms: Bat/Mist/Wolf", "Deceased", "Imageless"]
    },
    
    MonstrousWerewolf: {
        description: "The character is afflicted with lycanthropy, a magical disease that causes them to take on the shape of a werewolf during the three nights of the full moon. They can transmit this magical disease to victims of their choosing who survive their attacks. When a character becomes a werewolf, they gain the Lunar Transformation and Alternate Form tags. When the character takes on their werewolf form, they go up one rank and gain the rest of the listed tags, traits and powers. They do not gain any additional powers or traits from this bump in rank, but they do gain 5 ability points and add +1 to their damage multiplier. If they have the Heroic tag, they also add 1 to their Karma. When they return to human form, they lose the benefits of their werewolf form.",
        examples: ["Werewolf by Night (Jack Russell)", "Werewolf by Night (Jake Gomez)"],
        traits: ["Berserker", "Monster", "Weakness: Silver"],
        powers: ["Evasion", "Healing Factor", "Heightened Senses", "Mighty 1", "Sturdy 2"],
        limitations: ["Unless the character has another origin, they cannot choose other powers"],
        tags: ["Alternate Form: Werewolf/Wolf", "Extreme Appearance (in werewolf form)", "Lunar Transformation"]
    },
    
    Mutant: {
        description: "The character's powers spring from them being a member of the subspecies Homo superior. They have a latent X-Gene that grants them powers, often triggered at adolescence.",
        examples: ["Cyclops", "Jean Grey", "Storm", "Wolverine (Logan)", "Wolverine (Laura Kinney)"],
        traits: [],
        tags: ["Hounded", "Krakoan", "X-Gene"]
    },
    
    Mythic: {
        description: "The character is a creature or person of myth and legend. While they may appear human, they are something else.",
        examples: ["Angela (Aldrif Odinsdottir)", "Fairies", "Malekith"],
        traits: [],
        tags: ["Supernatural"],
        suggestedOccupation: "Outsider"
    },
    
    MythicAsgardian: {
        description: "The character is a member of the Asgardian people, resembling the Norse gods. They call Asgard their home. The character can be one of the many gods who have been named throughout history, or they can be one of the lesser-known gods of Asgard. They should choose something that they are the god of.",
        examples: ["Hela", "Heimdall", "Loki", "Sif", "Thor (Odinson)"],
        traits: ["God Heritage", "Enhanced Physique"],
        tags: ["Supernatural", "Worshipped"]
    },
    
    MythicOlympian: {
        description: "The character is a member of the Olympian people, resembling the gods of Ancient Greece and Rome. They call Olympus their home. The character can be one of the many gods who have been named throughout history, or they can be one of the lesser-known gods of Olympus. They should choose something that they are the god of.",
        examples: ["Ares", "Athena", "Hercules", "Zeus"],
        traits: ["God Heritage", "Enhanced Physique"],
        tags: ["Supernatural", "Worshipped"]
    },
    
    SpecialTraining: {
        description: "The character's powers come from long hours of practice. Their intense focus grants them abilities that would astonish most people.",
        examples: ["Hawkeye (Clint Barton)", "Hawkeye (Kate Bishop)", "Nick Fury Jr.", "Shang-Chi"],
        traits: ["Determination"],
        limitations: ["Unless the character has another origin, they cannot choose powers that grant them superhuman abilities. Allowed power sets include Martial Arts, Melee Weapons, Ranged Weapons, Shield Bearer and Tactics. They can also choose basic powers a regular human could reasonably have. See the Basic powers list on page 80."],
        tags: []
    },
    
    SpiritOfVengeance: {
        description: "The character has been possessed by a Spirit of Vengeance. Their purpose is to find sinners and impose penance. When a character becomes possessed by a Spirit of Vengeance, they gain the Alternate Form tag, which they can use voluntarily at any point. When the character takes on their Ghost Rider form, they gain access to the listed tags, traits and powers. When they return to human form, they lose the benefits of their Ghost Rider form.",
        examples: ["Ghost Rider (Johnny Blaze)", "Ghost Rider (Danny Ketch)", "Ghost Rider (Robbie Reyes)"],
        traits: [],
        powers: ["Elemental Protection 2", "Environmental Protection", "Healing Factor", "Hellfire Chains", "Mighty 2", "Penance Stare", "Possess Vehicle", "Sense Sins"],
        limitations: ["The character should be at least Rank 4.", "Unless the character has another origin, they cannot choose other powers."],
        tags: ["Alternate Form: Ghost Rider", "Cursed", "Supernatural"]
    },
    
    Symbiote: {
        description: "The character has bonded with one of the Klyntar, a race of alien symbiotes created by the alien god Knull. Most of these creatures on Earth display spiderlike powers. When a character bonds with a symbiote, they go up one rank and gain the listed tags, traits and powers. Any remaining powers they select are often from the Spider-Powers set but do not have to be. Many symbiotes have the Disguise power. If the symbiote is Venom or one of its progeny, Spider-Man (Peter Parker) cannot gain any benefits from his Spider-Sense power against the bonded character.",
        examples: ["Carnage", "Venom (Eddie Brock)", "Shriek"],
        traits: ["Anathema: Extreme Heat", "Anathema: Extreme Sonics"],
        powers: ["Environmental Protection", "Mighty 1"],
        limitations: [],
        tags: []
    },
    
    Unknown: {
        description: "The character has developed powers but is not entirely sure how. It could be that the player or the Narrator knows, but the character does not, or maybe nobody else does either. Astonishing things happen all the time in the Marvel Multiverse, and there's no way to classify them all. The source of these powers may be explained in time. It could turn out that the character actually has a standard type of origin, or it could be that they have an origin that’s utterly unique.",
        examples: ["Squirrel Girl", "Taskmaster"],
        traits: [],
        tags: ["Mysterious"]
    },
    
    WeirdScience: {
        description: "The character’s powers arose from a scientific experiment or accident that’s hard—if not impossible—to reproduce. Often, they had the latent genetic potential to develop powers and were somehow exposed to the right triggers—which would have likely killed most other people. These kinds of characters are sometimes called mutates. The difference between a mutate and a mutant is that a mutant’s powers come to them naturally, but a mutate’s powers require a triggering incident that might never happen. In this sense, Inhumans are all mutates who share a gene with a known trigger: the Terrigen Mist.",
        examples: ["Captain America (Steve Rogers)", "Daredevil (Matt Murdock)", "Invisible Woman", "Jessica Jones", "Luke Cage", "Spider-Man (Miles Morales)", "Spider-Man (Peter Parker)"],
        traits: ["Weird"],
        tags: []
    },
    
    WeirdScienceGammaMutate: {
        description: "The character has a genetic mutation that gave them powers once they were exposed to enough gamma radiation, transforming them physically. This often gives them a monstrous appearance and changes their coloration drastically, usually to green, although some become red or even blue. They can often transform back into their original form as well.",
        examples: ["Doc Samson", "Harpy (Betty Banner)", "Hulk (Bruce Banner)", "Red Hulk (Thaddeus “Thunderbolt” Ross)"],
        traits: ["Weird"],
        powers: ["Evasion", "Healing Factor", "Heightened Senses", "Mighty 1", "Sturdy 2"],
        limitations: ["Unless the character has another origin, they cannot choose other powers"],
        tags: ["Extreme Appearance (common in gamma mutate form)", "Green Door", "Immunity: Gamma Radiation", "Radioactive"]
    }
};

const occupationData = {
    Adventurer: {
        description: "The character focuses on having adventures. Perhaps they're independently wealthy and don’t need another occupation, or maybe they hire out their services.",
        examples: ["Iron Fist (Danny Rand)", "Luke Cage", "Hawkeye (Kate Bishop)"],
        tags: ["Black Market Access"],
        traits: ["Fearless", "Connections: Super Heroes or Villains"]
    },
    
    Assassin: {
        description: "The character is a hired killer. They might tell themselves that this is for the greater good. They might be picky about who they take on as clients or targets, but the core of their occupation is ending lives.",
        examples: ["Arcade", "Bullseye", "Elektra", "the Punisher"],
        tags: ["Streetwise", "Villainous (common)"],
        traits: ["Connections: Criminal", "Signature Attack"]
    },
    
    Criminal: {
        description: "The character did something that put them on the wrong side of the law. They might have spent time in jail for their crimes, or they might have gotten away with them scot-free. The fact that they break the law doesn’t necessarily make them a bad person, but law enforcers usually don’t care about such distinctions.",
        examples: ["Ant-Man (Scott Lang)", "Black Cat", "Gambit"],
        tags: ["Black Market Access", "Streetwise"],
        traits: ["Connections: Criminal"],
        limitations: ["If they are currently wanted by the law for their crimes, they should also take the Hunted tag. If they have served time, they should take the Convict tag too."]
    },
    
    Educator: {
        description: "The character educates others. They might be a grade-school teacher, a college professor or some other kind of instructor. They do their best to bring the knowledge they have to other people.",
        examples: ["Agatha Harkness", "Blue Marvel", "Professor X"],
        traits: ["Connections: Community", "Font of Information", "Presence"]
    },
    
    Engineer: {
        description: "The character designs and builds things to solve problems. They sometimes invent brand-new things, but mostly they take scientific research and apply it to real-world problems.",
        examples: ["Ghost Rider (Robbie Reyes)", "Iron Man (Tony Stark)", "Whiplash"],
        tags: ["Lab Access"],
        traits: ["Gearhead", "Inventor"]
    },
    
    Entertainer: {
        description: "The character entertains others for a living. They could be a singer, a dancer, an actor, a musician, a writer, a filmmaker, a speaker or something similar. They aren't shy—at least when on the job—and they work hard to both gain an audience and keep them engaged.",
        examples: ["Dazzler", "Echo", "Mysterio", "Wonder Man"],
        traits: ["Famous", "Presence", "Public Speaking"]
    },
    
    HealthCareWorker: {
        description: "The character is a doctor, nurse, therapist or other person dedicated to helping heal others. They likely have access to an office where they practice their craft.",
        examples: ["Doc Samson", "Doctor Strange", "the Night Nurse (Linda Carter)", "Thor (Jane Foster)"],
        traits: ["Clinician", "First Aid"]
    },
    
    Investigator: {
        description: "The character is trained to solve mysteries. This can be as a private detective or as part of an official law enforcement organization, ranging from the New York Police Department to the Federal Bureau of Investigation, S.H.I.E.L.D. or even the Nova Corps.",
        examples: ["Jessica Jones", "Misty Knight"],
        traits: ["Connections: Police", "Interrogation", "Investigation"]
    },
    
    Journalist: {
        description: "The character works as a reporter or editor for a news organization. This can range anywhere from the Daily Bugle to TNM (Threats and Menaces). It can also include any sort of reporting, whether TV, radio, newspaper or online.",
        examples: ["Silk", "Spider-Man (Peter Parker)", "Venom (Eddie Brock)"],
        traits: ["Audience", "Connections: Sources", "Pundit"]
    },
    
    LawEnforcer: {
        description: "The character works as a law enforcement officer. They could be anything from a town cop to an agent of S.H.I.E.L.D. They have a great deal of authority inside their jurisdiction and often command respect outside of it as well.",
        examples: ["Nick Fury Jr.", "Human Torch (Jim Hammond)", "Maria Hill", "Photon (Monica Rambeau)"],
        tags: ["Authority", "Backup"],
        traits: ["Interrogation", "Investigation"]
    },
    
    Lawyer: {
        description: "The character has a law degree and knows how to use it. They might work for a gigantic and powerful law firm, or they might have set up their own practice.",
        examples: ["Daredevil (Matt Murdock)", "Foggy Nelson", "She-Hulk"],
        traits: ["Dealmaker", "Legal Eagle", "Public Speaking"]
    },
    
    Leader: {
        description: "The character is the leader of a city, region, state or nation. This includes things like being the elected mayor of New York City or the hereditary king of a country.",
        examples: ["Black Bolt", "Black Panther (T’Challa)", "Doctor Doom", "Sub-Mariner (Namor)", "Thor (Odinson)"],
        tags: ["Authority", "Powerful"],
        traits: ["Presence"]
    },
    
    Military: {
        description: "The character serves (or at least once served) in a military organization and relies on that training. They can sometimes call on their fellow soldiers for help. They may have worked for a nation or possibly as part of a mercenary outfit.",
        examples: ["Captain America (Steve Rogers)", "Captain Marvel (Carol Danvers)", "War Machine", "Wolverine (Logan)"],
        traits: ["Battle Ready", "Connections: Military", "Situational Awareness"],
        tags: ["Obligation: Duty"]
    },
    
    Outsider: {
        description: "The character comes from another planet, dimension or time and is not familiar with how things work on this Earth. They may have had another occupation back where they came from, but it’s not generally applicable here.",
        examples: ["Groot", "Rocket Raccoon", "Thor (Odinson)"],
        traits: ["Connections: Outsiders", "Fresh Eyes", "Stranger"]
    },
    
    Scientist: {
        description: "The character solves problems by means of scientific research. They are often among the smartest people in the world, and other heroes turn to them for their expertise.",
        examples: ["Doctor Octopus (Otto Octavius)", "Hulk (Bruce Banner)", "Mister Fantastic", "Moon Girl"],
        traits: ["Inventor", "Scientific Expertise"],
        tags: ["Lab Access"]
    },
    
    Spy: {
        description: "The character is an expert in espionage. They served as a spy for a nation or corporation and know how to find out about people and organizations.",
        examples: ["Black Widow (Natasha Romanoff)", "Peggy Carter", "Winter Soldier"],
        traits: ["Connections: Espionage", "Leverage"],
        tags: ["Black Market Access"]
    },
    
    Student: {
        description: "The character attends school or college on a full-time basis. What they study or focus on is up to them and their school. Most people start out with this occupation, but once they graduate, they move on to something new. If that happens with your character, you can then select a new occupation to replace this one.",
        examples: ["Moon Girl", "Ms. Marvel (Kamala Khan)", "Spider-Man (Miles Morales)"],
        traits: ["Quick Learner"],
        tags: ["Mentor", "Obligation: School"]
    },
    
    Tycoon: {
        description: "The character is wildly wealthy and well-known. They want for nothing, and they make a splash wherever they go. They get invited to the best parties and let into all the VIP sections.",
        examples: ["Iron Man (Tony Stark)", "Iron Monger (Obadiah Stane)", "Mandarin", "Sunspot", "Wasp (Janet Van Dyne)"],
        traits: ["Connections: Celebrities", "Famous"],
        tags: ["Rich"]
    }
};

const traitData = {
    Abrasive: {
        description: "The character rubs people the wrong way. This gives them trouble when trying to make Ego checks to persuade someone to help them out. It gives them an edge when they’re trying to make Ego checks to intimidate someone.",
        edges: ["Ego: Intimidate"]
    },
    
    Anathema: {
        description: "The character suffers direct harm when exposed to a particular substance. They cannot voluntarily enter the same space with it. If they are touched by it, they instantly suffer the damage of a Rank 3 attack roll that automatically succeeds. This continues each turn until they are separated from the substance or are killed or destroyed.\n\nDamage caused by Anathema ignores all damage reduction the character has and cannot be healed by their Healing Factor."
    },
    
    Audience: {
        description: "Many people follow the character's work and treat them with the respect they deserve. By making an Ego check, the character can persuade their audience to provide help in the form of information or resources. The Narrator determines the TN of the Ego check based on the favor requested.",
        edges: ["Ego: Persuade audience for information/resources"]
    },
    
    BattleReady: {
        description: "The character is always mentally prepared for any sort of trouble to start. Add +30 Focus.",
        modifiers: ["+30 Focus"]
    },
    
    Beguiling: {
        description: "The character has an edge when making an Ego check to persuade someone who could be attracted to them.",
        edges: ["Ego: Persuade someone attracted to them"]
    },
    
    Berserker: {
        description: "The character often loses control of their temper. Any time they take physical damage, they must make an Ego check with a TN equal to the amount of damage done. If they fail, they go berserk and must charge at full speed into combat with the enemy who hurt them.\n\nBeing berserk gives the character an edge on all close attacks and adds +2 to their Melee, Resilience and Ego defenses. However, it takes -2 from their Agility defense, and they cannot use ranged weapons.\n\nIf the character defeats the enemy who hurt them, they must then charge to attack the next closest foe.\n\nAt the end of the character's turn, they lose 5 Focus. When their Focus is reduced to the point that the character could not voluntarily spend any more Focus—or if there are no enemies in sight—the berserk state automatically ends.",
        modifiers: ["+2 Melee", "+2 Resilience", "+2 Ego", "-2 Agility"],
        edges: ["Close attacks"]
    },
    
    Big: {
        description: "The character's size is big, which applies -1 to their Melee and Agility defenses, adds +1 to their Run Speed, and increases their reach to 2. They still occupy a single space.",
        modifiers: ["-1 Melee", "-1 Agility", "+1 Run Speed", "Reach: 2"]
    },
    
    Bloodthirsty: {
        description: "The character likes hurting people—even killing them. After they knock someone unconscious, they must make a Challenging Ego check to keep from continuing to attack them until they’re dead.\n\nA character with this trait cannot take the Heroic tag."
    },
    
    BreatheDifferent: {
        description: "The character cannot breathe Earth's air for long. They lose 1 point of Health for every minute they do not have some sort of assistance to allow them to breathe properly.",
        modifiers: ["-1 Health per minute without assistance"]
    },
    
    Clinician: {
        description: "The character has an edge on Logic checks to determine what is medically wrong with someone they examine.",
        edges: ["Logic: Medically examine"]
    },
    
    Clueless: {
        description: "The character tends to shut out things they’re not entirely focused on. They have trouble on any Vigilance checks to spot hidden or invisible things. Enemies have an edge on Agility checks to sneak near or past them."
    },
    
    CombatExpert: {
        description: "The character knows how to handle themselves better than most. They have an edge on Melee attacks against enemies of Rank 1.",
        edges: ["Melee: Attacks against Rank 1 enemies"]
    },
    
    CombatReflexes: {
        description: "The character can react quickly in combat. This grants them one additional reaction each turn.",
        modifiers: ["+1 Reaction"]
    },
    
    Connections: {
        description: "The character knows someone with access to and knowledge of a particular field. The connection could be a reporter, a police officer, a politician, a mobster and so on. By making an Ego check, the character can call on their contact to provide help in the form of clues, information or resources. The Narrator determines the TN of the Ego check based on the favor requested.\n\nThis trait can be selected multiple times, using many different types. These include Celebrities, Community, Criminal, Espionage, Military, Outsiders, Police, Professional, Sources, Super Heroes and so on.",
        edges: ["Ego: Call on connections for help"]
    },
    
    Dealmaker: {
        description: "The character is skilled at the art of negotiation. They have an edge on action checks that have to do with making deals.",
        edges: ["Action checks: Making deals"]
    },
    
    Determination: {
        description: "The character never gives up, even when they feel like they're at their worst. While demoralized, they do not gain trouble on all actions, though they still cannot maintain concentration or spend further Focus."
    },
    
    EideticMemory: {
        description: "The character rarely forgets anything. If their player forgets something, they can ask the Narrator to remind them."
    },
    
    EnduringConstitution: {
        description: "The character can function for up to 48 hours without sleep and has an edge on Resilience checks to overcome fatigue or weariness.",
        edges: ["Resilience: Overcome fatigue or weariness"]
    },
    
    EnhancedPhysique: {
        description: "The character is stronger than regular humans. Treat them as one size bigger for lifting, carrying, swinging and throwing things. (This does not stack with other factors.)",
        modifiers: ["Size: One size bigger"]
    },
    
    ExtraOccupation: {
        description: "The character has a busy life and has done all sorts of things. They can choose another occupation."
    },
    
    ExtraordinaryOrigin: {
        description: "The character has an additional origin. This trait can be selected multiple times, but each time must be cleared with the Narrator. Take care to make sure that the origins make some kind of sense when combined together."
    },
    
    Famous: {
        description: "The character is widely known—at least among a certain group of people or a population. They may be well-liked or they may be hated, but either way, they are famous. They have an edge when making an Ego check to persuade someone who thinks favorably of them. They have trouble when making an Ego check to persuade someone who dislikes them.\n\nIf the character has a secret identity, this trait works for only one of their identities. However, it can be taken multiple times for multiple identities.",
        edges: ["Ego: Persuade favorable opinions"]
    },
    
    Fearless: {
        description: "The character is extremely brave. They have an edge on any action checks required to deal with fear.",
        edges: ["Action checks: Deal with fear"]
    },
    
    FirstAid: {
        description: "The character knows how to administer first aid. They have an edge on Logic checks to stop bleeding.",
        edges: ["Logic: Stop bleeding"]
    },
    
    FontOfInformation: {
        description: "The character has an edge on Logic checks having to do with knowledge.",
        edges: ["Logic: Knowledge-based checks"]
    },
    
    FreeRunning: {
        description: "The character has an edge on Agility checks made to perform acrobatics during a movement action.",
        edges: ["Agility: Perform acrobatics during movement"]
    },
    
    FreshEyes: {
        description: "The character has their own way of doing things. This often makes them seem strange to those around them, but it means they can bring new perspectives to existing issues. They have an edge on Logic checks when faced with something for the first time.",
        edges: ["Logic: First encounter with something"]
    },
    
    Gearhead: {
        description: "The character knows their way around machines. They have an edge on Logic checks to figure out how any machine works.",
        edges: ["Logic: Figure out how machine works"]
    },
    
    Glibness: {
        description: "The character can strike up a conversation with anyone at any time and can often convince them to lend a hand. They have an edge on Ego checks to persuade characters they are speaking to for the first time.",
        edges: ["Ego: Persuade first-time interactions"]
    },
    
    GodHeritage: {
        description: "The character—or at least one of their ancestors—is a god. Pick something that they are the god of.\n\nThey don't have to be a god that most people have heard of. In fact, they can be the god of something entirely new. However, they cannot generally be the god of something that’s already been claimed by someone else in their pantheon. Other gods are often jealous of their positions and take issue with such rivals.\n\nThe character has an edge when dealing with something that they are the god of.\n\nRestriction: This trait can be selected only by characters with a mythic origin and an attachment to a particular pantheon, like Asgardian or Olympian.",
        edges: ["Ego: Handling domains of deity"]
    },
    
    Gullible: {
        description: "The character is easy to fool. People lying to them have an edge on their Ego checks to persuade the character of something."
    },
    
    Honest: {
        description: "The character is a terrible liar. They have trouble any time they make an Ego check that involves telling a lie. However, they have an edge on any friendly Ego (persuasion) checks in which they're truthful.",
        edges: ["Ego: Friendly persuasion when truthful"]
    },
    
    Interrogation: {
        description: "The character knows how to ask the right questions in the right way. They have an edge on Ego or Logic checks made when asking questions.",
        edges: ["Ego: Ask questions", "Logic: Ask questions"]
    },
    
    Inventor: {
        description: "The character is good at coming up with solutions on the fly. They have an edge on Logic checks when creating or repairing things.",
        edges: ["Logic: Create or repair things"]
    },
    
    Investigation: {
        description: "The character is an expert investigator. They have an edge on Vigilance checks to spot clues and on Logic checks related to interpreting clues. If they have access to a forensics lab at the time, they gain a second edge on such checks.",
        edges: ["Vigilance: Spot clues", "Logic: Interpret clues", "Logic: Interpret clues (forensics lab)"]
    },
    
    IronWill: {
        description: "Enemies have trouble on Ego attacks to control the character's mind or influence their behavior. Also, the character gains an edge on Ego checks to break free of mind control or other compulsions.",
        edges: ["Ego: Break free of mind control or compulsions"]
    },
    
    LegalEagle: {
        description: "The character knows the laws of their homeland and can help others navigate them. They have an edge on Logic checks when dealing with legalities.",
        edges: ["Logic: Deal with legalities"]
    },
    
    Leverage: {
        description: "The character is good at figuring out what people want and using it against them. They have an edge on Logic checks to investigate people and on Ego checks to persuade people they've investigated.",
        edges: ["Logic: Investigate people", "Ego: Persuade investigated people"]
    },
    
    Loner: {
        description: "The character does not play well with others. They cannot be given an edge via assistance by someone who is not a teammate."
    },
    
    Monster: {
        description: "The character is some kind of monster, often of a type spoken of in legend. They have an edge whenever they attempt to intimidate someone.",
        edges: ["Ego: Intimidate"]
    },
    
    OutOfShape: {
        description: "The character is in poor physical condition. They are considered one size smaller for the purposes of lifting, carrying, swinging and throwing things.",
        modifiers: ["Size: One size smaller"]
    },
    
    Piloting: {
        description: "The character knows how to operate vehicles of all kinds. They have an edge on Agility checks triggered when piloting or driving a vehicle during a movement action. This applies to cars, boats, aircraft and so on.",
        edges: ["Agility: Piloting or driving vehicle"]
    },
    
    Presence: {
        description: "The character knows how to command attention on demand. They have an edge on Ego checks that involve getting people to pay attention to them or to voluntarily do things for them.",
        edges: ["Ego: Command attention"]
    },
    
    PublicSpeaking: {
        description: "The character knows how to get the attention of a crowd, whether that’s at a political rally or in front of a jury or a classroom. They have an edge on Ego checks when attempting to persuade groups.",
        edges: ["Ego: Persuade groups"]
    },
    
    Pundit: {
        description: "The character knows how to break news items and put them into context to craft a story around them. They have an edge on Ego or Logic rolls made when giving their opinion via media.",
        edges: ["Ego: Give opinion via media", "Logic: Give opinion via media"]
    },
    
    QuickLearner: {
        description: "If the character fails an action check, they gain an edge on the check if they try the same action again on their next turn.",
        edges: ["Retry action check"]
    },
    
    ScientificExpertise: {
        description: "The character has extensive scientific training. They have an edge on Logic checks made when dealing with scientific research. If they have access to an appropriate lab at the time, they gain a second edge on such checks.",
        edges: ["Logic: Scientific research", "Logic: Scientific research (lab access)"]
    },
    
    SignatureAttack: {
        description: "The character is known for favoring a particular kind of weapon or attack power. They have an edge when making attacks that way.\n\nThis trait can be taken more than once, but each time must be with a different kind of weapon or attack power.",
        edges: ["Attack: Preferred weapon or power"]
    },
    
    SituationalAwareness: {
        description: "The character is trained to always keep an eye out for trouble. They have an edge on initiative checks.",
        edges: ["Initiative"]
    },
    
    Skeptical: {
        description: "The character is hard to fool. People lying to them have an edge on their Ego checks to persuade the character of something."
    },
    
    Small: {
        description: "The character's size is small, which adds +1 to their Melee and Agility defenses and takes -1 from their Run Speed.",
        modifiers: ["+1 Melee", "+1 Agility", "-1 Run Speed"]
    },
    
    Sneaky: {
        description: "The character has an edge on Agility checks when sneaking around. Enemies have trouble on Vigilance checks to detect the character when the character is invisible or hiding.",
        edges: ["Agility: Sneaking around"]
    },
    
    Stranger: {
        description: "The character doesn’t understand local customs. They have trouble on checks made when trying to decipher such things or when trying to pass themselves off as a local."
    },
    
    SurprisingPower: {
        description: "The character can choose a power they normally wouldn't be able to use. The character will still need to have any prerequisite powers, but they can ignore rank and origin requirements. This trait can be selected multiple times.",
        edges: ["Power: Use unusual power"]
    },
    
    TechReliance: {
        description: "The character relies on technology for powers. When they take damage that would render them unconscious, they can instead choose to lose all of their technology-related powers and remain conscious with 1 point of Health remaining.\n\nAssuming the character has access to parts and tools, lost powers can be repaired after a battle.\n\nThe character suffers an unusual amount of harm from certain substances. Any attack made with that substance ignores all inherent damage reduction the character has and cannot be healed by their Healing Factor."
    },
    
    Weird: {
        description: "The character has something weird (or even wonderful) about them. This causes people to have strong reactions to them, both good and bad. They have an edge on all Ego checks to persuade people inclined to like them and trouble on all Ego checks against people inclined to dislike them.",
        edges: ["Ego: Persuade people who like them"]
    },
};