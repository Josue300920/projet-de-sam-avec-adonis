 
        const products = [
            
            { id: 1, name: "Shalom Mambweni", price: 89.99, sizes: ["Séances Photo", "Défilés de mode", "Vidéos publicitaires", "Mannequin de beauté","Autres"], image: "/images/pexels-shalom-ejiofor-2153542296-32807301.jpg" },
            { id: 2, name: "Evodie Mansanga", price: 89.99, sizes: ["Séances Photo", "Défilés de mode", "Vidéos publicitaires", "Mannequin de beauté","Autres"], image: "/images/pexels-ojhonferreira-14038165.jpg" },
            { id: 3, name: "Jeannette Mujinga", price: 89.99, sizes: ["Séances Photo", "Défilés de mode", "Vidéos publicitaires", "Mannequin de beauté","Autres"], image: "/images/pexels-jacky-hong-771747059-19137936 (1).jpg" },
            { id: 4, name: "Déborah  Eyenga", price: 89.99, sizes: ["Séances Photo", "Défilés de mode", "Vidéos publicitaires", "Mannequin de beauté","Autres"], image: "/images/pexels-helin-gezer-903013644-31900651.jpg" },
            { id: 5, name: "Pierrot Tshimanga", price: 89.99, sizes: ["Séances Photo", "Défilés de mode", "Vidéos publicitaires", "Mannequin de beauté","Autres"], image: "/images/kin  h 2.jpg" },
            { id: 6, name: "Ketsia Tshabatshuba", price: 89.99, sizes: ["Séances Photo", "Défilés de mode", "Vidéos publicitaires", "Mannequin de beauté","Autres"], image: "/images/image 2.jpg" },
        ];

        let cart = [];

        function renderProducts() {
            const productGrid = document.getElementById('productGrid');
            productGrid.innerHTML = products.map(product => `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <div class="product-info">
                        <h3 class="product-name">${product.name}</h3>
                        
                         
                        <div class="product-size">
                            <select id="size-${product.id}">
                                <option value="">Infos</option>
                                ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
                            </select>
                        </div>
                        <button class="add-to-cart" data-id="${product.id}">Recrutez </button>
                    </div>
                </div>
            `).join('');

            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', addToCart);
            });
        }

        function addToCart(event) {
            const productId = parseInt(event.target.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
            const sizeSelect = document.getElementById(`size-${productId}`);
            const selectedSize = sizeSelect.value;

            if (!selectedSize) {
                alert('Veuillez sélectionner un service avant ');
                return;
            }

            const existingItem = cart.find(item => item.id === productId && item.selectedSize === selectedSize);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1, selectedSize });
            }

            updateCartButton();
            event.target.classList.add('added');
            event.target.textContent = 'sélectionné !';
            setTimeout(() => {
                event.target.classList.remove('added');
                event.target.textContent = 'Sélectionné';
            }, 1000);
        }

        function updateCartButton() {
            const cartButton = document.getElementById('cartButton');
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartButton.textContent = `???? Sélectionné (${totalItems})`;
        }

        function renderCart() {
            const cartItems = document.getElementById('cartItems');
            const cartTotal = document.getElementById('cartTotal');

            if (cart.length === 0) {
                cartItems.innerHTML = '<p>Votre sélection de mannequins est actuellement vide.</p>';
                cartTotal.textContent = 'Total: $0.00';
                return;
            }

            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <h3>${item.name}</h3>
                        <p>Service: ${item.selectedSize}, Heure: ${item.quantity}</p>
                    </div>
                    <div>
                        <p>$${(item.price * item.quantity).toFixed(2)}</p>
                        <button class="remove-item" data-id="${item.id}" data-size="${item.selectedSize}">❌</button>
                    </div>
                </div>
            `).join('');

            const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
            cartTotal.textContent = `Total: $${total.toFixed(2)}`;

            document.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', removeFromCart);
            });
        }

        function removeFromCart(event) {
            const productId = parseInt(event.target.getAttribute('data-id'));
            const productSize = event.target.getAttribute('data-size');
            cart = cart.filter(item => !(item.id === productId && item.selectedSize === productSize));
            updateCartButton();
            renderCart();
        }

        function sendOrderToWhatsApp() {
            const phoneNumber = "243837478790"; // Country code followed by the phone number without spaces or symbols
            let message = "Nouveau recrutement:\n\n";
            cart.forEach(item => {
                message += `${item.name} (Service: ${item.selectedSize}) - Heure: ${item.quantity} - Paiement: $${(item.price * item.quantity).toFixed(2)}\n`;
            });
            const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
            message += `\nTotal: $${total.toFixed(2)}`;
            const whatsappUrl = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
            window.open(whatsappUrl, '_blank');
        }

        document.addEventListener('DOMContentLoaded', () => {
            renderProducts();

            const cartButton = document.getElementById('cartButton');
            const cartModal = document.getElementById('cartModal');
            const closeCartButton = document.getElementById('closeCartButton');
            const orderButton = document.getElementById('orderButton');
            const ctaButton = document.getElementById('ctaButton');

            cartButton.addEventListener('click', () => {
                cartModal.style.display = 'flex';
                renderCart();
            });

            closeCartButton.addEventListener('click', () => {
                cartModal.style.display = 'none';
            });

            orderButton.addEventListener('click', sendOrderToWhatsApp);

            ctaButton.addEventListener('click', () => {
                document.getElementById('productsSection').scrollIntoView({ behavior: 'smooth' });
            });

            window.addEventListener('click', (event) => {
                if (event.target === cartModal) {
                    cartModal.style.display = 'none';
                }
            });
        });

// Ici  c'est une autre forme d'affichage dynamique de carossel des photos de mannequins 

// const arrowBtns = document.querySelectorAll('.arrow-btn');
// const cardBtns = document.querySelectorAll('.card');
// let currentCard = 2;
// let dir = 1;
// moveCards();

// const applyPointerEffect = (btn, ease, shadow) => {
//   btn.onpointerenter = () => gsap.to(btn, { ease, 'box-shadow': shadow });
//   btn.onpointerleave = () => gsap.to(btn, { ease, 'box-shadow': '0 6px 8px #00000030' });
// };

// arrowBtns.forEach((btn, i) => {
//   applyPointerEffect(btn, 'expo', '0 3px 4px #00000050');
//   btn.onclick = () => {
//     dir = (i == 0) ? 1 : -1;
//     currentCard += (i === 0) ? -1 : 1;
//     currentCard = Math.min(4, Math.max(0, currentCard));
//     moveCards(0.75);
//   };
// });

// cardBtns.forEach((btn, i) => {
//   applyPointerEffect(btn, 'power3', () => (i === currentCard) ? '0 6px 11px #00000030' : '0 0px 0px #00000030');
//   btn.onclick = () => {
//     dir = (i < currentCard) ? 1 : -1;
//     currentCard = i;
//     moveCards(0.75);
//   };
// });

// function moveCards(dur = 0) {
//   gsap.timeline({ defaults: { duration: dur, ease: 'power3', stagger: { each: -0.03 * dir } } })
//     .to('.card', {
//       x: -270 * currentCard,
//       y: (i) => (i === currentCard) ? 0 : 15,
//       height: (i) => (i === currentCard) ? 270 : 240,
//       ease: 'elastic.out(0.4)'
//     }, 0)
//     .to('.card', {
//       cursor: (i) => (i === currentCard) ? 'default' : 'pointer',
//       'box-shadow': (i) => (i === currentCard) ? '0 6px 11px #00000030' : '0 0px 0px #00000030',
//       border: (i) => (i === currentCard) ? '2px solid #26a' : '0px solid #fff',
//       background: (i) => (i === currentCard) ? 'radial-gradient(100% 100% at top, #fff 0%, #fff 99%)' : 'radial-gradient(100% 100% at top, #fff 20%, #eee 175%)',
//       ease: 'expo'
//     }, 0)
//     .to('.icon svg', {
//       attr: {
//         stroke: (i) => (i === currentCard) ? 'transparent' : '#36a',
//         fill: (i) => (i === currentCard) ? '#36a' : 'transparent'
//       }
//     }, 0)
//     .to('.arrow-btn-prev, .arrow-btn-next', {
//       autoAlpha: (i) => (i === 0 && currentCard === 0) || (i === 1 && currentCard === 4) ? 0 : 1
//     }, 0)
//     .to('.card h4', {
//       y: (i) => (i === currentCard) ? 0 : 8,
//       opacity: (i) => (i === currentCard) ? 1 : 0,
//     }, 0);
// }

  