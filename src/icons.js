const icons = [
  {
    id: 'microscope',
    name: 'Microscope',
    class: 'fas fa-microscope',
    filter: 'Math, Science & Technology',
  },
  {
    id: 'vial',
    name: 'Vial',
    class: 'fas fa-vial',
    filter: 'Math, Science & Technology',
  },
  {
    id: 'atom',
    name: 'Atom',
    class: 'fas fa-atom',
    filter: 'Math, Science & Technology',
  },
  {
    id: 'code',
    name: 'Code',
    class: 'fas fa-code',
    filter: 'Math, Science & Technology',
  },
  {
    id: 'codeBranch',
    name: 'Code Branch',
    class: 'fas fa-code-branch',
    filter: 'Math, Science & Technology',
  },
  {
    id: 'laptopCode',
    name: 'Laptop Code',
    class: 'fas fa-laptop-code',
    filter: 'Math, Science & Technology',
  },
  {
    id: 'film',
    name: 'Film',
    class: 'fas fa-film',
    filter: 'Entertainment',
  },
  {
    id: 'headphones',
    name: 'Headphones',
    class: 'fas fa-headphones',
    filter: 'Entertainment',
  },
  {
    id: 'microphone',
    name: 'Microphone',
    class: 'fas fa-microphone',
    filter: 'Entertainment',
  },
  {
    id: 'video',
    name: 'Video',
    class: 'fas fa-video',
    filter: 'Entertainment',
  },
  {
    id: 'monument',
    name: 'Monument',
    class: 'fas fa-monument',
    filter: 'History, Economy & Politics',
  },
  {
    id: 'landmark',
    name: 'Landmark',
    class: 'fas fa-landmark',
    filter: 'History, Economy & Politics',
  },
  {
    id: 'water',
    name: 'Water',
    class: 'fas fa-water',
    filter: 'Nature',
  },
  {
    id: 'tree',
    name: 'Tree',
    class: 'fas fa-tree',
    filter: 'Nature',
  },
  {
    id: 'running',
    name: 'Running',
    class: 'fas fa-running',
    filter: 'Sports',
  },
  {
    id: 'baseballBall',
    name: 'Baseball Ball',
    class: 'fas fa-baseball-ball',
    filter: 'Sports',
  },
  {
    id: 'tableTennis',
    name: 'Table Tennis',
    class: 'fas fa-table-tennis',
    filter: 'Sports',
  },
  {
    id: 'tv',
    name: 'TV',
    class: 'fas fa-tv',
    filter: 'Entertainment',
  },
  {
    id: 'globe',
    name: 'Globe',
    class: 'fas fa-globe-americas',
    filter: 'History, Economy & Politics',
  },
  {
    id: 'music',
    name: 'Music',
    class: 'fas fa-music',
    filter: 'Music',
  },
  {
    id: 'vinyl',
    name: 'Vinyl',
    class: 'fas fa-record-vinyl',
    filter: 'Entertainment',
  },
  {
    id: 'guitar',
    name: 'Guitar',
    class: 'fas fa-guitar',
    filter: 'Entertainment',
  },
  {
    id: 'drum',
    name: 'Drum',
    class: 'fas fa-drum',
    filter: 'Entertainment',
  },
  {
    id: 'podcast',
    name: 'Podcast',
    class: 'fas fa-podcast',
    filter: 'Entertainment',
  },
  {
    id: 'school',
    name: 'School',
    class: 'fas fa-school',
    filter: 'Education',
  },
  {
    id: 'graduation',
    name: 'Graduation',
    class: 'fas fa-graduation-cap',
    filter: 'Education',
  },
  {
    id: 'bookOpen',
    name: 'Book Open',
    class: 'fas fa-book-open',
    filter: 'Education',
  },
  {
    id: 'theater',
    name: 'Theater',
    class: 'fas fa-theater-masks',
    filter: 'Entertainment',
  },
  {
    id: 'cat',
    name: 'Cat',
    class: 'fas fa-cat',
    filter: 'Animals',
  },
  {
    id: 'dog',
    name: 'Dog',
    class: 'fas fa-dog',
    filter: 'Animals',
  },
  {
    id: 'frog',
    name: 'Frog',
    class: 'fas fa-frog',
    filter: 'Animals',
  },
  {
    id: 'horse',
    name: 'Horse',
    class: 'fas fa-horse',
    filter: 'Animals',
  },
  {
    id: 'fish',
    name: 'Fish',
    class: 'fas fa-fish',
    filter: 'Animals',
  },
  {
    id: 'jediOrder',
    name: 'Jedi Order',
    class: 'fab fa-jedi-order',
    filter: 'Space',
  },
  {
    id: 'meteor',
    name: 'Meteor',
    class: 'fas fa-meteor',
    filter: 'Space',
  },
  {
    id: 'moon',
    name: 'Moon',
    class: 'fas fa-moon',
    filter: 'Space',
  },
  {
    id: 'rocket',
    name: 'Rocket',
    class: 'fas fa-rocket',
    filter: 'Space',
  },
  {
    id: 'satellite',
    name: 'Satellite',
    class: 'fas fa-satellite',
    filter: 'Space',
  },
  {
    id: 'hamburger',
    name: 'Hamburger',
    class: 'fas fa-hamburger',
    filter: 'Food',
  },
  {
    id: 'pepper',
    name: 'Pepper',
    class: 'fas fa-pepper-hot',
    filter: 'Food',
  },
  {
    id: 'pizza',
    name: 'Pizza',
    class: 'fas fa-pizza-slice',
    filter: 'Food',
  },
  {
    id: 'medical',
    name: 'Medical',
    class: 'fas fa-briefcase-medical',
    filter: 'Health & Medicine',
  },
  {
    id: 'campground',
    name: 'Campground',
    class: 'fas fa-campground',
    filter: 'Nature',
  },
  {
    id: 'church',
    name: 'Church',
    class: 'fas fa-church',
    filter: 'Religion',
  },
  {
    id: 'hospital',
    name: 'Hospital',
    class: 'fas fa-hospital',
    filter: 'Health & Medicine',
  },
  {
    id: 'volleyball',
    name: 'Volleyball',
    class: 'fas fa-volleyball-ball',
    filter: 'Sports',
  },
  {
    id: 'hockey',
    name: 'Hockey',
    class: 'fas fa-hockey-puck',
    filter: 'Sports',
  },
  {
    id: 'golf',
    name: 'Golf',
    class: 'fas fa-golf-ball',
    filter: 'Sports',
  },
  {
    id: 'football',
    name: 'Football',
    class: 'fas fa-football-ball',
    filter: 'Sports',
  },
  {
    id: 'basketball',
    name: 'Basketball',
    class: 'fas fa-basketball-ball',
    filter: 'Sports',
  },
  {
    id: 'soccer',
    name: 'Soccer',
    class: 'fas fa-futbol',
    filter: 'Sports',
  },
  {
    id: 'snowboarding',
    name: 'Snowboarding',
    class: 'fas fa-snowboarding',
    filter: 'Sports',
  },
  {
    id: 'robot',
    name: 'Robot',
    class: 'fas fa-robot',
    filter: 'Math, Science & Technology',
  },
  {
    id: 'shuttle',
    name: 'Shuttle',
    class: 'fas fa-space-shuttle',
    filter: 'Space',
  },
  {
    id: 'iceCream',
    name: 'Ice Cream',
    class: 'fas fa-ice-cream',
    filter: 'Food',
  },
  {
    id: 'hotdog',
    name: 'Hotdog',
    class: 'fas fa-hotdog',
    filter: 'Food',
  },
  {
    id: 'sun',
    name: 'Sun',
    class: 'fas fa-sun',
    filter: 'Space',
  },
  {
    id: 'fire',
    name: 'Fire',
    class: 'fas fa-fire',
    filter: 'Nature',
  },
  {
    id: 'compass',
    name: 'Compass',
    class: 'fas fa-compass',
    filter: 'Nature',
  },
  {
    id: 'signs',
    name: 'Signs',
    class: 'fas fa-map-signs',
    filter: 'Nature',
  },
  {
    id: 'hiking',
    name: 'Hiking',
    class: 'fas fa-hiking',
    filter: 'Nature',
  },
  {
    id: 'bus',
    name: 'Bus',
    class: 'fas fa-bus-alt',
    filter: 'Transportation',
  },
  {
    id: 'car',
    name: 'Car',
    class: 'fas fa-car',
    filter: 'Transportation',
  },
  {
    id: 'caravan',
    name: 'Caravan',
    class: 'fas fa-caravan',
    filter: 'Transportation',
  },
  {
    id: 'gasPump',
    name: 'Gas Pump',
    class: 'fas fa-gas-pump',
    filter: 'Transportation',
  },
  {
    id: 'motorcycle',
    name: 'Motorcycle',
    class: 'fas fa-motorcycle',
    filter: 'Transportation',
  },
  {
    id: 'brain',
    name: 'Brain',
    class: 'fas fa-brain',
    filter: 'Health & Medicine',
  },
  {
    id: 'heart',
    name: 'Heart',
    class: 'fas fa-heart',
    filter: 'Health & Medicine',
  },
  {
    id: 'calculator',
    name: 'Calculator',
    class: 'fas fa-calculator',
    filter: 'Math, Science & Technology',
  },
  {
    id: 'skull',
    name: 'Skull & Bones',
    class: 'fas fa-skull-crossbones',
    filter: 'Health & Medicine',
  },
  {
    id: 'money',
    name: 'Money',
    class: 'fas fa-hand-holding-usd',
    filter: 'History, Economy & Politics',
  },
  {
    id: 'piggyBank',
    name: 'Piggy Bank',
    class: 'fas fa-piggy-bank',
    filter: 'History, Economy & Politics',
  },

  // {
  //   id: '',
  //   name: '',
  //   class: 'fas fa-',
  //   filter: '',
  // },

];

icons.sort((a, b) => (a.filter > b.filter ? 1 : -1));

export default icons;
