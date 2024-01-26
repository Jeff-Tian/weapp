import {gql} from "@apollo/client";
import {brickverseClient} from "@/apollo-client";


export const GET_POST_QUERY = gql`
  query GetPost($id: ID!) {
    post (id: $id) {
      data {
        id
        attributes {
          Title
          Content
        }
      }
    }
  }
`;

export const GetPost = (id) => brickverseClient.query({
  query: GET_POST_QUERY,
  variables: {
    id: id
  }
})

export const GET_POSTS_QUERY = gql`
  query GetPosts {
    posts (sort: "id:asc") {
      data {
        id
        attributes {
          Title
          Content
        }
      }
      meta {
        pagination {
          total
        }
      }
    }
  }
`;

export const GetPosts = () => brickverseClient.query({
  query: GET_POSTS_QUERY
});

export const GET_ANNUAL_RED_PACKAGE_COVER_QUERY = gql`
  query GetAnnualRedPackageCover {
    annualRedPackageCover {
      data {
        id
        attributes {
          link
          name
        }
      }
    }
  }
`;
