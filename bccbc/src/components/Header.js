import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

class Header extends Component {

	render() {
		const {member, total, addNewItems, viewCart, logout} = this.props;
    return(
			<header className="app-header">
				<div className="container l--constrained">
					<div className="topbar">
						<span className="topbar--item add-items">
							<a href="#" onClick={addNewItems}>Search for More Items</a>
						</span>
						<span className="topbar--item logout">
							<a href="#" onClick={logout}>Log Out</a>
						</span>
						<span className="topbar--item view-cart">
							<a href="#" onClick={viewCart}>View Cart</a>
						</span>
					</div>
					<h2>{member ? `Hi ${member}` : 'Hi There'}
						<FontAwesome
        			className='cart'
        			name='shopping-basket'
        			size='lg'
							onClick={viewCart}
      			/>
						<span className="total">Your Total: ${total.toFixed(2)}</span>
					</h2>
				</div>
			</header>
    );
	}
}

export default Header;
