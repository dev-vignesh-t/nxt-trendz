import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  // App.js
  addCartItem = product => {
    const {cartList} = this.state
    const productFound = cartList.find(item => item.id === product.id)

    if (productFound === undefined) {
      this.setState(prev => ({
        cartList: [...prev.cartList, product], // ✅ product already has quantity set
      }))
    } else {
      this.setState(prev => ({
        cartList: prev.cartList.map(item =>
          item.id === product.id
            ? {...item, quantity: item.quantity + product.quantity} // ✅ add incoming quantity
            : item,
        ),
      }))
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedList = cartList.filter(item => item.id !== id)
    this.setState({cartList: updatedList})
  }

  incrementCartItemQuantity = id => {
    this.setState(prev => ({
      cartList: prev.cartList.map(item =>
        item.id === id ? {...item, quantity: item.quantity + 1} : item,
      ),
    }))
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const product = cartList.find(item => item.id === id)

    if (product.quantity === 1) {
      this.removeCartItem(id)
    } else {
      this.setState(prev => ({
        cartList: prev.cartList.map(item =>
          item.id === id ? {...item, quantity: item.quantity - 1} : item,
        ),
      }))
    }
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
