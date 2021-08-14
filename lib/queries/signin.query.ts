import gql from "graphql-tag";

const SIGN_IN_QUERY = gql`
    query SignIn ($email: String!, $password: String!, $isRemembered: Int!) {
        signin ( signin: {
               email: $email
               password: $password
               isRemembered: $isRemembered
        })
        {
            accessToken
            timeout
    }
  }
`

export default SIGN_IN_QUERY;
