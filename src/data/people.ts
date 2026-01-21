import type { Person } from '@/types/game';

export const people: Person[] = [
  // ========== CHEMISTRY SCIENTISTS ==========
  { id: 'curie', name: 'Marie Curie', roles: ['chemist', 'physicist', 'scientist', 'nobel_prize_winner'], country: 'Poland', company: null, difficulty: 1 },
  { id: 'mendeleev', name: 'Dmitri Mendeleev', roles: ['chemist'], country: 'Russia', company: null, difficulty: 2 },
  { id: 'lavoisier', name: 'Antoine Lavoisier', roles: ['chemist'], country: 'France', company: null, difficulty: 2 },
  { id: 'linus-pauling', name: 'Linus Pauling', roles: ['chemist', 'nobel_prize_winner'], country: 'USA', company: null, difficulty: 2 },
  { id: 'curie-pierre', name: 'Pierre Curie', roles: ['chemist', 'physicist', 'nobel_prize_winner'], country: 'France', company: null, difficulty: 2 },
  { id: 'avogadro', name: 'Amedeo Avogadro', roles: ['chemist'], country: 'Italy', company: null, difficulty: 3 },
  { id: 'dalton', name: 'John Dalton', roles: ['chemist'], country: 'United Kingdom', company: null, difficulty: 3 },
  { id: 'boyle', name: 'Robert Boyle', roles: ['chemist'], country: 'Ireland', company: null, difficulty: 3 },
  { id: 'priestley', name: 'Joseph Priestley', roles: ['chemist'], country: 'United Kingdom', company: null, difficulty: 3 },
  { id: 'faraday-chem', name: 'Michael Faraday', roles: ['chemist', 'physicist'], country: 'United Kingdom', company: null, difficulty: 2 },

  // ========== PHYSICS SCIENTISTS ==========
  { id: 'einstein', name: 'Albert Einstein', roles: ['physicist', 'scientist', 'nobel_prize_winner'], country: 'Germany', company: null, difficulty: 1 },
  { id: 'newton', name: 'Isaac Newton', roles: ['physicist', 'mathematician', 'scientist'], country: 'United Kingdom', company: null, difficulty: 1 },
  { id: 'tesla', name: 'Nikola Tesla', roles: ['physicist', 'scientist'], country: 'Serbia', company: null, difficulty: 1 },
  { id: 'hawking', name: 'Stephen Hawking', roles: ['physicist', 'scientist'], country: 'United Kingdom', company: null, difficulty: 1 },
  { id: 'bohr', name: 'Niels Bohr', roles: ['physicist', 'scientist', 'nobel_prize_winner'], country: 'Denmark', company: null, difficulty: 2 },
  { id: 'rutherford', name: 'Ernest Rutherford', roles: ['physicist', 'scientist', 'nobel_prize_winner'], country: 'New Zealand', company: null, difficulty: 2 },
  { id: 'schrodinger', name: 'Erwin Schrödinger', roles: ['physicist', 'scientist', 'nobel_prize_winner'], country: 'Austria', company: null, difficulty: 2 },
  { id: 'heisenberg', name: 'Werner Heisenberg', roles: ['physicist', 'scientist', 'nobel_prize_winner'], country: 'Germany', company: null, difficulty: 2 },
  { id: 'feynman', name: 'Richard Feynman', roles: ['physicist', 'scientist', 'nobel_prize_winner'], country: 'USA', company: null, difficulty: 1 },
  { id: 'galileo', name: 'Galileo Galilei', roles: ['physicist', 'scientist'], country: 'Italy', company: null, difficulty: 2 },
  { id: 'maxwell', name: 'James Clerk Maxwell', roles: ['physicist'], country: 'United Kingdom', company: null, difficulty: 2 },
  { id: 'planck', name: 'Max Planck', roles: ['physicist', 'nobel_prize_winner'], country: 'Germany', company: null, difficulty: 2 },
  { id: 'edison', name: 'Thomas Edison', roles: ['physicist', 'scientist'], country: 'USA', company: null, difficulty: 1 },
  { id: 'franklin', name: 'Benjamin Franklin', roles: ['physicist', 'scientist'], country: 'USA', company: null, difficulty: 1 },
  { id: 'marie-sklodowska', name: 'Marie Skłodowska Curie', roles: ['physicist', 'chemist', 'nobel_prize_winner'], country: 'Poland', company: null, difficulty: 1 },

  // ========== MATHEMATICS SCIENTISTS ==========
  { id: 'euclid', name: 'Euclid', roles: ['mathematician'], country: 'Greece', company: null, difficulty: 2 },
  { id: 'archimedes', name: 'Archimedes', roles: ['mathematician'], country: 'Greece', company: null, difficulty: 2 },
  { id: 'pythagoras', name: 'Pythagoras', roles: ['mathematician'], country: 'Greece', company: null, difficulty: 2 },
  { id: 'gauss', name: 'Carl Friedrich Gauss', roles: ['mathematician'], country: 'Germany', company: null, difficulty: 2 },
  { id: 'euler', name: 'Leonhard Euler', roles: ['mathematician'], country: 'Switzerland', company: null, difficulty: 2 },
  { id: 'turing', name: 'Alan Turing', roles: ['mathematician', 'scientist'], country: 'United Kingdom', company: null, difficulty: 1 },
  { id: 'einstein-math', name: 'Albert Einstein', roles: ['mathematician', 'physicist'], country: 'Germany', company: null, difficulty: 1 },
  { id: 'newton-math', name: 'Isaac Newton', roles: ['mathematician', 'physicist'], country: 'United Kingdom', company: null, difficulty: 1 },
  { id: 'hilbert', name: 'David Hilbert', roles: ['mathematician'], country: 'Germany', company: null, difficulty: 3 },
  { id: 'ramanujan', name: 'Srinivasa Ramanujan', roles: ['mathematician'], country: 'India', company: null, difficulty: 2 },
  { id: 'poincare', name: 'Henri Poincaré', roles: ['mathematician'], country: 'France', company: null, difficulty: 3 },
  { id: 'noether', name: 'Emmy Noether', roles: ['mathematician'], country: 'Germany', company: null, difficulty: 3 },

  // ========== PRESIDENTS - USA ==========
  { id: 'washington', name: 'George Washington', roles: ['president'], country: 'USA', company: null, difficulty: 1 },
  { id: 'jefferson', name: 'Thomas Jefferson', roles: ['president'], country: 'USA', company: null, difficulty: 1 },
  { id: 'lincoln', name: 'Abraham Lincoln', roles: ['president'], country: 'USA', company: null, difficulty: 1 },
  { id: 'roosevelt', name: 'Franklin D. Roosevelt', roles: ['president'], country: 'USA', company: null, difficulty: 1 },
  { id: 'roosevelt-t', name: 'Theodore Roosevelt', roles: ['president'], country: 'USA', company: null, difficulty: 1 },
  { id: 'kennedy', name: 'John F. Kennedy', roles: ['president'], country: 'USA', company: null, difficulty: 1 },
  { id: 'reagan', name: 'Ronald Reagan', roles: ['president'], country: 'USA', company: null, difficulty: 1 },
  { id: 'clinton', name: 'Bill Clinton', roles: ['president'], country: 'USA', company: null, difficulty: 1 },
  { id: 'bush-sr', name: 'George H.W. Bush', roles: ['president'], country: 'USA', company: null, difficulty: 1 },
  { id: 'bush-jr', name: 'George W. Bush', roles: ['president'], country: 'USA', company: null, difficulty: 1 },
  { id: 'obama', name: 'Barack Obama', roles: ['president'], country: 'USA', company: null, difficulty: 1 },
  { id: 'trump', name: 'Donald Trump', roles: ['president'], country: 'USA', company: null, difficulty: 1 },
  { id: 'biden', name: 'Joe Biden', roles: ['president'], country: 'USA', company: null, difficulty: 1 },

  // ========== PRESIDENTS - OTHER COUNTRIES ==========
  // Canada
  { id: 'trudeau-canada', name: 'Justin Trudeau', roles: ['prime_minister'], country: 'Canada', company: null, difficulty: 1 },
  { id: 'harper', name: 'Stephen Harper', roles: ['prime_minister'], country: 'Canada', company: null, difficulty: 2 },
  { id: 'chretien', name: 'Jean Chrétien', roles: ['prime_minister'], country: 'Canada', company: null, difficulty: 2 },

  // United Kingdom
  { id: 'churchill', name: 'Winston Churchill', roles: ['prime_minister'], country: 'United Kingdom', company: null, difficulty: 1 },
  { id: 'thatcher', name: 'Margaret Thatcher', roles: ['prime_minister'], country: 'United Kingdom', company: null, difficulty: 1 },
  { id: 'blair', name: 'Tony Blair', roles: ['prime_minister'], country: 'United Kingdom', company: null, difficulty: 1 },
  { id: 'cameron', name: 'David Cameron', roles: ['prime_minister'], country: 'United Kingdom', company: null, difficulty: 1 },
  { id: 'johnson', name: 'Boris Johnson', roles: ['prime_minister'], country: 'United Kingdom', company: null, difficulty: 1 },
  { id: 'sunak', name: 'Rishi Sunak', roles: ['prime_minister'], country: 'United Kingdom', company: null, difficulty: 1 },

  // Germany
  { id: 'merkel', name: 'Angela Merkel', roles: ['prime_minister'], country: 'Germany', company: null, difficulty: 1 },
  { id: 'scholz', name: 'Olaf Scholz', roles: ['prime_minister'], country: 'Germany', company: null, difficulty: 1 },
  { id: 'kohl', name: 'Helmut Kohl', roles: ['prime_minister'], country: 'Germany', company: null, difficulty: 2 },
  { id: 'brandt', name: 'Willy Brandt', roles: ['prime_minister'], country: 'Germany', company: null, difficulty: 2 },

  // France
  { id: 'macron', name: 'Emmanuel Macron', roles: ['president'], country: 'France', company: null, difficulty: 1 },
  { id: 'hollande', name: 'François Hollande', roles: ['president'], country: 'France', company: null, difficulty: 2 },
  { id: 'sarkozy', name: 'Nicolas Sarkozy', roles: ['president'], country: 'France', company: null, difficulty: 2 },
  { id: 'chirac', name: 'Jacques Chirac', roles: ['president'], country: 'France', company: null, difficulty: 2 },
  { id: 'mitterrand', name: 'François Mitterrand', roles: ['president'], country: 'France', company: null, difficulty: 2 },
  { id: 'de-gaulle', name: 'Charles de Gaulle', roles: ['president'], country: 'France', company: null, difficulty: 1 },

  // Australia
  { id: 'albanese', name: 'Anthony Albanese', roles: ['prime_minister'], country: 'Australia', company: null, difficulty: 1 },
  { id: 'morrison', name: 'Scott Morrison', roles: ['prime_minister'], country: 'Australia', company: null, difficulty: 1 },
  { id: 'turnbull', name: 'Malcolm Turnbull', roles: ['prime_minister'], country: 'Australia', company: null, difficulty: 2 },
  { id: 'abbott', name: 'Tony Abbott', roles: ['prime_minister'], country: 'Australia', company: null, difficulty: 2 },
  { id: 'rudd', name: 'Kevin Rudd', roles: ['prime_minister'], country: 'Australia', company: null, difficulty: 2 },
  { id: 'howard', name: 'John Howard', roles: ['prime_minister'], country: 'Australia', company: null, difficulty: 2 },

  // India
  { id: 'modi', name: 'Narendra Modi', roles: ['prime_minister'], country: 'India', company: null, difficulty: 1 },
  { id: 'singh', name: 'Manmohan Singh', roles: ['prime_minister'], country: 'India', company: null, difficulty: 2 },
  { id: 'gandhi-i', name: 'Indira Gandhi', roles: ['prime_minister'], country: 'India', company: null, difficulty: 1 },
  { id: 'nehru', name: 'Jawaharlal Nehru', roles: ['prime_minister'], country: 'India', company: null, difficulty: 1 },
  { id: 'rajiv-gandhi', name: 'Rajiv Gandhi', roles: ['prime_minister'], country: 'India', company: null, difficulty: 2 },

  // China
  { id: 'xi-jinping', name: 'Xi Jinping', roles: ['president'], country: 'China', company: null, difficulty: 1 },
  { id: 'hu-jintao', name: 'Hu Jintao', roles: ['president'], country: 'China', company: null, difficulty: 2 },
  { id: 'jiang-zemin', name: 'Jiang Zemin', roles: ['president'], country: 'China', company: null, difficulty: 2 },
  { id: 'deng-xiaoping', name: 'Deng Xiaoping', roles: ['president'], country: 'China', company: null, difficulty: 1 },
  { id: 'mao-zedong', name: 'Mao Zedong', roles: ['president'], country: 'China', company: null, difficulty: 1 },

  // Japan
  { id: 'kishida', name: 'Fumio Kishida', roles: ['prime_minister'], country: 'Japan', company: null, difficulty: 1 },
  { id: 'abe', name: 'Shinzo Abe', roles: ['prime_minister'], country: 'Japan', company: null, difficulty: 1 },
  { id: 'suga', name: 'Yoshihide Suga', roles: ['prime_minister'], country: 'Japan', company: null, difficulty: 2 },

  // Brazil
  { id: 'lula', name: 'Luiz Inácio Lula da Silva', roles: ['president'], country: 'Brazil', company: null, difficulty: 1 },
  { id: 'bolsonaro', name: 'Jair Bolsonaro', roles: ['president'], country: 'Brazil', company: null, difficulty: 1 },
  { id: 'rousseff', name: 'Dilma Rousseff', roles: ['president'], country: 'Brazil', company: null, difficulty: 2 },

  // Russia
  { id: 'putin', name: 'Vladimir Putin', roles: ['president'], country: 'Russia', company: null, difficulty: 1 },
  { id: 'medvedev', name: 'Dmitry Medvedev', roles: ['president'], country: 'Russia', company: null, difficulty: 2 },
  { id: 'yeltsin', name: 'Boris Yeltsin', roles: ['president'], country: 'Russia', company: null, difficulty: 2 },
  { id: 'gorbachev', name: 'Mikhail Gorbachev', roles: ['president'], country: 'Russia', company: null, difficulty: 1 },

  // South Korea
  { id: 'yoon', name: 'Yoon Suk-yeol', roles: ['president'], country: 'South Korea', company: null, difficulty: 1 },
  { id: 'moon', name: 'Moon Jae-in', roles: ['president'], country: 'South Korea', company: null, difficulty: 1 },

  // Mexico
  { id: 'lopez-obrador', name: 'Andrés Manuel López Obrador', roles: ['president'], country: 'Mexico', company: null, difficulty: 1 },

  // Italy
  { id: 'meloni', name: 'Giorgia Meloni', roles: ['prime_minister'], country: 'Italy', company: null, difficulty: 1 },
  { id: 'draghi', name: 'Mario Draghi', roles: ['prime_minister'], country: 'Italy', company: null, difficulty: 1 },

  // Spain
  { id: 'sanchez', name: 'Pedro Sánchez', roles: ['prime_minister'], country: 'Spain', company: null, difficulty: 1 },
  { id: 'aznar', name: 'José María Aznar', roles: ['prime_minister'], country: 'Spain', company: null, difficulty: 2 },

  // South Africa
  { id: 'mandela', name: 'Nelson Mandela', roles: ['president', 'nobel_prize_winner'], country: 'South Africa', company: null, difficulty: 1 },
  { id: 'zuma', name: 'Jacob Zuma', roles: ['president'], country: 'South Africa', company: null, difficulty: 2 },
  { id: 'ramaphosa', name: 'Cyril Ramaphosa', roles: ['president'], country: 'South Africa', company: null, difficulty: 2 },

  // ========== BUSINESS LEADERS / CEOs ==========
  { id: 'jobs', name: 'Steve Jobs', roles: ['ceo'], country: 'USA', company: 'Apple', difficulty: 1 },
  { id: 'gates', name: 'Bill Gates', roles: ['ceo'], country: 'USA', company: 'Microsoft', difficulty: 1 },
  { id: 'musk', name: 'Elon Musk', roles: ['ceo', 'cto'], country: 'South Africa', company: 'Tesla', difficulty: 1 },
  { id: 'bezos', name: 'Jeff Bezos', roles: ['ceo'], country: 'USA', company: 'Amazon', difficulty: 1 },
  { id: 'zuckerberg', name: 'Mark Zuckerberg', roles: ['ceo'], country: 'USA', company: 'Meta', difficulty: 1 },
  { id: 'cook', name: 'Tim Cook', roles: ['ceo'], country: 'USA', company: 'Apple', difficulty: 1 },
  { id: 'nadella', name: 'Satya Nadella', roles: ['ceo'], country: 'India', company: 'Microsoft', difficulty: 1 },
  { id: 'pichai', name: 'Sundar Pichai', roles: ['ceo'], country: 'India', company: 'Google', difficulty: 1 },
  { id: 'buffett', name: 'Warren Buffett', roles: ['ceo'], country: 'USA', company: 'Berkshire Hathaway', difficulty: 1 },
  { id: 'ma', name: 'Jack Ma', roles: ['ceo'], country: 'China', company: 'Alibaba', difficulty: 1 },
  { id: 'ellison', name: 'Larry Ellison', roles: ['ceo'], country: 'USA', company: 'Oracle', difficulty: 1 },
  { id: 'ballmer', name: 'Steve Ballmer', roles: ['ceo'], country: 'USA', company: 'Microsoft', difficulty: 1 },
  { id: 'page', name: 'Larry Page', roles: ['ceo', 'cto'], country: 'USA', company: 'Google', difficulty: 1 },
  { id: 'brin', name: 'Sergey Brin', roles: ['cto'], country: 'USA', company: 'Google', difficulty: 1 },
  { id: 'dimon', name: 'Jamie Dimon', roles: ['ceo'], country: 'USA', company: 'JPMorgan Chase', difficulty: 1 },
  { id: 'arora', name: 'Nikesh Arora', roles: ['ceo'], country: 'India', company: 'Palo Alto Networks', difficulty: 2 },
  { id: 'ambani', name: 'Mukesh Ambani', roles: ['ceo'], country: 'India', company: 'Reliance', difficulty: 1 },
  { id: 'adani', name: 'Gautam Adani', roles: ['ceo'], country: 'India', company: 'Adani Group', difficulty: 1 },
  { id: 'tata', name: 'Ratan Tata', roles: ['ceo'], country: 'India', company: 'Tata Group', difficulty: 1 },
  { id: 'ma-pony', name: 'Pony Ma', roles: ['ceo'], country: 'China', company: 'Tencent', difficulty: 1 },
  { id: 'yuan', name: 'Eric Yuan', roles: ['ceo'], country: 'China', company: 'Zoom', difficulty: 1 },
  { id: 'hwang', name: 'Jensen Huang', roles: ['ceo'], country: 'Taiwan', company: 'NVIDIA', difficulty: 1 },
  { id: 'nooyi', name: 'Indra Nooyi', roles: ['ceo'], country: 'India', company: 'PepsiCo', difficulty: 1 },
  { id: 'koch', name: 'Charles Koch', roles: ['ceo'], country: 'USA', company: 'Koch Industries', difficulty: 2 },
  { id: 'walton', name: 'Jim Walton', roles: ['ceo'], country: 'USA', company: 'Walmart', difficulty: 2 },
  { id: 'arnault', name: 'Bernard Arnault', roles: ['ceo'], country: 'France', company: 'LVMH', difficulty: 1 },
  { id: 'oracle-larry', name: 'Larry Ellison', roles: ['ceo'], country: 'USA', company: 'Oracle', difficulty: 1 },

  // ========== ACTORS ==========
  { id: 'dicaprio', name: 'Leonardo DiCaprio', roles: ['actor'], country: 'USA', company: null, difficulty: 1 },
  { id: 'pitt', name: 'Brad Pitt', roles: ['actor'], country: 'USA', company: null, difficulty: 1 },
  { id: 'cruise', name: 'Tom Cruise', roles: ['actor'], country: 'USA', company: null, difficulty: 1 },
  { id: 'depp', name: 'Johnny Depp', roles: ['actor'], country: 'USA', company: null, difficulty: 1 },
  { id: 'hanks', name: 'Tom Hanks', roles: ['actor'], country: 'USA', company: null, difficulty: 1 },
  { id: 'willis', name: 'Bruce Willis', roles: ['actor'], country: 'USA', company: null, difficulty: 1 },
  { id: 'stallone', name: 'Sylvester Stallone', roles: ['actor'], country: 'USA', company: null, difficulty: 1 },
  { id: 'schwarzenegger', name: 'Arnold Schwarzenegger', roles: ['actor'], country: 'Austria', company: null, difficulty: 1 },
  { id: 'will-smith', name: 'Will Smith', roles: ['actor'], country: 'USA', company: null, difficulty: 1 },
  { id: 'denzel', name: 'Denzel Washington', roles: ['actor'], country: 'USA', company: null, difficulty: 1 },
  { id: 'keanu', name: 'Keanu Reeves', roles: ['actor'], country: 'Canada', company: null, difficulty: 1 },
  { id: 'hemsworth', name: 'Chris Hemsworth', roles: ['actor'], country: 'Australia', company: null, difficulty: 1 },
  { id: 'evans', name: 'Chris Evans', roles: ['actor'], country: 'USA', company: null, difficulty: 1 },
  { id: 'pratt', name: 'Chris Pratt', roles: ['actor'], country: 'USA', company: null, difficulty: 1 },
  { id: 'robert-downey', name: 'Robert Downey Jr.', roles: ['actor'], country: 'USA', company: null, difficulty: 1 },
  { id: 'hugh-jackman', name: 'Hugh Jackman', roles: ['actor'], country: 'Australia', company: null, difficulty: 1 },
  { id: 'ryan-reynolds', name: 'Ryan Reynolds', roles: ['actor'], country: 'Canada', company: null, difficulty: 1 },
  { id: 'aamir-khan', name: 'Aamir Khan', roles: ['actor'], country: 'India', company: null, difficulty: 1 },
  { id: 'shah-rukh-khan', name: 'Shah Rukh Khan', roles: ['actor'], country: 'India', company: null, difficulty: 1 },
  { id: 'jackie-chan', name: 'Jackie Chan', roles: ['actor'], country: 'China', company: null, difficulty: 1 },

  // ========== ACTRESSES ==========
  { id: 'jolie', name: 'Angelina Jolie', roles: ['actress'], country: 'USA', company: null, difficulty: 1 },
  { id: 'scarlett', name: 'Scarlett Johansson', roles: ['actress'], country: 'USA', company: null, difficulty: 1 },
  { id: 'jennifer-lawrence', name: 'Jennifer Lawrence', roles: ['actress'], country: 'USA', company: null, difficulty: 1 },
  { id: 'emma-watson', name: 'Emma Watson', roles: ['actress'], country: 'United Kingdom', company: null, difficulty: 1 },
  { id: 'meryl', name: 'Meryl Streep', roles: ['actress'], country: 'USA', company: null, difficulty: 1 },
  { id: 'nicole', name: 'Nicole Kidman', roles: ['actress'], country: 'Australia', company: null, difficulty: 1 },
  { id: 'cate', name: 'Cate Blanchett', roles: ['actress'], country: 'Australia', company: null, difficulty: 1 },
  { id: 'natalie', name: 'Natalie Portman', roles: ['actress'], country: 'Israel', company: null, difficulty: 1 },
  { id: 'priyanka-chopra', name: 'Priyanka Chopra', roles: ['actress'], country: 'India', company: null, difficulty: 1 },
  { id: 'deepika-padukone', name: 'Deepika Padukone', roles: ['actress'], country: 'India', company: null, difficulty: 1 },

  // ========== SINGERS / POP STARS ==========
  { id: 'madonna', name: 'Madonna', roles: ['singer'], country: 'USA', company: null, difficulty: 1 },
  { id: 'beyonce', name: 'Beyoncé', roles: ['singer'], country: 'USA', company: null, difficulty: 1 },
  { id: 'taylor-swift', name: 'Taylor Swift', roles: ['singer'], country: 'USA', company: null, difficulty: 1 },
  { id: 'adele', name: 'Adele', roles: ['singer'], country: 'United Kingdom', company: null, difficulty: 1 },
  { id: 'rihanna', name: 'Rihanna', roles: ['singer'], country: 'Barbados', company: null, difficulty: 1 },
  { id: 'justin-bieber', name: 'Justin Bieber', roles: ['singer'], country: 'Canada', company: null, difficulty: 1 },
  { id: 'ed-sheeran', name: 'Ed Sheeran', roles: ['singer'], country: 'United Kingdom', company: null, difficulty: 1 },
  { id: 'bruno-mars', name: 'Bruno Mars', roles: ['singer'], country: 'USA', company: null, difficulty: 1 },
  { id: 'ariana-grande', name: 'Ariana Grande', roles: ['singer'], country: 'USA', company: null, difficulty: 1 },
  { id: 'drake', name: 'Drake', roles: ['singer'], country: 'Canada', company: null, difficulty: 1 },
  { id: 'weeknd', name: 'The Weeknd', roles: ['singer'], country: 'Canada', company: null, difficulty: 1 },
  { id: 'billie-eilish', name: 'Billie Eilish', roles: ['singer'], country: 'USA', company: null, difficulty: 1 },
  { id: 'dua-lipa', name: 'Dua Lipa', roles: ['singer'], country: 'United Kingdom', company: null, difficulty: 1 },
  { id: 'shakira', name: 'Shakira', roles: ['singer'], country: 'Colombia', company: null, difficulty: 1 },
  { id: 'justin-timberlake', name: 'Justin Timberlake', roles: ['singer'], country: 'USA', company: null, difficulty: 1 },
  { id: 'michael-jackson', name: 'Michael Jackson', roles: ['singer'], country: 'USA', company: null, difficulty: 1 },
  { id: 'elvis', name: 'Elvis Presley', roles: ['singer'], country: 'USA', company: null, difficulty: 1 },
  { id: 'beatles-lennon', name: 'John Lennon', roles: ['singer'], country: 'United Kingdom', company: null, difficulty: 1 },
  { id: 'beatles-mccartney', name: 'Paul McCartney', roles: ['singer'], country: 'United Kingdom', company: null, difficulty: 1 },
  { id: 'lady-gaga', name: 'Lady Gaga', roles: ['singer'], country: 'USA', company: null, difficulty: 1 },
  { id: 'katy-perry', name: 'Katy Perry', roles: ['singer'], country: 'USA', company: null, difficulty: 1 },
  { id: 'selena-gomez', name: 'Selena Gomez', roles: ['singer'], country: 'USA', company: null, difficulty: 1 },
  { id: 'post-malone', name: 'Post Malone', roles: ['singer'], country: 'USA', company: null, difficulty: 1 },
  { id: 'bad-bunny', name: 'Bad Bunny', roles: ['singer'], country: 'Puerto Rico', company: null, difficulty: 1 },
  { id: 'ar-rahman', name: 'A.R. Rahman', roles: ['singer'], country: 'India', company: null, difficulty: 1 },
  { id: 'lata-mangeshkar', name: 'Lata Mangeshkar', roles: ['singer'], country: 'India', company: null, difficulty: 1 },

  // ========== SPORTS PLAYERS ==========
  { id: 'messi', name: 'Lionel Messi', roles: ['player'], country: 'Argentina', company: null, difficulty: 1 },
  { id: 'ronaldo', name: 'Cristiano Ronaldo', roles: ['player'], country: 'Portugal', company: null, difficulty: 1 },
  { id: 'neymar', name: 'Neymar', roles: ['player'], country: 'Brazil', company: null, difficulty: 1 },
  { id: 'mbappe', name: 'Kylian Mbappé', roles: ['player'], country: 'France', company: null, difficulty: 1 },
  { id: 'lebron', name: 'LeBron James', roles: ['player'], country: 'USA', company: null, difficulty: 1 },
  { id: 'jordan', name: 'Michael Jordan', roles: ['player'], country: 'USA', company: null, difficulty: 1 },
  { id: 'kobe', name: 'Kobe Bryant', roles: ['player'], country: 'USA', company: null, difficulty: 1 },
  { id: 'federer', name: 'Roger Federer', roles: ['player'], country: 'Switzerland', company: null, difficulty: 1 },
  { id: 'nadal', name: 'Rafael Nadal', roles: ['player'], country: 'Spain', company: null, difficulty: 1 },
  { id: 'djokovic', name: 'Novak Djokovic', roles: ['player'], country: 'Serbia', company: null, difficulty: 1 },
  { id: 'serena', name: 'Serena Williams', roles: ['player'], country: 'USA', company: null, difficulty: 1 },
  { id: 'tiger-woods', name: 'Tiger Woods', roles: ['player'], country: 'USA', company: null, difficulty: 1 },
  { id: 'ali', name: 'Muhammad Ali', roles: ['player'], country: 'USA', company: null, difficulty: 1 },
  { id: 'bolt', name: 'Usain Bolt', roles: ['player'], country: 'Jamaica', company: null, difficulty: 1 },
  { id: 'beckham', name: 'David Beckham', roles: ['captain'], country: 'United Kingdom', company: null, difficulty: 1 },
  { id: 'zidane', name: 'Zinedine Zidane', roles: ['captain'], country: 'France', company: null, difficulty: 1 },
  { id: 'pele', name: 'Pelé', roles: ['captain'], country: 'Brazil', company: null, difficulty: 1 },
  { id: 'maradona', name: 'Diego Maradona', roles: ['captain'], country: 'Argentina', company: null, difficulty: 1 },
  { id: 'rooney', name: 'Wayne Rooney', roles: ['captain'], country: 'United Kingdom', company: null, difficulty: 1 },
  { id: 'kohli', name: 'Virat Kohli', roles: ['captain'], country: 'India', company: null, difficulty: 1 },
  { id: 'dhoni', name: 'MS Dhoni', roles: ['captain'], country: 'India', company: null, difficulty: 1 },
  { id: 'sachin', name: 'Sachin Tendulkar', roles: ['player'], country: 'India', company: null, difficulty: 1 },

  // ========== NOBEL PRIZE WINNERS ==========
  { id: 'mother-teresa', name: 'Mother Teresa', roles: ['nobel_prize_winner'], country: 'India', company: null, difficulty: 1 },
  { id: 'gandhi', name: 'Mahatma Gandhi', roles: ['nobel_prize_winner'], country: 'India', company: null, difficulty: 1 },
  { id: 'king', name: 'Martin Luther King Jr.', roles: ['nobel_prize_winner'], country: 'USA', company: null, difficulty: 1 },
  { id: 'dalai-lama', name: 'Dalai Lama', roles: ['nobel_prize_winner'], country: 'Tibet', company: null, difficulty: 1 },
  { id: 'obama-nobel', name: 'Barack Obama', roles: ['president', 'nobel_prize_winner'], country: 'USA', company: null, difficulty: 1 },
  { id: 'malala', name: 'Malala Yousafzai', roles: ['nobel_prize_winner'], country: 'Pakistan', company: null, difficulty: 1 },
  { id: 'gorbachev-nobel', name: 'Mikhail Gorbachev', roles: ['president', 'nobel_prize_winner'], country: 'Russia', company: null, difficulty: 1 },

  // ========== ADDITIONAL COUNTRIES - MORE PRESIDENTS/PMs ==========
  // Indonesia
  { id: 'widodo', name: 'Joko Widodo', roles: ['president'], country: 'Indonesia', company: null, difficulty: 1 },
  { id: 'suharto', name: 'Suharto', roles: ['president'], country: 'Indonesia', company: null, difficulty: 2 },

  // Turkey
  { id: 'erdogan', name: 'Recep Tayyip Erdoğan', roles: ['president'], country: 'Turkey', company: null, difficulty: 1 },

  // Saudi Arabia
  { id: 'salman', name: 'Salman bin Abdulaziz', roles: ['president'], country: 'Saudi Arabia', company: null, difficulty: 1 },
  { id: 'mohammed-bin-salman', name: 'Mohammed bin Salman', roles: ['president'], country: 'Saudi Arabia', company: null, difficulty: 1 },

  // Egypt
  { id: 'sisi', name: 'Abdel Fattah el-Sisi', roles: ['president'], country: 'Egypt', company: null, difficulty: 1 },

  // Pakistan
  { id: 'imran-khan', name: 'Imran Khan', roles: ['prime_minister'], country: 'Pakistan', company: null, difficulty: 1 },
  { id: 'bhutto', name: 'Benazir Bhutto', roles: ['prime_minister'], country: 'Pakistan', company: null, difficulty: 1 },

  // Bangladesh
  { id: 'hasina', name: 'Sheikh Hasina', roles: ['prime_minister'], country: 'Bangladesh', company: null, difficulty: 1 },

  // Thailand
  { id: 'thaksin', name: 'Thaksin Shinawatra', roles: ['prime_minister'], country: 'Thailand', company: null, difficulty: 2 },

  // Philippines
  { id: 'marcos', name: 'Ferdinand Marcos Jr.', roles: ['president'], country: 'Philippines', company: null, difficulty: 1 },
  { id: 'duterte', name: 'Rodrigo Duterte', roles: ['president'], country: 'Philippines', company: null, difficulty: 1 },

  // Vietnam
  { id: 'ho-chi-minh', name: 'Ho Chi Minh', roles: ['president'], country: 'Vietnam', company: null, difficulty: 1 },

  // Nigeria
  { id: 'buhari', name: 'Muhammadu Buhari', roles: ['president'], country: 'Nigeria', company: null, difficulty: 1 },
  { id: 'tinubu', name: 'Bola Tinubu', roles: ['president'], country: 'Nigeria', company: null, difficulty: 1 },

  // Kenya
  { id: 'kenyatta', name: 'Uhuru Kenyatta', roles: ['president'], country: 'Kenya', company: null, difficulty: 1 },
  { id: 'ruto', name: 'William Ruto', roles: ['president'], country: 'Kenya', company: null, difficulty: 1 },

  // Argentina
  { id: 'fernandez', name: 'Alberto Fernández', roles: ['president'], country: 'Argentina', company: null, difficulty: 1 },
  { id: 'peron', name: 'Juan Perón', roles: ['president'], country: 'Argentina', company: null, difficulty: 2 },

  // Chile
  { id: 'boric', name: 'Gabriel Boric', roles: ['president'], country: 'Chile', company: null, difficulty: 1 },
  { id: 'pinochet', name: 'Augusto Pinochet', roles: ['president'], country: 'Chile', company: null, difficulty: 2 },

  // Colombia
  { id: 'petro', name: 'Gustavo Petro', roles: ['president'], country: 'Colombia', company: null, difficulty: 1 },

  // Poland
  { id: 'duda', name: 'Andrzej Duda', roles: ['president'], country: 'Poland', company: null, difficulty: 1 },
  { id: 'tusk', name: 'Donald Tusk', roles: ['prime_minister'], country: 'Poland', company: null, difficulty: 1 },

  // Netherlands
  { id: 'rutte', name: 'Mark Rutte', roles: ['prime_minister'], country: 'Netherlands', company: null, difficulty: 1 },

  // Sweden
  { id: 'kristersson', name: 'Ulf Kristersson', roles: ['prime_minister'], country: 'Sweden', company: null, difficulty: 1 },

  // Norway
  { id: 'stoltenberg', name: 'Jens Stoltenberg', roles: ['prime_minister'], country: 'Norway', company: null, difficulty: 1 },

  // Denmark
  { id: 'frederiksen', name: 'Mette Frederiksen', roles: ['prime_minister'], country: 'Denmark', company: null, difficulty: 1 },

  // Israel
  { id: 'netanyahu', name: 'Benjamin Netanyahu', roles: ['prime_minister'], country: 'Israel', company: null, difficulty: 1 },
  { id: 'ben-gurion', name: 'David Ben-Gurion', roles: ['prime_minister'], country: 'Israel', company: null, difficulty: 2 },

  // Iran
  { id: 'khamenei', name: 'Ali Khamenei', roles: ['president'], country: 'Iran', company: null, difficulty: 1 },

  // UAE
  { id: 'sheikh-zayed', name: 'Sheikh Zayed', roles: ['president'], country: 'UAE', company: null, difficulty: 1 },
  { id: 'mohammed-bin-zayed', name: 'Mohammed bin Zayed', roles: ['president'], country: 'UAE', company: null, difficulty: 1 },

  // ========== MORE BUSINESS LEADERS ==========
  { id: 'soros', name: 'George Soros', roles: ['ceo'], country: 'Hungary', company: 'Soros Fund Management', difficulty: 1 },
  { id: 'bernard-arnault', name: 'Bernard Arnault', roles: ['ceo'], country: 'France', company: 'LVMH', difficulty: 1 },
  { id: 'amazon-jeff', name: 'Jeff Bezos', roles: ['ceo'], country: 'USA', company: 'Amazon', difficulty: 1 },
  { id: 'spacex-musk', name: 'Elon Musk', roles: ['ceo'], country: 'USA', company: 'SpaceX', difficulty: 1 },
  { id: 'reed-hastings', name: 'Reed Hastings', roles: ['ceo'], country: 'USA', company: 'Netflix', difficulty: 1 },
  { id: 'reed-hoffman', name: 'Reid Hoffman', roles: ['ceo'], country: 'USA', company: 'LinkedIn', difficulty: 1 },
  { id: 'brian-chesky', name: 'Brian Chesky', roles: ['ceo'], country: 'USA', company: 'Airbnb', difficulty: 1 },
  { id: 'travis-kalanick', name: 'Travis Kalanick', roles: ['ceo'], country: 'USA', company: 'Uber', difficulty: 1 },
  { id: 'jack-dorsey', name: 'Jack Dorsey', roles: ['ceo'], country: 'USA', company: 'Twitter', difficulty: 1 },
  { id: 'evan-williams', name: 'Evan Williams', roles: ['ceo'], country: 'USA', company: 'Medium', difficulty: 2 },
  { id: 'drew-houston', name: 'Drew Houston', roles: ['ceo'], country: 'USA', company: 'Dropbox', difficulty: 2 },
  { id: 'daniel-ek', name: 'Daniel Ek', roles: ['ceo'], country: 'Sweden', company: 'Spotify', difficulty: 1 },
  { id: 'jan-koum', name: 'Jan Koum', roles: ['ceo'], country: 'Ukraine', company: 'WhatsApp', difficulty: 1 },
  { id: 'kevin-systrom', name: 'Kevin Systrom', roles: ['ceo'], country: 'USA', company: 'Instagram', difficulty: 1 },
  { id: 'brian-acton', name: 'Brian Acton', roles: ['ceo'], country: 'USA', company: 'WhatsApp', difficulty: 2 },
  { id: 'travis-cordell', name: 'Travis Cordell', roles: ['ceo'], country: 'USA', company: 'Kalanick', difficulty: 2 },
  { id: 'garrett-camp', name: 'Garrett Camp', roles: ['ceo'], country: 'Canada', company: 'Uber', difficulty: 2 },
  { id: 'ryan-graves', name: 'Ryan Graves', roles: ['ceo'], country: 'USA', company: 'Uber', difficulty: 2 },
  { id: 'dara-khosrowshahi', name: 'Dara Khosrowshahi', roles: ['ceo'], country: 'Iran', company: 'Uber', difficulty: 1 },
  { id: 'emily-weiss', name: 'Emily Weiss', roles: ['ceo'], country: 'USA', company: 'Glossier', difficulty: 2 },
  { id: 'whitney-wolfe', name: 'Whitney Wolfe Herd', roles: ['ceo'], country: 'USA', company: 'Bumble', difficulty: 1 },
  { id: 'sara-blakely', name: 'Sara Blakely', roles: ['ceo'], country: 'USA', company: 'Spanx', difficulty: 1 },
  { id: 'oprah-winfrey', name: 'Oprah Winfrey', roles: ['ceo'], country: 'USA', company: 'OWN', difficulty: 1 },
  { id: 'howard-schultz', name: 'Howard Schultz', roles: ['ceo'], country: 'USA', company: 'Starbucks', difficulty: 1 },
  { id: 'reed-hastings-netflix', name: 'Reed Hastings', roles: ['ceo'], country: 'USA', company: 'Netflix', difficulty: 1 },

  // ========== MORE SCIENTISTS ==========
  { id: 'darwin-charles', name: 'Charles Darwin', roles: ['scientist'], country: 'United Kingdom', company: null, difficulty: 1 },
  { id: 'pasteur-louis', name: 'Louis Pasteur', roles: ['scientist'], country: 'France', company: null, difficulty: 2 },
  { id: 'franklin-benjamin', name: 'Benjamin Franklin', roles: ['scientist'], country: 'USA', company: null, difficulty: 1 },
  { id: 'goodall', name: 'Jane Goodall', roles: ['scientist'], country: 'United Kingdom', company: null, difficulty: 1 },
  { id: 'sagan', name: 'Carl Sagan', roles: ['scientist'], country: 'USA', company: null, difficulty: 1 },
  { id: 'oppenheimer', name: 'J. Robert Oppenheimer', roles: ['scientist'], country: 'USA', company: null, difficulty: 1 },
  { id: 'teller', name: 'Edward Teller', roles: ['scientist'], country: 'Hungary', company: null, difficulty: 2 },
  { id: 'chandrasekhar', name: 'Subrahmanyan Chandrasekhar', roles: ['scientist', 'nobel_prize_winner'], country: 'India', company: null, difficulty: 2 },
  { id: 'bose', name: 'Satyendra Nath Bose', roles: ['scientist'], country: 'India', company: null, difficulty: 2 },
  { id: 'crick', name: 'Francis Crick', roles: ['scientist', 'nobel_prize_winner'], country: 'United Kingdom', company: null, difficulty: 2 },
  { id: 'watson', name: 'James Watson', roles: ['scientist', 'nobel_prize_winner'], country: 'USA', company: null, difficulty: 2 },
  { id: 'franklin-rosalind', name: 'Rosalind Franklin', roles: ['scientist'], country: 'United Kingdom', company: null, difficulty: 2 },
  { id: 'salk', name: 'Jonas Salk', roles: ['scientist'], country: 'USA', company: null, difficulty: 2 },
  { id: 'sabin', name: 'Albert Sabin', roles: ['scientist'], country: 'Poland', company: null, difficulty: 2 },
  { id: 'fleming', name: 'Alexander Fleming', roles: ['scientist', 'nobel_prize_winner'], country: 'United Kingdom', company: null, difficulty: 2 },
  { id: 'hooke', name: 'Robert Hooke', roles: ['scientist'], country: 'United Kingdom', company: null, difficulty: 3 },
  { id: 'darwin-charles-more', name: 'Charles Darwin', roles: ['scientist'], country: 'United Kingdom', company: null, difficulty: 1 },

  // ========== MORE ACTORS/ACTRESSES ==========
  { id: 'ryan-gosling', name: 'Ryan Gosling', roles: ['actor'], country: 'Canada', company: null, difficulty: 1 },
  { id: 'matt-damon', name: 'Matt Damon', roles: ['actor'], country: 'USA', company: null, difficulty: 1 },
  { id: 'george-clooney', name: 'George Clooney', roles: ['actor'], country: 'USA', company: null, difficulty: 1 },
  { id: 'jason-statham', name: 'Jason Statham', roles: ['actor'], country: 'United Kingdom', company: null, difficulty: 1 },
  { id: 'vijay', name: 'Vijay', roles: ['actor'], country: 'India', company: null, difficulty: 1 },
  { id: 'rajinikanth', name: 'Rajinikanth', roles: ['actor'], country: 'India', company: null, difficulty: 1 },
  { id: 'salman-khan', name: 'Salman Khan', roles: ['actor'], country: 'India', company: null, difficulty: 1 },
  { id: 'donnie-yen', name: 'Donnie Yen', roles: ['actor'], country: 'China', company: null, difficulty: 1 },
  { id: 'jet-li', name: 'Jet Li', roles: ['actor'], country: 'China', company: null, difficulty: 1 },
  { id: 'anne-hathaway', name: 'Anne Hathaway', roles: ['actress'], country: 'USA', company: null, difficulty: 1 },
  { id: 'emma-stone', name: 'Emma Stone', roles: ['actress'], country: 'USA', company: null, difficulty: 1 },
  { id: 'margot-robbie', name: 'Margot Robbie', roles: ['actress'], country: 'Australia', company: null, difficulty: 1 },
  { id: 'gal-gadot', name: 'Gal Gadot', roles: ['actress'], country: 'Israel', company: null, difficulty: 1 },
  { id: 'zendaya', name: 'Zendaya', roles: ['actress'], country: 'USA', company: null, difficulty: 1 },

  // ========== MORE SINGERS ==========
  { id: 'coldplay-chris', name: 'Chris Martin', roles: ['singer'], country: 'United Kingdom', company: null, difficulty: 1 },
  { id: 'bono', name: 'Bono', roles: ['singer'], country: 'Ireland', company: null, difficulty: 1 },
  { id: 'sting', name: 'Sting', roles: ['singer'], country: 'United Kingdom', company: null, difficulty: 1 },
  { id: 'mick-jagger', name: 'Mick Jagger', roles: ['singer'], country: 'United Kingdom', company: null, difficulty: 1 },
  { id: 'freddie-mercury', name: 'Freddie Mercury', roles: ['singer'], country: 'United Kingdom', company: null, difficulty: 1 },
  { id: 'david-bowie', name: 'David Bowie', roles: ['singer'], country: 'United Kingdom', company: null, difficulty: 1 },
  { id: 'johnny-cash', name: 'Johnny Cash', roles: ['singer'], country: 'USA', company: null, difficulty: 1 },
  { id: 'bob-dylan', name: 'Bob Dylan', roles: ['singer'], country: 'USA', company: null, difficulty: 1 },
  { id: 'aretha-franklin', name: 'Aretha Franklin', roles: ['singer'], country: 'USA', company: null, difficulty: 1 },
  { id: 'whitney-houston', name: 'Whitney Houston', roles: ['singer'], country: 'USA', company: null, difficulty: 1 },
  { id: 'celion-dion', name: 'Celine Dion', roles: ['singer'], country: 'Canada', company: null, difficulty: 1 },
  { id: 'justin-timberlake-more', name: 'Justin Timberlake', roles: ['singer'], country: 'USA', company: null, difficulty: 1 },
];
