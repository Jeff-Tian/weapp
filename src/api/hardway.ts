import {gql} from "@apollo/client";
import {client} from "@/apollo-client";


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


export const GetAnnualRedPackageCover = () => client.query({
  query: GET_ANNUAL_RED_PACKAGE_COVER_QUERY
});
