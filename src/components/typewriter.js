import React from 'react'

export function typewriter(array, callback, delay) {
  let i = 0;
  let interval = setInterval(() => {
    callback(array[i], i, array);
    if (++i === array.length) clearInterval(interval);
  }, delay);
}
