import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import queryString from 'query-string';

import Save from '../components/save';

const Intro = () => {
  const [url, setUrl] = useState('');
  const navigate = useNavigate();

  const onUrlChangeHandler = e => {
    console.log(e.target.value)
    setUrl(e.target.value);
  }

  const getVByQueryString = () => {
    const { query } = queryString.parseUrl(url, { parseFragmentIdentifier: true })
    return query.v;
  }

  const onGotoControllerPage = () => {
    navigate('controller', { state: { videoId: getVByQueryString() } })
  }

  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <div style={{ width: '80%', position: 'absolute', top: "44%", }}>
        <Save
          value={url}
          onChange={onUrlChangeHandler}
          onClick={() => onGotoControllerPage()}
          onEnterPress={onGotoControllerPage}
          placeholder='youtube url...'
          label='이동'
          disabled={!url}
        />
      </div>
    </div>
  )
}

export default Intro;