function onMetamaskButtonClicked () {
  if (typeof web3 === 'undefined') {
    return;
  }
	web3 = new Web3(web3.currentProvider);
	if (!web3.isConnected()) {
		console.error('Metamask not installed');
    return;
  }
	const account = web3.eth.accounts[0];
	if (account) {
    location.href = '/address/' + account;
  } else {
		alert('Please unlock your Metamask account');
  }
}

function setAppPictures(address, app) {
  const className = 'app-picture-' + address;
  if (app.picture_url !== undefined) {
    setPictures(className, app.picture_url);
  } else {
    const options = {
      background: [0,0,0,0],
      format: "svg",
      size: 80
    }
    const data = new Identicon(address, options).toString();
    setPictures(className, "data:image/svg+xml;base64," + data);
  }
}

function setPictures(className, src) {
  const elements = document.getElementsByClassName(className)
  for (let i = 0; i < elements.length; ++i) {
    elements[i].setAttribute('src', src);
  }
}

const txVideoStart = document.getElementById('transaction-video-start')
const txVideoLoop = document.getElementById('transaction-video-loop')
if (txVideoStart !== undefined && txVideoLoop != undefined) {
    txVideoStart.onended = function () {
    txVideoStart.onended = undefined
    txVideoStart.style.display = 'none'
    txVideoLoop.style.display = 'block'
    txVideoLoop.play()
  }
}


function transformRenderjsonUrlsToLinks(id) {
  document.querySelectorAll('#' + id + ' > pre > span > span:nth-child(2) > span').forEach(
    function(currentValue) {
      if (currentValue.textContent.startsWith('"http')) {
        currentValue.innerHTML = '<a href=' + currentValue.textContent + '>' + currentValue.textContent + '</a>';
      }
    }
  );
}

