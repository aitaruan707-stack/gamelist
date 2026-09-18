/*
 * Build-time editorial layer for game detail pages.
 * Every statement here is grounded in what the shipped game bundle actually contains
 * (scene/bundle names, UI strings, control model) or in genre knowledge that is true
 * for any player. No invented metrics, ratings, player counts or testimonials.
 * Rendered by build.mjs; never fetched at runtime.
 */
export const GUIDES = {

  puzzleyarnfun: {
    verdict: 'A cozy swap-and-match puzzle that leans on long combo chains rather than busywork.',
    about: [
      'Puzzle Yarn Fun takes the familiar swap-two match-3 loop and re-skins it as soft yarn blocks on a wooden board, which changes how the game reads more than how it plays. Because every piece is a solid ball of yarn instead of a flat gem, matched groups disappear with a squash-and-stretch pop, and the falling pieces visibly roll into the gap they leave. That single choice makes the board easier to scan: you are tracking round shapes against a warm background rather than tiny colour differences, so mis-reads are rarer than in most gem matchers.',
      'The structure is a straight level ladder. Each board hands you a target — clear a set number of a certain yarn colour, or sweep specific obstacles off the layout — and a move allowance. Spending moves inefficiently is the only real failure state, which means the game rewards planning two swaps ahead instead of fast tapping. Levels are grouped into level packs that ramp gradually: early boards teach one mechanic at a time, later ones stack blocked cells, rope-wrapped yarn and narrow gaps in the same layout.',
      'It is also the calmest game in our puzzle catalogue. There is no timer on the board, nothing expires while you think, and the whole thing runs in portrait orientation, so it suits one-handed play on a phone. If you want a match-3 that can be picked up for five minutes and put down without a penalty, this is that game.'
    ],
    systems: [
      { h: 'Combo chains are the real score', p: 'Clearing a match that drops other pieces into new matches continues the chain without costing a move. A single swap that triggers a three-step cascade is worth far more than three separate swaps, because it advances the goal and keeps your move count intact.' },
      { h: 'Boosters you earn instead of buy', p: 'The board hands out special yarn pieces when you clear four or five in a row, and there is a dart-style booster that removes a chosen cluster. You unlock these by playing well, and saving them for a congested board is almost always better than spending them the moment they appear.' },
      { h: 'Progress and the collection screen', p: 'Cleared levels are recorded on your device, and there is a collection view that tracks which layouts you have finished. Nothing is uploaded anywhere — Tapzens stores game state in your browser only, which is also why clearing site data can reset your position.' }
    ],
    howTo: [
      'Swipe across two adjacent yarn blocks to swap them. The swap only sticks if it creates a line of three or more matching colours.',
      'Before you swipe, look at the whole board and find the match that causes the most movement underneath it — cascades are where the value is.',
      'Work from the bottom of the board upward whenever you can. Clearing low rows makes fresh pieces fall and naturally sets up your next match.',
      'Watch the level goal indicator, not the pretty board. A match that feels satisfying but does not advance the goal still costs you a move.',
      'If a colour is scarce on the board, do not chase it. Match the abundant colours to shuffle the layout until the scarce one becomes reachable.',
      'When you are completely stuck, spend a turn making any legal match at random — a reshuffled board frequently opens a line that was not there before.'
    ],
    tips: [
      'Match five in a line first, always. It produces the strongest booster in the game, and one well-placed booster clears more of a goal than five ordinary swaps.',
      'Group boosters. Activating a booster next to another special piece converts a wider area of the board; two boosters used together beat two used on separate turns.',
      'Keep an eye on the move counter early. If you reach half your moves with most of the board untouched, slow down and plan, because the back half is where players lose levels.',
      'Rope-wrapped and blocked yarn cannot move. Clear the surrounding pieces instead of trying to route matches through them.',
      'Corner matches are safer than centre ones for setting up cascades, because the drop pattern in a corner funnels pieces into a single column.',
      'Leave a five-match pattern untriggered until the board is crowded, then set it off — late in a level it clears obstacles you would otherwise burn moves on.'
    ],
    mistakes: [
      'Swiping the first available match you see. In Puzzle Yarn Fun every move is budgeted, so reflex swaps are the main reason a level fails with two or three pieces left.',
      'Using a booster on a nearly empty goal. Boosters reset nothing, so spending one when you need one more piece of a colour wastes the strongest tool you have.',
      'Ignoring the bottom rows. Experienced players clear low first; new players clear top and then find the board locks up with nothing left to move.'
    ],
    device: 'Portrait by design, so the board sits comfortably in one hand on a phone and the swap gesture has the whole screen width to work with. On desktop the same swipes become clicks: press a piece, drag toward the neighbour you want, release. Nothing about the layout is scaled down on a small screen — the pieces stay large enough for thumb play, which is unusual for the genre.',
    faq: [
      { q: 'Is Puzzle Yarn Fun the same game as the one on puzzle-yarnfun.tapzens.com?', a: 'It is the same puzzle, presented in two places. We also run a dedicated site for it, so the entries share the game; the Tapzens page is the version inside the wider catalogue.' },
      { q: 'Does it need an account or a sign-up?', a: 'No. There is no registration anywhere on Tapzens — press play and the level loads. Progress is written to your browser on your device.' },
      { q: 'What happens if I run out of moves?', a: 'The level ends and you can replay it. Your earned boosters and completed levels are not lost, so a failed attempt costs you nothing but the attempt.' },
      { q: 'Is there a time limit on the board?', a: 'No timer. You can take as long as you like to find a line, which is why the game works well on a commute or in short breaks.' },
      { q: 'Will my progress survive clearing my browser data?', a: 'Probably not. Save data lives in local browser storage; clearing site data, using private browsing, or switching devices starts the ladder fresh.' },
      { q: 'Are there ads while I play?', a: 'Advertising is served at page level through our consent prompt, and levels occasionally offer an optional rewarded video if you want a bonus such as extra moves. You can decline it and keep playing.' }
    ]
  },

  puzzlewatersort: {
    verdict: 'The reference implementation of the water-pour genre — and the one on our site that ships the most extra modes.',
    about: [
      'Water Sort puzzles run on a single rule that takes about ten seconds to learn and roughly a week to master: you may only pour a colour onto the same colour, or into an empty bottle. Everything in Puzzle: Water Sort follows from that constraint. The challenge is not spotting a move — it is remembering that a move which looks safe now can fill the only bottle that could have received a colour three turns later.',
      'The version in our catalogue is built as a full puzzle suite rather than a single mode. Alongside the standard bottle layout there is a conveyor-belt variant where bottles arrive on a moving line, a tall-cup variant with deeper columns, and an untie-the-knot puzzle that reuses the same planning muscle on rope instead of liquid. A daily challenge board, a hint system, and a collectibles screen sit around the core game.',
      'It also handles pacing better than most free sort puzzles. A lives system using hearts limits how many boards you can fail in a row, gold and coins are earned by finishing levels rather than purchased, and the hint button costs in-game currency. The result is a game that pushes you toward solving rather than toward paying.'
    ],
    systems: [
      { h: 'The pour rule and why it bites', p: 'You can only pour onto a matching top colour or into an empty bottle, and a partial pour is allowed — if the target has room for two units and you have four on top, two move and two stay. Forgetting the partial pour is the most common cause of a locked board.' },
      { h: 'Three extra modes on the same engine', p: 'The conveyor-belt mode replaces free choice with a queue, so you plan around what arrives next. Tall cups raise column depth, which multiplies the number of colours in play at once. The knot puzzle asks you to unwind overlapping ropes — a different skin, but the same forward-planning skill the bottle mode tests.' },
      { h: 'Hearts, coins and gold', p: 'Failed levels consume hearts, which recover on their own over time. Playing through awards coins and gold; gold is what the hint button and a few convenience options draw from. There is a store screen, but nothing in it is required to finish the ladder.' },
      { h: 'Hints that show one move, not the solution', p: 'The hint system highlights a single legal pour rather than solving the board. It is a useful learning tool: after a few dozen uses you start recognising the pattern it picks, which is exactly the pattern you should have found yourself.' }
    ],
    howTo: [
      'Tap the bottle whose top colour you want to move, then tap the destination bottle. Tap the source again to cancel if you change your mind.',
      'Start every board by finding which colours are nearly complete — a colour with three of its four units already stacked is one pour away from being off the table.',
      'Keep at least one bottle empty on purpose. An empty bottle is a parking space; filling all of them early removes your only way to reorder colours.',
      'Never pour a mixed colour onto a bottle that will soon be finished, since you would then have to move that lid layer somewhere else first.',
      'Work backwards from the top: if a colour is buried under two other colours, the bottles above it must be resolved first, so plan that unstacking before you make an attractive-looking move.',
      'When the board locks, undo a few steps rather than restarting. The mistake is usually one pour earlier than the moment you noticed it.'
    ],
    tips: [
      'Count the units of each colour before you move. Knowing a colour has two units left tells you it can never complete a bottle alone, so it belongs on top of something temporary.',
      'Empty bottles are worth more than near-full bottles. Trading a near-complete colour for a free parking space is often the right call in the mid-game.',
      'In conveyor-belt mode, plan one item ahead of the belt. Solving the visible board while ignoring what is arriving creates the lock-up.',
      'Reserve gold. The hint button is the main drain, and using it on every hard board is the difference between coasting and actually learning the pattern library.',
      'Tall-cup boards need the opposite instinct from short ones: dig deep early. Layers buried at the bottom of a long column take many turns to surface, so uncover them while you still have spare bottles.',
      'The daily challenge board is usually harder than the level at the same point in the ladder, because it is designed to be solvable in one attempt by most players.'
    ],
    mistakes: [
      'Pouring a colour into the gap it seems to fit without checking how many units of it remain somewhere else on the board.',
      'Filling your last empty bottle because a single matching unit was sitting there. That parking space was probably the reason the board was still solvable.',
      'Treating the knot mode like the bottle mode. Rope layers interact in both directions at once, and the pour instinct that works on bottles leads to dead ends there.'
    ],
    device: 'Portrait, which is the right call for a bottle puzzle: tall columns fit a phone screen without shrinking the liquid layers to unreadable slivers. On a desktop window the board simply centres — a mouse click replaces the tap, and there is no keyboard control to learn. Progress and hearts live in local browser storage, so the same profile picks up where you left it.',
    faq: [
      { q: 'What is the actual win condition on a board?', a: 'Every bottle holds one single colour. A bottle that is full but mixed does not count, and there is no bonus for finishing quickly — only the layout matters.' },
      { q: 'Why did my hearts stop refilling?', a: 'Hearts recover on a timer while the game is open in a browser tab. Closing the tab stops the clock; the counter also caps out, so banking hearts beyond the maximum does nothing.' },
      { q: 'Are the extra modes unlocked or available straight away?', a: 'The bottle ladder is where you start, and the conveyor, tall-cup and knot variants sit alongside it in the same game. Some are gated behind early progression, which is normal for the genre.' },
      { q: 'Can I play it on a small phone without zooming?', a: 'Yes. The board is laid out for portrait phone screens and the bottles are large tap targets; you should not need pinch-zoom at any point.' },
      { q: 'Is my save tied to an account?', a: 'No, and there is no account to tie it to. State is stored on the device and browser you played in, so a different phone means starting again.' },
      { q: 'Does the game need a strong connection?', a: 'Only to load the initial files. Once the puzzle is on screen, pouring and undoing are all local — a flaky connection will not cause you to lose a board.' }
    ]
  },

  chromajam: {
    verdict: 'A colour-routing puzzle that plays like a traffic jam you have to untangle one lane at a time.',
    about: [
      'Chroma Jam replaces the match-3 swap with a routing problem: coloured blocks sit on a board and you move each one into a lane, with the rule that a lane only accepts a single colour. Boards are defined by borders, rotatable pieces and obstacle cells, and the level is solved when the jam is fully dispersed. It is closer to a sliding-block puzzle than to a matcher, despite the bright, casual presentation.',
      'What makes it interesting is rotation. Many pieces can turn before they are placed, and the same block that refuses to fit in a lane will slot in cleanly once rotated. So each move has two decisions — which lane, and which orientation — and later levels add obstacles that occupy lane cells and shrink your options without changing the rule.',
      'The difficulty curve is gentle and the boards are compact enough to read at a glance on a phone. There is a Give Up control rather than a fail screen, meaning an unsolvable-looking board is never punished: you return to the level select and try another. Levels are streamed from a dedicated level bundle, which is why the first screen loads quickly even though the catalogue behind it is large.'
    ],
    systems: [
      { h: 'Lanes are the constraint, not the goal', p: 'Every lane accepts exactly one colour, and once a lane has a colour in it, that colour is locked to it. Choosing which lane takes which colour at the start of a board is the real puzzle — a poor assignment can make a solvable level impossible.' },
      { h: 'Rotation before placement', p: 'Most pieces carry a rotation state. Tap a block, orient it, then commit it to a lane; if it will not fit, it usually wants a quarter turn rather than a different lane. Some pieces lock to their lane and can no longer be turned once placed.' },
      { h: 'Obstacle cells and borders', p: 'Level data places fixed obstacles inside the grid and borders along the edges, both of which reduce usable lane cells. Obstacles never move, so plan the colours with the largest piece count into the lanes that are least blocked.' }
    ],
    howTo: [
      'Read the whole board first and count how many blocks there are of each colour, and how many free cells each lane has.',
      'Assign the biggest colour group to the longest, cleanest lane before you place anything.',
      'Tap a block to pick it up, rotate it if the shape does not sit flush, then tap the lane you want it to drop into.',
      'Clear the blocks that block other routes first, even if the colour order feels wrong — opening space early prevents a locked board later.',
      'Fill a lane completely when you can. A half-finished lane still reserves that colour, so leaving several lanes half-filled wastes capacity.',
      'If nothing fits any lane, use the exit to the level select rather than shuffling pieces; the mistake was almost certainly the first lane assignment, not the last move.'
    ],
    tips: [
      'Do not place the first block that fits. The opening placement decides the lane-to-colour mapping for the whole board, and it cannot be undone.',
      'Rarest colour first. Small groups are flexible early but become impossible to park once the free lanes are claimed.',
      'Where you have a choice, put a colour into the lane nearest its current position. Long trips across the board tend to strand blocks behind obstacles.',
      'Rotate before you commit mentally: if a piece looks like it does not fit, run through its four orientations first — roughly half of apparent dead ends in Chroma Jam are orientation problems.',
      'Keep one lane completely empty as long as possible. It is your only shuffle room, and once every lane holds a colour there is nowhere to move a mistake.',
      'On boards with many obstacles, solve the geometry before the colours: find the arrangement that leaves the blocked cells survivable, then assign colours to fit it.'
    ],
    mistakes: [
      'Claiming a long lane with a colour that only needs two of its cells, which strands the larger groups in short lanes.',
      'Placing a block without checking whether it will ever be possible to reach the far end of that lane again.',
      'Rotating at random instead of deliberately; a piece has four states, and testing them in order finds the fit in a couple of taps.'
    ],
    device: 'Portrait, thumb-reachable, and the tap-rotate-drop sequence is comfortable one-handed. There is no drag gesture to fight with and no timing element, so a desktop mouse works just as well as a phone screen. On a large monitor the board stays centred rather than stretching, which keeps lane colours easy to distinguish.',
    faq: [
      { q: 'Is Chroma Jam a match-3 game?', a: 'No, despite the colour-grouped pieces. Nothing is matched or cleared by alignment — you are routing blocks into single-colour lanes, which makes it a packing and planning puzzle.' },
      { q: 'Can a board become unsolvable mid-play?', a: 'In practice yes, which is why there is an exit rather than only a win or fail. If you lock the layout, leave and replay; nothing you earned is lost.' },
      { q: 'Do I lose progress if I quit a level halfway?', a: 'The level resets to its starting layout and your position in the ladder is unchanged.' },
      { q: 'Are there ads inside the levels?', a: 'Page-level ads on Tapzens run through our consent prompt. Some in-game bonus options are offered as optional rewarded videos, which you can always close.' },
      { q: 'Does it work with a keyboard?', a: 'There is no keyboard scheme; pointer input only. On a laptop that means the trackpad, which is fine because nothing in the game requires speed.' },
      { q: 'What is the best first move on a new board?', a: 'Counting. Spend the first few seconds on piece counts and free lane cells before touching anything — it is the single highest-value habit in this game.' }
    ]
  },

  hunterevolveuprising: {
    verdict: 'A merge-and-deploy battle game where unit composition decides the fight before it starts.',
    about: [
      'Hunter: Evolve Uprising is a landscape battle game built around merging. You deploy units onto a field, matching units combine into a stronger version, and the resulting squad has to survive escalating waves that end in boss encounters. Troop data, troop animation sets and a dedicated boss troop bundle are all separate asset groups in the build, which is why different unit families behave and look distinctly from one another.',
      'The second layer is equipment. There is a gear set with its own configuration and evolution bundles, so units can be upgraded between fights rather than only within one. Add a card-based selection layer and a set of battle maps, and the game stops being a reflex test: you are choosing an army before the level begins, and the fight mostly validates that choice.',
      'Play sessions are short. A single battle runs to a boss in a couple of minutes, and losing costs you the attempt rather than your progression, so the natural loop is to try a composition, see how far the boss pushes back, and change one thing.'
    ],
    systems: [
      { h: 'Merging is the economy', p: 'Two matching units combine into the next tier. Because tiers compound, a single high-tier unit is usually worth more than several low-tier ones — but it also takes twice the deployments to reach, so a rush to the top tier can leave your field undefended on the way up.' },
      { h: 'Gear and evolution between battles', p: 'Units carry equipment that has its own upgrade track. Gear is persistent, so a lost battle still leaves your hunters better armed than before; this is the game’s main defence against a hard boss feeling like wasted time.' },
      { h: 'Boss waves are the difficulty wall', p: 'The boss asset set is separate from regular troops, and it behaves differently — the encounter tests whether your composition has an answer to its pattern rather than whether your total power is high. The first attempt at a new boss is information, and it is fine to spend it that way.' }
    ],
    howTo: [
      'Deploy early and constantly. Empty field space is where an enemy wave reaches your back line, so keep a unit landing even while you plan.',
      'Merge deliberately toward one or two strong units rather than scattering upgrades across the whole bench.',
      'Watch which damage type the current wave resists and merge into the unit family that is working, not your favourite one.',
      'Spend earned gear upgrades after a loss, not only after a win — that is when they buy you the next attempt.',
      'Hold one merge in reserve for emergencies. A ready pair can be dropped straight into a gap when a boss breaks your line.',
      'On landscape, rotate your phone properly and use both thumbs; the deploy area is wide and reaching the far edge one-handed causes mis-deployments.'
    ],
    tips: [
      'The merge chain matters more than the count. Six deployed low-tier units lose to three tier-matched ones far more often than the raw numbers suggest.',
      'Enemy waves are predictable within a level. Once you have failed a stage twice you know the timing of every spawn — plan your merges around that schedule.',
      'Front-line units absorb the damage your back line needs to land. If your squad melts, fix the front rather than upgrading the attackers.',
      'Skip no gear screen. Upgrades you leave unpurchased are the cheapest power available, since they cost currency you already have.',
      'A boss that beats you at the same phase every time is a positioning problem, not a power problem — change where you deploy before you change what you deploy.'
    ],
    mistakes: [
      'Merging everything into one unit. One kill removes your entire frontline and the waves behind it arrive untouched.',
      'Deploying the strongest unit you have instead of the one the current enemy type is weak against.',
      'Replaying a lost battle unchanged. The composition is the variable; if you do not change it, the result will not either.'
    ],
    device: 'Landscape on purpose — the battlefield is wide and units need room to be placed, so the game asks you to turn the phone. On a tablet the extra width is a real advantage, and on desktop it plays with a mouse with no keyboard requirements.',
    faq: [
      { q: 'Is this a strategy game or a reflex game?', a: 'Mostly strategy. Deploy and merge taps are unhurried, and outcome is decided by unit choice, merge timing and gear rather than how fast you react.' },
      { q: 'Do I lose gear or units when a battle fails?', a: 'No. Persistent upgrades stay; the battle itself resets so you can retry with a changed squad.' },
      { q: 'Why does my squad die on the same boss every time?', a: 'Almost always an unanswered mechanic in that boss pattern rather than a power gap. Watch the phase where the wipe happens and change what you deploy into it.' },
      { q: 'Does it need a strong connection during play?', a: 'No, the fight is simulated locally. Only the initial load pulls assets from our servers.' },
      { q: 'Where are ads placed?', a: 'At page level through the Tapzens consent prompt, plus optional rewarded videos if you choose a bonus. Nothing plays an ad over you mid-battle without a choice.' }
    ]
  },

  acestrike: {
    verdict: 'An arcade dogfight that aims for you, so the whole game is movement discipline.',
    about: [
      'Ace Strike is a jet fighter shooter that removes aiming from the equation. Your guns lock on and fire on their own, which at first sounds like it takes skill away and then turns out to be the point: with aiming automated, every mistake you make is a positioning mistake. You are steering into or out of incoming fire, choosing which cluster to commit to, and deciding whether that power-up is worth flying through a wall of tracers.',
      'The game runs in landscape and hands you an on-screen joystick, or arrow keys on a desktop, with tap-to-fire layered on top for when you want to override the auto-target. Enemy squadrons arrive in waves that repeat their patterns, so a run that ends badly the first time becomes readable by the third. Upgrades are collected mid-flight rather than purchased, which means your build is decided by which risks you took in the first two minutes.',
      'It is the most demanding game in our action section in terms of attention, and the least forgiving of a laggy connection, because the load is a continuous stream of enemies rather than a puzzle board that waits for you. Sessions are short by design — one sortie, one score, one retry.'
    ],
    systems: [
      { h: 'Auto-targeting changes what you practise', p: 'Since your weapons acquire targets themselves, damage output is roughly fixed and survival is variable. Improving at Ace Strike means learning how long you can stay inside a firing line, not how fast you can tap.' },
      { h: 'Power-ups are a routing decision', p: 'Upgrades drift into lanes you may or may not cross. Grabbing one usually means leaving the safe edge of the screen, so the real skill is judging whether the upgrade is worth the exposure the pickup demands.' },
      { h: 'Waves repeat, so memory is power', p: 'Enemy formations within a stage are fixed. After two or three attempts you know where the next crossfire arrives, and planning one wave ahead is what separates a long run from an early death.' }
    ],
    howTo: [
      'Pick up the joystick with your right thumb and keep your jet slightly below the vertical centre, which leaves room to retreat upward when a wave appears.',
      'Let auto-target do the aiming. Your attention belongs on the incoming fire, not on lining up shots.',
      'Tap to fire manually only when a single high-value target is isolated — otherwise you are wasting the moment you could spend moving.',
      'Clear the screen edges first. Enemies stream in from the top and sides, and a blocked edge is how a run ends.',
      'Take damage on a climb, not on a descent. Losing altitude into a wall of fire usually costs you the whole run.',
      'Bank power-ups you cannot safely reach and come back for them after the wave passes.'
    ],
    tips: [
      'Small movements beat big ones. Over-committing to one side of the screen is the most common cause of being caught flat-footed by the next formation.',
      'Study the spawn rhythm rather than the bullets. Once you know the interval, dodging becomes anticipatory and stops being reactive.',
      'If your run keeps ending at the same wave, stop trying to out-fly it — change which upgrade you take on the way in.',
      'Stay near your pickups. Flying far from a power-up you intend to grab doubles the exposure cost of getting it.',
      'Short sessions are more productive here than long ones; pattern memory forms fast and the frustration ceiling is low if you retry in bursts.'
    ],
    mistakes: [
      'Hugging the bottom of the screen. It feels safe and removes your only retreat direction.',
      'Chasing a power-up through a firing line — the upgrade is worth less than the health you spend getting it.',
      'Fighting at the spawn edge, where new enemies arrive inside your own hitbox.'
    ],
    device: 'Landscape is mandatory here: the battlefield is wide and the joystick needs thumb room, so rotate the phone and hold it with both hands. On a desktop, the arrow keys replace the joystick with no learning curve, and a mouse works if you prefer precise control over the tap-to-fire. Frame rate matters more than screen size, so if the action ever feels uneven, closing other tabs helps more than anything you can change in the game.',
    faq: [
      { q: 'Do I have to aim?', a: 'No. Weapons acquire targets automatically; manual fire exists as an override for isolated high-value targets.' },
      { q: 'Are upgrades permanent between runs?', a: 'They are collected within a sortie. Progression systems unlock over time, but a power-up you grabbed in a previous run does not carry into the next one.' },
      { q: 'Why does my jet die instantly in later waves?', a: 'Almost always crossfire from two directions. Screen-edge spawns overlap, and the fix is to engage formations before they close rather than weaving through them.' },
      { q: 'Does it work with a controller?', a: 'There is no gamepad binding; joystick or keyboard only.' },
      { q: 'Will a slow connection ruin a run?', a: 'It can. Waves stream in continuously, so a stall mid-sortie puts you in fire you could not see. The page reports its load state, so give it a second before you press play on a weak network.' }
    ]
  },

  smashblocks: {
    verdict: 'A break-out hybrid where the launcher angle is the whole game, plus a rank ladder to climb.',
    about: [
      'Smash Blocks asks you to aim a launcher, fire a stream of blocks into a packed wall, and clear the stage before your supply runs out. Chain reactions are the engine of it: a well-chosen angle that hits several adjacent weak points at once breaks far more than a direct hit, and the game scores you on that rather than on raw shots.',
      'The boards are dense and colourful, deliberately readable at a glance — each row of blocks has its own colour and durability, so the tactical layer is choosing which band to attack first. Later stages add geometry that shields parts of the wall, which turns each shot into a bounce problem: you are calculating at least one reflection before firing.',
      'There is a rank ladder attached to it as well, with rank badges shown on the results screen, so performance is tracked against tiers rather than only against the stage. It is the closest thing in our arcade section to a score-chase game, and the session length is whatever you have.'
    ],
    systems: [
      { h: 'Angles over force', p: 'Every block reflects the projectile, so a shallow angle walks sideways across a row and a steep one drills down one column. Shallow angles clear width; steep angles clear depth. Choosing between them is most of the decision.' },
      { h: 'Combos are the score', p: 'One shot that breaks a long chain multiplies what it destroyed. The stage can usually be cleared with fewer shots than you take if you line up chains first and fire second.' },
      { h: 'Rank badges', p: 'Results show rank progression, which rewards clearing stages with blocks left over rather than scraping through. A stage cleared with supply to spare moves you up; a lucky clear does not.' }
    ],
    howTo: [
      'Drag from the launcher to set the angle and release to fire. Drag further for a finer adjustment; the guide line follows your finger.',
      'Before firing, pick one row and commit to walking along it. Scattered single hits are what run your supply out.',
      'Use the side walls deliberately. A shot that looks awkward because it banked twice is often the cleanest path to a shielded band.',
      'Break the outer shell before aiming at the core, since blocks in front absorb everything you fire at what is behind them.',
      'When the wall has thinned, switch to steep angles to drill the remaining column rather than continuing to sweep.',
      'If you have shots to spare at the end, aim at the largest contiguous group instead of the leftovers — chain bonuses are where rank points come from.'
    ],
    tips: [
      'Fire at the junction between two colours rather than the middle of a group; boundaries tend to be structurally weaker and start longer chains.',
      'Bank off a corner. A single corner hit redistributes into both axes and can clear a band that would have taken three shots.',
      'Never fire without thinking about where the projectile ends up. Shots that leave your launcher crowded side are wasted even if they destroy something.',
      'Learn which blocks absorb rather than reflect. Some stage pieces eat the shot instead of bouncing it, and treating them as walls loses you the angle.',
      'Clearing a stage in fewer shots is worth more than clearing it safely; the rank ladder separates the two.'
    ],
    mistakes: [
      'Spraying at the densest area because it looks like it does the most damage — dense rows absorb, and the shot returns early.',
      'Ignoring the return path and stranding yourself with no good angle left.',
      'Rushing the last few blocks; they are usually shielded behind the geometry the earlier shots exposed.'
    ],
    device: 'Portrait, and the drag-to-aim gesture is the reason: the launcher sits at the bottom of a tall screen and your thumb has the full height to set an angle. On desktop, a click-drag with the mouse does the same job with slightly better precision. The board never scales down to unreadable, so a small phone is not a handicap.',
    faq: [
      { q: 'Is this Breakout?', a: 'Same family, different goal. You are throwing blocks at a wall to collapse it, not bouncing a ball to survive; the shot count is finite and each stage is a puzzle.' },
      { q: 'What determines my rank?', a: 'Efficiency. Clearing stages with shots and supply left over advances the rank ladder; barely scraping through holds it.' },
      { q: 'Can I undo a shot?', a: 'No. Once released the block stream commits, so aim before you release rather than relying on a retry.' },
      { q: 'Does it need fast reflexes?', a: 'No. Nothing moves on its own; the projectile is yours to place. It is a geometry game with an arcade coat.' },
      { q: 'Are ads shown between stages?', a: 'Page-level advertising runs through our consent prompt, and some bonus options are offered as optional rewarded videos you can decline.' }
    ]
  },

  bubblesafari: {
    verdict: 'Bubble shooter with a jungle coat and an unusually strong bias toward dropping hanging clusters.',
    about: [
      'Bubble Safari is the classic aim-and-pop loop: a curved launcher at the bottom of the screen shoots bubbles upward onto a descending field, three or more touching pop, and anything left without support falls. The jungle theme does more than decorate it — the field drifts down a little after every few shots, which puts a soft clock on a game that otherwise lets you think as long as you like.',
      'Scoring is dominated by drops rather than matches. Popping a small cluster is worth little; cutting a whole hanging section free is worth a lot, and the boards are drawn so that the biggest drop is nearly always available if you are patient enough to look for it instead of taking the easy match.',
      'Levels are rated with stars, and the rating survives a failed attempt, so a stage you clear sloppily can be revisited for the higher score. Coins are earned by playing and can be spent on the shop options the game offers; there is also a feedback screen if something about a stage is not working for you.'
    ],
    systems: [
      { h: 'Star ratings on every stage', p: 'Clearing is the pass mark, not the result. Each level grades you, and replaying a stage you already beat is a legitimate way to farm the coins the shop needs — the board layout is fixed, so a run you improve on is genuinely yours.' },
      { h: 'Coins from play, not from wallets', p: 'Currency is awarded on the results screen and can be converted through an optional rewarded video if you want a top-up. Nothing in the level ladder is gated behind a purchase.' },
      { h: 'The descending field', p: 'After a set number of shots the wall pushes down one row, narrowing the gaps you can shoot into. Boards feel open early and close in steadily, which is why the first five shots matter more than the last twenty.' }
    ],
    howTo: [
      'Drag from the launcher to aim; the guide line shows the first bounce so you can read the wall path before you commit.',
      'Release to fire. The bubble sticks where it lands, so a bad shot is not just wasted — it occupies a spot you may have needed.',
      'Look for the anchor first: which single bubble, if popped, disconnects the largest hanging section?',
      'Bank off the side walls deliberately to reach columns you cannot hit directly. Most boards are built around at least one wall shot.',
      'When a colour is scarce, shoot it into a cluster as filler rather than hunting for a match; you are buying board control until it reappears.',
      'Keep the ceiling path open near the middle. Once the field hangs low in the centre, your bank angles disappear and the shot count to solve the board triples.'
    ],
    tips: [
      'Three matches are for clearing; five-cluster cut-offs are for scoring. Prioritise the second whenever both are available.',
      'Empty the sides before the middle. Bubbles on the far edges are hard to reach once the field descends, and dropping them early keeps your angles open.',
      'Use the preview of the next bubble to plan two shots ahead, since a good bank shot is often the second one.',
      'Never fire a colour into the middle of a mixed pack unless you can pop it next turn — that bubble is now a lid you have to remove.',
      'If the field is getting low, stop optimising for points and play for survival; a stage failed for a high score earns nothing at all.'
    ],
    mistakes: [
      'Taking the obvious three-match when a cut-off worth five times as much is on the board.',
      'Filling the ceiling gap in the centre, which is the lane every future bank shot needs.',
      'Panicking once the wall descends; the board usually still has the same solution, it has just narrowed.'
    ],
    device: 'Portrait, thumb on the launcher, and the aim guide is generous enough to be readable on a small screen. On desktop the mouse replaces the drag with better precision for tight bank shots, which is where the keyboard-and-mouse setup actually beats a phone. Nothing in the game needs fast reaction, so a trackpad is fine.',
    faq: [
      { q: 'Do I lose stars if I replay a level?', a: 'No. The game keeps your best result, so replaying to improve a sloppy clear is safe.' },
      { q: 'Can I buy my way past hard levels?', a: 'Coins and shop items exist, but the ladder is designed to be completed by playing. A hard stage is a layout problem, and the same solution works whether or not you spend.' },
      { q: 'What makes a bubble fall?', a: 'Support. Any bubble that no longer has a connected path back to the ceiling drops, and that is the main scoring mechanic rather than a side effect.' },
      { q: 'Does the game need a connection during play?', a: 'Only to load. Once a level is on screen the physics and scoring run locally on your device.' },
      { q: 'Is it suitable for young children?', a: 'The mechanic is simple enough for a child who can aim, but Tapzens is a general-audience site with advertising, so an adult should decide.' }
    ]
  },

  spinscrewjam: {
    verdict: 'A nuts-and-bolts sorting puzzle where the difficulty comes from boards with almost no free slots.',
    about: [
      'Spin Screw Jam asks you to unscrew pins from wooden boards and park them in slots, then clear every board. Pick up a screw, tap an empty slot, and the piece moves — that is the entire control scheme. The puzzle is that the slot tray is small, so the order in which you remove screws matters more than the removal itself.',
      'Boards typically present several overlapping plates held by coloured screws, and a plate cannot come free until every screw holding it is out. Because slots fill as you work and only empty when a whole colour leaves the board, the game is really a queue-management problem: you need the last screws of one colour to arrive before the tray runs dry.',
      'The build carries up to eight hole positions per board, so layouts stack plates in genuinely awkward configurations, and there is a limited-attempt model behind it — when the runs are gone you wait or replay rather than churn. It is the most unforgiving sort puzzle on the site, and the most satisfying when a board finally falls apart in sequence.'
    ],
    systems: [
      { h: 'Slots are your only workspace', p: 'Each screw you lift occupies a slot until it can be matched away with others of its colour. The tray holds a handful, so three careless pickups can leave you with no legal move on a board that still looks half-solved.' },
      { h: 'Overlapping plates', p: 'A plate is freed only when all of its screws are out, and upper plates hide the screws of plates below. Solving means removing in an order that the layering dictates, not the order that looks easiest.' },
      { h: 'Limited attempts', p: 'You do not get unlimited retries on a stuck board. Once attempts are spent the level waits, which pushes you to study a layout before committing to it instead of burning through guesses.' }
    ],
    howTo: [
      'Tap a screw to pull it; it flies into the first free slot in the tray.',
      'When three screws of the same colour sit in the tray, they clear together automatically and free those slots.',
      'Before pulling anything, identify which colour is closest to three in the tray and find its remaining screws on the board.',
      'Prefer screws from plates that are nearly free. Finishing a plate exposes screws that were physically unreachable.',
      'Never pull a colour you cannot complete unless you are deliberately building a match for the next turn.',
      'Leave the top-right and bottom-left corners of a layout until last; those screws usually hold the final two plates together.'
    ],
    tips: [
      'Count down to three. If the tray holds two of a colour, that colour is a priority regardless of where it sits in the stack.',
      'Two free slots is the danger zone. Below that you need a completion this turn, so if none is available, the previous pickup was the mistake.',
      'Screws that only hold a decorative top plate are cheap openings — take them to expand your workspace before touching the load-bearing ones.',
      'Read colour distribution before you commit: a colour scattered across four different plates is a liability, and you want it out of the way early.',
      'On a fresh board, spend the first ten seconds doing nothing. Layouts with tight trays are almost always lost by an opening pickup made on instinct.'
    ],
    mistakes: [
      'Pulling the accessible screw rather than the useful one. Reachability is not the same as priority when plates overlap.',
      'Filling the tray with three different colours in three moves, which is how a half-empty board becomes unsolvable.',
      'Restarting immediately when you get stuck — the mistake is normally three pulls back, and replaying with that in mind beats random retrying.'
    ],
    device: 'Portrait, and the tap-lift-then-tap-slot transfer is one of the most comfortable thumb sequences on the site: the board is high, the tray is low, and your thumb travels vertically. On desktop, clicks replace taps exactly. Because there is no timing, a small screen costs you nothing beyond being able to distinguish screw colours — the pieces are large enough that it is not a problem.',
    faq: [
      { q: 'Why do slots fill up so quickly?', a: 'Because a screw only leaves the tray when its colour reaches three. Every pickup is a debt that only a completed colour set can repay, and that is the whole difficulty of the game.' },
      { q: 'Can a board become unsolvable?', a: 'Yes, which is what the attempt limit is for. If no legal move exists, replay the level; progress elsewhere is unaffected.' },
      { q: 'What do the different coloured screws mean?', a: 'They are the sorting categories. Colour is the only grouping rule — size and position do not matter for matching.' },
      { q: 'Are there multiple boards at once?', a: 'Layouts stack several plates with up to eight fixing positions, so most boards are a single interlocking puzzle rather than separate boards.' },
      { q: 'Is there a way to undo a bad pull?', a: 'There is no undo. Plan the sequence instead; the tray is small enough that a two-move lookahead prevents nearly every dead end.' }
    ]
  },

  puzzlehex: {
    verdict: 'A quiet tile-clearing puzzle where hex geometry removes most of the guesswork from matching.',
    about: [
      'Puzzle Hex presents a packed layout of hexagonal tiles and asks you to remove them all by picking groups that match. The hex grid is the whole design decision: because each tile touches six neighbours instead of four, a tile you can pick is far more likely to have its partner within reach, and boards resolve in a smoother, less stalled rhythm than the square-tile versions of the same idea.',
      'The important word in the rules is free. Only tiles that are not covered by another layer can be taken, so a layout is really a stack with a visible front edge, and each pick changes what is exposed underneath. Good play in Puzzle Hex is mostly choosing which of two available matches to take so that the tile you uncover next is one you already have a pair for.',
      'It is the most relaxed game in the catalogue — no timer, no descending pressure, no score chase. If you get genuinely stuck there is a hint control that surfaces a legal pick. Boards are self-contained, so a session can be one layout or twenty.'
    ],
    systems: [
      { h: 'Layered layouts', p: 'Tiles sit on top of one another and only the exposed ones can be picked. Clearing a top tile is as much about what it reveals as about what it removes.' },
      { h: 'Six-way matching', p: 'Hexagonal tiling means neighbours come in six directions, which gives every tile more candidate partners than a square grid and makes long dead stretches rarer.' },
      { h: 'Hints as a teaching tool', p: 'The hint control points at one legal pick rather than solving the layout. Used on boards you are stuck on, it shows the kind of exposure-planning the game expects from you.' }
    ],
    howTo: [
      'Tap a free hex tile to select it, then tap matching free tiles to complete the group; a set clears once it is whole.',
      'Scan for the rarest symbol first. A pair that is only two tiles deep in the stack becomes a blocker for everything around it.',
      'Prefer picks that uncover a tile you already have two of. The best move in Puzzle Hex is usually the one that sets up the next.',
      'Do not hoard tiles that have no partner yet — clear the groups that are complete now and trust the layout to surface the rest.',
      'When the board is half cleared, switch to protecting your pair count: a single unmatched tile in the stack costs far more in a thinning layout.',
      'Use the hint rather than churning when nothing is available; three taps of shuffling in a stuck layout is the main way time disappears here.'
    ],
    tips: [
      'Read the stack edges, not the face of the board. The tiles along the exposed border decide what is possible for the next several picks.',
      'If two picks look equal, take the one on the higher layer — it unseals more tiles underneath.',
      'Rarest symbols are the constraint. Early in a layout, clearing common ones is procrastination.',
      'A layout that looks crowded is usually easier than one that looks sparse, because depth gives you more legal options at once.',
      'Take your time on the last ten tiles. Almost every stuck endgame was created by a convenient pick made too early.'
    ],
    mistakes: [
      'Clearing the most obvious group repeatedly while a rare symbol stays buried under the pile you are ignoring.',
      'Selecting tiles by reflex and then finding the group cannot be finished, because the third copy is still covered.',
      'Treating a hint as a failure. In a puzzle with no timer, using it costs you nothing except the small satisfaction of finding the pick yourself.'
    ],
    device: 'Portrait, and the hex tiles are large enough that mis-taps are rare on a phone. Because the game has no clock, a smaller screen is not a disadvantage — you can inspect the layout as long as you want. On desktop it is a pure clicking game; there is no keyboard input and no drag gesture.',
    faq: [
      { q: 'What makes a tile unselectable?', a: 'Coverage. A tile with another tile resting on it cannot be picked until the one above is cleared, which is why layouts have a visible working edge.' },
      { q: 'Is there a time pressure?', a: 'No. Nothing descends and no clock is running. The only pressure is your own preference for finishing the board.' },
      { q: 'Can a layout end unsolvable?', a: 'It can end with a shape you cannot finish from the state you left it in. Restarting that layout is cheap — nothing else is affected.' },
      { q: 'Does the hint cost anything?', a: 'It is there for when you are stuck, and using it does not remove the board from your progress.' },
      { q: 'Why hexagons rather than squares?', a: 'Six neighbours instead of four means matching partners are almost always reachable, so the puzzle flows without the artificial dead stops square grids produce.' }
    ]
  },

  blockpuzzlesavegirl: {
    verdict: 'A sliding-block traffic puzzle with a rescue theme and an honest star rating for move efficiency.',
    about: [
      'Block Puzzle: Save Girl is a Rush-Hour-style logic puzzle: a grid packed with vehicles and blocks that only slide along their own axis, a girl boxed in somewhere in the layout, and an exit you have to clear a path to. Nothing is rotated and nothing is lifted; a piece moves back and forth in its lane or it does not move at all, and one blocked lane can make six other moves irrelevant.',
      'The rescue framing is not just decoration — it changes how you read the board. Instead of “free the red car”, you are looking for the shortest sequence of lane-clearing moves, and the stars you are graded on are tied directly to how few of them you use. A solution that works in fourteen moves is a two-star answer to a nine-move puzzle.',
      'Boards escalate the same way the genre always has, by adding pieces that must be shuffled twice before they get out of the way. What keeps it interesting is the “Help!” prompt from the girl: the board always shows what needs to be reachable, so you are never guessing the goal.'
    ],
    systems: [
      { h: 'One-axis movement', p: 'Every block slides only along its own row or column. Before moving anything, trace the lane it would occupy — half of apparent blockers are pieces that never needed to move at all.' },
      { h: 'Star ratings by move count', p: 'Clearing the board is the pass, the stars are the result. Each layout has a par, and replaying a stage for a better rating is a legitimate way to engage with a board you already solved.' },
      { h: 'The dependency chain', p: 'Puzzles of this type are solved backwards: the final lane must be clear, which means the pieces in it must have moved, which means the lanes they need must have been clear first. Working from the exit outward is faster than experimenting from the start.' }
    ],
    howTo: [
      'Do not touch a piece at first. Find the exit and trace the straight corridor that leads to the girl.',
      'List every block sitting in that corridor. Those are your actual tasks; everything else on the board is scenery until it is needed.',
      'For each blocker, ask where it can go and what stops it going there. That gives you a chain, and the chain is the solution.',
      'Execute the chain from the far end — clear the deepest blocker first — because moving a piece out of a lane you still need wastes two moves.',
      'Keep each lane reusable. A piece parked at one end of its own lane blocks that lane for the rest of the puzzle.',
      'Once solved, replay it looking for a shorter route. The second solution is almost always several moves cheaper.'
    ],
    tips: [
      'Count your moves before you make them. In a star-rated puzzle the difference between three stars and two is often a single redundant slide.',
      'The longest piece on a lane is the most dangerous one. It needs the most clear space, so deal with long pieces early while the board is still open.',
      'Two-piece shuttles are the usual trap: a short piece that has to move aside twice. Identify them before you start.',
      'Ignore the pieces that cannot reach the corridor at all. Board clutter is the main way these puzzles waste your attention.',
      'If you have made more than six moves without the corridor shortening, you are solving the wrong problem — restart and re-trace.'
    ],
    mistakes: [
      'Moving the obvious blocker out of the way in the wrong direction, then spending four moves undoing it.',
      'Solving the first board layout in your head and not re-checking after the fourth move; these puzzles change character as they open up.',
      'Chasing a clear without chasing a short clear. Getting the girl out is not the grade — the move count is.'
    ],
    device: 'Portrait, with drag-to-slide on the pieces themselves, which is the right gesture for a lane puzzle — you pull a block along its track and your finger stays on it. On desktop, click-drag does the same thing. There is no timing element and no small-target problem, so any screen size works.',
    faq: [
      { q: 'What do the stars actually measure?', a: 'Move efficiency against the layout’s par. Fewer moves means a better rating; finishing at all is the pass mark.' },
      { q: 'Can I rotate a block?', a: 'No. Orientation is fixed when the board starts, which is what turns each layout into a real logic problem rather than a packing exercise.' },
      { q: 'Is there a move limit?', a: 'No hard limit. You can wander a board as long as you like; the star rating is what responds to how efficiently you finish.' },
      { q: 'Why do I redo a puzzle I already beat?', a: 'For the rating. Layouts are fixed, so a cleaner solution is a real improvement rather than a luckier run.' },
      { q: 'Are the later boards harder or just bigger?', a: 'Both, but mostly more interdependent. Later layouts are won by a longer dependency chain, not by a larger board.' }
    ]
  },

  royalmatcher: {
    verdict: 'A conventional gem matcher that puts nearly all of its depth into booster combinations.',
    about: [
      'Royal Matcher is a gem-swapping match-3 with the full shape of the genre: a coloured grid, a swap of two adjacent gems, goals per stage and a move budget. What it adds is an unusually rich set of boosters with combinations between them, and a coin economy that lets you bank them from play rather than only from purchase.',
      'The booster layer is where the actual skill lives. A four-in-a-row produces a directional clear, a five produces a colour bomb, and matching two adjacent boosters against each other produces an effect larger than either alone. Late stages are cleared by setting those combinations up over several moves, not by finding one lucky swap.',
      'Presentation is the most formal of our puzzle section — regal palette, framed grids, grand objectives. Stages come in blocks that share a theme, and there is an in-game currency screen if a goal is genuinely out of reach; the ladder itself is playable without spending.'
    ],
    systems: [
      { h: 'Booster generation rules', p: 'Four in a line creates a striped gem that clears a row or column; five creates a colour bomb that removes a whole colour. Both are set off by swapping them like an ordinary match, so producing them is only half the value.' },
      { h: 'Combining boosters', p: 'Swapping two adjacent special gems against each other is the strongest move in the game — a striped-plus-striped crosses both axes, and a colour bomb plus a striped gem converts a whole colour into directional clears. Setup for a combo is worth several ordinary matches.' },
      { h: 'Coins and the shop', p: 'Coins accumulate from play and there is a purchase flow when you spend them on a shortage. A stage you cannot finish is normally a move-budget problem, and boosters bought in do not fix a bad opening plan.' }
    ],
    howTo: [
      'Read the goal before the board. Clearing a colour, dropping obstacles and collecting ingredients each want a different area of the grid.',
      'Swap to create a four-in-a-row wherever the goal needs the most damage, because that booster is aimed at a specific line.',
      'Work from the bottom of the grid upward. Low clears lift the whole column and generate cascades you get for free.',
      'Build toward a two-booster combination instead of spending each one as it appears.',
      'Avoid a five-match on an almost-empty board. The colour bomb is best while the target colour is still spread out.',
      'When moves run short, stop chasing the goal and chase the cascade — a single good drop can finish a stage that three planned swaps cannot.'
    ],
    tips: [
      'Aim a colour bomb at the colour you need, not the colour that is easiest to reach; that is where most wasted boosters come from.',
      'Obstacle stages reward horizontal thinking. A striped gem fired along the row that carries the blockers is worth more than two matches near them.',
      'Ingredient levels want the bottom rows. Anything cleared above the drop zone takes several moves to reach the exit.',
      'Save a move you do not need. Most failed stages end with one move left and no available match, which is a sequencing error twenty moves earlier.',
      'The rarest colour on the board is a promise, not a problem. A five-run in it is nearly always more valuable than clearing common colours.'
    ],
    mistakes: [
      'Using each booster the instant it appears, which throws away the combination mechanic entirely.',
      'Planning a five-match too late in a stage, when there are not enough moves left to benefit from it.',
      'Ignoring the move counter until the last three moves, at which point the goal is usually unreachable.'
    ],
    device: 'Portrait, and the board is sized for thumbs — most swaps land in the lower two-thirds, which is where the grid sits on a phone. Desktop play works with click-drags and is slightly faster for careful reading of the whole board, but the swap gesture is designed for touch first.',
    faq: [
      { q: 'Do boosters carry between levels?', a: 'Special gems you generate are for the current stage. Coins and unlocked progress persist, but a board does not start with the boosters from the last one.' },
      { q: 'Can I finish the game without spending?', a: 'The ladder is playable through effort and planning. The shop exists for stages you want to force, not as a gate.' },
      { q: 'Why did my five-in-a-row not create a colour bomb?', a: 'The line has to be formed by the swap itself rather than pre-existing, and some boards only permit certain shapes depending on the obstacles around them.' },
      { q: 'Is there a time limit?', a: 'No timer — stages are limited by moves, not seconds. Take as long as you need to find the best swap.' },
      { q: 'Which swap is usually best?', a: 'Whichever one creates a cascade while advancing the goal. A cascade is free progress; a direct match spends the move it consumes.' }
    ]
  },

  arrowmazesolve: {
    verdict: 'A draw-the-route puzzle: you build the path with arrow tiles, then watch a ball take it exactly as written.',
    about: [
      'Arrow Maze Solve splits into two phases and that split is the whole design. First you place and rotate arrow tiles on an empty grid to define a route; then you press Play and a ball runs that route with no further input. There is no steering during the run, which means the game is not testing reflexes at all — it is testing whether you thought through the path before you committed to it.',
      'The planning phase is genuinely logical. Arrows have four orientations, some cells are fixed, some are blocked and the grid has gaps the ball will happily fall through. A single wrong tile near the start invalidates everything you laid afterwards, so the boards reward reading the maze from both the goal and the entrance.',
      'Because the run is deterministic, solving means debugging. Failed attempts are not losses so much as a replay that shows you exactly which tile was wrong, and the built-in hint shows a segment of the route rather than the whole answer.'
    ],
    systems: [
      { h: 'Build phase and run phase', p: 'You cannot change arrows while the ball is moving. Once you press Play the layout is fixed, so treat the run as a test of a plan rather than as the game itself.' },
      { h: 'Rotation as the core verb', p: 'Tapping an arrow rotates it. Because orientation is the only variable per tile, most boards can be attacked by rotating one tile through four states and watching which one the ball needs.' },
      { h: 'Fall-off and dead ends', p: 'A route that leaves the grid or enters a walled pocket fails the run immediately, and the level restarts with your arrows in place — so the layout you built is not lost when the ball goes wrong.' }
    ],
    howTo: [
      'Start from the goal and work backwards. The last tile before the exit has only one orientation that can feed it, and that constraint narrows everything upstream.',
      'Place the forced tiles first — corners, cells beside walls and dead ends have one legal orientation each.',
      'Leave the open middle of the grid until last. Central cells usually have several valid orientations, so they are the flexible part of the route.',
      'Before pressing Play, trace the entire path with a finger. One missed rotation is the difference between a solved board and a restart.',
      'If the ball overshoots, look one tile before the failure point rather than at it — the direction was set by the previous cell.',
      'On a board with fixed arrows, treat them as walls. Their orientation is not a choice you have, and building around them is the puzzle.'
    ],
    tips: [
      'Solve the geometry before the route: find which cells must be used and which can never be part of a valid path.',
      'Use the minimum number of arrow tiles you can. Every extra tile in the run is another one that can be wrong.',
      'When a hint shows a segment, check the tile that feeds it rather than the segment itself; the error is usually one before the visible problem.',
      'Board layouts repeat their shapes across the later stages, so what you learn here transfers — these are pattern puzzles with a rolling ball attached.',
      'Take the second run slowly. The first run tells you where it breaks, and the fix is nearly always a single tap.'
    ],
    mistakes: [
      'Building a route that reaches the exit and then pressing Play without tracing it. Deterministic puzzles do not forgive this.',
      'Rotating tiles near the entrance when the failure was near the goal, because the start of a run is the part you see first.',
      'Forgetting that a blocked cell is not empty space — laying a path through it is the most common wasted attempt.'
    ],
    device: 'Landscape, because the maze is wide: you need horizontal room for a path that doubles back, and a portrait grid would force tiles down to an un-tappable size. Rotate the phone. On a tablet or desktop you get extra clarity when tracing a long route; there is no keyboard control and no timing to worry about.',
    faq: [
      { q: 'Can I change arrows while the ball is moving?', a: 'No. That is the point of the two-phase design: the build phase is where the thinking happens, and the run only checks it.' },
      { q: 'Does a failed run cost anything?', a: 'It restarts the ball with your arrows still placed, so you keep the work and get feedback about which tile was wrong.' },
      { q: 'Are there multiple valid routes?', a: 'Usually one intended route per board, though some layouts tolerate an equivalent path. Efficiency is graded, so fewer tiles tends to mean a better result.' },
      { q: 'What does the hint show?', a: 'A segment of the correct route rather than a completed board, which keeps the last part of the solve yours.' },
      { q: 'Is this a maze game or a logic game?', a: 'Logic. Maze games ask you to find a path; this asks you to construct one under constraints and verify it before committing.' }
    ]
  },

  wizardsort: {
    verdict: 'The same pour-puzzle engine as our water sort entry, retooled as potion brewing — here is what differs.',
    about: [
      'Wizard Sort is built on the same game engine as Puzzle: Water Sort, right down to the shared set of modes: the standard pour board, a conveyor variant, deeper vessels and a knot-unwinding side puzzle, plus a daily challenge board, a hint system and a collectibles screen. The rules are identical — pour only onto a matching colour or into an empty flask — so if you have played one you already know how to play the other.',
      'What actually changes is the texture of the boards. Potions are presented in flasks with a magical theme, the colour palette is richer and the later layouts lean harder on partially-filled vessels, which makes the lid problem (a colour you need buried under a colour you do not) the dominant pattern. The tone is also calmer: brewing instead of pouring, with no time-up pressure on the main boards.',
      'Because the two games share systems, progress in each is stored separately. Hearts, coins and gold are per-game, and neither one unlocks the other. If you like both, the honest advice is to play them as separate ladders rather than expecting one to carry over.'
    ],
    systems: [
      { h: 'Shared modes, separate boards', p: 'Conveyor, tall-vessel and knot side modes exist here exactly as they do in the water sort game, but the layouts are different boards, so the skills transfer while the solutions do not.' },
      { h: 'Hearts, hints and gold', p: 'Failed boards draw from a heart pool that refills over time; hints spend gold, and gold comes from clearing levels. The economy is the same one the water sort game uses, tracked independently.' },
      { h: 'Collectibles and the daily board', p: 'There is a collection screen for unlocked items and a single daily challenge layout that resets, which is where the sharpest boards in the game tend to appear.' }
    ],
    howTo: [
      'Tap a flask to lift its top layer, tap another to pour. Pouring is legal only onto the same colour or into empty glass.',
      'Open every board by finding colours that are almost assembled — one or two units from completion.',
      'Deliberately keep one flask fully empty. It is the only tool that lets you reorder, and boards stop being solvable the moment you fill it.',
      'Do not pour a colour you cannot finish onto a vessel you may want to complete later; that layer becomes a lid you have to remove twice.',
      'In the conveyor variant, plan for what is arriving rather than what is in front of you.',
      'Use a hint when you have looked for thirty seconds and found nothing, because a locked board looked lockable from two moves back.'
    ],
    tips: [
      'Sort by depth, not by colour. The layers at the bottom of each flask decide what is possible; count them before you commit.',
      'A half-full vessel of a colour you do not need yet is an asset, not a problem, as long as it still has room.',
      'If two flasks both hold the same colour near the top, merge them early. Combining partial stacks frees whole vessels for reuse.',
      'The daily board is designed for one clean solve, so it tends to have exactly one opening move that keeps everything else reachable.',
      'When you get stuck mid-pour, undo before you restart. These layouts have a small number of fatal moves and undo recovers the one you made.'
    ],
    mistakes: [
      'Filling the last empty flask because a single matching unit was waiting there.',
      'Assuming progress carries over from Puzzle: Water Sort. Same engine, separate saves and separate currencies.',
      'Chasing the visually tidiest option: a nearly-complete vessel is only useful if the colour beneath it is already sorted.'
    ],
    device: 'Portrait, tall vessels and readable layers on any phone size, and the tap-tap pour needs no precision. On desktop it is a pure mouse game with no keyboard scheme. Saves live in browser storage on the device you play on.',
    faq: [
      { q: 'Is Wizard Sort the same game as Puzzle: Water Sort?', a: 'Same engine, same rule set and the same extra modes — different boards, different theme and separate progression. Learning one means you already know the other.' },
      { q: 'Do I keep my coins and hearts between the two games?', a: 'No. Currency, hearts and completed levels are stored per game.' },
      { q: 'What is the knot puzzle?', a: 'A side mode that replaces liquid with overlapping rope. It exercises the same forward-planning skill, but a pour-instinct approach leads to dead ends.' },
      { q: 'Does the daily challenge reset?', a: 'Yes, one board per period. It is a single layout rather than part of the main ladder, and it does not carry over between days.' },
      { q: 'Can I play without spending real money?', a: 'The whole ladder is designed around earning gold from play. Purchases exist as a shortcut for hearts or hints, not as a wall.' }
    ]
  },

  groceryadventuremaster: {
    verdict: 'A shelf-organising sort puzzle — the rare casual game whose appeal is tidying rather than clearing.',
    about: [
      'Grocery Adventure: Master gives you a cluttered shelf and asks you to make it tidy: tap an item, tap the place it belongs, group matching goods together, and clear the aisle once a section is right. It sits in the same family as the screw and bottle sorters, but the goal is different — you are not solving a layout so much as resolving a mess, and the reward is the moment a shelf reads cleanly.',
      'The puzzle structure comes from limited space. Every store layout has fewer free positions than you would like, so moving one item blocks three others, and the order of operations matters. Later stores add more item types and narrower aisles rather than bigger boards, which raises the planning load without making the screen busy.',
      'Progression is by store rather than by level number: you unlock new shops as you finish the aisles in the current one, each with its own stock list and layout. That gives the game a gentle, episodic shape — a store is a satisfying unit to play, and most take a few minutes.'
    ],
    systems: [
      { h: 'Group-by-type clearing', p: 'Items clear once a section holds the matching goods together. Partial groupings are not neutral — they occupy positions that a finished group could have used.' },
      { h: 'Locked goals per aisle', p: 'Each aisle shows what has to be completed before it counts. Ignoring the stated goal and tidying what looks messy is the main way moves get spent on the wrong thing.' },
      { h: 'Store unlocking', p: 'Completing goals opens new stores with new layouts and item sets. The difficulty step between stores is usually the number of item types in play at once, not board size.' }
    ],
    howTo: [
      'Survey the whole shelf before moving anything and identify which item type appears most; that group will need the most space.',
      'Tap an item, then tap the destination slot to move it. Only one thing moves at a time, so a move that blocks itself is genuinely wasted.',
      'Clear the largest group first, even if a small one looks easier. Big groups are what free up working room.',
      'Keep one lane empty for as long as you can. It is your only temporary storage, and once everything is packed you have to undo.',
      'Work items that sit in the way of two other groups before items that are only in the way of one.',
      'When an aisle resists, re-read the goal rather than re-shuffling — the target is usually narrower than the tidy version you were aiming for.'
    ],
    tips: [
      'Treat free space as the resource and items as the obstacle. Almost every stuck shelf was caused by three moves that looked productive and removed the only gaps.',
      'Group in one direction. Building a type from left to right keeps your temporary storage on the same side and shortens every later trip.',
      'Rare items are placeholders. A single instance of a type sitting in a good spot is worth moving out of the way early.',
      'If you are two groups from finishing, stop optimising the whole shelf and finish what is close. Partial tidying scores nothing.',
      'New stores change what “most common” means; re-read the layout instead of reusing your previous aisle plan.'
    ],
    mistakes: [
      'Moving an item to a nicer-looking position rather than to a position that unblocks something.',
      'Filling the last empty slot because the item there looked like it belonged.',
      'Trying to finish an aisle completely when the goal only asked for one type — perfectionism spends moves.'
    ],
    device: 'Portrait, with tap-to-select and tap-to-place rather than dragging, which matters on a small screen where a drag can slip off a shelf edge. Items are drawn large and distinct enough to read on a phone without zooming. On desktop it is a two-click interaction with no keyboard shortcuts.',
    faq: [
      { q: 'Is this a matching game?', a: 'No — nothing is matched or cleared by alignment. You are relocating items into groups under a space constraint, which makes it a sorting puzzle with a tidying theme.' },
      { q: 'What happens if I make it unsolvable?', a: 'Restart the aisle. Your completed stores and unlocks are unaffected; only the current shelf resets.' },
      { q: 'Do the stores get bigger or harder?', a: 'Harder rather than bigger. Later layouts hold more item types in roughly the same space, which is what tightens the planning.' },
      { q: 'Is there a timer?', a: 'No. Aisles are constrained by moves and space, not by the clock, so you can plan as long as you want.' },
      { q: 'Does it save between devices?', a: 'No. Progress is stored in your browser on the device you play on, so switching phones starts the current aisle from its beginning.' }
    ]
  },

  zombiedown: {
    verdict: 'A portrait survival shooter with an upgrade economy, where wave order matters more than aim.',
    about: [
      'Zombie Down is a wave survival shooter held in portrait: you drag to aim and release to fire, zombies close in from the top of the screen, and the level ends when the horde reaches you or when you outlast it. Unlike the wide-screen shooters in our action section, the narrow vertical field means you are managing one axis of approach and one lane of retreat, which makes position discipline count for much more than precision.',
      'The economy is the real game. Coins drop from kills and are spent between waves on weapon upgrades, so every run is a series of choices about whether to buy now or bank for something better. A stage that seems too hard is usually a stage where the upgrade path was wrong rather than where your aim was.',
      'There is an objective layer on top of survival — the game tracks goals such as finishing a level once, and shows them separately from the wave counter — so clearing a stage and clearing it well are two different results.'
    ],
    systems: [
      { h: 'Drag-aim, release-fire', p: 'Aiming and firing are separate actions. Holding to line up a group and releasing into it beats tapping at whatever is closest, because a single shot that passes through two targets is worth the pause.' },
      { h: 'Coins and between-wave upgrades', p: 'Kills pay out in coins that are spent on firepower and utility upgrades. Buying early keeps you alive; buying late buys the stronger option. Runs are decided in that trade-off, not in the shooting.' },
      { h: 'Objectives beside the waves', p: 'Stage goals are tracked independently of survival, so a run that ends badly can still complete an objective and pay for it.' }
    ],
    howTo: [
      'Drag anywhere on the screen to swing the crosshair, release to fire. Get comfortable with the drag distance before the first wave.',
      'Kill the nearest cluster, not the toughest individual. A zombie that reaches you is worth more than three that are still walking.',
      'Buy an upgrade as soon as you can afford one in the first two waves; income compounds and a weak early weapon costs health you cannot buy back.',
      'Keep moving laterally. Standing still in a vertical shooter concentrates everything you are trying to spread out.',
      'Save the strong upgrade you are banking for a wave you know is coming rather than spending it the instant it unlocks.',
      'Learn the spawn rhythm rather than the individual enemies — once you know which wave surrounds you, you can start it on the side of the screen you want.'
    ],
    tips: [
      'Vertical space is health. The further a horde is from the bottom of the screen, the more shots you get at it; retreat is a weapon.',
      'Upgrade fire rate before damage in the early stages, because more shots forgives more bad positioning.',
      'Group kills come from the edges. Shooting into a cluster from the side passes through more targets than shooting the front of the pack.',
      'Do not bank coins to a number you will never spend. Unspent currency at the point you die is worth nothing.',
      'Watch the top corners. That is where the runs end, since they are the slowest part of the screen to reach when you need to.'
    ],
    mistakes: [
      'Tapping reflexively at the nearest single zombie instead of the group it belongs to.',
      'Saving for the perfect upgrade and dying before buying it.',
      'Standing still because the front of the screen looks clear — the back of the field is where the next threat already spawned.'
    ],
    device: 'Portrait on purpose: the field is tall and narrow, so the whole encounter fits one thumb’s reach and the drag-aim distance stays short. On a phone this is a one-handed game; on desktop a mouse controls the crosshair directly and is a little more precise, but the vertical field never widens to use the extra space.',
    faq: [
      { q: 'Do upgrades carry to the next level?', a: 'Progression unlocks persist, but the coins you banked inside a run do not survive a failed attempt.' },
      { q: 'What are the objectives for?', a: 'They are separate goals tracked alongside survival — finishing a level, or finishing it a particular way — and they pay out independently.' },
      { q: 'Is it a twin-stick shooter?', a: 'No. There is no movement stick; you aim and fire, and your position within the vertical field is managed through the same gesture.' },
      { q: 'Why do I die on the same wave every time?', a: 'Usually an upgrade timing problem rather than a skill problem. If you always fail at the same point, buy something earlier on the next attempt and see whether the wave breaks.' },
      { q: 'Does it have ads?', a: 'Page advertising on Tapzens runs through our consent prompt, and in-game bonuses may be offered as optional rewarded videos you can close.' }
    ]
  },

  tankera: {
    verdict: 'A landscape tank battle game where the upgrade screen between fights matters more than the fight itself.',
    about: [
      'Tank Era puts you in command of an armoured column on a wide landscape battlefield: steer with the on-screen controls, bring your guns to bear on enemy tanks, and take ground. Individual engagements are short and survivable; the game is structured as a sequence of battles with an upgrade screen in between, which is where the outcome is actually decided.',
      'There are two progress tracks running through it. Currency is earned by winning engagements, and armour and firepower are bought with it. Both are tracked on persistent screens — a leaderboard, a currency total, and a list of what you have already acquired — so a bad battle costs you the attempt rather than the run.',
      'As a military-arcade hybrid it asks for reading the battlefield rather than fast aiming. Enemy tanks approach along predictable lines, terrain channels them, and the players who advance are the ones who pick the engagement rather than the ones who react fastest to it.'
    ],
    systems: [
      { h: 'Between-battle upgrades', p: 'Armour and firepower are purchased with earned currency after each fight. Choosing which to upgrade first is the main strategic decision in the game — armour buys you survival, firepower buys you tempo.' },
      { h: 'Territory, not just kills', p: 'Objectives are about capturing the battlefield, which means moving forward under fire is often correct even when it costs health. A battle you win by hiding at the edge is usually a battle that goes worse on the next attempt.' },
      { h: 'Leaderboard and record screens', p: 'Performance is tracked against a rank list and your own acquired items, so the game distinguishes between what you have unlocked and how well you cleared a stage.' }
    ],
    howTo: [
      'Use the drive control to keep your hull angled toward the enemy rather than nose-on; a sloped front profile survives more incoming shots.',
      'Bring your guns to bear before you shoot. Strafe until the target is in your arc instead of firing down your own barrel line.',
      'Take the long-range duel. Your first shots should be fired from the furthest distance where you can still hit, because that distance is health.',
      'Spend currency on firepower through the early battles, then switch to armour once you start losing fights you should have won.',
      'Break line of sight between your shots. Fire, reverse behind cover, repeat; static trading is how a won battle turns into a lost one.',
      'On a hard stage, lose the first attempt deliberately to learn the enemy approach routes, then replay it with your guns pre-aimed.'
    ],
    tips: [
      'Focus fire. Two enemy tanks engaging one at a time are beatable; the same two engaging together usually are not, so kill the nearest and make the second re-approach.',
      'Keep moving laterally while reloading. A target that is tracking you wastes its shells; a stationary one does not.',
      'Upgrade the thing you ran out of. If you finished the battle with low health, you needed armour; if you took forever to kill anything, you needed firepower.',
      'Terrain is a reload timer. Using cover buys the seconds a slow-firing upgrade needs to pay for itself.',
      'Do not bank currency for the big purchase at the back of the shop. Two modest upgrades you can use now outperform one you die before affording.'
    ],
    mistakes: [
      'Rushing into contact to feel aggressive, which throws away the range advantage your first shots had.',
      'Buying the flashiest upgrade instead of the one that fixes the specific way you just lost.',
      'Fighting with your hull presented nose-on, which is the profile that absorbs the most shots.'
    ],
    device: 'Landscape, and it needs it: the battlefield is wide and the drive and gun controls sit on opposite thumbs. Hold the phone in both hands and use the left for movement, the right for aiming and firing. On desktop the mouse handles the guns, and there is no reason to prefer it — the on-screen control layout is designed around touch.',
    faq: [
      { q: 'Is this a real-time strategy game?', a: 'No. You command one tank at a time in short engagements with an upgrade layer between them; there is no base building and no unit management during a battle.' },
      { q: 'Do I lose progress when a battle goes badly?', a: 'You lose the engagement and can retry. Currency already earned and upgrades already bought stay with you.' },
      { q: 'Which should I upgrade first, armour or firepower?', a: 'Firepower early, because faster kills preserve health you cannot buy back; switch to armour once stages start outlasting your damage.' },
      { q: 'Is there a leaderboard?', a: 'Yes, performance is ranked against other results, and there is a record of what you have acquired — separate from the rank list.' },
      { q: 'Does it require a strong connection?', a: 'The battle itself runs locally; you only need the network to load the game and the assets for the stage you are entering.' }
    ]
  },

  shiftdashreac: {
    verdict: 'A pure reflex lane-dodger. There is no strategy here beyond reading the pattern one gap earlier.',
    about: [
      'Shift Dash Reac is the fastest game in our catalogue and the simplest to describe: obstacles arrive down a set of lanes, you tap or swipe to shift between them, and the pace rises until you make the mistake. There are no power-ups to manage, no currency to spend and no upgrade path — score is the entire game.',
      'The lane-shift verb is why it feels good. Because the only action is lateral, the game reads as a pattern problem rather than a dexterity problem, and the pattern is telegraphed: each approach has a visible gap, and your job is to be in it one beat before it arrives. Players improve by learning to read two obstacles ahead, not by moving faster.',
      'The rising speed curve does the rest. A run starts comfortable and becomes unplayable, which means every attempt ends at a point you can identify — and that identifiability is what makes a fifteen-second game worth retrying.'
    ],
    systems: [
      { h: 'Speed as the difficulty curve', p: 'Nothing about obstacle variety increases; the interval shrinks. Your reaction budget per obstacle falls from comfortable to about a quarter of a second, so a long run is a record of how early you started reading ahead.' },
      { h: 'Perfect dashes and streaks', p: 'Clean shifts through a gap in rhythm build a streak that multiplies score. A survivable but sloppy run scores below a tighter one, which is what separates a good score from a long run.' },
      { h: 'Lane commitment', p: 'Shifting costs the same whether you move one lane or several, so the correct play is often to move early and far rather than to edge over one lane at a time.' }
    ],
    howTo: [
      'Tap the side of the screen, or swipe, to shift one lane. Find which input feels crisper before chasing score.',
      'Watch the gap between obstacles rather than the obstacles themselves; the gap is where you are going.',
      'Position one lane before the threat, not on it. Being early in lane two beats being correct at the last instant.',
      'Never cross into an occupied lane to escape — commit to the lane you can hold for two beats.',
      'At high speed, stop making extra shifts. Every unnecessary lane change is a chance to be wrong.',
      'After a death, name the lane you should have been in two obstacles earlier. That is the only feedback that improves a run.'
    ],
    tips: [
      'Fix your eyes a third of the way up the screen, not on your own vehicle. Watching the top is what buys the reaction time.',
      'Learn the recurring approach sequences. The obstacle set repeats shapes, and once you recognise a shape you stop reacting to it.',
      'Play the first thirty seconds slowly and deliberately. Early mistakes compound because they put you in the wrong lane before the speed arrives.',
      'A short, clean run scores better than a longer, ragged one, so value tidy shifts over survival at any cost.',
      'Physical comfort matters more than you would think: a phone on a table with two thumbs outperforms one held in the air.'
    ],
    mistakes: [
      'Steering reactively at the last moment, which is the only way to be caught by the next obstacle.',
      'Panic-shifting multiple lanes when one was enough, arriving in the wrong place with confidence.',
      'Playing tired. Reaction games are the most sensitive genre on this site to fatigue, and a run after a long break is worse than the one before it.'
    ],
    device: 'Landscape, because the lanes run horizontally across a wide field and the game needs room to telegraph an approach. On a phone in landscape, both thumbs have a lane-width of travel each, which is why it plays better with two hands than held in one. On desktop the arrow keys or clicks do the same job, with a slightly sharper input than a trackpad.',
    faq: [
      { q: 'Is there any way to get better equipment or unlocks?', a: 'No. There is nothing to buy or upgrade — score and streak are the whole progression.' },
      { q: 'Tap or swipe — which is better?', a: 'Tapping is faster for single-lane shifts and swiping is more reliable for deliberate multi-lane moves. Pick one and stop switching mid-run.' },
      { q: 'Why does it become impossible around the same point?', a: 'Because speed, not obstacle variety, is the difficulty. That point is where your reading-ahead stops covering two obstacles and becomes pure reaction.' },
      { q: 'Does lag affect it?', a: 'Only during loading. Once a run is going, everything is local, so a slow connection will not steal a run from you.' },
      { q: 'Is there an offline mode?', a: 'The game needs the page loaded, so plan on needing a connection to start it. Nothing about the run itself talks to a server.' }
    ]
  },

  satisfyingstack: {
    verdict: 'A stack-sorting puzzle with the cleanest feedback in the genre — and a habitable difficulty curve.',
    about: [
      'Satisfying Stack gives you a board of cluttered item stacks and asks you to consolidate them: tap a stack, tap another, and the top items move across. Group like with like until every stack holds one thing and the board is tidy. It belongs to the same sorting family as the screw and shelf puzzles on this site, but with fewer pieces on screen and more visible state, which makes it the easiest of them to read.',
      'What it does better than most is feedback. Every transfer animates cleanly, every completed stack resolves with a snappy clear, and the board visibly simplifies as you work. That is the entire appeal — the game is short on systems and long on the feeling of a mess becoming order.',
      'The constraint is capacity. Stacks hold a limited number of items, so the puzzle is not “can I group these” but “can I free a stack in time to receive the next group”. Levels state a goal and unlock the next as you complete it, and there are occasional bonus offers if you want a hand.'
    ],
    systems: [
      { h: 'Capacity is the real limit', p: 'A stack that is nearly full can still receive nothing, and a single item sitting on top of a completed colour turns a finished stack back into a working one. Watch capacity, not just colour.' },
      { h: 'One-goal-per-level structure', p: 'Each layout names what has to be grouped. Solving more of the board than the goal asks for is not a better result — it is just more moves.' },
      { h: 'Bonus offers instead of a shop', p: 'There are optional rewarded bonuses on a stuck board rather than a store to grind. Taking one changes the layout, not your progression.' }
    ],
    howTo: [
      'Do nothing for the first few seconds. Count how many distinct item types are on the board and how much free capacity exists.',
      'Tap a source stack, then a destination; the top items move in order, so a stack that looks tidy may deliver items in the wrong sequence.',
      'Consolidate toward the type with the fewest scattered copies first. Those are the stacks that will end up with nowhere to go.',
      'Empty a whole stack as early as you can. An empty stack is a workspace, and every board becomes solvable the moment you have one.',
      'Avoid splitting a completed group to reach something underneath unless you can restore it in one move.',
      'When the board stops simplifying, undo. Two moves of tidying that leave the same number of partial stacks means you have already gone wrong.'
    ],
    tips: [
      'Chase stack count, not tidiness. The number of partially-filled stacks is the real measure of progress on this kind of board.',
      'Leave one stack deliberately untouched as a buffer. Filling every available space is how an almost-solved board locks.',
      'Move the item that is in the way of two groups before the one in the way of one, even if the second looks like a quicker clear.',
      'Read what a stack will deliver before you tip it. Items transfer in order, and a stack that empties onto the wrong host can create two problems.',
      'Short, decisive sessions work better here than long ones; the genre punishes the point at which you stop checking capacity and start tidying by instinct.'
    ],
    mistakes: [
      'Completing a decorative stack early that later has to be broken again to reach what is under it.',
      'Moving single items across the board to make things look grouped, spending moves without reducing stack count.',
      'Ignoring the stated goal and solving the whole board instead, which is the same puzzle with more steps.'
    ],
    device: 'Portrait, with the board in the upper half and the stacks close enough apart that taps do not mis-fire on a small screen. There is no drag and no timing, so it works equally well on a phone held one-handed or on a desktop with a mouse. Layouts scale rather than shrink, so a small device is not a handicap.',
    faq: [
      { q: 'Is this the same as the shelf-organising game?', a: 'Same family, different verb. Grocery Adventure moves items into places; Satisfying Stack consolidates stacks into groups, and its constraint is stack capacity rather than shelf space.' },
      { q: 'Can a board get stuck?', a: 'Yes, and the escape is the undo or a restart rather than more shuffling. A stuck layout usually became stuck one transfer earlier.',
        },
      { q: 'Do I need to do anything to keep the board easy?', a: 'Play the goal rather than the tidiness. Levels that are solved for the stated objective are consistently shorter than levels solved “properly”.' },
      { q: 'Are the bonuses required?', a: 'No. They exist for boards you want out of, and the ladder is designed to be cleared by play.' },
      { q: 'Does my progress carry between devices?', a: 'No. State is stored locally in your browser, so a different phone or a cleared profile starts at your first unfinished level.' }
    ]
  }

};

/*
 * Per-category landing copy. Written from the guide entries above, so each category page
 * describes the titles actually filed under it instead of running a shared template with
 * the category name substituted in. Orientation counts and engine relationships here are
 * taken from games.json and from the shipped bundles, not from genre assumptions.
 */
export const CAT_COPY = {
  puzzle: {
    lead: 'Twelve puzzle games across three unrelated mechanics: sorting, matching and route planning. They share a label only, so it is worth reading which family a game belongs to before picking one.',
    body: [
      'The sorting group is the largest. Puzzle: Water Sort and Wizard Sort run on the same pour engine - one framed as liquids in tubes, the other as potion brewing - and both carry a daily challenge and an earned-reward continue system on top of the main level run. Spin Screw Jam and Satisfying Stack sort against geometry rather than colour: remove, reseat and stack so that like items end up together, with the board itself as the constraint. Grocery Adventure: Master is the odd one out, because its appeal is tidying a shelf rather than clearing a board.',
      'The matching group is four games that look interchangeable and are not. Puzzle Yarn Fun is a calm swap-and-match with no timer, where long chains matter more than speed. Royal Matcher is a conventional gem grid whose depth sits almost entirely in booster combinations. Bubble Safari is a bubble shooter that pays far better for dropping a whole hanging cluster than for clearing three at a time. Puzzle Hex uses a hexagonal grid, which removes most of the square-grid ambiguity about what counts as adjacent.',
      'The planning group is where the genre gets closest to programming. Chroma Jam routes coloured blocks into lanes that accept a single colour each. Arrow Maze Solve makes you build the path out of arrow tiles and then commit to it - the ball follows exactly what you wrote, so there is no correcting halfway through. Block Puzzle: Save Girl is a sliding-block traffic puzzle that scores move efficiency, which makes it the one here worth replaying for a better result rather than just a win.',
      'Eleven of the twelve are designed portrait and work one-handed on a phone. Arrow Maze Solve is the exception and wants landscape.'
    ],
    faq: [
      { q: 'Which of these is closest to a classic match-3?', a: 'Puzzle Yarn Fun and Royal Matcher, both built on swapping two adjacent pieces. Yarn Fun rewards chain length and Royal Matcher rewards booster combinations. Bubble Safari is a match-3 in spirit, but you shoot rather than swap, which changes the pace entirely.' },
      { q: 'What is the difference between Puzzle: Water Sort and Wizard Sort?', a: 'They share the same pour engine. Wizard Sort reframes the tubes as potion ingredients and brings its own level set and presentation, but the underlying rule - a container only ever holds one colour - is identical. If you have played one, the other is familiar within a minute.' },
      { q: 'Which puzzle game here has the most content?', a: 'Puzzle: Water Sort ships the most modes rather than the most levels: a daily challenge and several alternate pour layouts sit alongside the main run. Chroma Jam has by far the largest level bundle in the catalogue.' },
      { q: 'Do any of these need fast reflexes?', a: 'No. Every title in this category is turn-based or pauses cleanly, and the pressure is usually a move budget rather than a clock. Arrow Maze Solve animates after you build, but you can take as long as you like building.' },
      { q: 'Is anything here paywalled?', a: 'No. All twelve load free in the browser. Several offer an optional rewarded-video bonus - a hint, a second chance, a coin multiplier - which you can decline and keep playing without penalty.' }
    ]
  },
  action: {
    lead: 'Four action games split by where their difficulty actually lives: three build power between fights, one builds it under fire.',
    body: [
      'Hunter: Evolve Uprising and Tank Era spend most of their depth outside the battle. Each has an upgrade and selection screen between rounds, and it is that screen which decides the next fight - unit composition in one, loadout order in the other. If you prefer preparing to reacting, start with either of these and expect the first few rounds to feel deliberately weak.',
      'Ace Strike is a dogfight where the game aims for you. That one decision removes the aiming skill entirely, so the whole learning curve is movement discipline. It is the most mechanical of the four and the easiest to pick up cold.',
      'Zombie Down is the portrait entry and the only one here you can play one-handed. It is a wave survival shooter with an upgrade economy, and the order in which you take the waves matters more than your precision.',
      'Three of the four are landscape and are uncomfortable to hold one-handed for long. That is a design decision in the games, not a limitation of the site - we publish each title in the orientation it was built for.'
    ],
    faq: [
      { q: 'Which action game can I play one-handed?', a: 'Zombie Down - it is the only portrait title in the category. The other three are landscape and want both thumbs.' },
      { q: 'Do I have to grind before these get good?', a: 'Hunter: Evolve Uprising and Tank Era are structured around an upgrade screen between fights, so early rounds are intentionally weaker. If you want to be challenged from the first minute, start with Ace Strike or Zombie Down instead.' },
      { q: 'Is there aiming to learn?', a: 'Not in Ace Strike, which assists your shots and leaves positioning as the only skill. Zombie Down gives you direct control, but its upgrade economy still matters more than precision.' },
      { q: 'Do these cost anything to continue?', a: 'No. When a run ends you either watch a rewarded video, spend currency the game pays out during play, or restart. There is nothing to purchase and no account to create.' }
    ]
  },
  arcade: {
    lead: 'Two arcade games, because two is how many fit the label honestly. They cover the two shapes the word describes: a score attack and a pure reflex run.',
    body: [
      'Smash Blocks starts from break-out and then changes the question. The interesting decision is the launcher angle - where you send the ball, not what happens when it lands - which puts it closer to a billiards game than a brick breaker. It carries a rank ladder, so there is something to climb.',
      'Shift Dash Reac asks nothing else of you. There is no economy to grow into and no strategy beyond reading the next gap earlier than the game expects. It is landscape, which is the right call for a game that is entirely lateral movement.',
      'Because this category is only two titles deep, the tags below are more useful than the grid: reaction, speed and block point at games in the puzzle and action categories that scratch the same itch.'
    ],
    faq: [
      { q: 'Why are there only two arcade games?', a: 'Because two is what we have published that fits. The label overlaps heavily with genres already covered by the puzzle and action categories, and a padded list helps nobody find a game. The tag pages below are a better way in for now.' },
      { q: 'Which of the two is harder?', a: 'Shift Dash Reac, clearly. It has no progression to fall back on - the only way to improve is to read the pattern one gap earlier. Smash Blocks gives you a rank ladder, so its difficulty is something you work up to.' },
      { q: 'Is Smash Blocks just a Breakout clone?', a: 'It borrows the brick grid, then moves the skill. In a breakout game the ball angle is an outcome you react to; here the launch angle is the decision you are making, and the rank ladder rewards choosing it well.' },
      { q: 'Do games in other categories feel arcade-like?', a: 'Yes. Bubble Safari, Satisfying Stack and Block Puzzle: Save Girl all play fast enough to serve the same purpose, and are filed under puzzle because their core loop is a board rather than a run.' }
    ]
  }
};
