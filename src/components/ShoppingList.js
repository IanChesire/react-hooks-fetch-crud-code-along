import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect (() => {
    fetch("http://localhost:4000/items")
    .then((response) => response.json())
    .then((items) => setItems(items))
  }, []);

  function handleUpdateItem(updatedItem) {
    console.log("In ShippingCart:", updatedItem);
  }

  function handleAddItem (newItem) {
    setItems([...items, newItem])
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });
 

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onUpdateIteme={handleUpdateItem} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
