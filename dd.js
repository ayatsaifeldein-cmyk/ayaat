// تعريف مصفوفة السلة (تحميل البيانات المخزنة مسبقاً أو إنشاء مصفوفة فارغة)
let cart = JSON.parse(localStorage.getItem('PERFECT_STORE_CART')) || [];

// عند تشغيل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    setupAddButtons();
});

// 1. وظيفة إعداد أزرار الإضافة للسلة
function setupAddButtons() {
    // نحدد جميع الأزرار داخل العناصر التي تحتوي على كلاس item
    const buttons = document.querySelectorAll('.item button');

    buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
            // الحصول على بيانات اللوحة من العنصر الأب (الـ item)
            const itemElement = btn.parentElement;
            const product = {
                name: itemElement.querySelector('.name').innerText,
                price: itemElement.querySelector('.price').innerText,
                image: itemElement.querySelector('img').src,
                quantity: 1
            };

            addToCart(product);
            
            // تأثير بصري للزر عند الضغط
            btn.style.backgroundColor = "#27ae60";
            setTimeout(() => btn.style.backgroundColor = "#0e0e0e", 500);
        });
    });
}

// 2. إضافة المنتج للمصفوفة وحفظه
function addToCart(product) {
    // التحقق إذا كان المنتج موجود مسبقاً لزيادة الكمية فقط
    const existingItem = cart.find(item => item.name === product.name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(product);
    }

    // حفظ السلة في LocalStorage
    localStorage.setItem('PERFECT_STORE_CART', JSON.stringify(cart));
    
    // تحديث العداد (تأكد من وجود عنصر ID 'cart-count' في الهيدر)
    updateCartCount();
    
    alert(`تمت إضافة "${product.name}" إلى سلتك!`);
}

// 3. تحديث رقم العداد
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.innerText = totalItems;
    }
}