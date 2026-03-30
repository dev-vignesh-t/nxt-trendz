import {Component} from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import CartContext from '../../context/CartContext'
import './index.css'

class CartSummary extends Component {
  state = {
    selectedPayment: '',
    orderPlaced: false,
  }

  onSelectPayment = event => {
    this.setState({selectedPayment: event.target.value})
  }

  render() {
    const {selectedPayment, orderPlaced} = this.state

    return (
      <CartContext.Consumer>
        {value => {
          const {cartList, removeAllCartItems} = value

          const total = cartList.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0,
          )
          const itemsCount = cartList.reduce(
            (acc, item) => acc + item.quantity,
            0,
          )

          const isCOD = selectedPayment === 'COD'

          return (
            <div className="cart-summary">
              <h1 className="order-total">
                Order Total: <span>Rs {total}/-</span>
              </h1>
              <p className="items-count">{cartList.length} Items in cart</p>

              <Popup
                modal
                trigger={
                  <button type="button" className="checkout-btn">
                    Checkout
                  </button>
                }
                onOpen={() =>
                  this.setState({selectedPayment: '', orderPlaced: false})
                }
                // ✅ Only clear cart AFTER popup closes, if order was placed
                onClose={() => {
                  if (orderPlaced) {
                    removeAllCartItems()
                  }
                }}
              >
                {close => (
                  <div className="popup-container">
                    <h1 className="popup-heading">Payment</h1>
                    <hr />

                    <div className="payment-options">
                      <h2 className="payment-method-heading">
                        Select Payment Method
                      </h2>

                      {['Card', 'Net Banking', 'UPI', 'Wallet'].map(method => (
                        <div key={method} className="payment-option">
                          <input
                            type="radio"
                            id={method}
                            name="payment"
                            value={method}
                            disabled
                          />
                          <label
                            htmlFor={method}
                            className="payment-label disabled-label"
                          >
                            {method}
                          </label>
                        </div>
                      ))}

                      <div className="payment-option">
                        <input
                          type="radio"
                          id="COD"
                          name="payment"
                          value="COD"
                          onChange={this.onSelectPayment}
                        />
                        <label htmlFor="COD" className="payment-label">
                          Cash on Delivery
                        </label>
                      </div>
                    </div>

                    <hr />

                    <div className="order-summary">
                      <h2 className="summary-heading">Order Summary</h2>
                      <p className="summary-text">
                        Total Items: <span>{itemsCount}</span>
                      </p>
                      <p className="summary-text">
                        Total Price: <span>Rs {total}/-</span>
                      </p>
                    </div>

                    <hr />

                    {/* ✅ Show success msg inside popup, cart clears only on close */}
                    {orderPlaced ? (
                      <p className="order-success-msg">
                        Your order has been placed successfully
                      </p>
                    ) : (
                      <button
                        type="button"
                        className="confirm-order-btn"
                        disabled={!isCOD}
                        onClick={() =>
                          // ✅ ONLY set state here, do NOT call removeAllCartItems
                          this.setState({orderPlaced: true})
                        }
                      >
                        Confirm Order
                      </button>
                    )}
                  </div>
                )}
              </Popup>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default CartSummary
