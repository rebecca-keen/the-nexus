// ─── ADMIN ───────────────────────────────────────────────────────────────────
export const ADMIN_USER = "nexusadmin";
export const ADMIN_PASS = "N3xus@2025";

// ── AI Configuration ──────────────────────────────────────────────────────────
// Get a FREE API key at openrouter.ai — sign up, go to Keys, create one
// Free models: mistralai/mistral-7b-instruct, google/gemma-3-27b-it:free, meta-llama/llama-3.1-8b-instruct:free
export const OPENROUTER_KEY = "PASTE_YOUR_OPENROUTER_KEY_HERE";
export const AI_MODEL = "google/gemma-3-27b-it:free"; // Free model — no billing required

// ─── STRIPE ──────────────────────────────────────────────────────────────────
export const STRIPE_MONTHLY = "https://buy.stripe.com/REPLACE_MONTHLY_LINK";
export const STRIPE_ANNUAL  = "https://buy.stripe.com/REPLACE_ANNUAL_LINK";

export const FREE_LIMIT = 6;

// ─── TOPICS ──────────────────────────────────────────────────────────────────
export const TOPICS = [
  "All Topics",
  "Government & Intelligence",
  "Unresolved Events",
  "Hidden History",
  "Health & Science",
  "Finance & Power",
  "UAP & Anomalous",
  "Ocean & Earth",
  "Media & Disclosure",
  "Surveillance",
  "Ancient Civilizations",
  "Giants & Nephilim",
  "Biblical & Religious Records",
  "Animal Intelligence",
  "Forbidden Science",
  "Lost Technology",
  "Secret Societies",
  "Geopolitics & Deep State",
  "Vaccines & Big Pharma",
  "Food & Biotech",
  "Ticks & Bioweapons",
  "DNA & Genetics",
  "Frequency & Energy",
  "Consciousness & Mind",
  "Simulation & Reality",
  "Ancient Gods & Beings",
  "Sacred Geometry",
  "Atlantis & Lemuria",
  "Remote Viewing & PSI",
  "Portals & Stargates",
];

export const REGIONS = [
  "All Regions","🇺🇸 USA","🇬🇧 UK","🌍 Global","🇷🇺 Russia",
  "🇨🇳 China","🇪🇬 Egypt","🌏 Asia Pacific","🇪🇺 Europe",
  "🌎 South America","🇮🇱 Israel / Middle East","🌍 Africa","🇻🇦 Vatican",
];

export const VERDICTS = {
  confirmed:  { label:"Confirmed Record", short:"CONFIRMED",  color:"#0d2010", text:"#40c070", border:"#1a4a1a", icon:"✓" },
  likely:     { label:"Likely Accurate",  short:"LIKELY",     color:"#0d1e10", text:"#60d080", border:"#1a3a1a", icon:"↑" },
  contested:  { label:"Disputed",         short:"DISPUTED",   color:"#1e1a08", text:"#c0a020", border:"#3a3010", icon:"⚖" },
  unverified: { label:"Unverified",       short:"UNVERIFIED", color:"#1a1008", text:"#c07820", border:"#3a2810", icon:"?" },
  refuted:    { label:"Refuted",          short:"REFUTED",    color:"#1a0808", text:"#c04040", border:"#3a1010", icon:"✗" },
};

export const autoVerdict = c =>
  c >= 88 ? "confirmed" : c >= 72 ? "likely" : c >= 50 ? "contested" : c >= 30 ? "unverified" : "refuted";

export const TYPE_COLORS = {
  news:    { bg:"#0d1a2a", text:"#5a9ac8", label:"NEWS" },
  blog:    { bg:"#0d1a10", text:"#4a9a5a", label:"BLOG" },
  archive: { bg:"#1e1408", text:"#c08030", label:"ARCHIVE" },
  research:{ bg:"#140d1a", text:"#8a5ac8", label:"RESEARCH" },
  podcast: { bg:"#0d1a1a", text:"#4ab8b0", label:"PODCAST" },
  user:    { bg:"#141414", text:"#9a9a9a", label:"COMMUNITY" },
  reddit:  { bg:"#1a0a04", text:"#e06030", label:"REDDIT" },
};

export const fmtNum = n => n >= 1000 ? (n / 1000).toFixed(1) + "k" : String(n);
export const getType = t => TYPE_COLORS[t] || TYPE_COLORS.user;

// ─── REDDIT SUBREDDITS ────────────────────────────────────────────────────────
export const REDDIT_SUBS = [
  {name:"r/conspiracy",           url:"https://www.reddit.com/r/conspiracy",           color:"#ff6314", desc:"1.9M — alternative viewpoints"},
  {name:"r/UFOs",                 url:"https://www.reddit.com/r/UFOs",                 color:"#4488ff", desc:"UAP & disclosure"},
  {name:"r/HighStrangeness",      url:"https://www.reddit.com/r/HighStrangeness",      color:"#9944cc", desc:"Paranormal & unexplained"},
  {name:"r/conspiracytheories",   url:"https://www.reddit.com/r/conspiracytheories",   color:"#e04444", desc:"Theory & debate"},
  {name:"r/Paranormal",           url:"https://www.reddit.com/r/Paranormal",           color:"#6644aa", desc:"Supernatural events"},
  {name:"r/UnresolvedMysteries",  url:"https://www.reddit.com/r/UnresolvedMysteries",  color:"#44aaff", desc:"Cold cases & strange events"},
  {name:"r/AlternativeHistory",   url:"https://www.reddit.com/r/AlternativeHistory",   color:"#88aa44", desc:"Suppressed history"},
  {name:"r/AncientAliens",        url:"https://www.reddit.com/r/AncientAliens",        color:"#20c8a0", desc:"Ancient astronaut theory"},
  {name:"r/GrahamHancock",        url:"https://www.reddit.com/r/GrahamHancock",        color:"#a0c820", desc:"Lost civilization research"},
  {name:"r/SimulationTheory",     url:"https://www.reddit.com/r/SimulationTheory",     color:"#20a0c8", desc:"Are we in a simulation?"},
  {name:"r/MandelaEffect",        url:"https://www.reddit.com/r/MandelaEffect",        color:"#c820a0", desc:"Collective memory anomalies"},
  {name:"r/Missing411",           url:"https://www.reddit.com/r/Missing411",           color:"#c82020", desc:"David Paulides missing persons"},
  {name:"r/Giants",               url:"https://www.reddit.com/r/Giants",               color:"#aa6622", desc:"Giants & Nephilim"},
  {name:"r/Glitch_in_the_Matrix", url:"https://www.reddit.com/r/Glitch_in_the_Matrix", color:"#20c840", desc:"Reality glitches & anomalies"},
  {name:"r/Bigfoot",              url:"https://www.reddit.com/r/Bigfoot",              color:"#6a4020", desc:"Bigfoot & cryptid research"},
  {name:"r/UAP",                  url:"https://www.reddit.com/r/UAP",                  color:"#2080c8", desc:"UAP evidence"},
  {name:"r/InterdimensionalNHI",  url:"https://www.reddit.com/r/InterdimensionalNHI",  color:"#8020c8", desc:"Non-human intelligence"},
  {name:"r/RemoteViewing",        url:"https://www.reddit.com/r/RemoteViewing",        color:"#c8a020", desc:"Remote viewing research"},
  {name:"r/Area51",               url:"https://www.reddit.com/r/Area51",               color:"#208020", desc:"Area 51 & secret bases"},
  {name:"r/MKUltra",              url:"https://www.reddit.com/r/MKUltra",              color:"#c04040", desc:"CIA mind control programs"},
  {name:"r/Epstein",              url:"https://www.reddit.com/r/Epstein",              color:"#a04000", desc:"Epstein network research"},
  {name:"r/OccultConspiracy",     url:"https://www.reddit.com/r/OccultConspiracy",     color:"#404080", desc:"Occult & hidden power"},
  {name:"r/ForbiddenKnowledge",   url:"https://www.reddit.com/r/ForbiddenKnowledge",   color:"#802040", desc:"Suppressed knowledge"},
  {name:"r/SkinWalkerRanch",      url:"https://www.reddit.com/r/SkinWalkerRanch",      color:"#20c880", desc:"Paranormal ranch research"},
];




// ─── SEED STORIES ─────────────────────────────────────────────────────────────
export const SEED_STORIES = [
  { id:"s1",  type:"archive",  source:"National Security Archive", sourceUrl:"https://nsarchive.gwu.edu",         time:"1h ago",  topic:"Government & Intelligence",    region:"🇺🇸 USA",title:"Operation Northwoods: Joint Chiefs Proposed Staging Domestic Attacks to Justify War",                     summary:"The 1962 document proposed faking attacks on American soil to justify invading Cuba. JFK rejected it. Declassified in 1997 — a primary example of documented false-flag planning within the U.S. military establishment.",                                     upvotes:4100, comments:529,  credible:94, debunked:6,  tags:["Declassified","False Flag","Military"],           premium:false },
  { id:"s2",  type:"archive",  source:"Dead Sea Scrolls Archive",  sourceUrl:"https://www.deadseascrolls.org.il", time:"2h ago",  topic:"Biblical & Religious Records",  region:"🇮🇱 Israel / Middle East",title:"Book of Enoch: The Watchers Who Took Human Wives and Produced the Nephilim — Complete Pre-Biblical Account", summary:"The Book of Enoch, found among the Dead Sea Scrolls, describes the Watchers — fallen angels — who descended to earth, took human wives, and produced the Nephilim giants. The text directly influenced Genesis 6 and was excluded from the Biblical canon at the Council of Nicaea.", upvotes:6821, comments:1102, credible:78, debunked:22, tags:["Enoch","Watchers","Nephilim","Giants"],          premium:false },
  { id:"s3",  type:"research", source:"Smithsonian Archives Review",sourceUrl:"https://www.si.edu",               time:"3h ago",  topic:"Giants & Nephilim",            region:"🇺🇸 USA",title:"19th Century Newspaper Reports of Giant Skeletal Remains Across North America — Catalogued",               summary:"Over 400 newspaper articles from 1848-1912 report giant humanoid skeletons — some 7 to 12 feet tall — across the American Midwest. Researchers allege the Smithsonian systematically collected and suppressed these remains following its founding mandate.",      upvotes:9100, comments:1841, credible:65, debunked:35, tags:["Giants","Nephilim","Smithsonian","Cover-up"],    premium:false },
  { id:"s4",  type:"research", source:"Marine Biology Quarterly",   sourceUrl:"https://www.tos.org",              time:"4h ago",  topic:"Animal Intelligence",           region:"🌍 Global",title:"Dolphin Communication: Evidence of Names, Syntax, and Cultural Transmission Across Generations",           summary:"Peer-reviewed research documents dolphins using unique signature whistles as individual names, teaching tool use across generations, and displaying syntax in communication — cognitive capabilities that challenge assumptions about uniquely human language.",     upvotes:4211, comments:621,  credible:88, debunked:12, tags:["Dolphins","Intelligence","Language"],            premium:false },
  { id:"s5",  type:"archive",  source:"CIA Reading Room",           sourceUrl:"https://www.cia.gov/readingroom",  time:"5h ago",  topic:"Government & Intelligence",    region:"🇺🇸 USA",title:"MK-Ultra: CIA Mind Control Experiments on Unwitting Citizens — Confirmed by Senate 1977",                  summary:"The CIA ran LSD, hypnosis, and electroshock experiments on unwitting subjects for two decades. Confirmed by the Church Committee. Files were partially destroyed before the 1977 disclosure.",                                                              upvotes:7200, comments:1102, credible:96, debunked:4,  tags:["MK-Ultra","CIA","Declassified"],                  premium:false },
  { id:"s6",  type:"news",     source:"The Intercept",              sourceUrl:"https://theintercept.com",         time:"6h ago",  topic:"Surveillance",                 region:"🇺🇸 USA",title:"NSA Metadata Collection Exceeded Legal Mandate — Internal Analysts Raised Concerns",                     summary:"FOIA documents show NSA analysts raised concerns that domestic metadata collection exceeded FISA authority. The program ran for years before the Snowden disclosures changed public awareness.",                                                             upvotes:1842, comments:214,  credible:78, debunked:22, tags:["NSA","FOIA","Surveillance"],                    premium:true },
  { id:"s7",  type:"blog",     source:"Corbett Report",             sourceUrl:"https://www.corbettreport.com",    time:"7h ago",  topic:"Finance & Power",              region:"🌍 Global",title:"The Bilderberg Group: 70 Years of Private Summits Between Heads of State and Central Bankers",             summary:"Annual meetings include sitting prime ministers, NATO chiefs, and major media owners — with no press, no published minutes, and no public accountability whatsoever.",                                                                                       upvotes:3201, comments:441,  credible:71, debunked:29, tags:["Bilderberg","Power","Finance"],                  premium:true },
  { id:"s8",  type:"podcast",  source:"The Why Files",              sourceUrl:"https://www.youtube.com/@TheWhyFiles",time:"8h ago",topic:"Ancient Civilizations",        region:"🌍 Global",title:"Göbekli Tepe: 12,000-Year-Old Megalithic Temple Complex Rewrites Accepted Timeline of Human Civilization", summary:"Göbekli Tepe in Turkey predates Stonehenge by 6,000 years and the Egyptian pyramids by 7,000 years — built before agriculture was established. The Why Files examines what this means for the accepted timeline of organized human civilization.",         upvotes:5821, comments:891,  credible:89, debunked:11, tags:["Gobekli Tepe","Ancient","Timeline"],             premium:false },
  { id:"s9",  type:"research", source:"Genesis 6 Ministries",      sourceUrl:"https://gen6giants.com",           time:"9h ago",  topic:"Giants & Nephilim",            region:"🌍 Global",title:"Genesis 6 and the Nephilim: Cross-Cultural Evidence of Giant Beings in Over 200 Ancient Traditions",      summary:"Researchers have catalogued over 200 ancient cultures from Mesopotamia to the Americas to Polynesia that contain independent legends of giant beings living among early humans, many with striking structural parallels to the Genesis account.",             upvotes:5820, comments:891,  credible:60, debunked:40, tags:["Nephilim","Genesis","Cross-Cultural","Giants"], premium:true },
  { id:"s10", type:"archive",  source:"Vatican Apostolic Archive",  sourceUrl:"https://www.archivioapostolicovaticano.va",time:"10h ago",topic:"Biblical & Religious Records",region:"🇻🇦 Vatican",title:"Suppressed Gospels and Texts Excluded at the Council of Nicaea in 325 AD — Vatican Archives",             summary:"The Council of Nicaea in 325 AD determined the official Biblical canon. Dozens of gospels including the Gospel of Thomas and the Book of Enoch were excluded. Many remain in the Vatican Archives, partially accessible since 1881.",                       upvotes:7410, comments:1204, credible:82, debunked:18, tags:["Vatican","Canon","Suppressed","Nicaea"],          premium:true },
  { id:"s11", type:"research", source:"Journal of Cetacean Research",sourceUrl:"https://iwc.int",                time:"11h ago", topic:"Animal Intelligence",           region:"🌍 Global",title:"Orca and Dolphin Long-Term Memory: Evidence of Multigenerational Cultural Knowledge and Grief",            summary:"Studies document orcas maintaining grudges against specific boats for decades, grieving dead calves for weeks, and transmitting dialect-specific vocalizations across four generations — qualifying as cultural identity by scientific definition.",          upvotes:3918, comments:445,  credible:85, debunked:15, tags:["Orca","Dolphins","Memory","Culture"],          premium:true },
  { id:"s12", type:"archive",  source:"WikiLeaks",                  sourceUrl:"https://wikileaks.org",            time:"12h ago", topic:"Surveillance",                 region:"🌍 Global",title:"CIA Vault 7 — UMBRAGE: Malware Library Designed to Frame Other Nations for Cyberattacks",                 summary:"The CIA maintained hacking tools designed to leave digital fingerprints matching other nations — fundamentally challenging attribution certainty in all major cyberattacks since 2010.",                                                                    upvotes:9200, comments:1841, credible:88, debunked:12, tags:["CIA","Cyber","False Attribution"],               premium:true },
  // ── Additional USA stories ─────────────────────────────────────────────────
  { id:"s13", type:"news",    source:"Miami Herald",               sourceUrl:"https://www.miamiherald.com",      time:"13h ago", topic:"Unresolved Events",             region:"🇺🇸 USA",  title:"Jeffrey Epstein: No Verified Income Source, Private Islands, Access to World Leaders — Full Investigation", summary:"The Herald's investigation found Epstein had no verifiable business generating his wealth, yet maintained relationships with heads of state globally. His 2019 death was ruled suicide with both prison guards asleep and cameras malfunctioning.", upvotes:6821, comments:1204, credible:86, debunked:14, tags:["Epstein","Intelligence","Unsealed"],            premium:false },
  { id:"s14", type:"news",    source:"Wall Street Journal",        sourceUrl:"https://www.wsj.com",              time:"14h ago", topic:"Health & Science",              region:"🇺🇸 USA",  title:"FBI Director: Lab Leak Is Most Credible COVID-19 Origin — Declassified Intelligence Assessment",           summary:"FBI Director Wray stated the Bureau assessed SARS-CoV-2 most likely originated from a lab incident. The DOE reached the same conclusion independently. FOIA emails show NIH officials tried to suppress this hypothesis in early 2020.",              upvotes:7910, comments:1480, credible:74, debunked:26, tags:["COVID","Lab Leak","Declassified"],               premium:true },
  { id:"s15", type:"research",source:"AE911Truth / UAF Study",    sourceUrl:"https://www.ae911truth.org",       time:"15h ago", topic:"Unresolved Events",             region:"🇺🇸 USA",  title:"University of Alaska Fairbanks: WTC 7 Collapse Could Not Have Been Caused by Fire — 4-Year Engineering Study", summary:"The UAF study concluded WTC Building 7 — not struck by a plane — could only have collapsed through near-simultaneous failure of every column. The official NIST report attributed it to fire alone.", upvotes:7210, comments:1842, credible:65, debunked:35, tags:["WTC7","Engineering","9/11"],                    premium:true },
  { id:"s16", type:"archive", source:"NSA Archive",               sourceUrl:"https://nsarchive.gwu.edu",         time:"16h ago", topic:"Government & Intelligence",     region:"🇺🇸 USA",  title:"Operation Paperclip: 1,600 Nazi Scientists Secretly Transferred to the U.S. After WWII — Full Document Release", summary:"After WWII the U.S. military secretly recruited Nazi scientists and engineers. Wernher von Braun, an SS officer, became the chief architect of NASA's Apollo program. The full scope of transferred knowledge remains partially classified.", upvotes:4800, comments:721,  credible:97, debunked:3,  tags:["Paperclip","NASA","Declassified"],               premium:true },
  { id:"s17", type:"news",    source:"The Intercept",             sourceUrl:"https://theintercept.com",          time:"17h ago", topic:"Media & Disclosure",            region:"🇺🇸 USA",  title:"Twitter Files: FBI Communication Channels Resulted in Suppression of Accurate Reporting — Internal Documents", summary:"Internal documents showed sustained FBI communication with Twitter trust-and-safety teams. Several suppression requests targeted stories that later proved accurate, including the Hunter Biden laptop story.", upvotes:8841, comments:2102, credible:81, debunked:19, tags:["Twitter","FBI","Censorship"],                  premium:true },
  { id:"s18", type:"blog",    source:"Corbett Report",            sourceUrl:"https://www.corbettreport.com",     time:"18h ago", topic:"Finance & Power",               region:"🇺🇸 USA",  title:"The Federal Reserve: A Private Banking Cartel That Has Never Been Independently Audited in 110 Years",      summary:"The Federal Reserve has never undergone a full independent audit despite controlling U.S. monetary policy. The Fed Transparency Act has been repeatedly blocked. A partial audit in 2011 revealed $16 trillion in secret emergency loans.", upvotes:5200, comments:714,  credible:82, debunked:18, tags:["Federal Reserve","Banking","Audit"],              premium:true },
  // ── Giants & Biblical USA stories ──────────────────────────────────────────
  { id:"s19", type:"research",source:"Newspaper Archive",         sourceUrl:"https://newspaperarchive.com",      time:"19h ago", topic:"Giants & Nephilim",             region:"🇺🇸 USA",  title:"Ohio Mound Builders: Giant Skeletons 7-9 Feet Tall Documented by Archaeologists in 1800s — Full Archive",   summary:"The Smithsonian's own Bureau of Ethnology Annual Reports from the 1870s-1890s document giant humanoid skeletal remains found in burial mounds across Ohio, Indiana, and West Virginia — some exceeding 9 feet. None are publicly accessible today.", upvotes:6200, comments:980,  credible:62, debunked:38, tags:["Giants","Ohio","Mounds","Smithsonian"],           premium:false },
  { id:"s20", type:"research",source:"Gen6 Giants",               sourceUrl:"https://www.gen6giants.com",        time:"20h ago", topic:"Giants & Nephilim",             region:"🇺🇸 USA",  title:"Numbers 13:33 — The Israelite Spies Report Giants in Canaan: 'We Were Like Grasshoppers in Our Own Sight'", summary:"The Biblical account of Israelite spies reporting Nephilim in Canaan provides geographic and descriptive detail that researchers cross-reference with ancient Canaanite archaeology. The Anakim and Rephaim are named separately from the Nephilim.", upvotes:4100, comments:621,  credible:55, debunked:45, tags:["Nephilim","Numbers","Canaan","Biblical"],          premium:true },
  { id:"s21", type:"podcast", source:"The Why Files",             sourceUrl:"https://www.youtube.com/@TheWhyFiles",time:"21h ago",topic:"Giants & Nephilim",             region:"🇺🇸 USA",  title:"The Smithsonian Giant Cover-Up: Hundreds of 19th Century Reports and Where the Remains Went",               summary:"The Why Files investigates the documented trail of giant skeletal discoveries in the American Midwest and Southeast — from initial newspaper accounts to Smithsonian collection records — and the complete absence of any remains in publicly accessible collections.", upvotes:7100, comments:1102, credible:61, debunked:39, tags:["Giants","Smithsonian","Cover-up","USA"],         premium:true },
  // ── Dolphin / Animal Intelligence ───────────────────────────────────────────
  { id:"s22", type:"research",source:"NOAA Marine Research",      sourceUrl:"https://oceanexplorer.noaa.gov",    time:"22h ago", topic:"Animal Intelligence",           region:"🇺🇸 USA",  title:"U.S. Navy Dolphin Research Program: Decades of Classified Intelligence on Dolphin Cognition and Sonar",    summary:"The U.S. Navy's Marine Mammal Program, based in San Diego, has studied dolphin intelligence and sonar capabilities since the 1960s. Declassified portions reveal communication sophistication that exceeds most civilian research benchmarks.", upvotes:3400, comments:412,  credible:79, debunked:21, tags:["Dolphins","Navy","Sonar","Intelligence"],         premium:true },
  { id:"s23", type:"research",source:"Shark Bay Research Station", sourceUrl:"https://www.monkeymia.com.au",      time:"23h ago", topic:"Animal Intelligence",           region:"🌍 Global", title:"Bottlenose Dolphins Using Marine Sponges as Tools — Cultural Transmission Confirmed Across 3 Generations",  summary:"Dolphins at Shark Bay, Australia use marine sponges to protect their snouts while foraging — a behavior taught exclusively mother to daughter and documented across three generations, meeting the scientific definition of cultural transmission.", upvotes:2900, comments:318,  credible:91, debunked:9,  tags:["Dolphins","Tool Use","Culture","Research"],       premium:true },
  // ── Forbidden Science / Lost Technology ─────────────────────────────────────
  { id:"s24", type:"research",source:"Graham Hancock",            sourceUrl:"https://grahamhancock.com",          time:"1d ago",  topic:"Lost Technology",               region:"🇪🇬 Egypt", title:"The Great Pyramid's Internal Temperature Remains a Constant 68°F Regardless of Outside Temperature",        summary:"The Great Pyramid of Giza maintains a constant internal temperature of 68°F (20°C) — the same as the Earth's mean temperature — regardless of external conditions. Engineers have been unable to explain this thermodynamic property using conventional construction theory.", upvotes:5100, comments:721,  credible:72, debunked:28, tags:["Pyramid","Egypt","Temperature","Lost Tech"],      premium:true },
  { id:"s25", type:"research",source:"UnchartedX",                sourceUrl:"https://www.youtube.com/@UnchartedX1",time:"1d ago", topic:"Lost Technology",               region:"🇪🇬 Egypt", title:"Precision Stonework at the Valley Temple of Khafre: Cuts and Tolerances That Match Modern CNC Machining",  summary:"Field researcher Ben van Kerkwyk documents stone blocks at the Valley Temple displaying interior angles, surface flatness, and cut tolerances within fractions of a millimeter — matching modern Computer Numerical Control machining specifications that were not available until the 20th century.", upvotes:6300, comments:891,  credible:68, debunked:32, tags:["Egypt","Machining","Lost Tech","Precision"],       premium:true },
  // ── Secret Societies / Geopolitics ─────────────────────────────────────────
  { id:"s26", type:"archive", source:"Corbett Report",            sourceUrl:"https://www.corbettreport.com",     time:"1d ago",  topic:"Secret Societies",              region:"🇺🇸 USA",  title:"The Council on Foreign Relations: 100 Years of Shaping U.S. Foreign Policy From Outside Government",        summary:"The CFR, founded in 1921, has counted virtually every U.S. Secretary of State, CIA Director, and National Security Advisor among its members. Its own publications acknowledge its role in setting the foreign policy agenda before elections determine who implements it.", upvotes:4200, comments:581,  credible:74, debunked:26, tags:["CFR","Foreign Policy","Deep State"],              premium:true },
  { id:"s27", type:"news",    source:"Consortium News",           sourceUrl:"https://consortiumnews.com",        time:"1d ago",  topic:"Geopolitics & Deep State",      region:"🌍 Global", title:"Seymour Hersh Investigation: U.S. Navy Divers Planted Explosives on Nord Stream Pipeline During NATO Exercise", summary:"Pulitzer Prize-winning journalist Seymour Hersh, citing a senior U.S. official, reported that Navy divers planted explosives on Nord Stream during a NATO exercise in June 2022. The story was entirely ignored by major U.S. outlets despite Hersh's documented track record.", upvotes:5811, comments:921,  credible:70, debunked:30, tags:["Nordstream","NATO","Sabotage","Disputed"],         premium:true },
  { id:"s28", type:"research",source:"Koinonia House",            sourceUrl:"https://www.khouse.org",             time:"2d ago",  topic:"Biblical & Religious Records",  region:"🇺🇸 USA",  title:"Chuck Missler: The Integrity of the Genetic Bloodline — Why Genesis 6 Giants Were the Reason for the Flood", summary:"Biblical scholar Chuck Missler's research argues that the Nephilim corruption of the human genetic line — not merely moral corruption — was the reason God initiated the flood. He cross-references Genesis 6 with Enoch, Numbers 13, and the Dead Sea Scrolls.", upvotes:4800, comments:712,  credible:58, debunked:42, tags:["Missler","Genesis","Flood","Nephilim","Biblical"],   premium:true },
  { id:"s29", type:"research",source:"L.A. Marzulli Blog",        sourceUrl:"https://lamarzulli.net",             time:"2d ago",  topic:"Giants & Nephilim",             region:"🇺🇸 USA",  title:"Peruvian Elongated Skulls — DNA Testing Shows Non-Human Mitochondrial DNA in Paracas Specimens",           summary:"DNA analysis conducted on elongated skulls from Paracas, Peru reportedly showed mitochondrial DNA with mutations unknown in any human, primate, or animal. The researcher who conducted the analysis has been unable to get results peer-reviewed through conventional journals.", upvotes:7100, comments:1204, credible:44, debunked:56, tags:["Paracas","Skulls","DNA","Giants","Peru"],           premium:true },
  { id:"s30", type:"podcast", source:"Stuff They Don't Want You to Know",sourceUrl:"https://www.iheart.com/podcast/182-stuff-they-dont-want-you-17913675/",time:"2d ago",topic:"Government & Intelligence",region:"🇺🇸 USA",title:"COINTELPRO: The FBI's Documented Campaign to Destroy Civil Rights Leaders, Anti-War Groups, and Political Dissidents", summary:"COINTELPRO ran from 1956 to 1971. Declassified documents confirm the FBI used illegal surveillance, infiltration, fabricated evidence, and psychological warfare against the NAACP, SCLC, Black Panthers, SDS, and even the women's liberation movement.", upvotes:5400, comments:781,  credible:95, debunked:5,  tags:["COINTELPRO","FBI","Civil Rights","Declassified"],    premium:false },
  {id:"s31",type:"archive", source:"Sacred Texts Archive",      sourceUrl:"https://sacred-texts.com/ane/adapa.htm",  time:"3h ago", topic:"Ancient Civilizations",       region:"🇮🇱 Israel / Middle East",title:"Myth of Adapa: The First Man Given Wisdom but Denied Immortality — Sumerian Primary Text", summary:"The Adapa myth predates Genesis by thousands of years. Enki creates Adapa as humanity's first sage and commissioner of the Anunnaki, granting him wisdom but withholding eternal life. When sky-god Anu offers Adapa the bread and water of immortality, Enki's secret instructions cause Adapa to refuse. Researchers argue this is the original template for the Garden of Eden narrative.", upvotes:4800,comments:712, credible:72,debunked:28,tags:["Adapa","Enki","Anu","Anunnaki","Genesis"],    premium:false},
  {id:"s32",type:"research",source:"ETCSL Oxford University",   sourceUrl:"https://etcsl.orinst.ox.ac.uk",           time:"4h ago", topic:"Ancient Civilizations",       region:"🌍 Global",               title:"Anki, Enlil & the Anunnaki Council: The Original Divine Hierarchy Preserved in Sumerian Cuneiform", summary:"Sumerian tablets describe An (heaven) and Ki (earth) as cosmic parents. Their son Enlil separated heaven from earth. The Anunnaki — the heaven-earth council of gods — governed fate, created humanity, and survived the flood. These texts at Oxford's ETCSL structurally parallel the divine councils in Genesis, Enoch, and the Dead Sea Scrolls.", upvotes:3900,comments:521, credible:78,debunked:22,tags:["Anki","Enlil","Anunnaki","Sumerian"],premium:false},
  {id:"s33",type:"research",source:"Ancient Origins",           sourceUrl:"https://www.ancient-origins.net",         time:"5h ago", topic:"Ancient Civilizations",       region:"🌍 Global",               title:"The Anunnaki: Sumerian Gods, Genetic Engineers, or Extraterrestrial Visitors? All Theories Examined", summary:"The Anunnaki appear in thousands of tablets as the divine assembly who created humanity from clay and divine blood. Sitchin interpreted them as aliens from Nibiru who engineered Homo sapiens. Orthodox scholars read them as the Mesopotamian pantheon. The debate spans DNA manipulation, ancient astronaut theory, and the origin of civilization.", upvotes:7200,comments:1104,credible:55,debunked:45,tags:["Anunnaki","Sitchin","DNA","Ancient Aliens"], premium:false},
  {id:"s34",type:"research",source:"Project Unredacted",        sourceUrl:"https://www.projectunredacted.com/cases/chronovisor-vatican-time-machine",time:"6h ago",topic:"Secret Societies",region:"🇻🇦 Vatican",title:"Vatican Chronovisor: Father Ernetti's Time-Viewing Device — Built With Enrico Fermi, Hidden in the Archives", summary:"In 1972 Father Pellegrino Ernetti claimed he and 12 scientists including Enrico Fermi and Wernher von Braun built a device capturing electromagnetic echoes of past events. He claimed to witness Christ's crucifixion and a lost Roman play. The Vatican issued an excommunication decree against unauthorized use of such devices in 1988 — an act researchers argue implies acknowledgment.", upvotes:6100,comments:981, credible:42,debunked:58,tags:["Chronovisor","Vatican","Time","Ernetti"],       premium:false},
  {id:"s35",type:"research",source:"Sedona Anomalies Research", sourceUrl:"https://sedonanomalies.com",              time:"7h ago", topic:"Forbidden Science",           region:"🇺🇸 USA",                title:"Sedona Vortex Sites: Electrical Engineer Measures Magnetic Anomalies — EEG and Magnetometer Data", summary:"Electrical engineer Benjamin Lonetree spent a decade measuring Sedona's vortex sites using magnetometers and portable EEG devices. His research documents measurable outflows of magnetic energy correlated with human brainwave changes. The geology — high iron oxide sandstone, volcanic basalt with 5-20% quartz — may genuinely affect human consciousness.", upvotes:3400,comments:441, credible:61,debunked:39,tags:["Sedona","Electromagnetic","Vortex","Consciousness"],premium:false},
  {id:"s36",type:"research",source:"George Church Lab — Harvard",sourceUrl:"https://arep.med.harvard.edu",           time:"8h ago", topic:"Forbidden Science",           region:"🇺🇸 USA",                title:"George Church (Harvard): First Book Encoded in DNA — 70 Billion Copies. CRISPR & Synthetic Biology", summary:"Harvard geneticist George Church encoded his book Regenesis entirely in DNA — 70 billion copies fitting on a thumbnail. His lab pioneered CRISPR gene editing, Neanderthal DNA reconstruction research, and the Personal Genome Project. He has speculated publicly about de-extincting Neanderthals and reversing aging through targeted gene therapy.", upvotes:5100,comments:721, credible:91,debunked:9, tags:["DNA","CRISPR","George Church","Synthetic Biology"],premium:false},
  {id:"s37",type:"research",source:"Bruce Lipton — brucelipton.com",sourceUrl:"https://www.brucelipton.com",         time:"9h ago", topic:"Forbidden Science",           region:"🇺🇸 USA",                title:"Bruce Lipton: Epigenetics — Your Beliefs Change Gene Expression. DNA Is Not Your Destiny", summary:"Former Stanford cell biologist Bruce Lipton's research shows that the environment outside the cell — including thoughts, beliefs, and electromagnetic signals — controls which genes switch on or off. This directly challenges genetic determinism and suggests consciousness shapes biology at the molecular level.", upvotes:4800,comments:641, credible:74,debunked:26,tags:["Epigenetics","DNA","Lipton","Consciousness"],   premium:false},
  {id:"s38",type:"archive", source:"Vatican Apostolic Archive",  sourceUrl:"https://www.archivioapostolicovaticano.va",time:"10h ago",topic:"Biblical & Religious Records",region:"🇻🇦 Vatican",          title:"Vatican Archives: 85 Kilometers of Shelving — Hidden Gospels, Galileo's Trial, Nazi Concordats, Pre-Nicaean Texts", summary:"The Vatican Apostolic Archive holds 85 kilometers of shelving. It contains Galileo's trial records, Nazi concordat documents, Henry VIII's annulment request, and thousands of inaccessible texts. Researchers believe ancient documents about the Nephilim, Mary Magdalene, and pre-canonical gospels remain sealed to the public.", upvotes:6800,comments:1021,credible:77,debunked:23,tags:["Vatican","Archives","Hidden","Gospels"],        premium:true},
  {id:"s39",type:"research",source:"Gregg Braden Official",      sourceUrl:"https://www.greggbraden.com",            time:"11h ago",topic:"Forbidden Science",           region:"🇺🇸 USA",                title:"Gregg Braden: The God Code — Ancient Name Encoded in Every Human DNA Base Pair Sequence", summary:"Gregg Braden analyzed the chemical elements of DNA base pairs against ancient Hebrew letter-number values and claims the phrase meaning 'God Eternal Within the Body' is encoded in every strand of human DNA. His research bridges quantum physics, ancient scripture, and molecular biology — presenting DNA as cosmic message.", upvotes:5200,comments:812, credible:45,debunked:55,tags:["DNA","God Code","Braden","Frequency"],           premium:true},
  {id:"s40",type:"research",source:"Dolores Cannon Archive",     sourceUrl:"https://dolorescannon.com",              time:"12h ago",topic:"Forbidden Science",           region:"🇺🇸 USA",                title:"Dolores Cannon QHHT: Subjects Under Deep Hypnosis Independently Describe Identical Accounts of Atlantis, DNA Modification, and Soul Origins", summary:"Over 50 years of Quantum Healing Hypnosis Technique sessions, Dolores Cannon documented subjects independently describing identical information about Atlantis, alien intervention in human DNA, and life between lives. Her 5-volume Convoluted Universe series catalogs thousands of cross-corroborating accounts that she argued cannot be explained by suggestion alone.", upvotes:4900,comments:781, credible:48,debunked:52,tags:["QHHT","Cannon","Past Lives","DNA","Atlantis"],   premium:true},
  {id:"s41",type:"research",source:"4biddenknowledge",           sourceUrl:"https://www.4biddenknowledge.com",       time:"13h ago",topic:"Ancient Civilizations",       region:"🌍 Global",               title:"Billy Carson: The Emerald Tablets of Thoth — 15 Tablets Written by an Atlantean Priest-King 36,000 BCE", summary:"Billy Carson's analysis identifies Thoth (Hermes Trismegistus) as an Atlantean who fled to Egypt and built the Great Pyramid. The tablets describe stargates, the Halls of Amenti beneath the pyramid, zero-point energy, and consciousness as the fundamental substrate of reality. Carson cross-references with Sumerian tablets, quantum mechanics, and neuroscience.", upvotes:5800,comments:891, credible:50,debunked:50,tags:["Emerald Tablets","Thoth","Atlantis","Anunnaki"],premium:true},
  {id:"s42",type:"blog",    source:"Ancient Origins",            sourceUrl:"https://www.ancient-origins.net",       time:"14h ago",topic:"Biblical & Religious Records",region:"🌍 Global",               title:"The Gospel of Mary Magdalene: Suppressed First-Century Text Shows Her as Jesus's Closest Disciple and Primary Teacher", summary:"The Gospel of Mary Magdalene, discovered in Cairo in 1896, depicts her receiving secret teachings from Jesus about matter, sin, and the soul — and transmitting these to the apostles over Peter's objection. Early church scholars argue this gospel was suppressed because it positioned a woman as the primary bearer of Jesus's esoteric teachings.", upvotes:5400,comments:821, credible:71,debunked:29,tags:["Mary Magdalene","Gospel","Suppressed","Gnostic"],premium:true},
  {id:"s43",type:"research",source:"HeartMath Institute",        sourceUrl:"https://www.heartmath.org/research/",   time:"15h ago",topic:"Forbidden Science",           region:"🇺🇸 USA",                title:"HeartMath Institute: The Heart's Electromagnetic Field Is 100x Stronger Than the Brain — Research Confirmed", summary:"The HeartMath Institute's research shows the heart generates an electromagnetic field 100 times stronger in amplitude than the brain's and detectable several feet from the body. Their research suggests the heart transmits emotional information to every cell and can be measured affecting others in proximity — a finding with implications for energy healing and consciousness studies.", upvotes:4100,comments:561, credible:78,debunked:22,tags:["HeartMath","Electromagnetic","Consciousness","Heart"],premium:true},

  // ── TICKS, VACCINES & HEALTH ───────────────────────────────────────────────
  {id:"s44",type:"research",source:"Kris Newby / BITTEN Files",  sourceUrl:"https://krisnewby.substack.com",        time:"1h ago", topic:"Health & Science",            region:"🇺🇸 USA",                title:"BITTEN: Congress Ordered Investigation Into Whether DoD Weaponized Ticks — Plum Island, Fort Detrick & Lyme Disease Origins", summary:"In 2019 Congress passed an amendment ordering the DoD Inspector General to investigate whether the military weaponized ticks and other insects as bioweapons between 1950–1975 and whether any were accidentally released. Science writer Kris Newby's book BITTEN documents interviews with Willy Burgdorfer — who discovered the Lyme bacterium — and evidence linking Plum Island, just 13 miles from Lyme CT, to Cold War bioweapons tick experiments.",upvotes:6200,comments:980, credible:65,debunked:35,tags:["Lyme Disease","Ticks","Bioweapons","Plum Island"],premium:false},
  {id:"s45",type:"news",    source:"VAERS / HHS",                 sourceUrl:"https://vaers.hhs.gov",                time:"2h ago", topic:"Health & Science",            region:"🇺🇸 USA",                title:"VAERS Database: Over 2 Million Adverse Event Reports Filed Since 1990 — What the Data Does and Does Not Show", summary:"The Vaccine Adverse Event Reporting System, managed jointly by the FDA and CDC, has received over 2 million reports of adverse events following vaccination since 1990. Experts debate what the data reveals vs. what requires further investigation. Congress mandated VAERS through the 1986 National Childhood Vaccine Injury Act after acknowledging vaccines can cause injury.",upvotes:5800,comments:1102,credible:71,debunked:29,tags:["VAERS","Vaccines","FDA","CDC","Adverse Events"],premium:false},
  {id:"s46",type:"research",source:"Food & Environment Reporting Network",sourceUrl:"https://thefern.org",          time:"3h ago", topic:"Health & Science",            region:"🇺🇸 USA",                title:"Lab-Grown Meat Uses Immortalized Cells — MIT Cancer Biologist: They Are 'Unmistakably More Like Cancer Cells'", summary:"The Food and Environment Reporting Network's investigation revealed that cultured meat companies use 'immortalized' cells — cells that divide indefinitely by bypassing normal biological limits. MIT cancer biologist Robert Weinberg stated these cells 'have already completed one of the prerequisites to becoming a cancer cell.' The FAO and WHO identified 53 potential hazards in cultured meat production.",upvotes:5400,comments:821, credible:72,debunked:28,tags:["Lab Meat","Fake Meat","Cancer","GMO","Food Safety"],premium:false},
  {id:"s47",type:"research",source:"Children's Health Defense",   sourceUrl:"https://childrenshealthdefense.org",    time:"4h ago", topic:"Health & Science",            region:"🇺🇸 USA",                title:"Beyond Impossible: The Truth Behind the Fake Meat Industry — WEF, Harvard, and the Push to End Natural Meat", summary:"A 2024 systematic review of 45 studies and 9.8 million participants confirmed that ultra-processed food consumption is directly associated with 32 adverse health parameters. Lab-grown and fake meat are categorized as ultra-processed food. Critics argue the push toward fake meat serves financial and control agendas more than environmental or health goals.",upvotes:4900,comments:741, credible:61,debunked:39,tags:["Fake Meat","WEF","Ultra-processed","Health"],premium:false},

  // ── ANCIENT ADVANCED TECHNOLOGY ───────────────────────────────────────────
  {id:"s48",type:"research",source:"UnchartedX Field Research",   sourceUrl:"https://www.youtube.com/@UnchartedX1", time:"5h ago", topic:"Lost Technology",             region:"🌎 South America",        title:"Puma Punku: 100-Ton Stone Blocks Cut With CNC-Level Precision — No Metal Tools Available at the Time", summary:"Puma Punku in Bolivia features massive andesite stone blocks with cuts that modern engineers compare to CNC machining tolerances. Andesite is rated 6-7 on the Mohs hardness scale — harder than any copper tool available to the Tiwanaku civilization. Field researchers document drill holes of identical depth and spacing that stonemasons say they could not replicate today without diamond-tipped power tools.",upvotes:7100,comments:1102,credible:68,debunked:32,tags:["Puma Punku","Lost Tech","Ancient","CNC","Bolivia"],premium:false},
  {id:"s49",type:"research",source:"Ancient Code",                 sourceUrl:"https://www.ancient-code.com",         time:"6h ago", topic:"Lost Technology",             region:"🇱🇧 Israel / Middle East",title:"Baalbek: The 1,200-Ton Stone of the Pregnant Woman — No Modern Crane Can Lift It", summary:"The quarry at Baalbek, Lebanon contains the largest known worked stones in history — including the Stone of the Pregnant Woman at 1,200 tons. No crane in the world today can lift a single Baalbek foundation stone. The Roman-era temple was built on top of a far older megalithic foundation whose origin and construction method remain entirely unexplained.",upvotes:6400,comments:921, credible:74,debunked:26,tags:["Baalbek","Megalithic","Lost Tech","Lebanon"],premium:false},
  {id:"s50",type:"research",source:"Graham Hancock / Ancient Apocalypse",sourceUrl:"https://grahamhancock.com",     time:"7h ago", topic:"Hidden History",              region:"🌍 Global",               title:"The Younger Dryas Impact: A Comet Strike 12,800 Years Ago Destroyed an Advanced Global Civilization", summary:"A growing body of scientific evidence — including nano-diamonds, platinum anomalies, and burned layers found on four continents — supports the Younger Dryas Impact hypothesis: that a comet strike around 12,800 BCE caused a catastrophic global event that destroyed an advanced pre-ice age civilization. This explains why megalithic sites appear globally with no developmental sequence.",upvotes:5900,comments:881, credible:62,debunked:38,tags:["Younger Dryas","Comet","Lost Civilization","Graham Hancock"],premium:false},
  {id:"s51",type:"research",source:"Ancient Origins",              sourceUrl:"https://www.ancient-origins.net",      time:"8h ago", topic:"Ancient Civilizations",       region:"🇪🇬 Egypt",               title:"The Osireion at Abydos: Built Before the Pyramids? Massive Granite Structure Defies Official Chronology", summary:"The Osireion — discovered beneath the Temple of Seti I at Abydos — is built from massive red granite blocks in a style completely different from New Kingdom Egyptian construction. Geologist Robert Schoch and others argue the building style matches structures contemporaneous with the Great Sphinx, suggesting an origin thousands of years before Seti I. No inscriptions, no dedications — just massive precision stonework.",upvotes:4800,comments:712, credible:66,debunked:34,tags:["Osireion","Egypt","Abydos","Lost Tech","Schoch"],premium:true},
  {id:"s52",type:"research",source:"Randall Carlson / Kosmographia",sourceUrl:"https://randallcarlson.com",         time:"9h ago", topic:"Hidden History",              region:"🌍 Global",               title:"Sacred Geometry in Ancient Architecture: The Same Mathematical Constants Encoded Worldwide — Independently", summary:"Researcher Randall Carlson documents that ancient sites worldwide — from the Great Pyramid to Angkor Wat to Stonehenge — encode identical mathematical relationships: Pi, Phi (golden ratio), the precession of the equinoxes, and the dimensions of the Earth itself. The probability of this occurring by independent coincidence is astronomically small, suggesting either a common advanced source civilization or a lost mathematical tradition transmitted globally.",upvotes:5300,comments:781, credible:61,debunked:39,tags:["Sacred Geometry","Phi","Pyramid","Precession","Randall Carlson"],premium:true},

  // ── GODS, ANCIENT BEINGS & ADVANCED CIVILIZATIONS ─────────────────────────
  {id:"s53",type:"research",source:"World History Encyclopedia",  sourceUrl:"https://www.worldhistory.org",          time:"10h ago",topic:"Ancient Civilizations",       region:"🌍 Global",               title:"The Sumerian King List: Rulers Who Reigned for Thousands of Years Before the Flood — Cuneiform Primary Source", summary:"The Sumerian King List, a cuneiform document discovered at Nippur, records kings who ruled for tens of thousands of years before a great flood. After the flood, lifespans drop dramatically to human-normal lengths. Researchers debate whether this records actual dynasties, mythological time, or evidence of a pre-flood civilization. It is the oldest known historical document to reference the flood narrative.",upvotes:4600,comments:621, credible:70,debunked:30,tags:["Sumerian","King List","Flood","Cuneiform","Pre-Flood"],premium:false},
  {id:"s54",type:"research",source:"Gaia / Billy Carson",          sourceUrl:"https://www.gaia.com",                 time:"11h ago",topic:"Ancient Civilizations",       region:"🌍 Global",               title:"Ancient Beings as Engineers: The Göbekli Tepe Builders Knew Astronomy, Geometry, and Built Before Agriculture Existed", summary:"New research at Göbekli Tepe confirms the 12,000-year-old site encodes star maps — specifically Deneb, Arcturus, and the Pleiades — in its pillar arrangements. The builders had sophisticated astronomical knowledge, geometric precision, and organized labor capability — all predating the supposed invention of agriculture by 1,000 years. This overturns the model of a linear progression from primitive to advanced.",upvotes:5700,comments:841, credible:82,debunked:18,tags:["Gobekli Tepe","Astronomy","Ancient Beings","Pre-History"],premium:false},
  {id:"s55",type:"research",source:"Sitchin Archive",              sourceUrl:"https://sitchin.com",                  time:"12h ago",topic:"Ancient Civilizations",       region:"🌍 Global",               title:"Zecharia Sitchin: The Anunnaki Genetically Engineered Homo Sapiens 250,000 Years Ago — Sumerian Texts Decoded", summary:"Zecharia Sitchin's translations of Sumerian texts describe the Anunnaki creating humanity through genetic engineering — mixing their DNA with Homo erectus — to produce a slave race for mining gold. The Atrahasis Epic parallels the Genesis creation and flood accounts almost word for word. Mainstream archaeologists reject Sitchin's translations; alternative researchers point to the structural parallels as too precise to dismiss.",upvotes:6800,comments:1041,credible:45,debunked:55,tags:["Anunnaki","Sitchin","Genetic Engineering","Creation","Sumerian"],premium:true},
  {id:"s56",type:"research",source:"Robert Sepehr — YouTube",      sourceUrl:"https://www.youtube.com/@RobertSepehr", time:"13h ago",topic:"Hidden History",              region:"🌍 Global",               title:"The Aryan Mystery: Secret Societies, Blood Types, and the Hidden History of Humanity's True Origins", summary:"Anthropologist Robert Sepehr's research examines the role of blood type distribution, genetic haplogroups, and ancient migration patterns in understanding humanity's hidden origins. He explores connections between ancient Aryan peoples, Atlantis, the Vedic traditions, and the origins of secret societies — arguing that mainstream history has deliberately suppressed knowledge of pre-Flood civilizations.",upvotes:4200,comments:601, credible:48,debunked:52,tags:["Aryan","Blood Type","Haplogroup","Hidden History","Sepehr"],premium:true},

  // ── COMPREHENSIVE DOLPHIN FILES ────────────────────────────────────────────
  {id:"s57",type:"archive", source:"Wikipedia / USNI Proceedings",sourceUrl:"https://en.wikipedia.org/wiki/United_States_Navy_Marine_Mammal_Program",time:"1h ago",topic:"Animal Intelligence",region:"🇺🇸 USA",title:"US Navy Marine Mammal Program: Classified 1967–1992 — What the Black Budget Dolphin Program Actually Did", summary:"The US Navy Marine Mammal Program (NMMP) began in 1960 studying dolphin hydrodynamics for torpedo and submarine design. By 1963 it became an active training program. In 1967 it was classified as a black budget program. Declassified only in 1992 — but operational details remain sealed. At peak during the Reagan years: 150+ dolphins, $8M annual budget, deployed in 25 countries. Some researchers call it the Cetacean Intelligence Mission rather than its official name — suggesting the scope went far beyond mine detection.",upvotes:8200,comments:1401,credible:88,debunked:12,tags:["Navy","Dolphins","Classified","NMMP","Black Budget"],premium:false},

  {id:"s58",type:"research",source:"History.com / Military History",sourceUrl:"https://www.history.com/articles/navy-marine-mammal-program-history-dolphins-sea-lions",time:"2h ago",topic:"Animal Intelligence",region:"🇺🇸 USA",title:"The 5 Operational Dolphin Teams: Mine Detection, Swimmer Killing Devices, Harbor Patrol, and What They Won't Confirm", summary:"The Navy officially acknowledges five operational dolphin teams. MK-4 and MK-7 detect tethered and bottom mines. MK-8 clears landing corridors for troop insertions. MK-6 uses dolphins for anti-swimmer harbor defense — the dolphin approaches from behind and bumps a device onto the diver's air tank triggering an explosive buoy alert. Unconfirmed analyst claims describe carbonic acid injection devices mounted on dolphin heads — fired on contact with enemy divers. The Navy has never confirmed or denied the full scope of MK-6 offensive capabilities.",upvotes:7100,comments:1102,credible:74,debunked:26,tags:["NMMP","MK6","Swimmer","Mine","Dolphins","Combat"],premium:false},

  {id:"s59",type:"archive", source:"Military Marine Mammal Wikipedia / lflank.wordpress.com",sourceUrl:"https://en.wikipedia.org/wiki/Military_marine_mammal",time:"3h ago",topic:"Animal Intelligence",region:"🇺🇸 USA",title:"CIA Sent Scientist James Fitzgerald to Key West 1964 — Classified Dolphin Lab and the Intelligence Program Nobody Talks About", summary:"According to declassified sources, the CIA sent scientist James Fitzgerald to Key West, Florida in 1964 to establish a classified laboratory studying dolphins. The program ran parallel to the Navy NMMP — with the CIA angle focused on intelligence applications rather than mine detection. The lab's full scope, findings, and what happened to its research remain classified. This is the CIA's dolphin program that almost nobody knows existed alongside the Navy's.",upvotes:6800,comments:981,credible:62,debunked:38,tags:["CIA","Dolphins","James Fitzgerald","Key West","Classified"],premium:false},

  {id:"s60",type:"research",source:"Supercluster / Vice",          sourceUrl:"https://www.supercluster.com/editorial/how-dolphins-on-lsd-shaped-the-search-for-extraterrestrial-intelligence",time:"4h ago",topic:"Animal Intelligence",region:"🇺🇸 USA",title:"Dr. John C. Lilly: CIA-Funded, NASA-Contracted, LSD-Injecting Dolphin Researcher Who Founded the Science of Interspecies Communication", summary:"Dr. John C. Lilly — physician, neuroscientist, inventor of the isolation tank — opened the Communication Research Institute in St. Thomas in the 1960s funded by NASA and the CIA. NASA wanted a model for communicating with extraterrestrial intelligence. The CIA wanted dolphins as underwater spies. In 1964 Lilly began injecting dolphins with LSD to enhance communication — documented in a 1965 conference paper. Dolphin vocalizations increased dramatically. He co-founded the Order of the Dolphins with Carl Sagan. The CIA's interest in Lilly — through MK-Ultra era consciousness programs — has been confirmed in documents released decades later.",upvotes:9100,comments:1502,credible:82,debunked:18,tags:["Lilly","CIA","NASA","LSD","MK-Ultra","Dolphins","SETI"],premium:false},

  {id:"s61",type:"research",source:"VeteranLife / USNavy",          sourceUrl:"https://veteranlife.com/military-history/marine-mammal-program",time:"5h ago",topic:"Animal Intelligence",region:"🌍 Global",title:"Vietnam War 1965–1975, Persian Gulf 1986–1988, Iraq War 2003: The Combat Deployments of US Military Dolphins That History Barely Covers", summary:"Navy dolphins were operationally deployed in Vietnam from 1965–1975 guarding ammunition piers from enemy divers. In the Persian Gulf they escorted Kuwaiti oil tankers and patrolled for mines during the Iran-Iraq War 1986–1988. In 2003 during the Iraq War K-Dog and other dolphins detected and marked over 100 anti-ship mines at the port of Umm Qasr — clearing the way for the initial troop landings. In 1996 six dolphins patrolled San Francisco Bay to protect the Republican National Convention. The Navy acknowledges deployments in 25 countries — the full list remains classified.",upvotes:7400,comments:1041,credible:91,debunked:9,tags:["Navy","Dolphins","Vietnam","Iraq","Persian Gulf","Combat"],premium:false},

  {id:"s62",type:"research",source:"Historic Mysteries / Military Wiki",sourceUrl:"https://www.historicmysteries.com/history/military-marine-mammal/30639/",time:"6h ago",topic:"Animal Intelligence",region:"🌍 Global",title:"Soviet and Russian Military Dolphins: Sevastopol, Iran Sale, Arctic Bases, and Two Pens Placed at Ukraine Invasion Harbor", summary:"The Soviet Union ran a parallel dolphin program at Sevastopol, Crimea. Unlike the US program which denies offensive training, the Soviets are believed to have equipped dolphins with weapons. After the USSR collapsed the program transferred to Ukraine — which sold the dolphins and the chief trainer to Iran in 2000. Russia reactivated the program in 2012. After the 2014 Crimea annexation Russia took over Ukraine's remaining dolphins. When Russia invaded Ukraine in 2022, satellite imagery confirmed two dolphin pens placed at the entrance to Sevastopol harbor — the Black Sea's largest naval base — and additional pens at the secretive Arctic Olenya Guba facility.",upvotes:8600,comments:1301,credible:85,debunked:15,tags:["Russia","Soviet","Dolphins","Sevastopol","Ukraine","Military","Iran"],premium:false},

  {id:"s63",type:"research",source:"NOAA Fisheries / LegalClarity",  sourceUrl:"https://www.fisheries.noaa.gov/marine-life-distress/frequent-questions-feeding-or-harassing-marine-mammals-wild",time:"7h ago",topic:"Animal Intelligence",region:"🇺🇸 USA",title:"Marine Mammal Protection Act: Why It Is Illegal to Touch, Feed, Chase or Attempt to Interact With Wild Dolphins — and Why Researchers Think the Government Knows More Than It Says", summary:"The MMPA of 1972 makes it a federal crime to 'take' any marine mammal — defined as harass, hunt, capture, collect, or kill, including attempts. Penalties reach $100,000 per violation and one year imprisonment. Each dolphin in a pod = a separate violation. Verbal communication is not explicitly illegal — but any act that disrupts behavioral patterns qualifies as Level B harassment. The law applies to US citizens anywhere on Earth including international waters. Researchers note: you cannot legally interact with wild dolphins yet the Navy does so daily under congressional exemption. The 1986 MMPA amendment granted the Pentagon the right to take dolphins from the wild for 'national defense purposes' — a carve-out that exists in no other wildlife law.",upvotes:7800,comments:1201,credible:96,debunked:4,tags:["MMPA","Law","Dolphins","Pentagon","National Defense","Exemption"],premium:false},

  {id:"s64",type:"research",source:"Give.do / The Print / Sonar",   sourceUrl:"https://wearesonar.org/dolphin-and-whale-nonhuman-personhood/",time:"8h ago",topic:"Animal Intelligence",region:"🌍 Global",title:"Global Dolphin Personhood: India 2013, Malibu 2014, Pacific Islands 2025 — Governments Officially Declaring Dolphins Non-Human Persons", summary:"In 2013 India became the first nation to officially declare dolphins 'non-human persons' — banning all captive dolphin shows and stating it is 'morally unacceptable to keep them captive.' In 2014 Malibu's mayor passed a resolution granting dolphins and whales the right to freedom. In 2025 Pacific Island leaders granted cetaceans personhood status. The 2010 international Declaration of Rights for Cetaceans declared them persons with rights to life, freedom of movement, and not to be killed, captured, bred, or enslaved. The EU applied great ape research bans to cetaceans — calling them 'great apes of the water.'",upvotes:6900,comments:981,credible:90,debunked:10,tags:["Personhood","India","Dolphins","Rights","Non-Human","Global Law"],premium:false},

  {id:"s65",type:"research",source:"Wild Dolphin Project / Cambridge Declaration",sourceUrl:"https://www.wilddolphinproject.org",time:"9h ago",topic:"Animal Intelligence",region:"🌍 Global",title:"What We Actually Know About Dolphin Intelligence: Cambridge Declaration, Mirror Tests, Name Whistles, Culture, Grief — The Evidence Governments Don't Publicize", summary:"The 2012 Cambridge Declaration on Consciousness — signed in presence of Stephen Hawking — confirmed dolphins are conscious and self-aware. Dolphins pass the mirror self-recognition test (only humans, great apes, elephants, and magpies also pass). They choose unique name whistles before age one that are remembered 20+ years. Shark Bay Australia documents sponge tool use transmitted mother-to-daughter across three generations — qualifying as culture. Dr. Denise Herzing's 35-year Wild Dolphin Project documents syntax in communication, multigenerational dialect transmission, and grief — mothers carrying dead calves for weeks. A 2024 study confirmed dolphins imitate computer-generated sounds they have never heard.",upvotes:8400,comments:1302,credible:97,debunked:3,tags:["Consciousness","Cambridge","Mirror Test","Intelligence","Dolphins","Culture"],premium:false},

  {id:"s66",type:"research",source:"Dr. Denise Herzing / WDP",       sourceUrl:"https://www.wilddolphinproject.org/media/scientific-publications/",time:"10h ago",topic:"Animal Intelligence",region:"🌍 Global",title:"What Global Governments May Be Hiding About Dolphins: Classified Programs, Suppressed Intelligence Research, and the Question Nobody Asks", summary:"Several layers of classification surround dolphin research: (1) The CIA's 1964 Key West lab — full scope classified. (2) NMMP operational details — still classified 30+ years after the program was 'declassified.' (3) Soviet weaponization details — never fully disclosed. (4) Whether communication research with dolphins produced results beyond what was published — John Lilly's CIA-funded work never fully disclosed. (5) North Korea reportedly developing its own military dolphin program in 2024. (6) Whether the 1986 MMPA national defense exemption was used to take dolphins for intelligence — not just military — purposes. The most classified intelligence programs globally involve three things that overlap: consciousness, communication, and non-human intelligence. Dolphins are the intersection of all three.",upvotes:9800,comments:1601,credible:55,debunked:45,tags:["Classified","CIA","Dolphins","Consciousness","Hidden","Intelligence"],premium:true},

  // ── DAVID PAULIDES — MISSING 411 ──────────────────────────────────────────
  {id:"s78",type:"research",source:"CanAm Missing / Missing411.com",  sourceUrl:"https://www.canammissing.com",time:"1h ago",topic:"Unresolved Events",region:"🇺🇸 USA",title:"Missing 411: David Paulides Documents 9,000+ Hours of Research Into Unexplained National Park Disappearances — Patterns That Defy Explanation", summary:"Former law enforcement officer David Paulides spent 9,000+ hours investigating disappearances in US National Parks after a ranger tipped him off to a disturbing pattern. His findings: victims disappear in good weather with no distress call. Bodies are found miles away in terrain search teams already covered. Clothing is missing or neatly arranged. No trail of passage. Berry bushes stripped near discovery sites. Victims are often found in or near water. The National Park Service refused his FOIA request for a list of missing persons — citing cost. No other government database tracks this.",upvotes:14200,comments:2102,credible:72,debunked:28,tags:["Missing 411","Paulides","National Parks","Disappearances","FOIA","Unexplained"],premium:false},

  {id:"s79",type:"research",source:"Missing411.com / CanAm",          sourceUrl:"https://missing411.com",time:"2h ago",topic:"Unresolved Events",region:"🇺🇸 USA",title:"The Missing 411 Profile Points: 30+ Consistent Patterns Across Hundreds of Disappearances That Cannot Be Explained by Conventional Search Theory", summary:"Paulides identified 30+ profile points appearing consistently across cases: disappearances near boulder fields or granite outcroppings; victims last seen near berry patches; dogs cannot track scent; victims found in water despite not being near water when last seen; clothing found neatly folded or missing entirely; victims recovered with no memory of what happened; weather changes immediately after disappearance; discovery sites already searched multiple times. The clusters map to specific geographic zones. The NPS has never commented. Some researchers point to interdimensional portals. Others point to predatory human networks. The cases remain officially unexplained.",upvotes:12800,comments:1901,credible:65,debunked:35,tags:["Missing 411","Profile Points","National Parks","Paulides","Patterns"],premium:false},

  {id:"s80",type:"research",source:"CanAm Missing Project",            sourceUrl:"https://www.canammissing.com",time:"3h ago",topic:"Unresolved Events",region:"🇺🇸 USA",title:"Missing 411: The Hunted — Experienced Hunters With Military Training Vanish in the Woods. Something Is Hunting Them Back", summary:"Paulides' 2019 documentary The Hunted focuses exclusively on experienced hunters — many with military backgrounds — who vanished in wilderness areas. These are not lost hikers. These are men with compass skills, survival training, and firearms who were in familiar territory. Several cases: hunters who called family to say they were coming home and never arrived. Shots fired with no casualty found. Weapons found but hunter gone. Paulides argues the pattern in hunter disappearances is distinct from civilian cases and suggests an active predatory intelligence.",upvotes:11400,comments:1701,credible:61,debunked:39,tags:["Missing 411","Hunters","Military","Paulides","Predator","Wilderness"],premium:false},

  // ── REMOTE VIEWING GOVERNMENT FILES ───────────────────────────────────────
  {id:"s67",type:"archive", source:"CIA Reading Room",              sourceUrl:"https://www.cia.gov/readingroom/collection/stargate",time:"1h ago",topic:"Remote Viewing & PSI",region:"🇺🇸 USA",title:"Project STARGATE: The CIA's $20 Million 25-Year Psychic Espionage Program — Now Fully Declassified", summary:"Project STARGATE was the code name for a classified US Army / DIA program established 1978 at Fort Meade, Maryland to weaponize psychic phenomena for intelligence collection against the Soviet Union. Ran for over 20 years. $20 million budget confirmed. Physicists Hal Puthoff and Russell Targ at Stanford Research Institute were the lead scientists. CIA fully declassified 12 million pages of Stargate documents in 2017. The entire archive is searchable at the CIA Reading Room. Congressman Charles Rose stated in the House Intelligence Committee: 'It seemed like a hell of a cheap radar system — and if the Russians have it and we don't, we're in serious trouble.'",upvotes:11200,comments:1802,credible:95,debunked:5,tags:["Stargate","CIA","Remote Viewing","Declassified","DIA","Puthoff"],premium:false},

  {id:"s68",type:"research",source:"War History Online / Decrypted Matrix",sourceUrl:"https://www.warhistoryonline.com/war-articles/project-stargate.html",time:"2h ago",topic:"Remote Viewing & PSI",region:"🇺🇸 USA",title:"Ingo Swann: The Psychic Who Remote-Viewed Jupiter Before Pioneer-10 Got There — and Found a Ring Nobody Knew Existed", summary:"Ingo Swann — artist and psychic, co-creator of remote viewing — was tested at Stanford Research Institute in 1972. CIA funded his research. In 1973 Swann remote-viewed Jupiter before the Pioneer-10 flyby and described a ring around the planet. Scientists assumed he had confused it with Saturn. When Pioneer-10 reached Jupiter the ring was confirmed. Swann also remote-viewed classified Soviet facilities from coordinates alone — with results that convinced CIA analysts to continue funding. He later claimed to have remote-viewed extraterrestrial bases on the Moon.",upvotes:9400,comments:1401,credible:71,debunked:29,tags:["Ingo Swann","Remote Viewing","Jupiter","CIA","Pioneer","Moon"],premium:false},

  {id:"s69",type:"research",source:"Decrypted Matrix / Black Vault",  sourceUrl:"https://decryptedmatrix.com/project-stargate-cia-classified-psychic-espionage-program/",time:"3h ago",topic:"Remote Viewing & PSI",region:"🇺🇸 USA",title:"The Remote Viewers Who Described Soviet Nuclear Submarines, Hidden Weapons, and a Secret Mars Colony from a Locked Room", summary:"Project Stargate remote viewers — including Pat Price (retired police commissioner), Joe McMoneagle (Army intelligence), and others — were given nothing but geographic coordinates and asked to describe what was there. Pat Price described a classified Soviet facility in Siberia with extraordinary accuracy in 1974. McMoneagle's readings of Soviet submarine construction were reportedly used in operational intelligence. A 1984 session described structures on Mars from 1 million years ago — the transcript remains in the CIA archive. The program was officially terminated in 1995, but researchers argue it went black rather than dark.",upvotes:10100,comments:1601,credible:64,debunked:36,tags:["Stargate","Remote Viewing","Soviet","Mars","Pat Price","McMoneagle"],premium:false},

  {id:"s70",type:"archive", source:"CIA Reading Room (direct PDF)",   sourceUrl:"https://www.cia.gov/readingroom/docs/CIA-RDP96-00788R001700210016-3.pdf",time:"4h ago",topic:"Remote Viewing & PSI",region:"🇺🇸 USA",title:"CIA Gateway Process: Declassified 1983 Army Report Concludes Human Consciousness Can Leave the Body and Access Other Dimensions", summary:"A 1983 US Army Intelligence & Security Command analysis of the Monroe Institute's Gateway Experience — declassified and now freely downloadable from the CIA Reading Room — concludes that human consciousness can be separated from space-time and used to access information non-locally. The report uses physics, quantum mechanics, and holographic universe theory to explain how it works. The document was classified for 37 years. When released it went viral — millions read it. The Army concluded: it works, and the mechanism is rooted in physics not mysticism.",upvotes:14200,comments:2102,credible:88,debunked:12,tags:["CIA","Gateway Process","Consciousness","Monroe Institute","Declassified","OBE"],premium:false},

  {id:"s71",type:"research",source:"Black Vault / IRP.fas.org",       sourceUrl:"https://irp.fas.org/program/collect/stargate.htm",time:"5h ago",topic:"Remote Viewing & PSI",region:"🇺🇸 USA",title:"Soviet Psychotronics: The USSR Spent 60 Million Rubles Annually on Psychic Warfare — Which Is Why the US Launched Stargate", summary:"The CIA launched the remote viewing program specifically because Soviet intelligence reports confirmed the USSR was spending the equivalent of $60 million annually on psychotronics — the weaponization of psychic phenomena. The CIA obtained a book by Canadian journalists Sheila Ostrander and Lynn Schroeder documenting Soviet PSI research and used it as justification to fund Puthoff and Targ. Both superpowers were simultaneously running classified psychic warfare programs throughout the Cold War. Neither has fully disclosed what they found.",upvotes:8800,comments:1301,credible:82,debunked:18,tags:["Soviet","Psychotronics","Cold War","CIA","Remote Viewing","USSR"],premium:false},

  // ── PORTALS, STARGATES & INTERDIMENSIONAL RESEARCH ─────────────────────────
  {id:"s72",type:"research",source:"Academic Block / Sacred Illusion",  sourceUrl:"https://www.academicblock.com/science/fringe-science/stargates-and-portals",time:"1h ago",topic:"Portals & Stargates",region:"🌍 Global",title:"Ancient Stargates: Sumerian Gate of Anu, Egyptian Osiris Portal, Tiahuanaco Gateway of the Sun — Ancient Civilizations Built Physical Portal Technology", summary:"Sumerian texts describe the Gate of Anu — a physical structure through which gods traversed dimensions. The Egyptian Book of the Dead describes 21 gates with guardians that souls must navigate. Tiahuanaco's Gateway of the Sun in Bolivia is aligned to precise astronomical coordinates and features carvings researchers argue depict portal activation sequences. Researcher and archaeologist Dr. Heather Lynn connects these to Anunnaki technology described in Sitchin's translations. Mike Ricksecker's Portals to the Stars documents physical portal research across ancient global sites.",upvotes:7800,comments:1102,credible:48,debunked:52,tags:["Stargate","Sumerian","Egypt","Tiahuanaco","Portal","Ancient"],premium:false},

  {id:"s73",type:"research",source:"Sacred Illusion / MagellanTV",     sourceUrl:"https://www.sacredillusion.com/stargates-and-doors-to-nowhere-portals-illusions-or-entrances-to-elsewhere/",time:"2h ago",topic:"Portals & Stargates",region:"🇺🇸 USA",title:"The Montauk Project: Classified Time Travel, Mind Control, and Interdimensional Portals at Camp Hero Air Force Station 1943–1983", summary:"The Montauk Project — documented in books by Preston Nichols and Peter Moon — alleges that Camp Hero, Montauk NY, was the site of classified government experiments in time travel, mind control, and opening interdimensional portals from the 1940s through the 1980s. The theory connects to the 1943 Philadelphia Experiment in which the USS Eldridge reportedly vanished from a Philadelphia shipyard. A psychic named Duncan Cameron reportedly opened a time portal that created a tear in space-time that researchers claim was deliberately collapsed. The site is now Camp Hero State Park. The underground facilities remain sealed.",upvotes:8200,comments:1201,credible:38,debunked:62,tags:["Montauk","Time Travel","Portal","Camp Hero","Philadelphia Experiment","Classified"],premium:false},

  {id:"s74",type:"research",source:"CERN / Israel First Substack",    sourceUrl:"https://home.cern/science/experiments/lhc",time:"3h ago",topic:"Portals & Stargates",region:"🌍 Global",title:"CERN Large Hadron Collider: Scientists Searching for 'Extra Dimensions' and Dark Matter — Critics Say It Already Opened Something", summary:"CERN has publicly stated that one of the goals of the Large Hadron Collider is to find evidence of extra dimensions and dark matter. In 2024 CERN activated the LHC during the solar eclipse and stated: 'What exactly we would detect would depend on the number of extra dimensions.' Critics argue this is portal research under a physics label. The LHC sits on the ancient site of St. Genis-Pouilly — a Roman town whose name derives from the Latin Appolliacum, built over a temple to Apollo described as a gateway to the underworld. CERN's campus features a statue of Shiva performing the Nataraja — the cosmic dance of creation and destruction.",upvotes:9100,comments:1502,credible:45,debunked:55,tags:["CERN","LHC","Extra Dimensions","Portal","Dark Matter","Shiva"],premium:false},

  {id:"s75",type:"research",source:"Skinwalker Ranch / George Knapp",  sourceUrl:"https://skinwalker-ranch.com",time:"4h ago",topic:"Portals & Stargates",region:"🇺🇸 USA",title:"Skinwalker Ranch: Instrumented Scientific Research Confirms Anomalous Portal-Like Phenomena — DoD Funded Investigation", summary:"Skinwalker Ranch in Utah has been the subject of instrumented scientific investigation funded by the Department of Defense through the Advanced Aerospace Weapon System Applications Program (AAWSAP) — the same program that spawned the AATIP UAP investigation. Researchers document: UAP appearing and disappearing in specific sky locations consistently, cattle mutilation with surgical precision, poltergeist phenomena, and what instruments record as localized tears in space measuring magnetic, electromagnetic, and radiation anomalies simultaneously. Former DIA official Dr. James Lacatski led the DoD investigation. His findings remain classified.",upvotes:10400,comments:1601,credible:61,debunked:39,tags:["Skinwalker","Portal","DoD","AAWSAP","DIA","Classified","UAP"],premium:false},

  {id:"s76",type:"research",source:"Iraq Stargate / Medium",          sourceUrl:"https://medium.com/@iram.ahmed1997/the-iraqi-stargate-conspiracy-a-modern-perspective-on-an-ancient-mystery-18d3cd39ff8f",time:"5h ago",topic:"Portals & Stargates",region:"🇮🇶 Iraq",title:"The Iraqi Stargate: Why the US Established Military Zones Around Ancient Sumerian Sites Immediately After Invasion in 2003", summary:"Researchers document that following the 2003 Iraq invasion, US forces established restricted military zones around ancient Sumerian sites including Ur, Nineveh, and Babylon — while the Baghdad Museum was looted of thousands of irreplaceable artifacts with no military intervention. Some claim soldiers reported time anomalies and electromagnetic disturbances near ancient sites. The theory: Sumerian tablets describe the Gate of Anu as a physical device, and the real objective of occupying Iraq was to control access to ancient portal technology buried beneath the oldest human civilization on Earth.",upvotes:8600,comments:1302,credible:35,debunked:65,tags:["Iraq","Stargate","Sumerian","2003","Artifacts","Gate of Anu"],premium:true},

  {id:"s77",type:"research",source:"Thirdi.us / Tourism and Travel",   sourceUrl:"https://thirdi.us/blog/2024/07/unlocking-the-mysteries-of-stargates-portals-to-other-dimensions-and-realms/",time:"6h ago",topic:"Portals & Stargates",region:"🌍 Global",title:"Global Portal Sites: Mount Shasta, Sedona, Stonehenge, Machu Picchu, Easter Island — What Instruments Detect at Each Location", summary:"Researchers have documented measurable electromagnetic anomalies at every major ancient site associated with portal or vortex activity. Mount Shasta: Native American traditions of underground cities and interdimensional beings, plus measured magnetic anomalies. Sedona: Benjamin Lonetree's decade of magnetometer data. Stonehenge: confirmed solar and lunar alignment precision beyond architectural necessity. Machu Picchu: built on geological intersection of multiple fault lines creating piezoelectric energy. Easter Island: moai aligned to specific star systems. The common thread: all are built on granite and quartz formations that generate electromagnetic fields under tectonic pressure.",upvotes:7400,comments:1101,credible:55,debunked:45,tags:["Portals","Mount Shasta","Stonehenge","Sedona","Electromagnetic","Ancient Sites"],premium:false},
];


// ─── SEED COMMUNITY POSTS ─────────────────────────────────────────────────────
export const SEED_POSTS = [
  { id:"c1", user:"RedactedArchive",    badge:"Investigator", time:"2h ago",  topic:"Government & Intelligence",    region:"🇺🇸 USA",title:"Cross-referencing Epstein flight logs — 34 names never reported on",                             body:"Using court-filed documents and FOIA releases I've cross-referenced 34 names on the manifests that have never appeared in any mainstream coverage. Several are still in active government positions.", upvotes:4211, comments:891, refs:[{label:"DocumentCloud Court Files",url:"https://www.documentcloud.org"}], tags:["Epstein","FOIA"], confidence:"likely", contentType:"research", pinned:true },
  { id:"c2", user:"EnochResearcher",    badge:"Researcher",   time:"3h ago",  topic:"Biblical & Religious Records",  region:"🇮🇱 Israel / Middle East",title:"Parallel passages between Book of Enoch and Genesis 6 — line by line comparison",               body:"The Book of Enoch was found among the Dead Sea Scrolls, confirming it predates the New Testament. I've done a full side-by-side of Enoch chapters 6-11 and Genesis 6:1-4. The Nephilim account is nearly identical — suggesting a common source text.",         upvotes:3102, comments:567, refs:[{label:"Dead Sea Scrolls Digital Library",url:"https://www.deadseascrolls.org.il"},{label:"Book of Enoch Full Text",url:"https://www.amazon.com/Book-Enoch-R-H-Charles/dp/1478318759"}], tags:["Enoch","Nephilim","Genesis"], confidence:"confirmed", contentType:"research", pinned:true },
  { id:"c3", user:"OceanDepthsOnly",    badge:"Researcher",   time:"4h ago",  topic:"Animal Intelligence",           region:"🌍 Global",title:"Dolphins in Shark Bay Passing Tool Use to Offspring — Documented Across 3 Generations",          body:"Research from Shark Bay, Australia documents bottlenose dolphins using marine sponges to protect their snouts while foraging. This behavior is taught exclusively mother to daughter and has been documented across three generations — qualifying as culture.",    upvotes:3918, comments:621, refs:[{label:"NOAA Ocean Exploration",url:"https://oceanexplorer.noaa.gov"},{label:"Shark Bay Research",url:"https://www.monkeymia.com.au"}], tags:["Dolphins","Tool Use","Culture"], confidence:"confirmed", contentType:"research", pinned:false },
  { id:"c4", user:"HistoricalRecord77", badge:"Analyst",      time:"8h ago",  topic:"Giants & Nephilim",            region:"🇺🇸 USA",title:"1880s News Archives: Giant Skeleton Reports Before Smithsonian Consolidated the Finds",          body:"I've compiled 47 newspaper articles from 1848-1912 reporting giant skeletal discoveries across Ohio, Illinois, and Tennessee. All were transferred to the Smithsonian. None are publicly accessible today. The timing correlates with the institution's founding.", upvotes:5200, comments:890, refs:[{label:"NewspaperArchive.com",url:"https://newspaperarchive.com"},{label:"Smithsonian FOIA Records",url:"https://www.si.edu/foia"}], tags:["Giants","Smithsonian","Archives"], confidence:"likely", contentType:"research", pinned:false },
];

// ─── MEDIA LIBRARY ────────────────────────────────────────────────────────────
export const MEDIA_LIBRARY = [
  // ── BOOKS — links go to author sites or verified search pages ──────────────
  {id:"b1",  type:"book", title:"JFK and the Unspeakable",                       author:"James W. Douglass",          year:2008, topic:"Government & Intelligence",    tags:["JFK","CIA","Assassination"],            desc:"The most thorough investigation into the Kennedy assassination. Douglass argues the CIA was involved due to Kennedy's secret peace overtures to Khrushchev.",                                              url:"https://www.amazon.com/JFK-Unspeakable-Happened-Why-Matters/dp/1439193886",               rating:4.8},
  {id:"b2",  type:"book", title:"The Creature from Jekyll Island",               author:"G. Edward Griffin",          year:1994, topic:"Finance & Power",              tags:["Federal Reserve","Banking"],            desc:"The definitive exposé arguing the Federal Reserve is a private banking cartel operating entirely outside democratic oversight.",                                                                          url:"https://www.amazon.com/Creature-Jekyll-Island-Federal-Reserve/dp/091298645X",                      rating:4.7},
  {id:"b3",  type:"book", title:"One Nation Under Blackmail (Vol. 1 & 2)",       author:"Whitney Webb",               year:2022, topic:"Unresolved Events",            tags:["Epstein","Intelligence","Maxwell"],     desc:"Two-volume investigation into the Epstein network tracing its origins through decades of intelligence operations and political blackmail. Webb's best work.",                                              url:"https://www.amazon.com/One-Nation-Under-Blackmail-Intelligence/dp/1634243218",                   rating:4.9},
  {id:"b4",  type:"book", title:"Operation Paperclip",                           author:"Annie Jacobsen",             year:2014, topic:"Government & Intelligence",    tags:["NASA","Nazi","WWII"],                   desc:"How 1,600 Nazi scientists were secretly transferred to the U.S. after WWII, forming the foundation of American aerospace and weapons programs.",                                                            url:"https://www.amazon.com/Operation-Paperclip-Intelligence-Program-Scientists/dp/0316221031",                   rating:4.6},
  {id:"b5",  type:"book", title:"Dark Alliance",                                 author:"Gary Webb",                  year:1998, topic:"Government & Intelligence",    tags:["CIA","Drugs","Contras"],                desc:"Documents how CIA-backed Contras flooded American cities with crack cocaine. Webb died of two gunshot wounds, ruled suicide.",                                                                              url:"https://www.amazon.com/Dark-Alliance-Contras-Crack-Cocaine/dp/1888363894",                        rating:4.7},
  {id:"b6",  type:"book", title:"Fingerprints of the Gods",                      author:"Graham Hancock",             year:1995, topic:"Hidden History",               tags:["Ancient","Civilization","Pyramids"],    desc:"Landmark work arguing a technologically advanced civilization existed before recorded history, destroyed around 12,000 years ago.",                                                                          url:"https://www.amazon.com/Fingerprints-Gods-Graham-Hancock/dp/0517887290",                        rating:4.6},
  {id:"b7",  type:"book", title:"America Before",                                author:"Graham Hancock",             year:2019, topic:"Hidden History",               tags:["Ancient","America","Pre-History"],      desc:"Hancock examines evidence for advanced civilizations in the Americas thousands of years before conventional archaeology acknowledges.",                                                                       url:"https://www.amazon.com/America-Before-Key-Earths-Civilization/dp/1250168252",                                  rating:4.7},
  {id:"b8",  type:"book", title:"The Book of Enoch (Complete Text)",             author:"R.H. Charles (translator)",  year:1917, topic:"Biblical & Religious Records",  tags:["Enoch","Watchers","Nephilim","Angels"], desc:"The complete Book of Enoch — found among the Dead Sea Scrolls — detailing the Watchers, Nephilim giants, and their judgment. Excluded from the canon at Nicaea. Free to read online.",               url:"https://www.amazon.com/Book-Enoch-R-H-Charles/dp/1478318759",                                      rating:4.8},
  {id:"b9",  type:"book", title:"Fallen Angels and the Origins of Evil",         author:"Elizabeth Clare Prophet",    year:2000, topic:"Biblical & Religious Records",  tags:["Enoch","Fallen Angels","Nephilim"],     desc:"Draws on the Book of Enoch, Dead Sea Scrolls, and comparative mythology to trace the tradition of fallen angels and giant offspring across ancient civilizations.",                                         url:"https://www.amazon.com/Fallen-Angels-Origins-Evil-Ancient/dp/0922729853",             rating:4.4},
  {id:"b10", type:"book", title:"Giants: Sons of the Gods",                      author:"Douglas Van Dorn",           year:2013, topic:"Giants & Nephilim",             tags:["Giants","Nephilim","Biblical"],         desc:"Theological and historical examination of the Nephilim, Rephaim, and giant beings throughout the Old Testament, cross-referencing Hebrew, Aramaic, and Greek source texts.",                                url:"https://www.amazon.com/Giants-Sons-Douglas-Van-Dorn/dp/0615815375",                   rating:4.5},
  {id:"b11", type:"book", title:"The 12th Planet (Earth Chronicles Vol. 1)",     author:"Zecharia Sitchin",           year:1976, topic:"Ancient Civilizations",        tags:["Anunnaki","Nibiru","Sumerian"],         desc:"Sitchin's foundational work interpreting Sumerian clay tablets as evidence of the Anunnaki — an alleged race who shaped early human civilization. Official author archive at sitchin.com.",                 url:"https://sitchin.com/",                                                       rating:4.4},
  {id:"b12", type:"book", title:"The Biggest Secret",                            author:"David Icke",                 year:1999, topic:"Secret Societies",              tags:["Reptilian","Elite","Control"],          desc:"Icke's landmark work connecting royal bloodlines, secret societies, and what he describes as an interdimensional control structure. Decades of dot-connecting research.",                                    url:"https://davidicke.com/product-category/books/",                              rating:4.3},
  {id:"b13", type:"book", title:"The Reveal",                                    author:"David Icke",                 year:2024, topic:"Secret Societies",              tags:["Control","Reality","Elite"],            desc:"Icke's latest work uncovering mechanisms of power operating behind politics, media, and finance — his most recent synthesis of decades of research.",                                                       url:"https://davidicke.com/product-category/books/",                              rating:4.2},
  {id:"b14", type:"book", title:"The Wes Penre Papers — Levels 1–5 (Free PDFs)", author:"Wes Penre",                 year:2011, topic:"Forbidden Science",             tags:["Anunnaki","Multiverse","Hidden History"],"desc":"Five levels of research into human origins, the Anunnaki, and interdimensional forces — all available free as PDFs. One of the most comprehensive alternative research archives online.",              url:"https://wespenre.com/category/level-1-5-in-pdf/",                           rating:4.6},
  {id:"b15", type:"book", title:"Are Dolphins Really Smart?",                    author:"Justin Gregg",               year:2013, topic:"Animal Intelligence",          tags:["Dolphins","Intelligence","Science"],    desc:"A critical scientific examination of dolphin intelligence research — what the evidence actually shows about their cognitive abilities, communication, and self-awareness.",                                  url:"https://www.amazon.com/Are-Dolphins-Really-Smart-Justin/dp/0199927413",                rating:4.2},
  {id:"b16", type:"book", title:"Dolphin Mysteries",                             author:"Kathleen M. Dudzinski",      year:2008, topic:"Animal Intelligence",          tags:["Dolphins","Communication","Research"],  desc:"15 years studying dolphin communication in the wild. Documents complex social structures, individual personalities, and sophisticated acoustic signaling.",                                                    url:"https://www.amazon.com/Dolphin-Mysteries-Unlocking-Communications-Kathleen/dp/0300119321",                    rating:4.3},
  {id:"b17", type:"book", title:"Forbidden Science",                             author:"Jacques Vallée",             year:1992, topic:"Forbidden Science",            tags:["UAP","Science","Suppression"],          desc:"Journal entries from one of the world's leading UAP researchers, documenting his private investigation and the institutional resistance to serious scientific inquiry.",                                      url:"https://www.amazon.com/Forbidden-Science-Pacific-Heights-1980-1989/dp/1949501248",                       rating:4.5},
  {id:"b18", type:"book", title:"The Perception Deception",                      author:"Michael Tsarion",            year:2012, topic:"Secret Societies",              tags:["Occult","Origins","Control"],           desc:"Tsarion's research into human origins, the occult history of the Western world, and the hidden forces behind modern political and religious institutions.",                                                   url:"https://www.michaeltsarion.com",                                             rating:4.3},
  {id:"b19", type:"book", title:"Behold a Pale Horse",                           author:"Milton William Cooper",      year:1991, topic:"Government & Intelligence",    tags:["NWO","UFO","Secret Societies"],         desc:"Former Naval Intelligence officer's account of secret government programs, UFOs, and shadow power structures. One of the most widely read alternative books ever published.",                                url:"https://www.amazon.com/Behold-Pale-Horse-William-Cooper/dp/0929385225",                       rating:4.6},
  {id:"b20", type:"book", title:"The Trigger",                                   author:"David Icke",                 year:2019, topic:"Unresolved Events",            tags:["9/11","Conspiracy","Control"],          desc:"Icke's investigation into 9/11 and the global power structures he argues orchestrated it — a 900-page deep dive with hundreds of source references.",                                                       url:"https://davidicke.com/product-category/books/",                             rating:4.2},

  // ── DOCUMENTARIES ──────────────────────────────────────────────────────────
  {id:"d1",  type:"documentary", title:"The Century of the Self",           author:"Adam Curtis",        year:2002, topic:"Media & Disclosure",           tags:["Propaganda","PR","Psychology"],          desc:"BBC masterwork tracing how Freud's theories were weaponized by Bernays to create modern PR and mass public manipulation. Watch free on YouTube.",                                                             url:"https://www.youtube.com/watch?v=eJ3RzGoQC4s",                               rating:4.9},
  {id:"d2",  type:"documentary", title:"Citizenfour",                       author:"Laura Poitras",      year:2014, topic:"Surveillance",                 tags:["Snowden","NSA","Five Eyes"],             desc:"Oscar-winning documentary filmed in real time as Snowden revealed NSA global surveillance to journalists in a Hong Kong hotel room.",                                                                          url:"https://www.imdb.com/title/tt4044364/",                                      rating:4.6},
  {id:"d3",  type:"documentary", title:"Inside Job",                        author:"Charles Ferguson",   year:2010, topic:"Finance & Power",              tags:["2008","Wall Street","Banks"],            desc:"Oscar-winning dissection of the 2008 financial crisis showing systematic fraud at the highest levels of government and finance.",                                                                              url:"https://www.imdb.com/title/tt1645089/",                                      rating:4.7},
  {id:"d4",  type:"documentary", title:"Ancient Apocalypse",                author:"Graham Hancock",     year:2022, topic:"Hidden History",               tags:["Ancient","Civilization","Geology"],      desc:"Hancock's Netflix series presenting evidence for a lost pre-ice age civilization. Available on Netflix.",                                                                                                     url:"https://www.netflix.com/title/81211003",                                     rating:4.2},
  {id:"d5",  type:"documentary", title:"Giants: The Mystery and the Myth",  author:"National Geographic", year:2000, topic:"Giants & Nephilim",           tags:["Giants","Mythology","Archaeology"],      desc:"National Geographic explores worldwide giant legends — from Greek Titans to biblical Nephilim to Polynesian giants — and what archaeology has actually found.",                                              url:"https://www.youtube.com/results?search_query=Giants+Mystery+Myth+National+Geographic",rating:4.0},
  {id:"d6",  type:"documentary", title:"Secrets of the Dead Sea Scrolls",   author:"National Geographic", year:2017, topic:"Biblical & Religious Records",  tags:["Dead Sea Scrolls","Qumran","Canon"],    desc:"Examines the Dead Sea Scrolls and what they reveal about Jewish thought before the Biblical canon was fixed, including Book of Enoch texts.",                                                                 url:"https://www.youtube.com/results?search_query=Secrets+Dead+Sea+Scrolls+documentary",  rating:4.2},
  {id:"d7",  type:"documentary", title:"The Book of Enoch Documentary",     author:"Stephen Quayle",     year:2016, topic:"Biblical & Religious Records",  tags:["Enoch","Nephilim","Watchers"],          desc:"Detailed examination of the Book of Enoch — its history, its exclusion from the canon, and its implications for understanding the Nephilim.",                                                                 url:"https://www.youtube.com/watch?v=q_CjAUoiVBk",                               rating:4.1},
  {id:"d8",  type:"documentary", title:"Dolphin: Spy in the Pod",           author:"John Downer Prods.", year:2014, topic:"Animal Intelligence",          tags:["Dolphins","Behavior","Intelligence"],    desc:"Award-winning BBC documentary using robot spy cameras embedded in dolphin pods to capture never-before-seen behavior including tool use and problem solving.",                                                 url:"https://www.imdb.com/title/tt3522372/",                                      rating:4.5},
  {id:"d9",  type:"documentary", title:"The Social Dilemma",                author:"Jeff Orlowski",      year:2020, topic:"Media & Disclosure",           tags:["Social Media","Algorithm","Tech"],       desc:"Former tech insiders from Google, Facebook, and Twitter reveal how platforms are engineered to manipulate behavior at any cost. On Netflix.",                                                                 url:"https://www.thesocialdilemma.com/",                                          rating:4.3},
  {id:"d10", type:"documentary", title:"Unacknowledged",                    author:"Steven Greer",       year:2017, topic:"UAP & Anomalous",              tags:["UFO","UAP","Government"],                desc:"Military officials and intelligence officers testify on government concealment of extraterrestrial contact and reverse-engineered craft.",                                                                    url:"https://www.unacknowledged.info/",                                           rating:4.0},
  {id:"d11", type:"documentary", title:"HyperNormalisation",                author:"Adam Curtis",        year:2016, topic:"Media & Disclosure",           tags:["Politics","Media","Reality"],            desc:"Curtis argues politicians and financiers constructed a fake simplified world because they could no longer manage real complexity. Free on YouTube.",                                                          url:"https://www.youtube.com/watch?v=oJLqyuxm96k",                               rating:4.5},
  {id:"d12", type:"documentary", title:"The Spider's Web",                  author:"Michael Oswald",     year:2017, topic:"Finance & Power",              tags:["UK","Offshore","Finance"],               desc:"How Britain quietly became the world's largest tax haven network. Free to watch on YouTube.",                                                                                                                url:"https://www.youtube.com/watch?v=np_ylvc8Zj8",                               rating:4.6},
  {id:"d13", type:"documentary", title:"Forbidden Archaeology",             author:"Michael Cremo",      year:1996, topic:"Forbidden Science",            tags:["Archaeology","Suppression","Human Origins"],desc:"Presents evidence of human artifacts found in geological strata far older than accepted — and institutional suppression of these findings.",                                                          url:"https://www.youtube.com/results?search_query=Forbidden+Archaeology+Cremo+documentary",rating:4.0},
  {id:"d14", type:"documentary", title:"David Icke: The Dot Connector",     author:"David Icke",         year:2022, topic:"Secret Societies",             tags:["Control","Reality","Elite"],             desc:"Icke's signature documentary series connecting global events through his research framework. Available through Ickonic.com subscription.",                                                                   url:"https://www.ickonic.com/",                                                   rating:4.0},

  // ── FILMS ──────────────────────────────────────────────────────────────────
  {id:"f1",  type:"film", title:"All the President's Men",  author:"Alan J. Pakula",   year:1976, topic:"Government & Intelligence",    tags:["Watergate","Nixon","Press"],          desc:"The definitive dramatization of the Washington Post investigation that brought down Nixon.",                                                                                          url:"https://www.imdb.com/title/tt0074119/",  rating:4.7},
  {id:"f2",  type:"film", title:"The Big Short",            author:"Adam McKay",       year:2015, topic:"Finance & Power",              tags:["2008","Wall Street","Fraud"],         desc:"How a handful of investors discovered the U.S. housing market was fraudulent while banks sold toxic securities to the public.",                                                      url:"https://www.imdb.com/title/tt1596363/",  rating:4.5},
  {id:"f3",  type:"film", title:"Dark Waters",              author:"Todd Haynes",      year:2019, topic:"Health & Science",             tags:["DuPont","Cover-up","PFAS"],           desc:"True story of attorney Rob Bilott exposing DuPont's 20-year concealment of PFAS forever-chemical contamination in American water supplies.",                                        url:"https://www.imdb.com/title/tt9071322/",  rating:4.4},
  {id:"f4",  type:"film", title:"Snowden",                  author:"Oliver Stone",     year:2016, topic:"Surveillance",                 tags:["Snowden","NSA","CIA"],                desc:"Oliver Stone's dramatization of Snowden's journey from NSA contractor to the world's most wanted whistleblower.",                                                                      url:"https://www.imdb.com/title/tt3774114/",  rating:4.2},
  {id:"f5",  type:"film", title:"Noah",                     author:"Darren Aronofsky", year:2014, topic:"Biblical & Religious Records",  tags:["Noah","Watchers","Giants"],           desc:"Aronofsky's controversial adaptation draws directly from the Book of Enoch — includes the Watchers as fallen angel rock giants rather than Genesis alone.",                         url:"https://www.imdb.com/title/tt1959563/",  rating:3.9},
  {id:"f6",  type:"film", title:"Contact",                  author:"Robert Zemeckis",  year:1997, topic:"Forbidden Science",            tags:["SETI","Science","Contact"],           desc:"Based on Carl Sagan's novel — mirrors real SETI funding battles and the institutional resistance to evidence of extraterrestrial contact.",                                          url:"https://www.imdb.com/title/tt0118884/",  rating:4.3},
  {id:"f7",  type:"film", title:"Official Secrets",         author:"Gavin Hood",       year:2019, topic:"Government & Intelligence",    tags:["UK","Iraq","Whistleblower"],          desc:"True story of GCHQ analyst Katharine Gun who leaked a classified NSA memo revealing US spying on UN members over the Iraq War vote.",                                              url:"https://www.imdb.com/title/tt5431890/",  rating:4.2},

  // ── PODCASTS ───────────────────────────────────────────────────────────────
  {id:"p1",  type:"podcast", title:"The Corbett Report Podcast",               author:"James Corbett",               year:2007, topic:"Government & Intelligence",    tags:["Deep State","CIA","History"],           desc:"One of the longest-running independent investigative podcasts. Every claim meticulously sourced. Deep dives on the Federal Reserve, 9/11, and the deep state.",                   url:"https://www.corbettreport.com/podcasts/",                                    rating:4.8},
  {id:"p2",  type:"podcast", title:"The Why Files",                            author:"AJ Gentile",                  year:2021, topic:"Unresolved Events",            tags:["Mystery","History","Paranormal"],       desc:"Deeply researched, well-sourced investigations into historical mysteries, unexplained events, and contested history. One of the fastest-growing research channels.",              url:"https://www.youtube.com/@TheWhyFiles",                                       rating:4.7},
  {id:"p3",  type:"podcast", title:"Witness Testimony: Book of Enoch Series",  author:"Tim Alberino",                year:2022, topic:"Biblical & Religious Records",  tags:["Enoch","Nephilim","Watchers"],          desc:"Multi-part series examining the Book of Enoch in full context — its exclusion from the Biblical canon and implications for Genesis 6.",                                             url:"https://www.gensix.com",                                                     rating:4.5},
  {id:"p4",  type:"podcast", title:"UnchartedX",                               author:"Ben van Kerkwyk",             year:2020, topic:"Ancient Civilizations",        tags:["Egypt","Megalithic","Lost Tech"],        desc:"Field researcher examining anomalous ancient construction — unexplained precision stonework at global megalithic sites. Outstanding original research.",                           url:"https://www.youtube.com/@UnchartedX1",                                       rating:4.7},
  {id:"p5",  type:"podcast", title:"Wes Penre Video Series",                   author:"Wes Penre",                   year:2019, topic:"Forbidden Science",            tags:["Anunnaki","Multiverse","Hidden History"],"desc":"Wes Penre presents his research on human origins, the Anunnaki, and interdimensional forces in video format. Companion to the free written papers at wespenre.com.",        url:"https://www.youtube.com/results?search_query=wes+penre+papers",              rating:4.5},
  {id:"p6",  type:"podcast", title:"David Icke — The Dot Connector (Video)",   author:"David Icke",                  year:2020, topic:"Secret Societies",             tags:["Control","Reality","Elite"],            desc:"Icke's video series connecting global events through his framework of hidden control. Available through Ickonic. Free clips on YouTube.",                                          url:"https://www.youtube.com/results?search_query=David+Icke+dot+connector",      rating:4.0},
  {id:"p7",  type:"podcast", title:"Michael Tsarion — Origins & Oracles",      author:"Michael Tsarion",             year:2005, topic:"Hidden History",               tags:["Occult","Origins","Ancient Ireland"],   desc:"Tsarion's extensive video series on occult history, the origins of evil, and the hidden history of the Western world. Irish researcher and alternative historian.",                 url:"https://www.michaeltsarion.com",                                             rating:4.4},
  {id:"p8",  type:"podcast", title:"Mysteries of the Bible",                   author:"Biblical Archaeology Society", year:2018, topic:"Biblical & Religious Records",  tags:["Bible","Archaeology","History"],        desc:"Peer-reviewed examination of archaeological evidence for Biblical narratives — from the Dead Sea Scrolls to the search for Sodom and Noah's Ark.",                                url:"https://www.biblicalarchaeology.org/podcasts/",                              rating:4.3},
  {id:"p9",  type:"podcast", title:"Stuff They Don't Want You to Know",         author:"iHeart Radio",                year:2009, topic:"Unresolved Events",            tags:["Conspiracy","Research","History"],      desc:"Well-produced podcast examining suppressed history, government secrets, and unresolved events with a balanced, research-first approach.",                                          url:"https://www.iheart.com/podcast/182-stuff-they-dont-want-you-17913675/",      rating:4.3},
  {id:"p10", type:"podcast", title:"Into the Impossible",                       author:"Dr. Bernard Haisch",          year:2019, topic:"Forbidden Science",            tags:["Consciousness","Physics","UAP"],        desc:"Physicist interviews scientists on the fringes of mainstream physics — zero-point energy, consciousness research, and UAP phenomena from a credentialed scientific perspective.",   url:"https://www.youtube.com/@IntotheImpossiblePodcast",                          rating:4.4},
  {id:"p11", type:"podcast", title:"The Higherside Chats",                      author:"Greg Carlwood",               year:2011, topic:"Government & Intelligence",    tags:["Deep State","Research","Alternative"],  desc:"Long-form interviews with researchers, authors, and investigators covering everything from ancient history to modern power structures.",                                            url:"https://www.thehighersidechats.com",                                         rating:4.3},
  {id:"p12", type:"podcast", title:"Coast to Coast AM",                         author:"George Noory",                year:1988, topic:"UAP & Anomalous",              tags:["UAP","Paranormal","Fringe"],            desc:"The longest-running overnight radio program covering UAP, the paranormal, fringe science, and suppressed history. Massive listener archive.",                                       url:"https://www.coasttocoastam.com",                                             rating:4.0},

  // ── ARTICLES & PAPERS ─────────────────────────────────────────────────────
  {id:"a1",  type:"article", title:"The CIA and the Media",                      author:"Carl Bernstein",              year:1977, topic:"Media & Disclosure",           tags:["CIA","Mockingbird","Press"],            desc:"Bernstein's 25,000-word Rolling Stone investigation: 400 American journalists secretly worked for the CIA over 25 years. Full text online.",                                       url:"https://www.carlbernstein.com/the-cia-and-the-media-rolling-stone-10-20-1977", rating:5.0},
  {id:"a2",  type:"article", title:"The Great American Bubble Machine",          author:"Matt Taibbi",                 year:2009, topic:"Finance & Power",              tags:["Goldman Sachs","Wall Street"],          desc:"Taibbi's Rolling Stone exposé on Goldman Sachs. Remains the most widely read piece of financial investigative journalism.",                                                       url:"https://www.rollingstone.com/politics/politics-news/the-great-american-bubble-machine-195229/", rating:4.9},
  {id:"a3",  type:"article", title:"Pentagon's Mysterious UFO Program",          author:"NY Times",                    year:2017, topic:"UAP & Anomalous",              tags:["UAP","Pentagon","AATIP"],               desc:"The Times article that broke the existence of the Pentagon's secret Advanced Aerospace Threat Identification Program.",                                                             url:"https://www.nytimes.com/2017/12/16/us/politics/unidentified-aerial-phenomena.html", rating:4.9},
  {id:"a4",  type:"article", title:"How Jeffrey Epstein Got Away With It",       author:"Julie K. Brown",              year:2018, topic:"Unresolved Events",            tags:["Epstein","Cover-up","Justice"],         desc:"The Miami Herald investigation that reopened the Epstein case and led to his 2019 arrest. Full investigation archive online.",                                                      url:"https://www.miamiherald.com/news/local/article220097825.html",               rating:5.0},
  {id:"a5",  type:"article", title:"The Drone Papers",                           author:"The Intercept",               year:2015, topic:"Government & Intelligence",    tags:["Drones","CIA","Kill List"],             desc:"Leaked classified documents: 90% of drone strike victims were not the intended targets. Full documents and analysis.",                                                              url:"https://theintercept.com/drone-papers/",                                     rating:5.0},
  {id:"a6",  type:"article", title:"The Book of Enoch — Full Text (Free)",       author:"R.H. Charles (trans.)",       year:1917, topic:"Biblical & Religious Records",  tags:["Enoch","Dead Sea Scrolls","Watchers"],  desc:"Complete free online text of the Book of Enoch from Sacred Texts archive. The primary source document for Nephilim research.",                                                    url:"https://www.sacred-texts.com/bib/boe/",                                      rating:5.0},
  {id:"a7",  type:"article", title:"What Dolphins Tell Us About Mind",           author:"Sy Montgomery",               year:2015, topic:"Animal Intelligence",          tags:["Dolphins","Consciousness","Mind"],      desc:"Orion Magazine's landmark piece on Dr. Denise Herzing's 28 years of field research with wild Atlantic spotted dolphins in the Bahamas.",                                           url:"https://orionmagazine.org/article/deep-intellect/",                          rating:4.8},
  {id:"a8",  type:"article", title:"Giants in the Earth: The Nephilim Study",    author:"Chuck Missler",               year:2004, topic:"Giants & Nephilim",             tags:["Nephilim","Genesis","Giants"],          desc:"Scholarly examination of the Nephilim of Genesis 6 — their identity and reappearance in Numbers 13 as the giants the Israelite spies reported.",                                  url:"https://www.khouse.org",                                                     rating:4.4},
  {id:"a9",  type:"article", title:"Wes Penre Papers — Introductory Level (Free)","author":"Wes Penre",               year:2011, topic:"Forbidden Science",            tags:["Anunnaki","Shadow Government","NWO"],   desc:"Free introductory-level paper covering the global elite and shadow government — the entry point to the Wes Penre Papers research archive.",                                       url:"https://wespenre.com/category/level-1-5-in-pdf/",                           rating:4.6},
  {id:"a10", type:"article", title:"The Gospel of Thomas: A Hidden Gospel",      author:"Elaine Pagels",               year:2003, topic:"Biblical & Religious Records",  tags:["Thomas","Gospel","Gnostic"],            desc:"Harvard theologian examines the Gospel of Thomas — discovered at Nag Hammadi in 1945 — and what its 114 sayings reveal about early Christianity.",                                url:"https://www.pbs.org/wgbh/pages/frontline/shows/religion/maps/primary/thomas.html", rating:4.7},
  {id:"a11", type:"article", title:"Jordan Maxwell — Symbol of the Gods Archive", author:"Jordan Maxwell (archive)",   year:2022, topic:"Secret Societies",             tags:["Occult","Symbolism","Secret Societies"], desc:"Jordan Maxwell's life work on occult symbolism, religious symbolism, and secret societies — now preserved at JordanMaxwellVideos.com following his passing in March 2022.",    url:"https://www.jordanmaxwellvideos.com",                                        rating:4.5},
  {id:"a12", type:"article", title:"Electronic Text Corpus of Sumerian Literature", author:"Oxford University",        year:2006, topic:"Ancient Civilizations",        tags:["Sumerian","Anunnaki","Primary Source"],  desc:"The complete searchable database of Sumerian literature from Oxford University — primary sources for evaluating all Anunnaki and ancient civilization claims.",                     url:"https://etcsl.orinst.ox.ac.uk/",                                            rating:5.0},
  {id:"b1",  type:"book", title:"JFK and the Unspeakable", author:"James W. Douglass", year:2008, topic:"Government & Intelligence", tags:["JFK","CIA","Assassination"], desc:"The most thorough investigation into the Kennedy assassination. Argues the CIA was involved due to Kennedy's secret peace overtures to Khrushchev.", url:"https://www.amazon.com/JFK-Unspeakable-Happened-Why-Matters/dp/1439193886", rating:4.8},
  {id:"b2",  type:"book", title:"The Creature from Jekyll Island",               author:"G. Edward Griffin",          year:1994, topic:"Finance & Power",             tags:["Federal Reserve","Banking"],            desc:"The definitive exposé arguing the Federal Reserve is a private banking cartel operating entirely outside democratic oversight.",                                                                          url:"https://www.amazon.com/Creature-Jekyll-Island-Federal-Reserve/dp/091298645X",        rating:4.7},
  {id:"b3",  type:"book", title:"One Nation Under Blackmail",                    author:"Whitney Webb",               year:2022, topic:"Unresolved Events",           tags:["Epstein","Intelligence","Maxwell"],     desc:"Two-volume investigation into the Epstein network tracing its origins through decades of intelligence operations and political blackmail.",                                                                  url:"https://www.amazon.com/One-Nation-Under-Blackmail-Vol/dp/1634243218",                rating:4.9},
  {id:"b4",  type:"book", title:"Operation Paperclip",                           author:"Annie Jacobsen",             year:2014, topic:"Government & Intelligence",   tags:["NASA","Nazi","WWII"],                   desc:"How 1,600 Nazi scientists were secretly transferred to the U.S. after WWII, forming the foundation of American aerospace and weapons programs.",                                                            url:"https://www.amazon.com/Operation-Paperclip-Intelligence-Program-Scientists/dp/0316221031", rating:4.6},
  {id:"b5",  type:"book", title:"Dark Alliance",                                 author:"Gary Webb",                  year:1998, topic:"Government & Intelligence",   tags:["CIA","Drugs","Contras"],                desc:"Documents how CIA-backed Contras flooded American cities with crack cocaine. Webb died of two gunshot wounds, ruled suicide.",                                                                              url:"https://www.amazon.com/Dark-Alliance-Contras-Crack-Cocaine-Explosion/dp/1888363894",  rating:4.7},
  {id:"b6",  type:"book", title:"Fingerprints of the Gods",                      author:"Graham Hancock",             year:1995, topic:"Hidden History",              tags:["Ancient","Civilization","Pyramids"],    desc:"Landmark work arguing a technologically advanced civilization existed before recorded history, destroyed around 12,000 years ago.",                                                                          url:"https://www.amazon.com/Fingerprints-Gods-Graham-Hancock/dp/0517887290",              rating:4.6},
  {id:"b7",  type:"book", title:"America Before",                                author:"Graham Hancock",             year:2019, topic:"Hidden History",              tags:["Ancient","America","Pre-History"],      desc:"Hancock examines evidence for advanced civilizations in the Americas thousands of years before conventional archaeology acknowledges.",                                                                       url:"https://www.amazon.com/America-Before-Key-Earths-Civilization/dp/1250153735",        rating:4.7},
  {id:"b8",  type:"book", title:"The Book of Enoch",                             author:"R.H. Charles (translator)",  year:1917, topic:"Biblical & Religious Records", tags:["Enoch","Watchers","Nephilim","Angels"], desc:"The complete Book of Enoch — a pre-Biblical Jewish text found among the Dead Sea Scrolls detailing the Watchers, the Nephilim giants, and their judgment. Excluded from the canonical Bible at Nicaea.", url:"https://www.amazon.com/Book-Enoch-R-H-Charles/dp/1585093734",                        rating:4.8},
  {id:"b9",  type:"book", title:"Fallen Angels and the Origins of Evil",         author:"Elizabeth Clare Prophet",    year:2000, topic:"Biblical & Religious Records", tags:["Enoch","Fallen Angels","Nephilim"],     desc:"Draws on the Book of Enoch, Dead Sea Scrolls, and comparative mythology to trace the tradition of fallen angels and their giant offspring across ancient civilizations.",                                   url:"https://www.amazon.com/Fallen-Angels-Origins-Evil-Ancient/dp/0922729853",            rating:4.4},
  {id:"b10", type:"book", title:"Giants: Sons of the Gods",                      author:"Douglas Van Dorn",           year:2013, topic:"Giants & Nephilim",           tags:["Giants","Nephilim","Biblical"],         desc:"A theological and historical examination of the Nephilim, Rephaim, and giant beings described throughout the Old Testament, cross-referencing Hebrew, Aramaic, and Greek source texts.",                   url:"https://www.amazon.com/Giants-Sons-Gods-Douglas-Dorn/dp/0578119056",                 rating:4.5},
  {id:"b11", type:"book", title:"The Nephilim and the Pyramid of the Apocalypse",author:"Patrick Heron",             year:2004, topic:"Giants & Nephilim",           tags:["Nephilim","Pyramids","Apocalypse"],     desc:"Argues the Nephilim of Genesis 6 were responsible for megalithic construction worldwide and traces their lineage through to the Book of Revelation.",                                                        url:"https://www.amazon.com/Nephilim-Pyramid-Apocalypse-Patrick-Heron/dp/0806528109",     rating:4.2},
  {id:"b12", type:"book", title:"The 12th Planet",                               author:"Zecharia Sitchin",           year:1976, topic:"Ancient Civilizations",       tags:["Anunnaki","Nibiru","Sumerian"],         desc:"Sitchin's foundational work interpreting Sumerian texts as evidence of an extraterrestrial race called the Anunnaki who visited Earth and shaped early human civilization.",                                 url:"https://www.amazon.com/12th-Planet-Zecharia-Sitchin/dp/0939680882",                  rating:4.4},
  {id:"b13", type:"book", title:"Are Dolphins Really Smart?",                    author:"Justin Gregg",               year:2013, topic:"Animal Intelligence",         tags:["Dolphins","Intelligence","Science"],    desc:"A critical scientific examination of dolphin intelligence research — what the evidence actually shows about their cognitive abilities, communication, and self-awareness.",                                  url:"https://www.amazon.com/Are-Dolphins-Really-Smart-Justin/dp/0199927413",              rating:4.2},
  {id:"b14", type:"book", title:"Dolphin Mysteries",                             author:"Kathleen M. Dudzinski",      year:2008, topic:"Animal Intelligence",         tags:["Dolphins","Communication","Research"],  desc:"A cetacean researcher's account of 15 years studying dolphin communication and social behavior in the wild, documenting complex social structures and individual personalities.",                           url:"https://www.amazon.com/Dolphin-Mysteries-Unlocking-Communications-Kathleen/dp/0300119321", rating:4.3},
  {id:"b15", type:"book", title:"The Suppressed History of America",             author:"Paul Schrag & Xaviant Haze", year:2011, topic:"Hidden History",              tags:["Giants","Suppression","America"],       desc:"Documents evidence of pre-Columbian contact, giant skeletons, and advanced ancient cultures in North America — and the institutional suppression of these findings.",                                      url:"https://www.amazon.com/Suppressed-History-America-Pocahontas-Revelations/dp/1591431417", rating:4.1},
  {id:"b16", type:"book", title:"The Lost Gospel",                               author:"Simcha Jacobovici",          year:2014, topic:"Biblical & Religious Records", tags:["Jesus","Gospel","Suppressed"],          desc:"Draws on a suppressed Syriac manuscript to argue it contains a coded account of Jesus's marriage and family, hidden from the canonical record.",                                                             url:"https://www.amazon.com/Lost-Gospel-Decoding-Manuscript-1500-Year/dp/1605987700",     rating:4.0},
  {id:"b17", type:"book", title:"Forbidden Science",                             author:"Jacques Vallée",             year:1992, topic:"Forbidden Science",           tags:["UAP","Science","Suppression"],          desc:"Journal entries from one of the world's leading UAP researchers, documenting his private investigation and the institutional resistance to serious scientific inquiry into anomalous phenomena.",              url:"https://www.amazon.com/Forbidden-Science-Pacific-Heights-1980-1989/dp/1949501248",   rating:4.5},
  {id:"b18", type:"book", title:"The Age of Surveillance Capitalism",            author:"Shoshana Zuboff",            year:2019, topic:"Surveillance",               tags:["Tech","Data","Google"],                 desc:"Harvard professor's analysis of how tech companies harvest behavioral data to predict and modify human behavior without meaningful consent.",                                                                 url:"https://www.amazon.com/Age-Surveillance-Capitalism-Future-Frontier/dp/1610395697",   rating:4.5},
  {id:"b19", type:"book", title:"Behold a Pale Horse",                           author:"Milton William Cooper",      year:1991, topic:"Government & Intelligence",   tags:["NWO","UFO","Secret Societies"],         desc:"Former Naval Intelligence officer's account of secret government programs, UFOs, and shadow power structures. One of the most widely read alternative books ever published.",                                url:"https://www.amazon.com/Behold-Pale-Horse-William-Cooper/dp/0929385225",               rating:4.6},
  {id:"b20", type:"book", title:"The Search for the Manchurian Candidate",       author:"John Marks",                 year:1979, topic:"Government & Intelligence",   tags:["MK-Ultra","CIA","Mind Control"],        desc:"First comprehensive account of MK-Ultra based on 16,000 FOIA documents, interviewing survivors and CIA officials to document the full scope.",                                                              url:"https://www.amazon.com/Search-Manchurian-Candidate-CIA-Control/dp/0393307948",       rating:4.5},

  // ── DOCUMENTARIES ──────────────────────────────────────────────────────────
  {id:"d1",  type:"documentary", title:"The Century of the Self",           author:"Adam Curtis",        year:2002, topic:"Media & Disclosure",          tags:["Propaganda","PR","Psychology"],          desc:"BBC masterwork tracing how Freud's theories were weaponized by Bernays to create modern PR and mass public manipulation.",                                                                                  url:"https://www.imdb.com/title/tt0432232/",                                               rating:4.9},
  {id:"d2",  type:"documentary", title:"Citizenfour",                       author:"Laura Poitras",      year:2014, topic:"Surveillance",                tags:["Snowden","NSA","Five Eyes"],             desc:"Oscar-winning documentary filmed in real time as Snowden revealed NSA global surveillance to journalists in a Hong Kong hotel.",                                                                              url:"https://www.imdb.com/title/tt4044364/",                                               rating:4.6},
  {id:"d3",  type:"documentary", title:"Inside Job",                        author:"Charles Ferguson",   year:2010, topic:"Finance & Power",             tags:["2008","Wall Street","Banks"],            desc:"Oscar-winning dissection of the 2008 financial crisis showing systematic fraud was enabled at the highest levels of government and finance.",                                                                url:"https://www.imdb.com/title/tt1645089/",                                               rating:4.7},
  {id:"d4",  type:"documentary", title:"Ancient Apocalypse",                author:"Graham Hancock",     year:2022, topic:"Hidden History",              tags:["Ancient","Civilization","Geology"],      desc:"Hancock's Netflix series presenting evidence for a lost pre-ice age civilization across eight episodes examining global megalithic sites.",                                                                   url:"https://www.imdb.com/title/tt22807484/",                                              rating:4.2},
  {id:"d5",  type:"documentary", title:"The Social Dilemma",                author:"Jeff Orlowski",      year:2020, topic:"Media & Disclosure",          tags:["Social Media","Algorithm","Tech"],       desc:"Former tech insiders from Google, Facebook, and Twitter reveal how platforms are engineered to manipulate behavior at any cost.",                                                                             url:"https://www.imdb.com/title/tt11464826/",                                              rating:4.3},
  {id:"d6",  type:"documentary", title:"Unacknowledged",                    author:"Steven Greer",       year:2017, topic:"UAP & Anomalous",             tags:["UFO","UAP","Government"],                desc:"Military officials and intelligence officers testify on government concealment of extraterrestrial contact and reverse-engineered craft.",                                                                    url:"https://www.imdb.com/title/tt6109656/",                                               rating:4.0},
  {id:"d7",  type:"documentary", title:"Giants: The Mystery and the Myth",  author:"National Geographic", year:2000, topic:"Giants & Nephilim",          tags:["Giants","Mythology","Archaeology"],      desc:"National Geographic explores worldwide giant legends — from Greek Titans to the biblical Nephilim to Polynesian giants — and what archaeology has actually found.",                                          url:"https://www.imdb.com/title/tt0449040/",                                               rating:4.0},
  {id:"d8",  type:"documentary", title:"Secrets of the Dead Sea Scrolls",   author:"National Geographic", year:2017, topic:"Biblical & Religious Records",tags:["Dead Sea Scrolls","Qumran","Canon"],    desc:"Examines the Dead Sea Scrolls — discovered in 1947 — and what they reveal about the diversity of Jewish thought before the Biblical canon was fixed, including Enoch texts.",                                url:"https://www.imdb.com/title/tt7083310/",                                               rating:4.2},
  {id:"d9",  type:"documentary", title:"The Book of Enoch Documentary",     author:"Stephen Quayle",     year:2016, topic:"Biblical & Religious Records", tags:["Enoch","Nephilim","Watchers"],          desc:"A detailed examination of the Book of Enoch — its history, its exclusion from the Biblical canon, and its implications for understanding the Nephilim and fallen angel accounts in Genesis.",               url:"https://www.youtube.com/watch?v=q_CjAUoiVBk",                                        rating:4.1},
  {id:"d10", type:"documentary", title:"Dolphin: Spy in the Pod",           author:"John Downer Prods.", year:2014, topic:"Animal Intelligence",         tags:["Dolphins","Behavior","Intelligence"],    desc:"Award-winning BBC documentary using robot spy cameras embedded in dolphin pods to capture never-before-seen behavior — including tool use, problem solving, and what appears to be recreational drug use.", url:"https://www.imdb.com/title/tt3522372/",                                               rating:4.5},
  {id:"d11", type:"documentary", title:"HyperNormalisation",                author:"Adam Curtis",        year:2016, topic:"Media & Disclosure",          tags:["Politics","Media","Reality"],            desc:"Curtis argues politicians and financiers constructed a fake simplified world because they could no longer manage real complexity.",                                                                           url:"https://www.imdb.com/title/tt6156350/",                                               rating:4.5},
  {id:"d12", type:"documentary", title:"The Spider's Web",                  author:"Michael Oswald",     year:2017, topic:"Finance & Power",             tags:["UK","Offshore","Finance"],               desc:"How Britain quietly became the world's largest tax haven network through Overseas Territories after the collapse of empire.",                                                                                url:"https://www.imdb.com/title/tt7061458/",                                               rating:4.6},
  {id:"d13", type:"documentary", title:"Forbidden Archaeology",             author:"Michael Cremo",      year:1996, topic:"Forbidden Science",           tags:["Archaeology","Suppression","Human Origins"],desc:"Presents evidence of human artifacts found in geological strata hundreds of millions of years old — and the institutional suppression of these findings.",                                              url:"https://www.youtube.com/watch?v=OzDAnFMBvLc",                                        rating:4.0},
  {id:"d14", type:"documentary", title:"Secrets of Forbidden Knowledge",    author:"History Channel",    year:2018, topic:"Secret Societies",            tags:["Freemasons","Illuminati","Secrets"],     desc:"Examines documented evidence for the influence of secret societies on Western history — including Freemasonry's role in founding the United States.",                                                         url:"https://www.imdb.com/title/tt8688830/",                                               rating:3.9},

  // ── FILMS ──────────────────────────────────────────────────────────────────
  {id:"f1", type:"film", title:"All the President's Men",  author:"Alan J. Pakula",  year:1976, topic:"Government & Intelligence",   tags:["Watergate","Nixon","Press"],            desc:"The definitive dramatization of the Washington Post investigation that brought down Nixon.",                                                                                                                  url:"https://www.imdb.com/title/tt0074119/", rating:4.7},
  {id:"f2", type:"film", title:"Snowden",                  author:"Oliver Stone",    year:2016, topic:"Surveillance",                tags:["Snowden","NSA","CIA"],                  desc:"Oliver Stone's dramatization of Snowden's journey from NSA contractor to the world's most wanted whistleblower.",                                                                                              url:"https://www.imdb.com/title/tt3774114/", rating:4.2},
  {id:"f3", type:"film", title:"The Big Short",            author:"Adam McKay",      year:2015, topic:"Finance & Power",            tags:["2008","Wall Street","Fraud"],            desc:"How a handful of investors discovered the entire U.S. housing market was fraudulent while banks sold toxic securities.",                                                                                        url:"https://www.imdb.com/title/tt1596363/", rating:4.5},
  {id:"f4", type:"film", title:"Dark Waters",              author:"Todd Haynes",     year:2019, topic:"Health & Science",           tags:["DuPont","Cover-up","PFAS"],             desc:"True story of attorney Rob Bilott exposing DuPont's concealment of PFAS forever-chemical contamination in American water supplies.",                                                                            url:"https://www.imdb.com/title/tt9071322/", rating:4.4},
  {id:"f5", type:"film", title:"Official Secrets",         author:"Gavin Hood",      year:2019, topic:"Government & Intelligence",  tags:["UK","Iraq","Whistleblower"],            desc:"True story of GCHQ analyst Katharine Gun who leaked a classified NSA memo revealing US spying on UN members over the Iraq War vote.",                                                                          url:"https://www.imdb.com/title/tt5431890/", rating:4.2},
  {id:"f6", type:"film", title:"Noah",                     author:"Darren Aronofsky",year:2014, topic:"Biblical & Religious Records",tags:["Noah","Giants","Watchers","Biblical"],  desc:"Aronofsky's controversial adaptation includes the Watchers — fallen angels who appear as rock giants — drawn directly from the Book of Enoch rather than Genesis alone.",                                       url:"https://www.imdb.com/title/tt1959563/", rating:3.9},
  {id:"f7", type:"film", title:"Contact",                  author:"Robert Zemeckis", year:1997, topic:"Forbidden Science",          tags:["SETI","Science","Contact"],             desc:"Based on Carl Sagan's novel — a scientist's battle against institutional and religious resistance to evidence of extraterrestrial contact. Mirrors real SETI funding battles.",                                url:"https://www.imdb.com/title/tt0118884/", rating:4.3},

  // ── PODCASTS ───────────────────────────────────────────────────────────────
  {id:"p1",  type:"podcast", title:"The Corbett Report Podcast",             author:"James Corbett",              year:2007, topic:"Government & Intelligence",   tags:["Deep State","History","CIA"],            desc:"One of the longest-running independent investigative podcasts. Deep dives on the Federal Reserve, 9/11, Operation Paperclip, and the deep state — every claim meticulously sourced.",                     url:"https://www.corbettreport.com/podcasts/",                                             rating:4.8},
  {id:"p2",  type:"podcast", title:"The Why Files",                          author:"AJ Gentile",                 year:2021, topic:"Unresolved Events",           tags:["Mystery","History","Paranormal"],        desc:"Deeply researched, well-sourced investigations into historical mysteries, unexplained events, and contested history. One of the fastest-growing independent research podcasts.",                              url:"https://www.youtube.com/@TheWhyFiles",                                                rating:4.7},
  {id:"p3",  type:"podcast", title:"Witness Testimony: Book of Enoch Series",author:"Tim Alberino",              year:2022, topic:"Biblical & Religious Records", tags:["Enoch","Nephilim","Watchers"],           desc:"Multi-part series examining the Book of Enoch in context — its history, its exclusion from the canon, and its implications for understanding Genesis 6 and the Nephilim accounts.",                         url:"https://www.gensix.com",                                                              rating:4.5},
  {id:"p4",  type:"podcast", title:"UnchartedX Podcast",                     author:"Ben van Kerkwyk",            year:2020, topic:"Ancient Civilizations",       tags:["Egypt","Megalithic","Lost Technology"],  desc:"Field researcher examining anomalous ancient construction worldwide — unexplained precision stonework at Puma Punku, the Osireion, and the Valley Temple.",                                                  url:"https://www.youtube.com/@UnchartedX1",                                                rating:4.7},
  {id:"p5",  type:"podcast", title:"Ground Zero with Clyde Lewis",           author:"Clyde Lewis",                year:1997, topic:"UAP & Anomalous",             tags:["UAP","Paranormal","Fringe"],             desc:"Long-running radio show examining UAP encounters, government programs, and anomalous events with a mix of research and listener reports.",                                                                    url:"https://groundzeromedia.org",                                                         rating:4.0},
  {id:"p6",  type:"podcast", title:"Stuff They Don't Want You to Know",      author:"iHeart Radio",               year:2009, topic:"Unresolved Events",           tags:["Conspiracy","Research","History"],       desc:"Well-produced podcast examining suppressed history, government secrets, and unresolved events with a balanced, research-first approach.",                                                                     url:"https://www.iheart.com/podcast/182-stuff-they-dont-want-you-17913675/",               rating:4.3},
  {id:"p7",  type:"podcast", title:"Into the Impossible",                    author:"Dr. Bernard Haisch",         year:2019, topic:"Forbidden Science",           tags:["Consciousness","Physics","UAP"],         desc:"Physicist interviews scientists on the fringes of mainstream physics — zero-point energy, consciousness research, and UAP phenomena from a credentialed scientific perspective.",                             url:"https://www.youtube.com/@IntotheImpossiblePodcast",                                   rating:4.4},
  {id:"p8",  type:"podcast", title:"Mysteries of the Bible",                 author:"Biblical Archaeology Society",year:2018,topic:"Biblical & Religious Records", tags:["Bible","Archaeology","History"],         desc:"Peer-reviewed examination of archaeological evidence related to Biblical narratives — from the Dead Sea Scrolls to the search for Sodom, Noah's Ark, and the Ark of the Covenant.",                       url:"https://www.biblicalarchaeology.org/podcasts/",                                       rating:4.3},
  {id:"p9",  type:"podcast", title:"The Scientist & the Whale",               author:"Dr. Lori Marino",            year:2021, topic:"Animal Intelligence",         tags:["Dolphins","Whales","Cognition"],         desc:"Neuroscientist and cetacean expert Dr. Lori Marino on dolphin consciousness, the ethics of captivity, and what decades of research reveals about whale and dolphin inner lives. Via the Kimmela Center.",     url:"https://www.kimmela.org",                                                             rating:4.5},
  {id:"p10", type:"podcast", title:"Waking Up with Sam Harris",              author:"Sam Harris",                 year:2013, topic:"Forbidden Science",           tags:["Consciousness","Science","Philosophy"],  desc:"Neuroscientist interviews leading scientists and philosophers on consciousness, free will, and topics at the boundaries of accepted science.",                                                               url:"https://www.samharris.org/podcasts",                                                  rating:4.5},
  {id:"p11", type:"podcast", title:"Conspirituality",                        author:"Julian Walker et al.",       year:2021, topic:"Media & Disclosure",          tags:["Wellness","Misinformation","Analysis"],  desc:"Critical examination of the overlap between conspiracy theories and wellness culture. Rigorous fact-checking and analysis of how misinformation spreads through spiritual communities.",                     url:"https://conspirituality.net",                                                         rating:4.4},
  {id:"p12", type:"podcast", title:"The Secret History of Hollywood",        author:"Joseph Atwill",              year:2018, topic:"Media & Disclosure",          tags:["Hollywood","CIA","Propaganda"],          desc:"Examines documented CIA and government relationships with Hollywood — from Operation Mockingbird to modern day and how entertainment shapes public perception.",                                              url:"https://www.caesarsghost.com",                                                        rating:4.1},

  // ── ARTICLES ───────────────────────────────────────────────────────────────
  {id:"a1",  type:"article", title:"The CIA and the Media",                    author:"Carl Bernstein",            year:1977, topic:"Media & Disclosure",          tags:["CIA","Mockingbird","Press"],             desc:"Bernstein's 25,000-word Rolling Stone investigation: 400 American journalists secretly worked for the CIA over 25 years.",                                                                                  url:"https://www.carlbernstein.com/the-cia-and-the-media-rolling-stone-10-20-1977",        rating:5.0},
  {id:"a2",  type:"article", title:"The Great American Bubble Machine",        author:"Matt Taibbi",               year:2009, topic:"Finance & Power",             tags:["Goldman Sachs","Wall Street"],           desc:"Taibbi's Rolling Stone exposé on Goldman Sachs. Remains the most widely read piece of financial investigative journalism.",                                                                                  url:"https://www.rollingstone.com/politics/politics-news/the-great-american-bubble-machine-195229/", rating:4.9},
  {id:"a3",  type:"article", title:"Pentagon's Mysterious UFO Program",        author:"NY Times",                  year:2017, topic:"UAP & Anomalous",             tags:["UAP","Pentagon","AATIP"],                desc:"The Times article that broke the existence of the Pentagon's secret Advanced Aerospace Threat Identification Program.",                                                                                    url:"https://www.nytimes.com/2017/12/16/us/politics/unidentified-aerial-phenomena.html",   rating:4.9},
  {id:"a4",  type:"article", title:"How Jeffrey Epstein Got Away With It",     author:"Julie K. Brown",            year:2018, topic:"Unresolved Events",           tags:["Epstein","Cover-up","Justice"],          desc:"The Miami Herald investigation that reopened the Epstein case and led to his 2019 arrest.",                                                                                                                url:"https://www.miamiherald.com/news/local/article220097825.html",                         rating:5.0},
  {id:"a5",  type:"article", title:"The Drone Papers",                         author:"The Intercept",             year:2015, topic:"Government & Intelligence",   tags:["Drones","CIA","Kill List"],              desc:"Leaked classified documents: 90% of drone strike victims were not the intended targets.",                                                                                                                  url:"https://theintercept.com/drone-papers/",                                              rating:5.0},
  {id:"a6",  type:"article", title:"The Book of Enoch and the Dead Sea Scrolls",author:"Biblical Archaeology Review",year:2002,topic:"Biblical & Religious Records",tags:["Enoch","Dead Sea Scrolls","Qumran"],   desc:"Peer-reviewed examination of Enoch fragments found at Qumran — confirming the text's antiquity and influence on Second Temple Judaism.",                                                                    url:"https://www.biblicalarchaeology.org",                                                 rating:4.7},
  {id:"a7",  type:"article", title:"Are Dolphins Persons?",                    author:"Thomas White",              year:2010, topic:"Animal Intelligence",         tags:["Dolphins","Personhood","Ethics"],        desc:"Philosophy professor Thomas White argues that scientific evidence of dolphin self-awareness and social intelligence qualifies them as 'non-human persons' deserving legal rights.",                          url:"https://www.huffpost.com/entry/are-dolphins-persons_b_459439",                        rating:4.3},
  {id:"a8",  type:"article", title:"Giants in the Earth: A Study of the Nephilim",author:"Chuck Missler",         year:2004, topic:"Giants & Nephilim",           tags:["Nephilim","Genesis","Giants"],           desc:"Scholarly examination of the Nephilim of Genesis 6 — their identity, their offspring, and their reappearance in Numbers 13 as the giants the Israelite spies reported.",                                   url:"https://www.khouse.org",                                                              rating:4.4},
  {id:"a9",  type:"article", title:"What Dolphins Tell Us About Mind",         author:"Sy Montgomery",             year:2015, topic:"Animal Intelligence",         tags:["Dolphins","Consciousness","Mind"],       desc:"Orion Magazine's landmark piece drawing on Dr. Denise Herzing's 28 years of field research with wild Atlantic spotted dolphins in the Bahamas.",                                                             url:"https://orionmagazine.org/article/deep-intellect/",                                   rating:4.8},
  {id:"a10", type:"article", title:"The Gospel of Thomas: A Hidden Gospel",    author:"Elaine Pagels",             year:2003, topic:"Biblical & Religious Records", tags:["Thomas","Gospel","Gnostic"],             desc:"Harvard theologian examines the Gospel of Thomas — discovered at Nag Hammadi in 1945 — and what its 114 sayings of Jesus reveal about early Christianity before institutional canonization.",               url:"https://www.pbs.org/wgbh/pages/frontline/shows/religion/maps/primary/thomas.html",   rating:4.7},
  {id:"a11", type:"article", title:"The Suppressed History of Giant Skeletons", author:"Richard Dewhurst",         year:2014, topic:"Giants & Nephilim",           tags:["Giants","Smithsonian","Archives"],       desc:"Investigation into hundreds of 19th century newspaper reports of giant human skeletal remains and their disappearance following Smithsonian collection.",                                                    url:"https://www.smithsonianmag.com",                                                      rating:4.2},
  {id:"a12", type:"article", title:"HAARP: Research Tool or Doomsday Device?", author:"Popular Science",           year:2008, topic:"Forbidden Science",           tags:["HAARP","Weather","Military"],            desc:"Investigation into the High-frequency Active Auroral Research Program in Alaska — a U.S. military facility studying the ionosphere, and disputed claims about its true capabilities.",                       url:"https://www.popsci.com",                                                              rating:4.1},
];

// ─── SOURCE DIRECTORY ─────────────────────────────────────────────────────────
export const SOURCES = [

  // RESEARCHERS & AUTHORS — OFFICIAL SITES
  {
    label:"Researchers & Authors — Official Sites",
    type:"research",
    items:[
      {n:"Billy Carson — 4biddenknowledge.com",                    u:"https://www.4biddenknowledge.com"},
      {n:"Billy Carson — 4biddenknowledge TV (streaming)",         u:"https://www.4biddenknowledgetv.com"},
      {n:"Dolores Cannon — Official Site & QHHT Research",        u:"https://dolorescannon.com"},
      {n:"Dolores Cannon — QHHT Official",                        u:"https://www.qhhtofficial.com"},
      {n:"David Icke — Official Site",                            u:"https://davidicke.com"},
      {n:"Ickonic — David Icke Video Platform",                   u:"https://www.ickonic.com"},
      {n:"Wes Penre Papers — All 5 Levels Free PDF",              u:"https://wespenre.com/category/level-1-5-in-pdf/"},
      {n:"Graham Hancock — Official Site",                        u:"https://grahamhancock.com"},
      {n:"Michael Tsarion — Official Site",                       u:"https://www.michaeltsarion.com"},
      {n:"Zecharia Sitchin — Official Archive",                   u:"https://sitchin.com"},
      {n:"Jordan Maxwell — Video Archive (d. 2022)",              u:"https://www.jordanmaxwellvideos.com"},
      {n:"Dr. Michael Heiser Foundation",                         u:"https://michaelsheiserfoundation.org"},
      {n:"Dr. Michael Heiser — Naked Bible Blog & Podcast",       u:"https://www.nakedbiblepodcast.com"},
      {n:"Dr. Michael Heiser — drmsh.com Archive",               u:"https://drmsh.com"},
      {n:"Bruce Lipton — Epigenetics & Biology of Belief",       u:"https://www.brucelipton.com"},
      {n:"Gregg Braden — Official Site",                         u:"https://www.greggbraden.com"},
      {n:"Brien Foerster — Elongated Skull Research",            u:"https://brienfoerster.com"},
      {n:"Robert Schoch — Sphinx & Geology Research",            u:"https://www.robertschoch.net"},
      {n:"Michael Cremo — Forbidden Archaeology",                u:"https://www.mcremo.com"},
      {n:"L.A. Marzulli — Nephilim & UAP Blog",                 u:"https://lamarzulli.net"},
      {n:"Linda Moulton Howe — Earthfiles",                      u:"https://www.earthfiles.com"},
      {n:"Richard Dolan — UAP Research",                         u:"https://richarddolanmembers.com"},
      {n:"Giorgio Tsoukalos — Ancient Aliens",                   u:"https://www.iamgiorgio.com"},
      {n:"Randall Carlson — Kosmographia",                       u:"https://randallcarlson.com"},
    ],
  },

  // WRITTEN BLOGS — CONSCIOUSNESS, DNA, FREQUENCY & THE MATRIX
  {
    label:"Written Blogs — Consciousness, DNA, Frequency & The Matrix",
    type:"blog",
    items:[
      {n:"Bruce Lipton Blog — Epigenetics articles",             u:"https://www.brucelipton.com/blog/"},
      {n:"Gregg Braden Blog — Frequency, DNA & Ancient Wisdom",  u:"https://www.greggbraden.com/blog/"},
      {n:"HeartMath Institute — Heart-brain coherence research", u:"https://www.heartmath.org/research/"},
      {n:"Institute of Noetic Sciences — Consciousness papers",  u:"https://noetic.org/research/"},
      {n:"Cymatics.org — Sound frequency & visible matter",      u:"https://www.cymatics.org"},
      {n:"Sacred Geometry International",                        u:"https://sacredgeometryinternational.com"},
      {n:"Drunvalo Melchizedek — Flower of Life & Merkaba",     u:"https://www.drunvalo.net"},
      {n:"Gaia — Consciousness, spirituality & UAP platform",   u:"https://www.gaia.com"},
      {n:"Simulation Argument — Nick Bostrom original paper",   u:"https://www.simulation-argument.com/simulation.pdf"},
      {n:"Rizwan Virk — Simulation Theory research",            u:"https://www.zenentrepreneur.com"},
      {n:"The Monroe Institute — Consciousness & OBE research",  u:"https://www.monroeinstitute.org"},
      {n:"Dean Radin — Consciousness & PSI research",           u:"https://www.deanradin.com"},
      {n:"Masaru Emoto — Water Memory official archive",        u:"https://www.masaru-emoto.net/en/"},
      {n:"Solfeggio Frequencies — Meditative Mind research",    u:"https://meditativemind.org"},
    ],
  },

  // WRITTEN BLOGS — EMERALD TABLETS, THOTH & HERMETICISM
  {
    label:"Written Blogs — Emerald Tablets, Thoth & Hermeticism",
    type:"blog",
    items:[
      {n:"4biddenknowledge — Billy Carson: Emerald Tablets articles", u:"https://www.4biddenknowledge.com/blog"},
      {n:"Emerald Tablets of Thoth — Full Text FREE",            u:"https://www.sacred-texts.com/egy/tet/index.htm"},
      {n:"The Kybalion — Hermetic Principles Full Text FREE",    u:"https://www.sacred-texts.com/eso/kyb/index.htm"},
      {n:"Hermetic Library — Crowley, Hermeticism, Alchemy",    u:"https://hermetic.com"},
      {n:"Sacred Texts — Ancient Egypt & Hermetica FREE",       u:"https://www.sacred-texts.com/egy/"},
      {n:"Thoth & Hermes Trismegistus — World History Encyclopedia", u:"https://www.worldhistory.org/thoth/"},
      {n:"Alchemy & Hermeticism Research — Levity.com",         u:"https://www.levity.com/alchemy/"},
      {n:"Gnosis Archive — Gnostic, Hermetic & esoteric texts", u:"https://gnosis.org"},
    ],
  },

  // WRITTEN BLOGS — ANCIENT ALIENS, ANUNNAKI & SUMERIAN TABLETS
  {
    label:"Written Blogs — Ancient Aliens, Anunnaki & Sumerian Tablets",
    type:"blog",
    items:[
      {n:"Ancient Astronaut Archive — written research",         u:"https://www.ancientastronautarchive.com"},
      {n:"Ancient Origins — daily ancient history articles",     u:"https://www.ancient-origins.net"},
      {n:"ETCSL Oxford — Complete Sumerian Literature FREE",     u:"https://etcsl.orinst.ox.ac.uk"},
      {n:"XaviantVision.com — Free metaphysical & alt-history",  u:"https://xaviantvision.com"},
      {n:"World History Encyclopedia — Ancient Sumer FREE",     u:"https://www.worldhistory.org/sumer/"},
      {n:"Humans Are Free — Ancient civilizations research",    u:"https://humansarefree.com"},
    ],
  },

  // WRITTEN BLOGS — GOVERNMENT, DEEP STATE & INTELLIGENCE
  {
    label:"Written Blogs — Government, Deep State & Intelligence",
    type:"blog",
    items:[
      {n:"Corbett Report — James Corbett investigative research", u:"https://www.corbettreport.com"},
      {n:"Unlimited Hangout — Whitney Webb investigations",       u:"https://unlimitedhangout.com"},
      {n:"OffGuardian — media criticism & declassified research", u:"https://off-guardian.org"},
      {n:"The Intercept — investigative articles & leaks",       u:"https://theintercept.com"},
      {n:"The Grayzone — investigative journalism",              u:"https://thegrayzone.com"},
      {n:"WantToKnow.info — 13,000+ archived news summaries",   u:"https://www.wanttoknow.info"},
      {n:"Matt Taibbi Substack — investigative articles",        u:"https://taibbi.substack.com"},
      {n:"Last American Vagabond — deep state coverage",         u:"https://www.thelastamericanvagabond.com"},
      {n:"Covert Action Magazine — intelligence history",        u:"https://covertactionmagazine.com"},
      {n:"Government Secrets Substack — William Arkin",         u:"https://governmentsecrets.substack.com"},
      {n:"Zero Hedge — geopolitical analysis",                   u:"https://www.zerohedge.com"},
    ],
  },

  // WRITTEN BLOGS — UAP, UFO & DISCLOSURE
  {
    label:"Written Blogs — UAP, UFO & Disclosure",
    type:"blog",
    items:[
      {n:"The Black Vault — 2M+ declassified pages",            u:"https://www.theblackvault.com"},
      {n:"UFO Digest — articles, photos & expert analysis",     u:"https://www.ufodigest.com"},
      {n:"UFO Chronicles — news, articles & historic cases",    u:"https://www.theufochronicles.com"},
      {n:"Open Minds UFO — news & investigative reports",       u:"https://www.openminds.tv"},
      {n:"Singular Fortean Society — paranormal journalism",    u:"https://www.singularfortean.com"},
      {n:"The Anomalist — daily review of unexplained phenomena",u:"https://www.anomalist.com"},
      {n:"Skinwalker Ranch — official research & experiment log",u:"https://skinwalker-ranch.com"},
      {n:"MUFON — sighting reports & case summaries",           u:"https://www.mufon.com"},
    ],
  },

  // WRITTEN BLOGS — BIBLICAL, NEPHILIM & GIANTS
  {
    label:"Written Blogs — Biblical, Nephilim & Giants",
    type:"blog",
    items:[
      {n:"Dr. Michael Heiser — PaleoBabble blog",               u:"https://paleobabble.com"},
      {n:"Steve Quayle — giants & ancient history articles",    u:"https://www.stevequayle.com"},
      {n:"Gen6 Giants — Stephen Quayle Nephilim research",     u:"https://www.gen6giants.com"},
      {n:"SkyWatch TV — Tom Horn biblical research",           u:"https://skywatchtv.com"},
      {n:"Koinonia House — Chuck Missler biblical studies",    u:"https://www.khouse.org"},
      {n:"Biblical Archaeology Society — peer-reviewed articles",u:"https://www.biblicalarchaeology.org"},
    ],
  },

  // WRITTEN BLOGS — PARANORMAL & SUPERNATURAL
  {
    label:"Written Blogs — Paranormal & Supernatural",
    type:"blog",
    items:[
      {n:"Phantoms & Monsters — Lon Strickler encounter reports",u:"https://www.phantomsandmonsters.com"},
      {n:"Mysterious Universe — paranormal & strange world",    u:"https://mysteriousuniverse.org"},
      {n:"Fortean Times — journal of strange phenomena",        u:"https://www.forteantimes.com"},
      {n:"Higgypop — paranormal news & occult articles",        u:"https://www.higgypop.com"},
      {n:"Curious Archive — deep dives into paranormal history",u:"https://www.curiousarchive.com"},
      {n:"Ghost Research Society",                              u:"https://www.ghostresearch.org"},
      {n:"Society for Psychical Research — research papers UK", u:"https://www.spr.ac.uk"},
      {n:"Rhine Research Center — parapsychology studies",     u:"https://www.rhine.org"},
      {n:"IANDS — near-death experience research",             u:"https://iands.org"},
    ],
  },

  // VIDEO CHANNELS — CONSCIOUSNESS, DNA, FREQUENCY & MATRIX
  {
    label:"Video Channels — Consciousness, DNA, Frequency & The Matrix",
    type:"podcast",
    items:[
      {n:"Bruce Lipton — YouTube (epigenetics)",                u:"https://www.youtube.com/@BruceLipton"},
      {n:"Gregg Braden — YouTube",                              u:"https://www.youtube.com/@GreggBradenOfficial"},
      {n:"Dolores Cannon — YouTube archive",                    u:"https://www.youtube.com/results?search_query=Dolores+Cannon+QHHT"},
      {n:"HeartMath Institute — YouTube",                       u:"https://www.youtube.com/@HeartMathInstitute"},
      {n:"Drunvalo Melchizedek — Flower of Life",               u:"https://www.youtube.com/results?search_query=Drunvalo+Melchizedek"},
      {n:"Dean Radin — Consciousness & PSI science",            u:"https://www.youtube.com/results?search_query=Dean+Radin+consciousness"},
      {n:"Cymatics — Sound & Frequency Visualized",             u:"https://www.youtube.com/results?search_query=cymatics+frequency"},
      {n:"Into the Impossible — Dr. Haisch frontier science",   u:"https://www.youtube.com/@IntotheImpossiblePodcast"},
      {n:"After Skool — consciousness & hidden knowledge",      u:"https://www.youtube.com/@AfterSkool"},
    ],
  },

  // VIDEO CHANNELS — ANCIENT HISTORY, TABLETS & FORBIDDEN SCIENCE
  {
    label:"Video Channels — Ancient History, Tablets & Forbidden Science",
    type:"podcast",
    items:[
      {n:"Billy Carson — 4biddenknowledge YouTube",             u:"https://www.youtube.com/@4biddenknowledge"},
      {n:"The Why Files — video deep dives",                    u:"https://www.youtube.com/@TheWhyFiles"},
      {n:"UnchartedX — ancient stonework field research",       u:"https://www.youtube.com/@UnchartedX1"},
      {n:"Randall Carlson — Kosmographia & catastrophism",      u:"https://www.youtube.com/@RandallCarlson"},
      {n:"Robert Sepehr — anthropology & hidden history",       u:"https://www.youtube.com/@RobertSepehr"},
      {n:"Truthstream Media — deep research essays",            u:"https://www.youtube.com/@TruthstreamMedia"},
      {n:"Dr. Michael Heiser — biblical & Nephilim lectures",  u:"https://www.youtube.com/@DrMichaelSHeiser"},
      {n:"Book of Enoch Documentary (Stephen Quayle)",         u:"https://www.youtube.com/watch?v=q_CjAUoiVBk"},
      {n:"Forbidden Archaeology — Michael Cremo documentary",  u:"https://www.youtube.com/watch?v=OzDAnFMBvLc"},
      {n:"Jason Martell — Ancient technology & Anunnaki",       u:"https://www.youtube.com/@jasonmartell4"},
      {n:"Paul Wallis — Eden Series (5th Kind)",                u:"https://www.youtube.com/@PaulWallis5thKind"},
      {n:"The 5th Kind TV — Ancient gods & intervention",       u:"https://www.youtube.com/@The5thKind"},
    ],
  },

  // VIDEO CHANNELS — UAP, UFO & DISCLOSURE
  {
    label:"Video Channels — UAP, UFO & Disclosure",
    type:"podcast",
    items:[
      {n:"Jeremy Corbell — UAP documentary filmmaker",          u:"https://www.youtube.com/@JeremyCorbell"},
      {n:"James Fox — The Phenomenon documentary",              u:"https://www.youtube.com/@jamesfoxfilms"},
      {n:"Dr. Steven Greer — Disclosure Project",               u:"https://www.youtube.com/@StevenGreer"},
      {n:"Dr. Michael Salla — Exopolitics",                     u:"https://www.youtube.com/@ExopoliticsTV"},
      {n:"Richard Dolan — UAP history & analysis",              u:"https://www.youtube.com/@RichardDolanTV"},
      {n:"Leak Project — UAP & hidden knowledge",               u:"https://www.youtube.com/@LeakProject"},
      {n:"Edge of Wonder — UAP & paranormal",                   u:"https://www.youtube.com/@EdgeofWonder"},
      {n:"Suspicious Observers — Earth & space anomalies",      u:"https://www.youtube.com/@SuspiciousObservers"},
    ],
  },

  // VIDEO CHANNELS — PARANORMAL, MEDIUMS & SUPERNATURAL
  {
    label:"Video Channels — Paranormal, Mediums & Supernatural",
    type:"podcast",
    items:[
      {n:"James Van Praagh — medium & consciousness",           u:"https://www.youtube.com/@vanpraaghdotcom"},
      {n:"John Edward — psychic medium",                        u:"https://www.youtube.com/@JohnEdwardPsychicMedium"},
      {n:"Tyler Henry — Hollywood Medium",                      u:"https://www.youtube.com/@TylerHenry"},
      {n:"The Monroe Institute — consciousness & OBE",          u:"https://www.youtube.com/@TheMonroeInstitute"},
      {n:"Institute of Noetic Sciences — video lectures",       u:"https://www.youtube.com/@instituteofnoeticsciences"},
      {n:"The Century of the Self — Adam Curtis FREE",          u:"https://www.youtube.com/watch?v=eJ3RzGoQC4s"},
      {n:"HyperNormalisation — Adam Curtis FREE",               u:"https://www.youtube.com/watch?v=oJLqyuxm96k"},
      {n:"Universe Inside You — ancient knowledge",             u:"https://www.youtube.com/@UniverseInsideYou"},
      {n:"Zohar StarGate Ancient Discoveries — YouTube",        u:"https://www.youtube.com/@ZoharStarGateAncientDiscoveries"},
    ],
  },

  // FREE PDFS, PAPERS & ONLINE TEXTS
  {
    label:"Free PDFs, Papers & Online Texts",
    type:"archive",
    items:[
      {n:"Book of Enoch — Full Text FREE",                      u:"https://www.sacred-texts.com/bib/boe/"},
      {n:"Gospel of Mary Magdalene — Full Text FREE",           u:"https://gnosis.org/library/marygosp.htm"},
      {n:"Nag Hammadi Library — All texts FREE",                u:"https://gnosis.org/naghamm/nhl.html"},
      {n:"Gospel of Thomas — Full Text FREE",                   u:"https://www.sacred-texts.com/chr/thomas.htm"},
      {n:"Dead Sea Scrolls — Digital Library FREE",             u:"https://www.deadseascrolls.org.il"},
      {n:"CIA Gateway Process — Declassified PDF FREE",         u:"https://www.cia.gov/readingroom/docs/CIA-RDP96-00788R001700210016-3.pdf"},
      {n:"CIA Stargate Files — Remote Viewing declassified",    u:"https://www.cia.gov/readingroom/collection/stargate"},
      {n:"Project Blue Book — Declassified UFO files",          u:"https://www.fold3.com/title/44/project-blue-book"},
      {n:"Sacred Texts Archive — all ancient texts FREE",       u:"https://www.sacred-texts.com"},
      {n:"Internet Archive — millions of free books & docs",    u:"https://archive.org"},
      {n:"Project Gutenberg — 70,000 free ebooks",             u:"https://www.gutenberg.org"},
      {n:"Plato's Timaeus — Original Atlantis account FREE",    u:"https://classics.mit.edu/Plato/timaeus.html"},
      {n:"Plato's Critias — Second Atlantis account FREE",      u:"https://classics.mit.edu/Plato/critias.html"},
    ],
  },

  // ARCHIVES & PRIMARY DOCUMENTS
  {
    label:"Archives & Primary Documents",
    type:"archive",
    items:[
      {n:"National Security Archive — declassified documents",  u:"https://nsarchive.gwu.edu"},
      {n:"CIA Reading Room — official declassified files",      u:"https://www.cia.gov/readingroom"},
      {n:"FBI Vault — declassified FBI files",                  u:"https://vault.fbi.gov"},
      {n:"FOIA.gov — US government FOIA portal",               u:"https://www.foia.gov"},
      {n:"WikiLeaks — leaked government documents",             u:"https://wikileaks.org"},
      {n:"MuckRock — FOIA request platform & results",          u:"https://www.muckrock.com"},
      {n:"DocumentCloud — primary document repository",         u:"https://www.documentcloud.org"},
      {n:"Vatican Apostolic Archive — Official",                u:"https://www.archivioapostolicovaticano.va"},
      {n:"Newspaper Archive — 19th century historical papers",  u:"https://newspaperarchive.com"},
      {n:"AARO — Pentagon UAP reporting portal",                u:"https://www.aaro.mil"},
    ],
  },

  // UAP / UFO RESEARCHERS & INVESTIGATORS
  {
    label:"UAP / UFO Researchers & Investigators",
    type:"research",
    items:[
      {n:"Dr. Steven Greer — The Disclosure Project",           u:"https://siriusdisclosure.com"},
      {n:"Christopher Mellon — Dep. Asst. Sec. of Defense",    u:"https://www.christophermellon.net"},
      {n:"George Knapp — Investigative Journalist",             u:"https://www.georgeknapp.com"},
      {n:"To The Stars Academy",                                u:"https://www.tothestarsacademy.com"},
      {n:"Dr. Avi Loeb — Harvard Galileo Project",              u:"https://projects.iq.harvard.edu/galileo"},
      {n:"Dr. Garry Nolan — Stanford UAP Research",            u:"https://nolan-lab.stanford.edu"},
      {n:"NUFORC — National UFO Reporting Center",             u:"https://nuforc.org"},
    ],
  },

  // BIBLICAL SCHOLARS & NEPHILIM RESEARCHERS
  {
    label:"Biblical Scholars & Nephilim Researchers",
    type:"research",
    items:[
      {n:"GenSix — Tim Alberino (Enoch & Giants)",             u:"https://www.gensix.com"},
      {n:"Blue Letter Bible — Greek & Hebrew tools",            u:"https://www.blueletterbible.org"},
      {n:"Bible Gateway — All Translations",                    u:"https://www.biblegateway.com"},
      {n:"Prophecy News Watch",                                 u:"https://www.prophecynewswatch.com"},
      {n:"Early Church Fathers Online (CCEL)",                  u:"https://www.ccel.org"},
      {n:"Mauro Biglino — Biblical scholar, literal Elohim",   u:"https://maurobiglino.com"},
    ],
  },

  // PARANORMAL, SUPERNATURAL & MEDIUMS
  {
    label:"Paranormal, Supernatural & Mediums",
    type:"research",
    items:[
      {n:"James Van Praagh — Official Site",                    u:"https://vanpraagh.com"},
      {n:"John Edward — Psychic Medium",                        u:"https://www.johnedward.net"},
      {n:"Tyler Henry — Hollywood Medium",                      u:"https://www.tylerhenry.com"},
      {n:"Theresa Caputo — Long Island Medium",                 u:"https://theresacaputo.com"},
      {n:"The Warren Legacy — Ed & Lorraine Warren",            u:"https://www.warrens.net"},
    ],
  },

  // NEWS & INVESTIGATIVE JOURNALISM
  {
    label:"News & Investigative Journalism",
    type:"news",
    items:[
      {n:"Consortium News",                                     u:"https://consortiumnews.com"},
      {n:"MintPress News",                                      u:"https://www.mintpressnews.com"},
      {n:"WhoWhatWhy",                                          u:"https://whowhatwhy.org"},
      {n:"ProPublica",                                          u:"https://www.propublica.org"},
      {n:"Bellingcat",                                          u:"https://www.bellingcat.com"},
      {n:"The Unz Review",                                      u:"https://www.unz.com"},
      {n:"Drop Site News — Jeremy Scahill & Ryan Grim",        u:"https://www.dropsitenews.com"},
      {n:"Before It's News",                                    u:"https://beforeitsnews.com"},
      {n:"Epoch Times",                                         u:"https://www.theepochtimes.com"},
    ],
  },

  // SCIENCE & FORBIDDEN RESEARCH
  {
    label:"Science & Forbidden Research",
    type:"research",
    items:[
      {n:"AE911Truth — WTC Engineering Study",                  u:"https://www.ae911truth.org"},
      {n:"Whale & Dolphin Conservation",                        u:"https://us.whales.org"},
      {n:"Kimmela Center — Dr. Lori Marino dolphin science",   u:"https://www.kimmela.org"},
      {n:"Electric Universe / Thunderbolts",                    u:"https://www.thunderbolts.info"},
      {n:"NOAA Ocean Explorer",                                 u:"https://oceanexplorer.noaa.gov"},
      {n:"Institute of Noetic Sciences (IONS)",                 u:"https://noetic.org"},
      {n:"Global Research — Michel Chossudovsky",              u:"https://www.globalresearch.ca"},
    ],
  },

  // DOLPHINS — MILITARY PROGRAMS, GOVERNMENT FILES & INTELLIGENCE
  {
    label:"Dolphins — Military Programs, Government Files & Intelligence",
    type:"research",
    items:[
      {n:"US Navy NMMP — Official Marine Mammal Program",       u:"https://www.niwcpacific.navy.mil/marine-mammal/"},
      {n:"NMMP Wikipedia — Full documented history",            u:"https://en.wikipedia.org/wiki/United_States_Navy_Marine_Mammal_Program"},
      {n:"History.com — How Dolphins Became Cold War Weapons",  u:"https://www.history.com/articles/navy-marine-mammal-program-history-dolphins-sea-lions"},
      {n:"NOAA Fisheries — Official MMPA dolphin FAQ",          u:"https://www.fisheries.noaa.gov/marine-life-distress/frequent-questions-feeding-or-harassing-marine-mammals-wild"},
      {n:"LegalClarity — MMPA full law breakdown",             u:"https://legalclarity.org/why-is-it-illegal-to-communicate-with-dolphins/"},
      {n:"Wild Dolphin Project — Dr. Herzing peer-reviewed",   u:"https://www.wilddolphinproject.org/media/scientific-publications/"},
      {n:"Cambridge Declaration on Consciousness 2012 PDF",    u:"https://fcmconference.org/img/CambridgeDeclarationOnConsciousness.pdf"},
      {n:"Sonar — Dolphin & Whale Personhood global movement", u:"https://wearesonar.org"},
      {n:"Vice — What We've Learned From Giving Dolphins LSD", u:"https://www.vice.com/en/article/what-weve-learned-from-giving-dolphins-lsd/"},
      {n:"Orion Magazine — Deep Intellect (Sy Montgomery)",    u:"https://orionmagazine.org/article/deep-intellect/"},
    ],
  },

  // VACCINES, BIG PHARMA & HEALTH FREEDOM
  {
    label:"Vaccines, Big Pharma & Health Freedom",
    type:"research",
    items:[
      {n:"VAERS — Vaccine Adverse Event Reporting System",      u:"https://vaers.hhs.gov"},
      {n:"OpenVAERS — Searchable VAERS visualization",         u:"https://openvaers.com"},
      {n:"Children's Health Defense — Robert F. Kennedy Jr.",  u:"https://childrenshealthdefense.org"},
      {n:"Dr. Peter McCullough — Substack",                    u:"https://petermcculloughmd.substack.com"},
      {n:"Dr. Robert Malone — Substack (mRNA inventor)",       u:"https://www.malone.news"},
      {n:"The Highwire — Del Bigtree health reporting",        u:"https://thehighwire.com"},
      {n:"FLCCC Alliance — Front Line COVID-19 Critical Care", u:"https://covid19criticalcare.com"},
      {n:"Informed Consent Action Network (ICAN)",             u:"https://www.icandecide.org"},
      {n:"National Vaccine Injury Compensation Program",       u:"https://www.hrsa.gov/vaccine-compensation"},
    ],
  },

  // TICKS, BIOWEAPONS & PLUM ISLAND
  {
    label:"Ticks, Bioweapons, Lyme Disease & Plum Island",
    type:"research",
    items:[
      {n:"BITTEN — Kris Newby Substack",                       u:"https://krisnewby.substack.com"},
      {n:"Bitten Book — HarperCollins (official)",             u:"https://www.harpercollins.com/products/bitten-kris-newby"},
      {n:"Lab 257 — Michael Carroll (Plum Island research)",   u:"https://www.amazon.com/s?k=Lab+257+Michael+Carroll"},
      {n:"Congress Amendment — DoD Tick Bioweapons Investigation PDF", u:"https://chrissmith.house.gov/uploadedfiles/2021-09-22_americans_deserve_the_truth__did_dod_weaponize_ticks_with_lyme_disease.pdf"},
      {n:"LymeDisease.org — Patient advocacy & research",     u:"https://www.lymedisease.org"},
    ],
  },

  // FOOD SAFETY, FAKE MEAT & BIOTECH
  {
    label:"Food Safety, Fake Meat & Biotech Agenda",
    type:"research",
    items:[
      {n:"Food & Environment Reporting Network — Lab Meat",    u:"https://thefern.org"},
      {n:"FAO/WHO — 53 Hazards in Cultured Meat report",      u:"https://www.fao.org/food-safety/scientific-advice/culturing-meat/en/"},
      {n:"Weston A. Price Foundation — Real food research",   u:"https://www.westonaprice.org"},
      {n:"Dr. Zach Bush — gut health, soil & food systems",   u:"https://zachbushmd.com"},
      {n:"Food Babe — Vani Hari food additive research",      u:"https://foodbabe.com"},
      {n:"Navdanya — Vandana Shiva GMO & seed research",      u:"https://www.navdanya.org"},
      {n:"Environmental Working Group — food & chemical safety",u:"https://www.ewg.org"},
    ],
  },

  // ANCIENT ADVANCED TECHNOLOGY & LOST CIVILIZATIONS
  {
    label:"Ancient Advanced Technology & Lost Civilizations",
    type:"research",
    items:[
      {n:"Ancient Code — Baalbek megalithic research",         u:"https://www.ancient-code.com"},
      {n:"Younger Dryas Impact — peer-reviewed papers",        u:"https://pubmed.ncbi.nlm.nih.gov/?term=younger+dryas+impact"},
      {n:"Atlantipedia — Comprehensive Atlantis research",     u:"https://atlantipedia.ie"},
      {n:"Edgar Cayce / ARE Institute — Atlantis readings",    u:"https://www.edgarcayce.org"},
    ],
  },

  // THE GODS, ANCIENT BEINGS & DIVINE COUNCIL
  {
    label:"The Gods, Ancient Beings & the Divine Council",
    type:"research",
    items:[
      {n:"World History Encyclopedia — Anunnaki & Sumerian gods",u:"https://www.worldhistory.org/Anunnaki/"},
      {n:"Myth of Adapa — World History Encyclopedia FREE",    u:"https://www.worldhistory.org/article/216/the-myth-of-adapa/"},
      {n:"Mystery Babylon — Bill Cooper archive",              u:"https://www.hourofthetime.com"},
      {n:"Theosophy — Blavatsky Secret Doctrine FREE text",    u:"https://www.sacred-texts.com/the/sd/index.htm"},
    ],
  },

  // SACRED GEOMETRY, FIBONACCI & ARCHITECTURE OF CREATION
  {
    label:"Sacred Geometry, Fibonacci & Architecture of Creation",
    type:"research",
    items:[
      {n:"Fibonacci in Nature — Wolfram MathWorld",            u:"https://mathworld.wolfram.com/GoldenRatio.html"},
      {n:"Jonathan Quintin — Sacred geometry art & research",  u:"https://www.jonathanquintin.com"},
    ],
  },

  // ATLANTIS, LEMURIA & PRE-FLOOD CIVILIZATIONS
  {
    label:"Atlantis, Lemuria & Pre-Flood Civilizations",
    type:"research",
    items:[
    ],
  },

  // FREQUENCY, ENERGY MEDICINE & VIBRATIONAL HEALING
  {
    label:"Frequency, Energy Medicine & Vibrational Healing",
    type:"research",
    items:[
      {n:"Royal Rife Research — frequency healing",            u:"https://www.rife.org"},
      {n:"Schumann Resonance — Earth's base frequency",        u:"https://www.spaceweatherlive.com/en/solar-activity/schumann-resonance.html"},
      {n:"Dr. Joe Dispenza — Meditation & brain frequency",    u:"https://drjoedispenza.com"},
      {n:"Global Consciousness Project — Princeton",           u:"https://noosphere.princeton.edu"},
      {n:"GreenMedInfo — Natural medicine research",           u:"https://greenmedinfo.com"},
      {n:"NOAA Geomagnetic Research — Earth field data",      u:"https://www.ngdc.noaa.gov/geomag/"},
    ],
  },

  // REMOTE VIEWING, PSI & GOVERNMENT PSYCHIC PROGRAMS
  {
    label:"Remote Viewing, PSI & Government Psychic Programs",
    type:"archive",
    items:[
      {n:"IRP.fas.org — STAR GATE full program history",       u:"https://irp.fas.org/program/collect/stargate.htm"},
      {n:"Black Vault — Stargate declassified archive",        u:"https://www.theblackvault.com/documentarchive/project-star-gate/"},
      {n:"Hal Puthoff — physicist & Stargate lead scientist",  u:"https://www.esi-ea.org"},
      {n:"Russell Targ — laser physicist & remote viewing",    u:"https://www.espresearch.com"},
      {n:"Ingo Swann — remote viewing co-creator archive",     u:"https://www.biomindsuperpowers.com"},
      {n:"Joe McMoneagle — Army Stargate viewer",              u:"https://www.mceagle.com"},
      {n:"Courtney Brown — Farsight Institute",                u:"https://farsight.org"},
      {n:"Journal of Scientific Exploration — PSI research",  u:"https://journalofscientificexploration.org"},
    ],
  },

  // PORTALS, STARGATES & INTERDIMENSIONAL RESEARCH
  {
    label:"Portals, Stargates & Interdimensional Research",
    type:"research",
    items:[
      {n:"Academic Block — Stargates & Portals research",      u:"https://www.academicblock.com/science/fringe-science/stargates-and-portals"},
      {n:"Sacred Illusion — Stargates & Doors to Nowhere",     u:"https://www.sacredillusion.com/stargates-and-doors-to-nowhere-portals-illusions-or-entrances-to-elsewhere/"},
      {n:"CERN — Official LHC extra dimensions research",      u:"https://home.cern/science/experiments/lhc"},
      {n:"Sedona Anomalies — Portal & vortex research",        u:"https://sedonanomalies.com"},
    ],
  },

  // SUMERIAN TEXTS — ADAPA, ANKI, ENLIL & ANUNNAKI
  {
    label:"Sumerian Texts — Adapa, Anki, Enlil & Anunnaki",
    type:"archive",
    items:[
      {n:"Myth of Adapa — Full Text FREE (Sacred Texts)",      u:"https://sacred-texts.com/ane/adapa.htm"},
      {n:"Sumer Fandom — Adapa, Enlil, An mythology database", u:"https://sumer.fandom.com"},
      {n:"Founder Hypothesis — Sumerian myth translations",    u:"https://founder-hypothesis.com/en/sumerian-mythology/"},
    ],
  },

  // CHRONOVISOR, TIME TRAVEL & VATICAN SECRETS
  {
    label:"Chronovisor, Time Travel & Vatican Secrets",
    type:"research",
    items:[
      {n:"Project Unredacted — Chronovisor: Vatican Time Machine", u:"https://www.projectunredacted.com/cases/chronovisor-vatican-time-machine"},
      {n:"Ancient Origins — Chronovisor Vatican Time Device",  u:"https://www.ancient-origins.net/news-science-space/chronovisor-vatican-time-machine-00102422"},
      {n:"All That's Interesting — Legend of the Chronovisor", u:"https://allthatsinteresting.com/chronovisor"},
      {n:"Gaia — Vatican Chronovisor Time Travel Device",      u:"https://www.gaia.com/article/the-chronovisor-the-vaticans-mysterious-time-travel-device"},
    ],
  },

  // SEDONA VORTEX, ELECTROMAGNETIC & EARTH ENERGY
  {
    label:"Sedona Vortex, Electromagnetic & Earth Energy",
    type:"research",
    items:[
      {n:"Visit Sedona — Official Vortex Guide",               u:"https://visitsedona.com/spiritual-wellness/what-is-a-vortex/"},
      {n:"Sedona Vortex Adventures — Seven Vortex Sites",      u:"https://sedonavortexsites.com"},
      {n:"Free Soul Foundation — Pete Sanders MIT vortex",     u:"https://freesoul.net"},
    ],
  },

  // DNA, FREQUENCY, EPIGENETICS & CONSCIOUSNESS
  {
    label:"DNA, Frequency, Epigenetics & Consciousness",
    type:"research",
    items:[
      {n:"George Church Lab Harvard — DNA, CRISPR, synthetic biology", u:"https://arep.med.harvard.edu"},
      {n:"Personal Genome Project — George Church",            u:"https://www.personalgenomes.org"},
      {n:"Regenesis — George Church book (Hachette)",          u:"https://www.hachettebookgroup.com/titles/george-m-church/regenesis/9780465038657/"},
      {n:"NIH PubMed — Epigenetics peer-reviewed papers",      u:"https://pubmed.ncbi.nlm.nih.gov/?term=epigenetics"},
    ],
  },

  // MARY MAGDALENE, EMERALD TABLETS & HIDDEN GNOSTIC TEXTS
  {
    label:"Mary Magdalene, Emerald Tablets & Hidden Gnostic Texts",
    type:"archive",
    items:[
      {n:"Elaine Pagels — Gospel of Thomas (PBS Frontline)",   u:"https://www.pbs.org/wgbh/pages/frontline/shows/religion/maps/primary/thomas.html"},
      {n:"Meggan Watterson — Mary Magdalene research",         u:"https://www.megganwatterson.com"},
    ],
  },

  // GOLDILOCKS ZONE, SIMULATION THEORY & REALITY
  {
    label:"Goldilocks Zone, Simulation Theory & The Nature of Reality",
    type:"research",
    items:[
      {n:"NASA — Goldilocks Zone habitable exoplanet research", u:"https://exoplanets.nasa.gov/search-for-life/goldilocks/"},
      {n:"SETI Institute — Search for extraterrestrial intelligence", u:"https://www.seti.org"},
      {n:"Tom Campbell — My Big TOE (Theory of Everything)",   u:"https://www.my-big-toe.com"},
    ],
  },

  // FORBIDDEN KNOWLEDGE — VIDEO PLATFORMS & SUPPRESSED SITES
  {
    label:"Forbidden Knowledge — Video Platforms & Suppressed Sites",
    type:"blog",
    items:[
      {n:"Forbidden Knowledge TV — Alexandra Bruce",           u:"https://forbiddenknowledgetv.net/home"},
      {n:"Forbidden Knowledge News — daily paranormal research",u:"https://forbiddenknowledge.news"},
      {n:"Dark Journalist — X-Series UAP & deep state",        u:"https://www.darkjournalist.com"},
      {n:"The Solari Report — Catherine Austin Fitts",         u:"https://home.solari.com"},
      {n:"Redacted with Clayton Morris — daily suppressed news",u:"https://www.redacted.inc"},
      {n:"SGT Report — deep state & financial research",       u:"https://www.sgtreport.com"},
      {n:"The Vigilant Citizen — occult symbolism & decoding", u:"https://vigilantcitizen.com"},
      {n:"Need To Know News — dark journalism aggregator",     u:"https://needtoknow.news"},
      {n:"Collective Evolution — consciousness & science",     u:"https://www.ce1.com"},
      {n:"The Freedom Articles — Makia Freeman",               u:"https://thefreedomarticles.com"},
    ],
  },

  // DAVID PAULIDES — MISSING 411 & CANAM MISSING
  {
    label:"David Paulides — Missing 411 & CanAm Missing Research",
    type:"research",
    items:[
      {n:"Missing411.com — Official Paulides site",            u:"https://missing411.com"},
      {n:"CanAm Missing Project — active case files",          u:"https://www.canammissing.com"},
      {n:"David Paulides YouTube",                             u:"https://www.youtube.com/@DavidPaulides"},
      {n:"Missing 411 Western US — first book (Amazon)",       u:"https://www.amazon.com/s?k=Missing+411+Western+United+States+Paulides"},
      {n:"Missing 411 Eastern US (Amazon)",                    u:"https://www.amazon.com/s?k=Missing+411+Eastern+United+States+Paulides"},
      {n:"Missing 411 The Hunted — documentary (Amazon)",      u:"https://www.amazon.com/s?k=Missing+411+Hunted+documentary"},
      {n:"r/Missing411 — Reddit community",                    u:"https://www.reddit.com/r/Missing411"},
    ],
  },

  // PODCASTS — CONSPIRACY, ANOMALOUS & HIDDEN KNOWLEDGE
  {
    label:"Podcasts — Conspiracy, Anomalous & Hidden Knowledge",
    type:"podcast",
    items:[
      {n:"Stuff They Don't Want You to Know (iHeart)",         u:"https://www.iheart.com/podcast/182-stuff-they-dont-want-you-17913675/"},
      {n:"Conspiracy Theories (Spotify Parcast)",              u:"https://open.spotify.com/show/5RdShpOtxKO3ZWohR2M6Sv"},
      {n:"Tin Foil Hat with Sam Tripoli",                      u:"https://www.samtripoli.com"},
      {n:"Those Conspiracy Guys",                              u:"https://www.thoseconspiracyguys.com"},
      {n:"Corbett Report Podcast — full transcripts",          u:"https://www.corbettreport.com/podcasts/"},
      {n:"The Higherside Chats — Greg Carlwood",               u:"https://www.thehighersidechats.com"},
      {n:"Fade to Black — Jimmy Church Radio",                 u:"https://jimmychurchradio.com"},
      {n:"Ground Zero with Clyde Lewis",                       u:"https://groundzeromedia.org"},
      {n:"Coast to Coast AM — Art Bell/George Noory archive",  u:"https://www.coasttocoastam.com"},
      {n:"Blurry Creatures — paranormal & biblical mysteries", u:"https://www.blurrycreatures.com"},
      {n:"Geopolitics & Empire — Hrvoje Moric",               u:"https://geopoliticsandempire.com"},
      {n:"No Agenda — Adam Curry & John C. Dvorak",           u:"https://www.noagendashow.net"},
      {n:"Earth Ancients — ancient history & Emerald Tablets", u:"https://earthancients.net"},
    ],
  },

  // PEER-REVIEWED JOURNALS — ANOMALOUS & SUPPRESSED RESEARCH
  {
    label:"Peer-Reviewed Journals — Anomalous & Suppressed Research",
    type:"research",
    items:[
      {n:"Journal of Anomalous Experience & Cognition (JAEX)", u:"https://journals.lub.lu.se/jaex"},
      {n:"Journal of Parapsychology — Rhine Research Center",  u:"https://www.rhine.org/what-we-do/journal-of-parapsychology.html"},
      {n:"Journal of Near-Death Studies — IANDS",              u:"https://iands.org/research/publications/journal-of-near-death-studies.html"},
      {n:"Explore: Journal of Science & Healing",              u:"https://www.explorejournal.com"},
      {n:"Medical Hypotheses — Elsevier",                      u:"https://www.sciencedirect.com/journal/medical-hypotheses"},
      {n:"Nexus Magazine — UAP, fringe science & conspiracy",  u:"https://www.nexusmagazine.com"},
      {n:"Fate Magazine — strange phenomena since 1948",       u:"https://www.fatemagazine.com"},
      {n:"Lobster Magazine — parapolitics research UK",        u:"https://www.lobster-magazine.co.uk"},
    ],
  },

  // REDDIT COMMUNITIES
  {
    label:"Reddit Communities — Full Expanded List",
    type:"user",
    items:[
      {n:"r/conspiracy — 1.9M members",                        u:"https://www.reddit.com/r/conspiracy"},
      {n:"r/conspiracytheories",                               u:"https://www.reddit.com/r/conspiracytheories"},
      {n:"r/C_S_T — Critical Speculative Theory",              u:"https://www.reddit.com/r/C_S_T"},
      {n:"r/conspiracyfact — confirmed conspiracies",          u:"https://www.reddit.com/r/conspiracyfact"},
      {n:"r/UFOs — UAP sightings & disclosure",                u:"https://www.reddit.com/r/UFOs"},
      {n:"r/HighStrangeness — paranormal & unexplained",       u:"https://www.reddit.com/r/HighStrangeness"},
      {n:"r/Paranormal",                                       u:"https://www.reddit.com/r/Paranormal"},
      {n:"r/UAP",                                              u:"https://www.reddit.com/r/UAP"},
      {n:"r/aliens",                                           u:"https://www.reddit.com/r/aliens"},
      {n:"r/SkinWalkerRanch",                                  u:"https://www.reddit.com/r/SkinWalkerRanch"},
      {n:"r/AlternativeHistory",                               u:"https://www.reddit.com/r/AlternativeHistory"},
      {n:"r/AncientAliens",                                    u:"https://www.reddit.com/r/AncientAliens"},
      {n:"r/ancientcivilizations",                             u:"https://www.reddit.com/r/ancientcivilizations"},
      {n:"r/GrahamHancock",                                    u:"https://www.reddit.com/r/GrahamHancock"},
      {n:"r/Anunnaki",                                         u:"https://www.reddit.com/r/Anunnaki"},
      {n:"r/Giants — Nephilim & giant beings",                 u:"https://www.reddit.com/r/Giants"},
      {n:"r/biblestudy",                                       u:"https://www.reddit.com/r/biblestudy"},
      {n:"r/Lyme — Lyme disease research",                     u:"https://www.reddit.com/r/Lyme"},
      {n:"r/VaccineDebate",                                    u:"https://www.reddit.com/r/VaccineDebate"},
      {n:"r/epigenetics",                                      u:"https://www.reddit.com/r/epigenetics"},
      {n:"r/forbiddenscience",                                 u:"https://www.reddit.com/r/forbiddenscience"},
      {n:"r/Dolphins",                                         u:"https://www.reddit.com/r/Dolphins"},
      {n:"r/SimulationTheory",                                 u:"https://www.reddit.com/r/SimulationTheory"},
      {n:"r/consciousness",                                    u:"https://www.reddit.com/r/consciousness"},
      {n:"r/UnresolvedMysteries",                              u:"https://www.reddit.com/r/UnresolvedMysteries"},
      {n:"r/FOIA",                                             u:"https://www.reddit.com/r/FOIA"},
    ],
  },

  // FORUMS & ALTERNATIVE PLATFORMS
  {
    label:"Forums & Alternative Discussion Platforms",
    type:"user",
    items:[
      {n:"Above Top Secret (ATS) — the original conspiracy forum", u:"https://www.abovetopsecret.com"},
      {n:"Godlike Productions (GLP)",                          u:"https://www.godlikeproductions.com"},
      {n:"David Icke Forum — official community",              u:"https://forum.davidicke.com"},
      {n:"Project Avalon — Bill Ryan alternative research",    u:"https://projectavalon.net"},
      {n:"Rumble — uncensored video platform",                 u:"https://rumble.com"},
      {n:"Telegram — alternative media channels",              u:"https://telegram.org"},
      {n:"Gab — free speech alternative platform",             u:"https://gab.com"},
      {n:"Odysee/LBRY — decentralized video platform",        u:"https://odysee.com"},
      {n:"BitChute — alternative video hosting",               u:"https://www.bitchute.com"},
      {n:"Substack — independent newsletter platform",         u:"https://substack.com"},
      {n:"4chan /x/ board — paranormal & conspiracy",          u:"https://boards.4channel.org/x/"},
      {n:"Unexplained Mysteries Forum",                        u:"https://www.unexplained-mysteries.com/forum/"},
      {n:"Fortean Times Forum",                                u:"https://www.forteantimes.com/forum"},
    ],
  },

  // FACEBOOK GROUPS — ACTIVE RESEARCH COMMUNITIES
  {
    label:"Facebook Groups — Active Research Communities",
    type:"user",
    items:[
      {n:"Ancient Aliens & UFOs (Facebook Group)",             u:"https://www.facebook.com/groups/AncientAliensUFOs"},
      {n:"4biddenknowledge — Billy Carson Community",          u:"https://www.facebook.com/4biddenknowledge"},
      {n:"Dolores Cannon — QHHT Community Group",              u:"https://www.facebook.com/groups/dolorescannon"},
      {n:"David Icke Forum Community Page",                    u:"https://www.facebook.com/davidicke"},
      {n:"Graham Hancock — Official Page",                     u:"https://www.facebook.com/Author.GrahamHancock"},
      {n:"Wes Penre Papers Community",                         u:"https://www.facebook.com/groups/wespenrepapers"},
      {n:"Emerald Tablets & Thoth Research",                   u:"https://www.facebook.com/groups/emeraldtablets"},
      {n:"Ancient Sumerian & Anunnaki Research",               u:"https://www.facebook.com/groups/anunnaki.research"},
      {n:"Forbidden Archaeology & Alternative History",        u:"https://www.facebook.com/groups/forbiddenarchaeology"},
      {n:"Book of Enoch Studies Group",                        u:"https://www.facebook.com/groups/bookofenoch"},
      {n:"Simulation Theory — Are We in a Matrix?",           u:"https://www.facebook.com/groups/simulationtheory"},
      {n:"DNA, Epigenetics & Consciousness Research",          u:"https://www.facebook.com/groups/epigenetics.consciousness"},
      {n:"Gregg Braden — Science & Spirituality Community",   u:"https://www.facebook.com/greggbradenofficial"},
      {n:"UAP Disclosure — UFO Research Community",           u:"https://www.facebook.com/groups/uapdisclosure"},
      {n:"Missing 411 — Paulides Research Community",         u:"https://www.facebook.com/groups/missing411research"},
    ],
  },

  // ALTERNATIVE NEWS AGGREGATORS
  {
    label:"Alternative News Aggregators & Link Hubs",
    type:"news",
    items:[
      {n:"Natural News — Mike Adams",                          u:"https://www.naturalnews.com"},
      {n:"State of the Nation — deep state & alternative news",u:"https://stateofthenation.co"},
      {n:"What Really Happened — Michael Rivero",             u:"https://www.whatreallyhappened.com"},
      {n:"21st Century Wire — Patrick Henningsen",            u:"https://21stcenturywire.com"},
      {n:"End of the American Dream — Michael Snyder",        u:"https://endoftheamericandream.com"},
    ],
  },
];


  // REDDIT — UFO, UAP & DISCLOSURE
  {
    label:"Reddit — UFO, UAP, Aliens & Disclosure",
    type:"user",
    items:[
      {n:"r/UAPr",                   u:"https://www.reddit.com/r/UAPr"},
      {n:"r/UFOB",                   u:"https://www.reddit.com/r/UFOB"},
      {n:"r/UFObelievers",           u:"https://www.reddit.com/r/UFObelievers"},
      {n:"r/UFOscience",             u:"https://www.reddit.com/r/UFOscience"},
      {n:"r/UF0",                    u:"https://www.reddit.com/r/UF0"},
      {n:"r/ufo_memes",              u:"https://www.reddit.com/r/ufo_memes"},
      {n:"r/AlienAbduction",         u:"https://www.reddit.com/r/AlienAbduction"},
      {n:"r/Abductions",             u:"https://www.reddit.com/r/Abductions"},
      {n:"r/aliensamongus",          u:"https://www.reddit.com/r/aliensamongus"},
      {n:"r/InterdimensionalNHI",    u:"https://www.reddit.com/r/InterdimensionalNHI"},
      {n:"r/DisclosureParty",        u:"https://www.reddit.com/r/DisclosureParty"},
      {n:"r/Skydentify",             u:"https://www.reddit.com/r/Skydentify"},
      {n:"r/Area51",                 u:"https://www.reddit.com/r/Area51"},
      {n:"r/Antarctica",             u:"https://www.reddit.com/r/Antarctica"},
      {n:"r/ProjectBlueBeam",        u:"https://www.reddit.com/r/ProjectBlueBeam"},
    ],
  },

  // REDDIT — CONSPIRACY & GOVERNMENT
  {
    label:"Reddit — Conspiracy, Government & Deep State",
    type:"user",
    items:[
      {n:"r/ConspiracyII",           u:"https://www.reddit.com/r/ConspiracyII"},
      {n:"r/ConspiracyNOPOL",        u:"https://www.reddit.com/r/ConspiracyNOPOL"},
      {n:"r/ConspiracyHub",          u:"https://www.reddit.com/r/ConspiracyHub"},
      {n:"r/MetaConspiracy",         u:"https://www.reddit.com/r/MetaConspiracy"},
      {n:"r/ConspiracyMemes",        u:"https://www.reddit.com/r/ConspiracyMemes"},
      {n:"r/DeepState",              u:"https://www.reddit.com/r/DeepState"},
      {n:"r/NewWorldOrder",          u:"https://www.reddit.com/r/NewWorldOrder"},
      {n:"r/Illuminati",             u:"https://www.reddit.com/r/Illuminati"},
      {n:"r/shadowgovernment",       u:"https://www.reddit.com/r/shadowgovernment"},
      {n:"r/SecretSocieties",        u:"https://www.reddit.com/r/SecretSocieties"},
      {n:"r/GovernmentConspiracies", u:"https://www.reddit.com/r/GovernmentConspiracies"},
      {n:"r/FalseFlagWatch",         u:"https://www.reddit.com/r/FalseFlagWatch"},
      {n:"r/coverups",               u:"https://www.reddit.com/r/coverups"},
      {n:"r/ExposeTheCult",          u:"https://www.reddit.com/r/ExposeTheCult"},
      {n:"r/911truth",               u:"https://www.reddit.com/r/911truth"},
      {n:"r/JFKassassination",       u:"https://www.reddit.com/r/JFKassassination"},
      {n:"r/Epstein",                u:"https://www.reddit.com/r/Epstein"},
      {n:"r/Maxwell",                u:"https://www.reddit.com/r/Maxwell"},
      {n:"r/MKUltra",                u:"https://www.reddit.com/r/MKUltra"},
      {n:"r/CIA",                    u:"https://www.reddit.com/r/CIA"},
      {n:"r/BlackVault",             u:"https://www.reddit.com/r/BlackVault"},
      {n:"r/HiddenTruth",            u:"https://www.reddit.com/r/HiddenTruth"},
      {n:"r/Secrets",                u:"https://www.reddit.com/r/Secrets"},
      {n:"r/TruthLeaks",             u:"https://www.reddit.com/r/TruthLeaks"},
      {n:"r/HiddenDocuments",        u:"https://www.reddit.com/r/HiddenDocuments"},
      {n:"r/secretspaces",           u:"https://www.reddit.com/r/secretspaces"},
      {n:"r/redacted",               u:"https://www.reddit.com/r/redacted"},
      {n:"r/SecretWars",             u:"https://www.reddit.com/r/SecretWars"},
      {n:"r/HistoryConspiracy",      u:"https://www.reddit.com/r/HistoryConspiracy"},
      {n:"r/BiblicalConspiracy",     u:"https://www.reddit.com/r/BiblicalConspiracy"},
      {n:"r/OccultConspiracy",       u:"https://www.reddit.com/r/OccultConspiracy"},
    ],
  },

  // REDDIT — PARANORMAL & SUPERNATURAL
  {
    label:"Reddit — Paranormal, Supernatural & Cryptids",
    type:"user",
    items:[
      {n:"r/Thetruthishere",         u:"https://www.reddit.com/r/Thetruthishere"},
      {n:"r/Unexplained",            u:"https://www.reddit.com/r/Unexplained"},
      {n:"r/UnexplainedPhotos",      u:"https://www.reddit.com/r/UnexplainedPhotos"},
      {n:"r/ParanormalEncounters",   u:"https://www.reddit.com/r/ParanormalEncounters"},
      {n:"r/Experiencers",           u:"https://www.reddit.com/r/Experiencers"},
      {n:"r/Supernatural",           u:"https://www.reddit.com/r/Supernatural"},
      {n:"r/ghosts",                 u:"https://www.reddit.com/r/ghosts"},
      {n:"r/Haunted",                u:"https://www.reddit.com/r/Haunted"},
      {n:"r/ShadowPeople",           u:"https://www.reddit.com/r/ShadowPeople"},
      {n:"r/EntityEncounter",        u:"https://www.reddit.com/r/EntityEncounter"},
      {n:"r/Humanoidencounters",     u:"https://www.reddit.com/r/Humanoidencounters"},
      {n:"r/Cryptozoology",          u:"https://www.reddit.com/r/Cryptozoology"},
      {n:"r/Bigfoot",                u:"https://www.reddit.com/r/Bigfoot"},
      {n:"r/dogman",                 u:"https://www.reddit.com/r/dogman"},
      {n:"r/CrawlerSightings",       u:"https://www.reddit.com/r/CrawlerSightings"},
      {n:"r/monsters",               u:"https://www.reddit.com/r/monsters"},
      {n:"r/SeaMonsters",            u:"https://www.reddit.com/r/SeaMonsters"},
      {n:"r/Mothman",                u:"https://www.reddit.com/r/Mothman"},
      {n:"r/Skinwalker",             u:"https://www.reddit.com/r/Skinwalker"},
      {n:"r/AnomaliesUnleashed",     u:"https://www.reddit.com/r/AnomaliesUnleashed"},
      {n:"r/StrangeEarth",           u:"https://www.reddit.com/r/StrangeEarth"},
      {n:"r/StrangeExperiences",     u:"https://www.reddit.com/r/StrangeExperiences"},
      {n:"r/StrangeStories",         u:"https://www.reddit.com/r/StrangeStories"},
      {n:"r/StrangeEvidence",        u:"https://www.reddit.com/r/StrangeEvidence"},
      {n:"r/Phenomenon",             u:"https://www.reddit.com/r/Phenomenon"},
      {n:"r/Mysterious",             u:"https://www.reddit.com/r/Mysterious"},
      {n:"r/ForteanResearch",        u:"https://www.reddit.com/r/ForteanResearch"},
      {n:"r/BackwoodsCreepy",        u:"https://www.reddit.com/r/BackwoodsCreepy"},
      {n:"r/UrbanLegends",           u:"https://www.reddit.com/r/UrbanLegends"},
      {n:"r/Folklore",               u:"https://www.reddit.com/r/Folklore"},
      {n:"r/mythsandlegends",        u:"https://www.reddit.com/r/mythsandlegends"},
    ],
  },

  // REDDIT — ANCIENT HISTORY & ALTERNATIVE ARCHAEOLOGY
  {
    label:"Reddit — Ancient History, Lost Civilizations & Alternative Archaeology",
    type:"user",
    items:[
      {n:"r/AncientCivilizations",   u:"https://www.reddit.com/r/AncientCivilizations"},
      {n:"r/ArchaeologyMysteries",   u:"https://www.reddit.com/r/ArchaeologyMysteries"},
      {n:"r/Pyramids",               u:"https://www.reddit.com/r/Pyramids"},
      {n:"r/Egyptology",             u:"https://www.reddit.com/r/Egyptology"},
      {n:"r/Atlantis",               u:"https://www.reddit.com/r/Atlantis"},
      {n:"r/LostCivilizations",      u:"https://www.reddit.com/r/LostCivilizations"},
      {n:"r/HiddenHistory",          u:"https://www.reddit.com/r/HiddenHistory"},
      {n:"r/WeirdHistory",           u:"https://www.reddit.com/r/WeirdHistory"},
      {n:"r/ForbiddenArchaeology",   u:"https://www.reddit.com/r/ForbiddenArchaeology"},
      {n:"r/Tartaria",               u:"https://www.reddit.com/r/Tartaria"},
      {n:"r/CulturalLayer",          u:"https://www.reddit.com/r/CulturalLayer"},
      {n:"r/Mudflood",               u:"https://www.reddit.com/r/Mudflood"},
      {n:"r/EarthMysteries",         u:"https://www.reddit.com/r/EarthMysteries"},
      {n:"r/MysteriousUniverse",     u:"https://www.reddit.com/r/MysteriousUniverse"},
      {n:"r/UnknownFacts",           u:"https://www.reddit.com/r/UnknownFacts"},
    ],
  },

  // REDDIT — CONSCIOUSNESS, SPIRITUALITY & SIMULATION
  {
    label:"Reddit — Consciousness, Spirituality, Simulation & Metaphysics",
    type:"user",
    items:[
      {n:"r/MandelaEffect",          u:"https://www.reddit.com/r/MandelaEffect"},
      {n:"r/Glitch_in_the_Matrix",   u:"https://www.reddit.com/r/Glitch_in_the_Matrix"},
      {n:"r/MatrixReality",          u:"https://www.reddit.com/r/MatrixReality"},
      {n:"r/Retconned",              u:"https://www.reddit.com/r/Retconned"},
      {n:"r/AstralProjection",       u:"https://www.reddit.com/r/AstralProjection"},
      {n:"r/NDE",                    u:"https://www.reddit.com/r/NDE"},
      {n:"r/ReincarnationTruth",     u:"https://www.reddit.com/r/ReincarnationTruth"},
      {n:"r/DimensionJumping",       u:"https://www.reddit.com/r/DimensionJumping"},
      {n:"r/RealityShifting",        u:"https://www.reddit.com/r/RealityShifting"},
      {n:"r/EscapingPrisonPlanet",   u:"https://www.reddit.com/r/EscapingPrisonPlanet"},
      {n:"r/SaturnStormCube",        u:"https://www.reddit.com/r/SaturnStormCube"},
      {n:"r/PastSaturnsRings",       u:"https://www.reddit.com/r/PastSaturnsRings"},
      {n:"r/lawofone",               u:"https://www.reddit.com/r/lawofone"},
      {n:"r/NevilleGoddard",         u:"https://www.reddit.com/r/NevilleGoddard"},
      {n:"r/starseeds",              u:"https://www.reddit.com/r/starseeds"},
      {n:"r/awakened",               u:"https://www.reddit.com/r/awakened"},
      {n:"r/Soulnexus",              u:"https://www.reddit.com/r/Soulnexus"},
      {n:"r/spirituality",           u:"https://www.reddit.com/r/spirituality"},
      {n:"r/Meditation",             u:"https://www.reddit.com/r/Meditation"},
      {n:"r/energy_work",            u:"https://www.reddit.com/r/energy_work"},
      {n:"r/Psychic",                u:"https://www.reddit.com/r/Psychic"},
      {n:"r/RemoteViewing",          u:"https://www.reddit.com/r/RemoteViewing"},
      {n:"r/RemoteViewers",          u:"https://www.reddit.com/r/RemoteViewers"},
      {n:"r/Dreams",                 u:"https://www.reddit.com/r/Dreams"},
      {n:"r/DMT",                    u:"https://www.reddit.com/r/DMT"},
      {n:"r/Psychonaut",             u:"https://www.reddit.com/r/Psychonaut"},
      {n:"r/Occult",                 u:"https://www.reddit.com/r/Occult"},
      {n:"r/EsotericOccult",         u:"https://www.reddit.com/r/EsotericOccult"},
    ],
  },

  // REDDIT — SCIENCE, FRINGE & ALTERNATIVE
  {
    label:"Reddit — Fringe Science, Alternative Theories & Research",
    type:"user",
    items:[
      {n:"r/FringeTheory",           u:"https://www.reddit.com/r/FringeTheory"},
      {n:"r/FringeScience",          u:"https://www.reddit.com/r/FringeScience"},
      {n:"r/AlternativeScience",     u:"https://www.reddit.com/r/AlternativeScience"},
      {n:"r/Parapsychology",         u:"https://www.reddit.com/r/Parapsychology"},
      {n:"r/ScienceUnexplained",     u:"https://www.reddit.com/r/ScienceUnexplained"},
      {n:"r/QuantumPhysics",         u:"https://www.reddit.com/r/QuantumPhysics"},
      {n:"r/Physics",                u:"https://www.reddit.com/r/Physics"},
      {n:"r/TheoriesOfEverything",   u:"https://www.reddit.com/r/TheoriesOfEverything"},
      {n:"r/HollowEarth",            u:"https://www.reddit.com/r/HollowEarth"},
      {n:"r/FlatEarth",              u:"https://www.reddit.com/r/FlatEarth"},
      {n:"r/GlobeSkepticism",        u:"https://www.reddit.com/r/GlobeSkepticism"},
      {n:"r/Futurology",             u:"https://www.reddit.com/r/Futurology"},
      {n:"r/singularity",            u:"https://www.reddit.com/r/singularity"},
      {n:"r/Transhumanism",          u:"https://www.reddit.com/r/Transhumanism"},
      {n:"r/TimeTravel",             u:"https://www.reddit.com/r/TimeTravel"},
      {n:"r/Prophecies",             u:"https://www.reddit.com/r/Prophecies"},
      {n:"r/Chemtrails",             u:"https://www.reddit.com/r/Chemtrails"},
      {n:"r/HAARP",                  u:"https://www.reddit.com/r/HAARP"},
      {n:"r/WeatherModification",    u:"https://www.reddit.com/r/WeatherModification"},
      {n:"r/Gangstalking",           u:"https://www.reddit.com/r/Gangstalking"},
      {n:"r/TargetedIndividuals",    u:"https://www.reddit.com/r/TargetedIndividuals"},
      {n:"r/ForbiddenKnowledge",     u:"https://www.reddit.com/r/ForbiddenKnowledge"},
      {n:"r/UnknownUniverse",        u:"https://www.reddit.com/r/UnknownUniverse"},
    ],
  },

  // REDDIT — SPACE, ASTRONOMY & SETI
  {
    label:"Reddit — Space, Astronomy, SETI & Cosmic Mysteries",
    type:"user",
    items:[
      {n:"r/space",                  u:"https://www.reddit.com/r/space"},
      {n:"r/Astronomy",              u:"https://www.reddit.com/r/Astronomy"},
      {n:"r/astrophysics",           u:"https://www.reddit.com/r/astrophysics"},
      {n:"r/BlackHole",              u:"https://www.reddit.com/r/BlackHole"},
      {n:"r/NASA",                   u:"https://www.reddit.com/r/NASA"},
      {n:"r/SETI",                   u:"https://www.reddit.com/r/SETI"},
      {n:"r/spaceporn",              u:"https://www.reddit.com/r/spaceporn"},
      {n:"r/Apocalypse",             u:"https://www.reddit.com/r/Apocalypse"},
      {n:"r/PrepperIntel",           u:"https://www.reddit.com/r/PrepperIntel"},
      {n:"r/collapse",               u:"https://www.reddit.com/r/collapse"},
    ],
  },

  // REDDIT — INTERNET MYSTERIES, CREEPY & LIMINAL
  {
    label:"Reddit — Internet Mysteries, Creepy & Liminal Spaces",
    type:"user",
    items:[
      {n:"r/InternetMysteries",      u:"https://www.reddit.com/r/InternetMysteries"},
      {n:"r/ARG",                    u:"https://www.reddit.com/r/ARG"},
      {n:"r/RBI",                    u:"https://www.reddit.com/r/RBI"},
      {n:"r/creepy",                 u:"https://www.reddit.com/r/creepy"},
      {n:"r/nosleep",                u:"https://www.reddit.com/r/nosleep"},
      {n:"r/LetsNotMeet",            u:"https://www.reddit.com/r/LetsNotMeet"},
      {n:"r/oddlyterrifying",        u:"https://www.reddit.com/r/oddlyterrifying"},
      {n:"r/nightmarefuel",          u:"https://www.reddit.com/r/nightmarefuel"},
      {n:"r/TrueScaryStories",       u:"https://www.reddit.com/r/TrueScaryStories"},
      {n:"r/TheBackrooms",           u:"https://www.reddit.com/r/TheBackrooms"},
      {n:"r/LiminalSpace",           u:"https://www.reddit.com/r/LiminalSpace"},
      {n:"r/HiddenRooms",            u:"https://www.reddit.com/r/HiddenRooms"},
      {n:"r/abandoned",              u:"https://www.reddit.com/r/abandoned"},
      {n:"r/evilbuildings",          u:"https://www.reddit.com/r/evilbuildings"},
      {n:"r/submechanophobia",       u:"https://www.reddit.com/r/submechanophobia"},
      {n:"r/thalassophobia",         u:"https://www.reddit.com/r/thalassophobia"},
      {n:"r/DeepIntoYouTube",        u:"https://www.reddit.com/r/DeepIntoYouTube"},
      {n:"r/nonmurdermysteries",     u:"https://www.reddit.com/r/nonmurdermysteries"},
      {n:"r/weird",                  u:"https://www.reddit.com/r/weird"},
      {n:"r/oddities",               u:"https://www.reddit.com/r/oddities"},
    ],
  },

  // REDDIT — POPULAR & CROSSOVER
  {
    label:"Reddit — Popular Crossover & Research Hubs",
    type:"user",
    items:[
      {n:"r/JoeRogan",               u:"https://www.reddit.com/r/JoeRogan"},
      {n:"r/LexFridman",             u:"https://www.reddit.com/r/LexFridman"},
      {n:"r/IntellectualDarkWeb",    u:"https://www.reddit.com/r/IntellectualDarkWeb"},
      {n:"r/Damnthatsinteresting",   u:"https://www.reddit.com/r/Damnthatsinteresting"},
      {n:"r/InterestingAsFuck",      u:"https://www.reddit.com/r/InterestingAsFuck"},
      {n:"r/BeAmazed",               u:"https://www.reddit.com/r/BeAmazed"},
      {n:"r/blackmagicfuckery",      u:"https://www.reddit.com/r/blackmagicfuckery"},
      {n:"r/Scary",                  u:"https://www.reddit.com/r/Scary"},
      {n:"r/WTF",                    u:"https://www.reddit.com/r/WTF"},
      {n:"r/retrofuturism",          u:"https://www.reddit.com/r/retrofuturism"},
      {n:"r/DisasterUpdate",         u:"https://www.reddit.com/r/DisasterUpdate"},
    ],
  },


export const PRIVACY_POLICY = `PRIVACY POLICY & TERMS OF USE — THE NEXUS
thenexusapp.com | Effective: \${new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. WHO WE ARE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
The Nexus is an independent investigative research platform. We aggregate public records, declassified documents, investigative journalism, and community-submitted research for independent educational use. Not affiliated with any government, intelligence agency, political organization, or media company.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. WHAT WE COLLECT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• NO account required to browse. No email, no passwords, no personal data collected by default.
• Community posts you submit are stored publicly on the platform and visible to all users.
• Payments are handled entirely by Stripe. We never see, store, or process your card details.
• Reddit integration uses Reddit's public API only. No Reddit user data is collected by us.
• AI Analysis queries are processed by Anthropic's API. See anthropic.com/privacy.
• We do not use cookies for tracking, advertising, or behavioral profiling.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. WHAT WE DO NOT DO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• We do NOT sell, rent, or share any user data. Ever.
• We do NOT use advertising networks, tracking pixels, or behavioral analytics.
• We do NOT require account creation to browse free content.
• We do NOT store payment card details of any kind.
• We do NOT collect data on minors. This platform is for adults 18+ only.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. TERMS OF USE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• This platform is for ADULTS aged 18 and older only.
• All content is for independent research and educational purposes only.
• The Nexus does not endorse, verify, or take editorial positions on any record or claim.
• Community posts must be based on publicly available information. Users confirm no copyright violations.
• Paid subscribers agree to Stripe's Terms of Service for payment processing.
• We reserve the right to remove community posts that violate these terms without notice.
• By using this platform you agree to these terms.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. INTELLECTUAL PROPERTY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• All source links point to original external sources. The Nexus does not reproduce copyrighted material.
• Community posts remain the intellectual property of their authors.
• The Nexus platform design, code, and original text are proprietary.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. YOUR RIGHTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• You may request deletion of any community content you submitted at any time.
• You may cancel your paid subscription at any time through the Stripe customer portal.
• No personal data is stored by us beyond your community posts.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
7. DISCLAIMER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
The Nexus presents records, documents, and community research for independent examination. Inclusion of any record does not constitute endorsement. Users are encouraged to verify all claims independently. This platform is not a news organization, legal authority, or medical service.`;
