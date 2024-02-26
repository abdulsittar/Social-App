import axios from 'axios';

async function regSw () {
  if ('serviceWorker' in navigator) {
    let url = process.env.PUBLIC_URL + '/sw.js';
    const reg = await navigator.serviceWorker.register (url, {scope: '/'});
    console.log ('service config is', {reg});
    return reg;
  }
  throw Error ('serviceworker not supported');
}

async function subscribe (serviceWorkerReg) {
    let subscription = await serviceWorkerReg.pushManager.getSubscription ();
    console.log ({subscription});
    console.log("helper.js");
    if (subscription === null) {
      subscription = await serviceWorkerReg.pushManager.subscribe ({
        userVisibleOnly: true,
        applicationServerKey: 'BNWCUBl5yvadZGvj3zqoNZX648CT_PMW3z-2ey6g7-yGkFkIMwu_M-PiH-KkO_ARoT_5G8lkKOB16UbDa6yBPiE',
      });
      axios.post ('/subscribe', subscription);
    }
  }

  export {regSw, subscribe};