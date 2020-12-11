import { Magnetometer } from 'expo-sensors';


function start(func : any , state : any){
    if (state.subscription) {
        _unsubscribe(state);
    } else {
        _subscribe(state.setSubscription, func);
    }   
}

function remove(state : any){
  _unsubscribe(state);
}


const _subscribe = (setSubscription : any , func : any) => {
    setSubscription(
      Magnetometer.addListener( result => {
        const { x, y } = result;

        let angle = Math.atan2(round(y), round(x));
        angle = angle * (180 / Math.PI)
        angle = angle + 90
        angle = (angle + 360) % 360;

        func({heading: angle});
      })
    );
    
    Magnetometer.setUpdateInterval(16);
  };

const _unsubscribe = (state : any ) => {
  const { subscription, setSubscription } = state;
  subscription && subscription.remove();
  setSubscription(null);
};

function round(n : any) {
  if (!n) {
    return 0;
  }
  return Math.floor(n * 100) / 100;
}


export default {
    start,
    remove,
}