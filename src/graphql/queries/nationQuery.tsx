import { gql } from 'graphql-tag'

export const NATIONS_AND_TYPES_QUERY = gql`
  query nationsAndTypes {
    nations {
      name
      icons {
        small
        medium
        large
      }
    }
    vehicleTypes {
      name
      title
      icons {
        default
      }
    }
  }
`
