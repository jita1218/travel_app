// src/data/packages.js
import bronzeImg from '../assets/p1.jpg';
import silverImg from '../assets/p2.jpg';
import goldImg from '../assets/p3.jpg';
import platinumImg from '../assets/p4.jpg';

const packages = [
    {
        name: 'Bronze',
        features: [
            '1 Star Hotel / Homestay',
            '3 Nights in Shillong or Cherrapunji',
            'Local Sightseeing Tour',
            'Friendly Local Guide',
            '24/7 Customer Support',
        ],
        image: bronzeImg,
    },
    {
        name: 'Silver',
        features: [
            '2 Star Hotel / Campsite',
            '5 Nights in Kaziranga or Ziro',
            'Jungle Safari or Tribal Village Visit',
            'Professional Tour Guide',
            '24/7 Customer Support',
        ],
        image: silverImg,
    },
    {
        name: 'Gold',
        features: [
            '3 Star Hotel + Eco Camp',
            '7 Nights in Tawang, Sikkim & Meghalaya',
            'Breakfast and Dinner Included',
            'Cultural Show or Local Festival Tour',
            'Experienced Local Guide',
            '24/7 Customer Support',
        ],
        image: goldImg,
    },
    {
        name: 'Platinum',
        features: [
            '5 Star Resort + Premium Camp',
            '10 Nights across Nagaland, Arunachal & Assam',
            'All Meals Included (B/L/D)',
            'Bonfire & Adventure Activities',
            'Free Photo & Drone Session',
            'Private Tour Guide',
            '24/7 VIP Assistance',
        ],
        image: platinumImg,
    },
];

export default packages;
