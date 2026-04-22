// مصفوفة العربة: تحاول قراءة البيانات القديمة أو تبدأ بمصفوفة فارغة
let cart = JSON.parse(localStorage.getItem('ART_SHOP_CART')) || [];

document.addEventListener('DOMContentLoaded', () => {
    // 1. استهداف جميع أزرار الشراء في الصفحة
    const addButtons = document.querySelectorAll('.item button');

    addButtons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            // الوصول للعنصر الأب (item) لاستخراج البيانات منه
            const productElement = btn.parentElement;
            
            const product = {
                name: productElement.querySelector('.name')?.innerText || "لوحة فنية",
                price: productElement.querySelector('.price').innerText,
                image: productElement.querySelector('img').src,
                quantity: 1
            };

            addToCart(product);
        });
    });
});

// وظيفة الإضافة للعربة
function addToCart(product) {
    // التحقق إذا كان المنتج موجود مسبقاً لزيادة الكمية فقط
    const existingProduct = cart.find(item => item.image === product.image);
    
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push(product);
    }

    // حفظ التعديلات في ذاكرة المتصفح
    localStorage.setItem('ART_SHOP_CART', JSON.stringify(cart));
    
    // إظهار رسالة نجاح للمستخدم
    showPopup(`تمت إضافة "${product.name}" إلى العربة!`);
}

// وظيفة إظهار رسالة منبثقة (Popup)
function showPopup(message) {
    const popup = document.createElement('div');
    popup.className = 'cart-popup';
    popup.innerText = message;
    document.body.appendChild(popup);

    // تحريك الرسالة للظهور
    setTimeout(() => popup.classList.add('show'), 100);

    // اختفاء الرسالة بعد 3 ثوانٍ
    setTimeout(() => {
        popup.classList.remove('show');
        setTimeout(() => popup.remove(), 500);
    }, 3000);
}