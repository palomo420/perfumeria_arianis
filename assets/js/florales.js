const perfumes = [
    {
        id: 1,
        name: "Sauvage Dior",
        category: "men",
        price: 89.99,
        originalPrice: 109.99,
        discount: true,
        image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1470&q=80",
        rating: 4.8
    },
    {
        id: 2,
        name: "Chanel N°5",
        category: "women",
        price: 120.50,
        originalPrice: 120.50,
        discount: false,
        image: "https://images.unsplash.com/photo-1594035910387-f35580358dc8?auto=format&fit=crop&w=1470&q=80",
        rating: 4.9
    },
    {
        id: 3,
        name: "Acqua di Giò",
        category: "men",
        price: 75.00,
        originalPrice: 95.00,
        discount: true,
        image: "https://images.unsplash.com/photo-1594035910387-f35580358dc8?auto=format&fit=crop&w=1470&q=80",
        rating: 4.7
    },
    {
        id: 4,
        name: "Black Opium",
        category: "women",
        price: 68.99,
        originalPrice: 85.00,
        discount: true,
        image: "https://images.unsplash.com/photo-1594035910387-f35580358dc8?auto=format&fit=crop&w=1470&q=80",
        rating: 4.6
    },
    {
        id: 5,
        name: "CK One",
        category: "unisex",
        price: 45.00,
        originalPrice: 45.00,
        discount: false,
        image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1470&q=80",
        rating: 4.5
    },
    {
        id: 6,
        name: "La Vie Est Belle",
        category: "women",
        price: 99.99,
        originalPrice: 125.00,
        discount: true,
        image: "https://images.unsplash.com/photo-1594035910387-f35580358dc8?auto=format&fit=crop&w=1470&q=80",
        rating: 4.8
    },
    {
        id: 7,
        name: "Bleu de Chanel",
        category: "men",
        price: 110.00,
        originalPrice: 110.00,
        discount: false,
        image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1470&q=80",
        rating: 4.9
    },
    {
        id: 8,
        name: "J'adore Dior",
        category: "women",
        price: 95.50,
        originalPrice: 115.00,
        discount: true,
        image: "https://images.unsplash.com/photo-1594035910387-f35580358dc8?auto=format&fit=crop&w=1470&q=80",
        rating: 4.7
    }
];

function displayPerfumes(filter = 'all') {
    const grid = document.getElementById('perfumes-grid');
    grid.innerHTML = '';

    let filteredPerfumes = perfumes;

    if (filter !== 'all') {
        if (filter === 'discount') {
            filteredPerfumes = perfumes.filter(perfume => perfume.discount);
        } else {
            filteredPerfumes = perfumes.filter(perfume => perfume.category === filter);
        }
    }

    filteredPerfumes.forEach(perfume => {
        const discountPercentage = perfume.discount ?
            Math.round(((perfume.originalPrice - perfume.price) / perfume.originalPrice) * 100) : 0;

        const card = document.createElement('div');
        card.className = 'perfume-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition';
        card.dataset.category = perfume.category;
        card.dataset.discount = perfume.discount;

        card.innerHTML = `
            <div class="relative h-64 overflow-hidden">
                <img src="${perfume.image}" alt="${perfume.name}" class="perfume-image w-full h-full object-cover">
                ${perfume.discount ?
                    `<div class="discount-badge absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        -${discountPercentage}%
                    </div>` : ''}
                <div class="absolute bottom-2 left-2 bg-white bg-opacity-80 text-yellow-600 text-sm font-semibold px-2 py-1 rounded">
                    <i class="fas fa-star"></i> ${perfume.rating}
                </div>
            </div>
            <div class="p-4">
                <h3 class="text-lg font-semibold text-gray-800 mb-1">${perfume.name}</h3>
                <div class="flex items-center justify-between">
                    <div>
                        <span class="text-lg font-bold text-gray-900">$${perfume.price.toFixed(2)}</span>
                        ${perfume.discount ?
                            `<span class="text-sm text-gray-500 line-through ml-2">$${perfume.originalPrice.toFixed(2)}</span>` : ''}
                    </div>
                    <button class="add-to-cart bg-blue-500 hover:bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center transition">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                </div>
            </div>
        `;

        grid.appendChild(card);
    });
}

document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', function () {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        displayPerfumes(this.dataset.filter);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    displayPerfumes();
});
