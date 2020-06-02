// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

//Number of images in the gallery_images
var NUM_OF_IMAGES = 17;

/**
 * Adds a random photo.
 */

function randomizeImage() {
  // The images directory contains a list of images, so this generates a random image from the list
  const imageIndex = Math.floor(Math.random() * NUM_OF_IMAGES) + 1;
  const imgUrl = 'gallery_images/lagos-' + imageIndex + '.jpg';

  const imgElement = document.createElement('img');
  imgElement.src = imgUrl;

  const imageContainer = document.getElementById('random-image-container');
  // Remove the previous image.
  imageContainer.innerHTML = '';
  imageContainer.appendChild(imgElement);
}

/**
 * Fetches my name from the server and adds it to the DOM.
 */
function getName() {
  console.log('Fetching his name.');

  // The fetch() function returns a Promise because the request is asynchronous.
  const responsePromise = fetch('/data');

  // When the request is complete, pass the response into handleResponse().
  responsePromise.then(handleResponse);
}

/**
 * Handles response by converting it to text and passing the result to
 * addNameToDom().
 */
function handleResponse(response) {
  console.log('Handling the response.');

  // response.text() returns a Promise, because the response is a stream of
  // content and not a simple variable.
  const textPromise = response.text();

  // When the response is converted to text, pass the result into the
  // addNameToDom() function.
  textPromise.then(addNameToDom);
}

/** Adds a name to the DOM. */
function addNameToDom(name) {
  console.log('Adding name to dom: ' + name);

  const NameContainer = document.getElementById('name-container');
  NameContainer.innerText = name;
}

/**
 * Fetches stats from the servers and adds them to the DOM.
 */
function getServer() {
  fetch('/data').then(response => response.json()).then((stat) => {
    // stats is an object, not a string, so we have to
    // reference its fields to create HTML content
    const statsListElement = document.getElementById('name-container');
    statsListElement.innerHTML = '';
    statsListElement.appendChild(
        createListElement('Name: ' + stat.list_array[0]));
    statsListElement.appendChild(
        createListElement('Ade: ' + stat.list_array[1]));
    statsListElement.appendChild(
        createListElement('Sex: ' + stat.list_array[2]));

  });
}
