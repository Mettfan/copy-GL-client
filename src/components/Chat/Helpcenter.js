import React from 'react';
import Cookies from "universal-cookie";
import SupportScreen from './index';
import ChatBox from './ChatUser.jsx';
import './chat.css';




function Helpcenter() {
  let cookie = new Cookies();
  const user= cookie.get('user').user;

    return (
      <div className='account-chat'>
        {user.permission === 'admin'?'Soporte Administrador':'Soporte Técnico'}
          {user.permission === 'admin'?
          (<SupportScreen
            user={user}
          />):(
          <ChatBox
            user={user}
          />
          )}
        
      </div>
    );
}


export default Helpcenter




// class Helpcenter extends React.PureComponent {
//   componentDidMount() {
   
//   }

//   render() {
//     let cookie = new Cookies();
//   const user= cookie.get('user').user;

//     return (
//       <div className='account'>
//         {user.permission === 'admin'?'Soporte Administrador':'Soporte Técnico'}
//           {user.permission === 'admin'?
//           (<SupportScreen
//             user={user}
//           />):(
//           <ChatBox
//             user={user}
//           />
//           )}
        
//       </div>
//     );
//   }
// }

// export default Helpcenter


// import React from 'react'

