import axios from 'axios';

export const GET_USERS = 'GET_USERS';
export const GET_USER = 'GET_USER';
export const CREATE_USER = 'CREATE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const UPDATE_USER_ROL = 'UPDATE_USER_ROL';
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const ERROR = 'ERROR';

// Habilitada
export const getUsers = () => async (dispatch) => {
  await axios.get('http://localhost:3001/usuarios').then(
    (response) => {
      dispatch({
        type: GET_USERS,
        payload: response.data,
      });
    },
    (error) => {
      dispatch({
        type: ERROR,
        payload: error.error,
      });
    },
  );
};

// Habilitada
export const getUser = ( email ) => async ( dispatch ) => {
  await axios.get(`http://localhost:3001/usuario/email/${email}`).then(
    (response) => {
      dispatch({
        type: GET_USER,
        payload: response.data,
      });
    },
    (error) => {
      dispatch({
        type: ERROR,
        payload: error.error,
      });
    },
  )
}

// Habilitada
export const createUser = ({
  name, lastName, picture, born, dni, email, address, province, phone, postal, password, permission = 'user',
}) => async (dispatch) => {
  await axios.post('http://localhost:3001/usuario', {
    name,
    lastName,
    picture,
    born,
    dni,
    email,
    address,
    province,
    phone,
    postal,
    password,
    permission,
  }).then(
    (response) => {
      dispatch({
        type: CREATE_USER,
        payload: response.data,
      });
    },
    (error) => {
      dispatch({
        type: ERROR,
        payload: error.error,
      });
    },
  );
};

//Habilitada
export const updateUser = ({
  name, lastName, picture, born, dni, email, address, province, phone, postal 
}) => async (dispatch) => {
  await axios.put('http://localhost:3001/usuario', {
    name,
    lastName,
    picture,
    born,
    dni,
    email,
    address,
    province,
    phone,
    postal,

  }).then(
    (response) => {
      dispatch({
        type: UPDATE_USER,
        payload: response.data,
      });
    },
    (error) => {
      dispatch({
        type: ERROR,
        payload: error.error,
      });
    },
  );
};

//Habilitada
export const forgotPassword = ({
  email
}) => async (dispatch) => {
  await axios.post('http://localhost:3001/usuario/forgotpassword', {
    email,
  }).then(
    (response) => {
      dispatch({
        type: FORGOT_PASSWORD,
        payload: response.data,
      });
    },
    (error) => {
      dispatch({
        type: ERROR,
        payload: error.error,
      });
    },
  );
};

//Habilitada
export const updatePassword = ({
  email, password 
}) => async (dispatch) => {
  await axios.put('http://localhost:3001/usuario', {
    email,
    password
  }).then(
    (response) => {
      dispatch({
        type: UPDATE_PASSWORD,
        payload: response.data,
      });
    },
    (error) => {
      dispatch({
        type: ERROR,
        payload: error.error,
      });
    },
  );
};

//Habilitada
export const userLogin = ({
  email, password 
}) => async (dispatch) => {
  await axios.post('http://localhost:3001/usuario/login', {
    email,
    password
  }).then(
    (response) => {
      dispatch({
        type: USER_LOGIN,
        payload: response.data,
      });
    },
    (error) => {
      dispatch({
        type: ERROR,
        payload: error.error,
      });
    },
  );
};

//Habilitada
export const updateRol = ({
  email,
  permission,
  token 
}) => async (dispatch) => {
  await axios.put('http://localhost:3001/usuario/rol', { email, permission }, {
    headers: {
      'Authorization': 'Bearer ' + token
    }
 }).then(
    (response) => {
      dispatch({
        type: UPDATE_USER_ROL,
        payload: response.data,
      });
    },
    (error) => {
      dispatch({
        type: ERROR,
        payload: error.error,
      });
    },
  );
};

//Habilitada
export const userLogout = ({
  token 
}) => async (dispatch) => {
  await axios.get('http://localhost:3001/usuario/login', {}, {
    headers: {
      'Authorization': 'Bearer ' + token
    }
 }).then(
    (response) => {
      dispatch({
        type: USER_LOGOUT,
        payload: response.data,
      });
    },
    (error) => {
      dispatch({
        type: ERROR,
        payload: error.error,
      });
    },
  );
};