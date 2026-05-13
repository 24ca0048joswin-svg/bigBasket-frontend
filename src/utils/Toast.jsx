import loadingGif from '../assets/loading.gif';

function Toast({isShow}){
    if(isShow){
        return <span className="toast loading-toast">
            <img src={loadingGif} alt="loading" height="15px"/>
            {' '}Loading ...
            </span>
    }
}

export default Toast;