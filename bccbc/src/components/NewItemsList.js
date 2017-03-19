import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

class NewItemsList extends Component {

	render() {
		const {items, renderNewItems, closeWindow, overlay} = this.props;
    return(
			<div className={"overlay-wrapper new-items " + overlay}>
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
							<h2 className="section-title">Add New Items</h2>
							<p>This is the master list of available products. Please only add items to the list, if you can get others to sign up for them as well!</p>
						</div>
						<div className="item-list">
							<ul className="items">
								{Object.keys(items).filter((key) => !items[key].Listed).map(renderNewItems)}
							</ul>
						</div>
					</div>
				</div>
			</div>
    );
	}
}

export default NewItemsList;
