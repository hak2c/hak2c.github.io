"use strict";

const CART_KEY = "testament_cart";

const CartContentHeader = () => (
  <div className="row cart-content__header align-items-center">
    <div className="col-4">
      <a onClick={() => history.back()}>
        &lt; <span className="d-none d-md-inline">Continue Shopping</span>
      </a>
    </div>
    <div className="col-4 text-center">
      <h3 className="cart-content__title">Cart</h3>
    </div>
    <div className="col-4 text-right">1 Item(s)</div>
  </div>
);

const CartItems = (props) => {
  const products = props.products;
  const listItem = products.map((product) => (
    <CartItemContent product={product} key={product.id} />
  ));
  return <div className="cart-items">{listItem}</div>;
};

let CartItemContent = (props) => {
  const { id, image, price, qty, color, size, title, total } = props.product;
  return (
    <ul className="d-flex flex-wrap align-items-center cart-item">
      <li className="item-image">
        <img src={image} />
      </li>
      <li className="item-details">
        <p className="item-details__title mb-3">
          <a href="#">{title}</a>
        </p>
        <div className="item-details__variants">
          <p>
            <strong>Size:</strong> {size}
          </p>
          <p>
            <strong>Color:</strong> {color}
          </p>
        </div>
      </li>
      <li className="item-price">
        <p>{moneyFormat(price)}</p>
      </li>
      <li className="item-quantity">
        <a
          className="qty-product-control qty-product-control-down"
          field="qty-product-0"
        >
          -
        </a>
        <input
          min="1"
          type="text"
          name="qty-product-0"
          className="quantity"
          id="updates_0"
          value={qty}
          onChange={() => console.log("xxx")}
        />
        <a
          className="qty-product-control qty-product-control-up"
          field="qty-product-0"
        >
          +
        </a>
      </li>
      <li className="item-total">
        <p>{moneyFormat(total)}</p>
      </li>
      <li className="item-remove">
        <img
          src="https://testament-store.herokuapp.com/images/icons/close.png"
          alt="Remove item"
        />
      </li>
    </ul>
  );
};

const CartInformation = () => (
  <div className="col-md-6 cart-infor">
    <div className="cart-infor__note">
      <a
        className="d-inline-block noteBtn mb-2"
        onClick={() => $("#noteTextarea").toggle()}
      >
        Leave a note with your order
      </a>
      <div id="noteTextarea">
        <textarea className="form-control" rows="5"></textarea>
      </div>
    </div>
    <div className="cart-infor__free-shipping mb-4">
      <div className="text-center free-shipping">
        <p className="mb-3">
          You are only $124.01 away from Free Domestic Shipping!
        </p>
        <small>(Excludes International)</small>
      </div>
    </div>
  </div>
);

const CartTotal = (props) => {
  const { subTotal, tax } = props.money;
  const total = Number((subTotal + tax).toFixed(2));

  return (
    <div className="col-md-6 cart_total">
      <div className="cart-total__details">
        <div className="subtotal d-flex">
          <p className="text-left mb-0">Subtotal</p>
          <p className="subtotal-price text-right mb-0">
            <span className="cart-price">{moneyFormat(subTotal)}</span>
          </p>
        </div>
        <div className="shipping d-flex">
          <p className="text-left mb-0">VAT tax</p>
          <p className="text-right mb-0">{moneyFormat(tax)}</p>
        </div>
        <hr></hr>
        <div className="total d-flex">
          <p className="text-left mb-3">Total</p>
          <p className="subtotal-price text-right mb-3">
            <span className="cart-price">{moneyFormat(total)}</span>
          </p>
        </div>
      </div>
      <div className="cart-total__button">
        <input
          className="cart-total__button-submit"
          type="submit"
          id="submitCart"
          name="submitCart"
          value="Check Out"
        />
      </div>
    </div>
  );
};

const CartFooter = (props) => {
  return (
    <div className="row cart-footer">
      <CartInformation />
      <CartTotal money={props} />
    </div>
  );
};

let getProductsInCart = () => {
  let products = localStorage.getItem(CART_KEY);
  if (products == null || products == "") {
    localStorage.setItem(CART_KEY, "[]");
    products = "[]";
  }
  products = JSON.parse(products);
  return products;
};

let getTotalPrice = (products) => {
  let total = 0;
  for (let i = 0; i < products.length; i++) {
    total += Number(products[i].total);
  }
  return total;
};

let getTax = (total) => Number((total / 10).toFixed(2));

let moneyFormat = (money) => "$" + money;

const products = getProductsInCart();
let subTotal = getTotalPrice(products);
let tax = getTax(subTotal);

const CartPageContent = () => (
  <div className="cart_content--container">
    <CartContentHeader />
    <form id="cart-infor-form" method="post" name="cart-infor-form">
      <CartItems products={products} />
      <CartFooter subTotal={subTotal} tax={tax} />
    </form>
  </div>
);

ReactDOM.render(<CartPageContent />, document.querySelector(".cart_content"));
