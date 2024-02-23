import Square from '../components/Square';
import '../App.css';
import { useEffect, useState } from 'react';
import socket from '../config/socket';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'


const renderForm = [
  ['a', 'b', 'c'],
  ['d', 'e', 'f'],
  ['g', 'h', 'i'],
];

export default function Home() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(localStorage.username);
  const [audio, setAudio] = useState(false); // unt audio
  const [players, setPlayers] = useState([]);
  const [user, setUser] = useState({});
  const [click, setClick] = useState({
    a: 'a',
    b: 'b',
    c: 'c',
    d: 'd',
    e: 'e',
    f: 'f',
    g: 'g',
    h: 'h',
    i: 'i',
  });
  
useEffect(()=>{
  if (
    (click.a == click.b && click.b == click.c) ||
    (click.d == click.e && click.e == click.f) ||
    (click.g == click.h && click.h == click.i) ||
    (click.a == click.d && click.d == click.g) ||
    (click.b == click.e && click.e == click.h) ||
    (click.c == click.f && click.f == click.i) ||
    (click.a == click.e && click.e == click.i) ||
    (click.c == click.e && click.e == click.g)
    ) {
        socket.emit('gameOver', localStorage.username);
    } else if (click.a!=='a' && click.b!=='b' && click.c!=='c' && click.d!=='d' && click.e!=='e' && click.f!=='f' && click.g!=='g' && click.h!=='h' && click.i!=='i') {
        Swal.fire("draw!!!");
        setTimeout(()=>{
            localStorage.clear()
            navigate('/login')
        },900)
    }
},[click])


  function handlerLogOut() {
    localStorage.removeItem('username');
    navigate('/login');
  }


  function handlerAudio() {
    setTimeout(() => {
      setAudio(true);
      setTimeout(() => {
        setAudio(false);
      }, 1000);
    });
  }

  function handlerClick(key) {

    if (username === localStorage.username) {
      handlerAudio();
      socket.emit('playing', { ...click, [key]: user.symbol }); // <<< 2 ngirim

      let userLogin = players.filter((el) => el.user !== localStorage.username);
      socket.emit('username', userLogin[0].user);
    } else {
        handlerAudio();
        Swal.fire("bukan giliranmu!!!");
    }
  }


  useEffect(() => {
    socket.auth = {
      username: localStorage.username,
    };

    socket.connect();

    socket.on('find', (player) => {
      setPlayers(player);
      
      let userLogin = player.filter((el) => el.user === localStorage.username);
      setUser(userLogin[0]);
    });

    socket.on('playing', (e) => {
      // <<< 5 diterima cick barunya
      setClick(e); // <<< 6 di set
      
    });

    socket.on('username', (e) => {
      setUsername(e);
    });

    socket.on('gameOver', (e) => {
    
        if(localStorage.username === e){
            Swal.fire("You win!")
            // localStorage.clear()
            // navigate('/login')
        } else if (localStorage.username !== e) {
            Swal.fire("you lose!")
            // localStorage.clear()
            // navigate('/login')
        }

    });

    return () => {
      socket.off('players:online');
      socket.off('find');
      socket.off('playing');
      socket.off('gameOver')
      socket.off('username')

      socket.disconnect();
    };
  }, []);


  return (
    <>
      {/* audio */}
      {audio && (
        <audio autoPlay>
          <source src="bell.wav" type="audio/mpeg" />
        </audio>
      )}
      {/* {image && <img src="/utta.jpg" alt="" style={{ position: 'absolute', top: '15%', left: '28%' }} />} */}
      <button className='logOut' onClick={handlerLogOut}>log out</button>
      <div className="main-div">
        <div>
        <div className="move-detection">
            <div className="left">{localStorage.username}</div>
            <div className="right">jodoh 💕</div>
          </div>
          <div>
            <h1 className="tittle-head transparant-div">Tic X Tac O Toe</h1>
            <div className="square-wrap">
              {renderForm.map((x) =>
                x.map((a) => {
                  return <Square click={click} handlerClick={handlerClick} value={a} />;
                })
              )}
            </div>
          </div>
        </div>
          
        
      </div>
    </>
  );
}
