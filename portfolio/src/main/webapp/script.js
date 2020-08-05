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

  const nameContainer = document.getElementById('name-container');
  nameContainer.innerText = name;
}

/**
 * Fetches comments from the servers and adds them to the DOM.
 */
async function getComments() {
    fetch('/data').then(response => response.json()).then((comments) => {
    const commentListElement = document.getElementById('comment-list');
    comments.forEach((comment) => {
      commentListElement.appendChild(createListElement(comment));
    })
  });
}

/** Creates an <li> element containing text. */
function createListElement(comment) {
  const commentElement = document.createElement('li');
  commentElement.className = 'comment';

  const commentTextElement = document.createElement('span');
  commentTextElement.innerText = comment.commentText;

  commentElement.appendChild(commentTextElement);
  return commentElement;
}

async function deleteComments() {
  await fetch('/delete-data', { method: 'POST'});
  window.location.reload();
}

function createMap() {
  const map = new google.maps.Map(
  document.getElementById('map'),
  {center: {lat: 37.422, lng: -122.084}, zoom: 16});
}

function initMap() {
  // Styles a map in night mode.
  var lagos = {lat: 6.5244, lng: 3.3792};
  var sudan = {lat: 12.8628, lng: 30.2176};
  var mauritania = {lat: 18.079021, lng: -15.965662};
  var map = new google.maps.Map(document.getElementById('map'), {
  zoom: 5,
  center: lagos,
  styles: [
    {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
    {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
    {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}]
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{color: '#263c3f'}]
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{color: '#6b9a76'}]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{color: '#38414e'}]
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{color: '#212a37'}]
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{color: '#9ca5b3'}]
     },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{color: '#746855'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{color: '#1f2835'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{color: '#f3d19c'}]
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{color: '#2f3948'}]
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{color: '#17263c'}]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{color: '#515c6d'}]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [{color: '#17263c'}]
    }
  ]
 });
    addLandmark(
      map, 6.5244, 3.3792, 'Lagos',
      'This is where i was born.')
    addLandmark(
      map, 12.8628, 30.2176, 'Sudan',
      'This is a country i want to visit.')
    addLandmark(
      map, 18.079021, -15.965662, 'mauritania',
      'Also a country i would like to visit');
      }

/** Adds a marker that shows an info window when clicked. */
function addLandmark(map, lat, lng, title, description) {
  const marker = new google.maps.Marker(
    {position: {lat: lat, lng: lng}, map: map, title: title});

  const infoWindow = new google.maps.InfoWindow({content: description});
  marker.addListener('click', () => {
    infoWindow.open(map, marker);
  });
}

