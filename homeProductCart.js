const productContainer = document.querySelector('#productContainer');
const productTemplate = document.querySelector('#productTemplate');

const homeQuantityToggle = (event, id, stock) => {
    const currentCardElement = document.querySelector(`#card${id}`);
    const productQuantity = currentCardElement.querySelector(".productQuantity");
    let quantity = parseInt(productQuantity.getAttribute("data-quantity"));

    if (event.target.className === "cartIncrement") {
        if (quantity < stock) {
            quantity += 1;
        }
    } else if (event.target.className === "cartDecrement") {
        if (quantity > 1) {
            quantity -= 1;
        }
    }

    productQuantity.innerText = quantity;
    productQuantity.setAttribute("data-quantity", quantity.toString());

    return quantity;
};

export const showProductContainer = (products) => {
    if (!products) {
        return false;
    }

    products.forEach((curProd) => {
        const { id, name, category, brand, price, stock, description, image } = curProd;
        const productClone = document.importNode(productTemplate.content, true);
        
        productClone.querySelector("#cardValue").setAttribute("id", `card${id}`);
        productClone.querySelector(".category").textContent = category;
        productClone.querySelector(".productName").textContent = name;
        productClone.querySelector(".productImage").src = image;
        productClone.querySelector(".productImage").alt = name;
        productClone.querySelector(".productStock").textContent = stock;
        productClone.querySelector(".productDescription").textContent = description;
        productClone.querySelector(".productPrice").textContent = `€${price}`;
        productClone.querySelector(".productActualPrice").textContent = `€${price * 2}`;
        
        const stockElement = productClone.querySelector(".stockElement");
        stockElement.querySelector(".cartIncrement").addEventListener("click", (event) => {
            homeQuantityToggle(event, id, stock);
        });
        productClone
        .querySelector(".add-to-cart-button")
        .addEventListener("click", (event) =>{
         addToCart(event, id, stock);
        });

        stockElement.querySelector(".cartDecrement").addEventListener("click", (event) => {
            homeQuantityToggle(event, id, stock);
        });

        productContainer.append(productClone);
    });
};
