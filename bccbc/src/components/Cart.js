import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import dwolla from 'dwolla-v2';
import base from './../base';


class Cart extends Component {
  constructor() {
    super();
    this.handleCheckout = this.handleCheckout.bind(this);
  }

  handleCheckout() {
    // console.log('checkout');
    // fetch('https://uat.dwolla.com/oauth/v2/authenticate', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     client_id: 'WET3atKJjcoOLMGyLMKnkZz8ktmZNEwlkWAypM4a1e5IPr1Igm',
    //     response_type: 'code',
    //     redirect_uri: 'http://localhost:3000/dwolla',
    //     scope: 'transactions',
    //     dwolla_landing: 'login',
    //   })
    // });
  // }

    // get keygetSales(){
    base.fetch('admin', {
      context: this,
    }).then(data => {

      // where to send the user after they grant permission:
      const redirect_uri = "http://localhost:3000";
      var client = new dwolla.Client({
        id: "WET3atKJjcoOLMGyLMKnkZz8ktmZNEwlkWAypM4a1e5IPr1Igm",
        secret: data.dwolla,
        environment: 'sandbox' // optional - defaults to production});
      });

      var auth = new client.Auth({
        redirect_uri: 'http://localhost:3000',
        scope: 'send|transactions|funding',
        // state: getRandomHex(), // optional - https://tools.ietf.org/html/rfc6749#section-10.12
        // verified_account: true, // optional
        dwolla_landing: 'login', // optional
      });

      console.log(auth.url);

      const request = new Request(auth.url, {
        url: 'http://localhost:3000',
        method: 'POST',
        mode: 'cors',
        redirect: 'follow',
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      });
      fetch(request).then(function(response) {
        console.log(response.status);
      });
      
    }).catch(error => {
      throw error;
    });



    // redirect to `auth.url`

    // auth.callback(req.query) // pass the code and optional state to the callback
    // .then(function(token) {
    //   return token.get('/');
    // })
    // .then(function(res) {
    //   console.log(JSON.stringify(res.body));
    // });
  }

  render() {
    const {items, order, cart, renderCartItems, closeWindow} = this.props;
    const orderedItems = order.items || {};
    return (
      <div className={"overlay-wrapper new-items " + cart}>
        <div className="overlay l--constrained clearfix">
					<div className="button--close button--highlight">
						<button className="close" onClick={closeWindow}>
              <FontAwesome
								className='close'
								name='close'
								size='lg'
							/>
            </button>
					</div>
          <div className="newItems">
            <div className="itemsHeader">
              <h2 className="section-title">Your Cart</h2>
            </div>
            <div className="item-list">
              <ul className="items">
                {Object.keys(orderedItems).filter((key) => items[key]).map(renderCartItems)}
              </ul>
            </div>
            <div className="total">
              <h2>Total: ${order.total.toFixed(2)}</h2>
            </div>
            <div className="button--highlight checkout">
              <button onClick={this.handleCheckout}>Check Out</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Cart;
