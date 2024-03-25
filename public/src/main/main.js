'use strict'
let feats = document.querySelector('.dynamic-feats');
export const getFeatures = () => {
  
  const features = './src/features/features.html';
  let exist = document.querySelector('.features');
  console.log('pasa por getFeatures al principio')
  
  return fetch(features)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      } 
      return response.text();
    })
    .then(html => {
      if(!exist) {
        feats.innerHTML = html;
      } else{
        console.error('Features already exist');
      }
     
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
      throw error;
    });
};

