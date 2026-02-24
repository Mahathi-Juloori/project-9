const API="https://fakestoreapi.com/products";
const prodData=async ()=>{
    const res=await fetch(API);
    if(!res.ok) throw new Error("Network responce was not ok!")
    return res.json();
}
let products=[];
// Cart array to store items
let cart = [];

// iife function 
(async function init(){
   try{
        products=await prodData();
        console.log(products);
        // render products 
        const list=document.getElementById("productList");
        const cards=products.map(prod=> 
            `
            <div class="col-md-4">
              <div class="card" style="width: 18rem;">
  <img src="${prod.image}" class="card-img-top" alt="..." width="200" height="150">
  <div class="card-body">
    <h5 class="card-title">${prod.title}</h5>
    <p class="card-text">Price : $ ${prod.price}</p>
    <button class="btn btn-primary" onclick="showDetails(${prod.id})">More Details</button>
  </div>
</div>
            </div>
            `
        ).join("");
        list.innerHTML=cards;
        const modal=new bootstrap.Modal(document.getElementById("productModal"));
        let currentProduct=null;
       window.showDetails=function(id){
        console.log("Hello")
        const p=products.find(x=> x.id===id)
        if(!p) return;
        currentProduct=p;
        document.getElementById("modalTitle").innerText=p.title
        document.getElementById("modalDesc").innerText=p.description
        document.getElementById("modalPrice").innerText="$" + p.price
        const img1=document.getElementById("modalImg");
        img1.src=p.image;
        img1.alt=p.title;
        modal.show();
        }
       
 const cartBadge=document.getElementById("cartCount");
 function updateCart(){
    cartBadge.innerText=cart.length
 }
 
 // Cart Modal
 const cartModal = new bootstrap.Modal(document.getElementById("cartModal"));
 
 // Open cart modal when clicking cart button
 document.getElementById("cartBtn").onclick = () => {
    renderCart();
    cartModal.show();
 };
 
 // Render cart items
 function renderCart() {
    const cartItemsDiv = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p class="text-muted text-center">Your cart is empty</p>';
        cartTotal.innerText = '$0.00';
        return;
    }
    
    let total = 0;
    const itemsHtml = cart.map((item, index) => {
        total += item.price;
        return `
            <div class="d-flex align-items-center border-bottom py-2">
                <img src="${item.image}" alt="${item.title}" width="50" height="50" class="me-3" style="object-fit: contain;">
                <div class="flex-grow-1">
                    <h6 class="mb-0">${item.title.substring(0, 30)}...</h6>
                    <small class="text-muted">$${item.price.toFixed(2)}</small>
                </div>
                <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${index})">✕</button>
            </div>
        `;
    }).join("");
    
    cartItemsDiv.innerHTML = itemsHtml;
    cartTotal.innerText = '$' + total.toFixed(2);
 }
 
 // Remove item from cart
 window.removeFromCart = function(index) {
    cart.splice(index, 1);
    updateCart();
    renderCart();
 };
 
 // Clear cart
 document.getElementById("clearCart").onclick = () => {
    cart = [];
    updateCart();
    renderCart();
 };
 
 // Add to cart from modal
document.getElementById("modalAdd").onclick=()=>{
    if (currentProduct) {
        cart.push(currentProduct);
        updateCart();
        modal.hide();
    }
}
   }
   catch(err){
     console.log(err)
   }
})();
