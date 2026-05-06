/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { 
  ChevronDown, 
  Heart, 
  Volume2, 
  VolumeX,
  ArrowLeft
} from 'lucide-react';

// --- Types ---

interface TimelineItem {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
}

interface Person {
  id: string;
  name: string;
  role: string;
  tagline: string;
  description: string;
  memories: TimelineItem[];
  gallery: string[];
  finalNote: string;
  x: number; // position in group photo circle %
  y: number; // position in group photo circle %
}

// --- Mock Data ---

const TIMELINE_DATA: TimelineItem[] = [
  {
    id: '1',
    title: 'The First Hello',
    date: 'September 2021',
    description: 'Freshman orientation. Five strangers sitting in the back row of a lecture hall, wondering if we had made the right choice. Little did we know.',
    image: 'https://images.unsplash.com/photo-1523050853063-880c6934c2a7?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    title: 'First Group Photo',
    date: 'October 2021',
    description: 'The rainy night we finally took a photo together. We looked messy, tired, and perfectly happy.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    title: 'The Midnight Library Run',
    date: 'December 2021',
    description: 'Finals week. More coffee than sleep. We spent more time laughing at bad jokes than studying for Calc II.',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '4',
    title: 'The Summer Road Trip',
    date: 'July 2022',
    description: 'Six hours in a cramped car with no AC. Best weekend of our lives.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '5',
    title: 'Farewell (For Now)',
    date: 'May 2025',
    description: 'Caps in the air, tears in our eyes. Graduation wasn\'t an end, just a change in venue.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800'
  }
];

const PEOPLE: Person[] = [
  {
    id: 'alex',
    name: 'Alex',
    role: 'The Glue',
    tagline: 'Always knew exactly what to say to make the stress disappear.',
    description: 'Alex was the one who kept us organized, though he\'d claim he was the messy one. He had this way of listening like you were the only person in the room.',
    x: 30, y: 35,
    memories: [
      { id: 'a1', title: 'Late Night Talks', date: 'Feb 2022', description: 'Sitting on the rooftop till 3 AM talking about the future.', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400'
    ],
    finalNote: 'Thanks for never letting us give up on the dream.'
  },
  {
    id: 'maya',
    name: 'Maya',
    role: 'The Spirit',
    tagline: 'The loudest laugh and the kindest heart in every room.',
    description: 'Maya brought the energy. If there was a party, she started it. If there was a project, she finished it.',
    x: 55, y: 20,
    memories: [
      { id: 'm1', title: 'The Talent Show', date: 'Mar 2023', description: 'When Maya played the ukelele and we all sang along awkwardly.', image: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&q=80&w=400' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400'
    ],
    finalNote: 'Keep shining, wherever the world takes you.'
  },
  {
    id: 'sam',
    name: 'Sam',
    role: 'The Dreamer',
    tagline: 'Constantly lost in a book or an idea, usually both.',
    description: 'Sam was our resident philosopher. He questioned everything, but never our friendship.',
    x: 75, y: 40,
    memories: [
      { id: 's1', title: 'Library Mornings', date: 'Nov 2022', description: 'Finding Sam asleep in the philosophy section again.', image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=400' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400'
    ],
    finalNote: 'Write that book one day, Sam. We\'ll be first in line.'
  },
  {
    id: 'lena',
    name: 'Lena',
    role: 'The Artist',
    tagline: 'Saw colors and stories where the rest of us saw empty walls.',
    description: 'Lena illustrated our college life. Every sketch in her notebook was a moment we lived.',
    x: 40, y: 70,
    memories: [
      { id: 'l1', title: 'Canvas Day', date: 'Apr 2023', description: 'Painting the mural in the student lounge until dawn.', image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=400' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=400'
    ],
    finalNote: 'Don\'t ever stop seeing the magic in the mundane.'
  },
  {
    id: 'leo',
    name: 'Leo',
    role: 'The Anchor',
    tagline: 'Quiet strength that kept us steady when things got heavy.',
    description: 'Leo didn\'t say much, but he did everything. He was the one who drove the car, brought the snacks, and remembered everyone\'s birthdays.',
    x: 65, y: 65,
    memories: [
      { id: 'le1', title: 'The Move', date: 'Aug 2024', description: 'Leo helping us move into our senior year house with zero complaints.', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=400' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&q=80&w=400'
    ],
    finalNote: 'You held us together more than you know.'
  }
];

const QUOTES = [
  "We didn't realize we were making memories... we just knew we were having fun.",
  "Same people. Same madness. Different memories.",
  "The best part about college wasn't the degree, it was the people who helped me survive getting it.",
  "Some friendships aren't just for a season, they're the whole story."
];

// --- Components ---

const PersonPage = ({ person, onBack }: { person: Person; onBack: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="fixed inset-0 z-50 bg-cream overflow-y-auto"
    >
      <div className="max-w-4xl mx-auto px-6 py-12">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gold hover:text-warm-orange transition-colors mb-12 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium uppercase tracking-widest">Back to the Story</span>
        </button>

        <header className="mb-20 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="serif text-5xl md:text-7xl mb-6"
          >
            {person.name}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gold serif italic text-xl md:text-2xl"
          >
            "{person.tagline}"
          </motion.p>
        </header>

        <section className="mb-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="serif text-3xl mb-6">About {person.name}</h3>
              <p className="text-lg leading-relaxed text-dark-gray/80 italic">
                {person.description}
              </p>
            </div>
            <div className="aspect-square bg-gold/10 rounded-full overflow-hidden border-2 border-gold/20 shadow-inner">
               <img 
                 src={person.gallery[0]} 
                 alt={person.name} 
                 className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                 referrerPolicy="no-referrer"
               />
            </div>
          </div>
        </section>

        <section className="mb-24">
          <h3 className="serif text-3xl mb-12 border-b border-gold/20 pb-4">Personal Memories</h3>
          <div className="space-y-24">
            {person.memories.map((memo, idx) => (
              <motion.div 
                key={memo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
              >
                <div className="w-full md:w-1/2">
                  <div className="rounded-2xl overflow-hidden shadow-2xl relative group">
                    <img 
                      src={memo.image} 
                      alt={memo.title} 
                      className="w-full h-80 object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gold/5" />
                  </div>
                </div>
                <div className="w-full md:w-1/2 space-y-4 text-center md:text-left">
                  <span className="text-xs font-bold text-gold uppercase tracking-[0.3em]">{memo.date}</span>
                  <h4 className="serif text-2xl md:text-3xl">{memo.title}</h4>
                  <p className="text-dark-gray/70 leading-relaxed max-w-md mx-auto md:mx-0">{memo.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <h3 className="serif text-3xl mb-12 text-center">Moments Captured</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {person.gallery.map((img, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="aspect-square overflow-hidden rounded-xl shadow-lg border border-gold/10"
              >
                <img src={img} alt="Moment" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
              </motion.div>
            ))}
          </div>
        </section>

        <footer className="text-center py-20 bg-gold/5 rounded-[40px] mb-20">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="serif text-2xl md:text-3xl max-w-2xl mx-auto px-6 italic text-dark-gray/60"
          >
            "{person.finalNote}"
          </motion.p>
        </footer>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [bgMusic, setBgMusic] = useState(false);
  const [activeQuote, setActiveQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveQuote((prev) => (prev + 1) % QUOTES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-cream">
      <div className="grain" />
      
      {/* Background Music Toggle */}
      <div className="fixed top-6 right-6 z-[60]">
        <button 
          onClick={() => setBgMusic(!bgMusic)}
          className="p-3 rounded-full bg-cream/80 backdrop-blur-sm border border-gold/20 text-gold hover:bg-gold hover:text-white transition-all shadow-sm"
        >
          {bgMusic ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>
      </div>

      <AnimatePresence mode="wait text-dark-gray">
        {selectedPerson ? (
          <PersonPage person={selectedPerson} onBack={() => setSelectedPerson(null)} />
        ) : (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative"
          >
            {/* HERO SECTION */}
            <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
               {/* Blurred Background Background */}
              <div 
                className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center grayscale opacity-20" 
              />
              
              <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h1 className="serif text-5xl md:text-7xl lg:text-8xl mb-8 leading-[1.1] text-dark-gray">
                    Some people don’t just become friends… <br />
                    <span className="italic text-gold block mt-4">they become your entire college life.</span>
                  </h1>
                  <p className="text-sm md:text-base text-dark-gray/40 tracking-[0.4em] uppercase font-medium mt-12 bg-cream/50 inline-block px-4 py-2">
                    Every laugh, every fight, every random moment — somehow, it was always us.
                  </p>
                </motion.div>
              </div>

              <motion.div 
                animate={{ y: [0, 15, 0], opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 text-gold/40 flex flex-col items-center gap-4"
              >
                <div className="w-px h-20 bg-gradient-to-b from-transparent via-gold to-transparent" />
                <span className="text-[10px] uppercase tracking-[0.5em] font-bold">Scroll to Relive</span>
              </motion.div>
            </section>

            {/* TRANSITION TEXT 1 */}
            <section className="py-60 px-6 max-w-4xl mx-auto text-center">
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="serif italic text-3xl md:text-5xl text-warm-orange leading-snug"
              >
                “I don’t remember when it started… <br />but I know it never felt temporary.”
              </motion.p>
            </section>

            {/* ESSAY SECTION */}
            <section className="py-32 px-6 max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-200px" }}
                className="space-y-20 text-2xl md:text-3xl leading-[1.8] serif text-dark-gray/70 text-center"
              >
                <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                  We came from different cities, carrying different dreams and heavier expectations. We were strangers in crowded hallways, looking for ourselves in textbooks and late-night library corners.
                </motion.p>
                <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
                  Then, there was one coffee break that turned into a four-hour debate. There was one rainy walk to the dorms that became a tradition. Slowly, the "I" became "we," and the campus started feeling smaller, friendlier, ours.
                </motion.p>
                <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 }}>
                  They say college is for education. But looking back, my real degree was in late-night philosophy, the art of shared pizza, and learning that some people are meant to walk beside you forever.
                </motion.p>
              </motion.div>
              <div className="h-px bg-gold/30 w-40 mx-auto mt-32" />
            </section>

            {/* QUOTES SECTION */}
            <section className="py-40 bg-gold/5 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-full opacity-10">
                 <div className="serif text-[20vw] absolute -top-[5vw] -left-[5vw] select-none text-gold font-bold">"</div>
                 <div className="serif text-[20vw] absolute -bottom-[15vw] -right-[5vw] select-none text-gold font-bold">"</div>
               </div>
              <div className="max-w-4xl mx-auto px-6 h-60 flex items-center justify-center relative z-10">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeQuote}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className="serif text-3xl md:text-5xl text-center italic text-dark-gray leading-relaxed"
                  >
                    “{QUOTES[activeQuote]}”
                  </motion.p>
                </AnimatePresence>
              </div>
            </section>

            {/* TIMELINE SECTION */}
            <section className="py-48 px-6 bg-cream border-y border-gold/10">
              <div className="max-w-5xl mx-auto">
                <h2 className="serif text-5xl md:text-7xl text-center mb-40 tracking-tighter">The Way Back When</h2>
                
                <div className="relative">
                  {/* Vertical Line Line */}
                  <motion.div 
                    initial={{ height: 0 }}
                    whileInView={{ height: "100%" }}
                    viewport={{ once: false }}
                    transition={{ duration: 2, ease: "linear" }}
                    className="absolute left-1/2 -translate-x-1/2 top-0 w-px bg-gold hidden md:block origin-top" 
                  />
                  
                  <div className="space-y-60">
                    {TIMELINE_DATA.map((item, index) => (
                      <motion.div 
                        key={item.id}
                        initial={{ opacity: 0, y: 80 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className={`flex flex-col md:flex-row items-center gap-16 md:gap-0 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                      >
                        <div className="w-full md:w-[42%]">
                          <motion.div 
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.6 }}
                            className="group relative"
                          >
                             <div className="absolute -inset-4 bg-gold/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
                             <img 
                              src={item.image} 
                              alt={item.title} 
                              className="w-full aspect-[4/3] object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 rounded-3xl shadow-2xl relative z-10"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute top-4 left-4 bg-cream/90 backdrop-blur-md px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold text-gold z-20">
                              {item.date}
                            </div>
                          </motion.div>
                        </div>

                        <div className="w-12 h-12 rounded-full bg-cream border border-gold z-20 hidden md:flex items-center justify-center relative">
                           <motion.div 
                             initial={{ scale: 0 }}
                             whileInView={{ scale: 1 }}
                             className="w-2 h-2 rounded-full bg-gold" 
                           />
                           <div className="absolute inset-0 rounded-full border border-gold/10 animate-ping" />
                        </div>

                        <div className={`w-full md:w-[42%] text-center md:text-left ${index % 2 === 0 ? 'md:pl-16' : 'md:text-right md:pr-16'}`}>
                          <h3 className="serif text-4xl md:text-5xl mb-8 leading-tight">{item.title}</h3>
                          <p className="text-dark-gray/50 leading-relaxed text-xl font-light italic">{item.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* TRANSITION TEXT 2 */}
            <section className="py-60 text-center bg-cream relative">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 3 }}
              >
                <h2 className="serif text-4xl md:text-5xl mb-6 italic text-dark-gray/60 font-light tracking-wide">And through everything…</h2>
                <p className="serif text-6xl md:text-8xl text-gold font-bold tracking-tighter">it was always us.</p>
              </motion.div>
            </section>

            {/* GROUP PHOTO SECTION */}
            <section className="py-48 px-6 bg-cream overflow-hidden">
               <div className="max-w-3xl mx-auto relative group">
                  {/* Decorative Circle */}
                  <div className="absolute inset-0 scale-110 rounded-full border border-dashed border-gold/20 animate-[spin_60s_linear_infinite]" />
                  
                  <div className="aspect-square rounded-full flex items-center justify-center p-4 relative z-10">
                    <motion.div 
                      whileHover={{ scale: 1.01 }}
                      className="w-full h-full rounded-full overflow-hidden shadow-[0_0_80px_-20px_rgba(212,175,55,0.3)] relative"
                    >
                      <img 
                        src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=1200" 
                        alt="Group" 
                        className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-[2000ms] scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gold/10 mix-blend-overlay" />
                    </motion.div>

                    {/* Hotspots */}
                    {PEOPLE.map((person) => (
                      <motion.button
                        key={person.id}
                        onClick={() => setSelectedPerson(person)}
                        style={{ left: `${person.x}%`, top: `${person.y}%` }}
                        whileHover={{ scale: 1.4 }}
                        className="absolute z-20 group/hotspot transform -translate-x-1/2 -translate-y-1/2"
                      >
                        <div className="w-10 h-10 rounded-full bg-cream/90 backdrop-blur-xl flex items-center justify-center border border-gold/30 shadow-2xl group-hover/hotspot:bg-gold group-hover/hotspot:border-gold group-hover/hotspot:text-white transition-all duration-500">
                          <Heart size={14} className="fill-current" />
                        </div>
                        
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 opacity-0 group-hover/hotspot:opacity-100 transition-all duration-500 pointer-events-none scale-90 group-hover/hotspot:scale-100">
                          <div className="bg-dark-gray/90 backdrop-blur-md text-white text-[10px] uppercase tracking-[0.3em] px-4 py-2 rounded-full whitespace-nowrap shadow-xl border border-white/10">
                            {person.name}
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  <div className="text-center mt-24 space-y-6">
                    <p className="serif italic text-2xl text-dark-gray/40">The hearts represent those we can't forget.</p>
                    <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-gold inline-block border-b border-gold/20 pb-2">Click a soul to remember their story</p>
                  </div>
               </div>
            </section>

            {/* FOOTER */}
            <footer className="py-60 text-center relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
              
              <div className="max-w-2xl mx-auto px-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="serif text-4xl md:text-6xl mb-16 leading-tight font-light">
                    No matter where life takes us next… <br />
                    <span className="italic text-gold opacity-80 block mt-4">this will always be my favorite chapter.</span>
                  </h2>
                  
                  <div className="h-px bg-gold/10 w-full mb-16" />

                  <div className="flex justify-center gap-12 text-gold/30 text-[10px] font-bold uppercase tracking-[0.4em] mb-20">
                    <span className="hover:text-gold transition-colors cursor-default">EST 2021</span>
                    <span className="hover:text-gold transition-colors cursor-default">Always Us</span>
                    <span className="hover:text-gold transition-colors cursor-default">Chapter One</span>
                  </div>

                  <p className="text-[9px] uppercase tracking-[0.8em] text-dark-gray/20 font-black">
                    Memoriam Digitum • Collegium Anni
                  </p>
                </motion.div>
              </div>
            </footer>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
