import { Wrapper } from './styles';
import { HarrysHouse } from '../../assets';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import RepeatIcon from '@mui/icons-material/Repeat';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

const CurrentSong = () => {
  return (
    <Wrapper>
      <div className='holder'>
        <div className='left'>
          <img src={HarrysHouse} alt='' />
          <div className='info'>
            <h4>As It Was</h4>
            <h5>Harry Styles</h5>
            <hr />
          </div>
        </div>
        <div className='center'>
          <ShuffleIcon className='smallIcon' />
          <SkipPreviousIcon className='largeIcon' />
          <PauseIcon className='largeIcon' />
          <SkipNextIcon className='largeIcon' />
          <RepeatIcon className='smallIcon' />
        </div>
        <div className='right'>
          <VolumeUpIcon />
          <hr />
        </div>
      </div>
    </Wrapper>
  );
};

export default CurrentSong;
