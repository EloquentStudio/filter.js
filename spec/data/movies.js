var movies = [
  {
    'name': 'The Shawshank Redemption',
    'outline': 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    'rating': 9.3,
    'director': 'Frank Darabont',
    'year': 1994,
    'stars': [
      'Tim Robbins',
      'Morgan Freeman',
      'Bob Gunton'
    ],
    'runtime': 142,
    'genre': [
      'Crime',
      'Drama'
    ],
    'certificate': 'R',
    'date': '1974-04-30T10:29:29+05:30',
    'actor': 'Tim Robbins',
    'id': 1
  },
  {
    'name': 'The Godfather',
    'outline': 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    'rating': 9.2,
    'director': 'Francis Ford Coppola',
    'year': 1972,
    'stars': [
      'Marlon Brando',
      'Al Pacino',
      'James Caan'
    ],
    'runtime': 175,
    'genre': [
      'Crime',
      'Drama'
    ],
    'certificate': 'R',
    'date': '1974-07-12T10:29:29+05:30',
    'actor': 'Marlon Brando',
    'id': 2
  },
  {
    'name': 'The Godfather: Part II',
    'outline': 'The early life and career of Vito Corleone in 1920s New York is portrayed while his son, Michael, expands and tightens his grip on his crime syndicate stretching from Lake Tahoe, Nevada to pre-revolution 1958 Cuba.',
    'rating': 9.1,
    'director': 'Francis Ford Coppola',
    'year': 1974,
    'stars': [
      'Al Pacino',
      'Robert De Niro',
      'Robert Duvall'
    ],
    'runtime': 200,
    'genre': [
      'Crime',
      'Drama'
    ],
    'certificate': 'R',
    'date': '1992-08-23T10:29:29+05:30',
    'actor': 'Al Pacino',
    'id': 3
  },
  {
    'name': 'Pulp Fiction',
    'outline': 'The lives of two mob hit men, a boxer, a gangster\'s wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    'rating': 9.0,
    'director': 'Quentin Tarantino',
    'year': 1994,
    'stars': [
      'John Travolta',
      'Uma Thurman',
      'Samuel L. Jackson'
    ],
    'runtime': 154,
    'genre': [
      'Crime',
      'Thriller'
    ],
    'certificate': 'R',
    'date': '1994-02-09T10:29:29+05:30',
    'actor': 'John Travolta',
    'id': 4
  },
  {
    'name': 'The Good, the Bad and the Ugly',
    'outline': 'A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.',
    'rating': 9.0,
    'director': 'Sergio Leone',
    'year': 1966,
    'stars': [
      'Clint Eastwood',
      'Eli Wallach',
      'Lee Van Cleef'
    ],
    'runtime': 161,
    'genre': [
      'Adventure',
      'Western'
    ],
    'certificate': 'TV_14',
    'date': '1980-10-05T10:29:29+05:30',
    'actor': 'Clint Eastwood',
    'id': 5
  },
  {
    'name': 'The Dark Knight',
    'outline': 'When Batman, Gordon and Harvey Dent launch an assault on the mob, they let the clown out of the box, the Joker, bent on turning Gotham on itself and bringing any heroes down to his level.',
    'rating': 9.0,
    'director': 'Christopher Nolan',
    'year': 2008,
    'stars': [
      'Christian Bale',
      'Heath Ledger',
      'Aaron Eckhart'
    ],
    'runtime': 152,
    'genre': [
      'Action',
      'Crime',
      'Drama',
      'Thriller'
    ],
    'certificate': 'PG_13',
    'date': '2002-09-14T10:29:29+05:30',
    'actor': 'Christian Bale',
    'id': 6
  },
  {
    'name': '12 Angry Men',
    'outline': 'A dissenting juror in a murder trial slowly manages to convince the others that the case is not as obviously clear as it seemed in court.',
    'rating': 8.9,
    'director': 'Sidney Lumet',
    'year': 1957,
    'stars': [
      'Henry Fonda',
      'Lee J. Cobb',
      'Martin Balsam'
    ],
    'runtime': 96,
    'genre': [
      'Drama'
    ],
    'certificate': 'APPROVED',
    'date': '1993-11-21T10:29:29+05:30',
    'actor': 'Henry Fonda',
    'id': 7
  },
  {
    'name': 'Schindler\'s List',
    'outline': 'In Poland during World War II, Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.',
    'rating': 8.9,
    'director': 'Steven Spielberg',
    'year': 1993,
    'stars': [
      'Liam Neeson',
      'Ralph Fiennes',
      'Ben Kingsley'
    ],
    'runtime': 195,
    'genre': [
      'Biography',
      'Drama',
      'History',
      'War'
    ],
    'certificate': 'R',
    'date': '1991-03-02T10:29:29+05:30',
    'actor': 'Liam Neeson',
    'id': 8
  },
  {
    'name': 'The Lord of the Rings: The Return of the King',
    'outline': 'Gandalf and Aragorn lead the World of Men against Sauron\'s army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.',
    'rating': 8.9,
    'director': 'Peter Jackson',
    'year': 2003,
    'stars': [
      'Elijah Wood',
      'Viggo Mortensen',
      'Ian McKellen'
    ],
    'runtime': 201,
    'genre': [
      'Action',
      'Adventure',
      'Fantasy'
    ],
    'certificate': 'PG_13',
    'date': '2007-01-29T10:29:29+05:30',
    'actor': 'Elijah Wood',
    'id': 9
  },
  {
    'name': 'Fight Club',
    'outline': 'An insomniac office worker looking for a way to change his life crosses paths with a devil-may-care soap maker and they form an underground fight club that evolves into something much, much more...',
    'rating': 8.9,
    'director': 'David Fincher',
    'year': 1999,
    'stars': [
      'Brad Pitt',
      'Edward Norton',
      'Helena Bonham Carter'
    ],
    'runtime': 139,
    'genre': [
      'Drama'
    ],
    'certificate': 'R',
    'date': '1989-05-06T10:29:29+05:30',
    'actor': 'Brad Pitt',
    'id': 10
  },
  {
    'name': 'Star Wars: Episode V - The Empire Strikes Back',
    'outline': 'As Luke trains with Master Yoda to become a Jedi Knight, his friends evade the Imperial fleet under the command of Darth Vader who is obsessed with turning Skywalker to the Dark Side of the Force.',
    'rating': 8.8,
    'director': 'Irvin Kershner',
    'year': 1980,
    'stars': [
      'Mark Hamill',
      'Harrison Ford',
      'Carrie Fisher'
    ],
    'runtime': 124,
    'genre': [
      'Action',
      'Adventure',
      'Sci-Fi'
    ],
    'certificate': 'PG',
    'date': '1993-02-18T10:29:29+05:30',
    'actor': 'Mark Hamill',
    'id': 11
  },
  {
    'name': 'The Lord of the Rings: The Fellowship of the Ring',
    'outline': 'A meek hobbit of The Shire and eight companions set out on a journey to Mount Doom to destroy the One Ring and the dark lord Sauron.',
    'rating': 8.8,
    'director': 'Peter Jackson',
    'year': 2001,
    'stars': [
      'Elijah Wood',
      'Ian McKellen',
      'Orlando Bloom'
    ],
    'runtime': 178,
    'genre': [
      'Action',
      'Adventure',
      'Fantasy'
    ],
    'certificate': 'PG_13',
    'date': '1984-11-28T10:29:29+05:30',
    'actor': 'Elijah Wood',
    'id': 12
  },
  {
    'name': 'Inception',
    'outline': 'A skilled extractor is offered a chance to regain his old life as payment for a task considered to be impossible.',
    'rating': 8.8,
    'director': 'Christopher Nolan',
    'year': 2010,
    'stars': [
      'Leonardo DiCaprio',
      'Joseph Gordon-Levitt',
      'Ellen Page'
    ],
    'runtime': 148,
    'genre': [
      'Action',
      'Adventure',
      'Mystery',
      'Sci-Fi',
      'Thriller'
    ],
    'certificate': 'PG_13',
    'date': '2009-02-18T10:29:29+05:30',
    'actor': 'Leonardo DiCaprio',
    'id': 13
  },
  {
    'name': 'One Flew Over the Cuckoo\'s Nest',
    'outline': 'Upon admittance to a mental institution, a brash rebel rallies the patients to take on the oppressive head nurse, a woman he views as more dictator than nurse.',
    'rating': 8.8,
    'director': 'Milos Forman',
    'year': 1975,
    'stars': [
      'Jack Nicholson',
      'Louise Fletcher',
      'Michael Berryman'
    ],
    'runtime': 133,
    'genre': [
      'Drama'
    ],
    'certificate': 'R',
    'date': '1962-04-17T10:29:29+05:30',
    'actor': 'Jack Nicholson',
    'id': 14
  },
  {
    'name': 'Seven Samurai',
    'outline': 'A poor village under attack by bandits recruits seven unemployed samurai to help them defend themselves.',
    'rating': 8.8,
    'director': 'Akira Kurosawa',
    'year': 1954,
    'stars': [
      'Toshirô Mifune',
      'Takashi Shimura',
      'Keiko Tsushima'
    ],
    'runtime': 207,
    'genre': [
      'Action',
      'Drama'
    ],
    'certificate': 'UNRATED',
    'date': '2011-01-08T10:29:29+05:30',
    'actor': 'Toshirô Mifune',
    'id': 15
  },
  {
    'name': 'Goodfellas',
    'outline': 'Henry Hill and his friends work their way up through the mob hierarchy.',
    'rating': 8.8,
    'director': 'Martin Scorsese',
    'year': 1990,
    'stars': [
      'Robert De Niro',
      'Ray Liotta',
      'Joe Pesci'
    ],
    'runtime': 146,
    'genre': [
      'Biography',
      'Crime',
      'Drama',
      'Thriller'
    ],
    'certificate': 'R',
    'date': '1980-08-13T10:29:29+05:30',
    'actor': 'Robert De Niro',
    'id': 16
  },
  {
    'name': 'Star Wars',
    'outline': 'Luke Skywalker, a spirited farm boy, joins rebel forces to save Princess Leia from the evil Darth Vader, and the galaxy from the Empire\'s planet-destroying Death Star.',
    'rating': 8.8,
    'director': 'George Lucas',
    'year': 1977,
    'stars': [
      'Mark Hamill',
      'Harrison Ford',
      'Carrie Fisher'
    ],
    'runtime': 121,
    'genre': [
      'Action',
      'Adventure',
      'Fantasy',
      'Sci-Fi'
    ],
    'certificate': 'PG',
    'date': '1978-05-18T10:29:29+05:30',
    'actor': 'Mark Hamill',
    'id': 17
  },
  {
    'name': 'Forrest Gump',
    'outline': 'Forrest Gump, while not intelligent, has accidentally been present at many historic moments, but his true love, Jenny Curran, eludes him.',
    'rating': 8.7,
    'director': 'Robert Zemeckis',
    'year': 1994,
    'stars': [
      'Tom Hanks',
      'Robin Wright',
      'Gary Sinise'
    ],
    'runtime': 142,
    'genre': [
      'Drama',
      'Romance'
    ],
    'certificate': 'PG_13',
    'date': '1981-11-14T10:29:29+05:30',
    'actor': 'Tom Hanks',
    'id': 18
  },
  {
    'name': 'The Lord of the Rings: The Two Towers',
    'outline': 'While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Sauron\'s new ally, Saruman, and his hordes of Isengard.',
    'rating': 8.7,
    'director': 'Peter Jackson',
    'year': 2002,
    'stars': [
      'Elijah Wood',
      'Ian McKellen',
      'Viggo Mortensen'
    ],
    'runtime': 179,
    'genre': [
      'Action',
      'Adventure',
      'Fantasy'
    ],
    'certificate': 'PG_13',
    'date': '1965-05-08T10:29:29+05:30',
    'actor': 'Elijah Wood',
    'id': 19
  },
  {
    'name': 'The Matrix',
    'outline': 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
    'rating': 8.7,
    'director': 'Andy Wachowski',
    'year': 1999,
    'stars': [
      'Lana Wachowski',
      'Keanu Reeves',
      'Laurence Fishburne',
      'Carrie-Anne Moss'
    ],
    'runtime': 136,
    'genre': [
      'Action',
      'Adventure',
      'Sci-Fi'
    ],
    'certificate': 'R',
    'date': '1990-11-29T10:29:29+05:30',
    'actor': 'Lana Wachowski',
    'id': 20
  },
];
