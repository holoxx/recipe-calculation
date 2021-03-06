// Generate a list of items to buy and used available items
export default function usedItems (tree, breakdown = {buy: {}, available: {}}) {
  // Add up the used available items
  let available = tree.totalQuantity - tree.usedQuantity
  if (available > 0) {
    breakdown.available[tree.id] = (breakdown.available[tree.id] || 0) + available
  }

  // This tree part is not getting crafted -> add up the bought items
  if (!tree.components || tree.craft === false) {
    if (tree.usedQuantity > 0) {
      breakdown.buy[tree.id] = (breakdown.buy[tree.id] || 0) + tree.usedQuantity
    }

    return breakdown
  }

  // This tree part is getting crafted -> get used items from components
  tree.components.map(component => usedItems(component, breakdown))
  return breakdown
}
