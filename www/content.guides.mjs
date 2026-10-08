/*
 * Build-time editorial layer for game detail pages.
 *
 * The rule for this file: every factual claim about how a game works has to trace to a
 * frame we actually captured from the shipped build with shoot.mjs. That means on-screen
 * tutorial lines, button labels, HUD counters and item names, quoted the way they render.
 * Where a frame shows a control but not its consequence, the copy says so instead of
 * guessing. Nothing here is derived from the marketing description in games.json — several
 * of those turned out to be wrong, which is the whole reason this file was rewritten.
 *
 * `shots` is the caption list for the captured frames, in frame order. The guide cites
 * frames by those numbers.
 *
 * Rendered by build.mjs; never fetched at runtime.
 */
export const GUIDES = {

  puzzleyarnfun: {
    verdict: 'A colour-ordering puzzle played on a board of yarn-wound posts, with a knit-textured guide grid that starts at 0% — not the match-3 its catalogue blurb claims, and there is no cat anywhere on screen.',
    about: [
      'The first thing the game tells you is not about matching. A speech bubble points up at the row of spools and reads "First check order colors" (frame 1), and that is the correct framing for the whole puzzle: you are handing yarn back in a required order, not hunting for lines of three. Under the bubble the board is a cluster of overlapping coloured plates — magenta, sand-yellow and purple — each carrying short posts wound with maroon, green, red or grey-blue yarn (frame 2).',
      'Above the board sits a panel titled "Newbie Guide": a large grid of knit stitches, empty in both frames, with a thin orange gauge beside it reading "0%" (frames 1–2). That grid is where progress is recorded. Neither frame shows a score, a move counter or a clock, which is why the game plays slowly and patiently — the percentage is the only thing on screen that reports how you are doing.',
      'Four spool lanes run under the guide panel. Two are loaded, one dark red and one green, and two are greyed out with a padlock, a video badge and the word "Unlock" (frames 1–2). Below them is an empty white rail split into five short sections — the only other container on the screen, and nothing is on it in either frame. Along the bottom edge are three tools, each carrying a green "Free" badge: "+ Grid" (a rack icon), "Clear" (a broom) and "Hammer" (frame 2). Settings and Favorites sit top-left, so the entire game is reachable with one thumb in portrait.'
    ],
    systems: [
      { h: 'The lanes set the order', p: 'The tutorial points at the spool lanes, not at the board, and says to check colour order first (frame 1). Read that as the rule of the puzzle: the lanes show which colour the game wants next. Two lanes are open at the start and two sit behind "Unlock", so the number of colours in play grows as you go rather than being there from the first tap.' },
      { h: 'What the purple disc is', p: 'A large translucent purple circle, outlined in white, covers the middle of the board and four or five posts sit inside it (frame 2). No frame says what the circle means — it is either a highlighted region the tutorial wants you to look at or a working area, and we are not going to guess which. What is visible is that posts inside it are the same objects as posts outside it.' },
      { h: 'Three tools, all badged Free, and no wallet', p: '"+ Grid", "Clear" and "Hammer" each carry a green "Free" badge (frame 2), and no coin balance appears anywhere on either frame. "+ Grid" and "Clear" name their targets plainly enough — the grid panel above, and the board — while what a Hammer press removes is not visible in any frame we took, so treat it as a single-post undo rather than a promise.' }
    ],
    howTo: [
      'Read the two open spool lanes before touching anything. The game\'s own first lesson is "First check order colors" (frame 1).',
      'Tap a yarn post on the board. Which container receives it is not labelled on screen, so treat the first few taps as the tutorial: one post, then watch what changes.',
      'Work the lane colours in the order they appear, and ignore the lanes marked "Unlock" until they open.',
      'Keep track of how many posts of each colour are still on the board — with only two lanes open, a colour you cannot hand over is the one that has to wait.',
      'Watch the "0%" gauge beside the Newbie Guide rather than how tidy the board looks; the gauge is the only progress the screen reports.',
      'Save Hammer for a single post that is blocking a colour the lanes are asking for, and Clear for a board that has genuinely run out of moves. Both are badged "Free", so neither costs anything you can see.'
    ],
    tips: [
      'The lane order is the whole game. Before tapping, name the colour the leftmost open lane wants and find the nearest post carrying it.',
      'There is no timer and no move counter on either captured frame, so a stalled board costs nothing but the look. Take it.',
      'Because the tools are badged "Free" and no wallet is visible, reaching for one early is cheap — but "+ Grid" affects the panel above, not the board, so it will not unstick a bad lane.',
      'Two lanes are locked at the start. Boards that only ever ask for two colours are teaching the habit; the third and fourth are what make later layouts hard.',
      'If the same colour keeps appearing on opposite sides of the plate cluster, clear the side that has more of it — posts on the same plate tend to open together.'
    ],
    mistakes: [
      'Expecting a match-3. There is no swap gesture and no line of three anywhere in the captured frames; the ordering instruction is the entire game, and the catalogue blurb about cats and combos does not describe this build.',
      'Ignoring the two "Unlock" lanes and assuming the board is broken because a colour has nowhere to go — that colour is waiting for a lane you have not opened yet.',
      'Skipping the tutorial bubble. It is one line and it is the rule.'
    ],
    device: 'Portrait, and built for one hand: Settings and Favorites top-left, the guide panel across the top third, the lanes and rail in the middle, the board below them and the three tools along the bottom edge. Nothing on either captured frame shows a keyboard control, so on desktop everything is a click where it is a tap on a phone.',
    faq: [
      { q: 'Is Puzzle Yarn Fun a match-3 game?', a: 'No. The captured frames show a colour-ordering board with a one-line tutorial about checking colour order, a knit-stitch guide grid sitting at 0% and four spool lanes. There is no swap mechanic and no three-in-a-row anywhere on screen, and no cat character appears either.' },
      { q: 'What do + Grid, Clear and Hammer do?', a: 'They are the three tools along the bottom of frame 2, each badged "Free". The names point at the grid panel and at the board. What a Hammer press specifically removes is not shown in the frames we captured, so we are not going to invent it.' },
      { q: 'Why do two spool lanes say Unlock?', a: 'Only two lanes are loaded in the first board. The other two are greyed with a padlock and a video badge in both frames, so the puzzle adds colours as you progress instead of starting with all four.' },
      { q: 'Is there a time limit?', a: 'Nothing on the captured frames counts down. The only gauges are the "0%" bar beside the Newbie Guide and the board itself, so you can leave a board alone while you think.' },
      { q: 'Does it need an account?', a: 'No. There is no sign-up anywhere on Tapzens. Progress is stored by the game in your own browser, which is also why clearing site data or switching devices starts over.' }
    ],
    shots: [
      'The first lesson, with the whole screen dimmed behind it: the Newbie Guide grid at 0%, one dark red and one green spool lane loaded, two showing "Unlock", and the bubble "First check order colors".',
      'The same board in full colour: the plate cluster with its maroon, green, red and grey-blue posts, the purple disc outlined over the middle, the empty five-section rail under the lanes, and the tools "+ Grid", "Clear" and "Hammer" each badged "Free".'
    ]
  },

  chromajam: {
    verdict: 'A timed colour-clearing puzzle: tap blocks off a tray and send each colour to its own side rack, with five minutes on the clock.',
    about: [
      'The game explains itself in a caption bar: "Tap to select colored blocks to remove" (frame 3). That is the whole verb. The tray in the middle is a grid of studs-topped bricks — a purple 2×2 stacked over an orange 2×2 in the first board — sitting in a dark frame, and the task is to get them off it (frames 1–3).',
      'What makes it more than a tap-fest are the two racks on the sides of the tray: a purple strip down the left edge with a small left arrow, and an orange strip down the right with a right arrow (all frames). They match the two brick colours exactly, and the tutorial hand walks from a block to its same-coloured strip, so they read as destinations — though no frame shows a rack filling up or rejecting a colour.',
      'The top bar is a green HUD with a pause button, a character silhouette over "0%", a "Countdown" pill reading 05:00, and "Level 1" at the right (all frames). Below the tray, three tools each show a count badge of 1: Hammer, Magic Ball and +Time (frames 1–2). It is the only game in our puzzle set with a hard clock on the first board.'
    ],
    systems: [
      { h: 'A five-minute countdown from the first tap', p: 'The "Countdown" pill shows 05:00 on every frame we captured, including the tutorial frame (frames 1–3). Levels here are bounded by time rather than by a move allowance, which changes the feel completely: reading the board is worth less than deciding quickly, and the "+Time" tool exists precisely because the clock is the thing that ends runs.' },
      { h: 'Side racks match the block colours', p: 'The purple strip on the left and the orange strip on the right line up with the two brick colours on the tray (frames 1–2). The tutorial hand taps a purple block and then moves to the purple strip, which is the game demonstrating the pairing. Which colour you can act on is therefore tied to a side, not to whatever looks satisfying — how much room each side holds is not shown on any frame.' },
      { h: 'Three tools, one charge each', p: 'Hammer, Magic Ball and +Time each carry a badge reading 1 at the start (frames 1–2). They are limited stock rather than a menu — and +Time is the only one that addresses the countdown directly.' }
    ],
    howTo: [
      'Start by reading the two side racks and the colours on the tray, since the racks name the colours in play (frames 1–2).',
      'Tap a block to select it, as the caption instructs: "Tap to select colored blocks to remove" (frame 3).',
      'Work the purple block first on the opening board: it sits directly above the orange one, so it is the one the tutorial hand points at (frame 1).',
      'Keep an eye on the 05:00 countdown while you plan; a perfect read that arrives after the clock is a loss.',
      'Spend +Time before the last thirty seconds rather than after, since it is worth nothing once the countdown has already run out.',
      'Use Hammer on a single block that is wedged under something you cannot yet clear, and keep Magic Ball for when the tray has more colours than the racks can take.'
    ],
    tips: [
      'The "0%" beside the character silhouette is the only progress readout on screen. It is a percentage of the level, and it is at zero on every frame we captured.', 
      'Rack space is the constraint to watch. No frame shows a rack full, so the first thing to learn is how much each side takes before it refuses more.',
      'You begin with one charge of each tool. Using all three on the first board means having nothing for the boards that actually need them.',
      'Because the clock starts immediately, tapping around the interface to look for a "ready" button just burns the 05:00.',
      'Level 1 is two blocks. Later trays stack more colours, and the arrows on the racks are the only on-screen hint of which side is taking what.'
    ],
    mistakes: [
      'Assuming it is a relaxed sort puzzle. It is the one game in this category with a countdown running on the very first board.',
      'Selecting a block whose colour has nowhere left to go — the tap does nothing useful and the clock does not stop.',
      'Treating the tools as unlimited. Each badge says 1.'
    ],
    device: 'Portrait, with the tray in the upper-middle and the three tools along the bottom edge — thumb reach is fine on a phone. The HUD bar is tall, so on a small screen the tray itself is narrower than it looks in these captures. Keyboard is not used on any captured frame; pause is a button, not a key.',
    faq: [
      { q: 'Is Chroma Jam a match-3?', a: 'No. The in-game caption says "Tap to select colored blocks to remove" (frame 3) — blocks are removed by colour and sent to the matching side rack, not by lining three up.' },
      { q: 'Is there a time limit?', a: 'Yes, and it is on screen from the first frame: the "Countdown" pill reads 05:00. The "+Time" tool is there to extend it.' },
      { q: 'What are Hammer, Magic Ball and +Time?', a: 'The three tools under the tray, each starting with a single charge. +Time adds to the countdown; the other two clear blocks. Their exact reach is not demonstrated in the frames we captured.' },
      { q: 'What do the purple and orange strips on the sides mean?', a: 'They are colour racks — purple on the left, orange on the right — each with an arrow pointing at the tray, and each matching one of the two brick colours. The tutorial hand moves from a purple block to the purple strip, which is as far as the captured frames go in explaining them.' },
      { q: 'What is the 0% next to the character?', a: 'A percentage readout in the green HUD bar, sitting between the pause button and the countdown. It is still 0% on every frame we captured, so we can only say it is the level\'s progress indicator, not what it counts.' }
    ],
    shots: [
      'Level 1 with the tutorial hand on the purple block: Countdown 05:00, the purple and orange side racks, and Hammer / Magic Ball / +Time each showing one charge.',
      'The tutorial hand has moved off the purple block and is now pointing at the purple strip on the left edge — the game pairing a block colour with the side that takes it.',
      'The instruction caption in its own words: "Tap to select colored blocks to remove".'
    ]
  },

  spinscrewjam: {
    verdict: 'A screw-sorting puzzle: unscrew coloured screws from overlapping plates and get each colour into its matching box, with a short buffer rail you can extend.',
    about: [
      'The board is a stack of salmon-pink plates — squares and round washers, overlapping each other — held down by cross-head screws in red, blue and cyan (frames 1–2). Take a plate\'s screws out and the plate lifts, exposing what was under it. The point is not the plates though; it is where the screws go.',
      'Along the top, under "Level 1", sit the destinations: a red-outlined box with three holes, a blue-outlined box with three holes, and two teal buttons reading "Unlock Box" (frames 1–2). A screw only belongs in the box of its own colour, and each box has three holes, so the sorting has to be exact rather than approximate.',
      'Between the boxes and the board is a rail of seven grey circles — five open and two padlocked at the right end (frames 1–2). That is the temporary buffer: the screws you have removed but cannot yet file. To the right of it sits a wrench icon over a small tally reading 0 (frames 1–2), which is the currency the rail upgrade asks for. Tapping "+1 Slot!" opens an "Add Slot" panel showing the same seven positions — three already carrying a red, a yellow-green and a blue screw, two empty, two padlocked — above the line "Unlock by watching a short ad", with two buttons below it: a yellow "+1 Slot!" badged 36 with that same wrench, and a blue "+1 Slot!" carrying a video icon (frame 3).'
    ],
    systems: [
      { h: 'Colour-matched boxes with three holes each', p: 'The red and blue boxes at the top take three screws apiece, and two more boxes are locked behind "Unlock Box" (frames 1–2). Because a wrong-colour screw cannot be filed, the boxes act as the acceptance test for everything you remove.' },
      { h: 'A seven-circle buffer, five of them yours', p: 'The rail of grey circles is where removed screws wait. Five are open and two are padlocked at the end (frame 1); the "Add Slot" panel spells out that the locked ones come from watching an ad, and prices the other route at 36 wrenches against a balance of 0 (frame 3). Buffer space is the difference between being able to lift a plate now and having to wait for a colour to clear.' },
      { h: 'Reroll Peg, +1 Slot! and Clear', p: 'Three tools sit along the bottom: "Reroll Peg" with a circular-arrow icon, "+1 Slot!" with a grey slot and a green plus, and "Clear" with a broom (frames 1–2). They are the pressure valves — a reshuffle when no plate is free, an extra buffer slot when the rail is full, and a sweep when the board has stalled. None of the three shows a price on the board itself.' }
    ],
    howTo: [
      'Look at which boxes are open first. On the first board only red and blue are available, so cyan screws have nowhere to be filed (frames 1–2).',
      'Unscrew a screw only when its box has a free hole, or when you have buffer space to hold it.',
      'Work the topmost plates first — a plate that is covered cannot lift no matter how many screws you take out of its neighbours.',
      'Count the buffer rail before you commit. Five open circles is the whole working memory of the puzzle on the first board.',
      'Use Reroll Peg when nothing on the board is both exposed and wanted, rather than tapping plates hoping one frees.',
      'Spend the "+1 Slot!" unlock on boards where you keep hitting the rail limit, not on the first board you feel stuck on.'
    ],
    tips: [
      'A screw sitting on a covered plate still counts against you — you can see its colour and plan for it.',
      'The two padlocked buffer slots and the two "Unlock Box" buttons are the same idea at different places: the game starts you small and grows the puzzle by opening them.',
      'The upgrade currency is the wrench, not the coin. Its tally reads 0 on the board frames and the paid "+1 Slot!" asks for 36 (frame 3), so the video route is the one available immediately.',
      'The "Add Slot" panel shows a yellow-green screw as well as red, blue and cyan (frame 3) — the first board only uses three of them, so more colours are coming.',
      '"Next Challenge!" appears above the tool row once a board is finished (frame 3) — the levels run one after another rather than through a map.'
    ],
    mistakes: [
      'Pulling screws out to see what is underneath. Every screw you lift has to live in the buffer until its box has room.',
      'Ignoring the locked boxes. If cyan has nowhere to go, cyan screws are dead weight.',
      'Unlocking a buffer slot the first time the rail fills, instead of noticing that the real problem was a colour with no box.'
    ],
    device: 'Portrait. The boxes and buffer rail are at the top and the tools at the bottom, with the board between them, so the whole puzzle is visible at once on a phone without scrolling — which matters here, because the buffer rail has to stay in view while you plan. Nothing on the captured frames uses keyboard input.',
    faq: [
      { q: 'What is the goal of each board?', a: 'Get every screw off the plates and into the box of its own colour. The boxes have three holes each, and the buffer rail holds the ones you cannot file yet.' },
      { q: 'Why are two boxes labelled "Unlock Box"?', a: 'They are extra destinations that are not available at the start. The first board only gives you a red and a blue box (frames 1–2).' },
      { q: 'How do I get more buffer slots?', a: 'The "Add Slot" panel offers two ways: a yellow "+1 Slot!" button badged 36 with the wrench icon, or a blue "+1 Slot!" button with a video icon, captioned "Unlock by watching a short ad" (frame 3). The last two positions on the rail are padlocked until you do, and the wrench tally read 0 on our frames.' },
      { q: 'What does Reroll Peg do?', a: 'It is the reshuffle tool on the bottom row (frames 1–2). It is there for the state where no plate on the board is both exposed and wanted. How it rearranges the board is not shown in our frames.' },
      { q: 'Is there a timer?', a: 'No countdown appears on any captured frame. The pressure in this one comes from the five open buffer circles rather than from the clock.' }
    ],
    shots: [
      'Level 1: red and blue boxes with three holes each, two "Unlock Box" buttons, a seven-circle buffer rail with two padlocked slots, and the tools Reroll Peg / +1 Slot! / Clear.',
      'The same board with the tutorial hand on "+1 Slot!" — the buffer rail is the thing the game points you at first.',
      'The "Add Slot" panel: the seven rail positions with three screws already on them, "Unlock by watching a short ad", and the two upgrade buttons — one badged 36 wrenches, one taking a video.'
    ]
  },

  zombiedown: {
    verdict: 'A portrait zombie game fronted by a twelve-location stage map with three difficulty tiers; the map is what you actually see first, and it gates locations behind coin costs.',
    about: [
      'What greets a first load is not a level. It is a "Daily Check-in" panel: seven day cards in two rows, paying 200, 200, 200, 300, 300, 500 and 700 coins, with Day 1 pre-selected and a yellow "Receive" button carrying a video icon (frame 1). Closing it with the red cross is the first thing you have to do to see anything else.',
      'Behind it is the map (frame 2): twelve location cards in a four-row grid, each with a name, a difficulty label and a star count, and each showing a zombie holding a torch. Four cards carry a coin figure and no padlock — "Wilderness 200 Easy" (teal, and the one drawn with a highlight border), "Tunnel 400 Easy" (green), "Town 800 Norma" (dark red) and "Ruins 2000" (green, labelled "| Hard", its zombie in gold armour). The other eight — Forest, Factory, Basement, Hospital, School, Prison, Laboratory and Nightclub — are dimmed orange under a large padlock. A red "HOT" tag sits at the top-right corner of every card in rows two to four, nine cards in all, so Ruins is the only unlocked card wearing one. Note how the difficulty text actually renders on the locked cards: "| Hard", with the leading bar.',
      'Every card shows "★0", and the coin counter at the top-left of the map reads 0 (frame 2). That combination is the honest description of a new session: nothing banked, two-thirds of the map locked, and a bottom bar offering "Rhythm King", "Sign In", "Shop" and a heart badged "+400" with a video-play icon. We captured the map and the check-in; our run did not get into a combat round, so this page describes the structure you can see rather than the shooting itself.'
    ],
    systems: [
      { h: 'Locations, not levels', p: 'Progress is expressed as places — Wilderness, Tunnel, Town, Forest, Factory, Basement, Hospital, School, Prison, Laboratory, Ruins, Nightclub — each with its own difficulty label and star count (frame 2). Four of the twelve show a price and no padlock on a fresh load; the other eight are locked.' },
      { h: 'Three difficulty tiers, printed on the card', p: 'The labels read Easy, Norma and Hard (frame 2). "Norma" is what the card actually says — the text is truncated in the layout, and the Hard cards print it as "| Hard" with a leading bar. Both are the game\'s own rendering rather than a different mode.' },
      { h: 'Coins, stars and a rewarded heart', p: 'The check-in pays coins on a seven-day ladder that runs 200, 200, 200, 300, 300, 500, 700 (frame 1), the map spends them on locations, and the bottom-right heart badged "+400" with a video icon is the other way in (frame 2). "Sign In" sits in the same bar, but there is no account requirement to reach the map.' }
    ],
    howTo: [
      'Dismiss the "Daily Check-in" with the red cross before anything else — it covers the whole map on first load (frame 1).',
      'Take the free day-one coin reward while the panel is open, since the location cards are priced in coins.',
      'Start on Wilderness. It is the card drawn with the highlight border and the cheapest of the four priced ones at 200 (frame 2).',
      'Read the difficulty label before committing: Easy, Norma and Hard are printed on the card, and the Hard ones are the locked tier.',
      'If you are short of coins, the "+400" heart in the bottom bar is the rewarded option; the Shop is the non-rewarded one.',
      'Come back to the map between runs — locations unlock individually, so the card you could not afford is the one to aim at next.'
    ],
    tips: [
      'Every card on the map reads "★0" on a fresh load, so stars are something you earn per location — the frames do not show what the maximum is or what moves it.',
      'Eight of the twelve cards are padlocked at the start. That is a coin problem, not a progression-order problem you have to solve.',
      'The "Rhythm King" entry in the bottom bar is a link to a different game, not a mode inside this one.',
      '"Sign In" is offered but not required to reach the map — you can play without an account.'
    ],
    mistakes: [
      'Spending the first coins on the highest-numbered location. Ruins costs 2000 and is labelled "| Hard".',
      'Leaving the check-in panel open and tapping through it — it sits over the whole map (frame 1).',
      'Assuming the "HOT" tags mean unlocked content. Nine cards wear one and eight of those nine are padlocked.'
    ],
    device: 'Portrait, and the map is a single screenful — twelve cards, a coin counter and a four-button bottom bar, with no scrolling needed on a phone. On desktop the same layout runs in a tall window with the bar pinned at the bottom. Nothing in the captured frames is keyboard-driven.',
    faq: [
      { q: 'Why does a Daily Check-in pop up before the game?', a: 'It is the first thing the build shows. The panel offers seven days of coin rewards, 200 up to 700, with a "Receive" button; close it with the red cross to reach the map (frame 1).' },
      { q: 'How many locations are there?', a: 'Twelve are printed on the map: Wilderness, Tunnel, Town, Forest, Factory, Basement, Hospital, School, Prison, Laboratory, Ruins and Nightclub. Four show a coin price and no padlock on a fresh load — Wilderness 200, Tunnel 400, Town 800 and Ruins 2000; the other eight are padlocked (frame 2). Ruins is priced but unlocked, which makes it the expensive trap on a first visit.' },
      { q: 'Do I need to sign in?', a: 'No. A "Sign In" button sits in the bottom bar, but the map is reachable without it.' },
      { q: 'What does the heart labelled +400 do?', a: 'It carries a video-play icon in the bottom bar (frame 2), which is the usual marker for a rewarded video — you watch one and receive 400 of whatever the heart counts.' },
      { q: 'Can you describe the combat?', a: 'Not from what we captured. Our run reached the check-in panel and the location map but did not get into a round, so we have left the shooting mechanics out rather than write them from the blurb.' }
    ],
    shots: [
      'The first screen: the "Daily Check-in" panel, seven days paying 200 to 700 coins, Day 1 selected, with a video-backed "Receive" button.',
      'The map behind it — twelve location cards, four of them priced (Wilderness 200, Tunnel 400, Town 800, Ruins 2000), eight dimmed under a padlock, nine wearing a red "HOT" tag, every card reading ★0, plus the coin counter and the bottom bar.'
    ]
  },

  puzzlehex: {
    verdict: 'A bolt-and-nut sorting puzzle: hex nuts have to be moved between threaded bolts until each bolt carries one colour, with an undo and an extra-nut boost both behind rewarded videos.',
    about: [
      'The name is about the nut, not the board. Level 1 is two steel bolts standing on washers, one carrying three teal hex nuts and one carrying a single nut at its base (frames 1–2). Nothing else is on screen. The task in this genre is to shuffle nuts between bolts so that every bolt ends up loaded with one colour only, and the first level is a single colour — it exists to teach the move, not to test it.',
      'The header is a plain dark panel: "LEVEL.1" centred, three gold stars under it, and a yellow bar with the number 20 beside it (both frames). A gear button sits top-left and an orange circular-arrow restart top-right. The number 20 is the only counter on screen and it read the same on both frames we captured, including after the taps that drove the sweep — so treat it as the level budget rather than a clock, and note that we never saw it move.',
      'Along the bottom are two orange buttons, each badged with a video-play icon: "Revoke" and "Nut+1" (both frames). Pressing Revoke with nothing to undo produces the game\'s own toast, "There is no revocable operation!" (frame 2) — which is the clearest confirmation in the whole set of what that button is for.'
    ],
    systems: [
      { h: 'Bolts are the only storage', p: 'Nuts live on bolts, and a bolt holds a stack. In a sorting puzzle of this shape the number of bolts and the height of each stack are the entire constraint: you can only park a nut somewhere that has room and will take its colour, so counting free bolt space matters more than looking at the nuts themselves.' },
      { h: 'Revoke is an undo, and it is ad-funded', p: 'The button carries a video-play icon (frames 1–2), and the toast "There is no revocable operation!" appears when the undo history is empty (frame 2). It rewinds a move rather than clearing a region, which makes it the cheapest way out of a wrong transfer.' },
      { h: 'Nut+1 buys room', p: 'The second rewarded button, "Nut+1" (both frames), is the game\'s pressure valve: when no bolt can accept a nut, the usual fix in this genre is to gain an extra nut position somewhere on the board. We did not capture the result of pressing it, so we are describing what the label offers rather than what it does.' }
    ],
    howTo: [
      'Start by counting bolts and free space. On Level 1 there are two bolts and one of them has room (frames 1–2).',
      'Tap a nut to lift it, then tap the bolt you want it on. Only the top nut of a stack can move, so the order you clear a bolt matters.',
      'Never move a nut onto a bolt unless it either matches the nuts already there or the bolt is empty.',
      'Keep one bolt free as a parking space for as long as you can; a board where every bolt is occupied has usually lost.',
      'Use Revoke the moment a transfer turns out to be wrong — the undo history is short, so the earlier you use it the more it is worth (frame 2).',
      'Restart with the orange arrow at the top-right rather than grinding at a dead board; the level budget shown as 20 does not move on its own.'
    ],
    tips: [
      'The three stars at the top are gold before a single move has been made (frame 1). In this shape of game they mark the thresholds you are scored against, not how hard the board is.',
      'Single-colour early levels are teaching the lift-and-place gesture. Do not expect the sorting problem to appear before the board has two colours on it.',
      'Both bottom buttons cost a video, so a board you can undo your way out of is worth more than a board you boost your way out of.',
      'The gear at top-left is settings; the orange arrow is restart. They are the only two non-game buttons on the screen.'
    ],
    mistakes: [
      'Filling the last empty bolt early. Once no bolt is free, a wrong-colour nut on top of a stack has nowhere to go.',
      'Pressing Revoke out of habit — with an empty history it does nothing and says so.',
      'Reading the "20" as a countdown. It did not change between our two frames.'
    ],
    device: 'Portrait with a very sparse layout: the header strip at the top, the bolts in the middle band and the two boost buttons at the bottom, leaving a lot of dark space around the board. That empty middle is where the genre puts more bolts as levels grow, so the pieces stay thumb-sized on a phone even on busy boards. No keyboard control appears on any captured frame.',
    faq: [
      { q: 'Is Puzzle Hex a hexagon tile puzzle?', a: 'No. The board is threaded bolts with hex nuts on them — the "hex" is the nut shape. The captured frames show two bolts and four nuts and nothing resembling tiles or a circuit.' },
      { q: 'What does Revoke do?', a: 'It undoes your last move. The game confirms this itself: pressing it with nothing to undo shows the toast "There is no revocable operation!" (frame 2). It carries a video icon, so it is a rewarded action.' },
      { q: 'What is Nut+1?', a: 'The second rewarded button on the bottom row. It offers an extra nut position when a board has run out of room; the exact effect is not shown in the frames we captured.' },
      { q: 'What is the number 20 at the top?', a: 'A counter beside the yellow bar under the stars. It read 20 on both frames we took, including after input, so it behaves like a level budget rather than a timer.' },
      { q: 'Why does Level 1 only have one colour?', a: 'It is the tutorial board. With a single colour there is exactly one thing to learn — lifting a nut from one bolt and placing it on another — which every later level then builds on.' }
    ],
    shots: [
      'Level 1: two bolts on washers, three teal nuts on the left one and one on the right, with the three gold stars, the bar reading 20, the gear and orange restart buttons in the corners, and the Revoke / Nut+1 buttons below.',
      'The game confirming its own undo: the toast "There is no revocable operation!" after Revoke was pressed with an empty history. The board and the 20 are unchanged.'
    ]
  },

  tankera: {
    verdict: 'A top-down car game where your vehicle carries a roof turret: the home screen sells you a colour, a second car and a heart top-up, and one button starts the run.',
    about: [
      'Everything on the first screen is a car seen from directly above, driving toward the top of the screen down a grey road with yellow dashes, bordered by sand and scattered rocks (frames 1–2). The car is pink and white, and the detail that defines the game is bolted to its roof: a barrel and mount, i.e. a turret. This is not a racing game — it is a driving game with a gun on it.',
      'The right-hand column is the whole menu. A rainbow balloon labelled "Pick color", a green armed jeep labelled "Buy a car", and a red heart badged "+1000" carrying a video-play icon (frames 1–2). The cash counter at the top of the road reads 2000. So the three things the game offers before a run are the paint, the vehicle and a heart top-up — and the armed jeep in the "Buy a car" icon is a preview of what a purchased vehicle looks like.',
      'A large yellow "Start Game" button sits at the bottom-left (frames 1–2). Our capture run pressed around it repeatedly and stayed on this screen, with only the road scrolling underneath — so this page describes the home screen and the economy you can see, and stops short of the driving itself rather than inventing it.'
    ],
    systems: [
      { h: 'Cash, not stars', p: 'The only counter on the home screen is a stack of notes reading 2000 (frames 1–2). There is no level number, no star row and no score displayed, which tells you the loop is measured in money: earn it on a run, spend it in the two menu buttons on the right.' },
      { h: 'A turret on a car', p: 'The weapon is mounted on the roof and points forward, in the direction the car drives (frames 1–2). That single piece of art defines the control problem: aiming and driving are the same action, so steering is the game\'s real skill — though no frame we captured shows the turret firing.' },
      { h: 'A heart bought with a video', p: 'The red heart is badged "+1000" with a video-play icon (frames 1–2), the standard marker for a rewarded video. It is the only option on the screen that does not appear to spend the cash balance — the other two are a cosmetic choice and a purchase.' }
    ],
    howTo: [
      'Set the paint first if you care about it: "Pick color" is the rainbow balloon at the top of the right-hand column (frames 1–2).',
      'Press the yellow "Start Game" button at the bottom-left to leave the home screen.',
      'Spend from the 2000 before you start if you want a second vehicle — "Buy a car" is the only purchase on the screen, and its icon shows an armed jeep rather than the pink car you are shown driving.',
      'Take the "+1000" heart if you are starting a session short: it carries a video icon, so it costs a video rather than cash.',
      'Everything above the "Start Game" button is a menu, not a control. The road behind it scrolls on its own (frames 1–2), which is an idle animation rather than a run in progress.',
      'What the run itself asks of you is not on any frame we captured, so we are deliberately not writing steering or shooting advice for this one.'
    ],
    tips: [
      'The home screen is the only place we saw where the car can be changed, so decide before you press Start rather than mid-run.',
      'A purchased vehicle looks like a different chassis in its icon, while "Pick color" is a balloon — cosmetic — so the two buttons are not competing for the same decision.',
      'The heart and the cash are separate counters. The heart is badged in thousands and takes a video; the cash is a stack of notes and is what the two shop buttons appear to spend.',
      'The desert road on the home screen has no junctions, exits or traffic drawn on it, so whatever the run adds is not hinted at here.'
    ],
    mistakes: [
      'Expecting a racer. The turret is the point — the vehicle exists to carry a forward-facing weapon.',
      'Reading the scrolling road as gameplay. It is the idle animation on the menu screen; the run only begins from "Start Game" (frames 1–2).',
      'Assuming the "+1000" heart is a life counter. It is topped up in thousands, which is not how lives are usually drawn, and no frame shows what it counts.'
    ],
    device: 'Portrait. The road runs up the middle of a phone-shaped frame, the menu buttons are stacked down the right edge and Start Game is a wide button at the bottom — all of it inside thumb reach in one hand. On desktop the same portrait canvas is centred with the surroundings dark. We saw no keyboard control on the captured frames.',
    faq: [
      { q: 'Is Tank Era landscape or portrait?', a: 'Portrait. The build we captured renders as a vertical road filling a 720×1280 canvas (frames 1–2). Our catalogue metadata said landscape, which is one of the things this rewrite corrected.' },
      { q: 'What is the difference between "Pick color" and "Buy a car"?', a: '"Pick color" is the rainbow balloon and is cosmetic. "Buy a car" is priced from the same cash balance and swaps the chassis — its icon shows an armed jeep rather than the pink car you start in.' },
      { q: 'What does the +1000 heart cost?', a: 'A video. The heart carries a play icon (frames 1–2), which is the rewarded-video marker, so it is the free way to top up the resource the heart counts.' },
      { q: 'Do I need to sign in or install anything?', a: 'No. It runs in the browser at its own address with no download and no account, like everything else in the catalogue.' },
      { q: 'What happens once you press Start Game?', a: 'We can only tell you as far as the home screen. Our capture run stayed there with the road scrolling, so we have described the visible economy instead of writing the driving section from the blurb.' }
    ],
    shots: [
      'The home screen: a pink and white pickup with a roof turret seen from above, driving toward the top of the frame down a desert road, cash at 2000, and the menu down the right edge — "Pick color", "Buy a car", and a "+1000" heart with a video icon.',
      'The same screen a moment later with the road scrolled forward underneath the car — the idle animation behind the yellow "Start Game" button.'
    ]
  },

  bubblesafari: {
    verdict: 'A straightforward bubble shooter with a real twist worth knowing about: the star meter fills from burst value, and every power-up is charged by watching an ad.',
    about: [
      'A dense triangular raft of bubbles hangs from the top of a brown cave wall — red, orange and green clusters on Level 1, purple, blue and red on Level 2 (frames 1, 3). Below it sits the shooter: a circular reticle carrying the loaded bubble and the next one in the queue, with a number in the middle that read 35 on the first board and 30 on the second (frames 1, 3). Aim, release, and a group of a colour pops.',
      'The purple HUD bar carries the whole scoring story: a pause button, the score, a row of three star slots over a fill bar, and a three-bubble icon with a number beside it (frames 1–3). Mid-shot, the score had climbed to 6640, two of the three stars had turned gold with the green fill bar running behind them, and eight value popups were rising off the board — every one of them reading 500 (frame 2). The stars are therefore paid for in burst value, not in moves saved.',
      'Two things sit outside the board and both matter. On the left is a gift box with its own countdown — 00:54, then 00:46, then 00:35 across our three frames — which is a timed free prize rather than a level timer. Along the bottom are four power-up slots, each wearing a clapperboard badge and a green plus sign (frames 1–3): a striped rocket, a cluster of multicolour balloons, a lightning bolt and a pink mallet. The charges in those slots come from watching videos.'
    ],
    systems: [
      { h: 'Burst value buys the stars', p: 'Frame 2 shows eight separate popups from one collapse, each worth 500, and the star row had already turned two of its three stars gold at a score of 6640. A single good drop is therefore worth several plain hits, which is why the counters are the numbers to respect rather than the score itself.' },
      { h: 'Two counters, and we could not settle which is the shot budget', p: 'The reticle number read 35 on Level 1 and 30 on Level 2 (frames 1, 3), while the three-bubble icon in the HUD read 63 on Level 1, 0 part-way through the same level, and 101 on the fresh Level 2 (frames 1–3). The icon is the one that clearly gets spent and resets per level; the reticle number changes between levels but we never watched it tick down. Treat the icon as the budget you are spending and the reticle number as something the level config sets.' },
      { h: 'Four power-ups, all ad-charged', p: 'The bottom row holds a striped rocket, a balloon cluster, a lightning bolt and a pink mallet, each with a clapperboard icon and a green plus (frames 1–3). The plus is how you add a charge, and the clapperboard is what it costs.' }
    ],
    howTo: [
      'Check the colour of the bubble in the reticle before you aim, then find the largest group of that colour hanging on the wall (frame 1).',
      'Aim for the seam between two clusters rather than the middle of one — a bubble that lands on a boundary can pop both.',
      'Bank on the drop: anything left hanging after a pop falls and scores on its own, which is where the eight 500-value popups in one burst come from (frame 2).',
      'Watch the three-bubble counter in the HUD. It read 63 at the start of Level 1 and 0 part-way through the same level (frames 1–2), so it is the number the level spends down.',
      'Save a power-up for a cluster you physically cannot reach, not for one that merely looks tedious.',
      'Tap the gift box while its timer still runs — it counts down during play, from 00:54 to 00:35 across our three frames.'
    ],
    tips: [
      'The three stars are a value threshold, so a level can be finished and still rate poorly if you got there with small pops. On frame 2 two of them are gold and the third is still grey at 6640.',
      'The two numeric counters disagree and the game does not label either. The bubble icon went 63 → 0 → 101 across our frames while the reticle read 35 then 30, so we are reporting both readings rather than guessing which one is ammo.',
      'Every power-up slot carries a green plus on the first board (frames 1–3): a charge you did not buy is not there, so plan shots without them.',
      'The pause button is in the HUD bar, which is also where the score is — the top strip is information, the bottom strip is action.'
    ],
    mistakes: [
      'Reading the gift box countdown as a level timer. The board does not expire; the gift does.',
      'Firing at the nearest cluster instead of the one whose removal drops the most bubbles.',
      'Using an ad-charged power-up to finish a level you could have finished with two careful shots.'
    ],
    device: 'Portrait, with the bubble wall occupying the top third and the shooter in the lower middle — the aim line is dragged with a thumb and the four power-up slots are all within reach at the bottom edge. On desktop the same drag becomes a mouse aim. No keyboard input appears on any captured frame.',
    faq: [
      { q: 'Is there a time limit in Bubble Safari?', a: 'Not on the board. The only countdown on screen is attached to the gift box at the left, which ticks down while you play (00:54 to 00:35 across our frames). What does end a level is one of the two counters running out.' },
      { q: 'How do you earn stars?', a: 'From burst value. The HUD shows three star slots over a fill bar, and two of the three had turned gold by a score of 6640 while eight popups of 500 each were rising off the board (frame 2).' },
      { q: 'What are the four icons along the bottom?', a: 'Power-ups — a striped rocket, a balloon cluster, a lightning bolt and a pink mallet. Each carries a clapperboard badge and a green plus, meaning charges are added by watching a video.' },
      { q: 'What does the number in the circle at the bottom mean?', a: 'It is one of two counters and the game never labels it: 35 on Level 1 and 30 on Level 2 (frames 1, 3). The other one, the three-bubble icon in the HUD, read 63, then 0 on the same level, then 101 on Level 2. We are not going to tell you which is shots when the frames do not settle it.' },
      { q: 'Does it need an account?', a: 'No. There is no sign-up on Tapzens, and the game runs in the browser. A "Sign In" style prompt inside a build would be the game\'s own save option, not a requirement to play.' }
    ],
    shots: [
      'Level 1 before the first shot: the hanging bubble wall in red, orange and green, the reticle loaded with a red bubble and reading 35, and the gift box counting down from 00:54.',
      'A burst in progress — bubbles falling, eight value popups each reading 500, score at 6640 and two of the three stars turned gold over the green fill bar.',
      'Level 2 with a different colour mix (purple, blue, red), a fresh score of 0, a bubble counter of 101 and 30 in the reticle.'
    ]
  },

  shiftdashreac: {
    verdict: 'A lane runner played on a four-lane road where the whole interface is a single column on the right: Turn, Shop, Sign In, and a skin you have already unlocked.',
    about: [
      'The scene is a wide grey road cut diagonally across a green hillside, marked with four lanes of dashes, and a caption across the bottom that reads "Tap the screen to start" (frames 1–2). Three plain blue stick figures run up the lanes on the left and a red map pin floats over the road ahead (frame 1); in the next frame a dark armoured figure has joined them in the middle lane (frame 2). Nothing on screen is a joystick — the only control named anywhere in the interface is the "Turn" button.',
      'The right-hand column is the entire menu, stacked vertically: a notepad icon labelled "Sign In", a spoked wheel labelled "Turn", and a gift box labelled "Shop" (frames 1–2). Above them, at the top of a flight of steps, stands a golden-helmeted character tagged "Warframe" with a red "NEW" badge — the game\'s skin showcase, sitting inside the level rather than behind a menu.',
      'The top of the screen holds a coin counter reading 0 on the left, a settings gear on the right, and between them a bar with a purple circle marked 1 at one end and a red circle marked 2 at the other (frames 1–2). Frame 2 also carries a toast reading "Got Iron Man Skin Fragment – Success!" with the quotes butted up against the words, which is how the game tells you that skins are assembled from fragments — and it is the same moment the armoured figure appears on the road.'
    ],
    systems: [
      { h: 'Turn is the control', p: 'The wheel button on the right is labelled "Turn" and no other input affordance appears on the start screen (frames 1–2). In a game whose road runs diagonally through four lanes, that points to direction being the decision — you commit to a turn and the runner takes that lane.' },
      { h: 'Skins are built from fragments', p: 'The toast in frame 2 announces a "Skin Fragment" for Iron Man, and the armoured runner appears on the road in that same frame; the character standing on the steps is a "Warframe" skin marked NEW. So cosmetics are a collection track that fills during play, and the showcase is placed where you can see it while running.' },
      { h: 'A 1-versus-2 bar across the top', p: 'The purple 1 and red 2 sit at opposite ends of a progress bar (frames 1–2). The frames we captured do not show it moving, so we describe it as the level\'s two-sided counter rather than guess at what tips it.' }
    ],
    howTo: [
      'Tap anywhere to get off the "Tap the screen to start" caption — the runner is already moving underneath it (frames 1–2).',
      'Watch which of the four lanes the red pin is floating over; it is the only marker on the road ahead.',
      'Use the "Turn" wheel when the road branches rather than steering continuously — it is a button, not a stick.',
      'Collect skin fragments as they drop; the toast in frame 2 is the game confirming one landed, and the armoured runner on the road is what the fragment belongs to.',
      'Open the "Shop" from the right column between runs, not mid-lane, since it is the only place the coin counter at the top-left can be spent.',
      'Skip "Sign In" if you only want a run — it is offered on the start screen but the game is already playable at that point.'
    ],
    tips: [
      'The interface lives entirely in the right column, so keep your thumb off that strip while running; taps there open menus instead of moving you.',
      'The coin balance was 0 on both captured frames, so the early lanes are where the economy actually starts.',
      'A "NEW" badge on the showcase character is the game telling you a skin is waiting to be equipped.',
      'The settings gear is top-right, well away from the Turn wheel — easy to hit by accident on a phone, worth knowing before it matters.'
    ],
    mistakes: [
      'Looking for a joystick. The only named control on the start screen is "Turn".',
      'Tapping the right-hand column during a run and ending up in the Shop.',
      'Assuming the 1-versus-2 bar is a score; the coin counter and the bar are different things and only one of them is money.'
    ],
    device: 'Portrait, and deliberately one-handed: the road fills the left two-thirds of the screen and every button is stacked down the right edge. Our first capture pass rendered this build rotated 90 degrees because the catalogue had it filed as landscape; captured at the size it actually draws, it is a vertical game (frames 1–2).',
    faq: [
      { q: 'How do you control the runner?', a: 'The start screen names one control: the "Turn" wheel in the right-hand column (frames 1–2). There is no on-screen stick, and the game begins from a plain tap anywhere.' },
      { q: 'What are the buttons on the right?', a: 'From top to bottom: "Sign In" (a notepad), "Turn" (a spoked wheel) and "Shop" (a gift box). The character on the steps above them is the "Warframe" skin showcase.' },
      { q: 'What is the Iron Man message?', a: 'A toast reading "Got Iron Man Skin Fragment – Success!" (frame 2), rendered with the quotation marks butted up against the words. Skins are collected in fragments during runs, and this is the game confirming one — the armoured figure on the road in the same frame is the skin it refers to.' },
      { q: 'Do I have to sign in?', a: 'No. "Sign In" is a button on the start screen, but the level is already loaded and waiting on a tap.' },
      { q: 'Is it landscape?', a: 'No — portrait. It is filed as landscape in our own metadata, which the capture contradicted; that error is fixed as part of this rewrite.' }
    ],
    shots: [
      'The attract screen before a run: "Tap the screen to start" across the bottom, three blue stick figures on the four-lane road with a red pin ahead of them, the purple-1-versus-red-2 bar, the Warframe bust with its NEW badge, and the Sign In / Turn / Shop column down the right edge.',
      'The same screen a moment later: the toast "Got Iron Man Skin Fragment – Success!" across the road and a dark armoured runner now running in the middle lane, with the menu column unchanged.'
    ]
  },

  acestrike: {
    verdict: 'A vertical space shooter played by swiping a small fighter across a moonlit foreground while numbered burning targets descend; the level is tracked as a virus percentage, not as a score.',
    about: [
      'The opening screen is a hangar without walls: a grey-and-cyan fighter idling on a cratered moon surface, a nebula above it, and one line of instruction in the middle of the screen — "Swipe to Engage" (frame 1). Two hexagon badges sit above that line, a large lit "1" and a smaller dim "2", which is the whole level selector (frames 1–2). Along the bottom are three buttons: "Rank", "Upgrade" and "Get Coins", the last wearing a video icon (frame 1).',
      'Once a run starts, the same ship sits at the bottom of the screen firing cyan bolts upward at a cluster of burning planets drifting down from the top (frame 2). Each planet carries a large number — 1, 2, 7, 13 and 79 are all visible in one frame — and that is the only feedback the targets give. There is no crosshair and no fire button, which is consistent with the one instruction the menu gives: you swipe, the ship moves, the guns run themselves.',
      'The header is the interesting part. A cyan bar runs under the two hexagons, and beneath it a line reads "Xeno-Virus: 97%" (frame 2). That percentage, not the coin counter beside it, is what the level is actually measuring — you are burning a virus down, and the numbered planets are the things standing between you and it.'
    ],
    systems: [
      { h: 'Swipe to Engage is the entire control set', p: 'The menu states the verb outright (frame 1) and the play frame shows no fire button, no stick and no lane markers (frame 2). Position is the only decision, so the game rewards staying in the part of the screen where the densest cluster of targets is overhead.' },
      { h: 'Numbers on targets are the difficulty', p: 'The burning planets in frame 2 are labelled 1, 2, 7, 13 and 79. A 1 and a 79 in the same cluster is not decoration: the big numbers are the ones that will still be on screen when the small ones are gone, and they decide how long a wave lasts.' },
      { h: 'Coins, and three ways to spend or get them', p: '"Rank", "Upgrade" and "Get Coins" line the bottom of the menu (frame 1), and a floating card on the right offers a coin payout behind a video — it read 2 at the menu and 18 during the run, both above a "Claim Now" button (frames 1–2). Upgrades are the persistent track; the claim card is the top-up.' }
    ],
    howTo: [
      'Swipe on the lower half of the screen to move the fighter — the menu tells you this is the control before the run even starts (frame 1).',
      'Pick off the low-number targets first. A planet showing 1 clears in a moment and leaves the screen, while a 79 is still standing there after the rest are gone.',
      'Stay under the gap in the cluster rather than under the cluster itself; drifting into the middle of a dense group costs position you cannot get back.',
      'Watch the cyan bar and the "Xeno-Virus" percentage rather than the coin counter — the percentage is the level\'s finish line (frame 2).',
      'Between runs, spend coins on "Upgrade" before worrying about "Rank" — the rank button is a ladder you are placed on, the upgrade button is the one that changes what you bring to it (frame 1).',
      'Tap "Claim Now" on the coin card when it is offering a payout you have already earned (frames 1–2) — it costs a video, not coins.'
    ],
    tips: [
      'The two hexagons at the top are the level list. Only "1" is lit at the start (frame 1), so the second stage is earned, not chosen.',
      'The ship fires continuously once a run is going — you never press fire, so all your attention belongs to positioning.',
      '"Get Coins" carries a video icon on the menu itself, which means the currency has a free path and you are not required to spend real money to upgrade.',
      'The coin counter in the header was 16 mid-run against 0 at the menu (frames 1–2), so a single wave pays for itself quickly.'
    ],
    mistakes: [
      'Hunting the highest-number target first because it looks important. It soaks time; the small ones clear the screen.',
      'Treating the percentage as a health bar. "Xeno-Virus" is the objective meter, not your condition.',
      'Ignoring the claim card until it is empty — it is the only free coin source visible on either screen.'
    ],
    device: 'Portrait, and it was filed as landscape in our own catalogue until this rewrite. The ship sits in the bottom quarter where a thumb can drag it across the full width, the targets come down from the top, and the three menu buttons are wide enough for one-handed use. No keyboard control appears on either captured frame.',
    faq: [
      { q: 'How do you shoot in Ace Strike?', a: 'You do not press fire. The menu instruction is "Swipe to Engage" (frame 1) and the play frame shows no fire button (frame 2) — the fighter runs its guns while you move it.' },
      { q: 'What do the numbers on the planets mean?', a: 'They are the targets\' values — 1, 2, 7, 13 and 79 are all visible in a single frame (frame 2). They behave like hit points: the big ones take longer to clear.' },
      { q: 'What is Xeno-Virus?', a: 'The objective meter shown under the level hexagons, reading 97% in our captured run frame (frame 2). It is the thing the level is measuring.' },
      { q: 'Do I have to pay for coins?', a: 'No. "Get Coins" on the menu carries a video icon, and the floating card with "Claim Now" is also video-backed (frames 1–2).' },
      { q: 'Is there more than one level?', a: 'The selector shows two hexagons, 1 and 2, with only 1 lit at the start (frame 1). The second is locked until you clear the first.' }
    ],
    shots: [
      'The menu: the fighter idling on the moon, "Swipe to Engage", the level hexagons 1 and 2, the coin card with "Claim Now", and the Rank / Upgrade / Get Coins row.',
      'A run in progress: cyan bolts rising into a cluster of burning planets numbered 1, 2, 7, 13 and 79, with the header reading "Xeno-Virus: 97%".'
    ]
  },

  arrowmazesolve: {
    verdict: 'A one-screen arrow-routing puzzle that teaches itself with three words — "Tap to Move!" — and runs a clock, a battery and three hearts at the same time.',
    about: [
      'Level 1 is a single drawing in the middle of a pale blue screen: a rectangular track containing two rows of hooked arrows — three pointing up in the top row, three pointing down in the bottom one — wrapped by an outer loop whose left side rises and whose right side falls (frames 1–3). It reads like a wiring diagram rather than a board game, and there is nothing else in the play area: no grid, no pieces, no timer bar across the puzzle itself.',
      'The game\'s whole tutorial is two words. On the untouched board a hand points into the top row of arrows and a caption above it reads "Tap to Move!" (frame 1). That is the verb, stated outright, and it is gone by the next frame we captured (frame 2) — the level is one object you shift, not a maze you walk.',
      'The header holds four separate readouts, which is more than any other puzzle here carries. Top-left is a coin balance of 1000, unchanged across all three frames. Centre-top are three hearts under a clock that reads 05:00, then 04:55, then 04:36. Top-right is a green battery pill that prints the word "Full" on the fresh board and a number once it has started draining — 4 in frame 2 and 2 in frame 3, with a second small clock reading 04:34 under it (frame 3). Below the puzzle sits a horizontal slider with a minus at one end, a plus at the other and a knob in the middle: a zoom control for the board.',
      'Along the bottom are three blue tools, each with a coin price printed on it: a lightbulb at 200, a stopwatch at 300 and a pair of crossed arrows at 400 (frames 1–3). Settings and a "Shop" gift box are stacked down the right edge. Between them, the game is entirely self-service: you can buy your way out of a stuck board, and the prices are on the buttons.'
    ],
    systems: [
      { h: 'Three failure counters running at once', p: 'A clock, a battery and three hearts all sit in the header, and our three frames show all three moving: 05:00 → 04:55 → 04:36 on the clock, "Full" → 4 → 2 on the battery, and three red hearts reduced to one red and two grey by the last frame (frames 1–3). Whatever the hearts are for, they are demonstrably spendable on this board.' },
      { h: 'Three hints with prices on them', p: 'Lightbulb 200, stopwatch 300, crossed arrows 400, printed on the buttons (frames 1–3). Against a starting balance of 1000 that is five hints before you are broke, so the coin balance is a real resource here, not decoration. It did not move across any of our frames.' },
      { h: 'A zoom slider for the board', p: 'The slider under the puzzle, marked with minus and plus (frames 1–3), is unusual and it is the answer to this game\'s main difficulty: arrow tracks are hard to read at the size they fit on a phone. The knob sat in the same place on all three frames, so we never moved it — but it is the only free control on the screen.' }
    ],
    howTo: [
      'Read "Tap to Move!" as the rule, not as decoration: an arrow segment is shifted by tapping it, and that is the only action the game teaches (frame 1).',
      'Before doing anything, drag the zoom slider toward the plus and read the whole track. The puzzle is one connected drawing, and the outer loop is part of it (frames 1–3).',
      'Follow the flow from the arrowheads. On Level 1 the top row points up into the outer loop and the bottom row points down out of it, so the two halves are not independent.',
      'Work one row at a time rather than the whole rectangle — a change in the top row is visible against the outer track immediately.',
      'Keep the clock in view, and treat the battery pill as a second timer: it read "Full" untouched and 2 by the last frame, so something on this board drains it (frames 1–3).',
      'Buy the 200 lightbulb before you lose another heart. On the frame where two hearts had already gone grey, a group of three arrows in the lower row was boxed in black and redrawn dark red — the game flagging a segment you have to deal with (frame 3).'
    ],
    tips: [
      'The hearts are the resource that does not come back between attempts. Two of the three were grey in our last frame while the coins still read 1000 (frame 3) — the board spends lives, not money.',
      'Zoom is free. Players stuck on an arrow maze are usually misreading a junction, not out of ideas.',
      'The three tools are priced differently for a reason: the lightbulb is the cheapest way to keep a run alive and the 400 crossed arrows the most expensive.',
      'The "Shop" on the right edge is the only place the 1000 balance can go, and nothing on the captured frames shows a second currency to spend it on.',
      'A dark-red segment inside a black box is the game marking a group as relevant rather than as solved — check what a boxed group is pointing into before you tap it (frame 3).'
    ],
    mistakes: [
      'Playing at the default zoom. The whole puzzle is thin lines on a pale background, and the slider is sitting right under it.',
      'Assuming the clock is the only fail state. Two of the three hearts were already greyed while the clock still read 04:36 (frame 3).',
      'Spending the 1000 starting coins on 400 shuffles when a 200 lightbulb is the cheaper read on the same board.'
    ],
    device: 'Portrait. Our first capture pass rendered this build sideways because the catalogue had it filed as landscape; drawn at the size it actually uses, the puzzle sits in the middle third with the zoom slider and three tool buttons all below the thumb line (frames 1–3). Keyboard arrows are not used on any captured frame — the input is taps and drags.',
    faq: [
      { q: 'Is Arrow Maze Solve landscape or portrait?', a: 'Portrait. The build draws a vertical board with the tools along the bottom (frames 1–3). It was listed as landscape in our own metadata, which this rewrite corrected.' },
      { q: 'Is there a time limit?', a: 'Yes — a clock in the header ran 05:00, 04:55 and 04:36 across our three frames, and the 300-coin stopwatch tool is priced as a time purchase.' },
      { q: 'What do the three hearts mean?', a: 'They are a life-style counter, and they are spendable: on the last frame we captured only one of the three is still red and two are grey (frame 3). What specifically costs one is not shown in the stills.' },
      { q: 'What is the green battery icon?', a: 'A second counter in the top-right. It prints "Full" on the untouched board and then a number — 4, then 2 — as the frames go on, with a small 04:34 clock appearing under it in the last frame (frames 1–3). We could not tie it to an action from stills, so treat it as a resource rather than as lives, which are the hearts.' },
      { q: 'What does the slider under the board do?', a: 'It is marked with a minus at the left end and a plus at the right, under the puzzle (frames 1–3) — a zoom control. It is the only free control on the screen.' },
      { q: 'How much do the hints cost?', a: '200 coins for the lightbulb, 300 for the stopwatch and 400 for the crossed arrows, printed on the buttons themselves, against a balance of 1000 that never moved across our frames.' }
    ],
    shots: [
      'The untouched Level 1: the hand and the caption "Tap to Move!" over the top row of arrows, the clock at 05:00, three red hearts, the battery pill reading "Full", the coin balance at 1000, the zoom slider and the 200 / 300 / 400 tools.',
      'The same board with the tutorial gone — 04:55 on the clock and the battery pill now showing 4 instead of "Full".',
      'Later on the same board: one red heart and two greyed, the battery down to 2 with a 04:34 clock under it, and three arrows in the lower row redrawn dark red inside a black box.'
    ]
  },

  royalmatcher: {
    verdict: 'A real match-3 on a nine-by-nine board: five tile designs, a two-part collection goal printed as flower 8 and castle 7, and a "Steps" budget of 22 on Level 1.',
    about: [
      'The board is a nine-by-nine grid of chunky tiles in five designs: a green leaf, a gold helmet, a red heart, a pink flower and a blue castle (frame 3). Above it a crimson header states the contract — "Goal" over a flower and a castle, "Steps" over the number 22. Nothing is implied: the level names the two shapes to collect and how many swaps you get.',
      'Before the board there is a chooser (frame 2). A red "Level 1" banner with a round X at its right sits over a "Goal" panel showing a flower marked 8 and a castle marked 7, and under that a "Select Boosters" row of three yellow buttons, each wearing a red badge reading 1: a pair of purple-and-white rockets, a rainbow-panelled ball, and a purple-and-white striped ball. A green "Start" button finishes the panel. You pick your loadout on the way in.',
      'Behind all of it is the estate screen (frame 1): a red-brick castle with orange-roofed turrets in terraced gardens, a round portrait medallion of the queen at top-left, a coin pill reading 500 and a heart pill reading 3 — each with a green plus badge — and a five-icon navigation strip along the bottom with "Home" lit. A green button labelled "Level1" sits over the lawn.'
    ],
    systems: [
      { h: 'A two-part goal, not a score', p: 'The header tracks the flower and the castle separately (frame 3). On the board frame the flower carries the number 5 and the castle carries a green check disc, while "Steps" still reads its full 22 — so we can see the two halves are marked independently, but the frames do not settle whether that check means the castle half is finished or is just a marker.' },
      { h: '22 steps is the whole difficulty', p: '"Steps 22" is printed on the board frame (frame 3), so the fail state is a swap budget rather than a clock. That makes Royal Matcher the planning game of this group — the opposite of Chroma Jam, which puts 05:00 on the screen and dares you to read fast.' },
      { h: 'Boosters you pick, and boosters the board made', p: 'The pre-level row offers three boosters at one charge each (frame 2). Under the board during play there are four badged buttons, each also reading 1, plus a plain gear: a rocket pair, a gold-banded purple ring, a purple-and-gold striped ball and the rainbow ball (frame 3). The ring matches the two tiles already sitting in the left column of the grid, so at least one of those four is a booster the board generated rather than one you selected.' }
    ],
    howTo: [
      'Read the "Goal" panel first. On Level 1 you are collecting flowers and castles, so hearts, leaves and helmets only matter as scaffolding (frames 2–3).',
      'Swap to make three or more of a kind; the tiles that matter are the two in the goal.',
      'Clear goal tiles from the bottom of the grid upward — dropping new tiles into a cleared lower row is what sets up the next match for free.',
      'Watch the step counter. Once it is well under 22 with either goal unfinished, stop setting up big cascades and start taking any legal goal match.',
      'Match next to the gold-banded ring tiles in the left column instead of moving them — a booster already on the grid is the cheapest one you have (frame 3).',
      'If a level fails, replay it from the "Select Boosters" panel and take a different one; all three start at a single charge (frame 2).'
    ],
    tips: [
      'The coin pill of 500 and the heart pill of 3 on the estate screen (frame 1) are the resources with plus badges over them — that is where top-ups come from.',
      'Every booster badge reads 1, in the chooser and under the board alike. Nothing here comes in multiples at Level 1.',
      'Five tile designs across eighty-one cells is a dense mix, so genuine three-matches appear often — which is why the step budget is tighter than 22 sounds.',
      'The bottom navigation strip has five icons and "Home" is the lit one (frame 1); the board itself has no navigation, so leaving a level means going back to that strip.'
    ],
    mistakes: [
      'Matching whatever is easiest. Only the two designs named in the goal matter, and the header says which.',
      'Spending a booster charge early in a level; each badge says 1.',
      'Ignoring the estate screen — the hearts there are what a failed level costs you.'
    ],
    device: 'Portrait, with the nine-by-nine board filling the middle of the screen and the four badged boosters plus the gear in a row along the bottom edge, all comfortably thumb-sized on a phone. On desktop the swaps become clicks: press a tile, click its neighbour. The header panel is compact enough that the goal and the step count never need scrolling.',
    faq: [
      { q: 'What is the goal of each level?', a: 'It is printed twice. The pre-level panel says flower 8 and castle 7 (frame 2), and the in-play header repeats "Goal" over the same two shapes with "Steps" reading 22 (frame 3) — a collection target plus a swap budget, not a score.' },
      { q: 'How big is the board and how many tile types are there?', a: 'Nine columns by nine rows, in five designs: leaf, helmet, heart, flower and castle (frame 3). Only the two named in the goal score.' },
      { q: 'What are the icons under the board?', a: 'Four booster buttons, each badged 1 — a rocket pair, a gold-banded ring, a striped ball and a rainbow ball — followed by a settings gear (frame 3). Two of those shapes also appear as tiles inside the grid.' },
      { q: 'Are the hearts and coins on the castle screen important?', a: 'Yes. The top bar of the estate screen shows 500 coins and 3 hearts (frame 1), each with a green plus badge — hearts are what a failed level takes, coins buy the rest.' },
      { q: 'Is there a timer?', a: 'No. The constraint is the step counter in the header, which reads 22 (frame 3). Nothing on any frame counts down.' }
    ],
    shots: [
      'The estate screen: the red-brick castle in its gardens, the queen\'s portrait medallion, a coin pill of 500 and a heart pill of 3 each with a green plus, the green "Level1" button and the five-icon strip with "Home" lit.',
      'The pre-level panel: a "Level 1" banner with a round X, "Goal" over a flower marked 8 and a castle marked 7, the "Select Boosters" row of three yellow buttons each badged 1, and the green "Start" button.',
      'The board in play — nine by nine, five tile designs, two gold-banded ring boosters already in the left column, the "Goal" and "Steps 22" header, and the four badged boosters plus a gear along the bottom.'
    ]
  },

  satisfyingstack: {
    verdict: 'A merge puzzle on a twelve-cell tray: choose a stack, then Push or Merge it, with a milestone track reading 5, 6, 7, 9 and 10 and only five of the twelve cells open at the start.',
    about: [
      'The board is a grey tray of twelve slots in three rows of four, and most of them are not yours. The top-left slot carries a keyhole, and the three beside it are labelled "Temp Slot" and each wear a video-camera icon. Of the middle row, the leftmost is an empty grey pedestal and the other three carry keyholes. Only the bottom row is fully open (frame 1). Five usable cells out of twelve is what Level 1 actually gives you.',
      'The game tells you the first move outright. An orange callout reading "Tap to Choose" hangs over the leftmost stack, with a white gloved hand underneath it, and that stack is drawn inside a white rounded selection frame (frame 1). Two stacks are on the board, both with a red top disc stamped "1": one in the left cell, one in the third cell, with empty grey pedestals in between and to the right.',
      'Below the tray are the two verbs: a yellow "Push" button and a purple "Merge" button side by side. Tucked at the bottom-right corner of the tray is a smaller "Sort" control — a blue-and-pink looped arrow with a video-camera badge on it. Above the board, "Level 1" sits next to a gold trophy cup, and under it a green track links five numbered nodes reading 5, 6, 7, 9 and 10, with the 5 filled teal and the 10 wearing a radiating sunburst (frame 1). The header carries a gear, a gold coin stamped G over a balance of 0 with a green plus, and a "Rank" button drawn as a sack of coins.'
    ],
    systems: [
      { h: 'Choose, then Push or Merge', p: 'The interface separates selection from action: "Tap to Choose" picks a stack, and only then do "Push" or "Merge" apply (frame 1). Two buttons for one move means direction and combination are different decisions — Push relocates, Merge combines. No frame shows what either one does once pressed, so treat the first few moves as the tutorial.' },
      { h: 'Milestones at 5, 6, 7, 9 and 10', p: 'The node track under "Level 1" names the targets rather than a score, and the numbers are 5, 6, 7, 9 and 10 — note there is no 8 (frame 1). Since the live stacks start at value 1, every milestone is a stacking problem: you cannot reach 5 by pushing ones around, only by merging them repeatedly.' },
      { h: 'Temp Slots, keyholes and a locked-open tray', p: 'Three cells are reserved as "Temp Slot", each with a video-camera icon, and four more carry a keyhole (frame 1). The Temp Slots sit in the top row and the keyholes are split between the top-left and the middle row, so the tray opens in two different ways — one you buy with a video, one you reach.' }
    ],
    howTo: [
      'Tap a stack until the "Tap to Choose" callout is satisfied and the stack is framed in white (frame 1).',
      'Press "Merge" when the neighbour you are facing carries the same number; press "Push" when you only need to move a stack out of the way.',
      'Keep the two red 1-stacks apart until each has grown — merging two value-1 stacks wastes a merge that could have advanced both.',
      'Aim at the teal node on the track first. On Level 1 that is 5, and the rest of the track reads 6, 7, 9, 10 (frame 1).',
      'Use "Sort" when the tray is cluttered and you can no longer see which stacks match — but note it wears a video-camera badge, so it costs a video, not a tap.',
      'Open a "Temp Slot" only when the five open cells are genuinely full; the extra cell is parking space you paid a video for.'
    ],
    tips: [
      'The empty pedestals are not decoration — the middle-row and bottom-row grey columns are the cells you can grow stacks into, and there are three of them on this board.',
      'The coin balance read 0 on the frame (frame 1), so the early board is not a shopping exercise.',
      'The gold trophy beside "Level 1" and the "Rank" sack in the header are the two competitive elements; neither is required to play.',
      'Four keyhole cells and three Temp Slots means the tray opens up as you progress — later levels have more room, not more rules.'
    ],
    mistakes: [
      'Merging the first pair you see. With only five open cells, an early merge can lock the layout.',
      'Treating "Push" and "Merge" as the same button — one moves, the other combines, and only one of them advances a milestone.',
      'Counting the tray as a four-by-four grid. It is three rows of four, and most of it is closed on Level 1.'
    ],
    device: 'Portrait, with the tray filling the middle of the screen and Push and Merge as two large buttons side by side along the bottom edge. The "Tap to Choose" callout and hand cursor (frame 1) are sized for a phone, which is what the layout assumes. No keyboard control appears on any captured frame.',
    faq: [
      { q: 'What do Push and Merge do?', a: 'They are the two action buttons under the tray — yellow and purple respectively. You select a stack first, which the game labels "Tap to Choose" (frame 1), then Push moves it and Merge combines it. The frames we captured show the choice, not the result.' },
      { q: 'What are the Temp Slots?', a: 'Three cells across the top of the tray, each labelled "Temp Slot" and carrying a video-camera icon (frame 1). They are extra parking space bought with a rewarded video.' },
      { q: 'What do the numbers 5, 6, 7, 9 and 10 mean?', a: 'The milestone track under "Level 1". They are the stack values the level wants you to build; the 5 is filled teal as the current target and the 10 has a sunburst behind it as the last node.' },
      { q: 'Why are some cells locked?', a: 'Four cells show a keyhole rather than a pedestal (frame 1) — one at the top-left and three across the middle row. Five cells are usable at the start.' },
      { q: 'What is the Sort button?', a: 'A small control at the bottom-right of the tray: a blue-and-pink looped arrow with a video-camera badge and the label "Sort". The badge means it is video-backed; what it reorders is not shown in the frames we captured.' }
    ],
    shots: [
      'Level 1 as the game presents it: twelve tray cells of which five are open — three "Temp Slot" cells with video icons and four keyhole cells closing the rest — with the orange "Tap to Choose" callout and hand over a white-framed stack of red discs stamped 1, a second 1-stack two cells along, the milestone track reading 5, 6, 7, 9, 10 under "Level 1", and the yellow Push / purple Merge buttons with the video-badged "Sort" at the tray corner.'
    ]
  },

  hunterevolveuprising: {
    verdict: 'A portrait hunting game built on a staggered field of pale markers: a caveman with a club, gulls crossing the board, and a shop that sells a multiplier gear and a unit for meat.',
    about: [
      'The field is a staggered grid of pale six-sided flower-shaped markers under a blue sky with clouds and acacia trees, and the only living things on it are two white gulls (frame 1). A gold cup-shaped marker sits in the middle of the grid, and immediately to its right one of the flower markers is drawn in bright white with a cartoon gloved hand pointing at it — the game showing you where to tap. Above it all, a level badge reading 1 sits at the left end of a long, empty black bar, and a grey tab under it says "Campaign1".',
      'The lower half of the screen is a wooden panel under a blue sign reading "Shop", with a small triangle either side of the word. The first card is "Multiplier Gear": a gold gear with the number 1 in its centre, priced below with a meat icon and the number 10. The second is "Unit": a grey gear carrying a bearded caveman in a skin tunic holding a club, also priced at 10 meat. The third slot is an empty dark panel. The top bar explains the pricing — a coin counter reading 0 and a meat counter reading 30, so the currency that works here is meat, not coins.',
      'A translucent orange "Fight On!" button sits over the bottom edge of the shop panel, on cracked dirt scattered with rocks. At the far left and right edges of the panel two small bars — blue on the left, red on the right — sit over piles of grey rock. That pairing is the honest summary of the screen: you buy a multiplier and a unit with the meat you hold, then send the campaign forward.'
    ],
    systems: [
      { h: 'Meat is the working currency', p: 'The top bar carries two counters and they are not equal: coins read 0 while meat reads 30 (frame 1), and both shop cards are priced at 10 meat. Anything you earn on a hunt goes into the meat column, so the coin balance staying at 0 is normal rather than a problem.' },
      { h: 'A multiplier gear that shows its level', p: '"Multiplier Gear" is drawn as a gear with the number 1 in a circle at its centre (frame 1). It starts at 1, which tells you what the first purchase is for: raising that number, which scales whatever the run pays out.' },
      { h: 'Units, and a shop with a third empty slot', p: 'The "Unit" card shows a caveman holding a club set into a grey gear (frame 1) — the hunter is a purchasable body, not a fixed player character. The third shop slot is blank, so the panel has room for an offering you have not unlocked yet.' }
    ],
    howTo: [
      'Tap the white-highlighted marker the hand is pointing at, next to the gold cup — that is the first lesson the board gives (frame 1).',
      'Buy the Multiplier Gear before the second Unit. At 10 meat each and a starting 30, the multiplier is what makes the next hunt pay more.',
      'Aim at the gulls crossing the field rather than at the pale markers; the birds are the only moving objects on the board.',
      'Press "Fight On!" to commit the run once the shop is settled — the button sits over the panel\'s bottom edge for that purpose.',
      'Watch the black bar beside the level badge. It is the campaign progress meter, and it starts empty at level 1.',
      'Track the two small bars at the edges of the shop panel — blue on the left, red on the right — since they are the only indication on screen of who is winning a bout.'
    ],
    tips: [
      'The shop is open on the same screen as the board, so you can spend between shots without leaving the level.',
      'The gold cup marker in the middle of the grid is the one object that is not a marker or a bird — treat it as the aim point the tutorial is directing you to.',
      '"Campaign1" is a label, not a difficulty choice; there is only one campaign tab visible on the frame.',
      'A multiplier at 1 is the cheapest possible upgrade, which is why it is the first thing worth buying.'
    ],
    mistakes: [
      'Saving meat instead of buying the first multiplier. The gear pays for itself over a campaign.',
      'Reading the coin counter as your budget — it is the meat column that prices the shop.',
      'Shooting at the static pale markers. The field is scenery; the birds are the targets.'
    ],
    device: 'Portrait, and it was filed as landscape in our own catalogue before this rewrite. The board occupies the upper half of the screen and the shop the lower half, so the thumb rests naturally on the purchase buttons while the targets move above them. No keyboard control appears on any captured frame — the tutorial hand is pointing at a tap.',
    faq: [
      { q: 'What is the currency in Hunter: Evolve Uprising?', a: 'Meat. The top bar shows a coin counter of 0 and a meat counter of 30, and both shop cards are priced at 10 meat (frame 1).' },
      { q: 'What does Multiplier Gear do?', a: 'It is the first shop card, drawn as a gold gear with the number 1 at its centre and priced at 10 meat (frame 1). Buying it raises that number, which scales what your hunts pay out.' },
      { q: 'What is a Unit?', a: 'The second shop card — a grey gear showing a bearded caveman holding a club, also 10 meat. The hunter you play is a purchasable unit rather than a fixed character.' },
      { q: 'Is it landscape?', a: 'No. It draws a vertical board with the shop underneath it (frame 1). Our metadata said landscape; the capture contradicted that and it has been corrected.' },
      { q: 'What are Campaign1 and Fight On!?', a: '"Campaign1" is the label on the tab under the level bar, and "Fight On!" is the translucent orange button over the bottom edge of the shop panel (frame 1).' }
    ],
    shots: [
      'The board and the shop together: a staggered field of pale six-sided markers with two gulls in flight, the tutorial hand on a white-highlighted marker beside a gold cup, "Campaign1" under the level-1 progress bar, and the wooden Shop panel selling a Multiplier Gear and a caveman Unit for 10 meat each above the "Fight On!" button, with a blue bar at the panel\'s left edge and a red one at its right.'
    ]
  },

  smashblocks: {
    verdict: 'A triple-match tile game: tap blocks out of a nine-by-nine grid whose centre three columns are stacked with symbols, into a three-cell tray, where three identical symbols vanish.',
    about: [
      'The board is a grid of nine columns by nine rows of dark cells, and only the three centre columns hold tiles (frames 1–2). Those tiles are colour-coded and each colour carries its own symbol — red with a diamond, green with a green gem, purple with a triangle, orange with a coin, blue with a pale crystal. Four rows run down from the top (red, green, purple, orange), then two empty rows, then three more (blue, red, green). That gap is the whole puzzle: you are clearing a column of symbols, not hitting a wall with a ball.',
      'Tucked under the bottom row of the grid is a strip of three cells, drawn semi-transparent with a faint orange coin inside each one, and the tutorial hand points straight at it (frame 1). Below that, separated by open sky, is a tight row of three solid orange coin tiles (frames 1–2). Nothing on screen labels either element, so the honest reading is: the strip the hand is on is the tray a tapped tile lands in, and the solid row is what is coming next. Three identical symbols in the tray clear them; three different ones is the dead end this genre is built around.',
      'The header holds a crown counter reading 0, a trophy button, a settings gear and a large score of 0 in the middle. Along the bottom edge are two tools, each wearing a white video-camera badge: a lit black bomb labelled "Clear 10+", and a red heart carrying a white infinity sign, labelled "Refresh" (frames 1–2).'
    ],
    systems: [
      { h: 'A three-cell tray is the entire risk', p: 'The strip under the board holds exactly three tiles (frames 1–2). Every tap commits one of those three positions, so the game is a packing problem: a tap that cannot possibly complete a triple is not neutral, it is one third of your remaining life spent.' },
      { h: 'Symbols matter more than colours', p: 'Each colour carries a distinct shape — diamond, gem, triangle, coin, crystal — and no two colours share one (frames 1–2). Matching is on the symbol, so reading the shape rather than the colour is the safer habit when the board gets busy, especially with red appearing twice in the stack.' },
      { h: 'Two escapes, both behind a video', p: '"Clear 10+" is the bomb and "Refresh" is the heart, each badged with a video-camera icon (frames 1–2). They are the only recovery options visible on screen, and neither shows a coin price — the crown counter read 0 throughout. The heart also carries an infinity sign, which is the only hint on screen that one of the two is not counted out.' }
    ],
    howTo: [
      'Before tapping anything, count how many of each symbol are visible in the centre columns. A symbol with only two on the board can never complete a triple (frames 1–2).',
      'Tap a tile to send it to the tray, and keep the tray showing pairs rather than singles whenever you can.',
      'Never fill the third cell with a lone symbol when a matching pair is still on the board — clear the pair first.',
      'Work the stack in runs. The board is two blocks here, four rows above the gap and three below, and the lower block is the one you can see whole.',
      'Save "Clear 10+" for a tray holding three unmatched symbols, which is the only state that actually loses the run.',
      'Use "Refresh" when the remaining board has no pair you can reach, not when the board merely looks tedious — it is the heart with the infinity sign, so it is the one that stays available.'
    ],
    tips: [
      'The row of three orange coin tiles under the tray is the preview — checking it is free and prevents most dead trays.',
      'The two empty rows in the middle of the stack are not slack, they are where the board gets awkward later.',
      'The score in the header stayed at 0 across our frames, so early clears are about surviving the tray rather than building a number.',
      'The crown counter and the trophy button are a separate progression track from the score; neither was needed to start a board.'
    ],
    mistakes: [
      'Calling it a break-out game. There is no launcher, no angle and no bouncing — the verb is a single tap into a three-cell tray.',
      'Tapping a tile because it looks satisfying rather than because it completes or sets up a triple.',
      'Using the bomb early. It is the only thing that saves a jammed tray, and a video costs real time.'
    ],
    device: 'Portrait, with the grid occupying the upper two-thirds and the tray, preview row and two tools stacked below it — all reachable with one thumb. The tiles are large relative to the board because only three of the nine columns are populated, which makes mis-taps rare even on a small phone. No keyboard control appears on any captured frame.',
    faq: [
      { q: 'Is Smash Blocks a brick-breaker?', a: 'No. There is no paddle, ball or launch angle anywhere on screen. The board is a grid of symbol tiles and you tap them into a three-cell tray to match three of a kind (frames 1–2).' },
      { q: 'How do you lose?', a: 'By filling the three tray cells with symbols that do not form a triple. The tray is the only fail state visible on the board.' },
      { q: 'What does Clear 10+ do?', a: 'It is the bomb at the bottom-left, badged with a video-camera icon, and its label reads "Clear 10+" (frames 1–2) — ten or more tiles at once. What it clears is named by the label, not shown by any frame.' },
      { q: 'What is Refresh?', a: 'The red heart at the bottom-right, also video-backed, and drawn with a white infinity sign on it (frames 1–2). The label says it refreshes the board; the infinity is the only quantity shown anywhere on it.' },
      { q: 'What are the three orange tiles under the tray?', a: 'A row of three coin-symbol tiles sitting below the tray strip (frames 1–2). Nothing labels them, but they are the only other three-wide element on the screen and they read as the incoming queue.' }
    ],
    shots: [
      'The opening board: a nine-by-nine grid with the centre three columns stacked red, green, purple and orange, two empty rows, then blue, red and green — and the tutorial hand pointing at the translucent three-cell tray strip with a faint orange coin in each cell.',
      'The same board with the hand moved up onto the tiles themselves, the preview row of three solid orange coin tiles clear below the tray, and the two video-badged tools along the bottom: the lit bomb "Clear 10+" and the infinity-marked heart "Refresh".'
    ]
  },

  blockpuzzlesavegirl: {
    verdict: 'An arrow-sequence puzzle with a dragon for a clock: lay arrows into a six-slot tray so a box reaches the girl, while a segmented dragon crawls the same road toward her.',
    about: [
      'Across the top of the screen runs a grey serpentine road folded back on itself over a wall of pale hexagonal stone. A speech bubble reading "Help!" hangs over a girl in a purple gown and crown, and "Level 1" is printed at the centre with a white pause button at the top-right (frame 1). Then the dragon arrives: a long body of overlapping scales in yellow, green, red and blue, its red head at the left end of the road (frames 2–3). In the third frame its mouth is open and a tongue of fire comes out. That is the timer in this game — not a clock, an approaching dragon.',
      'The middle of the screen is a tray of six circular slots on a blue-grey band. The outer two are labelled "UNLCOK" — the label as the build actually renders it, with the final E cut off — and each carries a video-camera icon beneath the text; the four between them are plain dark circles with dashed outlines. Every one of the six is empty in all three frames we captured (frames 1–3), so this is the pre-move state, not a solved one.',
      'Below the tray, four blocks are arranged in a cross, each a coloured arrow: green pointing up at the top, yellow pointing left, red pointing right, and blue pointing down at the bottom, with the tutorial hand on the yellow one in every frame (frames 1–3). A dark grey caption bar above them states the rule in four words — "Box moves arrow way". Notably, no box appears anywhere in the captured frames: the caption names one and the tray is where it would be instructed, but we never photographed the object itself.'
    ],
    systems: [
      { h: 'A tray of four, expandable to six', p: 'Only the four middle slots are usable at the start; the two ends read "UNLCOK" with a video-camera icon (frames 1–3). Since the road folds back on itself, four moves is likely the whole budget you have, and the two extra slots are the difference between a route that reaches the girl and one that runs out of arrows short of her.' },
      { h: 'The dragon is the clock', p: 'Frame 1 has no dragon on the road at all. In frames 2 and 3 its body fills the top run of the road with its head at the left and the girl further along it to the right, and by frame 3 it is breathing fire (frames 1–3). Nothing on screen counts down, so the pressure is entirely visual — you are reading how much road the dragon has covered, not how much time is left.' },
      { h: 'Four arrows, one instruction', p: 'Up, down, left and right, each a different colour, laid out in a cross under the tray (frames 1–3). "Box moves arrow way" means the sequence is executed in order, so the puzzle is planning a route through the folds of the road from a fixed set of four directions.' }
    ],
    howTo: [
      'Trace the road with your eye first. It runs along the top, folds back below, and folds again, and the girl is standing on it (frames 1–3).',
      'Put an arrow into the leftmost tray slot — the sequence reads left to right, and "Box moves arrow way" is executed in that order. None of our frames shows a filled slot, so expect the first placement to be the lesson.',
      'Build only as far as you can see. A spare slot is worth more than a wrong arrow.',
      'Watch the dragon while you plan, not the timer you wish were there — the distance it has covered along the road is the only budget shown.',
      'Unlock a fifth or sixth slot on levels where the road folds more than twice, since four arrows will not cover the route.',
      'If the run stops short, change the direction of the last arrow before adding more length to the sequence.'
    ],
    tips: [
      'The four arrow colours are fixed: green up, blue down, yellow left, red right. Learning them removes a lookup on every attempt.',
      'The pause button is the white circle at the top-right, which is the one thing on this screen that can stop the clock.',
      'The coin counter read 0 on all three frames, so early levels are not about buying anything — the only paid action visible is the video-backed UNLCOK.',
      'A route that looks shortest is often the one with the most bends; each bend costs a slot.'
    ],
    mistakes: [
      'Filling all four slots before checking where the first arrow sends things.',
      'Reading this as a sliding-block puzzle. Nothing on the board is rearranged — you are programming a path, not pushing tiles.',
      'Ignoring the two UNLCOK slots on later levels, where the road needs more moves than four.'
    ],
    device: 'Portrait, and split into three clear bands: the road and the girl at the top, the tray across the middle, the arrow blocks at the bottom where a thumb naturally rests. The dragon and the girl are both large enough to read at a glance on a phone, which matters because they are the timer and the goal. No keyboard control appears on any captured frame.',
    faq: [
      { q: 'What does "Box moves arrow way" mean?', a: 'It is the game\'s own caption for the rule, in a grey bar above the arrows (frames 1–3): the box follows the arrows you place in the tray, in order, and each arrow gives one direction — up, down, left or right. Worth knowing: no box is visible in any frame we captured, so the caption is the only place the word appears.' },
      { q: 'What is the dragon for?', a: 'It is the timer. It crawls along the same road toward the girl — absent in frame 1, on the road with its head at the left in frame 2, and breathing fire in frame 3. If it gets there first, the level is lost.' },
      { q: 'Why do two tray slots say UNLCOK?', a: 'That is the label as the build renders it — "UNLOCK" with the last letter cut off. The board starts with four usable slots; the outer two show that label over a video-camera icon (frames 1–3), and unlocking them gives you more moves in a sequence.' },
      { q: 'Is this a block-sliding puzzle?', a: 'No. The blocks never slide. You place arrow tiles into a sequence tray and a box walks that route along the road.' },
      { q: 'What happens when the box reaches the girl?', a: 'We captured the setup, not the rescue — all six tray slots are empty in every frame, and our last frame ends with the dragon breathing fire. So we are describing what is on screen rather than the win screen.' }
    ],
    shots: [
      'Level 1 before anything moves: the grey road folded over a hexagonal stone wall, the girl in a purple gown under a "Help!" bubble at its left end, the six-slot tray with both outer slots labelled "UNLCOK" over a video icon, and the four arrow blocks in a cross under the caption "Box moves arrow way".',
      'The dragon on the road — a long body of yellow, green, red and blue scales along the top run, its red head at the left and the girl standing further along it to the right, with the tutorial hand still on the yellow left-arrow.',
      'The same level a moment later with the dragon\'s mouth open and a tongue of fire coming out of it, and the tray still empty.'
    ]
  },

  groceryadventuremaster: {
    verdict: 'A timed triple-match on supermarket shelves: "Collect 3 to clear the shelf!", with an alarm clock counting down from 03:24 and four one-charge tools under the board.',
    about: [
      'The rule is printed above the board in its own words: "Collect 3 to clear the shelf!" (frames 2–3). The shelf itself is six wooden compartments set at staggered heights against a tan wall, holding four kinds of produce — a mango, a bunch of two cherries, a spiky yellow durian and a bumpy green cucumber. Count them on the Level 1 board and there are exactly three of each, twelve items in four triples, scattered so that matching pieces sit in different boxes at different heights (frames 2–3).',
      'The header makes this the most constrained puzzle in our sorting group: a gear and "Level 1" on the left, an alarm-clock icon over 03:24 in the middle, and a gold coin pill reading 0 on the right (frame 2). By frame 3 the clock had fallen to 03:13 with the board completely unchanged, so it counts down while you look rather than up while you play. No other game in this category combines a countdown with a triple-match rule.',
      'Under the board are four tools, each badged with a single charge: "Power" on a blue clock face carrying a snowflake, "Clear" on a black bomb, "Refresh" on a pair of green-and-yellow looped arrows and "2X Rewards" on a gold star marked x2 (frames 2–3). The title screen adds the economy around them — a "Gift" button drawn as an open chest of pink gems with a purple pill reading "0/5", a "Spin" wheel, and a "+1000" present, all under the yellow "Start Game" button (frame 1).'
    ],
    systems: [
      { h: 'Three of a kind, anywhere on the shelf', p: 'The caption says collect three, and the produce is scattered rather than lined up (frames 2–3). The cherry bunches are the clearest example on this board: there are exactly three of them, one in a top compartment and two in the bottom-left one, so the cheapest clear available is the item that already appears in threes. Counting what is left of each kind is the whole opening move.' },
      { h: 'A countdown, not a move limit', p: '03:24 on one frame and 03:13 on the next with nothing else changed (frames 2–3). This is the only puzzle in the category where the clock is the fail state rather than a tray or a step budget, which is why the "2X Rewards" star exists — it doubles what a finished board pays, not what time you have.' },
      { h: 'Four tools, one charge each', p: 'Power, Clear, Refresh and 2X Rewards all show a badge of 1 (frames 2–3). They are single-use, and the coin balance of 0 means none of them can obviously be bought back mid-board.' }
    ],
    howTo: [
      'Press "Start Game" on the title screen (frame 1) and read the shelf before tapping — the clock is already running by then.',
      'Find the kind that already has three copies visible. On this board cherries appear as three bunches and the other three kinds also appear three times each (frames 2–3).',
      'Tap the three matching items to clear their slots; anything left hanging after a clear stays where it is, so plan the next triple while you tap.',
      'Work the compartments with two items in them first — a mango and a cherry bunch sharing a box tells you two kinds at once, which the single-item boxes do not.',
      'Use "Refresh" when the remaining produce cannot form a triple, and "Clear" when the clock is low and the shelf is still busy.',
      'Save "2X Rewards" for a board you are certain to finish — it doubles the payout, and a doubled zero is still zero.'
    ],
    tips: [
      'The four kinds on Level 1 are mango, cherry, durian and cucumber. With only four kinds and three of each, the puzzle is spotting them at different heights rather than finding them at all.',
      'The coin balance read 0 on every frame, so the "Spin" wheel and the "+1000" present on the title screen are the only ways in that are visible before you have played.',
      'The "Gift" pill reads 0/5 (frame 1) — that is a count out of five, not a timer, so treat it as a set of prizes you work through.',
      'Because the clock starts before you see the board, the first ten seconds of a run are usually spent orienting. Memorising the tool row costs you nothing and saves those seconds.'
    ],
    mistakes: [
      'Treating it as a tidying game. The caption is explicit — "Collect 3 to clear the shelf!" — and the clock is what ends the run.',
      'Tapping a lone item because it looks like half a pair. Only triples clear.',
      'Spending a charged tool early; every one of the four starts at a single charge with no coins to replace it.'
    ],
    device: 'Portrait. The shelf occupies the middle third with the timer directly above it and the four tools in a row below, so the whole decision surface is between two thumb positions. The compartments are small on a phone — the durians and cucumbers are the easiest two to confuse at arm\'s length, which is worth knowing before you blame the board.',
    faq: [
      { q: 'What is the goal in Grocery Adventure: Master?', a: 'The game states it above the board: "Collect 3 to clear the shelf!" (frames 2–3). Tap three of the same produce item to empty those slots before the clock runs out.' },
      { q: 'Is there a time limit?', a: 'Yes — an alarm-clock icon in the header reads 03:24 on one frame of Level 1 and 03:13 on the next, with the board otherwise identical (frames 2–3). It is the only timed triple-match in this category.' },
      { q: 'What do the four buttons under the board do?', a: '"Clear" is a bomb, "Refresh" is a pair of looped arrows, "Power" is a blue clock face with a snowflake on it and "2X Rewards" is a gold star marked x2. Each starts with one charge (frames 2–3). The names are the evidence — no frame shows any of them being used.' },
      { q: 'What are Gift, Spin and +1000 on the title screen?', a: 'An open chest of pink gems with a "0/5" pill, a segmented wheel and a purple present labelled "+1000", sitting in a row under the "Start Game" button (frame 1). They are the economy you draw on before a run.' },
      { q: 'How many item types are on the first shelf?', a: 'Four, three of each: mango, cherry bunch, durian and cucumber — twelve items across six compartments (frames 2–3).' }
    ],
    shots: [
      'The title screen: the Grocery Adventure: Master logo with a tangerine and a green apple, the yellow "Start Game" button, and Gift with its "0/5" pill, Spin and +1000 along the bottom.',
      'Level 1 with the caption "Collect 3 to clear the shelf!", the alarm clock at 03:24, mangoes, cherry bunches, durians and cucumbers spread over six staggered wooden compartments, and the four single-charge tools Power, Clear, Refresh and 2X Rewards.',
      'The same shelf with the clock down to 03:13 and not one item moved — the frame that proves the timer is counting down while you read the board.'
    ]
  },

  puzzlewatersort: {
    verdict: 'A liquid-sorting puzzle — the build calls itself "Hue & Brew" on screen — where coloured drinks have to be gathered into single bottles, with three charges each of shuffle, undo and a bottle tool.',
    about: [
      'The header chip does not say Water Sort. It reads "Hue & Brew" (frame 1), and that is the name the build uses for itself; the catalogue entry above it is ours. Beside the chip is a gold coin pill reading 1000 with a green plus, a purple settings gear at the right, and a blue level tab reading "Lv 1" underneath.',
      'The board is two glass bottles standing on a dark starfield, each holding a column of liquid. The left one is about two-thirds full of a deep red drink under a grey rim; the right one is nearly empty with a short, brighter red layer at its bottom under a white rim, and a white gloved hand points at it from the right (frame 1). The rule of the genre follows from that picture: you pour from one bottle to another, and a bottle only accepts a pour if the colour it receives matches what is already on top.',
      'The caption across the middle reads "All drinks done - Level cleared!" (frame 1), so the board we photographed is a finished one — which is why only two bottles remain in play. Along the bottom is a rounded tool bar of three buttons, each badged with 3 charges: a purple button with crossed arrows, a dark button with a counter-clockwise circular arrow, and a dark button showing a bottle marked with a plus. Our three captured frames are the same state, so everything here is read off that one board.'
    ],
    systems: [
      { h: 'One colour per bottle, and only the top layer matters', p: 'The two bottles on screen both end in red (frame 1). In a pour puzzle the surface is what a new liquid lands on, so a bottle that looks nearly finished can still be the blocker — the colour at the top decides what you are allowed to move anywhere else on the board.' },
      { h: 'Three tools, three charges each', p: 'The shuffle, the undo and the bottle-with-a-plus all carry a badge of 3 (frame 1). Undo is the one that pays for itself: a bad pour in this genre is rarely fatal, it is just unrecoverable without it.' },
      { h: 'A coin balance you start with', p: 'Unlike most games here, which open at 0, this one shows 1000 coins on the very first frame with a green plus beside it (frame 1). The balance is a stock you draw on, and the plus is where more comes from.' }
    ],
    howTo: [
      'Read the surface of every bottle before pouring. Only the top colour of a bottle is reachable (frame 1).',
      'Tap the bottle you want to pour from, then the bottle you want to pour into.',
      'Prefer pouring onto a bottle that already holds the same colour and still has room, rather than opening an empty bottle you may need later.',
      'Keep at least one bottle empty if you can — a spare bottle is the only space the puzzle gives you to reorder.',
      'Use undo the moment a pour turns out to block you, while the three charges still cover more than one mistake.',
      'Save the shuffle for a board where no legal pour exists at all; it rearranges everything, including the parts you had already solved.'
    ],
    tips: [
      'The caption "All drinks done - Level cleared!" (frame 1) is the win message, and it tells you the goal is expressed in drinks, not in score.',
      'A bottle with a short layer at the bottom, like the right-hand one the hand is pointing at, is the easiest place to build a finished colour.',
      'The level tab reads "Lv 1" — the progression is a straight ladder rather than a map.',
      'Three charges is the whole tool budget for a run, so counting them is as useful as counting the bottles.'
    ],
    mistakes: [
      'Filling the last empty bottle. Once every bottle is occupied and none of them match, the shuffle is the only way out.',
      'Pouring a colour onto itself when the receiving bottle has a different colour under the surface — it looks progress and is not.',
      'Spending all three undos early, then playing the rest of the board defensively.'
    ],
    device: 'Portrait, with the bottles standing in the middle of a dark field and the three tools in a rounded bar along the bottom. The bottles are wide enough to tap accurately on a phone even when four or five share a row, which is the main reason this genre works one-handed. No keyboard control appears on any captured frame.',
    faq: [
      { q: 'Why does the game say Hue & Brew?', a: 'That is the name the build gives itself — it is printed in the chip at the top of the screen (frame 1). "Puzzle: Water Sort" is the title we list it under in the catalogue.' },
      { q: 'What is the goal?', a: 'Gather each colour into a single bottle. The win caption on the board reads "All drinks done - Level cleared!" (frame 1).' },
      { q: 'What are the three buttons at the bottom?', a: 'A shuffle on crossed arrows, an undo on a counter-clockwise arrow, and a bottle marked with a plus — each badged with three charges (frame 1). They are limited, not on a timer.' },
      { q: 'Is there a time limit?', a: 'Nothing on the captured frame counts down. The pressure is the number of bottles and the three tool charges.' },
      { q: 'Why do I start with 1000 coins?', a: 'The balance shown in the header is 1000, with a green plus to add more (frame 1). It is the currency the tools and any extra helps draw on.' }
    ],
    shots: [
      'A cleared Lv 1 board: two glass bottles of deep red drink on a starfield — one two-thirds full, one with a short layer at its bottom that the tutorial hand points at — the header chip reading "Hue & Brew" beside 1000 coins and a purple gear, the caption "All drinks done - Level cleared!", and the tool bar of shuffle, undo and a plus-marked bottle each badged 3.'
    ]
  },

};

/*
 * Category-page copy. Written from the captured frames of the games actually filed in each
 * category, not from the old shared template — which named titles belonging to a different
 * category and described mechanics the builds do not have.
 *
 * One fact the captures overturned: every game on this site draws a portrait canvas. Five
 * of them were catalogued as landscape (Ace Strike, Arrow Maze Solve, Hunter: Evolve
 * Uprising, Tank Era, Shift Dash Reac) and all five render vertically, so the previous
 * "X of them want landscape" sentences on these pages were wrong and are gone.
 */
export const CAT_COPY = {

  puzzle: {
    lead: 'Twelve puzzle games here, and the interesting part is that they share almost no mechanics: sorting, matching, merging, routing and shooting a bubble all live under the same label. Every one of them draws a portrait board.',
    body: [
      'Four of the twelve are sorting puzzles, and they sort different stuff. Hue & Brew — listed here as Puzzle: Water Sort — pours coloured drinks between glass tubes until each tube holds one colour, and gives you three charges each of shuffle, undo and a bottle tool. Puzzle Hex is the same idea with hardware: hex nuts moved between threaded bolts, with an undo button the game labels "Revoke". Puzzle Yarn Fun sorts yarn off a hexagonal board into spool lanes, and its tutorial line is literally "First check order colors". Spin Screw Jam does it with screws and overlapping plates, filing each colour into a box with three holes.',
      'Three are matching puzzles that only look alike. Royal Matcher is the only true swap-three here: an eight-by-eight grid, a printed goal of 8 flowers and 7 castles, and 22 steps to do it in. Grocery Adventure: Master matches triples on supermarket shelves under a running stopwatch — "Collect 3 to clear the shelf!" — and Smash Blocks, filed under arcade, sends tapped tiles into a three-slot tray. Chroma Jam sits between the two: tap coloured blocks off a tray into matching side racks, with 05:00 on the clock.',
      'Two are planning puzzles. Arrow Maze Solve is a single wiring-diagram board with a five-minute clock, three hearts and a zoom slider under the puzzle. Block Puzzle: Save Girl makes you program a route — the rule is printed as "Box moves arrow way" — while a segmented dragon crawls along the same track toward a princess, so the timer is something you can see coming.',
      'The last three are harder to classify, which is why they are worth trying first. Satisfying Stack is a merge game on a four-by-four tray where you "Tap to Choose" and then Push or Merge toward milestones at 5, 6, 7, 8 and 10. Bubble Safari is a bubble shooter with a shot budget in the reticle and four ad-charged power-ups. Wizard Sort is listed as a separate entry but is the same build as Hue & Brew down to its level files, so read the Water Sort page for what it actually plays like.'
    ],
    faq: [
      { q: 'Which of these is a real match-3?', a: 'Royal Matcher is the only swap-three: an eight-by-eight grid of five tile types with a collection goal and a step budget printed in the header. Grocery Adventure: Master and Smash Blocks match in threes but do not swap tiles, and Puzzle Yarn Fun is a colour-sort despite what its blurb says.' },
      { q: 'Which puzzle games are timed?', a: 'Chroma Jam counts down from 05:00, Arrow Maze Solve from 04:55, and Grocery Adventure: Master from 03:24. Block Puzzle: Save Girl has no clock but sends a dragon along the track instead. The rest are untimed.' },
      { q: 'Do any of them need landscape?', a: 'No. All twelve draw a portrait canvas. Five games in this catalogue were filed as landscape until we captured them, and every one of those entries was wrong.' },
      { q: 'Which is hardest?', a: 'On the evidence of the first board, Arrow Maze Solve — it is the only one that charges you for help, with hints priced at 200, 300 and 400 coins against a starting balance of 1000, and it puts three lives and a clock on the same screen.' },
      { q: 'Is Wizard Sort a different game from Puzzle: Water Sort?', a: 'Not in the builds we ship. The two folders share identical level data and the same on-screen title, "Hue & Brew"; only the wrapper differs. The Water Sort guide describes both.' }
    ]
  },

  action: {
    lead: 'Four action games, all portrait, and none of them is a twin-stick shooter: a vertical space shooter, a hunting campaign, a car with a turret on it and a zombie game whose first screen is a location map.',
    body: [
      'Ace Strike is the closest to a classic shooter. A small fighter sits at the bottom of a moonlit foreground firing cyan bolts upward at burning planets that drift down carrying numbers — 1, 2, 7, 13 and 79 were all visible in one frame — and the level is measured as a percentage called Xeno-Virus. The menu states the control in three words: "Swipe to Engage". There is no fire button; you move and the guns run themselves.',
      'Hunter: Evolve Uprising is a hunting game played over a hexagonal bush field with gulls crossing it, and its economy is meat. The shop panel under the board sells a "Multiplier Gear" and a "Unit" — a caveman with a slingshot — for 10 drumsticks each, and a translucent "Fight On!" button starts the bout. Coins and meat are separate counters, and it is the meat that prices things.',
      'Tank Era is a car with a roof-mounted turret seen from directly above, driving toward the top of a desert road. Its garage screen offers three choices and nothing else: "Pick color", "Buy a car" and a heart badged "+1000" behind a video, with a cash balance of 2000 to spend. Because the turret points where the car points, steering is the aiming.',
      'Zombie Down is the one that shows you a map first: twelve location cards — Wilderness, Tunnel, Town, Forest, Factory, Basement, Hospital, School, Prison, Laboratory, Ruins and Nightclub — each with a coin price, an Easy, Norma or Hard label and a star count. Three are open on a fresh load and the rest are padlocked, and a "Daily Check-in" panel pays 200 to 700 coins before you ever see it.'
    ],
    faq: [
      { q: 'Are any of these landscape games?', a: 'No. All four render portrait. Every one of them was catalogued as landscape or described that way on this site until we captured the builds and checked.' },
      { q: 'Which one has the simplest controls?', a: 'Ace Strike. The menu instruction is a single swipe — "Swipe to Engage" — and the ship fires on its own with no button to press.' },
      { q: 'Do I need to sign in to play any of them?', a: 'No. Zombie Down offers a "Sign In" button on its map and Tank Era has no account screen at all, but none of the four requires an account to start.' },
      { q: 'What do the rewarded videos get you?', a: 'The free currency in each. Tank Era tops up hearts for "+1000" behind a video, Hunter: Evolve Uprising unlocks extra shop slots, and Ace Strike has a "Get Coins" button and a "Claim Now" card, both video-backed.' },
      { q: 'Which is the odd one out?', a: 'Zombie Down. It is the only one of the four whose first screen is a location map rather than the game itself, and the only one that opens with a daily reward panel covering the board.' }
    ]
  },

  arcade: {
    lead: 'Two arcade games, and they have almost nothing in common beyond being quick to pick up: a triple-match tile game and a lane runner. Both draw portrait.',
    body: [
      'Smash Blocks is a matching game, not a brick-breaker — the name is the only thing that suggests otherwise. A nine-by-eight grid holds symbol tiles in the three centre columns: red diamonds, green circles, purple triangles, orange coins and blue arrows. You tap a tile and it goes into a tray of three slots below the board; three identical symbols clear, three different ones end the run. A row of three squares previews what is coming, and two video-backed tools sit under it, a bomb labelled "Clear 10+" and a "Refresh".',
      'Shift Dash Reac is a runner on a four-lane road cut diagonally across a green hillside, and the start screen gives you one instruction — "Tap the screen to start" — and one named control, a wheel button labelled "Turn". There is no joystick anywhere on it. The rest of the interface is a column down the right edge: Sign In, Turn and Shop, with a character showcase standing on some steps above them.',
      'The two share an economy rather than a mechanic. Smash Blocks gives you no currency at all — its crown counter read 0 across every frame we took — while Shift Dash Reac pays out skin fragments during runs, announcing one on screen as `Got"Iron Man"Skin Fragment – Success!` and keeping a balance of coins for its shop.'
    ],
    faq: [
      { q: 'Is Smash Blocks a brick-breaker?', a: 'No. There is no paddle, ball or launch angle on screen. You tap symbol tiles out of a grid into a three-slot tray and match three of a kind.' },
      { q: 'How do you steer in Shift Dash Reac?', a: 'With the "Turn" wheel in the right-hand column. It is the only control the start screen names, and the game begins from a plain tap.' },
      { q: 'Are either of them landscape?', a: 'No. Both render portrait. Shift Dash Reac was filed as landscape here until we captured it and found it drawing sideways.' },
      { q: 'Which is the faster game?', a: 'Shift Dash Reac — it is a runner, so the board moves whether you are ready or not. Smash Blocks waits for your tap, and its only pressure is the three-slot tray.' }
    ]
  }
};
