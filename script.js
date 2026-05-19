// --- 1. ÜRÜN VERİTABANI ---
const productsDB = [
    { id: 1, name: "Berry Hibiscus", desc: "Orman meyveleri ve hibiskus özü", price: 120.00, category: "soguk-icecekler", featured: true, inStock: true },
    { id: 2, name: "Anne Poğaçası", desc: "Peynir, susam", price: 80.00, category: "bakery", featured: true, inStock: true },
    { id: 3, name: "Havuçlu Kek", desc: "Havuç, tarçın, ceviz, krema", price: 200.00, category: "pastalar", featured: true, inStock: true },
    { id: 4, name: "Taze Sıkma Portakal Suyu", desc: "Günlük taze sıkılmış", price: 90.00, category: "soguk-icecekler", featured: false, inStock: true },
    { id: 5, name: "El Yapımı Çilekli Limonata", desc: "Taze nane ve çilek ile", price: 95.00, category: "soguk-icecekler", featured: false, inStock: true },
    { id: 6, name: "Maden Suyu", desc: "Buzlu bardak ile servis edilir.", price: 60.00, category: "soguk-icecekler", featured: false, inStock: true },
    { id: 7, name: "Türk Kahvesi", desc: "Lokum ve su ile servis edilir.", price: 110.00, category: "turk-kahvesi", featured: false, inStock: true, hasSugarOptions: true },
    { id: 8, name: "Dibek Kahvesi", desc: "Lokum ve su ile servis edilir.", price: 120.00, category: "turk-kahvesi", featured: false, inStock: true, hasSugarOptions: true },
    { id: 9, name: "Double Türk Kahvesi", desc: "Lokum ve su ile servis edilir.", price: 150.00, category: "turk-kahvesi", featured: false, inStock: true, hasSugarOptions: true },
    { id: 10, name: "Ihlamur", desc: "French Press ile servis edilir.", price: 130.00, category: "caylar", featured: false, inStock: true },
    { id: 11, name: "Yeşil Çay", desc: "French Press ile servis edilir.", price: 120.00, category: "caylar", featured: false, inStock: true },
    { id: 12, name: "Papatya Çayı", desc: "French Press ile servis edilir.", price: 120.00, category: "caylar", featured: false, inStock: true },
    { id: 13, name: "Kış Çayı", desc: "French Press ile servis edilir.", price: 130.00, category: "caylar", featured: false, inStock: true },
    { id: 14, name: "Tereyağlı Kruvasan", desc: "Özel tereyağı ile", price: 200.00, category: "bakery", featured: false, inStock: true },
    { id: 15, name: "Sandviç", desc: "Domates,salatalık,salam,marul", price: 180.00, category: "bakery", featured: false, inStock: true },
    { id: 16, name: "Simit", desc: "Günlük taze", price: 60.00, category: "bakery", featured: false, inStock: true },
    { id: 17, name: "Latte", desc: "Espresso, Süt", price: 200.00, category: "espresso-sicak", featured: false, inStock: true },
    { id: 18, name: "Filtre Kahve", desc: "Taze Çekilmiş Kahve", price: 140.00, category: "espresso-sicak", featured: false, inStock: true },
    { id: 19, name: "Espresso", desc: "Taze Çekilmiş Kahve", price: 100.00, category: "espresso-sicak", featured: false, inStock: true },
    { id: 20, name: "Mocha", desc: "Espresso, Süt, Çikolata Sos", price: 230.00, category: "espresso-sicak", featured: false, inStock: false },
    { id: 21, name: "Ice Latte", desc: "Espresso, Süt, Buz", price: 210.00, category: "espresso-soguk", featured: false, inStock: true },
    { id: 22, name: "Ice Filtre Kahve", desc: "Taze Çekilmiş Kahve, Buz", price: 160.00, category: "espresso-soguk", featured: false, inStock: true },
    { id: 23, name: "Ice Americano", desc: "Espresso, Su, Buz", price: 180.00, category: "espresso-soguk", featured: false, inStock: true },
    { id: 24, name: "Ice Mocha", desc: "Espresso, Süt, Çikolata Sos, Buz", price: 230.00, category: "espresso-soguk", featured: false, inStock: true },
    { id: 25, name: "Frambuazlı Cheesecake", desc: "Frambuaz, Labne, Bisküvi", price: 230.00, category: "pastalar", featured: false, inStock: true },
    { id: 26, name: "Limonlu Cheesecake", desc: "Limon, Labne, Bisküvi", price: 230.00, category: "pastalar", featured: false, inStock: true },
    { id: 27, name: "Tiramisu", desc: "Kedi Dili, Krema, Labne, Kakao, Kahve", price: 240.00, category: "pastalar", featured: false, inStock: true }
];

// --- 2. GLOBAL DEĞİŞKENLER ---
let cart = [];
let tempQuantities = {};
let tempSugarOptions = {}; 
let currentActiveCategory = ""; 

// --- 3. SAYFA GEÇİŞ MOTORU ---
function showPage(pageId) {
    document.querySelectorAll('.page-section').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    
    const hamburger = document.getElementById('hamburger-icon');
    const backBtn = document.getElementById('back-icon');
    
    if(pageId === 'home-page') {
        hamburger.style.display = 'inline-block';
        backBtn.style.display = 'none';
    } else {
        hamburger.style.display = 'none';
        backBtn.style.display = 'inline-block';
    }
    window.scrollTo(0, 0);
}

function goHome() {
    showPage('home-page');
    renderFeaturedProducts();
}

// --- 4. ŞEKER SEÇİMİ ---
function selectSugar(productId, sugarType) {
    tempSugarOptions[productId] = sugarType;
    
    const group = document.getElementById(`sugar-group-${productId}`);
    if(group) {
        const buttons = group.querySelectorAll('.sugar-btn');
        buttons.forEach(btn => {
            if(btn.innerText.trim() === sugarType) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
}

// --- 5. DİNAMİK KART ÜRETİCİSİ ---
function createProductCardMarkup(product) {
    let currentQty = tempQuantities[product.id] || 1;
    let badgeClass = product.inStock ? "status-badge" : "status-badge out";
    let badgeText = product.inStock ? "Mevcut" : "Mevcut Değil";
    let buttonDisabled = product.inStock ? "" : "disabled style='background: #ccc; cursor: not-allowed;'";
    
    let sugarSelectorMarkup = "";
    if(product.hasSugarOptions) {
        let currentSugar = tempSugarOptions[product.id] || "Sade"; 
        
        sugarSelectorMarkup = `
            <div class="sugar-button-group" id="sugar-group-${product.id}">
                <div class="sugar-btn ${currentSugar === 'Sade' ? 'active' : ''}" onclick="selectSugar(${product.id}, 'Sade')">Sade</div>
                <div class="sugar-btn ${currentSugar === 'Orta' ? 'active' : ''}" onclick="selectSugar(${product.id}, 'Orta')">Orta</div>
                <div class="sugar-btn ${currentSugar === 'Az şekerli' ? 'active' : ''}" onclick="selectSugar(${product.id}, 'Az şekerli')">Az şekerli</div>
                <div class="sugar-btn ${currentSugar === 'Şekerli' ? 'active' : ''}" onclick="selectSugar(${product.id}, 'Şekerli')">Şekerli</div>
            </div>
        `;
    }

    return `
        <div class="product-card">
            <div class="product-main-layout">
                <div class="img-container">
                    <img src="gorseller/${product.id}.jpg" class="product-img" alt="${product.name}">
                    <div class="${badgeClass}">${badgeText}</div>
                </div>
                <div class="product-info">
                    <div>
                        <div class="product-title">${product.name}</div>
                        <div class="product-desc">${product.desc}</div>
                    </div>
                    <div>
                        <div class="product-price">${product.price.toFixed(2)} TL</div>
                        <div class="action-area">
                            <div class="qty-controls">
                                <button class="qty-btn" onclick="modifyQty(this, ${product.id}, -1)">-</button>
                                <span class="qty-display">${currentQty}</span>
                                <button class="qty-btn" onclick="modifyQty(this, ${product.id}, 1)">+</button>
                            </div>
                            <button class="add-btn" onclick="addItemToCart(${product.id})" ${buttonDisabled}>Sepete ekle</button>
                        </div>
                    </div>
                </div>
            </div>
            ${sugarSelectorMarkup}
        </div>
    `;
}

// --- 6. LİSTELEME VE FİLTRELEME ---
function renderFeaturedProducts() {
    const container = document.getElementById('featured-products');
    const featuredList = productsDB.filter(p => p.featured);
    container.innerHTML = featuredList.map(p => createProductCardMarkup(p)).join('');
}

function openCategory(categoryKey) {
    currentActiveCategory = categoryKey;
    showPage('category-page');
    
    let placeholderName = "Ürün ara...";
    if(categoryKey === 'soguk-icecekler') placeholderName = "Soğuk içeceklerde ara...";
    if(categoryKey === 'turk-kahvesi') placeholderName = "Türk kahvelerinde ara...";
    if(categoryKey === 'caylar') placeholderName = "Çaylarda ara...";
    if(categoryKey === 'bakery') placeholderName = "Bakery'de ara...";
    if(categoryKey === 'espresso-sicak') placeholderName = "Sıcak Kahveler'de ara...";
    if(categoryKey === 'espresso-soguk') placeholderName = "Soğuk Kahveler'de ara...";
    if(categoryKey === 'pastalar') placeholderName = "Pastalar'da ara...";
    if(categoryKey === 'hepsi') placeholderName = "Tüm ürünlerde ara...";

    document.getElementById('category-search').placeholder = placeholderName;
    document.getElementById('category-search').value = ""; 
    executeCategoryRender(productsDB);
}

function executeCategoryRender(sourceArray) {
    const container = document.getElementById('category-products');
    let itemsToDisplay = [];
    
    if(currentActiveCategory === 'hepsi') {
        itemsToDisplay = sourceArray.filter(p => !p.featured); 
    } else {
        itemsToDisplay = sourceArray.filter(p => p.category === currentActiveCategory);
    }
    
    container.innerHTML = itemsToDisplay.map(p => createProductCardMarkup(p)).join('');
}

// --- 7. MİKTAR VE SEPET YÖNETİMİ ---
function modifyQty(btn, id, direction) {
    if (!tempQuantities[id]) tempQuantities[id] = 1;
    tempQuantities[id] += direction;
    if (tempQuantities[id] < 1) tempQuantities[id] = 1;
    
    const container = btn.closest('.qty-controls');
    if(container) {
        const displayElement = container.querySelector('.qty-display');
        if(displayElement) displayElement.innerText = tempQuantities[id];
    }
}

function addItemToCart(id) {
    const matchedProduct = productsDB.find(p => p.id === id);
    if(!matchedProduct || !matchedProduct.inStock) return;
    
    const countToAdd = tempQuantities[id] || 1;
    
    let sugarSelection = matchedProduct.hasSugarOptions ? (tempSugarOptions[id] || "Sade") : "";
    let uniqueCartId = matchedProduct.hasSugarOptions ? `${id}-${sugarSelection}` : `${id}`;
    let displayName = matchedProduct.hasSugarOptions ? `${matchedProduct.name} (${sugarSelection})` : matchedProduct.name;
    
    const existingCartItem = cart.find(item => item.uniqueCartId === uniqueCartId);
    
    if(existingCartItem) {
        existingCartItem.quantity += countToAdd;
    } else {
        cart.push({ ...matchedProduct, quantity: countToAdd, uniqueCartId: uniqueCartId, name: displayName });
    }
    
    tempQuantities[id] = 1; 
    refreshCartBadge();
    
    if(document.getElementById('category-page').classList.contains('active')) {
        executeCategoryRender(productsDB);
    } else {
        renderFeaturedProducts();
    }
}

function refreshCartBadge() {
    const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    const badge = document.getElementById('floating-cart-count');
    if(totalCount > 0) {
        badge.style.display = 'flex';
        badge.innerText = totalCount;
    } else {
        badge.style.display = 'none';
    }
}

// --- 8. SEPET GÖRÜNÜMÜ VE SİPARİŞ TAMAMLAMA ---
function openCart() {
    showPage('cart-page');
    renderCart();
}

function renderCart() {
    const listContainer = document.getElementById('cart-items-list');
    const emptyMessage = document.getElementById('empty-cart-msg');
    const checkoutForm = document.getElementById('checkout-form-card');
    const completeBtn = document.getElementById('complete-order-btn');
    
    if(cart.length === 0) {
        emptyMessage.style.display = 'block';
        if(checkoutForm) checkoutForm.style.display = 'none';
        if(completeBtn) completeBtn.style.display = 'none';
        if(listContainer) listContainer.innerHTML = '';
        document.getElementById('subtotal').innerText = '0.00₺';
        document.getElementById('tax').innerText = '0.00₺';
        document.getElementById('total').innerText = '0.00₺';
        return;
    }
    
    emptyMessage.style.display = 'none';
    if(checkoutForm) checkoutForm.style.display = 'block';
    if(completeBtn) completeBtn.style.display = 'block';
    
    let grandTotal = 0; 
    let listHTML = "";
    
    cart.forEach(item => {
        let currentCost = item.price * item.quantity;
        grandTotal += currentCost;
        listHTML += `
            <div class="summary-row" style="margin-bottom: 8px;">
                <span class="fw-bold">${item.quantity}x</span>
                <span style="flex:1; margin:0 12px;">${item.name}</span>
                <span class="fw-bold">${currentCost.toFixed(2)}₺</span>
            </div>
        `;
    });
    
    listContainer.innerHTML = listHTML;
    
    // KDV Dahil (İçyüzde %20) Matematiksel Hesaplaması
    let computedSubtotal = grandTotal / 1.20; 
    let computedTax = grandTotal - computedSubtotal; 
    
    document.getElementById('subtotal').innerText = computedSubtotal.toFixed(2) + '₺';
    document.getElementById('tax').innerText = computedTax.toFixed(2) + '₺';
    document.getElementById('total').innerText = grandTotal.toFixed(2) + '₺';
}

function toggleOrderFields() {
    const type = document.getElementById('order-type-select').value;
    const nameRow = document.getElementById('field-name-row');
    const phoneRow = document.getElementById('field-phone-row');
    
    if (type === 'masada-ye') {
        if(nameRow) nameRow.style.display = 'none';
        if(phoneRow) phoneRow.style.display = 'none';
        document.getElementById('field-masada-ye').style.display = 'flex';
        document.getElementById('field-paket').style.display = 'none';
    } else {
        if(nameRow) nameRow.style.display = 'flex';
        if(phoneRow) phoneRow.style.display = 'flex';
        document.getElementById('field-masada-ye').style.display = 'none';
        document.getElementById('field-paket').style.display = type === 'paket' ? 'flex' : 'none';
    }
}

function completeOrder() {
    if(cart.length === 0) return;

    const orderType = document.getElementById('order-type-select').value;
    let customerName = document.getElementById('customer-name').value;
    let phoneNo = document.getElementById('delivery-phone').value;
    const paymentMethod = document.getElementById('payment-method-select').value;
    
    let specificDetail = "";
    let timeEstimate = "";

    if(orderType === 'masada-ye') {
        specificDetail = document.getElementById('table-no').value;
        if(!specificDetail) return alert("Lütfen masa numarasını giriniz!");
        
        timeEstimate = "Siparişiniz masanıza getirilecek.";
        specificDetail = "Masa No: " + specificDetail;
        
        customerName = "Masadaki Müşteri"; 
        phoneNo = "Belirtilmedi";
        
    } else if(orderType === 'paket') {
        if(!phoneNo) return alert("Lütfen iletişim için telefon numaranızı giriniz!");
        specificDetail = document.getElementById('address-info').value;
        if(!specificDetail) return alert("Lütfen teslimat adresini giriniz!");
        
        timeEstimate = "Tahmini teslimat: 30-40 Dakika";
        specificDetail = "Adres: " + specificDetail;
    } else {
        if(!phoneNo) return alert("Lütfen iletişim için telefon numaranızı giriniz!");
        
        timeEstimate = "Tahmini hazırlanma: 15-20 Dakika (Gel-Al)";
        specificDetail = "Mağazadan Teslim";
    }

    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `SP-2026-${randomCode}`;
    
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const newOrder = {
        orderNo: orderNumber,
        date: new Date().toLocaleDateString('tr-TR'),
        customer: customerName || "Belirtilmedi",
        phone: phoneNo, 
        payment: paymentMethod,
        type: orderType,
        details: specificDetail,
        totalAmount: total.toFixed(2), 
        items: [...cart]
    };

    let history = JSON.parse(localStorage.getItem('costaOrderHistory')) || [];
    history.unshift(newOrder); 
    localStorage.setItem('costaOrderHistory', JSON.stringify(history));

    document.getElementById('modal-order-no').innerText = orderNumber;
    document.getElementById('modal-time').innerText = timeEstimate;
    document.getElementById('order-modal').style.display = 'flex';

    cart = [];
    refreshCartBadge();
    renderCart();
}

function closeModal() {
    document.getElementById('order-modal').style.display = 'none';
    goHome();
}

// --- 9. SİPARİŞ GEÇMİŞİ ---
function openOrderHistory() {
    showPage('history-page'); 
    
    const container = document.getElementById('dynamic-history-container');
    let history = JSON.parse(localStorage.getItem('costaOrderHistory')) || [];
    let grandTotal = 0;
    
    if(history.length === 0) {
        container.innerHTML = `
            <div class="white-card text-center" style="padding: 40px;">
                <p class="text-gray">Henüz geçmiş siparişiniz bulunmamaktadır.</p>
            </div>`;
        document.getElementById('history-grand-total').innerText = "0.00 TL";
        return;
    }

    let html = "";
    history.forEach(order => {
        let currentTotal = parseFloat(order.totalAmount);
        grandTotal += currentTotal;
        
        let currentSubtotal = currentTotal / 1.20;
        let currentTax = currentTotal - currentSubtotal;
        
        let itemsHtml = order.items.map(i => `
            <div class="summary-row" style="margin-bottom: 5px; font-size: 15px;">
                <span>
                    <span class="fw-bold" style="margin-right: 10px;">${i.quantity}x</span> 
                    <span class="history-item-name" style="color: #0066cc; text-decoration: underline; cursor: pointer;">${i.name}</span>
                </span>
                <span class="fw-bold">${(i.price * i.quantity).toFixed(2)}₺</span>
            </div>
            <hr class="dashed-line" style="border: none; border-top: 1px dashed #ccc; margin: 10px 0;">
        `).join('');

        html += `
            <div class="history-order-wrapper" style="margin-bottom: 40px;">
                <div style="font-size: 13px; color: gray; margin-bottom: 10px; padding-left: 5px;">
                    <i class="fa-solid fa-hashtag"></i> Sipariş Kodu: <span class="fw-bold" style="color: #333;">${order.orderNo}</span> | Tarih: ${order.date}
                </div>
                
                <div class="cart-container">
                    <div class="cart-left">
                        <div class="white-card" style="min-height: 260px; background: white; border-radius: 15px; padding: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                            <h3 class="card-title" style="font-size: 16px; font-weight: 700; margin-bottom: 25px;">Sipariş Detayları</h3>
                            <div class="order-info-row" style="margin-bottom: 15px;"><span class="fw-bold" style="width: 120px; display: inline-block;">Müşteri:</span> ${order.customer}</div>
                            <div class="order-info-row" style="margin-bottom: 15px;"><span class="fw-bold" style="width: 120px; display: inline-block;">Telefon:</span> ${order.phone}</div>
                            <div class="order-info-row" style="margin-bottom: 15px;"><span class="fw-bold" style="width: 120px; display: inline-block;">Ödeme:</span> ${order.payment || 'Nakit'}</div>
                            <div class="order-info-row" style="margin-bottom: 15px;"><span class="fw-bold" style="width: 120px; display: inline-block;">Sipariş Türü:</span> ${order.type === 'gel-al' ? 'Gel-Al' : order.type === 'masada-ye' ? 'Masada Ye' : 'Paket'}</div>
                            <div class="order-info-row" style="margin-bottom: 15px; color: #6b5b4c;"><span class="fw-bold" style="width: 120px; display: inline-block;">Ek Detay:</span> ${order.details}</div>
                        </div>
                    </div>
                    
                    <div class="cart-right">
                        <div class="white-card" style="min-height: 260px; background: white; border-radius: 15px; padding: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); display: flex; flex-direction: column; justify-content: space-between;">
                            <div>
                                <h3 class="card-title" style="font-size: 16px; font-weight: 700; margin-bottom: 25px;">Ürün Özeti</h3>
                                <div class="history-items-container">
                                    ${itemsHtml}
                                </div>
                            </div>
                            <div>
                                <div class="summary-row text-gray" style="font-size: 14px; color: gray; display: flex; justify-content: space-between;">
                                    <span>KDV Tutarı:</span>
                                    <span>${currentTax.toFixed(2)}₺</span>
                                </div>
                                <hr class="dashed-line" style="border: none; border-top: 1px dashed #ccc; margin: 15px 0;">
                                <div class="summary-row total-row" style="display: flex; justify-content: space-between; font-size: 17px; font-weight: 700;">
                                    <span>Genel Toplam:</span>
                                    <span>${currentTotal.toFixed(2)}₺</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    document.getElementById('history-grand-total').innerText = grandTotal.toFixed(2) + " TL";
    container.innerHTML = html;
}

// --- 10. ARAMA MOTORU VE YAN MENÜ ---
function filterHomeProducts() {
    const query = document.getElementById('home-search').value.toLowerCase().trim();
    const categoriesSection = document.getElementById('categories-container');
    const featuredSection = document.getElementById('featured-section-area');
    const featuredContainer = document.getElementById('featured-products');
    
    if(query === "") {
        categoriesSection.style.display = "grid";
        featuredSection.style.display = "block";
        renderFeaturedProducts();
        return;
    }
    
    categoriesSection.style.display = "none";
    featuredSection.style.display = "block";
    
    const filtered = productsDB.filter(p => p.name.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query));
    featuredContainer.innerHTML = filtered.map(p => createProductCardMarkup(p)).join('');
}

function filterCategoryProducts() {
    const query = document.getElementById('category-search').value.toLowerCase().trim();
    const filteredList = productsDB.filter(p => p.name.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query));
    executeCategoryRender(filteredList);
}

function toggleSidebar() {
    const el = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if(el.style.left === '0px') {
        el.style.left = '-280px';
        overlay.style.display = 'none';
    } else {
        el.style.left = '0px';
        overlay.style.display = 'block';
    }
}

// --- 11. İLK YÜKLEME ---
window.onload = () => {
    renderFeaturedProducts();
    refreshCartBadge();
};