const usersGenders = ["Woman", "Man", "Nonbinary", "Other"];
const usersPronounces = ["She/Her", "He/Him", "They/Them", "Other"];
const usersSexualities = [
    "Straight",
    "Gay",
    "Lesbian",
    "Bisexual",
    "Asexual",
    "Demisexual",
    "Queer",
    "Skoliosexual",
    "Fluid",
    "Questioning",
    "Other",
];
const usersInterests = [
    "Cooking",
    "Traveling",
    "Reading",
    "Hiking",
    "Photography",
    "Painting",
    "Music",
    "Dancing",
    "Yoga",
    "Gardening",
    "Writing",
    "Coding",
    "Gaming",
    "Watching movies",
    "Woodworking",
    "Fashion design",
    "DIY crafts",
    "Learning languages",
    "Exercising",
    "Running",
    "Swimming",
    "Fishing",
    "Bird watching",
    "Skydiving",
    "Scuba diving",
    "Rock climbing",
    "Skiing",
    "Surfing",
    "Camping",
    "Playing musical instruments",
    "Volunteering",
    "Astrology",
    "Chess",
    "Board games",
    "Mixology",
    "Wine tasting",
    "Coffee brewing",
    "Travelling",
    "Urban exploration",
    "Stargazing",
    "Reading fiction",
    "Reading non-fiction",
    "Card games",
    "Table tennis",
    "Sudoku",
    "Crossword puzzles",
    "Sketching",
    "Origami",
    "Comic books",
    "Graphic novels",
    "Horror movies",
    "Documentaries",
    "Podcasting",
    "Collecting vinyl records",
    "Metal detecting",
    "Tattooing",
    "Bodybuilding",
    "Weightlifting",
    "Cycling",
    "Triathlon",
    "Archery",
    "Sailing",
    "Kayaking",
    "Paragliding",
    "Bungee jumping",
    "Zip-lining",
    "Mountaineering",
    "Base jumping",
    "Whitewater rafting",
    "Surfing",
    "Kiteboarding",
    "Wakeboarding",
    "Jet skiing",
    "Canyoning",
    "Ziplining",
    "Rollerblading",
    "Ice skating",
    "Skateboarding",
    "Slacklining",
    "Escape rooms",
    "Virtual reality gaming",
    "Paintballing",
    "Laser tag",
    "Go-karting",
    "Shooting range",
    "Archery tag",
    "Horseback riding",
    "Wildlife photography",
    "Zoology",
    "Meteorology",
    "Astronomy",
    "Astrophotography",
    "Geocaching",
    "Exploring abandoned places",
    "Ghost hunting",
    "Mythology",
    "Magic tricks",
    "Poker",
    "Billiards",
    "Bowling",
    "Golf",
    "Tennis",
    "Badminton",
    "Volleyball",
    "Basketball",
    "Football",
    "Soccer",
    "Rugby",
    "Cricket",
    "Baseball",
    "Hockey",
    "Boxing",
    "Martial arts",
    "Jiu-jitsu",
    "Wrestling",
    "Fencing",
    "Kickboxing",
    "Muay Thai",
    "Gymnastics",
    "Crossfit",
    "Calisthenics",
    "Mountain biking",
    "Trail running",
    "Ultra running",
    "Open water swimming",
    "Diving",
    "Skateboarding",
    "Snowboarding",
    "Skiing",
    "Caving",
    "Backpacking",
    "Survivalism",
    "Bushwalking",
    "Orienteering",
    "Stargazing",
    "Amateur radio",
    "Model building",
    "Drone flying",
    "Metal detecting",
    "Foraging",
    "Mushroom hunting",
    "Plant identification",
    "Gardening",
];
const usersLocations = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Côte d'Ivoire",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo (Congo-Brazzaville)",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czechia (Czech Republic)",
    "Democratic Republic of the Congo",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini (fmr. 'Swaziland')",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Holy See",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar (formerly Burma)",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Korea",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine State",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Korea",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States of America",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe"
];

module.exports = { usersGenders, usersPronounces, usersSexualities, usersInterests, usersLocations }
