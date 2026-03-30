// Write your code here
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const total = cartList.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      )

      return (
        <div className="cart-summary">
          <h1 className="order-total">
            Order Total: <span className="order-total-color">Rs {total}/-</span>
          </h1>
          <p className="items-count">{cartList.length} Items in cart</p>
          <button type="button" className="checkout-btn">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
