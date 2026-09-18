/*
 * Tapzens guides — build-time editorial articles rendered to /guides/<slug>.html.
 * Written from facts that are verifiable in this repository (the catalogue itself,
 * the control model of each game, and what the build and compliance audit actually do).
 * No invented statistics, no testimonials, no claims about traffic or audience size.
 */
export const ARTICLES = [
  {
    slug: 'sorting-puzzles',
    title: 'Sorting puzzles: the single rule behind every sort game',
    desc: 'Water glasses, screws, grocery shelves and item stacks all run on one constraint. Understand it and every sorting puzzle on Tapzens gets easier.',
    kicker: 'Genre guide',
    minutes: 5,
    intro: [
      'Four games in our catalogue look nothing alike: Puzzle: Water Sort pours coloured liquid between bottles, Spin Screw Jam lifts screws out of wooden plates, Grocery Adventure: Master tidies shop shelves, and Satisfying Stack consolidates piles of items. They share an art style no more than a chess board shares a parking lot. But they are the same game, and once you see the shared shape you will play all four better.',
      'The shared shape is a resource you never get back. In each of these puzzles, every action moves a thing into a space that then stops being available, and the only way to recover the space is to finish a group. So the difficulty is never “can I make this move” — it is “have I just destroyed my ability to make the four moves after it.”'
    ],
    sections: [
      {
        h: 'The rule, stated once',
        p: [
          'A sorting puzzle lets you relocate one item (or one top layer) into a space that is either empty or already accepts that item. Completing a group frees the space it occupied. That is the whole mechanic, and every strategy in this genre follows from one corollary: free space is the resource, and items are the obstacle.',
          'Players who are new to the genre instinctively treat the items as the problem — “I need to get these four red things together.” Players who are good at it treat space as the problem and items as whatever is currently occupying it. The difference shows up in the mid-game, when a beginner has grouped three of the four colours and now has nowhere to put anything.'
        ]
      },
      {
        h: 'Why the last empty slot is where boards die',
        p: [
          'Every sorting puzzle hides a hard wall behind a soft-looking middle. While there are gaps, many moves are legal and the board feels manageable. The moment the final free space is filled with something that cannot be completed, the number of legal moves drops to zero and the layout is over.',
          'This is why the instinct to “finish what is nearly done” is often wrong. A near-complete group that consumes your last parking space is a worse trade than leaving it incomplete. In water-sort games this is the classic mistake: one blue unit sits alone at the top of a bottle, and pouring it into the last empty bottle ends the board. In Screw Jam it is pulling a colour you cannot finish, filling the tray with three unrelated screws. In the shelf and stack games it is moving an item into the only gap because it looked like the right place.'
        ],
        list: [
          'Count free spaces before you act, not just matching items.',
          'Never take the count of available spaces to zero unless the move that does it also completes a group.',
          'When a board stops being fun, it is usually because you have three partial groups competing for one gap. Resolve one completely rather than improving all three.'
        ]
      },
      {
        h: 'Ordering: work from the constraint, not from the surface',
        p: [
          'The second universal technique is to identify what is most constrained and handle it first. In these puzzles the constrained thing is rarely the obvious thing.',
          'In water sort, it is the colour with only one or two units left somewhere buried at the bottom of a tall bottle — that colour cannot be moved until everything above it is lifted, so it dictates your order long before you touch it. In Screw Jam, it is the plate at the bottom of the stack, whose screws are physically unreachable until the plates above are free. On the shelf and stack games, it is the item that sits between two groups: it is in the way of more than one plan, so it should move first even though it is not part of either.'
        ]
      },
      {
        h: 'Reading a board you cannot undo',
        p: [
          'Most of these games let you undo a move, but not all of them, and undo changes what you should be practising. Where undo exists, you can afford to probe: make the uncertain move, look at what it revealed, step back. Where it does not exist — Spin Screw Jam has no undo — a wasted pickup is permanent for that attempt, and the correct habit is to spend the first ten seconds doing nothing except reading.',
          'A useful trick that works on all four games: before moving, say out loud what the board will look like after the move. If you cannot describe the resulting arrangement of gaps, you are not planning, you are reacting. Reacting is what makes an easy board fail.'
        ]
      },
      {
        h: 'Which of our four to start with',
        p: [
          'If you want the gentlest introduction, start with Satisfying Stack. It shows you the whole state at once, has few pieces, and the feedback makes each correct decision obvious. Puzzle: Water Sort is the deepest of the four and the one with the most modes to explore once the base rule clicks. Spin Screw Jam is the harshest — tight trays and no undo — and it is best played after you already think in terms of space. Grocery Adventure: Master sits in the middle and is the most relaxing, because its goals are narrower than its boards.',
          'They are all free, they all run in a browser with no install, and none of them needs an account.'
        ]
      }
    ],
    closing: 'Once you start seeing these boards as space rather than as objects, the genre stops being about spotting matches and starts being about sequencing — which is the same skill in a different coat, and the reason a good sort puzzle is satisfying for far longer than its simple rule suggests.',
    links: [
      { label: 'Puzzle: Water Sort', href: '/g/puzzlewatersort.html' },
      { label: 'Spin Screw Jam', href: '/g/spinscrewjam.html' },
      { label: 'Grocery Adventure: Master', href: '/g/groceryadventuremaster.html' },
      { label: 'Satisfying Stack', href: '/g/satisfyingstack.html' }
    ]
  },

  {
    slug: 'match-3-move-budget',
    title: 'Match-3 is a budgeting game, not a spotting game',
    desc: 'Three swap-and-match puzzles on Tapzens, one shared lesson: the move counter decides almost everything and the pretty board decides almost nothing.',
    kicker: 'Strategy',
    minutes: 6,
    intro: [
      'Every match-3 on this site — Puzzle Yarn Fun, Royal Matcher and Bubble Safari — hands you a goal and a number. The number is moves in the first two and, in Bubble Safari, a wall that descends as you shoot. Players focus on the goal, because it is what the game points at. Players who clear stages focus on the number, because it is the only thing they actually spend.',
      'That reframing is the single highest-value change you can make to how you play the genre: a match is not a success, it is a purchase. You are paying one move to buy some amount of progress. Some purchases are excellent, some are terrible, and most of them are invisible until you start counting.'
    ],
    sections: [
      {
        h: 'Cascades are free progress — engineer them',
        p: [
          'A cascade is a match that drops pieces into a new match, which drops into another. None of the extra matches cost a move. So the question is never “what can I match” but “which match causes the most movement underneath it.”',
          'This is why clearing low on the grid is so much stronger than clearing high. A match in the bottom rows forces an entire column to shift, and a shifted column creates new adjacencies you did not have to look for. A match at the top moves almost nothing and is, in budget terms, the most expensive kind of progress available.',
          'In Royal Matcher the same principle applies to obstacles and ingredient stages: work upward from the bottom and let the game do half of your clearing for you.'
        ]
      },
      {
        h: 'Special pieces: producing them is half their value',
        p: [
          'Four-in-a-row and five-in-a-row produce boosters in the gem and yarn games. Most players fire a booster the moment it appears because it feels good. That throws away the second half of the mechanic.',
          'A booster’s value depends on what is on the board when you set it off. A colour bomb used while the target colour is spread across the grid removes a lot; the same bomb used when only three remain removes three. Combining two adjacent boosters beats either alone by a wide margin, and combos must be planned several moves ahead, because you have to build one booster next to another without setting either off in the process.',
          'The habit worth forming: when you create a special piece, do not use it until the board is crowded enough that you cannot solve it without one.'
        ]
      },
      {
        h: 'Reading the goal correctly',
        p: [
          'Stages ask for different things and each asks you to aim at a different part of the grid. Clearing a colour wants you hunting that colour anywhere. Breaking ice or boxes wants lines that pass through the band holding them. Dropping ingredients wants bottom-row clears, because an item only progresses when the space beneath it empties.',
          'The common failure is doing the generic version of the goal. A player clearing obstacle stages by matching obstacles directly will spend twice as many moves as one who fires a striped booster along the row that contains them. Same objective, completely different cost.'
        ]
      },
      {
        h: 'When to stop optimising',
        p: [
          'Late in a stage with few moves left, planning gets worse, not better, because there is not enough time to set anything up. At that point the right play is to trigger the biggest available chain immediately and accept the randomness, since the alternative — three careful single matches — is guaranteed to be insufficient.',
          'Conversely, early in a stage, when you have most of your moves, patience is cheap. Spend the first few moves building the shape you want rather than banking progress. Most failed stages were lost in the first third, where a player was optimising for the reward of a visible clear instead of the position three turns later.'
        ]
      },
      {
        h: 'The one thing to practise',
        p: [
          'If you only take one habit away: before every swap, ask what will fall into the space you are creating. That is the whole game. It converts a genre that looks like a search task into one that is actually a sequencing task, and the improvement is fast and noticeable — usually within about ten stages.'
        ]
      }
    ],
    closing: 'None of this requires faster tapping or better eyes. It requires treating the move counter as money, and most of the frustration people feel in match-3 games is the gap between how they spend it and how the stage was priced.',
    links: [
      { label: 'Puzzle Yarn Fun', href: '/g/puzzleyarnfun.html' },
      { label: 'Royal Matcher', href: '/g/royalmatcher.html' },
      { label: 'Bubble Safari', href: '/g/bubblesafari.html' }
    ]
  },

  {
    slug: 'are-free-browser-games-safe',
    title: 'Are free browser games safe? What actually happens on your device',
    desc: 'A plain-language account of accounts, permissions, storage, advertising and what a game running in a browser tab can and cannot do.',
    kicker: 'Safety',
    minutes: 6,
    intro: [
      '“Do I need to install anything?” is the first question people ask about a browser game, and the answer for Tapzens is no — but the more useful question is what happens on your device once a page is open. This is that answer, without the reassuring vagueness.',
      'The short version: a game in a browser tab runs inside a sandbox. It cannot install software, read your files, see other tabs, charge you money, or use your camera and microphone unless you explicitly grant permission for that specific site. What it can do is store a small amount of data for itself, make network requests, and display advertising.'
    ],
    sections: [
      {
        h: 'Accounts: there are none here',
        p: [
          'Tapzens has no sign-up, no login and no profile system, which means there is no password for us to store and no account for anyone to breach. We do not collect your name, email or location to let you play a game.',
          'The consequence is worth understanding before it surprises you: because there is no account, there is no cloud save. Your progress lives on the device and in the browser you played in. Clear site data, use private browsing, or switch phones and the game starts over. That is a trade-off — less convenience, less personal data held anywhere but your own machine.'
        ]
      },
      {
        h: 'Where game progress is stored',
        p: [
          'Browser games keep their state in local storage: a small keyed area that only pages from the same web address can read. A water-sort game records how far up the ladder you are and how many gold you hold; a shooter records your upgrades. That data cannot be read by an unrelated site, and it is deleted the same way you clear cookies.',
          'One edge case is worth knowing: private or incognito windows discard local storage when the window closes. If you like a game and want to keep the level you reached, do not play it in a private window.'
        ]
      },
      {
        h: 'Advertising and consent, honestly',
        p: [
          'This site is funded by advertising, and we run it through a Google-certified consent management platform. What that means in practice: on your first visit you are asked to choose your ad-privacy preference; your choice is saved on your device; ad code does not run before you answer; and you can change your mind at any time from the “Manage consent” and “Ad privacy settings” links in the footer.',
          'Ads are served on the pages around the games, not inside them. The game bundles themselves are third-party HTML5 builds and can carry their own code for rewarded-video bonuses — the “watch an ad for a hint” option some levels offer. That is optional and you can always decline it and keep playing.',
          'Being upfront about this is deliberate. If a site running ads does not tell you where the ads are or how to change your consent, that is a reason to leave.'
        ]
      },
      {
        h: 'What a browser game cannot do',
        p: [
          'It is useful to know the boundaries of the sandbox, because a lot of fear about “free games online” is inherited from the download-an-.exe era.',
          'A game on a web page cannot: install or run a program on your computer; access your documents, photos or other tabs; read passwords saved by your browser for other sites; charge your card or make a purchase without you tapping through a payment provider; use your camera, microphone or location unless you grant permission for this site specifically; or see what other websites you have visited.'
        ]
      },
      {
        h: 'The real risks, which are smaller but not zero',
        p: [
          'Sandboxing handles the dramatic threats. What is genuinely worth caring about on a free game site is different and more mundane: aggressive ad layouts that are hard to distinguish from the game, pages that pretend to be a download button, and pop-unders on sites that are not run carefully.',
          'Our approach is to keep the game area free of clickable decoration and to place advertising in fixed positions with a visible label. If you ever see something on Tapzens that looks like a fake play button, a fake update notice, or a warning that your device is infected, treat it as hostile, do not click it, and tell us at the contact address — an ad network occasionally serves something that should not have passed review, and a report is the fastest way for it to be pulled.'
        ]
      }
    ],
    closing: 'A browser game is one of the lower-risk things you can do online, precisely because the browser is doing the work of containing it. The things worth watching are advertising quality and data collection, and both are visible on the surface if a site is being straight with you.',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy.html' },
      { label: 'How we choose games', href: '/guides/how-we-curate-games.html' },
      { label: 'Contact us', href: '/contact.html' }
    ]
  },

  {
    slug: 'how-we-curate-games',
    title: 'How Tapzens decides which games to publish',
    desc: 'The actual pipeline a game goes through here before it appears in the catalogue — what we test, what we scan for, and what gets rejected.',
    kicker: 'Behind the scenes',
    minutes: 5,
    intro: [
      'Most game portals are silent about how a game ends up on them, which makes “hand-picked” meaningless. So here is the concrete process a package goes through on Tapzens, including the automated checks that run every time the site is built.',
      'Nothing on this site is user-uploaded, and there is no submission form that dumps straight onto a page. A game is added only after it works on a phone, plays reasonably on a desktop, and passes the tracker scan described below.'
    ],
    sections: [
      {
        h: '1. It has to load on a phone, from cold, quickly',
        p: [
          'The first filter is size and startup behaviour. Our builds range from about 5 MB to 60 MB on disk, and the ones at the top of that range take noticeably longer on a mobile connection. A game that shows a blank screen for many seconds, or that assumes a mouse hover state exists, is rejected — on a phone the hover state never happens, and games designed around it are unplayable.'
        ]
      },
      {
        h: '2. Orientation is a design decision we do not override',
        p: [
          'Each game declares whether it is portrait or landscape, and we keep that. Portrait games are thumb-designed vertical puzzles and shooters; landscape games are the wide battlefields — Tank Era, Ace Strike, Arrow Maze Solve and Shift Dash Reac. We do not letterbox a landscape game into a portrait frame to make the site look uniform, because it makes the game worse.'
        ]
      },
      {
        h: '3. A tracker and ad-tag scan runs at build time',
        p: [
          'The site generator scans every delivered code file and reports analytics and advertising identifiers it finds, separated into what actually loads in a browser versus what is only reachable inside a native app wrapper. This is not decoration — running the audit on the current catalogue reads 361 code files and reports ten distinct ad or tracking identifiers, of which one loads on the web.',
          'That number is the practical reason the audit exists. Game bundles in this category were originally built for mobile app stores and carry their ad-network configuration in the code. It sits inert in a browser build, but we want to know it is there rather than assume it is not. When a page-level Google Analytics tag turned up inside six game entries during a recent build, that is exactly what surfaced it, and those tags were removed so that no analytics run outside the consent prompt.'
        ]
      },
      {
        h: '4. Structured data describes what is really on the page',
        p: [
          'Every detail page publishes VideoGame, HowTo, BreadcrumbList and FAQPage markup. What it does not publish is ratings or review counts, because we do not collect real user ratings and an invented number in structured data is worse for a player than no number at all. The same reasoning is why the catalogue carries no play counts: a static site with no backend has no way to know how many people played something, and there is no honest figure to print.'
        ]
      },
      {
        h: '5. What gets rejected',
        p: [
          'Games we cannot get to run cleanly on a phone. Games that ask for a login before the first level. Games whose only content is an ad wall. And games we have no right to distribute — publishing someone else’s work without permission hurts the developer and gets the site removed.',
          'The honest limitation of this process is scale: with 18 games, we are a small curated shelf, not a portal. Every entry has a written guide on the site and every guide was written after reading what that build actually contains. A larger catalogue of the same quality would be better; a bigger number of the same games we already have would not.'
        ]
      }
    ],
    closing: 'If you want to suggest a game, or think one of ours is misfiled, the contact page is a real mailbox that a person reads. That is a smaller promise than “millions of games”, and it is the one we can keep.',
    links: [
      { label: 'About Tapzens', href: '/about.html' },
      { label: 'Partnerships & submissions', href: '/partnerships.html' },
      { label: 'Contact us', href: '/contact.html' }
    ]
  },

  {
    slug: 'touch-controls-portrait-vs-landscape',
    title: 'One hand or two: portrait and landscape change what a game asks of you',
    desc: 'Why the orientation a browser game ships in is a design decision, what each one costs you on a phone, and how to set your device up for either.',
    kicker: 'Playing better',
    minutes: 5,
    intro: [
      'Of the eighteen games on Tapzens, thirteen are portrait and five are landscape. That split is not a stylistic preference of ours — it is inherited from how each game was built, and it changes what the game asks from your hands. Playing a landscape game one-handed, or expecting a portrait shooter to use a wide field, is most of the reason people decide a game is bad when it is really just held wrong.',
      'The underlying difference is how many simultaneous inputs you have available and how much of the screen you can see at once.'
    ],
    sections: [
      {
        h: 'What portrait is actually good for',
        p: [
          'Portrait puts the play area in front of your thumb’s natural arc and leaves the top of the screen for information. That is why every sorting and stacking puzzle here is portrait: the board is above, the tray or the launcher is below, and a move is a vertical trip between two regions your thumb reaches without your hand moving.',
          'Portrait games also survive being played badly. Standing in a doorway, holding a phone in one hand with a coffee in the other — the games that work there are the ones where the only verbs are tap and short drag. On our site that is Puzzle Yarn Fun, Water Sort, Wizard Sort, Chroma Jam, Spin Screw Jam, Puzzle Hex, Satisfying Stack, Grocery Adventure and Royal Matcher.'
        ]
      },
      {
        h: 'What landscape buys, and what it costs',
        p: [
          'Landscape exists when the game needs horizontal space that cannot be squeezed. A wide battlefield where enemies approach from several directions needs lateral room, and the controls need a thumb on each side of the screen — Tank Era puts driving on one side and guns on the other, which simply does not fit a portrait layout. Ace Strike has the same requirement plus a joystick. Arrow Maze Solve needs a wide grid so a route that doubles back stays readable, and Shift Dash Reac needs vertical sight distance to telegraph what is coming.',
          'The cost is that landscape demands two hands and a stable hold. Playing a landscape game on a bus, one-handed, is the most common way to decide you are bad at it. If a game on this site feels unfair specifically on a phone, check whether it is one of the five landscape titles and give it both thumbs.'
        ]
      },
      {
        h: 'The settings that matter more than your reflexes',
        p: [
          'A few device-level choices affect play more than any skill difference, and they take a minute to fix.'
        ],
        list: [
          'Turn off auto-rotate while playing a landscape game, or the moment you tilt the phone the view reflows mid-manoeuvre.',
          'Disable pull-down notification shade gestures on the sides if your phone has them; on several of these games the swipe that shifts a lane is the same gesture.',
          'Set brightness manually rather than automatically. An ambient-light change during a game can alter the contrast you were reading board colours by.',
          'Close the tabs you are not using. A browser game shares memory with every other open tab, and a stalled frame in a reflex game costs a run.',
          'If your phone supports it, enable do-not-disturb. A banner arriving over a touch target is a genuine input loss.'
        ]
      },
      {
        h: 'Playing on a desktop, tablet or a big phone',
        p: [
          'Nothing here is tuned for a specific screen size, and a large tablet or monitor gives you the same board rather than a scaled-down one. The real change is input: portrait tap-and-drag games are usually slightly better with a mouse, because a click-drag is more precise than a thumb on glass, while reflex games are usually better on a phone because the touch target is the whole side of the screen.',
          'There are no keyboard bindings for the pointer-driven puzzles, so a desktop player should expect a mouse-only experience. The one documented exception is Ace Strike, which accepts arrow keys in place of the joystick.'
        ]
      },
      {
        h: 'Battery and heat, which do affect performance',
        p: [
          'A hot phone throttles its CPU, and throttling in a browser game shows up as dropped frames rather than a slow fan. On the puzzle games this is invisible — nothing is timing you. On Shift Dash Reac or Ace Strike it is directly expensive, since both depend on a steady frame rate to read an approach. If you are playing reflex games for a long session, take the case off, and do not play while charging if the device gets warm.'
        ]
      }
    ],
    closing: 'Orientation is the cheapest thing to get right about a mobile game and the thing people blame themselves for most often. Before you decide a game is too hard, check whether it wanted both your hands.',
    links: [
      { label: 'Shift Dash Reac', href: '/g/shiftdashreac.html' },
      { label: 'Tank Era', href: '/g/tankera.html' },
      { label: 'All Action games', href: '/c/action.html' }
    ]
  },

  {
    slug: 'a-parents-guide',
    title: 'A parent’s guide to playing here',
    desc: 'What a child sees on Tapzens: advertising and consent, in-app purchase prompts, contact with strangers, game content, and the settings worth changing.',
    kicker: 'For families',
    minutes: 5,
    intro: [
      'Tapzens is a general-audience site (13+) and there is no age gate, because there is no account and nothing to gate. That makes it easy for a child to use and, for the same reason, it is something a parent should decide about knowingly rather than by accident. This page sets out what is actually there.',
      'The three things worth understanding are advertising, purchase prompts inside some games, and the absence of any communication feature.'
    ],
    sections: [
      {
        h: 'Contact with strangers: there is none',
        p: [
          'There are no chat rooms, no comments, no usernames, no player lists, no friend requests and no messaging anywhere on the site. Nothing on a Tapzens page is submitted by another visitor. A child cannot be contacted by anyone here, and there is no profile for them to fill in.',
          'One caveat belongs in the open: some game bundles ship with leaderboards and ranking screens built into the game itself. Those are part of the original game code rather than something we added, and we cannot guarantee what a future update of a bundled game might contain.'
        ]
      },
      {
        h: 'Advertising, and the consent screen',
        p: [
          'The site runs display advertising around the games, served through Google AdSense behind a consent prompt that appears on a first visit. The prompt asks the visitor to accept or manage ad-privacy choices. A child will usually tap through it; whatever they choose is stored on the device and can be changed later from the “Manage consent” link in the footer.',
          'Ads appear on the page, not inside the game canvas. If you would prefer the choice to be made by you rather than by a child, set it once yourself on the device before handing it over — and note that clearing browsing data brings the prompt back.'
        ]
      },
      {
        h: '“Not enough coins” — purchase prompts inside some games',
        p: [
          'Several of these games were originally built for app stores, and they keep their in-game currency screens: a coin total, a shop, a “Not Enough Coins” message, and options that offer currency in exchange for watching a video. In the browser versions here, there is no payment path — no card details are stored or requested anywhere on Tapzens, and we do not sell anything.',
          'But the buttons are visible, and that matters for a young child who has learned that a button shaped like a shop does something on other apps. Explain that the shop here does nothing. If you want to remove the ambiguity entirely, the games with the least commercial furniture are Puzzle Hex, Arrow Maze Solve, Chroma Jam and Block Puzzle: Save Girl.'
        ]
      },
      {
        h: 'Content, game by game',
        p: [
          'Nothing on the site is graphic or adult. Conflict imagery is confined to the four action titles: Zombie Down, a cartoon shooter against a horde, plus Tank Era, Ace Strike and Hunter: Evolve Uprising, which are vehicle and fantasy combat with no graphic detail. If cartoon violence is a line for you, the puzzle category — twelve of the eighteen games — has no conflict at all.',
          'The puzzle games also happen to be the good ones. Sorting, stacking and routing games are sequenced reasoning under a mild time pressure, which is a genuine cognitive activity, and the difficulty curves are steep enough to stay interesting for an adult.'
        ]
      },
      {
        h: 'Practical settings worth changing',
        p: [
          'None of these are Tapzens-specific; they are browser and device controls that apply wherever a child is playing on the web.'
        ],
        list: [
          'Use your browser’s profile or a supervised account so the site’s consent choice is one you made.',
          'Turn off saving payment methods in the browser for that profile. It is a good habit independent of this site.',
          'Set a screen-time limit on the browser app itself if you want a natural end to a session; there is nothing on our side that will do it for you.',
          'Bookmark the specific games you have approved rather than leaving the home page open, so browsing the catalogue is not unsupervised.'
        ]
      }
    ],
    closing: 'The honest summary: no accounts, no contact, no payments, advertising behind a consent prompt you control, and a handful of cosmetic shop buttons left over from the games’ app-store origins. If any of that is a problem for your household, the puzzle category is a clean place to stay.',
    links: [
      { label: 'All Puzzle games', href: '/c/puzzle.html' },
      { label: 'Privacy Policy', href: '/privacy-policy.html' },
      { label: 'Terms of Service', href: '/terms-of-service.html' }
    ]
  }
];
