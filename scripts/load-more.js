import loadJSON from './load-json';

const moreButton = document.querySelector('.goods button');
const elementsNode = document.querySelector('.goods .elements');

function createItemNode (item) {
  const itemNode = document.createElement('div');
  itemNode.classList.add('item');

  const previewNode = document.createElement('span');
  previewNode.classList.add('preview');

  const imgNode = document.createElement('img');
  imgNode.src = 'goods/' + item.preview;

  const titleNode = document.createElement('span');
  titleNode.classList.add('title');
  titleNode.appendChild(document.createTextNode(item.title));

  const priceNode = document.createElement('span');
  priceNode.classList.add('price');
  priceNode.appendChild(document.createTextNode(item.price + ' Р'));

  previewNode.appendChild(imgNode);

  itemNode.appendChild(previewNode);
  itemNode.appendChild(titleNode);
  itemNode.appendChild(priceNode);

  return itemNode;
}

function moreButtonClickHandler () {
  loadJSON('data.json', function (data) {
    const nodes = data.goods.map(createItemNode);
    nodes.forEach(function (itemNode) {
      elementsNode.appendChild(itemNode);
    });
  });
}

moreButton.addEventListener('click', moreButtonClickHandler);
