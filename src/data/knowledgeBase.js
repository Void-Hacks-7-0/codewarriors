export const MEDICAL_KNOWLEDGE = [
    {
        id: "d1",
        name: "Acute Stress / Anxiety",
        keywords: ["stress", "anxiety", "worry", "panic", "nervous", "tension"],
        short_description: "Short-term stress caused by workload, exams, or sleep loss.",
        symptoms: ["insomnia", "racing_heart", "irritability", "headache", "loss_of_appetite"],
        risk_level: "Medium",
        action_self_care: "Practice deep breathing, take a break, and ensure 7+ hours of sleep.",
        action_medical: "Consult a counselor if symptoms persist for >2 weeks.",
        diet_recommendations: {
            eat: ["Dark Chocolate (reduces cortisol)", "Chamomile Tea", "Fatty Fish (Omega-3)", "Nuts & Seeds"],
            avoid: ["Excess Caffeine", "High Sugar Foods", "Alcohol", "Processed Snacks"]
        }
    },
    {
        id: "d2",
        name: "Sleep Debt",
        keywords: ["sleep", "tired", "fatigue", "insomnia", "awake", "rest"],
        short_description: "Chronic lack of sufficient sleep affecting cognitive function.",
        symptoms: ["fatigue", "daytime_sleepiness", "irritability", "difficulty_concentrating"],
        risk_level: "Low",
        action_self_care: "Establish a consistent sleep schedule and limit screen time before bed.",
        action_medical: "See a doctor if you suspect sleep apnea or chronic insomnia.",
        diet_recommendations: {
            eat: ["Kiwi", "Tart Cherry Juice", "Warm Milk", "Almonds"],
            avoid: ["Caffeine after 2 PM", "Heavy Meals before bed", "Spicy Foods"]
        }
    },
    {
        id: "d3",
        name: "Digital Eye Strain",
        keywords: ["eye", "vision", "blur", "screen", "computer", "headache"],
        short_description: "Discomfort caused by prolonged use of digital screens.",
        symptoms: ["dry_eyes", "headache", "blurred_vision", "neck_pain"],
        risk_level: "Low",
        action_self_care: "Follow the 20-20-20 rule: Every 20 mins, look 20 ft away for 20 secs.",
        action_medical: "Visit an optometrist if vision remains blurry.",
        diet_recommendations: {
            eat: ["Carrots (Vitamin A)", "Spinach (Lutein)", "Blueberries", "Walnuts"],
            avoid: ["Dehydrating drinks (Alcohol)", "Excessive Salt"]
        }
    },
    {
        id: "d8",
        name: "Diabetes",
        keywords: ["diabetes", "sugar", "glucose", "insulin", "thirst", "urination"],
        short_description: "Potential indicators of high blood sugar or pre-diabetes.",
        symptoms: ["increased_thirst", "frequent_urination", "fatigue", "blurred_vision", "slow_healing_sores"],
        risk_level: "High",
        action_self_care: "Monitor blood sugar, reduce sugar intake, and exercise daily.",
        action_medical: "Schedule a blood test (HbA1c) with your GP immediately.",
        diet_recommendations: {
            eat: ["Leafy Greens", "Whole Grains", "Fatty Fish", "Beans", "Berries"],
            avoid: ["Sugary Drinks", "White Bread/Rice", "Processed Snacks", "Trans Fats"]
        }
    }
];
