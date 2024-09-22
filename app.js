const selectedSeatEl = document.getElementById("selected-seat");
const totalBookedEl = document.getElementById("total-booked");
const availableSeatEL = document.getElementById("available-seat");
const totalPriceEl = document.getElementById("total-price");
const couponInputEl = document.getElementById("coupon-field");
const couponBtnEl = document.getElementById("coupon-btn");
const defaultTextEl = document.getElementById("default-text");
const grandTotalEl = document.getElementById("grand-total");

let selectedSeat = [];
let totalPrice = 0;
function handleselectseat(event) {
  const value = event.innerText;
  if (selectedSeat.includes(value)) {
    return alert("Seat already Booked");
  } else if (selectedSeat.length < 4) {
    event.classList.add("bg-[#1dd100]");
    event.classList.add("text-white");

    selectedSeat.push(event.innerText);
    totalBookedEl.innerText = selectedSeat.length;

    // decrease available seat
    const availableSeatValue = parseFloat(availableSeatEL.innerText);
    const newavailableSeatValue = availableSeatValue - 1;
    availableSeatEL.innerText = newavailableSeatValue;

    //remove default text
    defaultTextEl.classList.add("hidden");

    //    update total price
    totalPrice += 550;
    totalPriceEl.innerText = totalPrice.toFixed(2);

    selectedSeatEl.innerHTML += `<li class= "text-base font-normal flex justify-between" >
      <span>${event.innerText}</span>
      <span>Economy</span>
      <span>550</span>
      </li>`;

    ///active coupon button
    if (selectedSeat.length > 3) {
      couponInputEl.removeAttribute("disabled");
      couponBtnEl.removeAttribute("disabled");
    }
  } else {
    return alert("Maximum seat booked");
  }
}

// coupon button function
// coupon button function
document.getElementById("coupon-btn").addEventListener("click", function () {
  const couponInputValue = couponInputEl.value; // Corrected line
  console.log(couponInputValue);
  let couponSave = 0;

  if (couponInputValue !== "NEW50" && couponInputValue !== "Couple 20") {
    alert("Your Provided Coupon Is not Valid");
    return;
  }
  if (couponInputValue === "NEW50") {
    couponSave = totalPrice * 0.15;
  } else if (couponInputValue === "Couple 20") {
    couponSave = totalPrice * 0.2;
  }

  const showCouponPriceEl = document.getElementById("show-coupon-price");
  showCouponPriceEl.innerHTML = `<p>Discount</p>
              <p><span>-BDT:</span> <span>${couponSave.toFixed(2)}</span></p>`;
  const grandTotalValue = totalPrice - couponSave;
  grandTotalEl.innerText = grandTotalValue.toFixed(2);
});
