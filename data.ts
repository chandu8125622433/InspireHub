
import { Category, Quote, Wallpaper } from './types';
import { HeartIcon, BoltIcon, SparklesIcon, FireIcon, BeakerIcon, LeafIcon, RocketLaunchIcon, GlobeAltIcon } from './components/icons/CategoryIcons';

export const CATEGORIES: Category[] = [
  { id: 'cat1', name: 'Motivational', icon: BoltIcon },
  { id: 'cat2', name: 'Love', icon: HeartIcon },
  { id: 'cat3', name: 'Attitude', icon: FireIcon },
  { id: 'cat4', name: 'Wisdom', icon: BeakerIcon },
  { id: 'cat5', name: 'Inspiration', icon: SparklesIcon },
  { id: 'cat6', name: 'Mindfulness', icon: LeafIcon },
  { id: 'cat7', name: 'Ambition', icon: RocketLaunchIcon },
  { id: 'cat8', name: 'Wanderlust', icon: GlobeAltIcon },
];

export const QUOTES: Quote[] = [
  // Motivational
  { id: 'q1', text: "The only way to do great work is to love what you do.", author: "Steve Jobs", categoryId: 'cat1', premium: false },
  { id: 'q2', text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt", categoryId: 'cat1', premium: false },
  { id: 'q3', text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill", categoryId: 'cat1', premium: true },
  { id: 'q4', text: "Act as if what you do makes a difference. It does.", author: "William James", categoryId: 'cat1', premium: false },
  { id: 'q15', text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt", categoryId: 'cat1', premium: false },
  { id: 'q16', text: "It’s hard to beat a person who never gives up.", author: "Babe Ruth", categoryId: 'cat1', premium: true },
  { id: 'q24', text: "What seems to us as bitter trials are often blessings in disguise.", author: "Oscar Wilde", categoryId: 'cat1', premium: false },
  { id: 'q25', text: "The secret of getting ahead is getting started.", author: "Mark Twain", categoryId: 'cat1', premium: false },
  
  // Love
  { id: 'q5', text: "To love and be loved is to feel the sun from both sides.", author: "David Viscott", categoryId: 'cat2', premium: false },
  { id: 'q6', text: "Love is composed of a single soul inhabiting two bodies.", author: "Aristotle", categoryId: 'cat2', premium: false },
  { id: 'q7', text: "The best thing to hold onto in life is each other.", author: "Audrey Hepburn", categoryId: 'cat2', premium: true },
  { id: 'q17', text: "Being deeply loved by someone gives you strength, while loving someone deeply gives you courage.", author: "Lao Tzu", categoryId: 'cat2', premium: false },
  { id: 'q26', text: "You know you're in love when you can't fall asleep because reality is finally better than your dreams.", author: "Dr. Seuss", categoryId: 'cat2', premium: false },
  { id: 'q27', text: "Love does not consist of gazing at each other, but in looking outward together in the same direction.", author: "Antoine de Saint-Exupéry", categoryId: 'cat2', premium: true },

  // Attitude
  { id: 'q8', text: "Your attitude, not your aptitude, will determine your altitude.", author: "Zig Ziglar", categoryId: 'cat3', premium: false },
  { id: 'q9', text: "Weakness of attitude becomes weakness of character.", author: "Albert Einstein", categoryId: 'cat3', premium: true },
  { id: 'q10', text: "A positive attitude causes a chain reaction of positive thoughts, events and outcomes.", author: "Wade Boggs", categoryId: 'cat3', premium: false },
  { id: 'q18', text: "If you don't like something, change it. If you can't change it, change your attitude.", author: "Maya Angelou", categoryId: 'cat3', premium: false },
  { id: 'q19', text: "The only disability in life is a bad attitude.", author: "Scott Hamilton", categoryId: 'cat3', premium: true },
  { id: 'q28', text: "Everything can be taken from a man but one thing: the last of the human freedoms—to choose one’s attitude in any given set of circumstances.", author: "Viktor E. Frankl", categoryId: 'cat3', premium: false },
  
  // Wisdom
  { id: 'q11', text: "The only true wisdom is in knowing you know nothing.", author: "Socrates", categoryId: 'cat4', premium: false },
  { id: 'q12', text: "The journey of a thousand miles begins with a single step.", author: "Lao Tzu", categoryId: 'cat4', premium: false },
  { id: 'q20', text: "The quieter you become, the more you are able to hear.", author: "Rumi", categoryId: 'cat4', premium: true },
  { id: 'q21', text: "Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.", author: "Rumi", categoryId: 'cat4', premium: false },
  { id: 'q29', text: "Count your age by friends, not years. Count your life by smiles, not tears.", author: "John Lennon", categoryId: 'cat4', premium: false },
  { id: 'q30', text: "The fool doth think he is wise, but the wise man knows himself to be a fool.", author: "William Shakespeare", categoryId: 'cat4', premium: true },

  // Inspiration
  { id: 'q13', text: "Either you run the day, or the day runs you.", author: "Jim Rohn", categoryId: 'cat5', premium: false },
  { id: 'q14', text: "I have not failed. I've just found 10,000 ways that won't work.", author: "Thomas A. Edison", categoryId: 'cat5', premium: true },
  { id: 'q22', text: "What you get by achieving your goals is not as important as what you become by achieving your goals.", author: "Zig Ziglar", categoryId: 'cat5', premium: false },
  { id: 'q23', text: "Creativity is intelligence having fun.", author: "Albert Einstein", categoryId: 'cat5', premium: true },
  { id: 'q31', text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe", categoryId: 'cat5', premium: false },
  { id: 'q32', text: "Everything you’ve ever wanted is on the other side of fear.", author: "George Addair", categoryId: 'cat5', premium: false },

  // Mindfulness
  { id: 'q33', text: "The present moment is filled with joy and happiness. If you are attentive, you will see it.", author: "Thich Nhat Hanh", categoryId: 'cat6', premium: false },
  { id: 'q34', text: "Walk as if you are kissing the Earth with your feet.", author: "Thich Nhat Hanh", categoryId: 'cat6', premium: true },
  { id: 'q35', text: "The best way to capture moments is to pay attention. This is how we cultivate mindfulness.", author: "Jon Kabat-Zinn", categoryId: 'cat6', premium: false },
  { id: 'q36', text: "In today's rush, we all think too much, seek too much, want too much and forget about the joy of just being.", author: "Eckhart Tolle", categoryId: 'cat6', premium: false },
  { id: 'q37', text: "Feelings come and go like clouds in a windy sky. Conscious breathing is my anchor.", author: "Thich Nhat Hanh", categoryId: 'cat6', premium: true },
  
  // Ambition
  { id: 'q38', text: "I find that the harder I work, the more luck I seem to have.", author: "Thomas Jefferson", categoryId: 'cat7', premium: false },
  { id: 'q39', text: "The difference between a successful person and others is not a lack of strength, not a lack of knowledge, but rather a lack in will.", author: "Vince Lombardi", categoryId: 'cat7', premium: false },
  { id: 'q40', text: "Ambition is the path to success. Persistence is the vehicle you arrive in.", author: "Bill Bradley", categoryId: 'cat7', premium: true },
  { id: 'q41', text: "Don't be afraid to give up the good to go for the great.", author: "John D. Rockefeller", categoryId: 'cat7', premium: false },
  { id: 'q42', text: "If you're offered a seat on a rocket ship, don't ask what seat! Just get on.", author: "Sheryl Sandberg", categoryId: 'cat7', premium: true },

  // Wanderlust
  { id: 'q43', text: "The world is a book and those who do not travel read only one page.", author: "Saint Augustine", categoryId: 'cat8', premium: false },
  { id: 'q44', text: "Not all those who wander are lost.", author: "J.R.R. Tolkien", categoryId: 'cat8', premium: false },
  { id: 'q45', text: "To travel is to live.", author: "Hans Christian Andersen", categoryId: 'cat8', premium: true },
  { id: 'q46', text: "Take only memories, leave only footprints.", author: "Chief Seattle", categoryId: 'cat8', premium: false },
  { id: 'q47', text: "Jobs fill your pocket, but adventures fill your soul.", author: "Jamie Lyn Beatty", categoryId: 'cat8', premium: true },
];

export const WALLPAPERS: Wallpaper[] = [
  // Motivational
  { id: 'w1', imageUrl: 'https://picsum.photos/id/10/800/1200', categoryId: 'cat1', premium: false },
  { id: 'w2', imageUrl: 'https://picsum.photos/id/1015/800/1200', categoryId: 'cat1', premium: false },
  { id: 'w3', imageUrl: 'https://picsum.photos/id/1018/800/1200', categoryId: 'cat1', premium: true },
  { id: 'w10', imageUrl: 'https://picsum.photos/id/119/800/1200', categoryId: 'cat1', premium: false },
  { id: 'w17', imageUrl: 'https://picsum.photos/id/450/800/1200', categoryId: 'cat1', premium: true },
  { id: 'w18', imageUrl: 'https://picsum.photos/id/141/800/1200', categoryId: 'cat1', premium: false },
  { id: 'w19', imageUrl: 'https://picsum.photos/id/15/800/1200', categoryId: 'cat1', premium: false },
  
  // Love
  { id: 'w4', imageUrl: 'https://picsum.photos/id/1028/800/1200', categoryId: 'cat2', premium: false },
  { id: 'w5', imageUrl: 'https://picsum.photos/id/1040/800/1200', categoryId: 'cat2', premium: true },
  { id: 'w11', imageUrl: 'https://picsum.photos/id/177/800/1200', categoryId: 'cat2', premium: false },
  { id: 'w12', imageUrl: 'https://picsum.photos/id/326/800/1200', categoryId: 'cat2', premium: true },
  { id: 'w20', imageUrl: 'https://picsum.photos/id/314/800/1200', categoryId: 'cat2', premium: false },
  { id: 'w21', imageUrl: 'https://picsum.photos/id/375/800/1200', categoryId: 'cat2', premium: false },

  // Attitude
  { id: 'w6', imageUrl: 'https://picsum.photos/id/1043/800/1200', categoryId: 'cat3', premium: false },
  { id: 'w13', imageUrl: 'https://picsum.photos/id/21/800/1200', categoryId: 'cat3', premium: true },
  { id: 'w22', imageUrl: 'https://picsum.photos/id/13/800/1200', categoryId: 'cat3', premium: false },
  { id: 'w23', imageUrl: 'https://picsum.photos/id/163/800/1200', categoryId: 'cat3', premium: false },

  // Wisdom
  { id: 'w7', imageUrl: 'https://picsum.photos/id/1050/800/1200', categoryId: 'cat4', premium: false },
  { id: 'w14', imageUrl: 'https://picsum.photos/id/249/800/1200', categoryId: 'cat4', premium: false },
  { id: 'w15', imageUrl: 'https://picsum.photos/id/28/800/1200', categoryId: 'cat4', premium: true },
  { id: 'w24', imageUrl: 'https://picsum.photos/id/234/800/1200', categoryId: 'cat4', premium: false },
  
  // Inspiration
  { id: 'w8', imageUrl: 'https://picsum.photos/id/106/800/1200', categoryId: 'cat5', premium: true },
  { id: 'w9', imageUrl: 'https://picsum.photos/id/1060/800/1200', categoryId: 'cat5', premium: false },
  { id: 'w16', imageUrl: 'https://picsum.photos/id/431/800/1200', categoryId: 'cat5', premium: false },
  { id: 'w25', imageUrl: 'https://picsum.photos/id/1074/800/1200', categoryId: 'cat5', premium: true },
  { id: 'w26', imageUrl: 'https://picsum.photos/id/108/800/1200', categoryId: 'cat5', premium: false },
  
  // Mindfulness
  { id: 'w27', imageUrl: 'https://picsum.photos/id/1011/800/1200', categoryId: 'cat6', premium: false },
  { id: 'w28', imageUrl: 'https://picsum.photos/id/116/800/1200', categoryId: 'cat6', premium: true },
  { id: 'w29', imageUrl: 'https://picsum.photos/id/142/800/1200', categoryId: 'cat6', premium: false },
  { id: 'w30', imageUrl: 'https://picsum.photos/id/200/800/1200', categoryId: 'cat6', premium: false },
  { id: 'w31', imageUrl: 'https://picsum.photos/id/219/800/1200', categoryId: 'cat6', premium: true },

  // Ambition
  { id: 'w32', imageUrl: 'https://picsum.photos/id/1075/800/1200', categoryId: 'cat7', premium: false },
  { id: 'w33', imageUrl: 'https://picsum.photos/id/133/800/1200', categoryId: 'cat7', premium: true },
  { id: 'w34', imageUrl: 'https://picsum.photos/id/137/800/1200', categoryId: 'cat7', premium: false },
  { id: 'w35', imageUrl: 'https://picsum.photos/id/180/800/1200', categoryId: 'cat7', premium: false },
  { id: 'w36', imageUrl: 'https://picsum.photos/id/292/800/1200', categoryId: 'cat7', premium: true },
  
  // Wanderlust
  { id: 'w37', imageUrl: 'https://picsum.photos/id/1016/800/1200', categoryId: 'cat8', premium: true },
  { id: 'w38', imageUrl: 'https://picsum.photos/id/1039/800/1200', categoryId: 'cat8', premium: false },
  { id: 'w39', imageUrl: 'https://picsum.photos/id/104/800/1200', categoryId: 'cat8', premium: false },
  { id: 'w40', imageUrl: 'https://picsum.photos/id/1056/800/1200', categoryId: 'cat8', premium: true },
  { id: 'w41', imageUrl: 'https://picsum.photos/id/1062/800/1200', categoryId: 'cat8', premium: false },
];
