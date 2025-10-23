import React, { useState, useEffect, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './needssection.css'

const ORIGINAL_ITEMS = [
    { id: 1, title: "Food Package", urgency: "High", category: "Food", description: "Basic food supplies including rice, pasta, and canned goods.", image: "https://images.pexels.com/photos/1448721/pexels-photo-1448721.jpeg" },
    { id: 2, title: "Clothing Kit", urgency: "Medium", category: "Clothing", description: "New or gently used clothing items for all age groups.", image: "https://images.pexels.com/photos/25856931/pexels-photo-25856931.jpeg" },
    { id: 3, title: "Toiletry Bundle", urgency: "Low", category: "Toiletries", description: "Personal hygiene items such as soap, toothpaste, and shampoo.", image: "https://images.pexels.com/photos/11424755/pexels-photo-11424755.jpeg" },
    { id: 4, title: "Medical Aid Kit", urgency: "High", category: "Medical", description: "Basic first-aid and essential medicines.", image: "https://images.pexels.com/photos/33916269/pexels-photo-33916269.jpeg" },
    { id: 5, title: "School Supplies", urgency: "Low", category: "Education", description: "Notebooks, pens, and backpacks for children in need.", image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80" },
    { id: 6, title: "Shelter Kits", urgency: "High", category: "Housing", description: "Tents and blankets for temporary housing.", image: "https://images.pexels.com/photos/28193559/pexels-photo-28193559.jpeg" },
];

const LOOPED_ITEMS = [
    { ...ORIGINAL_ITEMS[ORIGINAL_ITEMS.length - 1], id: 'clone-last', originalId: 6 }, 
    ...ORIGINAL_ITEMS.map(item => ({ ...item, originalId: item.id })),
    { ...ORIGINAL_ITEMS[0], id: 'clone-first', originalId: 1 }, 
];

const SCROLL_TRANSITION_MS = 400; 
const CARD_WIDTH = 350;
const GAP_SIZE = 64;
const STEP_SIZE = CARD_WIDTH + GAP_SIZE; 
    
const NeedsSection = () => {
    const [basket, setBasket] = useState([]);
    const scrollContainerRef = useRef(null);
    const innerWrapperRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(1); 
    const [isAnimating, setIsAnimating] = useState(false);
    const [isInstantJump, setIsInstantJump] = useState(false);

    const TOTAL_ITEMS = LOOPED_ITEMS.length;
    const FIRST_REAL_INDEX = 1;
    const LAST_REAL_INDEX = TOTAL_ITEMS - 2;


    const addToBasket = (item) => {
        const idToFind = item.originalId || item.id;
        const originalItem = ORIGINAL_ITEMS.find(i => i.id === idToFind);
        if (originalItem && !basket.find((i) => i.id === originalItem.id)) {
            setBasket([...basket, originalItem]);
        }
    };

    const removeFromBasket = (id) => setBasket(basket.filter((i) => i.id !== id));

    const urgencyColor = (level) => {
        switch (level) {
            case "High": return "bg-red-600";
            case "Medium": return "bg-yellow-500";
            case "Low": return "bg-green-600";
            default: return "bg-gray-500";
        }
    };


    const translate = (index, smooth = true) => {
        if (!innerWrapperRef.current) return;

        const targetOffset = index * STEP_SIZE;

        if (smooth) {
            setIsInstantJump(false);
            setIsAnimating(true);
        } else {
            setIsInstantJump(true);
        }

        innerWrapperRef.current.style.transform = `translateX(-${targetOffset}px)`;
        setActiveIndex(index);
    };


    const handleLoopingScroll = (direction) => {
        if (isAnimating) return; 

        let newIndex = activeIndex;

        if (direction === 'next') {
            newIndex = activeIndex + 1;
        } else if (direction === 'prev') {
            newIndex = activeIndex - 1;
        }

        translate(newIndex, true);
        
        if (newIndex === TOTAL_ITEMS - 1) { 
            setTimeout(() => {
                translate(FIRST_REAL_INDEX, false); 
                setIsAnimating(false);
            }, SCROLL_TRANSITION_MS);
        } else if (newIndex === 0) { 
            setTimeout(() => {
                translate(LAST_REAL_INDEX, false); 
                setIsAnimating(false);
            }, SCROLL_TRANSITION_MS);
        } else {
             setTimeout(() => setIsAnimating(false), SCROLL_TRANSITION_MS);
        }
    };


    useEffect(() => {
        if (innerWrapperRef.current) {
            translate(FIRST_REAL_INDEX, false);
        }
    }, []); 

    const centerItem = LOOPED_ITEMS[activeIndex];
    const centerOriginalId = centerItem.originalId;


    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8 relative">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 tracking-tight">
                Urgent Needs
            </h1>

            <div className="w-full max-w-6xl relative overflow-hidden"> 
                <button
                    onClick={() => handleLoopingScroll('prev')}
                    disabled={isAnimating}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-xl text-gray-800 hover:bg-white transition disabled:opacity-50"
                >
                    <FiChevronLeft className="w-6 h-6" />
                </button>

                <button
                    onClick={() => handleLoopingScroll('next')}
                    disabled={isAnimating}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-xl text-gray-800 hover:bg-white transition disabled:opacity-50"
                >
                    <FiChevronRight className="w-6 h-6" />
                </button>

                <div
                    ref={scrollContainerRef}
                    className={`pb-4 fade-mask`}
                >
                    <div 
                        ref={innerWrapperRef}
                        className={`flex gap-16 w-max items-center transition-transform duration-[${SCROLL_TRANSITION_MS}ms] ease-in-out`} 
                        style={{
                            paddingLeft: '337px', 
                            paddingRight: '337px',
                            transition: isInstantJump ? 'none' : `transform ${SCROLL_TRANSITION_MS}ms ease-in-out`
                        }}
                    >
                        {LOOPED_ITEMS.map((item, index) => {
                            const isCenter = item.originalId === centerOriginalId;
                            
                            const scaleClass = isCenter 
                                ? `scale-100 opacity-100 duration-[${SCROLL_TRANSITION_MS}ms]` 
                                : `scale-90 opacity-70 duration-[${SCROLL_TRANSITION_MS}ms]`; 

                            return (
                                <div
                                    key={item.id} 
                                    data-id={item.id}
                                    data-index={index} 
                                    className={`scroll-item relative min-w-[350px] h-[400px] rounded-2xl overflow-hidden shadow-lg group hover:shadow-2xl transition-all ${scaleClass}`}
                                >
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/25 to-transparent flex flex-col justify-end p-5 text-white">
                                        <div className="flex items-center justify-between mb-2">
                                            <h2 className="text-lg font-semibold drop-shadow-md">{item.title}</h2>
                                            <span
                                                className={`text-xs px-2 py-1 rounded-full font-medium ${urgencyColor(item.urgency)}`}
                                            >{item.urgency}</span>
                                        </div>
                                        <p className="text-sm text-gray-200">{item.category}</p>
                                        <p className="text-sm text-gray-100 mt-1">{item.description}</p>
                                        <button
                                            onClick={() => addToBasket(item)}
                                            className="mt-4 bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-lg font-medium"
                                        >Add to Basket</button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            <div className="w-full max-w-5xl bg-white border border-gray-200 shadow rounded-2xl p-6 mt-10">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Track Your Basket</h2>
                {basket.length === 0 ? (
                    <p className="text-gray-500"> \.</p>
                ) : (
                    <table className="w-full border-t border-gray-100">
                        <thead>
                            <tr className="text-gray-600 text-sm">
                                <th className="py-3 text-left">Item</th>
                                <th className="py-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {basket.map((item) => (
                                <tr
                                    key={item.id}
                                    className="border-t border-gray-100 hover:bg-gray-50 transition"
                                >
                                    <td className="py-3 flex items-center gap-2 text-gray-800">
                                        <span
                                            className={`inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white rounded-full ${urgencyColor(item.urgency)}`}
                                        >
                                            {item.urgency[0]}
                                        </span>
                                        {item.title}
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => removeFromBasket(item.id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 text-sm rounded-lg transition"
                                        >Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default NeedsSection;