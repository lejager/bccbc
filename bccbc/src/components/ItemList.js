import React, { Component } from 'react';

class ItemList extends Component {

	render() {
		const {items, renderItems} = this.props;
    return(
			<div className="item-list primary l--constrained">
				<ul className="items">
					{Object.keys(items).filter((key) => items[key].Listed).map(renderItems)}
				</ul>
			</div>
    );
	}
}

export default ItemList;
