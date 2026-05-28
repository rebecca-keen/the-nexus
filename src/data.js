// --- ADMIN -------------------------------------------------------------------

export const ADMIN_USER = "nexusadmin";
export const ADMIN_PASS = "N3xus@2025";

// -- AI Configuration ----------------------------------------------------------
// Get a FREE API key at openrouter.ai  -  sign up, go to Keys, create one
// Free models: mistralai/mistral-7b-instruct, google/gemma-3-27b-it:free, meta-llama/llama-3.1-8b-instruct:free
export const OPENROUTER_KEY = "PASTE_YOUR_OPENROUTER_KEY_HERE";
export const AI_MODEL = "google/gemma-3-27b-it:free"; // Free model  -  no billing required



// --- TOPICS ------------------------------------------------------------------
export const TOPICS = [
  "All Topics",
  "UAP & Anomalous",
  "Aliens & Extraterrestrial",
  "Government & Intelligence",
  "Unresolved Events",
  "Hidden History",
  "Ancient Civilizations",
  "Ancient Gods & Beings",
  "Lost Technology",
  "Portals & Stargates",
  "Remote Viewing & PSI",
  "Secret Societies",
  "Finance & Power",
  "Health & Science",
  "Vaccines & Big Pharma",
  "Ticks & Bioweapons",
  "Food & Biotech",
  "Forbidden Science",
  "Consciousness & Mind",
  "Simulation & Reality",
  "Frequency & Energy",
  "DNA & Genetics",
  "Ocean & Earth",
  "Giants & Nephilim",
  "Biblical & Religious Records",
  "Animal Intelligence",
  "Atlantis & Lemuria",
  "Sacred Geometry",
  "Media & Disclosure",
  "Surveillance",
  "Geopolitics & Deep State",
];

export const REGIONS = [
  "All Regions","USA","Global","Middle East","Egypt","Vatican","UK","South America",
];

export const VERDICTS = {
  confirmed:  { label:"Confirmed Record", short:"CONFIRMED",  color:"#0d2010", text:"#40c070", border:"#1a4a1a", icon:"+" },
  likely:     { label:"Likely Accurate",  short:"LIKELY",     color:"#0d1e10", text:"#60d080", border:"#1a3a1a", icon:"^" },
  contested:  { label:"Disputed",         short:"DISPUTED",   color:"#1e1a08", text:"#c0a020", border:"#3a3010", icon:"" },
  unverified: { label:"Unverified",       short:"UNVERIFIED", color:"#1a1008", text:"#c07820", border:"#3a2810", icon:"?" },
  refuted:    { label:"Refuted",          short:"REFUTED",    color:"#1a0808", text:"#c04040", border:"#3a1010", icon:"x" },
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

// --- REDDIT SUBREDDITS --------------------------------------------------------
export const REDDIT_SUBS = [
  {name:"r/conspiracy",           url:"https://www.reddit.com/r/conspiracy",           color:"#ff6314", desc:"1.9M  -  alternative viewpoints"},
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




// --- SEED STORIES -------------------------------------------------------------
export const SEED_STORIES = [
  { id:"s1",  type:"archive",  source:"National Security Archive", sourceUrl:"https://nsarchive.gwu.edu",         time:"1h ago",  topic:"Government & Intelligence",    region:"USA",title:"Operation Northwoods: Joint Chiefs Proposed Staging Domestic Attacks to Justify War",                     summary:"The 1962 document proposed faking attacks on American soil to justify invading Cuba. JFK rejected it. Declassified in 1997  -  a primary example of documented false-flag planning within the U.S. military establishment.",                                     upvotes:4100, comments:529,  credible:94, debunked:6,  tags:["Declassified","False Flag","Military"],           premium:false },
  { id:"s2",  type:"archive",  source:"Dead Sea Scrolls Archive",  sourceUrl:"https://www.deadseascrolls.org.il", time:"2h ago",  topic:"Biblical & Religious Records",  region:"Middle East",title:"Book of Enoch: The Watchers Who Took Human Wives and Produced the Nephilim  -  Complete Pre-Biblical Account", summary:"The Book of Enoch, found among the Dead Sea Scrolls, describes the Watchers  -  fallen angels  -  who descended to earth, took human wives, and produced the Nephilim giants. The text directly influenced Genesis 6 and was excluded from the Biblical canon at the Council of Nicaea.", upvotes:6821, comments:1102, credible:78, debunked:22, tags:["Enoch","Watchers","Nephilim","Giants"],          premium:false },
  { id:"s3",  type:"research", source:"Smithsonian Archives Review",sourceUrl:"https://www.si.edu",               time:"3h ago",  topic:"Giants & Nephilim",            region:"USA",title:"19th Century Newspaper Reports of Giant Skeletal Remains Across North America  -  Catalogued",               summary:"Over 400 newspaper articles from 1848-1912 report giant humanoid skeletons  -  some 7 to 12 feet tall  -  across the American Midwest. Researchers allege the Smithsonian systematically collected and suppressed these remains following its founding mandate.",      upvotes:9100, comments:1841, credible:65, debunked:35, tags:["Giants","Nephilim","Smithsonian","Cover-up"],    premium:false },
  { id:"s4",  type:"research", source:"Marine Biology Quarterly",   sourceUrl:"https://www.tos.org",              time:"4h ago",  topic:"Animal Intelligence",           region:"Global",title:"Dolphin Communication: Evidence of Names, Syntax, and Cultural Transmission Across Generations",           summary:"Peer-reviewed research documents dolphins using unique signature whistles as individual names, teaching tool use across generations, and displaying syntax in communication  -  cognitive capabilities that challenge assumptions about uniquely human language.",     upvotes:4211, comments:621,  credible:88, debunked:12, tags:["Dolphins","Intelligence","Language"],            premium:false },
  { id:"s5",  type:"archive",  source:"CIA Reading Room",           sourceUrl:"https://www.cia.gov/readingroom",  time:"5h ago",  topic:"Government & Intelligence",    region:"USA",title:"MK-Ultra: CIA Mind Control Experiments on Unwitting Citizens  -  Confirmed by Senate 1977",                  summary:"The CIA ran LSD, hypnosis, and electroshock experiments on unwitting subjects for two decades. Confirmed by the Church Committee. Files were partially destroyed before the 1977 disclosure.",                                                              upvotes:7200, comments:1102, credible:96, debunked:4,  tags:["MK-Ultra","CIA","Declassified"],                  premium:false },
  { id:"s6",  type:"news",     source:"The Intercept",              sourceUrl:"https://theintercept.com",         time:"6h ago",  topic:"Surveillance",                 region:"USA",title:"NSA Metadata Collection Exceeded Legal Mandate  -  Internal Analysts Raised Concerns",                     summary:"FOIA documents show NSA analysts raised concerns that domestic metadata collection exceeded FISA authority. The program ran for years before the Snowden disclosures changed public awareness.",                                                             upvotes:1842, comments:214,  credible:78, debunked:22, tags:["NSA","FOIA","Surveillance"],                    premium:true },
  { id:"s7",  type:"blog",     source:"Corbett Report",             sourceUrl:"https://www.corbettreport.com",    time:"7h ago",  topic:"Finance & Power",              region:"Global",title:"The Bilderberg Group: 70 Years of Private Summits Between Heads of State and Central Bankers",             summary:"Annual meetings include sitting prime ministers, NATO chiefs, and major media owners  -  with no press, no published minutes, and no public accountability whatsoever.",                                                                                       upvotes:3201, comments:441,  credible:71, debunked:29, tags:["Bilderberg","Power","Finance"],                  premium:true },
  { id:"s8",  type:"podcast",  source:"The Why Files",              sourceUrl:"https://www.youtube.com/@TheWhyFiles",time:"8h ago",topic:"Ancient Civilizations",        region:"Global",title:"Gobekli Tepe: 12,000-Year-Old Megalithic Temple Complex Rewrites Accepted Timeline of Human Civilization", summary:"Gobekli Tepe in Turkey predates Stonehenge by 6,000 years and the Egyptian pyramids by 7,000 years  -  built before agriculture was established. The Why Files examines what this means for the accepted timeline of organized human civilization.",         upvotes:5821, comments:891,  credible:89, debunked:11, tags:["Gobekli Tepe","Ancient","Timeline"],             premium:false },
  { id:"s9",  type:"research", source:"Genesis 6 Ministries",      sourceUrl:"https://gen6giants.com",           time:"9h ago",  topic:"Giants & Nephilim",            region:"Global",title:"Genesis 6 and the Nephilim: Cross-Cultural Evidence of Giant Beings in Over 200 Ancient Traditions",      summary:"Researchers have catalogued over 200 ancient cultures from Mesopotamia to the Americas to Polynesia that contain independent legends of giant beings living among early humans, many with striking structural parallels to the Genesis account.",             upvotes:5820, comments:891,  credible:60, debunked:40, tags:["Nephilim","Genesis","Cross-Cultural","Giants"], premium:true },
  { id:"s10", type:"archive",  source:"Vatican Apostolic Archive",  sourceUrl:"https://www.archivioapostolicovaticano.va",time:"10h ago",topic:"Biblical & Religious Records",region:"Vatican",title:"Suppressed Gospels and Texts Excluded at the Council of Nicaea in 325 AD  -  Vatican Archives",             summary:"The Council of Nicaea in 325 AD determined the official Biblical canon. Dozens of gospels including the Gospel of Thomas and the Book of Enoch were excluded. Many remain in the Vatican Archives, partially accessible since 1881.",                       upvotes:7410, comments:1204, credible:82, debunked:18, tags:["Vatican","Canon","Suppressed","Nicaea"],          premium:true },
  { id:"s11", type:"research", source:"Journal of Cetacean Research",sourceUrl:"https://iwc.int",                time:"11h ago", topic:"Animal Intelligence",           region:"Global",title:"Orca and Dolphin Long-Term Memory: Evidence of Multigenerational Cultural Knowledge and Grief",            summary:"Studies document orcas maintaining grudges against specific boats for decades, grieving dead calves for weeks, and transmitting dialect-specific vocalizations across four generations  -  qualifying as cultural identity by scientific definition.",          upvotes:3918, comments:445,  credible:85, debunked:15, tags:["Orca","Dolphins","Memory","Culture"],          premium:true },
  { id:"s12", type:"archive",  source:"WikiLeaks",                  sourceUrl:"https://wikileaks.org",            time:"12h ago", topic:"Surveillance",                 region:"Global",title:"CIA Vault 7  -  UMBRAGE: Malware Library Designed to Frame Other Nations for Cyberattacks",                 summary:"The CIA maintained hacking tools designed to leave digital fingerprints matching other nations  -  fundamentally challenging attribution certainty in all major cyberattacks since 2010.",                                                                    upvotes:9200, comments:1841, credible:88, debunked:12, tags:["CIA","Cyber","False Attribution"],               premium:true },
  // -- Additional USA stories -------------------------------------------------
  { id:"s13", type:"news",    source:"Miami Herald",               sourceUrl:"https://www.miamiherald.com",      time:"13h ago", topic:"Unresolved Events",             region:"USA",  title:"Jeffrey Epstein: No Verified Income Source, Private Islands, Access to World Leaders  -  Full Investigation", summary:"The Herald's investigation found Epstein had no verifiable business generating his wealth, yet maintained relationships with heads of state globally. His 2019 death was ruled suicide with both prison guards asleep and cameras malfunctioning.", upvotes:6821, comments:1204, credible:86, debunked:14, tags:["Epstein","Intelligence","Unsealed"],            premium:false },
  { id:"s14", type:"news",    source:"Wall Street Journal",        sourceUrl:"https://www.wsj.com",              time:"14h ago", topic:"Health & Science",              region:"USA",  title:"FBI Director: Lab Leak Is Most Credible COVID-19 Origin  -  Declassified Intelligence Assessment",           summary:"FBI Director Wray stated the Bureau assessed SARS-CoV-2 most likely originated from a lab incident. The DOE reached the same conclusion independently. FOIA emails show NIH officials tried to suppress this hypothesis in early 2020.",              upvotes:7910, comments:1480, credible:74, debunked:26, tags:["COVID","Lab Leak","Declassified"],               premium:true },
  { id:"s15", type:"research",source:"AE911Truth / UAF Study",    sourceUrl:"https://www.ae911truth.org",       time:"15h ago", topic:"Unresolved Events",             region:"USA",  title:"University of Alaska Fairbanks: WTC 7 Collapse Could Not Have Been Caused by Fire  -  4-Year Engineering Study", summary:"The UAF study concluded WTC Building 7  -  not struck by a plane  -  could only have collapsed through near-simultaneous failure of every column. The official NIST report attributed it to fire alone.", upvotes:7210, comments:1842, credible:65, debunked:35, tags:["WTC7","Engineering","9/11"],                    premium:true },
  { id:"s16", type:"archive", source:"NSA Archive",               sourceUrl:"https://nsarchive.gwu.edu",         time:"16h ago", topic:"Government & Intelligence",     region:"USA",  title:"Operation Paperclip: 1,600 Nazi Scientists Secretly Transferred to the U.S. After WWII  -  Full Document Release", summary:"After WWII the U.S. military secretly recruited Nazi scientists and engineers. Wernher von Braun, an SS officer, became the chief architect of NASA's Apollo program. The full scope of transferred knowledge remains partially classified.", upvotes:4800, comments:721,  credible:97, debunked:3,  tags:["Paperclip","NASA","Declassified"],               premium:true },
  { id:"s17", type:"news",    source:"The Intercept",             sourceUrl:"https://theintercept.com",          time:"17h ago", topic:"Media & Disclosure",            region:"USA",  title:"Twitter Files: FBI Communication Channels Resulted in Suppression of Accurate Reporting  -  Internal Documents", summary:"Internal documents showed sustained FBI communication with Twitter trust-and-safety teams. Several suppression requests targeted stories that later proved accurate, including the Hunter Biden laptop story.", upvotes:8841, comments:2102, credible:81, debunked:19, tags:["Twitter","FBI","Censorship"],                  premium:true },
  { id:"s18", type:"blog",    source:"Corbett Report",            sourceUrl:"https://www.corbettreport.com",     time:"18h ago", topic:"Finance & Power",               region:"USA",  title:"The Federal Reserve: A Private Banking Cartel That Has Never Been Independently Audited in 110 Years",      summary:"The Federal Reserve has never undergone a full independent audit despite controlling U.S. monetary policy. The Fed Transparency Act has been repeatedly blocked. A partial audit in 2011 revealed $16 trillion in secret emergency loans.", upvotes:5200, comments:714,  credible:82, debunked:18, tags:["Federal Reserve","Banking","Audit"],              premium:true },
  // -- Giants & Biblical USA stories ------------------------------------------
  { id:"s19", type:"research",source:"Newspaper Archive",         sourceUrl:"https://newspaperarchive.com",      time:"19h ago", topic:"Giants & Nephilim",             region:"USA",  title:"Ohio Mound Builders: Giant Skeletons 7-9 Feet Tall Documented by Archaeologists in 1800s  -  Full Archive",   summary:"The Smithsonian's own Bureau of Ethnology Annual Reports from the 1870s-1890s document giant humanoid skeletal remains found in burial mounds across Ohio, Indiana, and West Virginia  -  some exceeding 9 feet. None are publicly accessible today.", upvotes:6200, comments:980,  credible:62, debunked:38, tags:["Giants","Ohio","Mounds","Smithsonian"],           premium:false },
  { id:"s20", type:"research",source:"Gen6 Giants",               sourceUrl:"https://www.gen6giants.com",        time:"20h ago", topic:"Giants & Nephilim",             region:"USA",  title:"Numbers 13:33  -  The Israelite Spies Report Giants in Canaan: 'We Were Like Grasshoppers in Our Own Sight'", summary:"The Biblical account of Israelite spies reporting Nephilim in Canaan provides geographic and descriptive detail that researchers cross-reference with ancient Canaanite archaeology. The Anakim and Rephaim are named separately from the Nephilim.", upvotes:4100, comments:621,  credible:55, debunked:45, tags:["Nephilim","Numbers","Canaan","Biblical"],          premium:true },
  { id:"s21", type:"podcast", source:"The Why Files",             sourceUrl:"https://www.youtube.com/@TheWhyFiles",time:"21h ago",topic:"Giants & Nephilim",             region:"USA",  title:"The Smithsonian Giant Cover-Up: Hundreds of 19th Century Reports and Where the Remains Went",               summary:"The Why Files investigates the documented trail of giant skeletal discoveries in the American Midwest and Southeast  -  from initial newspaper accounts to Smithsonian collection records  -  and the complete absence of any remains in publicly accessible collections.", upvotes:7100, comments:1102, credible:61, debunked:39, tags:["Giants","Smithsonian","Cover-up","USA"],         premium:true },
  // -- Dolphin / Animal Intelligence -------------------------------------------
  { id:"s22", type:"research",source:"NOAA Marine Research",      sourceUrl:"https://oceanexplorer.noaa.gov",    time:"22h ago", topic:"Animal Intelligence",           region:"USA",  title:"U.S. Navy Dolphin Research Program: Decades of Classified Intelligence on Dolphin Cognition and Sonar",    summary:"The U.S. Navy's Marine Mammal Program, based in San Diego, has studied dolphin intelligence and sonar capabilities since the 1960s. Declassified portions reveal communication sophistication that exceeds most civilian research benchmarks.", upvotes:3400, comments:412,  credible:79, debunked:21, tags:["Dolphins","Navy","Sonar","Intelligence"],         premium:true },
  { id:"s23", type:"research",source:"Shark Bay Research Station", sourceUrl:"https://www.monkeymia.com.au",      time:"23h ago", topic:"Animal Intelligence",           region:"Global", title:"Bottlenose Dolphins Using Marine Sponges as Tools  -  Cultural Transmission Confirmed Across 3 Generations",  summary:"Dolphins at Shark Bay, Australia use marine sponges to protect their snouts while foraging  -  a behavior taught exclusively mother to daughter and documented across three generations, meeting the scientific definition of cultural transmission.", upvotes:2900, comments:318,  credible:91, debunked:9,  tags:["Dolphins","Tool Use","Culture","Research"],       premium:true },
  // -- Forbidden Science / Lost Technology -------------------------------------
  { id:"s24", type:"research",source:"Graham Hancock",            sourceUrl:"https://grahamhancock.com",          time:"1d ago",  topic:"Lost Technology",               region:"Egypt", title:"The Great Pyramid's Internal Temperature Remains a Constant 68 degreesF Regardless of Outside Temperature",        summary:"The Great Pyramid of Giza maintains a constant internal temperature of 68 degreesF (20 degreesC)  -  the same as the Earth's mean temperature  -  regardless of external conditions. Engineers have been unable to explain this thermodynamic property using conventional construction theory.", upvotes:5100, comments:721,  credible:72, debunked:28, tags:["Pyramid","Egypt","Temperature","Lost Tech"],      premium:true },
  { id:"s25", type:"research",source:"UnchartedX",                sourceUrl:"https://www.youtube.com/@UnchartedX1",time:"1d ago", topic:"Lost Technology",               region:"Egypt", title:"Precision Stonework at the Valley Temple of Khafre: Cuts and Tolerances That Match Modern CNC Machining",  summary:"Field researcher Ben van Kerkwyk documents stone blocks at the Valley Temple displaying interior angles, surface flatness, and cut tolerances within fractions of a millimeter  -  matching modern Computer Numerical Control machining specifications that were not available until the 20th century.", upvotes:6300, comments:891,  credible:68, debunked:32, tags:["Egypt","Machining","Lost Tech","Precision"],       premium:true },
  // -- Secret Societies / Geopolitics -----------------------------------------
  { id:"s26", type:"archive", source:"Corbett Report",            sourceUrl:"https://www.corbettreport.com",     time:"1d ago",  topic:"Secret Societies",              region:"USA",  title:"The Council on Foreign Relations: 100 Years of Shaping U.S. Foreign Policy From Outside Government",        summary:"The CFR, founded in 1921, has counted virtually every U.S. Secretary of State, CIA Director, and National Security Advisor among its members. Its own publications acknowledge its role in setting the foreign policy agenda before elections determine who implements it.", upvotes:4200, comments:581,  credible:74, debunked:26, tags:["CFR","Foreign Policy","Deep State"],              premium:true },
  { id:"s27", type:"news",    source:"Consortium News",           sourceUrl:"https://consortiumnews.com",        time:"1d ago",  topic:"Geopolitics & Deep State",      region:"Global", title:"Seymour Hersh Investigation: U.S. Navy Divers Planted Explosives on Nord Stream Pipeline During NATO Exercise", summary:"Pulitzer Prize-winning journalist Seymour Hersh, citing a senior U.S. official, reported that Navy divers planted explosives on Nord Stream during a NATO exercise in June 2022. The story was entirely ignored by major U.S. outlets despite Hersh's documented track record.", upvotes:5811, comments:921,  credible:70, debunked:30, tags:["Nordstream","NATO","Sabotage","Disputed"],         premium:true },
  { id:"s28", type:"research",source:"Koinonia House",            sourceUrl:"https://www.khouse.org",             time:"2d ago",  topic:"Biblical & Religious Records",  region:"USA",  title:"Chuck Missler: The Integrity of the Genetic Bloodline  -  Why Genesis 6 Giants Were the Reason for the Flood", summary:"Biblical scholar Chuck Missler's research argues that the Nephilim corruption of the human genetic line  -  not merely moral corruption  -  was the reason God initiated the flood. He cross-references Genesis 6 with Enoch, Numbers 13, and the Dead Sea Scrolls.", upvotes:4800, comments:712,  credible:58, debunked:42, tags:["Missler","Genesis","Flood","Nephilim","Biblical"],   premium:true },
  { id:"s29", type:"research",source:"L.A. Marzulli Blog",        sourceUrl:"https://lamarzulli.net",             time:"2d ago",  topic:"Giants & Nephilim",             region:"USA",  title:"Peruvian Elongated Skulls  -  DNA Testing Shows Non-Human Mitochondrial DNA in Paracas Specimens",           summary:"DNA analysis conducted on elongated skulls from Paracas, Peru reportedly showed mitochondrial DNA with mutations unknown in any human, primate, or animal. The researcher who conducted the analysis has been unable to get results peer-reviewed through conventional journals.", upvotes:7100, comments:1204, credible:44, debunked:56, tags:["Paracas","Skulls","DNA","Giants","Peru"],           premium:true },
  { id:"s30", type:"podcast", source:"Stuff They Don't Want You to Know",sourceUrl:"https://www.iheart.com/podcast/182-stuff-they-dont-want-you-17913675/",time:"2d ago",topic:"Government & Intelligence",region:"USA",title:"COINTELPRO: The FBI's Documented Campaign to Destroy Civil Rights Leaders, Anti-War Groups, and Political Dissidents", summary:"COINTELPRO ran from 1956 to 1971. Declassified documents confirm the FBI used illegal surveillance, infiltration, fabricated evidence, and psychological warfare against the NAACP, SCLC, Black Panthers, SDS, and even the women's liberation movement.", upvotes:5400, comments:781,  credible:95, debunked:5,  tags:["COINTELPRO","FBI","Civil Rights","Declassified"],    premium:false },
  {id:"s31",type:"archive", source:"Sacred Texts Archive",      sourceUrl:"https://sacred-texts.com/ane/adapa.htm",  time:"3h ago", topic:"Ancient Civilizations",       region:"Middle East",title:"Myth of Adapa: The First Man Given Wisdom but Denied Immortality  -  Sumerian Primary Text", summary:"The Adapa myth predates Genesis by thousands of years. Enki creates Adapa as humanity's first sage and commissioner of the Anunnaki, granting him wisdom but withholding eternal life. When sky-god Anu offers Adapa the bread and water of immortality, Enki's secret instructions cause Adapa to refuse. Researchers argue this is the original template for the Garden of Eden narrative.", upvotes:4800,comments:712, credible:72,debunked:28,tags:["Adapa","Enki","Anu","Anunnaki","Genesis"],    premium:false},
  {id:"s32",type:"research",source:"ETCSL Oxford University",   sourceUrl:"https://etcsl.orinst.ox.ac.uk",           time:"4h ago", topic:"Ancient Civilizations",       region:"Global",               title:"Anki, Enlil & the Anunnaki Council: The Original Divine Hierarchy Preserved in Sumerian Cuneiform", summary:"Sumerian tablets describe An (heaven) and Ki (earth) as cosmic parents. Their son Enlil separated heaven from earth. The Anunnaki  -  the heaven-earth council of gods  -  governed fate, created humanity, and survived the flood. These texts at Oxford's ETCSL structurally parallel the divine councils in Genesis, Enoch, and the Dead Sea Scrolls.", upvotes:3900,comments:521, credible:78,debunked:22,tags:["Anki","Enlil","Anunnaki","Sumerian"],premium:false},
  {id:"s33",type:"research",source:"Ancient Origins",           sourceUrl:"https://www.ancient-origins.net",         time:"5h ago", topic:"Ancient Civilizations",       region:"Global",               title:"The Anunnaki: Sumerian Gods, Genetic Engineers, or Extraterrestrial Visitors? All Theories Examined", summary:"The Anunnaki appear in thousands of tablets as the divine assembly who created humanity from clay and divine blood. Sitchin interpreted them as aliens from Nibiru who engineered Homo sapiens. Orthodox scholars read them as the Mesopotamian pantheon. The debate spans DNA manipulation, ancient astronaut theory, and the origin of civilization.", upvotes:7200,comments:1104,credible:55,debunked:45,tags:["Anunnaki","Sitchin","DNA","Ancient Aliens"], premium:false},
  {id:"s34",type:"research",source:"Project Unredacted",        sourceUrl:"https://www.projectunredacted.com/cases/chronovisor-vatican-time-machine",time:"6h ago",topic:"Secret Societies",region:"Vatican",title:"Vatican Chronovisor: Father Ernetti's Time-Viewing Device  -  Built With Enrico Fermi, Hidden in the Archives", summary:"In 1972 Father Pellegrino Ernetti claimed he and 12 scientists including Enrico Fermi and Wernher von Braun built a device capturing electromagnetic echoes of past events. He claimed to witness Christ's crucifixion and a lost Roman play. The Vatican issued an excommunication decree against unauthorized use of such devices in 1988  -  an act researchers argue implies acknowledgment.", upvotes:6100,comments:981, credible:42,debunked:58,tags:["Chronovisor","Vatican","Time","Ernetti"],       premium:false},
  {id:"s35",type:"research",source:"Sedona Anomalies Research", sourceUrl:"https://sedonanomalies.com",              time:"7h ago", topic:"Forbidden Science",           region:"USA",                title:"Sedona Vortex Sites: Electrical Engineer Measures Magnetic Anomalies  -  EEG and Magnetometer Data", summary:"Electrical engineer Benjamin Lonetree spent a decade measuring Sedona's vortex sites using magnetometers and portable EEG devices. His research documents measurable outflows of magnetic energy correlated with human brainwave changes. The geology  -  high iron oxide sandstone, volcanic basalt with 5-20% quartz  -  may genuinely affect human consciousness.", upvotes:3400,comments:441, credible:61,debunked:39,tags:["Sedona","Electromagnetic","Vortex","Consciousness"],premium:false},
  {id:"s36",type:"research",source:"George Church Lab  -  Harvard",sourceUrl:"https://arep.med.harvard.edu",           time:"8h ago", topic:"Forbidden Science",           region:"USA",                title:"George Church (Harvard): First Book Encoded in DNA  -  70 Billion Copies. CRISPR & Synthetic Biology", summary:"Harvard geneticist George Church encoded his book Regenesis entirely in DNA  -  70 billion copies fitting on a thumbnail. His lab pioneered CRISPR gene editing, Neanderthal DNA reconstruction research, and the Personal Genome Project. He has speculated publicly about de-extincting Neanderthals and reversing aging through targeted gene therapy.", upvotes:5100,comments:721, credible:91,debunked:9, tags:["DNA","CRISPR","George Church","Synthetic Biology"],premium:false},
  {id:"s37",type:"research",source:"Bruce Lipton  -  brucelipton.com",sourceUrl:"https://www.brucelipton.com",         time:"9h ago", topic:"Forbidden Science",           region:"USA",                title:"Bruce Lipton: Epigenetics  -  Your Beliefs Change Gene Expression. DNA Is Not Your Destiny", summary:"Former Stanford cell biologist Bruce Lipton's research shows that the environment outside the cell  -  including thoughts, beliefs, and electromagnetic signals  -  controls which genes switch on or off. This directly challenges genetic determinism and suggests consciousness shapes biology at the molecular level.", upvotes:4800,comments:641, credible:74,debunked:26,tags:["Epigenetics","DNA","Lipton","Consciousness"],   premium:false},
  {id:"s38",type:"archive", source:"Vatican Apostolic Archive",  sourceUrl:"https://www.archivioapostolicovaticano.va",time:"10h ago",topic:"Biblical & Religious Records",region:"Vatican",          title:"Vatican Archives: 85 Kilometers of Shelving  -  Hidden Gospels, Galileo's Trial, Nazi Concordats, Pre-Nicaean Texts", summary:"The Vatican Apostolic Archive holds 85 kilometers of shelving. It contains Galileo's trial records, Nazi concordat documents, Henry VIII's annulment request, and thousands of inaccessible texts. Researchers believe ancient documents about the Nephilim, Mary Magdalene, and pre-canonical gospels remain sealed to the public.", upvotes:6800,comments:1021,credible:77,debunked:23,tags:["Vatican","Archives","Hidden","Gospels"],        premium:true},
  {id:"s39",type:"research",source:"Gregg Braden Official",      sourceUrl:"https://www.greggbraden.com",            time:"11h ago",topic:"Forbidden Science",           region:"USA",                title:"Gregg Braden: The God Code  -  Ancient Name Encoded in Every Human DNA Base Pair Sequence", summary:"Gregg Braden analyzed the chemical elements of DNA base pairs against ancient Hebrew letter-number values and claims the phrase meaning 'God Eternal Within the Body' is encoded in every strand of human DNA. His research bridges quantum physics, ancient scripture, and molecular biology  -  presenting DNA as cosmic message.", upvotes:5200,comments:812, credible:45,debunked:55,tags:["DNA","God Code","Braden","Frequency"],           premium:true},
  {id:"s40",type:"research",source:"Dolores Cannon Archive",     sourceUrl:"https://dolorescannon.com",              time:"12h ago",topic:"Forbidden Science",           region:"USA",                title:"Dolores Cannon QHHT: Subjects Under Deep Hypnosis Independently Describe Identical Accounts of Atlantis, DNA Modification, and Soul Origins", summary:"Over 50 years of Quantum Healing Hypnosis Technique sessions, Dolores Cannon documented subjects independently describing identical information about Atlantis, alien intervention in human DNA, and life between lives. Her 5-volume Convoluted Universe series catalogs thousands of cross-corroborating accounts that she argued cannot be explained by suggestion alone.", upvotes:4900,comments:781, credible:48,debunked:52,tags:["QHHT","Cannon","Past Lives","DNA","Atlantis"],   premium:true},
  {id:"s41",type:"research",source:"4biddenknowledge",           sourceUrl:"https://www.4biddenknowledge.com",       time:"13h ago",topic:"Ancient Civilizations",       region:"Global",               title:"Billy Carson: The Emerald Tablets of Thoth  -  15 Tablets Written by an Atlantean Priest-King 36,000 BCE", summary:"Billy Carson's analysis identifies Thoth (Hermes Trismegistus) as an Atlantean who fled to Egypt and built the Great Pyramid. The tablets describe stargates, the Halls of Amenti beneath the pyramid, zero-point energy, and consciousness as the fundamental substrate of reality. Carson cross-references with Sumerian tablets, quantum mechanics, and neuroscience.", upvotes:5800,comments:891, credible:50,debunked:50,tags:["Emerald Tablets","Thoth","Atlantis","Anunnaki"],premium:true},
  {id:"s42",type:"blog",    source:"Ancient Origins",            sourceUrl:"https://www.ancient-origins.net",       time:"14h ago",topic:"Biblical & Religious Records",region:"Global",               title:"The Gospel of Mary Magdalene: Suppressed First-Century Text Shows Her as Jesus's Closest Disciple and Primary Teacher", summary:"The Gospel of Mary Magdalene, discovered in Cairo in 1896, depicts her receiving secret teachings from Jesus about matter, sin, and the soul  -  and transmitting these to the apostles over Peter's objection. Early church scholars argue this gospel was suppressed because it positioned a woman as the primary bearer of Jesus's esoteric teachings.", upvotes:5400,comments:821, credible:71,debunked:29,tags:["Mary Magdalene","Gospel","Suppressed","Gnostic"],premium:true},
  {id:"s43",type:"research",source:"HeartMath Institute",        sourceUrl:"https://www.heartmath.org/research/",   time:"15h ago",topic:"Forbidden Science",           region:"USA",                title:"HeartMath Institute: The Heart's Electromagnetic Field Is 100x Stronger Than the Brain  -  Research Confirmed", summary:"The HeartMath Institute's research shows the heart generates an electromagnetic field 100 times stronger in amplitude than the brain's and detectable several feet from the body. Their research suggests the heart transmits emotional information to every cell and can be measured affecting others in proximity  -  a finding with implications for energy healing and consciousness studies.", upvotes:4100,comments:561, credible:78,debunked:22,tags:["HeartMath","Electromagnetic","Consciousness","Heart"],premium:true},

  // -- TICKS, VACCINES & HEALTH -----------------------------------------------
  {id:"s44",type:"research",source:"Kris Newby / BITTEN Files",  sourceUrl:"https://krisnewby.substack.com",        time:"1h ago", topic:"Health & Science",            region:"USA",                title:"BITTEN: Congress Ordered Investigation Into Whether DoD Weaponized Ticks  -  Plum Island, Fort Detrick & Lyme Disease Origins", summary:"In 2019 Congress passed an amendment ordering the DoD Inspector General to investigate whether the military weaponized ticks and other insects as bioweapons between 1950-1975 and whether any were accidentally released. Science writer Kris Newby's book BITTEN documents interviews with Willy Burgdorfer  -  who discovered the Lyme bacterium  -  and evidence linking Plum Island, just 13 miles from Lyme CT, to Cold War bioweapons tick experiments.",upvotes:6200,comments:980, credible:65,debunked:35,tags:["Lyme Disease","Ticks","Bioweapons","Plum Island"],premium:false},
  {id:"s45",type:"news",    source:"VAERS / HHS",                 sourceUrl:"https://vaers.hhs.gov",                time:"2h ago", topic:"Health & Science",            region:"USA",                title:"VAERS Database: Over 2 Million Adverse Event Reports Filed Since 1990  -  What the Data Does and Does Not Show", summary:"The Vaccine Adverse Event Reporting System, managed jointly by the FDA and CDC, has received over 2 million reports of adverse events following vaccination since 1990. Experts debate what the data reveals vs. what requires further investigation. Congress mandated VAERS through the 1986 National Childhood Vaccine Injury Act after acknowledging vaccines can cause injury.",upvotes:5800,comments:1102,credible:71,debunked:29,tags:["VAERS","Vaccines","FDA","CDC","Adverse Events"],premium:false},
  {id:"s46",type:"research",source:"Food & Environment Reporting Network",sourceUrl:"https://thefern.org",          time:"3h ago", topic:"Health & Science",            region:"USA",                title:"Lab-Grown Meat Uses Immortalized Cells  -  MIT Cancer Biologist: They Are 'Unmistakably More Like Cancer Cells'", summary:"The Food and Environment Reporting Network's investigation revealed that cultured meat companies use 'immortalized' cells  -  cells that divide indefinitely by bypassing normal biological limits. MIT cancer biologist Robert Weinberg stated these cells 'have already completed one of the prerequisites to becoming a cancer cell.' The FAO and WHO identified 53 potential hazards in cultured meat production.",upvotes:5400,comments:821, credible:72,debunked:28,tags:["Lab Meat","Fake Meat","Cancer","GMO","Food Safety"],premium:false},
  {id:"s47",type:"research",source:"Children's Health Defense",   sourceUrl:"https://childrenshealthdefense.org",    time:"4h ago", topic:"Health & Science",            region:"USA",                title:"Beyond Impossible: The Truth Behind the Fake Meat Industry  -  WEF, Harvard, and the Push to End Natural Meat", summary:"A 2024 systematic review of 45 studies and 9.8 million participants confirmed that ultra-processed food consumption is directly associated with 32 adverse health parameters. Lab-grown and fake meat are categorized as ultra-processed food. Critics argue the push toward fake meat serves financial and control agendas more than environmental or health goals.",upvotes:4900,comments:741, credible:61,debunked:39,tags:["Fake Meat","WEF","Ultra-processed","Health"],premium:false},

  // -- ANCIENT ADVANCED TECHNOLOGY -------------------------------------------
  {id:"s48",type:"research",source:"UnchartedX Field Research",   sourceUrl:"https://www.youtube.com/@UnchartedX1", time:"5h ago", topic:"Lost Technology",             region:"South America",        title:"Puma Punku: 100-Ton Stone Blocks Cut With CNC-Level Precision  -  No Metal Tools Available at the Time", summary:"Puma Punku in Bolivia features massive andesite stone blocks with cuts that modern engineers compare to CNC machining tolerances. Andesite is rated 6-7 on the Mohs hardness scale  -  harder than any copper tool available to the Tiwanaku civilization. Field researchers document drill holes of identical depth and spacing that stonemasons say they could not replicate today without diamond-tipped power tools.",upvotes:7100,comments:1102,credible:68,debunked:32,tags:["Puma Punku","Lost Tech","Ancient","CNC","Bolivia"],premium:false},
  {id:"s49",type:"research",source:"Ancient Code",                 sourceUrl:"https://www.ancient-code.com",         time:"6h ago", topic:"Lost Technology",             region:"Middle East",title:"Baalbek: The 1,200-Ton Stone of the Pregnant Woman  -  No Modern Crane Can Lift It", summary:"The quarry at Baalbek, Lebanon contains the largest known worked stones in history  -  including the Stone of the Pregnant Woman at 1,200 tons. No crane in the world today can lift a single Baalbek foundation stone. The Roman-era temple was built on top of a far older megalithic foundation whose origin and construction method remain entirely unexplained.",upvotes:6400,comments:921, credible:74,debunked:26,tags:["Baalbek","Megalithic","Lost Tech","Lebanon"],premium:false},
  {id:"s50",type:"research",source:"Graham Hancock / Ancient Apocalypse",sourceUrl:"https://grahamhancock.com",     time:"7h ago", topic:"Hidden History",              region:"Global",               title:"The Younger Dryas Impact: A Comet Strike 12,800 Years Ago Destroyed an Advanced Global Civilization", summary:"A growing body of scientific evidence  -  including nano-diamonds, platinum anomalies, and burned layers found on four continents  -  supports the Younger Dryas Impact hypothesis: that a comet strike around 12,800 BCE caused a catastrophic global event that destroyed an advanced pre-ice age civilization. This explains why megalithic sites appear globally with no developmental sequence.",upvotes:5900,comments:881, credible:62,debunked:38,tags:["Younger Dryas","Comet","Lost Civilization","Graham Hancock"],premium:false},
  {id:"s51",type:"research",source:"Ancient Origins",              sourceUrl:"https://www.ancient-origins.net",      time:"8h ago", topic:"Ancient Civilizations",       region:"Egypt",               title:"The Osireion at Abydos: Built Before the Pyramids? Massive Granite Structure Defies Official Chronology", summary:"The Osireion  -  discovered beneath the Temple of Seti I at Abydos  -  is built from massive red granite blocks in a style completely different from New Kingdom Egyptian construction. Geologist Robert Schoch and others argue the building style matches structures contemporaneous with the Great Sphinx, suggesting an origin thousands of years before Seti I. No inscriptions, no dedications  -  just massive precision stonework.",upvotes:4800,comments:712, credible:66,debunked:34,tags:["Osireion","Egypt","Abydos","Lost Tech","Schoch"],premium:true},
  {id:"s52",type:"research",source:"Randall Carlson / Kosmographia",sourceUrl:"https://randallcarlson.com",         time:"9h ago", topic:"Hidden History",              region:"Global",               title:"Sacred Geometry in Ancient Architecture: The Same Mathematical Constants Encoded Worldwide  -  Independently", summary:"Researcher Randall Carlson documents that ancient sites worldwide  -  from the Great Pyramid to Angkor Wat to Stonehenge  -  encode identical mathematical relationships: Pi, Phi (golden ratio), the precession of the equinoxes, and the dimensions of the Earth itself. The probability of this occurring by independent coincidence is astronomically small, suggesting either a common advanced source civilization or a lost mathematical tradition transmitted globally.",upvotes:5300,comments:781, credible:61,debunked:39,tags:["Sacred Geometry","Phi","Pyramid","Precession","Randall Carlson"],premium:true},

  // -- GODS, ANCIENT BEINGS & ADVANCED CIVILIZATIONS -------------------------
  {id:"s53",type:"research",source:"World History Encyclopedia",  sourceUrl:"https://www.worldhistory.org",          time:"10h ago",topic:"Ancient Civilizations",       region:"Global",               title:"The Sumerian King List: Rulers Who Reigned for Thousands of Years Before the Flood  -  Cuneiform Primary Source", summary:"The Sumerian King List, a cuneiform document discovered at Nippur, records kings who ruled for tens of thousands of years before a great flood. After the flood, lifespans drop dramatically to human-normal lengths. Researchers debate whether this records actual dynasties, mythological time, or evidence of a pre-flood civilization. It is the oldest known historical document to reference the flood narrative.",upvotes:4600,comments:621, credible:70,debunked:30,tags:["Sumerian","King List","Flood","Cuneiform","Pre-Flood"],premium:false},
  {id:"s54",type:"research",source:"Gaia / Billy Carson",          sourceUrl:"https://www.gaia.com",                 time:"11h ago",topic:"Ancient Civilizations",       region:"Global",               title:"Ancient Beings as Engineers: The Gobekli Tepe Builders Knew Astronomy, Geometry, and Built Before Agriculture Existed", summary:"New research at Gobekli Tepe confirms the 12,000-year-old site encodes star maps  -  specifically Deneb, Arcturus, and the Pleiades  -  in its pillar arrangements. The builders had sophisticated astronomical knowledge, geometric precision, and organized labor capability  -  all predating the supposed invention of agriculture by 1,000 years. This overturns the model of a linear progression from primitive to advanced.",upvotes:5700,comments:841, credible:82,debunked:18,tags:["Gobekli Tepe","Astronomy","Ancient Beings","Pre-History"],premium:false},
  {id:"s55",type:"research",source:"Sitchin Archive",              sourceUrl:"https://sitchin.com",                  time:"12h ago",topic:"Ancient Civilizations",       region:"Global",               title:"Zecharia Sitchin: The Anunnaki Genetically Engineered Homo Sapiens 250,000 Years Ago  -  Sumerian Texts Decoded", summary:"Zecharia Sitchin's translations of Sumerian texts describe the Anunnaki creating humanity through genetic engineering  -  mixing their DNA with Homo erectus  -  to produce a slave race for mining gold. The Atrahasis Epic parallels the Genesis creation and flood accounts almost word for word. Mainstream archaeologists reject Sitchin's translations; alternative researchers point to the structural parallels as too precise to dismiss.",upvotes:6800,comments:1041,credible:45,debunked:55,tags:["Anunnaki","Sitchin","Genetic Engineering","Creation","Sumerian"],premium:true},
  {id:"s56",type:"research",source:"Robert Sepehr  -  YouTube",      sourceUrl:"https://www.youtube.com/@RobertSepehr", time:"13h ago",topic:"Hidden History",              region:"Global",               title:"The Aryan Mystery: Secret Societies, Blood Types, and the Hidden History of Humanity's True Origins", summary:"Anthropologist Robert Sepehr's research examines the role of blood type distribution, genetic haplogroups, and ancient migration patterns in understanding humanity's hidden origins. He explores connections between ancient Aryan peoples, Atlantis, the Vedic traditions, and the origins of secret societies  -  arguing that mainstream history has deliberately suppressed knowledge of pre-Flood civilizations.",upvotes:4200,comments:601, credible:48,debunked:52,tags:["Aryan","Blood Type","Haplogroup","Hidden History","Sepehr"],premium:true},

  // -- COMPREHENSIVE DOLPHIN FILES --------------------------------------------
  {id:"s57",type:"archive", source:"Wikipedia / USNI Proceedings",sourceUrl:"https://en.wikipedia.org/wiki/United_States_Navy_Marine_Mammal_Program",time:"1h ago",topic:"Animal Intelligence",region:"USA",title:"US Navy Marine Mammal Program: Classified 1967-1992  -  What the Black Budget Dolphin Program Actually Did", summary:"The US Navy Marine Mammal Program (NMMP) began in 1960 studying dolphin hydrodynamics for torpedo and submarine design. By 1963 it became an active training program. In 1967 it was classified as a black budget program. Declassified only in 1992  -  but operational details remain sealed. At peak during the Reagan years: 150+ dolphins, $8M annual budget, deployed in 25 countries. Some researchers call it the Cetacean Intelligence Mission rather than its official name  -  suggesting the scope went far beyond mine detection.",upvotes:8200,comments:1401,credible:88,debunked:12,tags:["Navy","Dolphins","Classified","NMMP","Black Budget"],premium:false},

  {id:"s58",type:"research",source:"History.com / Military History",sourceUrl:"https://www.history.com/articles/navy-marine-mammal-program-history-dolphins-sea-lions",time:"2h ago",topic:"Animal Intelligence",region:"USA",title:"The 5 Operational Dolphin Teams: Mine Detection, Swimmer Killing Devices, Harbor Patrol, and What They Won't Confirm", summary:"The Navy officially acknowledges five operational dolphin teams. MK-4 and MK-7 detect tethered and bottom mines. MK-8 clears landing corridors for troop insertions. MK-6 uses dolphins for anti-swimmer harbor defense  -  the dolphin approaches from behind and bumps a device onto the diver's air tank triggering an explosive buoy alert. Unconfirmed analyst claims describe carbonic acid injection devices mounted on dolphin heads  -  fired on contact with enemy divers. The Navy has never confirmed or denied the full scope of MK-6 offensive capabilities.",upvotes:7100,comments:1102,credible:74,debunked:26,tags:["NMMP","MK6","Swimmer","Mine","Dolphins","Combat"],premium:false},

  {id:"s59",type:"archive", source:"Military Marine Mammal Wikipedia / lflank.wordpress.com",sourceUrl:"https://en.wikipedia.org/wiki/Military_marine_mammal",time:"3h ago",topic:"Animal Intelligence",region:"USA",title:"CIA Sent Scientist James Fitzgerald to Key West 1964  -  Classified Dolphin Lab and the Intelligence Program Nobody Talks About", summary:"According to declassified sources, the CIA sent scientist James Fitzgerald to Key West, Florida in 1964 to establish a classified laboratory studying dolphins. The program ran parallel to the Navy NMMP  -  with the CIA angle focused on intelligence applications rather than mine detection. The lab's full scope, findings, and what happened to its research remain classified. This is the CIA's dolphin program that almost nobody knows existed alongside the Navy's.",upvotes:6800,comments:981,credible:62,debunked:38,tags:["CIA","Dolphins","James Fitzgerald","Key West","Classified"],premium:false},

  {id:"s60",type:"research",source:"Supercluster / Vice",          sourceUrl:"https://www.supercluster.com/editorial/how-dolphins-on-lsd-shaped-the-search-for-extraterrestrial-intelligence",time:"4h ago",topic:"Animal Intelligence",region:"USA",title:"Dr. John C. Lilly: CIA-Funded, NASA-Contracted, LSD-Injecting Dolphin Researcher Who Founded the Science of Interspecies Communication", summary:"Dr. John C. Lilly  -  physician, neuroscientist, inventor of the isolation tank  -  opened the Communication Research Institute in St. Thomas in the 1960s funded by NASA and the CIA. NASA wanted a model for communicating with extraterrestrial intelligence. The CIA wanted dolphins as underwater spies. In 1964 Lilly began injecting dolphins with LSD to enhance communication  -  documented in a 1965 conference paper. Dolphin vocalizations increased dramatically. He co-founded the Order of the Dolphins with Carl Sagan. The CIA's interest in Lilly  -  through MK-Ultra era consciousness programs  -  has been confirmed in documents released decades later.",upvotes:9100,comments:1502,credible:82,debunked:18,tags:["Lilly","CIA","NASA","LSD","MK-Ultra","Dolphins","SETI"],premium:false},

  {id:"s61",type:"research",source:"VeteranLife / USNavy",          sourceUrl:"https://veteranlife.com/military-history/marine-mammal-program",time:"5h ago",topic:"Animal Intelligence",region:"Global",title:"Vietnam War 1965-1975, Persian Gulf 1986-1988, Iraq War 2003: The Combat Deployments of US Military Dolphins That History Barely Covers", summary:"Navy dolphins were operationally deployed in Vietnam from 1965-1975 guarding ammunition piers from enemy divers. In the Persian Gulf they escorted Kuwaiti oil tankers and patrolled for mines during the Iran-Iraq War 1986-1988. In 2003 during the Iraq War K-Dog and other dolphins detected and marked over 100 anti-ship mines at the port of Umm Qasr  -  clearing the way for the initial troop landings. In 1996 six dolphins patrolled San Francisco Bay to protect the Republican National Convention. The Navy acknowledges deployments in 25 countries  -  the full list remains classified.",upvotes:7400,comments:1041,credible:91,debunked:9,tags:["Navy","Dolphins","Vietnam","Iraq","Persian Gulf","Combat"],premium:false},

  {id:"s62",type:"research",source:"Historic Mysteries / Military Wiki",sourceUrl:"https://www.historicmysteries.com/history/military-marine-mammal/30639/",time:"6h ago",topic:"Animal Intelligence",region:"Global",title:"Soviet and Russian Military Dolphins: Sevastopol, Iran Sale, Arctic Bases, and Two Pens Placed at Ukraine Invasion Harbor", summary:"The Soviet Union ran a parallel dolphin program at Sevastopol, Crimea. Unlike the US program which denies offensive training, the Soviets are believed to have equipped dolphins with weapons. After the USSR collapsed the program transferred to Ukraine  -  which sold the dolphins and the chief trainer to Iran in 2000. Russia reactivated the program in 2012. After the 2014 Crimea annexation Russia took over Ukraine's remaining dolphins. When Russia invaded Ukraine in 2022, satellite imagery confirmed two dolphin pens placed at the entrance to Sevastopol harbor  -  the Black Sea's largest naval base  -  and additional pens at the secretive Arctic Olenya Guba facility.",upvotes:8600,comments:1301,credible:85,debunked:15,tags:["Russia","Soviet","Dolphins","Sevastopol","Ukraine","Military","Iran"],premium:false},

  {id:"s63",type:"research",source:"NOAA Fisheries / LegalClarity",  sourceUrl:"https://www.fisheries.noaa.gov/marine-life-distress/frequent-questions-feeding-or-harassing-marine-mammals-wild",time:"7h ago",topic:"Animal Intelligence",region:"USA",title:"Marine Mammal Protection Act: Why It Is Illegal to Touch, Feed, Chase or Attempt to Interact With Wild Dolphins  -  and Why Researchers Think the Government Knows More Than It Says", summary:"The MMPA of 1972 makes it a federal crime to 'take' any marine mammal  -  defined as harass, hunt, capture, collect, or kill, including attempts. Penalties reach $100,000 per violation and one year imprisonment. Each dolphin in a pod = a separate violation. Verbal communication is not explicitly illegal  -  but any act that disrupts behavioral patterns qualifies as Level B harassment. The law applies to US citizens anywhere on Earth including international waters. Researchers note: you cannot legally interact with wild dolphins yet the Navy does so daily under congressional exemption. The 1986 MMPA amendment granted the Pentagon the right to take dolphins from the wild for 'national defense purposes'  -  a carve-out that exists in no other wildlife law.",upvotes:7800,comments:1201,credible:96,debunked:4,tags:["MMPA","Law","Dolphins","Pentagon","National Defense","Exemption"],premium:false},

  {id:"s64",type:"research",source:"Give.do / The Print / Sonar",   sourceUrl:"https://wearesonar.org/dolphin-and-whale-nonhuman-personhood/",time:"8h ago",topic:"Animal Intelligence",region:"Global",title:"Global Dolphin Personhood: India 2013, Malibu 2014, Pacific Islands 2025  -  Governments Officially Declaring Dolphins Non-Human Persons", summary:"In 2013 India became the first nation to officially declare dolphins 'non-human persons'  -  banning all captive dolphin shows and stating it is 'morally unacceptable to keep them captive.' In 2014 Malibu's mayor passed a resolution granting dolphins and whales the right to freedom. In 2025 Pacific Island leaders granted cetaceans personhood status. The 2010 international Declaration of Rights for Cetaceans declared them persons with rights to life, freedom of movement, and not to be killed, captured, bred, or enslaved. The EU applied great ape research bans to cetaceans  -  calling them 'great apes of the water.'",upvotes:6900,comments:981,credible:90,debunked:10,tags:["Personhood","India","Dolphins","Rights","Non-Human","Global Law"],premium:false},

  {id:"s65",type:"research",source:"Wild Dolphin Project / Cambridge Declaration",sourceUrl:"https://www.wilddolphinproject.org",time:"9h ago",topic:"Animal Intelligence",region:"Global",title:"What We Actually Know About Dolphin Intelligence: Cambridge Declaration, Mirror Tests, Name Whistles, Culture, Grief  -  The Evidence Governments Don't Publicize", summary:"The 2012 Cambridge Declaration on Consciousness  -  signed in presence of Stephen Hawking  -  confirmed dolphins are conscious and self-aware. Dolphins pass the mirror self-recognition test (only humans, great apes, elephants, and magpies also pass). They choose unique name whistles before age one that are remembered 20+ years. Shark Bay Australia documents sponge tool use transmitted mother-to-daughter across three generations  -  qualifying as culture. Dr. Denise Herzing's 35-year Wild Dolphin Project documents syntax in communication, multigenerational dialect transmission, and grief  -  mothers carrying dead calves for weeks. A 2024 study confirmed dolphins imitate computer-generated sounds they have never heard.",upvotes:8400,comments:1302,credible:97,debunked:3,tags:["Consciousness","Cambridge","Mirror Test","Intelligence","Dolphins","Culture"],premium:false},

  {id:"s66",type:"research",source:"Dr. Denise Herzing / WDP",       sourceUrl:"https://www.wilddolphinproject.org/media/scientific-publications/",time:"10h ago",topic:"Animal Intelligence",region:"Global",title:"What Global Governments May Be Hiding About Dolphins: Classified Programs, Suppressed Intelligence Research, and the Question Nobody Asks", summary:"Several layers of classification surround dolphin research: (1) The CIA's 1964 Key West lab  -  full scope classified. (2) NMMP operational details  -  still classified 30+ years after the program was 'declassified.' (3) Soviet weaponization details  -  never fully disclosed. (4) Whether communication research with dolphins produced results beyond what was published  -  John Lilly's CIA-funded work never fully disclosed. (5) North Korea reportedly developing its own military dolphin program in 2024. (6) Whether the 1986 MMPA national defense exemption was used to take dolphins for intelligence  -  not just military  -  purposes. The most classified intelligence programs globally involve three things that overlap: consciousness, communication, and non-human intelligence. Dolphins are the intersection of all three.",upvotes:9800,comments:1601,credible:55,debunked:45,tags:["Classified","CIA","Dolphins","Consciousness","Hidden","Intelligence"],premium:true},

  // -- DAVID PAULIDES  -  MISSING 411 ------------------------------------------
  {id:"s78",type:"research",source:"CanAm Missing / Missing411.com",  sourceUrl:"https://www.canammissing.com",time:"1h ago",topic:"Unresolved Events",region:"USA",title:"Missing 411: David Paulides Documents 9,000+ Hours of Research Into Unexplained National Park Disappearances  -  Patterns That Defy Explanation", summary:"Former law enforcement officer David Paulides spent 9,000+ hours investigating disappearances in US National Parks after a ranger tipped him off to a disturbing pattern. His findings: victims disappear in good weather with no distress call. Bodies are found miles away in terrain search teams already covered. Clothing is missing or neatly arranged. No trail of passage. Berry bushes stripped near discovery sites. Victims are often found in or near water. The National Park Service refused his FOIA request for a list of missing persons  -  citing cost. No other government database tracks this.",upvotes:14200,comments:2102,credible:72,debunked:28,tags:["Missing 411","Paulides","National Parks","Disappearances","FOIA","Unexplained"],premium:false},

  {id:"s79",type:"research",source:"Missing411.com / CanAm",          sourceUrl:"https://missing411.com",time:"2h ago",topic:"Unresolved Events",region:"USA",title:"The Missing 411 Profile Points: 30+ Consistent Patterns Across Hundreds of Disappearances That Cannot Be Explained by Conventional Search Theory", summary:"Paulides identified 30+ profile points appearing consistently across cases: disappearances near boulder fields or granite outcroppings; victims last seen near berry patches; dogs cannot track scent; victims found in water despite not being near water when last seen; clothing found neatly folded or missing entirely; victims recovered with no memory of what happened; weather changes immediately after disappearance; discovery sites already searched multiple times. The clusters map to specific geographic zones. The NPS has never commented. Some researchers point to interdimensional portals. Others point to predatory human networks. The cases remain officially unexplained.",upvotes:12800,comments:1901,credible:65,debunked:35,tags:["Missing 411","Profile Points","National Parks","Paulides","Patterns"],premium:false},

  {id:"s80",type:"research",source:"CanAm Missing Project",            sourceUrl:"https://www.canammissing.com",time:"3h ago",topic:"Unresolved Events",region:"USA",title:"Missing 411: The Hunted  -  Experienced Hunters With Military Training Vanish in the Woods. Something Is Hunting Them Back", summary:"Paulides' 2019 documentary The Hunted focuses exclusively on experienced hunters  -  many with military backgrounds  -  who vanished in wilderness areas. These are not lost hikers. These are men with compass skills, survival training, and firearms who were in familiar territory. Several cases: hunters who called family to say they were coming home and never arrived. Shots fired with no casualty found. Weapons found but hunter gone. Paulides argues the pattern in hunter disappearances is distinct from civilian cases and suggests an active predatory intelligence.",upvotes:11400,comments:1701,credible:61,debunked:39,tags:["Missing 411","Hunters","Military","Paulides","Predator","Wilderness"],premium:false},

  // -- REMOTE VIEWING GOVERNMENT FILES ---------------------------------------
  {id:"s67",type:"archive", source:"CIA Reading Room",              sourceUrl:"https://www.cia.gov/readingroom/collection/stargate",time:"1h ago",topic:"Remote Viewing & PSI",region:"USA",title:"Project STARGATE: The CIA's $20 Million 25-Year Psychic Espionage Program  -  Now Fully Declassified", summary:"Project STARGATE was the code name for a classified US Army / DIA program established 1978 at Fort Meade, Maryland to weaponize psychic phenomena for intelligence collection against the Soviet Union. Ran for over 20 years. $20 million budget confirmed. Physicists Hal Puthoff and Russell Targ at Stanford Research Institute were the lead scientists. CIA fully declassified 12 million pages of Stargate documents in 2017. The entire archive is searchable at the CIA Reading Room. Congressman Charles Rose stated in the House Intelligence Committee: 'It seemed like a hell of a cheap radar system  -  and if the Russians have it and we don't, we're in serious trouble.'",upvotes:11200,comments:1802,credible:95,debunked:5,tags:["Stargate","CIA","Remote Viewing","Declassified","DIA","Puthoff"],premium:false},

  {id:"s68",type:"research",source:"War History Online / Decrypted Matrix",sourceUrl:"https://www.warhistoryonline.com/war-articles/project-stargate.html",time:"2h ago",topic:"Remote Viewing & PSI",region:"USA",title:"Ingo Swann: The Psychic Who Remote-Viewed Jupiter Before Pioneer-10 Got There  -  and Found a Ring Nobody Knew Existed", summary:"Ingo Swann  -  artist and psychic, co-creator of remote viewing  -  was tested at Stanford Research Institute in 1972. CIA funded his research. In 1973 Swann remote-viewed Jupiter before the Pioneer-10 flyby and described a ring around the planet. Scientists assumed he had confused it with Saturn. When Pioneer-10 reached Jupiter the ring was confirmed. Swann also remote-viewed classified Soviet facilities from coordinates alone  -  with results that convinced CIA analysts to continue funding. He later claimed to have remote-viewed extraterrestrial bases on the Moon.",upvotes:9400,comments:1401,credible:71,debunked:29,tags:["Ingo Swann","Remote Viewing","Jupiter","CIA","Pioneer","Moon"],premium:false},

  {id:"s69",type:"research",source:"Decrypted Matrix / Black Vault",  sourceUrl:"https://decryptedmatrix.com/project-stargate-cia-classified-psychic-espionage-program/",time:"3h ago",topic:"Remote Viewing & PSI",region:"USA",title:"The Remote Viewers Who Described Soviet Nuclear Submarines, Hidden Weapons, and a Secret Mars Colony from a Locked Room", summary:"Project Stargate remote viewers  -  including Pat Price (retired police commissioner), Joe McMoneagle (Army intelligence), and others  -  were given nothing but geographic coordinates and asked to describe what was there. Pat Price described a classified Soviet facility in Siberia with extraordinary accuracy in 1974. McMoneagle's readings of Soviet submarine construction were reportedly used in operational intelligence. A 1984 session described structures on Mars from 1 million years ago  -  the transcript remains in the CIA archive. The program was officially terminated in 1995, but researchers argue it went black rather than dark.",upvotes:10100,comments:1601,credible:64,debunked:36,tags:["Stargate","Remote Viewing","Soviet","Mars","Pat Price","McMoneagle"],premium:false},

  {id:"s70",type:"archive", source:"CIA Reading Room (direct PDF)",   sourceUrl:"https://www.cia.gov/readingroom/docs/CIA-RDP96-00788R001700210016-3.pdf",time:"4h ago",topic:"Remote Viewing & PSI",region:"USA",title:"CIA Gateway Process: Declassified 1983 Army Report Concludes Human Consciousness Can Leave the Body and Access Other Dimensions", summary:"A 1983 US Army Intelligence & Security Command analysis of the Monroe Institute's Gateway Experience  -  declassified and now freely downloadable from the CIA Reading Room  -  concludes that human consciousness can be separated from space-time and used to access information non-locally. The report uses physics, quantum mechanics, and holographic universe theory to explain how it works. The document was classified for 37 years. When released it went viral  -  millions read it. The Army concluded: it works, and the mechanism is rooted in physics not mysticism.",upvotes:14200,comments:2102,credible:88,debunked:12,tags:["CIA","Gateway Process","Consciousness","Monroe Institute","Declassified","OBE"],premium:false},

  {id:"s71",type:"research",source:"Black Vault / IRP.fas.org",       sourceUrl:"https://irp.fas.org/program/collect/stargate.htm",time:"5h ago",topic:"Remote Viewing & PSI",region:"USA",title:"Soviet Psychotronics: The USSR Spent 60 Million Rubles Annually on Psychic Warfare  -  Which Is Why the US Launched Stargate", summary:"The CIA launched the remote viewing program specifically because Soviet intelligence reports confirmed the USSR was spending the equivalent of $60 million annually on psychotronics  -  the weaponization of psychic phenomena. The CIA obtained a book by Canadian journalists Sheila Ostrander and Lynn Schroeder documenting Soviet PSI research and used it as justification to fund Puthoff and Targ. Both superpowers were simultaneously running classified psychic warfare programs throughout the Cold War. Neither has fully disclosed what they found.",upvotes:8800,comments:1301,credible:82,debunked:18,tags:["Soviet","Psychotronics","Cold War","CIA","Remote Viewing","USSR"],premium:false},

  // -- PORTALS, STARGATES & INTERDIMENSIONAL RESEARCH -------------------------
  {id:"s72",type:"research",source:"Academic Block / Sacred Illusion",  sourceUrl:"https://www.academicblock.com/science/fringe-science/stargates-and-portals",time:"1h ago",topic:"Portals & Stargates",region:"Global",title:"Ancient Stargates: Sumerian Gate of Anu, Egyptian Osiris Portal, Tiahuanaco Gateway of the Sun  -  Ancient Civilizations Built Physical Portal Technology", summary:"Sumerian texts describe the Gate of Anu  -  a physical structure through which gods traversed dimensions. The Egyptian Book of the Dead describes 21 gates with guardians that souls must navigate. Tiahuanaco's Gateway of the Sun in Bolivia is aligned to precise astronomical coordinates and features carvings researchers argue depict portal activation sequences. Researcher and archaeologist Dr. Heather Lynn connects these to Anunnaki technology described in Sitchin's translations. Mike Ricksecker's Portals to the Stars documents physical portal research across ancient global sites.",upvotes:7800,comments:1102,credible:48,debunked:52,tags:["Stargate","Sumerian","Egypt","Tiahuanaco","Portal","Ancient"],premium:false},

  {id:"s73",type:"research",source:"Sacred Illusion / MagellanTV",     sourceUrl:"https://www.sacredillusion.com/stargates-and-doors-to-nowhere-portals-illusions-or-entrances-to-elsewhere/",time:"2h ago",topic:"Portals & Stargates",region:"USA",title:"The Montauk Project: Classified Time Travel, Mind Control, and Interdimensional Portals at Camp Hero Air Force Station 1943-1983", summary:"The Montauk Project  -  documented in books by Preston Nichols and Peter Moon  -  alleges that Camp Hero, Montauk NY, was the site of classified government experiments in time travel, mind control, and opening interdimensional portals from the 1940s through the 1980s. The theory connects to the 1943 Philadelphia Experiment in which the USS Eldridge reportedly vanished from a Philadelphia shipyard. A psychic named Duncan Cameron reportedly opened a time portal that created a tear in space-time that researchers claim was deliberately collapsed. The site is now Camp Hero State Park. The underground facilities remain sealed.",upvotes:8200,comments:1201,credible:38,debunked:62,tags:["Montauk","Time Travel","Portal","Camp Hero","Philadelphia Experiment","Classified"],premium:false},

  {id:"s74",type:"research",source:"CERN / Israel First Substack",    sourceUrl:"https://home.cern/science/experiments/lhc",time:"3h ago",topic:"Portals & Stargates",region:"Global",title:"CERN Large Hadron Collider: Scientists Searching for 'Extra Dimensions' and Dark Matter  -  Critics Say It Already Opened Something", summary:"CERN has publicly stated that one of the goals of the Large Hadron Collider is to find evidence of extra dimensions and dark matter. In 2024 CERN activated the LHC during the solar eclipse and stated: 'What exactly we would detect would depend on the number of extra dimensions.' Critics argue this is portal research under a physics label. The LHC sits on the ancient site of St. Genis-Pouilly  -  a Roman town whose name derives from the Latin Appolliacum, built over a temple to Apollo described as a gateway to the underworld. CERN's campus features a statue of Shiva performing the Nataraja  -  the cosmic dance of creation and destruction.",upvotes:9100,comments:1502,credible:45,debunked:55,tags:["CERN","LHC","Extra Dimensions","Portal","Dark Matter","Shiva"],premium:false},

  {id:"s75",type:"research",source:"Skinwalker Ranch / George Knapp",  sourceUrl:"https://skinwalker-ranch.com",time:"4h ago",topic:"Portals & Stargates",region:"USA",title:"Skinwalker Ranch: Instrumented Scientific Research Confirms Anomalous Portal-Like Phenomena  -  DoD Funded Investigation", summary:"Skinwalker Ranch in Utah has been the subject of instrumented scientific investigation funded by the Department of Defense through the Advanced Aerospace Weapon System Applications Program (AAWSAP)  -  the same program that spawned the AATIP UAP investigation. Researchers document: UAP appearing and disappearing in specific sky locations consistently, cattle mutilation with surgical precision, poltergeist phenomena, and what instruments record as localized tears in space measuring magnetic, electromagnetic, and radiation anomalies simultaneously. Former DIA official Dr. James Lacatski led the DoD investigation. His findings remain classified.",upvotes:10400,comments:1601,credible:61,debunked:39,tags:["Skinwalker","Portal","DoD","AAWSAP","DIA","Classified","UAP"],premium:false},

  {id:"s76",type:"research",source:"Iraq Stargate / Medium",          sourceUrl:"https://medium.com/@iram.ahmed1997/the-iraqi-stargate-conspiracy-a-modern-perspective-on-an-ancient-mystery-18d3cd39ff8f",time:"5h ago",topic:"Portals & Stargates",region:"Middle East",title:"The Iraqi Stargate: Why the US Established Military Zones Around Ancient Sumerian Sites Immediately After Invasion in 2003", summary:"Researchers document that following the 2003 Iraq invasion, US forces established restricted military zones around ancient Sumerian sites including Ur, Nineveh, and Babylon  -  while the Baghdad Museum was looted of thousands of irreplaceable artifacts with no military intervention. Some claim soldiers reported time anomalies and electromagnetic disturbances near ancient sites. The theory: Sumerian tablets describe the Gate of Anu as a physical device, and the real objective of occupying Iraq was to control access to ancient portal technology buried beneath the oldest human civilization on Earth.",upvotes:8600,comments:1302,credible:35,debunked:65,tags:["Iraq","Stargate","Sumerian","2003","Artifacts","Gate of Anu"],premium:true},

  {id:"s77",type:"research",source:"Thirdi.us / Tourism and Travel",   sourceUrl:"https://thirdi.us/blog/2024/07/unlocking-the-mysteries-of-stargates-portals-to-other-dimensions-and-realms/",time:"6h ago",topic:"Portals & Stargates",region:"Global",title:"Global Portal Sites: Mount Shasta, Sedona, Stonehenge, Machu Picchu, Easter Island  -  What Instruments Detect at Each Location", summary:"Researchers have documented measurable electromagnetic anomalies at every major ancient site associated with portal or vortex activity. Mount Shasta: Native American traditions of underground cities and interdimensional beings, plus measured magnetic anomalies. Sedona: Benjamin Lonetree's decade of magnetometer data. Stonehenge: confirmed solar and lunar alignment precision beyond architectural necessity. Machu Picchu: built on geological intersection of multiple fault lines creating piezoelectric energy. Easter Island: moai aligned to specific star systems. The common thread: all are built on granite and quartz formations that generate electromagnetic fields under tectonic pressure.",upvotes:7400,comments:1101,credible:55,debunked:45,tags:["Portals","Mount Shasta","Stonehenge","Sedona","Electromagnetic","Ancient Sites"],premium:false},

  // -- ERIC WEINSTEIN & GEOMETRIC UNITY --------------------------------------
  {id:"s81",type:"research",source:"GeometricUnity.org",               sourceUrl:"https://geometricunity.org/",                time:"1h ago", topic:"Forbidden Science",        region:"USA",  title:"Geometric Unity: Eric Weinstein's Suppressed Unified Field Theory  -  Harvard Mathematician vs. The Physics Establishment", summary:"Eric Weinstein  -  Harvard PhD mathematician, former managing director of Thiel Capital  -  has spent decades developing Geometric Unity: an attempt to unify general relativity and the Standard Model by recovering the seemingly incompatible geometries of fundamental physics from a single minimal structure. Presented at Oxford in 2013, the theory was praised by Marcus du Sautoy but met institutional resistance because Weinstein refused to publish before the community was ready to evaluate it fairly. He argues the physics establishment uses gatekeeping and peer review as tools of suppression rather than validation.", upvotes:8200, comments:1201, credible:62, debunked:38, tags:["Geometric Unity","Weinstein","Physics","Suppressed","Unified Theory"], premium:false},

  {id:"s82",type:"archive",  source:"Oxford Mathematical Institute",    sourceUrl:"https://geometricunity.org/2013-oxford-lecture/",   time:"2h ago", topic:"Forbidden Science",        region:"UK",   title:"The 2013 Oxford Lecture: Eric Weinstein's Geometric Unity Presented to the Academy  -  Full Transcript Available", summary:"On May 23, 2013, Eric Weinstein presented Geometric Unity at Oxford's Martin Wood Lecture, introduced by Marcus du Sautoy who called it a potential unified theory of physics. The full video was released April 1, 2020 as a special episode of The Portal podcast. The full transcript is archived at GeometricUnity.org. Physicists David Kaplan and Jim al-Khalili expressed skepticism, largely because no equations were published alongside the talk. Weinstein has since self-published a working draft paper. The Oxford Mathematical Institute listing for the talk remains accessible.", upvotes:6400, comments:881,  credible:58, debunked:42, tags:["Oxford","Geometric Unity","Weinstein","2013","Unified Theory"], premium:false},

  {id:"s83",type:"research",source:"The Portal Group / theportal.group", sourceUrl:"https://theportal.group/",                    time:"3h ago", topic:"Forbidden Science",        region:"USA",  title:"Eric Weinstein: Scientific Gatekeeping, Institutional Corruption, and Why the Physics Establishment Suppresses Outsider Theories", summary:"Through The Portal podcast, Eric Weinstein has documented in detail how academic institutions  -  particularly physics departments  -  use funding structures, peer review capture, and credentialing requirements to systematically exclude theories from outside the approved framework. Weinstein coined the term 'Intellectual Dark Web' to describe thinkers willing to discuss ideas that institutions have declared off-limits. He argues string theory's dominance despite zero experimental verification is the defining example of how physics became a gatekept ideology rather than a science.", upvotes:9100, comments:1302, credible:71, debunked:29, tags:["Weinstein","Gatekeeping","String Theory","IDW","Institutional Corruption"], premium:false},

  {id:"s84",type:"research",source:"IBTimes / JRE #2503",               sourceUrl:"https://www.ibtimes.co.uk/eric-weinstein-government-ufo-disclosure-1798302", time:"4h ago", topic:"UAP & Anomalous",          region:"USA",  title:"Eric Weinstein: Government Secretly Recruited Him to Help Mediate UAP Disclosure  -  Credible Sources, White Sands 'Infestation', Epstein as Intelligence Operation", summary:"In 2026 Weinstein publicly stated that credible government-connected figures secretly reached out to recruit him as a disclosure mediator  -  briefing influential public figures to gradually explain UAP realities to the public. On Joe Rogan Experience #2503 (May 2026), Weinstein described multiple credible accounts of 'infestation problems' at White Sands  -  objects appearing that may be American, foreign, or genuinely unknown. He also argues the Epstein network was primarily an intelligence operation targeting America's scientific and intellectual assets  -  the sexual element was cover.", upvotes:14200, comments:2201, credible:65, debunked:35, tags:["Weinstein","UAP","Disclosure","Epstein","White Sands","Rogan"], premium:false},

  {id:"s85",type:"research",source:"The Portal Wiki / GeometricUnity.org",sourceUrl:"https://theportal.wiki/wiki/Theory_of_Geometric_Unity", time:"5h ago", topic:"Forbidden Science",        region:"USA",  title:"Geometric Unity Working Draft: The Self-Published Paper and the Theory That Challenges String Theory's Monopoly on Physics Funding", summary:"In April 2021 Weinstein self-published a working draft of Geometric Unity, labeling it 'a work of entertainment'  -  a deliberate legal and institutional shield. The paper proposes that the source code of the universe is overwhelmingly likely to be a purely geometric operating system. It challenges string theory not just scientifically but politically: Weinstein documents how string theory has consumed physics funding for 40 years while making zero testable predictions, crowding out any competing framework including his own.", upvotes:7800, comments:1041, credible:55, debunked:45, tags:["Geometric Unity","String Theory","Working Draft","Weinstein","Physics"], premium:true},

  // -- GENERAL MCCASLAND DISAPPEARANCE & UAP CONNECTED CASES -----------------
  {id:"s86",type:"news",    source:"NewsNation / CNN / Fox News",       sourceUrl:"https://www.newsnationnow.com/missing/mccasland-disappearance-national-security-concern-ufo-uap/", time:"1h ago", topic:"Unresolved Events",       region:"USA",  title:"Maj. Gen. Neil McCasland Disappears Feb. 27, 2026 - Air Force Research Lab Commander, Wright-Patterson, Tom DeLonge Consultant, UFO Secrets Holder", summary:"Retired Air Force Major General William Neil McCasland - former commander of the Air Force Research Laboratory at Wright-Patterson, former Director of Special Programs for the Under Secretary of Defense, and a consultant to Tom DeLonge's To The Stars Academy - disappeared from his Albuquerque NM home on foot on February 27, 2026, days after Trump ordered Pentagon UAP disclosure. He left his phone, glasses, and wearable devices at home. His wallet, a .38 revolver, and hiking boots are missing. The FBI joined the search. Ross Coulthart called it a grave national security crisis - McCasland held some of the most sensitive UAP secrets in US government history.", upvotes:18200, comments:2901, credible:90, debunked:10, tags:["McCasland","Air Force","UAP","Missing","Wright-Patterson","Disclosure"], premium:false},

  // OCEAN & EARTH RECORDS
  {id:"s87",type:"research",source:"NOAA Ocean Explorer",               sourceUrl:"https://oceanexplorer.noaa.gov",         time:"2h ago", topic:"Ocean & Earth",           region:"Global",title:"The Bermuda Triangle: What NOAA Actually Says - Magnetic Anomalies, Methane Hydrates, and the Official Non-Explanation", summary:"NOAA's official position is that the Bermuda Triangle does not exist as a defined region and that disappearances there are no more frequent than in other heavily traveled oceanic areas. Yet researchers document consistent magnetic compass anomalies, massive methane hydrate deposits capable of sinking ships by reducing water density, and a geological rift zone unlike anywhere else in the Atlantic. The US Navy does not officially recognize the Bermuda Triangle but maintains detailed classified charts of the region.", upvotes:6800, comments:1021, credible:61, debunked:39, tags:["Bermuda Triangle","NOAA","Magnetic","Methane","Ocean"], premium:false},
  {id:"s88",type:"research",source:"Atlantipedia / Plato Primary Source",sourceUrl:"https://atlantipedia.ie",                time:"3h ago", topic:"Ocean & Earth",           region:"Global",title:"Atlantis: Plato's Original Account, Sonar Anomalies Near the Azores, and the Richat Structure - What Researchers Are Actually Finding", summary:"Plato's Timaeus and Critias describe Atlantis as a technologically advanced naval civilization destroyed in a single day and night around 9,600 BCE by earthquakes and floods. Modern researchers have identified three candidate locations with geological evidence: the Azores plateau (seamount structures that were above water 12,000 years ago), the Richat Structure in Mauritania (a 50km circular formation matching Plato's concentric ring description), and the Caribbean basin. Sonar mapping of the Azores has revealed what some researchers describe as rectilinear structures at depth.", upvotes:7200, comments:1102, credible:52, debunked:48, tags:["Atlantis","Plato","Azores","Richat","Ocean"], premium:false},
  {id:"s89",type:"research",source:"Oceanography / Marine Geology Journal",sourceUrl:"https://oceanexplorer.noaa.gov",       time:"4h ago", topic:"Ocean & Earth",           region:"Global",title:"95% of Earth's Oceans Remain Unexplored - What Has Been Found in the Deep Includes Structures, Sounds, and Signals Science Cannot Explain", summary:"NOAA estimates 95% of Earth's oceans remain unexplored. The Bloop sound recorded in 1997 was louder than any known biological source. The Julia sound in 1999, the Train in 1994, and the Upsweep in 1991 all remain officially unexplained. In 2012 Google Ocean users identified a grid-like structure on the ocean floor off the coast of Africa spanning 2,200 square miles with lines spaced at perfect intervals. NOAA attributed it to sonar data artifacts. Independent researchers disagree.", upvotes:5900, comments:881, credible:68, debunked:32, tags:["Ocean","Unexplored","Bloop","Deep Sea","Anomalies"], premium:false},
  {id:"s90",type:"podcast", source:"Mysterious Universe Podcast",       sourceUrl:"https://mysteriousuniverse.org",         time:"5h ago", topic:"Ocean & Earth",           region:"Global",title:"The Hutchison Effect, Tesla's Earthquake Machine, and Evidence That Directed Energy Can Manipulate Earth's Geological Systems", summary:"John Hutchison's experiments documented by Canadian military researchers showed that high-frequency electromagnetic fields can cause levitation, metal fusion, and strange material anomalies. Nikola Tesla claimed his mechanical oscillator created resonance vibrations that began shaking the neighborhood around his New York lab in 1898 - and that a larger version could split the Earth in two. Researchers connecting HAARP, directed energy weapons, and unusual earthquake patterns argue governments have had the ability to manipulate geological systems for decades.", upvotes:4800, comments:721, credible:41, debunked:59, tags:["Hutchison","Tesla","HAARP","Earthquake","Earth Energy"], premium:false},

  // UAP & ALIEN RECORDS
  {id:"s91", type:"archive",  source:"The Debrief / NewsNation",           sourceUrl:"https://thedebrief.org/intelligence-officials-say-u-s-has-retrieved-non-human-craft/",          time:"1h ago",  topic:"UAP & Anomalous",  region:"USA",    title:"David Grusch Under Oath: US Government Has Retrieved Non-Human Craft and Biologics - Congressional Testimony 2023", summary:"Former intelligence officer David Grusch testified under oath before Congress in July 2023 that the US government has operated a multi-decade UAP crash retrieval and reverse-engineering program hidden from Congressional oversight. Grusch stated he was denied access to the program despite his clearance level. He described the existence of non-human biologics. His original story was broken by Leslie Kean and Ralph Blumenthal at The Debrief. Multiple corroborating witnesses followed.", upvotes:28400, comments:4201, credible:78, debunked:22, tags:["Grusch","Congress","Non-Human","Crash Retrieval","Whistleblower"], premium:false},

  {id:"s92", type:"news",     source:"New York Times",                     sourceUrl:"https://www.nytimes.com/2017/12/16/us/politics/unidentified-aerial-phenomena.html",               time:"2h ago",  topic:"UAP & Anomalous",  region:"USA",    title:"NY Times Breaks AATIP: Pentagon Ran Secret $22 Million UFO Program for Years - The Article That Changed Everything", summary:"On December 16, 2017 the New York Times published what became the most consequential UFO article in history: the existence of the Advanced Aerospace Threat Identification Program (AATIP), a classified Pentagon program studying UAP. The article included the Tic Tac video, testimony from Navy pilots, and confirmation from the Department of Defense. It triggered Congressional hearings, led to the formation of AARO, and fundamentally changed the public and institutional conversation about UAP.", upvotes:24800, comments:3601, credible:97, debunked:3, tags:["AATIP","Pentagon","NYT","AATIP","Elizondo","Tic Tac"], premium:false},

  {id:"s93", type:"archive",  source:"CIA FOIA Reading Room",              sourceUrl:"https://www.cia.gov/readingroom/collection/ufos-fact-or-fiction",                               time:"3h ago",  topic:"UAP & Anomalous",  region:"USA",    title:"CIA Declassified: 700+ UFO Documents Released - Flying Saucers, Robertson Panel, and What the CIA Actually Knew Since 1947", summary:"The CIA has declassified over 700 UFO-related documents now freely searchable at the CIA FOIA Reading Room. Key files include the 1953 Robertson Panel which recommended debunking UFO reports to reduce public interest, internal CIA analyses of foreign UFO sightings, and Gerald Haines 1997 study confirming the CIA actively concealed UFO data in the 1950s-60s. The NSA has separately declassified its own UFO document collection.", upvotes:16200, comments:2401, credible:95, debunked:5, tags:["CIA","FOIA","Declassified","Robertson Panel","UFO"], premium:false},

  {id:"s94", type:"research", source:"AARO / Pentagon",                    sourceUrl:"https://www.aaro.mil/Portals/136/PDFs/AARO_Historical_Record_Report_Vol_1_2024.pdf",            time:"4h ago",  topic:"UAP & Anomalous",  region:"USA",    title:"Pentagon AARO Report 2024: 21 True Anomalies Identified - Objects Demonstrating Physics-Defying Capabilities Cannot Be Explained", summary:"The Pentagon's All-domain Anomaly Resolution Office 2024 Historical Record Report Vol.1 confirmed 21 cases classified as true anomalies - UAP demonstrating characteristics including hypersonic speeds without sonic booms, instantaneous acceleration, transmedium travel, and anti-gravity effects that current physics cannot explain. The report simultaneously claimed no evidence of extraterrestrial origin while acknowledging the phenomena are real and unknown. Critics note the contradiction. The full PDF is free on AARO.mil.", upvotes:19600, comments:2801, credible:88, debunked:12, tags:["AARO","Pentagon","Anomalies","2024","Physics","UAP"], premium:false},

  {id:"s95", type:"news",     source:"NewsNation / Ross Coulthart",        sourceUrl:"https://www.newsnationnow.com/space/ufo/ufo-videos-second-files-coulthart-loeb-elizondo/",      time:"5h ago",  topic:"UAP & Anomalous",  region:"USA",    title:"Trump Releases Second Tranche of UAP Files May 2026 - Dozens of Military Videos of Objects Defying Conventional Mechanics", summary:"In May 2026 the Trump administration released its second tranche of UAP declassified documents including several military videos of moving objects that appear to defy conventional mechanics. Luis Elizondo called it a treasure trove of data. Ross Coulthart stated the videos show we are not the apex predator anymore. The release followed Trump's executive order to declassify UAP information within government agencies and came alongside ongoing Congressional pressure through the House UAP subcommittee.", upvotes:22100, comments:3201, credible:85, debunked:15, tags:["Trump","Disclosure","2026","Military","Video","UAP"], premium:false},

  {id:"s96", type:"research", source:"NASA UAP Study",                     sourceUrl:"https://science.nasa.gov/uap",                                                                   time:"6h ago",  topic:"UAP & Anomalous",  region:"USA",    title:"NASA's Official UAP Study 2023: Data Collection Is Insufficient But the Phenomena Are Real and Deserve Scientific Study", summary:"NASA's first-ever independent UAP study team released its report in September 2023 concluding that UAP are a serious scientific question deserving rigorous investigation. The 33-member panel stated current data is insufficient to make definitive conclusions but the phenomena are real. NASA appointed its first Director of UAP Research. The report identified the need for new satellite and sensor infrastructure specifically designed to capture UAP data, and called for destigmatizing reporting within the scientific community.", upvotes:14200, comments:2001, credible:92, debunked:8, tags:["NASA","UAP","Science","2023","Official","Study"], premium:false},

  {id:"s97", type:"archive",  source:"Project Blue Book / NARA",           sourceUrl:"https://www.fold3.com/title/44/project-blue-book",                                               time:"7h ago",  topic:"UAP & Anomalous",  region:"USA",    title:"Project Blue Book Declassified: 130,000 Pages - 12,618 UFO Cases Including 701 That Remain Officially Unexplained", summary:"The US Air Force's Project Blue Book investigated 12,618 UFO sightings between 1952-1969. Of those, 701 cases - 5.5% - were classified as unknown and remain officially unexplained to this day. All 130,000 pages are now freely available at Fold3. Among the unexplained: the 1952 Washington DC UFO flap where objects flew over the White House and Capitol, tracked on radar simultaneously by multiple stations. The Project ended under pressure but critics argue it was a debunking operation not a genuine investigation.", upvotes:17800, comments:2601, credible:90, debunked:10, tags:["Blue Book","USAF","Declassified","1952","Washington DC","Unknown"], premium:false},

  {id:"s98", type:"research", source:"Bob Lazar / George Knapp",           sourceUrl:"https://boblazar.com",                                                                           time:"8h ago",  topic:"UAP & Anomalous",  region:"USA",    title:"Bob Lazar 1989: I Worked Reverse-Engineering Alien Craft at S-4 Near Area 51 - His Records Were Erased, His Claims Remain Unrefuted", summary:"In 1989 physicist Bob Lazar went public with George Knapp on Las Vegas TV claiming he worked at a classified facility called S-4 near Groom Lake, reverse-engineering nine extraterrestrial craft for the US government. He described a propulsion system using Element 115 - which did not appear on the periodic table until 2003 when it was confirmed and named Moscovium. His government employment records were erased. His story has never been officially refuted. Jeremy Corbell's 2018 documentary brought his story to new audiences.", upvotes:21300, comments:3101, credible:61, debunked:39, tags:["Bob Lazar","Area 51","S-4","Element 115","Reverse Engineering","Knapp"], premium:false},

  {id:"s99", type:"research", source:"US Navy / Pentagon",                  sourceUrl:"https://www.newsnationnow.com/space/ufo/watch-full-interview-with-ufo-whistleblower-david-grusch/", time:"9h ago", topic:"UAP & Anomalous",  region:"USA",    title:"The Tic Tac Incident 2004: Navy Pilots Encountered a 40-Foot White Object With No Wings, Exhaust, or Explanation - Still Unexplained", summary:"In November 2004 USS Nimitz battle group radar tracked a UAP for two weeks before F-18 pilot Commander David Fravor was sent to investigate. He encountered a white Tic Tac-shaped object approximately 40 feet long with no wings, no exhaust, no visible propulsion that mirrored his aircraft movements before accelerating instantly to a predetermined rendezvous point 60 miles away. A second flight crew filmed it. The footage was classified and later leaked. The Pentagon officially confirmed its authenticity in 2020.", upvotes:26700, comments:3901, credible:95, debunked:5, tags:["Tic Tac","Nimitz","Fravor","Navy","2004","UAP"], premium:false},

  {id:"s100",type:"news",     source:"NewsNation / AARO",                   sourceUrl:"https://www.aaro.mil",                                                                           time:"10h ago", topic:"UAP & Anomalous",  region:"USA",    title:"The UAP Disclosure Act: Congress Mandates Declassification of All UAP Records - What Was Released and What Is Still Hidden", summary:"The UAP Disclosure Act of 2023 - modeled on the JFK Records Act - required federal agencies to identify, organize, and transmit UAP records to the National Archives. NARA established a public UAP Records Collection. However critics including Senator Chuck Schumer argued the final version was weakened under industry lobbying pressure, removing key provisions that would have forced disclosure of retrieved craft and materials. The battle between Congressional disclosure advocates and executive branch resistance continues as of 2026.", upvotes:18900, comments:2701, credible:88, debunked:12, tags:["Disclosure Act","Congress","NARA","Schumer","UAP","2023"], premium:false},

  {id:"s101",type:"research", source:"MUFON / Galileo Project",             sourceUrl:"https://galileo.hsites.harvard.edu/",                                                            time:"11h ago", topic:"UAP & Anomalous",  region:"Global", title:"Harvard Galileo Project: First Systematic Scientific Search for Alien Technology Near Earth - What They Have Found So Far", summary:"Harvard astrophysicist Dr. Avi Loeb launched the Galileo Project in 2021 as the first systematic scientific program specifically designed to search for extraterrestrial technology. The project has deployed sensor arrays, collected data on UAP, and is analyzing recovered material from ocean floor anomalies. Loeb argues the scientific community has engaged in extraordinary self-censorship on this topic and that the evidence warrants serious investigation. The project has published peer-reviewed papers in the Journal of Astronomical Instrumentation.", upvotes:15600, comments:2201, credible:82, debunked:18, tags:["Galileo","Loeb","Harvard","Scientific","UAP","Extraterrestrial"], premium:false},

  {id:"s102",type:"research", source:"Dr. Steven Greer / Disclosure Project",sourceUrl:"https://siriusdisclosure.com",                                                                 time:"12h ago", topic:"UAP & Anomalous",  region:"USA",    title:"The Disclosure Project 2001: 500 Military, Government and Intelligence Witnesses Testify Under Oath About UFO Cover-Up", summary:"On May 9, 2001 Dr. Steven Greer held a press conference at the National Press Club in Washington DC featuring 20 of over 500 military, government, and intelligence witnesses willing to testify under oath before Congress about UFOs and extraterrestrial contact. Witnesses included FAA Division Chief John Callahan who described a 1986 UAP incident over Alaska, multiple radar operators, pilots, and intelligence officials. Greer argues advanced energy technology captured from UAP is being suppressed for economic reasons.", upvotes:17400, comments:2501, credible:58, debunked:42, tags:["Greer","Disclosure Project","National Press Club","2001","Witnesses","Cover-up"], premium:false},

  {id:"s103",type:"research", source:"CEFAA / GEIPAN / UK MoD",            sourceUrl:"https://www.dgac.gob.cl/la-dgac/organismos/cefaa/",                                                                       time:"13h ago", topic:"UAP & Anomalous",  region:"Global", title:"Foreign Governments Are Ahead of the US on UAP Disclosure: Chile, France, UK Have Released Official Files - What They Show", summary:"While the US dragged its feet for decades, several foreign governments established official UAP investigation bodies and released their files. Chile's CEFAA has investigated UAP since 1997 and released compelling military videos. France's GEIPAN has maintained official UAP records since 1977 and has a searchable public database. The UK Ministry of Defence released 52,000 pages of UFO files between 2008-2013. Brazil's Air Force officially opened its UAP files in 2022. These international disclosures collectively undermine any claim that UAP is purely a fringe topic.", upvotes:13800, comments:1901, credible:88, debunked:12, tags:["CEFAA","GEIPAN","Chile","France","UK","International","Disclosure"], premium:false},

  {id:"s104",type:"archive",  source:"Congress.gov / Senate Intelligence",  sourceUrl:"https://www.intelligence.senate.gov/topics/uap-ufo",                                            time:"14h ago", topic:"UAP & Anomalous",  region:"USA",    title:"Congressional UAP Hearings: From Ridiculed to Required Reporting - The Legislative History of US Government UAP Acknowledgment", summary:"The legislative history of US government UAP acknowledgment spans decades of ridicule to mandatory reporting. Key milestones: 2020 Senate Intelligence Committee UAP provision requiring annual classified briefings, 2022 NDAA establishing AARO, 2023 UAP Disclosure Act, 2024 NDAA requiring NARA UAP records collection, July 2023 House Oversight hearing with Grusch, Fravor, and Graves, and 2025 House UAP subcommittee with multiple classified briefings. Senators Marco Rubio and Kirsten Gillibrand and Representatives Tim Burchett and Anna Paulina Luna have been consistent advocates.", upvotes:12900, comments:1801, credible:92, debunked:8, tags:["Congress","Senate","Rubio","Gillibrand","Burchett","UAP","Legislation"], premium:false},

  {id:"s105",type:"research", source:"To The Stars Academy / DeLonge",     sourceUrl:"https://www.tothestarsacademy.com",                                                              time:"15h ago", topic:"UAP & Anomalous",  region:"USA",    title:"To The Stars Academy: How Blink-182's Tom DeLonge United Rock Music and the Pentagon to Break the UAP Story Wide Open", summary:"In 2017 Tom DeLonge founded To The Stars Academy of Arts and Science, bringing together former Deputy Assistant Secretary of Defense Christopher Mellon, former AATIP director Luis Elizondo, former CIA Deputy Director for Science and Technology Norm Augustin, and other senior officials. The organization was directly responsible for getting the Tic Tac, GIMBAL, and GOFAST videos released. The DoD signed a research agreement with TTSA. Critics question the organization's financial structure and DeLonge's role but its impact on disclosure is undeniable.", upvotes:16800, comments:2401, credible:72, debunked:28, tags:["TTSA","DeLonge","Mellon","Elizondo","Tic Tac","Disclosure"], premium:false},

  {id:"s106",type:"news",     source:"NY Times / Washington Post / CNN",    sourceUrl:"https://www.nytimes.com/2023/07/26/us/politics/ufo-hearing-congress.html",                      time:"16h ago", topic:"UAP & Anomalous",  region:"USA",    title:"The Alien Body Claims: Grusch Testified Non-Human Biologics Were Found - Ryan Graves Says Pilots Fear Career Destruction for Reporting", summary:"During the July 2023 Congressional hearing, David Grusch stated under oath that non-human biologics were recovered alongside non-human craft. Ryan Graves - executive director of Americans for Safe Aerospace - testified that commercial and military pilots encounter UAP regularly but do not report them for fear of career consequences. Graves described UAP in restricted US airspace as a daily occurrence not an rare event. The hearing was historic in bringing the topic into mainstream Congressional discourse with unprecedented witness credibility.", upvotes:23400, comments:3401, credible:75, debunked:25, tags:["Biologics","Non-Human","Graves","Pilots","Reporting","Congress"], premium:false},

  {id:"s107",type:"research", source:"NUFORC / MUFON",                      sourceUrl:"https://nuforc.org",                                                                             time:"17h ago", topic:"UAP & Anomalous",  region:"Global", title:"150,000+ Civilian UAP Reports Filed - Patterns Across Decades Show Consistent Characteristics That Defy Conventional Explanation", summary:"The National UFO Reporting Center has logged over 150,000 reports since 1974. MUFON has investigated over 70,000 cases since 1969. Pattern analysis across these reports reveals consistent characteristics: silent operation, rapid acceleration, shape-shifting, transmedium movement between air and water, proximity to nuclear facilities, and electromagnetic interference with aircraft and vehicle systems. The 1952 Washington DC flap remains the largest mass UAP sighting on record, tracked on radar and witnessed by hundreds of civilians.", upvotes:14700, comments:2101, credible:65, debunked:35, tags:["NUFORC","MUFON","Reports","Patterns","150000","Civilian"], premium:false},

  {id:"s108",type:"research", source:"Skinwalker Ranch / AAWSAP",           sourceUrl:"https://skinwalker-ranch.com",                                                                   time:"18h ago", topic:"UAP & Anomalous",  region:"USA",    title:"Skinwalker Ranch: The DoD-Funded Investigation Into a Property Where Physics Breaks Down - UAP, Poltergeist, Cattle Mutilation and More", summary:"The Department of Defense funded the Advanced Aerospace Weapon System Applications Program (AAWSAP) - a $22 million program run by defense contractor BAASS - which focused significant investigation on Skinwalker Ranch in Utah. Former DIA official Dr. James Lacatski led the investigation and his team documented UAP appearing and disappearing at specific coordinates, cattle mutilation with surgical precision, poltergeist phenomena, and electromagnetic anomalies. AAWSAP evolved into AATIP. The classified findings have not been fully released.", upvotes:18300, comments:2601, credible:62, debunked:38, tags:["Skinwalker","AAWSAP","DoD","BAASS","Lacatski","UAP"], premium:false},

  {id:"s109",type:"research", source:"SETI / Galileo Project / Breakthrough",sourceUrl:"https://www.seti.org",                                                                          time:"19h ago", topic:"UAP & Anomalous",  region:"Global", title:"Are We Alone? SETI, the Drake Equation, and Why Scientists Who Spent Careers Searching for ET Are Now Taking UAP Seriously", summary:"The scientific establishment's attitude toward extraterrestrial intelligence has shifted dramatically since 2017. SETI researchers who spent decades searching the cosmos are now engaging with UAP data. The Drake Equation suggests millions of potential civilizations exist. The Fermi Paradox asks why we have not detected them. The UAP phenomenon offers a third possibility: they are already here and have been for some time. Dr. Avi Loeb argues Oumuamua the interstellar object may have been artificial. Breakthrough Listen has allocated telescope time to UAP research.", upvotes:16100, comments:2301, credible:71, debunked:29, tags:["SETI","Drake Equation","Fermi Paradox","Extraterrestrial","Loeb","Oumuamua"], premium:false},

  {id:"s110",type:"archive",  source:"FBI Vault / NSA FOIA",                sourceUrl:"https://vault.fbi.gov/UFO",                                                                     time:"20h ago", topic:"UAP & Anomalous",  region:"USA",    title:"FBI Vault UFO Files: Crashed Disc Reports, Roswell Documents, and the Hottel Memo That Described Three Recovered Saucers", summary:"The FBI Vault has released thousands of pages of UFO-related files. Among the most discussed: the 1950 Guy Hottel memo describing an FBI informant reporting that three flying saucers and three bodies of human shape but only 3 feet tall were recovered in New Mexico. The FBI states the memo was unverified. Roswell-era documents are also available. The Vault includes correspondence between J. Edgar Hoover and the Army Air Force about UFO secrecy. The NSA has separately released its UFO files including signals intelligence analyses.", upvotes:20400, comments:2901, credible:70, debunked:30, tags:["FBI","Vault","Hottel","Roswell","Bodies","NSA","Declassified"], premium:false},


  {id:"s111",type:"research", source:"Britannica / History.com",            sourceUrl:"https://www.britannica.com/topic/UFO",                                                           time:"21h ago", topic:"Aliens & Extraterrestrial", region:"Global", title:"The Case for Alien Life: Fermi Paradox, Drake Equation, and Why Scientists Now Believe Extraterrestrial Intelligence Almost Certainly Exists", summary:"The Drake Equation estimates between 1,000 and millions of communicating civilizations should exist in the Milky Way alone. The Fermi Paradox asks why we have not detected them. Modern answers include: civilizations destroy themselves, they communicate in ways we cannot detect, or they are already here and interacting with us. With 300 billion stars in our galaxy and confirmed exoplanets in habitable zones, the mathematical probability of Earth being the only intelligent life is effectively zero. The question has shifted from whether to how.", upvotes:18900, comments:2801, credible:88, debunked:12, tags:["Fermi Paradox","Drake Equation","Extraterrestrial","Life","Galaxy","Math"], premium:false},

  {id:"s112",type:"research", source:"SETI Institute / NASA Exoplanets",   sourceUrl:"https://www.seti.org",                                                                           time:"22h ago", topic:"Aliens & Extraterrestrial", region:"Global", title:"Exoplanet Revolution: NASA Has Confirmed 5,500+ Planets - Dozens in Habitable Zones With Conditions for Life as We Know It", summary:"NASA's Kepler and TESS missions have confirmed over 5,500 exoplanets with thousands more candidates. Scientists have identified dozens of planets in habitable zones with liquid water potential. The James Webb Space Telescope has detected chemical signatures in exoplanet atmospheres consistent with biological processes. The 2024 discovery of K2-18b atmospheric data showed possible signatures of dimethyl sulfide - a chemical produced only by living organisms on Earth. The search for technosignatures has expanded to include radio signals, laser pulses, and megastructure detection.", upvotes:16400, comments:2301, credible:92, debunked:8, tags:["Exoplanets","NASA","JWST","Habitable","Life","SETI","Biosignatures"], premium:false},

  {id:"s113",type:"research", source:"Dr. Jacques Vallee / Jacques Vallee", sourceUrl:"https://www.jacquesvallee.net",                                                                  time:"23h ago", topic:"Aliens & Extraterrestrial", region:"Global", title:"Jacques Vallee: UFOs Are Not Extraterrestrial Spacecraft - They Are Interdimensional Control Systems That Have Been Here for Centuries", summary:"Computer scientist and astronomer Dr. Jacques Vallee - who inspired the character Lacombe in Close Encounters of the Third Kind and was the first researcher to computerize the US Defense Department's ARPA network - argues the extraterrestrial hypothesis is wrong. His interdimensional hypothesis posits UAP are a control system that has interacted with human consciousness for thousands of years, manifesting in ways that match the beliefs of each era. The same phenomenon appeared as angels and demons before spacecraft. Vallee's research has influenced both the scientific establishment and classified government programs.", upvotes:14700, comments:2101, credible:72, debunked:28, tags:["Vallee","Interdimensional","Control System","Consciousness","ETH","Close Encounters"], premium:false},


// ALIENS & EXTRATERRESTRIAL - EXPANDED RECORDS
  {id:"s114",type:"archive",  source:"CIA / NSA / FBI FOIA",                sourceUrl:"https://www.cia.gov/readingroom/collection/ufos-fact-or-fiction",                               time:"24h ago", topic:"Aliens & Extraterrestrial", region:"USA",    title:"Roswell 1947: The Incident That Started Everything - Declassified Army, FBI and CIA Files on the Crashed Disc Recovery", summary:"On July 8 1947 the Roswell Army Air Field public information officer issued a press release stating the Army had recovered a flying disc. Within hours the story was retracted and changed to a weather balloon. Declassified documents show FBI Director J. Edgar Hoover was furious about being cut out of the recovery. The FBI Vault contains memos referencing recovered disc and bodies. In 1994 the Air Force admitted it was not a weather balloon but Project Mogul. Witnesses including Major Jesse Marcel maintained until death that the material was not of terrestrial origin.", upvotes:31200, comments:4801, credible:72, debunked:28, tags:["Roswell","1947","Army","FBI","Crash","Recovery"], premium:false},

  {id:"s115",type:"research", source:"Harvard University / Avi Loeb",        sourceUrl:"https://avi-loeb.medium.com/",                                                                  time:"25h ago", topic:"Aliens & Extraterrestrial", region:"Global", title:"Oumuamua: Harvard Astronomer Avi Loeb Says First Interstellar Object Was Likely Alien Technological Artifact", summary:"In 2017 astronomers detected Oumuamua - the first interstellar object ever observed passing through our solar system. Its behavior defied conventional explanation: it accelerated away from the sun without visible outgassing, had an extreme aspect ratio unlike any known natural object, and tumbled in an unusual way. Harvard astronomer Dr. Avi Loeb calculated that solar radiation pressure alone could not explain the acceleration and publicly proposed it may have been a light sail - a technological artifact from another civilization. The paper was published in Astrophysical Journal Letters.", upvotes:19400, comments:2801, credible:71, debunked:29, tags:["Oumuamua","Loeb","Harvard","Interstellar","Artifact","Light Sail"], premium:false},

  {id:"s116",type:"research", source:"US Air Force / Project Blue Book",     sourceUrl:"https://www.fold3.com/title/44/project-blue-book",                                               time:"26h ago", topic:"Aliens & Extraterrestrial", region:"USA",    title:"The 1952 Washington DC UFO Flap: Objects Flew Over the White House and Capitol - Tracked on Radar, Witnessed by Hundreds, Never Explained", summary:"During July 1952 multiple UFOs were tracked on radar over Washington DC on successive weekends including directly over the White House and Capitol building. The sightings were confirmed by radar at Washington National Airport, Andrews Air Force Base, and Bolling Air Force Base simultaneously. Jet interceptors were scrambled but the objects repeatedly outmaneuvered them. A mass press conference was held at the Pentagon - the largest since World War 2. Project Blue Book listed the case as unexplained. The incident led directly to the CIA Robertson Panel and a policy of active UFO debunking.", upvotes:22600, comments:3301, credible:88, debunked:12, tags:["Washington DC","1952","Radar","White House","Capitol","Blue Book"], premium:false},

  {id:"s117",type:"news",     source:"The Guardian / BBC / Reuters",         sourceUrl:"https://www.theguardian.com/world/ufo",                                                          time:"27h ago", topic:"Aliens & Extraterrestrial", region:"Global", title:"International Governments Confirm UFO Programs: Brazil, Chile, France, UK, Peru - What Each Has Officially Released", summary:"Multiple foreign governments have established official UAP investigation bodies and released classified files. France GEIPAN has maintained public UAP records since 1977 with a searchable database of 3000+ cases. UK Ministry of Defence released 52000 pages of UFO files 2008-2013. Brazil Air Force officially opened UAP files in 2022. Chile CEFAA military agency has released compelling video evidence. Peru established its DIFAA office in 2013. Argentina, Uruguay, Ecuador and Belgium have all disclosed UAP programs. The US was behind most of these nations by decades.", upvotes:16800, comments:2401, credible:90, debunked:10, tags:["International","France","Brazil","Chile","UK","Disclosure","GEIPAN"], premium:false},

  {id:"s118",type:"research", source:"University of Colorado / Condon Report", sourceUrl:"https://files.ncas.org/condon/",                                                              time:"28h ago", topic:"Aliens & Extraterrestrial", region:"USA",    title:"The Condon Report 1969: The Study Commissioned to Close UFO Investigation - But 30% of Cases Remain Unexplained", summary:"In 1966 the US Air Force contracted the University of Colorado to conduct a scientific study of UFOs under Dr. Edward Condon. The 1969 report recommended ending Project Blue Book and stated UFOs offered nothing of scientific value. However the report itself contained 30% unexplained cases and several committee members including Dr. David Saunders accused Condon of starting with conclusions and working backward. The full Condon Report is available free online at NCAS and reveals the gap between its conclusions and its actual case analyses. Dr. J. Allen Hynek called the study scientifically flawed.", upvotes:13400, comments:1901, credible:82, debunked:18, tags:["Condon Report","Air Force","Hynek","Colorado","Blue Book","1969"], premium:false},

  {id:"s119",type:"research", source:"Nick Pope / UK Ministry of Defence",   sourceUrl:"https://nickpope.net",                                                                          time:"29h ago", topic:"Aliens & Extraterrestrial", region:"UK",     title:"Nick Pope: I Was the UK Government's UFO Investigator for 3 Years - Here Is What I Found and What Was Concealed", summary:"Nick Pope worked for the UK Ministry of Defence from 1985-2006 and ran the UFO desk from 1991-1994. He investigated over 200 UFO cases per year including the Rendlesham Forest incident - often called Britain's Roswell. Pope began as a skeptic and left as a believer that some UFOs represent genuinely unknown craft of possibly non-human origin. He has stated the MoD actively concealed evidence from Parliament and the public. The UK released 52000 pages of UFO files between 2008-2013 but Pope argues key files were withheld or destroyed.", upvotes:17900, comments:2601, credible:80, debunked:20, tags:["Nick Pope","UK MoD","Rendlesham","Ministry of Defence","Britain","Concealed"], premium:false},

  {id:"s120",type:"research", source:"Whitley Strieber / Communion Foundation", sourceUrl:"https://www.unknowncountry.com",                                                            time:"30h ago", topic:"Aliens & Extraterrestrial", region:"USA",    title:"Communion 1987: Whitley Strieber's Account of Repeated Alien Contact Became a Bestseller - Hypnotic Regression Revealed Lifetime of Encounters", summary:"Author Whitley Strieber's 1987 book Communion described his terrifying experiences with non-human beings he called the visitors who subjected him to what appeared to be medical examinations. The book sold millions of copies worldwide. Under hypnotic regression conducted by Dr. Donald Klein at Columbia University Strieber recalled dozens of encounters spanning his lifetime. His Unknown Country website has maintained one of the longest-running archives of experiencer accounts. Neurological testing showed no evidence of pathology. His case remains one of the most thoroughly documented in alien contact research.", upvotes:18700, comments:2701, credible:62, debunked:38, tags:["Strieber","Communion","Visitors","Hypnosis","Contact","Experiencer"], premium:false},

  {id:"s121",type:"research", source:"Travis Walton / MUFON",                 sourceUrl:"https://traviswalton.net",                                                                     time:"31h ago", topic:"Aliens & Extraterrestrial", region:"USA",    title:"Travis Walton 1975: Abducted for 5 Days in Apache-Sitgreaves National Forest - Six Witnesses Passed Polygraph Tests", summary:"On November 5 1975 Travis Walton was working with a logging crew in Arizona when they encountered a hovering disc-shaped object. Walton approached and was struck by a beam of light. He disappeared for 5 days. Six crew members reported the incident to police and all passed polygraph tests. When Walton reappeared he had no memory of the missing time. Under hypnosis he described being examined by small beings aboard a craft and encountering taller human-looking figures. His case was investigated by MUFON and has been corroborated by witnesses for 50 years. The film Fire in the Sky was based on the incident.", upvotes:24300, comments:3501, credible:70, debunked:30, tags:["Travis Walton","1975","Abduction","Polygraph","Arizona","Fire in the Sky"], premium:false},

  {id:"s122",type:"research", source:"SETI / Carl Sagan / Frank Drake",       sourceUrl:"https://www.seti.org",                                                                         time:"32h ago", topic:"Aliens & Extraterrestrial", region:"Global", title:"The WOW Signal 1977: The Best Candidate for Alien Radio Contact in History - Never Explained, Never Repeated", summary:"On August 15 1977 astronomer Jerry Ehman detected a radio signal at Ohio State University Big Ear radio telescope that matched the predicted characteristics of an extraterrestrial signal so precisely he wrote WOW in the margins of the printout. The signal lasted 72 seconds - the maximum observing window of the telescope. It was broadcast on the hydrogen line frequency. It has never been detected again despite hundreds of attempts. No natural explanation has ever been confirmed. In 2012 the Arecibo Observatory beamed a response toward its origin coordinates. The WOW signal remains the strongest candidate for alien radio contact in the history of SETI.", upvotes:27800, comments:4001, credible:85, debunked:15, tags:["WOW Signal","SETI","1977","Radio","Ohio State","Hydrogen Line","ET"], premium:false},

  {id:"s123",type:"research", source:"Ancient Astronaut Theory / Zecharia Sitchin", sourceUrl:"https://sitchin.com/",                                                                 time:"33h ago", topic:"Aliens & Extraterrestrial", region:"Global", title:"Ancient Astronaut Theory: Sumerian Texts Describe the Anunnaki as Alien Beings Who Created Humans - What the Clay Tablets Actually Say", summary:"Zecharia Sitchin spent decades translating Sumerian cuneiform clay tablets and concluded they describe beings called the Anunnaki who came from the planet Nibiru and genetically engineered Homo sapiens as a slave species. The Epic of Gilgamesh pre-dates Genesis by at least 1000 years and contains parallel flood narrative. The Sumerian King List describes rulers who reigned for thousands of years before the flood. Academic Sumerologists dispute Sitchin's translations but the ancient astronaut hypothesis has been adopted by researchers including Erich von Daniken whose Chariots of the Gods became an international bestseller. The History Channel Ancient Aliens series has brought the theory to mass audiences.", upvotes:21500, comments:3101, credible:48, debunked:52, tags:["Anunnaki","Sitchin","Sumerian","Ancient Astronaut","Nibiru","Enki"], premium:false},

  {id:"s124",type:"news",     source:"Congress / NewsNation / The Debrief",   sourceUrl:"https://oversight.house.gov/",                                                                  time:"34h ago", topic:"Aliens & Extraterrestrial", region:"USA",    title:"September 2025 Congressional Hearing: Military Veterans Testify About Non-Human Intelligence and Craft Retrieval Programs", summary:"The September 2025 House Oversight Committee hearing titled Restoring Public Trust brought additional military veterans to testify under oath about UAP crash retrieval programs and non-human intelligence. Witnesses included individuals with direct firsthand knowledge of crash retrieval operations rather than secondhand reports. The hearing followed David Grusch's July 2023 testimony and was notable for the increased specificity of accounts given under oath. Multiple witnesses described seeing non-human materials and in some cases non-human biological entities. Congressional pressure for full declassification intensified following the hearing.", upvotes:29100, comments:4201, credible:74, debunked:26, tags:["Congress","2025","Military","Veterans","Crash Retrieval","Non-Human","Testimony"], premium:false},
];

// --- SEED COMMUNITY POSTS -----------------------------------------------------
export const SEED_POSTS = [
  { id:"c1", user:"RedactedArchive",    badge:"Investigator", time:"2h ago",  topic:"Government & Intelligence",    region:"USA",title:"Cross-referencing Epstein flight logs  -  34 names never reported on",                             body:"Using court-filed documents and FOIA releases I've cross-referenced 34 names on the manifests that have never appeared in any mainstream coverage. Several are still in active government positions.", upvotes:4211, comments:891, refs:[{label:"DocumentCloud Court Files",url:"https://www.documentcloud.org"}], tags:["Epstein","FOIA"], confidence:"likely", contentType:"research", pinned:true },
  { id:"c2", user:"EnochResearcher",    badge:"Researcher",   time:"3h ago",  topic:"Biblical & Religious Records",  region:"Middle East",title:"Parallel passages between Book of Enoch and Genesis 6  -  line by line comparison",               body:"The Book of Enoch was found among the Dead Sea Scrolls, confirming it predates the New Testament. I've done a full side-by-side of Enoch chapters 6-11 and Genesis 6:1-4. The Nephilim account is nearly identical  -  suggesting a common source text.",         upvotes:3102, comments:567, refs:[{label:"Dead Sea Scrolls Digital Library",url:"https://www.deadseascrolls.org.il"},{label:"Book of Enoch Full Text",url:"https://www.amazon.com/Book-Enoch-R-H-Charles/dp/1478318759"}], tags:["Enoch","Nephilim","Genesis"], confidence:"confirmed", contentType:"research", pinned:true },
  { id:"c3", user:"OceanDepthsOnly",    badge:"Researcher",   time:"4h ago",  topic:"Animal Intelligence",           region:"Global",title:"Dolphins in Shark Bay Passing Tool Use to Offspring  -  Documented Across 3 Generations",          body:"Research from Shark Bay, Australia documents bottlenose dolphins using marine sponges to protect their snouts while foraging. This behavior is taught exclusively mother to daughter and has been documented across three generations  -  qualifying as culture.",    upvotes:3918, comments:621, refs:[{label:"NOAA Ocean Exploration",url:"https://oceanexplorer.noaa.gov"},{label:"Shark Bay Research",url:"https://www.monkeymia.com.au"}], tags:["Dolphins","Tool Use","Culture"], confidence:"confirmed", contentType:"research", pinned:false },
  { id:"c4", user:"HistoricalRecord77", badge:"Analyst",      time:"8h ago",  topic:"Giants & Nephilim",            region:"USA",title:"1880s News Archives: Giant Skeleton Reports Before Smithsonian Consolidated the Finds",          body:"I've compiled 47 newspaper articles from 1848-1912 reporting giant skeletal discoveries across Ohio, Illinois, and Tennessee. All were transferred to the Smithsonian. None are publicly accessible today. The timing correlates with the institution's founding.", upvotes:5200, comments:890, refs:[{label:"NewspaperArchive.com",url:"https://newspaperarchive.com"},{label:"Smithsonian FOIA Records",url:"https://www.si.edu/foia"}], tags:["Giants","Smithsonian","Archives"], confidence:"likely", contentType:"research", pinned:false },
];

// --- MEDIA LIBRARY ------------------------------------------------------------
export const MEDIA_LIBRARY = [

  // BOOKS - linked to author sites, free texts, or publisher pages
  {id:"b1",  type:"book", title:"JFK and the Unspeakable",                    author:"James W. Douglass",         year:2008, topic:"Government & Intelligence",    tags:["JFK","CIA","Assassination"],          desc:"The most thorough investigation into the Kennedy assassination. Argues the CIA was involved due to Kennedy's peace overtures to Khrushchev.",                                                                         url:"https://www.penguinrandomhouse.com/books/187028/jfk-and-the-unspeakable-by-james-w-douglass/",       rating:4.8},
  {id:"b2",  type:"book", title:"One Nation Under Blackmail (Vol.1 & 2)",     author:"Whitney Webb",              year:2022, topic:"Unresolved Events",            tags:["Epstein","Intelligence","Maxwell"],   desc:"Two-volume investigation into the Epstein network tracing its origins through decades of intelligence operations. Webb's masterwork.",                                                                                   url:"https://unlimitedhangout.com/one-nation-under-blackmail/",                                            rating:4.9},
  {id:"b3",  type:"book", title:"The Creature from Jekyll Island",            author:"G. Edward Griffin",         year:1994, topic:"Finance & Power",              tags:["Federal Reserve","Banking","Control"], desc:"The definitive expose arguing the Federal Reserve is a private banking cartel operating outside democratic oversight.",                                                                                              url:"https://www.realityzone.com/creaturejekyllisland.html",                                               rating:4.7},
  {id:"b4",  type:"book", title:"Behold a Pale Horse",                        author:"Milton William Cooper",     year:1991, topic:"Government & Intelligence",    tags:["NWO","UFO","Secret Societies"],       desc:"Former Naval Intelligence officer's account of secret government programs, UFOs, and shadow power structures. One of the most widely read alternative books ever published.",                                          url:"https://www.hourofthetime.com/majestytwelve.htm",                                                    rating:4.6},
  {id:"b5",  type:"book", title:"Fingerprints of the Gods",                   author:"Graham Hancock",            year:1995, topic:"Hidden History",               tags:["Ancient","Civilization","Pyramids"],  desc:"Landmark work arguing a technologically advanced civilization existed before recorded history, destroyed around 12,000 years ago.",                                                                                     url:"https://grahamhancock.com/fingerprints-of-the-gods/",                                                rating:4.6},
  {id:"b6",  type:"book", title:"The Biggest Secret",                         author:"David Icke",                year:1999, topic:"Secret Societies",             tags:["Reptilian","Elite","Control"],        desc:"Icke's landmark work connecting royal bloodlines, secret societies, and what he describes as an interdimensional control structure.",                                                                                   url:"https://davidicke.com/product-category/books/",                                                      rating:4.3},
  {id:"b7",  type:"book", title:"Wes Penre Papers - All 5 Levels FREE",       author:"Wes Penre",                 year:2011, topic:"Forbidden Science",            tags:["Anunnaki","Multiverse","NWO"],        desc:"Five levels of free research into human origins, the Anunnaki, and interdimensional forces. One of the most comprehensive alternative research archives online. Completely free.",                                     url:"https://wespenre.com/category/level-1-5-in-pdf/",                                                    rating:4.6},
  {id:"b8",  type:"book", title:"The Book of Enoch - Full Text FREE",         author:"R.H. Charles (translator)", year:1917, topic:"Biblical & Religious Records",  tags:["Enoch","Watchers","Nephilim"],        desc:"The complete Book of Enoch found among the Dead Sea Scrolls. The primary source document for Nephilim research. Completely free to read online.",                                                                      url:"https://www.sacred-texts.com/bib/boe/",                                                              rating:4.9},
  {id:"b9",  type:"book", title:"Emerald Tablets of Thoth - Full Text FREE",  author:"Thoth/Doreal (translator)", year:1925, topic:"Ancient Civilizations",        tags:["Thoth","Atlantis","Hermetic"],        desc:"The complete Emerald Tablets describing Thoth as an Atlantean priest-king. Free to read at Sacred Texts archive.",                                                                                                     url:"https://www.sacred-texts.com/egy/tet/index.htm",                                                     rating:4.7},
  {id:"b10", type:"book", title:"The 12th Planet",                            author:"Zecharia Sitchin",          year:1976, topic:"Ancient Civilizations",        tags:["Anunnaki","Nibiru","Sumerian"],       desc:"Sitchin's foundational work interpreting Sumerian clay tablets as evidence of the Anunnaki. Official author archive at sitchin.com.",                                                                                  url:"https://sitchin.com/",                                                                               rating:4.4},
  {id:"b11", type:"book", title:"Lost in Math",                               author:"Sabine Hossenfelder",       year:2018, topic:"Forbidden Science",            tags:["Physics","String Theory","Science"],  desc:"Physicist argues that beauty and elegance - not evidence - now drive theoretical physics, explaining why string theory dominates despite zero experimental verification.",                                               url:"https://www.basicbooks.com/titles/sabine-hossenfelder/lost-in-math/9780465094257/",                  rating:4.5},
  {id:"b12", type:"book", title:"The Trouble with Physics",                   author:"Lee Smolin",                year:2006, topic:"Forbidden Science",            tags:["String Theory","Physics","Science"],  desc:"Perimeter Institute physicist's damning critique of string theory and the institutional capture of theoretical physics funding.",                                                                                        url:"https://www.penguinrandomhouse.com/books/293008/the-trouble-with-physics-by-lee-smolin/",             rating:4.5},
  {id:"b13", type:"book", title:"Missing 411 - Western United States",        author:"David Paulides",            year:2011, topic:"Unresolved Events",            tags:["Missing","National Parks","Unexplained"],desc:"Paulides' first book documenting the disturbing pattern of unexplained disappearances in US National Parks. Available from Hancock House Publishers.",                                                             url:"https://www.hancockhouse.com/collections/missing-411-series",                                        rating:4.7},
  {id:"b14", type:"book", title:"BITTEN - Secret History of Lyme Disease",    author:"Kris Newby",                year:2019, topic:"Health & Science",             tags:["Lyme","Bioweapons","Ticks"],          desc:"Science writer documents interviews with Willy Burgdorfer - who discovered the Lyme bacterium - and evidence linking Plum Island to Cold War tick bioweapons experiments.",                                            url:"https://www.harpercollins.com/products/bitten-kris-newby",                                           rating:4.6},
  {id:"b15", type:"book", title:"Regenesis",                                  author:"George Church",             year:2012, topic:"Forbidden Science",            tags:["DNA","CRISPR","Synthetic Biology"],   desc:"Harvard geneticist George Church encoded this book in DNA - 70 billion copies on a thumbnail. Covers CRISPR, Neanderthal reconstruction, and synthetic biology.",                                                        url:"https://www.hachettebookgroup.com/titles/george-m-church/regenesis/9780465038657/",                  rating:4.4},
  {id:"b16", type:"book", title:"The Biology of Belief",                      author:"Bruce Lipton",              year:2005, topic:"Forbidden Science",            tags:["Epigenetics","DNA","Consciousness"],  desc:"Former Stanford cell biologist shows environment and beliefs control which genes switch on or off. Challenges genetic determinism.",                                                                                      url:"https://www.brucelipton.com/books/",                                                                 rating:4.5},
  {id:"b17", type:"book", title:"Science Set Free",                           author:"Rupert Sheldrake",          year:2012, topic:"Forbidden Science",            tags:["Science","Dogma","Morphic"],          desc:"Sheldrake challenges the 10 core dogmas of modern science. His TED talk on this was banned by TED. Full text of the talk at his official site.",                                                                          url:"https://www.sheldrake.org/books-by-rupert-sheldrake/science-set-free",                               rating:4.4},
  {id:"b18", type:"book", title:"Dark Alliance",                              author:"Gary Webb",                 year:1998, topic:"Government & Intelligence",    tags:["CIA","Drugs","Contras"],              desc:"Documents how CIA-backed Contras flooded American cities with crack cocaine. Webb died of two gunshot wounds ruled suicide.",                                                                                              url:"https://www.amazon.com/dp/1888363894",                                                               rating:4.7},
  {id:"b19", type:"book", title:"Plato's Timaeus - Original Atlantis Account","author":"Plato",                  year:-360, topic:"Hidden History",               tags:["Atlantis","Plato","Ancient"],         desc:"Plato's original account of Atlantis - a technologically advanced naval civilization destroyed around 9,600 BCE. Primary source document. Completely free.",                                                              url:"https://classics.mit.edu/Plato/timaeus.html",                                                        rating:4.8},
  {id:"b20", type:"book", title:"The Kybalion - Hermetic Principles FREE",    author:"Three Initiates",           year:1908, topic:"Ancient Civilizations",        tags:["Hermetic","Thoth","Occult"],          desc:"The seven Hermetic principles of the universe as interpreted through the teachings of Hermes Trismegistus. Completely free at Sacred Texts.",                                                                              url:"https://www.sacred-texts.com/eso/kyb/index.htm",                                                     rating:4.5},

  // NETFLIX DOCUMENTARIES
  {id:"n1",  type:"documentary", title:"Ancient Apocalypse (Series)",         author:"Graham Hancock",            year:2022, topic:"Hidden History",               tags:["Ancient","Civilization","Hancock"],   desc:"Netflix series presenting evidence for a lost pre-ice age civilization. One of Netflix's most watched docuseries despite fierce pushback from archaeologists.",                                                           url:"https://www.netflix.com/title/81211003",                                                             rating:4.2},
  {id:"n2",  type:"documentary", title:"Jeffrey Epstein: Filthy Rich",        author:"Lisa Bryant",               year:2020, topic:"Unresolved Events",            tags:["Epstein","Elite","Trafficking"],      desc:"Netflix four-part series based on Julie Brown's Miami Herald investigation into Epstein's network and the decades of institutional cover-up.",                                                                           url:"https://www.netflix.com/title/80224905",                                                             rating:4.5},
  {id:"n3",  type:"documentary", title:"The Social Dilemma",                  author:"Jeff Orlowski",             year:2020, topic:"Media & Disclosure",           tags:["Social Media","Algorithm","Control"], desc:"Former tech insiders from Google, Facebook and Twitter reveal how platforms are engineered to manipulate behavior at any cost.",                                                                                       url:"https://www.netflix.com/title/81254224",                                                             rating:4.3},
  {id:"n4",  type:"documentary", title:"The Keepers",                         author:"Ryan White",                year:2017, topic:"Government & Intelligence",    tags:["Catholic Church","Cover-up","Murder"], desc:"Seven-part series investigating the unsolved 1969 murder of a nun and the Catholic Church cover-up of systematic sexual abuse in Baltimore.",                                                                           url:"https://www.netflix.com/title/80103031",                                                             rating:4.7},
  {id:"n5",  type:"documentary", title:"Seaspiracy",                          author:"Ali Tabrizi",               year:2021, topic:"Health & Science",             tags:["Ocean","Fishing","Cover-up"],         desc:"Uncovering environmental destruction by the commercial fishing industry and suppression of evidence by regulatory bodies and NGOs.",                                                                                       url:"https://www.netflix.com/title/81014008",                                                             rating:4.1},
  {id:"n6",  type:"documentary", title:"Icarus",                              author:"Bryan Fogel",               year:2017, topic:"Government & Intelligence",    tags:["Russia","Doping","State Corruption"],  desc:"Oscar-winning film that accidentally uncovered Russia's entire state-sponsored Olympic doping program while the filmmaker was testing performance drugs himself.",                                                       url:"https://www.netflix.com/title/80168079",                                                             rating:4.6},
  {id:"n7",  type:"documentary", title:"Explained: The Mind (Series)",        author:"Vox",                       year:2019, topic:"Consciousness & Mind",         tags:["Consciousness","Brain","Science"],    desc:"Vox series covering consciousness, dreams, memory and the science of the mind. Available on Netflix.",                                                                                                                   url:"https://www.netflix.com/title/80216752",                                                             rating:4.2},
  {id:"n8",  type:"documentary", title:"Inside Bill's Brain",                 author:"Davis Guggenheim",          year:2019, topic:"Forbidden Science",            tags:["Technology","Science","Power"],       desc:"Three-part series documenting how Bill Gates approaches global problems. Critics argue it whitewashes Gates Foundation's pharmaceutical and GMO agendas.",                                                               url:"https://www.netflix.com/title/80184771",                                                             rating:3.8},

  // AMAZON PRIME DOCUMENTARIES
  {id:"am1", type:"documentary", title:"Missing 411: The Movie",              author:"David Paulides",            year:2016, topic:"Unresolved Events",            tags:["Missing","National Parks","Paulides"], desc:"Paulides' first documentary examining the most compelling unexplained disappearance cases in US National Parks. Available on Amazon Prime.",                                                                           url:"https://www.amazon.com/dp/B074BPKD4C",                                                               rating:4.5},
  {id:"am2", type:"documentary", title:"Missing 411: The Hunted",             author:"David Paulides",            year:2019, topic:"Unresolved Events",            tags:["Missing","Hunters","Wilderness"],     desc:"Paulides' follow-up focusing exclusively on experienced hunters with military training who vanished in familiar wilderness. Disturbing pattern evidence.",                                                                url:"https://www.amazon.com/dp/B07ZNQJ3JG",                                                               rating:4.6},
  {id:"am3", type:"documentary", title:"The Phenomenon",                      author:"James Fox",                 year:2020, topic:"UAP & Anomalous",              tags:["UFO","UAP","Disclosure"],             desc:"James Fox's landmark UAP documentary featuring testimony from astronauts, pilots, officials, and the famous 1994 Zimbabwe mass UFO sighting witnessed by 62 schoolchildren.",                                           url:"https://www.amazon.com/dp/B08MC4KKKH",                                                               rating:4.7},
  {id:"am4", type:"documentary", title:"Hunt for the Skinwalker",             author:"Jeremy Corbell",            year:2018, topic:"UAP & Anomalous",              tags:["Skinwalker","Paranormal","DoD"],      desc:"Jeremy Corbell's documentary on Skinwalker Ranch and the classified DoD investigation AAWSAP into its anomalous phenomena.",                                                                                             url:"https://www.amazon.com/dp/B07FMSP6GS",                                                               rating:4.1},
  {id:"am5", type:"documentary", title:"Unacknowledged",                      author:"Steven Greer",              year:2017, topic:"UAP & Anomalous",              tags:["UFO","CIA","Disclosure"],             desc:"Military officials and intelligence officers testify on government concealment of extraterrestrial contact and reverse-engineered craft.",                                                                                url:"https://www.amazon.com/dp/B06Y5SFKK2",                                                               rating:4.0},
  {id:"am6", type:"documentary", title:"Above Majestic",                      author:"Roger Richards",            year:2018, topic:"UAP & Anomalous",              tags:["Secret Space","Cabal","UAP"],         desc:"Documentary examining the implications of a secret space program, MJ-12 documents, and the deep state connection to UFO cover-up programs.",                                                                               url:"https://www.amazon.com/dp/B07KK3WGK6",                                                               rating:3.9},

  // APPLE TV+ DOCUMENTARIES
  {id:"ap1", type:"documentary", title:"The Big Conn",                        author:"James Lee Hernandez",       year:2022, topic:"Government & Intelligence",    tags:["Fraud","Social Security","Cover-up"], desc:"Apple TV+ series exposing the largest Social Security disability fraud in US history and the government officials who enabled it for decades.",                                                                          url:"https://tv.apple.com/us/show/the-big-conn/umc.cmc.5tpfsmx4j3b4giyixa7oy1ioq",                      rating:4.4},
  {id:"ap2", type:"documentary", title:"The Dissident",                       author:"Bryan Fogel",               year:2020, topic:"Government & Intelligence",    tags:["Khashoggi","Saudi Arabia","Murder"],  desc:"Bryan Fogel's investigation into the murder of journalist Jamal Khashoggi and the Saudi government cover-up. Available on Apple TV+.",                                                                                   url:"https://tv.apple.com/us/movie/the-dissident/umc.cmc.72ydowvj37e2p17rln5stm37h",                     rating:4.6},
  {id:"ap3", type:"documentary", title:"WeCrashed",                          author:"Lee Eisenberg",              year:2022, topic:"Finance & Power",              tags:["WeWork","Fraud","Elite"],             desc:"Based on the true story of Adam Neumann and the rise and fall of WeWork - and how institutional investors enabled massive corporate fraud.",                                                                                url:"https://tv.apple.com/us/show/wecrashed/umc.cmc.8ey6m48gjf3v71mvx7mlga91a",                          rating:4.1},

  // HBO DOCUMENTARIES
  {id:"hb1", type:"documentary", title:"Q: Into the Storm",                   author:"Cullen Hoback",             year:2021, topic:"Media & Disclosure",           tags:["QAnon","Internet","Conspiracy"],      desc:"Six-part HBO series following the QAnon movement from its origins to January 6th, including the filmmaker's investigation into the identity of Q.",                                                                        url:"https://www.hbo.com/documentaries/q-into-the-storm",                                                 rating:4.2},
  {id:"hb2", type:"documentary", title:"The Vow (NXIVM)",                     author:"Karim Amer",                year:2020, topic:"Secret Societies",             tags:["NXIVM","Cult","Trafficking"],        desc:"Nine-part HBO documentary exposing NXIVM - a self-improvement cult whose leader Keith Raniere was convicted of sex trafficking elite members.",                                                                           url:"https://www.hbo.com/the-vow",                                                                        rating:4.6},
  {id:"hb3", type:"documentary", title:"Allen v. Farrow",                     author:"Kirby Dick",                year:2021, topic:"Unresolved Events",            tags:["Hollywood","Abuse","Cover-up"],       desc:"Four-part series examining the sexual abuse allegations against Woody Allen and how Hollywood enabled and covered up the accusations for decades.",                                                                        url:"https://www.hbo.com/movies/allen-v-farrow",                                                          rating:4.3},

  // HULU DOCUMENTARIES
  {id:"hu1", type:"documentary", title:"The Act of Killing",                  author:"Joshua Oppenheimer",        year:2012, topic:"Government & Intelligence",    tags:["Indonesia","Genocide","Cover-up"],    desc:"Filmmaker asks Indonesian death squad leaders to reenact their mass killings. One of the most disturbing documentaries ever made about state-sanctioned murder.",                                                         url:"https://www.hulu.com/movie/the-act-of-killing",                                                      rating:4.8},
  {id:"hu2", type:"documentary", title:"The Dropout",                         author:"Elizabeth Meriwether",      year:2022, topic:"Finance & Power",              tags:["Theranos","Fraud","Silicon Valley"],  desc:"Hulu series on Elizabeth Holmes and Theranos - one of the largest fraud cases in Silicon Valley history, enabled by institutional investors and media.",                                                                  url:"https://www.hulu.com/series/the-dropout",                                                            rating:4.4},

  // FREE / YOUTUBE DOCUMENTARIES
  {id:"yt1", type:"documentary", title:"The Century of the Self - FREE",      author:"Adam Curtis (BBC)",         year:2002, topic:"Media & Disclosure",           tags:["Propaganda","PR","Freud","Bernays"],  desc:"BBC masterwork tracing how Freud's theories were weaponized by Bernays to create modern PR and mass manipulation. Free on YouTube.",                                                                                     url:"https://www.youtube.com/watch?v=eJ3RzGoQC4s",                                                       rating:4.9},
  {id:"yt2", type:"documentary", title:"HyperNormalisation - FREE",           author:"Adam Curtis (BBC)",         year:2016, topic:"Media & Disclosure",           tags:["Politics","Media","Reality"],         desc:"Curtis argues politicians and financiers constructed a fake simplified world. Politicians tell stories rather than manage reality. Free on YouTube.",                                                                     url:"https://www.youtube.com/watch?v=oJLqyuxm96k",                                                       rating:4.5},
  {id:"yt3", type:"documentary", title:"The Spider's Web: Britain's Tax Haven","author":"Michael Oswald",        year:2017, topic:"Finance & Power",              tags:["UK","Offshore","Finance"],            desc:"How Britain quietly became the world's largest tax haven network. Examines the City of London Corporation and offshore finance empire. Free on YouTube.",                                                                 url:"https://www.youtube.com/watch?v=np_ylvc8Zj8",                                                       rating:4.6},
  {id:"yt4", type:"documentary", title:"Zeitgeist: The Movie - FREE",         author:"Peter Joseph",              year:2007, topic:"Government & Intelligence",    tags:["Federal Reserve","Religion","9/11"],  desc:"Controversial documentary covering religion as mind control, the Federal Reserve as a fraud, and 9/11 questions. Over 200 million views. Free on YouTube.",                                                             url:"https://www.youtube.com/watch?v=BnygHMRFHFE",                                                       rating:4.0},
  {id:"yt5", type:"documentary", title:"Loose Change - 9/11 Questions - FREE","author":"Dylan Avery",            year:2005, topic:"Government & Intelligence",    tags:["9/11","False Flag","Questions"],      desc:"The documentary that launched a million 9/11 questions. Documents inconsistencies in the official account of September 11th. Free on YouTube.",                                                                           url:"https://www.youtube.com/watch?v=n8OGwNMTtxo",                                                       rating:3.8},
  {id:"yt6", type:"documentary", title:"Corbett Report: Who Is Bill Gates? - FREE","author":"James Corbett",     year:2020, topic:"Government & Intelligence",    tags:["Gates","WHO","Vaccines","Control"],   desc:"Four-part investigative series by James Corbett examining Bill Gates' influence on global health policy, vaccines, and food systems. Free at CorbettReport.com.",                                                         url:"https://www.corbettreport.com/gates/",                                                               rating:4.5},

  // INDEPENDENT / ALTERNATIVE FILMS
  {id:"ind1",type:"documentary", title:"Citizenfour",                         author:"Laura Poitras",             year:2014, topic:"Surveillance",                 tags:["Snowden","NSA","Five Eyes"],          desc:"Oscar-winning documentary filmed in real time as Snowden revealed NSA global surveillance. Available on multiple streaming platforms.",                                                                                   url:"https://citizenfourfilm.com/",                                                                        rating:4.6},
  {id:"ind2",type:"documentary", title:"Inside Job",                          author:"Charles Ferguson",          year:2010, topic:"Finance & Power",              tags:["2008","Wall Street","Fraud"],         desc:"Oscar-winning dissection of the 2008 financial crisis showing systematic fraud at the highest levels of government and finance.",                                                                                          url:"https://www.imdb.com/title/tt1645089/",                                                               rating:4.7},
  {id:"ind3",type:"documentary", title:"The Corporation",                     author:"Mark Achbar",               year:2003, topic:"Finance & Power",              tags:["Corporations","Capitalism","Control"], desc:"Documentary examining corporations as legal persons with psychopathic traits. Features Milton Friedman, Michael Moore, Noam Chomsky. Free online.",                                                                    url:"https://www.youtube.com/watch?v=Y888wVY5hzw",                                                       rating:4.5},
  {id:"ind4",type:"documentary", title:"Thrive I & II",                       author:"Foster Gamble",             year:2011, topic:"Forbidden Science",            tags:["Free Energy","NWO","Control"],        desc:"Gamble's investigation into free energy suppression, global power structures, and what he argues is a hidden agenda for total control. Free online.",                                                                     url:"https://www.thrivemovement.com/the_movie",                                                           rating:4.0},
  {id:"ind5",type:"documentary", title:"Plandemic",                           author:"Mikki Willis",              year:2020, topic:"Health & Science",             tags:["Vaccines","Fauci","COVID"],           desc:"Independent documentary featuring Dr. Judy Mikovits making claims about COVID-19, vaccines, and suppressed science. Banned from major platforms. Watch context and counter-claims alongside.",                            url:"https://plandemicseries.com/",                                                                        rating:3.5},
  {id:"ind6",type:"documentary", title:"Fall of the Cabal",                   author:"Janet Ossebaard",           year:2020, topic:"Secret Societies",             tags:["Cabal","Elite","Control"],            desc:"Ten-part independent documentary series examining claimed global power structures, elite networks, and child trafficking. Draw your own conclusions.",                                                                   url:"https://www.bitchute.com/channel/thefall/",                                                          rating:3.8},

  // KEY YOUTUBE CHANNELS (as podcasts/ongoing series)
  {id:"pod1",type:"podcast", title:"Theories of Everything - Curt Jaimungal", author:"Curt Jaimungal",           year:2020, topic:"Forbidden Science",            tags:["TOE","Physics","Consciousness"],      desc:"The most rigorous physics and consciousness podcast online. Interviews with Weinstein, Wolfram, Penrose. Covers unified theories no mainstream outlet will touch.",                                                         url:"https://www.youtube.com/@TheoriesofEverything",                                                      rating:4.9},
  {id:"pod2",type:"podcast", title:"The Portal - Eric Weinstein",             author:"Eric Weinstein",            year:2019, topic:"Forbidden Science",            tags:["Geometric Unity","IDW","Physics"],    desc:"Eric Weinstein's podcast covering Geometric Unity, institutional corruption in science, UAP, and the Intellectual Dark Web. Includes the 2013 Oxford lecture.",                                                          url:"https://www.youtube.com/@EricWeinsteinPhD",                                                          rating:4.5},
  {id:"pod3",type:"podcast", title:"The Corbett Report Podcast",              author:"James Corbett",             year:2007, topic:"Government & Intelligence",    tags:["Deep State","CIA","History"],         desc:"One of the longest-running independent investigative podcasts. Every claim sourced. Deep dives on the Federal Reserve, 9/11, and the deep state.",                                                                          url:"https://www.corbettreport.com/podcasts/",                                                            rating:4.8},
  {id:"pod4",type:"podcast", title:"The Why Files",                           author:"AJ Gentile",                year:2021, topic:"Unresolved Events",            tags:["Mystery","History","Paranormal"],     desc:"Deeply researched video investigations into historical mysteries, unexplained events, and contested history. One of the fastest-growing research channels on YouTube.",                                                   url:"https://www.youtube.com/@TheWhyFiles",                                                               rating:4.7},
  {id:"pod5",type:"podcast", title:"DarkHorse Podcast",                       author:"Bret Weinstein & Heather Heying",year:2020,topic:"Forbidden Science",       tags:["Biology","IDW","Evolution"],          desc:"Evolutionary biology meets institutional critique. COVID, ivermectin, and the corruption of scientific journals. Bret Weinstein was fired from Evergreen State for questioning DEI policies.",                            url:"https://www.youtube.com/@bretweinstein",                                                             rating:4.4},
  {id:"pod6",type:"podcast", title:"Ground Zero with Clyde Lewis",            author:"Clyde Lewis",               year:1995, topic:"UAP & Anomalous",              tags:["UAP","Paranormal","Conspiracy"],      desc:"Long-running radio show covering UAP, paranormal events, suppressed history, and anomalous phenomena. Available as podcast on all platforms.",                                                                            url:"https://groundzeromedia.org",                                                                        rating:4.1},
  {id:"pod7",type:"podcast", title:"Coast to Coast AM",                       author:"George Noory",              year:1988, topic:"UAP & Anomalous",              tags:["UAP","Paranormal","Fringe"],          desc:"The longest-running overnight radio program covering UAP, the paranormal, fringe science, and suppressed history. Massive listener archive.",                                                                              url:"https://www.coasttocoastam.com",                                                                     rating:4.0},
  {id:"pod8",type:"podcast", title:"Lex Fridman Podcast",                     author:"Lex Fridman",               year:2018, topic:"Forbidden Science",            tags:["AI","Physics","Consciousness"],       desc:"Long-form interviews with scientists and thinkers on AI, physics, consciousness, and controversial topics. Guests include Weinstein, Loeb, and Penrose.",                                                                  url:"https://lexfridman.com/podcast",                                                                     rating:4.6},
  {id:"pod9",type:"podcast", title:"Mysterious Universe Podcast",             author:"Benjamin Grundy",           year:2006, topic:"UAP & Anomalous",              tags:["UAP","Paranormal","Strange"],         desc:"One of the longest-running paranormal podcasts covering UAP, strange phenomena, consciousness research, and fringe science. 800+ episodes.",                                                                               url:"https://mysteriousuniverse.org/category/podcasts/",                                                  rating:4.3},
  {id:"pod10",type:"podcast",title:"Stuff They Don't Want You to Know",       author:"iHeart Radio",              year:2009, topic:"Government & Intelligence",    tags:["Conspiracy","Research","History"],    desc:"Well-produced podcast examining suppressed history, government secrets, and unresolved events. 1,500+ episodes with full archives.",                                                                                       url:"https://www.iheart.com/podcast/182-stuff-they-dont-want-you-17913675/",                              rating:4.3},
  {id:"pod11",type:"podcast",title:"The Higherside Chats",                    author:"Greg Carlwood",             year:2011, topic:"Government & Intelligence",    tags:["Deep State","Research","Alternative"], desc:"Long-form interviews with alternative researchers, authors, and investigators on everything from ancient history to modern power structures.",                                                                           url:"https://www.thehighersidechats.com",                                                                 rating:4.3},
  {id:"pod12",type:"podcast",title:"Into the Impossible",                     author:"Dr. Bernard Haisch",        year:2019, topic:"Forbidden Science",            tags:["Consciousness","Physics","UAP"],      desc:"Physicist interviews scientists on the fringes of mainstream physics - zero-point energy, consciousness, and UAP from a credentialed scientific perspective.",                                                              url:"https://www.youtube.com/@IntotheImpossiblePodcast",                                                  rating:4.4},

  // KEY ARTICLES & FREE RESEARCH PAPERS
  {id:"a1",  type:"article", title:"The CIA and the Media - Carl Bernstein 1977","author":"Carl Bernstein",       year:1977, topic:"Media & Disclosure",           tags:["CIA","Mockingbird","Press"],          desc:"Bernstein's 25,000-word Rolling Stone investigation: 400 American journalists secretly worked for the CIA. Full text online. The document that defined Operation Mockingbird.",                                          url:"https://www.carlbernstein.com/the-cia-and-the-media-rolling-stone-10-20-1977",                       rating:5.0},
  {id:"a2",  type:"article", title:"Pentagon UAP Program - NY Times 2017",    author:"Helene Cooper et al.",      year:2017, topic:"UAP & Anomalous",              tags:["UAP","Pentagon","AATIP"],             desc:"The New York Times article that broke the existence of the Pentagon's secret Advanced Aerospace Threat Identification Program and the Tic Tac UAP footage.",                                                              url:"https://www.nytimes.com/2017/12/16/us/politics/unidentified-aerial-phenomena.html",                 rating:4.9},
  {id:"a3",  type:"article", title:"How Epstein Got Away With It - Julie Brown","author":"Julie K. Brown",       year:2018, topic:"Unresolved Events",            tags:["Epstein","Cover-up","Justice"],       desc:"The Miami Herald investigation that reopened the Epstein case and led to his 2019 arrest. Full investigation archive at Miami Herald.",                                                                                    url:"https://www.miamiherald.com/news/local/article220097825.html",                                       rating:5.0},
  {id:"a4",  type:"article", title:"The Drone Papers - The Intercept 2015",   author:"The Intercept",             year:2015, topic:"Government & Intelligence",    tags:["Drones","CIA","Kill List"],           desc:"Leaked classified documents revealing 90% of drone strike victims were not the intended targets. Full documents and analysis at The Intercept.",                                                                            url:"https://theintercept.com/drone-papers/",                                                             rating:5.0},
  {id:"a5",  type:"article", title:"Why Most Research Findings Are False",    author:"John Ioannidis",            year:2005, topic:"Forbidden Science",            tags:["Science","Replication Crisis","Research"],desc:"The most cited paper on the failure of scientific research. Proves mathematically that the majority of published research findings are false. Free at PLoS Medicine.",                                                url:"https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.0020124",                     rating:5.0},
  {id:"a6",  type:"article", title:"CIA Gateway Process - Declassified 1983", author:"US Army Intelligence",      year:1983, topic:"Remote Viewing & PSI",          tags:["CIA","Consciousness","Gateway","OBE"], desc:"Declassified 1983 Army report concludes human consciousness can separate from space-time. Classified for 37 years. Free download at CIA Reading Room.",                                                                  url:"https://www.cia.gov/readingroom/docs/CIA-RDP96-00788R001700210016-3.pdf",                             rating:5.0},
  {id:"a7",  type:"article", title:"Cambridge Declaration on Consciousness",  author:"Francis Crick Memorial Conf.",year:2012,topic:"Animal Intelligence",         tags:["Consciousness","Dolphins","Science"],  desc:"Signed in the presence of Stephen Hawking, confirms dolphins and other non-human animals possess neurological substrates for conscious states. Free PDF.",                                                               url:"https://fcmconference.org/img/CambridgeDeclarationOnConsciousness.pdf",                               rating:5.0},
  {id:"a8",  type:"article", title:"Deep Intellect - Orion Magazine",         author:"Sy Montgomery",             year:2011, topic:"Animal Intelligence",          tags:["Dolphins","Consciousness","Intelligence"],desc:"Sy Montgomery's landmark Orion Magazine piece on Dr. Denise Herzing's 28-year study with wild Atlantic spotted dolphins in the Bahamas. Essential reading.",                                                         url:"https://orionmagazine.org/article/deep-intellect/",                                                  rating:4.8},
  {id:"a9",  type:"article", title:"Simulation Argument - Nick Bostrom 2003", author:"Nick Bostrom",              year:2003, topic:"Simulation & Reality",          tags:["Simulation","Philosophy","Physics"],  desc:"Bostrom's original paper: at least one of three propositions must be true - civilizations go extinct, lose interest in simulations, or we are almost certainly simulated. Free PDF.",                                    url:"https://www.simulation-argument.com/simulation.pdf",                                                 rating:5.0},
  {id:"a10", type:"article", title:"Galileo Project Overview - Peer Reviewed","author":"Avi Loeb",                year:2023, topic:"UAP & Anomalous",              tags:["Galileo","UAP","Harvard","Science"],  desc:"Peer-reviewed overview of the first systematic scientific search for extraterrestrial technology near Earth. Published in Journal of Astronomical Instrumentation.",                                                       url:"https://www.worldscientific.com/doi/10.1142/S2251171723400032",                                      rating:4.8},
  {id:"a11", type:"article", title:"Unlimited Hangout - Whitney Webb Archive","author":"Whitney Webb",            year:2019, topic:"Government & Intelligence",    tags:["Intelligence","Epstein","Control"],   desc:"Whitney Webb's complete investigative archive at unlimitedhangout.com covering intelligence networks, Epstein, and hidden power structures.",                                                                              url:"https://unlimitedhangout.com",                                                                       rating:4.9},
  {id:"a12", type:"article", title:"Naked Bible Blog - Dr. Michael Heiser",   author:"Dr. Michael Heiser",        year:2010, topic:"Biblical & Religious Records",  tags:["Nephilim","Bible","Theology"],        desc:"Dr. Heiser's peer-reviewed biblical scholarship blog covering divine council theology, the Nephilim, and what the original Hebrew texts actually say.",                                                                    url:"https://www.nakedbiblepodcast.com",                                                                  rating:4.7},
];


export const SOURCES = [

  // RESEARCHERS & AUTHORS  -  OFFICIAL SITES
  {
    label:"Researchers & Authors  -  Official Sites",
    type:"research",
    items:[
      {n:"Billy Carson  -  4biddenknowledge.com",                    u:"https://www.4biddenknowledge.com"},
      {n:"Billy Carson  -  4biddenknowledge TV (streaming)",         u:"https://www.gaia.com"},
      {n:"Dolores Cannon  -  Official Site & QHHT Research",        u:"https://dolorescannon.com"},
      {n:"Dolores Cannon  -  QHHT Official",                        u:"https://www.qhhtofficial.com"},
      {n:"David Icke  -  Official Site",                            u:"https://davidicke.com"},
      {n:"Ickonic  -  David Icke Video Platform",                   u:"https://www.ickonic.com"},
      {n:"Wes Penre Papers  -  All 5 Levels Free PDF",              u:"https://wespenre.com/category/level-1-5-in-pdf/"},
      {n:"Graham Hancock  -  Official Site",                        u:"https://grahamhancock.com"},
      {n:"Michael Tsarion  -  Official Site",                       u:"https://www.michaeltsarion.com"},
      {n:"Zecharia Sitchin  -  Official Archive",                   u:"https://sitchin.com"},
      {n:"Jordan Maxwell  -  Video Archive (d. 2022)",              u:"https://www.jordanmaxwellvideos.com"},
      {n:"Dr. Michael Heiser Foundation",                         u:"https://michaelsheiserfoundation.org"},
      {n:"Dr. Michael Heiser  -  Naked Bible Blog & Podcast",       u:"https://www.nakedbiblepodcast.com"},
      {n:"Dr. Michael Heiser  -  drmsh.com Archive",               u:"https://drmsh.com"},
      {n:"Bruce Lipton  -  Epigenetics & Biology of Belief",       u:"https://www.brucelipton.com"},
      {n:"Gregg Braden  -  Official Site",                         u:"https://www.greggbraden.com"},
      {n:"Brien Foerster  -  Elongated Skull Research",            u:"https://brienfoerster.com"},
      {n:"Robert Schoch  -  Sphinx & Geology Research",            u:"https://www.robertschoch.net"},
      {n:"Michael Cremo  -  Forbidden Archaeology",                u:"https://www.mcremo.com"},
      {n:"L.A. Marzulli  -  Nephilim & UAP Blog",                 u:"https://lamarzulli.net"},
      {n:"Linda Moulton Howe  -  Earthfiles",                      u:"https://www.earthfiles.com"},
      {n:"Richard Dolan  -  UAP Research",                         u:"https://richarddolanmembers.com"},
      {n:"Giorgio Tsoukalos  -  Ancient Aliens",                   u:"https://www.youtube.com/@AncientAstronautArchive"},
      {n:"Randall Carlson  -  Kosmographia",                       u:"https://randallcarlson.com"},
    ],
  },

  // WRITTEN BLOGS  -  CONSCIOUSNESS, DNA, FREQUENCY & THE MATRIX
  {
    label:"Written Blogs  -  Consciousness, DNA, Frequency & The Matrix",
    type:"blog",
    items:[
      {n:"Bruce Lipton Blog  -  Epigenetics articles",             u:"https://www.brucelipton.com/blog/"},
      {n:"Gregg Braden Blog  -  Frequency, DNA & Ancient Wisdom",  u:"https://www.greggbraden.com/blog/"},
      {n:"HeartMath Institute  -  Heart-brain coherence research", u:"https://www.heartmath.org/research/"},
      {n:"Institute of Noetic Sciences  -  Consciousness papers",  u:"https://noetic.org/research/"},
      {n:"Cymatics.org  -  Sound frequency & visible matter",      u:"https://www.cymatics.org"},
      {n:"Sacred Geometry International",                        u:"https://sacredgeometryinternational.com"},
      {n:"Drunvalo Melchizedek  -  Flower of Life & Merkaba",     u:"https://www.gaia.com/article/drunvalo-melchizedek"},
      {n:"Simulation Argument  -  Nick Bostrom original paper",   u:"https://www.simulation-argument.com/simulation.pdf"},
      {n:"Rizwan Virk  -  Simulation Theory research",            u:"https://www.zenentrepreneur.com"},
      {n:"The Monroe Institute  -  Consciousness & OBE research",  u:"https://www.monroeinstitute.org"},
      {n:"Dean Radin  -  Consciousness & PSI research",           u:"https://www.deanradin.com"},
      {n:"Masaru Emoto  -  Water Memory official archive",        u:"https://www.masaru-emoto.net/en/"},
      {n:"Solfeggio Frequencies  -  Meditative Mind research",    u:"https://meditativemind.org"},
    ],
  },

  // WRITTEN BLOGS  -  EMERALD TABLETS, THOTH & HERMETICISM
  {
    label:"Written Blogs  -  Emerald Tablets, Thoth & Hermeticism",
    type:"blog",
    items:[
      {n:"4biddenknowledge  -  Billy Carson: Emerald Tablets articles", u:"https://www.4biddenknowledge.com/blog"},
      {n:"Emerald Tablets of Thoth  -  Full Text FREE",            u:"https://www.sacred-texts.com/egy/tet/index.htm"},
      {n:"The Kybalion  -  Hermetic Principles Full Text FREE",    u:"https://www.sacred-texts.com/eso/kyb/index.htm"},
      {n:"Hermetic Library  -  Crowley, Hermeticism, Alchemy",    u:"https://hermetic.com"},
      {n:"Sacred Texts  -  Ancient Egypt & Hermetica FREE",       u:"https://www.sacred-texts.com/egy/"},
      {n:"Thoth & Hermes Trismegistus  -  World History Encyclopedia", u:"https://www.worldhistory.org/thoth/"},
      {n:"Alchemy & Hermeticism Research  -  Levity.com",         u:"https://www.levity.com/alchemy/"},
      {n:"Gnosis Archive  -  Gnostic, Hermetic & esoteric texts", u:"https://gnosis.org"},
    ],
  },

  // WRITTEN BLOGS  -  ANCIENT ALIENS, ANUNNAKI & SUMERIAN TABLETS
  {
    label:"Written Blogs  -  Ancient Aliens, Anunnaki & Sumerian Tablets",
    type:"blog",
    items:[
      {n:"Ancient Astronaut Archive  -  written research",         u:"https://www.ancientastronautarchive.com"},
      {n:"Ancient Origins  -  daily ancient history articles",     u:"https://www.ancient-origins.net"},
      {n:"ETCSL Oxford  -  Complete Sumerian Literature FREE",     u:"https://etcsl.orinst.ox.ac.uk"},
      {n:"XaviantVision.com  -  Free metaphysical & alt-history",  u:"https://www.youtube.com/@XaviantVision"},
      {n:"World History Encyclopedia  -  Ancient Sumer FREE",     u:"https://www.worldhistory.org/sumer/"},
      {n:"Humans Are Free  -  Ancient civilizations research",    u:"https://humansarefree.com"},
    ],
  },

  // WRITTEN BLOGS  -  GOVERNMENT, DEEP STATE & INTELLIGENCE
  {
    label:"Written Blogs  -  Government, Deep State & Intelligence",
    type:"blog",
    items:[
      {n:"Corbett Report  -  James Corbett investigative research", u:"https://www.corbettreport.com"},
      {n:"Unlimited Hangout  -  Whitney Webb investigations",       u:"https://unlimitedhangout.com"},
      {n:"OffGuardian  -  media criticism & declassified research", u:"https://off-guardian.org"},
      {n:"The Intercept  -  investigative articles & leaks",       u:"https://theintercept.com"},
      {n:"The Grayzone  -  investigative journalism",              u:"https://thegrayzone.com"},
      {n:"WantToKnow.info  -  13,000+ archived news summaries",   u:"https://www.wanttoknow.info"},
      {n:"Matt Taibbi Substack  -  investigative articles",        u:"https://taibbi.substack.com"},
      {n:"Last American Vagabond  -  deep state coverage",         u:"https://www.thelastamericanvagabond.com"},
      {n:"Covert Action Magazine  -  intelligence history",        u:"https://covertactionmagazine.com"},
      {n:"Government Secrets Substack  -  William Arkin",         u:"https://governmentsecrets.substack.com"},
      {n:"Zero Hedge  -  geopolitical analysis",                   u:"https://www.zerohedge.com"},
    ],
  },

  // WRITTEN BLOGS  -  UAP, UFO & DISCLOSURE
  {
    label:"Written Blogs  -  UAP, UFO & Disclosure",
    type:"blog",
    items:[
      {n:"The Black Vault  -  2M+ declassified pages",            u:"https://www.theblackvault.com"},
      {n:"UFO Digest  -  articles, photos & expert analysis",     u:"https://www.ufodigest.com"},
      {n:"UFO Chronicles  -  news, articles & historic cases",    u:"https://www.theufochronicles.com"},
      {n:"Open Minds UFO  -  news & investigative reports",       u:"https://www.openminds.tv"},
      {n:"Singular Fortean Society  -  paranormal journalism",    u:"https://www.singularfortean.com"},
      {n:"The Anomalist  -  daily review of unexplained phenomena",u:"https://www.anomalist.com"},
      {n:"Skinwalker Ranch  -  official research & experiment log",u:"https://skinwalker-ranch.com"},
      {n:"MUFON  -  sighting reports & case summaries",           u:"https://www.mufon.com"},
    ],
  },

  // WRITTEN BLOGS  -  BIBLICAL, NEPHILIM & GIANTS
  {
    label:"Written Blogs  -  Biblical, Nephilim & Giants",
    type:"blog",
    items:[
      {n:"Dr. Michael Heiser  -  PaleoBabble blog",               u:"https://michaelheiser.com"},
      {n:"Steve Quayle  -  giants & ancient history articles",    u:"https://www.stevequayle.com"},
      {n:"Gen6 Giants  -  Stephen Quayle Nephilim research",     u:"https://www.gen6giants.com"},
      {n:"SkyWatch TV  -  Tom Horn biblical research",           u:"https://skywatchtv.com"},
      {n:"Koinonia House  -  Chuck Missler biblical studies",    u:"https://www.khouse.org"},
      {n:"Biblical Archaeology Society  -  peer-reviewed articles",u:"https://www.biblicalarchaeology.org"},
    ],
  },

  // WRITTEN BLOGS  -  PARANORMAL & SUPERNATURAL
  {
    label:"Written Blogs  -  Paranormal & Supernatural",
    type:"blog",
    items:[
      {n:"Phantoms & Monsters  -  Lon Strickler encounter reports",u:"https://www.phantomsandmonsters.com"},
      {n:"Mysterious Universe  -  paranormal & strange world",    u:"https://mysteriousuniverse.org"},
      {n:"Fortean Times  -  journal of strange phenomena",        u:"https://www.forteantimes.com"},
      {n:"Higgypop  -  paranormal news & occult articles",        u:"https://www.higgypop.com"},
      {n:"Curious Archive  -  deep dives into paranormal history",u:"https://www.curiousarchive.com"},
      {n:"Ghost Research Society",                              u:"https://www.ghostresearch.org"},
      {n:"Society for Psychical Research  -  research papers UK", u:"https://www.spr.ac.uk"},
      {n:"Rhine Research Center  -  parapsychology studies",     u:"https://www.rhine.org"},
      {n:"IANDS  -  near-death experience research",             u:"https://iands.org"},
    ],
  },

  // VIDEO CHANNELS  -  CONSCIOUSNESS, DNA, FREQUENCY & MATRIX
  {
    label:"Video Channels  -  Consciousness, DNA, Frequency & The Matrix",
    type:"podcast",
    items:[
      {n:"Bruce Lipton  -  YouTube (epigenetics)",                u:"https://www.youtube.com/@BruceLipton"},
      {n:"Gregg Braden  -  YouTube",                              u:"https://www.youtube.com/@GreggBradenOfficial"},
      {n:"Dolores Cannon  -  YouTube archive",                    u:"https://www.youtube.com/results?search_query=Dolores+Cannon+QHHT"},
      {n:"HeartMath Institute  -  YouTube",                       u:"https://www.youtube.com/@HeartMathInstitute"},
      {n:"Drunvalo Melchizedek  -  Flower of Life",               u:"https://www.youtube.com/results?search_query=Drunvalo+Melchizedek"},
      {n:"Dean Radin  -  Consciousness & PSI science",            u:"https://www.youtube.com/results?search_query=Dean+Radin+consciousness"},
      {n:"Cymatics  -  Sound & Frequency Visualized",             u:"https://www.youtube.com/results?search_query=cymatics+frequency"},
      {n:"Into the Impossible  -  Dr. Haisch frontier science",   u:"https://www.youtube.com/@IntotheImpossiblePodcast"},
      {n:"After Skool  -  consciousness & hidden knowledge",      u:"https://www.youtube.com/@AfterSkool"},
    ],
  },

  // VIDEO CHANNELS  -  ANCIENT HISTORY, TABLETS & FORBIDDEN SCIENCE
  {
    label:"Video Channels  -  Ancient History, Tablets & Forbidden Science",
    type:"podcast",
    items:[
      {n:"Billy Carson  -  4biddenknowledge YouTube",             u:"https://www.youtube.com/@4biddenknowledge"},
      {n:"The Why Files  -  video deep dives",                    u:"https://www.youtube.com/@TheWhyFiles"},
      {n:"UnchartedX  -  ancient stonework field research",       u:"https://www.youtube.com/@UnchartedX1"},
      {n:"Randall Carlson  -  Kosmographia & catastrophism",      u:"https://www.youtube.com/@RandallCarlson"},
      {n:"Robert Sepehr  -  anthropology & hidden history",       u:"https://www.youtube.com/@RobertSepehr"},
      {n:"Truthstream Media  -  deep research essays",            u:"https://www.youtube.com/@TruthstreamMedia"},
      {n:"Dr. Michael Heiser  -  biblical & Nephilim lectures",  u:"https://www.youtube.com/@DrMichaelSHeiser"},
      {n:"Book of Enoch Documentary (Stephen Quayle)",         u:"https://www.youtube.com/watch?v=q_CjAUoiVBk"},
      {n:"Forbidden Archaeology  -  Michael Cremo documentary",  u:"https://www.youtube.com/watch?v=OzDAnFMBvLc"},
      {n:"Jason Martell  -  Ancient technology & Anunnaki",       u:"https://www.youtube.com/@jasonmartell4"},
      {n:"Paul Wallis  -  Eden Series (5th Kind)",                u:"https://www.youtube.com/@PaulWallis5thKind"},
      {n:"The 5th Kind TV  -  Ancient gods & intervention",       u:"https://www.youtube.com/@The5thKind"},
    ],
  },

  // VIDEO CHANNELS  -  UAP, UFO & DISCLOSURE
  {
    label:"Video Channels  -  UAP, UFO & Disclosure",
    type:"podcast",
    items:[
      {n:"Jeremy Corbell  -  UAP documentary filmmaker",          u:"https://www.youtube.com/@JeremyCorbell"},
      {n:"James Fox  -  The Phenomenon documentary",              u:"https://www.youtube.com/@jamesfoxfilms"},
      {n:"Dr. Steven Greer  -  Disclosure Project",               u:"https://www.youtube.com/@StevenGreer"},
      {n:"Dr. Michael Salla  -  Exopolitics",                     u:"https://www.youtube.com/@ExopoliticsTV"},
      {n:"Richard Dolan  -  UAP history & analysis",              u:"https://www.youtube.com/@RichardDolanTV"},
      {n:"Leak Project  -  UAP & hidden knowledge",               u:"https://www.youtube.com/@LeakProject"},
      {n:"Edge of Wonder  -  UAP & paranormal",                   u:"https://www.youtube.com/@EdgeofWonder"},
      {n:"Suspicious Observers  -  Earth & space anomalies",      u:"https://www.youtube.com/@SuspiciousObservers"},
    ],
  },

  // VIDEO CHANNELS  -  PARANORMAL, MEDIUMS & SUPERNATURAL
  {
    label:"Video Channels  -  Paranormal, Mediums & Supernatural",
    type:"podcast",
    items:[
      {n:"James Van Praagh  -  medium & consciousness",           u:"https://www.youtube.com/@vanpraaghdotcom"},
      {n:"John Edward  -  psychic medium",                        u:"https://www.youtube.com/@JohnEdwardPsychicMedium"},
      {n:"Tyler Henry  -  Hollywood Medium",                      u:"https://www.youtube.com/@TylerHenry"},
      {n:"The Monroe Institute  -  consciousness & OBE",          u:"https://www.youtube.com/@TheMonroeInstitute"},
      {n:"Institute of Noetic Sciences  -  video lectures",       u:"https://www.youtube.com/@instituteofnoeticsciences"},
      {n:"The Century of the Self  -  Adam Curtis FREE",          u:"https://www.youtube.com/watch?v=eJ3RzGoQC4s"},
      {n:"HyperNormalisation  -  Adam Curtis FREE",               u:"https://www.youtube.com/watch?v=oJLqyuxm96k"},
      {n:"Universe Inside You  -  ancient knowledge",             u:"https://www.youtube.com/@UniverseInsideYou"},
      {n:"Zohar StarGate Ancient Discoveries  -  YouTube",        u:"https://www.youtube.com/@ZoharStarGateAncientDiscoveries"},
    ],
  },

  // FREE PDFS, PAPERS & ONLINE TEXTS
  {
    label:"Free PDFs, Papers & Online Texts",
    type:"archive",
    items:[
      {n:"Book of Enoch  -  Full Text FREE",                      u:"https://www.sacred-texts.com/bib/boe/"},
      {n:"Gospel of Mary Magdalene  -  Full Text FREE",           u:"https://gnosis.org/library/marygosp.htm"},
      {n:"Nag Hammadi Library  -  All texts FREE",                u:"https://gnosis.org/naghamm/nhl.html"},
      {n:"Gospel of Thomas  -  Full Text FREE",                   u:"https://www.sacred-texts.com/chr/thomas.htm"},
      {n:"Dead Sea Scrolls  -  Digital Library FREE",             u:"https://www.deadseascrolls.org.il"},
      {n:"CIA Gateway Process  -  Declassified PDF FREE",         u:"https://www.cia.gov/readingroom/docs/CIA-RDP96-00788R001700210016-3.pdf"},
      {n:"CIA Stargate Files  -  Remote Viewing declassified",    u:"https://www.cia.gov/readingroom/collection/stargate"},
      {n:"Project Blue Book  -  Declassified UFO files",          u:"https://www.fold3.com/title/44/project-blue-book"},
      {n:"Sacred Texts Archive  -  all ancient texts FREE",       u:"https://www.sacred-texts.com"},
      {n:"Internet Archive  -  millions of free books & docs",    u:"https://archive.org"},
      {n:"Project Gutenberg  -  70,000 free ebooks",             u:"https://www.gutenberg.org"},
      {n:"Plato's Timaeus  -  Original Atlantis account FREE",    u:"https://classics.mit.edu/Plato/timaeus.html"},
      {n:"Plato's Critias  -  Second Atlantis account FREE",      u:"https://classics.mit.edu/Plato/critias.html"},
    ],
  },

  // ARCHIVES & PRIMARY DOCUMENTS
  {
    label:"Archives & Primary Documents",
    type:"archive",
    items:[
      {n:"National Security Archive  -  declassified documents",  u:"https://nsarchive.gwu.edu"},
      {n:"CIA Reading Room  -  official declassified files",      u:"https://www.cia.gov/readingroom"},
      {n:"FBI Vault  -  declassified FBI files",                  u:"https://vault.fbi.gov"},
      {n:"FOIA.gov  -  US government FOIA portal",               u:"https://www.foia.gov"},
      {n:"WikiLeaks  -  leaked government documents",             u:"https://wikileaks.org"},
      {n:"MuckRock  -  FOIA request platform & results",          u:"https://www.muckrock.com"},
      {n:"DocumentCloud  -  primary document repository",         u:"https://www.documentcloud.org"},
      {n:"Vatican Apostolic Archive  -  Official",                u:"https://www.archivioapostolicovaticano.va"},
      {n:"Newspaper Archive  -  19th century historical papers",  u:"https://newspaperarchive.com"},
      {n:"AARO  -  Pentagon UAP reporting portal",                u:"https://www.aaro.mil"},
    ],
  },

  // UAP / UFO RESEARCHERS & INVESTIGATORS
  {
    label:"UAP / UFO Researchers & Investigators",
    type:"research",
    items:[
      {n:"Dr. Steven Greer  -  The Disclosure Project",           u:"https://siriusdisclosure.com"},
      {n:"Christopher Mellon  -  Dep. Asst. Sec. of Defense",    u:"https://www.christophermellon.net"},
      {n:"George Knapp  -  Investigative Journalist",             u:"https://www.georgeknapp.com"},
      {n:"To The Stars Academy",                                u:"https://www.tothestarsacademy.com"},
      {n:"Dr. Avi Loeb  -  Harvard Galileo Project",              u:"https://projects.iq.harvard.edu/galileo"},
      {n:"Dr. Garry Nolan  -  Stanford UAP Research",            u:"https://profiles.stanford.edu/garry-nolan"},
      {n:"NUFORC  -  National UFO Reporting Center",             u:"https://nuforc.org"},
    ],
  },

  // BIBLICAL SCHOLARS & NEPHILIM RESEARCHERS
  {
    label:"Biblical Scholars & Nephilim Researchers",
    type:"research",
    items:[
      {n:"GenSix  -  Tim Alberino (Enoch & Giants)",             u:"https://www.gensix.com"},
      {n:"Blue Letter Bible  -  Greek & Hebrew tools",            u:"https://www.blueletterbible.org"},
      {n:"Bible Gateway  -  All Translations",                    u:"https://www.biblegateway.com"},
      {n:"Prophecy News Watch",                                 u:"https://www.prophecynewswatch.com"},
      {n:"Early Church Fathers Online (CCEL)",                  u:"https://www.ccel.org"},
      {n:"Mauro Biglino  -  Biblical scholar, literal Elohim",   u:"https://maurobiglino.com"},
    ],
  },

  // PARANORMAL, SUPERNATURAL & MEDIUMS
  {
    label:"Paranormal, Supernatural & Mediums",
    type:"research",
    items:[
      {n:"James Van Praagh  -  Official Site",                    u:"https://vanpraagh.com"},
      {n:"John Edward  -  Psychic Medium",                        u:"https://www.johnedward.net"},
      {n:"Tyler Henry  -  Hollywood Medium",                      u:"https://www.tylerhenry.com"},
      {n:"Theresa Caputo  -  Long Island Medium",                 u:"https://theresacaputo.com"},
      {n:"The Warren Legacy  -  Ed & Lorraine Warren",            u:"https://www.warrens.net"},
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
      {n:"Drop Site News  -  Jeremy Scahill & Ryan Grim",        u:"https://www.dropsitenews.com"},
      {n:"Before It's News",                                    u:"https://beforeitsnews.com"},
      {n:"Epoch Times",                                         u:"https://www.theepochtimes.com"},
    ],
  },

  // SCIENCE & FORBIDDEN RESEARCH
  {
    label:"Science & Forbidden Research",
    type:"research",
    items:[
      {n:"AE911Truth  -  WTC Engineering Study",                  u:"https://www.ae911truth.org"},
      {n:"Whale & Dolphin Conservation",                        u:"https://us.whales.org"},
      {n:"Kimmela Center  -  Dr. Lori Marino dolphin science",   u:"https://www.kimmela.org"},
      {n:"Electric Universe / Thunderbolts",                    u:"https://www.thunderbolts.info"},
      {n:"NOAA Ocean Explorer",                                 u:"https://oceanexplorer.noaa.gov"},
      {n:"Institute of Noetic Sciences (IONS)",                 u:"https://noetic.org"},
      {n:"Global Research  -  Michel Chossudovsky",              u:"https://www.globalresearch.ca"},
    ],
  },

  // DOLPHINS  -  MILITARY PROGRAMS, GOVERNMENT FILES & INTELLIGENCE
  {
    label:"Dolphins  -  Military Programs, Government Files & Intelligence",
    type:"research",
    items:[
      {n:"US Navy NMMP  -  Official Marine Mammal Program",       u:"https://www.public.navy.mil/spawar/Pacific/TechTransfer/Pages/MarineMammalProgram.aspx"},
      {n:"NMMP Wikipedia  -  Full documented history",            u:"https://en.wikipedia.org/wiki/United_States_Navy_Marine_Mammal_Program"},
      {n:"History.com  -  How Dolphins Became Cold War Weapons",  u:"https://www.history.com/articles/navy-marine-mammal-program-history-dolphins-sea-lions"},
      {n:"NOAA Fisheries  -  Official MMPA dolphin FAQ",          u:"https://www.fisheries.noaa.gov/marine-life-distress/frequent-questions-feeding-or-harassing-marine-mammals-wild"},
      {n:"LegalClarity  -  MMPA full law breakdown",             u:"https://legalclarity.org/why-is-it-illegal-to-communicate-with-dolphins/"},
      {n:"Wild Dolphin Project  -  Dr. Herzing peer-reviewed",   u:"https://www.wilddolphinproject.org/media/scientific-publications/"},
      {n:"Cambridge Declaration on Consciousness 2012 PDF",    u:"https://fcmconference.org/img/CambridgeDeclarationOnConsciousness.pdf"},
      {n:"Sonar  -  Dolphin & Whale Personhood global movement", u:"https://wearesonar.org"},
      {n:"Vice  -  What We've Learned From Giving Dolphins LSD", u:"https://www.vice.com/en/article/what-weve-learned-from-giving-dolphins-lsd/"},
      {n:"Orion Magazine  -  Deep Intellect (Sy Montgomery)",    u:"https://orionmagazine.org/article/deep-intellect/"},
    ],
  },

  // VACCINES, BIG PHARMA & HEALTH FREEDOM
  {
    label:"Vaccines, Big Pharma & Health Freedom",
    type:"research",
    items:[
      {n:"VAERS  -  Vaccine Adverse Event Reporting System",      u:"https://vaers.hhs.gov"},
      {n:"OpenVAERS  -  Searchable VAERS visualization",         u:"https://openvaers.com"},
      {n:"Children's Health Defense  -  Robert F. Kennedy Jr.",  u:"https://childrenshealthdefense.org"},
      {n:"Dr. Peter McCullough  -  Substack",                    u:"https://petermcculloughmd.substack.com"},
      {n:"Dr. Robert Malone  -  Substack (mRNA inventor)",       u:"https://www.malone.news"},
      {n:"The Highwire  -  Del Bigtree health reporting",        u:"https://thehighwire.com"},
      {n:"FLCCC Alliance  -  Front Line COVID-19 Critical Care", u:"https://covid19criticalcare.com"},
      {n:"Informed Consent Action Network (ICAN)",             u:"https://www.icandecide.org"},
      {n:"National Vaccine Injury Compensation Program",       u:"https://www.hrsa.gov/vaccine-compensation"},
    ],
  },

  // TICKS, BIOWEAPONS & PLUM ISLAND
  {
    label:"Ticks, Bioweapons, Lyme Disease & Plum Island",
    type:"research",
    items:[
      {n:"BITTEN  -  Kris Newby Substack",                       u:"https://krisnewby.substack.com"},
      {n:"Bitten Book  -  HarperCollins (official)",             u:"https://www.harpercollins.com/products/bitten-kris-newby"},
      {n:"Lab 257  -  Michael Carroll (Plum Island research)",   u:"https://www.amazon.com/s?k=Lab+257+Michael+Carroll"},
      {n:"Congress Amendment  -  DoD Tick Bioweapons Investigation PDF", u:"https://chrissmith.house.gov/uploadedfiles/2021-09-22_americans_deserve_the_truth__did_dod_weaponize_ticks_with_lyme_disease.pdf"},
      {n:"LymeDisease.org  -  Patient advocacy & research",     u:"https://www.lymedisease.org"},
    ],
  },

  // FOOD SAFETY, FAKE MEAT & BIOTECH
  {
    label:"Food Safety, Fake Meat & Biotech Agenda",
    type:"research",
    items:[
      {n:"Food & Environment Reporting Network  -  Lab Meat",    u:"https://thefern.org"},
      {n:"FAO/WHO  -  53 Hazards in Cultured Meat report",      u:"https://www.fao.org/food-safety/scientific-advice/culturing-meat/en/"},
      {n:"Weston A. Price Foundation  -  Real food research",   u:"https://www.westonaprice.org"},
      {n:"Dr. Zach Bush  -  gut health, soil & food systems",   u:"https://zachbushmd.com"},
      {n:"Food Babe  -  Vani Hari food additive research",      u:"https://foodbabe.com"},
      {n:"Navdanya  -  Vandana Shiva GMO & seed research",      u:"https://www.navdanya.org"},
      {n:"Environmental Working Group  -  food & chemical safety",u:"https://www.ewg.org"},
    ],
  },

  // ANCIENT ADVANCED TECHNOLOGY & LOST CIVILIZATIONS
  {
    label:"Ancient Advanced Technology & Lost Civilizations",
    type:"research",
    items:[
      {n:"Ancient Code  -  Baalbek megalithic research",         u:"https://www.ancient-code.com"},
      {n:"Younger Dryas Impact  -  peer-reviewed papers",        u:"https://pubmed.ncbi.nlm.nih.gov/?term=younger+dryas+impact"},
      {n:"Atlantipedia  -  Comprehensive Atlantis research",     u:"https://atlantipedia.ie"},
      {n:"Edgar Cayce / ARE Institute  -  Atlantis readings",    u:"https://www.edgarcayce.org"},
    ],
  },

  // THE GODS, ANCIENT BEINGS & DIVINE COUNCIL
  {
    label:"The Gods, Ancient Beings & the Divine Council",
    type:"research",
    items:[
      {n:"World History Encyclopedia  -  Anunnaki & Sumerian gods",u:"https://www.worldhistory.org/Anunnaki/"},
      {n:"Myth of Adapa  -  World History Encyclopedia FREE",    u:"https://www.worldhistory.org/article/216/the-myth-of-adapa/"},
      {n:"Mystery Babylon  -  Bill Cooper archive",              u:"https://www.hourofthetime.com"},
      {n:"Theosophy  -  Blavatsky Secret Doctrine FREE text",    u:"https://www.sacred-texts.com/the/sd/index.htm"},
    ],
  },

  // SACRED GEOMETRY, FIBONACCI & ARCHITECTURE OF CREATION
  {
    label:"Sacred Geometry, Fibonacci & Architecture of Creation",
    type:"research",
    items:[
      {n:"Fibonacci in Nature  -  Wolfram MathWorld",            u:"https://mathworld.wolfram.com/GoldenRatio.html"},
      {n:"Jonathan Quintin  -  Sacred geometry art & research",  u:"https://www.gaia.com/series/open-minds"},
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
      {n:"Royal Rife Research  -  frequency healing",            u:"https://www.rife.org"},
      {n:"Schumann Resonance  -  Earth's base frequency",        u:"https://www.spaceweatherlive.com/en/solar-activity/schumann-resonance.html"},
      {n:"Dr. Joe Dispenza  -  Meditation & brain frequency",    u:"https://drjoedispenza.com"},
      {n:"Global Consciousness Project  -  Princeton",           u:"https://web.archive.org/web/2024/https://noosphere.princeton.edu/"},
      {n:"GreenMedInfo  -  Natural medicine research",           u:"https://greenmedinfo.com"},
      {n:"NOAA Geomagnetic Research  -  Earth field data",      u:"https://www.ngdc.noaa.gov/geomag/"},
    ],
  },

  // REMOTE VIEWING, PSI & GOVERNMENT PSYCHIC PROGRAMS
  {
    label:"Remote Viewing, PSI & Government Psychic Programs",
    type:"archive",
    items:[
      {n:"IRP.fas.org  -  STAR GATE full program history",       u:"https://irp.fas.org/program/collect/stargate.htm"},
      {n:"Black Vault  -  Stargate declassified archive",        u:"https://www.theblackvault.com/documentarchive/project-star-gate/"},
      {n:"Hal Puthoff  -  physicist & Stargate lead scientist",  u:"https://www.earthancients.com"},
      {n:"Russell Targ  -  laser physicist & remote viewing",    u:"https://www.espresearch.com"},
      {n:"Ingo Swann  -  remote viewing co-creator archive",     u:"https://www.biomindsuperpowers.com"},
      {n:"Joe McMoneagle  -  Army Stargate viewer",              u:"https://www.remoteviewingonline.com"},
      {n:"Courtney Brown  -  Farsight Institute",                u:"https://farsight.org"},
      {n:"Journal of Scientific Exploration  -  PSI research",  u:"https://journalofscientificexploration.org"},
    ],
  },

  // PORTALS, STARGATES & INTERDIMENSIONAL RESEARCH
  {
    label:"Portals, Stargates & Interdimensional Research",
    type:"research",
    items:[
      {n:"Academic Block  -  Stargates & Portals research",      u:"https://www.academicblock.com/science/fringe-science/stargates-and-portals"},
      {n:"Sacred Illusion  -  Stargates & Doors to Nowhere",     u:"https://www.sacredillusion.com/stargates-and-doors-to-nowhere-portals-illusions-or-entrances-to-elsewhere/"},
      {n:"CERN  -  Official LHC extra dimensions research",      u:"https://home.cern/science/experiments/lhc"},
      {n:"Sedona Anomalies  -  Portal & vortex research",        u:"https://sedonanomalies.com"},
    ],
  },

  // SUMERIAN TEXTS  -  ADAPA, ANKI, ENLIL & ANUNNAKI
  {
    label:"Sumerian Texts  -  Adapa, Anki, Enlil & Anunnaki",
    type:"archive",
    items:[
      {n:"Myth of Adapa  -  Full Text FREE (Sacred Texts)",      u:"https://sacred-texts.com/ane/adapa.htm"},
      {n:"Sumer Fandom  -  Adapa, Enlil, An mythology database", u:"https://sumer.fandom.com"},
      {n:"Founder Hypothesis  -  Sumerian myth translations",    u:"https://founder-hypothesis.com/en/sumerian-mythology/"},
    ],
  },

  // CHRONOVISOR, TIME TRAVEL & VATICAN SECRETS
  {
    label:"Chronovisor, Time Travel & Vatican Secrets",
    type:"research",
    items:[
      {n:"Project Unredacted  -  Chronovisor: Vatican Time Machine", u:"https://www.projectunredacted.com/cases/chronovisor-vatican-time-machine"},
      {n:"Ancient Origins  -  Chronovisor Vatican Time Device",  u:"https://www.ancient-origins.net/news-science-space/chronovisor-vatican-time-machine-00102422"},
      {n:"All That's Interesting  -  Legend of the Chronovisor", u:"https://allthatsinteresting.com/chronovisor"},
      {n:"Gaia  -  Vatican Chronovisor Time Travel Device",      u:"https://www.gaia.com/article/the-chronovisor-the-vaticans-mysterious-time-travel-device"},
    ],
  },

  // SEDONA VORTEX, ELECTROMAGNETIC & EARTH ENERGY
  {
    label:"Sedona Vortex, Electromagnetic & Earth Energy",
    type:"research",
    items:[
      {n:"Visit Sedona  -  Official Vortex Guide",               u:"https://visitsedona.com/spiritual-wellness/what-is-a-vortex/"},
      {n:"Sedona Vortex Adventures  -  Seven Vortex Sites",      u:"https://sedonavortexsites.com"},
      {n:"Free Soul Foundation  -  Pete Sanders MIT vortex",     u:"https://freesoul.net"},
    ],
  },

  // DNA, FREQUENCY, EPIGENETICS & CONSCIOUSNESS
  {
    label:"DNA, Frequency, Epigenetics & Consciousness",
    type:"research",
    items:[
      {n:"George Church Lab Harvard  -  DNA, CRISPR, synthetic biology", u:"https://arep.med.harvard.edu"},
      {n:"Personal Genome Project  -  George Church",            u:"https://www.personalgenomes.org"},
      {n:"Regenesis  -  George Church book (Hachette)",          u:"https://www.hachettebookgroup.com/titles/george-m-church/regenesis/9780465038657/"},
      {n:"NIH PubMed  -  Epigenetics peer-reviewed papers",      u:"https://pubmed.ncbi.nlm.nih.gov/?term=epigenetics"},
    ],
  },

  // MARY MAGDALENE, EMERALD TABLETS & HIDDEN GNOSTIC TEXTS
  {
    label:"Mary Magdalene, Emerald Tablets & Hidden Gnostic Texts",
    type:"archive",
    items:[
      {n:"Elaine Pagels  -  Gospel of Thomas (PBS Frontline)",   u:"https://www.pbs.org/wgbh/pages/frontline/shows/religion/maps/primary/thomas.html"},
      {n:"Meggan Watterson  -  Mary Magdalene research",         u:"https://www.megganwatterson.com"},
    ],
  },

  // GOLDILOCKS ZONE, SIMULATION THEORY & REALITY
  {
    label:"Goldilocks Zone, Simulation Theory & The Nature of Reality",
    type:"research",
    items:[
      {n:"NASA  -  Goldilocks Zone habitable exoplanet research", u:"https://exoplanets.nasa.gov/search-for-life/goldilocks/"},
      {n:"SETI Institute  -  Search for extraterrestrial intelligence", u:"https://www.seti.org"},
      {n:"Tom Campbell  -  My Big TOE (Theory of Everything)",   u:"https://www.my-big-toe.com"},
    ],
  },

  // FORBIDDEN KNOWLEDGE  -  VIDEO PLATFORMS & SUPPRESSED SITES
  {
    label:"Forbidden Knowledge  -  Video Platforms & Suppressed Sites",
    type:"blog",
    items:[
      {n:"Forbidden Knowledge TV  -  Alexandra Bruce",           u:"https://forbiddenknowledgetv.net/home"},
      {n:"Forbidden Knowledge News  -  daily paranormal research",u:"https://forbiddenknowledge.news"},
      {n:"Dark Journalist  -  X-Series UAP & deep state",        u:"https://www.darkjournalist.com"},
      {n:"The Solari Report  -  Catherine Austin Fitts",         u:"https://home.solari.com"},
      {n:"Redacted with Clayton Morris  -  daily suppressed news",u:"https://www.redacted.inc"},
      {n:"SGT Report  -  deep state & financial research",       u:"https://www.sgtreport.com"},
      {n:"The Vigilant Citizen  -  occult symbolism & decoding", u:"https://vigilantcitizen.com"},
      {n:"Need To Know News  -  dark journalism aggregator",     u:"https://needtoknow.news"},
      {n:"Collective Evolution  -  consciousness & science",     u:"https://www.ce1.com"},
      {n:"The Freedom Articles  -  Makia Freeman",               u:"https://thefreedomarticles.com"},
    ],
  },

  // DAVID PAULIDES  -  MISSING 411 & CANAM MISSING
  {
    label:"David Paulides  -  Missing 411 & CanAm Missing Research",
    type:"research",
    items:[
      {n:"Missing411.com  -  Official Paulides site",            u:"https://missing411.com"},
      {n:"CanAm Missing Project  -  active case files",          u:"https://www.canammissing.com"},
      {n:"David Paulides YouTube",                             u:"https://www.youtube.com/@DavidPaulides"},
      {n:"Missing 411 Western US  -  first book (Amazon)",       u:"https://www.amazon.com/s?k=Missing+411+Western+United+States+Paulides"},
      {n:"Missing 411 Eastern US (Amazon)",                    u:"https://www.amazon.com/s?k=Missing+411+Eastern+United+States+Paulides"},
      {n:"Missing 411 The Hunted  -  documentary (Amazon)",      u:"https://www.amazon.com/s?k=Missing+411+Hunted+documentary"},
      {n:"r/Missing411  -  Reddit community",                    u:"https://www.reddit.com/r/Missing411"},
    ],
  },

  // PODCASTS  -  CONSPIRACY, ANOMALOUS & HIDDEN KNOWLEDGE
  {
    label:"Podcasts  -  Conspiracy, Anomalous & Hidden Knowledge",
    type:"podcast",
    items:[
      {n:"Stuff They Don't Want You to Know (iHeart)",         u:"https://www.iheart.com/podcast/182-stuff-they-dont-want-you-17913675/"},
      {n:"Conspiracy Theories (Spotify Parcast)",              u:"https://open.spotify.com/show/5RdShpOtxKO3ZWohR2M6Sv"},
      {n:"Tin Foil Hat with Sam Tripoli",                      u:"https://www.samtripoli.com"},
      {n:"Those Conspiracy Guys",                              u:"https://podcasts.apple.com/ie/podcast/those-conspiracy-guys/id1045368769"},
      {n:"Corbett Report Podcast  -  full transcripts",          u:"https://www.corbettreport.com/podcasts/"},
      {n:"The Higherside Chats  -  Greg Carlwood",               u:"https://www.thehighersidechats.com"},
      {n:"Fade to Black  -  Jimmy Church Radio",                 u:"https://jimmychurchradio.com"},
      {n:"Ground Zero with Clyde Lewis",                       u:"https://groundzeromedia.org"},
      {n:"Coast to Coast AM  -  Art Bell/George Noory archive",  u:"https://www.coasttocoastam.com"},
      {n:"Blurry Creatures  -  paranormal & biblical mysteries", u:"https://www.blurrycreatures.com"},
      {n:"Geopolitics & Empire  -  Hrvoje Moric",               u:"https://geopoliticsandempire.com"},
      {n:"No Agenda  -  Adam Curry & John C. Dvorak",           u:"https://www.noagendashow.net"},
      {n:"Earth Ancients  -  ancient history & Emerald Tablets", u:"https://www.spreaker.com/podcast/earth-ancients--2790919"},
    ],
  },

  // PEER-REVIEWED JOURNALS  -  ANOMALOUS & SUPPRESSED RESEARCH
  {
    label:"Peer-Reviewed Journals  -  Anomalous & Suppressed Research",
    type:"research",
    items:[
      {n:"Journal of Anomalous Experience & Cognition (JAEX)", u:"https://journals.lub.lu.se/jaex"},
      {n:"Journal of Parapsychology  -  Rhine Research Center",  u:"https://www.rhine.org/what-we-do/journal-of-parapsychology.html"},
      {n:"Journal of Near-Death Studies  -  IANDS",              u:"https://iands.org/research/publications/journal-of-near-death-studies.html"},
      {n:"Explore: Journal of Science & Healing",              u:"https://www.explorejournal.com"},
      {n:"Medical Hypotheses  -  Elsevier",                      u:"https://www.sciencedirect.com/journal/medical-hypotheses"},
      {n:"Nexus Magazine  -  UAP, fringe science & conspiracy",  u:"https://www.nexusmagazine.com"},
      {n:"Fate Magazine  -  strange phenomena since 1948",       u:"https://www.fatemagazine.com"},
      {n:"Lobster Magazine  -  parapolitics research UK",        u:"https://www.lobster-magazine.co.uk"},
    ],
  },

  // REDDIT COMMUNITIES
  {
    label:"Reddit Communities  -  Full Expanded List",
    type:"user",
    items:[
      {n:"r/conspiracy  -  1.9M members",                        u:"https://www.reddit.com/r/conspiracy"},
      {n:"r/conspiracytheories",                               u:"https://www.reddit.com/r/conspiracytheories"},
      {n:"r/C_S_T  -  Critical Speculative Theory",              u:"https://www.reddit.com/r/C_S_T"},
      {n:"r/conspiracyfact  -  confirmed conspiracies",          u:"https://www.reddit.com/r/conspiracyfact"},
      {n:"r/UFOs  -  UAP sightings & disclosure",                u:"https://www.reddit.com/r/UFOs"},
      {n:"r/HighStrangeness  -  paranormal & unexplained",       u:"https://www.reddit.com/r/HighStrangeness"},
      {n:"r/Paranormal",                                       u:"https://www.reddit.com/r/Paranormal"},
      {n:"r/UAP",                                              u:"https://www.reddit.com/r/UAP"},
      {n:"r/aliens",                                           u:"https://www.reddit.com/r/aliens"},
      {n:"r/SkinWalkerRanch",                                  u:"https://www.reddit.com/r/SkinWalkerRanch"},
      {n:"r/AlternativeHistory",                               u:"https://www.reddit.com/r/AlternativeHistory"},
      {n:"r/AncientAliens",                                    u:"https://www.reddit.com/r/AncientAliens"},
      {n:"r/ancientcivilizations",                             u:"https://www.reddit.com/r/ancientcivilizations"},
      {n:"r/GrahamHancock",                                    u:"https://www.reddit.com/r/GrahamHancock"},
      {n:"r/Anunnaki",                                         u:"https://www.reddit.com/r/Anunnaki"},
      {n:"r/Giants  -  Nephilim & giant beings",                 u:"https://www.reddit.com/r/Giants"},
      {n:"r/biblestudy",                                       u:"https://www.reddit.com/r/biblestudy"},
      {n:"r/Lyme  -  Lyme disease research",                     u:"https://www.reddit.com/r/Lyme"},
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
      {n:"Above Top Secret (ATS)  -  the original conspiracy forum", u:"https://www.abovetopsecret.com"},
      {n:"Godlike Productions (GLP)",                          u:"https://www.godlikeproductions.com"},
      {n:"David Icke Forum  -  official community",              u:"https://forum.davidicke.com"},
      {n:"Project Avalon  -  Bill Ryan alternative research",    u:"https://projectavalon.net"},
      {n:"Rumble  -  uncensored video platform",                 u:"https://rumble.com"},
      {n:"Telegram  -  alternative media channels",              u:"https://telegram.org"},
      {n:"Gab  -  free speech alternative platform",             u:"https://gab.com"},
      {n:"Odysee/LBRY  -  decentralized video platform",        u:"https://odysee.com"},
      {n:"BitChute  -  alternative video hosting",               u:"https://www.bitchute.com"},
      {n:"Substack  -  independent newsletter platform",         u:"https://substack.com"},
      {n:"4chan /x/ board  -  paranormal & conspiracy",          u:"https://boards.4channel.org/x/"},
      {n:"Unexplained Mysteries Forum",                        u:"https://www.unexplained-mysteries.com/forum/"},
      {n:"Fortean Times Forum",                                u:"https://www.forteantimes.com/forum"},
    ],
  },

  // FACEBOOK GROUPS  -  ACTIVE RESEARCH COMMUNITIES
  {
    label:"Facebook Groups  -  Active Research Communities",
    type:"user",
    items:[
      {n:"Ancient Aliens & UFOs (Facebook Group)",             u:"https://www.facebook.com/groups/AncientAliensUFOs"},
      {n:"4biddenknowledge  -  Billy Carson Community",          u:"https://www.facebook.com/4biddenknowledge"},
      {n:"Dolores Cannon  -  QHHT Community Group",              u:"https://www.facebook.com/groups/dolorescannon"},
      {n:"David Icke Forum Community Page",                    u:"https://www.facebook.com/davidicke"},
      {n:"Graham Hancock  -  Official Page",                     u:"https://www.facebook.com/Author.GrahamHancock"},
      {n:"Wes Penre Papers Community",                         u:"https://www.facebook.com/groups/wespenrepapers"},
      {n:"Emerald Tablets & Thoth Research",                   u:"https://www.facebook.com/groups/emeraldtablets"},
      {n:"Ancient Sumerian & Anunnaki Research",               u:"https://www.facebook.com/groups/anunnaki.research"},
      {n:"Forbidden Archaeology & Alternative History",        u:"https://www.facebook.com/groups/forbiddenarchaeology"},
      {n:"Book of Enoch Studies Group",                        u:"https://www.facebook.com/groups/bookofenoch"},
      {n:"Simulation Theory  -  Are We in a Matrix?",           u:"https://www.facebook.com/groups/simulationtheory"},
      {n:"DNA, Epigenetics & Consciousness Research",          u:"https://www.facebook.com/groups/epigenetics.consciousness"},
      {n:"Gregg Braden  -  Science & Spirituality Community",   u:"https://www.facebook.com/greggbradenofficial"},
      {n:"UAP Disclosure  -  UFO Research Community",           u:"https://www.facebook.com/groups/uapdisclosure"},
      {n:"Missing 411  -  Paulides Research Community",         u:"https://www.facebook.com/groups/missing411research"},
    ],
  },

  // ALTERNATIVE NEWS AGGREGATORS
  {
    label:"Alternative News Aggregators & Link Hubs",
    type:"news",
    items:[
      {n:"Natural News  -  Mike Adams",                          u:"https://www.naturalnews.com"},
      {n:"State of the Nation  -  deep state & alternative news",u:"https://stateofthenation.co"},
      {n:"What Really Happened  -  Michael Rivero",             u:"https://www.whatreallyhappened.com"},
      {n:"21st Century Wire  -  Patrick Henningsen",            u:"https://21stcenturywire.com"},
      {n:"End of the American Dream  -  Michael Snyder",        u:"https://endoftheamericandream.com"},
    ],
  },


  // REDDIT  -  UFO, UAP & DISCLOSURE
  {
    label:"Reddit  -  UFO, UAP, Aliens & Disclosure",
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

  // REDDIT  -  CONSPIRACY & GOVERNMENT
  {
    label:"Reddit  -  Conspiracy, Government & Deep State",
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

  // REDDIT  -  PARANORMAL & SUPERNATURAL
  {
    label:"Reddit  -  Paranormal, Supernatural & Cryptids",
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

  // REDDIT  -  ANCIENT HISTORY & ALTERNATIVE ARCHAEOLOGY
  {
    label:"Reddit  -  Ancient History, Lost Civilizations & Alternative Archaeology",
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

  // REDDIT  -  CONSCIOUSNESS, SPIRITUALITY & SIMULATION
  {
    label:"Reddit  -  Consciousness, Spirituality, Simulation & Metaphysics",
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

  // REDDIT  -  SCIENCE, FRINGE & ALTERNATIVE
  {
    label:"Reddit  -  Fringe Science, Alternative Theories & Research",
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

  // REDDIT  -  SPACE, ASTRONOMY & SETI
  {
    label:"Reddit  -  Space, Astronomy, SETI & Cosmic Mysteries",
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

  // REDDIT  -  INTERNET MYSTERIES, CREEPY & LIMINAL
  {
    label:"Reddit  -  Internet Mysteries, Creepy & Liminal Spaces",
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

  // REDDIT  -  POPULAR & CROSSOVER
  {
    label:"Reddit  -  Popular Crossover & Research Hubs",
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

  // ERIC WEINSTEIN  -  GEOMETRIC UNITY, PORTAL PODCAST & SUPPRESSED PHYSICS
  {
    label:"Eric Weinstein  -  Geometric Unity, Portal Podcast & Suppressed Physics",
    type:"research",
    items:[
      {n:"GeometricUnity.org  -  Official Theory Archive",                u:"https://geometricunity.org/"},
      {n:"Oxford 2013 Lecture  -  Geometric Unity Full Transcript",       u:"https://geometricunity.org/2013-oxford-lecture/"},
      {n:"Oxford Mathematical Institute  -  Official Lecture Listing",    u:"https://www.maths.ox.ac.uk/node/10511"},
      {n:"The Portal Group  -  Eric Weinstein Podcast (theportal.group)", u:"https://theportal.group/"},
      {n:"The Portal Wiki  -  Geometric Unity Theory Deep Dive",          u:"https://theportal.wiki/wiki/Theory_of_Geometric_Unity"},
      {n:"Eric Weinstein Wikipedia  -  Biography & Controversy",          u:"https://en.wikipedia.org/wiki/Eric_Weinstein"},
      {n:"Physics Forums  -  Geometric Unity Critical Analysis",          u:"https://www.physicsforums.com/threads/eric-weinsteins-geometric-unity-theory.987222/"},
      {n:"Peter Woit  -  Not Even Wrong (String Theory & GU criticism)",  u:"https://www.math.columbia.edu/~woit/wordpress/?p=5927"},
      {n:"JRE #2503  -  Eric Weinstein on UAP, Epstein & White Sands",   u:"https://www.shortform.com/podcast/episode/the-joe-rogan-experience-2026-05-21-episode-summary-2503-eric-weinstein"},
      {n:"IBTimes  -  Weinstein Claims Government Recruited Him for UAP Disclosure", u:"https://www.ibtimes.co.uk/eric-weinstein-government-ufo-disclosure-1798302"},
      {n:"Point of Contact  -  UFO Skeptic Eric Weinstein Comes Around",  u:"https://medium.com/on-the-trail-of-the-saucers/ufo-skeptic-eric-weinstein-comes-around-1be22166b533"},
      {n:"r/EricWeinstein  -  Reddit Community",                          u:"https://www.reddit.com/r/EricWeinstein"},
      {n:"r/ThePortal  -  Eric Weinstein's Portal Podcast Community",     u:"https://www.reddit.com/r/ThePortal"},
    ],
  },

  // NEIL MCCASLAND & UAP-CONNECTED GOVERNMENT FIGURES
  {
    label:"Gen. Neil McCasland Disappearance & UAP-Connected Government Cases",
    type:"research",
    items:[
      {n:"NewsNation  -  Ross Coulthart: McCasland a Grave National Security Crisis", u:"https://www.newsnationnow.com/missing/mccasland-disappearance-national-security-concern-ufo-uap/"},
      {n:"CNN  -  FBI Joins Search for Missing AF General with UAP Knowledge",        u:"https://www.cnn.com/2026/03/11/us/retired-air-force-general-fbi-search"},
      {n:"ABC7  -  McCasland Led Wright-Patterson Base Steeped in UFO Theories",      u:"https://abc7.com/post/william-neil-mccasland-missing-retired-air-force-major-general-led-wright-patterson-ohio-base-steeped-ufo-theories/18724549/"},
      {n:"Fox News  -  Missing General Consulted UFOs for Blink-182's Tom DeLonge",  u:"https://www.foxnews.com/us/missing-retired-air-force-general-consulted-ufos-blink-182s-tom-delonge.print"},
      {n:"NY Post  -  McCasland Vanished With Hiking Boots and Revolver",             u:"https://www.aol.com/articles/missing-retired-us-air-force-141029972.html"},
      {n:"Neil McCasland Wikipedia  -  Full Biography & Disappearance Record",        u:"https://en.wikipedia.org/wiki/Neil_McCasland"},
      {n:"That UFO Podcast  -  Eric Davis, Eric Weinstein, McCasland & Withheld UAP", u:"https://podcasts.apple.com/us/podcast/eric-davis-eric-weinstein-withheld-uap-videos-portal/id1511121397?i=1000754445569"},
      {n:"Air Force Research Laboratory  -  Wright-Patterson (McCasland commanded)",  u:"https://www.afrl.af.mil"},
    ],
  },

  // THEORY OF EVERYTHING  -  TOE RESEARCHERS, PODCASTS & FRAMEWORKS
  {
    label:"Theory of Everything  -  TOE Researchers, Podcasts & Unified Physics",
    type:"research",
    items:[
      {n:"Theories of Everything  -  Curt Jaimungal (YouTube & Podcast)",  u:"https://www.youtube.com/@TheoriesofEverything"},
      {n:"Curt Jaimungal  -  Substack (early access & writings)",           u:"https://curtjaimungal.substack.com"},
      {n:"Theory of Everything  -  Wikipedia (full overview)",              u:"https://en.wikipedia.org/wiki/Theory_of_everything"},
      {n:"Big Think  -  All TOE Theories Are Probably Wrong (Ethan Siegel)",u:"https://bigthink.com/starts-with-a-bang/theories-of-everything/"},
      {n:"Phys.org  -  New Quantum Theory of Gravity (2025)",              u:"https://phys.org/news/2025-05-quantum-theory-gravity-sought-crucial.html"},
      {n:"Loop Quantum Gravity  -  Lee Smolin, Perimeter Institute",        u:"https://www.perimeterinstitute.ca"},
      {n:"Wolfram Physics Project  -  Stephen Wolfram TOE",                 u:"https://www.wolframphysics.org"},
      {n:"Quantum Gravity Research  -  Klee Irwin",                         u:"https://www.quantumgravityresearch.org"},
      {n:"Garrett Lisi  -  E8 Theory (alternative TOE)",                    u:"https://www.ted.com/talks/garrett_lisi_on_his_theory_of_everything"},
    ],
  },

  // STRING THEORY CRITICISM & PHYSICS ESTABLISHMENT CRITIQUE
  {
    label:"String Theory Criticism & Physics Establishment Critique",
    type:"research",
    items:[
      {n:"Not Even Wrong  -  Peter Woit (Columbia) blog & criticism",       u:"https://www.math.columbia.edu/~woit/wordpress/"},
      {n:"Peter Woit  -  Not Even Wrong book (string theory failure)",      u:"https://www.amazon.com/s?k=Not+Even+Wrong+Peter+Woit"},
      {n:"Lee Smolin  -  The Trouble with Physics (book)",                  u:"https://www.amazon.com/s?k=Trouble+With+Physics+Lee+Smolin"},
      {n:"Lee Smolin  -  Perimeter Institute research",                     u:"https://www.perimeterinstitute.ca/people/lee-smolin"},
      {n:"Backreaction  -  Sabine Hossenfelder physics criticism blog",     u:"https://www.backreaction.blogspot.com"},
      {n:"Sabine Hossenfelder  -  Lost in Math (book, physics beauty myth)",u:"https://www.amazon.com/s?k=Lost+in+Math+Hossenfelder"},
      {n:"Physics World  -  Still Not Even Wrong (10yr retrospective)",     u:"https://physicsworld.com/a/still-not-even-wrong/"},
      {n:"Nature Physics  -  Tied Up With String? (string theory critique)",u:"https://www.nature.com/articles/nphys460"},
      {n:"Theories of Everything  -  Curt Jaimungal string theory iceberg", u:"https://www.youtube.com/watch?v=X4PdPnQuwjY"},
    ],
  },

  // THE GALILEO PROJECT  -  HARVARD UAP SCIENTIFIC RESEARCH
  {
    label:"The Galileo Project  -  Harvard UAP Scientific Research",
    type:"research",
    items:[
      {n:"Galileo Project  -  Official Harvard Site",                       u:"https://galileo.hsites.harvard.edu/"},
      {n:"Galileo Project  -  Wikipedia overview",                          u:"https://en.wikipedia.org/wiki/The_Galileo_Project"},
      {n:"Avi Loeb  -  Harvard CfA official page & opinion archive",       u:"https://lweb.cfa.harvard.edu/~loeb/Opinion.html"},
      {n:"Avi Loeb  -  Medium (daily writings on UAP & science)",          u:"https://avi-loeb.medium.com/"},
      {n:"Harvard Crimson  -  Las Vegas Sphere Observatory (Nov 2025)",    u:"https://www.thecrimson.com/article/2025/11/6/las-vegas-sphere-observatory-avi-loeb/"},
      {n:"New Space Economy  -  Galileo Project Scientific Search",         u:"https://newspaceeconomy.ca/2025/08/20/the-galileo-project-a-scientific-search-for-extraterrestrial-technology/"},
      {n:"Journal of Astronomical Instrumentation  -  Galileo Project overview (peer-reviewed)", u:"https://www.worldscientific.com/doi/10.1142/S2251171723400032"},
      {n:"Avi Loeb  -  Extraterrestrial book (Amazon)",                     u:"https://www.amazon.com/s?k=Extraterrestrial+Avi+Loeb"},
    ],
  },

  // INTELLECTUAL DARK WEB  -  OFFICIAL SOURCES & MEMBERS
  {
    label:"Intellectual Dark Web  -  Official Sources & Key Members",
    type:"research",
    items:[
      {n:"Eric Weinstein  -  coined the term IDW on Joe Rogan Experience",  u:"https://www.youtube.com/results?search_query=Eric+Weinstein+intellectual+dark+web"},
      {n:"NY Times  -  Meet the Renegades of the IDW (Bari Weiss, 2018)",  u:"https://www.nytimes.com/2018/05/08/opinion/intellectual-dark-web.html"},
      {n:"Bret Weinstein  -  DarkHorse Podcast",                            u:"https://www.youtube.com/@BretWeinstein"},
      {n:"Bret Weinstein  -  Official Site",                                u:"https://bretweinstein.net/"},
      {n:"Heather Heying  -  Official Site",                                u:"https://heatherheying.com/"},
      {n:"Sam Harris  -  Making Sense Podcast",                             u:"https://www.samharris.org/podcasts"},
      {n:"Jordan Peterson  -  Official Site",                               u:"https://www.jordanpeterson.com"},
      {n:"Rebel Wisdom  -  David Fuller IDW documentary",                   u:"https://www.youtube.com/results?search_query=rebel+wisdom+intellectual+dark+web"},
      {n:"The Critic  -  Why the IDW Failed (critical analysis)",           u:"https://thecritic.co.uk/why-the-intellectual-dark-web-has-failed/"},
    ],
  },

  // SCIENTIFIC GATEKEEPING, INSTITUTIONAL CORRUPTION & SUPPRESSED SCIENCE
  {
    label:"Scientific Gatekeeping, Institutional Corruption & Suppressed Science",
    type:"research",
    items:[
      {n:"Retraction Watch  -  tracking retracted scientific papers",        u:"https://retractionwatch.com"},
      {n:"The Replication Crisis  -  Nature overview",                       u:"https://www.nature.com/articles/533452a"},
      {n:"Science Fictions  -  Stuart Ritchie (book on research fraud)",    u:"https://www.amazon.com/s?k=Science+Fictions+Stuart+Ritchie"},
      {n:"Broken Science Initiative  -  critiquing bad statistical methods", u:"https://www.brokenscience.org"},
      {n:"Censored Science  -  suppressed research archive",                 u:"https://censoredscience.com"},
      {n:"John Ioannidis  -  Why Most Published Research Findings Are False (free paper)", u:"https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.0020124"},
      {n:"Rupert Sheldrake  -  Science Set Free (morphic resonance)",        u:"https://www.sheldrake.org"},
      {n:"Rupert Sheldrake  -  10 Dogmas of Modern Science (TED talk banned)",u:"https://www.sheldrake.org/research/the-ten-dogmas-of-modern-science"},
    ],
  },

  // ALTERNATIVE COSMOLOGY & ELECTRIC UNIVERSE
  {
    label:"Alternative Cosmology, Electric Universe & Plasma Physics",
    type:"research",
    items:[
      {n:"Thunderbolts Project  -  YouTube channel",                         u:"https://www.youtube.com/@ThunderboltsProject"},
      {n:"Plasma Cosmology  -  Hannes Alfven Nobel laureate research",       u:"https://www.plasma-universe.com"},
      {n:"Big Think  -  Problems with the Standard Cosmological Model",      u:"https://bigthink.com/starts-with-a-bang/"},
      {n:"Wallace Thornhill  -  Electric Universe Theory",                   u:"https://www.holoscience.com"},
      {n:"r/ElectricUniverse  -  Reddit community",                          u:"https://www.reddit.com/r/ElectricUniverse"},
    ],
  },

  // ELITE NETWORKS, HIDDEN POWER STRUCTURES & EPSTEIN CONNECTIONS
  {
    label:"Elite Networks, Hidden Power Structures & Epstein Research",
    type:"research",
    items:[
      {n:"MindMatters  -  Epstein network & elite intelligence analysis",    u:"https://www.sott.net"},
      {n:"Miami Herald  -  Julie K. Brown Epstein investigation archive",   u:"https://www.miamiherald.com/news/local/article220097825.html"},
      {n:"Council on Foreign Relations  -  elite policy network (official)", u:"https://www.cfr.org"},
      {n:"Trilateral Commission  -  official site (elite policy network)",   u:"https://www.trilateral.org"},
      {n:"Bilderberg Meetings  -  official site & attendee list",            u:"https://www.bilderbergmeetings.org"},
      {n:"World Economic Forum  -  Davos elite network (official)",          u:"https://www.weforum.org"},
    ],
  },
  // FINANCE, FEDERAL RESERVE & INDEPENDENT JOURNALISM
  {
    label:"Finance, Federal Reserve & Independent Journalism",
    type:"research",
    items:[
      {n:"G. Edward Griffin - Creature from Jekyll Island",           u:"https://www.realityzone.com/creaturejekyllisland.html"},
      {n:"Federal Reserve - Official FRED Economic Data",             u:"https://fred.stlouisfed.org"},
      {n:"Fed Audit - Audit the Fed Campaign (Ron Paul)",             u:"https://www.auditthefed.com"},
      {n:"Mises Institute - Austrian Economics research",             u:"https://mises.org"},
      {n:"Corbett Report - Century of Enslavement: The Fed",         u:"https://www.corbettreport.com/federalreserve/"},
      {n:"Lex Fridman Podcast - Apple Podcasts",                     u:"https://podcasts.apple.com/us/podcast/lex-fridman-podcast/id1434243584"},
      {n:"Corbett Report Podcast - Apple Podcasts",                  u:"https://podcasts.apple.com/us/podcast/the-corbett-report/id836339988"},
      {n:"Hidden Secrets of Money - Apple Podcasts",                 u:"https://podcasts.apple.com/us/podcast/hidden-secrets-of-money/id617694920"},
      {n:"Lex Fridman Podcast - Spotify",                            u:"https://open.spotify.com/show/2MAi0BvDc6GTFvKFPXnkCL"},
      {n:"Hidden Forces - Demetri Kofinas - Spotify",                u:"https://open.spotify.com/show/0TqBbBXTSk7JKLlDiWCmTI"},
      {n:"Lex Fridman - YouTube Channel",                            u:"https://www.youtube.com/@lexfridman"},
      {n:"Mike Maloney - Hidden Secrets of Money - YouTube",         u:"https://www.youtube.com/@MikeMaloneyGold"},
      {n:"Zeitgeist: Addendum (Federal Reserve) - YouTube FREE",     u:"https://www.youtube.com/watch?v=Ez6oRDQj2WI"},
      {n:"Naked Capitalism - banking & finance investigative blog",   u:"https://www.nakedcapitalism.com"},
      {n:"Wall Street On Parade - independent Wall Street journalism",u:"https://wallstreetonparade.com"},
    ],
  },

  // EMERGING & ADDITIONAL SOURCES - 2025-2026
  {
    label:"Independent Journalists & Investigators",
    type:"blog",
    items:[
      {n:"Seymour Hersh - SubStack (Pulitzer Prize investigative)",    u:"https://seymourhersh.substack.com"},
      {n:"Glenn Greenwald - System Update (Rumble)",                  u:"https://rumble.com/c/GGreenwald"},
      {n:"Aaron Mate - The Grayzone",                                 u:"https://thegrayzone.com/author/aaron-mate/"},
      {n:"Max Blumenthal - The Grayzone",                             u:"https://thegrayzone.com/author/max-blumenthal/"},
      {n:"Kit Klarenberg - The Grayzone",                             u:"https://thegrayzone.com/author/kit-klarenberg/"},
      {n:"Michael Shellenberger - Public Substack",                   u:"https://public.substack.com"},
      {n:"Barry Weiss - The Free Press",                              u:"https://www.thefp.com"},
      {n:"Racket News - Matt Taibbi",                                 u:"https://www.racket.news"},
      {n:"Mintcast - MintPress News Podcast",                         u:"https://www.mintpressnews.com/podcast"},
      {n:"Due Dissidence - independent left journalism",              u:"https://www.duedissidence.com"},
      {n:"Caitlin Johnstone - Notes From The Edge (Substack)",        u:"https://caitlinjohnstone.substack.com"},
    ],
  },

  // APPLE PODCASTS - KEY SHOWS
  {
    label:"Apple Podcasts - Key Research Shows",
    type:"podcast",
    items:[
      {n:"Joe Rogan Experience - Apple Podcasts",                     u:"https://podcasts.apple.com/us/podcast/the-joe-rogan-experience/id360084272"},
      {n:"Theories of Everything - Apple Podcasts",                   u:"https://podcasts.apple.com/us/podcast/theories-of-everything-with-curt-jaimungal/id1521855810"},
      {n:"Conspiracy Theories - Parcast (Apple)",                     u:"https://podcasts.apple.com/us/podcast/conspiracy-theories/id1311230024"},
      {n:"Stuff They Dont Want You to Know - Apple",                  u:"https://podcasts.apple.com/us/podcast/stuff-they-dont-want-you-to-know/id415278000"},
      {n:"Mysterious Universe - Apple Podcasts",                      u:"https://podcasts.apple.com/au/podcast/mysterious-universe/id296539674"},
      {n:"Ground Zero with Clyde Lewis - Apple",                      u:"https://podcasts.apple.com/us/podcast/ground-zero-with-clyde-lewis/id285235482"},
      {n:"Coast to Coast AM - Apple Podcasts",                        u:"https://podcasts.apple.com/us/podcast/coast-to-coast-am/id291036546"},
      {n:"The Why Files - Apple Podcasts",                            u:"https://podcasts.apple.com/us/podcast/the-why-files/id1564976503"},
      {n:"Dark Journalist - Apple Podcasts",                          u:"https://podcasts.apple.com/us/podcast/dark-journalist/id967168629"},
      {n:"Blurry Creatures - Apple Podcasts",                         u:"https://podcasts.apple.com/us/podcast/blurry-creatures/id1550055321"},
      {n:"Into the Impossible - Apple Podcasts",                      u:"https://podcasts.apple.com/us/podcast/into-the-impossible-with-brian-keating/id1341324183"},
    ],
  },

  // SPOTIFY - KEY RESEARCH SHOWS
  {
    label:"Spotify - Key Research Shows",
    type:"podcast",
    items:[
      {n:"Joe Rogan Experience - Spotify",                            u:"https://open.spotify.com/show/4rOoJ6Egrf8K2IrywzwOMk"},
      {n:"Mysterious Universe - Spotify",                             u:"https://open.spotify.com/show/5fOe6DwMCLnwbGHyEBkPYz"},
      {n:"Stuff They Dont Want You to Know - Spotify",                u:"https://open.spotify.com/show/0oMbJCkEK8sJ4DNBg4Pvaq"},
      {n:"Theories of Everything - Spotify",                          u:"https://open.spotify.com/show/6ohYKMUIgJMrMqVs36vBBi"},
      {n:"The Why Files - Spotify",                                   u:"https://open.spotify.com/show/7wFQMa8c4VTalqlzk5RYub"},
      {n:"Ground Zero with Clyde Lewis - Spotify",                    u:"https://open.spotify.com/show/4DvTkLXYNkSPJTAI0vCOgt"},
      {n:"DarkHorse Podcast - Spotify",                               u:"https://open.spotify.com/show/7BqTqQacGbqaGTN9R6yxBk"},
    ],
  },

  // YOUTUBE CHANNELS - ADDITIONAL RESEARCH
  {
    label:"YouTube Channels - Additional Research",
    type:"podcast",
    items:[
      {n:"Sabine Hossenfelder - Science Without Gobbledygook",        u:"https://www.youtube.com/@SabineHossenfelder"},
      {n:"PBS Space Time - frontier physics",                         u:"https://www.youtube.com/@pbsspacetime"},
      {n:"Anton Petrov - daily space & science news",                 u:"https://www.youtube.com/@whatdamath"},
      {n:"Dark5 - top 5 mysteries & unexplained",                     u:"https://www.youtube.com/@dark5tv"},
      {n:"Bright Insight - ancient history alternative",              u:"https://www.youtube.com/@BrightInsight6"},
      {n:"Gaia - consciousness & ancient civilizations",              u:"https://www.youtube.com/@GaiaVideo"},
      {n:"Jimmy - conspiracy documentaries",                          u:"https://www.youtube.com/@JimmyFlatbush"},
    ],
  },,
// STATE PARKS, NATIONAL PARKS & MISSING PERSONS
  {
    label:"State Parks, National Parks & Missing Persons Research",
    type:"research",
    items:[
      {n:"David Paulides YouTube - CanAm Missing Project",                     u:"https://www.youtube.com/@canammissingproject"},
      {n:"National Park Service - Missing Persons (official)",                 u:"https://www.nps.gov/subjects/search-and-rescue/missing-persons.htm"},
      {n:"NPS SOSP - Search & Rescue statistics",                              u:"https://www.nps.gov/subjects/search-and-rescue/statistics.htm"},
      {n:"NPS FOIA Library - Freedom of Information requests",                 u:"https://www.nps.gov/aboutus/foia/foia-reading-room.htm"},
      {n:"IBTimes - Missing 411: UFO Theorists Claim Parks Are Hunting Grounds",u:"https://www.ibtimes.co.uk/unexplained-disappearances-national-parks-ufo-theories-1798086"},
      {n:"The Why Files - Missing 411 YouTube episode",                        u:"https://www.youtube.com/results?search_query=why+files+missing+411"},
      {n:"Mysterious Universe - Missing 411 articles archive",                 u:"https://mysteriousuniverse.org/?s=missing+411"},
      {n:"Hancock House Publishers - Missing 411 full book series",            u:"https://www.hancockhouse.com/collections/missing-411-series"},
      {n:"Missing People UK - international missing persons database",          u:"https://www.missingpeople.org.uk"},
      {n:"National Missing and Unidentified Persons System (NamUs)",           u:"https://www.namus.gov"},
    ],
  },

  // MISSING 411 PODCASTS - APPLE, SPOTIFY & YOUTUBE
  {
    label:"Missing 411 - Podcasts, Interviews & Documentaries",
    type:"podcast",
    items:[
      {n:"Missing 411: Strange Disappearances in National Parks - Apple",       u:"https://podcasts.apple.com/us/podcast/missing-411-strange-disappearances-in-national-parks/id1618084297?i=1000681913201"},
      {n:"David Paulides Missing 411 - Where Did the Road Go? - Apple",        u:"https://podcasts.apple.com/us/podcast/david-paulides-missing-411-the-devils-in-the-detail/id597316507?i=1000768166942"},
      {n:"Missing 411 - Disappearances in National Parks - Spotify",           u:"https://open.spotify.com/episode/1JO1TJiVwZvlDELeD7bmEH"},
      {n:"13 O Clock Podcast - Ep 431: David Paulides & Missing 411",         u:"https://13oclockpodcast.wordpress.com/2024/11/21/episode-431-david-paulides-missing-411-and-some-creepy-national-park-disappearances/"},
      {n:"Missing 411 Movie - Amazon Prime",                                   u:"https://www.amazon.com/dp/B074BPKD4C"},
      {n:"Missing 411: The Hunted - Amazon Prime",                             u:"https://www.amazon.com/dp/B07ZNQJ3JG"},
      {n:"Gaia TV - Beyond Belief: Missing 411 with David Paulides",           u:"https://www.gaia.com/video/missing-411-part-1"},
    ],
  },

  // PORTALS, STARGATES & INTERDIMENSIONAL RESEARCH
  {
    label:"Portals, Stargates & Interdimensional - Articles, Podcasts, Videos",
    type:"research",
    items:[
      {n:"Mike Ricksecker - Portals to the Stars (official site)",             u:"https://www.mikericksecker.com/"},
      {n:"Mike Ricksecker - Portals to the Stars on Amazon",                   u:"https://www.amazon.com/dp/B0DK3YY7K6"},
      {n:"Stargates and Portals on Earth - Mirela Gorjanu (Amazon)",           u:"https://www.amazon.com/Stargates-Portals-Earth-Interdimensional-ForgottenOrigins/dp/B0FD3WZDSF"},
      {n:"Strange and Unexplained - Mike Ricksecker Portals ep (Spotify)",     u:"https://open.spotify.com/episode/0YXpcKI5YTovPFqrHqFaB7"},
      {n:"Occult Symbolism Podcast - Portals Deep Dive (Isaac Weishaupt)",     u:"https://podcasts.apple.com/us/podcast/occult-symbolism-and-pop-culture-with-isaac-weishaupt/id977436455"},
      {n:"Gaia - What Is a Stargate? (article)",                               u:"https://www.gaia.com/article/what-stargate"},
      {n:"Gaia - Stargates: Hidden Portals on Earth (article)",                u:"https://www.gaia.com/article/stargates-hidden-portals-eart"},
      {n:"Project Camelot - Portal & Stargate whistleblower interviews",       u:"https://projectcamelotportal.com"},
      {n:"r/Portals - Reddit community",                                       u:"https://www.reddit.com/r/Portals"},
    ],
  },

  // STATE PARKS & WILDERNESS DISAPPEARANCE ARTICLES
  {
    label:"State Parks, Wilderness & Unexplained Disappearance Articles",
    type:"blog",
    items:[
      {n:"Outside Magazine - The Enduring Mystery of Missing 411",             u:"https://www.outsideonline.com/outdoor-adventure/exploration-survival/missing-411-david-paulides-national-parks/"},
      {n:"Popular Mechanics - Why People Keep Disappearing in National Parks", u:"https://www.popularmechanics.com/science/a34583655/missing-411-national-parks-disappearances/"},
      {n:"Atlas Obscura - The Most Mysterious National Park Disappearances",   u:"https://www.atlasobscura.com/articles/missing-411-national-parks"},
      {n:"All That Is Interesting - Missing 411 Unexplained Cases",            u:"https://allthatsinteresting.com/missing-411"},
      {n:"The Lineup - Most Baffling Missing 411 Cases",                       u:"https://the-line-up.com/missing-411"},
      {n:"Grunge - The Truth About Missing 411",                               u:"https://www.grunge.com/534783/the-truth-about-missing-411/"},
      {n:"Historic Mysteries - Missing 411 Pattern Evidence",                  u:"https://www.historicmysteries.com/missing-411/"},
      {n:"Mysterious Universe - Portals and Missing People (article archive)", u:"https://mysteriousuniverse.org/?s=portal+missing"},
    ],
  },,
// CIA DECLASSIFIED FILES - BY TOPIC (OFFICIAL FOIA READING ROOM)
  {
    label:"CIA Declassified Files - MK-Ultra, Mind Control & Human Experiments",
    type:"archive",
    items:[
      {n:"CIA FOIA - MK-Ultra Full Collection (searchable)",               u:"https://www.cia.gov/readingroom/search/site/mkultra"},
      {n:"CIA FOIA - Sidney Gottlieb Senate Testimony 1975 (NSArchive)",   u:"https://nsarchive.gwu.edu/briefing-book/dnsa-intelligence/2025-10-30/top-secret-testimony-cias-mkultra-chief-50-years-later"},
      {n:"CIA FOIA - MK-Ultra Subproject Files (all 150 subprojects)",     u:"https://www.cia.gov/readingroom/collection/mkultra-declassified-documents"},
      {n:"CIA FOIA - Family Jewels Documents (CIA illegal activities)",    u:"https://www.cia.gov/readingroom/collection/family-jewels"},
      {n:"CIA FOIA - Frank Olson Case Files (suspicious 1953 death)",      u:"https://www.cia.gov/readingroom/search/site/frank+olson"},
      {n:"National Security Archive - CIA Behavioral Sciences Collection", u:"https://nsarchive.gwu.edu/briefing-book/dnsa-intelligence/2024-12-23/cia-behavior-control-experiments-focus-new-scholarly"},
      {n:"John Marks FOIA Archive - Manchurian Candidate Research Papers", u:"https://nsarchive.gwu.edu/project/john-marks-papers"},
      {n:"Poisoner in Chief - Stephen Kinzer (NYT journalist, Gottlieb bio)",u:"https://www.penguinrandomhouse.com/books/568736/poisoner-in-chief-by-stephen-kinzer/"},
      {n:"Search for Manchurian Candidate - John Marks (1979, free online)",u:"https://www.namebase.org/books/marks.html"},
    ],
  },

  {
    label:"CIA Declassified Files - UFO, UAP & Unexplained Phenomena",
    type:"archive",
    items:[
      {n:"CIA FOIA - UFOs: Fact or Fiction? (official collection)",        u:"https://www.cia.gov/readingroom/collection/ufos-fact-or-fiction"},
      {n:"CIA FOIA - UFO search (700+ declassified documents)",            u:"https://www.cia.gov/readingroom/search/site/ufo"},
      {n:"CIA - CIA Role in Study of UFOs 1947-1990 (official article)",   u:"https://www.cia.gov/readingroom/document/0005517742"},
      {n:"CIA FOIA - Flying Saucers 1952 Robertson Panel documents",       u:"https://www.cia.gov/readingroom/search/site/flying+saucers"},
      {n:"CIA FOIA - Unidentified Flying Objects 1976 briefing",           u:"https://www.cia.gov/readingroom/document/0000015391"},
      {n:"NSA FOIA - UFO documents (NSA declassified files)",              u:"https://www.nsa.gov/Helpful-Links/NSA-FOIA/Declassification-Transparency-Initiatives/Historical-Releases/UFO/"},
      {n:"FBI Vault - UFO files (Project Blue Book era)",                  u:"https://vault.fbi.gov/UFO"},
      {n:"DIA FOIA - Advanced Aerospace Threat (AATIP) documents",        u:"https://www.dia.mil/FOIA/"},
      {n:"AARO - Pentagon UAP declassified reports (official)",            u:"https://www.aaro.mil/Portals/136/PDFs/AARO_Historical_Record_Report_Vol_1_2024.pdf"},
    ],
  },

  {
    label:"CIA Declassified Files - Remote Viewing & Psychic Programs",
    type:"archive",
    items:[
      {n:"CIA - Did CIA Study Psychic Powers? (official confirmation)",    u:"https://www.cia.gov/stories/story/ask-molly-did-cia-really-study-psychic-powers/"},
      {n:"CIA FOIA - Evaluation of Remote Viewing Program",               u:"https://www.cia.gov/readingroom/document/cia-rdp96-00791r000200180005-5"},
      {n:"CIA FOIA - Parapsychology in Intelligence (Kenneth Kress)",      u:"https://www.cia.gov/readingroom/search/site/parapsychology"},
      {n:"CIA FOIA - Psychic Spies Reported (1995 document)",             u:"https://www.cia.gov/readingroom/document/cia-rdp96-00791r000100030073-5"},
      {n:"NSA FOIA - Handwritten Notes on Psychic Powers & Remote Viewing",u:"https://www.cia.gov/readingroom/print/1863168"},
    ],
  },

  {
    label:"CIA Declassified Files - Ticks, Bioweapons & Plum Island",
    type:"archive",
    items:[
      {n:"Malone Institute - Declassified Docs Link Bioweapons to Lyme (2026)",u:"https://maloneinstitute.org/blog/declassified-documents-link-us-bioweapons-program-to-lyme-disease-outbreak"},
      {n:"Dr. Robert Malone Substack - Declassified Bioweapons & Lyme",   u:"https://www.malone.news/p/declassified-documents-link-us-bioweapons"},
      {n:"CIA FOIA - Operation Paperclip documents (Nazi scientists in US)",u:"https://www.cia.gov/readingroom/search/site/paperclip"},
      {n:"National Security Archive - Operation Paperclip collection",     u:"https://nsarchive.gwu.edu/project/operation-paperclip"},
      {n:"Annie Jacobsen - Operation Paperclip (investigative book)",      u:"https://www.hachettebookgroup.com/titles/annie-jacobsen/operation-paperclip/9780316221245/"},
      {n:"Fort Detrick History - Official Army bioweapons research history",u:"https://mrmc.amedd.army.mil/index.cfm?pageid=about_us.history"},
    ],
  },

  {
    label:"CIA Declassified Files - JFK, Assassinations & Political Operations",
    type:"archive",
    items:[
      {n:"CIA FOIA - JFK Assassination Records (thousands of files)",      u:"https://www.cia.gov/readingroom/collection/jfk-assassination-records"},
      {n:"National Archives - JFK Records Collection (full searchable)",   u:"https://www.archives.gov/research/jfk"},
      {n:"CIA FOIA - Operation Northwoods (false flag proposals)",         u:"https://www.cia.gov/readingroom/search/site/northwoods"},
      {n:"CIA FOIA - Operation Mockingbird (media infiltration files)",    u:"https://www.cia.gov/readingroom/search/site/mockingbird"},
      {n:"CIA FOIA - COINTELPRO documents (FBI political surveillance)",   u:"https://vault.fbi.gov/cointel-pro"},
      {n:"Carl Bernstein - CIA and the Media (Rolling Stone 1977)",        u:"https://www.carlbernstein.com/the-cia-and-the-media-rolling-stone-10-20-1977"},
      {n:"National Security Archive - JFK 60 Years Later briefing book",  u:"https://nsarchive.gwu.edu/briefing-book/jfk/2023-11-21/jfk-assassination-60-years-later"},
    ],
  },

  {
    label:"CIA Declassified Files - Finance, Federal Reserve & Banking Control",
    type:"archive",
    items:[
      {n:"CIA FOIA - Economic Intelligence files (searchable)",            u:"https://www.cia.gov/readingroom/search/site/federal+reserve"},
      {n:"Church Committee Reports - Banking & Intelligence (1975-1976)",  u:"https://www.intelligence.senate.gov/resources/intelligence-related-commissions"},
      {n:"NSA FOIA - ECHELON financial surveillance documents",            u:"https://www.nsa.gov/Helpful-Links/NSA-FOIA/"},
      {n:"National Security Archive - CIA Economic Operations history",    u:"https://nsarchive.gwu.edu/project/cia-covert-operations"},
      {n:"Fed Reserve FOIA - Freedom of Information requests to the Fed",  u:"https://www.federalreserve.gov/apps/foia/ViewDeterminations.aspx"},
      {n:"Treasury FOIA - Financial intelligence declassified records",    u:"https://home.treasury.gov/footer/freedom-of-information-act"},
    ],
  },

  {
    label:"CIA Declassified Files - Surveillance, Mind Control & Social Engineering",
    type:"archive",
    items:[
      {n:"CIA FOIA - CHAOS Operation (domestic surveillance 1967-1974)",   u:"https://www.cia.gov/readingroom/search/site/operation+chaos"},
      {n:"CIA FOIA - Project ARTICHOKE (pre-MKUltra interrogation)",       u:"https://www.cia.gov/readingroom/search/site/artichoke"},
      {n:"CIA FOIA - Project BLUEBIRD (earliest behavior control)",        u:"https://www.cia.gov/readingroom/search/site/bluebird"},
      {n:"NSA FOIA - PRISM surveillance program documents (post-Snowden)", u:"https://www.nsa.gov/Helpful-Links/NSA-FOIA/Declassification-Transparency-Initiatives/"},
      {n:"Church Committee - Intelligence Activities & Rights of Americans",u:"https://www.senate.gov/artandhistory/history/common/investigations/ChurchCommittee.htm"},
      {n:"Snowden Archive - The Intercept NSA document collection",        u:"https://theintercept.com/snowden-sidtoday/"},
    ],
  },

  {
    label:"Key Investigative Journalists & Authors - Government Secrets",
    type:"research",
    items:[
      {n:"Stephen Kinzer - Poisoner in Chief (MK-Ultra / Gottlieb)",       u:"https://stephenkinzer.com"},
      {n:"Tom O Neill - Chaos: Manson, CIA & Secret History of the Sixties",u:"https://tom-oneill.org/"},
      {n:"Annie Jacobsen - Operation Paperclip & Area 51 (investigative)",  u:"https://anniejacobsen.com"},
      {n:"Carl Bernstein - CIA & Media (Rolling Stone archive)",            u:"https://www.carlbernstein.com"},
      {n:"James Bamford - NSA investigative author (The Puzzle Palace)",    u:"https://jamesbamford.com"},
      {n:"Tim Weiner - Legacy of Ashes (Pulitzer, CIA history)",           u:"https://www.penguinrandomhouse.com/books/291850/legacy-of-ashes-by-tim-weiner/"},
      {n:"Bob Woodward - The CIA investigative archive (Washington Post)",  u:"https://www.washingtonpost.com/people/bob-woodward/"},
      {n:"Glenn Greenwald - The Intercept NSA/Snowden files",              u:"https://theintercept.com/staff/glenn-greenwald/"},
      {n:"Jeremy Scahill - Dirty Wars (CIA drone kill list reporting)",    u:"https://theintercept.com/staff/jeremyscahill/"},
      {n:"Nick Davies - Hack Attack (phone hacking & intelligence)",       u:"https://www.theguardian.com/profile/nickdavies"},
    ],
  },,
// UFO / UAP / ALIENS - OFFICIAL GOVERNMENT DISCLOSURE (2024-2026)
  {
    label:"UFO / UAP - Official Government Disclosure & Documents",
    type:"archive",
    items:[
      {n:"ODNI - 2024 Consolidated Annual Report on UAP (official)",       u:"https://www.dni.gov/index.php/newsroom/reports-publications/reports-publications-2024/3832-2024-consolidated-annual-report-on-unidentified-anomalous-phenomena"},
      {n:"NARA - UAP Records Collection (National Archives 2024)",         u:"https://www.archives.gov/research/topics/uap-records"},
      {n:"Trump UAP Executive Order Files - Second Tranche (May 2026)",    u:"https://www.newsnationnow.com/space/ufo/ufo-videos-second-files-coulthart-loeb-elizondo/"},
      {n:"Congress House UAP Subcommittee Hearings - Full transcripts",    u:"https://oversight.house.gov/search/?q=UAP"},
      {n:"Senate Intelligence Committee - UAP Legislation archive",        u:"https://www.intelligence.senate.gov/topics/uap-ufo"},
      {n:"NASA UAP Study - Independent Report 2023 (official)",            u:"https://science.nasa.gov/uap"},
    ],
  },

  // UFO / UAP - KEY WHISTLEBLOWERS & INSIDERS
  {
    label:"UFO / UAP - Key Whistleblowers, Insiders & Congressional Testimony",
    type:"research",
    items:[
      {n:"David Grusch - Official Congressional Testimony July 2023 (YouTube)", u:"https://www.youtube.com/watch?v=KQ7Dw-739VY"},
      {n:"David Grusch - NewsNation Interview with Ross Coulthart (first interview)", u:"https://www.newsnationnow.com/space/ufo/watch-full-interview-with-ufo-whistleblower-david-grusch/"},
      {n:"Luis Elizondo - Official Site & AATIP Disclosure",               u:"https://luiselizondo-official.com/"},
      {n:"Luis Elizondo - Imminent: Inside the Pentagon UAP Task Force (book)", u:"https://www.penguinrandomhouse.com/books/741839/imminent-by-luis-elizondo/"},
      {n:"Bob Lazar - Official Site (Area 51 / S-4 whistleblower)",        u:"https://boblazar.com"},
      {n:"Bob Lazar - George Knapp Original 1989 Interview (YouTube)",     u:"https://www.youtube.com/watch?v=4MuNHzFw11E"},
      {n:"David Fravor - Tic Tac UAP Pilot (60 Minutes interview)",        u:"https://www.youtube.com/watch?v=FownGBGkMbA"},
      {n:"Ryan Graves - Americans for Safe Aerospace (UAP pilot reports)", u:"https://www.safeaerospace.org"},
      {n:"Dr. James Lacatski - AAWSAP program director",                   u:"https://www.amazon.com/Skinwalkers-Pentagon-Inside-Secret-Program/dp/1949501485"},
      {n:"Dr. Eric Davis - physicist & UAP crash retrieval researcher",    u:"https://www.theblackvault.com/casefiles/physicist-dr-eric-davis-on-ufo-crash-retrievals/"},
    ],
  },

  // UFO / UAP - INVESTIGATIVE JOURNALISTS & AUTHORS
  {
    label:"UFO / UAP - Investigative Journalists & Key Authors",
    type:"research",
    items:[
      {n:"Ross Coulthart - NewsNation Reality Check (leading UAP journalist)", u:"https://www.newsnationnow.com/author/ross-coulthart/"},
      {n:"Ross Coulthart - In Plain Sight (book: UAP through journalist lens)", u:"https://www.harpercollins.com/products/in-plain-sight-ross-coulthart"},
      {n:"George Knapp - Investigation Alien (2024 Netflix documentary)",   u:"https://www.netflix.com/title/81706448"},
      {n:"Leslie Kean - UFOs: Generals, Pilots & Government Officials (book)", u:"https://www.penguinrandomhouse.com/books/208399/ufos-by-leslie-kean/"},
      {n:"Ralph Blumenthal & Leslie Kean - 2017 NYT UAP scoop (full article)", u:"https://www.nytimes.com/2017/12/16/us/politics/unidentified-aerial-phenomena.html"},
      {n:"The Debrief - UAP/UFO investigative journalism hub",              u:"https://thedebrief.org"},
      {n:"The Debrief - David Grusch original story by Kean & Blumenthal", u:"https://thedebrief.org/intelligence-officials-say-u-s-has-retrieved-non-human-craft/"},
      {n:"UAP Digest - credible UAP developments tracker",                 u:"https://www.uapdigest.com"},
      {n:"Liberation Times - UAP investigative journalism UK",              u:"https://www.liberationtimes.com"},
    ],
  },

  // UFO / UAP - SCIENTIFIC RESEARCHERS & INSTITUTIONS
  {
    label:"UFO / UAP - Scientific Researchers & Academic Institutions",
    type:"research",
    items:[
      {n:"Sol Foundation - UAP & consciousness research institute",        u:"https://www.sol.foundation"},
      {n:"MUFON Case Management System - searchable sightings database",   u:"https://mufoncms.com"},
      {n:"CEFAA - Chilean government UAP agency (official)",               u:"https://www.dgac.gob.cl/la-dgac/organismos/cefaa/"},
      {n:"GEIPAN - French government UFO agency (official)",               u:"https://www.cnes.fr/en/web/CNES-en/5489-geipan.php"},
      {n:"NARCAP - National Aviation Reporting Center on Anomalous Phenomena", u:"https://www.narcap.org"},
      {n:"SCU - Scientific Coalition for UAP Studies",                     u:"https://www.explorescu.org"},
    ],
  },

  // UFO / UAP - PODCASTS (APPLE PODCASTS)
  {
    label:"UFO / UAP / Aliens - Podcasts on Apple Podcasts",
    type:"podcast",
    items:[
      {n:"Point of Convergence - Dr. Matthew Roberts UAP (Apple)",         u:"https://podcasts.apple.com/us/podcast/point-of-convergence-uap/id1623812678"},
      {n:"Need to Know - Ross Coulthart & Bryce Zabel (Apple)",            u:"https://podcasts.apple.com/us/podcast/need-to-know-with-coulthart-and-zabel/id1628925667"},
      {n:"UFO Rabbit Hole - deep dive UAP cases (Apple)",                  u:"https://podcasts.apple.com/us/podcast/ufo-rabbit-hole/id1501837381"},
      {n:"Somewhere in the Skies - Ryan Sprague (Apple)",                  u:"https://podcasts.apple.com/us/podcast/somewhere-in-the-skies/id1072017026"},
      {n:"The Alien Theorist Podcast (Apple)",                             u:"https://podcasts.apple.com/us/podcast/alien-theorist-podcast/id1477836961"},
      {n:"UFO Classified - Erica Lukes (Apple)",                           u:"https://podcasts.apple.com/us/podcast/ufo-classified/id988451706"},
      {n:"The Richard Dolan Show (Apple)",                                  u:"https://podcasts.apple.com/us/podcast/the-richard-dolan-show/id1578281425"},
      {n:"Alien UFO Podcast (Apple)",                                       u:"https://podcasts.apple.com/us/podcast/alien-ufo-podcast/id1602263087"},
      {n:"Expanded Perspectives - UAP & paranormal (Apple)",               u:"https://podcasts.apple.com/us/podcast/expanded-perspectives/id580687027"},
      {n:"That UFO Podcast (Apple)",                                        u:"https://podcasts.apple.com/us/podcast/that-ufo-podcast/id1511121397"},
    ],
  },

  // UFO / UAP - PODCASTS (SPOTIFY)
  {
    label:"UFO / UAP / Aliens - Podcasts on Spotify",
    type:"podcast",
    items:[
      {n:"Need to Know - Ross Coulthart & Bryce Zabel (Spotify)",          u:"https://open.spotify.com/show/0Af0LFwNUdpE7oL3V5hOvU"},
      {n:"Somewhere in the Skies - Ryan Sprague (Spotify)",                u:"https://open.spotify.com/show/14TG7QDKBKT8YIJJw5WT5G"},
      {n:"UFO Rabbit Hole (Spotify)",                                       u:"https://open.spotify.com/show/3d53HgT1jCJq1pR7P8M8AP"},
      {n:"Point of Convergence UAP (Spotify)",                             u:"https://open.spotify.com/show/5gKd5eGcnr00RJPFMYWb6k"},
      {n:"The Saucer Life (Spotify)",                                       u:"https://open.spotify.com/show/4bnqC3EHSEb7kMfxDGNp9Q"},
      {n:"Strange Arrivals (Spotify)",                                      u:"https://open.spotify.com/show/3loxLpMHFfh0sVxwH9iWO5"},
      {n:"UFO Warning (Spotify)",                                           u:"https://open.spotify.com/show/2L1JNOW3D1KbVTGcmJGnl4"},
      {n:"Alien Theorist Podcast (Spotify)",                               u:"https://open.spotify.com/show/1pF6lTvBvdpGI8HFDMiVqO"},
    ],
  },

  // UFO / UAP - YOUTUBE CHANNELS
  {
    label:"UFO / UAP / Aliens - Key YouTube Channels",
    type:"podcast",
    items:[
      {n:"NewsNation UFO - Ross Coulthart & Reality Check",                u:"https://www.youtube.com/@NewsNation"},
      {n:"UFO Jesus - UAP research & analysis YouTube",                    u:"https://www.youtube.com/@UFOJesusTwitch"},
      {n:"Cristina Gomez - Engaging the Phenomenon YouTube",               u:"https://www.youtube.com/@EngagingThePhenomenon"},
      {n:"Chris Lehto - UAP analysis & pilot perspective",                 u:"https://www.youtube.com/@ChrisLehto"},
      {n:"Alien Disclosure Files 2024 documentary series YouTube",         u:"https://www.youtube.com/playlist?list=PLC_WFVOH2WJTUYuBXC9rcLNDHnylIBqJi"},
      {n:"Project Unity - Jay Anderson UAP community YouTube",             u:"https://www.youtube.com/@ProjectUnity1"},
      {n:"UFO Proof - compilation & analysis channel",                     u:"https://www.youtube.com/@UFOProof"},
    ],
  },

  // UFO / UAP - WEBSITES, FORUMS & DATABASES
  {
    label:"UFO / UAP / Aliens - Websites, Databases & Research Forums",
    type:"blog",
    items:[
      {n:"UFO Stalker - MUFON sightings map (real-time global)",           u:"https://www.ufostalker.com"},
      {n:"UFO Evidence - comprehensive sightings archive",                  u:"https://www.ufoevidence.org"},
      {n:"UAP Media UK - British UAP news & research",                     u:"https://www.uapmedia.uk"},
      {n:"UFOdB - photo and video database",                               u:"https://www.ufodb.com"},
      {n:"National UFO Center - Filer Files research",                     u:"https://nationalufocenter.com"},
      {n:"Phenomenon Radio - UAP research community",                      u:"https://www.phenomenonradio.com"},
      {n:"UAPX - UAP experience sharing community",                        u:"https://uapx.com"},
    ],
  },

  // UFO / UAP - KEY REDDIT COMMUNITIES
  {
    label:"UFO / UAP / Aliens - Reddit Communities",
    type:"user",
    items:[
    ],
  },,
// PORTALS & STARGATES - GREENLAND & ARCTIC ANOMALIES
  {
    label:"Portals & Stargates - Greenland, Camp Century & Arctic Anomalies",
    type:"research",
    items:[
      {n:"NASA - City Under the Ice: Camp Century Discovered 2024 (official)",   u:"https://science.nasa.gov/earth/earth-observatory/new-view-of-the-city-under-the-ice-153616/"},
      {n:"ScienceAlert - NASA Discovers Secret Army Base Under Greenland Ice",    u:"https://www.sciencealert.com/nasa-discovers-secret-army-base-buried-under-decades-of-ice"},
      {n:"BGR - NASA Found Secret US Military Base Buried in Greenland Ice",     u:"https://www.bgr.com/2003369/nasa-found-secret-us-military-base-buried-greenland-ice-shelf/"},
      {n:"National Geographic - Camp Century: Secret Nuclear Base & Climate",    u:"https://www.nationalgeographic.com/history/article/camp-century-nasa-greenland-us-military"},
      {n:"Earth.com - City Under the Ice: Camp Century Full Coverage",           u:"https://www.earth.com/news/city-under-the-ice-secret-base-camp-found-in-greenland/"},
      {n:"Eos.org Podcast - Toxic City Under the Ice (Camp Century)",            u:"https://eos.org/articles/podcast-toxic-city-under-the-ice"},
      {n:"YouTube - Secret Cold War Missile Base Unearthed in Greenland by NASA",u:"https://www.youtube.com/watch?v=s6oNMPK9xIs"},
      {n:"NASA - Greenland Magnetic Anomaly Research (GRACE satellite data)",    u:"https://svs.gsfc.nasa.gov/31156/"},
      {n:"ScienceAlert - NASA Tracking Vast Anomaly in Earth Magnetic Field",    u:"https://www.sciencealert.com/nasa-is-tracking-a-vast-anomaly-growing-in-earths-magnetic-field"},
      {n:"NASA Science - SAA South Atlantic Anomaly tracking (official)",        u:"https://science.nasa.gov/science-research/earth-science/"},
    ],
  },

  // PORTALS & STARGATES - AUSTRALIA, ULURU & ABORIGINAL SACRED SITES
  {
    label:"Portals & Stargates - Australia, Uluru & Aboriginal Dreamtime",
    type:"research",
    items:[
      {n:"Sacred Sites - Uluru (Ayers Rock) & Kata Tjuta World Pilgrimage Guide",u:"https://sacredsites.com/oceania/australia/uluru_ayers_rock.html"},
      {n:"Beyond Harmonics - Uluru Sacred Energy Vortex (article)",             u:"https://www.beyondharmonics.org/places/uluru"},
      {n:"Sentient Metaphysics - Australia Vortex Locations & Energy Sites",     u:"https://sentientmetaphysics.com/vortex-locations-au/"},
      {n:"Uluru-Kata Tjuta National Park - Official Australian Government site", u:"https://parksaustralia.gov.au/uluru/"},
      {n:"Star Nations News - Uluru-Kata Tjuta-Atilla Trinity Portals",          u:"https://starnationsnews.com/2020/10/16/uluru-kata-tjuta-atilla-trinity-portals/"},
      {n:"Gaia - Aboriginal Dreamtime & the Songlines (sacred geography)",       u:"https://www.gaia.com/article/aboriginal-dreamtime"},
      {n:"YouTube - Uluru Portal & Sacred Energy: Ancient Aboriginal Mystery",   u:"https://www.youtube.com/results?search_query=uluru+portal+sacred+energy+aboriginal"},
      {n:"YouTube - Australia Sacred Sites & Portals Documentary",               u:"https://www.youtube.com/results?search_query=australia+sacred+sites+portals+documentary"},
      {n:"Mysterious Universe - Australian Dreamtime & Anomalous Phenomena",     u:"https://mysteriousuniverse.org/?s=australia+aboriginal"},
      {n:"Gaia - Earth Chakras: The 7 Power Centres of the Planet",              u:"https://www.gaia.com/article/earth-chakras-power-centres"},
    ],
  },

  // PORTALS & STARGATES - GLOBAL SACRED SITES & VORTEX RESEARCH
  {
    label:"Portals & Stargates - Global Sacred Sites, Vortex & Electromagnetic Research",
    type:"research",
    items:[
      {n:"Sacred Sites - Martin Gray World Pilgrimage Guide (500+ sacred sites)",u:"https://sacredsites.com"},
      {n:"The Why Files - Portals, Stargates & Ancient Technology YouTube",      u:"https://www.youtube.com/results?search_query=why+files+portals+stargates"},
      {n:"Bright Insight - Mount Shasta Portals & Ancient Tunnels YouTube",      u:"https://www.youtube.com/results?search_query=bright+insight+mount+shasta"},
      {n:"Earth Chakras & Vortex Sites - Robert Coon (original researcher)",     u:"https://www.earthchakras.org"},
      {n:"YouTube - Stonehenge Portal Theory & Electromagnetic Anomalies",       u:"https://www.youtube.com/results?search_query=stonehenge+portal+electromagnetic"},
      {n:"YouTube - Peru Nazca Lines Portal & Ancient Astronaut Research",       u:"https://www.youtube.com/results?search_query=nazca+lines+portal+ancient+astronaut"},
    ],
  },

  // ANCIENT CIVILIZATIONS - EXPANDED SOURCES
  {
    label:"Ancient Civilizations - Expanded Articles, Podcasts & YouTube",
    type:"research",
    items:[
      {n:"Ancient Architects - YouTube (Egypt, megalithic sites, mysteries)",    u:"https://www.youtube.com/@AncientArchitects"},
      {n:"UnchartedX - YouTube (precision stonework & advanced ancient tech)",   u:"https://www.youtube.com/@UnchartedX"},
      {n:"Megalithomania - YouTube (megalithic sites worldwide)",                u:"https://www.youtube.com/@megalithomania"},
      {n:"Gaia - Ancient Civilizations series (full streaming series)",          u:"https://www.gaia.com/series/ancient-civilizations"},
      {n:"Forbidden History Podcast - Jamie Theakston (Apple Podcasts)",         u:"https://podcasts.apple.com/gb/podcast/forbidden-history-with-jamie-theakston/id1547398084"},
      {n:"Ancient Mysteries Podcast - multiple hosts (Apple Podcasts)",          u:"https://podcasts.apple.com/us/podcast/ancient-mysteries/id1438893363"},
      {n:"The Mystery of History Podcast (Apple Podcasts)",                      u:"https://podcasts.apple.com/us/podcast/the-mystery-of-history/id1476253824"},
      {n:"The Ancients - History Hit Podcast (Spotify)",                         u:"https://open.spotify.com/show/3XHBmHkKNpAlISIBOXjHjD"},
      {n:"Ancient Wisdom Podcast - Freddy Silva (Spotify)",                      u:"https://open.spotify.com/show/2f7dQG7tYS5P1MkdNuLPIX"},
    ],
  },

  // CONSCIOUSNESS & MIND - EXPANDED SOURCES
  {
    label:"Consciousness & Mind - Articles, Podcasts & YouTube",
    type:"research",
    items:[
      {n:"HeartMath Institute - heart-brain coherence & consciousness research", u:"https://www.heartmath.org"},
      {n:"Dean Radin - IONS chief scientist (consciousness research papers)",    u:"https://deanradin.com"},
      {n:"Lex Fridman Podcast - Consciousness episodes (YouTube)",               u:"https://www.youtube.com/results?search_query=lex+fridman+consciousness"},
      {n:"Closer to Truth - consciousness & philosophy series (YouTube)",        u:"https://www.youtube.com/@CloserToTruth"},
      {n:"The Consciousness Podcast - various researchers (Spotify)",            u:"https://open.spotify.com/show/3qv8BS8TXFqcYF5b7rlAh1"},
      {n:"Center for Consciousness Studies - University of Arizona (official)",  u:"https://consciousness.arizona.edu"},
      {n:"Journal of Consciousness Studies - peer-reviewed (free abstracts)",   u:"https://www.ingentaconnect.com/content/imp/jcs"},
      {n:"Global Consciousness Project - Princeton (successor to Noosphere)",   u:"https://gcpdot.com"},
    ],
  },

  // REMOTE VIEWING & PSI - EXPANDED SOURCES
  {
    label:"Remote Viewing & PSI - Official Sites, Podcasts & YouTube",
    type:"research",
    items:[
      {n:"International Remote Viewing Association (IRVA) - official site",      u:"https://www.irva.org"},
      {n:"Skip Atwater - Remote Viewing at the Monroe Institute",                u:"https://www.monroeinstitute.org/blogs/bob-monroe-s-lab"},
      {n:"Paul H. Smith - official site (military remote viewer, trainer)",      u:"https://www.rviewer.com"},
      {n:"Daz Smith - Remote Viewing Blog & CRV research",                       u:"https://www.remoteviewed.com"},
      {n:"Farsight Institute - Dr. Courtney Brown remote viewing research",      u:"https://www.farsight.org"},
      {n:"Gaia - Stargate Secrets: Remote Viewing Documentary Series",           u:"https://www.gaia.com/series/remote-viewing"},
      {n:"YouTube - CIA Remote Viewing Program Full Documentary",                u:"https://www.youtube.com/results?search_query=CIA+remote+viewing+documentary"},
      {n:"The Remote Viewing Podcast - Daz Smith (Apple Podcasts)",              u:"https://podcasts.apple.com/us/podcast/the-remote-viewing-podcast/id1571433497"},
      {n:"Remote Viewing Podcast - Stephan Schwartz (Spotify)",                  u:"https://open.spotify.com/show/1q7xdTHfpqDSCPUxlj6Mxd"},
      {n:"Mysteries of the Mind Podcast - remote viewing & psi (Apple)",        u:"https://podcasts.apple.com/us/podcast/mysteries-of-the-mind/id1560451866"},
    ],
  },

  // HIDDEN HISTORY & SUPPRESSED ARCHAEOLOGY - EXPANDED
  {
    label:"Hidden History & Suppressed Archaeology - Articles, YouTube & Podcasts",
    type:"research",
    items:[
      {n:"Andrew Collins - author & researcher (Gobekli Tepe, Denisovans)",      u:"https://www.andrewcollins.com"},
      {n:"Robert Bauval - Orion Correlation Theory official site",               u:"https://www.robertbauval.co.uk"},
      {n:"Brien Foerster - YouTube (elongated skulls, Inca stonework)",          u:"https://www.youtube.com/@BrienFoerster"},
      {n:"Freddy Silva - Invisible Temple (sacred sites & hidden history)",      u:"https://invisibletemple.com"},
      {n:"Hidden History Channel - YouTube (suppressed archaeology)",            u:"https://www.youtube.com/results?search_query=hidden+history+channel+archaeology"},
      {n:"The Lost History Channel TKTC - YouTube",                              u:"https://www.youtube.com/@TheLostHistoryChannel"},
      {n:"Unearthed Podcast - archaeology mysteries (Apple Podcasts)",           u:"https://podcasts.apple.com/us/podcast/unearthed/id1500007551"},
      {n:"The Archaeology Podcast Network (multiple shows)",                     u:"https://www.archaeologypodcastnetwork.com"},
      {n:"Megalithomania Podcast - megalithic sites worldwide (Apple Podcasts)", u:"https://podcasts.apple.com/gb/podcast/megalithomania/id1527700741"},
    ],
  },

  // SECRET SOCIETIES & ELITE NETWORKS - EXPANDED
  {
    label:"Secret Societies & Elite Networks - Articles, Podcasts & YouTube",
    type:"research",
    items:[
      {n:"Lyndon LaRouche - Executive Intelligence Review (EIR) archive",        u:"https://larouchepub.com"},
      {n:"Anthony Sutton - Wall Street & the Bolshevik Revolution (free PDF)",   u:"https://www.voltairenet.org/IMG/pdf/Sutton_Wall_Street_-_Bolshevik_Revolution.pdf"},
      {n:"Carrol Quigley - Tragedy & Hope (establishment history classic)",      u:"https://archive.org/details/tragedyhope00quig"},
      {n:"Corbett Report - Secret Societies deep dives (article archive)",       u:"https://www.corbettreport.com/?s=secret+societies"},
      {n:"YouTube - Albert Pike & Freemasonry Documentary",                      u:"https://www.youtube.com/results?search_query=albert+pike+freemasonry+documentary"},
      {n:"YouTube - Skull and Bones & Yale Secret Society Documentary",          u:"https://www.youtube.com/results?search_query=skull+and+bones+documentary"},
      {n:"YouTube - Bohemian Grove Infiltration Alex Jones Documentary",         u:"https://www.youtube.com/watch?v=DjMFKMcQqkU"},
      {n:"Illuminati Watcher - symbolism research & analysis blog",              u:"https://illuminatiwatcher.com"},
      {n:"Secret Arcana - esoteric symbolism research",                          u:"https://secretarcana.com"},
      {n:"Tin Foil Hat With Sam Tripoli - Podcast (Apple Podcasts)",             u:"https://podcasts.apple.com/us/podcast/tin-foil-hat-with-sam-tripoli/id1169745989"},
    ],
  },

  // HEALTH & SCIENCE - VACCINES, BIG PHARMA EXPANDED
  {
    label:"Health & Science - Vaccines, Big Pharma & Suppressed Medicine",
    type:"research",
    items:[
      {n:"Pierre Kory Substack - FLCCC Alliance (suppressed treatments)",        u:"https://pierrekory.substack.com"},
      {n:"Brownstone Institute - public health policy criticism",                u:"https://brownstone.org"},
      {n:"Epoch Health - investigative health journalism",                       u:"https://www.theepochtimes.com/health"},
      {n:"YouTube - Terrain Theory vs Germ Theory Documentary",                  u:"https://www.youtube.com/results?search_query=terrain+theory+germ+theory+documentary"},
      {n:"YouTube - Big Pharma Exposed Documentary Playlist",                    u:"https://www.youtube.com/results?search_query=big+pharma+exposed+documentary"},
    ],
  },,
// ALIENS & EXTRATERRESTRIAL - KEY RESEARCHERS & AUTHORS
  {
    label:"Aliens & Extraterrestrial - Key Researchers, Authors & Investigators",
    type:"research",
    items:[
      {n:"Richard Dolan - official site (history of UFO cover-up)",           u:"https://www.richarddolanpress.com"},
      {n:"Nick Pope - official site (UK MoD UFO investigator)",               u:"https://nickpope.net"},
      {n:"Stanton Friedman - nuclear physicist ufologist archive",            u:"https://stantonfriedman.com"},
      {n:"David Jacobs - Temple University alien abduction researcher",       u:"https://www.ufoabduction.com"},
      {n:"Whitley Strieber - Communion author & Unknown Country",             u:"https://www.unknowncountry.com"},
      {n:"Travis Walton - official site (1975 abduction case)",               u:"https://traviswalton.net"},
      {n:"Timothy Good - Above Top Secret author official site",              u:"https://timothygood.co.uk"},
      {n:"D.W. Pasulka - American Cosmic author (Notre Dame professor)",      u:"https://www.harpercollins.com/products/american-cosmic-d-w-pasulka"},
      {n:"Stephen Bassett - Paradigm Research Group (disclosure activist)",   u:"https://paradigmresearchgroup.org"},
      {n:"Kathleen Marden - MUFON director of research & abduction studies",  u:"https://www.kathleenmarden.com"},
      {n:"Peter Robbins - Rendlesham Forest researcher & author",             u:"https://www.peterrobbinsauthor.com"},
      {n:"Kevin Randle - author & UFO investigator (Roswell)",                u:"https://kevinrandle.blogspot.com"},
      {n:"Grant Cameron - presidential UFO research (presidentialufo.com)",   u:"https://www.presidentialufo.com"},
      {n:"Bryce Zabel - Need to Know co-host & author",                       u:"https://medium.com/@brycezabel"},
    ],
  },

  // ALIENS & EXTRATERRESTRIAL - BOOKS (VERIFIED PUBLISHER LINKS)
  {
    label:"Aliens & Extraterrestrial - Essential Books (Publisher Links)",
    type:"research",
    items:[
      {n:"Communion - Whitley Strieber (1987 landmark abduction account)",    u:"https://www.unknowncountry.com/communion"},
      {n:"Above Top Secret - Timothy Good (1987 global UFO cover-up)",        u:"https://timothygood.co.uk/books/"},
      {n:"Passport to Magonia - Jacques Vallee (1969 interdimensional theory)",u:"https://www.amazon.com/dp/0809236354"},
      {n:"American Cosmic - D.W. Pasulka (religion & UAP phenomenon)",        u:"https://global.oup.com/academic/product/american-cosmic-9780190692889"},
      {n:"The Day After Roswell - Philip Corso (Army officer, 1997)",         u:"https://www.amazon.com/dp/0671017675"},
      {n:"The 37th Parallel - Ben Mezrich (UFO investigator true story)",     u:"https://www.simonandschuster.com/books/The-37th-Parallel/Ben-Mezrich/9781476765570"},
      {n:"Skinwalkers at the Pentagon - Lacatski, Colm & Knapp (AAWSAP)",    u:"https://www.amazon.com/dp/1949501485"},
      {n:"UFOs and Nukes - Robert Hastings (nuclear facilities incidents)",   u:"https://www.ufohastings.com"},
      {n:"The Alien Agendas - Richard Dolan (2020 comprehensive overview)",   u:"https://www.richarddolanpress.com/the-alien-agendas"},
    ],
  },

  // ALIENS & EXTRATERRESTRIAL - DOCUMENTARIES (ALL PLATFORMS)
  {
    label:"Aliens & Extraterrestrial - Documentaries Across All Platforms",
    type:"research",
    items:[
      {n:"The Phenomenon - James Fox (Amazon Prime 2020)",                    u:"https://www.amazon.com/dp/B08MC4KKKH"},
      {n:"Bob Lazar: Area 51 & Flying Saucers - Jeremy Corbell (Netflix)",   u:"https://www.netflix.com/title/81014324"},
      {n:"Unacknowledged - Steven Greer (Amazon Prime 2017)",                 u:"https://www.amazon.com/dp/B06Y5SFKK2"},
      {n:"I Know What I Saw - James Fox (2009 documentary)",                  u:"https://www.youtube.com/watch?v=cM-T5qXo2VE"},
      {n:"The UFO Disclosure Documentary - Free YouTube Full",                u:"https://www.youtube.com/results?search_query=UFO+disclosure+documentary+full"},
      {n:"Communion Film 1989 - Whitley Strieber (YouTube)",                  u:"https://www.youtube.com/results?search_query=communion+1989+whitley+strieber"},
      {n:"Fire in the Sky 1993 - Travis Walton abduction film (IMDB)",        u:"https://www.imdb.com/title/tt0106912/"},
      {n:"Hangar 1: The UFO Files - History Channel (Amazon Prime)",          u:"https://www.amazon.com/dp/B00JEW0I8G"},
      {n:"Ancient Aliens - Full Series (History Channel / Amazon)",           u:"https://www.amazon.com/s?k=ancient+aliens+history+channel"},
      {n:"Extraordinary: The Stan Romanek Story (Netflix)",                   u:"https://www.netflix.com/title/80113192"},
    ],
  },

  // ALIENS & EXTRATERRESTRIAL - BLOGS & INDEPENDENT RESEARCHERS
  {
    label:"Aliens & Extraterrestrial - Blogs, Forums & Independent Researchers",
    type:"blog",
    items:[
      {n:"UFO Blogger - case files & sighting reports",                       u:"https://www.ufoblogger.com"},
      {n:"Chuck Zukowski - UFO investigator & Roswell researcher blog",       u:"https://www.ufonut.com"},
      {n:"Preston Dennett - author & researcher blog (abductions)",           u:"https://prestondennett.weebly.com"},
    ],
  },

  // ANCIENT CIVILIZATIONS - MORE RESEARCHERS & SOURCES
  {
    label:"Ancient Civilizations - More Researchers, Podcasts & YouTube",
    type:"research",
    items:[
      {n:"Randall Carlson - Kosmographia podcast & official site",            u:"https://www.randallcarlson.com"},
      {n:"Randall Carlson - Kosmographia on Spotify",                         u:"https://open.spotify.com/show/5lBcN9bRkDLqCqOEeQlFD1"},
      {n:"John Anthony West - official site (Egypt & Egyptology alternative)", u:"https://jawest.net"},
      {n:"Robert Schoch - official site (Sphinx water erosion research)",     u:"https://www.robertschoch.com"},
      {n:"Walter Cruttenden - Binary Research Institute (precession theory)", u:"https://binaryresearchinstitute.com"},
      {n:"Kosmographia Podcast - Randall Carlson (Apple Podcasts)",           u:"https://podcasts.apple.com/us/podcast/kosmographia-the-randall-carlson-podcast/id1457785237"},
      {n:"Matrix Wisdom YouTube - ancient mysteries & hidden history",        u:"https://www.youtube.com/@MatrixWisdom"},
    ],
  },

  // GOVERNMENT & INTELLIGENCE - MORE INVESTIGATIVE SOURCES
  {
    label:"Government & Intelligence - More Investigative Journalists & Sources",
    type:"research",
    items:[
      {n:"Brainwashed Podcast - CIA MKUltra investigations (Apple)",          u:"https://podcasts.apple.com/us/podcast/brainwashed/id1628768999"},
      {n:"Declassified UK - UK intelligence & military secrets",              u:"https://www.declassifieduk.org"},
      {n:"Redacted - Clayton Morris investigative news YouTube",              u:"https://www.youtube.com/@Redacted"},
      {n:"The Jimmy Dore Show - political commentary & investigation",        u:"https://www.youtube.com/@thejimmydoreshow"},
      {n:"Russell Brand Stay Free - alternative news & investigation",        u:"https://www.youtube.com/@RussellBrand"},
      {n:"George Webb Investigates - crowdsourced deep state research",       u:"https://www.youtube.com/@GeorgeWebb"},
      {n:"Dark Journalist - X Series & deep state research",                  u:"https://darkjournalist.com"},
      {n:"Newsbud - Sibel Edmonds (FBI whistleblower) investigative media",   u:"https://www.newsbud.com"},
    ],
  },

  // FINANCE & POWER - MORE BOOKS & INVESTIGATORS
  {
    label:"Finance & Power - More Books, Investigators & Resources",
    type:"research",
    items:[
      {n:"Ellen Brown - Web of Debt author & Public Banking Institute",       u:"https://ellenbrown.com"},
      {n:"Patrick Wood - Technocracy News (technocratic control system)",     u:"https://www.technocracy.news"},
      {n:"James Rickards - Currency Wars author official site",               u:"https://jamesrickards.com"},
      {n:"Mike Maloney - Hidden Secrets of Money official site",              u:"https://goldsilver.com/blog/"},
      {n:"Peter Schiff - Euro Pacific Capital & gold investment research",    u:"https://www.schiffradio.com"},
      {n:"Max Keiser - financial corruption & Bitcoin commentary",            u:"https://www.youtube.com/@maxkeiser6827"},
      {n:"Positive Money - campaigning for monetary reform (UK)",             u:"https://positivemoney.org"},
      {n:"American Monetary Institute - monetary reform research",            u:"https://www.monetary.org"},
      {n:"Dark to Light Podcast - government corruption (Apple Podcasts)",    u:"https://podcasts.apple.com/us/podcast/dark-to-light-with-frank-di-marco/id1442108588"},
      {n:"Making a Killing Podcast - global corruption (Spotify)",            u:"https://open.spotify.com/show/2c7yqJq8i7Wj2xMOD8hqMx"},
      {n:"Financial Rebellion - Catherine Austin Fitts (CHD TV)",             u:"https://childrenshealthdefense.org/community-forum/chd-tv/shows-and-films/financial-rebellion/"},
      {n:"Web of Debt Blog - Ellen Brown monetary system research",           u:"https://www.webofdebt.com"},
    ],
  },

  // HEALTH & BIOWEAPONS - MORE INVESTIGATORS & SOURCES
  {
    label:"Health, Bioweapons & Big Pharma - More Investigators & Sources",
    type:"research",
    items:[
      {n:"Dr. Meryl Nass - anthrax & bioweapons investigative physician",     u:"https://merylnass.substack.com"},
      {n:"Dr. Geert Vanden Bossche - vaccinologist whistleblower",            u:"https://www.geertvandenbossche.org"},
      {n:"Dr. Tess Lawrie - Evidence-Based Medicine Consultancy",             u:"https://www.bird-group.org"},
      {n:"Dr. Sherri Tenpenny - vaccine research & official site",            u:"https://vaxxter.com"},
      {n:"America's Frontline Doctors - suppressed treatment research",       u:"https://americasfrontlinedoctors.org"},
      {n:"Trial Site News - clinical trial & pharma investigative journalism",u:"https://trialsitenews.com"},
      {n:"Health Impact News - vaccine injury & suppressed health research",  u:"https://healthimpactnews.com"},
      {n:"Principia Scientific - peer review & science integrity",            u:"https://principia-scientific.com"},
      {n:"The Expose - UK health & government accountability journalism",     u:"https://expose-news.com"},
      {n:"Children Health Defense CHD TV - RFK Jr. (full archive)",          u:"https://childrenshealthdefense.org/community-forum/chd-tv/"},
    ],
  },

  // MISSING PERSONS & CRYPTIDS - MORE SOURCES
  {
    label:"Missing Persons, Cryptids & Wilderness Anomalies - More Sources",
    type:"research",
    items:[
      {n:"Bigfoot 911 - John Bruner research & investigations",               u:"https://www.bigfoot911.org"},
      {n:"Finding Bigfoot - Animal Planet series (IMDB)",                     u:"https://www.imdb.com/title/tt1877100/"},
      {n:"Crypto Four Corners - JC Johnson cryptid research archive",         u:"https://www.youtube.com/@CryptoFourCorners"},
      {n:"Sasquatch Chronicles - Wes Germer podcast (Apple Podcasts)",        u:"https://podcasts.apple.com/us/podcast/sasquatch-chronicles/id905378685"},
      {n:"Sasquatch Chronicles - Wes Germer podcast (Spotify)",               u:"https://open.spotify.com/show/2t4NcQfyNZa3hM7b6e2Tcg"},
      {n:"Missing Persons Advocacy Network (MPAN)",                           u:"https://www.missingpersonsadvocacynetwork.com"},
      {n:"The Charley Project - cold case missing persons database",          u:"https://www.charleyproject.org"},
      {n:"Doe Network - international missing & unidentified persons",        u:"https://www.doenetwork.org"},
      {n:"Bob Gymlan - YouTube Bigfoot & cryptid research channel",           u:"https://www.youtube.com/@BobGymlan"},
      {n:"Bigfoot Field Researchers Organization (BFRO)",                     u:"https://www.bfro.net"},
      {n:"Dogman Encounters Radio - Podcast (Apple Podcasts)",                u:"https://podcasts.apple.com/us/podcast/dogman-encounters-radio/id1020031213"},
    ],
  },

  // SIMULATION THEORY & CONSCIOUSNESS - MORE SOURCES
  {
    label:"Simulation Theory, Consciousness & Reality - More Sources",
    type:"research",
    items:[
      {n:"Donald Hoffman - Case Against Reality official site",               u:"https://www.donaldhoffman.com"},
      {n:"Tom Campbell YouTube - consciousness & simulation theory",          u:"https://www.youtube.com/@TomCampbell9"},
      {n:"Analytic Idealism - Bernardo Kastrup official site",                u:"https://www.bernardokastrup.com"},
      {n:"Bernardo Kastrup YouTube - consciousness & metaphysics",            u:"https://www.youtube.com/@bernardokastrup"},
      {n:"Federico Faggin - consciousness physics (inventor of Intel chip)",  u:"https://www.fagginfoundation.org"},
      {n:"Simulation Hypothesis - Rizwan Virk official site & book",          u:"https://www.zenentrepreneur.com/simulation-hypothesis"},
      {n:"The Simulation Hypothesis Podcast (Apple Podcasts)",                u:"https://podcasts.apple.com/us/podcast/the-simulation-hypothesis-podcast/id1474423522"},
      {n:"Mindscape - Sean Carroll physics & philosophy podcast (Spotify)",   u:"https://open.spotify.com/show/622lzLABHNlt0tqaLOFQnI"},
    ],
  },

  // DEEP STATE & GEOPOLITICS - MORE SOURCES
  {
    label:"Deep State, Geopolitics & Hidden Power - More Sources",
    type:"research",
    items:[
      {n:"Peter Dale Scott - Deep State author & researcher",                 u:"https://www.peterdalescott.net"},
      {n:"Mike Lofgren - The Deep State book & essays",                       u:"https://billmoyers.com/2014/02/21/anatomy-of-the-deep-state/"},
      {n:"Strategic Culture Foundation - geopolitics research",               u:"https://www.strategic-culture.su"},
      {n:"Voltaire Network - Thierry Meyssan geopolitics investigation",      u:"https://www.voltairenet.org"},
      {n:"Truthout - independent progressive journalism & investigation",     u:"https://truthout.org"},
      {n:"OCCRP - Organized Crime & Corruption Reporting Project",            u:"https://www.occrp.org"},
      {n:"International Consortium of Investigative Journalists (ICIJ)",      u:"https://www.icij.org"},
      {n:"Forbidden Knowledge TV - Alexandra Bruce investigative blog",       u:"https://forbiddenknowledgetv.net"},
      {n:"Empire Files - Abby Martin investigative journalism",               u:"https://www.youtube.com/@EmpireFiles"},
      {n:"The Duran - Alexander Mercouris geopolitical analysis",             u:"https://www.youtube.com/@TheDuran"},
    ],
  },,
// PODCASTS - UAP / ALIEN / PARANORMAL (APPLE PODCASTS - VERIFIED)
  {
    label:"Podcasts - UAP, Alien & Paranormal (Apple Podcasts - Verified)",
    type:"podcast",
    items:[
      {n:"FADE to BLACK - Jimmy Church (UFO/paranormal/conspiracy) Apple",      u:"https://podcasts.apple.com/us/podcast/fade-to-black-w-jimmy-church-podcast/id1844708065"},
      {n:"UFO Chronicles Podcast - Nik Hunter (witness accounts) Apple",        u:"https://podcasts.apple.com/gb/podcast/ufo-chronicles-podcast/id1488874171"},
      {n:"Podcast UFO - Martin Willis (close encounters) Apple",                u:"https://podcasts.apple.com/us/podcast/podcast-ufo/id550891984"},
      {n:"Monsters Among Us - Derek Hayes (paranormal witness accounts) Apple", u:"https://podcasts.apple.com/us/podcast/monsters-among-us/id1081827018"},
      {n:"Strange Planet - Richard Syrett (UFO/conspiracy/paranormal) Apple",   u:"https://podcasts.apple.com/us/podcast/strange-planet/id1200361736"},
    ],
  },

  // PODCASTS - UAP / ALIEN / PARANORMAL (SPOTIFY - VERIFIED)
  {
    label:"Podcasts - UAP, Alien & Paranormal (Spotify - Verified)",
    type:"podcast",
    items:[
      {n:"FADE to BLACK - Jimmy Church (UFO/paranormal) Spotify",               u:"https://open.spotify.com/show/0rhitA6q5dRp9kpnakF80C"},
      {n:"UFO Chronicles Podcast - Nik Hunter Spotify",                         u:"https://open.spotify.com/show/5EE7HbNItkQQbJdtZCHt88"},
      {n:"Expanded Perspectives - Kyle & Cameron Spotify",                      u:"https://open.spotify.com/show/5BYaXomPmGiUDSiPkByMeC"},
      {n:"Monsters Among Us - Derek Hayes Spotify",                             u:"https://open.spotify.com/show/6qU7bpasF6O7jMTRzeFCiL"},
    ],
  },

  // YOUTUBE - UAP / ALIEN SPECIFIC CHANNELS (VERIFIED)
  {
    label:"YouTube - UAP & Alien Specific Channels (Verified)",
    type:"podcast",
    items:[
      {n:"UFO Chronicles Podcast YouTube - witness encounter accounts",         u:"https://www.youtube.com/@UFOChroniclesPodcast"},
      {n:"FADE to BLACK - Jimmy Church YouTube (UFO/paranormal live radio)",    u:"https://www.youtube.com/@JimmyChurch"},
      {n:"Expanded Perspectives YouTube - ancient history & UFO",               u:"https://www.youtube.com/@ExpandedPerspectives"},
      {n:"Podcast UFO YouTube - close encounter interviews",                    u:"https://www.youtube.com/@podcastufo"},
      {n:"UAP Society YouTube - scientific UAP research & analysis",            u:"https://www.youtube.com/@UAPSociety"},
      {n:"The Black Vault YouTube - John Greenewald FOIA & UAP analysis",      u:"https://www.youtube.com/@TheBlackVault"},
      {n:"Disclosure Team YouTube - UAP disclosure news & analysis",            u:"https://www.youtube.com/@DisclosureTeam"},
      {n:"OPUS - Organization for Paranormal Understanding & Support YouTube",  u:"https://www.youtube.com/@OPUSParanormal"},
      {n:"Beyond Science YouTube - Mike Chen (paranormal & mysteries)",         u:"https://www.youtube.com/@BeyondScienceTV"},
    ],
  },

  // PODCASTS - CONSPIRACY & GOVERNMENT (APPLE - VERIFIED)
  {
    label:"Podcasts - Conspiracy, Government & Deep State (Apple - Verified)",
    type:"podcast",
    items:[
      {n:"The Corbett Report Podcast (Apple)",                                   u:"https://podcasts.apple.com/us/podcast/the-corbett-report-podcast/id836339988"},
      {n:"CovertAction Bulletin Podcast - CIA investigations (Apple)",           u:"https://podcasts.apple.com/us/podcast/covertaction-bulletin/id1600685707"},
      {n:"American Conspiracy - true government cover-ups (Apple)",             u:"https://podcasts.apple.com/us/podcast/american-conspiracy/id1594498010"},
      {n:"Tales from the Rabbit Hole - Mick West (skeptic/debunker) Apple",    u:"https://podcasts.apple.com/us/podcast/tales-from-the-rabbit-hole-podcast/id1487718935"},
      {n:"Skeptoid - Brian Dunning (science vs conspiracy) Apple",              u:"https://podcasts.apple.com/us/podcast/skeptoid/id206601988"},
    ],
  },

  // PODCASTS - ANCIENT HISTORY & ALTERNATIVE (APPLE - VERIFIED)
  {
    label:"Podcasts - Ancient History & Alternative Research (Apple - Verified)",
    type:"podcast",
    items:[
      {n:"The Ancients - History Hit (academic ancient history) Apple",         u:"https://podcasts.apple.com/us/podcast/the-ancients/id1467621237"},
      {n:"The Lost History Channel Podcast (Apple)",                            u:"https://podcasts.apple.com/us/podcast/the-lost-history-channel-tktc/id1477071771"},
    ],
  },

  // PODCASTS - ANCIENT HISTORY & ALTERNATIVE (SPOTIFY - VERIFIED)
  {
    label:"Podcasts - Ancient History & Alternative Research (Spotify - Verified)",
    type:"podcast",
    items:[
      {n:"Blurry Creatures Spotify",                                             u:"https://open.spotify.com/show/3qHNV03FLMFXx5ZDOnGqQk"},
    ],
  },

  // YOUTUBE - ANCIENT HISTORY & ALTERNATIVE (VERIFIED CHANNELS)
  {
    label:"YouTube - Ancient History & Alternative Research (Verified Channels)",
    type:"podcast",
    items:[
      {n:"Graham Hancock Official YouTube",                                      u:"https://www.youtube.com/@GrahamHancockDotCom"},
      {n:"Mystery History YouTube - ancient anomalies & suppressed history",     u:"https://www.youtube.com/@MysteryHistory2"},
    ],
  },

  // YOUTUBE - PARANORMAL & CRYPTIDS (VERIFIED CHANNELS)
  {
    label:"YouTube - Paranormal, Cryptids & Mysteries (Verified Channels)",
    type:"podcast",
    items:[
      {n:"Nukes Top 5 - top 5 mysteries & unexplained (3.4M subs) YouTube",    u:"https://www.youtube.com/@NukesTop5"},
      {n:"Let Me Explain - paranormal investigation YouTube",                   u:"https://www.youtube.com/@LetMeExplainStudios"},
      {n:"Thoughty2 - unexplained history & mysteries YouTube",                 u:"https://www.youtube.com/@Thoughty2"},
      {n:"Huff Paranormal - life after death research YouTube (1.6M subs)",    u:"https://www.youtube.com/@HuffParanormal"},
      {n:"Top5s - paranormal & true horror YouTube (4.6M subs)",               u:"https://www.youtube.com/@Top5s"},
      {n:"Paranormal Files - haunted locations & investigation YouTube",        u:"https://www.youtube.com/@TheParanormalFiles"},
      {n:"Bedtime Stories - horror & true paranormal YouTube",                  u:"https://www.youtube.com/@BedroomStoriesYT"},
    ],
  },

  // YOUTUBE - GOVERNMENT, INTELLIGENCE & DEEP STATE (VERIFIED)
  {
    label:"YouTube - Government, Intelligence & Deep State (Verified Channels)",
    type:"podcast",
    items:[
      {n:"Corbett Report YouTube - James Corbett deep state research",          u:"https://www.youtube.com/@corbettreport"},
      {n:"Kim Iversen YouTube - independent political commentary",              u:"https://www.youtube.com/@KimIversen"},
      {n:"Valuetainment - Patrick Bet-David deep dive interviews YouTube",      u:"https://www.youtube.com/@Valuetainment"},
      {n:"Dark Journalist - X Series YouTube",                                  u:"https://www.youtube.com/@DarkJournalist"},
    ],
  },

  // YOUTUBE - SCIENCE, CONSCIOUSNESS & FORBIDDEN TOPICS (VERIFIED)
  {
    label:"YouTube - Science, Consciousness & Forbidden Topics (Verified)",
    type:"podcast",
    items:[
      {n:"Eric Weinstein - The Portal YouTube",                                 u:"https://www.youtube.com/@EricWeinsteinPhD"},
    ],
  },

  // KEY ARTICLES - DIRECT LINKS TO SPECIFIC INVESTIGATIVE PIECES
  {
    label:"Key Articles - Direct Links to Specific Investigative Pieces",
    type:"blog",
    items:[
      {n:"The Intercept - The Drone Papers (Oct 2015)",                         u:"https://theintercept.com/drone-papers/"},
      {n:"The Guardian - NSA collecting phone records of millions (Snowden)",   u:"https://www.theguardian.com/world/2013/jun/06/nsa-phone-records-verizon-court-order"},
      {n:"Washington Post - PRISM program (Snowden disclosures 2013)",          u:"https://www.washingtonpost.com/investigations/us-intelligence-mining-data-from-nine-us-internet-companies-in-broad-secret-program/2013/06/06/3a0c0da8-cebf-11e2-8845-d970ccb04497_story.html"},
      {n:"New Yorker - Seymour Hersh on Abu Ghraib (May 2004)",                u:"https://www.newyorker.com/magazine/2004/05/10/torture-at-abu-ghraib"},
    ],
  },,
// PODCASTS - UFO/UAP TOP RANKED (APPLE + SPOTIFY VERIFIED LINKS)
  {
    label:"Podcasts - UFO & UAP Top Ranked (Apple & Spotify Verified)",
    type:"podcast",
    items:[
      {n:"Mysterious Universe - Aaron Wright & Benjamin Grundy (Apple 7.7K reviews)",  u:"https://podcasts.apple.com/us/podcast/mysterious-universe/id329937558"},
      {n:"Mysterious Universe - Spotify (#32 US charts)",                              u:"https://open.spotify.com/show/2jUIHJh8tpRxk6YLafhswz"},
      {n:"That UFO Podcast - Spotify (#32 US charts)",                                 u:"https://open.spotify.com/show/1ZKd55G0F5RgvOafSZcOYv"},
      {n:"Somewhere in the Skies - Ryan Sprague (Apple)",                              u:"https://podcasts.apple.com/us/podcast/somewhere-in-the-skies/id1227858637"},
      {n:"Somewhere in the Skies - Spotify (#36 US charts)",                           u:"https://open.spotify.com/show/1g0MSTxiHo4KvtrUxhr6II"},
      {n:"UAP Unidentified Alien Podcast - Stephen Diener (Apple 627 reviews)",        u:"https://podcasts.apple.com/us/podcast/uap-unidentified-alien-podcast/id1575781850"},
      {n:"UAP Unidentified Alien Podcast - Spotify (#28 US charts)",                   u:"https://open.spotify.com/show/5hTisJljTVk2VnGvxgRFSJ"},
      {n:"UFO Warning - breaking UAP news (Apple)",                                    u:"https://podcasts.apple.com/us/podcast/ufo-warning/id1484595516"},
    ],
  },

  // PODCASTS - PARANORMAL TOP RANKED (APPLE + SPOTIFY VERIFIED)
  {
    label:"Podcasts - Paranormal Top Ranked (Apple & Spotify Verified)",
    type:"podcast",
    items:[
      {n:"Last Podcast On The Left - #5 Spotify US (Apple 61K reviews)",               u:"https://podcasts.apple.com/us/podcast/last-podcast-on-the-left/id437299706"},
      {n:"Last Podcast On The Left - Spotify (#5 US charts)",                          u:"https://open.spotify.com/show/3yZg2MCkf31pPXiG4nznrg"},
      {n:"Spooked - KQED/Snap Judgment true supernatural (Apple #6 US)",               u:"https://podcasts.apple.com/us/podcast/spooked/id1279361017"},
      {n:"Spooked - Spotify",                                                            u:"https://open.spotify.com/show/76571Rfl3m7PLJQZKQIGCT"},
      {n:"Uncanny - BBC Danny Robins paranormal (Apple #7 GB, 3.8K reviews)",          u:"https://podcasts.apple.com/us/podcast/uncanny/id1589938734"},
      {n:"Uncanny - BBC Spotify (#7 GB charts)",                                        u:"https://open.spotify.com/show/2j4VI8Zd5wvUqbK3mFFlAH"},
      {n:"After Dark: Myths Misdeeds & Paranormal - History Hit (Apple)",               u:"https://podcasts.apple.com/fi/podcast/after-dark-myths-misdeeds-the-paranormal/id1705694900"},
      {n:"After Dark - History Hit Spotify (#8 GB charts)",                             u:"https://open.spotify.com/show/2cWW36Ju9af7X3JqF7VmLT"},
    ],
  },

  // PODCASTS - CONSPIRACY & TRUTH (APPLE + SPOTIFY VERIFIED)
  {
    label:"Podcasts - Conspiracy, Truth & Deep Research (Apple & Spotify Verified)",
    type:"podcast",
    items:[
      {n:"Tin Foil Hat With Sam Tripoli - Spotify",                                     u:"https://open.spotify.com/show/6pLZn0WNSzWeSL7hP5cPiX"},
      {n:"Corbett Report - Spotify",                                                    u:"https://open.spotify.com/show/3OhEHWkBDlVKFKqwAFCJzT"},
    ],
  },

  // PODCASTS - ANCIENT HISTORY EXPANDED (APPLE + SPOTIFY VERIFIED)
  {
    label:"Podcasts - Ancient History & Alternative Research Expanded (Verified)",
    type:"podcast",
    items:[
      {n:"Dan Snow History Hit - mainstream history (Apple)",                            u:"https://podcasts.apple.com/us/podcast/dan-snows-history-hit/id1057699502"},
    ],
  },

  // PODCASTS - CONSCIOUSNESS, PSI & FORBIDDEN SCIENCE (VERIFIED)
  {
    label:"Podcasts - Consciousness, PSI & Forbidden Science (Apple & Spotify Verified)",
    type:"podcast",
    items:[
      {n:"The Portal - Eric Weinstein (Apple)",                                          u:"https://podcasts.apple.com/us/podcast/the-portal/id1469999563"},
      {n:"DarkHorse Podcast - Bret Weinstein (Apple)",                                  u:"https://podcasts.apple.com/us/podcast/darkhorse-podcast/id1471581521"},
      {n:"Mindscape - Sean Carroll Apple",                                               u:"https://podcasts.apple.com/us/podcast/sean-carrolls-mindscape-science-philosophy-culture/id1406534739"},
      {n:"Hidden Forces - Demetri Kofinas Apple",                                        u:"https://podcasts.apple.com/us/podcast/hidden-forces/id1205359334"},
    ],
  },

  // PODCASTS - HEALTH, VACCINES & BIG PHARMA (VERIFIED)
  {
    label:"Podcasts - Health, Vaccines & Big Pharma Research (Apple & Spotify Verified)",
    type:"podcast",
    items:[
      {n:"The Highwire with Del Bigtree - Apple Podcasts",                              u:"https://podcasts.apple.com/us/podcast/the-highwire-with-del-bigtree/id1454872369"},
      {n:"The Highwire - Spotify",                                                       u:"https://open.spotify.com/show/6muAEYrJOFbKbH1uo1B3A6"},
      {n:"Dr. Peter McCullough Podcast - Apple",                                         u:"https://podcasts.apple.com/us/podcast/courageous-discourse-with-peter-mccullough-john-leake/id1628942575"},
      {n:"Dr. Robert Malone - Apple Podcasts",                                           u:"https://podcasts.apple.com/us/podcast/malone-institute-podcast/id1613645789"},
      {n:"Brownstone Institute Podcast - Apple",                                         u:"https://podcasts.apple.com/us/podcast/brownstone-institute/id1603801915"},
      {n:"CHD TV - Children Health Defense (Apple)",                                     u:"https://podcasts.apple.com/us/podcast/chd-tv/id1532939034"},
      {n:"FLCCC Alliance Podcast - Apple",                                               u:"https://podcasts.apple.com/us/podcast/the-flccc-alliance-podcast/id1580476882"},
      {n:"Epoch Health Podcast - Apple",                                                 u:"https://podcasts.apple.com/us/podcast/epoch-health/id1603826523"},
    ],
  },

  // PODCASTS - MISSING PERSONS, CRYPTIDS & WILDERNESS (VERIFIED)
  {
    label:"Podcasts - Missing Persons, Cryptids & Wilderness Anomalies (Verified)",
    type:"podcast",
    items:[
      {n:"Missing 411 Strange Disappearances (Apple)",                                  u:"https://podcasts.apple.com/us/podcast/missing-411-strange-disappearances-in-national-parks/id1618084297"},
      {n:"Where Did the Road Go? - Seriah Azkath (Apple)",                              u:"https://podcasts.apple.com/us/podcast/where-did-the-road-go/id597316507"},
      {n:"13 O Clock Podcast - paranormal true crime (Apple)",                          u:"https://podcasts.apple.com/us/podcast/13-o-clock/id968824259"},
      {n:"Cryptonaut Podcast - cryptid research (Apple)",                               u:"https://podcasts.apple.com/us/podcast/cryptonaut-podcast/id1454813085"},
      {n:"Bigfoot Society Podcast (Apple)",                                              u:"https://podcasts.apple.com/us/podcast/bigfoot-society/id1444738614"},
      {n:"Dogman Encounters - Spotify",                                                  u:"https://open.spotify.com/show/5AZQkFntd2X7Rhi18UUv0j"},
      {n:"Where Did the Road Go? - Spotify",                                            u:"https://open.spotify.com/show/5BCsNVjU3g5uOFjJPVHBDU"},
    ],
  },

  // PODCASTS - FINANCE, DEEP STATE & GEOPOLITICS (VERIFIED)
  {
    label:"Podcasts - Finance, Deep State & Geopolitics (Apple & Spotify Verified)",
    type:"podcast",
    items:[
      {n:"Solari Report - Catherine Austin Fitts (Apple)",                              u:"https://podcasts.apple.com/us/podcast/the-solari-report/id1151527809"},
      {n:"We Study Billionaires - Investor's Podcast (Apple)",                          u:"https://podcasts.apple.com/us/podcast/we-study-billionaires-the-investor-s-podcast/id928933489"},
      {n:"Peter Schiff Radio - gold & dollar collapse (Apple)",                        u:"https://podcasts.apple.com/us/podcast/the-peter-schiff-show-podcast/id404963432"},
      {n:"Financial Rebellion - Catherine Austin Fitts Spotify",                       u:"https://open.spotify.com/show/3LHtFoQGYqXOeVNUoP0gH1"},
      {n:"Making Sense - Sam Harris deep issues (Apple)",                               u:"https://podcasts.apple.com/us/podcast/making-sense-with-sam-harris/id733163012"},
      {n:"Geopolitics & Empire - Hrvoje Moric (Apple)",                                u:"https://podcasts.apple.com/us/podcast/geopolitics-empire/id1453746093"},
    ],
  },

  // PODCASTS - REMOTE VIEWING, PSI & METAPHYSICAL (VERIFIED)
  {
    label:"Podcasts - Remote Viewing, PSI & Metaphysical (Apple & Spotify Verified)",
    type:"podcast",
    items:[
      {n:"The Unexplained - Howard Hughes (Apple)",                                     u:"https://podcasts.apple.com/us/podcast/the-unexplained-with-howard-hughes/id266621475"},
      {n:"As You Wish Talk Radio - ECETI Ranch (Apple)",                               u:"https://podcasts.apple.com/us/podcast/as-you-wish-talk-radio/id1451534773"},
      {n:"Curious Minds - science & unexplained phenomena (Apple)",                    u:"https://podcasts.apple.com/us/podcast/curious-minds-a-science-podcast/id988560546"},
    ],
  },
];
export const PRIVACY_POLICY = `PRIVACY POLICY & TERMS OF USE  -  THE NEXUS
thenexusapp.com | Effective: \${new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})}

==================================
1. WHO WE ARE
==================================
The Nexus is an independent investigative research platform. We aggregate public records, declassified documents, investigative journalism, and community-submitted research for independent educational use. Not affiliated with any government, intelligence agency, political organization, or media company.

==================================
2. WHAT WE COLLECT
==================================
* NO account required to browse. No email, no passwords, no personal data collected by default.
* Community posts you submit are stored publicly on the platform and visible to all users.
* Payments are handled entirely by Stripe. We never see, store, or process your card details.
* Reddit integration uses Reddit's public API only. No Reddit user data is collected by us.
* AI Analysis queries are processed by Anthropic's API. See anthropic.com/privacy.
* We do not use cookies for tracking, advertising, or behavioral profiling.

==================================
3. WHAT WE DO NOT DO
==================================
* We do NOT sell, rent, or share any user data. Ever.
* We do NOT use advertising networks, tracking pixels, or behavioral analytics.
* We do NOT require account creation to browse free content.
* We do NOT store payment card details of any kind.
* We do NOT collect data on minors. This platform is for adults 18+ only.

==================================
4. TERMS OF USE
==================================
* This platform is for ADULTS aged 18 and older only.
* All content is for independent research and educational purposes only.
* The Nexus does not endorse, verify, or take editorial positions on any record or claim.
* Community posts must be based on publicly available information. Users confirm no copyright violations.
* Paid subscribers agree to Stripe's Terms of Service for payment processing.
* We reserve the right to remove community posts that violate these terms without notice.
* By using this platform you agree to these terms.

==================================
5. INTELLECTUAL PROPERTY
==================================
* All source links point to original external sources. The Nexus does not reproduce copyrighted material.
* Community posts remain the intellectual property of their authors.
* The Nexus platform design, code, and original text are proprietary.

==================================
6. YOUR RIGHTS
==================================
* You may request deletion of any community content you submitted at any time.
* You may cancel your paid subscription at any time through the Stripe customer portal.
* No personal data is stored by us beyond your community posts.

==================================
7. DISCLAIMER
==================================
The Nexus presents records, documents, and community research for independent examination. Inclusion of any record does not constitute endorsement. Users are encouraged to verify all claims independently. This platform is not a news organization, legal authority, or medical service.`;
