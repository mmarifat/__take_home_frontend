import gql from "graphql-tag";

const SIGN_UP_QUERY = gql`
    mutation SignUp ($email: String!, $password: String!) {
        signup ( signup: {
               email: $email
               password: $password
        })
        {
            email
    }
  }
`

export default SIGN_UP_QUERY;
