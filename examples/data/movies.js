var movies = [
  {
    "name": "The Shawshank Redemption",
    "outline": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    "rating": 9.3,
    "director": "Frank Darabont",
    "year": 1994,
    "stars": [
      "Tim Robbins",
      "Morgan Freeman",
      "Bob Gunton"
    ],
    "runtime": 142,
    "genre": [
      "Crime",
      "Drama"
    ],
    "certificate": "R",
    "date": "1974-04-30T10:29:29+05:30",
    "actor": "Tim Robbins",
    "id": 1
  },
  {
    "name": "The Godfather",
    "outline": "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    "rating": 9.2,
    "director": "Francis Ford Coppola",
    "year": 1972,
    "stars": [
      "Marlon Brando",
      "Al Pacino",
      "James Caan"
    ],
    "runtime": 175,
    "genre": [
      "Crime",
      "Drama"
    ],
    "certificate": "R",
    "date": "1974-07-12T10:29:29+05:30",
    "actor": "Marlon Brando",
    "id": 2
  },
  {
    "name": "The Godfather: Part II",
    "outline": "The early life and career of Vito Corleone in 1920s New York is portrayed while his son, Michael, expands and tightens his grip on his crime syndicate stretching from Lake Tahoe, Nevada to pre-revolution 1958 Cuba.",
    "rating": 9.1,
    "director": "Francis Ford Coppola",
    "year": 1974,
    "stars": [
      "Al Pacino",
      "Robert De Niro",
      "Robert Duvall"
    ],
    "runtime": 200,
    "genre": [
      "Crime",
      "Drama"
    ],
    "certificate": "R",
    "date": "1992-08-23T10:29:29+05:30",
    "actor": "Al Pacino",
    "id": 3
  },
  {
    "name": "Pulp Fiction",
    "outline": "The lives of two mob hit men, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    "rating": 9.0,
    "director": "Quentin Tarantino",
    "year": 1994,
    "stars": [
      "John Travolta",
      "Uma Thurman",
      "Samuel L. Jackson"
    ],
    "runtime": 154,
    "genre": [
      "Crime",
      "Thriller"
    ],
    "certificate": "R",
    "date": "1994-02-09T10:29:29+05:30",
    "actor": "John Travolta",
    "id": 4
  },
  {
    "name": "The Good, the Bad and the Ugly",
    "outline": "A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.",
    "rating": 9.0,
    "director": "Sergio Leone",
    "year": 1966,
    "stars": [
      "Clint Eastwood",
      "Eli Wallach",
      "Lee Van Cleef"
    ],
    "runtime": 161,
    "genre": [
      "Adventure",
      "Western"
    ],
    "certificate": "TV_14",
    "date": "1980-10-05T10:29:29+05:30",
    "actor": "Clint Eastwood",
    "id": 5
  },
  {
    "name": "The Dark Knight",
    "outline": "When Batman, Gordon and Harvey Dent launch an assault on the mob, they let the clown out of the box, the Joker, bent on turning Gotham on itself and bringing any heroes down to his level.",
    "rating": 9.0,
    "director": "Christopher Nolan",
    "year": 2008,
    "stars": [
      "Christian Bale",
      "Heath Ledger",
      "Aaron Eckhart"
    ],
    "runtime": 152,
    "genre": [
      "Action",
      "Crime",
      "Drama",
      "Thriller"
    ],
    "certificate": "PG_13",
    "date": "2002-09-14T10:29:29+05:30",
    "actor": "Christian Bale",
    "id": 6
  },
  {
    "name": "12 Angry Men",
    "outline": "A dissenting juror in a murder trial slowly manages to convince the others that the case is not as obviously clear as it seemed in court.",
    "rating": 8.9,
    "director": "Sidney Lumet",
    "year": 1957,
    "stars": [
      "Henry Fonda",
      "Lee J. Cobb",
      "Martin Balsam"
    ],
    "runtime": 96,
    "genre": [
      "Drama"
    ],
    "certificate": "APPROVED",
    "date": "1993-11-21T10:29:29+05:30",
    "actor": "Henry Fonda",
    "id": 7
  },
  {
    "name": "Schindler's List",
    "outline": "In Poland during World War II, Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
    "rating": 8.9,
    "director": "Steven Spielberg",
    "year": 1993,
    "stars": [
      "Liam Neeson",
      "Ralph Fiennes",
      "Ben Kingsley"
    ],
    "runtime": 195,
    "genre": [
      "Biography",
      "Drama",
      "History",
      "War"
    ],
    "certificate": "R",
    "date": "1991-03-02T10:29:29+05:30",
    "actor": "Liam Neeson",
    "id": 8
  },
  {
    "name": "The Lord of the Rings: The Return of the King",
    "outline": "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
    "rating": 8.9,
    "director": "Peter Jackson",
    "year": 2003,
    "stars": [
      "Elijah Wood",
      "Viggo Mortensen",
      "Ian McKellen"
    ],
    "runtime": 201,
    "genre": [
      "Action",
      "Adventure",
      "Fantasy"
    ],
    "certificate": "PG_13",
    "date": "2007-01-29T10:29:29+05:30",
    "actor": "Elijah Wood",
    "id": 9
  },
  {
    "name": "Fight Club",
    "outline": "An insomniac office worker looking for a way to change his life crosses paths with a devil-may-care soap maker and they form an underground fight club that evolves into something much, much more...",
    "rating": 8.9,
    "director": "David Fincher",
    "year": 1999,
    "stars": [
      "Brad Pitt",
      "Edward Norton",
      "Helena Bonham Carter"
    ],
    "runtime": 139,
    "genre": [
      "Drama"
    ],
    "certificate": "R",
    "date": "1989-05-06T10:29:29+05:30",
    "actor": "Brad Pitt",
    "id": 10
  },
  {
    "name": "Star Wars: Episode V - The Empire Strikes Back",
    "outline": "As Luke trains with Master Yoda to become a Jedi Knight, his friends evade the Imperial fleet under the command of Darth Vader who is obsessed with turning Skywalker to the Dark Side of the Force.",
    "rating": 8.8,
    "director": "Irvin Kershner",
    "year": 1980,
    "stars": [
      "Mark Hamill",
      "Harrison Ford",
      "Carrie Fisher"
    ],
    "runtime": 124,
    "genre": [
      "Action",
      "Adventure",
      "Sci-Fi"
    ],
    "certificate": "PG",
    "date": "1993-02-18T10:29:29+05:30",
    "actor": "Mark Hamill",
    "id": 11
  },
  {
    "name": "The Lord of the Rings: The Fellowship of the Ring",
    "outline": "A meek hobbit of The Shire and eight companions set out on a journey to Mount Doom to destroy the One Ring and the dark lord Sauron.",
    "rating": 8.8,
    "director": "Peter Jackson",
    "year": 2001,
    "stars": [
      "Elijah Wood",
      "Ian McKellen",
      "Orlando Bloom"
    ],
    "runtime": 178,
    "genre": [
      "Action",
      "Adventure",
      "Fantasy"
    ],
    "certificate": "PG_13",
    "date": "1984-11-28T10:29:29+05:30",
    "actor": "Elijah Wood",
    "id": 12
  },
  {
    "name": "Inception",
    "outline": "A skilled extractor is offered a chance to regain his old life as payment for a task considered to be impossible.",
    "rating": 8.8,
    "director": "Christopher Nolan",
    "year": 2010,
    "stars": [
      "Leonardo DiCaprio",
      "Joseph Gordon-Levitt",
      "Ellen Page"
    ],
    "runtime": 148,
    "genre": [
      "Action",
      "Adventure",
      "Mystery",
      "Sci-Fi",
      "Thriller"
    ],
    "certificate": "PG_13",
    "date": "2009-02-18T10:29:29+05:30",
    "actor": "Leonardo DiCaprio",
    "id": 13
  },
  {
    "name": "One Flew Over the Cuckoo's Nest",
    "outline": "Upon admittance to a mental institution, a brash rebel rallies the patients to take on the oppressive head nurse, a woman he views as more dictator than nurse.",
    "rating": 8.8,
    "director": "Milos Forman",
    "year": 1975,
    "stars": [
      "Jack Nicholson",
      "Louise Fletcher",
      "Michael Berryman"
    ],
    "runtime": 133,
    "genre": [
      "Drama"
    ],
    "certificate": "R",
    "date": "1962-04-17T10:29:29+05:30",
    "actor": "Jack Nicholson",
    "id": 14
  },
  {
    "name": "Seven Samurai",
    "outline": "A poor village under attack by bandits recruits seven unemployed samurai to help them defend themselves.",
    "rating": 8.8,
    "director": "Akira Kurosawa",
    "year": 1954,
    "stars": [
      "Toshirô Mifune",
      "Takashi Shimura",
      "Keiko Tsushima"
    ],
    "runtime": 207,
    "genre": [
      "Action",
      "Drama"
    ],
    "certificate": "UNRATED",
    "date": "2011-01-08T10:29:29+05:30",
    "actor": "Toshirô Mifune",
    "id": 15
  },
  {
    "name": "Goodfellas",
    "outline": "Henry Hill and his friends work their way up through the mob hierarchy.",
    "rating": 8.8,
    "director": "Martin Scorsese",
    "year": 1990,
    "stars": [
      "Robert De Niro",
      "Ray Liotta",
      "Joe Pesci"
    ],
    "runtime": 146,
    "genre": [
      "Biography",
      "Crime",
      "Drama",
      "Thriller"
    ],
    "certificate": "R",
    "date": "1980-08-13T10:29:29+05:30",
    "actor": "Robert De Niro",
    "id": 16
  },
  {
    "name": "Star Wars",
    "outline": "Luke Skywalker, a spirited farm boy, joins rebel forces to save Princess Leia from the evil Darth Vader, and the galaxy from the Empire's planet-destroying Death Star.",
    "rating": 8.8,
    "director": "George Lucas",
    "year": 1977,
    "stars": [
      "Mark Hamill",
      "Harrison Ford",
      "Carrie Fisher"
    ],
    "runtime": 121,
    "genre": [
      "Action",
      "Adventure",
      "Fantasy",
      "Sci-Fi"
    ],
    "certificate": "PG",
    "date": "1978-05-18T10:29:29+05:30",
    "actor": "Mark Hamill",
    "id": 17
  },
  {
    "name": "Forrest Gump",
    "outline": "Forrest Gump, while not intelligent, has accidentally been present at many historic moments, but his true love, Jenny Curran, eludes him.",
    "rating": 8.7,
    "director": "Robert Zemeckis",
    "year": 1994,
    "stars": [
      "Tom Hanks",
      "Robin Wright",
      "Gary Sinise"
    ],
    "runtime": 142,
    "genre": [
      "Drama",
      "Romance"
    ],
    "certificate": "PG_13",
    "date": "1981-11-14T10:29:29+05:30",
    "actor": "Tom Hanks",
    "id": 18
  },
  {
    "name": "The Lord of the Rings: The Two Towers",
    "outline": "While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Sauron's new ally, Saruman, and his hordes of Isengard.",
    "rating": 8.7,
    "director": "Peter Jackson",
    "year": 2002,
    "stars": [
      "Elijah Wood",
      "Ian McKellen",
      "Viggo Mortensen"
    ],
    "runtime": 179,
    "genre": [
      "Action",
      "Adventure",
      "Fantasy"
    ],
    "certificate": "PG_13",
    "date": "1965-05-08T10:29:29+05:30",
    "actor": "Elijah Wood",
    "id": 19
  },
  {
    "name": "The Matrix",
    "outline": "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    "rating": 8.7,
    "director": "Andy Wachowski",
    "year": 1999,
    "stars": [
      "Lana Wachowski",
      "Keanu Reeves",
      "Laurence Fishburne",
      "Carrie-Anne Moss"
    ],
    "runtime": 136,
    "genre": [
      "Action",
      "Adventure",
      "Sci-Fi"
    ],
    "certificate": "R",
    "date": "1990-11-29T10:29:29+05:30",
    "actor": "Lana Wachowski",
    "id": 20
  },
  {
    "name": "City of God",
    "outline": "Two boys growing up in a violent neighborhood of Rio de Janeiro take different paths: one becomes a photographer, the other a drug dealer.",
    "rating": 8.7,
    "director": "Fernando Meirelles",
    "year": 2002,
    "stars": [
      "Kátia Lund",
      "Alexandre Rodrigues",
      "Matheus Nachtergaele",
      "Leandro Firmino"
    ],
    "runtime": 130,
    "genre": [
      "Crime",
      "Drama"
    ],
    "certificate": "R",
    "date": "2004-10-25T10:29:29+05:30",
    "actor": "Kátia Lund",
    "id": 21
  },
  {
    "name": "Once Upon a Time in the West",
    "outline": "Epic story of a mysterious stranger with a harmonica who joins forces with a notorious desperado to protect a beautiful widow from a ruthless assassin working for the railroad.",
    "rating": 8.7,
    "director": "Sergio Leone",
    "year": 1968,
    "stars": [
      "Henry Fonda",
      "Charles Bronson",
      "Claudia Cardinale"
    ],
    "runtime": 175,
    "genre": [
      "Adventure",
      "Western"
    ],
    "certificate": "United States-M",
    "date": "2009-01-30T10:29:29+05:30",
    "actor": "Henry Fonda",
    "id": 22
  },
  {
    "name": "Casablanca",
    "outline": "Set in unoccupied Africa during the early days of World War II: An American expatriate meets a former lover, with unforeseen complications.",
    "rating": 8.7,
    "director": "Michael Curtiz",
    "year": 1942,
    "stars": [
      "Humphrey Bogart",
      "Ingrid Bergman",
      "Paul Henreid"
    ],
    "runtime": 102,
    "genre": [
      "Drama",
      "Romance",
      "War"
    ],
    "certificate": "APPROVED",
    "date": "1970-04-10T10:29:29+05:30",
    "actor": "Humphrey Bogart",
    "id": 23
  },
  {
    "name": "The Usual Suspects",
    "outline": "A boat has been destroyed, criminals are dead, and the key to this mystery lies with the only survivor and his twisted, convoluted story beginning with five career crooks in a seemingly random police lineup.",
    "rating": 8.7,
    "director": "Bryan Singer",
    "year": 1995,
    "stars": [
      "Kevin Spacey",
      "Gabriel Byrne",
      "Chazz Palminteri"
    ],
    "runtime": 106,
    "genre": [
      "Crime",
      "Mystery",
      "Thriller"
    ],
    "certificate": "R",
    "date": "1984-06-14T10:29:29+05:30",
    "actor": "Kevin Spacey",
    "id": 24
  },
  {
    "name": "Se7en",
    "outline": "Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his modus operandi.",
    "rating": 8.7,
    "director": "David Fincher",
    "year": 1995,
    "stars": [
      "Morgan Freeman",
      "Brad Pitt",
      "Kevin Spacey"
    ],
    "runtime": 127,
    "genre": [
      "Crime",
      "Mystery",
      "Thriller"
    ],
    "certificate": "R",
    "date": "1989-07-10T10:29:29+05:30",
    "actor": "Morgan Freeman",
    "id": 25
  },
  {
    "name": "The Silence of the Lambs",
    "outline": "A young FBI cadet must confide in an incarcerated and manipulative killer to receive his help on catching another serial killer who skins his victims.",
    "rating": 8.7,
    "director": "Jonathan Demme",
    "year": 1991,
    "stars": [
      "Jodie Foster",
      "Anthony Hopkins",
      "Lawrence A. Bonney"
    ],
    "runtime": 118,
    "genre": [
      "Crime",
      "Drama",
      "Thriller"
    ],
    "certificate": "R",
    "date": "2009-10-29T10:29:29+05:30",
    "actor": "Jodie Foster",
    "id": 26
  },
  {
    "name": "It's a Wonderful Life",
    "outline": "An angel helps a compassionate but despairingly frustrated businessman by showing what life would have been like if he never existed.",
    "rating": 8.7,
    "director": "Frank Capra",
    "year": 1946,
    "stars": [
      "James Stewart",
      "Donna Reed",
      "Lionel Barrymore"
    ],
    "runtime": 130,
    "genre": [
      "Drama",
      "Family",
      "Fantasy"
    ],
    "certificate": "APPROVED",
    "date": "1982-05-20T10:29:29+05:30",
    "actor": "James Stewart",
    "id": 27
  },
  {
    "name": "Rear Window",
    "outline": "A wheelchair bound photographer spies on his neighbours from his apartment window and becomes convinced one of them has committed murder.",
    "rating": 8.7,
    "director": "Alfred Hitchcock",
    "year": 1954,
    "stars": [
      "James Stewart",
      "Grace Kelly",
      "Wendell Corey"
    ],
    "runtime": 112,
    "genre": [
      "Mystery",
      "Thriller"
    ],
    "certificate": "APPROVED",
    "date": "1968-10-12T10:29:29+05:30",
    "actor": "James Stewart",
    "id": 28
  },
  {
    "name": "Raiders of the Lost Ark",
    "outline": "Archeologist and adventurer Indiana Jones is hired by the US government to find the Ark of the Covenant before the Nazis.",
    "rating": 8.7,
    "director": "Steven Spielberg",
    "year": 1981,
    "stars": [
      "Harrison Ford",
      "Karen Allen",
      "Paul Freeman"
    ],
    "runtime": 115,
    "genre": [
      "Action",
      "Adventure"
    ],
    "certificate": "PG",
    "date": "2014-05-17T10:29:29+05:30",
    "actor": "Harrison Ford",
    "id": 29
  },
  {
    "name": "Léon: The Professional",
    "outline": "A professional assassin rescues a teenage girl whose parents were killed in a police raid.",
    "rating": 8.6,
    "director": "Luc Besson",
    "year": 1994,
    "stars": [
      "Jean Reno",
      "Gary Oldman",
      "Natalie Portman"
    ],
    "runtime": 110,
    "genre": [
      "Crime",
      "Drama",
      "Thriller"
    ],
    "certificate": "UNRATED",
    "date": "2004-02-02T10:29:29+05:30",
    "actor": "Jean Reno",
    "id": 30
  },
  {
    "name": "Psycho",
    "outline": "A thirty-something secretary steals $40,000 from her employer's client, and subsequently encounters a young motel proprietor too long under the domination of his mother.",
    "rating": 8.6,
    "director": "Alfred Hitchcock",
    "year": 1960,
    "stars": [
      "Anthony Perkins",
      "Janet Leigh",
      "Vera Miles"
    ],
    "runtime": 109,
    "genre": [
      "Horror",
      "Mystery",
      "Thriller"
    ],
    "certificate": "TV_14",
    "date": "1999-12-23T10:29:29+05:30",
    "actor": "Anthony Perkins",
    "id": 31
  },
  {
    "name": "The Dark Knight Rises",
    "outline": "Eight years on, a new evil rises from where the Batman and Commissioner Gordon tried to bury it, causing the Batman to resurface and fight to protect Gotham City... the very city which brands him an enemy.",
    "rating": 8.6,
    "director": "Christopher Nolan",
    "year": 2012,
    "stars": [
      "Christian Bale",
      "Tom Hardy",
      "Anne Hathaway"
    ],
    "runtime": 165,
    "genre": [
      "Action",
      "Crime",
      "Thriller"
    ],
    "certificate": "PG_13",
    "date": "2013-09-06T10:29:29+05:30",
    "actor": "Christian Bale",
    "id": 32
  },
  {
    "name": "Sunset Blvd.",
    "outline": "A hack screenwriter writes a screenplay for a former silent-film star who has faded into Hollywood obscurity.",
    "rating": 8.6,
    "director": "Billy Wilder",
    "year": 1950,
    "stars": [
      "William Holden",
      "Gloria Swanson",
      "Erich von Stroheim"
    ],
    "runtime": 110,
    "genre": [
      "Drama",
      "Film-Noir"
    ],
    "certificate": "APPROVED",
    "date": "1998-06-21T10:29:29+05:30",
    "actor": "William Holden",
    "id": 33
  },
  {
    "name": "City Lights",
    "outline": "The Tramp struggles to help a blind flower girl he has fallen in love with.",
    "rating": 8.6,
    "director": "Charles Chaplin",
    "year": 1931,
    "stars": [
      "Charles Chaplin",
      "Virginia Cherrill",
      "Florence Lee"
    ],
    "runtime": 87,
    "genre": [
      "Comedy",
      "Drama",
      "Romance"
    ],
    "certificate": "United States-PASSED",
    "date": "2000-05-05T10:29:29+05:30",
    "actor": "Charles Chaplin",
    "id": 34
  },
  {
    "name": "American History X",
    "outline": "A former neo-nazi skinhead tries to prevent his younger brother from going down the same wrong path that he did.",
    "rating": 8.6,
    "director": "Tony Kaye",
    "year": 1998,
    "stars": [
      "Edward Norton",
      "Edward Furlong",
      "Beverly D'Angelo"
    ],
    "runtime": 119,
    "genre": [
      "Crime",
      "Drama"
    ],
    "certificate": "R",
    "date": "2001-07-07T10:29:29+05:30",
    "actor": "Edward Norton",
    "id": 35
  },
  {
    "name": "Django Unchained",
    "outline": "With the help of a German bounty hunter, a freed slave sets out to rescue his wife from a brutal Mississippi plantation owner.",
    "rating": 8.6,
    "director": "Quentin Tarantino",
    "year": 2012,
    "stars": [
      "Jamie Foxx",
      "Christoph Waltz",
      "Leonardo DiCaprio"
    ],
    "runtime": 165,
    "genre": [
      "Adventure",
      "Crime",
      "Drama",
      "Western"
    ],
    "certificate": "R",
    "date": "1966-10-17T10:29:29+05:30",
    "actor": "Jamie Foxx",
    "id": 36
  },
  {
    "name": "Memento",
    "outline": "A man, suffering from short-term memory loss, uses notes and tattoos to hunt for the man he thinks killed his wife.",
    "rating": 8.6,
    "director": "Christopher Nolan",
    "year": 2000,
    "stars": [
      "Guy Pearce",
      "Carrie-Anne Moss",
      "Joe Pantoliano"
    ],
    "runtime": 113,
    "genre": [
      "Mystery",
      "Thriller"
    ],
    "certificate": "R",
    "date": "1976-06-23T10:29:29+05:30",
    "actor": "Guy Pearce",
    "id": 37
  },
  {
    "name": "Apocalypse Now",
    "outline": "During the U.S.-Viet Nam War, Captain Willard is sent on a dangerous mission into Cambodia to assassinate a renegade colonel who has set himself up as a god among a local tribe.",
    "rating": 8.6,
    "director": "Francis Ford Coppola",
    "year": 1979,
    "stars": [
      "Martin Sheen",
      "Marlon Brando",
      "Robert Duvall"
    ],
    "runtime": 153,
    "genre": [
      "Drama",
      "War"
    ],
    "certificate": "R",
    "date": "1969-12-13T10:29:29+05:30",
    "actor": "Martin Sheen",
    "id": 38
  },
  {
    "name": "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
    "outline": "An insane general starts a process to nuclear holocaust that a war room of politicians and generals frantically try to stop.",
    "rating": 8.6,
    "director": "Stanley Kubrick",
    "year": 1964,
    "stars": [
      "Peter Sellers",
      "George C. Scott",
      "Sterling Hayden"
    ],
    "runtime": 95,
    "genre": [
      "Comedy",
      "War"
    ],
    "certificate": "APPROVED",
    "date": "2014-01-13T10:29:29+05:30",
    "actor": "Peter Sellers",
    "id": 39
  },
  {
    "name": "Spirited Away",
    "outline": "In the middle of her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and monsters; where humans are changed into animals; and a bathhouse for these creatures.",
    "rating": 8.6,
    "director": "Hayao Miyazaki",
    "year": 2001,
    "stars": [
      "Daveigh Chase",
      "Suzanne Pleshette",
      "Miyu Irino"
    ],
    "runtime": 125,
    "genre": [
      "Animation",
      "Adventure",
      "Family",
      "Fantasy"
    ],
    "certificate": "PG",
    "date": "1972-07-29T10:29:29+05:30",
    "actor": "Daveigh Chase",
    "id": 40
  },
  {
    "name": "Terminator 2: Judgment Day",
    "outline": "The cyborg who once tried to kill Sarah Connor is dead, and another T-101 must now protect her teenage son, John Connor, from an even more powerful and advanced Terminator, the T-1000.",
    "rating": 8.6,
    "director": "James Cameron",
    "year": 1991,
    "stars": [
      "Arnold Schwarzenegger",
      "Linda Hamilton",
      "Edward Furlong"
    ],
    "runtime": 137,
    "genre": [
      "Action",
      "Sci-Fi",
      "Thriller"
    ],
    "certificate": "R",
    "date": "1993-11-14T10:29:29+05:30",
    "actor": "Arnold Schwarzenegger",
    "id": 41
  },
  {
    "name": "Saving Private Ryan",
    "outline": "Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.",
    "rating": 8.6,
    "director": "Steven Spielberg",
    "year": 1998,
    "stars": [
      "Tom Hanks",
      "Matt Damon",
      "Tom Sizemore"
    ],
    "runtime": 169,
    "genre": [
      "Action",
      "Drama",
      "War"
    ],
    "certificate": "R",
    "date": "1961-11-27T10:29:29+05:30",
    "actor": "Tom Hanks",
    "id": 42
  },
  {
    "name": "Modern Times",
    "outline": "The Tramp struggles to live in modern industrial society with the help of a young homeless woman.",
    "rating": 8.6,
    "director": "Charles Chaplin",
    "year": 1936,
    "stars": [
      "Charles Chaplin",
      "Paulette Goddard",
      "Henry Bergman"
    ],
    "runtime": 87,
    "genre": [
      "Comedy",
      "Drama"
    ],
    "certificate": "APPROVED",
    "date": "1973-06-27T10:29:29+05:30",
    "actor": "Charles Chaplin",
    "id": 43
  },
  {
    "name": "The Intouchables",
    "outline": "After he becomes a quadriplegic from a paragliding accident, an aristocrat hires a young man from the projects to be his caretaker.",
    "rating": 8.5,
    "director": "Olivier Nakache",
    "year": 2011,
    "stars": [
      "Eric Toledano",
      "François Cluzet",
      "Omar Sy",
      "Anne Le Ny"
    ],
    "runtime": 112,
    "genre": [
      "Biography",
      "Comedy",
      "Drama"
    ],
    "certificate": "R",
    "date": "2001-02-01T10:29:29+05:30",
    "actor": "Eric Toledano",
    "id": 44
  },
  {
    "name": "North by Northwest",
    "outline": "A hapless New York advertising executive is mistaken for a government agent by a group of foreign spies, and is pursued across the country while he looks for a way to survive.",
    "rating": 8.5,
    "director": "Alfred Hitchcock",
    "year": 1959,
    "stars": [
      "Cary Grant",
      "Eva Marie Saint",
      "James Mason"
    ],
    "runtime": 136,
    "genre": [
      "Action",
      "Adventure",
      "Mystery",
      "Thriller"
    ],
    "certificate": "APPROVED",
    "date": "1977-07-07T10:29:29+05:30",
    "actor": "Cary Grant",
    "id": 45
  },
  {
    "name": "Alien",
    "outline": "The crew of a commercial deep space mining ship, investigating a suspected S.O.S., lands on a distant planet and discovers a nest of strange eggs.",
    "rating": 8.5,
    "director": "Ridley Scott",
    "year": 1979,
    "stars": [
      "Sigourney Weaver",
      "Tom Skerritt",
      "John Hurt"
    ],
    "runtime": 117,
    "genre": [
      "Horror",
      "Sci-Fi"
    ],
    "certificate": "TV_14",
    "date": "1982-09-09T10:29:29+05:30",
    "actor": "Sigourney Weaver",
    "id": 46
  },
  {
    "name": "M",
    "outline": "When the police in a German city are unable to catch a child-murderer, other criminals join in the manhunt.",
    "rating": 8.5,
    "director": "Fritz Lang",
    "year": 1931,
    "stars": [
      "Peter Lorre",
      "Ellen Widmann",
      "Inge Landgut"
    ],
    "runtime": 117,
    "genre": [
      "Crime",
      "Drama",
      "Film-Noir",
      "Thriller"
    ],
    "certificate": "TV_14",
    "date": "2007-09-24T10:29:29+05:30",
    "actor": "Peter Lorre",
    "id": 47
  },
  {
    "name": "Life Is Beautiful",
    "outline": "A Jewish man has a wonderful romance with the help of his humour, but must use that same quality to protect his son in a Nazi death camp.",
    "rating": 8.5,
    "director": "Roberto Benigni",
    "year": 1997,
    "stars": [
      "Rod Dean",
      "Roberto Benigni",
      "Nicoletta Braschi",
      "Giorgio Cantarini"
    ],
    "runtime": 116,
    "genre": [
      "Comedy",
      "Drama",
      "Romance",
      "War"
    ],
    "certificate": "PG_13",
    "date": "1967-12-05T10:29:29+05:30",
    "actor": "Rod Dean",
    "id": 48
  },
  {
    "name": "Paths of Glory",
    "outline": "When soldiers in WW1 refuse to continue with an impossible attack, their superiors decide to make an example of them.",
    "rating": 8.5,
    "director": "Stanley Kubrick",
    "year": 1957,
    "stars": [
      "Kirk Douglas",
      "Ralph Meeker",
      "Adolphe Menjou"
    ],
    "runtime": 88,
    "genre": [
      "Drama",
      "War"
    ],
    "certificate": "TV_14",
    "date": "1974-10-26T10:29:29+05:30",
    "actor": "Kirk Douglas",
    "id": 49
  },
  {
    "name": "Citizen Kane",
    "outline": "Following the death of a publishing tycoon, news reporters scramble to discover the meaning of his final utterance.",
    "rating": 8.5,
    "director": "Orson Welles",
    "year": 1941,
    "stars": [
      "Orson Welles",
      "Joseph Cotten",
      "Dorothy Comingore"
    ],
    "runtime": 119,
    "genre": [
      "Drama",
      "Mystery"
    ],
    "certificate": "APPROVED",
    "date": "1968-08-28T10:29:29+05:30",
    "actor": "Orson Welles",
    "id": 50
  },
  {
    "name": "Double Indemnity",
    "outline": "An insurance rep lets himself be talked into a murder/insurance fraud scheme that arouses an insurance investigator's suspicions.",
    "rating": 8.5,
    "director": "Billy Wilder",
    "year": 1944,
    "stars": [
      "Fred MacMurray",
      "Barbara Stanwyck",
      "Edward G. Robinson"
    ],
    "runtime": 107,
    "genre": [
      "Crime",
      "Drama",
      "Film-Noir",
      "Thriller"
    ],
    "certificate": "APPROVED",
    "date": "1994-03-21T10:29:29+05:30",
    "actor": "Fred MacMurray",
    "id": 51
  },
  {
    "name": "The Pianist",
    "outline": "A Polish Jewish musician struggles to survive the destruction of the Warsaw ghetto of World War II.",
    "rating": 8.5,
    "director": "Roman Polanski",
    "year": 2002,
    "stars": [
      "Adrien Brody",
      "Thomas Kretschmann",
      "Frank Finlay"
    ],
    "runtime": 150,
    "genre": [
      "Biography",
      "Drama",
      "History",
      "War"
    ],
    "certificate": "R",
    "date": "1995-10-02T10:29:29+05:30",
    "actor": "Adrien Brody",
    "id": 52
  },
  {
    "name": "Back to the Future",
    "outline": "A teenager is accidentally sent 30 years into the past in a time-traveling DeLorean invented by his friend, Dr. Emmett Brown, and must make sure his high-school-age parents unite in order to save his own existence.",
    "rating": 8.5,
    "director": "Robert Zemeckis",
    "year": 1985,
    "stars": [
      "Michael J. Fox",
      "Christopher Lloyd",
      "Lea Thompson"
    ],
    "runtime": 116,
    "genre": [
      "Adventure",
      "Comedy",
      "Sci-Fi"
    ],
    "certificate": "PG",
    "date": "1991-09-15T10:29:29+05:30",
    "actor": "Michael J. Fox",
    "id": 53
  },
  {
    "name": "The Departed",
    "outline": "An undercover state cop who infiltrated a Mafia clan and a mole in the police force working for the same mob race to track down and identify each other before being exposed to the enemy, after both sides realize their outfit has a rat.",
    "rating": 8.5,
    "director": "Martin Scorsese",
    "year": 2006,
    "stars": [
      "Leonardo DiCaprio",
      "Matt Damon",
      "Jack Nicholson"
    ],
    "runtime": 151,
    "genre": [
      "Crime",
      "Thriller"
    ],
    "certificate": "R",
    "date": "1972-04-28T10:29:29+05:30",
    "actor": "Leonardo DiCaprio",
    "id": 54
  },
  {
    "name": "The Shining",
    "outline": "A family heads to an isolated hotel for the winter where an evil and spiritual presence influences the father into violence, while his psychic son sees horrific forebodings from the past and of the future.",
    "rating": 8.5,
    "director": "Stanley Kubrick",
    "year": 1980,
    "stars": [
      "Jack Nicholson",
      "Shelley Duvall",
      "Danny Lloyd"
    ],
    "runtime": 146,
    "genre": [
      "Horror",
      "Mystery"
    ],
    "certificate": "R",
    "date": "2006-07-27T10:29:29+05:30",
    "actor": "Jack Nicholson",
    "id": 55
  },
  {
    "name": "Vertigo",
    "outline": "A retired San Francisco detective suffering from acrophobia investigates the strange activities of an old friend's much-younger wife, all the while becoming dangerously obsessed with her.",
    "rating": 8.5,
    "director": "Alfred Hitchcock",
    "year": 1958,
    "stars": [
      "James Stewart",
      "Kim Novak",
      "Barbara Bel Geddes"
    ],
    "runtime": 128,
    "genre": [
      "Mystery",
      "Romance",
      "Thriller"
    ],
    "certificate": "APPROVED",
    "date": "1993-02-25T10:29:29+05:30",
    "actor": "James Stewart",
    "id": 56
  },
  {
    "name": "The Lives of Others",
    "outline": "In 1984 East Berlin, an agent of the secret police, conducting surveillance on a writer and his lover, finds himself becoming increasingly absorbed by their lives.",
    "rating": 8.5,
    "director": "Florian Henckel von Donnersmarck",
    "year": 2006,
    "stars": [
      "Ulrich Mühe",
      "Martina Gedeck",
      "Sebastian Koch"
    ],
    "runtime": 137,
    "genre": [
      "Drama",
      "Thriller"
    ],
    "certificate": "R",
    "date": "1996-10-03T10:29:29+05:30",
    "actor": "Ulrich Mühe",
    "id": 57
  },
  {
    "name": "American Beauty",
    "outline": "Lester Burnham, a depressed suburban father in a mid-life crisis, decides to turn his hectic life around after developing an infatuation for his daughter's attractive friend.",
    "rating": 8.5,
    "director": "Sam Mendes",
    "year": 1999,
    "stars": [
      "Kevin Spacey",
      "Annette Bening",
      "Thora Birch"
    ],
    "runtime": 122,
    "genre": [
      "Drama"
    ],
    "certificate": "R",
    "date": "1967-03-31T10:29:29+05:30",
    "actor": "Kevin Spacey",
    "id": 58
  },
  {
    "name": "Toy Story 3",
    "outline": "The toys are mistakenly delivered to a day-care center instead of the attic right before Andy leaves for college, and it's up to Woody to convince the other toys that they weren't abandoned and to return home.",
    "rating": 8.5,
    "director": "Lee Unkrich",
    "year": 2010,
    "stars": [
      "Tom Hanks",
      "Tim Allen",
      "Joan Cusack"
    ],
    "runtime": 103,
    "genre": [
      "Animation",
      "Adventure",
      "Comedy",
      "Family",
      "Fantasy"
    ],
    "certificate": "G",
    "date": "1960-04-11T10:29:29+05:30",
    "actor": "Tom Hanks",
    "id": 59
  },
  {
    "name": "Aliens",
    "outline": "The planet from Alien has been colonized, but contact is lost. This time, the rescue team has impressive firepower, but will it be enough?",
    "rating": 8.5,
    "director": "James Cameron",
    "year": 1986,
    "stars": [
      "Sigourney Weaver",
      "Michael Biehn",
      "Carrie Henn"
    ],
    "runtime": 137,
    "genre": [
      "Action",
      "Adventure",
      "Sci-Fi",
      "Thriller"
    ],
    "certificate": "R",
    "date": "1988-09-08T10:29:29+05:30",
    "actor": "Sigourney Weaver",
    "id": 60
  },
  {
    "name": "The Great Dictator",
    "outline": "Dictator Adenoid Hynkel has a doppelganger, a poor but kind Jewish barber living in the slums, who one day is mistaken for Hynkel.",
    "rating": 8.5,
    "director": "Charles Chaplin",
    "year": 1940,
    "stars": [
      "Charles Chaplin",
      "Paulette Goddard",
      "Jack Oakie"
    ],
    "runtime": 125,
    "genre": [
      "Comedy",
      "Drama",
      "War"
    ],
    "certificate": "APPROVED",
    "date": "2010-04-06T10:29:29+05:30",
    "actor": "Charles Chaplin",
    "id": 61
  },
  {
    "name": "Taxi Driver",
    "outline": "A mentally unstable Vietnam war veteran works as a nighttime taxi driver in New York City where the perceived decadence and sleaze feeds his urge to violently lash out, attempting to save a teenage prostitute in the process.",
    "rating": 8.5,
    "director": "Martin Scorsese",
    "year": 1976,
    "stars": [
      "Robert De Niro",
      "Jodie Foster",
      "Cybill Shepherd"
    ],
    "runtime": 113,
    "genre": [
      "Crime",
      "Drama"
    ],
    "certificate": "R",
    "date": "2012-02-27T10:29:29+05:30",
    "actor": "Robert De Niro",
    "id": 62
  },
  {
    "name": "WALL·E",
    "outline": "In the distant future, a small waste collecting robot inadvertently embarks on a space journey that will ultimately decide the fate of mankind.",
    "rating": 8.5,
    "director": "Andrew Stanton",
    "year": 2008,
    "stars": [
      "Ben Burtt",
      "Elissa Knight",
      "Jeff Garlin"
    ],
    "runtime": 98,
    "genre": [
      "Animation",
      "Adventure",
      "Family",
      "Romance",
      "Sci-Fi"
    ],
    "certificate": "G",
    "date": "1985-05-21T10:29:29+05:30",
    "actor": "Ben Burtt",
    "id": 63
  },
  {
    "name": "A Separation",
    "outline": "A married couple are faced with a difficult decision - to improve the life of their child by moving to another country or to stay in Iran and look after a deteriorating parent who has Alzheimer's disease.",
    "rating": 8.5,
    "director": "Asghar Farhadi",
    "year": 2011,
    "stars": [
      "Payman Maadi",
      "Leila Hatami",
      "Sareh Bayat"
    ],
    "runtime": 123,
    "genre": [
      "Drama"
    ],
    "certificate": "PG_13",
    "date": "2013-11-07T10:29:29+05:30",
    "actor": "Payman Maadi",
    "id": 64
  },
  {
    "name": "Gladiator",
    "outline": "When a Roman general is betrayed and his family murdered by an emperor's corrupt son, he comes to Rome as a gladiator to seek revenge.",
    "rating": 8.5,
    "director": "Ridley Scott",
    "year": 2000,
    "stars": [
      "Russell Crowe",
      "Joaquin Phoenix",
      "Connie Nielsen"
    ],
    "runtime": 155,
    "genre": [
      "Action",
      "Adventure",
      "Drama"
    ],
    "certificate": "R",
    "date": "1981-02-25T10:29:29+05:30",
    "actor": "Russell Crowe",
    "id": 65
  },
  {
    "name": "Amélie",
    "outline": "Amelie, an innocent and naive girl in Paris, with her own sense of justice, decides to help those around her and along the way, discovers love.",
    "rating": 8.5,
    "director": "Jean-Pierre Jeunet",
    "year": 2001,
    "stars": [
      "Audrey Tautou",
      "Mathieu Kassovitz",
      "Rufus"
    ],
    "runtime": 122,
    "genre": [
      "Comedy",
      "Romance"
    ],
    "certificate": "R",
    "date": "1980-01-24T10:29:29+05:30",
    "actor": "Audrey Tautou",
    "id": 66
  },
  {
    "name": "The Green Mile",
    "outline": "The lives of guards on Death Row are affected by one of their charges: a black man accused of child murder and rape, yet who has a mysterious gift.",
    "rating": 8.5,
    "director": "Frank Darabont",
    "year": 1999,
    "stars": [
      "Tom Hanks",
      "Michael Clarke Duncan",
      "David Morse"
    ],
    "runtime": 189,
    "genre": [
      "Crime",
      "Drama",
      "Fantasy",
      "Mystery"
    ],
    "certificate": "R",
    "date": "1974-12-20T10:29:29+05:30",
    "actor": "Tom Hanks",
    "id": 67
  },
  {
    "name": "A Clockwork Orange",
    "outline": "In future Britain, charismatic delinquent Alex DeLarge is jailed and volunteers for an experimental aversion therapy developed by the government in an effort to solve society's crime problem... but not all goes to plan.",
    "rating": 8.5,
    "director": "Stanley Kubrick",
    "year": 1971,
    "stars": [
      "Malcolm McDowell",
      "Patrick Magee",
      "Michael Bates"
    ],
    "runtime": 136,
    "genre": [
      "Crime",
      "Drama",
      "Sci-Fi"
    ],
    "certificate": "R",
    "date": "2006-07-03T10:29:29+05:30",
    "actor": "Malcolm McDowell",
    "id": 68
  },
  {
    "name": "Lawrence of Arabia",
    "outline": "A flamboyant and controversial British military figure and his conflicted loyalties during his World War I service in Arabia.",
    "rating": 8.5,
    "director": "David Lean",
    "year": 1962,
    "stars": [
      "Peter O'Toole",
      "Alec Guinness",
      "Anthony Quinn"
    ],
    "runtime": 216,
    "genre": [
      "Adventure",
      "Biography",
      "Drama",
      "History",
      "War"
    ],
    "certificate": "TV_14",
    "date": "1992-06-01T10:29:29+05:30",
    "actor": "Peter O'Toole",
    "id": 69
  },
  {
    "name": "The Prestige",
    "outline": "The rivalry between two magicians is exacerbated when one of them performs the ultimate illusion.",
    "rating": 8.4,
    "director": "Christopher Nolan",
    "year": 2006,
    "stars": [
      "Christian Bale",
      "Hugh Jackman",
      "Scarlett Johansson"
    ],
    "runtime": 130,
    "genre": [
      "Drama",
      "Mystery",
      "Thriller"
    ],
    "certificate": "PG_13",
    "date": "1963-10-05T10:29:29+05:30",
    "actor": "Christian Bale",
    "id": 70
  },
  {
    "name": "Cinema Paradiso",
    "outline": "A filmmaker recalls his childhood, when he fell in love with the movies at his village's theater and formed a deep friendship with the theater's projectionist.",
    "rating": 8.4,
    "director": "Giuseppe Tornatore",
    "year": 1988,
    "stars": [
      "Philippe Noiret",
      "Enzo Cannavale",
      "Antonella Attili"
    ],
    "runtime": 155,
    "genre": [
      "Drama"
    ],
    "certificate": "R",
    "date": "2000-08-16T10:29:29+05:30",
    "actor": "Philippe Noiret",
    "id": 71
  },
  {
    "name": "To Kill a Mockingbird",
    "outline": "Atticus Finch, a lawyer in the Depression-era South, defends a black man against an undeserved rape charge, and his kids against prejudice.",
    "rating": 8.4,
    "director": "Robert Mulligan",
    "year": 1962,
    "stars": [
      "Gregory Peck",
      "John Megna",
      "Frank Overton"
    ],
    "runtime": 129,
    "genre": [
      "Crime",
      "Drama",
      "Mystery"
    ],
    "certificate": "APPROVED",
    "date": "2013-08-20T10:29:29+05:30",
    "actor": "Gregory Peck",
    "id": 72
  },
  {
    "name": "Das Boot",
    "outline": "The claustrophobic world of a WWII German U-boat; boredom, filth, and sheer terror.",
    "rating": 8.4,
    "director": "Wolfgang Petersen",
    "year": 1981,
    "stars": [
      "Jürgen Prochnow",
      "Herbert Grönemeyer",
      "Klaus Wennemann"
    ],
    "runtime": 149,
    "genre": [
      "Action",
      "Adventure",
      "Drama",
      "History",
      "War"
    ],
    "certificate": "UNRATED",
    "date": "1971-02-06T10:29:29+05:30",
    "actor": "Jürgen Prochnow",
    "id": 73
  },
  {
    "name": "The Treasure of the Sierra Madre",
    "outline": "Fred Dobbs and Bob Curtin, two Americans searching for work in Mexico, convince an old prospector to help them mine for gold in the Sierra Madre Mountains.",
    "rating": 8.4,
    "director": "John Huston",
    "year": 1948,
    "stars": [
      "Humphrey Bogart",
      "Walter Huston",
      "Tim Holt"
    ],
    "runtime": 126,
    "genre": [
      "Action",
      "Adventure",
      "Drama",
      "Western"
    ],
    "certificate": "TV_PG",
    "date": "2007-01-28T10:29:29+05:30",
    "actor": "Humphrey Bogart",
    "id": 74
  },
  {
    "name": "The Third Man",
    "outline": "Pulp novelist Holly Martins travels to shadowy, postwar Vienna, only to find himself investigating the mysterious death of an old friend, black-market opportunist Harry Lime.",
    "rating": 8.4,
    "director": "Carol Reed",
    "year": 1949,
    "stars": [
      "Orson Welles",
      "Joseph Cotten",
      "Alida Valli"
    ],
    "runtime": 104,
    "genre": [
      "Film-Noir",
      "Mystery",
      "Thriller"
    ],
    "certificate": "APPROVED",
    "date": "1978-07-18T10:29:29+05:30",
    "actor": "Orson Welles",
    "id": 75
  },
  {
    "name": "Reservoir Dogs",
    "outline": "After a simple jewelery heist goes terribly wrong, the surviving criminals begin to suspect that one of them is a police informant.",
    "rating": 8.4,
    "director": "Quentin Tarantino",
    "year": 1992,
    "stars": [
      "Harvey Keitel",
      "Tim Roth",
      "Michael Madsen"
    ],
    "runtime": 99,
    "genre": [
      "Crime",
      "Thriller"
    ],
    "certificate": "R",
    "date": "2005-12-28T10:29:29+05:30",
    "actor": "Harvey Keitel",
    "id": 76
  },
  {
    "name": "Requiem for a Dream",
    "outline": "The drug-induced utopias of four Coney Island individuals are shattered when their addictions become stronger.",
    "rating": 8.4,
    "director": "Darren Aronofsky",
    "year": 2000,
    "stars": [
      "Ellen Burstyn",
      "Jared Leto",
      "Jennifer Connelly"
    ],
    "runtime": 102,
    "genre": [
      "Drama"
    ],
    "certificate": "UNRATED",
    "date": "1972-12-28T10:29:29+05:30",
    "actor": "Ellen Burstyn",
    "id": 77
  },
  {
    "name": "Eternal Sunshine of the Spotless Mind",
    "outline": "A couple undergo a procedure to erase each other from their memories when their relationship turns sour, but it is only through the process of loss that they discover what they had to begin with.",
    "rating": 8.4,
    "director": "Michel Gondry",
    "year": 2004,
    "stars": [
      "Jim Carrey",
      "Kate Winslet",
      "Tom Wilkinson"
    ],
    "runtime": 108,
    "genre": [
      "Drama",
      "Romance",
      "Sci-Fi"
    ],
    "certificate": "R",
    "date": "2005-03-14T10:29:29+05:30",
    "actor": "Jim Carrey",
    "id": 78
  },
  {
    "name": "The Lion King",
    "outline": "Tricked into thinking he killed his father, a guilt ridden lion cub flees into exile and abandons his identity as the future King.",
    "rating": 8.4,
    "director": "Roger Allers",
    "year": 1994,
    "stars": [
      "Rob Minkoff",
      "Matthew Broderick",
      "Jeremy Irons",
      "James Earl Jones"
    ],
    "runtime": 89,
    "genre": [
      "Animation",
      "Adventure",
      "Drama",
      "Family",
      "Musical"
    ],
    "certificate": "G",
    "date": "1976-10-25T10:29:29+05:30",
    "actor": "Rob Minkoff",
    "id": 79
  },
  {
    "name": "Once Upon a Time in America",
    "outline": "A former Prohibition-era Jewish gangster returns to the Lower East Side of Manhattan over thirty years later, where he once again must confront the ghosts and regrets of his old life.",
    "rating": 8.4,
    "director": "Sergio Leone",
    "year": 1984,
    "stars": [
      "Robert De Niro",
      "James Woods",
      "Elizabeth McGovern"
    ],
    "runtime": 229,
    "genre": [
      "Crime",
      "Drama"
    ],
    "certificate": "R",
    "date": "1984-10-13T10:29:29+05:30",
    "actor": "Robert De Niro",
    "id": 80
  },
  {
    "name": "Bicycle Thieves",
    "outline": "A man and his son search for a stolen bicycle vital for his job.",
    "rating": 8.4,
    "director": "Vittorio De Sica",
    "year": 1948,
    "stars": [
      "Lamberto Maggiorani",
      "Enzo Staiola",
      "Lianella Carell"
    ],
    "runtime": 93,
    "genre": [
      "Crime",
      "Drama"
    ],
    "certificate": "NOT_RATED",
    "date": "2000-05-19T10:29:29+05:30",
    "actor": "Lamberto Maggiorani",
    "id": 81
  },
  {
    "name": "All About Eve",
    "outline": "An ingenue insinuates herself in to the company of an established but aging stage actress and her circle of theater friends.",
    "rating": 8.4,
    "director": "Joseph L. Mankiewicz",
    "year": 1950,
    "stars": [
      "Bette Davis",
      "Anne Baxter",
      "George Sanders"
    ],
    "runtime": 138,
    "genre": [
      "Drama"
    ],
    "certificate": "APPROVED",
    "date": "1993-09-20T10:29:29+05:30",
    "actor": "Bette Davis",
    "id": 82
  },
  {
    "name": "Grave of the Fireflies",
    "outline": "A tragic film covering a young boy and his little sister's struggle to survive in Japan during World War II.",
    "rating": 8.4,
    "director": "Isao Takahata",
    "year": 1988,
    "stars": [
      "Tsutomu Tatsumi",
      "Ayano Shiraishi",
      "Akemi Yamaguchi"
    ],
    "runtime": 89,
    "genre": [
      "Animation",
      "Drama",
      "War"
    ],
    "certificate": "TV_14",
    "date": "2006-12-19T10:29:29+05:30",
    "actor": "Tsutomu Tatsumi",
    "id": 83
  },
  {
    "name": "Singin' in the Rain",
    "outline": "A silent film production company and cast make a difficult transition to sound.",
    "rating": 8.4,
    "director": "Stanley Donen",
    "year": 1952,
    "stars": [
      "Gene Kelly",
      "Gene Kelly",
      "Donald O'Connor",
      "Debbie Reynolds"
    ],
    "runtime": 103,
    "genre": [
      "Comedy",
      "Musical",
      "Romance"
    ],
    "certificate": "APPROVED",
    "date": "1981-01-01T10:29:29+05:30",
    "actor": "Gene Kelly",
    "id": 84
  },
  {
    "name": "Witness for the Prosecution",
    "outline": "Agatha Christie tale of a man on trial for murder: a trial featuring surprise after surprise.",
    "rating": 8.4,
    "director": "Billy Wilder",
    "year": 1957,
    "stars": [
      "Tyrone Power",
      "Marlene Dietrich",
      "Charles Laughton"
    ],
    "runtime": 116,
    "genre": [
      "Drama",
      "Mystery"
    ],
    "certificate": "APPROVED",
    "date": "1966-03-12T10:29:29+05:30",
    "actor": "Tyrone Power",
    "id": 85
  },
  {
    "name": "Braveheart",
    "outline": "When his secret bride is executed for assaulting an English soldier whom tried to rape her, a commoner begins a revolt and leads Scottish warriors against the cruel English tyrant who rules Scotland with an iron-fist.",
    "rating": 8.4,
    "director": "Mel Gibson",
    "year": 1995,
    "stars": [
      "Mel Gibson",
      "Sophie Marceau",
      "Patrick McGoohan"
    ],
    "runtime": 177,
    "genre": [
      "Action",
      "Biography",
      "Drama",
      "History",
      "War"
    ],
    "certificate": "R",
    "date": "1971-10-30T10:29:29+05:30",
    "actor": "Mel Gibson",
    "id": 86
  },
  {
    "name": "Princess Mononoke",
    "outline": "On a journey to find the cure for a Tatarigami's curse, Ashitaka finds himself in the middle of a war between the forest gods and Tatara, a mining colony. In this quest he also meets San, the Mononoke Hime.",
    "rating": 8.4,
    "director": "Hayao Miyazaki",
    "year": 1997,
    "stars": [
      "Yôji Matsuda",
      "Yuriko Ishida",
      "Yûko Tanaka"
    ],
    "runtime": 134,
    "genre": [
      "Animation",
      "Adventure",
      "Fantasy"
    ],
    "certificate": "TV_14",
    "date": "1980-07-16T10:29:29+05:30",
    "actor": "Yôji Matsuda",
    "id": 87
  },
  {
    "name": "Star Wars: Episode VI - Return of the Jedi",
    "outline": "After rescuing Han Solo from the palace of Jabba the Hutt, the Rebels attempt to destroy the Second Death Star, while Luke Skywalker tries to bring his father back to the Light Side of the Force.",
    "rating": 8.4,
    "director": "Richard Marquand",
    "year": 1983,
    "stars": [
      "Mark Hamill",
      "Harrison Ford",
      "Carrie Fisher"
    ],
    "runtime": 134,
    "genre": [
      "Action",
      "Adventure",
      "Fantasy",
      "Sci-Fi"
    ],
    "certificate": "PG",
    "date": "1994-11-14T10:29:29+05:30",
    "actor": "Mark Hamill",
    "id": 88
  },
  {
    "name": "Rashomon",
    "outline": "A heinous crime and its aftermath are recalled from differing points of view.",
    "rating": 8.4,
    "director": "Akira Kurosawa",
    "year": 1950,
    "stars": [
      "Toshirô Mifune",
      "Machiko Kyô",
      "Masayuki Mori"
    ],
    "runtime": 88,
    "genre": [
      "Crime",
      "Drama"
    ],
    "certificate": "UNRATED",
    "date": "1966-07-13T10:29:29+05:30",
    "actor": "Toshirô Mifune",
    "id": 89
  },
  {
    "name": "Metropolis",
    "outline": "In a futuristic city sharply divided between the working class and the city planners, the son of the city's mastermind falls in love with a working class prophet who predicts the coming of a savior to mediate their differences.",
    "rating": 8.4,
    "director": "Fritz Lang",
    "year": 1927,
    "stars": [
      "Brigitte Helm",
      "Alfred Abel",
      "Gustav Fröhlich"
    ],
    "runtime": 153,
    "genre": [
      "Drama",
      "Sci-Fi"
    ],
    "certificate": "NOT_RATED",
    "date": "1987-01-19T10:29:29+05:30",
    "actor": "Brigitte Helm",
    "id": 90
  },
  {
    "name": "Oldboy",
    "outline": "After being kidnapped and imprisoned for 15 years, Oh Dae-Su is released, only to find that he must find his captor in 5 days.",
    "rating": 8.4,
    "director": "Chan-wook Park",
    "year": 2003,
    "stars": [
      "Min-sik Choi",
      "Ji-tae Yu",
      "Hye-jeong Kang"
    ],
    "runtime": 120,
    "genre": [
      "Drama",
      "Mystery",
      "Thriller"
    ],
    "certificate": "R",
    "date": "1988-12-24T10:29:29+05:30",
    "actor": "Min-sik Choi",
    "id": 91
  },
  {
    "name": "Monty Python and the Holy Grail",
    "outline": "King Arthur and his knights embark on a low-budget search for the Grail, encountering many very silly obstacles.",
    "rating": 8.4,
    "director": "Terry Gilliam",
    "year": 1975,
    "stars": [
      "Terry Jones",
      "Graham Chapman",
      "John Cleese",
      "Eric Idle"
    ],
    "runtime": 91,
    "genre": [
      "Adventure",
      "Comedy",
      "Fantasy"
    ],
    "certificate": "PG",
    "date": "1964-09-26T10:29:29+05:30",
    "actor": "Terry Jones",
    "id": 92
  },
  {
    "name": "Some Like It Hot",
    "outline": "When two musicians witness a mob hit, they flee the state in an all female band disguised as women, but further complications set in.",
    "rating": 8.4,
    "director": "Billy Wilder",
    "year": 1959,
    "stars": [
      "Marilyn Monroe",
      "Tony Curtis",
      "Jack Lemmon"
    ],
    "runtime": 120,
    "genre": [
      "Comedy"
    ],
    "certificate": "APPROVED",
    "date": "1978-10-07T10:29:29+05:30",
    "actor": "Marilyn Monroe",
    "id": 93
  },
  {
    "name": "Chinatown",
    "outline": "A private detective investigating an adultery case stumbles on to a scheme of murder that has something to do with water.",
    "rating": 8.4,
    "director": "Roman Polanski",
    "year": 1974,
    "stars": [
      "Jack Nicholson",
      "Faye Dunaway",
      "John Huston"
    ],
    "runtime": 130,
    "genre": [
      "Crime",
      "Drama",
      "Mystery"
    ],
    "certificate": "TV_14",
    "date": "2013-10-22T10:29:29+05:30",
    "actor": "Jack Nicholson",
    "id": 94
  },
  {
    "name": "Full Metal Jacket",
    "outline": "A pragmatic U.S. Marine observes the dehumanizing effects the Vietnam War has on his fellow Marine recruits from their brutal boot camp training to the bloody street fighting set in 1968 in Hue, Vietnam.",
    "rating": 8.4,
    "director": "Stanley Kubrick",
    "year": 1987,
    "stars": [
      "Matthew Modine",
      "R. Lee Ermey",
      "Vincent D'Onofrio"
    ],
    "runtime": 116,
    "genre": [
      "Drama",
      "War"
    ],
    "certificate": "R",
    "date": "1964-12-23T10:29:29+05:30",
    "actor": "Matthew Modine",
    "id": 95
  },
  {
    "name": "The Apartment",
    "outline": "A man tries to rise in his company by letting its executives use his apartment for trysts, but complications and a romance of his own ensue.",
    "rating": 8.4,
    "director": "Billy Wilder",
    "year": 1960,
    "stars": [
      "Jack Lemmon",
      "Shirley MacLaine",
      "Fred MacMurray"
    ],
    "runtime": 125,
    "genre": [
      "Comedy",
      "Drama",
      "Romance"
    ],
    "certificate": "APPROVED",
    "date": "1981-02-09T10:29:29+05:30",
    "actor": "Jack Lemmon",
    "id": 96
  },
  {
    "name": "Amadeus",
    "outline": "The incredible story of Wolfgang Amadeus Mozart, told in flashback by his peer and secret rival Antonio Salieri - now confined to an insane asylum.",
    "rating": 8.4,
    "director": "Milos Forman",
    "year": 1984,
    "stars": [
      "F. Murray Abraham",
      "Tom Hulce",
      "Elizabeth Berridge"
    ],
    "runtime": 160,
    "genre": [
      "Biography",
      "Drama",
      "Music"
    ],
    "certificate": "R",
    "date": "2012-03-04T10:29:29+05:30",
    "actor": "F. Murray Abraham",
    "id": 97
  },
  {
    "name": "L.A. Confidential",
    "outline": "As corruption grows in 1950s LA, three policemen - the straight-laced, the brutal, and the sleazy - investigate a series of murders with their own brand of justice.",
    "rating": 8.4,
    "director": "Curtis Hanson",
    "year": 1997,
    "stars": [
      "Kevin Spacey",
      "Russell Crowe",
      "Guy Pearce"
    ],
    "runtime": 138,
    "genre": [
      "Crime",
      "Drama",
      "Mystery",
      "Thriller"
    ],
    "certificate": "R",
    "date": "1982-07-10T10:29:29+05:30",
    "actor": "Kevin Spacey",
    "id": 98
  },
  {
    "name": "Like Stars on Earth",
    "outline": "An eight year old boy is thought to be lazy and a troublemaker, until the new art teacher has the patience and compassion to discover the real problem behind his struggles in school.",
    "rating": 8.4,
    "director": "Aamir Khan",
    "year": 2007,
    "stars": [
      "Darsheel Safary",
      "Aamir Khan",
      "Tanay Chheda"
    ],
    "runtime": 165,
    "genre": [
      "Drama"
    ],
    "certificate": "PG",
    "date": "2005-04-11T10:29:29+05:30",
    "actor": "Darsheel Safary",
    "id": 99
  },
  {
    "name": "The Sting",
    "outline": "In 1930s Chicago, a young con man seeking revenge for his murdered partner teams up with a master of the big con to win a fortune from a criminal banker.",
    "rating": 8.4,
    "director": "George Roy Hill",
    "year": 1973,
    "stars": [
      "Paul Newman",
      "Robert Redford",
      "Robert Shaw"
    ],
    "runtime": 129,
    "genre": [
      "Comedy",
      "Crime",
      "Drama"
    ],
    "certificate": "TV_14",
    "date": "1968-04-03T10:29:29+05:30",
    "actor": "Paul Newman",
    "id": 100
  },
  {
    "name": "Yojimbo",
    "outline": "A crafty ronin comes to a town divided by two criminal gangs and decides to play them against each other to free the town.",
    "rating": 8.4,
    "director": "Akira Kurosawa",
    "year": 1961,
    "stars": [
      "Toshirô Mifune",
      "Eijirô Tôno",
      "Tatsuya Nakadai"
    ],
    "runtime": 110,
    "genre": [
      "Action",
      "Adventure"
    ],
    "certificate": "TV_MA",
    "date": "1981-08-02T10:29:29+05:30",
    "actor": "Toshirô Mifune",
    "id": 101
  },
  {
    "name": "2001: A Space Odyssey",
    "outline": "Humanity finds a mysterious, obviously artificial, object buried beneath the Lunar surface and, with the intelligent computer H.A.L. 9000, sets off on a quest.",
    "rating": 8.4,
    "director": "Stanley Kubrick",
    "year": 1968,
    "stars": [
      "Keir Dullea",
      "Gary Lockwood",
      "William Sylvester"
    ],
    "runtime": 141,
    "genre": [
      "Adventure",
      "Mystery",
      "Sci-Fi"
    ],
    "certificate": "TV_PG",
    "date": "1970-07-02T10:29:29+05:30",
    "actor": "Keir Dullea",
    "id": 102
  },
  {
    "name": "The Bridge on the River Kwai",
    "outline": "After settling his differences with a Japanese PoW camp commander, a British colonel co-operates to oversee his men's construction of a railway bridge for their captors - while oblivious to a plan by the Allies to destroy it.",
    "rating": 8.3,
    "director": "David Lean",
    "year": 1957,
    "stars": [
      "William Holden",
      "Alec Guinness",
      "Jack Hawkins"
    ],
    "runtime": 161,
    "genre": [
      "Adventure",
      "Drama",
      "History",
      "War"
    ],
    "certificate": "APPROVED",
    "date": "2001-09-25T10:29:29+05:30",
    "actor": "William Holden",
    "id": 103
  },
  {
    "name": "Raging Bull",
    "outline": "An emotionally self-destructive boxer's journey through life, as the violence and temper that leads him to the top in the ring, destroys his life outside it.",
    "rating": 8.3,
    "director": "Martin Scorsese",
    "year": 1980,
    "stars": [
      "Robert De Niro",
      "Cathy Moriarty",
      "Joe Pesci"
    ],
    "runtime": 129,
    "genre": [
      "Biography",
      "Drama",
      "Sport"
    ],
    "certificate": "R",
    "date": "2000-04-30T10:29:29+05:30",
    "actor": "Robert De Niro",
    "id": 104
  },
  {
    "name": "Unforgiven",
    "outline": "Retired Old West gunslinger William Munny reluctantly takes on one last job, with the help of his old partner and a young man.",
    "rating": 8.3,
    "director": "Clint Eastwood",
    "year": 1992,
    "stars": [
      "Clint Eastwood",
      "Gene Hackman",
      "Morgan Freeman"
    ],
    "runtime": 131,
    "genre": [
      "Western"
    ],
    "certificate": "R",
    "date": "2005-11-24T10:29:29+05:30",
    "actor": "Clint Eastwood",
    "id": 105
  },
  {
    "name": "Mr. Smith Goes to Washington",
    "outline": "A naive man is appointed to fill a vacancy in the US Senate. His plans promptly collide with political corruption, but he doesn't back down.",
    "rating": 8.3,
    "director": "Frank Capra",
    "year": 1939,
    "stars": [
      "James Stewart",
      "Jean Arthur",
      "Claude Rains"
    ],
    "runtime": 129,
    "genre": [
      "Drama"
    ],
    "certificate": "APPROVED",
    "date": "1962-07-24T10:29:29+05:30",
    "actor": "James Stewart",
    "id": 106
  },
  {
    "name": "The General",
    "outline": "When Union spies steal an engineer's beloved locomotive, he pursues it single handedly and straight through enemy lines.",
    "rating": 8.3,
    "director": "Clyde Bruckman",
    "year": 1926,
    "stars": [
      "Buster Keaton",
      "Buster Keaton",
      "Marion Mack",
      "Glen Cavender"
    ],
    "runtime": 107,
    "genre": [
      "Action",
      "Adventure",
      "Comedy",
      "Romance",
      "War"
    ],
    "certificate": "UNRATED",
    "date": "1983-06-04T10:29:29+05:30",
    "actor": "Buster Keaton",
    "id": 107
  },
  {
    "name": "Indiana Jones and the Last Crusade",
    "outline": "When Dr. Henry Jones Sr. suddenly goes missing while pursuing the Holy Grail, eminent archaeologist Indiana Jones must follow in his father's footsteps and stop the Nazis.",
    "rating": 8.3,
    "director": "Steven Spielberg",
    "year": 1989,
    "stars": [
      "Harrison Ford",
      "Sean Connery",
      "Alison Doody"
    ],
    "runtime": 127,
    "genre": [
      "Action",
      "Adventure"
    ],
    "certificate": "United States-E",
    "date": "2014-03-19T10:29:29+05:30",
    "actor": "Harrison Ford",
    "id": 108
  },
  {
    "name": "Batman Begins",
    "outline": "After training with his mentor, Batman begins his war on crime to free the crime-ridden Gotham City from corruption that the Scarecrow and the League of Shadows have cast upon it.",
    "rating": 8.3,
    "director": "Christopher Nolan",
    "year": 2005,
    "stars": [
      "Christian Bale",
      "Michael Caine",
      "Ken Watanabe"
    ],
    "runtime": 140,
    "genre": [
      "Action",
      "Adventure",
      "Crime",
      "Drama"
    ],
    "certificate": "PG_13",
    "date": "2003-03-20T10:29:29+05:30",
    "actor": "Christian Bale",
    "id": 109
  },
  {
    "name": "For a Few Dollars More",
    "outline": "Two bounty hunters with the same intentions, team up to track down a Western outlaw.",
    "rating": 8.3,
    "director": "Sergio Leone",
    "year": 1965,
    "stars": [
      "Clint Eastwood",
      "Lee Van Cleef",
      "Gian Maria Volonté"
    ],
    "runtime": 132,
    "genre": [
      "Western"
    ],
    "certificate": "APPROVED",
    "date": "2006-07-25T10:29:29+05:30",
    "actor": "Clint Eastwood",
    "id": 110
  },
  {
    "name": "The Great Escape",
    "outline": "Allied POWs plan for several hundred of their number to escape from a German camp during World War II.",
    "rating": 8.3,
    "director": "John Sturges",
    "year": 1963,
    "stars": [
      "Steve McQueen",
      "James Garner",
      "Richard Attenborough"
    ],
    "runtime": 172,
    "genre": [
      "Adventure",
      "Drama",
      "History",
      "Thriller",
      "War"
    ],
    "certificate": "UNRATED",
    "date": "1999-04-14T10:29:29+05:30",
    "actor": "Steve McQueen",
    "id": 111
  },
  {
    "name": "On the Waterfront",
    "outline": "An ex-prize fighter turned longshoreman struggles to stand up to his corrupt union bosses.",
    "rating": 8.3,
    "director": "Elia Kazan",
    "year": 1954,
    "stars": [
      "Marlon Brando",
      "Karl Malden",
      "Lee J. Cobb"
    ],
    "runtime": 108,
    "genre": [
      "Crime",
      "Drama"
    ],
    "certificate": "APPROVED",
    "date": "1997-02-11T10:29:29+05:30",
    "actor": "Marlon Brando",
    "id": 112
  },
  {
    "name": "The Kid",
    "outline": "The Tramp cares for an abandoned child, but events put that relationship in jeopardy.",
    "rating": 8.3,
    "director": "Charles Chaplin",
    "year": 1921,
    "stars": [
      "Charles Chaplin",
      "Edna Purviance",
      "Jackie Coogan"
    ],
    "runtime": 68,
    "genre": [
      "Comedy",
      "Drama",
      "Family"
    ],
    "certificate": "NOT_RATED",
    "date": "1964-12-04T10:29:29+05:30",
    "actor": "Charles Chaplin",
    "id": 113
  },
  {
    "name": "Die Hard",
    "outline": "John McClane, officer of the NYPD, tries to save wife Holly Gennaro and several others, taken hostage by German terrorist Hans Gruber during a Christmas party at the Nakatomi Plaza in Los Angeles.",
    "rating": 8.3,
    "director": "John McTiernan",
    "year": 1988,
    "stars": [
      "Bruce Willis",
      "Alan Rickman",
      "Bonnie Bedelia"
    ],
    "runtime": 131,
    "genre": [
      "Action",
      "Thriller"
    ],
    "certificate": "R",
    "date": "1995-05-19T10:29:29+05:30",
    "actor": "Bruce Willis",
    "id": 114
  },
  {
    "name": "Downfall",
    "outline": "Traudl Junge, the final secretary for Adolf Hitler, tells of the Nazi dictator's final days in his Berlin bunker at the end of WWII.",
    "rating": 8.3,
    "director": "Oliver Hirschbiegel",
    "year": 2004,
    "stars": [
      "Bruno Ganz",
      "Alexandra Maria Lara",
      "Ulrich Matthes"
    ],
    "runtime": 156,
    "genre": [
      "Biography",
      "Drama",
      "History",
      "War"
    ],
    "certificate": "R",
    "date": "2005-07-08T10:29:29+05:30",
    "actor": "Bruno Ganz",
    "id": 115
  },
  {
    "name": "Snatch.",
    "outline": "Unscrupulous boxing promoters, violent bookmakers, a Russian gangster, incompetent amateur robbers, and supposedly Jewish jewelers fight to track down a priceless stolen diamond.",
    "rating": 8.3,
    "director": "Guy Ritchie",
    "year": 2000,
    "stars": [
      "Jason Statham",
      "Brad Pitt",
      "Benicio Del Toro"
    ],
    "runtime": 104,
    "genre": [
      "Crime",
      "Thriller"
    ],
    "certificate": "R",
    "date": "1989-12-16T10:29:29+05:30",
    "actor": "Jason Statham",
    "id": 116
  },
  {
    "name": "The Seventh Seal",
    "outline": "A man seeks answers about life, death, and the existence of God as he plays chess against the Grim Reaper during the Black Plague.",
    "rating": 8.3,
    "director": "Ingmar Bergman",
    "year": 1957,
    "stars": [
      "Max von Sydow",
      "Gunnar Björnstrand",
      "Bengt Ekerot"
    ],
    "runtime": 96,
    "genre": [
      "Drama",
      "Fantasy"
    ],
    "certificate": "TV_PG",
    "date": "1971-09-29T10:29:29+05:30",
    "actor": "Max von Sydow",
    "id": 117
  },
  {
    "name": "Pan's Labyrinth",
    "outline": "In the fascist Spain of 1944, the bookish young stepdaughter of a sadistic army officer escapes into an eerie but captivating fantasy world.",
    "rating": 8.3,
    "director": "Guillermo del Toro",
    "year": 2006,
    "stars": [
      "Ivana Baquero",
      "Ariadna Gil",
      "Sergi López"
    ],
    "runtime": 118,
    "genre": [
      "Drama",
      "Fantasy",
      "War"
    ],
    "certificate": "R",
    "date": "1971-04-20T10:29:29+05:30",
    "actor": "Ivana Baquero",
    "id": 118
  },
  {
    "name": "Wild Strawberries",
    "outline": "After living a life marked by coldness, an aging professor is forced to confront the emptiness of his existence.",
    "rating": 8.3,
    "director": "Ingmar Bergman",
    "year": 1957,
    "stars": [
      "Victor Sjöström",
      "Bibi Andersson",
      "Ingrid Thulin"
    ],
    "runtime": 91,
    "genre": [
      "Drama"
    ],
    "certificate": "UNRATED",
    "date": "1959-12-14T10:29:29+05:30",
    "actor": "Victor Sjöström",
    "id": 119
  },
  {
    "name": "Inglourious Basterds",
    "outline": "In Nazi-occupied France during World War II, a plan to assassinate Nazi leaders by a group of Jewish U.S. soldiers coincides with a theatre owner's vengeful plans for the same.",
    "rating": 8.3,
    "director": "Quentin Tarantino",
    "year": 2009,
    "stars": [
      "Brad Pitt",
      "Diane Kruger",
      "Eli Roth"
    ],
    "runtime": 153,
    "genre": [
      "Adventure",
      "Drama",
      "War"
    ],
    "certificate": "R",
    "date": "1960-08-07T10:29:29+05:30",
    "actor": "Brad Pitt",
    "id": 120
  },
  {
    "name": "Up",
    "outline": "By tying thousands of balloons to his home, 78-year-old Carl sets out to fulfill his lifelong dream to see the wilds of South America. Russell, a wilderness explorer 70 years younger, inadvertently becomes a stowaway.",
    "rating": 8.3,
    "director": "Pete Docter",
    "year": 2009,
    "stars": [
      "Bob Peterson",
      "Edward Asner",
      "Jordan Nagai",
      "John Ratzenberger"
    ],
    "runtime": 96,
    "genre": [
      "Animation",
      "Adventure",
      "Comedy",
      "Drama",
      "Family",
      "Fantasy"
    ],
    "certificate": "PG",
    "date": "1977-01-18T10:29:29+05:30",
    "actor": "Bob Peterson",
    "id": 121
  },
  {
    "name": "The Elephant Man",
    "outline": "A Victorian surgeon rescues a heavily disfigured man who is mistreated while scraping a living as a side-show freak. Behind his monstrous facade, there is revealed a person of intelligence and sensitivity.",
    "rating": 8.3,
    "director": "David Lynch",
    "year": 1980,
    "stars": [
      "Anthony Hopkins",
      "John Hurt",
      "Anne Bancroft"
    ],
    "runtime": 124,
    "genre": [
      "Biography",
      "Drama"
    ],
    "certificate": "PG",
    "date": "1964-11-29T10:29:29+05:30",
    "actor": "Anthony Hopkins",
    "id": 122
  },
  {
    "name": "The Maltese Falcon",
    "outline": "A private detective takes on a case that involves him with three eccentric criminals, a gorgeous liar, and their quest for a priceless statuette.",
    "rating": 8.3,
    "director": "John Huston",
    "year": 1941,
    "stars": [
      "Humphrey Bogart",
      "Mary Astor",
      "Gladys George"
    ],
    "runtime": 100,
    "genre": [
      "Crime",
      "Drama",
      "Film-Noir",
      "Mystery"
    ],
    "certificate": "APPROVED",
    "date": "1985-12-06T10:29:29+05:30",
    "actor": "Humphrey Bogart",
    "id": 123
  },
  {
    "name": "Rebecca",
    "outline": "When a naive young woman marries a rich widower and settles in his gigantic mansion, she finds the memory of the first wife maintaining a grip on her husband and the servants.",
    "rating": 8.3,
    "director": "Alfred Hitchcock",
    "year": 1940,
    "stars": [
      "Laurence Olivier",
      "Joan Fontaine",
      "George Sanders"
    ],
    "runtime": 130,
    "genre": [
      "Drama",
      "Mystery",
      "Thriller"
    ],
    "certificate": "APPROVED",
    "date": "2007-01-08T10:29:29+05:30",
    "actor": "Laurence Olivier",
    "id": 124
  },
  {
    "name": "The Avengers",
    "outline": "Nick Fury of S.H.I.E.L.D. brings together a team of super humans to form The Avengers to help save the Earth from Loki and his army.",
    "rating": 8.3,
    "director": "Joss Whedon",
    "year": 2012,
    "stars": [
      "Robert Downey Jr.",
      "Chris Evans",
      "Scarlett Johansson"
    ],
    "runtime": 143,
    "genre": [
      "Action"
    ],
    "certificate": "PG_13",
    "date": "1994-03-18T10:29:29+05:30",
    "actor": "Robert Downey Jr.",
    "id": 125
  },
  {
    "name": "3 Idiots",
    "outline": "Two friends are searching for their long lost companion. They revisit their college days and recall the memories of their friend who inspired them to think differently, even as the rest of the world called them \"idiots\".",
    "rating": 8.3,
    "director": "Rajkumar Hirani",
    "year": 2009,
    "stars": [
      "Aamir Khan",
      "Madhavan",
      "Mona Singh"
    ],
    "runtime": 170,
    "genre": [
      "Comedy",
      "Drama",
      "Romance"
    ],
    "certificate": "PG_13",
    "date": "2009-04-24T10:29:29+05:30",
    "actor": "Aamir Khan",
    "id": 126
  },
  {
    "name": "Heat",
    "outline": "A group of professional bank robbers start to feel the heat from police when they unknowingly leave a clue at their latest heist.",
    "rating": 8.3,
    "director": "Michael Mann",
    "year": 1995,
    "stars": [
      "Al Pacino",
      "Robert De Niro",
      "Val Kilmer"
    ],
    "runtime": 170,
    "genre": [
      "Action",
      "Crime",
      "Drama",
      "Thriller"
    ],
    "certificate": "R",
    "date": "1999-12-12T10:29:29+05:30",
    "actor": "Al Pacino",
    "id": 127
  },
  {
    "name": "Toy Story",
    "outline": "A cowboy doll is profoundly threatened and jealous when a new spaceman figure supplants him as top toy in a boy's room.",
    "rating": 8.3,
    "director": "John Lasseter",
    "year": 1995,
    "stars": [
      "Tom Hanks",
      "Tim Allen",
      "Don Rickles"
    ],
    "runtime": 81,
    "genre": [
      "Animation",
      "Adventure",
      "Comedy",
      "Family",
      "Fantasy"
    ],
    "certificate": "G",
    "date": "2008-09-07T10:29:29+05:30",
    "actor": "Tom Hanks",
    "id": 128
  },
  {
    "name": "Blade Runner",
    "outline": "Deckard, a blade runner, has to track down and terminate 4 replicants who hijacked a ship in space and have returned to Earth seeking their maker.",
    "rating": 8.3,
    "director": "Ridley Scott",
    "year": 1982,
    "stars": [
      "Harrison Ford",
      "Rutger Hauer",
      "Sean Young"
    ],
    "runtime": 117,
    "genre": [
      "Drama",
      "Sci-Fi",
      "Thriller"
    ],
    "certificate": "R",
    "date": "1981-02-09T10:29:29+05:30",
    "actor": "Harrison Ford",
    "id": 129
  },
  {
    "name": "Ran",
    "outline": "An elderly lord abdicates to his three sons, and the two corrupt ones turn against him.",
    "rating": 8.3,
    "director": "Akira Kurosawa",
    "year": 1985,
    "stars": [
      "Tatsuya Nakadai",
      "Akira Terao",
      "Jinpachi Nezu"
    ],
    "runtime": 162,
    "genre": [
      "Action",
      "Drama",
      "War"
    ],
    "certificate": "R",
    "date": "1985-07-11T10:29:29+05:30",
    "actor": "Tatsuya Nakadai",
    "id": 130
  },
  {
    "name": "Scarface",
    "outline": "In 1980 Miami, a determined Cuban immigrant takes over a drug cartel while succumbing to greed.",
    "rating": 8.3,
    "director": "Brian De Palma",
    "year": 1983,
    "stars": [
      "Al Pacino",
      "Michelle Pfeiffer",
      "Steven Bauer"
    ],
    "runtime": 170,
    "genre": [
      "Crime",
      "Drama",
      "Thriller"
    ],
    "certificate": "R",
    "date": "1986-01-27T10:29:29+05:30",
    "actor": "Al Pacino",
    "id": 131
  },
  {
    "name": "Touch of Evil",
    "outline": "Stark, perverse story of murder, kidnapping, and police corruption in Mexican border town.",
    "rating": 8.3,
    "director": "Orson Welles",
    "year": 1958,
    "stars": [
      "Charlton Heston",
      "Orson Welles",
      "Janet Leigh"
    ],
    "runtime": 95,
    "genre": [
      "Crime",
      "Film-Noir",
      "Thriller"
    ],
    "certificate": "UNRATED",
    "date": "2004-07-12T10:29:29+05:30",
    "actor": "Charlton Heston",
    "id": 132
  },
  {
    "name": "The Gold Rush",
    "outline": "The Tramp goes the Klondike in search of gold and finds it and more.",
    "rating": 8.2,
    "director": "Charles Chaplin",
    "year": 1925,
    "stars": [
      "Charles Chaplin",
      "Mack Swain",
      "Tom Murray"
    ],
    "runtime": 95,
    "genre": [
      "Adventure",
      "Comedy",
      "Family",
      "Romance",
      "Western"
    ],
    "certificate": "NOT_RATED",
    "date": "2010-05-05T10:29:29+05:30",
    "actor": "Charles Chaplin",
    "id": 133
  },
  {
    "name": "Gran Torino",
    "outline": "Disgruntled Korean War vet Walt Kowalski sets out to reform his neighbor, a young Hmong teenager, who tried to steal Kowalski's prized possession: his 1972 Gran Torino.",
    "rating": 8.2,
    "director": "Clint Eastwood",
    "year": 2008,
    "stars": [
      "Clint Eastwood",
      "Bee Vang",
      "Christopher Carley"
    ],
    "runtime": 116,
    "genre": [
      "Drama"
    ],
    "certificate": "R",
    "date": "1986-03-28T10:29:29+05:30",
    "actor": "Clint Eastwood",
    "id": 134
  },
  {
    "name": "The Big Lebowski",
    "outline": "\"Dude\" Lebowski, mistaken for a millionaire Lebowski, seeks restitution for his ruined rug and enlists his bowling buddies to help get it.",
    "rating": 8.2,
    "director": "Joel Coen",
    "year": 1998,
    "stars": [
      "Jeff Bridges",
      "John Goodman",
      "Julianne Moore"
    ],
    "runtime": 117,
    "genre": [
      "Comedy",
      "Crime"
    ],
    "certificate": "R",
    "date": "1987-01-01T10:29:29+05:30",
    "actor": "Jeff Bridges",
    "id": 135
  },
  {
    "name": "It Happened One Night",
    "outline": "A spoiled heiress, running away from her family, is helped by a man who's actually a reporter looking for a story.",
    "rating": 8.2,
    "director": "Frank Capra",
    "year": 1934,
    "stars": [
      "Clark Gable",
      "Claudette Colbert",
      "Walter Connolly"
    ],
    "runtime": 105,
    "genre": [
      "Comedy",
      "Romance"
    ],
    "certificate": "UNRATED",
    "date": "1968-02-03T10:29:29+05:30",
    "actor": "Clark Gable",
    "id": 136
  },
  {
    "name": "Cool Hand Luke",
    "outline": "A man refuses to conform to life in a rural prison.",
    "rating": 8.2,
    "director": "Stuart Rosenberg",
    "year": 1967,
    "stars": [
      "Paul Newman",
      "George Kennedy",
      "Strother Martin"
    ],
    "runtime": 126,
    "genre": [
      "Crime",
      "Drama"
    ],
    "certificate": "APPROVED",
    "date": "2001-04-06T10:29:29+05:30",
    "actor": "Paul Newman",
    "id": 137
  },
  {
    "name": "Fargo",
    "outline": "Jerry Lundegaard's inept crime falls apart due to his and his henchmen's bungling and the persistent police work of the quite pregnant Marge Gunderson.",
    "rating": 8.2,
    "director": "Joel Coen",
    "year": 1996,
    "stars": [
      "William H. Macy",
      "Frances McDormand",
      "Steve Buscemi"
    ],
    "runtime": 98,
    "genre": [
      "Crime",
      "Drama"
    ],
    "certificate": "R",
    "date": "1986-05-30T10:29:29+05:30",
    "actor": "William H. Macy",
    "id": 138
  },
  {
    "name": "Warrior",
    "outline": "The youngest son of an alcoholic former boxer returns home, where he's trained by his father for competition in a mixed martial arts tournament - a path that puts the fighter on a collision corner with his older brother.",
    "rating": 8.2,
    "director": "Gavin O'Connor",
    "year": 2011,
    "stars": [
      "Tom Hardy",
      "Nick Nolte",
      "Joel Edgerton"
    ],
    "runtime": 140,
    "genre": [
      "Drama",
      "Sport"
    ],
    "certificate": "PG_13",
    "date": "1988-01-17T10:29:29+05:30",
    "actor": "Tom Hardy",
    "id": 139
  },
  {
    "name": "The Deer Hunter",
    "outline": "An in-depth examination of the way that the Vietnam war affects the lives of people in a small industrial town in the USA.",
    "rating": 8.2,
    "director": "Michael Cimino",
    "year": 1978,
    "stars": [
      "Robert De Niro",
      "Christopher Walken",
      "John Cazale"
    ],
    "runtime": 182,
    "genre": [
      "Drama",
      "War"
    ],
    "certificate": "R",
    "date": "1967-06-11T10:29:29+05:30",
    "actor": "Robert De Niro",
    "id": 140
  },
  {
    "name": "The Secret in Their Eyes",
    "outline": "A retired legal counselor writes a novel hoping to find closure for one of his past unresolved homicide cases and for his unreciprocated love with his superior - both of which still haunt him decades later.",
    "rating": 8.2,
    "director": "Juan José Campanella",
    "year": 2009,
    "stars": [
      "Ricardo Darín",
      "Soledad Villamil",
      "Pablo Rago"
    ],
    "runtime": 129,
    "genre": [
      "Drama",
      "Mystery",
      "Thriller"
    ],
    "certificate": "R",
    "date": "2013-04-11T10:29:29+05:30",
    "actor": "Ricardo Darín",
    "id": 141
  },
  {
    "name": "Strangers on a Train",
    "outline": "A psychotic socialite confronts a pro tennis star with a theory on how two complete strangers can get away with murder...a theory that he plans to implement.",
    "rating": 8.2,
    "director": "Alfred Hitchcock",
    "year": 1951,
    "stars": [
      "Farley Granger",
      "Robert Walker",
      "Ruth Roman"
    ],
    "runtime": 101,
    "genre": [
      "Crime",
      "Thriller"
    ],
    "certificate": "APPROVED",
    "date": "1995-09-01T10:29:29+05:30",
    "actor": "Farley Granger",
    "id": 142
  },
  {
    "name": "The Best Years of Our Lives",
    "outline": "Three WWII veterans return home to small-town America to discover that they and their families have been irreparably changed.",
    "rating": 8.2,
    "director": "William Wyler",
    "year": 1946,
    "stars": [
      "Fredric March",
      "Dana Andrews",
      "Myrna Loy"
    ],
    "runtime": 172,
    "genre": [
      "Drama",
      "Romance",
      "War"
    ],
    "certificate": "APPROVED",
    "date": "2008-06-05T10:29:29+05:30",
    "actor": "Fredric March",
    "id": 143
  },
  {
    "name": "Lock, Stock and Two Smoking Barrels",
    "outline": "Four London working class stiffs pool their money to put one in a high stakes card game, but things go wrong and they end up owing half a million pounds and having one week to come up with the cash.",
    "rating": 8.2,
    "director": "Guy Ritchie",
    "year": 1998,
    "stars": [
      "Jason Flemyng",
      "Dexter Fletcher",
      "Nick Moran"
    ],
    "runtime": 107,
    "genre": [
      "Crime",
      "Thriller"
    ],
    "certificate": "R",
    "date": "2007-01-07T10:29:29+05:30",
    "actor": "Jason Flemyng",
    "id": 144
  },
  {
    "name": "High Noon",
    "outline": "A marshall, personally compelled to face a returning deadly enemy, finds that his own town refuses to help him.",
    "rating": 8.2,
    "director": "Fred Zinnemann",
    "year": 1952,
    "stars": [
      "Gary Cooper",
      "Grace Kelly",
      "Thomas Mitchell"
    ],
    "runtime": 85,
    "genre": [
      "Drama",
      "Western"
    ],
    "certificate": "APPROVED",
    "date": "1963-12-31T10:29:29+05:30",
    "actor": "Gary Cooper",
    "id": 145
  },
  {
    "name": "My Neighbor Totoro",
    "outline": "When two girls move to the country to be near their ailing mother, they have adventures with the wonderous forest spirits who live nearby.",
    "rating": 8.2,
    "director": "Hayao Miyazaki",
    "year": 1988,
    "stars": [
      "Hitoshi Takagi",
      "Noriko Hidaka",
      "Toshiyuki Amagasa"
    ],
    "runtime": 86,
    "genre": [
      "Animation",
      "Family",
      "Fantasy"
    ],
    "certificate": "G",
    "date": "1959-12-20T10:29:29+05:30",
    "actor": "Hitoshi Takagi",
    "id": 146
  },
  {
    "name": "Sin City",
    "outline": "A film that explores the dark and miserable town, Basin City, and tells the story of three different people, all caught up in violent corruption.",
    "rating": 8.2,
    "director": "Frank Miller",
    "year": 2005,
    "stars": [
      "Robert Rodriguez",
      "Mickey Rourke",
      "Clive Owen",
      "Bruce Willis"
    ],
    "runtime": 124,
    "genre": [
      "Crime",
      "Thriller"
    ],
    "certificate": "UNRATED",
    "date": "1964-01-23T10:29:29+05:30",
    "actor": "Robert Rodriguez",
    "id": 147
  },
  {
    "name": "The Grapes of Wrath",
    "outline": "A poor Midwest family is forced off of their land. They travel to California, suffering the misfortunes of the homeless in the Great Depression.",
    "rating": 8.2,
    "director": "John Ford",
    "year": 1940,
    "stars": [
      "Henry Fonda",
      "Jane Darwell",
      "John Carradine"
    ],
    "runtime": 129,
    "genre": [
      "Drama"
    ],
    "certificate": "APPROVED",
    "date": "1980-05-29T10:29:29+05:30",
    "actor": "Henry Fonda",
    "id": 148
  },
  {
    "name": "Gone with the Wind",
    "outline": "American classic in which a manipulative woman and a roguish man carry on a turbulent love affair in the American south during the Civil War and Reconstruction.",
    "rating": 8.2,
    "director": "Victor Fleming",
    "year": 1939,
    "stars": [
      "Clark Gable",
      "Vivien Leigh",
      "Thomas Mitchell"
    ],
    "runtime": 238,
    "genre": [
      "Drama",
      "Romance",
      "War"
    ],
    "certificate": "APPROVED",
    "date": "1986-11-12T10:29:29+05:30",
    "actor": "Clark Gable",
    "id": 149
  },
  {
    "name": "Butch Cassidy and the Sundance Kid",
    "outline": "Two Western bank/train robbers flee to Bolivia when the law gets too close.",
    "rating": 8.2,
    "director": "George Roy Hill",
    "year": 1969,
    "stars": [
      "Paul Newman",
      "Robert Redford",
      "Katharine Ross"
    ],
    "runtime": 110,
    "genre": [
      "Adventure",
      "Biography",
      "Crime",
      "Western"
    ],
    "certificate": "United States-M",
    "date": "2008-02-25T10:29:29+05:30",
    "actor": "Paul Newman",
    "id": 150
  },
  {
    "name": "The Thing",
    "outline": "Scientists in the Antarctic are confronted by a shape-shifting alien that assumes the appearance of the people that it kills.",
    "rating": 8.2,
    "director": "John Carpenter",
    "year": 1982,
    "stars": [
      "Kurt Russell",
      "Wilford Brimley",
      "Keith David"
    ],
    "runtime": 109,
    "genre": [
      "Horror",
      "Mystery",
      "Sci-Fi",
      "Thriller"
    ],
    "certificate": "R",
    "date": "2004-07-06T10:29:29+05:30",
    "actor": "Kurt Russell",
    "id": 151
  },
  {
    "name": "Hotel Rwanda",
    "outline": "The true-life story of Paul Rusesabagina, a hotel manager who housed over a thousand Tutsi refugees during their struggle against the Hutu militia in Rwanda.",
    "rating": 8.2,
    "director": "Terry George",
    "year": 2004,
    "stars": [
      "Don Cheadle",
      "Sophie Okonedo",
      "Joaquin Phoenix"
    ],
    "runtime": 121,
    "genre": [
      "Biography",
      "Drama",
      "History",
      "War"
    ],
    "certificate": "R",
    "date": "1996-05-04T10:29:29+05:30",
    "actor": "Don Cheadle",
    "id": 152
  },
  {
    "name": "No Country for Old Men",
    "outline": "Violence and mayhem ensue after a hunter stumbles upon a drug deal gone wrong and more than two million dollars in cash near the Rio Grande.",
    "rating": 8.2,
    "director": "Ethan Coen",
    "year": 2007,
    "stars": [
      "Joel Coen",
      "Tommy Lee Jones",
      "Javier Bardem",
      "Josh Brolin"
    ],
    "runtime": 122,
    "genre": [
      "Crime",
      "Drama",
      "Thriller"
    ],
    "certificate": "R",
    "date": "1992-04-24T10:29:29+05:30",
    "actor": "Joel Coen",
    "id": 153
  },
  {
    "name": "Casino",
    "outline": "Greed, deception, money, power, and murder occur between two mobster best friends and a trophy wife over a gambling empire.",
    "rating": 8.2,
    "director": "Martin Scorsese",
    "year": 1995,
    "stars": [
      "Robert De Niro",
      "Sharon Stone",
      "Joe Pesci"
    ],
    "runtime": 178,
    "genre": [
      "Biography",
      "Crime",
      "Drama"
    ],
    "certificate": "R",
    "date": "1976-04-01T10:29:29+05:30",
    "actor": "Robert De Niro",
    "id": 154
  },
  {
    "name": "Notorious",
    "outline": "A woman is asked to spy on a group of Nazi friends in South America. How far will she have to go to ingratiate herself with them?",
    "rating": 8.2,
    "director": "Alfred Hitchcock",
    "year": 1946,
    "stars": [
      "Cary Grant",
      "Ingrid Bergman",
      "Claude Rains"
    ],
    "runtime": 101,
    "genre": [
      "Drama",
      "Romance",
      "Thriller"
    ],
    "certificate": "UNRATED",
    "date": "2002-06-13T10:29:29+05:30",
    "actor": "Cary Grant",
    "id": 155
  },
  {
    "name": "Trainspotting",
    "outline": "Renton, deeply immersed in the Edinburgh drug scene, tries to clean up and get out, despite the allure of the drugs and influence of friends.",
    "rating": 8.2,
    "director": "Danny Boyle",
    "year": 1996,
    "stars": [
      "Ewan McGregor",
      "Ewen Bremner",
      "Jonny Lee Miller"
    ],
    "runtime": 94,
    "genre": [
      "Crime",
      "Drama"
    ],
    "certificate": "R",
    "date": "1997-12-06T10:29:29+05:30",
    "actor": "Ewan McGregor",
    "id": 156
  },
  {
    "name": "V for Vendetta",
    "outline": "A shadowy freedom fighter known only as \"V\" uses terrorist tactics to fight against his totalitarian society. Upon rescuing a girl from the secret police, he also finds his best chance at having an ally.",
    "rating": 8.2,
    "director": "James McTeigue",
    "year": 2005,
    "stars": [
      "Hugo Weaving",
      "Natalie Portman",
      "Rupert Graves"
    ],
    "runtime": 132,
    "genre": [
      "Action",
      "Fantasy",
      "Thriller"
    ],
    "certificate": "R",
    "date": "1966-08-13T10:29:29+05:30",
    "actor": "Hugo Weaving",
    "id": 157
  },
  {
    "name": "The Wizard of Oz",
    "outline": "Dorothy Gale is swept away to a magical land in a tornado and embarks on a quest to see the Wizard who can help her return home.",
    "rating": 8.2,
    "director": "Victor Fleming",
    "year": 1939,
    "stars": [
      "Judy Garland",
      "Frank Morgan",
      "Ray Bolger"
    ],
    "runtime": 101,
    "genre": [
      "Adventure",
      "Family",
      "Fantasy",
      "Musical"
    ],
    "certificate": "APPROVED",
    "date": "1977-09-11T10:29:29+05:30",
    "actor": "Judy Garland",
    "id": 158
  },
  {
    "name": "Good Will Hunting",
    "outline": "Will Hunting, a janitor at MIT, has a gift for mathematics but needs help from a psychologist to find direction in his life.",
    "rating": 8.2,
    "director": "Gus Van Sant",
    "year": 1997,
    "stars": [
      "Robin Williams",
      "Matt Damon",
      "Ben Affleck"
    ],
    "runtime": 126,
    "genre": [
      "Drama"
    ],
    "certificate": "R",
    "date": "1999-07-28T10:29:29+05:30",
    "actor": "Robin Williams",
    "id": 159
  },
  {
    "name": "Platoon",
    "outline": "A young recruit in Vietnam faces a moral crisis when confronted with the horrors of war and the duality of man.",
    "rating": 8.2,
    "director": "Oliver Stone",
    "year": 1986,
    "stars": [
      "Charlie Sheen",
      "Tom Berenger",
      "Willem Dafoe"
    ],
    "runtime": 120,
    "genre": [
      "Action",
      "Drama",
      "War"
    ],
    "certificate": "R",
    "date": "1977-05-20T10:29:29+05:30",
    "actor": "Charlie Sheen",
    "id": 160
  },
  {
    "name": "The Hobbit: An Unexpected Journey",
    "outline": "A younger and more reluctant Hobbit, Bilbo Baggins, sets out on an \"unexpected journey\" to the Lonely Mountain with a spirited group of Dwarves to reclaim their stolen mountain home from a dragon named Smaug.",
    "rating": 8.2,
    "director": "Peter Jackson",
    "year": 2012,
    "stars": [
      "Martin Freeman",
      "Ian McKellen",
      "Richard Armitage"
    ],
    "runtime": 169,
    "genre": [
      "Adventure",
      "Fantasy"
    ],
    "certificate": "PG_13",
    "date": "1991-12-01T10:29:29+05:30",
    "actor": "Martin Freeman",
    "id": 161
  },
  {
    "name": "Jaws",
    "outline": "When a gigantic great white shark begins to menace the small island community of Amity, a police chief, a marine scientist and grizzled fisherman set out to stop it.",
    "rating": 8.2,
    "director": "Steven Spielberg",
    "year": 1975,
    "stars": [
      "Roy Scheider",
      "Robert Shaw",
      "Richard Dreyfuss"
    ],
    "runtime": 124,
    "genre": [
      "Adventure",
      "Horror",
      "Thriller"
    ],
    "certificate": "TV_14",
    "date": "2004-08-25T10:29:29+05:30",
    "actor": "Roy Scheider",
    "id": 162
  },
  {
    "name": "Annie Hall",
    "outline": "Neurotic New York comedian Alvy Singer falls in love with the ditsy Annie Hall.",
    "rating": 8.2,
    "director": "Woody Allen",
    "year": 1977,
    "stars": [
      "Woody Allen",
      "Diane Keaton",
      "Tony Roberts"
    ],
    "runtime": 93,
    "genre": [
      "Comedy",
      "Drama",
      "Romance"
    ],
    "certificate": "PG",
    "date": "2002-11-01T10:29:29+05:30",
    "actor": "Woody Allen",
    "id": 163
  },
  {
    "name": "Into the Wild",
    "outline": "After graduating from Emory University, top student and athlete Christopher McCandless abandons his possessions, gives his entire $24,000 savings account to charity and hitchhikes to Alaska to live in the wilderness. Along the way, Christopher encounters a series of characters that shape his life.",
    "rating": 8.2,
    "director": "Sean Penn",
    "year": 2007,
    "stars": [
      "Emile Hirsch",
      "Vince Vaughn",
      "Catherine Keener"
    ],
    "runtime": 148,
    "genre": [
      "Adventure",
      "Biography",
      "Drama"
    ],
    "certificate": "R",
    "date": "1984-08-02T10:29:29+05:30",
    "actor": "Emile Hirsch",
    "id": 164
  },
  {
    "name": "The Sixth Sense",
    "outline": "A boy who communicates with spirits that don't know they're dead seeks the help of a disheartened child psychologist.",
    "rating": 8.2,
    "director": "M. Night Shyamalan",
    "year": 1999,
    "stars": [
      "Bruce Willis",
      "Haley Joel Osment",
      "Toni Collette"
    ],
    "runtime": 107,
    "genre": [
      "Drama",
      "Mystery",
      "Thriller"
    ],
    "certificate": "PG_13",
    "date": "1994-12-14T10:29:29+05:30",
    "actor": "Bruce Willis",
    "id": 165
  },
  {
    "name": "The Night of the Hunter",
    "outline": "A religious fanatic marries a gullible widow whose young children are reluctant to tell him where their real daddy hid $10,000 he'd stolen in a robbery.",
    "rating": 8.2,
    "director": "Charles Laughton",
    "year": 1955,
    "stars": [
      "Robert Mitchum",
      "Shelley Winters",
      "Lillian Gish"
    ],
    "runtime": 93,
    "genre": [
      "Drama",
      "Film-Noir",
      "Thriller"
    ],
    "certificate": "UNRATED",
    "date": "1968-12-29T10:29:29+05:30",
    "actor": "Robert Mitchum",
    "id": 166
  },
  {
    "name": "How to Train Your Dragon",
    "outline": "A hapless young Viking who aspires to hunt dragons becomes the unlikely friend of a young dragon himself, and learns there may be more to the creatures than he assumed.",
    "rating": 8.2,
    "director": "Dean DeBlois",
    "year": 2010,
    "stars": [
      "Chris Sanders",
      "Jay Baruchel",
      "Gerard Butler",
      "Christopher Mintz-Plasse"
    ],
    "runtime": 98,
    "genre": [
      "Animation",
      "Adventure",
      "Comedy",
      "Drama",
      "Family",
      "Fantasy"
    ],
    "certificate": "PG",
    "date": "1972-09-24T10:29:29+05:30",
    "actor": "Chris Sanders",
    "id": 167
  },
  {
    "name": "The Big Sleep",
    "outline": "Private detective Philip Marlowe is hired by a rich family. Before the complex case is over, he's seen murder, blackmail, and what might be love.",
    "rating": 8.2,
    "director": "Howard Hawks",
    "year": 1946,
    "stars": [
      "Humphrey Bogart",
      "Lauren Bacall",
      "John Ridgely"
    ],
    "runtime": 114,
    "genre": [
      "Crime",
      "Film-Noir",
      "Mystery",
      "Thriller"
    ],
    "certificate": "TV_PG",
    "date": "1982-01-11T10:29:29+05:30",
    "actor": "Humphrey Bogart",
    "id": 168
  },
  {
    "name": "Kill Bill: Vol. 1",
    "outline": "The Bride wakes up after a long coma. The baby that she carried before entering the coma is gone. The only thing on her mind is to have revenge on the assassination team that betrayed her - a team she was once part of.",
    "rating": 8.2,
    "director": "Quentin Tarantino",
    "year": 2003,
    "stars": [
      "Uma Thurman",
      "David Carradine",
      "Daryl Hannah"
    ],
    "runtime": 111,
    "genre": [
      "Action",
      "Crime",
      "Thriller"
    ],
    "certificate": "TV_14",
    "date": "1961-04-16T10:29:29+05:30",
    "actor": "Uma Thurman",
    "id": 169
  },
  {
    "name": "Dial M for Murder",
    "outline": "An ex-tennis pro carries out a plot to murder his wife. When things go wrong, he improvises a brilliant plan B.",
    "rating": 8.2,
    "director": "Alfred Hitchcock",
    "year": 1954,
    "stars": [
      "Ray Milland",
      "Grace Kelly",
      "Robert Cummings"
    ],
    "runtime": 105,
    "genre": [
      "Crime",
      "Mystery",
      "Thriller"
    ],
    "certificate": "APPROVED",
    "date": "1961-12-22T10:29:29+05:30",
    "actor": "Ray Milland",
    "id": 170
  },
  {
    "name": "Persona",
    "outline": "A nurse is put in charge of an actress who can't talk and finds that the actress's persona is melding with hers.",
    "rating": 8.2,
    "director": "Ingmar Bergman",
    "year": 1966,
    "stars": [
      "Bibi Andersson",
      "Liv Ullmann",
      "Margaretha Krook"
    ],
    "runtime": 85,
    "genre": [
      "Drama"
    ],
    "certificate": "NOT_RATED",
    "date": "2000-11-13T10:29:29+05:30",
    "actor": "Bibi Andersson",
    "id": 171
  },
  {
    "name": "Mary and Max",
    "outline": "A tale of friendship between two unlikely pen pals: Mary, a lonely, eight-year-old girl living in the suburbs of Melbourne, and Max, a forty-four-year old, severely obese man living in New York.",
    "rating": 8.2,
    "director": "Adam Elliot",
    "year": 2009,
    "stars": [
      "Toni Collette",
      "Philip Seymour Hoffman",
      "Eric Bana"
    ],
    "runtime": 92,
    "genre": [
      "Animation",
      "Comedy",
      "Drama"
    ],
    "certificate": "NOT_RATED",
    "date": "1973-11-16T10:29:29+05:30",
    "actor": "Toni Collette",
    "id": 172
  },
  {
    "name": "Life of Brian",
    "outline": "Brian is born on the original Christmas, in the stable next door. He spends his life being mistaken for a messiah.",
    "rating": 8.1,
    "director": "Terry Jones",
    "year": 1979,
    "stars": [
      "Graham Chapman",
      "John Cleese",
      "Michael Palin"
    ],
    "runtime": 94,
    "genre": [
      "Comedy"
    ],
    "certificate": "R",
    "date": "1972-08-06T10:29:29+05:30",
    "actor": "Graham Chapman",
    "id": 173
  },
  {
    "name": "Network",
    "outline": "A TV network cynically exploits a deranged ex-TV anchor's ravings and revelations about the media for their own profit.",
    "rating": 8.1,
    "director": "Sidney Lumet",
    "year": 1976,
    "stars": [
      "Faye Dunaway",
      "William Holden",
      "Peter Finch"
    ],
    "runtime": 121,
    "genre": [
      "Drama"
    ],
    "certificate": "R",
    "date": "1980-06-03T10:29:29+05:30",
    "actor": "Faye Dunaway",
    "id": 174
  },
  {
    "name": "The 400 Blows",
    "outline": "Intensely touching story of a misunderstood young adolescent who left without attention, delves into a life of petty crime.",
    "rating": 8.1,
    "director": "François Truffaut",
    "year": 1959,
    "stars": [
      "Jean-Pierre Léaud",
      "Albert Rémy",
      "Claire Maurier"
    ],
    "runtime": 99,
    "genre": [
      "Crime",
      "Drama"
    ],
    "certificate": "NOT_RATED",
    "date": "1987-10-10T10:29:29+05:30",
    "actor": "Jean-Pierre Léaud",
    "id": 175
  },
  {
    "name": "Finding Nemo",
    "outline": "After his son is captured in the Great Barrier Reef and taken to Sydney, a timid clownfish sets out on a journey to bring him home.",
    "rating": 8.1,
    "director": "Andrew Stanton",
    "year": 2003,
    "stars": [
      "Lee Unkrich",
      "Albert Brooks",
      "Ellen DeGeneres",
      "Alexander Gould"
    ],
    "runtime": 100,
    "genre": [
      "Animation",
      "Adventure",
      "Comedy",
      "Family"
    ],
    "certificate": "G",
    "date": "1983-04-19T10:29:29+05:30",
    "actor": "Lee Unkrich",
    "id": 176
  },
  {
    "name": "Ben-Hur",
    "outline": "When a Jewish prince is betrayed and sent into slavery by a Roman friend, he regains his freedom and comes back for revenge.",
    "rating": 8.1,
    "director": "William Wyler",
    "year": 1959,
    "stars": [
      "Charlton Heston",
      "Jack Hawkins",
      "Stephen Boyd"
    ],
    "runtime": 212,
    "genre": [
      "Action",
      "Adventure",
      "Drama",
      "History",
      "Romance"
    ],
    "certificate": "APPROVED",
    "date": "1963-03-08T10:29:29+05:30",
    "actor": "Charlton Heston",
    "id": 177
  },
  {
    "name": "Life of Pi",
    "outline": "A young man who survives a disaster at sea is hurtled into an epic journey of adventure and discovery. While cast away, he forms an unexpected connection with another survivor: a fearsome Bengal tiger.",
    "rating": 8.1,
    "director": "Ang Lee",
    "year": 2012,
    "stars": [
      "Suraj Sharma",
      "Irrfan Khan",
      "Adil Hussain"
    ],
    "runtime": 127,
    "genre": [
      "Adventure",
      "Drama",
      "Fantasy"
    ],
    "certificate": "PG",
    "date": "1996-09-27T10:29:29+05:30",
    "actor": "Suraj Sharma",
    "id": 178
  },
  {
    "name": "Donnie Darko",
    "outline": "A troubled teenager is plagued by visions of a large bunny rabbit that manipulates him to commit a series of crimes, after narrowly escaping a bizarre accident.",
    "rating": 8.1,
    "director": "Richard Kelly",
    "year": 2001,
    "stars": [
      "Jake Gyllenhaal",
      "Jena Malone",
      "Mary McDonnell"
    ],
    "runtime": 113,
    "genre": [
      "Drama",
      "Mystery",
      "Sci-Fi"
    ],
    "certificate": "R",
    "date": "1980-06-16T10:29:29+05:30",
    "actor": "Jake Gyllenhaal",
    "id": 179
  },
  {
    "name": "The King's Speech",
    "outline": "The story of King George VI of Britain, his impromptu ascension to the throne and the speech therapist who helped the unsure monarch become worthy of it.",
    "rating": 8.1,
    "director": "Tom Hooper",
    "year": 2010,
    "stars": [
      "Colin Firth",
      "Geoffrey Rush",
      "Helena Bonham Carter"
    ],
    "runtime": 118,
    "genre": [
      "Biography",
      "Drama",
      "History"
    ],
    "certificate": "R",
    "date": "1977-08-20T10:29:29+05:30",
    "actor": "Colin Firth",
    "id": 180
  },
  {
    "name": "Howl's Moving Castle",
    "outline": "When an unconfident young woman is cursed with an old body by a spiteful witch, her only chance of breaking the spell lies with a self-indulgent yet insecure young wizard and his companions in his legged, walking home.",
    "rating": 8.1,
    "director": "Hayao Miyazaki",
    "year": 2004,
    "stars": [
      "Chieko Baishô",
      "Takuya Kimura",
      "Tatsuya Gashûin"
    ],
    "runtime": 119,
    "genre": [
      "Animation",
      "Action",
      "Adventure",
      "Family",
      "Fantasy",
      "Romance"
    ],
    "certificate": "TV_PG",
    "date": "1979-08-01T10:29:29+05:30",
    "actor": "Chieko Baishô",
    "id": 181
  },
  {
    "name": "There Will Be Blood",
    "outline": "A story about family, greed, religion, and oil, centered around a turn-of-the-century prospector in the early days of the business.",
    "rating": 8.1,
    "director": "Paul Thomas Anderson",
    "year": 2007,
    "stars": [
      "Daniel Day-Lewis",
      "Paul Dano",
      "Ciarán Hinds"
    ],
    "runtime": 158,
    "genre": [
      "Drama"
    ],
    "certificate": "R",
    "date": "1994-01-11T10:29:29+05:30",
    "actor": "Daniel Day-Lewis",
    "id": 182
  },
  {
    "name": "Stand by Me",
    "outline": "After the death of a friend, a writer recounts a boyhood journey to find the body of a missing boy.",
    "rating": 8.1,
    "director": "Rob Reiner",
    "year": 1986,
    "stars": [
      "Wil Wheaton",
      "River Phoenix",
      "Corey Feldman"
    ],
    "runtime": 89,
    "genre": [
      "Adventure",
      "Drama"
    ],
    "certificate": "R",
    "date": "2001-12-12T10:29:29+05:30",
    "actor": "Wil Wheaton",
    "id": 183
  },
  {
    "name": "La strada",
    "outline": "A carefree girl is sold to a traveling entertainer, consequently enduring physical and emotional pain along the way.",
    "rating": 8.1,
    "director": "Federico Fellini",
    "year": 1954,
    "stars": [
      "Anthony Quinn",
      "Giulietta Masina",
      "Richard Basehart"
    ],
    "runtime": 108,
    "genre": [
      "Drama"
    ],
    "certificate": "TV_PG",
    "date": "1999-03-20T10:29:29+05:30",
    "actor": "Anthony Quinn",
    "id": 184
  },
  {
    "name": "The Killing",
    "outline": "Crooks plan and execute a daring racetrack robbery.",
    "rating": 8.1,
    "director": "Stanley Kubrick",
    "year": 1956,
    "stars": [
      "Sterling Hayden",
      "Coleen Gray",
      "Vince Edwards"
    ],
    "runtime": 85,
    "genre": [
      "Crime",
      "Film-Noir",
      "Thriller"
    ],
    "certificate": "APPROVED",
    "date": "2011-11-26T10:29:29+05:30",
    "actor": "Sterling Hayden",
    "id": 185
  },
  {
    "name": "The Princess Bride",
    "outline": "A classic fairy tale, with swordplay, giants, an evil prince, a beautiful princess, and yes, some kissing (as read by a kindly grandfather).",
    "rating": 8.1,
    "director": "Rob Reiner",
    "year": 1987,
    "stars": [
      "Cary Elwes",
      "Mandy Patinkin",
      "Robin Wright"
    ],
    "runtime": 98,
    "genre": [
      "Adventure",
      "Comedy",
      "Family",
      "Fantasy",
      "Romance"
    ],
    "certificate": "PG",
    "date": "1992-03-30T10:29:29+05:30",
    "actor": "Cary Elwes",
    "id": 186
  },
  {
    "name": "Million Dollar Baby",
    "outline": "A determined woman works with a hardened boxing trainer to become a professional.",
    "rating": 8.1,
    "director": "Clint Eastwood",
    "year": 2004,
    "stars": [
      "Hilary Swank",
      "Clint Eastwood",
      "Morgan Freeman"
    ],
    "runtime": 132,
    "genre": [
      "Drama",
      "Sport"
    ],
    "certificate": "PG_13",
    "date": "1969-03-03T10:29:29+05:30",
    "actor": "Hilary Swank",
    "id": 187
  },
  {
    "name": "Amores Perros",
    "outline": "A horrific car accident connects three stories, each involving characters dealing with loss, regret, and life's harsh realities, all in the name of love.",
    "rating": 8.1,
    "director": "Alejandro González Iñárritu",
    "year": 2000,
    "stars": [
      "Emilio Echevarría",
      "Gael García Bernal",
      "Goya Toledo"
    ],
    "runtime": 154,
    "genre": [
      "Drama",
      "Thriller"
    ],
    "certificate": "R",
    "date": "1982-08-06T10:29:29+05:30",
    "actor": "Emilio Echevarría",
    "id": 188
  },
  {
    "name": "Who's Afraid of Virginia Woolf?",
    "outline": "A bitter aging couple with the help of alcohol, use a young couple to fuel anguish and emotional pain towards each other.",
    "rating": 8.1,
    "director": "Mike Nichols",
    "year": 1966,
    "stars": [
      "Elizabeth Taylor",
      "Richard Burton",
      "George Segal"
    ],
    "runtime": 131,
    "genre": [
      "Drama"
    ],
    "certificate": "APPROVED",
    "date": "1968-04-16T10:29:29+05:30",
    "actor": "Elizabeth Taylor",
    "id": 189
  },
  {
    "name": "Stalker",
    "outline": "A guide leads two men through an area known as the Zone to find a room that grants wishes.",
    "rating": 8.1,
    "director": "Andrey Tarkovskiy",
    "year": 1979,
    "stars": [
      "Alisa Freyndlikh",
      "Aleksandr Kaydanovskiy",
      "Anatoliy Solonitsyn"
    ],
    "runtime": 163,
    "genre": [
      "Adventure",
      "Drama",
      "Fantasy",
      "Mystery",
      "Sci-Fi"
    ],
    "certificate": "NOT_RATED",
    "date": "1972-08-23T10:29:29+05:30",
    "actor": "Alisa Freyndlikh",
    "id": 190
  },
  {
    "name": "8½",
    "outline": "A harried movie director retreats into his memories and fantasies.",
    "rating": 8.1,
    "director": "Federico Fellini",
    "year": 1963,
    "stars": [
      "Marcello Mastroianni",
      "Anouk Aimée",
      "Claudia Cardinale"
    ],
    "runtime": 138,
    "genre": [
      "Drama",
      "Fantasy"
    ],
    "certificate": "NOT_RATED",
    "date": "1977-06-04T10:29:29+05:30",
    "actor": "Marcello Mastroianni",
    "id": 191
  },
  {
    "name": "The Terminator",
    "outline": "A robotic assassin from a post-apocalyptic future travels back in time to eliminate a waitress, whose son will grow up and lead humanity in a war against machines.",
    "rating": 8.1,
    "director": "James Cameron",
    "year": 1984,
    "stars": [
      "Arnold Schwarzenegger",
      "Linda Hamilton",
      "Michael Biehn"
    ],
    "runtime": 107,
    "genre": [
      "Action",
      "Sci-Fi"
    ],
    "certificate": "R",
    "date": "1973-06-20T10:29:29+05:30",
    "actor": "Arnold Schwarzenegger",
    "id": 192
  },
  {
    "name": "Gandhi",
    "outline": "Biography of Mohandas K. Gandhi, the lawyer who became the famed leader of the Indian revolts against the British rule through his philosophy of non-violent protest.",
    "rating": 8.1,
    "director": "Richard Attenborough",
    "year": 1982,
    "stars": [
      "Ben Kingsley",
      "John Gielgud",
      "Candice Bergen"
    ],
    "runtime": 191,
    "genre": [
      "Biography",
      "Drama",
      "History"
    ],
    "certificate": "PG",
    "date": "1986-07-08T10:29:29+05:30",
    "actor": "Ben Kingsley",
    "id": 193
  },
  {
    "name": "Groundhog Day",
    "outline": "A weatherman finds himself living the same day over and over again.",
    "rating": 8.1,
    "director": "Harold Ramis",
    "year": 1993,
    "stars": [
      "Bill Murray",
      "Andie MacDowell",
      "Chris Elliott"
    ],
    "runtime": 101,
    "genre": [
      "Comedy",
      "Drama",
      "Fantasy",
      "Romance"
    ],
    "certificate": "PG",
    "date": "2011-07-02T10:29:29+05:30",
    "actor": "Bill Murray",
    "id": 194
  },
  {
    "name": "Dog Day Afternoon",
    "outline": "A man robs a bank to pay for his lover's operation; it turns into a hostage situation and a media circus.",
    "rating": 8.1,
    "director": "Sidney Lumet",
    "year": 1975,
    "stars": [
      "Al Pacino",
      "John Cazale",
      "Penelope Allen"
    ],
    "runtime": 125,
    "genre": [
      "Crime",
      "Drama"
    ],
    "certificate": "R",
    "date": "2008-06-01T10:29:29+05:30",
    "actor": "Al Pacino",
    "id": 195
  },
  {
    "name": "Incendies",
    "outline": "Twins journey to the Middle East to discover their family history, and fulfill their mother's last wishes.",
    "rating": 8.1,
    "director": "Denis Villeneuve",
    "year": 2010,
    "stars": [
      "Lubna Azabal",
      "Mélissa Désormeaux-Poulin",
      "Maxim Gaudette"
    ],
    "runtime": 139,
    "genre": [
      "Drama",
      "Mystery",
      "War"
    ],
    "certificate": "R",
    "date": "2011-10-05T10:29:29+05:30",
    "actor": "Lubna Azabal",
    "id": 196
  },
  {
    "name": "The Bourne Ultimatum",
    "outline": "Jason Bourne dodges a ruthless CIA official and his agents from a new assassination program while searching for the origins of his life as a trained killer.",
    "rating": 8.1,
    "director": "Paul Greengrass",
    "year": 2007,
    "stars": [
      "Matt Damon",
      "Édgar Ramírez",
      "Joan Allen"
    ],
    "runtime": 115,
    "genre": [
      "Action",
      "Crime",
      "Thriller"
    ],
    "certificate": "PG_13",
    "date": "2012-10-17T10:29:29+05:30",
    "actor": "Matt Damon",
    "id": 197
  },
  {
    "name": "The Perks of Being a Wallflower",
    "outline": "An introvert freshman is taken under the wings of two seniors who welcome him to the real world.",
    "rating": 8.1,
    "director": "Stephen Chbosky",
    "year": 2012,
    "stars": [
      "Logan Lerman",
      "Emma Watson",
      "Ezra Miller"
    ],
    "runtime": 102,
    "genre": [
      "Drama",
      "Romance"
    ],
    "certificate": "PG_13",
    "date": "1995-12-28T10:29:29+05:30",
    "actor": "Logan Lerman",
    "id": 198
  },
  {
    "name": "The Hustler",
    "outline": "An up-and-coming pool player plays a long-time champion in a single high-stakes match.",
    "rating": 8.1,
    "director": "Robert Rossen",
    "year": 1961,
    "stars": [
      "Paul Newman",
      "Jackie Gleason",
      "Piper Laurie"
    ],
    "runtime": 134,
    "genre": [
      "Drama",
      "Sport"
    ],
    "certificate": "UNRATED",
    "date": "1985-10-15T10:29:29+05:30",
    "actor": "Paul Newman",
    "id": 199
  },
  {
    "name": "Twelve Monkeys",
    "outline": "In a future world devastated by disease, a convict is sent back in time to gather information about the man-made virus that wiped out most of the human population on the planet.",
    "rating": 8.1,
    "director": "Terry Gilliam",
    "year": 1995,
    "stars": [
      "Bruce Willis",
      "Madeleine Stowe",
      "Brad Pitt"
    ],
    "runtime": 129,
    "genre": [
      "Mystery",
      "Sci-Fi",
      "Thriller"
    ],
    "certificate": "R",
    "date": "1979-02-25T10:29:29+05:30",
    "actor": "Bruce Willis",
    "id": 200
  },
  {
    "name": "Black Swan",
    "outline": "A ballet dancer wins the lead in \"Swan Lake\" and is perfect for the role of the delicate White Swan - Princess Odette - but slowly loses her mind as she becomes more and more like Odile, the Black Swan.",
    "rating": 8.1,
    "director": "Darren Aronofsky",
    "year": 2010,
    "stars": [
      "Natalie Portman",
      "Mila Kunis",
      "Vincent Cassel"
    ],
    "runtime": 108,
    "genre": [
      "Drama",
      "Mystery",
      "Thriller"
    ],
    "certificate": "R",
    "date": "2000-11-12T10:29:29+05:30",
    "actor": "Natalie Portman",
    "id": 201
  },
  {
    "name": "Memories of Murder",
    "outline": "In 1986, in the province of Gyunggi, in South Korea, a second young and beautiful woman is found dead...",
    "rating": 8.1,
    "director": "Joon-ho Bong",
    "year": 2003,
    "stars": [
      "Kang-ho Song",
      "Sang-kyung Kim",
      "Roe-ha Kim"
    ],
    "runtime": 130,
    "genre": [
      "Crime",
      "Drama",
      "Mystery",
      "Thriller"
    ],
    "certificate": "UNRATED",
    "date": "1975-11-03T10:29:29+05:30",
    "actor": "Kang-ho Song",
    "id": 202
  },
  {
    "name": "Anatomy of a Murder",
    "outline": "In a murder trial, the defendant says he suffered temporary insanity after the victim raped his wife. What is the truth, and will he win his case?",
    "rating": 8.1,
    "director": "Otto Preminger",
    "year": 1959,
    "stars": [
      "James Stewart",
      "Lee Remick",
      "Ben Gazzara"
    ],
    "runtime": 160,
    "genre": [
      "Crime",
      "Drama",
      "Mystery"
    ],
    "certificate": "UNRATED",
    "date": "1971-02-13T10:29:29+05:30",
    "actor": "James Stewart",
    "id": 203
  },
  {
    "name": "Stalag 17",
    "outline": "When two escaping American World War II prisoners are killed, the German POW camp barracks black marketeer, J.J. Sefton, is suspected of being an informer.",
    "rating": 8.1,
    "director": "Billy Wilder",
    "year": 1953,
    "stars": [
      "William Holden",
      "Don Taylor",
      "Otto Preminger"
    ],
    "runtime": 120,
    "genre": [
      "Comedy",
      "Drama",
      "Thriller",
      "War"
    ],
    "certificate": "APPROVED",
    "date": "2010-06-27T10:29:29+05:30",
    "actor": "William Holden",
    "id": 204
  },
  {
    "name": "Sleuth",
    "outline": "A man who loves games and theater invites his wife's lover to meet him, setting up a battle of wits with potentially deadly results.",
    "rating": 8.1,
    "director": "Joseph L. Mankiewicz",
    "year": 1972,
    "stars": [
      "Laurence Olivier",
      "Michael Caine",
      "Alec Cawthorne"
    ],
    "runtime": 138,
    "genre": [
      "Mystery",
      "Thriller"
    ],
    "certificate": "PG",
    "date": "1968-12-07T10:29:29+05:30",
    "actor": "Laurence Olivier",
    "id": 205
  },
  {
    "name": "The Graduate",
    "outline": "Recent college graduate Benjamin Braddock is trapped into an affair with Mrs. Robinson, who happens to be the wife of his father's business partner and then finds himself falling in love with her daughter, Elaine.",
    "rating": 8.1,
    "director": "Mike Nichols",
    "year": 1967,
    "stars": [
      "Dustin Hoffman",
      "Anne Bancroft",
      "Katharine Ross"
    ],
    "runtime": 106,
    "genre": [
      "Comedy",
      "Drama",
      "Romance"
    ],
    "certificate": "APPROVED",
    "date": "2011-05-09T10:29:29+05:30",
    "actor": "Dustin Hoffman",
    "id": 206
  },
  {
    "name": "The Man Who Shot Liberty Valance",
    "outline": "A senator, who became famous for killing a notorious outlaw, returns for the funeral of an old friend and tells the truth about his deed.",
    "rating": 8.1,
    "director": "John Ford",
    "year": 1962,
    "stars": [
      "James Stewart",
      "John Wayne",
      "Vera Miles"
    ],
    "runtime": 123,
    "genre": [
      "Drama",
      "Romance",
      "Western"
    ],
    "certificate": "UNRATED",
    "date": "1965-05-31T10:29:29+05:30",
    "actor": "James Stewart",
    "id": 207
  },
  {
    "name": "The Manchurian Candidate",
    "outline": "A former Korean War POW is brainwashed by Communists into becoming a political assassin. But another former prisoner may know how to save him.",
    "rating": 8.1,
    "director": "John Frankenheimer",
    "year": 1962,
    "stars": [
      "Frank Sinatra",
      "Laurence Harvey",
      "Janet Leigh"
    ],
    "runtime": 126,
    "genre": [
      "Drama",
      "Mystery",
      "Romance",
      "Thriller",
      "War"
    ],
    "certificate": "APPROVED",
    "date": "1982-11-29T10:29:29+05:30",
    "actor": "Frank Sinatra",
    "id": 208
  },
  {
    "name": "A Beautiful Mind",
    "outline": "After a brilliant but asocial mathematician accepts secret work in cryptography, his life takes a turn to the nightmarish.",
    "rating": 8.1,
    "director": "Ron Howard",
    "year": 2001,
    "stars": [
      "Russell Crowe",
      "Ed Harris",
      "Jennifer Connelly"
    ],
    "runtime": 135,
    "genre": [
      "Biography",
      "Drama"
    ],
    "certificate": "PG_13",
    "date": "2005-03-20T10:29:29+05:30",
    "actor": "Russell Crowe",
    "id": 209
  },
  {
    "name": "Harry Potter and the Deathly Hallows: Part 2",
    "outline": "Harry, Ron and Hermione search for Voldemort's remaining Horcruxes in their effort to destroy the Dark Lord.",
    "rating": 8.1,
    "director": "David Yates",
    "year": 2011,
    "stars": [
      "Daniel Radcliffe",
      "Emma Watson",
      "Rupert Grint"
    ],
    "runtime": 130,
    "genre": [
      "Adventure",
      "Family",
      "Fantasy",
      "Mystery"
    ],
    "certificate": "PG_13",
    "date": "2013-04-05T10:29:29+05:30",
    "actor": "Daniel Radcliffe",
    "id": 210
  },
  {
    "name": "Barry Lyndon",
    "outline": "An Irish rogue wins the heart of a rich widow and assumes her dead husband's position in 18th Century aristocracy.",
    "rating": 8.1,
    "director": "Stanley Kubrick",
    "year": 1975,
    "stars": [
      "Ryan O'Neal",
      "Marisa Berenson",
      "Patrick Magee"
    ],
    "runtime": 184,
    "genre": [
      "Adventure",
      "Drama",
      "Romance",
      "War"
    ],
    "certificate": "PG",
    "date": "1963-07-12T10:29:29+05:30",
    "actor": "Ryan O'Neal",
    "id": 211
  },
  {
    "name": "Infernal Affairs",
    "outline": "A story between a mole in the police department and an undercover cop. Their objectives are the same: to find out who is the mole, and who is the cop.",
    "rating": 8.1,
    "director": "Wai-keung Lau",
    "year": 2002,
    "stars": [
      "Alan Mak",
      "Andy Lau",
      "Tony Leung Chiu Wai",
      "Anthony Wong Chau-Sang"
    ],
    "runtime": 101,
    "genre": [
      "Crime",
      "Mystery",
      "Thriller"
    ],
    "certificate": "R",
    "date": "1973-06-08T10:29:29+05:30",
    "actor": "Alan Mak",
    "id": 212
  },
  {
    "name": "The Wild Bunch",
    "outline": "An aging group of outlaws look for one last big score as the \"traditional\" American West is disappearing around them.",
    "rating": 8.1,
    "director": "Sam Peckinpah",
    "year": 1969,
    "stars": [
      "William Holden",
      "Ernest Borgnine",
      "Robert Ryan"
    ],
    "runtime": 145,
    "genre": [
      "Western"
    ],
    "certificate": "R",
    "date": "1976-01-02T10:29:29+05:30",
    "actor": "William Holden",
    "id": 213
  },
  {
    "name": "Slumdog Millionaire",
    "outline": "A Mumbai teen who grew up in the slums, becomes a contestant on the Indian version of \"Who Wants To Be A Millionaire?\" He is arrested under suspicion of cheating, and while being interrogated, events from his life history are shown which explain why he knows the answers.",
    "rating": 8.1,
    "director": "Danny Boyle",
    "year": 2008,
    "stars": [
      "Loveleen Tandan",
      "Dev Patel",
      "Freida Pinto",
      "Saurabh Shukla"
    ],
    "runtime": 120,
    "genre": [
      "Drama",
      "Romance",
      "Thriller"
    ],
    "certificate": "R",
    "date": "1996-09-22T10:29:29+05:30",
    "actor": "Loveleen Tandan",
    "id": 214
  },
  {
    "name": "Ip Man",
    "outline": "A semi-biographical account of Yip Man, the first martial arts master to teach the Chinese martial art of Wing Chun.",
    "rating": 8.1,
    "director": "Wilson Yip",
    "year": 2008,
    "stars": [
      "Donnie Yen",
      "Simon Yam",
      "Siu-Wong Fan"
    ],
    "runtime": 106,
    "genre": [
      "Action",
      "Biography",
      "Drama",
      "History"
    ],
    "certificate": "R",
    "date": "2004-09-07T10:29:29+05:30",
    "actor": "Donnie Yen",
    "id": 215
  },
  {
    "name": "Roman Holiday",
    "outline": "A bored and sheltered princess escapes her guardians and falls in love with an American newsman in Rome.",
    "rating": 8.1,
    "director": "William Wyler",
    "year": 1953,
    "stars": [
      "Gregory Peck",
      "Audrey Hepburn",
      "Eddie Albert"
    ],
    "runtime": 118,
    "genre": [
      "Comedy",
      "Drama",
      "Romance"
    ],
    "certificate": "APPROVED",
    "date": "2008-03-19T10:29:29+05:30",
    "actor": "Gregory Peck",
    "id": 216
  },
  {
    "name": "Rocky",
    "outline": "A small time boxer gets a once in a lifetime chance to fight the heavyweight champ in a bout in which he strives to go the distance for his self-respect.",
    "rating": 8.1,
    "director": "John G. Avildsen",
    "year": 1976,
    "stars": [
      "Sylvester Stallone",
      "Talia Shire",
      "Burt Young"
    ],
    "runtime": 119,
    "genre": [
      "Drama",
      "Sport"
    ],
    "certificate": "PG",
    "date": "1987-08-18T10:29:29+05:30",
    "actor": "Sylvester Stallone",
    "id": 217
  },
  {
    "name": "Nausicaä of the Valley of the Wind",
    "outline": "Warrior/pacifist Princess Nausicaä desperately struggles to prevent two warring nations from destroying themselves and their dying planet.",
    "rating": 8.1,
    "director": "Hayao Miyazaki",
    "year": 1984,
    "stars": [
      "Sumi Shimamoto",
      "Mahito Tsujimura",
      "Hisako Kyôda"
    ],
    "runtime": 117,
    "genre": [
      "Animation",
      "Action",
      "Adventure",
      "Fantasy",
      "Sci-Fi"
    ],
    "certificate": "PG",
    "date": "2004-11-02T10:29:29+05:30",
    "actor": "Sumi Shimamoto",
    "id": 218
  },
  {
    "name": "In the Name of the Father",
    "outline": "A man's coerced confession to an I.R.A. bombing he didn't commit imprisons his father as well; a British lawyer helps fight for their freedom.",
    "rating": 8.1,
    "director": "Jim Sheridan",
    "year": 1993,
    "stars": [
      "Daniel Day-Lewis",
      "Pete Postlethwaite",
      "Alison Crosbie"
    ],
    "runtime": 133,
    "genre": [
      "Biography",
      "Drama",
      "Thriller"
    ],
    "certificate": "R",
    "date": "1981-12-14T10:29:29+05:30",
    "actor": "Daniel Day-Lewis",
    "id": 219
  },
  {
    "name": "The Artist",
    "outline": "A silent movie star meets a young dancer, but the arrival of talking pictures sends their careers in opposite directions.",
    "rating": 8.1,
    "director": "Michel Hazanavicius",
    "year": 2011,
    "stars": [
      "Jean Dujardin",
      "Bérénice Bejo",
      "John Goodman"
    ],
    "runtime": 100,
    "genre": [
      "Comedy",
      "Drama",
      "Romance"
    ],
    "certificate": "PG_13",
    "date": "1966-12-02T10:29:29+05:30",
    "actor": "Jean Dujardin",
    "id": 220
  },
  {
    "name": "Rope",
    "outline": "Two young men strangle their \"inferior\" classmate, hide his body in their apartment, and invite his friends and family to a dinner party as a means to challenge the \"perfection\" of their crime.",
    "rating": 8.1,
    "director": "Alfred Hitchcock",
    "year": 1948,
    "stars": [
      "James Stewart",
      "John Dall",
      "Farley Granger"
    ],
    "runtime": 80,
    "genre": [
      "Crime",
      "Drama",
      "Thriller"
    ],
    "certificate": "APPROVED",
    "date": "1971-07-30T10:29:29+05:30",
    "actor": "James Stewart",
    "id": 221
  },
  {
    "name": "La Haine",
    "outline": "After local youth Abdel is beaten unconscious by police, a riot ensues on his estate during which a policeman loses his gun. The gun is found by Vinz who threatens he will kill a cop if Abdel dies.",
    "rating": 8.1,
    "director": "Mathieu Kassovitz",
    "year": 1995,
    "stars": [
      "Vincent Cassel",
      "Hubert Koundé",
      "Saïd Taghmaoui"
    ],
    "runtime": 98,
    "genre": [
      "Drama"
    ],
    "certificate": "NOT_RATED",
    "date": "1990-10-11T10:29:29+05:30",
    "actor": "Vincent Cassel",
    "id": 222
  },
  {
    "name": "The Celebration",
    "outline": "At Helge's 60th birthday party, some unpleasant family truths are revealed.",
    "rating": 8.1,
    "director": "Ulrich Thomsen",
    "year": 1998,
    "stars": [
      "Henning Moritzen",
      "Thomas Bo Larsen"
    ],
    "runtime": 105,
    "genre": [
      "Drama"
    ],
    "certificate": "R",
    "date": "1963-07-23T10:29:29+05:30",
    "actor": "Henning Moritzen",
    "id": 223
  },
  {
    "name": "Harvey",
    "outline": "Elwood P. Dowd is a mild-mannered, pleasant man, who just happens (he says) to have an invisible friend resembling a 6-foot rabbit.",
    "rating": 8.1,
    "director": "Henry Koster",
    "year": 1950,
    "stars": [
      "James Stewart",
      "Josephine Hull",
      "Peggy Dow"
    ],
    "runtime": 104,
    "genre": [
      "Comedy",
      "Drama"
    ],
    "certificate": "APPROVED",
    "date": "1996-09-09T10:29:29+05:30",
    "actor": "James Stewart",
    "id": 224
  },
  {
    "name": "All Quiet on the Western Front",
    "outline": "A young soldier faces profound disillusionment in the soul-destroying horror of World War I.",
    "rating": 8.1,
    "director": "Lewis Milestone",
    "year": 1930,
    "stars": [
      "Lew Ayres",
      "Louis Wolheim",
      "John Wray"
    ],
    "runtime": 136,
    "genre": [
      "Drama",
      "War"
    ],
    "certificate": "UNRATED",
    "date": "1979-02-14T10:29:29+05:30",
    "actor": "Lew Ayres",
    "id": 225
  },
  {
    "name": "Spring, Summer, Fall, Winter... and Spring",
    "outline": "This film takes place in an isolated lake, where an old monk lives on a small floating temple. The wise master has also a young boy with him that teaches to become a monk. And we watch as seasons and years pass by.",
    "rating": 8.1,
    "director": "Ki-duk Kim",
    "year": 2003,
    "stars": [
      "Ki-duk Kim",
      "Yeong-su Oh",
      "Jong-ho Kim"
    ],
    "runtime": 103,
    "genre": [
      "Drama"
    ],
    "certificate": "R",
    "date": "2005-12-08T10:29:29+05:30",
    "actor": "Ki-duk Kim",
    "id": 226
  },
  {
    "name": "Pirates of the Caribbean: The Curse of the Black Pearl",
    "outline": "Blacksmith Will Turner teams up with eccentric pirate \"Captain\" Jack Sparrow to save his love, the governor's daughter, from Jack's former pirate allies, who are now undead.",
    "rating": 8.0,
    "director": "Gore Verbinski",
    "year": 2003,
    "stars": [
      "Johnny Depp",
      "Geoffrey Rush",
      "Orlando Bloom"
    ],
    "runtime": 143,
    "genre": [
      "Action",
      "Adventure",
      "Fantasy"
    ],
    "certificate": "PG_13",
    "date": "1964-10-09T10:29:29+05:30",
    "actor": "Johnny Depp",
    "id": 227
  },
  {
    "name": "The Exorcist",
    "outline": "When a teenage girl is possessed by a mysterious entity, her mother seeks the help of two priests to save her daughter.",
    "rating": 8.0,
    "director": "William Friedkin",
    "year": 1973,
    "stars": [
      "Ellen Burstyn",
      "Max von Sydow",
      "Linda Blair"
    ],
    "runtime": 122,
    "genre": [
      "Horror",
      "Thriller"
    ],
    "certificate": "TV_14",
    "date": "1991-05-18T10:29:29+05:30",
    "actor": "Ellen Burstyn",
    "id": 228
  },
  {
    "name": "In the Mood for Love",
    "outline": "A man and a woman move in to neighboring Hong Kong apartments and form a bond when they both suspect their spouses of extra-marital activities.",
    "rating": 8.0,
    "director": "Kar Wai Wong",
    "year": 2000,
    "stars": [
      "Tony Leung Chiu Wai",
      "Maggie Cheung",
      "Ping Lam Siu"
    ],
    "runtime": 98,
    "genre": [
      "Drama",
      "Romance"
    ],
    "certificate": "PG",
    "date": "2000-12-04T10:29:29+05:30",
    "actor": "Tony Leung Chiu Wai",
    "id": 229
  },
  {
    "name": "The Diving Bell and the Butterfly",
    "outline": "The true story of Elle editor Jean-Dominique Bauby who suffers a stroke and has to live with an almost totally paralyzed body; only his left eye isn't paralyzed.",
    "rating": 8.0,
    "director": "Julian Schnabel",
    "year": 2007,
    "stars": [
      "Mathieu Amalric",
      "Emmanuelle Seigner",
      "Marie-Josée Croze"
    ],
    "runtime": 112,
    "genre": [
      "Biography",
      "Drama"
    ],
    "certificate": "PG_13",
    "date": "2012-03-04T10:29:29+05:30",
    "actor": "Mathieu Amalric",
    "id": 230
  },
  {
    "name": "The Help",
    "outline": "An aspiring author during the civil rights movement of the 1960s decides to write a book detailing the African-American maids' point of view on the white families for which they work, and the hardships they go through on a daily basis.",
    "rating": 8.0,
    "director": "Tate Taylor",
    "year": 2011,
    "stars": [
      "Emma Stone",
      "Viola Davis",
      "Octavia Spencer"
    ],
    "runtime": 146,
    "genre": [
      "Drama"
    ],
    "certificate": "PG_13",
    "date": "1963-05-13T10:29:29+05:30",
    "actor": "Emma Stone",
    "id": 231
  },
  {
    "name": "A Streetcar Named Desire",
    "outline": "Disturbed Blanche DuBois moves in with her sister in New Orleans and is tormented by her brutish brother-in-law while her reality crumbles around her.",
    "rating": 8.0,
    "director": "Elia Kazan",
    "year": 1951,
    "stars": [
      "Vivien Leigh",
      "Marlon Brando",
      "Kim Hunter"
    ],
    "runtime": 122,
    "genre": [
      "Drama"
    ],
    "certificate": "APPROVED",
    "date": "1981-01-18T10:29:29+05:30",
    "actor": "Vivien Leigh",
    "id": 232
  },
  {
    "name": "A Fistful of Dollars",
    "outline": "A wandering gunfighter plays two rival families against each other in a town torn apart by greed, pride, and revenge.",
    "rating": 8.0,
    "director": "Sergio Leone",
    "year": 1964,
    "stars": [
      "Clint Eastwood",
      "Gian Maria Volonté",
      "Marianne Koch"
    ],
    "runtime": 99,
    "genre": [
      "Western"
    ],
    "certificate": "R",
    "date": "1974-10-03T10:29:29+05:30",
    "actor": "Clint Eastwood",
    "id": 233
  },
  {
    "name": "Star Trek",
    "outline": "The brash James T. Kirk tries to live up to his father's legacy with Mr. Spock keeping him in check as a vengeful, time-traveling Romulan creates black holes to destroy the Federation one planet at a time.",
    "rating": 8.0,
    "director": "J.J. Abrams",
    "year": 2009,
    "stars": [
      "Chris Pine",
      "Zachary Quinto",
      "Simon Pegg"
    ],
    "runtime": 127,
    "genre": [
      "Action",
      "Adventure",
      "Sci-Fi"
    ],
    "certificate": "PG_13",
    "date": "1979-06-28T10:29:29+05:30",
    "actor": "Chris Pine",
    "id": 234
  },
  {
    "name": "Monsters, Inc.",
    "outline": "Monsters generate their city's power by scaring children, but they are terribly afraid themselves of being contaminated by children, so when one enters Monstropolis, top scarer Sulley finds his world disrupted.",
    "rating": 8.0,
    "director": "Pete Docter",
    "year": 2001,
    "stars": [
      "David Silverman",
      "Billy Crystal",
      "John Goodman",
      "Mary Gibbs"
    ],
    "runtime": 92,
    "genre": [
      "Animation",
      "Adventure",
      "Comedy",
      "Family",
      "Fantasy"
    ],
    "certificate": "TV_PG",
    "date": "1984-02-05T10:29:29+05:30",
    "actor": "David Silverman",
    "id": 235
  },
  {
    "name": "District 9",
    "outline": "An extraterrestrial race forced to live in slum-like conditions on Earth suddenly finds a kindred spirit in a government agent who is exposed to their biotechnology.",
    "rating": 8.0,
    "director": "Neill Blomkamp",
    "year": 2009,
    "stars": [
      "Sharlto Copley",
      "David James",
      "Jason Cope"
    ],
    "runtime": 112,
    "genre": [
      "Action",
      "Sci-Fi",
      "Thriller"
    ],
    "certificate": "R",
    "date": "1989-09-05T10:29:29+05:30",
    "actor": "Sharlto Copley",
    "id": 236
  },
  {
    "name": "Papillon",
    "outline": "A man befriends a fellow criminal as the two of them begin serving their sentence on a dreadful prison island, which inspires the man to plot his escape.",
    "rating": 8.0,
    "director": "Franklin J. Schaffner",
    "year": 1973,
    "stars": [
      "Steve McQueen",
      "Dustin Hoffman",
      "Victor Jory"
    ],
    "runtime": 151,
    "genre": [
      "Biography",
      "Crime",
      "Drama"
    ],
    "certificate": "R",
    "date": "1993-09-17T10:29:29+05:30",
    "actor": "Steve McQueen",
    "id": 237
  },
  {
    "name": "The Truman Show",
    "outline": "An insurance salesman/adjuster discovers his entire life is actually a TV show.",
    "rating": 8.0,
    "director": "Peter Weir",
    "year": 1998,
    "stars": [
      "Jim Carrey",
      "Ed Harris",
      "Laura Linney"
    ],
    "runtime": 103,
    "genre": [
      "Comedy",
      "Drama",
      "Sci-Fi"
    ],
    "certificate": "PG",
    "date": "2004-03-11T10:29:29+05:30",
    "actor": "Jim Carrey",
    "id": 238
  },
  {
    "name": "Ratatouille",
    "outline": "With dreams of becoming a chef, a culinary genius in the form of a rat, makes an unusual alliance with a young kitchen worker at a famed restaurant.",
    "rating": 8.0,
    "director": "Brad Bird",
    "year": 2007,
    "stars": [
      "Jan Pinkava",
      "Brad Garrett",
      "Lou Romano",
      "Patton Oswalt"
    ],
    "runtime": 111,
    "genre": [
      "Animation",
      "Comedy",
      "Family",
      "Fantasy"
    ],
    "certificate": "G",
    "date": "1970-04-29T10:29:29+05:30",
    "actor": "Jan Pinkava",
    "id": 239
  },
  {
    "name": "Beauty and the Beast",
    "outline": "Belle, whose father is imprisoned by the Beast, offers herself instead and discovers her captor to be an enchanted prince.",
    "rating": 8.0,
    "director": "Gary Trousdale",
    "year": 1991,
    "stars": [
      "Kirk Wise",
      "Paige O'Hara",
      "Robby Benson",
      "Richard White"
    ],
    "runtime": 84,
    "genre": [
      "Animation",
      "Family",
      "Fantasy",
      "Musical",
      "Romance"
    ],
    "certificate": "G",
    "date": "1998-01-20T10:29:29+05:30",
    "actor": "Kirk Wise",
    "id": 240
  },
  {
    "name": "Shutter Island",
    "outline": "Drama set in 1954, U.S. Marshal Teddy Daniels is investigating the disappearance of a murderess who escaped from a hospital for the criminally insane and is presumed to be hiding nearby.",
    "rating": 8.0,
    "director": "Martin Scorsese",
    "year": 2010,
    "stars": [
      "Leonardo DiCaprio",
      "Emily Mortimer",
      "Mark Ruffalo"
    ],
    "runtime": 138,
    "genre": [
      "Mystery",
      "Thriller"
    ],
    "certificate": "R",
    "date": "2010-09-07T10:29:29+05:30",
    "actor": "Leonardo DiCaprio",
    "id": 241
  },
  {
    "name": "Nosferatu",
    "outline": "Vampire Count Orlok expresses interest in a new residence and real estate agent Hutter's wife. Silent classic based on the story \"Dracula.\"",
    "rating": 8.0,
    "director": "F.W. Murnau",
    "year": 1922,
    "stars": [
      "Max Schreck",
      "Greta Schröder",
      "Ruth Landshoff"
    ],
    "runtime": 94,
    "genre": [
      "Horror"
    ],
    "certificate": "UNRATED",
    "date": "2005-12-22T10:29:29+05:30",
    "actor": "Max Schreck",
    "id": 242
  },
  {
    "name": "Manhattan",
    "outline": "A divorced New Yorker currently dating a high-schooler brings himself to look for love in the mistress of his best friend instead.",
    "rating": 8.0,
    "director": "Woody Allen",
    "year": 1979,
    "stars": [
      "Woody Allen",
      "Diane Keaton",
      "Mariel Hemingway"
    ],
    "runtime": 96,
    "genre": [
      "Comedy",
      "Drama",
      "Romance"
    ],
    "certificate": "R",
    "date": "1976-02-14T10:29:29+05:30",
    "actor": "Woody Allen",
    "id": 243
  },
  {
    "name": "Rosemary's Baby",
    "outline": "A young couple move into a new apartment, only to be surrounded by peculiar neighbors and occurrences. When the wife becomes mysteriously pregnant, paranoia over the safety of her unborn child begins controlling her life.",
    "rating": 8.0,
    "director": "Roman Polanski",
    "year": 1968,
    "stars": [
      "Mia Farrow",
      "John Cassavetes",
      "Ruth Gordon"
    ],
    "runtime": 136,
    "genre": [
      "Drama",
      "Horror",
      "Mystery"
    ],
    "certificate": "APPROVED",
    "date": "1984-06-13T10:29:29+05:30",
    "actor": "Mia Farrow",
    "id": 244
  },
  {
    "name": "Jurassic Park",
    "outline": "During a preview tour, a theme park suffers a major power breakdown that allows its cloned dinosaur exhibits to run amok.",
    "rating": 8.0,
    "director": "Steven Spielberg",
    "year": 1993,
    "stars": [
      "Sam Neill",
      "Laura Dern",
      "Jeff Goldblum"
    ],
    "runtime": 127,
    "genre": [
      "Adventure",
      "Sci-Fi"
    ],
    "certificate": "PG_13",
    "date": "2009-05-04T10:29:29+05:30",
    "actor": "Sam Neill",
    "id": 245
  },
  {
    "name": "Big Fish",
    "outline": "A son tries to learn more about his dying father by reliving stories and myths he told about his life.",
    "rating": 8.0,
    "director": "Tim Burton",
    "year": 2003,
    "stars": [
      "Ewan McGregor",
      "Albert Finney",
      "Billy Crudup"
    ],
    "runtime": 125,
    "genre": [
      "Adventure",
      "Drama",
      "Fantasy"
    ],
    "certificate": "PG_13",
    "date": "1988-02-08T10:29:29+05:30",
    "actor": "Ewan McGregor",
    "id": 246
  },
  {
    "name": "Rain Man",
    "outline": "Selfish yuppie Charlie Babbitt's father left a fortune to his savant brother Raymond and a pittance to Charlie; they travel cross-country.",
    "rating": 8.0,
    "director": "Barry Levinson",
    "year": 1988,
    "stars": [
      "Dustin Hoffman",
      "Tom Cruise",
      "Valeria Golino"
    ],
    "runtime": 133,
    "genre": [
      "Drama"
    ],
    "certificate": "R",
    "date": "1990-11-24T10:29:29+05:30",
    "actor": "Dustin Hoffman",
    "id": 247
  },
  {
    "name": "Mystic River",
    "outline": "With a childhood tragedy that overshadowed their lives, three men are reunited by circumstance when one loses a daughter.",
    "rating": 8.0,
    "director": "Clint Eastwood",
    "year": 2003,
    "stars": [
      "Sean Penn",
      "Tim Robbins",
      "Kevin Bacon"
    ],
    "runtime": 138,
    "genre": [
      "Crime",
      "Drama",
      "Mystery",
      "Thriller"
    ],
    "certificate": "R",
    "date": "1987-03-04T10:29:29+05:30",
    "actor": "Sean Penn",
    "id": 248
  },
  {
    "name": "The Untouchables",
    "outline": "Federal Agent Eliot Ness sets out to stop Al Capone; because of rampant corruption, he assembles a small, hand-picked team.",
    "rating": 8.0,
    "director": "Brian De Palma",
    "year": 1987,
    "stars": [
      "Kevin Costner",
      "Sean Connery",
      "Robert De Niro"
    ],
    "runtime": 119,
    "genre": [
      "Crime",
      "Drama",
      "History",
      "Thriller"
    ],
    "certificate": "R",
    "date": "2001-04-11T10:29:29+05:30",
    "actor": "Kevin Costner",
    "id": 249
  },
  {
    "name": "The Wrestler",
    "outline": "A faded professional wrestler must retire, but finds his quest for a new life outside the ring a dispiriting struggle.",
    "rating": 8.0,
    "director": "Darren Aronofsky",
    "year": 2008,
    "stars": [
      "Mickey Rourke",
      "Marisa Tomei",
      "Evan Rachel Wood"
    ],
    "runtime": 109,
    "genre": [
      "Drama",
      "Romance",
      "Sport"
    ],
    "certificate": "R",
    "date": "1988-04-11T10:29:29+05:30",
    "actor": "Mickey Rourke",
    "id": 250
  }
]
