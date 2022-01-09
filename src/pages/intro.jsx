import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import queryString from 'query-string';

import Save from '../components/save';

const Intro = () => {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const navigate = useNavigate();

  const onUrlChangeHandler = e => {
    setYoutubeUrl(e.target.value);
  }

  const getVByQueryString = () => {
    const {query} = queryString.parseUrl(youtubeUrl, { parseFragmentIdentifier: true })
    
    const splited = youtubeUrl.split('/');
    const rst = query.v || splited.length > 3 ? youtubeUrl.split('/')[3] : false;
    return rst;
  }

  const onGotoControllerPage = () => {
    const videoId = getVByQueryString()
    if (!videoId) {
      alert('url에서 videoID를 찾을 수 없습니다.');
      return
    }
    navigate('controller', { state: { videoId } })
  }

  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <div style={{ width: '80%', position: 'absolute', top: "44%", }}>
        <Save
          value={youtubeUrl}
          onChange={onUrlChangeHandler}
          onClick={() => onGotoControllerPage()}
          onEnterPress={onGotoControllerPage}
          placeholder='youtube url...'
          label='이동'
          disabled={!youtubeUrl}
        />
      </div>
    </div>
  )
}

export default Intro;