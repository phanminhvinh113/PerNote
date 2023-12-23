/**
 * ---
 * Order an array of objects based on another array & return new Ordered Array
 * The original array will not be modified.
 * ---
 * @param {*} originalArray
 * @param {*} orderArray
 * @param {*} key = Key to order
 * @return new Ordered Array
 *
 * Complexity Time: n+2*n*n*log(n)
 * Auxiliary Space: n;
 */

import { Transform } from "@dnd-kit/utilities";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mapOrder = (originalArray: any[], orderArray: any[], key: string) => {
  if (!originalArray || !orderArray || !key) return [];

  const clonedArray = [...originalArray];

  const orderedArray = clonedArray.sort((a, b) => {
    return orderArray.indexOf(a[key]) - orderArray.indexOf(b[key]);
  });

  return orderedArray;
};

/** 
 * @param originalArray 
 * @param orderArray 
 * @param key 
 * @returns 
 * 
 * Complexity Time n + n
 * Auxiliary Space : n+n
 
*/

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapOrderLargeData(originalArray: any[], orderArray: any[], key: string) {
  if (!originalArray || !orderArray || !key) return [];

  const orderIndexMap = new Map();

  for (let i = 0; i < originalArray.length; i++) {
    orderIndexMap.set(originalArray[i][key], i);
  }

  return orderArray.map((id) => originalArray[orderIndexMap.get(id)]);
}

/**
 * Example:
 */
/* 
    const originalItems = [
    { id: "id-1", name: "One" },
    { id: "id-2", name: "Two" },
    { id: "id-3", name: "Three" },
    { id: "id-4", name: "Four" },
    { id: "id-5", name: "Five" },
    ];
    const itemOrderIds = ["id-5", "id-4", "id-2", "id-3", "id-1"];
    const key = "id";
/* 

// const orderedArray = mapOrder(originalItems, itemOrderIds, key);

/**
   * Results:
   * 
   * Original: Of course, nothing changes =))
   * 
   * Ordered:
   *  [
        { id: 'id-5', name: 'Five' },
        { id: 'id-4', name: 'Four' },
        { id: 'id-2', name: 'Two' },
        { id: 'id-3', name: 'Three' },
        { id: 'id-1', name: 'One' }
    * ]
   */
/**
 *
 * @param array []
 * @param from   number
 * @param to   number
 * @returns  []
 */

export function arrayMove<T>(array: T[], from: number, to: number): T[] {
  const newArray = array.slice();
  newArray.splice(to < 0 ? newArray.length + to : to, 0, newArray.splice(from, 1)[0]);

  return newArray;
}
export function insertItemAt<T>(arr: T[], item: T, index: number): T[] {
  if (index >= 0 && index <= arr.length) {
    // Using array.splice to insert the item at the specified index
    arr.splice(index, 0, item);
  } else {
    // Handle invalid index, for example, you can throw an error
    throw new Error("Invalid index");
  }
  return arr;
}
export interface ClientRect {
  width: number;
  height: number;
  top: number;
  left: number;
  right: number;
  bottom: number;
}

export function adjustScale(transform: Transform, rect1: ClientRect | null, rect2: ClientRect | null): Transform {
  return {
    ...transform,
    scaleX: rect1 && rect2 ? rect1.width / rect2.width : 1,
    scaleY: rect1 && rect2 ? rect1.height / rect2.height : 1,
  };
}
export function getDateFormat(): string {
  // Get current date
  const currentDate = new Date();

  // Extract year, month, and day
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(currentDate.getDate()).padStart(2, "0");

  // Format the date as "yyyy-mm-dd"
  const formattedDate = `${year}-${day}-${month}`;
  return formattedDate;
}
