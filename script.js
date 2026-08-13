// ================= ELEMENTS =================

const product = document.querySelector("#product");
const price = document.querySelector("#price");
const qty = document.querySelector("#qty");
const discount = document.querySelector("#discount");

const addBtn = document.querySelector("#addBtn");
const bill = document.querySelector("#bill");

const items = document.querySelector("#items");
const netTotal = document.querySelector("#netTotal");
const Totaldiscount = document.querySelector("#Totaldiscount");
const grand = document.querySelector("#grand");


// ================= CART =================

let cart = [];


// ================= DISCOUNT ERROR =================

const discountError = document.createElement("small");

discountError.textContent = "Only numbers are allowed";

discountError.style.display = "none";
discountError.style.color = "#dc2626";
discountError.style.fontSize = "12px";
discountError.style.marginTop = "5px";

discount.parentElement.appendChild(discountError);


// ================= DISCOUNT VALIDATION =================

discount.addEventListener("keydown", function (event) {

    const allowedKeys = [
        "Backspace",
        "Delete",
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "Tab",
        "Home",
        "End"
    ];

    if (allowedKeys.includes(event.key)) {
        return;
    }

    if (!/^[0-9]$/.test(event.key)) {

        event.preventDefault();

        showDiscountError();

    }

});


discount.addEventListener("input", function () {

    let value = discount.value;

    let cleanValue = value.replace(/[^0-9]/g, "");

    if (value !== cleanValue) {

        discount.value = cleanValue;

        showDiscountError();

    }
    else {

        hideDiscountError();

    }

});


// ================= ERROR FUNCTIONS =================

function showDiscountError() {

    discount.style.borderColor = "#dc2626";

    discount.style.boxShadow =
        "0 0 0 2px rgba(220, 38, 38, 0.10)";

    discountError.style.display = "block";

}


function hideDiscountError() {

    discount.style.borderColor = "#d1d5db";

    discount.style.boxShadow = "none";

    discountError.style.display = "none";

}


// ================= ADD PRODUCT =================

function addProduct() {

    let name = product.value.trim();

    let p = Number(price.value);

    let q = Number(qty.value);

    let d = Number(discount.value);


    // Validation

    if (name === "") {

        alert("Enter Product Name");

        product.focus();

        return;

    }


    if (p <= 0 || !Number.isFinite(p)) {

        alert("Enter Valid Price");

        price.focus();

        return;

    }


    if (q <= 0 || !Number.isFinite(q)) {

        alert("Enter Valid Quantity");

        qty.focus();

        return;

    }


    if (d < 0 || !Number.isFinite(d)) {

        showDiscountError();

        discount.focus();

        return;

    }


    if (d > 2) {

        alert("Enter equal or less than 2%");

        discount.focus();

        return;

    }


    // Product object

    let item = {

        name: name,

        price: p,

        qty: q,

        total: p * q,

        discount: (d * p * q) / 100

    };


    // Add product to cart

    cart.push(item);


    // Display updated bill

    showBill();


    // Clear inputs

    product.value = "";
    price.value = "";
    qty.value = "";
    discount.value = "";

    hideDiscountError();

    product.focus();

}


// ================= SHOW BILL =================

function showBill() {

    bill.innerHTML = "";

    let totalAmount = 0;

    let totalamountDis = 0;


    cart.forEach(function (item, index) {

        bill.innerHTML += `

            <tr>

                <td>${index + 1}</td>

                <td>${item.name}</td>

                <td>Rs ${item.price}</td>

                <td>${item.qty}</td>

                <td>Rs ${item.total}</td>

                <td>Rs ${item.discount.toFixed(2)}</td>

                <td>

                    <button
                        class="delete-btn"
                        onclick="deleteProduct(${index})"
                    >
                        Delete
                    </button>

                </td>

            </tr>

        `;


        // Calculate totals

        totalAmount += item.total;

        totalamountDis += item.discount;

    });


    // Grand total

    let grandtotal = totalAmount - totalamountDis;


    // Update summary

    items.textContent = cart.length;

    netTotal.textContent = totalAmount.toFixed(2);

    Totaldiscount.textContent = totalamountDis.toFixed(2);

    grand.textContent = grandtotal.toFixed(2);

}


// ================= DELETE PRODUCT =================

function deleteProduct(index) {

    cart.splice(index, 1);

    showBill();

}


// ================= ADD BUTTON =================

addBtn.addEventListener("click", addProduct);


// ================= FIELD FLOW =================

// Product → Price

product.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        event.preventDefault();

        price.focus();

    }

});


// Price → Quantity

price.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        event.preventDefault();

        qty.focus();

    }

});


// Quantity → Discount

qty.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        event.preventDefault();

        discount.focus();

    }

});


// Discount → Add Product

discount.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        event.preventDefault();

        addProduct();

    }

});

