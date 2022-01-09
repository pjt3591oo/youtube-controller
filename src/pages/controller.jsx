import { useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import YouTube from 'react-youtube';

import Tag from '../components/tag';
import Button from '../components/button';

import Save from '../components/save';
import { hms } from '../utils/date';

const Controller = () => {
  const [player, setPlayer] = useState(null);
  const [markers, setMarkers] = useState([
    {time:120, memo: '1'},
    {time:220, memo: '2'},
  ]);
  const [memo, setMemo] = useState('');
  const {state} = useLocation();

  const markerRef = useRef(null);
  const [opts, setOpts] = useState({
    height: window.innerWidth / 100 * 60,
    width: window.innerWidth,
    playerVars: {
      autoplay: 1,
      color: 'white',
      controls: 2,
    },
  })

  useEffect(() => {
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, [])

  const resizeHandler = () => {
    setOpts({
      height: window.innerWidth / 100 * 60,
      width: window.innerWidth,
    })
  }

  useEffect(() => {
    if(!player) { return; }
    let intervalId = setInterval(() => {
    }, 1000)
    return () => {
      clearInterval(intervalId);
    }
  }, [player]);

  useEffect(() => {
    markerRef?.current?.scrollTo(0, markerRef?.current?.scrollHeight);
  }, [markers])

  const onReadyHandler = ({target: youtubePlayer}) => {
    setPlayer(youtubePlayer);
  }

  const onPrevTime = () => {
    if(!player) { return; }
    gotoPlayer(player.getCurrentTime() - 10)
  }
  const onNextTime = () => {
    if(!player) { return; }
    gotoPlayer(player.getCurrentTime() + 10)
  }

  const onSaveMarkerHandler = () => {
    setMemo('');
    setMarkers([...markers, {time: parseInt(player.getCurrentTime()), memo }]);
  }

  const gotoPlayer = time => player.seekTo(time)
  
  return (
    <div>
      <div style={{marginBottom: 50}}>
        <YouTube videoId={state.videoId} opts={opts} onReady={onReadyHandler} />
        <div style={{height: 390, minHeight: 390,overflowY: 'scroll', width: "100%",  position: 'relative', margin: 0}} ref={markerRef}>
          <div style={{minHeight: 390}}>
            {markers.map((marker, index) => 
              <>
                <div style={{padding: 12}}>
                  <div>
                    <Tag onClick={() => gotoPlayer(marker.time)}> {hms(marker.time, 'hh:mm:ss')}</Tag>
                    <div style={{marginTop: 15}}>
                      {marker.memo}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <Save 
          onClick={onSaveMarkerHandler} 
          value={memo} 
          onChange={e => setMemo(e.target.value)}
          onEnterPress={onSaveMarkerHandler}
          placeholder='메모'
          label='저장'
          disabled={!memo}
        />
      </div>
      <div style={{position: 'absolute', width: '100%'}}>
        <Button half onClick={onPrevTime}>-10S</Button>
        <Button half onClick={onNextTime}>+10S</Button>
      </div>
      
    </div>
  )
}

export default Controller;